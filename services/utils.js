const axios = require("axios");
const { Op } = require("sequelize");
const db = require("../config/db");
const Teachers = require("../models/Teachers");
const Comments = require("../models/Comments");

//1 - Ф.И.О. преподавателя, реализующего программу
//2 - Должность преподавателя
//3 - Перечень преподаваемых дисциплин
//4 - Уровень образования
//5 - Квалификация
//6 - Учёная степень педагогического работника (при наличии)
//7 - Учёное звание педагогического работника (при наличии)
//8 - Наименование направления подготовки и (или) специальности педагогического работника
//9 - Сведения о повышении квалификации и (или) профессиональной переподготовке педагогического работника (при наличии)
//10 - Общий стаж работы
//11 - Стаж работы педагогического работника по специальности
function axiosTeachers() {
	return axios
		.post("https://stankin.ru/api_entry.php", {
			action: "getJSONTable",
			data: { id: 128 },
		})
		.then((response) => {
			const teachers = JSON.parse(response.data.data.json_table.json)
				.list.filter((teacher) => !teacher.config.isHeader)
				.map((teacher, i) => {
					return {
						name: teacher.row[0].rows[0].value,
						position: teacher.row[1].rows[0].value,
						qualification: teacher.row[5].rows[0].value,
						subjects: teacher.row[2].rows[0].value,
					};
				});

			return teachers;
		})
		.catch((error) => {
			return error;
		});
}

function updateTeachers() {
	return axiosTeachers().then((teachers) =>
		Teachers.bulkCreate(teachers, {
			returning: true,
			updateOnDuplicate: Object.keys(Teachers.rawAttributes),
		})
	);
}

function getTeachers(offset = 0, limit = null, search = "") {
	return Teachers.findAll({
		raw: true,
		where: {
			name: { [Op.iRegexp]: search },
		},
		offset,
		limit,
	});
}

function getAverageScore(name) {
	return Comments.findAll({
		raw: true,
		where: {
			name,
		},
		attributes: [[db.cast(db.fn("AVG", db.col("score")), "int"), "total"]],
	});
}

function getComments(name, offset = 0, limit = null) {
	return Comments.findAll({
		raw: true,
		where: {
			name,
		},
		offset,
		limit,
	});
}

function createComment(id, name, score, text, isPublic = true) {
	return Comments.bulkCreate([{ id, name, score, text, isPublic }], {
		returning: true,
		updateOnDuplicate: Object.keys(Comments.rawAttributes),
	});
}

function deleteComment(id, name) {
	return Comments.destroy({ where: { id, name } });
}

module.exports = {
	updateTeachers,
	getTeachers,
	getAverageScore,
	getComments,
	createComment,
	deleteComment,
};
