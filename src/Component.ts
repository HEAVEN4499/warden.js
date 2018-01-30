const enum COMPONENT_STATUS {
  CREATE = 0,
  MOUNT = 1,
  UPDATING = 2,
  UPDATED = 3,
  MOUNTTING = 4,
  CATCHING = 5,
};

let uniqueId = 0
class Component {
  protected lifeCycle: COMPONENT_STATUS;
}

export default Component;