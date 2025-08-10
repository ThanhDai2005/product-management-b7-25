module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash("error", `Vui lòng nhập tiêu đề!`);
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  next();
};
