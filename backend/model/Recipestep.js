const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RecipeStep', {
    StepID: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    StepInfo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    OrderOfStep: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    RecipeID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Recipe',
        key: 'RecipeID'
      }
    }
  }, {
    sequelize,
    tableName: 'RecipeStep',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "recipestep_pkey",
        unique: true,
        fields: [
          { name: "StepID" },
        ]
      },
    ]
  });
};
