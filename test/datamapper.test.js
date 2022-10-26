require("dotenv").config();
const dm = require("../app/dataMapper");

/**
 * TEST DES FONCTIONS POST
 */

test('Get all posts', async () => {
  const posts = await dm.dataMapperPost.getAll();
  expect(posts).toStrictEqual(expect.anything());
  expect(posts[0]).toHaveProperty("category");
  expect(posts[0]).toHaveProperty("slug");
  expect(posts[0]).toHaveProperty("title");
  expect(posts[0]).toHaveProperty("excerpt");
  expect(posts[0]).toHaveProperty("content");
});

test('Get one post', async () => {
  const post = await dm.dataMapperPost.getOne(1);
  expect(post).toStrictEqual(expect.anything());
  expect(post).toHaveProperty("category");
  expect(post).toHaveProperty("slug");
  expect(post).toHaveProperty("title");
  expect(post).toHaveProperty("excerpt");
  expect(post).toHaveProperty("content");
});

test('Get all posts of category', async () => {
  const posts = await dm.dataMapperPost.getAllByCategory("Autre");
  expect(posts).toStrictEqual(expect.anything());
  expect(posts[0]).toHaveProperty("category");
  expect(posts[0]).toHaveProperty("slug");
  expect(posts[0]).toHaveProperty("title");
  expect(posts[0]).toHaveProperty("excerpt");
  expect(posts[0]).toHaveProperty("content");
});

test('Insert one post in DB', async () => {
  const result = await dm.dataMapperPost.create("Autre", "juste-un-test", "Juste un test", "Juste un test", "Juste un test vite fait");
  expect(result.rowCount).toBe(1);
});


/**
 * TEST DES FONCTIONS CATEGORY
 */

 test('Get all categories', async () => {
  const categories = await dm.dataMapperCategory.getAll();
  expect(categories).toStrictEqual(expect.anything());
  expect(categories[0]).toHaveProperty("route");
  expect(categories[0]).toHaveProperty("label");
});

test('Get one category', async () => {
  const category = await dm.dataMapperCategory.getOne("Autre");
  expect(category).toStrictEqual(expect.anything());
  expect(category).toHaveProperty("route");
  expect(category).toHaveProperty("label");
});

test('Insert one category in DB', async () => {
  const result = await dm.dataMapperCategory.create("Autre", "JEST");
  expect(result.rowCount).toBe(1);
});