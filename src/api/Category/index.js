import axiosClient from "../axiosClient"
const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJXZWJzaXRlVGFtTG9uZ1ZhbmdIaWV1VGhhb1RodWFuQWRtaW4iLCJqdGkiOiI5MDA0MWJmYS04M2QwLTRlMDgtOTVmYi0zZTY1NzExNjNiMTMiLCJpYXQiOiI0LzEyLzIwMjIgMjozNzo1MyBBTSIsIlVzZXJJZCI6IjEiLCJVc2VyTmFtZSI6Imh1eW5odGhhb0BnbWFpbC5jb20iLCJBdmF0YXIiOiJzdHJpbmciLCJleHAiOjE2NDk4MTc0NzMsImlzcyI6Iklzc3VlciIsImF1ZCI6Iklzc3VlciJ9.KZ4YM-dTPcY323610XZso3gPvU-QqPvPzIPJEuCPe-8"

const categoryApi={
    getProject() {
        const url = '/Category/get-project-categories'
        return axiosClient.get(url)

    },
}
export default categoryApi