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


export const unitprice = (money) => {
	if(money){
        if(!money.amount){
            return ''
        }
		return money.currency === 'EUR'? (money.amount + money.unit) : (money.unit + money.amount)
	}else{
		return ''
	}
}

export const pricePoints = (points,type)=>{
    if(points){
        if(type==1){
            return '<span style="font-size:12px;"> + '+points+'</span><img style="width:10px;margin:0 3px;" src="https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-points.png">'
        } else {
            return points + '<img style="width:10px;margin:0 3px;" src="https://image.geeko.ltd/2021-11-01-lottery/2021-11-01-lottery-points.png">'
        }
    } else {
        return ''
    }
}

export const getPointsMoney = (money) => {
    // console.log(money)
    if(!!!money)return '';
    var moneyTxt = '';
    if(money.price && money.points && money.price.amount && money.price.amount != 0){
        moneyTxt = unitprice(money.price) + pricePoints(money.points,1);
    } else if(money.price && money.points && (!money.price.amount || money.price.amount == 0)){
        moneyTxt = pricePoints(money.points,2);
    } else if(money.price && !!!money.points && money.price.amount > 0){
        moneyTxt = unitprice(money.price)
    } else if(!!!money.price && money.points){
        moneyTxt = pricePoints(money.points,2)
    }
    return moneyTxt
}

export const producturl = function (product) {
    return _.concat('product', _url_analyst(product.name), product.id + '.html').join('/')
}


export const changeLocalLanguage = function(language){
    Cookie.set('lang', language , {expires: 30});
}

export const changeLocalCurrency = function(currency){
    Cookie.set('currency', currency , {expires: 30});
}

export const getLocalCookie = function(name){
    return Cookie.get(name);
}

export const saveUserHasNoCommentOrderState = function(state){
    return Cookie.set('_has_no_comment_order', state, {expires: 1})
}

export const removeLocalCookie = function(name){
    return Cookie.remove(name);
}

export const isEmojiCharacter =  function(substring) {
    for ( var i = 0; i < substring.length; i++) {
        var hs = substring.charCodeAt(i);
        if (0xd800 <= hs && hs <= 0xdbff) {
            if (substring.length > 1) {
                var ls = substring.charCodeAt(i + 1);
                var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
                if (0x1d000 <= uc && uc <= 0x1f77f) {
                    return true;
                }
            }
        } else if (substring.length > 1) {
            var ls = substring.charCodeAt(i + 1);
            if (ls == 0x20e3) {
                return true;
            }
        } else {
            if (0x2100 <= hs && hs <= 0x27ff) {
                return true;
            } else if (0x2B05 <= hs && hs <= 0x2b07) {
                return true;
            } else if (0x2934 <= hs && hs <= 0x2935) {
                return true;
            } else if (0x3297 <= hs && hs <= 0x3299) {
                return true;
            } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
                || hs == 0x2b50) {
                return true;
            }
        }
    }
    return false;
}



