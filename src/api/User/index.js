import axiosClient from "../axiosClient";

const token =""

const userApi = {
    uploadFile:(data)=>{
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers:{
                'Content-Type': 'multipart/form-data',
                'uploadImage':'user'
            }
        })
    },
    login: (data) => {
        const url = '/user/user-login'
        return axiosClient.post(url, data)
    },
    register: (data) => {
        const url = '/user/user-register'
        return axiosClient.post(url, data)
    },
    getAll(params) {
        const url = '/user/get-users'
        return axiosClient.get(url, {params: params})
   },
    get: (id) => {
        const url = `/user/get-user/${id}`
        return axiosClient.get(url)
    }, 
    lock: (id) => {
        const url = `/user/lock-user/${id}`
        return axiosClient.patch(url, {
            headers: {
                'Authorization': token
            }
        })
    },
    unLock: (id) => {
        const url = `/user/unlock-user/${id}`
        return axiosClient.patch(url, {
            headers: {
                'Authorization': token
            }
        })
    },
    updateUser: (data) => {
        const url = `/user/update-user/${data.userId}`
        return axiosClient.put(url, data, {
            headers: {
                'Authorization': token
            }
        })
    }, 
    
}

export default userApi;