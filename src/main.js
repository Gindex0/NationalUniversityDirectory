import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // 导入路由配置

const app = createApp(App)
const pinia = createPinia()

// 按顺序挂载插件（建议：Pinia → Router）
app.use(pinia)
app.use(router) // 关键：挂载路由

app.mount('#app')