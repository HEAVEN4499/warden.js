import VNode from './VNode';
import { typeCode } from '../utils/index';
import { flattenChildren } from '../utils/vdom';

export class Children {
  public static map = (childVNode: any, callback: Function, context?: any): Array<any> => {
    if (childVNode === null || childVNode === undefined) {
      return [childVNode];
    }
    if (typeCode(childVNode) !== 7) {
      return [callback.call(context, childVNode, 0)];
    }

    const result = flattenChildren(childVNode).map((oldVNode: VNode, index: number) => {
      return callback.call(context, oldVNode, index);
    }).filter((node: VNode) => node !== null);
    return result;
  };

  public static only = (childVNode: any) => {
    if (typeCode(childVNode) !== 7) { return childVNode; }
    throw new Error('React.Children.only expect only one child, which means you cannot use a list inside a component');
  };

  public static count = (childVnode: any) => {
    if (childVnode === null) {
        return 0
    }
    if (typeCode(childVnode) !== 7) {
        return 1
    }
    return flattenChildren(childVnode).length;
  };

  public static forEach = (childVNode: any, callback: Function, context: any): void => {
    let flatten = flattenChildren(childVNode)

    if (typeCode(flatten) === 7) {
        flattenChildren(childVNode).forEach(callback, context);
    } else {
        callback.call(context, childVNode, 0)
    }
  };

  public static toArray = (childVNode?: Array<any>): Array<any> => {
    if (childVNode == null) { return [] }
    return Children.map(childVNode, (el: any) => el);
  };
}
