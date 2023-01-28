import { css } from '@emotion/react';
import React, { FC } from 'react';
import { Note } from '../types/Note';

type Props = {
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  notes: Note[];
  activeNote: string;
  setActiveNote: React.Dispatch<React.SetStateAction<string>>;
};

export const Sidebar: FC<Props> = (props) => {
  const { onAddNote, onDeleteNote, notes, activeNote, setActiveNote } = props;
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div css={styles.wrap}>
      <div css={styles.header}>
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div css={styles.notes}>
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            css={styles.note(note.id === activeNote)}
            onClick={() => setActiveNote(note.id)}
          >
            <div css={styles.title}>
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>削除</button>
            </div>
            <p>{note.content}</p>
            <small>
              最後の修正日：
              {new Date(note.modDate).toLocaleDateString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrap: css`
    width: 30%;
    height: 100vh;
    border-right: 1px solid #ddd;
    button {
      background: none;
      border: none;
      color: #08c;
      margin: 0;
      padding: 0;
      font-size: 16px;
      cursor: pointer;
    }
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    padding: 25px;
    h1 {
      margin: 0;
    }
  `,
  notes: css`
    height: calc(100vh - 78px);
    overflow-y: hidden;
  `,
  note: (active: boolean) => css`
    padding: 25px;
    cursor: pointer;
    transition: all 0.3s;
    background-color: ${active ? '#bbadad6e' : 'initia'};
    p {
      margin: 10px 0;
    }
    small {
      color: #999;
    }
    &:hover {
      background-color: #bbadad6e;
    }
  `,
  title: css`
    display: flex;
    justify-content: space-between;
  `,
};
