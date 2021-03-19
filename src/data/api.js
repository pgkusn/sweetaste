const API = {
    userLogin: {
        method: 'post',
        url: '/accounts:signInWithPassword',
        baseURL: process.env.VUE_APP_GOOGLE_API_URL
    },
    userSignUp: {
        method: 'post',
        url: '/accounts:signUp',
        baseURL: process.env.VUE_APP_GOOGLE_API_URL
    },
    productList: {
        method: 'get',
        url: '/productList'
    },
    orderList: {
        method: 'get',
        url: '/order',
        baseURL: 'https://kenge-mock-api.herokuapp.com/sweetaste'
    },
    order: {
        method: 'post',
        url: '/order',
        baseURL: 'https://kenge-mock-api.herokuapp.com/sweetaste'
    }
};

module.exports = API;
