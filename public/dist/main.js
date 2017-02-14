/*! Copyright Flying Unicorns inc. */
webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueResource = __webpack_require__(2);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _vueRouter = __webpack_require__(3);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _switch = __webpack_require__(4);

	var _switch2 = _interopRequireDefault(_switch);

	var _badge = __webpack_require__(5);

	var _badge2 = _interopRequireDefault(_badge);

	var _loading = __webpack_require__(6);

	var _loading2 = _interopRequireDefault(_loading);

	var _row = __webpack_require__(9);

	var _row2 = _interopRequireDefault(_row);

	var _col = __webpack_require__(10);

	var _col2 = _interopRequireDefault(_col);

	var _autocomplete = __webpack_require__(11);

	var _autocomplete2 = _interopRequireDefault(_autocomplete);

	var _App = __webpack_require__(16);

	var _App2 = _interopRequireDefault(_App);

	var _blogIndex = __webpack_require__(23);

	var _blogIndex2 = _interopRequireDefault(_blogIndex);

	var _searchArcitle = __webpack_require__(84);

	var _searchArcitle2 = _interopRequireDefault(_searchArcitle);

	var _about = __webpack_require__(109);

	var _about2 = _interopRequireDefault(_about);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//es6语法：
	//import Vue from "../node_modules/vue/dist/vue.min.js";
	//其实不用写完，会自动查找。可以直接写import Vue from "vue";
	_vue2.default.use(_switch2.default);

	/*var componentList=['switch.js','badge.js','loading.js','row.js','col.js','autocomplete.js']
	var src='../node_modules/element-ui/lib/'
	componentList.forEach(function(value,array){

	    import Switch from "'../node_modules/element-ui/lib/'+value";

	})*/

	_vue2.default.use(_badge2.default);
	_vue2.default.use(_loading2.default);
	_vue2.default.use(_row2.default);
	_vue2.default.use(_col2.default);
	_vue2.default.use(_autocomplete2.default);

	_vue2.default.use(_vueResource2.default);
	_vue2.default.use(_vueRouter2.default);

	// 创建一个路由器实例
	// 并且配置路由规则
	var router = new _vueRouter2.default({
	    mode: 'history',
	    base: __dirname,
	    routes: [{
	        path: '/blog',
	        component: _blogIndex2.default
	    }, {
	        path: '/about',
	        component: _about2.default
	    }, {
	        path: '/',
	        component: _blogIndex2.default
	    }, {
	        path: '/search/:id',
	        component: _searchArcitle2.default
	    }]
	});
	_vue2.default.config.debug = true; //开启错误提示

	new _vue2.default({
	    router: router,
	    render: function render(h) {
	        return h(_App2.default);
	    }
	}).$mount('#app');
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v1.0.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */

	'use strict';

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;

	function Promise$1(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p$1 = Promise$1.prototype;

	p$1.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p$1.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p$1.notify = function notify() {
	    var promise = this;

	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	/**
	 * Promise adapter.
	 */

	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}

	function PromiseObj(executor, context) {

	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }

	    this.context = context;
	}

	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};

	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};

	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};

	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};

	var p = PromiseObj.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return Promise.reject(reason);
	    });
	};

	/**
	 * Utility functions.
	 */

	var debug = false;var util = {};var slice = [].slice;


	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}

	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}

	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}

	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}

	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}

	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}

	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}

	var isArray = Array.isArray;

	function isString(val) {
	    return typeof val === 'string';
	}

	function isBoolean(val) {
	    return val === true || val === false;
	}

	function isFunction(val) {
	    return typeof val === 'function';
	}

	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}

	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}

	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}

	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}

	function when(value, fulfilled, rejected) {

	    var promise = PromiseObj.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}

	function options(fn, obj, opts) {

	    opts = opts || {};

	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }

	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}

	function each(obj, iterator) {

	    var i, key;

	    if (obj && typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	}

	var assign = Object.assign || _assign;

	function merge(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });

	    return target;
	}

	function defaults(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {

	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	    });

	    return target;
	}

	function _assign(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source);
	    });

	    return target;
	}

	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	/**
	 * Root Prefix Transform.
	 */

	function root (options, next) {

	    var url = next(options);

	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }

	    return url;
	}

	/**
	 * Query Parameter Transform.
	 */

	function query (options, next) {

	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);

	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = Url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	}

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	function expand(url, params, variables) {

	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	}

	function parse(template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];

	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null,
	                        values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}

	function getValues(context, operator, key, modifier) {

	    var value = context[key],
	        result = [];

	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }

	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	}

	function isDefined(value) {
	    return value !== undefined && value !== null;
	}

	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}

	function encodeValue(operator, value, key) {

	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}

	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}

	/**
	 * URL Template (RFC 6570) Transform.
	 */

	function template (options) {

	    var variables = [],
	        url = expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	}

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	function Url(url, params) {

	    var self = this || {},
	        options = url,
	        transform;

	    if (isString(url)) {
	        options = { url: url, params: params };
	    }

	    options = merge({}, Url.options, self.$options, options);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });

	    return transform(options);
	}

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [template, query, root];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [],
	        escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;

	    each(obj, function (value, key) {

	        hash = isObject(value) || isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	/**
	 * XDomain client (Internet Explorer).
	 */

	function xdrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xdr = new XDomainRequest(),
	            handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(xdr.responseText, { status: status }));
	        };

	        request.abort = function () {
	            return xdr.abort();
	        };

	        xdr.open(request.method, request.getUrl());
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	}

	/**
	 * CORS Interceptor.
	 */

	var ORIGIN_URL = Url.parse(location.href);
	var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

	function cors (request, next) {

	    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
	        request.crossOrigin = true;
	    }

	    if (request.crossOrigin) {

	        if (!SUPPORTS_CORS) {
	            request.client = xdrClient;
	        }

	        delete request.emulateHTTP;
	    }

	    next();
	}

	function crossOrigin(request) {

	    var requestUrl = Url.parse(Url(request));

	    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
	}

	/**
	 * Body Interceptor.
	 */

	function body (request, next) {

	    if (isFormData(request.body)) {

	        request.headers.delete('Content-Type');
	    } else if (isObject(request.body) || isArray(request.body)) {

	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }

	    next(function (response) {

	        Object.defineProperty(response, 'data', {
	            get: function () {
	                return this.body;
	            },
	            set: function (body) {
	                this.body = body;
	            }
	        });

	        return response.bodyText ? when(response.text(), function (text) {

	            var type = response.headers.get('Content-Type');

	            if (isString(type) && type.indexOf('application/json') === 0) {

	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	            } else {
	                response.body = text;
	            }

	            return response;
	        }) : response;
	    });
	}

	/**
	 * JSONP client.
	 */

	function jsonpClient (request) {
	    return new PromiseObj(function (resolve) {

	        var name = request.jsonp || 'callback',
	            callback = '_jsonp' + Math.random().toString(36).substr(2),
	            body = null,
	            handler,
	            script;

	        handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(body, { status: status }));

	            delete window[callback];
	            document.body.removeChild(script);
	        };

	        request.params[name] = callback;

	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };

	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	}

	/**
	 * JSONP Interceptor.
	 */

	function jsonp (request, next) {

	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }

	    next(function (response) {

	        if (request.method == 'JSONP') {

	            return when(response.json(), function (json) {

	                response.body = json;

	                return response;
	            });
	        }
	    });
	}

	/**
	 * Before Interceptor.
	 */

	function before (request, next) {

	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }

	    next();
	}

	/**
	 * HTTP method override Interceptor.
	 */

	function method (request, next) {

	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }

	    next();
	}

	/**
	 * Header Interceptor.
	 */

	function header (request, next) {

	    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });

	    next();
	}

	/**
	 * Timeout Interceptor.
	 */

	function timeout (request, next) {

	    var timeout;

	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.abort();
	        }, request.timeout);
	    }

	    next(function (response) {

	        clearTimeout(timeout);
	    });
	}

	/**
	 * XMLHttp client.
	 */

	function xhrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xhr = new XMLHttpRequest(),
	            handler = function (event) {

	            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
	                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	            });

	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });

	            resolve(response);
	        };

	        request.abort = function () {
	            return xhr.abort();
	        };

	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }

	        xhr.open(request.method, request.getUrl(), true);

	        if ('responseType' in xhr) {
	            xhr.responseType = 'blob';
	        }

	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }

	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });

	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onerror = handler;
	        xhr.send(request.getBody());
	    });
	}

	/**
	 * Base client.
	 */

	function Client (context) {

	    var reqHandlers = [sendRequest],
	        resHandlers = [],
	        handler;

	    if (!isObject(context)) {
	        context = null;
	    }

	    function Client(request) {
	        return new PromiseObj(function (resolve) {

	            function exec() {

	                handler = reqHandlers.pop();

	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
	                    next();
	                }
	            }

	            function next(response) {

	                if (isFunction(response)) {

	                    resHandlers.unshift(response);
	                } else if (isObject(response)) {

	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });

	                    when(response, resolve);

	                    return;
	                }

	                exec();
	            }

	            exec();
	        }, context);
	    }

	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };

	    return Client;
	}

	function sendRequest(request, resolve) {

	    var client = request.client || xhrClient;

	    resolve(client(request));
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	/**
	 * HTTP Headers.
	 */

	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;

	        classCallCheck(this, Headers);


	        this.map = {};

	        each(headers, function (value, name) {
	            return _this.append(name, value);
	        });
	    }

	    Headers.prototype.has = function has(name) {
	        return getName(this.map, name) !== null;
	    };

	    Headers.prototype.get = function get(name) {

	        var list = this.map[getName(this.map, name)];

	        return list ? list[0] : null;
	    };

	    Headers.prototype.getAll = function getAll(name) {
	        return this.map[getName(this.map, name)] || [];
	    };

	    Headers.prototype.set = function set(name, value) {
	        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	    };

	    Headers.prototype.append = function append(name, value) {

	        var list = this.getAll(name);

	        if (list.length) {
	            list.push(trim(value));
	        } else {
	            this.set(name, value);
	        }
	    };

	    Headers.prototype.delete = function _delete(name) {
	        delete this.map[getName(this.map, name)];
	    };

	    Headers.prototype.forEach = function forEach(callback, thisArg) {
	        var _this2 = this;

	        each(this.map, function (list, name) {
	            each(list, function (value) {
	                return callback.call(thisArg, value, name, _this2);
	            });
	        });
	    };

	    return Headers;
	}();

	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}

	function normalizeName(name) {

	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }

	    return trim(name);
	}

	/**
	 * HTTP Response.
	 */

	var Response = function () {
	    function Response(body, _ref) {
	        var url = _ref.url;
	        var headers = _ref.headers;
	        var status = _ref.status;
	        var statusText = _ref.statusText;
	        classCallCheck(this, Response);


	        this.url = url;
	        this.ok = status >= 200 && status < 300;
	        this.status = status || 0;
	        this.statusText = statusText || '';
	        this.headers = new Headers(headers);
	        this.body = body;

	        if (isString(body)) {

	            this.bodyText = body;
	        } else if (isBlob(body)) {

	            this.bodyBlob = body;

	            if (isBlobText(body)) {
	                this.bodyText = blobText(body);
	            }
	        }
	    }

	    Response.prototype.blob = function blob() {
	        return when(this.bodyBlob);
	    };

	    Response.prototype.text = function text() {
	        return when(this.bodyText);
	    };

	    Response.prototype.json = function json() {
	        return when(this.text(), function (text) {
	            return JSON.parse(text);
	        });
	    };

	    return Response;
	}();

	function blobText(body) {
	    return new PromiseObj(function (resolve) {

	        var reader = new FileReader();

	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	    });
	}

	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}

	/**
	 * HTTP Request.
	 */

	var Request = function () {
	    function Request(options) {
	        classCallCheck(this, Request);


	        this.body = null;
	        this.params = {};

	        assign(this, options, {
	            method: toUpper(options.method || 'GET')
	        });

	        if (!(this.headers instanceof Headers)) {
	            this.headers = new Headers(this.headers);
	        }
	    }

	    Request.prototype.getUrl = function getUrl() {
	        return Url(this);
	    };

	    Request.prototype.getBody = function getBody() {
	        return this.body;
	    };

	    Request.prototype.respondWith = function respondWith(body, options) {
	        return new Response(body, assign(options || {}, { url: this.getUrl() }));
	    };

	    return Request;
	}();

	/**
	 * Service for sending network requests.
	 */

	var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
	var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
	var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

	function Http(options) {

	    var self = this || {},
	        client = Client(self.$vm);

	    defaults(options || {}, self.$options, Http.options);

	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });

	    return client(new Request(options)).then(function (response) {

	        return response.ok ? response : PromiseObj.reject(response);
	    }, function (response) {

	        if (response instanceof Error) {
	            error(response);
	        }

	        return PromiseObj.reject(response);
	    });
	}

	Http.options = {};

	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    custom: CUSTOM_HEADERS,
	    common: COMMON_HEADERS
	};

	Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

	['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

	    Http[method] = function (url, options) {
	        return this(assign(options || {}, { url: url, method: method }));
	    };
	});

	['post', 'put', 'patch'].forEach(function (method) {

	    Http[method] = function (url, body, options) {
	        return this(assign(options || {}, { url: url, method: method, body: body }));
	    };
	});

	/**
	 * Service for interacting with RESTful services.
	 */

	function Resource(url, params, actions, options) {

	    var self = this || {},
	        resource = {};

	    actions = assign({}, Resource.actions, actions);

	    each(actions, function (action, name) {

	        action = merge({ url: url, params: assign({}, params) }, options, action);

	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options = assign({}, action),
	        params = {},
	        body;

	    switch (args.length) {

	        case 2:

	            params = args[0];
	            body = args[1];

	            break;

	        case 1:

	            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
	    }

	    options.body = body;
	    options.params = assign({}, options.params, params);

	    return options;
	}

	Resource.actions = {

	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }

	};

	/**
	 * Install plugin.
	 */

	function plugin(Vue) {

	    if (plugin.installed) {
	        return;
	    }

	    Util(Vue);

	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function () {
	                var _this = this;

	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }

	    });
	}

	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}

	module.exports = plugin;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vue-router v2.0.3
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.VueRouter = factory());
	}(this, (function () { 'use strict';

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true

	    var route = parent.$route
	    var cache = parent._routerViewCache || (parent._routerViewCache = {})
	    var depth = 0
	    var inactive = false

	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++
	      }
	      if (parent._inactive) {
	        inactive = true
	      }
	      parent = parent.$parent
	    }

	    data.routerViewDepth = depth
	    var matched = route.matched[depth]
	    if (!matched) {
	      return h()
	    }

	    var name = props.name
	    var component = inactive
	      ? cache[name]
	      : (cache[name] = matched.components[name])

	    if (!inactive) {
	      var hooks = data.hook || (data.hook = {})
	      hooks.init = function (vnode) {
	        matched.instances[name] = vnode.child
	      }
	      hooks.prepatch = function (oldVnode, vnode) {
	        matched.instances[name] = vnode.child
	      }
	      hooks.destroy = function (vnode) {
	        if (matched.instances[name] === vnode.child) {
	          matched.instances[name] = undefined
	        }
	      }
	    }

	    return h(component, data, children)
	  }
	}

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }

	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }

	  var stack = base.split('/')

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop()
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/')
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i]
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop()
	    } else {
	      stack.push(segment)
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('')
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = ''
	  var query = ''

	  var hashIndex = path.indexOf('#')
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex)
	    path = path.slice(0, hashIndex)
	  }

	  var queryIndex = path.indexOf('?')
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1)
	    path = path.slice(0, queryIndex)
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
	  }
	}

	/*  */

	var encode = encodeURIComponent
	var decode = decodeURIComponent

	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  if (query) {
	    var parsedQuery
	    try {
	      parsedQuery = parseQuery(query)
	    } catch (e) {
	      warn(false, e.message)
	      parsedQuery = {}
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key]
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}

	function parseQuery (query) {
	  var res = {}

	  query = query.trim().replace(/^(\?|#|&)/, '')

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=')
	    var key = decode(parts.shift())
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null

	    if (res[key] === undefined) {
	      res[key] = val
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val)
	    } else {
	      res[key] = [res[key], val]
	    }
	  })

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).sort().map(function (key) {
	    var val = obj[key]

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = []
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key))
	        } else {
	          result.push(encode(key) + '=' + encode(val2))
	        }
	      })
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null
	  return res ? ("?" + res) : ''
	}

	/*  */

	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  }
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom)
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	})

	function formatMatch (record) {
	  var res = []
	  while (record) {
	    res.unshift(record)
	    record = record.parent
	  }
	  return res
	}

	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  return (path || '/') + stringifyQuery(query) + hash
	}

	var trailingSlashRE = /\/$/
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a)
	  var bKeys = Object.keys(b)
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.indexOf(target.path.replace(/\/$/, '')) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw
	  if (next.name || next._normalized) {
	    return next
	  }

	  var parsedPath = parsePath(next.path || '')
	  var basePath = (current && current.path) || '/'
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append)
	    : (current && current.path) || '/'
	  var query = resolveQuery(parsedPath.query, next.query)
	  var hash = next.hash || parsedPath.hash
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object]

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router
	    var current = this.$route
	    var to = normalizeLocation(this.to, current, this.append)
	    var resolved = router.match(to, current)
	    var fullPath = resolved.redirectedFrom || resolved.fullPath
	    var base = router.history.base
	    var href = createHref(base, fullPath, router.mode)
	    var classes = {}
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
	    var compareTarget = to.path ? createRoute(null, to) : resolved
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget)

	    var on = {
	      click: function (e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) { return }
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) { return }
	        // don't redirect if `target="_blank"`
	        /* istanbul ignore if */
	        var target = e.target.getAttribute('target')
	        if (/\b_blank\b/i.test(target)) { return }

	        e.preventDefault()
	        if (this$1.replace) {
	          router.replace(to)
	        } else {
	          router.push(to)
	        }
	      }
	    }

	    var data = {
	      class: classes
	    }

	    if (this.tag === 'a') {
	      data.on = on
	      data.attrs = { href: href }
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default)
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false
	        var extend = _Vue.util.extend
	        var aData = a.data = extend({}, a.data)
	        aData.on = on
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs)
	        aAttrs.href = href
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	}

	function findAnchor (children) {
	  if (children) {
	    var child
	    for (var i = 0; i < children.length; i++) {
	      child = children[i]
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '/#' + fullPath : fullPath
	  return base ? cleanPath(base + path) : path
	}

	var _Vue

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true

	  _Vue = Vue

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  })

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get$1 () { return this.$root._route }
	  })

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router
	        this._router.init(this)
	        Vue.util.defineReactive(this, '_route', this._router.history.current)
	      }
	    }
	  })

	  Vue.component('router-view', View)
	  Vue.component('router-link', Link)

	  var strats = Vue.config.optionMergeStrategies
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created
	}

	var __moduleExports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = __moduleExports

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp
	var parse_1 = parse
	var compile_1 = compile
	var tokensToFunction_1 = tokensToFunction
	var tokensToRegExp_1 = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var defaultDelimiter = options && options.delimiter || '/'
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || defaultDelimiter
	    var pattern = capture || group

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      keys.push(token)

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  var delimiter = escapeString(options.delimiter || '/')
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
	  }

	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys || options)
	    keys = []
	  }

	  options = options || {}

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	function createRouteMap (routes) {
	  var pathMap = Object.create(null)
	  var nameMap = Object.create(null)

	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route)
	  })

	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  assert(path != null, "\"path\" is required in a route configuration.")

	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {}
	  }

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (false) {}
	    route.children.forEach(function (child) {
	      addRouteRecord(pathMap, nameMap, child, record)
	    })
	  }

	  if (route.alias !== undefined) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
	      })
	    } else {
	      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
	    }
	  }

	  pathMap[record.path] = record
	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record
	    } else {
	      warn(false, ("Duplicate named routes definition: { name: \"" + name + "\", path: \"" + (record.path) + "\" }"))
	    }
	  }
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '')
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	/*  */

	var regexpCache = Object.create(null)

	var regexpParamsCache = Object.create(null)

	var regexpCompileCache = Object.create(null)

	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute)
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name]
	      var paramNames = getParams(record.path)

	      if (typeof location.params !== 'object') {
	        location.params = {}
	      }

	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key]
	          }
	        }
	      }

	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {}
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect }
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }

	    var re = redirect
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query
	    hash = re.hasOwnProperty('hash') ? re.hash : hash
	    params = re.hasOwnProperty('params') ? re.params : params

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name]
	      assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record)
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    })
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched
	      var aliasedRecord = matched[matched.length - 1]
	      location.params = aliasedMatch.params
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }

	  return match
	}

	function getRouteRegex (path) {
	  var hit = regexpCache[path]
	  var keys, regexp

	  if (hit) {
	    keys = hit.keys
	    regexp = hit.regexp
	  } else {
	    keys = []
	    regexp = index(path, keys)
	    regexpCache[path] = { keys: keys, regexp: regexp }
	  }

	  return { keys: keys, regexp: regexp }
	}

	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var ref = getRouteRegex(path);
	  var regexp = ref.regexp;
	  var keys = ref.keys;
	  var m = pathname.match(regexp)

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1]
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
	    if (key) { params[key.name] = val }
	  }

	  return true
	}

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path))
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    assert(false, ("missing param for " + routeMsg + ": " + (e.message)))
	    return ''
	  }
	}

	function getParams (path) {
	  return regexpParamsCache[path] ||
	    (regexpParamsCache[path] = getRouteRegex(path).keys.map(function (key) { return key.name; }))
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */

	var inBrowser = typeof window !== 'undefined'

	var supportsHistory = inBrowser && (function () {
	  var ua = window.navigator.userAgent

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})()

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb()
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1)
	        })
	      } else {
	        step(index + 1)
	      }
	    }
	  }
	  step(0)
	}

	/*  */


	var History = function History (router, base) {
	  this.router = router
	  this.base = normalizeBase(base)
	  // start with a route object that stands for "nowhere"
	  this.current = START
	  this.pending = null
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb
	};

	History.prototype.transitionTo = function transitionTo (location, cb) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current)
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route)
	    cb && cb(route)
	    this$1.ensureURL()
	  })
	};

	History.prototype.confirmTransition = function confirmTransition (route, cb) {
	    var this$1 = this;

	  var current = this.current
	  if (isSameRoute(route, current)) {
	    this.ensureURL()
	    return
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  )

	  this.pending = route
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) { return }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL(true)
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        this$1.push(to)
	      } else {
	        // confirm transition and pass on the value
	        next(to)
	      }
	    })
	  }

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = []
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, function () {
	      return this$1.current === route
	    })
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(enterGuards, iterator, function () {
	      if (this$1.pending === route) {
	        this$1.pending = null
	        cb(route)
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); })
	        })
	      }
	    })
	  })
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current
	  this.current = route
	  this.cb && this.cb(route)
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev)
	  })
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base')
	      base = baseEl ? baseEl.getAttribute('href') : '/'
	    } else {
	      base = '/'
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i
	  var max = Math.max(current.length, next.length)
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def)
	  }
	  return def.options[key]
	}

	function extractLeaveGuards (matched) {
	  return flatten(flatMapComponents(matched, function (def, instance) {
	    var guard = extractGuard(def, 'beforeRouteLeave')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapLeaveGuard(guard, instance); })
	        : wrapLeaveGuard(guard, instance)
	    }
	  }).reverse())
	}

	function wrapLeaveGuard (
	  guard,
	  instance
	) {
	  return function routeLeaveGuard () {
	    return guard.apply(instance, arguments)
	  }
	}

	function extractEnterGuards (
	  matched,
	  cbs,
	  isValid
	) {
	  return flatten(flatMapComponents(matched, function (def, _, match, key) {
	    var guard = extractGuard(def, 'beforeRouteEnter')
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return wrapEnterGuard(guard, cbs, match, key, isValid); })
	        : wrapEnterGuard(guard, cbs, match, key, isValid)
	    }
	  }))
	}

	function wrapEnterGuard (
	  guard,
	  cbs,
	  match,
	  key,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb)
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid)
	        })
	      }
	    })
	  }
	}

	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key])
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid)
	    }, 16)
	  }
	}

	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = function (resolvedDef) {
	          match.components[key] = resolvedDef
	          next()
	        }

	        var reject = function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason))
	          next(false)
	        }

	        var res = def(resolve, reject)
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject)
	        }
	      }
	    }
	  })
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}

	/*  */

	var positionStore = Object.create(null)

	function saveScrollPosition (key) {
	  if (!key) { return }
	  positionStore[key] = {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  }
	}

	function getScrollPosition (key) {
	  if (!key) { return }
	  return positionStore[key]
	}

	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect()
	  var elRect = el.getBoundingClientRect()
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */


	var genKey = function () { return String(Date.now()); }
	var _key = genKey()

	var HTML5History = (function (History) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History.call(this, router, base)

	    var expectScroll = router.options.scrollBehavior
	    window.addEventListener('popstate', function (e) {
	      _key = e.state && e.state.key
	      var current = this$1.current
	      this$1.transitionTo(getLocation(this$1.base), function (next) {
	        if (expectScroll) {
	          this$1.handleScroll(next, current, true)
	        }
	      })
	    })

	    if (expectScroll) {
	      window.addEventListener('scroll', function () {
	        saveScrollPosition(_key)
	      })
	    }
	  }

	  if ( History ) HTML5History.__proto__ = History;
	  HTML5History.prototype = Object.create( History && History.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HTML5History.prototype.push = function push (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.replace = function replace (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath)
	      push ? pushState(current) : replaceState(current)
	    }
	  };

	  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
	    var router = this.router
	    if (!router.app) {
	      return
	    }

	    var behavior = router.options.scrollBehavior
	    if (!behavior) {
	      return
	    }
	    assert(typeof behavior === 'function', "scrollBehavior must be a function")

	    // wait until re-render finishes before scrolling
	    router.app.$nextTick(function () {
	      var position = getScrollPosition(_key)
	      var shouldScroll = behavior(to, from, isPop ? position : null)
	      if (!shouldScroll) {
	        return
	      }
	      var isObject = typeof shouldScroll === 'object'
	      if (isObject && typeof shouldScroll.selector === 'string') {
	        var el = document.querySelector(shouldScroll.selector)
	        if (el) {
	          position = getElementPosition(el)
	        } else if (isValidPosition(shouldScroll)) {
	          position = normalizePosition(shouldScroll)
	        }
	      } else if (isObject && isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll)
	      }

	      if (position) {
	        window.scrollTo(position.x, position.y)
	      }
	    })
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length)
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	function pushState (url, replace) {
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url)
	    } else {
	      _key = genKey()
	      history.pushState({ key: _key }, '', url)
	    }
	    saveScrollPosition(_key)
	  } catch (e) {
	    window.location[replace ? 'assign' : 'replace'](url)
	  }
	}

	function replaceState (url) {
	  pushState(url, true)
	}

	/*  */


	var HashHistory = (function (History) {
	  function HashHistory (router, base, fallback) {
	    History.call(this, router, base)

	    // check history fallback deeplinking
	    if (fallback && this.checkFallback()) {
	      return
	    }

	    ensureSlash()
	  }

	  if ( History ) HashHistory.__proto__ = History;
	  HashHistory.prototype = Object.create( History && History.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  HashHistory.prototype.checkFallback = function checkFallback () {
	    var location = getLocation(this.base)
	    if (!/^\/#/.test(location)) {
	      window.location.replace(
	        cleanPath(this.base + '/#' + location)
	      )
	      return true
	    }
	  };

	  HashHistory.prototype.onHashChange = function onHashChange () {
	    if (!ensureSlash()) {
	      return
	    }
	    this.transitionTo(getHash(), function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.push = function push (location) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.replace = function replace (location) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current)
	    }
	  };

	  return HashHistory;
	}(History));

	function ensureSlash () {
	  var path = getHash()
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path)
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href
	  var index = href.indexOf('#')
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#')
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  )
	}

	/*  */


	var AbstractHistory = (function (History) {
	  function AbstractHistory (router) {
	    History.call(this, router)
	    this.stack = []
	    this.index = -1
	  }

	  if ( History ) AbstractHistory.__proto__ = History;
	  AbstractHistory.prototype = Object.create( History && History.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
	      this$1.index++
	    })
	  };

	  AbstractHistory.prototype.replace = function replace (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
	    })
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex]
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex
	      this$1.updateRoute(route)
	    })
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null
	  this.options = options
	  this.beforeHooks = []
	  this.afterHooks = []
	  this.match = createMatcher(options.routes || [])

	  var mode = options.mode || 'hash'
	  this.fallback = mode === 'history' && !supportsHistory
	  if (this.fallback) {
	    mode = 'hash'
	  }
	  if (!inBrowser) {
	    mode = 'abstract'
	  }
	  this.mode = mode

	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base)
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback)
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this)
	      break
	    default:
	      assert(false, ("invalid mode: " + mode))
	  }
	};

	var prototypeAccessors = { currentRoute: {} };

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  )

	  this.app = app

	  var history = this.history

	  if (history instanceof HTML5History) {
	    history.transitionTo(getLocation(history.base))
	  } else if (history instanceof HashHistory) {
	    history.transitionTo(getHash(), function () {
	      window.addEventListener('hashchange', function () {
	        history.onHashChange()
	      })
	    })
	  }

	  history.listen(function (route) {
	    this$1.app._route = route
	  })
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn)
	};

	VueRouter.prototype.push = function push (location) {
	  this.history.push(location)
	};

	VueRouter.prototype.replace = function replace (location) {
	  this.history.replace(location)
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n)
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1)
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1)
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents () {
	  if (!this.currentRoute) {
	    return []
	  }
	  return [].concat.apply([], this.currentRoute.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	VueRouter.install = install

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter)
	}

	return VueRouter;

	})));

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
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
	/******/ 	__webpack_require__.p = "/dist/";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ({

	/***/ 0:
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(200);


	/***/ },

	/***/ 200:
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _row = __webpack_require__(201);

		var _row2 = _interopRequireDefault(_row);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/* istanbul ignore next */
		_row2.default.install = function (Vue) {
		  Vue.component(_row2.default.name, _row2.default);
		};

		exports.default = _row2.default;

	/***/ },

	/***/ 201:
	/***/ function(module, exports, __webpack_require__) {

		var __vue_exports__, __vue_options__
		var __vue_styles__ = {}

		/* script */
		__vue_exports__ = __webpack_require__(202)

		/* template */
		var __vue_template__ = __webpack_require__(203)
		__vue_options__ = __vue_exports__ = __vue_exports__ || {}
		if (
		  typeof __vue_exports__.default === "object" ||
		  typeof __vue_exports__.default === "function"
		) {
		__vue_options__ = __vue_exports__ = __vue_exports__.default
		}
		if (typeof __vue_options__ === "function") {
		  __vue_options__ = __vue_options__.options
		}

		__vue_options__.render = __vue_template__.render
		__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

		module.exports = __vue_exports__


	/***/ },

	/***/ 202:
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;
		//
		//
		//
		//
		//
		//
		//
		//
		//
		//
		//
		//
		//
		//
		//

		exports.default = {
		  name: 'ElRow',

		  props: {
		    gutter: Number,
		    type: String,
		    justify: {
		      type: String,
		      default: 'start'
		    },
		    align: {
		      type: String,
		      default: 'top'
		    }
		  },

		  computed: {
		    style: function style() {
		      var ret = {};

		      if (this.gutter) {
		        ret.marginLeft = '-' + this.gutter / 2 + 'px';
		        ret.marginRight = ret.marginLeft;
		      }

		      return ret;
		    }
		  }
		};

	/***/ },

	/***/ 203:
	/***/ function(module, exports) {

		module.exports={render:function (){var _vm=this;
		  return _vm._h('div', {
		    staticClass: "el-row",
		    class: [
		      _vm.justify !== 'start' ? 'is-justify-' + _vm.justify : '',
		      _vm.align !== 'top' ? 'is-align-' + _vm.align : '', {
		        'el-row--flex': _vm.type === 'flex'
		      }
		    ],
		    style: (_vm.style)
		  }, [_vm._t("default")])
		},staticRenderFns: []}

	/***/ }

	/******/ });

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports =
	/******/ (function(modules) { // webpackBootstrap
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
	/******/ 	__webpack_require__.p = "/dist/";

	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ({

	/***/ 0:
	/***/ function(module, exports, __webpack_require__) {

		module.exports = __webpack_require__(44);


	/***/ },

	/***/ 44:
	/***/ function(module, exports, __webpack_require__) {

		'use strict';

		exports.__esModule = true;

		var _col = __webpack_require__(45);

		var _col2 = _interopRequireDefault(_col);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/* istanbul ignore next */
		_col2.default.install = function (Vue) {
		  Vue.component(_col2.default.name, _col2.default);
		};

		exports.default = _col2.default;

	/***/ },

	/***/ 45:
	/***/ function(module, exports) {

		'use strict';

		exports.__esModule = true;

		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

		exports.default = {
		  name: 'ElCol',

		  props: {
		    span: {
		      type: Number,
		      default: 24
		    },
		    offset: Number,
		    pull: Number,
		    push: Number,
		    xs: [Number, Object],
		    sm: [Number, Object],
		    md: [Number, Object],
		    lg: [Number, Object]
		  },

		  computed: {
		    gutter: function gutter() {
		      return this.$parent.gutter;
		    },
		    style: function style() {
		      var ret = {};

		      if (this.gutter) {
		        ret.paddingLeft = this.gutter / 2 + 'px';
		        ret.paddingRight = ret.paddingLeft;
		      }

		      return ret;
		    }
		  },
		  render: function render(h) {
		    var _this = this;

		    var style = this.style;

		    var classList = [];

		    ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
		      if (_this[prop]) {
		        classList.push(prop !== 'span' ? 'el-col-' + prop + '-' + _this[prop] : 'el-col-' + _this[prop]);
		      }
		    });

		    ['xs', 'sm', 'md', 'lg'].forEach(function (size) {
		      if (typeof _this[size] === 'number') {
		        classList.push('el-col-' + size + '-' + _this[size]);
		      } else if (_typeof(_this[size]) === 'object') {
		        (function () {
		          var props = _this[size];
		          Object.keys(props).forEach(function (prop) {
		            classList.push(prop !== 'span' ? 'el-col-' + size + '-' + prop + '-' + props[prop] : 'el-col-' + size + '-' + props[prop]);
		          });
		        })();
		      }
		    });

		    return h(
		      'div',
		      {
		        'class': ['el-col', classList],
		        style: style },
		      [this.$slots.default]
		    );
		  }
		};

	/***/ }

	/******/ });

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(17)
	__vue_script__ = __webpack_require__(21)
	__vue_template__ = __webpack_require__(22)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cc70511e&file=App.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-cc70511e&file=App.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./App.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\n  .nav_list li a{\n    font-size: 15px;\n\n  }\n", ""]);

	// exports


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	// <template>
	//   <div>
	//     <div id="navigationBar">
	//       <div class="header_bg" id="home"><!-- start header -->
	//         <div class="container">
	//           <div class="row text-center col-md-8">
	//             <nav class="top-nav">
	//               <ul class="top-nav nav_list">
	//                 <!--<li><a><img src="/images/logo1.png"></a></li>-->
	//                 <li><a><img style="height: 42px" src="/images/logo-new2.png"></a></li>
	//                 <li><a href="production">作品 <span class="sr-only">(current)</span></a></li>
	//                 <li class="page-scroll"><router-link to="/about">关于</router-link></li>
	//                 <li class="logo page-scroll"><router-link to="/blog"><img src="/images/logo.png" alt="" class="responsive"/></router-link></li>
	//                 <li class="page-scroll"><router-link to="/blog">博客</router-link></li>
	//                 <li class="page-scroll"><a href="#contact">联系我</a></li>
	//                 <!--<li class="page-scroll"><a style="color: rgb(50,50,50);">联系我哦&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;池圣齐</a></li>-->
	//               </ul>
	//               <a href="#" id="pull"><img src="/images/nav-icon.png" title="menu" /></a>
	//             </nav>
	//             <div class="clearfix"></div>
	//           </div>
	//           <div class="col-md-4 text-center">
	//             <div class="from_search">
	//               <form class="form-inline" role="form" action="">
	//                 <div class="form-group">
	//                   <input type="text" class="form-control" placeholder="输入关键字">
	//                   <!--<button type="submit" class="btn btn-default col-md-3">查询</button>-->
	//                   <input type="submit" class="btn btn-default form-control" value="查询">
	//                 </div>
	//               </form>
	//             </div>
	//           </div>
	//
	//         </div>
	//       </div>
	//     </div>
	//     <!--博客-->
	//     <router-view></router-view>
	//   </div>
	// </template>
	//
	// <script>
	//es

	exports.default = {
	  data: function data() {
	    return {
	      name: "chishengqi"
	    };
	  },

	  components: {},
	  methods: {}
	};
	// </script>
	//
	// <style>
	//   .nav_list li a{
	//     font-size: 15px;
	//
	//   }
	// </style>

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "\n  <div>\n    <div id=\"navigationBar\">\n      <div class=\"header_bg\" id=\"home\"><!-- start header -->\n        <div class=\"container\">\n          <div class=\"row text-center col-md-8\">\n            <nav class=\"top-nav\">\n              <ul class=\"top-nav nav_list\">\n                <!--<li><a><img src=\"/images/logo1.png\"></a></li>-->\n                <li><a><img style=\"height: 42px\" src=\"/images/logo-new2.png\"></a></li>\n                <li><a href=\"production\">作品 <span class=\"sr-only\">(current)</span></a></li>\n                <li class=\"page-scroll\"><router-link to=\"/about\">关于</router-link></li>\n                <li class=\"logo page-scroll\"><router-link to=\"/blog\"><img src=\"/images/logo.png\" alt=\"\" class=\"responsive\"/></router-link></li>\n                <li class=\"page-scroll\"><router-link to=\"/blog\">博客</router-link></li>\n                <li class=\"page-scroll\"><a href=\"#contact\">联系我</a></li>\n                <!--<li class=\"page-scroll\"><a style=\"color: rgb(50,50,50);\">联系我哦&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;池圣齐</a></li>-->\n              </ul>\n              <a href=\"#\" id=\"pull\"><img src=\"/images/nav-icon.png\" title=\"menu\" /></a>\n            </nav>\n            <div class=\"clearfix\"></div>\n          </div>\n          <div class=\"col-md-4 text-center\">\n            <div class=\"from_search\">\n              <form class=\"form-inline\" role=\"form\" action=\"\">\n                <div class=\"form-group\">\n                  <input type=\"text\" class=\"form-control\" placeholder=\"输入关键字\">\n                  <!--<button type=\"submit\" class=\"btn btn-default col-md-3\">查询</button>-->\n                  <input type=\"submit\" class=\"btn btn-default form-control\" value=\"查询\">\n                </div>\n              </form>\n            </div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n    <!--博客-->\n    <router-view></router-view>\n  </div>\n";

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(24)
	__vue_script__ = __webpack_require__(26)
	__vue_template__ = __webpack_require__(83)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\blogIndex.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(25);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5db3d054&file=blogIndex.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./blogIndex.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5db3d054&file=blogIndex.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./blogIndex.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n   \r\n", ""]);

	// exports


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _contents = __webpack_require__(27);

	var _contents2 = _interopRequireDefault(_contents);

	var _fotter = __webpack_require__(68);

	var _fotter2 = _interopRequireDefault(_fotter);

	var _fotterEnd = __webpack_require__(78);

	var _fotterEnd2 = _interopRequireDefault(_fotterEnd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            msg: 'hello vue'
	        };
	    },

	    components: {
	        contents: _contents2.default, fotter: _fotter2.default, 'fotter-end': _fotterEnd2.default
	    }
	};
	// </script>
	//
	// <template>
	//     <div>
	//         <contents></contents>
	//         <fotter></fotter>
	//         <fotter-end></fotter-end>
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(28)
	__vue_script__ = __webpack_require__(30)
	__vue_template__ = __webpack_require__(67)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\contents.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-c1d867f8&file=contents.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contents.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-c1d867f8&file=contents.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contents.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n  #blogBackground{\r\n     /* background-color: rgb(118, 115, 115);\r\n      background-image: url('/images/bj-blue.jpg');\r\n      background-size: cover;*/\r\n  }\r\n", ""]);

	// exports


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _contentLeft = __webpack_require__(31);

	var _contentLeft2 = _interopRequireDefault(_contentLeft);

	var _contentRight = __webpack_require__(41);

	var _contentRight2 = _interopRequireDefault(_contentRight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div>
	//         <div class="blog" style="" id="blogBackground" style=" background-image: url('http://ohsmsw5ly.bkt.clouddn.com/image/bj-red.jpg');background-size: cover;"><!-- start main -->
	//             <div class="container">
	//                 <div class="main row">
	//                     <content-left></content-left>
	//                     <content-right></content-right>
	//                     <div class="clearfix"></div>
	//                 </div>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <style>
	//   #blogBackground{
	//      /* background-color: rgb(118, 115, 115);
	//       background-image: url('/images/bj-blue.jpg');
	//       background-size: cover;*/
	//   }
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            msg: 'hello vue'
	        };
	    },

	    components: {
	        'content-left': _contentLeft2.default,
	        'content-right': _contentRight2.default
	    }
	};
	// </script>
	//

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(32)
	__vue_script__ = __webpack_require__(34)
	__vue_template__ = __webpack_require__(40)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\contentLeft.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(33);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6f809226&file=contentLeft.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentLeft.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6f809226&file=contentLeft.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentLeft.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n    .item {\r\n        margin: 4px;\r\n    }\r\n\r\n", ""]);

	// exports


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _contentLeftMotto = __webpack_require__(35);

	var _contentLeftMotto2 = _interopRequireDefault(_contentLeftMotto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import loading from './../loading.vue'
	exports.default = {
	    data: function data() {
	        return {
	            switchSlider: true,
	            opacityChange: 98,
	            loading: true,
	            IsDisabled: false,
	            pageItems: [{ pagCount: 1, IsActive: true }],
	            contentMains: [{ id: '0',
	                contentTxt: 'Loading...', //文章内容
	                title: '0', //文章标题
	                day: '0', //文章日期
	                comment: '0', //评论数量
	                readNum: '0', //阅读量
	                author: '0', //作者
	                praise: '0', //点赞数
	                keyword: '0' } //关键字

	            ]
	        };
	    },

	    computed: {
	        opacity: function opacity() {
	            return this.opacityChange * 0.01;
	        }
	    },
	    created: function created() {
	        this.getContentMain(1);
	    },
	    methods: {
	        getContentMain: function getContentMain(pagCount) {
	            this.$http.post('/api/getContentMain', { limit: 3, num: pagCount }).then(function (res) {
	                this.pageItems = [];
	                for (var i = 0; i < res.data.pageCount; i++) {
	                    var pagCounts = { pagCount: i + 1, IsActive: false };
	                    this.pageItems.push(pagCounts);
	                }
	                this.pageItems[pagCount - 1].IsActive = true;
	                this.loading = false;
	                this.contentMains = res.data.list;
	                //console.log(res.data.list)
	            }, function (res) {
	                console.log(res);
	            });
	        },
	        PageTurning: function PageTurning(item) {
	            this.loading = true;
	            for (var j = 0; j < this.pageItems.length; j++) {
	                this.pageItems[j].IsActive = false;
	            }
	            item.IsActive = !item.IsActive;
	            this.contentMains = [];
	            this.getContentMain(item.pagCount);
	        },
	        PageUp: function PageUp(type) {
	            //上一页

	            if (type == -1) {
	                for (var k = 0; k < this.pageItems.length; k++) {
	                    if (this.pageItems[k].IsActive == true && this.pageItems[k].pagCount > 1) {
	                        this.pageItems[k].IsActive = false;
	                        this.pageItems[k - 1].IsActive = true;
	                        this.contentMains = [];
	                        this.loading = true;
	                        this.getContentMain(this.pageItems[k - 1].pagCount);
	                    }
	                }
	            }
	            //下一页
	            if (type == 1) {
	                for (var k = 0; k < this.pageItems.length; k++) {
	                    if (this.pageItems[k].IsActive == true && this.pageItems[k].pagCount < this.pageItems.length) {
	                        this.pageItems[k].IsActive = false;
	                        this.pageItems[k + 1].IsActive = true;
	                        this.contentMains = [];
	                        this.loading = true;
	                        this.getContentMain(this.pageItems[k + 1].pagCount);
	                    }
	                }
	            }
	            //最后一页
	            if (type == 0) {
	                for (var k = 0; k < this.pageItems.length; k++) {
	                    if (this.pageItems[k].IsActive == true && this.pageItems[k].pagCount < this.pageItems.length) {
	                        this.pageItems[k].IsActive = false;
	                        this.pageItems[this.pageItems.length - 1].IsActive = true;
	                        this.contentMains = [];
	                        this.loading = true;
	                        this.getContentMain(this.pageItems.length);
	                    }
	                }
	            }
	        }
	    },
	    components: {
	        'contentLeft-Motto': _contentLeftMotto2.default
	    }
	};

	// </script>
	//
	//
	// <style>
	//     .item {
	//         margin: 4px;
	//     }
	//
	// </style>
	// <template>
	//     <div>
	//         <div class="col-md-8 blog_left" v-bind:style="{opacity:opacity}" style="  border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;border-radius: 5px;">
	//
	//             <contentLeft-Motto></contentLeft-Motto> <!-- 座右铭-->
	//
	//
	//             <div v-loading="loading" element-loading-text="Loading..." style="width: 100%">
	//
	//                 <div id="logMain" v-for="item in contentMains" style="border-top: 1px solid #D1D0DF;">
	//
	//                     <div class="blog_main" style="margin-top: 30px;">
	//                         <h4>
	//                             <a href="#" style="margin-top: 3px; float:left;box-sizing: border-box; color: rgb(255, 255, 255);text-decoration: none; padding: 3px 6px; font-size: 14px; display: inline-block;position: relative; top: -2px; margin-right: 6px;font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; line-height: 17.1429px;white-space: normal; background-color: rgb(69, 188, 249); border-radius: 4px;">
	//                                 {{item.keyword}} <em style="" class="keyword_icon"></em></a>
	//                             <router-link :to="'/search/'+item._id+'#home'" style="font-weight: 600">{{item.title}}</router-link>
	//                         </h4>
	//                         <div class="blog_list pull-left">
	//                             <ul class="list-unstyled">
	//                                 <li><i class="fa fa-calendar-o"></i><span>{{item.day}} </span></li>
	//                                 <li><a href="#contact"><i class="fa fa-comment "></i>
	//                                     <el-badge :value="item.comment" class="item">
	//                                         <span>评论</span>
	//                                     </el-badge>
	//                                    </a></li>
	//                                 <li><i class="fa fa-user"></i><span>{{item.author}}</span></li>
	//                                 <li><a href="#"><i class="fa fa-eye"></i>
	//                                     <el-badge :value="item.readNum" class="item">
	//                                     <span>阅读量</span>
	//                                 </el-badge>
	//                                 </a></li>
	//                             </ul>
	//                         </div>
	//                         <div class="b_left pull-right">
	//                             <!--<a href="praise?<%=post._id%>" ><i class="fa fa-heart"></i><span><%= post.praise %></span></a>-->
	//                             <a href="javascript:;" @click="praiseOn(item._id)"><i class="fa fa-heart"></i>
	//                                 <el-badge :value="item.praise" class="item">
	//                                 <span></span>
	//                             </el-badge>
	//                             </a>
	//                         </div>
	//                         <div class="clearfix"></div>
	//
	//                         <!--<p class="para" style="height: 160px; overflow: hidden;color: rgb(119, 95, 128);background: rgb(225, 213, 220);border-radius: 15px;">-->
	//                         <blockquote  class="para" style="letter-spacing:1px;height: 173px; overflow: hidden;color: rgb(119, 95, 128);background: rgb(225, 213, 220);border-radius: 15px;">
	//                             {{item.contentTxt}}
	//                         </blockquote>
	//                             <!--<loading v-show="showLoad"></loading>-->
	//
	//
	//                         <!--</p>-->
	//                         <div class="read_more btm" >
	//                             <!--<a :href="'search?'+item._id" style="background-color: #A1509C">阅读更多</a>-->
	//                             <router-link :to="'/search/'+item._id+'#home'" style="background-color: #A1509C">阅读更多 </router-link>
	//
	//                         </div>
	//                     </div>
	//                     <hr>
	//                </div>
	//             </div>
	//             <!--Slider 滑块 调节透明度-->
	//             <div class="block">
	//                 <el-switch v-model="switchSlider"  on-color="#13ce66" off-color="#ff4949"></el-switch>
	//                 <span class="demonstration" style="font-family:Microsoft YaHei">调节透敏度</span>
	//                 <!--<el-slider :min="30" v-show="switchSlider" v-model="opacityChange"></el-slider>-->
	//             </div>
	//             <!--分页条-->
	//             <div style="text-align: center">
	//                 <ul class="pagination">
	//                     <li :class="{disabled:IsDisabled}"><a href="#" @click="getContentMain(1)">&laquo;</a></li>
	//                     <li><a href="#" @click="PageUp(-1)">上一页</a></li>
	//                     <li :class="{active:item.IsActive}" v-for="item in pageItems" @click="PageTurning(item)"><a href="#">{{item.pagCount}}</a></li>
	//                     <li><a href="#" @click="PageUp(1)">下一页</a></li>
	//                     <li><a href="#" @click="PageUp(0)">&raquo;</a></li>
	//                 </ul>
	//             </div>
	//             <!--end-->
	//         </div>
	//     </div>
	// </template>
	//
	// <script>

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(36)
	__vue_script__ = __webpack_require__(38)
	__vue_template__ = __webpack_require__(39)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\contentLeftMotto.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a62d3392&file=contentLeftMotto.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentLeftMotto.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a62d3392&file=contentLeftMotto.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentLeftMotto.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n\r\n", ""]);

	// exports


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//         <h2 class="h2style row" style=" border-radius: 10px;color: rgb(17, 15, 15);background-color: rgb(225, 213, 220)">
	//             <p class="col-md-7" style="letter-spacing:3px;">宁可在骄阳里暴晒,也不愿在黑暗中偷生!</p>
	//             <div class="col-md-5">
	//                 <!--<img src="http://mjs.sinaimg.cn/wap/online/public/images/weather/day/yu.gif?v=2016092216"-->
	//                 <!--width="20" height="20">-->
	//                 北京 · {{text}} ·  {{temperature}}°C
	//             </div>
	//         </h2>
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>

	exports.default = {
	    data: function data() {
	        return {
	            text: '',
	            temperature: ''
	        };
	    },

	    created: function created() {
	        this.GetWeatherInfo();
	    },
	    methods: {
	        GetWeatherInfo: function GetWeatherInfo() {
	            this.$http.get('/api/weather').then(function (response) {
	                if (response.data && response.data.results) {
	                    this.text = response.data.results[0].now.text;
	                    this.temperature = response.data.results[0].now.temperature;
	                } else {
	                    this.text = '';
	                    this.temperature = '';
	                }
	            }, function (response) {
	                console.log(response);
	            });
	        }
	    }
	};
	// </script>
	//

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <h2 class=\"h2style row\" style=\" border-radius: 10px;color: rgb(17, 15, 15);background-color: rgb(225, 213, 220)\">\r\n            <p class=\"col-md-7\" style=\"letter-spacing:3px;\">宁可在骄阳里暴晒,也不愿在黑暗中偷生!</p>\r\n            <div class=\"col-md-5\">\r\n                <!--<img src=\"http://mjs.sinaimg.cn/wap/online/public/images/weather/day/yu.gif?v=2016092216\"-->\r\n                <!--width=\"20\" height=\"20\">-->\r\n                北京 · {{text}} ·  {{temperature}}°C\r\n            </div>\r\n        </h2>\r\n    </div>\r\n";

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"col-md-8 blog_left\" v-bind:style=\"{opacity:opacity}\" style=\"  border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;border-radius: 5px;\">\r\n\r\n            <contentLeft-Motto></contentLeft-Motto> <!-- 座右铭-->\r\n\r\n\r\n            <div v-loading=\"loading\" element-loading-text=\"Loading...\" style=\"width: 100%\">\r\n\r\n                <div id=\"logMain\" v-for=\"item in contentMains\" style=\"border-top: 1px solid #D1D0DF;\">\r\n\r\n                    <div class=\"blog_main\" style=\"margin-top: 30px;\">\r\n                        <h4>\r\n                            <a href=\"#\" style=\"margin-top: 3px; float:left;box-sizing: border-box; color: rgb(255, 255, 255);text-decoration: none; padding: 3px 6px; font-size: 14px; display: inline-block;position: relative; top: -2px; margin-right: 6px;font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; line-height: 17.1429px;white-space: normal; background-color: rgb(69, 188, 249); border-radius: 4px;\">\r\n                                {{item.keyword}} <em style=\"\" class=\"keyword_icon\"></em></a>\r\n                            <router-link :to=\"'/search/'+item._id+'#home'\" style=\"font-weight: 600\">{{item.title}}</router-link>\r\n                        </h4>\r\n                        <div class=\"blog_list pull-left\">\r\n                            <ul class=\"list-unstyled\">\r\n                                <li><i class=\"fa fa-calendar-o\"></i><span>{{item.day}} </span></li>\r\n                                <li><a href=\"#contact\"><i class=\"fa fa-comment \"></i>\r\n                                    <el-badge :value=\"item.comment\" class=\"item\">\r\n                                        <span>评论</span>\r\n                                    </el-badge>\r\n                                   </a></li>\r\n                                <li><i class=\"fa fa-user\"></i><span>{{item.author}}</span></li>\r\n                                <li><a href=\"#\"><i class=\"fa fa-eye\"></i>\r\n                                    <el-badge :value=\"item.readNum\" class=\"item\">\r\n                                    <span>阅读量</span>\r\n                                </el-badge>\r\n                                </a></li>\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"b_left pull-right\">\r\n                            <!--<a href=\"praise?<%=post._id%>\" ><i class=\"fa fa-heart\"></i><span><%= post.praise %></span></a>-->\r\n                            <a href=\"javascript:;\" @click=\"praiseOn(item._id)\"><i class=\"fa fa-heart\"></i>\r\n                                <el-badge :value=\"item.praise\" class=\"item\">\r\n                                <span></span>\r\n                            </el-badge>\r\n                            </a>\r\n                        </div>\r\n                        <div class=\"clearfix\"></div>\r\n\r\n                        <!--<p class=\"para\" style=\"height: 160px; overflow: hidden;color: rgb(119, 95, 128);background: rgb(225, 213, 220);border-radius: 15px;\">-->\r\n                        <blockquote  class=\"para\" style=\"letter-spacing:1px;height: 173px; overflow: hidden;color: rgb(119, 95, 128);background: rgb(225, 213, 220);border-radius: 15px;\">\r\n                            {{item.contentTxt}}\r\n                        </blockquote>\r\n                            <!--<loading v-show=\"showLoad\"></loading>-->\r\n\r\n\r\n                        <!--</p>-->\r\n                        <div class=\"read_more btm\" >\r\n                            <!--<a :href=\"'search?'+item._id\" style=\"background-color: #A1509C\">阅读更多</a>-->\r\n                            <router-link :to=\"'/search/'+item._id+'#home'\" style=\"background-color: #A1509C\">阅读更多 </router-link>\r\n\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n               </div>\r\n            </div>\r\n            <!--Slider 滑块 调节透明度-->\r\n            <div class=\"block\">\r\n                <el-switch v-model=\"switchSlider\"  on-color=\"#13ce66\" off-color=\"#ff4949\"></el-switch>\r\n                <span class=\"demonstration\" style=\"font-family:Microsoft YaHei\">调节透敏度</span>\r\n                <!--<el-slider :min=\"30\" v-show=\"switchSlider\" v-model=\"opacityChange\"></el-slider>-->\r\n            </div>\r\n            <!--分页条-->\r\n            <div style=\"text-align: center\">\r\n                <ul class=\"pagination\">\r\n                    <li :class=\"{disabled:IsDisabled}\"><a href=\"#\" @click=\"getContentMain(1)\">&laquo;</a></li>\r\n                    <li><a href=\"#\" @click=\"PageUp(-1)\">上一页</a></li>\r\n                    <li :class=\"{active:item.IsActive}\" v-for=\"item in pageItems\" @click=\"PageTurning(item)\"><a href=\"#\">{{item.pagCount}}</a></li>\r\n                    <li><a href=\"#\" @click=\"PageUp(1)\">下一页</a></li>\r\n                    <li><a href=\"#\" @click=\"PageUp(0)\">&raquo;</a></li>\r\n                </ul>\r\n            </div>\r\n            <!--end-->\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(42)
	__vue_script__ = __webpack_require__(44)
	__vue_template__ = __webpack_require__(66)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\contentRight.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(43);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-845266e6&file=contentRight.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRight.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-845266e6&file=contentRight.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRight.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n\r\n    .el-row {\r\n        margin-bottom: 20px;\r\n\r\n    }\r\n    .el-col {\r\n        border-radius: 4px;\r\n    }\r\n    .bg-purple-dark {\r\n        background: #99a9bf;\r\n    }\r\n    .bg-purple {\r\n        background: #d3dce6;\r\n    }\r\n    .bg-purple-light {\r\n        background: #e5e9f2;\r\n    }\r\n    .grid-content {\r\n        border-radius: 4px;\r\n        min-height: 36px;\r\n    }\r\n    .row-bg {\r\n        padding: 10px 0;\r\n        background-color: #f9fafc;\r\n    }\r\n", ""]);

	// exports


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _contentRightNote = __webpack_require__(45);

	var _contentRightNote2 = _interopRequireDefault(_contentRightNote);

	var _contentRightColor = __webpack_require__(56);

	var _contentRightColor2 = _interopRequireDefault(_contentRightColor);

	var _contentRightEmail = __webpack_require__(61);

	var _contentRightEmail2 = _interopRequireDefault(_contentRightEmail);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div>
	//         <div class="col-md-4 blog_right" v-bind:style="{opacity:opacity}">
	//             <div style="border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;;border-radius: 5px;">
	//
	//                 <ul class="ads_nav list-unstyled" >
	//                     <h4>{{date}}</h4>
	//                     <li><a href="#"><img class="img-responsive" src="/images/me.jpg" alt=""> </a></li>
	//                     <li><span class="blog_top">这是一个程序员的独立博客站，主要用于分享与编程技术相关的内容，
	// 								同时这里也是博主记录工作学习中遇到的问题及其解决方案的地方。</span></li>
	//                     <div class="clearfix"></div>
	//                 </ul>
	//
	//                 <!--<div class="clearfix"></div>-->
	//                 <link rel="stylesheet" href="/stylesheets/iconfont.css">
	//                 <div>
	//                     <el-row :gutter="20">
	//                         <el-col :span="6" class="icon_lists" style="text-align: center">
	//                             <a  class="icon iconfont" href="https://github.com/" target="_blank" title="github">&#xe69f;</a>
	//                             <div class="name">github</div>
	//                         </el-col>
	//                         <el-col :span="6" class="icon_lists" style="text-align: center">
	//                             <a class="icon iconfont" href="http://w.qq.com/" target="_blank" title="QQ">&#xe613;</a>
	//                             <div class="name">腾讯QQ</div>
	//                         </el-col>
	//                         <el-col :span="6" class="icon_lists" style="text-align: center">
	//                             <a class="icon iconfont" href="http://www.imooc.com/" target="_blank" title="慕课网">&#xe648;</a>
	//                             <div class="name">慕课网</div>
	//                         </el-col>
	//                         <el-col :span="6" class="icon_lists" style="text-align: center">
	//                             <a class="icon iconfont" href="https://cnodejs.org/" target="_blank" title="CNde社区">&#xe989;</a>
	//                             <div class="name">nodejs</div>
	//                         </el-col>
	//
	//                     </el-row>
	//                 </div>
	//
	//             </div>
	//             <!--留言条-->
	//             <content-Right-Note></content-Right-Note>
	//             <!--背景色-->
	//             <content-Right-Color></content-Right-Color>
	//             <!--关键词-->
	//             <div style="border: 1px rgb(238,238,238) solid; margin-top: 15px;background-color: #F9FAFC;border-radius: 5px;">
	//                 <ul class="tag_nav list-unstyled" style="text-align: center">
	//                     <h4 style="text-align: left">关键词</h4>
	//                     <hr>
	//                     <li class="active"><a href="#">分页</a></li>
	//                     <li><a href="#">bootstrap</a></li>
	//                     <li><a href="#">cookie</a></li>
	//                     <li><a href="#">heroku</a></li>
	//                     <li><a href="#">百度分享</a></li>
	//                     <li><a href="#">nodejs</a></li>
	//                     <li><a href="#">云服务器</a></li>
	//                     <li><a href="#">github</a></li>
	//                     <li><a href="#">ueditor</a></li>
	//                     <div class="clearfix"></div>
	//                 </ul>
	//             </div>
	//             <contentRightEmail></contentRightEmail>
	//         </div>
	//     </div>
	// </template>
	// <script>
	var todayDate = new Date(); //生成流水号
	var year = todayDate.getFullYear(); // 年
	var day = todayDate.getDate(); //日
	var month = todayDate.getMonth() + 1; //月
	var ddd = year + "-" + month + "-" + day;
	exports.default = {
	    data: function data() {
	        return {
	            opacity: 0.98,
	            date: ddd
	        };
	    },
	    components: {
	        'content-Right-Note': _contentRightNote2.default, 'content-Right-Color': _contentRightColor2.default, contentRightEmail: _contentRightEmail2.default
	    }
	};

	// </script>
	//
	//
	// <style>
	//
	//     .el-row {
	//         margin-bottom: 20px;
	//
	//     }
	//     .el-col {
	//         border-radius: 4px;
	//     }
	//     .bg-purple-dark {
	//         background: #99a9bf;
	//     }
	//     .bg-purple {
	//         background: #d3dce6;
	//     }
	//     .bg-purple-light {
	//         background: #e5e9f2;
	//     }
	//     .grid-content {
	//         border-radius: 4px;
	//         min-height: 36px;
	//     }
	//     .row-bg {
	//         padding: 10px 0;
	//         background-color: #f9fafc;
	//     }
	// </style>

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(46)
	__vue_script__ = __webpack_require__(48)
	__vue_template__ = __webpack_require__(55)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\contentRightNote.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a4e0d5c2&file=contentRightNote.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRightNote.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-a4e0d5c2&file=contentRightNote.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRightNote.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n    .NoteText{width: 85%;display: inline-block;overflow: hidden;}\r\n    .NoteFloor{background: #d9534f}\r\n", ""]);

	// exports


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _loading = __webpack_require__(49);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            NoteShow: true, //留言显示
	            leMessage: true, //条数显示
	            showLoadNote: true,
	            IsDisabled: false,
	            items: [{ MessageText: 'Loading...', floor: 1 }],
	            pageItems: [{ pagCount: 1, IsActive: true }]
	        };
	    },

	    created: function created() {
	        this.GetNoteContent(1);
	    },
	    methods: {
	        GetNoteContent: function GetNoteContent(pageNum) {
	            var page = pageNum || 1;
	            this.$http.post('/api/note', { num: page }).then(function (response) {
	                this.showLoadNote = false;
	                this.items = response.data.list;
	                this.pageItems = [];
	                for (var i = 0; i < response.data.pageCount; i++) {
	                    var pagCounts = { pagCount: i + 1, IsActive: false };
	                    this.pageItems.push(pagCounts);
	                }
	                this.pageItems[page - 1].IsActive = true;
	                // this.$set('gridData', {a:2})
	            }, function (response) {
	                this.showLoadNote = false;
	                /* this.$message({
	                     type: 'error',
	                     message: '数据库连接超时,查询失败!'
	                 });*/
	                console.log(response);
	            });
	        },
	        PageTurning: function PageTurning(item) {
	            this.showLoadNote = true;
	            for (var j = 0; j < this.pageItems.length; j++) {
	                this.pageItems[j].IsActive = false;
	            }
	            item.IsActive = !item.IsActive;
	            this.GetNoteContent(item.pagCount);
	        },
	        PageUp: function PageUp(type) {
	            //上一页
	            this.showLoadNote = true;
	            if (type == -1) {
	                for (var k = 0; k < this.pageItems.length; k++) {
	                    if (this.pageItems[k].IsActive == true && this.pageItems[k].pagCount > 1) {
	                        this.pageItems[k].IsActive = false;
	                        this.pageItems[k - 1].IsActive = true;
	                        this.GetNoteContent(this.pageItems[k - 1].pagCount);
	                    }
	                }
	            }
	            //下一页
	            if (type == 1) {
	                for (var k = 0; k < this.pageItems.length; k++) {
	                    if (this.pageItems[k].IsActive == true && this.pageItems[k].pagCount < this.pageItems.length) {
	                        this.pageItems[k].IsActive = false;
	                        this.pageItems[k + 1].IsActive = true;
	                        this.GetNoteContent(this.pageItems[k + 1].pagCount);
	                    }
	                }
	            }
	            //最后一页
	            if (type == 0) {
	                for (var k = 0; k < this.pageItems.length; k++) {
	                    if (this.pageItems[k].IsActive == true && this.pageItems[k].pagCount < this.pageItems.length) {
	                        this.pageItems[k].IsActive = false;
	                        this.pageItems[this.pageItems.length - 1].IsActive = true;
	                        this.GetNoteContent(this.pageItems.length);
	                    }
	                }
	            }
	        },
	        changeMessage: function changeMessage() {
	            this.leMessage = !this.leMessage;
	        },
	        changNote: function changNote() {
	            this.NoteShow = !this.NoteShow;
	        }

	    },
	    components: { loadingNote: _loading2.default }

	};
	// </script>
	//
	// <template>
	//     <div>
	//         <!--留言条-->
	//         <div style="border: 1px rgb(238,238,238) solid; margin-top: 10px;background-color: #F9FAFC;border-radius: 5px;" v-show="NoteShow">
	//             <p style="margin: 10px 10px;">
	//
	//                 <span class="label label-warning">留言</span>
	//                 <span id="close" @click="changNote" class="glyphicon glyphicon-remove-sign" style="float: right;;margin-right: 10px"></span>
	//                 <span id="shrink" @click="changeMessage" class="glyphicon glyphicon-minus-sign" style="float: right;margin-right: 10px"></span>
	//             </p>
	//             <div v-show="leMessage" class="list-group list-group-flush list-paddingleft-2" style="list-style-type: none;">
	//                 <!--<loadingNote v-show="showLoadNote" style="padding-bottom: 100px"></loadingNote>-->
	//                 <div v-loading="showLoadNote" element-loading-text="Loading..." style="width: 100%;padding-bottom: 10px;">
	//                     <div v-for="item in items">
	//
	//                         <a href="#" class="list-group-item" >
	//                             <span  class="badge NoteFloor">{{item.floor}}F</span>
	//                             <span class="NoteText">{{item.MessageText}}</span>
	//                         </a>
	//                     </div>
	//                 </div>
	//                 <div style="text-align: center">
	//                     <ul class="pagination">
	//                         <li :class="{disabled:IsDisabled}"><a href="javascript:;" @click="GetNoteContent(1)">&laquo;</a></li>
	//                         <li><a href="javascript:;" @click="PageUp(-1)">上一页</a></li>
	//                         <li :class="{active:item.IsActive}" v-for="item in pageItems" @click="PageTurning(item)"><a href="javascript:;">{{item.pagCount}}</a></li>
	//                         <li><a href="javascript:;" @click="PageUp(1)">下一页</a></li>
	//                         <li><a href="javascript:;" @click="PageUp(0)">&raquo;</a></li>
	//                     </ul>
	//                 </div>
	//
	//
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <style>
	//     .NoteText{width: 85%;display: inline-block;overflow: hidden;}
	//     .NoteFloor{background: #d9534f}
	// </style>
	// <script>

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(50)
	__vue_script__ = __webpack_require__(52)
	__vue_template__ = __webpack_require__(54)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\loading.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(51);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-732b95a8&file=loading.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./loading.vue", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-732b95a8&file=loading.vue!./../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./loading.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n    #loading-center-absolute {\r\n        text-align: center;\r\n        height: 20px;\r\n        width: 30px;\r\n        margin:0 auto;\r\n        position:relative;\r\n\r\n    }\r\n    .ooo{\r\n        height: 20px;\r\n        text-align: center;\r\n\r\n    }\r\n    .object{\r\n        width: 20px;\r\n        height: 20px;\r\n\r\n        background-color: #db5800;\r\n        border-radius: 50% 50% 50% 50%;\r\n        margin-right: 20px;\r\n        margin-bottom: 20px;\r\n\r\n        position: absolute;\r\n        top:50%;\r\n        margin-top: 80px;\r\n\r\n    }\r\n\r\n\r\n    #object_one{\r\n        -webkit-animation: object 2s linear infinite;\r\n        animation: object 2s linear infinite;\r\n    }\r\n    #object_two{\r\n        -webkit-animation: object 2s linear infinite -.4s;\r\n        animation: object 2s linear infinite -.4s;\r\n    }\r\n    #object_three{\r\n        -webkit-animation: object 2s linear infinite -.8s;\r\n        animation: object 2s linear infinite -.8s;\r\n    }\r\n    #object_four{\r\n        -webkit-animation: object 2s linear infinite -1.2s;\r\n        animation: object 2s linear infinite -1.2s;\r\n    }\r\n    #object_five{\r\n        -webkit-animation: object 2s linear infinite -1.6s;\r\n        animation: object 2s linear infinite -1.6s;\r\n    }\r\n\r\n\r\n    @-webkit-keyframes object{\r\n        0% { left: 100px; top:0}\r\n        80% { left: 0; top:0;}\r\n        85% { left: 0; top: -20px; width: 20px; height: 20px;}\r\n        90% { width: 40px; height: 15px; }\r\n        95% { left: 100px; top: -20px; width: 20px; height: 20px;}\r\n        100% { left: 100px; top:0; }\r\n\r\n    }\r\n    @keyframes object{\r\n        0% { left: 100px; top:0}\r\n        80% { left: 0; top:0;}\r\n        85% { left: 0; top: -20px; width: 20px; height: 20px;}\r\n        90% { width: 40px; height: 15px; }\r\n        95% { left: 100px; top: -20px; width: 20px; height: 20px;}\r\n        100% { left: 100px; top:0; }\r\n    }\r\n\r\n", ""]);

	// exports


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _loading = __webpack_require__(53);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            msg: 'hello vue'
	        };
	    },

	    components: {}
	};
	// </script>
	// <style>
	//     #loading-center-absolute {
	//         text-align: center;
	//         height: 20px;
	//         width: 30px;
	//         margin:0 auto;
	//         position:relative;
	//
	//     }
	//     .ooo{
	//         height: 20px;
	//         text-align: center;
	//
	//     }
	//     .object{
	//         width: 20px;
	//         height: 20px;
	//
	//         background-color: #db5800;
	//         -moz-border-radius: 50% 50% 50% 50%;
	//         -webkit-border-radius: 50% 50% 50% 50%;
	//         border-radius: 50% 50% 50% 50%;
	//         margin-right: 20px;
	//         margin-bottom: 20px;
	//
	//         position: absolute;
	//         top:50%;
	//         margin-top: 80px;
	//
	//     }
	//
	//
	//     #object_one{
	//         -webkit-animation: object 2s linear infinite;
	//         animation: object 2s linear infinite;
	//     }
	//     #object_two{
	//         -webkit-animation: object 2s linear infinite -.4s;
	//         animation: object 2s linear infinite -.4s;
	//     }
	//     #object_three{
	//         -webkit-animation: object 2s linear infinite -.8s;
	//         animation: object 2s linear infinite -.8s;
	//     }
	//     #object_four{
	//         -webkit-animation: object 2s linear infinite -1.2s;
	//         animation: object 2s linear infinite -1.2s;
	//     }
	//     #object_five{
	//         -webkit-animation: object 2s linear infinite -1.6s;
	//         animation: object 2s linear infinite -1.6s;
	//     }
	//
	//
	//     @-webkit-keyframes object{
	//         0% { left: 100px; top:0}
	//         80% { left: 0; top:0;}
	//         85% { left: 0; top: -20px; width: 20px; height: 20px;}
	//         90% { width: 40px; height: 15px; }
	//         95% { left: 100px; top: -20px; width: 20px; height: 20px;}
	//         100% { left: 100px; top:0; }
	//
	//     }
	//     @keyframes object{
	//         0% { left: 100px; top:0}
	//         80% { left: 0; top:0;}
	//         85% { left: 0; top: -20px; width: 20px; height: 20px;}
	//         90% { width: 40px; height: 15px; }
	//         95% { left: 100px; top: -20px; width: 20px; height: 20px;}
	//         100% { left: 100px; top:0; }
	//     }
	//
	// </style>
	// <template>
	//     <div>
	//         <div class="ooo">
	//         <div id="loading-center-absolute">
	//             <div class="object" id="object_one"></div>
	//             <div class="object" id="object_two" style="left:20px;"></div>
	//             <div class="object" id="object_three" style="left:40px;"></div>
	//             <div class="object" id="object_four" style="left:60px;"></div>
	//             <div class="object" id="object_five" style="left:80px;"></div>
	//
	//         </div>
	//         </div>
	//     </div>
	// </template>
	//
	// <script>
	//import HeaderComponent from './components/header.vue'

