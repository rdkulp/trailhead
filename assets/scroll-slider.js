import { a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, h as _wrapNativeSuper } from './_rollupPluginBabelHelpers-18ddf178.js';
import { e } from './fluorescent-dom.es-0c4d37e6.js';

var dispatchCustomEvent = function dispatchCustomEvent(eventName) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var detail = {
    detail: data
  };
  var event = new CustomEvent(eventName, data ? detail : null);
  document.dispatchEvent(event);
};

var MOVE_DELTA_REQUIRED_TO_PREVENT_CLICK = 2;
var ScrollSlider = /*#__PURE__*/function (_HTMLElement) {
  _inherits(ScrollSlider, _HTMLElement);
  var _super = _createSuper(ScrollSlider);
  function ScrollSlider() {
    var _this;
    _classCallCheck(this, ScrollSlider);
    _this = _super.call(this);
    _this.strings = window.theme.strings;
    _this.selectors = {
      slider: ".scroll-slider__slider",
      slide: ".scroll-slider__slider > *",
      pageDots: "[data-scroll-slider-page-dots]",
      dot: "[data-scroll-slider-page-dot]",
      prevButton: "[data-scroll-slider-prev-button]",
      nextButton: "[data-scroll-slider-next-button]",
      counterWrapper: ".scroll-slider__counter",
      currentCounter: ".scroll-slider__counter--current",
      totalCounter: ".scroll-slider__counter--total"
    };
    _this.classes = {
      dot: "scroll-slider-page-dot",
      dotVisible: "is-selected",
      hidden: "hidden",
      mouseDown: "mouse-down",
      freeScroll: "free-scroll-mode",
      dragging: "dragging"
    };
    return _this;
  }
  _createClass(ScrollSlider, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.initSlider();
    }
  }, {
    key: "initSlider",
    value: function initSlider() {
      var _this2 = this;
      this.slider = this.querySelector(this.selectors.slider);
      if (!this.slider) return;
      this.sliderItems = this.querySelectorAll(this.selectors.slide);
      if (!this.sliderItems.length) return;
      var sliderParent = this.parentElement;
      var _this$dataset = this.dataset,
        id = _this$dataset.id,
        navigationContainer = _this$dataset.navigationContainer,
        autoplay = _this$dataset.autoplay,
        autoplayDelay = _this$dataset.autoplayDelay,
        autoplayPauseOnHover = _this$dataset.autoplayPauseOnHover,
        isSlideshow = _this$dataset.isSlideshow;
      this.initialized = false;
      this.pageDotEvents = [];
      this.events = [];
      this.id = id;
      this.isSlideshow = isSlideshow === "true";
      this.autoplayDelay = parseInt(autoplayDelay, 10);
      this.shouldAutoplay = autoplay === "true";
      this.shouldPauseOnHover = autoplayPauseOnHover === "true";
      this.hasBorderedGrid = sliderParent.dataset.gridStyle === "bordered_grid";
      this.slider.dataset.slideCount = this.sliderItems.length;
      this.userIsOnTouchScreen = function () {
        return window.matchMedia("(pointer: coarse)").matches;
      };

      // Note this will fail if a class is passed that
      // cannot be found. Fallback should not exist.
      var navigationWrapper = navigationContainer ? this.closest(navigationContainer) : this;
      this.pageDotsElement = navigationWrapper.querySelector(this.selectors.pageDots);
      this.counterWrapper = navigationWrapper.querySelector(this.selectors.counterWrapper);
      this.currentPageElement = navigationWrapper.querySelector(this.selectors.currentCounter);
      this.pageTotalElement = navigationWrapper.querySelector(this.selectors.totalCounter);
      this.prevButton = navigationWrapper.querySelector(this.selectors.prevButton);
      this.nextButton = navigationWrapper.querySelector(this.selectors.nextButton);
      this.initEvents();
      var resizeObserver = new ResizeObserver(function () {
        return _this2.initScroller();
      });
      resizeObserver.observe(this.slider);
      if (!this.userIsOnTouchScreen()) this.initDragScroll();
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      var _this3 = this;
      this.events = [e(this.slider, "scroll", function () {
        return _this3.handleScrollPositionChange();
      }), e(document, "scroll-slider-".concat(this.id, ":go-to-slide"), function (event) {
        _this3.scrollTo(event.detail.slideIndex * _this3.sliderWidth + _this3.gapWidth * (event.detail.slideIndex - 1), event.detail.behavior);
      })];
      if (this.prevButton) {
        this.events.push(e(this.prevButton, "click", function (e) {
          return _this3.onButtonClick(e);
        }));
      }
      if (this.nextButton) {
        this.events.push(e(this.nextButton, "click", function (e) {
          return _this3.onButtonClick(e);
        }));
      }
    }
  }, {
    key: "setInitialSlide",
    value: function setInitialSlide() {
      this.initialSlide = null;
      for (var i = 0; i < this.sliderItems.length; i++) {
        var slide = this.sliderItems[i];
        if (slide.getAttribute("data-initial-slide") !== null) {
          this.initialSlide = slide;
          break;
        }
      }
      if (this.initialSlide) {
        dispatchCustomEvent("scroll-slider-".concat(this.id, ":go-to-slide"), {
          slideIndex: this.initialSlide.dataset.slideIndex,
          behavior: "instant"
        });
      }
    }

    // CustomeElement lifecycle method
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _this$events;
      (_this$events = this.events) === null || _this$events === void 0 ? void 0 : _this$events.forEach(function (unsubscribe) {
        return unsubscribe();
      });
    }
  }, {
    key: "initDragScroll",
    value: function initDragScroll() {
      this.mouseIsDown = false;
      this.mouseStartPositionX = null;
      this.scrolledLeft = 0;
      this.events.push(e(this.slider, "mousedown", this.handleDragScrollMouseDown.bind(this)), e(this.slider, "mouseleave", this.handleDragScrollMouseLeave.bind(this)), e(this.slider, "mouseup", this.handleDragScrollMouseUp.bind(this)), e(this.slider, "mousemove", this.handleDragScrollMouseMove.bind(this)));
    }
  }, {
    key: "handleDragScrollMouseDown",
    value: function handleDragScrollMouseDown(event) {
      if (!this.contentsAreScrollable) {
        return;
      }
      this.mouseIsDown = true;
      this.slider.classList.add(this.classes.mouseDown);
      this.mouseStartPositionX = event.pageX - this.slider.offsetLeft;
      this.scrolledLeft = this.slider.scrollLeft;
    }
  }, {
    key: "handleDragScrollMouseLeave",
    value: function handleDragScrollMouseLeave() {
      if (this.shouldPauseOnHover && this.shouldAutoplay) {
        var _this$autoplay;
        (_this$autoplay = this.autoplay) === null || _this$autoplay === void 0 ? void 0 : _this$autoplay.resume();
        this.handleDragMouseOut();
        return;
      }
      if (this.mouseIsDown) return;
      this.handleDragMouseOut();
    }
  }, {
    key: "handleDragScrollMouseUp",
    value: function handleDragScrollMouseUp() {
      this.slider.classList.remove(this.classes.dragging);
      this.mouseIsDown = false;
      this.slider.classList.remove(this.classes.mouseDown);
    }
  }, {
    key: "handleDragScrollMouseMove",
    value: function handleDragScrollMouseMove(event) {
      if (!this.mouseIsDown) return;
      event.preventDefault();
      var mouseCurrentPositionX = event.pageX - this.slider.offsetLeft;
      var mouseDownToUpPositionDelta = Math.abs(mouseCurrentPositionX - this.mouseStartPositionX);
      if (mouseDownToUpPositionDelta >= MOVE_DELTA_REQUIRED_TO_PREVENT_CLICK) {
        this.slider.classList.add(this.classes.dragging);
      }
      if (this.isSlideshow) return;
      this.handleDrag(mouseCurrentPositionX);
    }
  }, {
    key: "initScroller",
    value: function initScroller() {
      var previousTotalPageCount = this.totalPages;
      this.sliderItemsToShow = Array.from(this.sliderItems).filter(function (element) {
        return element.clientWidth > 0;
      });
      this.contentsAreScrollable = this.slider.scrollWidth > this.slider.offsetWidth;
      this.dataset.contentsAreScrollable = this.contentsAreScrollable;

      // Sliders may be hidden at different breakpoints
      if (!this.sliderItemsToShow.length) return;
      this.sliderStyles = getComputedStyle(this.slider);
      this.styles = getComputedStyle(this);
      this.gapWidth = parseFloat(this.sliderStyles.getPropertyValue("gap"));
      this.fullWidthPaddingOffset = parseFloat(this.sliderStyles.getPropertyValue("padding-left"));
      this.columns = this.styles.getPropertyValue("--scroll-columns");
      this.visibleColumns = this.columns - 1;

      // The slider width can be pulled to the edge of the screen to create
      // the illusion of overflow. this is done with padding and negative
      // margins. Adjusting for the padding will always display the intended
      // view area without overflow of the slider.
      this.sliderWidth = this.getBoundingClientRect().width - this.fullWidthPaddingOffset;
      this.slideWidth = this.sliderItemsToShow[0].getBoundingClientRect().width;

      // The width of a slide is equal to the actual width plus the adjusted
      // amount of gaps - 1. This pattern matches the same that is used within
      // the css.
      this.slideWidthWithGap = this.slideWidth + this.gapWidth * this.visibleColumns / this.columns;

      // The last slide showing on the page includes the gap to
      // the next slide which we're offsetting with css.
      this.slidesPerPage = Math.floor(this.sliderWidth / this.slideWidthWithGap);
      this.totalPages = Math.ceil(this.sliderItemsToShow.length / this.slidesPerPage);
      if (this.pageDotsElement && previousTotalPageCount !== this.totalPages) {
        this.initPageDots();
      }

      // Due to potential race conditions between sections and internal components
      // initializing at different times, some sections must wait for full initialization.
      if (!this.initialized) {
        document.dispatchEvent(new CustomEvent("scroll-slider-".concat(this.id, ":initialized"), {}));
        this.initialized = true;
        this.setInitialSlide();
      }
      this.handleScrollPositionChange();
    }
  }, {
    key: "initPageDots",
    value: function initPageDots() {
      var _this4 = this;
      // Reset page dots
      this.pageDotEvents.forEach(function (unsubscribe) {
        return unsubscribe();
      });
      this.pageDotEvents = [];
      this.pageDotsElement.innerHTML = "";
      this.dots = null;
      for (var index = 0; index < this.totalPages; index++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("class", this.classes.dot);
        dot.setAttribute("data-scroll-slider-page-dot", "");
        dot.setAttribute("data-go-to", index);
        dot.setAttribute("aria-label", this.strings.accessibility.carousel_select.replace("{{ number }}", index + 1));
        this.pageDotEvents.push(e(dot, "click", function (e) {
          return _this4.onDotClick(e);
        }));
        this.pageDotsElement.appendChild(dot);
      }
      this.dots = this.pageDotsElement.querySelectorAll(this.selectors.dot);
    }
  }, {
    key: "handleScrollPositionChange",
    value: function handleScrollPositionChange() {
      var _this5 = this;
      var previousPage = this.currentPage;
      this.currentPage = Math.floor(this.slider.scrollLeft / (this.slideWidthWithGap * this.slidesPerPage)) + 1;

      // Because the slider counts the number of visible
      // slides per page. The final scroll can potentially not
      // update correctly if it is showing a number of slides
      // less than the slides per page. We need to adjust for this.
      if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1], this.fullWidthPaddingOffset) && this.currentPage !== this.totalPages && !this.isSlideshow) {
        ++this.currentPage;
      }

      // Update page count
      if (this.counterWrapper) {
        if (this.totalPages === 1) {
          this.counterWrapper.classList.add(this.classes.hidden);
        } else {
          this.counterWrapper.classList.remove(this.classes.hidden);
          this.currentPageElement.textContent = this.currentPage;
          this.pageTotalElement.textContent = this.totalPages;
        }
      }

      // Update page dots
      if (this.pageDotsElement) {
        this.pageDotsElement.classList.remove(this.classes.hidden);
        this.dots.forEach(function (dot) {
          return dot.classList.remove(_this5.classes.dotVisible);
        });
        this.dots[this.currentPage - 1].classList.add(this.classes.dotVisible);
        if (this.totalPages === 1) {
          this.pageDotsElement.classList.add(this.classes.hidden);
        }
      }
      if (this.currentPage != previousPage) {
        document.dispatchEvent(new CustomEvent("scroll-slider-".concat(this.id, ":slide-changed"), {
          detail: {
            currentPage: this.currentPage,
            currentElement: this.sliderItemsToShow[this.currentPage - 1]
          }
        }));
      }

      // If is slideshow, buttons should never disable (looping behaviour)
      if (this.isSlideshow) return;
      if (this.nextButton && this.prevButton) {
        // Hide the buttons if there's only 1 page
        if (this.totalPages === 1) {
          this.prevButton.classList.add(this.classes.hidden);
          this.nextButton.classList.add(this.classes.hidden);
        } else {
          this.prevButton.classList.remove(this.classes.hidden);
          this.nextButton.classList.remove(this.classes.hidden);
        }
        if (this.isSlideVisible(this.sliderItemsToShow[0]) && this.slider.scrollLeft <= 0) {
          this.prevButton.setAttribute("disabled", "disabled");
        } else {
          this.prevButton.removeAttribute("disabled");
        }
        if (this.isSlideVisible(this.sliderItemsToShow[this.sliderItemsToShow.length - 1])) {
          this.nextButton.setAttribute("disabled", "disabled");
        } else {
          this.nextButton.removeAttribute("disabled");
        }
      }
    }
  }, {
    key: "isSlideVisible",
    value: function isSlideVisible(element) {
      var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var elOffsetLeft = element.offsetLeft;
      var sliderScrollLeft = this.slider.scrollLeft;

      // Account for the padding/negative margin that's used for the bordered grid display
      if (this.hasBorderedGrid) {
        offset += 1;
      }
      var lastVisibleSlidePosition = Math.floor(this.sliderWidth + sliderScrollLeft + offset);
      var scrollPosition = Math.floor(elOffsetLeft + element.getBoundingClientRect().width);
      return scrollPosition <= lastVisibleSlidePosition || scrollPosition % lastVisibleSlidePosition === 1 && elOffsetLeft >= sliderScrollLeft;
    }

    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "userIsTabbing",
    value: function userIsTabbing() {
      return document.body.classList.contains("user-is-tabbing");
    }
  }, {
    key: "onDotClick",
    value: function onDotClick(event) {
      event.preventDefault();
      var scrollBehavior = this.isSlideshow ? "instant" : "smooth";
      var goTo = event.target.dataset.goTo;
      this.scrollTo(goTo * this.slideWidthWithGap * this.slidesPerPage, scrollBehavior);
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      event.preventDefault();
      var scrollBehavior = this.isSlideshow ? "instant" : "smooth";
      var amountToScroll = this.slidesPerPage * this.slideWidthWithGap;
      var destinationPosition = event.currentTarget.name === "next" ? this.slider.scrollLeft + amountToScroll : this.slider.scrollLeft - amountToScroll;

      // TODO: this needs to check for max scroll amount, and also looping
      this.scrollTo(destinationPosition, scrollBehavior);
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(mouseCurrentPositionX) {
      this.slider.classList.add(this.classes.freeScroll);
      var dragSpeedMultiplier = 1.5; // speed up drag scroll slightly

      var drag = (mouseCurrentPositionX - this.mouseStartPositionX) * dragSpeedMultiplier;
      this.slider.scrollLeft = this.scrolledLeft - drag;
    }
  }, {
    key: "handleDragMouseOut",
    value: function handleDragMouseOut() {
      this.slider.classList.remove(this.classes.dragging);
      this.mouseIsDown = false;
      this.slider.classList.remove(this.classes.mouseDown);
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(left) {
      var behavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "smooth";
      this.slider.classList.remove(this.classes.freeScroll);
      this.slideScrollPosition = left;
      this.slider.scrollTo({
        left: left,
        behavior: behavior
      });
    }
  }, {
    key: "updateSlideVisibility",
    value: function updateSlideVisibility() {
      var _this6 = this;
      this.sliderItems.forEach(function (slide, index) {
        slide.toggleAttribute("inert", index !== _this6.currentPage - 1);
      });
    }
  }]);
  return ScrollSlider;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
if (!customElements.get("scroll-slider-component")) {
  customElements.define("scroll-slider-component", ScrollSlider);
}

export { ScrollSlider as default };
