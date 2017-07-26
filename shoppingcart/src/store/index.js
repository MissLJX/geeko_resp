/**
 * Created by shao_ on 2017/7/11.
 */

const REFRESH_SHOPPING_CART = 'REFRESH_SHOPPING_CART'


const state = {
    shoppingCart: null,
    loading: false,
    checkoutUrl: ''
}


const getters = {
    shoppingCart: state => state.shoppingCart
}

const mutations = {
    [REFRESH_SHOPPING_CART](state, _shopping_cart){
        state.shoppingCart = _shopping_cart
    }
}

const actions = {
    refreshShoppingCart({commit}, _shopping_cart){
        if (_shopping_cart) {
            commit(REFRESH_SHOPPING_CART, _shopping_cart)
        }
    }
}


export {
    state,
    getters,
    mutations,
    actions
}