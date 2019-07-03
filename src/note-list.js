import React from 'react';
import NoteThumbnail from './note-thumbnail';
import { PageContext } from './Contexts/PageContext';


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
      </div>
    );
  }
}

export default NoteList;