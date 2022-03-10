import _ from 'lodash'

export default {
  setSession(key, value) {
    if (!key || !value) {
      console.error('sessionStorage 不能为空')
    } else if (_.isObject(value)) {
      try {
        const val = JSON.stringify(value)
        sessionStorage.setItem(key, val)
      } catch (error) {
        console.error(error)
      }
    } else {
      sessionStorage.setItem(key, value)
    }
  },
  getSession(key) {
    let value = null
    if (!key) {
      console.error('sessionStorage 键不能为空')
    } else {
      const sessionValue = sessionStorage.getItem(key)
      try {
        value = JSON.parse(sessionValue)
      } catch (error) {
        value = sessionValue
      }
    }

    return value
  },
  removeSession(key) {
    if (!key) {
      console.error('sessionStorage 键不能为空')
    } else {
      sessionStorage.removeItem(key)
    }
  },
  clearSession() {
    sessionStorage.clear()
  },
  // local-storage
  setLocal(key, value) {
    if (!key || !value) {
      console.error('localStorage 不能为空')
    } else if (_.isObject(value)) {
      try {
        const val = JSON.stringify(value)
        localStorage.setItem(key, val)
      } catch (error) {
        console.error(error)
      }
    } else {
      localStorage.setItem(key, value)
    }
  },
  getLocal(key) {
    let value = null
    if (!key) {
      console.error('localStorage 键不能为空')
    } else {
      const localValue = localStorage.getItem(key)
      try {
        value = JSON.parse(localValue)
      } catch (error) {
        value = localValue
      }
    }

    return value
  },
  removeLocal(key) {
    if (!key) {
      console.error('localStorage 键不能为空')
    } else {
      localStorage.removeItem(key)
    }
  },
  clearLocal() {
    localStorage.clear()
  }
}
