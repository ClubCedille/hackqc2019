'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projet_pietonnisations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ID_PROJET: {
        type: Sequelize.STRING,
      },
      TYPE_AXE: {
        type: Sequelize.STRING,
      },
      TOPONYME: {
        type: Sequelize.STRING,
      },
      NOM_PROJET: {
        type: Sequelize.STRING,
      },
      DATE_OUVERTURE: {
        type: Sequelize.STRING,
      },
      ANNEE_IMPLANTANTATION_1: {
        type: Sequelize.INTEGER,
      },
      ANNE_IMPLANTATION_2: {
        type: Sequelize.INTEGER,
      },
      ARRONDISSEMENT: {
        type: Sequelize.STRING,
      },
      HIERARCHIE_ROUTIERE: {
        type: Sequelize.STRING,
      },
      VOIE_CYCLABLE: {
        type: Sequelize.STRING,
      },
      VOIE_CYCLABLE_AXES_ADJACENTS: {
        type: Sequelize.STRING,
      },
      PASSAGE_BUS: {
        type: Sequelize.STRING,
      },
      PASSAGE_BUS_AXES_ADJACENTS: {
        type: Sequelize.STRING,
      },
      TYPE_SITE_INTERVENTION: {
        type: Sequelize.STRING,
      },
      TYPE_REPARTAGE: {
        type: Sequelize.STRING,
      },
      MODE_IMPLANTATION: {
        type: Sequelize.STRING,
      },
      PROGRAMME: {
        type: Sequelize.STRING,
      },
      LIMITES_1: {
        type: Sequelize.STRING,
      },
      LIMITES_2: {
        type: Sequelize.STRING,
      },
      LONGUEUR_TRONCON: {
        type: Sequelize.DOUBLE,
      },
      PHOTO: {
        type: Sequelize.STRING,
      },
      CREDIT_PHOTO: {
        type: Sequelize.STRING,
      },
      OBJECTIF_THEMATIQUE: {
        type: Sequelize.STRING,
      },
      ATTRAIT: {
        type: Sequelize.STRING,
      },
      LATITUDE: {
        type: Sequelize.DOUBLE,
      },
      LONGITUDE: {
        type: Sequelize.DOUBLE,
      },
      X: {
        type: Sequelize.DOUBLE,
      },
      Y: {
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projet_pietonnisations');
  },
};
