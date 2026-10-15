pour envoyer au serveur ftp ovh: npm run ship 
(ou juste npm run deploy)


# Holon Systems - Site Web

Site web officiel de Holon Systems, association ESS en préfiguration de SCIC.
deplayer via filezila.

## 🏗️ Architecture

Ce site est construit avec **Eleventy (11ty)**, un générateur de site statique rapide et flexible.

### Stack technique
- **Eleventy** : génération du site statique
- **Nunjucks** : moteur de templates
- **Tailwind CSS** : framework CSS (via CDN)
- **Markdown** : rédaction des contenus (articles, projets)
- **RSS Parser** : agrégation de flux RSS externes

## 📂 Structure du projet

```
site-HolonSystemes.org/
├── src/                        # Sources du site
│   ├── _includes/             # Templates réutilisables
│   │   ├── base.njk           # Template de base (HTML)
│   │   ├── header.njk         # Header/navigation
│   │   ├── footer.njk         # Footer
│   │   ├── article.njk        # Template article de blog
│   │   └── projet.njk         # Template page projet
│   ├── _data/                 # Données globales
│   │   └── rssFeeds.json      # Configuration flux RSS
│   ├── content/               # Contenus éditables
│   │   ├── blog/              # Articles du blog (.md)
│   │   └── projets/           # Projets (.md)
│   ├── css/                   # Styles
│   │   └── main.css           # CSS personnalisé
│   ├── js/                    # Scripts
│   │   └── animations.js      # Animations scroll
│   ├── index.njk              # Page d'accueil
│   ├── blog.njk               # Page liste blog
│   ├── projets.njk            # Page liste projets
│   ├── communaute.njk         # Page communauté
│   └── a-propos.njk           # Page à propos
├── public/                     # Fichiers statiques (images, logo)
├── _site/                      # Site généré (déployable)
├── .eleventy.js               # Configuration Eleventy
├── package.json               # Dépendances Node.js
└── README.md                  # Ce fichier
```

## 🚀 Installation

### Prérequis
- **Node.js** version 14+ ([télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)

### Étapes

1. **Installer les dépendances**
   ```powershell
   npm install
   ```

2. **Lancer le serveur de développement**
   ```powershell
   npm start
   ```
   Le site sera accessible sur `http://localhost:8080`

3. **Générer le site pour la production**
   ```powershell
   npm run build
   ```
   Le site généré sera dans le dossier `_site/`

## ✍️ Ajouter du contenu

### Ajouter un article de blog

1. Créer un fichier `.md` dans `src/content/blog/`
2. Ajouter le front matter YAML :

```markdown
---
layout: article.njk
title: "Titre de l'article"
date: 2026-01-06
tags: ["tag1", "tag2"]
excerpt: "Résumé court de l'article..."
---

Contenu de l'article en Markdown...
```

3. Rebuild le site (automatique si `npm start` est actif)

### Ajouter un projet

1. Créer un fichier `.md` dans `src/content/projets/`
2. Ajouter le front matter :

```markdown
---
layout: projet.njk
title: "Nom du projet"
tagline: "Description courte"
featured: true  # true pour projet à la une
excerpt: "Résumé du projet..."
image: "/public/images/projet.jpg"  # optionnel
video: "/public/videos/demo.mp4"    # optionnel
---

Contenu détaillé du projet...
```

### Ajouter un flux RSS

Éditer le fichier `src/_data/rssFeeds.json` :

```json
[
  {
    "name": "Nom de la source",
    "url": "https://example.com/feed.rss",
    "tags": ["tag1", "tag2"],
    "maxItems": 5
  }
]
```

Les articles RSS apparaîtront automatiquement sur la page `/blog/` avec un badge "Source externe".

## 🎨 Personnaliser le design

### Variables CSS

Toutes les couleurs et styles sont centralisés dans `src/css/main.css` :

```css
:root {
    --background-color: #F8F7F2; 
    --text-color: #2c2c2c; 
    --accent-color: #A37A55; 
}
```

Modifier ces variables changera le design de tout le site.

### Classes réutilisables

- `.link-underline` : lien avec soulignement animé
- `.cta-button` : bouton d'appel à l'action
- `.fade-in-section` : animation d'apparition au scroll
- `.tag-badge` : badge de tag
- `.projet-card` : carte projet

## 📊 Collections Eleventy

Le fichier `.eleventy.js` définit plusieurs collections :

- `blogPosts` : articles manuels du blog
- `projets` : tous les projets
- `projetsFeatured` : projets à la une
- `allArticles` : articles manuels + flux RSS combinés (triés par date)

## 🌐 Déploiement

### GitHub Pages

1. Pousser le code sur GitHub
2. Activer GitHub Pages dans les settings du repo
3. Configurer pour déployer depuis le dossier `_site/`

### Netlify

1. Connecter le repo GitHub à Netlify
2. Configuration de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `_site`

### Vercel

1. Importer le projet depuis GitHub
2. Vercel détectera automatiquement Eleventy
3. Déploiement automatique à chaque push

## 🛠️ Maintenance

### Mettre à jour les dépendances

```powershell
npm update
```

### Nettoyer le build

```powershell
npm run clean
npm run build
```

### Déboguer

Si le build échoue :
1. Vérifier la syntaxe YAML dans les front matter
2. Vérifier que les chemins d'images/fichiers existent
3. Consulter les logs : Eleventy affiche les erreurs détaillées

## 📝 To-Do / Améliorations futures

- [ ] Ajouter un système de recherche dans le blog
- [ ] Filtres par tags fonctionnels (JS côté client ou pages statiques)
- [ ] Newsletter (intégration Mailchimp/Sendinblue)
- [ ] Analytics (Plausible/Matomo pour rester RGPD-friendly)
- [ ] RSS feed sortant (généré par Eleventy)
- [ ] Images réelles pour IdeoSphere et projets
- [ ] Vidéo de démo IdeoSphere

## 📄 Licence

Le code source du site est sous licence MIT.
Le contenu (textes, images) est © Holon Systems, tous droits réservés sauf mention contraire.

## 📧 Contact

Pour toute question : [contact@holonsystems.org](mailto:contact@holonsystems.org)

---

**Made with ❤️ by Holon Systems — Association ESS en préfiguration de SCIC**

## 🧪 Version 2 (en préparation)

Une seconde version du site (positionnement « concertation territoriale ») est construite à côté de l'actuelle, sans la modifier :

- Pages : `src/v2/` (accueil, intercommunalités, communes, écosystème, méthode, contact), publiées sous `/v2/`
- Gabarits : `src/_includes/v2/` · Styles complémentaires : `src/css/v2.css` (le socle `main.css` est partagé)
- Réglages : `src/_data/v2.json` (`base` = préfixe d'URL, `noindex` = masquer aux moteurs de recherche, `statut`, menu)

Pour basculer la V2 à la racine du site : mettre `"base": ""` et `"noindex": false` dans `v2.json`, puis retirer ou déplacer les anciennes pages qui occupent les mêmes URL (`/`, `/contact/`).
