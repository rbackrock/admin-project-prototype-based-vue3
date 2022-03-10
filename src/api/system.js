import http from '/@/http'

export const queryMenu = () => http.get('/api/menu')

export const queryDictionary = () => http.get('/api/dictionary')
