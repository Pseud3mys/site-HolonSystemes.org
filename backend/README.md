# 📧 Backend & Formulaire de Contact - Guide Complet

## 🏗️ Architecture

Le backend est séparé du site Eleventy statique et fonctionne comme une API indépendante.

```
backend/
├── server.js          # API Express + Nodemailer
├── rebuild.js         # Script de rebuild automatique
├── package.json       # Dépendances backend
├── .env              # Configuration (à créer)
└── .env.example      # Template de configuration
```

---

## 🚀 Installation & Configuration

### 1. Installer les dépendances du backend

```powershell
cd backend
npm install
```

### 2. Configurer les variables d'environnement

Copier `.env.example` vers `.env` :

```powershell
Copy-Item .env.example .env
```

Puis éditer `.env` avec vos vraies informations SMTP :

```env
# Configuration SMTP (exemple avec Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-mot-de-passe-app

# Destinataire
EMAIL_TO=contact@holonsystems.org

# CORS
ALLOWED_ORIGINS=http://localhost:8081,https://holonsystems.org

# Port
PORT=5000
```

#### 📧 Exemples de configuration SMTP

**Gmail :**
- Host: `smtp.gmail.com`
- Port: `587`
- Créer un "mot de passe d'application" dans les paramètres Google

**Office 365 / Outlook :**
- Host: `smtp.office365.com`
- Port: `587`

**OVH :**
- Host: `ssl0.ovh.net`
- Port: `587`

**Infomaniak :**
- Host: `mail.infomaniak.com`
- Port: `587`

---

## 🎯 Démarrage

### Serveur de formulaire (API emails)

```powershell
cd backend
npm start
```

→ API disponible sur `http://localhost:5000`

### Rebuild automatique (RSS quotidien)

**En arrière-plan (production) :**

```powershell
cd backend
npm run rebuild
```

**Rebuild immédiat (test) :**

```powershell
cd backend
npm run rebuild:now
```

---

## 🧪 Test du formulaire

### 1. Lancer le site Eleventy

```powershell
# Terminal 1 - Site
npm start
```

→ Site sur `http://localhost:8081`

### 2. Lancer le backend

```powershell
# Terminal 2 - Backend
cd backend
npm start
```

→ API sur `http://localhost:5000`

### 3. Tester le formulaire

Aller sur `http://localhost:8081/contact/` et soumettre le formulaire.

### 4. Vérifier les logs

Le terminal du backend affichera :
```
📨 Nouvelle requête reçue sur /submit
🔧 Configuration SMTP...
✅ Message envoyé: <message-id>
```

---

## 🔄 Rebuild Automatique RSS

Le script `rebuild.js` reconstruit le site automatiquement tous les jours à 6h du matin pour récupérer les nouveaux articles RSS.

### Configuration du planning

Éditer `rebuild.js`, ligne 8 :

```javascript
const CRON_SCHEDULE = '0 6 * * *'; // Format: minute heure jour mois jour-semaine
```

**Exemples :**
- `0 6 * * *` → Tous les jours à 6h
- `0 */6 * * *` → Toutes les 6 heures
- `0 8,20 * * *` → À 8h et 20h
- `0 12 * * 1` → Tous les lundis à midi

### Lancer en production (serveur)

**Linux/Mac :**
```bash
nohup node backend/rebuild.js &
```

**Windows (Task Scheduler) :**
1. Créer une tâche planifiée
2. Programme : `node`
3. Arguments : `C:\chemin\vers\backend\rebuild.js`
4. Démarrer dans : `C:\chemin\vers\backend\`

**Avec PM2 (recommandé) :**
```bash
npm install -g pm2
pm2 start backend/rebuild.js --name "holon-rebuild"
pm2 startup  # Démarrage automatique
pm2 save
```

---

## 🌐 Déploiement Production

### Option 1 : Site statique + API séparée

**Site (Eleventy) :**
- Déployer sur Netlify/Vercel (gratuit)
- Rebuild automatique à chaque push Git

**Backend (API) :**
- Déployer sur Render/Railway/Fly.io (gratuit)
- Variables d'environnement configurées dans le dashboard

### Option 2 : VPS complet

```bash
# Site
npm run build
# → Servir _site/ avec Nginx

