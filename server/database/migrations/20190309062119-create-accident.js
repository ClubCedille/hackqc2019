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
      NO_CIVIQ_ACCDN: {
        type: Sequelize.STRING,
      },
      SFX_NO_CIVIQ_ACCDN: {
        type: Sequelize.STRING,
      },
      BORNE_KM_ACCDN: {
        type: Sequelize.STRING,
      },
      RUE_ACCDN: {
        type: Sequelize.STRING,
      },
      TP_REPRR_ACCDN: {
        type: Sequelize.STRING,
      },
      ACCDN_PRES_DE: {
        type: Sequelize.STRING,
      },
      NB_METRE_DIST_ACCD: {
        type: Sequelize.STRING,
      },
      CD_GENRE_ACCDN: {
        type: Sequelize.STRING,
      },
      CD_SIT_PRTCE_ACCDN: {
        type: Sequelize.STRING,
      },
      CD_ETAT_SURFC: {
        type: Sequelize.STRING,
      },
      CD_ECLRM: {
        type: Sequelize.STRING,
      },
      CD_ENVRN_ACCDN: {
        type: Sequelize.STRING,
      },
      NO_ROUTE: {
        type: Sequelize.STRING,
      },
      CD_CATEG_ROUTE: {
        type: Sequelize.STRING,
      },
      CD_ETAT_CHASS: {
        type: Sequelize.STRING,
      },
      CD_ASPCT_ROUTE: {
        type: Sequelize.STRING,
      },
      CD_LOCLN_ACCDN: {
        type: Sequelize.STRING,
      },
      CD_POSI_ACCDN: {
        type: Sequelize.STRING,
      },
      CD_CONFG_ROUTE: {
        type: Sequelize.STRING,
      },
      CD_ZON_TRAVX_ROUTR: {
        type: Sequelize.STRING,
      },
      CD_PNT_CDRNL_ROUTE: {
        type: Sequelize.STRING,
      },
      CD_PNT_CDRNL_REPRR: {
        type: Sequelize.STRING,
      },
      CD_COND_METEO: {
        type: Sequelize.STRING,
      },
      NB_VEH_IMPLIQUES_ACCDN: {
        type: Sequelize.INTEGER,
      },
      NB_MORTS: {
        type: Sequelize.INTEGER,
      },
      NB_BLESSES_GRAVES: {
        type: Sequelize.INTEGER,
      },
      NB_BLESSES_LEGERS: {
        type: Sequelize.INTEGER,
      },
      HEURE_ACCDN: {
        type: Sequelize.INTEGER,
      },
      AN: {
        type: Sequelize.INTEGER,
      },
      NB_VICTIMES_TOTAL: {
        type: Sequelize.INTEGER,
      },
      GRAVITE: {
        type: Sequelize.STRING,
      },
      REG_ADM: {
        type: Sequelize.STRING,
      },
      MRC: {
        type: Sequelize.STRING,
      },
      nb_automobile_camion_leger: {
        type: Sequelize.INTEGER,
      },
      nb_camionLourd_tractRoutier: {
        type: Sequelize.INTEGER,
      },
      nb_outil_equipement: {
        type: Sequelize.INTEGER,
      },
      nb_tous_autobus_minibus: {
        type: Sequelize.INTEGER,
      },
      nb_bicyclette: {
        type: Sequelize.INTEGER,
      },
      nb_cyclomoteur: {
        type: Sequelize.INTEGER,
      },
      nb_motocyclette: {
        type: Sequelize.INTEGER,
      },
      nb_taxi: {
        type: Sequelize.INTEGER,
      },
      nb_urgence: {
        type: Sequelize.INTEGER,
      },
      nb_motoneige: {
        type: Sequelize.INTEGER,
      },
      nb_VHR: {
        type: Sequelize.INTEGER,
      },
      nb_autres_types: {
        type: Sequelize.INTEGER,
      },
      nb_veh_non_precise: {
        type: Sequelize.INTEGER,
      },
      NB_DECES_PIETON: {
        type: Sequelize.INTEGER,
      },
      NB_BLESSES_PIETON: {
        type: Sequelize.INTEGER,
      },
      NB_VICTIMES_PIETON: {
        type: Sequelize.INTEGER,
      },
      NB_DECES_MOTO: {
        type: Sequelize.INTEGER,
      },
      NB_BLESSES_MOTO: {
        type: Sequelize.INTEGER,
      },
      NB_VICTIMES_MOTO: {
        type: Sequelize.INTEGER,
      },
      NB_DECES_VELO: {
        type: Sequelize.INTEGER,
      },
      NB_BLESSES_VELO: {
        type: Sequelize.INTEGER,
      },
      NB_VICTIMES_VELO: {
        type: Sequelize.INTEGER,
      },
      VITESSE_AUTOR: {
        type: Sequelize.STRING,
      },
      LOC_X: {
        type: Sequelize.DOUBLE,
      },
      LOC_Y: {
        type: Sequelize.DOUBLE,
      },
      LOC_COTE_QD: {
        type: Sequelize.DOUBLE,
      },
      LOC_COTE_PD: {
        type: Sequelize.DOUBLE,
      },
      LOC_DETACHEE: {
        type: Sequelize.DOUBLE,
      },
      LOC_IMPRECISION: {
        type: Sequelize.DOUBLE,
      },
      LOC_LONG: {
        type: Sequelize.DOUBLE,
      },
      LOC_LAT: {
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
    return queryInterface.dropTable('accidents');
  },
};
