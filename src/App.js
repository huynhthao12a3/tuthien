import logo from './logo.svg';
import './App.css';
import Project from './views/admin/Project';

import AdminNavbar from './shares/AdminNavbar';
import AdminFooter from './shares/AdminFooter';
import ClientNavbar from './shares/ClientNavbar';
import ClientFooter from './shares/ClientFooter';
import ClientProject from './views/client/Project';
import AddProject from './views/admin/Project/Add';
import {
  BrowserRouter,
} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    
    <AdminNavbar/>
    <AddProject/>
    {/* <div style={{height: '100vh'}}></div> */}
    <AdminFooter/>
    </BrowserRouter>
  )

  }

export default App;
