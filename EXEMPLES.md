# 📝 Exemples de Contenus

Ce fichier contient des exemples concrets pour vous aider à créer de nouveaux contenus.

## Exemple 1 : Article de blog simple

Fichier : `src/content/blog/exemple-article.md`

```markdown
---
layout: article.njk
title: "Exemple d'article de blog"
date: 2026-01-15
tags: ["exemple", "tutoriel"]
excerpt: "Un article d'exemple pour montrer comment créer du contenu facilement."
---

## Introduction

Ceci est un exemple d'article. Vous pouvez utiliser **Markdown** pour formater votre texte.

### Sous-titre

- Liste à puces
- Deuxième élément
- Troisième élément

### Citation

> Ceci est une citation inspirante sur la coopération.

### Lien

[Retour à l'accueil](/)

## Conclusion

Et voilà, c'est aussi simple que ça !
```

## Exemple 2 : Projet avec image

Fichier : `src/content/projets/exemple-projet.md`

```markdown
---
layout: projet.njk
title: "Mon Nouveau Projet"
tagline: "Une plateforme innovante pour la coopération locale"
featured: false
excerpt: "Description courte du projet pour la page liste."
image: "/public/images/mon-projet.jpg"
---

## Contexte

Expliquer le problème que ce projet résout.

## Solution proposée

Décrire comment le projet répond au problème.

## Résultats attendus

- Résultat 1
- Résultat 2
- Résultat 3

## Contact

Pour participer au projet : [contact@holonsystems.org](mailto:contact@holonsystems.org)
```

## Exemple 3 : Projet "à la une" avec vidéo

```markdown
---
layout: projet.njk
title: "Projet Phare"
tagline: "Le projet le plus important"
featured: true
excerpt: "Ce projet apparaîtra en haut de la page Projets."
video: "/public/videos/demo.mp4"
---

Contenu du projet...
```

## Exemple 4 : Article avec intro stylisée

```markdown
---
layout: article.njk
title: "Article avec intro"
date: 2026-01-20
tags: ["méthodologie"]
excerpt: "Un article avec une introduction mise en valeur."
---

<p class="intro-text">Ceci est une introduction mise en valeur avec une bordure à gauche. C'est idéal pour le paragraphe d'accroche.</p>

## Suite de l'article

Le reste du contenu...
```

## Exemple 5 : Configuration RSS complète

Fichier : `src/_data/rssFeeds.json`

```json
[
  {
    "name": "Blog Personnel",
    "url": "https://monblog.fr/feed",
    "tags": ["réflexions", "essais"],
    "maxItems": 10
  },
  {
    "name": "Medium - Intelligence Collective",
    "url": "https://medium.com/feed/@username",
    "tags": ["veille", "intelligence collective"],
    "maxItems": 5
  },
  {
    "name": "Publications Académiques",
    "url": "https://arxiv.org/rss/cs.CY",
    "tags": ["recherche", "systèmes complexes"],
    "maxItems": 3
  }
]
```

## Exemple 6 : Utiliser des images locales

### Structure recommandée

```
public/
├── logo-gris.svg
└── images/
    ├── projets/
    │   ├── ideosphere-hero.jpg
    │   ├── ideosphere-ui.png
    │   └── scic-schema.jpg
    └── blog/
        └── article-illustration.jpg
```

### Dans un article

```markdown
---
layout: article.njk
title: "Article avec image"
---

## Illustration

![Description de l'image](/public/images/blog/article-illustration.jpg)

Texte après l'image...
```

### Dans un projet

```markdown
---
layout: projet.njk
title: "Projet"
image: "/public/images/projets/ideosphere-hero.jpg"
---
```

## Exemple 7 : Ajouter une galerie d'images dans un projet

```markdown
---
layout: projet.njk
title: "Projet avec galerie"
---

## Galerie

<div class="grid md:grid-cols-2 gap-6 my-8">
    <img src="/public/images/projets/image1.jpg" alt="Description 1" class="rounded-lg w-full">
    <img src="/public/images/projets/image2.jpg" alt="Description 2" class="rounded-lg w-full">
    <img src="/public/images/projets/image3.jpg" alt="Description 3" class="rounded-lg w-full">
    <img src="/public/images/projets/image4.jpg" alt="Description 4" class="rounded-lg w-full">
</div>
```

## Exemple 8 : Vidéo YouTube embed

```markdown
---
layout: projet.njk
title: "Projet avec vidéo YouTube"
---

## Démonstration

<div class="my-8 aspect-video">
    <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        class="rounded-lg">
    </iframe>
</div>
```

## Exemple 9 : Tags multiples

```markdown
---
layout: article.njk
title: "Article avec beaucoup de tags"
date: 2026-01-25
tags: 
  - "systèmes complexes"
  - "gouvernance"
  - "coopération"
  - "recherche-action"
  - "méthodologie"
excerpt: "..."
---
```

## Exemple 10 : Bouton CTA personnalisé

```markdown
---
layout: projet.njk
title: "Projet"
---

## Participez

Vous voulez contribuer à ce projet ?

<div class="text-center my-8">
    <a href="mailto:contact@holonsystems.org?subject=Participer au projet XYZ" class="cta-button">
        Je veux participer
    </a>
</div>
```

## Astuces Markdown

### Gras et italique
```markdown
**Texte en gras**
*Texte en italique*
***Gras et italique***
```

### Listes

```markdown
1. Premier élément
2. Deuxième élément
   - Sous-élément
   - Autre sous-élément
3. Troisième élément
```

### Citations

```markdown
> Ceci est une citation
> sur plusieurs lignes
```

### Code

```markdown
Code inline : `const x = 10;`

Bloc de code :
\`\`\`javascript
function hello() {
  console.log("Hello");
}
\`\`\`
```

### Liens

```markdown
[Texte du lien](https://url.com)
[Lien avec titre](https://url.com "Titre au survol")
[Lien relatif](/blog/)
```

---

**Besoin de plus d'exemples ?** Consultez les fichiers existants dans `src/content/blog/` et `src/content/projets/`.
