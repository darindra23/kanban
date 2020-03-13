<template>
  <div>
    <b-modal id="add" hide-footer title="Task">
      <form @submit.prevent="add">
        <div class="form-group">
          <label>Title</label>
          <input v-model="input.title" type="text" class="form-control" required />
        </div>
        <div class="form-group">
          <label>Description</label>
          <input v-model="input.description" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select v-model="input.categoryInput" class="form-control" required>
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
      input: {
        title: "",
        description: "",
        categoryInput: ""
      }
    };
  },
  methods: {
    add() {
      let inputData = {
        title: this.input.title,
        description: this.input.description,
        category: this.input.categoryInput
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
          this.resetModalData();
          Toast.fire({
            icon: "success",
            title: "Task created successfully."
          });
        })
        .catch(err => {
          errorHandler(err);
        });
    },
    resetModalData() {
      let stringDefault = "";
      let numberDefault = 0;
      let booleanDefault = false;
      Object.keys(this.input).forEach(key => {
        if (typeof this.input[key] === "number") {
          this.input[key] = numberDefault;
        } else if (typeof this.input[key] === "boolean") {
          this.input[key] = booleanDefault;
        } else {
          this.input[key] = stringDefault;
        }
      });
    }
  }
};
</script>