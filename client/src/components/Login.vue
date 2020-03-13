<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-l-50 p-r-50 p-t-30 p-b-30" style="background-color: #f0f0f0;">
        <div class="d-flex justify-content-center">
          <img src="/src/images/logo.png" alt width="80px" />
        </div>
        <form class="login100-form validate-form" @submit.prevent="login">
          <span class="login100-form-title p-b-15 p-t-15">Login</span>

          <div
            class="wrap-input100 validate-input m-b-16"
            data-validate="Valid email is required: ex@abc.xyz"
          >
            <input class="input100" type="text" name="email" placeholder="Email" v-model="email" />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <span class="lnr lnr-envelope"></span>
            </span>
          </div>

          <div class="wrap-input100 validate-input m-b-16" data-validate="Password is required">
            <input
              class="input100"
              type="password"
              name="pass"
              placeholder="Password"
              v-model="password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <span class="lnr lnr-lock"></span>
            </span>
          </div>

          <div class="container-login100-form-btn p-t-25">
            <button class="login100-form-btn" type="submit">Login</button>
          </div>

          <div class="text-center w-full p-t-30 p-b-22">
            <span class="txt1" style="margin-left: 5px;">Or login with</span>
          </div>
          <Google @google="google"></Google>
          <div class="text-center w-full p-t-30">
            <span class="txt1">Not a member?</span>
            <a
              class="txt1 bo1 hov1"
              style="cursor:pointer;"
              @click.prevent="registerForm"
            >Sign up now</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { axios, errorHandler } from "../config/axios.js";
import Google from "./google";
import Swal from "sweetalert2";
export default {
  components: {
    Google
  },
  name: "Login_page",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      let inputData = {
        email: this.email,
        password: this.password
      };
      axios
        .post("/user/login", inputData)
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("fullname", data.fullname);
          this.$emit("login", { value: 2 });
        })
        .catch(error => {
          if (error.response.status === 404) {
            Swal.fire({
              icon: "error",
              title: "Invalid Email / Password !"
            });
          } else if (error.response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Invalid Email / Password !"
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!"
            });
          }
        });
    },
    registerForm() {
      this.$emit("changePage", { value: 1 });
    },
    google(data) {
      this.$emit("google", data);
    }
  }
};
</script>