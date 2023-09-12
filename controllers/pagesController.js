const { Article, Author } = require("../models");

async function showHome(req, res) {
  try {
    console.log("Antes de la consulta a la base de datos");
    const articles = await Article.findAll({
      include: { model: Author },
      order: [["updatedAt", "ASC"]],
    });

    const user = req.session.user;

    console.log("Después de la consulta a la base de datos");

    if (user && user.rolID < 4) {
      console.log("Redirigiendo a /login");
      return res.redirect("/login");
    }

    console.log("Renderizando la vista 'home'");
    res.render("home", { articles, userData: false });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar la página de inicio.");
  }
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function showArticle(req, res) {
  try {
    const articleId = req.params.id;
    const article = await Article.findByPk(articleId, {
      include: Author, 
    });

    const user = req.session.user;

    if (!article) {
      return res.status(404).send("Artículo no encontrado.");
    }

    res.render("article", { article, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar el artículo.");
  }
}

async function showLogin(req, res) {
  const errorMessage = req.flash("error");
  res.render("login", { message: errorMessage });
}

async function showRegister(req, res) {
  res.render("./register", { flash: req.flash() });
}
async function register(req, res) {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await Author.findOne({ where: { email: email } });
    if (existingUser) {
      req.flash(
        "error",
        "El correo electrónico ya está registrado. Por favor, utiliza otro correo.",
      );
      return res.redirect("/register");
    }
    await Author.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    req.flash("success", "Registro exitoso. Inicia sesión para continuar.");
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    req.flash("error", "Ha ocurrido un error en el registro.");
    res.redirect("/register");
  }
}
function logout(req, res) {
  req.session.destroy((err) => res.redirect("/"));
}

module.exports = {
  showHome,
  showContact,
  showAboutUs,
  showArticle,
  showLogin,
  showRegister,
  register,
  logout,
};
