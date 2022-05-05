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
        <div style={style} className="position-fixed d-flex flex-column start-0 end-0 top-0 bottom-0 align-items-center justify-content-center bg-white">
            <img src={logoCharityLoaing} alt="Loading..." />
            <img src={loadingGif} alt="Loading..." />
        </div>
    );
}

export default Loading;