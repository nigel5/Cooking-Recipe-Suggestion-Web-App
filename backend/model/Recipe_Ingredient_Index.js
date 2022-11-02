const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipe_Ingredient_Index', {
    RecipeID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Recipe',
        key: 'RecipeID'
      },
      unique: "recipe_ingredient_index_recipeid_ingredientid_key"
    },
    IngredientID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Ingredient_Index',
        key: 'IngredientID'
      },
      unique: "recipe_ingredient_index_recipeid_ingredientid_key"
    },
    rowid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('unique_rowid'),
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'Recipe_Ingredient_Index',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "recipe_ingredient_index_pkey",
        unique: true,
        fields: [
          { name: "rowid" },
        ]
      },
      {
        name: "recipe_ingredient_index_recipeid_ingredientid_key",
        unique: true,
        fields: [
          { name: "RecipeID" },
          { name: "IngredientID" },
        ]
      },
    ]
  });
};