/***/ },
/* 53 */
/***/ function(module, exports) {

	"use strict";

	$(window).load(function () {
		//$("#loading").delay(2000).fadeOut(500);
		$("#loading-center").click(function () {
			$("#loading").fadeOut(500);
		});
	});

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"ooo\">\r\n        <div id=\"loading-center-absolute\">\r\n            <div class=\"object\" id=\"object_one\"></div>\r\n            <div class=\"object\" id=\"object_two\" style=\"left:20px;\"></div>\r\n            <div class=\"object\" id=\"object_three\" style=\"left:40px;\"></div>\r\n            <div class=\"object\" id=\"object_four\" style=\"left:60px;\"></div>\r\n            <div class=\"object\" id=\"object_five\" style=\"left:80px;\"></div>\r\n\r\n        </div>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <!--留言条-->\r\n        <div style=\"border: 1px rgb(238,238,238) solid; margin-top: 10px;background-color: #F9FAFC;border-radius: 5px;\" v-show=\"NoteShow\">\r\n            <p style=\"margin: 10px 10px;\">\r\n\r\n                <span class=\"label label-warning\">留言</span>\r\n                <span id=\"close\" @click=\"changNote\" class=\"glyphicon glyphicon-remove-sign\" style=\"float: right;;margin-right: 10px\"></span>\r\n                <span id=\"shrink\" @click=\"changeMessage\" class=\"glyphicon glyphicon-minus-sign\" style=\"float: right;margin-right: 10px\"></span>\r\n            </p>\r\n            <div v-show=\"leMessage\" class=\"list-group list-group-flush list-paddingleft-2\" style=\"list-style-type: none;\">\r\n                <!--<loadingNote v-show=\"showLoadNote\" style=\"padding-bottom: 100px\"></loadingNote>-->\r\n                <div v-loading=\"showLoadNote\" element-loading-text=\"Loading...\" style=\"width: 100%;padding-bottom: 10px;\">\r\n                    <div v-for=\"item in items\">\r\n\r\n                        <a href=\"#\" class=\"list-group-item\" >\r\n                            <span  class=\"badge NoteFloor\">{{item.floor}}F</span>\r\n                            <span class=\"NoteText\">{{item.MessageText}}</span>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n                <div style=\"text-align: center\">\r\n                    <ul class=\"pagination\">\r\n                        <li :class=\"{disabled:IsDisabled}\"><a href=\"javascript:;\" @click=\"GetNoteContent(1)\">&laquo;</a></li>\r\n                        <li><a href=\"javascript:;\" @click=\"PageUp(-1)\">上一页</a></li>\r\n                        <li :class=\"{active:item.IsActive}\" v-for=\"item in pageItems\" @click=\"PageTurning(item)\"><a href=\"javascript:;\">{{item.pagCount}}</a></li>\r\n                        <li><a href=\"javascript:;\" @click=\"PageUp(1)\">下一页</a></li>\r\n                        <li><a href=\"javascript:;\" @click=\"PageUp(0)\">&raquo;</a></li>\r\n                    </ul>\r\n                </div>\r\n\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(57)
	__vue_script__ = __webpack_require__(59)
	__vue_template__ = __webpack_require__(60)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\contentRightColor.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-12ee6f86&file=contentRightColor.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRightColor.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-12ee6f86&file=contentRightColor.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRightColor.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n", ""]);

	// exports


/***/ },
/* 59 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//         <div id="colorList" class="list-group" style="margin-top: 10px;border: 1px rgb(238,238,238) solid; background-color: #F9FAFC;;border-radius: 5px;">
	//             <p style="margin: 10px 10px;">
	//                 <span class="label label-danger" style="">背景色切换</span>
	//
	//                 <span class="glyphicon glyphicon-refresh" style="float: right;;margin-right: 10px"></span>
	//             </p>
	//             <div v-for="item in items">
	//                 <a  :class="[classLi,{'active':item.IsActive}]" @click="changeColor(item)">
	//                     {{item.color}}
	//                 </a>
	//             </div>
	//
	//         </div>
	//     </div>
	// </template>
	// <style>
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            classLi: "list-group-item",
	            items: [{ color: "默认", IsActive: false }, { color: "水蓝", IsActive: false }, { color: "火红", IsActive: true }]
	        };
	    },

	    methods: {
	        changeColor: function changeColor(item) {
	            for (var i = 0; i < this.items.length; i++) {
	                this.items[i].IsActive = false;
	            }
	            item.IsActive = !item.IsActive;
	        }
	    }
	};
	// </script>
	//

/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div id=\"colorList\" class=\"list-group\" style=\"margin-top: 10px;border: 1px rgb(238,238,238) solid; background-color: #F9FAFC;;border-radius: 5px;\">\r\n            <p style=\"margin: 10px 10px;\">\r\n                <span class=\"label label-danger\" style=\"\">背景色切换</span>\r\n\r\n                <span class=\"glyphicon glyphicon-refresh\" style=\"float: right;;margin-right: 10px\"></span>\r\n            </p>\r\n            <div v-for=\"item in items\">\r\n                <a  :class=\"[classLi,{'active':item.IsActive}]\" @click=\"changeColor(item)\">\r\n                    {{item.color}}\r\n                </a>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(62)
	__vue_script__ = __webpack_require__(64)
	__vue_template__ = __webpack_require__(65)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\contentRightEmail.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(63);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1b3ec73f&file=contentRightEmail.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRightEmail.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1b3ec73f&file=contentRightEmail.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./contentRightEmail.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n\r\n", ""]);

	// exports


/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//
	//         <!--订阅信-->
	//         <div class="news_letter">
	//             <h4>新闻信</h4>
	//             <form method="post" action="SendEmail" v-on:submit.prevent="onSubmit">
	//                 <span><input type="text" placeholder="Your email address" v-model="Email"></span>
	//                 <span  class="pull-right fa-btn btn-1 btn-1e">
	//                     <input type="submit" value="订阅">
	//                 </span>
	//             </form>
	//         </div>
	//
	//
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>

	exports.default = {
	    data: function data() {
	        return {
	            Email: ''
	        };
	    },

	    components: {},
	    methods: {
	        onSubmit: function onSubmit() {
	            this.SendLeMessage();
	        },
	        SendLeMessage: function SendLeMessage() {

	            this.$http.post('/api/email', { Email: this.Email }).then(function (res) {

	                if (res.data.success) {
	                    alert("测试邮件已发送目标邮箱!!");
	                } else {
	                    alert("邮件地址有误,测试发送邮箱失败!!");
	                }
	            });
	        }
	    }
	};
	// </script>
	//

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n\r\n        <!--订阅信-->\r\n        <div class=\"news_letter\">\r\n            <h4>新闻信</h4>\r\n            <form method=\"post\" action=\"SendEmail\" v-on:submit.prevent=\"onSubmit\">\r\n                <span><input type=\"text\" placeholder=\"Your email address\" v-model=\"Email\"></span>\r\n                <span  class=\"pull-right fa-btn btn-1 btn-1e\">\r\n                    <input type=\"submit\" value=\"订阅\">\r\n                </span>\r\n            </form>\r\n        </div>\r\n\r\n\r\n    </div>\r\n";

/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"col-md-4 blog_right\" v-bind:style=\"{opacity:opacity}\">\r\n            <div style=\"border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;;border-radius: 5px;\">\r\n\r\n                <ul class=\"ads_nav list-unstyled\" >\r\n                    <h4>{{date}}</h4>\r\n                    <li><a href=\"#\"><img class=\"img-responsive\" src=\"/images/me.jpg\" alt=\"\"> </a></li>\r\n                    <li><span class=\"blog_top\">这是一个程序员的独立博客站，主要用于分享与编程技术相关的内容，\r\n\t\t\t\t\t\t\t\t同时这里也是博主记录工作学习中遇到的问题及其解决方案的地方。</span></li>\r\n                    <div class=\"clearfix\"></div>\r\n                </ul>\r\n\r\n                <!--<div class=\"clearfix\"></div>-->\r\n                <link rel=\"stylesheet\" href=\"/stylesheets/iconfont.css\">\r\n                <div>\r\n                    <el-row :gutter=\"20\">\r\n                        <el-col :span=\"6\" class=\"icon_lists\" style=\"text-align: center\">\r\n                            <a  class=\"icon iconfont\" href=\"https://github.com/\" target=\"_blank\" title=\"github\">&#xe69f;</a>\r\n                            <div class=\"name\">github</div>\r\n                        </el-col>\r\n                        <el-col :span=\"6\" class=\"icon_lists\" style=\"text-align: center\">\r\n                            <a class=\"icon iconfont\" href=\"http://w.qq.com/\" target=\"_blank\" title=\"QQ\">&#xe613;</a>\r\n                            <div class=\"name\">腾讯QQ</div>\r\n                        </el-col>\r\n                        <el-col :span=\"6\" class=\"icon_lists\" style=\"text-align: center\">\r\n                            <a class=\"icon iconfont\" href=\"http://www.imooc.com/\" target=\"_blank\" title=\"慕课网\">&#xe648;</a>\r\n                            <div class=\"name\">慕课网</div>\r\n                        </el-col>\r\n                        <el-col :span=\"6\" class=\"icon_lists\" style=\"text-align: center\">\r\n                            <a class=\"icon iconfont\" href=\"https://cnodejs.org/\" target=\"_blank\" title=\"CNde社区\">&#xe989;</a>\r\n                            <div class=\"name\">nodejs</div>\r\n                        </el-col>\r\n\r\n                    </el-row>\r\n                </div>\r\n\r\n            </div>\r\n            <!--留言条-->\r\n            <content-Right-Note></content-Right-Note>\r\n            <!--背景色-->\r\n            <content-Right-Color></content-Right-Color>\r\n            <!--关键词-->\r\n            <div style=\"border: 1px rgb(238,238,238) solid; margin-top: 15px;background-color: #F9FAFC;border-radius: 5px;\">\r\n                <ul class=\"tag_nav list-unstyled\" style=\"text-align: center\">\r\n                    <h4 style=\"text-align: left\">关键词</h4>\r\n                    <hr>\r\n                    <li class=\"active\"><a href=\"#\">分页</a></li>\r\n                    <li><a href=\"#\">bootstrap</a></li>\r\n                    <li><a href=\"#\">cookie</a></li>\r\n                    <li><a href=\"#\">heroku</a></li>\r\n                    <li><a href=\"#\">百度分享</a></li>\r\n                    <li><a href=\"#\">nodejs</a></li>\r\n                    <li><a href=\"#\">云服务器</a></li>\r\n                    <li><a href=\"#\">github</a></li>\r\n                    <li><a href=\"#\">ueditor</a></li>\r\n                    <div class=\"clearfix\"></div>\r\n                </ul>\r\n            </div>\r\n            <contentRightEmail></contentRightEmail>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"blog\" style=\"\" id=\"blogBackground\" style=\" background-image: url('http://ohsmsw5ly.bkt.clouddn.com/image/bj-red.jpg');background-size: cover;\"><!-- start main -->\r\n            <div class=\"container\">\r\n                <div class=\"main row\">\r\n                    <content-left></content-left>\r\n                    <content-right></content-right>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(69)
	__vue_script__ = __webpack_require__(71)
	__vue_template__ = __webpack_require__(77)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\fotter.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(70);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-876eea40&file=fotter.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./fotter.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-876eea40&file=fotter.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./fotter.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n    .slide-fade-enter-active {\r\n        -webkit-transition: all .8s ease;\r\n        transition: all .8s ease;\r\n    }\r\n    .slide-fade-leave-active {\r\n        -webkit-transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);\r\n        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);\r\n    }\r\n    .slide-fade-enter, .slide-fade-leave-active {\r\n        padding-left: 10px;\r\n        opacity: 0;\r\n    }\r\n    .Danger{\r\n        background-color: #FF4949;\r\n    }\r\n    .Success{\r\n        background-color: #13CE66;\r\n    }\r\n    .right{\r\n        position: relative ; float: right !important;\r\n    }\r\n    .form_waring{\r\n        border:1px solid #FF4949!important;\r\n    }\r\n", ""]);

	// exports


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _diglog = __webpack_require__(72);

	var _diglog2 = _interopRequireDefault(_diglog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            items: [{ gly: 'glyphicon glyphicon-bold', position: '', text: '加粗' }, { gly: 'glyphicon glyphicon-italic', position: '', text: '倾斜' }, { gly: 'glyphicon glyphicon-list', position: '', text: '列表' }, { gly: 'glyphicon glyphicon-link', position: '', text: '链接' }, { gly: 'glyphicon glyphicon-picture', position: '', text: '上传图片' }, { gly: 'glyphicon glyphicon-eye-open', position: '', text: '预览' }, { gly: 'glyphicon glyphicon-trash', position: '', text: '清空' }, { gly: 'glyphicon glyphicon-question-sign', position: '', text: '帮助' }, { gly: 'glyphicon glyphicon-resize-full', position: 'right', text: '全屏' }],
	            diglog: '<strong>警告！</strong>连接数据库失败。',
	            color: 'Success',
	            alert: false,
	            showClose: false,
	            visible: true,
	            state: '',
	            email: '',
	            nickname: '起个昵称吧',
	            messages: '',
	            waring_name: false,
	            waring_email: false
	        };
	    },
	    components: {
	        diglog: _diglog2.default
	    },
	    mounted: function mounted() {
	        this.restaurants = this.loadAll();
	    },

	    methods: {
	        //邮箱验证
	        fun_email: function fun_email() {
	            var re = /^\w+@[a-z0-9]+(\.[a-z]{2,3}){1,3}$/ig;
	            if (!re.test(this.email)) {
	                this.waring_email = true;
	            } else {
	                this.waring_email = false;
	            }
	        },
	        //昵称栏光标移开事件
	        fun_name: function fun_name() {
	            var re = /\D+/g;
	            if (!re.test(this.state)) {
	                this.waring_name = true;
	            } else {

	                this.waring_name = false;
	            }
	        },
	        writingPrompt: function writingPrompt(index) {
	            switch (index) {
	                case 0:
	                    this.messages = this.messages + '****';
	                    break;
	                default:
	                    break;
	            }
	        },
	        close: function close() {
	            this.alert = false;
	        },
	        ///将留言数据发送服务器
	        SendLeMessage: function SendLeMessage() {
	            this.$http.post('/api/LeMessage').then(function (res) {
	                this.diglog = '<h4>提交成功!!</h4>';
	                this.color = 'Success';
	                this.alert = true;
	                var self = this;
	                setTimeout(function () {
	                    self.alert = false;
	                }, 2000);
	                console.log(res.data.success);
	            }, function (res) {
	                this.diglog = '<h4>提交失败,服务器异常!!</h4>';
	                this.color = 'Danger';
	                this.alert = true;
	                var self = this;

	                console.log(res);
	            });
	        },
	        //el select选择器函数
	        createFilter: function createFilter(queryString) {
	            return function (restaurant) {
	                return restaurant.value.indexOf(queryString.toLowerCase()) === 0;
	            };
	        },
	        loadAll: function loadAll() {
	            return [{ "value": "君莫笑" }, { "value": "夜雨声烦" }, { "value": "包子入侵" }, { "value": "一叶知秋" }, { "value": "寒烟柔" }, { "value": "沐雨橙风" }, { "value": "月中眠" }, { "value": "王不留行" }, { "value": "逢山鬼泣" }, { "value": "蓝桥春雪" }, { "value": "斩楼兰" }];
	        },
	        handleSelect: function handleSelect(item) {
	            console.log(item.value);
	        },
	        querySearch: function querySearch(queryString, cb) {
	            var restaurants = this.restaurants;
	            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
	            // 调用 callback 返回建议列表的数据
	            cb(results);
	        },
	        open: function open() {
	            if (this.messages == '' || this.state == '') {
	                this.diglog = '<h4>错误！昵称和内容不允许为空!!</h4>';
	                this.color = 'Danger';
	                this.alert = true;
	                var self = this;
	                setTimeout(function () {
	                    self.alert = false;
	                }, 2000);
	            } else {
	                var MessageAll = {
	                    nickname: this.nickname,
	                    email: this.email,
	                    messages: this.messages
	                };
	                this.SendLeMessage();
	            }
	        }
	    }

	};

	// </script>
	//
	// <template>
	//     <div>
	//         <transition name="slide-fade">
	//             <div class="alert" v-bind:class="[color]" v-show="alert" style="position: fixed;top:0;width: 100%; text-align: center" v-html="diglog">
	//                 <a href="javascript:;" class="close" @click="close">
	//                     &times;
	//                 </a>
	//             </div>
	//         </transition>
	//         <div class="footer_bg" id="contact"><!-- start footer -->
	//             <div class="container">
	//                 <div class="row footer">
	//                     <div class="col-md-8 contact_left">
	//                         <h3>chishengqi</h3>
	//                         <p>可以给博主留言噢~:</p>
	//                         <form method="post" action="LeMessage"  >
	//                             <!--<input type="text" name="nickname" v-model="nickname" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = '起个昵称吧';}">
	//                             <input type="text" name="email" v-model="email" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'Email';}">-->
	//                             <el-col :span="30" class="tac">
	//                                 <el-autocomplete v-model="state" :fetch-suggestions="querySearch"  placeholder="起个昵称吧" @select="handleSelect"></el-autocomplete>
	//                                 <input  type="text" v-model="email" @blur="fun_email()" placeholder="Email" v-bind:class="{form_waring :waring_email}">
	//                                 <p v-show="waring_email" style="color:#FF4949"><span style="padding-right: 10px">*</span>邮箱格式有误</p>
	//                             </el-col>
	//                             <div class="btn-group" style="width: 100%;background-color: #9C9C9C;border-radius: 4px;">
	//                                 <!--<button type="button" class="btn btn-default" :class="[item.position]" onmouseover="this.style.backgroundColor='';"-->
	//                                        <!--onmouseout="this.style.backgroundColor='#9C9C9C';"-->
	//                                         <!--v-for="(item,index) in items" style="border: none;background-color: #9C9C9C"  @click="writingPrompt(index)">-->
	//                                     <!--<span :class="[item.gly]"></span>{{item.text}}-->
	//                                 <!--</button>-->
	//
	//                             </div>
	//                             <textarea name="MessageText" style="margin-top: 0"
	//                                       v-model="messages"  ></textarea>
	//                             <!--<span class="pull-right"><button type="primary" data-toggle="modal" data-target="#myModal" style="padding:15px;background-color: #2B9C85 ">提交留言</button></span>-->
	//                             <span class="pull-right"><input type="submit" data-toggle="modal" data-target="#myModal" value="提交留言"></span>
	//                         </form>
	//                     </div>
	//                     <div class="col-md-4  contact_right">
	//                         <p><span>座右铭 :</span> The best preparation for tomorrow is doing your best today .</p>
	//                         <ul class="list-unstyled address">
	//                             <li><i class="fa fa-map-marker"></i><span>北京黄村火车站</span></li>
	//                             <li><i class="fa fa-phone"></i><span>(00) 110</span></li>
	//                             <li><i class="fa fa-envelope"></i><a href="mailto:122377305@qq.com">122377305@qq.com</a></li>
	//                         </ul>
	//                     </div>
	//                 </div>
	//             </div>
	//         </div>
	//         <diglog @open="open" model="myModal"></diglog>
	//     </div>
	// </template>
	// <style>
	//     .slide-fade-enter-active {
	//         transition: all .8s ease;
	//     }
	//     .slide-fade-leave-active {
	//         transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	//     }
	//     .slide-fade-enter, .slide-fade-leave-active {
	//         padding-left: 10px;
	//         opacity: 0;
	//     }
	//     .Danger{
	//         background-color: #FF4949;
	//     }
	//     .Success{
	//         background-color: #13CE66;
	//     }
	//     .right{
	//         position: relative ; float: right !important;
	//     }
	//     .form_waring{
	//         border:1px solid #FF4949!important;
	//     }
	// </style>
	// <script>

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(73)
	__vue_script__ = __webpack_require__(75)
	__vue_template__ = __webpack_require__(76)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\Mycomponents\\diglog.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(74);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7ae992ac&file=diglog.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./diglog.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7ae992ac&file=diglog.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./diglog.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n   \r\n", ""]);

	// exports


/***/ },
/* 75 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//         <div class="modal fade" :id="model" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	//             <div class="modal-dialog">
	//                 <div class="modal-content">
	//                     <div class="modal-header">
	//                         <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	//                         <h4 class="modal-title" id="myModalLabel">提示</h4>
	//                     </div>
	//                     <div class="modal-body" style="font-size: 18px;">确认是否提交？</div>
	//                     <div class="modal-footer">
	//                         <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	//                         <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submit">提交</button>
	//                     </div>
	//                 </div><!-- /.modal-content -->
	//             </div><!-- /.modal -->
	//         </div>
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>
	//import HeaderComponent from './components/header.vue'
	//import OtherComponent from './components/other.vue'
	exports.default = {
	    data: function data() {
	        return {};
	    },

	    props: ['model'],
	    components: {},
	    watch: {},
	    methods: {
	        submit: function submit() {
	            this.$emit('open');
	        }
	    }
	};
	// </script>
	//

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"modal fade\" :id=\"model\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n            <div class=\"modal-dialog\">\r\n                <div class=\"modal-content\">\r\n                    <div class=\"modal-header\">\r\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n                        <h4 class=\"modal-title\" id=\"myModalLabel\">提示</h4>\r\n                    </div>\r\n                    <div class=\"modal-body\" style=\"font-size: 18px;\">确认是否提交？</div>\r\n                    <div class=\"modal-footer\">\r\n                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>\r\n                        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" @click=\"submit\">提交</button>\r\n                    </div>\r\n                </div><!-- /.modal-content -->\r\n            </div><!-- /.modal -->\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <transition name=\"slide-fade\">\r\n            <div class=\"alert\" v-bind:class=\"[color]\" v-show=\"alert\" style=\"position: fixed;top:0;width: 100%; text-align: center\" v-html=\"diglog\">\r\n                <a href=\"javascript:;\" class=\"close\" @click=\"close\">\r\n                    &times;\r\n                </a>\r\n            </div>\r\n        </transition>\r\n        <div class=\"footer_bg\" id=\"contact\"><!-- start footer -->\r\n            <div class=\"container\">\r\n                <div class=\"row footer\">\r\n                    <div class=\"col-md-8 contact_left\">\r\n                        <h3>chishengqi</h3>\r\n                        <p>可以给博主留言噢~:</p>\r\n                        <form method=\"post\" action=\"LeMessage\"  >\r\n                            <!--<input type=\"text\" name=\"nickname\" v-model=\"nickname\" onFocus=\"this.value = '';\" onBlur=\"if (this.value == '') {this.value = '起个昵称吧';}\">\r\n                            <input type=\"text\" name=\"email\" v-model=\"email\" onFocus=\"this.value = '';\" onBlur=\"if (this.value == '') {this.value = 'Email';}\">-->\r\n                            <el-col :span=\"30\" class=\"tac\">\r\n                                <el-autocomplete v-model=\"state\" :fetch-suggestions=\"querySearch\"  placeholder=\"起个昵称吧\" @select=\"handleSelect\"></el-autocomplete>\r\n                                <input  type=\"text\" v-model=\"email\" @blur=\"fun_email()\" placeholder=\"Email\" v-bind:class=\"{form_waring :waring_email}\">\r\n                                <p v-show=\"waring_email\" style=\"color:#FF4949\"><span style=\"padding-right: 10px\">*</span>邮箱格式有误</p>\r\n                            </el-col>\r\n                            <div class=\"btn-group\" style=\"width: 100%;background-color: #9C9C9C;border-radius: 4px;\">\r\n                                <!--<button type=\"button\" class=\"btn btn-default\" :class=\"[item.position]\" onmouseover=\"this.style.backgroundColor='';\"-->\r\n                                       <!--onmouseout=\"this.style.backgroundColor='#9C9C9C';\"-->\r\n                                        <!--v-for=\"(item,index) in items\" style=\"border: none;background-color: #9C9C9C\"  @click=\"writingPrompt(index)\">-->\r\n                                    <!--<span :class=\"[item.gly]\"></span>{{item.text}}-->\r\n                                <!--</button>-->\r\n\r\n                            </div>\r\n                            <textarea name=\"MessageText\" style=\"margin-top: 0\"\r\n                                      v-model=\"messages\"  ></textarea>\r\n                            <!--<span class=\"pull-right\"><button type=\"primary\" data-toggle=\"modal\" data-target=\"#myModal\" style=\"padding:15px;background-color: #2B9C85 \">提交留言</button></span>-->\r\n                            <span class=\"pull-right\"><input type=\"submit\" data-toggle=\"modal\" data-target=\"#myModal\" value=\"提交留言\"></span>\r\n                        </form>\r\n                    </div>\r\n                    <div class=\"col-md-4  contact_right\">\r\n                        <p><span>座右铭 :</span> The best preparation for tomorrow is doing your best today .</p>\r\n                        <ul class=\"list-unstyled address\">\r\n                            <li><i class=\"fa fa-map-marker\"></i><span>北京黄村火车站</span></li>\r\n                            <li><i class=\"fa fa-phone\"></i><span>(00) 110</span></li>\r\n                            <li><i class=\"fa fa-envelope\"></i><a href=\"mailto:122377305@qq.com\">122377305@qq.com</a></li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <diglog @open=\"open\" model=\"myModal\"></diglog>\r\n    </div>\r\n";

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(79)
	__vue_script__ = __webpack_require__(81)
	__vue_template__ = __webpack_require__(82)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\blog\\fotterEnd.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6fdad08b&file=fotterEnd.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./fotterEnd.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-6fdad08b&file=fotterEnd.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./fotterEnd.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n   \r\n", ""]);

	// exports


/***/ },
/* 81 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//         <div class="footer1_bg"><!-- start footer1 -->
	//             <div class="container">
	//                 <div class="row  footer">
	//                     <div class="copy text-center">
	//                         <p class="link"><span>Copyright &copy; 2016.Csqblog 联系我:122377305@qq.com.<a target="_blank" href="http://www.huiyi8.com/moban/">github</a></span></p>
	//                         <a href="#home" id="toTop" style="display: block;"><span id="toTopHover" style="opacity: 1;"> </span></a>
	//                     </div>
	//                 </div>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>
	$(function () {
	    $('a[href*=#]:not([href=#])').click(function () {
	        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

	            var target = $(this.hash);
	            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	            if (target.length) {
	                $('html,body').animate({
	                    scrollTop: target.offset().top
	                }, 1000);
	                return false;
	            }
	        }
	    });
	});
	exports.default = {
	    data: function data() {
	        return {
	            msg: 'hello vue'
	        };
	    },

	    created: function created() {},

	    methods: {},
	    components: {}
	};
	// </script>
	//

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"footer1_bg\"><!-- start footer1 -->\r\n            <div class=\"container\">\r\n                <div class=\"row  footer\">\r\n                    <div class=\"copy text-center\">\r\n                        <p class=\"link\"><span>Copyright &copy; 2016.Csqblog 联系我:122377305@qq.com.<a target=\"_blank\" href=\"http://www.huiyi8.com/moban/\">github</a></span></p>\r\n                        <a href=\"#home\" id=\"toTop\" style=\"display: block;\"><span id=\"toTopHover\" style=\"opacity: 1;\"> </span></a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <contents></contents>\r\n        <fotter></fotter>\r\n        <fotter-end></fotter-end>\r\n    </div>\r\n";

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(85)
	__vue_script__ = __webpack_require__(87)
	__vue_template__ = __webpack_require__(108)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\Article\\searchArcitle.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(86);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5fc891d8&file=searchArcitle.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./searchArcitle.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5fc891d8&file=searchArcitle.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./searchArcitle.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n\r\n", ""]);

	// exports


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ArticleLeft = __webpack_require__(88);

	var _ArticleLeft2 = _interopRequireDefault(_ArticleLeft);

	var _ArticleRight = __webpack_require__(92);

	var _ArticleRight2 = _interopRequireDefault(_ArticleRight);

	var _comment = __webpack_require__(98);

	var _comment2 = _interopRequireDefault(_comment);

	var _ArticleFoot = __webpack_require__(103);

	var _ArticleFoot2 = _interopRequireDefault(_ArticleFoot);

	var _fotterEnd = __webpack_require__(78);

	var _fotterEnd2 = _interopRequireDefault(_fotterEnd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//import fotterEnd from './../blog/fotter.vue'
	exports.default = {
	    data: function data() {
	        return {
	            load: true,
	            keyword: '',
	            content: '',
	            title: 'Loading...',
	            msg: 'hello vue',
	            ArticleId: '11'
	        };
	    },
	    created: function created() {
	        this.GetArticleContent();
	    },

	    methods: {
	        ArticleChange: function ArticleChange(ArticleId) {
	            this.ArticleId = ArticleId;
	            this.content = '';
	            this.title = 'Loading...';
	            this.load = true;
	            this.GetArticleContent(ArticleId);
	        },
	        GetArticleContent: function GetArticleContent(ArticleId) {
	            this.$http.post('/GetArticleContent', { articleId: ArticleId || this.$route.params.id }).then(function (res) {
	                this.load = false;
	                this.keyword = res.data.keyword;
	                this.title = res.data.title;
	                this.content = res.data.content;
	            }, function (res) {
	                this.load = false;
	                //console.log(res)
	            });
	        }
	    },
	    components: {
	        ArticleLeft: _ArticleLeft2.default, ArticleFoot: _ArticleFoot2.default, 'fotter-end': _fotterEnd2.default, comment: _comment2.default, ArticleRight: _ArticleRight2.default
	    }
	};
	// </script>
	//
	// <template>
	//     <div>
	//         <div class="" style="background-image: url('/images/bj-red.jpg');background-size: cover;"><!-- start main -->
	//             <div class="container">
	//                 <div class="main row">
	//                     <div class="col-md-8 blog_left" style="border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;">
	//                         <!--路径导航  面包屑-->
	//                         <!--各路径间的分隔符已经自动通过 CSS 的 :before 和 content 属性添加了-->
	//                         <!-- <loading v-show="load"></loading>-->
	//                         <div v-loading="load" element-loading-text="Loading..." style="width: 100%">
	//                             <ol class="breadcrumb" style="margin-top: 10px;">
	//                                 <li ><a class="glyphicon glyphicon-home" href="blog"></a></li>
	//                                 <li ><a href="blog" >CsqBlog</a></li>
	//                                 <li class="active">{{keyword}}</li>
	//                             </ol>
	//                             <h2 class="style">{{title}}</h2>
	//                             <p style="text-align: center">
	//                     <span style="color: rgb(153, 153, 153);
	//                     font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;
	//                     line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);">关键词:</span>
	//                     <span style="box-sizing: border-box; margin-right: 12px; color: rgb(153, 153, 153);
	//                      font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;
	//                     line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);">{{keyword}}></span>
	//                             </p>
	//                             <hr>
	//                             <div class="details row">
	//                                 <div class="col-md-12" style="color: rgb(61, 68, 80);
	//                     font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
	//                      font-size: 15px; line-height: 25px; background-color: rgb(255, 255, 255);overflow: hidden" v-html="content">
	//
	//                                 </div>
	//                                 <div class="bdsharebuttonbox" style="margin-left: 20px">
	//                                     <a href="#" class="bds_more" data-cmd="more"></a>
	//                                     <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
	//                                     <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
	//                                     <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
	//                                     <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
	//                                     <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
	//                                 </div>
	//
	//                             </div>
	//                         </div>
	//
	//                     </div>
	//                     <ArticleRight v-on:SelectArticle="ArticleChange"></ArticleRight>
	//                  </div>
	//                 </div>
	//             </div>
	//         <comment :fun="ArticleId"></comment>
	//         <ArticleFoot></ArticleFoot>
	//         <fotter-end></fotter-end>
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(89)
	__vue_script__ = __webpack_require__(91)
	__vue_template__ = __webpack_require__(97)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\Article\\ArticleLeft.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(90);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-22ee9a67&file=ArticleLeft.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ArticleLeft.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-22ee9a67&file=ArticleLeft.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ArticleLeft.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n   \r\n", ""]);

	// exports


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _ArticleRight = __webpack_require__(92);

	var _ArticleRight2 = _interopRequireDefault(_ArticleRight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            load: true,
	            keyword: '',
	            content: '',
	            title: 'Loading...',
	            msg: 'hello vue'
	        };
	    },

	    components: {

	        ArticleRight: _ArticleRight2.default
	    }, created: function created() {
	        this.GetArticleContent();
	    },
	    methods: {
	        ArticleChange: function ArticleChange(ArticleId) {
	            this.content = '';
	            this.title = 'Loading...';
	            this.load = true;
	            this.GetArticleContent(ArticleId);
	        },
	        GetArticleContent: function GetArticleContent(ArticleId) {
	            this.$http.post('/GetArticleContent', { articleId: ArticleId || this.$route.params.id }).then(function (res) {
	                this.load = false;
	                this.keyword = res.data.keyword;
	                this.title = res.data.title;
	                this.content = res.data.content;
	            }, function (res) {
	                this.load = false;
	                console.log(res);
	            });
	        }
	    }
	};
	// </script>
	//
	// <template>
	//     <div>
	//         <!--文章内容-->
	//
	//         <div class="col-md-8 blog_left" style="border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;">
	//             <div v-loading="load" element-loading-text="Loading..." style="width: 100%">
	//                 <ol class="breadcrumb" style="margin-top: 10px;">
	//                     <li ><a class="glyphicon glyphicon-home" href="blog"></a></li>
	//                     <li ><a href="blog" >CsqBlog</a></li>
	//                     <li class="active">{{keyword}}</li>
	//                 </ol>
	//                 <h2 class="style">{{title}}</h2>
	//                 <p style="text-align: center">
	//                     <span style="color: rgb(153, 153, 153);
	//                     font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;
	//                     line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);">关键词:</span>
	//                     <span style="box-sizing: border-box; margin-right: 12px; color: rgb(153, 153, 153);
	//                      font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;
	//                     line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);">{{keyword}}></span>
	//                 </p>
	//                 <hr>
	//                 <div class="details row">
	//                     <div class="col-md-12" style="color: rgb(61, 68, 80);
	//                     font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;
	//                      font-size: 15px; line-height: 25px; background-color: rgb(255, 255, 255);overflow: hidden" v-html="content">
	//
	//                     </div>
	//                     <div class="bdsharebuttonbox" style="margin-left: 20px">
	//                         <a href="#" class="bds_more" data-cmd="more"></a>
	//                         <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
	//                         <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
	//                         <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
	//                         <a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网"></a>
	//                         <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
	//                     </div>
	//
	//                 </div>
	//             </div>
	//
	//         </div>
	//         <ArticleRight v-on:SelectArticle="ArticleChange"></ArticleRight>
	//    </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(93)
	__vue_script__ = __webpack_require__(95)
	__vue_template__ = __webpack_require__(96)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\Article\\ArticleRight.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(94);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7829cc6c&file=ArticleRight.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ArticleRight.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7829cc6c&file=ArticleRight.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ArticleRight.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n    .slide-fade-enter-active {\r\n        -webkit-transition: all .8s ease;\r\n        transition: all .8s ease;\r\n    }\r\n    .slide-fade-leave-active {\r\n        -webkit-transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);\r\n        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);\r\n    }\r\n    .slide-fade-enter, .slide-fade-leave-active {\r\n        padding-left: 10px;\r\n        opacity: 0;\r\n    }\r\n    .NoteText{width: 80%;font-size: 13px; font-weight: bold}\r\n    .NoteFloor{background: #d9534f}\r\n    .flr{float: right;;margin-right: 10px}\r\n", ""]);

	// exports


/***/ },
/* 95 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//         <div class="col-md-4">
	//             <div style="border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;border-radius: 5px;" >
	//                 <p style="margin: 10px 10px;">
	//                     <span class="label label-warning">文章列表</span>
	//                     <span class="glyphicon glyphicon-minus-sign flr" @click="chang"></span>
	//                 </p>
	//                 <transition name="slide-fade">
	//                    <div v-show="tit">
	//                         <div v-for="(item, index) in items" >
	//                             <ul  class="list-group" style="list-style-type: none;">
	//                                 <li>
	//                                     <a  @click="ChangeArticle(item._id)" href="javascript:;" class="list-group-item">
	//                                         <span class="NoteText">{{item.title}}</span>
	//                                         <span  class="badge NoteFloor">第{{index+1}}篇</span>
	//                                     </a>
	//                                 </li>
	//                             </ul>
	//                         </div>
	//                    </div>
	//                 </transition>
	//             </div>
	//         </div>
	//
	//     </div>
	// </template>
	// <style>
	//     .slide-fade-enter-active {
	//         transition: all .8s ease;
	//     }
	//     .slide-fade-leave-active {
	//         transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	//     }
	//     .slide-fade-enter, .slide-fade-leave-active {
	//         padding-left: 10px;
	//         opacity: 0;
	//     }
	//     .NoteText{width: 80%;font-size: 13px; font-weight: bold}
	//     .NoteFloor{background: #d9534f}
	//     .flr{float: right;;margin-right: 10px}
	// </style>
	// <script>

	exports.default = {
	    data: function data() {
	        return {
	            tit: true,
	            items: [{ text: '第一篇', title: '用Promise重构nodejs异步代码', _id: '57fc996d9d5d243c062bde3b' }]
	        };
	    },

	    components: {}, created: function created() {
	        this.GetArticleList();
	    },
	    methods: {
	        ChangeArticle: function ChangeArticle(id) {
	            this.$emit('SelectArticle', id);
	        },
	        chang: function chang() {
	            this.tit = !this.tit;
	        },
	        GetArticleList: function GetArticleList() {
	            this.$http.get('/api/getArticleList').then(function (res) {

	                //console.log(res.data)
	                this.items = res.data;
	            }, function (res) {
	                /*  this.load=false
	                  console.log(res)*/
	            });
	        }
	    }
	};
	// </script>
	//

