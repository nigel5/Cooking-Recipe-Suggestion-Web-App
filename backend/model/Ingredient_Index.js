const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ingredient_Index', {
    IngredientID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    IngredientString: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Ingredient_Index',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Ingredient_Index_pk",
        unique: true,
        fields: [
          { name: "IngredientID" },
        ]
      },
    ]
  });
};
