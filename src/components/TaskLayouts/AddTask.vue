<template>
  <div class="add-form ">
    <h2>New Task</h2>
    <form-add :type="'add'"></form-add>
  </div>
</template>

<script>
import FormAdd from './FormAdd.vue';
export default {
  components: {
    FormAdd,
  },
};
</script>

<style scoped >
.add-form {
  width: 40%;
}
.add-form > form {
  padding: 0 30px;
  margin-top: 40px;
}
.add-form h2 {
  margin-top: 10px;
  font-weight: 900;
  font-size: 30px;
}
</style>
