import axios from 'axios';
import API from '@/data/api.js';
import LS from '@/modules/localStorage';
import { checkLogin } from '@/modules/login';

// doc：https://firebase.google.com/docs/reference/rest/auth
const firebaseApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1',
    params: {
        key: process.env.VUE_APP_FIREBASE_API_KEY
    }
});

export default {
    namespaced: true,
    state: {
        userProfile: null
    },
    getters: {
        lineInfo: () => ({
            channelID: '1563584152',
            channelSecret: '784af891734ae5e34c4b8ea5c382410c',
            callbackURL: location.origin + location.pathname,
            state: 'abcde' // 自訂驗證碼
        })
    },
    mutations: {
        setUserProfile (state, payload) {
            state.userProfile = payload;
        }
    },
    actions: {
        async getLineToken (context, payload) {
            try {
                const { data } = await axios({
                    method: 'post',
                    url: 'https://api.line.me/oauth2/v2.1/token',
                    data: payload
                });
                return {
                    success: true,
                    ...data
                };
            }
            catch (error) {
                console.error(error.message);
                return {
                    success: false,
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
                return {
                    success: true,
                    ...data
                };
            }
            catch (error) {
                console.error(error.message);
                return {
                    success: false,
                    message: '登入失敗'
                };
            }
        },
        async userLogin (context, payload) {
            try {
                const { data } = await firebaseApi({
                    method: API.userLogin.method,
                    url: API.userLogin.url,
                    data: {
                        ...payload,
                        returnSecureToken: true
                    }
                });
                return {
                    success: true,
                    ...data
                };
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
                    success: false,
                    message
                };
            }
        },
        async userSignUp (context, payload) {
            try {
                const { data } = await firebaseApi({
                    method: API.userLogin.method,
                    url: API.userSignUp.url,
                    data: {
                        ...payload,
                        returnSecureToken: true
                    }
                });
                return {
                    success: true,
                    ...data
                };
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
                    success: false,
                    message
                };
            }
        },
        setUserProfileHandler ({ commit }, userProfile) {
            commit('setUserProfile', userProfile);
            LS.set('userProfile', userProfile);
        },
        setUserProfileFromCookie ({ commit }) {
            const userProfile = checkLogin();
            if (userProfile) {
                commit('setUserProfile', JSON.parse(userProfile));
            }
        },
        logout ({ commit }) {
            commit('setUserProfile', null);
            LS.remove('userProfile');
        }
    }
};
