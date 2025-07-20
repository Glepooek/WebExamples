import request from '@utils/request.js'

/**
 * 获取一级菜单列表
 * @returns {Promise<Object>}
 */
export async function getMenuList() {
  return request.get('/api/platform/v1/digital/textbook/tab/new')
}

/**
 * 获取图书列表
 * @param {string} tabId
 * @returns {Promise<Object>}
 */
export async function getBookList(tabId) {
  return request.get(`api/platform/v1/digital/textbook/list/v2?tabId=${tabId}`)
}