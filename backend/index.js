/**
 * Cooking Recipe Suggestion App Backend
 * CPS714 Group E
 * 
 */


// TODO Add a cache e.g., Redis, to reduce the number of db queries
// TOOD Every x hours it should read from the DB to update the cache
// importIngredients(Ingredient_Index);
// importRecipes(Recipe, Recipe_Ingredient_Index, RecipeStep, Recipe_Ingredient);
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const helmet = require("helmet")
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = 3000
const { Sequelize, Op } = require('sequelize')
const initModels = require('./model/init-models')
// const importRecipes = require('./util/importRecipes')
// const importIngredients = require('./util/importIngredients')

const SEARCH_BY_INGREDIENTS_1 = require('./db/queries').SEARCH_BY_RECIPE_NOT_LIMITED;

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
                "description": "toast bread",
            },
            {
                "order": 2,
                "description": "spread peanut butter on one slice of bread",
            },
            {
                "order": 3,
                "description": "spread jam on the other slice of bread",
            },
            {
                "order": 4,
                "description": "put them together",
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
                "description": "cook rice and tuna",
            },
            {
                "order": 2,
                "description": "add tuna",
            },
            {
                "order": 3,
                "description": "boil and add brocolli to bowl",
            },
        ],
        "preparationTime": 15,
        "cookingTime": 15,
        "deleted": false,
    }
}

function sendNotFound(res) {
    res.status(404).send({
        "status": 404,
        "message": "Not found",
    })
}

function sendBadRequest(res) {
    res.status(400).send({
        "status": 404,
        "message": "Bad request",
    })
}

function sendError(res, msg) {
    res.send(500).send({
        "status": 500,
        "msg": msg
    })
}

/**
 * Middleware
 */
app.use(helmet())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())

/**
 * Database Connection
 */
const sequelize = new Sequelize(process.env.DATABASE_URL)
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')
})
.catch((err) => {
    console.error('Unable to connect to the database:', error)
    process.exit(-1);
})

const { 
    Ingredient_Index,
    Recipe,
    Recipe_Ingredient,
    Recipe_Ingredient_Index,
    RecipeStep
} = initModels(sequelize)

/**
 * Endpoints
 */

app.get('/', (req, res) => {
    res.send('There\'s nothing here')
})

/**
 * Get a recipe by Id
 */
app.get('/recipes/:id', async (req, res) => {
    const recipeId = req.params.id

    if (!recipeId) {
        return sendBadRequest(res)
    }

    const recipe = await Recipe.findByPk(recipeId)

    if (recipe === null) {
        return sendNotFound(res)
    }

    // Get the steps for the recipe
    const steps = await RecipeStep.findAll({
        where: {
            RecipeID: recipeId
        }
    })

    return res.status(200).send({
        "status": 200,
        recipe,
        steps
    })
})

/**
 * Get recipes that are using, but not limited, to these ingredients
 */
app.get('/search', async (req, res) => {
    let i = req.query.ingredient
    if (!i) {
        return sendBadRequest(res)
    }

    // 1 ingredient -> Convert to an array with one element only
    if (!Array.isArray(i)) {
        i = [i]
    }

    console.log(`Search for recipes with ingredients: ${i}`)

    try {
        const [results, _] = (await sequelize.query(SEARCH_BY_INGREDIENTS_1,
            {
                replacements: [i, i.length]
            }
        ))

        console.log(results);

        return res.status(200).send({
            "status": 200,
            "results": results
        })
    } catch (e) {
        console.log(e)
        return sendError(res, "Internal server error")
    }
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
        description: req.body.description ? req.body.description : '',
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

/**
 * Get ingredients
 */
app.get('/ingredients/:page', async (req, res) => {
    const page = Number(req.params.page)

    if (!Number.isInteger(page) || page < 0 || page > 199) {
        return sendError(res, "Bad pagination index. Please enter a number between 0 and 200.")
    }

    const offset = page * 10;

    const ingredients = await Ingredient_Index.findAndCountAll({
        order: [
            ['IngredientString', 'ASC']
        ],
        offset,
        limit: 100
    })

    res.send({
        page,
        count: ingredients.length,
        data: ingredients.rows
    })
})

app.listen(port, () => {
    console.log(`Cooking Recipe Suggestions App listening on port ${port}`)
})
