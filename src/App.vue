<script setup>
import { onMounted, ref, reactive } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import useTodoApi from "./service/useTodoApi";
import { useTodoStore } from "./store/useTodoStore";
import { storeToRefs } from "pinia";
const inputVal = ref("");
const todos = useTodoStore();
const { todayTasks, otherTasks, tomorrowTasks } = storeToRefs(todos);
const { addTodayTask, addTomorrowTask, addOtherTask } = todos;
onMounted(() => {
  console.log(todayTasks);
  console.log(otherTasks);
  console.log(tomorrowTasks);
});
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
      addTodayTask(newTodo);
    } else if (inputVal.value.toLowerCase().includes("ertaga")) {
      let result = inputVal.value.replace("ertaga", "");
      newTodo.title = result;
      newTodo.category = "tomorrow";
      if (result.includes("!muhim")) {
        newTodo.priority = "high";
      }
      addTomorrowTask(newTodo);
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
      addOtherTask(newTodo);
    } else {
      if (inputVal.value.includes("!muhim")) {
        newTodo.priority = "high";
      }
      addTodayTask(newTodo);
    }
    console.log(newTodo);
    useTodoApi.addTodo(newTodo);

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
          <ul class="list-none flex flex-col gap-1">
            <!-- {todayTasks.length > 0 ? (
                todayTasks.map((todo, index) => {
                  return <TaskItem state={todo} key={index} />;
                })
              ) : (
                <h1 class="text-[16px] text-white">Hozircha bo'sh</h1>
              )} -->
          </ul>
        </div>
        <div class="w-[48%] h-fit">
          <div class="w-full bg-blue-500 h-full p-4 rounded-2xl">
            <h2 class="text-[24px] text-white">Tomorrow</h2>
            <ul class="list-none flex flex-col gap-1">
              <!-- {tomorrowTasks.length > 0 ? (
                  tomorrowTasks.map((todo, index) => {
                    return <TaskItem state={todo} key={index} />;
                  })
                ) : (
                  <h1 class="text-[16px] text-white">Hozircha bo'sh</h1>
                )} -->
            </ul>
          </div>
          <div class="w-full bg-blue-500 h-full p-4 rounded-2xl mt-4">
            <h2 class="text-[24px] text-white">Others</h2>
            <ul class="list-none flex flex-col gap-1">
              <!-- {othersTasks.length > 0 ? (
                  othersTasks.map((todo, index) => {
                    return <TaskItem state={todo} key={index} />;
                  })
                ) : (
                  <h1 class="text-[16px] text-white">Hozircha bo'sh</h1>
                )} -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
