import axios from 'axios';
import { createStore } from 'vuex';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default createStore({
    state: {
        tabletWidth: false,
        mobileDevice: null,
        productList: [],
        cartList: []
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
        },
        setCartList (state, payload) {
            state.cartList = payload;
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
        getCartList ({ commit }) {
            const cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
            commit('setCartList', cartList);
        },
        saveCartList (context, payload) {
            const cartList = JSON.stringify(payload);
            localStorage.setItem('cartList', cartList);
        }
    },
    modules: {
    }
});
