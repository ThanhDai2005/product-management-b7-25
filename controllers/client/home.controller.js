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

  const newProductsFeatured = productHelper.priceNewProducts(productFeatured);
  // Hết lấy ra sản phẩm nổi bật
  const productsNew = await Product.find({
    deleted: false,
    status: "active",
  })
    .limit(6)
    .sort({ position: "desc" });

  const newProductsNew = productHelper.priceNewProducts(productsNew);
  // Hiển thị danh sách sản phẩm mới nhất

  // Hết Hiển thị danh sách sản phẩm mới nhất

  res.render("client/pages/home/index", {
    pageTitle: "Trang Chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew,
  });
};
