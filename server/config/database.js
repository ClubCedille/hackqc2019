import Sequelize from 'sequelize';
const { POSTGRES_DB, POSTGRES_URL } = process.env;

const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true,
  },
});

sequelize
  .authenticate()
  .then(() => console.log(`Connected to DB ${POSTGRES_DB}`))
  .catch(error => console.error(error));

export default sequelize;
