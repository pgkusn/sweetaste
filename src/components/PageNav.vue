<template>
    <div class="nav-container">
        <nav>
            <router-link :to="{ name: 'Home' }">
                首頁
            </router-link>
            <router-link :to="{ name: 'Product' }">
                甜點
            </router-link>
            <router-link :to="{ name: 'Login' }">
                登入
            </router-link>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'PageNav'
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
