import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import { Note } from './types/Note';
import uuid from 'react-uuid';

function App() {
  const [notes, setNotes] = useState<Note[]>(
    JSON.parse(localStorage.getItem('notes') || '{}') || []
  );
  const [activeNote, setActiveNote] = useState<string>('');

  useEffect(() => {
    //ローカルストレージにノートを保存する
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setActiveNote(notes[0]?.id);
  }, []);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: '新しいノート',
      content: '',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id: string) => {
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = (): Note | undefined => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote: Note) => {
    //修正された新しいノードを返す
    const updatedNotesArray: Note[] = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };

  return (
    <div className='App' css={styles.app}>
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;

const styles = {
  app: css`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    font-size: 16px;
    display: flex;
  `,
};
