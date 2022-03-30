import logo from './logo.svg';
import './App.css';
import Project from './views/admin/Project';

import AdminNavbar from './shares/AdminNavbar';
import AdminFooter from './shares/AdminFooter';
import {
  BrowserRouter,
} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    
    <AdminNavbar/>
    <div style={{height: '100vh'}}></div>
    <AdminFooter/>
    </BrowserRouter>
  )

  }

export default App;
