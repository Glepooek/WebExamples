import axios from "axios"

const instance = axios.create({
    timeout: 10000
});

/**
 * 获取sso信息
 * @param {string} username 用户名
 * @param {string} password 密码
 * @returns {Promise<any>}
 */
export async function getSsoInfo(username, password) {
    try {
        const response = await instance.post('/sso/4.0/sso/login', {
            username: username,
            password: password,
            service: "http://login.nse.unischool.cn"
        })
        if (response && response.data) {
            console.log(response.data);
            return response.data;
        } else {
            throw new Error('Response data is undefined');
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取token信息
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {object} rs
 * @returns {Promise<Object>} token信息
 */
export async function getTokenInfo(username, password, rs) {
    try {
        const response = await instance.post('/oauth/token', {
            username: username,
            password: btoa(password),
            grant_type: "password",
            scope: "com.fltrp.szjc.pc",
            client_secret: "eXGcAI3hpodz0yq8CrtZoB3deyZ1Lb7Jg19",
            client_id: "szjc-pc",
            "captchaCode": "",
            "encodeCaptha": "",
            serviceTicket: rs.serviceTicket,
            ssoId: rs.openid
        })
        if (response && response.data) {
            console.log(response.data);
            return response.data;
        } else {
            throw new Error('Response data is undefined');
        }
    } catch (error) {
        console.log(error)
    }
}

/**
 * 获取用户信息
 * @param {string} openid
 * @param {string} token
 * @returns {Promise<Object>}
 */
export async function getUserInfo(openid, token) {
    try {
        instance.defaults.headers.common['Authorization'] = token;
        instance.defaults.headers.common['Scope'] = "com.fltrp.szjc.pc";
        instance.defaults.headers.common['x-app-key'] = "K12_CLOUD";
        instance.defaults.headers.common['x-device'] = "9ea781a8-3868-4f81-aec8-a6dbd40da1e2";
        
        const response = await instance.post('/api/information/bindteacherinfo/getselfteacherinfo', {
            sso_id: openid
        })
        if (response && response.data) {
            console.log(response.data);
            return response.data;
        } else {
            throw new Error('Response data is undefined');
        }
    } catch (error) {
        console.log(error)
    }
}
