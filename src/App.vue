<template>
    <div :class="{ 'is-mobile': isMobile }">
        <PageHeader />
        <router-view />
        <Subscription />
        <PageFooter />
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MobileDetect from 'mobile-detect';
import firebase from 'firebase/app';
import PageHeader from '@/components/PageHeader.vue';
import Subscription from '@/components/Subscription.vue';
import PageFooter from '@/components/PageFooter.vue';

export default {
    name: 'App',
    components: {
        PageHeader,
        Subscription,
        PageFooter
    },
    setup () {
        const store = useStore();
        const mediaSensor = (minWidth, deviceType) => {
            const resizeWidth = pMatchMedia =>
                store.commit('setDeviceWidth', { deviceType, value: pMatchMedia.matches });
            const mm = window.matchMedia(`(min-width: ${minWidth}px)`);
            mm.addListener(resizeWidth);
            resizeWidth(mm);
        };
        const isMobile = computed(() => store.state.mobileDevice);
        onMounted(async () => {
            mediaSensor(768, 'tablet');
            store.commit('setMobileDevice', new MobileDetect(window.navigator.userAgent).mobile());

            const data = await store.dispatch('getProductList');
            if (data) {
                store.dispatch('getCartList');
            }

            // init fb
            FB.init({
                appId: '512477409242587',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v9.0'
            });

            // init firebase
            const firebaseConfig = {
                apiKey: 'AIzaSyDvkKiZKyxVcN_PMi81IRpZWF16AgIjFQU',
                authDomain: 'sweetaste-9013f.firebaseapp.com',
                databaseURL: 'https://sweetaste-9013f-default-rtdb.firebaseio.com',
                projectId: 'sweetaste-9013f',
                storageBucket: 'sweetaste-9013f.appspot.com',
                messagingSenderId: '515679602203',
                appId: '1:515679602203:web:fdad032ecca427ffdc5abe'
            };
            firebase.initializeApp(firebaseConfig);
        });
        return {
            isMobile
        };
    }
};
</script>

<style lang="scss">
@import '@/assets/sass/reset';
@import '@/assets/sass/common';

html,
body,
.app {
    height: 100%;
}
body {
    min-width: 375px;
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
.alertify-notifier {
    color: #fff;
}
</style>
