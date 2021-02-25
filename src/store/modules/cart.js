import LS from '@/modules/LocalStorage';

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
            commit('setCartList', LS.get('cartList'));
        },
        addCartList ({ commit }, item) {
            const cartList = LS.get('cartList');
            cartList.push(item);
            LS.set('cartList', cartList);
            commit('setCartList', cartList);
        },
        updateCartList ({ commit }, { id, num }) {
            const cartList = LS.get('cartList');
            cartList.forEach(item => {
                if (item.id === id) {
                    item.orderAmount = num;
                }
            });
            LS.set('cartList', cartList);
            commit('setCartList', cartList);
        },
        removeCartList ({ commit }, id) {
            const cartList = LS.get('cartList');
            const index = cartList.findIndex(value => value.id === id);
            cartList.splice(index, 1);
            LS.set('cartList', cartList);
            commit('setCartList', cartList);
        },
        clearCartList ({ commit }) {
            LS.set('cartList', []);
            commit('setCartList', []);
        }
    }
};
