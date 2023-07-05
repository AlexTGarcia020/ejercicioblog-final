const { faker } = require("@faker-js/faker");
const { Comment, Article } = require("../models");

faker.locale = "es";

module.exports = async () => {
  const article = await Article.findAll();
  const comments = [];

  for (let i = 0; i < 8; i++) {
    const randomArticle = article[Math.floor(Math.random() * article.length)];

    comments.push({
      comment: faker.lorem.paragraphs(2),
      username: faker.name.firstName(),
      articleId: randomArticle.id,
    });
  }

  await Comment.bulkCreate(comments);
  console.log("[Database] Se corrió el seeder de Comments.");
};
