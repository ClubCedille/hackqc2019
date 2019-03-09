'use strict';
module.exports = (sequelize, DataTypes) => {
  const signaux_sonores = sequelize.define(
    'signaux_sonores',
    {
      Int_No: DataTypes.STRING,
      Intersection_rue1: DataTypes.STRING,
      Intersection_rue2: DataTypes.STRING,
      Arrond: DataTypes.STRING,
      TraverseSonore: DataTypes.STRING,
      Fait: DataTypes.STRING,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      X: DataTypes.STRING,
      Y: DataTypes.STRING,
    },
    {},
  );
  signaux_sonores.associate = function(models) {
    // associations can be defined here
  };
  return signaux_sonores;
};
