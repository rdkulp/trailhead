import { a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, i as _get, j as _getPrototypeOf } from './_rollupPluginBabelHelpers-18ddf178.js';
import { e } from './fluorescent-dom.es-0c4d37e6.js';

var ScrollSlider = customElements.get("scroll-slider-component");
if (!ScrollSlider) {
  console.error("ScrollSlider component not registered");
}
var DIRECTIONS = {
  FORWARDS: "forwards",
  BACKWARDS: "backwards"
};
var Slideshow = /*#__PURE__*/function (_ScrollSlider) {
  _inherits(Slideshow, _ScrollSlider);
  var _super = _createSuper(Slideshow);
  function Slideshow() {
    _classCallCheck(this, Slideshow);
    return _super.apply(this, arguments);
  }
  _createClass(Slideshow, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(Slideshow.prototype), "initSlider", this).call(this);
      this.autoplay = this.shouldAutoplay ? new this.PauseableInterval(this.autoAdvanceSlideshow.bind(this), this.autoplayDelay) : null;
      this.initSlideshowEvents();
    }

    // For some reason, adding this empty function prevents the slideshow from
    // breaking in the theme editor when the section gets moved.
    //
    // CustomeElement lifecycle method
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {}
  }, {
    key: "initSlideshowEvents",
    value: function initSlideshowEvents() {
      this.events.push(e(document, "scroll-slider-".concat(this.id, ":slide-changed"), this.slideChanged.bind(this)));
      if (this.shouldAutoplay) {
        this.events.push(e(document, "scroll-slider-".concat(this.id, ":play"), this.play.bind(this)), e(document, "scroll-slider-".concat(this.id, ":pause"), this.pause.bind(this)));
      }
      if (this.shouldAutoplay && this.shouldPauseOnHover) {
        this.events.push(e(this.slider, "mouseenter", this.pause.bind(this)));
      }
    }
  }, {
    key: "handleDragScrollMouseMove",
    value: function handleDragScrollMouseMove(event) {
      var _this = this;
      if (!this.mouseIsDown) return;
      this.debounce(function () {
        var mouseCurrentPositionX = event.pageX - _this.slider.offsetLeft;
        var moveThreshold = 20;
        var movedAmount = _this.mouseStartPositionX - mouseCurrentPositionX;
        if (Math.abs(movedAmount) > moveThreshold) {
          var direction = movedAmount < 0 ? DIRECTIONS.BACKWARDS : DIRECTIONS.FORWARDS;
          _this.handleDragScrollSlideChange(direction);
        }
      }, 100);
    }
  }, {
    key: "debounce",
    value: function debounce(fn, delay) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
      this.debounceTimer = setTimeout(function () {
        fn();
      }, delay);
    }
  }, {
    key: "handleDragScrollSlideChange",
    value: function handleDragScrollSlideChange(direction) {
      var nextSlideIndex;
      var currentPageNormalized = this.currentPage - 1; // Note: currentPage is not 0-based

      if (direction == DIRECTIONS.FORWARDS) {
        if (currentPageNormalized == this.sliderItems.length - 1) {
          nextSlideIndex = 0; // if at end, jump to start
        } else {
          nextSlideIndex = currentPageNormalized + 1;
        }
      } else if (direction == DIRECTIONS.BACKWARDS) {
        if (currentPageNormalized == 0) {
          nextSlideIndex = this.sliderItems.length; // if at start, jump to end
        } else {
          nextSlideIndex = currentPageNormalized - 1;
        }
      }
      var slideScrollPosition = nextSlideIndex * this.slideWidth;
      this.scrollTo(slideScrollPosition, "instant");
    }
  }, {
    key: "play",
    value: function play() {
      var _this$autoplay;
      if (this.pageDotsElement) this.pageDotsElement.dataset.isPlaying = "true";
      (_this$autoplay = this.autoplay) === null || _this$autoplay === void 0 ? void 0 : _this$autoplay.resume();
      this.slider.setAttribute("aria-live", "off");
    }
  }, {
    key: "pause",
    value: function pause() {
      var _this$autoplay2;
      if (this.pageDotsElement) this.pageDotsElement.dataset.isPlaying = "false";
      (_this$autoplay2 = this.autoplay) === null || _this$autoplay2 === void 0 ? void 0 : _this$autoplay2.pause();
      this.slider.setAttribute("aria-live", "polite");
    }
  }, {
    key: "slideChanged",
    value: function slideChanged() {
      // If autoplaying we should setup visible classes for animations and
      // handle inert for inner elements that can be focused out of frame
      if (this.isSlideshow) {
        this.updateSlideVisibility();
        if (this.shouldAutoplay) {
          if (this.autoplay.isPaused()) {
            // Pauseable timer is currently null, and the pause timer needs
            // to be reset.
            this.autoplay.pausedTimeLeft = this.autoplayDelay;
          } else {
            // Pauseable timer can be fully reset on slide change.
            this.autoplay.reset();
          }
        }
      }
    }
  }, {
    key: "autoAdvanceSlideshow",
    value: function autoAdvanceSlideshow() {
      var slideScrollPosition = this.currentPage === this.sliderItems.length ? 0 : this.slider.scrollLeft + this.slideWidth;
      this.scrollTo(slideScrollPosition, "instant");
    }

    // https://stackoverflow.com/a/11196395
  }, {
    key: "PauseableInterval",
    value: function PauseableInterval(callback, delay) {
      this.callback = callback;
      this.delay = delay;
      this.pausedTimeLeft = 0;
      this.timerIsPaused = false;
      this.timerHasPaused = false;
      this.triggerSetAt = new Date().getTime();
      this.timer = setInterval(this.callback, this.delay);
      this.reset = function () {
        this.clearTimer();
        this.pausedTimeLeft = 0;
        this.timerIsPaused = false;
        this.timerHasPaused = false;
        this.triggerSetAt = new Date().getTime();
        this.timer = setInterval(this.callback, this.delay);
      };
      this.getTimeLeft = function () {
        var now = new Date();
        var timeLeft = this.timerHasPaused ? this.pausedTimeLeft : this.delay;

        // Once a timer has been paused the remaining amount of time left
        // needs to be calculated from the paused time left.
        return timeLeft - (now - this.triggerSetAt) % this.delay;
      };
      this.pause = function () {
        this.pausedTimeLeft = this.getTimeLeft();
        this.timerIsPaused = true;
        this.timerHasPaused = true;
        this.clearTimer();
      };
      this.resume = function () {
        var _this2 = this;
        // A new trigger is set based on unpaused. PauseTimeLeft is used
        // as the setTimeout timer.
        this.triggerSetAt = new Date().getTime();
        this.timer = setTimeout(function () {
          _this2.callback();
          _this2.reset();
        }, this.pausedTimeLeft);
      };
      this.clearTimer = function () {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      };
      this.isPaused = function () {
        return this.timerIsPaused;
      };
    }
  }, {
    key: "onDotClick",
    value: function onDotClick(event) {
      if (_get(_getPrototypeOf(Slideshow.prototype), "userIsTabbing", this).call(this)) {
        var _this$autoplay3;
        (_this$autoplay3 = this.autoplay) === null || _this$autoplay3 === void 0 ? void 0 : _this$autoplay3.pause();
      }
      _get(_getPrototypeOf(Slideshow.prototype), "onDotClick", this).call(this, event);
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(event) {
      if (_get(_getPrototypeOf(Slideshow.prototype), "userIsTabbing", this).call(this)) {
        var _this$autoplay4;
        (_this$autoplay4 = this.autoplay) === null || _this$autoplay4 === void 0 ? void 0 : _this$autoplay4.pause();
      }
      _get(_getPrototypeOf(Slideshow.prototype), "onButtonClick", this).call(this, event);
    }
  }]);
  return Slideshow;
}(ScrollSlider);
if (!customElements.get("slideshow-component")) {
  customElements.define("slideshow-component", Slideshow);
}
