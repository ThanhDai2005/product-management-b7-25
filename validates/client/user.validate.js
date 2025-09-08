module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", `Vui lòng nhập họ tên!`);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

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

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", `Vui lòng nhập email!`);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  next();
};

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", `Vui lòng nhập mật khẩu`);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  if (!req.body.confirmPassword) {
    req.flash("error", `Vui lòng xác nhận lai  mật khẩu `);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  if (req.body.password != req.body.confirmPassword) {
    req.flash("error", `Xác nhận mật khẩu không trùng khớp!`);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  next();
};
