'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accidents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NO_SEQ_COLL: {
        type: Sequelize.STRING,
      },
      JR_SEMN_ACCDN: {
        type: Sequelize.STRING,
      },
      DT_ACCDN: {
        type: Sequelize.STRING,
      },
      CD_MUNCP: {
        type: Sequelize.STRING,
      },
      RUE_ACCDN: {
        type: Sequelize.STRING,
      },
      TP_REPRR_ACCDN: {
        type: Sequelize.STRING,
      },
      NB_METRE_DIST_ACCD: {
        type: Sequelize.STRING,
      },
      NB_VEH_IMPLIQUES_ACCDN: {
        type: Sequelize.STRING,
      },
      NB_MORTS: {
        type: Sequelize.STRING,
      },
      NB_BLESSES_GRAVES: {
        type: Sequelize.STRING,
      },
      NB_BLESSES_LEGERS: {
        type: Sequelize.STRING,
      },
      HEURE_ACCDN: {
        type: Sequelize.STRING,
      },
      AN: {
        type: Sequelize.STRING,
      },
      NB_VICTIMES_TOTAL: {
        type: Sequelize.STRING,
      },
      GRAVITE: {
        type: Sequelize.STRING,
      },
      nb_automobile_camion_leger: {
        type: Sequelize.STRING,
      },
      nb_camionLourd_tractRoutier: {
        type: Sequelize.STRING,
      },
      nb_outil_equipement: {
        type: Sequelize.STRING,
      },
      nb_tous_autobus_minibus: {
        type: Sequelize.STRING,
      },
      nb_bicyclette: {
        type: Sequelize.STRING,
      },
      nb_cyclomoteur: {
        type: Sequelize.STRING,
      },
      nb_motocyclette: {
        type: Sequelize.STRING,
      },
      nb_taxi: {
        type: Sequelize.STRING,
      },
      nb_urgence: {
        type: Sequelize.STRING,
      },
      nb_motoneige: {
        type: Sequelize.STRING,
      },
      nb_VHR: {
        type: Sequelize.STRING,
      },
      nb_autres_types: {
        type: Sequelize.STRING,
      },
      nb_veh_non_precise: {
        type: Sequelize.STRING,
      },
      NB_DECES_PIETON: {
        type: Sequelize.STRING,
      },
      NB_BLESSES_PIETON: {
        type: Sequelize.STRING,
      },
      NB_VICTIMES_PIETON: {
        type: Sequelize.STRING,
      },
      NB_DECES_MOTO: {
        type: Sequelize.STRING,
      },
      NB_BLESSES_MOTO: {
        type: Sequelize.STRING,
      },
      NB_VICTIMES_MOTO: {
        type: Sequelize.STRING,
      },
      NB_DECES_VELO: {
        type: Sequelize.STRING,
      },
      NB_BLESSES_VELO: {
        type: Sequelize.STRING,
      },
      NB_VICTIMES_VELO: {
        type: Sequelize.STRING,
      },
      VITESSE_AUTOR: {
        type: Sequelize.STRING,
      },
      LOC_X: {
        type: Sequelize.STRING,
      },
      LOC_Y: {
        type: Sequelize.STRING,
      },
      LOC_LONG: {
        type: Sequelize.STRING,
      },
      LOC_LAT: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('accidents');
  },
};
