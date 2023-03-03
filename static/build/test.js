// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gGCcE":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "73f52d17f2cd716b";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"4YftG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _foyerJs = require("../../map/foyer/foyer.js");
var _libraryJs = require("../../map/library/library.js");
var _basementJs = require("../../map/basement/basement.js");
var _pixiHelpersJs = require("../../helpers/pixi_helpers.js");
var _inventoryJs = require("../../core/inventory.js");
var _collisionJs = require("../../core/collision.js");
var _portalsJs = require("../../sprites/portals.js");
var _waveSystemJs = require("../../core/WaveSystem.js");
var _waveJs = require("../../core/Wave.js");
var _entitiesJs = require("../../sprites/entities.js");
var _interactableJs = require("../../sprites/interactable.js");
var _pauseMenuJs = require("../../core/pause_menu.js");
var _consumablesJs = require("../../sprites/consumables.js");
var _weaponsJs = require("../../sprites/weapons.js");
var _movementJs = require("../../core/movement.js");
var _hudJs = require("../../core/hud.js");
var _popupsJs = require("../../sprites/popups.js");
var _playerJson = require("../../../assets/sprite_sheets/player/player.json");
var _playerJsonDefault = parcelHelpers.interopDefault(_playerJson);
(0, _popupsJs.AMMO_CACHE_POPUP).anchor.set(0.5);
(0, _popupsJs.AMMO_CACHE_POPUP).x = window.innerWidth / 2;
(0, _popupsJs.AMMO_CACHE_POPUP).y = 20;
(0, _popupsJs.PORTAL_POPUP).anchor.set(0.5);
(0, _popupsJs.PORTAL_POPUP).x = window.innerWidth / 2;
(0, _popupsJs.PORTAL_POPUP).y = 20;
window.addEventListener("load", ()=>{
    const GAME = new PIXI.Application({
        resizeTo: window
    });
    const GAME_VIEW = GAME.view;
    GAME_VIEW.style.position = "absolute";
    document.body.appendChild(GAME_VIEW);
    // INITIALIZING GLOBALS
    window.timeGameStarted = new Date().getMilliseconds();
    window.GAME_PAUSED = false;
    window.playableAreaExists = false;
    window.HOTBAR = undefined;
    // INITIALIZING WAVES
    const WAVE_SYSTEM = new (0, _waveSystemJs.WaveSystem)((0, _foyerJs.FOYER), [
        new (0, _waveJs.Wave)(0, [
            1
        ], 1),
        new (0, _waveJs.Wave)(0, [
            1
        ], 1)
    ], 5);
    // PLAYER
    const player = new (0, _entitiesJs.Player)((0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/sprite_sheets/player/player.png"), 0, 0, (0, _playerJsonDefault.default).s.w, (0, _playerJsonDefault.default).s.h);
    player.addFrames((0, _playerJsonDefault.default));
    player.switchFrame("e");
    window.HOTBAR = new (0, _inventoryJs.Inventory)(player, (0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/inventory/hotbar.png"), 20, 50, (0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/inventory/selector.png"));
    const HANDGUN = new (0, _weaponsJs.Pistol)((0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/guns/handgun.png"));
    window.HOTBAR.addItem(HANDGUN);
    window.HOTBAR.addItem(new (0, _consumablesJs.BandageBox)());
    window.HOTBAR.changeSelItem(8);
    // MOVEMENT
    window.addEventListener("keyup", (event)=>{
        switch(event.key.toLowerCase()){
            case "w":
                (0, _movementJs.MOVEMENT_KEY_STATUSES).w = false;
                break;
            case "s":
                (0, _movementJs.MOVEMENT_KEY_STATUSES).s = false;
                break;
            case "a":
                (0, _movementJs.MOVEMENT_KEY_STATUSES).a = false;
                break;
            case "d":
                (0, _movementJs.MOVEMENT_KEY_STATUSES).d = false;
                break;
        }
    });
    window.addEventListener("keydown", (event)=>{
        const KEY_PRESSED = event.key.toLowerCase();
        if (KEY_PRESSED === "escape" && window.playableAreaExists === true) {
            if (window.GAME_PAUSED === false) (0, _pauseMenuJs.showPauseMenu)();
            else if (window.GAME_PAUSED) (0, _pauseMenuJs.hidePauseMenu)();
        }
        if (window.GAME_PAUSED === false) {
            const SELECTED_ITEM = window.HOTBAR.getSelItem();
            switch(KEY_PRESSED){
                case "w":
                    (0, _movementJs.MOVEMENT_KEY_STATUSES).w = true;
                    break;
                case "s":
                    (0, _movementJs.MOVEMENT_KEY_STATUSES).s = true;
                    break;
                case "a":
                    (0, _movementJs.MOVEMENT_KEY_STATUSES).a = true;
                    break;
                case "d":
                    (0, _movementJs.MOVEMENT_KEY_STATUSES).d = true;
                    break;
                case "1":
                    window.HOTBAR.changeSelItem(1);
                    break;
                case "2":
                    window.HOTBAR.changeSelItem(2);
                    break;
                case "3":
                    window.HOTBAR.changeSelItem(3);
                    break;
                case "4":
                    window.HOTBAR.changeSelItem(4);
                    break;
                case "5":
                    window.HOTBAR.changeSelItem(5);
                    break;
                case "6":
                    window.HOTBAR.changeSelItem(6);
                    break;
                case "7":
                    window.HOTBAR.changeSelItem(7);
                    break;
                case "8":
                    window.HOTBAR.changeSelItem(8);
                    break;
                case "r":
                    // manual reload
                    if (SELECTED_ITEM instanceof (0, _weaponsJs.Gun) && SELECTED_ITEM.getAmmoLoaded() !== SELECTED_ITEM.getClipCapacity() && SELECTED_ITEM.getAmmoLeft() > 0) SELECTED_ITEM.reload();
                    break;
                case " ":
                    // spacebar
                    if (SELECTED_ITEM instanceof (0, _consumablesJs.HealingItem) && player.getHealth() < 100) {
                        SELECTED_ITEM.heal(player);
                        window.HOTBAR.removeSelItem();
                    }
                    break;
                case "q":
                    const NUM_OF_PORTALS = (0, _portalsJs.PORTALS).length;
                    if (NUM_OF_PORTALS > 0) for(let i = 0; i < NUM_OF_PORTALS; i++){
                        const PORTAL = (0, _portalsJs.PORTALS)[i];
                        if (PORTAL.playerIsInsidePortal(player)) {
                            PORTAL.teleport(player);
                            WAVE_SYSTEM.updatePlayableArea(PORTAL.destination);
                            WAVE_SYSTEM.respawnBatch();
                            break;
                        }
                    }
                    break;
                case "e":
                    const NUM_OF_INTERACTABLES = (0, _interactableJs.INTERACTABLES).length;
                    for(let i = 0; i < NUM_OF_INTERACTABLES; i++){
                        const INTERACTABLE = (0, _interactableJs.INTERACTABLES)[i];
                        if (INTERACTABLE.playerIsNearInteractable(player, (0, _popupsJs.AMMO_CACHE_POPUP))) {
                            if (INTERACTABLE instanceof (0, _interactableJs.AmmoCache) && INTERACTABLE.isEmpty() === false && window.HOTBAR.getSelItem() instanceof (0, _weaponsJs.Gun)) INTERACTABLE.resupply(window.HOTBAR.getSelItem());
                        }
                    }
                    break;
            }
            (0, _movementJs.checkForCollisionsAndMovePlayer)(player);
            // rotates enemies to player
            const NUM_OF_ENTITIES = (0, _collisionJs.NON_PLAYER_ENTITIES).length;
            if (NUM_OF_ENTITIES > 0) for(let i = 0; i < NUM_OF_ENTITIES; i++)(0, _collisionJs.NON_PLAYER_ENTITIES)[i].rotateToPlayer(player);
        }
    });
    window.addEventListener("mousemove", (event)=>{
        window.mouseX = event.x;
        window.mouseY = event.y;
        if (window.GAME_PAUSED === false && (0, _movementJs.MOVEMENT_KEY_STATUSES).w === false && (0, _movementJs.MOVEMENT_KEY_STATUSES).a === false && (0, _movementJs.MOVEMENT_KEY_STATUSES).s === false && (0, _movementJs.MOVEMENT_KEY_STATUSES).d === false) player.rotateToMouse();
    });
    // INTERACTION
    window.addEventListener("contextmenu", (event)=>{
        event.preventDefault();
    });
    // MAPS
    (0, _foyerJs.FOYER).addDynamicSprite(player, "player", 250, 150);
    (0, _foyerJs.FOYER).setPosition(GAME_VIEW.width * 0.5 - (0, _foyerJs.FOYER).getHalfWidth(), GAME_VIEW.height * 0.5 - (0, _foyerJs.FOYER).getHalfHeight());
    (0, _foyerJs.FOYER).bindPlayableAreaToPortal("2f_mat", (0, _libraryJs.LIBRARY), 5, 15);
    (0, _foyerJs.FOYER).bindPlayableAreaToPortal("elevator", (0, _basementJs.BASEMENT), (0, _basementJs.BASEMENT).getHalfWidth() - 10, 0);
    (0, _libraryJs.LIBRARY).setPosition(GAME_VIEW.width * 0.5 - (0, _libraryJs.LIBRARY).getHalfWidth(), GAME_VIEW.height * 0.5 - (0, _libraryJs.LIBRARY).getHalfHeight());
    (0, _libraryJs.LIBRARY).bindPlayableAreaToPortal("2f_mat", (0, _foyerJs.FOYER), 480, 12);
    (0, _basementJs.BASEMENT).setPosition(GAME_VIEW.width * 0.5 - (0, _basementJs.BASEMENT).getHalfWidth(), GAME_VIEW.height * 0.5 - (0, _basementJs.BASEMENT).getHalfHeight());
    (0, _basementJs.BASEMENT).bindPlayableAreaToPortal("elevator", (0, _foyerJs.FOYER), 245, 0);
    GAME.stage.addChild((0, _hudJs.PLAYER_HEALTH_STATUS), (0, _hudJs.AMMO_COUNT), (0, _popupsJs.AMMO_CACHE_POPUP), (0, _popupsJs.PORTAL_POPUP), window.HOTBAR.display(), (0, _foyerJs.FOYER).load());
    GAME.ticker.add(()=>{
        if (window.GAME_PAUSED === false) {
            // WAVE_SYSTEM.playMusic();
            // spawns waves of enemies
            WAVE_SYSTEM.enemySpawnFadeIn();
            if (WAVE_SYSTEM.checkIfBatchDone()) {
                WAVE_SYSTEM.spawnNextBatch();
                WAVE_SYSTEM.moveToNextWaveIfFinished();
            }
            let isClose = false;
            //manages popups for all interactables
            //still need to make popup for when ammo cache is empty
            const NUM_OF_INTERACTABLES = (0, _interactableJs.INTERACTABLES).length;
            const POPUPS = [
                (0, _popupsJs.AMMO_CACHE_POPUP)
            ];
            for(let i = 0; i < NUM_OF_INTERACTABLES; i++){
                const INTERACTABLE = (0, _interactableJs.INTERACTABLES)[i];
                const POPUP = POPUPS[i];
                isClose = INTERACTABLE.playerIsNearInteractable(player);
                (0, _popupsJs.managePopUp)(POPUP, player, isClose);
            }
            //manages popups for all portals
            const NUM_OF_PORTALS = (0, _portalsJs.PORTALS).length;
            isClose = false;
            if (NUM_OF_PORTALS > 0) {
                for(let i = 0; i < NUM_OF_PORTALS; i++){
                    const PORTAL = (0, _portalsJs.PORTALS)[i];
                    isClose = isClose || PORTAL.playerIsInsidePortal(player); //if player is near ANY of the portals
                }
                (0, _popupsJs.managePopUp)((0, _popupsJs.PORTAL_POPUP), player, isClose);
            }
            // moves enemies
            const NUM_OF_ENTITIES = (0, _collisionJs.NON_PLAYER_ENTITIES).length;
            if (NUM_OF_ENTITIES > 0) for(let i = 0; i < NUM_OF_ENTITIES; i++)(0, _collisionJs.NON_PLAYER_ENTITIES)[i].moveToPlayer(player);
        }
    });
});

},{"../../map/foyer/foyer.js":"dhM1a","../../map/library/library.js":"bjs5C","../../map/basement/basement.js":"7XqC1","../../helpers/pixi_helpers.js":"bZOjp","../../core/inventory.js":"hc8XD","../../core/collision.js":"3zsV5","../../sprites/portals.js":"7dDrd","../../core/WaveSystem.js":"9sJQQ","../../core/Wave.js":"eNy6a","../../sprites/entities.js":"77n58","../../sprites/interactable.js":"a1CCR","../../core/pause_menu.js":"b2oXW","../../sprites/consumables.js":"kdffl","../../sprites/weapons.js":"gRu1U","../../core/movement.js":"c7kyU","../../core/hud.js":"3PEGa","../../../assets/sprite_sheets/player/player.json":"cT2YJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../../sprites/popups.js":"16erO"}],"dhM1a":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FOYER", ()=>FOYER);
var _creationJs = require("../creation.js");
var _interactableJs = require("../../sprites/interactable.js");
var _pixiHelpersJs = require("../../helpers/pixi_helpers.js");
var _portalsJs = require("../../sprites/portals.js");
var _objectsJs = require("../../sprites/objects.js");
const FOYER = function() {
    const FOYER = new (0, _creationJs.PlayableArea)(512, 400);
    FOYER.addEnemySpawnPoint(30, 250);
    FOYER.addEnemySpawnPoint(FOYER.getWidth() - 30, 250);
    FOYER.addEnemySpawnPoint(255, FOYER.getHeight() - 30);
    const FLOOR = new (0, _objectsJs.DecorationFill)(0x735848, 0, 0, 512, 400);
    FOYER.addStaticSprite(FLOOR, "floor", 0, 0);
    const BARRIER_1 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, FOYER.getWidth(), 10);
    BARRIER_1.modifyCollisionBoundary(null, null, null, -BARRIER_1.getHalfHeight());
    FOYER.addStaticSprite(BARRIER_1, "barrier1", 0, -BARRIER_1.getFillDimensions().h);
    const BARRIER_2 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, FOYER.getWidth(), 10);
    FOYER.addStaticSprite(BARRIER_2, "barrier2", 0, FOYER.getHeight());
    const BARRIER_3 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, 10, FOYER.getHeight());
    BARRIER_3.modifyCollisionBoundary(null, null, -3, null);
    FOYER.addStaticSprite(BARRIER_3, "barrier3", -BARRIER_3.getFillDimensions().w, 0);
    const BARRIER_4 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, 10, FOYER.getHeight());
    BARRIER_4.modifyCollisionBoundary(-3, null, null, null);
    FOYER.addStaticSprite(BARRIER_4, "barrier4", FOYER.getWidth(), 0);
    const DOUBLE_DOOR = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/Door1.png"), 0, 0, 96, 48);
    FOYER.addStaticSprite(DOUBLE_DOOR, "double_door", FOYER.getHalfWidth() - DOUBLE_DOOR.getHalfWidth(), -(DOUBLE_DOOR.getSpriteFrameDimensions().h + 1));
    const ELEVATOR = new (0, _portalsJs.PortalFill)(FOYER, 0xff0000, 0, 0, DOUBLE_DOOR.getSpriteFrameDimensions().w, 40);
    ELEVATOR.setAlpha(0);
    FOYER.addStaticSprite(ELEVATOR, "elevator", FOYER.getHalfWidth() - DOUBLE_DOOR.getHalfWidth(), 0);
    const WINDOW = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/window.png"), 0, 0, 105, 75);
    FOYER.addStaticSprite(WINDOW, "window", 50, -(WINDOW.getSpriteFrameDimensions().h - 5));
    const SECOND_FLOOR_MAT = new (0, _portalsJs.Portal)(FOYER, (0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/mat2.png"), 0, 0, 32, 34);
    FOYER.addStaticSprite(SECOND_FLOOR_MAT, "2f_mat", FOYER.getWidth() - (SECOND_FLOOR_MAT.getSpriteFrameDimensions().w - 10), 20);
    const WALL = new (0, _objectsJs.SemiSolidFill)(0xF5F5DC, 0, 0, 278, 60);
    const WALL_TOP_Y_REDUCTION = 15;
    WALL.modifyCollisionBoundary(null, -WALL_TOP_Y_REDUCTION, null, -20);
    // WALL BOTTOM EDGE DETOURS
    FOYER.addBottomEdgeDetour(WALL, [
        {
            x: 190,
            y: 220
        },
        {
            x: 60,
            y: 220
        },
        {
            x: 60,
            y: 30
        }
    ]);
    FOYER.addBottomEdgeDetour(WALL, [
        {
            x: 310,
            y: 220
        },
        {
            x: 455,
            y: 220
        },
        {
            x: 455,
            y: 30
        }
    ]);
    // WALL LEFT EDGE DETOURS
    FOYER.addLeftEdgeDetour(WALL, [
        {
            x: 80,
            y: 30
        },
        {
            x: 260,
            y: 30
        },
        {
            x: 440,
            y: 30
        },
        {
            x: 440,
            y: 200
        }
    ]);
    FOYER.addLeftEdgeDetour(WALL, [
        {
            x: 60,
            y: 170
        }
    ]);
    // WALL RIGHT EDGE DETOURS
    FOYER.addRightEdgeDetour(WALL, [
        {
            x: 425,
            y: 30
        },
        {
            x: 260,
            y: 30
        },
        {
            x: 60,
            y: 30
        },
        {
            x: 60,
            y: 200
        }
    ]);
    FOYER.addRightEdgeDetour(WALL, [
        {
            x: 460,
            y: 170
        }
    ]);
    // WALL TOP EDGE DETOURS
    FOYER.addTopEdgeDetour(WALL, [
        {
            x: 180,
            y: 30
        },
        {
            x: 60,
            y: 30
        },
        {
            x: 60,
            y: 200
        }
    ]);
    FOYER.addTopEdgeDetour(WALL, [
        {
            x: 330,
            y: 30
        },
        {
            x: 440,
            y: 30
        },
        {
            x: 440,
            y: 200
        }
    ]);
    FOYER.addStaticSprite(WALL, "wall", 117, 80);
    const STAIRS_1 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/stairs.png"), 0, 0, 117, 95);
    FOYER.addStaticSprite(STAIRS_1, "stairs1", 0, WALL.getLeftPosY() + WALL_TOP_Y_REDUCTION);
    const STAIRS_2 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/stairs.png"), 0, 0, 117, 95);
    FOYER.addStaticSprite(STAIRS_2, "stairs2", FOYER.getWidth() - STAIRS_2.getSpriteFrameDimensions().w, STAIRS_1.getLeftPosY());
    const RAILING_1 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_1, "railing1", STAIRS_1.getRightPosX() + 4, WALL.getLeftPosY() + WALL_TOP_Y_REDUCTION - 5 - (RAILING_1.getSpriteFrameDimensions().h - 5));
    const RAILING_2 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_2, "railing2", RAILING_1.getRightPosX(), RAILING_1.getLeftPosY());
    const RAILING_3 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_3, "railing3", RAILING_2.getRightPosX(), RAILING_2.getLeftPosY());
    const RAILING_4 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_4, "railing4", RAILING_3.getRightPosX(), RAILING_3.getLeftPosY());
    const RAILING_5 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_5, "railing5", RAILING_4.getRightPosX(), RAILING_4.getLeftPosY());
    const RAILING_6 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_6, "railing6", RAILING_5.getRightPosX(), RAILING_5.getLeftPosY());
    const RAILING_7 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_7, "railing7", RAILING_6.getRightPosX(), RAILING_6.getLeftPosY());
    const RAILING_8 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_8, "railing8", RAILING_7.getRightPosX(), RAILING_7.getLeftPosY());
    const RAILING_9 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_9, "railing9", RAILING_8.getRightPosX(), RAILING_8.getLeftPosY());
    const RAILING_10 = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/railing.png"), 0, 0, 27, 18);
    FOYER.addStaticSprite(RAILING_10, "railing10", RAILING_9.getRightPosX(), RAILING_9.getLeftPosY());
    const FIRST_FLOOR_MAT = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/mat.png"), 0, 0, 48, 96);
    FOYER.addStaticSprite(FIRST_FLOOR_MAT, "1f_mat", FOYER.getHalfWidth() - (FIRST_FLOOR_MAT.getSpriteFrameDimensions().w - 6), FOYER.getHeight() - (FIRST_FLOOR_MAT.getSpriteFrameDimensions().h + 15));
    const PLANT_1 = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/plantA.png"), 0, 0, 48, 96);
    PLANT_1.modifyCollisionBoundary(null, 50, null, null);
    FOYER.addDynamicSprite(PLANT_1, "plant1", 0, FOYER.getHeight() - (PLANT_1.getSpriteFrameDimensions().h + 5));
    const PLANT_2 = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/foyer/assets/plantA.png"), 0, 0, 48, 96);
    PLANT_2.modifyCollisionBoundary(null, 50, null, null);
    FOYER.addDynamicSprite(PLANT_2, "plant2", FOYER.getWidth() - PLANT_2.getSpriteFrameDimensions().w, FOYER.getHeight() - (PLANT_2.getSpriteFrameDimensions().h + 5));
    const AMMO_CACHE = new (0, _interactableJs.AmmoCache)((0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/consumables/ammoCache.png"), 240, 140, 50, 50);
    FOYER.addStaticSprite(AMMO_CACHE, "ammo_cache1", 240, 120);
    return FOYER;
}();

},{"../creation.js":"ibUM7","../../sprites/interactable.js":"a1CCR","../../helpers/pixi_helpers.js":"bZOjp","../../sprites/portals.js":"7dDrd","../../sprites/objects.js":"fQRa1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ibUM7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// MAP SYNTAX
/*
import { PlayableArea } from '../creation.js';
import { getTextureFromStaticJSFolder } from '../../helpers/pixi_helpers.js';

import {
    
} from '../../sprites/objects.js';

export const MAP_NAME = (function () {
    const MAP_NAME = new PlayableArea(w, h); // DO NOT REMOVE

    const OBJECT = new ObjectClass(getTextureFromStaticJSFolder('path/to/object/image/from/static/js.png'), 0, 0, w, h);
    FOYER.addStaticSprite(
        OBJECT,
        'object_id',
        x,
        y
    );

    ...

    return MAP_NAME; // DO NOT REMOVE
})();
*/ parcelHelpers.export(exports, "PlayableArea", ()=>PlayableArea);
var _checksJs = require("../helpers/checks.js");
var _collisionJs = require("../core/collision.js");
var _entitiesJs = require("../sprites/entities.js");
var _interactableJs = require("../sprites/interactable.js");
var _portalsJs = require("../sprites/portals.js");
var _weaponsJs = require("../sprites/weapons.js");
var _objectsJs = require("../sprites/objects.js");
var _baseJs = require("../sprites/base/base.js");
class PlayableArea {
    constructor(width, height){
        this.area = new PIXI.Container();
        this.width = width;
        this.height = height;
        const BACKGROUND = new PIXI.Graphics();
        BACKGROUND.beginFill(0xFFFFFF);
        BACKGROUND.drawRect(0, 0, width, height);
        BACKGROUND.endFill();
        this.area.addChild(BACKGROUND);
        this.staticSprites = {};
        this.dynamicSprites = {};
        this.STATIC_SPRITES_CONTAINER = new PIXI.Container();
        this.DYNAMIC_SPRITES_CONTAINER = new PIXI.Container();
        this.OBSTACLES = [];
        this.PORTALS = [];
        this.INTERACTABLES = [];
        this.ENEMY_SPAWN_POINTS = [];
        this.COLORED_COORDINATES = [];
        this.area.interactive = true;
        this.mousedownEvent = function() {
            if (window.GAME_PAUSED === false && window.HOTBAR !== undefined && window.HOTBAR !== null) {
                const SELECTED_ITEM = window.HOTBAR.getSelItem();
                if (SELECTED_ITEM instanceof (0, _weaponsJs.Gun)) SELECTED_ITEM.fire();
            }
        };
        this.mousemoveEvent = function() {
            (0, _weaponsJs.toggleCrosshair)(this);
        };
        this.infinite_loop = new PIXI.Ticker();
        this.infinite_loop.add(()=>{
            this.sortSpriteOrder();
        });
    }
    // GETTERS
    getLeftPosX() {
        return this.area.x;
    }
    getLeftPosY() {
        return this.area.y;
    }
    getRightPosX() {
        return this.area.x + this.area.width;
    }
    getRightPosY() {
        return this.area.y + this.area.height;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getHalfWidth() {
        return this.width * 0.5;
    }
    getHalfHeight() {
        return this.height * 0.5;
    }
    getEnemySpawnPoints() {
        return this.ENEMY_SPAWN_POINTS;
    }
    load() {
        window.GAME_PAUSED = false;
        // renders sprites
        this.area.addChild(this.STATIC_SPRITES_CONTAINER, this.DYNAMIC_SPRITES_CONTAINER);
        // renders colored coordinates
        const NUM_OF_COLORED_COORDINATES = this.COLORED_COORDINATES.length;
        for(let i = 0; i < NUM_OF_COLORED_COORDINATES; i++)this.area.addChild(this.COLORED_COORDINATES[i]);
        // adds obstacles to collision detection queue
        const NUM_OF_OBSTACLES = this.OBSTACLES.length;
        for(let i = 0; i < NUM_OF_OBSTACLES; i++)(0, _collisionJs.OBSTACLES).push(this.OBSTACLES[i]);
        // adds portals to map switch detection queue
        const NUM_OF_PORTALS = this.PORTALS.length;
        for(let i = 0; i < NUM_OF_PORTALS; i++)(0, _portalsJs.PORTALS).push(this.PORTALS[i]);
        // adds interactables to interaction detection queue
        const NUM_OF_INTERACTABLES = this.INTERACTABLES.length;
        for(let i = 0; i < NUM_OF_INTERACTABLES; i++)(0, _interactableJs.INTERACTABLES).push(this.INTERACTABLES[i]);
        // runs local game loop
        this.infinite_loop.start();
        // binds events to playable area
        this.area.on("mousedown", this.mousedownEvent);
        this.area.on("mousemove", this.mousemoveEvent);
        window.playableAreaExists = true;
        return this.area;
    }
    unload() {
        window.GAME_PAUSED = true;
        // un-renders sprites
        this.area.removeChild(this.STATIC_SPRITES_CONTAINER);
        this.area.removeChild(this.DYNAMIC_SPRITES_CONTAINER);
        // removes the entities from sorting queue & dynamic sprites container
        const DYNAMIC_SPRITE_IDS = Object.keys(this.dynamicSprites);
        const NUM_OF_DYNAMIC_SPRITES = DYNAMIC_SPRITE_IDS.length;
        for(let i = 0; i < NUM_OF_DYNAMIC_SPRITES; i++){
            const ID = DYNAMIC_SPRITE_IDS[i];
            const CURRENT_DS = this.dynamicSprites[ID];
            if (CURRENT_DS instanceof (0, _entitiesJs.Entity)) {
                this.DYNAMIC_SPRITES_CONTAINER.removeChild(CURRENT_DS.getSprite());
                delete this.dynamicSprites[ID];
            }
        }
        // removes obstacles from collision detection queue
        (0, _collisionJs.OBSTACLES).splice(0, (0, _collisionJs.OBSTACLES).length);
        // removes portals from map switch detection queue
        (0, _portalsJs.PORTALS).splice(0, (0, _portalsJs.PORTALS).length);
        // removes interactables from interaction detection queue
        (0, _interactableJs.INTERACTABLES).splice(0, (0, _interactableJs.INTERACTABLES).length);
        // stops local game loop
        this.infinite_loop.stop();
        // un-binds events to playable area
        this.area.off("mousedown", this.mousedownEvent);
        this.area.off("mousemove", this.mousemoveEvent);
        // un-renders the playable area from the screen
        this.area.parent.removeChild(this.area);
        window.playableAreaExists = false;
    }
    // SETTERS
    setPosition(x, y) {
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        this.area.x = x;
        this.area.y = y;
    }
    addEvent(event, callback) {
        _checksJs.checkIfString(event);
        _checksJs.checkIfFunction(callback);
        this.area.on(event, callback);
    }
    addStaticSprite(sprite, id, x, y) {
        if (sprite instanceof (0, _baseJs.Sprite) === false && sprite instanceof (0, _baseJs.FillSprite) === false) throw ReferenceError(`Not an instance of ${(0, _baseJs.Sprite).name} or ${(0, _baseJs.FillSprite).name}`);
        _checksJs.checkIfString(id);
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        if (this.staticSprites[id] !== undefined) throw ReferenceError(`A sprite with the id '${id}' already exists`);
        this.STATIC_SPRITES_CONTAINER.addChild(sprite.getSprite());
        this.staticSprites[id] = sprite;
        if (sprite instanceof (0, _objectsJs.Obstacle) || sprite instanceof (0, _objectsJs.ObstacleFill)) this.OBSTACLES.push(sprite);
        else if (sprite instanceof (0, _portalsJs.Portal) || sprite instanceof (0, _portalsJs.PortalFill)) this.PORTALS.push(sprite);
        else if (sprite instanceof (0, _interactableJs.Interactable)) this.INTERACTABLES.push(sprite);
        sprite.setPosition(x, y);
    }
    addDynamicSprite(sprite, id, x, y) {
        if (sprite instanceof (0, _baseJs.Sprite) === false && sprite instanceof (0, _baseJs.FillSprite) === false) throw ReferenceError(`Not an instance of ${(0, _baseJs.Sprite).name} or ${(0, _baseJs.FillSprite).name}`);
        _checksJs.checkIfString(id);
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        if (this.dynamicSprites[id] !== undefined) throw ReferenceError(`A sprite with the id '${id}' already exists`);
        this.DYNAMIC_SPRITES_CONTAINER.addChild(sprite.getSprite());
        this.dynamicSprites[id] = sprite;
        if (sprite instanceof (0, _objectsJs.Obstacle) || sprite instanceof (0, _objectsJs.ObstacleFill)) this.OBSTACLES.push(sprite);
        sprite.setPosition(x, y);
    }
    addEnemySpawnPoint(x, y, color) {
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        this.ENEMY_SPAWN_POINTS.push({
            x: x,
            y: y
        });
        if (typeof color === "number") this.colorCoordinate(color, x, y, 5, 5);
    }
    sortSpriteOrder() {
        // SPRITE ORDERING
        const ALL_SPRITES = Object.values(this.dynamicSprites);
        let num_of_sprites = ALL_SPRITES.length;
        if (num_of_sprites > 0) {
            // REMOVES SPRITES WITH NO PARENT
            for(let i = 0; i < num_of_sprites; i++){
                const SPRITE = ALL_SPRITES[i].getSprite();
                if (SPRITE.parent === null) {
                    ALL_SPRITES.splice(i, 1);
                    num_of_sprites = ALL_SPRITES.length;
                    delete this.dynamicSprites[Object.keys(this.dynamicSprites)[i]];
                }
            }
            // REORDERS SPRITE
            let posY_of_sprites = [];
            // gets the y coordinate of the bottom edge of every sprite
            for(let i = 0; i < num_of_sprites; i++){
                const CURRENT_SPRITE = ALL_SPRITES[i];
                posY_of_sprites.push(CURRENT_SPRITE.getRightPosY());
            }
            // sorts the y coordinates in ascending order
            posY_of_sprites = posY_of_sprites.sort();
            for(let i = 0; i < num_of_sprites; i++){
                const CURRENT_POSY = posY_of_sprites[i];
                for(let j = 0; j < num_of_sprites; j++){
                    const UNSORTED_SPRITE = ALL_SPRITES[j];
                    // corrects the z-order of all the sprites according to the sorted y coordinates
                    if (UNSORTED_SPRITE.getRightPosY() === CURRENT_POSY) this.DYNAMIC_SPRITES_CONTAINER.setChildIndex(UNSORTED_SPRITE.getSprite(), i);
                }
            }
        }
    }
    colorCoordinate(color, x, y, w, h) {
        _checksJs.checkIfNumber(color);
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        _checksJs.checkIfNumber(w);
        _checksJs.checkIfNumber(h);
        if (w > 1) x = x - w * 0.5;
        if (h > 1) y = y - h * 0.5;
        const COLORED_COORDINATE = new PIXI.Graphics();
        COLORED_COORDINATE.beginFill(color);
        COLORED_COORDINATE.drawRect(x, y, w, h);
        COLORED_COORDINATE.endFill();
        this.COLORED_COORDINATES.push(COLORED_COORDINATE);
    }
    __addDetour__(object, edge, array_of_points, color) {
        if (object instanceof (0, _objectsJs.Obstacle) === false && object instanceof (0, _objectsJs.ObstacleFill) === false) throw TypeError("Object must be an obstacle.");
        _checksJs.checkIfString(edge);
        switch(edge){
            case "bottom":
                object.addBottomEdgeDetour(array_of_points);
                break;
            case "top":
                object.addTopEdgeDetour(array_of_points);
                break;
            case "left":
                object.addLeftEdgeDetour(array_of_points);
                break;
            case "right":
                object.addRightEdgeDetour(array_of_points);
                break;
        }
        if (typeof color === "number") {
            const NUM_OF_POINTS = array_of_points.length;
            for(let i = 0; i < NUM_OF_POINTS; i++){
                const POINT = array_of_points[i];
                this.colorCoordinate(color, POINT.x, POINT.y, 5, 5);
            }
        }
    }
    addBottomEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(object, "bottom", array_of_points, color);
    }
    addTopEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(object, "top", array_of_points, color);
    }
    addLeftEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(object, "left", array_of_points, color);
    }
    addRightEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(object, "right", array_of_points, color);
    }
    bindPlayableAreaToPortal(sprite_id, playableArea, dest_x, dest_y) {
        _checksJs.checkIfString(sprite_id);
        const PORTAL = this.staticSprites[sprite_id];
        if (PORTAL === undefined) throw Error("A portal with that ID does not exist.");
        PORTAL.setDestination(playableArea, dest_x, dest_y);
    }
}

},{"../helpers/checks.js":"hGT0N","../core/collision.js":"3zsV5","../sprites/entities.js":"77n58","../sprites/interactable.js":"a1CCR","../sprites/portals.js":"7dDrd","../sprites/weapons.js":"gRu1U","../sprites/objects.js":"fQRa1","../sprites/base/base.js":"bXEua","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGT0N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "checkIfString", ()=>checkIfString);
parcelHelpers.export(exports, "checkIfNumber", ()=>checkIfNumber);
parcelHelpers.export(exports, "checkIfInstance", ()=>checkIfInstance);
parcelHelpers.export(exports, "checkIfObject", ()=>checkIfObject);
parcelHelpers.export(exports, "checkIfFunction", ()=>checkIfFunction);
parcelHelpers.export(exports, "checkIfKeyExistsInObject", ()=>checkIfKeyExistsInObject);
parcelHelpers.export(exports, "checkIfArray", ()=>checkIfArray);
parcelHelpers.export(exports, "checkIfBoolean", ()=>checkIfBoolean);
function checkIfString(x) {
    if (typeof x !== "string") throw TypeError("Not a string");
}
function checkIfNumber(x) {
    if (typeof x !== "number") throw TypeError("Not an integer or float");
}
function checkIfInstance(x, c) {
    if (c instanceof Object) {
        const DESCRIPTORS = Object.getOwnPropertyDescriptors(c);
        if (DESCRIPTORS.prototype === undefined || DESCRIPTORS.prototype.writable === undefined || DESCRIPTORS.prototype.writable === true) throw TypeError("Not a class");
    } else throw TypeError("Not a class");
    if (x instanceof c === false) throw TypeError("Not an instance of " + c.name);
}
function checkIfObject(x) {
    if (x.constructor === undefined || x.constructor === null || x.constructor !== Object) throw TypeError("Not an object");
}
function checkIfFunction(x) {
    if (typeof x !== "function" || Object.prototype.toString.call(x) !== "[object Function]") throw TypeError("Not a function");
}
function checkIfKeyExistsInObject(o, k) {
    checkIfObject(o);
    checkIfString(k);
    if (o[k] === undefined) throw ReferenceError(`The key '${k}' doesn't exist in the object`);
}
function checkIfArray(x) {
    if (x.constructor !== Array) throw TypeError("Not an array");
}
function checkIfBoolean(x) {
    if (typeof x !== "boolean") throw TypeError("Not a boolean.");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"3zsV5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OBSTACLES", ()=>OBSTACLES);
parcelHelpers.export(exports, "NON_PLAYER_ENTITIES", ()=>NON_PLAYER_ENTITIES);
parcelHelpers.export(exports, "checkCollisionWithLeftEdgesOfObstacles", ()=>checkCollisionWithLeftEdgesOfObstacles);
parcelHelpers.export(exports, "checkCollisionWithRightEdgesOfObstacles", ()=>checkCollisionWithRightEdgesOfObstacles);
parcelHelpers.export(exports, "checkCollisionWithTopEdgesOfObstacles", ()=>checkCollisionWithTopEdgesOfObstacles);
parcelHelpers.export(exports, "checkCollisionWithBottomEdgesOfObstacles", ()=>checkCollisionWithBottomEdgesOfObstacles);
var _checksJs = require("../helpers/checks.js");
var _entitiesJs = require("../sprites/entities.js");
const OBSTACLES = [];
const NON_PLAYER_ENTITIES = [];
function checkCollisionWithObstacles(sprite, side) {
    _checksJs.checkIfInstance(sprite, (0, _entitiesJs.Entity));
    const NUM_OF_OBSTACLES = OBSTACLES.length;
    if (NUM_OF_OBSTACLES > 0) {
        const SPRITE_SPEED = sprite.getSpeed();
        const SLX = sprite.getLeftPosX() - SPRITE_SPEED;
        const SLY = sprite.getLeftPosY() - SPRITE_SPEED;
        const SRX = sprite.getRightPosX() + SPRITE_SPEED;
        const SRY = sprite.getRightPosY() + SPRITE_SPEED;
        for(let i = 0; i < NUM_OF_OBSTACLES; i++){
            const OBSTACLE = OBSTACLES[i];
            const OLX = OBSTACLE.getLeftPosX();
            const OLY = OBSTACLE.getLeftPosY();
            const ORX = OBSTACLE.getRightPosX();
            const ORY = OBSTACLE.getRightPosY();
            if (side === "top") {
                const SB_above_TE = SRY < OLY;
                const SB_below_TE = SRY > OLY;
                const SB_below_BE = SRY > ORY;
                const SLSR_between_LERE = SLX >= OLX && SRX <= ORX;
                const SL_before_LE = SLX < OLX;
                const SR_after_RE = SRX > ORX;
                const SL_between_LERE = SLX >= OLX && SLX <= ORX;
                const SR_between_LERE = SRX >= OLX && SRX <= ORX;
                const CORRECTED_SR = SRX - SPRITE_SPEED;
                if (SB_below_BE && SB_below_TE) continue;
                else if (CORRECTED_SR < OLX && SLY < ORY) continue;
                else if (CORRECTED_SR < OLX && SRY > OLY) continue;
                else if (SB_above_TE === false) {
                    if (SLSR_between_LERE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "top"
                    };
                    else if (SL_before_LE && SR_between_LERE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "top"
                    };
                    else if (SR_after_RE && SL_between_LERE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "top"
                    };
                }
            } else if (side === "left") {
                const SR_before_LE = SRX < OLX;
                const SR_after_LE = SRX > OLX;
                const SR_after_RE = SRX > ORX;
                const STSB_between_TEBE = SLY >= OLY && SRY <= ORY;
                const ST_above_TE = SLY < OLY;
                const SB_below_BE = SRY > ORY;
                const ST_between_TEBE = SLY >= OLY && SLY <= ORY;
                const SB_between_TEBE = SRY >= OLY && SRY <= ORY;
                const CORRECTED_SB = SRY - SPRITE_SPEED;
                if (SR_after_LE && SR_after_RE) continue;
                else if (CORRECTED_SB < OLY && SLX > OLX) continue;
                else if (CORRECTED_SB > ORY && SLX > OLX) continue;
                else if (SR_before_LE === false) {
                    if (STSB_between_TEBE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "left"
                    };
                    else if (ST_above_TE && SB_between_TEBE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "left"
                    };
                    else if (SB_below_BE && ST_between_TEBE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "left"
                    };
                }
            } else if (side === "right") {
                const SL_after_RE = SLX > ORX;
                const SL_before_LE = SLX < OLX;
                const SL_before_RE = SLX < ORX;
                const STSB_between_TEBE = SLY >= OLY && SRY <= ORY;
                const ST_above_TE = SLY < OLY;
                const SB_below_BE = SRY > ORY;
                const ST_between_TEBE = SLY >= OLY && SLY <= ORY;
                const SB_between_TEBE = SRY >= OLY && SRY <= ORY;
                const CORRECTED_SB = SRY - SPRITE_SPEED;
                if (SL_before_LE && SL_before_RE) continue;
                else if (CORRECTED_SB < OLY && SRX < ORX) continue;
                else if (CORRECTED_SB > ORY && SRX < ORX) continue;
                else if (SL_after_RE === false) {
                    if (STSB_between_TEBE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "right"
                    };
                    else if (ST_above_TE && SB_between_TEBE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "right"
                    };
                    else if (SB_below_BE && ST_between_TEBE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "right"
                    };
                }
            } else if (side === "bottom") {
                const ST_below_BE = SLY > ORY;
                const ST_above_TE = SLY < OLY;
                const ST_above_BE = SLY < ORY;
                const SLSR_between_LERE = SLX >= OLX && SRX <= ORX;
                const SL_before_LE = SLX < OLX;
                const SR_after_RE = SRX > ORX;
                const SL_between_LERE = SLX >= OLX && SLX <= ORX;
                const SR_between_LERE = SRX >= OLX && SRX <= ORX;
                const CORRECTED_SL = SLX + SPRITE_SPEED;
                if (ST_above_BE && ST_above_TE) continue;
                else if (CORRECTED_SL > ORX && SLY < ORY) continue;
                else if (CORRECTED_SL > ORX && SRY > OLY) continue;
                else if (ST_below_BE === false) {
                    if (SLSR_between_LERE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "bottom"
                    };
                    else if (SL_before_LE && SR_between_LERE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "bottom"
                    };
                    else if (SR_after_RE && SL_between_LERE) return {
                        status: true,
                        object: OBSTACLE,
                        edge: "bottom"
                    };
                }
            }
        }
    }
    return {
        status: false,
        object: undefined,
        edge: undefined
    };
}
function checkCollisionWithLeftEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, "left");
}
function checkCollisionWithRightEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, "right");
}
function checkCollisionWithTopEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, "top");
}
function checkCollisionWithBottomEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, "bottom");
}

},{"../helpers/checks.js":"hGT0N","../sprites/entities.js":"77n58","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"77n58":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Entity", ()=>Entity);
parcelHelpers.export(exports, "Player", ()=>Player);
parcelHelpers.export(exports, "Enemy", ()=>Enemy);
parcelHelpers.export(exports, "Zombie", ()=>Zombie);
var _checksJs = require("../helpers/checks.js");
var _baseJs = require("./base/base.js");
var _collisionJs = require("../core/collision.js");
var _baseJs1 = require("../sprites/base/base.js");
var _hudJs = require("../core/hud.js");
var _deathScreenJs = require("../core/death_screen.js");
var _weaponsJs = require("./weapons.js");
var _objectsJs = require("../sprites/objects.js");
var _urls = require("../helpers/urls");
class Entity extends (0, _baseJs.Sprite) {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.movementOffset = 5;
        this.events = {
            move: [],
            onChangeFrame: []
        };
        this.itemInstance = null;
        this.equippedItem = null;
        this.addEvent("onChangeFrame", ()=>{
            if (this.itemInstance !== null) {
                this.sprite_container.removeChild(this.equippedItem);
                if (this.itemInstance instanceof (0, _weaponsJs.Weapon)) this.__renderWeapon__(this.itemInstance, this.currentFrame);
            }
        });
    }
    // GETTERS
    __renderWeapon__(weapon, frame) {
        _checksJs.checkIfInstance(weapon, (0, _weaponsJs.Weapon));
        _checksJs.checkIfString(frame);
        if (frame === "n" || frame === "nl" || frame === "nr") {
            this.equippedItem = weapon.loadNorth();
            this.sprite_container.addChildAt(this.equippedItem, 0);
            return;
        } else if (frame === "s" || frame === "sl" || frame === "sr") this.equippedItem = weapon.loadSouth();
        else if (frame === "w" || frame === "wl" || frame === "wr") this.equippedItem = weapon.loadWest();
        else if (frame === "e" || frame === "el" || frame === "er") this.equippedItem = weapon.loadEast();
        this.sprite_container.addChild(this.equippedItem);
    }
    getSpeed() {
        return this.movementOffset;
    }
    // SETTERS
    equip(item) {
        _checksJs.checkIfInstance(item, (0, _baseJs1.Item));
        this.itemInstance = item;
        if (item instanceof (0, _weaponsJs.Weapon)) this.__renderWeapon__(item, this.currentFrame);
    }
    unequip() {
        this.sprite_container.removeChild(this.equippedItem);
        this.itemInstance = null;
        this.equippedItem = null;
    }
    showDamage() {
        this.sprite.tint = 0xff0000;
    }
    hideDamage() {
        this.sprite.tint = this.original_tint;
    }
    setSpeed(speed) {
        _checksJs.checkIfNumber(speed);
        this.movementOffset = speed;
    }
    moveSprite(x, y) {
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        this.sprite_container.x += x;
        this.sprite_container.y += y;
        const EVENT = this.events["move"];
        if (EVENT !== undefined && EVENT !== null) {
            const EVENT_CALLBACKS = EVENT;
            const NUM_OF_CALLBACKS = EVENT_CALLBACKS.length;
            for(let i = 0; i < NUM_OF_CALLBACKS; i++)EVENT_CALLBACKS[i]({
                currentFrame: this.currentFrame
            });
        }
    }
    moveSpriteNorth() {
        this.moveSprite(0, -this.movementOffset);
    }
    moveSpriteNorthWest() {
        this.moveSprite(-this.movementOffset, -this.movementOffset);
    }
    moveSpriteNorthEast() {
        this.moveSprite(this.movementOffset, -this.movementOffset);
    }
    moveSpriteWest() {
        this.moveSprite(-this.movementOffset, 0);
    }
    moveSpriteEast() {
        this.moveSprite(this.movementOffset, 0);
    }
    moveSpriteSouth() {
        this.moveSprite(0, this.movementOffset);
    }
    moveSpriteSouthWest() {
        this.moveSprite(-this.movementOffset, this.movementOffset);
    }
    moveSpriteSouthEast() {
        this.moveSprite(this.movementOffset, this.movementOffset);
    }
}
class Player extends Entity {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.health = 100;
        this.invincibility = false;
        this.currentPoints = 1000;
        let reset_to_idle_timer = null;
        this.addEvent("move", (event)=>{
            clearTimeout(reset_to_idle_timer);
            reset_to_idle_timer = setTimeout(()=>{
                this.rotateToMouse(); // resets player sprite to the idle frame
            }, 100);
            // moving animation for hands
            if (new Date().getMilliseconds() % 2 === 0) {
                if (event.currentFrame === "s" || event.currentFrame === "sr") this.switchFrame("sl");
                else if (event.currentFrame === "sl") this.switchFrame("sr");
                else if (event.currentFrame === "e" || event.currentFrame === "er") this.switchFrame("el");
                else if (event.currentFrame === "w" || event.currentFrame === "wr") this.switchFrame("wl");
                else if (event.currentFrame === "wl") this.switchFrame("wr");
                else if (event.currentFrame === "e" || event.currentFrame === "er") this.switchFrame("el");
                else if (event.currentFrame === "el") this.switchFrame("er");
                else if (event.currentFrame === "n" || event.currentFrame === "nr") this.switchFrame("nl");
                else if (event.currentFrame === "nl") this.switchFrame("nr");
            }
        });
    }
    // GETTERS
    isInvincible() {
        return this.invincibility;
    }
    getHealth() {
        return this.health;
    }
    // SETTERS
    rotateToMouse() {
        const PLAYER_CENTER = this.getCenterCoordinates(); // relative to parent
        let player_sprite_parent = this.sprite_container.parent;
        let corrected_offsetX = PLAYER_CENTER.x + player_sprite_parent.x;
        let corrected_offsetY = PLAYER_CENTER.y + player_sprite_parent.y;
        while(player_sprite_parent.parent !== null){
            player_sprite_parent = player_sprite_parent.parent;
            corrected_offsetX += player_sprite_parent.x;
            corrected_offsetY += player_sprite_parent.y;
        }
        const MOUSE_X_DISTANCE_FROM_PLAYER = window.mouseX - corrected_offsetX;
        const MOUSE_Y_DISTANCE_FROM_PLAYER = window.mouseY - corrected_offsetY;
        const MOUSE_ANGLE_FROM_PLAYER = Math.round(Math.atan2(MOUSE_Y_DISTANCE_FROM_PLAYER, MOUSE_X_DISTANCE_FROM_PLAYER) * 180 / Math.PI);
        /*
            -90
        -180    0
            90
        */ if (MOUSE_ANGLE_FROM_PLAYER >= -145 && MOUSE_ANGLE_FROM_PLAYER <= -45) this.switchFrame("n");
        else if (MOUSE_ANGLE_FROM_PLAYER >= -180 && MOUSE_ANGLE_FROM_PLAYER < -145 || MOUSE_ANGLE_FROM_PLAYER <= 180 && MOUSE_ANGLE_FROM_PLAYER > 145) this.switchFrame("w");
        else if (MOUSE_ANGLE_FROM_PLAYER <= 145 && MOUSE_ANGLE_FROM_PLAYER > 45) this.switchFrame("s");
        else if (MOUSE_ANGLE_FROM_PLAYER >= 0 && MOUSE_ANGLE_FROM_PLAYER <= 45 || MOUSE_ANGLE_FROM_PLAYER < 0 && MOUSE_ANGLE_FROM_PLAYER > -45) this.switchFrame("e");
    }
    activateInvincibility() {
        this.invincibility = true;
        setTimeout(()=>{
            this.invincibility = false;
            this.hideDamage();
        }, 1000);
    }
    setHealth(health) {
        _checksJs.checkIfNumber(health);
        this.health = health;
    }
    increaseHealth(value) {
        _checksJs.checkIfNumber(value);
        this.health += value;
        if (this.health > 100) this.health = 100;
        (0, _hudJs.updatePlayerHealthStatus)(this.health);
    }
    decreaseHealth(value) {
        _checksJs.checkIfNumber(value);
        this.health -= value;
        this.showDamage();
        (0, _hudJs.updatePlayerHealthStatus)(this.health);
        if (this.health < 0) this.health = 0;
        if (this.health === 0) {
            this.sprite.parent.removeChild(this.sprite); // un-renders player
            (0, _deathScreenJs.showDeathScreen)();
        }
    }
}
class Enemy extends Entity {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.navigationMode = 0;
        this.objectCollidedWith = null;
        this.edgeCollidedWith = null;
        this.detourChosen = null;
        this.detourPointIndex = 0;
        this.isDead = false;
        (0, _collisionJs.NON_PLAYER_ENTITIES).push(this);
        this.sprite_container.interactive = true;
        this.sprite_container.on("mousedown", (event)=>{
            event.stopPropagation();
            if (window.HOTBAR !== undefined && window.HOTBAR !== null) {
                const SELECTED_ITEM = window.HOTBAR.getSelItem();
                if (SELECTED_ITEM instanceof (0, _weaponsJs.Gun)) {
                    SELECTED_ITEM.fire();
                    if (SELECTED_ITEM.ammoLoaded > 0) {
                        this.decreaseHealth(SELECTED_ITEM.getDamage());
                        this.showDamage();
                        setTimeout(()=>{
                            this.hideDamage();
                        }, 500);
                    }
                }
            }
        });
        this.sprite_container.on("mousemove", ()=>{
            (0, _weaponsJs.toggleCrosshair)(this.sprite_container);
        });
    }
    // GETTERS
    __getMoveDirectionFromAngle__(angle) {
        _checksJs.checkIfNumber(angle);
        if (angle >= -120 && angle <= -60) return "n";
        else if (angle >= -150 && angle <= -120) return "nw";
        else if (angle >= -180 && angle <= -150 || angle <= 180 && angle >= 150) return "w";
        else if (angle <= 150 && angle >= 120) return "sw";
        else if (angle <= 120 && angle >= 60) return "s";
        else if (angle <= 60 && angle >= 30) return "se";
        else if (angle <= 30 && angle >= 0 || angle <= 0 && angle >= -30) return "e";
        else if (angle <= -30 && angle >= -60) return "ne";
    }
    __getEnemyXandYDistanceFromPlayer__(player) {
        _checksJs.checkIfInstance(player, Player);
        const PLAYER_SPRITE = player.getSprite();
        const PLAYER_CENTER = player.getCenterCoordinates();
        const ENEMY_CENTER = this.getCenterCoordinates(); // relative to parent
        const ENEMY_X_DISTANCE_FROM_PLAYER = PLAYER_CENTER.x + PLAYER_SPRITE.x - (ENEMY_CENTER.x + this.sprite_container.x);
        const ENEMY_Y_DISTANCE_FROM_PLAYER = PLAYER_CENTER.y + PLAYER_SPRITE.y - (ENEMY_CENTER.y + this.sprite_container.y);
        return {
            dx: ENEMY_X_DISTANCE_FROM_PLAYER,
            dy: ENEMY_Y_DISTANCE_FROM_PLAYER
        };
    }
    __getAngleToPlayer__(player) {
        /*
            -90
        -180    0
            90
        */ const DISTANCES = this.__getEnemyXandYDistanceFromPlayer__(player);
        return Math.round(Math.atan2(DISTANCES.dy, DISTANCES.dx) * 180 / Math.PI);
    }
    getClosestDetour(object, edge) {
        if (object instanceof (0, _objectsJs.Obstacle) === false && object instanceof (0, _objectsJs.ObstacleFill) === false) return; // silently fail
        _checksJs.checkIfString(edge);
        edge = edge.toLowerCase();
        if (edge !== "bottom" && edge !== "top" && edge !== "left" && edge !== "right") throw ReferenceError("Edge can only be one of the following: top, bottom, left, right");
        const ALL_DETOURS = object.getDetours(edge);
        const ENTITY_CENTER = this.getCenterCoordinates();
        let closestDetour = null;
        let previousDistance = null;
        const NUM_OF_DETOURS = ALL_DETOURS.length;
        for(let i = 0; i < NUM_OF_DETOURS; i++){
            const START_OF_DETOUR = ALL_DETOURS[i][0];
            const DISTANCE = Math.round(Math.sqrt(Math.pow(ENTITY_CENTER.x - START_OF_DETOUR.x, 2) + Math.pow(ENTITY_CENTER.y - START_OF_DETOUR.y, 2)));
            if (closestDetour === null || DISTANCE < previousDistance) {
                closestDetour = ALL_DETOURS[i];
                previousDistance = DISTANCE;
            }
        }
        if (closestDetour !== null) return [
            ...closestDetour
        ];
        else return null;
    }
    // SETTERS
    __switchFrameToAngle__(angle) {
        if (angle >= -145 && angle <= -45) this.switchFrame("n");
        else if (angle >= -180 && angle < -145 || angle <= 180 && angle > 145) this.switchFrame("w");
        else if (angle <= 145 && angle > 45) this.switchFrame("s");
        else if (angle >= 0 && angle <= 45 || angle < 0 && angle > -45) this.switchFrame("e");
    }
    rotateToPlayer(player) {
        const PLAYER_ANGLE_FROM_ENEMY = this.__getAngleToPlayer__(player);
        this.__switchFrameToAngle__(PLAYER_ANGLE_FROM_ENEMY);
    }
    stopFollowingPlayerAndMoveAroundObject(collision_data) {
        _checksJs.checkIfObject(collision_data);
        if (collision_data.object instanceof (0, _objectsJs.Obstacle) === false && collision_data.object instanceof (0, _objectsJs.ObstacleFill) === false) throw TypeError("Object must be an obstacle.");
        if (collision_data.edge === undefined) throw SyntaxError("Collision data is missing edge information.");
        _checksJs.checkIfString(collision_data.edge);
        this.navigationMode = 1;
        this.objectCollidedWith = collision_data.object;
        this.edgeCollidedWith = collision_data.edge;
    }
    stopFollowingDetourAndChasePlayerAgain(player) {
        _checksJs.checkIfInstance(player, Player);
        this.detourChosen = null;
        this.detourPointIndex = 0;
        this.navigationMode = 0;
        this.objectCollidedWith = null;
        this.edgeCollidedWith = null;
        this.__switchFrameToAngle__(this.__getAngleToPlayer__(player));
    }
    moveToPlayer(player) {
        const PLAYER_ANGLE_FROM_ENEMY = this.__getAngleToPlayer__(player);
        if (this.navigationMode === 0) {
            // going after player
            const DIRECTION = this.__getMoveDirectionFromAngle__(PLAYER_ANGLE_FROM_ENEMY);
            const BEC = (0, _collisionJs.checkCollisionWithBottomEdgesOfObstacles)(this);
            const TEC = (0, _collisionJs.checkCollisionWithTopEdgesOfObstacles)(this);
            if (DIRECTION === "e" || DIRECTION === "ne" || DIRECTION === "se") {
                const LEC = (0, _collisionJs.checkCollisionWithLeftEdgesOfObstacles)(this);
                switch(DIRECTION){
                    case "e":
                        if (LEC.status === false) this.moveSpriteEast();
                        else if (LEC.status === true) this.stopFollowingPlayerAndMoveAroundObject(LEC);
                        break;
                    case "ne":
                        if (BEC.status === false && LEC.status === false) this.moveSpriteNorthEast();
                        break;
                    case "se":
                        if (TEC.status === false && LEC.status === false) this.moveSpriteSouthEast();
                        break;
                }
            } else if (DIRECTION === "w" || DIRECTION === "nw" || DIRECTION === "sw") {
                const REC = (0, _collisionJs.checkCollisionWithRightEdgesOfObstacles)(this);
                switch(DIRECTION){
                    case "w":
                        if (REC.status === false) this.moveSpriteWest();
                        else if (REC.status === true) this.stopFollowingPlayerAndMoveAroundObject(REC);
                        break;
                    case "nw":
                        if (BEC.status === false && REC.status === false) this.moveSpriteNorthWest();
                        break;
                    case "sw":
                        if (TEC.status === false && REC.status === false) this.moveSpriteSouthWest();
                        break;
                }
            } else if (DIRECTION === "n") {
                if (BEC.status === false) this.moveSpriteNorth();
                else if (BEC.status === true) this.stopFollowingPlayerAndMoveAroundObject(BEC);
            } else if (DIRECTION === "s") {
                if (TEC.status === false) this.moveSpriteSouth();
                else if (TEC.status === true) this.stopFollowingPlayerAndMoveAroundObject(TEC);
            }
            // deals damage to player on contact
            if (player.isInvincible() === false && player.getHealth() > 0 && this.sprite.alpha >= 1) {
                const DIFFERENCES = this.__getEnemyXandYDistanceFromPlayer__(player);
                const DISTANCE_BETWEEN_ENEMY_CENTER_AND_PLAYER_CENTER = Math.sqrt(Math.pow(DIFFERENCES.dx, 2) + Math.pow(DIFFERENCES.dy, 2));
                if (DISTANCE_BETWEEN_ENEMY_CENTER_AND_PLAYER_CENTER <= 40) this.__damagePlayer___(player);
            }
        } else if (this.navigationMode === 1) {
            // going around object
            const DISTANCE_DIFFERENCE = this.__getEnemyXandYDistanceFromPlayer__(player);
            const DISTANCE_BETWEEN_ENEMY_AND_PLAYER = Math.round(Math.sqrt(Math.pow(DISTANCE_DIFFERENCE.dx, 2) + Math.pow(DISTANCE_DIFFERENCE.dy, 2)));
            if (this.detourChosen === null && this.edgeCollidedWith !== null) this.detourChosen = this.getClosestDetour(this.objectCollidedWith, this.edgeCollidedWith); // gets copy of saved detours
            else if (this.detourChosen !== null && this.detourChosen.constructor === Array) {
                const NUM_OF_DETOURS = this.detourChosen.length;
                if (NUM_OF_DETOURS > 0) {
                    const POINT = this.detourChosen[this.detourPointIndex];
                    const ENEMY_CENTER = this.getCenterCoordinates();
                    const DISTANCE_BETWEEN_ENEMY_AND_POINT = Math.round(Math.sqrt(Math.pow(ENEMY_CENTER.x - POINT.x, 2) + Math.pow(ENEMY_CENTER.y - POINT.y, 2)));
                    // compares distance between enemy and current point to the distance between enemy and the player
                    if (DISTANCE_BETWEEN_ENEMY_AND_POINT < DISTANCE_BETWEEN_ENEMY_AND_PLAYER) this.moveToDetourPoint(POINT);
                    else {
                        this.stopFollowingDetourAndChasePlayerAgain(player);
                        return;
                    }
                    // moves the enemy to the next point
                    if (Math.round(ENEMY_CENTER.x) === POINT.x && Math.round(ENEMY_CENTER.y) === POINT.y) this.detourPointIndex += 1;
                    // stop following detour since the last point has been reached
                    if (this.detourPointIndex === this.detourChosen.length) this.stopFollowingDetourAndChasePlayerAgain(player);
                }
            }
        }
    }
    moveToDetourPoint(point) {
        _checksJs.checkIfObject(point);
        if (point.x === undefined || point.y === undefined) throw SyntaxError("Point must be an object with x and y as properties.");
        _checksJs.checkIfNumber(point.x);
        _checksJs.checkIfNumber(point.y);
        const ENEMY_CENTER = this.getCenterCoordinates();
        const ANGLE_TO_DETOUR = Math.round(Math.atan2(point.y - ENEMY_CENTER.y, point.x - ENEMY_CENTER.x) * 180 / Math.PI);
        this.__switchFrameToAngle__(ANGLE_TO_DETOUR);
        const DIRECTION = this.__getMoveDirectionFromAngle__(ANGLE_TO_DETOUR);
        switch(DIRECTION){
            case "n":
                this.moveSpriteNorth();
                break;
            case "nw":
                this.moveSpriteNorthWest();
                break;
            case "w":
                this.moveSpriteWest();
                break;
            case "sw":
                this.moveSpriteSouthWest();
                break;
            case "s":
                this.moveSpriteSouth();
                break;
            case "se":
                this.moveSpriteSouthEast();
                break;
            case "e":
                this.moveSpriteEast();
                break;
            case "ne":
                this.moveSpriteNorthEast();
                break;
        }
    }
    decreaseHealth(value) {
        _checksJs.checkIfNumber(value);
        this.health -= value;
        this.removeSelf();
    }
    removeSelf() {
        if (this.health <= 0) {
            // references to enemy get deleted so that its instance can be put in the garbage collector (memory optimization)
            new Audio(this.deathSoundFile).play();
            this.sprite_container.parent.removeChild(this.sprite_container);
            (0, _collisionJs.NON_PLAYER_ENTITIES).splice((0, _collisionJs.NON_PLAYER_ENTITIES).indexOf(this), 1);
            return true;
        }
        return false;
    }
}
class Zombie extends Enemy {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.health = 100;
        this.damage = 20;
        this.deathSoundFile = `${0, _urls.SOUND_ASSETS_FOLDER}/zombie-death.mp3` //https://www.fesliyanstudios.com/royalty-free-sound-effects-download/zombie-174
        ;
        this.setSpeed(0.5);
    }
    // SETTERS
    __damagePlayer___(player) {
        _checksJs.checkIfInstance(player, Player);
        player.decreaseHealth(this.damage);
        player.activateInvincibility();
    }
}

},{"../helpers/checks.js":"hGT0N","./base/base.js":"bXEua","../core/collision.js":"3zsV5","../sprites/base/base.js":"bXEua","../core/hud.js":"3PEGa","./weapons.js":"gRu1U","../sprites/objects.js":"fQRa1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../core/death_screen.js":"l0hrc","../helpers/urls":"5skMk"}],"bXEua":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Sprite", ()=>Sprite);
parcelHelpers.export(exports, "FillSprite", ()=>FillSprite);
parcelHelpers.export(exports, "Item", ()=>Item);
var _checksJs = require("../../helpers/checks.js");
class Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        _checksJs.checkIfInstance(texture, PIXI.Texture);
        _checksJs.checkIfNumber(posX);
        _checksJs.checkIfNumber(posY);
        _checksJs.checkIfNumber(frameWidth);
        _checksJs.checkIfNumber(frameHeight);
        this.sprite = new PIXI.Sprite(texture);
        this.spriteFrameWidth = frameWidth;
        this.spriteFrameHeight = frameHeight;
        this.sprite_container = new PIXI.Container();
        this.sprite_container.addChild(this.sprite);
        this.sprite_container.x = posX;
        this.sprite_container.y = posY;
        this.original_tint = this.sprite.tint;
        this.frameMask = null;
        this.frames = {};
        this.currentFrame = null;
        this.isFlippedHorizontally = false;
        this.isFlippedVertically = false;
        this.events = {};
    }
    // GETTERS
    getLeftPosX() {
        if (this.isFlippedHorizontally) return this.sprite_container.x - this.spriteFrameWidth;
        else return this.sprite_container.x;
    }
    getLeftPosY() {
        if (this.isFlippedVertically) return this.sprite_container.y - this.spriteFrameHeight;
        else return this.sprite_container.y;
    }
    getRightPosX() {
        if (this.isFlippedHorizontally) return this.sprite_container.x;
        else return this.sprite_container.x + this.spriteFrameWidth;
    }
    getRightPosY() {
        if (this.isFlippedVertically) return this.sprite_container.y;
        else return this.sprite_container.y + this.spriteFrameHeight;
    }
    getCenterCoordinates() {
        return {
            x: this.getLeftPosX() + this.getHalfWidth(),
            y: this.getLeftPosY() + this.getHalfHeight()
        };
    }
    getSpriteFrameDimensions() {
        return {
            w: this.spriteFrameWidth,
            h: this.spriteFrameHeight
        };
    }
    getHalfWidth() {
        return this.spriteFrameWidth * 0.5;
    }
    getHalfHeight() {
        return this.spriteFrameHeight * 0.5;
    }
    getCurrentFrame() {
        return this.currentFrame;
    }
    getSprite() {
        return this.sprite_container;
    }
    // SETTERS
    __setFrameMask__(x, y, frameWidth, frameHeight) {
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        _checksJs.checkIfNumber(frameWidth);
        _checksJs.checkIfNumber(frameHeight);
        this.sprite_container.removeChild(this.frameMask); // removes old frame mask
        const MASK = new PIXI.Graphics();
        MASK.beginFill("black");
        MASK.drawRect(x, y, frameWidth, frameHeight);
        MASK.endFill();
        this.sprite.mask = MASK;
        this.sprite_container.addChild(MASK);
        this.frameMask = MASK;
        this.spriteFrameWidth = frameWidth;
        this.spriteFrameHeight = frameHeight;
    }
    setPosition(x, y) {
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        this.sprite_container.x = x;
        this.sprite_container.y = y;
    }
    addEvent(event, callback) {
        _checksJs.checkIfString(event);
        _checksJs.checkIfFunction(callback);
        if (this.events[event] === undefined) throw ReferenceError("Not a valid event");
        this.events[event].push(callback);
    }
    addFrame(name, x, y, w, h) {
        _checksJs.checkIfString(name);
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        _checksJs.checkIfNumber(w);
        _checksJs.checkIfNumber(h);
        this.frames[name] = {
            x: x,
            y: y,
            w: w,
            h: h
        };
    }
    addFrames(json) {
        _checksJs.checkIfObject(json);
        const FRAME_NAMES = Object.keys(json);
        const NUM_OF_FRAMES = FRAME_NAMES.length;
        if (NUM_OF_FRAMES > 0) for(let i = 0; i < NUM_OF_FRAMES; i++){
            const NAME = FRAME_NAMES[i];
            const FRAME_DATA = json[NAME];
            this.addFrame(NAME, FRAME_DATA.x, FRAME_DATA.y, FRAME_DATA.w, FRAME_DATA.h);
        }
    }
    switchFrame(name) {
        const FRAME = this.frames[name];
        this.sprite.x = -FRAME.x;
        this.sprite.y = -FRAME.y;
        this.__setFrameMask__(0, 0, FRAME.w, FRAME.h);
        this.currentFrame = name;
        const EVENT = this.events["onChangeFrame"];
        if (EVENT !== undefined && EVENT !== null) {
            const EVENT_CALLBACKS = EVENT;
            const NUM_OF_CALLBACKS = EVENT_CALLBACKS.length;
            for(let i = 0; i < NUM_OF_CALLBACKS; i++)EVENT_CALLBACKS[i]({
                currentFrame: this.currentFrame
            });
        }
    }
    flipHorizontally() {
        // adding/subtracting the frame width ensures that the sprite is still in the same x-position after the flip
        if (this.isFlippedHorizontally) {
            this.sprite_container.scale.x = 1;
            this.sprite_container.x -= this.spriteFrameWidth;
            this.isFlippedHorizontally = false;
        } else {
            this.sprite_container.scale.x = -1;
            this.sprite_container.x += this.spriteFrameWidth;
            this.isFlippedHorizontally = true;
        }
    }
    flipVertically() {
        // adding/subtracting the frame height ensures that the sprite is still in the same y-position after the flip
        if (this.isFlippedVertically) {
            this.sprite_container.scale.y = 1;
            this.sprite_container.y -= this.spriteFrameHeight;
            this.isFlippedVertically = false;
        } else {
            this.sprite_container.scale.y = -1;
            this.sprite_container.y += this.spriteFrameHeight;
            this.isFlippedVertically = true;
        }
    }
}
class FillSprite {
    constructor(color, posX, posY, width, height){
        _checksJs.checkIfNumber(color);
        _checksJs.checkIfNumber(posX);
        _checksJs.checkIfNumber(posY);
        _checksJs.checkIfNumber(width);
        _checksJs.checkIfNumber(height);
        this.FILL = new PIXI.Graphics();
        this.FILL.beginFill(color);
        this.FILL.drawRect(0, 0, width, height);
        this.FILL.endFill();
        this.sprite = this.FILL;
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.fillWidth = width;
        this.fillHeight = height;
    }
    // GETTERS
    getLeftPosX() {
        return this.sprite.x;
    }
    getLeftPosY() {
        return this.sprite.y;
    }
    getRightPosX() {
        return this.sprite.x + this.fillWidth;
    }
    getRightPosY() {
        return this.sprite.y + this.fillHeight;
    }
    getCenterCoordinates() {
        return {
            x: this.getLeftPosX() + this.getHalfWidth(),
            y: this.getLeftPosY() + this.getHalfHeight()
        };
    }
    getFillDimensions() {
        return {
            w: this.fillWidth,
            h: this.fillHeight
        };
    }
    getHalfWidth() {
        return this.fillWidth * 0.5;
    }
    getHalfHeight() {
        return this.fillHeight * 0.5;
    }
    getSprite() {
        return this.sprite;
    }
    // SETTERS
    setPosition(x, y) {
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        this.sprite.x = x;
        this.sprite.y = y;
    }
    setFillDimensions(w, h) {
        _checksJs.checkIfNumber(w);
        _checksJs.checkIfNumber(h);
        this.fillWidth = w;
        this.fillHeight = h;
    }
    setAlpha(alpha) {
        _checksJs.checkIfNumber(alpha);
        if (alpha < 0 || alpha > 1) throw Error("Alpha must be a value between 0 and 1.");
        this.FILL.alpha = alpha;
    }
}
class Item {
    constructor(texture){
        _checksJs.checkIfInstance(texture, PIXI.Texture);
        this.texture = texture;
        this.icon = new PIXI.Sprite(texture);
    }
    // GETTERS
    getIcon() {
        return this.icon;
    }
}

},{"../../helpers/checks.js":"hGT0N","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3PEGa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PLAYER_HEALTH_STATUS", ()=>PLAYER_HEALTH_STATUS);
parcelHelpers.export(exports, "updatePlayerHealthStatus", ()=>updatePlayerHealthStatus);
parcelHelpers.export(exports, "PLAYER_POINTS", ()=>PLAYER_POINTS);
parcelHelpers.export(exports, "updatePlayerPointsText", ()=>updatePlayerPointsText);
parcelHelpers.export(exports, "AMMO_COUNT", ()=>AMMO_COUNT);
parcelHelpers.export(exports, "updateAmmoCount", ()=>updateAmmoCount);
parcelHelpers.export(exports, "hideAmmoCount", ()=>hideAmmoCount);
var _checksJs = require("../helpers/checks.js");
var _weaponsJs = require("../sprites/weapons.js");
const HUD_TEXT_STYLES = {
    fontSize: 20,
    fill: 0xffffff
};
const PLAYER_HEALTH_STATUS = new PIXI.Text("Health: 100", HUD_TEXT_STYLES);
PLAYER_HEALTH_STATUS.x = 20;
PLAYER_HEALTH_STATUS.y = 10;
function updatePlayerHealthStatus(new_value) {
    _checksJs.checkIfNumber(new_value);
    PLAYER_HEALTH_STATUS.text = "Health: " + new_value;
}
const PLAYER_POINTS = new PIXI.Text("Points: 1000", HUD_TEXT_STYLES);
PLAYER_POINTS.x = 300;
PLAYER_POINTS.y = 10;
function updatePlayerPointsText(new_value) {
    _checksJs.checkIfNumber(new_value);
    PLAYER_POINTS.text = "Points: " + new_value;
}
const AMMO_COUNT = new PIXI.Text("Ammo: n/a", HUD_TEXT_STYLES);
AMMO_COUNT.x = 160;
AMMO_COUNT.y = 10;
function updateAmmoCount(gun) {
    _checksJs.checkIfInstance(gun, (0, _weaponsJs.Gun));
    AMMO_COUNT.text = `Ammo: ${gun.getAmmoLoaded()}/${gun.getAmmoLeft()}`;
}
function hideAmmoCount() {
    AMMO_COUNT.text = "";
}

},{"../helpers/checks.js":"hGT0N","../sprites/weapons.js":"gRu1U","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gRu1U":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "toggleCrosshair", ()=>toggleCrosshair);
parcelHelpers.export(exports, "Weapon", ()=>Weapon);
parcelHelpers.export(exports, "Gun", ()=>Gun);
parcelHelpers.export(exports, "Pistol", ()=>Pistol);
var _checksJs = require("../helpers/checks.js");
var _baseJs = require("./base/base.js");
var _hudJs = require("../core/hud.js");
var _urlsJs = require("../helpers/urls.js");
function toggleCrosshair(container) {
    _checksJs.checkIfInstance(container, PIXI.Container);
    if (window.HOTBAR !== undefined && window.HOTBAR !== null) {
        if (window.HOTBAR.getSelItem() instanceof Gun) container.cursor = `url(${0, _urlsJs.STATIC_ASSETS_FOLDER}/guns/crosshair.png), auto`;
        else container.cursor = "auto";
    }
}
class Weapon extends (0, _baseJs.Item) {
    constructor(texture){
        super(texture);
    }
    // SETTERS
    createCopy(texture, x, y, w, h) {
        _checksJs.checkIfInstance(texture, PIXI.Texture);
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        _checksJs.checkIfNumber(w);
        _checksJs.checkIfNumber(h);
        const COPY = new PIXI.Sprite(this.texture);
        COPY.x = x;
        COPY.y = y;
        COPY.width = w;
        COPY.height = h;
        return COPY;
    }
}
class Gun extends Weapon {
    constructor(texture){
        super(texture);
    }
    // GETTERS
    getAmmoLoaded() {
        if (this.ammoLoaded < 0) return 0;
        return this.ammoLoaded;
    }
    getMaxAmmo() {
        return this.maxAmmo;
    }
    getAmmoLeft() {
        return this.ammoLeft;
    }
    getClipCapacity() {
        return this.clipCapacity;
    }
    playGunFireSound() {
        new Audio(this.gunFireSoundFile).play();
    }
    playReloadSound() {
        const AUDIO = new Audio(this.reloadSoundFile);
        AUDIO.play();
        return AUDIO;
    }
    getDamage() {
        return this.damage;
    }
    // SETTERS
    fire() {
        if (this.mode === "semi-auto") this.ammoLoaded -= 1;
        if (this.ammoLoaded > -1) {
            this.playGunFireSound();
            (0, _hudJs.updateAmmoCount)(this);
        }
        if (this.ammoLoaded === 0 && this.ammoLeft > 0) this.reload();
    }
    reload() {
        this.playReloadSound();
        setTimeout(()=>{
            if (this.ammoLoaded <= 0) {
                // clip is empty (auto reload)
                if (this.ammoLeft >= 12) {
                    this.ammoLeft -= this.clipCapacity;
                    this.ammoLoaded = this.clipCapacity;
                } else if (this.ammoLeft < 12) {
                    this.ammoLoaded = this.ammoLeft;
                    this.ammoLeft -= this.ammoLeft;
                }
            } else if (this.ammoLoaded > 0) {
                // clip is not empty (manual reload)
                const AMMO_NEEDED = this.clipCapacity - this.ammoLoaded;
                if (this.ammoLeft >= AMMO_NEEDED) {
                    this.ammoLoaded += AMMO_NEEDED;
                    this.ammoLeft -= AMMO_NEEDED;
                } else if (this.ammoLeft < AMMO_NEEDED) {
                    this.ammoLoaded += this.ammoLeft;
                    this.ammoLeft -= this.ammoLeft;
                }
            }
            (0, _hudJs.updateAmmoCount)(this);
        }, this.reloadDuration);
    }
    addMaxAmmo(amount) {
        this.ammoLeft = amount;
        (0, _hudJs.updateAmmoCount)(this);
    }
    setDamage(amount) {
        this.damage = amount;
    }
    increaseDamage(amount) {
        this.damage += amount;
    }
    increaseClipCapacity(amount) {
        this.clipCapacity += amount;
    }
    increaseMaxAmmo(amount) {
        this.maxAmmo += amount;
    }
}
class Pistol extends Gun {
    constructor(texture){
        super(texture);
        this.gunFireSoundFile = `${0, _urlsJs.SOUND_ASSETS_FOLDER}/pistol.mp3`;
        this.reloadSoundFile = `${0, _urlsJs.SOUND_ASSETS_FOLDER}/pistol_reload.mp3`;
        this.reloadDuration = 1000; // milliseconds
        this.mode = "semi-auto";
        this.clipCapacity = 12;
        this.ammoLoaded = this.clipCapacity;
        this.ammoLeft = 60;
        this.maxAmmo = this.ammoLeft;
        this.damage = 25;
    }
    // GETTERS
    loadNorth() {
        const PISTOL = this.createCopy(this.texture, 25, 18, 25, 25);
        PISTOL.scale.y = -1;
        PISTOL.rotation = 4.6;
        return PISTOL;
    }
    loadSouth() {
        const PISTOL = this.createCopy(this.texture, 0, 20, 25, 25);
        PISTOL.scale.y = -1;
        PISTOL.rotation = 1.5;
        return PISTOL;
    }
    loadWest() {
        const PISTOL = this.createCopy(this.texture, 18, 8, 25, 25);
        PISTOL.scale.x = -1;
        return PISTOL;
    }
    loadEast() {
        const PISTOL = this.createCopy(this.texture, 5, 8, 25, 25);
        return PISTOL;
    }
}

},{"../helpers/checks.js":"hGT0N","./base/base.js":"bXEua","../core/hud.js":"3PEGa","../helpers/urls.js":"5skMk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5skMk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "STATIC_FOLDER", ()=>STATIC_FOLDER);
parcelHelpers.export(exports, "STATIC_JS_FOLDER", ()=>STATIC_JS_FOLDER);
parcelHelpers.export(exports, "STATIC_ASSETS_FOLDER", ()=>STATIC_ASSETS_FOLDER);
parcelHelpers.export(exports, "SOUND_ASSETS_FOLDER", ()=>SOUND_ASSETS_FOLDER);
const ABSOLUTE_URL = window.location.href;
const CURRENT_WORKING_DIRECTORY = ABSOLUTE_URL.substring(0, ABSOLUTE_URL.indexOf("/static/"));
const STATIC_FOLDER = `${CURRENT_WORKING_DIRECTORY}/static`;
const STATIC_JS_FOLDER = `${STATIC_FOLDER}/js`;
const STATIC_ASSETS_FOLDER = `${STATIC_FOLDER}/assets`;
const SOUND_ASSETS_FOLDER = `${STATIC_ASSETS_FOLDER}/sounds`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fQRa1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Objects", ()=>Objects);
parcelHelpers.export(exports, "Obstacle", ()=>Obstacle);
parcelHelpers.export(exports, "Decoration", ()=>Decoration);
parcelHelpers.export(exports, "SemiSolid", ()=>SemiSolid);
parcelHelpers.export(exports, "ObstacleFill", ()=>ObstacleFill);
parcelHelpers.export(exports, "DecorationFill", ()=>DecorationFill);
parcelHelpers.export(exports, "SemiSolidFill", ()=>SemiSolidFill);
var _checksJs = require("../helpers/checks.js");
var _baseJs = require("./base/base.js");
class Objects extends (0, _baseJs.Sprite) {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
    }
}
class Obstacle extends Objects {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.detours = {
            "top": [],
            "bottom": [],
            "left": [],
            "right": []
        };
    }
    // GETTERS
    checkIfLeftEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosY() < this.getLeftPosY()) // if the sprite's bottom edge is higher than the object's top edge
        return false;
        else if (sprite.getLeftPosY() > this.getRightPosY()) // if the sprite's top edge is lower than the object's bottom edge
        return false;
        else if (sprite.getRightPosX() < this.getLeftPosX()) // if the sprite's right edge is far from the object's left edge
        return false;
        else if (sprite.getLeftPosX() > this.getLeftPosX()) // if the sprite's left edge is beyond the object's left edge
        return false;
        return true;
    }
    checkIfRightEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosY() < this.getLeftPosY()) // if the sprite's bottom edge is higher than the object's top edge
        return false;
        else if (sprite.getLeftPosY() > this.getRightPosY()) // if the sprite's top edge is lower than the object's bottom edge
        return false;
        else if (sprite.getLeftPosX() > this.getRightPosX()) // if the sprite's left edge is far from the object's right edge
        return false;
        else if (sprite.getRightPosX() < this.getRightPosX()) // if the sprite's right edge is beyond the object's right edge
        return false;
        return true;
    }
    checkIfTopEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosX() < this.getLeftPosX()) // if the sprite's right edge is far from the object's left edge
        return false;
        else if (sprite.getLeftPosX() > this.getRightPosX()) // if the sprite's left edge is far from the object's right edge
        return false;
        else if (sprite.getRightPosY() < this.getLeftPosY()) // if the sprite's bottom edge is higher than the object's top edge
        return false;
        else if (sprite.getLeftPosY() > this.getLeftPosY()) // if the sprite's top edge is beyond the object's top edge
        return false;
        return true;
    }
    checkIfBottomEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosX() < this.getLeftPosX()) // if the sprite's right edge is far from the object's left edge
        return false;
        else if (sprite.getLeftPosX() > this.getRightPosX()) // if the sprite's left edge is far from the object's right edge
        return false;
        else if (sprite.getLeftPosY() > this.getRightPosY()) // if the sprite's top edge is lower than the object's bottom edge
        return false;
        else if (sprite.getRightPosY() < this.getRightPosY()) // if the sprite's bottom edge is beyond the object's bottom edge
        return false;
        return true;
    }
    getDetours(edge) {
        _checksJs.checkIfString(edge);
        return this.detours[edge];
    }
    // SETTERS
    __addDetour__(array_of_points, edge) {
        _checksJs.checkIfArray(array_of_points);
        _checksJs.checkIfString(edge);
        const NUM_OF_ELEMENTS = array_of_points.length;
        for(let i = 0; i < NUM_OF_ELEMENTS; i++){
            const E = array_of_points[i];
            _checksJs.checkIfObject(E);
            if (E.x === undefined || E.y === undefined) throw SyntaxError(`Element ${i} is not a valid point object. It must have an x and a y property`);
            _checksJs.checkIfNumber(E.x);
            _checksJs.checkIfNumber(E.y);
        }
        this.detours[edge].push(array_of_points);
    }
    addBottomEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "bottom");
    }
    addTopEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "top");
    }
    addLeftEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "left");
    }
    addRightEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "right");
    }
}
class Decoration extends Objects {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
    }
}
class SemiSolid extends Obstacle {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.boundaryLeftX = 0;
        this.boundaryLeftY = 0;
        this.boundaryRightX = 0;
        this.boundaryRightY = 0;
    }
    // SETTERS
    modifyCollisionBoundary(leftX, leftY, rightX, rightY) {
        if (leftX !== null && leftX !== undefined) {
            _checksJs.checkIfNumber(leftX);
            this.boundaryLeftX = leftX;
        }
        if (leftY !== null && leftY !== undefined) {
            _checksJs.checkIfNumber(leftY);
            this.boundaryLeftY = leftY;
        }
        if (rightX !== null && rightX !== undefined) {
            _checksJs.checkIfNumber(rightX);
            this.boundaryRightX = rightX;
        }
        if (rightY !== null && rightY !== undefined) {
            _checksJs.checkIfNumber(rightY);
            this.boundaryRightY = rightY;
        }
    }
    // GETTERS
    getLeftPosX() {
        if (this.isFlippedHorizontally) return this.sprite_container.x + this.boundaryLeftX - this.spriteFrameWidth;
        else return this.sprite_container.x + this.boundaryLeftX;
    }
    getLeftPosY() {
        if (this.isFlippedVertically) return this.sprite_container.y + this.boundaryLeftY - this.spriteFrameHeight;
        else return this.sprite_container.y + this.boundaryLeftY;
    }
    getRightPosX() {
        if (this.isFlippedHorizontally) return this.sprite_container.x + this.boundaryLeftX;
        else return this.sprite_container.x + (this.spriteFrameWidth + this.boundaryRightX);
    }
    getRightPosY() {
        if (this.isFlippedVertically) return this.sprite_container.y + this.boundaryLeftY;
        else return this.sprite_container.y + (this.spriteFrameHeight + this.boundaryRightY);
    }
}
class ObstacleFill extends (0, _baseJs.FillSprite) {
    constructor(color, posX, posY, width, height){
        super(color, posX, posY, width, height);
        this.detours = {
            "top": [],
            "bottom": [],
            "left": [],
            "right": []
        };
    }
    // GETTERS
    checkIfLeftEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosY() < this.getLeftPosY()) // if the sprite's bottom edge is higher than the object's top edge
        return false;
        else if (sprite.getLeftPosY() > this.getRightPosY()) // if the sprite's top edge is lower than the object's bottom edge
        return false;
        else if (sprite.getRightPosX() < this.getLeftPosX()) // if the sprite's right edge is far from the object's left edge
        return false;
        else if (sprite.getLeftPosX() > this.getLeftPosX()) // if the sprite's left edge is beyond the object's left edge
        return false;
        return true;
    }
    checkIfRightEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosY() < this.getLeftPosY()) // if the sprite's bottom edge is higher than the object's top edge
        return false;
        else if (sprite.getLeftPosY() > this.getRightPosY()) // if the sprite's top edge is lower than the object's bottom edge
        return false;
        else if (sprite.getLeftPosX() > this.getRightPosX()) // if the sprite's left edge is far from the object's right edge
        return false;
        else if (sprite.getRightPosX() < this.getRightPosX()) // if the sprite's right edge is beyond the object's right edge
        return false;
        return true;
    }
    checkIfTopEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosX() < this.getLeftPosX()) // if the sprite's right edge is far from the object's left edge
        return false;
        else if (sprite.getLeftPosX() > this.getRightPosX()) // if the sprite's left edge is far from the object's right edge
        return false;
        else if (sprite.getRightPosY() < this.getLeftPosY()) // if the sprite's bottom edge is higher than the object's top edge
        return false;
        else if (sprite.getLeftPosY() > this.getLeftPosY()) // if the sprite's top edge is beyond the object's top edge
        return false;
        return true;
    }
    checkIfBottomEdgeCollisionOccurred(sprite) {
        _checksJs.checkIfInstance(sprite, (0, _baseJs.Sprite));
        if (sprite.getRightPosX() < this.getLeftPosX()) // if the sprite's right edge is far from the object's left edge
        return false;
        else if (sprite.getLeftPosX() > this.getRightPosX()) // if the sprite's left edge is far from the object's right edge
        return false;
        else if (sprite.getLeftPosY() > this.getRightPosY()) // if the sprite's top edge is lower than the object's bottom edge
        return false;
        else if (sprite.getRightPosY() < this.getRightPosY()) // if the sprite's bottom edge is beyond the object's bottom edge
        return false;
        return true;
    }
    getDetours(edge) {
        _checksJs.checkIfString(edge);
        return this.detours[edge];
    }
    // SETTERS
    __addDetour__(array_of_points, edge) {
        _checksJs.checkIfArray(array_of_points);
        _checksJs.checkIfString(edge);
        const NUM_OF_ELEMENTS = array_of_points.length;
        for(let i = 0; i < NUM_OF_ELEMENTS; i++){
            const E = array_of_points[i];
            _checksJs.checkIfObject(E);
            if (E.x === undefined || E.y === undefined) throw SyntaxError(`Element ${i} is not a valid point object. It must have an x and a y property`);
            _checksJs.checkIfNumber(E.x);
            _checksJs.checkIfNumber(E.y);
        }
        this.detours[edge].push(array_of_points);
    }
    addBottomEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "bottom");
    }
    addTopEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "top");
    }
    addLeftEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "left");
    }
    addRightEdgeDetour(array_of_points) {
        this.__addDetour__(array_of_points, "right");
    }
}
class DecorationFill extends (0, _baseJs.FillSprite) {
    constructor(color, posX, posY, width, height){
        super(color, posX, posY, width, height);
    }
}
class SemiSolidFill extends ObstacleFill {
    constructor(color, posX, posY, width, height){
        super(color, posX, posY, width, height);
        this.boundaryLeftX = 0;
        this.boundaryLeftY = 0;
        this.boundaryRightX = 0;
        this.boundaryRightY = 0;
    }
    // SETTERS
    modifyCollisionBoundary(leftX, leftY, rightX, rightY) {
        if (leftX !== null && leftX !== undefined) {
            _checksJs.checkIfNumber(leftX);
            this.boundaryLeftX = leftX;
        }
        if (leftY !== null && leftY !== undefined) {
            _checksJs.checkIfNumber(leftY);
            this.boundaryLeftY = leftY;
        }
        if (rightX !== null && rightX !== undefined) {
            _checksJs.checkIfNumber(rightX);
            this.boundaryRightX = rightX;
        }
        if (rightY !== null && rightY !== undefined) {
            _checksJs.checkIfNumber(rightY);
            this.boundaryRightY = rightY;
        }
    }
    // GETTERS
    getLeftPosX() {
        return this.sprite.x + this.boundaryLeftX;
    }
    getLeftPosY() {
        return this.sprite.y + this.boundaryLeftY;
    }
    getRightPosX() {
        return this.sprite.x + (this.fillWidth + this.boundaryRightX);
    }
    getRightPosY() {
        return this.sprite.y + (this.fillHeight + this.boundaryRightY);
    }
}

},{"../helpers/checks.js":"hGT0N","./base/base.js":"bXEua","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l0hrc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showDeathScreen", ()=>showDeathScreen);
const DEATH_SCREEN = document.getElementById("death-screen");
DEATH_SCREEN.addEventListener("click", (event)=>{
    const ELEMENT_CLICKED = event.target;
    if (ELEMENT_CLICKED.tagName === "BUTTON") {
        const ACTION = ELEMENT_CLICKED.getAttribute("data-action");
        ACTION;
    }
});
function showDeathScreen() {
    window.GAME_PAUSED = true;
    DEATH_SCREEN.classList.remove("hide");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a1CCR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "INTERACTABLES", ()=>INTERACTABLES);
