// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
// 获取html。这个函数的原理：通过CSS选择器找到html
var html = document.querySelector('#html');
var style = document.querySelector('#style'); // 加/* 的原因：因为在style.innerHTML = string.substring(0, n);这行代码时，是加CSS样式，中文会对样式产生影响，所以要给中文加上CSS的注释符号

var string = "/* \u4F60\u597D\uFF0C\u6211\u662F\u732B\n * \u63A5\u4E0B\u6765\u6211\u6F14\u793A\u4E00\u4E0B\u6211\u7684\u524D\u7AEF\u529F\u5E95\n * \u9996\u5148\u6211\u8981\u51C6\u5907\u4E00\u4E2Adiv\n*/\n#div1 {\n    border: 1px solid red;\n    width: 200px;\n    height: 200px;\n}\n/* \u63A5\u4E0B\u6765\u6211\u8981\u628Adiv\u53D8\u6210\u4E00\u4E2A\u516B\u5366\u56FE\n * \u6CE8\u610F\u770B\u597D\u4E86\n * \u9996\u5148\u7B2C\u4E00\u6B65\uFF0C\u628Adiv\u53D8\u6210\u4E00\u4E2A\u5706\n*/\n#div1 {\n    border-radius: 50%;\n    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);\n    border: none\n}\n/* \u7B2C\u4E8C\u6B65\uFF1A\u6DFB\u52A0\u6E10\u53D8\u8272\n * \u641C\u7D22CSS Gradient\uFF0C\u627E\u5230\u767D\u8272\u6E10\u53D8\u4E3A\u9ED1\u8272\u7684\u4F4D\u7F6E\n * \u590D\u5236\u7B2C\u4E8C\u884C\u751F\u6210\u7684\u4EE3\u7801\uFF08\u7B2C\u4E00\u884C\u6CA1\u7528\uFF09\n*/\n#div1 {\n    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);\n}\n/* \u52A0\u4E24\u4E2A\u98CE\u706B\u8F6E */\n#div1::before {\n    width: 100px;\n    height: 100px;\n    /* \u6709\u5B9A\u4F4D\u6700\u597D\u5199\u4E0Atop\u548Cleft\uFF0C\u4E0D\u7136\u6613\u51FAbug\u3002 \n     * left\u548Ctransform\u642D\u914D\uFF0C\u53EF\u4EE5\u7528\u6765\u5143\u7D20\u5C45\u4E2D\n     */\n    top: 0;\n    left: 50%;\n    transform: translateX(-50%);\n    /* \u516B\u5366\u56FE\u8FD8\u67092\u4E2A\u5C0F\u5706\uFF0C\u4F46\u4F2A\u5143\u7D20\u4E0D\u80FD\u5957\u4F2A\u5143\u7D20\uFF0C\u6240\u4EE5\u4ECD\u7136\u53EF\u4EE5\u7528\u6E10\u53D8\u6765\u89E3\u51B3 */\n    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 100%);\n    border-radius: 50%;\n}\n#div1::after {\n    width: 100px;\n    height: 100px;\n    bottom: 0;\n    left: 50%;\n    transform: translateX(-50%);\n    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);\n    border-radius: 50%;\n}\n";
var n = 0;
var string2 = ''; // string是保存要显示的全部文字，而string2是对每次要显示的字进行缓存
// 注意setTimeout和setInterval的区别。这里使用setInterval，因为可以每隔3秒都执行一次，而setTimeout只执行一次就不执行了。
// 3秒钟后，n变为n+1。 parcel在3秒后会自动把文本变为n+1，而不需要重新刷新网页，这是parcel的优点
// 新手写法
// setInterval(() => {
//     n = n + 1;
//     html.innerHTML = n;
// }, 1000)
// 拓展：老手不用setInterval，而是用递归的setTimeout

var step = function step() {
  setTimeout(function () {
    // 如果字符是换行，JS里会自动将换行变为空格---如果对这个有疑问可以console.log一下string的每个字符，会发现有换行在，此时要把JS里的换行改为html的<br>换行标签
    // 如果不是换行，就直接从string那里抄过来，加到string2中
    // 完整写法：
    if (string[n] === "\n") {
      string2 += "<br>";
    } else if (string[n] === " ") {
      string2 += "&nbsp;"; // &nbsp是html中的空格
    } else {
      string2 += string[n];
    } // 下面这个是简便写法：(没有判断缩进)
    // string2 += (string[n] === "\n" ? "<br>" : string[n])


    html.innerHTML = string2;
    style.innerHTML = string.substring(0, n); // 页面代码太长，设置页面自动往下滚动——上下方向

    window.scrollTo(0, 99999); // 这是设置的PC端口自动滚动

    html.scrollTo(0, 99999); // 这是设置的手机端口自动滚动

    if (n < string.length - 1) {
      n += 1; // step()这个目的是为了让每次执行的结果保留下来，索引值0变1,1变2,2变3,3变4...

      step();
    }
  }, 0);
};

step();
},{}],"../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62584" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map