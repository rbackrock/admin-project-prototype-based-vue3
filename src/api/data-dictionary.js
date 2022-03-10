import qs from 'qs'
import _ from 'lodash'
import http from '/@/http'

export const queryDictionaryOfType = (params, paging) => {
  const reqPraams = _.assign(params, paging)
  return http.get(`/api/system/dictionary-of-type${qs.stringify(reqPraams, {
    addQueryPrefix: true
  })}`)
}

export const queryDictionaryOfTypeOne = (id = 1) => (
  http.get(`/api/system/dictionary-of-type/${id}`)
)

export const addDictionaryOfType = (data) => (
  http({
    url: '/api/system/dictionary-of-type',
    method: 'post',
    data
  })
)

export const modifyDictionaryOfType = (data) => (
  http({
    url: '/api/system/dictionary-of-type',
    method: 'put',
    data
  })
)

export const deleteDictionaryOfType = (id = 1) => (
  http({
    url: `/api/system/dictionary-of-type/${id}`,
    method: 'delete'
  })
)

// code

export const queryDictionaryOfCode = (params) => (
  http.get(`/api/system/dictionary-of-code${qs.stringify(params, {
    addQueryPrefix: true
  })}`)
)

export const queryDictionaryOfCodeOne = (id = 1) => (
  http.get(`/api/system/dictionary-of-code/${id}`)
)

export const addDictionaryOfCode = (data) => (
  http({
    url: '/api/system/dictionary-of-code',
    method: 'post',
    data
  })
)

export const modifyDictionaryOfCode = (data) => (
  http({
    url: '/api/system/dictionary-of-code',
    method: 'put',
    data
  })
)

export const deleteDictionaryOfCode = (id) => (
  http({
    url: `/api/system/dictionary-of-code/${id}`,
    method: 'delete'
  })
)
