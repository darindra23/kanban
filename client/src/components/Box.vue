<template>
  <div
    class="col m-2 text-white rounded"
    style="height:100%; overflow : auto;"
    :style="{'background-color': category.Color}"
  >
    <div class="ml-3 mb-3 mt-3 d-flex" :style="{'background-color': category.Color}">
      <h5>{{category.category}}</h5>
      <span v-b-modal.add class="lnr lnr-file-add ml-auto" style="cursor: pointer;"></span>
    </div>
    <!-- START CARD -->
    <Card
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :category="category.category"
      @remove="remove"
      @edit="edit"
    ></Card>
    <!-- END OF CARD -->
    <div class="card-footer mt-4" :style="{'background-color': category.Color}"></div>
  </div>
</template>
<script>
import Card from "./card";
export default {
  name: "Box",
  components: {
    Card
  },
  props: ["category", "tasks"],
  methods: {
    remove(id) {
      this.$emit("remove", id);
    },
    edit(data) {
      this.$emit("edit", data);
    }
  }
};
</script>