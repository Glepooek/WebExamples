import './assets/main.css'
import 'element-plus/dist/index.css'
import './assets/iconfont.js'
import SvgIcon from './components/SvgIcon.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'

// 打印环境变量、设置标题
console.log(import.meta.env)
document.title = import.meta.env.VITE_APP_TITLE

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('svg-icon', SvgIcon)

app.mount('#app')
