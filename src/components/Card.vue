<template>
    <div class="card">
        <div class="card__img">
            <img :src="props.url" alt="">
            <div class="card__tag">
                {{ showCategory }}
            </div>
            <button class="card__favorite">
                <span class="material-icons">favorite_border</span>
            </button>
        </div>
        <div class="card__text">
            <div class="card__text--name">
                {{ props.name }}
            </div>
            <div class="card__text--price">
                NT$ {{ props.price }}
            </div>
        </div>
        <button class="card__add" @click="addCart(props.pid)">
            加入購物車
        </button>
    </div>
</template>

<script>
import { computed } from 'vue';
export default {
    name: 'Card',
    props: {
        pid: {
            type: Number,
            default: 0
        },
        category: {
            type: String,
            default: ''
        },
        url: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            default: 0
        }
    },
    setup (props) {
        const showCategory = computed(() => {
            const categoryMap = {
                today: '本日精選',
                popular: '人氣推薦',
                new: '新品上市'
            };
            return categoryMap[props.category];
        });
        const addCart = id => {
            console.log(id);
        };
        return {
            props,
            showCategory,
            addCart
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
        @at-root {
            :not(.is-mobile) .card__add:hover {
                background-color: #d4e0da;
            }
        }
    }
}
</style>
