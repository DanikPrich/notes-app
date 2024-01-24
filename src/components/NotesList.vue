<script setup lang="ts">
import type { PropType } from 'vue';
import type { INote } from '@/types/notes';
import NoteCard from '../components/NoteCard.vue'
const props = defineProps({
  list: {
      type: Array as PropType<INote[]>,
      default: () => [],
    },
})
</script>

<template>
  <main class="container mx-auto">
    <div class="grid grid-cols-4 gap-4">
      <NoteCard
        v-for="note in props.list"
        :key="note.id"
        :note="note"
      />
    </div>
  </main>
</template>

<style scoped>
</style>