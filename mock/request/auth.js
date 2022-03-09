module.exports = [
  {
    url: '/api/login',
    type: 'post',
    response(config) {
      const { username } = config.body

      // 前端传来的密码为加密过的，正常情况下，此处需要后端用私钥解密进行密码比对，这里为了 mock 省略该步骤，用户名对，直接登录
      if (username === 'admin') {
        return {
          code: 20000,
          data: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          message: null,
          success: true
        }
      }

      return {
        code: 20000,
        data: null,
        message: '用户名或者密码不正确',
        success: false
      }
    }
  }
]
