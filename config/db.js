require("dotenv").config();
const Sequelize = require("sequelize");

module.exports = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{ logging: false, dialect: "postgres" }
);
