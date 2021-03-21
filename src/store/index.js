import { createStore } from 'vuex';
import NProgress from 'nprogress';
import axios from 'axios';
import login from './modules/login';
import cart from './modules/cart';
import product from './modules/product';
import favorite from './modules/favorite';
import order from './modules/order';

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
    modules: {
        login,
        cart,
        product,
        favorite,
        order
    }
});
