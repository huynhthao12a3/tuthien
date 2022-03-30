import logo from './logo.svg';
import './App.css';
import Project from './views/admin/Project';

import AdminNavbar from './shares/Navbar';
import {
  BrowserRouter,
} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    
    <AdminNavbar/>
    </BrowserRouter>
  )

  }

export default App;
