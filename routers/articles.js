const express = require("express");
const router = express.Router();

const ArticleController = require("../controllers/articles")

//router example
router.get("/ruta-de.prueba",ArticleController.test);

//create router
router.post("/create", ArticleController.createArticle);
//  articuloAll/:ultimo? es para pasar parametro opcional
router.get("/articuloAll/:ultimo?", ArticleController.getAllArticles);
router.get("/articulo/:id", ArticleController.getOneArticle);
router.delete("/articulo/:id", ArticleController.deleteArticle);
router.put("/articulo/:id", ArticleController.updateArticle);



module.exports= router;
