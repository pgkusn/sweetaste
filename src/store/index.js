import { createStore } from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from 'axios';
import API from '@/data/api.js';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.request.use(function (config) {
    NProgress.start();
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
}, function (error) {
    NProgress.done();
    return Promise.reject(error);
});

export default createStore({
    state: {
        tabletWidth: false,
        productList: [],
        cartList: [],
        userProfile: null
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
        setProductList (state, payload) {
            state.productList = payload;
        },
        setCartList (state, payload) {
            state.cartList = payload;
        },
        setUserProfile (state, payload) {
            state.userProfile = payload;
        }
    },
    actions: {
        async getLineToken (context, data) {
            try {
                const result = await axios({
                    method: 'post',
                    url: 'https://api.line.me/oauth2/v2.1/token',
                    data
                });
                return result.data;
            }
            catch (error) {
                console.error(error.message);
                return {
                    status: 'error',
                    message: '登入失敗'
                };
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
                console.error(error.message);
                return {
                    status: 'error',
                    message: '登入失敗'
                };
            }
        },
        async userLogin (context, payload) {
            // doc：https://firebase.google.com/docs/reference/rest/auth
            try {
                const { data } = await axios({
                    method: process.env.NODE_ENV === 'prod' ? 'post' : 'get',
                    url: `${API.userLogin.url}?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
                    baseURL: process.env.VUE_APP_GOOGLE_API_URL,
                    data: {
                        ...payload,
                        returnSecureToken: true
                    }
                });
                return data;
            }
            catch (error) {
                console.error(error.message);

                let message = '';
                switch (error.response.data.error?.message) {
                case 'EMAIL_NOT_FOUND':
                    message = 'Email 不存在';
                    break;
                case 'INVALID_PASSWORD':
                    message = '密碼錯誤';
                    break;
                default:
                    message = '登入失敗';
                    break;
                }

                return {
                    status: 'error',
                    message
                };
            }
        },
        async userSignUp (context, payload) {
            // doc：https://firebase.google.com/docs/reference/rest/auth
            try {
                const { data } = await axios({
                    method: process.env.NODE_ENV === 'prod' ? 'post' : 'get',
                    url: `${API.userSignUp.url}?key=${process.env.VUE_APP_FIREBASE_API_KEY}`,
                    baseURL: process.env.VUE_APP_GOOGLE_API_URL,
                    data: {
                        ...payload,
                        returnSecureToken: true
                    }
                });
                return data;
            }
            catch (error) {
                console.error(error.message);

                let message = '';
                switch (error.response.data.error?.message) {
                case 'EMAIL_EXISTS':
                    message = 'Email 重複';
                    break;
                case 'INVALID_EMAIL",':
                    message = 'Email 格式錯誤';
                    break;
                default:
                    message = '註冊失敗';
                    break;
                }

                return {
                    status: 'error',
                    message
                };
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
        },
        async order (context, payload) {
            try {
                const result = await axios({
                    method: API.order.method,
                    url: API.order.url,
                    data: payload
                });
                return result;
            }
            catch (error) {
                console.error(error.message);
                return {
                    status: 'error',
                    message: '網路錯誤 請稍後再試'
                };
            }
        }
    },
    modules: {
    }
});
