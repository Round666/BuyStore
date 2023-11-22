export default [
    {
        path:'/',
        name:'home',
        component:()=>import('@/views/home/index.vue')
    },
    {
        path:'/goods',
        name:'goods',
        component:()=>import('@/views/goods/index.vue')
    },
    {
        path:'/about',
        name:'about',
        component:()=>import('@/views/about/index.vue')
    }
]