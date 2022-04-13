import axiosClient from "../axiosClient";


const clientUser = {
    uploadFile:(data)=>{
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    login: (data) => {
        const url = '/user/login-user'
        return axiosClient.post(url, data)
    },
    register: (data) => {
        const url = '/user/user-register'
        return axiosClient.post(url, data)
    },
    get: (id) => {
        const url = `/user/get-user/${id}`
        return axiosClient.get(url)
    }, 
    updateUser: (data) => {
        const url = `/user/update-user/${data.userId}`
        return axiosClient.put(url, data)
    }, 
    
}

export default clientUser;