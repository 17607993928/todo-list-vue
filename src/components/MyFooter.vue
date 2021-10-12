<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isAll" />
    </label>

    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ todos.length }}
    </span>

    <button class="btn btn-danger" @click="clearTodo()">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  // props: ["todos","checkAllTodo","clearAllTodo"],
  props: ["todos"],
  computed: {
    doneTotal() {
      let i = 0;
      this.todos.forEach((todo) => {
        if (todo.done === 1) {
          i++;
        }
      });
      return i;
    },
    total() {
      return this.todos.length;
    },
    isAll: {
      get() {
        return this.doneTotal === this.total && this.total > 0
      },
      set(value) {
        // this.checkAllTodo(value)
        this.$emit("checkAllTodo", value?1:0);
      },
    },
  },
  methods: {
    clearTodo() {
      // this.clearAllTodo()
      this.$emit("clearAllTodo");
    },
  },
};
</script>

<style scoped>
/*footer*/

.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>