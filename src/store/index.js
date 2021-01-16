import { createStore } from 'vuex';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import axios from 'axios';
import login from './login';
import cart from './cart';
import product from './product';
import favorite from './favorite';
import order from './order';

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
        tabletWidth: false
    },
    mutations: {
        setMediaWidth (state, payload) {
            state[payload.mediaType + 'Width'] = payload.value;
        }
    },
    modules: {
        login,
        cart,
        product,
        favorite,
        order
    }
});
