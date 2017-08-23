/**
 * Created by shao_ on 2017/8/22.
 */
export const unitprice = function(money){
    return money && (money.unit + money.amount) || '';
}