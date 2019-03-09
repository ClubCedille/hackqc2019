'use strict';
module.exports = (sequelize, DataTypes) => {
  const projet_pietonnisation = sequelize.define(
    'projet_pietonnisation',
    {
      ID_PROJET: DataTypes.STRING,
      TYPE_AXE: DataTypes.STRING,
      TOPONYME: DataTypes.STRING,
      NOM_PROJET: DataTypes.STRING,
      DATE_OUVERTURE: DataTypes.STRING,
      ANNEE_IMPLANTANTATION_1: DataTypes.INTEGER,
      ANNE_IMPLANTATION_2: DataTypes.INTEGER,
      ARRONDISSEMENT: DataTypes.STRING,
      HIERARCHIE_ROUTIERE: DataTypes.STRING,
      VOIE_CYCLABLE: DataTypes.STRING,
      VOIE_CYCLABLE_AXES_ADJACENTS: DataTypes.STRING,
      PASSAGE_BUS: DataTypes.STRING,
      PASSAGE_BUS_AXES_ADJACENTS: DataTypes.STRING,
      TYPE_SITE_INTERVENTION: DataTypes.STRING,
      TYPE_REPARTAGE: DataTypes.STRING,
      MODE_IMPLANTATION: DataTypes.STRING,
      PROGRAMME: DataTypes.STRING,
      LIMITES_1: DataTypes.STRING,
      LIMITES_2: DataTypes.STRING,
      LONGUEUR_TRONCON: DataTypes.DOUBLE,
      PHOTO: DataTypes.STRING,
      CREDIT_PHOTO: DataTypes.STRING,
      OBJECTIF_THEMATIQUE: DataTypes.STRING,
      ATTRAIT: DataTypes.STRING,
      LATITUDE: DataTypes.DOUBLE,
      LONGITUDE: DataTypes.DOUBLE,
      X: DataTypes.DOUBLE,
      Y: DataTypes.DOUBLE,
    },
    {},
  );
  projet_pietonnisation.associate = function(models) {
    // associations can be defined here
  };
  return projet_pietonnisation;
};
