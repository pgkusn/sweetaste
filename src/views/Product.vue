<template>
    <main class="product">
        <div class="container">
            <div class="hero">
                <p class="hero__title">
                    想吃甜點——<br>是不需要理由的。
                </p>
                <img src="@/assets/images/product/hero.jpeg" alt="">
            </div>
            <div class="content">
                <div class="category">
                    <div class="category__title">
                        甜點類別
                    </div>
                    <div class="category__item">
                        所有甜點 ()
                    </div>
                    <div class="category__item">
                        本日精選 ()
                    </div>
                    <div class="category__item">
                        人氣推薦 ()
                    </div>
                    <div class="category__item">
                        新品上市 ()
                    </div>
                </div>
                <div class="list">
                    <Card
                        v-for="item in productList"
                        :key="item.id"
                        :pid="item.id"
                        :category="item.category"
                        :name="item.name"
                        :price="item.price"
                        :url="require(`@/assets/images/${item.url}`)"
                    />
                </div>
                <div class="pagination">
                    <button><span class="material-icons">arrow_left</span></button>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button><span class="material-icons">arrow_right</span></button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Card from '@/components/Card.vue';
export default {
    name: 'Product',
    components: {
        Card
    },
    setup () {
        const store = useStore();
        const productList = computed(() => store.state.productList);
        return {
            productList
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.container {
    padding: 0;
    @media (min-width: #{$tablet-width + 1}px) {
        padding: 0 42px;
    }
}
.hero {
    position: relative;
    &__title {
        position: absolute;
        top: 0;
        right: 30px;
        bottom: 0;
        margin: auto 0;
        padding-top: .5em;
        width: 60px;
        height: 211px;
        color: #2c4832;
        text-indent: -.5em;
        letter-spacing: 3px;
        font-size: 22px;
        line-height: 1.5;
        writing-mode: vertical-rl;
        @media (min-width: #{$tablet-width + 1}px) {
            top: 40px;
            right: 82px;
            bottom: auto;
            height: 330px;
            font-size: 36px;
        }
    }
    img {
        width: 100%;
    }
}
.content {
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    flex-wrap: wrap;
    @media (min-width: #{$tablet-width + 1}px) {
        flex-direction: row;
        padding-top: 60px;
        padding-bottom: 60px;
    }
}
.category {
    text-align: center;
    font-size: 24px;
    line-height: 65px;
    @media (min-width: #{$tablet-width + 1}px) {
        width: 300px;
    }
    &__title {
        background-color: $dark-color;
        color: #fff;
    }
    &__item {
        border-bottom: 1px solid $light-color;
        color: $dark-color;
        cursor: pointer;
        @media (min-width: #{$tablet-width + 1}px) {
            border-right: 1px solid #eaf0ed;
            border-left: 1px solid #eaf0ed;
        }
        @at-root {
            :not(.is-mobile) .category__item:hover {
                background-color: $light-color;
            }
        }
        &.active {
            background-color: $light-color;
        }
    }
}
.list {
    display: flex;
    padding: 15px;
    flex-wrap: wrap;
    justify-content: center;
    @media (min-width: #{$tablet-width + 1}px) {
        margin: -10px -10px -10px 10px;
        padding: 0;
        width: calc(100% - 300px);
        justify-content: start;
    }
}
.card {
    margin: 10px;
}
.pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    @media (min-width: #{$tablet-width + 1}px) {
        margin: 30px 0 0 auto;
    }
    > button {
        width: 60px;
        height: 60px;
        border-width: 1px 0 1px 1px;
        border-style: solid;
        border-color: $light-color;
        color: $dark-color;
        font-size: 20px;
        &:last-child {
            border-right-width: 1px;
        }
        &.active {
            background-color: $dark-color;
            color: $light-color;
        }
        @at-root {
            :not(.is-mobile) .pagination > button:not(.active):hover {
                background-color: $light-color;
            }
        }
    }
}
</style>
