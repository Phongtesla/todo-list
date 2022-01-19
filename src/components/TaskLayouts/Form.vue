<template>
  <form class="form">
    <div class="form-group form__task-name">
      <input type="text" placeholder="Add new task..." required />
    </div>
    <div class="form-group form__task-desc d-flex flex-col">
      <label for="desc">Description</label>
      <textarea id="desc" cols="30" rows="10"></textarea>
    </div>
    <div class=" form__task-status d-flex">
      <div class="form-group form__task-status--due-date d-flex flex-col">
        <label for="due-date">Due Date</label>
        <input type="date" required />
      </div>
      <div class="form-group form__task-status--piority d-flex flex-col">
        <label for="piority">Piority</label>
        <select name="" id="piority">
          <option value="3">Low</option>
          <option selected value="2">Normal</option>
          <option value="1">High</option>
        </select>
      </div>
    </div>
    <div class="form-group form__add-btn">
      <button v-if="this.type == 'update'" class="btn btn-update">Update</button>
      <button v-else class="btn btn-add">Add New</button>
    </div>
  </form>
</template>

<script>
export default {
  props:['type']
};
</script>

<style scoped >
.form-group{
  margin-bottom: 15px;
}

.form-group label{
  text-align: left;
  font-weight: bold;
  margin-bottom: 5px;
}
.form-group input, .form-group select{
  width: 100%;
  padding: 5px;
  font-size: 15px;
  height: 35px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
.form__task-status{
  justify-content: space-between;
}
.form__task-status--due-date, .form__task-status--piority{
  width: 45%;
}

</style>
