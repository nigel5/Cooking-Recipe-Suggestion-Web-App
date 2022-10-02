/**
 * Cooking Recipe Suggestion App Backend
 * CPS714 Group E
 * 
 */
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require("helmet");
const app = express()
const port = 3000


/**
 * Test data
 */
const data = {
    1: {
        "id": 1,
        "name": "Recipe 1",
        "description": "<p>Easy recipe</p>",
        "ingredients": [
            "bread",
            "peanut butter",
            "jam",
        ],
        "steps": [
            {
                "order": 1,
                "description" : "toast bread",
            },
            {
                "order": 2,
                "description" : "spread peanut butter on one slice of bread",
            },
            {
                "order": 3,
                "description" : "spread jam on the other slice of bread",
            },
            {
                "order": 4,
                "description" : "put them together",
            },
        ],
        "preparationTime": 5,
        "cookingTime": 1,
    },
}

const notFoundResponse = {
    "status": 404,
    "message": "Not found",
}

/**
 * Middleware
 */
app.use(helmet());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.json());


/**
 * Endpoints
 */

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * Get a recipe
 */
app.get('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    if (recipeId in data) {
        return res.send(data[recipeId]);
    }

    res.status(404).send(notFoundResponse);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})