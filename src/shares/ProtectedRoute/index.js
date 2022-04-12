import React from 'react';
import PropTypes from 'prop-types';
import { Route,Redirect  } from 'react-router-dom';

ProtectedRoute.propTypes = {
    
};

function ProtectedRoute({component: Component, role, ...restOfProps}) {
    const userInfo = role ? localStorage.getItem('client-info') : localStorage.getItem('admin-info');
    console.log(restOfProps);
    return (
        <Route
            {...restOfProps}
            render = {
                (props) => userInfo ? <Component {...props} /> : (role ? <Redirect to="/login"/> : <Redirect to="/admin/login"/>)         
            }
        />
    );
}

export default ProtectedRoute;