(function () {
  'use strict';

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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var injectCSS = true;
  var filter = [].filter;
  var patched = new WeakMap();

  var computed = function computed(self) {
    var defaultView = self.ownerDocument.defaultView;
    return defaultView.getComputedStyle(self);
  };

  var listener = function listener(method, self) {
    var defaultView = self.ownerDocument.defaultView;
    defaultView[method + 'EventListener']('resize', patched.get(self));
  };

  var notColumnEnd = function notColumnEnd(child) {
    return computed(child).gridColumnEnd != -1;
  };

  var setProperty = function setProperty(self, property, value) {
    if (value != null) {
      var gap = typeof value === 'number' ? value + 'px' : value;
      self.style.setProperty(property, gap);
    } else self.style.removeProperty(property);

    if (patched.has(self)) patched.get(self)();
  };

  customElements.define('masonry-rows', /*#__PURE__*/function (_HTMLElement) {
    _inherits(_class, _HTMLElement);

    var _super = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super.apply(this, arguments);
    }

    _createClass(_class, [{
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(name, _, value) {
        this[name === 'gap' ? name : 'minWidth'] = value;
      }
    }, {
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;

        var ownerDocument = this.ownerDocument;

        if (injectCSS) {
          injectCSS = false;
          ownerDocument.head.appendChild(ownerDocument.createElement('style')).textContent = "@supports (display: grid) {\n        masonry-rows, .masonry-rows {\n          --gap: .5em;\n          --min-width: 20em;\n          --width: minmax(min(var(--min-width), 100%), 1fr);\n          box-sizing: inherit;\n          margin: 0;\n          display: grid;\n          grid-template-columns: repeat(auto-fit, var(--width));\n          grid-template-rows: masonry;\n          justify-content: center;\n          grid-gap: var(--gap);\n          padding: var(--gap);\n        }\n        masonry-rows > *, .masonry-rows > * { align-self: start }\n      }";
        }

        var addListener = patched.has(this);

        var _computed = computed(this),
            display = _computed.display,
            gridTemplateRows = _computed.gridTemplateRows;

        if (!addListener && display === 'grid' && gridTemplateRows !== 'masonry') {
          addListener = !addListener;
          patched.set(this, function () {
            var mod = false;

            var _computed2 = computed(_this),
                gridRowGap = _computed2.gridRowGap,
                gridTemplateColumns = _computed2.gridTemplateColumns;

            var columns = gridTemplateColumns.split(/\s+/).length;
            var items = _this.items,
                length = items.length;

            for (var i = 0; i < length; i++) {
              var child = items[i];

              var _child$getBoundingCli = child.getBoundingClientRect(),
                  height = _child$getBoundingCli.height;

              if (height != child.dataset.height) {
                child.dataset.height = height;
                mod = true;
              }
            }

            if (mod || _this.dataset.columns != columns) {
              _this.dataset.columns = columns;

              for (var _i = 0; _i < length; _i++) {
                items[_i].style.removeProperty('margin-top');
              }

              if (1 < columns) {
                var gap = parseFloat(gridRowGap);

                for (var _i2 = columns; _i2 < length; _i2++) {
                  var _items$getBoundingCli = items[_i2 - columns].getBoundingClientRect(),
                      bottom = _items$getBoundingCli.bottom;

                  var _items$_i2$getBoundin = items[_i2].getBoundingClientRect(),
                      top = _items$_i2$getBoundin.top;

                  items[_i2].style.marginTop = bottom + gap - top + 'px';
                }
              }
            }
          });
          new MutationObserver(patched.get(this)).observe(this, {
            subtree: true,
            childList: true
          });
        }

        if (addListener) {
          listener('add', this);
          patched.get(this)();
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        if (patched.has(this)) listener('remove', this);
      }
    }, {
      key: "gap",
      get: function get() {
        return this.style.getPropertyValue('--gap') || '.5em';
      },
      set: function set(value) {
        setProperty(this, '--gap', value);
      }
    }, {
      key: "items",
      get: function get() {
        return filter.call(this.children, notColumnEnd);
      }
    }, {
      key: "minWidth",
      get: function get() {
        return this.style.getPropertyValue('--min-width') || '20em';
      },
      set: function set(value) {
        setProperty(this, '--min-width', value);
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        return ['gap', 'min-width'];
      }
    }]);

    return _class;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));

}());
