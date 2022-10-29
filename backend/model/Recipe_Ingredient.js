const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Recipe_Ingredient', {
    RecipeID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Recipe',
        key: 'RecipeID'
      }
    },
    RawIngredient: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Recipe_Ingredient',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Recipe_Ingredient_pk",
        unique: true,
        fields: [
          { name: "RecipeID" },
        ]
      },
    ]
  });
};
