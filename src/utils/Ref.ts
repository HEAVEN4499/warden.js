import { typeCode } from './index';
import VNode, { childType } from '../vdom/VNode';

interface RefFunc { (Vnode: VNode, instance?: childType, domNode?: Element): void };

export const setRef: RefFunc = (Vnode, instance, domNode) => {
  if (instance) {
    const refType = typeCode(Vnode.ref);
    refStrategy(refType)(Vnode, Vnode.owner, domNode);
  }
}

export function clearRefs(refs: Array<childType> | Function) {
  if (typeof refs === 'function') {
    refs(null);
  } else {
    for (const refName in refs) {
      refs[refName] = null;
    }
  }
}

const refStrategy: { (code: number): RefFunc } =
  (code) => (Vnode, instance, domNode) => {
    switch (code) {
      case 3:
        if (Vnode._instance) {
          instance.refs[Vnode.ref] = Vnode._instance;
        } else {
          instance.refs[Vnode.ref] = domNode;
        }
        break;
      case 4:
        refStrategy(3)(Vnode, instance, domNode); break;
      case 5:
        if (Vnode._instance) {
          Vnode.ref(Vnode._instance);
        } else {
          Vnode.ref(domNode);
        }
        break;
    }
  };
