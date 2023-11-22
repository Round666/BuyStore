import {PoolConfig} from 'mysql'

export const dbConfig:PoolConfig = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'123',
    connectTimeout:1000*10,
    database:'storedb'
}

export default dbConfig