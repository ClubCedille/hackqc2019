'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comptage_feus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Id_Reference: {
        type: Sequelize.INTEGER,
      },
      Id_Intersection: {
        type: Sequelize.INTEGER,
      },
      Nom_Intersection: {
        type: Sequelize.STRING,
      },
      Date: {
        type: Sequelize.DATE,
      },
      Periode: {
        type: Sequelize.TIME,
      },
      Heure: {
        type: Sequelize.INTEGER,
      },
      Minute: {
        type: Sequelize.INTEGER,
      },
      Seconde: {
        type: Sequelize.INTEGER,
      },
      Code_Banque: {
        type: Sequelize.INTEGER,
      },
      Description_Code_Banque: {
        type: Sequelize.STRING,
      },
      NBLT: {
        type: Sequelize.INTEGER,
      },
      NBT: {
        type: Sequelize.INTEGER,
      },
      NBRT: {
        type: Sequelize.INTEGER,
      },
      SBLT: {
        type: Sequelize.INTEGER,
      },
      SBT: {
        type: Sequelize.INTEGER,
      },
      EBLT: {
        type: Sequelize.INTEGER,
      },
      EBT: {
        type: Sequelize.INTEGER,
      },
      EBRT: {
        type: Sequelize.INTEGER,
      },
      WBLT: {
        type: Sequelize.INTEGER,
      },
      WBT: {
        type: Sequelize.INTEGER,
      },
      WBRT: {
        type: Sequelize.INTEGER,
      },
      Approche_Nord: {
        type: Sequelize.INTEGER,
      },
      Approche_Sud: {
        type: Sequelize.INTEGER,
      },
      Approche_Est: {
        type: Sequelize.INTEGER,
      },
      Approche_Ouest: {
        type: Sequelize.INTEGER,
      },
      Localisation_X: {
        type: Sequelize.DOUBLE,
      },
      Localisation_Y: {
        type: Sequelize.DOUBLE,
      },
      Longitude: {
        type: Sequelize.DOUBLE,
      },
      Latitude: {
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
    return queryInterface.dropTable('comptage_feus');
  },
};
