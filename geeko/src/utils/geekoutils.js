/**
 * Created by shao_ on 2017/8/22.
 */

export const IMAGE_PREFIX = 'https://dgzfssf1la12s.cloudfront.net'
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