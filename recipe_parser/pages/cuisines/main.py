from bs4 import BeautifulSoup
from helpers import get_page


def get_cuisine_page_links() -> dict:
    cuisine_list_page = get_page("https://www.allrecipes.com/cuisine-a-z-6740455")
    cuisine_list_page_soup = BeautifulSoup(cuisine_list_page, "lxml")

    cuisine_page_element_list = cuisine_list_page_soup.findAll(
        "li", {"class": "comp link-list__item"}
    )

    cuisine_page_links = {}
    for cuisine_page_element in cuisine_page_element_list:
        link_el = cuisine_page_element.find("a")
        name = link_el.get_text().strip()
        link = link_el.get("href")
        cuisine_page_links[name] = link

    return cuisine_page_links
