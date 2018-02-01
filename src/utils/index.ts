import VNode from "../vdom/VNode";

export const options = {
  async: false,
  dirtyComponent: {},
};

/**
 * Return Code of data's type
 * @param {any} data
 */
export function typeCode(data: any) {
  switch (true) {
    case data === undefined: return 0;
    case data === null: return 1;
    case typeof data === 'boolean': return 2;
    case typeof data === 'number': return 3;
    case typeof data === 'string': return 4;
    case typeof data === 'function': return 5;
    case typeof data === 'symbol': return 6;
    case data instanceof Array: return 7;
    default: return 8;
  }
}

export function isSameVnode(pre: VNode, next: VNode) {
  if (pre.type === next.type && pre.key === next.key) {
    return true;
  }
  return false;
}
