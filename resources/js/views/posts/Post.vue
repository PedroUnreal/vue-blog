<template>
  <div class="mb-3 pt-2 pb-2">
    <h2 :class="{ lead: !listMode }">{{ post.title }}</h2>

    <div v-if="listMode">{{ post.description }}</div>
    <div v-else>{{ post.description.substring(0, 1000) }}</div>

    <div class="mt-2">
      <div class="text-muted">Cоздан: {{ createdDate }}</div>
      <div class="text-muted">Обновлен: {{ updatedDate }}</div>
    </div>
  </div>
</template>

<script>
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default {
  name: "Post",
  props: { post: Object, listMode: Boolean },
  computed: {
    createdDate() {
      return formatDate(this.post.created_at);
    },
    updatedDate() {
      return formatDate(this.post.updated_at);
    },
  },
};
</script>

<style scoped>
</style>
