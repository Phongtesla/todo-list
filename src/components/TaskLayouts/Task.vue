<template>
  <div class="task-list__body--task">
    <div class="task-header d-flex">
      <div class="input-group d-flex">
        <input type="checkbox" :checked="checkedTasks.includes(task.id)" :value="task.id" @click="checkTask(task.id)"/>
        <p>{{ task.title }}</p>
      </div>
      <div class="task-actions d-flex">
        <button @click="showDetail = !showDetail" class="btn btn-detail">
          Detail
        </button>
        <button @click="removeTask(task.id)" class="btn btn-remove">
          Remove
        </button>
      </div>
    </div>
    <div v-if="showDetail" class="task-detail">
      <form-edit :task="task"></form-edit>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import FormEdit from "./FormEdit.vue";
export default {
  props: ["task"],
  components: {
    FormEdit,
  },
  data() {
    return {
      showDetail: false,
    };
  },
    computed: {
    ...mapGetters(["checkedTasks"]),
  },
  methods: {
    ...mapActions(["removeTask", "checkTask"]),
  },
};
</script>

<style scoped >
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
