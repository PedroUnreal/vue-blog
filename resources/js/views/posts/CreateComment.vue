<template>
  <div>
    Name <input v-model="name" type="text" required /> 
    Text <input v-model="text" type="text" required /> 
    <button v-on:click="addPost" type="button">Добавить комментарий</button>
  </div>
</template>

<script>
import { Api } from "../../api";
export default {
  name: "CreateComment",
  props:{post_id: Number},
  data() {
    return {
      name: "",
      text: ""
    };
  },

  computed: {
    datenow() {
      return new Date().getTime();
    },
    newComment() {
      return {
        id: this.datenow,
        post_id: this.post_id,
        name: this.name,
        text: this.text,
        created_at: this.datenow,
        updated_at: this.datenow,
      };
    },
  },

  methods: {
    addPost() {
      Api.createComment(this.newComment);
      Api.getPosts().then((response) => {
      this.$emit("emitPosts", response);
    });
    },
  },
};
</script>

<style scoped>
</style>