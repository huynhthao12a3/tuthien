import logo from './logo.svg';
import './App.css';
import Project from './views/admin/Project';

import AdminNavbar from './shares/AdminNavbar';
import AdminFooter from './shares/AdminFooter';
import ClientNavbar from './shares/ClientNavbar';
import ClientFooter from './shares/ClientFooter';
import {
  BrowserRouter,
} from 'react-router-dom';
import ProjectDetail from './views/client/Project/ProjectDetali';
function App() {
  return (
    <BrowserRouter>
    
    <ClientNavbar/>
    {/* <div style={{height: '100vh'}}></div> */}
    <ProjectDetail/>
    <ClientFooter/>
    </BrowserRouter>
  )

  }

export default App;
