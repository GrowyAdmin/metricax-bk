import { Sequelize } from 'sequelize';

const db = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql',
    dialectOptions: { decimalNumbers: true },
    timezone: '+00:00',
  },
);

const dbDynamic = (dbInfo) =>
  new Sequelize(
    `${dbInfo.DB_NAME}`,
    `${dbInfo.DB_USER}`,
    `${dbInfo.DB_PASSWORD}`,
    {
      host: `${dbInfo.DB_HOST}`,
      dialect: 'mysql',
      dialectOptions: { decimalNumbers: true }
    },
  );

export { db, dbDynamic };
