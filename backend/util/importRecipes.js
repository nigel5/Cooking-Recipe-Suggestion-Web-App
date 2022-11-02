/**
 * Import recipes to dev
 */

const fs = require('fs');
const recipes = JSON.parse(fs.readFileSync('recipes.json', 'utf8'))
const ingredients = JSON.parse(fs.readFileSync('Ingredient_Index.json', 'utf8'))

const IngredientToIngredientID = {}
ingredients.forEach((ingredient) => {
    IngredientToIngredientID[ingredient.IngredientString] = ingredient.IngredientID;
})

const bulkRecipes = []
recipes.forEach((recipe) => {
    const name = recipe.name
    const pk = name.toLowerCase().split(' ').join('-');
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
});

Recipe.bulkCreate(bulkRecipes, {
    ignoreDuplicates: true
})
.then(() => {
    console.log(`Inserted/updated ${bulkRecipes.length} recipes`);
})
