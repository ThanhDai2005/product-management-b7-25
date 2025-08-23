module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập mật khẩu!`);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  next();
};
