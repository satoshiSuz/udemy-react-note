import { css } from '@emotion/react';
import { FC } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Note } from '../types/Note';

type Props = {
  activeNote: Note | undefined;
  onUpdateNote: (updatedNote: Note) => void;
};

export const Main: FC<Props> = (props) => {
  const { activeNote, onUpdateNote } = props;

  const onEditNote = (key: string, value: string) => {
    if (activeNote !== undefined) {
      const updatedNote: Partial<Note> = { [key]: value, modDate: Date.now() };
      onUpdateNote({ ...activeNote, ...updatedNote });
    }
  };

  if (activeNote === undefined) {
    return (
      <div css={styles.noActiveNote}>
        <p>ノートが選択されていません</p>
      </div>
    );
  }
  return (
    <div css={styles.wrapper}>
      <div css={styles.noteEdit}>
        <input
          id='title'
          type='text'
          value={activeNote.title}
          onChange={(e) => onEditNote('title', e.target.value)}
        />
        <textarea
          id='content'
          placeholder='ノート内容を記入'
          value={activeNote.content}
          onChange={(e) => onEditNote('content', e.target.value)}
        ></textarea>
      </div>
      <div css={styles.preview}>
        <h1 css={styles.previewTitle}>{activeNote?.title}</h1>
        <ReactMarkdown css={styles.previewMarkDown}>
          {activeNote?.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

const styles = {
  wrapper: css`
    width: 70%;
    height: 100vh;
  `,
  noteEdit: css`
    height: 50vh;
    padding: 25px;
    input,
    textarea {
      display: block;
      border: 1px solid #ddd;
      margin-bottom: 20px;
      width: 100%;
      height: calc(50vh - 130px);
      padding: 5px;
      resize: none;
      font-style: 16px;
    }
    input {
      height: 50px;
      font-size: 2rem;
    }
  `,
  preview: css`
    height: 50vh;
    border-top: 1px solid #ddd;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.04);
  `,
  previewTitle: css`
    padding: 25px 25px 0 25px;
    margin: 0;
  `,

  previewMarkDown: css`
    padding: 0 25px 25px 25px;
    line-height: 2rem;
  `,
  noActiveNote: css`
    width: 70%;
    height: 100vh;
    text-align: center;
    font-size: 2rem;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
