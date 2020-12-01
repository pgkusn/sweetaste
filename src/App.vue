<template>
    <PageHeader />
    <router-view />
    <PageFooter />
</template>

<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex';
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';
export default {
    name: 'App',
    components: {
        PageHeader,
        PageFooter
    },
    setup () {
        const store = useStore();
        const mediaSensor = (minWidth, deviceType) => {
            const resizeWidth = pMatchMedia =>
                store.commit('updateDevice', { deviceType, value: pMatchMedia.matches });
            const mm = window.matchMedia(`(max-width: ${minWidth}px)`);
            mm.addListener(resizeWidth);
            resizeWidth(mm);
        };
        onMounted(() => {
            mediaSensor(768, 'tablet');
        });
        return {

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
    @media (min-width: #{$tablet-width + 1}px) {
        padding: 0 42px;
    }
}
</style>
