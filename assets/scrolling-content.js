import { a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, h as _wrapNativeSuper } from './_rollupPluginBabelHelpers-18ddf178.js';

var ScrollingContent = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ScrollingContent, _HTMLElement);
  var _super = _createSuper(ScrollingContent);
  function ScrollingContent() {
    var _this;
    _classCallCheck(this, ScrollingContent);
    _this = _super.call(this);
    _this.prefersReducedMotion = document.documentElement.classList.contains("prefers-reduced-motion");
    return _this;
  }
  _createClass(ScrollingContent, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;
      if (this.prefersReducedMotion) return;
      var marquee = this.querySelector("[js-marquee]");
      var content = this.querySelector("[js-marquee-content]");
      var clonedContent = this.tabProofClonedContent(content.cloneNode(true));
      var contentWidth = content.offsetWidth;
      if (contentWidth === 0) return;
      this.ro = new ResizeObserver(function () {
        var num = _this2.getNeededCloneCount(_this2, marquee, content);
        var animationItemCount = 1;
        for (var i = 0; i < num; i++) {
          marquee.dataset.playScrollAnimation = "false";
          var clone = clonedContent.cloneNode(true);

          // For any `animation--item` elements we should incrememnt the custom prop
          // which dictates animation staggering
          // eslint-disable-next-line no-loop-func
          clone.querySelectorAll(".animation--item").forEach(function (el) {
            el.style.setProperty("--delay-offset-multiplier", animationItemCount);
            animationItemCount++;
          });
          marquee.appendChild(clone);
        }
        requestAnimationFrame(function () {
          marquee.dataset.playScrollAnimation = "true";
        });
      });
      this.ro.observe(document.documentElement);
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this$ro;
      (_this$ro = this.ro) === null || _this$ro === void 0 ? void 0 : _this$ro.disconnect();
    }

    /**
     * Checks to see if more content clones are needed in order to keep the scroll animation seamless.
     * @param {HTMLElement} viewport - The resized element acting as the viewport
     * @param {HTMLElement} marquee - The element that must be wider than the viewport
     * @param {HTMLElement} content - The element to be repeated
     * @returns {Number} The number of content clones needed to fill the new viewport
     */
  }, {
    key: "getNeededCloneCount",
    value: function getNeededCloneCount(viewport, marquee, content) {
      return Math.ceil((viewport.offsetWidth - marquee.offsetWidth) / content.offsetWidth) + 1;
    }

    /**
     * Ensures that:
     * - Any cloned links are not tabbable
     * - Any cloned content has aria-hidden applied
     * @param {HTMLElement} clonedContent - The cloned content
     * @returns {HTMLElement} The accessible cloned content
     */
  }, {
    key: "tabProofClonedContent",
    value: function tabProofClonedContent(clonedContent) {
      var linkEls = clonedContent.querySelectorAll("a");
      linkEls.forEach(function (linkEl) {
        linkEl.setAttribute("tabindex", "-1");
      });
      clonedContent.setAttribute("aria-hidden", true);
      return clonedContent;
    }
  }]);
  return ScrollingContent;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
if (!customElements.get("scrolling-content")) {
  customElements.define("scrolling-content", ScrollingContent);
}
