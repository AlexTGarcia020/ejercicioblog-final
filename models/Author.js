const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const Role = require("./Role");

class Author extends Model {
  static initModel(sequelize) {
    console.log("Inicializando modelo Author...");
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
          type: DataTypes.BIGINT.UNSIGNED,
        },
        authorID: {
          type: DataTypes.BIGINT.UNSIGNED,
        }
      },
      {
        sequelize,
        modelName: "Author",
      }
    );

    
    Author.belongsTo(Role, { foreignKey: "rolID" });

    Author.addHook("beforeCreate", async (author, options) => {
      console.log("BeforeCreate hook ejecutado para Author."); 
      console.log(author); 
      const hashedPassword = await bcrypt.hash(author.password, 10);
      author.password = hashedPassword;
    });

    console.log("Modelo Author inicializado con éxito.");
    return Author;
  }
}

module.exports = Author;
