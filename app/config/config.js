const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const {
  DB_DEV_HOST,
  DB_DEV_USERNAME,
  DB_DEV_PASSWORD,
  DB_DEV_TYPE,
  DB_DEV_PORT,
  DB_DEV_DATABASE,
} = process.env;
module.exports = {
  development: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    dialect: "postgres",
    port: DB_DEV_PORT,
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
  test: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    host: DB_DEV_HOST,
    dialect: DB_DEV_TYPE,
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: process.env.DB_CA_CERT.replace(/\\n/g, "\n")

      },
    },
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
  staging: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PASSWORD,
    database: DB_DEV_DATABASE,
    host: DB_DEV_HOST,
    dialect: "postgres",
    seederStorage: "json",
    seederStoragePath: "sequelizeSeedData.json",
    seederStorageTableName: "sequelize_data",
    logging: false,
  },
};
