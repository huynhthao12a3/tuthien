import axiosClient from "../axiosClient"

const categoryApi={
    getProject() {
        const url = '/Category/get-project-categories'
        return axiosClient.get(url)

    },
}
export default categoryApi