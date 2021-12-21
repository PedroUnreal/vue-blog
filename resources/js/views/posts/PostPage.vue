,<template>
  <div>
    <Post :post="post" :showComments="true" />
  </div>
</template>

<script>
import DeletePost from "./DeletePost.vue";
import Post from "./Post.vue";
import { Api } from '../../api';

export default {
  name: "PostPage",
  components: { DeletePost, Post },
  data() {
    return {
      post: {},
    };
  },
  mounted() {
    Api.getPost(this.$route.params.id).then(response=> this.post = response);
    this.$on('newCommentCreated', () => {
      Api.getPost(this.$route.params.id).then(response=> this.post = response)
         })
    },
};
</script>