from bs4 import BeautifulSoup


def get_cooking_steps(soup_page: BeautifulSoup) -> list:
    cooking_steps = []
    steps_container = soup_page.find("div", {"id": "recipe__steps-content_1-0"})
    steps_list = steps_container.findAll("li")

    for order, step_el in enumerate(steps_list, start=1):
        step_text = step_el.get_text().strip()
        cooking_step = {"order": order, "description": step_text}
        cooking_steps.append(cooking_step)

    return cooking_steps
