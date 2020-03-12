const USER_URL = "https://kanban-darindra.herokuapp.com/user";
const BASE_URL = "https://kanban-darindra.herokuapp.com/tasks";
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

let page = {
  login: 0,
  register: 1,
  home: 2
};
const app = new Vue({
  el: "#app",
  data: {
    page: 0,
    tasks: [],
    email_login: "",
    password_login: "",
    fullname_register: "",
    email_register: "",
    password_register: ""
  },
  created() {
    if (localStorage.access_token) {
      this.getTask();
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
        this.getTask();
        this.page = 2;
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
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
    async getTask() {
      try {
        let { data } = await axios.get(`${BASE_URL}`, {
          headers: {
            access_token: localStorage.access_token
          }
        });
        this.tasks = data;
      } catch (error) {
        this.errorHandler(error);
      }
    },
    async remove(id) {
      try {
        let result = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        });
        if (result.value) {
          let deleted = await axios.delete(`${BASE_URL}/${id}`, {
            headers: {
              access_token: localStorage.access_token
            }
          });
          this.getTask();
          Toast.fire({
            icon: "success",
            title: "Succesfully deleted tasks."
          });
        }
      } catch (error) {
        this.errorHandler(error);
      }
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
