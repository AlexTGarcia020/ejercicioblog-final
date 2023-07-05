const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const Role = require("./Role");

class Author extends Model {
  static initModel(sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
        },
        lastname: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
        rolID: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "Author",
      },
    );

    Author.belongsTo(Role, { foreignKey: "roleId" });

    Author.addHook("beforeCreate", async (author, options) => {
      console.log(author);
      const hashedPassword = await bcrypt.hash(author.password, 10);
      author.password = hashedPassword;
    });
    return Author;
  }
}

module.exports = Author;
