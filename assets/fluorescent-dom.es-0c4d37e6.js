function c(n,t){return Array.isArray(n)?n.forEach(t):t(n)}function r(n){return function(t,r,e){return c(t,function(t){return t[n+"EventListener"](r,e)})}}function e(n,t,c){return r("add")(n,t,c),function(){return r("remove")(n,t,c)}}function o(n){return function(t){var r=arguments;return c(t,function(t){var c;return (c=t.classList)[n].apply(c,[].slice.call(r,1))})}}function u(n){o("add").apply(void 0,[n].concat([].slice.call(arguments,1)));}

export { e, u };
