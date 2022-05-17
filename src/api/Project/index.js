import axiosClient from "../axiosClient";

// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJXZWJzaXRlVGFtTG9uZ1ZhbmdIaWV1VGhhb1RodWFuQWRtaW4iLCJqdGkiOiIxYzkzNzZlMS04ZjA2LTQ0OGEtYTM0YS0xNmZjNjRjNTJlOGIiLCJpYXQiOiI0LzEyLzIwMjIgNTowNDoxNiBBTSIsIlVzZXJJZCI6IjUiLCJVc2VyTmFtZSI6InRodWFudHJhbjEyYTMzQGdtYWlsLmNvbSIsIkF2YXRhciI6Imh0dHBzOi8vaW1hZ2VzLnBleGVscy5jb20vcGhvdG9zLzMzMDQ1L2xpb24td2lsZC1hZnJpY2EtYWZyaWNhbi5qcGc_YXV0bz1jb21wcmVzcyZjcz10aW55c3JnYiZkcHI9MiZoPTc1MCZ3PTEyNjAiLCJleHAiOjE2NDk4MjYyNTYsImlzcyI6Iklzc3VlciIsImF1ZCI6Iklzc3VlciJ9.h6Dn0NU9mcydkfR9vsSqAGf0BwiYTppJetPgGK4-J2Q"

const projectApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    createProject: (data) => {
        const url ='/project/create-project'
        return axiosClient.post(url, data)
    },
    editProject: (data) => {
        const url =`/project/update-project/${data.id}`
        delete data.ProjectId
        return axiosClient.put(url, data)
    },
    getAll(params) {
        const url = '/Project/get-project'
        return axiosClient.get(url,{params})
    },
    get: (id) => {
        const url = `/Project/get-project/${id}`
        return axiosClient.get(url)
    },
    getCategoryProject: ()=>{
        const url = `/Category/get-categories?type=1`
        return axiosClient.get(url)
    },
    upStatusProject:(id)=>{
        const url=`/Project/update-status-project/${id}`
        return axiosClient.patch(url)
    },
    upStatusProjectFail:(id)=>{
        const url=`/Project/update-status-project/${id}?iscancelled=true`
        return axiosClient.patch(url)
    },
    getTransaction:(id)=>{
        const url=`/Project/get-transactions?projectid=${id}` 
        return axiosClient.get(url)
    },
    getOwnerProject:(data)=>{
        const url=`/Project/get-ownerproject?currentpage=${data.currentpage}`
        return axiosClient.get(url)
    }
    
}

export default projectApi;