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
                    <tr>
                        <td class="select w-50 pr-5">
                            <select>
                                <option value="高雄市">
                                    高雄市
                                </option>
                            </select>
                        </td>
                        <td class="select w-50 pl-5">
                            <select>
                                <option value="新興區">
                                    新興區
                                </option>
                            </select>
                        </td>
                    </tr>
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
import { checkLogin } from '@/checkLogin.js';

export default {
    name: 'Ship',
    components: {
        Progress
    },
    setup () {
        const router = useRouter();
        const next = () => {
            if (!checkLogin()) {
                localStorage.setItem('beforeLoginPage', 'Ship');
                router.push({ name: 'Login' });
                return;
            }
            router.replace({ name: 'Payment' });
        };
        return {
            next
        };
    }
};
</script>
