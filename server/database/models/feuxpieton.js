'use strict';
module.exports = (sequelize, DataTypes) => {
  const feux_pieton = sequelize.define(
    'feux_pieton',
    {
      Int_no: DataTypes.INTEGER,
      Rue_1: DataTypes.STRING,
      Rue_2: DataTypes.STRING,
      Arrondissement: DataTypes.STRING,
      X: DataTypes.DOUBLE,
      Y: DataTypes.DOUBLE,
      Latitude: DataTypes.DOUBLE,
      Longitude: DataTypes.DOUBLE,
    },
    {},
  );
  feux_pieton.associate = function(models) {
    // associations can be defined here
  };
  return feux_pieton;
};
