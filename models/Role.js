const { Model, DataTypes } = require("sequelize");

class Role extends Model {
  static initModel(sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        rolID: {
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Role",
      },
    );
    return Role;
  }
}

module.exports = Role;
