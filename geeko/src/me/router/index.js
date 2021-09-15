/**
 * Created by shao_ on 2017/8/23.
 */
import {ROUTER_PATH_ME} from '../../utils/geekoutils'

const Me = [
    {
        path: ROUTER_PATH_ME,
        component: () => import(/* webpackChunkName: "me" */ '../pages/index3.vue'),
        name: 'me',
        meta: {title: 'me'}
    },
    {
        path: ROUTER_PATH_ME + '/creditcards',
        component: () => import(/* webpackChunkName: "creditcards" */ '../pages/creditcards.vue'),
        name: 'creditcards',
        meta: {title: 'Credit Cards'}
    },
    {
        path: ROUTER_PATH_ME + '/address-book',
        component: () => import(/* webpackChunkName: "address-book" */ '../pages/address-book.vue'),
        name: 'address-book',
        meta: {title: 'Address book'}
    },
    {
        path: ROUTER_PATH_ME + '/change-currency',
        component: () => import(/* webpackChunkName: "change-currency" */ '../pages/change-currency.vue'),
        name: 'change-currency',
        meta: {title: 'Change currency'}
    },
    {
        path:ROUTER_PATH_ME + "/edit-message",
        component:() => import(/* webpackChunkName: "edit-user-message" */ '../pages/EditUserMessage.vue'),
        name:"edit-user-message",
        meta:{title:"Edit User Message"}
    },
    {
        path: ROUTER_PATH_ME + '/change-email',
        component: () => import(/* webpackChunkName: "change-email" */ '../pages/change-email.vue'),
        name: 'change-email',
        meta: {title: 'Change email'}
    },
    {
        path: ROUTER_PATH_ME + '/change-password',
        component: () => import(/* webpackChunkName: "change-password" */ '../pages/change-password.vue'),
        name: 'change-password',
        meta: {title: 'Change password'}
    },
    {
        path: ROUTER_PATH_ME + '/coupons',
        component: () => import(/* webpackChunkName: "coupons" */ '../pages/coupons.vue'),
        name: 'coupons',
        meta: {title: 'Coupons' , keepAlive:true},
        // children:[
        //     {
        //         path:"",
        //         name:"UnusedCoupon",
        //         component:() => import("../pages/coupon/UnusedCoupon.vue"),
        //         meta: {title: 'UnusedCoupon' , keepAlive:true},
        //     },
        //     {
        //         path:"unused-coupon",
        //         component:() => import("../pages/coupon/UnusedCoupon.vue"),
        //         meta: {title: 'UnusedCoupon' , keepAlive:true},
        //     }, 
        //     {
        //         path:"expired-coupon",
        //         name:"ExpiredCoupon",
        //         component:() => import("../pages/coupon/ExpiredCoupon.vue"),
        //         meta: {title: 'ExpiredCoupon' , keepAlive:true},
        //     },
        // ]
    },
    {
        path: ROUTER_PATH_ME + '/credits',
        component: () => import(/* webpackChunkName: "credits" */ '../pages/credits.vue'),
        name: 'credits',
        meta: {title: 'Credits'}
    },
    {
        path: ROUTER_PATH_ME + '/settings',
        component: () => import(/* webpackChunkName: "settings" */ '../pages/settings.vue'),
        name: 'settings',
        meta: {title: 'Settings'}
    },
    {
        path: ROUTER_PATH_ME + '/confirm-email',
        component: () => import(/* webpackChunkName: "confirm-email" */ '../pages/confirm-email.vue'),
        name: 'confirm-email',
        meta: {title: 'Login Protection'}
    },
    {
        path: ROUTER_PATH_ME + '/notification',
        component: () => import(/* webpackChunkName: "notification" */ '../pages/notification.vue'),
        // name: 'notification',
        meta: {title: 'Notification'},
        children: [
            {
                path: '',
                name: 'notification-promotion',
                meta: {title: 'Notification promotion', depth: 1},
                component: () => import(/* webpackChunkName: "notification-promotion" */ '../pages/notification/notification-promotion.vue')
            },
            {
                path: 'promotion',
                meta: {title: 'Notification promotion', depth: 1},
                component: () => import(/* webpackChunkName: "notification-promotion" */ '../pages/notification/notification-promotion.vue')
            },
            {
                path: 'order',
                name: 'notification-me',
                meta: {title: 'Notification me', depth: 2},
                component: () => import(/* webpackChunkName: "notification-me" */ '../pages/notification/notification-order.vue')
            },
            {
                path: 'other',
                name: 'notification-other',
                meta: {title: 'Notification others', depth: 3},
                component: () => import(/* webpackChunkName: "notification-other" */ '../pages/notification/notification-other.vue')
            }
        ]
    },
    {
        path: ROUTER_PATH_ME + '/wishlist',
        component: () => import(/* webpackChunkName: "wishlist" */ '../pages/wishlist.vue'),
        name: 'wishlist',
        meta: {title: 'Wish List',keepAlive:true}
    },
    {
        path: ROUTER_PATH_ME + '/confirmSuccess*',
        component: () => import(/* webpackChunkName: "confirmSuccess" */ '../pages/confirm-success.vue'),
        name: 'Login Protection',
        meta: {title: 'Login Protection'}
    },
    {
        path:ROUTER_PATH_ME + '/track-order',
        component: () => import(/* webpackChunkName: "track-order" */ '../pages/track-order.vue'),
        name:"track-order",
        meta:{title:'Track Order'}
    },
    {
        path:ROUTER_PATH_ME + "/points-history",
        component:() => import(/* webpackChunkName: "points-history" */ '../pages/points-history.vue'),
        meta:{title:"Points History"},
        children:[
            {
                path:"",
                component:() => import(/* webpackChunkName: "points-all" */ "../pages/point/PointsAll.vue"),
                name:"points-all",
                meta:{title:"Points All",depth:1,keepAlive:true}
            },
            {
                path:"all",
                naem:"points-all2",
                component:() => import(/* webpackChunkName: "points-all2" */ "../pages/point/PointsAll.vue"),
                meta:{title:"Points All",depth:1,keepAlive:true}
            },
            {
                path:"recived",
                component:() => import(/* webpackChunkName: "points-recived" */ "../pages/point/PointsRecived.vue"),
                name:"points-recived",
                meta:{title:"Points Recived",depth:2,keepAlive:true}
            },
            {
                path:"used",
                component:() => import(/* webpackChunkName: "points-used" */ "../pages/point/PointsUsed.vue"),
                name:"points-used",
                meta:{title:"Points Used",depth:3,keepAlive:true}
            },
            {
                path:"expired",
                component:() => import(/* webpackChunkName: "points-expired" */ "../pages/point/PointsExpired.vue"),
                name:"points-expired",
                meta:{title:"Points Expired",depth:4,keepAlive:true}
            }
        ]
    },
    {
        path:ROUTER_PATH_ME + "/makeSug",
        component:() => import(/* webpackChunkName: "make-sug" */ "../pages/make-sug.vue"),
        name:"make-sug",
        meta:{title:"Make Sug"}
    },
    {
        path:ROUTER_PATH_ME + "/survey",
        component:() => import(/* webpackChunkName: "survey" */ "../pages/survey.vue"),
        name:"survey",
        meta:{title:"Survey"}
    },
    {
        path:ROUTER_PATH_ME + "/about-policy",
        component:() => import(/* webpackChunkName: "about-policy" */ "../pages/about-policy.vue"),
        name:"about-policy",
        meta:{title:"Policy"}
    },
    {
        path:ROUTER_PATH_ME + "/my-preference",
        component:() => import(/* webpackChunkName: "my-preference" */ "../pages/editmessage/MyPreference.vue"),
        name:"my-preference",
        meta:{title:"My Preference"}
    },
    {
        path:ROUTER_PATH_ME + "/my-measurements",
        component:() => import(/* webpackChunkName: "my-measurements" */ "../pages/editmessage/MyMeasurements.vue"),
        name:"my-measurements",
        meta:{title:"My Measurements"}
    },
    {
        path:ROUTER_PATH_ME + "/edit-name",
        component:() => import(/* webpackChunkName: "edit-name" */ "../pages/editmessage/EditUserName.vue"),
        name:"edit-name",
        meta:{title:"Edit User Name"}
    },
    {
        path:ROUTER_PATH_ME + "/edit-nickname",
        component:() => import(/* webpackChunkName: "edit-nickname" */ "../pages/editmessage/EditUserNickName.vue"),
        name:"edit-nickname",
        meta:{title:"Edit User NickName"}
    },
    {
        path:ROUTER_PATH_ME + "/edit-bio",
        component:() => import(/* webpackChunkName: "edit-bio" */ "../pages/editmessage/EditUserBio.vue"),
        name:"edit-bio",
        meta:{title:"Edit User Bio"}
    },
    {
        path:ROUTER_PATH_ME + "/relation-products/:productId",
        component:() => import(/* webpackChunkName: "relation-products" */ "../pages/relation-products.vue"),
        name:"relation-products",
        meta:{title:"Relation Products"}
    },
    // {
    //     path:ROUTER_PATH_ME + "/point-guide",
    //     component:() => import("../pages/point-guide.vue"),
    //     name:"point-guide",
    //     meta:{title:"My Points"}
    // }
    // {
    //     path:ROUTER_PATH_ME + "/test",
    //     component:() => import("../pages/Test.vue"),
    //     name:"Test",
    //     meta:{title:"Test"}
    // }
]

export default Me
