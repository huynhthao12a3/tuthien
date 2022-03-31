import React from 'react';
import PropTypes from 'prop-types';
import './AdminFooter.scss';
AdminFooter.propTypes = {

};

function AdminFooter(props) {
    return (
        <div id="admin-footer" className=" w-100 d-flex justify-content-between p-3 ">

            <p className="text-light">2022 © Tấm Lòng Vàng</p>
            <p className="m-0 text-light">Phiên bản 1.0</p>
        </div>
    );
}

export default AdminFooter;