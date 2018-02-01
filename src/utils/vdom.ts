import VNode from '../vdom/VNode';
import { typeCode } from './index';

export function flattenChildren(children: Array<any> | Symbol | any, parentVNode: VNode) {

  if (children === undefined) return new VNode('#text', "", null, null)

  let length = children.length
  let nextChildren: Array<any> = [],
    isLastSimple = false, //判断上一个元素是否是string 或者 number
    lastString = '',
    childType = typeCode(children)

  if (childType === 4 || childType === 3) {
    return new VNode('#text', children, null, null)
  }

  if (childType !== 7) {
    if (parentVNode) children.return = parentVNode;
    return children
  }

  children.forEach((item, index) => {
    if (typeCode(item) === 7) {
      if (isLastSimple) {
        nextChildren.push(lastString)
      }
      item.forEach((item) => {
        nextChildren.push(item)
      })
      lastString = ''
      isLastSimple = false
    }
    if (typeCode(item) === 3 || typeCode(item) === 4) {
      lastString += item
      isLastSimple = true
    }
    if (typeCode(item) !== 3 && typeCode(item) !== 4 && typeCode(item) !== 7) {
      if (isLastSimple) {//上一个节点是简单节点
        nextChildren.push(lastString)
        nextChildren.push(item)
        lastString = ''
        isLastSimple = false
      } else {
        nextChildren.push(item)
      }

    }
    if (length - 1 === index) {
      if (lastString) nextChildren.push(lastString)
    }
  })
  nextChildren = nextChildren.map((item) => {
    if (typeCode(item) === 4) {
      item = new VNode('#text', item, null, null)
    } else {
      if (item) {//首先判断是否存在
        if (typeCode(item) !== 3 && typeCode(item) !== 4) {//再判断是不是字符串，或者数字
          //不是就加上return
          if (parentVNode) item.return = parentVNode;

        }
      }
    }
    return item

  })

  return nextChildren
}