<template>
  <div class="task-list container">
    <h2>Task List</h2>
    <div class="task-list__body">
      <input type="text" placeholder="Search..." required v-model="searchKey"/>
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="task-list__body--task"
      >
        <div class="task-header d-flex">
          <div class="input-group d-flex">
            <input type="checkbox" />
            <p>{{ task.title }}</p>
          </div>
          <div class="task-actions d-flex">
            <button @click="showDetail = !showDetail" class="btn btn-detail">
              Detail
            </button>
            <button class="btn btn-remove">Remove</button>
          </div>
        </div>
        <div v-if="showDetail" class="task-detail">
          <Form :type="'update'" :taskEdit="task"></Form>
        </div>
      </div>
      <p v-if="tasks.length == 0">have no task</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Form from "./Form.vue";
export default {
  components: {
    Form,
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
    ...mapActions(["getTasks"]),
  },
  watch:{
    searchKey(){
      this.getTasks(this.searchKey);
    }
  }
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
.input-group {
  align-items: center;
}
.input-group input {
  margin: 0 10px 1px 0;
}
.task-list__body--task {
  margin-bottom: 15px;
}
.task-header {
  width: 100%;
  height: 70px;
  border: 1px solid #ced4da;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
}
.task-detail form {
  border: 1px solid #ced4da;
}
</style>
