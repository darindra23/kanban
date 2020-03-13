<template>
  <div>
    <Login v-if="page===0" @login="changePage" @google="changePage" @changePage="changePage"></Login>
    <Register v-if="page===1" @register="changePage" @google="changePage" @changePage="changePage"></Register>
    <Navbar v-if="page===2" @signOut="changePage"></Navbar>
    <Home v-if="page===2"></Home>
  </div>
</template>

<script>
import Axios from "axios";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/home";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
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
  components: {
    Navbar,
    Login,
    Register,
    Home
  },
  data() {
    return {
      page: 0
    };
  },
  created() {
    if (localStorage.access_token) {
      this.page = 2;
    }
  },
  methods: {
    changePage(page) {
      this.page = page.value;
      if (page.value === 2) {
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
      }
    }
  }
};
</script>