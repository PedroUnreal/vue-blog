<template>
  <div>
    <div v-if="!editMode">
      <Post :post="post" :listMode="true" />
      <button type="button" class="btn btn-primary" v-on:click="setEditMode(true)">
        Редактировать
      </button>
    </div>
    <div v-else>
      <UpdatePost :post="post" />
    </div>

    <div class="mt-4">
      <h3>Комментарии</h3>
      <div
        class="card-body mt-4 card"
        v-for="comment in currentComments"
        :key="comment.id"
      >
        {{ comment.name }}: "{{ comment.text }}"
      </div>

      <Paginator
        v-if="this.post.comments && this.post.comments.length > commentsPerPage"
        v-on:setCurrentPage="currentCommentsPage = $event"
        :currentCommentsPage="currentCommentsPage"
        :totalPages="Math.ceil(this.post.comments.length / commentsPerPage)"
      />

      <CreateComment :post_id="post.id" />
    </div>
  </div>
</template>

<script>
import CreateComment from "./CreateComment.vue";
import Paginator from "./Paginator.vue";
import UpdatePost from "./UpdatePost.vue";
import Post from "./Post.vue";
import { Api } from '../../api';
import { COMMENTS_PER_PAGE } from "../../constants";

export default {
  name: "PostPage",
  components: { Post, Paginator, CreateComment, UpdatePost },
  data() {
    return {
      post: {},
      currentCommentsPage: 0,
      commentsPerPage: COMMENTS_PER_PAGE,
      editMode: false,
    };
  },
  mounted() {
    Api.getPost(this.$route.params.id).then(response => this.post = response);
    
    this.$on('newCommentCreated', () => {
      Api.getPost(this.$route.params.id).then(response => this.post = response)
         })

    this.$on('postUpdated', () => {
      Api.getPost(this.$route.params.id).then(response => {
        this.post = response;

        setTimeout(() => {
          this.setEditMode(false);
        }, 2000);
      })
    })

  },
  computed: {
    currentComments() {
      if (!Array.isArray(this.post.comments)) return [];

      return this.post.comments
        .slice(
          -((this.currentCommentsPage + 1) * this.commentsPerPage),
          this.currentCommentsPage > 0
            ? -(
                (this.currentCommentsPage + 1) * this.commentsPerPage -
                this.commentsPerPage
              )
            : this.post.comments.length
        )
        .reverse(); 
    },
  },
  methods: {
    setEditMode(value) {
      this.editMode = value;
    }
  },
};
</script>