import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory, Redirect } from "react-router-dom";
UpdateProject.propTypes = {

};

function UpdateProject(props) {
    const location = useLocation();
    const history = useHistory();
    const propsData = location.state;

    if (propsData === undefined) {
        history.push("/not-found")
    }
    console.log('update project: ', propsData)
    const [dataProject, setDataProject] = useState(
        {
            title: propsData.title,
            shortDescription: propsData.shortDescription,
            projectStatus: propsData.status,
            friendlyUrl: propsData.friedlyUrl,
            summary: propsData.summary,
            problemToAddress: propsData.problemToAddress,
            solution: propsData.solution,
            location: propsData.location,
            impact: propsData.impact,
            addressContract: propsData.addressContract,
            banner: {
                "id": 0,
                "fileName": "string",
                "filePath": "string",
                "friendlyUrl": "string",
                "note": "string"
            },
            category: [
                {
                    "categoryId": 0
                }
            ]
        }
    );
    return (
        <div>

        </div>
    );
}

export default UpdateProject;