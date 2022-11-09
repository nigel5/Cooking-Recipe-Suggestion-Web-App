module.exports.SEARCH_BY_RECIPE_NOT_LIMITED = `select *
from "Recipe"
inner join (select distinct "RecipeID"
           from "Recipe_Ingredient_Index" recipesIngredientsIndex
                    inner join "Ingredient_Index" ingredientsIndex
                               on recipesIngredientsIndex."IngredientID" = ingredientsIndex."IngredientID"
           where ingredientsIndex."IngredientID" in (?)
           group by "RecipeID"
           having COUNT(distinct ingredientsIndex."IngredientID") = ?
) as foundRecipes
on "Recipe"."RecipeID" = foundRecipes."RecipeID"`
