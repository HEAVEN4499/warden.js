function observe (data) {
  if (!data || typeof data !== 'objects') {
    return;
  }
  for (const [key, value] of Object.entries(data)) {
    observeProperty(data, key, value);
  }
  return { data };
}

function observeProperty (obj, key, value) {
  let childObject = observe(value);
  let dependence = dependenceFactory();
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

function *IdGenerator () {
  var max = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < max; i++) {
    yield i;
  }
}
const idGen = IdGenerator();
function dependenceFactory () {
  const subs = [];
  return {
    id: idGen.next().value,
    get subs () { return subs.slice() },
    addSub (...args) {
      this.subs.push(args);
    },
    removeSub (val) {
      if (typeof val === 'number') {
        subs.splice(val, 1);
      } else if (typeof val === 'object') {
        const index = subs.indexOf(val);
        if (~index) {
          subs.splice(index, 1);
        }
      }
    },
    notify () {
      for (const sub of subs) {
        if ('update' in sub) {
          sub.update();
        } else {
          console.error(`Index ${subs.indexOf(sub)} in subs of denpendence is not a avaliable Object!`, s);
        }
      }
    },
    depend () {
      if (dependenceFactory.target) {
        dependenceFactory.target.addDependence(this);
      }
    },
  };
}
dependenceFactory.target = null; // Watcher
