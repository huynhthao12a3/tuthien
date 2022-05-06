import React from 'react';
import PropTypes from 'prop-types';
import logoCharityLoaing from '../../assets/images/logo-charity-loading.png';
import loadingGif from '../../assets/images/loading.gif'
Loading.propTypes = {

};

function Loading(props) {
    const style = {
        zIndex: 100,
    }
    return (
        <div style={style} className="position-fixed  start-0 end-0 top-0 bottom-0  bg-white">
            <div className="container-fluid d-flex flex-column h-100 align-items-center justify-content-center">
                <img src={logoCharityLoaing} className="img-fluid" alt="Loading..." />
                <img src={loadingGif} alt="Loading..." />
            </div>
        </div>
    );
}

export default Loading;