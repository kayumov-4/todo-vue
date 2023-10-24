<template>
  <li
    class="flex gap-3 bg-white py-1 px-3 rounded items-center justify-between"
  >
    <div class="flex items-center gap-3">
      <input v-model="check" @click="handleCheck(id)" type="checkbox" />
      <p
        :class="[
          check && 'line-through text-[#64748b]',
          priority == 'high' && 'text-red-500',
        ]"
      >
        {{ title }}
      </p>
    </div>
  </li>
</template>

<script setup>
import useTodoApi from "../service/useTodoApi";

import { defineProps, ref } from "vue";
const { title, priority, isFinished, id } = defineProps({
  title: String,
  priority: String,
  isFinished: Boolean,
  id: Number,
});

const check = ref(isFinished);
const handleCheck = () => {
  if (check.value == false) {
    check.value = true;
    const newState = { isFinished: true };
    useTodoApi.updateTodo(id, newState);
  } else {
    check.value = false;
    const newState = { isFinished: false };
    useTodoApi.updateTodo(id, newState);
  }
};
</script>

<style lang="scss" scoped></style>
