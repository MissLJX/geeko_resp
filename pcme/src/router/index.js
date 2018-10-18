import Vue from 'vue'
import VueRouter from 'vue-router'
import Page404 from '../pages/404.vue'
import Index from '../pages/index.vue'
import Me from '../components/me.vue'
import AddressBook from '../components/address-book.vue'
import Cards from '../components/cards.vue'
import ChangeEmail from '../components/change-email.vue'
import ChangePwd from '../components/change-pwd.vue'
import Coupons from '../components/coupons.vue'
import Credits from '../components/credits.vue'
import MakeSug from '../components/make-sug.vue'
import Orders from '../components/orders.vue'
import Tickets from '../components/tickets.vue'
import UpdateProfile from '../components/update-profile.vue'
import Wishlist from '../components/wishlist.vue'
import ConfirmSuccess from '../pages/confirm-success.vue'
import OrderDetail from '../pages/order-detail.vue'
import LogisticsDetail from '../pages/logistics-detail.vue'
import OrderReview from '../pages/order-review.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: 'Me',
        component: Index,
        meta: {title:'Me'},
        redirect: to => '/me/m',
    },
    {
        path:'/me',
        component: Index,
        meta: {title:'Me'},

        children:[
            {
                path:'m',
                component:Me,
                meta: {title:'Me'},
            },
            {
                path:'orders',
                component:Orders,
                meta: {title:'My Orders'},
            },
            {
                path:'tickets',
                component:Tickets,
                meta: {title:'My Tickets'},
            },
            {
                path:'coupons',
                component:Coupons,
                meta: {title:'My Coupons'},
            },
            {
                path:'credits',
                component:Credits,
                meta: {title:'My Credits'},
            },
            {
                path:'cards',
                component:Cards,
                meta: {title:'My Credit Cards'},
            },
            {
                path:'wishlist',
                component:Wishlist,
                meta: {title:'My Wishlist'},
            },
            {
                path:'addressBook',
                component:AddressBook,
                meta: {title:'Address Book'},
            },
            {
                path:'changeEmail',
                component:ChangeEmail,
                meta: {title:'Change Email'},
            },
            {
                path:'changePwd',
                component:ChangePwd,
                meta: {title:'Change Password'},
            },
            {
                path:'updateProfile',
                component:UpdateProfile,
                meta: {title:'Update Profile'},
            },
            {
                path:'makeSug',
                component:MakeSug,
                meta: {title:'Make Suggestion'},
            },
        ]
        },
    {
        path:'/me/confirm-email',
        component: ConfirmSuccess,
        meta: {title:'ConfirmEmail'},
    },
    {
        path:'/me/order-detail',
        component: OrderDetail,
        meta: {title:'OrderDetail'},
    },
    {
        path:'/me/order-review',
        component: OrderReview,
        meta: {title:'OrderReview'},
    },
    {
        path:'/me/logistics-detail',
        component: LogisticsDetail,
        meta: {title:'LogisticsDetail'},
    }
]


const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
})

router.afterEach(route => {

})

export default router
