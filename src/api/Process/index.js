import axiosClient from "../axiosClient";


const processApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    
    createProcess: (data) => {
        const url ='/process/create-process'
        return axiosClient.post(url, data)
    },
    editProcess: (data) => {
        const url =`/Project/update-process/${data.id}`
        delete data.postId
        return axiosClient.put(url, data)
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