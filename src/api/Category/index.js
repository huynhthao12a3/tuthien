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
    get: (id) => {
        const url = `/Category/get-info-category/${id}`
        return axiosClient.get(url)
    },
    getall:(type)=>{
        
        const url = `/Category/get-categories?type=${type}`
        return axiosClient.get(url)

    },
    createCategory: (data) => {
        const url =`/Category/create-category`
        return axiosClient.post(url, data)
    },
    Delete:(id)=>{
        const url =`/Category/delete-category/${id}`
        return axiosClient.delete(url)
    },
    UpdateCategoey:(data)=>{
        const url =`/Category/update-category/${data.id}`
        delete data.id
        return axiosClient.post(url, data)
    }
}
export default categoryApi