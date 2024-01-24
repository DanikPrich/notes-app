import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { INote } from '@/types/notes';
import { v4 as uuidv4 } from 'uuid';

interface INotesState {
  notes: INote[]
}

interface INoteReplacer {
  selectedNoteId: string;
  newNoteId: string;
}

export const useNotesStore = defineStore('notes', {

  state: (): INotesState => ({
    notes: []
  }),

  getters: {},
  
  actions: {
    createNote(text: string): void {
      const newNote: INote = {
        id: uuidv4(),
        list: this.notes.length + 1,
        text,
      }
      this.notes = [newNote, ...this.notes]
    },

    replaceNoteById({selectedNoteId, newNoteId}: INoteReplacer): void {
      const selectedNoteIndex = this.notes.findIndex(note => note.id === selectedNoteId);
      const newNoteIndex = this.notes.findIndex(note => note.id === newNoteId);

      if (selectedNoteIndex !== -1 && newNoteIndex !== -1) {
        const [removedNote] = this.notes.splice(selectedNoteIndex, 1);
        this.notes.splice(newNoteIndex, 0, removedNote);
      }
    }
  },
});
