
<template>
  <div class="pagination">
    <span class="control" v-on:click="setCurrentPage(0)">{{"<<"}}</span>
    <span class="control" v-on:click="setCurrentPage(currentPage > 0 ?  currentPage - 1 : 0)">&nbsp;{{"<"}}&nbsp;</span>

    <span v-for="number of shownPagesNumbers" :key="number" v-on:click="setCurrentPage(number)" class="control" :class="{'activePage' : number === currentPage}">
      {{ number + 1 }}
    </span>

    <span class="control" v-on:click="setCurrentPage(currentPage < totalPages-1 ? currentPage + 1 : currentPage)">&nbsp;>&nbsp;</span>
    <span class="control" v-on:click="setCurrentPage(totalPages-1)"> >> </span>
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
            .map((item, index) => item = index );
        }

        return [0, 1, 2, 3, 4];
      }

      if (this.currentPage >= this.totalPages - 2) {
        return [
          this.totalPages - 5,
          this.totalPages - 4,
          this.totalPages - 3,
          this.totalPages - 2,
          this.totalPages - 1,
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

  user-select: none;
}

.control {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  text-align: center;
  border: 1px solid transparent;
}


.control:hover {
  cursor: pointer;
}

.activePage {
  color: cornflowerblue;
  background: ivory;
  border: 1px solid #c8cacc;
  border-radius: 6px;
}
</style>
