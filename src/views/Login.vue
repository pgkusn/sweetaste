<template>
    <main class="login">
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
        <form class="login__user" @submit.prevent="userLogin">
            <div class="login__user--fields">
                <div class="login__user--email">
                    <span class="material-icons">person</span>
                    <input
                        v-model="loginInfo.email"
                        type="text"
                        placeholder="電子信箱/手機號碼"
                        required
                    >
                </div>
                <div class="login__user--password">
                    <span class="material-icons">vpn_key</span>
                    <input
                        v-model="loginInfo.password"
                        type="password"
                        placeholder="請輸入使用者密碼"
                        required
                    >
                </div>
                <div class="login__user--remember">
                    <div class="pretty p-default">
                        <input v-model="loginInfo.rememberMe" type="checkbox">
                        <div class="state">
                            <label>記住我</label>
                        </div>
                    </div>
                    <router-link :to="{ name: 'SignUp' }">
                        註冊
                    </router-link>
                </div>
            </div>
            <input type="submit" class="login__user--submit" value="登入帳號">
        </form>
    </main>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'Login',
    beforeRouteLeave (to, from, next) {
        sessionStorage.removeItem('beforeLoginPage');
        next();
    },
    setup () {
        const store = useStore();
        const router = useRouter();

        // =============================================================================
        // google login
        // =============================================================================
        const googleLogin = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    const { uid, displayName, email, photoURL } = result.user;
                    const userProfile = {
                        uid,
                        displayName,
                        email,
                        photoURL
                    };
                    store.commit('login/setUserProfile', userProfile);
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));

                    const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
                    router.push({ name: beforeLoginPage });
                    sessionStorage.removeItem('beforeLoginPage');
                })
                .catch(error => console.error(error.message));
        };

        // =============================================================================
        // fb login
        // =============================================================================
        const fbLogin = () => {
            /* eslint-disable no-undef */
            const getStatus = res => {
                if (res.status === 'connected') {
                    // get user profile
                    FB.api('/me', 'GET', { fields: ['picture', 'name', 'email'] }, res => {
                        const userProfile = {
                            uid: res.id,
                            displayName: res.name,
                            email: res.email,
                            photoURL: res.picture.data.url
                        };
                        store.commit('login/setUserProfile', userProfile);
                        localStorage.setItem('userProfile', JSON.stringify(userProfile));

                        const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
                        router.push({ name: beforeLoginPage });
                        sessionStorage.removeItem('beforeLoginPage');
                    });
                }
            };
            FB.login(getStatus);
        };

        // =============================================================================
        // line login
        // =============================================================================
        const lineLogin = () => {
            const { channelID, callbackURL, state } = store.getters['login/lineInfo'];
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
        const loginInfo = reactive({
            email: '',
            password: '',
            rememberMe: false
        });

        // 記住我
        if (Cookies.get('userLoginInfo')) {
            const userLoginInfo = JSON.parse(Cookies.get('userLoginInfo'));
            loginInfo.email = userLoginInfo.email;
            loginInfo.password = userLoginInfo.password;
            loginInfo.rememberMe = true;
        }

        const userLogin = async () => {
            const data = await store.dispatch('login/userLogin', {
                email: loginInfo.email.trim(),
                password: loginInfo.password.trim()
            });

            if (!data.success) {
                alertify.error(data.message);
                return;
            }

            alertify.success('登入成功');

            // 記住我
            if (loginInfo.rememberMe) {
                Cookies.set('userLoginInfo', JSON.stringify({ email: loginInfo.email, password: loginInfo.password }, { expires: 7 }));
            }
            else {
                Cookies.remove('userLoginInfo');
            }

            const { localId: uid, displayName, email } = data;
            const userProfile = {
                uid,
                displayName,
                email
            };
            store.commit('login/setUserProfile', userProfile);
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            const beforeLoginPage = sessionStorage.getItem('beforeLoginPage') || 'Home';
            router.push({ name: beforeLoginPage });
            sessionStorage.removeItem('beforeLoginPage');
        };

        return {
            googleLogin,
            fbLogin,
            lineLogin,
            loginInfo,
            userLogin
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
@import '~pretty-checkbox/src/pretty-checkbox.scss';

.login {
    display: grid;
    margin: 0 auto;
    max-width: 780px;
    grid-template: 'title'
    'social'
    'user';
    grid-template-rows: repeat(4, auto);
    grid-template-columns: auto;
    @media (min-width: #{$tablet-width + 1}px) {
        margin-top: 46px;
        margin-bottom: 60px;
        grid-template: 'title social'
        'user social';
        grid-template-rows: repeat(2, auto);
        grid-template-columns: repeat(2, 1fr);
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
            align-items: flex-start;
            @media (min-width: #{$tablet-width + 1}px) {
                padding: 0 30px 25px;
            }
        }
        &--email,
        &--password {
            position: relative;
            width: 100%;
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
            > a {
                color: #fff;
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
            cursor: pointer;
        }
    }
}
</style>