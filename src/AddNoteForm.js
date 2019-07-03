import React from 'react';
import { PageContext } from './Contexts/PageContext';

class AddNoteForm extends React.Component {
  static contextType = PageContext;
  addNoteSubmit = (e) => {
    e.preventDefault();

    const getNoteName = document.getElementById('name-input');
    const getContent = document.getElementById('content-input')
    const modified = Date.now();
    const { addNote } = this.context;
    const folderId = this.props.match.params.folderId

    addNote({
      name: getNoteName.value,
      content: getContent.value,
      modified,
      folderId,
    })
    getNoteName.value='';
    getContent.value='';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addNoteSubmit}>
          <label htmlFor="name-input">Enter Name</label>
          <input id="name-input" placeholder="Enter Name" type="text"></input>
          <label htmlFor="content-input">Enter Note</label>
          <textarea id="content-input" placeholder="Enter Content Here"></textarea>
        </form>
      </div>
    );
  }
}

export default AddNoteForm;