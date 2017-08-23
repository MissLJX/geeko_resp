/**
 * Created by shao_ on 2017/8/23.
 */


var me_data = {
    "success": true,
    "code": 200,
    "result": {
        "id": "104h9U4A4b8z183i4O712d5F3o",
        "name": {"firstName": "邵", "lastName": "栩"},
        "email": "aaas@163.com",
        "birthday": "1990-01-01",
        "gender": 1,
        "invitationCode": null,
        "currency": {"label": "USD($)", "value": "USD"},
        "useCouponCount": 0,
        "oceamQuickpayId": "19dda57b-46f2-4c58-bb1e-e6a8316ba44f",
        "communicationEmail": "aaas@163.com",
        "networkStarStatus": null,
        "networkStarInfo": null,
        "isNotRemindComment": false,
        "isExistOceamQuickpayId": true
    }
}



var address_data = {
    "success": true,
    "code": 200,
    "result": [{
        "id": "1o4n9b9p2N346n8K7U7b6b432b",
        "name": "傻逼也译作",
        "country": {"label": "United States", "value": "US"},
        "state": {"label": "Alabama", "value": "AL"},
        "city": "傻逼城市",
        "streetAddress1": "傻逼地址",
        "streetAdress": null,
        "unit": "傻逼单位",
        "phoneNumber": "123456",
        "zipCode": "223200",
        "isDefaultAddress": false
    }, {
        "id": "10459X565G2O9x3c73276l9O5i",
        "name": "Shaolei",
        "country": {"label": "United States", "value": "US"},
        "state": {"label": "Alabama", "value": "AL"},
        "city": "new yourk",
        "streetAddress1": "strret",
        "streetAdress": null,
        "unit": "",
        "phoneNumber": "1234567",
        "zipCode": "123456",
        "isDefaultAddress": true
    }]
}



export const get = () => {
    return new Promise((resolve, reject) => {
        resolve(me_data)
    }).then(me_data => me_data.result)
}


export const getShippingDetails = () => {
    return new Promise((resolve, reject) => {
        resolve(address_data)
    }).then(address_data => address_data.result)
}