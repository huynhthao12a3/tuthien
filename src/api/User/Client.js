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
        const url = '/user/register-user'
        return axiosClient.post(url, data)
    },
    get: (id) => {
        const url = `/user/get-user/${id}`
        return axiosClient.get(url)
    }, 
    getUserInfo: ()=>{
        const url="/user/get-userinfo"
        return axiosClient.get(url)
    },
    updateUser: (data) => {
        const url = `/user/update-user/${data.userId}`
        return axiosClient.put(url, data)
    }, 
    donateProject: (data) => {
        const url = `/user/donate-project?projectid=${data.id}`
        delete data.id
        return axiosClient.post(url, data)
    },
    widthdrawProject: (data) => {
        const url = `/user/withdraw-donate?projectid=${data.id}`
        delete data.id
        return axiosClient.post(url, data)
    },
    refundProject: (data) => {
        const url = `/user/refund-donate?projectid=${data.id}`
        delete data.id
        return axiosClient.post(url, data)
    },
    getTransaction: () => {
        const url = `/user/get-user-transaction`
        return axiosClient.get(url)
    },
    dashboardStatistical: (params) => {
        const url ='Dashboard/dash-board-statistical'
        return axiosClient.get(url,{params})
    },
    confirmEmail: (params) => {
        const url =`/user/confirm-email?email=${params.email}&code=${params.code}`
        return axiosClient.patch(url)
    },
    updateUserInfo:(data)=>{
        const url =`/User/update-userinfo`
        return axiosClient.put(url,data)
    }
}

export default clientUser;