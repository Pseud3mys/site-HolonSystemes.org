<#
Deploy Eleventy output (_site/) to OVH classic FTP (no TLS) from Windows PowerShell.

Behavior:
- Builds the site (npm run build)
- Uploads everything from _site/ to a fixed remote folder: www/site-vitrine/

Only one thing is asked interactively: FTP password (secure prompt).

Before first run, edit the configuration section below (Host + User).
#>

[CmdletBinding()]
param(
  [Parameter(Mandatory=$false)]
  [switch]$SkipBuild
)

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $ScriptDir

# =====================
# CONFIG (edit these)
# =====================
$FtpHost = "ftp.cluster021.hosting.ovh.net"
$User = "holonsb"
$RemoteDir = "www/site-vitrine"  # remote folder on OVH FTP
$LocalDir = "_site"

$ErrorActionPreference = "Stop"

function Write-Info([string]$msg) {
  Write-Host "[deploy] $msg" -ForegroundColor Cyan
}

function Ensure-Command([string]$name) {
  $cmd = Get-Command $name -ErrorAction SilentlyContinue
  if (-not $cmd) {
    throw "Required command not found in PATH: $name"
  }
}

Ensure-Command "npm"
Ensure-Command "ftp.exe"

$securePwd = Read-Host -Prompt "FTP password (input hidden)" -AsSecureString
$Password = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePwd)
)

if (-not $SkipBuild) {
  Write-Info "Building site (npm run build)…"
  npm run build
}

$localPath = Join-Path -Path (Get-Location) -ChildPath $LocalDir
if (-not (Test-Path -LiteralPath $localPath)) {
  throw "Local output folder not found: $localPath"
}

# Create a temporary FTP script for ftp.exe
$tempFtpScript = Join-Path $env:TEMP ("ovh-ftp-deploy-" + [Guid]::NewGuid().ToString() + ".txt")
$tempFtpLog = Join-Path $env:TEMP ("ovh-ftp-deploy-" + [Guid]::NewGuid().ToString() + ".log")

# ftp.exe can't easily do true recursive mkdir/cd for deep paths; keep RemoteDir simple.
# We'll traverse local dirs and issue lcd/cd as needed.

Write-Info "Preparing FTP command script…"

# Normalize RemoteDir (ensure no leading slash to match OVH-style paths)
$RemoteDir = $RemoteDir.Trim()
$RemoteDir = $RemoteDir.TrimStart('/')
$RemoteDir = $RemoteDir.TrimEnd('/')

# Collect all local directories and files
$allDirs = Get-ChildItem -LiteralPath $localPath -Directory -Recurse | Sort-Object FullName
$allFiles = Get-ChildItem -LiteralPath $localPath -File -Recurse | Sort-Object FullName

# Initial commands
$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("open $FtpHost")
$lines.Add("user $User $Password")
$lines.Add("binary")
$lines.Add("prompt")
$lines.Add("cd /")

# Ensure the fixed remote directory exists, then cd into it.
$parts = $RemoteDir.Split('/')
$acc = ""
foreach ($p in $parts) {
  if ([string]::IsNullOrWhiteSpace($p)) { continue }
  if ($acc -eq "") { $acc = $p } else { $acc = "$acc/$p" }
  $lines.Add("mkd $acc")
}
$lines.Add("cd $RemoteDir")

# Create remote directories (best-effort; mkd may fail if exists)
foreach ($d in $allDirs) {
  $rel = $d.FullName.Substring($localPath.Length).TrimStart('\\')
  if ([string]::IsNullOrWhiteSpace($rel)) { continue }
  $remoteSub = ($rel -replace "\\", "/")
  # create each level to avoid problems
  $parts = $remoteSub.Split('/')
  $acc = ""
  foreach ($p in $parts) {
    if ([string]::IsNullOrWhiteSpace($p)) { continue }
    if ($acc -eq "") { $acc = $p } else { $acc = "$acc/$p" }
    $lines.Add("mkd $acc")
  }
}

# Upload files
# Use absolute local put for each file: ftp.exe supports "put local remote".
foreach ($f in $allFiles) {
  $rel = $f.FullName.Substring($localPath.Length).TrimStart('\\')
  if ([string]::IsNullOrWhiteSpace($rel)) { continue }
  $remotePath = ($rel -replace "\\", "/")
  # Ensure parent dir exists already (mkd above)
  $lines.Add("put `"$($f.FullName)`" $remotePath")
}

$lines.Add("bye")

Set-Content -LiteralPath $tempFtpScript -Value ($lines -join "`r`n") -Encoding ASCII

try {
  Write-Info "Uploading $($allFiles.Count) files from '_site' to '${FtpHost}:/$RemoteDir'…"
  
  # Run ftp.exe and capture output via redirection operator (simpler, no PowerShell exceptions on stderr).
  $ErrorActionPreference = "Continue"
  & ftp.exe -n -s:$tempFtpScript > $tempFtpLog 2>&1
  $ErrorActionPreference = "Stop"
  
  # Read the log and display it.
  $logText = Get-Content -LiteralPath $tempFtpLog -Raw -ErrorAction SilentlyContinue
  if ([string]::IsNullOrWhiteSpace($logText)) {
    $logText = "(empty log)"
  }
  Write-Host $logText

  # Guard rails: require greeting + successful login.
  if ($logText -notmatch "(?m)^220") {
    Write-Host "`n[deploy] ERROR: FTP connection failed (no 220 greeting received)." -ForegroundColor Red
    Write-Host "[deploy] Check host/network or see log: $tempFtpLog" -ForegroundColor Yellow
    exit 1
  }
  if ($logText -match "(?m)^530" -or $logText -match "Login authentication failed" -or $logText -match "\bnot logged in\b" -or $logText -match "\bNon connecté\b" -or $logText -match "Échec de l'identification") {
    Write-Host "`n[deploy] ERROR: FTP login failed (check user/password)." -ForegroundColor Red
    Write-Host "[deploy] See log: $tempFtpLog" -ForegroundColor Yellow
    exit 1
  }
  if ($logText -notmatch "(?m)^230" -and $logText -notmatch "230-" ) {
    # Some servers don't echo 230 clearly in localized clients; still catch cases above.
    Write-Info "Warning: could not confirm 230 login success explicitly; if upload didn't happen, check log: $tempFtpLog"
  }

  Write-Info "Done. (mkd failures are normal if directory already exists)."
}
finally {
  Remove-Item -LiteralPath $tempFtpScript -Force -ErrorAction SilentlyContinue
  # Keep log file for troubleshooting; delete it only if you want a clean temp folder.
}
