module.exports = [
  {
    url: '/api/menu',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          routeName: 'Home',
          title: '首页',
          uniqueTag: 'Home',
          type: 'menu',
          fixed: true,
          children: []
        },
        {
          routeName: 'Example',
          title: '示例',
          uniqueTag: 'Example',
          type: 'catalog',
          children: [
            {
              routeName: 'ExampleCrudPagination',
              title: 'Crud 分页',
              uniqueTag: 'ExampleCrudPagination',
              type: 'menu',
              children: []
            },
            {
              routeName: 'ExampleCrud',
              title: 'Crud 和 Table 组件',
              uniqueTag: 'ExampleCrud',
              type: 'menu',
              children: []
            },
            {
              routeName: 'ExampleSharedStore',
              title: '共享 Store 的 Crud',
              uniqueTag: 'ExampleSharedStore',
              type: 'menu',
              children: []
            },
            {
              routeName: 'ExamplePermission',
              title: '自定义权限指令',
              uniqueTag: 'ExamplePermission',
              type: 'menu',
              children: []
            },
            {
              routeName: 'ExampleNested',
              title: '嵌套路由',
              uniqueTag: 'ExampleNested',
              type: 'menu',
              children: [
                {
                  routeName: 'ExampleNestedList',
                  title: '嵌套路由列表',
                  type: 'menu',
                  children: []
                },
                {
                  routeName: 'ExampleNestedDetail',
                  title: '嵌套路由详情',
                  type: 'menu',
                  children: []
                }
              ]
            },
            {
              routeName: 'ExampleCatalog',
              title: '多级目录',
              uniqueTag: 'ExampleCatalog',
              type: 'catalog',
              children: [
                {
                  routeName: 'ExampleDeep',
                  title: '多级目录菜单',
                  uniqueTag: 'ExampleDeep',
                  type: 'menu',
                  children: []
                }
              ]
            },
            {
              routeName: '',
              title: '分组示例',
              uniqueTag: 'ExampleGroup',
              type: 'group',
              children: [
                {
                  routeName: 'ExampleGroupMenu',
                  title: '分组菜单',
                  uniqueTag: 'ExampleGroupMenu',
                  type: 'menu',
                  children: []
                }
              ]
            }
          ]
        },
        {
          routeName: 'System',
          title: '系统管理',
          uniqueTag: 'System',
          type: 'catalog',
          children: [
            {
              routeName: 'SystemDataDictionary',
              title: '数据字典',
              uniqueTag: 'SystemDataDictionary',
              type: 'menu',
              children: []
            },
            {
              routeName: 'SystemMenu',
              title: '导航菜单',
              uniqueTag: 'SystemMenu',
              type: 'menu',
              children: []
            },
            {
              routeName: 'SystemRole',
              title: '用户权限',
              uniqueTag: 'SystemRole',
              type: 'menu',
              children: []
            }
          ]
        }
      ],
      message: null,
      success: true
    })
  },
  // dictionary
  {
    url: '/api/dictionary',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          id: 1,
          typeDescription: '导航菜单类型',
          typeName: 'navigationMenuType',
          code: [
            {
              id: 1,
              codeDescription: '导航分类',
              codeName: 'catalog',
              codeValue: 'catalog'
            },
            {
              id: 2,
              codeDescription: '导航分组',
              codeName: 'group',
              codeValue: 'group'
            },
            {
              id: 3,
              codeDescription: '导航菜单',
              codeName: 'menu',
              codeValue: 'menu'
            }
          ]
        }
      ],
      message: null,
      success: true
    })
  },
  // system dictionary type
  {
    url: '/api/system/dictionary-of-type',
    type: 'get',
    response: () => ({
      code: 20000,
      data: {
        pageNum: 1,
        pageSize: 20,
        total: 1,
        list: [
          {
            id: 1,
            typeDescription: '导航菜单类型',
            typeName: 'navigationMenuType'
          }
        ]
      },
      message: null,
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-type/1',
    type: 'get',
    response: () => ({
      code: 20000,
      data: {
        id: 1,
        typeDescription: '导航菜单类型',
        typeName: 'navigationMenuType'
      },
      message: null,
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-type',
    type: 'post',
    response: () => ({
      code: 20000,
      data: null,
      message: '添加数据字典类型成功',
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-type',
    type: 'put',
    response: () => ({
      code: 20000,
      data: null,
      message: '修改数据字典类型成功',
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-type/1',
    type: 'delete',
    response: () => ({
      code: 20000,
      data: null,
      message: '删除数据字典类型成功',
      success: true
    })
  },
  // system dictionary code
  {
    url: '/api/system/dictionary-of-code',
    type: 'get',
    response: () => ({
      code: 20000,
      data: [
        {
          id: 1,
          codeDescription: '导航分类',
          codeName: 'catalog',
          codeValue: 'catalog'
        },
        {
          id: 2,
          codeDescription: '导航分组',
          codeName: 'group',
          codeValue: 'group'
        },
        {
          id: 3,
          codeDescription: '导航菜单',
          codeName: 'menu',
          codeValue: 'menu'
        }
      ],
      message: null,
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-code/1',
    type: 'get',
    response: () => ({
      code: 20000,
      data: {
        id: 1,
        codeDescription: '导航分类',
        codeName: 'catalog',
        codeValue: 'catalog'
      },
      message: null,
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-code',
    type: 'post',
    response: () => ({
      code: 20000,
      data: null,
      message: '添加数据字典编码成功',
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-code',
    type: 'put',
    response: () => ({
      code: 20000,
      data: null,
      message: '修改数据字典编码成功',
      success: true
    })
  },
  {
    url: '/api/system/dictionary-of-code/1',
    type: 'delete',
    response: () => ({
      code: 20000,
      data: null,
      message: '删除数据字典编码成功',
      success: true
    })
  }
]
