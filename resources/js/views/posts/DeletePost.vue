<template>
  <div>
    <button v-on:click="deletePost" type="button">Удалить пост {{this.id}}</button>
  </div>
</template>

<script>
import { Api } from '../../api';

export default {
  name: "DeletePost",
  props: {id: Number},
  methods: {
    deletePost() {
        console.log(this.id), "id",
        Api.deletePost(this.id)
        Api.getPosts().then((response) => {
      this.$emit("posts", response);
    })
      // axios.post("/api/posts/delete", { id: this.id })
    },
  },
};
</script>

<style lang="scss" scoped>
</style>