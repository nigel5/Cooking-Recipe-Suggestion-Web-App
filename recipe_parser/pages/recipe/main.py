from bs4 import BeautifulSoup
from helpers import get_page

from .info import get_name, get_description, get_details, get_nutrition_facts
from .ingredients import get_ingredients
from .steps import get_cooking_steps


def parse_recipe(url: str, cuisine: str, img_link: str):
    page = get_page(url)
    if not page:
        return None

    soup_page = BeautifulSoup(page, "lxml")

    name = get_name(soup_page)
    description = get_description(soup_page)
    ingredients_raw, ingredients_parsed = get_ingredients(soup_page)
    steps = get_cooking_steps(soup_page)
    details = get_details(soup_page)
    nutrition_facts = get_nutrition_facts(soup_page)

    recipe = {
        "name": name,
        "description": description,
        "cuisine": cuisine,
        "img": img_link,
        "ingredients_raw": ingredients_raw,
        "ingredients_parsed": ingredients_parsed,
        "steps": steps,
        "details": details,
        "nutrition_facts": nutrition_facts,
    }

    return recipe
