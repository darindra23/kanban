<template>
  <div>
    <b-modal id="edit" hide-footer title="Task">
      <form @submit.prevent="edit">
        <div class="form-group">
          <label>Title</label>
          <input v-model="title" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Description</label>
          <input v-model="description" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select v-model="categoryInput" class="form-control" required>
            <option>Back Log</option>
            <option>Todo</option>
            <option>Done</option>
            <option>Completed</option>
          </select>
        </div>
        <button type="submit" class="btn btn-warning">Submit</button>
      </form>
    </b-modal>
  </div>
</template>
<script>
import { axios, errorHandler } from "../config/axios";
export default {
  data() {
    return {
      id: "",
      title: "",
      description: "",
      categoryInput: ""
    };
  },
  props: ["editTask"],
  watch: {
    editTask() {
      this.title = this.editTask.title;
      this.description = this.editTask.description;
      this.categoryInput = this.editTask.category;
      this.id = this.editTask.id;
    }
  },
  methods: {
    edit() {
      let inputData = {
        title: this.title,
        description: this.description,
        category: this.categoryInput
      };
      axios
        .put(`/tasks/${this.id}`, inputData, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.$emit("editDone", { data: data.Data, id: this.id });
          this.$bvModal.hide("edit");
          this.$emit("add", data.Data);
        })
        .catch(err => {
          errorHandler(err);
        });
    }
  }
};
</script>