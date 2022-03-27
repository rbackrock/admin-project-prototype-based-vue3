# 介绍

这是按照个人喜好搭建的一套基于 Vue3 和 AntdV 的前端原型项目，仅供学习交流，不接受 PR ，不定期更新常用组件，因所用框架，组件库，类库不稳定，主要用于交流和学习，只关注 Chrome 浏览器正常使用

该原型项目提供了三种布局类型，还有一套自定义深蓝色主题，因 AntdV 组件库数量众多，难免在深蓝色的主题下，组件没有完全覆盖

因精力和水平有限，难免有遗漏和问题，请多包涵

整个原型项目使用 `<script setup></script>` 的形式编写，所以以下说明和描述默认情况下都以这种编写方式为准

优先更新我的 [Github](https://github.com/rbackrock/admin-project-prototype-based-vue3)

如果在查看演示或者开发中发现页面响应慢的问题，是因为你开着 `dev-tools` 并且使用了 [Vue 的开发扩展程序](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=zh-CN)我遇到的时候，扩展程序为 6.1.3 版

## 为什么要写这个原型项目

+ 曾经使用过 [Ant Design of React](https://ant.design/docs/react/introduce-cn) 组件库，非常喜欢它的风格
+ 想要有一个属于自己的原型项目基建
+ 基于 Antd 的 Vue3 版本的开箱即用原型项目 Ant Design Pro 没有开源需要付费，需要 ￥8999 ，喜欢但是没钱那就只能自己写一个低配版本了

# 运行

为了方便演示，项目使用了 Vite 的 [middlewareMode](https://vitejs.dev/config/#server-middlewaremode) 模式，因此 mock 的服务器可以独立运行

mock 服务器独立运行，提供 mock 数据的接口，此命令只运行 mock 服务器，不运行 vite 项目

```bash
npm run start:server
```

以 Vite 的 `middlewareMode` 运行整个 vite 项目，接口模拟数据都是真实网络请求可以在 `dev-tools` 的 Network 面板中看到，用于展示比较完整的原型项目

```bash
npm run dev:mock
```

开发时使用，需要准备真实后端服务器，如果需要，在 `vite.config.js` 中设置后端服务器地址进行代理设置

```bash
npm run dev
```

项目生产环境打包

```bash
npm run build
```

# 预览

原型项目提供三种布局样式和自定义主题，接下来分别对每种布局样式展示默认主题和深蓝色主题截图，如果截图无法显示，试试刷新，或者可以在 [screenshots](https://github.com/rbackrock/vue3-scaffold/tree/main/screenshots) 查看

## Mix Menu Layout

![mix-layout-default](http://images.rback.fun/mix-layout-default.png)

![mix-layout-deep-blue](http://images.rback.fun/mix-layout-deep-blue.png)

## Side Menu Layout

![side-layout-default](http://images.rback.fun/side-layout-default.png)

![side-layout-deep-blue](http://images.rback.fun/side-layout-deep-blue.png)

## Top Menu Layout

![top-layout-default](http://images.rback.fun/top-layout-default.png)

![top-layout-deep-blue](http://images.rback.fun/top-layout-deep-blue.png)

# TODO
布局参考 [Ant Design Pro](https://store.antdv.com/pro/preview/workplace)

## 布局
- [x] 可选 Side Menu Layout
- [x] 可选 Top Menu Layout
- [x] 可选 Mix Menu Layout
- [X] 导航 Tabs (所有页面 Tab 带刷新功能。除固定页面外，其他页面可以关闭) 支持单击右键菜单实现，“关闭其他”，“关闭到左侧”，“关闭到右侧”，“刷新当前页”
- [x] 自定义一套深蓝色主题（推荐用于在数据查询和展现）

## 组件

点击名称查看说明和使用方法

- [X] [Crud](https://github.com/rbackrock/admin-project-prototype-based-vue3#crud)
- [X] [表格操作](https://github.com/rbackrock/admin-project-prototype-based-vue3#%E8%A1%A8%E6%A0%BC%E6%93%8D%E4%BD%9C%E5%B8%B8%E7%94%A8%E6%93%8D%E4%BD%9C%E7%BB%84%E4%BB%B6)（新增，刷新，表格大小，表格显示列）
- [X] [表格操作列](https://github.com/rbackrock/admin-project-prototype-based-vue3#%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE%E6%93%8D%E4%BD%9C%E5%88%97%E7%BB%84%E4%BB%B6)（表格行中的操作列，预置查看，编辑，删除按钮）

...待添加

## 自定义指令

点击名称查看说明和使用方法

- [X] [按钮级别操作权限](https://github.com/rbackrock/admin-project-prototype-based-vue3#%E6%9D%83%E9%99%90%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E4%BB%A4)（支持设置 disable 属性或者直接删除该 DOM 节点）

# 更改 Layout

修改 `/src/store/modules/settings.js` 文件中 `state` 值 `layoutType`

其中有三个值

+ `SIDE_MENU` Side layout

+ `TOP_MENU` Top Layout

+ `MIX_MENU` Mix Layout

# 更改主题

更改主题在两处修改即可

+ `/src/main.js` 

  如果是默认主题则放开 `import './theme/default/index.less'` 注释

  如果是深蓝色主题则放开 `import './theme/deep-blue/index.less'` 注释

+ `/src/store/modules/settings.js`

  更改 `state` 的 `theme` 赋值

  如果是默认主题则赋值 `theme: themeConsts.DEFAULT_THEME`

  如果是深蓝色主题则赋值 `theme: themeConsts.DEEP_BLUE_THEME`

如果需要添加或者修改深蓝色主题请修改 `/src/theme/deep-blue/deep-blue.less` 文件

# 约定

当前原型项目的一些预置功能和能力需要后端数据的支持，需要和后端响应的数据有一些必要的约定

## 异步请求数据响应体的约定

```js
{
  code: 20000,  // 自定义的业务码，目前自定义 20000 为正常响应，可根据后端实际设计修改，一般如果不是正常值，则意味着后端出错详细信息请查看 /src/http/index.js 文件
  data: [],     // 响应的数据，可以是 Array Object String Number Boolean
  message: null,  // 响应数据的提示信息，如果是 null 则不会提示提示信息，在封装的 http 对象中可以使用 disableMessage 属性来关闭自动 message 提示
  success: true // 当前业务请求是否成功，此处一般定义为，无法删除，用户名密码错误等，对请求的行为本身进行是否成功回应，不代表后端报错
}
```

## 后端导航菜单和前端路由表映射数据的约定

系统应该有一个页面专门维护前端路由表和导航菜单的映射关系，一个典型的导航菜单数据格式例子如下

```js
{
  routeName: 'Home', // 和前端 router-table.js 路由表中的路由 name 值对应
  title: '首页', // 导航菜单的名称
  uniqueTag: 'Home', // 此菜单唯一标识，如果不使用 a-menu-item-group 组件的话，默认和 routeName 一致即可，否则的话自定义一个唯一标识字符串 
  type: 'menu', // 菜单的类型，一共三种，分别是 catalog group menu 其中 catalog 其实代码的是 a-sub-menu 组件，group 代表的是 a-menu-item-group 组件，menu 代表的是 a-menu-item 组件
  fixed: true, // 此原型项目默认带有菜单标签页，fixed 代表此菜单页无法被关闭
  children: [] // 导航菜单嵌套的字段
}
```

## 用户权限的约定

用户权限包含两大部分，一部分是导航菜单，一部分是用户 rule

### 导航菜单权限

导航菜单的权限数据格式和后端维护的数据格式一致，但是意义不一样

系统维护的菜单数据，代表前端路由表和导航菜单的映射关系

导航菜单的权限数据则表示着，当登录用户具有哪些导航菜单使用权

导航菜单权限的数据格式和上文中的 [导航菜单和前端路由表映射数据的约定](https://github.com/rbackrock/admin-project-prototype-based-vue3#%E5%90%8E%E7%AB%AF%E5%AF%BC%E8%88%AA%E8%8F%9C%E5%8D%95%E5%92%8C%E5%89%8D%E7%AB%AF%E8%B7%AF%E7%94%B1%E8%A1%A8%E6%98%A0%E5%B0%84%E6%95%B0%E6%8D%AE%E7%9A%84%E7%BA%A6%E5%AE%9A) 一致

### 用户操作权限数据的约定

系统应该有一个页面维护哪个角色拥有某个页面有哪些操作数据的权限，或者如果存在导航菜单权限可以挂在对应菜单中，不管哪种都可以灵活设置，也支持全字符串权限标识匹配，约定针对页面的用户操作权限格式如下

```js
[
  'ExamplePermission:add',
  'ExamplePermission:modify'
]
```

`:` 之前代表的是具体前端路由中的 `name` 值，`:` 之后代表的是权限的名称

## 数据字典数据的约定

实例如下：

```js
{
  typeDescription: '导航菜单类型', // 数据字典的描述
  typeName: 'navigationMenuType', // 数据字典类型名称
  code: [
    {
      codeDescription: '导航分类', // 对应数据字典中值的描述
      codeName: 'catalog', // 对应数据字典中值名称
      codeValue: 'catalog' // 对应数据字典中的值
    },
    {
      codeDescription: '导航分组',
      codeName: 'group',
      codeValue: 'group'
    },
    {
      codeDescription: '导航菜单',
      codeName: 'menu',
      codeValue: 'menu'
    }
  ]
}
```

# 说明

## 前端路由和导航菜单

导航菜单的数据是后端来维护，它描述的是系统中导航菜单显示的结构，不一定和前端路由 `router-table.js` 的结构一一对应，`router-table.js` 只用于前端管理页面路由使用，它们有关联但是不对等

前端路由表被单独拆分出来，位置在 `/src/router/router-table.js`

因为原型项目使用的 AntdV 组件库的图标是组件，所以菜单中使用的图标专门为 `/src/router/icon-mapper.js` 文件维护

## throttle/debounce 方法的使用 

假设页面中有 `<a-form @finish="handleLogin" />`

那么，如果在 `<script setup></script>` 中

```js
<script setup>
  import { getCurrentInstance } from 'vue'
  import { throttle } from '/@/utils/helper'

  const handleLogin = throttle(function(throttleInstance, form) {
    console.log(this)
  }, getCurrentInstance().proxy)
</script>
```

如果在一般 `<script></script>` 中

```js
<script setup>
  export default {
    methods: {
      handleLogin: throttle.call(this, function(throttleInstance, form) {
        console.log(this)
      })
    }
  }
</script>
```

`debounce` 同理

如果使用组合式 API 方式编写，很少有使用 `this` 的场景，示例中只是为了演示

其中 `throttleInstance` 是当前节流对象，可以使用 `cancel` 取消延迟方法和 `flush` 立即执行方法

# 自定义指令使用

## 权限自定义指令

### 使用方法

假设有增加，修改，删除三个按钮，先定义 `disable` 的 `state`

```js
const disabledAddVariable = reactive({
  disabled: false
})
const disabledModifyVariable = reactive({
  disabled: false
})
const disabledDeleteVariable = reactive({
  disabled: false
})
const disabledViewVariable = reactive({
  disabled: false
})
```

权限指令分为 `disable` 和 `remove` 两种，其中响应式数据汇总的 `disabled` 属性名称不可更改为其他名称

+ `disable` 类型的权限指令使用该指令会使目标组件的 `disable` 为 `true` 常见于 `a-button` 组件，或者任何有此属性的组件都可以使用

  使用方式如下

  ```html
  <!-- disabledAdd, disabledModify, disabledDelete 为按钮 disabled 属性的响应属性，必须要有 -->
  <!-- 原型项目会约定用户 rule 中权限的描述为：'页面name:权限描述'  -->
  <!-- 例如该例子中用户的 rule 数据为 ['ExamplePermission:add', 'ExamplePermission:modify'] -->
  <!-- 也可以使用全字符串匹配，例如查看按钮，此时 rule 数据为 ['ExamplePermissionView'] -->
  <!-- 该指令传入的数据直接使用权限描述的数组即可 -->
  <a-button v-permission-disable:[disabledAddVariable]="['add']" :disabled="disabledAddVariable.disabled">新增</a-button>
  <a-button v-permission-disable:[disabledModifyVariable]="['modify']" :disabled="disabledModifyVariable.disabled">修改</a-button>
  <a-button v-permission-disable:[disabledDeleteVariable]="['delete']" :disabled="disabledDeleteVariable.disabled">删除</a-button>
  <a-button v-permission-disable:[disabledViewVariable]="['ExamplePermissionView']" :disabled="disabledViewVariable.disabled">查看</a-button>
  ```
  
+ `remove` 类型的权限指令如果没有权限则会直接删除该 DOM 节点  

  使用方式如下

  ```html
  <!-- 权限描述和 disable 一样 -->
  <a-button v-permission.remove="['add']">新增</a-button>
  <a-button v-permission.remove="['modify']">修改</a-button>
  <a-button v-permission.remove="['delete']">删除</a-button>
  ```

完整示例可以[点这里](https://github.com/rbackrock/admin-project-prototype-based-vue3/blob/main/src/views/example/permission/index.vue)查看

# 组件使用

## Crud

### 介绍

该组件主要有两部分构成，分别是 Crud 布局组件和 Crud 组合式 API 的封装，这两部分并不是相互依存关系，可以灵活选用

Crud 主要针对常见需求进行数据抽象编写而成，所以不一定非要使用在例如以表格为主的数据操作上，可以很大程度上减少代码编写量

它本质上是封装维护了增删改查常用的一系列变量和逻辑操作，例如点击“新建”按钮，打开一个新增记录的模态框输入完数据点击保存按钮开始。首先，按钮开始 laoding 状态，然后请求后端保存数据，保存成功以后，保存按钮关闭 loading 状态，关闭模态框，之后查询表格数据等等，这样的行为几乎都是 Crud 中固定的操作，Crud 组件设计的初衷就是为了减少类似逻辑操作的代码编写，自行维护和管理。同时设计了一系列整个流程的钩子方法，在常规操作中有特殊操作也可以很轻松的插入到整个逻辑过程中

因为 Vue3 组合式 API 的设计，得益于数据可以彻底从 UI 中彻底分离出来，不再耦合 UI 所以可以一个页面有多个 Crud 独立维护互不影响。我在 Vue2 的版本中也实现了类似功能，有很多缺点，其中最大的缺点就是一个 `.vue` 中只能有一个 Crud 进行维护，并且因为是通过 `mixins` 的方式插入进来，极大限制了功能

示例页面代码可以点[这里](https://github.com/rbackrock/admin-project-prototype-based-vue3/blob/main/src/views/example/crud/index.vue)查看，179 行代码完成表格数据的条件查询，表格数据添加，修改，删除。不但如此，该示例页面还展示了表格操作（`TableControl`）和 表格操作列（`TableRecordControl`） 组件的使用

得益于 Vue3 组合式 API 的设计，Crud 可以在一个 `.vue` 页面中使用多个 Crud

Crud 只是对常见的业务数据进行抽象，使用以后，可以全部使用，可以部分使用

### Crud 布局组件

在管理类型的系统中，最为常见的数据操作例如查询表格，对表格数据的新增或者编辑，删除表格数据。布局组件主要统一了这类需求的样式和布局。并且提供了插槽作用域的 Crud 常量以方便使用。需要注意的是，符合这类需求即可使用

Crud 布局组件有三个插槽

+ `search-layout` 用于数据查询条件布局，一般情况下它是一个查询条件的表单，带一个“查询”按钮
+ `content-layout` 用于数据的展示（例如，表格）数据展示不一定非要是表格
+ `form-layout` 用于对数据新增修改的表单，它可能是一个 `a-modal` 或者 `a-drawer` 或者其他什么组件都行

### Crud 组合式函数使用的响应式数据

注意：项目中，默认分页数据会返回 `total` 字段和 `list` 查询数据，如果需要修改，请修改[这里](https://github.com/rbackrock/admin-project-prototype-based-vue3/blob/main/src/components/Crud/composables/useCrud.js)的 `159` 行

Crud 组合式函数使用的响应对象一共有两大类

+ `crudReactive` Crud 提供的响应式对象

  `CRUD_SEARCH_QUERY_ATTACH_PARAMS` 查询接口使用的额外查询条件对象，类型为 `Obejct`

  `CRUD_SEARCH_LOADING` 查询使用时是否加载中，类型为 `Boolean`

  `CRUD_SEARCH_DATA` 查询使用的表单，类型为 `Object`

  `CRUD_FORM_TYPE` Crud 内部使用，主要用于判断是新增还是修改操作，类型为 `String`

  `CRUD_FORM_VISIBLE` 用于数据表单是否显示或者隐藏，类型为 `Boolean`

  `CRUD_FORM_LOADING` 用于数据表单是否在加载中，类型为 `Boolean`

  `CRUD_SAVE_BUTTON_LOADING` 用于数据表单保存按钮是否在加载中，类型为 `Boolean`

  `CRUD_FORM_DELETE_LOADING` 用于删除按钮是否在加载中，类型为 `Boolean`

+ `crudPagingReactive` Crud 提供的用于分页的响应式对象

  `CRUD_SEARCH_PAGING_PAGE_NUM` 分页中的当前页，类型为 `Number`

  `CRUD_SEARCH_PAGING_PAGE_SIZE` 分页中的分页大小，类型为 `Number`

  `CRUD_SEARCH_PAGING_TOTAL` 分页中的总记录数，类型为 `Number`

### Crud 组合式函数使用的传入对象

文件位置在 `/src/components/crud/composables/useCrud.js` 默认导出 `useCrud` 方法，它有两个参数

* `@param {Object}` 包括了一系列 Crud 需要的一切表单模型和钩子函数还有数据查询和操作的 API 函数等等
* `@param {Object}` 它包括了 Crud 在执行过程中的一些设置

下面针对两个方法传入的参数进行详细说明

#### 第一个参数对象

需要注意的是，请使用 Crud 定义的常量对传入对象的属性命名，传入的对象属性不一定每个都必传，其中凡是 `CRUD_HOOK_FUNCTION` 开头的皆为钩子函数，类型为 `Function` 并且第一个参数为 `crudReactive` 如上面所述 Crud 组合式函数使用的响应式数据中， `crudReactive` 的响应式属性在钩子函数中兼可使用，下面不再赘述

+ `CRUD_DATA_PROPERTIES_INJECTION`

  类型：`Object`

  类型为普通对象，为了能在封装好的增删改查方法中使用钩子方法操作非组合式 API 声明的响应式对象而存在的属性，添加了以后，该对象会变成响应式对象，供 `template` 使用

+ `CRUD_SEARCH_INJECTION_FORM_MODEL`

  类型：`Object`

  类型为普通对象，数据查询条件的表单模型，经过 `useCrud` 方法处理以后，会导出 `CRUD_SEARCH_USE_FORM` 和 `CRUD_SEARCH_FORM` 供 `template` 使用

+ `CRUD_SEARCH_INJECTION_FORM_RULE`

  类型：`Object`

  数据查询条件的效验规则模型，类型是一个普通对象，该对象请参考 [Form 表单验证](https://next.antdv.com/components/form-cn#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)

+ `CRUD_SEARCH_INJECTION_QUERY_ATTACH_PARAMS`

  类型：`Object`

  用于查询接口额外的查询条件，一般定义为查询接口接受两个参数，一个是查询表单的 model 另一个则是追加额外的查询条件，此属性用于追加额外的查询对象

+ `CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_BEFORE` 用于执行真正查询接口之前的钩子函数，在查询接口调用之前如果如果想做什么实用该钩子函数即可

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_SEARCH_RESPONSE` 使用此钩子函数意味着使用者完全接管查询逻辑，包括查询表单验证（如果有的话）

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_SUCCESS_BEFORE` 在查询成功进行 `CRUD_SEARCH_DATA` 赋值之前进行的操作

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_SUCCESS` 如果使用此钩子表示 Crud 在查询成功之后不会自动对 `CRUD_SEARCH_DATA` 进行赋值，为使用者接管

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_SUCCESS_AFTER` 在 Crud 查询成功并且赋值给 `CRUD_SEARCH_DATA` 之后的操作

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_ERROR` 如果 Crud 查询出现错误，需要处理则使用该钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `err` 请求接口的 Promise 的 Error 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_FINALLY` 当 Crud 查询接口完成时，Promise.finally 需要进行操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_INJECTION_FORM_MODEL` 

  类型：`Object`

  类型为普通对象，数据表单模型，经过 useCrud 方法处理以后，会导出 `CRUD_FORM_USE_FORM` 和 `CRUD_FORM` 供 `template` 使用

+ `CRUD_INJECTION_FORM_RULE`

  类型：`Object`

  数据表单的效验规则模型，类型是一个普通对象，该对象请参考 [Form 表单验证](https://next.antdv.com/components/form-cn#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)

+ `CRUD_INJECTION_SEARCH_PAGING_INIT`

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `crudPagingReactive` 分页的响应式对象

+ `CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_BEFORE` 查询单条数据真正请求之前的操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE` 使用此钩子函数意味着使用者完全接管查询单条逻辑

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_SUCCESS_BEFORE` 在查询成功进行 `CRUD_FORM` 赋值之前进行的操作

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_SUCCESS` 如果使用此钩子表示 Crud 在查询成功之后不会自动对 `CRUD_FORM` 进行赋值，为使用者接管

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_SUCCESS_AFTER` 在 Crud 查询成功并且赋值给 `CRUD_FORM` 之后的操作

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_ERROR` 如果 Crud 单条查询出现错误，需要处理则使用该钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `err` 请求接口的 Promise 的 Error 对象

+ `CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_FINALLY` 当 Crud 查询接口完成时，Promise.finally 需要进行操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_FORM_SAVE_BEFORE` 在真正保存表单之前所做的操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_FORM_SAVE` 使用此钩子函数意味着使用者完全接管保存逻辑

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_FORM_SAVE_SUCCESS_BEFORE` 在保存成功进行查询之前所做的操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_FORM_SAVE_SUCCESS` 如果使用此钩子表示 Crud 在保存成功之后不会进行查询，使用者接管

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_FORM_SAVE_SUCCESS_AFTER` 在保存成功进行查询之后的操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_FORM_SAVE_ERROR` 如果表单保存出现请求错误，需要处理则使用该钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `err` 请求接口的 Promise 的 Error 对象

+ `CRUD_HOOK_FUNCTION_FORM_SAVE_FINALLY` 当保存接口完成时，Promise.finally 需要进行操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_FORM_DELETE_BEFORE` 在真正使用删除接口之前所做的操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_FORM_DELETE` 使用此钩子函数意味着使用者完全接管删除逻辑

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_HOOK_FUNCTION_FORM_DELETE_SUCCESS_BEFORE` 在删除成功进行查询之前所做的操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_FORM_DELETE_SUCCESS` 如果使用此钩子表示 Crud 在删除成功之后不会进行查询，使用者接管

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_FORM_DELETE_SUCCESS_AFTER` 在删除成功进行查询之后的操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `data` http 封装对象中的 data 对象

  `result` http 封装对象中的 result 对象

  `response` http 封装对象中的 response 对象

+ `CRUD_HOOK_FUNCTION_FORM_DELETE_ERROR` 如果删除出现请求错误，需要处理则使用该钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

  `err` 请求接口的 Promise 的 Error 对象

+ `CRUD_HOOK_FUNCTION_FORM_DELETE_FINALLY` 当删除接口调用完成时，Promise.finally 需要进行操作，使用此钩子函数

  类型：`Function`

  参数：

  `crudReactive` Crud 定义的响应式对象

+ `CRUD_API_QUERY` 查询数据接口方法

+ `CRUD_API_QUERY_ONE` 查询单条接口方法

+ `CRUD_API_ADD` 新增接口方法

+ `CRUD_API_MODIFY` 修改接口方法

+ `CRUD_API_DELETE` 删除接口方法

#### 第二个参数对象

+ `firstSearch` 是否组件挂载成功主动查询数据
  类型：`Boolean`

+ `addAfterSearch` 是否在添加之后查询数据
  类型：`Boolean`

+ `modifyAfterSearch` 是否在修改之后查询数据
  类型：`Boolean`

+ `deleteAfterSearch` 是否在删除之后查询数据
  类型：`Boolean`

+ `addAfterClose` 是否在新增之后关闭窗口
  类型：`Boolean`

+ `modifyAfterClose` 是否在修改之后关闭窗口
  类型：`Boolean`

  + `hasPaging` 是否分页
  类型：`Boolean`

### Crud 组合式函数对使用者暴露出来的对象

Crud 对外暴露出来的除了上述提到的 `crudDataPropertiesReactive` `crudReactive` `crudPagingReactive` 还提供了如下对象和方法

+ `CRUD_SEARCH_FORM` 查询表单的 model 响应式对象

+ `CRUD_FORM` 数据表单的 model 响应式对象

+ `CRUD_SEARCH_USE_FORM` 查询表单的 `useForm` 对象

+ `CRUD_FORM_USE_FORM` 查询表单的 `useForm` 对象

+ `CRUD_FUNCTION_QUERY` 查询方法，可以让使用者直接调用

+ `CRUD_FUNCTION_OPEN_FORM_ADD` 例如打开新增表单模态框的方法，可以让使用者直接调用

+ `CRUD_FUNCTION_OPEN_FORM_MODIFY` 例如打开编辑表单模态框的方法，可以让使用者直接调用

+ `CRUD_FUNCTION_SAVE` 保存表单数据的方法，可以让使用者直接调用

+ `CRUD_FUNCTION_DELETE` 删除数据的方法，可以让使用者直接调用

+ `CRUD_FUNCTION_QUERY_AFTER_CHANGE_PAGE` 常用于当前分页或者分页大小改变需要查询的时候，例如当前版本 antdv 的分页组件的 `@change` 实践中调用，可以让使用者直接调用，例如

```js
  function handleTableChange(paging) {
    crud[crudConsts.CRUD_FUNCTION_QUERY_AFTER_CHANGE_PAGE](paging)
  }
```

`useForm` 对象是 antdV 组件库提供的一种表单处理的方法，详见[这里](https://next.antdv.com/components/form-cn#useForm-v2-2)

示例页面代码可以点[这里](https://github.com/rbackrock/admin-project-prototype-based-vue3/blob/main/src/views/example/crud/index.vue)查看

## 表格常用操作组件

该组件提供对表格的常见操作，预置，新增按钮，刷新按钮，设置表格大小，设置表格显示的列

该组件的 `props` 声明属性如下

```js
const props = defineProps({
  tableOptions: {
    type: Object,
    required: true
  },
  hasAddButton: {
    type: Boolean,
    required: false,
    default: true
  },
  permissionAdd: {
    type: Array,
    required: false,
    default() {
      return []
    }
  }
})
```

该组件需要传入表格的两个属性，一个是表格的 `columns` 属性声明，它是 antdV 提供的能力，详见[这里](https://next.antdv.com/components/table-cn#Column)

另外一个属性是表格 `size` 的响应式对象

它提供了一个默认插槽，如果不提供默认插槽则预置有新增按钮

详细示例见[这里](https://github.com/rbackrock/admin-project-prototype-based-vue3/blob/main/src/views/example/crud/index.vue)

## 表格数据操作列组件

该组件抽象了一般表格数据操作列的一系列操作，它的 `props` 声明如下

```js
const props = defineProps({
  include: {
    type: Object,
    required: false,
    default() {
      return {
        view: true,
        modify: true,
        del: true
      }
    }
  },
  record: {
    type: Object,
    required: true
  },
  deleteMsg: {
    type: String,
    required: false,
    default: '确定要删除该条记录吗？'
  },
  permissionView: {
    type: Array,
    required: false,
    default() {
      return []
    }
  },
  permissionModify: {
    type: Array,
    required: false,
    default() {
      return []
    }
  },
  permissionDelete: {
    type: Array,
    required: false,
    default() {
      return []
    }
  }
})
```

+ `include` 它用于开启或者关闭查看，编辑，删除按钮

+ `record` 它是当前表格行的数据

+ `deleteMsg` 它是删除确认的文本提示内容

+ `permissionView` 它是查看数据按钮的权限，是一个数组，作用等同自定义指令 `v-permission`

+ `permissionModify` 它是修改数据按钮的权限，是一个数组，作用等同自定义指令 `v-permission`

+ `permissionDelete` 它是删除数据按钮的权限，是一个数组，作用等同自定义指令 `v-permission`

默认插槽中包含查看、修改、删除功能。该组件提供了一个 `attach-before` 和 `attach-after` 插槽，用于在保证有查看或者编辑或者删除预置的按钮前提下，添加自定义按钮

组件提供了三个 `$emit` 方法，用于给使用者进行查看，编辑和删除逻辑操作

+ `view-record` 用于给使用者进行查看业务操作，例如 `@view-record="handleViewRecord"`

+ `modify-record` 用于给使用者进行编辑业务操作，例如 `@modify-record="handleModifyRecord"`

+ `delete-record` 用于给使用者进行删除业务操作，例如 `@delete-record="handleDeleteRecord"`

完整示例可以[点这里](https://github.com/rbackrock/admin-project-prototype-based-vue3/blob/main/src/views/example/crud/index.vue)查看

# FAQ

## 我不想要自动提示异步请求响应体中 `message` 的信息怎么办？

在使用封装的 `http` 对象时，只要添加 `disableMessage` 为 `true` 即可，例如

```js
export const update = (data) => {
  return http({
    url: '/menu',
    method: 'put',
    data,
    disableMessage: true
  })
}
```

## 为什么没有使用 `TypeScript`

个人理解 `TypeScript` 可以对工程化进行非常好的约束，但是对使用者和团队开发人员有一定要求。如果没有按照要求使用 `TypeScript` 那么很可能造成不管什么数据类型都是 `any` 这样不好的实践，那么工程化上的目的非但没有达到，而且会徒增很多代码量，得不偿失。如果有必要，只要稍作修改就可以用上 TypeScript
