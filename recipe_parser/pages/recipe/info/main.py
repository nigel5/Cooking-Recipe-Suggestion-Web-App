from os import execv
from random import betavariate
from bs4 import BeautifulSoup


def get_name(soup_page: BeautifulSoup) -> str:
    try:
        name = soup_page.find("h1", {"id": "article-heading_2-0"}).get_text().strip()
    except Exception:
        # if exception encountered, try fetching v1 version of element
        name = soup_page.find("h1", {"id": "article-heading_1-0"}).get_text().strip()

    return name


def get_description(soup_page: BeautifulSoup) -> str:
    try:
        description = (
            soup_page.find("h2", {"id": "article-subheading_2-0"}).get_text().strip()
        )
    except Exception:
        # if exception encountered, try fetching v1 version of element
        description = (
            soup_page.find("h2", {"id": "article-subheading_1-0"}).get_text().strip()
        )

    return description


def get_details(soup_page: BeautifulSoup) -> dict:
    label_to_slug_map = {
        "Prep Time:": "prep_time",
        "Cook Time:": "cook_time",
        "Servings:": "servings",
    }
    details = {}

    details_list = soup_page.find(
        "div", {"class": "mntl-recipe-details__content"}
    ).findAll("div", {"class": "mntl-recipe-details__item"})

    for details_item in details_list:
        label = (
            details_item.find("div", {"class": "mntl-recipe-details__label"})
            .get_text()
            .strip()
        )

        if label not in label_to_slug_map:
            continue

        value = (
            details_item.find("div", {"class": "mntl-recipe-details__value"})
            .get_text()
            .strip()
        )

        details[label_to_slug_map[label]] = value

    return details


def get_nutrition_facts(soup_page: BeautifulSoup) -> dict:
    label_to_slug_map = {
        "Calories": "calories",
        "Fat": "fat",
        "Carbs": "carbs",
        "Protein": "protein",
    }
    nutrition_facts = {}

    nutrition_facts_list = soup_page.find_all(
        "tr", {"class": "mntl-nutrition-facts-summary__table-row"}
    )

    for nutrition_fact_item in nutrition_facts_list:
        try:
            label = (
                nutrition_fact_item.find(
                    "td",
                    {"class": "mntl-nutrition-facts-summary__table-cell type--dogg"},
                )
                .get_text()
                .strip()
            )
        except Exception:
            label = (
                nutrition_fact_item.find(
                    "td",
                    {"class": "mntl-nutrition-facts-summary__table-cell type--dog"},
                )
                .get_text()
                .strip()
            )

        if label not in label_to_slug_map:
            continue

        value = (
            nutrition_fact_item.find(
                "td",
                {"class": "mntl-nutrition-facts-summary__table-cell type--dog-bold"},
            )
            .get_text()
            .strip()
        )

        nutrition_facts[label_to_slug_map[label]] = value

    return nutrition_facts
