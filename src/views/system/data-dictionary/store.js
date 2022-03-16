import { ref } from 'vue'
import useCrud from '/@/components/Crud/composables/useCrud'
import * as crudConsts from '/@/components/Crud/consts'
import * as dictionaryApi from '/@/api/data-dictionary'

export const typeCrud = useCrud({
  [crudConsts.CRUD_SEARCH_INJECTION_FORM_MODEL]: {
    typeName: '',
    typeDescription: ''
  },
  [crudConsts.CRUD_INJECTION_FORM_MODEL]: {
    typeName: '',
    typeDescription: ''
  },
  [crudConsts.CRUD_INJECTION_FORM_RULE]: {
    typeName: [
      {
        required: true,
        message: '请输入字典类型'
      }
    ],
    typeDescription: [
      {
        required: true,
        message: '请输入字典名称'
      }
    ]
  },
  [crudConsts.CRUD_API_QUERY]: dictionaryApi.queryDictionaryOfType,
  [crudConsts.CRUD_API_QUERY_ONE]: dictionaryApi.queryDictionaryOfTypeOne,
  [crudConsts.CRUD_API_ADD]: dictionaryApi.addDictionaryOfType,
  [crudConsts.CRUD_API_MODIFY]: dictionaryApi.modifyDictionaryOfType,
  [crudConsts.CRUD_API_DELETE]: dictionaryApi.deleteDictionaryOfType
  // hook
})

export const codeCrud = useCrud({
  [crudConsts.CRUD_SEARCH_INJECTION_FORM_MODEL]: {
    typeId: ''
  },
  [crudConsts.CRUD_INJECTION_FORM_MODEL]: {
    codeDescription: '',
    codeName: '',
    codeValue: ''
  },
  [crudConsts.CRUD_INJECTION_FORM_RULE]: {
    codeDescription: [
      {
        required: true,
        message: '请输入字典编码'
      }
    ],
    codeName: [
      {
        required: true,
        message: '请输入显示值'
      }
    ],
    codeValue: [
      {
        required: true,
        message: '请输入实际值'
      }
    ]
  },
  [crudConsts.CRUD_API_QUERY]: dictionaryApi.queryDictionaryOfCode,
  [crudConsts.CRUD_API_QUERY_ONE]: dictionaryApi.queryDictionaryOfCodeOne,
  [crudConsts.CRUD_API_ADD]: dictionaryApi.addDictionaryOfCode,
  [crudConsts.CRUD_API_MODIFY]: dictionaryApi.modifyDictionaryOfCode,
  [crudConsts.CRUD_API_DELETE]: dictionaryApi.deleteDictionaryOfCode
}, {
  firstSearch: false,
  hasPaging: false
})

export const selectedTypeId = ref(null)
