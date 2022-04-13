import axiosClient from "../axiosClient";

const newsApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    createNews: (data) => {
        const url ='/news/create-news'
        return axiosClient.post(url, data)
    },
    editNews: (data) => {
        const url =`/news/edit-news/${data.id}`
        return axiosClient.post(url, data)
    },
    
    getAll(params) {
        const url = '/news/get-newses'
        return axiosClient.get(url, {params: params})
    },
    get: (id) => {
        const url = `/news/get-news/${id}`
        return axiosClient.get(url)
    },
}

export default newsApi;