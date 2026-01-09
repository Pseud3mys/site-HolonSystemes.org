const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
    user: "holonsb",
    password: process.env.FTP_PASSWORD,
    host: "ftp.cluster021.hosting.ovh.net",
    port: 21,
    localRoot: __dirname + "/_site",
    remoteRoot: "/www/site-vitrine/",
    include: ["*", "**/*"],
    deleteRemote: false, // Attention: true supprimera tout sur le serveur avant d'envoyer
    forcePasv: true,     // <--- C'est l'option cruciale pour OVH
};

ftpDeploy.deploy(config)
    .then((res) => console.log("Déploiement terminé !"))
    .catch((err) => console.log("Erreur :", err));