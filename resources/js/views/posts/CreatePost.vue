<template>
  <div>
    Title <input v-model="title" type="text" required /> Description
    <input v-model="description" type="text" required />
    <button v-on:click="addPost" type="button">Добавить пост</button>
  </div>
</template>

<script>
import { Api } from "../../api";
export default {
  name: "CreatePost",

  data() {
    return {
      title: "",
      description: "",
    };
  },

  computed: {
    datenow() {
      return new Date().getTime();
    },
    newPost() {
      return {
        id: this.datenow,
        title: this.title,
        description: this.description,
        created_at: this.datenow,
        updated_at: this.datenow,
        comments: [],
      };
    },
  },

  methods: {
    addPost() {
        Api.createPost(this.newPost).then(() => {
            this.$parent.$emit("newPostCreated");
        });
    },
  },
};
</script>

<style scoped>
</style>