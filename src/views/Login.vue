<template>
    <button @click="lineLogin">
        LINE LOGIN
    </button>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: 'Login',
    setup () {
        const store = useStore();
        const router = useRouter();

        // check line login
        if (store.state.lineProfile) {
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

        return {
            lineLogin
        };
    }
};
</script>

<style>

</style>
