import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from "react-router-dom";

NewsDetail.propTypes = {

};

function NewsDetail(props) {
    const { id, friendlyurl } = useParams()
    console.log(id, friendlyurl)
    return (
        <>
            <div></div>
        </>
    );
}

export default NewsDetail;