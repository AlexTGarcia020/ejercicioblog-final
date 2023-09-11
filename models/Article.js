const { Model, DataTypes } = require("sequelize");
const Author = require("./Author");

class Article extends Model {
  static initModel(sequelize) {
    Article.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        content: {
          type: DataTypes.TEXT,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        authorID: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "article",
        tableName: "article",
      },
    );

    Article.belongsTo(Author, { foreignKey: "authorID" });

    return Article;
  }
}

module.exports = Article;
