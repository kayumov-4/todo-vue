import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import useTodoApi from "../service/useTodoApi";
const useTodoStore = defineStore("todos", () => {
  const allTasks = ref([]);
  const addTodo = (todo) => {
    allTasks.value.push(todo);
  };
  const todayTasks = computed(() => {
    return allTasks.value.filter((el) => el.category === "today");
  });

  const tomorrowTasks = computed(() => {
    return allTasks.value.filter((el) => el.category === "tomorrow");
  });

  const otherTasks = computed(() => {
    return allTasks.value.filter((el) => el.category === "others");
  });
  const fetchTodos = async () => {
    try {
      const response = await useTodoApi.getAll();
      allTasks.value = response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  onMounted(() => {
    fetchTodos();
  });
  return {
    todayTasks,
    otherTasks,
    tomorrowTasks,
    addTodo,
    fetchTodos,
  };
});

export default useTodoStore;
