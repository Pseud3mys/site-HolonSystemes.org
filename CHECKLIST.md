# ✅ Checklist de Lancement

## 🎯 Avant de déployer en production

### Contenus

- [ ] **Remplacer les placeholders d'images** dans `src/content/projets/ideosphere.md`
- [ ] **Ajouter la vraie vidéo de démo** d'IdeoSphere
- [ ] **Configurer les flux RSS réels** dans `src/_data/rssFeeds.json`
- [ ] **Vérifier tous les emails** (contact@holonsystems.org existe et fonctionne ?)
- [ ] **Relire tous les textes** (typos, cohérence, ton)

### Design & UX

- [ ] **Tester sur mobile** (responsive design)
- [ ] **Tester sur différents navigateurs** (Chrome, Firefox, Safari, Edge)
- [ ] **Vérifier que toutes les animations fonctionnent** (scroll, hover)
- [ ] **Tester tous les liens** (pas de 404)
- [ ] **Vérifier les contrastes de couleurs** (accessibilité)

### SEO & Performance

- [ ] **Ajouter les meta descriptions** sur toutes les pages
- [ ] **Optimiser les images** (compression, formats modernes)
- [ ] **Générer un sitemap.xml** (Eleventy plugin disponible)
- [ ] **Tester la vitesse** sur [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] **Vérifier l'indexation Google** (Google Search Console)

### Technique

- [ ] **Tester le build en production** : `npm run build`
- [ ] **Vérifier qu'aucune erreur dans la console**
- [ ] **Tester que le RSS fonctionne** (si flux configurés)
- [ ] **Configurer HTTPS** (obligatoire, gratuit avec Netlify/GitHub Pages)
- [ ] **Configurer le domaine personnalisé** (si applicable)

### Légal & RGPD

- [ ] **Ajouter une page Mentions légales** (obligatoire en France)
- [ ] **Vérifier qu'aucun cookie tracking n'est présent** (pas de Google Analytics non consenti)
- [ ] **Ajouter une politique de confidentialité** (si formulaires/emails)

### Backup & Sécurité

- [ ] **Commit et push sur GitHub** (backup automatique)
- [ ] **Documenter les accès** (qui a accès au repo, au déploiement)
- [ ] **Tester la procédure de rollback** (revenir à une version précédente)

---

## 📅 Après le lancement

### Semaine 1

- [ ] Monitorer les erreurs (logs Netlify/serveur)
- [ ] Vérifier les retours utilisateurs
- [ ] Tester tous les formulaires de contact
- [ ] Publier l'annonce du nouveau site (réseaux sociaux, newsletter)

### Mois 1

- [ ] Ajouter 2-3 nouveaux articles de blog
- [ ] Compléter la galerie IdeoSphere avec de vraies captures
- [ ] Ajouter un projet de recherche-action
- [ ] Analyser les premières statistiques (si analytics configuré)

### Mois 2-3

- [ ] Ajouter une section "Actualités" ou "Événements"
- [ ] Créer une newsletter (Mailchimp/Sendinblue)
- [ ] Intégrer un système de recherche dans le blog
- [ ] Ajouter des témoignages (si déploiements IdeoSphere)

---

## 🚀 Quick Start (rappel)

```powershell
# Installation
npm install

# Développement
npm start
# → http://localhost:8080

# Production
npm run build
# → Site dans _site/
```

---

## 📞 Support

- **Documentation** : README.md
- **Migration** : MIGRATION.md
- **Exemples** : EXEMPLES.md
- **Contact** : contact@holonsystems.org

---

**Bon lancement ! 🎉**
