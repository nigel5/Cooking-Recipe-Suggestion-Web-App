/**
 * Cooking Recipe Suggestion App Backend
 * CPS714 Group E
 *
 */

// TODO Add a cache e.g., Redis, to reduce the number of db queries
// TOOD Every x hours it should read from the DB to update the cache
// importIngredients(Ingredient_Index);
// importRecipes(Recipe, Recipe_Ingredient_Index, RecipeStep, Recipe_Ingredient);
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const redis = require("redis");
const app = express();
const port = 3000;
const { Sequelize, Op } = require("sequelize");
const initModels = require("./model/init-models");
const getPrimaryKey = require("./util/getPrimaryKey");

const SEARCH_BY_INGREDIENTS_1 =
  require("./db/queries").SEARCH_BY_RECIPE_NOT_LIMITED;

const CACHE_TTL = 86400; // Seconds for cache entries to expire

/**
 * Test data
 */
let data = {
  1: {
    id: 1,
    name: "Recipe 1",
    description: "<p>Easy recipe</p>",
    ingredients: [
      {
        id: 1,
        name: "Bread",
      },
      {
        id: 2,
        name: "Peanut butter",
      },
      {
        id: 3,
        name: "Jam",
      },
    ],
    steps: [
      {
        order: 1,
        description: "toast bread",
      },
      {
        order: 2,
        description: "spread peanut butter on one slice of bread",
      },
      {
        order: 3,
        description: "spread jam on the other slice of bread",
      },
      {
        order: 4,
        description: "put them together",
      },
    ],
    preparationTime: 5,
    cookingTime: 1,
    deleted: false,
  },
  2: {
    id: 2,
    name: "Recipe 2",
    description: "<p>Medium recipe</p>",
    ingredients: [
      {
        id: 4,
        name: "Tuna",
      },
      {
        id: 5,
        name: "Jasmine Rice",
      },
      {
        id: 6,
        name: "Brocolli",
      },
    ],
    steps: [
      {
        order: 1,
        description: "cook rice and tuna",
      },
      {
        order: 2,
        description: "add tuna",
      },
      {
        order: 3,
        description: "boil and add brocolli to bowl",
      },
    ],
    preparationTime: 15,
    cookingTime: 15,
    deleted: false,
  },
};

function sendNotFound(res) {
  res.status(404).send({
    status: 404,
    message: "Not found",
  });
}

function sendBadRequest(res) {
  res.status(400).send({
    status: 404,
    message: "Bad request",
  });
}

function sendError(res, msg) {
  res.status(500).send({
    status: 500,
    msg: msg,
  });
}

function getCacheKey(name, params, query, n) {
  if (!name) return null;

  let key = getPrimaryKey(name);
  if (params) key += "-" + getPrimaryKey(params);
  if (query) key += "-" + getPrimaryKey(query);
  if (n) key += "-" + getPrimaryKey(n);

  return key;
}

async function setCacheEntry(key, value) {
  if (redisClientReady) {
    await redisClient.set(key, value);
    await redisClient.expire(key, CACHE_TTL);
  }
}

/**
 * Middleware
 */
app.use(helmet());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(bodyParser.json());

/**
 * Cache
 */
let redisClient;
let redisClientReady = false;

(async() => {
  redisClient = redis.createClient();

  redisClient.on("error", (e) => {
    console.error(`error instantiating redis client ${e}. running with no cache`);
  });

  redisClient.on("connect", () => {
    console.log("redis connection established");
    redisClientReady = true;
  });

  await redisClient.connect();
})();

/**
 * Database Connection
 */
const sequelize = new Sequelize(process.env.DATABASE_URL);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");

  })
  .catch((err) => {
    console.error("Unable to connect to the database:", error);
    process.exit(-1);
  });

const {
  Ingredient_Index,
  Recipe,
  Recipe_Ingredient,
  Recipe_Ingredient_Index,
  RecipeStep,
} = initModels(sequelize);

/**
 * Endpoints
 */

app.get("/", (req, res) => {
  res.send("There's nothing here");
});

/**
 * Get a recipe by Id
 */
app.get("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  let cached = false;
  let results;

  if (!recipeId) {
    return sendBadRequest(res);
  }

  const cacheKey = getCacheKey("recipes", recipeId);
  try {
    let cacheRes;
    if (redisClientReady) {
      cacheRes = await redisClient.get(cacheKey);
    }

    if (cacheRes) {
      cached = true;
      results = JSON.parse(cacheRes);
    } else {
      const recipe = await Recipe.findByPk(recipeId);

      if (recipe === null) {
        return sendNotFound(res);
      }

      // Get the steps for the recipe
      const steps = await RecipeStep.findAll({
        where: {
          RecipeID: recipeId,
        },
      });

      // Get the ingredients of the recipe
      const ingredients = await Recipe_Ingredient.findAll({
        where: {
          RecipeID: recipeId,
        },
      });

      results = {
        recipe,
        ingredients,
        steps,
      };

      setCacheEntry(cacheKey, JSON.stringify(results));
    }
  } catch (e) {
    return sendError(res, "Internal server error");
  }

  return res.status(200).send({
    status: 200,
    "recipe": results.recipe,
    "steps": results.steps,
    "ingredients": results.ingredients,
    cached,
  });
});

