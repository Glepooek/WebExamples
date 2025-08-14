import './assets/csss/main.css'
import 'element-plus/dist/index.css'
import './assets/svgs/iconfont.js'
import SvgIcon from './components/icons/SvgIcon.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'

// 打印环境变量、设置标题
document.title = import.meta.env.VITE_APP_TITLE

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.component('svg-icon', SvgIcon)

app.mount('#app')
