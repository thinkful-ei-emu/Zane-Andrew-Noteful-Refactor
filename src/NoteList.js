import React from 'react';
import NoteThumbnail from './NoteThumbnail';
import { PageContext } from './Contexts/PageContext';
import {Link}from 'react-router-dom';


class NoteList extends React.Component {

  static contextType = PageContext;

  render() {
    const { notes } = this.context;

    const allNotes = notes.map((note, index) => {
      return (<NoteThumbnail
        key={note.id}
        noteId={note.id}
        modified={note.modified}
        name={note.name}
      />);
    });

    return (
      <div>
        {allNotes}
        <Link to='/folder/:folderId/add-note'>
          <button>Add Note</button>
        </Link>
      </div>
    );
  }
}

export default NoteList;