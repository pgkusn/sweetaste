<template>
    <div class="login">
        <h2 class="login__title">
            會員登入
        </h2>
        <div class="login__social">
            <h2 class="login__social--title">
                連結社群帳號
            </h2>
            <button @click="googleLogin">
                Google
            </button>
            <button @click="fbLogin">
                Facebook
            </button>
            <button @click="lineLogin">
                LINE
            </button>
        </div>
        <form class="login__user" @submit.prevent="submitHandler">
            <div class="login__user--fields">
                <div class="login__user--email">
                    <span class="material-icons">person</span>
                    <input
                        v-model="email"
                        type="text"
                        placeholder="電子信箱/手機號碼"
                        required
                    >
                </div>
                <div class="login__user--password">
                    <span class="material-icons">vpn_key</span>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="請輸入使用者密碼"
                        required
                    >
                </div>
                <label class="login__user--remember"><input v-model="rememberMe" type="checkbox">記住我</label>
            </div>
            <input type="submit" class="login__user--submit" value="登入帳號">
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'Login',
    setup () {
        const store = useStore();
        const router = useRouter();

        // check login
        if (store.state.userProfile) {
            router.push({ name: 'Home' });
        }

        // =============================================================================
        // google login
        // =============================================================================
        const googleLogin = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    const { displayName, email, photoURL } = result.user;
                    const userProfile = {
                        displayName,
                        email,
                        photoURL
                    };
                    store.commit('setUserProfile', userProfile);
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));

                    const beforeLoginPage = localStorage.getItem('beforeLoginPage') || 'Home';
                    router.push({ name: beforeLoginPage });
                    localStorage.removeItem('beforeLoginPage');
                })
                .catch(error => console.error(error.message));
        };

        // =============================================================================
        // fb login
        // =============================================================================
        const fbLogin = () => {
            /* eslint-disable no-undef */
            const getStatus = res => {
                if (res.status !== 'connected') {
                    FB.login(getStatus);
                    return;
                }
                // get user profile
                FB.api('/me', 'GET', { fields: ['picture', 'name', 'email'] }, res => {
                    const userProfile = {
                        displayName: res.name,
                        email: res.email,
                        photoURL: res.picture.data.url
                    };
                    store.commit('setUserProfile', userProfile);
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));

                    const beforeLoginPage = localStorage.getItem('beforeLoginPage') || 'Home';
                    router.push({ name: beforeLoginPage });
                    localStorage.removeItem('beforeLoginPage');
                });
            };
            FB.getLoginStatus(getStatus);
        };

        // =============================================================================
        // line login
        // =============================================================================
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

        // =============================================================================
        // user login
        // =============================================================================
        const email = ref('');
        const password = ref('');
        const rememberMe = ref(false);

        // 記住我
        if (Cookies.get('userLoginInfo')) {
            const userLoginInfo = JSON.parse(Cookies.get('userLoginInfo'));
            email.value = userLoginInfo.email;
            password.value = userLoginInfo.password;
            rememberMe.value = true;
        }

        const submitHandler = async () => {
            const data = await store.dispatch('userLogin', {
                email: email.value.trim(),
                password: password.value.trim()
            });

            if (!data) return;

            // 記住我
            if (rememberMe.value) {
                Cookies.set('userLoginInfo', JSON.stringify({ email: email.value, password: password.value }, { expires: 7 }));
            }
            else {
                Cookies.remove('userLoginInfo');
            }

            store.commit('setUserProfile', { displayName: data.displayName });
            localStorage.setItem('userProfile', JSON.stringify(data));

            const beforeLoginPage = localStorage.getItem('beforeLoginPage') || 'Home';
            router.push({ name: beforeLoginPage });
            localStorage.removeItem('beforeLoginPage');
        };

        return {
            googleLogin,
            fbLogin,
            lineLogin,
            email,
            password,
            rememberMe,
            submitHandler
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.login {
    display: grid;
    margin: 46px auto 60px;
    max-width: 780px;
    grid-template: 'title'
    'social'
    'user';
    grid-template-rows: repeat(auto, 4);
    grid-template-columns: repeat(auto, 4);
    @media (min-width: #{$tablet-width + 1}px) {
        grid-template: 'title social'
        'user social';
        grid-template-rows: repeat(auto, 2);
        grid-template-columns: repeat(1fr, 2);
    }
    &__title {
        background-color: $dark-color;
        color: $light-color;
        text-align: center;
        font-size: 36px;
        line-height: 110px;
        grid-area: title;
        @media (min-width: #{$tablet-width + 1}px) {
            line-height: 130px;
        }
    }
    &__social {
        display: flex;
        padding: 30px;
        background: $light-color;
        grid-area: social;
        @media (min-width: #{$tablet-width + 1}px) {
            flex-direction: column;
            margin: 15px 0;
            padding: 40px 30px;
            align-items: center;
        }
        &--title {
            display: none;
            @media (min-width: #{$tablet-width + 1}px) {
                display: flex;
                margin-bottom: 36px;
                color: #8da291;
                font-size: 24px;
                align-items: center;
                &::before,
                &::after {
                    width: 2em;
                    height: 1px;
                    background-color: #8da291;
                    content: '';
                }
                &::before {
                    margin-right: 5px;
                }
                &::after {
                    margin-left: 5px;
                }
            }
        }
        > button {
            background-color: #fff;
            color: #8da291;
            text-align: center;
            font-size: 20px;
            line-height: 56px;
            flex-grow: 1;
            @media (min-width: #{$tablet-width + 1}px) {
                width: 100%;
                flex-grow: 0;
            }
            + button {
                margin-left: 1px;
                @media (min-width: #{$tablet-width + 1}px) {
                    margin-top: 16px;
                    margin-left: 0;
                }
            }
        }
    }
    &__user {
        background-color: $dark-color;
        grid-area: user;
        &--fields {
            display: flex;
            flex-direction: column;
            padding: 30px;
            @media (min-width: #{$tablet-width + 1}px) {
                padding: 0 30px 25px;
            }
        }
        &--email,
        &--password {
            position: relative;
            background-color: $light-color;
            > span {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 20px;
                margin: auto 0;
                width: 24px;
                height: 24px;
                color: $dark-color;
            }
            > input {
                padding: 0 20px 0 64px;
                width: 100%;
                border: none;
                color: #8da291;
                font-size: 16px;
                line-height: 56px;
            }
        }
        &--password {
            margin-top: 16px;
        }
        &--remember {
            display: flex;
            margin-top: 16px;
            color: #fff;
            align-items: center;
            > [type=checkbox] {
                margin: 0 8px 0 0;
                width: 16px;
                height: 16px;
                border: none;
            }
        }
        &--submit {
            width: 100%;
            border: none;
            background-color: #ffe180;
            color: $dark-color;
            text-align: center;
            font-size: 24px;
            line-height: 65px;
        }
    }
}
</style>
