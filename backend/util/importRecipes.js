/**
 * Import recipes to dev
 */

module.exports = function (
    recipeModel,
    recipeIngredientIndexModel,
    recipeStepModel,
    recipeIngredientModel
) {
    const { v4: uuidv4 } = require("uuid");
    const fs = require("fs");
    const getPrimaryKey = require("./getPrimaryKey");
    const recipes = JSON.parse(fs.readFileSync("recipes.json", "utf8"));
    const ingredients = JSON.parse(
        fs.readFileSync("Ingredient_Index.json", "utf8")
    );

    const IngredientToIngredientID = {};
    ingredients.forEach((ingredient) => {
        IngredientToIngredientID[ingredient.IngredientString] =
            ingredient.IngredientID;
    });

    const bulkRecipes = [];
    const bulkRecipeSteps = [];
    const bulkRecipeIngredientIndex = [];
    const bulkRecipeIngredientStr = [];

    recipes.forEach((recipe) => {
        const name = recipe.name;
        const pk = getPrimaryKey(name);
        const description = recipe["description"];
        const cuisine = recipe["cuisine"];
        const img = recipe["img"];
        const prepTime = recipe["details"]["prep_time"];
        const cookingTime = recipe["details"]["cook_time"];
        const servings = recipe["details"]["servings"];
        const calories = recipe["nutrition_facts"]["calories"];
        const fat = recipe["nutrition_facts"]["fat"];
        const carbs = recipe["nutrition_facts"]["carbs"];
        const protein = recipe["nutrition_facts"]["protein"];

        bulkRecipes.push({
            RecipeID: pk,
            Name: name,
            Description: description,
            Cuisine: cuisine,
            ImgLink: img,
            Prep: prepTime,
            CookTime: cookingTime,
            Servings: servings,
            Calories: calories,
            Fat: fat,
            Carbs: carbs,
            Protein: protein,
        });

        recipe.steps.forEach((step) => {
            bulkRecipeSteps.push({
                StepID: uuidv4(),
                OrderOfStep: Number(step.order),
                StepInfo: step.description.trim(),
                RecipeID: pk,
            });
        });

        // Associate this recipe with the ingredient for DISPLAY
        const rawIngredientStr = recipe.ingredients_raw;
        rawIngredientStr.forEach((str) => {
            bulkRecipeIngredientStr.push({
                RecipeID: pk,
                RawIngredient: str,
                RecipeIngredientID: uuidv4(),
            });
        });

        // Associate this recipe with the ingredients for SEARCH
        const ingredients = recipe.ingredients_parsed;
        ingredients.forEach((ingredient) => {
            const ingredientPK = getPrimaryKey(ingredient);
            bulkRecipeIngredientIndex.push({
                IngredientID: ingredientPK,
                RecipeID: pk,
            });
        });
    });

    recipeModel
        .bulkCreate(bulkRecipes, {
            ignoreDuplicates: true,
        })
        .then(() => {
            console.log(`Inserted/updated ${bulkRecipes.length} recipes`);
        });

    recipeStepModel
        .bulkCreate(bulkRecipeSteps, {
            ignoreDuplicates: true,
        })
        .then(() => {
            console.log(
                `Inserted/updated ${bulkRecipeSteps.length} recipe steps`
            );
        });

    recipeIngredientModel
        .bulkCreate(bulkRecipeIngredientStr, {
            ignoreDuplicates: true,
        })
        .then(() => {
            console.log(
                `Inserted/updated ${bulkRecipes.length} recipe ingredients`
            );
        });

    recipeIngredientIndexModel
        .bulkCreate(bulkRecipeIngredientIndex, {
            ignoreDuplicates: true,
        })
        .then(() => {
            console.log(
                `Inserted/updated ${bulkRecipes.length} recipe to ingredients index`
            );
        });
};
