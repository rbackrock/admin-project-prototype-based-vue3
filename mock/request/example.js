module.exports = [
  {
    url: '/api/example/crud',
    type: 'get',
    response() {
      return {
        code: 20000,
        data: [
          {
            id: 1,
            name: '张三',
            email: 'zhangsan@crud.com'
          },
          {
            id: 2,
            name: '李四',
            email: 'lisi@crud.com'
          },
          {
            id: 3,
            name: '王五',
            email: 'wangwu@crud.com'
          }
        ],
        message: null,
        success: true
      }
    }
  },
  {
    url: '/api/example/crud/page',
    type: 'get',
    response() {
      return {
        code: 20000,
        data: {
          list: [
            {
              id: 1,
              name: '张三',
              email: 'zhangsan@crud.com'
            },
            {
              id: 2,
              name: '李四',
              email: 'lisi@crud.com'
            },
            {
              id: 3,
              name: '王五',
              email: 'wangwu@crud.com'
            }
          ],
          pageNum: 1,
          pageSize: 20,
          total: 3
        },
        message: null,
        success: true
      }
    }
  },
  {
    url: '/api/example/crud/1',
    type: 'get',
    response() {
      return {
        code: 20000,
        data: {
          id: 1,
          name: '张三',
          email: 'zhangsan@crud.com'
        },
        message: null,
        success: true
      }
    }
  },
  {
    url: '/api/example/crud',
    type: 'post',
    response() {
      return {
        code: 20000,
        data: null,
        message: '新增成功',
        success: true
      }
    }
  },
  {
    url: '/api/example/crud',
    type: 'put',
    response() {
      return {
        code: 20000,
        data: null,
        message: '修改成功',
        success: true
      }
    }
  },
  {
    url: '/api/example/crud/1',
    type: 'delete',
    response() {
      return {
        code: 20000,
        data: null,
        message: '删除成功',
        success: true
      }
    }
  }
]
