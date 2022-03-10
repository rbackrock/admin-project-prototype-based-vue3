import { createStore } from 'vuex'

/**
 * 利用 webpack 的 require.context 能力，获取 modules 文件下的所有 .js 文件进行导出
 */

const modules = import.meta.globEager('./modules/*.js')
// const modulesFiles = require.context('./modules', true, /\.js$/)
// const modules = modulesFiles.keys().reduce((module, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   // eslint-disable-next-line no-param-reassign
//   module[moduleName] = value.default
//   return module
// }, {})

export default createStore({
  modules
})


