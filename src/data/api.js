const API = {
    userLogin: {
        method: 'post',
        url: '/accounts:signInWithPassword',
        baseURL: 'https://identitytoolkit.googleapis.com/v1'
    },
    userSignUp: {
        method: 'post',
        url: '/accounts:signUp',
        baseURL: 'https://identitytoolkit.googleapis.com/v1'
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
