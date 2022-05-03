import axiosClient from "../axiosClient";

const articalApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    createArtical:(data) => {
        const url =`/project/create-artical?projectid=${data.id}`
        delete data.id
        return axiosClient.post(url, data)
    },
    editArtical: (data) => {
        const url =`/artical/edit-artical/${data.id}`
        return axiosClient.post(url, data)
    },
    
    getAll(params) {
        const url = '/artical/get-articals'
        return axiosClient.get(url, {params: params})
    },
    get: (id) => {
        const url = `/artical/get-artical/${id}`
        return axiosClient.get(url)
    },
}

export default articalApi;