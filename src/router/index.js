import { createRouter, createWebHashHistory } from 'vue-router';
import { checkLogin } from '@/modules/login';
import Home from '../views/Home.vue';
import Product from '../views/Product.vue';
import Login from '../views/Login.vue';
import SignUp from '../views/SignUp.vue';
import Cart from '../views/Cart.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/product',
        name: 'Product',
        component: Product,
        props: route => ({ cate: route.query.cate })
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter (to, from, next) {
            if (checkLogin()) {
                next({ name: 'Home' });
            }
            else {
                next();
            }
        }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: () => import(/* webpackChunkName: "group-checkout" */ '@/views/Checkout.vue'),
        children: [
            {
                path: '',
                name: 'Ship',
                component: () => import(/* webpackChunkName: "group-checkout" */ '@/views/Ship.vue'),
                beforeEnter (to, from, next) {
                    if (!checkLogin()) {
                        sessionStorage.setItem('beforeLoginPage', 'Ship');
                        next({ name: 'Login' });
                    }
                    else {
                        next();
                    }
                }
            },
            {
                path: 'payment',
                name: 'Payment',
                component: () => import(/* webpackChunkName: "group-checkout" */ '@/views/Payment.vue'),
                beforeEnter (to, from, next) {
                    if (from.name !== 'Ship') {
                        next('/checkout');
                    }
                    else {
                        next();
                    }
                }
            },
            {
                path: 'invoice',
                name: 'Invoice',
                component: () => import(/* webpackChunkName: "group-checkout" */ '@/views/Invoice.vue'),
                beforeEnter (to, from, next) {
                    if (from.name !== 'Payment') {
                        next('/checkout');
                    }
                    else {
                        next();
                    }
                }
            }
        ]
    },
    {
        path: '/success/:id',
        name: 'Success',
        component: () => import('@/views/Success.vue'),
        props: true,
        beforeEnter (to, from, next) {
            if (from.name !== 'Invoice') {
                next({ name: 'Home' });
            }
            else {
                next();
            }
        }
    },
    {
        path: '/order/:id',
        name: 'Order',
        component: () => import('@/views/Order.vue'),
        props: true,
        beforeEnter (to, from, next) {
            if (!checkLogin()) {
                sessionStorage.setItem('beforeLoginPage', 'Order');
                next({ name: 'Login' });
            }
            else {
                next();
            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: Home
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
