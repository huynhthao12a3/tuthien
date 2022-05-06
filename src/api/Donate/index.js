import axiosClient from "../axiosClient";

const DanateApi = {
  getall:(params)=>{
    const url = `/transactionHistory/get-transaction`
    return axiosClient.get(url, {params: params})
  }
}

export default DanateApi;