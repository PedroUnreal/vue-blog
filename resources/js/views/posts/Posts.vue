<template>
  <div>
    <div class="alert alert-info">
      <p class="lead">Вот тут мы хотим увидеть список всех постов!</p>
      <CreatePost v-on:emitPosts="posts=$event"/>
      <div v-for="post in posts" :key="post.id">
        <Post v-on:emitPosts="posts=$event" :post="post" :showComments="false" />
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
          Читать комментарии
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "../../api";

import Post from "./Post.vue";
import CreatePost from "./CreatePost.vue";

export default {
  name: "Posts",
  components: {
    Post,
    CreatePost,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    Api.getPosts().then((response) => {
      this.posts = response;
    });
  },
};
</script>

<style scoped>
</style>
