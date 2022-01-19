import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tasks: [],
    task: {
      title: "",
      desc: "",
      dueDate: null,
      priority: 2,
    },
    errors: {
      title: null,
      dueDate: null,
    },
    checkedTasks: {},
  },
  getters: {
    tasks: (state) => state.tasks,
    task: (state) => {
      let today = new Date().toISOString().substr(0, 10);
      state.task.dueDate = today;
      return state.task;
    },
    checkedTasks: (state) => state.checkedTasks,
    errors: (state) => state.errors,
  },
  actions: {
    addTask({ commit, dispatch }, task) {
      dispatch("validate", task)
        .then((res) => {
          console.log(res);
          if (res) {
            commit("pushTask", task);
            commit("emptyErr");
          }
        })
        .finally(() => {
          commit("emptyTask");
        });
    },
    validate({ commit }, task) {
      // validate: title is required;  due date must be greater than today
      let title = task.title.trim();
      let dueDate = new Date(task.dueDate);
      let today = new Date();
      let checkDudate = dueDate.getTime() + 86400000 >= today.getTime();

      if (title == "" || checkDudate === false) {
        if (title == "") commit("assignErr", "title");
        if (checkDudate === false) commit("assignErr", "duedate");
        return false;
      }
      return true;
      // create message when validate failed
    },
  },
  mutations: {
    pushTask(state, task) {
      let tasks = JSON.parse(localStorage.getItem("taskList")) ?? [];
      tasks.push(task);
      localStorage.setItem("taskList", JSON.stringify(tasks));
      // add task in state
      state.tasks.push(task);
    },
    assignErr(state, type) {
      if (type == "title") {
        state.errors.title = "Title field is required";
      }
      if (type == "duedate") {
        state.errors.dueDate =
          "The due date must be greater than or equal today";
      }
    },
    emptyErr(state) {
      state.errors.title = null;
      state.errors.dueDate = null;
    },
    emptyTask(state) {
      state.task.title = "";
      state.task.desc = "";
      let today = new Date().toISOString().substr(0, 10);
      state.task.dueDate = today;
      state.task.priority = 2;
    },
  },
});
