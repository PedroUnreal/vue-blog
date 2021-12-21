<template>
  <div>
    <div class="alert alert-info">
      <p class="lead">Вот тут мы хотим увидеть список всех постов!</p>
      <CreatePost />
      <div v-for="post in currentPosts" :key="post.id">
        <Post :post="post" :showComments="false" />
        <router-link :to="{ name: 'Post', params: { id: post.id } }">
          Читать комментарии
        </router-link>
      </div>
    </div>
    <Paginator v-if="posts.length>3" v-on:setCurrentPage="currentPage=$event" :currentPage="currentPage" :totalPages="Math.ceil(posts.length/3)"/>
  </div>
</template>

<script>
import { Api } from "../../api";
import Post from "./Post.vue";
import CreatePost from "./CreatePost.vue";
import Paginator from "./Paginator.vue";

export default {
  name: "Posts",
  components: {
    Post,
    CreatePost,
    Paginator
  },
  data() {
    return {
      posts: [],
      currentPage: 1,
    };
  },
  mounted() {
    this.getPosts();
    this.$on('newPostCreated', () => {
      this.getPosts()
    })
  },
  computed:{
    currentPosts(){
        return (this.posts.slice(-(this.currentPage + 2 ), this.currentPage > 1 ? -(this.currentPage -1 ): this.posts.length)).reverse()
    }
  },
  methods: {
    getPosts() {
      Api.getPosts().then((response) => {
        this.posts = response;
      });
    }
  }
};
</script>

<style scoped>
</style>
