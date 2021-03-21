<template>
    <main :class="['order', { 'no-order': !orderList?.length }]">
        <template v-if="orderList">
            <h2 class="title">
                {{ orderList.length ? '訂單紀錄' : '無訂單紀錄' }}
            </h2>
            <div class="container">
                <el-collapse v-model="activeNames">
                    <el-collapse-item
                        v-for="(order, index) in orderList"
                        :key="order.id"
                        :name="index"
                    >
                        <template #title>
                            <ul class="item-title">
                                <!-- eslint-disable-next-line vue/no-parsing-error -->
                                <li>【訂單編號】{{ order.id }}</li>
                                <li>{{ formatTime(order.createTime) }}</li>
                            </ul>
                        </template>
                        <div class="col">
                            <div v-for="item in order.content" :key="item.id" class="list">
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
                                    {{ item.orderAmount }} 件
                                </div>
                                <div class="list__total">
                                    NT$ {{ item.price * item.orderAmount }}
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="summary">
                                <div class="summary__content">
                                    <h2 class="summary__content--title">
                                        訂單摘要
                                    </h2>
                                    <dl class="summary__content--detail">
                                        <dt>小計</dt>
                                        <dd>NT$ {{ subtotal(order.content) }}</dd>
                                        <dt>運費</dt>
                                        <dd>NT$ {{ shipping }}</dd>
                                        <dt>總計</dt>
                                        <dd>NT$ {{ subtotal(order.content) + shipping }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </template>
    </main>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import dayjs from 'dayjs';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';

export default {
    name: 'Order',
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    setup (props) {
        const store = useStore();

        // 訂單摘要
        const shipping = 300;
        const subtotal = order => order.reduce((prev, current) => prev + current.price * current.orderAmount, 0);

        const activeNames = ref([0]);
        const orderList = ref(null);
        const uid = computed(() => store.state.login.userProfile?.uid);
        const formatTime = time => dayjs(time).format('YYYY-MM-DD HH:mm:ss');
        onMounted(async () => {
            const data = await store.dispatch('order/getOrderList', uid.value);
            if (!data.success) {
                alertify.error(data.message);
                return;
            }

            // set active names
            const index = data.list.findIndex(item => item.id === props.id);
            activeNames.value = [index === -1 ? 0 : index];

            orderList.value = data.list;
        });

        return {
            orderList,
            subtotal,
            shipping,
            activeNames,
            formatTime
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.order {
    padding-bottom: 60px;
    @media (min-width: #{$tablet-width + 1}px) {
        margin-top: 46px;
    }
    &.no-order {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.title {
    margin: 0 auto 2em;
    max-width: 940px;
    width: 100%;
    background-color: $light-color;
    color: $dark-color;
    text-align: center;
    font-size: 24px;
    line-height: 65px;
    @at-root {
        .no-order .title {
            margin-bottom: 0;
        }
    }
}
.container {
    width: 100%;
}
:deep(.el-collapse-item__content) {
    display: flex;
    flex-direction: column;
    padding-top: 25px;
    align-items: center;
    @media (min-width: #{$tablet-width + 1}px) {
        flex-direction: row;
        align-items: flex-start;
    }
}
:deep(.el-collapse-item__header),
:deep(.el-collapse-item__content) {
    color: $dark-color;
    font-size: 16px;
    line-height: 1;
}
:deep(.el-collapse-item__header) {
    height: 65px;
    line-height: 1.5;
    @media (min-width: #{$tablet-width + 1}px) {
        height: 48px;
        line-height: 1;
    }
}
.item-title {
    display: flex;
    flex-direction: column;
    @media (min-width: #{$tablet-width + 1}px) {
        flex-direction: row;
        width: calc(100% - 50px);
        justify-content: space-between;
    }
    > li:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 280px;
        @media (min-width: #{$tablet-width + 1}px) {
            width: auto;
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
.list {
    $breakpoint: 1000;
    @extend %clearfix;
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
        font-size: 20px;
    }
    &__total {
        clear: both;
        margin-top: 10px;
        border-width: 1px 0;
        border-style: solid;
        border-color: $light-color;
        text-align: right;
        font-size: 20px;
        line-height: 45px;
        @media (min-width: #{$breakpoint + 1}px) {
            margin-top: 0;
            border-width: 0;
        }
    }
    &__delete {
        position: relative;
        display: none;
        @media (min-width: #{$breakpoint + 1}px) {
            display: block;
            color: $dark-color;
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
        width: 315px;
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
}
</style>
