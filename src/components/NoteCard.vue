<template>
  <div 
    class="relative flex  rounded-lg shadow-lg border-gray border-solid border"
    :class="props.note.color"
  >
    <button 
      type="button" 
      class="absolute right-0 bg-transparrent rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" 
      @click="emits('remove')"
    >
      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <div class="px-6 py-4 w-full">
      <p v-show="props.note.title" class="font-bold text-xl mb-2">
        {{ props.note.title }}
      </p>
      <p v-show="props.note.text" class="text-wrap break-all text-gray-700 text-base ">
        {{props.note.text}}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { INote } from '@/types/notes';
import type { PropType } from 'vue';

  const emits = defineEmits(['remove'])
  const props = defineProps({
    note: {
      type: Object as PropType<INote>,
      default: () => {}
    }
  })
  
</script>

<style lang="scss" scoped>

</style>