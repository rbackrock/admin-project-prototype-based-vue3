import http from '/@/http'

export const login = ({ username, password }) => http.post('/api/login', {
  username,
  password
})
