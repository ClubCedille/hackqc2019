import Sequelize from 'sequelize';
const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_URL,
} = process.env;

const sequelize = new Sequelize(POSTGRES_URL, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: 5432,
  operatorsAliases: false,
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
}); /*POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: 5432,
  protocol: null,
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
  retry: {
    match: [
      /ETIMEDOUT/,
      /EHOSTUNREACH/,
      /ECONNRESET/,
      /ECONNREFUSED/,
      /ETIMEDOUT/,
      /ESOCKETTIMEDOUT/,
      /EHOSTUNREACH/,
      /EPIPE/,
      /EAI_AGAIN/,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionTimedOutError/,
    ],
    max: 5,
  },
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
});*/

sequelize
  .authenticate()
  .then(() => console.log(`Connected to DB ${POSTGRES_DB}`))
  .catch(error => console.error(error));

export default sequelize;
