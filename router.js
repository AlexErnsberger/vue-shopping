const routers=[
    {
        path:'/list',
        meta:{
            title:'商品列表'
        },
        component:(resolve)=>require(['./views/list.vue'],resolve)
    },
    {
        path:'/product/:id',
        meta:{
            title:'商品详情'
        },
        component:(resolve)=>require(['./views/product.vue'],resolve)
    },
    {
        path:'/cart',
        meta:{
            title:'购物车'
        },
        component:(reslove)=>require(['./views/cart.vue'],reslove)
    },
    {
        path:'*',
        redirect:'/list'
    }
]

export default routers;
