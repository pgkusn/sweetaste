import axios from 'axios';
import { createStore } from 'vuex';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export default createStore({
    state: {
        tabletWidth: false,
        mobileDevice: null,
        productList: [],
        cartList: [],
        lineProfile: null,
        fbProfile: null
    },
    getters: {
        productCategoryList: () => ({
            today: '本日精選',
            popular: '人氣推薦',
            new: '新品上市'
        }),
        lineInfo: () => ({
            channelID: '1563584152',
            channelSecret: '784af891734ae5e34c4b8ea5c382410c',
            callbackURL: location.origin + location.pathname,
            state: 'abcde' // 自訂驗證碼
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
        },
        setLineProfile (state, payload) {
            state.lineProfile = payload;
        },
        setFbProfile (state, payload) {
            state.fbProfile = payload;
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
        updateCartList ({ dispatch }, payload) {
            const cartList = JSON.stringify(payload);
            localStorage.setItem('cartList', cartList);
            dispatch('getCartList');
        },
        async getLineToken (context, data) {
            try {
                const result = await axios({
                    method: 'post',
                    url: 'https://api.line.me/oauth2/v2.1/token',
                    data
                });
                return result.data.access_token;
            }
            catch (error) {
                alert(error.message);
            }
        },
        async getLineProfile (context, token) {
            try {
                const { data } = await axios({
                    method: 'get',
                    url: 'https://api.line.me/v2/profile',
                    headers: { Authorization: `Bearer ${token}` }
                });
                return data;
            }
            catch (error) {
                alert(error.message);
            }
        }
    },
    modules: {
    }
});
