<template>
  <div class="login-outer-container">
    <div class="login-inner-container">
      <div class="login-container">
        <!-- 左侧区域 -->
        <div class="decorative-left">
        </div>

        <!-- 右侧区域 -->
        <div class="login-right">
          <h2 class="login-title">账号密码登录</h2>
          <p class="login-tip">未注册的手机号验证后将自动注册</p>

          <div class="form-group">
            <input type="text" v-model="loginInfo.username" placeholder="请输入账号/手机号">
          </div>

          <div class="form-group">
            <!-- <el-input type="password" placeholder="请输入密码" v-model="loginInfo.password"
              show-password /> -->
            <input :type="loginInfo.showPassword ? 'text' : 'password'" v-model="loginInfo.password"
              placeholder="请输入密码">
          </div>

          <div class="form-options">
            <div class="remember-me">
              <input type="checkbox" id="remember-me" v-model="loginInfo.rememberMe">
              <label for="remember-me">记住密码</label>
            </div>
            <div class="switch-method" @click="switchLoginMethod">
              验证码登录
            </div>
          </div>

          <button class="login-btn" @click="handleLogin">登录</button>

          <div class="agreement">
            <input type="checkbox" id="agreement" v-model="loginInfo.agreementAccepted">
            <label for="agreement">阅读并同意 <a href="https://www.unischool.cn/student-pc/user">《用户服务协议》</a> 和 <a
                href="https://www.unischool.cn/student-pc/privacy">《隐私保护政策》</a></label>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const loginInfo = reactive({
  username: '',
  password: '',
  rememberMe: false,
  showPassword: false,
  agreementAccepted: false,
  isSmsLogin: false
})

const router = useRouter()

const handleLogin = () => {
  if (!loginInfo.username || !loginInfo.password) {
    alert('账号或密码错误，请检查后输入');
    return;
  }

  if (!loginInfo.agreementAccepted) {
    alert('请阅读并同意服务协议和隐私政策');
    return;
  }

  // 模拟登录成功
  alert(`登录成功！\n账号：${loginInfo.username}\n记住密码：${loginInfo.rememberMe ? '是' : '否'}`);
  router.push('/home');
}

const switchLoginMethod = () => {
  loginInfo.isSmsLogin = !loginInfo.isSmsLogin;
  alert('已切换到验证码登录模式（功能尚未实现）');
}
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
  margin-bottom: 10px;
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
