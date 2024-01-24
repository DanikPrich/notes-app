<template>
  <div class="flex bg-white rounded-lg shadow-lg border-gray border-solid border">
    <div class="px-6 py-4 w-full">
      <div class="font-bold text-xl mb-2">#{{ props.note.list }}</div>
      <p class="text-wrap break-all text-gray-700 text-base ">
        {{props.note.text}}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
  
  const props = defineProps({
    note: {
      type: Object,
      default: () => {}
    }
  })
  
</script>

<style lang="scss" scoped>

</style>