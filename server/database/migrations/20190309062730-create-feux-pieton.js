'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('feux_pietons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Int_no: {
        type: Sequelize.INTEGER,
      },
      Rue_1: {
        type: Sequelize.STRING,
      },
      Rue_2: {
        type: Sequelize.STRING,
      },
      Arrondissement: {
        type: Sequelize.STRING,
      },
      X: {
        type: Sequelize.DOUBLE,
      },
      Y: {
        type: Sequelize.DOUBLE,
      },
      Latitude: {
        type: Sequelize.DOUBLE,
      },
      Longitude: {
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
    return queryInterface.dropTable('feux_pietons');
  },
};
