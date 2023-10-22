import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import useTodoApi from "../service/useTodoApi";
export const useTodoStore = defineStore("todos", () => {
  const todayTasks = ref([]);
  const tomorrowTasks = ref([]);
  const otherTasks = ref([]);
  const allTasks = ref([]);

  const getAllTodos = () => {
    useTodoApi.getAll().then((res) => {
      allTasks.value = res.data;
    });
  };
  todayTasks.value = computed(() => {
    return allTasks.value.filter((el) => el.category === "today");
  });

  tomorrowTasks.value = computed(() => {
    return allTasks.value.filter((el) => el.category === "today");
  });
  otherTasks.value = computed(() => {
    return allTasks.value.filter((el) => el.category === "today");
  });

  const addTodayTask = (data) => {
    useTodoApi.addTodo(data);
    todayTasks.value = [...todayTasks.value, data];
  };
  const addTomorrowTask = (data) => {
    useTodoApi.addTodo(data);
    tomorrowTasks.value = [...todayTasks.value, data];
  };
  const addOtherTask = (data) => {
    useTodoApi.addTodo(data);
    otherTasks.value = [...todayTasks.value, data];
  };
  onMounted(() => {
    getAllTodos();
    console.log(todayTasks.value);
    console.log(tomorrowTasks.value);
    console.log(otherTasks.value);
  });

  return {
    todayTasks,
    otherTasks,
    tomorrowTasks,
    addTodayTask,
    addTomorrowTask,
    addOtherTask,
  };
});
