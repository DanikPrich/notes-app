<template>
  <div 
    class="relative flex  rounded-lg shadow-lg border-gray border-solid border cursor-pointer"
    :class="[slyle, hoverStyle]"
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
  import { type PropType, computed } from 'vue';

  const props = defineProps({
    note: {
      type: Object as PropType<INote>,
      default: () => {}
    }
  })

  const slyle = computed(() => {
    return props.note.color === 'white' ? `bg-${props.note.color}` : `bg-${props.note.color}-300`
  })

  const hoverStyle = computed(() => {
    return props.note.color === 'white' ? 'hover:bg-black/20' : `hover:bg-${props.note.color}-400`
  })
  
</script>

<style lang="scss" scoped>

</style>