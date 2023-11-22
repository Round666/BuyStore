import Router from 'koa-router'
import controller from '../../Controller/resourceController'

var router = new Router(
    {
        prefix:'/resource'
    }
)

router.post('/carousel',controller.Carousel)


export = router

