<template>
  <div class="bg-white rounded-lg shadow-lg border-gray border-solid border">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Note</div>
      <p class="text-gray-700 text-base">
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