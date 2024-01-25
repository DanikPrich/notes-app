import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { INote, INoteCreateDto, INoteReplaceDto } from '@/types/notes';
import { v4 as uuidv4 } from 'uuid';

interface INotesState {
  notes: INote[]
}


export const useNotesStore = defineStore('notes', {

  state: (): INotesState => ({
    notes: []
  }),

  getters: {},
  
  actions: {
    create(data: INoteCreateDto): void {
      const newNote: INote = {
        id: uuidv4(),
        title: data.title,
        text: data.text,
      }
      this.notes = [newNote, ...this.notes]
    },

    replace(data: INoteReplaceDto): void {
      const selectedNoteIndex = this.notes.findIndex(note => note.id === data.selectedNoteId);
      const newNoteIndex = this.notes.findIndex(note => note.id === data.newNoteId);
    
      if (selectedNoteIndex !== -1 && newNoteIndex !== -1) {
        const updatedNotes = [...this.notes];
        const [removedNote] = updatedNotes.splice(selectedNoteIndex, 1);

        updatedNotes.splice(newNoteIndex, 0, removedNote);
        this.notes = updatedNotes;
      }
    },

    remove(id: string): void {
      this.notes = this.notes.filter(note => note.id !== id)
    }
  },
});
