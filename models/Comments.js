const Sequelize = require("sequelize");
const db = require("../config/db");

const Comments = db.define(
	"comments",
	{
		id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
		name: { type: Sequelize.STRING, allowNull: false, primaryKey: true },
		score: { type: Sequelize.INTEGER, allowNull: false },
		text: { type: Sequelize.STRING },
		isPublic: { type: Sequelize.BOOLEAN, allowNull: false },
	},
	{ timestamps: true, updatedAt: false }
);

module.exports = Comments;
