import axios from 'axios'
import { baseURL } from '../config';
var instance = axios.create({
    // http://127.0.0.1:4523/m1/2385610-0-default/admin/login
    // baseURL: 'https://bd:4523/m1/2385610-0-default',
    // 可以加判断,根据node是开发/生产环境来选择不同url
    baseURL,
    timeout: 5000,
    headers: {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Headers': '*',
        //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
        // 统一json请求格式
        "Content-Type": "application/json"
    }
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 加密
    config.headers.Secret =
        Math.random() // 生成随机数字, eg: 0.123456
            .toString(36) // 转化成36进制 : "0.4fzyo82mvyr"
            .slice(-8) + // 截取最后八位 : "yo82mvyr"  +
        "mal" +
        Math.random() // 生成随机数字, eg: 0.123456
            .toString(36) // 转化成36进制 : "0.4fzyo82mvyr"
            .slice(-8) + // 截取最后八位 : "yo82mvyr" 
        "red" +
        Math.random() // 生成随机数字, eg: 0.123456
            .toString(36) // 转化成36进制 : "0.4fzyo82mvyr"
            .slice(-8); // 截取最后八位 : "yo82mvyr" 
    // 浏览器有缓存token就在请求头携带
    if (sessionStorage.getItem('token')) {
        config.headers.token = sessionStorage.getItem('token')
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。  
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default instance