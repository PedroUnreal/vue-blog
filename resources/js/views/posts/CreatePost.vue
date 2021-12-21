<template>
  <div class="card">
    <form @submit.prevent="submit" class="card-body">
      <h2 class="card-title">Добавить новый пост</h2>
      <div class="form-group">
        <label class="form__label form-label">Заголовок</label>
        <input
          name="title"
          class="form__input form-control"
          v-model.trim="$v.postData.title.$model"
        />

        <div class="text-danger" v-if="!$v.postData.title.required">Поле обязательно для заполнения</div>
        <div class="text-danger" v-if="!$v.postData.title.minLength">
         Заголовок должен содержать как минимум {{ $v.postData.title.$params.minLength.min }} символа
        </div>
      </div>

      <div
        class="form-group"
      >
        <label class="form__label form-label">Описание</label>
        <textarea
          name="description"
          class="form__input form-control"
          rows="5"
          v-model.trim="$v.postData.description.$model"
        />
        <div class="text-danger" v-if="!$v.postData.description.required">
          Поле обязательно для заполнения
        </div>
        <div class="text-danger" v-if="!$v.postData.description.minLength">
          Описание должно содержать как минимум 
          {{ $v.postData.description.$params.minLength.min }} символов
        </div>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
        :disabled="submitStatus === 'PENDING'"
      >
        Опубликовать
      </button>
      <p v-if="submitStatus === 'OK'" class="alert alert-success mt-4">Пост опубликован!</p>
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

const initialPostData = () => ({
  title:'',
  description: '',
});

export default {
  name: "CreatePost",
  data() {
    return {
      postData: initialPostData(),
      submitStatus: null,
    };
  },
  validations: {
    postData: {
      title: {
        required,
        minLength: minLength(4),
      },
      description: {
        required,
        minLength: minLength(10),
      },
    }
  },

  methods: {
    submit() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";

        Api.createPost(this.postData).then(() => {
          this.$parent.$emit("newPostCreated");
          this.submitStatus = "OK";

          this.postData = initialPostData();
          setTimeout(() => {
            this.submitStatus = null;
          }, 2000);
        });
      }
    },
  },
};
</script>