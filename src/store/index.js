import { createStore } from 'vuex'

const modulesFiles = import.meta.globEager('./modules/*.js')
const modules = {}

for (const path in modulesFiles) {
  const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  modules[moduleName] = modulesFiles[path].default
}

export default createStore({
  modules: modules
})
