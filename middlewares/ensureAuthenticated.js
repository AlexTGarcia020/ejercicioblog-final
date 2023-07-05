function ensureAutentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.session.redirectTo = req.originalUrl;
    res.redirect("/login");
  }
}
function makeUserAvailableInViews(req, res, next) {
  res.locals.user = req.user;
  return next();
}
module.exports = { ensureAutentication, makeUserAvailableInViews };
