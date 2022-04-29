import axios from "axios";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import  alertify from 'alertifyjs';
import * as $ from 'jquery';
import 'alertifyjs/build/css/alertify.css';




// Authorization token 
const adminInfo = localStorage.getItem('admin-info') ? JSON.parse(localStorage.getItem('admin-info')) : null
const clientInfo = localStorage.getItem('client-info') ? JSON.parse(localStorage.getItem('client-info')) : null

const userInfo = adminInfo != null ? adminInfo : clientInfo
const tokenExpiredTime = userInfo != null ? userInfo.expiredTime : 0
let authorizationToken = "";

// Check expired time token
const miliSecondPerDay = 86400000
if((Date.now() - tokenExpiredTime) > miliSecondPerDay && tokenExpiredTime == 0 ) {
  localStorage.clear();
  console.log('phiên đăng nhập hết hạn')
} else if((Date.now() - tokenExpiredTime) > miliSecondPerDay && tokenExpiredTime != 0) {
  alertify.alert('THÔNG BÁO', 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', function(){ 
    localStorage.clear()
    window.location.href = adminInfo ? '/admin/login' : '/login'
   });
} else {
  authorizationToken = userInfo.token
}
console.log('authorizationToken : ',authorizationToken);

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'CONTENT-TYPE': 'application/json',
        'Authorization':  authorizationToken
    }, 
    paramsSerializer: params => queryString.stringify(params),
  });

  // Add a request interceptor
  axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response && response.data) {
      return response.data
    }
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

  export default axiosClient;