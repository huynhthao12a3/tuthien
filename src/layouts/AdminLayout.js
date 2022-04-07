import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Route, Switch,
    useRouteMatch
  } from 'react-router-dom';
import AdminNavbar from '../shares/AdminNavbar';
import AdminFooter from '../shares/AdminFooter';
import ProjectDetail from '../views/client/Project/ProjectDetail';
import AddProject from "./../views/client/Project/Add/index";
import AddProcess from "./../views/client/Project/Process/Add";
AdminLayout.propTypes = {
    
};

function AdminLayout(props) {
    // let match = useRouteMatch({
    //     path: '/project-detail',
    //     strict: true,
    //     sensitive: true
    //   })
    return (
        <>
        <AdminNavbar/>
            <Switch>
                <Route  path="/admin/add-project" component={AddProject}/>
                <Route  path="/admin/add-process" component={AddProcess}/>
                <Route  path="/admin/project-detail/:id" component={ProjectDetail}/>
                {/* <Route  path="/admin" component={AddProject}/> */}
                {/* {match ? <ProjectDetail match={match}/> : <AddProject/>} */}
            </Switch>
        <AdminFooter/>
        </>
    );
}

export default AdminLayout;