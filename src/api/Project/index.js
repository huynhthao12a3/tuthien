import axiosClient from "../axiosClient";

const token =""
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
        const url ='/project/create-project'
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
        const url = '/Project/get-project'
        return axiosClient.get(url,{params})
    },
    get: (id) => {
        const url = `/Project/get-project/${id}`
        return axiosClient.get(url)
    },
    getCategoryProject: ()=>{
        const url = `/Category/get-project-categories`
        return axiosClient.get(url)
    }
}

export default projectApi;