/**
 * Get recipes that are using, but not limited, to these ingredients
 */
app.get("/search", async (req, res) => {
  let i = req.query.ingredient;
  let cached = false;
  let results;

  if (!i) {
    return sendBadRequest(res);
  }

  // 1 ingredient -> Convert to an array with one element only
  if (!Array.isArray(i)) {
    i = [i];
  }

  console.log(`Search for recipes with ingredients: ${i}`);

  const cacheKey = getCacheKey("search", i.toString());
  try {
    let cacheRes;
    if (redisClientReady) {
      cacheRes = await redisClient.get(cacheKey);
    }

    if (cacheRes) {
      cached = true;
      results = JSON.parse(cacheRes);
    } else {
      const [dbResults, _] = await sequelize.query(SEARCH_BY_INGREDIENTS_1, {
        replacements: [i, i.length],
      });

      results = dbResults;

      setCacheEntry(cacheKey, JSON.stringify(results));
    }

    return res.status(200).send({
      status: 200,
      results: results,
      cached,
    });
  } catch (e) {
    console.log(e);
    return sendError(res, "Internal server error");
  }
});

/**
 * Get recipes by page and page size
 * Example without pageSize (defaults page size to 10): /recipes?page=1
 * Example with pageSize: /recipes?page=1&pageSize=5
 * If no page query is written then it will throw an error
 */
app.get("/recipes", async (req, res) => {
  let cached = false;
  let results;
  const page = Number(req.query.page);
  let pageSize = Number(req.query.pageSize);

  if (!pageSize) {
    pageSize = 10;
  }

  if (!page) {
    return sendError(
      res,
      "Error. Please specify a page number between 0 and 149. Like so `recipes?page=1`"
    );
  }
  if (!Number.isInteger(page) || page < 0 || page > 149) {
    return sendError(
      res,
      "Bad pagination index. Please enter a number between 0 and 149"
    );
  }

  const offset = page * pageSize;

  const cacheKey = getCacheKey("recipes-pages-get", offset.toString());
  try {
    let cacheRes;
    if (redisClientReady) {
      cacheRes = await redisClient.get(cacheKey);
    }

    if (cacheRes) {
      cached = true;
      results = JSON.parse(cacheRes);
    } else {
      results = await Recipe.findAndCountAll({
        order: [["RecipeID", "ASC"]],
        offset,
        limit: pageSize,
      });

      setCacheEntry(cacheKey, JSON.stringify(results));
    }
  } catch (e) {
    console.error(e);
    return sendError(res, "Internal server error");
  }

  res.send({
    page,
    count: results.length,
    data: results.rows,
    cached,
  });
});

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
app.delete("/recipes/:id", (req, res) => {
  const recipeId = req.params.id;
  delete data[recipeId];
  res.status(200).send(successResponse);
});

/**
 * Add a recipe
 */
app.post("/recipes/add", (req, res) => {
  const recipe = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description ? req.body.description : "",
    ingredients: req.body.ingredients ? req.body.ingredients : [],
    steps: req.body.steps ? req.body.steps : [],
    preparationTime: req.body.preparationTime,
    cookingTime: req.body.cookingTime,
    deleted: false,
  };
  //refactor when SQL is hooked up
  data[uuidv4()] = recipe;
  res.status(200).send(successResponse);
});

/**
 * Get ingredients
 */
app.get("/ingredients/:page", async (req, res) => {
  let cached = false;
  let results;

  const page = Number(req.params.page);

  if (!Number.isInteger(page) || page < 0 || page > 199) {
    return sendError(
      res,
      "Bad pagination index. Please enter a number between 0 and 200."
    );
  }

  const offset = page * 10;

  const cacheKey = getCacheKey("ingredients-page", page.toString(), offset.toString());
  try {
    let cacheRes;
    if (redisClientReady) {
      cacheRes = await redisClient.get(cacheKey);
    }

    if (cacheRes) {
      cached = true;
      results = JSON.parse(cacheRes);
    } else {
      results = await Ingredient_Index.findAndCountAll({
        order: [["IngredientString", "ASC"]],
        offset,
        limit: 100,
      });

      setCacheEntry(cacheKey, JSON.stringify(results));
    }
  } catch (e) {
    console.error(e);
    return sendError(res, "Internal server error");
  }


  res.send({
    page,
    count: results.length,
    data: results.rows,
    cached,
  });
});

app.listen(port, () => {
  console.log(`Cooking Recipe Suggestions App listening on port ${port}`);
});
