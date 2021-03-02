import LS from '@/modules/LocalStorage';

export default {
    namespaced: true,
    state: {
        favoriteProducts: []
    },
    mutations: {
        setFavoriteProducts (state, payload) {
            state.favoriteProducts = payload;
        }
    },
    actions: {
        getFavoriteProducts ({ commit }) {
            commit('setFavoriteProducts', LS.get('favoriteProducts'));
        },
        addFavoriteProducts ({ commit }, { id }) {
            const products = LS.get('favoriteProducts');
            products.push(id);
            LS.set('favoriteProducts', products);
            commit('setFavoriteProducts', products);
            return id;
        },
        removeFavoriteProducts ({ commit }, { index }) {
            const products = LS.get('favoriteProducts');
            products.splice(index, 1);
            LS.set('favoriteProducts', products);
            commit('setFavoriteProducts', products);
            return products;
        }
    }
};
