const { exec } = require('child_process');
const schedule = require('node-schedule');
const path = require('path');

// Configuration
const SITE_DIR = path.join(__dirname, '..');
const BUILD_COMMAND = 'npm run build';
const CRON_SCHEDULE = '0 6 * * *'; // Tous les jours à 6h du matin

console.log('🤖 Script de rebuild automatique démarré');
console.log(`📁 Répertoire du site: ${SITE_DIR}`);
console.log(`⏰ Planning: ${CRON_SCHEDULE} (tous les jours à 6h)`);

// Fonction de rebuild
function rebuildSite() {
  console.log('\n🔄 Début du rebuild automatique...');
  const startTime = Date.now();
  
  exec(BUILD_COMMAND, { cwd: SITE_DIR }, (error, stdout, stderr) => {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    if (error) {
      console.error(`❌ Erreur lors du rebuild (${duration}s):`, error.message);
      console.error(stderr);
      return;
    }
    
    console.log(`✅ Rebuild réussi en ${duration}s`);
    console.log(stdout);
    
    // Optionnel : notifier par email en cas d'erreur
    // ou enregistrer dans un log
  });
}

// Planifier le rebuild quotidien
const job = schedule.scheduleJob(CRON_SCHEDULE, () => {
  console.log(`\n⏰ Déclenchement du rebuild planifié: ${new Date().toISOString()}`);
  rebuildSite();
});

console.log('✅ Planification active. Le site sera rebuild automatiquement.');
console.log('💡 Pour forcer un rebuild maintenant, utilisez: node rebuild.js --now\n');

// Option pour rebuild immédiat
if (process.argv.includes('--now')) {
  console.log('🚀 Rebuild immédiat demandé...');
  rebuildSite();
}

// Maintenir le process actif
process.on('SIGINT', () => {
  console.log('\n👋 Arrêt du scheduler...');
  job.cancel();
  process.exit(0);
});
