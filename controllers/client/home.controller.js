const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");

// [GET] /
module.exports.index = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(6);

  const newProducts = productHelper.priceNewProducts(productFeatured);

  // Hết lấy ra sản phẩm nổi bật

  res.render("client/pages/home/index", {
    pageTitle: "Trang Chủ",
    productsFeatured: newProducts,
  });
};
