import React from 'react';
import PropTypes from 'prop-types';
import loadingGif from '../../assets/images/loading.gif'
Loading.propTypes = {

};

function Loading(props) {
    const style = {
        zIndex: 100,
    }
    return (
        <div style={style} className="position-fixed d-flex start-0 end-0 top-0 bottom-0 align-items-center justify-content-center bg-white">
            <img src={loadingGif} alt="Loading..." />
        </div>
    );
}

export default Loading;