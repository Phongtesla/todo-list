<template>
  <div class="task-list">
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
    <div v-if="checkedTasks.length > 0" class="task-list__bulk-action d-flex">
      <div class="input-group d-flex">
        <p>Bulk action</p>
      </div>
      <div class="task-actions d-flex">
        <button class="btn btn-detail">Done</button>
        <button
          @click="removeMultipleTasks(checkedTasks)"
          class="btn btn-remove"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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
    ...mapGetters(["tasks", "checkedTasks"]),
  },
  methods: {
    ...mapActions(["getTasks"]),
    ...mapMutations(["removeMultipleTasks"])
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
  width: 100%;
  border-left: 1px solid #8f8686;
  position: relative;
}
.task-list h2 {
  margin-top: 10px;
  font-weight: 900;
  font-size: 30px;
}
.task-list__body {
  margin-top: 40px;
  padding: 0 30px;
  padding: 0 30px 71px 30px;
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
.task-list__bulk-action {
  color: white;
  background-color: gray;
  align-items: center;
  justify-content: space-between;
  padding: 20px 5px;
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
