import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ClientNavbar from '../shares/ClientNavbar';
import ClientFooter from '../shares/ClientFooter';
import {
    BrowserRouter,
    Route, Switch,Redirect
  } from 'react-router-dom';
import AddProject from '../views/client/Project/Add';
import AddProcess from '../views/client/Project/Process/Add';
import ProjectDetail from '../views/client/Project/ProjectDetail';
import ClientProject from "./../views/client/Project/index";
import ClientLogin from "./../views/client/Login/index";
import ProtectedRoute from '../shares/ProtectedRoute'
import UpdateProcess from '../views/client/Project/Process/Update'; 
import * as $ from 'jquery'
import ArticalDetail from "./../views/client/Project/Artical/ArticalDetail";
import UpdateProject from '../views/client/Project/Update';
import NotFound from "./../shares/NotFound/index";


ClientLayout.propTypes = {
    
};

function ClientLayout(props) {
    // const infoString = localStorage.getItem('client-info')
    // const [clientInfo, setclientInfo] = useState(JSON.parse(infoString))
    // const handleClientInfo = (data) => {
    //     localStorage.setItem('client-info', JSON.stringify(data))
    //     // setclientInfo(data)
    // }
    // if(!clientInfo) {
    //     return <ClientLogin handleClientInfo={handleClientInfo}/>
    // }
    // const footerClientHeight = $('#client-footer').height()
    // console.log("client footer :",footerClientHeight)
    return (
        <>

        <ClientNavbar/>
            <Switch>
                {/* Route không cần Login vẫn xem được */}
                <Route exact path="/" component={ClientProject}/>
                <Route exact path="/project" component={ClientProject}/>
                <Route exact path="/project-detail/:id/:friendlyurl" component={ProjectDetail}/>
                <Route exact path="/login" component={ClientLogin}/>
                <Route exact path="/bai-viet/:id/:friendlyurl" component={ArticalDetail}/>
                
                {/* Route bắt buộc phải Login mới xemm được */}
                <ProtectedRoute exact path="/add-project" component={AddProject} role='client'/>
                <ProtectedRoute exact path="/add-process" component={AddProcess} role='client'/>

                <ProtectedRoute exact path="/update-project/:id" component={UpdateProject} role='client'/>
                <ProtectedRoute exact path="/update-process/:id" component={UpdateProcess} role='client'/>
                <Route path="/not-found" component={NotFound}/>
<Redirect to="/not-found"/>
            </Switch>
        <ClientFooter/>
        </>
    );
}

export default ClientLayout;