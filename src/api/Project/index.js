import axiosClient from "../axiosClient";

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJXZWJzaXRlVGFtTG9uZ1ZhbmdIaWV1VGhhb1RodWFuQWRtaW4iLCJqdGkiOiI2MjlmMzExZS02MDYzLTRkNzItYjgzNi1hZTcxYTQ1NzBmZGMiLCJpYXQiOiI0LzExLzIwMjIgMTo0MzowNyBBTSIsIlVzZXJJZCI6IjEiLCJVc2VyTmFtZSI6Imh1eW5odGhhb0BnbWFpbC5jb20iLCJBdmF0YXIiOiJzdHJpbmciLCJleHAiOjE2NDk3Mjc3ODcsImlzcyI6Iklzc3VlciIsImF1ZCI6Iklzc3VlciJ9.7NUKHyZHp_LLPmd61ExxCRTPuEQWmcXQEpP8QI8yk18"
const projectApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    createProject: (data) => {
        const url ='/project/createproject'
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    },
    editProject: (data) => {
        const url =`/project/edit-eproject/${data.id}`
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    },
    getAll(params) {
        const url = '/project/get-projects'
        return axiosClient.get(url, {params: params})
    },
    get: (id) => {
        const url = `/project/get-project/${id}`
        return axiosClient.get(url)
    },
}

export default projectApi;