import axios from "axios";
import { getStorage } from "@/utils/storage";

// 创建axios实例
const instance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Scope': import.meta.env.VITE_APP_SCOPE_NAME,
        'x-app-key': import.meta.env.VITE_APP_KEY_REQUEST,
        'x-device': import.meta.env.VITE_APP_DEVICE_ID
    }
});

// 请求拦截器
instance.interceptors.request.use(
    config => {
        // Do something before request is sent
        const token = getStorage('token');
        if (token) {
            config.headers['Authorization'] = token;
        }

        if (config.url.indexOf('/api/platform') !== -1) {
            config.headers['x-version'] = '0.0.1';
            config.headers['x-timestamp'] = new Date().getTime();// 时间戳
            config.headers['x-nonce'] = '';// GUID
            config.headers['x-sign'] = '';
        }

        return config;
    },
    error => {
        // Do something with request error
        console.error("请求拦截器错误", error);
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        // Do something with response data
        const res = response.data;
        if (res.code !== 0 && res.code !== '0') {
            console.error("业务逻辑错误", res);
            return Promise.reject(new Error(res.message));
        }

        console.log("响应拦截器", res);
        const { data, rs } = res;
        return rs !== undefined ? rs : (data !== undefined ? data : null);
    },
    error => {
        // Do something with response error
        const status = error.response?.status;
        
        // Handle signal abort errors
        if (error.name === 'AbortError' || (error && error.message && error.message.includes('abort'))) {
            console.error('请求被中止:', error);
            return Promise.reject(new Error('请求被中止'));
        }
        
        switch (status) {
            case 400:
                console.error("请求参数错误");
                break;
            case 401:
                console.error("未授权或token已过期");
                break;
            case 403:
                console.error("没有权限");
                break;
            case 404:
                console.error("接口不存在");
                break;
            case 500:
                console.error("服务内部错误");
                break;
            default:
                console.error("未知错误", error);
                break;
        }
           
        return Promise.reject(error);
    }
);

// /**
//  * 生成sign
//  * 目前只对/api/platform的接口做加密处理
//  * @param {string} method - HTTP方法
//  * @param {string} url - 请求URL
//  * @param {string} nonce - 随机字符串
//  * @param {number} timeStamp - 时间戳
//  * @param {string} [body] - 请求体
//  * @returns {string|null} 生成的sign
//  */
// function generateSign(method, url, nonce, timeStamp, body = null) {
//     const urlKey = "/api/platform";
//     if (!url.includes(urlKey)) {
//         return null;
//     }

//     // url截取示例 /api/platform/v1/book/series_list
//     const start = url.indexOf(urlKey);
//     url = url.substring(start);

//     const secret = "cloudprod";

//     let str;
//     if (body !== null) {
//         // 假设存在md5函数
//         const bodyMd5 = md5(body);
//         str = `${method}${url}?body=${bodyMd5}&timestamp=${timeStamp}&nonce=${nonce}&secret=${secret}`;
//     } else {
//         if (url.includes("?")) {
//             str = `${method}${url}&timestamp=${timeStamp}&nonce=${nonce}&secret=${secret}`;
//         } else {
//             str = `${method}${url}?timestamp=${timeStamp}&nonce=${nonce}&secret=${secret}`;
//         }
//     }

//     // 假设存在sha256加密函数
//     return sha256(str);
// }

export default instance;