<template>
  <div>
    <!-- <form>
    Name <input v-model="name" type="text" required /> 
    Text <input v-model="text" type="text" required /> 
    <button v-on:click="addPost" type="button">Добавить комментарий</button>
    </form> -->

  <form @submit.prevent="submit">
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="form__label">Name</label>
        <input class="form__input" v-model.trim="$v.name.$model" />
      </div>
      <div class="error" v-if="!$v.name.required">Name is required</div>
      <div class="error" v-if="!$v.name.minLength">
        Name must have at least {{ $v.name.$params.minLength.min }} letters.
      </div>
      <div class="form-group" :class="{ 'form-group--error': $v.text.$error }">
        <label class="form__label">text</label>
        <input class="form__input" v-model.trim="$v.text.$model" />
      </div>
      <div class="error" v-if="!$v.text.required">text is required</div>
      <div class="error" v-if="!$v.text.minLength">
        text must have at least {{ $v.text.$params.minLength.min }} letters.
      </div>
      <button
        class="button"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
      >
        Submit!
      </button>
      <p class="typo__p" v-if="submitStatus === 'OK'">
        Thanks for your comment!
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
  name: "CreateComment",
  props:{post_id: Number},
  data() {
    return {
      name: "",
      text: "",
      submitStatus: null,
    };
  },

  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    text: {
      required,
      minLength: minLength(4),
    },
  },

  computed: {
    datenow() {
      return new Date().getTime();
    },
    newComment() {
      return {
        id: this.datenow,
        post_id: this.post_id,
        name: this.name,
        text: this.text,
        created_at: this.datenow,
        updated_at: this.datenow,
      };
    },
  },

  methods: {
    // addPost() {
    //   Api.createComment(this.newComment).then(
    //       ()=> this.$parent.$parent.$emit("newCommentCreated")
    //   );  
    // },

    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        Api.createComment(this.newComment).then(
          ()=> this.$parent.$parent.$emit("newCommentCreated")
      );  
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