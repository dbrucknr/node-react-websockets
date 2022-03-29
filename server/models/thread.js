"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "Participant",
        foreignKey: "threadId",
      });
      this.hasMany(models.Participant, { foreignKey: "threadId" });
      this.hasMany(models.Message, { foreignKey: "threadId" });
    }
  }
  Thread.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Thread",
    }
  );
  return Thread;
};
