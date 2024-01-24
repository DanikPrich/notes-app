<script setup lang="ts">
import { computed, type PropType } from 'vue';
import type { INote } from '@/types/notes';
import NoteCard from '../components/NoteCard.vue'
import MasonryWall from '@yeger/vue-masonry-wall'

const emits = defineEmits(['replace'])

const props = defineProps({
  list: {
      type: Array as PropType<INote[]>,
      default: () => [],
    },
})

const startDrag = (event: DragEvent , noteId: string) => {
  if(event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'  
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('selectedNoteId', noteId.toString())
  }
}

const onDrop = (event: DragEvent , newNoteId: string) => {
  if(event.dataTransfer) {
    const selectedNoteId = event.dataTransfer.getData('selectedNoteId')
    emits('replace', {selectedNoteId, newNoteId})
  }
} 
</script>

<template>
  <main class="container mx-auto px-20">
    <MasonryWall :items="props.list" :ssr-columns="4" :column-width="240" :gap="16" :max-columns="4">
      <template #default="{ item }">
        <transition name="list" mode="out-in">
          <div :key="item.id">
            <NoteCard
              :note="item"
              :draggable="true"
              @dragstart="startDrag($event, item.id)"
              @drop="onDrop($event, item.id)"
              @dragenter.prevent
              @dragover.prevent
            />
          </div>
        </transition>
      </template>
    </MasonryWall>
  </main>
</template>

<style scoped>
  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.2s ease;
    width: 280px;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
  .list-leave-active {
    position: absolute;
  }
</style>