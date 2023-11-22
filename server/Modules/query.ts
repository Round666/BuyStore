import mysql from 'mysql'
import config from '../config'

// 创建连接池
var pool = mysql.createPool(config.dbConfig)

const query = (sql:string,params:Array<number|string>)=>{
    return new Promise((resolve,reject)=>{
        // 获取连接
        pool.getConnection((err,conn)=>{
            if(err){
                reject(err)
                return;
            }
            // 查询数据库
            conn.query(sql,params,(error,result, fields)=>{
                console.log(`${sql}=>${params}`);
                
                if(error){
                    reject(error)
                    return
                }
                // 返回数据结果
                resolve(result)
            })
            // 释放连接(注意这里需要释放掉,不进行释放的话会导致多个请求同时进来
            // 而连接池的对象都被拿走无法请求新的连接)
            conn.release();
        })
    })
}

export default query