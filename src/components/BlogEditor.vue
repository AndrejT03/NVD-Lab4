<template>
  <div>
    <h1 class="h1_text">Blog Editor</h1>
    <div class="field">
      <label for="title" class="text_search">Title</label>
      <input type="text" id="title" v-model="title" />
    </div>
    <div class="field">
      <label for="ID" class="text_search">Blog id</label>
      <input type="text" id="ID" v-model="id" />
    </div>
    <div class="field">
      <label for="author" class="text_search">Author</label>
      <input type="text" id="author" v-model="author" />
    </div>
    <div class="field">
      <label for="content" class="text_search">Content</label>
      <textarea id="content" v-model="content"></textarea>
    </div>
    <div class="field">
      <label for="imageUrl" class="text_search">Image URL</label>
      <input type="text" id="imageUrl" v-model="imageUrl" />
    </div>
    <div class="field">
      <button @click="save">Save</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const title = ref('');
const author = ref('');
const content = ref('');
const id = ref('');
const imageUrl = ref('');
const emits = defineEmits(['addNewItem']);

const save = () => {
  emits('addNewItem', ({
    title: title.value,
    author: author.value,
    content: content.value,
    id: id.value,
    publishDate: new Date().toISOString(),
    imageUrl: imageUrl.value,
  }));

  title.value = '';
  author.value = '';
  content.value = '';
  id.value = '';
  imageUrl.value = '';
};
</script>
<style scoped>
.field {
  margin-bottom: 1rem;
  align-items: center;
}
input, textarea {
  font-family:'Calibri Light';
}
.h1_text {
  font-family:'Calibri Light';
  font-size: 40px;
  font-weight: bolder;
}
.text_search {
  font-family:'Calibri Light';
  font-size: 18px;
  line-height: 40px;
}
.field label {
  margin-inline-end: 10px;
}
</style>