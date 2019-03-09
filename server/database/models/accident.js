'use strict';
module.exports = (sequelize, DataTypes) => {
  const accident = sequelize.define(
    'accident',
    {
      NO_SEQ_COLL: DataTypes.STRING,
      JR_SEMN_ACCDN: DataTypes.STRING,
      DT_ACCDN: DataTypes.STRING,
      CD_MUNCP: DataTypes.STRING,
      NO_CIVIQ_ACCDN: DataTypes.STRING,
      SFX_NO_CIVIQ_ACCDN: DataTypes.STRING,
      BORNE_KM_ACCDN: DataTypes.STRING,
      RUE_ACCDN: DataTypes.STRING,
      TP_REPRR_ACCDN: DataTypes.STRING,
      ACCDN_PRES_DE: DataTypes.STRING,
      NB_METRE_DIST_ACCD: DataTypes.STRING,
      CD_GENRE_ACCDN: DataTypes.STRING,
      CD_SIT_PRTCE_ACCDN: DataTypes.STRING,
      CD_ETAT_SURFC: DataTypes.STRING,
      CD_ECLRM: DataTypes.STRING,
      CD_ENVRN_ACCDN: DataTypes.STRING,
      NO_ROUTE: DataTypes.STRING,
      CD_CATEG_ROUTE: DataTypes.STRING,
      CD_ETAT_CHASS: DataTypes.STRING,
      CD_ASPCT_ROUTE: DataTypes.STRING,
      CD_LOCLN_ACCDN: DataTypes.STRING,
      CD_POSI_ACCDN: DataTypes.STRING,
      CD_CONFG_ROUTE: DataTypes.STRING,
      CD_ZON_TRAVX_ROUTR: DataTypes.STRING,
      CD_PNT_CDRNL_ROUTE: DataTypes.STRING,
      CD_PNT_CDRNL_REPRR: DataTypes.STRING,
      CD_COND_METEO: DataTypes.STRING,
      NB_VEH_IMPLIQUES_ACCDN: DataTypes.INTEGER,
      NB_MORTS: DataTypes.INTEGER,
      NB_BLESSES_GRAVES: DataTypes.INTEGER,
      NB_BLESSES_LEGERS: DataTypes.INTEGER,
      HEURE_ACCDN: DataTypes.STRING,
      AN: DataTypes.STRING,
      NB_VICTIMES_TOTAL: DataTypes.STRING,
      GRAVITE: DataTypes.STRING,
      REG_ADM: DataTypes.STRING,
      MRC: DataTypes.STRING,
      nb_automobile_camion_leger: DataTypes.INTEGER,
      nb_camionLourd_tractRoutier: DataTypes.INTEGER,
      nb_outil_equipement: DataTypes.INTEGER,
      nb_tous_autobus_minibus: DataTypes.INTEGER,
      nb_bicyclette: DataTypes.INTEGER,
      nb_cyclomoteur: DataTypes.INTEGER,
      nb_motocyclette: DataTypes.INTEGER,
      nb_taxi: DataTypes.INTEGER,
      nb_urgence: DataTypes.INTEGER,
      nb_motoneige: DataTypes.INTEGER,
      nb_VHR: DataTypes.INTEGER,
      nb_autres_types: DataTypes.INTEGER,
      nb_veh_non_precise: DataTypes.INTEGER,
      NB_DECES_PIETON: DataTypes.INTEGER,
      NB_BLESSES_PIETON: DataTypes.INTEGER,
      NB_VICTIMES_PIETON: DataTypes.INTEGER,
      NB_DECES_MOTO: DataTypes.INTEGER,
      NB_BLESSES_MOTO: DataTypes.INTEGER,
      NB_VICTIMES_MOTO: DataTypes.INTEGER,
      NB_DECES_VELO: DataTypes.INTEGER,
      NB_BLESSES_VELO: DataTypes.INTEGER,
      NB_VICTIMES_VELO: DataTypes.INTEGER,
      VITESSE_AUTOR: DataTypes.STRING,
      LOC_X: DataTypes.DOUBLE,
      LOC_Y: DataTypes.DOUBLE,
      LOC_COTE_QD: DataTypes.DOUBLE,
      LOC_COTE_PD: DataTypes.DOUBLE,
      LOC_DETACHEE: DataTypes.DOUBLE,
      LOC_IMPRECISION: DataTypes.DOUBLE,
      LOC_LONG: DataTypes.DOUBLE,
      LOC_LAT: DataTypes.DOUBLE,
    },
    {},
  );

  return accident;
};
