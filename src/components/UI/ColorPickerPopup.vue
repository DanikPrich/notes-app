<template>
  <div 
    class="flex justify-between bg-white gap-4 p-4 border rounded-lg"
    v-show="props.isActive" 
    v-on-click-outside="() => emits('close')" 
  >
    <div 
      v-for="color in colors" 
      :key="color"
      class="h-10 w-10 rounded-full  hover:border-2 border-black flex items-center justify-center cursor-pointer"
      :class="[`bg-${color}-200`]"
      @click="() => emits('selectColor', color)"
    >
      <InvertColorsOff v-if="color === 'white'"/>
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

  const colors = ref(['white', 'blue', 'purple', 'red', 'green', 'yellow'])
</script>

<style lang="scss" scoped>

</style>