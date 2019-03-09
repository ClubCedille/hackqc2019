import Parser from './master';
import fs from 'fs';
import dataset from '../../../datasets/accidents.json';

import sequelize from "../../database/models/index.js";

const Accident = sequelize.import("../../database/models/accident");


export default class AccidentParser extends Parser {
    async parse() {
        // 1- Parser definition goes here.
        // 2- Parse file here.
        console.log('...parsing accident...');

        dataset.forEach((data) => {
            Accident.create({
                NO_SEQ_COLL :  data.NO_SEQ_COLL,
                JR_SEMN_ACCDN :  data.JR_SEMN_ACCDN,
                DT_ACCDN :  data.DT_ACCDN,
                CD_MUNCP :  data.CD_MUNCP,
                RUE_ACCDN :  data.RUE_ACCDN,
                TP_REPRR_ACCDN :  data.TP_REPRR_ACCDN,
                NB_METRE_DIST_ACCD :  data.NB_METRE_DIST_ACCD,
                NB_VEH_IMPLIQUES_ACCDN :  data.NB_VEH_IMPLIQUES_ACCDN,
                NB_MORTS :  data.NB_MORTS,
                NB_BLESSES_GRAVES :  data.NB_BLESSES_GRAVES,
                NB_BLESSES_LEGERS :  data.NB_BLESSES_LEGERS,
                HEURE_ACCDN :  data.HEURE_ACCDN,
                AN :  data.AN,
                NB_VICTIMES_TOTAL :  data.NB_VICTIMES_TOTAL,
                GRAVITE :  data.GRAVITE,
                nb_automobile_camion_leger :  data.nb_automobile_camion_leger,
                nb_camionLourd_tractRoutier :  data.nb_camionLourd_tractRoutier,
                nb_outil_equipement :  data.nb_outil_equipement,
                nb_tous_autobus_minibus :  data.nb_tous_autobus_minibus,
                nb_bicyclette :  data.nb_bicyclette,
                nb_cyclomoteur :  data.nb_cyclomoteur,
                nb_motocyclette :  data.nb_motocyclette,
                nb_taxi :  data.nb_taxi,
                nb_urgence :  data.nb_urgence,
                nb_motoneige :  data.nb_motoneige,
                nb_VHR :  data.nb_VHR,
                nb_autres_types :  data.nb_autres_types,
                nb_veh_non_precise :  data.nb_veh_non_precise,
                NB_DECES_PIETON :  data.NB_DECES_PIETON,
                NB_BLESSES_PIETON :  data.NB_BLESSES_PIETON,
                NB_VICTIMES_PIETON :  data.NB_VICTIMES_PIETON,
                NB_DECES_MOTO :  data.NB_DECES_MOTO,
                NB_BLESSES_MOTO :  data.NB_BLESSES_MOTO,
                NB_VICTIMES_MOTO :  data.NB_VICTIMES_MOTO,
                NB_DECES_VELO :  data.NB_DECES_VELO,
                NB_BLESSES_VELO :  data.NB_BLESSES_VELO,
                NB_VICTIMES_VELO :  data.NB_VICTIMES_VELO,
                VITESSE_AUTOR :  data.VITESSE_AUTOR,
                LOC_X :  data.LOC_X,
                LOC_Y :  data.LOC_Y,
                LOC_LONG :  data.LOC_LONG,
                LOC_LAT : data.LOC_LAT
            });
        });
    }
}
