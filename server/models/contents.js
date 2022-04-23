'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Comments.belongsTo(models.Users, {
        foreignKey: "userid"
      })
      models.Content.hasMany(models.Comment, {
        foreignKey: 'contentid'
      })
    }
  }
  Contents.init({
    title: DataTypes.STRING,
    weather: DataTypes.STRING,
    content: DataTypes.STRING,
    imgmain: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contents',
  });
  return Contents;
};