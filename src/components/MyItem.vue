<template>
  
    <li>
      <label>
        <input
          type="checkbox"
          :checked="todo.done===1"
          @change="handleCheck(todo)"
        />

        <span v-show="!todo.isEdit">{{ todo.title }}</span>
        <input
          v-show="todo.isEdit"
          type="text"
          :value="todo.title"
          @blur="handleBlur(todo, $event)"
          ref="inputTitle"
        />
      </label>

      <button class="btn btn-danger" @click="handleDelete(todo.id)">
        删除
      </button>
      <button
        class="btn btn-edit"
        @click="handleEdit(todo)"
        v-show="!todo.isEdit"
      >
        编辑
      </button>
    </li>
  
</template>

<script>
import Pubsub from "pubsub-js";

import "animate.css";

export default {
  name: "MyItem",

  props: ["todo"],

  methods: {
    handleCheck(todo) {
      //通知App组件将对应的todo对象的done值取反
      // todo.done=!todo.done
      this.$bus.$emit("checkTodo", todo.id);
    },
    //删除
    handleDelete(id) {
      // this.$bus.$emit('deleteTodo',id)
      Pubsub.publish("deleteTodo", id);
    },
    //编辑
    handleEdit(todo) {
      if (todo.hasOwnProperty("isEdit")) {
        todo.isEdit = true;
      } else {
        this.$set(todo, "isEdit", true);
      }
      //拿到输入框，获取焦点  (nextTick---数据改变后，基于更新后的新DOM执行回调)
      this.$nextTick(function () {
        // console.log(this);
        this.$refs.inputTitle.focus();
      });
    },
    //失去焦点，回调--真正执行修改逻辑
    handleBlur(todo, e) {
      todo.isEdit = false;
      if (!e.target.value.trim()) {
        return alert("输入不能为空");
      }
      this.$bus.$emit("updateTodo", todo.id, e.target.value);
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>