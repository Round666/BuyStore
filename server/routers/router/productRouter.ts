import Router from 'koa-router'
import controller from '../../Controller/productController'
const router = new Router({
    prefix:'/product'
})

router.post('/getPromoProduct',controller.GetPromoProduct)
.post('/getHotProduct',controller.GetHotProduct)

export = router