/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"col-md-4\">\r\n            <div style=\"border: 1px rgb(238,238,238) solid;background-color: #F9FAFC;border-radius: 5px;\" >\r\n                <p style=\"margin: 10px 10px;\">\r\n                    <span class=\"label label-warning\">文章列表</span>\r\n                    <span class=\"glyphicon glyphicon-minus-sign flr\" @click=\"chang\"></span>\r\n                </p>\r\n                <transition name=\"slide-fade\">\r\n                   <div v-show=\"tit\">\r\n                        <div v-for=\"(item, index) in items\" >\r\n                            <ul  class=\"list-group\" style=\"list-style-type: none;\">\r\n                                <li>\r\n                                    <a  @click=\"ChangeArticle(item._id)\" href=\"javascript:;\" class=\"list-group-item\">\r\n                                        <span class=\"NoteText\">{{item.title}}</span>\r\n                                        <span  class=\"badge NoteFloor\">第{{index+1}}篇</span>\r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                   </div>\r\n                </transition>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n";

/***/ },
/* 97 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <!--文章内容-->\r\n\r\n        <div class=\"col-md-8 blog_left\" style=\"border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;\">\r\n            <div v-loading=\"load\" element-loading-text=\"Loading...\" style=\"width: 100%\">\r\n                <ol class=\"breadcrumb\" style=\"margin-top: 10px;\">\r\n                    <li ><a class=\"glyphicon glyphicon-home\" href=\"blog\"></a></li>\r\n                    <li ><a href=\"blog\" >CsqBlog</a></li>\r\n                    <li class=\"active\">{{keyword}}</li>\r\n                </ol>\r\n                <h2 class=\"style\">{{title}}</h2>\r\n                <p style=\"text-align: center\">\r\n                    <span style=\"color: rgb(153, 153, 153);\r\n                    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;\r\n                    line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);\">关键词:</span>\r\n                    <span style=\"box-sizing: border-box; margin-right: 12px; color: rgb(153, 153, 153);\r\n                     font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;\r\n                    line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);\">{{keyword}}></span>\r\n                </p>\r\n                <hr>\r\n                <div class=\"details row\">\r\n                    <div class=\"col-md-12\" style=\"color: rgb(61, 68, 80);\r\n                    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;\r\n                     font-size: 15px; line-height: 25px; background-color: rgb(255, 255, 255);overflow: hidden\" v-html=\"content\">\r\n\r\n                    </div>\r\n                    <div class=\"bdsharebuttonbox\" style=\"margin-left: 20px\">\r\n                        <a href=\"#\" class=\"bds_more\" data-cmd=\"more\"></a>\r\n                        <a href=\"#\" class=\"bds_qzone\" data-cmd=\"qzone\" title=\"分享到QQ空间\"></a>\r\n                        <a href=\"#\" class=\"bds_tsina\" data-cmd=\"tsina\" title=\"分享到新浪微博\"></a>\r\n                        <a href=\"#\" class=\"bds_tqq\" data-cmd=\"tqq\" title=\"分享到腾讯微博\"></a>\r\n                        <a href=\"#\" class=\"bds_renren\" data-cmd=\"renren\" title=\"分享到人人网\"></a>\r\n                        <a href=\"#\" class=\"bds_weixin\" data-cmd=\"weixin\" title=\"分享到微信\"></a>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <ArticleRight v-on:SelectArticle=\"ArticleChange\"></ArticleRight>\r\n   </div>\r\n";

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(99)
	__vue_script__ = __webpack_require__(101)
	__vue_template__ = __webpack_require__(102)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\Article\\comment.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(100);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-31e13a6e&file=comment.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./comment.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-31e13a6e&file=comment.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./comment.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n   \r\n", ""]);

	// exports


/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//         <div class="blog" style="background-color: rgb(238,238,238) "><!-- start main -->
	//             <div class="container">
	//                 <div class="main row">
	//                     <div class="col-md-12 comment-num" style="">
	//                         {{articleNum}}条评论
	//                     </div>
	//                     <!--start -->
	//                     <div class="col-md-12 blog_left" style="border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;" v-for="item in comments">
	//                         <ol class="comment">
	//                             <li>
	//                                 <article class="comment-body">
	//                                     <footer class="comment-meta">
	//                                         <p class="comment-left">
	//                                             <img src="/images/tx1.jpg" class="avatar avatar-70 photo" height="60" width="60" data-bd-imgshare-binded="1" />
	//                                             <strong class="fn" style="box-sizing: border-box;">
	//                                                 <a href="" rel="external nofollow" class="floor">{{item.nickname}} ></a>
	//                                             </strong>
	//                                             <span class="says">say :</span>
	//                                         </p>
	//                                         <p class="comment-right">
	//                                             <a href="#">
	//                                                 {{item.day}}
	//                                                 <span>{{item.floor}} 楼</span>
	//
	//                                             </a>
	//                                         </p>
	//                                     </footer>
	//                                     <p  class="comment-text" v-html="item.articleText">
	//
	//                                     </p>
	//                                     <p>
	//                                         <a class="comment-reply-link" href="#contact" >回复</a>
	//                                     </p>
	//                                 </article>
	//                                 <hr>
	//                             </li>
	//                         </ol>
	//                     </div>
	//
	//                 </div>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            articleNum: '',
	            comments: []
	        };
	    },
	    created: function created() {
	        this.GetComment();
	    },

	    props: ['fun'],
	    watch: {
	        fun: function fun() {
	            this.GetComment();
	        }
	    },
	    methods: {
	        GetComment: function GetComment() {
	            this.$http.post('/api/GetComment', { articleId: this.fun || this.$route.params.id }).then(function (res) {
	                this.articleNum = res.data.articleNum;
	                this.comments = res.data.article;
	            }, function (res) {
	                console.log(res);
	            });
	        }
	    },
	    components: {}
	};
	// </script>
	//

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"blog\" style=\"background-color: rgb(238,238,238) \"><!-- start main -->\r\n            <div class=\"container\">\r\n                <div class=\"main row\">\r\n                    <div class=\"col-md-12 comment-num\" style=\"\">\r\n                        {{articleNum}}条评论\r\n                    </div>\r\n                    <!--start -->\r\n                    <div class=\"col-md-12 blog_left\" style=\"border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;\" v-for=\"item in comments\">\r\n                        <ol class=\"comment\">\r\n                            <li>\r\n                                <article class=\"comment-body\">\r\n                                    <footer class=\"comment-meta\">\r\n                                        <p class=\"comment-left\">\r\n                                            <img src=\"/images/tx1.jpg\" class=\"avatar avatar-70 photo\" height=\"60\" width=\"60\" data-bd-imgshare-binded=\"1\" />\r\n                                            <strong class=\"fn\" style=\"box-sizing: border-box;\">\r\n                                                <a href=\"\" rel=\"external nofollow\" class=\"floor\">{{item.nickname}} ></a>\r\n                                            </strong>\r\n                                            <span class=\"says\">say :</span>\r\n                                        </p>\r\n                                        <p class=\"comment-right\">\r\n                                            <a href=\"#\">\r\n                                                {{item.day}}\r\n                                                <span>{{item.floor}} 楼</span>\r\n\r\n                                            </a>\r\n                                        </p>\r\n                                    </footer>\r\n                                    <p  class=\"comment-text\" v-html=\"item.articleText\">\r\n\r\n                                    </p>\r\n                                    <p>\r\n                                        <a class=\"comment-reply-link\" href=\"#contact\" >回复</a>\r\n                                    </p>\r\n                                </article>\r\n                                <hr>\r\n                            </li>\r\n                        </ol>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(104)
	__vue_script__ = __webpack_require__(106)
	__vue_template__ = __webpack_require__(107)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\Article\\ArticleFoot.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(105);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-57fd0964&file=ArticleFoot.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ArticleFoot.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-57fd0964&file=ArticleFoot.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./ArticleFoot.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n\r\n", ""]);

	// exports


/***/ },
/* 106 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div>
	//         <div class="footer_bg" id="contact"><!-- start footer -->
	//
	//             <div class="container">
	//                 <div class="row footer">
	//                     <div class="col-md-8 contact_left">
	//                         <h3>评论</h3>
	//                         <p>发表您的见解吧:</h4>
	//                         <form method="post" v-bind:action="comment">
	//                             <input type="text" name="nicknameComment" v-model="nickname" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = '起个昵称吧(必填)';}">
	//                             <input type="text" name="emailComment" value="输入您的邮箱" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'Email';}">
	//                             <textarea id="editor" style="height: 200px;" v-model="articleText" name="articleTextComment"  onFocus="if(this.value == 'Your Message here....') this.value='';" onBlur="if(this.value == '') this.value='Your Message here....;'" ></textarea>
	//                             <span class="pull-right" ><input type="submit"  value="提交" @click="commentSubmit"></span>
	//                         </form>
	//                     </div>
	//                     <!--<div class="col-md-4  contact_right">
	//                         <p><span>座右铭 :</span> The best preparation for tomorrow is doing your best today .</p>
	//                         <ul class="list-unstyled address">
	//                             <li><i class="fa fa-map-marker"></i><span></span></li>
	//                             <li><i class="fa fa-phone"></i><span></span></li>
	//                             <li><i class="fa fa-envelope"></i><a href="mailto:info@mycompany.com">122377305@qq.com</a></li>
	//                         </ul>
	//                     </div>-->
	//                 </div>
	//             </div>
	//         </div>
	//       </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            ok: false,
	            articleText: '',
	            comment: this.$route.params.id + '/commit',
	            nickname: "起个昵称吧(必填)",
	            messages: 'Your Message here....'
	        };
	    },
	    created: function created() {},
	    methods: {
	        commentSubmit: function commentSubmit(ev) {
	            var arr = [];
	            var ue = UE.getEditor('editor');
	            arr.push(ue.getContent());
	            var text = arr.join("\n");
	            if (text.length > 500) {
	                alert("内容超长!!");
	                ev.preventDefault();
	            }
	            if (this.nickname == "" || this.nickname == "起个昵称吧(必填)") {
	                alert("请输入昵称！");
	                ev.preventDefault();
	            }
	            ev.preventDefault();
	            this.articleText = text;
	        }
	    }
	};

	// </script>
	//

/***/ },
/* 107 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"footer_bg\" id=\"contact\"><!-- start footer -->\r\n\r\n            <div class=\"container\">\r\n                <div class=\"row footer\">\r\n                    <div class=\"col-md-8 contact_left\">\r\n                        <h3>评论</h3>\r\n                        <p>发表您的见解吧:</h4>\r\n                        <form method=\"post\" v-bind:action=\"comment\">\r\n                            <input type=\"text\" name=\"nicknameComment\" v-model=\"nickname\" onFocus=\"this.value = '';\" onBlur=\"if (this.value == '') {this.value = '起个昵称吧(必填)';}\">\r\n                            <input type=\"text\" name=\"emailComment\" value=\"输入您的邮箱\" onFocus=\"this.value = '';\" onBlur=\"if (this.value == '') {this.value = 'Email';}\">\r\n                            <textarea id=\"editor\" style=\"height: 200px;\" v-model=\"articleText\" name=\"articleTextComment\"  onFocus=\"if(this.value == 'Your Message here....') this.value='';\" onBlur=\"if(this.value == '') this.value='Your Message here....;'\" ></textarea>\r\n                            <span class=\"pull-right\" ><input type=\"submit\"  value=\"提交\" @click=\"commentSubmit\"></span>\r\n                        </form>\r\n                    </div>\r\n                    <!--<div class=\"col-md-4  contact_right\">\r\n                        <p><span>座右铭 :</span> The best preparation for tomorrow is doing your best today .</p>\r\n                        <ul class=\"list-unstyled address\">\r\n                            <li><i class=\"fa fa-map-marker\"></i><span></span></li>\r\n                            <li><i class=\"fa fa-phone\"></i><span></span></li>\r\n                            <li><i class=\"fa fa-envelope\"></i><a href=\"mailto:info@mycompany.com\">122377305@qq.com</a></li>\r\n                        </ul>\r\n                    </div>-->\r\n                </div>\r\n            </div>\r\n        </div>\r\n      </div>\r\n";

/***/ },
/* 108 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"\" style=\"background-image: url('/images/bj-red.jpg');background-size: cover;\"><!-- start main -->\r\n            <div class=\"container\">\r\n                <div class=\"main row\">\r\n                    <div class=\"col-md-8 blog_left\" style=\"border: 1px rgb(238,238,238) solid;background-color: rgb(255,255,255);border-radius: 5px;\">\r\n                        <!--路径导航  面包屑-->\r\n                        <!--各路径间的分隔符已经自动通过 CSS 的 :before 和 content 属性添加了-->\r\n                        <!-- <loading v-show=\"load\"></loading>-->\r\n                        <div v-loading=\"load\" element-loading-text=\"Loading...\" style=\"width: 100%\">\r\n                            <ol class=\"breadcrumb\" style=\"margin-top: 10px;\">\r\n                                <li ><a class=\"glyphicon glyphicon-home\" href=\"blog\"></a></li>\r\n                                <li ><a href=\"blog\" >CsqBlog</a></li>\r\n                                <li class=\"active\">{{keyword}}</li>\r\n                            </ol>\r\n                            <h2 class=\"style\">{{title}}</h2>\r\n                            <p style=\"text-align: center\">\r\n                    <span style=\"color: rgb(153, 153, 153);\r\n                    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;\r\n                    line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);\">关键词:</span>\r\n                    <span style=\"box-sizing: border-box; margin-right: 12px; color: rgb(153, 153, 153);\r\n                     font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif; font-size: 13px;\r\n                    line-height: 18.5714px; text-align: center; background-color: rgb(255, 255, 255);\">{{keyword}}></span>\r\n                            </p>\r\n                            <hr>\r\n                            <div class=\"details row\">\r\n                                <div class=\"col-md-12\" style=\"color: rgb(61, 68, 80);\r\n                    font-family: 'Microsoft Yahei', Helvetica, Arial, sans-serif;\r\n                     font-size: 15px; line-height: 25px; background-color: rgb(255, 255, 255);overflow: hidden\" v-html=\"content\">\r\n\r\n                                </div>\r\n                                <div class=\"bdsharebuttonbox\" style=\"margin-left: 20px\">\r\n                                    <a href=\"#\" class=\"bds_more\" data-cmd=\"more\"></a>\r\n                                    <a href=\"#\" class=\"bds_qzone\" data-cmd=\"qzone\" title=\"分享到QQ空间\"></a>\r\n                                    <a href=\"#\" class=\"bds_tsina\" data-cmd=\"tsina\" title=\"分享到新浪微博\"></a>\r\n                                    <a href=\"#\" class=\"bds_tqq\" data-cmd=\"tqq\" title=\"分享到腾讯微博\"></a>\r\n                                    <a href=\"#\" class=\"bds_renren\" data-cmd=\"renren\" title=\"分享到人人网\"></a>\r\n                                    <a href=\"#\" class=\"bds_weixin\" data-cmd=\"weixin\" title=\"分享到微信\"></a>\r\n                                </div>\r\n\r\n                            </div>\r\n                        </div>\r\n\r\n                    </div>\r\n                    <ArticleRight v-on:SelectArticle=\"ArticleChange\"></ArticleRight>\r\n                 </div>\r\n                </div>\r\n            </div>\r\n        <comment :fun=\"ArticleId\"></comment>\r\n        <ArticleFoot></ArticleFoot>\r\n        <fotter-end></fotter-end>\r\n    </div>\r\n";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(110)
	__vue_script__ = __webpack_require__(112)
	__vue_template__ = __webpack_require__(123)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\about\\about.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(111);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0f63f96e&file=about.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./about.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-0f63f96e&file=about.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./about.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n\r\n", ""]);

	// exports


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _about_contents = __webpack_require__(113);

	var _about_contents2 = _interopRequireDefault(_about_contents);

	var _fotter = __webpack_require__(68);

	var _fotter2 = _interopRequireDefault(_fotter);

	var _fotterEnd = __webpack_require__(78);

	var _fotterEnd2 = _interopRequireDefault(_fotterEnd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    data: function data() {
	        return {
	            msg: 'hello vue'
	        };
	    },

	    components: {
	        contents: _about_contents2.default, fotter: _fotter2.default, 'fotter-end': _fotterEnd2.default
	    }
	};
	// </script>
	//
	// <template>
	//     <div>
	//         <contents></contents>
	//         <fotter></fotter>
	//         <fotter-end></fotter-end>
	//     </div>
	// </template>
	// <style>
	//
	// </style>
	// <script>

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(114)
	__vue_script__ = __webpack_require__(116)
	__vue_template__ = __webpack_require__(122)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\about\\about_contents.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(115);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5257370a&file=about_contents.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./about_contents.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-5257370a&file=about_contents.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./about_contents.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n  #blogBackground{\r\n     /* background-color: rgb(118, 115, 115);\r\n      background-image: url('/images/bj-blue.jpg');\r\n      background-size: cover;*/\r\n  }\r\n", ""]);

	// exports


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _about_left = __webpack_require__(117);

	var _about_left2 = _interopRequireDefault(_about_left);

	var _contentRight = __webpack_require__(41);

	var _contentRight2 = _interopRequireDefault(_contentRight);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	//     <div>
	//         <div class="blog" style="" id="blogBackground" style=" background-image: url('http://ohsmsw5ly.bkt.clouddn.com/image/bj-red.jpg');background-size: cover;"><!-- start main -->
	//             <div class="container">
	//                 <div class="main row">
	//                     <content-left></content-left>
	//                     <content-right></content-right>
	//                     <div class="clearfix"></div>
	//                 </div>
	//             </div>
	//         </div>
	//     </div>
	// </template>
	// <style>
	//   #blogBackground{
	//      /* background-color: rgb(118, 115, 115);
	//       background-image: url('/images/bj-blue.jpg');
	//       background-size: cover;*/
	//   }
	// </style>
	// <script>
	exports.default = {
	    data: function data() {
	        return {
	            msg: 'hello vue'
	        };
	    },

	    components: {
	        'content-left': _about_left2.default,
	        'content-right': _contentRight2.default
	    }
	};
	// </script>
	//

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(118)
	__vue_script__ = __webpack_require__(120)
	__vue_template__ = __webpack_require__(121)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "D:\\nodejs\\WebstormProjects\\blog-vue\\public\\components\\about\\about_left.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(119);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(20)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-76069130&file=about_left.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./about_left.vue", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-76069130&file=about_left.vue!./../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./about_left.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports


	// module
	exports.push([module.id, "\r\n    #about h4{\r\n        margin-left: 20px;\r\n        font-size: 20px;\r\n    }\r\n    #about p{\r\n        font-size: 16px;\r\n        margin-left: 20px;\r\n        text-indent: 15px;\r\n    }\r\n   .h3{\r\n       color: rgb(17, 15, 15);\r\n       margin: 20px 1px 0 1px;\r\n       background-color: rgb(225, 213, 220);\r\n       padding: 20px;\r\n       border-radius: 10px;\r\n\r\n   }\r\n    .proverbs{\r\n        background-color: rgb(239,236,238);\r\n        padding: 10px;margin-right: 20px;\r\n        border-radius: 5px;margin-bottom: 20px\r\n    }\r\n    .about_left{\r\n        background-color: rgb(249, 250, 252);border-radius: 5px;padding: 0;\r\n    }\r\n", ""]);

	// exports


