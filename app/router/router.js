const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const categoryController = require("../controller/categoryController");

// Route pour les posts
router.route("/posts")
  .get(postController.getAllPosts)
  .post(postController.addOnePost);

router.route("/posts/:id(\\d+)")
  .get(postController.getOnePost)
  // .patch(postController.updateOnePost)
  // .delete(postController.removeOnePost);

router.route("/posts/category/:id(\\d+)")
  .get(postController.getAllPostsByCategory);

// Route pour les catégories
router.route("/categories")
  .get(categoryController.getAllCategory)
  .post(categoryController.addOneCategory);

router.route("/categories/:id(\\d+)")
  .get(categoryController.getOneCategory)
  .patch(categoryController.updateOneCategory)
  // .delete(categoryController.removeOneCategory);

module.exports = router;