import { _ as _slicedToArray, a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, e as _classPrivateMethodInitSpec, f as _assertThisInitialized, g as _classPrivateMethodGet, h as _wrapNativeSuper } from './_rollupPluginBabelHelpers-18ddf178.js';
import { u as u$1 } from './fluorescent-dom.es-0c4d37e6.js';

function getMediaQuery(querySize) {
  var value = getComputedStyle(document.documentElement).getPropertyValue("--media-".concat(querySize));
  if (!value) {
    console.warn("Invalid querySize passed to getMediaQuery");
    return false;
  }
  return value;
}

var n,e,i,o,t,r,f,d,p,u=[];function w(n,a){return e=window.pageXOffset,o=window.pageYOffset,r=window.innerHeight,d=window.innerWidth,void 0===i&&(i=e),void 0===t&&(t=o),void 0===p&&(p=d),void 0===f&&(f=r),(a||o!==t||e!==i||r!==f||d!==p)&&(!function(n){for(var w=0;w<u.length;w++)u[w]({x:e,y:o,px:i,py:t,vh:r,pvh:f,vw:d,pvw:p},n);}(n),i=e,t=o,f=r,p=d),requestAnimationFrame(w)}function srraf(e){return u.indexOf(e)<0&&u.push(e),n=n||w(performance.now()),{update:function(){return w(performance.now(),!0),this},destroy:function(){u.splice(u.indexOf(e),1);}}}

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

var videoIntersectionWatcher = (function (node) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    instant: false,
    callback: false
  };
  var margin = window.matchMedia(getMediaQuery("above-720")).matches ? 200 : 100;
  var threshold = 0;
  if (!options.instant) {
    threshold = Math.min(margin / node.offsetHeight, 0.5);
  }
  var observer = new IntersectionObserver(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      visible = _ref2[0].isIntersecting;
    if (options.callback) {
      options.callback(visible);
    } else if (visible) {
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

window.theme.strings.accessibility;
var prefersReducedMotion = function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Extracts background videos from 'template's to be added to the DOM, and controls pause/play state through
 * a11y triggers and an intersection observer.
 * If two videos are enabled for desktop and mobile, update video templates by screen size.
 */
var _initResponsiveVideoTemplate = /*#__PURE__*/new WeakSet();
var _setVideoTemplate = /*#__PURE__*/new WeakSet();
var _videoA11yHandler = /*#__PURE__*/new WeakSet();
var _visibleVideoWatcher = /*#__PURE__*/new WeakSet();
var _setPlayPause = /*#__PURE__*/new WeakSet();
var BackgroundVideo = /*#__PURE__*/function (_HTMLElement) {
  _inherits(BackgroundVideo, _HTMLElement);
  var _super = _createSuper(BackgroundVideo);
  function BackgroundVideo() {
    var _this;
    _classCallCheck(this, BackgroundVideo);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _setPlayPause);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _visibleVideoWatcher);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _videoA11yHandler);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _setVideoTemplate);
    _classPrivateMethodInitSpec(_assertThisInitialized(_this), _initResponsiveVideoTemplate);
    return _this;
  }
  _createClass(BackgroundVideo, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var videoTemplate = this.querySelector("[js-background-video-template]");
      var hasVideo = this.dataset.hasVideo === "true";
      var hasMobileVideo = this.dataset.hasMobileVideo === "true";
      if (hasVideo && !hasMobileVideo) {
        _classPrivateMethodGet(this, _setVideoTemplate, _setVideoTemplate2).call(this, videoTemplate, this);
      } else if (hasVideo & hasMobileVideo) {
        var videoMobileTemplate = this.querySelector("[js-mobile-background-video-template]");
        _classPrivateMethodGet(this, _initResponsiveVideoTemplate, _initResponsiveVideoTemplate2).call(this, this, videoTemplate, videoMobileTemplate);
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      this.removeEventListener("toggle", this.handleToggle, true);
    }
  }]);
  return BackgroundVideo;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));
