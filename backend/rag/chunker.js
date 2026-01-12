function chunkArticles(articles) {
  const chunks = [];

  articles.forEach(article => {
    for (const section in article.content) {
      chunks.push({
        chunkId: `${article.id}_${section}`,
        articleId: article.id,
        title: article.title,
        section,
        text: article.content[section]
      });
    }
  });

  return chunks;
}

module.exports = chunkArticles;
