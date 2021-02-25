<template>
    <main :class="['cart', { 'no-product': !cartList?.length }]">
        <div v-if="cartList" class="container">
            <div class="col">
                <h2 class="title">
                    {{ cartList.length ? '您的購物車' : '購物車內無商品' }}
                </h2>
                <div v-for="item in cartList" :key="item.id" class="list">
                    <div class="list__img">
                        <img :src="require(`@/assets/images/${item.url}`)" alt="">
                    </div>
                    <div class="list__detail">
                        <div class="list__name">
                            {{ item.name }}
                        </div>
                        <div class="list__price">
                            NT$ {{ item.price }}
                        </div>
                    </div>
                    <div class="list__amount">
                        <button @click="minusCart(item.id)">
                            -
                        </button>
                        <input type="text" :value="item.orderAmount" @change="changeCart(item.id)">
                        <button @click="addCart(item.id)">
                            +
                        </button>
                    </div>
                    <div class="list__total">
                        NT$ {{ item.price * item.orderAmount }}
                    </div>
                    <button class="list__delete material-icons" @click="removeCart(item.id)">
                        delete_outline
                    </button>
                </div>
            </div>
            <div v-if="cartList.length" class="col">
                <div class="summary">
                    <div class="summary__content">
                        <h2 class="summary__content--title">
                            訂單摘要
                        </h2>
                        <dl class="summary__content--detail">
                            <dt>小計</dt>
                            <dd>NT$ {{ subtotal }}</dd>
                            <dt>運費</dt>
                            <dd>NT$ {{ shipping }}</dd>
                            <dt>總計</dt>
                            <dd>NT$ {{ total }}</dd>
                        </dl>
                    </div>
                    <button class="summary__checkout" @click="checkout">
                        結帳
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'Cart',
    setup () {
        const store = useStore();
        const router = useRouter();
        const cartList = computed(() => store.state.cart.cartList);

        // 訂單摘要
        const shipping = 300;
        const subtotal = computed(() => cartList.value.reduce((prev, current) => prev + current.price * current.orderAmount, 0));
        const total = computed(() => subtotal.value + shipping);

        const addCart = id => {
            const { orderAmount, stock } = cartList.value.find(value => value.id === id);
            if (orderAmount + 1 <= stock) {
                store.dispatch('cart/updateCartList', { id, num: orderAmount + 1 });
            }
        };
        const minusCart = id => {
            const { orderAmount } = cartList.value.find(value => value.id === id);
            if (orderAmount - 1 > 0) {
                store.dispatch('cart/updateCartList', { id, num: orderAmount - 1 });
            }
        };
        const changeCart = id => {
            const value = parseInt(event.target.value.trim(), 10);
            const { stock } = cartList.value.find(value => value.id === id);
            const num = value > 0 ? value <= stock ? value : stock : 1;
            store.dispatch('cart/updateCartList', { id, num });
        };
        const removeCart = id => {
            store.dispatch('cart/removeCartList', id);
        };
        const checkout = () => {
            router.push({ name: 'Ship' });
        };

        return {
            cartList,
            subtotal,
            shipping,
            total,
            addCart,
            minusCart,
            changeCart,
            removeCart,
            checkout
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.cart {
    color: $dark-color;
    @media (min-width: #{$tablet-width + 1}px) {
        margin-top: 46px;
        padding-bottom: 60px;
    }
    &.no-product {
        @media (min-width: #{$tablet-width + 1}px) {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
.container {
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;
    @media (min-width: #{$tablet-width + 1}px) {
        flex-direction: row;
        padding: 0 42px;
        align-items: flex-start;
    }
    @at-root {
        .cart.no-product > .container {
            width: 100%;
        }
    }
}
.col {
    &:nth-child(1) {
        width: 100%;
        @media (min-width: #{$tablet-width + 1}px) {
            flex-grow: 1;
        }
    }
    &:nth-child(2) {
        width: 100%;
        @media (min-width: #{$tablet-width + 1}px) {
            padding-left: 20px;
            width: 320px;
            flex-shrink: 0;
        }
    }
}
.title {
    background-color: $light-color;
    text-align: center;
    font-size: 24px;
    line-height: 65px;
}
.list {
    $breakpoint: 1000;
    @extend %clearfix;
    position: relative;
    margin-top: 30px;
    padding: 0 30px;
    @media (min-width: #{$tablet-width + 1}px) {
        padding: 0;
    }
    @media (min-width: #{$breakpoint + 1}px) {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    & + .list {
        margin-top: 30px;
        @media (min-width: #{$breakpoint + 1}px) {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid $light-color;
        }
    }
    &__img {
        float: left;
        margin-right: 1rem;
        margin-bottom: 10px;
        @media (min-width: #{$breakpoint + 1}px) {
            float: none;
            margin-right: 0;
            margin-bottom: 0;
        }
    }
    img {
        width: 153px;
        height: 106px;
        object-fit: cover;
        @media (min-width: #{$tablet-width + 1}px) {
            width: 110px;
            height: 110px;
        }
    }
    &__name {
        margin-bottom: 11px;
        font-size: 20px;
        @media (min-width: #{$breakpoint + 1}px) {
            margin-bottom: .5em;
        }
    }
    &__price {
        margin-bottom: 11px;
        @media (min-width: #{$breakpoint + 1}px) {
            margin-bottom: 0;
        }
    }
    &__amount {
        display: inline-flex;
        height: 48px;
        border: 1px solid $light-color;
        > button,
        > [type=text] {
            width: 48px;
            font-size: 16px;
            &:focus {
                outline: none;
            }
        }
        > button {
            color: $dark-color;
            @at-root {
                html:not(.mobile) .list__amount > button:hover {
                    background-color: $light-color;
                }
            }
        }
        > [type=text] {
            padding: 0;
            border-width: 0 1px;
            border-style: solid;
            border-color: $light-color;
            color: $dark-color;
            text-align: center;
        }
    }
    &__total {
        clear: both;
        border-width: 1px 0;
        border-style: solid;
        border-color: $light-color;
        text-align: right;
        font-size: 20px;
        line-height: 45px;
        @media (min-width: #{$breakpoint + 1}px) {
            border-width: 0;
        }
    }
    &__delete {
        position: absolute;
        top: 0;
        right: 30px;
        color: $dark-color;
        @media (min-width: #{$tablet-width + 1}px) {
            right: 0;
        }
        @media (min-width: #{$breakpoint + 1}px) {
            position: relative;
        }
        &::before {
            @include clickable-area(24px, 24px);
        }
    }
}
.summary {
    margin: 30px auto 0;
    @media (min-width: #{$tablet-width + 1}px) {
        margin-top: 0;
    }
    &__content {
        margin: 0 auto;
        padding: 0 30px;
        width: 375px;
        @media (min-width: #{$tablet-width + 1}px) {
            padding: 0 20px;
            width: 100%;
            background-color: $dark-color;
            color: #fff;
        }
        &--title {
            border-bottom: 1px solid #fff;
            background-color: $light-color;
            text-align: center;
            font-size: 24px;
            line-height: 65px;
            @media (min-width: #{$tablet-width + 1}px) {
                background-color: transparent;
            }
        }
        &--detail {
            display: flex;
            flex-wrap: wrap;
            > dt {
                width: 42px;
                &:first-of-type {
                    margin: 1rem 0 8px;
                }
                &:last-of-type {
                    margin: 1rem 0;
                    font-size: 20px;
                }
            }
            > dd {
                width: calc(100% - 42px);
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
    }
    &__checkout {
        width: 100%;
        background-color: #ffe180;
        color: $dark-color;
        text-align: center;
        font-size: 24px;
        line-height: 65px;
    }
}
</style>
