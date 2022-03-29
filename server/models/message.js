"use strict";
const config = require("../config/app");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Thread, { foreignKey: "threadId" });
    }
  }
  Message.init(
    {
      type: DataTypes.STRING,
      message: {
        type: DataTypes.TEXT,
        get() {
          const type = this.getDataValue("type");
          const id = this.getDataValue("threadId");
          const content = this.getDataValue("message");

          return type === "text"
            ? content
            : `${config.appUrl}:${config.appPort}/thread/${id}/${content}`;
        },
      },
      threadId: DataTypes.INTEGER,
      fromUserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};