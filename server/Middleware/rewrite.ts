import {Middleware} from 'koa'

export const rewrite:Middleware = async(ctx,next)=>{
    if(ctx.url.startsWith('/public')){
        ctx.url = ctx.url.replace('/public','')
    }
    await next()
}