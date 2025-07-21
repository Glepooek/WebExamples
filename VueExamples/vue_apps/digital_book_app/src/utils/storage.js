/**
 * 本地存储
 * @param {string} key 键
 * @param {*} value 值
 */
export const setStorage = (key, value)=> {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

/**
 * 获取指定数据
 * @param {string} key 键
 * @returns {*} 值
 */
export const getStorage = (key) => {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch {
    return data;
  }
}

/**
 * 删除指定数据
 * @param {string} key 键
 */
export const removeStorage = (key) => {
  localStorage.removeItem(key);
}

/**
 * 清空所有数据
 */
export const clearStorage = () => {
  localStorage.clear();
}