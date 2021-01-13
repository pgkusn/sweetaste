<template>
    <PageHeader />
    <transition name="fade" mode="out-in">
        <router-view />
    </transition>
    <Subscription />
    <PageFooter />
</template>

<script>
/* eslint-disable no-undef */
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import device from 'current-device';
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

        // set media sensor
        const mediaSensor = (minWidth, mediaType) => {
            const resizeWidth = pMatchMedia => store.commit('setMediaWidth', { mediaType, value: pMatchMedia.matches });
            const mm = window.matchMedia(`(max-width: ${minWidth}px)`);
            mm.addListener(resizeWidth);
            resizeWidth(mm);
        };
        mediaSensor(768, 'tablet');

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

        onMounted(async () => {
            const data = await store.dispatch('getProductList');
            if (data) {
                store.dispatch('getCartList');
                store.dispatch('getFavoriteProducts');
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
