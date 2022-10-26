const express = require("express");
const router = express.Router();
const errorHandler = require("../service/errorHandler");
const apiRouter = require("./router");

// Route de l'api
router.use(apiRouter);

// Route pour la 404
router.use((req, res) => {
    const error = new Error("Page not found baby !");
    error.code = 404;
    throw error;
});

// Route pour les erreurs
router.use(errorHandler.router)

module.exports = router;