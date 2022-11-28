const validator = require("validator");
const Article = require("../models/Articles");

const validatorArticle = (res, data) => {
  let validate_title = !validator.isEmpty(data.title);
  let validate_contents = !validator.isEmpty(data.contents);

  if (!validate_contents || !validate_title) {
    throw new Error("No validator info");
  }
};

const test = (req, res) => {
  return res.status(200).json({
    message: "Soy accion prueba de controlador articulo",
  });
};

const createArticle = (req, res) => {
  //capture data
  let data = req.body;

  //valid data liblary validator
  try {
    validatorArticle(res, data);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "missing data to send!",
    });
  }

  //create object
  const article = new Article(data);

  //assign value object db(manual or automatic)

  //save article in data base
  article.save((error, articleSave) => {
    if (error || !articleSave) {
      return res.status(400).json({
        status: "error",
        message: "missing data to send!",
      });
    }

    return res.status(200).json({
      status: "success",
      article: articleSave,
    });
  });
};

const getAllArticles = (req, res) => {
  let consult = Article.find({})
    .sort({ date: -1 })
    .exec((error, article) => {
      if (error || !article) {
        return res.status(400).json({
          status: "error",
          message: "missing data to send!",
        });
      }

      return res.status(200).json({
        status: "success",
        ultimo: req.params.ultimo,
        article,
      });
    });
};

const getOneArticle = (req, res) => {
  let id = req.params.id;
  let consult = Article.findById(id, (error, article) => {
    if (error || !article) {
      return res.status(400).json({
        status: "error",
        message: "missing data to send!",
      });
    }

    return res.status(200).json({
      status: "success",
      article,
    });
  });
};

const deleteArticle = (req, res) => {
  let article_id = req.params.id;
  let consult = Article.findOneAndDelete(
    { _id: article_id },
    (error, articleDelete) => {
      if (error || !articleDelete) {
        return res.status(500).json({
          status: "error",
          message: "missing data delete!",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "article delete",
        articleDelete,
      });
    }
  );
};

const updateArticle = (req, res) => {
  let article_id = req.params.id;

  let data = req.body;

  try {
    validatorArticle(res, data);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "missing data to send!",
    });
  }

  Article.findOneAndUpdate(
    { _id: article_id },
    data,
    { new: true },
    (error, articleUpdate) => {
      if (error || !articleUpdate) {
        return res.status(500).json({
          status: "error",
          message: "missing data update!",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "article update",
        article: articleUpdate,
      });
    }
  );
};
module.exports = {
  test,
  createArticle,
  getAllArticles,
  getOneArticle,
  deleteArticle,
  updateArticle,
};
