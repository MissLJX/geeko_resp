/**
 * Created by shao_ on 2017/9/6.
 */
export default {
    computed: {
        url(){
            var deepLink = this.model.deepLink, _url
            switch (deepLink.type) {
                case 1:
                    _url = window.ctx + '/i/collection/products?collectionId=' + deepLink.params[0]
                    break
                case 2:
                    _url = window.ctx + '/i/product_detail?productId=' + deepLink.params[0]
                    break
                case 3:
                    _url = window.ctx + '/me/coupons'
                    break
                case 7:
                    _url = window.ctx + '/me/credits'
                    break
                case 8:
                    _url = window.ctx + '/me/orders/detail/' + deepLink.params[0]
                    break
                case 9:
                    _url = window.ctx + '/me/orders/contact/' + deepLink.params[1]
                    break
                case 10:
                    _url = window.ctx + '/i/lottery'
                    break
                case 11:
                    _url = window.ctx + '/i/early-bird'
                    break
                case 12:
                    _url = window.ctx + '/i/flash/products'
                    break
                case 13:
                    _url = window.ctx + '/i/new-arrivals'
                    break
                case 14:
                    _url = window.ctx + '/i/trending-now'
                    break
                case 15:
                    _url = window.ctx + '/i/category/products'
                    break
                case 17:
                    _url = window.ctx + '/shoppingcart/show'
                    break
                default:
                    _url = '#'
            }

            return _url
        }
    }
}