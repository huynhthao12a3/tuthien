import React from 'react';
import PropTypes from 'prop-types';
import './AdminFooter.scss';
AdminFooter.propTypes = {

};

function AdminFooter(props) {
    return (
        <footer id="admin-footer" className="position-absolute container-fluid d-flex justify-content-between p-3 ">

            <p className="text-light">2022 © Tấm Lòng Vàng</p>
            <p className="m-0 text-light">Phiên bản 1.0</p>
        </footer>
    );
}

export default AdminFooter;