export default {
    namespaced: true,
    state: {
        cartList: null
    },
    mutations: {
        setCartList (state, payload) {
            state.cartList = payload;
        }
    },
    actions: {
        getCartList ({ commit }) {
            const cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
            commit('setCartList', cartList);
        },
        updateCartList ({ dispatch }, payload) {
            const cartList = JSON.stringify(payload);
            localStorage.setItem('cartList', cartList);
            dispatch('getCartList');
        }
    }
}
;
