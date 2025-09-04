const md5 = require("md5");
const User = require("../../models/user.model");

// [GET] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (existEmail) {
    req.flash("error", "Email đã tồn tại");
    const previousUrl = req.get("referer");
    res.redirect(previousUrl);
    return;
  }

  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  await user.save();

  console.log(user);

  res.cookie("token", user.tokenUser);

  res.redirect("/");
};
