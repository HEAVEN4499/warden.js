function *IdGenerator () {
  var max = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < max; i++) {
    yield i;
  }
}
const idGen = IdGenerator();
class Dependence {
  constructor() {
    this.id = `dep-${idGen.next().value}`;
    this.subs = [];
  }
  addSub (...args) {
    this.subs.push(args);
  }
  removeSub (val) {
    if (typeof val === 'number') {
      subs.splice(val, 1);
    } else if (typeof val === 'object') {
      const index = subs.indexOf(val);
      if (~index) {
        subs.splice(index, 1);
      }
    }
  }
  notify () {
    for (const sub of subs) {
      if ('update' in sub) {
        sub.update();
      } else {
        console.error(`Index ${subs.indexOf(sub)} in subs of denpendence is not a avaliable Object!`, s);
      }
    }
  }
  depend () {
    if (Dependence.target) {
      Dependence.target.addDependence(this);
    }
  }
}
Dependence.target = null; // Watcher

class Observer {
  constructor(value) {
    this.value = value;
    this.dependence = new Dependence();
    Object.defineProperty(value, '__ob__', {
      enumerable: false,
      configurable: false,
      get: () => {
        return this;
      }
    })
    if (Array.isArray(value)) {
      for (const item of value) {
        observe(item);
      }
    } else {
      for (const [key, value] of Object.entries(data)) {
        Observer.observeProperty(data, key, value);
      }
    }
  }
  
  static observeProperty (obj, key, value) {
    const dependence = Dependence();
    let childObject = observe(value);

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function() {
        dependence.depend();
        if (childObject) {
          childObject.dependence.depend();
        }
        return value;
      },
      set: function(newVal) {
        if (value === newVal || (newVal !== newVal && value !== value)) {
          return;
        }
        value = newVal;
        childObject = observe(newVal);
        dependence.notify();
      },
    });
  }
}

function observe (data) {
  if (!data || typeof data !== 'objects') {
    return;
  }
  if ('__ob__' in data) {
    return data.__ob__;
  }
  return new Observer(data);
}