function _initResponsiveVideoTemplate2(container, videoTemplate, videoMobileTemplate) {
  var _this2 = this;
  var setTemplateByWidth = function setTemplateByWidth() {
    if (window.matchMedia(getMediaQuery("above-720")).matches) {
      _classPrivateMethodGet(_this2, _setVideoTemplate, _setVideoTemplate2).call(_this2, videoTemplate, container);
    } else {
      _classPrivateMethodGet(_this2, _setVideoTemplate, _setVideoTemplate2).call(_this2, videoMobileTemplate, container);
    }
  };
  setTemplateByWidth();
  atBreakpointChange(720, setTemplateByWidth);
}
function _setVideoTemplate2(videoTemplate, container) {
  var _this3 = this;
  var pauseBtn = container.querySelector("[js-video-pause-button]");
  var currentVideoContainer = container.querySelector("[js-current-background-video-container]");
  var currentVideoTemplate = videoTemplate.content.cloneNode(true);
  var currentVideoEl = currentVideoTemplate.querySelector("[data-background-video]");
  if (currentVideoEl) {
    currentVideoEl.muted = true;
  }
  currentVideoContainer.innerHTML = "";
  currentVideoContainer.appendChild(currentVideoTemplate);

  // Callback for intersectionWatcher helps leverage context from this file without needing to pass it
  var videoWatcherCallback = function videoWatcherCallback(visible) {
    return _classPrivateMethodGet(_this3, _visibleVideoWatcher, _visibleVideoWatcher2).call(_this3, currentVideoEl, pauseBtn, visible);
  };
  _classPrivateMethodGet(this, _setPlayPause, _setPlayPause2).call(this, currentVideoEl, pauseBtn, "pause");
  _classPrivateMethodGet(this, _videoA11yHandler, _videoA11yHandler2).call(this, currentVideoEl, pauseBtn);
  videoIntersectionWatcher(currentVideoEl, {
    callback: videoWatcherCallback
  });
}
function _videoA11yHandler2(video, pauseBtn) {
  var _this4 = this;
  if (!pauseBtn || !video) return;

  // Play/pause button will show when tabbing
  pauseBtn.addEventListener("click", function (e) {
    e.preventDefault();

    // Pausing via a11y tabbing is respected as priority state by the intersection observer
    if (video.paused) {
      _classPrivateMethodGet(_this4, _setPlayPause, _setPlayPause2).call(_this4, video, pauseBtn, "play");
      video.dataset.a11yPriorityPause = false;
    } else {
      _classPrivateMethodGet(_this4, _setPlayPause, _setPlayPause2).call(_this4, video, pauseBtn, "pause");
      video.dataset.a11yPriorityPause = true;
    }
  });
}
function _visibleVideoWatcher2(video, pauseBtn, visible) {
  // Prioritize browser and device settings
  if (prefersReducedMotion()) {
    return;
  }
  if (visible && video.paused) {
    // Fade in video from poster for smooth transition, only on first entry
    if (video.dataset.videoLoaded === "false") {
      video.classList.add("background-video-fade-in");
      video.dataset.videoLoaded = "true";
    }

    // Play via intersection entry should only apply when paused state not from a11y tabbing
    if (video.dataset.a11yPriorityPause === "false") {
      _classPrivateMethodGet(this, _setPlayPause, _setPlayPause2).call(this, video, pauseBtn, "play");
    }
  }
  if (!visible && !video.paused) {
    _classPrivateMethodGet(this, _setPlayPause, _setPlayPause2).call(this, video, pauseBtn, "pause");
  }
}
function _setPlayPause2(video, pauseBtn, state) {
  var _window$theme = window.theme,
    strings = _window$theme.strings.accessibility,
    icons = _window$theme.icons;
  if (state === "pause") {
    video.pause();
    if (pauseBtn.dataset.pauseButtonContent === "icon") {
      pauseBtn.innerHTML = icons.play;
    } else {
      pauseBtn.innerText = strings.play_video;
    }
  } else {
    video.play();
    if (pauseBtn.dataset.pauseButtonContent === "icon") {
      pauseBtn.innerHTML = icons.pause;
    } else {
      pauseBtn.innerText = strings.pause_video;
    }
  }
}
if (!customElements.get("background-video")) {
  customElements.define("background-video", BackgroundVideo);
}
