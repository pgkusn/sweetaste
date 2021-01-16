import axios from 'axios';
import API from '@/data/api.js';

export default {
    namespaced: true,
    state: {
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
        setProductList (state, payload) {
            state.productList = payload;
        }
    },
    actions: {
        async getProductList ({ commit }) {
            try {
                const { data } = await axios({
                    method: API.productList.method,
                    url: API.productList.url
                });
                commit('setProductList', data);
                return data;
            }
            catch (error) {
                console.error(error.message);
            }
        }
    }
}
;
