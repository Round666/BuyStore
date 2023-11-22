import query from "../query";
export = {
    // 连接数据库获取轮播图数据
    Carousel: async () => {
      const sql = 'select * from carousel';
      return await query(sql, []);
    }
}