import useCrud from '/@/components/Crud/composables/useCrud'
import * as crudConsts from '/@/components/Crud/consts'
import * as exampleApi from '/@/api/example'

const searchFormModel = {
  name: '',
  email: ''
}

const formModel = {
  name: '',
  email: ''
}

const formModelRule = {
  id: [
    {
      required: false
    }
  ],
  name: [
    {
      required: true,
      message: '请输入姓名'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入电子邮箱'
    }
  ]
}

export const crud = useCrud({
  [crudConsts.CRUD_SEARCH_INJECTION_FORM_MODEL]: searchFormModel,
  [crudConsts.CRUD_INJECTION_FORM_MODEL]: formModel,
  [crudConsts.CRUD_INJECTION_FORM_RULE]: formModelRule,
  [crudConsts.CRUD_API_QUERY]: exampleApi.query,
  [crudConsts.CRUD_API_QUERY_ONE]: exampleApi.queryOne,
  [crudConsts.CRUD_API_ADD]: exampleApi.add,
  [crudConsts.CRUD_API_MODIFY]: exampleApi.modify,
  [crudConsts.CRUD_API_DELETE]: exampleApi.del
}, {
  hasPaging: false
})
