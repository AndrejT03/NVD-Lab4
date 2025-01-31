export const useListActions = (items) => ({
    addItem: (item) => items.value.push(item),
    deleteItem: (id) => {
        const index = items.value.findIndex(item => item.id === id);
        if (index !== -1) items.value.splice(index, 1);
    }
});