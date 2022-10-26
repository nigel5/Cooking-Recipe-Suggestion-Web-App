### Recipe Parser

A parser script written in Python that will scrape information off of an online recipe resource - [allrecipes][1]

The parser currently produces approximately **1400-1500 recipes** and **1931 ingredients**.

### Initial setup

In this directory, create a local Python Virtual Environment

```bash
python -m venv ./.venv
```

> **Note:** The python version has to be 3 and up. To check this use `python -V`. If version &lt; 3, try `python3 -V`.

Activate the Virtual Environment.

```bash
source ./.venv/bin/activate
```

> **Note:** Depending on your OS/Terminal, this command may be different, please refer to [documentation][2]

Install the Python requirements.

```bash
pip install -r requirements.txt
```

### Usage

Run the script with:

```
python parser.py
```

[1]: https://www.allrecipes.com/ "AllRecipes website"
[2]: https://docs.python.org/3/library/venv.html#how-venvs-work "How Venvs Work"
