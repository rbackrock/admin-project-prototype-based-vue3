import _ from 'lodash'

/**
 * 在组件使用中，需要使用节流，用这个方法来包裹事件即可，不要使用在复用组件中，详情见 Vue 官方文档
 * https://v3.cn.vuejs.org/guide/data-methods.html#%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81
 * @param {Function} cb 需要使用节流的函数
 * @param {Number} millisecond 节流间隔毫秒数
 * @param {Object} opts lodash 中节流的参数
 * @returns 节流事件函数
 */
export const throttle = (cb, ctx = undefined, millisecond = 3000, opts = {
  leading: true,
  trailing: false
}) => _.throttle(function (...args) {
  cb && cb.call(ctx ? ctx : this, ...args)
}, millisecond, opts)

/**
 * 在组件使用中，需要使用防抖，用这个方法来包裹事件即可，不要使用在复用组件中，详情见 Vue 官方文档
 * https://v3.cn.vuejs.org/guide/data-methods.html#%E9%98%B2%E6%8A%96%E5%92%8C%E8%8A%82%E6%B5%81
 * @param {Function} cb 需要使用防抖的函数
 * @param {Number} millisecond 防抖间隔毫秒数
 * @param {Object} opts lodash 中防抖的参数
 * @returns 防抖事件函数
 */
export const debounce = (cb, ctx = undefined, millisecond = 300, opts = {
  leading: true,
  trailing: false
}) => _.debounce(function (...args) {
  cb && cb.call(ctx ? ctx : this, ...args)
}, millisecond, opts)

/**
 * 获取树结构指定属性的一维数组，支持数组和对象，如果传入唯一属性，返回的结果则是对象
 * @param {Array} tree 树类型的数据
 * @param {String} pickPropertyName 拾取属性的名称
 * @param {String} uniqueProperty 当前树节点唯一属性的名称
 * @param {String} childrenName 子节点属性的名称
 * @returns 拾取的属性一位数组或者对象
 */
export const pickPropertyOfTree = (tree = [], pickPropertyName, uniqueProperty = '', childrenName = 'children') => {
  const isUniqueProperty = !!uniqueProperty
  const properties = isUniqueProperty ? {} : []

  for (let i = 0; i < tree.length; i++) {
    const current = tree[i]

    if (pickPropertyName in current) {
      if (isUniqueProperty) {
        if (current[uniqueProperty]) {
          properties[current[uniqueProperty]] = current[pickPropertyName]
        }
      } else {
        properties.push(current[pickPropertyName])
      }
    }

    if (childrenName in current && current[childrenName].length > 0) {
      if (isUniqueProperty) {
        _.assign(properties, pickPropertyOfTree(
          current[childrenName],
          pickPropertyName,
          uniqueProperty,
          childrenName
        ))
      } else {
        properties.push(...pickPropertyOfTree(
          current[childrenName],
          pickPropertyName,
          uniqueProperty,
          childrenName
        ))
      }
    }
  }

  return properties
}

/**
 * 在指定的树机构数据中，获取指定节点所经历过的节点集合
 * @param {Array} tree 要进行树结构的数据
 * @param {String} findNodeNameProperty 要查找节点的属性名称
 * @param {String} findNodeName 要查找节点属性的值
 * @param {String} childrenName 树节点中，子节点的属性值
 * @param {Function} filterFn 过滤函数，用于返回路径节点中，忽略的值或者其他操作
 * @param {Array} lastNodePath 最后一个节点的路径（该方法自身使用）
 * @returns 返回指定节点所经历过的节点集合，是一位数组
 */
export const findTreeNodePath = (tree, findNodeNameProperty, findNodeName, childrenName = 'children', filterFn, lastNodePath = []) => {
  const filterFunction = filterFn || ((node) => {
    const filterProperty = ['children']
    const pathNode = {}
    const nodeKeys = Object.keys(node)
    for (let i = 0; i < nodeKeys.length; i++) {
      const k = nodeKeys[i]
      if (filterProperty.indexOf(k) === -1) {
        pathNode[k] = node[k]
      }
    }

    return pathNode
  })
  let nodePath = lastNodePath

  for (let i = 0; i < tree.length; i++) {
    const current = tree[i]

    if (current[findNodeNameProperty] === findNodeName) {
      lastNodePath.push(filterFunction(current))
      return [...lastNodePath]
    }

    if (current[childrenName] && current[childrenName].length > 0) {
      const currentLastFindNodeName = lastNodePath.length === 0 ? [filterFunction(current)] : [...lastNodePath, filterFunction(current)]
      nodePath = findTreeNodePath(current[childrenName], findNodeNameProperty, findNodeName, childrenName, filterFn, currentLastFindNodeName)
      if (nodePath[nodePath.length - 1][findNodeNameProperty] === findNodeName) {
        return nodePath
      }
    }
  }

  return nodePath
}
