<template>
    <PageHeader />
    <transition name="fade" mode="out-in">
        <router-view />
    </transition>
    <PageFooter />
</template>

<script>
import { useStore } from 'vuex';
import firebase from 'firebase/app';
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
import { useMediaSensor } from '@/composition/mediaSensor';

export default {
    name: 'App',
    components: {
        PageHeader,
        PageFooter
    },
    setup () {
        useMediaSensor();

        FB.init({
            appId: '512477409242587',
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v9.0'
        });

        const firebaseConfig = {
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            authDomain: 'sweetaste-9013f.firebaseapp.com',
            databaseURL: 'https://sweetaste-9013f-default-rtdb.firebaseio.com',
            projectId: 'sweetaste-9013f',
            storageBucket: 'sweetaste-9013f.appspot.com',
            messagingSenderId: '515679602203',
            appId: '1:515679602203:web:fdad032ecca427ffdc5abe'
        };
        firebase.initializeApp(firebaseConfig);

        const store = useStore();
        store.dispatch('login/setUserProfileFromCookie');
        store.dispatch('cart/getCartList');
        store.dispatch('product/getProductList').then(res => {
            if (res) {
                store.dispatch('favorite/getFavoriteProducts');
            }
        });
    }
};
</script>

<style lang="scss">
@import '@/assets/sass/reset';
@import '@/assets/sass/common';

html,
body {
    height: 100%;
}
body {
    min-width: 375px;
}
#app {
    display: flex;
    flex-direction: column;
    height: 100%;
}
main {
    width: 100%;
    flex-grow: 1;
}
.container {
    margin: 0 auto;
    padding: 0 30px;
    max-width: #{$content-width}px;
    // outline: 1px solid #f00;
    @media (min-width: #{$tablet-width + 1}px) {
        padding: 0 42px;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.alertify-notifier {
    color: #fff;
}
</style>
