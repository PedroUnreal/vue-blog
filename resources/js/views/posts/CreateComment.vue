<template>
  <div class="card">
    <form @submit.prevent="submit" class="card-body">
      <h2 class="card-title">Добавить новый пост</h2>
      <div class="form-group">
        <label class="form__label form-label">Имя</label>
        <input
          name="name"
          class="form__input form-control"
          v-model.trim="$v.commentData.name.$model"
        />

        <div class="text-danger" v-if="!$v.commentData.name.required">
          Поле обязательно для заполнения
        </div>
        <div class="text-danger" v-if="!$v.commentData.name.minLength">
          Имя должно содержать как минимум
          {{ $v.commentData.name.$params.minLength.min }} символа
        </div>
      </div>

      <div class="form-group">
        <label class="form__label form-label">Комментарий</label>
        <textarea
          name="text"
          class="form__input form-control"
          rows="5"
          v-model.trim="$v.commentData.text.$model"
        />
        <div class="text-danger" v-if="!$v.commentData.text.required">
          Поле обязательно для заполнения
        </div>
        <div class="text-danger" v-if="!$v.commentData.text.minLength">
          Описание должно содержать как минимум
          {{ $v.commentData.text.$params.minLength.min }} символов
        </div>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
      >
        Опубликовать
      </button>
      <p v-if="submitStatus === 'OK'" class="alert alert-success mt-4">
        Комментарий опубликован!
      </p>
      <p class="text-danger" v-if="submitStatus === 'ERROR'">
        Проверьте правильность заполнения полей формы.
      </p>
      <p v-if="submitStatus === 'PENDING'">Отправка...</p>
    </form>
  </div>
</template>

<script>
import { Api } from "../../api";
import { required, minLength } from "vuelidate/lib/validators";

const initialCommentData = (postId) => ({
  name: "",
  text: "",
  post_id: postId
});

export default {
  name: "CreateComment",
  props: { post_id: Number },

  data() {
    return {
      commentData: initialCommentData(this.post_id),
      submitStatus: null,
    };
  },
  validations: {
    commentData: {
      name: {
        required,
        minLength: minLength(4),
      },
      text: {
        required,
        minLength: minLength(4),
      },
    },
  },

  methods: {
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        Api.createComment(this.commentData).then(() => {
          this.$parent.$parent.$emit("newCommentCreated"),
            (this.submitStatus = "OK");

          this.commentData = initialCommentData(this.post_id);
          setTimeout(() => {
            this.submitStatus = null;
          }, 2000);
        });
      }
    },
  },
};
</script>

<style scoped>
</style>