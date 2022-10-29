const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipe_Ingredient_Index', {
    RecipeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Recipe',
        key: 'RecipeID'
      }
    },
    IngredientID: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'Ingredient_Index',
        key: 'IngredientID'
      }
    }
  }, {
    sequelize,
    tableName: 'Recipe_Ingredient_Index',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Recipe_Ingredient_Index_pk",
        unique: true,
        fields: [
          { name: "RecipeID" },
        ]
      },
    ]
  });
};
