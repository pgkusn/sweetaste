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
export default {
    name: 'PageNav',
    setup () {
        const store = useStore();

        // check line login
        const lineProfile = localStorage.getItem('lineProfile');
        if (lineProfile) {
            store.commit('setLineProfile', lineProfile);
        }
        const isLogin = computed(() => store.state.lineProfile);

        const logout = () => {
            store.commit('setLineProfile', null);
            localStorage.removeItem('lineProfile');
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
        padding-right: 70px;
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
