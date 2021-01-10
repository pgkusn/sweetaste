<template>
    <main class="checkout">
        <div class="col">
            <router-view />
        </div>
        <div class="col">
            <div class="summary">
                <h2>
                    訂單摘要
                </h2>
                <dl class="summary__detail">
                    <dt>小計</dt>
                    <dd>NT$ {{ subtotal }}</dd>
                    <dt>運費</dt>
                    <dd>NT$ {{ shipping }}</dd>
                    <dt>總計</dt>
                    <dd>NT$ {{ total }}</dd>
                </dl>
            </div>
            <div class="list">
                <h2>
                    購物清單
                </h2>
                <ul class="list__content">
                    <li v-for="item in cartList" :key="item.id">
                        <div class="list__content--img">
                            <img :src="require(`@/assets/images/${item.url}`)" alt="">
                        </div>
                        <div class="list__content--text">
                            <p>{{ item.name }} ({{ item.orderAmount }})</p>
                            <p>NT$ {{ item.price }}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script>
import { computed, onBeforeUnmount, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'Checkout',
    setup () {
        const store = useStore();
        const router = useRouter();
        const cartList = computed(() => store.state.cartList);

        // check cart
        if (!cartList.value?.length) {
            router.push({ name: 'Home' });
            return;
        }

        // 訂單摘要
        const shipping = 300;
        const subtotal = computed(() => cartList.value.reduce((prev, current) => prev + current.price * current.orderAmount, 0));
        const total = computed(() => subtotal.value + shipping);

        // 離開頁面提示框
        const beforeunloadHandler = () => {
            event.preventDefault();
            event.returnValue = '';
        };
        onMounted(() => {
            window.addEventListener('beforeunload', beforeunloadHandler);
        });
        onBeforeUnmount(() => {
            window.removeEventListener('beforeunload', beforeunloadHandler);
        });

        return {
            cartList,
            subtotal,
            shipping,
            total
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
$font-color: #8da291;
.checkout {
    @media (min-width: #{$tablet-width + 1}px) {
        display: flex;
        margin: 46px 0 65px;
        justify-content: center;
    }
}
.col {
    &:nth-child(1) {
        width: 100%;
        @media (min-width: #{$tablet-width + 1}px) {
            width: 460px;
        }
    }
    &:nth-child(2) {
        display: none;
        @media (min-width: #{$tablet-width + 1}px) {
            display: block;
            margin-left: 20px;
            width: 300px;
        }
        h2 {
            background: $light-color;
            color: $font-color;
            text-align: center;
            font-size: 24px;
            line-height: 65px;
        }
    }
}
.summary__detail {
    display: flex;
    padding: 0 20px;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: $light-color;
    color: $font-color;
    flex-wrap: wrap;
    > dt {
        width: 41px;
        &:first-of-type {
            margin: 1rem 0 8px;
        }
        &:last-of-type {
            margin: 1rem 0;
            font-size: 20px;
        }
    }
    > dd {
        width: calc(100% - 41px);
        text-align: right;
        &:first-of-type {
            margin: 1rem 0 8px;
        }
        &:last-of-type {
            margin: 1rem 0;
            font-size: 20px;
        }
    }
}
.list {
    margin-top: 20px;
    &__content {
        padding: 16px 20px;
        border-width: 0 1px 1px 1px;
        border-style: solid;
        border-color: $light-color;
        color: $font-color;
        > li {
            display: flex;
            align-items: center;
            + li {
                margin-top: 16px;
            }
        }
        img {
            width: 120px;
            height: 80px;
            object-fit: cover;
        }
        &--text {
            margin-left: 20px;
            > p:last-child {
                margin-top: 10px;
                font-size: 20px;
            }
        }
    }
}
.ship,
.payment,
.invoice {
    color: $light-color;
    /deep/  {
        .content {
            padding: 30px;
            background-color: $dark-color;
        }
        table {
            width: 100%;
        }
        .title {
            text-align: left;
            font-size: 36px;
        }
        .bar {
            vertical-align: middle;
            text-align: right;
        }
        label {
            font-size: 20px;
            line-height: 2;
        }
        [type=text] {
            padding: 0 20px;
            width: 100%;
            height: 56px;
            border: none;
            background-color: $light-color;
            color: #8da291;
        }
        select {
            padding-left: 20px;
            width: 100%;
            height: 56px;
            background-color: $light-color;
            color: #8da291;
            font-size: 16px;
            appearance: none;
        }
        .select {
            position: relative;
            &::before,
            &::after {
                position: absolute;
                right: 30px;
                width: 0;
                height: 0;
                border-style: solid;
                content: '';
            }
            &::before {
                top: 35%;
                border-width: 0 4px 6.9px 4px;
                border-color: transparent transparent $dark-color transparent;
            }
            &::after {
                top: 52%;
                border-width: 6.9px 4px 0 4px;
                border-color: $dark-color transparent transparent transparent;
            }
        }
        .next {
            width: 100%;
            background-color: #ffe180;
            color: $dark-color;
            text-align: center;
            font-size: 24px;
            line-height: 65px;
        }
        .pb-30 {
            padding-bottom: 30px;
        }
        .pb-20 {
            padding-bottom: 20px;
        }
        .pr-5 {
            padding-right: 5px;
        }
        .pl-5 {
            padding-left: 5px;
        }
        .pt-20 {
            padding-top: 20px;
        }
        .pt-10 {
            padding-top: 10px;
        }
        .pt-8 {
            padding-top: 8px;
        }
        .w-50 {
            width: 50%;
        }
    }
}
</style>
