import axiosClient from "../axiosClient"

const categoryApi={
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    getProject() {
        const url = '/Category/get-project-categories'
        return axiosClient.get(url)

    },
    getNews() {
        const url = '/Category/get-news-categories'
        return axiosClient.get(url)

    },
    createCategory: (data) => {
        const url ='/Category/create-category'
        return axiosClient.post(url, data)
    },
    Delete:(id)=>{
        const url =`/Category/delete-category/${id}`
        return axiosClient.delete(url)
    },
}
export default categoryApi