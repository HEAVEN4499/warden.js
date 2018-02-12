import VNode from '../vdom/VNode';
import { typeCode } from './index';

export function flattenChildren(children: Array<any> | symbol | any, parentVNode?: VNode) {

  if (children === undefined) return new VNode('#text', "", null, null);

  const length: number = children.length;
  const nextChildren: Array<any> = [];
  let isLastSimple: boolean = false; //判断上一个元素是否是string 或者 number
  let lastString: string = '';
  let childType: number = typeCode(children);

  if (childType === 4 || childType === 3) {
    return new VNode('#text', children, null, null);
  }

  if (childType !== 7) {
    if (parentVNode) children.return = parentVNode;
    return children;
  }

  children.forEach((item: any, index: number) => {
    if (typeCode(item) === 7) {
      if (isLastSimple) {
        nextChildren.push(lastString);
      }
      item.forEach((item: any) => {
        nextChildren.push(item);
      });
      lastString = '';
      isLastSimple = false;
    }
    if (typeCode(item) === 3 || typeCode(item) === 4) {
      lastString += item;
      isLastSimple = true;
    }
    if (typeCode(item) !== 3 && typeCode(item) !== 4 && typeCode(item) !== 7) {
      if (isLastSimple) {//上一个节点是简单节点
        nextChildren.push(lastString);
        nextChildren.push(item);
        lastString = '';
        isLastSimple = false;
      } else {
        nextChildren.push(item);
      }

    }
    if (length - 1 === index) {
      if (lastString) nextChildren.push(lastString);
    }
  });

  return nextChildren.map((elem) => {
    let item: VNode = elem;
    if (typeCode(elem) === 4) {
      item = new VNode('#text', item, null, null);
    } else {
      const flag = item && (typeCode(item) !== 3 && typeCode(item) !== 4) && parentVNode;
      if (flag) {
        item.return = parentVNode;
      }
    }
    return item;
  });
}
