# 🚀 Guide de Démarrage Rapide

## Installation complète (5 minutes)

### 1. Site Eleventy (frontend)

```powershell
# À la racine du projet
npm install
npm start
```

→ Site sur **http://localhost:8081**

### 2. Backend (formulaire + emails)

```powershell
# Dans un second terminal
cd backend
npm install

# Configurer les emails
Copy-Item .env.example .env
# Éditer .env avec vos identifiants SMTP

npm start
```

→ API sur **http://localhost:5000**

---

## ✨ Nouvelles fonctionnalités

### 🖼️ Ajouter des images facilement

**Dans un article :**
```markdown
---
layout: article.njk
title: "Mon article"
image: "/public/images/blog/mon-image.jpg"  # Hero en haut
---
```

**Dans un projet :**
```markdown
---
layout: projet.njk
title: "Mon projet"
video: "https://www.youtube.com/embed/VIDEO_ID"  # Vidéo YouTube
# OU
image: "/public/images/projets/mon-image.jpg"   # Image hero
---
```

### 📧 Page Contact avec formulaire

- Page : `http://localhost:8081/contact/`
- Formulaire fonctionnel avec backend Node.js
- Emails envoyés via SMTP (configurable)

### 🔄 Rebuild automatique RSS

```powershell
cd backend
npm run rebuild      # Lance le scheduler (rebuild quotidien à 6h)
npm run rebuild:now  # Force un rebuild immédiat
```

### 🎨 Logo intégré

Le logo gris (`public/logo-gris.svg`) est maintenant affiché à côté de "Holon Systems" dans le header.

---

## 📂 Structure des images

```
public/
├── logo-gris.svg
└── images/
    ├── blog/          # Images articles
    │   └── article1.jpg
    └── projets/       # Images projets
        ├── ideosphere.jpg
        └── projet2.jpg
```

**Formats recommandés :**
- Hero : 1200x630px, max 200KB
- Illustrations : 800x600px, max 100KB

---

## 🧪 Tester le formulaire

1. **Lancer le site** : `npm start` (port 8081)
2. **Lancer le backend** : `cd backend && npm start` (port 5000)
3. **Ouvrir** : http://localhost:8081/contact/
4. **Soumettre** le formulaire
5. **Vérifier** les logs dans le terminal backend

---

## 📦 Déploiement

### Site statique (Eleventy)

```powershell
npm run build
```

→ Déployer le dossier `_site/` sur Netlify/Vercel

### Backend (API)

Déployer `backend/` sur Render/Railway/Fly.io

**Variables d'environnement à configurer :**
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `EMAIL_TO`
- `ALLOWED_ORIGINS`

---

## 📚 Documentation

- **Site** : [README.md](../README.md)
- **Backend** : [backend/README.md](backend/README.md)
- **Migration** : [MIGRATION.md](MIGRATION.md)
- **Exemples** : [EXEMPLES.md](EXEMPLES.md)

---

## 🆘 Problèmes courants

**Le formulaire ne fonctionne pas :**
- Vérifier que le backend tourne sur le port 5000
- Tester : http://localhost:5000/health

**Les images ne s'affichent pas :**
- Vérifier que le chemin commence par `/public/`
- Rebuild : `npm run build`

**Vidéo IdeoSphere ne charge pas :**
- Vérifier l'URL YouTube embed (format : `https://www.youtube.com/embed/VIDEO_ID`)

---

**Support** : contact@holonsystems.org
