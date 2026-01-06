# 🚀 Guide de Migration Rapide

## Passer de l'ancien site au nouveau (Eleventy)

### Étape 1 : Sauvegarde (5 min)

```powershell
# Créer un backup des anciens fichiers HTML
mkdir backup
Copy-Item *.html backup/
```

### Étape 2 : Installation (5 min)

```powershell
# Installer les dépendances
npm install

# Tester que tout fonctionne
npm start
```

Ouvrir `http://localhost:8080` pour voir le nouveau site.

### Étape 3 : Vérification du design (10 min)

Comparer visuellement avec l'ancien site :
- ✅ Couleurs identiques (beige `#F8F7F2`, accent `#A37A55`)
- ✅ Polices identiques (Lora pour titres, Lato pour texte)
- ✅ Animations identiques (fade-in au scroll, liens soulignés)
- ✅ Structure identique (header, sections, footer)

### Étape 4 : Ajouter vos contenus réels (30 min)

#### Images et logo

```powershell
# Le logo est déjà copié, mais vérifier qu'il existe :
ls public/logo-gris.svg
```

#### Articles de blog

Les articles sont dans `src/content/blog/`. L'article "Repenser la société" est déjà migré.

Pour ajouter d'autres articles, créer de nouveaux fichiers `.md`.

#### Projets

Éditer `src/content/projets/ideosphere.md` pour :
- Ajouter les vraies images (remplacer les placeholders)
- Ajouter le lien vers la vraie vidéo de démo
- Compléter les informations

#### Flux RSS

Éditer `src/_data/rssFeeds.json` avec vos vrais flux RSS :

```json
[
  {
    "name": "Blog Personnel Alex",
    "url": "https://votre-blog.fr/feed",
    "tags": ["réflexions", "systèmes complexes"],
    "maxItems": 5
  }
]
```

### Étape 5 : Build final (2 min)

```powershell
npm run build
```

Le site final est dans `_site/` et est prêt à être déployé.

### Étape 6 : Déploiement

#### Option A : GitHub Pages
```powershell
git add .
git commit -m "Migration vers Eleventy"
git push origin main
```
Puis activer GitHub Pages dans les settings du repo.

#### Option B : Netlify
1. Créer un compte sur [netlify.com](https://netlify.com)
2. Glisser-déposer le dossier `_site/`
3. Ou connecter le repo GitHub pour un déploiement automatique

#### Option C : Copier sur serveur
```powershell
# Copier tout le contenu de _site/ sur votre serveur
scp -r _site/* user@server:/var/www/html/
```

## ⚙️ Workflow quotidien

### Ajouter un article

1. Créer `src/content/blog/mon-article.md`
2. Le site se rebuild automatiquement si `npm start` est actif
3. Voir le résultat sur `http://localhost:8080/blog/`

### Ajouter un projet

1. Créer `src/content/projets/mon-projet.md`
2. Rebuild automatique
3. Apparaît sur `/projets/`

### Modifier une page existante

Éditer directement les fichiers `.njk` dans `src/` :
- `src/index.njk` → page d'accueil
- `src/communaute.njk` → page communauté
- `src/a-propos.njk` → page à propos

### Modifier le design

Éditer `src/css/main.css` → tous les changements s'appliquent partout.

## 🆘 Problèmes courants

### Le site ne se build pas

```powershell
# Nettoyer et rebuild
npm run clean
npm run build
```

### Les images ne s'affichent pas

Vérifier que les images sont dans `public/` et que les chemins commencent par `/public/`.

### Les flux RSS ne s'affichent pas

Vérifier que les URLs dans `src/_data/rssFeeds.json` sont valides et accessibles.

### Erreur "layout not found"

Vérifier que le `layout:` dans le front matter correspond à un fichier existant dans `src/_includes/`.

## 📊 Comparaison Ancien vs Nouveau

| Fonctionnalité | Ancien site | Nouveau site (Eleventy) |
|----------------|-------------|-------------------------|
| Pages | HTML dupliqué | Templates réutilisables |
| Blog | Articles en dur | Markdown + génération auto |
| Projets | Pas de page | Page dédiée + templates |
| RSS | Non supporté | Intégration native |
| Design | CSS dupliqué | CSS centralisé |
| Maintenance | Éditer chaque HTML | Éditer 1 fichier Markdown |
| Déploiement | Upload manuel | Build automatique |

## 🎯 Prochaines étapes recommandées

1. **Ajouter les vraies images d'IdeoSphere**
2. **Configurer les flux RSS réels**
3. **Rédiger 2-3 articles de blog supplémentaires**
4. **Ajouter 1-2 projets de recherche-action**
5. **Déployer sur Netlify** (gratuit, automatique, HTTPS inclus)

---

Besoin d'aide ? → contact@holonsystems.org
