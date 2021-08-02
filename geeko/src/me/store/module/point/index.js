import * as types from '../../mutation_types'
import * as api  from '../../../api'

const state = {
    pointsAll:[],
    pointsAllSkip:0,
    pointsRecived:[],
    pointsRecivedSkip:0,
    pointsUsed:[],
    pointsUsedSkip:0,
    pointsExpired:[],
    pointsExpiredSkip:0,
    pointsCustomerNum:{}
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
    pointsCustomerNum:state => state.pointsCustomerNum
};

const mutations = {
    [types.ME_GET_POINTS_ALL](state,points){
        state.pointsAll = _.concat(state.pointsAll, points)
    },
    [types.ME_GET_POINTS_ALL_SKIP](state){
        state.pointsAllSkip += 20;
    },
    [types.ME_GET_POINTS_Recived](state,points){
        state.pointsRecived = _.concat(state.pointsAll, points)
    },
    [types.ME_GET_POINTS_Recived_SKIP](state){
        state.pointsRecivedSkip += 20;
    },
    [types.ME_GET_POINTS_Used](state,points){
        state.pointsAll = _.concat(state.pointsAll, points)
    },
    [types.ME_GET_POINTS_Used_SKIP](state){
        state.pointsAllSkip += 20;
    },
    [types.ME_GET_POINTS_Expired](state,points){
        state.pointsAll = _.concat(state.pointsAll, points)
    },
    [types.ME_GET_POINTS_Expired_SKIP](state){
        state.pointsAllSkip += 20;
    },
    [types.ME_GET_POINTS_CUSTOMER_NUM](state,customerPoints){
        state.pointsCustomerNum = customerPoints;
    }
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
            });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}