<template>
    <PageHeader />
    <router-view :class="{ 'is-mobile': isMobile }" />
    <Subscription />
    <PageFooter />
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import MobileDetect from 'mobile-detect';
import PageHeader from '@/components/PageHeader.vue';
import Subscription from '@/components/Subscription.vue';
import PageFooter from '@/components/PageFooter.vue';
export default {
    name: 'App',
    components: {
        PageHeader,
        Subscription,
        PageFooter
    },
    setup () {
        const store = useStore();
        const mediaSensor = (minWidth, deviceType) => {
            const resizeWidth = pMatchMedia =>
                store.commit('setDeviceWidth', { deviceType, value: pMatchMedia.matches });
            const mm = window.matchMedia(`(min-width: ${minWidth}px)`);
            mm.addListener(resizeWidth);
            resizeWidth(mm);
        };
        const isMobile = computed(() => store.state.mobileDevice);
        onMounted(async () => {
            mediaSensor(768, 'tablet');
            store.commit('setMobileDevice', new MobileDetect(window.navigator.userAgent).mobile());
            await store.dispatch('getProductList');
            store.dispatch('getCartList');
        });
        return {
            isMobile
        };
    }
};
</script>

<style lang="scss">
@import '@/assets/sass/reset';
@import '@/assets/sass/common';

html,
body,
.app {
    height: 100%;
}
body {
    min-width: 375px;
}
.container {
    margin: 0 auto;
    padding: 0 30px;
    max-width: #{$content-width}px;
    // outline: 1px solid #f00;
    @media (min-width: #{$tablet-width + 1}px) {
        padding: 0 42px;
    }
}
</style>
