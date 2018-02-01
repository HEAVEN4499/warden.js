import { typeCode } from "./utils/index";
import VNode, { VNodeType, VNodeBasic } from './vdom/VNode';

export interface ElementConfig extends VNodeBasic {
  __self?: any,
  __source?: any,
  [key: string]: any,
};

const RESERVED_PROPS_ARRAY = ['ref', 'key', '__self', '__source'];

export interface ElementProps {
  children?: Array<any> | any,
  [key: string]: any,
};

/**
 * To create V-DOM
 * @param {string | Function} type 
 * @param {object} config 
 * @param {array} children 
 */
const createElememt = function (type: VNodeType, config?: ElementConfig, ...children: Array<any>) {
  const props: ElementProps = {};
  let key = null;
  let ref = null;
  let childLength = children.length;

  if (config) {
    key = config.key === undefined ? null : `${config.key}`;
    ref = config.ref === undefined ? null : config.ref;

    for (const propKey in config) {
      if (~RESERVED_PROPS_ARRAY.indexOf(propKey)) {
        continue;
      }

      if (config.hasOwnProperty(propKey)) {
        props[propKey] = config[propKey];
      }
    }
  }

  if (childLength === 1) {
    props.children = typeCode(children[0]) > 2 ? children[0] : []
  } else if (childLength > 1) {
    props.children = children
  }

  /** set defaultProps */
  let defaultProps = type.defaultProps;
  if (defaultProps) {
    for (let propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return new VNode(type, props, key, ref);
};

export default createElememt;
