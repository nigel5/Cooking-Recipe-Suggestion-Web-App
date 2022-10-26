import json
import pages


recipes = []
ingredients = set()

# get links for each cuisine's homepage
cuisine_pages = pages.cuisines.get_cuisine_page_links()

for cuisine_name in cuisine_pages:
    cuisine_link = cuisine_pages[cuisine_name]
    # get links for each recipe's page of this cuisine
    cuisine_recipes_links = pages.recipes.get_recipe_page_links(cuisine_link)

    for recipe_link in cuisine_recipes_links:
        # try to extract ingredients from a recipe
        try:
            recipe = pages.recipe.parse_recipe(
                url=recipe_link,
                cuisine=cuisine_name,
                img_link=cuisine_recipes_links[recipe_link],
            )
            recipes.append(recipe)
            ingredients.update(recipe["ingredients_parsed"])
        # if parsing is unsuccessfull, discard recipe
        except Exception as e:
            continue

json_recipes = json.dumps(recipes)
fr = open("./parsed/recipes.json", "w")
fr.write(json_recipes)
fr.close()

json_ingredients = json.dumps(list(ingredients))
fi = open("./parsed/ingredients.json", "w")
fi.write(json_ingredients)
fi.close()
