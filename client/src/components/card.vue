<template>
  <div class="card m-2 mb-2" style="box-shadow: 2px 2px 2px 2px grey; cursor:pointer;">
    <div class="card-body" v-b-modal.edit @click="edit">
      <h5 class="mb-1 text-dark">
        <strong>{{task.title}}</strong>
      </h5>
      <p class="card-text">{{task.description}}</p>
    </div>
    <span
      class="lnr lnr-trash ml-auto mr-3 mb-3"
      style="color: black; cursor: pointer;"
      @click.prevent="remove(task.id)"
    ></span>
  </div>
</template>
<script>
import { axios, errorHandler } from "../config/axios.js";
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
  props: ["task", "category"],
  methods: {
    remove(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`/tasks/${id}`, {
              headers: {
                access_token: localStorage.access_token
              }
            })
            .then(({ data }) => {
              Toast.fire({
                icon: "success",
                title: "Task deleted successfully."
              });
              this.$emit("remove", id);
            })
            .catch(err => {
              errorHandler(err);
            });
        }
      });
    },
    edit() {
      this.$emit("edit", this.task);
    }
  }
};
</script>