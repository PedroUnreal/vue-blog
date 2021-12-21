
<template>
  <div class="pagination">
    <span class="control" v-on:click="setCurrentPage(1)"> {{ ">>" }} </span>
    <span class="control" v-on:click="setCurrentPage(currentPage > 1 ?  currentPage - 1 : currentPage)"> &nbsp; {{">"}} </span>

    <span v-for="(number, index) of shownPagesNumbers" :key="index">
      <span v-on:click="setCurrentPage(number)">
       &nbsp;  {{ number }} &nbsp;
      </span>
    </span>
    <span class="control" v-on:click="setCurrentPage(currentPage < totalPages ?  currentPage + 1 : currentPage)"> &nbsp; > &nbsp; </span>
    <span class="control" v-on:click="setCurrentPage(totalPages)"> >> </span>
  </div>
</template>

<script>
export default {
  name: "Paginator",
  props: {
    totalPages: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      default: 0,
    },
  },
  methods:{
    setCurrentPage(currentPage){
      this.$emit("setCurrentPage", currentPage)
    }
  },
  computed: {
    shownPagesNumbers() {
      if (this.currentPage <= 3) {
        if (this.totalPages < 5) {
          return Array(this.totalPages)
            .fill(null)
            .map((item, index) => item = (index +1 ));
        }

        return [1, 2, 3, 4, 5];
      }

      if (this.currentPage >= this.totalPages - 2) {
        return [
          this.totalPages - 4,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
          this.totalPages,
        ];
      }

      return [
        this.currentPage - 2,
        this.currentPage - 1,
        this.currentPage,
        this.currentPage + 1,
        this.currentPage + 2,
      ];
    },
  },
};
</script>

<style>
.pagination {
  height: 48px;
  width: 100%;
  border-bottom: 1px solid #c8cacc;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.control {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}


.control:hover {
  cursor: pointer;
}

.control.active {
  color: cornflowerblue;
  background: ivory;
  border: 1px solid #c8cacc;
  border-radius: 6px;
}
</style>
