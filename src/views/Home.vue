<template>
    <main class="home">
        <div class="hero">
            <div class="container">
                <div class="banner" />
                <div class="nav">
                    <div v-for="(value, name) in categoryList" :key="name" class="nav__item">
                        <router-link :to="{ name: 'Product', query: { cate: name } }">
                            {{ value }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <article class="intro">
            <div class="container">
                <h1>為什麼——<br>選擇了做甜點？</h1>
                <div class="intro__illust">
                    <img src="@/assets/images/home/article1.jpeg" alt="">
                </div>
                <div class="intro__content">
                    <p>青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。</p>
                    <p>是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，古今多少事，都付笑談中。</p>
                </div>
            </div>
        </article>
        <article class="intro">
            <div class="container">
                <h1>為什麼——<br>一定要吃甜點？</h1>
                <div class="intro__illust">
                    <img src="@/assets/images/home/article2.jpeg" alt="">
                </div>
                <div class="intro__content">
                    <p>青山依舊在，幾度夕陽紅。慣看秋月春風。一壺濁酒喜相逢，浪花淘盡英雄。是非成敗轉頭空，滾滾長江東逝水，白髮漁樵江渚上，古今多少事，都付笑談中。</p>
                    <p>是非成敗轉頭空，青山依舊在，幾度夕陽紅。白髮漁樵江渚上，古今多少事，都付笑談中。</p>
                </div>
            </div>
        </article>
        <div class="showcase">
            <div class="container">
                <div class="showcase__title">
                    想吃甜點——<br>是不需要理由的。
                </div>
                <div class="showcase__cards">
                    <Card v-for="item in productList" :key="item.id" :info="item" />
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
import Card from '@/components/Card.vue';

export default {
    name: 'Home',
    components: {
        Card
    },
    setup () {
        const store = useStore();
        const router = useRouter();

        // 檢查是否從 LINE 登入頁導回
        const checkLineLogin = async () => {
            const { channelID, channelSecret, callbackURL, state: urlState } = store.getters.lineInfo;

            // 1. check url
            const searchParams = (new URL(document.location)).searchParams;
            const code = searchParams.get('code');
            const state = searchParams.get('state');

            if (!code || urlState !== state) return;

            history.replaceState({}, '', '/#/');
            const beforeLoginPage = localStorage.getItem('beforeLoginPage') || 'Home';
            router.push({ name: beforeLoginPage });
            localStorage.removeItem('beforeLoginPage');

            // 2. get token
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('code', code);
            params.append('redirect_uri', callbackURL);
            params.append('client_id', channelID);
            params.append('client_secret', channelSecret);
            const accessToken = await store.dispatch('getLineToken', params);

            // 3. get user profile
            const lineProfile = await store.dispatch('getLineProfile', accessToken);
            store.commit('setLineProfile', lineProfile);
            localStorage.setItem('lineProfile', JSON.stringify(lineProfile));
        };
        checkLineLogin();

        // showcase
        const categoryList = computed(() => store.getters.productCategoryList);
        const productList = computed(() => { // 隨機取三個商品
            const all = cloneDeep(store.state.productList);
            const randomList = [];
            if (all.length) {
                for (let i = 0; i < 3; i++) {
                    const num = Math.floor(Math.random() * all.length);
                    randomList.push(all[num]);
                    all.splice(num, 1);
                }
            }
            return randomList;
        });

        return {
            categoryList,
            productList
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.hero {
    > .container {
        display: grid;
        padding: 0;
        grid-template-rows: 277px 180px;
        grid-template-columns: 1fr;
        @media (min-width: #{$tablet-width + 1}px) {
            padding: 0 42px;
            grid-template-rows: 416px 80px 176px;
        }
    }
}
.banner {
    background: url('~@/assets/images/home/hero.jpeg') 50%/cover;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    @media (min-width: #{$tablet-width + 1}px) {
        grid-row: 1 / 3;
    }
}
.nav {
    display: flex;
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    @media (min-width: #{$tablet-width + 1}px) {
        margin: 0 auto;
        max-width: 780px;
        width: 100%;
        grid-row: 2 / 4;
    }
    &__item {
        position: relative;
        flex-grow: 1;
        + .nav__item {
            border-left: 1px solid #fff;
        }
        > a {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            background-color: rgba($dark-color, .75);
            color: #fff;
            content: '';
            letter-spacing: 5px;
            font-size: 20px;
            transition: background-color .3s, color .3s;
            writing-mode: vertical-rl;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
            @media (min-width: #{$tablet-width + 1}px) {
                font-size: 24px;
            }
            @at-root {
                :not(.is-mobile) .nav__item > a:hover {
                    background-color: rgba(#ffe180, .75);
                    color: $dark-color;
                }
            }
        }
        @for $i from 1 through 3 {
            &:nth-child(#{$i}) {
                background: url('~@/assets/images/home/nav#{$i}.jpeg') 50%/cover;
            }
        }
    }
}
.intro {
    @media (min-width: #{$tablet-width + 1}px) {
        margin-top: 60px;
        background-image: linear-gradient(transparent 5%, #{$light-color} 0, #{$light-color} 95%, transparent 0);
    }
    > .container {
        padding: 0;
        @media (min-width: #{$tablet-width + 1}px) {
            display: flex;
            padding: 0 42px;
            max-height: 460px;
            height: 100%;
            justify-content: space-between;
        }
    }
    h1 {
        padding: 1em 0;
        color: $dark-color;
        text-align: center;
        letter-spacing: 4.8px;
        font-size: 24px;
        line-height: 1.5;
        @media (min-width: #{$tablet-width + 1}px) {
            padding-top: .5em;
            padding-bottom: 0;
            text-align: left;
            text-indent: -.5em;
            font-size: 36px;
            order: 2;
            writing-mode: vertical-rl;
            @at-root {
                .intro:nth-of-type(2) h1 {
                    padding-right: 32px;
                    flex-grow: 1;
                }
            }
        }
    }
    &__illust {
        order: 0;
        @media (min-width: #{$tablet-width + 1}px) {
            @at-root {
                .intro:nth-of-type(2) .intro__illust {
                    order: 4;
                }
            }
        }
        > img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            @media (min-width: #{$tablet-width + 1}px) {
                width: 460px;
                height: 460px;
            }
        }
    }
    &__content {
        padding: 30px;
        background-color: $light-color;
        color: #8da291;
        line-height: 2;
        @media (min-width: #{$tablet-width + 1}px) {
            background-color: transparent;
            order: 1;
            writing-mode: vertical-rl;
            @at-root {
                .intro:nth-of-type(1) .intro__content {
                    padding: 70px 60px 70px 45px;
                    flex-grow: 1;
                }
                .intro:nth-of-type(2) .intro__content {
                    padding: 70px 60px 70px 0;
                    flex-grow: 1;
                }
            }
        }
        > p + p {
            margin-top: 2em;
            @media (min-width: #{$tablet-width + 1}px) {
                margin-top: 0;
                margin-right: 2em;
            }
        }
    }
}
.showcase {
    padding-bottom: 30px;
    @media (min-width: #{$tablet-width + 1}px) {
        padding-bottom: 60px;
    }
    &__title {
        padding: 1em 0;
        color: $dark-color;
        text-align: center;
        letter-spacing: 4.8px;
        font-size: 24px;
        line-height: 1.5;
        @media (min-width: #{$tablet-width + 1}px) {
            margin: 0 auto;
            padding: 80px 0;
            text-align: left;
            text-indent: -.5em;
            font-size: 36px;
            writing-mode: vertical-rl;
        }
    }
    &__cards {
        display: flex;
        overflow: hidden;
        height: 436px;
        flex-wrap: wrap;
        justify-content: center;
    }
    .card {
        flex-shrink: 0;
        + .card {
            margin-left: 20px;
        }
    }
}
</style>
