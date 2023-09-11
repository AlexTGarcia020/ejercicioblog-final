const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  },
);

console.log("Sequelize se ha inicializado correctamente."); 

const Role = require("./Role");
const Comment = require("./Comment");
const Author = require("./Author");
const Article = require("./Article");

Role.initModel(sequelize);
Author.initModel(sequelize);
Article.initModel(sequelize);
Comment.initModel(sequelize);

Author.belongsTo(Role, { foreignKey: "rolID" });
Role.hasMany(Author, { foreignKey: "rolID" });
Author.hasMany(Article, { foreignKey: "authorID" });
Article.belongsTo(Author, { foreignKey: "authorID" });

Article.hasMany(Comment);
Comment.belongsTo(Article);

module.exports = {
  sequelize,
  Comment,
  Article,
  Author,
  Role,
};
