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
  created() {
    this.getData();
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
          this.tasks = data;
        })
        .catch(err => {
          errorHandler(err);
        });
    },
    remove(id) {
      this.tasks = this.tasks.filter(i => i.id !== id);
      console.log(id);
    },
    add(data) {
      this.tasks.push(data);
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
    }
  }
};
</script>