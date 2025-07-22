import request from "@/utils/request"

/**
 * 获取一级菜单列表
 * @param {AbortSignal|null} signal - 可选的中止信号
 * @returns {Promise<Object>}
 */
export async function getMenuList(signal = null) {
  return await request.get('/api/platform/v1/digital/textbook/tab/new', {
    signal: signal
  })
}

/**
 * 获取图书列表
 * @param {string} tabId
 * @param {AbortSignal|null} signal - 可选的中止信号
 * @returns {Promise<Object>}
 */
export async function getBookList(tabId, signal = null) {
  return await request.get(`/api/platform/v1/digital/textbook/list/v2?tabId=${tabId}`, {
    signal: signal
  })
}