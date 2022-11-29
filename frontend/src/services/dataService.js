const getRecipesEndpoint = '/recipes'

const getRecipesByPage = (page) => {
    return new Promise((resolve, reject) => {
        fetch(getRecipesEndpoint +'?'+ new URLSearchParams({
            page: page}))
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

export {getRecipesByPage, getRecipesById}