/**
 * Created by shao_ on 2017/7/20.
 */



export const shoppingcart = {
    path: '/shoppingcart/show',
    component: () => import('../pages/index.vue'),
    name: 'shoppingcart',
    meta: {title: 'Shopping Cart', keepAlive: true}
}