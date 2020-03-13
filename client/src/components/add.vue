<template>
  <div>
    <b-modal id="add" hide-footer title="Task">
      <form @submit.prevent="add">
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
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
export default {
  data() {
    return {
      title: "",
      description: "",
      categoryInput: ""
    };
  },
  methods: {
    add() {
      let inputData = {
        title: this.title,
        description: this.description,
        category: this.categoryInput
      };
      axios
        .post("/tasks", inputData, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.$bvModal.hide("add");
          this.$emit("add", data.Data);
          this.title = "";
          this.description = "";
          this.inputData = "";
          Toast.fire({
            icon: "success",
            title: "Task created successfully."
          });
        })
        .catch(err => {
          errorHandler(err);
        });
    }
  }
};
</script>