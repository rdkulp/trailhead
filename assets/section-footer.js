import { a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, h as _wrapNativeSuper } from './_rollupPluginBabelHelpers-18ddf178.js';

var SectionFooter = /*#__PURE__*/function (_HTMLElement) {
  _inherits(SectionFooter, _HTMLElement);
  var _super = _createSuper(SectionFooter);
  function SectionFooter() {
    var _this;
    _classCallCheck(this, SectionFooter);
    _this = _super.call(this);
    _this.countChildren();
    return _this;
  }
  _createClass(SectionFooter, [{
    key: "countChildren",
    value: function countChildren() {
      var children = this.querySelectorAll(":scope > *");
      var counts = {
        above720: 0,
        below720: 0
      };
      children.forEach(function (child) {
        if (child.className.includes("hidden")) return; // If hidden class present, it is not visible at any size

        if (child.getAttribute("data-hide-below-720") !== "true") {
          counts.below720++;
        }
        counts.above720++;
      });
      this.setAttribute("data-children-visible-above-720", counts.above720);
      this.setAttribute("data-children-visible-below-720", counts.below720);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.observer = new MutationObserver(this.countChildren.bind(this));
      this.observer.observe(this, {
        childList: true,
        subtree: true
      });
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.observer.disconnect();
    }
  }]);
  return SectionFooter;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
if (!customElements.get("section-footer-component")) {
  customElements.define("section-footer-component", SectionFooter);
}

export { SectionFooter as default };
