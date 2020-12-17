<template>
    <tr>
        <td class="select w-50 pr-5">
            <select v-model="select.city">
                <option v-for="city in cities" :key="city.CityName" :value="city.CityName">
                    {{ city.CityName }}
                </option>
            </select>
        </td>
        <td class="select w-50 pl-5">
            <select v-model="select.area">
                <option v-for="area in areas" :key="area.AreaName" :value="area.AreaName">
                    {{ area.AreaName }}
                </option>
            </select>
        </td>
    </tr>
</template>

<script>
import { computed, reactive, watch } from 'vue';
import CityCountyData from '@/data/CityCountyData.json';

export default {
    name: 'CitySelector',
    setup () {
        const select = reactive({
            city: '臺北市',
            area: '中正區'
        });
        const cities = computed(() => CityCountyData);
        const areas = computed(() => cities.value.find(value => value.CityName === select.city).AreaList);
        watch(() => select.city, value => {
            select.area = areas.value[0].AreaName;
        });
        return {
            select,
            cities,
            areas
        };
    }
};
</script>

<style>

</style>
