'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('signaux_sonores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Int_No: {
        type: Sequelize.STRING,
      },
      Intersection_rue1: {
        type: Sequelize.STRING,
      },
      Intersection_rue2: {
        type: Sequelize.STRING,
      },
      Arrond: {
        type: Sequelize.STRING,
      },
      TraverseSonore: {
        type: Sequelize.STRING,
      },
      Fait: {
        type: Sequelize.STRING,
      },
      longitude: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.STRING,
      },
      X: {
        type: Sequelize.STRING,
      },
      Y: {
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
    return queryInterface.dropTable('signaux_sonores');
  },
};
