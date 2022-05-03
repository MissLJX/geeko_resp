/**
 * Created by shao_ on 2017/9/6.
 */
export default {
    computed: {
        url(){
            var deepLink = this.model.deepLink, _url
            switch (deepLink.type) {
                case 1:
                    // _url = '/i/collection/products?collectionId=' + deepLink.params[0]
                    _url = `/collection/products/${deepLink.params[0]}.html`
                    break
                case 2:
                    // _url = '/i/product_detail?productId=' + deepLink.params[0]
                    _url = `/product/details/${deepLink.params[0]}.html`
                    break
                case 3:
                    _url = '/me/m/coupons'
                    break
                case 7:
                    _url = '/me/m/credits'
                    break
                case 8:
                    _url = '/me/m/order'
                    break
                case 9:
                    if(deepLink.params[0]){
                        _url = '/me/m/faq/support-ticket/'+deepLink.params[0]
                    } else {
                        _url = '/me/m/faq/support-ticket'
                    }
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
                    // _url = '/i/category/products?categoryId=' + deepLink.params[0]
                    _url = `/category/products/${deepLink.params[0]}.html`
                    break
                case 16:
                    _url = deepLink.params[0]
                    break
                case 17:
                    _url = '/shoppingcart/show'
                    break
                case 22:
                    _url = '/me/m/order/detail/' + deepLink.params[0]
                    break
                default:
                    _url = '#'
            }
            return _url
        }
    }
}



