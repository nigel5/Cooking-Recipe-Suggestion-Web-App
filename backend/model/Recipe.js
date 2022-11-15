const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Recipe",
    {
      RecipeID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Cuisine: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ImgLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Prep: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      CookTime: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Servings: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Calories: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Fat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Carbs: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Protein: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Recipe",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "Recipe_pk",
          unique: true,
          fields: [{ name: "RecipeID" }],
        },
      ],
    }
  );
};
