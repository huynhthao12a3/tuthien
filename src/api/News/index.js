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
        const url = '/news/get-news'
        return axiosClient.get(url, {params: params})
    },
    get: (id) => {
        const url = `/news/get-newsinfo/${id}`
        return axiosClient.get(url)
    },
    update: (data)=>{
        const url=`/news/update-news/${data.id}`
        return axiosClient.put(url,data)
    },
    delete:(id)=>{
        const url =`/news/delete-news/${id}`
        return axiosClient.delete(url)
    }
}

export default newsApi;