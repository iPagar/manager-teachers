const Sequelize = require("sequelize");
const db = require("../config/db");

const Teachers = db.define("teachers", {
	name: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
	position: { type: Sequelize.STRING, allowNull: false },
	qualification: { type: Sequelize.STRING, allowNull: false },
	subjects: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Teachers;
