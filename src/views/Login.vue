<template>
    <button @click="lineLogin">
        LINE LOGIN
    </button>
    |
    <button @click="fbLogin">
        FB LOGIN
    </button>
</template>

<script>
/* eslint-disable no-undef */
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: 'Login',
    setup () {
        const store = useStore();
        const router = useRouter();

        // check login
        if (store.state.lineProfile || store.state.fbProfile) {
            router.push({ name: 'Home' });
        }

        const lineLogin = () => {
            const { channelID, callbackURL, state } = store.getters.lineInfo;
            let url = 'https://access.line.me/oauth2/v2.1/authorize?';
            url += 'response_type=code';
            url += '&client_id=' + channelID;
            url += '&redirect_uri=' + callbackURL;
            url += '&state=' + state;
            url += '&scope=openid%20email%20profile';
            location.href = url; // 前往 line 登入畫面
        };

        const fbLogin = () => {
            const getStatus = res => {
                if (res.status !== 'connected') {
                    FB.login(getStatus);
                    return;
                }
                // get user profile
                FB.api('/me', 'GET', { fields: ['picture', 'name'] }, res => {
                    const fbInfo = {
                        id: res.id,
                        name: res.name,
                        picture: res.picture.data.url
                    };
                    store.commit('setFbProfile', fbInfo);
                    localStorage.setItem('fbInfo', JSON.stringify(fbInfo));

                    const beforeLoginPage = localStorage.getItem('beforeLoginPage') || 'Home';
                    router.push({ name: beforeLoginPage });
                    localStorage.removeItem('beforeLoginPage');
                });
            };
            FB.getLoginStatus(getStatus);
        };

        return {
            lineLogin,
            fbLogin
        };
    }
};
</script>

<style>

</style>
