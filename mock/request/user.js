module.exports = [
  {
    url: '/api/user',
    type: 'get',
    response() {
      return {
        code: 20000,
        data: {
          username: 'admin',
          orgId: '1000',
          phone: '18888888888',
          email: 'admin@admin.com'
        },
        message: null,
        success: true
      }
    }
  },
  {
    url: '/api/rule',
    type: 'get',
    response() {
      return {
        code: 20000,
        data: [
          'ExamplePermission:add',
          'ExamplePermission:modify'
        ],
        message: null,
        success: true
      }
    }
  }
]
