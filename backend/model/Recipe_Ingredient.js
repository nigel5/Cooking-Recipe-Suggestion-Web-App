const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipe_Ingredient', {
    RecipeIngredientID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    RawIngredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    RecipeID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Recipe',
        key: 'RecipeID'
      }
    }
  }, {
    sequelize,
    tableName: 'Recipe_Ingredient',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "recipe_ingredient_pkey",
        unique: true,
        fields: [
          { name: "RecipeIngredientID" },
        ]
      },
    ]
  });
};
