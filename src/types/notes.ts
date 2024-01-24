export interface INote {
  id: string,
  text: string,
  list: number,
}

export interface INotesState {
  notes: INote[]
}

export interface INoteReplacer {
  selectedNoteId: string;
  newNoteId: string;
}