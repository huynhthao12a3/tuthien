import React from 'react';
import PropTypes from 'prop-types';
import ClientNavbar from '../shares/ClientNavbar';
import ClientFooter from '../shares/ClientFooter';
import {
    BrowserRouter,
    Route, Switch
  } from 'react-router-dom';
import AddProject from '../views/client/Project/Add';
import AddProcess from '../views/client/Project/Process/Add';
import ProjectDetail from '../views/client/Project/ProjectDetail';
ClientLayout.propTypes = {
    
};

function ClientLayout(props) {
    return (
        <>
        <ClientNavbar/>
            <Switch>
                <Route exact path="/project-detail" component={ProjectDetail}/>
                <Route exact path="/add-project" component={AddProject}/>
                <Route exact path="/add-process" component={AddProcess}/>
            </Switch>
        <ClientFooter/>
        </>
    );
}

export default ClientLayout;