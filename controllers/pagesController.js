const { Article, Author } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({
    include: { all: true },
    order: [["updatedAt", "ASC"]],
  });
  if (Author.rolID < 3) {
    return res.redirect("/login");
  }
  res.render("home", { articles, userData: false });
}

async function showContact(req, res) {
  res.render("contact");
}

async function showAboutUs(req, res) {
  res.render("aboutUs");
}

async function showArticle(req, res) {
  const articles = await Article.findByPk();
  if (Author.rolID < 3) {
    return res.redirect("/login");
  }
  res.render("article", { articles });
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
