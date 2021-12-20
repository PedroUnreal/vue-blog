,<template>
  <div>
    <div class="alert alert-info">
      <p class="lead">Номер поста {{ post.id }} {{ post.title }}</p>
      <div>{{ post.description }}</div>
      <div>Cоздан: {{ createdDate }} Обновлен: {{ updatedDate }}</div>
      <div><DeletePost :id="post.id" /></div>
      <div v-if="this.showComments">
      <h3>Комментарии</h3>
      <div v-for="comment in this.post.comments" :key="comment.id" >
          {{comment.name}}: "{{comment.text}}"
      </div>
      <CreateComment v-on:emitPost="posts = $event" :post_id="post.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import DeletePost from "./DeletePost.vue";
import CreateComment from "./CreateComment.vue"
export default {
  name: "Post",
  props: {post: Object, showComments: Boolean, comments: Array},
  components: { DeletePost, CreateComment },
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
