<template>
  <div v-show="props.isActive" v-on-click-outside="() => emits('close')" class="flex justify-between bg-white gap-4 p-4 border rounded-lg">
    <div 
      v-for="color in colors" 
      :key="color"
      class="h-10 w-10 rounded-full  hover:border-2 border-black flex items-center justify-center cursor-pointer"
      :class="color"
      @click="() => emits('selectColor', color)"
    >
      <InvertColorsOff v-if="color === 'bg-white'"/>
    </div>
  </div>
</template>

<script setup lang="ts">
  // @ts-ignore 
  import InvertColorsOff from 'vue-material-design-icons/InvertColorsOff.vue'; 
  import { vOnClickOutside } from '@vueuse/components'
  import { ref } from 'vue';

  const emits = defineEmits(['selectColor', 'close'])

  const props = defineProps({
    isActive: {
      type: Boolean,
      default: true
    }
  })

  const colors = ref(['bg-white', 'bg-blue-200', 'bg-purple-200', 'bg-red-200', 'bg-green-200', 'bg-yellow-200'])
</script>

<style lang="scss" scoped>

</style>