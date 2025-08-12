import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'

export const useUserInfoStore = defineStore('userInfo', () => {
  const token = ref('')
  const optimusToken = ref('')
  const uxUserId = ref('')
  const userName = ref('')

  const hasToken = computed(() => token.value.trim() !== '' && optimusToken.value.trim() !== '')

  /**
   * 保存登录成功状态
   * @param {string} newToken
   * @param {string} newOptimusToken
   * @param {string} newUxUserId
   * @param {string} newUserName
   */
  const loginSuccess = (newToken, newOptimusToken, newUxUserId, newUserName) => {
    token.value = newToken
    optimusToken.value = newOptimusToken
    uxUserId.value = newUxUserId
    userName.value = newUserName

    //存储在LocalStorage中
    setStorage("token", newToken)
    setStorage("optimusToken", newOptimusToken)
    setStorage("uxUserId", newUxUserId)
    setStorage("userName", newUserName)
  }

  /**
   * 登出清空状态
   */
  const logoutSuccess = () => {
    token.value = ''
    optimusToken.value = ''
    uxUserId.value = ''
    userName.value = ''

    //清除LocalStorage
    removeStorage("token")
    removeStorage("optimusToken")
    removeStorage("uxUserId")
    removeStorage("userName")
  }

  /**
   * 从localStorage中恢复用户信息
   */
  const restoreUserInfo = () => {
    const tokenFromStorage = getStorage('token');
    const optimusTokenFromStorage = getStorage('optimusToken');
    const uxUserIdFromStorage = getStorage('uxUserId');
    const userNameFromStorage = getStorage('userName');

    if (tokenFromStorage) {
      token.value = tokenFromStorage
    }

     if (optimusTokenFromStorage) {
      optimusToken.value = optimusTokenFromStorage
    }

     if (uxUserIdFromStorage) {
      uxUserId.value = uxUserIdFromStorage
    }

     if (userNameFromStorage) {
      userName.value = userNameFromStorage
    }
  }
  
  return { token, optimusToken, uxUserId, userName, hasToken, loginSuccess, logoutSuccess, restoreUserInfo }
})
