(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.NoCMSForms = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = (window.React);
var ReactDOM = (window.ReactDOM);
var stores = require('nocms-stores');
var utils = require('nocms-utils');
var events = require('nocms-events');
var Spinner = require('./Spinner');

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props));

    _this.handleStoreChange = _this.handleStoreChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.state = props.initialState || {};
    _this.state.isValid = false;
    _this.state.isDisabled = false;
    _this.state.isSubmitting = false;
    if (global.environment !== 'server') {
      stores.createStore(props.store, props.initialState, _this.handleStoreChange);
    }
    return _this;
  }

  _createClass(Form, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (global.environment !== 'server') {
        stores.remove(this.props.store, this.handleStoreChange);
      }
    }
  }, {
    key: 'handleStoreChange',
    value: function handleStoreChange(store) {
      this.setState({ store: store });
    }
  }, {
    key: 'handleFinishSubmit',
    value: function handleFinishSubmit() {
      this.setState({ isSubmitting: false, isDisabled: false });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      var formData = {};
      var isValid = true;

      Object.keys(this.state.store).forEach(function (field) {
        var prop = _this2.state.store[field];
        if (typeof props === null) {
          return;
        }
        if ((typeof prop === 'undefined' ? 'undefined' : _typeof(prop)) !== 'object') {
          formData[field] = prop;
          return;
        }
        if (!prop.isValidated) {
          isValid = isValid && prop.validate();
        }
        if (prop.isValidated) {
          isValid = isValid && prop.isValid;
        }
        if (isValid) {
          formData[field] = prop.convertDate ? _this2.convertDate(prop.value) : prop.value;
        }
      });

      this.setState({ isValid: isValid });

      if (!isValid) {
        this.scrollToError();
        return;
      }
      this.setState({ isSubmitting: true, isDisabled: true });
      events.trigger('form_sent', this.props.store);

      if (this.props.onSubmit) {
        this.props.onSubmit(formData, this.handleFinishSubmit.bind(this));
      }
    }
  }, {
    key: 'scrollToError',
    value: function scrollToError() {
      var domNode = ReactDOM.findDOMNode(this);
      setTimeout(function () {
        var target = domNode.querySelector('.error');
        if (target) {
          (function () {
            var targetPos = target.offsetTop;
            var input = target.querySelector('input');
            utils.scrollTo(document.body, targetPos - 160, 400, function () {
              input.focus();
            });
          })();
        }
      }, 0);
    }
  }, {
    key: 'convertDate',
    value: function convertDate(date) {
      if (/^\d{4}\-\d{2}\-\d{2}/.test(date)) {
        return date;
      }
      var dateMatch = date.match(/^(\d{2})\.(\d{2})\.(\d{4})/);
      if (dateMatch) {
        return dateMatch[3] + '-' + dateMatch[2] + '-' + dateMatch[1];
      }
      return date;
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = 'form';
      var buttonText = this.state.isSubmitting ? React.createElement(Spinner, { visible: true, light: true }) : this.props.submitButton;
      return React.createElement(
        'form',
        {
          onSubmit: this.handleSubmit,
          className: classes,
          noValidate: true
        },
        this.props.errorText ? React.createElement(
          'div',
          { className: 'error error-summary visible' },
          this.props.errorText
        ) : null,
        this.props.children,
        global.environment !== 'server' ? React.createElement(
          'div',
          { className: 'button-container' },
          React.createElement(
            'button',
            { disabled: this.props.disabledSubmitButton || this.state.isDisabled, type: 'submit', id: this.props.submitButtonId, className: 'pure-button button-primary' },
            buttonText
          )
        ) : React.createElement(Spinner, { visible: true })
      );
    }
  }]);

  return Form;
}(React.Component);

Form.propTypes = {
  initialState: React.PropTypes.object,
  store: React.PropTypes.string,
  messageType: React.PropTypes.string,
  onResponse: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  submitButton: React.PropTypes.string,
  errorText: React.PropTypes.string,
  children: React.PropTypes.array,
  disabledSubmitButton: React.PropTypes.bool,
  submitButtonId: React.PropTypes.string
};

exports.default = Form;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Spinner":2,"nocms-events":3,"nocms-stores":4,"nocms-utils":5}],2:[function(require,module,exports){
'use strict';

var React = (window.React);

var Spinner = function Spinner(props) {
  var visible = props.visible;
  var text = props.text;

  var className = visible ? '' : 'hidden';
  return React.createElement(
    'div',
    { className: className },
    React.createElement(
      'div',
      { className: 'spinner-container' },
      text ? React.createElement(
        'span',
        null,
        undefined.props.text
      ) : null,
      React.createElement(
        'div',
        { className: 'spinner' },
        React.createElement('div', { className: 'rect1' }),
        React.createElement('div', { className: 'rect2' }),
        React.createElement('div', { className: 'rect3' }),
        React.createElement('div', { className: 'rect4' }),
        React.createElement('div', { className: 'rect5' })
      )
    )
  );
};

