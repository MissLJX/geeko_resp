import Loadable from 'react-loadable'

import Loading from './components/loading.jsx'

import {getSource} from './store'

const Home = Loadable({
	loader: () => import(/* webpackChunkName: "page--home" */ './pages/home.jsx'),
	loading: Loading
})

const Error404 = Loadable({
  loader: () => import(/* webpackChunkName: "page--404" */ './pages/404.jsx'),
	loading: Loading
})

const Join = Loadable({
  loader: () => import(/* webpackChunkName: "page--join" */ './pages/join.jsx'),
	loading: Loading
})

const Contact = Loadable({
  loader: () => import(/* webpackChunkName: "page--contact" */ './pages/contact.jsx'),
	loading: Loading
})

const Service = Loadable({
  loader: () => import(/* webpackChunkName: "page--service" */ './pages/service.jsx'),
	loading: Loading
})

const Supplier = Loadable({
  loader: () => import(/* webpackChunkName: "page--supplier" */ './pages/supplier.jsx'),
	loading: Loading
})

const JoinDetail = Loadable({
  loader: () => import(/* webpackChunkName: "page--joindetail" */ './pages/join-detail.jsx'),
	loading: Loading
})

const JoinMore = Loadable({
  loader: () => import(/* webpackChunkName: "page--joindmore" */ './pages/join-more.jsx'),
	loading: Loading
})

export default [
  {
    title: '上海极高信息技术有限公司',
    path: '/',
    exact: true,
    component: Home
  },
  {
    title: '加入我们 | 招聘',
    path: '/join/:type/:detail',
    component: JoinDetail,
    loadData: getSource('1')
  },
  {
    title: '加入我们 | 招聘',
    path: '/join',
    component: Join
  },
  {
    title: '更多职位信息',
    path: '/join-more',
    component: JoinMore
  },
  {
    title: '极高业务',
    path: '/service',
    component: Service
  },
  {
    title: '供应商',
    path: '/supplier',
    component: Supplier
  },
  {
    title: '联系我们',
    path: '/contact',
    component: Contact
  },
  {
    component: Error404
  }
]