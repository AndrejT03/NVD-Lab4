import { ref, computed } from 'vue';

export const useSearch = (items) => {
    const searchTerm = ref('');
    const filters = ref(['title']);

    const filteredItems = computed(() => {
        const search = searchTerm.value.toLowerCase();
        return items.value.filter(item => {
            for (let i = 0; i < filters.value.length; i++) {
                const key = filters.value[i];
                if (item[key] && item[key].toLowerCase().includes(search)) {
                    return true;
                }
            }
            return false;
        });
    });

    return { searchTerm, filters, filteredItems };
};