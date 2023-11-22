import query from '../query'
// 连接数据库,根据商品分类名称获取分类id
const GetCategoryId = async (categoryName) => {
    const sql = "select * from category where category_name = ?";
    const category = await query(sql, [categoryName]);
    return category[0].category_id;
}

// 连接数据库,根据商品分类id获取首页展示的商品信息
const GetPromoProduct = async (categoryID) => {
    const sql = "select * from product where category_id = ? order by product_sales desc limit 7";
    return await query(sql, categoryID);
}

// 连接数据库,根据商品分类id,分页获取商品信息
const GetProductByCategory = async (categoryID, offset = 0, rows = 0) => {
    let sql = "select * from product where category_id = ? ";
    for (let i = 0; i < categoryID.length - 1; i++) {
      sql += "or category_id = ? ";
    }
    if (rows != 0) {
      sql += "order by product_sales desc limit " + offset + "," + rows;
    }
    return await query(sql, categoryID);
}

export = {
    GetCategoryId,
    GetPromoProduct,
    GetProductByCategory
}