const { Comment, Author } = require("../models");

async function store(req, res) {
  console.log("Ejecutando commentController.store");
  const content = req.body.comentarios;
  const idArticle = req.params.id;
  const authorId = req.user.dataValues.id;

  try {
    console.log("Content:", content);
    console.log("Id Article:", idArticle);
    console.log("Author Id:", authorId);

    const author = await Author.findOne({
      where: {
        id: authorId,
      },
    });

    console.log("Author:", author);

    if (author.rolID === 4 || author.rolID === 3) {
      const comentario = await Comment.create({
        comment: content,
        username: author.firstname,
        articleId: idArticle,
      });

      console.log("Comentario creado:", comentario);

      res.redirect(`/articulos/${idArticle}`);
    } else {
      console.log("El autor no es lector ni escritor.");
      return res
        .status(403)
        .send("Solo los lectores y escritores pueden hacer comentarios en este artículo.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Ha ocurrido un error al crear el comentario.");
  }
}

module.exports = { store };
