/**
 * Import ingredients to dev
 */

 module.exports = function(ingredientIndexModel) {
    const fs = require('fs')
    const getPrimaryKey = require('./getPrimaryKey')
    const ingredients = JSON.parse(fs.readFileSync('util/ingredients.json', 'utf8'))

    const bulkIngredients = ingredients.map((v) => ({ IngredientID: getPrimaryKey(v), IngredientString: v }));
    ingredientIndexModel.bulkCreate(bulkIngredients, {
        ignoreDuplicates: true
    })
    .then(() => {
        console.log(`Inserted/updated ${bulkIngredients.length} ingredients (index)`);
    })
    .catch((e) => {
        console.log(`error inserting ingredients name ${e}`);
    })
}