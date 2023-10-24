<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import useTodoStore from "./store/useTodoStore";
import TaskItem from "./components/TaskItem.vue";
import useTodoApi from "./service/useTodoApi";

const inputVal = ref("");
const store = useTodoStore();
const { todayTasks, otherTasks, tomorrowTasks } = storeToRefs(store);
const { addTodo } = store;
const addTodoFunc = () => {
  if (inputVal.value.trim().length > 0) {
    const regexExp = new RegExp(
      /(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/gi
    );
    const newTodo = {
      id: Date.now(),
      title: inputVal.value,
      isFinished: false,
      priority: "low",
      category: "today",
    };
    if (inputVal.value.toLowerCase().includes("bugun")) {
      let result = inputVal.value.replace("bugun", "");
      newTodo.title = result;
      if (result.includes("!muhim")) {
        newTodo.priority = "high";
      }
      addTodo(newTodo);
      useTodoApi.addTodo(newTodo);
      // todos.today.push(newTodo);
    } else if (inputVal.value.toLowerCase().includes("ertaga")) {
      let result = inputVal.value.replace("ertaga", "");
      newTodo.title = result;
      newTodo.category = "tomorrow";
      if (result.includes("!muhim")) {
        newTodo.priority = "high";
      }
      addTodo(newTodo);
      useTodoApi.addTodo(newTodo);
    } else if (
      inputVal.value
        .toLowerCase()
        .split(" ")
        .some((el) => el.match(regexExp))
    ) {
      let result = inputVal.value
        .split(" ")
        .filter((el) => !el.match(regexExp))
        .join(" ");
      newTodo.title = result;
      newTodo.category = "others";

      if (result.includes("!muhim")) {
        newTodo.priority = "high";
      }
      addTodo(newTodo);
      useTodoApi.addTodo(newTodo);
    } else {
      if (inputVal.value.includes("!muhim")) {
        newTodo.priority = "high";
      }
      addTodo(newTodo);
      useTodoApi.addTodo(newTodo);
    }
    console.log(newTodo);

    inputVal.value = "";
  } else {
    alert("Please fill the field !");
  }
};
</script>
<template>
  <div
    class="bg-white border-4 w-[1240px] mx-auto h-fit pb-5 mb-10 mt-16 rounded-2xl"
  >
    <div class="container px-5 mx-auto">
      <div class="w-[550px] mt-10 flex h-10 gap-3 items-center mx-auto">
        <InputText
          class="w-full h-10 pl-3 border-2"
          type="text"
          v-model="inputVal"
          required="true"
          placeholder="Taskname"
        />
        <Button
          @click="addTodoFunc"
          class="w-40 bg-[#3B83F6] h-10 rounded-lg flex justify-center text-white"
        >
          Add task
        </Button>
      </div>
      <div class="wrapper mt-10 flex justify-between">
        <div class="w-[48%] bg-blue-500 h-full p-4 rounded-2xl">
          <h2 class="text-[24px] text-white">Today</h2>
          <ul v-if="todayTasks.length" class="list-none flex flex-col gap-1">
            <TaskItem
              v-for="task in todayTasks"
              :priority="task.priority"
              :isFinished="task.isFinished"
              :id="task.id"
              :title="task.title"
              :key="task.id"
            />
          </ul>
          <h1 v-else class="text-[16px] text-white">Hozircha bo'sh</h1>
        </div>
        <div class="w-[48%] h-fit">
          <div class="w-full bg-blue-500 h-full p-4 rounded-2xl">
            <h2 class="text-[24px] text-white">Tomorrow</h2>
            <ul
              v-if="tomorrowTasks.length"
              class="list-none flex flex-col gap-1"
            >
              <TaskItem
                v-for="task in tomorrowTasks"
                :priority="task.priority"
                :isFinished="task.isFinished"
                :id="task.id"
                :title="task.title"
                :key="task.id"
              />
            </ul>
            <h1 v-else class="text-[16px] text-white">Hozircha bo'sh</h1>
          </div>
          <div class="w-full bg-blue-500 h-full p-4 rounded-2xl mt-4">
            <h2 class="text-[24px] text-white">Others</h2>
            <ul v-if="otherTasks.length" class="list-none flex flex-col gap-1">
              <TaskItem
                v-for="task in otherTasks"
                :priority="task.priority"
                :isFinished="task.isFinished"
                :id="task.id"
                :title="task.title"
                :key="task.id"
              />
            </ul>
            <h1 v-else class="text-[16px] text-white">Hozircha bo'sh</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
