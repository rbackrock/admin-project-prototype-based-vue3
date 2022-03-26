import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import permission from '/@/directive/permission'

import '/@/theme/default/index.less'
// 自定义深蓝色主题
// import './theme/deep-blue/index.less'

createApp(App)
  .use(createPinia())
  .use(router)
  .use(permission.remove)
  .use(permission.disable)
  .mount('#app')
