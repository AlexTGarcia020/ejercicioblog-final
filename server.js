require("dotenv").config();
const session = require("express-session");
const express = require("express");
const routes = require("./routes");
const methodOverride = require("method-override");
const flash = require("express-flash");
const app = express();

const { passportConfig, passport } = require("./config/passport");

app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET_WORD,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.session());
passportConfig();
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

routes(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${process.env.APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${process.env.APP_PORT}.`);
});
