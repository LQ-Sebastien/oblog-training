const dm = require ("../dataMapper");

/** Définition de la classe Category */
class Category {
  /**
   * Contrusteur de la classe
   * @param {string} route route de la catégorie
   * @param {string} label nom de la catégorie
   */
  constructor(route, label, id = 0) {
    this.route = route;
    this.label = label;
    this.id = id;
  }

  /**
   * Récupère toutes les catégories en base de donnée via le datamapper
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec toutes les catégories
   */
  static async getAll() {
    const data = await dm.dataMapperCategory.getAll();    
    if (!data) return null;
    const categories = [];
    for await(const element of data) {
      const category = new Category(element.route, element.label, element.id);
      categories.push(category)
    }
    return categories;
  }

  /**
   * Récupère une catégorie en base de donnée via le datamapper
   * @async utiliser "async" pour appeler cette fonction
   * @param {number} id id du post
   * @returns {Promise<object>} objet avec la catégorie
   */
  static async getOne(id) {
    const data = await dm.dataMapperCategory.getOne(id);
    if (!data) return null;
    const category = new Category(data.route, data.label, data.id);
    return category;
  }

  /**
   * Sauvegarde l'instance de la nouvelle catégorie en base de donnée via le datamapper
   * @async utiliser "async" pour appeler cette fonction
   * @returns {Promise<object>} objet avec les infos sur l'insert
   */
  async save() {
    if (this.id === 0) {
      return await dm.dataMapperCategory.create(this.route, this.label);      
    }
    return await dm.dataMapperCategory.update(this.id, this.route, this.label);
  }
}

module.exports = { Category };