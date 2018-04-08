/**
 * Created by shao_ on 2017/8/23.
 */
import {ROUTER_PATH_ME} from '../../utils/geekoutils'

const Me = [
    {
        path: ROUTER_PATH_ME,
        component: () => import('../pages/index.vue'),
        name: 'me',
        meta: {title: 'me'}
    },
    {
        path: ROUTER_PATH_ME + '/address-book',
        component: () => import('../pages/address-book.vue'),
        name: 'address-book',
        meta: {title: 'Address book'}
    },
    {
        path: ROUTER_PATH_ME + '/change-currency',
        component: () => import('../pages/change-currency.vue'),
        name: 'change-currency',
        meta: {title: 'Change currency'}
    },
    {
        path: ROUTER_PATH_ME + '/change-email',
        component: () => import('../pages/change-email.vue'),
        name: 'change-email',
        meta: {title: 'Change email'}
    },
    {
        path: ROUTER_PATH_ME + '/change-password',
        component: () => import('../pages/change-password.vue'),
        name: 'change-password',
        meta: {title: 'Change password'}
    },
    {
        path: ROUTER_PATH_ME + '/coupons',
        component: () => import('../pages/coupons.vue'),
        name: 'coupons',
        meta: {title: 'Coupons'}
    },
    {
        path: ROUTER_PATH_ME + '/credits',
        component: () => import('../pages/credits.vue'),
        name: 'credits',
        meta: {title: 'Credits'}
    },
    {
        path: ROUTER_PATH_ME + '/settings',
        component: () => import('../pages/settings.vue'),
        name: 'settings',
        meta: {title: 'Settings'}
    },
    {
        path: ROUTER_PATH_ME + '/notification',
        component: () => import('../pages/notification.vue'),
        name: 'notification',
        meta: {title: 'Notification'},
        children: [
            {
                path: '',
                name: 'notification-promotion',
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
                name: 'notification-me',
                meta: {title: 'Notification me', depth: 2},
                component: () => import('../pages/notification/notification-order.vue')
            },
            {
                path: 'other',
                name: 'notification-other',
                meta: {title: 'Notification others', depth: 3},
                component: () => import('../pages/notification/notification-other.vue')
            }
        ]
    },
    {
        path: ROUTER_PATH_ME + '/wishlist',
        component: () => import('../pages/wishlist.vue'),
        name: 'wishlist',
        meta: {title: 'Wish List'}
    }
]

export default Me
