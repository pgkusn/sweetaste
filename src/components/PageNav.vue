<template>
    <div class="nav-container">
        <nav>
            <router-link :to="{ name: 'Home' }">
                首頁
            </router-link>
            <router-link :to="{ name: 'Product' }">
                甜點
            </router-link>
            <router-link v-if="!isLogin" :to="{ name: 'Login' }">
                登入
            </router-link>
            <a v-else href @click.prevent="logout">登出</a>
        </nav>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'PageNav',
    setup () {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();

        // check login
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            store.commit('setUserProfile', JSON.parse(userProfile));
        }
        const isLogin = computed(() => store.state.userProfile);

        // logout
        const logout = () => {
            if (store.state.userProfile) {
                store.commit('setUserProfile', null);
                localStorage.removeItem('userProfile');

                if (route.fullPath.split('/').includes('checkout')) {
                    router.replace({ name: 'Home' });
                }
            }
        };

        return {
            isLogin,
            logout
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.nav-container {
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: height .3s;
    @media (min-width: #{$tablet-width + 1}px) {
        height: auto;
    }
    @at-root {
        :checked + .nav-container {
            height: 160px;
        }
    }
}
nav {
    padding-bottom: 1rem;
    @media (min-width: #{$tablet-width + 1}px) {
        display: flex;
        padding-right: 50px;
        padding-bottom: 0;
        justify-content: flex-end;
        align-items: center;
    }
    > a {
        display: block;
        padding: 1rem 0;
        color: $dark-color;
        text-align: center;
        @media (min-width: #{$tablet-width + 1}px) {
            padding: 10px;
            + a {
                margin-left: 40px;
            }
        }
    }
}
</style>
