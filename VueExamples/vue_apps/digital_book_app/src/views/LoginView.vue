<template>
  <div class="login-outer-container">
    <div class="login-inner-container">
      <div class="login-container">
        <!-- 左侧区域 -->
        <div class="decorative-left">
        </div>

        <!-- 右侧区域 -->
        <div class="login-right">

          <!-- 账号密码登录 -->
          <div v-show="!loginInfo.isSmsLogin">
            <h2 class="login-title">账号密码登录</h2>
            <p class="login-tip">未注册的手机号验证后将自动注册</p>

            <div class="form-group">
              <input v-model="loginInfo.username" type="text" placeholder="请输入账号/手机号">
            </div>

            <div class="form-group">
              <input v-model="loginInfo.password" :type="loginInfo.showPassword ? 'text' : 'password'"
                placeholder="请输入密码">
            </div>
          </div>

          <!-- 手机验证码登录 -->
          <div v-show="loginInfo.isSmsLogin">
            <h2 class="login-title">手机验证码登录</h2>
            <p class="login-tip">未注册的手机号验证后将自动注册</p>

            <div class="form-group">
              <input v-model="loginInfo.phoneNumber" type="text" placeholder="请输入手机号">
            </div>

            <div class="form-group">
              <input v-model="loginInfo.captcha" placeholder="请输入验证码">
            </div>
          </div>

          <div class="form-options">
            <div v-show="!loginInfo.isSmsLogin" class="remember-me">
              <input id="remember-me" v-model="loginInfo.rememberMe" type="checkbox">
              <label for="remember-me">记住密码</label>
            </div>
            <div class="switch-method" @click="switchLoginMethod">
              验证码登录
            </div>
          </div>

          <button class="login-btn" :disabled="!canLogin" @click="handleLogin">登录</button>

          <div class="agreement">
            <input id="agreement" v-model="loginInfo.agreementAccepted" type="checkbox">
            <label for="agreement">阅读并同意 <a href="https://www.unischool.cn/student-pc/user">《用户服务协议》</a> 和 <a
                href="https://www.unischool.cn/student-pc/privacy">《隐私保护政策》</a></label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getSSOInfo as getSSOInfo, getTokenInfo, getUserInfo } from '../apis/loginApi'
import { setStorage } from '@/utils/storage'

const loginInfo = reactive({
  username: '',
  password: '',
  phoneNumber: '',
  captcha: '',
  rememberMe: false,
  showPassword: false,
  agreementAccepted: true,
  isSmsLogin: false
})

const router = useRouter()

const handleLogin = async () => {
  if (loginInfo.isSmsLogin) {
    if (!loginInfo.phoneNumber || !loginInfo.captcha) {
      alert('请填写手机号和验证码');
      return;
    }
  }
  else {
    if (!loginInfo.username || !loginInfo.password) {
      alert('账号或密码错误，请检查后输入');
      return;
    }
  }

  if (!loginInfo.agreementAccepted) {
    alert('请阅读并同意服务协议和隐私政策');
    return;
  }

  const { openid, serviceTicket } = await getSSOInfo(loginInfo.username, loginInfo.password);

  console.log(`openid: ${openid}`);
  setStorage("openid", openid);

  const { access_token } = await getTokenInfo(loginInfo.username, loginInfo.password, openid, serviceTicket);

  console.log(`token: ${access_token}`);
  setStorage("token", access_token);

  const { ux_user_id, optimus_token } = await getUserInfo(openid, access_token);

  console.log(`ux_user_id: ${ux_user_id}`);
  setStorage("ux_user_id", ux_user_id);

  console.log(`optimus_token: ${optimus_token}`);
  setStorage("optimus_token", optimus_token);

  router.push('/home');
}

const switchLoginMethod = () => {
  loginInfo.isSmsLogin = !loginInfo.isSmsLogin;
}

// // 监听用户名、密码不为空时，更新 canLogin 状态
// watch([() => loginInfo.username, () => loginInfo.password],
//   ([newUsername, newPassword]) => {
//     loginInfo.canLogin = newUsername && newPassword;
//   }
// );

const canLogin = computed(() => {
  return loginInfo.username && loginInfo.password && loginInfo.agreementAccepted;
});

</script>

<style scoped>
.login-outer-container {
  width: 100%;
  height: 100%;
  background-image: url('../assets/login_background.svg');
  /* 自动适配并覆盖整个容器 */
  background-size: cover;
  /* 居中显示 */
  background-position: center;
  /* 不重复 */
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-inner-container {
  width: 85%;
  height: 80%;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 51%, rgba(255, 255, 255, 0.8) 100%);
  border-radius: 20px;
  /* border: 1px solid; */
  border-image: linear-gradient(180deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 1)) 1 1;
  backdrop-filter: blur(2px);

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 25px;
  box-shadow: 0 15px 50px rgba(143, 100, 235, 0.2);
  overflow: hidden;
  display: flex;
  position: relative;
}

