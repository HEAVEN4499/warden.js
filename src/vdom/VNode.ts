export type VNodeType = (string | Function) & { defaultProps?: { [key: string]: any } };
export type childType = number | string | Array<any> | symbol | Function | boolean | VNode;

export interface VNodeBasic {
  ref?: childType,
  key?: any,
};

class VNode implements VNodeBasic {
  public ref?: childType;
  public key?: string;
  public refs?: any;
  public owner?: VNode;
  public _instance?: childType;
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
