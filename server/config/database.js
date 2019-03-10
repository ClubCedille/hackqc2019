import Sequelize from 'sequelize';
const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
} = process.env;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: 5432,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
});

sequelize
  .authenticate()
  .then(() => console.log(`Connected to DB ${POSTGRES_DB}`))
  .catch(error => console.error(error));

export default sequelize;
