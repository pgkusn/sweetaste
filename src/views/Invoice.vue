<template>
    <div class="invoice">
        <div class="content">
            <table>
                <thead>
                    <th class="title pb-30">
                        發票
                    </th>
                    <th class="bar pb-30">
                        <Progress :now="3" />
                    </th>
                </thead>
                <tbody>
                    <tr class="nav">
                        <td :class="['w-50', { active: invoiceType === 'einvoice' }]" @click="invoiceType = 'einvoice'">
                            電子發票
                        </td>
                        <td :class="['w-50', { active: invoiceType === 'post' }]" @click="invoiceType = 'post'">
                            郵寄發票
                        </td>
                    </tr>
                    <template v-if="invoiceType === 'einvoice'">
                        <tr>
                            <td class="pt-20" colspan="2">
                                <label>電子郵件信箱</label>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <input type="text">
                            </td>
                        </tr>
                    </template>
                    <template v-else>
                        <tr>
                            <td class="pt-20" colspan="2">
                                <label>地址</label>
                            </td>
                        </tr>
                        <CitySelector />
                        <tr>
                            <td class="pt-8" colspan="2">
                                <input type="text">
                            </td>
                        </tr>
                    </template>
                    <tr>
                        <td class="pt-10" colspan="2">
                            <label>統一編號（選填）</label>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input type="text">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="next" @click="order">
            確認結帳
        </button>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Progress from '@/components/Progress.vue';
import CitySelector from '@/components/CitySelector.vue';
import { checkLogin } from '@/checkLogin.js';

export default {
    name: 'Invoice',
    components: {
        Progress,
        CitySelector
    },
    setup () {
        const router = useRouter();
        const store = useStore();
        const order = async () => {
            if (!checkLogin()) {
                localStorage.setItem('beforeLoginPage', 'Ship');
                router.push({ name: 'Login' });
                return;
            }
            const cartList = computed(() => store.state.cartList);
            const result = await store.dispatch('order', cartList.value);
            if (result) {
                store.dispatch('updateCartList', []);
                router.replace({ name: 'Success' });
            }
        };
        const invoiceType = ref('einvoice');
        return {
            order,
            invoiceType
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.nav {
    > td {
        border: 1px solid $light-color;
        text-align: center;
        font-size: 20px;
        line-height: 56px;
        cursor: pointer;
        &.active {
            background-color: $light-color;
            color: $dark-color;
        }
    }
}
</style>