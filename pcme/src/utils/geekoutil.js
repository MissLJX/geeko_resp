import Cookie from 'js-cookie'

export const PROJECT = window.ctx || ''
export const ROUTER_PATH_ME = PROJECT + '/me'
export const ROUTER_PATH_ME_M = PROJECT + "/me/m"

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
    return enDate(date) + ' '+ addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
}
export const enYear = (date) => {
    return date.getFullYear()
}
export const addZero = (num) => {
    return num > 9 ? num : '0'+num 
}

export const enMonth = (date) => {
    return month_names[date.getMonth()]
}

export const slashTime = (date) => {
    return (new Date(date).toLocaleDateString() + " " + new Date(date).toTimeString().substr(0, 5)) 
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
        return IMAGE_PREFIX + '/icon/' + id + "?icon=" + Date.now();
    }
}

export const unitprice = (money) => {
	if(money){
		return money.currency === 'EUR'? (money.amount + money.unit) : (money.unit + money.amount)
	}else{
		return ''
	}
}

export const unitPrice = price => {
	if(!price) return ''
	if(price.currency === 'EUR'){
		return `${price.amount}${price.unit}`
	}

	if(price.currency === 'BRL'){
		return `${ price.amount ? price.amount.replace('.',',') : '0,00'}${price.unit}`
	}

	return `${price.unit}${price.amount}`
}

const _url_analyst = function (name) {
    if (name) {
        return name.replace(new RegExp(/\s/g), '-');
    }
    return 'empty-name';
}

export const producturl = function (product) {
    return _.concat('product', _url_analyst(product.name), product.id + '.html').join('/')
}

export const productIdUrl = function (product) {
    return _.concat('product', _url_analyst(product.productName || product.name), (product.id || product.productId) + '.html').join('/')
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

export const getDYD = function(birthday){
    let birArr = birthday.split("-");
    let newArr = birArr.map(function(item){
        return parseInt(item);
    });

    let obj = {
        year:newArr[0],
        month:newArr[1],
        day:newArr[2]
    };
    return obj;
}

export const checkArray = function(arr){
    return arr && arr.length > 0
}

export const dateFormat = function(times) {
    var date = new Date(times);

    var str;

    var year=date.getFullYear();
    var hour = date.getHours();

    if(hour > 12){
        hour -= 12;
        str = "PM";
    }else{
        str = "AM";
    }

    /* 在日期格式中，月份是从0开始的，因此要加0
    * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
    * */
    var month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    var hours = hour < 10 ? "0"+hour : hour;
    var minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
    

    // 拼接
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds + " " + str;
}

export const dateFormatFunc = function(times) {
    var date = new Date(times);
    var year= date.getFullYear();
    var hour = date.getHours();

    /* 在日期格式中，月份是从0开始的，因此要加0
    * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
    * */
    var month = date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
    var day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    var hours = hour < 10 ? "0"+hour : hour;
    var minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0"+date.getSeconds() : date.getSeconds();
    

    // 拼接
    return year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;
}