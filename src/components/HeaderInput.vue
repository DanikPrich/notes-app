<template>
  <header class="my-16">
    <form class="container mx-auto px-10 flex justify-center" @submit.prevent="onSubmit">
      <input
        v-model="inputValue"
        type="text"
        id="inputField"
        name="inputField"
        class="max-w-4xl h-14 shadow-md appearance-none border rounded-lg w-full py-6 px-8 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Заметка..."
      />
    </form>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emits = defineEmits(['create'])

const inputValue = ref('')

const onSubmit = () => {
  if(inputValue.value) {
    emits('create', inputValue.value)
    inputValue.value = ''
  }
}
</script>

<style scoped>
</style>