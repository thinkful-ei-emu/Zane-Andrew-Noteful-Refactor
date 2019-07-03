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
const notesURL='http://localhost:9090/notes';
const foldersURL='http://localhost:9090/folders';
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

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  }

  deleteNote=(noteId)=>{
    this.setState(
      {notes:this.state.notes.filter(note=>note.id!==noteId)}      
    )
    fetch(`${notesURL}/${noteId}`,{
      method:'DELETE',
      
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

    // Promise.all([
    //   folderResponse,
    //   noteResponse
    // ])
    //   .then(([folderRes, noteRes]) => [
    //     folderRes.json().then(folders => {
    //       console.log(folders);
    //       this.setState({
    //         folders
    //       })
    //     }),
    //     noteRes.json().then(notes => {
    //       console.log(notes);
    //       this.setState({
    //         notes
    //       })
    //     })
    //   ])
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
          deleteNote:this.deleteNote
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
              <Route path='/folder/:folderId'
                render={({ match }) => {
                  return <FolderPage
                    match={match}
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
