import React from "react";
import { PageContext } from "./Contexts/PageContext";
import { SidebarContext } from "./Contexts/SidebarContext";

class AddNoteForm extends React.Component {
  static contextType = PageContext;
  
  
  addNoteSubmit = e => {
    e.preventDefault();

    const getNoteName = document.getElementById("name-input");
    const getContent = document.getElementById("content-input");
    const getSelector=document.getElementById("selection-id")
    const modified = Date.now();
    const { addNote} = this.context;
    

    addNote({
      name: getNoteName.value,
      content: getContent.value,
      modified,
      folderId:getSelector.value,
    });
    this.props.history.push("/");
  };

  render() {
    const { folders } = this.context;
    return (
      <div>
        <form onSubmit={this.addNoteSubmit}>
          <label htmlFor="name-input">Enter Name</label>
          <input id="name-input" placeholder="Enter Name" type="text" />
          <label htmlFor="content-input">Enter Note</label>
          <textarea id="content-input" placeholder="Enter Content Here" />
          <button type="submit" className="submit-button">
            Submit
          </button>
          <select className="selector" id="selection-id">
          {folders.map(folder => ( <option key={folder.id} value={folder.id}>{folder.name}</option> ))}
          </select>
        </form>
      </div>
    );
  }
}

export default AddNoteForm;