Spinner.propTypes = {
  visible: React.PropTypes.bool,
  text: React.PropTypes.string
};

module.exports = Spinner;

},{}],3:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var eventListeners = {};

	var listenTo = function listenTo(eventName, func) {
	  if (typeof func !== 'function') {
	    console.error('Listener to ' + eventName + '  is not a function');
	    return;
	  }
	  if (!eventListeners[eventName]) {
	    eventListeners[eventName] = [];
	  }
	  eventListeners[eventName].push(func);
	};

	var stopListenTo = function stopListenTo(eventName, func) {
	  var index = eventListeners[eventName].indexOf(func);
	  if (index !== -1) {
	    eventListeners[eventName].splice(index, 1);
	  }
	};

	var trigger = function trigger(eventName) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  if (!eventListeners[eventName]) {
	    return;
	  }
	  eventListeners[eventName].forEach(function (f) {
	    f.apply(this, args);
	  });
	};

	module.exports = {
	  listenTo: listenTo,
	  stopListenTo: stopListenTo,
	  trigger: trigger
	};

/***/ }
/******/ ])
});
;
},{}],4:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var events = __webpack_require__(1);
	var stores = {};

	var subscribe = function subscribe(name, func) {
	  events.listenTo('store:' + name, func);
	};

	var unsubscribe = function unsubscribe(name, func) {
	  events.stopListenTo('store:' + name, func);
	};

	var createStore = function createStore(name, value, func) {
	  var initialValue = value;
	  var cb = func;
	  if (typeof initialValue === 'function') {
	    cb = initialValue;
	    initialValue = {};
	  }
	  if (!stores[name]) {
	    stores[name] = initialValue || {};
	  }
	  if (typeof cb === 'function') {
	    subscribe(name, cb);
	  }
	};

	var remove = function remove(name, func) {
	  delete stores[name];
	  if (typeof func === 'function') {
	    unsubscribe(name, func);
	  }
	};

	var getStore = function getStore(name) {
	  return stores[name];
	};

	var update = function update(name, obj) {
	  if (!stores[name]) {
	    return;
	  }
	  if (obj === null) {
	    return;
	  }
	  Object.keys(obj).forEach(function (prop) {
	    stores[name][prop] = obj[prop];
	  });
	  events.trigger('store:' + name, stores[name]);
	};

	module.exports = {
	  createStore: createStore,
	  remove: remove,
	  getStore: getStore,
	  subscribe: subscribe,
	  unsubscribe: unsubscribe,
	  update: update
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else {
			var a = factory();
			for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
		}
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};

	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {

	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;

	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};

	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;

	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}


	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;

	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;

	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {

		'use strict';

		var eventListeners = {};

		var listenTo = function listenTo(eventName, func) {
		  if (typeof func !== 'function') {
		    console.error('Listener to ' + eventName + '  is not a function');
		    return;
		  }
		  if (!eventListeners[eventName]) {
		    eventListeners[eventName] = [];
		  }
		  eventListeners[eventName].push(func);
		};

		var stopListenTo = function stopListenTo(eventName, func) {
		  var index = eventListeners[eventName].indexOf(func);
		  if (index !== -1) {
		    eventListeners[eventName].splice(index, 1);
		  }
		};

		var trigger = function trigger(eventName) {
		  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		    args[_key - 1] = arguments[_key];
		  }

		  if (!eventListeners[eventName]) {
		    return;
		  }
		  eventListeners[eventName].forEach(function (f) {
		    f.apply(this, args);
		  });
		};

		module.exports = {
		  listenTo: listenTo,
		  stopListenTo: stopListenTo,
		  trigger: trigger
		};

	/***/ }
	/******/ ])
	});
	;

/***/ }
/******/ ])
});
;
},{}],5:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var scrollTo = function scrollTo(element, to, duration, cb) {
	  var start = element.scrollTop;
	  var change = to - start;
	  var increment = 40;
	  var easeInOut = function easeInOut(currentTime, start, change, duration) {
	    currentTime /= duration / 2;
	    if (currentTime < 1) {
	      return change / 2 * currentTime * currentTime + start;
	    }
	    currentTime -= 1;
	    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
	  };

	  var animateScroll = function animateScroll(elapsed) {
	    var elapsedTime = elapsed + increment;
	    var position = easeInOut(elapsedTime, start, change, duration);

	    if (element.nodeName === 'BODY') {
	      document.body.scrollTop = position;
	      if (document.documentElement) {
	        document.documentElement.scrollTop = position;
	      }
	    } else {
	      element.scrollTop = position;
	    }

	    if (elapsedTime < duration) {
	      setTimeout(function () {
	        animateScroll(elapsedTime);
	      }, increment);
	    } else {
	      cb && cb();
	    }
	  };
	  animateScroll(0);
	};

	module.exports = {
	  scrollTo: scrollTo
	};

/***/ }
/******/ ])
});
;
},{}]},{},[1])(1)
});