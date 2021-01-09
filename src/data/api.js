const API = {
    userLogin: {
        url: '/accounts:signInWithPassword'
    },
    userSignUp: {
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
