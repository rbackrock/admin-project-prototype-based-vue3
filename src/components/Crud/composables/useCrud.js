import {
  toRaw,
  reactive,
  toRefs,
  ref
} from 'vue'
import _ from 'lodash'
import { Form } from 'ant-design-vue'
import * as consts from '/@/components/Crud/consts'
import * as helper from '/@/utils/helper'

const { useForm } = Form

/**
 * 判断传入的参数是否为 Function
 * @param {Function} func 待检测参数
 * @returns 如果传入的参数是 Function 则返回真否则假
 */
function validCrudFunc(func) {
  return _.isFunction(func)
}

/**
 * 判断传入的参数是否为 Promise 对象
 * @param {Promise} p 传入的 promise 对象
 */
function validPromise(p) {
  return helper.typeStringOfData(p) === 'promise'
}

/**
 * 判断该方法是否传入，如果传入则执行，并且传递 vue 当前实例和自定义方法参数
 * @param {Object} crudReactive crud 组件的响应式对象
 * @param {Function} func 待执行方法
 * @param {...any} funcParams 方法传入的参数
 * @returns 执行目标方法
 */
function doFunc(crudReactive, func, ...funcParams) {
  return func && func(crudReactive, ...funcParams)
}

export default function useCrud({
  // data
  [consts.CRUD_DATA_PROPERTIES_INJECTION]: dataPropertiesInjection,

  // search
  [consts.CRUD_SEARCH_INJECTION_FORM_MODEL]: searchInjectionFormModel,
  [consts.CRUD_SEARCH_INJECTION_FORM_RULE]: searchInjectionFormRule,
  [consts.CRUD_SEARCH_INJECTION_QUERY_ATTACH_PARAMS]: searchInjectionQueryAttachParams,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_BEFORE]: hookSearchResponseBefore,
  [consts.CRUD_INJECTION_SEARCH_PAGING_INIT]: searchInjectionPagingInit,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_RESPONSE]: hookSearchResponse,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_SUCCESS_BEFORE]: hookSearchResponseSuccessBefore,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_SUCCESS]: hookSearchResponseSuccess,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_SUCCESS_AFTER]: hookSearchResponseSuccessAfter,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_ERROR]: hookSearchResponseError,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_RESPONSE_FINALLY]: hookSearchResponseFinally,

  // form
  [consts.CRUD_INJECTION_FORM_MODEL]: injectionFormModel,
  [consts.CRUD_INJECTION_FORM_RULE]: injectionFormRule,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_BEFORE]: hookSearchOneResponseBefore,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE]: hookSearchOneResponse,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_SUCCESS_BEFORE]: hookSearchOneResponseSuccessBefore,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_SUCCESS]: hookSearchOneResponseSuccess,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_SUCCESS_AFTER]: hookSearchOneResponseSuccessAfter,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_ERROR]: hookSearchOneResponseError,
  [consts.CRUD_HOOK_FUNCTION_SEARCH_ONE_RESPONSE_FINALLY]: hookSearchOneResponseFinally,

  // add / modify / delete
  [consts.CRUD_HOOK_FUNCTION_FORM_SAVE_BEFORE]: hookFormSaveBefore,
  [consts.CRUD_HOOK_FUNCTION_FORM_SAVE]: hookFormSave,
  [consts.CRUD_HOOK_FUNCTION_FORM_SAVE_SUCCESS_BEFORE]: hookFormSaveSuccessBefore,
  [consts.CRUD_HOOK_FUNCTION_FORM_SAVE_SUCCESS]: hookFormSaveSuccess,
  [consts.CRUD_HOOK_FUNCTION_FORM_SAVE_SUCCESS_AFTER]: hookFormSaveSuccessAfter,
  [consts.CRUD_HOOK_FUNCTION_FORM_SAVE_ERROR]: hookFormSaveError,
  [consts.CRUD_HOOK_FUNCTION_FORM_SAVE_FINALLY]: hookFormSaveFinally,
  [consts.CRUD_HOOK_FUNCTION_FORM_DELETE_BEFORE]: hookFormDeleteBefore,
  [consts.CRUD_HOOK_FUNCTION_FORM_DELETE]: hookFormDelete,
  [consts.CRUD_HOOK_FUNCTION_FORM_DELETE_SUCCESS_BEFORE]: hookFormDeleteSuccessBefore,
  [consts.CRUD_HOOK_FUNCTION_FORM_DELETE_SUCCESS]: hookFormDeleteSuccess,
  [consts.CRUD_HOOK_FUNCTION_FORM_DELETE_SUCCESS_AFTER]: hookFormDeleteSuccessAfter,
  [consts.CRUD_HOOK_FUNCTION_FORM_DELETE_ERROR]: hookFormDeleteError,
  [consts.CRUD_HOOK_FUNCTION_FORM_DELETE_FINALLY]: hookFormDeleteFinally,

  // other
  [consts.CRUD_INJECTION_SEARCH_READY_BEFORE_PROMISE]: injectionSearchReadyBeforePromise,

  // api
  [consts.CRUD_API_QUERY]: apiQuery,
  [consts.CRUD_API_QUERY_ONE]: apiQueryOne,
  [consts.CRUD_API_ADD]: apiAdd,
  [consts.CRUD_API_MODIFY]: apiModify,
  [consts.CRUD_API_DELETE]: apiDelete
}, settings = {
  firstSearch: true, // 是否组件挂载成功主动查询数据
  addAfterSearch: true, // 是否在添加之后查询数据
  modifyAfterSearch: true, // 是否在修改之后查询数据
  deleteAfterSearch: true, // 是否在删除之后查询数据
  addAfterClose: true, // 是否在新增之后关闭窗口
  modifyAfterClose: true, // 是否在修改之后关闭窗口
  hasPaging: true // 是否有分页
}) {
  const crudDataPropertiesReactive = reactive({
    ...dataPropertiesInjection || {}
  })

  const crudReactive = reactive({
    // 查询追加的请求参数
    [consts.CRUD_SEARCH_QUERY_ATTACH_PARAMS]: searchInjectionQueryAttachParams || {},
    [consts.CRUD_SEARCH_LOADING]: false,
    [consts.CRUD_SEARCH_DATA]: [],
    [consts.CRUD_FORM_TYPE]: consts.CRUD_FORM_TYPE_ADD,
    [consts.CRUD_FORM_VISIBLE]: false,
    [consts.CRUD_FORM_LOADING]: false,
    [consts.CRUD_SAVE_BUTTON_LOADING]: false,
    [consts.CRUD_FORM_DELETE_LOADING]: false
  })

  const crudPagingReactive = reactive({
    [consts.CRUD_SEARCH_PAGING_PAGE_NUM]: 1,
    [consts.CRUD_SEARCH_PAGING_PAGE_SIZE]: 20,
    [consts.CRUD_SEARCH_PAGING_TOTAL]: 0
  })

  const opts = _.assign({
    firstSearch: true,
    addAfterSearch: true,
    modifyAfterSearch: true,
    deleteAfterSearch: true,
    addAfterClose: true,
    modifyAfterClose: true,
    hasPaging: true
  }, settings)

  const crudSearchFormRef = ref(searchInjectionFormModel || {})
  const crudSearchFormRuleReactive = reactive(searchInjectionFormRule || {})

  const crudFormRef = ref(injectionFormModel || {})
  const crudFormRuleReactive = reactive(injectionFormRule || {})

  const searchUseForm = useForm(crudSearchFormRef, crudSearchFormRuleReactive)
  const formUseForm = useForm(crudFormRef, crudFormRuleReactive)

  function doQueryFunc() {
    crudReactive[consts.CRUD_SEARCH_LOADING] = true
    apiQuery(toRaw(crudSearchFormRef.value), toRaw(crudReactive[consts.CRUD_SEARCH_QUERY_ATTACH_PARAMS])).then(({ data, result, response }) => {
      // 请求成功之前的钩子
      if (validCrudFunc(hookSearchResponseSuccessBefore)) {
        doFunc(crudReactive, hookSearchResponseSuccessBefore, data, result, response)
      }

      // 请求成功自己对数据处理钩子
      if (validCrudFunc(hookSearchResponseSuccess)) {
        doFunc(crudReactive, hookSearchResponseSuccess, data, result, response)
      } else {
        // eslint-disable-next-line no-lonely-if
        if (opts.hasPaging) {
          crudReactive[consts.CRUD_SEARCH_DATA] = data.list
          crudPagingReactive[consts.CRUD_SEARCH_PAGING_TOTAL] = data.total
        } else {
          crudReactive[consts.CRUD_SEARCH_DATA] = data
        }
      }

      // 请求成功之后已经赋值之后的钩子
      if (validCrudFunc(hookSearchResponseSuccessAfter)) {
        doFunc(crudReactive, hookSearchResponseSuccessAfter, data, result, response)
      }
    }, (err) => {
      if (validCrudFunc(hookSearchResponseError)) {
        doFunc(crudReactive, hookSearchResponseError, err)
      }
    }).finally(() => {
      if (validCrudFunc(hookSearchResponseFinally)) {
        doFunc(crudReactive, hookSearchResponseFinally)
      } else {
        crudReactive[consts.CRUD_SEARCH_LOADING] = false
      }
    })
  }

  // 查询方法
  function query(){
    // 查询必须确保 query api 存在
    if (validCrudFunc(apiQuery)) {
      // 查询之前的钩子
      if (validCrudFunc(hookSearchResponseBefore)) {
        doFunc(crudReactive, hookSearchResponseBefore)
      }

      // 表格查询带分页的钩子
      if (opts.hasPaging) {
        crudReactive[consts.CRUD_SEARCH_QUERY_ATTACH_PARAMS] = _.assign(crudReactive[consts.CRUD_SEARCH_QUERY_ATTACH_PARAMS], {
          pageNum: crudPagingReactive[consts.CRUD_SEARCH_PAGING_PAGE_NUM],
          pageSize: crudPagingReactive[consts.CRUD_SEARCH_PAGING_PAGE_SIZE]
        })
      }

      // 如果存在 search request hook 说明使用者自己接管，成功或者失败都自己接管
      if (validCrudFunc(hookSearchResponse)) {
        doFunc(crudReactive, hookSearchResponse)
      } else {
        // 不自己接管，就统一处理
        // eslint-disable-next-line no-lonely-if
        if (searchInjectionFormRule) {
          const { validate: searchFormValidate } = searchUseForm
          searchFormValidate().then(() => {
            doQueryFunc()
          })
        } else {
          doQueryFunc()
        }
      }
    }
  }

  // 打开新增表单方法
  function openAddForm() {
    formUseForm.resetFields()
    crudReactive[consts.CRUD_FORM_TYPE] = consts.CRUD_FORM_TYPE_ADD
    crudReactive[consts.CRUD_FORM_VISIBLE] = true
  }

  // 打开编辑表单方法
  function openModifyForm(primaryKey, ...attachParams) {
    if (primaryKey) {
      formUseForm.resetFields()
      crudReactive[consts.CRUD_FORM_TYPE] = consts.CRUD_FORM_TYPE_MODIFY
      crudReactive[consts.CRUD_FORM_VISIBLE] = true

      if (validCrudFunc(hookSearchOneResponseBefore)) {
        doFunc(crudReactive, hookSearchOneResponse)
      }

      // 说明使用者自己接管，成功或者失败都自己处理
      if (validCrudFunc(hookSearchOneResponse)) {
        doFunc(crudReactive, hookSearchOneResponse, primaryKey, ...attachParams)
      } else {
        crudReactive[consts.CRUD_FORM_LOADING] = true
        apiQueryOne(primaryKey, ...attachParams).then(({ data, result, response }) => {
          if (validCrudFunc(hookSearchOneResponseSuccessBefore)) {
            doFunc(crudReactive, hookSearchOneResponseSuccessBefore, data, result, response)
          }

          // 请求成功自己对数据处理钩子
          if (validCrudFunc(hookSearchOneResponseSuccess)) {
            doFunc(crudReactive, hookSearchOneResponseSuccess, data, result, response)
          } else {
            crudFormRef.value = data
          }

          if (validCrudFunc(hookSearchOneResponseSuccessAfter)) {
            doFunc(crudReactive, hookSearchOneResponseSuccessAfter, data, result, response)
          }
        }, (err) => {
          if (validCrudFunc(hookSearchOneResponseError)) {
            doFunc(crudReactive, hookSearchOneResponseError, err)
          }
        }).finally(() => {
          if (validCrudFunc(hookSearchOneResponseFinally)) {
            doFunc(crudReactive, hookSearchOneResponseError)
          } else {
            crudReactive[consts.CRUD_FORM_LOADING] = false
          }
        })
      }
    }
  }

  function doSaveFormFunc (saveFunc, ...attachParams) {
    crudReactive[consts.CRUD_SAVE_BUTTON_LOADING] = true
    saveFunc(toRaw(crudFormRef.value), ...attachParams).then(({ data, result, response }) => {
      if (validCrudFunc(hookFormSaveSuccessBefore)) {
        doFunc(crudReactive, hookFormSaveSuccessBefore, data, result, response)
      }

      // 是否使用者接管
      if (validCrudFunc(hookFormSaveSuccess)) {
        doFunc(crudReactive, hookFormSaveSuccess, data, result, response)
      } else if (crudReactive[consts.CRUD_FORM_TYPE] === consts.CRUD_FORM_TYPE_ADD) {
        if (opts.addAfterSearch) {
          query()
        }
      } else if (crudReactive[consts.CRUD_FORM_TYPE] === consts.CRUD_FORM_TYPE_MODIFY) {
        if (opts.modifyAfterSearch) {
          query()
        }
      }

      if (validCrudFunc(hookFormSaveSuccessAfter)) {
        doFunc(crudReactive, hookFormSaveSuccessAfter, data, result, response)
      } else if (crudReactive[consts.CRUD_FORM_TYPE] === consts.CRUD_FORM_TYPE_ADD) {
        if (opts.addAfterClose) {
          crudReactive[consts.CRUD_FORM_VISIBLE] = false
        }
      } else if (crudReactive[consts.CRUD_FORM_TYPE] === consts.CRUD_FORM_TYPE_MODIFY) {
        if (opts.modifyAfterClose) {
          crudReactive[consts.CRUD_FORM_VISIBLE] = false
        }
      }
    }, (err) => {
      if (validCrudFunc(hookFormSaveError)) {
        doFunc(crudReactive, hookFormSaveError, err)
      }
    }).finally(() => {
      if (validCrudFunc(hookFormSaveFinally)) {
        doFunc(crudReactive, hookFormSaveFinally)
      } else {
        crudReactive[consts.CRUD_SAVE_BUTTON_LOADING] = false
      }
    })
  }

  // 保存或者修改方法
  function save(...attachParams) {
    let saveFunc = null
    if (crudReactive[consts.CRUD_FORM_TYPE] === consts.CRUD_FORM_TYPE_ADD) {
      saveFunc = apiAdd
    } else if (crudReactive[consts.CRUD_FORM_TYPE] === consts.CRUD_FORM_TYPE_MODIFY) {
      saveFunc = apiModify
    }

    if (validCrudFunc(saveFunc)) {
      if (validCrudFunc(hookFormSaveBefore)) {
        doFunc(crudReactive, hookFormSaveBefore)
      }

      // 说明使用者自己接管，成功或者失败都自己接管
      if (validCrudFunc(hookFormSave)) {
        doFunc(crudReactive, hookFormSave)
      } else {
        // 不自己接管，就统一处理
        // eslint-disable-next-line no-lonely-if
        if (injectionFormRule) {
          const { validate: formValidate } = formUseForm
          formValidate().then(() => {
            doSaveFormFunc(saveFunc, ...attachParams)
          })
        } else {
          doSaveFormFunc(saveFunc, ...attachParams)
        }
      }
    }
  }

  // 删除
  function del(primaryKey, ...attachParams) {
    if (validCrudFunc(apiDelete)) {
      if (validCrudFunc(hookFormDeleteBefore)) {
        doFunc(crudReactive, hookFormDeleteBefore)
      }

      if (validCrudFunc(hookFormDelete)) {
        doFunc(crudReactive, hookFormDelete, primaryKey, ...attachParams)
      } else {
        // 不接管就自己处理
        crudReactive[consts.CRUD_FORM_DELETE_LOADING] = true
        apiDelete(primaryKey, ...attachParams).then(({ data, result, response }) => {
          if (validCrudFunc(hookFormDeleteSuccessBefore)) {
            doFunc(crudReactive, hookFormDeleteSuccessBefore, data, result, response)
          }

          if (validCrudFunc(hookFormDeleteSuccess)) {
            doFunc(crudReactive, hookFormDeleteSuccess, data, result, response)
          } else if (opts.deleteAfterSearch) {
            query()
          }

          if (validCrudFunc(hookFormDeleteSuccessAfter)) {
            doFunc(crudReactive, hookFormDeleteSuccessAfter, data, result, response)
          }
        }, (err) => {
          if (validCrudFunc(hookFormDeleteError)) {
            doFunc(crudReactive, hookFormDeleteError, err)
          }
        }).finally(() => {
          if (validCrudFunc(hookFormDeleteFinally)) {
            doFunc(crudReactive, hookFormDeleteFinally)
          } else {
            crudReactive[consts.CRUD_FORM_DELETE_LOADING] = false
          }
        })
      }
    }
  }

  function changePage(paging) {
    crudPagingReactive[consts.CRUD_SEARCH_PAGING_PAGE_NUM] = paging.current
    crudPagingReactive[consts.CRUD_SEARCH_PAGING_PAGE_SIZE] = paging.pageSize
    crudPagingReactive[consts.CRUD_SEARCH_PAGING_TOTAL] = paging.total
  }

  function queryAfterChangePage(paging) {
    changePage(paging)
    query()
  }

  // 分页初始化
  if (validCrudFunc(searchInjectionPagingInit)) {
    doFunc(crudReactive, searchInjectionPagingInit, crudPagingReactive)
  }

  // do function
  if (validPromise(injectionSearchReadyBeforePromise)) {
    injectionSearchReadyBeforePromise.then(() => {
      if (opts.firstSearch) {
        query()
      }
    })
  } else {
    if (opts.firstSearch) {
      query()
    }
  }
  

  return {
    // 对外扩展 data properties
    ...toRefs(crudDataPropertiesReactive),
    // 对外扩展 crud 需要的响应各种字段
    ...toRefs(crudReactive),
    // 对外扩展分页需要的响应字段
    ...toRefs(crudPagingReactive),

    // crud use form
    [consts.CRUD_SEARCH_FORM]: crudSearchFormRef,
    [consts.CRUD_FORM]: crudFormRef,
    [consts.CRUD_SEARCH_USE_FORM]: searchUseForm,
    [consts.CRUD_FORM_USE_FORM]: formUseForm,

    // crud function
    [consts.CRUD_FUNCTION_QUERY]: query,
    [consts.CRUD_FUNCTION_QUERY_AFTER_CHANGE_PAGE]: queryAfterChangePage,
    [consts.CRUD_FUNCTION_OPEN_FORM_ADD]: openAddForm,
    [consts.CRUD_FUNCTION_OPEN_FORM_MODIFY]: openModifyForm,
    [consts.CRUD_FUNCTION_SAVE]: save,
    [consts.CRUD_FUNCTION_DELETE]: del
  }
}
