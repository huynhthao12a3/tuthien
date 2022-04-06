import axiosClient from "../axiosClient";

const token =""
const projectApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'uploadImage':'project'
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