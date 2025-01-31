import { createClient } from "contentful";
import { useListActions } from "./useListActions";
import { ref, onBeforeMount } from "vue";

const client = createClient({
    space: "yefv00x03n9g",
    accessToken: "ywoOTZLiwCkDnavj2T8W8eUFfbgqPVBvITD6QO88SlI",
});

export const useBlogs = () => {
    const blogs = ref([]);
    const isLoading = ref(false);
    const error = ref(null);
    const { addItem, deleteItem } = useListActions(blogs);

    const getBlogs = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await client.getEntries({
                content_type: "blogPost",
                order: "-fields.publishDate",
            });

            blogs.value = response.items.map(item => {
                const fields = item.fields;
                return {
                    id: fields.slug,
                    title: fields.title,
                    description: fields.description,
                    publishDate: fields.publishDate,
                    author: fields.author,
                    imageUrl: fields.imageUrl,
                };
            });
        } catch (err) {
            error.value = err;
        } finally {
            isLoading.value = false;
        }
    };

    onBeforeMount(getBlogs);
    return { blogs, isLoading, error, addItem, deleteItem };
}