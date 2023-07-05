const { Article, Comment, Author } = require("../models");
const formidable = require("formidable");

// Display a listing of the resource.
async function index(req, res) {
  res.render("home", (userData = false));
}

// Display the specified resource.
async function show(req, res) {
  const articleId = req.params.id;
  const article = await Article.findOne({ where: { id: articleId }, include: { all: true } });
  const comments = await Comment.findAll({ where: { articleId: articleId } });
  return res.render("article", { article, comments, userData: false });
}
async function create(req, res) {
  const authorId = req.user.dataValues.id;
  const author = await Author.findOne({ where: { id: authorId } });
  return res.render("newArticle");
}

// Store a newly created resource in storage.
async function store(req, res) {
  console.log("okey");
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      authorId: fields.author,
    });

    return res.redirect("/admin");
  });
}

// Show the form for editing the specified resource. Pasarle el id para que cargue
async function edit(req, res) {
  const articleId = req.params.id;
  try {
    const article = await Article.findOne({ where: { id: articleId } });

    article.forEach((article) => {
      const author = article.author;
      if (author.rolID >= 3) {
        throw new Error("Acceso no autorizado");
      }
    });
    if (!article) {
      return res.status(404).send("El artículo no existe");
    }

    if (req.user.dataValues.id !== article.dataValues.authorId) {
      return res.redirect("/admin");
    }

    return res.render("editArticle", { article });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Ha ocurrido un error al editar el artículo");
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    try {
      const article = await Article.findByPk(req.params.id);
      if (!article) {
        return res.status(404).send("El artículo no existe");
      }

      article.forEach((article) => {
        const author = article.author;
        if (author.rolID >= 3) {
          throw new Error("Acceso no autorizado");
        }
      });
      if (req.user.dataValues.id !== article.dataValues.authorId) {
        return res.status(403).send("No tienes permiso para actualizar este artículo");
      }

      await Article.update(
        {
          title: fields.title,
          content: fields.content,
          image: files.image.newFilename,
        },
        { where: { id: req.params.id } },
      );

      return res.redirect("/admin");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Ha ocurrido un error al actualizar el artículo");
    }
  });
}
// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) {
      return res.status(404).send("El artículo no existe");
    }
    if (req.user.dataValues.id !== article.dataValues.authorId) {
      return res.status(403).send("No tienes permiso para eliminar este artículo");
    }
    article.forEach((article) => {
      const author = article.author;
      if (author.rolID >= 3) {
        throw new Error("Acceso no autorizado");
      }
    });
    await Comment.destroy({ where: { articleId: req.params.id } });
    await Article.destroy({ where: { id: req.params.id } });

    return res.redirect("/admin");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Ha ocurrido un error al eliminar el artículo");
  }
}

async function showAdmin(req, res) {
  try {
    if (req.user.dataValues.rolID < 3 || req.user.dataValues.rolID === 4) {
      throw new Error("Acceso no autorizado");
    }

    const articles = await Article.findAll({ include: "author" });

    res.render("admin", { articles });
  } catch (error) {
    console.error(error);
    return res.status(403).redirect("/login");
  }
}

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
  showAdmin,
};
