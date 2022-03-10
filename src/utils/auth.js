import storage from '/@/utils/storage'
import * as encryptKeys from '/@/utils/encrypt/keys'
import { encrypt, decrypt } from '/@/utils/encrypt'

// token 在 Storage 的键
const TOKEN_NAME_OF_STORAGE = 'qQhQebcorEiVd72QbEH'
// 加密分隔符
const SPLIT_FLAG = 'fke-'

/**
 * 获得数组形式的加密数据
 * 因为加密限制，分段加密，以 52 字符长度为分隔条件
 * @param {String} token jwt 令牌
 * @returns 数组形式的加密数据
 */
function encryptToken(token) {
  const STEP = 52
  const STEP_NUM = Math.ceil(token.length / STEP)
  const encryptTokenArray = []

  for (let i = 0; i < STEP_NUM; i++) {
    encryptTokenArray.push(encrypt(encryptKeys.publicKeyForFrontend, token.substr(i * STEP, STEP)))
  }

  return encryptTokenArray
}

export const saveEnduranceTokenOfStorage = (token) => {
  const encryptTokenArray = encryptToken(token)
  if (encryptTokenArray && encryptTokenArray.length > 0) {
    storage.setSession(TOKEN_NAME_OF_STORAGE, encryptTokenArray.join(SPLIT_FLAG))
  }
}

export const getEnduranceTokenOfStorage = () => {
  const encryptTokenText = storage.getSession(TOKEN_NAME_OF_STORAGE)
  if (encryptTokenText) {
    const encryptTokenArray = encryptTokenText.split(SPLIT_FLAG)

    let token = ''
    for (let i = 0; i < encryptTokenArray.length; i++) {
      token += decrypt(encryptKeys.privateKeyForFrontend, encryptTokenArray[i])
    }

    return token
  }

  return null
}

export const clearEnduranceTokenOfStorage = () => {
  storage.removeSession(TOKEN_NAME_OF_STORAGE)
}
