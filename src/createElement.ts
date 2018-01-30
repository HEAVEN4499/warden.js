import { typeCode } from "./utils/index";


const RESERVED_PROPS = {
  ref: true,
  key: true,
  __self: true,
  __source: true,
};

export class VNode {
  public type: string | Function;
  public key: any;
  protected props: Object;
  protected ref: any;
  constructor(type: string | Function, props: Object, key: any, ref: any) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.ref = ref;
  }
  // this.owner = currentOwner.cur
}

const createElememt = function(type: string | Function, config: Object, ...children: Array<any>) {
  let props = {};
  let key = null;
  let ref = null;
  let childLength = children.length;
};

export default createElememt;
