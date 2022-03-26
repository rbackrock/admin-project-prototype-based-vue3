import _ from 'lodash'
import iconMapperData from './icon-mapper'

/**
 * 获得追加菜单图标的菜单树
 * @param {Array} rspMenuTable 后端传入的菜单树
 * @param {Object} iconMapper 菜单和菜单图标的映射对象
 * @returns 添加图标后的菜单树
 */
function attachIcon(rspMenuTable = [], iconMapper) {
  for (let i = 0; i < rspMenuTable.length; i++) {
    const current = rspMenuTable[i]
    if ('uniqueTag' in current) {
      if (iconMapper[current.uniqueTag]) {
        current.icon = iconMapper[current.uniqueTag]
      }
    }

    if ('children' in current && current.children.length > 0) {
      attachIcon(current.children, iconMapper)
    }
  }

  return rspMenuTable
}

/**
 * 获取片平化处理过的菜单树(一位数组)
 * @param {Array} menu 菜单树
 * @param {Array} includeType 包含的菜单类型
 * @param {Function} filterFn 对子菜单的过滤条件
 * @returns 片平化处理过的菜单树
 */
function getMenuFlat(menu, includeType = [], filterFn = () => true) {
  const menusFlat = []
  for (let i = 0; i < menu.length; i++) {
    const currentMenu = menu[i]

    if (includeType.length > 0) {
      if (includeType.indexOf(currentMenu.type) !== -1) {
        menusFlat.push({
          routeName: currentMenu.routeName,
          title: currentMenu.title,
          type: currentMenu.type,
          fixed: currentMenu.fixed
        })
      }
    } else {
      menusFlat.push({
        routeName: currentMenu.routeName,
        title: currentMenu.title,
        type: currentMenu.type,
        fixed: currentMenu.fixed || false
      })
    }

    if (filterFn(menu, includeType, currentMenu) && 'children' in currentMenu && currentMenu.children.length > 0) {
      menusFlat.push(...getMenuFlat(currentMenu.children, includeType, filterFn))
    }
  }

  return menusFlat
}

/**
 * 获取树结构指定属性的一维数组，支持数组和对象，如果传入唯一属性，返回的结果则是对象
 * @param {Array} tree 树类型的数据
 * @param {String} pickPropertyName 拾取属性的名称
 * @param {String} uniqueProperty 当前树节点唯一属性的名称
 * @param {String} childrenName 子节点属性的名称
 * @returns 拾取的属性一位数组或者对象
 */
function pickPropertyOfTree(tree = [], pickPropertyName, uniqueProperty = '', childrenName = 'children') {
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

// 获取服务端拥有的路由权限 MenuName 值变为对象的形式
export const getRspMenuTableKeys = (rspMenuTable = []) => pickPropertyOfTree(rspMenuTable, 'routeName', 'routeName')

// 构成导航菜单，其中从路由表中附加图标组件
export const makeNavigationMenu = (rspMenuTable = []) => attachIcon(rspMenuTable, iconMapperData)

// 为了菜单导航，只获得 type 为 menu 的 routenName 一维数组，其中过滤了当 type = menu 时，还有 children 的菜单
export const getNavigationOnlyMenuFlat = (navigationMenu = []) => getMenuFlat(navigationMenu, ['menu'], (menu, includeType, currentMenu) => currentMenu.type !== 'menu')

// 为了菜单导航，获得所有路由类型的 routenName 一维数组
export const getNavigationFlat = (navigationMenu = []) => getMenuFlat(navigationMenu)
