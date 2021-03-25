const API = {
    userLogin: {
        method: 'post',
        url: '/accounts:signInWithPassword'
    },
    userSignUp: {
        method: 'post',
        url: '/accounts:signUp'
    },
    productList: {
        method: 'get',
        url: '/productList'
    },
    orderList: {
        method: 'get',
        url: '/order'
    },
    order: {
        method: 'post',
        url: '/order'
    }
};

module.exports = API;
