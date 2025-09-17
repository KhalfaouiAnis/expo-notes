import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

interface NotesListStoreInterface {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, note: { title: string }) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
}

const useNotesStore = create<NotesListStoreInterface>()(
  persist(
    (set, get) => ({
      notes: [],
      addNote: (note) => {
        const { notes } = get();
        const newNotes = [...notes, note];
        set({ notes: newNotes });
      },
      updateNote: (id, note) => {
        const { notes } = get();
        set({
          notes: notes.map((noteItem) =>
            noteItem.id === id ? { ...noteItem, title: note.title } : noteItem
          ),
        });
      },
      deleteNote: (id) => {
        const { notes } = get();
        set({ notes: notes.filter((item) => item.id !== id) });
      },
      getNote: (id) => {
        const { notes } = get();
        return notes.find((note) => note.id === id);
      },
    }),
    {
      name: 'note-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useNotesStore;