.decorative-left {
  flex: 1;
  /* background: linear-gradient(to right, #a78bfa 0%, #8b5cf6 100%); */
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  color: white;
}

.login-right {
  flex: 1;
  padding: 80px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-title {
  font-size: 28px;
  color: #202342;
  font-weight: bold;
  position: relative;
}

.login-title::before {
  content: '';
  position: absolute;
  bottom: 8px;
  left: -5px;
  width: 62px;
  height: 11px;
  background: linear-gradient(177deg, #685CF5 0%, rgba(114, 99, 255, 0.37) 100%);
  border-radius: 6px;
  opacity: 0.31;
}

.login-tip {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 35px;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

.form-group input {
  width: 100%;
  height: 55px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-group input:focus {
  border-color: #8b5cf6;
  outline: none;
  box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
}

/* .password-icon {
    width: 16px;
    height: 16px;
    background: url(data:image/png;base64,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) no-repeat 50%;
    background-size: 100%;
}

.password-icon-active {
    width: 16px;
    height: 16px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAvRJREFUWEfVl0tIVGEUx39npnxQSWKPRWKR9I6giKKXbVtE1iKjciGp00KMdKasjTptypyxKCLyES0s0RY9aNG20MKIgoiyRInQRS8MK5ypZk7MDBOpc+/cEWxqlnPPOd/v+3//891zhST/JMnr838CdHSovfse2XxnTljBFN6v38pAQYEEElXUsgKXHDq1N8BuFfaqkgdkjFlsWIT7orQtsnP9YKP8sAJjCcBVooVBOIUyz0pRhEEbHPM0S2u8eFOA42Wa5ffTirItXqGYz4W7qakUnrwgn4zyDQGcDl1KkDuq5CqokJhhozki9GFju7dRemJBxAQILa4B7gOzJ7Tz8UkfxE5eLIhxAM4ynY+fTlWyzRZPS4dZkR7g43vwjZijijAwxcamukZ5+2fkKICaGk37MkgXyhqjcjMzYdc+WLYK7PZIVCAAL5/BjWvwecgERHgyYx6b3G7xRaNGAVQWayNQalRi5WrYewBCu1eFD+8ikbPngkhEhbbL8PypqRpNDS3iGAfgKtH8oHLTyHCZWXDEDalp8Pgh3G6Hb18jZaZNhx17YO0G8PugvgaGYvg+Wtsm7PQ0y61QbliBmnLN+DLCC7M+d1TAkhXQ3QkdV2LvsKAI1m+GnufQdNb0KAZnpLPcfV6GwwDOEvWo4jRKmZ4BtV4IBqC6wthwoaM5cQZsdqh1wtdhYwgRvN5mcYUBKou1D1hoFL5wMZQdhYG3cOaEudsrqiE7By6chv7XprH9DS2Saw1gEZRVJQhQB/29FgFcxVofBNffPAIbeDwtcsSyCUsPw9KV8KgT2g1MuKcI1k3EhGEflOoOgtwya0OXG9LitKHPB544bYiN/IYmuf27DaPSJ/UiCkGcK9fUNyM8mMyreEE6Gw+dF3/Mqzj0Z5VDc34G6UrKyyhKNRmv4ykpbDl9UV6N7bR/cyCJUiZ1JPtTKmep7lelLpGhVIQqb5NcNb+4E5jzkjqWj91FUj5M4kk50eeWPkwmWtxKXtIBfgFxxmAw+9hzbAAAAABJRU5ErkJggg==) no-repeat 50%;
    background-size: 100%;
} */

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.remember-me input {
  margin-right: 8px;
}

.switch-method {
  color: #8b5cf6;
  cursor: pointer;
}

.login-btn {
  background: #8b5cf6;
  color: white;
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 10px rgba(139, 92, 246, 0.3);
}

.login-btn:hover {
  background: #7c3aed;
  transform: translateY(-3px);
  box-shadow: 0 7px 15px rgba(139, 92, 246, 0.4);
}

.login-btn:disabled {
  background: #7263FF;
  opacity: 0.5;
  cursor: not-allowed;
}

.login-btn:active {
  transform: translateY(0);
}

.agreement {
  display: flex;
  align-items: center;
  margin-top: 30px;
  font-size: 14px;
  color: #6b7280;
}

.agreement input {
  margin-right: 8px;
}

.agreement a {
  color: #8b5cf6;
  text-decoration: none;
}

.agreement a:hover {
  text-decoration: underline;
}
</style>
