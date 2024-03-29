import { computed } from 'vue';

export default list => {
    const perPage = 4;
    const showList = computed(() => {
        const newList = [];
        list.value.forEach((item, i) => {
            if (i % perPage === 0) {
                newList.push([]);
            }
            const page = parseInt(i / perPage);
            newList[page].push(item);
        });
        return newList;
    });
    return showList;
};