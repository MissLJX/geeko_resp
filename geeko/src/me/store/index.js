/**
 * Created by shao_ on 2017/8/23.
 */
import {creditcards} from '../api/index';
import state from "./state.js"
import getters from "./getters.js"
import mutations from "./mutations.js"
import actions from "./actions.js"

import point from "./module/point/index.js"


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
    modules:{
        point
    }
}
