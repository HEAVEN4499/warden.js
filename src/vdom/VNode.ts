export type VNodeType = (string | Function) & { defaultProps?: { [key: string]: any } };
export type childType = number | string | Array<any> | Symbol | Function | boolean;

export interface VNodeBasic {
  ref?: any,
  key?: any,
};

class VNode implements VNodeBasic {
  public ref?: any;
  public key?: string;
  public type: VNodeType;
  public return?: VNode;
  protected props: Object;
  constructor(type: VNodeType, props: Object, key: any, ref: any) {
    this.type = type;
    this.props = props;
    this.key = key;
    this.ref = ref;
  }
  // this.owner = currentOwner.cur
}

export default VNode;
