import { defineStore } from 'pinia'
import type { INote, INoteCreateDto, INoteReplaceDto, INoteUpdateDto } from '@/types/notes';
import { v4 as uuidv4 } from 'uuid';

interface INotesState {
  notes: INote[]
}

const NOTES_KEY = 'notes'

export const useNotesStore = defineStore('notes', {

  state: (): INotesState => ({
    notes: JSON.parse(localStorage.getItem(NOTES_KEY) || '[]'),
  }),

  getters: {},
  
  actions: {
    saveToLocalStorage(): void {
      localStorage.setItem(NOTES_KEY, JSON.stringify(this.notes));
    },

    edit(data: INoteUpdateDto): void {
      const noteIndex = this.notes.findIndex(note => note.id === data.id)
      const updatedNotes = [...this.notes]

      updatedNotes.splice(noteIndex, 1, data)
      this.notes = updatedNotes;
      this.saveToLocalStorage();
    },

    create(data: INoteCreateDto): void {
      const newNote: INote = {
        id: uuidv4(),
        ...data,
      }
      this.notes = [newNote, ...this.notes]
      this.saveToLocalStorage();
    },

    replace(data: INoteReplaceDto): void {
      const selectedNoteIndex = this.notes.findIndex(note => note.id === data.selectedNoteId);
      const newNoteIndex = this.notes.findIndex(note => note.id === data.newNoteId);
    
      if (selectedNoteIndex !== -1 && newNoteIndex !== -1) {
        const updatedNotes = [...this.notes];
        const [removedNote] = updatedNotes.splice(selectedNoteIndex, 1);

        updatedNotes.splice(newNoteIndex, 0, removedNote);
        this.notes = updatedNotes;
        this.saveToLocalStorage();
      }
    },

    remove(id: string): void {
      this.notes = this.notes.filter(note => note.id !== id)
      this.saveToLocalStorage();
    }
  },
});
