<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo" />
        <MyList :todos="todos" />
        <MyFooter
          :todos="todos"
          @checkAllTodo="checkAllTodo"
          @clearAllTodo="clearAllTodo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pubsub from "pubsub-js";
import axios from "axios";
import qs from 'qs'

import { mapState, mapGetters } from "vuex";

import MyHeader from "./components/MyHeader";
import MyFooter from "./components/MyFooter";
import MyList from "./components/MyList";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
    MyList,
  },
  data() {
    return {
      todos: [],
    };
  },
  computed: {
    // ...mapState({sum:'sum'}),
    ...mapState("about", ["sum"]),

    ...mapGetters("about", ["testSum"]),
  },
  created() {
    this.getData();
  },
  methods: {
    //通过axios从后端获取数据
    getData() {
      axios.get("http://localhost:10086/todolist/todo-list").then(
        (res) => {
          this.todos = res.data.list;
          // console.log(this.todos);
        },
        (error) => {}
      );
    },

    //添加一个todo
    addTodo(x) {
      var json = JSON.stringify(x);

      axios.post("http://localhost:10086/todolist/todo-list", json).then(
        (res) => {
          this.getData()
        },
        (error) => {}
      );

      this.todos.unshift(x);

      //-----测试vuex-----
      // console.log("读取vuex中的数据：", this.$store.state.about.sum);

      // console.log('读取getters中的数据：',this.$store.about.getter.testSum)
    },
    //取消勾选一个todo
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (id === todo.id) {
          if (todo.done === 0) {
            todo.done = 1;
          } else if(todo.done === 1) {
            todo.done = 0;
          }
          axios.put(`http://localhost:10086/todolist/todo-list/`, todo).then(
            (res) => {},
            (error) => {}
          );
        }
      });

      //-----测试vuex-----
      // console.log("修改vuex中的数据：");
      this.$store.dispatch("about/test", 2);
    },
    deleteTodo(_, id) {
      axios.delete(`http://localhost:10086/todolist/todo-list/${id}`).then(
        (res) => {},
        (error) => {}
      );

      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    updateTodo(id, title) {
      var todo ={id:id,title:title}
      var json=JSON.stringify(todo)
      axios.put(`http://localhost:10086/todolist/todo-list/`,json).then(
        (res) => {
          this.getData()
        },
        (error) => {}
      );
     
    },
    checkAllTodo(done) {
      this.todos.forEach((todo) => {
        todo.done = done;
      });
    },
    clearAllTodo() {
      var ids=[]
      this.todos.forEach((todo) => {
        if(todo.done===1){
          ids.push(todo.id)
        }
      });
      console.log(ids)

      axios.delete(`http://localhost:10086/todolist/todo-list/batch/`,{
        params:{
          ids:ids
        },
        paramsSerializer: params =>{
          return qs.stringify(params,{
            indices:false
          })
        }
      }).then(
        (res) => {
          this.getData()
        },
        (error) => {}
      );
      
    },
  },
  watch: {
    // todos(value){
    //   localStorage.setItem('todos',JSON.stringify(value))
    // }

    //深度监视，可以监视对象里面的数据变化
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    //绑定事件总线
    this.$bus.$on("checkTodo", this.checkTodo);
    // this.$bus.$on('deleteTodo',this.deleteTodo)
    this.$bus.$on("updateTodo", this.updateTodo);

    //订阅与发布
    this.pubId = Pubsub.subscribe("deleteTodo", this.deleteTodo);
  },
  beforeDestroy() {
    //解绑事件总线
    this.$bus.$off("checkTodo");
    // this.$bus.$off('deleteTodo')
    this.$bus.$off("updateTodo");

    //取消订阅
    Pubsub.unsubscribe(this.pubId);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: burlywood;
  border: 1px solid burlywood;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
