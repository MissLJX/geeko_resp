import Cookie from 'js-cookie'

export const PROJECT = ''
export const ROUTER_PATH_ME = PROJECT + '/me'
export const getUUID = () => {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}


export const getWid = () => {
    var wid = '';
    wid = Cookie.get('clientId');
    if (!wid) {
        Cookie.set('clientId', getUUID(), {expires: 365});
        wid = Cookie.get('clientId');
    }
    return wid;
}
const month_names = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
export const enDate = (date) => {
    return month_names[date.getMonth()] + ' ' + date.getDate() + ',' + date.getFullYear()
}
export const enTime = (date) => {
    return enDate(date) + ' '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
export const enYear = (date) => {
    return date.getFullYear()
}

export const enMonth = (date) => {
    return month_names[date.getMonth()]
}

//order status
export const STATUS_PENDING = 1
export const STATUS_REVIEWING = 2
export const STATUS_PROCESSING = 3
export const STATUS_SHIPPED = 4
export const STATUS_PARTIALLY_REFUNDED = 5
export const STATUS_REFUNDED = 6
export const STATUS_CANCELED = 7
export const STATUS_HELD = 8
export const STATUS_CONFIRMED = 10


export const STATUS_LABEL = function (value) {
    var label;
    switch (value) {

        case STATUS_PENDING:
            label = 'Pending'
            break
        case STATUS_REVIEWING:
            label = 'paid'
            break
        case STATUS_PROCESSING:
            label = 'Processing'
            break
        case STATUS_SHIPPED:
            label = 'Shipped'
            break
        case STATUS_PARTIALLY_REFUNDED:
            label = 'Partially refunded'
            break
        case STATUS_REFUNDED:
            label = 'Refunded'
            break
        case STATUS_CANCELED:
            label = 'Canceled'
            break
        case STATUS_HELD:
            label = 'Held'
            break
        case STATUS_CONFIRMED:
            label = 'Confirmed'
            break
        default:
            label = ''
    }

    return label
}
//image util
export const IMAGE_PREFIX = 'https://s3-us-west-2.amazonaws.com/image.chic-fusion.com'
export const IMAGE_SMALL = 'small'
export const IMAGE_MEDIUM = 'medium'
export const IMAGE_LARGE = 'large'
export const IMAGE_ORIGINAL = 'original'

export const imageutil = {
    getSamll(id){
        return IMAGE_PREFIX + '/' + IMAGE_SMALL + '/' + id
    },
    getMedium(id){
        return IMAGE_PREFIX + '/' + IMAGE_MEDIUM + '/' + id
    },
    getLarge(id){
        return IMAGE_PREFIX + '/' + IMAGE_LARGE + '/' + id
    },
    getOriginal(id){
        return IMAGE_PREFIX + '/' + IMAGE_ORIGINAL + '/' + id
    },
    getHeaderImg(id){
        return IMAGE_PREFIX + '/icon/' + id
    }
}

export const unitprice = function (money) {
    return money && (money.unit + money.amount) || '';
}

const _url_analyst = function (name) {
    if (name) {
        return name.replace(new RegExp(/\s/g), '-');
    }
    return 'empty-name';
}

export const producturl = function (product) {
    return _.concat('product', _url_analyst(product.name), product.parentSku, product.id + '.html').join('/')
}
export const STATUS_COLOR = function (value) {
    var label;
    let color;
    switch (value) {
        case 0:
            label = 'Unpaid'
            color = '#f9a646'
            break
        case 1:
            label = 'Paid'
            color = '#d088e1'
            break
        case 2:
            label = 'Processing'
            color = '#d088e1'
            break
        case 3:
            label = 'Shipped'
            color = '#57b936'
            break
        case 4:
            label = 'Cancel'
            color = '#e64545'
            break
        case 5:
            label = 'Confirm'
            color = '#a4a4a7'
            break
        default:
            color = ''
    }

    return color
}
