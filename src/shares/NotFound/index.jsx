import React from 'react';
import PropTypes from 'prop-types';
import noteFoundPage from '../../assets/images/notefoundpage.png'
NotFound.propTypes = {

};

function NotFound(props) {
    return (
        <div className="w-100 d-flex justify-content-center">
            <img className="img-fluid"
                src={noteFoundPage}
                alt="not-found-page"
            />
        </div>
    );
}

export default NotFound;