import requests


def get_page(url: str):
    page = None

    try:
        request = requests.get(url)

        if not request.status_code == 200:
            print("Request response not OK")

        page = request.text
    except Exception as e:
        print(f"Exception encountered when fetching page: {url}; e: {e}")

    return page
