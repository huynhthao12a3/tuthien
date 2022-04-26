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
import AddProcess from './views/client/Project/Process/Add';
// import ProjectDetail from './views/client/Project/ProjectDetali';
import {
  BrowserRouter,
  Route, Switch
} from 'react-router-dom';

// React Slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectDetail from "./views/client/Project/ProjectDetail";
import ArticalDetail from "./views/client/Project/Artical/ArticalDetail";
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import NotFound from './shares/NotFound';
function App() {
  return (
    <BrowserRouter>
     <Switch>
         <Route  path="/admin" component={AdminLayout}/>
         <Route  path="/" component={ClientLayout}/>
         
     </Switch>

    {/* <Switch>
      
      <Route exact path="/">
        <AddProject />
        
      </Route>
      
      <Route exact path="/admin">
        <ProjectDetail />
      </Route>
      
  </Switch>
  <Switch>
    <Route exact path="/">
        <ClientFooter/>
      </Route>
      <Route exact path="/admin">
        <AdminFooter/>
      </Route>
</Switch> */}

{/* <ClientNavbar/>
    
<ProjectDetail />
<ClientFooter/> */}

    </BrowserRouter>
  )

  }

export default App;
