<template>
    <PageHeader />
    <transition name="fade" mode="out-in">
        <router-view />
    </transition>
    <!-- <Subscription /> -->
    <PageFooter />
</template>

<script>
/* eslint-disable no-undef */
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import device from 'current-device';
import firebase from 'firebase/app';
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
// import Subscription from '@/components/Subscription.vue';

export default {
    name: 'App',
    components: {
        PageHeader,
        PageFooter
        // Subscription
    },
    setup () {
        const store = useStore();
        const router = useRouter();

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

        // line login
        (async function () {
            const removeQueryString = () => {
                history.replaceState({}, '', location.href.split(/[?#]/)[0]);
            };

            const { channelID, channelSecret, callbackURL, state: urlState } = store.getters['login/lineInfo'];

            // 1. check url
            const searchParams = (new URL(document.location)).searchParams;
            const code = searchParams.get('code');
            const state = searchParams.get('state');
            if (!code || urlState !== state) return;

            // 2. get token
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('code', code);
            params.append('redirect_uri', callbackURL);
            params.append('client_id', channelID);
            params.append('client_secret', channelSecret);
            const tokenData = await store.dispatch('login/getLineToken', params);
            if (!tokenData.success) {
                alertify.error(tokenData.message);
                removeQueryString();
                return;
            }

            // 3. get user profile
            const profileData = await store.dispatch('login/getLineProfile', tokenData.access_token);
            if (!profileData.success) {
                alertify.error(profileData.message);
                removeQueryString();
                return;
            }
            const userProfile = {
                uid: profileData.userId,
                displayName: profileData.displayName,
                photoURL: profileData.pictureUrl
            };
            store.commit('login/setUserProfile', userProfile);
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            removeQueryString();
            const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
            router.push({ name: beforeLoginPage });
            sessionStorage.removeItem('beforeLoginPage');
        })();

        onMounted(async () => {
            const data = await store.dispatch('product/getProductList');
            if (data) {
                store.dispatch('cart/getCartList');
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
