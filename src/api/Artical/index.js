import axiosClient from "../axiosClient";

const token =""
const articalApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'uploadImage':'artical'
            }
        })
    },
    createArtical: (data) => {
        const url ='/artical/create-artical'
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
    },
    editArtical: (data) => {
        const url =`/artical/edit-artical/${data.id}`
        return axiosClient.post(url, data, {
            headers: {
                'Authorization': token
            }
        })
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