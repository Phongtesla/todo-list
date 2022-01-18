<template>
  <div class="add-form container">
    <h2>New Task</h2>
    <Form :type="'add'"></Form>
  </div>
</template>

<script>
import Form from "./TaskLayouts/Form.vue";
export default {
  components: {
    Form,
  },
};
</script>

<style scoped >
.add-form {
  border: 1px solid #8f8686;
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
