/**
 * Created by shao_ on 2017/8/23.
 */

const Me = [
    {
        path: '/me',
        component: () => import('../pages/index.vue'),
        name: 'me',
        meta: {title: 'me'}
    },
    {
        path: '/me/address-book',
        component: () => import('../pages/address-book.vue'),
        name: 'address-book',
        meta: {title: 'Address book'}
    },
    {
        path: '/me/change-currency',
        component: () => import('../pages/change-currency.vue'),
        name: 'change-currency',
        meta: {title: 'Change currency'}
    },
    {
        path: '/me/change-email',
        component: () => import('../pages/change-email.vue'),
        name: 'change-email',
        meta: {title: 'Change email'}
    },
    {
        path: '/me/change-password',
        component: () => import('../pages/change-password.vue'),
        name: 'change-password',
        meta: {title: 'Change password'}
    },
    {
        path: '/me/coupons',
        component: () => import('../pages/coupons.vue'),
        name: 'coupons',
        meta: {title: 'Coupons'}
    },
    {
        path: '/me/credits',
        component: () => import('../pages/credits.vue'),
        name: 'credits',
        meta: {title: 'Credits'}
    },
    {
        path: '/me/settings',
        component: () => import('../pages/settings.vue'),
        name: 'settings',
        meta: {title: 'Settings'}
    },
    {
        path: '/me/notification',
        component: () => import('../pages/notification.vue'),
        name: 'notification',
        meta: {title: 'Notification'},
        children: [
            {
                path: '',
                meta: {title: 'Notification promotion', depth: 1},
                component: () => import('../pages/notification/notification-promotion.vue')
            },
            {
                path: 'promotion',
                meta: {title: 'Notification promotion', depth: 1},
                component: () => import('../pages/notification/notification-promotion.vue')
            },
            {
                path: 'order',
                meta: {title: 'Notification order', depth: 2},
                component: () => import('../pages/notification/notification-order.vue')
            },
            {
                path: 'other',
                meta: {title: 'Notification others', depth: 3},
                component: () => import('../pages/notification/notification-other.vue')
            }
        ]
    },
    {
        path: '/me/wishlist',
        component: () => import('../pages/wishlist.vue'),
        name:'wishlist',
        meta:{title:'Wish List'}
    }
]

export default Me