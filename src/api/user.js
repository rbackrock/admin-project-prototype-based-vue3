import http from '/@/http'

export const queryUser = () => http.get('/api/user')

export const queryRule = () => http.get('/api/rule')
