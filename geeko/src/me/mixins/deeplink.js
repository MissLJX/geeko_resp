/**
 * Created by shao_ on 2017/9/6.
 */
export default {
    computed: {
        url(){
            var deepLink = this.model.deepLink, _url
            switch (deepLink.type) {
                case 1:
                    _url = '/i/collection/products?collectionId=' + deepLink.params[0]
                    break
                case 2:
                    _url = '/i/product_detail?productId=' + deepLink.params[0]
                    break
                case 3:
                    _url = '/me/m/coupons'
                    break
                case 7:
                    _url = '/me/m/credits'
                    break
                case 8:
                    _url = '/me/m/order/detail/' + deepLink.params[0]
                    break
                case 9:
                    _url = '/me/m/order/ticket/' + deepLink.params[0]
                    break
                case 10:
                    _url = '/i/lottery'
                    break
                case 11:
                    _url = '/i/early-bird'
                    break
                case 12:
                    _url = '/i/flash/products'
                    break
                case 13:
                    _url = '/i/new-arrivals'
                    break
                case 14:
                    _url = '/i/trending-now'
                    break
                case 15:
                    _url = '/i/category/products'
                    break
                case 16:
                    _url = deepLink.params[0]
                    break
                case 17:
                    _url = '/shoppingcart/show'
                    break
                default:
                    _url = '#'
            }
            return _url
        }
    }
}



