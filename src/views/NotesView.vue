<script setup lang="ts">
import HeaderInput from '../components/HeaderInput.vue'
import NotesList from '../components/NotesList.vue'

import { useNotesStore } from '@/stores/notes'

const notesStore = useNotesStore()

</script>

<template>
  <HeaderInput 
    @create="notesStore.create"
  />
  <NotesList
    :list="notesStore.notes"
    @replace="notesStore.replace"
    @remove="notesStore.remove"
    @edit="notesStore.edit"
  />
</template>
