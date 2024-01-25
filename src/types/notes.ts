export interface INote {
  id: string,
  text: string,
  title: string,
}

export interface INotesState {
  notes: INote[]
}

export interface INoteReplaceDto {
  selectedNoteId: string;
  newNoteId: string;
}

export interface INoteCreateDto {
  title: string
  text: string
}