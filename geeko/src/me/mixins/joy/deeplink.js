/**
 * Created by shao_ on 2017/9/6.
 */
export default {
    computed: {
        url(){
            var deepLink = this.model.deepLink, _url
            switch (deepLink.type) {
                case 1:
                    _url = window.ctx + '/page/collection/products?collectionId=' + deepLink.params[0]
                    break
                case 2:
                    _url = window.ctx + '/page/product?productId=' + deepLink.params[0]
                    break
                case 3:
                    _url = window.ctx + '/me/m/coupons'
                    break
                case 7:
                    _url = window.ctx + '/me/m/credits'
                    break
                case 8:
                    _url = window.ctx + '/me/m/order/detail/' + deepLink.params[0]
                    break
                case 9:
                    _url = window.ctx + '/me/m/order/contact/' + deepLink.params[1]
                    break
                // case 10:
                //     _url = '#'
                //     break
                case 11:
                    _url = window.ctx + '/page/pre-bird'
                    break
                case 12:
                    _url = window.ctx + '/page/flash-sale'
                    break
                case 13:
                    _url = window.ctx + '/page/new-in'
                    break
                case 14:
                    _url = window.ctx + '/page/trending-now'
                    break
                case 15:
                    _url = window.ctx + '/page/category/products?id='+deepLink.params[0]
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