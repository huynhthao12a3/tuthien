import logo from './logo.svg';
import './App.css';
import Project from './views/admin/Project';

import AdminNavbar from './shares/AdminNavbar';
import AdminFooter from './shares/AdminFooter';
import ClientNavbar from './shares/ClientNavbar';
import ClientFooter from './shares/ClientFooter';
import ClientProject from './views/client/Project';
import AddProject from './views/client/Project/Add';
import EditProject from './views/admin/Project/Edit';
// import ProjectDetail from './views/client/Project/ProjectDetali';
import {
  BrowserRouter,
} from 'react-router-dom';
// import ProjectDetail from './views/client/Project/ProjectDetali';
function App() {
  return (
    <BrowserRouter>
    

    <AdminNavbar/>

    <EditProject/>
    {/* <div style={{height: '100vh'}}></div> */}
    <ClientFooter/>

  
    </BrowserRouter>
  )

  }

export default App;
