import React from 'react';
import PropTypes from 'prop-types';

// Sanitize chỗi html từ ckEditor  
import DOMPurify from 'dompurify';

SetInnerHTML.propTypes = {

};

// Dùng để đưa text nhận từ ckEditor lên UI - tránh XSS

function SetInnerHTML({ text }) {
    return (
        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}></span>
    );
}

export default SetInnerHTML;