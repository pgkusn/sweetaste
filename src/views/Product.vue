<template>
    <main class="product">
        <div class="container">
            <div class="hero">
                <p class="hero__title">
                    想吃水果——<br>是不需要理由的。
                </p>
                <img src="images/hero-product.jpeg" alt="">
            </div>

            <div ref="contentRef" class="content">
                <div class="category">
                    <div class="category__title">
                        水果類別
                    </div>
                    <div :class="['category__item', { active: currentCategory === 'all' && !showFavorite }]" @click="changeCategory('all', false)">
                        所有水果 ({{ productList.length }})
                    </div>
                    <div
                        v-for="(value, name) in categoryList"
                        :key="name"
                        :class="['category__item', { active: currentCategory === name && !showFavorite }]"
                        @click="changeCategory(name)"
                    >
                        {{ value }} ({{ getCategoryCount(name) }})
                    </div>
                    <div v-if="favoriteProducts?.length" :class="['category__item', { active: showFavorite }]" @click="showFavorite = true">
                        我的最愛 ({{ favoriteProducts.length }})
                    </div>
                </div>

                <div class="list">
                    <Card v-for="item in showList[currentPage - 1]" :key="item.id" :info="item" />
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
import { computed, ref, watch, onMounted, watchEffect } from 'vue';
import { useStore } from 'vuex';
import Card from '@/components/Card.vue';
import useShowList from '@/modules/showList';
import useMediaSensor from '@/modules/mediaSensor';

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
        const contentRef = ref(null);
        const productList = computed(() => store.state.product.productList);

        // 類別
        const categoryList = computed(() => store.getters['product/productCategoryList']);
        const currentCategory = ref(props.cate || 'all');
        const currentCategoryList = computed(() => {
            if (showFavorite.value) {
                return favoriteList.value;
            }
            else if (currentCategory.value === 'all') {
                return productList.value;
            }
            else {
                return productList.value.filter(item => item.category === currentCategory.value);
            }
        });
        const getCategoryCount = name => productList.value.filter(item => item.category === name).length;
        const changeCategory = category => {
            if (currentCategory.value === category) return;
            currentCategory.value = category;
            showFavorite.value = false;
            currentPage.value = 1;
        };

        // 我的最愛
        const showFavorite = ref(false);
        const favoriteProducts = computed(() => store.state.favorite.favoriteProducts);
        const favoriteList = computed(() => {
            const newList = [];
            favoriteProducts.value.forEach(item => {
                newList.push(productList.value.find(product => product.id === item));
            });
            return newList;
        });
        watch(favoriteProducts, value => {
            if (!value.length) {
                showFavorite.value = false;
                currentCategory.value = 'all';
            }
        });

        // 分頁資料
        const { md } = useMediaSensor();
        const currentPage = ref(1);
        const showList = useShowList(currentCategoryList);
        const totalPage = computed(() => showList.value.length);
        watch(currentPage, () => {
            if (!md.value) {
                window.scrollTo({
                    top: contentRef.value.offsetTop,
                    behavior: 'smooth'
                });
            }
        });

        onMounted(() => {
            // 從首頁分類進入時先預載入圖片後再滾動至商品內容處
            if (props.cate) {
                const stop = watchEffect(() => {
                    if (productList.value.length) {
                        const productImgs = showList.value[currentPage.value - 1].map(item => item.url);
                        const preloadImgs = ['images/hero-product.jpeg', ...productImgs];

                        let loaded = 0;
                        for (const url of preloadImgs) {
                            const img = new Image();
                            img.src = url;
                            img.onload = () => {
                                loaded++;
                                if (loaded === preloadImgs.length) {
                                    stop();
                                    window.scrollTo({
                                        top: contentRef.value.offsetTop,
                                        behavior: 'smooth'
                                    });
                                    history.replaceState({}, '', '/#/product');
                                }
                            };
                        }
                    }
                });
            }
        });

        return {
            contentRef,
            productList,
            categoryList,
            currentCategory,
            currentCategoryList,
            getCategoryCount,
            changeCategory,
            showFavorite,
            favoriteProducts,
            currentPage,
            totalPage,
            showList
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
