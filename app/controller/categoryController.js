const { Category } = require("../model/category");
const errorHandler = require("../service/errorHandler");

const categoryController = {

  async getAllCategory(req, res) {
    const allCategories = await Category.getAll();
    if (!allCategories || allCategories.length === 0) {
      const error = {
        message: "Categories not found",
        code: 404
      }
      return errorHandler.controller(req, res, error)
    };

    res.json(allCategories);
  },

  async getOneCategory(req, res) {
    const { id } = req.params;
    const oneCategory = await Category.getOne(id);
    
    if (!oneCategory || oneCategory.length === 0) {
      const error = {
        message: "Category not found. Please verify the provided label",
        code: 404
      }
      return errorHandler.controller(req, res, error)
    };
    
    res.json(oneCategory);
  },

  async addOneCategory(req, res) {
    const { route, label } = req.body;   
    
    if (!route) {
      const error = {
        message: "Missing body (or empty) parameter : 'route'.",
        code: 400
      }
      return errorHandler.controller(req, res, error)
    };
    
    if (!label) {
      const error = {
        message: "Missing body (or empty) parameter : 'label'.",
        code: 400
      }
      return errorHandler.controller(req, res, error)
    };
    
    const newCategory = new Category(route, label);
    await newCategory.save();
    res.json(`La catégorie ${label} a bien été enregistrée`);
  },

  async updateOneCategory(req, res) {
    const { id } = req.params;
    const category = await Category.getOne(id);
    if (!category) {
      return errorHandler.controller(req, res, {
        code: 400,
        message: "Erreur: catégorie non trouvée, verifiez votre ID."
      })
    }
    const { route, label } = req.body;
    category.route = route ?? category.route;
    category.label = label ?? category.label;
    const result = await category.save();
    if (!result) {
      return errorHandler.controller(req, res, {
        code: 500,
        message: "Erreur: un problème est survenu lors de la mise à jour."
      })
    }
    res.json(`Mise à jour de la catégorie ok.`)
  }
}

module.exports = categoryController;
