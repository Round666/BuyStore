import Router from 'koa-router'
import resourceRouter from './router/resourceRouter'
import productRouter from './router/productRouter'

var router = new Router({
    // prefix:'/api'
})

router.use(resourceRouter.routes())
.use(productRouter.routes())

export = router

