<template>
  <div class="todo-list container d-flex">
    <add-task></add-task>
    <task-list></task-list>
  </div>
</template>

<script>
import AddTask from './TaskLayouts/AddTask.vue';
import TaskList from './TaskLayouts/TaskList.vue';
export default {
  components:{
    AddTask,
    TaskList
  }
}
</script>

<style scoped>
.todo-list{
  border: 1px solid;
  min-height: 600px;
}
</style>
