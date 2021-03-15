import Cookie from 'js-cookie'


/**
 * Created by shao_ on 2017/8/22.
 */

const _url_analyst = function (name) {
    if (name) {
        return name.replace(new RegExp(/\s/g), '-');
    }
    return 'empty-name';
}


//app params
export const VERSION = 'v9'
export const APP_VERSION = '3.2.0'
export const VPATH = '/' + VERSION
// export const PROJECT = '/boutiquefeel'
export const PROJECT = window.ctx || ''
export const ROUTER_PATH_ME = PROJECT + '/me/m'


//global util
export const getCountry = () => {
    var language = navigator.language;
    if (language && language.indexOf("-") >= 0) {
        var keys = language.split("-");
        if (keys.length <= 1)
            return "US";
        return keys[1].toUpperCase();
    }
    return "US";
}


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


//image util
export const IMAGE_PREFIX = 'https://image.geeko.ltd'
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
    }
}


export const unitprice = function (money) {
    return money && (money.unit + money.amount) || '';
}

export const producturl = function (product) {
    return _.concat('product', _url_analyst(product.name), product.parentSku, product.id + '.html').join('/')
}


