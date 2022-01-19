<template>
  <div class="task-list container">
    <h2>Task List</h2>
    <div class="task-list__body">
      <input type="text" placeholder="Search..." required v-model="searchKey" />

      <Task
        v-for="(task, index) in tasks"
        :key="index"
        class="task-list__body--task"
        :task="task"
      >
      </Task>
      <p v-if="tasks.length == 0">have no task</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Task from "./Task.vue";
export default {
  components: {
    Task,
  },
  data() {
    return {
      showDetail: false,
      searchKey: "",
    };
  },
  created() {
    this.getTasks();
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    ...mapActions(["getTasks", "removeTask"]),
  },
  watch: {
    searchKey() {
      this.getTasks(this.searchKey);
    },
  },
};
</script>

<style scoped >
.task-list {
  width: 50%;
}
.task-list h2 {
  margin-top: 10px;
  font-weight: 900;
  font-size: 30px;
}
.task-list__body {
  margin-top: 40px;
  padding: 0 30px;
}
.task-list__body > input {
  width: 100%;
  padding: 5px;
  font-size: 15px;
  height: 35px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-bottom: 15px;
}
</style>
