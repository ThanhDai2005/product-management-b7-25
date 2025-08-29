const ProductCategory = require("../models/product-category.model");

module.exports.getSubCategory = async (parentId) => {
  const getSubCategory = async (parentId) => {
    const subs = await ProductCategory.find({
      parent_id: parentId,
      status: "active",
      deleted: false,
    });

    let allSub = [...subs];

    for (const sub of subs) {
      const childs = await getSubCategory(sub.id);
      allSub.push(...childs);
    }

    return allSub;
  };

  const result = await getSubCategory(parentId);
  return result;
};
