import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import useUserStore from '../zustand/userstate';
import useNoteStore from '../zustand/notestate';

const Notes: React.FC = () => {
  const user = useUserStore(state => state.user);
  const { notes, fetchNotes, addNote, removeNote } = useNoteStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleAddNote = async (e: FormEvent) => {
    e.preventDefault();
    if (user && user.id && input.trim()) {
      setLoading(true);
      await addNote(user.id, input);
      setInput("");
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    setLoading(true);
    await removeNote(id);
    setLoading(false);
  };

  useEffect(() => {
    if (user && user.id) {
      setLoading(true);
      fetchNotes(user.id).finally(() => setLoading(false));
    }
  }, [user, fetchNotes]);

  return (
    <div className="w-full pt-6 px-4 bg-gray-50 pb-6 border border-gray-200 rounded-lg shadow-md">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Notes</h1>
        <form onSubmit={handleAddNote} className="flex gap-2 mb-8">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Add a new note..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center text-blue-500 py-8">
              Loading notes...
            </div>
          ) : (
            <>
              {notes.length === 0 && (
                <div className="col-span-full text-center text-gray-400">No notes yet!</div>
              )}
              {notes.map(note => (
                <div
                  key={note.id}
                  className="relative bg-white border border-gray-200 rounded-lg shadow p-4 break-words hover:shadow-lg transition-shadow duration-200 hover:bg-gray-50"
                >
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 mb-4"
                    aria-label="Delete note"
                    title="Delete"
                  >
                    ✖
                  </button>
                  <div className="text-gray-800 whitespace-pre-wrap">{note.text}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;

