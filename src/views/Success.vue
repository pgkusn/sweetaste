<template>
    <main class="success">
        <div class="container">
            <div class="content" style="background-image: url(images/hero-success.jpeg)">
                <Progress :now="4" />
                <h2>付款成功</h2>
            </div>
            <button class="next" @click="next">
                查看訂單
            </button>
        </div>
    </main>
</template>

<script>
import { useRouter } from 'vue-router';
import Progress from '@/components/Progress.vue';

export default {
    name: 'Success',
    components: {
        Progress
    },
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const router = useRouter();
        const next = () => {
            router.replace({ name: 'Order', params: { id: props.id } });
        };
        return {
            next
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.container {
    padding: 0;
    @media (min-width: #{$tablet-width + 1}px) {
        position: relative;
        padding: 0 42px 60px;
    }
}
.content {
    display: flex;
    flex-direction: column;
    height: 518px;
    background-position: 50%;
    background-size: cover;
    justify-content: center;
    align-items: center;
    @media (min-width: #{$tablet-width + 1}px) {
        padding-top: 135px;
        height: 460px;
        justify-content: flex-start;
    }
}
h2 {
    margin-top: 30px;
    color: $dark-color;
    font-size: 3rem;
}
.next {
    width: 100%;
    background-color: #ffe180;
    color: $dark-color;
    text-align: center;
    font-size: 24px;
    line-height: 65px;
    @media (min-width: #{$tablet-width + 1}px) {
        position: absolute;
        top: 280px;
        left: 50%;
        width: 300px;
        transform: translate(-50%);
    }
}
</style>
