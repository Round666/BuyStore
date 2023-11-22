import {Middleware} from 'koa'
import dao from '../Modules/Dao/resoureceDao'

const Carousel:Middleware = async(ctx)=>{
    const res = await dao.Carousel();
    ctx.body = res
}

export =  {
    Carousel
}