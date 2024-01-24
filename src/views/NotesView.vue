<script setup lang="ts">
import HeaderItem from '../components/HeaderItem.vue'
import NotesList from '../components/NotesList.vue'

import { useNotesStore } from '@/stores/notes'

const notesStore = useNotesStore()

const createNote = (text: string) => {
  notesStore.createNote(text)
}

</script>

<template>
  <HeaderItem 
    @create="createNote"
  />
  <NotesList
    :list="notesStore.notes"
    @replace="notesStore.replaceNoteById"
  />
</template>
