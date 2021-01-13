<template>
    <header>
        <div class="container">
            <label class="toggler" for="toggler-input" />
            <h1>
                <picture>
                    <source media="(min-width: 768px)" srcset="@/assets/images/logo.svg">
                    <img src="@/assets/images/logo-m.svg" alt="Sweetaste">
                </picture>
            </h1>
            <PageNav v-if="!tabletWidth" />
            <div v-show="!tabletWidth && avatarSrc" class="avatar">
                <img :src="avatarSrc" alt="">
            </div>
            <router-link :to="{ name: 'Cart' }" class="material-icons cart">
                shopping_cart
            </router-link>
        </div>
        <input id="toggler-input" v-model="showNav" type="checkbox">
        <PageNav v-if="tabletWidth" />
    </header>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import PageNav from '@/components/PageNav.vue';

export default {
    name: 'PageHeader',
    components: {
        PageNav
    },
    setup () {
        const store = useStore();
        const route = useRoute();

        const tabletWidth = computed(() => store.state.tabletWidth);
        const avatarSrc = computed(() => store.state.userProfile?.photoURL);

        // hide nav after change page
        const showNav = ref(false);
        watch(() => route.name, () => {
            if (showNav.value) {
                showNav.value = false;
            }
        });

        return {
            tabletWidth,
            avatarSrc,
            showNav
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.container {
    display: flex;
    min-height: 84px;
    justify-content: space-between;
    align-items: center;
}
.toggler {
    position: relative;
    width: 18px;
    height: 12px;
    background-image: linear-gradient(#3f5d45 20%, transparent 0, transparent 40%, #3f5d45 0, #3f5d45 60%, transparent 0, transparent 80%, #3f5d45 0);
    cursor: pointer;
    @media (min-width: #{$tablet-width + 1}px) {
        display: none;
    }
    &::before {
        @include clickable-area(18, 12);
        content: '';
    }
}
[type=checkbox] {
    display: none;
}
h1 {
    width: 114px;
    @media (min-width: #{$tablet-width + 1}px) {
        width: 220px;
    }
}
.avatar {
    overflow: hidden;
    margin-right: 60px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    flex-shrink: 0;
}
.cart {
    position: relative;
    color: $dark-color;
    &::before {
        @include clickable-area(24, 24);
        content: '';
    }
}
</style>
