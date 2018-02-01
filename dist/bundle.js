/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class GlobalInput {
    constructor(onChange, onSubmit, options = {}){
        if (!document) throw Error('`document` not found')

        this.options = Object.assign({
            submitKey: 'Enter',
            debug: false,
            excludeNodes: [],
            excludeNodeNames: [],
            preventDefault: false,
            mountInitial: true,
        }, options)
        this.onChange = onChange
        this.onSubmit = onSubmit
        this.inputCache = ''
        this.mounted = false

        this.mount = this.mount.bind(this)
        this.unmount = this.unmount.bind(this)
        this.setValue = this.setValue.bind(this)
        this.action = this.action.bind(this)

        if (this.options.mountInitial) this.mount()
    }

    handle(method, value) {
        if (this.options.debug) {
            console.info('Method: ' + method)
            console.info('Input Value: ' + this.inputCache)
            console.log('')
        }

        this['on' + method](value)
    }

    mount() {
        if (this.mounted) return console.warn('Input already mounted')
        document.body.addEventListener('keydown', this.action)
        this.mounted = true
        if (this.options.debug) console.warn('mounted')
    }

    unmount() {
        if (!this.mounted) return console.warn('Input already unmounted')
        document.body.removeEventListener('keydown', this.action)
        this.mounted = false
        if (this.options.debug) console.warn('unmounted')
    }

    setValue(value) {
        this.inputCache = value
    }

    action(e) {
        if (
            this.options.excludeNodes.includes(document.activeElement) ||
            this.options.excludeNodeNames.includes(document.activeElement.nodeName) ||
            e.getModifierState('Alt') ||
            e.getModifierState('Control') ||
            e.getModifierState('OS') ||
            e.getModifierState('Fn') ||
            e.getModifierState('Meta') ||
            e.getModifierState('Win') ||
            e.getModifierState('Hyper') ||
            e.getModifierState('Super')
        ) {
            return
        }

        if (this.options.preventDefault) e.preventDefault()

        switch(e.key) {
            case this.options.submitKey:
                const value = String(this.inputCache);
                this.handle('Submit', value)

                this.inputCache = ''

                return value
                break

            case 'Backspace':
                this.inputCache = this.inputCache.slice(0, -1)

                break

            default:
                const caps = e.getModifierState && (
                    e.getModifierState('CapsLock') ||
                    e.getModifierState('Shift')
                )

                this.inputCache += (
                    e.key.length === 1 ? e.key : ''
                )[caps ? 'toUpperCase' : 'toLowerCase']()

                break
        }

        this.handle('Change', this.inputCache)
    }
}

module.exports = GlobalInput


/***/ })
/******/ ]);