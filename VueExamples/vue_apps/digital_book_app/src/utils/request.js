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
            config.headers.Authorization = token;
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
        if (res.code !== 0 || res.code !== '0') {
            console.error("响应拦截器错误", res);
            return Promise.reject(new Error(res.message));
        }

        console.log("响应拦截器", res);
        const { data, rs } = res;
        return rs !== undefined ? rs : (data !== undefined ? data : null);
    },
    error => {
        // Do something with response error
        const status = error.response?.status;
        switch (status) {
            case 400:
                console.error("请求参数错误");
                break;
            case 401:
                console.error("未授权或token已过期");
                break
            case 403:
                console.error("没有权限");
                break;
            case 404:
                console.error("接口不存在");
                break;
            case 500:
                console.error("服务内部错误");
                break;
        }
        return Promise.reject(error);
    }
);

export default instance;