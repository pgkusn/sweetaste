<template>
    <div class="ship">
        <div class="content">
            <table>
                <thead>
                    <th class="title pb-20">
                        運送
                    </th>
                    <th class="bar pb-20">
                        <Progress :now="1" />
                    </th>
                </thead>
                <tbody>
                    <tr>
                        <td class="w-50">
                            <label>姓氏</label>
                        </td>
                        <td class="w-50">
                            <label>名字</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="pr-5">
                            <input type="text">
                        </td>
                        <td class="pl-5">
                            <input type="text">
                        </td>
                    </tr>
                    <tr>
                        <td class="pt-10" colspan="2">
                            <label>電話</label>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <input type="text">
                        </td>
                    </tr>
                    <tr>
                        <td class="pt-10" colspan="2">
                            <label>地址</label>
                        </td>
                    </tr>
                    <CitySelector />
                    <tr>
                        <td class="pt-8" colspan="2">
                            <input type="text">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button class="next" @click="next">
            下一步
        </button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import Progress from '@/components/Progress.vue';
import CitySelector from '@/components/CitySelector.vue';

export default {
    name: 'Ship',
    components: {
        Progress,
        CitySelector
    },
    setup () {
        const router = useRouter();
        const next = () => {
            router.replace({ name: 'Payment' });
        };
        return {
            next
        };
    }
};
</script>
