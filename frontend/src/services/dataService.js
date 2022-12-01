const getRecipesEndpoint = '/recipes'
const getRecipesByCuisineEndpoint = '/cuisine'
const getRecipesByIngredientEndpoint= '/search'

const getRecipesByPage = (page, pageSize=10) => {
    return new Promise((resolve, reject) => {
        fetch(`${getRecipesEndpoint}?${new URLSearchParams({
            page: page, pageSize: pageSize})}`)
            .then((response) => response.json())
            .then((data) => {
               console.log(data);
               resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

const getRecipesById = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${getRecipesEndpoint}/${id}`)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

const getRandomRecipe = () => {
    return new Promise((resolve, reject) => {
        fetch(`${getRecipesEndpoint}/random`)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

const getRecipesByCuisine = (cuisineName) => {
    return new Promise((resolve, reject) => {
        fetch(`${getRecipesByCuisineEndpoint}/${cuisineName}`)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

const getRecipesByIngredients = (ingredients) => {
    let searchParam = createIngredientSearchParam(ingredients);
    return new Promise((resolve, reject) => {
        fetch(`${getRecipesByIngredientEndpoint}?${searchParam}`)
        .then((response) => response.json())
        .then((data) => {
           console.log(data);
           resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    })
}

const createIngredientSearchParam  = (array) => {
    let searchParam = '';
    for (const element of array) {
        searchParam += '&' + new URLSearchParams({
            ingredient: element }
        )
    }
    return searchParam
}

export {getRecipesByPage, getRecipesById, getRandomRecipe, getRecipesByCuisine, getRecipesByIngredients}