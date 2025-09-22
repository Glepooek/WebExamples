import "./assets/main.css"
import "element-plus/dist/index.css"

import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import ElementPlus from "element-plus"
import i18n from "./plugins/i18n.js"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(i18n, {
  greetings: {
    hello: "Bonjour!",
  },
})

app.mount("#app")
