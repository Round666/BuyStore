import Koa from "koa"

const app = new Koa()

app.use(async(ctx,next)=>{
    console.log(ctx.url);
    await next()
})
// post 解析
import koaBody from 'koa-body'
import bodyparser from 'koa-bodyparser'
app.use(koaBody({
    multipart:true
}))
// app.use(bodyparser())

// 静态资源路由重写
import { rewrite } from "./Middleware/rewrite";
app.use(rewrite)

// 错误处理
import {error} from './Middleware/error'
app.use(error)

// 路由
import router from './routers'
app.use(router.routes())
.use(router.allowedMethods())

// 静态资源
import KoaStatic from 'koa-static'
import config from './config'
app.use(KoaStatic(config.starticDir))



const PORT = 3001

app.listen(PORT,()=>{
    console.log(`${PORT}端口监听中...`);
})
