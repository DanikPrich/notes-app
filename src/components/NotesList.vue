<template>
  <main class="container mx-auto px-20">
    <ModalComponent v-if="isEditModalActive">
      <EditNoteForm
        :activeNote="activeNote"
        @remove="onNoteRemove"
        @disable="onModalClose"
        @submit="(data: INoteUpdateDto) => emits('edit', data)"
      />
    </ModalComponent>
    <MasonryWall :items="props.list" :ssr-columns="4" :column-width="240" :gap="16" :max-columns="4">
      <template #default="{ item }">
        <transition name="list" mode="out-in">
          <NoteCard
            :note="item"
            :key="item.id"
            :draggable="true"
            @dragenter.prevent
            @dragover.prevent
            @dragstart="onDragStart($event, item.id)"
            @drop="onDrop($event, item.id)"
            @click="() => onModalOpen(item)"
          />
        </transition>
      </template>
    </MasonryWall>
  </main>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { INote } from '@/types/notes';
import NoteCard from '@/components/NoteCard.vue'
import EditNoteForm from '@/components/EditNoteForm.vue'
import ModalComponent from '@/components/UI/ModalComponent.vue'
import MasonryWall from '@yeger/vue-masonry-wall'
import type { INoteUpdateDto } from '@/types/notes';

const emits = defineEmits(['replace', 'remove', 'edit'])

const props = defineProps({
  list: {
      type: Array as PropType<INote[]>,
      default: () => [],
    },
})

const activeNote = ref<INote | null>(null)
const isEditModalActive = ref<boolean>(false)

const onDragStart = (event: DragEvent , noteId: string) => {
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

const onModalOpen = (note: INote) => {
  activeNote.value = note
  isEditModalActive.value = true
}

const onModalClose = () => {
  isEditModalActive.value = false
  activeNote.value = null
}

const onNoteRemove = () => {
  if(activeNote.value) {
    emits('remove', activeNote.value.id)
  }
  onModalClose()
}
</script>

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