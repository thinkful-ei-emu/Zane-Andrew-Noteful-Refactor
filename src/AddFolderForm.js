import React from 'react';
import { PageContext } from './Contexts/PageContext';


class AddFolderForm extends React.Component {
  static contextType = PageContext;

  addFolderSubmit = (e) => {
    e.preventDefault();

    const folderName = document.getElementById('folder-name');
    const { addFolder } = this.context;

    addFolder({
      name: folderName.value
    });

    folderName.value = '';
  }

  render() {

    return (
      <div>
        <h1>Add A New Folder</h1>
        <form onSubmit={this.addFolderSubmit}>
          <label htmlFor='folder-name'>Folder Name:&nbsp;</label>
          <input id='folder-name' type='text' placeholder='Folder Name'></input>
          <input id='folder-submit' type='submit' value='Submit'></input>
        </form>
      </div>
    );
  }
}

export default AddFolderForm;