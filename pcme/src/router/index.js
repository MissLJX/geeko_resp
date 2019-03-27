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
import Notification from '../components/notification.vue'
import UpdateProfile from '../components/update-profile.vue'
import Wishlist from '../components/wishlist.vue'
import confirmSuccess from '../pages/confirm-success.vue'
import OrderDetail from '../pages/order-detail.vue'
import LogisticsDetail from '../pages/logistics-detail.vue'
import PackageLogisticsDetail from '../pages/package-logistics-detail.vue'
import OrderReview from '../pages/order-review.vue'
import uploadAvatar from '../components/upload-avatar.vue'

Vue.use(VueRouter)

const routes = [
    {
        /*path:'/ivrose/me/m',*/
        path:'/me/m',
        component: Index,
        meta: {title:'Me'},
        children:[
            {
                path:'/',
                component:Me,
                meta: {title:'Me'},
            },
            {
                path:'order',
                component:Orders,
                name:'My Orders',
                meta: { keepAlive: true }
            },
            {
                path:'tickets',
                component:Tickets,
                meta: {title:'My Tickets'},
            },
            {
                path:'notification',
                component:Notification,
                meta: {title:'My Messages'},
                children: [
                    {
                        path: '',
                        name: 'promotion',
                        meta: {title: 'Notification promotion', depth: 1},
                        component: () => import('../components/notification/notification-promotion.vue')
                    },
                    {
                        path: 'order',
                        name: 'order',
                        meta: {title: 'Notification me', depth: 2},
                        component: () => import('../components/notification/notification-order.vue')
                    },
                    {
                        path: 'other',
                        name: 'other',
                        meta: {title: 'Notification others', depth: 3},
                        component: () => import('../components/notification/notification-other.vue')
                    }
                ]
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
        path:'/me/m/confirmSuccess*',
        component: confirmSuccess,
        meta: {title:'ConfirmEmail'},
    },
    {
        path:'/me/m/order/detail/:orderId',
        component: OrderDetail,
        meta: {title:'OrderDetail'},
    },
    {
        path:'/me/m/order-review',
        component: OrderReview,
        meta: {title:'OrderReview'},
    },
    {
        path:'/me/m/logistics-detail',
        component: LogisticsDetail,
        meta: {title:'LogisticsDetail'},
    },
    {
        path:'/me/m/packeage-logistics-detail',
        component: PackageLogisticsDetail,
        meta: {title:'PackageLogisticsDetail'},
    },
    {
        path:'/me/m/load',
        component: uploadAvatar,
        meta: {title:'LogisticsDetail'},
    }
];


export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
});
