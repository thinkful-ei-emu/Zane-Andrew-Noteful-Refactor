import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import MainPage from './Main-Page';
import NotePage from './Note-Page';
import MainSidebar from './Main-Sidebar';
import NoteSidebar from './Note-Sidebar';
import FolderPage from './Folder-Page';
import Main from './Main';
import Sidebar from './Sidebar';
import NotFound from './Not-Found';
import { SidebarContext } from './Contexts/SidebarContext';
import { PageContext } from './Contexts/PageContext';
import AddFolderForm from './AddFolderForm';
import AddNoteForm from './AddNoteForm';


const notesURL = 'http://localhost:9090/notes';
const foldersURL = 'http://localhost:9090/folders';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      currentFolder: '',

    };
  }

  setCurrentFolder = (currentFolder) => {
    this.setState({
      currentFolder
    });
  }

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  }

  addFolder = async (folder) => {
    await fetch(`${foldersURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(folder)
    });

    let folders = await fetch(`${foldersURL}`);
    folders = await folders.json();

    console.log(folders);
    // console.log(newFolder);
    this.setState({
      folders
    });
  }

  deleteNote = (noteId) => {
    this.setState(
      { notes: this.state.notes.filter(note => note.id !== noteId) }
    )
    fetch(`${notesURL}/${noteId}`, {
      method: 'DELETE',

    })
  }

  async componentDidMount() {
    let folderResponse = fetch(foldersURL);
    let noteResponse = fetch(notesURL);

    [folderResponse, noteResponse] = await Promise.all([folderResponse, noteResponse]);
    const [folders, notes] = await Promise.all([folderResponse.json(), noteResponse.json()]);

    this.setState({
      folders,
      notes
    });

  }

  render() {
    return (
      <div className="App">
        <Header />

        <SidebarContext.Provider value={{
          folders: this.state.folders,
          setCurrentFolder: this.setCurrentFolder,

        }}>
          <Sidebar>
            <Switch>
              <Route path='/note/:noteId'
                render={({ history }) => {
                  return <NoteSidebar
                    history={history} />
                }}
              />
              <Route path='/'
                component={MainSidebar}
              />
            </Switch>
          </Sidebar>
        </SidebarContext.Provider>

        <PageContext.Provider value={{
          notes: this.state.notes,
          deleteNote: this.deleteNote,
          addFolder: this.addFolder
        }}>
          <Main>
            <Switch>
              <Route path='/note/:noteId'
                render={({ match, history }) => {
                  return <NotePage
                    match={match}
                    history={history}
                  />;
                }}
              />
              <Route exact path='/folder/:folderId'
                render={({ match }) => {
                  return <FolderPage
                    match={match}
                  />
                }}
              />
              <Route path='/folder/:folderId/add-note'
                render={({ match, history }) => {
                  return <AddNoteForm
                    match={match}
                    history={history}
                  />
                }}
              />
              <Route path='/add-folder'
                render={({ history }) => {
                  return <AddFolderForm
                    history={history}
                  />
                }}
              />
              <Route exact path='/'
                render={() => {
                  return <MainPage />
                }}
              />
              <Route component={NotFound} />
            </Switch>
          </Main>
        </PageContext.Provider>
      </div>
    );
  }
}

export default App;
