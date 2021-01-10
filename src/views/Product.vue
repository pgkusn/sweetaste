<template>
    <main class="product">
        <div class="container">
            <div class="hero">
                <p class="hero__title">
                    想吃甜點——<br>是不需要理由的。
                </p>
                <img src="images/hero-product.jpeg" alt="">
            </div>
            <div ref="contentRef" class="content">
                <div class="category">
                    <div class="category__title">
                        甜點類別
                    </div>
                    <div :class="['category__item', { active: showList === 'all' }]" @click="changeCategory('all')">
                        所有甜點 ({{ getCategoryList('all').length }})
                    </div>
                    <div
                        v-for="(value, name) in categoryList"
                        :key="name"
                        :class="['category__item', { active: showList === name }]"
                        @click="changeCategory(name)"
                    >
                        {{ value }} ({{ getCategoryList(name).length }})
                    </div>
                </div>
                <div class="list">
                    <Card v-for="item in currentList" :key="item.id" :info="item" />
                </div>
                <div v-if="totalPage > 1" class="pagination">
                    <button v-if="currentPage > 1" @click="currentPage--">
                        <span class="material-icons">arrow_left</span>
                    </button>
                    <button
                        v-for="n in totalPage"
                        :key="n"
                        :class="{ active: n === currentPage }"
                        @click="currentPage = n"
                    >
                        {{ n }}
                    </button>
                    <button v-if="currentPage < totalPage" @click="currentPage++">
                        <span class="material-icons">arrow_right</span>
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Card from '@/components/Card.vue';

export default {
    name: 'Product',
    components: {
        Card
    },
    props: {
        cate: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const store = useStore();
        const router = useRouter();

        const tabletWidth = computed(() => store.state.tabletWidth);
        const contentRef = ref(null);
        const categoryList = computed(() => store.getters.productCategoryList);
        const showList = ref(props.cate || 'all');
        router.replace({ name: 'Product' }); // remove queryString from home
        const productList = computed(() => getCategoryList(showList.value));
        const getCategoryList = category => (category === 'all' ? store.state.productList : store.state.productList.filter(value => value.category === category));
        const changeCategory = category => {
            currentPage.value = 1;
            showList.value = category;
        };

        // 分頁顯示
        const perPage = 4;
        const currentPage = ref(1);
        const totalPage = computed(() => Math.ceil(productList.value.length / perPage));
        const currentList = computed(() => {
            const list = [];
            if (productList.value.length) {
                const start = currentPage.value * perPage - perPage;
                let end = currentPage.value * perPage - 1;
                end = end < productList.value.length ? end : productList.value.length - 1;
                for (let i = start; i <= end; i++) {
                    list.push(productList.value[i]);
                }
            }
            return list;
        });

        watch(currentPage, value => {
            if (!tabletWidth.value) {
                const contentRefTop = contentRef.value.offsetTop;
                window.scrollTo(0, contentRefTop);
            }
        });

        return {
            contentRef,
            categoryList,
            showList,
            productList,
            getCategoryList,
            changeCategory,
            currentPage,
            totalPage,
            currentList
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
            height: 333px;
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
            html:not(.mobile) .category__item:hover {
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
    padding: 20px;
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
    padding: 0 30px;
    justify-content: center;
    flex-wrap: wrap;
    @media (min-width: #{$tablet-width + 1}px) {
        margin: 30px 0 0 auto;
        padding: 0;
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
            html:not(.mobile) .pagination > button:not(.active):hover {
                background-color: $light-color;
            }
        }
    }
}
</style>
