const db = require("../config/db");
const utils = require("../services/utils.js");

beforeAll(() => {
	//Test DB
	expect.assertions(1);
	return db.authenticate();
});

describe("Comments Module", () => {
	test("Returns array of comments with expected name", () => {
		const name = "Албычаков Аркадий Андреевич";

		expect.assertions(1);
		return utils
			.getComments(name)
			.then((array) =>
				array.map((item) => expect(item).toMatchObject({ name }))
			);
	});
	test("Should return empty array when name is broken", () => {
		const name = "";

		expect.assertions(1);
		return utils
			.getComments(name)
			.then((array) => expect(array).toEqual(expect.arrayContaining([])));
	});
	test("Create or update comment returns added comment", () => {
		const id = 67602787,
			name = "Албычаков Аркадий Андреевич",
			score = 4,
			text = "";

		expect.assertions(1);
		return utils
			.createComment(id, name, score, text)
			.then((array) =>
				expect(array).toEqual(
					expect.arrayContaining([
						expect.objectContaining({ id, name, score, text }),
					])
				)
			);
	});
	test("Create broken comment returns Error", () => {
		const id = 67602787,
			name = "Албычаков Аркадий Андреевич",
			score = 7,
			text = "";

		expect.assertions(1);
		return expect(
			utils.createComment(id, name, score, text)
		).rejects.toThrow();
	});
	test("Delete comment returns 1", () => {
		const id = 67602787,
			name = "Албычаков Аркадий Андреевич";

		expect.assertions(1);
		return utils
			.deleteComment(id, name)
			.then((comment) => expect(comment).toBe(1));
	});
	test("Get average score by teacher", () => {
		const name = "Албычаков Аркадий Андреевич";

		expect.assertions(1);
		return utils.getAverageScore(name).then((score) =>
			expect(score).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						total: expect.any(Number),
					}),
				])
			)
		);
	});
});

describe("Teachers Module", () => {
	test("Update teachers", () => {
		expect.assertions(1);
		return expect(utils.updateTeachers()).resolves.toBeDefined();
	});
	test("Get teachers", () => {
		expect.assertions(1);
		return utils
			.getTeachers()
			.then((teachers) =>
				expect(teachers).toEqual(expect.arrayContaining([]))
			);
	});
});

afterAll(() => {
	// Closing the DB connection allows Jest to exit successfully.
	expect.assertions(1);
	return db.close();
});
