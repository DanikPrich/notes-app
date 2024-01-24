import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { INote } from '@/types/notes';
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
    createNote(text: string): void {
      const newNote: INote = {
        id: uuidv4(),
        list: this.notes.length + 1,
        text,
      }
      this.notes = [...this.notes, newNote]
    }
  },
});
