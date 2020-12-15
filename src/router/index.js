import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Login from '../views/Login.vue';
import Cart from '../views/Cart.vue';
import Checkout from '../views/Checkout.vue';
import Success from '../views/Success.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/product',
        name: 'Product',
        component: Product
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        children: [
            {
                path: 'ship',
                name: 'Ship',
                component: () => import('@/views/Ship.vue')
            },
            {
                path: 'payment',
                name: 'Payment',
                component: () => import('@/views/Payment.vue')
            },
            {
                path: 'invoice',
                name: 'Invoice',
                component: () => import('@/views/Invoice.vue')
            }
        ]
    },
    {
        path: '/success',
        name: 'Success',
        component: Success
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { top: 0 };
    }
});

export default router;
