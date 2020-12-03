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
            <PageNav v-if="tabletWidth" />
            <router-link :to="{ name: 'Cart' }" class="material-icons cart">
                shopping_cart
            </router-link>
        </div>
        <input id="toggler-input" type="checkbox">
        <PageNav v-if="!tabletWidth" />
    </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import PageNav from '@/components/PageNav.vue';
export default {
    name: 'PageHeader',
    components: {
        PageNav
    },
    setup () {
        const store = useStore();
        const tabletWidth = computed(() => store.state.tabletWidth);
        return {
            tabletWidth
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
.cart {
    position: relative;
    color: $dark-color;
    &::before {
        @include clickable-area(24, 24);
        content: '';
    }
}
</style>
