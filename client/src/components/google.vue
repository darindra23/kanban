<template>
  <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
    <img src="/src/images/icon-google.png" alt="GOOGLE" />
    Google
  </g-signin-button>
</template>
<script>
import { axios, errorHandler } from "../config/axios";
export default {
  data() {
    return {
      googleSignInParams: {
        client_id:
          "15356276756-1669tk11klb2cnjp4voovpuo04rlc657.apps.googleusercontent.com"
      }
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios.post("/user/google", { id_token }).then(({ data }) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("fullname", data.fullname);
        this.$emit("google", { value: 2 });
      });
    },
    onSignInError(error) {
      errorHandler(error);
    }
  }
};
</script>
<style>
.g-signin-button {
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-family: Raleway-Bold;
  font-size: 16px;
  line-height: 1.2;
  color: #555555;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  cursor: pointer;

  -webkit-transition: all 0.4s;
  -o-transition: all 0.4s;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
}
.g-signin-button:hover {
  border-color: #d33f8d;
}
.g-signin-button img {
  width: 19px;
  margin-right: 10px;
  padding-bottom: 1px;
}
</style>