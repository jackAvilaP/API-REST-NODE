const express = require("express");
const router = express.Router();
const ArticleController = require("../controllers/articles");
const multer = require("multer");

const boxImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imgs/article ");
  },
  filename: (req, file, cb) => {
    cb(null, "article" + Date.now() + file.originalname);
  },
});

const ups = multer({ storage: boxImg });

//router example
router.get("/ruta-de.prueba", ArticleController.test);

//create router
router.post("/create", ArticleController.createArticle);
//  articuloAll/:ultimo? es para pasar parametro opcional
router.get("/articuloAll/:ultimo?", ArticleController.getAllArticles);
router.get("/articulo/:id", ArticleController.getOneArticle);
router.delete("/articulo/:id", ArticleController.deleteArticle);
router.put("/articulo/:id", ArticleController.updateArticle);
router.post("/subirImg", [ups.single("file")], ArticleController.upFiles);

module.exports = router;
