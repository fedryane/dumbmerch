"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class chats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chats.belongsTo(models.user, {
        as: "sender",
        foreignKey: {
          name: "idSender",
        },
      });
      chats.belongsTo(models.user, {
        as: "recipient",
        foreignKey: {
          name: "idRecipient",
        },
      });
    }
  }
  chats.init(
    {
      message: DataTypes.TEXT,
      idSender: DataTypes.INTEGER,
      idRecipient: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "chats",
    }
  );
  return chats;
};
