import axios from "axios"

const instance = axios.create({
    baseURL: 'https://sso.unipus.cn/sso',
    timeout: 10000,
    headers: {
        'x-device': 'C8BAFB35-0529-4655-1643-D352A971C1F6',
        'x-version': '0.0.1',
        'x-app-key': 'K12_CLOUD',
    }
});


// header["x-device"] = AppConfigInfo.UniqueId;
// header["x-version"] = AppConfigInfo.VersionName;
// header["x-app-key"] = AppConfig.HeaderAppKey;

// 获取sso_id  /4.0/sso/login
export function getSsoId(username, password) {
    return instance.post('/api/sso/4.0/sso/login', {
        username: username,
        password: password
    }).then(response => response.data)
    .catch(error => error.response.data);
}