/***/ },
/* 120 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div id="about">
	//         <div class="col-md-8 about_left">
	//              <h3 class="h3">关于本站</h3>
	//
	//             <div style="float: left;padding: 20px 20px 10px 20px">
	//                 <img src="/images/m.jpg">
	//             </div>
	//             <div style="padding: 20px 20px 10px 20px;font-size: 16px;">
	//                 <div style="text-indent: 2em">
	//                     本站定位为IT技术博客站，
	//                     全站均由本人开发，基于express框架，使用nodejs进行编写，
	//                     前端UI框架采用Bootstrap搭建，数据库为mongodb，
	//                     服务器为Windows Server 2012 R2版腾讯云主机，域名chisir.top购自阿里万维网。
	//                 </div>
	//             </div>
	//              <div style="clear: both"></div>
	//              <hr>
	//              <h4>初衷</h4>
	//              <p>
	//                 写博是一个人思考和沉淀的过程。
	//              </p>
	//              <p>对内是自己的知识仓库。</p>
	//              <p>对外是别人了解你的最直接的方式；是交流、分享经验的平台。</p>
	//              <hr>
	//             <h4>联系方式</h4>
	//             <p>邮箱:122377305@qq.com</p>
	//             <p>github:<a href="https://github.com/JQSC" target="_blank">https://github.com/JQSC</a></p>
	//             <hr>
	//             <h4>一句箴言</h4>
	//             <p class="proverbs">宁可在骄阳里暴晒,也不愿在黑暗里偷生。</p>
	//         </div>
	//     </div>
	// </template>
	// <style>
	//     #about h4{
	//         margin-left: 20px;
	//         font-size: 20px;
	//     }
	//     #about p{
	//         font-size: 16px;
	//         margin-left: 20px;
	//         text-indent: 15px;
	//     }
	//    .h3{
	//        color: rgb(17, 15, 15);
	//        margin: 20px 1px 0 1px;
	//        background-color: rgb(225, 213, 220);
	//        padding: 20px;
	//        border-radius: 10px;
	//
	//    }
	//     .proverbs{
	//         background-color: rgb(239,236,238);
	//         padding: 10px;margin-right: 20px;
	//         border-radius: 5px;margin-bottom: 20px
	//     }
	//     .about_left{
	//         background-color: rgb(249, 250, 252);border-radius: 5px;padding: 0;
	//     }
	// </style>
	// <script>

	exports.default = {
	    data: function data() {
	        return {
	            msg: 'hello vue'
	        };
	    },

	    components: {}
	};
	// </script>
	//

/***/ },
/* 121 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div id=\"about\">\r\n        <div class=\"col-md-8 about_left\">\r\n             <h3 class=\"h3\">关于本站</h3>\r\n\r\n            <div style=\"float: left;padding: 20px 20px 10px 20px\">\r\n                <img src=\"/images/m.jpg\">\r\n            </div>\r\n            <div style=\"padding: 20px 20px 10px 20px;font-size: 16px;\">\r\n                <div style=\"text-indent: 2em\">\r\n                    本站定位为IT技术博客站，\r\n                    全站均由本人开发，基于express框架，使用nodejs进行编写，\r\n                    前端UI框架采用Bootstrap搭建，数据库为mongodb，\r\n                    服务器为Windows Server 2012 R2版腾讯云主机，域名chisir.top购自阿里万维网。\r\n                </div>\r\n            </div>\r\n             <div style=\"clear: both\"></div>\r\n             <hr>\r\n             <h4>初衷</h4>\r\n             <p>\r\n                写博是一个人思考和沉淀的过程。\r\n             </p>\r\n             <p>对内是自己的知识仓库。</p>\r\n             <p>对外是别人了解你的最直接的方式；是交流、分享经验的平台。</p>\r\n             <hr>\r\n            <h4>联系方式</h4>\r\n            <p>邮箱:122377305@qq.com</p>\r\n            <p>github:<a href=\"https://github.com/JQSC\" target=\"_blank\">https://github.com/JQSC</a></p>\r\n            <hr>\r\n            <h4>一句箴言</h4>\r\n            <p class=\"proverbs\">宁可在骄阳里暴晒,也不愿在黑暗里偷生。</p>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 122 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <div class=\"blog\" style=\"\" id=\"blogBackground\" style=\" background-image: url('http://ohsmsw5ly.bkt.clouddn.com/image/bj-red.jpg');background-size: cover;\"><!-- start main -->\r\n            <div class=\"container\">\r\n                <div class=\"main row\">\r\n                    <content-left></content-left>\r\n                    <content-right></content-right>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";

/***/ },
/* 123 */
/***/ function(module, exports) {

	module.exports = "\r\n    <div>\r\n        <contents></contents>\r\n        <fotter></fotter>\r\n        <fotter-end></fotter-end>\r\n    </div>\r\n";

/***/ }
]);