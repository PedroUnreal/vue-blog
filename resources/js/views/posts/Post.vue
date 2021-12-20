,<template>
  <div>
    <div class="alert alert-info">
      <p class="lead">Номер поста {{ post.id }} {{ post.title }}</p>
      <div>{{ post.description }}</div>
      <div>Cоздан: {{ createdDate }} Обновлен: {{ updatedDate }}</div>
      <div><DeletePost :id="post.id" /></div>
    </div>
  </div>
</template>

<script>
import DeletePost from "./DeletePost.vue";

export default {
  name: "Post",
  props: {post: Object, showComments: Boolean},
  components: { DeletePost },
  computed: {
    createdDate() {
      const date = new Date(this.post.created_at);
      return date.toLocaleDateString();
    },
    updatedDate() {
      const date = new Date(this.post.updated_at);
      return date.toLocaleDateString();
    },
  },
};
</script>

<style scoped>
</style>
