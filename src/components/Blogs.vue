<template>
  <div>
    <h1 class="h1_text">Blogs</h1>
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>
    <div v-else-if="error">
      <p>{{ error }}</p>
    </div>
    <section v-else>
      <div class="search">
        <label for="search" class="text_search">Search:</label>
        <input type="text" id="search" v-model="searchTerm" style="margin-left: 5px" />
      </div>
      <fieldset>
        <div class="text_search">Filter by: </div>
        <input type="checkbox" id="title" value="title" v-model="filters" />
        <label class="text_search" for="title">By Title</label>
        <input
            type="checkbox"
            id="content"
            value="description"
            v-model="filters"
        />
        <label class="text_search">By Content</label>
      </fieldset>
      <ul class="articles-list">
        <li>
          <article v-for="(blog, i) in filteredBlogs" :key="i">
            <div class="article-item-info">
              <img v-if="blog.imageUrl" class="thumbnail" :src="blog.imageUrl" alt="Blog Image" style="width: 350px; height: 196px" />
              <div class="article-text">
                <div class="date">
                  {{ new Date(blog.publishDate).toDateString() }}
                </div>
                <h4 class="title_text"> {{ blog.title }}</h4>
                <p class="article_text"> {{ blog.description }}</p>
                <p class="article_text"> {{ blog.content }}</p>
              </div>
            </div>
            <button @click="emits('deleteBlog', blog.id)">Delete</button>
          </article>
        </li>
      </ul>
    </section>
  </div>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { useSearch } from "../composables/useSearch";

const props = defineProps({
  blogs: { type: Array, required: true },
  isLoading: { type: Boolean, required: true },
  error: { type: String, required: true },
});

const emits = defineEmits(["deleteBlog"]);
const blogs = ref(props.blogs);
watch(
    () => props.blogs,
    (newBlogs) => {
      blogs.value = newBlogs;
    }
);

const { searchTerm, filters, filteredItems: filteredBlogs } = useSearch(blogs);
</script>

<style scoped>
.articles-list article {
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 10px;
  border: 1px solid gray;
  align-items: center;
  margin-block: 20px;
}
.text_search {
  font-family:'Calibri Light';
  font-size: 18px;
}
.article_text {
  font-family:'Calibri Light';
  font-size: 19px;
}
.h1_text {
  font-family:'Calibri Light';
  font-size: 40px;
  font-weight: bolder;
}
.title_text {
  font-family:'Calibri Light';
  font-weight: bold;
  font-size: 23px;
}
button {
  margin-bottom: 10px;
}
.article-item-info {
  display: flex;
  text-align: left;
  padding-bottom: 15px;
  width: 100%;
}
.article-text {
  padding: 15px 0;
}
.thumbnail {
  margin-right: 30px;
}
.date {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
li {
  list-style: none;
}
fieldset {
  display: flex;
  gap: 10px;
  margin-block: 20px;
}
</style>