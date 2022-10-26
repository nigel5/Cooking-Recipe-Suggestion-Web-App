import inflect
import re
import unicodedata

from parse_ingredients import parse_ingredient

from bs4 import BeautifulSoup


def get_ingredients(soup_page: BeautifulSoup) -> tuple[list, list]:
    ingredients_raw = []
    ingredients_parsed = set()
    ingredients_list = soup_page.findAll(
        "li", {"class": "mntl-structured-ingredients__list-item"}
    )
    for ingredient_el in ingredients_list:
        ingredient_raw_text = ingredient_el.get_text()
        ingredient_text = format_ingredient(ingredient_raw_text)
        ingredient = extract_ingredient(ingredient_text)

        ingredients_raw.append(ingredient_text)
        if ingredient == "ERRPARSING":
            continue
        ingredients_parsed.add(ingredient)

    return ingredients_raw, list(ingredients_parsed)


def format_ingredient(ingredient: str) -> str:
    # remove trailing spaces and newlines
    ingredient = ingredient.strip()
    # remove parentheses () and brackets [] content
    ingredient = re.sub("[\(\[].*?[\)\]]", "", ingredient)
    # remove multiple spaces and hyphen delimiters
    ingredient = ingredient.replace("  ", " ")
    ingredient = ingredient.replace(" - ", " ")
    # convert unicode fractions to floats
    ingredient = convert_vulgar_fraction_to_float(ingredient)

    return ingredient


def extract_ingredient(ingredient_text: str) -> str:
    ingredient_name = parse_ingredient(ingredient_text).__dict__["name"]
    infl = inflect.engine()
    try:
        ingredient_singular = infl.singular_noun(ingredient_name)
    except Exception:
        ingredient_singular = "ERRPARSING"

    ingredient = ingredient_singular if ingredient_singular else ingredient_name

    return ingredient


def convert_vulgar_fraction_to_float(ingredient: str) -> str:
    # ! poorly written function
    vf = get_vulgar_fraction(ingredient)
    if not vf:
        return ingredient

    vf_index = ingredient.index(vf)
    vf_numeric = unicodedata.numeric(vf)
    if vf_index == 0:
        ingredient = ingredient.replace(vf, str(vf_numeric))
    else:
        # ! huge assumption
        whole_number_str = ingredient[:vf_index]
        quantity = float(whole_number_str) + vf_numeric
        ingredient = ingredient.replace(
            ingredient[: vf_index + 1], str(round(quantity))
        )

    return ingredient


def get_vulgar_fraction(string: str):
    search_result = re.search(r"[\u2150-\u215E\u00BC-\u00BE]", string)
    if not search_result:
        return None

    return search_result.group(0)
