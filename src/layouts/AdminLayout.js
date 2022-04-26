import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Route, Switch,Redirect,
    useRouteMatch
  } from 'react-router-dom';
import AdminNavbar from '../shares/AdminNavbar';
import AdminFooter from '../shares/AdminFooter';
import ProjectDetail from '../views/client/Project/ProjectDetail';
import AddProject from "./../views/client/Project/Add/index";
import AddProcess from "./../views/client/Project/Process/Add";
import AdminLogin from '../views/admin/Login';
import Project from "./../views/admin/Project/index";
import ProtectedRoute from '../shares/ProtectedRoute'
import * as $ from 'jquery'
import NotFound from "./../shares/NotFound/index";
AdminLayout.propTypes = {
    
};

function AdminLayout(props) {
    // let match = useRouteMatch({
    //     path: '/project-detail',
    //     strict: true,
    //     sensitive: true
    //   })
    // const infoString = localStorage.getItem('admin-info')
    // const [adminInfo, setAdminInfo] = useState(JSON.parse(infoString))
    // const handleAdminInfo = (data) => {
    //     localStorage.setItem('admin-info', JSON.stringify(data))
    //     setAdminInfo(data)
    // }
    // if(!adminInfo) {
    //     return <AdminLogin handleAdminInfo={handleAdminInfo}/>
    // }
    // const footerAdminHeight = $('#admin-footer').height()
    // console.log("footer admin:",footerAdminHeight)
    return (
        <>

            <AdminNavbar />
                <Switch>
                    {/* <Route exact path="/admin" component={AdminLogin}/> */}
                    <Route exact path="/admin/login" component={AdminLogin}/>
                    <ProtectedRoute exact path="/admin/project" component={Project}/>
                    <ProtectedRoute exact path="/admin/news" component={AddProject}/>
                    <ProtectedRoute exact path="/admin/add-process" component={AddProcess}/>
                    <ProtectedRoute exact path="/admin/add-project" component={AddProject}/>
                    <ProtectedRoute exact path="/admin/project-detail/:id" component={ProjectDetail}/>
                    <Route path="/not-found" component={NotFound}/>
<Redirect to="/not-found"/>
                
                </Switch>
            <AdminFooter/>
        </>
    );
}

export default AdminLayout;