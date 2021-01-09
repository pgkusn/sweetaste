<template>
    <main class="payment">
        <div class="content">
            <table>
                <thead>
                    <th class="title pb-20">
                        付款
                    </th>
                    <th class="bar pb-20">
                        <Progress :now="2" />
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td class="pr-10" colspan="2">
                            <label>信用卡卡號</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="card" colspan="2">
                            <input type="text">
                            <span class="material-icons">payment</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="pt-10" colspan="2">
                            <label>持卡人姓名</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="w-50 pr-5">
                            <input type="text">
                        </td>
                        <td class="w-50 pl-5">
                            <input type="text">
                        </td>
                    </tr>
                    <tr>
                        <td class="pt-10" colspan="2">
                            <label>有效期限</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="select w-50 pr-5">
                            <select>
                                <option value="">
                                    月
                                </option>
                                <option v-for="n in 12" :key="n" :value="n">
                                    {{ n }}
                                </option>
                            </select>
                        </td>
                        <td class="select w-50 pl-5">
                            <select>
                                <option value="">
                                    年
                                </option>
                                <option v-for="year in years" :key="year" :value="year">
                                    {{ year }}
                                </option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td class="pr-10 pt-10">
                            <label>背面末三碼</label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="next" @click="next">
            下一步
        </button>
    </main>
</template>

<script>
import { useRouter } from 'vue-router';
import Progress from '@/components/Progress.vue';
import { computed } from 'vue';

export default {
    name: 'Payment',
    components: {
        Progress
    },
    setup () {
        const router = useRouter();
        const next = () => {
            router.replace({ name: 'Invoice' });
        };
        const years = computed(() => {
            const arr = [];
            const thisYear = new Date().getFullYear();
            for (let i = thisYear - 100; i <= thisYear; i++) {
                arr.push(i);
            }
            return arr;
        });
        return {
            next,
            years
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.card {
    position: relative;
    > [type=text] {
        padding-right: 50px;
    }
    > span {
        position: absolute;
        top: 0;
        right: 15px;
        bottom: 0;
        margin: auto 0;
        width: 24px;
        height: 24px;
        color: $dark-color;
    }
}
</style>
