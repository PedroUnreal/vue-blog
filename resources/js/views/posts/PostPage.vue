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
  mounted() {
    Api.getPost(this.$route.params.id).then(response=> this.post = response);
    this.$on('newCommentCreated', () => {
      Api.getPost(this.$route.params.id).then(response=> this.post = response)
         })
    },
    // axios
    //   .post("/post", { id: this.$route.params.id })
    //   .then((response) => response.data)
    //   .then((response) => (this.post = response))
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   });
  
};
</script>

<style scoped>
</style>
