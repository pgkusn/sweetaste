<template>
    <main class="signup">
        <h2 class="signup__title">
            會員註冊
        </h2>
        <form class="signup__user" @submit.prevent="submitHandler">
            <div class="signup__user--fields">
                <div class="signup__user--email">
                    <span class="material-icons">person</span>
                    <input
                        v-model="email"
                        type="text"
                        placeholder="電子信箱/手機號碼"
                        required
                    >
                </div>
                <div class="signup__user--password">
                    <span class="material-icons">vpn_key</span>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="請輸入使用者密碼"
                        required
                    >
                </div>
                <div class="signup__user--password">
                    <span class="material-icons">vpn_key</span>
                    <input
                        v-model="confirmPassword"
                        type="password"
                        placeholder="請確認使用者密碼"
                        required
                    >
                </div>
            </div>
            <input type="submit" class="signup__user--submit" value="註冊帳號">
        </form>
    </main>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    name: 'SignUp',
    setup () {
        const store = useStore();
        const router = useRouter();

        const email = ref('');
        const password = ref('');
        const confirmPassword = ref('');

        const submitHandler = async () => {
            if (password.value !== confirmPassword.value) {
                alertify.error('密碼不一致');
                return;
            }

            const data = await store.dispatch('login/userSignUp', {
                email: email.value,
                password: password.value
            });
            if (!data.success) {
                alertify.error(data.message);
            }
            else {
                alertify.success('註冊成功');
                router.push({ name: 'Login' });
            }
        };

        return {
            email,
            password,
            confirmPassword,
            submitHandler
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
@import '~pretty-checkbox/src/pretty-checkbox.scss';

.signup {
    margin: 0 auto;
    @media (min-width: #{$tablet-width + 1}px) {
        margin-top: 46px;
        margin-bottom: 60px;
        max-width: 390px;
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
    &__user {
        background-color: $dark-color;
        grid-area: user;
        &--fields {
            display: flex;
            flex-direction: column;
            padding: 0 30px 30px 30px;
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
