import axios from 'axios';
import { createStore } from 'vuex';

export default createStore({
    state: {
        tabletWidth: false,
        mobileDevice: null,
        productList: []
    },
    getters: {
        productCategoryList: () => ({
            today: '本日精選',
            popular: '人氣推薦',
            new: '新品上市'
        })
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
                const { data } = await axios('/product_list');
                commit('setProductList', data);
            }
            catch (error) {
                alert(error.message);
            }
        },
        async addCart (context, id) {
            try {
                return await axios({
                    method: 'patch',
                    url: `/product_list/${id}`,
                    data: { inCart: true }
                });
            }
            catch (error) {
                alert(error.message);
            }
        }
    },
    modules: {
    }
});
