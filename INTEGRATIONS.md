# 🎯 Intégrations & Améliorations Récentes

## ✅ Ce qui a été ajouté

### 1. **Logo dans le header**
Le logo gris (`public/logo-gris.svg`) est maintenant affiché à côté de "Holon Systems" dans la navigation.

### 2. **Page Contact avec formulaire**
- URL : `/contact/`
- Formulaire complet avec validation
- Pré-remplissage du sujet via paramètre d'URL : `/contact/?subject=projet`
- Backend Node.js pour l'envoi d'emails

### 3. **Vidéo IdeoSphere intégrée**
La vidéo de démo YouTube est maintenant intégrée sur la page du projet IdeoSphere :
- https://youtu.be/DdKhkR8Iats

### 4. **Widget IdeoSphere sur la page Communauté**
- Widget de contribution rapide intégré
- Permet aux visiteurs de poster directement sur IdeoSphere
- URL : `/communaute/`

### 5. **Emplacement pour carte d'idées**
Sur la page Communauté, un emplacement est prévu pour afficher une image de carte d'idées générée par IdeoSphere.

**Pour ajouter l'image :**
```
public/images/communaute/carte-idees-exemple.jpg
```

**Taille recommandée :** 1600x900px (format 16:9)

### 6. **Tous les liens contact redirigent vers le formulaire**
Tous les `mailto:` ont été remplacés par des liens vers `/contact/` (sauf le widget IdeoSphere sur la page communauté).

**Exemples :**
- `/contact/?subject=projet` → Sujet "Projet" pré-sélectionné
- `/contact/?subject=ideosphere` → Sujet "Déployer IdeoSphere" pré-sélectionné
- `/contact/?subject=rejoindre` → Sujet "Rejoindre l'association" pré-sélectionné
- `/contact/?subject=adhesion` → Sujet "Projet" pré-sélectionné
- `/contact/?subject=contribuer` → Sujet "Contribuer" pré-sélectionné

---

## 📂 Structure des images mise à jour

```
public/
├── logo-gris.svg
└── images/
    ├── blog/                  # Images articles
    ├── projets/               # Images projets
    └── communaute/            # NOUVEAU
        └── carte-idees-exemple.jpg  # Carte IdeoSphere à ajouter
```

---

## 🎨 Ajouter l'image de la carte d'idées

### Étape 1 : Exporter la carte depuis IdeoSphere
1. Aller sur IdeoSphere (exemple : liste Le Chesnay-Rocquencourt)
2. Afficher la visualisation des idées
3. Faire une capture d'écran ou export
4. Recadrer/optimiser l'image

### Étape 2 : Ajouter l'image
```powershell
# Copier votre image dans le bon dossier
Copy-Item "chemin\vers\votre\carte.jpg" "public\images\communaute\carte-idees-exemple.jpg"
```

### Étape 3 : Rebuild
```powershell
npm run build
```

L'image s'affichera automatiquement sur `/communaute/`

**Alternative :** Si vous n'avez pas encore l'image, un placeholder s'affiche automatiquement avec le texte "Carte d'idées IdeoSphere - Image à venir".

---

## 🧪 Tester les nouvelles fonctionnalités

### Widget IdeoSphere
1. Aller sur `http://localhost:8081/communaute/`
2. Le widget de contribution rapide s'affiche
3. Tester en postant une question/suggestion

### Formulaire de contact
1. Aller sur `http://localhost:8081/contact/`
2. Remplir le formulaire
3. Vérifier que le backend est lancé : `cd backend && npm start`
4. Soumettre et vérifier l'email reçu

### Pré-remplissage du sujet
- Tester : `http://localhost:8081/contact/?subject=projet`
- Le champ "Sujet" doit être automatiquement sélectionné

---

## 🔧 Configuration du widget IdeoSphere

Le widget est configuré dans `src/communaute.njk` :

```html
<iframe 
    src="https://beta.ideosphere.community/widget/quick-post?groups=groups/654537&tags=%23postrapide&showFeed=false&showContact=true"
    ...
</iframe>
```

**Paramètres modifiables :**
- `groups` : ID du groupe IdeoSphere
- `tags` : Tags à appliquer automatiquement
- `showFeed` : Afficher le flux (false par défaut)
- `showContact` : Afficher les champs contact (true)

---

## 📧 Sujets du formulaire de contact

Les sujets disponibles dans le formulaire :
1. **Projet / Prestation** (`projet`)
2. **Déployer IdeoSphere** (`ideosphere`)
3. **Rejoindre l'association** (`rejoindre`)
4. **Contribuer / Bénévolat** (`contribuer`)
5. **Recherche / Partenariat académique** (`recherche`)
6. **Autre** (`autre`)

---

## 🚀 Déploiement

Avant de déployer en production :

1. **Ajouter l'image de la carte d'idées**
2. **Tester le widget IdeoSphere** (vérifier que le groupe est le bon)
3. **Configurer le backend** avec les vrais identifiants SMTP
4. **Mettre à jour l'URL de l'API** dans `src/contact.njk` (remplacer `localhost:5000` par l'URL de production)

---

**Documentation complète :** Voir [QUICKSTART.md](QUICKSTART.md) et [backend/README.md](backend/README.md)
