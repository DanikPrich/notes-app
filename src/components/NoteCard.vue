<template>
  <div 
    class="relative flex  rounded-lg shadow-lg border-gray border-solid border cursor-pointer hover:bg-transparrent"
    :class="[props.note.color, props.note.color === 'bg-white' ? 'hover:bg-black/5' : `hover:${props.note.color}/50`]"
  >
    <div class="px-6 py-4 w-full">
      <p v-show="props.note.title" class="text-wrap break-all font-bold text-xl mb-2">
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

  const props = defineProps({
    note: {
      type: Object as PropType<INote>,
      default: () => {}
    }
  })
  
</script>

<style lang="scss" scoped>

</style>