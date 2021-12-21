<template>
  <div class="container rounded bg-light mb-3 pt-2 pb-2">
    <h2 :class="{ lead: !showComments }">{{ post.title }}</h2>

    <div v-if="showComments">{{ post.description }}</div>
    <div v-else>{{ post.description.substring(0, 1000) }}</div>

    <div class="mt-2">
      <div class="text-muted">Cоздан: {{ createdDate }}</div>
      <div class="text-muted">Обновлен: {{ updatedDate }}</div>
    </div>

    <!-- <div><DeletePost :id="post.id" /></div> -->
    <div class="mt-4" v-if="this.showComments">
      <h3>Комментарии</h3>
      <div v-for="comment in currentComments" :key="comment.id">
        {{ comment.name }}: "{{ comment.text }}"
      </div>
      <CreateComment :post_id="post.id" />

      <Paginator
        v-if="this.post.comments.length > commentsPerPage"
        v-on:setCurrentPage="currentPage = $event"
        :currentPage="currentPage"
        :totalPages="Math.ceil(this.post.comments.length / commentsPerPage)"
      />
    </div>
  </div>
</template>

<script>
import DeletePost from "./DeletePost.vue";
import CreateComment from "./CreateComment.vue";
import Paginator from "./Paginator.vue";
import { COMMENTS_PER_PAGE } from "../../constants";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default {
  name: "Post",
  props: { post: Object, showComments: Boolean },
  components: { DeletePost, CreateComment, Paginator },
  data() {
    return {
      currentPage: 0,
      commentsPerPage: COMMENTS_PER_PAGE,
    };
  },
  computed: {
    createdDate() {
      return formatDate(this.post.created_at);
    },
    updatedDate() {
      return formatDate(this.post.updated_at);
    },
    currentComments() {
      return this.post.comments
        .slice(
          -((this.currentPage + 1) * this.commentsPerPage),
          this.currentPage > 0
            ? -(
                (this.currentPage + 1) * this.commentsPerPage -
                this.commentsPerPage
              )
            : this.post.comments.length
        )
        .reverse();
    },
  },
};
</script>

<style scoped>
</style>
