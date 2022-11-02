var DataTypes = require("sequelize").DataTypes;
var _Ingredient_Index = require("./Ingredient_Index");
var _Recipe = require("./Recipe");
var _RecipeStep = require("./RecipeStep");
var _Recipe_Ingredient = require("./Recipe_Ingredient");
var _Recipe_Ingredient_Index = require("./Recipe_Ingredient_Index");

function initModels(sequelize) {
  var Ingredient_Index = _Ingredient_Index(sequelize, DataTypes);
  var Recipe = _Recipe(sequelize, DataTypes);
  var RecipeStep = _RecipeStep(sequelize, DataTypes);
  var Recipe_Ingredient = _Recipe_Ingredient(sequelize, DataTypes);
  var Recipe_Ingredient_Index = _Recipe_Ingredient_Index(sequelize, DataTypes);

  Recipe_Ingredient_Index.belongsTo(Ingredient_Index, { as: "Ingredient", foreignKey: "IngredientID"});
  Ingredient_Index.hasMany(Recipe_Ingredient_Index, { as: "Recipe_Ingredient_Indices", foreignKey: "IngredientID"});
  RecipeStep.belongsTo(Recipe, { as: "Recipe", foreignKey: "RecipeID"});
  Recipe.hasMany(RecipeStep, { as: "RecipeSteps", foreignKey: "RecipeID"});
  Recipe_Ingredient.belongsTo(Recipe, { as: "Recipe", foreignKey: "RecipeID"});
  Recipe.hasOne(Recipe_Ingredient, { as: "Recipe_Ingredient", foreignKey: "RecipeID"});
  Recipe_Ingredient_Index.belongsTo(Recipe, { as: "Recipe", foreignKey: "RecipeID"});
  Recipe.hasOne(Recipe_Ingredient_Index, { as: "Recipe_Ingredient_Index", foreignKey: "RecipeID"});

  return {
    Ingredient_Index,
    Recipe,
    RecipeStep,
    Recipe_Ingredient,
    Recipe_Ingredient_Index,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
