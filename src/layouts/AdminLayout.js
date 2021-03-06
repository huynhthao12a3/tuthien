import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Route, Switch,Redirect,
    useRouteMatch
  } from 'react-router-dom';
import AdminNavbar from '../shares/AdminNavbar';
import AdminFooter from '../shares/AdminFooter';
import AddProject from "./../views/client/Project/Add/index";
import AddProcess from '../views/client/Project/Process/Add';
import AdminLogin from '../views/admin/Login';
import AdminDashboard from '../views/admin/Dashboard';
import Project from "./../views/admin/Project/index";
import ProtectedRoute from '../shares/ProtectedRoute'
import AdminNews from '../views/admin/News';
import AdminAccount from '../views/admin/Account';
import AdminArtical from '../views/admin/Project/Artical';
import AdminReclaim from '../views/admin/Reclaim';
import AdminCategory from '../views/admin/Category';
import AdminDonation from '../views/admin/Donation';
import EditProjectUser from '../views/client/Project/edit';
import UpdateProcess from "../views/client/Project/Process/Update"
import NewsDetail from '../views/client/News/NewsDetail';

import ProjectDetail from '../views/client/Project/ProjectDetail';

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
            <div className="bg-admin flex-grow-1">

                <Switch>
                    {/* <Route exact path="/admin" component={AdminLogin}/> */}
                        
                    <Route exact path="/admin/login" component={AdminLogin}/>
                    {/* <Route exact path="/admin" component={AdminDashboard}/> */}
                    <ProtectedRoute exact path="/admin" component={AdminDashboard}/>
                    {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
                    <ProtectedRoute exact path="/admin/dashboard" component={AdminDashboard}/>
                    <ProtectedRoute exact path="/admin/project" component={Project}/>
                    <ProtectedRoute exact path="/admin/add-project" component={AddProject} />
                    <Route exact path="/admin/project-detail/:id/:friendlyurl" component={ProjectDetail}/>
                    <ProtectedRoute exact path="/admin/update-project/:id/:friendlyurl" component={EditProjectUser} />
                    <ProtectedRoute exact path="/admin/update-process/:id" component={UpdateProcess} />
                    <ProtectedRoute exact path="/admin/add-process" component={AddProcess} />
                    <ProtectedRoute exact path="/admin/news" component={AdminNews}/>
                    <ProtectedRoute exact path="/admin/user" component={AdminAccount}/>
                    <ProtectedRoute exact path="/admin/donation" component={AdminDonation}/>
                    <ProtectedRoute exact path="/admin/artical" component={AdminArtical}/>
                    <ProtectedRoute exact path="/admin/category" component={AdminCategory}/>
                    <ProtectedRoute exact path="/admin/reclaim" component={AdminReclaim}/>
                    <ProtectedRoute exact path="/admin/add-process" component={AddProcess}/>
                    <ProtectedRoute exact path="/admin/add-project" component={AddProject}/>
                    <ProtectedRoute exact path="/admin/project-detail/:id" component={ProjectDetail}/>
                    <Route exact path="/admin/news/:id/:friendlyurl" component={NewsDetail}/>
                    <Route path="/admin/not-found" component={NotFound}/>
                    <Redirect to="/admin/not-found"/>
                
                </Switch>
            </div>

            <AdminFooter/>
        </>
    );
}

export default AdminLayout;