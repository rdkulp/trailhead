function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return exports;
  };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function (method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}

var SECTION_ID_ATTR$1 = 'data-section-id';

function Section(container, properties) {
  this.container = validateContainerElement(container);
  this.id = container.getAttribute(SECTION_ID_ATTR$1);
  this.extensions = [];

  // eslint-disable-next-line es5/no-es6-static-methods
  Object.assign(this, validatePropertiesObject(properties));

  this.onLoad();
}

Section.prototype = {
  onLoad: Function.prototype,
  onUnload: Function.prototype,
  onSelect: Function.prototype,
  onDeselect: Function.prototype,
  onBlockSelect: Function.prototype,
  onBlockDeselect: Function.prototype,

  extend: function extend(extension) {
    this.extensions.push(extension); // Save original extension

    // eslint-disable-next-line es5/no-es6-static-methods
    var extensionClone = Object.assign({}, extension);
    delete extensionClone.init; // Remove init function before assigning extension properties

    // eslint-disable-next-line es5/no-es6-static-methods
    Object.assign(this, extensionClone);

    if (typeof extension.init === 'function') {
      extension.init.apply(this);
    }
  }
};

function validateContainerElement(container) {
  if (!(container instanceof Element)) {
    throw new TypeError(
      'Theme Sections: Attempted to load section. The section container provided is not a DOM element.'
    );
  }
  if (container.getAttribute(SECTION_ID_ATTR$1) === null) {
    throw new Error(
      'Theme Sections: The section container provided does not have an id assigned to the ' +
        SECTION_ID_ATTR$1 +
        ' attribute.'
    );
  }

  return container;
}

function validatePropertiesObject(value) {
  if (
    (typeof value !== 'undefined' && typeof value !== 'object') ||
    value === null
  ) {
    throw new TypeError(
      'Theme Sections: The properties object provided is not a valid'
    );
  }

  return value;
}

// Object.assign() polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target) {
      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/*
 * @shopify/theme-sections
 * -----------------------------------------------------------------------------
 *
 * A framework to provide structure to your Shopify sections and a load and unload
 * lifecycle. The lifecycle is automatically connected to theme editor events so
 * that your sections load and unload as the editor changes the content and
 * settings of your sections.
 */

var SECTION_TYPE_ATTR = 'data-section-type';
var SECTION_ID_ATTR = 'data-section-id';

window.Shopify = window.Shopify || {};
window.Shopify.theme = window.Shopify.theme || {};
window.Shopify.theme.sections = window.Shopify.theme.sections || {};

var registered = (window.Shopify.theme.sections.registered =
  window.Shopify.theme.sections.registered || {});
var instances = (window.Shopify.theme.sections.instances =
  window.Shopify.theme.sections.instances || []);

function register(type, properties) {
  if (typeof type !== 'string') {
    throw new TypeError(
      'Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered'
    );
  }

  if (typeof registered[type] !== 'undefined') {
    throw new Error(
      'Theme Sections: A section of type "' +
        type +
        '" has already been registered. You cannot register the same section type twice'
    );
  }

  function TypedSection(container) {
    Section.call(this, container, properties);
  }

  TypedSection.constructor = Section;
  TypedSection.prototype = Object.create(Section.prototype);
  TypedSection.prototype.type = type;

  return (registered[type] = TypedSection);
}

function load(types, containers) {
  types = normalizeType(types);

  if (typeof containers === 'undefined') {
    containers = document.querySelectorAll('[' + SECTION_TYPE_ATTR + ']');
  }

  containers = normalizeContainers(containers);

  types.forEach(function(type) {
    var TypedSection = registered[type];

    if (typeof TypedSection === 'undefined') {
      return;
    }

    containers = containers.filter(function(container) {
      // Filter from list of containers because container already has an instance loaded
      if (isInstance(container)) {
        return false;
      }

      // Filter from list of containers because container doesn't have data-section-type attribute
      if (container.getAttribute(SECTION_TYPE_ATTR) === null) {
        return false;
      }

      // Keep in list of containers because current type doesn't match
      if (container.getAttribute(SECTION_TYPE_ATTR) !== type) {
        return true;
      }

      instances.push(new TypedSection(container));

      // Filter from list of containers because container now has an instance loaded
      return false;
    });
  });
}

function unload(selector) {
  var instancesToUnload = getInstances(selector);

  instancesToUnload.forEach(function(instance) {
    var index = instances
      .map(function(e) {
        return e.id;
      })
      .indexOf(instance.id);
    instances.splice(index, 1);
    instance.onUnload();
  });
}

function getInstances(selector) {
  var filteredInstances = [];

  // Fetch first element if its an array
  if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {
    var firstElement = selector[0];
  }

  // If selector element is DOM element
  if (selector instanceof Element || firstElement instanceof Element) {
    var containers = normalizeContainers(selector);

    containers.forEach(function(container) {
      filteredInstances = filteredInstances.concat(
        instances.filter(function(instance) {
          return instance.container === container;
        })
      );
    });

    // If select is type string
  } else if (typeof selector === 'string' || typeof firstElement === 'string') {
    var types = normalizeType(selector);

    types.forEach(function(type) {
      filteredInstances = filteredInstances.concat(
        instances.filter(function(instance) {
          return instance.type === type;
        })
      );
    });
  }

  return filteredInstances;
}

function getInstanceById(id) {
  var instance;

  for (var i = 0; i < instances.length; i++) {
    if (instances[i].id === id) {
      instance = instances[i];
      break;
    }
  }
  return instance;
}

function isInstance(selector) {
  return getInstances(selector).length > 0;
}

function normalizeType(types) {
  // If '*' then fetch all registered section types
  if (types === '*') {
    types = Object.keys(registered);

    // If a single section type string is passed, put it in an array
  } else if (typeof types === 'string') {
    types = [types];

    // If single section constructor is passed, transform to array with section
    // type string
  } else if (types.constructor === Section) {
    types = [types.prototype.type];

    // If array of typed section constructors is passed, transform the array to
    // type strings
  } else if (Array.isArray(types) && types[0].constructor === Section) {
    types = types.map(function(TypedSection) {
      return TypedSection.prototype.type;
    });
  }

  types = types.map(function(type) {
    return type.toLowerCase();
  });

  return types;
}

function normalizeContainers(containers) {
  // Nodelist with entries
  if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {
    containers = Array.prototype.slice.call(containers);

    // Empty Nodelist
  } else if (
    NodeList.prototype.isPrototypeOf(containers) &&
    containers.length === 0
  ) {
    containers = [];

    // Handle null (document.querySelector() returns null with no match)
  } else if (containers === null) {
    containers = [];

    // Single DOM element
  } else if (!Array.isArray(containers) && containers instanceof Element) {
    containers = [containers];
  }

  return containers;
}

if (window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', function(event) {
    var container;
    var id = event.detail.sectionId;

    if (window.Shopify.visualPreviewMode) {
      container = event.target.querySelector("[data-section-id]");
    } else {
      container = event.target.querySelector(
        '[' + SECTION_ID_ATTR + '="' + id + '"]'
      );
    }

    if (container !== null) {
      load(container.getAttribute(SECTION_TYPE_ATTR), container);
    }
  });

  document.addEventListener('shopify:section:unload', function(event) {
    var id = event.detail.sectionId;
    var container = event.target.querySelector(
      '[' + SECTION_ID_ATTR + '="' + id + '"]'
    );
    var instance = getInstances(container)[0];

    if (typeof instance === 'object') {
      unload(container);
    }
  });

  document.addEventListener('shopify:section:select', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onSelect(event);
    }
  });

  document.addEventListener('shopify:section:deselect', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onDeselect(event);
    }
  });

  document.addEventListener('shopify:block:select', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onBlockSelect(event);
    }
  });

  document.addEventListener('shopify:block:deselect', function(event) {
    var instance = getInstanceById(event.detail.sectionId);

    if (typeof instance === 'object') {
      instance.onBlockDeselect(event);
    }
  });
}

function n$2(n,t){return void 0===t&&(t=document),t.querySelector(n)}function t$2(n,t){return void 0===t&&(t=document),[].slice.call(t.querySelectorAll(n))}function c$1(n,t){return Array.isArray(n)?n.forEach(t):t(n)}function r$2(n){return function(t,r,e){return c$1(t,function(t){return t[n+"EventListener"](r,e)})}}function e$2(n,t,c){return r$2("add")(n,t,c),function(){return r$2("remove")(n,t,c)}}function o$2(n){return function(t){var r=arguments;return c$1(t,function(t){var c;return (c=t.classList)[n].apply(c,[].slice.call(r,1))})}}function u$1(n){o$2("add").apply(void 0,[n].concat([].slice.call(arguments,1)));}function i$1(n){o$2("remove").apply(void 0,[n].concat([].slice.call(arguments,1)));}function l(n){o$2("toggle").apply(void 0,[n].concat([].slice.call(arguments,1)));}function a$1(n,t){return n.classList.contains(t)}

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var isMobile$2 = {exports: {}};

isMobile$2.exports = isMobile;
isMobile$2.exports.isMobile = isMobile;
isMobile$2.exports.default = isMobile;

var mobileRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

var tabletRE = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i;

function isMobile (opts) {
  if (!opts) opts = {};
  var ua = opts.ua;
  if (!ua && typeof navigator !== 'undefined') ua = navigator.userAgent;
  if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
    ua = ua.headers['user-agent'];
  }
  if (typeof ua !== 'string') return false

  var result = opts.tablet ? tabletRE.test(ua) : mobileRE.test(ua);

  if (
    !result &&
    opts.tablet &&
    opts.featureDetect &&
    navigator &&
    navigator.maxTouchPoints > 1 &&
    ua.indexOf('Macintosh') !== -1 &&
    ua.indexOf('Safari') !== -1
  ) {
    result = true;
  }

  return result
}

var isMobile$1 = isMobile$2.exports;

var browser = {exports: {}};

(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * DOM event delegator
 *
 * The delegator will listen
 * for events that bubble up
 * to the root node.
 *
 * @constructor
 * @param {Node|string} [root] The root node or a selector string matching the root node
 */
function Delegate(root) {
  /**
   * Maintain a map of listener
   * lists, keyed by event name.
   *
   * @type Object
   */
  this.listenerMap = [{}, {}];

  if (root) {
    this.root(root);
  }
  /** @type function() */


  this.handle = Delegate.prototype.handle.bind(this); // Cache of event listeners removed during an event cycle

  this._removedListeners = [];
}
/**
 * Start listening for events
 * on the provided DOM element
 *
 * @param  {Node|string} [root] The root node or a selector string matching the root node
 * @returns {Delegate} This method is chainable
 */


Delegate.prototype.root = function (root) {
  var listenerMap = this.listenerMap;
  var eventType; // Remove master event listeners

  if (this.rootElement) {
    for (eventType in listenerMap[1]) {
      if (listenerMap[1].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, true);
      }
    }

    for (eventType in listenerMap[0]) {
      if (listenerMap[0].hasOwnProperty(eventType)) {
        this.rootElement.removeEventListener(eventType, this.handle, false);
      }
    }
  } // If no root or root is not
  // a dom node, then remove internal
  // root reference and exit here


  if (!root || !root.addEventListener) {
    if (this.rootElement) {
      delete this.rootElement;
    }

    return this;
  }
  /**
   * The root node at which
   * listeners are attached.
   *
   * @type Node
   */


  this.rootElement = root; // Set up master event listeners

  for (eventType in listenerMap[1]) {
    if (listenerMap[1].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, true);
    }
  }

  for (eventType in listenerMap[0]) {
    if (listenerMap[0].hasOwnProperty(eventType)) {
      this.rootElement.addEventListener(eventType, this.handle, false);
    }
  }

  return this;
};
/**
 * @param {string} eventType
 * @returns boolean
 */


Delegate.prototype.captureForType = function (eventType) {
  return ['blur', 'error', 'focus', 'load', 'resize', 'scroll'].indexOf(eventType) !== -1;
};
/**
 * Attach a handler to one
 * event for all elements
 * that match the selector,
 * now or in the future
 *
 * The handler function receives
 * three arguments: the DOM event
 * object, the node that matched
 * the selector while the event
 * was bubbling and a reference
 * to itself. Within the handler,
 * 'this' is equal to the second
 * argument.
 *
 * The node that actually received
 * the event can be accessed via
 * 'event.target'.
 *
 * @param {string} eventType Listen for these events
 * @param {string|undefined} selector Only handle events on elements matching this selector, if undefined match root element
 * @param {function()} handler Handler function - event data passed here will be in event.data
 * @param {boolean} [useCapture] see 'useCapture' in <https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener>
 * @returns {Delegate} This method is chainable
 */


Delegate.prototype.on = function (eventType, selector, handler, useCapture) {
  var root;
  var listenerMap;
  var matcher;
  var matcherParam;

  if (!eventType) {
    throw new TypeError('Invalid event type: ' + eventType);
  } // handler can be passed as
  // the second or third argument


  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  } // Fallback to sensible defaults
  // if useCapture not set


  if (useCapture === undefined) {
    useCapture = this.captureForType(eventType);
  }

  if (typeof handler !== 'function') {
    throw new TypeError('Handler must be a type of Function');
  }

  root = this.rootElement;
  listenerMap = this.listenerMap[useCapture ? 1 : 0]; // Add master handler for type if not created yet

  if (!listenerMap[eventType]) {
    if (root) {
      root.addEventListener(eventType, this.handle, useCapture);
    }

    listenerMap[eventType] = [];
  }

  if (!selector) {
    matcherParam = null; // COMPLEX - matchesRoot needs to have access to
    // this.rootElement, so bind the function to this.

    matcher = matchesRoot.bind(this); // Compile a matcher for the given selector
  } else if (/^[a-z]+$/i.test(selector)) {
    matcherParam = selector;
    matcher = matchesTag;
  } else if (/^#[a-z0-9\-_]+$/i.test(selector)) {
    matcherParam = selector.slice(1);
    matcher = matchesId;
  } else {
    matcherParam = selector;
    matcher = Element.prototype.matches;
  } // Add to the list of listeners


  listenerMap[eventType].push({
    selector: selector,
    handler: handler,
    matcher: matcher,
    matcherParam: matcherParam
  });
  return this;
};
/**
 * Remove an event handler
 * for elements that match
 * the selector, forever
 *
 * @param {string} [eventType] Remove handlers for events matching this type, considering the other parameters
 * @param {string} [selector] If this parameter is omitted, only handlers which match the other two will be removed
 * @param {function()} [handler] If this parameter is omitted, only handlers which match the previous two will be removed
 * @returns {Delegate} This method is chainable
 */


Delegate.prototype.off = function (eventType, selector, handler, useCapture) {
  var i;
  var listener;
  var listenerMap;
  var listenerList;
  var singleEventType; // Handler can be passed as
  // the second or third argument

  if (typeof selector === 'function') {
    useCapture = handler;
    handler = selector;
    selector = null;
  } // If useCapture not set, remove
  // all event listeners


  if (useCapture === undefined) {
    this.off(eventType, selector, handler, true);
    this.off(eventType, selector, handler, false);
    return this;
  }

  listenerMap = this.listenerMap[useCapture ? 1 : 0];

  if (!eventType) {
    for (singleEventType in listenerMap) {
      if (listenerMap.hasOwnProperty(singleEventType)) {
        this.off(singleEventType, selector, handler);
      }
    }

    return this;
  }

  listenerList = listenerMap[eventType];

  if (!listenerList || !listenerList.length) {
    return this;
  } // Remove only parameter matches
  // if specified


  for (i = listenerList.length - 1; i >= 0; i--) {
    listener = listenerList[i];

    if ((!selector || selector === listener.selector) && (!handler || handler === listener.handler)) {
      this._removedListeners.push(listener);

      listenerList.splice(i, 1);
    }
  } // All listeners removed


  if (!listenerList.length) {
    delete listenerMap[eventType]; // Remove the main handler

    if (this.rootElement) {
      this.rootElement.removeEventListener(eventType, this.handle, useCapture);
    }
  }

  return this;
};
/**
 * Handle an arbitrary event.
 *
 * @param {Event} event
 */


Delegate.prototype.handle = function (event) {
  var i;
  var l;
  var type = event.type;
  var root;
  var phase;
  var listener;
  var returned;
  var listenerList = [];
  var target;
  var eventIgnore = 'ftLabsDelegateIgnore';

  if (event[eventIgnore] === true) {
    return;
  }

  target = event.target; // Hardcode value of Node.TEXT_NODE
  // as not defined in IE8

  if (target.nodeType === 3) {
    target = target.parentNode;
  } // Handle SVG <use> elements in IE


  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  root = this.rootElement;
  phase = event.eventPhase || (event.target !== event.currentTarget ? 3 : 2); // eslint-disable-next-line default-case

  switch (phase) {
    case 1:
      //Event.CAPTURING_PHASE:
      listenerList = this.listenerMap[1][type];
      break;

    case 2:
      //Event.AT_TARGET:
      if (this.listenerMap[0] && this.listenerMap[0][type]) {
        listenerList = listenerList.concat(this.listenerMap[0][type]);
      }

      if (this.listenerMap[1] && this.listenerMap[1][type]) {
        listenerList = listenerList.concat(this.listenerMap[1][type]);
      }

      break;

    case 3:
      //Event.BUBBLING_PHASE:
      listenerList = this.listenerMap[0][type];
      break;
  }

  var toFire = []; // Need to continuously check
  // that the specific list is
  // still populated in case one
  // of the callbacks actually
  // causes the list to be destroyed.

  l = listenerList.length;

  while (target && l) {
    for (i = 0; i < l; i++) {
      listener = listenerList[i]; // Bail from this loop if
      // the length changed and
      // no more listeners are
      // defined between i and l.

      if (!listener) {
        break;
      }

      if (target.tagName && ["button", "input", "select", "textarea"].indexOf(target.tagName.toLowerCase()) > -1 && target.hasAttribute("disabled")) {
        // Remove things that have previously fired
        toFire = [];
      } // Check for match and fire
      // the event if there's one
      //
      // TODO:MCG:20120117: Need a way
      // to check if event#stopImmediatePropagation
      // was called. If so, break both loops.
      else if (listener.matcher.call(target, listener.matcherParam, target)) {
          toFire.push([event, target, listener]);
        }
    } // TODO:MCG:20120117: Need a way to
    // check if event#stopPropagation
    // was called. If so, break looping
    // through the DOM. Stop if the
    // delegation root has been reached


    if (target === root) {
      break;
    }

    l = listenerList.length; // Fall back to parentNode since SVG children have no parentElement in IE

    target = target.parentElement || target.parentNode; // Do not traverse up to document root when using parentNode, though

    if (target instanceof HTMLDocument) {
      break;
    }
  }

  var ret;

  for (i = 0; i < toFire.length; i++) {
    // Has it been removed during while the event function was fired
    if (this._removedListeners.indexOf(toFire[i][2]) > -1) {
      continue;
    }

    returned = this.fire.apply(this, toFire[i]); // Stop propagation to subsequent
    // callbacks if the callback returned
    // false

    if (returned === false) {
      toFire[i][0][eventIgnore] = true;
      toFire[i][0].preventDefault();
      ret = false;
      break;
    }
  }

  return ret;
};
/**
 * Fire a listener on a target.
 *
 * @param {Event} event
 * @param {Node} target
 * @param {Object} listener
 * @returns {boolean}
 */


Delegate.prototype.fire = function (event, target, listener) {
  return listener.handler.call(target, event, target);
};
/**
 * Check whether an element
 * matches a tag selector.
 *
 * Tags are NOT case-sensitive,
 * except in XML (and XML-based
 * languages such as XHTML).
 *
 * @param {string} tagName The tag name to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */


function matchesTag(tagName, element) {
  return tagName.toLowerCase() === element.tagName.toLowerCase();
}
/**
 * Check whether an element
 * matches the root.
 *
 * @param {?String} selector In this case this is always passed through as null and not used
 * @param {Element} element The element to test with
 * @returns boolean
 */


function matchesRoot(selector, element) {
  if (this.rootElement === window) {
    return (// Match the outer document (dispatched from document)
      element === document || // The <html> element (dispatched from document.body or document.documentElement)
      element === document.documentElement || // Or the window itself (dispatched from window)
      element === window
    );
  }

  return this.rootElement === element;
}
/**
 * Check whether the ID of
 * the element in 'this'
 * matches the given ID.
 *
 * IDs are case-sensitive.
 *
 * @param {string} id The ID to test against
 * @param {Element} element The element to test with
 * @returns boolean
 */


function matchesId(id, element) {
  return id === element.id;
}
/**
 * Short hand for off()
 * and root(), ie both
 * with no parameters
 *
 * @return void
 */


Delegate.prototype.destroy = function () {
  this.off();
  this.root();
};

var _default = Delegate;
exports.default = _default;
module.exports = exports.default;
}(browser, browser.exports));

var Delegate = /*@__PURE__*/getDefaultExportFromCjs(browser.exports);

var pageTransition = (function () {
  var pageTransitionOverlay = document.querySelector("#page-transition-overlay");
  var animationDuration = 200;
  if (pageTransitionOverlay) {
    pageTransitionOverlay.classList.remove("skip-transition");
    setTimeout(function () {
      pageTransitionOverlay.classList.remove("active");
    }, 0);
    setTimeout(function () {
      // Prevent the theme editor from seeing this
      pageTransitionOverlay.classList.remove("active");
    }, animationDuration);
    var delegate = new Delegate(document.body);
    delegate.on("click", 'a[href]:not([href^="#"]):not(.no-transition):not([href^="mailto:"]):not([href^="tel:"]):not([target="_blank"])', onClickedToLeave);
    window.onpageshow = function (e) {
      if (e.persisted) {
        pageTransitionOverlay.classList.remove("active");
      }
    };
  }
  function onClickedToLeave(event, target) {
    // avoid interupting open-in-new-tab click
    if (event.ctrlKey || event.metaKey) return;
    event.preventDefault();

    // Hint to browser to prerender destination
    var linkHint = document.createElement("link");
    linkHint.setAttribute("rel", "prerender");
    linkHint.setAttribute("href", target.href);
    document.head.appendChild(linkHint);
    setTimeout(function () {
      window.location.href = target.href;
    }, animationDuration);
    pageTransitionOverlay.classList.add("active");
  }
});

/*!
* tabbable 5.3.3
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]:not(slot)', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])', 'details>summary:first-of-type', 'details'];
var candidateSelector = /* #__PURE__ */candidateSelectors.join(',');
var NoElement = typeof Element === 'undefined';
var matches = NoElement ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function (element) {
  return element.getRootNode();
} : function (element) {
  return element.ownerDocument;
};
/**
 * @param {Element} el container to check in
 * @param {boolean} includeContainer add container to check
 * @param {(node: Element) => boolean} filter filter candidates
 * @returns {Element[]}
 */

var getCandidates = function getCandidates(el, includeContainer, filter) {
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));

  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }

  candidates = candidates.filter(filter);
  return candidates;
};
/**
 * @callback GetShadowRoot
 * @param {Element} element to check for shadow root
 * @returns {ShadowRoot|boolean} ShadowRoot if available or boolean indicating if a shadowRoot is attached but not available.
 */

/**
 * @callback ShadowRootFilter
 * @param {Element} shadowHostNode the element which contains shadow content
 * @returns {boolean} true if a shadow root could potentially contain valid candidates.
 */

/**
 * @typedef {Object} CandidatesScope
 * @property {Element} scope contains inner candidates
 * @property {Element[]} candidates
 */

/**
 * @typedef {Object} IterativeOptions
 * @property {GetShadowRoot|boolean} getShadowRoot true if shadow support is enabled; falsy if not;
 *  if a function, implies shadow support is enabled and either returns the shadow root of an element
 *  or a boolean stating if it has an undisclosed shadow root
 * @property {(node: Element) => boolean} filter filter candidates
 * @property {boolean} flatten if true then result will flatten any CandidatesScope into the returned list
 * @property {ShadowRootFilter} shadowRootFilter filter shadow roots;
 */

/**
 * @param {Element[]} elements list of element containers to match candidates from
 * @param {boolean} includeContainer add container list to check
 * @param {IterativeOptions} options
 * @returns {Array.<Element|CandidatesScope>}
 */


var getCandidatesIteratively = function getCandidatesIteratively(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);

  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();

    if (element.tagName === 'SLOT') {
      // add shadow dom slot scope (slot itself cannot be focusable)
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively(content, true, options);

      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scope: element,
          candidates: nestedCandidates
        });
      }
    } else {
      // check candidate element
      var validCandidate = matches.call(element, candidateSelector);

      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      } // iterate over shadow content if possible


      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === 'function' && options.getShadowRoot(element);
      var validShadowRoot = !options.shadowRootFilter || options.shadowRootFilter(element);

      if (shadowRoot && validShadowRoot) {
        // add shadow dom scope IIF a shadow root node was given; otherwise, an undisclosed
        //  shadow exists, so look at light dom children as fallback BUT create a scope for any
        //  child candidates found because they're likely slotted elements (elements that are
        //  children of the web component element (which has the shadow), in the light dom, but
        //  slotted somewhere _inside_ the undisclosed shadow) -- the scope is created below,
        //  _after_ we return from this recursive call
        var _nestedCandidates = getCandidatesIteratively(shadowRoot === true ? element.children : shadowRoot.children, true, options);

        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scope: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        // there's not shadow so just dig into the element's (light dom) children
        //  __without__ giving the element special scope treatment
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }

  return candidates;
};

var getTabindex = function getTabindex(node, isScope) {
  if (node.tabIndex < 0) {
    // in Chrome, <details/>, <audio controls/> and <video controls/> elements get a default
    // `tabIndex` of -1 when the 'tabindex' attribute isn't specified in the DOM,
    // yet they are still part of the regular tab order; in FF, they get a default
    // `tabIndex` of 0; since Chrome still puts those elements in the regular tab
    // order, consider their tab index to be 0.
    // Also browsers do not return `tabIndex` correctly for contentEditable nodes;
    // so if they don't have a tabindex attribute specifically set, assume it's 0.
    //
    // isScope is positive for custom element with shadow root or slot that by default
    // have tabIndex -1, but need to be sorted by document order in order for their
    // content to be inserted in the correct position
    if ((isScope || /^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || node.isContentEditable) && isNaN(parseInt(node.getAttribute('tabindex'), 10))) {
      return 0;
    }
  }

  return node.tabIndex;
};

var sortOrderedTabbables = function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};

var isInput = function isInput(node) {
  return node.tagName === 'INPUT';
};

var isHiddenInput = function isHiddenInput(node) {
  return isInput(node) && node.type === 'hidden';
};

var isDetailsWithSummary = function isDetailsWithSummary(node) {
  var r = node.tagName === 'DETAILS' && Array.prototype.slice.apply(node.children).some(function (child) {
    return child.tagName === 'SUMMARY';
  });
  return r;
};

var getCheckedRadio = function getCheckedRadio(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};

var isTabbableRadio = function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  var radioScope = node.form || getRootNode(node);

  var queryRadios = function queryRadios(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };

  var radioSet;

  if (typeof window !== 'undefined' && typeof window.CSS !== 'undefined' && typeof window.CSS.escape === 'function') {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s', err.message);
      return false;
    }
  }

  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};

var isRadio = function isRadio(node) {
  return isInput(node) && node.type === 'radio';
};

var isNonTabbableRadio = function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
};

var isZeroArea = function isZeroArea(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
      width = _node$getBoundingClie.width,
      height = _node$getBoundingClie.height;

  return width === 0 && height === 0;
};

var isHidden = function isHidden(node, _ref) {
  var displayCheck = _ref.displayCheck,
      getShadowRoot = _ref.getShadowRoot;

  // NOTE: visibility will be `undefined` if node is detached from the document
  //  (see notes about this further down), which means we will consider it visible
  //  (this is legacy behavior from a very long way back)
  // NOTE: we check this regardless of `displayCheck="none"` because this is a
  //  _visibility_ check, not a _display_ check
  if (getComputedStyle(node).visibility === 'hidden') {
    return true;
  }

  var isDirectSummary = matches.call(node, 'details>summary:first-of-type');
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;

  if (matches.call(nodeUnderDetails, 'details:not([open]) *')) {
    return true;
  } // The root node is the shadow root if the node is in a shadow DOM; some document otherwise
  //  (but NOT _the_ document; see second 'If' comment below for more).
  // If rootNode is shadow root, it'll have a host, which is the element to which the shadow
  //  is attached, and the one we need to check if it's in the document or not (because the
  //  shadow, and all nodes it contains, is never considered in the document since shadows
  //  behave like self-contained DOMs; but if the shadow's HOST, which is part of the document,
  //  is hidden, or is not in the document itself but is detached, it will affect the shadow's
  //  visibility, including all the nodes it contains). The host could be any normal node,
  //  or a custom element (i.e. web component). Either way, that's the one that is considered
  //  part of the document, not the shadow root, nor any of its children (i.e. the node being
  //  tested).
  // If rootNode is not a shadow root, it won't have a host, and so rootNode should be the
  //  document (per the docs) and while it's a Document-type object, that document does not
  //  appear to be the same as the node's `ownerDocument` for some reason, so it's safer
  //  to ignore the rootNode at this point, and use `node.ownerDocument`. Otherwise,
  //  using `rootNode.contains(node)` will _always_ be true we'll get false-positives when
  //  node is actually detached.


  var nodeRootHost = getRootNode(node).host;
  var nodeIsAttached = (nodeRootHost === null || nodeRootHost === void 0 ? void 0 : nodeRootHost.ownerDocument.contains(nodeRootHost)) || node.ownerDocument.contains(node);

  if (!displayCheck || displayCheck === 'full') {
    if (typeof getShadowRoot === 'function') {
      // figure out if we should consider the node to be in an undisclosed shadow and use the
      //  'non-zero-area' fallback
      var originalNode = node;

      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);

        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true // check if there's an undisclosed shadow
        ) {
          // node has an undisclosed shadow which means we can only treat it as a black box, so we
          //  fall back to a non-zero-area test
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          // iterate up slot
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          // cross shadow boundary
          node = rootNode.host;
        } else {
          // iterate up normal dom
          node = parentElement;
        }
      }

      node = originalNode;
    } // else, `getShadowRoot` might be true, but all that does is enable shadow DOM support
    //  (i.e. it does not also presume that all nodes might have undisclosed shadows); or
    //  it might be a falsy value, which means shadow DOM support is disabled
    // Since we didn't find it sitting in an undisclosed shadow (or shadows are disabled)
    //  now we can just test to see if it would normally be visible or not, provided it's
    //  attached to the main document.
    // NOTE: We must consider case where node is inside a shadow DOM and given directly to
    //  `isTabbable()` or `isFocusable()` -- regardless of `getShadowRoot` option setting.


    if (nodeIsAttached) {
      // this works wherever the node is: if there's at least one client rect, it's
      //  somehow displayed; it also covers the CSS 'display: contents' case where the
      //  node itself is hidden in place of its contents; and there's no need to search
      //  up the hierarchy either
      return !node.getClientRects().length;
    } // Else, the node isn't attached to the document, which means the `getClientRects()`
    //  API will __always__ return zero rects (this can happen, for example, if React
    //  is used to render nodes onto a detached tree, as confirmed in this thread:
    //  https://github.com/facebook/react/issues/9117#issuecomment-284228870)
    //
    // It also means that even window.getComputedStyle(node).display will return `undefined`
    //  because styles are only computed for nodes that are in the document.
    //
    // NOTE: THIS HAS BEEN THE CASE FOR YEARS. It is not new, nor is it caused by tabbable
    //  somehow. Though it was never stated officially, anyone who has ever used tabbable
    //  APIs on nodes in detached containers has actually implicitly used tabbable in what
    //  was later (as of v5.2.0 on Apr 9, 2021) called `displayCheck="none"` mode -- essentially
    //  considering __everything__ to be visible because of the innability to determine styles.

  } else if (displayCheck === 'non-zero-area') {
    // NOTE: Even though this tests that the node's client rect is non-zero to determine
    //  whether it's displayed, and that a detached node will __always__ have a zero-area
    //  client rect, we don't special-case for whether the node is attached or not. In
    //  this mode, we do want to consider nodes that have a zero area to be hidden at all
    //  times, and that includes attached or not.
    return isZeroArea(node);
  } // visible, as far as we can tell, or per current `displayCheck` mode


  return false;
}; // form fields (nested) inside a disabled fieldset are not focusable/tabbable
//  unless they are in the _first_ <legend> element of the top-most disabled
//  fieldset


var isDisabledFromFieldset = function isDisabledFromFieldset(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement; // check if `node` is contained in a disabled <fieldset>

    while (parentNode) {
      if (parentNode.tagName === 'FIELDSET' && parentNode.disabled) {
        // look for the first <legend> among the children of the disabled <fieldset>
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i); // when the first <legend> (in document order) is found

          if (child.tagName === 'LEGEND') {
            // if its parent <fieldset> is not nested in another disabled <fieldset>,
            // return whether `node` is a descendant of its first <legend>
            return matches.call(parentNode, 'fieldset[disabled] *') ? true : !child.contains(node);
          }
        } // the disabled <fieldset> containing `node` has no <legend>


        return true;
      }

      parentNode = parentNode.parentElement;
    }
  } // else, node's tabbable/focusable state should not be affected by a fieldset's
  //  enabled/disabled state


  return false;
};

var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable(options, node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }

  return true;
};

var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable(options, node) {
  if (isNonTabbableRadio(node) || getTabindex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }

  return true;
};

var isValidShadowRootTabbable = function isValidShadowRootTabbable(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute('tabindex'), 10);

  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  } // If a custom element has an explicit negative tabindex,
  // browsers will not allow tab targeting said element's children.


  return false;
};
/**
 * @param {Array.<Element|CandidatesScope>} candidates
 * @returns Element[]
 */


var sortByOrder = function sortByOrder(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function (item, i) {
    var isScope = !!item.scope;
    var element = isScope ? item.scope : item;
    var candidateTabindex = getTabindex(element, isScope);
    var elements = isScope ? sortByOrder(item.candidates) : element;

    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item: item,
        isScope: isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function (acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};

var tabbable = function tabbable(el, options) {
  options = options || {};
  var candidates;

  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }

  return sortByOrder(candidates);
};

var focusable = function focusable(el, options) {
  options = options || {};
  var candidates;

  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([el], options.includeContainer, {
      filter: isNodeMatchingSelectorFocusable.bind(null, options),
      flatten: true,
      getShadowRoot: options.getShadowRoot
    });
  } else {
    candidates = getCandidates(el, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
  }

  return candidates;
};

var isTabbable = function isTabbable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, candidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorTabbable(options, node);
};

var focusableCandidateSelector = /* #__PURE__ */candidateSelectors.concat('iframe').join(',');

var isFocusable = function isFocusable(node, options) {
  options = options || {};

  if (!node) {
    throw new Error('No node provided');
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(options, node);
};

/*!
* focus-trap 6.9.4
* @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
*/

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var activeFocusTraps = function () {
  var trapQueue = [];
  return {
    activateTrap: function activateTrap(trap) {
      if (trapQueue.length > 0) {
        var activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        // move this existing trap to the front of the queue
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function deactivateTrap(trap) {
      var trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    }
  };
}();

var isSelectableInput = function isSelectableInput(node) {
  return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
};

var isEscapeEvent = function isEscapeEvent(e) {
  return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
};

var isTabEvent = function isTabEvent(e) {
  return e.key === 'Tab' || e.keyCode === 9;
};

var delay = function delay(fn) {
  return setTimeout(fn, 0);
}; // Array.find/findIndex() are not supported on IE; this replicates enough
//  of Array.findIndex() for our needs


var findIndex = function findIndex(arr, fn) {
  var idx = -1;
  arr.every(function (value, i) {
    if (fn(value)) {
      idx = i;
      return false; // break
    }

    return true; // next
  });
  return idx;
};
/**
 * Get an option's value when it could be a plain value, or a handler that provides
 *  the value.
 * @param {*} value Option's value to check.
 * @param {...*} [params] Any parameters to pass to the handler, if `value` is a function.
 * @returns {*} The `value`, or the handler's returned value.
 */


var valueOrHandler = function valueOrHandler(value) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return typeof value === 'function' ? value.apply(void 0, params) : value;
};

var getActualTarget = function getActualTarget(event) {
  // NOTE: If the trap is _inside_ a shadow DOM, event.target will always be the
  //  shadow host. However, event.target.composedPath() will be an array of
  //  nodes "clicked" from inner-most (the actual element inside the shadow) to
  //  outer-most (the host HTML document). If we have access to composedPath(),
  //  then use its first element; otherwise, fall back to event.target (and
  //  this only works for an _open_ shadow DOM; otherwise,
  //  composedPath()[0] === event.target always).
  return event.target.shadowRoot && typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target;
};

var createFocusTrap = function createFocusTrap(elements, userOptions) {
  // SSR: a live trap shouldn't be created in this type of environment so this
  //  should be safe code to execute if the `document` option isn't specified
  var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;

  var config = _objectSpread2({
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    delayInitialFocus: true
  }, userOptions);

  var state = {
    // containers given to createFocusTrap()
    // @type {Array<HTMLElement>}
    containers: [],
    // list of objects identifying tabbable nodes in `containers` in the trap
    // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
    //  is active, but the trap should never get to a state where there isn't at least one group
    //  with at least one tabbable node in it (that would lead to an error condition that would
    //  result in an error being thrown)
    // @type {Array<{
    //   container: HTMLElement,
    //   tabbableNodes: Array<HTMLElement>, // empty if none
    //   focusableNodes: Array<HTMLElement>, // empty if none
    //   firstTabbableNode: HTMLElement|null,
    //   lastTabbableNode: HTMLElement|null,
    //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
    // }>}
    containerGroups: [],
    // same order/length as `containers` list
    // references to objects in `containerGroups`, but only those that actually have
    //  tabbable nodes in them
    // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
    //  the same length
    tabbableGroups: [],
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
    // timer ID for when delayInitialFocus is true and initial focus in this trap
    //  has been delayed during activation
    delayInitialFocusTimer: undefined
  };
  var trap; // eslint-disable-line prefer-const -- some private functions reference it, and its methods reference private functions, so we must declare here and define later

  /**
   * Gets a configuration option value.
   * @param {Object|undefined} configOverrideOptions If true, and option is defined in this set,
   *  value will be taken from this object. Otherwise, value will be taken from base configuration.
   * @param {string} optionName Name of the option whose value is sought.
   * @param {string|undefined} [configOptionName] Name of option to use __instead of__ `optionName`
   *  IIF `configOverrideOptions` is not defined. Otherwise, `optionName` is used.
   */

  var getOption = function getOption(configOverrideOptions, optionName, configOptionName) {
    return configOverrideOptions && configOverrideOptions[optionName] !== undefined ? configOverrideOptions[optionName] : config[configOptionName || optionName];
  };
  /**
   * Finds the index of the container that contains the element.
   * @param {HTMLElement} element
   * @returns {number} Index of the container in either `state.containers` or
   *  `state.containerGroups` (the order/length of these lists are the same); -1
   *  if the element isn't found.
   */


  var findContainerIndex = function findContainerIndex(element) {
    // NOTE: search `containerGroups` because it's possible a group contains no tabbable
    //  nodes, but still contains focusable nodes (e.g. if they all have `tabindex=-1`)
    //  and we still need to find the element in there
    return state.containerGroups.findIndex(function (_ref) {
      var container = _ref.container,
          tabbableNodes = _ref.tabbableNodes;
      return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
      //  web components if the `tabbableOptions.getShadowRoot` option was used for
      //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
      //  look inside web components even if open)
      tabbableNodes.find(function (node) {
        return node === element;
      });
    });
  };
  /**
   * Gets the node for the given option, which is expected to be an option that
   *  can be either a DOM node, a string that is a selector to get a node, `false`
   *  (if a node is explicitly NOT given), or a function that returns any of these
   *  values.
   * @param {string} optionName
   * @returns {undefined | false | HTMLElement | SVGElement} Returns
   *  `undefined` if the option is not specified; `false` if the option
   *  resolved to `false` (node explicitly not given); otherwise, the resolved
   *  DOM node.
   * @throws {Error} If the option is set, not `false`, and is not, or does not
   *  resolve to a node.
   */


  var getNodeForOption = function getNodeForOption(optionName) {
    var optionValue = config[optionName];

    if (typeof optionValue === 'function') {
      for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        params[_key2 - 1] = arguments[_key2];
      }

      optionValue = optionValue.apply(void 0, params);
    }

    if (optionValue === true) {
      optionValue = undefined; // use default value
    }

    if (!optionValue) {
      if (optionValue === undefined || optionValue === false) {
        return optionValue;
      } // else, empty string (invalid), null (invalid), 0 (invalid)


      throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
    }

    var node = optionValue; // could be HTMLElement, SVGElement, or non-empty string at this point

    if (typeof optionValue === 'string') {
      node = doc.querySelector(optionValue); // resolve to node, or null if fails

      if (!node) {
        throw new Error("`".concat(optionName, "` as selector refers to no known node"));
      }
    }

    return node;
  };

  var getInitialFocusNode = function getInitialFocusNode() {
    var node = getNodeForOption('initialFocus'); // false explicitly indicates we want no initialFocus at all

    if (node === false) {
      return false;
    }

    if (node === undefined) {
      // option not specified: use fallback options
      if (findContainerIndex(doc.activeElement) >= 0) {
        node = doc.activeElement;
      } else {
        var firstTabbableGroup = state.tabbableGroups[0];
        var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode; // NOTE: `fallbackFocus` option function cannot return `false` (not supported)

        node = firstTabbableNode || getNodeForOption('fallbackFocus');
      }
    }

    if (!node) {
      throw new Error('Your focus-trap needs to have at least one focusable element');
    }

    return node;
  };

  var updateTabbableNodes = function updateTabbableNodes() {
    state.containerGroups = state.containers.map(function (container) {
      var tabbableNodes = tabbable(container, config.tabbableOptions); // NOTE: if we have tabbable nodes, we must have focusable nodes; focusable nodes
      //  are a superset of tabbable nodes

      var focusableNodes = focusable(container, config.tabbableOptions);
      return {
        container: container,
        tabbableNodes: tabbableNodes,
        focusableNodes: focusableNodes,
        firstTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[0] : null,
        lastTabbableNode: tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : null,

        /**
         * Finds the __tabbable__ node that follows the given node in the specified direction,
         *  in this container, if any.
         * @param {HTMLElement} node
         * @param {boolean} [forward] True if going in forward tab order; false if going
         *  in reverse.
         * @returns {HTMLElement|undefined} The next tabbable node, if any.
         */
        nextTabbableNode: function nextTabbableNode(node) {
          var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          // NOTE: If tabindex is positive (in order to manipulate the tab order separate
          //  from the DOM order), this __will not work__ because the list of focusableNodes,
          //  while it contains tabbable nodes, does not sort its nodes in any order other
          //  than DOM order, because it can't: Where would you place focusable (but not
          //  tabbable) nodes in that order? They have no order, because they aren't tabbale...
          // Support for positive tabindex is already broken and hard to manage (possibly
          //  not supportable, TBD), so this isn't going to make things worse than they
          //  already are, and at least makes things better for the majority of cases where
          //  tabindex is either 0/unset or negative.
          // FYI, positive tabindex issue: https://github.com/focus-trap/focus-trap/issues/375
          var nodeIdx = focusableNodes.findIndex(function (n) {
            return n === node;
          });

          if (nodeIdx < 0) {
            return undefined;
          }

          if (forward) {
            return focusableNodes.slice(nodeIdx + 1).find(function (n) {
              return isTabbable(n, config.tabbableOptions);
            });
          }

          return focusableNodes.slice(0, nodeIdx).reverse().find(function (n) {
            return isTabbable(n, config.tabbableOptions);
          });
        }
      };
    });
    state.tabbableGroups = state.containerGroups.filter(function (group) {
      return group.tabbableNodes.length > 0;
    }); // throw if no groups have tabbable nodes and we don't have a fallback focus node either

    if (state.tabbableGroups.length <= 0 && !getNodeForOption('fallbackFocus') // returning false not supported for this option
    ) {
      throw new Error('Your focus-trap must have at least one container with at least one tabbable node in it at all times');
    }
  };

  var tryFocus = function tryFocus(node) {
    if (node === false) {
      return;
    }

    if (node === doc.activeElement) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode());
      return;
    }

    node.focus({
      preventScroll: !!config.preventScroll
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  };

  var getReturnFocusNode = function getReturnFocusNode(previousActiveElement) {
    var node = getNodeForOption('setReturnFocus', previousActiveElement);
    return node ? node : node === false ? false : previousActiveElement;
  }; // This needs to be done on mousedown and touchstart instead of click
  // so that it precedes the focus event.


  var checkPointerDown = function checkPointerDown(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      // allow the click since it ocurred inside the trap
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      // immediately deactivate the trap
      trap.deactivate({
        // if, on deactivation, we should return focus to the node originally-focused
        //  when the trap was activated (or the configured `setReturnFocus` node),
        //  then assume it's also OK to return focus to the outside node that was
        //  just clicked, causing deactivation, as long as that node is focusable;
        //  if it isn't focusable, then return focus to the original node focused
        //  on activation (or the configured `setReturnFocus` node)
        // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
        //  which will result in the outside click setting focus to the node
        //  that was clicked, whether it's focusable or not; by setting
        //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
        //  on activation (or the configured `setReturnFocus` node)
        returnFocus: config.returnFocusOnDeactivate && !isFocusable(target, config.tabbableOptions)
      });
      return;
    } // This is needed for mobile devices.
    // (If we'll only let `click` events through,
    // then on mobile they will be blocked anyways if `touchstart` is blocked.)


    if (valueOrHandler(config.allowOutsideClick, e)) {
      // allow the click outside the trap to take place
      return;
    } // otherwise, prevent the click


    e.preventDefault();
  }; // In case focus escapes the trap for some strange reason, pull it back in.


  var checkFocusIn = function checkFocusIn(e) {
    var target = getActualTarget(e);
    var targetContained = findContainerIndex(target) >= 0; // In Firefox when you Tab out of an iframe the Document is briefly focused.

    if (targetContained || target instanceof Document) {
      if (targetContained) {
        state.mostRecentlyFocusedNode = target;
      }
    } else {
      // escaped! pull it back in to where it just left
      e.stopImmediatePropagation();
      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
    }
  }; // Hijack Tab events on the first and last focusable nodes of the trap,
  // in order to prevent focus from escaping. If it escapes for even a
  // moment it can end up scrolling the page and causing confusion so we
  // kind of need to capture the action at the keydown phase.


  var checkTab = function checkTab(e) {
    var target = getActualTarget(e);
    updateTabbableNodes();
    var destinationNode = null;

    if (state.tabbableGroups.length > 0) {
      // make sure the target is actually contained in a group
      // NOTE: the target may also be the container itself if it's focusable
      //  with tabIndex='-1' and was given initial focus
      var containerIndex = findContainerIndex(target);
      var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : undefined;

      if (containerIndex < 0) {
        // target not found in any group: quite possible focus has escaped the trap,
        //  so bring it back in to...
        if (e.shiftKey) {
          // ...the last node in the last group
          destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
        } else {
          // ...the first node in the first group
          destinationNode = state.tabbableGroups[0].firstTabbableNode;
        }
      } else if (e.shiftKey) {
        // REVERSE
        // is the target the first tabbable node in a group?
        var startOfGroupIndex = findIndex(state.tabbableGroups, function (_ref2) {
          var firstTabbableNode = _ref2.firstTabbableNode;
          return target === firstTabbableNode;
        });

        if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
          // an exception case where the target is either the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle shift+tab as if focus were on the container's
          //  first tabbable node, and go to the last tabbable node of the LAST group
          startOfGroupIndex = containerIndex;
        }

        if (startOfGroupIndex >= 0) {
          // YES: then shift+tab should go to the last tabbable node in the
          //  previous group (and wrap around to the last tabbable node of
          //  the LAST group if it's the first tabbable node of the FIRST group)
          var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
          var destinationGroup = state.tabbableGroups[destinationGroupIndex];
          destinationNode = destinationGroup.lastTabbableNode;
        }
      } else {
        // FORWARD
        // is the target the last tabbable node in a group?
        var lastOfGroupIndex = findIndex(state.tabbableGroups, function (_ref3) {
          var lastTabbableNode = _ref3.lastTabbableNode;
          return target === lastTabbableNode;
        });

        if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
          // an exception case where the target is the container itself, or
          //  a non-tabbable node that was given focus (i.e. tabindex is negative
          //  and user clicked on it or node was programmatically given focus)
          //  and is not followed by any other tabbable node, in which
          //  case, we should handle tab as if focus were on the container's
          //  last tabbable node, and go to the first tabbable node of the FIRST group
          lastOfGroupIndex = containerIndex;
        }

        if (lastOfGroupIndex >= 0) {
          // YES: then tab should go to the first tabbable node in the next
          //  group (and wrap around to the first tabbable node of the FIRST
          //  group if it's the last tabbable node of the LAST group)
          var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;

          var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
          destinationNode = _destinationGroup.firstTabbableNode;
        }
      }
    } else {
      // NOTE: the fallbackFocus option does not support returning false to opt-out
      destinationNode = getNodeForOption('fallbackFocus');
    }

    if (destinationNode) {
      e.preventDefault();
      tryFocus(destinationNode);
    } // else, let the browser take care of [shift+]tab and move the focus

  };

  var checkKey = function checkKey(e) {
    if (isEscapeEvent(e) && valueOrHandler(config.escapeDeactivates, e) !== false) {
      e.preventDefault();
      trap.deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  };

  var checkClick = function checkClick(e) {
    var target = getActualTarget(e);

    if (findContainerIndex(target) >= 0) {
      return;
    }

    if (valueOrHandler(config.clickOutsideDeactivates, e)) {
      return;
    }

    if (valueOrHandler(config.allowOutsideClick, e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }; //
  // EVENT LISTENERS
  //


  var addListeners = function addListeners() {
    if (!state.active) {
      return;
    } // There can be only one listening focus trap at a time


    activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
    // that caused the focus trap activation.

    state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function () {
      tryFocus(getInitialFocusNode());
    }) : tryFocus(getInitialFocusNode());
    doc.addEventListener('focusin', checkFocusIn, true);
    doc.addEventListener('mousedown', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('touchstart', checkPointerDown, {
      capture: true,
      passive: false
    });
    doc.addEventListener('click', checkClick, {
      capture: true,
      passive: false
    });
    doc.addEventListener('keydown', checkKey, {
      capture: true,
      passive: false
    });
    return trap;
  };

  var removeListeners = function removeListeners() {
    if (!state.active) {
      return;
    }

    doc.removeEventListener('focusin', checkFocusIn, true);
    doc.removeEventListener('mousedown', checkPointerDown, true);
    doc.removeEventListener('touchstart', checkPointerDown, true);
    doc.removeEventListener('click', checkClick, true);
    doc.removeEventListener('keydown', checkKey, true);
    return trap;
  }; //
  // TRAP DEFINITION
  //


  trap = {
    get active() {
      return state.active;
    },

    get paused() {
      return state.paused;
    },

    activate: function activate(activateOptions) {
      if (state.active) {
        return this;
      }

      var onActivate = getOption(activateOptions, 'onActivate');
      var onPostActivate = getOption(activateOptions, 'onPostActivate');
      var checkCanFocusTrap = getOption(activateOptions, 'checkCanFocusTrap');

      if (!checkCanFocusTrap) {
        updateTabbableNodes();
      }

      state.active = true;
      state.paused = false;
      state.nodeFocusedBeforeActivation = doc.activeElement;

      if (onActivate) {
        onActivate();
      }

      var finishActivation = function finishActivation() {
        if (checkCanFocusTrap) {
          updateTabbableNodes();
        }

        addListeners();

        if (onPostActivate) {
          onPostActivate();
        }
      };

      if (checkCanFocusTrap) {
        checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
        return this;
      }

      finishActivation();
      return this;
    },
    deactivate: function deactivate(deactivateOptions) {
      if (!state.active) {
        return this;
      }

      var options = _objectSpread2({
        onDeactivate: config.onDeactivate,
        onPostDeactivate: config.onPostDeactivate,
        checkCanReturnFocus: config.checkCanReturnFocus
      }, deactivateOptions);

      clearTimeout(state.delayInitialFocusTimer); // noop if undefined

      state.delayInitialFocusTimer = undefined;
      removeListeners();
      state.active = false;
      state.paused = false;
      activeFocusTraps.deactivateTrap(trap);
      var onDeactivate = getOption(options, 'onDeactivate');
      var onPostDeactivate = getOption(options, 'onPostDeactivate');
      var checkCanReturnFocus = getOption(options, 'checkCanReturnFocus');
      var returnFocus = getOption(options, 'returnFocus', 'returnFocusOnDeactivate');

      if (onDeactivate) {
        onDeactivate();
      }

      var finishDeactivation = function finishDeactivation() {
        delay(function () {
          if (returnFocus) {
            tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
          }

          if (onPostDeactivate) {
            onPostDeactivate();
          }
        });
      };

      if (returnFocus && checkCanReturnFocus) {
        checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
        return this;
      }

      finishDeactivation();
      return this;
    },
    pause: function pause() {
      if (state.paused || !state.active) {
        return this;
      }

      state.paused = true;
      removeListeners();
      return this;
    },
    unpause: function unpause() {
      if (!state.paused || !state.active) {
        return this;
      }

      state.paused = false;
      updateTabbableNodes();
      addListeners();
      return this;
    },
    updateContainerElements: function updateContainerElements(containerElements) {
      var elementsAsArray = [].concat(containerElements).filter(Boolean);
      state.containers = elementsAsArray.map(function (element) {
        return typeof element === 'string' ? doc.querySelector(element) : element;
      });

      if (state.active) {
        updateTabbableNodes();
      }

      return this;
    }
  }; // initialize container elements

  trap.updateContainerElements(elements);
  return trap;
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// Older browsers don't support event options, feature detect it.

// Adopted and modified solution from Bohdan Didukh (2017)
// https://stackoverflow.com/questions/41594997/ios-10-safari-prevent-scrolling-behind-a-fixed-overlay-and-maintain-scroll-posi

var hasPassiveEvents = false;
if (typeof window !== 'undefined') {
  var passiveTestOptions = {
    get passive() {
      hasPassiveEvents = true;
      return undefined;
    }
  };
  window.addEventListener('testPassive', null, passiveTestOptions);
  window.removeEventListener('testPassive', null, passiveTestOptions);
}

var isIosDevice = typeof window !== 'undefined' && window.navigator && window.navigator.platform && (/iP(ad|hone|od)/.test(window.navigator.platform) || window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);


var locks = [];
var documentListenerAdded = false;
var initialClientY = -1;
var previousBodyOverflowSetting = void 0;
var previousBodyPaddingRight = void 0;

// returns true if `el` should be allowed to receive touchmove events.
var allowTouchMove = function allowTouchMove(el) {
  return locks.some(function (lock) {
    if (lock.options.allowTouchMove && lock.options.allowTouchMove(el)) {
      return true;
    }

    return false;
  });
};

var preventDefault = function preventDefault(rawEvent) {
  var e = rawEvent || window.event;

  // For the case whereby consumers adds a touchmove event listener to document.
  // Recall that we do document.addEventListener('touchmove', preventDefault, { passive: false })
  // in disableBodyScroll - so if we provide this opportunity to allowTouchMove, then
  // the touchmove event on document will break.
  if (allowTouchMove(e.target)) {
    return true;
  }

  // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom).
  if (e.touches.length > 1) return true;

  if (e.preventDefault) e.preventDefault();

  return false;
};

var setOverflowHidden = function setOverflowHidden(options) {
  // If previousBodyPaddingRight is already set, don't set it again.
  if (previousBodyPaddingRight === undefined) {
    var _reserveScrollBarGap = !!options && options.reserveScrollBarGap === true;
    var scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (_reserveScrollBarGap && scrollBarGap > 0) {
      previousBodyPaddingRight = document.body.style.paddingRight;
      document.body.style.paddingRight = scrollBarGap + 'px';
    }
  }

  // If previousBodyOverflowSetting is already set, don't set it again.
  if (previousBodyOverflowSetting === undefined) {
    previousBodyOverflowSetting = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
};

var restoreOverflowSetting = function restoreOverflowSetting() {
  if (previousBodyPaddingRight !== undefined) {
    document.body.style.paddingRight = previousBodyPaddingRight;

    // Restore previousBodyPaddingRight to undefined so setOverflowHidden knows it
    // can be set again.
    previousBodyPaddingRight = undefined;
  }

  if (previousBodyOverflowSetting !== undefined) {
    document.body.style.overflow = previousBodyOverflowSetting;

    // Restore previousBodyOverflowSetting to undefined
    // so setOverflowHidden knows it can be set again.
    previousBodyOverflowSetting = undefined;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
var isTargetElementTotallyScrolled = function isTargetElementTotallyScrolled(targetElement) {
  return targetElement ? targetElement.scrollHeight - targetElement.scrollTop <= targetElement.clientHeight : false;
};

var handleScroll = function handleScroll(event, targetElement) {
  var clientY = event.targetTouches[0].clientY - initialClientY;

  if (allowTouchMove(event.target)) {
    return false;
  }

  if (targetElement && targetElement.scrollTop === 0 && clientY > 0) {
    // element is at the top of its scroll.
    return preventDefault(event);
  }

  if (isTargetElementTotallyScrolled(targetElement) && clientY < 0) {
    // element is at the bottom of its scroll.
    return preventDefault(event);
  }

  event.stopPropagation();
  return true;
};

var disableBodyScroll = function disableBodyScroll(targetElement, options) {
  // targetElement must be provided
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.');
    return;
  }

  // disableBodyScroll must not have been called on this targetElement before
  if (locks.some(function (lock) {
    return lock.targetElement === targetElement;
  })) {
    return;
  }

  var lock = {
    targetElement: targetElement,
    options: options || {}
  };

  locks = [].concat(_toConsumableArray(locks), [lock]);

  if (isIosDevice) {
    targetElement.ontouchstart = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        initialClientY = event.targetTouches[0].clientY;
      }
    };
    targetElement.ontouchmove = function (event) {
      if (event.targetTouches.length === 1) {
        // detect single touch.
        handleScroll(event, targetElement);
      }
    };

    if (!documentListenerAdded) {
      document.addEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = true;
    }
  } else {
    setOverflowHidden(options);
  }
};

var enableBodyScroll = function enableBodyScroll(targetElement) {
  if (!targetElement) {
    // eslint-disable-next-line no-console
    console.error('enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.');
    return;
  }

  locks = locks.filter(function (lock) {
    return lock.targetElement !== targetElement;
  });

  if (isIosDevice) {
    targetElement.ontouchstart = null;
    targetElement.ontouchmove = null;

    if (documentListenerAdded && locks.length === 0) {
      document.removeEventListener('touchmove', preventDefault, hasPassiveEvents ? { passive: false } : undefined);
      documentListenerAdded = false;
    }
  } else if (!locks.length) {
    restoreOverflowSetting();
  }
};

var n$1=function(n){if("object"!=typeof(t=n)||Array.isArray(t))throw "state should be an object";var t;},t$1=function(n,t,e,c){return (r=n,r.reduce(function(n,t,e){return n.indexOf(t)>-1?n:n.concat(t)},[])).reduce(function(n,e){return n.concat(t[e]||[])},[]).map(function(n){return n(e,c)});var r;},e$1=a(),c=e$1.on,r$1=e$1.emit,o$1=e$1.hydrate;function a(e){void 0===e&&(e={});var c={};return {getState:function(){return Object.assign({},e)},hydrate:function(r){return n$1(r),Object.assign(e,r),function(){var n=["*"].concat(Object.keys(r));t$1(n,c,e);}},on:function(n,t){return (n=[].concat(n)).map(function(n){return c[n]=(c[n]||[]).concat(t)}),function(){return n.map(function(n){return c[n].splice(c[n].indexOf(t),1)})}},emit:function(r,o,u){var a=("*"===r?[]:["*"]).concat(r);(o="function"==typeof o?o(e):o)&&(n$1(o),Object.assign(e,o),a=a.concat(Object.keys(o))),t$1(a,c,e,u);}}}

function wrapIframes () {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  elements.forEach(function (el) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("rte__iframe");
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    el.src = el.src;
  });
}

function wrapTables () {
  var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  elements.forEach(function (el) {
    var wrapper = document.createElement("div");
    wrapper.classList.add("rte__table-wrapper");
    wrapper.tabIndex = 0;
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  });
}

function localStorageAvailable() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    if (localStorage.getItem(test) !== test) {
      return false;
    }
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
var PREFIX = "fluco_";
function getStorage(key) {
  if (!localStorageAvailable()) return null;
  return JSON.parse(localStorage.getItem(PREFIX + key));
}
function removeStorage(key) {
  if (!localStorageAvailable()) return null;
  localStorage.removeItem(PREFIX + key);
  return true;
}
function setStorage(key, val) {
  // TODO: why does getStorage do a JSON.parse but setStorage doesn't do a JSON.stringify?
  if (!localStorageAvailable()) return null;
  localStorage.setItem(PREFIX + key, val);
  return true;
}

var dispatchCustomEvent = function dispatchCustomEvent(eventName) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var detail = {
    detail: data
  };
  var event = new CustomEvent(eventName, data ? detail : null);
  document.dispatchEvent(event);
};

var routes = window.theme.routes.cart || {};
var paths = {
  base: "".concat(routes.base || "/cart", ".js"),
  add: "".concat(routes.add || "/cart/add", ".js"),
  change: "".concat(routes.change || "/cart/change", ".js"),
  clear: "".concat(routes.clear || "/cart/clear", ".js"),
  update: "".concat(routes.update || "/cart/update", ".js")
};
var strings$9 = window.theme.strings.cart;

// Add a `sorted` key that orders line items
// in the order the customer added them if possible
function sortCart(cart) {
  var order = getStorage("cart_order") || [];
  if (order.length) {
    cart.sorted = _toConsumableArray$1(cart.items).sort(function (a, b) {
      return order.indexOf(a.variant_id) - order.indexOf(b.variant_id);
    });
    return cart;
  }
  cart.sorted = cart.items;
  return cart;
}
function updateItem(key, quantity) {
  // accepts either key or variant_id
  return get().then(function (_ref) {
    var items = _ref.items;
    items.forEach(function (item, index) {
      if (item.key === key || item.id === parseInt(key, 10)) {
        // need to pass item if it's being removed
        return changeItem(index + 1, key, quantity, quantity === 0 && item);
      }
    });
  });
}
function changeItem(line, itemKey, quantity, removedItem) {
  return fetch(paths.change, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      line: line,
      quantity: quantity
    })
  }).then(function (res) {
    if (res.status == "422") {
      var error = {
        code: 422,
        message: strings$9.quantityError
      };
      handleError(error, "changeItem", itemKey);
    } else {
      return res.json();
    }
  }).then(function (cart) {
    var item = cart.items.find(function (_ref2) {
      var key = _ref2.key;
      return key === itemKey;
    }) || cart.items.find(function (_ref3) {
      var variant_id = _ref3.variant_id;
      return variant_id === parseInt(itemKey, 10);
    });
    r$1("cart:updated", {
      cart: cart
    });
    r$1("quick-cart:updated");

    // Need to handle removed item
    if (removedItem) {
      item = removedItem;
      item.quantity = 0; // Provide quantity for updating modal variants
    }

    // Update modal variants
    if (item && !item.product_has_only_default_variant) {
      r$1("theme-internal:update-product-item-modal-counts", {
        variantId: item.variant_id,
        variantQuantity: item.quantity
      });
    }

    // Update product items
    updateProductItemCounts(item, cart.items);

    // Update product page quantity selectors
    updateQuantitySelectorCounts(item, cart.items);
    return sortCart(cart);
  });
}
function addItemById(varId, quantity) {
  r$1("cart:updating");
  var data = {
    items: [{
      id: varId,
      quantity: quantity
    }]
  };
  return fetch(paths.add, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(function (r) {
    return r.json();
  }).then(function (res) {
    if (res.status == "422") {
      var error = {
        code: 422,
        message: res.description
      };
      handleError(error, "addItemById", varId);
    }
    return get().then(function (cart) {
      var item = cart.items.find(function (_ref4) {
        var id = _ref4.id;
        return id === parseInt(varId, 10);
      });
      r$1("quick-cart:updated");
      r$1("cart:updated", {
        cart: cart
      });

      // Update modal variants
      if (item && !item.product_has_only_default_variant) {
        r$1("theme-internal:update-product-item-modal-counts", {
          variantId: item.variant_id,
          variantQuantity: item.quantity
        });
      }

      // Update product items
      updateProductItemCounts(item, cart.items);

      // Update product page quantity selectors
      updateQuantitySelectorCounts(item, cart.items);
      return {
        res: res,
        cart: cart
      };
    });
  });
}
function updateProductItemCounts(item, items) {
  if (item) {
    var productQuantity = items.filter(function (cartItem) {
      return cartItem.product_id === item.product_id;
    }).map(function (cartItem) {
      return cartItem.quantity;
    }).reduce(function (total, itemQuantity) {
      return total + itemQuantity;
    }, 0);
    r$1("theme-internal:update-product-item-counts", {
      id: item.product_id,
      quantity: productQuantity
    });
  }
}
function updateQuantitySelectorCounts(item, items, id) {
  if (item || id) {
    if (item) {
      id = item.variant_id;
    }
    var variantQuantity = items.filter(function (cartItem) {
      return cartItem.variant_id === id;
    }).map(function (cartItem) {
      return cartItem.quantity;
    }).reduce(function (total, itemQuantity) {
      return total + itemQuantity;
    }, 0);
    r$1("theme-internal:update-quantity-selector-counts", {
      id: id,
      quantity: variantQuantity
    });
  }
}
function get() {
  return fetch(paths.base, {
    method: "GET",
    credentials: "include"
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    var sortedData = sortCart(data);
    return sortedData;
  });
}
function addItem(form) {
  r$1("cart:updating");
  return fetch(paths.add, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: serialize(form)
  }).then(function (r) {
    return r.json();
  }).then(function (res) {
    if (res.status == "422") {
      var error = {
        code: 422,
        message: res.description
      };
      handleError(error, "addItem", null);
    }
    return get().then(function (cart) {
      var order = getStorage("cart_order") || [];
      var newOrder = [res.variant_id].concat(_toConsumableArray$1(order.filter(function (i) {
        return i !== res.variant_id;
      })));
      setStorage("cart_order", JSON.stringify(newOrder));
      r$1("cart:updated", {
        cart: sortCart(cart)
      });
      r$1(["quick-cart:updated", "quick-view:close", "quick-add:close"]);
      dispatchCustomEvent("cart:updated", {
        cart: sortCart(cart)
      });

      // Update product items
      updateProductItemCounts(res, cart.items);

      // Update product page quantity selectors
      updateQuantitySelectorCounts(res, cart.items);
      return {
        item: res,
        cart: sortCart(cart)
      };
    });
  });
}
function handleError(error, source, itemKeyOrId) {
  dispatchCustomEvent("cart:error", {
    errorMessage: error.message
  });
  if (source === "changeItem") {
    r$1("quick-cart:error", null, {
      key: itemKeyOrId,
      errorMessage: strings$9.quantityError
    });
    r$1("cart:error", null, {
      key: itemKeyOrId,
      errorMessage: strings$9.quantityError
    });
  }
  r$1("quick-add:error", null, {
    id: itemKeyOrId,
    errorMessage: strings$9.quantityError
  });
  throw error;
}

// !
//  Serialize all form data into a SearchParams string
//  (c) 2020 Chris Ferdinandi, MIT License, https://gomakethings.com
//  @param  {Node}   form The form to serialize
//  @return {String}      The serialized form data
//
function serialize(form) {
  var arr = [];
  Array.prototype.slice.call(form.elements).forEach(function (field) {
    if (!field.name || field.disabled || ["file", "reset", "submit", "button"].indexOf(field.type) > -1) {
      return;
    }
    if (field.type === "select-multiple") {
      Array.prototype.slice.call(field.options).forEach(function (option) {
        if (!option.selected) return;
        arr.push("".concat(encodeURIComponent(field.name), "=").concat(encodeURIComponent(option.value)));
      });
      return;
    }
    if (["checkbox", "radio"].indexOf(field.type) > -1 && !field.checked) {
      return;
    }
    arr.push("".concat(encodeURIComponent(field.name), "=").concat(encodeURIComponent(field.value)));
  });
  return arr.join("&");
}
var cart = {
  addItem: addItem,
  get: get,
  updateItem: updateItem,
  addItemById: addItemById,
  updateQuantitySelectorCounts: updateQuantitySelectorCounts
};

/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 * Taken from https://github.com/Shopify/theme-scripts/blob/master/packages/theme-currency/currency.js
 */

var moneyFormat = window.theme.moneyFormat || "${{amount}}";

/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */
function formatMoney(cents, format) {
  if (typeof cents === "string") {
    cents = cents.replace(".", "");
  }
  var value = "";
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || moneyFormat;
  function formatWithDelimiters(number) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var thousands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ",";
    var decimal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ".";
    if (isNaN(number) || number == null) {
      return 0;
    }
    number = (number / 100.0).toFixed(precision);
    var parts = number.split(".");
    var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1".concat(thousands));
    var centsAmount = parts[1] ? decimal + parts[1] : "";
    return dollarsAmount + centsAmount;
  }
  switch (formatString.match(placeholderRegex)[1]) {
    case "amount":
      value = formatWithDelimiters(cents, 2);
      break;
    case "amount_no_decimals":
      value = formatWithDelimiters(cents, 0);
      break;
    case "amount_with_comma_separator":
      value = formatWithDelimiters(cents, 2, ".", ",");
      break;
    case "amount_no_decimals_with_comma_separator":
      value = formatWithDelimiters(cents, 0, ".", ",");
      break;
    case "amount_with_apostrophe_separator":
      value = formatWithDelimiters(cents, 2, "'", ".");
      break;
    case "amount_no_decimals_with_space_separator":
      value = formatWithDelimiters(cents, 0, " ", ",");
      break;
    case "amount_with_space_separator":
      value = formatWithDelimiters(cents, 2, " ", ",");
      break;
    case "amount_with_period_and_space_separator":
      value = formatWithDelimiters(cents, 2, " ", ".");
      break;
    default:
      value = formatWithDelimiters(cents, 2);
      break;
  }
  return formatString.replace(placeholderRegex, value);
}

// Fetch the product data from the .js endpoint because it includes
// more data than the .json endpoint.

var getProduct = (function (handle) {
  return function (cb) {
    return fetch("".concat(window.theme.routes.products, "/").concat(handle, ".js")).then(function (res) {
      return res.json();
    }).then(function (data) {
      return cb(data);
    }).catch(function (err) {
      return console.log(err.message);
    });
  };
});

var selectors$1j = {
  cartQuantityCountDisplay: function cartQuantityCountDisplay(id) {
    return ".quantity-in-cart-display[data-id=\"".concat(id, "\"]");
  },
  filtersHeading: "[data-filter-expand]",
  filterReset: "[data-filter-reset]",
  filterValues: "[data-filter-values]",
  filterValue: "[data-filter-value]",
  filterValueInput: "[data-filter-value-input]",
  item: "[data-input-item]",
  // TODO: rethink this selector, why is product-item "data-input-item" ?
  itemError: ".quick-add__item-error",
  itemProperties: "[data-item-properties]",
  quickAddWrapper: ".product-item__quick-add-wrapper",
  modalContent: ".modal__content",
  modalContentInner: ".quick-add-modal__content",
  modalFooter: ".quick-add-modal__footer",
  productQuantityInput: "[data-product-quantity-input]",
  quantityInput: "[data-quantity-input]",
  quantityAdd: "[data-add-quantity]",
  quantitySubtract: "[data-subtract-quantity]",
  quantityWrapper: ".quantity-input",
  variantRow: "[data-item-type='variant']",
  variantRowById: function variantRowById(id) {
    return "[data-item-type='variant'][data-variant-id='".concat(id, "']");
  },
  removeItem: "[data-remove-item]",
  variant: "[data-item-type='variant']",
  elsWithDataQuantityInCart: "[data-quantity-in-cart]",
  iconStyleProductItemQuantity: '[data-quick-add-style="icon"] .quantity-input-wrapper--product-item-quick-add'
};
var classes$A = {
  active: "active",
  hidden: "visually-hidden",
  updatingQuantity: "pending-quantity-update",
  iconStyleProductItemQuantityPendingCollapse: "pending-collapse",
  noQuantity: "no-quantity-in-cart"
};

// Removing until quick add modal can be fleshed out.
/*function initQuickAddFilters() {
  const delegate = new Delegate(document);

  delegate.on("click", selectors.filterValueInput, (_, target) => {
    add(target.closest(selectors.filterValues), classes.active);
    add(target.parentElement, classes.active);
    _handleFilterVariants(target.closest(selectors.modalContentInner));
  });

  delegate.on("click", selectors.filterReset, (_, target) => {
    const checkedFilter = qs("input:checked", target.parentElement);
    checkedFilter && (checkedFilter.checked = false);
    remove(target.closest(selectors.filterValues), classes.active);
    remove(checkedFilter.parentElement, classes.active);
    _handleFilterVariants(target.closest(selectors.modalContentInner));
  });

  delegate.on("click", selectors.filtersHeading, (_, target) => {
    target.dataset.filterExpand === "false"
      ? (target.dataset.filterExpand = "true")
      : (target.dataset.filterExpand = "false");
  });

  const unload = () => {
    delegate.off();
  };

  return {
    unload,
  };
}*/

// Removing until quick add modal can be fleshed out.
/*function initQuickAddModalCounts() {
  const modalContent = qs(selectors.modalContent, document);
  const events = [
    on(
      "theme-internal:update-product-item-modal-counts",
      ({ variantId, variantQuantity }) =>
        updateModalVariantsCounts(variantId, variantQuantity, modalContent)
    ),
    on("theme-internal:update-product-item-counts", ({ id, quantity }) => {
      const cartQuantityCountDisplayEls = qsa(
        selectors.cartQuantityCountDisplay(id),
        modalContent
      );

      cartQuantityCountDisplayEls.forEach(el => {
        el.textContent = quantity;
      });
    }),
  ];

  const unload = () => {
    events.forEach(unsubscribe => unsubscribe());
  };

  return {
    unload,
  };
}*/

// Removing until quick add modal can be fleshed out.
/*function initQuickAddModalFooter(node) {
  const quickAddFooter = qs(selectors.modalFooter, node);
  let lastVariant = qs(`${selectors.variant}:last-of-type`, node);

  const observer = new IntersectionObserver(
    ([{ isIntersecting: visible }]) => {
      if (visible) {
        remove(quickAddFooter, classes.active);

        observer.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  remove(quickAddFooter, classes.hidden);
  add(quickAddFooter, classes.active);
  observer.observe(lastVariant);

  on("theme-internal:quick-add-filters-updated", () => {
    const visibleVariants = qsa(
      `${selectors.variant}:not(.visually-hidden)`,
      node
    );

    observer.disconnect();
    add(quickAddFooter, classes.active);
    lastVariant = visibleVariants[visibleVariants.length - 1];
    observer.observe(lastVariant);
  });

  const unload = () => {
    observer?.disconnect();
  };

  return {
    unload,
  };
}*/

function initQuickAddQuantitySelectors(node) {
  var delegate = new Delegate(node);
  delegate.on("click", selectors$1j.quantitySubtract, function (_, target) {
    var _getItemData2 = _getItemData(target),
      variantId = _getItemData2.variantId,
      qty = _getItemData2.qty;
    var newQuantity = qty - 1;
    cart.updateItem(variantId, newQuantity);
  });
  delegate.on("click", selectors$1j.quantityAdd, function (_, target) {
    var _getItemData3 = _getItemData(target),
      variantId = _getItemData3.variantId;
    cart.addItemById(variantId, 1);
  });
  delegate.on("change", selectors$1j.quantityInput, function (_, target) {
    var _getItemData4 = _getItemData(target),
      variantId = _getItemData4.variantId;
    cart.updateItem(variantId, parseInt(target.value, 10));
    u$1(target.closest(selectors$1j.quantityWrapper), classes$A.updatingQuantity);
  });
  delegate.on("click", selectors$1j.removeItem, function (_, target) {
    var _getItemData5 = _getItemData(target),
      variantId = _getItemData5.variantId,
      qty = _getItemData5.qty;
    if (qty > 0) {
      cart.updateItem(variantId, 0);
      u$1(target.closest(selectors$1j.quantityWrapper), classes$A.updatingQuantity);
    }
  });
  delegate.on("click", [selectors$1j.quantitySubtract, selectors$1j.quantityAdd], function (_, target) {
    u$1(target.closest(selectors$1j.quantityWrapper), classes$A.updatingQuantity);
  });
  var events = [c("quick-add:error", function (_, _ref) {
    var id = _ref.id,
      errorMessage = _ref.errorMessage;
    var item = node.closest(selectors$1j.item); // TODO reconsider this, why does quick-add know about product-item?

    if (item.dataset.variantId === id) {
      console.log(errorMessage);
      _handleErrorMessage(item);
    }
  })];
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    delegate.off();
  };
  return {
    unload: unload
  };
}
function initQuickAddTemplateCounters(node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    afterLoad: false // Set this to true if initialized beyond initial page load
  };

  var events = [c("theme-internal:update-product-item-counts", function (_ref2) {
    var id = _ref2.id,
      quantity = _ref2.quantity;
    var item = node.closest(selectors$1j.item);
    if (parseInt(item.dataset.id, 10) === id) {
      _handleUpdateProductCount(item, quantity);
    }
  })
  // Removing until quick add modal can be fleshed out.
  /* on(
    "theme-internal:update-product-item-modal-counts",
    ({ variantId, variantQuantity }) => {
      const modalTemplate = qs("template", node)?.content;
      modalTemplate &&
        updateModalVariantsCounts(variantId, variantQuantity, modalTemplate);
    }
  ), */];

  if (options.afterLoad) {
    // If this UI is initialized after load (eg if the HTML was rendered in a template and lazy loaded)
    // we need to make sure the counts are correct in case the liquid differs from the current state
    //
    // Sometimes, this can run before the window cart data is populated, so we need to fetch it ourselves
    if (window.theme.cartData) {
      _updateItemCount(node, window.theme.cartData.items);
    } else {
      cart.get().then(function (cartData) {
        window.theme.cartData = cartData;
        _updateItemCount(node, cartData.items);
      });
    }
  }
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
}

// Removing until quick add modal can be fleshed out.
/* function updateModalVariantsCounts(variantId, variantQuantity, content) {
  const quickAddVariantRows = qsa(selectors.variantRow, content);

  quickAddVariantRows.forEach(variantRow => {
    if (parseInt(variantRow.dataset.variantId, 10) === variantId) {
      // TODO: Widgets should self update (listen to events?) perhaps once webcomponents

      // Update any widget's inputs
      const quantityInputs = qsa(selectors.quantityInput, variantRow);
      quantityInputs.forEach(input => {
        input.value = variantQuantity;
      });

      // Update any widget's non-input display
      const elsWithDataQuantityInCart = qsa(selectors.elsWithDataQuantityInCart, variantRow);
      elsWithDataQuantityInCart.forEach(el => {
        el.dataset.quantityInCart = variantQuantity;
      });

      qs(selectors.quantityInput, variantRow).value = variantQuantity;
      const countDisplayEl = qs(
        selectors.cartQuantityCountDisplay(variantId),
        variantRow
      );

      if (countDisplayEl) {
        countDisplayEl.textContent = variantQuantity;
      }

      variantRow.dataset.quantityInCart = variantQuantity;

      remove(
        qs(selectors.quantityWrapper, variantRow),
        classes.updatingQuantity
      );
    }
  });
}
*/

// Removing until quick add modal can be fleshed out.
/* function _handleFilterVariants(node) {
  const variants = qsa(selectors.variant, node);
  const filtersHeading = qs(selectors.filtersHeading, node);
  const checkedFilterValues = qsa("input:checked", node).map(
    filter => filter.value
  );

  filtersHeading.dataset.filtersActive = checkedFilterValues.length > 0;

  variants.forEach(variant => {
    if (checkedFilterValues.every(filter => variant.id.includes(filter))) {
      remove(variant, classes.hidden);
    } else {
      add(variant, classes.hidden);
    }
  });

  emit("theme-internal:quick-add-filters-updated");
}*/

function _getItemData(target) {
  var item = target.closest(selectors$1j.item);
  var _item$dataset = item.dataset,
    id = _item$dataset.id,
    variantId = _item$dataset.variantId;
  var qty = parseInt(n$2(selectors$1j.quantityInput, item).value);
  return {
    item: item,
    id: id,
    variantId: variantId,
    qty: qty
  };
}
function _updateItemCount(node, cartItems) {
  var cartCount = 0;
  var productId = node.dataset.productId;
  var thisProductInCartItems = cartItems.filter(function (item) {
    return item.product_id == productId;
  });
  thisProductInCartItems.forEach(function (cartItem) {
    cartCount += cartItem.quantity;
  });
  var item = node.closest(selectors$1j.item);
  _updateProductCartQuantity(item, cartCount);
  _handleUpdateProductCount(item, cartCount);
}
function _updateProductCartQuantity(item, quantity) {
  var productId = item.dataset.id;
  var cartDisplayEls = t$2(selectors$1j.cartQuantityCountDisplay(productId), item);

  // TODO: not sure we should be updating the template here...
  // Removing until quick add modal can be fleshed out.
  /* const modalTemplate = qs("template", item)?.content;
   if (
    modalTemplate &&
    qs(selectors.cartQuantityCountDisplay(productId), modalTemplate)
  ) {
    cartDisplayEls.push(
      qs(selectors.cartQuantityCountDisplay(productId), modalTemplate)
    );
  }*/

  cartDisplayEls.forEach(function (el) {
    el.textContent = quantity;
  });
}
function _handleUpdateProductCount(item, newQuantity) {
  item.dataset.quantityInCart = newQuantity;
  var elsWithDataQuantityInCart = t$2(selectors$1j.elsWithDataQuantityInCart, item);
  elsWithDataQuantityInCart.forEach(function (el) {
    el.dataset.quantityInCart = newQuantity;
  });
  i$1(t$2(selectors$1j.quantityWrapper, item), classes$A.updatingQuantity);
  var productQuantityInputs = t$2(selectors$1j.productQuantityInput, item);
  productQuantityInputs.forEach(function (input) {
    input.value = newQuantity;
  });
  if (newQuantity === 0) {
    var quickAddWrapper = n$2(selectors$1j.quickAddWrapper, item);
    i$1(quickAddWrapper, classes$A.active);
  }
  _updateProductCartQuantity(item, newQuantity);
}
function _handleErrorMessage(item) {
  var itemEl = n$2(selectors$1j.quantityWrapper, item);
  var itemElInput = n$2("input", itemEl);
  var cartQuantity = itemEl.closest(selectors$1j.elsWithDataQuantityInCart).dataset.quantityInCart;
  itemElInput.value = cartQuantity;
  i$1(itemEl, classes$A.updatingQuantity);
}

var classes$z = {
  visible: "is-visible",
  active: "active",
  fixed: "is-fixed"
};
var selectors$1i = {
  closeBtn: "[data-modal-close]",
  wash: ".modal__wash",
  modalContent: ".modal__content",
  modalInner: ".modal__inner",
  quickAddVariantWrapper: ".product-item__quick-add-wrapper"
};
var modal = function modal(node) {
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  var modalInner = n$2(selectors$1i.modalInner, node);
  var modalContent = n$2(selectors$1i.modalContent, node);
  var delegate = new Delegate(document);
  delegate.on("click", selectors$1i.wash, function () {
    return _close();
  });
  var events = [e$2(n$2(selectors$1i.closeBtn, node), "click", function (e) {
    e.preventDefault();
    _close();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) _close();
  }), c("modal:open", function (state, _ref2) {
    var modalContent = _ref2.modalContent,
      _ref2$narrow = _ref2.narrow,
      narrow = _ref2$narrow === void 0 ? false : _ref2$narrow,
      _ref2$quickAdd = _ref2.quickAdd,
      quickAdd = _ref2$quickAdd === void 0 ? false : _ref2$quickAdd;
    node.dataset.isNarrow = narrow;
    node.dataset.isQuickAdd = quickAdd;
    _renderModalContent(modalContent, quickAdd);
    _open();
  })];
  var quickAddEvents = [];
  var quickAddQuantitySelectors = [];
  var _renderModalContent = function _renderModalContent(content, isQuickAdd) {
    var clonedContent = content.cloneNode(true);
    modalContent.innerHTML = "";
    modalContent.appendChild(clonedContent);
    wrapIframes(t$2("iframe", modalContent));
    wrapTables(t$2("table", modalContent));
    if (isQuickAdd) {
      var quickAddVariantWrappers = t$2(selectors$1i.quickAddVariantWrapper, modalContent);
      quickAddVariantWrappers.forEach(function (wrapper) {
        return quickAddQuantitySelectors.push(initQuickAddQuantitySelectors(wrapper));
      });
      quickAddEvents.push(e$2(quickAddVariantWrappers, "click", function (e) {
        u$1(e.currentTarget, classes$z.active);
      }), e$2(quickAddVariantWrappers, "mouseleave", function (e) {
        i$1(e.currentTarget, classes$z.active);
      }));

      // Removing until quick add modal can be fleshed out.
      /* if (modalContent.offsetHeight > modalInner.offsetHeight) {
        quickAddObserver = initQuickAddModalFooter(node);
      } */
    }
  };

  var _open = function _open() {
    // Due to this component being shared between templates we have to
    // animate around it being fixed to the window
    u$1(node, classes$z.active);

    // Lock modal height on open to prevent shifting modal
    modalInner.style.setProperty("height", "".concat(modalInner.offsetHeight, "px"));
    focusTrap.activate();
    disableBodyScroll(node, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }
          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
  };
  var _close = function _close() {
    focusTrap.deactivate();
    i$1(node, classes$z.active);

    // Release modal height on close
    modalInner.style.removeProperty("height");
    enableBodyScroll(node);
    quickAddEvents.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    quickAddQuantitySelectors.forEach(function (selector) {
      return selector.unload();
    });
    setTimeout(function () {
      modalContent.innerHTML = "";
    }, 300);
  };
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
};

function getMediaQuery(querySize) {
  var value = getComputedStyle(document.documentElement).getPropertyValue("--media-".concat(querySize));
  if (!value) {
    console.warn("Invalid querySize passed to getMediaQuery");
    return false;
  }
  return value;
}

var intersectionWatcher = (function (node) {
  var instant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var margin = window.matchMedia(getMediaQuery("above-720")).matches ? 200 : 100;
  var threshold = 0;
  if (!instant) {
    threshold = Math.min(margin / node.offsetHeight, 0.5);
  }
  var observer = new IntersectionObserver(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      visible = _ref2[0].isIntersecting;
    if (visible) {
      u$1(node, "is-visible");
      observer.disconnect();
    }
  }, {
    threshold: threshold
  });
  observer.observe(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.disconnect();
    }
  };
});

// Takes an array of selectors and sets the `--delay-offset-multiplier` variable in the correct order
//
//  @param {node} element The section element
//  @param {items} array Array of animation item selectors
var delayOffset = (function (node, itemSelectors) {
  var offsetStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var delayOffset = offsetStart;
  itemSelectors.forEach(function (selector) {
    var items = t$2(selector, node);
    items.forEach(function (item) {
      item.style.setProperty("--delay-offset-multiplier", delayOffset);
      delayOffset++;
    });
  });
  return delayOffset;
});

var shouldAnimate = (function (node) {
  return a$1(node, "animation") && !a$1(document.documentElement, "prefers-reduced-motion");
});

var selectors$1h = {
  headerContainerItems: ".animation--container-header > *",
  footerContainerItems: ".animation--container-footer > *",
  containerItems: ".animation--container > *",
  items: ".animation--item"
};
var animateStandard = (function (node, offset) {
  var delayOffsetStart = offset ? offset : 0;

  // Add the animation delay offset variables
  delayOffset(node, [selectors$1h.headerContainerItems, selectors$1h.containerItems, selectors$1h.items, selectors$1h.footerContainerItems], delayOffsetStart);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1g = {
  titleFirst: ".animation--container.animation--order-1 > *",
  titleSecond: ".animation--container.animation--order-2 > *",
  imageFirst: ".animation--item.animation--order-1",
  imageSecond: ".animation--item.animation--order-2",
  items: ".animation--item:not(.animation--order-1, .animation--order-2)",
  animationContainers: ".animation--container",
  animationItems: ".animation--item"
};
var animateArticle = (function (node) {
  var delayItems = [selectors$1g.titleFirst, selectors$1g.imageFirst, selectors$1g.titleSecond, selectors$1g.imageSecond, selectors$1g.items];

  // Add the animation delay offset variables
  delayOffset(node, delayItems);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1f = {
  image: ".animation--image",
  imageOverlay: ".animation--image-overlay",
  content: ".animation--container > *",
  description: ".animation--item"
};
var animateCollectionBanner = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1f.image, selectors$1f.imageOverlay, selectors$1f.content, selectors$1f.description]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1e = {
  partial: "[data-partial]",
  filterTopBar: ".animation--filter-topbar",
  filterSidebar: ".animation--filter-sidebar",
  resultItems: ".animation--item:not(.animation--item-revealed)"
};
var classes$y = {
  hideProducts: "animation--container-hide",
  itemRevealed: "animation--item-revealed"
};
var animateCollectionAndSearch = (function (node) {
  var partial = n$2(selectors$1e.partial, node);
  var filterTopBarEl = n$2(selectors$1e.filterTopBar, node);
  var filterSidebarEl = n$2(selectors$1e.filterSidebar, node);
  var filterTopBarObserver = null;
  var filterSidebarObserver = null;
  if (filterTopBarEl) {
    filterTopBarObserver = intersectionWatcher(filterTopBarEl, true);
  }
  if (filterSidebarEl) {
    filterSidebarObserver = intersectionWatcher(filterSidebarEl, true);
  }
  setupProductItem();
  function setupProductItem() {
    var resultItems = t$2(selectors$1e.resultItems, node);
    delayOffset(node, [selectors$1e.resultItems]);
    setTimeout(function () {
      u$1(resultItems, classes$y.itemRevealed);
    }, 0);
  }
  function updateContents() {
    setupProductItem();
    i$1(partial, classes$y.hideProducts); // Remove the fade out class
  }

  function infiniteScrollReveal() {
    setupProductItem();
  }
  return {
    updateContents: updateContents,
    infiniteScrollReveal: infiniteScrollReveal,
    destroy: function destroy() {
      var _filterTopBarObserver, _filterSidebarObserve;
      (_filterTopBarObserver = filterTopBarObserver) === null || _filterTopBarObserver === void 0 ? void 0 : _filterTopBarObserver.destroy();
      (_filterSidebarObserve = filterSidebarObserver) === null || _filterSidebarObserve === void 0 ? void 0 : _filterSidebarObserve.destroy();
    }
  };
});

var selectors$1d = {
  filterGroup: ".animation--filter-form-group"
};
var classes$x = {
  animationRevealed: "animation--filter-sidebar-revealed"
};
var animateFilterSidebar = (function (node) {
  delayOffset(node, [selectors$1d.filterGroup]);

  // Trigger the reveal animation when the sidebar is opened
  function open() {
    u$1(node, classes$x.animationRevealed);
  }

  // Reset the reveal animation when the sidebar is closed
  function close() {
    i$1(node, classes$x.animationRevealed);
  }
  return {
    open: open,
    close: close
  };
});

var selectors$1c = {
  items: ".animation--container > *",
  media: ".animation--image, .animation--video",
  mediaCaption: ".animation--media-caption"
};
var animateMediaWithContent = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$1c.media, selectors$1c.mediaCaption]);
  delayOffset(node, [selectors$1c.items], 6);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$1b = {
  columns: ".animation--dropdown-item",
  promoImage: ".animation--image",
  promoImageOverlay: ".animation--image-overlay",
  promoItems: ".animation--container > *",
  hasPromo: "meganav--has-promo",
  promoLeft: "meganav--promo-position-left"
};
var animateMeganav = (function (node) {
  var columnItems = t$2(selectors$1b.columns, node);
  if (a$1(node, selectors$1b.hasPromo)) {
    delayOffset(node, [selectors$1b.promoImage, selectors$1b.promoImageOverlay, selectors$1b.promoItems]);
    if (a$1(node, selectors$1b.promoLeft)) {
      // Set columnItem initial delay to i + 1 of previously delayed
      assignColumnDelays(columnItems, 4);
    } else {
      assignColumnDelays(columnItems);
    }
  } else {
    assignColumnDelays(columnItems);
  }
  function assignColumnDelays(items) {
    var delayMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var columnOffset;
    items.forEach(function (item, i) {
      var leftOffset = item.getBoundingClientRect ? item.getBoundingClientRect().left : item.offsetLeft;
      if (i === 0) columnOffset = leftOffset;
      if (columnOffset != leftOffset) {
        columnOffset = leftOffset;
        delayMultiplier++;
      }
      item.style.setProperty("--delay-offset-multiplier", delayMultiplier);
    });
  }
});

var selectors$1a = {
  animationItems: ".animation--container > *"
};
var classes$w = {
  isVisible: "is-visible"
};
var animatePopup = (function (node) {
  delayOffset(node, [selectors$1a.animationItems]);

  // Trigger the reveal animation when the drawer is opened
  function open() {
    if (shouldAnimate(node)) {
      u$1(node, classes$w.isVisible);
    }
  }

  // Trigger the reveal animation when the drawer is opened
  function close() {
    if (shouldAnimate(node)) {
      i$1(node, classes$w.isVisible);
    }
  }
  return {
    open: open,
    close: close
  };
});

var animateProductItem = (function (items) {
  var events = [];
  items.forEach(function (item) {
    var imageOne = n$2(".product-item__image--one", item);
    var imageTwo = n$2(".product-item__image--two", item);
    t$2(".product-swatches-options__list", item);
    events.push(e$2(item, "mouseenter", function () {
      enterItemAnimation(imageOne, imageTwo);
    }));
    events.push(e$2(item, "mouseleave", function () {
      leaveItemAnimation(imageOne, imageTwo);
    }));
  });
  function enterItemAnimation(imageOne, imageTwo, optionsElements) {
    if (imageTwo) {
      u$1(imageTwo, "active");
    }
  }
  function leaveItemAnimation(imageOne, imageTwo, optionsElements) {
    if (imageTwo) {
      i$1(imageTwo, "active");
    }
  }
  return {
    destroy: function destroy() {
      events.forEach(function (unsubscribe) {
        return unsubscribe();
      });
    }
  };
});

var selectors$19 = {
  mobile: ".animation--container > *",
  desktop: ".animation--item"
};
var animateProductTabs = (function (node) {
  // Add the animation delay offset variables
  delayOffset(node, [selectors$19.mobile]);
  delayOffset(node, [selectors$19.desktop]);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$18 = {
  mainContent: ".animation--item",
  footerItems: ".animation--container > *"
};
var classes$v = {
  isVisible: "is-visible"
};
var animatePurchaseConfirmation = (function (node) {
  function animate() {
    // Add the animation delay offset variables
    delayOffset(node, [selectors$18.mainContent]);
    delayOffset(node, [selectors$18.footerItems]);

    // Trigger the reveal animation when the quick view is opened.
    setTimeout(function () {
      u$1(node, classes$v.isVisible);
    }, 0);
  }
  function reset() {
    i$1(node, classes$v.isVisible);
  }
  return {
    animate: animate,
    reset: reset
  };
});

var selectors$17 = {
  header: ".animation--container > *",
  desktopItems: ".quick-links__links-container.hide-desktop .animation--item",
  mobileItems: ".quick-links__links-container.hide-mobile .animation--item",
  items: ".quick-links__links-container:not(.hide-mobile):not(.hide-desktop) .animation--item"
};
var animateQuickLinks = (function (node) {
  var itemDelay = delayOffset(node, [selectors$17.header]);
  delayOffset(node, [selectors$17.desktopItems], itemDelay);
  delayOffset(node, [selectors$17.mobileItems], itemDelay);
  delayOffset(node, [selectors$17.items], itemDelay);
  var observer = intersectionWatcher(node, true);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$16 = {
  animationItems: ".animation--item"
};
var animateQuickProduct = (function (node) {
  function animate() {
    // Add the animation delay offset variables
    delayOffset(node, [selectors$16.animationItems]);
  }
  return {
    animate: animate
  };
});

var selectors$15 = {
  saleAmount: ".animation--item.animation--order-1",
  saleItems: ".animation--item:not(.animation--order-1)",
  containerItems: ".animation--container > *"
};
var animateSalesBanner = (function (node) {
  var leftColumnItems = [selectors$15.saleAmount, selectors$15.saleItems];
  var rightColumnItems = [selectors$15.containerItems];

  // Add the animation delay offset variables
  delayOffset(node, leftColumnItems);
  delayOffset(node, rightColumnItems, 1);
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

var selectors$14 = {
  textContainer: '.animation--item',
  textContent: '.animation--container > *'
};
var animateSlideshow = (function (node, slides) {
  slides.forEach(function (slide) {
    delayOffset(slide, [selectors$14.textContainer, selectors$14.textContent], 3);
  });
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer.destroy();
    }
  };
});

var selectors$13 = {
  items: ".animation--drawer-container > *"
};
var classes$u = {
  visible: "is-visible"
};
var animateStoreAvailabilityDrawer = (function (node) {
  function animate() {
    // Set the position offset on each time to be animated
    var items = t$2(selectors$13.items, node);
    items.forEach(function (item, i) {
      item.style.setProperty("--position-offset-multiplier", i);
    });

    // Trigger the reveal animation when the drawer is opened.
    setTimeout(function () {
      u$1(node, classes$u.visible);
    }, 0);
  }
  function reset() {
    i$1(node, classes$u.visible);
  }
  return {
    animate: animate,
    reset: reset
  };
});

var selectors$12 = {
  header: ".animation--container-header > *",
  itemContainers: ".tabbed-collections__products:not(.animation-added)",
  items: ".animation--item"
};
var animateTabbedCollections = (function (node) {
  var itemDelay = delayOffset(node, [selectors$12.header]);
  var itemContainers = t$2(selectors$12.itemContainers, node);
  itemContainers.forEach(function (container) {
    delayOffset(container, [selectors$12.items], itemDelay);
    container.classList.add("animation-added");
  });
  var observer = intersectionWatcher(node);
  return {
    destroy: function destroy() {
      observer === null || observer === void 0 ? void 0 : observer.destroy();
    }
  };
});

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(this.status));
      }
    };
    xhr.onerror = function () {
      reject(new Error(this.status));
    };
    xhr.send();
  });
}

var classes$t = {
  active: "active"
};
var selectors$11 = {
  drawerTrigger: "[data-store-availability-drawer-trigger]",
  closeBtn: "[data-store-availability-close]",
  productTitle: "[data-store-availability-product-title]",
  variantTitle: "[data-store-availability-variant-title]",
  storeListContainer: "[data-store-list-container]",
  storeListContent: "[data-store-availability-list-content]",
  wash: "[data-store-availability-drawer-wash]",
  parentWrapper: "[data-store-availability-container]"
};
var storeAvailabilityDrawer = function storeAvailabilityDrawer(node) {
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  var wash = n$2(selectors$11.wash, node.parentNode);
  var productTitleContainer = n$2(selectors$11.productTitle);
  var variantTitleContainer = n$2(selectors$11.variantTitle);
  var storeListContainer = n$2(selectors$11.storeListContainer, node);
  var storeAvailabilityDrawerAnimate = null;
  if (shouldAnimate(node)) {
    storeAvailabilityDrawerAnimate = animateStoreAvailabilityDrawer(node);
  }
  var events = [e$2([n$2(selectors$11.closeBtn, node), wash], "click", function (e) {
    e.preventDefault();
    _close();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) _close();
  })];
  var _handleClick = function _handleClick(target) {
    var parentContainer = target.closest(selectors$11.parentWrapper);
    var _parentContainer$data = parentContainer.dataset,
      baseUrl = _parentContainer$data.baseUrl,
      variantId = _parentContainer$data.variantId,
      productTitle = _parentContainer$data.productTitle,
      variantTitle = _parentContainer$data.variantTitle;
    var variantSectionUrl = "".concat(baseUrl, "/variants/").concat(variantId, "/?section_id=store-availability");
    makeRequest("GET", variantSectionUrl).then(function (storeAvailabilityHTML) {
      var container = document.createElement("div");
      container.innerHTML = storeAvailabilityHTML;
      productTitleContainer.innerText = productTitle;
      // Shopify returns string null on variant titles for products without varians
      variantTitleContainer.innerText = variantTitle === "null" ? "" : variantTitle;
      var storeList = n$2(selectors$11.storeListContent, container);
      storeListContainer.innerHTML = "";
      storeListContainer.appendChild(storeList);
    }).then(_open);
  };
  var _open = function _open() {
    u$1(node, classes$t.active);
    if (shouldAnimate(node)) {
      storeAvailabilityDrawerAnimate.animate();
    }
    node.setAttribute("aria-hidden", "false");
    focusTrap.activate();
    disableBodyScroll(node, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }
          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
  };
  var _close = function _close() {
    focusTrap.deactivate();
    i$1(node, classes$t.active);
    node.setAttribute("aria-hidden", "true");
    setTimeout(function () {
      if (shouldAnimate(node)) {
        storeAvailabilityDrawerAnimate.reset();
      }
      enableBodyScroll(node);
    }, 250);
  };
  var delegate = new Delegate(document.body);
  delegate.on("click", selectors$11.drawerTrigger, function (_, target) {
    return _handleClick(target);
  });
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
};

var strings$8 = window.theme.strings.accessibility;
var handleTab = function handleTab() {
  var tabHandler = null;
  var formElments = ["INPUT", "TEXTAREA", "SELECT"];
  // Determine if the user is a mouse or keyboard user
  function handleFirstTab(e) {
    if (e.keyCode === 9 && !formElments.includes(document.activeElement.tagName)) {
      document.body.classList.add("user-is-tabbing");
      tabHandler();
      tabHandler = e$2(window, "mousedown", handleMouseDownOnce);
    }
  }
  function handleMouseDownOnce() {
    document.body.classList.remove("user-is-tabbing");
    tabHandler();
    tabHandler = e$2(window, "keydown", handleFirstTab);
  }
  tabHandler = e$2(window, "keydown", handleFirstTab);
};
var focusFormStatus = function focusFormStatus(node) {
  var formStatus = n$2(".form-status", node);
  if (!formStatus) return;
  var focusElement = n$2("[data-form-status]", formStatus);
  if (!focusElement) return;
  focusElement.focus();
};
var prefersReducedMotion = function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
function backgroundVideoHandler(container) {
  var pause = n$2(".video-pause", container);
  var video = container.getElementsByTagName("VIDEO")[0];
  if (!pause || !video) return;
  var pauseVideo = function pauseVideo() {
    video.pause();
    pause.innerText = strings$8.play_video;
  };
  var playVideo = function playVideo() {
    video.play();
    pause.innerText = strings$8.pause_video;
  };
  if (prefersReducedMotion()) {
    pauseVideo();
  }
  var pauseListener = e$2(pause, "click", function (e) {
    e.preventDefault();
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });
  return function () {
    return pauseListener();
  };
}

var classes$s = {
  hidden: "hidden"
};
var sectionClasses = (function () {
  function adjustClasses() {
    var sections = t$2(".main .shopify-section");
    sections.forEach(function (section) {
      var child = section.firstElementChild;

      // Specific to recommended hidden products
      if (child && child.classList.contains(classes$s.hidden)) {
        u$1(section, classes$s.hidden);
      }
    });
  }
  adjustClasses();
  e$2(document, "shopify:section:load", adjustClasses);
});

/**
 * Returns a product JSON object when passed a product URL
 * @param {*} url
 */

/**
 * Find a match in the project JSON (using a ID number) and return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Number} value Accepts Number (e.g. 6908023078973)
 * @returns {Object} The variant object once a match has been successful. Otherwise null will be return
 */
function getVariantFromId(product, value) {
  _validateProductStructure(product);

  if (typeof value !== 'number') {
    throw new TypeError(value + ' is not a Number.');
  }

  var result = product.variants.filter(function(variant) {
    return variant.id === value;
  });

  return result[0] || null;
}

/**
 * Convert the Object (with 'name' and 'value' keys) into an Array of values, then find a match & return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Object} collection Object with 'name' and 'value' keys (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
 * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
 */
function getVariantFromSerializedArray(product, collection) {
  _validateProductStructure(product);

  // If value is an array of options
  var optionArray = _createOptionArrayFromOptionCollection(product, collection);
  return getVariantFromOptionArray(product, optionArray);
}

/**
 * Find a match in the project JSON (using Array with option values) and return the variant (as an Object)
 * @param {Object} product Product JSON object
 * @param {Array} options List of submitted values (e.g. ['36', 'Black'])
 * @returns {Object || null} The variant object once a match has been successful. Otherwise null will be returned
 */
function getVariantFromOptionArray(product, options) {
  _validateProductStructure(product);
  _validateOptionsArray(options);

  var result = product.variants.filter(function(variant) {
    return options.every(function(option, index) {
      return variant.options[index] === option;
    });
  });

  return result[0] || null;
}

/**
 * Creates an array of selected options from the object
 * Loops through the project.options and check if the "option name" exist (product.options.name) and matches the target
 * @param {Object} product Product JSON object
 * @param {Array} collection Array of object (e.g. [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }])
 * @returns {Array} The result of the matched values. (e.g. ['36', 'Black'])
 */
function _createOptionArrayFromOptionCollection(product, collection) {
  _validateProductStructure(product);
  _validateSerializedArray(collection);

  var optionArray = [];

  collection.forEach(function(option) {
    for (var i = 0; i < product.options.length; i++) {
      if (product.options[i].name.toLowerCase() === option.name.toLowerCase()) {
        optionArray[i] = option.value;
        break;
      }
    }
  });

  return optionArray;
}

/**
 * Check if the product data is a valid JS object
 * Error will be thrown if type is invalid
 * @param {object} product Product JSON object
 */
function _validateProductStructure(product) {
  if (typeof product !== 'object') {
    throw new TypeError(product + ' is not an object.');
  }

  if (Object.keys(product).length === 0 && product.constructor === Object) {
    throw new Error(product + ' is empty.');
  }
}

/**
 * Validate the structure of the array
 * It must be formatted like jQuery's serializeArray()
 * @param {Array} collection Array of object [{ name: "Size", value: "36" }, { name: "Color", value: "Black" }]
 */
function _validateSerializedArray(collection) {
  if (!Array.isArray(collection)) {
    throw new TypeError(collection + ' is not an array.');
  }

  if (collection.length === 0) {
    return [];
  }

  if (collection[0].hasOwnProperty('name')) {
    if (typeof collection[0].name !== 'string') {
      throw new TypeError(
        'Invalid value type passed for name of option ' +
          collection[0].name +
          '. Value should be string.'
      );
    }
  } else {
    throw new Error(collection[0] + 'does not contain name key.');
  }
}

/**
 * Validate the structure of the array
 * It must be formatted as list of values
 * @param {Array} collection Array of object (e.g. ['36', 'Black'])
 */
function _validateOptionsArray(options) {
  if (Array.isArray(options) && typeof options[0] === 'object') {
    throw new Error(options + 'is not a valid array of options.');
  }
}

// Public Methods
// -----------------------------------------------------------------------------

/**
 * Returns a URL with a variant ID query parameter. Useful for updating window.history
 * with a new URL based on the currently select product variant.
 * @param {string} url - The URL you wish to append the variant ID to
 * @param {number} id  - The variant ID you wish to append to the URL
 * @returns {string} - The new url which includes the variant ID query parameter
 */

function getUrlWithVariant(url, id) {
  if (/variant=/.test(url)) {
    return url.replace(/(variant=)[^&]+/, '$1' + id);
  } else if (/\?/.test(url)) {
    return url.concat('&variant=').concat(id);
  }

  return url.concat('?variant=').concat(id);
}

var selectors$10 = {
  sentinal: ".scroll-sentinal",
  scrollButtons: ".scroll-button",
  scrollViewport: "[data-scroll-container-viewport]"
};
var initScroller = function initScroller(node) {
  var hotloaded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var sentinals = t$2(selectors$10.sentinal, node);
  var buttons = t$2(selectors$10.scrollButtons, node);
  var _node$dataset = node.dataset,
    axis = _node$dataset.axis,
    startAtEnd = _node$dataset.startAtEnd;
  var scrollAttribute = axis == "vertical" ? "scrollTop" : "scrollLeft";
  var scrollerViewport = n$2(selectors$10.scrollViewport, node);
  var scrollOffset = node.dataset.scrollOffset === undefined ? 100 : parseInt(node.dataset.scrollOffset, 10);
  if (hotloaded) {
    document.addEventListener("quick-view:loaded", function () {
      u$1(node, "scroll-container-initialized");
      if (startAtEnd === "true") {
        _startAtEnd();
      }
    }, {
      once: true
    });
  } else {
    window.addEventListener("load", function () {
      u$1(node, "scroll-container-initialized");
      if (startAtEnd === "true") {
        _startAtEnd();
      }
    }, {
      once: true
    });
  }
  var events = [e$2(buttons, "click", function (e) {
    var button = e.currentTarget;
    var scrollAttribute = axis == "vertical" ? "scrollTop" : "scrollLeft";
    if (button.dataset.position === "start") {
      if (scrollerViewport[scrollAttribute] < scrollOffset * 1.5) {
        scrollerViewport[scrollAttribute] = 0;
      } else {
        scrollerViewport[scrollAttribute] -= scrollOffset;
      }
    } else {
      scrollerViewport[scrollAttribute] += scrollOffset;
    }
  })];
  var ioOptions = {
    root: scrollerViewport
  };
  var intersectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var position = entry.target.dataset.position;
      var visible = entry.isIntersecting;
      node.setAttribute("data-at-".concat(position), visible ? "true" : "false");
    });
  }, ioOptions);
  sentinals.forEach(function (sentinal) {
    intersectionObserver.observe(sentinal);
  });
  var scrollTo = function scrollTo(element) {
    var scrollDistance = axis == "vertical" ? element.offsetTop - element.getBoundingClientRect().height : element.offsetLeft - element.getBoundingClientRect().width;
    scrollerViewport[scrollAttribute] = scrollDistance;
  };
  var unload = function unload() {
    sentinals.forEach(function (sentinal) {
      intersectionObserver.unobserve(sentinal);
    });
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  function _startAtEnd() {
    var scrollAttribute = axis == "vertical" ? "scrollTop" : "scrollLeft";
    var scrollDirection = axis == "vertical" ? "scrollHeight" : "scrollWidth";
    scrollerViewport[scrollAttribute] = scrollerViewport[scrollDirection] * 2;
    node.dataset.startAtEnd = false;
  }
  return {
    scrollTo: scrollTo,
    unload: unload
  };
};
var scrollContainer = {
  initScroller: initScroller
};

var timer;
function debounce(func) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, time, event);
  };
}

var selectors$$ = {
  idInput: '[name="id"]',
  optionInput: '[name^="options"]',
  quantityInput: "[data-quantity-input][id^=\"quantity-input-product-form\"]",
  formQuantity: '[name="quantity"]',
  propertyInput: '[name^="properties"]'
};
function ProductForm(container, form, prod) {
  var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var product = validateProductObject(prod);
  var listeners = [];
  var getOptions = function getOptions() {
    return _serializeOptionValues(optionInputs, function (item) {
      var regex = /(?:^(options\[))(.*?)(?:\])/;
      item.name = regex.exec(item.name)[2]; // Use just the value between 'options[' and ']'
      return item;
    });
  };
  var getVariant = function getVariant() {
    return getVariantFromSerializedArray(product, getOptions());
  };
  var getProperties = function getProperties() {
    var properties = _serializePropertyValues(propertyInputs, function (propertyName) {
      var regex = /(?:^(properties\[))(.*?)(?:\])/;
      var name = regex.exec(propertyName)[2]; // Use just the value between 'properties[' and ']'
      return name;
    });
    return Object.entries(properties).length === 0 ? null : properties;
  };
  var getQuantity = function getQuantity() {
    return formQuantityInput[0] ? Number.parseInt(formQuantityInput[0].value, 10) : 1;
  };
  var getProductFormEventData = function getProductFormEventData() {
    return {
      options: getOptions(),
      variant: getVariant(),
      properties: getProperties(),
      quantity: getQuantity()
    };
  };
  var onFormEvent = function onFormEvent(cb) {
    if (typeof cb === "undefined") return;
    return function (event) {
      event.dataset = getProductFormEventData();
      cb(event);
    };
  };
  var setIdInputValue = function setIdInputValue(value) {
    var idInputElement = form.querySelector(selectors$$.idInput);
    if (!idInputElement) {
      idInputElement = document.createElement("input");
      idInputElement.type = "hidden";
      idInputElement.name = "id";
      form.appendChild(idInputElement);
    }
    idInputElement.value = value.toString();
  };
  var onSubmit = function onSubmit(event) {
    event.dataset = getProductFormEventData();
    setIdInputValue(event.dataset.variant.id);
    if (config.onFormSubmit) {
      config.onFormSubmit(event);
    }
  };
  var initInputs = function initInputs(selector, cb) {
    var elements = _toConsumableArray$1(container.querySelectorAll(selector));
    return elements.map(function (element) {
      listeners.push(e$2(element, "change", onFormEvent(cb)));
      return element;
    });
  };
  listeners.push(e$2(form, "submit", onSubmit));
  var optionInputs = initInputs(selectors$$.optionInput, config.onOptionChange);
  var formQuantityInput = initInputs(selectors$$.quantityInput, config.onQuantityChange);
  var propertyInputs = initInputs(selectors$$.propertyInput, config.onPropertyChange);
  var destroy = function destroy() {
    listeners.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    getVariant: getVariant,
    destroy: destroy
  };
}
function validateProductObject(product) {
  if (_typeof(product) !== "object") {
    throw new TypeError(product + " is not an object.");
  }
  if (typeof product.variants[0].options === "undefined") {
    throw new TypeError("Product object is invalid. Make sure you use the product object that is output from {{ product | json }} or from the http://[your-product-url].js route");
  }
  return product;
}
function _serializeOptionValues(inputs, transform) {
  return inputs.reduce(function (options, input) {
    if (input.checked ||
    // If input is a checked (means type radio or checkbox)
    input.type !== "radio" && input.type !== "checkbox" // Or if its any other type of input
    ) {
      options.push(transform({
        name: input.name,
        value: input.value
      }));
    }
    return options;
  }, []);
}
function _serializePropertyValues(inputs, transform) {
  return inputs.reduce(function (properties, input) {
    if (input.checked ||
    // If input is a checked (means type radio or checkbox)
    input.type !== "radio" && input.type !== "checkbox" // Or if its any other type of input
    ) {
      properties[transform(input.name)] = input.value;
    }
    return properties;
  }, {});
}

/*!
 * slide-anim
 * https://github.com/yomotsu/slide-anim
 * (c) 2017 @yomotsu
 * Released under the MIT License.
 */
const pool = [];
const inAnimItems = {
    add(el, defaultStyle, timeoutId, onCancelled) {
        const inAnimItem = { el, defaultStyle, timeoutId, onCancelled };
        this.remove(el);
        pool.push(inAnimItem);
    },
    remove(el) {
        const index = inAnimItems.findIndex(el);
        if (index === -1)
            return;
        const inAnimItem = pool[index];
        clearTimeout(inAnimItem.timeoutId);
        inAnimItem.onCancelled();
        pool.splice(index, 1);
    },
    find(el) {
        return pool[inAnimItems.findIndex(el)];
    },
    findIndex(el) {
        let index = -1;
        pool.some((item, i) => {
            if (item.el === el) {
                index = i;
                return true;
            }
            return false;
        });
        return index;
    }
};

const CSS_EASEOUT_EXPO = 'cubic-bezier( 0.19, 1, 0.22, 1 )';
function slideDown(el, options = {}) {
    return new Promise((resolve) => {
        if (inAnimItems.findIndex(el) !== -1)
            return;
        const _isVisible = isVisible(el);
        const hasEndHeight = typeof options.endHeight === 'number';
        const display = options.display || 'block';
        const duration = options.duration || 400;
        const onCancelled = options.onCancelled || function () { };
        const defaultStyle = el.getAttribute('style') || '';
        const style = window.getComputedStyle(el);
        const defaultStyles = getDefaultStyles(el, display);
        const isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));
        const contentHeight = defaultStyles.height;
        const minHeight = defaultStyles.minHeight;
        const paddingTop = defaultStyles.paddingTop;
        const paddingBottom = defaultStyles.paddingBottom;
        const borderTop = defaultStyles.borderTop;
        const borderBottom = defaultStyles.borderBottom;
        const cssDuration = `${duration}ms`;
        const cssEasing = CSS_EASEOUT_EXPO;
        const cssTransition = [
            `height ${cssDuration} ${cssEasing}`,
            `min-height ${cssDuration} ${cssEasing}`,
            `padding ${cssDuration} ${cssEasing}`,
            `border-width ${cssDuration} ${cssEasing}`
        ].join();
        const startHeight = _isVisible ? style.height : '0px';
        const startMinHeight = _isVisible ? style.minHeight : '0px';
        const startPaddingTop = _isVisible ? style.paddingTop : '0px';
        const startPaddingBottom = _isVisible ? style.paddingBottom : '0px';
        const startBorderTopWidth = _isVisible ? style.borderTopWidth : '0px';
        const startBorderBottomWidth = _isVisible ? style.borderBottomWidth : '0px';
        const endHeight = (() => {
            if (hasEndHeight)
                return `${options.endHeight}px`;
            return !isBorderBox ?
                `${contentHeight - paddingTop - paddingBottom}px` :
                `${contentHeight + borderTop + borderBottom}px`;
        })();
        const endMinHeight = `${minHeight}px`;
        const endPaddingTop = `${paddingTop}px`;
        const endPaddingBottom = `${paddingBottom}px`;
        const endBorderTopWidth = `${borderTop}px`;
        const endBorderBottomWidth = `${borderBottom}px`;
        if (startHeight === endHeight &&
            startPaddingTop === endPaddingTop &&
            startPaddingBottom === endPaddingBottom &&
            startBorderTopWidth === endBorderTopWidth &&
            startBorderBottomWidth === endBorderBottomWidth) {
            resolve();
            return;
        }
        requestAnimationFrame(() => {
            el.style.height = startHeight;
            el.style.minHeight = startMinHeight;
            el.style.paddingTop = startPaddingTop;
            el.style.paddingBottom = startPaddingBottom;
            el.style.borderTopWidth = startBorderTopWidth;
            el.style.borderBottomWidth = startBorderBottomWidth;
            el.style.display = display;
            el.style.overflow = 'hidden';
            el.style.visibility = 'visible';
            el.style.transition = cssTransition;
            el.style.webkitTransition = cssTransition;
            requestAnimationFrame(() => {
                el.style.height = endHeight;
                el.style.minHeight = endMinHeight;
                el.style.paddingTop = endPaddingTop;
                el.style.paddingBottom = endPaddingBottom;
                el.style.borderTopWidth = endBorderTopWidth;
                el.style.borderBottomWidth = endBorderBottomWidth;
            });
        });
        const timeoutId = setTimeout(() => {
            resetStyle(el);
            el.style.display = display;
            if (hasEndHeight) {
                el.style.height = `${options.endHeight}px`;
                el.style.overflow = `hidden`;
            }
            inAnimItems.remove(el);
            resolve();
        }, duration);
        inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
    });
}
function slideUp(el, options = {}) {
    return new Promise((resolve) => {
        if (inAnimItems.findIndex(el) !== -1)
            return;
        const _isVisible = isVisible(el);
        const display = options.display || 'block';
        const duration = options.duration || 400;
        const onCancelled = options.onCancelled || function () { };
        if (!_isVisible) {
            resolve();
            return;
        }
        const defaultStyle = el.getAttribute('style') || '';
        const style = window.getComputedStyle(el);
        const isBorderBox = /border-box/.test(style.getPropertyValue('box-sizing'));
        const minHeight = pxToNumber(style.getPropertyValue('min-height'));
        const paddingTop = pxToNumber(style.getPropertyValue('padding-top'));
        const paddingBottom = pxToNumber(style.getPropertyValue('padding-bottom'));
        const borderTop = pxToNumber(style.getPropertyValue('border-top-width'));
        const borderBottom = pxToNumber(style.getPropertyValue('border-bottom-width'));
        const contentHeight = el.scrollHeight;
        const cssDuration = duration + 'ms';
        const cssEasing = CSS_EASEOUT_EXPO;
        const cssTransition = [
            `height ${cssDuration} ${cssEasing}`,
            `padding ${cssDuration} ${cssEasing}`,
            `border-width ${cssDuration} ${cssEasing}`
        ].join();
        const startHeight = !isBorderBox ?
            `${contentHeight - paddingTop - paddingBottom}px` :
            `${contentHeight + borderTop + borderBottom}px`;
        const startMinHeight = `${minHeight}px`;
        const startPaddingTop = `${paddingTop}px`;
        const startPaddingBottom = `${paddingBottom}px`;
        const startBorderTopWidth = `${borderTop}px`;
        const startBorderBottomWidth = `${borderBottom}px`;
        requestAnimationFrame(() => {
            el.style.height = startHeight;
            el.style.minHeight = startMinHeight;
            el.style.paddingTop = startPaddingTop;
            el.style.paddingBottom = startPaddingBottom;
            el.style.borderTopWidth = startBorderTopWidth;
            el.style.borderBottomWidth = startBorderBottomWidth;
            el.style.display = display;
            el.style.overflow = 'hidden';
            el.style.transition = cssTransition;
            el.style.webkitTransition = cssTransition;
            requestAnimationFrame(() => {
                el.style.height = '0';
                el.style.minHeight = '0';
                el.style.paddingTop = '0';
                el.style.paddingBottom = '0';
                el.style.borderTopWidth = '0';
                el.style.borderBottomWidth = '0';
            });
        });
        const timeoutId = setTimeout(() => {
            resetStyle(el);
            el.style.display = 'none';
            inAnimItems.remove(el);
            resolve();
        }, duration);
        inAnimItems.add(el, defaultStyle, timeoutId, onCancelled);
    });
}
function slideStop(el) {
    const elementObject = inAnimItems.find(el);
    if (!elementObject)
        return;
    const style = window.getComputedStyle(el);
    const height = style.height;
    const paddingTop = style.paddingTop;
    const paddingBottom = style.paddingBottom;
    const borderTopWidth = style.borderTopWidth;
    const borderBottomWidth = style.borderBottomWidth;
    resetStyle(el);
    el.style.height = height;
    el.style.paddingTop = paddingTop;
    el.style.paddingBottom = paddingBottom;
    el.style.borderTopWidth = borderTopWidth;
    el.style.borderBottomWidth = borderBottomWidth;
    el.style.overflow = 'hidden';
    inAnimItems.remove(el);
}
function isVisible(el) {
    return el.offsetHeight !== 0;
}
function resetStyle(el) {
    el.style.visibility = '';
    el.style.height = '';
    el.style.minHeight = '';
    el.style.paddingTop = '';
    el.style.paddingBottom = '';
    el.style.borderTopWidth = '';
    el.style.borderBottomWidth = '';
    el.style.overflow = '';
    el.style.transition = '';
    el.style.webkitTransition = '';
}
function getDefaultStyles(el, defaultDisplay = 'block') {
    const defaultStyle = el.getAttribute('style') || '';
    const style = window.getComputedStyle(el);
    el.style.visibility = 'hidden';
    el.style.display = defaultDisplay;
    const width = pxToNumber(style.getPropertyValue('width'));
    el.style.position = 'absolute';
    el.style.width = `${width}px`;
    el.style.height = '';
    el.style.minHeight = '';
    el.style.paddingTop = '';
    el.style.paddingBottom = '';
    el.style.borderTopWidth = '';
    el.style.borderBottomWidth = '';
    const minHeight = pxToNumber(style.getPropertyValue('min-height'));
    const paddingTop = pxToNumber(style.getPropertyValue('padding-top'));
    const paddingBottom = pxToNumber(style.getPropertyValue('padding-bottom'));
    const borderTop = pxToNumber(style.getPropertyValue('border-top-width'));
    const borderBottom = pxToNumber(style.getPropertyValue('border-bottom-width'));
    const height = el.scrollHeight;
    el.setAttribute('style', defaultStyle);
    return {
        height,
        minHeight,
        paddingTop,
        paddingBottom,
        borderTop,
        borderBottom
    };
}
function pxToNumber(px) {
    return +px.replace(/px/, '');
}

function accordion(node, options) {
  var labels = t$2(".accordion__label", node);
  var contentContainers = t$2(".accordion__content", node);

  // Make it accessible by keyboard
  labels.forEach(function (label) {
    label.href = "#";
  });
  contentContainers.forEach(function (container) {
    if (container.dataset.measured == "true") {
      u$1(container, "measure");
    }
  });
  var labelClick = e$2(labels, "click", function (e) {
    e.preventDefault();
    var label = e.currentTarget;
    var group = label.parentNode,
      content = label.nextElementSibling;
    slideStop(content);
    if (isVisible(content)) {
      _close(label, group, content);
    } else {
      _open(label, group, content);
      content.dispatchEvent(new CustomEvent("accordion-opened-".concat(content.id)));
    }
  });
  function _open(label, group, content) {
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  }
  function _close(label, group, content) {
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  }
  if (options.firstOpen) {
    // Open first accordion label
    var _labels$ = labels[0],
      group = _labels$.parentNode,
      content = _labels$.nextElementSibling;
    _open(labels[0], group, content);
  }
  function destroy() {
    return function () {
      return labelClick();
    };
  }
  return {
    destroy: destroy
  };
}
function Accordions(elements) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (Array.isArray(elements) && !elements.length) return;
  var defaultOptions = {
    firstOpen: true
  };
  var opts = Object.assign(defaultOptions, options);
  var accordions = [];
  if (elements.length) {
    accordions = elements.map(function (node) {
      return accordion(node, opts);
    });
  } else {
    accordions.push(accordion(elements, opts));
  }
  function unload() {
    accordions.forEach(function (accordion) {
      return accordion.destroy();
    });
  }
  return {
    unload: unload
  };
}

var sel = {
  container: ".social-share",
  button: ".social-share__button",
  input: ".social-share__input",
  popup: ".social-sharing__popup",
  copyURLButton: ".social-share__copy-url",
  successMessage: ".social-share__success-message"
};
var classes$r = {
  hidden: "hidden",
  linkCopied: "social-sharing__popup--success"
};
var SocialShare = (function (node) {
  if (!node) return;
  var button = n$2(sel.button, node);
  var popup = n$2(sel.popup, node);
  var input = n$2(sel.input, node);
  var copyURLButton = n$2(sel.copyURLButton, node);
  var successMessage = n$2(sel.successMessage, node);
  var enableOsShare = button.dataset.enableOsShare;
  var clickListener;

  // Use native OS share if available
  if (navigator.canShare && enableOsShare === "true") {
    var shareData = {
      title: button.dataset.title,
      text: button.dataset.text,
      url: button.dataset.url
    };
    clickListener = e$2(button, "click", function () {
      navigator.share(shareData);
    });
  } else {
    clickListener = e$2(window, "click", handleClick);
  }

  // Close the popup if the header account link is clicked
  c("header-account-link:clicked", close);

  // Hide copy button on old browsers
  if (!navigator.clipboard || !navigator.clipboard.writeText) {
    u$1(copyURLButton, classes$r.hidden);
  }
  function handleClick(evt) {
    var buttonClicked = evt.target.closest(sel.button) === button;
    var popupClicked = evt.target.closest(sel.popup) === popup;
    var inputClicked = evt.target.closest(sel.input) === input;
    var copyURLClicked = evt.target.closest(sel.copyURLButton) === copyURLButton;
    var isActive = false;
    if (buttonClicked) {
      isActive = button.getAttribute("aria-expanded") === "true";
    }

    // click happened outside of this popup
    if (!popupClicked) {
      close();
    }

    // click happened in this social button and the button is not active
    if (buttonClicked && !isActive) {
      open();
    }
    if (inputClicked) {
      input.select();
    }
    if (copyURLClicked) {
      var url = copyURLButton.dataset.url;
      writeToClipboard(url).then(showSuccessMessage, showErrorMessage);
    }
  }
  function close() {
    button.setAttribute("aria-expanded", false);
    popup.setAttribute("aria-hidden", true);
  }
  function open() {
    button.setAttribute("aria-expanded", true);
    popup.setAttribute("aria-hidden", false);
  }
  function writeToClipboard(str) {
    return navigator.clipboard.writeText(str);
  }
  function showMessage(message) {
    successMessage.innerHTML = message;
    i$1(successMessage, classes$r.hidden);
    u$1(popup, classes$r.linkCopied);
    setTimeout(function () {
      u$1(successMessage, classes$r.hidden);
      i$1(popup, classes$r.linkCopied);
    }, 2000);
  }
  function showSuccessMessage() {
    var successMessage = copyURLButton.dataset.successMessage;
    showMessage(successMessage);
  }
  function showErrorMessage() {
    var _window$Shopify;
    if ((_window$Shopify = window.Shopify) !== null && _window$Shopify !== void 0 && _window$Shopify.designMode) return;
    var errorMessage = copyURLButton.dataset.errorMessage;
    showMessage(errorMessage || "Error copying link.");
  }
  function unload() {
    close();
    clickListener();
  }
  return {
    unload: unload
  };
});

var selectors$_ = {
  wrapper: "[data-truncate-wrapper]",
  content: "[data-truncate-wrapper-content]",
  toggle: "[data-truncate-toggle]",
  accordionContent: ".accordion__content"
};
var classes$q = {
  disableTruncation: "truncate-wrapper--disabled"
};
var truncateWrapper = (function (node) {
  if (!node) return;
  var wrapperEls = t$2(selectors$_.wrapper, node);
  if (wrapperEls.length < 1) return;
  var events = [];
  var _toggleExpanded = function _toggleExpanded(e, wrapperEl) {
    var contentExpanded = wrapperEl.dataset.contentExpanded;
    wrapperEl.dataset.contentExpanded = contentExpanded === "true" ? "false" : "true";
  };
  var _toggleTruncation = function _toggleTruncation(wrapperEl) {
    var accordionWrapper = wrapperEl.closest(selectors$_.accordionContent);
    var contentEl = n$2(selectors$_.content, wrapperEl);
    var accordionWasClosed = false;
    if (accordionWrapper && accordionWrapper.style.display === "none") {
      accordionWasClosed = true;
      accordionWrapper.style.display = "block";
    }
    if (contentEl) {
      var contentFit = contentEl.scrollHeight > contentEl.clientHeight;
      wrapperEl.classList.toggle(classes$q.disableTruncation, !contentFit);
    }
    if (accordionWrapper && accordionWasClosed) {
      accordionWrapper.style.display = "none";
    }
  };
  var _initAccordion = function _initAccordion(wrapperEl) {
    var accordionWrapper = wrapperEl.closest(selectors$_.accordionContent);

    // If the accordion defaults to open, we don't need to re-run `_toggleTruncation`, but if
    // the window has been resized, we do.
    if (accordionWrapper && accordionWrapper.dataset.defaultExpanded === "false") {
      accordionWrapper.addEventListener("accordion-opened-".concat(accordionWrapper.id), function () {
        return _toggleTruncation(wrapperEl);
      }, {
        once: true
      });
    }
  };
  wrapperEls.forEach(function (wrapperEl) {
    _toggleTruncation(wrapperEl);
    var toggleEl = n$2(selectors$_.toggle, wrapperEl);
    events.push(e$2(toggleEl, "click", function (e) {
      return _toggleExpanded(e, wrapperEl);
    }));
    _initAccordion(wrapperEl);
  });
  events.push(c("window:width-changed", function () {
    wrapperEls.forEach(function (wrapperEl) {
      _toggleTruncation(wrapperEl);
    });
  }));
  var unload = function unload() {
    events === null || events === void 0 ? void 0 : events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
});

function quantityInputInit (container) {
  var quantityWrappers = t$2("[data-quantity-selector]", container);
  if (!quantityWrappers || quantityWrappers.length === 0) return;
  var events = [];
  var inputs = [];
  var updateAllInputs = function updateAllInputs(val) {
    inputs.forEach(function (input) {
      return input.value = val;
    });
  };
  var handleInputChange = function handleInputChange(e) {
    updateAllInputs(e.target.value);
  };
  var handleAddQuantity = function handleAddQuantity(quantityInput) {
    var currentValue = parseInt(quantityInput.value, 10);
    var newValue = currentValue + 1;
    updateAllInputs(newValue);
    quantityInput.dispatchEvent(new Event("change"));
  };
  var handleSubtractQuantity = function handleSubtractQuantity(quantityInput) {
    var currentValue = parseInt(quantityInput.value, 10);
    if (currentValue === 1) return;
    var newValue = currentValue - 1;
    updateAllInputs(newValue);
    quantityInput.dispatchEvent(new Event("change"));
  };
  var handleCartItemCount = function handleCartItemCount(cartItemCount, quantity) {
    var displayedItemCount = n$2(".item_count", cartItemCount);
    cartItemCount.dataset.cartItemCount = quantity;
    displayedItemCount.textContent = quantity;
  };

  // check for multiple instances of quantity-input, e.g. product block or optional input in product form
  quantityWrappers.forEach(function (el) {
    var quantityIsForProductCard = el.closest(".product-item");
    // Product blocks can contain product cards that are not associated with the template product.
    if (quantityIsForProductCard) return;
    var quantityInput = n$2("[data-quantity-input]", el);
    var addQuantity = n$2("[data-add-quantity]", el);
    var subtractQuantity = n$2("[data-subtract-quantity]", el);
    var cartItemCount = n$2("[data-cart-item-count]", el.previousElementSibling);

    // track all input instances to update all on change
    inputs.push(quantityInput);
    events.push(e$2(addQuantity, "click", function () {
      return handleAddQuantity(quantityInput);
    }), e$2(subtractQuantity, "click", function () {
      return handleSubtractQuantity(quantityInput);
    }), e$2(quantityInput, "change", handleInputChange));
    if (cartItemCount) {
      events.push(c("theme-internal:update-quantity-selector-counts", function (_ref) {
        var id = _ref.id,
          quantity = _ref.quantity;
        if (parseInt(container.dataset.currentProductId, 10) === id) {
          handleCartItemCount(cartItemCount, quantity);
        }
      }));
    }
  });
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
}

var selectors$Z = {
  popupTrigger: "[data-popup-trigger]"
};
var informationPopup = function informationPopup(node) {
  var events = [];
  var popupTriggers = t$2(selectors$Z.popupTrigger, node);
  if (!popupTriggers.length) {
    return;
  }
  var listener = e$2(popupTriggers, "click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var modalContentId = e.target.dataset.modalContentId;
    var content = n$2("#".concat(modalContentId), node);
    r$1("modal:open", null, {
      modalContent: content
    });
  });
  events.push(listener);
  function unload() {
    events.forEach(function (evt) {
      return evt();
    });
  }
  return {
    unload: unload
  };
};

var strings$7 = window.theme.strings.products;
var selectors$Y = {
  price: "[data-price]",
  comparePrice: "[data-compare-price]"
};
function updatePrices (els, variant) {
  var prices = els.flatMap(function (el) {
    return t$2(selectors$Y.price, el);
  });
  var comparePrices = els.flatMap(function (el) {
    return t$2(selectors$Y.comparePrice, el);
  });
  var unavailableString = strings$7.product.unavailable;
  if (!variant) {
    prices.forEach(function (el) {
      return el.innerHTML = unavailableString;
    });
    comparePrices.forEach(function (el) {
      return el.innerHTML = "";
    });
    return;
  }
  prices.forEach(function (el) {
    return el.innerHTML = formatMoney(variant.price);
  });
  comparePrices.forEach(function (el) {
    return el.innerHTML = variant.compare_at_price > variant.price ? formatMoney(variant.compare_at_price) : "";
  });
}

var selectors$X = {
  productSku: "[data-product-sku]",
  productSkuContainer: ".product__vendor_and_sku"
};
var strings$6 = window.theme.strings.products;
function updateSku (container, variant) {
  var skuElements = t$2(selectors$X.productSku, container);
  var skuContainers = t$2(selectors$X.productSkuContainer, container);
  if (!skuElements.length) return;
  var sku = strings$6.product.sku;
  var skuString = function skuString(value) {
    return "".concat(sku, ": ").concat(value);
  };
  if (!variant || !variant.sku) {
    skuElements.forEach(function (skuElement) {
      return skuElement.innerText = "";
    });
    skuContainers.forEach(function (skuContainer) {
      return skuContainer.setAttribute("data-showing-sku", false);
    });
    return;
  }
  skuElements.forEach(function (skuElement) {
    return skuElement.innerText = skuString(variant.sku);
  });
  skuContainers.forEach(function (skuContainer) {
    return skuContainer.setAttribute("data-showing-sku", true);
  });
}

function updateBuyButton (btn, variant) {
  var text = n$2("[data-add-to-cart-text]", btn);
  var _btn$dataset = btn.dataset,
    langAvailable = _btn$dataset.langAvailable,
    langUnavailable = _btn$dataset.langUnavailable,
    langSoldOut = _btn$dataset.langSoldOut;
  if (!variant) {
    btn.setAttribute("disabled", "disabled");
    text.textContent = langUnavailable;
  } else if (variant.available) {
    btn.removeAttribute("disabled");
    text.textContent = langAvailable;
  } else {
    btn.setAttribute("disabled", "disabled");
    text.textContent = langSoldOut;
  }
}

var selectors$W = {
  productReviewsSummary: ".spr-summary",
  productReviewsCaption: ".spr-summary-caption",
  productReviewsStarrating: ".spr-summary-starrating"
};
function reviewsFormatter (reviews, rating) {
  if (!reviews.length) return;
  var reviewsLoaded = false;

  // Allow for actions after Shopify Product Reviews loads
  window.SPRCallbacks = {};
  window.SPRCallbacks.onReviewsLoad = function () {
    if (reviewsLoaded) return;

    // Add rating number to Shopify Product Reviews summary
    var productRatingFormatted = parseFloat(rating).toFixed(1);
    if (productRatingFormatted && !isNaN(productRatingFormatted)) {
      var captionGroupDiv = document.createElement("div");
      var ratingDiv = document.createElement("div");
      ratingDiv.textContent = productRatingFormatted;
      u$1(captionGroupDiv, "spr-summary-caption-group");
      u$1(ratingDiv, "spr-summary-rating");
      reviews.forEach(function (instance) {
        var reviewsSummary = n$2(selectors$W.productReviewsSummary, instance);
        var reviewsCaption = n$2(selectors$W.productReviewsCaption, instance);
        var reviewsStarrating = n$2(selectors$W.productReviewsStarrating, instance);
        captionGroupDiv.prepend(reviewsCaption);
        captionGroupDiv.prepend(reviewsStarrating);
        reviewsSummary.prepend(captionGroupDiv);
        reviewsSummary.prepend(ratingDiv);
      });
      reviewsLoaded = true;
    }
  };
}

function OptionButtons(els) {
  var groups = els.map(createOptionGroup);
  return groups;
}
function createOptionGroup(el) {
  var select = n$2("select", el);
  var buttons = t$2("[data-button]", el);
  var buttonClick = e$2(buttons, "click", function (e) {
    e.preventDefault();
    var buttonEl = e.currentTarget;
    var optionHandle = buttonEl.dataset.optionHandle;
    buttons.forEach(function (btn) {
      l(btn, "selected", btn.dataset.optionHandle === optionHandle);
    });
    var opt = n$2("[data-value-handle=\"".concat(optionHandle, "\"]"), select);
    opt.selected = true;
    select.dispatchEvent(new Event("change"));
  });
  return buttonClick;
}

var selectors$V = {
  counterContainer: "[data-inventory-counter]",
  inventoryMessage: ".inventory-counter__message-text",
  inventoryTransferMessage: ".inventory-counter__transfer-notice",
  countdownBar: ".inventory-counter__bar",
  progressBar: ".inventory-counter__bar-progress"
};
var classes$p = {
  hidden: "hidden",
  inventoryLow: "inventory--low",
  inventoryEmpty: "inventory--empty",
  inventoryUnavailable: "inventory--unavailable"
};
var inventoryCounter = function inventoryCounter(container, config) {
  var variantsInventories = config.variantsInventories;
  var counterContainer = n$2(selectors$V.counterContainer, container);
  var inventoryMessageElement = n$2(selectors$V.inventoryMessage, container);
  var inventoryTransferMessageElement = n$2(selectors$V.inventoryTransferMessage, container);
  var progressBar = n$2(selectors$V.progressBar, container);
  var _counterContainer$dat = counterContainer.dataset,
    lowInventoryThreshold = _counterContainer$dat.lowInventoryThreshold,
    showUntrackedQuantity = _counterContainer$dat.showUntrackedQuantity,
    stockCountdownMax = _counterContainer$dat.stockCountdownMax,
    unavailableText = _counterContainer$dat.unavailableText;

  // If the threshold or countdownmax contains anything but numbers abort
  if (!lowInventoryThreshold.match(/^[0-9]+$/) || !stockCountdownMax.match(/^[0-9]+$/)) {
    return;
  }
  var threshold = parseInt(lowInventoryThreshold, 10);
  var countDownMax = parseInt(stockCountdownMax, 10);
  l(counterContainer, classes$p.hidden, !productInventoryValid(variantsInventories[config.id]));
  checkThreshold(variantsInventories[config.id]);
  setProgressBar(variantsInventories[config.id].inventory_quantity, variantsInventories[config.id].inventory_management);
  setInventoryMessage(variantsInventories[config.id].inventory_message);
  setInventoryTransferMessage(variantsInventories[config.id].inventory_transfer_message);
  function checkThreshold(_ref) {
    var inventory_policy = _ref.inventory_policy,
      inventory_quantity = _ref.inventory_quantity,
      inventory_management = _ref.inventory_management;
    i$1(counterContainer, classes$p.inventoryLow);
    if (inventory_management !== null) {
      if (inventory_quantity <= 0 && inventory_policy === "deny") {
        u$1(counterContainer, classes$p.inventoryEmpty);
        counterContainer.setAttribute("data-stock-category", "empty");
      } else if (inventory_quantity <= threshold || inventory_quantity <= 0 && inventory_policy === "continue") {
        counterContainer.setAttribute("data-stock-category", "low");
      } else {
        counterContainer.setAttribute("data-stock-category", "sufficient");
      }
    } else if (inventory_management === null && showUntrackedQuantity == "true") {
      counterContainer.setAttribute("data-stock-category", "sufficient");
    }
  }
  function setProgressBar(inventoryQuantity, inventoryManagement) {
    if (inventoryManagement === null && showUntrackedQuantity == "true") {
      progressBar.style.width = "".concat(100, "%");
      return;
    }
    if (inventoryQuantity <= 0) {
      progressBar.style.width = "".concat(0, "%");
      return;
    }
    var progressValue = inventoryQuantity < countDownMax ? inventoryQuantity / countDownMax * 100 : 100;
    progressBar.style.width = "".concat(progressValue, "%");
  }
  function setInventoryMessage(message) {
    inventoryMessageElement.innerText = message;
  }
  function setInventoryTransferMessage(message) {
    inventoryTransferMessageElement.innerText = message;
  }
  function productInventoryValid(product) {
    return product.inventory_message && (product.inventory_management !== null || product.inventory_management === null && showUntrackedQuantity == "true");
  }
  var update = function update(variant) {
    if (!variant) {
      setUnavailable();
      return;
    }
    checkThreshold(variantsInventories[variant.id]);
    setProgressBar(variantsInventories[variant.id].inventory_quantity, variantsInventories[variant.id].inventory_management);
    setInventoryMessage(variantsInventories[variant.id].inventory_message);
    setInventoryTransferMessage(variantsInventories[variant.id].inventory_transfer_message);
    l(counterContainer, classes$p.hidden, !productInventoryValid(variantsInventories[variant.id]));
  };
  function setUnavailable() {
    i$1(counterContainer, classes$p.hidden);
    u$1(counterContainer, classes$p.inventoryUnavailable);
    counterContainer.setAttribute("data-stock-category", "unavailable");
    setProgressBar(0);
    setInventoryMessage(unavailableText);
    setInventoryTransferMessage("");
  }
  return {
    update: update
  };
};

var selectors$U = {
  item: ".product-item",
  itemInner: ".product-item__inner",
  itemMedia: ".product-item__image-link",
  itemBadges: ".product-badges",
  itemTitle: ".product-item__product-title",
  quantityWrapper: ".quantity-input",
  quickAddWrapper: ".product-item__quick-add-wrapper",
  quickAddButton: ".product-item__quick-add",
  quickViewButton: ".show-product-quick-view",
  hoverableSwatch: ".product-swatches-options__item[data-has-hover-interaction='true']",
  hoverableSwatchContainer: ".product-swatches-options__list",
  largeSwatchPreview: ".product-item__image__swatch_preview"
};
var classes$o = {
  active: "active",
  updatingQuantity: "pending-quantity-update"
};
function ProductItem(container) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    afterLoad: false // Set this to true if initialized beyond initial page load
  };

  var items = t$2(selectors$U.item, container);
  if (!items.length) return;
  var productItemAnimations = animateProductItem(items);
  var quickAddWrappers = t$2(selectors$U.quickAddWrapper, container);
  var quickAddButtons = t$2(selectors$U.quickAddButton, container);
  var quickViewButtons = t$2(selectors$U.quickViewButton, container);
  var quickAddInstances = [];
  quickAddWrappers.forEach(function (wrapper) {
    quickAddInstances.push(initQuickAddTemplateCounters(wrapper, {
      afterLoad: options.afterLoad
    }));
    quickAddInstances.push(initQuickAddQuantitySelectors(wrapper));
  });

  // TODO: Enable when we set this functionality up in 1.1+
  /* const hoverableSwatches = qsa(selectors.hoverableSwatch, container);
  const hoverableSwatchContainers = qsa(
    selectors.hoverableSwatchContainer,
    container
  ); */

  // If there's a click outside a quick add, remove the active
  // class (ie. hide quantity selector, and show button)
  var delegate = new Delegate(container);
  delegate.on("click", null, function (e) {
    var quickAddWrapper = e.target.closest(selectors$U.quickAddWrapper);
    if (!quickAddWrapper) {
      deactivateQuickAddWrappers();
    }
  });
  var events = [e$2(quickAddButtons, "click", function (e) {
    var parentWrapper = e.currentTarget.closest(selectors$U.quickAddWrapper);
    var _parentWrapper$datase = parentWrapper.dataset,
      hasVariants = _parentWrapper$datase.hasVariants;
      _parentWrapper$datase.productId;
    deactivateQuickAddWrappers();
    if (hasVariants === "true") {
      e.preventDefault();
      e.stopPropagation();

      // Removing until the quick add functionaliy can be more fleshed out.
      /*const template = qs(
        `#quick-add-modal-content-for-id-${productId}`,
        container
      );*/

      /*emit("modal:open", null, {
        modalContent: template.content,
        quickAdd: true,
      });*/

      var productEl = e.currentTarget.closest(selectors$U.item);
      var url = productEl.dataset.url;
      var title = productEl.dataset.title;
      r$1("quick-add:open", null, {
        type: "quick-add",
        productUrl: url,
        productTitle: title
      });
    } else {
      var _e$currentTarget$data = e.currentTarget.dataset,
        quantityInCart = _e$currentTarget$data.quantityInCart,
        variantId = _e$currentTarget$data.variantId;
      if (parseInt(quantityInCart) < 1) {
        var currentQuantityInput = n$2(selectors$U.quantityWrapper, parentWrapper);
        var currentInput = n$2("input", parentWrapper);
        u$1(currentQuantityInput, classes$o.updatingQuantity);
        currentInput.value = 1;
        cart.addItemById(variantId, 1);
      }
      u$1(parentWrapper, classes$o.active);
    }
  }), e$2(quickViewButtons, "click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var clickedEl = e.currentTarget;
    var productEl = clickedEl.closest(selectors$U.item);
    var url = productEl.dataset.url;
    var media = n$2(selectors$U.itemMedia, productEl);
    var badges = n$2(selectors$U.itemBadges, productEl);
    var title = productEl.dataset.title;
    r$1("quick-view:open", null, {
      type: "quick-view",
      productUrl: url,
      productMedia: media,
      productBadges: badges,
      productTitle: title
    });
    deactivateQuickAddWrappers();
  })

  // TODO: Enable when we set this functionality up in 1.1+
  /* listen(hoverableSwatches, "mouseenter", e => {
    const swatchEl = e.currentTarget;
    const productEl = swatchEl.closest(selectors.item);
    const largeSwatchPreviewEl = qs(selectors.largeSwatchPreview, productEl);
    const backgroundType = swatchEl.dataset.swatchColorType;
     largeSwatchPreviewEl.style.backgroundColor = "";
    largeSwatchPreviewEl.style.backgroundImage = "";
     if (backgroundType === "image") {
      // Using small and large bg image to avoid loading flash (small is loaded first, and large is overlaid)
      largeSwatchPreviewEl.style.backgroundImage = `url('${swatchEl.dataset.colorImageLarge}'), ${swatchEl.style.backgroundImage}`;
    } else if (backgroundType === "color") {
      largeSwatchPreviewEl.style.backgroundColor = swatchEl.dataset.color;
    }
     largeSwatchPreviewEl.classList.add("visible");
  }),
   listen(hoverableSwatchContainers, "mouseleave", e => {
    const productEl = e.currentTarget.closest(selectors.item);
    const largeSwatchPreviewEl = qs(selectors.largeSwatchPreview, productEl);
    largeSwatchPreviewEl.classList.remove("visible");
  }), */];

  var deactivateQuickAddWrappers = function deactivateQuickAddWrappers() {
    quickAddWrappers.forEach(function (wrapper) {
      i$1(wrapper, classes$o.active);
    });
  };
  var unload = function unload() {
    productItemAnimations.destroy();
    quickAddInstances.forEach(function (instance) {
      return instance.unload();
    });
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
}

var selectors$T = {
  wrappingContainer: ".product__block-complementary-products",
  complementaryProducts: "[data-complementary-products]",
  complementaryProductsContent: "[data-complementary-products-content]",
  productItem: ".product-item"
};
var complementaryProducts = function complementaryProducts(node) {
  var complementaryProducts = t$2(selectors$T.complementaryProducts, node);
  if (!complementaryProducts.length) return;
  var productItems;
  var _complementaryProduct = complementaryProducts[0].dataset,
    recommendationsType = _complementaryProduct.recommendationsType,
    id = _complementaryProduct.productId,
    sectionId = _complementaryProduct.sectionId,
    maxRecommendations = _complementaryProduct.maxRecommendations;
  if (recommendationsType === "app-recommendations") {
    handleRecommendedProducts();
  } else {
    // Merchant is using custom product list
    productItems = complementaryProducts.forEach(function (productContainer) {
      return ProductItem(productContainer);
    });
  }
  function handleRecommendedProducts() {
    var requestUrl = "".concat(window.theme.routes.productRecommendations, "?section_id=").concat(sectionId, "&limit=").concat(maxRecommendations, "&product_id=").concat(id, "&intent=complementary");
    fetch(requestUrl).then(function (response) {
      return response.text();
    }).then(function (text) {
      var html = document.createElement("div");
      html.innerHTML = text;
      var recommendations = n$2(selectors$T.complementaryProducts, html);
      var renderedProducts = t$2(selectors$T.productItem, recommendations);
      if (recommendations && recommendations.innerHTML.trim().length && renderedProducts.length) {
        complementaryProducts.forEach(function (block) {
          return block.innerHTML = recommendations.innerHTML;
        });
        productItems = complementaryProducts.map(function (productContainer) {
          return ProductItem(productContainer);
        });

        // Remove hidden flag as content has been fetched
        complementaryProducts.forEach(function (block) {
          i$1(block.closest(selectors$T.wrappingContainer), "hidden");
        });
      }
    }).catch(function (error) {
      throw error;
    });
  }
  function unload() {
    productItems.forEach(function (item) {
      return item.unload();
    });
  }
  return {
    unload: unload
  };
};

var selectors$S = {
  recommendedProductsSidebar: "[data-product-sidebar-recommendations]",
  recommendedProductsContent: "[data-product-sidebar-recommendations-content]",
  recommendedProducts: "[data-product-sidebar-recommendations-products]",
  sidebarItems: "[data-details-sidebar-items]",
  miniItems: ".product__sidebar-recommendations-mini-desktop"
};
var classes$n = {
  hasSidebar: "product--has-sidebar"
};
var sidebarRecommendations = function sidebarRecommendations(node) {
  var recommendedProductsSidebar = n$2(selectors$S.recommendedProductsSidebar, node);
  var recommendedProductsContent = n$2(selectors$S.recommendedProductsContent, node);
  var sidebarItems = n$2(selectors$S.sidebarItems, node);
  if (!recommendedProductsSidebar) return;
  var productItems = [];
  var _recommendedProductsS = recommendedProductsSidebar.dataset,
    id = _recommendedProductsS.productId,
    sectionId = _recommendedProductsS.sectionId,
    maxRecommendations = _recommendedProductsS.maxRecommendations;
  handleRecommendedProducts();
  function handleRecommendedProducts() {
    var requestUrl = "".concat(window.theme.routes.productRecommendations, "?section_id=").concat(sectionId, "&limit=").concat(maxRecommendations, "&product_id=").concat(id);
    fetch(requestUrl).then(function (response) {
      return response.text();
    }).then(function (text) {
      var html = document.createElement("div");
      html.innerHTML = text;
      var content = n$2(selectors$S.recommendedProductsContent, html);
      var recommendations = n$2(selectors$S.recommendedProducts, html);
      if (recommendations && recommendations.innerHTML.trim().length) {
        recommendedProductsContent.innerHTML = content.innerHTML;
        productItems.push(ProductItem(recommendedProductsContent));

        // Inject content within product meta if enabled. Only visible
        // above certain screen widths.
        if (sidebarItems) {
          var miniItems = n$2(selectors$S.miniItems, recommendations);
          sidebarItems.appendChild(miniItems);
          productItems.push(ProductItem(sidebarItems));
        }

        // Remove hidden flag as content has been fetched
        i$1(recommendedProductsSidebar, "hidden");
      } else {
        i$1(node, classes$n.hasSidebar);
        i$1(sidebarItems.parentNode, "visible");
      }
    }).catch(function (error) {
      throw error;
    });
  }
  function unload() {
    productItems.forEach(function (item) {
      return item.unload();
    });
  }
  return {
    unload: unload
  };
};

var strings$5 = window.theme.strings.products;
var classes$m = {
  disabled: "disabled"
};
var selectors$R = {
  variantsWrapper: ".product__variants-wrapper",
  variantsJson: "[data-variant-json]",
  input: ".dynamic-variant-input",
  inputWrap: ".dynamic-variant-input-wrap",
  inputWrapWithValue: function inputWrapWithValue(option) {
    return "".concat(selectors$R.inputWrap, "[data-index=\"").concat(option, "\"]");
  },
  buttonWrap: ".dynamic-variant-button",
  buttonWrapWithValue: function buttonWrapWithValue(value) {
    return "".concat(selectors$R.buttonWrap, "[data-option-value=\"").concat(value, "\"]");
  }
};

/**
 *  VariantAvailability
    - Cross out sold out or unavailable variants
    - Required markup:
      - class=dynamic-variant-input-wrap + data-index="option{{ forloop.index }}" to wrap select or button group
      - class=dynamic-variant-input + data-index="option{{ forloop.index }}" to wrap selects associated with variant potentially hidden if swatch / chip
      - class=dynamic-variant-button + data-value="{{ value | escape }}" to wrap button of swatch / chip
      - hidden product variants json markup
  * @param {node} container product container element
  * @returns {unload} remove event listeners
 */
function variantAvailabilityInit (container) {
  var variantsWrapper = n$2(selectors$R.variantsWrapper, container);
  var unavailableString = strings$5.product.unavailable;

  // Variant options block do not exist
  if (!variantsWrapper) return;
  var _variantsWrapper$data = variantsWrapper.dataset,
    enableDynamicProductOptions = _variantsWrapper$data.enableDynamicProductOptions,
    currentVariantId = _variantsWrapper$data.currentVariantId;
  if (enableDynamicProductOptions === "false") return;
  var productVariants = JSON.parse(n$2(selectors$R.variantsJson, container).innerText);

  // Using associated selects as buy buttons may be disabled.
  var variantSelectors = t$2(selectors$R.input, container);
  var variantSelectorWrappers = t$2(selectors$R.inputWrap, container);
  var events = [];
  init();
  function init() {
    variantSelectors.forEach(function (el) {
      events.push(e$2(el, "change", handleChange));
    });
    setInitialAvailability();
  }
  function setInitialAvailability() {
    // Disable all options on initial load
    variantSelectorWrappers.forEach(function (group) {
      return disableVariantGroup(group);
    });
    var initiallySelectedVariant = productVariants.find(function (variant) {
      return variant.id === parseInt(currentVariantId, 10);
    });
    var currentlySelectedValues = initiallySelectedVariant.options.map(function (value, index) {
      return {
        value: value,
        index: "option".concat(index + 1)
      };
    });
    var initialOptions = createAvailableOptionsTree(productVariants, currentlySelectedValues);
    for (var _i = 0, _Object$entries = Object.entries(initialOptions); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        option = _Object$entries$_i[0],
        values = _Object$entries$_i[1];
      manageOptionState(option, values);
    }
  }

  // Create a list of all options. If any variant exists and is in stock with that option, it's considered available
  function createAvailableOptionsTree(variants, currentlySelectedValues) {
    // Reduce variant array into option availability tree
    return variants.reduce(function (options, variant) {
      // Check each option group (e.g. option1, option2, option3) of the variant
      Object.keys(options).forEach(function (index) {
        if (variant[index] === null) return;
        var entry = options[index].find(function (option) {
          return option.value === variant[index];
        });
        if (typeof entry === "undefined") {
          // If option has yet to be added to the options tree, add it
          entry = {
            value: variant[index],
            soldOut: true
          };
          options[index].push(entry);
        }
        var currentOption1 = currentlySelectedValues.find(function (_ref) {
          var index = _ref.index;
          return index === "option1";
        });
        var currentOption2 = currentlySelectedValues.find(function (_ref2) {
          var index = _ref2.index;
          return index === "option2";
        });
        switch (index) {
          case "option1":
            // Option1 inputs should always remain enabled based on all available variants
            entry.soldOut = entry.soldOut && variant.available ? false : entry.soldOut;
            break;
          case "option2":
            // Option2 inputs should remain enabled based on available variants that match first option group
            if (currentOption1 && variant.option1 === currentOption1.value) {
              entry.soldOut = entry.soldOut && variant.available ? false : entry.soldOut;
            }
            break;
          case "option3":
            // Option 3 inputs should remain enabled based on available variants that match first and second option group
            if (currentOption1 && variant.option1 === currentOption1.value && currentOption2 && variant.option2 === currentOption2.value) {
              entry.soldOut = entry.soldOut && variant.available ? false : entry.soldOut;
            }
        }
      });
      return options;
    }, {
      option1: [],
      option2: [],
      option3: []
    });
  }
  function handleChange() {
    var currentlySelectedValues = variantSelectors.map(function (el) {
      return {
        value: el.value,
        index: el.id
      };
    });
    setAvailability(currentlySelectedValues);
  }
  function setAvailability(selectedValues) {
    // Object to hold all options by value.
    // This will be what sets a button/dropdown as
    // sold out or unavailable (not a combo set as purchasable)
    var valuesToManage = createAvailableOptionsTree(productVariants, selectedValues);

    // Loop through all option levels and send each
    // value w/ args to function that determines to show/hide/enable/disable
    for (var _i2 = 0, _Object$entries2 = Object.entries(valuesToManage); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
        option = _Object$entries2$_i[0],
        values = _Object$entries2$_i[1];
      manageOptionState(option, values);
    }
  }
  function manageOptionState(option, values) {
    var group = n$2(selectors$R.inputWrapWithValue(option), container);

    // Loop through each option value
    values.forEach(function (obj) {
      toggleVariantOption(group, obj);
    });
  }
  function toggleVariantOption(group, obj) {
    // Selecting by value so escape it
    var value = escapeQuotes(obj.value);

    // Append unavailable text to dropdowns
    if (a$1(group, "select-wrapper")) {
      group.querySelector("option[value=\"".concat(value, "\"]")).disabled = Boolean(obj.soldOut);
      if (obj.soldOut) {
        group.querySelector("option[value=\"".concat(value, "\"]")).textContent = "".concat(obj.value, " - ").concat(unavailableString);
      } else {
        group.querySelector("option[value=\"".concat(value, "\"]")).textContent = "".concat(obj.value);
      }
    } else {
      var button = n$2(selectors$R.buttonWrapWithValue(value), group);
      // Variant exists - enable & show variant
      i$1(button, classes$m.disabled);
      // Variant sold out - cross out option (remains selectable)
      if (obj.soldOut) {
        u$1(button, classes$m.disabled);
      }
    }
  }
  function disableVariantGroup(group) {
    if (a$1(group, "select-wrapper")) {
      t$2("option", group).forEach(function (option) {
        option.disabled = true;
      });
    } else {
      t$2(selectors$R.buttonWrap, group).forEach(function (button) {
        return u$1(button, classes$m.disabled);
      });
    }
  }
  function escapeQuotes(str) {
    var escapeMap = {
      '"': '\\"',
      "'": "\\'"
    };
    return str.replace(/"|'/g, function (m) {
      return escapeMap[m];
    });
  }
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
}

var selectors$Q = {
  siblingProducts: "[data-sibling-products]",
  siblingSwatch: "[data-sibling-swatch]",
  siblingLabelEl: "[data-sibling-label-value]"
};
function siblingProductsInit (container) {
  var siblingProducts = n$2(selectors$Q.siblingProducts, container);
  if (!siblingProducts) return;
  var siblingSwatches = t$2(selectors$Q.siblingSwatch, siblingProducts);
  var labelValueEl = n$2(selectors$Q.siblingLabelEl, siblingProducts);
  var baseLabel = labelValueEl.innerText;
  var events = [];
  siblingSwatches.forEach(function (item) {
    events.push(e$2(item, "mouseout", function () {
      return handleOut();
    }), e$2(item, "mouseover", function (e) {
      return handleOver(e);
    }));
  });
  function handleOver(e) {
    var cutline = e.target.dataset.siblingCutline;
    labelValueEl.innerText = cutline;
  }
  function handleOut() {
    if (labelValueEl.innerText !== baseLabel) {
      labelValueEl.innerText = baseLabel;
    }
  }
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
}

var loaded$1 = null;
function loadYouTubeAPI() {
  // Loading was triggered by a previous call to function
  if (loaded$1 !== null) return loaded$1;

  // API has already loaded
  if (window.YT && window.YT.loaded) {
    loaded$1 = Promise.resolve();
    return loaded$1;
  }

  // Otherwise, load API
  loaded$1 = new Promise(function (resolve) {
    window.onYouTubeIframeAPIReady = function () {
      resolve();
    };
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  });
  return loaded$1;
}

var loaded = null;
function loadVimeoAPI() {
  // Loading was triggered by a previous call to function
  if (loaded !== null) return loaded;

  // API has already loaded
  if (window.Vimeo) {
    loaded = Promise.resolve();
    return loaded;
  }

  // Otherwise, load API
  loaded = new Promise(function (resolve) {
    var tag = document.createElement("script");
    tag.src = "https://player.vimeo.com/api/player.js";
    tag.onload = resolve;
    document.body.appendChild(tag);
  });
  return loaded;
}

function media(node) {
  var externalVideos = t$2(".js-youtube, .js-vimeo");
  var externalVideoPlayers = [];
  var modelEls = t$2("model-viewer", node);
  if (externalVideos.length) {
    initExternalVideos(externalVideoPlayers);
  }
  if (modelEls.length) {
    initModels();
  }
  function initExternalVideos(externalVideoPlayers) {
    externalVideos.forEach(function (video) {
      var parent = video.closest(".media");
      var _parent$dataset = parent.dataset,
        host = _parent$dataset.host,
        videoId = _parent$dataset.videoId;
      switch (host) {
        case "youtube":
          loadYouTubeAPI().then(function () {
            var player = new window.YT.Player(video, {
              videoId: videoId,
              playerVars: {
                autohide: 0,
                cc_load_policy: 0,
                controls: 1,
                iv_load_policy: 3,
                modestbranding: 1,
                playsinline: 1,
                rel: 0,
                playlist: videoId
              }
            });
            externalVideoPlayers.push(player);
          });
          break;
        case "vimeo":
          loadVimeoAPI().then(function () {
            var player = new window.Vimeo.Player(video, {
              id: videoId,
              controls: true,
              keyboard: false
            });
            externalVideoPlayers.push(player);
          });
          break;
      }
    });
  }
  function initModels() {
    window.Shopify.loadFeatures([{
      name: "model-viewer-ui",
      version: "1.0",
      onLoad: setupModelViewerUI
    }]);
    initShopifyXr();
  }
  function setupModelViewerUI(errors) {
    if (errors) return;
    t$2("model-viewer", node).forEach(function (model) {
      initCustomModelButtons(model);
    });
  }
  function initCustomModelButtons(model) {
    var viewer = new window.Shopify.ModelViewerUI(model);
    var parentContainer = model.closest(".product__media");
    var poster = n$2(".model-poster", parentContainer);
    var closeBtn = n$2(".model-close", parentContainer);
    e$2(poster, "click", function () {
      u$1(parentContainer, "model-active");
      viewer.play();
    });
    e$2(closeBtn, "click", function () {
      i$1(parentContainer, "model-active");
      viewer.pause();
    });
  }
  function initShopifyXr() {
    window.ProductModel = {
      loadShopifyXR: function loadShopifyXR() {
        var _this = this;
        window.Shopify.loadFeatures([{
          name: "shopify-xr",
          version: "1.0",
          onLoad: function onLoad() {
            return _this.setupShopifyXR();
          }
        }]);
      },
      setupShopifyXR: function setupShopifyXR(errors) {
        if (errors) return;
        if (!window.ShopifyXR) {
          e$2(document, "shopify_xr_initialized", function () {
            setupShopifyXR();
          });
          return;
        }
        t$2('[id^="ModelJson-"]', document).forEach(function (modelJSON) {
          window.ShopifyXR.addModels(JSON.parse(modelJSON.textContent));
          modelJSON.remove();
        });
        window.ShopifyXR.setupXRElements();
      }
    };
    e$2(window, "DOMContentLoaded", function () {
      if (window.ProductModel) window.ProductModel.loadShopifyXR();
    });
  }
  function pauseAllMedia() {
    externalVideoPlayers.forEach(function (player) {
      // Youtube
      if (player.pauseVideo) {
        player.pauseVideo();
      }

      // Vimeo
      if (player.pause) {
        player.pause();
      }
    });
    t$2("video", node).forEach(function (video) {
      return video.pause();
    });
    t$2("product-model", node).forEach(function (model) {
      if (model.modelViewerUI) model.modelViewerUI.pause();
    });
  }
  return {
    pauseAllMedia: pauseAllMedia
  };
}

function giftCardRecipient (container) {
  var displayRecipientFormContainer = n$2(".product-form__gift-card-recipient[data-source='product-display']", container);
  var formRecipientFormContainer = n$2(".product-form__gift-card-recipient[data-source='product-form']", container);
  if (!displayRecipientFormContainer || !formRecipientFormContainer) return;
  var sectionID = displayRecipientFormContainer.dataset.sectionId;
  var selectors = {
    display: {
      controlInput: "#display-gift-card-recipient-enable--".concat(sectionID),
      recipientForm: ".gift-card-recipient-fields",
      emailInput: "#display-gift-card-recipient-email--".concat(sectionID),
      nameInput: "#display-gift-card-recipient-name--".concat(sectionID),
      messageInput: "#display-gift-card-recipient-message--".concat(sectionID),
      sendOnInput: "#display-gift-card-recipient-send_on--".concat(sectionID),
      errors: ".product__gift-card-recipient-error"
    },
    form: {
      controlInput: "#form-gift-card-recipient-control--".concat(sectionID),
      emailInput: "#form-gift-card-recipient-email--".concat(sectionID),
      nameInput: "#form-gift-card-recipient-name--".concat(sectionID),
      messageInput: "#form-gift-card-recipient-message--".concat(sectionID),
      sendOnInput: "#form-gift-card-recipient-send_on--".concat(sectionID),
      offsetInput: "#form-gift-card-recipient-timezone-offset--".concat(sectionID)
    }
  };
  var elements = {
    display: {
      controlInput: n$2(selectors.display.controlInput, displayRecipientFormContainer),
      emailInput: n$2(selectors.display.emailInput, displayRecipientFormContainer),
      nameInput: n$2(selectors.display.nameInput, displayRecipientFormContainer),
      messageInput: n$2(selectors.display.messageInput, displayRecipientFormContainer),
      sendOnInput: n$2(selectors.display.sendOnInput, displayRecipientFormContainer),
      recipientForm: n$2(selectors.display.recipientForm, displayRecipientFormContainer),
      errors: t$2(selectors.display.errors, displayRecipientFormContainer)
    },
    form: {
      controlInput: n$2(selectors.form.controlInput, formRecipientFormContainer),
      emailInput: n$2(selectors.form.emailInput, formRecipientFormContainer),
      nameInput: n$2(selectors.form.nameInput, formRecipientFormContainer),
      messageInput: n$2(selectors.form.messageInput, formRecipientFormContainer),
      sendOnInput: n$2(selectors.form.sendOnInput, formRecipientFormContainer),
      offsetInput: n$2(selectors.form.offsetInput, formRecipientFormContainer)
    }
  };

  // Attach each display input to its associated form input
  Object.entries(elements.display).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    value.controls = elements.form[key];
  });
  var getInputs = function getInputs(type) {
    return [elements[type].emailInput, elements[type].nameInput, elements[type].messageInput, elements[type].sendOnInput];
  };
  var disableableInputs = function disableableInputs() {
    return [].concat(_toConsumableArray$1(getInputs("form")), [elements.form.controlInput, elements.form.offsetInput]);
  };
  var clearableInputs = function clearableInputs() {
    return [].concat(_toConsumableArray$1(getInputs("display")), _toConsumableArray$1(getInputs("form")));
  };
  var disableInputs = function disableInputs(inputs, disable) {
    inputs.forEach(function (input) {
      input.disabled = disable;
    });
  };
  var clearInputs = function clearInputs(inputs) {
    inputs.forEach(function (input) {
      input.value = "";
    });
  };
  var clearErrors = function clearErrors() {
    elements.display.errors.forEach(function (error) {
      u$1(error, "hidden");
    });
  };
  var handleChange = function handleChange(e) {
    var el = e.target;
    el.controls.value = el.value;
    if (el.type === "checkbox") {
      if (el.checked) {
        elements.display.recipientForm.style.display = "block";
      } else {
        clearInputs(clearableInputs());
        clearErrors();
        elements.display.recipientForm.style.display = "none";
      }
      disableInputs(disableableInputs(), !el.checked);
    }
  };

  // Hide the form version by default - the display version will update the form version inputs
  u$1(formRecipientFormContainer, "visually-hidden");

  // Disable form inputs by default
  disableInputs(disableableInputs(), true);
  elements.form.offsetInput.value = new Date().getTimezoneOffset();

  // Set up listeners for the display inputs
  var events = [e$2(elements.display.controlInput, "change", handleChange)];
  getInputs("display").forEach(function (input) {
    events.push(e$2(input, "change", handleChange));
  });
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
}

var n,e,i,o,t,r,f,d,p,u=[];function w(n,a){return e=window.pageXOffset,o=window.pageYOffset,r=window.innerHeight,d=window.innerWidth,void 0===i&&(i=e),void 0===t&&(t=o),void 0===p&&(p=d),void 0===f&&(f=r),(a||o!==t||e!==i||r!==f||d!==p)&&(!function(n){for(var w=0;w<u.length;w++)u[w]({x:e,y:o,px:i,py:t,vh:r,pvh:f,vw:d,pvw:p},n);}(n),i=e,t=o,f=r,p=d),requestAnimationFrame(w)}function srraf(e){return u.indexOf(e)<0&&u.push(e),n=n||w(performance.now()),{update:function(){return w(performance.now(),!0),this},destroy:function(){u.splice(u.indexOf(e),1);}}}

var selectors$P = {
  mediaBy: function mediaBy(id) {
    return "[data-media-item-id=\"".concat(id, "\"]");
  },
  mediaWrapper: "[data-product-media-wrapper]",
  inYourSpace: "[data-in-your-space]",
  videoHasntAutoplayed: 'video:not([data-has-autoplayed="true"])'
};
var classes$l = {
  hidden: "hidden"
};
function switchImage () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    container = _ref.container,
    imageId = _ref.imageId,
    inYourSpaceButton = _ref.inYourSpaceButton,
    _ref$hideImages = _ref.hideImages,
    hideImages = _ref$hideImages === void 0 ? true : _ref$hideImages;
  var newMedia = n$2("".concat(selectors$P.mediaWrapper).concat(selectors$P.mediaBy(imageId)), container);
  var otherMedia = t$2("".concat(selectors$P.mediaWrapper, ":not(").concat(selectors$P.mediaBy(imageId), ")"), container);
  if (hideImages) i$1(newMedia, classes$l.hidden);

  // Update view in space button
  if (inYourSpaceButton) {
    if (newMedia.dataset.mediaType === "model") {
      inYourSpaceButton.setAttribute("data-shopify-model3d-id", newMedia.dataset.mediaItemId);
    }
  }
  if (hideImages) otherMedia.forEach(function (image) {
    return u$1(image, classes$l.hidden);
  });

  // Autoplay any video that is shown, but only the first time
  var autoplayableVideo = n$2(selectors$P.videoHasntAutoplayed, newMedia);
  if (autoplayableVideo && !a$1(document.documentElement, "prefers-reduced-motion")) {
    autoplayableVideo.muted = true;
    autoplayableVideo.play();
    autoplayableVideo.setAttribute("data-has-autoplayed", true);
  }
}

// This loads the polyfill chunk if necessary
function provideResizeObserver() {
  if (window.ResizeObserver) {
    return Promise.resolve({
      ResizeObserver: ResizeObserver
    });
  }
  return import(flu.chunks.polyfillResizeObserver);
}

function stickyAtcBar (container) {
  var classes = {
    hidden: "hidden"
  };
  var selectors = {
    buyButtons: ".product-form__item--submit",
    changeOptionButton: "[data-change-option-trigger]",
    imageWrap: ".product__media",
    optionValues: ".sticky-atc-bar__meta-options",
    pageFooter: "footer",
    stickyAtcBar: ".sticky-atc-bar",
    variantSelector: ".product__variants-wrapper",
    price: ".sticky-atc-bar__price"
  };
  var elements = {
    buyButtons: n$2(selectors.buyButtons, container),
    pageFooter: n$2(selectors.pageFooter, document),
    stickyAtcBar: n$2(selectors.stickyAtcBar, container),
    variantSelector: n$2(selectors.variantSelector, container),
    price: n$2(selectors.price, container)
  };
  if (elements.stickyAtcBar === null) return;
  elements.imageWrap = n$2(selectors.imageWrap, elements.stickyAtcBar);
  elements.optionValues = n$2(selectors.optionValues, elements.stickyAtcBar);
  elements.changeOptionButton = n$2(selectors.changeOptionButton, elements.stickyAtcBar);
  var events = [];
  if (elements.changeOptionButton) {
    events.push(e$2(elements.changeOptionButton, "click", function () {
      return scrollToVariantSelector();
    }));
  }
  var widthWatcher;
  var buyButtonsObserver = new IntersectionObserver(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      visible = _ref2[0].isIntersecting;
    if (visible) {
      hideBar();
    } else {
      showBar();
    }
  });
  var footerObserver = new IntersectionObserver(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
      visible = _ref4[0].isIntersecting;
    if (visible) {
      buyButtonsObserver.disconnect();
      hideBar();
    } else {
      buyButtonsObserver.observe(elements.buyButtons);
    }
  }, {
    threshold: 0.8
  });
  footerObserver.observe(elements.pageFooter);
  var showBar = function showBar() {
    i$1(elements.stickyAtcBar, classes.hidden);
    setHeightVariable();
    widthWatcher = srraf(function (_ref5) {
      var pvw = _ref5.pvw,
        vw = _ref5.vw;
      if (pvw !== vw) {
        setHeightVariable();
      }
    });
  };
  var hideBar = function hideBar() {
    var _widthWatcher;
    u$1(elements.stickyAtcBar, classes.hidden);
    (_widthWatcher = widthWatcher) === null || _widthWatcher === void 0 ? void 0 : _widthWatcher.destroy();
    clearHeightVariable();
  };
  var setHeightVariable = function setHeightVariable() {
    document.documentElement.style.setProperty("--sticky-atc-bar-height", "".concat(elements.stickyAtcBar.offsetHeight, "px"));
  };
  var clearHeightVariable = function clearHeightVariable() {
    document.documentElement.style.setProperty("--sticky-atc-bar-height", "0px");
  };
  var scrollToVariantSelector = function scrollToVariantSelector() {
    elements.variantSelector.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  };
  var switchCurrentImage = function switchCurrentImage(id) {
    switchImage({
      container: elements.imageWrap,
      imageId: id
    });
  };
  var updateOptionValues = function updateOptionValues(variant) {
    var optionValueString = variant.options.join(", ");
    elements.optionValues.textContent = optionValueString;
  };
  var updatePrice = function updatePrice(variant) {
    updatePrices([elements.price], variant);
  };
  var unload = function unload() {
    var _widthWatcher2;
    buyButtonsObserver === null || buyButtonsObserver === void 0 ? void 0 : buyButtonsObserver.disconnect();
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    footerObserver === null || footerObserver === void 0 ? void 0 : footerObserver.disconnect();
    (_widthWatcher2 = widthWatcher) === null || _widthWatcher2 === void 0 ? void 0 : _widthWatcher2.destroy();
  };

  // TODO: rework this to export a single updateVariant function?
  return {
    switchCurrentImage: switchCurrentImage,
    unload: unload,
    updateOptionValues: updateOptionValues,
    updatePrice: updatePrice
  };
}

window.theme.strings.products;
var selectors$O = {
  unitPriceContainer: "[data-unit-price-container]",
  unitPrice: "[data-unit-price]",
  unitPriceBase: "[data-unit-base]"
};
var updateUnitPrices = function updateUnitPrices(container, variant) {
  var unitPriceContainers = t$2(selectors$O.unitPriceContainer, container);
  var unitPrices = t$2(selectors$O.unitPrice, container);
  var unitPriceBases = t$2(selectors$O.unitPriceBase, container);
  var showUnitPricing = !variant || !variant.unit_price;
  unitPriceContainers.forEach(function (container) {
    container.dataset.unitPriceAvailable = !showUnitPricing;
  });
  if (!variant || !variant.unit_price) return;
  _replaceText(unitPrices, formatMoney(variant.unit_price));
  _replaceText(unitPriceBases, _getBaseUnit(variant.unit_price_measurement));
};
var _getBaseUnit = function _getBaseUnit(unitPriceMeasurement) {
  return unitPriceMeasurement.reference_value === 1 ? unitPriceMeasurement.reference_unit : unitPriceMeasurement.reference_value + unitPriceMeasurement.reference_unit;
};
var _replaceText = function _replaceText(nodeList, replacementText) {
  nodeList.forEach(function (node) {
    return node.innerText = replacementText;
  });
};

var selectors$N = {
  accordion: ".accordion",
  addToCart: "[data-add-to-cart]",
  socialShareContainer: ".social-share",
  customOptionInputs: "[data-custom-option-input]",
  customOptionInputTargetsById: function customOptionInputTargetsById(id) {
    return "[data-custom-option-target='".concat(id, "']");
  },
  description: ".product__description",
  displayedDiscount: "[data-discount-display]:not([data-hidden='true'])",
  displayedDiscountByVariantId: function displayedDiscountByVariantId(id) {
    return "[variant-discount-display][variant-id=\"".concat(id, "\"] [data-discount-display]");
  },
  nonSprRatingCountLink: ".product__rating-count-potential-link",
  optionButtons: "[data-option-buttons]",
  optionById: function optionById(id) {
    return "[value='".concat(id, "']");
  },
  optionLabelValue: "[data-selected-value-for-option]",
  priceEls: ".product__price, .product__label-wrapper",
  productBlocksWithPrice: ".product__block--product-header, .product__price-block",
  productInventoryJson: "[data-product-inventory-json]",
  productOption: ".product__option",
  productReviews: "#shopify-product-reviews",
  shopPayBanner: "shopify-payment-terms",
  variantSelect: "[data-variant-select]"
};
function productBlocks(container) {
  var variant = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var productBlocksWithPrice = t$2(selectors$N.productBlocksWithPrice, container);
  var priceEls = productBlocksWithPrice.flatMap(function (el) {
    return t$2(selectors$N.priceEls, el);
  });
  var displayedDiscountEls = t$2(selectors$N.displayedDiscount, container);
  var shopPayBannerEls = t$2(selectors$N.shopPayBanner, container);
  var productRating = container.dataset.productRating;
  var components = [].concat(_toConsumableArray$1(accordionElsInit(t$2(selectors$N.accordion, container))), [SocialShare(n$2(selectors$N.socialShareContainer, container)), complementaryProducts(container), informationPopup(container), quantityInputInit(container), siblingProductsInit(container), truncateWrapper(container), variantAvailabilityInit(container) // Handle dynamic variant options
  ]);

  var events = [].concat(_toConsumableArray$1(customOptionsInit(t$2(selectors$N.customOptionInputs, container), container)), _toConsumableArray$1(OptionButtons(t$2(selectors$N.optionButtons, container))));

  // Initialize Stock level indicator
  var inventoryCounter = inventoryCounterElInit(n$2(selectors$N.productInventoryJson, container), container, variant);

  // Format iframes and tables in description
  formatDescription(t$2(selectors$N.description, container));

  // Format Shopify Product Reviews
  reviewsFormatter(t$2(selectors$N.productReviews, document), productRating);

  // Format non-SPR rating display
  formatNonSprRatingCount(t$2(selectors$N.nonSprRatingCountLink, container));
  var update = function update(_ref) {
    var variant = _ref.variant,
      srcElement = _ref.srcElement;
    var buyButtonEls = t$2(selectors$N.addToCart, container);
    var optionParentWrapper = srcElement.closest(selectors$N.productOption);
    var optionLabel = n$2(selectors$N.optionLabelValue, optionParentWrapper);
    var selectedVariantOpt = n$2("".concat(selectors$N.variantSelect, " ").concat(selectors$N.optionById(variant === null || variant === void 0 ? void 0 : variant.id)), container);

    // Update buy button
    buyButtonEls.forEach(function (buyButton) {
      updateBuyButton(buyButton, variant);
    });

    // Update prices to reflect selected variant
    updatePrices(productBlocksWithPrice, variant);

    // Hide price and label if variant is unavailable
    priceEls.forEach(function (el) {
      return l(el, "hide", !variant);
    });

    // Update unit pricing
    updateUnitPrices(container, variant);

    // Update sku
    updateSku(container, variant);

    // Update displayed discount
    updateDisplayedDiscountEls(container, variant, displayedDiscountEls);

    // Update Stock level indicator
    inventoryCounter && inventoryCounter.update(variant);

    // Update option label
    if (optionLabel) {
      optionLabel.textContent = srcElement.value;
    }

    // Update Shop Pay banners
    shopPayBannerEls.forEach(function (banner) {
      return banner.setAttribute("variant-id", "".concat(variant.id));
    });
    if (variant) {
      // We need to set the id input manually so the Dynamic Checkout Button works
      selectedVariantOpt.selected = true;

      // Update container's current variant ID
      container.dataset.currentProductId = variant.id;

      // Update quantity selectors' counts
      cart.get().then(function (_ref2) {
        var items = _ref2.items;
        cart.updateQuantitySelectorCounts(null, items, variant.id);
      });
    }
  };
  var unload = function unload() {
    components.filter(Boolean).forEach(function (component) {
      return component.unload();
    });
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    update: update,
    unload: unload
  };
}
var accordionElsInit = function accordionElsInit(els) {
  var accordions = els.map(function (el) {
    var accordionOpen = el.classList.contains("accordion--open");
    var accordionParent = el.parentElement;
    var accordion = Accordions(el, {
      firstOpen: accordionOpen
    });
    if (accordionParent.classList.contains("rte--product") && !accordionParent.classList.contains("accordion accordion--product")) {
      el.classList.add("rte--product", "accordion--product");
    }
    return accordion;
  });
  return accordions;
};
var customOptionsInit = function customOptionsInit(els, container) {
  var listeners = els.map(function (input) {
    var id = input.dataset.customOptionInput;
    var target = n$2(selectors$N.customOptionInputTargetsById(id), container);
    var listener = e$2(input, "change", function (e) {
      // Update the hidden input within the form, per type
      if (e.target.type === "checkbox") {
        target.checked = e.target.checked;
      } else {
        target.value = e.target.value;
      }
    });
    return listener;
  });
  return listeners;
};
var formatDescription = function formatDescription(els) {
  if (!els.length) return;
  els.forEach(function (el) {
    wrapIframes(t$2("iframe", el));
    wrapTables(t$2("table", el));
  });
};
var formatNonSprRatingCount = function formatNonSprRatingCount(els) {
  if (els.length && !n$2(selectors$N.productReviews, document)) {
    // The rating count links to "#shopify-product-reviews" but
    // if that block doesn't exist we should remove the link
    els.forEach(function (el) {
      return el.removeAttribute("href");
    });
  }
};
var inventoryCounterElInit = function inventoryCounterElInit(el, container, variant) {
  if (!el || !variant) return;
  var jsonData = JSON.parse(el.innerHTML);
  var variantsInventories = jsonData.inventory;
  var inventoryCounter$1;
  if (variantsInventories) {
    var config = {
      id: variant.id,
      variantsInventories: variantsInventories
    };
    inventoryCounter$1 = inventoryCounter(container, config);
  }
  return inventoryCounter$1;
};
var updateDisplayedDiscountEls = function updateDisplayedDiscountEls(container, variant, els) {
  if (els.length) {
    els.forEach(function (discountEl) {
      var newDiscountEl = null;
      var hasDiscount = false;
      if (variant) {
        newDiscountEl = n$2(selectors$N.displayedDiscountByVariantId(variant.id), container);
        if (newDiscountEl) {
          var newDiscountText = newDiscountEl.children[0].textContent;
          if (newDiscountText !== "") {
            hasDiscount = true;
            discountEl.dataset.hasDiscount = "true";
            discountEl.children[0].textContent = newDiscountText;
          }
        }
      }
      if (!hasDiscount) {
        discountEl.dataset.hasDiscount = "false";
        discountEl.children[0].textContent = "";
      }
    });
  }
};

var icons$1 = window.theme.icons;
var classes$k = {
  activeThumbnail: "pswp__thumbnail--active"
};
function productLightbox() {
  var _qs;
  var lightboxImages = t$2(".lightbox-image", document);
  if (!lightboxImages.length) return;
  var zoomThumbnailsEnabled = (_qs = n$2("[data-zoom-gallery-has-thumbnails]", document)) === null || _qs === void 0 ? void 0 : _qs.dataset.zoomGalleryHasThumbnails;
  var productLightbox;
  import(flu.chunks.photoswipe).then(function (_ref) {
    var _window$Shopify;
    var PhotoSwipeLightbox = _ref.PhotoSwipeLightbox,
      PhotoSwipe = _ref.PhotoSwipe;
    productLightbox = new PhotoSwipeLightbox(_objectSpread2$1({
      gallery: ".lightbox-media-container",
      children: ".lightbox-image",
      showHideAnimationType: "zoom",
      pswpModule: PhotoSwipe,
      mainClass: "pswp--product-lightbox",
      bgOpacity: 1,
      arrowPrevSVG: icons$1.chevron,
      arrowNextSVG: icons$1.chevron,
      closeSVG: icons$1.close,
      zoomSVG: icons$1.zoom
    }, zoomThumbnailsEnabled === "true" && {
      paddingFn: function paddingFn(viewportSize) {
        return {
          bottom: viewportSize.x < 720 ? 80 : 94
        };
      }
    }));
    productLightbox.init();
    if ((_window$Shopify = window.Shopify) !== null && _window$Shopify !== void 0 && _window$Shopify.designMode) {
      e$2(document, "shopify:section:load", function () {
        // Re-init lightbox after theme editor re-render to allow it to keep working
        productLightbox.init();
      });
    }

    // Hide nav ui elements if single image
    productLightbox.on("firstUpdate", function () {
      var _productLightbox = productLightbox,
        pswp = _productLightbox.pswp,
        options = _productLightbox.options;
      var productImageCount = options.dataSource.items.length;
      if (productImageCount === 1) {
        u$1(pswp.element, "pswp--is-single-image");
      }
    });

    // Render thumbnails if enabled
    if (zoomThumbnailsEnabled === "true") {
      productLightbox.on("uiRegister", function () {
        productLightbox.pswp.ui.registerElement({
          name: "thumbnails",
          appendTo: "root",
          html: '<div class="pswp__thumbnails-inner"></div>',
          onInit: function onInit(el, pswp) {
            var _productLightbox2 = productLightbox,
              options = _productLightbox2.options;
            var thumbnails = [];
            var thumbnailsInner = n$2(".pswp__thumbnails-inner", el);
            var images = options.dataSource.items.map(function (item) {
              return n$2(".image", item);
            });
            var prevIndex = -1;
            images.forEach(function (image, index) {
              var thumbnail = document.createElement("div");
              thumbnail.className = "pswp__thumbnail";
              thumbnail.appendChild(image.cloneNode(true));
              thumbnail.querySelector("img").setAttribute("sizes", "70px");
              thumbnail.onclick = function () {
                pswp.goTo(index);
              };
              thumbnailsInner.appendChild(thumbnail);
              thumbnails.push(thumbnail);
            });
            u$1(pswp.element, "pswp--has-thumbnails");
            pswp.on("change", function () {
              if (prevIndex >= 0) {
                thumbnails[prevIndex].classList.remove(classes$k.activeThumbnail);
              }
              thumbnails[pswp.currIndex].classList.add(classes$k.activeThumbnail);
              thumbnails[pswp.currIndex].scrollIntoView({
                behavior: "smooth",
                block: "center",
                inline: "center"
              });
              prevIndex = pswp.currIndex;
            });
          }
        });
      });

      // Isolate wheel event to scrollWrap (allows thumbnails to scroll)
      productLightbox.on("afterInit", function () {
        var _productLightbox$pswp = productLightbox.pswp,
          element = _productLightbox$pswp.element,
          events = _productLightbox$pswp.events,
          scrollWrap = _productLightbox$pswp.scrollWrap;
        var wheelEventIndex = events._pool.findIndex(function (event) {
          return event.type === "wheel";
        });

        // Abort if no wheel event in Photoswipe
        if (wheelEventIndex === -1) {
          return;
        }
        var wheelEvent = events._pool[wheelEventIndex].listener;
        element.removeEventListener("wheel", wheelEvent);
        scrollWrap.addEventListener("wheel", wheelEvent);
      });
    }
  });
}

var ls = {
  get: function get() {
    return JSON.parse(localStorage.getItem("fluco_cor_recently_viewed"));
  },
  set: function set(val) {
    return localStorage.setItem("fluco_cor_recently_viewed", JSON.stringify(val));
  }
};
var updateRecentProducts = function updateRecentProducts(productHandle) {
  var recentlyViewed = [];
  var productsList = ls.get();
  if (productsList !== null) {
    recentlyViewed = productsList.filter(function (storedHandle) {
      return storedHandle !== productHandle;
    });
    recentlyViewed.unshift(productHandle);
    ls.set(recentlyViewed.slice(0, 11)); // 1 extra product to account for itself
  } else if (productsList === null) {
    recentlyViewed.push(productHandle);
    ls.set(recentlyViewed);
  }
};
var getRecentProducts = function getRecentProducts() {
  return ls.get();
};

// LERP returns a number between start and end based on the amt
// Often used to smooth animations
// Eg. Given: start = 0, end = 100
// - if amt = 0.1 then lerp will return 10
// - if amt = 0.5 then lerp will return 50
// - if amt = 0.9 then lerp will return 90
var lerp = function lerp(start, end, amt) {
  var value = (1 - amt) * start + amt * end;
  value = Math.round(value);
  return value;
};

var selectors$M = {
  stickyContainer: "[data-sticky-container]"
};
var classes$j = {
  hasSticky: "has-sticky-scroll"
};
function StickyScroll (node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var stickyContainer = n$2(selectors$M.stickyContainer, node);
  if (!stickyContainer) return;
  var resizeObserver;
  var styledEl = options.styledEl || node;
  styledEl.style.setProperty("--sticky-container-top", 0);

  // ================================================================
  // Init position vars
  // ================================================================
  var previousScrollY = window.scrollY; // The previous scroll position of the page
  var currentScrollAmount = 0; // To keep track of the amount scrolled per event

  // Height of the header bar
  //  Used for calculating position
  //  Set in `_observeHeight()` when the `--header-desktop-sticky-height` var is set
  var headerHeight = 0;
  var stickyContainerTop = headerHeight; // The sticky container's `top` value
  var stickyContainerTopPrevious = stickyContainerTop;

  // The height of the sticky container
  //  Gets updated by a resize observer on the window and sticky container
  var stickyContainerHeight = stickyContainer.offsetHeight;

  // The height of the sticky container plus the height of the header
  var stickyContainerHeightWithHeader = stickyContainerHeight + headerHeight;

  // The max amount for the sticky container `top` value
  //  This is equal to the number of pixels that the sticky container extends the viewport by
  //  Gets updated by a resize observer on the window and sticky container
  var stickyContainerMaxTop = stickyContainerHeightWithHeader - window.innerHeight;

  // Watch scroll updates
  var scroller = srraf(function (_ref) {
    var y = _ref.y;
    _scrollHandler(y);
  });

  // Resize observer on the window and the sticky container
  //  Container contents may expand with interaction
  provideResizeObserver().then(function (_ref2) {
    var ResizeObserver = _ref2.ResizeObserver;
    if (resizeObserver) resizeObserver.disconnect();
    resizeObserver = new ResizeObserver(_observeHeight);
    resizeObserver.observe(stickyContainer);
    resizeObserver.observe(document.documentElement);
  });

  // Start the animation loop
  requestAnimationFrame(function () {
    return _updateStickyContainerTopLoop();
  });
  function _observeHeight() {
    stickyContainerHeight = stickyContainer.offsetHeight;
    headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-desktop-sticky-height").replace(/px/gi, ""));
    stickyContainerHeightWithHeader = stickyContainerHeight + headerHeight;
    stickyContainerMaxTop = stickyContainerHeightWithHeader - window.innerHeight;

    // Check if the sticky container is taller than the viewport and the node container has room
    // for the sticky container to scroll.
    //  The sticky container could be taller than its sibling so it won't have room to scroll.
    if (stickyContainerHeightWithHeader > window.innerHeight && node.offsetHeight > stickyContainerHeightWithHeader) {
      u$1(node, classes$j.hasSticky);
      _scrollHandler(window.scrollY);
    } else {
      i$1(node, classes$j.hasSticky);
    }
  }
  function _scrollHandler(y) {
    currentScrollAmount = previousScrollY - y;

    // The offset based on how far the page has been scrolled from last event
    var currentScrollOffset = stickyContainerTop + currentScrollAmount;
    var topMax = headerHeight; // The max top value while scrolling up
    var bottomMax = -stickyContainerMaxTop + headerHeight - 40; // The max top value while scrolling down

    // Find the current top value
    //  Based on the currentScrollOffset value within the range of topMax and bottomMax
    stickyContainerTop = Math.max(bottomMax, Math.min(currentScrollOffset, topMax));

    // Update the previous scroll position for next time.
    previousScrollY = y;
  }

  // This is an endless RAF loop used to update the `--sticky-container-top` CSS var.
  //  We're using this with a LERP function to smooth out the position updating
  //  instead of having large jumps while scrolling fast.
  function _updateStickyContainerTopLoop() {
    // We want to continue to update `--sticky-container-top` until fully into the stopped position
    if (stickyContainerTop !== stickyContainerTopPrevious) {
      stickyContainerTopPrevious = lerp(stickyContainerTopPrevious, stickyContainerTop, 0.5);
      styledEl.style.setProperty("--sticky-container-top", "".concat(stickyContainerTopPrevious, "px"));
    }
    requestAnimationFrame(function () {
      return _updateStickyContainerTopLoop();
    });
  }
  function destroy() {
    var _resizeObserver;
    scroller === null || scroller === void 0 ? void 0 : scroller.destroy();
    (_resizeObserver = resizeObserver) === null || _resizeObserver === void 0 ? void 0 : _resizeObserver.disconnect();
  }
  return {
    destroy: destroy
  };
}

var storeAvailability = function storeAvailability(container, product, variant) {
  var update = function update(variant) {
    container.innerHTML = "";
    if (!variant) return;
    var variantSectionUrl = "".concat(container.dataset.baseUrl, "/variants/").concat(variant.id, "/?section_id=store-availability");
    makeRequest("GET", variantSectionUrl).then(function (storeAvailabilityHTML) {
      if (storeAvailabilityHTML.trim() === "") return;

      // Remove section wrapper that throws nested sections error
      container.innerHTML = storeAvailabilityHTML.trim();
      container.innerHTML = container.firstElementChild.innerHTML;
      container.setAttribute("data-variant-id", variant.id);
      container.setAttribute("data-product-title", product.title);
      container.setAttribute("data-variant-title", variant.public_title);
    });
  };

  // Intialize
  update(variant);
  var unload = function unload() {
    container.innerHTML = "";
  };
  return {
    unload: unload,
    update: update
  };
};

var classes$i = {
  hidden: "hidden"
};
var selectors$L = {
  form: "[data-product-form]",
  addToCart: "[data-add-to-cart]",
  thumbs: "[data-product-thumbnails]",
  thumb: "[data-product-thumbnail]",
  thumbMobile: "[data-thumbnail-size='mobile'] [data-product-thumbnail]",
  mobileThumbById: function mobileThumbById(id) {
    return "[data-thumbnail-size='mobile'] [data-thumbnail-id='".concat(id, "']");
  },
  storeAvailability: "[data-store-availability-container]",
  quantityError: "[data-quantity-error]",
  photosMobile: ".product__media-container.below-mobile",
  photosDesktop: ".product__media-container.above-mobile",
  photosDesktopLargeImageContainer: ".product__media-container.above-mobile .product__media",
  productMedia: ".product__media",
  photosQuickDesktop: ".quick-product .quick-product__left",
  photosQuickMobile: ".quick-product .product__block--product-header-image-wrap",
  quickCart: ".quick-cart",
  purchaseConfirmation: ".purchase-confirmation-popup",
  giftCardRecipientContainer: ".product-form__gift-card-recipient",
  externalVideoOverlay: ".external-video-overlay"
};
var Product = /*#__PURE__*/function () {
  function Product(node) {
    var _this = this;
    _classCallCheck(this, Product);
    this.container = node;
    var _this$container$datas = this.container.dataset,
      isFullProduct = _this$container$datas.isFullProduct,
      isFeaturedProduct = _this$container$datas.isFeaturedProduct,
      enableStickyContainer = _this$container$datas.enableStickyContainer,
      scrollerId = _this$container$datas.scrollerId,
      sectionId = _this$container$datas.sectionId,
      enableMultipleVariantMedia = _this$container$datas.enableMultipleVariantMedia,
      initialMediaId = _this$container$datas.initialMediaId,
      productHandle = _this$container$datas.productHandle;
    this.isQuickProduct = false;
    this.isFullProduct = isFullProduct;
    this.isFeaturedProduct = isFeaturedProduct;
    this.scrollerId = scrollerId;
    this.sectionId = sectionId;
    this.enableMultipleVariantMedia = enableMultipleVariantMedia == "true";
    this.previousMediaId = initialMediaId;
    this.productHandle = productHandle;
    if (this.container.hasAttribute("data-quick-product")) {
      this.isQuickProduct = true;
      this.quickProductType = this.container.dataset.quickProductType;
    }
    this.formElement = n$2(selectors$L.form, this.container);
    this.quantityError = n$2(selectors$L.quantityError, this.container);
    this.viewInYourSpace = n$2("[data-in-your-space]", this.container);
    this.viewInYourSpaceWrap = n$2(".product__view-in-space-wrap", this.container);
    this.viewInYourSpace && l(this.viewInYourSpaceWrap, "visible", isMobile$1());

    // Handle Surface pickup
    this.availability = null;
    this.storeAvailabilityContainer = n$2(selectors$L.storeAvailability, this.container);
    if (this.formElement) {
      var _this$formElement$dat = this.formElement.dataset,
        _productHandle = _this$formElement$dat.productHandle,
        currentProductId = _this$formElement$dat.currentProductId;
      var product = getProduct(_productHandle);
      product(function (data) {
        var variant = getVariantFromId(data, parseInt(currentProductId));
        _this.productBlocks = productBlocks(_this.container, variant);
        if (_this.storeAvailabilityContainer && variant) {
          _this.availability = storeAvailability(_this.storeAvailabilityContainer, data, variant);
        }
        _this.productForm = ProductForm(_this.container, _this.formElement, data, {
          onOptionChange: function onOptionChange(e) {
            return _this.onOptionChange(e);
          },
          onFormSubmit: function onFormSubmit(e) {
            return _this.onFormSubmit(e);
          },
          onQuantityChange: function onQuantityChange(e) {
            return _this.onQuantityChange(e);
          }
        });
        _this.scrollThumbnails(variant);
      });
    } else {
      this.productBlocks = productBlocks(this.container, false);
    }
    this.sidebarRecommendations = sidebarRecommendations(this.container);
    if (enableStickyContainer === "true" && !isMobile$1()) {
      this.stickyScroll = StickyScroll(this.container);
    }
    if (this.isFullProduct && this.productHandle) {
      updateRecentProducts(this.productHandle);
    }
    this._loadMedia();

    // Gift card recipient
    this.giftCardRecipient = giftCardRecipient(this.container);

    // Sticky ATC Bar
    this.stickyAtcBar = stickyAtcBar(this.container);
  }

  // initialize media
  _createClass(Product, [{
    key: "_loadMedia",
    value: function _loadMedia() {
      this.photosDesktop = n$2(selectors$L.photosDesktop, this.container);
      this.photosDesktopLargeImageContainer = n$2(selectors$L.photosDesktopLargeImageContainer, this.container);
      this.photosQuickDesktop = n$2(selectors$L.photosQuickDesktop, this.container);
      this.photosQuickMobile = n$2(selectors$L.photosQuickMobile, this.container);
      this.productMedia = media(this.container);
      this.externalVideoOverlayEls = t$2(selectors$L.externalVideoOverlay, this.container);
      productLightbox();
      this._initThumbnails();
      this._initEvents();
      this.setupMobileSlider();
    }

    // initialize thumbnails
  }, {
    key: "_initThumbnails",
    value: function _initThumbnails() {
      var _this2 = this,
        _this$photosDesktop;
      this.productThumbnails = t$2(selectors$L.thumbs, this.container);
      this.productThumbnailItems = t$2(selectors$L.thumb, this.container);
      this.productThumbnailItemsMobile = t$2(selectors$L.thumbMobile, this.container);
      this.productThumbnailsScrollers = this.productThumbnails.map(function (set) {
        return scrollContainer.initScroller(set, _this2.isQuickProduct);
      });
      if (((_this$photosDesktop = this.photosDesktop) === null || _this$photosDesktop === void 0 ? void 0 : _this$photosDesktop.getAttribute("data-thumbnails-position")) == "left") {
        if (!n$2(".placeholder-image", this.photosDesktop)) {
          // We want the thumbnails container height to match the first image's
          // height. This seems overly complex in order to achieve this when
          // image shape is set to "natural"
          var firstVisibleImage = this.photosDesktopLargeImageContainer.querySelector(".product__media-item:not(.hidden) img");
          this.firstVisibleImageAspectRatio = firstVisibleImage && firstVisibleImage.offsetWidth / firstVisibleImage.offsetHeight;
          this.setThumbnailsHeight = function () {
            if (_this2.firstVisibleImageAspectRatio) {
              _this2.photosDesktop.style.setProperty("--first-large-image-height", "".concat(_this2.photosDesktopLargeImageContainer.offsetWidth / _this2.firstVisibleImageAspectRatio, "px"));
            }
          };
          this.widthWatcher = srraf(function (_ref) {
            _ref.vw;
            _this2.setThumbnailsHeight();
          });
          this.setThumbnailsHeight();
        }
      }
    }
  }, {
    key: "_initEvents",
    value: function _initEvents() {
      var _this3 = this;
      this.events = [e$2(this.productThumbnailItems, "click", function (e) {
        return _this3._handleThumbnailClick(e);
      }), e$2(this.productThumbnailItemsMobile, "click", function (e) {
        return _this3._handleThumbnailClick(e);
      }), e$2(this.externalVideoOverlayEls, "click", function (e) {
        return _this3._handleVideoOverlayClick(e);
      })];
    }
  }, {
    key: "_handleThumbnailClick",
    value: function _handleThumbnailClick(e) {
      e.preventDefault();
      this.productMedia.pauseAllMedia();
      var dataset = e.currentTarget.dataset;

      // Immediately update the active state
      this.productThumbnailItems.forEach(function (thumb) {
        return i$1(thumb, "active");
      });
      u$1(e.currentTarget, "active");
      if (this.isQuickProduct) {
        if (this.quickProductType == "view") {
          switchImage({
            container: this.photosQuickDesktop,
            imageId: dataset.thumbnailId,
            inYourSpaceButton: this.viewInYourSpace
          });
          switchImage({
            container: this.photosQuickMobile,
            imageId: dataset.thumbnailId,
            inYourSpaceButton: this.viewInYourSpace
          });
        }
      } else {
        switchImage({
          container: this.photosDesktop,
          imageId: dataset.thumbnailId,
          inYourSpaceButton: this.viewInYourSpace
        });
        switchImage({
          container: this.photosMobile,
          imageId: dataset.thumbnailId,
          inYourSpaceButton: this.viewInYourSpace,
          hideImages: false
        });
        dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":go-to-slide"), {
          slideIndex: dataset.thumbnailIndex
        });
      }
    }
  }, {
    key: "_handleVideoOverlayClick",
    value: function _handleVideoOverlayClick(e) {
      e.preventDefault();
      e.srcElement.remove();
    }
  }, {
    key: "setupMobileSlider",
    value: function setupMobileSlider() {
      var _this4 = this;
      if (this.isQuickProduct) return;
      this.events.push(e$2(document, "scroll-slider-".concat(this.scrollerId, ":slide-changed"), function (evt) {
        _this4.productMedia.pauseAllMedia();
        var activeSlide = evt.detail.currentElement;
        var activeSlideImage = n$2(".image, [data-media-type='video'], .shopify-model-viewer-ui, .js-youtube, .js-vimeo", activeSlide);
        var slideContainerMobile = n$2("".concat(selectors$L.photosMobile, " ").concat(selectors$L.productMedia), _this4.container);
        if (_this4.viewInYourSpace) {
          if (activeSlide.dataset.mediaType === "model") {
            _this4.viewInYourSpace.setAttribute("data-shopify-model3d-id", activeSlide.dataset.mediaItemId);
          }
        }

        // When we're in the editor and switch from desktop to mobile, the height gets calculated before the
        // content is properly in place and leaves a big gap below the image. This short timeout prevents that.
        if (Shopify.designMode) {
          setTimeout(function () {
            slideContainerMobile.style.height = "".concat(activeSlideImage.clientHeight, "px");
          }, 60);
        } else {
          slideContainerMobile.style.height = "".concat(activeSlideImage.clientHeight, "px");
        }
        if (_this4.productThumbnailItemsMobile.length) {
          debounce(function () {
            _this4.productThumbnailItemsMobile.forEach(function (thumb) {
              return i$1(thumb, "active");
            });
            var targetThumb = n$2(selectors$L.mobileThumbById(activeSlide.dataset.mediaItemId), _this4.container);
            u$1(targetThumb, "active");
          }, 200)();
        }
      }));
    }

    //  Refresh the product media and UI for a selected variant when Media Grouping is enabled
    //  Works for both Quick View and Full Product templates.
  }, {
    key: "_refreshOverviewWithVariant",
    value: function _refreshOverviewWithVariant(variant_id) {
      var _this5 = this;
      var requestURL;
      if (this.isQuickProduct) {
        requestURL = "".concat(window.theme.routes.products, "/").concat(this.productHandle, "?view=quick-view&section_id=").concat(this.sectionId, "&variant=").concat(variant_id);
      } else if (this.isFeaturedProduct) {
        requestURL = "".concat(window.theme.routes.products, "/").concat(this.productHandle, "/?section_id=").concat(this.sectionId, "&variant=").concat(variant_id);
      } else {
        requestURL = "".concat(window.location.pathname, "?section_id=").concat(this.sectionId, "&variant=").concat(variant_id);
      }
      var mediaContainers = [this.photosDesktop, this.photosMobile, this.photosQuickDesktop, this.photosQuickMobile].filter(Boolean); // remove undefined/null

      mediaContainers.forEach(function (container) {
        container.classList.add(classes$i.loading);
      });
      fetch(requestURL).then(function (response) {
        return response.text();
      }).then(function (text) {
        var source = new DOMParser().parseFromString(text, "text/html");

        // In Quick View, desktop and mobile use separate containers
        if (_this5.isQuickProduct) {
          var updatedDesktop = n$2(".quick-product__left", source);
          var updatedMobile = n$2(".product__block--product-header-image-wrap", source);
          var quickDesktop = n$2(".quick-product__left", _this5.container);
          var quickMobile = n$2(".product__block--product-header-image-wrap", _this5.container);

          // replace inner content for both mobile and desktop, if present.
          // this helps preserve state when switching between views (ie resizing window).
          if (updatedMobile && quickMobile) {
            quickMobile.innerHTML = updatedMobile.innerHTML;
          }
          if (updatedDesktop && quickDesktop) {
            quickDesktop.innerHTML = updatedDesktop.innerHTML;
          }
        } else {
          // On full product page and featured product section, update main product media container
          var updated = n$2(".product__primary-left", source);
          var target = n$2(".product__primary-left", _this5.container);
          if (target) {
            target.innerHTML = updated.innerHTML;
          }
        }

        // clean up
        // unload left column components
        _this5._unloadMedia();
        _this5.events.forEach(function (unsubscribe) {
          return unsubscribe();
        });

        // re-initialize left column components
        _this5._loadMedia();
      }).catch(function (error) {
        throw error;
      });
    }

    // When the user changes a product option
  }, {
    key: "onOptionChange",
    value: function onOptionChange(_ref2) {
      var variant = _ref2.dataset.variant,
        srcElement = _ref2.srcElement;
      this.productBlocks.update({
        variant: variant,
        srcElement: srcElement
      });
      dispatchCustomEvent("product:variant-change", {
        variant: variant
      });

      // Update product availability content
      this.availability && this.availability.update(variant);
      if (!variant) {
        this.availability && this.availability.unload();
        return;
      }

      // Update URL with selected variant
      if (!this.isQuickProduct && !this.isFeaturedProduct) {
        this.updateUrlWithVariant(variant.id);
      }

      // We need to dispatch an event so Shopify pay knows the form has changed
      this.formElement.dispatchEvent(new Event("change"));

      // Update selected variant image and thumb
      if (variant.featured_media) {
        this.productMedia.pauseAllMedia();
        if (this.enableMultipleVariantMedia && variant.featured_media.id != this.previousMediaId) {
          this._refreshOverviewWithVariant(variant.id);
          this.previousMediaId = variant.featured_media.id;
        } else if (this.isFullProduct) {
          var mobileSlidesWrap = n$2(selectors$L.photosMobile, this.container);
          var targetSlide = n$2("[data-media-item-id=\"".concat(variant.featured_media.id, "\"]"), mobileSlidesWrap);
          if (targetSlide) {
            var targetSlideIndex = Array.from(targetSlide.parentElement.children).indexOf(targetSlide);
            dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":go-to-slide"), {
              slideIndex: targetSlideIndex
            });
          }
          var imagesWrap = n$2(".product__media-container.above-mobile");
          if (imagesWrap.dataset.desktopGalleryLayout === "thumbnails") {
            switchImage({
              container: this.photosDesktop,
              imageId: variant.featured_media.id,
              inYourSpaceButton: this.viewInYourSpace
            });
            this.highlightActiveThumbnail(this.photosDesktop, variant);
            this.scrollThumbnails(variant);
          } else {
            var targetImage = n$2(".product__media-container.above-mobile [data-media-id=\"".concat(variant.featured_media.id, "\"]"));
            if (this.isFeaturedProduct && !window.matchMedia(getMediaQuery("below-960")).matches) {
              this.switchCurrentImage(variant.featured_media.id);
            } else {
              targetImage.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "nearest"
              });
            }
          }
        } else {
          this.switchCurrentImage(variant.featured_media.id);
          if (window.matchMedia(getMediaQuery("below-960")).matches) {
            this.photosQuickMobile && this.highlightActiveThumbnail(this.photosQuickMobile, variant);
          } else {
            this.photosQuickDesktop && this.highlightActiveThumbnail(this.photosQuickDesktop, variant);
          }
          this.scrollThumbnails(variant);
        }
      }

      // Update sticky add-to-cart variant image and option values
      if (this.stickyAtcBar && !this.isQuickProduct) {
        if (variant.featured_media) {
          this.stickyAtcBar.switchCurrentImage(variant.featured_media.id);
        }
        this.stickyAtcBar.updateOptionValues(variant);
        this.stickyAtcBar.updatePrice(variant);
      }
    }
  }, {
    key: "updateUrlWithVariant",
    value: function updateUrlWithVariant(variantId) {
      var url = getUrlWithVariant(window.location.href, variantId);
      window.history.replaceState({
        path: url
      }, "", url);
    }
  }, {
    key: "switchCurrentImage",
    value: function switchCurrentImage(id) {
      var imagesWraps = t$2(".product__media", this.container);
      imagesWraps.forEach(function (imagesWrap) {
        return switchImage({
          container: imagesWrap,
          imageId: id
        });
      });
    }
  }, {
    key: "highlightActiveThumbnail",
    value: function highlightActiveThumbnail(photos, variant) {
      var thumb = n$2("[data-thumbnail-id=\"".concat(variant.featured_media.id, "\"]"), photos);
      this.productThumbnailItems.forEach(function (thumb) {
        return i$1(thumb, "active");
      });
      u$1(thumb, "active");
    }
  }, {
    key: "scrollThumbnails",
    value: function scrollThumbnails(variant) {
      var _this6 = this;
      if (!variant.featured_media) return;
      this.productThumbnails.forEach(function (group, index) {
        var groupThumb = n$2("[data-thumbnail-id=\"".concat(variant.featured_media.id, "\"]"), group).closest("li");
        _this6.productThumbnailsScrollers[index].scrollTo(groupThumb);
      });
    }

    // When user updates quantity
  }, {
    key: "onQuantityChange",
    value: function onQuantityChange(_ref3) {
      var _ref3$dataset = _ref3.dataset,
        variant = _ref3$dataset.variant,
        quantity = _ref3$dataset.quantity;
      // Adjust the hidden quantity input within the form
      var quantityInputs = _toConsumableArray$1(t$2('[name="quantity"]', this.formElement));
      quantityInputs.forEach(function (quantityInput) {
        quantityInput.value = quantity;
      });
      dispatchCustomEvent("product:quantity-update", {
        quantity: quantity,
        variant: variant
      });
    }

    // When user submits the product form
  }, {
    key: "onFormSubmit",
    value: function onFormSubmit(e) {
      var _this7 = this;
      var purchaseConfirmation = n$2(selectors$L.purchaseConfirmation, document);
      var quickCart = n$2(selectors$L.quickCart, document);
      var quickProductForm = e.target.closest(".quick-product");

      // If the quick cart or purchase confirmation aren't enabled, and we're not in a
      // quick view modal, just submit the form.
      //
      // If the quick cart or purchase confirmation aren't enabled, and we're in a
      // quick view modal without quick add enabled, just submit the form.
      //
      // Otherwise, add to cart with ajax and show the purchase confirmation or quick cart
      if (!purchaseConfirmation && !quickCart && !quickProductForm || !purchaseConfirmation && !quickCart && quickProductForm && quickProductForm.dataset.quickAddEnabled === "false") return;
      e.preventDefault();
      var buttonEls = t$2(selectors$L.addToCart, this.container);
      u$1(this.quantityError, "hidden");
      buttonEls.forEach(function (button) {
        u$1(button, "loading");
      });
      cart.addItem(this.formElement).then(function (_ref4) {
        var item = _ref4.item;
        buttonEls.forEach(function (button) {
          i$1(button, "loading");
        });
        if (purchaseConfirmation) {
          r$1("confirmation-popup:open", null, {
            product: item
          });
        } else {
          r$1("quick-cart:open");
        }
        dispatchCustomEvent("cart:item-added", {
          product: item
        });
      }).catch(function (error) {
        cart.get(); // update local cart data

        if (error && error.message) {
          if (_typeof(error.message) === "object") {
            var sectionID = n$2(selectors$L.giftCardRecipientContainer, _this7.container).dataset.sectionId;
            Object.entries(error.message).forEach(function (_ref5) {
              var _ref6 = _slicedToArray(_ref5, 2),
                key = _ref6[0],
                value = _ref6[1];
              var errorMessageID = "display-gift-card-recipient-".concat(key, "-error--").concat(sectionID);
              var errorMessage = n$2("#".concat(errorMessageID), _this7.container);
              var errorInput = n$2("#display-gift-card-recipient-".concat(key, "--").concat(sectionID), _this7.container);
              errorMessage.innerText = value;
              i$1(errorMessage, "hidden");
              errorInput.setAttribute("aria-invalid", true);
              errorInput.setAttribute("aria-describedby", errorMessageID);
            });
          } else {
            _this7.quantityError.innerText = error.message;
            i$1(_this7.quantityError, "hidden");
          }
        } else {
          _this7.quantityError.innerText = _this7.quantityError.getAttribute("data-fallback-error-message");
          i$1(_this7.quantityError, "hidden");
        }
        var buttonEls = t$2(selectors$L.addToCart, _this7.container);
        i$1(_this7.quantityError, "hidden");
        buttonEls.forEach(function (button) {
          i$1(button, "loading");
        });
      });
    }
  }, {
    key: "_unloadMedia",
    value: function _unloadMedia() {
      var _this$mobileSwiper;
      this.productMedia.pauseAllMedia();
      (_this$mobileSwiper = this.mobileSwiper) === null || _this$mobileSwiper === void 0 ? void 0 : _this$mobileSwiper.destroy();
      this.productThumbnailsScrollers.forEach(function (scroller) {
        return scroller.unload();
      });
    }
  }, {
    key: "unload",
    value: function unload() {
      var _this$stickyScroll, _this$sidebarRecommen, _this$giftCardRecipie, _this$stickyAtcBar;
      this.productForm.destroy();
      this.productBlocks.unload();
      this.events.forEach(function (unsubscribe) {
        return unsubscribe();
      });
      (_this$stickyScroll = this.stickyScroll) === null || _this$stickyScroll === void 0 ? void 0 : _this$stickyScroll.destroy();
      (_this$sidebarRecommen = this.sidebarRecommendations) === null || _this$sidebarRecommen === void 0 ? void 0 : _this$sidebarRecommen.unload();
      this.productThumbnailsScrollers.forEach(function (scroller) {
        return scroller.unload();
      });
      (_this$giftCardRecipie = this.giftCardRecipient) === null || _this$giftCardRecipie === void 0 ? void 0 : _this$giftCardRecipie.unload();
      (_this$stickyAtcBar = this.stickyAtcBar) === null || _this$stickyAtcBar === void 0 ? void 0 : _this$stickyAtcBar.unload();
    }
  }]);
  return Product;
}();

var classes$h = {
  visible: "is-visible",
  active: "active",
  hidden: "hidden",
  fixed: "is-fixed",
  empty: "empty",
  animationProductRevealed: "animation--quick-product-revealed"
};
var selectors$K = {
  closeBtn: "[data-modal-close]",
  wash: ".modal__wash",
  modalContainer: "[data-quick-product-modal]",
  modalContent: ".quick-product-modal__content",
  modalTemplate: "#quick-product-modal-template",
  modalContentLeft: ".quick-product__left",
  modalContentRight: ".quick-product__right-inner",
  modalContentTitle: ".quick-product__right-inner .product__title",
  modalContentLoader: ".quick-product-modal-loading-indicator",
  quickHeaderWrapper: ".product__block--product-header",
  quickHeader: ".product__block--product-header-image-wrap + .product__block--product-header-inner",
  quickStickyHeader: "[data-quick-sticky-header]",
  quickImage: ".product__block--product-header-image-wrap"
};
var quickProductModal = function quickProductModal(node) {
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  var wash = n$2(selectors$K.wash, node);
  var closeButton = n$2(selectors$K.closeBtn, node);
  var modalContent = n$2(selectors$K.modalContent, node);
  var modalTemplate = n$2(selectors$K.modalTemplate, node).content;
  var isTemplate = window.location.href.includes("view=quick-view") || window.location.href.includes("view=quick-add");
  var isEditorTemplate = window.Shopify.designMode && isTemplate;
  var quickProductAnimation = null;
  var product;
  if (shouldAnimate(node)) {
    quickProductAnimation = animateQuickProduct(node);
  }
  modalContent.append(modalTemplate.cloneNode(true));
  var events = [e$2([wash, closeButton], "click", function (e) {
    e.preventDefault();
    if (!isEditorTemplate) _close();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27 && !isEditorTemplate) _close();
  }), c(["quick-add:open", "quick-view:open"], function (state, data) {
    node.dataset.quickProductType = data.type;
    if (data.productMedia || data.productBadges || data.productTitle) {
      _renderPlaceholderContent(data);
    }
    _renderProductContent(data);
    _open();
  }), c(["quick-add:close", "quick-view:close"], function () {
    if (!isEditorTemplate) _close();
  })];
  var _renderPlaceholderContent = function _renderPlaceholderContent(data) {
    var modalContentLeft = n$2(selectors$K.modalContentLeft, modalContent);
    var modalContentRight = n$2(selectors$K.modalContentRight, modalContent);
    var modalContentTitle = n$2(selectors$K.modalContentTitle, modalContent);
    var modalContentLoader = n$2(selectors$K.modalContentLoader, modalContent);
    i$1(modalContent, classes$h.empty);
    i$1(modalContentLoader, classes$h.hidden);
    if (data.type === "quick-add") {
      modalContentLeft.remove();
    } else if (data.productMedia) {
      modalContentLeft.append(data.productMedia.cloneNode(true));
    }
    modalContentTitle.innerText = data.productTitle;
    if (data.productBadges) {
      modalContentRight.prepend(data.productBadges.cloneNode(true));
    }
  };
  var _renderProductContent = function _renderProductContent(data) {
    var urlParamDelimiter = data.productUrl.includes("?") ? "&" : "?";
    var xhrUrl = "".concat(data.productUrl).concat(urlParamDelimiter, "view=").concat(data.type);
    makeRequest("GET", xhrUrl).then(function (response) {
      var container = document.createElement("div");
      container.innerHTML = response;
      var productElement = n$2("[data-quick-product]", container);
      i$1(modalContent, classes$h.empty);
      modalContent.innerHTML = "";
      modalContent.appendChild(productElement);
      var renderedProductElement = n$2("[data-quick-product]", modalContent);
      product = new Product(renderedProductElement);
      if (shouldAnimate(node)) {
        quickProductAnimation.animate();
        var modalContainer = modalContent.closest(selectors$K.modalContainer);
        setTimeout(function () {
          u$1(modalContainer, classes$h.animationProductRevealed);
        }, 100);
      }
      if (data.type === "quick-view") {
        dispatchCustomEvent("quick-view:loaded");
        _handleQuickViewStickyHeader();
      }
    });
  };
  var _handleQuickViewStickyHeader = function _handleQuickViewStickyHeader() {
    var quickStickyHeader = n$2(selectors$K.quickStickyHeader, node);
    var quickHeaderWrapper = n$2(selectors$K.quickHeaderWrapper, node);
    var quickHeader = n$2(selectors$K.quickHeader, node);
    var quickImage = n$2(selectors$K.quickImage, node);
    var observer = new IntersectionObserver(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
        visible = _ref3[0].isIntersecting;
      if (visible) {
        i$1(quickStickyHeader, classes$h.active);
      } else {
        u$1(quickStickyHeader, classes$h.active);
        if (quickHeaderWrapper.dataset.headerPositionMobile === "below" && quickImage.style.paddingTop === "") {
          quickImage.style.paddingTop = "".concat(quickStickyHeader.offsetHeight, "px");
        }
      }
    }, {
      threshold: 0.1
    });
    observer.observe(quickHeader);
  };
  var _open = function _open() {
    u$1(node, classes$h.fixed);
    setTimeout(function () {
      u$1(node, classes$h.active);
      setTimeout(function () {
        u$1(node, classes$h.visible);
        focusTrap.activate();
      }, 50);
    }, 50);
    disableBodyScroll(node, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }
          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
  };
  var _close = function _close() {
    focusTrap.deactivate();
    i$1(node, classes$h.visible);
    i$1(node, classes$h.active);
    i$1(node, classes$h.animationProductRevealed);
    enableBodyScroll(node);
    r$1("quick-cart:scrollup");
    setTimeout(function () {
      var _product;
      i$1(node, classes$h.fixed);
      modalContent.innerHTML = "";
      modalContent.append(modalTemplate.cloneNode(true));
      u$1(modalContent, classes$h.empty);
      (_product = product) === null || _product === void 0 ? void 0 : _product.unload();
    }, 500);
  };
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
};

var breakpoints = [480, 720, 960, 1024, 1200, 1400];
var widthWatcher = function widthWatcher() {
  var reversedBreakpoints = breakpoints.reverse();
  var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  var lastSize = viewportWidth;
  srraf(function (_ref) {
    var vw = _ref.vw;
    r$1("window:resized");
    if (vw > lastSize) {
      breakpoints.forEach(function (width) {
        if (lastSize < width && vw >= width) {
          r$1("window:above-".concat(width));
        }
      });
    } else {
      reversedBreakpoints.reverse().forEach(function (width) {
        if (lastSize > width && vw < width) {
          r$1("window:below-".concat(width));
        }
      });
    }
    if (vw !== lastSize) r$1("window:width-changed");
    lastSize = vw;
  });
};

var classes$g = {
  visible: "is-visible"
};
var flashAlertModal = function flashAlertModal(node) {
  // Setup all preassigned liquid flash alerts
  if (window.Shopify.designMode) {
    var delegate = new Delegate(document.body);
    delegate.on("click", "[data-flash-trigger]", function (_, target) {
      var flashMessage = target.dataset.flashMessage;
      _open(flashMessage);
    });
  }
  c("flart-alert", function (_ref) {
    var alert = _ref.alert;
    _open(alert);
  });
  var _open = function _open(alertMessage) {
    if (!alertMessage) return;
    var messageContainer = n$2(".flash-alert__container", node);
    messageContainer.innerText = alertMessage;
    u$1(node, classes$g.visible);
    messageContainer.addEventListener("animationend", function () {
      i$1(node, classes$g.visible);
    }, {
      once: true
    });
  };
};

var selectors$J = {
  innerOverlay: ".header-overlay__inner"
};
var classes$f = {
  isVisible: "is-visible",
  isActive: "is-active"
};
var events = {
  show: "headerOverlay:show",
  hide: "headerOverlay:hide",
  hiding: "headerOverlay:hiding"
};
var headerOverlay = function headerOverlay(node) {
  if (!node) return;
  var overlay = node;
  var overlayInner = node.querySelector(selectors$J.innerOverlay);
  var overlayShowListener = c(events.show, function () {
    return _showOverlay();
  });
  var overlayHideListener = c(events.hide, function () {
    return _hideOverlay();
  });
  var _showOverlay = function _showOverlay() {
    o$1({
      headerOverlayOpen: true
    });
    overlay.classList.add(classes$f.isActive);
    setTimeout(function () {
      overlayInner.classList.add(classes$f.isVisible);
    }, 0);
  };
  var _hideOverlay = function _hideOverlay() {
    o$1({
      headerOverlayOpen: false
    });
    r$1(events.hiding);
    overlayInner.classList.remove(classes$f.isVisible);
    setTimeout(function () {
      overlay.classList.remove(classes$f.isActive);
    }, 0);
  };
  var unload = function unload() {
    overlayShowListener();
    overlayHideListener();
  };
  return {
    unload: unload
  };
};

// detect support for the behavior property in ScrollOptions
var supportsNativeSmoothScroll = ("scrollBehavior" in document.documentElement.style);
var backToTop = function backToTop() {
  var node = n$2("[data-back-to-top]");
  if (!node) return;

  // Handling button visibility
  var pageHeight = window.innerHeight;
  var isVisible = false;

  // Whatch scroll updates, we don't need precision here so we're debouncing
  srraf(function (_ref) {
    var y = _ref.y;
    return debounce(function () {
      return _scrollHandler(y);
    })();
  });
  function _scrollHandler(y) {
    // Check if the button visibility should be toggled
    if (y > pageHeight && !isVisible || y < pageHeight && isVisible) {
      _toggleVisibility();
    }
  }
  function _toggleVisibility() {
    l(node, "visible");
    isVisible = !isVisible;
  }

  // Handling button clicks
  var button = n$2("[data-back-to-top-button]", node);
  button.addEventListener("click", _buttonClick);
  function _buttonClick() {
    if (supportsNativeSmoothScroll) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    } else {
      window.scrollTo(0, 0);
    }
  }
};

function PredictiveSearch(resultsDropdownEl, resultsContainerEl, resultsViewAllButtonTextEl) {
  var settings = n$2("[data-search-settings]", document);
  var _JSON$parse = JSON.parse(settings.innerHTML),
    limit = _JSON$parse.limit;
  var responseCache = {};
  function _renderSearchResultsFromResponse(text, term) {
    var resultsMarkup = new DOMParser().parseFromString(text, "text/html");
    var resultsWrapper = resultsMarkup.querySelector(".quick-search-results");
    var resultsCount = resultsWrapper.getAttribute("data-results-count");
    resultsDropdownEl.setAttribute("data-results-count", resultsCount);
    resultsContainerEl.innerHTML = resultsWrapper.innerHTML;
    resultsDropdownEl.setAttribute("data-loading", false);
    if (term) {
      resultsViewAllButtonTextEl.innerText = resultsViewAllButtonTextEl.getAttribute("data-label-with-query").replace("{{ query }}", term);
    } else {
      resultsViewAllButtonTextEl.innerText = resultsViewAllButtonTextEl.getAttribute("data-label");
    }
  }
  function _fetchResults(url, term) {
    if (responseCache[url]) {
      return _renderSearchResultsFromResponse(responseCache[url], term);
    }
    fetch(url).then(function (response) {
      if (!response.ok) {
        var error = new Error(response.status);
        throw error;
      }
      return response.text();
    }).then(function (responseText) {
      // It seems like we should just forego this caching layer and lean on browser
      // caching however Shopify's responses dictate no-cache behavhiour so we can't
      responseCache[url] = responseText;
      _renderSearchResultsFromResponse(responseText, term);
    }).catch(function (error) {
      throw error;
    });
  }

  // Search results from standard search page
  function getSearchResults(settings) {
    var query = settings.productType ? "product_type:".concat(settings.productType, " AND ").concat(settings.searchTerm) : settings.searchTerm;
    var endpoint = window.theme.routes.predictive_search_url;
    var params = new URLSearchParams();
    params.set("section_id", "quick-search-results");
    params.set("q", query);
    params.set("resources[limit_scope]", "each");
    params.set("resources[limit]", limit);
    if (window.theme.searchableFields) {
      params.set("resources[options][fields]", window.theme.searchableFields);
    }
    var url = "".concat(endpoint, "?").concat(params.toString());
    resultsContainerEl.innerHTML = "";
    resultsDropdownEl.setAttribute("data-loading", true);

    // Small debounce to not search on every keydown
    debounce(function () {
      return _fetchResults(url, settings.searchTerm);
    }, 300)();
  }
  return {
    getSearchResults: getSearchResults
  };
}

var typeStorageKey = "quickSearch:lastTypeSelection";
var selectors$I = {
  quickSearch: "[data-quick-search]",
  form: "[data-quick-search-form]",
  input: "[data-quick-search-input]",
  clear: "[data-quick-search-clear]",
  productType: "[data-quick-search-product-type]",
  suggestedSearchLinks: "[data-suggested-search]",
  resultsDropdown: ".quick-search__results-wrapper",
  resultsContainer: "[data-quick-search-results]",
  resultsViewAllButtonText: ".quick-search__view-all-label",
  cancel: "[data-quick-search-cancel]",
  headerContent: ".header__content-desktop",
  fauxInput: "[data-quick-search-faux-input]",
  fauxInputText: "[data-quick-search-faux-text]",
  activeSearchContainer: "[data-search-active-container]",
  fauxSubmitButton: "[data-quick-search-faux-submit]",
  fauxProductType: "[data-quick-search-faux-product-type]",
  headerSearchButton: "[data-header-button-type='search']",
  desktopTriggerButton: "[data-search-trigger]"
};
var classes$e = {
  searchActive: "quick-search__form--search-active",
  showTypeSelect: "quick-search--show-type-selector"
};
function QuickSearch (node, header) {
  if (!node) return;
  var quickSearchScope = node.dataset.quickSearchScope;
  var fauxInputEl = n$2(selectors$I.fauxInput, node);
  var fauxInputTextEl = n$2(selectors$I.fauxInputText, node);
  var fauxSubmitButton = n$2(selectors$I.fauxSubmitButton, node);
  var fauxProductTypeEl = n$2(selectors$I.fauxProductType, node);
  var desktopTriggerButton = n$2(selectors$I.desktopTriggerButton, node);
  var activeSearchContainer = n$2(selectors$I.activeSearchContainer, node);
  var formEl = n$2(selectors$I.form, node);
  var inputEl = n$2(selectors$I.input, formEl);
  var clearEl = n$2(selectors$I.clear, formEl);
  var cancelEl = n$2(selectors$I.cancel, formEl);
  var productTypeEl = n$2(selectors$I.productType, formEl);
  var resultsContainerEl = n$2(selectors$I.resultsContainer, formEl);
  var resultsDropdownEl = n$2(selectors$I.resultsDropdown, formEl);
  var resultsViewAllButtonTextEl = n$2(selectors$I.resultsViewAllButtonText, formEl);
  var suggestedSearchLinksEls = t$2(selectors$I.suggestedSearchLinks, formEl);
  var placeholderText = fauxInputEl.getAttribute("data-placeholder");
  var placeholderTextWithinType = fauxInputEl.getAttribute("data-placeholder-when-type-active");
  var headerContentEl = null;
  var headerRO = null;
  var typeChoice = null;
  var focusTrap = createFocusTrap(activeSearchContainer, {
    allowOutsideClick: true,
    initialFocus: inputEl
  });
  var quickSearchResults;
  if (resultsDropdownEl) {
    quickSearchResults = PredictiveSearch(resultsDropdownEl, resultsContainerEl, resultsViewAllButtonTextEl);
  }
  var events = [e$2(fauxInputEl, "click", _toggleSearch), e$2(fauxSubmitButton, "click", function () {
    formEl.submit();
  }), e$2(clearEl, "click", _handleReset), e$2(inputEl, "input", _handleInput), e$2(cancelEl, "click", _toggleSearch), e$2(window, "click", function (evt) {
    var closestQuickSearch = evt.target.closest(selectors$I.quickSearch);
    var isSearchToggle = evt.target.closest(selectors$I.headerSearchButton);
    if (isSearchToggle) return;
    if (!closestQuickSearch && quickSearchIsOpen()) {
      _toggleSearch();
    }
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) {
      if (a$1(formEl, classes$e.searchActive)) {
        _handleReset();
      } else {
        _toggleSearch();
      }
    }
  })];
  if (desktopTriggerButton) {
    events.push(e$2(desktopTriggerButton, "click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      _toggleSearch();
    }));
  }
  if (quickSearchScope === "desktop") {
    headerContentEl = n$2(selectors$I.headerContent, header);
    _setLayoutVars();
    provideResizeObserver().then(function (_ref2) {
      var ResizeObserver = _ref2.ResizeObserver;
      headerRO = new ResizeObserver(function () {
        _setLayoutVars();
      });
      headerRO.observe(header);
    });
    events.push(c("navBar:change", _handleNavBarChange));
    c("window:below-960", handleBreakpointChange);
  } else {
    events.push(c("mobile-quick-search:open", function () {
      _toggleSearch();
    }));
    c("window:above-960", handleBreakpointChange);
  }
  if (productTypeEl) {
    events.push(e$2(productTypeEl, "change", function (event) {
      _handleTypeChoice(event.target.value);
      _handleInput();
    }));
    events.push(e$2(fauxProductTypeEl, "change", function (event) {
      _handleTypeChoice(event.target.value);
      // Store the selection so we can restore it on hard load of full search results page
      setStorage(typeStorageKey, JSON.stringify(event.target.value));
    }));
    var previousTypeChoice = getStorage(typeStorageKey);
    if (previousTypeChoice !== null) {
      // Looping is necessary to validate the old type
      productTypeEl.querySelectorAll("option").forEach(function (optionEl) {
        if (optionEl.value == previousTypeChoice) {
          _handleTypeChoice(previousTypeChoice);
        }
      });
    }
  }
  if (suggestedSearchLinksEls.length) {
    events.push(e$2(node, "click", _handleSuggestedSearch));
  }
  function quickSearchIsOpen() {
    return node.dataset.quickSearchActive === "true";
  }
  function _handleSuggestedSearch(evt) {
    var suggestedSearchLink = evt.target.closest(selectors$I.suggestedSearchLinks);
    if (!suggestedSearchLink) return;
    evt.preventDefault();
    inputEl.value = suggestedSearchLink.dataset.suggestedSearch;
    _handleInput();
  }
  function _handleInput() {
    if (inputEl.value === "") {
      reset();
      if (productTypeEl) {
        fauxProductTypeEl.value = productTypeEl.value;
      }
      return;
    }
    u$1(formEl, classes$e.searchActive);
    if (fauxInputEl.dataset.placeholderActive === "true") {
      fauxInputEl.dataset.placeholderActive = false;
    }

    // Map the faux button to have the same text as the real search input
    fauxInputTextEl.innerText = inputEl.value;
    if (quickSearchResults) {
      var _productTypeEl$value;
      var settings = {
        searchTerm: inputEl.value,
        productType: productTypeEl !== null && productTypeEl !== void 0 && (_productTypeEl$value = productTypeEl.value) !== null && _productTypeEl$value !== void 0 && _productTypeEl$value.length ? productTypeEl.value : null
      };
      quickSearchResults.getSearchResults(settings);
    }
  }
  function _handleReset(evt) {
    evt === null || evt === void 0 ? void 0 : evt.preventDefault();
    reset();
  }
  function _handleNavBarChange() {
    setTimeout(function () {
      window.requestAnimationFrame(function () {
        _setLayoutVars();
      });
    }, 300);
  }
  function _toggleSearch() {
    if (quickSearchIsOpen()) {
      node.dataset.quickSearchActive = false;
      document.body.dataset.quickSearchOpen = false;
      focusTrap.deactivate();
      if (quickSearchScope === "mobile") {
        hideHeaderOverlay();
        inputEl.blur();
        enableBodyScroll(node);
      }
    } else {
      r$1("search:focused");
      node.dataset.quickSearchActive = true;
      document.body.dataset.quickSearchOpen = true;
      focusTrap.activate();
      if (quickSearchScope === "mobile") {
        showHeaderOverlay();
        // Focus is required to trigger keyboard on iOS
        inputEl.focus();
        inputEl.select();
        if (inputEl.value.length) {
          _handleInput(); // Run search to populate results if not empty
        }

        disableBodyScroll(node, {
          allowTouchMove: function allowTouchMove(el) {
            while (el && el !== document.body) {
              if (el.getAttribute("data-scroll-lock-ignore") !== null) {
                return true;
              }
              el = el.parentNode;
            }
          },
          reserveScrollBarGap: true
        });
      }
    }
  }
  function handleBreakpointChange() {
    if (quickSearchIsOpen()) _toggleSearch();
  }
  function _setLayoutVars() {
    window.requestAnimationFrame(function () {
      var searchBounds = node.getBoundingClientRect();
      var headerBoundsLeft = header.dataset.navigationPosition === "below" ? headerContentEl.getBoundingClientRect().left : 0;
      _setVar(activeSearchContainer, "--quick-search-width", "".concat(searchBounds.width, "px"));
      _setVar(activeSearchContainer, "--quick-search-height", "".concat(searchBounds.height, "px"));
      _setVar(activeSearchContainer, "--quick-search-left", "".concat(searchBounds.left, "px"));
      _setVar(activeSearchContainer, "--header-left", "".concat(headerBoundsLeft, "px"));
    });
  }
  function _setVar(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function _handleTypeChoice(type) {
    typeChoice = type;
    productTypeEl.value = type;
    fauxProductTypeEl.value = type;
    _updatePlaceholder();
  }
  function _updatePlaceholder() {
    var placeholder;
    if (typeChoice && typeChoice !== "") {
      var typeChoicePlaceholder = placeholderTextWithinType.replace("{{ type }}", typeChoice);
      placeholder = typeChoicePlaceholder;
    } else {
      placeholder = placeholderText;
    }
    fauxInputTextEl.innerText = placeholder;
    inputEl.placeholder = placeholder;
  }
  function reset() {
    inputEl.value = "";
    i$1(formEl, classes$e.searchActive);
    if (resultsContainerEl) {
      resultsContainerEl.innerHTML = "";
    }
    _updatePlaceholder();
    fauxInputEl.dataset.placeholderActive = true;
  }
  function showHeaderOverlay() {
    r$1("headerOverlay:show");
  }
  function hideHeaderOverlay() {
    r$1("headerOverlay:hide");
  }
  function open() {
    fauxInputEl.click();
  }
  function destroy() {
    var _headerRO;
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_headerRO = headerRO) === null || _headerRO === void 0 ? void 0 : _headerRO.disconnect();
  }
  return {
    destroy: destroy,
    open: open
  };
}

var activateTemplate = function activateTemplate(key) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var templateElement = document.querySelector("template[data-template-key='".concat(key, "']"));
  if (!templateElement) {
    if (options.resolveOnMissing) {
      // eslint-disable-next-line no-console
      console.warn("Template not found, resolving because of 'resolveOnMissing option");
      return Promise.resolve({
        wasInjected: false
      });
    }
    return Promise.reject(new Error("Template not found"));
  }
  if (templateElement.hasAttribute("data-has-been-activated")) {
    return Promise.resolve({
      wasInjected: false
    });
  }
  var promise = new Promise(function (resolve) {
    // Old Safari kludge: dynamically inserted srcsets are not respected, so we have to force a rerender
    // of image after https://stackoverflow.com/questions/45487105/ajax-loaded-images-in-safari-not-respecting-srcset
    var doKludgeForOldSafari = navigator.userAgent.includes("Safari") && navigator.userAgent.includes("Version/15");
    var templateClone = templateElement.content.cloneNode(true);
    var images;
    if (doKludgeForOldSafari) {
      images = templateClone.querySelectorAll("img[srcset]");
    }
    templateElement.after(templateClone);
    if (doKludgeForOldSafari) {
      images.forEach(function (image) {
        image.outerHTML = image.outerHTML;
      });
    }
    templateElement.setAttribute("data-has-been-activated", true);
    resolve({
      wasInjected: true
    });
  });
  return promise;
};

function Navigation$1(node, headerSection) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  if (!node) return;
  var dropdownTriggers = t$2("[data-dropdown-trigger]", node);
  var meganavTriggers = t$2("[data-meganav-trigger]", node);
  var nonTriggers = t$2(".navigation__links-list > li > [data-link]:not([data-meganav-trigger]):not([data-dropdown-trigger])", node);
  var topLevelLinks = t$2(".navigation__links-list > li > [data-link]", node);
  var secondLevelNonTriggers = t$2(".navigation__submenu[data-depth=\"1\"] > ul > li > [data-link]:not([data-dropdown-trigger])", node);
  var header = n$2('[data-section-type="header"]', document);
  var primaryRow = n$2(".header__links", headerSection);
  var submenuItem = n$2(".navigation__submenu .navigation__submenu-item", node);

  // Set submenu item height for submenu depth 2 offset
  if (submenuItem) {
    node.style.setProperty("--submenu-item-height", "".concat(submenuItem.clientHeight, "px"));
  }
  var delegate = new Delegate(document.body);
  delegate.on("click", null, function (e) {
    return handleClick(e);
  });
  var events = [e$2(headerSection, "mouseleave", function () {
    i$1(header, "animation--dropdowns-have-animated-once");
    i$1(header, "animation--dropdowns-have-animated-more-than-once");
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) closeAll();
  }),
  // Listen to horizontal scroll to offset inner menus
  e$2(node, "scroll", function () {
    document.documentElement.style.setProperty("--navigation-menu-offet", "".concat(node.scrollLeft, "px"));
  }),
  // Close open submenus when another link is hovered in same submenu
  e$2(secondLevelNonTriggers, "mouseover", function (e) {
    var parentSubmenu = e.currentTarget.closest("[data-submenu]");
    closeAll(parentSubmenu);
  }),
  // Close all menus if the header account link is clicked
  c("header-account-link:clicked", function () {
    closeAll(node);
  })];
  if (options.interaction === "hover") {
    addHoverListeners();
  } else if (options.interaction === "click") {
    addClickListeners();
  }
  function addHoverListeners() {
    events.push(e$2(dropdownTriggers, "focus", function (e) {
      e.preventDefault();
      toggleMenu(e.currentTarget.parentNode);
    }), e$2(dropdownTriggers, "mouseover", function (e) {
      e.preventDefault();
      toggleMenu(e.currentTarget.parentNode, true);
    }), e$2(meganavTriggers, "focus", function (e) {
      e.preventDefault();
      showMeganav(e.target, e.target.dataset.meganavHandle);
    }), e$2(meganavTriggers, "mouseover", function (e) {
      e.preventDefault();
      showMeganav(e.target, e.target.dataset.meganavHandle);
    }), e$2(nonTriggers, "mouseover", function () {
      closeAll();
    }), e$2(primaryRow, "mouseout", function (e) {
      var _e$relatedTarget;
      var isMousingOutOfPrimaryRow = ((_e$relatedTarget = e.relatedTarget) === null || _e$relatedTarget === void 0 ? void 0 : _e$relatedTarget.closest(".header__links")) != primaryRow;
      if (isMousingOutOfPrimaryRow) {
        closeAll();
      }
    }), e$2(t$2(".navigation__links-list > li > a", node), "focus", function () {
      if (!userIsUsingKeyboard()) return;
      closeAll();
    }), e$2(t$2("[data-link]", node), "focus", function (e) {
      e.preventDefault();
      if (!userIsUsingKeyboard()) return;
      var link = e.currentTarget;
      if (link.hasAttribute("data-dropdown-trigger")) {
        toggleMenu(link.parentNode);
      }
      var siblings = t$2("[data-link]", link.parentNode.parentNode);
      siblings.forEach(function (el) {
        return l(t$2("[data-submenu]", el.parentNode), "active", el === link);
      });
    }),
    // Close everything when focus leaves the main menu and NOT into a meganav
    e$2(t$2("[data-link]", node), "focusout", function (e) {
      if (!userIsUsingKeyboard()) return;
      if (e.relatedTarget && !(e.relatedTarget.hasAttribute("data-link") || e.relatedTarget.closest(".meganav"))) {
        closeAll();
      }
    }));
  }
  function addClickListeners() {
    events.push(e$2(dropdownTriggers, "click", function (e) {
      e.preventDefault();
      toggleMenu(e.currentTarget.parentNode);
    }), e$2(meganavTriggers, "click", function (e) {
      e.preventDefault();
      if (e.target.getAttribute("aria-expanded") == "true") {
        closeAll();
      } else {
        showMeganav(e.target, e.target.dataset.meganavHandle);
      }
    }), e$2(nonTriggers, "click", function () {
      closeAll();
    }),
    // Close open dropdowns when next top level item receives tab focus
    e$2(topLevelLinks, "focus", function () {
      closeAll();
    }));
  }
  function userIsUsingKeyboard() {
    return a$1(document.body, "user-is-tabbing");
  }
  function showMeganav(menuTrigger, handle) {
    closeAll(undefined);
    activateTemplate("meganav:".concat(handle)).then(function () {
      var menu = n$2(".meganav[data-menu-handle=\"".concat(handle, "\"]"), header);
      if (!menu) {
        return;
      }
      if (shouldAnimate(menu)) {
        animateMeganav(menu);
      }
      animationHandler();
      menuTrigger.setAttribute("aria-expanded", true);
      menu.setAttribute("aria-hidden", false);
      u$1(header, "dropdown-active");
      u$1(menu, "active");
      menu.style.setProperty("--mega-nav-top-offset", "".concat(menu.getBoundingClientRect().top, "px"));
    });
  }
  function alignMenuToTrigger(menu, menuTrigger) {
    var headerInner = n$2(".header__inner", headerSection);
    menuTrigger.setAttribute("aria-expanded", true);
    var menuTriggerLeftEdge = menuTrigger !== null && menuTrigger !== void 0 && menuTrigger.getBoundingClientRect ? menuTrigger.getBoundingClientRect().left : menuTrigger.offsetLeft;
    var menuWidth = menu.getBoundingClientRect ? menu.getBoundingClientRect().width : menu.offsetWidth;
    var headerWidth = headerInner.getBoundingClientRect ? headerInner.getBoundingClientRect().width : headerInner.offsetWidth;
    var viewportWidth = window.innerWidth;
    var outerMargins = viewportWidth - headerWidth;
    var menuLeftAlignment = menuTriggerLeftEdge;

    // menu width exceeds available width from trigger point

    if (menuLeftAlignment + menuWidth > viewportWidth) {
      var offset = viewportWidth - menuWidth;
      if (offset < outerMargins) {
        // center menu if width exceeds but would push passed the left edge.
        var menuCenterOffset = offset / 2;
        menuLeftAlignment = offset - menuCenterOffset;
      } else {
        // menu will align offset left without pushing to the right edge
        menuLeftAlignment = offset;
      }
    }
    menu.style.left = "".concat(menuLeftAlignment, "px");
    u$1(menu, "custom-alignment");
  }
  function alignSubmenu(menu, parentSubmenu) {
    var _parentSubmenu$getBou;
    var viewportWidth = window.innerWidth;
    var parentSubmenuRightPosition = parentSubmenu === null || parentSubmenu === void 0 || (_parentSubmenu$getBou = parentSubmenu.getBoundingClientRect()) === null || _parentSubmenu$getBou === void 0 ? void 0 : _parentSubmenu$getBou.right;
    var availableSpace = viewportWidth - parentSubmenuRightPosition - 24;
    var innerMenu = n$2(".navigation__submenu-list", menu);
    var menuWidth = innerMenu.offsetWidth;
    availableSpace < menuWidth ? menu.dataset.position = "left" : menu.dataset.position = "right";
  }
  function toggleMenu(el, force) {
    var menu = n$2("[data-submenu]", el);
    var menuTrigger = n$2("[data-link]", el);
    var parentSubmenu = el.closest("[data-submenu]");
    animationHandler();
    var action;
    if (force) {
      action = "open";
    } else if (force !== undefined) {
      action = "close";
    }
    if (!action) {
      action = a$1(menu, "active") ? "close" : "open";
    }
    if (action === "open") {
      // Make sure all lvl 2 submenus are closed before opening another
      if ((parentSubmenu === null || parentSubmenu === void 0 ? void 0 : parentSubmenu.dataset.depth) === "1") {
        closeAll(parentSubmenu);
      } else {
        closeAll(undefined);
      }
      showMenu(el, menuTrigger, menu);
    }
    if (action == "close") {
      hideMenu(el, menuTrigger, menu);
    }
  }
  function showMenu(el, menuTrigger, menu) {
    menuTrigger.setAttribute("aria-expanded", true);
    menu.setAttribute("aria-hidden", false);
    var depth = parseInt(menu.dataset.depth, 10);
    var childSubmenu = t$2('[data-depth="2"]', el);
    if (depth === 1) {
      alignMenuToTrigger(menu, menuTrigger);
    }
    if (depth === 1 && childSubmenu.length) {
      childSubmenu.forEach(function (sub) {
        return alignSubmenu(sub, menu);
      });
    }
    u$1(menu, "active");
    u$1(header, "dropdown-active");
  }
  function hideMenu(el, menuTrigger, menu) {
    // If the toggle is closing the element from the parent close all internal
    if (a$1(el.parentNode, "navigation__links-list")) {
      closeAll();
      return;
    }
    menuTrigger.setAttribute("aria-expanded", false);
    menu.setAttribute("aria-hidden", true);
    i$1(menu, "active");
  }

  // We want to close the menu when anything is clicked that isn't a submenu
  function handleClick(e) {
    if (!e.target.closest("[data-submenu-parent]") && !e.target.closest(".meganav") && !e.target.closest("[data-search]") && !e.target.closest("[data-quick-search]")) {
      closeAll();
    }
  }

  // TODO: Is 'options' needed here? Also do we need to specify 'undefined' when calling this function
  // wihtout any parameters?
  function closeAll() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : node;
    var subMenus = t$2("[data-submenu]", target);
    var parentTriggers = t$2("[data-parent], [data-link]", target);
    i$1(subMenus, "active");
    subMenus.forEach(function (sub) {
      return sub.setAttribute("aria-hidden", true);
    });
    parentTriggers.forEach(function (trig) {
      return trig.setAttribute("aria-expanded", false);
    });
    i$1(header, "dropdown-active");
  }
  function animationHandler() {
    // The header dropdown animations should only run on the first
    // menu that is opened, then not on subsequent menus.
    // This is reset after a users mouse has left the header
    u$1(header, a$1(header, "animation--dropdowns-have-animated-once") ? "animation--dropdowns-have-animated-more-than-once" : "animation--dropdowns-have-animated-once");
  }
  function destroy() {
    delegate.off();
    events.forEach(function (evt) {
      return evt();
    });
  }
  return {
    destroy: destroy,
    closeAll: closeAll
  };
}

function AccountLogin (node) {
  var main = n$2('[data-part="login"]', node);
  var reset = n$2('[data-part="reset"]', node);
  var toggles = t$2("[data-toggle]", node);
  var loginError = n$2(".form-status__message--error", reset);
  var isSuccess = n$2(".form-status__message--success", reset);
  var successMessage = n$2("[data-success-message]", node);
  if (isSuccess) {
    u$1(successMessage, "visible");
    u$1(reset, "hide");
  }
  if (loginError) {
    u$1(main, "hide");
    i$1(reset, "hide");
    main.setAttribute("aria-hidden", true);
    reset.setAttribute("aria-hidden", false);
  }
  function toggleView(e) {
    e && e.preventDefault();
    l([main, reset], "hide");
    main.setAttribute("aria-hidden", a$1(main, "hide"));
    reset.setAttribute("aria-hidden", a$1(reset, "hide"));
  }
  var events = [e$2(toggles, "click", toggleView)];
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  };
  return {
    unload: unload
  };
}

var selectors$H = {
  accountLink: "[data-account-link]",
  accountLogin: "[data-account-login][data-scope='component']",
  accountOverview: ".account-overview"
};
var classes$d = {
  active: "active"
};
function AccountQuickView (node) {
  if (!node) return;
  var linkWrapper = node.parentNode;
  var accountLink = n$2(selectors$H.accountLink, linkWrapper);
  var isLoginForm = Boolean(n$2(selectors$H.accountLogin, node));
  var accountLogin;
  if (isLoginForm) {
    accountLogin = AccountLogin(node);
  }
  var delegate = new Delegate(document.body);
  delegate.on("click", null, function (e) {
    return handleClick(e);
  });
  var events = [e$2(accountLink, "click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    /*
      TODO: Explore using the associated settings to change the header account/cart links
      into buttons when 'enable_quick_sign_in' and 'enable_quick_cart' are enabled. This should negate
      the need for this hack of emitting an event to get around `e.stopPropagation()` preventing other
      popups from closing.
    */
    r$1("header-account-link:clicked");
    toggleQuickView();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) close();
  })];
  function toggleQuickView() {
    l(accountLink, classes$d.active, !a$1(node, classes$d.active));
    l(node, classes$d.active, !a$1(node, classes$d.active));
    node.setAttribute("aria-hidden", !a$1(node, classes$d.active));
  }
  function handleClick(e) {
    if (!e.target.closest(selectors$H.accountLogin) && !e.target.closest(selectors$H.accountOverview)) {
      if (!a$1(node, classes$d.active)) return;
      close();
    }
  }
  function close() {
    i$1(accountLink, classes$d.active);
    i$1(node, classes$d.active);
    node.setAttribute("aria-hidden", true);
  }
  var unload = function unload() {
    var _accountLogin;
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_accountLogin = accountLogin) === null || _accountLogin === void 0 ? void 0 : _accountLogin.unload();
  };
  return {
    unload: unload
  };
}

var selectors$G = {
  progressBar: ".free-shipping-bar__bar",
  message: ".free-shipping-bar__message"
};
function freeShippingBar(node) {
  if (!node) return;
  var _node$dataset = node.dataset,
    threshold = _node$dataset.threshold,
    cartTotal = _node$dataset.cartTotal,
    freeShippingSuccessMessage = _node$dataset.freeShippingSuccessMessage,
    freeShippingPendingMessage = _node$dataset.freeShippingPendingMessage;
  var thresholdInCents;
  var events = [];
  _initFreeShippingBar();
  function _initFreeShippingBar() {
    var _window$Shopify;
    cartTotal = parseInt(cartTotal, 10);

    // Account for different currencies using the Shopify currency rate
    threshold = Math.round(parseInt(threshold, 10) * (((_window$Shopify = window.Shopify) === null || _window$Shopify === void 0 || (_window$Shopify = _window$Shopify.currency) === null || _window$Shopify === void 0 ? void 0 : _window$Shopify.rate) || 1));
    thresholdInCents = threshold * 100;
    _setProgressMessage();
    _setProgressBar();
    node.dataset.isLoaded = true;
    events.push(c("cart:updated", function (_ref) {
      var cart = _ref.cart;
      return _updateFreeShippingBar(cart);
    }));
  }
  function _updateFreeShippingBar(cart) {
    cartTotal = cart.total_price;
    _setProgressMessage();
    _setProgressBar();
  }
  function _setProgressMessage() {
    var message = n$2(selectors$G.message, node);
    if (cartTotal >= thresholdInCents) {
      node.dataset.isOverThreshold = true;
      message.innerText = freeShippingSuccessMessage;
    } else {
      var remainder = Math.abs(cartTotal - thresholdInCents);
      node.dataset.isOverThreshold = false;
      message.innerHTML = freeShippingPendingMessage.replace("{{ remaining_amount }}", "<span class=\"fs-body-bold\">".concat(formatMoney(remainder), "</span>"));
    }
  }
  function _setProgressBar() {
    var progressBar = n$2(selectors$G.progressBar, node);
    var progress = cartTotal < thresholdInCents ? cartTotal / threshold : 100;
    progressBar.style.setProperty("--progress-width", "".concat(progress, "%"));
  }
  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }
  return {
    unload: unload
  };
}

var selectors$F = {
  header: ".header__outer-wrapper",
  containerInner: ".purchase-confirmation-popup__inner",
  freeShippingBar: ".free-shipping-bar",
  viewCartButton: ".purchase-confirmation-popup__view-cart",
  quickCart: ".quick-cart",
  closeButton: ".purchase-confirmation-popup__close-button"
};
var classes$c = {
  active: "active",
  hidden: "hidden",
  confirmationOpen: "confirmation-popup-open"
};
function PurchaseConfirmationPopup(node) {
  if (!node) return;
  var quickCartEnabled = Boolean(n$2(selectors$F.quickCart, document));
  var containerInner = n$2(selectors$F.containerInner, node);
  var purchaseConfirmationAnimation = null;
  var timeout;
  if (shouldAnimate(node)) {
    purchaseConfirmationAnimation = animatePurchaseConfirmation(node);
  }
  var delegate = new Delegate(node);
  delegate.on("click", selectors$F.viewCartButton, function (event) {
    if (!quickCartEnabled) return;
    event.preventDefault();
    r$1("quick-cart:open");
    close();
  });
  delegate.on("click", selectors$F.closeButton, function (event) {
    event.preventDefault();
    close();
  });
  delegate.on("keydown", selectors$F.containerInner, function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) close();
  });
  c("confirmation-popup:open", function (_, _ref2) {
    var product = _ref2.product;
    return getItem(product);
  });
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true
  });
  function getItem(product) {
    var requestUrl = "".concat(window.theme.routes.cart.base, "/?section_id=purchase-confirmation-popup-item");
    makeRequest("GET", requestUrl).then(function (response) {
      var container = document.createElement("div");
      container.innerHTML = response;
      containerInner.innerHTML = "";
      containerInner.appendChild(container);
      var freeShippingBar$1 = n$2(selectors$F.freeShippingBar, containerInner);
      if (freeShippingBar$1) {
        freeShippingBar(freeShippingBar$1);
      }

      // Show product within cart that was newly added
      var addedProduct = n$2("[data-product-key=\"".concat(product.key, "\"]"), node);
      i$1(addedProduct, classes$c.hidden);
      open();
    });
  }
  function open() {
    u$1(node, classes$c.active);
    u$1(document.body, classes$c.confirmationOpen);
    focusTrap.activate();
    if (shouldAnimate(node)) {
      purchaseConfirmationAnimation.animate();
    }
    if (!a$1(document.body, "user-is-tabbing")) {
      timeout = setTimeout(function () {
        close();
      }, 5000);

      // Clear timeout if mouse enters, then close if it leaves
      containerInner.addEventListener("mouseover", function () {
        clearTimeout(timeout);
        timeout = null;
        containerInner.addEventListener("mouseleave", function () {
          setTimeout(function () {
            close();
          }, 200);
        }, {
          once: true
        });
      }, {
        once: true
      });
    }
  }
  function close() {
    i$1(node, classes$c.active);
    i$1(document.body, classes$c.confirmationOpen);
    focusTrap.deactivate();
    if (shouldAnimate(node)) {
      setTimeout(function () {
        purchaseConfirmationAnimation.reset();
      }, 500);
    }
  }
}

/**
 * Takes a selector and updates the innerHTML of that element with the contents found in the updated document
 * @param {*} selector The selector to target
 * @param {*} doc The updated document returned by the fetch request
 */
function updateInnerHTML(selector, doc) {
  var updatedItem = n$2(selector, doc);
  var oldItem = n$2(selector);
  if (updatedItem && oldItem) {
    oldItem.innerHTML = updatedItem.innerHTML;
  }
}

function setHeaderHeightVar$1(height) {
  document.documentElement.style.setProperty("--height-header", "".concat(Math.ceil(height), "px"));
}
function setHeaderStickyHeaderHeight$1(value) {
  document.documentElement.style.setProperty("--header-desktop-sticky-height", "".concat(value, "px"));
}
function setNavBarHeightVar(height) {
  document.documentElement.style.setProperty("--nav-bar-height", "".concat(Math.ceil(height), "px"));
}
var selectors$E = {
  cartTrigger: "[data-header-cart]",
  desktopCartTrigger: ".header__content-desktop [data-header-cart]",
  mobileCartTrigger: ".header__content-mobile [data-header-cart]",
  menuButtons: "[data-menu-button]",
  quickSearch: "[data-quick-search]",
  headerSpace: "[data-header-space]",
  purchaseConfirmation: "[data-purchase-confirmation-popup]",
  navigation: "[data-navigation]",
  navigationBar: "[data-navigation-bar]",
  navBarButton: "[data-nav-bar-button]",
  accountQuickView: "[data-account-quick-view]",
  mobileSearchIcon: ".header__content-mobile [data-header-button-type='search']"
};
var classes$b = {
  headerTransparent: "header-transparent",
  stickyEnabled: "sticky-header-enabled",
  stickyActive: "sticky-header-active",
  hideNavBar: "nav-bar-hidden",
  navBarToggleVisible: "nav-bar-toggle-visible",
  isSticky: "is-sticky",
  active: "active",
  dropdownActive: "dropdown-active"
};
register("header", {
  crossBorder: {},
  onLoad: function onLoad() {
    var _this = this;
    var _this$container$datas = this.container.dataset,
      enableStickyHeader = _this$container$datas.enableStickyHeader,
      transparentHeader = _this$container$datas.transparentHeader,
      navigationInteraction = _this$container$datas.navigationInteraction,
      searchEnabled = _this$container$datas.searchEnabled;
    var menuButtons = t$2(selectors$E.menuButtons, this.container);
    var headerSpace = n$2(selectors$E.headerSpace, document);
    var navBar = n$2(selectors$E.navigationBar, document);
    var navBarToggle = n$2(selectors$E.navBarButton, this.container);
    var quickSearchContainers = t$2(selectors$E.quickSearch, this.container);
    var quickSearchMobileIcon = n$2(selectors$E.mobileSearchIcon, this.container);
    this.meganavOpenedFromDesignMode = false;
    if (window.Shopify.designMode) {
      // In the theme editor we want the templates activated up front
      t$2("template", this.container).forEach(function (templateEl) {
        activateTemplate(templateEl.getAttribute("data-template-key"));
      });
    }
    this.purchaseConfirmationPopup = PurchaseConfirmationPopup(n$2(selectors$E.purchaseConfirmation, document));
    this.navigation = Navigation$1(n$2(selectors$E.navigation, this.container), this.container, {
      interaction: navigationInteraction
    });
    this.accountQuickView = AccountQuickView(n$2(selectors$E.accountQuickView));

    // This is done here AND in the liquid so it is responsive in TE but doesn't wait for JS otherwise
    document.body.classList.toggle(classes$b.headerTransparent, Boolean(transparentHeader));
    document.documentElement.classList.toggle(classes$b.stickyEnabled, Boolean(enableStickyHeader));

    // Using a delegate as fetching the header content to refresh prices / cart count
    // will flush attached events.
    var delegate = new Delegate(this.container);
    delegate.on("click", selectors$E.cartTrigger, function (e) {
      var quickShop = n$2(".quick-cart", document);
      if (!quickShop) return;
      e.preventDefault();
      r$1("quick-cart:open");
    });
    var hasHidden;
    document.addEventListener("visibilitychange", function () {
      if (!hasHidden && (hasHidden = document.visibilityState === "hidden") && navigator.sendBeacon) {
        // eslint-disable-next-line no-undef , no-process-env
        navigator.sendBeacon("https://files.cartcdn.com/p", Shopify.shop);
      }
    });

    // These all return a function for cleanup
    this.listeners = [c("cart:updated", function () {
      // Fetching header to ensure correct money formatting
      makeRequest("GET", "".concat(window.theme.routes.root, "?section_id=").concat(_this.id)).then(function (response) {
        var _this$accountQuickVie;
        var container = document.createElement("div");
        container.innerHTML = response;
        updateInnerHTML(selectors$E.mobileCartTrigger, container);
        updateInnerHTML(selectors$E.desktopCartTrigger, container);
        (_this$accountQuickVie = _this.accountQuickView) === null || _this$accountQuickVie === void 0 ? void 0 : _this$accountQuickVie.unload();
        _this.accountQuickView = AccountQuickView(n$2(selectors$E.accountQuickView));
      });
    }), e$2(document, "apps:product-added-to-cart", function () {
      cart.get().then(function (data) {
        r$1("cart:updated", {
          cart: data
        });
      });
    }), e$2(menuButtons, "click", function (event) {
      event.preventDefault();
      r$1("mobile-menu:open");
    }), c("search:focused", function () {
      _this.navigation.closeAll();
    })];
    if (navBar) {
      this.listeners.push(e$2(navBarToggle, "click", function (e) {
        var navIsVisble = e.currentTarget.getAttribute("aria-expanded") == "true";
        l(document.documentElement, classes$b.hideNavBar, navIsVisble);
        if (navIsVisble) {
          e.currentTarget.setAttribute("aria-expanded", false);
        } else {
          e.currentTarget.setAttribute("aria-expanded", true);
        }
      }));
    }
    if (searchEnabled === "true" && quickSearchMobileIcon) {
      this.listeners.push(e$2(quickSearchMobileIcon, "click", function (e) {
        e.preventDefault();
        r$1("mobile-quick-search:open");
      }));
    }
    this.components = [];
    quickSearchContainers.forEach(function (quickSearchContainer) {
      _this.components.push(QuickSearch(quickSearchContainer, _this.container));
    });
    this.navigation && this.components.push(this.navigation);
    if (enableStickyHeader) {
      // Our header is always sticky (with position: sticky) however at some
      // point we want to adjust the styling (eg. box-shadow) so we toggle
      // the is-sticky class when our arbitrary space element (.header__space)
      // goes in and out of the viewport.
      this.io = new IntersectionObserver(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          visible = _ref2[0].isIntersecting;
        l(_this.container, classes$b.isSticky, !visible);
        l(document.documentElement, classes$b.stickyActive, !visible);

        // Our navBar (only visible in some layouts) needs to animate: hide / show
        // after we have scrolled down the page enough that the changing of the height
        // will not mess with the above observer.
        if (navBar) {
          l(document.documentElement, classes$b.hideNavBar, !visible);
          l(document.documentElement, classes$b.navBarToggleVisible, !visible);
          if (visible) {
            navBarToggle.setAttribute("aria-expanded", false);
          }
          r$1("navBar:change");
        }
      });
      this.io.observe(headerSpace);
    }

    // This will watch the height of the header and update the --height-header
    // css variable when necessary. That var gets used for the negative top margin
    // to render the page body under the transparent header
    provideResizeObserver().then(function (_ref3) {
      var ResizeObserver = _ref3.ResizeObserver;
      _this.ro = new ResizeObserver(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 1),
          target = _ref5[0].target;
        var headerHeight = target.offsetHeight;
        setHeaderHeightVar$1(target.getBoundingClientRect() ? target.getBoundingClientRect().height : target.offsetHeight);
        setHeaderStickyHeaderHeight$1(headerHeight);
      });
      _this.ro.observe(_this.container);
      if (navBar) {
        // This will watch the height of the navigation bar (only visible in some layouts)
        // css variable when necessary. The var is used to ensure it the bar is hidden or shown
        // after enough space has scrolled to ensure the animation does not interfere with the
        // sticky header.
        _this.navRo = new ResizeObserver(function (_ref6) {
          var _ref7 = _slicedToArray(_ref6, 1),
            target = _ref7[0].target;
          setNavBarHeightVar(target.offsetHeight);
        });
        _this.navRo.observe(navBar);
      }
    });
    window.on = c;
    window.emit = r$1;
  },
  handleResponse: function handleResponse() {
    JSON.parse(this.responseText);
  },
  onBlockSelect: function onBlockSelect(_ref8) {
    var target = _ref8.target;
    this.navigation.closeAll();
    u$1(this.container, classes$b.dropdownActive);
    u$1(target, classes$b.active);
    this.meganavOpenedFromDesignMode = true;
  },
  onBlockDeselect: function onBlockDeselect(_ref9) {
    var target = _ref9.target;
    i$1(this.container, classes$b.dropdownActive);
    i$1(target, classes$b.active);
    this.meganavOpenedFromDesignMode = false;
  },
  onUnload: function onUnload() {
    var _this$accountQuickVie2;
    this.listeners.forEach(function (l) {
      return l();
    });
    this.components.forEach(function (c) {
      return c.destroy();
    });
    this.io && this.io.disconnect();
    this.navIo && this.navIo.disconnect();
    this.ro.disconnect();
    this.navRo && this.navRo.disconnect();
    (_this$accountQuickVie2 = this.accountQuickView) === null || _this$accountQuickVie2 === void 0 ? void 0 : _this$accountQuickVie2.unload();
  }
});

var selectors$D = {
  popupTrigger: "[data-popup-trigger]"
};
var passwordUnlock = function passwordUnlock(node) {
  var events = [];
  var popupTriggers = t$2(selectors$D.popupTrigger, node);
  if (popupTriggers.length) {
    events.push(e$2(popupTriggers, "click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var content = n$2("#modal-password-unlock", node);
      r$1("modal:open", null, {
        modalContent: content
      });
    }));
  }
  function unload() {
    events.forEach(function (evt) {
      return evt();
    });
  }
  return {
    unload: unload
  };
};

function setHeaderHeightVar(height) {
  document.documentElement.style.setProperty("--height-header", "".concat(Math.ceil(height), "px"));
}
function setHeaderStickyHeaderHeight(value) {
  document.documentElement.style.setProperty("--header-desktop-sticky-height", "".concat(value, "px"));
}
var selectors$C = {
  headerSpace: "[data-header-space]",
  navigation: "[data-navigation]",
  navigationBar: "[data-navigation-bar]",
  navBarButton: "[data-nav-bar-button]"
};
var classes$a = {
  headerTransparent: "header-transparent",
  stickyEnabled: "sticky-header-enabled",
  stickyActive: "sticky-header-active",
  hideNavBar: "nav-bar-hidden",
  navBarToggleVisible: "nav-bar-toggle-visible",
  isSticky: "is-sticky",
  active: "active"
};
register("password-header", {
  crossBorder: {},
  onLoad: function onLoad() {
    var _this = this;
    var _this$container$datas = this.container.dataset,
      enableStickyHeader = _this$container$datas.enableStickyHeader,
      transparentHeader = _this$container$datas.transparentHeader;
    var headerSpace = n$2(selectors$C.headerSpace, document);
    var navBar = n$2(selectors$C.navigationBar, document);
    var navBarToggle = n$2(selectors$C.navBarButton, this.container);
    if (window.Shopify.designMode) {
      // In the theme editor we want the templates activated up front
      t$2("template", this.container).forEach(function (templateEl) {
        activateTemplate(templateEl.getAttribute("data-template-key"));
      });
    }

    // This is done here AND in the liquid so it is responsive in TE but doesn't wait for JS otherwise
    document.body.classList.toggle(classes$a.headerTransparent, Boolean(transparentHeader));
    document.documentElement.classList.toggle(classes$a.stickyEnabled, Boolean(enableStickyHeader));
    if (enableStickyHeader) {
      // Our header is always sticky (with position: sticky) however at some
      // point we want to adjust the styling (eg. box-shadow) so we toggle
      // the is-sticky class when our arbitrary space element (.header__space)
      // goes in and out of the viewport.
      this.io = new IntersectionObserver(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 1),
          visible = _ref2[0].isIntersecting;
        l(_this.container, classes$a.isSticky, !visible);
        l(document.documentElement, classes$a.stickyActive, !visible);

        // Our navBar (only visible in some layouts) needs to animate: hide / show
        // after we have scrolled down the page enough that the changing of the height
        // will not mess with the above observer.
        if (navBar) {
          l(document.documentElement, classes$a.hideNavBar, !visible);
          l(document.documentElement, classes$a.navBarToggleVisible, !visible);
          if (visible) {
            navBarToggle.setAttribute("aria-expanded", false);
          }
          r$1("navBar:change");
        }
      });
      this.io.observe(headerSpace);
    }

    // This will watch the height of the header and update the --height-header
    // css variable when necessary. That var gets used for the negative top margin
    // to render the page body under the transparent header
    provideResizeObserver().then(function (_ref3) {
      var ResizeObserver = _ref3.ResizeObserver;
      _this.ro = new ResizeObserver(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 1),
          target = _ref5[0].target;
        var headerHeight = target.offsetHeight;
        setHeaderHeightVar(target.getBoundingClientRect() ? target.getBoundingClientRect().height : target.offsetHeight);
        setHeaderStickyHeaderHeight(headerHeight);
      });
      _this.ro.observe(_this.container);
    });
    this.passwordUnlock = passwordUnlock(this.container);
  },
  onUnload: function onUnload() {
    this.passwordUnlock;
    this.io && this.io.disconnect();
    this.ro.disconnect();
  }
});

var selectors$B = {
  headerInner: ".header__inner",
  form: ".disclosure-form",
  formItem: ".disclosure-form__item",
  list: "[data-disclosure-list]",
  toggle: "[data-disclosure-toggle]",
  input: "[data-disclosure-input]",
  option: "[data-disclosure-option]"
};
var classes$9 = {
  disclosureListRight: "disclosure--right",
  disclosureListTop: "disclosure--top"
};
function has(list, selector) {
  return list.map(function (l) {
    return l.contains(selector);
  }).filter(Boolean);
}
function Disclosure(node) {
  var headerInner = n$2(selectors$B.headerInner);
  var form = node.closest(selectors$B.form);
  var formItem = node.closest(selectors$B.formItem);
  var list = n$2(selectors$B.list, node);
  var toggle = n$2(selectors$B.toggle, node);
  var input = n$2(selectors$B.input, node);
  var options = t$2(selectors$B.option, node);
  var events = [e$2(toggle, "click", handleToggle), e$2(options, "click", submitForm), e$2(document, "click", handleBodyClick), e$2(toggle, "focusout", handleToggleFocusOut), e$2(list, "focusout", handleListFocusOut), e$2(node, "keyup", handleKeyup)];
  function submitForm(evt) {
    evt.preventDefault();
    var value = evt.currentTarget.dataset.value;
    input.value = value;
    form.submit();
  }
  function handleToggleFocusOut(evt) {
    var disclosureLostFocus = has([node], evt.relatedTarget).length === 0;
    if (disclosureLostFocus) {
      hideList();
    }
  }
  function handleListFocusOut(evt) {
    var childInFocus = has([node], evt.relatedTarget).length > 0;
    var ariaExpanded = toggle.getAttribute("aria-expanded") === "true";
    if (ariaExpanded && !childInFocus) {
      hideList();
    }
  }
  function handleKeyup(evt) {
    if (evt.which !== 27) return;
    hideList();
    toggle.focus();
  }
  function handleToggle() {
    var ariaExpanded = toggle.getAttribute("aria-expanded") === "true";
    if (ariaExpanded) {
      hideList();
    } else {
      showList();
    }
  }
  function handleBodyClick(evt) {
    var isOption = has([node], evt.target).length > 0;
    var ariaExpanded = toggle.getAttribute("aria-expanded") === "true";
    if (ariaExpanded && !isOption) {
      hideList();
    }
  }
  function showList() {
    formItem.dataset.isExpanded = true;
    toggle.setAttribute("aria-expanded", true);
    list.setAttribute("aria-hidden", false);
    positionGroup();
  }
  function hideList() {
    formItem.dataset.isExpanded = false;
    toggle.setAttribute("aria-expanded", false);
    list.setAttribute("aria-hidden", true);
  }
  function positionGroup() {
    i$1(node, classes$9.disclosureListTop);
    i$1(node, classes$9.disclosureListRight);
    var headerInnerBounds = headerInner.getBoundingClientRect();
    var nodeBounds = node.getBoundingClientRect();
    var listBounds = list.getBoundingClientRect();

    // check if the drop down list is on the right side of the screen
    // if so position the drop down aligned to the right side of the toggle button
    if (nodeBounds.x + listBounds.width >= headerInnerBounds.width) {
      u$1(node, classes$9.disclosureListRight);
    }

    // check if the drop down list is too close to the bottom of the viewport
    // if so position the drop down aligned to the top of the toggle button
    if (nodeBounds.y >= window.innerHeight / 2) {
      u$1(node, classes$9.disclosureListTop);
    }
  }
  function unload() {
    events.forEach(function (evt) {
      return evt();
    });
  }
  positionGroup();
  return {
    unload: unload
  };
}

var selectors$A = {
  disclosure: "[data-disclosure]",
  header: "[data-header]"
};
register("footer", {
  crossBorder: {},
  onLoad: function onLoad() {
    var _this = this;
    var headers = t$2(selectors$A.header, this.container);
    this.headerClick = e$2(headers, "click", handleHeaderClick);
    function handleHeaderClick(_ref) {
      var currentTarget = _ref.currentTarget;
      var content = currentTarget.nextElementSibling;
      l(currentTarget, "open", !isVisible(content));
      slideStop(content);
      if (isVisible(content)) {
        slideUp(content);
      } else {
        slideDown(content);
      }
    }

    // Wire up Cross Border disclosures
    var cbSelectors = t$2(selectors$A.disclosure, this.container);
    if (cbSelectors) {
      cbSelectors.forEach(function (selector) {
        var d = selector.dataset.disclosure;
        _this.crossBorder[d] = Disclosure(selector);
      });
    }
  },
  onUnload: function onUnload() {
    var _this2 = this;
    this.headerClick();
    Object.keys(this.crossBorder).forEach(function (t) {
      return _this2.crossBorder[t].unload();
    });
  }
});

var atBreakpointChange = function atBreakpointChange(breakpointToWatch, callback) {
  var _screenUnderBP = function _screenUnderBP() {
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    return viewportWidth <= breakpointToWatch;
  };
  var screenUnderBP = _screenUnderBP();
  var widthWatcher = srraf(function (_ref) {
    var vw = _ref.vw;
    var currentScreenWidthUnderBP = vw <= breakpointToWatch;
    if (currentScreenWidthUnderBP !== screenUnderBP) {
      screenUnderBP = currentScreenWidthUnderBP;
      return callback();
    }
  });
  var unload = function unload() {
    widthWatcher.destroy();
  };
  return {
    unload: unload
  };
};

function Navigation(node) {
  if (!node) return;
  var dropdownTriggers = t$2("[data-dropdown-trigger]", node);
  var nonTriggers = t$2(".navigation__links-list > li > [data-link]:not([data-dropdown-trigger])", node);
  var submenuItem = n$2(".navigation__submenu .navigation__submenu-item", node);
  if (!dropdownTriggers.length) return;

  // Set submenu item height for submenu depth 2 offset
  if (submenuItem) {
    node.style.setProperty("--submenu-item-height", "".concat(submenuItem.clientHeight, "px"));
  }
  var delegate = new Delegate(document.body);
  delegate.on("click", null, function (e) {
    return handleClick(e);
  });
  var events = [e$2(dropdownTriggers, "click", function (e) {
    e.preventDefault();
    toggleMenu(e.currentTarget.parentNode);
  }), e$2(nonTriggers, "click", function () {
    closeAll();
  }), e$2(node, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) closeAll();
  }), e$2(t$2(".navigation__links-list > li > a", node), "focus", function () {
    if (!userIsUsingKeyboard()) return;
    closeAll();
  }),
  // Close everything when focus leaves the main menu
  e$2(t$2("[data-link]", node), "focusout", function (e) {
    if (!userIsUsingKeyboard()) return;
    if (e.relatedTarget && !e.relatedTarget.hasAttribute("data-link")) {
      closeAll();
    }
  })];
  function userIsUsingKeyboard() {
    return a$1(document.body, "user-is-tabbing");
  }
  function toggleMenu(el) {
    var menu = n$2("[data-submenu]", el);
    var menuTrigger = n$2("[data-link]", el);
    var parentSubmenu = el.closest("[data-submenu]");
    if (a$1(menu, "active")) {
      hideMenu(el, menuTrigger, menu);
    } else {
      // Make sure all lvl 2 submenus are closed before opening another
      if ((parentSubmenu === null || parentSubmenu === void 0 ? void 0 : parentSubmenu.dataset.depth) === "1") {
        closeAll(parentSubmenu);
      } else {
        closeAll(undefined);
      }
      showMenu(menuTrigger, menu);
    }
  }
  function showMenu(menuTrigger, menu) {
    menuTrigger.setAttribute("aria-expanded", true);
    menu.setAttribute("aria-hidden", false);
    u$1(menu, "active");
  }
  function hideMenu(el, menuTrigger, menu) {
    // If the toggle is closing the element from the parent close all internal
    if (a$1(el.parentNode, "navigation__links-list")) {
      closeAll();
      return;
    }
    menuTrigger.setAttribute("aria-expanded", false);
    menu.setAttribute("aria-hidden", true);
    i$1(menu, "active");
  }

  // We want to close the menu when anything is clicked that isn't a submenu
  function handleClick(e) {
    if (!e.target.closest("[data-submenu-parent]")) {
      closeAll();
    }
  }
  function closeAll() {
    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : node;
    var subMenus = t$2("[data-submenu]", target);
    var parentTriggers = t$2("[data-parent], [data-link]", target);
    i$1(subMenus, "active");
    subMenus.forEach(function (sub) {
      return sub.setAttribute("aria-hidden", true);
    });
    parentTriggers.forEach(function (trig) {
      return trig.setAttribute("aria-expanded", false);
    });
  }
  function destroy() {
    delegate.off();
    events.forEach(function (evt) {
      return evt();
    });
  }
  return {
    destroy: destroy
  };
}

var selectors$z = {
  mobileOnlyInner: ".announcement-bar__item-inner-mobile-only",
  desktopOnlyInner: ".announcement-bar__item-inner-desktop-only",
  disclosure: "[data-disclosure]",
  navigation: "[data-navigation]",
  moreDetailsLink: ".announcement-bar__details-link"
};
register("announcement-bar", {
  setHeightVariable: function setHeightVariable() {
    if (this.container.offsetHeight !== this.lastSetHeight) {
      document.documentElement.style.setProperty("--announcement-height", "".concat(this.container.offsetHeight, "px"));
      this.lastSetHeight = this.container.offsetHeight;
    }
  },
  onLoad: function onLoad() {
    var _this = this;
    var scrollerId = this.container.dataset.scrollerId;
    this.scrollerId = scrollerId;
    this.setHeightVariable();
    var moreDetailsTriggers = t$2(selectors$z.moreDetailsLink, this.container);
    this.scrollerInitialized = false;
    document.addEventListener("scroll-slider-".concat(this.scrollerId, ":initialized"), function () {
      _this.scrollerInitialized = true;
    }, {
      once: true
    });
    this.events = [e$2(moreDetailsTriggers, "click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var contentTargetId = e.target.dataset.contentTargetId;
      var content = n$2("#".concat(contentTargetId), _this.container);
      var container = document.createElement("div");
      container.innerHTML = content.innerHTML;
      r$1("modal:open", null, {
        modalContent: container,
        narrow: true
      });
    }), c("window:resized", function () {
      _this.setHeightVariable();
    })];
    this.disableTabbingToInners = function () {
      // Disable tabbing on items that aren't shown
      var desktopOnlyInners = t$2(selectors$z.desktopOnlyInner, this.container);
      var mobileOnlyInners = t$2(selectors$z.mobileOnlyInner, this.container);
      var desktopIsMobileSize = window.matchMedia(getMediaQuery("below-720")).matches;
      desktopOnlyInners.forEach(function (inner) {
        inner.toggleAttribute("inert", desktopIsMobileSize);
      });
      mobileOnlyInners.forEach(function (inner) {
        inner.toggleAttribute("inert", !desktopIsMobileSize);
      });
    };
    this.disableTabbingToInners();
    this.breakPointHandler = atBreakpointChange(720, function () {
      _this.disableTabbingToInners();
    });
    this.crossBorder = {};
    this.navigation = Navigation(n$2(selectors$z.navigation, this.container));

    // Wire up Cross Border disclosures
    var cbSelectors = t$2(selectors$z.disclosure, this.container);
    if (cbSelectors) {
      cbSelectors.forEach(function (selector) {
        var d = selector.dataset.disclosure;
        _this.crossBorder[d] = Disclosure(selector);
      });
    }
  },
  handleBlockSelect: function handleBlockSelect(index, behavior) {
    dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":pause"));
    dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":go-to-slide"), {
      slideIndex: index,
      behavior: behavior
    });
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var _this2 = this;
    var slide = _ref.target;
    var index = parseInt(slide.dataset.index, 10);

    // When the editor flushes the section on block select
    // we need to wait for the scroll-slider to initialize
    // before we can scroll to the selected slide. The editor
    // will flush section content on setting update, but will
    // not on selecting the block itself.
    if (this.scrollerInitialized) {
      this.handleBlockSelect(index, "instant");
    } else {
      document.addEventListener("scroll-slider-".concat(this.scrollerId, ":initialized"), function () {
        _this2.handleBlockSelect(index, "instant");
      }, {
        once: true
      });
    }
  },
  onBlockDeselect: function onBlockDeselect() {
    dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":play"));
  },
  onUnload: function onUnload() {
    var _this3 = this;
    Object.keys(this.crossBorder).forEach(function (t) {
      return _this3.crossBorder[t].unload();
    });
  }
});

var selectors$y = {
  item: "[data-input-item]",
  itemProperties: "[data-item-properties]",
  quantityInput: "[data-quantity-input]",
  quantityAdd: "[data-add-quantity]",
  quantitySubtract: "[data-subtract-quantity]",
  removeItem: "[data-remove-item]"
};
function QuantityButtons(node) {
  var delegate = new Delegate(node);
  delegate.on("click", selectors$y.quantitySubtract, function (_, target) {
    var item = target.closest(selectors$y.item);
    var key = item.dataset.key;
    var qty = n$2(selectors$y.quantityInput, item).value;
    r$1("quantity-update:subtract", null, {
      key: key
    });
    cart.updateItem(key, parseInt(qty) - 1);
  });
  delegate.on("click", selectors$y.quantityAdd, function (_, target) {
    var item = target.closest(selectors$y.item);
    var key = item.dataset.key;
    var qty = n$2(selectors$y.quantityInput, item).value;
    r$1("quantity-update:add", null, {
      key: key
    });
    cart.updateItem(key, parseInt(qty) + 1);
  });
  delegate.on("click", selectors$y.removeItem, function (_, target) {
    var item = target.closest(selectors$y.item);
    var key = item.dataset.key;
    r$1("quantity-update:remove", null, {
      key: key
    });
    cart.updateItem(key, 0);
  });
  var unload = function unload() {
    delegate.off();
  };
  return {
    unload: unload
  };
}

var strings$4 = window.theme.strings.cart;
var selectors$x = {
  cartNoteTrigger: "[data-order-note-trigger]",
  cartNoteTriggerText: "[data-cart-not-trigger-text]",
  cartNoteInputWrapper: "[cart-note-input]",
  iconPlus: ".icon-plus-small",
  iconMinus: ".icon-minus-small"
};
function CartNoteToggle(node) {
  var delegate = new Delegate(node);
  delegate.on("click", selectors$x.cartNoteTrigger, function (_, target) {
    return handleCartNoteTrigger(target);
  });
  function handleCartNoteTrigger(target) {
    var inputWrapper = n$2(selectors$x.cartNoteInputWrapper, target.parentNode);
    var textInput = n$2("textarea", inputWrapper);

    // Handle icon change when open or close
    var plusIcon = n$2(selectors$x.iconPlus, target);
    var minusIcon = n$2(selectors$x.iconMinus, target);
    l([plusIcon, minusIcon], "hidden");
    if (isVisible(inputWrapper)) {
      slideStop(inputWrapper);
      slideUp(inputWrapper);
      inputWrapper.setAttribute("aria-expanded", false);
      inputWrapper.setAttribute("aria-hidden", true);
      var inputTriggertext = n$2(selectors$x.cartNoteTriggerText, node);

      // Update cart note trigger text
      if (textInput.value === "") {
        inputTriggertext.innerText = strings$4.addCartNote;
      } else {
        inputTriggertext.innerText = strings$4.editCartNote;
      }
    } else {
      slideStop(inputWrapper);
      slideDown(inputWrapper);
      inputWrapper.setAttribute("aria-expanded", true);
      inputWrapper.setAttribute("aria-hidden", false);
    }
  }
  var unload = function unload() {
    delegate.off();
  };
  return {
    unload: unload
  };
}

var selectors$w = {
  quickAddTrigger: "[data-quick-add-trigger]",
  addToCartTrigger: "[data-add-item-id]"
};
function CrossSells(node) {
  var events = [e$2(t$2(selectors$w.quickAddTrigger, node), "click", function (e) {
    var _e$currentTarget$data = e.currentTarget.dataset,
      productUrl = _e$currentTarget$data.productUrl,
      title = _e$currentTarget$data.title;
    if (!productUrl) return;
    r$1("quick-add:open", null, {
      type: "quick-add",
      productUrl: productUrl,
      productTitle: title
    });
  }), e$2(t$2(selectors$w.addToCartTrigger, node), "click", function (e) {
    var addItemId = e.target.dataset.addItemId;
    if (!addItemId) return;
    animateButton(e.target);
    cart.addItemById(addItemId, 1);
    r$1("quick-cart:scrollup");
  })];
  function animateButton(button) {
    u$1(button, "loading");
  }
  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }
  return {
    unload: unload
  };
}

var selectors$v = {
  cartWrapper: ".quick-cart__wrapper",
  innerContainer: ".quick-cart__container",
  overlay: ".quick-cart__overlay",
  closeButton: ".quick-cart__close-icon",
  footer: ".quick-cart__footer",
  items: ".quick-cart__items",
  cartError: ".quick-cart__item-error",
  form: ".quick-cart__form",
  heading: ".quick-cart__heading",
  subtotal: ".quick-cart__footer-subtotal span",
  quantityInput: ".quick-cart .quantity-input__input",
  quantityItem: "[data-input-item]",
  cartDiscounts: ".quick-cart__footer .quick-cart__item-discounts",
  freeShippingBar: "[data-free-shipping-bar]",
  crossSells: "[data-cross-sells]"
};
var classes$8 = {
  active: "active",
  hidden: "hidden",
  updatingQuantity: "pending-quantity-update",
  removed: "is-removed"
};
register("quick-cart", {
  onLoad: function onLoad() {
    var _this = this;
    this.cartWrapper = n$2(selectors$v.cartWrapper, this.container);
    this.cartTrap = createFocusTrap(this.container, {
      allowOutsideClick: true
    });

    // Events are all on events trigger by other components / functions
    this.events = [c("quick-cart:open", function () {
      return _this.openQuickCart();
    }), c("quick-cart:updated", function () {
      return _this.refreshQuickCart();
    }), c("quick-cart:error", function (_, _ref) {
      var key = _ref.key,
        errorMessage = _ref.errorMessage;
      _this.handleErrorMessage(key, errorMessage);
    }), c("quick-cart:scrollup", function () {
      return _this.scrollUpQuickCart();
    }), c(["quantity-update:subtract", "quantity-update:add"], function (_, _ref2) {
      var key = _ref2.key;
      _this.handleQuantityUpdate(key);
    }), c("quantity-update:remove", function (_, _ref3) {
      var key = _ref3.key;
      _this.handleItemRemoval(key);
    }), e$2(document, "apps:product-added-to-cart", function () {
      _this.refreshQuickCart();
      r$1("quick-cart:open");
    })];
    this.quantityButtons = QuantityButtons(this.container);
    this.cartNoteToggle = CartNoteToggle(this.container);

    // We don't want animation for now, but might bring it back when we update to the new
    // quick cart, so leaving the structure in place.
    /* if (shouldAnimate(this.container)) {
      this.animateQuickCart = animateQuickCart(this.container);
    } */

    // Delegate handles all click events due to rendering different content
    // within quick cart
    this.delegate = new Delegate(this.container);
    this.delegate.on("click", selectors$v.overlay, function () {
      return _this.close();
    });
    this.delegate.on("click", selectors$v.closeButton, function () {
      return _this.close();
    });
    this.delegate.on("change", selectors$v.quantityInput, function (e) {
      return _this.handleQuantityInputChange(e);
    });
    this._initFreeShippingBar();
    this._initCrossSells();
  },
  openQuickCart: function openQuickCart() {
    u$1(this.cartWrapper, classes$8.active);
    this.cartTrap.activate();

    // We don't want animation for now, but might bring it back when we update to the new
    // quick cart, so leaving the structure in place.
    // this.animateQuickCart?.open();

    disableBodyScroll(this.container, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }
          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
  },
  refreshQuickCart: function refreshQuickCart() {
    var _this2 = this;
    var url = "".concat(window.theme.routes.cart.base, "?section_id=").concat(this.id);
    makeRequest("GET", url).then(function (response) {
      var _this2$crossSells;
      var container = document.createElement("div");
      container.innerHTML = response;
      var responseInnerContainer = n$2(selectors$v.innerContainer, container);
      var cartHasItems = Boolean(n$2(selectors$v.items, _this2.container));
      var responseHasItems = Boolean(n$2(selectors$v.items, container));
      var freeShippingBar = n$2(selectors$v.freeShippingBar, container);
      var crossSells = n$2(selectors$v.crossSells, _this2.container);
      (_this2$crossSells = _this2.crossSells) === null || _this2$crossSells === void 0 ? void 0 : _this2$crossSells.unload();

      // Cart has items and needs to update them
      if (responseHasItems && cartHasItems) {
        // Update free shipping bar
        if (freeShippingBar && !_this2.freeShippingBar) {
          _this2._initFreeShippingBar();
        }

        // Render cart items
        updateInnerHTML("".concat(selectors$v.cartWrapper, " ").concat(selectors$v.items), container);

        // Render heading (ie. cart count)
        updateInnerHTML("".concat(selectors$v.cartWrapper, " ").concat(selectors$v.heading), container);

        // Render subtotal
        updateInnerHTML("".concat(selectors$v.cartWrapper, " ").concat(selectors$v.subtotal), container);

        // Render cart-level discounts
        updateInnerHTML("".concat(selectors$v.cartWrapper, " ").concat(selectors$v.cartDiscounts), container);

        // Render cross sells
        if (crossSells) {
          updateInnerHTML("".concat(selectors$v.cartWrapper, " ").concat(selectors$v.crossSells), container);
          _this2._initCrossSells();
        }

        // Handle form scroll state
        var form = n$2(selectors$v.form, _this2.container);
        var previousScrollPosition = form.scrollTop || 0;
        form.scrollTop = previousScrollPosition;

        // We don't want animation for now, but might bring it back when we update to the new
        // quick cart, so leaving the structure in place.
        // this.animateQuickCart?.setup();
      } else {
        // Cart needs to render empty from having items, or needs to render
        // items from empty state
        var innerContainer = n$2(selectors$v.innerContainer, _this2.container);
        innerContainer.innerHTML = responseInnerContainer.innerHTML;
        _this2._initFreeShippingBar();
        _this2._initCrossSells();
      }
    });
  },
  handleErrorMessage: function handleErrorMessage(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    if (!item) return;
    var quantityInput = n$2("input", item);
    quantityInput.value = quantityInput.getAttribute("value");
    i$1(n$2(selectors$v.cartError, item), classes$8.hidden);
    document.activeElement.blur();
    i$1(item, classes$8.updatingQuantity);
  },
  handleQuantityUpdate: function handleQuantityUpdate(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    u$1(item, classes$8.updatingQuantity);
  },
  handleItemRemoval: function handleItemRemoval(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    u$1(item, classes$8.removed);
    u$1(item, classes$8.updatingQuantity);
  },
  handleQuantityInputChange: function handleQuantityInputChange(_ref4) {
    var target = _ref4.target;
    var item = target.closest(selectors$v.quantityItem);
    var key = item.dataset.key;
    cart.updateItem(key, parseInt(target.value, 10));
    this.handleQuantityUpdate(key);
  },
  _initCrossSells: function _initCrossSells() {
    var crossSells = n$2(selectors$v.crossSells, this.container);
    if (crossSells) {
      this.crossSells = CrossSells(crossSells);
    }
  },
  _initFreeShippingBar: function _initFreeShippingBar() {
    var _this$freeShippingBar;
    (_this$freeShippingBar = this.freeShippingBar) === null || _this$freeShippingBar === void 0 ? void 0 : _this$freeShippingBar.unload();
    this.freeShippingBar = null;
    var freeShippingBar$1 = n$2(selectors$v.freeShippingBar, this.container);
    if (freeShippingBar$1) {
      this.freeShippingBar = freeShippingBar(freeShippingBar$1);
    }
  },
  scrollUpQuickCart: function scrollUpQuickCart() {
    var form = n$2(selectors$v.form, this.container);
    var previousScrollPosition = 0;

    // delay the scroll up to make it seem more 'fluid'
    setTimeout(function () {
      form.scrollTop = previousScrollPosition;
    }, 300);
  },
  close: function close() {
    var _this3 = this;
    i$1(this.cartWrapper, classes$8.active);
    setTimeout(function () {
      // We don't want animation for now, but might bring it back when we update to the new
      // quick cart, so leaving the structure in place.
      // this.animateQuickCart?.close();

      _this3.cartTrap.deactivate();
      enableBodyScroll(_this3.container);
    }, 250);
  },
  onSelect: function onSelect() {
    this.openQuickCart();
  },
  onDeselect: function onDeselect() {
    this.close();
  },
  onUnload: function onUnload() {
    this.close();
    this.delegate.off();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    this.quantityButtons.unload();
    this.cartNoteToggle.unload();
  }
});

var selectors$u = {
  menuButton: "[data-menu-button]",
  closeButton: ".mobile-menu-close-button",
  overlay: "[data-overlay]",
  item: "[data-action]",
  viewportContent: ".mobile-menu__viewport-content",
  panes: "[data-pane-key]",
  homePane: '[data-pane-key="home"]'
};
var classes$7 = {
  active: "active",
  belowHeader: "below-header"
};
var menuNav = function menuNav(node) {
  var overlay = node.querySelector(selectors$u.overlay);
  var menuButton = document.querySelector(selectors$u.menuButton);
  var closeButton = node.querySelector(selectors$u.closeButton);
  var viewportContentEl = node.querySelector(selectors$u.viewportContent);
  var homePane = node.querySelector(selectors$u.homePane);
  var items = node.querySelectorAll(selectors$u.item);
  var focusTrap = createFocusTrap(node, {
    allowOutsideClick: true,
    preventScroll: true
  });
  overlay.addEventListener("click", close);
  items.forEach(function (item) {
    return item.addEventListener("click", handleItemClick);
  });
  function handleItemClick(e) {
    var action = e.currentTarget.dataset.action;

    // Standard link that goes to a different url
    if (action === "link") return;
    e.preventDefault();
    switch (action) {
      // Element that will navigate to child navigation list
      case "show-sub-pane":
        handleParentClick(e);
        break;
      // Element that goes all the way back to home
      case "home":
        clickHome(e);
        break;
    }
  }
  function open() {
    node.classList.add(classes$7.active);
    document.body.setAttribute("mobile-menu-open", "true");
    menuButton.setAttribute("aria-expanded", true);
    menuButton.setAttribute("aria-label", menuButton.getAttribute("data-aria-label-opened"));
    homePane.addEventListener("scroll", handleCloseButtonBelowHeader);
    setTimeout(function () {
      focusTrap.activate();
      disableBodyScroll(node, {
        hideBodyOverflow: true,
        allowTouchMove: function allowTouchMove(el) {
          while (el && el !== document.body && el.id !== "main") {
            if (el.getAttribute("data-scroll-lock-ignore") !== null) {
              return true;
            }
            el = el.parentNode;
          }
        }
      });
    }, 50);
  }
  function close(e) {
    node.classList.remove(classes$7.active);
    menuButton.setAttribute("aria-expanded", false);
    menuButton.setAttribute("aria-label", menuButton.getAttribute("data-aria-label-closed"));
    e && e.preventDefault();
    focusTrap.deactivate();
    document.body.setAttribute("mobile-menu-open", "false");
    setTimeout(function () {
      var panes = node.querySelectorAll(selectors$u.panes);
      panes.forEach(function (pane) {
        pane.scrollTo(0, 0);
      });
      paneIsBecomingVisible("home");
    }, 500);
    setTimeout(function () {
      enableBodyScroll(node);
      navigate(0);
    }, 250);
  }
  function handleCloseButtonBelowHeader(e) {
    var scrollPosition = e.target.scrollTop;
    if (scrollPosition > 9) {
      closeButton.classList.add(classes$7.belowHeader);
    } else {
      closeButton.classList.remove(classes$7.belowHeader);
    }
  }
  function paneIsBecomingVisible(key) {
    var panes = node.querySelectorAll(selectors$u.panes);
    panes.forEach(function (pane) {
      var visible = pane.dataset.paneKey === key;
      if (visible) {
        pane.removeAttribute("inert", false);
        pane.addEventListener("scroll", handleCloseButtonBelowHeader);
        setTimeout(function () {
          // This delay is necessary for an apparent quirk with the inert polyfill where it
          // incorrectly sets aria-hidden to true.
          pane.removeAttribute("aria-hidden", false);
        }, 10);
      } else {
        pane.setAttribute("inert", true);
        pane.setAttribute("aria-hidden", true);
        pane.removeEventListener("scroll", handleCloseButtonBelowHeader);
      }
    });
  }
  function handleParentClick(e) {
    e.preventDefault();
    var parentLink = e.currentTarget;
    var paneKey = parentLink.dataset.linkTargetPaneKey;
    navigateToPaneByKey(paneKey, {
      focusFirst: true
    });
    parentLink.ariaExpanded = "true";
  }
  function navigate(depth) {
    viewportContentEl.setAttribute("data-depth", depth);
  }
  function navigateToPaneByKey(paneKey) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var pane = node.querySelector("[data-pane-key=\"".concat(paneKey, "\"]"));
    if (!pane) {
      return;
    }
    var depth = pane.dataset.menuDepth;
    paneIsBecomingVisible(paneKey);
    navigate(depth);
    if (options.focusFirst) {
      setTimeout(function () {
        var firstFocusable = pane.querySelector(".mobile-menu__link") || pane.querySelector("input:not([type='hidden'])");
        firstFocusable === null || firstFocusable === void 0 ? void 0 : firstFocusable.focus();
      }, 500);
    }
  }
  function clickHome(e) {
    e.preventDefault();
    paneIsBecomingVisible("home");
    navigate(0);
  }
  function handleKeyboard(e) {
    if (e.key == "Escape" || e.keyCode === 27) {
      close();
    }
  }
  window.addEventListener("keydown", handleKeyboard);
  function destroy() {
    overlay.removeEventListener("click", close);
    items.forEach(function (item) {
      return item.removeEventListener("click", handleItemClick);
    });
    enableBodyScroll(node);
    document.body.classList.remove("scroll-lock");
    document.body.style.top = "";
    window.removeEventListener("keydown", handleKeyboard);
  }
  return {
    close: close,
    destroy: destroy,
    open: open,
    navigateToPaneByKey: navigateToPaneByKey
  };
};

// Old Safari kludge: dynamically inserted srcsets are not respected, so we have to
// force a rerender of image after insertion.
// https://stackoverflow.com/questions/45487105/ajax-loaded-images-in-safari-not-respecting-srcset
// This issue is known to affect Safari 15 and 16.3 while 16.5.1 was tested to work

// Call this on any content containing images that is dynamically inserted (section rendering, template)

var oldSafariSrcsetKludge = function oldSafariSrcsetKludge(container) {
  var isPotentiallyBuggySafari = navigator.userAgent.includes("Safari") && (navigator.userAgent.includes("Version/15") || navigator.userAgent.includes("Version/16"));
  if (!isPotentiallyBuggySafari) {
    return;
  }
  container.querySelectorAll("img[srcset]").forEach(function (image) {
    // eslint-disable-next-line no-self-assign
    image.outerHTML = image.outerHTML;
  });
};

var selectors$t = {
  mobileMenu: "[data-mobile-menu]",
  closeButton: ".mobile-menu-close-button",
  regionalForm: ".mobile-menu-regional-settings-form",
  regionalFormSelects: ".mobile-menu-regional-settings-form select",
  regionalFormSubmit: ".mobile-menu-regional-settings-form button",
  regionalFormCancel: ".regional-settings-cancel",
  accountControlsWrap: "[data-account-login]"
};
register("mobile-menu", {
  onLoad: function onLoad() {
    var _this = this;
    if (window.Shopify.designMode) {
      // In the theme editor we want the templates activated up front
      this.activateTemplateAndInitSubViews();
    }
    this.events = [c("mobile-menu:open", function () {
      return _this.open();
    }), c("mobile-menu:close", function () {
      return _this.close();
    })];
    this.delegate = new Delegate(this.container);
    this.delegate.on("click", selectors$t.closeButton, function () {
      _this.close();
    });
    this.delegate.on("change", selectors$t.regionalFormSelects, function () {
      n$2(selectors$t.regionalFormSubmit, _this.container).removeAttribute("disabled");
    });
    this.delegate.on("click", selectors$t.regionalFormCancel, function () {
      var selects = t$2(selectors$t.regionalFormSelects, _this.container);
      n$2(selectors$t.regionalFormSubmit, _this.container).setAttribute("disabled", true);
      selects.forEach(function (select) {
        select.value = select.dataset.originalValue;
      });
    });
  },
  open: function open() {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this2.activateTemplateAndInitSubViews();
          case 2:
            oldSafariSrcsetKludge(_this2.container);
            _this2.menuNav.open();
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  close: function close() {
    this.menuNav.close();
  },
  onSelect: function onSelect() {
    this.open();
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var _this3 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var target, containingPane, containingPaneKey;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            target = _ref.target;
            _context2.next = 3;
            return _this3.open();
          case 3:
            containingPane = target.closest("[data-pane-key]");
            containingPaneKey = containingPane.getAttribute("data-pane-key");
            _this3.menuNav.navigateToPaneByKey(containingPaneKey);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  onDeselect: function onDeselect() {
    this.close();
  },
  onUnload: function onUnload() {
    var _this$accountLogin;
    this.close();
    this.delegate.off();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$accountLogin = this.accountLogin) === null || _this$accountLogin === void 0 ? void 0 : _this$accountLogin.unload();
  },
  intitializeSubViewsIfNeeded: function intitializeSubViewsIfNeeded() {
    if (!this.subViewsInitialized) {
      this.menuNav = menuNav(n$2(selectors$t.mobileMenu));
      var accountLoginView = n$2(selectors$t.accountControlsWrap, this.container);
      if (accountLoginView) {
        this.accountLogin = AccountLogin(accountLoginView);
      }
      this.subViewsInitialized = true;
    }
  },
  activateTemplateAndInitSubViews: function activateTemplateAndInitSubViews() {
    var _this4 = this;
    if (this.templateActivated) {
      if (!this.subViewsInitialized) {
        this.intitializeSubViewsIfNeeded();
      }
      return Promise.resolve(this);
    }
    if (this.pendingActivationPromise) {
      return this.pendingActivationPromise;
    }
    this.pendingActivationPromise = new Promise(function (resolve) {
      activateTemplate("mobile-menu-contents").then(function (result) {
        if (result.wasInjected) {
          if (!_this4.subViewsInitialized) {
            _this4.intitializeSubViewsIfNeeded();
          }
          _this4.templateActivated = true;
        }
        resolve(_this4);
        _this4.pendingActivationPromise = null;
      });
    });
    return this.pendingActivationPromise;
  }
});

var selectors$s = {
  "settings": "[data-timer-settings]",
  "days": "[data-days]",
  "hours": "[data-hours]",
  "minutes": "[data-minutes]",
  "seconds": "[data-seconds]"
};
var classes$6 = {
  "active": "active",
  "hide": "hide",
  "complete": "complete"
};
function CountdownTimer(container) {
  var settings = n$2(selectors$s.settings, container);
  var _JSON$parse = JSON.parse(settings.innerHTML),
    year = _JSON$parse.year,
    month = _JSON$parse.month,
    day = _JSON$parse.day,
    hour = _JSON$parse.hour,
    minute = _JSON$parse.minute,
    shopTimezone = _JSON$parse.shopTimezone,
    timeZoneSelection = _JSON$parse.timeZoneSelection,
    hideTimerOnComplete = _JSON$parse.hideTimerOnComplete;
  var daysEl = n$2(selectors$s.days, container);
  var hoursEl = n$2(selectors$s.hours, container);
  var minutesEl = n$2(selectors$s.minutes, container);
  var secondsEl = n$2(selectors$s.seconds, container);
  var timezoneString = timeZoneSelection === "shop" ? " GMT".concat(shopTimezone) : "";
  var countDownDate = new Date(Date.parse("".concat(month, " ").concat(day, ", ").concat(year, " ").concat(hour, ":").concat(minute).concat(timezoneString)));
  var countDownTime = countDownDate.getTime();
  var timerInterval = setInterval(timerLoop, 1000);
  timerLoop();
  u$1(container, classes$6.active);
  function timerLoop() {
    window.requestAnimationFrame(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownTime - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      var minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      var seconds = Math.floor(distance % (1000 * 60) / 1000);

      // If the count down is finished, write some text
      if (distance < 0) {
        timerInterval && clearInterval(timerInterval);
        daysEl.innerHTML = 0;
        hoursEl.innerHTML = 0;
        minutesEl.innerHTML = 0;
        secondsEl.innerHTML = 0;
        u$1(container, classes$6.complete);
        if (hideTimerOnComplete) {
          u$1(container, classes$6.hide);
        }
      } else {
        daysEl.innerHTML = days;
        hoursEl.innerHTML = hours;
        minutesEl.innerHTML = minutes;
        secondsEl.innerHTML = seconds;
      }
    });
  }
  function destroy() {
    timerInterval && clearInterval(timerInterval);
  }
  return {
    destroy: destroy
  };
}

var selectors$r = {
  wash: ".popup__wash",
  dismissButtons: "[data-dismiss-popup]",
  tab: ".popup__tab",
  tabButton: ".popup__tab-button",
  tabDismiss: ".popup__tab-dismiss",
  newsletterForm: ".newsletter-form",
  formSuccessMessage: ".form-status__message--success",
  timer: "[data-countdown-timer]"
};
var classes$5 = {
  visible: "visible"
};
function Popup(container) {
  var focusTrap = createFocusTrap(container, {
    allowOutsideClick: true
  });
  var popupAnimation = animatePopup(container);
  var wash = n$2(selectors$r.wash, container);
  var dismissButtons = t$2(selectors$r.dismissButtons, container);
  var formSuccessMessage = n$2(selectors$r.formSuccessMessage, container);
  var timer = n$2(selectors$r.timer, container);
  var _container$dataset = container.dataset,
    delayType = _container$dataset.delayType,
    showOnExitIntent = _container$dataset.showOnExitIntent,
    id = _container$dataset.id,
    isSignup = _container$dataset.isSignup,
    popupType = _container$dataset.popupType;
  var tab = n$2("".concat(selectors$r.tab, "[data-id=\"").concat(id, "\""));
  var _container$dataset2 = container.dataset,
    delayValue = _container$dataset2.delayValue,
    hourFrequency = _container$dataset2.hourFrequency;
  delayValue = parseInt(delayValue, 10);
  hourFrequency = parseInt(hourFrequency, 10);
  var storageKey = "popup-".concat(id);
  var signupSubmittedKey = "signup-submitted-".concat(id);
  var formSuccessKey = "form-success-".concat(id);
  var signupDismissedKey = "signup-dismissed-".concat(id);
  var ageVerifiedKey = "age-verified-".concat(id);
  var isSignupPopup = isSignup === "true";
  var isAgeVerification = popupType === "age";
  var hasPoppedUp = false;
  var signupSubmitted = Boolean(getStorage(signupSubmittedKey));
  var formSuccessShown = Boolean(getStorage(formSuccessKey));
  var signupDismissed = Boolean(getStorage(signupDismissedKey));
  var ageVerified = Boolean(getStorage(ageVerifiedKey));
  var canPopUp = true;
  var countdownTimer = null;
  if (timer) {
    countdownTimer = CountdownTimer(timer);
  }
  ShouldPopUp();
  var events = [];
  if (!window.Shopify.designMode) {
    events.push(e$2(dismissButtons, "click", hidePopup));
  }
  if (!isAgeVerification && !window.Shopify.designMode) {
    // Only allow wash to be clickable for non age verification popups
    events.push(e$2(wash, "click", hidePopup));
    events.push(e$2(container, "keydown", function (_ref) {
      var keyCode = _ref.keyCode;
      if (keyCode === 27) hidePopup();
    }));
  }
  if (isSignupPopup) {
    var form = n$2(selectors$r.newsletterForm, container);
    if (form) {
      events.push(e$2(form, "submit", onNewsletterSubmit));
    }
  }
  if (tab) {
    var tabButton = n$2(selectors$r.tabButton, tab);
    var tabDismiss = n$2(selectors$r.tabDismiss, tab);
    events.push(e$2(tabButton, "click", handleTabClick));
    events.push(e$2(tabDismiss, "click", hideTab));
  }

  // Show popup immediately if signup form was submitted
  if (isSignupPopup && formSuccessMessage && !formSuccessShown) {
    setStorage(formSuccessKey, JSON.stringify(new Date()));
    showPopup();
  } else {
    handleDelay();
    if (showOnExitIntent === "true" && !isMobile$1()) {
      handleExitIntent();
    }
  }
  function handleDelay() {
    if (!canPopUp) return;
    if (delayType === "timer") {
      setTimeout(function () {
        if (!hasPoppedUp) {
          showPopup();
          setStorage(storageKey, JSON.stringify(new Date()));
        }
      }, delayValue);
    } else if (delayType === "scroll") {
      // Delay window / page height calcs until window has loaded
      window.addEventListener("load", function () {
        var scrollPercent = delayValue / 100;
        var scrollTarget = (document.body.scrollHeight - window.innerHeight) * scrollPercent;
        var scrollListener = e$2(window, "scroll", function () {
          if (window.scrollY >= scrollTarget) {
            if (!hasPoppedUp) {
              showPopup();
              setStorage(storageKey, JSON.stringify(new Date()));
            }
            // Unbind listener
            scrollListener();
          }
        });
      }, {
        once: true
      });
    }
  }
  function handleExitIntent() {
    if (!canPopUp) return;
    var bodyLeave = e$2(document.body, "mouseout", function (e) {
      if (!e.relatedTarget && !e.toElement) {
        bodyLeave();
        if (!hasPoppedUp) {
          showPopup();
          setStorage(storageKey, JSON.stringify(new Date()));
          hasPoppedUp = true;
        }
      }
    });
  }
  function ShouldPopUp() {
    // To avoid popups appearing while in the editor we're disabling them
    // Popups will only be visible in customizer when selected
    if (window.Shopify.designMode) {
      canPopUp = false;
      return;
    }

    // If age has been verified then don't show popup
    // Or signup submitted or dismissed
    // don't show popup
    if (isAgeVerification && ageVerified || isSignupPopup && signupSubmitted) {
      canPopUp = false;
      return;
    }
    if (isSignupPopup && !signupSubmitted && signupDismissed) {
      canPopUp = false;
      if (tab) {
        showTab();
      }
      return;
    }

    // If no date has been set allow the popup to set the first when opened
    if (!isSignupPopup && !isAgeVerification && !getStorage(storageKey)) {
      return;
    }

    // Compare set date and allowed popup frequency hour diff
    var timeStart = new Date(getStorage(storageKey));
    var timeEnd = new Date();
    var hourDiff = (timeEnd - timeStart) / 1000 / 60 / 60;

    // Will not allow popup if the hour frequency is below the previously
    // set poppedup date.
    canPopUp = hourDiff > hourFrequency;
  }
  function handleTabClick() {
    showPopup();
    if (popupType === "flyout" && !window.Shopify.designMode) {
      var focusable = n$2("button, [href], input, select, textarea", container);
      if (focusable) {
        focusable.focus({
          preventScroll: true
        });
      }
    }
  }
  function showPopup() {
    u$1(container, classes$5.visible);
    popupAnimation.open();
    if (popupType === "popup" || popupType === "age") {
      if (!window.Shopify.designMode) {
        focusTrap.activate();
      }
      disableBodyScroll(container);
    }
    hasPoppedUp = true;
    if (window.Shopify.designMode && tab) {
      // Show tab in theme editor
      showTab();
    } else if (tab) {
      // hide tab on popup open
      i$1(tab, classes$5.visible);
    }
  }
  function hidePopup() {
    i$1(container, classes$5.visible);
    if (isSignupPopup) {
      setStorage(signupDismissedKey, JSON.stringify(new Date()));
      // show tab on close, clicking the tab will open the popup again
      if (tab) {
        showTab();
      }
    }

    // Set storage when age verification popup has been dismissed
    // Age verification popups will always be shown until they are dismissed
    if (isAgeVerification) {
      setStorage(ageVerifiedKey, JSON.stringify(new Date()));
    }
    setTimeout(function () {
      popupAnimation.close();
      if (popupType === "popup" || popupType === "age") {
        focusTrap.deactivate();
        enableBodyScroll(container);
      }
    }, 500);
  }
  function showTab() {
    u$1(tab, classes$5.visible);
  }
  function hideTab() {
    i$1(tab, classes$5.visible);
    // When tab is removed we want the popup to be able to open again if it has a frequency
    // We have to remove the storeage saying that the popup was dismissed
    removeStorage(signupDismissedKey);
  }
  function onNewsletterSubmit() {
    setStorage(signupSubmittedKey, JSON.stringify(new Date()));
  }
  function unload() {
    hidePopup();
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    if (isAgeVerification) {
      enableBodyScroll(container);
    }
    countdownTimer && countdownTimer.destroy();
  }
  return {
    unload: unload,
    showPopup: showPopup,
    hidePopup: hidePopup
  };
}

register("popup", {
  onLoad: function onLoad() {
    this.popups = t$2("[data-popup]", this.container).map(function (popup) {
      return {
        contructor: Popup(popup),
        element: popup
      };
    });
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var targetPopup = this.popups.find(function (o) {
      return o.element === target;
    });
    targetPopup.contructor.showPopup();
  },
  onBlockDeselect: function onBlockDeselect(_ref2) {
    var target = _ref2.target;
    var targetPopup = this.popups.find(function (o) {
      return o.element === target;
    });
    targetPopup.contructor.hidePopup();
  },
  onUnload: function onUnload() {
    this.popups.forEach(function (popup) {
      var _popup$contructor;
      return (_popup$contructor = popup.contructor) === null || _popup$contructor === void 0 ? void 0 : _popup$contructor.unload();
    });
  }
});

register("blog-posts", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateBlogPosts = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateBlogPost;
    (_this$animateBlogPost = this.animateBlogPosts) === null || _this$animateBlogPost === void 0 ? void 0 : _this$animateBlogPost.destroy();
  }
});

var selectors$q = {
  itemTrigger: ".collapsible-row-list-item__trigger"
};
register("collapsible-row-list", {
  onLoad: function onLoad() {
    var _this = this;
    this.items = t$2(selectors$q.itemTrigger, this.container);
    this.clickHandlers = e$2(this.items, "click", function (e) {
      e.preventDefault();
      var _e$currentTarget = e.currentTarget,
        group = _e$currentTarget.parentNode,
        content = _e$currentTarget.nextElementSibling;
      if (isVisible(content)) {
        _this._close(e.currentTarget, group, content);
      } else {
        _this._open(e.currentTarget, group, content);
      }
    });
    if (shouldAnimate(this.container)) {
      this.animateCollapsibleRowList = animateStandard(this.container);
    }
  },
  _open: function _open(label, group, content) {
    slideStop(content);
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  },
  _close: function _close(label, group, content) {
    slideStop(content);
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var label = n$2(selectors$q.itemTrigger, target);
    var group = label.parentNode,
      content = label.nextElementSibling;
    if (label.dataset.expandByDefault === "false") {
      this._open(label, group, content);
    }
  },
  onBlockDeselect: function onBlockDeselect(_ref2) {
    var target = _ref2.target;
    var label = n$2(selectors$q.itemTrigger, target);
    var group = label.parentNode,
      content = label.nextElementSibling;
    if (label.dataset.expandByDefault === "false") {
      this._close(label, group, content);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCollapsi;
    this.clickHandlers();
    (_this$animateCollapsi = this.animateCollapsibleRowList) === null || _this$animateCollapsi === void 0 ? void 0 : _this$animateCollapsi.destroy();
  }
});

var selectors$p = {
  "timer": "[data-countdown-timer]"
};
register("countdown-banner", {
  onLoad: function onLoad() {
    var _this = this;
    var timers = t$2(selectors$p.timer, this.container);
    this.countdownTimers = [];
    timers.forEach(function (timer) {
      _this.countdownTimers.push(CountdownTimer(timer));
    });
    if (shouldAnimate(this.container)) {
      this.animateCountdownBanner = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCountdow;
    (_this$animateCountdow = this.animateCountdownBanner) === null || _this$animateCountdow === void 0 ? void 0 : _this$animateCountdow.destroy();
    this.countdownTimers.forEach(function (countdownTimer) {
      return countdownTimer.destroy();
    });
  }
});

var selectors$o = {
  "timer": "[data-countdown-timer]"
};
register("countdown-bar", {
  onLoad: function onLoad() {
    var _this = this;
    var timers = t$2(selectors$o.timer, this.container);
    this.countdownTimers = [];
    timers.forEach(function (timer) {
      _this.countdownTimers.push(CountdownTimer(timer));
    });
    if (shouldAnimate(this.container)) {
      this.animateCountdownBar = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCountdow;
    (_this$animateCountdow = this.animateCountdownBar) === null || _this$animateCountdow === void 0 ? void 0 : _this$animateCountdow.destroy();
    this.countdownTimers.forEach(function (countdownTimer) {
      return countdownTimer.destroy();
    });
  }
});

register("featured-collection", {
  onLoad: function onLoad() {
    this.productItem = ProductItem(this.container);
    if (shouldAnimate(this.container)) {
      this.animateFeaturedCollection = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateFeatured;
    this.productItem && this.productItem.unload();
    (_this$animateFeatured = this.animateFeaturedCollection) === null || _this$animateFeatured === void 0 ? void 0 : _this$animateFeatured.destroy();
  }
});

var strings$3 = window.theme.strings.accessibility;
function featuredVideoHandler(container) {
  var pause = n$2(".video-pause-floating", container);
  var video = n$2("VIDEO", container);
  if (!pause || !video) return;
  var pauseVideo = function pauseVideo() {
    video.pause();
    pause.dataset.isPlaying = "false";
    pause.title = strings$3.play_video;
  };
  var playVideo = function playVideo() {
    video.play();
    pause.dataset.isPlaying = "true";
    pause.title = strings$3.pause_video;
  };
  if (prefersReducedMotion()) {
    pauseVideo();
  }
  var pauseListener = e$2(pause, "click", function (e) {
    e.preventDefault();
    if (video.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  });
  return function () {
    return pauseListener();
  };
}

var autoPlay = function autoPlay(videos) {
  if (!videos.length) return;
  var events = [e$2(window, "click", function () {
    return _handleAutoPlay();
  }), e$2(window, "touchstart", function () {
    return _handleAutoPlay();
  }), e$2(window, "pageshow", function () {
    return _handleAutoPlay();
  })];

  // Force autoplay after device interaction if in low power mode
  function _handleAutoPlay() {
    videos.forEach(function (video) {
      if (!video.playing) {
        video.play();
      }
    });
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }
};

var selectors$n = {
  video: ".featured-collection-with-media__video"
};
register("featured-collection-with-media", {
  onLoad: function onLoad() {
    this.productItem = ProductItem(this.container);
    var video = n$2(selectors$n.video, this.container);
    if (video) {
      this.videoHandler = featuredVideoHandler(this.container);
      autoPlay(video);
    }
    if (shouldAnimate(this.container)) {
      this.animateFeaturedCollectionWithMedia = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateFeatured;
    this.productItem && this.productItem.unload();
    this.videoHandler && this.videoHandler();
    (_this$animateFeatured = this.animateFeaturedCollectionWithMedia) === null || _this$animateFeatured === void 0 ? void 0 : _this$animateFeatured.destroy();
  }
});

var selectors$m = {
  navItems: "[data-tab-button]",
  sliderContainer: ".featured-collection-slider-grid"
};
var classes$4 = {
  selected: "selected",
  active: "active",
  fadeout: "fadeout",
  initReveal: "init-reveal",
  reveal: "reveal"
};
register("tabbed-collections", {
  onLoad: function onLoad() {
    var _this = this;
    this.events = [];
    this.productItem = ProductItem(this.container);
    this.navItems = t$2(selectors$m.navItems, this.container);
    this.navItems.forEach(function (button) {
      return _this.events.push(e$2(button, "click", _this._handleNavButton.bind(_this)));
    });
    if (shouldAnimate(this.container)) {
      this.animateTabbedCollections = animateTabbedCollections(this.container);
    }
  },
  _handleNavButton: function _handleNavButton(e) {
    e.preventDefault();
    var showsCollectionKey = e.currentTarget.dataset.showsCollectionKey;
    if (!a$1(e.currentTarget, classes$4.selected)) {
      this._hideAll();
      this._show(showsCollectionKey);
    }
  },
  _hideAll: function _hideAll() {
    var sliderElements = t$2(selectors$m.sliderContainer, this.container);
    i$1(this.navItems, classes$4.selected);
    i$1(sliderElements, classes$4.active);
  },
  _show: function _show(key) {
    var _this2 = this;
    activateTemplate(key, {
      resolveOnMissing: true
    }).then(function (data) {
      if (data !== null && data !== void 0 && data.wasInjected) {
        _this2.productItem = ProductItem(_this2.container, {
          afterLoad: true
        });
        if (shouldAnimate(_this2.container)) {
          _this2.animateTabbedCollections = animateTabbedCollections(_this2.container);
        }
      }
      var collection = n$2("[data-collection-key=\"".concat(key, "\"]"), _this2.container);
      collection.classList.add(classes$4.active);
      if (_this2.navItems.length) {
        var navigationItem = n$2("[data-shows-collection-key=\"".concat(key, "\"]"), _this2.container);
        navigationItem === null || navigationItem === void 0 ? void 0 : navigationItem.classList.add(classes$4.selected);
      }
    });
  },
  onUnload: function onUnload() {
    var _this$animateTabbedCo;
    this.productItem && this.productItem.unload();
    (_this$animateTabbedCo = this.animateTabbedCollections) === null || _this$animateTabbedCo === void 0 ? void 0 : _this$animateTabbedCo.destroy();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var collectionKey = target.dataset.collectionKey;
    this._hideAll();
    this._show(collectionKey);
  }
});

register("featured-product", {
  onLoad: function onLoad() {
    this.product = new Product(this.container);
    if (shouldAnimate(this.container)) {
      this.animateProduct = animateStandard(this.container);
    }
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var label = n$2(".accordion__label", target);
    target.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
    if (!label) return;
    var group = label.parentNode,
      content = label.nextElementSibling;
    slideStop(content);
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  },
  onBlockDeselect: function onBlockDeselect(_ref2) {
    var target = _ref2.target;
    var label = n$2(".accordion__label", target);
    if (!label) return;
    var group = label.parentNode,
      content = label.nextElementSibling;
    slideStop(content);
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  onUnload: function onUnload() {
    var _this$animateProduct;
    this.product.unload();
    (_this$animateProduct = this.animateProduct) === null || _this$animateProduct === void 0 ? void 0 : _this$animateProduct.destroy();
  }
});

var selectors$l = {
  slider: "scroll-slider-component[data-id='recently-viewed-products']",
  sliderContainer: ".scroll-slider__slider",
  recentlyViewed: "[data-recently-viewed-item]"
};
register("recently-viewed-products", {
  onLoad: function onLoad() {
    var _this$container$datas = this.container.dataset,
      limit = _this$container$datas.limit,
      productHandle = _this$container$datas.productHandle;
    this.limit = parseInt(limit, 10);
    this.productItems = document.createElement("div");

    // target the slider container
    this.slider = n$2(selectors$l.slider, this.container);
    this.sliderContainer = n$2(selectors$l.sliderContainer, this.slider);

    // Grab products from localStorage excluding current product and trim to product limit
    var recentProducts = getRecentProducts();
    if (!(recentProducts || []).length) {
      this._removeSection();
      return;
    }
    var recentProductsTrimmed = recentProducts.filter(function (handle) {
      return handle !== productHandle;
    }) // don't show current product
    .slice(0, this.limit);
    if (recentProductsTrimmed.length >= 1) {
      this._renderProductItems(recentProductsTrimmed);
    } else {
      this._removeSection();
    }
  },
  // render products and init slider
  _renderProductItems: function _renderProductItems(productHandles) {
    var _this = this;
    var requests = productHandles.map(this._renderProductItem.bind(this));
    Promise.all(requests).then(function (results) {
      results.filter(function (item) {
        return item;
      }).forEach(function (item) {
        return _this.productItems.appendChild(item);
      });
      _this.sliderContainer.innerHTML = _this.productItems.innerHTML;
      ProductItem(_this.sliderContainer, {
        afterLoad: true
      });
      _this._initSlider();
    }).catch(function () {
      _this._removeSection();
    });
  },
  // fetch single product
  _renderProductItem: function _renderProductItem(productHandle) {
    var requestUrl = "".concat(window.theme.routes.products, "/").concat(productHandle, "?section_id=recently-viewed-product-item");
    return makeRequest("GET", requestUrl).then(function (response) {
      var container = document.createElement("div");
      container.innerHTML = response;
      var productItem = container.querySelector(selectors$l.recentlyViewed);
      return productItem;
    }).catch(function () {
      console.error("Recent product \"".concat(productHandle, "\" not found"));
      return null;
    });
  },
  _initSlider: function _initSlider() {
    this.slider.initSlider();
    if (shouldAnimate(this.container)) {
      this.animateListSlider = animateStandard(this.container);
    }
  },
  _removeSection: function _removeSection() {
    this.container.parentNode.removeChild(this.container);
  },
  onUnload: function onUnload() {
    var _this$slider, _this$animateListSlid;
    (_this$slider = this.slider) === null || _this$slider === void 0 ? void 0 : _this$slider.destroy();
    (_this$animateListSlid = this.animateListSlider) === null || _this$animateListSlid === void 0 ? void 0 : _this$animateListSlid.destroy();
  }
});

var selectors$k = {
  recommendations: "[data-recommendations]"
};
register("recommended-products", {
  onLoad: function onLoad() {
    var _this = this;
    var _this$container$datas = this.container.dataset,
      limit = _this$container$datas.limit,
      productId = _this$container$datas.productId,
      sectionId = _this$container$datas.sectionId;
    var content = n$2(selectors$k.recommendations, this.container);
    if (!content) return;
    var requestUrl = "".concat(window.theme.routes.productRecommendations, "?section_id=").concat(sectionId, "&limit=").concat(limit, "&product_id=").concat(productId);
    var request = new XMLHttpRequest();
    request.open("GET", requestUrl, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 300) {
        var container = document.createElement("div");
        container.innerHTML = request.response;
        content.innerHTML = n$2(selectors$k.recommendations, container).innerHTML;

        // Show section if recommendations
        if (content.innerHTML !== "") {
          i$1(_this.container, "hidden");
        }
        _this.productItem = ProductItem(_this.container);
        if (shouldAnimate(_this.container)) {
          _this.animateFeaturedCollection = animateStandard(_this.container);
        }
      } else {
        // If request returns any errors remove the section markup
        _this._removeSection();
      }
    };
    request.send();
  },
  _removeSection: function _removeSection() {
    this.container.parentNode.removeChild(this.container);
  },
  onUnload: function onUnload() {
    var _this$animateFeatured;
    (_this$animateFeatured = this.animateFeaturedCollection) === null || _this$animateFeatured === void 0 ? void 0 : _this$animateFeatured.destroy();
  }
});

var selectors$j = {
  slide: ".slideshow-slide",
  textContent: ".text-container:not(.text-box) .text-container-inner > *",
  textBox: ".text-container.text-box",
  navigationContainer: ".slideshow-navigation",
  pauseButton: ".slideshow-navigation__pause-button"
};
register("slideshow", {
  onLoad: function onLoad() {
    var _this = this;
    var scrollerId = this.container.dataset.scrollerId;
    this.scrollerId = scrollerId;
    this.slides = t$2(selectors$j.slide, this.container);
    this.scrollerInitialized = false;
    this.events = [];
    document.addEventListener("scroll-slider-".concat(this.scrollerId, ":initialized"), function () {
      _this.scrollerInitialized = true;
    }, {
      once: true
    });
    if (shouldAnimate(this.container)) {
      this.animateSlideshow = animateSlideshow(this.container, this.slides);
    }
    this.navigationContainer = n$2(selectors$j.navigationContainer, this.container);
    if (this.navigationContainer) {
      this.pauseButton = n$2(selectors$j.pauseButton, this.navigationContainer);
      if (this.pauseButton) {
        this.events.push(e$2(this.pauseButton, "click", function () {
          if (_this.pauseButton.dataset.isPlaying === "true") {
            _this.pauseAutoPlay();
          } else {
            _this.resumeAutoPlay();
          }
        }));
      }
    }
  },
  pauseAutoPlay: function pauseAutoPlay() {
    dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":pause"));
    this.pauseButton.dataset.isPlaying = "false";
    this.pauseButton.setAttribute("aria-label", this.pauseButton.dataset.playLabel);
  },
  resumeAutoPlay: function resumeAutoPlay() {
    dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":play"));
    this.pauseButton.dataset.isPlaying = "true";
    this.pauseButton.setAttribute("aria-label", this.pauseButton.dataset.pauseLabel);
  },
  handleBlockSelect: function handleBlockSelect(index, behavior) {
    if (this.pauseButton) {
      this.pauseAutoPlay();
    }
    dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":go-to-slide"), {
      slideIndex: index,
      behavior: behavior
    });
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var _this2 = this;
    var slide = _ref.target;
    var index = parseInt(slide.dataset.index, 10);

    // When the editor flushes the section on block select
    // we need to wait for the scroll-slider to initialize
    // before we can scroll to the selected slide. The editor
    // will flush section content on setting update, but will
    // not on selecting the block itself.
    if (this.scrollerInitialized) {
      this.handleBlockSelect(index, "instant");
    } else {
      document.addEventListener("scroll-slider-".concat(this.scrollerId, ":initialized"), function () {
        _this2.handleBlockSelect(index, "instant");
      }, {
        once: true
      });
    }
  },
  onBlockDeselect: function onBlockDeselect() {
    dispatchCustomEvent("scroll-slider-".concat(this.scrollerId, ":play"));
  },
  onUnload: function onUnload() {
    var _this$animateSlidesho;
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$animateSlidesho = this.animateSlideshow) === null || _this$animateSlidesho === void 0 ? void 0 : _this$animateSlidesho.destroy();
  }
});

var selectors$i = {
  videoPlayButton: "[data-video-play-button]",
  videoPlayerVideoContainer: "[data-video-player-block-video-container]",
  photoSwipeElement: ".pswp",
  video: ".video-player-block__video"
};
var icons = window.theme.icons;
var videoPlayer = function videoPlayer(node) {
  var photoSwipeInstance;
  var videoPlayButton = n$2(selectors$i.videoPlayButton, node);
  var videoPlayerVideoContainer = n$2(selectors$i.videoPlayerVideoContainer, node);
  var videoType = videoPlayerVideoContainer.dataset.videoType;
  import(flu.chunks.photoswipe); // Load this ahead of needing

  var events = [e$2(videoPlayButton, "click", function () {
    import(flu.chunks.photoswipe).then(function (_ref) {
      var PhotoSwipeLightbox = _ref.PhotoSwipeLightbox,
        PhotoSwipe = _ref.PhotoSwipe;
      photoSwipeInstance = new PhotoSwipeLightbox({
        dataSource: [{
          html: videoPlayerVideoContainer.outerHTML
        }],
        pswpModule: PhotoSwipe,
        mainClass: "pswp--video-lightbox",
        closeSVG: icons.close,
        arrowPrev: false,
        arrowNext: false,
        zoom: false,
        counter: false
      });
      photoSwipeInstance.init();
      photoSwipeInstance.loadAndOpen();
      photoSwipeInstance.on("bindEvents", function () {
        var instanceVideo = n$2(selectors$i.video, photoSwipeInstance.pswp.container);
        if (videoType === "shopify") {
          instanceVideo.play();
        } else {
          initExternalVideo(instanceVideo);
        }
      });
    });
  })];
  var initExternalVideo = function initExternalVideo(video) {
    var _video$dataset = video.dataset,
      videoProvider = _video$dataset.videoProvider,
      videoId = _video$dataset.videoId;
    switch (videoProvider) {
      case "youtube":
        loadYouTubeAPI().then(function () {
          var player = new window.YT.Player(video, {
            videoId: videoId,
            playerVars: {
              autohide: 0,
              cc_load_policy: 0,
              controls: 1,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              playlist: videoId
            },
            events: {
              onReady: function onReady() {
                player.playVideo();
                player.getIframe().tabIndex = "0";
              }
            }
          });
        });
        break;
      case "vimeo":
        loadVimeoAPI().then(function () {
          var player = new window.Vimeo.Player(video, {
            id: videoId,
            controls: true,
            keyboard: false
          });
          player.play();
          player.element.tabIndex = "0";
        });
        break;
    }
  };
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    photoSwipeInstance && photoSwipeInstance.destroy();
  };
  return {
    unload: unload
  };
};

var selectors$h = {
  video: ".video-hero__video",
  videoPlayerVideo: "[data-video-player-block-video]",
  videoPlayerBlock: ".video-player-block"
};
register("video-hero", {
  videoHandler: null,
  onLoad: function onLoad() {
    var videoPlayerVideos = t$2(selectors$h.videoPlayerVideo, this.container);
    if (videoPlayerVideos.length) {
      this.videoPlayers = videoPlayerVideos.map(function (block) {
        return videoPlayer(block.closest(selectors$h.videoPlayerBlock));
      });
    }
    if (shouldAnimate(this.container)) {
      this.animateVideoHero = animateStandard(this.container, 3);
    }
  },
  onUnload: function onUnload() {
    var _this$animateVideoHer;
    this.videoPlayers && this.videoPlayers.forEach(function (button) {
      return button.unload();
    });
    (_this$animateVideoHer = this.animateVideoHero) === null || _this$animateVideoHer === void 0 ? void 0 : _this$animateVideoHer.destroy();
  }
});

var selectors$g = {
  videoPlayerVideo: "[data-video-player-block-video]",
  videoPlayerBlock: ".video-player-block"
};
register("rich-text", {
  onLoad: function onLoad() {
    var videoPlayerVideos = t$2(selectors$g.videoPlayerVideo, this.container);
    if (videoPlayerVideos.length) {
      this.videoPlayers = videoPlayerVideos.map(function (block) {
        return videoPlayer(block.closest(selectors$g.videoPlayerBlock));
      });
    }
    if (shouldAnimate(this.container)) {
      this.animateRichText = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateRichText;
    this.videoPlayers && this.videoPlayers.forEach(function (button) {
      return button.unload();
    });
    (_this$animateRichText = this.animateRichText) === null || _this$animateRichText === void 0 ? void 0 : _this$animateRichText.destroy();
  }
});

register("icon-with-text-columns", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateIconWithTextColumns = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateIconWith;
    (_this$animateIconWith = this.animateIconWithTextColumns) === null || _this$animateIconWith === void 0 ? void 0 : _this$animateIconWith.destroy();
  }
});

var selectors$f = {
  videoPlayerVideo: "[data-video-player-block-video]",
  videoPlayerBlock: ".video-player-block"
};
register("overlapping-media-with-content", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateMediaWithContent = animateMediaWithContent(this.container);
    }
    var videoPlayerVideos = t$2(selectors$f.videoPlayerVideo, this.container);
    if (videoPlayerVideos.length) {
      this.videoPlayers = videoPlayerVideos.map(function (block) {
        return videoPlayer(block.closest(selectors$f.videoPlayerBlock));
      });
    }
  },
  onUnload: function onUnload() {
    var _this$animateMediaWit;
    (_this$animateMediaWit = this.animateMediaWithContent) === null || _this$animateMediaWit === void 0 ? void 0 : _this$animateMediaWit.destroy();
    this.videoPlayers && this.videoPlayers.forEach(function (button) {
      return button.unload();
    });
  }
});

var selectors$e = {
  videoPlayerVideo: "[data-video-player-block-video]",
  videoPlayerBlock: ".video-player-block"
};
register("media-with-content-split", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateMediaWithContentSplit = animateMediaWithContent(this.container);
    }
    var videoPlayerVideos = t$2(selectors$e.videoPlayerVideo, this.container);
    if (videoPlayerVideos.length) {
      this.videoPlayers = videoPlayerVideos.map(function (block) {
        return videoPlayer(block.closest(selectors$e.videoPlayerBlock));
      });
    }
  },
  onUnload: function onUnload() {
    var _this$animateMediaWit;
    (_this$animateMediaWit = this.animateMediaWithContentSplit) === null || _this$animateMediaWit === void 0 ? void 0 : _this$animateMediaWit.destroy();
    this.videoPlayers && this.videoPlayers.forEach(function (button) {
      return button.unload();
    });
  }
});

var selectors$d = {
  videoPlayerVideo: "[data-video-player-block-video]",
  videoPlayerBlock: ".video-player-block"
};
register("image-hero", {
  onLoad: function onLoad() {
    var videoPlayerVideos = t$2(selectors$d.videoPlayerVideo, this.container);
    if (videoPlayerVideos.length) {
      this.videoPlayers = videoPlayerVideos.map(function (block) {
        return videoPlayer(block.closest(selectors$d.videoPlayerBlock));
      });
    }
    if (shouldAnimate(this.container)) {
      this.animateImageHero = animateStandard(this.container, 6);
    }
  },
  onUnload: function onUnload() {
    var _this$animateImageHer;
    this.videoPlayers && this.videoPlayers.forEach(function (button) {
      return button.unload();
    });
    (_this$animateImageHer = this.animateImageHero) === null || _this$animateImageHer === void 0 ? void 0 : _this$animateImageHer.destroy();
  }
});

register("testimonials", {
  onLoad: function onLoad() {
    this.truncateWrapper = truncateWrapper(this.container);
    if (shouldAnimate(this.container)) {
      this.itemAnimations = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$truncateWrapper, _this$animateApps;
    (_this$truncateWrapper = this.truncateWrapper) === null || _this$truncateWrapper === void 0 ? void 0 : _this$truncateWrapper.unload();
    (_this$animateApps = this.animateApps) === null || _this$animateApps === void 0 ? void 0 : _this$animateApps.destroy();
  }
});

register("sales-banner", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateSalesBanner = animateSalesBanner(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateSalesBan;
    (_this$animateSalesBan = this.animateSalesBanner) === null || _this$animateSalesBan === void 0 ? void 0 : _this$animateSalesBan.destroy();
  }
});

register("grid", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateGrid = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateGrid;
    (_this$animateGrid = this.animateGrid) === null || _this$animateGrid === void 0 ? void 0 : _this$animateGrid.destroy();
  }
});

var selectors$c = {
  collectionListInner: ".collection-list__inner",
  expandButton: ".collection-list__expand-button"
};
register("collection-list", {
  onLoad: function onLoad() {
    var expandButton = n$2(selectors$c.expandButton, this.container);
    var collectionListInner = n$2(selectors$c.collectionListInner, this.container);
    this.events = [];
    if (expandButton) {
      this.events.push(e$2(expandButton, "click", function (e) {
        e.preventDefault();
        collectionListInner.dataset.expanded = true;
      }));
    }
    if (shouldAnimate(this.container)) {
      this.animateCollectionList = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCollecti;
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$animateCollecti = this.animateCollectionList) === null || _this$animateCollecti === void 0 ? void 0 : _this$animateCollecti.destroy();
  }
});

var selectors$b = {
  collectionListButtonsInner: ".collection-list-buttons__inner",
  expandButton: ".collection-list-buttons__expand-button"
};
register("collection-list-buttons", {
  onLoad: function onLoad() {
    var expandButton = n$2(selectors$b.expandButton, this.container);
    var collectionListButtonsInner = n$2(selectors$b.collectionListButtonsInner, this.container);
    this.events = [];
    if (expandButton) {
      this.events.push(e$2(expandButton, "click", function (e) {
        e.preventDefault();
        collectionListButtonsInner.dataset.expanded = true;
      }));
    }
    if (shouldAnimate(this.container)) {
      this.animateCollectionListButtons = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateCollecti;
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$animateCollecti = this.animateCollectionListButtons) === null || _this$animateCollecti === void 0 ? void 0 : _this$animateCollecti.destroy();
  }
});

register("contact-form", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateContactForm = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateContactF;
    (_this$animateContactF = this.animateContactForm) === null || _this$animateContactF === void 0 ? void 0 : _this$animateContactF.destroy();
  }
});

register("multi-column", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateMultiColumn = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateMultiCol;
    (_this$animateMultiCol = this.animateMultiColumn) === null || _this$animateMultiCol === void 0 ? void 0 : _this$animateMultiCol.destroy();
  }
});

register("newsletter", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateNewsletter = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateNewslett;
    (_this$animateNewslett = this.animateNewsletter) === null || _this$animateNewslett === void 0 ? void 0 : _this$animateNewslett.destroy();
  }
});

register("newsletter-compact", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateNewsletterCompact = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateNewslett;
    (_this$animateNewslett = this.animateNewsletterCompact) === null || _this$animateNewslett === void 0 ? void 0 : _this$animateNewslett.destroy();
  }
});

register("promotion-grid", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animatePromotionGrid = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animatePromotio;
    (_this$animatePromotio = this.animatePromotionGrid) === null || _this$animatePromotio === void 0 ? void 0 : _this$animatePromotio.destroy();
  }
});

var selectors$a = {
  tabButtons: "[data-tab-button]",
  tabList: "[data-tab-list]",
  activeTabItem: "[data-tab-item][aria-hidden='false']"
};
register("product-tabs", {
  onLoad: function onLoad() {
    var _this = this;
    this.accordions = [];
    this.tabButtons = t$2(selectors$a.tabButtons, this.container);
    this.tabList = n$2(selectors$a.tabList, this.container);
    this.activeTabItem = n$2(selectors$a.activeTabItem, this.container);
    if (this.activeTabItem) {
      this._setTabHeight(this.activeTabItem);
    }
    this.clickHandlers = e$2(this.tabButtons, "click", function (e) {
      e.preventDefault();
      var contentID = e.currentTarget.getAttribute("aria-controls");
      var content = n$2("#".concat(contentID), _this.container);
      _this._closeAll();
      _this._open(e.currentTarget, content);
    });
    var accordionElements = t$2(".accordion", this.container);
    accordionElements.forEach(function (accordion) {
      var accordionOpen = accordion.classList.contains("accordion--open");
      _this.accordions.push(Accordions(accordion, {
        firstOpen: accordionOpen
      }));
      accordion.classList.add("rte--product", "accordion--product");
    });
    wrapIframes(t$2("iframe", this.container));
    wrapTables(t$2("table", this.container));
    if (shouldAnimate(this.container)) {
      this.animateProductTabs = animateProductTabs(this.container);
    }
  },
  _closeAll: function _closeAll() {
    var _this2 = this;
    this.tabButtons.forEach(function (label) {
      var contentID = label.getAttribute("aria-controls");
      var content = n$2("#".concat(contentID), _this2.container);
      if (_this2._isVisible(content)) {
        _this2._close(label, content);
      }
    });
  },
  _open: function _open(label, content) {
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
    this._setTabHeight(content);
  },
  _close: function _close(label, content) {
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  _isVisible: function _isVisible(content) {
    return content.getAttribute("aria-hidden") === "false";
  },
  // TODO: Watch for window resizing, and call this
  _setTabHeight: function _setTabHeight(content) {
    var height = content.offsetHeight;
    this.tabList.style.height = "".concat(height, "px");
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var contentID = target.getAttribute("aria-controls");
    var content = n$2("#".concat(contentID), this.container);
    this._closeAll();
    this._open(target, content);
  },
  onUnload: function onUnload() {
    var _this$animateProductT;
    this.clickHandlers();
    this.accordions.forEach(function (accordion) {
      return accordion.unload();
    });
    (_this$animateProductT = this.animateProductTabs) === null || _this$animateProductT === void 0 ? void 0 : _this$animateProductT.destroy();
  }
});

register("apps", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateApps = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateApps;
    (_this$animateApps = this.animateApps) === null || _this$animateApps === void 0 ? void 0 : _this$animateApps.destroy();
  }
});

register("quick-links", {
  onLoad: function onLoad() {
    this.scrollContainer = n$2("[data-scroll-container]", this.container);
    if (this.scrollContainer) {
      this.navScroller = scrollContainer.initScroller(this.scrollContainer);
    }
    if (shouldAnimate(this.container)) {
      this.animateQuickLinks = animateQuickLinks(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateQuickLin;
    (_this$animateQuickLin = this.animateQuickLinks) === null || _this$animateQuickLin === void 0 ? void 0 : _this$animateQuickLin.destroy();
  }
});

register("scrolling-content", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateScrollingContent = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateScrollin;
    (_this$animateScrollin = this.animateScrollingContent) === null || _this$animateScrollin === void 0 ? void 0 : _this$animateScrollin.destroy();
  }
});

var selectors$9 = {
  cartError: ".cart__form-item-error",
  cartNoteTrigger: "[data-order-note-trigger]",
  cartUpdateButton: ".cart__update",
  quantityInputContainer: ".cart .quantity-input",
  quantityInput: ".cart .quantity-input__input",
  quantityButtons: ".cart .quantity-input__button",
  quantityItem: "[data-input-item]",
  freeShippingBar: "[data-free-shipping-bar]",
  crossSells: "[data-cross-sells]"
};
var classes$3 = {
  updatingQuantity: "pending-quantity-update",
  removed: "is-removed"
};
register("cart", {
  onLoad: function onLoad() {
    var _this = this;
    var cartNoteTrigger = n$2(selectors$9.cartNoteTrigger, this.container);
    var freeShippingBar$1 = n$2(selectors$9.freeShippingBar, this.container);
    if (freeShippingBar$1) {
      freeShippingBar(freeShippingBar$1);
    }
    this._initCrossSells();
    if (cartNoteTrigger) this.cartNoteToggle = CartNoteToggle(this.container);
    this.quantityButtons = QuantityButtons(this.container);

    // Events are all on events trigger by other components / functions
    this.events = [c("cart:updated", function () {
      return _this.refreshCart();
    }), c("cart:error", function (_, _ref) {
      var key = _ref.key,
        errorMessage = _ref.errorMessage;
      _this.handleErrorMessage(key, errorMessage);
    }), c(["quantity-update:subtract", "quantity-update:add"], function (_, _ref2) {
      var key = _ref2.key;
      _this.handleQuantityUpdate(key);
    }), c("quantity-update:remove", function (_, _ref3) {
      var key = _ref3.key;
      _this.handleItemRemoval(key);
    })];

    // Delegate handles all click events due to rendering different content
    // within cart
    this.delegate = new Delegate(this.container);
    this.delegate.on("change", selectors$9.quantityInput, function (e) {
      return _this.handleQuantityInputChange(e);
    });
  },
  refreshCart: function refreshCart() {
    var _this2 = this;
    var url = "".concat(window.theme.routes.cart.base, "?section_id=").concat(this.id);
    makeRequest("GET", url).then(function (response) {
      var _window$Shopify;
      var container = document.createElement("div");
      container.innerHTML = response;
      _this2.container.innerHTML = container.innerHTML;
      if ((_window$Shopify = window.Shopify) !== null && _window$Shopify !== void 0 && _window$Shopify.StorefrontExpressButtons) {
        window.Shopify.StorefrontExpressButtons.initialize();
      }
      var freeShippingBar$1 = n$2(selectors$9.freeShippingBar, _this2.container);
      if (freeShippingBar$1) {
        freeShippingBar(freeShippingBar$1);
      }
      _this2._initCrossSells();
    });
  },
  handleErrorMessage: function handleErrorMessage(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    i$1(n$2(selectors$9.cartError, item), "hidden");
    i$1(item, classes$3.updatingQuantity);
  },
  handleQuantityInputChange: function handleQuantityInputChange(_ref4) {
    var target = _ref4.target;
    var item = target.closest(selectors$9.quantityItem);
    var key = item.dataset.key;
    this.handleQuantityUpdate(key);
    cart.updateItem(key, parseInt(target.value, 10));
  },
  handleQuantityUpdate: function handleQuantityUpdate(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    var quantityInputContainer = n$2(selectors$9.quantityInputContainer, item);
    var quantityButtons = t$2(selectors$9.quantityButtons, quantityInputContainer);
    u$1([item, quantityInputContainer], classes$3.updatingQuantity);
    quantityButtons.forEach(function (button) {
      button.blur();
    });
  },
  handleItemRemoval: function handleItemRemoval(key) {
    var item = n$2("[data-key=\"".concat(key, "\"]"), this.container);
    var quantityInputContainer = n$2(selectors$9.quantityInputContainer, item);
    var quantityButtons = t$2(selectors$9.quantityButtons, quantityInputContainer);
    u$1(item, classes$3.removed);
    u$1([item, quantityInputContainer], classes$3.updatingQuantity);
    quantityButtons.forEach(function (button) {
      button.blur();
    });
  },
  _initCrossSells: function _initCrossSells() {
    var crossSells = n$2(selectors$9.crossSells, this.container);
    if (crossSells) {
      this.crossSells = CrossSells(crossSells);
    }
  },
  onUnload: function onUnload() {
    var _this$cartNoteToggle;
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    this.quantityButtons.unload();
    (_this$cartNoteToggle = this.cartNoteToggle) === null || _this$cartNoteToggle === void 0 ? void 0 : _this$cartNoteToggle.unload();
  }
});

register("product", {
  onLoad: function onLoad() {
    this.product = new Product(this.container);
    if (shouldAnimate) {
      this.animateProduct = animateStandard(this.container);
    }
  },
  onBlockSelect: function onBlockSelect(_ref) {
    var target = _ref.target;
    var label = n$2(".accordion__label", target);
    target.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
    if (!label) return;
    var group = label.parentNode,
      content = label.nextElementSibling;
    slideStop(content);
    slideDown(content);
    group.setAttribute("data-open", true);
    label.setAttribute("aria-expanded", true);
    content.setAttribute("aria-hidden", false);
  },
  onBlockDeselect: function onBlockDeselect(_ref2) {
    var target = _ref2.target;
    var label = n$2(".accordion__label", target);
    if (!label) return;
    var group = label.parentNode,
      content = label.nextElementSibling;
    slideStop(content);
    slideUp(content);
    group.setAttribute("data-open", false);
    label.setAttribute("aria-expanded", false);
    content.setAttribute("aria-hidden", true);
  },
  onUnload: function onUnload() {
    var _this$animateProduct;
    this.product.unload();
    (_this$animateProduct = this.animateProduct) === null || _this$animateProduct === void 0 ? void 0 : _this$animateProduct.destroy();
  }
});

/* @preserve
 * https://github.com/Elkfox/Ajaxinate
 * Copyright (c) 2017 Elkfox Co Pty Ltd (elkfox.com)
 * MIT License (do not remove above copyright!)
 */

/* Configurable options;
 *
 * method: scroll or click
 * container: selector of repeating content
 * pagination: selector of pagination container
 * offset: number of pixels before the bottom to start loading more on scroll
 * loadingText: 'Loading', The text shown during when appending new content
 * callback: null, callback function after new content is appended
 *
 * Usage;
 *
 * import {Ajaxinate} from 'ajaxinate';
 *
 * new Ajaxinate({
 *   offset: 5000,
 *   loadingText: 'Loading more...',
 * });
 */

/* eslint-env browser */
function Ajaxinate(config) {
  const settings = config || {};

  const defaults = {
    method: "scroll",
    container: "#AjaxinateContainer",
    pagination: "#AjaxinatePagination",
    offset: 0,
    loadingText: "Loading",
    callback: null,
  };

  // Merge custom configs with defaults
  this.settings = Object.assign(defaults, settings);

  // Functions
  this.addScrollListeners = this.addScrollListeners.bind(this);
  this.addClickListener = this.addClickListener.bind(this);
  this.checkIfPaginationInView = this.checkIfPaginationInView.bind(this);
  this.preventMultipleClicks = this.preventMultipleClicks.bind(this);
  this.removeClickListener = this.removeClickListener.bind(this);
  this.removeScrollListener = this.removeScrollListener.bind(this);
  this.removePaginationElement = this.removePaginationElement.bind(this);
  this.destroy = this.destroy.bind(this);

  // Selectors
  this.containerElement = document.querySelector(this.settings.container);
  this.paginationElement = document.querySelector(this.settings.pagination);
  this.initialize();
}

Ajaxinate.prototype.initialize = function initialize() {
  if (!this.containerElement) {
    return;
  }

  const initializers = {
    click: this.addClickListener,
    scroll: this.addScrollListeners,
  };

  initializers[this.settings.method]();
};

Ajaxinate.prototype.addScrollListeners = function addScrollListeners() {
  if (!this.paginationElement) {
    return;
  }

  document.addEventListener("scroll", this.checkIfPaginationInView);
  window.addEventListener("resize", this.checkIfPaginationInView);
  window.addEventListener("orientationchange", this.checkIfPaginationInView);
};

Ajaxinate.prototype.addClickListener = function addClickListener() {
  if (!this.paginationElement) {
    return;
  }

  this.nextPageLinkElement = this.paginationElement.querySelector("a");
  this.clickActive = true;

  if (
    typeof this.nextPageLinkElement !== "undefined" &&
    this.nextPageLinkElement !== null
  ) {
    this.nextPageLinkElement.addEventListener(
      "click",
      this.preventMultipleClicks
    );
  }
};

Ajaxinate.prototype.preventMultipleClicks = function preventMultipleClicks(
  event
) {
  event.preventDefault();

  if (!this.clickActive) {
    return;
  }

  this.nextPageLinkElement.innerText = this.settings.loadingText;
  this.nextPageUrl = this.nextPageLinkElement.href;
  this.clickActive = false;

  this.loadMore();
};

Ajaxinate.prototype.checkIfPaginationInView = function checkIfPaginationInView() {
  const top =
    this.paginationElement.getBoundingClientRect().top - this.settings.offset;
  const bottom =
    this.paginationElement.getBoundingClientRect().bottom +
    this.settings.offset;

  if (top <= window.innerHeight && bottom >= 0) {
    this.nextPageLinkElement = this.paginationElement.querySelector("a");
    this.removeScrollListener();

    if (this.nextPageLinkElement) {
      this.nextPageLinkElement.innerText = this.settings.loadingText;
      this.nextPageUrl = this.nextPageLinkElement.href;

      this.loadMore();
    }
  }
};

Ajaxinate.prototype.loadMore = function getTheHtmlOfTheNextPageWithAnAjaxRequest() {
  this.request = new XMLHttpRequest();
  this.request.onreadystatechange = function success() {
    if (this.request.readyState === 4 && this.request.status === 200) {
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(
        this.request.responseText,
        "text/html"
      );
      var newContainer = htmlDoc.querySelectorAll(this.settings.container)[0];
      var newPagination = htmlDoc.querySelectorAll(this.settings.pagination)[0];
      this.containerElement.insertAdjacentHTML(
        "beforeend",
        newContainer.innerHTML
      );
      this.paginationElement.innerHTML = newPagination.innerHTML;
      if (
        this.settings.callback &&
        typeof this.settings.callback === "function"
      ) {
        this.settings.callback(this.request.responseXML);
      }
      this.initialize();
    }
  }.bind(this);
  this.request.open("GET", this.nextPageUrl);
  this.request.send();
};

Ajaxinate.prototype.removeClickListener = function removeClickListener() {
  this.nextPageLinkElement.removeEventListener(
    "click",
    this.preventMultipleClicks
  );
};

Ajaxinate.prototype.removePaginationElement = function removePaginationElement() {
  this.paginationElement.innerHTML = "";
  this.destroy();
};

Ajaxinate.prototype.removeScrollListener = function removeScrollListener() {
  document.removeEventListener("scroll", this.checkIfPaginationInView);
  window.removeEventListener("resize", this.checkIfPaginationInView);
  window.removeEventListener("orientationchange", this.checkIfPaginationInView);
};

Ajaxinate.prototype.destroy = function destroy() {
  const destroyers = {
    click: this.removeClickListener,
    scroll: this.removeScrollListener,
  };

  destroyers[this.settings.method]();

  return this;
};

var FILTERS_REMOVE = "collection:filters:remove";
var EVERYTHING_CLEAR = "collection:clear";
var FILTERS_UPDATE = "collection:filters:update";
var FILTER_CHANGED = "collection:filters:changed";
var updateFilters = function updateFilters(target) {
  return r$1(FILTERS_UPDATE, null, {
    target: target
  });
};
var removeFilters = function removeFilters(target) {
  return r$1(FILTERS_REMOVE, null, {
    target: target
  });
};
var clearAllFilters = function clearAllFilters() {
  return r$1(EVERYTHING_CLEAR);
};
var filterChanged = function filterChanged() {
  return r$1(FILTER_CHANGED);
};
var filtersUpdated = function filtersUpdated(cb) {
  return c(FILTERS_UPDATE, cb);
};
var filtersRemoved = function filtersRemoved(cb) {
  return c(FILTERS_REMOVE, cb);
};
var everythingCleared = function everythingCleared(cb) {
  return c(EVERYTHING_CLEAR, cb);
};
var onFilterChange = function onFilterChange(cb) {
  return c(FILTER_CHANGED, cb);
};

var strings$2 = window.theme.strings;
var priceRange = function priceRange(container) {
  var inputs = t$2("input", container);
  var minInput = inputs[0];
  var maxInput = inputs[1];
  var events = [e$2(inputs, "change", onRangeChange)];
  var slider = n$2("[data-range-slider]", container);
  var min = Math.floor(minInput.value ? minInput.value : minInput.getAttribute("min"));
  var max = Math.floor(maxInput.value ? maxInput.value : maxInput.getAttribute("max"));
  import(flu.chunks.nouislider).then(function (_ref) {
    var noUiSlider = _ref.noUiSlider;
    noUiSlider.create(slider, {
      start: [minInput.value ? minInput.value : minInput.getAttribute("min"), maxInput.value ? maxInput.value : maxInput.getAttribute("max")],
      handleAttributes: [{
        "aria-label": strings$2.accessibility.range_lower
      }, {
        "aria-label": strings$2.accessibility.range_upper
      }],
      connect: true,
      range: {
        "min": parseInt(minInput.getAttribute("min")),
        "max": parseInt(maxInput.getAttribute("max"))
      }
    });
    slider.noUiSlider.on("slide", function (e) {
      var maxNew, minNew;
      var _e = _slicedToArray(e, 2);
      minNew = _e[0];
      maxNew = _e[1];
      minInput.value = Math.floor(minNew);
      maxInput.value = Math.floor(maxNew);
      setMinAndMaxValues();
    });
    slider.noUiSlider.on("change", function (e) {
      var minNew = Math.floor(e[0]);
      var maxNew = Math.floor(e[1]);
      if (minNew != min) {
        minInput.value = minNew;
        fireMinChangeEvent();
        min = Math.floor(minInput.value ? minInput.value : minInput.getAttribute("min"));
      }
      if (maxNew != max) {
        maxInput.value = maxNew;
        fireMaxChangeEvent();
        max = Math.floor(maxInput.value ? maxInput.value : maxInput.getAttribute("max"));
      }
      setMinAndMaxValues();
    });
    slider.noUiSlider.on("set", function (e) {
      var minNew = Math.floor(e[0]);
      var maxNew = Math.floor(e[1]);
      if (minNew != min) {
        minInput.value = minNew;
        min = Math.floor(minInput.value ? minInput.value : minInput.getAttribute("min"));
      }
      if (maxNew != max) {
        maxInput.value = maxNew;
        max = Math.floor(maxInput.value ? maxInput.value : maxInput.getAttribute("max"));
      }
      setMinAndMaxValues();
    });
    setMinAndMaxValues();
  });
  function setMinAndMaxValues() {
    if (maxInput.value) minInput.setAttribute("max", maxInput.value);
    if (minInput.value) maxInput.setAttribute("min", minInput.value);
    if (minInput.value === "") maxInput.setAttribute("min", 0);
    if (maxInput.value === "") minInput.setAttribute("max", maxInput.getAttribute("max"));
  }
  function adjustToValidValues(input) {
    var inputType = input.getAttribute("data-range-input-type");
    var value = Number(input.value);
    var minNew = Number(input.getAttribute("min"));
    var maxNew = Number(input.getAttribute("max"));
    if (inputType === "min") {
      if (value === "" || value < minNew) input.value = minNew;
    }
    if (inputType === "max") {
      if (value === "" || value > maxNew) input.value = maxNew;
    }
  }
  function fireMinChangeEvent() {
    minInput.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  function fireMaxChangeEvent() {
    maxInput.dispatchEvent(new Event("change", {
      bubbles: true
    }));
  }
  function onRangeChange(event) {
    adjustToValidValues(event.currentTarget);
    setMinAndMaxValues();
    if (minInput.value === "" && maxInput.value !== "") {
      minInput.value = minInput.getAttribute("min");
    } else if (minInput.value !== "" && maxInput.value === "") {
      maxInput.value = maxInput.getAttribute("max");
    }
    var currentMax, currentMin;
    var _slider$noUiSlider$ge = slider.noUiSlider.get();
    var _slider$noUiSlider$ge2 = _slicedToArray(_slider$noUiSlider$ge, 2);
    currentMin = _slider$noUiSlider$ge2[0];
    currentMax = _slider$noUiSlider$ge2[1];
    currentMin = Math.floor(currentMin);
    currentMax = Math.floor(currentMax);
    if (currentMin !== Math.floor(minInput.value)) {
      var minValue = minInput.value === "" ? minInput.getAttribute("min") : minInput.value;
      slider.noUiSlider.set([minValue, null]);
    }
    if (currentMax !== Math.floor(maxInput.value)) {
      var maxValue = maxInput.value === "" ? maxInput.getAttribute("max") : maxInput.value;
      slider.noUiSlider.set([null, maxValue]);
    }
  }
  function validateRange() {
    inputs.forEach(function (input) {
      return setMinAndMaxValues();
    });
  }
  var reset = function reset() {
    slider.noUiSlider.set([minInput.getAttribute("min"), maxInput.getAttribute("max")], false);
    minInput.value = "";
    maxInput.value = "";
    min = Math.floor(minInput.getAttribute("min"));
    max = Math.floor(maxInput.getAttribute("max"));
    setMinAndMaxValues();
  };
  var unload = function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    slider.noUiSlider.destroy();
  };
  return {
    unload: unload,
    reset: reset,
    validateRange: validateRange
  };
};

var selectors$8 = {
  filterGroup: '.filter-form__group[data-filter-group-has-search="true"]',
  filterListItem: "[data-filter-list-item]",
  searchInput: "[data-filter-search-input]",
  searchClear: "[data-filter-search-clear]"
};

/**
 * FilterSearch
 * @param {Object} node the filter form
 * @returns {Function} unload
 */
var FilterSearch = function FilterSearch(node) {
  if (!node) return false;
  var searchGroups = {};
  _initSearchGroups();
  var events = [e$2(node, "keyup", _handleKeyup), e$2(node, "click", _handleClick)];
  function _initSearchGroups() {
    t$2(selectors$8.filterGroup, node).forEach(function (group) {
      var filterLabel = group.dataset.filterLabel;
      var searchGroup = {};
      searchGroup.groupContainer = group;
      searchGroup.filterListItems = t$2(selectors$8.filterListItem, group).map(function (filterListItemEl) {
        var itemLabel = filterListItemEl.dataset.itemLabel;
        return {
          filterListItemEl: filterListItemEl,
          itemLabel: itemLabel
        };
      });
      searchGroups[filterLabel] = searchGroup;
    });
  }
  function _handleClick(evt) {
    var searchClearEl = evt.target.closest(selectors$8.searchClear);
    var filterGroupEl = evt.target.closest(selectors$8.filterGroup);
    if (searchClearEl && filterGroupEl) {
      var searchInputEl = n$2(selectors$8.searchInput, filterGroupEl);
      searchInputEl.value = "";
      _updateSearch(searchInputEl);
    }
  }
  function _handleKeyup(evt) {
    var searchInputEl = evt.target.closest(selectors$8.searchInput);
    _updateSearch(searchInputEl);
  }
  function _updateSearch(searchInputEl) {
    if (!searchInputEl) return;
    var filterLabel = searchInputEl.dataset.filterLabel;
    var currentSearchGroup = searchGroups[filterLabel];
    if (!currentSearchGroup) return;
    var myExp = new RegExp(searchInputEl.value, "gi");
    var searchMatchCount = 0;
    currentSearchGroup.groupContainer.dataset.filterSearchActive = searchInputEl.value !== "";
    currentSearchGroup.filterListItems.forEach(function (filterListItem) {
      var searchMatch = filterListItem.itemLabel.search(myExp) !== -1;
      filterListItem.filterListItemEl.dataset.filterItemSearchMatch = searchMatch;
      if (searchMatch) {
        searchMatchCount++;
      }
    });
    currentSearchGroup.groupContainer.dataset.filterSearchEmpty = searchInputEl.value !== "" && searchMatchCount <= 0;
  }
  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }
  return {
    unload: unload
  };
};

var selectors$7 = {
  scopedForm: function scopedForm(formType) {
    return "[data-filter-form][data-form-type=\"".concat(formType, "\"]");
  },
  topbarHiddenFilters: "[data-topbar-hidden-filters]",
  filterForm: "[data-filter-form]",
  filterItem: "[data-filter-item]",
  filterList: ".filter-form__list-wrapper",
  groupContents: ".filter-form__group-filter-wrapper",
  filterItemInput: "[data-filter-item-input]",
  group: "[data-filter-group]",
  groupToggle: "[data-filter-group-toggle]",
  drawerBackGroupToggle: "[data-filter-group-toggle-drawer-back]",
  groupToggleByValue: function groupToggleByValue(value) {
    return "[data-filter-group-toggle=\"".concat(value, "\"]");
  },
  clearGroup: "[data-filter-group-clear]",
  priceRange: "[data-price-range]",
  rangeInput: "[data-range-input]",
  rangeInputMin: '[data-range-input-type="min"]',
  rangeInputMax: '[data-range-input-type="max"]',
  clearAll: "[data-clear-all-filters]",
  filterTruncateToggle: "[data-filter-truncate-toggle]",
  filterTruncateToggleText: "[data-truncate-toggle-text]",
  shouldTruncate: '[data-filter-item-should-truncate="true"]'
};

/**
 * FilterForm
 * @param {Object} node the filter form
 * @returns {Function} unload
 * @returns {Function} renderFilters
 */
var FilterForm = function FilterForm(node) {
  if (!node) return false;
  var formType = node.dataset.formType;
  var clearAllEls, clearGroupEls, filterSearch, groupEls, groupToggleEls, rangeContainer, rangeInputs;
  var range = null;
  var events = [];
  init();
  function init() {
    groupEls = t$2(selectors$7.group, node);
    groupToggleEls = t$2(selectors$7.groupToggle, node);
    clearGroupEls = t$2(selectors$7.clearGroup, node);
    clearAllEls = t$2(selectors$7.clearAll, node);
    rangeInputs = t$2(selectors$7.rangeInput, node);
    rangeContainer = n$2(selectors$7.priceRange, node);
    filterSearch = FilterSearch(node);
    if (rangeContainer) {
      range = priceRange(rangeContainer);
    }
    events.push(e$2(node, "keydown", handleSubmit), e$2(node, "change", changeHandler), e$2(groupToggleEls, "click", toggleGroup), e$2(rangeInputs, "change", rangeChanged), e$2(clearGroupEls, "click", clearGroup), e$2(clearAllEls, "click", clearAllFilters), e$2(groupEls, "click", toggleGroupTruncate), c(["filters:render-filters", "filters:filter-removed"], function (_ref) {
      var doc = _ref.doc;
      return renderFilters(doc);
    }));
  }
  function handleSubmit(evt) {
    // Pressing "Enter" on a price range input submits the form, but also causes
    // a "change" event, which leads to a double load. Instead, we prevent "Enter"
    // from applying, and blur the input to trigger the "change".
    if (evt.code == "Enter" && evt.target.hasAttribute("data-range-input")) {
      evt.preventDefault();
      evt.target.blur();
    }
  }
  function changeHandler(evt) {
    if (evt.target.classList.contains("filter-item__checkbox")) {
      filterChange(evt.target);
    } else if (evt.target.classList.contains("filter-item__radio")) {
      sortChange(evt);
    }
  }
  function filterChange(filter) {
    if (filter.dataset.filterItemContentDisabled === "true") {
      return;
    }
    checkForActiveFilters(filter);
    range && range.validateRange();

    // Emit a filter changed event to apply loading styles
    filterChanged();
    var shouldDebounce = true;
    if (filter.id.includes("filter.v.availability")) {
      // HACK: avoid debounce on the in-stock toggle.  Later we should see about
      // a better way to decide what changes get debounced vs not, it is def
      // necessary to debounce on multi select like color or size
      shouldDebounce = false;
    }

    // Debounce the actual filter update event to allow for multiple filter changes in quick succsession
    if (shouldDebounce) {
      debounce(function () {
        return updateFilters(node);
      }, 1000)();
    } else {
      updateFilters(node);
    }
  }
  function sortChange(e) {
    checkForActiveFilters(e.target);
    range && range.validateRange();
    updateFilters(node);
  }
  function rangeChanged(e) {
    var input = e.currentTarget;
    updateRangeInputs(input);
    checkForActiveFilters(input);
    range && range.validateRange();
    updateFilters(node);
  }
  function updateRangeInputs(input) {
    var type = input.getAttribute("data-range-input-type");
    var oppositeBoundSelectorMap = {
      "min": "rangeInputMax",
      "max": "rangeInputMin"
    };
    var oppositeBoundAttributeMap = {
      "min": "max",
      "max": "min"
    };
    var priceRange = input.closest(selectors$7.priceRange);
    var oppositeBound = n$2(selectors$7[oppositeBoundSelectorMap[type]], priceRange);
    if (input.value === input.getAttribute(type)) {
      if (oppositeBound.value === oppositeBound.getAttribute(oppositeBoundAttributeMap[type])) {
        input.value = "";
        oppositeBound.value = "";
      }
    }
  }
  function toggleGroup(evt) {
    evt.preventDefault();
    var group = n$2("#".concat(evt.currentTarget.getAttribute("aria-controls")));
    var ariaExpanded = evt.currentTarget.getAttribute("aria-expanded") === "true";
    slideStop(group);
    if (ariaExpanded) {
      closeGroup(evt.currentTarget, group);
    } else {
      openGroup(evt.currentTarget, group);
    }
  }
  function openGroup(button, group) {
    if (formType === "drawer") {
      t$2(selectors$7.groupToggle, group).forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", true);
      });
    } else {
      slideDown(group);
      button.setAttribute("aria-expanded", true);
    }
    group.setAttribute("aria-hidden", false);
  }
  function closeGroup(button, group) {
    if (formType === "drawer") {
      t$2(selectors$7.groupToggle, group).forEach(function (toggle) {
        toggle.setAttribute("aria-expanded", true);
      });
    } else {
      slideUp(group);
      button.setAttribute("aria-expanded", false);
    }
    group.setAttribute("aria-hidden", true);
  }
  function clearGroup(evt) {
    evt.preventDefault();
    var group = evt.currentTarget.closest(selectors$7.group);
    if (group) {
      t$2(selectors$7.filterItemInput, group).forEach(function (input) {
        if (input.type === "checkbox" || input.type === "radio") {
          input.checked = false;
        } else {
          var _range;
          input.value = "";
          (_range = range) === null || _range === void 0 ? void 0 : _range.reset();
        }
      });
      updateFilters(node);
      checkGroupActiveFilters(group);
    }
  }
  function clearAllFilters() {
    var _range2;
    var emitUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    (_range2 = range) === null || _range2 === void 0 ? void 0 : _range2.reset();
    if (!range) {
      rangeInputs.forEach(function (input) {
        input.value = "";
      });
    }
    t$2("".concat(selectors$7.filterItemInput), node).forEach(function (input) {
      if (input.type === "checkbox" || input.type === "radio") {
        input.checked = false;
      }
    });
    if (emitUpdate) {
      updateFilters(node);
    }
    groupEls.forEach(checkGroupActiveFilters);
  }
  function toggleGroupTruncate(evt) {
    var truncateToggleEl = evt.target.closest(selectors$7.filterTruncateToggle);
    var groupEl = evt.target.closest(selectors$7.group);
    if (truncateToggleEl && groupEl) {
      var shouldTruncateEls = t$2(selectors$7.shouldTruncate, groupEl);
      shouldTruncateEls.forEach(function (element) {
        element.dataset.filterItemIsTruncated = element.dataset.filterItemIsTruncated === "true" ? "false" : "true";
      });
      truncateToggleEl.setAttribute("aria-expanded", truncateToggleEl.getAttribute("aria-expanded") === "true" ? "false" : "true");
      var truncateToggleTextEl = n$2(selectors$7.filterTruncateToggleText, truncateToggleEl);
      var buttonLabelAttr = truncateToggleEl.getAttribute("aria-expanded") === "true" ? "data-show-more-text" : "data-show-less-text";
      truncateToggleTextEl.innerHTML = truncateToggleEl.getAttribute(buttonLabelAttr);
    }
  }
  function containsCheckedInputs(items) {
    return items.some(function (input) {
      return input.checked;
    });
  }
  function rangeInputsHaveValue() {
    return rangeInputs.some(function (input) {
      var inputHasValue = input.value !== "";
      if (inputHasValue) {
        var type = input.getAttribute("data-range-inut-type");
        inputHasValue = input.value !== input.getAttribute(type);
      }
      return inputHasValue;
    });
  }
  function checkGroupActiveFilters(group) {
    if (group) {
      var filterType = group.dataset.filterType;
      if (filterType === "list" || filterType === "boolean") {
        group.dataset.filterGroupHasActiveFilters = containsCheckedInputs(t$2("input", group));
      } else if (filterType === "price_range") {
        group.dataset.filterGroupHasActiveFilters = rangeInputsHaveValue();
      }
    }
  }
  function checkForActiveFilters(filterItem) {
    var group = filterItem.closest(selectors$7.group);
    var activeItems = containsCheckedInputs(t$2("input", node)) || rangeInputsHaveValue();
    checkGroupActiveFilters(group);
    node.dataset.filtersActive = activeItems;
  }
  function renderFilters(doc) {
    // The top bar handles updating its own visible content, but we need to update the hidden form.
    // Otherwise, we update the full wrapping container of the filter form.
    if (formType === "topbar") {
      updateInnerHTML(selectors$7.topbarHiddenFilters, doc);
    } else {
      var updatedForm = n$2(selectors$7.scopedForm(formType), doc);
      var groupToggleSelector = "".concat(selectors$7.groupToggle, ":not(").concat(selectors$7.drawerBackGroupToggle, ")");
      var updatedGroupToggles = t$2(groupToggleSelector, updatedForm);
      updateToggles(node, updatedGroupToggles, groupToggleSelector);
      if (formType === "drawer") {
        var updatedDrawerBackGroupToggles = t$2(selectors$7.drawerBackGroupToggle, updatedForm);
        updateToggles(node, updatedDrawerBackGroupToggles, selectors$7.drawerBackGroupToggle);
      }
      unload();
      node.setAttribute("data-filters-active", updatedForm.getAttribute("data-filters-active"));
      node.innerHTML = updatedForm.innerHTML;
      init();
    }
  }
  function updateToggles(currentForm, updatedGroupToggles, groupToggleSelector) {
    updatedGroupToggles.forEach(function (updatedGroupToggle) {
      var toggleByValueSelector = selectors$7.groupToggleByValue(updatedGroupToggle.getAttribute("data-filter-group-toggle"), currentForm);
      var currentGroupToggle = n$2("".concat(selectors$7.scopedForm(formType), " ").concat(groupToggleSelector).concat(toggleByValueSelector), currentForm);
      if (currentGroupToggle) {
        var currentGroupContents = n$2(selectors$7.groupContents, currentGroupToggle.closest(selectors$7.group));
        var updatedGroupContents = n$2(selectors$7.groupContents, updatedGroupToggle.closest(selectors$7.group));

        // In the drawer, the main toggle element doesn't get it's 'aria-expanded' attribute updated because there's a
        // "back" button with the drawer pane that does. With that, we only update if we're in a sidebar, or dealing
        // with that "back" button.
        if (formType === "sidebar" || groupToggleSelector === selectors$7.drawerBackGroupToggle) {
          updatedGroupToggle.setAttribute("aria-expanded", currentGroupToggle.getAttribute("aria-expanded"));
        }
        updatedGroupContents.setAttribute("aria-hidden", currentGroupContents.getAttribute("aria-hidden"));
      }
    });
  }
  function unload() {
    var _range3, _filterSearch;
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    events = [];
    (_range3 = range) === null || _range3 === void 0 ? void 0 : _range3.unload();
    (_filterSearch = filterSearch) === null || _filterSearch === void 0 ? void 0 : _filterSearch.unload();
  }
  return {
    unload: unload,
    renderFilters: renderFilters,
    clearAllFilters: clearAllFilters
  };
};

var filtering = function filtering(container) {
  var formElements = t$2("[data-filter-form]", container);
  var forms = [];
  var formData, searchParams;
  formElements.forEach(function (form) {
    forms.push(FilterForm(form));
  });
  setParams();
  function setParams(form) {
    form = form || formElements[0];
    formData = new FormData(form);
    searchParams = new URLSearchParams(formData).toString();
  }

  /**
   * Takes the updated form element and updates all other forms with the updated values
   * @param {*} target
   */
  function syncForms(target) {
    if (!target) return;
    var targetInputs = t$2("[data-filter-item-input]", target);
    targetInputs.forEach(function (targetInput) {
      if (targetInput.type === "checkbox" || targetInput.type === "radio") {
        var valueEscaped = targetInput.dataset.valueEscaped;
        var items = t$2("input[name='".concat(escapeQuotes(targetInput.name), "'][data-value-escaped='").concat(escapeQuotes(valueEscaped), "']"));
        items.forEach(function (input) {
          input.checked = targetInput.checked;
        });
      } else {
        var _items = t$2("input[name='".concat(targetInput.name, "']"));
        _items.forEach(function (input) {
          input.value = targetInput.value;
        });
      }
    });
  }
  function escapeQuotes(str) {
    var escapeMap = {
      '"': '\\"',
      "'": "\\'"
    };
    return str.replace(/"|'/g, function (m) {
      return escapeMap[m];
    });
  }
  function clearRangeInputs() {
    var rangeInputs = t$2("[data-range-input]", container);
    rangeInputs.forEach(function (input) {
      input.value = "";
    });
  }
  function resetForms() {
    forms.forEach(function (form) {
      form.clearAllFilters(false);
    });
  }
  return {
    getState: function getState() {
      return {
        url: searchParams
      };
    },
    filtersUpdated: function filtersUpdated(target, cb) {
      syncForms(target);
      setParams(target);
      r$1("filters:updated");
      return cb(this.getState());
    },
    removeFilters: function removeFilters(target, cb) {
      r$1("filters:filter-removed");
      return cb({
        url: target[0].getAttribute("data-url-to-remove")
      });
    },
    removeRange: function removeRange(cb) {
      clearRangeInputs();
      setParams();
      return cb(this.getState());
    },
    clearAll: function clearAll(cb) {
      resetForms();
      setParams();
      return cb(this.getState());
    }
  };
};

var filterHandler = function filterHandler(_ref) {
  var container = _ref.container,
    renderCB = _ref.renderCB;
  var subscriptions = null;
  var filters = null;
  var delegate = null;
  filters = filtering(container);

  // Set initial evx state from collection url object
  o$1(filters.getState());
  subscriptions = [filtersRemoved(function (_, _ref2) {
    var target = _ref2.target;
    filters.removeFilters(target, function (data) {
      renderCB(data.url);
      o$1(data)();
    });
  }), filtersUpdated(function (_, _ref3) {
    var target = _ref3.target;
    filters.filtersUpdated(target, function (data) {
      renderCB(data.url);
      o$1(data)();
    });
  }), everythingCleared(function () {
    filters.clearAll(function (data) {
      renderCB(data.url);
      o$1(data)();
    });
  })];
  delegate = new Delegate(container);
  delegate.on("click", "[data-remove-filter], [data-remove-range]", function (e) {
    e.preventDefault();
    removeFilters([e.target]);
  });
  delegate.on("click", "[data-clear-all-filters]", function (e) {
    e.preventDefault();
    clearAllFilters();
  });
  window.addEventListener("popstate", onPopstate);
  function onPopstate() {
    var url = new URL(window.location);
    var searchParams = url.search.replace("?", "");
    renderCB(searchParams, false);
    o$1({
      url: searchParams
    });
  }
  var unload = function unload() {
    delegate && delegate.off();
    subscriptions && subscriptions.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    window.removeEventListener("popstate", onPopstate);
  };
  return {
    unload: unload
  };
};

var selectors$6 = {
  sidebar: "[data-filter-sidebar]",
  sidebarForm: "[data-filter-form]",
  sidebarToggle: "[data-sidebar-toggle]"
};
var FilterSidebar = function FilterSidebar(node) {
  if (!node) return;
  var sidebarEl = n$2(selectors$6.sidebar, node);
  if (!sidebarEl) return;
  var sidebarToggleEl = n$2(selectors$6.sidebarToggle, node);
  var filterSidebarAnimation = null;
  if (shouldAnimate(node)) {
    filterSidebarAnimation = animateFilterSidebar(sidebarEl);
  }
  if (sidebarEl.dataset.defaultOpen === "true") {
    showSidebar();
  }
  function toggleSidebar() {
    var ariaHidden = sidebarEl.getAttribute("aria-hidden") === "true";
    if (ariaHidden) {
      showSidebar();
    } else {
      hideSidebar();
    }
  }
  function showSidebar() {
    if (sidebarToggleEl) {
      sidebarToggleEl.setAttribute("aria-expanded", true);
    }
    sidebarEl.setAttribute("aria-hidden", false);
    window.requestAnimationFrame(function () {
      if (shouldAnimate(node)) {
        filterSidebarAnimation.open();
      }
    });
  }
  function hideSidebar() {
    if (sidebarToggleEl) {
      sidebarToggleEl.setAttribute("aria-expanded", false);
    }
    sidebarEl.setAttribute("aria-hidden", true);
    window.requestAnimationFrame(function () {
      if (shouldAnimate(node)) {
        filterSidebarAnimation.close();
      }
    });
  }
  function unload() {}
  return {
    toggleSidebar: toggleSidebar,
    unload: unload
  };
};

var selectors$5 = {
  drawer: "[data-filter-drawer]",
  drawerWash: "[data-filter-drawer-wash]",
  drawerForm: "[data-filter-form]",
  drawerToggle: "[data-drawer-toggle]",
  drawerTitle: "[data-filter-drawer-title]",
  drawerApply: "[data-filter-drawer-apply]",
  closeDrawer: "[data-close-drawer]"
};
var FilterDrawer = function FilterDrawer(node) {
  if (!node) return false;
  var drawerEl = n$2(selectors$5.drawer, node);
  if (!drawerEl) return false;
  var drawerToggleEl = n$2(selectors$5.drawerToggle, node);
  var drawerCloseEls, drawerFormEl, drawerWash;
  var focusTrap = createFocusTrap(drawerEl, {
    allowOutsideClick: true
  });
  var events = [];
  init();
  function init() {
    drawerFormEl = n$2(selectors$5.drawerForm, drawerEl);
    drawerCloseEls = t$2("".concat(selectors$5.closeDrawer, ", ").concat(selectors$5.drawerApply), drawerEl);
    drawerWash = n$2(selectors$5.drawerWash, node);
    events.push(e$2(drawerWash, "click", hideDrawer), e$2(drawerCloseEls, "click", hideDrawer), e$2(drawerFormEl, "keydown", function (_ref) {
      var keyCode = _ref.keyCode;
      if (keyCode === 27) hideDrawer();
    }));
  }
  function toggleDrawer() {
    var ariaHidden = drawerEl.getAttribute("aria-hidden") === "true";
    if (ariaHidden) {
      showDrawer();
    } else {
      hideDrawer();
    }
  }
  function showDrawer() {
    if (drawerToggleEl) {
      drawerToggleEl.setAttribute("aria-expanded", true);
    }
    drawerEl.setAttribute("aria-hidden", false);
    document.body.setAttribute("data-drawer-modal-open", "true");
    if (window.matchMedia(getMediaQuery("below-1024")).matches) {
      focusTrap.activate();
      disableBodyScroll(node, {
        allowTouchMove: function allowTouchMove(el) {
          while (el && el !== document.body) {
            if (el.getAttribute("data-scroll-lock-ignore") !== null) {
              return true;
            }
            el = el.parentNode;
          }
        },
        reserveScrollBarGap: true
      });
    }
  }
  function hideDrawer() {
    if (drawerToggleEl) {
      drawerToggleEl.setAttribute("aria-expanded", false);
    }
    drawerEl.setAttribute("aria-hidden", true);
    if (window.matchMedia(getMediaQuery("below-1024")).matches) {
      focusTrap === null || focusTrap === void 0 ? void 0 : focusTrap.deactivate();
      enableBodyScroll(node);
    }

    // Delay by 500ms to allow the drawer to close before any CSS styles are applied.
    setTimeout(function () {
      document.body.setAttribute("data-drawer-modal-open", "false");
    }, 500);
  }
  function renderFilters(doc) {
    updateInnerHTML("".concat(selectors$5.drawer, " ").concat(selectors$5.drawerTitle), doc);
    updateInnerHTML("".concat(selectors$5.drawer, " ").concat(selectors$5.drawerApply), doc);
    var docDrawerEl = n$2(selectors$5.drawer, doc);
    drawerEl.dataset.filtersActive = docDrawerEl.dataset.filtersActive;
    unload();
    init();
  }
  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    events = [];
  }
  return {
    toggleDrawer: toggleDrawer,
    renderFilters: renderFilters,
    unload: unload
  };
};

var selectors$4 = {
  layoutToggleContainer: "[data-item-layout-toggle]",
  toggleButtons: "[data-item-layout-toggle-button]"
};
var ItemLayoutToggle = function ItemLayoutToggle(node) {
  if (!node) return;
  var layoutToggleContainerEl = n$2(selectors$4.layoutToggleContainer, node);
  if (!layoutToggleContainerEl) return;
  var toggleButtonEls = t$2(selectors$4.toggleButtons, layoutToggleContainerEl);
  var clickEvent = e$2(layoutToggleContainerEl, "click", _handleClick);
  function _handleClick(evt) {
    var toggleButtonEl = evt.target.closest(selectors$4.toggleButtons);
    if (toggleButtonEl) {
      node.setAttribute("data-item-layout", toggleButtonEl.dataset.layoutType);
      toggleButtonEls.forEach(function (button) {
        button.dataset.isActive = false;
      });
      toggleButtonEl.dataset.isActive = true;
    }
  }
  function unload() {
    clickEvent();
  }
  return {
    unload: unload
  };
};

var selectors$3 = {
  topbarForm: "[data-filter-topbar]",
  resultsContainer: "[data-results-container]",
  filterItem: "[data-filter-item]",
  sidebarToggle: "[data-sidebar-toggle]",
  drawerToggle: "[data-drawer-toggle]",
  sortToggle: "[data-topbar-sort-toggle]",
  sortValues: "[data-topbar-sort-values]",
  sortGroup: "[data-topbar-sort-group]",
  groupLabels: "[data-filter-group-label]",
  groupValues: "[data-filter-group-values]",
  filterInputs: "[data-filter-item-input]",
  sortInputs: "[data-sort-item-input]",
  sortLabel: "[data-sort-label]",
  rangeInput: "[data-range-input]",
  resultsCount: "[data-results-count]",
  resultsCountMobile: ".filter-topbar__results-count-wrapper [data-results-count]",
  activeFilters: "[data-active-filters]",
  sortWash: "[data-topbar-sort-wash]"
};
var classes$2 = {
  filterDisabled: "filter-item__content--disabled",
  filterGroupActive: "filter-group--active"
};

// eslint-disable-next-line valid-jsdoc
/**
 * A class to handle desktop filter bar functionality
 * @param {*} node the collection section container
 * @returns renderFilters and unload methods
 */
var filterBar = function filterBar(node) {
  // `node` is the collection section container.
  // Using `container` here as the filter bar container to keep filter bar
  // and filter drawer DOM scope separate.
  var container = node ? n$2(selectors$3.topbarForm, node) : null;
  if (!node || !container) return;
  var itemLayoutToggle = ItemLayoutToggle(node);
  var sortToggleEl = n$2(selectors$3.sortToggle, container);
  var sortValuesEl = n$2(selectors$3.sortValues, container);
  var sortGroupEl = n$2(selectors$3.sortGroup, container);
  var events = [e$2(container, "change", changeHandler), e$2(container, "keydown", function (_ref) {
    var keyCode = _ref.keyCode;
    if (keyCode === 27) hideSort();
  })];
  if (sortToggleEl) {
    events.push(e$2(window, "click", clickHandler));

    // Hide sort if the header account link is clicked
    c("header-account-link:clicked", hideSort);
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Delegates click events
   * @param {event} e click event
   */
  function clickHandler(e) {
    var targetGroupEl = e.target.closest(selectors$3.sortGroup);
    var targetSortToggleEl = e.target.closest(selectors$3.sortToggle);
    var sortWashEl = e.target.closest(selectors$3.sortWash);

    // If the click happened outside of a filter group
    // We don't want to close the groups if the click happened on a filter in a group
    if (!targetGroupEl || sortWashEl) {
      hideSort();
    }
    if (targetSortToggleEl) {
      toggleSort();
    }
  }

  // eslint-disable-next-line valid-jsdoc
  /**
   * Delegates change events
   * @param {event} e change event
   */
  function changeHandler(e) {
    var sortInput = e.target.closest("".concat(selectors$3.topbarForm, " ").concat(selectors$3.sortInputs));
    if (sortInput) {
      filterChange(sortInput);
    }
  }
  function toggleSort() {
    var ariaExpanded = sortToggleEl.getAttribute("aria-expanded") === "true";
    if (ariaExpanded) {
      hideSort();
    } else {
      showSort();
    }
  }
  function showSort() {
    updateScrollLock(true);
    sortToggleEl.setAttribute("aria-expanded", true);
    sortValuesEl.setAttribute("aria-hidden", false);
    u$1(sortGroupEl, classes$2.filterGroupActive);
  }
  function hideSort() {
    updateScrollLock(false);
    sortToggleEl.setAttribute("aria-expanded", false);
    sortValuesEl.setAttribute("aria-hidden", true);
    i$1(sortGroupEl, classes$2.filterGroupActive);
  }
  function updateScrollLock(addScrollLock) {
    if (window.matchMedia(getMediaQuery("below-720")).matches) {
      if (addScrollLock) {
        disableBodyScroll(sortValuesEl, {
          allowTouchMove: function allowTouchMove(el) {
            while (el && el !== document.body) {
              if (el.getAttribute("data-scroll-lock-ignore") !== null) {
                return true;
              }
              el = el.parentNode;
            }
          }
        });
      } else {
        enableBodyScroll(sortValuesEl);
      }
    }
  }
  function filterChange(filter) {
    if (filter.classList.contains(classes$2.filterDisabled)) {
      return;
    }
    debounce(function () {
      return updateFilters(container);
    }, 300)();
  }
  function renderFilters(doc) {
    updateInnerHTML("".concat(selectors$3.topbarForm, " ").concat(selectors$3.sidebarToggle), doc);
    updateInnerHTML("".concat(selectors$3.topbarForm, " ").concat(selectors$3.drawerToggle), doc);
    updateInnerHTML("".concat(selectors$3.topbarForm, " ").concat(selectors$3.resultsCount), doc);
    updateInnerHTML("".concat(selectors$3.topbarForm, " ").concat(selectors$3.sortLabel), doc);
    updateInnerHTML("".concat(selectors$3.topbarForm, " ").concat(selectors$3.activeFilters), doc);
    updateInnerHTML("".concat(selectors$3.topbarForm, " ").concat(selectors$3.resultsCountMobile), doc);
    updateInnerHTML("".concat(selectors$3.resultsContainer, " ").concat(selectors$3.activeFilters), doc);
  }
  function unload() {
    events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    itemLayoutToggle && itemLayoutToggle.unload();
  }
  return {
    renderFilters: renderFilters,
    unload: unload
  };
};

var selectors$2 = {
  infiniteScrollContainer: ".collection__infinite-container",
  infiniteScrollTrigger: ".collection__infinite-trigger",
  partial: "[data-partial]",
  filterSidebar: "[data-filter-sidebar]",
  filterDrawer: "[data-filter-drawer]",
  filterTopBar: "[data-filter-topbar]",
  sidebarToggle: "[data-sidebar-toggle]",
  drawerToggle: "[data-drawer-toggle]",
  loader: ".collection__loading",
  paginationItemCount: "[data-pagination-item-count]",
  productItems: ".product-item"
};
var classes$1 = {
  active: "is-active",
  hideProducts: "animation--container-hide",
  loading: "is-loading"
};
var strings$1 = window.theme.strings;
register("collection", {
  infiniteScroll: null,
  focusTrap: null,
  events: [],
  onLoad: function onLoad() {
    var _this = this;
    var _this$container$datas = this.container.dataset,
      collectionItemCount = _this$container$datas.collectionItemCount,
      paginationType = _this$container$datas.paginationType,
      enableStickyContainer = _this$container$datas.enableStickyContainer;
    if (!parseInt(collectionItemCount)) return;
    this.partial = n$2(selectors$2.partial, this.container);
    this.filterSidebarEl = n$2(selectors$2.filterSidebar, this.container);
    this.filterDrawerEl = n$2(selectors$2.filterDrawer, this.container);
    this.filterTopBarEl = n$2(selectors$2.filterTopBar, this.container);
    this.paginationItemCount = n$2(selectors$2.paginationItemCount, this.container);
    this.loadingEl = n$2(selectors$2.loader, this.container);

    // filtering
    this._initFiltering();

    // Ininite scroll
    this.paginationType = paginationType;
    this.paginated = this.paginationType === "paginated";
    this.infiniteScrollTrigger = n$2(selectors$2.infiniteScrollTrigger, this.container);
    if (!this.paginated) {
      this._initInfiniteScroll();
    }
    this.productItem = ProductItem(this.container);
    if (shouldAnimate(this.container)) {
      this.animateCollection = animateCollectionAndSearch(this.container);
    }

    // Apply loading animation as soon as a filter has changed
    onFilterChange(function () {
      u$1(_this.loadingEl, classes$1.active);
      u$1(_this.filterDrawerEl, classes$1.loading);
    });
    if (enableStickyContainer == "true" && !isMobile$1()) {
      this.stickyScroll = StickyScroll(this.container, {
        styledEl: this.filterSidebarEl
      });
    }
  },
  _initFiltering: function _initFiltering() {
    var _this2 = this;
    this.filterTopBar = filterBar(this.container);
    this.filterHandler = filterHandler({
      container: this.container,
      renderCB: this._renderView.bind(this)
    });
    if (this.filterSidebarEl) {
      this.filterSidebar = FilterSidebar(this.container);
      this.sidebarToggleEl = n$2(selectors$2.sidebarToggle, this.container);
      this.events.push(e$2(this.sidebarToggleEl, "click", function (evt) {
        var _this2$filterSidebar;
        (_this2$filterSidebar = _this2.filterSidebar) === null || _this2$filterSidebar === void 0 ? void 0 : _this2$filterSidebar.toggleSidebar(evt);
      }));
    }
    if (this.filterDrawerEl) {
      this.filterDrawer = FilterDrawer(this.container);
      this.drawerToggleEl = n$2(selectors$2.drawerToggle, this.container);
      this.events.push(e$2(this.drawerToggleEl, "click", function (evt) {
        var _this2$filterDrawer;
        (_this2$filterDrawer = _this2.filterDrawer) === null || _this2$filterDrawer === void 0 ? void 0 : _this2$filterDrawer.toggleDrawer(evt);
      }));
    }
  },
  _initInfiniteScroll: function _initInfiniteScroll() {
    var _this3 = this;
    var infiniteScrollOptions = {
      container: selectors$2.infiniteScrollContainer,
      pagination: selectors$2.infiniteScrollTrigger,
      loadingText: "Loading...",
      callback: function callback() {
        var _this3$animateCollect;
        _this3.productItem && _this3.productItem.unload();
        _this3.productItem = ProductItem(_this3.container);
        (_this3$animateCollect = _this3.animateCollection) === null || _this3$animateCollect === void 0 ? void 0 : _this3$animateCollect.infiniteScrollReveal();
        _this3._updatePaginationCount();
        r$1("collection:updated");
      }
    };
    if (this.paginationType === "click") {
      infiniteScrollOptions.method = "click";
    }
    this.infiniteScroll = new Ajaxinate(infiniteScrollOptions);
  },
  _updatePaginationCount: function _updatePaginationCount() {
    var productItemCount = t$2(selectors$2.productItems, this.container).length;
    var viewing = strings$1.pagination.viewing.replace("{{ of }}", "".concat(productItemCount)).replace("{{ total }}", this.partial.dataset.collectionProductsCount);
    this.paginationItemCount.innerHTML = "".concat(viewing, " ").concat(strings$1.pagination.products);
  },
  _renderView: function _renderView(searchParams) {
    var _this4 = this;
    var updateHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var url = "".concat(window.location.pathname, "?section_id=").concat(this.container.dataset.sectionId, "&").concat(searchParams);
    u$1(this.partial, classes$1.hideProducts);
    u$1(this.loadingEl, classes$1.active);
    this.filterDrawerEl && u$1(this.filterDrawerEl, classes$1.loading);
    fetch(url).then(function (res) {
      return res.text();
    }).then(function (res) {
      var _this4$animateCollect;
      if (updateHistory) {
        _this4._updateURLHash(searchParams);
      }
      var doc = new DOMParser().parseFromString(res, "text/html");
      var updatedPartial = n$2(selectors$2.partial, doc);
      _this4.partial.innerHTML = updatedPartial.innerHTML;
      _this4.partial.dataset.collectionProductsCount = updatedPartial.dataset.collectionProductsCount;
      (_this4$animateCollect = _this4.animateCollection) === null || _this4$animateCollect === void 0 ? void 0 : _this4$animateCollect.updateContents();
      if (!_this4.paginated && _this4.infiniteScrollTrigger) {
        _this4.infiniteScrollTrigger.innerHTML = "";
        _this4._initInfiniteScroll();
      }

      // Drawer and sidebar filters are re-rendered in 'filter-form.js' (based on emitting the following event)
      // The drawer and topbar have some extra elements that need to update themselves
      r$1("filters:render-filters", {
        doc: doc
      });
      _this4.filterDrawer && _this4.filterDrawer.renderFilters(doc);
      _this4.filterTopBar && _this4.filterTopBar.renderFilters(doc);
      _this4.productItem && _this4.productItem.unload();
      _this4.productItem = ProductItem(_this4.container);
      _this4.paginationItemCount = n$2(selectors$2.paginationItemCount, _this4.container);
      i$1(_this4.loadingEl, classes$1.active);
      _this4.filterDrawerEl && i$1(_this4.filterDrawerEl, classes$1.loading);
      r$1("collection:updated");
    });
  },
  _updateURLHash: function _updateURLHash(searchParams) {
    history.pushState({
      searchParams: searchParams
    }, "", "".concat(window.location.pathname).concat(searchParams && "?".concat(searchParams)));
  },
  onUnload: function onUnload() {
    var _this$animateCollecti, _this$stickyScroll;
    this.infiniteScroll && this.infiniteScroll.destroy();
    this.filterHandler && this.filterHandler.unload();
    this.filterSidebar && this.filterSidebar.unload();
    this.filterDrawer && this.filterDrawer.unload();
    this.filterTopBar && this.filterTopBar.unload();
    this.filtering && this.filtering.unload();
    this.productItem && this.productItem.unload();
    (_this$animateCollecti = this.animateCollection) === null || _this$animateCollecti === void 0 ? void 0 : _this$animateCollecti.destroy();
    (_this$stickyScroll = this.stickyScroll) === null || _this$stickyScroll === void 0 ? void 0 : _this$stickyScroll.destroy();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }
});

register("login", {
  onLoad: function onLoad() {
    this.accountLogin = AccountLogin(this.container);
  },
  onUnload: function onUnload() {
    var _this$accountLogin;
    (_this$accountLogin = this.accountLogin) === null || _this$accountLogin === void 0 ? void 0 : _this$accountLogin.unload();
  }
});

register("addresses", {
  onLoad: function onLoad() {
    var _this = this;
    this.modals = t$2("[data-address-modal]", this.container);
    this.focusTrap = null;
    var overlays = t$2("[data-overlay]", this.container);
    var open = t$2("[data-open]", this.container);
    var close = t$2("[data-close]", this.container);
    var remove = t$2("[data-remove]", this.container);
    var countryOptions = t$2("[data-country-option]", this.container) || [];
    this.events = [e$2(open, "click", function (e) {
      return _this.openModal(e);
    }), e$2([].concat(_toConsumableArray$1(close), _toConsumableArray$1(overlays)), "click", function (e) {
      return _this.closeModal(e);
    }), e$2(remove, "click", function (e) {
      return _this.removeAddress(e);
    }), e$2(this.modals, "keydown", function (e) {
      if (e.keyCode === 27) _this.closeModal(e);
    })];
    countryOptions.forEach(function (el) {
      var formId = el.dataset.formId;
      var countrySelector = "AddressCountry_" + formId;
      var provinceSelector = "AddressProvince_" + formId;
      var containerSelector = "AddressProvinceContainer_" + formId;
      new window.Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
        hideElement: containerSelector
      });
    });
  },
  onUnload: function onUnload() {
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  },
  openModal: function openModal(e) {
    e.preventDefault();
    var which = e.currentTarget.dataset.open;
    var modal = this.modals.find(function (el) {
      return el.dataset.addressModal == which;
    });
    u$1(modal, "active");
    this.focusTrap = createFocusTrap(modal, {
      allowOutsideClick: true
    });
    this.focusTrap.activate();
    document.body.setAttribute("data-drawer-modal-open", "true");
    disableBodyScroll(modal, {
      allowTouchMove: function allowTouchMove(el) {
        while (el && el !== document.body) {
          if (el.getAttribute("data-scroll-lock-ignore") !== null) {
            return true;
          }
          el = el.parentNode;
        }
      },
      reserveScrollBarGap: true
    });
    setTimeout(function () {
      u$1(modal, "visible");
    }, 50);
  },
  closeModal: function closeModal(e) {
    e.preventDefault();
    var modal = e.target.closest(".addresses__modal");
    enableBodyScroll(modal);
    this.focusTrap.deactivate();
    i$1(modal, "visible");
    document.body.setAttribute("data-drawer-modal-open", "false");
    setTimeout(function () {
      i$1(modal, "active");
    }, 350);
  },
  removeAddress: function removeAddress(e) {
    var _e$currentTarget$data = e.currentTarget.dataset,
      confirmMessage = _e$currentTarget$data.confirmMessage,
      target = _e$currentTarget$data.target;
    if (confirm(confirmMessage)) {
      window.Shopify.postLink(target, {
        parameters: {
          _method: "delete"
        }
      });
    }
  }
});

register("article", {
  onLoad: function onLoad() {
    focusFormStatus(this.container);
    var socialShareContainer = n$2(".social-share", this.container);
    if (socialShareContainer) {
      this.socialShare = SocialShare(socialShareContainer);
    }
    wrapIframes(t$2("iframe", this.container));
    wrapTables(t$2("table", this.container));
    if (shouldAnimate(this.container)) {
      this.animateArticle = animateArticle(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateArticle;
    this.socialShare && this.socialShare();
    (_this$animateArticle = this.animateArticle) === null || _this$animateArticle === void 0 ? void 0 : _this$animateArticle.destroy();
  }
});

register("password", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animatePassword = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animatePassword;
    (_this$animatePassword = this.animatePassword) === null || _this$animatePassword === void 0 ? void 0 : _this$animatePassword.destroy();
  }
});

var selectors$1 = {
  video: ".about__block-video"
};
register("page", {
  onLoad: function onLoad() {
    var _this = this;
    var videos = t$2(selectors$1.video, this.container);
    this.videoHandlers = [];
    if (videos.length) {
      videos.forEach(function (video) {
        _this.videoHandlers.push(backgroundVideoHandler(video.parentNode));
      });
    }
    this.accordions = Accordions(t$2(".accordion", this.container));
    wrapIframes(t$2("iframe", this.container));
    wrapTables(t$2("table", this.container));
    if (shouldAnimate(this.container)) {
      this.animatePage = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animatePage;
    this.accordions.unload();
    this.videoHandlers.forEach(function (handler) {
      return handler();
    });
    (_this$animatePage = this.animatePage) === null || _this$animatePage === void 0 ? void 0 : _this$animatePage.destroy();
  }
});

var selectors = {
  searchSection: ".search",
  searchBanner: ".search-header",
  infiniteScrollContainer: ".search__infinite-container",
  infiniteScrollTrigger: ".search__infinite-trigger",
  partial: "[data-partial]",
  filterDrawer: "[data-filter-drawer]",
  filterSidebar: "[data-filter-sidebar]",
  filterTopBar: "[data-filter-topbar]",
  sidebarToggle: "[data-sidebar-toggle]",
  drawerToggle: "[data-drawer-toggle]",
  loader: ".search__loading",
  paginationItemCount: "[data-pagination-item-count]",
  searchItems: ".product-item, .search-item"
};
var classes = {
  active: "is-active",
  hideProducts: "animation--search-products-hide"
};
var strings = window.theme.strings;
register("search", {
  infiniteScroll: null,
  events: [],
  onLoad: function onLoad() {
    this.searchBannerEl = n$2(selectors.searchBanner, this.container);
    if (shouldAnimate(this.searchBannerEl)) {
      this.animateSearchBanner = animateStandard(this.searchBannerEl);
    }
    var paginationType = this.container.dataset.paginationType;
    this.searchSectionEl = n$2(selectors.searchSection, this.container);
    this.filterDrawerEl = n$2(selectors.filterDrawer, this.container);
    this.filterSidebarEl = n$2(selectors.filterSidebar, this.container);
    this.filterTopBarEl = n$2(selectors.filterTopBar, this.container);
    this.partial = n$2(selectors.partial, this.container);
    this.paginationItemCount = n$2(selectors.paginationItemCount, this.container);
    this._initFiltering();

    // Ininite scroll
    this.paginationType = paginationType;
    this.paginated = this.paginationType === "paginated";
    this.infiniteScrollTrigger = n$2(selectors.infiniteScrollTrigger, this.container);
    if (!this.paginated) {
      this._initInfiniteScroll();
    }
    this.productItem = ProductItem(this.container);
    if (shouldAnimate(this.searchSectionEl)) {
      this.animateSearch = animateCollectionAndSearch(this.searchSectionEl);
    }
  },
  _initFiltering: function _initFiltering() {
    var _this = this;
    this.filterTopBar = filterBar(this.container);
    this.filterHandler = filterHandler({
      container: this.container,
      renderCB: this._renderView.bind(this)
    });
    if (this.filterSidebarEl) {
      this.filterSidebar = FilterSidebar(this.searchSectionEl);
      this.sidebarToggleEl = n$2(selectors.sidebarToggle, this.container);
      this.events.push(e$2(this.sidebarToggleEl, "click", function (evt) {
        var _this$filterSidebar;
        (_this$filterSidebar = _this.filterSidebar) === null || _this$filterSidebar === void 0 ? void 0 : _this$filterSidebar.toggleSidebar(evt);
      }));
    }
    if (this.filterDrawerEl) {
      this.filterDrawer = FilterDrawer(this.container);
      this.drawerToggleEl = n$2(selectors.drawerToggle, this.container);
      this.events.push(e$2(this.drawerToggleEl, "click", function (evt) {
        var _this$filterDrawer;
        (_this$filterDrawer = _this.filterDrawer) === null || _this$filterDrawer === void 0 ? void 0 : _this$filterDrawer.toggleDrawer(evt);
      }));
    }
  },
  _initInfiniteScroll: function _initInfiniteScroll() {
    var _this2 = this;
    var infiniteScrollOptions = {
      container: selectors.infiniteScrollContainer,
      pagination: selectors.infiniteScrollTrigger,
      loadingText: "Loading...",
      callback: function callback() {
        var _this2$animateSearch;
        _this2.productItem && _this2.productItem.unload();
        _this2.productItem = ProductItem(_this2.container);
        (_this2$animateSearch = _this2.animateSearch) === null || _this2$animateSearch === void 0 ? void 0 : _this2$animateSearch.infiniteScrollReveal();
        _this2._updatePaginationCount();
        r$1("collection:updated");
      }
    };
    if (this.paginationType === "click") {
      infiniteScrollOptions.method = "click";
    }
    this.infiniteScroll = new Ajaxinate(infiniteScrollOptions);
  },
  _updatePaginationCount: function _updatePaginationCount() {
    var searchItemCount = t$2(selectors.searchItems, this.container).length;
    var viewing = strings.pagination.viewing.replace("{{ of }}", "".concat(searchItemCount)).replace("{{ total }}", this.partial.dataset.searchResultsCount);
    this.paginationItemCount.innerHTML = "".concat(viewing, " ").concat(strings.pagination.results);
  },
  _renderView: function _renderView(searchParams) {
    var _this3 = this;
    var updateHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var url = "".concat(window.location.pathname, "?section_id=").concat(this.container.dataset.sectionId, "&").concat(searchParams);
    var loading = n$2(selectors.loader, this.container);
    u$1(loading, classes.active);
    fetch(url).then(function (res) {
      return res.text();
    }).then(function (res) {
      var _this3$animateSearch;
      if (updateHistory) {
        _this3._updateURLHash(searchParams);
      }
      var doc = new DOMParser().parseFromString(res, "text/html");
      var updatedPartial = n$2(selectors.partial, doc);
      _this3.partial.innerHTML = updatedPartial.innerHTML;
      _this3.partial.dataset.searchResultsCount = updatedPartial.dataset.searchResultsCount;
      (_this3$animateSearch = _this3.animateSearch) === null || _this3$animateSearch === void 0 ? void 0 : _this3$animateSearch.updateContents();
      if (!_this3.paginated && _this3.infiniteScrollTrigger) {
        _this3.infiniteScrollTrigger.innerHTML = "";
        _this3._initInfiniteScroll();
      }
      r$1("filters:render-filters", {
        doc: doc
      });
      _this3.filterDrawer && _this3.filterDrawer.renderFilters(doc);
      _this3.filterTopBar && _this3.filterTopBar.renderFilters(doc);
      _this3.productItem && _this3.productItem.unload();
      _this3.productItem = ProductItem(_this3.container);
      _this3.paginationItemCount = n$2(selectors.paginationItemCount, _this3.container);
      i$1(loading, classes.active);
      r$1("collection:updated");
    });
  },
  _updateURLHash: function _updateURLHash(searchParams) {
    history.pushState({
      searchParams: searchParams
    }, "", "".concat(window.location.pathname).concat(searchParams && "?".concat(searchParams)));
  },
  onUnload: function onUnload() {
    var _this$animateSearch, _this$animateSearchBa;
    this.infiniteScroll && this.infiniteScroll.destroy();
    this.filterHandler && this.filterHandler.unload();
    this.filterDrawer && this.filterDrawer.unload();
    this.filterTopBar && this.filterTopBar.unload();
    this.filtering && this.filtering.unload();
    this.productItem && this.productItem.unload();
    (_this$animateSearch = this.animateSearch) === null || _this$animateSearch === void 0 ? void 0 : _this$animateSearch.destroy();
    (_this$animateSearchBa = this.animateSearchBanner) === null || _this$animateSearchBa === void 0 ? void 0 : _this$animateSearchBa.destroy();
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
  }
});

register("contact", {
  onLoad: function onLoad() {
    this.accordions = Accordions(t$2(".accordion", this.container));
    wrapIframes(t$2("iframe", this.container));
    wrapTables(t$2("table", this.container));
  },
  onUnload: function onUnload() {
    this.accordions.unload();
  }
});

register("blog", {
  onLoad: function onLoad() {
    var mobileNavSelect = n$2("#blog-mobile-nav", this.container);
    if (mobileNavSelect) {
      this.mobileNavSelectEvent = e$2(mobileNavSelect, "change", function () {
        window.location.href = mobileNavSelect.value;
      });
    }
    if (shouldAnimate(this.container)) {
      this.animateBlog = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateBlog;
    (_this$animateBlog = this.animateBlog) === null || _this$animateBlog === void 0 ? void 0 : _this$animateBlog.destroy();
    this.mobileNavSelectEvent && this.mobileNavSelectEvent.unsubscribe();
  }
});

register("collection-banner", {
  onLoad: function onLoad() {
    this.events = [];
    this.truncateWrapper = truncateWrapper(this.container);
    if (shouldAnimate(this.container)) {
      this.animateCollectionBanner = animateCollectionBanner(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$truncateWrapper, _this$animateCollecti, _this$ro;
    this.events.forEach(function (unsubscribe) {
      return unsubscribe();
    });
    (_this$truncateWrapper = this.truncateWrapper) === null || _this$truncateWrapper === void 0 ? void 0 : _this$truncateWrapper.unload();
    (_this$animateCollecti = this.animateCollectionBanner) === null || _this$animateCollecti === void 0 ? void 0 : _this$animateCollecti.destroy();
    (_this$ro = this.ro) === null || _this$ro === void 0 ? void 0 : _this$ro.disconnect();
  }
});

register("list-collections", {
  onLoad: function onLoad() {
    if (shouldAnimate(this.container)) {
      this.animateListCollections = animateStandard(this.container);
    }
  },
  onUnload: function onUnload() {
    var _this$animateListColl;
    (_this$animateListColl = this.animateListCollections) === null || _this$animateListColl === void 0 ? void 0 : _this$animateListColl.destroy();
  }
});

var _window$Shopify;

// eslint-disable-next-line no-prototype-builtins
if (!HTMLElement.prototype.hasOwnProperty("inert")) {
  import(flu.chunks.polyfillInert);
}

// Detect theme editor
if (window.Shopify.designMode === true) {
  u$1(document.documentElement, "theme-editor");
  document.documentElement.classList.add("theme-editor");
} else {
  var el = n$2(".theme-editor-scroll-offset", document);
  el && el.parentNode.removeChild(el);
}

// Function to load all sections
var loadSections = function loadSections() {
  load("*");
  o$1({
    SelectedProductSection: null
  });
};

// Call above function either immediately or bind on loaded event
if (document.readyState === "complete" || document.readyState === "interactive") {
  loadSections();
} else {
  e$2(document, "DOMContentLoaded", loadSections);
}
if (isMobile$1({
  tablet: true,
  featureDetect: true
})) {
  u$1(document.body, "is-mobile");
}

// Page transitions
pageTransition();

// a11y tab handler
handleTab();

// Apply contrast classes
sectionClasses();

// Load productlightbox
productLightbox();

// widthWatch breakpoint emmiter
widthWatcher();

// Product quick view/add modal
var quickProductModalElement = n$2("[data-quick-product-modal]", document);
if (quickProductModalElement) {
  quickProductModal(quickProductModalElement);
}

// Load quick add modal
// Removing until quick add modal can be fleshed out.
// const quickAddHasVariants = qs(
//   ".product-item__quick-add-wrapper[data-has-variants]",
//   document
// );

// if (quickAddHasVariants) {
//   initQuickAddFilters();
//   initQuickAddModalCounts();
// }

// Setup modal
var modalElement = n$2("[data-modal]", document);
modal(modalElement);
var flashModal = n$2("[data-flash-alert]", document);
flashAlertModal(flashModal);

// Product availabilty drawer
var availabilityDrawer = n$2("[data-store-availability-drawer]", document);
storeAvailabilityDrawer(availabilityDrawer);

// Setup header overlay
var headerOverlayContainer = document.querySelector("[data-header-overlay]");
headerOverlay(headerOverlayContainer);

// Init back to top button
backToTop();

// Maintain a local representation of the cart accessible to JS
if (!window.theme.cartData) {
  cart.get().then(function (cartData) {
    window.theme.cartData = cartData;
  });
}
c("cart:updated", function (responseData) {
  window.theme.cartData = responseData.cart;
});

// Make it easy to see exactly what theme version
// this is by commit SHA
window.SHA = "809551887c";
if (!sessionStorage.getItem("flu_stat_recorded") && !((_window$Shopify = window.Shopify) !== null && _window$Shopify !== void 0 && _window$Shopify.designMode)) {
  var _window$Shopify2, _window$Shopify3;
  // eslint-disable-next-line no-process-env
  fetch("https://stats.fluorescent.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(_objectSpread2$1(_objectSpread2$1({}, window.theme.coreData), {}, {
      s: (_window$Shopify2 = window.Shopify) === null || _window$Shopify2 === void 0 ? void 0 : _window$Shopify2.shop,
      r: (_window$Shopify3 = window.Shopify) === null || _window$Shopify3 === void 0 || (_window$Shopify3 = _window$Shopify3.theme) === null || _window$Shopify3 === void 0 ? void 0 : _window$Shopify3.role
    }))
  });
  if (window.sessionStorage) {
    sessionStorage.setItem("flu_stat_recorded", "true");
  }
}
