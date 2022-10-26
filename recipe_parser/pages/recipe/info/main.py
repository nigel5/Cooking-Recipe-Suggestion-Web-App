from random import betavariate
from bs4 import BeautifulSoup


def get_name(soup_page: BeautifulSoup) -> str:
    name = soup_page.find("h1", {"id": "article-heading_1-0"}).get_text().strip()

    return name


def get_description(soup_page: BeautifulSoup) -> str:
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
