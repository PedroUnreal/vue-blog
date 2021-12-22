<template>
  <div>
    <!-- <p class="lead">Вот тут мы хотим увидеть список всех постов!</p> -->
    <CreatePost />
    <div class="mt-4 card" v-for="post in currentPosts" :key="post.id">
      <div class="card-body">
        <Post :post="post" :listMode="false" />
        <router-link
          tag="button"
          class="btn btn-primary"
          :to="{ name: 'Post', params: { id: post.id } }"
        >
          Перейти к посту
        </router-link>
      </div>
    </div>

    <Paginator
      v-if="posts.length > postsPerPage"
      v-on:setCurrentPage="currentPage = $event"
      :currentPage="currentPage"
      :totalPages="Math.ceil(posts.length / postsPerPage)"
    />
  </div>
</template>

<script>
import { Api } from "../../api";
import Post from "./Post.vue";
import CreatePost from "./CreatePost.vue";
import Paginator from "./Paginator.vue";
import { POSTS_PER_PAGE } from "../../constants";

export default {
  name: "Posts",
  components: {
    Post,
    CreatePost,
    Paginator,
  },
  data() {
    return {
      posts: [],
      currentPage: 0,
      postsPerPage: POSTS_PER_PAGE,
    };
  },
  mounted() {
    // Получение постов при открытии страницы
    this.getPosts();

    // Обновление списка постов при создании нового поста
    this.$on("newPostCreated", () => {
      this.getPosts();
    });
  },
  computed: {
    // Посты на текущей странице
    currentPosts() {
      return  this.getPostsPerPage();
    },
  },
  methods: {
    getPosts() {
      Api.getPosts().then((response) => {
        this.posts = response;
      });
    },
    getPostsPerPage() {
      return (
        this.posts
          .slice(
            // Последние POSTS_PER_PAGE поста из списка постов
            -((this.currentPage + 1) * this.postsPerPage),
            this.currentPage > 0 ? -(((this.currentPage + 1) * this.postsPerPage) - this.postsPerPage) : this.posts.length
          )
          // Сортировка по дате создания - от более новых к более старым
          // (для упрощения используем reverse() и опираемся на то, что из БД посты получаем в порядке их создания)
          .reverse()
      );
    }
  },
};
</script>

<style scoped>
</style>
