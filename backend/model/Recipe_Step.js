const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipe_Step', {
    RecipeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Recipe',
        key: 'RecipeID'
      }
    },
    StepInfo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    OrderOfStep: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Recipe_Step',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "RecipeStep_pk",
        unique: true,
        fields: [
          { name: "RecipeID" },
        ]
      },
    ]
  });
};
