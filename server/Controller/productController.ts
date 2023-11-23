import { Middleware } from 'koa'
import productDao from '../Modules/Dao/productDao'

/**
 * 获取商品分类
 * @param ctx 请求体
 */
const GetPromoProduct: Middleware = async ctx => {
    console.log(ctx.request.body);
    
    let { categoryName } = ctx.request.body as { categoryName: string };
    // 根据商品分类名称获取分类id
    const categoryID = await productDao.GetCategoryId(categoryName);
    // 根据商品分类id获取首页展示的商品信息
    const Product = await productDao.GetPromoProduct(categoryID);
    ctx.body = {
        code: '001',
        Product
    }
}

/**
 * 根据商品id获取热门产品
 * @param ctx 
 */
const GetHotProduct: Middleware = async ctx => {
    let { categoryName } = ctx.request.body;

    const categoryID = [];

    for (let i = 0; i < categoryName.length; i++) {
        // 根据商品分类名称获取分类id
        const category_id = await productDao.GetCategoryId(categoryName[i]);
        categoryID.push(category_id);
    }
    // 根据商品分类id获取商品信息
    const Product = await productDao.GetProductByCategory(categoryID, 0, 7);

    ctx.body = {
        code: '001',
        Product
    }
}

/**
 * 获取商品分类
 * @param ctx 
 */
const GetCategory: Middleware = async ctx => {
    const category = await productDao.GetCategory()
    ctx.body = {
        code: '001',
        category
    }
}

/**
 * 获取全部商品
 * @param ctx 
 */
const GetAllProduct:Middleware =async ctx => {
    let { currentPage, pageSize } = ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    const Product = await productDao.GetAllProduct(offset, pageSize);
    // 获取所有的商品数量,用于前端分页计算
    const total = (await productDao.GetAllProduct()).length;
    ctx.body = {
      code: '001',
      Product,
      total
    }
}

/**
 * 根据商品分类获取商品
 * @param ctx 
 */
const GetProductByCategory:Middleware = async ctx =>{
    let { categoryID, currentPage, pageSize } = ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    // 分页获取该分类的商品信息
    const Product = await productDao.GetProductByCategory(categoryID, offset, pageSize);
    // 获取该分类所有的商品数量,用于前端分页计算
    const total = (await productDao.GetProductByCategory(categoryID)).length;

    ctx.body = {
      code: '001',
      Product,
      total
    }
}

const GetProductBySearch:Middleware = async ctx=>{
    let { search, currentPage, pageSize } = ctx.request.body;
    // 计算开始索引
    const offset = (currentPage - 1) * pageSize;
    // 获取分类列表
    const category = await productDao.GetCategory();

    let Product;
    let total;

    for (let i = 0; i < category.length; i++) {
      // 如果搜索条件为某个分类名称,直接返回该分类的商品信息
      if (search == category[i].category_name) {
        // 获取该分类的商品信息
        Product = await productDao.GetProductByCategory(category[i].category_id, offset, pageSize);
        // 获取该分类所有的商品数量,用于前端分页计算
        total = (await productDao.GetProductByCategory(category[i].category_id)).length;

        ctx.body = {
          code: '001',
          Product,
          total
        }
        return;
      }
    }
    
    // 否则返回根据查询条件模糊查询的商品分页结果
    Product = await productDao.GetProductBySearch(search, offset, pageSize);
    // 获取模糊查询的商品结果总数
    total = (await productDao.GetProductBySearch(search)).length;

    ctx.body = {
      code: '001',
      Product,
      total
    }
}

export = {
    GetPromoProduct,
    GetHotProduct,
    GetCategory,
    GetAllProduct,
    GetProductByCategory,
    GetProductBySearch
}