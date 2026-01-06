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
    
    // Récupérer les articles manuels
    const manualPosts = collectionApi.getFilteredByGlob("src/content/blog/*.md");
    manualPosts.forEach(post => {
      allArticles.push({
        title: post.data.title,
        url: post.url,
        date: post.date,
        excerpt: post.data.excerpt || '',
        tags: post.data.tags || [],
        source: 'Holon Systems',
        isExternal: false
      });
    });
    
    // Récupérer les flux RSS (si configurés)
    try {
      const rssFeeds = require('./src/_data/rssFeeds.json');
      
      for (const feed of rssFeeds) {
        try {
          const parsed = await parser.parseURL(feed.url);
          parsed.items.slice(0, feed.maxItems || 10).forEach(item => {
            allArticles.push({
              title: item.title,
              url: item.link,
              date: new Date(item.pubDate || item.isoDate),
              excerpt: item.contentSnippet || item.content || '',
              tags: feed.tags || [],
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
  
  // Collection pour les tags
  eleventyConfig.addCollection("tagsList", function(collectionApi) {
    const tagsSet = new Set();
    
    collectionApi.getAll().forEach(item => {
      if (item.data.tags) {
        item.data.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    
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
