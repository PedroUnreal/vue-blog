<template>
  <div>
    <form @submit.prevent="submit">
      <div class="form-group" :class="{ 'form-group--error': $v.title.$error }">
        <label class="form__label">Title</label>
        <input class="form__input" v-model.trim="$v.title.$model" />
      </div>
      <div class="error" v-if="!$v.title.required">Title is required</div>
      <div class="error" v-if="!$v.title.minLength">
        Title must have at least {{ $v.title.$params.minLength.min }} letters.
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.description.$error }">
        <label class="form__label">Description</label>
        <input class="form__input" v-model.trim="$v.description.$model" />
      </div>
      <div class="error" v-if="!$v.description.required">description is required</div>
      <div class="error" v-if="!$v.description.minLength">
        Description must have at least {{ $v.description.$params.minLength.min }} letters.
      </div>
      <button
        class="button"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
      >
        Submit!
      </button>
      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your post!
      </p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">
        Please fill the form correctly.
      </p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>


  </div>
</template>

<script>
import { Api } from "../../api";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "CreatePost",

  data() {
    return {
      title: "",
      description: "",
      submitStatus: null,
    };
  },
  validations: {
    title: {
      required,
      minLength: minLength(4),
    },
    description: {
      required,
      minLength: minLength(4),
    },
  },

  computed: {
    datenow() {
      return new Date().getTime();
    },
    newPost() {
      return {
        id: this.datenow,
        title: this.title,
        description: this.description,
        created_at: this.datenow,
        updated_at: this.datenow,
        comments: [],
      };
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        Api.createPost(this.newPost).then(() => {
        this.$parent.$emit("newPostCreated");
      });
        this.submitStatus = "PENDING";
        setTimeout(() => {
          this.submitStatus = "OK";
        }, 500);
      }
    },
  },
};
</script>

<style scoped>
</style>