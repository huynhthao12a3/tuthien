import logo from './logo.svg';
import './App.css';
import Project from './views/admin/Project';

import AdminNavbar from './shares/AdminNavbar';
import AdminFooter from './shares/AdminFooter';
import ClientNavbar from './shares/ClientNavbar';
import ClientFooter from './shares/ClientFooter';
import ClientProject from './views/client/Project';
import {
  BrowserRouter,
} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    
    <ClientNavbar/>
    <ClientProject/>
    {/* <div style={{height: '100vh'}}></div> */}
    <ClientFooter/>
    </BrowserRouter>
  )

  }

export default App;
