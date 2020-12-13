<template>
    <div class="login">
        <form class="login__member" @submit.prevent="submitHandler">
            <input v-model="email" type="text" placeholder="E-mail">
            <input v-model="password" type="password" placeholder="Password">
            <input type="submit" value="登入帳號">
        </form>
        <div class="login__social">
            <button @click="lineLogin">
                LINE LOGIN
            </button>
            <button @click="fbLogin">
                FB LOGIN
            </button>
        </div>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: 'Login',
    setup () {
        const store = useStore();
        const router = useRouter();

        // check login
        if (store.state.lineProfile || store.state.fbProfile || store.state.userProfile) {
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
                    const fbProfile = {
                        id: res.id,
                        name: res.name,
                        picture: res.picture.data.url
                    };
                    store.commit('setFbProfile', fbProfile);
                    localStorage.setItem('fbProfile', JSON.stringify(fbProfile));

                    const beforeLoginPage = localStorage.getItem('beforeLoginPage') || 'Home';
                    router.push({ name: beforeLoginPage });
                    localStorage.removeItem('beforeLoginPage');
                });
            };
            FB.getLoginStatus(getStatus);
        };

        // user login
        const email = ref('');
        const password = ref('');
        const submitHandler = async () => {
            const data = await store.dispatch('userLogin', {
                email: email.value.trim(),
                password: password.value.trim()
            });
            store.commit('setUserProfile', {
                userUid: data.userUid,
                displayName: data.displayName
            });
            localStorage.setItem('userProfile', JSON.stringify(data));

            const beforeLoginPage = localStorage.getItem('beforeLoginPage') || 'Home';
            router.push({ name: beforeLoginPage });
            localStorage.removeItem('beforeLoginPage');
        };

        return {
            lineLogin,
            fbLogin,
            email,
            password,
            submitHandler
        };
    }
};
</script>

<style lang="scss" scoped>
.login {
    display: flex;
    justify-content: center;
    &__member {
        display: flex;
        flex-direction: column;
    }
    &__social {
        display: flex;
        flex-direction: column;
    }
}
</style>
