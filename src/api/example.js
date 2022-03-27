import qs from 'qs'
import _ from 'lodash'
import http from '/@/http'

export const query = (queryParams = {}, queryAttachParams = {}) => http({
  url: `/api/example/crud${qs.stringify(_.assign(queryParams, queryAttachParams), {
    addQueryPrefix: true
  })}`,
  method: 'get',
  disableMessage: true
})

export const queryByPaging = (queryParams = {}, queryAttachParams = {}) => http({
  url: `/api/example/crud/page${qs.stringify(_.assign(queryParams, queryAttachParams), {
    addQueryPrefix: true
  })}`,
  method: 'get',
  disableMessage: true
})

// eslint-disable-next-line no-unused-vars
export const queryOne = () => (
  http({
    url: '/api/example/crud/1',
    method: 'get'
  })
)

// eslint-disable-next-line no-unused-vars
export const add = (form = {}, formAttachParams = {}) => (
  http({
    url: '/api/example/crud',
    method: 'post',
    data: form
  })
)

// eslint-disable-next-line no-unused-vars
export const modify = (form = {}, formAttachParams = {}) => (
  http({
    url: '/api/example/crud',
    method: 'put',
    data: form
  })
)

// eslint-disable-next-line no-unused-vars
export const del = () => (
  http({
    url: '/api/example/crud/1',
    method: 'delete'
  })
)
