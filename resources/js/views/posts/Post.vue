,<template>
  <div>
    <div class="alert alert-info">
      <p class="lead">Номер поста {{ post.id }} {{ post.title }}</p>
      <div>{{ post.description }}</div>
      <div>Cоздан: {{ createdDate }} Обновлен: {{ updatedDate }}</div>
      <div><DeletePost :id="post.id" /></div>
      <div v-if="this.showComments">
        <h3>Комментарии</h3>
        <div v-for="comment in currentComments" :key="comment.id">
          {{ comment.name }}: "{{ comment.text }}"
        </div>
        <CreateComment :post_id="post.id" />
        <div v-if="this.post.comments.length>3">
          <Paginator
            v-on:setCurrentPage="currentPage = $event"
            :currentPage="currentPage"
            :totalPages="Math.ceil(post.comments.length / 3)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeletePost from "./DeletePost.vue";
import CreateComment from "./CreateComment.vue";
import Paginator from "./Paginator.vue";
export default {
  name: "Post",
  props: { post: Object, showComments: Boolean },
  components: { DeletePost, CreateComment, Paginator },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    createdDate() {
      const date = new Date(this.post.created_at);
      return date.toLocaleDateString();
    },
    updatedDate() {
      const date = new Date(this.post.updated_at);
      return date.toLocaleDateString();
    },
    currentComments() {
       if (this.post.comments.length){
         console.log(this.post.comments.length);
        return this.post.comments
        .slice(
          -(this.currentPage + 2),
          this.currentPage > 1
            ? -(this.currentPage - 1)
            : this.post.comments.length
        )
        .reverse();
        }
    },
  },
};
</script>

<style scoped>
</style>
