const client = require("./db");

/** Ensemble des fonctions de requetes à la base de donnée pour les posts */
const dataMapperPost = {

  /**
   * Récupère tout les posts qui sont en base de donnée
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec toutes les données des posts
   */
  getAll: async () => {
    const result = await client.query(`
      SELECT "label" as "category",
        "title",
        "slug",
        "excerpt",
        "content"
      FROM "post"
      JOIN "category"
        ON "post"."category_id" = "category"."id";
    `);
    return result.rows;
  },

  /**
   * Récupère un post qui se trouve en base de donnée
   * @async utiliser "async" pour appeler cette fonction
   * @param {number} postId  id du post
   * @returns {Promise<object>} objet avec les données du post
   */
  getOne: async (id) => {
    const result = await client.query(`
      SELECT "label" as "category",
        "title",
        "slug",
        "excerpt",
        "content"
      FROM "post"
      JOIN "category"
        ON "post"."category_id" = "category"."id"
      WHERE "post"."id" = $1;
    `,
    [id]
    );
    return result.rows[0];
  },

  /**
   * Insert un nouveau post en base de donnée
   * @async utiliser "async" pour appeler cette fonction
   * @param {string} category_id id de la catégorie du post
   * @param {string} slug adresse du post
   * @param {string} title titre du post
   * @param {string} excerpt extrait du post
   * @param {string} content contenu du post
   */
  create: async (category_id, slug, title, excerpt, content) => {
    const result = await client.query(`
      INSERT INTO post (category_id, slug, title, excerpt, content)      
      VALUES ($1, $2, $3, $4, $5)`,
      [category_id, slug, title, excerpt, content]);
    return result;
  },

  /**
   * Récupère tout les posts d'une catégorie qui sont en base de donnée
   * @async utiliser "async" pour appeler cette fonction
   * @param {string} category catégorie des posts
   * @returns {Promise<object>} objet avec tout les posts
   */
  getAllByCategory: async (category_id) => {
    const result = await client.query(`
    SELECT "label" as "category",
      "title",
      "slug",
      "excerpt",
      "content"
    FROM "post"
    JOIN "category"
      ON "post"."category_id" = "category"."id"
      WHERE "category"."id" = $1;
  `,
  [category_id]
  );
    return result.rows;
  },
};

/** Ensemble des fonctions de requetes à la base de donnée pour les catégories */
const dataMapperCategory = {

  /**
   * Récupère tout les catégories qui sont en base de donnée
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec toutes les catégories
   */
  getAll: async () => {
      const result = await client.query('SELECT * FROM "category"');
      return result.rows;
  },

  /**
   * Récupère une catégorie qui se trouve en base de donnée
   * @async utiliser "async" pour appeler cette fonction
   * @param {string} label  nom de la catégorie (Commence par une majuscule)
   * @returns {Promise<object>} objet avec la catégorie
   */
  getOne: async (id) => {
    const result = await client.query(`SELECT * FROM category WHERE "id" = '${id}'`)
    return result.rows[0];
  },

  /**
   * Insert une nouvelle catégorie en base de donnée
   * @async utiliser "async" pour appeler cette fonction
   * @param {string} route adresse de la catégorie
   * @param {string} label nom de la catégorie (Commence par une majuscule)
   */
  create: async (route, label) => {
    const result = await client.query(`
      INSERT INTO category (route, label) VALUES ($1, $2)`,
      [route, label]);
    return result;
  },

  update: async (id, route, label) => {
    const query = `
      UPDATE "category"
      SET "route" = $1,
          "label" = $2
      WHERE category.id = $3;
    `;
    return await client.query(query, [route, label, id]);
    ;
  }
};

module.exports = {
  dataMapperCategory,
  dataMapperPost
}