parcelHelpers.export(exports, "Interactable", ()=>Interactable);
parcelHelpers.export(exports, "AmmoCache", ()=>AmmoCache);
parcelHelpers.export(exports, "UpgradeBench", ()=>UpgradeBench);
var _checksJs = require("../helpers/checks.js");
var _entitiesJs = require("./entities.js");
var _objectsJs = require("./objects.js");
var _weaponsJs = require("./weapons.js");
const INTERACTABLES = [];
class Interactable extends (0, _objectsJs.Objects) {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.areaOfEffect = 20; // adds extra area for the interactble range
    }
    // GETTERS
    playerIsNearInteractable(player) {
        _checksJs.checkIfInstance(player, (0, _entitiesJs.Player));
        const PLAYER_CENTER = player.getCenterCoordinates();
        const PLAYER_INSIDE_LR_EDGES = PLAYER_CENTER.x > this.getLeftPosX() - this.areaOfEffect && PLAYER_CENTER.x < this.getRightPosX() + this.areaOfEffect;
        const PLAYER_INSIDE_TB_EDGES = PLAYER_CENTER.y > this.getLeftPosY() - this.areaOfEffect && PLAYER_CENTER.y < this.getRightPosY() + this.areaOfEffect;
        if (PLAYER_INSIDE_LR_EDGES && PLAYER_INSIDE_TB_EDGES) return true;
        return false;
    }
    // SETTERS
    setAreaOfEffect(value) {
        _checksJs.checkIfNumber(value);
        this.areaOfEffect = value;
    }
}
class AmmoCache extends Interactable {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.pointCost = 500;
    }
    // SETTERS
    resupply(gun) {
        _checksJs.checkIfInstance(gun, (0, _weaponsJs.Gun));
        gun.addMaxAmmo(gun.getMaxAmmo());
        gun.playReloadSound();
    }
}
class UpgradeBench extends Interactable {
    constructor(texture, posX, posY, frameWidth, frameHeight){
        super(texture, posX, posY, frameWidth, frameHeight);
        this.pointCost = 1000;
    }
    upgradeGun(gun, option) {
        _checksJs.checkIfInstance(gun, (0, _weaponsJs.Gun));
        //true = upgrade ammo, false = upgrade damage
        if (option) {
            gun.increaseMaxAmmo(10);
            gun.increaseClipCapacity(3);
        } else gun.increaseDamage(10);
    }
}

},{"../helpers/checks.js":"hGT0N","./entities.js":"77n58","./objects.js":"fQRa1","./weapons.js":"gRu1U","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7dDrd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "PORTALS", ()=>PORTALS);
parcelHelpers.export(exports, "Portal", ()=>Portal);
parcelHelpers.export(exports, "PortalFill", ()=>PortalFill);
var _checksJs = require("../helpers/checks.js");
var _creationJs = require("../map/creation.js");
var _entitiesJs = require("./entities.js");
var _objectsJs = require("./objects.js");
const PORTALS = [];
class Portal extends (0, _objectsJs.Decoration) {
    constructor(origin, texture, posX, posY, frameWidth, frameHeight){
        _checksJs.checkIfInstance(origin, (0, _creationJs.PlayableArea));
        super(texture, posX, posY, frameWidth, frameHeight);
        this.origin = origin;
        this.destination = null;
        this.dest_X = null;
        this.dest_Y = null;
    }
    // GETTERS
    playerIsInsidePortal(player) {
        _checksJs.checkIfInstance(player, (0, _entitiesJs.Player));
        const PLAYER_CENTER = player.getCenterCoordinates();
        if (PLAYER_CENTER.x > this.getLeftPosX() && PLAYER_CENTER.x < this.getRightPosX() && PLAYER_CENTER.y > this.getLeftPosY() && PLAYER_CENTER.y < this.getRightPosY()) return true;
        return false;
    }
    // SETTERS
    setDestination(playableArea, x, y) {
        _checksJs.checkIfInstance(playableArea, (0, _creationJs.PlayableArea));
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        this.destination = playableArea;
        this.dest_X = x;
        this.dest_Y = y;
    }
    teleport(player) {
        _checksJs.checkIfInstance(player, (0, _entitiesJs.Player));
        const GAME_STAGE = this.origin.area.parent;
        this.origin.unload();
        GAME_STAGE.removeChild(this.origin.area);
        GAME_STAGE.addChild(this.destination.load());
        this.destination.addDynamicSprite(player, "player", this.dest_X, this.dest_Y);
    }
}
class PortalFill extends (0, _objectsJs.DecorationFill) {
    constructor(origin, color, posX, posY, width, height){
        _checksJs.checkIfInstance(origin, (0, _creationJs.PlayableArea));
        super(color, posX, posY, width, height);
        this.origin = origin;
        this.destination = null;
        this.dest_X = null;
        this.dest_Y = null;
    }
    // GETTERS
    playerIsInsidePortal(player) {
        _checksJs.checkIfInstance(player, (0, _entitiesJs.Player));
        const PLAYER_CENTER = player.getCenterCoordinates();
        if (PLAYER_CENTER.x > this.getLeftPosX() && PLAYER_CENTER.x < this.getRightPosX() && PLAYER_CENTER.y > this.getLeftPosY() && PLAYER_CENTER.y < this.getRightPosY()) return true;
        return false;
    }
    // SETTERS
    setDestination(playableArea, x, y) {
        _checksJs.checkIfInstance(playableArea, (0, _creationJs.PlayableArea));
        _checksJs.checkIfNumber(x);
        _checksJs.checkIfNumber(y);
        this.destination = playableArea;
        this.dest_X = x;
        this.dest_Y = y;
    }
    teleport(player) {
        _checksJs.checkIfInstance(player, (0, _entitiesJs.Player));
        const GAME_STAGE = this.origin.area.parent;
        this.origin.unload();
        GAME_STAGE.removeChild(this.origin.area);
        GAME_STAGE.addChild(this.destination.load());
        this.destination.addDynamicSprite(player, "player", this.dest_X, this.dest_Y);
    }
}

},{"../helpers/checks.js":"hGT0N","../map/creation.js":"ibUM7","./entities.js":"77n58","./objects.js":"fQRa1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bZOjp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getTextureFromStaticJSFolder", ()=>getTextureFromStaticJSFolder);
parcelHelpers.export(exports, "getTextureFromStaticAssetsFolder", ()=>getTextureFromStaticAssetsFolder);
var _checksJs = require("./checks.js");
var _urlsJs = require("./urls.js");
function getTextureFromStaticJSFolder(path) {
    _checksJs.checkIfString(path);
    if (path[0] !== "/") throw ReferenceError("Paths must start with /");
    return PIXI.Texture.from(`${(0, _urlsJs.STATIC_JS_FOLDER)}${path}`);
}
function getTextureFromStaticAssetsFolder(path) {
    _checksJs.checkIfString(path);
    if (path[0] !== "/") throw ReferenceError("Paths must start with /");
    return PIXI.Texture.from(`${(0, _urlsJs.STATIC_ASSETS_FOLDER)}${path}`);
}

},{"./checks.js":"hGT0N","./urls.js":"5skMk","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bjs5C":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LIBRARY", ()=>LIBRARY);
var _creationJs = require("../creation.js");
var _pixiHelpersJs = require("../../helpers/pixi_helpers.js");
var _portalsJs = require("../../sprites/portals.js");
var _objectsJs = require("../../sprites/objects.js");
const LIBRARY = function() {
    const LIBRARY = new (0, _creationJs.PlayableArea)(512, 256);
    LIBRARY.addEnemySpawnPoint(LIBRARY.getHalfWidth() + 130, 50);
    LIBRARY.addEnemySpawnPoint(LIBRARY.getHalfWidth(), LIBRARY.getHeight() - 30);
    const FLOOR = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/libraryfloor.png"), 0, 0, 512, 256);
    LIBRARY.addStaticSprite(FLOOR, "libraryfloor", 0, 0);
    const BARRIER_1 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, LIBRARY.getWidth(), 10);
    BARRIER_1.modifyCollisionBoundary(null, null, null, -BARRIER_1.getHalfHeight());
    LIBRARY.addStaticSprite(BARRIER_1, "barrier1", 0, -BARRIER_1.getFillDimensions().h);
    const BARRIER_2 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, LIBRARY.getWidth(), 10);
    LIBRARY.addStaticSprite(BARRIER_2, "barrier2", 0, LIBRARY.getHeight());
    const BARRIER_3 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, 10, LIBRARY.getHeight());
    BARRIER_3.modifyCollisionBoundary(null, null, -3, null);
    LIBRARY.addStaticSprite(BARRIER_3, "barrier3", -BARRIER_3.getFillDimensions().w, 0);
    const BARRIER_4 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, 10, LIBRARY.getHeight());
    BARRIER_4.modifyCollisionBoundary(-3, null, null, null);
    LIBRARY.addStaticSprite(BARRIER_4, "barrier4", LIBRARY.getWidth(), 0);
    const SECOND_FLOOR_MAT = new (0, _portalsJs.Portal)(LIBRARY, (0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/mat2.png"), 0, 0, 32, 34);
    LIBRARY.addStaticSprite(SECOND_FLOOR_MAT, "2f_mat", LIBRARY.getWidth() - (SECOND_FLOOR_MAT.getSpriteFrameDimensions().w + 495), 20);
    const BOOKSHELF_1 = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/bookshelf.png"), 0, 0, 95, 97);
    BOOKSHELF_1.modifyCollisionBoundary(null, BOOKSHELF_1.getSpriteFrameDimensions().h - 30, null, null);
    LIBRARY.addDynamicSprite(BOOKSHELF_1, "bookshelf1", LIBRARY.getWidth() - BOOKSHELF_1.getSpriteFrameDimensions().w, LIBRARY.getHeight() - (BOOKSHELF_1.getSpriteFrameDimensions().h + 50));
    const BOOKSHELF_2 = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/bookshelf.png"), 0, 0, 95, 97);
    BOOKSHELF_2.modifyCollisionBoundary(null, BOOKSHELF_2.getSpriteFrameDimensions().h - 30, null, null);
    LIBRARY.addDynamicSprite(BOOKSHELF_2, "bookshelf2", LIBRARY.getWidth() - BOOKSHELF_2.getSpriteFrameDimensions().w, 0);
    const CHAIR_A = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/chairA.png"), 0, 0, 75, 48);
    LIBRARY.addStaticSprite(CHAIR_A, "chairA", 20, LIBRARY.getHeight() - (CHAIR_A.getSpriteFrameDimensions().h + 15));
    const CHAIR_B = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/chairB.png"), 0, 0, 48, 75);
    CHAIR_B.modifyCollisionBoundary(null, 40, null, null);
    LIBRARY.addDynamicSprite(CHAIR_B, "chairB", 130, LIBRARY.getHeight() - (CHAIR_B.getSpriteFrameDimensions().h + 75));
    const MATBLUE = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/matBlue.png"), 0, 0, 71, 54);
    LIBRARY.addStaticSprite(MATBLUE, "matblue", 120, LIBRARY.getHeight() - (MATBLUE.getSpriteFrameDimensions().h + 12));
    const TABLELAMP = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/tableLamp.png"), 0, 0, 95, 66);
    TABLELAMP.modifyCollisionBoundary(null, 30, null, null);
    LIBRARY.addDynamicSprite(TABLELAMP, "tablelamp", 10, LIBRARY.getHeight() - (TABLELAMP.getSpriteFrameDimensions().h + 80));
    const WINDOWS = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/library/assets/window.png"), 0, 0, 525, 75);
    LIBRARY.addStaticSprite(WINDOWS, "window", -6, -(WINDOWS.getSpriteFrameDimensions().h - 5));
    return LIBRARY;
}();

},{"../creation.js":"ibUM7","../../helpers/pixi_helpers.js":"bZOjp","../../sprites/portals.js":"7dDrd","../../sprites/objects.js":"fQRa1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7XqC1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BASEMENT", ()=>BASEMENT);
var _creationJs = require("../creation.js");
var _pixiHelpersJs = require("../../helpers/pixi_helpers.js");
var _portalsJs = require("../../sprites/portals.js");
var _objectsJs = require("../../sprites/objects.js");
var _interactable = require("../../sprites/interactable");
const BASEMENT = function() {
    const BASEMENT = new (0, _creationJs.PlayableArea)(555, 441);
    BASEMENT.addEnemySpawnPoint(50, 50);
    BASEMENT.addEnemySpawnPoint(50, BASEMENT.getHeight() - 150);
    BASEMENT.addEnemySpawnPoint(280, BASEMENT.getHeight() - 30);
    const FLOOR = new (0, _objectsJs.Decoration)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/basement/assets/basefloor.png"), 0, 0, 555, 441);
    BASEMENT.addStaticSprite(FLOOR, "floor", 0, 0);
    const BARRIER_1 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, BASEMENT.getWidth(), 10);
    BARRIER_1.modifyCollisionBoundary(null, null, null, -BARRIER_1.getHalfHeight());
    BASEMENT.addStaticSprite(BARRIER_1, "barrier1", 0, -BARRIER_1.getFillDimensions().h);
    const BARRIER_2 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, BASEMENT.getWidth(), 10);
    BASEMENT.addStaticSprite(BARRIER_2, "barrier2", 0, BASEMENT.getHeight());
    const BARRIER_3 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, 10, BASEMENT.getHeight());
    BARRIER_3.modifyCollisionBoundary(null, null, -3, null);
    BASEMENT.addStaticSprite(BARRIER_3, "barrier3", -BARRIER_3.getFillDimensions().w, 0);
    const BARRIER_4 = new (0, _objectsJs.SemiSolidFill)(0x000000, 0, 0, 10, BASEMENT.getHeight());
    BARRIER_4.modifyCollisionBoundary(-3, null, null, null);
    BASEMENT.addStaticSprite(BARRIER_4, "barrier4", BASEMENT.getWidth(), 0);
    const DOUBLE_DOOR = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/basement/assets/baseelevator.png"), 0, 0, 96, 48);
    BASEMENT.addStaticSprite(DOUBLE_DOOR, "double_door", BASEMENT.getHalfWidth() - DOUBLE_DOOR.getHalfWidth(), -(DOUBLE_DOOR.getSpriteFrameDimensions().h + 1));
    const ELEVATOR = new (0, _portalsJs.PortalFill)(BASEMENT, 0xff0000, 0, 0, DOUBLE_DOOR.getSpriteFrameDimensions().w, 35);
    ELEVATOR.setAlpha(0);
    BASEMENT.addStaticSprite(ELEVATOR, "elevator", DOUBLE_DOOR.getLeftPosX(), DOUBLE_DOOR.getRightPosY());
    const COUCH = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/basement/assets/basecouch.png"), 0, 0, 143, 165);
    COUCH.modifyCollisionBoundary(null, 10, null, null);
    BASEMENT.addStaticSprite(COUCH, "basecouch", BASEMENT.getHalfWidth() + COUCH.getHalfWidth(), BASEMENT.getHeight() - (COUCH.getSpriteFrameDimensions().h + 90));
    const FIREPLACE = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/basement/assets/fireplace.png"), 0, 0, 94, 116);
    FIREPLACE.modifyCollisionBoundary(null, 30, null, -10);
    BASEMENT.addStaticSprite(FIREPLACE, "fireplace", BASEMENT.getHalfWidth() + COUCH.getHalfWidth(), BASEMENT.getHeight() - (COUCH.getSpriteFrameDimensions().h + 250));
    const BROKEN_CUPBOARD = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/basement/assets/brokencupboard.png"), 0, 0, 80, 108);
    BASEMENT.addStaticSprite(BROKEN_CUPBOARD, "brokencupboard", BASEMENT.getWidth() - (BROKEN_CUPBOARD.getSpriteFrameDimensions().w + 450), BASEMENT.getHeight() - (BROKEN_CUPBOARD.getSpriteFrameDimensions().h + 5));
    const STACKED_CUPBOARD = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/basement/assets/stackedcupboard.png"), 0, 0, 48, 107);
    BASEMENT.addStaticSprite(STACKED_CUPBOARD, "stackedcupboard", BASEMENT.getWidth() - (STACKED_CUPBOARD.getSpriteFrameDimensions().w + 400), BASEMENT.getHeight() - (STACKED_CUPBOARD.getSpriteFrameDimensions().h + 5));
    const OPEN_CHEST = new (0, _objectsJs.SemiSolid)((0, _pixiHelpersJs.getTextureFromStaticJSFolder)("/map/basement/assets/openchest.png"), 0, 0, 59, 63);
    BASEMENT.addStaticSprite(OPEN_CHEST, "openchest", BASEMENT.getWidth() - (OPEN_CHEST.getSpriteFrameDimensions().w + 340), BASEMENT.getHeight() - (OPEN_CHEST.getSpriteFrameDimensions().h + 5));
    const UPGRADE_BENCH = new (0, _interactable.UpgradeBench)((0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/consumables/ammoCache.png"), 240, 140, 50, 50);
    BASEMENT.addStaticSprite(UPGRADE_BENCH, "upgrade_bench1", 240, 120);
    return BASEMENT;
}();

},{"../creation.js":"ibUM7","../../helpers/pixi_helpers.js":"bZOjp","../../sprites/portals.js":"7dDrd","../../sprites/objects.js":"fQRa1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../../sprites/interactable":"a1CCR"}],"hc8XD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Inventory", ()=>Inventory);
var _checksJs = require("../helpers/checks.js");
var _baseJs = require("../sprites/base/base.js");
var _weaponsJs = require("../sprites/weapons.js");
var _entitiesJs = require("../sprites/entities.js");
var _hudJs = require("./hud.js");
class Inventory {
    constructor(player, texture, posX, posY, selection_texture){
        _checksJs.checkIfInstance(player, (0, _entitiesJs.Player));
        _checksJs.checkIfInstance(texture, PIXI.Texture);
        _checksJs.checkIfNumber(posX);
        _checksJs.checkIfNumber(posY);
        _checksJs.checkIfInstance(selection_texture, PIXI.Texture);
        this.sprite = new PIXI.Sprite(texture);
        this.inventory = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ];
        this.currentSelItem = null;
        this.inventoryContainer = new PIXI.Container();
        this.inventoryContainer.x = posX;
        this.inventoryContainer.y = posY;
        this.selectorSprite = new PIXI.Sprite(selection_texture);
        this.selectorSprite.x = -2;
        this.selectorSprite.y = -2;
        this.selectorSprite.width = 36;
        this.selectorSprite.height = 36;
        this.inventoryContainer.addChild(this.sprite, this.selectorSprite);
        this.player = player;
    }
    // GETTERS
    ___getPositionInInventory__(index) {
        // returns x-coordinate of item
        _checksJs.checkIfNumber(index);
        return -2 + (this.selectorSprite.width - 4) * (index - 1);
    }
    display() {
        return this.inventoryContainer;
    }
    getSelItem() {
        return this.currentSelItem;
    }
    // SETTERS
    addItem(item) {
        _checksJs.checkIfInstance(item, (0, _baseJs.Item));
        const ICON = item.getIcon();
        this.inventoryContainer.addChild(ICON);
        const NUM_OF_ITEMS_IN_INVENTORY = this.inventory.length;
        let stored = false;
        for(let i = 0; i < NUM_OF_ITEMS_IN_INVENTORY; i++){
            if (this.inventory[i] === null) {
                this.inventory.splice(i, 1, item);
                ICON.x = this.___getPositionInInventory__(i + 1) + 2;
                stored = true;
                break;
            }
            i === NUM_OF_ITEMS_IN_INVENTORY && stored;
        }
    }
    changeSelItem(index) {
        this.player.unequip();
        const SELECTED_ITEM = this.inventory[index - 1];
        this.currentSelItem = SELECTED_ITEM;
        if (SELECTED_ITEM instanceof (0, _baseJs.Item)) {
            this.player.equip(SELECTED_ITEM);
            if (SELECTED_ITEM instanceof (0, _weaponsJs.Gun)) (0, _hudJs.updateAmmoCount)(SELECTED_ITEM);
            else (0, _hudJs.hideAmmoCount)();
        } else (0, _hudJs.hideAmmoCount)();
        this.selectorSprite.x = this.___getPositionInInventory__(index);
    }
    removeSelItem() {
        const ICON = this.currentSelItem.getIcon();
        const POS_IN_INVENTORY = this.inventoryContainer.getChildIndex(ICON) - 2;
        this.inventoryContainer.removeChild(ICON);
        this.inventory.splice(POS_IN_INVENTORY, 1, null);
        this.currentSelItem = null;
    }
}

},{"../helpers/checks.js":"hGT0N","../sprites/base/base.js":"bXEua","../sprites/weapons.js":"gRu1U","../sprites/entities.js":"77n58","./hud.js":"3PEGa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9sJQQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "WaveSystem", ()=>WaveSystem);
var _checksJs = require("../helpers/checks.js");
var _creationJs = require("../map/creation.js");
var _waveJs = require("./Wave.js");
var _collisionJs = require("./collision.js");
var _urlsJs = require("../helpers/urls.js");
var _clothedZombieJson = require("../../assets/sprite_sheets/enemies/clothed_zombie.json");
var _clothedZombieJsonDefault = parcelHelpers.interopDefault(_clothedZombieJson);
class WaveSystem {
    constructor(starting_map, waves, batch_delay){
        _checksJs.checkIfInstance(starting_map, (0, _creationJs.PlayableArea));
        _checksJs.checkIfArray(waves);
        if (waves.length === 0) throw Error("Waves cannot be empty.");
        waves.every((wave)=>{
            if (wave instanceof (0, _waveJs.Wave) === false) throw TypeError("All waves must be an instance of the Wave class.");
        });
        _checksJs.checkIfNumber(batch_delay);
        this.map = starting_map;
        this.spawnPoints = starting_map.getEnemySpawnPoints(); // array containing {x: ?, y: ?}
        this.current_wave_index = 0;
        this.waves = waves;
        this.current_wave = this.waves[0];
        this.next_wave_timeout = null;
        this.next_wave_delay = 3000;
        this.batch_delay = batch_delay;
        this.isBatchDone = false;
        this.time = 0;
        this.music = new Audio(`${(0, _urlsJs.STATIC_ASSETS_FOLDER)}/sounds/haunted-harpsichord.mp3`);
        this.music.volume = 0.1;
    }
    // GETTERS
    getRandomInt(min, max) {
        _checksJs.checkIfNumber(min);
        _checksJs.checkIfNumber(max);
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    checkIfBatchDone() {
        this.isBatchDone = Math.floor(Date.now() / 1000) - this.time >= this.batch_delay;
        return this.isBatchDone;
    }
    // SETTERS
    setWaveDelay(delay) {
        _checksJs.checkIfNumber(delay);
        this.next_wave_delay = delay;
    }
    updatePlayableArea(playableArea) {
        _checksJs.checkIfInstance(playableArea, (0, _creationJs.PlayableArea));
        this.map = playableArea;
        this.spawnPoints = playableArea.getEnemySpawnPoints();
    }
    moveToNextWaveIfFinished() {
        if (this.next_wave_timeout === null && (0, _collisionJs.NON_PLAYER_ENTITIES).length === 0 && this.current_wave_index + 1 < this.waves.length) {
            this.waves.splice(this.waves.indexOf(this.current_wave), 1, null); // the instance of the finished wave is thrown in the garbage collector
            this.next_wave_timeout = setTimeout(()=>{
                this.current_wave_index++;
                this.current_wave = this.waves[this.current_wave_index];
                this.next_wave_timeout = null;
            }, this.next_wave_delay);
        }
    }
    spawnNextBatch() {
        let toSpawn = this.current_wave.getNextBatch();
        for(let i = 0; i < toSpawn.length; i++){
            const ENEMY = toSpawn[i];
            const ENEMY_DIMENSIONS = ENEMY.getSpriteFrameDimensions();
            ENEMY.addFrames((0, _clothedZombieJsonDefault.default));
            ENEMY.switchFrame("n");
            const SPAWN_LOCATION = this.spawnPoints[this.getRandomInt(0, this.spawnPoints.length - 1)];
            this.map.addDynamicSprite(ENEMY, (Date.now() * (i + 1)).toString(), SPAWN_LOCATION.x - ENEMY_DIMENSIONS.w, SPAWN_LOCATION.y - ENEMY_DIMENSIONS.h);
            ENEMY.sprite.alpha = 0; // prepares for fade-in animation
            this.time = Math.floor(Date.now() / 1000); // gets time zombies spawned
        }
    }
    respawnBatch() {
        const NUM_OF_ENEMIES_LEFT = (0, _collisionJs.NON_PLAYER_ENTITIES).length;
        if (NUM_OF_ENEMIES_LEFT > 0) for(let i = 0; i < NUM_OF_ENEMIES_LEFT; i++){
            const ENEMY = (0, _collisionJs.NON_PLAYER_ENTITIES)[i];
            const ENEMY_DIMENSIONS = ENEMY.getSpriteFrameDimensions();
            const SPAWN_LOCATION = this.spawnPoints[this.getRandomInt(0, this.spawnPoints.length - 1)];
            this.map.addDynamicSprite(ENEMY, `zombie${i}`, SPAWN_LOCATION.x - ENEMY_DIMENSIONS.w, SPAWN_LOCATION.y - ENEMY_DIMENSIONS.h);
            ENEMY.sprite.alpha = 0;
            this.time = Math.floor(Date.now() / 1000);
        }
    }
    enemySpawnFadeIn() {
        const NUM_OF_NPE = (0, _collisionJs.NON_PLAYER_ENTITIES).length;
        if (NUM_OF_NPE > 0) for(let i = 0; i < NUM_OF_NPE; i++){
            const ENEMY = (0, _collisionJs.NON_PLAYER_ENTITIES)[i].sprite;
            if (ENEMY.alpha < 1) ENEMY.alpha += 0.01;
        }
    }
    playMusic() {
        if (this.music.paused) this.music.play();
    }
}

},{"../helpers/checks.js":"hGT0N","../map/creation.js":"ibUM7","./Wave.js":"eNy6a","./collision.js":"3zsV5","../helpers/urls.js":"5skMk","../../assets/sprite_sheets/enemies/clothed_zombie.json":"BzaM9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eNy6a":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Wave", ()=>Wave);
var _checksJs = require("../helpers/checks.js");
var _entitiesJs = require("../sprites/entities.js");
var _pixiHelpersJs = require("../helpers/pixi_helpers.js");
var _clothedZombieJson = require("../../assets/sprite_sheets/enemies/clothed_zombie.json");
var _clothedZombieJsonDefault = parcelHelpers.interopDefault(_clothedZombieJson);
class Wave {
    constructor(id, batches, difficultyMod){
        _checksJs.checkIfArray(batches);
        this.id = id; // unused as of now, might be useful later
        this.batches = batches; // an array containing the number of zombies to spawn in each batch i.e. [3, 5, 7] would spawn 3 zombies, then 5, then 7
        // this.zombieTypes = zombieTypes todo if we have more zombie types
        this.difficultyMod = difficultyMod; // unused as of now, later I will add interaction with the zombies' stats
        this.currentBatch = 0;
        this.toSpawnNext = [];
    }
    // GETTERS
    getNextBatch() {
        // generates an array containing all zombies to be spawned based of the numbers in this.batches
        this.toSpawnNext = [];
        if (this.currentBatch >= this.batches.length) return 0;
        else {
            for(let i = 0; i < this.batches[this.currentBatch]; i++){
                const ZOMBIE = new (0, _entitiesJs.Zombie)((0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/sprite_sheets/enemies/clothed_zombie.png"), 0, 0, (0, _clothedZombieJsonDefault.default).s.w, (0, _clothedZombieJsonDefault.default).s.h);
                this.toSpawnNext.push(ZOMBIE);
            }
            this.currentBatch++;
            return this.toSpawnNext;
        }
    }
}

},{"../helpers/checks.js":"hGT0N","../sprites/entities.js":"77n58","../helpers/pixi_helpers.js":"bZOjp","../../assets/sprite_sheets/enemies/clothed_zombie.json":"BzaM9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"BzaM9":[function(require,module,exports) {
module.exports = JSON.parse('{"el":{"x":0,"y":0,"w":30,"h":46},"er":{"x":33,"y":1,"w":29,"h":46},"e":{"x":64,"y":1,"w":29,"h":47},"nl":{"x":95,"y":1,"w":30,"h":46},"nr":{"x":127,"y":1,"w":30,"h":46},"n":{"x":159,"y":1,"w":29,"h":47},"sl":{"x":190,"y":1,"w":30,"h":46},"sr":{"x":222,"y":1,"w":30,"h":46},"s":{"x":254,"y":1,"w":29,"h":46},"wl":{"x":285,"y":1,"w":29,"h":46},"w":{"x":316,"y":1,"w":29,"h":47},"wr":{"x":347,"y":1,"w":29,"h":46}}');

},{}],"b2oXW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showPauseMenu", ()=>showPauseMenu);
parcelHelpers.export(exports, "hidePauseMenu", ()=>hidePauseMenu);
const PAUSE_MENU = document.getElementById("pause");
PAUSE_MENU.addEventListener("click", (event)=>{
    const ELEMENT_CLICKED = event.target;
    if (ELEMENT_CLICKED.tagName === "BUTTON") {
        const ACTION = ELEMENT_CLICKED.getAttribute("data-action");
        if (ACTION === "resume") hidePauseMenu();
        else ACTION;
    }
});
function showPauseMenu() {
    window.GAME_PAUSED = true;
    PAUSE_MENU.classList.remove("hide");
}
function hidePauseMenu() {
    window.GAME_PAUSED = false;
    PAUSE_MENU.classList.add("hide");
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kdffl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HealingItem", ()=>HealingItem);
parcelHelpers.export(exports, "BandageBox", ()=>BandageBox);
var _checksJs = require("../helpers/checks.js");
var _baseJs = require("./base/base.js");
var _pixiHelpersJs = require("../helpers/pixi_helpers.js");
var _entitiesJs = require("./entities.js");
class HealingItem extends (0, _baseJs.Item) {
    constructor(texture){
        super(texture);
    }
    // SETTERS
    heal(player) {
        _checksJs.checkIfInstance(player, (0, _entitiesJs.Player));
        player.increaseHealth(this.health);
    }
}
class BandageBox extends HealingItem {
    constructor(){
        super((0, _pixiHelpersJs.getTextureFromStaticAssetsFolder)("/consumables/bandage_box.png"));
        this.health = 20;
    }
}

},{"../helpers/checks.js":"hGT0N","./base/base.js":"bXEua","../helpers/pixi_helpers.js":"bZOjp","./entities.js":"77n58","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c7kyU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MOVEMENT_KEY_STATUSES", ()=>MOVEMENT_KEY_STATUSES);
parcelHelpers.export(exports, "checkForCollisionsAndMovePlayer", ()=>checkForCollisionsAndMovePlayer);
var _checksJs = require("../helpers/checks.js");
var _entitiesJs = require("../sprites/entities.js");
var _collisionJs = require("../core/collision.js");
const MOVEMENT_KEY_STATUSES = {
    w: false,
    s: false,
    a: false,
    d: false
};
function checkForCollisionsAndMovePlayer(sprite) {
    _checksJs.checkIfInstance(sprite, (0, _entitiesJs.Player));
    if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.d) {
        const COLLIDED_WITH_A_TOP_EDGE = (0, _collisionJs.checkCollisionWithTopEdgesOfObstacles)(sprite).status;
        const COLLIDED_WITH_A_LEFT_EDGE = (0, _collisionJs.checkCollisionWithLeftEdgesOfObstacles)(sprite).status;
        if (COLLIDED_WITH_A_TOP_EDGE === false && COLLIDED_WITH_A_LEFT_EDGE === false) sprite.moveSpriteSouthEast();
        else if (COLLIDED_WITH_A_TOP_EDGE && COLLIDED_WITH_A_LEFT_EDGE === false) sprite.moveSpriteEast();
        else if (COLLIDED_WITH_A_LEFT_EDGE && COLLIDED_WITH_A_TOP_EDGE === false) sprite.moveSpriteSouth();
    } else if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.a) {
        const COLLIDED_WITH_A_TOP_EDGE = (0, _collisionJs.checkCollisionWithTopEdgesOfObstacles)(sprite).status;
        const COLLIDED_WITH_A_RIGHT_EDGE = (0, _collisionJs.checkCollisionWithRightEdgesOfObstacles)(sprite).status;
        if (COLLIDED_WITH_A_TOP_EDGE === false && COLLIDED_WITH_A_RIGHT_EDGE === false) sprite.moveSpriteSouthWest();
        else if (COLLIDED_WITH_A_TOP_EDGE && COLLIDED_WITH_A_RIGHT_EDGE === false) sprite.moveSpriteWest();
        else if (COLLIDED_WITH_A_RIGHT_EDGE && COLLIDED_WITH_A_TOP_EDGE === false) sprite.moveSpriteSouth();
    } else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.d) {
        const COLLIDED_WITH_A_BOTTOM_EDGE = (0, _collisionJs.checkCollisionWithBottomEdgesOfObstacles)(sprite).status;
        const COLLIDED_WITH_A_LEFT_EDGE = (0, _collisionJs.checkCollisionWithLeftEdgesOfObstacles)(sprite).status;
        if (COLLIDED_WITH_A_BOTTOM_EDGE === false && COLLIDED_WITH_A_LEFT_EDGE === false) sprite.moveSpriteNorthEast();
        else if (COLLIDED_WITH_A_BOTTOM_EDGE && COLLIDED_WITH_A_LEFT_EDGE === false) sprite.moveSpriteEast();
        else if (COLLIDED_WITH_A_LEFT_EDGE && COLLIDED_WITH_A_BOTTOM_EDGE === false) sprite.moveSpriteNorth();
    } else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.a) {
        const COLLIDED_WITH_A_BOTTOM_EDGE = (0, _collisionJs.checkCollisionWithBottomEdgesOfObstacles)(sprite).status;
        const COLLIDED_WITH_A_RIGHT_EDGE = (0, _collisionJs.checkCollisionWithRightEdgesOfObstacles)(sprite).status;
        if (COLLIDED_WITH_A_BOTTOM_EDGE === false && COLLIDED_WITH_A_RIGHT_EDGE === false) sprite.moveSpriteNorthWest();
        else if (COLLIDED_WITH_A_BOTTOM_EDGE && COLLIDED_WITH_A_RIGHT_EDGE === false) sprite.moveSpriteWest();
        else if (COLLIDED_WITH_A_RIGHT_EDGE && COLLIDED_WITH_A_BOTTOM_EDGE === false) sprite.moveSpriteNorth();
    } else if (MOVEMENT_KEY_STATUSES.w && (0, _collisionJs.checkCollisionWithBottomEdgesOfObstacles)(sprite).status === false) sprite.moveSpriteNorth();
    else if (MOVEMENT_KEY_STATUSES.s && (0, _collisionJs.checkCollisionWithTopEdgesOfObstacles)(sprite).status === false) sprite.moveSpriteSouth();
    else if (MOVEMENT_KEY_STATUSES.a && (0, _collisionJs.checkCollisionWithRightEdgesOfObstacles)(sprite).status === false) sprite.moveSpriteWest();
    else if (MOVEMENT_KEY_STATUSES.d && (0, _collisionJs.checkCollisionWithLeftEdgesOfObstacles)(sprite).status === false) sprite.moveSpriteEast();
}

},{"../helpers/checks.js":"hGT0N","../sprites/entities.js":"77n58","../core/collision.js":"3zsV5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cT2YJ":[function(require,module,exports) {
module.exports = JSON.parse('{"e":{"x":0,"y":0,"w":23,"h":32},"el":{"x":23,"y":0,"w":23,"h":31},"er":{"x":46,"y":0,"w":23,"h":31},"n":{"x":69,"y":0,"w":23,"h":32},"nl":{"x":92,"y":0,"w":23,"h":31},"nr":{"x":115,"y":0,"w":23,"h":31},"s":{"x":138,"y":0,"w":23,"h":33},"sl":{"x":161,"y":0,"w":23,"h":31},"sr":{"x":184,"y":0,"w":23,"h":31},"w":{"x":207,"y":0,"w":23,"h":32},"wl":{"x":230,"y":0,"w":23,"h":31},"wr":{"x":253,"y":0,"w":23,"h":31}}');

},{}],"16erO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AMMO_CACHE_POPUP", ()=>AMMO_CACHE_POPUP);
parcelHelpers.export(exports, "PORTAL_POPUP", ()=>PORTAL_POPUP);
parcelHelpers.export(exports, "UPGRADE_BENCH_POPUP", ()=>UPGRADE_BENCH_POPUP);
parcelHelpers.export(exports, "managePopUp", ()=>managePopUp);
const TEXT_STYLE = {
    fontSize: 20,
    fill: 0xffffff
};
const AMMO_CACHE_POPUP = new PIXI.Text("Press E to refill ammo.(500)", TEXT_STYLE);
AMMO_CACHE_POPUP.alpha = 0;
const PORTAL_POPUP = new PIXI.Text("Press Q to change rooms.", TEXT_STYLE);
PORTAL_POPUP.alpha = 0;
const UPGRADE_BENCH_POPUP = new PIXI.Text("CHOOSE UPGRADE(1000): E: Ammo and clip size. T: Damage", TEXT_STYLE);
UPGRADE_BENCH_POPUP.alpha = 0;
function managePopUp(popup, player, isClose) {
    if (isClose) {
        if (popup.alpha < 1.0) popup.alpha += 0.01;
    } else if (popup.alpha > 0.0) popup.alpha -= 0.01;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["gGCcE","4YftG"], "4YftG", "parcelRequire90aa")

//# sourceMappingURL=test.js.map
