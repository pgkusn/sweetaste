import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
    state: {
        tabletWidth: false,
        mobileDevice: null,
        productList: []
    },
    mutations: {
        setDeviceWidth (state, payload) {
            state[payload.deviceType + 'Width'] = payload.value;
        },
        setMobileDevice (state, payload) {
            state.mobileDevice = payload;
        },
        setProductList (state, payload) {
            state.productList = payload;
        }
    },
    actions: {
        async getProductList ({ commit }) {
            try {
                const { data } = await axios(`${process.env.VUE_APP_API_URL}/product_list`);
                commit('setProductList', data);
            }
            catch (error) {
                console.error(error.message);
            }
        }
    },
    modules: {
    }
});
