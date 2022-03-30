import logo from './logo.svg';
import './App.css';
import AdminNavbar from './shares/Navbar';
import {
  BrowserRouter,
} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    
    <AdminNavbar/>
    </BrowserRouter>
  );
}

export default App;
