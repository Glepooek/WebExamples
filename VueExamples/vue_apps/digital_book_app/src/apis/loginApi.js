import request from "@/utils/request"

/**
 * 获取sso信息
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {AbortSignal} signal
 * @returns {Promise<any>}
 */
export async function getSSOInfo(username, password, signal = null) {
    return await request.post('/sso/4.0/sso/login', {
        username: username,
        password: password,
        service: "http://login.nse.unischool.cn"
    }, {
        signal: signal
    })
}

/**
 * 获取token信息
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} openid
 * @param {string} serviceTicket
 * @param {AbortSignal} signal
 * @returns {Promise<Object>} token信息
 */
export async function getTokenInfo(username, password, openid, serviceTicket, signal = null) {
    return await request.post('/oauth/token', {
        username: username,
        password: btoa(password),// base64编码
        grant_type: "password",
        scope: import.meta.env.VITE_APP_SCOPE_NAME,
        client_secret: import.meta.env.VITE_APP_CLIENT_SECRET,
        client_id: import.meta.env.VITE_APP_CLIENT_ID,
        captchaCode: "",
        encodeCaptha: "",
        serviceTicket: serviceTicket,
        ssoId: openid
    }, {
        signal: signal
    })
}

/**
 * 获取用户信息
 * @param {string} openid
 * @param {AbortSignal} signal
 * @returns {Promise<Object>}
 */
export async function getUserInfo(openid, signal = null) {
    return await request.post('/api/information/bindteacherinfo/getselfteacherinfo', {
        sso_id: openid
    }, {
        signal: signal
    })
}
