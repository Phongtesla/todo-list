import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    tasks: [],
    taskEdit: {},
    taskAdd: {
      id: null,
      title: "",
      desc: "",
      dueDate: null,
      priority: 2,
    },
    errors: {
      title: null,
      dueDate: null,
    },
    errorsUpdate: {
      title: null,
      dueDate: null,
    },
    checkedTasks: [],
    updateStatus: false,
  },
  getters: {
    tasks: (state) => state.tasks,
    taskEdit: (state) => state.taskEdit,
    taskAdd: (state) => {
      let today = new Date().toISOString().substr(0, 10);
      state.taskAdd.dueDate = today;
      return state.taskAdd;
    },
    checkedTasks: (state) => state.checkedTasks,
    errors: (state) => state.errors,
    errorsUpdate: (state) => state.errorsUpdate,
    updateStatus: (state) => state.updateStatus,
  },
  actions: {
    checkTask({ commit }, taskId) {
      commit("pushTaskId", taskId);
    },

    removeTask({ commit }, taskId) {
      commit("rmTask", taskId);
    },

    getTasks({ commit }, searchKey) {
      let tasks = JSON.parse(localStorage.getItem("taskList"));
      //filter by name
      if (searchKey) {
        tasks = tasks.filter((task) => task.title.indexOf(searchKey) != -1);
      }

      commit("setTasks", tasks);
    },

    addTask({ commit, dispatch }, task) {
      dispatch("validate", { task, type: "add" })
        .then((res) => {
          if (res) {
            commit("pushTask", task);
            commit("emptyErr", "add");
            commit("setTasks", null);
          }
        })
        .finally(() => {
          commit("emptyTask");
        });
    },

    updateTask({ commit, dispatch }, task) {
      dispatch("validate", { task, type: "update" })
        .then((res) => {
          if (res) {
            commit("setNewTaskInfo", task);
            commit("emptyErr", "update");
            commit("updateSuccess");
            // commit("setTasks", null);
          }
        })
        .finally(() => {
          commit("emptyTask");
        });
    },

    validate({ commit }, { task, type }) {
      // validate: title is required;  due date must be greater than today
      let title = task.title.trim();
      let dueDate = new Date(task.dueDate);
      let today = new Date();
      let checkDudate = dueDate.getTime() + 86400000 >= today.getTime();

      // create message when validate failed
      if (title == "" || checkDudate === false) {
        if (title == "") commit("assignErr", { type, msg: "title" });
        if (checkDudate === false)
          commit("assignErr", { type, msg: "duedate" });
        return false;
      }
      return true;
    },
  },
  mutations: {
    removeMultipleTasks(state, taskIds) {
      let taskList = JSON.parse(localStorage.getItem("taskList"));

      for (let i = taskIds.length - 1; i >= 0; i--) {
        let taskIndex = state.tasks.findIndex((task) => task.id === taskIds[i]);

        // remove on local storage
        taskList.splice(taskIndex, 1);

        // remove on state
        state.tasks.splice(taskIndex, 1);

      }
      // remove checked task on state
      state.checkedTasks = [];
      localStorage.setItem("taskList", JSON.stringify(taskList));
      // update state 
      state.tasks = JSON.parse(localStorage.getItem("taskList"));
    },

    pushTaskId(state, taskId) {
      //check existence of taskId in checked list. if not => push into array ids, if it is => rm from array
      let taskIdIndex = state.checkedTasks.findIndex(
        (taskIdChecked) => taskIdChecked == taskId
      );
      if (taskIdIndex != -1) {
        state.checkedTasks.splice(taskIdIndex, 1);
      } else {
        state.checkedTasks.push(taskId);
      }
    },

    setNewTaskInfo(state, newTask) {
      //update on local storage
      let tasks = JSON.parse(localStorage.getItem("taskList"));
      let taskIndexAtLocal = tasks.findIndex((task) => task.id === newTask.id);
      tasks.splice(taskIndexAtLocal, 1, newTask);
      // update on state
      let taskIndex = state.tasks.findIndex((task) => task.id === newTask.id);
      state.tasks.splice(taskIndex, 1, newTask);
      // update taskList on local storage
      localStorage.setItem("taskList", JSON.stringify(tasks));
    },
    rmTask(state, taskId) {
      let tasks = JSON.parse(localStorage.getItem("taskList"));
      let taskIndexAtLocal = tasks.findIndex((task) => task.id === taskId);
      // remove from local storage
      tasks.splice(taskIndexAtLocal, 1);
      // remove from state
      let taskIndex = state.tasks.findIndex((task) => task.id === taskId);
      state.tasks.splice(taskIndex, 1);
      
      // index of checked Tasks
      let indexOfcheckedTasks = state.checkedTasks.findIndex((id) => id === taskId);
      state.checkedTasks.splice(indexOfcheckedTasks, 1);
      // update taskList on local storage
      localStorage.setItem("taskList", JSON.stringify(tasks));
    },
    pushTask(state, task) {
      let tasks = JSON.parse(localStorage.getItem("taskList")) ?? [];
      let taskId =
        tasks.length > 0
          ? Math.max.apply(
              null,
              tasks.map((item) => item.id)
            ) + 1
          : 1;
      task.id = taskId;
      tasks.push(task);
      localStorage.setItem("taskList", JSON.stringify(tasks));
    },
    assignErr(state, { type, msg }) {
      if (type == "add") {
        if (msg == "title") {
          state.errors.title = "Title field is required";
        }
        if (msg == "duedate") {
          state.errors.dueDate =
            "The due date must be greater than or equal today";
        }
      }
      if (type == "update") {
        if (msg == "title") {
          state.errorsUpdate.title = "Title field is required";
        }
        if (msg == "duedate") {
          state.errorsUpdate.dueDate =
            "The due date must be greater than or equal today";
        }
      }
    },
    emptyErr(state, type) {
      if (type == "add") {
        state.errors.title = null;
        state.errors.dueDate = null;
      } else {
        state.errorsUpdate.title = null;
        state.errorsUpdate.dueDate = null;
      }
    },
    emptyTask(state) {
      state.taskAdd.title = "";
      state.taskAdd.desc = "";
      let today = new Date().toISOString().substr(0, 10);
      state.taskAdd.dueDate = today;
      state.taskAdd.priority = 2;
    },
    setTasks(state, tasks) {
      if (!tasks) {
        tasks = JSON.parse(localStorage.getItem("taskList")) ?? [];
      }
      if (tasks.length > 0) {
        tasks = tasks.sort((task1, task2) => {
          return new Date(task2.dueDate) - new Date(task1.dueDate);
        });
      }
      state.tasks = tasks;
    },
    setTaskEdit(state, task) {
      state.taskEdit = task;
    },
    updateSuccess(state) {
      state.updateStatus = true;
      setTimeout(() => {
        state.updateStatus = false;
      }, 3000);
    },
  },
});
