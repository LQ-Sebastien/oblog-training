require("dotenv").config();
const { Client } = require("pg");
const dataCategories = require("./data/categories.json");
const dataPosts = require("./data/posts.json");
const client = new Client();

(async () => {
	await client.connect();

	for await (const category of dataCategories) {
		const query = `INSERT INTO category("route", "label")
								VALUES ($1, $2);`;
		await client.query(query, [category.route, category.label]);
	};

	for await (const post of dataPosts) {
		const queryId = `SELECT id FROM category WHERE label = $1;`;
		const result = await client.query(queryId, [post.category]);
		const category_id = result.rows[0].id;		

		const queryInsert =`
			INSERT INTO post("category_id", "slug", "title", "excerpt", "content")
			VALUES ($1, $2, $3, $4, $5);
		`;
		await client.query(queryInsert, [category_id, post.slug, post.title, post.excerpt, post.content]);
	};

	await client.end();
})();