<template>
  <div class="row mt-4 mx-2 p-0">
    <Box
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :tasks="filtered[category.code]"
      @remove="remove"
      @edit="edit"
    ></Box>
    <Add @add="add"></Add>
    <Edit :editTask="editTask" @editDone="editDone"></Edit>
  </div>
</template>
<script>
let socket = io("https://kanban-darindra.herokuapp.com");
import { axios } from "../config/axios.js";
import Box from "./Box";
import Add from "./add";
import Edit from "./edit";
export default {
  name: "Home",
  components: {
    Box,
    Add,
    Edit
  },
  data() {
    return {
      tasks: [],
      categories: [
        { category: "Back Log", Color: "#44bee3", code: "backlog" },
        { category: "Todo", Color: "#ffb81f", code: "todo" },
        { category: "Done", Color: "#54d68c", code: "done" },
        { category: "Completed", Color: "#ed95aa", code: "completed" }
      ],
      editTask: ""
    };
  },
  created() {
    this.getData();
    socket.on("realtime-data", rtdata => {
      this.tasks = rtdata;
    });
  },
  computed: {
    filtered() {
      return {
        backlog: this.backlog,
        todo: this.todo,
        done: this.done,
        completed: this.completed
      };
    },
    backlog() {
      return this.tasks.filter(i => i.category === "Back Log");
    },
    todo() {
      return this.tasks.filter(i => i.category === "Todo");
    },
    done() {
      return this.tasks.filter(i => i.category === "Done");
    },
    completed() {
      return this.tasks.filter(i => i.category === "Completed");
    }
  },
  methods: {
    getData() {
      axios
        .get("/tasks", {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          socket.emit("show-data", data);
          data.sort((a, b) => a.updatedAt - b.updatedAt);
          this.tasks = data;
        })
        .catch(err => {});
    },
    remove(id) {
      this.tasks = this.tasks.filter(i => i.id !== id);
      socket.emit("show-data", this.tasks);
    },
    add(data) {
      this.tasks.push(data);
      socket.emit("show-data", this.tasks);
    },
    edit(data) {
      this.editTask = data;
    },
    editDone(obj) {
      this.remove(obj.id);
      let data = {
        id: obj.id,
        title: obj.data.title,
        description: obj.data.description,
        category: obj.data.category
      };
      this.tasks.push(data);
      socket.emit("show-data", this.tasks);
    }
  }
};
</script>