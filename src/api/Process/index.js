import axiosClient from "../axiosClient";

const token =""
const processApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'uploadImage':'process'
            }
        })
    },
    createProcess: (data) => {
        const url ='/process/create-process'
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    },
    editProcess: (data) => {
        const url =`/process/edit-process/${data.id}`
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    },
    
    getAll(params) {
        const url = '/process/get-processes'
        return axiosClient.get(url, {params: params})
    },
    get: (id) => {
        const url = `/process/get-process/${id}`
        return axiosClient.get(url)
    },
}

export default processApi;