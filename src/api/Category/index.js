import axiosClient from "../axiosClient"

const categoryApi={
    getProject() {
        const url = '/Category/get-project-categories'
        return axiosClient.get(url)

    },
    getNews() {
        const url = '/Category/get-news-categories'
        return axiosClient.get(url)

    },
}
export default categoryApi