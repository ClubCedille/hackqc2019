'use strict';
module.exports = (sequelize, DataTypes) => {
  const comptage_feu = sequelize.define(
    'comptage_feu',
    {
      Id_Reference: DataTypes.INTEGER,
      Id_Intersection: DataTypes.INTEGER,
      Nom_Intersection: DataTypes.STRING,
      Date: DataTypes.DATE,
      Periode: DataTypes.TIME,
      Heure: DataTypes.INTEGER,
      Minute: DataTypes.INTEGER,
      Seconde: DataTypes.INTEGER,
      Code_Banque: DataTypes.INTEGER,
      Description_Code_Banque: DataTypes.STRING,
      NBLT: DataTypes.INTEGER,
      NBT: DataTypes.INTEGER,
      NBRT: DataTypes.INTEGER,
      SBLT: DataTypes.INTEGER,
      SBT: DataTypes.INTEGER,
      EBLT: DataTypes.INTEGER,
      EBT: DataTypes.INTEGER,
      EBRT: DataTypes.INTEGER,
      WBLT: DataTypes.INTEGER,
      WBT: DataTypes.INTEGER,
      WBRT: DataTypes.INTEGER,
      Approche_Nord: DataTypes.INTEGER,
      Approche_Sud: DataTypes.INTEGER,
      Approche_Est: DataTypes.INTEGER,
      Approche_Ouest: DataTypes.INTEGER,
      Localisation_X: DataTypes.DOUBLE,
      Localisation_Y: DataTypes.DOUBLE,
      Longitude: DataTypes.DOUBLE,
      Latitude: DataTypes.DOUBLE,
    },
    {},
  );
  comptage_feu.associate = function(models) {
    // associations can be defined here
  };
  return comptage_feu;
};
