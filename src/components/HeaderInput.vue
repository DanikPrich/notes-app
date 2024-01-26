<template>
  <header class="my-16 container mx-auto px-10 flex flex-col items-center ">
    <form 
      v-show="!isCreationFormActive" 
      class="max-w-4xl h-14 shadow-md appearance-none border rounded-lg w-full leading-tight overflow-hidden" 
      @click="() => isCreationFormActive = true"
    >
      <input
        type="text"
        id="inputField"
        name="inputField"
        class="w-full h-full focus:outline-none focus:shadow-outline px-8 text-gray-700 "
        placeholder="Note..."
      />
    </form>
    <EditNoteForm
      @submit="(data: INoteCreateDto) => emits('create', data)"
      @disable="() => isCreationFormActive = false"
      v-if="isCreationFormActive"
    />
  </header>
</template>

<script setup lang="ts">
import EditNoteForm from './EditNoteForm.vue'
import { ref } from 'vue';
import type { INoteCreateDto } from '@/types/notes';

const emits = defineEmits(['create'])

const isCreationFormActive = ref<boolean>(false)

</script>

<style scoped>
</style>