# Backend
cd backend
npm start  # ou pm2 start server.js
npm run rebuild  # ou pm2 start rebuild.js
```

### Variables d'environnement en production

Ne **jamais** committer le fichier `.env` !

Ajouter à `.gitignore` :
```
backend/.env
```

Configurer les variables dans :
- Render : Settings → Environment
- Netlify : Site settings → Build & deploy → Environment
- Railway : Variables tab

---

## 📸 Ajouter des Images

### Pour un article de blog

```markdown
---
layout: article.njk
title: "Mon article"
date: 2026-01-10
image: "/public/images/blog/mon-article.jpg"  # Image hero en haut
---

Contenu...

![Illustration](/public/images/blog/illustration.jpg)  # Image dans le contenu
```

### Pour un projet

```markdown
---
layout: projet.njk
title: "Mon Projet"
video: "https://www.youtube.com/embed/VIDEO_ID"  # OU
image: "/public/images/projets/mon-projet.jpg"
---
```

### Structure recommandée

```
public/
├── logo-gris.svg
└── images/
    ├── blog/
    │   ├── article1.jpg
    │   └── article2.jpg
    └── projets/
        ├── ideosphere-hero.jpg
        └── gouvernance-scic.jpg
```

**Formats recommandés :**
- **Hero** (grandes images) : 1200x630px, max 200KB
- **Illustrations** : 800x600px, max 100KB
- **Format** : JPEG (photos), PNG (logos/schémas), WebP (moderne)

**Outils d'optimisation :**
- [TinyPNG](https://tinypng.com/) (compression)
- [Squoosh](https://squoosh.app/) (conversion WebP)

---

## 🐛 Dépannage

### Le formulaire ne s'envoie pas

1. **Vérifier que le backend tourne** : `http://localhost:5000/health`
2. **Vérifier les logs** du terminal backend
3. **Tester les identifiants SMTP** (essayer de se connecter manuellement)
4. **CORS** : vérifier que `ALLOWED_ORIGINS` inclut l'URL du site

### Les flux RSS ne se mettent pas à jour

1. **Vérifier les URLs** dans `src/_data/rssFeeds.json`
2. **Tester manuellement** : ouvrir l'URL RSS dans un navigateur
3. **Forcer un rebuild** : `npm run rebuild:now`
4. **Vérifier les logs** d'Eleventy (messages d'erreur RSS)

### Les images ne s'affichent pas

1. **Vérifier le chemin** : doit commencer par `/public/`
2. **Vérifier que le fichier existe** dans `public/`
3. **Rebuild** : `npm run build`

---

## 📊 Monitoring (optionnel)

### Logs des emails envoyés

Les emails envoyés sont loggés dans la console. Pour les sauvegarder :

```javascript
// Ajouter dans server.js après l'envoi
const fs = require('fs');
fs.appendFileSync('emails.log', `${new Date().toISOString()} - ${info.messageId}\n`);
```

### Uptime monitoring

Services gratuits :
- [UptimeRobot](https://uptimerobot.com/) (gratuit, 50 monitors)
- [Freshping](https://freshping.io/) (gratuit, illimité)

Configurer un check HTTP sur :
- `https://votre-api.com/health` (backend)
- `https://votre-site.com/` (site)

---

## 🔒 Sécurité

### Protection contre le spam

Ajouter un rate limiting dans `server.js` :

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requêtes max par IP
});

app.post('/submit', limiter, (req, res) => {
  // ...
});
```

### HTTPS en production

**Netlify/Vercel** : HTTPS automatique inclus  
**VPS** : Utiliser Let's Encrypt (gratuit)

---

## 📝 Checklist avant production

- [ ] Backend configuré avec les vrais identifiants SMTP
- [ ] Formulaire testé et fonctionnel
- [ ] Rebuild automatique planifié
- [ ] Images optimisées (< 200KB)
- [ ] Vidéo IdeoSphere intégrée
- [ ] Variables d'environnement sécurisées (pas dans Git)
- [ ] Rate limiting activé (anti-spam)
- [ ] Monitoring configuré

---

**Support :** contact@holonsystems.org
