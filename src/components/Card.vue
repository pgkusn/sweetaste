<template>
    <div class="card">
        <div class="card__img">
            <img :src="require(`@/assets/images/${props.info.url}`)" alt="">
            <div class="card__tag">
                {{ showCategory }}
            </div>
            <button class="card__favorite" @click="changeFavorite">
                <span class="material-icons">{{ favoriteIcon }}</span>
            </button>
        </div>
        <div class="card__text">
            <div class="card__text--name">
                {{ props.info.name }}
            </div>
            <div class="card__text--price">
                NT$ {{ props.info.price }}
            </div>
        </div>
        <button class="card__add" :disabled="checkCart" @click="addCart">
            加入購物車
        </button>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'Card',
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    setup (props) {
        const store = useStore();

        const showCategory = computed(() => store.getters.productCategoryList[props.info.category]);
        const cartList = computed(() => store.state.cartList);
        const checkCart = computed(() => cartList.value?.find(value => value.id === props.info.id));
        const addCart = () => {
            const newCartList = cloneDeep(cartList.value);
            newCartList.push({
                id: props.info.id,
                category: props.info.category,
                name: props.info.name,
                price: props.info.price,
                url: props.info.url,
                orderAmount: 1,
                stock: props.info.stock
            });
            store.dispatch('updateCartList', newCartList);
        };

        // 我的最愛
        const favoriteProducts = computed(() => store.state.favoriteProducts);
        const favoriteIndex = computed(() => favoriteProducts.value?.findIndex(item => item === props.info.id));
        const favoriteIcon = computed(() => favoriteIndex.value === -1 ? 'favorite_border' : 'favorite');
        const changeFavorite = () => {
            const newFavoriteProducts = cloneDeep(favoriteProducts.value);
            if (favoriteIndex.value === -1) {
                newFavoriteProducts.push(props.info.id);
            }
            else {
                newFavoriteProducts.splice(favoriteIndex.value, 1);
            }
            store.dispatch('updateFavoriteProducts', newFavoriteProducts);
        };

        return {
            props,
            showCategory,
            checkCart,
            addCart,
            favoriteProducts,
            favoriteIndex,
            favoriteIcon,
            changeFavorite
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.card {
    width: 315px;
    @media (min-width: 413px) {
        width: 300px;
    }
    &__img {
        position: relative;
        > img {
            width: 315px;
            height: 315px;
            object-fit: cover;
        }
    }
    &__tag {
        position: absolute;
        top: 0;
        left: 21px;
        padding: 15px 9px;
        background-color: $dark-color;
        color: $light-color;
        letter-spacing: 3px;
        writing-mode: vertical-rl;
    }
    &__favorite {
        position: absolute;
        top: 16px;
        right: 22px;
        color: $dark-color;
        &::before {
            @include clickable-area(24px, 24px);
            content: '';
        }
    }
    &__text {
        display: flex;
        border-right: 1px solid $light-color;
        border-left: 1px solid $light-color;
        color: $dark-color;
        text-align: center;
        font-size: 20px;
        line-height: 56px;
        &--name {
            width: percentage(183 / 315);
        }
        &--price {
            width: percentage(132 / 315);
            border-left: 1px solid $light-color;
        }
    }
    &__add {
        width: 100%;
        height: 65px;
        background-color: $light-color;
        color: $dark-color;
        font-size: 24px;
        transition: background-color .3s;
        &:disabled {
            opacity: .5;
            cursor: default;
        }
        @at-root {
            html:not(.mobile) .card__add:not(:disabled):hover {
                background-color: #d4e0da;
            }
        }
    }
}
</style>
