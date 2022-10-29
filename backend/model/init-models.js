const DataTypes = require("sequelize").DataTypes;
const _Ingredient_Index = require("./Ingredient_Index");
const _Recipe = require("./Recipe");
const _Recipe_Ingredient = require("./Recipe_Ingredient");
const _Recipe_Ingredient_Index = require("./Recipe_Ingredient_Index");
const _Recipe_Step = require("./Recipe_Step");

function initModels(sequelize) {
  const Ingredient_Index = _Ingredient_Index(sequelize, DataTypes);
  const Recipe = _Recipe(sequelize, DataTypes);
  const Recipe_Ingredient = _Recipe_Ingredient(sequelize, DataTypes);
  const Recipe_Ingredient_Index = _Recipe_Ingredient_Index(sequelize, DataTypes);
  const Recipe_Step = _Recipe_Step(sequelize, DataTypes);

  Recipe_Ingredient_Index.belongsTo(Ingredient_Index, { as: "Ingredient", foreignKey: "IngredientID"});
  Ingredient_Index.hasMany(Recipe_Ingredient_Index, { as: "Recipe_Ingredient_Indices", foreignKey: "IngredientID"});
  Recipe_Ingredient.belongsTo(Recipe, { as: "Recipe", foreignKey: "RecipeID"});
  Recipe.hasOne(Recipe_Ingredient, { as: "Recipe_Ingredient", foreignKey: "RecipeID"});
  Recipe_Ingredient_Index.belongsTo(Recipe, { as: "Recipe", foreignKey: "RecipeID"});
  Recipe.hasOne(Recipe_Ingredient_Index, { as: "Recipe_Ingredient_Index", foreignKey: "RecipeID"});
  Recipe_Step.belongsTo(Recipe, { as: "Recipe", foreignKey: "RecipeID"});
  Recipe.hasOne(Recipe_Step, { as: "Recipe_Step", foreignKey: "RecipeID"});

  return {
    Ingredient_Index,
    Recipe,
    Recipe_Ingredient,
    Recipe_Ingredient_Index,
    Recipe_Step,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
