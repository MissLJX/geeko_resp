import * as types from '../../mutation_types'
import * as api  from '../../../api'
import _ from 'lodash'

const state = {
    pointsAll:[],
    pointsAllSkip:0,
    pointsRecived:[],
    pointsRecivedSkip:0,
    pointsUsed:[],
    pointsUsedSkip:0,
    pointsExpired:[],
    pointsExpiredSkip:0,
    pointsCustomerNum:{},
    pointsProducts:[],
    pointsProductsSkip:0,
};

const getters = {
    pointsAll:state => state.pointsAll,
    pointsAllSkip:state => state.pointsAllSkip,
    pointsRecived:state => state.pointsRecived,
    pointsRecivedSkip:state => state.pointsRecivedSkip,
    pointsUsed:state => state.pointsUsed,
    pointsUsedSkip:state => state.pointsUsedSkip,
    pointsExpired:state => state.pointsExpired,
    pointsExpiredSkip:state => state.pointsExpiredSkip,
    pointsCustomerNum:state => state.pointsCustomerNum,
    pointsProducts:state => state.pointsProducts,
    pointsProductsSkip:state => state.pointsProductsSkip
};

const mutations = {
    [types.ME_GET_POINTS_ALL](state,points){
        state.pointsAll = _.concat(state.pointsAll, points)
    },
    [types.ME_GET_POINTS_ALL_SKIP](state){
        state.pointsAllSkip += 20;
    },
    [types.ME_GET_POINTS_Recived](state,points){
        state.pointsRecived = _.concat(state.pointsRecived, points)
    },
    [types.ME_GET_POINTS_Recived_SKIP](state){
        state.pointsRecivedSkip += 20;
    },
    [types.ME_GET_POINTS_Used](state,points){
        state.pointsUsed = _.concat(state.pointsUsed, points)
    },
    [types.ME_GET_POINTS_Used_SKIP](state){
        state.pointsUsedSkip += 20;
    },
    [types.ME_GET_POINTS_Expired](state,points){
        state.pointsExpired = _.concat(state.pointsExpired, points)
    },
    [types.ME_GET_POINTS_Expired_SKIP](state){
        state.pointsExpiredSkip += 20;
    },
    [types.ME_GET_POINTS_CUSTOMER_NUM](state,customerPoints){
        state.pointsCustomerNum = customerPoints;
    },
    [types.ME_GET_POINTS_PRODUCTS](state,pointsProducts){
        state.pointsProducts = _.concat(state.pointsProducts,pointsProducts)
    },
    [types.ME_GET_POINTS_PRODUCT_SKIP](state){
        state.pointsProductsSkip += 20
    },
};

const actions = {
    getPointsAll({commit},skip){
        return api.getPointsAll(skip).then((points) => {
            if(points && points.length > 0){
                commit(types.ME_GET_POINTS_ALL,points);
                return {empty:true}
            }else{
                return {finished:true}
            }
        }).catch(error => {
            console.log("error",error);
        });
    },
    getPointsAllSkip({commit}){
        commit(types.ME_GET_POINTS_ALL_SKIP);
    },
    getPointsRecived({commit},skip){
        return api.getPointsRecived(skip).then((pointsRecived) => {
            if(pointsRecived && pointsRecived.length > 0){
                commit(types.ME_GET_POINTS_Recived,pointsRecived);
                return {empty:true}
            }else{
                return {finished:true}
            }
        }).catch(error => {
            console.log("error",error);
        });
    },
    getPointsRecivedSkip({commit}){
        commit(types.ME_GET_POINTS_Recived_SKIP);
    },
    getPointsUsed({commit},skip){
        return api.getPointsUsed(skip).then((points) => {
            if(points && points.length > 0){
                commit(types.ME_GET_POINTS_Used,points);
                return {empty:true}
            }else{
                return {finished:true}
            }
        }).catch(error => {
            console.log("error",error);
        });
    },
    getPointsUsedSkip({commit}){
        commit(types.ME_GET_POINTS_Used_SKIP);
    },
    getPointsExpired({commit},skip){
        return api.getPointsExpired(skip).then((points) => {
            if(points && points.length > 0){
                commit(types.ME_GET_POINTS_Expired,points);
                return {empty:true}
            }else{
                return {finished:true}
            }
        }).catch(error => {
            console.log("error",error);
        });
    },
    getPointsExpiredSkip({commit}){
        commit(types.ME_GET_POINTS_Expired_SKIP);
    },
    getCustomerPointsNum({commit}){
        return new Promise((reslove,reject) => {
            api.getCustomerPointsNum().then((points) => {
                commit(types.ME_GET_POINTS_CUSTOMER_NUM,points);
                reslove(points);
            });
        });
    },
    getPointsProducts({commit}, {skip}){
        return api.getPointsProductList(skip).then((products) => {
            if (products && products.length) {
                commit(types.ME_GET_POINTS_PRODUCTS, products)
            } else {
                if (skip === 0) {
                    return {empty: true, finished: true}
                }
                return {finished: true}
            }
            return {}
        })
    },
    getPointsSkip({commit}){
        commit(types.ME_GET_POINTS_PRODUCT_SKIP)
    },
    makeSuggestion({commit},formData){
        return api.makeSuggestion(formData);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}