import axiosClient from "../axiosClient";

// const adminToken = localStorage.getItem('admin-info') ? JSON.parse(localStorage.getItem('admin-info')).token : null
// const clientToken = localStorage.getItem('client-info') ? JSON.parse(localStorage.getItem('client-info')).token : null

// const token = adminToken ? adminToken : clientToken
// const authorizationToken = token ? token : ""
// console.log('authorizationToken : ',authorizationToken);
const adminUser = {
    uploadFile:(data)=>{
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers:{
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    login: (data) => {
        const url = '/User/login-admin'
        return axiosClient.post(url, data)
    },
    register: (data) => {
        const url = '/user/register-user'
        return axiosClient.post(url, data)
    },
    registerAdmin:(data)=>{
        const url = '/User/admin-register'
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
        return axiosClient.patch(url)
    },
    unLock: (id) => {
        const url = `/user/unlock-user/${id}`
        return axiosClient.patch(url)
    },
    delete:(id)=>{
        const url =`/user/delete-user/${id}`
        return axiosClient.delete(url)
    },
    updateUser: (data) => {
        const url = `/user/update-user/${data.id}`
        return axiosClient.put(url, data)
    }, 
    getAllDashBoardRatings() {
        const url = '/Dashboard/dash-board-ratings'
        return axiosClient.get(url)
   },
   getStatistical:(params)=>{
       const url=`/Dashboard/dash-board-statistical?Year=${params.Year}`
       return axiosClient.get(url)
   }
}

export default adminUser;