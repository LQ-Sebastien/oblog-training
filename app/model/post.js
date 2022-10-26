const dm = require("../dataMapper");

/** Définition de la classe Post */
class Post {
  /**
   * Contrusteur de la classe
   * @param {string} category catégorie du post
   * @param {string} slug adresse du post
   * @param {string} title titre du post
   * @param {string} excerpt extrait du post
   * @param {string} content contenu du post
   */
  constructor(category, slug, title, excerpt, content){
    this.category = category;
    this.slug = slug;
    this.title = title;
    this.excerpt = excerpt;
    this.content = content;
  }

  /**
   * Récupère tous les posts en base de donnée via le datamapper
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec tous les posts
   */
  static async getAll(){
    const data = await dm.dataMapperPost.getAll();
    const arrayPosts = [];

    if (!data) return null;
    
    for await (const element of data) {
      const post = new Post(element.category, element.slug, element.title, element.excerpt, element.content);
      arrayPosts.push(post);
    }
    return arrayPosts;
  }

  /**
   * Récupère un post en base de donnée via le datamapper
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec le post
   */
  static async getOne(id){
    const data = await dm.dataMapperPost.getOne(id);

    if (!data) return null;

    const post = new Post(data.category, data.slug, data.title, data.excerpt, data.content);
    return post;
  }

  /**
   * Récupère tous les posts d'une catégorie en base de donnée via le datamapper
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec tous les posts
   */
  static async getAllByCategory(id){
    const data = await dm.dataMapperPost.getAllByCategory(id);
    const arrayPostsByCategory = [];

    if (!data) return null;

    for await (const element of data) {
      const post = new Post(element.category, element.slug, element.title, element.excerpt, element.content);
      arrayPostsByCategory.push(post);
    }
    return arrayPostsByCategory;
  }

  /**
   * Sauvegarde l'instance du nouveau post en base de donnée via le datamapper
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec les infos sur l'insert
   */
  async save() {
    return await dm.dataMapperPost.create(this.category, this.slug, this.title, this.excerpt, this.content);
  }
}



module.exports = { Post };