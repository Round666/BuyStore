import {Middleware} from 'koa'

export const error:Middleware = async(ctx,next)=>{
    try{
        await next()
    }catch(err){
        console.log(err)
        ctx.body = {
            code:500,
            msg:'服务器运行错误'
        }
        return;
    }
}