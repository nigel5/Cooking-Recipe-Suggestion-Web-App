from bs4 import BeautifulSoup
from helpers import get_page


def get_recipe_page_links(cuisine_page: str):
    cuisine_recipes_page = get_page(cuisine_page)
    cuisine_recipes_page_soup = BeautifulSoup(cuisine_recipes_page, "lxml")

    recipe_page_element_list = cuisine_recipes_page_soup.findAll(
        "a",
        {
            "class": "comp mntl-card-list-items mntl-document-card mntl-card card card--no-image"
        },
    )

    recipe_page_links = {}
    for recipe_page_element in recipe_page_element_list:
        link = recipe_page_element.get("href")
        img_link = recipe_page_element.find("img").get("data-src")
        recipe_page_links[link] = img_link

    return recipe_page_links
