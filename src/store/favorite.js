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
            const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts') || '[]');
            commit('setFavoriteProducts', favoriteProducts);
        },
        updateFavoriteProducts ({ dispatch }, payload) {
            const favoriteProducts = JSON.stringify(payload);
            localStorage.setItem('favoriteProducts', favoriteProducts);
            dispatch('getFavoriteProducts');
        }
    }
}
;
