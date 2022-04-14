import axiosClient from "../axiosClient";

const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJXZWJzaXRlVGFtTG9uZ1ZhbmdIaWV1VGhhb1RodWFuQWRtaW4iLCJqdGkiOiIzZjBhOWM0Ni1iMzBlLTRhMmQtYWExYi00NmNjOTQ3NGYwN2IiLCJpYXQiOiI0LzEzLzIwMjIgMTI6MDI6MzMgUE0iLCJVc2VySWQiOiI0IiwiVXNlck5hbWUiOiJ0aHVhbnRyYW4xMmEzQGdtYWlsLmNvbSIsIkF2YXRhciI6InN0cmluZyIsImV4cCI6MTY0OTkzNzc1MywiaXNzIjoiSXNzdWVyIiwiYXVkIjoiSXNzdWVyIn0.kNu04djsboNiNneBvZY9zwwn1d6yovLz6TfrnWfS4Fs'
const processApi = {
    uploadFile: (data) => {
        const url = '/file/upload-image'
        return axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },
    createProcess: (data) => {
        const url ='/process/create-process'
        return axiosClient.post(url, data)
    },
    editProcess: (data) => {
        const url =`/Project/update-process/${data.id}`
        delete data.postId
        return axiosClient.put(url, data ,{
            headers: {
                'Authorization': token
            }
        })
    },
    
    getAll(params) {
        const url = '/process/get-processes'
        return axiosClient.get(url, {params: params})
    },
    get: (id) => {
        const url = `/process/get-process/${id}`
        return axiosClient.get(url)
    },
}

export default processApi;