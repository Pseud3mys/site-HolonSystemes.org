const Parser = require('rss-parser');
const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
  
  // Copier les fichiers statiques
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("public");
  
  // Filtre pour formater les dates
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).setLocale('fr').toFormat("dd LLLL yyyy");
  });
  
  eleventyConfig.addFilter("dateToISO", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISO();
  });
  
  eleventyConfig.addFilter("dateToShort", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).setLocale('fr').toFormat("d LLL yyyy").toUpperCase();
  });
  
  // Collection pour les articles du blog (manuels)
  eleventyConfig.addCollection("blogPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/blog/*.md")
      .sort((a, b) => b.date - a.date);
  });
  
  // Collection pour les projets
  eleventyConfig.addCollection("projets", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/projets/*.md");
  });
  
  // Collection pour les projets à la une
  eleventyConfig.addCollection("projetsFeatured", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/content/projets/*.md")
      .filter(item => item.data.featured === true);
  });
  
  // Collection combinée : articles RSS + articles manuels
  eleventyConfig.addCollection("allArticles", async function(collectionApi) {
    const parser = new Parser();
    let allArticles = [];
    let sourceName = 'Holon Systems'; // Nom par défaut
    let sourceTags = []; // Tags de la source
    
    // Récupérer le nom de la source pour les articles internes depuis rssFeeds.json
    try {
      const rssFeeds = require('./src/_data/rssFeeds.json');
      const internalFeed = rssFeeds.find(feed => feed.url === 'internal');
      if (internalFeed) {
        sourceName = internalFeed.name;
        sourceTags = internalFeed.tags || [];
      }
    } catch (err) {
      // Utiliser le nom par défaut
    }
    
    // Récupérer les articles manuels
    const manualPosts = collectionApi.getFilteredByGlob("src/content/blog/*.md");
    manualPosts.forEach(post => {
      // Fusionner les tags de l'article avec les tags de la source
      const articleTags = post.data.tags || [];
      const allTags = [...new Set([...articleTags, ...sourceTags])]; // Éviter les doublons
      
      allArticles.push({
        title: post.data.title,
        url: post.url,
        date: post.date,
        excerpt: post.data.excerpt || '',
        tags: allTags,
        source: sourceName,
        isExternal: false
      });
    });
    
    // Récupérer les flux RSS (si configurés)
    try {
      const rssFeeds = require('./src/_data/rssFeeds.json');
      
      for (const feed of rssFeeds) {
        // Ignorer les entrées "internal" car elles représentent les articles manuels
        if (feed.url === 'internal') {
          continue;
        }
        
        try {
          const parsed = await parser.parseURL(feed.url);
          parsed.items.slice(0, feed.maxItems || 10).forEach(item => {
            // Parser les catégories RSS si disponibles
            const rssCategories = item.categories || [];
            const feedTags = feed.tags || [];
            const allTags = [...new Set([...rssCategories, ...feedTags])]; // Fusionner et éviter les doublons
            
            allArticles.push({
              title: item.title,
              url: item.link,
              date: new Date(item.pubDate || item.isoDate),
              excerpt: item.contentSnippet || item.content || '',
              tags: allTags,
              source: feed.name,
              isExternal: true
            });
          });
        } catch (err) {
          console.warn(`Erreur lors de la récupération du flux ${feed.name}:`, err.message);
        }
      }
    } catch (err) {
      // Pas de fichier RSS configuré, on continue avec les articles manuels seulement
      console.log('Aucun flux RSS configuré');
    }
    
    // Trier par date décroissante
    return allArticles.sort((a, b) => b.date - a.date);
  });
  
  // Collection pour les sources (noms des flux RSS)
  eleventyConfig.addCollection("sources", function(collectionApi) {
    try {
      const rssFeeds = require('./src/_data/rssFeeds.json');
      return rssFeeds.map(feed => feed.name);
    } catch (err) {
      return [];
    }
  });
  
  // Collection pour les tags
  eleventyConfig.addCollection("tagsList", async function(collectionApi) {
    const tagsSet = new Set();
    
    // Récupérer les tags des articles manuels
    collectionApi.getAll().forEach(item => {
      if (item.data.tags) {
        item.data.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    
    // Récupérer les tags des flux RSS
    try {
      const rssFeeds = require('./src/_data/rssFeeds.json');
      rssFeeds.forEach(feed => {
        if (feed.tags) {
          feed.tags.forEach(tag => tagsSet.add(tag));
        }
      });
    } catch (err) {
      // Pas de flux RSS
    }
    
    return Array.from(tagsSet).sort();
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
