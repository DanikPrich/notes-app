export interface INote {
  id: string,
  text: string,
  title: string,
  color: string,
}

export interface INoteReplaceDto {
  selectedNoteId: string;
  newNoteId: string;
}

export interface INoteCreateDto {
  title: string
  text: string
  color: string
}

export interface INoteUpdateDto {
  id: string,
  title: string
  text: string
  color: string
}