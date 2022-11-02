/**
 * Import recipes to dev
 */

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const recipes = JSON.parse(fs.readFileSync('recipes.json', 'utf8'))
const ingredients = JSON.parse(fs.readFileSync('Ingredient_Index.json', 'utf8'))

const IngredientToIngredientID = {}
ingredients.forEach((ingredient) => {
    IngredientToIngredientID[ingredient.IngredientString] = ingredient.IngredientID;
})

const bulkRecipes = []
const bulkRecipeSteps = []

recipes.forEach((recipe) => {
    const name = recipe.name
    const pk = name.toLowerCase().split(' ').join('-').replace(/[^\w^-\s]/gi, '')
    const description = recipe["description"]
    const cuisine = recipe["cuisine"]
    const img  = recipe["img"]
    const prepTime  = recipe["details"]["prep_time"]
    const cookingTime  = recipe["details"]["cook_time"]
    const servings  = recipe["details"]["servings"]

    bulkRecipes.push({
        RecipeID: pk,
        Name: name,
        Description: description,
        Cuisine: cuisine,
        ImgLink: img,
        Prep: prepTime,
        CookTime: cookingTime,
        Servings: servings
    });

    recipe.steps.forEach((step) => {
        bulkRecipeSteps.push({
            StepID: uuidv4(),
            OrderOfStep: Number(step.order),
            StepInfo: step.description.trim(),
            RecipeID: pk
        })
     })
});

Recipe.bulkCreate(bulkRecipes, {
    ignoreDuplicates: true
})
.then(() => {
    console.log(`Inserted/updated ${bulkRecipes.length} recipes`);
})

RecipeStep.bulkCreate(bulkRecipeSteps, {
    ignoreDuplicates: true
})
.then(() => {
    console.log(`Inserted/updated ${bulkRecipeSteps.length} recipe steps`);
})
