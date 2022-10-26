const { Post } = require("../model/post");

const postController = {

  getAllPosts : async (_, res) => {
    const allPosts = await Post.getAll();
    res.json(allPosts);
  },

  getOnePost : async (req, res) => {
    const {id} = req.params;
    const onePost = await Post.getOne(id);
    res.json(onePost);
  },

  getAllPostsByCategory : async (req, res) => {
    const { id } = req.params;
    const allPostsFromCategory = await Post.getAllByCategory(id);
    res.json(allPostsFromCategory);
  },

  addOnePost : async (req, res) => {
    const {category_id, slug, title, excerpt, content} = req.body;
    const newPost = new Post(category_id, slug, title, excerpt, content);
    await newPost.save();
    res.json(`Le post ${newPost.title} à bien été enregistré`)
  }
}

module.exports = postController;