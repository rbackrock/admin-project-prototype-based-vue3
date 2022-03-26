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
