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

const Role = require("./Role");
const Comment = require("./Comment");
const Article = require("./Article");
const Author = require("./Author");

Comment.initModel(sequelize);
Article.initModel(sequelize);
Author.initModel(sequelize);
Role.initModel(sequelize);

Author.belongsTo(Role, { foreignKey: "rolID" });
Role.hasMany(Author, { foreignKey: "rolID" });

Article.hasMany(Comment);
Comment.belongsTo(Article);

module.exports = {
  sequelize,
  Comment,
  Article,
  Author,
  Role,
};
