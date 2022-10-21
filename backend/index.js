/**
 * Cooking Recipe Suggestion App Backend
 * CPS714 Group E
 * 
 */
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000


/**
 * Test data
 */
let data = {
    1: {
        "id": 1,
        "name": "Recipe 1",
        "description": "<p>Easy recipe</p>",
        "ingredients": [
            {
                "id": 1,
                "name": "Bread",
            },
            {
                "id": 2,
                "name": "Peanut butter",
            },
            {

                "id": 3,
                "name": "Jam",
            },
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
        "deleted": false,
    },
    2: {
        "id": 2,
        "name": "Recipe 2",
        "description": "<p>Medium recipe</p>",
        "ingredients": [
            {
                "id": 4,
                "name": "Tuna",
            },
            {
                "id": 5,
                "name": "Jasmine Rice",
            },
            {

                "id": 6,
                "name": "Brocolli",
            },
        ],
        "steps": [
            {
                "order": 1,
                "description" : "cook rice and tuna",
            },
            {
                "order": 2,
                "description" : "add tuna",
            },
            {
                "order": 3,
                "description" : "boil and add brocolli to bowl",
            },
        ],
        "preparationTime": 15,
        "cookingTime": 15,
        "deleted": false,
    }
}

const notFoundResponse = {
    "status": 404,
    "message": "Not found",
}
const successResponse = {
    "status": 200,
    "message": "Success",
}

/**
 * Middleware
 */
app.use(helmet())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())


/**
 * Endpoints
 */

app.get('/', (req, res) => {
  res.send('There\'s nothing here')
})

/**
 * Get a recipe by Id
 */
app.get('/recipes/:id', (req, res) => {
    const recipeId = req.params.id
    if (recipeId in data) {
        console.log(`Sending ${recipeId}`);
        return res.send(data[recipeId])
    }

    res.status(404).send(notFoundResponse);
})

/**
 * Get all recipes
 */
app.get('/recipes', (req, res) => {
    res.status(200).send(data);
})

/**
 * Add ingredient to a recipe
 */
//  app.put('/recipes/:id/ingredients', body('name').isString(), (req, res) => {
//     const ingredient = {
//         "id": uuidv4(),
//         "name": req.body.name
//     }

//     const recipeId = req.params.id
//     if (recipeId in data) {
//         data[recipeId].ingredients.append(ingredient)
//     }
// })

/**
 * Delete a recipe
 */
app.delete('/recipes/:id', (req, res) => {
    const recipeId = req.params.id
    delete data[recipeId]
    res.status(200).send(successResponse)
})

/**  
* Add a recipe
*/
app.post('/recipes/add', (req, res) => {
    const recipe = {
        id: uuidv4(),
        name: req.body.name,
        description: req.body.description ? req.body.description: '',
        ingredients: req.body.ingredients ? req.body.ingredients : [],
        steps: req.body.steps ? req.body.steps : [],
        preparationTime: req.body.preparationTime,
        cookingTime: req.body.cookingTime,
        deleted: false
    }
    //refactor when SQL is hooked up
    data[uuidv4()] = recipe
    res.status(200).send(successResponse)
})

app.listen(port, () => {
  console.log(`Cooking Recipe Suggestions App listening on port ${port}`)
})
