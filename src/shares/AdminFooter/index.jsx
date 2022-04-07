import React from 'react';
import PropTypes from 'prop-types';
import './AdminFooter.scss';
AdminFooter.propTypes = {

};

function AdminFooter(props) {
    return (
        <footer id="admin-footer" className="position-absolute bg-light border-top  w-100 d-flex align-items-center">
            <div className="container-fluid d-flex justify-content-between align-items-center  p-3">
                <p className="m-0 text-dark fw-bold">2022 © Tấm Lòng Vàng</p>
                <p className="m-0 text-dark fw-bold">Phiên bản 1.0</p>
            </div>
        </footer>
    );
}

export default AdminFooter;