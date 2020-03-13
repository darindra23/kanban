<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-l-50 p-r-50 p-t-30 p-b-30" style="background-color: #f0f0f0;">
        <div class="d-flex justify-content-center">
          <img src="/src/images/logo.png" width="80px" />
        </div>
        <form class="login100-form validate-form" @submit.prevent="register">
          <span class="login100-form-title p-b-15 p-t-15">Register</span>

          <div class="wrap-input100 validate-input m-b-16">
            <input
              class="input100"
              type="text"
              name="fullname-register"
              placeholder="Fullname"
              v-model="fullname"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <span class="lnr lnr-user"></span>
            </span>
          </div>

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
            <button class="login100-form-btn" type="submit">Sign Up</button>
          </div>

          <div class="text-center w-full p-t-30 p-b-22">
            <span class="txt1" style="margin-left: 5px;">Or register with</span>
          </div>
          <Google @google="google"></Google>
          <div class="text-center w-full p-t-30">
            <span class="txt1">Already have an account?</span>

            <a class="txt1 bo1 hov1" style="cursor:pointer;" @click.prevent="loginForm">Sign in</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { axios, errorHandler } from "../config/axios.js";
import Google from "./google";
export default {
  name: "Register",
  components: {
    Google
  },
  data() {
    return {
      fullname: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      let inputData = {
        fullname: this.fullname,
        email: this.email,
        password: this.password
      };
      axios.post("/user/register", inputData)
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          this.$emit("register");
        })
        .catch(err => {
          errorHandler(err);
        });
    },
    loginForm() {
      this.$emit("changePage", { value: 0 });
    },
    google(data) {
      this.$emit("google", data);
    }
  }
};
</script>