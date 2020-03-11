const USER_URL = "https://kanban-darindra.herokuapp.com/user";
const BASE_URL = "https://kanban-darindra.herokuapp.com/tasks";
let page = {
  login: 0,
  register: 1,
  home: 2
};
const app = new Vue({
  el: "#app",
  data: {
    page: 0,
    email_login: "",
    password_login: "",
    fullname_register: "",
    email_register: "",
    password_register: ""
  },
  created() {
    if (localStorage.access_token) {
      this.page = 2;
    }
  },
  methods: {
    async login() {
      try {
        let inputData = {
          email: this.email_login,
          password: this.password_login
        };
        let { data } = await axios.post(`${USER_URL}/login`, inputData);
        localStorage.setItem("access_token", data.access_token);
        this.page = 2;
      } catch (error) {
        this.errorHandler(error);
      }
    },
    async register() {
      try {
        let inputData = {
          fullname: this.fullname_register,
          email: this.email_register,
          password: this.password_register
        };
        let { data } = await axios.post(`${USER_URL}/register`, inputData);
        localStorage.setItem("access_token", data.access_token);
        this.page = 2;
      } catch (error) {
        this.errorHandler(error);
      }
    },
    onSignIn(googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    },
    errorHandler(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    },
    loginForm() {
      this.page = 0;
    },
    registerForm() {
      this.page = 1;
    }
  }
});
