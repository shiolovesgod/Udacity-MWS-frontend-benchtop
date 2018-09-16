"use strict";!function(){function e(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function t(t,n,o){var r,i=new Promise(function(i,u){e(r=t[n].apply(t,o)).then(i,u)});return i.request=r,i}function n(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return t(this[n],r,arguments)})})}function r(e,t,n,o){o.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return this[t][o].apply(this[t],arguments)})})}function i(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return e=this[n],(o=t(e,r,arguments)).then(function(e){if(e)return new c(e,o.request)});var e,o})})}function u(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function p(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function a(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function f(e){this._db=e}n(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),i(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),n(c,"_cursor",["direction","key","primaryKey","value"]),o(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(c.prototype[t]=function(){var n=this,o=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,o),e(n._request).then(function(e){if(e)return new c(e,n._request)})})})}),s.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},n(s,"_store",["name","keyPath","indexNames","autoIncrement"]),o(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),i(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),r(s,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},n(p,"_tx",["objectStoreNames","mode"]),r(p,"_tx",IDBTransaction,["abort"]),a.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},n(a,"_db",["name","version","objectStoreNames"]),r(a,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},n(f,"_db",["name","version","objectStoreNames"]),r(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[s,u].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),o=n[n.length-1],r=this._store||this._index,i=r[e].apply(r,n.slice(0,-1));i.onsuccess=function(){o(i.result)}})})}),[u,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,o=[];return new Promise(function(r){n.iterateCursor(e,function(e){e?(o.push(e.value),void 0===t||o.length!=t?e.continue():r(o)):r(o)})})})});var d={open:function(e,n,o){var r=t(indexedDB,"open",[e,n]),i=r.request;return i&&(i.onupgradeneeded=function(e){o&&o(new a(i.result,e.oldVersion,i.transaction))}),r.then(function(e){return new f(e)})},delete:function(e){return t(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();
/*! lozad.js - v1.4.0 - 2018-04-22
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2018 Apoorv Saxena; Licensed MIT */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lozad=e()}(this,function(){"use strict";function t(t){t.setAttribute("data-loaded",!0)}var e=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},r=document.documentMode,n={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=document.createElement("img");r&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.appendChild(e)}t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&(t.srcset=t.getAttribute("data-srcset")),t.getAttribute("data-background-image")&&(t.style.backgroundImage="url('"+t.getAttribute("data-background-image")+"')")},loaded:function(){}},o=function(t){return"true"===t.getAttribute("data-loaded")},a=function(e,r){return function(n,a){n.forEach(function(n){n.intersectionRatio>0&&(a.unobserve(n.target),o(n.target)||(e(n.target),t(n.target),r(n.target)))})}},i=function(t){return t instanceof Element?[t]:t instanceof NodeList?t:document.querySelectorAll(t)};return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:".lozad",d=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=e({},n,d),c=u.rootMargin,s=u.threshold,g=u.load,f=u.loaded,l=void 0;return window.IntersectionObserver&&(l=new IntersectionObserver(a(g,f),{rootMargin:c,threshold:s})),{observe:function(){for(var e=i(r),n=0;n<e.length;n++)o(e[n])||(l?l.observe(e[n]):(g(e[n]),t(e[n]),f(e[n])))},triggerLoad:function(e){o(e)||(g(e),t(e),f(e))}}}});
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date = new Date(y, m, d, h, M, s, ms);

        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        if (!m) {
            return isArray(this._weekdays) ? this._weekdays :
                this._weekdays['standalone'];
        }
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : (match[1] === '+') ? 1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'quarter':
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
            case 'date':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.22.2';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'YYYY-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
!function(a){var b=navigator.userAgent;a.HTMLPictureElement&&/ecko/.test(b)&&b.match(/rv\:(\d+)/)&&RegExp.$1<45&&addEventListener("resize",function(){var b,c=document.createElement("source"),d=function(a){var b,d,e=a.parentNode;"PICTURE"===e.nodeName.toUpperCase()?(b=c.cloneNode(),e.insertBefore(b,e.firstElementChild),setTimeout(function(){e.removeChild(b)})):(!a._pfLastSize||a.offsetWidth>a._pfLastSize)&&(a._pfLastSize=a.offsetWidth,d=a.sizes,a.sizes+=",100vw",setTimeout(function(){a.sizes=d}))},e=function(){var a,b=document.querySelectorAll("picture > img, img[srcset][sizes]");for(a=0;a<b.length;a++)d(b[a])},f=function(){clearTimeout(b),b=setTimeout(e,99)},g=a.matchMedia&&matchMedia("(orientation: landscape)"),h=function(){f(),g&&g.addListener&&g.addListener(f)};return c.srcset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",/^[c|i]|d$/.test(document.readyState||"")?h():document.addEventListener("DOMContentLoaded",h),f}())}(window),function(a,b,c){"use strict";function d(a){return" "===a||"	"===a||"\n"===a||"\f"===a||"\r"===a}function e(b,c){var d=new a.Image;return d.onerror=function(){A[b]=!1,ba()},d.onload=function(){A[b]=1===d.width,ba()},d.src=c,"pending"}function f(){M=!1,P=a.devicePixelRatio,N={},O={},s.DPR=P||1,Q.width=Math.max(a.innerWidth||0,z.clientWidth),Q.height=Math.max(a.innerHeight||0,z.clientHeight),Q.vw=Q.width/100,Q.vh=Q.height/100,r=[Q.height,Q.width,P].join("-"),Q.em=s.getEmValue(),Q.rem=Q.em}function g(a,b,c,d){var e,f,g,h;return"saveData"===B.algorithm?a>2.7?h=c+1:(f=b-c,e=Math.pow(a-.6,1.5),g=f*e,d&&(g+=.1*e),h=a+g):h=c>1?Math.sqrt(a*b):a,h>c}function h(a){var b,c=s.getSet(a),d=!1;"pending"!==c&&(d=r,c&&(b=s.setRes(c),s.applySetCandidate(b,a))),a[s.ns].evaled=d}function i(a,b){return a.res-b.res}function j(a,b,c){var d;return!c&&b&&(c=a[s.ns].sets,c=c&&c[c.length-1]),d=k(b,c),d&&(b=s.makeUrl(b),a[s.ns].curSrc=b,a[s.ns].curCan=d,d.res||aa(d,d.set.sizes)),d}function k(a,b){var c,d,e;if(a&&b)for(e=s.parseSet(b),a=s.makeUrl(a),c=0;c<e.length;c++)if(a===s.makeUrl(e[c].url)){d=e[c];break}return d}function l(a,b){var c,d,e,f,g=a.getElementsByTagName("source");for(c=0,d=g.length;d>c;c++)e=g[c],e[s.ns]=!0,f=e.getAttribute("srcset"),f&&b.push({srcset:f,media:e.getAttribute("media"),type:e.getAttribute("type"),sizes:e.getAttribute("sizes")})}function m(a,b){function c(b){var c,d=b.exec(a.substring(m));return d?(c=d[0],m+=c.length,c):void 0}function e(){var a,c,d,e,f,i,j,k,l,m=!1,o={};for(e=0;e<h.length;e++)f=h[e],i=f[f.length-1],j=f.substring(0,f.length-1),k=parseInt(j,10),l=parseFloat(j),X.test(j)&&"w"===i?((a||c)&&(m=!0),0===k?m=!0:a=k):Y.test(j)&&"x"===i?((a||c||d)&&(m=!0),0>l?m=!0:c=l):X.test(j)&&"h"===i?((d||c)&&(m=!0),0===k?m=!0:d=k):m=!0;m||(o.url=g,a&&(o.w=a),c&&(o.d=c),d&&(o.h=d),d||c||a||(o.d=1),1===o.d&&(b.has1x=!0),o.set=b,n.push(o))}function f(){for(c(T),i="",j="in descriptor";;){if(k=a.charAt(m),"in descriptor"===j)if(d(k))i&&(h.push(i),i="",j="after descriptor");else{if(","===k)return m+=1,i&&h.push(i),void e();if("("===k)i+=k,j="in parens";else{if(""===k)return i&&h.push(i),void e();i+=k}}else if("in parens"===j)if(")"===k)i+=k,j="in descriptor";else{if(""===k)return h.push(i),void e();i+=k}else if("after descriptor"===j)if(d(k));else{if(""===k)return void e();j="in descriptor",m-=1}m+=1}}for(var g,h,i,j,k,l=a.length,m=0,n=[];;){if(c(U),m>=l)return n;g=c(V),h=[],","===g.slice(-1)?(g=g.replace(W,""),e()):f()}}function n(a){function b(a){function b(){f&&(g.push(f),f="")}function c(){g[0]&&(h.push(g),g=[])}for(var e,f="",g=[],h=[],i=0,j=0,k=!1;;){if(e=a.charAt(j),""===e)return b(),c(),h;if(k){if("*"===e&&"/"===a[j+1]){k=!1,j+=2,b();continue}j+=1}else{if(d(e)){if(a.charAt(j-1)&&d(a.charAt(j-1))||!f){j+=1;continue}if(0===i){b(),j+=1;continue}e=" "}else if("("===e)i+=1;else if(")"===e)i-=1;else{if(","===e){b(),c(),j+=1;continue}if("/"===e&&"*"===a.charAt(j+1)){k=!0,j+=2;continue}}f+=e,j+=1}}}function c(a){return k.test(a)&&parseFloat(a)>=0?!0:l.test(a)?!0:"0"===a||"-0"===a||"+0"===a?!0:!1}var e,f,g,h,i,j,k=/^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i,l=/^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;for(f=b(a),g=f.length,e=0;g>e;e++)if(h=f[e],i=h[h.length-1],c(i)){if(j=i,h.pop(),0===h.length)return j;if(h=h.join(" "),s.matchesMedia(h))return j}return"100vw"}b.createElement("picture");var o,p,q,r,s={},t=!1,u=function(){},v=b.createElement("img"),w=v.getAttribute,x=v.setAttribute,y=v.removeAttribute,z=b.documentElement,A={},B={algorithm:""},C="data-pfsrc",D=C+"set",E=navigator.userAgent,F=/rident/.test(E)||/ecko/.test(E)&&E.match(/rv\:(\d+)/)&&RegExp.$1>35,G="currentSrc",H=/\s+\+?\d+(e\d+)?w/,I=/(\([^)]+\))?\s*(.+)/,J=a.picturefillCFG,K="position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)",L="font-size:100%!important;",M=!0,N={},O={},P=a.devicePixelRatio,Q={px:1,"in":96},R=b.createElement("a"),S=!1,T=/^[ \t\n\r\u000c]+/,U=/^[, \t\n\r\u000c]+/,V=/^[^ \t\n\r\u000c]+/,W=/[,]+$/,X=/^\d+$/,Y=/^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/,Z=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},$=function(a){var b={};return function(c){return c in b||(b[c]=a(c)),b[c]}},_=function(){var a=/^([\d\.]+)(em|vw|px)$/,b=function(){for(var a=arguments,b=0,c=a[0];++b in a;)c=c.replace(a[b],a[++b]);return c},c=$(function(a){return"return "+b((a||"").toLowerCase(),/\band\b/g,"&&",/,/g,"||",/min-([a-z-\s]+):/g,"e.$1>=",/max-([a-z-\s]+):/g,"e.$1<=",/calc([^)]+)/g,"($1)",/(\d+[\.]*[\d]*)([a-z]+)/g,"($1 * e.$2)",/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/gi,"")+";"});return function(b,d){var e;if(!(b in N))if(N[b]=!1,d&&(e=b.match(a)))N[b]=e[1]*Q[e[2]];else try{N[b]=new Function("e",c(b))(Q)}catch(f){}return N[b]}}(),aa=function(a,b){return a.w?(a.cWidth=s.calcListLength(b||"100vw"),a.res=a.w/a.cWidth):a.res=a.d,a},ba=function(a){if(t){var c,d,e,f=a||{};if(f.elements&&1===f.elements.nodeType&&("IMG"===f.elements.nodeName.toUpperCase()?f.elements=[f.elements]:(f.context=f.elements,f.elements=null)),c=f.elements||s.qsa(f.context||b,f.reevaluate||f.reselect?s.sel:s.selShort),e=c.length){for(s.setupRun(f),S=!0,d=0;e>d;d++)s.fillImg(c[d],f);s.teardownRun(f)}}};o=a.console&&console.warn?function(a){console.warn(a)}:u,G in v||(G="src"),A["image/jpeg"]=!0,A["image/gif"]=!0,A["image/png"]=!0,A["image/svg+xml"]=b.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"),s.ns=("pf"+(new Date).getTime()).substr(0,9),s.supSrcset="srcset"in v,s.supSizes="sizes"in v,s.supPicture=!!a.HTMLPictureElement,s.supSrcset&&s.supPicture&&!s.supSizes&&!function(a){v.srcset="data:,a",a.src="data:,a",s.supSrcset=v.complete===a.complete,s.supPicture=s.supSrcset&&s.supPicture}(b.createElement("img")),s.supSrcset&&!s.supSizes?!function(){var a="data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==",c="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",d=b.createElement("img"),e=function(){var a=d.width;2===a&&(s.supSizes=!0),q=s.supSrcset&&!s.supSizes,t=!0,setTimeout(ba)};d.onload=e,d.onerror=e,d.setAttribute("sizes","9px"),d.srcset=c+" 1w,"+a+" 9w",d.src=c}():t=!0,s.selShort="picture>img,img[srcset]",s.sel=s.selShort,s.cfg=B,s.DPR=P||1,s.u=Q,s.types=A,s.setSize=u,s.makeUrl=$(function(a){return R.href=a,R.href}),s.qsa=function(a,b){return"querySelector"in a?a.querySelectorAll(b):[]},s.matchesMedia=function(){return a.matchMedia&&(matchMedia("(min-width: 0.1em)")||{}).matches?s.matchesMedia=function(a){return!a||matchMedia(a).matches}:s.matchesMedia=s.mMQ,s.matchesMedia.apply(this,arguments)},s.mMQ=function(a){return a?_(a):!0},s.calcLength=function(a){var b=_(a,!0)||!1;return 0>b&&(b=!1),b},s.supportsType=function(a){return a?A[a]:!0},s.parseSize=$(function(a){var b=(a||"").match(I);return{media:b&&b[1],length:b&&b[2]}}),s.parseSet=function(a){return a.cands||(a.cands=m(a.srcset,a)),a.cands},s.getEmValue=function(){var a;if(!p&&(a=b.body)){var c=b.createElement("div"),d=z.style.cssText,e=a.style.cssText;c.style.cssText=K,z.style.cssText=L,a.style.cssText=L,a.appendChild(c),p=c.offsetWidth,a.removeChild(c),p=parseFloat(p,10),z.style.cssText=d,a.style.cssText=e}return p||16},s.calcListLength=function(a){if(!(a in O)||B.uT){var b=s.calcLength(n(a));O[a]=b?b:Q.width}return O[a]},s.setRes=function(a){var b;if(a){b=s.parseSet(a);for(var c=0,d=b.length;d>c;c++)aa(b[c],a.sizes)}return b},s.setRes.res=aa,s.applySetCandidate=function(a,b){if(a.length){var c,d,e,f,h,k,l,m,n,o=b[s.ns],p=s.DPR;if(k=o.curSrc||b[G],l=o.curCan||j(b,k,a[0].set),l&&l.set===a[0].set&&(n=F&&!b.complete&&l.res-.1>p,n||(l.cached=!0,l.res>=p&&(h=l))),!h)for(a.sort(i),f=a.length,h=a[f-1],d=0;f>d;d++)if(c=a[d],c.res>=p){e=d-1,h=a[e]&&(n||k!==s.makeUrl(c.url))&&g(a[e].res,c.res,p,a[e].cached)?a[e]:c;break}h&&(m=s.makeUrl(h.url),o.curSrc=m,o.curCan=h,m!==k&&s.setSrc(b,h),s.setSize(b))}},s.setSrc=function(a,b){var c;a.src=b.url,"image/svg+xml"===b.set.type&&(c=a.style.width,a.style.width=a.offsetWidth+1+"px",a.offsetWidth+1&&(a.style.width=c))},s.getSet=function(a){var b,c,d,e=!1,f=a[s.ns].sets;for(b=0;b<f.length&&!e;b++)if(c=f[b],c.srcset&&s.matchesMedia(c.media)&&(d=s.supportsType(c.type))){"pending"===d&&(c=d),e=c;break}return e},s.parseSets=function(a,b,d){var e,f,g,h,i=b&&"PICTURE"===b.nodeName.toUpperCase(),j=a[s.ns];(j.src===c||d.src)&&(j.src=w.call(a,"src"),j.src?x.call(a,C,j.src):y.call(a,C)),(j.srcset===c||d.srcset||!s.supSrcset||a.srcset)&&(e=w.call(a,"srcset"),j.srcset=e,h=!0),j.sets=[],i&&(j.pic=!0,l(b,j.sets)),j.srcset?(f={srcset:j.srcset,sizes:w.call(a,"sizes")},j.sets.push(f),g=(q||j.src)&&H.test(j.srcset||""),g||!j.src||k(j.src,f)||f.has1x||(f.srcset+=", "+j.src,f.cands.push({url:j.src,d:1,set:f}))):j.src&&j.sets.push({srcset:j.src,sizes:null}),j.curCan=null,j.curSrc=c,j.supported=!(i||f&&!s.supSrcset||g&&!s.supSizes),h&&s.supSrcset&&!j.supported&&(e?(x.call(a,D,e),a.srcset=""):y.call(a,D)),j.supported&&!j.srcset&&(!j.src&&a.src||a.src!==s.makeUrl(j.src))&&(null===j.src?a.removeAttribute("src"):a.src=j.src),j.parsed=!0},s.fillImg=function(a,b){var c,d=b.reselect||b.reevaluate;a[s.ns]||(a[s.ns]={}),c=a[s.ns],(d||c.evaled!==r)&&((!c.parsed||b.reevaluate)&&s.parseSets(a,a.parentNode,b),c.supported?c.evaled=r:h(a))},s.setupRun=function(){(!S||M||P!==a.devicePixelRatio)&&f()},s.supPicture?(ba=u,s.fillImg=u):!function(){var c,d=a.attachEvent?/d$|^c/:/d$|^c|^i/,e=function(){var a=b.readyState||"";f=setTimeout(e,"loading"===a?200:999),b.body&&(s.fillImgs(),c=c||d.test(a),c&&clearTimeout(f))},f=setTimeout(e,b.body?9:99),g=function(a,b){var c,d,e=function(){var f=new Date-d;b>f?c=setTimeout(e,b-f):(c=null,a())};return function(){d=new Date,c||(c=setTimeout(e,b))}},h=z.clientHeight,i=function(){M=Math.max(a.innerWidth||0,z.clientWidth)!==Q.width||z.clientHeight!==h,h=z.clientHeight,M&&s.fillImgs()};Z(a,"resize",g(i,99)),Z(b,"readystatechange",e)}(),s.picturefill=ba,s.fillImgs=ba,s.teardownRun=u,ba._=s,a.picturefillCFG={pf:s,push:function(a){var b=a.shift();"function"==typeof s[b]?s[b].apply(s,a):(B[b]=a[0],S&&s.fillImgs({reselect:!0}))}};for(;J&&J.length;)a.picturefillCFG.push(J.shift());a.picturefill=ba,"object"==typeof module&&"object"==typeof module.exports?module.exports=ba:"function"==typeof define&&define.amd&&define("picturefill",function(){return ba}),s.supPicture||(A["image/webp"]=e("image/webp","data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA=="))}(window,document);
/**
 * Common database helper functions.
 */
const DB_PROMISED = idb.open('restreviews-db', 2, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 1:
      upgradeDB.deleteObjectStore('reviews'); //format has changed
      break;
    case 0:
      // upgradeDB.createObjectStore('reviews'); //don't do this
  }

  //Create a new object store with a different format
  var reviewStore = upgradeDB.createObjectStore('reviews');
  reviewStore.createIndex('restaurant_id', 'restaurant_id', {
    unique: false
  });
  reviewStore.createIndex('createdAt', 'createdAt', {
    unique: false
  });

  var restStore = upgradeDB.createObjectStore('restaurants');
  restStore.createIndex('neighborhood', 'neighborhood', {
    unique: false
  });
  restStore.createIndex('name', 'name', {
    unique: false
  });
});

class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}`; //DEV only, need to change in production
  }

  static get dbPromised() {
    return DB_PROMISED;
  }

  static getDBResource(callback, url) {

    //validate url
    if (!url) {
      console.log('EMPTY Request sent to the Worker');
      callback('There was not information in request.', []);
      return;
    } else if (typeof (url) != 'string') {
      console.log('WRONG TYPE OF Request sent to the Worker');
      callback(`Data was of type: ${typeof(url)} instead of string `, []);
      return;
    }

    DBHelper._handleDBFetch((err, res) => {
      console.log(`${url} was fetched from: ${res.source}`);
      callback(err, res.resource);
    }, url);


  }

  //==============================================
  // PUBLIC FUNCTIONS 
  //==============================================


  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    DBHelper.getDBResource(callback, 'restaurants/');
  }

  /**
   * Fetch all reviews.
   */
  static fetchAllReviews(callback) {
    DBHelper.getDBResource(callback, 'reviews/');
  }


  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(rest_id, callback) {

    // fetch all restaurants with proper error handling.
    DBHelper.getDBResource(callback, `restaurants/${rest_id}`);
  }

  /**
   * Fetch a reviews by restaurant id
   */
  static fetchReviewsByRestaurantId(rest_id, callback) {

    // fetch all restaurants with proper error handling.
    DBHelper.getDBResource(callback, `reviews?restaurant_id=${rest_id}`);
  }




  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    }, 'restaurants');
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    }, 'restaurants');
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // let urlString = 'restaurants'; 
    // let queryFlag = false; 
    // if (cuisine != 'all') {
    //   urlString+= `&cuisine_type=${cuisine}`;
    //   queryFlag = true;
    // }
    // if (neighborhood != 'all') {
    //   urlString += `&neighborhood=${neighborhood}`;
    //   queryFlag = true;
    // }

    // Fetch all restaurants (can be optimized using index)
    //This code is redundant and needs improvement

    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants;
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    }, '/restaurants');
  }

  static parseCuisines (restaurants) {
    
    const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
    
    // Remove duplicates from cuisines
    const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
    return uniqueCuisines;
  }

  static parseNeighborhoods (restaurants) {

    const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
    
    // Remove duplicates from neighborhoods
    const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
    return uniqueNeighborhoods;

  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    },'/restaurants');
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    },'/restaurants');
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  static urlForReview(review) {
    return (`./restaurant.html?id=${review.restaurant_id}#review${review.id}`);
  }


  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`../images_src/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map, label) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      // label: {text: `${restaurant.id}`, color: 'white'},
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP,
      rest_id: restaurant.id, 
      is_fav: restaurant.is_favorite,
      icon: `./img/icons/map-icon-${restaurant.is_favorite ? 'favorite' : 'regular'}.png`,
    });

    return marker;
  }

  /**
   * Convert rating to stars (a little out of place, I know)
   */

  static rating2stars(rating) {

    const totalStars = 5;
    const charFull = '&#61445;'; //font-awesome: fa-star, \f005
    const charHalf = '&#61731;'; //font-awesome: fa-star-half-o \f123
    const charEmpty = '&#61446;'; //font-awesome: fa-star-o, \f006

    let fullStars = Math.trunc(rating);
    let emptyStars = Math.trunc(totalStars - rating);
    let hasHalfStar = fullStars + emptyStars < totalStars;

    //Return the star characters as a string
    return charFull.repeat(fullStars) + charHalf.repeat(hasHalfStar * 1) + charEmpty.repeat(emptyStars);
  }


  //==============================================
  // FAVORITES
  //==============================================

  static setFavoriteStatus(favObj, cb) {
    /*INPUT: favObj = {id: integer, is_favorite: Boolean}*/

    //Update in the local database
    let dbSuccess = DBHelper._changeDBFavorite(favObj);
    
    //Update on server
    if (navigator.onLine) {

      DBHelper._postFavoriteDB(favObj, res => {

        //Add to Q if server error
        if (res && res.retry) {
          DataSync.queueFavorite(favObj);
        } 
        cb(res); // send back the res
      });
    } else { //OFFLINE
      //Add to Q
      DataSync.queueFavorite(favObj);
    }
      
  }

  static _postFavoriteDB(favObj, cb) {

     //put method restaurants/rest_id, {is_favorite: value}
    fetch(`${DBHelper.DATABASE_URL}/restaurants/${favObj.id}`,{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({is_favorite: favObj.is_favorite}),
    }).then(res => {
      if (!res.ok) throw res;
      return res.json();
    }).then(restaurant => {

      //Update idb (for good measure)
      DBHelper._putDBItem(restaurant,'restaurants');

      //Send back the response
      cb({ok: true, status: 200, body:restaurant});

    }).catch( err => cb(DBHelper.serverErrHandler(err)) );

  }


  //==============================================
  // REVIEWS
  //==============================================
  
  static addUserReview(formData, rest_name, cb) { 
    //Notify user with callback, (errMsg, successMsg);

    //Save the review to idb (autogenerate ID) and send user success
    let formDataDB, note;

    if (!formData) debugger; //something is reaally wrong

    if (formData.id) {
      //Already in IDB
      formDataDB = formData;
      rest_name = rest_name ? rest_name : formDataDB.restaurant_name;

    } else {

      //Add to IDB
      formDataDB = formData;
      var tempId = `-${DataSync.reviewQueue.length+1}`;
      var userNotification = '';
      formDataDB.id = tempId;

      DBHelper._putDBItem(formDataDB,'reviews');

    }

    

    //Check to see if use is online
    if (navigator.onLine) {

      DBHelper._postUserReview(formDataDB, (res)=> {
        
        

        if (res && res.ok) { //res fields --> ok, status, body || err: also retry
          //Successful

          note = {
            title: 'Review Posted',
            status: 'success',
            message: `Review${rest_name ? ' for ' +rest_name:''} created. Thanks!`,
          };

        } else if (res && res.retry) { //server offline
          //Server offline, poll to see when the server will be back online

          note = {
            title: 'Review Pending',
            status: 'info',
            message: `Review${rest_name ? ' for ' +rest_name: ''}will be posted when you reconnect.`,
          };

          //Queue to send later, poll server (no listener currently setup)!!!
          formDataDB.restaurant_name = rest_name;
          res.retry = true;
          DataSync.queueReview(formDataDB);

        } else if (res && !res.retry) {
          //Server Error, something wrong with form
          note = {
            title: 'Error',
            status: 'failure',
            message: `There was an error posting your review. See form for details`,
          };

          //remove from DB 
          DBHandler._deleteDBItem(formDataDB.id);

        } else { 

            note = {
            title: 'Error',
            status: 'failure',
            message: `An unknown error occured. Please email support.`,
          };

          res.body = 'An unknown error occured. Please email support.';

          //remove from DB 
          DBHandler._deleteDBItem(formDataDB.id);
        }

        //notify  user
        HTMLHelper.postNotification(note);
        //udpate frontend
        if (cb) cb(res);

      });

    } else {
      
      note = {
        title: 'Review Pending',
        status: 'info',
        message: `Review${rest_name ? ' for ' +rest_name: ''}will be posted when you reconnect.`,
      };

      //Queue to send later
      formDataDB.restaurant_name = rest_name;
      DataSync.queueReview(formDataDB);

      HTMLHelper.postNotification(note);
      if (cb) cb({ok: false, retry: true,status: 301, body: formDataDB});

    }
  }


  static _postUserReview(formDataDB, cb) {

    fetch(`${DBHelper.DATABASE_URL}/reviews`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(formDataDB),
    }).then(res => {

      if (!res.ok) throw res;
      return res.json();
    }).then(review => {
      //Replace the idb review with an updated version (quietly)
      DBHelper._replaceDBReview(formDataDB.id, review);

      //Send user success message
      cb({ok: true, status: 200, body: review});

    }).catch( err => {

      //let user know error
      console.log(err);
      cb(DBHelper.serverErrHandler(err));

    });

    
  }

  //==============================================
  // PRIVATE FUNCTIONS (mainly)...need to reorganize
  //==============================================
  static _handleDBFetch(callback, urlPath) {

    let callbackSent = false;
    let fetchURL = `${DBHelper.DATABASE_URL}/${urlPath}`.replace(/([^:]\/)\/+/g, "$1");

    //FIRST: Parse Input
    let opts = DBHelper._parseURLInput(fetchURL);
    let id = opts.value;

    const dbEntriesPromised = DBHelper._getDBItem(opts.endpoint, opts.value, opts.index_name);

    dbEntriesPromised.then(dbEntriesCached => {

      if (opts.endpoint=='reviews') dbEntriesCached.reverse();

      //If you find the db fetch, use it
      if (dbEntriesCached.length > 0 || dbEntriesCached.id) {
        callback(null, {
          resource: dbEntriesCached,
          source: 'cache'
        });
        callbackSent = true;
      }

      let xhr = new XMLHttpRequest();
      xhr.open('GET', fetchURL);
      xhr.onload = () => {
        if (xhr.status == 200) {
          const dbRecords = JSON.parse(xhr.responseText);

          //run the callback as soon as a response comes
          if (!callbackSent) {
            callback(null, {
              resource: dbRecords,
              source: 'server'
            });
            callbackSent = true;
          }

          //ALWAYS update the items in the idb
          if (Array.isArray(dbRecords)) {
            dbRecords.forEach(record => {
              DBHelper._putDBItem(record, opts.endpoint);
            });
          } else {
            DBHelper._putDBItem(dbRecords, opts.endpoint);
          }

        } else {
          let err = '';
          if (id) {
            err = `${opts.endpoint[0].toUpperCase()}${opts.endpoint.substr(1)} does not exist`;
          } else {
            err = `Request failed and ${opts.endpoint}(s) not cached. Returned status of ${xhr.status}`;
            callback(err, {
              resource: null,
              source: 'null'
            });
          }

        }
      }
      xhr.send();

    })

  }

  static serverErrHandler(errRes, msgDiv) {
    //errRes is what comes from the SAILS backend
    //Parse detailed error message
  
    if (errRes.status) { //err from backend
      errRes.text().then(errMessage => {
        switch (errRes.status) {
          case 401: //wrong password
          case 403: //user authenticated using another platform/method
          case 404: //user not found
          default: //another error
  
            if (msgDiv) {
              msgDiv.innerHTML = errMessage; //pring to a div
            } else {

              console.log(`ERR ${errRes.status}: ${errMessage}`); //print to console
              return {ok: false, status: errRes.status, body: errMessage, retry: false};
            }
        }
      });
  
    } else { //not a backend error

      if (errRes.stack && errRes.stack == "TypeError: Failed to fetch") {
        return {ok: false, retry: true, status: 'waiting', body: 'Failed to fetch, Server not found'};
      }
      if (msgDiv) {
        msgDiv.innerHTML = errRes;
      } else {
        console.log(errRes);
      }
  
    }
  }

  //convert request URL for restaurant or review to JSON
  static _parseURLInput(urlString) {

    let options = {}; //endpoint, index_name, value

    let url = new URL(urlString);

    //get query parameters
    let paramsJson = getJsonFromUrl(url.search);
    if (paramsJson) {
      options.index_name = Object.keys(paramsJson)[0]
      options.value = paramsJson[options.index_name];
    };

    //get endpoint and value
    let pathname = url.pathname;
    let folders = pathname.split('/').filter(x => x);
    let endpoint = folders[0];
    options.endpoint = endpoint;

    if (folders.length > 1) {
      let value = folders.pop();
      options.value = value;
    }

    return options;

    //Stack Exchange Function: https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
    function getJsonFromUrl(queryIn) {

      if (!queryIn) return;

      //include the '?' in the query string
      var query = queryIn.substr(1);
      var result = {};
      query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
      });
      return result;

    }

  }

  static _getDBItem(store_name, value, index_name) {
    return DBHelper.dbPromised.then(db => {
      const tx = db.transaction(store_name);

      const dbTable = tx.objectStore(store_name);
      let dbIdx = dbTable;

      //modify in the event of an index based search
      if (index_name) {
        dbIdx = dbTable.index(index_name);
      }

      value = isNaN(parseInt(value)) ? value : parseInt(value);

      //Retrieve single value or entire table


      if (value) { 
        return dbIdx.getAll(parseInt(value));
      } else {
        return dbIdx.getAll();
      }

    })

  }

  static _putDBItem(entry, store_name) {
    //returns true if success, false if fails
    return DBHelper.dbPromised.then(db => {
      const tx = db.transaction(store_name, 'readwrite');
      const reviewTable = tx.objectStore(store_name);
      reviewTable.put(entry, parseInt(entry.id));

      return tx.complete;
    }).then((res) => {
      // console.log('EntryAdded');
      return true;
    }).catch((err) => {
      // console.log('Problem Posting');
      return false;
    })

  }

  static _changeDBFavorite(entry) {

    return DBHelper.dbPromised.then( async db => {
      const tx = db.transaction('restaurants','readwrite');
      const dbTable = tx.objectStore('restaurants');
      
      //Retrieve single value or entire table
      let restaurant = await dbTable.get(parseInt(entry.id));

      if (!restaurant) return //no need for error, will update on next sync

      //Update and replace
      restaurant.is_favorite = Boolean(entry.is_favorite);
      dbTable.put(restaurant, parseInt(entry.id));

      //Done
      return tx.complete;
    });


  }

  static _replaceDBReview(old_id, new_entry) {
    return DBHelper.dbPromised.then( db => {
      const tx = db.transaction('reviews', 'readwrite');
      const reviewTable = tx.objectStore('reviews');
      reviewTable.delete(parseInt(old_id));
      reviewTable.put(new_entry, parseInt(new_entry.id));

      return tx.complete;
    }).then(() => true).catch(()=> false);
  }

  static _deleteDBReview(old_id) {
    return DBHelper.dbPromised.then( db => {
      const tx = db.transaction('reviews', 'readwrite');
      const reviewTable = tx.objectStore('reviews');
      reviewTable.delete(parseInt(old_id));
      return tx.complete;
    }).then(() => true).catch(()=> false);
  }


}
/**
 * TODO:Features & Chores
 *  1. Create descriptions for functions
 */

 /*
 *
 *  Global DOM vars
 *
 */

 
 //Notifications
 //...................
const notificationWrapper = document.querySelector('.notification-wrapper');


class HTMLHelper {

  /**
   * Generate <img> tags with sizes and srcset attributes
   */
  static generateImgHTML(restaurant, defaultSize, imgSizes = [], sizesQuery = '') {

    var imgId;
    if (!restaurant.photograph) {
      imgId = '0';
    } else {
      imgId = restaurant.id;
    }

    const img = document.createElement('img');
    img.classList.add('lozad'); //lazy loading
    img.setAttribute('data-src', `img/${imgId}-${defaultSize}w.jpg`);
    img.setAttribute(`alt`, restaurant.photoDesc);

    if (imgSizes.length > 0) {
      let srcsetVal = [];
      for (let [idx, imgSize] of imgSizes.entries()) {
        srcsetVal.push(`img/${imgId}-${imgSize}w.jpg ${idx + 1}x`)
      }
      img.setAttribute('data-srcset', srcsetVal.join(', '));
    }

    if (sizesQuery.length > 0) {
      img.setAttribute('sizes', sizesQuery);
    } //i may want to rewrite this to accommodate 'w' instead of 'x'    

    return img;

  }

  /**
   * Generate <picture> tags 
   */
  static generatePictureHTML(restaurant, imgSizes, queries = []) {

    /*  Sample inputs
    var queries = ['(min-width:300px)', '']; //imgSizes must be greater than nQueries
    var imgSizes = [
      [200, 400, 600],
      [400, 800], 200
    ];*/

    const picture = document.createElement('picture');

    for (let i = 0; i < imgSizes.length; i++) {

      if (i < queries.length) { //create a source element

        let source = document.createElement('source');
        let srcsetVal = [];
        for (let [idx, imgSize] of imgSizes[i].entries()) {
          srcsetVal.push(`img/${restaurant.id}-${imgSize}w.jpg ${idx + 1}x`)
        }

        source.setAttribute('srcset', srcsetVal.join(', '));

        if (queries[i].length > 0) {
          source.setAttribute('media', queries[i]);
        }

        picture.appendChild(source);

      } else { //default img tag
        let img = document.createElement('img');
        img.setAttribute('data-src', `img/${restaurant.id}-${imgSizes[i]}w.jpg`);
        img.setAttribute(`alt`, restaurant.photoDesc);
        picture.appendChild(img);

      }
    }

    return picture;

  }

  /**
   * Re-configure the order and focusability of Google Maps elements
   */
  static setMapTabOrder(map) {
    // I may need to move the tabindex value to 1 for non-map elements
    google.maps.event.addListener(map, 'tilesloaded', () => {

      //A little sloppy, but the timeout makes sure the controls are loaded
      setTimeout(() => {

        //Remove tab index from: iframe and div
        document.querySelector('#map .gm-style div:first-child').setAttribute('tabindex', -1);
        let iFrame = document.querySelector('#map .gm-style iframe');
        iFrame.setAttribute('aria-label', 'Restaurant location map');
        iFrame.setAttribute('tabindex', -1);

        //Tab through divs first
        document.querySelectorAll('#map .gm-style div[role="button"]')
          .forEach((el) => {
            el.setAttribute('tabindex', 0);
            el.classList.add('map-control');
          }); //map & satellite

        //Then Buttons
        document.querySelectorAll('#map .gm-style button')
          .forEach((el) => {
            el.setAttribute('tabindex', 0);
            el.classList.add('map-control');
          }); //zoom in, zoomout, full screen

        //Finally a's (currently not focusable)
        document.querySelectorAll('#map .gm-style a[href]')
          .forEach((el) => {
            el.setAttribute('tabindex', -1);
            el.classList.add('map-link');
          }); //zoom in, zoomout, full screen

        //Set the alt attribute on google maps
        document.querySelectorAll('#map img:not([alt])')
          .forEach((el) => {
            el.setAttribute('alt',`""`);
          })
      }, 500);
    });
  }


/*
 *
 * NOTIFICATIONS
 *
 */
  static postNotification(note) {
    //note is an object: {title, status, message}
    //status = ['info', 'failure', 'success']
  
    //create msg structure
    let msgWrapper = document.createElement('div');
    msgWrapper.setAttribute('role', 'alert');
    msgWrapper.classList.add('notification-msg');
    msgWrapper.classList.add('show');
    msgWrapper.classList.add(note.status.toLowerCase());
  
  
    let msgHeader = document.createElement('div');
    msgHeader.setAttribute('role', 'heading');
    msgHeader.setAttribute('aria-level', '2');
    msgHeader.classList.add('notification-msg--header');
  
    let msgBody = document.createElement('div');
    msgBody.classList.add('notification-msg--body');
  
    let closeBtn = document.createElement('a');
    closeBtn.innerText = 'X';
    closeBtn.classList.add('notification-msg--close');
    closeBtn.setAttribute('href', '#');
  
    //Add the notification header & text
    let msgTitle = note.title ? note.title : note.status;
    msgHeader.appendChild(document.createTextNode(String(msgTitle)));
    msgBody.appendChild(document.createTextNode(String(note.message)));
  
    //Add a listener to the close 
    msgWrapper.addEventListener('click', function () {
      msgWrapper.classList.remove('show');
      msgWrapper.classList.add('seen');
    });
  
    window.setTimeout(() => {
      msgWrapper.classList.remove('show');
    }, 8000); //5 seconds to fade
  
  
    //Build the element
    msgWrapper.appendChild(msgHeader);
    msgWrapper.appendChild(msgBody);
    msgWrapper.appendChild(closeBtn);
  
  
    //append to notifications
    notificationWrapper.appendChild(msgWrapper);
  
  }

  /*
  *
  * Favorites
  * 
  */

  //This is for the first page, when restaurants are created
  static initFavElement(btn, isFav) {


    //add event listener
    btn.addEventListener('click', (e) => HTMLHelper.toggleFavorite(btn));
    btn.setAttribute('aria-label','Favorites');

    //set ARIA roles
    btn.setAttribute('role','switch');

    if (isFav) {
      btn.classList.add('favorite');
      btn.setAttribute('aria-checked',true);
    } else {
      btn.setAttribute('aria-checked',false);
    }

    //Set Icon & Aria
    HTMLHelper._setFavButtonChildren(btn, isFav);

  }

  static _setFavButtonChildren(favBtn, isFav) {
    
     //update button label
     let btnTxt = favBtn.querySelector('.button__text');
     let btnIcon = favBtn.querySelector('.button__icon');
 
     if (btnTxt) {
       if (isFav) { 
         btnTxt.innerText = 'Remove Favorite';
         
       } else {
         btnTxt.innerText = 'Add Favorite';
       }
     }
 
     //use css maybe?
     if (btnIcon) {
       if (isFav) {
         btnIcon.innerHTML = '&#61444;'; //closed heart 
       } else {
         btnIcon.innerHTML = '&#61578;'; //open heart 
       }
     } else {
       
      if (isFav) {
        favBtn.innerHTML = '&#61444;'; //closed heart 
      } else {
        favBtn.innerHTML = '&#61578;'; //open heart 
      }
     }

  }

  static toggleFavorite(thisBtn) {

    let thisId = thisBtn.getAttribute('data-rest-id');
    if (!thisId) return; //Don't have an associated restaurant
    
    let isFavorite = thisBtn.classList.contains('favorite');
    let newState = !Boolean(isFavorite);
  
    //FRONT END changes
    //.................................
    thisBtn.classList.toggle('favorite'); //class
    thisBtn.setAttribute('aria-checked', newState);
    HTMLHelper._setFavButtonChildren(thisBtn, newState);

  
    //BACK END changes
    //.................................
    let favObj = {btn: thisBtn, id: parseInt(thisId), is_favorite: newState}
    DBHelper.setFavoriteStatus(favObj, (res)=> {
  
    });

    //change map marker
    HTMLHelper.updateFavoriteMarker(favObj)
  }

  static toggleOfflineClass(favObj, isMakeOffline) {
    /*INPUT: favObj = {id, btn, isFav}...isMakeOffline=Boolean*/

    let btn = document.body.querySelector(`.options__favorite[data-rest-id="${favObj.id}"]`);
    if (!btn) return; //cant find the button
    
    //toggle it
    if (isMakeOffline) {
      btn.classList.add('offline');
    } else { btn.classList.remove('offline'); }
  }

  static updateFavoriteMarker(favObj) {
    
    //find the marker
    let marker;
    if(self.marker) {
      marker = self.marker;
    } else if(self.markers) {
      marker = self.markers.find((element) => {
        return element.rest_id == favObj.id
      });
    }

    if (!marker) return;

    marker.setIcon(`./img/icons/map-icon-${favObj.is_favorite ? 'favorite':'regular'}.png`);
    
    // marker.setAnimation(google.maps.Animation.DROP);
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => marker.setAnimation(null), 1500);
  }

}

//==========================================================
//FRONT END FUNCTIONALITY
//==========================================================

//Initialize storage
var reviewQueue, favQueue;

class DataSync {

  //Main Operations
  static _getQueue(name) {

    let thisQueue;

    if (window.localStorage) {
      thisQueue = window.localStorage[name];
    } else {
      thisQueue = self[`${name}Queue`].splice(0);
    }

    //return a cloned copy of the queue (not the actual queue)
    return thisQueue ? JSON.parse(thisQueue) : []; //intialize to empty arrray
  }

  static _updateQueue(name, newValue) { //'review' or 'fav'

    if (window.localStorage) {
      return window.localStorage[name] = JSON.stringify(newValue);
    } else {
      return self[`${name}Queue`] = newValue;
    }


  }

  static get favoriteQueue() {
    return DataSync._getQueue('fav');

  }
  static get reviewQueue() {
    return DataSync._getQueue('review');
  }

  static queueReview(newReview) {
    let rQueue =  DataSync.reviewQueue;
    rQueue.push(newReview);
    DataSync._updateQueue('review', rQueue);
  }

  static queueFavorite(newFavorite) {

    let currentQueue = DataSync.favoriteQueue;
    let duplicateFlag = false;

    //If a restaurant is already on the queue, remove it
    for (let i=0; i < currentQueue.length; i++) {
      if (currentQueue[i].id == newFavorite.id) {

        duplicateFlag = true;

        //remove item from current queue
        HTMLHelper.toggleOfflineClass(currentQueue[i],false);
        currentQueue.splice(i,1);

        //stop looking, there will only every be one
        break;
      }
    }

    if (!duplicateFlag) {
      //add to the queue
      currentQueue.push(newFavorite);
      HTMLHelper.toggleOfflineClass(newFavorite,true);
    }

    DataSync._updateQueue('fav', currentQueue);

  }

  static syncWithBackend(e) {
    //this function is called when you are back online
    HTMLHelper.postNotification({
      title: 'Online',
      status: 'success',
      message: 'Welcome back!'
    });

    //Sync Reviews
    DataSync._syncReviews();
    DataSync._syncFavorites();

    //Improvement: Next iteration, this should be handled by a web worker


  }

  static _syncReviews() {

    //Get Queue from localStorage
    let reviewQueue = DataSync.reviewQueue;

    if (!reviewQueue) return;

    //Process the Queue
    for (let i = reviewQueue.length; i>0; i--) {
      if (navigator.onLine) {
        DBHelper.addUserReview(reviewQueue[i-1], reviewQueue[i-1].restaurant_name, (res) => {

          if (!res.retry) {

            //remove from queue
            reviewQueue.splice(i-1, 1);


            //Update the localStorage (async, so can't wait until all done w/o promise)
            DataSync._updateQueue('review', reviewQueue);
          }
        })
      } else {
        break;
      }
    }

    

  }

  static _syncFavorites() {

    //Get Queue from localStorage
    let favsQueue = DataSync.favoriteQueue;

    if (!favsQueue) return;

    //Process the Queue
    for (let i = favsQueue.length; i > 0; i--) {
      if (navigator.onLine) {
        DBHelper.setFavoriteStatus(favsQueue[i - 1], (res) => {
          if (!res.retry) {
            //remove from queue
            HTMLHelper.toggleOfflineClass(favsQueue[i-1],false);
            favsQueue.splice(i, 1);
          }
        })
      } else {
        break;
      }
    }
    //Update the localStorage
    DataSync._updateQueue('fav', favsQueue);
  }

}




//==========================================================
//FRONT END FUNCTIONALITY
//==========================================================

/*
 *
 *  MODAL WINDOW
 *
 */

const modalBtns = document.body.querySelectorAll('.btn-trigger-modal');
const modalOverlay = document.body.querySelector('#modal-overlay');

var focusedElementBeforeModal;

modalBtns.forEach(iBtn => {

  //get ID for associated modal wrapper
  let modalID = iBtn.getAttribute('data-mdl-wrpr'); //ID of wrapper
  let modalWrapper = document.body.querySelector(`#${modalID}`);
  iBtn.addEventListener('click', (e) => openModalWindow(modalWrapper));
});

function openModalWindow(modalWrapper) {
  let modalContent = modalWrapper.querySelector('.modal-content');
  let modalCancel = modalContent.querySelector('.modal-cancel'); //cancelButton

  //save current focus
  focusedElementBeforeModal = document.activeElement;

  //Listen for and add keyboard trap
  modalContent.addEventListener('keydown', trapTabKey);

  //Determine WHICH BUTTONS can close the app (in addition to ESC)
  modalOverlay.addEventListener('click', closeModal); //click background
  modalCancel.addEventListener('click', closeModal);

  //Find focusable children
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  var focusableElements = modalContent.querySelectorAll(focusableElementsString);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  modalWrapper.classList.add('show-modal');
  modalOverlay.classList.add('show-modal');

  //Focus first child
  firstTabStop.focus();

  function trapTabKey(e) {

    //Check for tab key press
    if (e.keyCode === 9) {

      //SHIFT+TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();

        }
      } else {
        //TAB

        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus()
        }

      }
    }

    //Check for ESC 
    if (e.keyCode === 27) {
      closeModal();
    }
  }

  function closeModal() {
    modalWrapper.classList.remove('show-modal');
    modalOverlay.classList.remove('show-modal');

    //set focus back to element that had it before modal was opened
    focusedElementBeforeModal.focus();
  }
}





//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkYi1taW4uanMiLCJsb3phZC1taW4uanMiLCJtb21lbnQuanMiLCJwaWN0dXJlZmlsbC5taW4uanMiLCJkYmhlbHBlci5qcyIsInV0aWxpdGllcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ250QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibGlicmFyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiOyFmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHQsbil7ZS5vbnN1Y2Nlc3M9ZnVuY3Rpb24oKXt0KGUucmVzdWx0KX0sZS5vbmVycm9yPWZ1bmN0aW9uKCl7bihlLmVycm9yKX19KX1mdW5jdGlvbiB0KHQsbixvKXt2YXIgcixpPW5ldyBQcm9taXNlKGZ1bmN0aW9uKGksdSl7ZShyPXRbbl0uYXBwbHkodCxvKSkudGhlbihpLHUpfSk7cmV0dXJuIGkucmVxdWVzdD1yLGl9ZnVuY3Rpb24gbihlLHQsbil7bi5mb3JFYWNoKGZ1bmN0aW9uKG4pe09iamVjdC5kZWZpbmVQcm9wZXJ0eShlLnByb3RvdHlwZSxuLHtnZXQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1t0XVtuXX0sc2V0OmZ1bmN0aW9uKGUpe3RoaXNbdF1bbl09ZX19KX0pfWZ1bmN0aW9uIG8oZSxuLG8scil7ci5mb3JFYWNoKGZ1bmN0aW9uKHIpe3IgaW4gby5wcm90b3R5cGUmJihlLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3JldHVybiB0KHRoaXNbbl0scixhcmd1bWVudHMpfSl9KX1mdW5jdGlvbiByKGUsdCxuLG8pe28uZm9yRWFjaChmdW5jdGlvbihvKXtvIGluIG4ucHJvdG90eXBlJiYoZS5wcm90b3R5cGVbb109ZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1t0XVtvXS5hcHBseSh0aGlzW3RdLGFyZ3VtZW50cyl9KX0pfWZ1bmN0aW9uIGkoZSxuLG8scil7ci5mb3JFYWNoKGZ1bmN0aW9uKHIpe3IgaW4gby5wcm90b3R5cGUmJihlLnByb3RvdHlwZVtyXT1mdW5jdGlvbigpe3JldHVybiBlPXRoaXNbbl0sKG89dChlLHIsYXJndW1lbnRzKSkudGhlbihmdW5jdGlvbihlKXtpZihlKXJldHVybiBuZXcgYyhlLG8ucmVxdWVzdCl9KTt2YXIgZSxvfSl9KX1mdW5jdGlvbiB1KGUpe3RoaXMuX2luZGV4PWV9ZnVuY3Rpb24gYyhlLHQpe3RoaXMuX2N1cnNvcj1lLHRoaXMuX3JlcXVlc3Q9dH1mdW5jdGlvbiBzKGUpe3RoaXMuX3N0b3JlPWV9ZnVuY3Rpb24gcChlKXt0aGlzLl90eD1lLHRoaXMuY29tcGxldGU9bmV3IFByb21pc2UoZnVuY3Rpb24odCxuKXtlLm9uY29tcGxldGU9ZnVuY3Rpb24oKXt0KCl9LGUub25lcnJvcj1mdW5jdGlvbigpe24oZS5lcnJvcil9LGUub25hYm9ydD1mdW5jdGlvbigpe24oZS5lcnJvcil9fSl9ZnVuY3Rpb24gYShlLHQsbil7dGhpcy5fZGI9ZSx0aGlzLm9sZFZlcnNpb249dCx0aGlzLnRyYW5zYWN0aW9uPW5ldyBwKG4pfWZ1bmN0aW9uIGYoZSl7dGhpcy5fZGI9ZX1uKHUsXCJfaW5kZXhcIixbXCJuYW1lXCIsXCJrZXlQYXRoXCIsXCJtdWx0aUVudHJ5XCIsXCJ1bmlxdWVcIl0pLG8odSxcIl9pbmRleFwiLElEQkluZGV4LFtcImdldFwiLFwiZ2V0S2V5XCIsXCJnZXRBbGxcIixcImdldEFsbEtleXNcIixcImNvdW50XCJdKSxpKHUsXCJfaW5kZXhcIixJREJJbmRleCxbXCJvcGVuQ3Vyc29yXCIsXCJvcGVuS2V5Q3Vyc29yXCJdKSxuKGMsXCJfY3Vyc29yXCIsW1wiZGlyZWN0aW9uXCIsXCJrZXlcIixcInByaW1hcnlLZXlcIixcInZhbHVlXCJdKSxvKGMsXCJfY3Vyc29yXCIsSURCQ3Vyc29yLFtcInVwZGF0ZVwiLFwiZGVsZXRlXCJdKSxbXCJhZHZhbmNlXCIsXCJjb250aW51ZVwiLFwiY29udGludWVQcmltYXJ5S2V5XCJdLmZvckVhY2goZnVuY3Rpb24odCl7dCBpbiBJREJDdXJzb3IucHJvdG90eXBlJiYoYy5wcm90b3R5cGVbdF09ZnVuY3Rpb24oKXt2YXIgbj10aGlzLG89YXJndW1lbnRzO3JldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uKCl7cmV0dXJuIG4uX2N1cnNvclt0XS5hcHBseShuLl9jdXJzb3IsbyksZShuLl9yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKGUpe2lmKGUpcmV0dXJuIG5ldyBjKGUsbi5fcmVxdWVzdCl9KX0pfSl9KSxzLnByb3RvdHlwZS5jcmVhdGVJbmRleD1mdW5jdGlvbigpe3JldHVybiBuZXcgdSh0aGlzLl9zdG9yZS5jcmVhdGVJbmRleC5hcHBseSh0aGlzLl9zdG9yZSxhcmd1bWVudHMpKX0scy5wcm90b3R5cGUuaW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHUodGhpcy5fc3RvcmUuaW5kZXguYXBwbHkodGhpcy5fc3RvcmUsYXJndW1lbnRzKSl9LG4ocyxcIl9zdG9yZVwiLFtcIm5hbWVcIixcImtleVBhdGhcIixcImluZGV4TmFtZXNcIixcImF1dG9JbmNyZW1lbnRcIl0pLG8ocyxcIl9zdG9yZVwiLElEQk9iamVjdFN0b3JlLFtcInB1dFwiLFwiYWRkXCIsXCJkZWxldGVcIixcImNsZWFyXCIsXCJnZXRcIixcImdldEFsbFwiLFwiZ2V0S2V5XCIsXCJnZXRBbGxLZXlzXCIsXCJjb3VudFwiXSksaShzLFwiX3N0b3JlXCIsSURCT2JqZWN0U3RvcmUsW1wib3BlbkN1cnNvclwiLFwib3BlbktleUN1cnNvclwiXSkscihzLFwiX3N0b3JlXCIsSURCT2JqZWN0U3RvcmUsW1wiZGVsZXRlSW5kZXhcIl0pLHAucHJvdG90eXBlLm9iamVjdFN0b3JlPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBzKHRoaXMuX3R4Lm9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX3R4LGFyZ3VtZW50cykpfSxuKHAsXCJfdHhcIixbXCJvYmplY3RTdG9yZU5hbWVzXCIsXCJtb2RlXCJdKSxyKHAsXCJfdHhcIixJREJUcmFuc2FjdGlvbixbXCJhYm9ydFwiXSksYS5wcm90b3R5cGUuY3JlYXRlT2JqZWN0U3RvcmU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHModGhpcy5fZGIuY3JlYXRlT2JqZWN0U3RvcmUuYXBwbHkodGhpcy5fZGIsYXJndW1lbnRzKSl9LG4oYSxcIl9kYlwiLFtcIm5hbWVcIixcInZlcnNpb25cIixcIm9iamVjdFN0b3JlTmFtZXNcIl0pLHIoYSxcIl9kYlwiLElEQkRhdGFiYXNlLFtcImRlbGV0ZU9iamVjdFN0b3JlXCIsXCJjbG9zZVwiXSksZi5wcm90b3R5cGUudHJhbnNhY3Rpb249ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IHAodGhpcy5fZGIudHJhbnNhY3Rpb24uYXBwbHkodGhpcy5fZGIsYXJndW1lbnRzKSl9LG4oZixcIl9kYlwiLFtcIm5hbWVcIixcInZlcnNpb25cIixcIm9iamVjdFN0b3JlTmFtZXNcIl0pLHIoZixcIl9kYlwiLElEQkRhdGFiYXNlLFtcImNsb3NlXCJdKSxbXCJvcGVuQ3Vyc29yXCIsXCJvcGVuS2V5Q3Vyc29yXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7W3MsdV0uZm9yRWFjaChmdW5jdGlvbih0KXtlIGluIHQucHJvdG90eXBlJiYodC5wcm90b3R5cGVbZS5yZXBsYWNlKFwib3BlblwiLFwiaXRlcmF0ZVwiKV09ZnVuY3Rpb24oKXt2YXIgdCxuPSh0PWFyZ3VtZW50cyxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0KSksbz1uW24ubGVuZ3RoLTFdLHI9dGhpcy5fc3RvcmV8fHRoaXMuX2luZGV4LGk9cltlXS5hcHBseShyLG4uc2xpY2UoMCwtMSkpO2kub25zdWNjZXNzPWZ1bmN0aW9uKCl7byhpLnJlc3VsdCl9fSl9KX0pLFt1LHNdLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5wcm90b3R5cGUuZ2V0QWxsfHwoZS5wcm90b3R5cGUuZ2V0QWxsPWZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcyxvPVtdO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyKXtuLml0ZXJhdGVDdXJzb3IoZSxmdW5jdGlvbihlKXtlPyhvLnB1c2goZS52YWx1ZSksdm9pZCAwPT09dHx8by5sZW5ndGghPXQ/ZS5jb250aW51ZSgpOnIobykpOnIobyl9KX0pfSl9KTt2YXIgZD17b3BlbjpmdW5jdGlvbihlLG4sbyl7dmFyIHI9dChpbmRleGVkREIsXCJvcGVuXCIsW2Usbl0pLGk9ci5yZXF1ZXN0O3JldHVybiBpJiYoaS5vbnVwZ3JhZGVuZWVkZWQ9ZnVuY3Rpb24oZSl7byYmbyhuZXcgYShpLnJlc3VsdCxlLm9sZFZlcnNpb24saS50cmFuc2FjdGlvbikpfSksci50aGVuKGZ1bmN0aW9uKGUpe3JldHVybiBuZXcgZihlKX0pfSxkZWxldGU6ZnVuY3Rpb24oZSl7cmV0dXJuIHQoaW5kZXhlZERCLFwiZGVsZXRlRGF0YWJhc2VcIixbZV0pfX07XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT8obW9kdWxlLmV4cG9ydHM9ZCxtb2R1bGUuZXhwb3J0cy5kZWZhdWx0PW1vZHVsZS5leHBvcnRzKTpzZWxmLmlkYj1kfSgpOyIsIi8qISBsb3phZC5qcyAtIHYxLjQuMCAtIDIwMTgtMDQtMjJcclxuKiBodHRwczovL2dpdGh1Yi5jb20vQXBvb3J2U2F4ZW5hL2xvemFkLmpzXHJcbiogQ29weXJpZ2h0IChjKSAyMDE4IEFwb29ydiBTYXhlbmE7IExpY2Vuc2VkIE1JVCAqL1xyXG4hZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKTp0LmxvemFkPWUoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWxvYWRlZFwiLCEwKX12YXIgZT1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0KXtmb3IodmFyIGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKXt2YXIgcj1hcmd1bWVudHNbZV07Zm9yKHZhciBuIGluIHIpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHIsbikmJih0W25dPXJbbl0pfXJldHVybiB0fSxyPWRvY3VtZW50LmRvY3VtZW50TW9kZSxuPXtyb290TWFyZ2luOlwiMHB4XCIsdGhyZXNob2xkOjAsbG9hZDpmdW5jdGlvbih0KXtpZihcInBpY3R1cmVcIj09PXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtyJiZ0LmdldEF0dHJpYnV0ZShcImRhdGEtaWVzcmNcIikmJihlLnNyYz10LmdldEF0dHJpYnV0ZShcImRhdGEtaWVzcmNcIikpLHQuYXBwZW5kQ2hpbGQoZSl9dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSYmKHQuc3JjPXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikpLHQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNzZXRcIikmJih0LnNyY3NldD10LmdldEF0dHJpYnV0ZShcImRhdGEtc3Jjc2V0XCIpKSx0LmdldEF0dHJpYnV0ZShcImRhdGEtYmFja2dyb3VuZC1pbWFnZVwiKSYmKHQuc3R5bGUuYmFja2dyb3VuZEltYWdlPVwidXJsKCdcIit0LmdldEF0dHJpYnV0ZShcImRhdGEtYmFja2dyb3VuZC1pbWFnZVwiKStcIicpXCIpfSxsb2FkZWQ6ZnVuY3Rpb24oKXt9fSxvPWZ1bmN0aW9uKHQpe3JldHVyblwidHJ1ZVwiPT09dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWxvYWRlZFwiKX0sYT1mdW5jdGlvbihlLHIpe3JldHVybiBmdW5jdGlvbihuLGEpe24uZm9yRWFjaChmdW5jdGlvbihuKXtuLmludGVyc2VjdGlvblJhdGlvPjAmJihhLnVub2JzZXJ2ZShuLnRhcmdldCksbyhuLnRhcmdldCl8fChlKG4udGFyZ2V0KSx0KG4udGFyZ2V0KSxyKG4udGFyZ2V0KSkpfSl9fSxpPWZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgRWxlbWVudD9bdF06dCBpbnN0YW5jZW9mIE5vZGVMaXN0P3Q6ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0KX07cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIHI9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOlwiLmxvemFkXCIsZD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sdT1lKHt9LG4sZCksYz11LnJvb3RNYXJnaW4scz11LnRocmVzaG9sZCxnPXUubG9hZCxmPXUubG9hZGVkLGw9dm9pZCAwO3JldHVybiB3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXImJihsPW5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihhKGcsZikse3Jvb3RNYXJnaW46Yyx0aHJlc2hvbGQ6c30pKSx7b2JzZXJ2ZTpmdW5jdGlvbigpe2Zvcih2YXIgZT1pKHIpLG49MDtuPGUubGVuZ3RoO24rKylvKGVbbl0pfHwobD9sLm9ic2VydmUoZVtuXSk6KGcoZVtuXSksdChlW25dKSxmKGVbbl0pKSl9LHRyaWdnZXJMb2FkOmZ1bmN0aW9uKGUpe28oZSl8fChnKGUpLHQoZSksZihlKSl9fX19KTsiLCIvLyEgbW9tZW50LmpzXHJcblxyXG47KGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcclxuICAgIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcclxuICAgIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XHJcbiAgICBnbG9iYWwubW9tZW50ID0gZmFjdG9yeSgpXHJcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciBob29rQ2FsbGJhY2s7XHJcblxyXG4gICAgZnVuY3Rpb24gaG9va3MgKCkge1xyXG4gICAgICAgIHJldHVybiBob29rQ2FsbGJhY2suYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGlzIGRvbmUgdG8gcmVnaXN0ZXIgdGhlIG1ldGhvZCBjYWxsZWQgd2l0aCBtb21lbnQoKVxyXG4gICAgLy8gd2l0aG91dCBjcmVhdGluZyBjaXJjdWxhciBkZXBlbmRlbmNpZXMuXHJcbiAgICBmdW5jdGlvbiBzZXRIb29rQ2FsbGJhY2sgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaG9va0NhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNBcnJheShpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCBpbnN0YW5jZW9mIEFycmF5IHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNPYmplY3QoaW5wdXQpIHtcclxuICAgICAgICAvLyBJRTggd2lsbCB0cmVhdCB1bmRlZmluZWQgYW5kIG51bGwgYXMgb2JqZWN0IGlmIGl0IHdhc24ndCBmb3JcclxuICAgICAgICAvLyBpbnB1dCAhPSBudWxsXHJcbiAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGlucHV0KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNPYmplY3RFbXB0eShvYmopIHtcclxuICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCA9PT0gMCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGs7XHJcbiAgICAgICAgICAgIGZvciAoayBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVW5kZWZpbmVkKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09PSB2b2lkIDA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNOdW1iZXIoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gdHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBOdW1iZXJdJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0RhdGUoaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChpbnB1dCkgPT09ICdbb2JqZWN0IERhdGVdJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmbikge1xyXG4gICAgICAgIHZhciByZXMgPSBbXSwgaTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHJlcy5wdXNoKGZuKGFycltpXSwgaSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhc093blByb3AoYSwgYikge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwgYik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZXh0ZW5kKGEsIGIpIHtcclxuICAgICAgICBmb3IgKHZhciBpIGluIGIpIHtcclxuICAgICAgICAgICAgaWYgKGhhc093blByb3AoYiwgaSkpIHtcclxuICAgICAgICAgICAgICAgIGFbaV0gPSBiW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaGFzT3duUHJvcChiLCAndG9TdHJpbmcnKSkge1xyXG4gICAgICAgICAgICBhLnRvU3RyaW5nID0gYi50b1N0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChoYXNPd25Qcm9wKGIsICd2YWx1ZU9mJykpIHtcclxuICAgICAgICAgICAgYS52YWx1ZU9mID0gYi52YWx1ZU9mO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlVVRDIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCB0cnVlKS51dGMoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0UGFyc2luZ0ZsYWdzKCkge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZGVlcCBjbG9uZSB0aGlzIG9iamVjdC5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlbXB0eSAgICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgdW51c2VkVG9rZW5zICAgIDogW10sXHJcbiAgICAgICAgICAgIHVudXNlZElucHV0ICAgICA6IFtdLFxyXG4gICAgICAgICAgICBvdmVyZmxvdyAgICAgICAgOiAtMixcclxuICAgICAgICAgICAgY2hhcnNMZWZ0T3ZlciAgIDogMCxcclxuICAgICAgICAgICAgbnVsbElucHV0ICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGludmFsaWRNb250aCAgICA6IG51bGwsXHJcbiAgICAgICAgICAgIGludmFsaWRGb3JtYXQgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICB1c2VySW52YWxpZGF0ZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNvICAgICAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHBhcnNlZERhdGVQYXJ0cyA6IFtdLFxyXG4gICAgICAgICAgICBtZXJpZGllbSAgICAgICAgOiBudWxsLFxyXG4gICAgICAgICAgICByZmMyODIyICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgd2Vla2RheU1pc21hdGNoIDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFBhcnNpbmdGbGFncyhtKSB7XHJcbiAgICAgICAgaWYgKG0uX3BmID09IG51bGwpIHtcclxuICAgICAgICAgICAgbS5fcGYgPSBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLl9wZjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc29tZTtcclxuICAgIGlmIChBcnJheS5wcm90b3R5cGUuc29tZSkge1xyXG4gICAgICAgIHNvbWUgPSBBcnJheS5wcm90b3R5cGUuc29tZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc29tZSA9IGZ1bmN0aW9uIChmdW4pIHtcclxuICAgICAgICAgICAgdmFyIHQgPSBPYmplY3QodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0Lmxlbmd0aCA+Pj4gMDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpIGluIHQgJiYgZnVuLmNhbGwodGhpcywgdFtpXSwgaSwgdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNWYWxpZChtKSB7XHJcbiAgICAgICAgaWYgKG0uX2lzVmFsaWQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgZmxhZ3MgPSBnZXRQYXJzaW5nRmxhZ3MobSk7XHJcbiAgICAgICAgICAgIHZhciBwYXJzZWRQYXJ0cyA9IHNvbWUuY2FsbChmbGFncy5wYXJzZWREYXRlUGFydHMsIGZ1bmN0aW9uIChpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAhPSBudWxsO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIGlzTm93VmFsaWQgPSAhaXNOYU4obS5fZC5nZXRUaW1lKCkpICYmXHJcbiAgICAgICAgICAgICAgICBmbGFncy5vdmVyZmxvdyA8IDAgJiZcclxuICAgICAgICAgICAgICAgICFmbGFncy5lbXB0eSAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRNb250aCAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLmludmFsaWRXZWVrZGF5ICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3Mud2Vla2RheU1pc21hdGNoICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MubnVsbElucHV0ICYmXHJcbiAgICAgICAgICAgICAgICAhZmxhZ3MuaW52YWxpZEZvcm1hdCAmJlxyXG4gICAgICAgICAgICAgICAgIWZsYWdzLnVzZXJJbnZhbGlkYXRlZCAmJlxyXG4gICAgICAgICAgICAgICAgKCFmbGFncy5tZXJpZGllbSB8fCAoZmxhZ3MubWVyaWRpZW0gJiYgcGFyc2VkUGFydHMpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtLl9zdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIGlzTm93VmFsaWQgPSBpc05vd1ZhbGlkICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuY2hhcnNMZWZ0T3ZlciA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGZsYWdzLnVudXNlZFRva2Vucy5sZW5ndGggPT09IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICBmbGFncy5iaWdIb3VyID09PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChPYmplY3QuaXNGcm96ZW4gPT0gbnVsbCB8fCAhT2JqZWN0LmlzRnJvemVuKG0pKSB7XHJcbiAgICAgICAgICAgICAgICBtLl9pc1ZhbGlkID0gaXNOb3dWYWxpZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc05vd1ZhbGlkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtLl9pc1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUludmFsaWQgKGZsYWdzKSB7XHJcbiAgICAgICAgdmFyIG0gPSBjcmVhdGVVVEMoTmFOKTtcclxuICAgICAgICBpZiAoZmxhZ3MgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBleHRlbmQoZ2V0UGFyc2luZ0ZsYWdzKG0pLCBmbGFncyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MobSkudXNlckludmFsaWRhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBtO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBsdWdpbnMgdGhhdCBhZGQgcHJvcGVydGllcyBzaG91bGQgYWxzbyBhZGQgdGhlIGtleSBoZXJlIChudWxsIHZhbHVlKSxcclxuICAgIC8vIHNvIHdlIGNhbiBwcm9wZXJseSBjbG9uZSBvdXJzZWx2ZXMuXHJcbiAgICB2YXIgbW9tZW50UHJvcGVydGllcyA9IGhvb2tzLm1vbWVudFByb3BlcnRpZXMgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb3B5Q29uZmlnKHRvLCBmcm9tKSB7XHJcbiAgICAgICAgdmFyIGksIHByb3AsIHZhbDtcclxuXHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc0FNb21lbnRPYmplY3QpKSB7XHJcbiAgICAgICAgICAgIHRvLl9pc0FNb21lbnRPYmplY3QgPSBmcm9tLl9pc0FNb21lbnRPYmplY3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5faSkpIHtcclxuICAgICAgICAgICAgdG8uX2kgPSBmcm9tLl9pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX2YpKSB7XHJcbiAgICAgICAgICAgIHRvLl9mID0gZnJvbS5fZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9sKSkge1xyXG4gICAgICAgICAgICB0by5fbCA9IGZyb20uX2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fc3RyaWN0KSkge1xyXG4gICAgICAgICAgICB0by5fc3RyaWN0ID0gZnJvbS5fc3RyaWN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3R6bSkpIHtcclxuICAgICAgICAgICAgdG8uX3R6bSA9IGZyb20uX3R6bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc1VuZGVmaW5lZChmcm9tLl9pc1VUQykpIHtcclxuICAgICAgICAgICAgdG8uX2lzVVRDID0gZnJvbS5faXNVVEM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fb2Zmc2V0KSkge1xyXG4gICAgICAgICAgICB0by5fb2Zmc2V0ID0gZnJvbS5fb2Zmc2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWlzVW5kZWZpbmVkKGZyb20uX3BmKSkge1xyXG4gICAgICAgICAgICB0by5fcGYgPSBnZXRQYXJzaW5nRmxhZ3MoZnJvbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQoZnJvbS5fbG9jYWxlKSkge1xyXG4gICAgICAgICAgICB0by5fbG9jYWxlID0gZnJvbS5fbG9jYWxlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1vbWVudFByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbW9tZW50UHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcHJvcCA9IG1vbWVudFByb3BlcnRpZXNbaV07XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBmcm9tW3Byb3BdO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1VuZGVmaW5lZCh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9bcHJvcF0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0bztcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdXBkYXRlSW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIE1vbWVudCBwcm90b3R5cGUgb2JqZWN0XHJcbiAgICBmdW5jdGlvbiBNb21lbnQoY29uZmlnKSB7XHJcbiAgICAgICAgY29weUNvbmZpZyh0aGlzLCBjb25maWcpO1xyXG4gICAgICAgIHRoaXMuX2QgPSBuZXcgRGF0ZShjb25maWcuX2QgIT0gbnVsbCA/IGNvbmZpZy5fZC5nZXRUaW1lKCkgOiBOYU4pO1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZCA9IG5ldyBEYXRlKE5hTik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFByZXZlbnQgaW5maW5pdGUgbG9vcCBpbiBjYXNlIHVwZGF0ZU9mZnNldCBjcmVhdGVzIG5ldyBtb21lbnRcclxuICAgICAgICAvLyBvYmplY3RzLlxyXG4gICAgICAgIGlmICh1cGRhdGVJblByb2dyZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMpO1xyXG4gICAgICAgICAgICB1cGRhdGVJblByb2dyZXNzID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW9tZW50IChvYmopIHtcclxuICAgICAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgTW9tZW50IHx8IChvYmogIT0gbnVsbCAmJiBvYmouX2lzQU1vbWVudE9iamVjdCAhPSBudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhYnNGbG9vciAobnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKG51bWJlciA8IDApIHtcclxuICAgICAgICAgICAgLy8gLTAgLT4gMFxyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKG51bWJlcikgfHwgMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b0ludChhcmd1bWVudEZvckNvZXJjaW9uKSB7XHJcbiAgICAgICAgdmFyIGNvZXJjZWROdW1iZXIgPSArYXJndW1lbnRGb3JDb2VyY2lvbixcclxuICAgICAgICAgICAgdmFsdWUgPSAwO1xyXG5cclxuICAgICAgICBpZiAoY29lcmNlZE51bWJlciAhPT0gMCAmJiBpc0Zpbml0ZShjb2VyY2VkTnVtYmVyKSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IGFic0Zsb29yKGNvZXJjZWROdW1iZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbXBhcmUgdHdvIGFycmF5cywgcmV0dXJuIHRoZSBudW1iZXIgb2YgZGlmZmVyZW5jZXNcclxuICAgIGZ1bmN0aW9uIGNvbXBhcmVBcnJheXMoYXJyYXkxLCBhcnJheTIsIGRvbnRDb252ZXJ0KSB7XHJcbiAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgpLFxyXG4gICAgICAgICAgICBsZW5ndGhEaWZmID0gTWF0aC5hYnMoYXJyYXkxLmxlbmd0aCAtIGFycmF5Mi5sZW5ndGgpLFxyXG4gICAgICAgICAgICBkaWZmcyA9IDAsXHJcbiAgICAgICAgICAgIGk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICgoZG9udENvbnZlcnQgJiYgYXJyYXkxW2ldICE9PSBhcnJheTJbaV0pIHx8XHJcbiAgICAgICAgICAgICAgICAoIWRvbnRDb252ZXJ0ICYmIHRvSW50KGFycmF5MVtpXSkgIT09IHRvSW50KGFycmF5MltpXSkpKSB7XHJcbiAgICAgICAgICAgICAgICBkaWZmcysrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkaWZmcyArIGxlbmd0aERpZmY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gd2Fybihtc2cpIHtcclxuICAgICAgICBpZiAoaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID09PSBmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgKHR5cGVvZiBjb25zb2xlICE9PSAgJ3VuZGVmaW5lZCcpICYmIGNvbnNvbGUud2Fybikge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0RlcHJlY2F0aW9uIHdhcm5pbmc6ICcgKyBtc2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZXByZWNhdGUobXNnLCBmbikge1xyXG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xyXG5cclxuICAgICAgICByZXR1cm4gZXh0ZW5kKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKGhvb2tzLmRlcHJlY2F0aW9uSGFuZGxlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBob29rcy5kZXByZWNhdGlvbkhhbmRsZXIobnVsbCwgbXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZmlyc3RUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZztcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbaV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyArPSAnXFxuWycgKyBpICsgJ10gJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGFyZ3VtZW50c1swXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnICs9IGtleSArICc6ICcgKyBhcmd1bWVudHNbMF1ba2V5XSArICcsICc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnLnNsaWNlKDAsIC0yKTsgLy8gUmVtb3ZlIHRyYWlsaW5nIGNvbW1hIGFuZCBzcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB3YXJuKG1zZyArICdcXG5Bcmd1bWVudHM6ICcgKyBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKS5qb2luKCcnKSArICdcXG4nICsgKG5ldyBFcnJvcigpKS5zdGFjayk7XHJcbiAgICAgICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICB9LCBmbik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlcHJlY2F0aW9ucyA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZVNpbXBsZShuYW1lLCBtc2cpIHtcclxuICAgICAgICBpZiAoaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaG9va3MuZGVwcmVjYXRpb25IYW5kbGVyKG5hbWUsIG1zZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZGVwcmVjYXRpb25zW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHdhcm4obXNnKTtcclxuICAgICAgICAgICAgZGVwcmVjYXRpb25zW25hbWVdID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaG9va3Muc3VwcHJlc3NEZXByZWNhdGlvbldhcm5pbmdzID0gZmFsc2U7XHJcbiAgICBob29rcy5kZXByZWNhdGlvbkhhbmRsZXIgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIGlzRnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICByZXR1cm4gaW5wdXQgaW5zdGFuY2VvZiBGdW5jdGlvbiB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoaW5wdXQpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldCAoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHByb3AsIGk7XHJcbiAgICAgICAgZm9yIChpIGluIGNvbmZpZykge1xyXG4gICAgICAgICAgICBwcm9wID0gY29uZmlnW2ldO1xyXG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpc1tpXSA9IHByb3A7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzWydfJyArIGldID0gcHJvcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XHJcbiAgICAgICAgLy8gTGVuaWVudCBvcmRpbmFsIHBhcnNpbmcgYWNjZXB0cyBqdXN0IGEgbnVtYmVyIGluIGFkZGl0aW9uIHRvXHJcbiAgICAgICAgLy8gbnVtYmVyICsgKHBvc3NpYmx5KSBzdHVmZiBjb21pbmcgZnJvbSBfZGF5T2ZNb250aE9yZGluYWxQYXJzZS5cclxuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgXCJvcmRpbmFsUGFyc2VcIiBmYWxsYmFjayBpbiBuZXh0IG1ham9yIHJlbGVhc2UuXHJcbiAgICAgICAgdGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQgPSBuZXcgUmVnRXhwKFxyXG4gICAgICAgICAgICAodGhpcy5fZGF5T2ZNb250aE9yZGluYWxQYXJzZS5zb3VyY2UgfHwgdGhpcy5fb3JkaW5hbFBhcnNlLnNvdXJjZSkgK1xyXG4gICAgICAgICAgICAgICAgJ3wnICsgKC9cXGR7MSwyfS8pLnNvdXJjZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY2hpbGRDb25maWcpIHtcclxuICAgICAgICB2YXIgcmVzID0gZXh0ZW5kKHt9LCBwYXJlbnRDb25maWcpLCBwcm9wO1xyXG4gICAgICAgIGZvciAocHJvcCBpbiBjaGlsZENvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChjaGlsZENvbmZpZywgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc09iamVjdChwYXJlbnRDb25maWdbcHJvcF0pICYmIGlzT2JqZWN0KGNoaWxkQ29uZmlnW3Byb3BdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc1twcm9wXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZChyZXNbcHJvcF0sIHBhcmVudENvbmZpZ1twcm9wXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHJlc1twcm9wXSwgY2hpbGRDb25maWdbcHJvcF0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGlsZENvbmZpZ1twcm9wXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Byb3BdID0gY2hpbGRDb25maWdbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByZXNbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChwcm9wIGluIHBhcmVudENvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChwYXJlbnRDb25maWcsIHByb3ApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWhhc093blByb3AoY2hpbGRDb25maWcsIHByb3ApICYmXHJcbiAgICAgICAgICAgICAgICAgICAgaXNPYmplY3QocGFyZW50Q29uZmlnW3Byb3BdKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIGNoYW5nZXMgdG8gcHJvcGVydGllcyBkb24ndCBtb2RpZnkgcGFyZW50IGNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgcmVzW3Byb3BdID0gZXh0ZW5kKHt9LCByZXNbcHJvcF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gTG9jYWxlKGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldChjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIga2V5cztcclxuXHJcbiAgICBpZiAoT2JqZWN0LmtleXMpIHtcclxuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGtleXMgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCByZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yIChpIGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc093blByb3Aob2JqLCBpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdENhbGVuZGFyID0ge1xyXG4gICAgICAgIHNhbWVEYXkgOiAnW1RvZGF5IGF0XSBMVCcsXHJcbiAgICAgICAgbmV4dERheSA6ICdbVG9tb3Jyb3cgYXRdIExUJyxcclxuICAgICAgICBuZXh0V2VlayA6ICdkZGRkIFthdF0gTFQnLFxyXG4gICAgICAgIGxhc3REYXkgOiAnW1llc3RlcmRheSBhdF0gTFQnLFxyXG4gICAgICAgIGxhc3RXZWVrIDogJ1tMYXN0XSBkZGRkIFthdF0gTFQnLFxyXG4gICAgICAgIHNhbWVFbHNlIDogJ0wnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGVuZGFyIChrZXksIG1vbSwgbm93KSB7XHJcbiAgICAgICAgdmFyIG91dHB1dCA9IHRoaXMuX2NhbGVuZGFyW2tleV0gfHwgdGhpcy5fY2FsZW5kYXJbJ3NhbWVFbHNlJ107XHJcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24ob3V0cHV0KSA/IG91dHB1dC5jYWxsKG1vbSwgbm93KSA6IG91dHB1dDtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvbmdEYXRlRm9ybWF0ID0ge1xyXG4gICAgICAgIExUUyAgOiAnaDptbTpzcyBBJyxcclxuICAgICAgICBMVCAgIDogJ2g6bW0gQScsXHJcbiAgICAgICAgTCAgICA6ICdNTS9ERC9ZWVlZJyxcclxuICAgICAgICBMTCAgIDogJ01NTU0gRCwgWVlZWScsXHJcbiAgICAgICAgTExMICA6ICdNTU1NIEQsIFlZWVkgaDptbSBBJyxcclxuICAgICAgICBMTExMIDogJ2RkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEEnXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvbmdEYXRlRm9ybWF0IChrZXkpIHtcclxuICAgICAgICB2YXIgZm9ybWF0ID0gdGhpcy5fbG9uZ0RhdGVGb3JtYXRba2V5XSxcclxuICAgICAgICAgICAgZm9ybWF0VXBwZXIgPSB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXkudG9VcHBlckNhc2UoKV07XHJcblxyXG4gICAgICAgIGlmIChmb3JtYXQgfHwgIWZvcm1hdFVwcGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9sb25nRGF0ZUZvcm1hdFtrZXldID0gZm9ybWF0VXBwZXIucmVwbGFjZSgvTU1NTXxNTXxERHxkZGRkL2csIGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbC5zbGljZSgxKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvbmdEYXRlRm9ybWF0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRJbnZhbGlkRGF0ZSA9ICdJbnZhbGlkIGRhdGUnO1xyXG5cclxuICAgIGZ1bmN0aW9uIGludmFsaWREYXRlICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW52YWxpZERhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRPcmRpbmFsID0gJyVkJztcclxuICAgIHZhciBkZWZhdWx0RGF5T2ZNb250aE9yZGluYWxQYXJzZSA9IC9cXGR7MSwyfS87XHJcblxyXG4gICAgZnVuY3Rpb24gb3JkaW5hbCAobnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX29yZGluYWwucmVwbGFjZSgnJWQnLCBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0UmVsYXRpdmVUaW1lID0ge1xyXG4gICAgICAgIGZ1dHVyZSA6ICdpbiAlcycsXHJcbiAgICAgICAgcGFzdCAgIDogJyVzIGFnbycsXHJcbiAgICAgICAgcyAgOiAnYSBmZXcgc2Vjb25kcycsXHJcbiAgICAgICAgc3MgOiAnJWQgc2Vjb25kcycsXHJcbiAgICAgICAgbSAgOiAnYSBtaW51dGUnLFxyXG4gICAgICAgIG1tIDogJyVkIG1pbnV0ZXMnLFxyXG4gICAgICAgIGggIDogJ2FuIGhvdXInLFxyXG4gICAgICAgIGhoIDogJyVkIGhvdXJzJyxcclxuICAgICAgICBkICA6ICdhIGRheScsXHJcbiAgICAgICAgZGQgOiAnJWQgZGF5cycsXHJcbiAgICAgICAgTSAgOiAnYSBtb250aCcsXHJcbiAgICAgICAgTU0gOiAnJWQgbW9udGhzJyxcclxuICAgICAgICB5ICA6ICdhIHllYXInLFxyXG4gICAgICAgIHl5IDogJyVkIHllYXJzJ1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiByZWxhdGl2ZVRpbWUgKG51bWJlciwgd2l0aG91dFN1ZmZpeCwgc3RyaW5nLCBpc0Z1dHVyZSkge1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbc3RyaW5nXTtcclxuICAgICAgICByZXR1cm4gKGlzRnVuY3Rpb24ob3V0cHV0KSkgP1xyXG4gICAgICAgICAgICBvdXRwdXQobnVtYmVyLCB3aXRob3V0U3VmZml4LCBzdHJpbmcsIGlzRnV0dXJlKSA6XHJcbiAgICAgICAgICAgIG91dHB1dC5yZXBsYWNlKC8lZC9pLCBudW1iZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhc3RGdXR1cmUgKGRpZmYsIG91dHB1dCkge1xyXG4gICAgICAgIHZhciBmb3JtYXQgPSB0aGlzLl9yZWxhdGl2ZVRpbWVbZGlmZiA+IDAgPyAnZnV0dXJlJyA6ICdwYXN0J107XHJcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZm9ybWF0KSA/IGZvcm1hdChvdXRwdXQpIDogZm9ybWF0LnJlcGxhY2UoLyVzL2ksIG91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGFsaWFzZXMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRVbml0QWxpYXMgKHVuaXQsIHNob3J0aGFuZCkge1xyXG4gICAgICAgIHZhciBsb3dlckNhc2UgPSB1bml0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgYWxpYXNlc1tsb3dlckNhc2VdID0gYWxpYXNlc1tsb3dlckNhc2UgKyAncyddID0gYWxpYXNlc1tzaG9ydGhhbmRdID0gdW5pdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpemVVbml0cyh1bml0cykge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgdW5pdHMgPT09ICdzdHJpbmcnID8gYWxpYXNlc1t1bml0c10gfHwgYWxpYXNlc1t1bml0cy50b0xvd2VyQ2FzZSgpXSA6IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpemVPYmplY3RVbml0cyhpbnB1dE9iamVjdCkge1xyXG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSB7fSxcclxuICAgICAgICAgICAgbm9ybWFsaXplZFByb3AsXHJcbiAgICAgICAgICAgIHByb3A7XHJcblxyXG4gICAgICAgIGZvciAocHJvcCBpbiBpbnB1dE9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcChpbnB1dE9iamVjdCwgcHJvcCkpIHtcclxuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWRQcm9wID0gbm9ybWFsaXplVW5pdHMocHJvcCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsaXplZFByb3ApIHtcclxuICAgICAgICAgICAgICAgICAgICBub3JtYWxpemVkSW5wdXRbbm9ybWFsaXplZFByb3BdID0gaW5wdXRPYmplY3RbcHJvcF07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBub3JtYWxpemVkSW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHByaW9yaXRpZXMgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRVbml0UHJpb3JpdHkodW5pdCwgcHJpb3JpdHkpIHtcclxuICAgICAgICBwcmlvcml0aWVzW3VuaXRdID0gcHJpb3JpdHk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdGl6ZWRVbml0cyh1bml0c09iaikge1xyXG4gICAgICAgIHZhciB1bml0cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIHUgaW4gdW5pdHNPYmopIHtcclxuICAgICAgICAgICAgdW5pdHMucHVzaCh7dW5pdDogdSwgcHJpb3JpdHk6IHByaW9yaXRpZXNbdV19KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdW5pdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHVuaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHplcm9GaWxsKG51bWJlciwgdGFyZ2V0TGVuZ3RoLCBmb3JjZVNpZ24pIHtcclxuICAgICAgICB2YXIgYWJzTnVtYmVyID0gJycgKyBNYXRoLmFicyhudW1iZXIpLFxyXG4gICAgICAgICAgICB6ZXJvc1RvRmlsbCA9IHRhcmdldExlbmd0aCAtIGFic051bWJlci5sZW5ndGgsXHJcbiAgICAgICAgICAgIHNpZ24gPSBudW1iZXIgPj0gMDtcclxuICAgICAgICByZXR1cm4gKHNpZ24gPyAoZm9yY2VTaWduID8gJysnIDogJycpIDogJy0nKSArXHJcbiAgICAgICAgICAgIE1hdGgucG93KDEwLCBNYXRoLm1heCgwLCB6ZXJvc1RvRmlsbCkpLnRvU3RyaW5nKCkuc3Vic3RyKDEpICsgYWJzTnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBmb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KFtIaF1tbShzcyk/fE1vfE1NP00/TT98RG98REREb3xERD9EP0Q/fGRkZD9kP3xkbz98d1tvfHddP3xXW298V10/fFFvP3xZWVlZWVl8WVlZWVl8WVlZWXxZWXxnZyhnZ2c/KT98R0coR0dHPyk/fGV8RXxhfEF8aGg/fEhIP3xraz98bW0/fHNzP3xTezEsOX18eHxYfHp6P3xaWj98LikvZztcclxuXHJcbiAgICB2YXIgbG9jYWxGb3JtYXR0aW5nVG9rZW5zID0gLyhcXFtbXlxcW10qXFxdKXwoXFxcXCk/KExUU3xMVHxMTD9MP0w/fGx7MSw0fSkvZztcclxuXHJcbiAgICB2YXIgZm9ybWF0RnVuY3Rpb25zID0ge307XHJcblxyXG4gICAgdmFyIGZvcm1hdFRva2VuRnVuY3Rpb25zID0ge307XHJcblxyXG4gICAgLy8gdG9rZW46ICAgICdNJ1xyXG4gICAgLy8gcGFkZGVkOiAgIFsnTU0nLCAyXVxyXG4gICAgLy8gb3JkaW5hbDogICdNbydcclxuICAgIC8vIGNhbGxiYWNrOiBmdW5jdGlvbiAoKSB7IHRoaXMubW9udGgoKSArIDEgfVxyXG4gICAgZnVuY3Rpb24gYWRkRm9ybWF0VG9rZW4gKHRva2VuLCBwYWRkZWQsIG9yZGluYWwsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGZ1bmMgPSBjYWxsYmFjaztcclxuICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBmdW5jID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbY2FsbGJhY2tdKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICBmb3JtYXRUb2tlbkZ1bmN0aW9uc1t0b2tlbl0gPSBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFkZGVkKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW3BhZGRlZFswXV0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gemVyb0ZpbGwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCBwYWRkZWRbMV0sIHBhZGRlZFsyXSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcmRpbmFsKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdFRva2VuRnVuY3Rpb25zW29yZGluYWxdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLm9yZGluYWwoZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpLCB0b2tlbik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUZvcm1hdHRpbmdUb2tlbnMoaW5wdXQpIHtcclxuICAgICAgICBpZiAoaW5wdXQubWF0Y2goL1xcW1tcXHNcXFNdLykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XFxdJC9nLCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbnB1dC5yZXBsYWNlKC9cXFxcL2csICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KSB7XHJcbiAgICAgICAgdmFyIGFycmF5ID0gZm9ybWF0Lm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpLCBpLCBsZW5ndGg7XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXRUb2tlbkZ1bmN0aW9uc1thcnJheVtpXV0pIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2ldID0gZm9ybWF0VG9rZW5GdW5jdGlvbnNbYXJyYXlbaV1dO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYXJyYXlbaV0gPSByZW1vdmVGb3JtYXR0aW5nVG9rZW5zKGFycmF5W2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChtb20pIHtcclxuICAgICAgICAgICAgdmFyIG91dHB1dCA9ICcnLCBpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBpc0Z1bmN0aW9uKGFycmF5W2ldKSA/IGFycmF5W2ldLmNhbGwobW9tLCBmb3JtYXQpIDogYXJyYXlbaV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvcm1hdCBkYXRlIHVzaW5nIG5hdGl2ZSBkYXRlIG9iamVjdFxyXG4gICAgZnVuY3Rpb24gZm9ybWF0TW9tZW50KG0sIGZvcm1hdCkge1xyXG4gICAgICAgIGlmICghbS5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG0ubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3JtYXQgPSBleHBhbmRGb3JtYXQoZm9ybWF0LCBtLmxvY2FsZURhdGEoKSk7XHJcbiAgICAgICAgZm9ybWF0RnVuY3Rpb25zW2Zvcm1hdF0gPSBmb3JtYXRGdW5jdGlvbnNbZm9ybWF0XSB8fCBtYWtlRm9ybWF0RnVuY3Rpb24oZm9ybWF0KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdEZ1bmN0aW9uc1tmb3JtYXRdKG0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdChmb3JtYXQsIGxvY2FsZSkge1xyXG4gICAgICAgIHZhciBpID0gNTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubG9uZ0RhdGVGb3JtYXQoaW5wdXQpIHx8IGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGkgPj0gMCAmJiBsb2NhbEZvcm1hdHRpbmdUb2tlbnMudGVzdChmb3JtYXQpKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKGxvY2FsRm9ybWF0dGluZ1Rva2VucywgcmVwbGFjZUxvbmdEYXRlRm9ybWF0VG9rZW5zKTtcclxuICAgICAgICAgICAgbG9jYWxGb3JtYXR0aW5nVG9rZW5zLmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIGkgLT0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1hdGNoMSAgICAgICAgID0gL1xcZC87ICAgICAgICAgICAgLy8gICAgICAgMCAtIDlcclxuICAgIHZhciBtYXRjaDIgICAgICAgICA9IC9cXGRcXGQvOyAgICAgICAgICAvLyAgICAgIDAwIC0gOTlcclxuICAgIHZhciBtYXRjaDMgICAgICAgICA9IC9cXGR7M30vOyAgICAgICAgIC8vICAgICAwMDAgLSA5OTlcclxuICAgIHZhciBtYXRjaDQgICAgICAgICA9IC9cXGR7NH0vOyAgICAgICAgIC8vICAgIDAwMDAgLSA5OTk5XHJcbiAgICB2YXIgbWF0Y2g2ICAgICAgICAgPSAvWystXT9cXGR7Nn0vOyAgICAvLyAtOTk5OTk5IC0gOTk5OTk5XHJcbiAgICB2YXIgbWF0Y2gxdG8yICAgICAgPSAvXFxkXFxkPy87ICAgICAgICAgLy8gICAgICAgMCAtIDk5XHJcbiAgICB2YXIgbWF0Y2gzdG80ICAgICAgPSAvXFxkXFxkXFxkXFxkPy87ICAgICAvLyAgICAgOTk5IC0gOTk5OVxyXG4gICAgdmFyIG1hdGNoNXRvNiAgICAgID0gL1xcZFxcZFxcZFxcZFxcZFxcZD8vOyAvLyAgIDk5OTk5IC0gOTk5OTk5XHJcbiAgICB2YXIgbWF0Y2gxdG8zICAgICAgPSAvXFxkezEsM30vOyAgICAgICAvLyAgICAgICAwIC0gOTk5XHJcbiAgICB2YXIgbWF0Y2gxdG80ICAgICAgPSAvXFxkezEsNH0vOyAgICAgICAvLyAgICAgICAwIC0gOTk5OVxyXG4gICAgdmFyIG1hdGNoMXRvNiAgICAgID0gL1srLV0/XFxkezEsNn0vOyAgLy8gLTk5OTk5OSAtIDk5OTk5OVxyXG5cclxuICAgIHZhciBtYXRjaFVuc2lnbmVkICA9IC9cXGQrLzsgICAgICAgICAgIC8vICAgICAgIDAgLSBpbmZcclxuICAgIHZhciBtYXRjaFNpZ25lZCAgICA9IC9bKy1dP1xcZCsvOyAgICAgIC8vICAgIC1pbmYgLSBpbmZcclxuXHJcbiAgICB2YXIgbWF0Y2hPZmZzZXQgICAgPSAvWnxbKy1dXFxkXFxkOj9cXGRcXGQvZ2k7IC8vICswMDowMCAtMDA6MDAgKzAwMDAgLTAwMDAgb3IgWlxyXG4gICAgdmFyIG1hdGNoU2hvcnRPZmZzZXQgPSAvWnxbKy1dXFxkXFxkKD86Oj9cXGRcXGQpPy9naTsgLy8gKzAwIC0wMCArMDA6MDAgLTAwOjAwICswMDAwIC0wMDAwIG9yIFpcclxuXHJcbiAgICB2YXIgbWF0Y2hUaW1lc3RhbXAgPSAvWystXT9cXGQrKFxcLlxcZHsxLDN9KT8vOyAvLyAxMjM0NTY3ODkgMTIzNDU2Nzg5LjEyM1xyXG5cclxuICAgIC8vIGFueSB3b3JkIChvciB0d28pIGNoYXJhY3RlcnMgb3IgbnVtYmVycyBpbmNsdWRpbmcgdHdvL3RocmVlIHdvcmQgbW9udGggaW4gYXJhYmljLlxyXG4gICAgLy8gaW5jbHVkZXMgc2NvdHRpc2ggZ2FlbGljIHR3byB3b3JkIGFuZCBoeXBoZW5hdGVkIG1vbnRoc1xyXG4gICAgdmFyIG1hdGNoV29yZCA9IC9bMC05XXswLDI1Nn1bJ2EtelxcdTAwQTAtXFx1MDVGRlxcdTA3MDAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkYwN1xcdUZGMTAtXFx1RkZFRl17MSwyNTZ9fFtcXHUwNjAwLVxcdTA2RkZcXC9dezEsMjU2fShcXHMqP1tcXHUwNjAwLVxcdTA2RkZdezEsMjU2fSl7MSwyfS9pO1xyXG5cclxuICAgIHZhciByZWdleGVzID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUmVnZXhUb2tlbiAodG9rZW4sIHJlZ2V4LCBzdHJpY3RSZWdleCkge1xyXG4gICAgICAgIHJlZ2V4ZXNbdG9rZW5dID0gaXNGdW5jdGlvbihyZWdleCkgPyByZWdleCA6IGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlRGF0YSkge1xyXG4gICAgICAgICAgICByZXR1cm4gKGlzU3RyaWN0ICYmIHN0cmljdFJlZ2V4KSA/IHN0cmljdFJlZ2V4IDogcmVnZXg7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4gKHRva2VuLCBjb25maWcpIHtcclxuICAgICAgICBpZiAoIWhhc093blByb3AocmVnZXhlcywgdG9rZW4pKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHVuZXNjYXBlRm9ybWF0KHRva2VuKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVnZXhlc1t0b2tlbl0oY29uZmlnLl9zdHJpY3QsIGNvbmZpZy5fbG9jYWxlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDb2RlIGZyb20gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zNTYxNDkzL2lzLXRoZXJlLWEtcmVnZXhwLWVzY2FwZS1mdW5jdGlvbi1pbi1qYXZhc2NyaXB0XHJcbiAgICBmdW5jdGlvbiB1bmVzY2FwZUZvcm1hdChzKSB7XHJcbiAgICAgICAgcmV0dXJuIHJlZ2V4RXNjYXBlKHMucmVwbGFjZSgnXFxcXCcsICcnKS5yZXBsYWNlKC9cXFxcKFxcWyl8XFxcXChcXF0pfFxcWyhbXlxcXVxcW10qKVxcXXxcXFxcKC4pL2csIGZ1bmN0aW9uIChtYXRjaGVkLCBwMSwgcDIsIHAzLCBwNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcDEgfHwgcDIgfHwgcDMgfHwgcDQ7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlZ2V4RXNjYXBlKHMpIHtcclxuICAgICAgICByZXR1cm4gcy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdG9rZW5zID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIGksIGZ1bmMgPSBjYWxsYmFjaztcclxuICAgICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0b2tlbiA9IFt0b2tlbl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc051bWJlcihjYWxsYmFjaykpIHtcclxuICAgICAgICAgICAgZnVuYyA9IGZ1bmN0aW9uIChpbnB1dCwgYXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGFycmF5W2NhbGxiYWNrXSA9IHRvSW50KGlucHV0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRva2VuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRva2Vuc1t0b2tlbltpXV0gPSBmdW5jO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRXZWVrUGFyc2VUb2tlbiAodG9rZW4sIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgICAgICBjb25maWcuX3cgPSBjb25maWcuX3cgfHwge307XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGlucHV0LCBjb25maWcuX3csIGNvbmZpZywgdG9rZW4pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZFRpbWVUb0FycmF5RnJvbVRva2VuKHRva2VuLCBpbnB1dCwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwgJiYgaGFzT3duUHJvcCh0b2tlbnMsIHRva2VuKSkge1xyXG4gICAgICAgICAgICB0b2tlbnNbdG9rZW5dKGlucHV0LCBjb25maWcuX2EsIGNvbmZpZywgdG9rZW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgWUVBUiA9IDA7XHJcbiAgICB2YXIgTU9OVEggPSAxO1xyXG4gICAgdmFyIERBVEUgPSAyO1xyXG4gICAgdmFyIEhPVVIgPSAzO1xyXG4gICAgdmFyIE1JTlVURSA9IDQ7XHJcbiAgICB2YXIgU0VDT05EID0gNTtcclxuICAgIHZhciBNSUxMSVNFQ09ORCA9IDY7XHJcbiAgICB2YXIgV0VFSyA9IDc7XHJcbiAgICB2YXIgV0VFS0RBWSA9IDg7XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdZJywgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB5ID0gdGhpcy55ZWFyKCk7XHJcbiAgICAgICAgcmV0dXJuIHkgPD0gOTk5OSA/ICcnICsgeSA6ICcrJyArIHk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy55ZWFyKCkgJSAxMDA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1lZWVknLCAgIDRdLCAgICAgICAwLCAneWVhcicpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydZWVlZWScsICA1XSwgICAgICAgMCwgJ3llYXInKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnWVlZWVlZJywgNiwgdHJ1ZV0sIDAsICd5ZWFyJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygneWVhcicsICd5Jyk7XHJcblxyXG4gICAgLy8gUFJJT1JJVElFU1xyXG5cclxuICAgIGFkZFVuaXRQcmlvcml0eSgneWVhcicsIDEpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdZJywgICAgICBtYXRjaFNpZ25lZCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWScsICAgICBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZJywgICBtYXRjaDF0bzQsIG1hdGNoNCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWScsICBtYXRjaDF0bzYsIG1hdGNoNik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdZWVlZWVknLCBtYXRjaDF0bzYsIG1hdGNoNik7XHJcblxyXG4gICAgYWRkUGFyc2VUb2tlbihbJ1lZWVlZJywgJ1lZWVlZWSddLCBZRUFSKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1lZWVknLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbWUVBUl0gPSBpbnB1dC5sZW5ndGggPT09IDIgPyBob29rcy5wYXJzZVR3b0RpZ2l0WWVhcihpbnB1dCkgOiB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1lZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W1lFQVJdID0gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdZJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W1lFQVJdID0gcGFyc2VJbnQoaW5wdXQsIDEwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhFTFBFUlNcclxuXHJcbiAgICBmdW5jdGlvbiBkYXlzSW5ZZWFyKHllYXIpIHtcclxuICAgICAgICByZXR1cm4gaXNMZWFwWWVhcih5ZWFyKSA/IDM2NiA6IDM2NTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0xlYXBZZWFyKHllYXIpIHtcclxuICAgICAgICByZXR1cm4gKHllYXIgJSA0ID09PSAwICYmIHllYXIgJSAxMDAgIT09IDApIHx8IHllYXIgJSA0MDAgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSE9PS1NcclxuXHJcbiAgICBob29rcy5wYXJzZVR3b0RpZ2l0WWVhciA9IGZ1bmN0aW9uIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiB0b0ludChpbnB1dCkgKyAodG9JbnQoaW5wdXQpID4gNjggPyAxOTAwIDogMjAwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICB2YXIgZ2V0U2V0WWVhciA9IG1ha2VHZXRTZXQoJ0Z1bGxZZWFyJywgdHJ1ZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SXNMZWFwWWVhciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzTGVhcFllYXIodGhpcy55ZWFyKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VHZXRTZXQgKHVuaXQsIGtlZXBUaW1lKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgc2V0JDEodGhpcywgdW5pdCwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaG9va3MudXBkYXRlT2Zmc2V0KHRoaXMsIGtlZXBUaW1lKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldCh0aGlzLCB1bml0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0IChtb20sIHVuaXQpIHtcclxuICAgICAgICByZXR1cm4gbW9tLmlzVmFsaWQoKSA/XHJcbiAgICAgICAgICAgIG1vbS5fZFsnZ2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSgpIDogTmFOO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldCQxIChtb20sIHVuaXQsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKG1vbS5pc1ZhbGlkKCkgJiYgIWlzTmFOKHZhbHVlKSkge1xyXG4gICAgICAgICAgICBpZiAodW5pdCA9PT0gJ0Z1bGxZZWFyJyAmJiBpc0xlYXBZZWFyKG1vbS55ZWFyKCkpICYmIG1vbS5tb250aCgpID09PSAxICYmIG1vbS5kYXRlKCkgPT09IDI5KSB7XHJcbiAgICAgICAgICAgICAgICBtb20uX2RbJ3NldCcgKyAobW9tLl9pc1VUQyA/ICdVVEMnIDogJycpICsgdW5pdF0odmFsdWUsIG1vbS5tb250aCgpLCBkYXlzSW5Nb250aCh2YWx1ZSwgbW9tLm1vbnRoKCkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyB1bml0XSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0cmluZ0dldCAodW5pdHMpIHtcclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuICAgICAgICBpZiAoaXNGdW5jdGlvbih0aGlzW3VuaXRzXSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXNbdW5pdHNdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzdHJpbmdTZXQgKHVuaXRzLCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdW5pdHMgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgIHVuaXRzID0gbm9ybWFsaXplT2JqZWN0VW5pdHModW5pdHMpO1xyXG4gICAgICAgICAgICB2YXIgcHJpb3JpdGl6ZWQgPSBnZXRQcmlvcml0aXplZFVuaXRzKHVuaXRzKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcmlvcml0aXplZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpc1twcmlvcml0aXplZFtpXS51bml0XSh1bml0c1twcmlvcml0aXplZFtpXS51bml0XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odGhpc1t1bml0c10pKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1t1bml0c10odmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vZChuLCB4KSB7XHJcbiAgICAgICAgcmV0dXJuICgobiAlIHgpICsgeCkgJSB4O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBpbmRleE9mO1xyXG5cclxuICAgIGlmIChBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xyXG4gICAgICAgIGluZGV4T2YgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5kZXhPZiA9IGZ1bmN0aW9uIChvKSB7XHJcbiAgICAgICAgICAgIC8vIEkga25vd1xyXG4gICAgICAgICAgICB2YXIgaTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldID09PSBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgICAgICBpZiAoaXNOYU4oeWVhcikgfHwgaXNOYU4obW9udGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtb2RNb250aCA9IG1vZChtb250aCwgMTIpO1xyXG4gICAgICAgIHllYXIgKz0gKG1vbnRoIC0gbW9kTW9udGgpIC8gMTI7XHJcbiAgICAgICAgcmV0dXJuIG1vZE1vbnRoID09PSAxID8gKGlzTGVhcFllYXIoeWVhcikgPyAyOSA6IDI4KSA6ICgzMSAtIG1vZE1vbnRoICUgNyAlIDIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignTScsIFsnTU0nLCAyXSwgJ01vJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vbnRoKCkgKyAxO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ01NTScsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubW9udGhzU2hvcnQodGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdNTU1NJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5tb250aHModGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ21vbnRoJywgJ00nKTtcclxuXHJcbiAgICAvLyBQUklPUklUWVxyXG5cclxuICAgIGFkZFVuaXRQcmlvcml0eSgnbW9udGgnLCA4KTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignTScsICAgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdNTScsICAgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignTU1NJywgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNTaG9ydFJlZ2V4KGlzU3RyaWN0KTtcclxuICAgIH0pO1xyXG4gICAgYWRkUmVnZXhUb2tlbignTU1NTScsIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS5tb250aHNSZWdleChpc1N0cmljdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRQYXJzZVRva2VuKFsnTScsICdNTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gdG9JbnQoaW5wdXQpIC0gMTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZFBhcnNlVG9rZW4oWydNTU0nLCAnTU1NTSddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcsIHRva2VuKSB7XHJcbiAgICAgICAgdmFyIG1vbnRoID0gY29uZmlnLl9sb2NhbGUubW9udGhzUGFyc2UoaW5wdXQsIHRva2VuLCBjb25maWcuX3N0cmljdCk7XHJcbiAgICAgICAgLy8gaWYgd2UgZGlkbid0IGZpbmQgYSBtb250aCBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWQuXHJcbiAgICAgICAgaWYgKG1vbnRoICE9IG51bGwpIHtcclxuICAgICAgICAgICAgYXJyYXlbTU9OVEhdID0gbW9udGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZE1vbnRoID0gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTE9DQUxFU1xyXG5cclxuICAgIHZhciBNT05USFNfSU5fRk9STUFUID0gL0Rbb0RdPyhcXFtbXlxcW1xcXV0qXFxdfFxccykrTU1NTT8vO1xyXG4gICAgdmFyIGRlZmF1bHRMb2NhbGVNb250aHMgPSAnSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlcicuc3BsaXQoJ18nKTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRocyAobSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRocykgPyB0aGlzLl9tb250aHMgOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzWydzdGFuZGFsb25lJ107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRocykgPyB0aGlzLl9tb250aHNbbS5tb250aCgpXSA6XHJcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1sodGhpcy5fbW9udGhzLmlzRm9ybWF0IHx8IE1PTlRIU19JTl9GT1JNQVQpLnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQgPSAnSmFuX0ZlYl9NYXJfQXByX01heV9KdW5fSnVsX0F1Z19TZXBfT2N0X05vdl9EZWMnLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVNb250aHNTaG9ydCAobSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KSA/IHRoaXMuX21vbnRoc1Nob3J0IDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0WydzdGFuZGFsb25lJ107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX21vbnRoc1Nob3J0KSA/IHRoaXMuX21vbnRoc1Nob3J0W20ubW9udGgoKV0gOlxyXG4gICAgICAgICAgICB0aGlzLl9tb250aHNTaG9ydFtNT05USFNfSU5fRk9STUFULnRlc3QoZm9ybWF0KSA/ICdmb3JtYXQnIDogJ3N0YW5kYWxvbmUnXVttLm1vbnRoKCldO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0cmljdFBhcnNlKG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpIHtcclxuICAgICAgICB2YXIgaSwgaWksIG1vbSwgbGxjID0gbW9udGhOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIG5vdCB1c2VkXHJcbiAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydE1vbnRoc1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIGldKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRoc1Nob3J0KG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0gPSB0aGlzLm1vbnRocyhtb20sICcnKS50b0xvY2FsZUxvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RyaWN0KSB7XHJcbiAgICAgICAgICAgIGlmIChmb3JtYXQgPT09ICdNTU0nKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydE1vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX2xvbmdNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnTU1NJykge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRNb250aHNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9sb25nTW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbG9uZ01vbnRoc1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0TW9udGhzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZU1vbnRoc1BhcnNlIChtb250aE5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XHJcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVTdHJpY3RQYXJzZS5jYWxsKHRoaXMsIG1vbnRoTmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9tb250aHNQYXJzZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9sb25nTW9udGhzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvcnRNb250aHNQYXJzZSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETzogYWRkIHNvcnRpbmdcclxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyXHJcbiAgICAgICAgLy8gc2VlIHNvcnRpbmcgaW4gY29tcHV0ZU1vbnRoc1BhcnNlXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcbiAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgaV0pO1xyXG4gICAgICAgICAgICBpZiAoc3RyaWN0ICYmICF0aGlzLl9sb25nTW9udGhzUGFyc2VbaV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvbmdNb250aHNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3J0TW9udGhzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICcnKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXN0cmljdCAmJiAhdGhpcy5fbW9udGhzUGFyc2VbaV0pIHtcclxuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy5tb250aHMobW9tLCAnJykgKyAnfF4nICsgdGhpcy5tb250aHNTaG9ydChtb20sICcnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1BhcnNlW2ldID0gbmV3IFJlZ0V4cChyZWdleC5yZXBsYWNlKCcuJywgJycpLCAnaScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRlc3QgdGhlIHJlZ2V4XHJcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnTU1NTScgJiYgdGhpcy5fbG9uZ01vbnRoc1BhcnNlW2ldLnRlc3QobW9udGhOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ01NTScgJiYgdGhpcy5fc2hvcnRNb250aHNQYXJzZVtpXS50ZXN0KG1vbnRoTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fbW9udGhzUGFyc2VbaV0udGVzdChtb250aE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0TW9udGggKG1vbSwgdmFsdWUpIHtcclxuICAgICAgICB2YXIgZGF5T2ZNb250aDtcclxuXHJcbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIG9wXHJcbiAgICAgICAgICAgIHJldHVybiBtb207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoL15cXGQrJC8udGVzdCh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlID0gdG9JbnQodmFsdWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBtb20ubG9jYWxlRGF0YSgpLm1vbnRoc1BhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IEFub3RoZXIgc2lsZW50IGZhaWx1cmU/XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb207XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRheU9mTW9udGggPSBNYXRoLm1pbihtb20uZGF0ZSgpLCBkYXlzSW5Nb250aChtb20ueWVhcigpLCB2YWx1ZSkpO1xyXG4gICAgICAgIG1vbS5fZFsnc2V0JyArIChtb20uX2lzVVRDID8gJ1VUQycgOiAnJykgKyAnTW9udGgnXSh2YWx1ZSwgZGF5T2ZNb250aCk7XHJcbiAgICAgICAgcmV0dXJuIG1vbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRNb250aCAodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzZXRNb250aCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdldCh0aGlzLCAnTW9udGgnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0RGF5c0luTW9udGggKCkge1xyXG4gICAgICAgIHJldHVybiBkYXlzSW5Nb250aCh0aGlzLnllYXIoKSwgdGhpcy5tb250aCgpKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdE1vbnRoc1Nob3J0UmVnZXggPSBtYXRjaFdvcmQ7XHJcbiAgICBmdW5jdGlvbiBtb250aHNTaG9ydFJlZ2V4IChpc1N0cmljdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9tb250aHNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1JlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVNb250aHNQYXJzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU2hvcnRSZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX21vbnRoc1Nob3J0UmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU2hvcnRSZWdleCA9IGRlZmF1bHRNb250aHNTaG9ydFJlZ2V4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cclxuICAgICAgICAgICAgICAgIHRoaXMuX21vbnRoc1Nob3J0U3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNTaG9ydFJlZ2V4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdE1vbnRoc1JlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gbW9udGhzUmVnZXggKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX21vbnRoc1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfbW9udGhzUmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZU1vbnRoc1BhcnNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzUmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ19tb250aHNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tb250aHNSZWdleCA9IGRlZmF1bHRNb250aHNSZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggOiB0aGlzLl9tb250aHNSZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcHV0ZU1vbnRoc1BhcnNlICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzaG9ydFBpZWNlcyA9IFtdLCBsb25nUGllY2VzID0gW10sIG1peGVkUGllY2VzID0gW10sXHJcbiAgICAgICAgICAgIGksIG1vbTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgMTI7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcclxuICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCBpXSk7XHJcbiAgICAgICAgICAgIHNob3J0UGllY2VzLnB1c2godGhpcy5tb250aHNTaG9ydChtb20sICcnKSk7XHJcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaCh0aGlzLm1vbnRocyhtb20sICcnKSk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2godGhpcy5tb250aHMobW9tLCAnJykpO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlcy5wdXNoKHRoaXMubW9udGhzU2hvcnQobW9tLCAnJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTb3J0aW5nIG1ha2VzIHN1cmUgaWYgb25lIG1vbnRoIChvciBhYmJyKSBpcyBhIHByZWZpeCBvZiBhbm90aGVyIGl0XHJcbiAgICAgICAgLy8gd2lsbCBtYXRjaCB0aGUgbG9uZ2VyIHBpZWNlLlxyXG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDEyOyBpKyspIHtcclxuICAgICAgICAgICAgc2hvcnRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShzaG9ydFBpZWNlc1tpXSk7XHJcbiAgICAgICAgICAgIGxvbmdQaWVjZXNbaV0gPSByZWdleEVzY2FwZShsb25nUGllY2VzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDI0OyBpKyspIHtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXNbaV0gPSByZWdleEVzY2FwZShtaXhlZFBpZWNlc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9tb250aHNSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIG1peGVkUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFJlZ2V4ID0gdGhpcy5fbW9udGhzUmVnZXg7XHJcbiAgICAgICAgdGhpcy5fbW9udGhzU3RyaWN0UmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBsb25nUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl9tb250aHNTaG9ydFN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgc2hvcnRQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZURhdGUgKHksIG0sIGQsIGgsIE0sIHMsIG1zKSB7XHJcbiAgICAgICAgLy8gY2FuJ3QganVzdCBhcHBseSgpIHRvIGNyZWF0ZSBhIGRhdGU6XHJcbiAgICAgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xLzE4MTM0OFxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoeSwgbSwgZCwgaCwgTSwgcywgbXMpO1xyXG5cclxuICAgICAgICAvLyB0aGUgZGF0ZSBjb25zdHJ1Y3RvciByZW1hcHMgeWVhcnMgMC05OSB0byAxOTAwLTE5OTlcclxuICAgICAgICBpZiAoeSA8IDEwMCAmJiB5ID49IDAgJiYgaXNGaW5pdGUoZGF0ZS5nZXRGdWxsWWVhcigpKSkge1xyXG4gICAgICAgICAgICBkYXRlLnNldEZ1bGxZZWFyKHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVVVENEYXRlICh5KSB7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQy5hcHBseShudWxsLCBhcmd1bWVudHMpKTtcclxuXHJcbiAgICAgICAgLy8gdGhlIERhdGUuVVRDIGZ1bmN0aW9uIHJlbWFwcyB5ZWFycyAwLTk5IHRvIDE5MDAtMTk5OVxyXG4gICAgICAgIGlmICh5IDwgMTAwICYmIHkgPj0gMCAmJiBpc0Zpbml0ZShkYXRlLmdldFVUQ0Z1bGxZZWFyKCkpKSB7XHJcbiAgICAgICAgICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHN0YXJ0LW9mLWZpcnN0LXdlZWsgLSBzdGFydC1vZi15ZWFyXHJcbiAgICBmdW5jdGlvbiBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgLy8gZmlyc3Qtd2VlayBkYXkgLS0gd2hpY2ggamFudWFyeSBpcyBhbHdheXMgaW4gdGhlIGZpcnN0IHdlZWsgKDQgZm9yIGlzbywgMSBmb3Igb3RoZXIpXHJcbiAgICAgICAgICAgIGZ3ZCA9IDcgKyBkb3cgLSBkb3ksXHJcbiAgICAgICAgICAgIC8vIGZpcnN0LXdlZWsgZGF5IGxvY2FsIHdlZWtkYXkgLS0gd2hpY2ggbG9jYWwgd2Vla2RheSBpcyBmd2RcclxuICAgICAgICAgICAgZndkbHcgPSAoNyArIGNyZWF0ZVVUQ0RhdGUoeWVhciwgMCwgZndkKS5nZXRVVENEYXkoKSAtIGRvdykgJSA3O1xyXG5cclxuICAgICAgICByZXR1cm4gLWZ3ZGx3ICsgZndkIC0gMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fd2Vla19kYXRlI0NhbGN1bGF0aW5nX2FfZGF0ZV9naXZlbl90aGVfeWVhci4yQ193ZWVrX251bWJlcl9hbmRfd2Vla2RheVxyXG4gICAgZnVuY3Rpb24gZGF5T2ZZZWFyRnJvbVdlZWtzKHllYXIsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIGxvY2FsV2Vla2RheSA9ICg3ICsgd2Vla2RheSAtIGRvdykgJSA3LFxyXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0ID0gZmlyc3RXZWVrT2Zmc2V0KHllYXIsIGRvdywgZG95KSxcclxuICAgICAgICAgICAgZGF5T2ZZZWFyID0gMSArIDcgKiAod2VlayAtIDEpICsgbG9jYWxXZWVrZGF5ICsgd2Vla09mZnNldCxcclxuICAgICAgICAgICAgcmVzWWVhciwgcmVzRGF5T2ZZZWFyO1xyXG5cclxuICAgICAgICBpZiAoZGF5T2ZZZWFyIDw9IDApIHtcclxuICAgICAgICAgICAgcmVzWWVhciA9IHllYXIgLSAxO1xyXG4gICAgICAgICAgICByZXNEYXlPZlllYXIgPSBkYXlzSW5ZZWFyKHJlc1llYXIpICsgZGF5T2ZZZWFyO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGF5T2ZZZWFyID4gZGF5c0luWWVhcih5ZWFyKSkge1xyXG4gICAgICAgICAgICByZXNZZWFyID0geWVhciArIDE7XHJcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhciAtIGRheXNJblllYXIoeWVhcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzWWVhciA9IHllYXI7XHJcbiAgICAgICAgICAgIHJlc0RheU9mWWVhciA9IGRheU9mWWVhcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXIsXHJcbiAgICAgICAgICAgIGRheU9mWWVhcjogcmVzRGF5T2ZZZWFyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3ZWVrT2ZZZWFyKG1vbSwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgd2Vla09mZnNldCA9IGZpcnN0V2Vla09mZnNldChtb20ueWVhcigpLCBkb3csIGRveSksXHJcbiAgICAgICAgICAgIHdlZWsgPSBNYXRoLmZsb29yKChtb20uZGF5T2ZZZWFyKCkgLSB3ZWVrT2Zmc2V0IC0gMSkgLyA3KSArIDEsXHJcbiAgICAgICAgICAgIHJlc1dlZWssIHJlc1llYXI7XHJcblxyXG4gICAgICAgIGlmICh3ZWVrIDwgMSkge1xyXG4gICAgICAgICAgICByZXNZZWFyID0gbW9tLnllYXIoKSAtIDE7XHJcbiAgICAgICAgICAgIHJlc1dlZWsgPSB3ZWVrICsgd2Vla3NJblllYXIocmVzWWVhciwgZG93LCBkb3kpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2VlayA+IHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KSkge1xyXG4gICAgICAgICAgICByZXNXZWVrID0gd2VlayAtIHdlZWtzSW5ZZWFyKG1vbS55ZWFyKCksIGRvdywgZG95KTtcclxuICAgICAgICAgICAgcmVzWWVhciA9IG1vbS55ZWFyKCkgKyAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc1llYXIgPSBtb20ueWVhcigpO1xyXG4gICAgICAgICAgICByZXNXZWVrID0gd2VlaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdlZWs6IHJlc1dlZWssXHJcbiAgICAgICAgICAgIHllYXI6IHJlc1llYXJcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHdlZWtzSW5ZZWFyKHllYXIsIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIHdlZWtPZmZzZXQgPSBmaXJzdFdlZWtPZmZzZXQoeWVhciwgZG93LCBkb3kpLFxyXG4gICAgICAgICAgICB3ZWVrT2Zmc2V0TmV4dCA9IGZpcnN0V2Vla09mZnNldCh5ZWFyICsgMSwgZG93LCBkb3kpO1xyXG4gICAgICAgIHJldHVybiAoZGF5c0luWWVhcih5ZWFyKSAtIHdlZWtPZmZzZXQgKyB3ZWVrT2Zmc2V0TmV4dCkgLyA3O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigndycsIFsnd3cnLCAyXSwgJ3dvJywgJ3dlZWsnKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCdXJywgWydXVycsIDJdLCAnV28nLCAnaXNvV2VlaycpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ3dlZWsnLCAndycpO1xyXG4gICAgYWRkVW5pdEFsaWFzKCdpc29XZWVrJywgJ1cnKTtcclxuXHJcbiAgICAvLyBQUklPUklUSUVTXHJcblxyXG4gICAgYWRkVW5pdFByaW9yaXR5KCd3ZWVrJywgNSk7XHJcbiAgICBhZGRVbml0UHJpb3JpdHkoJ2lzb1dlZWsnLCA1KTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbigndycsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignd3cnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdXJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdXVycsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ3cnLCAnd3cnLCAnVycsICdXVyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAxKV0gPSB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBIRUxQRVJTXHJcblxyXG4gICAgLy8gTE9DQUxFU1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZVdlZWsgKG1vbSkge1xyXG4gICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKG1vbSwgdGhpcy5fd2Vlay5kb3csIHRoaXMuX3dlZWsuZG95KS53ZWVrO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2VlayA9IHtcclxuICAgICAgICBkb3cgOiAwLCAvLyBTdW5kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgICAgICBkb3kgOiA2ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiAxc3QgaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZUZpcnN0RGF5T2ZXZWVrICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2Vlay5kb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlRmlyc3REYXlPZlllYXIgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl93ZWVrLmRveTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2VlayAoaW5wdXQpIHtcclxuICAgICAgICB2YXIgd2VlayA9IHRoaXMubG9jYWxlRGF0YSgpLndlZWsodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWsgKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIHdlZWsgPSB3ZWVrT2ZZZWFyKHRoaXMsIDEsIDQpLndlZWs7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0ID09IG51bGwgPyB3ZWVrIDogdGhpcy5hZGQoKGlucHV0IC0gd2VlaykgKiA3LCAnZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZCcsIDAsICdkbycsICdkYXknKTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZGQnLCAwLCAwLCBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLndlZWtkYXlzTWluKHRoaXMsIGZvcm1hdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZGRkJywgMCwgMCwgZnVuY3Rpb24gKGZvcm1hdCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS53ZWVrZGF5c1Nob3J0KHRoaXMsIGZvcm1hdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignZGRkZCcsIDAsIDAsIGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkud2Vla2RheXModGhpcywgZm9ybWF0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdlJywgMCwgMCwgJ3dlZWtkYXknKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCdFJywgMCwgMCwgJ2lzb1dlZWtkYXknKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdkYXknLCAnZCcpO1xyXG4gICAgYWRkVW5pdEFsaWFzKCd3ZWVrZGF5JywgJ2UnKTtcclxuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla2RheScsICdFJyk7XHJcblxyXG4gICAgLy8gUFJJT1JJVFlcclxuICAgIGFkZFVuaXRQcmlvcml0eSgnZGF5JywgMTEpO1xyXG4gICAgYWRkVW5pdFByaW9yaXR5KCd3ZWVrZGF5JywgMTEpO1xyXG4gICAgYWRkVW5pdFByaW9yaXR5KCdpc29XZWVrZGF5JywgMTEpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdkJywgICAgbWF0Y2gxdG8yKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2UnLCAgICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignRScsICAgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdkZCcsICAgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbG9jYWxlLndlZWtkYXlzTWluUmVnZXgoaXNTdHJpY3QpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdkZGQnLCAgIGZ1bmN0aW9uIChpc1N0cmljdCwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZS53ZWVrZGF5c1Nob3J0UmVnZXgoaXNTdHJpY3QpO1xyXG4gICAgfSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdkZGRkJywgICBmdW5jdGlvbiAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNSZWdleChpc1N0cmljdCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2RkJywgJ2RkZCcsICdkZGRkJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHZhciB3ZWVrZGF5ID0gY29uZmlnLl9sb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCwgdG9rZW4sIGNvbmZpZy5fc3RyaWN0KTtcclxuICAgICAgICAvLyBpZiB3ZSBkaWRuJ3QgZ2V0IGEgd2Vla2RheSBuYW1lLCBtYXJrIHRoZSBkYXRlIGFzIGludmFsaWRcclxuICAgICAgICBpZiAod2Vla2RheSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHdlZWsuZCA9IHdlZWtkYXk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZFdlZWtkYXkgPSBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2QnLCAnZScsICdFJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHdlZWtbdG9rZW5dID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSEVMUEVSU1xyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlV2Vla2RheShpbnB1dCwgbG9jYWxlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc05hTihpbnB1dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGlucHV0LCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnB1dCA9IGxvY2FsZS53ZWVrZGF5c1BhcnNlKGlucHV0KTtcclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUlzb1dlZWtkYXkoaW5wdXQsIGxvY2FsZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXNQYXJzZShpbnB1dCkgJSA3IHx8IDc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc05hTihpbnB1dCkgPyBudWxsIDogaW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTE9DQUxFU1xyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXMgPSAnU3VuZGF5X01vbmRheV9UdWVzZGF5X1dlZG5lc2RheV9UaHVyc2RheV9GcmlkYXlfU2F0dXJkYXknLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5cyAobSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKCFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX3dlZWtkYXlzKSA/IHRoaXMuX3dlZWtkYXlzIDpcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzWydzdGFuZGFsb25lJ107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuX3dlZWtkYXlzKSA/IHRoaXMuX3dlZWtkYXlzW20uZGF5KCldIDpcclxuICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNbdGhpcy5fd2Vla2RheXMuaXNGb3JtYXQudGVzdChmb3JtYXQpID8gJ2Zvcm1hdCcgOiAnc3RhbmRhbG9uZSddW20uZGF5KCldO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydCA9ICdTdW5fTW9uX1R1ZV9XZWRfVGh1X0ZyaV9TYXQnLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c1Nob3J0IChtKSB7XHJcbiAgICAgICAgcmV0dXJuIChtKSA/IHRoaXMuX3dlZWtkYXlzU2hvcnRbbS5kYXkoKV0gOiB0aGlzLl93ZWVrZGF5c1Nob3J0O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0TG9jYWxlV2Vla2RheXNNaW4gPSAnU3VfTW9fVHVfV2VfVGhfRnJfU2EnLnNwbGl0KCdfJyk7XHJcbiAgICBmdW5jdGlvbiBsb2NhbGVXZWVrZGF5c01pbiAobSkge1xyXG4gICAgICAgIHJldHVybiAobSkgPyB0aGlzLl93ZWVrZGF5c01pblttLmRheSgpXSA6IHRoaXMuX3dlZWtkYXlzTWluO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0cmljdFBhcnNlJDEod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XHJcbiAgICAgICAgdmFyIGksIGlpLCBtb20sIGxsYyA9IHdlZWtkYXlOYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2UgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyArK2kpIHtcclxuICAgICAgICAgICAgICAgIG1vbSA9IGNyZWF0ZVVUQyhbMjAwMCwgMV0pLmRheShpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzTWluKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykudG9Mb2NhbGVMb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSB0aGlzLndlZWtkYXlzKG1vbSwgJycpLnRvTG9jYWxlTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdHJpY3QpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm1hdCA9PT0gJ2RkZGQnKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlpICE9PSAtMSA/IGlpIDogbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChmb3JtYXQgPT09ICdkZGQnKSB7XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoZm9ybWF0ID09PSAnZGRkZCcpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3dlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2RkZCcpIHtcclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX21pbldlZWtkYXlzUGFyc2UsIGxsYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWkgIT09IC0xID8gaWkgOiBudWxsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWkgPSBpbmRleE9mLmNhbGwodGhpcy5fbWluV2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpaSA9IGluZGV4T2YuY2FsbCh0aGlzLl93ZWVrZGF5c1BhcnNlLCBsbGMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlpID0gaW5kZXhPZi5jYWxsKHRoaXMuX3Nob3J0V2Vla2RheXNQYXJzZSwgbGxjKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpaSAhPT0gLTEgPyBpaSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9jYWxlV2Vla2RheXNQYXJzZSAod2Vla2RheU5hbWUsIGZvcm1hdCwgc3RyaWN0KSB7XHJcbiAgICAgICAgdmFyIGksIG1vbSwgcmVnZXg7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZVN0cmljdFBhcnNlJDEuY2FsbCh0aGlzLCB3ZWVrZGF5TmFtZSwgZm9ybWF0LCBzdHJpY3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl93ZWVrZGF5c1BhcnNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fbWluV2Vla2RheXNQYXJzZSA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9ydFdlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5fZnVsbFdlZWtkYXlzUGFyc2UgPSBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcmVnZXggaWYgd2UgZG9uJ3QgaGF2ZSBpdCBhbHJlYWR5XHJcblxyXG4gICAgICAgICAgICBtb20gPSBjcmVhdGVVVEMoWzIwMDAsIDFdKS5kYXkoaSk7XHJcbiAgICAgICAgICAgIGlmIChzdHJpY3QgJiYgIXRoaXMuX2Z1bGxXZWVrZGF5c1BhcnNlW2ldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXSA9IG5ldyBSZWdFeHAoJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKS5yZXBsYWNlKCcuJywgJ1xcXFwuPycpICsgJyQnLCAnaScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldID0gbmV3IFJlZ0V4cCgnXicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykucmVwbGFjZSgnLicsICdcXFxcLj8nKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKCdeJyArIHRoaXMud2Vla2RheXNNaW4obW9tLCAnJykucmVwbGFjZSgnLicsICdcXFxcLj8nKSArICckJywgJ2knKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3dlZWtkYXlzUGFyc2VbaV0pIHtcclxuICAgICAgICAgICAgICAgIHJlZ2V4ID0gJ14nICsgdGhpcy53ZWVrZGF5cyhtb20sICcnKSArICd8XicgKyB0aGlzLndlZWtkYXlzU2hvcnQobW9tLCAnJykgKyAnfF4nICsgdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzUGFyc2VbaV0gPSBuZXcgUmVnRXhwKHJlZ2V4LnJlcGxhY2UoJy4nLCAnJyksICdpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGVzdCB0aGUgcmVnZXhcclxuICAgICAgICAgICAgaWYgKHN0cmljdCAmJiBmb3JtYXQgPT09ICdkZGRkJyAmJiB0aGlzLl9mdWxsV2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyaWN0ICYmIGZvcm1hdCA9PT0gJ2RkZCcgJiYgdGhpcy5fc2hvcnRXZWVrZGF5c1BhcnNlW2ldLnRlc3Qod2Vla2RheU5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdHJpY3QgJiYgZm9ybWF0ID09PSAnZGQnICYmIHRoaXMuX21pbldlZWtkYXlzUGFyc2VbaV0udGVzdCh3ZWVrZGF5TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFzdHJpY3QgJiYgdGhpcy5fd2Vla2RheXNQYXJzZVtpXS50ZXN0KHdlZWtkYXlOYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldERheU9mV2VlayAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRheSA9IHRoaXMuX2lzVVRDID8gdGhpcy5fZC5nZXRVVENEYXkoKSA6IHRoaXMuX2QuZ2V0RGF5KCk7XHJcbiAgICAgICAgaWYgKGlucHV0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaW5wdXQgPSBwYXJzZVdlZWtkYXkoaW5wdXQsIHRoaXMubG9jYWxlRGF0YSgpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkKGlucHV0IC0gZGF5LCAnZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldExvY2FsZURheU9mV2VlayAoaW5wdXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dCAhPSBudWxsID8gdGhpcyA6IE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHdlZWtkYXkgPSAodGhpcy5kYXkoKSArIDcgLSB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3cpICUgNztcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IHdlZWtkYXkgOiB0aGlzLmFkZChpbnB1dCAtIHdlZWtkYXksICdkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0SVNPRGF5T2ZXZWVrIChpbnB1dCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYmVoYXZlcyB0aGUgc2FtZSBhcyBtb21lbnQjZGF5IGV4Y2VwdFxyXG4gICAgICAgIC8vIGFzIGEgZ2V0dGVyLCByZXR1cm5zIDcgaW5zdGVhZCBvZiAwICgxLTcgcmFuZ2UgaW5zdGVhZCBvZiAwLTYpXHJcbiAgICAgICAgLy8gYXMgYSBzZXR0ZXIsIHN1bmRheSBzaG91bGQgYmVsb25nIHRvIHRoZSBwcmV2aW91cyB3ZWVrLlxyXG5cclxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgd2Vla2RheSA9IHBhcnNlSXNvV2Vla2RheShpbnB1dCwgdGhpcy5sb2NhbGVEYXRhKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXkodGhpcy5kYXkoKSAlIDcgPyB3ZWVrZGF5IDogd2Vla2RheSAtIDcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRheSgpIHx8IDc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0V2Vla2RheXNSZWdleCA9IG1hdGNoV29yZDtcclxuICAgIGZ1bmN0aW9uIHdlZWtkYXlzUmVnZXggKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3dlZWtkYXlzUGFyc2VFeGFjdCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1JlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIGNvbXB1dGVXZWVrZGF5c1BhcnNlLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzU3RyaWN0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1JlZ2V4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c1JlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzUmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU3RyaWN0UmVnZXggJiYgaXNTdHJpY3QgP1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzUmVnZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBkZWZhdWx0V2Vla2RheXNTaG9ydFJlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gd2Vla2RheXNTaG9ydFJlZ2V4IChpc1N0cmljdCkge1xyXG4gICAgICAgIGlmICh0aGlzLl93ZWVrZGF5c1BhcnNlRXhhY3QpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNPd25Qcm9wKHRoaXMsICdfd2Vla2RheXNSZWdleCcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wdXRlV2Vla2RheXNQYXJzZS5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmljdCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c1Nob3J0UmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c1Nob3J0UmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gZGVmYXVsdFdlZWtkYXlzU2hvcnRSZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNTaG9ydFN0cmljdFJlZ2V4ICYmIGlzU3RyaWN0ID9cclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCA6IHRoaXMuX3dlZWtkYXlzU2hvcnRSZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGRlZmF1bHRXZWVrZGF5c01pblJlZ2V4ID0gbWF0Y2hXb3JkO1xyXG4gICAgZnVuY3Rpb24gd2Vla2RheXNNaW5SZWdleCAoaXNTdHJpY3QpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2Vla2RheXNQYXJzZUV4YWN0KSB7XHJcbiAgICAgICAgICAgIGlmICghaGFzT3duUHJvcCh0aGlzLCAnX3dlZWtkYXlzUmVnZXgnKSkge1xyXG4gICAgICAgICAgICAgICAgY29tcHV0ZVdlZWtkYXlzUGFyc2UuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpY3QpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlZWtkYXlzTWluUmVnZXg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoIWhhc093blByb3AodGhpcywgJ193ZWVrZGF5c01pblJlZ2V4JykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3dlZWtkYXlzTWluUmVnZXggPSBkZWZhdWx0V2Vla2RheXNNaW5SZWdleDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2Vla2RheXNNaW5TdHJpY3RSZWdleCAmJiBpc1N0cmljdCA/XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4IDogdGhpcy5fd2Vla2RheXNNaW5SZWdleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXB1dGVXZWVrZGF5c1BhcnNlICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBjbXBMZW5SZXYoYSwgYikge1xyXG4gICAgICAgICAgICByZXR1cm4gYi5sZW5ndGggLSBhLmxlbmd0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBtaW5QaWVjZXMgPSBbXSwgc2hvcnRQaWVjZXMgPSBbXSwgbG9uZ1BpZWNlcyA9IFtdLCBtaXhlZFBpZWNlcyA9IFtdLFxyXG4gICAgICAgICAgICBpLCBtb20sIG1pbnAsIHNob3J0cCwgbG9uZ3A7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICAvLyBtYWtlIHRoZSByZWdleCBpZiB3ZSBkb24ndCBoYXZlIGl0IGFscmVhZHlcclxuICAgICAgICAgICAgbW9tID0gY3JlYXRlVVRDKFsyMDAwLCAxXSkuZGF5KGkpO1xyXG4gICAgICAgICAgICBtaW5wID0gdGhpcy53ZWVrZGF5c01pbihtb20sICcnKTtcclxuICAgICAgICAgICAgc2hvcnRwID0gdGhpcy53ZWVrZGF5c1Nob3J0KG1vbSwgJycpO1xyXG4gICAgICAgICAgICBsb25ncCA9IHRoaXMud2Vla2RheXMobW9tLCAnJyk7XHJcbiAgICAgICAgICAgIG1pblBpZWNlcy5wdXNoKG1pbnApO1xyXG4gICAgICAgICAgICBzaG9ydFBpZWNlcy5wdXNoKHNob3J0cCk7XHJcbiAgICAgICAgICAgIGxvbmdQaWVjZXMucHVzaChsb25ncCk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2gobWlucCk7XHJcbiAgICAgICAgICAgIG1peGVkUGllY2VzLnB1c2goc2hvcnRwKTtcclxuICAgICAgICAgICAgbWl4ZWRQaWVjZXMucHVzaChsb25ncCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNvcnRpbmcgbWFrZXMgc3VyZSBpZiBvbmUgd2Vla2RheSAob3IgYWJicikgaXMgYSBwcmVmaXggb2YgYW5vdGhlciBpdFxyXG4gICAgICAgIC8vIHdpbGwgbWF0Y2ggdGhlIGxvbmdlciBwaWVjZS5cclxuICAgICAgICBtaW5QaWVjZXMuc29ydChjbXBMZW5SZXYpO1xyXG4gICAgICAgIHNob3J0UGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBsb25nUGllY2VzLnNvcnQoY21wTGVuUmV2KTtcclxuICAgICAgICBtaXhlZFBpZWNlcy5zb3J0KGNtcExlblJldik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDc7IGkrKykge1xyXG4gICAgICAgICAgICBzaG9ydFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKHNob3J0UGllY2VzW2ldKTtcclxuICAgICAgICAgICAgbG9uZ1BpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKGxvbmdQaWVjZXNbaV0pO1xyXG4gICAgICAgICAgICBtaXhlZFBpZWNlc1tpXSA9IHJlZ2V4RXNjYXBlKG1peGVkUGllY2VzW2ldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzUmVnZXggPSBuZXcgUmVnRXhwKCdeKCcgKyBtaXhlZFBpZWNlcy5qb2luKCd8JykgKyAnKScsICdpJyk7XHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTaG9ydFJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcclxuICAgICAgICB0aGlzLl93ZWVrZGF5c01pblJlZ2V4ID0gdGhpcy5fd2Vla2RheXNSZWdleDtcclxuXHJcbiAgICAgICAgdGhpcy5fd2Vla2RheXNTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIGxvbmdQaWVjZXMuam9pbignfCcpICsgJyknLCAnaScpO1xyXG4gICAgICAgIHRoaXMuX3dlZWtkYXlzU2hvcnRTdHJpY3RSZWdleCA9IG5ldyBSZWdFeHAoJ14oJyArIHNob3J0UGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgICAgICB0aGlzLl93ZWVrZGF5c01pblN0cmljdFJlZ2V4ID0gbmV3IFJlZ0V4cCgnXignICsgbWluUGllY2VzLmpvaW4oJ3wnKSArICcpJywgJ2knKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgZnVuY3Rpb24gaEZvcm1hdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpICUgMTIgfHwgMTI7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24ga0Zvcm1hdCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ob3VycygpIHx8IDI0O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdIJywgWydISCcsIDJdLCAwLCAnaG91cicpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2gnLCBbJ2hoJywgMl0sIDAsIGhGb3JtYXQpO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ2snLCBbJ2trJywgMl0sIDAsIGtGb3JtYXQpO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdobW0nLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgaEZvcm1hdC5hcHBseSh0aGlzKSArIHplcm9GaWxsKHRoaXMubWludXRlcygpLCAyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdobW1zcycsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJycgKyBoRm9ybWF0LmFwcGx5KHRoaXMpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcclxuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0htbScsIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gJycgKyB0aGlzLmhvdXJzKCkgKyB6ZXJvRmlsbCh0aGlzLm1pbnV0ZXMoKSwgMik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbignSG1tc3MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuICcnICsgdGhpcy5ob3VycygpICsgemVyb0ZpbGwodGhpcy5taW51dGVzKCksIDIpICtcclxuICAgICAgICAgICAgemVyb0ZpbGwodGhpcy5zZWNvbmRzKCksIDIpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gbWVyaWRpZW0gKHRva2VuLCBsb3dlcmNhc2UpIHtcclxuICAgICAgICBhZGRGb3JtYXRUb2tlbih0b2tlbiwgMCwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2NhbGVEYXRhKCkubWVyaWRpZW0odGhpcy5ob3VycygpLCB0aGlzLm1pbnV0ZXMoKSwgbG93ZXJjYXNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBtZXJpZGllbSgnYScsIHRydWUpO1xyXG4gICAgbWVyaWRpZW0oJ0EnLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnaG91cicsICdoJyk7XHJcblxyXG4gICAgLy8gUFJJT1JJVFlcclxuICAgIGFkZFVuaXRQcmlvcml0eSgnaG91cicsIDEzKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgZnVuY3Rpb24gbWF0Y2hNZXJpZGllbSAoaXNTdHJpY3QsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUuX21lcmlkaWVtUGFyc2U7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignYScsICBtYXRjaE1lcmlkaWVtKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0EnLCAgbWF0Y2hNZXJpZGllbSk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdIJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdoJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdrJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdISCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2hoJywgbWF0Y2gxdG8yLCBtYXRjaDIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbigna2snLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignaG1tJywgbWF0Y2gzdG80KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2htbXNzJywgbWF0Y2g1dG82KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0htbScsIG1hdGNoM3RvNCk7XHJcbiAgICBhZGRSZWdleFRva2VuKCdIbW1zcycsIG1hdGNoNXRvNik7XHJcblxyXG4gICAgYWRkUGFyc2VUb2tlbihbJ0gnLCAnSEgnXSwgSE9VUik7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnaycsICdrayddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICB2YXIga0lucHV0ID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0ga0lucHV0ID09PSAyNCA/IDAgOiBrSW5wdXQ7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydhJywgJ0EnXSwgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9pc1BtID0gY29uZmlnLl9sb2NhbGUuaXNQTShpbnB1dCk7XHJcbiAgICAgICAgY29uZmlnLl9tZXJpZGllbSA9IGlucHV0O1xyXG4gICAgfSk7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnaCcsICdoaCddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBhcnJheVtIT1VSXSA9IHRvSW50KGlucHV0KTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignaG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XHJcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XHJcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignaG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XHJcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcclxuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcclxuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignSG1tJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGlucHV0Lmxlbmd0aCAtIDI7XHJcbiAgICAgICAgYXJyYXlbSE9VUl0gPSB0b0ludChpbnB1dC5zdWJzdHIoMCwgcG9zKSk7XHJcbiAgICAgICAgYXJyYXlbTUlOVVRFXSA9IHRvSW50KGlucHV0LnN1YnN0cihwb3MpKTtcclxuICAgIH0pO1xyXG4gICAgYWRkUGFyc2VUb2tlbignSG1tc3MnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICB2YXIgcG9zMSA9IGlucHV0Lmxlbmd0aCAtIDQ7XHJcbiAgICAgICAgdmFyIHBvczIgPSBpbnB1dC5sZW5ndGggLSAyO1xyXG4gICAgICAgIGFycmF5W0hPVVJdID0gdG9JbnQoaW5wdXQuc3Vic3RyKDAsIHBvczEpKTtcclxuICAgICAgICBhcnJheVtNSU5VVEVdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczEsIDIpKTtcclxuICAgICAgICBhcnJheVtTRUNPTkRdID0gdG9JbnQoaW5wdXQuc3Vic3RyKHBvczIpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIExPQ0FMRVNcclxuXHJcbiAgICBmdW5jdGlvbiBsb2NhbGVJc1BNIChpbnB1dCkge1xyXG4gICAgICAgIC8vIElFOCBRdWlya3MgTW9kZSAmIElFNyBTdGFuZGFyZHMgTW9kZSBkbyBub3QgYWxsb3cgYWNjZXNzaW5nIHN0cmluZ3MgbGlrZSBhcnJheXNcclxuICAgICAgICAvLyBVc2luZyBjaGFyQXQgc2hvdWxkIGJlIG1vcmUgY29tcGF0aWJsZS5cclxuICAgICAgICByZXR1cm4gKChpbnB1dCArICcnKS50b0xvd2VyQ2FzZSgpLmNoYXJBdCgwKSA9PT0gJ3AnKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZGVmYXVsdExvY2FsZU1lcmlkaWVtUGFyc2UgPSAvW2FwXVxcLj9tP1xcLj8vaTtcclxuICAgIGZ1bmN0aW9uIGxvY2FsZU1lcmlkaWVtIChob3VycywgbWludXRlcywgaXNMb3dlcikge1xyXG4gICAgICAgIGlmIChob3VycyA+IDExKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpc0xvd2VyID8gJ3BtJyA6ICdQTSc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlzTG93ZXIgPyAnYW0nIDogJ0FNJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICAvLyBTZXR0aW5nIHRoZSBob3VyIHNob3VsZCBrZWVwIHRoZSB0aW1lLCBiZWNhdXNlIHRoZSB1c2VyIGV4cGxpY2l0bHlcclxuICAgIC8vIHNwZWNpZmllZCB3aGljaCBob3VyIHRoZXkgd2FudC4gU28gdHJ5aW5nIHRvIG1haW50YWluIHRoZSBzYW1lIGhvdXIgKGluXHJcbiAgICAvLyBhIG5ldyB0aW1lem9uZSkgbWFrZXMgc2Vuc2UuIEFkZGluZy9zdWJ0cmFjdGluZyBob3VycyBkb2VzIG5vdCBmb2xsb3dcclxuICAgIC8vIHRoaXMgcnVsZS5cclxuICAgIHZhciBnZXRTZXRIb3VyID0gbWFrZUdldFNldCgnSG91cnMnLCB0cnVlKTtcclxuXHJcbiAgICB2YXIgYmFzZUNvbmZpZyA9IHtcclxuICAgICAgICBjYWxlbmRhcjogZGVmYXVsdENhbGVuZGFyLFxyXG4gICAgICAgIGxvbmdEYXRlRm9ybWF0OiBkZWZhdWx0TG9uZ0RhdGVGb3JtYXQsXHJcbiAgICAgICAgaW52YWxpZERhdGU6IGRlZmF1bHRJbnZhbGlkRGF0ZSxcclxuICAgICAgICBvcmRpbmFsOiBkZWZhdWx0T3JkaW5hbCxcclxuICAgICAgICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiBkZWZhdWx0RGF5T2ZNb250aE9yZGluYWxQYXJzZSxcclxuICAgICAgICByZWxhdGl2ZVRpbWU6IGRlZmF1bHRSZWxhdGl2ZVRpbWUsXHJcblxyXG4gICAgICAgIG1vbnRoczogZGVmYXVsdExvY2FsZU1vbnRocyxcclxuICAgICAgICBtb250aHNTaG9ydDogZGVmYXVsdExvY2FsZU1vbnRoc1Nob3J0LFxyXG5cclxuICAgICAgICB3ZWVrOiBkZWZhdWx0TG9jYWxlV2VlayxcclxuXHJcbiAgICAgICAgd2Vla2RheXM6IGRlZmF1bHRMb2NhbGVXZWVrZGF5cyxcclxuICAgICAgICB3ZWVrZGF5c01pbjogZGVmYXVsdExvY2FsZVdlZWtkYXlzTWluLFxyXG4gICAgICAgIHdlZWtkYXlzU2hvcnQ6IGRlZmF1bHRMb2NhbGVXZWVrZGF5c1Nob3J0LFxyXG5cclxuICAgICAgICBtZXJpZGllbVBhcnNlOiBkZWZhdWx0TG9jYWxlTWVyaWRpZW1QYXJzZVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBpbnRlcm5hbCBzdG9yYWdlIGZvciBsb2NhbGUgY29uZmlnIGZpbGVzXHJcbiAgICB2YXIgbG9jYWxlcyA9IHt9O1xyXG4gICAgdmFyIGxvY2FsZUZhbWlsaWVzID0ge307XHJcbiAgICB2YXIgZ2xvYmFsTG9jYWxlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZShrZXkpIHtcclxuICAgICAgICByZXR1cm4ga2V5ID8ga2V5LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnXycsICctJykgOiBrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcGljayB0aGUgbG9jYWxlIGZyb20gdGhlIGFycmF5XHJcbiAgICAvLyB0cnkgWydlbi1hdScsICdlbi1nYiddIGFzICdlbi1hdScsICdlbi1nYicsICdlbicsIGFzIGluIG1vdmUgdGhyb3VnaCB0aGUgbGlzdCB0cnlpbmcgZWFjaFxyXG4gICAgLy8gc3Vic3RyaW5nIGZyb20gbW9zdCBzcGVjaWZpYyB0byBsZWFzdCwgYnV0IG1vdmUgdG8gdGhlIG5leHQgYXJyYXkgaXRlbSBpZiBpdCdzIGEgbW9yZSBzcGVjaWZpYyB2YXJpYW50IHRoYW4gdGhlIGN1cnJlbnQgcm9vdFxyXG4gICAgZnVuY3Rpb24gY2hvb3NlTG9jYWxlKG5hbWVzKSB7XHJcbiAgICAgICAgdmFyIGkgPSAwLCBqLCBuZXh0LCBsb2NhbGUsIHNwbGl0O1xyXG5cclxuICAgICAgICB3aGlsZSAoaSA8IG5hbWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzcGxpdCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpXSkuc3BsaXQoJy0nKTtcclxuICAgICAgICAgICAgaiA9IHNwbGl0Lmxlbmd0aDtcclxuICAgICAgICAgICAgbmV4dCA9IG5vcm1hbGl6ZUxvY2FsZShuYW1lc1tpICsgMV0pO1xyXG4gICAgICAgICAgICBuZXh0ID0gbmV4dCA/IG5leHQuc3BsaXQoJy0nKSA6IG51bGw7XHJcbiAgICAgICAgICAgIHdoaWxlIChqID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShzcGxpdC5zbGljZSgwLCBqKS5qb2luKCctJykpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsb2NhbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAmJiBuZXh0Lmxlbmd0aCA+PSBqICYmIGNvbXBhcmVBcnJheXMoc3BsaXQsIG5leHQsIHRydWUpID49IGogLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGUgbmV4dCBhcnJheSBpdGVtIGlzIGJldHRlciB0aGFuIGEgc2hhbGxvd2VyIHN1YnN0cmluZyBvZiB0aGlzIG9uZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgai0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkTG9jYWxlKG5hbWUpIHtcclxuICAgICAgICB2YXIgb2xkTG9jYWxlID0gbnVsbDtcclxuICAgICAgICAvLyBUT0RPOiBGaW5kIGEgYmV0dGVyIHdheSB0byByZWdpc3RlciBhbmQgbG9hZCBhbGwgdGhlIGxvY2FsZXMgaW4gTm9kZVxyXG4gICAgICAgIGlmICghbG9jYWxlc1tuYW1lXSAmJiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpICYmXHJcbiAgICAgICAgICAgICAgICBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIG9sZExvY2FsZSA9IGdsb2JhbExvY2FsZS5fYWJicjtcclxuICAgICAgICAgICAgICAgIHZhciBhbGlhc2VkUmVxdWlyZSA9IHJlcXVpcmU7XHJcbiAgICAgICAgICAgICAgICBhbGlhc2VkUmVxdWlyZSgnLi9sb2NhbGUvJyArIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZ2V0U2V0R2xvYmFsTG9jYWxlKG9sZExvY2FsZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsb2NhbGVzW25hbWVdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBsb2FkIGxvY2FsZSBhbmQgdGhlbiBzZXQgdGhlIGdsb2JhbCBsb2NhbGUuICBJZlxyXG4gICAgLy8gbm8gYXJndW1lbnRzIGFyZSBwYXNzZWQgaW4sIGl0IHdpbGwgc2ltcGx5IHJldHVybiB0aGUgY3VycmVudCBnbG9iYWxcclxuICAgIC8vIGxvY2FsZSBrZXkuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRHbG9iYWxMb2NhbGUgKGtleSwgdmFsdWVzKSB7XHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICBpZiAoaXNVbmRlZmluZWQodmFsdWVzKSkge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGdldExvY2FsZShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGF0YSA9IGRlZmluZUxvY2FsZShrZXksIHZhbHVlcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBtb21lbnQuZHVyYXRpb24uX2xvY2FsZSA9IG1vbWVudC5fbG9jYWxlID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGdsb2JhbExvY2FsZSA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHR5cGVvZiBjb25zb2xlICE9PSAgJ3VuZGVmaW5lZCcpICYmIGNvbnNvbGUud2Fybikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vd2FybiB1c2VyIGlmIGFyZ3VtZW50cyBhcmUgcGFzc2VkIGJ1dCB0aGUgbG9jYWxlIGNvdWxkIG5vdCBiZSBzZXRcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ0xvY2FsZSAnICsga2V5ICsgICcgbm90IGZvdW5kLiBEaWQgeW91IGZvcmdldCB0byBsb2FkIGl0PycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZ2xvYmFsTG9jYWxlLl9hYmJyO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlZmluZUxvY2FsZSAobmFtZSwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxlLCBwYXJlbnRDb25maWcgPSBiYXNlQ29uZmlnO1xyXG4gICAgICAgICAgICBjb25maWcuYWJiciA9IG5hbWU7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbGVzW25hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGRlcHJlY2F0ZVNpbXBsZSgnZGVmaW5lTG9jYWxlT3ZlcnJpZGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAndXNlIG1vbWVudC51cGRhdGVMb2NhbGUobG9jYWxlTmFtZSwgY29uZmlnKSB0byBjaGFuZ2UgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdhbiBleGlzdGluZyBsb2NhbGUuIG1vbWVudC5kZWZpbmVMb2NhbGUobG9jYWxlTmFtZSwgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdjb25maWcpIHNob3VsZCBvbmx5IGJlIHVzZWQgZm9yIGNyZWF0aW5nIGEgbmV3IGxvY2FsZSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1NlZSBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL2RlZmluZS1sb2NhbGUvIGZvciBtb3JlIGluZm8uJyk7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGVzW25hbWVdLl9jb25maWc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnBhcmVudExvY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29uZmlnID0gbG9jYWxlc1tjb25maWcucGFyZW50TG9jYWxlXS5fY29uZmlnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbGUgPSBsb2FkTG9jYWxlKGNvbmZpZy5wYXJlbnRMb2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSBsb2NhbGUuX2NvbmZpZztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGVGYW1pbGllc1tjb25maWcucGFyZW50TG9jYWxlXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW2NvbmZpZy5wYXJlbnRMb2NhbGVdLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZzogY29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9jYWxlc1tuYW1lXSA9IG5ldyBMb2NhbGUobWVyZ2VDb25maWdzKHBhcmVudENvbmZpZywgY29uZmlnKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYWxlRmFtaWxpZXNbbmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsZUZhbWlsaWVzW25hbWVdLmZvckVhY2goZnVuY3Rpb24gKHgpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZpbmVMb2NhbGUoeC5uYW1lLCB4LmNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXHJcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBzZXQgdGhlIGxvY2FsZSBBRlRFUiBhbGwgY2hpbGQgbG9jYWxlcyBoYXZlIGJlZW5cclxuICAgICAgICAgICAgLy8gY3JlYXRlZCwgc28gd2Ugd29uJ3QgZW5kIHVwIHdpdGggdGhlIGNoaWxkIGxvY2FsZSBzZXQuXHJcbiAgICAgICAgICAgIGdldFNldEdsb2JhbExvY2FsZShuYW1lKTtcclxuXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gbG9jYWxlc1tuYW1lXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyB1c2VmdWwgZm9yIHRlc3RpbmdcclxuICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbGUobmFtZSwgY29uZmlnKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2NhbGUsIHRtcExvY2FsZSwgcGFyZW50Q29uZmlnID0gYmFzZUNvbmZpZztcclxuICAgICAgICAgICAgLy8gTUVSR0VcclxuICAgICAgICAgICAgdG1wTG9jYWxlID0gbG9hZExvY2FsZShuYW1lKTtcclxuICAgICAgICAgICAgaWYgKHRtcExvY2FsZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJlbnRDb25maWcgPSB0bXBMb2NhbGUuX2NvbmZpZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25maWcgPSBtZXJnZUNvbmZpZ3MocGFyZW50Q29uZmlnLCBjb25maWcpO1xyXG4gICAgICAgICAgICBsb2NhbGUgPSBuZXcgTG9jYWxlKGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGxvY2FsZS5wYXJlbnRMb2NhbGUgPSBsb2NhbGVzW25hbWVdO1xyXG4gICAgICAgICAgICBsb2NhbGVzW25hbWVdID0gbG9jYWxlO1xyXG5cclxuICAgICAgICAgICAgLy8gYmFja3dhcmRzIGNvbXBhdCBmb3Igbm93OiBhbHNvIHNldCB0aGUgbG9jYWxlXHJcbiAgICAgICAgICAgIGdldFNldEdsb2JhbExvY2FsZShuYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBwYXNzIG51bGwgZm9yIGNvbmZpZyB0byB1bnVwZGF0ZSwgdXNlZnVsIGZvciB0ZXN0c1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlc1tuYW1lXS5wYXJlbnRMb2NhbGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZXNbbmFtZV0gPSBsb2NhbGVzW25hbWVdLnBhcmVudExvY2FsZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYWxlc1tuYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGxvY2FsZXNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsZXNbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcmV0dXJucyBsb2NhbGUgZGF0YVxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYWxlIChrZXkpIHtcclxuICAgICAgICB2YXIgbG9jYWxlO1xyXG5cclxuICAgICAgICBpZiAoa2V5ICYmIGtleS5fbG9jYWxlICYmIGtleS5fbG9jYWxlLl9hYmJyKSB7XHJcbiAgICAgICAgICAgIGtleSA9IGtleS5fbG9jYWxlLl9hYmJyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFrZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbExvY2FsZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaXNBcnJheShrZXkpKSB7XHJcbiAgICAgICAgICAgIC8vc2hvcnQtY2lyY3VpdCBldmVyeXRoaW5nIGVsc2VcclxuICAgICAgICAgICAgbG9jYWxlID0gbG9hZExvY2FsZShrZXkpO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYWxlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtleSA9IFtrZXldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNob29zZUxvY2FsZShrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RMb2NhbGVzKCkge1xyXG4gICAgICAgIHJldHVybiBrZXlzKGxvY2FsZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3cgKG0pIHtcclxuICAgICAgICB2YXIgb3ZlcmZsb3c7XHJcbiAgICAgICAgdmFyIGEgPSBtLl9hO1xyXG5cclxuICAgICAgICBpZiAoYSAmJiBnZXRQYXJzaW5nRmxhZ3MobSkub3ZlcmZsb3cgPT09IC0yKSB7XHJcbiAgICAgICAgICAgIG92ZXJmbG93ID1cclxuICAgICAgICAgICAgICAgIGFbTU9OVEhdICAgICAgIDwgMCB8fCBhW01PTlRIXSAgICAgICA+IDExICA/IE1PTlRIIDpcclxuICAgICAgICAgICAgICAgIGFbREFURV0gICAgICAgIDwgMSB8fCBhW0RBVEVdICAgICAgICA+IGRheXNJbk1vbnRoKGFbWUVBUl0sIGFbTU9OVEhdKSA/IERBVEUgOlxyXG4gICAgICAgICAgICAgICAgYVtIT1VSXSAgICAgICAgPCAwIHx8IGFbSE9VUl0gICAgICAgID4gMjQgfHwgKGFbSE9VUl0gPT09IDI0ICYmIChhW01JTlVURV0gIT09IDAgfHwgYVtTRUNPTkRdICE9PSAwIHx8IGFbTUlMTElTRUNPTkRdICE9PSAwKSkgPyBIT1VSIDpcclxuICAgICAgICAgICAgICAgIGFbTUlOVVRFXSAgICAgIDwgMCB8fCBhW01JTlVURV0gICAgICA+IDU5ICA/IE1JTlVURSA6XHJcbiAgICAgICAgICAgICAgICBhW1NFQ09ORF0gICAgICA8IDAgfHwgYVtTRUNPTkRdICAgICAgPiA1OSAgPyBTRUNPTkQgOlxyXG4gICAgICAgICAgICAgICAgYVtNSUxMSVNFQ09ORF0gPCAwIHx8IGFbTUlMTElTRUNPTkRdID4gOTk5ID8gTUlMTElTRUNPTkQgOlxyXG4gICAgICAgICAgICAgICAgLTE7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd0RheU9mWWVhciAmJiAob3ZlcmZsb3cgPCBZRUFSIHx8IG92ZXJmbG93ID4gREFURSkpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gREFURTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZ2V0UGFyc2luZ0ZsYWdzKG0pLl9vdmVyZmxvd1dlZWtzICYmIG92ZXJmbG93ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3cgPSBXRUVLO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChnZXRQYXJzaW5nRmxhZ3MobSkuX292ZXJmbG93V2Vla2RheSAmJiBvdmVyZmxvdyA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJmbG93ID0gV0VFS0RBWTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKG0pLm92ZXJmbG93ID0gb3ZlcmZsb3c7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQaWNrIHRoZSBmaXJzdCBkZWZpbmVkIG9mIHR3byBvciB0aHJlZSBhcmd1bWVudHMuXHJcbiAgICBmdW5jdGlvbiBkZWZhdWx0cyhhLCBiLCBjKSB7XHJcbiAgICAgICAgaWYgKGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3VycmVudERhdGVBcnJheShjb25maWcpIHtcclxuICAgICAgICAvLyBob29rcyBpcyBhY3R1YWxseSB0aGUgZXhwb3J0ZWQgbW9tZW50IG9iamVjdFxyXG4gICAgICAgIHZhciBub3dWYWx1ZSA9IG5ldyBEYXRlKGhvb2tzLm5vdygpKTtcclxuICAgICAgICBpZiAoY29uZmlnLl91c2VVVEMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtub3dWYWx1ZS5nZXRVVENGdWxsWWVhcigpLCBub3dWYWx1ZS5nZXRVVENNb250aCgpLCBub3dWYWx1ZS5nZXRVVENEYXRlKCldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW25vd1ZhbHVlLmdldEZ1bGxZZWFyKCksIG5vd1ZhbHVlLmdldE1vbnRoKCksIG5vd1ZhbHVlLmdldERhdGUoKV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29udmVydCBhbiBhcnJheSB0byBhIGRhdGUuXHJcbiAgICAvLyB0aGUgYXJyYXkgc2hvdWxkIG1pcnJvciB0aGUgcGFyYW1ldGVycyBiZWxvd1xyXG4gICAgLy8gbm90ZTogYWxsIHZhbHVlcyBwYXN0IHRoZSB5ZWFyIGFyZSBvcHRpb25hbCBhbmQgd2lsbCBkZWZhdWx0IHRvIHRoZSBsb3dlc3QgcG9zc2libGUgdmFsdWUuXHJcbiAgICAvLyBbeWVhciwgbW9udGgsIGRheSAsIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZF1cclxuICAgIGZ1bmN0aW9uIGNvbmZpZ0Zyb21BcnJheSAoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIGksIGRhdGUsIGlucHV0ID0gW10sIGN1cnJlbnREYXRlLCBleHBlY3RlZFdlZWtkYXksIHllYXJUb1VzZTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlQXJyYXkoY29uZmlnKTtcclxuXHJcbiAgICAgICAgLy9jb21wdXRlIGRheSBvZiB0aGUgeWVhciBmcm9tIHdlZWtzIGFuZCB3ZWVrZGF5c1xyXG4gICAgICAgIGlmIChjb25maWcuX3cgJiYgY29uZmlnLl9hW0RBVEVdID09IG51bGwgJiYgY29uZmlnLl9hW01PTlRIXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRheU9mWWVhckZyb21XZWVrSW5mbyhjb25maWcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9pZiB0aGUgZGF5IG9mIHRoZSB5ZWFyIGlzIHNldCwgZmlndXJlIG91dCB3aGF0IGl0IGlzXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZGF5T2ZZZWFyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgeWVhclRvVXNlID0gZGVmYXVsdHMoY29uZmlnLl9hW1lFQVJdLCBjdXJyZW50RGF0ZVtZRUFSXSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLl9kYXlPZlllYXIgPiBkYXlzSW5ZZWFyKHllYXJUb1VzZSkgfHwgY29uZmlnLl9kYXlPZlllYXIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLl9vdmVyZmxvd0RheU9mWWVhciA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRhdGUgPSBjcmVhdGVVVENEYXRlKHllYXJUb1VzZSwgMCwgY29uZmlnLl9kYXlPZlllYXIpO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbTU9OVEhdID0gZGF0ZS5nZXRVVENNb250aCgpO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbREFURV0gPSBkYXRlLmdldFVUQ0RhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBkYXRlLlxyXG4gICAgICAgIC8vICogaWYgbm8geWVhciwgbW9udGgsIGRheSBvZiBtb250aCBhcmUgZ2l2ZW4sIGRlZmF1bHQgdG8gdG9kYXlcclxuICAgICAgICAvLyAqIGlmIGRheSBvZiBtb250aCBpcyBnaXZlbiwgZGVmYXVsdCBtb250aCBhbmQgeWVhclxyXG4gICAgICAgIC8vICogaWYgbW9udGggaXMgZ2l2ZW4sIGRlZmF1bHQgb25seSB5ZWFyXHJcbiAgICAgICAgLy8gKiBpZiB5ZWFyIGlzIGdpdmVuLCBkb24ndCBkZWZhdWx0IGFueXRoaW5nXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IDMgJiYgY29uZmlnLl9hW2ldID09IG51bGw7ICsraSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2FbaV0gPSBpbnB1dFtpXSA9IGN1cnJlbnREYXRlW2ldO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gWmVybyBvdXQgd2hhdGV2ZXIgd2FzIG5vdCBkZWZhdWx0ZWQsIGluY2x1ZGluZyB0aW1lXHJcbiAgICAgICAgZm9yICg7IGkgPCA3OyBpKyspIHtcclxuICAgICAgICAgICAgY29uZmlnLl9hW2ldID0gaW5wdXRbaV0gPSAoY29uZmlnLl9hW2ldID09IG51bGwpID8gKGkgPT09IDIgPyAxIDogMCkgOiBjb25maWcuX2FbaV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3IgMjQ6MDA6MDAuMDAwXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA9PT0gMjQgJiZcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5fYVtNSU5VVEVdID09PSAwICYmXHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2FbU0VDT05EXSA9PT0gMCAmJlxyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9hW01JTExJU0VDT05EXSA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb25maWcuX25leHREYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbSE9VUl0gPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnLl9kID0gKGNvbmZpZy5fdXNlVVRDID8gY3JlYXRlVVRDRGF0ZSA6IGNyZWF0ZURhdGUpLmFwcGx5KG51bGwsIGlucHV0KTtcclxuICAgICAgICBleHBlY3RlZFdlZWtkYXkgPSBjb25maWcuX3VzZVVUQyA/IGNvbmZpZy5fZC5nZXRVVENEYXkoKSA6IGNvbmZpZy5fZC5nZXREYXkoKTtcclxuXHJcbiAgICAgICAgLy8gQXBwbHkgdGltZXpvbmUgb2Zmc2V0IGZyb20gaW5wdXQuIFRoZSBhY3R1YWwgdXRjT2Zmc2V0IGNhbiBiZSBjaGFuZ2VkXHJcbiAgICAgICAgLy8gd2l0aCBwYXJzZVpvbmUuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fdHptICE9IG51bGwpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuX25leHREYXkpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gMjQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjaGVjayBmb3IgbWlzbWF0Y2hpbmcgZGF5IG9mIHdlZWtcclxuICAgICAgICBpZiAoY29uZmlnLl93ICYmIHR5cGVvZiBjb25maWcuX3cuZCAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uZmlnLl93LmQgIT09IGV4cGVjdGVkV2Vla2RheSkge1xyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS53ZWVrZGF5TWlzbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkYXlPZlllYXJGcm9tV2Vla0luZm8oY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIHcsIHdlZWtZZWFyLCB3ZWVrLCB3ZWVrZGF5LCBkb3csIGRveSwgdGVtcCwgd2Vla2RheU92ZXJmbG93O1xyXG5cclxuICAgICAgICB3ID0gY29uZmlnLl93O1xyXG4gICAgICAgIGlmICh3LkdHICE9IG51bGwgfHwgdy5XICE9IG51bGwgfHwgdy5FICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZG93ID0gMTtcclxuICAgICAgICAgICAgZG95ID0gNDtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IFdlIG5lZWQgdG8gdGFrZSB0aGUgY3VycmVudCBpc29XZWVrWWVhciwgYnV0IHRoYXQgZGVwZW5kcyBvblxyXG4gICAgICAgICAgICAvLyBob3cgd2UgaW50ZXJwcmV0IG5vdyAobG9jYWwsIHV0YywgZml4ZWQgb2Zmc2V0KS4gU28gY3JlYXRlXHJcbiAgICAgICAgICAgIC8vIGEgbm93IHZlcnNpb24gb2YgY3VycmVudCBjb25maWcgKHRha2UgbG9jYWwvdXRjL29mZnNldCBmbGFncywgYW5kXHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBub3cpLlxyXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuR0csIGNvbmZpZy5fYVtZRUFSXSwgd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCAxLCA0KS55ZWFyKTtcclxuICAgICAgICAgICAgd2VlayA9IGRlZmF1bHRzKHcuVywgMSk7XHJcbiAgICAgICAgICAgIHdlZWtkYXkgPSBkZWZhdWx0cyh3LkUsIDEpO1xyXG4gICAgICAgICAgICBpZiAod2Vla2RheSA8IDEgfHwgd2Vla2RheSA+IDcpIHtcclxuICAgICAgICAgICAgICAgIHdlZWtkYXlPdmVyZmxvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkb3cgPSBjb25maWcuX2xvY2FsZS5fd2Vlay5kb3c7XHJcbiAgICAgICAgICAgIGRveSA9IGNvbmZpZy5fbG9jYWxlLl93ZWVrLmRveTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJXZWVrID0gd2Vla09mWWVhcihjcmVhdGVMb2NhbCgpLCBkb3csIGRveSk7XHJcblxyXG4gICAgICAgICAgICB3ZWVrWWVhciA9IGRlZmF1bHRzKHcuZ2csIGNvbmZpZy5fYVtZRUFSXSwgY3VyV2Vlay55ZWFyKTtcclxuXHJcbiAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCB3ZWVrLlxyXG4gICAgICAgICAgICB3ZWVrID0gZGVmYXVsdHMody53LCBjdXJXZWVrLndlZWspO1xyXG5cclxuICAgICAgICAgICAgaWYgKHcuZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB3ZWVrZGF5IC0tIGxvdyBkYXkgbnVtYmVycyBhcmUgY29uc2lkZXJlZCBuZXh0IHdlZWtcclxuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmQ7XHJcbiAgICAgICAgICAgICAgICBpZiAod2Vla2RheSA8IDAgfHwgd2Vla2RheSA+IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICB3ZWVrZGF5T3ZlcmZsb3cgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHcuZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsb2NhbCB3ZWVrZGF5IC0tIGNvdW50aW5nIHN0YXJ0cyBmcm9tIGJlZ2luaW5nIG9mIHdlZWtcclxuICAgICAgICAgICAgICAgIHdlZWtkYXkgPSB3LmUgKyBkb3c7XHJcbiAgICAgICAgICAgICAgICBpZiAody5lIDwgMCB8fCB3LmUgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2Vla2RheU92ZXJmbG93ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gYmVnaW5pbmcgb2Ygd2Vla1xyXG4gICAgICAgICAgICAgICAgd2Vla2RheSA9IGRvdztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAod2VlayA8IDEgfHwgd2VlayA+IHdlZWtzSW5ZZWFyKHdlZWtZZWFyLCBkb3csIGRveSkpIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla3MgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAod2Vla2RheU92ZXJmbG93ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuX292ZXJmbG93V2Vla2RheSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVtcCA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpO1xyXG4gICAgICAgICAgICBjb25maWcuX2FbWUVBUl0gPSB0ZW1wLnllYXI7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdGVtcC5kYXlPZlllYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlzbyA4NjAxIHJlZ2V4XHJcbiAgICAvLyAwMDAwLTAwLTAwIDAwMDAtVzAwIG9yIDAwMDAtVzAwLTAgKyBUICsgMDAgb3IgMDA6MDAgb3IgMDA6MDA6MDAgb3IgMDA6MDA6MDAuMDAwICsgKzAwOjAwIG9yICswMDAwIG9yICswMClcclxuICAgIHZhciBleHRlbmRlZElzb1JlZ2V4ID0gL15cXHMqKCg/OlsrLV1cXGR7Nn18XFxkezR9KS0oPzpcXGRcXGQtXFxkXFxkfFdcXGRcXGQtXFxkfFdcXGRcXGR8XFxkXFxkXFxkfFxcZFxcZCkpKD86KFR8ICkoXFxkXFxkKD86OlxcZFxcZCg/OjpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvO1xyXG4gICAgdmFyIGJhc2ljSXNvUmVnZXggPSAvXlxccyooKD86WystXVxcZHs2fXxcXGR7NH0pKD86XFxkXFxkXFxkXFxkfFdcXGRcXGRcXGR8V1xcZFxcZHxcXGRcXGRcXGR8XFxkXFxkKSkoPzooVHwgKShcXGRcXGQoPzpcXGRcXGQoPzpcXGRcXGQoPzpbLixdXFxkKyk/KT8pPykoW1xcK1xcLV1cXGRcXGQoPzo6P1xcZFxcZCk/fFxccypaKT8pPyQvO1xyXG5cclxuICAgIHZhciB0elJlZ2V4ID0gL1p8WystXVxcZFxcZCg/Ojo/XFxkXFxkKT8vO1xyXG5cclxuICAgIHZhciBpc29EYXRlcyA9IFtcclxuICAgICAgICBbJ1lZWVlZWS1NTS1ERCcsIC9bKy1dXFxkezZ9LVxcZFxcZC1cXGRcXGQvXSxcclxuICAgICAgICBbJ1lZWVktTU0tREQnLCAvXFxkezR9LVxcZFxcZC1cXGRcXGQvXSxcclxuICAgICAgICBbJ0dHR0ctW1ddV1ctRScsIC9cXGR7NH0tV1xcZFxcZC1cXGQvXSxcclxuICAgICAgICBbJ0dHR0ctW1ddV1cnLCAvXFxkezR9LVdcXGRcXGQvLCBmYWxzZV0sXHJcbiAgICAgICAgWydZWVlZLURERCcsIC9cXGR7NH0tXFxkezN9L10sXHJcbiAgICAgICAgWydZWVlZLU1NJywgL1xcZHs0fS1cXGRcXGQvLCBmYWxzZV0sXHJcbiAgICAgICAgWydZWVlZWVlNTUREJywgL1srLV1cXGR7MTB9L10sXHJcbiAgICAgICAgWydZWVlZTU1ERCcsIC9cXGR7OH0vXSxcclxuICAgICAgICAvLyBZWVlZTU0gaXMgTk9UIGFsbG93ZWQgYnkgdGhlIHN0YW5kYXJkXHJcbiAgICAgICAgWydHR0dHW1ddV1dFJywgL1xcZHs0fVdcXGR7M30vXSxcclxuICAgICAgICBbJ0dHR0dbV11XVycsIC9cXGR7NH1XXFxkezJ9LywgZmFsc2VdLFxyXG4gICAgICAgIFsnWVlZWURERCcsIC9cXGR7N30vXVxyXG4gICAgXTtcclxuXHJcbiAgICAvLyBpc28gdGltZSBmb3JtYXRzIGFuZCByZWdleGVzXHJcbiAgICB2YXIgaXNvVGltZXMgPSBbXHJcbiAgICAgICAgWydISDptbTpzcy5TU1NTJywgL1xcZFxcZDpcXGRcXGQ6XFxkXFxkXFwuXFxkKy9dLFxyXG4gICAgICAgIFsnSEg6bW06c3MsU1NTUycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZCxcXGQrL10sXHJcbiAgICAgICAgWydISDptbTpzcycsIC9cXGRcXGQ6XFxkXFxkOlxcZFxcZC9dLFxyXG4gICAgICAgIFsnSEg6bW0nLCAvXFxkXFxkOlxcZFxcZC9dLFxyXG4gICAgICAgIFsnSEhtbXNzLlNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkXFwuXFxkKy9dLFxyXG4gICAgICAgIFsnSEhtbXNzLFNTU1MnLCAvXFxkXFxkXFxkXFxkXFxkXFxkLFxcZCsvXSxcclxuICAgICAgICBbJ0hIbW1zcycsIC9cXGRcXGRcXGRcXGRcXGRcXGQvXSxcclxuICAgICAgICBbJ0hIbW0nLCAvXFxkXFxkXFxkXFxkL10sXHJcbiAgICAgICAgWydISCcsIC9cXGRcXGQvXVxyXG4gICAgXTtcclxuXHJcbiAgICB2YXIgYXNwTmV0SnNvblJlZ2V4ID0gL15cXC8/RGF0ZVxcKChcXC0/XFxkKykvaTtcclxuXHJcbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdFxyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbUlTTyhjb25maWcpIHtcclxuICAgICAgICB2YXIgaSwgbCxcclxuICAgICAgICAgICAgc3RyaW5nID0gY29uZmlnLl9pLFxyXG4gICAgICAgICAgICBtYXRjaCA9IGV4dGVuZGVkSXNvUmVnZXguZXhlYyhzdHJpbmcpIHx8IGJhc2ljSXNvUmVnZXguZXhlYyhzdHJpbmcpLFxyXG4gICAgICAgICAgICBhbGxvd1RpbWUsIGRhdGVGb3JtYXQsIHRpbWVGb3JtYXQsIHR6Rm9ybWF0O1xyXG5cclxuICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaXNvID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSBpc29EYXRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc29EYXRlc1tpXVsxXS5leGVjKG1hdGNoWzFdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVGb3JtYXQgPSBpc29EYXRlc1tpXVswXTtcclxuICAgICAgICAgICAgICAgICAgICBhbGxvd1RpbWUgPSBpc29EYXRlc1tpXVsyXSAhPT0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGRhdGVGb3JtYXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG1hdGNoWzNdKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsID0gaXNvVGltZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzb1RpbWVzW2ldWzFdLmV4ZWMobWF0Y2hbM10pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoWzJdIHNob3VsZCBiZSAnVCcgb3Igc3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZUZvcm1hdCA9IChtYXRjaFsyXSB8fCAnICcpICsgaXNvVGltZXNbaV1bMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aW1lRm9ybWF0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFhbGxvd1RpbWUgJiYgdGltZUZvcm1hdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuX2lzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobWF0Y2hbNF0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0elJlZ2V4LmV4ZWMobWF0Y2hbNF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHpGb3JtYXQgPSAnWic7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25maWcuX2YgPSBkYXRlRm9ybWF0ICsgKHRpbWVGb3JtYXQgfHwgJycpICsgKHR6Rm9ybWF0IHx8ICcnKTtcclxuICAgICAgICAgICAgY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSRkMgMjgyMiByZWdleDogRm9yIGRldGFpbHMgc2VlIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyODIyI3NlY3Rpb24tMy4zXHJcbiAgICB2YXIgcmZjMjgyMiA9IC9eKD86KE1vbnxUdWV8V2VkfFRodXxGcml8U2F0fFN1biksP1xccyk/KFxcZHsxLDJ9KVxccyhKYW58RmVifE1hcnxBcHJ8TWF5fEp1bnxKdWx8QXVnfFNlcHxPY3R8Tm92fERlYylcXHMoXFxkezIsNH0pXFxzKFxcZFxcZCk6KFxcZFxcZCkoPzo6KFxcZFxcZCkpP1xccyg/OihVVHxHTVR8W0VDTVBdW1NEXVQpfChbWnpdKXwoWystXVxcZHs0fSkpJC87XHJcblxyXG4gICAgZnVuY3Rpb24gZXh0cmFjdEZyb21SRkMyODIyU3RyaW5ncyh5ZWFyU3RyLCBtb250aFN0ciwgZGF5U3RyLCBob3VyU3RyLCBtaW51dGVTdHIsIHNlY29uZFN0cikge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXHJcbiAgICAgICAgICAgIHVudHJ1bmNhdGVZZWFyKHllYXJTdHIpLFxyXG4gICAgICAgICAgICBkZWZhdWx0TG9jYWxlTW9udGhzU2hvcnQuaW5kZXhPZihtb250aFN0ciksXHJcbiAgICAgICAgICAgIHBhcnNlSW50KGRheVN0ciwgMTApLFxyXG4gICAgICAgICAgICBwYXJzZUludChob3VyU3RyLCAxMCksXHJcbiAgICAgICAgICAgIHBhcnNlSW50KG1pbnV0ZVN0ciwgMTApXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgaWYgKHNlY29uZFN0cikge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChwYXJzZUludChzZWNvbmRTdHIsIDEwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVudHJ1bmNhdGVZZWFyKHllYXJTdHIpIHtcclxuICAgICAgICB2YXIgeWVhciA9IHBhcnNlSW50KHllYXJTdHIsIDEwKTtcclxuICAgICAgICBpZiAoeWVhciA8PSA0OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMjAwMCArIHllYXI7XHJcbiAgICAgICAgfSBlbHNlIGlmICh5ZWFyIDw9IDk5OSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMTkwMCArIHllYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB5ZWFyO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHByZXByb2Nlc3NSRkMyODIyKHMpIHtcclxuICAgICAgICAvLyBSZW1vdmUgY29tbWVudHMgYW5kIGZvbGRpbmcgd2hpdGVzcGFjZSBhbmQgcmVwbGFjZSBtdWx0aXBsZS1zcGFjZXMgd2l0aCBhIHNpbmdsZSBzcGFjZVxyXG4gICAgICAgIHJldHVybiBzLnJlcGxhY2UoL1xcKFteKV0qXFwpfFtcXG5cXHRdL2csICcgJykucmVwbGFjZSgvKFxcc1xccyspL2csICcgJykucmVwbGFjZSgvXlxcc1xccyovLCAnJykucmVwbGFjZSgvXFxzXFxzKiQvLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tXZWVrZGF5KHdlZWtkYXlTdHIsIHBhcnNlZElucHV0LCBjb25maWcpIHtcclxuICAgICAgICBpZiAod2Vla2RheVN0cikge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBSZXBsYWNlIHRoZSB2YW5pbGxhIEpTIERhdGUgb2JqZWN0IHdpdGggYW4gaW5kZXBlbnRlbnQgZGF5LW9mLXdlZWsgY2hlY2suXHJcbiAgICAgICAgICAgIHZhciB3ZWVrZGF5UHJvdmlkZWQgPSBkZWZhdWx0TG9jYWxlV2Vla2RheXNTaG9ydC5pbmRleE9mKHdlZWtkYXlTdHIpLFxyXG4gICAgICAgICAgICAgICAgd2Vla2RheUFjdHVhbCA9IG5ldyBEYXRlKHBhcnNlZElucHV0WzBdLCBwYXJzZWRJbnB1dFsxXSwgcGFyc2VkSW5wdXRbMl0pLmdldERheSgpO1xyXG4gICAgICAgICAgICBpZiAod2Vla2RheVByb3ZpZGVkICE9PSB3ZWVrZGF5QWN0dWFsKSB7XHJcbiAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS53ZWVrZGF5TWlzbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLl9pc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9ic09mZnNldHMgPSB7XHJcbiAgICAgICAgVVQ6IDAsXHJcbiAgICAgICAgR01UOiAwLFxyXG4gICAgICAgIEVEVDogLTQgKiA2MCxcclxuICAgICAgICBFU1Q6IC01ICogNjAsXHJcbiAgICAgICAgQ0RUOiAtNSAqIDYwLFxyXG4gICAgICAgIENTVDogLTYgKiA2MCxcclxuICAgICAgICBNRFQ6IC02ICogNjAsXHJcbiAgICAgICAgTVNUOiAtNyAqIDYwLFxyXG4gICAgICAgIFBEVDogLTcgKiA2MCxcclxuICAgICAgICBQU1Q6IC04ICogNjBcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlT2Zmc2V0KG9ic09mZnNldCwgbWlsaXRhcnlPZmZzZXQsIG51bU9mZnNldCkge1xyXG4gICAgICAgIGlmIChvYnNPZmZzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9ic09mZnNldHNbb2JzT2Zmc2V0XTtcclxuICAgICAgICB9IGVsc2UgaWYgKG1pbGl0YXJ5T2Zmc2V0KSB7XHJcbiAgICAgICAgICAgIC8vIHRoZSBvbmx5IGFsbG93ZWQgbWlsaXRhcnkgdHogaXMgWlxyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgaG0gPSBwYXJzZUludChudW1PZmZzZXQsIDEwKTtcclxuICAgICAgICAgICAgdmFyIG0gPSBobSAlIDEwMCwgaCA9IChobSAtIG0pIC8gMTAwO1xyXG4gICAgICAgICAgICByZXR1cm4gaCAqIDYwICsgbTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZGF0ZSBhbmQgdGltZSBmcm9tIHJlZiAyODIyIGZvcm1hdFxyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVJGQzI4MjIoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoID0gcmZjMjgyMi5leGVjKHByZXByb2Nlc3NSRkMyODIyKGNvbmZpZy5faSkpO1xyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICB2YXIgcGFyc2VkQXJyYXkgPSBleHRyYWN0RnJvbVJGQzI4MjJTdHJpbmdzKG1hdGNoWzRdLCBtYXRjaFszXSwgbWF0Y2hbMl0sIG1hdGNoWzVdLCBtYXRjaFs2XSwgbWF0Y2hbN10pO1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrV2Vla2RheShtYXRjaFsxXSwgcGFyc2VkQXJyYXksIGNvbmZpZykpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uZmlnLl9hID0gcGFyc2VkQXJyYXk7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fdHptID0gY2FsY3VsYXRlT2Zmc2V0KG1hdGNoWzhdLCBtYXRjaFs5XSwgbWF0Y2hbMTBdKTtcclxuXHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGNyZWF0ZVVUQ0RhdGUuYXBwbHkobnVsbCwgY29uZmlnLl9hKTtcclxuICAgICAgICAgICAgY29uZmlnLl9kLnNldFVUQ01pbnV0ZXMoY29uZmlnLl9kLmdldFVUQ01pbnV0ZXMoKSAtIGNvbmZpZy5fdHptKTtcclxuXHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnJmYzI4MjIgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkYXRlIGZyb20gaXNvIGZvcm1hdCBvciBmYWxsYmFja1xyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZyhjb25maWcpIHtcclxuICAgICAgICB2YXIgbWF0Y2hlZCA9IGFzcE5ldEpzb25SZWdleC5leGVjKGNvbmZpZy5faSk7XHJcblxyXG4gICAgICAgIGlmIChtYXRjaGVkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKCttYXRjaGVkWzFdKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnRnJvbUlTTyhjb25maWcpO1xyXG4gICAgICAgIGlmIChjb25maWcuX2lzVmFsaWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuX2lzVmFsaWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uZmlnRnJvbVJGQzI4MjIoY29uZmlnKTtcclxuICAgICAgICBpZiAoY29uZmlnLl9pc1ZhbGlkID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICBkZWxldGUgY29uZmlnLl9pc1ZhbGlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsIGF0dGVtcHQsIHVzZSBJbnB1dCBGYWxsYmFja1xyXG4gICAgICAgIGhvb2tzLmNyZWF0ZUZyb21JbnB1dEZhbGxiYWNrKGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2sgPSBkZXByZWNhdGUoXHJcbiAgICAgICAgJ3ZhbHVlIHByb3ZpZGVkIGlzIG5vdCBpbiBhIHJlY29nbml6ZWQgUkZDMjgyMiBvciBJU08gZm9ybWF0LiBtb21lbnQgY29uc3RydWN0aW9uIGZhbGxzIGJhY2sgdG8ganMgRGF0ZSgpLCAnICtcclxuICAgICAgICAnd2hpY2ggaXMgbm90IHJlbGlhYmxlIGFjcm9zcyBhbGwgYnJvd3NlcnMgYW5kIHZlcnNpb25zLiBOb24gUkZDMjgyMi9JU08gZGF0ZSBmb3JtYXRzIGFyZSAnICtcclxuICAgICAgICAnZGlzY291cmFnZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiBhbiB1cGNvbWluZyBtYWpvciByZWxlYXNlLiBQbGVhc2UgcmVmZXIgdG8gJyArXHJcbiAgICAgICAgJ2h0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvanMtZGF0ZS8gZm9yIG1vcmUgaW5mby4nLFxyXG4gICAgICAgIGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoY29uZmlnLl9pICsgKGNvbmZpZy5fdXNlVVRDID8gJyBVVEMnIDogJycpKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIC8vIGNvbnN0YW50IHRoYXQgcmVmZXJzIHRvIHRoZSBJU08gc3RhbmRhcmRcclxuICAgIGhvb2tzLklTT184NjAxID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgLy8gY29uc3RhbnQgdGhhdCByZWZlcnMgdG8gdGhlIFJGQyAyODIyIGZvcm1cclxuICAgIGhvb2tzLlJGQ18yODIyID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgLy8gZGF0ZSBmcm9tIHN0cmluZyBhbmQgZm9ybWF0IHN0cmluZ1xyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEZvcm1hdChjb25maWcpIHtcclxuICAgICAgICAvLyBUT0RPOiBNb3ZlIHRoaXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBjcmVhdGlvbiBmbG93IHRvIHByZXZlbnQgY2lyY3VsYXIgZGVwc1xyXG4gICAgICAgIGlmIChjb25maWcuX2YgPT09IGhvb2tzLklTT184NjAxKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21JU08oY29uZmlnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29uZmlnLl9mID09PSBob29rcy5SRkNfMjgyMikge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tUkZDMjgyMihjb25maWcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbmZpZy5fYSA9IFtdO1xyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLmVtcHR5ID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBhcnJheSBpcyB1c2VkIHRvIG1ha2UgYSBEYXRlLCBlaXRoZXIgd2l0aCBgbmV3IERhdGVgIG9yIGBEYXRlLlVUQ2BcclxuICAgICAgICB2YXIgc3RyaW5nID0gJycgKyBjb25maWcuX2ksXHJcbiAgICAgICAgICAgIGksIHBhcnNlZElucHV0LCB0b2tlbnMsIHRva2VuLCBza2lwcGVkLFxyXG4gICAgICAgICAgICBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxyXG4gICAgICAgICAgICB0b3RhbFBhcnNlZElucHV0TGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgdG9rZW5zID0gZXhwYW5kRm9ybWF0KGNvbmZpZy5fZiwgY29uZmlnLl9sb2NhbGUpLm1hdGNoKGZvcm1hdHRpbmdUb2tlbnMpIHx8IFtdO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xyXG4gICAgICAgICAgICBwYXJzZWRJbnB1dCA9IChzdHJpbmcubWF0Y2goZ2V0UGFyc2VSZWdleEZvclRva2VuKHRva2VuLCBjb25maWcpKSB8fCBbXSlbMF07XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd0b2tlbicsIHRva2VuLCAncGFyc2VkSW5wdXQnLCBwYXJzZWRJbnB1dCxcclxuICAgICAgICAgICAgLy8gICAgICAgICAncmVnZXgnLCBnZXRQYXJzZVJlZ2V4Rm9yVG9rZW4odG9rZW4sIGNvbmZpZykpO1xyXG4gICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHNraXBwZWQgPSBzdHJpbmcuc3Vic3RyKDAsIHN0cmluZy5pbmRleE9mKHBhcnNlZElucHV0KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpcHBlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkSW5wdXQucHVzaChza2lwcGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZihwYXJzZWRJbnB1dCkgKyBwYXJzZWRJbnB1dC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdG90YWxQYXJzZWRJbnB1dExlbmd0aCArPSBwYXJzZWRJbnB1dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gZG9uJ3QgcGFyc2UgaWYgaXQncyBub3QgYSBrbm93biB0b2tlblxyXG4gICAgICAgICAgICBpZiAoZm9ybWF0VG9rZW5GdW5jdGlvbnNbdG9rZW5dKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkSW5wdXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5lbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWRkVGltZVRvQXJyYXlGcm9tVG9rZW4odG9rZW4sIHBhcnNlZElucHV0LCBjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNvbmZpZy5fc3RyaWN0ICYmICFwYXJzZWRJbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykudW51c2VkVG9rZW5zLnB1c2godG9rZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgcmVtYWluaW5nIHVucGFyc2VkIGlucHV0IGxlbmd0aCB0byB0aGUgc3RyaW5nXHJcbiAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuY2hhcnNMZWZ0T3ZlciA9IHN0cmluZ0xlbmd0aCAtIHRvdGFsUGFyc2VkSW5wdXRMZW5ndGg7XHJcbiAgICAgICAgaWYgKHN0cmluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnVudXNlZElucHV0LnB1c2goc3RyaW5nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNsZWFyIF8xMmggZmxhZyBpZiBob3VyIGlzIDw9IDEyXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fYVtIT1VSXSA8PSAxMiAmJlxyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5iaWdIb3VyID09PSB0cnVlICYmXHJcbiAgICAgICAgICAgIGNvbmZpZy5fYVtIT1VSXSA+IDApIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuYmlnSG91ciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFBhcnNpbmdGbGFncyhjb25maWcpLnBhcnNlZERhdGVQYXJ0cyA9IGNvbmZpZy5fYS5zbGljZSgwKTtcclxuICAgICAgICBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnKS5tZXJpZGllbSA9IGNvbmZpZy5fbWVyaWRpZW07XHJcbiAgICAgICAgLy8gaGFuZGxlIG1lcmlkaWVtXHJcbiAgICAgICAgY29uZmlnLl9hW0hPVVJdID0gbWVyaWRpZW1GaXhXcmFwKGNvbmZpZy5fbG9jYWxlLCBjb25maWcuX2FbSE9VUl0sIGNvbmZpZy5fbWVyaWRpZW0pO1xyXG5cclxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcclxuICAgICAgICBjaGVja092ZXJmbG93KGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG1lcmlkaWVtRml4V3JhcCAobG9jYWxlLCBob3VyLCBtZXJpZGllbSkge1xyXG4gICAgICAgIHZhciBpc1BtO1xyXG5cclxuICAgICAgICBpZiAobWVyaWRpZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRvXHJcbiAgICAgICAgICAgIHJldHVybiBob3VyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9jYWxlLm1lcmlkaWVtSG91ciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbGUubWVyaWRpZW1Ib3VyKGhvdXIsIG1lcmlkaWVtKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvY2FsZS5pc1BNICE9IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gRmFsbGJhY2tcclxuICAgICAgICAgICAgaXNQbSA9IGxvY2FsZS5pc1BNKG1lcmlkaWVtKTtcclxuICAgICAgICAgICAgaWYgKGlzUG0gJiYgaG91ciA8IDEyKSB7XHJcbiAgICAgICAgICAgICAgICBob3VyICs9IDEyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaXNQbSAmJiBob3VyID09PSAxMikge1xyXG4gICAgICAgICAgICAgICAgaG91ciA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhvdXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcyBpcyBub3Qgc3VwcG9zZWQgdG8gaGFwcGVuXHJcbiAgICAgICAgICAgIHJldHVybiBob3VyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkYXRlIGZyb20gc3RyaW5nIGFuZCBhcnJheSBvZiBmb3JtYXQgc3RyaW5nc1xyXG4gICAgZnVuY3Rpb24gY29uZmlnRnJvbVN0cmluZ0FuZEFycmF5KGNvbmZpZykge1xyXG4gICAgICAgIHZhciB0ZW1wQ29uZmlnLFxyXG4gICAgICAgICAgICBiZXN0TW9tZW50LFxyXG5cclxuICAgICAgICAgICAgc2NvcmVUb0JlYXQsXHJcbiAgICAgICAgICAgIGksXHJcbiAgICAgICAgICAgIGN1cnJlbnRTY29yZTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5fZi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgZ2V0UGFyc2luZ0ZsYWdzKGNvbmZpZykuaW52YWxpZEZvcm1hdCA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IG5ldyBEYXRlKE5hTik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb25maWcuX2YubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY3VycmVudFNjb3JlID0gMDtcclxuICAgICAgICAgICAgdGVtcENvbmZpZyA9IGNvcHlDb25maWcoe30sIGNvbmZpZyk7XHJcbiAgICAgICAgICAgIGlmIChjb25maWcuX3VzZVVUQyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wQ29uZmlnLl91c2VVVEMgPSBjb25maWcuX3VzZVVUQztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wQ29uZmlnLl9mID0gY29uZmlnLl9mW2ldO1xyXG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nQW5kRm9ybWF0KHRlbXBDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKHRlbXBDb25maWcpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgdGhlcmUgaXMgYW55IGlucHV0IHRoYXQgd2FzIG5vdCBwYXJzZWQgYWRkIGEgcGVuYWx0eSBmb3IgdGhhdCBmb3JtYXRcclxuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS5jaGFyc0xlZnRPdmVyO1xyXG5cclxuICAgICAgICAgICAgLy9vciB0b2tlbnNcclxuICAgICAgICAgICAgY3VycmVudFNjb3JlICs9IGdldFBhcnNpbmdGbGFncyh0ZW1wQ29uZmlnKS51bnVzZWRUb2tlbnMubGVuZ3RoICogMTA7XHJcblxyXG4gICAgICAgICAgICBnZXRQYXJzaW5nRmxhZ3ModGVtcENvbmZpZykuc2NvcmUgPSBjdXJyZW50U2NvcmU7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2NvcmVUb0JlYXQgPT0gbnVsbCB8fCBjdXJyZW50U2NvcmUgPCBzY29yZVRvQmVhdCkge1xyXG4gICAgICAgICAgICAgICAgc2NvcmVUb0JlYXQgPSBjdXJyZW50U2NvcmU7XHJcbiAgICAgICAgICAgICAgICBiZXN0TW9tZW50ID0gdGVtcENvbmZpZztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZXh0ZW5kKGNvbmZpZywgYmVzdE1vbWVudCB8fCB0ZW1wQ29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tT2JqZWN0KGNvbmZpZykge1xyXG4gICAgICAgIGlmIChjb25maWcuX2QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGkgPSBub3JtYWxpemVPYmplY3RVbml0cyhjb25maWcuX2kpO1xyXG4gICAgICAgIGNvbmZpZy5fYSA9IG1hcChbaS55ZWFyLCBpLm1vbnRoLCBpLmRheSB8fCBpLmRhdGUsIGkuaG91ciwgaS5taW51dGUsIGkuc2Vjb25kLCBpLm1pbGxpc2Vjb25kXSwgZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqICYmIHBhcnNlSW50KG9iaiwgMTApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25maWdGcm9tQXJyYXkoY29uZmlnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVGcm9tQ29uZmlnIChjb25maWcpIHtcclxuICAgICAgICB2YXIgcmVzID0gbmV3IE1vbWVudChjaGVja092ZXJmbG93KHByZXBhcmVDb25maWcoY29uZmlnKSkpO1xyXG4gICAgICAgIGlmIChyZXMuX25leHREYXkpIHtcclxuICAgICAgICAgICAgLy8gQWRkaW5nIGlzIHNtYXJ0IGVub3VnaCBhcm91bmQgRFNUXHJcbiAgICAgICAgICAgIHJlcy5hZGQoMSwgJ2QnKTtcclxuICAgICAgICAgICAgcmVzLl9uZXh0RGF5ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmVwYXJlQ29uZmlnIChjb25maWcpIHtcclxuICAgICAgICB2YXIgaW5wdXQgPSBjb25maWcuX2ksXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGNvbmZpZy5fZjtcclxuXHJcbiAgICAgICAgY29uZmlnLl9sb2NhbGUgPSBjb25maWcuX2xvY2FsZSB8fCBnZXRMb2NhbGUoY29uZmlnLl9sKTtcclxuXHJcbiAgICAgICAgaWYgKGlucHV0ID09PSBudWxsIHx8IChmb3JtYXQgPT09IHVuZGVmaW5lZCAmJiBpbnB1dCA9PT0gJycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKHtudWxsSW5wdXQ6IHRydWV9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5faSA9IGlucHV0ID0gY29uZmlnLl9sb2NhbGUucHJlcGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTW9tZW50KGlucHV0KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE1vbWVudChjaGVja092ZXJmbG93KGlucHV0KSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0RhdGUoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5fZCA9IGlucHV0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShmb3JtYXQpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRBcnJheShjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZm9ybWF0KSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21TdHJpbmdBbmRGb3JtYXQoY29uZmlnKTtcclxuICAgICAgICB9ICBlbHNlIHtcclxuICAgICAgICAgICAgY29uZmlnRnJvbUlucHV0KGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzVmFsaWQoY29uZmlnKSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWdGcm9tSW5wdXQoY29uZmlnKSB7XHJcbiAgICAgICAgdmFyIGlucHV0ID0gY29uZmlnLl9pO1xyXG4gICAgICAgIGlmIChpc1VuZGVmaW5lZChpbnB1dCkpIHtcclxuICAgICAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUoaG9va3Mubm93KCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNEYXRlKGlucHV0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dC52YWx1ZU9mKCkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25maWdGcm9tU3RyaW5nKGNvbmZpZyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KGlucHV0KSkge1xyXG4gICAgICAgICAgICBjb25maWcuX2EgPSBtYXAoaW5wdXQuc2xpY2UoMCksIGZ1bmN0aW9uIChvYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChvYmosIDEwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21BcnJheShjb25maWcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZ0Zyb21PYmplY3QoY29uZmlnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzTnVtYmVyKGlucHV0KSkge1xyXG4gICAgICAgICAgICAvLyBmcm9tIG1pbGxpc2Vjb25kc1xyXG4gICAgICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZShpbnB1dCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaG9va3MuY3JlYXRlRnJvbUlucHV0RmFsbGJhY2soY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlTG9jYWxPclVUQyAoaW5wdXQsIGZvcm1hdCwgbG9jYWxlLCBzdHJpY3QsIGlzVVRDKSB7XHJcbiAgICAgICAgdmFyIGMgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGxvY2FsZSA9PT0gdHJ1ZSB8fCBsb2NhbGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHN0cmljdCA9IGxvY2FsZTtcclxuICAgICAgICAgICAgbG9jYWxlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKChpc09iamVjdChpbnB1dCkgJiYgaXNPYmplY3RFbXB0eShpbnB1dCkpIHx8XHJcbiAgICAgICAgICAgICAgICAoaXNBcnJheShpbnB1dCkgJiYgaW5wdXQubGVuZ3RoID09PSAwKSkge1xyXG4gICAgICAgICAgICBpbnB1dCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gb2JqZWN0IGNvbnN0cnVjdGlvbiBtdXN0IGJlIGRvbmUgdGhpcyB3YXkuXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21vbWVudC9tb21lbnQvaXNzdWVzLzE0MjNcclxuICAgICAgICBjLl9pc0FNb21lbnRPYmplY3QgPSB0cnVlO1xyXG4gICAgICAgIGMuX3VzZVVUQyA9IGMuX2lzVVRDID0gaXNVVEM7XHJcbiAgICAgICAgYy5fbCA9IGxvY2FsZTtcclxuICAgICAgICBjLl9pID0gaW5wdXQ7XHJcbiAgICAgICAgYy5fZiA9IGZvcm1hdDtcclxuICAgICAgICBjLl9zdHJpY3QgPSBzdHJpY3Q7XHJcblxyXG4gICAgICAgIHJldHVybiBjcmVhdGVGcm9tQ29uZmlnKGMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxvY2FsIChpbnB1dCwgZm9ybWF0LCBsb2NhbGUsIHN0cmljdCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVMb2NhbE9yVVRDKGlucHV0LCBmb3JtYXQsIGxvY2FsZSwgc3RyaWN0LCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHByb3RvdHlwZU1pbiA9IGRlcHJlY2F0ZShcclxuICAgICAgICAnbW9tZW50KCkubWluIGlzIGRlcHJlY2F0ZWQsIHVzZSBtb21lbnQubWF4IGluc3RlYWQuIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvbWluLW1heC8nLFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpICYmIG90aGVyLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG90aGVyIDwgdGhpcyA/IHRoaXMgOiBvdGhlcjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbnZhbGlkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIHZhciBwcm90b3R5cGVNYXggPSBkZXByZWNhdGUoXHJcbiAgICAgICAgJ21vbWVudCgpLm1heCBpcyBkZXByZWNhdGVkLCB1c2UgbW9tZW50Lm1pbiBpbnN0ZWFkLiBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL21pbi1tYXgvJyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBvdGhlciA9IGNyZWF0ZUxvY2FsLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJiBvdGhlci5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdGhlciA+IHRoaXMgPyB0aGlzIDogb3RoZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlSW52YWxpZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICAvLyBQaWNrIGEgbW9tZW50IG0gZnJvbSBtb21lbnRzIHNvIHRoYXQgbVtmbl0ob3RoZXIpIGlzIHRydWUgZm9yIGFsbFxyXG4gICAgLy8gb3RoZXIuIFRoaXMgcmVsaWVzIG9uIHRoZSBmdW5jdGlvbiBmbiB0byBiZSB0cmFuc2l0aXZlLlxyXG4gICAgLy9cclxuICAgIC8vIG1vbWVudHMgc2hvdWxkIGVpdGhlciBiZSBhbiBhcnJheSBvZiBtb21lbnQgb2JqZWN0cyBvciBhbiBhcnJheSwgd2hvc2VcclxuICAgIC8vIGZpcnN0IGVsZW1lbnQgaXMgYW4gYXJyYXkgb2YgbW9tZW50IG9iamVjdHMuXHJcbiAgICBmdW5jdGlvbiBwaWNrQnkoZm4sIG1vbWVudHMpIHtcclxuICAgICAgICB2YXIgcmVzLCBpO1xyXG4gICAgICAgIGlmIChtb21lbnRzLmxlbmd0aCA9PT0gMSAmJiBpc0FycmF5KG1vbWVudHNbMF0pKSB7XHJcbiAgICAgICAgICAgIG1vbWVudHMgPSBtb21lbnRzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIW1vbWVudHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVMb2NhbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMgPSBtb21lbnRzWzBdO1xyXG4gICAgICAgIGZvciAoaSA9IDE7IGkgPCBtb21lbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIGlmICghbW9tZW50c1tpXS5pc1ZhbGlkKCkgfHwgbW9tZW50c1tpXVtmbl0ocmVzKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzID0gbW9tZW50c1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IFVzZSBbXS5zb3J0IGluc3RlYWQ/XHJcbiAgICBmdW5jdGlvbiBtaW4gKCkge1xyXG4gICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gcGlja0J5KCdpc0JlZm9yZScsIGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1heCAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XHJcblxyXG4gICAgICAgIHJldHVybiBwaWNrQnkoJ2lzQWZ0ZXInLCBhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbm93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBEYXRlLm5vdyA/IERhdGUubm93KCkgOiArKG5ldyBEYXRlKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3JkZXJpbmcgPSBbJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLCAnbWlsbGlzZWNvbmQnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBpc0R1cmF0aW9uVmFsaWQobSkge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBtKSB7XHJcbiAgICAgICAgICAgIGlmICghKGluZGV4T2YuY2FsbChvcmRlcmluZywga2V5KSAhPT0gLTEgJiYgKG1ba2V5XSA9PSBudWxsIHx8ICFpc05hTihtW2tleV0pKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHVuaXRIYXNEZWNpbWFsID0gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvcmRlcmluZy5sZW5ndGg7ICsraSkge1xyXG4gICAgICAgICAgICBpZiAobVtvcmRlcmluZ1tpXV0pIHtcclxuICAgICAgICAgICAgICAgIGlmICh1bml0SGFzRGVjaW1hbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gb25seSBhbGxvdyBub24taW50ZWdlcnMgZm9yIHNtYWxsZXN0IHVuaXRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUZsb2F0KG1bb3JkZXJpbmdbaV1dKSAhPT0gdG9JbnQobVtvcmRlcmluZ1tpXV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5pdEhhc0RlY2ltYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1ZhbGlkJDEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlSW52YWxpZCQxKCkge1xyXG4gICAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbihOYU4pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIER1cmF0aW9uIChkdXJhdGlvbikge1xyXG4gICAgICAgIHZhciBub3JtYWxpemVkSW5wdXQgPSBub3JtYWxpemVPYmplY3RVbml0cyhkdXJhdGlvbiksXHJcbiAgICAgICAgICAgIHllYXJzID0gbm9ybWFsaXplZElucHV0LnllYXIgfHwgMCxcclxuICAgICAgICAgICAgcXVhcnRlcnMgPSBub3JtYWxpemVkSW5wdXQucXVhcnRlciB8fCAwLFxyXG4gICAgICAgICAgICBtb250aHMgPSBub3JtYWxpemVkSW5wdXQubW9udGggfHwgMCxcclxuICAgICAgICAgICAgd2Vla3MgPSBub3JtYWxpemVkSW5wdXQud2VlayB8fCAwLFxyXG4gICAgICAgICAgICBkYXlzID0gbm9ybWFsaXplZElucHV0LmRheSB8fCAwLFxyXG4gICAgICAgICAgICBob3VycyA9IG5vcm1hbGl6ZWRJbnB1dC5ob3VyIHx8IDAsXHJcbiAgICAgICAgICAgIG1pbnV0ZXMgPSBub3JtYWxpemVkSW5wdXQubWludXRlIHx8IDAsXHJcbiAgICAgICAgICAgIHNlY29uZHMgPSBub3JtYWxpemVkSW5wdXQuc2Vjb25kIHx8IDAsXHJcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IG5vcm1hbGl6ZWRJbnB1dC5taWxsaXNlY29uZCB8fCAwO1xyXG5cclxuICAgICAgICB0aGlzLl9pc1ZhbGlkID0gaXNEdXJhdGlvblZhbGlkKG5vcm1hbGl6ZWRJbnB1dCk7XHJcblxyXG4gICAgICAgIC8vIHJlcHJlc2VudGF0aW9uIGZvciBkYXRlQWRkUmVtb3ZlXHJcbiAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzID0gK21pbGxpc2Vjb25kcyArXHJcbiAgICAgICAgICAgIHNlY29uZHMgKiAxZTMgKyAvLyAxMDAwXHJcbiAgICAgICAgICAgIG1pbnV0ZXMgKiA2ZTQgKyAvLyAxMDAwICogNjBcclxuICAgICAgICAgICAgaG91cnMgKiAxMDAwICogNjAgKiA2MDsgLy91c2luZyAxMDAwICogNjAgKiA2MCBpbnN0ZWFkIG9mIDM2ZTUgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgcm91bmRpbmcgZXJyb3JzIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8yOTc4XHJcbiAgICAgICAgLy8gQmVjYXVzZSBvZiBkYXRlQWRkUmVtb3ZlIHRyZWF0cyAyNCBob3VycyBhcyBkaWZmZXJlbnQgZnJvbSBhXHJcbiAgICAgICAgLy8gZGF5IHdoZW4gd29ya2luZyBhcm91bmQgRFNULCB3ZSBuZWVkIHRvIHN0b3JlIHRoZW0gc2VwYXJhdGVseVxyXG4gICAgICAgIHRoaXMuX2RheXMgPSArZGF5cyArXHJcbiAgICAgICAgICAgIHdlZWtzICogNztcclxuICAgICAgICAvLyBJdCBpcyBpbXBvc3NpYmxlIHRvIHRyYW5zbGF0ZSBtb250aHMgaW50byBkYXlzIHdpdGhvdXQga25vd2luZ1xyXG4gICAgICAgIC8vIHdoaWNoIG1vbnRocyB5b3UgYXJlIGFyZSB0YWxraW5nIGFib3V0LCBzbyB3ZSBoYXZlIHRvIHN0b3JlXHJcbiAgICAgICAgLy8gaXQgc2VwYXJhdGVseS5cclxuICAgICAgICB0aGlzLl9tb250aHMgPSArbW9udGhzICtcclxuICAgICAgICAgICAgcXVhcnRlcnMgKiAzICtcclxuICAgICAgICAgICAgeWVhcnMgKiAxMjtcclxuXHJcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLl9sb2NhbGUgPSBnZXRMb2NhbGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fYnViYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNEdXJhdGlvbiAob2JqKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIER1cmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFic1JvdW5kIChudW1iZXIpIHtcclxuICAgICAgICBpZiAobnVtYmVyIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgtMSAqIG51bWJlcikgKiAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgZnVuY3Rpb24gb2Zmc2V0ICh0b2tlbiwgc2VwYXJhdG9yKSB7XHJcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4odG9rZW4sIDAsIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMudXRjT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgIHZhciBzaWduID0gJysnO1xyXG4gICAgICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcclxuICAgICAgICAgICAgICAgIHNpZ24gPSAnLSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHNpZ24gKyB6ZXJvRmlsbCh+fihvZmZzZXQgLyA2MCksIDIpICsgc2VwYXJhdG9yICsgemVyb0ZpbGwofn4ob2Zmc2V0KSAlIDYwLCAyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvZmZzZXQoJ1onLCAnOicpO1xyXG4gICAgb2Zmc2V0KCdaWicsICcnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbignWicsICBtYXRjaFNob3J0T2Zmc2V0KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1paJywgbWF0Y2hTaG9ydE9mZnNldCk7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsnWicsICdaWiddLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX3VzZVVUQyA9IHRydWU7XHJcbiAgICAgICAgY29uZmlnLl90em0gPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEhFTFBFUlNcclxuXHJcbiAgICAvLyB0aW1lem9uZSBjaHVua2VyXHJcbiAgICAvLyAnKzEwOjAwJyA+IFsnMTAnLCAgJzAwJ11cclxuICAgIC8vICctMTUzMCcgID4gWyctMTUnLCAnMzAnXVxyXG4gICAgdmFyIGNodW5rT2Zmc2V0ID0gLyhbXFwrXFwtXXxcXGRcXGQpL2dpO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9mZnNldEZyb21TdHJpbmcobWF0Y2hlciwgc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIG1hdGNoZXMgPSAoc3RyaW5nIHx8ICcnKS5tYXRjaChtYXRjaGVyKTtcclxuXHJcbiAgICAgICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2h1bmsgICA9IG1hdGNoZXNbbWF0Y2hlcy5sZW5ndGggLSAxXSB8fCBbXTtcclxuICAgICAgICB2YXIgcGFydHMgICA9IChjaHVuayArICcnKS5tYXRjaChjaHVua09mZnNldCkgfHwgWyctJywgMCwgMF07XHJcbiAgICAgICAgdmFyIG1pbnV0ZXMgPSArKHBhcnRzWzFdICogNjApICsgdG9JbnQocGFydHNbMl0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbWludXRlcyA9PT0gMCA/XHJcbiAgICAgICAgICAwIDpcclxuICAgICAgICAgIHBhcnRzWzBdID09PSAnKycgPyBtaW51dGVzIDogLW1pbnV0ZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmV0dXJuIGEgbW9tZW50IGZyb20gaW5wdXQsIHRoYXQgaXMgbG9jYWwvdXRjL3pvbmUgZXF1aXZhbGVudCB0byBtb2RlbC5cclxuICAgIGZ1bmN0aW9uIGNsb25lV2l0aE9mZnNldChpbnB1dCwgbW9kZWwpIHtcclxuICAgICAgICB2YXIgcmVzLCBkaWZmO1xyXG4gICAgICAgIGlmIChtb2RlbC5faXNVVEMpIHtcclxuICAgICAgICAgICAgcmVzID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgZGlmZiA9IChpc01vbWVudChpbnB1dCkgfHwgaXNEYXRlKGlucHV0KSA/IGlucHV0LnZhbHVlT2YoKSA6IGNyZWF0ZUxvY2FsKGlucHV0KS52YWx1ZU9mKCkpIC0gcmVzLnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgLy8gVXNlIGxvdy1sZXZlbCBhcGksIGJlY2F1c2UgdGhpcyBmbiBpcyBsb3ctbGV2ZWwgYXBpLlxyXG4gICAgICAgICAgICByZXMuX2Quc2V0VGltZShyZXMuX2QudmFsdWVPZigpICsgZGlmZik7XHJcbiAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldChyZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwoaW5wdXQpLmxvY2FsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldERhdGVPZmZzZXQgKG0pIHtcclxuICAgICAgICAvLyBPbiBGaXJlZm94LjI0IERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyBhIGZsb2F0aW5nIHBvaW50LlxyXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L3B1bGwvMTg3MVxyXG4gICAgICAgIHJldHVybiAtTWF0aC5yb3VuZChtLl9kLmdldFRpbWV6b25lT2Zmc2V0KCkgLyAxNSkgKiAxNTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIT09LU1xyXG5cclxuICAgIC8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgd2hlbmV2ZXIgYSBtb21lbnQgaXMgbXV0YXRlZC5cclxuICAgIC8vIEl0IGlzIGludGVuZGVkIHRvIGtlZXAgdGhlIG9mZnNldCBpbiBzeW5jIHdpdGggdGhlIHRpbWV6b25lLlxyXG4gICAgaG9va3MudXBkYXRlT2Zmc2V0ID0gZnVuY3Rpb24gKCkge307XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIC8vIGtlZXBMb2NhbFRpbWUgPSB0cnVlIG1lYW5zIG9ubHkgY2hhbmdlIHRoZSB0aW1lem9uZSwgd2l0aG91dFxyXG4gICAgLy8gYWZmZWN0aW5nIHRoZSBsb2NhbCBob3VyLiBTbyA1OjMxOjI2ICswMzAwIC0tW3V0Y09mZnNldCgyLCB0cnVlKV0tLT5cclxuICAgIC8vIDU6MzE6MjYgKzAyMDAgSXQgaXMgcG9zc2libGUgdGhhdCA1OjMxOjI2IGRvZXNuJ3QgZXhpc3Qgd2l0aCBvZmZzZXRcclxuICAgIC8vICswMjAwLCBzbyB3ZSBhZGp1c3QgdGhlIHRpbWUgYXMgbmVlZGVkLCB0byBiZSB2YWxpZC5cclxuICAgIC8vXHJcbiAgICAvLyBLZWVwaW5nIHRoZSB0aW1lIGFjdHVhbGx5IGFkZHMvc3VidHJhY3RzIChvbmUgaG91cilcclxuICAgIC8vIGZyb20gdGhlIGFjdHVhbCByZXByZXNlbnRlZCB0aW1lLiBUaGF0IGlzIHdoeSB3ZSBjYWxsIHVwZGF0ZU9mZnNldFxyXG4gICAgLy8gYSBzZWNvbmQgdGltZS4gSW4gY2FzZSBpdCB3YW50cyB1cyB0byBjaGFuZ2UgdGhlIG9mZnNldCBhZ2FpblxyXG4gICAgLy8gX2NoYW5nZUluUHJvZ3Jlc3MgPT0gdHJ1ZSBjYXNlLCB0aGVuIHdlIGhhdmUgdG8gYWRqdXN0LCBiZWNhdXNlXHJcbiAgICAvLyB0aGVyZSBpcyBubyBzdWNoIHRpbWUgaW4gdGhlIGdpdmVuIHRpbWV6b25lLlxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0T2Zmc2V0IChpbnB1dCwga2VlcExvY2FsVGltZSwga2VlcE1pbnV0ZXMpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5fb2Zmc2V0IHx8IDAsXHJcbiAgICAgICAgICAgIGxvY2FsQWRqdXN0O1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0ICE9IG51bGwgPyB0aGlzIDogTmFOO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBvZmZzZXRGcm9tU3RyaW5nKG1hdGNoU2hvcnRPZmZzZXQsIGlucHV0KTtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGlucHV0KSA8IDE2ICYmICFrZWVwTWludXRlcykge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dCAqIDYwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNVVEMgJiYga2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxBZGp1c3QgPSBnZXREYXRlT2Zmc2V0KHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX29mZnNldCA9IGlucHV0O1xyXG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbEFkanVzdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChsb2NhbEFkanVzdCwgJ20nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2Zmc2V0ICE9PSBpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFrZWVwTG9jYWxUaW1lIHx8IHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGRTdWJ0cmFjdCh0aGlzLCBjcmVhdGVEdXJhdGlvbihpbnB1dCAtIG9mZnNldCwgJ20nKSwgMSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5fY2hhbmdlSW5Qcm9ncmVzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZUluUHJvZ3Jlc3MgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGhvb2tzLnVwZGF0ZU9mZnNldCh0aGlzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VJblByb2dyZXNzID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNVVEMgPyBvZmZzZXQgOiBnZXREYXRlT2Zmc2V0KHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRab25lIChpbnB1dCwga2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgIGlmIChpbnB1dCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IC1pbnB1dDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoaW5wdXQsIGtlZXBMb2NhbFRpbWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIC10aGlzLnV0Y09mZnNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1VUQyAoa2VlcExvY2FsVGltZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnV0Y09mZnNldCgwLCBrZWVwTG9jYWxUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb0xvY2FsIChrZWVwTG9jYWxUaW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzVVRDKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KDAsIGtlZXBMb2NhbFRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9pc1VUQyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGtlZXBMb2NhbFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VidHJhY3QoZ2V0RGF0ZU9mZnNldCh0aGlzKSwgJ20nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRPZmZzZXRUb1BhcnNlZE9mZnNldCAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R6bSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXRjT2Zmc2V0KHRoaXMuX3R6bSwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuX2kgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHZhciB0Wm9uZSA9IG9mZnNldEZyb21TdHJpbmcobWF0Y2hPZmZzZXQsIHRoaXMuX2kpO1xyXG4gICAgICAgICAgICBpZiAodFpvbmUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQodFpvbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFzQWxpZ25lZEhvdXJPZmZzZXQgKGlucHV0KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlucHV0ID0gaW5wdXQgPyBjcmVhdGVMb2NhbChpbnB1dCkudXRjT2Zmc2V0KCkgOiAwO1xyXG5cclxuICAgICAgICByZXR1cm4gKHRoaXMudXRjT2Zmc2V0KCkgLSBpbnB1dCkgJSA2MCA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy51dGNPZmZzZXQoKSA+IHRoaXMuY2xvbmUoKS5tb250aCgwKS51dGNPZmZzZXQoKSB8fFxyXG4gICAgICAgICAgICB0aGlzLnV0Y09mZnNldCgpID4gdGhpcy5jbG9uZSgpLm1vbnRoKDUpLnV0Y09mZnNldCgpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQgKCkge1xyXG4gICAgICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5faXNEU1RTaGlmdGVkKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGMgPSB7fTtcclxuXHJcbiAgICAgICAgY29weUNvbmZpZyhjLCB0aGlzKTtcclxuICAgICAgICBjID0gcHJlcGFyZUNvbmZpZyhjKTtcclxuXHJcbiAgICAgICAgaWYgKGMuX2EpIHtcclxuICAgICAgICAgICAgdmFyIG90aGVyID0gYy5faXNVVEMgPyBjcmVhdGVVVEMoYy5fYSkgOiBjcmVhdGVMb2NhbChjLl9hKTtcclxuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gdGhpcy5pc1ZhbGlkKCkgJiZcclxuICAgICAgICAgICAgICAgIGNvbXBhcmVBcnJheXMoYy5fYSwgb3RoZXIudG9BcnJheSgpKSA+IDA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5faXNEU1RTaGlmdGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5faXNEU1RTaGlmdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTG9jYWwgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWQoKSA/ICF0aGlzLl9pc1VUQyA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVXRjT2Zmc2V0ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzVXRjICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9pc1VUQyAmJiB0aGlzLl9vZmZzZXQgPT09IDAgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBU1AuTkVUIGpzb24gZGF0ZSBmb3JtYXQgcmVnZXhcclxuICAgIHZhciBhc3BOZXRSZWdleCA9IC9eKFxcLXxcXCspPyg/OihcXGQqKVsuIF0pPyhcXGQrKVxcOihcXGQrKSg/OlxcOihcXGQrKShcXC5cXGQqKT8pPyQvO1xyXG5cclxuICAgIC8vIGZyb20gaHR0cDovL2RvY3MuY2xvc3VyZS1saWJyYXJ5Lmdvb2dsZWNvZGUuY29tL2dpdC9jbG9zdXJlX2dvb2dfZGF0ZV9kYXRlLmpzLnNvdXJjZS5odG1sXHJcbiAgICAvLyBzb21ld2hhdCBtb3JlIGluIGxpbmUgd2l0aCA0LjQuMy4yIDIwMDQgc3BlYywgYnV0IGFsbG93cyBkZWNpbWFsIGFueXdoZXJlXHJcbiAgICAvLyBhbmQgZnVydGhlciBtb2RpZmllZCB0byBhbGxvdyBmb3Igc3RyaW5ncyBjb250YWluaW5nIGJvdGggd2VlayBhbmQgZGF5XHJcbiAgICB2YXIgaXNvUmVnZXggPSAvXigtfFxcKyk/UCg/OihbLStdP1swLTksLl0qKVkpPyg/OihbLStdP1swLTksLl0qKU0pPyg/OihbLStdP1swLTksLl0qKVcpPyg/OihbLStdP1swLTksLl0qKUQpPyg/OlQoPzooWy0rXT9bMC05LC5dKilIKT8oPzooWy0rXT9bMC05LC5dKilNKT8oPzooWy0rXT9bMC05LC5dKilTKT8pPyQvO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUR1cmF0aW9uIChpbnB1dCwga2V5KSB7XHJcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gaW5wdXQsXHJcbiAgICAgICAgICAgIC8vIG1hdGNoaW5nIGFnYWluc3QgcmVnZXhwIGlzIGV4cGVuc2l2ZSwgZG8gaXQgb24gZGVtYW5kXHJcbiAgICAgICAgICAgIG1hdGNoID0gbnVsbCxcclxuICAgICAgICAgICAgc2lnbixcclxuICAgICAgICAgICAgcmV0LFxyXG4gICAgICAgICAgICBkaWZmUmVzO1xyXG5cclxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBtcyA6IGlucHV0Ll9taWxsaXNlY29uZHMsXHJcbiAgICAgICAgICAgICAgICBkICA6IGlucHV0Ll9kYXlzLFxyXG4gICAgICAgICAgICAgICAgTSAgOiBpbnB1dC5fbW9udGhzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc051bWJlcihpbnB1dCkpIHtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcclxuICAgICAgICAgICAgaWYgKGtleSkge1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb25ba2V5XSA9IGlucHV0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZHVyYXRpb24ubWlsbGlzZWNvbmRzID0gaW5wdXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCEhKG1hdGNoID0gYXNwTmV0UmVnZXguZXhlYyhpbnB1dCkpKSB7XHJcbiAgICAgICAgICAgIHNpZ24gPSAobWF0Y2hbMV0gPT09ICctJykgPyAtMSA6IDE7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeSAgOiAwLFxyXG4gICAgICAgICAgICAgICAgZCAgOiB0b0ludChtYXRjaFtEQVRFXSkgICAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgaCAgOiB0b0ludChtYXRjaFtIT1VSXSkgICAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgbSAgOiB0b0ludChtYXRjaFtNSU5VVEVdKSAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgcyAgOiB0b0ludChtYXRjaFtTRUNPTkRdKSAgICAgICAgICAgICAgICAgICAgICAgKiBzaWduLFxyXG4gICAgICAgICAgICAgICAgbXMgOiB0b0ludChhYnNSb3VuZChtYXRjaFtNSUxMSVNFQ09ORF0gKiAxMDAwKSkgKiBzaWduIC8vIHRoZSBtaWxsaXNlY29uZCBkZWNpbWFsIHBvaW50IGlzIGluY2x1ZGVkIGluIHRoZSBtYXRjaFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoISEobWF0Y2ggPSBpc29SZWdleC5leGVjKGlucHV0KSkpIHtcclxuICAgICAgICAgICAgc2lnbiA9IChtYXRjaFsxXSA9PT0gJy0nKSA/IC0xIDogKG1hdGNoWzFdID09PSAnKycpID8gMSA6IDE7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeSA6IHBhcnNlSXNvKG1hdGNoWzJdLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIE0gOiBwYXJzZUlzbyhtYXRjaFszXSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICB3IDogcGFyc2VJc28obWF0Y2hbNF0sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgZCA6IHBhcnNlSXNvKG1hdGNoWzVdLCBzaWduKSxcclxuICAgICAgICAgICAgICAgIGggOiBwYXJzZUlzbyhtYXRjaFs2XSwgc2lnbiksXHJcbiAgICAgICAgICAgICAgICBtIDogcGFyc2VJc28obWF0Y2hbN10sIHNpZ24pLFxyXG4gICAgICAgICAgICAgICAgcyA6IHBhcnNlSXNvKG1hdGNoWzhdLCBzaWduKVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZHVyYXRpb24gPT0gbnVsbCkgey8vIGNoZWNrcyBmb3IgbnVsbCBvciB1bmRlZmluZWRcclxuICAgICAgICAgICAgZHVyYXRpb24gPSB7fTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ29iamVjdCcgJiYgKCdmcm9tJyBpbiBkdXJhdGlvbiB8fCAndG8nIGluIGR1cmF0aW9uKSkge1xyXG4gICAgICAgICAgICBkaWZmUmVzID0gbW9tZW50c0RpZmZlcmVuY2UoY3JlYXRlTG9jYWwoZHVyYXRpb24uZnJvbSksIGNyZWF0ZUxvY2FsKGR1cmF0aW9uLnRvKSk7XHJcblxyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IHt9O1xyXG4gICAgICAgICAgICBkdXJhdGlvbi5tcyA9IGRpZmZSZXMubWlsbGlzZWNvbmRzO1xyXG4gICAgICAgICAgICBkdXJhdGlvbi5NID0gZGlmZlJlcy5tb250aHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXQgPSBuZXcgRHVyYXRpb24oZHVyYXRpb24pO1xyXG5cclxuICAgICAgICBpZiAoaXNEdXJhdGlvbihpbnB1dCkgJiYgaGFzT3duUHJvcChpbnB1dCwgJ19sb2NhbGUnKSkge1xyXG4gICAgICAgICAgICByZXQuX2xvY2FsZSA9IGlucHV0Ll9sb2NhbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUR1cmF0aW9uLmZuID0gRHVyYXRpb24ucHJvdG90eXBlO1xyXG4gICAgY3JlYXRlRHVyYXRpb24uaW52YWxpZCA9IGNyZWF0ZUludmFsaWQkMTtcclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUlzbyAoaW5wLCBzaWduKSB7XHJcbiAgICAgICAgLy8gV2UnZCBub3JtYWxseSB1c2Ugfn5pbnAgZm9yIHRoaXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IGl0IGFsc29cclxuICAgICAgICAvLyBjb252ZXJ0cyBmbG9hdHMgdG8gaW50cy5cclxuICAgICAgICAvLyBpbnAgbWF5IGJlIHVuZGVmaW5lZCwgc28gY2FyZWZ1bCBjYWxsaW5nIHJlcGxhY2Ugb24gaXQuXHJcbiAgICAgICAgdmFyIHJlcyA9IGlucCAmJiBwYXJzZUZsb2F0KGlucC5yZXBsYWNlKCcsJywgJy4nKSk7XHJcbiAgICAgICAgLy8gYXBwbHkgc2lnbiB3aGlsZSB3ZSdyZSBhdCBpdFxyXG4gICAgICAgIHJldHVybiAoaXNOYU4ocmVzKSA/IDAgOiByZXMpICogc2lnbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwb3NpdGl2ZU1vbWVudHNEaWZmZXJlbmNlKGJhc2UsIG90aGVyKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHttaWxsaXNlY29uZHM6IDAsIG1vbnRoczogMH07XHJcblxyXG4gICAgICAgIHJlcy5tb250aHMgPSBvdGhlci5tb250aCgpIC0gYmFzZS5tb250aCgpICtcclxuICAgICAgICAgICAgKG90aGVyLnllYXIoKSAtIGJhc2UueWVhcigpKSAqIDEyO1xyXG4gICAgICAgIGlmIChiYXNlLmNsb25lKCkuYWRkKHJlcy5tb250aHMsICdNJykuaXNBZnRlcihvdGhlcikpIHtcclxuICAgICAgICAgICAgLS1yZXMubW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzLm1pbGxpc2Vjb25kcyA9ICtvdGhlciAtICsoYmFzZS5jbG9uZSgpLmFkZChyZXMubW9udGhzLCAnTScpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcikge1xyXG4gICAgICAgIHZhciByZXM7XHJcbiAgICAgICAgaWYgKCEoYmFzZS5pc1ZhbGlkKCkgJiYgb3RoZXIuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4ge21pbGxpc2Vjb25kczogMCwgbW9udGhzOiAwfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG90aGVyID0gY2xvbmVXaXRoT2Zmc2V0KG90aGVyLCBiYXNlKTtcclxuICAgICAgICBpZiAoYmFzZS5pc0JlZm9yZShvdGhlcikpIHtcclxuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShiYXNlLCBvdGhlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzID0gcG9zaXRpdmVNb21lbnRzRGlmZmVyZW5jZShvdGhlciwgYmFzZSk7XHJcbiAgICAgICAgICAgIHJlcy5taWxsaXNlY29uZHMgPSAtcmVzLm1pbGxpc2Vjb25kcztcclxuICAgICAgICAgICAgcmVzLm1vbnRocyA9IC1yZXMubW9udGhzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiByZW1vdmUgJ25hbWUnIGFyZyBhZnRlciBkZXByZWNhdGlvbiBpcyByZW1vdmVkXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVBZGRlcihkaXJlY3Rpb24sIG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHZhbCwgcGVyaW9kKSB7XHJcbiAgICAgICAgICAgIHZhciBkdXIsIHRtcDtcclxuICAgICAgICAgICAgLy9pbnZlcnQgdGhlIGFyZ3VtZW50cywgYnV0IGNvbXBsYWluIGFib3V0IGl0XHJcbiAgICAgICAgICAgIGlmIChwZXJpb2QgIT09IG51bGwgJiYgIWlzTmFOKCtwZXJpb2QpKSB7XHJcbiAgICAgICAgICAgICAgICBkZXByZWNhdGVTaW1wbGUobmFtZSwgJ21vbWVudCgpLicgKyBuYW1lICArICcocGVyaW9kLCBudW1iZXIpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgbW9tZW50KCkuJyArIG5hbWUgKyAnKG51bWJlciwgcGVyaW9kKS4gJyArXHJcbiAgICAgICAgICAgICAgICAnU2VlIGh0dHA6Ly9tb21lbnRqcy5jb20vZ3VpZGVzLyMvd2FybmluZ3MvYWRkLWludmVydGVkLXBhcmFtLyBmb3IgbW9yZSBpbmZvLicpO1xyXG4gICAgICAgICAgICAgICAgdG1wID0gdmFsOyB2YWwgPSBwZXJpb2Q7IHBlcmlvZCA9IHRtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFsID0gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgPyArdmFsIDogdmFsO1xyXG4gICAgICAgICAgICBkdXIgPSBjcmVhdGVEdXJhdGlvbih2YWwsIHBlcmlvZCk7XHJcbiAgICAgICAgICAgIGFkZFN1YnRyYWN0KHRoaXMsIGR1ciwgZGlyZWN0aW9uKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTdWJ0cmFjdCAobW9tLCBkdXJhdGlvbiwgaXNBZGRpbmcsIHVwZGF0ZU9mZnNldCkge1xyXG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzLFxyXG4gICAgICAgICAgICBkYXlzID0gYWJzUm91bmQoZHVyYXRpb24uX2RheXMpLFxyXG4gICAgICAgICAgICBtb250aHMgPSBhYnNSb3VuZChkdXJhdGlvbi5fbW9udGhzKTtcclxuXHJcbiAgICAgICAgaWYgKCFtb20uaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIG9wXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZU9mZnNldCA9IHVwZGF0ZU9mZnNldCA9PSBudWxsID8gdHJ1ZSA6IHVwZGF0ZU9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKG1vbnRocykge1xyXG4gICAgICAgICAgICBzZXRNb250aChtb20sIGdldChtb20sICdNb250aCcpICsgbW9udGhzICogaXNBZGRpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZGF5cykge1xyXG4gICAgICAgICAgICBzZXQkMShtb20sICdEYXRlJywgZ2V0KG1vbSwgJ0RhdGUnKSArIGRheXMgKiBpc0FkZGluZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtaWxsaXNlY29uZHMpIHtcclxuICAgICAgICAgICAgbW9tLl9kLnNldFRpbWUobW9tLl9kLnZhbHVlT2YoKSArIG1pbGxpc2Vjb25kcyAqIGlzQWRkaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVwZGF0ZU9mZnNldCkge1xyXG4gICAgICAgICAgICBob29rcy51cGRhdGVPZmZzZXQobW9tLCBkYXlzIHx8IG1vbnRocyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBhZGQgICAgICA9IGNyZWF0ZUFkZGVyKDEsICdhZGQnKTtcclxuICAgIHZhciBzdWJ0cmFjdCA9IGNyZWF0ZUFkZGVyKC0xLCAnc3VidHJhY3QnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRDYWxlbmRhckZvcm1hdChteU1vbWVudCwgbm93KSB7XHJcbiAgICAgICAgdmFyIGRpZmYgPSBteU1vbWVudC5kaWZmKG5vdywgJ2RheXMnLCB0cnVlKTtcclxuICAgICAgICByZXR1cm4gZGlmZiA8IC02ID8gJ3NhbWVFbHNlJyA6XHJcbiAgICAgICAgICAgICAgICBkaWZmIDwgLTEgPyAnbGFzdFdlZWsnIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCAwID8gJ2xhc3REYXknIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCAxID8gJ3NhbWVEYXknIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCAyID8gJ25leHREYXknIDpcclxuICAgICAgICAgICAgICAgIGRpZmYgPCA3ID8gJ25leHRXZWVrJyA6ICdzYW1lRWxzZSc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsZW5kYXIkMSAodGltZSwgZm9ybWF0cykge1xyXG4gICAgICAgIC8vIFdlIHdhbnQgdG8gY29tcGFyZSB0aGUgc3RhcnQgb2YgdG9kYXksIHZzIHRoaXMuXHJcbiAgICAgICAgLy8gR2V0dGluZyBzdGFydC1vZi10b2RheSBkZXBlbmRzIG9uIHdoZXRoZXIgd2UncmUgbG9jYWwvdXRjL29mZnNldCBvciBub3QuXHJcbiAgICAgICAgdmFyIG5vdyA9IHRpbWUgfHwgY3JlYXRlTG9jYWwoKSxcclxuICAgICAgICAgICAgc29kID0gY2xvbmVXaXRoT2Zmc2V0KG5vdywgdGhpcykuc3RhcnRPZignZGF5JyksXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGhvb2tzLmNhbGVuZGFyRm9ybWF0KHRoaXMsIHNvZCkgfHwgJ3NhbWVFbHNlJztcclxuXHJcbiAgICAgICAgdmFyIG91dHB1dCA9IGZvcm1hdHMgJiYgKGlzRnVuY3Rpb24oZm9ybWF0c1tmb3JtYXRdKSA/IGZvcm1hdHNbZm9ybWF0XS5jYWxsKHRoaXMsIG5vdykgOiBmb3JtYXRzW2Zvcm1hdF0pO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQob3V0cHV0IHx8IHRoaXMubG9jYWxlRGF0YSgpLmNhbGVuZGFyKGZvcm1hdCwgdGhpcywgY3JlYXRlTG9jYWwobm93KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb25lICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1vbWVudCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0FmdGVyIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpO1xyXG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA+IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBsb2NhbElucHV0LnZhbHVlT2YoKSA8IHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICB2YXIgbG9jYWxJbnB1dCA9IGlzTW9tZW50KGlucHV0KSA/IGlucHV0IDogY3JlYXRlTG9jYWwoaW5wdXQpO1xyXG4gICAgICAgIGlmICghKHRoaXMuaXNWYWxpZCgpICYmIGxvY2FsSW5wdXQuaXNWYWxpZCgpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVuaXRzID0gbm9ybWFsaXplVW5pdHMoIWlzVW5kZWZpbmVkKHVuaXRzKSA/IHVuaXRzIDogJ21pbGxpc2Vjb25kJyk7XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnbWlsbGlzZWNvbmQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuZW5kT2YodW5pdHMpLnZhbHVlT2YoKSA8IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0JldHdlZW4gKGZyb20sIHRvLCB1bml0cywgaW5jbHVzaXZpdHkpIHtcclxuICAgICAgICBpbmNsdXNpdml0eSA9IGluY2x1c2l2aXR5IHx8ICcoKSc7XHJcbiAgICAgICAgcmV0dXJuIChpbmNsdXNpdml0eVswXSA9PT0gJygnID8gdGhpcy5pc0FmdGVyKGZyb20sIHVuaXRzKSA6ICF0aGlzLmlzQmVmb3JlKGZyb20sIHVuaXRzKSkgJiZcclxuICAgICAgICAgICAgKGluY2x1c2l2aXR5WzFdID09PSAnKScgPyB0aGlzLmlzQmVmb3JlKHRvLCB1bml0cykgOiAhdGhpcy5pc0FmdGVyKHRvLCB1bml0cykpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzU2FtZSAoaW5wdXQsIHVuaXRzKSB7XHJcbiAgICAgICAgdmFyIGxvY2FsSW5wdXQgPSBpc01vbWVudChpbnB1dCkgPyBpbnB1dCA6IGNyZWF0ZUxvY2FsKGlucHV0KSxcclxuICAgICAgICAgICAgaW5wdXRNcztcclxuICAgICAgICBpZiAoISh0aGlzLmlzVmFsaWQoKSAmJiBsb2NhbElucHV0LmlzVmFsaWQoKSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzIHx8ICdtaWxsaXNlY29uZCcpO1xyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21pbGxpc2Vjb25kJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCkgPT09IGxvY2FsSW5wdXQudmFsdWVPZigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlucHV0TXMgPSBsb2NhbElucHV0LnZhbHVlT2YoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5zdGFydE9mKHVuaXRzKS52YWx1ZU9mKCkgPD0gaW5wdXRNcyAmJiBpbnB1dE1zIDw9IHRoaXMuY2xvbmUoKS5lbmRPZih1bml0cykudmFsdWVPZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1NhbWVPckFmdGVyIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQWZ0ZXIoaW5wdXQsdW5pdHMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzU2FtZU9yQmVmb3JlIChpbnB1dCwgdW5pdHMpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1NhbWUoaW5wdXQsIHVuaXRzKSB8fCB0aGlzLmlzQmVmb3JlKGlucHV0LHVuaXRzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkaWZmIChpbnB1dCwgdW5pdHMsIGFzRmxvYXQpIHtcclxuICAgICAgICB2YXIgdGhhdCxcclxuICAgICAgICAgICAgem9uZURlbHRhLFxyXG4gICAgICAgICAgICBvdXRwdXQ7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoYXQgPSBjbG9uZVdpdGhPZmZzZXQoaW5wdXQsIHRoaXMpO1xyXG5cclxuICAgICAgICBpZiAoIXRoYXQuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYU47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6b25lRGVsdGEgPSAodGhhdC51dGNPZmZzZXQoKSAtIHRoaXMudXRjT2Zmc2V0KCkpICogNmU0O1xyXG5cclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuXHJcbiAgICAgICAgc3dpdGNoICh1bml0cykge1xyXG4gICAgICAgICAgICBjYXNlICd5ZWFyJzogb3V0cHV0ID0gbW9udGhEaWZmKHRoaXMsIHRoYXQpIC8gMTI7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtb250aCc6IG91dHB1dCA9IG1vbnRoRGlmZih0aGlzLCB0aGF0KTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3F1YXJ0ZXInOiBvdXRwdXQgPSBtb250aERpZmYodGhpcywgdGhhdCkgLyAzOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDFlMzsgYnJlYWs7IC8vIDEwMDBcclxuICAgICAgICAgICAgY2FzZSAnbWludXRlJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDZlNDsgYnJlYWs7IC8vIDEwMDAgKiA2MFxyXG4gICAgICAgICAgICBjYXNlICdob3VyJzogb3V0cHV0ID0gKHRoaXMgLSB0aGF0KSAvIDM2ZTU7IGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MFxyXG4gICAgICAgICAgICBjYXNlICdkYXknOiBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gODY0ZTU7IGJyZWFrOyAvLyAxMDAwICogNjAgKiA2MCAqIDI0LCBuZWdhdGUgZHN0XHJcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOiBvdXRwdXQgPSAodGhpcyAtIHRoYXQgLSB6b25lRGVsdGEpIC8gNjA0OGU1OyBicmVhazsgLy8gMTAwMCAqIDYwICogNjAgKiAyNCAqIDcsIG5lZ2F0ZSBkc3RcclxuICAgICAgICAgICAgZGVmYXVsdDogb3V0cHV0ID0gdGhpcyAtIHRoYXQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYXNGbG9hdCA/IG91dHB1dCA6IGFic0Zsb29yKG91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9udGhEaWZmIChhLCBiKSB7XHJcbiAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBtb250aHNcclxuICAgICAgICB2YXIgd2hvbGVNb250aERpZmYgPSAoKGIueWVhcigpIC0gYS55ZWFyKCkpICogMTIpICsgKGIubW9udGgoKSAtIGEubW9udGgoKSksXHJcbiAgICAgICAgICAgIC8vIGIgaXMgaW4gKGFuY2hvciAtIDEgbW9udGgsIGFuY2hvciArIDEgbW9udGgpXHJcbiAgICAgICAgICAgIGFuY2hvciA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYsICdtb250aHMnKSxcclxuICAgICAgICAgICAgYW5jaG9yMiwgYWRqdXN0O1xyXG5cclxuICAgICAgICBpZiAoYiAtIGFuY2hvciA8IDApIHtcclxuICAgICAgICAgICAgYW5jaG9yMiA9IGEuY2xvbmUoKS5hZGQod2hvbGVNb250aERpZmYgLSAxLCAnbW9udGhzJyk7XHJcbiAgICAgICAgICAgIC8vIGxpbmVhciBhY3Jvc3MgdGhlIG1vbnRoXHJcbiAgICAgICAgICAgIGFkanVzdCA9IChiIC0gYW5jaG9yKSAvIChhbmNob3IgLSBhbmNob3IyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbmNob3IyID0gYS5jbG9uZSgpLmFkZCh3aG9sZU1vbnRoRGlmZiArIDEsICdtb250aHMnKTtcclxuICAgICAgICAgICAgLy8gbGluZWFyIGFjcm9zcyB0aGUgbW9udGhcclxuICAgICAgICAgICAgYWRqdXN0ID0gKGIgLSBhbmNob3IpIC8gKGFuY2hvcjIgLSBhbmNob3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9jaGVjayBmb3IgbmVnYXRpdmUgemVybywgcmV0dXJuIHplcm8gaWYgbmVnYXRpdmUgemVyb1xyXG4gICAgICAgIHJldHVybiAtKHdob2xlTW9udGhEaWZmICsgYWRqdXN0KSB8fCAwO1xyXG4gICAgfVxyXG5cclxuICAgIGhvb2tzLmRlZmF1bHRGb3JtYXQgPSAnWVlZWS1NTS1ERFRISDptbTpzc1onO1xyXG4gICAgaG9va3MuZGVmYXVsdEZvcm1hdFV0YyA9ICdZWVlZLU1NLUREVEhIOm1tOnNzW1pdJztcclxuXHJcbiAgICBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5sb2NhbGUoJ2VuJykuZm9ybWF0KCdkZGQgTU1NIEREIFlZWVkgSEg6bW06c3MgW0dNVF1aWicpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvSVNPU3RyaW5nKGtlZXBPZmZzZXQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdXRjID0ga2VlcE9mZnNldCAhPT0gdHJ1ZTtcclxuICAgICAgICB2YXIgbSA9IHV0YyA/IHRoaXMuY2xvbmUoKS51dGMoKSA6IHRoaXM7XHJcbiAgICAgICAgaWYgKG0ueWVhcigpIDwgMCB8fCBtLnllYXIoKSA+IDk5OTkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdE1vbWVudChtLCB1dGMgPyAnWVlZWVlZLU1NLUREW1RdSEg6bW06c3MuU1NTW1pdJyA6ICdZWVlZWVktTU0tRERbVF1ISDptbTpzcy5TU1NaJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nKSkge1xyXG4gICAgICAgICAgICAvLyBuYXRpdmUgaW1wbGVtZW50YXRpb24gaXMgfjUweCBmYXN0ZXIsIHVzZSBpdCB3aGVuIHdlIGNhblxyXG4gICAgICAgICAgICBpZiAodXRjKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b0RhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHRoaXMudmFsdWVPZigpICsgdGhpcy51dGNPZmZzZXQoKSAqIDYwICogMTAwMCkudG9JU09TdHJpbmcoKS5yZXBsYWNlKCdaJywgZm9ybWF0TW9tZW50KG0sICdaJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmb3JtYXRNb21lbnQobSwgdXRjID8gJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NbWl0nIDogJ1lZWVktTU0tRERbVF1ISDptbTpzcy5TU1NaJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm4gYSBodW1hbiByZWFkYWJsZSByZXByZXNlbnRhdGlvbiBvZiBhIG1vbWVudCB0aGF0IGNhblxyXG4gICAgICogYWxzbyBiZSBldmFsdWF0ZWQgdG8gZ2V0IGEgbmV3IG1vbWVudCB3aGljaCBpcyB0aGUgc2FtZVxyXG4gICAgICpcclxuICAgICAqIEBsaW5rIGh0dHBzOi8vbm9kZWpzLm9yZy9kaXN0L2xhdGVzdC9kb2NzL2FwaS91dGlsLmh0bWwjdXRpbF9jdXN0b21faW5zcGVjdF9mdW5jdGlvbl9vbl9vYmplY3RzXHJcbiAgICAgKi9cclxuICAgIGZ1bmN0aW9uIGluc3BlY3QgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdtb21lbnQuaW52YWxpZCgvKiAnICsgdGhpcy5faSArICcgKi8pJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZ1bmMgPSAnbW9tZW50JztcclxuICAgICAgICB2YXIgem9uZSA9ICcnO1xyXG4gICAgICAgIGlmICghdGhpcy5pc0xvY2FsKCkpIHtcclxuICAgICAgICAgICAgZnVuYyA9IHRoaXMudXRjT2Zmc2V0KCkgPT09IDAgPyAnbW9tZW50LnV0YycgOiAnbW9tZW50LnBhcnNlWm9uZSc7XHJcbiAgICAgICAgICAgIHpvbmUgPSAnWic7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcmVmaXggPSAnWycgKyBmdW5jICsgJyhcIl0nO1xyXG4gICAgICAgIHZhciB5ZWFyID0gKDAgPD0gdGhpcy55ZWFyKCkgJiYgdGhpcy55ZWFyKCkgPD0gOTk5OSkgPyAnWVlZWScgOiAnWVlZWVlZJztcclxuICAgICAgICB2YXIgZGF0ZXRpbWUgPSAnLU1NLUREW1RdSEg6bW06c3MuU1NTJztcclxuICAgICAgICB2YXIgc3VmZml4ID0gem9uZSArICdbXCIpXSc7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChwcmVmaXggKyB5ZWFyICsgZGF0ZXRpbWUgKyBzdWZmaXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZvcm1hdCAoaW5wdXRTdHJpbmcpIHtcclxuICAgICAgICBpZiAoIWlucHV0U3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlucHV0U3RyaW5nID0gdGhpcy5pc1V0YygpID8gaG9va3MuZGVmYXVsdEZvcm1hdFV0YyA6IGhvb2tzLmRlZmF1bHRGb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvdXRwdXQgPSBmb3JtYXRNb21lbnQodGhpcywgaW5wdXRTdHJpbmcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5wb3N0Zm9ybWF0KG91dHB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZnJvbSAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxyXG4gICAgICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcclxuICAgICAgICAgICAgICAgICBjcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbih7dG86IHRoaXMsIGZyb206IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmcm9tTm93ICh3aXRob3V0U3VmZml4KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJvbShjcmVhdGVMb2NhbCgpLCB3aXRob3V0U3VmZml4KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0byAodGltZSwgd2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQoKSAmJlxyXG4gICAgICAgICAgICAgICAgKChpc01vbWVudCh0aW1lKSAmJiB0aW1lLmlzVmFsaWQoKSkgfHxcclxuICAgICAgICAgICAgICAgICBjcmVhdGVMb2NhbCh0aW1lKS5pc1ZhbGlkKCkpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVEdXJhdGlvbih7ZnJvbTogdGhpcywgdG86IHRpbWV9KS5sb2NhbGUodGhpcy5sb2NhbGUoKSkuaHVtYW5pemUoIXdpdGhvdXRTdWZmaXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b05vdyAod2l0aG91dFN1ZmZpeCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvKGNyZWF0ZUxvY2FsKCksIHdpdGhvdXRTdWZmaXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIHBhc3NlZCBhIGxvY2FsZSBrZXksIGl0IHdpbGwgc2V0IHRoZSBsb2NhbGUgZm9yIHRoaXNcclxuICAgIC8vIGluc3RhbmNlLiAgT3RoZXJ3aXNlLCBpdCB3aWxsIHJldHVybiB0aGUgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuICAgIC8vIHZhcmlhYmxlcyBmb3IgdGhpcyBpbnN0YW5jZS5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZSAoa2V5KSB7XHJcbiAgICAgICAgdmFyIG5ld0xvY2FsZURhdGE7XHJcblxyXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxlLl9hYmJyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld0xvY2FsZURhdGEgPSBnZXRMb2NhbGUoa2V5KTtcclxuICAgICAgICAgICAgaWYgKG5ld0xvY2FsZURhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxlID0gbmV3TG9jYWxlRGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxhbmcgPSBkZXByZWNhdGUoXHJcbiAgICAgICAgJ21vbWVudCgpLmxhbmcoKSBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkLCB1c2UgbW9tZW50KCkubG9jYWxlRGF0YSgpIHRvIGdldCB0aGUgbGFuZ3VhZ2UgY29uZmlndXJhdGlvbi4gVXNlIG1vbWVudCgpLmxvY2FsZSgpIHRvIGNoYW5nZSBsYW5ndWFnZXMuJyxcclxuICAgICAgICBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGxvY2FsZURhdGEgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sb2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnRPZiAodW5pdHMpIHtcclxuICAgICAgICB1bml0cyA9IG5vcm1hbGl6ZVVuaXRzKHVuaXRzKTtcclxuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIHN3aXRjaCBpbnRlbnRpb25hbGx5IG9taXRzIGJyZWFrIGtleXdvcmRzXHJcbiAgICAgICAgLy8gdG8gdXRpbGl6ZSBmYWxsaW5nIHRocm91Z2ggdGhlIGNhc2VzLlxyXG4gICAgICAgIHN3aXRjaCAodW5pdHMpIHtcclxuICAgICAgICAgICAgY2FzZSAneWVhcic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vbnRoKDApO1xyXG4gICAgICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICAgICAgICBjYXNlICdxdWFydGVyJzpcclxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlKDEpO1xyXG4gICAgICAgICAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqL1xyXG4gICAgICAgICAgICBjYXNlICd3ZWVrJzpcclxuICAgICAgICAgICAgY2FzZSAnaXNvV2Vlayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RheSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3VycygwKTtcclxuICAgICAgICAgICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cclxuICAgICAgICAgICAgY2FzZSAnaG91cic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pbnV0ZXMoMCk7XHJcbiAgICAgICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlY29uZHMoMCk7XHJcbiAgICAgICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXHJcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pbGxpc2Vjb25kcygwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHdlZWtzIGFyZSBhIHNwZWNpYWwgY2FzZVxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3dlZWsnKSB7XHJcbiAgICAgICAgICAgIHRoaXMud2Vla2RheSgwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSAnaXNvV2VlaycpIHtcclxuICAgICAgICAgICAgdGhpcy5pc29XZWVrZGF5KDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gcXVhcnRlcnMgYXJlIGFsc28gc3BlY2lhbFxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ3F1YXJ0ZXInKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9udGgoTWF0aC5mbG9vcih0aGlzLm1vbnRoKCkgLyAzKSAqIDMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZW5kT2YgKHVuaXRzKSB7XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcbiAgICAgICAgaWYgKHVuaXRzID09PSB1bmRlZmluZWQgfHwgdW5pdHMgPT09ICdtaWxsaXNlY29uZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAnZGF0ZScgaXMgYW4gYWxpYXMgZm9yICdkYXknLCBzbyBpdCBzaG91bGQgYmUgY29uc2lkZXJlZCBhcyBzdWNoLlxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ2RhdGUnKSB7XHJcbiAgICAgICAgICAgIHVuaXRzID0gJ2RheSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zdGFydE9mKHVuaXRzKS5hZGQoMSwgKHVuaXRzID09PSAnaXNvV2VlaycgPyAnd2VlaycgOiB1bml0cykpLnN1YnRyYWN0KDEsICdtcycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbHVlT2YgKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kLnZhbHVlT2YoKSAtICgodGhpcy5fb2Zmc2V0IHx8IDApICogNjAwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVuaXggKCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMudmFsdWVPZigpIC8gMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9EYXRlICgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRvQXJyYXkgKCkge1xyXG4gICAgICAgIHZhciBtID0gdGhpcztcclxuICAgICAgICByZXR1cm4gW20ueWVhcigpLCBtLm1vbnRoKCksIG0uZGF0ZSgpLCBtLmhvdXIoKSwgbS5taW51dGUoKSwgbS5zZWNvbmQoKSwgbS5taWxsaXNlY29uZCgpXTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b09iamVjdCAoKSB7XHJcbiAgICAgICAgdmFyIG0gPSB0aGlzO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHllYXJzOiBtLnllYXIoKSxcclxuICAgICAgICAgICAgbW9udGhzOiBtLm1vbnRoKCksXHJcbiAgICAgICAgICAgIGRhdGU6IG0uZGF0ZSgpLFxyXG4gICAgICAgICAgICBob3VyczogbS5ob3VycygpLFxyXG4gICAgICAgICAgICBtaW51dGVzOiBtLm1pbnV0ZXMoKSxcclxuICAgICAgICAgICAgc2Vjb25kczogbS5zZWNvbmRzKCksXHJcbiAgICAgICAgICAgIG1pbGxpc2Vjb25kczogbS5taWxsaXNlY29uZHMoKVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9KU09OICgpIHtcclxuICAgICAgICAvLyBuZXcgRGF0ZShOYU4pLnRvSlNPTigpID09PSBudWxsXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy50b0lTT1N0cmluZygpIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc1ZhbGlkJDIgKCkge1xyXG4gICAgICAgIHJldHVybiBpc1ZhbGlkKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNpbmdGbGFncyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGV4dGVuZCh7fSwgZ2V0UGFyc2luZ0ZsYWdzKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnZhbGlkQXQgKCkge1xyXG4gICAgICAgIHJldHVybiBnZXRQYXJzaW5nRmxhZ3ModGhpcykub3ZlcmZsb3c7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRpb25EYXRhKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGlucHV0OiB0aGlzLl9pLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IHRoaXMuX2YsXHJcbiAgICAgICAgICAgIGxvY2FsZTogdGhpcy5fbG9jYWxlLFxyXG4gICAgICAgICAgICBpc1VUQzogdGhpcy5faXNVVEMsXHJcbiAgICAgICAgICAgIHN0cmljdDogdGhpcy5fc3RyaWN0XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydnZycsIDJdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Vla1llYXIoKSAlIDEwMDtcclxuICAgIH0pO1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKDAsIFsnR0cnLCAyXSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzb1dlZWtZZWFyKCkgJSAxMDA7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGRXZWVrWWVhckZvcm1hdFRva2VuICh0b2tlbiwgZ2V0dGVyKSB7XHJcbiAgICAgICAgYWRkRm9ybWF0VG9rZW4oMCwgW3Rva2VuLCB0b2tlbi5sZW5ndGhdLCAwLCBnZXR0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ2dnZ2cnLCAgICAgJ3dlZWtZZWFyJyk7XHJcbiAgICBhZGRXZWVrWWVhckZvcm1hdFRva2VuKCdnZ2dnZycsICAgICd3ZWVrWWVhcicpO1xyXG4gICAgYWRkV2Vla1llYXJGb3JtYXRUb2tlbignR0dHRycsICAnaXNvV2Vla1llYXInKTtcclxuICAgIGFkZFdlZWtZZWFyRm9ybWF0VG9rZW4oJ0dHR0dHJywgJ2lzb1dlZWtZZWFyJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnd2Vla1llYXInLCAnZ2cnKTtcclxuICAgIGFkZFVuaXRBbGlhcygnaXNvV2Vla1llYXInLCAnR0cnKTtcclxuXHJcbiAgICAvLyBQUklPUklUWVxyXG5cclxuICAgIGFkZFVuaXRQcmlvcml0eSgnd2Vla1llYXInLCAxKTtcclxuICAgIGFkZFVuaXRQcmlvcml0eSgnaXNvV2Vla1llYXInLCAxKTtcclxuXHJcblxyXG4gICAgLy8gUEFSU0lOR1xyXG5cclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0cnLCAgICAgIG1hdGNoU2lnbmVkKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2cnLCAgICAgIG1hdGNoU2lnbmVkKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnJywgICAgIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2cnLCAgIG1hdGNoMXRvNCwgbWF0Y2g0KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0dHR0dHJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ2dnZ2dnJywgIG1hdGNoMXRvNiwgbWF0Y2g2KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnZ2cnLCAnZ2dnZ2cnLCAnR0dHRycsICdHR0dHRyddLCBmdW5jdGlvbiAoaW5wdXQsIHdlZWssIGNvbmZpZywgdG9rZW4pIHtcclxuICAgICAgICB3ZWVrW3Rva2VuLnN1YnN0cigwLCAyKV0gPSB0b0ludChpbnB1dCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRXZWVrUGFyc2VUb2tlbihbJ2dnJywgJ0dHJ10sIGZ1bmN0aW9uIChpbnB1dCwgd2VlaywgY29uZmlnLCB0b2tlbikge1xyXG4gICAgICAgIHdlZWtbdG9rZW5dID0gaG9va3MucGFyc2VUd29EaWdpdFllYXIoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldFdlZWtZZWFyIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCxcclxuICAgICAgICAgICAgICAgIHRoaXMud2VlaygpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy53ZWVrZGF5KCksXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3csXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZURhdGEoKS5fd2Vlay5kb3kpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNldElTT1dlZWtZZWFyIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBnZXRTZXRXZWVrWWVhckhlbHBlci5jYWxsKHRoaXMsXHJcbiAgICAgICAgICAgICAgICBpbnB1dCwgdGhpcy5pc29XZWVrKCksIHRoaXMuaXNvV2Vla2RheSgpLCAxLCA0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRJU09XZWVrc0luWWVhciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCAxLCA0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRXZWVrc0luWWVhciAoKSB7XHJcbiAgICAgICAgdmFyIHdlZWtJbmZvID0gdGhpcy5sb2NhbGVEYXRhKCkuX3dlZWs7XHJcbiAgICAgICAgcmV0dXJuIHdlZWtzSW5ZZWFyKHRoaXMueWVhcigpLCB3ZWVrSW5mby5kb3csIHdlZWtJbmZvLmRveSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2V0V2Vla1llYXJIZWxwZXIoaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KSB7XHJcbiAgICAgICAgdmFyIHdlZWtzVGFyZ2V0O1xyXG4gICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB3ZWVrT2ZZZWFyKHRoaXMsIGRvdywgZG95KS55ZWFyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdlZWtzVGFyZ2V0ID0gd2Vla3NJblllYXIoaW5wdXQsIGRvdywgZG95KTtcclxuICAgICAgICAgICAgaWYgKHdlZWsgPiB3ZWVrc1RhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgd2VlayA9IHdlZWtzVGFyZ2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRXZWVrQWxsLmNhbGwodGhpcywgaW5wdXQsIHdlZWssIHdlZWtkYXksIGRvdywgZG95KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0V2Vla0FsbCh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpIHtcclxuICAgICAgICB2YXIgZGF5T2ZZZWFyRGF0YSA9IGRheU9mWWVhckZyb21XZWVrcyh3ZWVrWWVhciwgd2Vlaywgd2Vla2RheSwgZG93LCBkb3kpLFxyXG4gICAgICAgICAgICBkYXRlID0gY3JlYXRlVVRDRGF0ZShkYXlPZlllYXJEYXRhLnllYXIsIDAsIGRheU9mWWVhckRhdGEuZGF5T2ZZZWFyKTtcclxuXHJcbiAgICAgICAgdGhpcy55ZWFyKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSk7XHJcbiAgICAgICAgdGhpcy5tb250aChkYXRlLmdldFVUQ01vbnRoKCkpO1xyXG4gICAgICAgIHRoaXMuZGF0ZShkYXRlLmdldFVUQ0RhdGUoKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdRJywgMCwgJ1FvJywgJ3F1YXJ0ZXInKTtcclxuXHJcbiAgICAvLyBBTElBU0VTXHJcblxyXG4gICAgYWRkVW5pdEFsaWFzKCdxdWFydGVyJywgJ1EnKTtcclxuXHJcbiAgICAvLyBQUklPUklUWVxyXG5cclxuICAgIGFkZFVuaXRQcmlvcml0eSgncXVhcnRlcicsIDcpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdRJywgbWF0Y2gxKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ1EnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbTU9OVEhdID0gKHRvSW50KGlucHV0KSAtIDEpICogMztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRRdWFydGVyIChpbnB1dCkge1xyXG4gICAgICAgIHJldHVybiBpbnB1dCA9PSBudWxsID8gTWF0aC5jZWlsKCh0aGlzLm1vbnRoKCkgKyAxKSAvIDMpIDogdGhpcy5tb250aCgoaW5wdXQgLSAxKSAqIDMgKyB0aGlzLm1vbnRoKCkgJSAzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ0QnLCBbJ0REJywgMl0sICdEbycsICdkYXRlJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnZGF0ZScsICdEJyk7XHJcblxyXG4gICAgLy8gUFJJT1JJVFlcclxuICAgIGFkZFVuaXRQcmlvcml0eSgnZGF0ZScsIDkpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdEJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdERCcsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlzU3RyaWN0LCBsb2NhbGUpIHtcclxuICAgICAgICAvLyBUT0RPOiBSZW1vdmUgXCJvcmRpbmFsUGFyc2VcIiBmYWxsYmFjayBpbiBuZXh0IG1ham9yIHJlbGVhc2UuXHJcbiAgICAgICAgcmV0dXJuIGlzU3RyaWN0ID9cclxuICAgICAgICAgIChsb2NhbGUuX2RheU9mTW9udGhPcmRpbmFsUGFyc2UgfHwgbG9jYWxlLl9vcmRpbmFsUGFyc2UpIDpcclxuICAgICAgICAgIGxvY2FsZS5fZGF5T2ZNb250aE9yZGluYWxQYXJzZUxlbmllbnQ7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRQYXJzZVRva2VuKFsnRCcsICdERCddLCBEQVRFKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ0RvJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSkge1xyXG4gICAgICAgIGFycmF5W0RBVEVdID0gdG9JbnQoaW5wdXQubWF0Y2gobWF0Y2gxdG8yKVswXSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgdmFyIGdldFNldERheU9mTW9udGggPSBtYWtlR2V0U2V0KCdEYXRlJywgdHJ1ZSk7XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdEREQnLCBbJ0REREQnLCAzXSwgJ0RERG8nLCAnZGF5T2ZZZWFyJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnZGF5T2ZZZWFyJywgJ0RERCcpO1xyXG5cclxuICAgIC8vIFBSSU9SSVRZXHJcbiAgICBhZGRVbml0UHJpb3JpdHkoJ2RheU9mWWVhcicsIDQpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdEREQnLCAgbWF0Y2gxdG8zKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ0REREQnLCBtYXRjaDMpO1xyXG4gICAgYWRkUGFyc2VUb2tlbihbJ0RERCcsICdEREREJ10sIGZ1bmN0aW9uIChpbnB1dCwgYXJyYXksIGNvbmZpZykge1xyXG4gICAgICAgIGNvbmZpZy5fZGF5T2ZZZWFyID0gdG9JbnQoaW5wdXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gSEVMUEVSU1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZXREYXlPZlllYXIgKGlucHV0KSB7XHJcbiAgICAgICAgdmFyIGRheU9mWWVhciA9IE1hdGgucm91bmQoKHRoaXMuY2xvbmUoKS5zdGFydE9mKCdkYXknKSAtIHRoaXMuY2xvbmUoKS5zdGFydE9mKCd5ZWFyJykpIC8gODY0ZTUpICsgMTtcclxuICAgICAgICByZXR1cm4gaW5wdXQgPT0gbnVsbCA/IGRheU9mWWVhciA6IHRoaXMuYWRkKChpbnB1dCAtIGRheU9mWWVhciksICdkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdtJywgWydtbScsIDJdLCAwLCAnbWludXRlJyk7XHJcblxyXG4gICAgLy8gQUxJQVNFU1xyXG5cclxuICAgIGFkZFVuaXRBbGlhcygnbWludXRlJywgJ20nKTtcclxuXHJcbiAgICAvLyBQUklPUklUWVxyXG5cclxuICAgIGFkZFVuaXRQcmlvcml0eSgnbWludXRlJywgMTQpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdtJywgIG1hdGNoMXRvMik7XHJcbiAgICBhZGRSZWdleFRva2VuKCdtbScsIG1hdGNoMXRvMiwgbWF0Y2gyKTtcclxuICAgIGFkZFBhcnNlVG9rZW4oWydtJywgJ21tJ10sIE1JTlVURSk7XHJcblxyXG4gICAgLy8gTU9NRU5UU1xyXG5cclxuICAgIHZhciBnZXRTZXRNaW51dGUgPSBtYWtlR2V0U2V0KCdNaW51dGVzJywgZmFsc2UpO1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigncycsIFsnc3MnLCAyXSwgMCwgJ3NlY29uZCcpO1xyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ3NlY29uZCcsICdzJyk7XHJcblxyXG4gICAgLy8gUFJJT1JJVFlcclxuXHJcbiAgICBhZGRVbml0UHJpb3JpdHkoJ3NlY29uZCcsIDE1KTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbigncycsICBtYXRjaDF0bzIpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignc3MnLCBtYXRjaDF0bzIsIG1hdGNoMik7XHJcbiAgICBhZGRQYXJzZVRva2VuKFsncycsICdzcyddLCBTRUNPTkQpO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICB2YXIgZ2V0U2V0U2Vjb25kID0gbWFrZUdldFNldCgnU2Vjb25kcycsIGZhbHNlKTtcclxuXHJcbiAgICAvLyBGT1JNQVRUSU5HXHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oJ1MnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KHRoaXMubWlsbGlzZWNvbmQoKSAvIDEwMCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTJywgMl0sIDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gfn4odGhpcy5taWxsaXNlY29uZCgpIC8gMTApO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1MnLCAzXSwgMCwgJ21pbGxpc2Vjb25kJyk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1MnLCA0XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTUycsIDVdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1MnLCA2XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwO1xyXG4gICAgfSk7XHJcbiAgICBhZGRGb3JtYXRUb2tlbigwLCBbJ1NTU1NTU1MnLCA3XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTUycsIDhdLCAwLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmQoKSAqIDEwMDAwMDtcclxuICAgIH0pO1xyXG4gICAgYWRkRm9ybWF0VG9rZW4oMCwgWydTU1NTU1NTU1MnLCA5XSwgMCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1pbGxpc2Vjb25kKCkgKiAxMDAwMDAwO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIEFMSUFTRVNcclxuXHJcbiAgICBhZGRVbml0QWxpYXMoJ21pbGxpc2Vjb25kJywgJ21zJyk7XHJcblxyXG4gICAgLy8gUFJJT1JJVFlcclxuXHJcbiAgICBhZGRVbml0UHJpb3JpdHkoJ21pbGxpc2Vjb25kJywgMTYpO1xyXG5cclxuICAgIC8vIFBBUlNJTkdcclxuXHJcbiAgICBhZGRSZWdleFRva2VuKCdTJywgICAgbWF0Y2gxdG8zLCBtYXRjaDEpO1xyXG4gICAgYWRkUmVnZXhUb2tlbignU1MnLCAgIG1hdGNoMXRvMywgbWF0Y2gyKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1NTUycsICBtYXRjaDF0bzMsIG1hdGNoMyk7XHJcblxyXG4gICAgdmFyIHRva2VuO1xyXG4gICAgZm9yICh0b2tlbiA9ICdTU1NTJzsgdG9rZW4ubGVuZ3RoIDw9IDk7IHRva2VuICs9ICdTJykge1xyXG4gICAgICAgIGFkZFJlZ2V4VG9rZW4odG9rZW4sIG1hdGNoVW5zaWduZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhcnNlTXMoaW5wdXQsIGFycmF5KSB7XHJcbiAgICAgICAgYXJyYXlbTUlMTElTRUNPTkRdID0gdG9JbnQoKCcwLicgKyBpbnB1dCkgKiAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHRva2VuID0gJ1MnOyB0b2tlbi5sZW5ndGggPD0gOTsgdG9rZW4gKz0gJ1MnKSB7XHJcbiAgICAgICAgYWRkUGFyc2VUb2tlbih0b2tlbiwgcGFyc2VNcyk7XHJcbiAgICB9XHJcbiAgICAvLyBNT01FTlRTXHJcblxyXG4gICAgdmFyIGdldFNldE1pbGxpc2Vjb25kID0gbWFrZUdldFNldCgnTWlsbGlzZWNvbmRzJywgZmFsc2UpO1xyXG5cclxuICAgIC8vIEZPUk1BVFRJTkdcclxuXHJcbiAgICBhZGRGb3JtYXRUb2tlbigneicsICAwLCAwLCAnem9uZUFiYnInKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCd6eicsIDAsIDAsICd6b25lTmFtZScpO1xyXG5cclxuICAgIC8vIE1PTUVOVFNcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRab25lQWJiciAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ1VUQycgOiAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRab25lTmFtZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVVRDID8gJ0Nvb3JkaW5hdGVkIFVuaXZlcnNhbCBUaW1lJyA6ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBwcm90byA9IE1vbWVudC5wcm90b3R5cGU7XHJcblxyXG4gICAgcHJvdG8uYWRkICAgICAgICAgICAgICAgPSBhZGQ7XHJcbiAgICBwcm90by5jYWxlbmRhciAgICAgICAgICA9IGNhbGVuZGFyJDE7XHJcbiAgICBwcm90by5jbG9uZSAgICAgICAgICAgICA9IGNsb25lO1xyXG4gICAgcHJvdG8uZGlmZiAgICAgICAgICAgICAgPSBkaWZmO1xyXG4gICAgcHJvdG8uZW5kT2YgICAgICAgICAgICAgPSBlbmRPZjtcclxuICAgIHByb3RvLmZvcm1hdCAgICAgICAgICAgID0gZm9ybWF0O1xyXG4gICAgcHJvdG8uZnJvbSAgICAgICAgICAgICAgPSBmcm9tO1xyXG4gICAgcHJvdG8uZnJvbU5vdyAgICAgICAgICAgPSBmcm9tTm93O1xyXG4gICAgcHJvdG8udG8gICAgICAgICAgICAgICAgPSB0bztcclxuICAgIHByb3RvLnRvTm93ICAgICAgICAgICAgID0gdG9Ob3c7XHJcbiAgICBwcm90by5nZXQgICAgICAgICAgICAgICA9IHN0cmluZ0dldDtcclxuICAgIHByb3RvLmludmFsaWRBdCAgICAgICAgID0gaW52YWxpZEF0O1xyXG4gICAgcHJvdG8uaXNBZnRlciAgICAgICAgICAgPSBpc0FmdGVyO1xyXG4gICAgcHJvdG8uaXNCZWZvcmUgICAgICAgICAgPSBpc0JlZm9yZTtcclxuICAgIHByb3RvLmlzQmV0d2VlbiAgICAgICAgID0gaXNCZXR3ZWVuO1xyXG4gICAgcHJvdG8uaXNTYW1lICAgICAgICAgICAgPSBpc1NhbWU7XHJcbiAgICBwcm90by5pc1NhbWVPckFmdGVyICAgICA9IGlzU2FtZU9yQWZ0ZXI7XHJcbiAgICBwcm90by5pc1NhbWVPckJlZm9yZSAgICA9IGlzU2FtZU9yQmVmb3JlO1xyXG4gICAgcHJvdG8uaXNWYWxpZCAgICAgICAgICAgPSBpc1ZhbGlkJDI7XHJcbiAgICBwcm90by5sYW5nICAgICAgICAgICAgICA9IGxhbmc7XHJcbiAgICBwcm90by5sb2NhbGUgICAgICAgICAgICA9IGxvY2FsZTtcclxuICAgIHByb3RvLmxvY2FsZURhdGEgICAgICAgID0gbG9jYWxlRGF0YTtcclxuICAgIHByb3RvLm1heCAgICAgICAgICAgICAgID0gcHJvdG90eXBlTWF4O1xyXG4gICAgcHJvdG8ubWluICAgICAgICAgICAgICAgPSBwcm90b3R5cGVNaW47XHJcbiAgICBwcm90by5wYXJzaW5nRmxhZ3MgICAgICA9IHBhcnNpbmdGbGFncztcclxuICAgIHByb3RvLnNldCAgICAgICAgICAgICAgID0gc3RyaW5nU2V0O1xyXG4gICAgcHJvdG8uc3RhcnRPZiAgICAgICAgICAgPSBzdGFydE9mO1xyXG4gICAgcHJvdG8uc3VidHJhY3QgICAgICAgICAgPSBzdWJ0cmFjdDtcclxuICAgIHByb3RvLnRvQXJyYXkgICAgICAgICAgID0gdG9BcnJheTtcclxuICAgIHByb3RvLnRvT2JqZWN0ICAgICAgICAgID0gdG9PYmplY3Q7XHJcbiAgICBwcm90by50b0RhdGUgICAgICAgICAgICA9IHRvRGF0ZTtcclxuICAgIHByb3RvLnRvSVNPU3RyaW5nICAgICAgID0gdG9JU09TdHJpbmc7XHJcbiAgICBwcm90by5pbnNwZWN0ICAgICAgICAgICA9IGluc3BlY3Q7XHJcbiAgICBwcm90by50b0pTT04gICAgICAgICAgICA9IHRvSlNPTjtcclxuICAgIHByb3RvLnRvU3RyaW5nICAgICAgICAgID0gdG9TdHJpbmc7XHJcbiAgICBwcm90by51bml4ICAgICAgICAgICAgICA9IHVuaXg7XHJcbiAgICBwcm90by52YWx1ZU9mICAgICAgICAgICA9IHZhbHVlT2Y7XHJcbiAgICBwcm90by5jcmVhdGlvbkRhdGEgICAgICA9IGNyZWF0aW9uRGF0YTtcclxuICAgIHByb3RvLnllYXIgICAgICAgPSBnZXRTZXRZZWFyO1xyXG4gICAgcHJvdG8uaXNMZWFwWWVhciA9IGdldElzTGVhcFllYXI7XHJcbiAgICBwcm90by53ZWVrWWVhciAgICA9IGdldFNldFdlZWtZZWFyO1xyXG4gICAgcHJvdG8uaXNvV2Vla1llYXIgPSBnZXRTZXRJU09XZWVrWWVhcjtcclxuICAgIHByb3RvLnF1YXJ0ZXIgPSBwcm90by5xdWFydGVycyA9IGdldFNldFF1YXJ0ZXI7XHJcbiAgICBwcm90by5tb250aCAgICAgICA9IGdldFNldE1vbnRoO1xyXG4gICAgcHJvdG8uZGF5c0luTW9udGggPSBnZXREYXlzSW5Nb250aDtcclxuICAgIHByb3RvLndlZWsgICAgICAgICAgID0gcHJvdG8ud2Vla3MgICAgICAgID0gZ2V0U2V0V2VlaztcclxuICAgIHByb3RvLmlzb1dlZWsgICAgICAgID0gcHJvdG8uaXNvV2Vla3MgICAgID0gZ2V0U2V0SVNPV2VlaztcclxuICAgIHByb3RvLndlZWtzSW5ZZWFyICAgID0gZ2V0V2Vla3NJblllYXI7XHJcbiAgICBwcm90by5pc29XZWVrc0luWWVhciA9IGdldElTT1dlZWtzSW5ZZWFyO1xyXG4gICAgcHJvdG8uZGF0ZSAgICAgICA9IGdldFNldERheU9mTW9udGg7XHJcbiAgICBwcm90by5kYXkgICAgICAgID0gcHJvdG8uZGF5cyAgICAgICAgICAgICA9IGdldFNldERheU9mV2VlaztcclxuICAgIHByb3RvLndlZWtkYXkgICAgPSBnZXRTZXRMb2NhbGVEYXlPZldlZWs7XHJcbiAgICBwcm90by5pc29XZWVrZGF5ID0gZ2V0U2V0SVNPRGF5T2ZXZWVrO1xyXG4gICAgcHJvdG8uZGF5T2ZZZWFyICA9IGdldFNldERheU9mWWVhcjtcclxuICAgIHByb3RvLmhvdXIgPSBwcm90by5ob3VycyA9IGdldFNldEhvdXI7XHJcbiAgICBwcm90by5taW51dGUgPSBwcm90by5taW51dGVzID0gZ2V0U2V0TWludXRlO1xyXG4gICAgcHJvdG8uc2Vjb25kID0gcHJvdG8uc2Vjb25kcyA9IGdldFNldFNlY29uZDtcclxuICAgIHByb3RvLm1pbGxpc2Vjb25kID0gcHJvdG8ubWlsbGlzZWNvbmRzID0gZ2V0U2V0TWlsbGlzZWNvbmQ7XHJcbiAgICBwcm90by51dGNPZmZzZXQgICAgICAgICAgICA9IGdldFNldE9mZnNldDtcclxuICAgIHByb3RvLnV0YyAgICAgICAgICAgICAgICAgID0gc2V0T2Zmc2V0VG9VVEM7XHJcbiAgICBwcm90by5sb2NhbCAgICAgICAgICAgICAgICA9IHNldE9mZnNldFRvTG9jYWw7XHJcbiAgICBwcm90by5wYXJzZVpvbmUgICAgICAgICAgICA9IHNldE9mZnNldFRvUGFyc2VkT2Zmc2V0O1xyXG4gICAgcHJvdG8uaGFzQWxpZ25lZEhvdXJPZmZzZXQgPSBoYXNBbGlnbmVkSG91ck9mZnNldDtcclxuICAgIHByb3RvLmlzRFNUICAgICAgICAgICAgICAgID0gaXNEYXlsaWdodFNhdmluZ1RpbWU7XHJcbiAgICBwcm90by5pc0xvY2FsICAgICAgICAgICAgICA9IGlzTG9jYWw7XHJcbiAgICBwcm90by5pc1V0Y09mZnNldCAgICAgICAgICA9IGlzVXRjT2Zmc2V0O1xyXG4gICAgcHJvdG8uaXNVdGMgICAgICAgICAgICAgICAgPSBpc1V0YztcclxuICAgIHByb3RvLmlzVVRDICAgICAgICAgICAgICAgID0gaXNVdGM7XHJcbiAgICBwcm90by56b25lQWJiciA9IGdldFpvbmVBYmJyO1xyXG4gICAgcHJvdG8uem9uZU5hbWUgPSBnZXRab25lTmFtZTtcclxuICAgIHByb3RvLmRhdGVzICA9IGRlcHJlY2F0ZSgnZGF0ZXMgYWNjZXNzb3IgaXMgZGVwcmVjYXRlZC4gVXNlIGRhdGUgaW5zdGVhZC4nLCBnZXRTZXREYXlPZk1vbnRoKTtcclxuICAgIHByb3RvLm1vbnRocyA9IGRlcHJlY2F0ZSgnbW9udGhzIGFjY2Vzc29yIGlzIGRlcHJlY2F0ZWQuIFVzZSBtb250aCBpbnN0ZWFkJywgZ2V0U2V0TW9udGgpO1xyXG4gICAgcHJvdG8ueWVhcnMgID0gZGVwcmVjYXRlKCd5ZWFycyBhY2Nlc3NvciBpcyBkZXByZWNhdGVkLiBVc2UgeWVhciBpbnN0ZWFkJywgZ2V0U2V0WWVhcik7XHJcbiAgICBwcm90by56b25lICAgPSBkZXByZWNhdGUoJ21vbWVudCgpLnpvbmUgaXMgZGVwcmVjYXRlZCwgdXNlIG1vbWVudCgpLnV0Y09mZnNldCBpbnN0ZWFkLiBodHRwOi8vbW9tZW50anMuY29tL2d1aWRlcy8jL3dhcm5pbmdzL3pvbmUvJywgZ2V0U2V0Wm9uZSk7XHJcbiAgICBwcm90by5pc0RTVFNoaWZ0ZWQgPSBkZXByZWNhdGUoJ2lzRFNUU2hpZnRlZCBpcyBkZXByZWNhdGVkLiBTZWUgaHR0cDovL21vbWVudGpzLmNvbS9ndWlkZXMvIy93YXJuaW5ncy9kc3Qtc2hpZnRlZC8gZm9yIG1vcmUgaW5mb3JtYXRpb24nLCBpc0RheWxpZ2h0U2F2aW5nVGltZVNoaWZ0ZWQpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZVVuaXggKGlucHV0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxvY2FsKGlucHV0ICogMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlSW5ab25lICgpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlTG9jYWwuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5wYXJzZVpvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwcmVQYXJzZVBvc3RGb3JtYXQgKHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHByb3RvJDEgPSBMb2NhbGUucHJvdG90eXBlO1xyXG5cclxuICAgIHByb3RvJDEuY2FsZW5kYXIgICAgICAgID0gY2FsZW5kYXI7XHJcbiAgICBwcm90byQxLmxvbmdEYXRlRm9ybWF0ICA9IGxvbmdEYXRlRm9ybWF0O1xyXG4gICAgcHJvdG8kMS5pbnZhbGlkRGF0ZSAgICAgPSBpbnZhbGlkRGF0ZTtcclxuICAgIHByb3RvJDEub3JkaW5hbCAgICAgICAgID0gb3JkaW5hbDtcclxuICAgIHByb3RvJDEucHJlcGFyc2UgICAgICAgID0gcHJlUGFyc2VQb3N0Rm9ybWF0O1xyXG4gICAgcHJvdG8kMS5wb3N0Zm9ybWF0ICAgICAgPSBwcmVQYXJzZVBvc3RGb3JtYXQ7XHJcbiAgICBwcm90byQxLnJlbGF0aXZlVGltZSAgICA9IHJlbGF0aXZlVGltZTtcclxuICAgIHByb3RvJDEucGFzdEZ1dHVyZSAgICAgID0gcGFzdEZ1dHVyZTtcclxuICAgIHByb3RvJDEuc2V0ICAgICAgICAgICAgID0gc2V0O1xyXG5cclxuICAgIHByb3RvJDEubW9udGhzICAgICAgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzO1xyXG4gICAgcHJvdG8kMS5tb250aHNTaG9ydCAgICAgICA9ICAgICAgICBsb2NhbGVNb250aHNTaG9ydDtcclxuICAgIHByb3RvJDEubW9udGhzUGFyc2UgICAgICAgPSAgICAgICAgbG9jYWxlTW9udGhzUGFyc2U7XHJcbiAgICBwcm90byQxLm1vbnRoc1JlZ2V4ICAgICAgID0gbW9udGhzUmVnZXg7XHJcbiAgICBwcm90byQxLm1vbnRoc1Nob3J0UmVnZXggID0gbW9udGhzU2hvcnRSZWdleDtcclxuICAgIHByb3RvJDEud2VlayA9IGxvY2FsZVdlZWs7XHJcbiAgICBwcm90byQxLmZpcnN0RGF5T2ZZZWFyID0gbG9jYWxlRmlyc3REYXlPZlllYXI7XHJcbiAgICBwcm90byQxLmZpcnN0RGF5T2ZXZWVrID0gbG9jYWxlRmlyc3REYXlPZldlZWs7XHJcblxyXG4gICAgcHJvdG8kMS53ZWVrZGF5cyAgICAgICA9ICAgICAgICBsb2NhbGVXZWVrZGF5cztcclxuICAgIHByb3RvJDEud2Vla2RheXNNaW4gICAgPSAgICAgICAgbG9jYWxlV2Vla2RheXNNaW47XHJcbiAgICBwcm90byQxLndlZWtkYXlzU2hvcnQgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzU2hvcnQ7XHJcbiAgICBwcm90byQxLndlZWtkYXlzUGFyc2UgID0gICAgICAgIGxvY2FsZVdlZWtkYXlzUGFyc2U7XHJcblxyXG4gICAgcHJvdG8kMS53ZWVrZGF5c1JlZ2V4ICAgICAgID0gICAgICAgIHdlZWtkYXlzUmVnZXg7XHJcbiAgICBwcm90byQxLndlZWtkYXlzU2hvcnRSZWdleCAgPSAgICAgICAgd2Vla2RheXNTaG9ydFJlZ2V4O1xyXG4gICAgcHJvdG8kMS53ZWVrZGF5c01pblJlZ2V4ICAgID0gICAgICAgIHdlZWtkYXlzTWluUmVnZXg7XHJcblxyXG4gICAgcHJvdG8kMS5pc1BNID0gbG9jYWxlSXNQTTtcclxuICAgIHByb3RvJDEubWVyaWRpZW0gPSBsb2NhbGVNZXJpZGllbTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXQkMSAoZm9ybWF0LCBpbmRleCwgZmllbGQsIHNldHRlcikge1xyXG4gICAgICAgIHZhciBsb2NhbGUgPSBnZXRMb2NhbGUoKTtcclxuICAgICAgICB2YXIgdXRjID0gY3JlYXRlVVRDKCkuc2V0KHNldHRlciwgaW5kZXgpO1xyXG4gICAgICAgIHJldHVybiBsb2NhbGVbZmllbGRdKHV0YywgZm9ybWF0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0TW9udGhzSW1wbCAoZm9ybWF0LCBpbmRleCwgZmllbGQpIHtcclxuICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICcnO1xyXG5cclxuICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0JDEoZm9ybWF0LCBpbmRleCwgZmllbGQsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGk7XHJcbiAgICAgICAgdmFyIG91dCA9IFtdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCAxMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dFtpXSA9IGdldCQxKGZvcm1hdCwgaSwgZmllbGQsICdtb250aCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vICgpXHJcbiAgICAvLyAoNSlcclxuICAgIC8vIChmbXQsIDUpXHJcbiAgICAvLyAoZm10KVxyXG4gICAgLy8gKHRydWUpXHJcbiAgICAvLyAodHJ1ZSwgNSlcclxuICAgIC8vICh0cnVlLCBmbXQsIDUpXHJcbiAgICAvLyAodHJ1ZSwgZm10KVxyXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzSW1wbCAobG9jYWxlU29ydGVkLCBmb3JtYXQsIGluZGV4LCBmaWVsZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbG9jYWxlU29ydGVkID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgaWYgKGlzTnVtYmVyKGZvcm1hdCkpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgJyc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9ybWF0ID0gbG9jYWxlU29ydGVkO1xyXG4gICAgICAgICAgICBpbmRleCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgbG9jYWxlU29ydGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNOdW1iZXIoZm9ybWF0KSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBmb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBsb2NhbGUgPSBnZXRMb2NhbGUoKSxcclxuICAgICAgICAgICAgc2hpZnQgPSBsb2NhbGVTb3J0ZWQgPyBsb2NhbGUuX3dlZWsuZG93IDogMDtcclxuXHJcbiAgICAgICAgaWYgKGluZGV4ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdldCQxKGZvcm1hdCwgKGluZGV4ICsgc2hpZnQpICUgNywgZmllbGQsICdkYXknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBpO1xyXG4gICAgICAgIHZhciBvdXQgPSBbXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgNzsgaSsrKSB7XHJcbiAgICAgICAgICAgIG91dFtpXSA9IGdldCQxKGZvcm1hdCwgKGkgKyBzaGlmdCkgJSA3LCBmaWVsZCwgJ2RheScpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RNb250aHMgKGZvcm1hdCwgaW5kZXgpIHtcclxuICAgICAgICByZXR1cm4gbGlzdE1vbnRoc0ltcGwoZm9ybWF0LCBpbmRleCwgJ21vbnRocycpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxpc3RNb250aHNTaG9ydCAoZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0TW9udGhzSW1wbChmb3JtYXQsIGluZGV4LCAnbW9udGhzU2hvcnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXMgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbGlzdFdlZWtkYXlzU2hvcnQgKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzU2hvcnQnKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBsaXN0V2Vla2RheXNNaW4gKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCkge1xyXG4gICAgICAgIHJldHVybiBsaXN0V2Vla2RheXNJbXBsKGxvY2FsZVNvcnRlZCwgZm9ybWF0LCBpbmRleCwgJ3dlZWtkYXlzTWluJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U2V0R2xvYmFsTG9jYWxlKCdlbicsIHtcclxuICAgICAgICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn0odGh8c3R8bmR8cmQpLyxcclxuICAgICAgICBvcmRpbmFsIDogZnVuY3Rpb24gKG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgYiA9IG51bWJlciAlIDEwLFxyXG4gICAgICAgICAgICAgICAgb3V0cHV0ID0gKHRvSW50KG51bWJlciAlIDEwMCAvIDEwKSA9PT0gMSkgPyAndGgnIDpcclxuICAgICAgICAgICAgICAgIChiID09PSAxKSA/ICdzdCcgOlxyXG4gICAgICAgICAgICAgICAgKGIgPT09IDIpID8gJ25kJyA6XHJcbiAgICAgICAgICAgICAgICAoYiA9PT0gMykgPyAncmQnIDogJ3RoJztcclxuICAgICAgICAgICAgcmV0dXJuIG51bWJlciArIG91dHB1dDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXHJcblxyXG4gICAgaG9va3MubGFuZyA9IGRlcHJlY2F0ZSgnbW9tZW50LmxhbmcgaXMgZGVwcmVjYXRlZC4gVXNlIG1vbWVudC5sb2NhbGUgaW5zdGVhZC4nLCBnZXRTZXRHbG9iYWxMb2NhbGUpO1xyXG4gICAgaG9va3MubGFuZ0RhdGEgPSBkZXByZWNhdGUoJ21vbWVudC5sYW5nRGF0YSBpcyBkZXByZWNhdGVkLiBVc2UgbW9tZW50LmxvY2FsZURhdGEgaW5zdGVhZC4nLCBnZXRMb2NhbGUpO1xyXG5cclxuICAgIHZhciBtYXRoQWJzID0gTWF0aC5hYnM7XHJcblxyXG4gICAgZnVuY3Rpb24gYWJzICgpIHtcclxuICAgICAgICB2YXIgZGF0YSAgICAgICAgICAgPSB0aGlzLl9kYXRhO1xyXG5cclxuICAgICAgICB0aGlzLl9taWxsaXNlY29uZHMgPSBtYXRoQWJzKHRoaXMuX21pbGxpc2Vjb25kcyk7XHJcbiAgICAgICAgdGhpcy5fZGF5cyAgICAgICAgID0gbWF0aEFicyh0aGlzLl9kYXlzKTtcclxuICAgICAgICB0aGlzLl9tb250aHMgICAgICAgPSBtYXRoQWJzKHRoaXMuX21vbnRocyk7XHJcblxyXG4gICAgICAgIGRhdGEubWlsbGlzZWNvbmRzICA9IG1hdGhBYnMoZGF0YS5taWxsaXNlY29uZHMpO1xyXG4gICAgICAgIGRhdGEuc2Vjb25kcyAgICAgICA9IG1hdGhBYnMoZGF0YS5zZWNvbmRzKTtcclxuICAgICAgICBkYXRhLm1pbnV0ZXMgICAgICAgPSBtYXRoQWJzKGRhdGEubWludXRlcyk7XHJcbiAgICAgICAgZGF0YS5ob3VycyAgICAgICAgID0gbWF0aEFicyhkYXRhLmhvdXJzKTtcclxuICAgICAgICBkYXRhLm1vbnRocyAgICAgICAgPSBtYXRoQWJzKGRhdGEubW9udGhzKTtcclxuICAgICAgICBkYXRhLnllYXJzICAgICAgICAgPSBtYXRoQWJzKGRhdGEueWVhcnMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRTdWJ0cmFjdCQxIChkdXJhdGlvbiwgaW5wdXQsIHZhbHVlLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICB2YXIgb3RoZXIgPSBjcmVhdGVEdXJhdGlvbihpbnB1dCwgdmFsdWUpO1xyXG5cclxuICAgICAgICBkdXJhdGlvbi5fbWlsbGlzZWNvbmRzICs9IGRpcmVjdGlvbiAqIG90aGVyLl9taWxsaXNlY29uZHM7XHJcbiAgICAgICAgZHVyYXRpb24uX2RheXMgICAgICAgICArPSBkaXJlY3Rpb24gKiBvdGhlci5fZGF5cztcclxuICAgICAgICBkdXJhdGlvbi5fbW9udGhzICAgICAgICs9IGRpcmVjdGlvbiAqIG90aGVyLl9tb250aHM7XHJcblxyXG4gICAgICAgIHJldHVybiBkdXJhdGlvbi5fYnViYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgYWRkKDEsICdzJykgb3IgYWRkKGR1cmF0aW9uKVxyXG4gICAgZnVuY3Rpb24gYWRkJDEgKGlucHV0LCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBhZGRTdWJ0cmFjdCQxKHRoaXMsIGlucHV0LCB2YWx1ZSwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc3VwcG9ydHMgb25seSAyLjAtc3R5bGUgc3VidHJhY3QoMSwgJ3MnKSBvciBzdWJ0cmFjdChkdXJhdGlvbilcclxuICAgIGZ1bmN0aW9uIHN1YnRyYWN0JDEgKGlucHV0LCB2YWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBhZGRTdWJ0cmFjdCQxKHRoaXMsIGlucHV0LCB2YWx1ZSwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFic0NlaWwgKG51bWJlcikge1xyXG4gICAgICAgIGlmIChudW1iZXIgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKG51bWJlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChudW1iZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBidWJibGUgKCkge1xyXG4gICAgICAgIHZhciBtaWxsaXNlY29uZHMgPSB0aGlzLl9taWxsaXNlY29uZHM7XHJcbiAgICAgICAgdmFyIGRheXMgICAgICAgICA9IHRoaXMuX2RheXM7XHJcbiAgICAgICAgdmFyIG1vbnRocyAgICAgICA9IHRoaXMuX21vbnRocztcclxuICAgICAgICB2YXIgZGF0YSAgICAgICAgID0gdGhpcy5fZGF0YTtcclxuICAgICAgICB2YXIgc2Vjb25kcywgbWludXRlcywgaG91cnMsIHllYXJzLCBtb250aHNGcm9tRGF5cztcclxuXHJcbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG1peCBvZiBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgdmFsdWVzLCBidWJibGUgZG93biBmaXJzdFxyXG4gICAgICAgIC8vIGNoZWNrOiBodHRwczovL2dpdGh1Yi5jb20vbW9tZW50L21vbWVudC9pc3N1ZXMvMjE2NlxyXG4gICAgICAgIGlmICghKChtaWxsaXNlY29uZHMgPj0gMCAmJiBkYXlzID49IDAgJiYgbW9udGhzID49IDApIHx8XHJcbiAgICAgICAgICAgICAgICAobWlsbGlzZWNvbmRzIDw9IDAgJiYgZGF5cyA8PSAwICYmIG1vbnRocyA8PSAwKSkpIHtcclxuICAgICAgICAgICAgbWlsbGlzZWNvbmRzICs9IGFic0NlaWwobW9udGhzVG9EYXlzKG1vbnRocykgKyBkYXlzKSAqIDg2NGU1O1xyXG4gICAgICAgICAgICBkYXlzID0gMDtcclxuICAgICAgICAgICAgbW9udGhzID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgY29kZSBidWJibGVzIHVwIHZhbHVlcywgc2VlIHRoZSB0ZXN0cyBmb3JcclxuICAgICAgICAvLyBleGFtcGxlcyBvZiB3aGF0IHRoYXQgbWVhbnMuXHJcbiAgICAgICAgZGF0YS5taWxsaXNlY29uZHMgPSBtaWxsaXNlY29uZHMgJSAxMDAwO1xyXG5cclxuICAgICAgICBzZWNvbmRzICAgICAgICAgICA9IGFic0Zsb29yKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xyXG4gICAgICAgIGRhdGEuc2Vjb25kcyAgICAgID0gc2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgZGF0YS5taW51dGVzICAgICAgPSBtaW51dGVzICUgNjA7XHJcblxyXG4gICAgICAgIGhvdXJzICAgICAgICAgICAgID0gYWJzRmxvb3IobWludXRlcyAvIDYwKTtcclxuICAgICAgICBkYXRhLmhvdXJzICAgICAgICA9IGhvdXJzICUgMjQ7XHJcblxyXG4gICAgICAgIGRheXMgKz0gYWJzRmxvb3IoaG91cnMgLyAyNCk7XHJcblxyXG4gICAgICAgIC8vIGNvbnZlcnQgZGF5cyB0byBtb250aHNcclxuICAgICAgICBtb250aHNGcm9tRGF5cyA9IGFic0Zsb29yKGRheXNUb01vbnRocyhkYXlzKSk7XHJcbiAgICAgICAgbW9udGhzICs9IG1vbnRoc0Zyb21EYXlzO1xyXG4gICAgICAgIGRheXMgLT0gYWJzQ2VpbChtb250aHNUb0RheXMobW9udGhzRnJvbURheXMpKTtcclxuXHJcbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxyXG4gICAgICAgIHllYXJzID0gYWJzRmxvb3IobW9udGhzIC8gMTIpO1xyXG4gICAgICAgIG1vbnRocyAlPSAxMjtcclxuXHJcbiAgICAgICAgZGF0YS5kYXlzICAgPSBkYXlzO1xyXG4gICAgICAgIGRhdGEubW9udGhzID0gbW9udGhzO1xyXG4gICAgICAgIGRhdGEueWVhcnMgID0geWVhcnM7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRheXNUb01vbnRocyAoZGF5cykge1xyXG4gICAgICAgIC8vIDQwMCB5ZWFycyBoYXZlIDE0NjA5NyBkYXlzICh0YWtpbmcgaW50byBhY2NvdW50IGxlYXAgeWVhciBydWxlcylcclxuICAgICAgICAvLyA0MDAgeWVhcnMgaGF2ZSAxMiBtb250aHMgPT09IDQ4MDBcclxuICAgICAgICByZXR1cm4gZGF5cyAqIDQ4MDAgLyAxNDYwOTc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9udGhzVG9EYXlzIChtb250aHMpIHtcclxuICAgICAgICAvLyB0aGUgcmV2ZXJzZSBvZiBkYXlzVG9Nb250aHNcclxuICAgICAgICByZXR1cm4gbW9udGhzICogMTQ2MDk3IC8gNDgwMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcyAodW5pdHMpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBOYU47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkYXlzO1xyXG4gICAgICAgIHZhciBtb250aHM7XHJcbiAgICAgICAgdmFyIG1pbGxpc2Vjb25kcyA9IHRoaXMuX21pbGxpc2Vjb25kcztcclxuXHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcblxyXG4gICAgICAgIGlmICh1bml0cyA9PT0gJ21vbnRoJyB8fCB1bml0cyA9PT0gJ3llYXInKSB7XHJcbiAgICAgICAgICAgIGRheXMgICA9IHRoaXMuX2RheXMgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xyXG4gICAgICAgICAgICBtb250aHMgPSB0aGlzLl9tb250aHMgKyBkYXlzVG9Nb250aHMoZGF5cyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bml0cyA9PT0gJ21vbnRoJyA/IG1vbnRocyA6IG1vbnRocyAvIDEyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGhhbmRsZSBtaWxsaXNlY29uZHMgc2VwYXJhdGVseSBiZWNhdXNlIG9mIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIChpc3N1ZSAjMTg2NylcclxuICAgICAgICAgICAgZGF5cyA9IHRoaXMuX2RheXMgKyBNYXRoLnJvdW5kKG1vbnRoc1RvRGF5cyh0aGlzLl9tb250aHMpKTtcclxuICAgICAgICAgICAgc3dpdGNoICh1bml0cykge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnd2VlaycgICA6IHJldHVybiBkYXlzIC8gNyAgICAgKyBtaWxsaXNlY29uZHMgLyA2MDQ4ZTU7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdkYXknICAgIDogcmV0dXJuIGRheXMgICAgICAgICArIG1pbGxpc2Vjb25kcyAvIDg2NGU1O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnaG91cicgICA6IHJldHVybiBkYXlzICogMjQgICAgKyBtaWxsaXNlY29uZHMgLyAzNmU1O1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnbWludXRlJyA6IHJldHVybiBkYXlzICogMTQ0MCAgKyBtaWxsaXNlY29uZHMgLyA2ZTQ7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdzZWNvbmQnIDogcmV0dXJuIGRheXMgKiA4NjQwMCArIG1pbGxpc2Vjb25kcyAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICAvLyBNYXRoLmZsb29yIHByZXZlbnRzIGZsb2F0aW5nIHBvaW50IG1hdGggZXJyb3JzIGhlcmVcclxuICAgICAgICAgICAgICAgIGNhc2UgJ21pbGxpc2Vjb25kJzogcmV0dXJuIE1hdGguZmxvb3IoZGF5cyAqIDg2NGU1KSArIG1pbGxpc2Vjb25kcztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHRocm93IG5ldyBFcnJvcignVW5rbm93biB1bml0ICcgKyB1bml0cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogVXNlIHRoaXMuYXMoJ21zJyk/XHJcbiAgICBmdW5jdGlvbiB2YWx1ZU9mJDEgKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE5hTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgdGhpcy5fbWlsbGlzZWNvbmRzICtcclxuICAgICAgICAgICAgdGhpcy5fZGF5cyAqIDg2NGU1ICtcclxuICAgICAgICAgICAgKHRoaXMuX21vbnRocyAlIDEyKSAqIDI1OTJlNiArXHJcbiAgICAgICAgICAgIHRvSW50KHRoaXMuX21vbnRocyAvIDEyKSAqIDMxNTM2ZTZcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1ha2VBcyAoYWxpYXMpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5hcyhhbGlhcyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYXNNaWxsaXNlY29uZHMgPSBtYWtlQXMoJ21zJyk7XHJcbiAgICB2YXIgYXNTZWNvbmRzICAgICAgPSBtYWtlQXMoJ3MnKTtcclxuICAgIHZhciBhc01pbnV0ZXMgICAgICA9IG1ha2VBcygnbScpO1xyXG4gICAgdmFyIGFzSG91cnMgICAgICAgID0gbWFrZUFzKCdoJyk7XHJcbiAgICB2YXIgYXNEYXlzICAgICAgICAgPSBtYWtlQXMoJ2QnKTtcclxuICAgIHZhciBhc1dlZWtzICAgICAgICA9IG1ha2VBcygndycpO1xyXG4gICAgdmFyIGFzTW9udGhzICAgICAgID0gbWFrZUFzKCdNJyk7XHJcbiAgICB2YXIgYXNZZWFycyAgICAgICAgPSBtYWtlQXMoJ3knKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbG9uZSQxICgpIHtcclxuICAgICAgICByZXR1cm4gY3JlYXRlRHVyYXRpb24odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0JDIgKHVuaXRzKSB7XHJcbiAgICAgICAgdW5pdHMgPSBub3JtYWxpemVVbml0cyh1bml0cyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpc1t1bml0cyArICdzJ10oKSA6IE5hTjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBtYWtlR2V0dGVyKG5hbWUpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkKCkgPyB0aGlzLl9kYXRhW25hbWVdIDogTmFOO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1pbGxpc2Vjb25kcyA9IG1ha2VHZXR0ZXIoJ21pbGxpc2Vjb25kcycpO1xyXG4gICAgdmFyIHNlY29uZHMgICAgICA9IG1ha2VHZXR0ZXIoJ3NlY29uZHMnKTtcclxuICAgIHZhciBtaW51dGVzICAgICAgPSBtYWtlR2V0dGVyKCdtaW51dGVzJyk7XHJcbiAgICB2YXIgaG91cnMgICAgICAgID0gbWFrZUdldHRlcignaG91cnMnKTtcclxuICAgIHZhciBkYXlzICAgICAgICAgPSBtYWtlR2V0dGVyKCdkYXlzJyk7XHJcbiAgICB2YXIgbW9udGhzICAgICAgID0gbWFrZUdldHRlcignbW9udGhzJyk7XHJcbiAgICB2YXIgeWVhcnMgICAgICAgID0gbWFrZUdldHRlcigneWVhcnMnKTtcclxuXHJcbiAgICBmdW5jdGlvbiB3ZWVrcyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIGFic0Zsb29yKHRoaXMuZGF5cygpIC8gNyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDtcclxuICAgIHZhciB0aHJlc2hvbGRzID0ge1xyXG4gICAgICAgIHNzOiA0NCwgICAgICAgICAvLyBhIGZldyBzZWNvbmRzIHRvIHNlY29uZHNcclxuICAgICAgICBzIDogNDUsICAgICAgICAgLy8gc2Vjb25kcyB0byBtaW51dGVcclxuICAgICAgICBtIDogNDUsICAgICAgICAgLy8gbWludXRlcyB0byBob3VyXHJcbiAgICAgICAgaCA6IDIyLCAgICAgICAgIC8vIGhvdXJzIHRvIGRheVxyXG4gICAgICAgIGQgOiAyNiwgICAgICAgICAvLyBkYXlzIHRvIG1vbnRoXHJcbiAgICAgICAgTSA6IDExICAgICAgICAgIC8vIG1vbnRocyB0byB5ZWFyXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGhlbHBlciBmdW5jdGlvbiBmb3IgbW9tZW50LmZuLmZyb20sIG1vbWVudC5mbi5mcm9tTm93LCBhbmQgbW9tZW50LmR1cmF0aW9uLmZuLmh1bWFuaXplXHJcbiAgICBmdW5jdGlvbiBzdWJzdGl0dXRlVGltZUFnbyhzdHJpbmcsIG51bWJlciwgd2l0aG91dFN1ZmZpeCwgaXNGdXR1cmUsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUucmVsYXRpdmVUaW1lKG51bWJlciB8fCAxLCAhIXdpdGhvdXRTdWZmaXgsIHN0cmluZywgaXNGdXR1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbGF0aXZlVGltZSQxIChwb3NOZWdEdXJhdGlvbiwgd2l0aG91dFN1ZmZpeCwgbG9jYWxlKSB7XHJcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gY3JlYXRlRHVyYXRpb24ocG9zTmVnRHVyYXRpb24pLmFicygpO1xyXG4gICAgICAgIHZhciBzZWNvbmRzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdzJykpO1xyXG4gICAgICAgIHZhciBtaW51dGVzICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdtJykpO1xyXG4gICAgICAgIHZhciBob3VycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdoJykpO1xyXG4gICAgICAgIHZhciBkYXlzICAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdkJykpO1xyXG4gICAgICAgIHZhciBtb250aHMgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCdNJykpO1xyXG4gICAgICAgIHZhciB5ZWFycyAgICA9IHJvdW5kKGR1cmF0aW9uLmFzKCd5JykpO1xyXG5cclxuICAgICAgICB2YXIgYSA9IHNlY29uZHMgPD0gdGhyZXNob2xkcy5zcyAmJiBbJ3MnLCBzZWNvbmRzXSAgfHxcclxuICAgICAgICAgICAgICAgIHNlY29uZHMgPCB0aHJlc2hvbGRzLnMgICAmJiBbJ3NzJywgc2Vjb25kc10gfHxcclxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPD0gMSAgICAgICAgICAgICAmJiBbJ20nXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPCB0aHJlc2hvbGRzLm0gICAmJiBbJ21tJywgbWludXRlc10gfHxcclxuICAgICAgICAgICAgICAgIGhvdXJzICAgPD0gMSAgICAgICAgICAgICAmJiBbJ2gnXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIGhvdXJzICAgPCB0aHJlc2hvbGRzLmggICAmJiBbJ2hoJywgaG91cnNdICAgfHxcclxuICAgICAgICAgICAgICAgIGRheXMgICAgPD0gMSAgICAgICAgICAgICAmJiBbJ2QnXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIGRheXMgICAgPCB0aHJlc2hvbGRzLmQgICAmJiBbJ2RkJywgZGF5c10gICAgfHxcclxuICAgICAgICAgICAgICAgIG1vbnRocyAgPD0gMSAgICAgICAgICAgICAmJiBbJ00nXSAgICAgICAgICAgfHxcclxuICAgICAgICAgICAgICAgIG1vbnRocyAgPCB0aHJlc2hvbGRzLk0gICAmJiBbJ01NJywgbW9udGhzXSAgfHxcclxuICAgICAgICAgICAgICAgIHllYXJzICAgPD0gMSAgICAgICAgICAgICAmJiBbJ3knXSAgICAgICAgICAgfHwgWyd5eScsIHllYXJzXTtcclxuXHJcbiAgICAgICAgYVsyXSA9IHdpdGhvdXRTdWZmaXg7XHJcbiAgICAgICAgYVszXSA9ICtwb3NOZWdEdXJhdGlvbiA+IDA7XHJcbiAgICAgICAgYVs0XSA9IGxvY2FsZTtcclxuICAgICAgICByZXR1cm4gc3Vic3RpdHV0ZVRpbWVBZ28uYXBwbHkobnVsbCwgYSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCB0aGUgcm91bmRpbmcgZnVuY3Rpb24gZm9yIHJlbGF0aXZlIHRpbWUgc3RyaW5nc1xyXG4gICAgZnVuY3Rpb24gZ2V0U2V0UmVsYXRpdmVUaW1lUm91bmRpbmcgKHJvdW5kaW5nRnVuY3Rpb24pIHtcclxuICAgICAgICBpZiAocm91bmRpbmdGdW5jdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByb3VuZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZihyb3VuZGluZ0Z1bmN0aW9uKSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByb3VuZCA9IHJvdW5kaW5nRnVuY3Rpb247XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBhbGxvd3MgeW91IHRvIHNldCBhIHRocmVzaG9sZCBmb3IgcmVsYXRpdmUgdGltZSBzdHJpbmdzXHJcbiAgICBmdW5jdGlvbiBnZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQgKHRocmVzaG9sZCwgbGltaXQpIHtcclxuICAgICAgICBpZiAodGhyZXNob2xkc1t0aHJlc2hvbGRdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGltaXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhyZXNob2xkc1t0aHJlc2hvbGRdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJlc2hvbGRzW3RocmVzaG9sZF0gPSBsaW1pdDtcclxuICAgICAgICBpZiAodGhyZXNob2xkID09PSAncycpIHtcclxuICAgICAgICAgICAgdGhyZXNob2xkcy5zcyA9IGxpbWl0IC0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaHVtYW5pemUgKHdpdGhTdWZmaXgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsZURhdGEoKS5pbnZhbGlkRGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvY2FsZSA9IHRoaXMubG9jYWxlRGF0YSgpO1xyXG4gICAgICAgIHZhciBvdXRwdXQgPSByZWxhdGl2ZVRpbWUkMSh0aGlzLCAhd2l0aFN1ZmZpeCwgbG9jYWxlKTtcclxuXHJcbiAgICAgICAgaWYgKHdpdGhTdWZmaXgpIHtcclxuICAgICAgICAgICAgb3V0cHV0ID0gbG9jYWxlLnBhc3RGdXR1cmUoK3RoaXMsIG91dHB1dCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbG9jYWxlLnBvc3Rmb3JtYXQob3V0cHV0KTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgYWJzJDEgPSBNYXRoLmFicztcclxuXHJcbiAgICBmdW5jdGlvbiBzaWduKHgpIHtcclxuICAgICAgICByZXR1cm4gKCh4ID4gMCkgLSAoeCA8IDApKSB8fCAreDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b0lTT1N0cmluZyQxKCkge1xyXG4gICAgICAgIC8vIGZvciBJU08gc3RyaW5ncyB3ZSBkbyBub3QgdXNlIHRoZSBub3JtYWwgYnViYmxpbmcgcnVsZXM6XHJcbiAgICAgICAgLy8gICogbWlsbGlzZWNvbmRzIGJ1YmJsZSB1cCB1bnRpbCB0aGV5IGJlY29tZSBob3Vyc1xyXG4gICAgICAgIC8vICAqIGRheXMgZG8gbm90IGJ1YmJsZSBhdCBhbGxcclxuICAgICAgICAvLyAgKiBtb250aHMgYnViYmxlIHVwIHVudGlsIHRoZXkgYmVjb21lIHllYXJzXHJcbiAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHRoZXJlIGlzIG5vIGNvbnRleHQtZnJlZSBjb252ZXJzaW9uIGJldHdlZW4gaG91cnMgYW5kIGRheXNcclxuICAgICAgICAvLyAodGhpbmsgb2YgY2xvY2sgY2hhbmdlcylcclxuICAgICAgICAvLyBhbmQgYWxzbyBub3QgYmV0d2VlbiBkYXlzIGFuZCBtb250aHMgKDI4LTMxIGRheXMgcGVyIG1vbnRoKVxyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxlRGF0YSgpLmludmFsaWREYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2Vjb25kcyA9IGFicyQxKHRoaXMuX21pbGxpc2Vjb25kcykgLyAxMDAwO1xyXG4gICAgICAgIHZhciBkYXlzICAgICAgICAgPSBhYnMkMSh0aGlzLl9kYXlzKTtcclxuICAgICAgICB2YXIgbW9udGhzICAgICAgID0gYWJzJDEodGhpcy5fbW9udGhzKTtcclxuICAgICAgICB2YXIgbWludXRlcywgaG91cnMsIHllYXJzO1xyXG5cclxuICAgICAgICAvLyAzNjAwIHNlY29uZHMgLT4gNjAgbWludXRlcyAtPiAxIGhvdXJcclxuICAgICAgICBtaW51dGVzICAgICAgICAgICA9IGFic0Zsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgaG91cnMgICAgICAgICAgICAgPSBhYnNGbG9vcihtaW51dGVzIC8gNjApO1xyXG4gICAgICAgIHNlY29uZHMgJT0gNjA7XHJcbiAgICAgICAgbWludXRlcyAlPSA2MDtcclxuXHJcbiAgICAgICAgLy8gMTIgbW9udGhzIC0+IDEgeWVhclxyXG4gICAgICAgIHllYXJzICA9IGFic0Zsb29yKG1vbnRocyAvIDEyKTtcclxuICAgICAgICBtb250aHMgJT0gMTI7XHJcblxyXG5cclxuICAgICAgICAvLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vZG9yZGlsbGUvbW9tZW50LWlzb2R1cmF0aW9uL2Jsb2IvbWFzdGVyL21vbWVudC5pc29kdXJhdGlvbi5qc1xyXG4gICAgICAgIHZhciBZID0geWVhcnM7XHJcbiAgICAgICAgdmFyIE0gPSBtb250aHM7XHJcbiAgICAgICAgdmFyIEQgPSBkYXlzO1xyXG4gICAgICAgIHZhciBoID0gaG91cnM7XHJcbiAgICAgICAgdmFyIG0gPSBtaW51dGVzO1xyXG4gICAgICAgIHZhciBzID0gc2Vjb25kcyA/IHNlY29uZHMudG9GaXhlZCgzKS5yZXBsYWNlKC9cXC4/MCskLywgJycpIDogJyc7XHJcbiAgICAgICAgdmFyIHRvdGFsID0gdGhpcy5hc1NlY29uZHMoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0b3RhbCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzIGlzIHRoZSBzYW1lIGFzIEMjJ3MgKE5vZGEpIGFuZCBweXRob24gKGlzb2RhdGUpLi4uXHJcbiAgICAgICAgICAgIC8vIGJ1dCBub3Qgb3RoZXIgSlMgKGdvb2cuZGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuICdQMEQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHRvdGFsU2lnbiA9IHRvdGFsIDwgMCA/ICctJyA6ICcnO1xyXG4gICAgICAgIHZhciB5bVNpZ24gPSBzaWduKHRoaXMuX21vbnRocykgIT09IHNpZ24odG90YWwpID8gJy0nIDogJyc7XHJcbiAgICAgICAgdmFyIGRheXNTaWduID0gc2lnbih0aGlzLl9kYXlzKSAhPT0gc2lnbih0b3RhbCkgPyAnLScgOiAnJztcclxuICAgICAgICB2YXIgaG1zU2lnbiA9IHNpZ24odGhpcy5fbWlsbGlzZWNvbmRzKSAhPT0gc2lnbih0b3RhbCkgPyAnLScgOiAnJztcclxuXHJcbiAgICAgICAgcmV0dXJuIHRvdGFsU2lnbiArICdQJyArXHJcbiAgICAgICAgICAgIChZID8geW1TaWduICsgWSArICdZJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChNID8geW1TaWduICsgTSArICdNJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChEID8gZGF5c1NpZ24gKyBEICsgJ0QnIDogJycpICtcclxuICAgICAgICAgICAgKChoIHx8IG0gfHwgcykgPyAnVCcgOiAnJykgK1xyXG4gICAgICAgICAgICAoaCA/IGhtc1NpZ24gKyBoICsgJ0gnIDogJycpICtcclxuICAgICAgICAgICAgKG0gPyBobXNTaWduICsgbSArICdNJyA6ICcnKSArXHJcbiAgICAgICAgICAgIChzID8gaG1zU2lnbiArIHMgKyAnUycgOiAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHByb3RvJDIgPSBEdXJhdGlvbi5wcm90b3R5cGU7XHJcblxyXG4gICAgcHJvdG8kMi5pc1ZhbGlkICAgICAgICA9IGlzVmFsaWQkMTtcclxuICAgIHByb3RvJDIuYWJzICAgICAgICAgICAgPSBhYnM7XHJcbiAgICBwcm90byQyLmFkZCAgICAgICAgICAgID0gYWRkJDE7XHJcbiAgICBwcm90byQyLnN1YnRyYWN0ICAgICAgID0gc3VidHJhY3QkMTtcclxuICAgIHByb3RvJDIuYXMgICAgICAgICAgICAgPSBhcztcclxuICAgIHByb3RvJDIuYXNNaWxsaXNlY29uZHMgPSBhc01pbGxpc2Vjb25kcztcclxuICAgIHByb3RvJDIuYXNTZWNvbmRzICAgICAgPSBhc1NlY29uZHM7XHJcbiAgICBwcm90byQyLmFzTWludXRlcyAgICAgID0gYXNNaW51dGVzO1xyXG4gICAgcHJvdG8kMi5hc0hvdXJzICAgICAgICA9IGFzSG91cnM7XHJcbiAgICBwcm90byQyLmFzRGF5cyAgICAgICAgID0gYXNEYXlzO1xyXG4gICAgcHJvdG8kMi5hc1dlZWtzICAgICAgICA9IGFzV2Vla3M7XHJcbiAgICBwcm90byQyLmFzTW9udGhzICAgICAgID0gYXNNb250aHM7XHJcbiAgICBwcm90byQyLmFzWWVhcnMgICAgICAgID0gYXNZZWFycztcclxuICAgIHByb3RvJDIudmFsdWVPZiAgICAgICAgPSB2YWx1ZU9mJDE7XHJcbiAgICBwcm90byQyLl9idWJibGUgICAgICAgID0gYnViYmxlO1xyXG4gICAgcHJvdG8kMi5jbG9uZSAgICAgICAgICA9IGNsb25lJDE7XHJcbiAgICBwcm90byQyLmdldCAgICAgICAgICAgID0gZ2V0JDI7XHJcbiAgICBwcm90byQyLm1pbGxpc2Vjb25kcyAgID0gbWlsbGlzZWNvbmRzO1xyXG4gICAgcHJvdG8kMi5zZWNvbmRzICAgICAgICA9IHNlY29uZHM7XHJcbiAgICBwcm90byQyLm1pbnV0ZXMgICAgICAgID0gbWludXRlcztcclxuICAgIHByb3RvJDIuaG91cnMgICAgICAgICAgPSBob3VycztcclxuICAgIHByb3RvJDIuZGF5cyAgICAgICAgICAgPSBkYXlzO1xyXG4gICAgcHJvdG8kMi53ZWVrcyAgICAgICAgICA9IHdlZWtzO1xyXG4gICAgcHJvdG8kMi5tb250aHMgICAgICAgICA9IG1vbnRocztcclxuICAgIHByb3RvJDIueWVhcnMgICAgICAgICAgPSB5ZWFycztcclxuICAgIHByb3RvJDIuaHVtYW5pemUgICAgICAgPSBodW1hbml6ZTtcclxuICAgIHByb3RvJDIudG9JU09TdHJpbmcgICAgPSB0b0lTT1N0cmluZyQxO1xyXG4gICAgcHJvdG8kMi50b1N0cmluZyAgICAgICA9IHRvSVNPU3RyaW5nJDE7XHJcbiAgICBwcm90byQyLnRvSlNPTiAgICAgICAgID0gdG9JU09TdHJpbmckMTtcclxuICAgIHByb3RvJDIubG9jYWxlICAgICAgICAgPSBsb2NhbGU7XHJcbiAgICBwcm90byQyLmxvY2FsZURhdGEgICAgID0gbG9jYWxlRGF0YTtcclxuXHJcbiAgICBwcm90byQyLnRvSXNvU3RyaW5nID0gZGVwcmVjYXRlKCd0b0lzb1N0cmluZygpIGlzIGRlcHJlY2F0ZWQuIFBsZWFzZSB1c2UgdG9JU09TdHJpbmcoKSBpbnN0ZWFkIChub3RpY2UgdGhlIGNhcGl0YWxzKScsIHRvSVNPU3RyaW5nJDEpO1xyXG4gICAgcHJvdG8kMi5sYW5nID0gbGFuZztcclxuXHJcbiAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzXHJcblxyXG4gICAgLy8gRk9STUFUVElOR1xyXG5cclxuICAgIGFkZEZvcm1hdFRva2VuKCdYJywgMCwgMCwgJ3VuaXgnKTtcclxuICAgIGFkZEZvcm1hdFRva2VuKCd4JywgMCwgMCwgJ3ZhbHVlT2YnKTtcclxuXHJcbiAgICAvLyBQQVJTSU5HXHJcblxyXG4gICAgYWRkUmVnZXhUb2tlbigneCcsIG1hdGNoU2lnbmVkKTtcclxuICAgIGFkZFJlZ2V4VG9rZW4oJ1gnLCBtYXRjaFRpbWVzdGFtcCk7XHJcbiAgICBhZGRQYXJzZVRva2VuKCdYJywgZnVuY3Rpb24gKGlucHV0LCBhcnJheSwgY29uZmlnKSB7XHJcbiAgICAgICAgY29uZmlnLl9kID0gbmV3IERhdGUocGFyc2VGbG9hdChpbnB1dCwgMTApICogMTAwMCk7XHJcbiAgICB9KTtcclxuICAgIGFkZFBhcnNlVG9rZW4oJ3gnLCBmdW5jdGlvbiAoaW5wdXQsIGFycmF5LCBjb25maWcpIHtcclxuICAgICAgICBjb25maWcuX2QgPSBuZXcgRGF0ZSh0b0ludChpbnB1dCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0c1xyXG5cclxuXHJcbiAgICBob29rcy52ZXJzaW9uID0gJzIuMjIuMic7XHJcblxyXG4gICAgc2V0SG9va0NhbGxiYWNrKGNyZWF0ZUxvY2FsKTtcclxuXHJcbiAgICBob29rcy5mbiAgICAgICAgICAgICAgICAgICAgPSBwcm90bztcclxuICAgIGhvb2tzLm1pbiAgICAgICAgICAgICAgICAgICA9IG1pbjtcclxuICAgIGhvb2tzLm1heCAgICAgICAgICAgICAgICAgICA9IG1heDtcclxuICAgIGhvb2tzLm5vdyAgICAgICAgICAgICAgICAgICA9IG5vdztcclxuICAgIGhvb2tzLnV0YyAgICAgICAgICAgICAgICAgICA9IGNyZWF0ZVVUQztcclxuICAgIGhvb2tzLnVuaXggICAgICAgICAgICAgICAgICA9IGNyZWF0ZVVuaXg7XHJcbiAgICBob29rcy5tb250aHMgICAgICAgICAgICAgICAgPSBsaXN0TW9udGhzO1xyXG4gICAgaG9va3MuaXNEYXRlICAgICAgICAgICAgICAgID0gaXNEYXRlO1xyXG4gICAgaG9va3MubG9jYWxlICAgICAgICAgICAgICAgID0gZ2V0U2V0R2xvYmFsTG9jYWxlO1xyXG4gICAgaG9va3MuaW52YWxpZCAgICAgICAgICAgICAgID0gY3JlYXRlSW52YWxpZDtcclxuICAgIGhvb2tzLmR1cmF0aW9uICAgICAgICAgICAgICA9IGNyZWF0ZUR1cmF0aW9uO1xyXG4gICAgaG9va3MuaXNNb21lbnQgICAgICAgICAgICAgID0gaXNNb21lbnQ7XHJcbiAgICBob29rcy53ZWVrZGF5cyAgICAgICAgICAgICAgPSBsaXN0V2Vla2RheXM7XHJcbiAgICBob29rcy5wYXJzZVpvbmUgICAgICAgICAgICAgPSBjcmVhdGVJblpvbmU7XHJcbiAgICBob29rcy5sb2NhbGVEYXRhICAgICAgICAgICAgPSBnZXRMb2NhbGU7XHJcbiAgICBob29rcy5pc0R1cmF0aW9uICAgICAgICAgICAgPSBpc0R1cmF0aW9uO1xyXG4gICAgaG9va3MubW9udGhzU2hvcnQgICAgICAgICAgID0gbGlzdE1vbnRoc1Nob3J0O1xyXG4gICAgaG9va3Mud2Vla2RheXNNaW4gICAgICAgICAgID0gbGlzdFdlZWtkYXlzTWluO1xyXG4gICAgaG9va3MuZGVmaW5lTG9jYWxlICAgICAgICAgID0gZGVmaW5lTG9jYWxlO1xyXG4gICAgaG9va3MudXBkYXRlTG9jYWxlICAgICAgICAgID0gdXBkYXRlTG9jYWxlO1xyXG4gICAgaG9va3MubG9jYWxlcyAgICAgICAgICAgICAgID0gbGlzdExvY2FsZXM7XHJcbiAgICBob29rcy53ZWVrZGF5c1Nob3J0ICAgICAgICAgPSBsaXN0V2Vla2RheXNTaG9ydDtcclxuICAgIGhvb2tzLm5vcm1hbGl6ZVVuaXRzICAgICAgICA9IG5vcm1hbGl6ZVVuaXRzO1xyXG4gICAgaG9va3MucmVsYXRpdmVUaW1lUm91bmRpbmcgID0gZ2V0U2V0UmVsYXRpdmVUaW1lUm91bmRpbmc7XHJcbiAgICBob29rcy5yZWxhdGl2ZVRpbWVUaHJlc2hvbGQgPSBnZXRTZXRSZWxhdGl2ZVRpbWVUaHJlc2hvbGQ7XHJcbiAgICBob29rcy5jYWxlbmRhckZvcm1hdCAgICAgICAgPSBnZXRDYWxlbmRhckZvcm1hdDtcclxuICAgIGhvb2tzLnByb3RvdHlwZSAgICAgICAgICAgICA9IHByb3RvO1xyXG5cclxuICAgIC8vIGN1cnJlbnRseSBIVE1MNSBpbnB1dCB0eXBlIG9ubHkgc3VwcG9ydHMgMjQtaG91ciBmb3JtYXRzXHJcbiAgICBob29rcy5IVE1MNV9GTVQgPSB7XHJcbiAgICAgICAgREFURVRJTUVfTE9DQUw6ICdZWVlZLU1NLUREVEhIOm1tJywgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIC8+XHJcbiAgICAgICAgREFURVRJTUVfTE9DQUxfU0VDT05EUzogJ1lZWVktTU0tRERUSEg6bW06c3MnLCAgLy8gPGlucHV0IHR5cGU9XCJkYXRldGltZS1sb2NhbFwiIHN0ZXA9XCIxXCIgLz5cclxuICAgICAgICBEQVRFVElNRV9MT0NBTF9NUzogJ1lZWVktTU0tRERUSEg6bW06c3MuU1NTJywgICAvLyA8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgc3RlcD1cIjAuMDAxXCIgLz5cclxuICAgICAgICBEQVRFOiAnWVlZWS1NTS1ERCcsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cImRhdGVcIiAvPlxyXG4gICAgICAgIFRJTUU6ICdISDptbScsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIC8+XHJcbiAgICAgICAgVElNRV9TRUNPTkRTOiAnSEg6bW06c3MnLCAgICAgICAgICAgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJ0aW1lXCIgc3RlcD1cIjFcIiAvPlxyXG4gICAgICAgIFRJTUVfTVM6ICdISDptbTpzcy5TU1MnLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIDxpbnB1dCB0eXBlPVwidGltZVwiIHN0ZXA9XCIwLjAwMVwiIC8+XHJcbiAgICAgICAgV0VFSzogJ1lZWVktW1ddV1cnLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gPGlucHV0IHR5cGU9XCJ3ZWVrXCIgLz5cclxuICAgICAgICBNT05USDogJ1lZWVktTU0nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA8aW5wdXQgdHlwZT1cIm1vbnRoXCIgLz5cclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGhvb2tzO1xyXG5cclxufSkpKTtcclxuIiwiLyohIHBpY3R1cmVmaWxsIC0gdjMuMC4yIC0gMjAxNi0wMi0xMlxyXG4gKiBodHRwczovL3Njb3R0amVobC5naXRodWIuaW8vcGljdHVyZWZpbGwvXHJcbiAqIENvcHlyaWdodCAoYykgMjAxNiBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRqZWhsL3BpY3R1cmVmaWxsL2Jsb2IvbWFzdGVyL0F1dGhvcnMudHh0OyBMaWNlbnNlZCBNSVRcclxuICovXHJcbiFmdW5jdGlvbihhKXt2YXIgYj1uYXZpZ2F0b3IudXNlckFnZW50O2EuSFRNTFBpY3R1cmVFbGVtZW50JiYvZWNrby8udGVzdChiKSYmYi5tYXRjaCgvcnZcXDooXFxkKykvKSYmUmVnRXhwLiQxPDQ1JiZhZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsZnVuY3Rpb24oKXt2YXIgYixjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzb3VyY2VcIiksZD1mdW5jdGlvbihhKXt2YXIgYixkLGU9YS5wYXJlbnROb2RlO1wiUElDVFVSRVwiPT09ZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpPyhiPWMuY2xvbmVOb2RlKCksZS5pbnNlcnRCZWZvcmUoYixlLmZpcnN0RWxlbWVudENoaWxkKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZS5yZW1vdmVDaGlsZChiKX0pKTooIWEuX3BmTGFzdFNpemV8fGEub2Zmc2V0V2lkdGg+YS5fcGZMYXN0U2l6ZSkmJihhLl9wZkxhc3RTaXplPWEub2Zmc2V0V2lkdGgsZD1hLnNpemVzLGEuc2l6ZXMrPVwiLDEwMHZ3XCIsc2V0VGltZW91dChmdW5jdGlvbigpe2Euc2l6ZXM9ZH0pKX0sZT1mdW5jdGlvbigpe3ZhciBhLGI9ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInBpY3R1cmUgPiBpbWcsIGltZ1tzcmNzZXRdW3NpemVzXVwiKTtmb3IoYT0wO2E8Yi5sZW5ndGg7YSsrKWQoYlthXSl9LGY9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoYiksYj1zZXRUaW1lb3V0KGUsOTkpfSxnPWEubWF0Y2hNZWRpYSYmbWF0Y2hNZWRpYShcIihvcmllbnRhdGlvbjogbGFuZHNjYXBlKVwiKSxoPWZ1bmN0aW9uKCl7ZigpLGcmJmcuYWRkTGlzdGVuZXImJmcuYWRkTGlzdGVuZXIoZil9O3JldHVybiBjLnNyY3NldD1cImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBQUFBQUNINUJBRUtBQUVBTEFBQUFBQUJBQUVBQUFJQ1RBRUFPdz09XCIsL15bY3xpXXxkJC8udGVzdChkb2N1bWVudC5yZWFkeVN0YXRlfHxcIlwiKT9oKCk6ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixoKSxmfSgpKX0od2luZG93KSxmdW5jdGlvbihhLGIsYyl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gZChhKXtyZXR1cm5cIiBcIj09PWF8fFwiXHRcIj09PWF8fFwiXFxuXCI9PT1hfHxcIlxcZlwiPT09YXx8XCJcXHJcIj09PWF9ZnVuY3Rpb24gZShiLGMpe3ZhciBkPW5ldyBhLkltYWdlO3JldHVybiBkLm9uZXJyb3I9ZnVuY3Rpb24oKXtBW2JdPSExLGJhKCl9LGQub25sb2FkPWZ1bmN0aW9uKCl7QVtiXT0xPT09ZC53aWR0aCxiYSgpfSxkLnNyYz1jLFwicGVuZGluZ1wifWZ1bmN0aW9uIGYoKXtNPSExLFA9YS5kZXZpY2VQaXhlbFJhdGlvLE49e30sTz17fSxzLkRQUj1QfHwxLFEud2lkdGg9TWF0aC5tYXgoYS5pbm5lcldpZHRofHwwLHouY2xpZW50V2lkdGgpLFEuaGVpZ2h0PU1hdGgubWF4KGEuaW5uZXJIZWlnaHR8fDAsei5jbGllbnRIZWlnaHQpLFEudnc9US53aWR0aC8xMDAsUS52aD1RLmhlaWdodC8xMDAscj1bUS5oZWlnaHQsUS53aWR0aCxQXS5qb2luKFwiLVwiKSxRLmVtPXMuZ2V0RW1WYWx1ZSgpLFEucmVtPVEuZW19ZnVuY3Rpb24gZyhhLGIsYyxkKXt2YXIgZSxmLGcsaDtyZXR1cm5cInNhdmVEYXRhXCI9PT1CLmFsZ29yaXRobT9hPjIuNz9oPWMrMTooZj1iLWMsZT1NYXRoLnBvdyhhLS42LDEuNSksZz1mKmUsZCYmKGcrPS4xKmUpLGg9YStnKTpoPWM+MT9NYXRoLnNxcnQoYSpiKTphLGg+Y31mdW5jdGlvbiBoKGEpe3ZhciBiLGM9cy5nZXRTZXQoYSksZD0hMTtcInBlbmRpbmdcIiE9PWMmJihkPXIsYyYmKGI9cy5zZXRSZXMoYykscy5hcHBseVNldENhbmRpZGF0ZShiLGEpKSksYVtzLm5zXS5ldmFsZWQ9ZH1mdW5jdGlvbiBpKGEsYil7cmV0dXJuIGEucmVzLWIucmVzfWZ1bmN0aW9uIGooYSxiLGMpe3ZhciBkO3JldHVybiFjJiZiJiYoYz1hW3MubnNdLnNldHMsYz1jJiZjW2MubGVuZ3RoLTFdKSxkPWsoYixjKSxkJiYoYj1zLm1ha2VVcmwoYiksYVtzLm5zXS5jdXJTcmM9YixhW3MubnNdLmN1ckNhbj1kLGQucmVzfHxhYShkLGQuc2V0LnNpemVzKSksZH1mdW5jdGlvbiBrKGEsYil7dmFyIGMsZCxlO2lmKGEmJmIpZm9yKGU9cy5wYXJzZVNldChiKSxhPXMubWFrZVVybChhKSxjPTA7YzxlLmxlbmd0aDtjKyspaWYoYT09PXMubWFrZVVybChlW2NdLnVybCkpe2Q9ZVtjXTticmVha31yZXR1cm4gZH1mdW5jdGlvbiBsKGEsYil7dmFyIGMsZCxlLGYsZz1hLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic291cmNlXCIpO2ZvcihjPTAsZD1nLmxlbmd0aDtkPmM7YysrKWU9Z1tjXSxlW3MubnNdPSEwLGY9ZS5nZXRBdHRyaWJ1dGUoXCJzcmNzZXRcIiksZiYmYi5wdXNoKHtzcmNzZXQ6ZixtZWRpYTplLmdldEF0dHJpYnV0ZShcIm1lZGlhXCIpLHR5cGU6ZS5nZXRBdHRyaWJ1dGUoXCJ0eXBlXCIpLHNpemVzOmUuZ2V0QXR0cmlidXRlKFwic2l6ZXNcIil9KX1mdW5jdGlvbiBtKGEsYil7ZnVuY3Rpb24gYyhiKXt2YXIgYyxkPWIuZXhlYyhhLnN1YnN0cmluZyhtKSk7cmV0dXJuIGQ/KGM9ZFswXSxtKz1jLmxlbmd0aCxjKTp2b2lkIDB9ZnVuY3Rpb24gZSgpe3ZhciBhLGMsZCxlLGYsaSxqLGssbCxtPSExLG89e307Zm9yKGU9MDtlPGgubGVuZ3RoO2UrKylmPWhbZV0saT1mW2YubGVuZ3RoLTFdLGo9Zi5zdWJzdHJpbmcoMCxmLmxlbmd0aC0xKSxrPXBhcnNlSW50KGosMTApLGw9cGFyc2VGbG9hdChqKSxYLnRlc3QoaikmJlwid1wiPT09aT8oKGF8fGMpJiYobT0hMCksMD09PWs/bT0hMDphPWspOlkudGVzdChqKSYmXCJ4XCI9PT1pPygoYXx8Y3x8ZCkmJihtPSEwKSwwPmw/bT0hMDpjPWwpOlgudGVzdChqKSYmXCJoXCI9PT1pPygoZHx8YykmJihtPSEwKSwwPT09az9tPSEwOmQ9ayk6bT0hMDttfHwoby51cmw9ZyxhJiYoby53PWEpLGMmJihvLmQ9YyksZCYmKG8uaD1kKSxkfHxjfHxhfHwoby5kPTEpLDE9PT1vLmQmJihiLmhhczF4PSEwKSxvLnNldD1iLG4ucHVzaChvKSl9ZnVuY3Rpb24gZigpe2ZvcihjKFQpLGk9XCJcIixqPVwiaW4gZGVzY3JpcHRvclwiOzspe2lmKGs9YS5jaGFyQXQobSksXCJpbiBkZXNjcmlwdG9yXCI9PT1qKWlmKGQoaykpaSYmKGgucHVzaChpKSxpPVwiXCIsaj1cImFmdGVyIGRlc2NyaXB0b3JcIik7ZWxzZXtpZihcIixcIj09PWspcmV0dXJuIG0rPTEsaSYmaC5wdXNoKGkpLHZvaWQgZSgpO2lmKFwiKFwiPT09aylpKz1rLGo9XCJpbiBwYXJlbnNcIjtlbHNle2lmKFwiXCI9PT1rKXJldHVybiBpJiZoLnB1c2goaSksdm9pZCBlKCk7aSs9a319ZWxzZSBpZihcImluIHBhcmVuc1wiPT09ailpZihcIilcIj09PWspaSs9ayxqPVwiaW4gZGVzY3JpcHRvclwiO2Vsc2V7aWYoXCJcIj09PWspcmV0dXJuIGgucHVzaChpKSx2b2lkIGUoKTtpKz1rfWVsc2UgaWYoXCJhZnRlciBkZXNjcmlwdG9yXCI9PT1qKWlmKGQoaykpO2Vsc2V7aWYoXCJcIj09PWspcmV0dXJuIHZvaWQgZSgpO2o9XCJpbiBkZXNjcmlwdG9yXCIsbS09MX1tKz0xfX1mb3IodmFyIGcsaCxpLGosayxsPWEubGVuZ3RoLG09MCxuPVtdOzspe2lmKGMoVSksbT49bClyZXR1cm4gbjtnPWMoViksaD1bXSxcIixcIj09PWcuc2xpY2UoLTEpPyhnPWcucmVwbGFjZShXLFwiXCIpLGUoKSk6ZigpfX1mdW5jdGlvbiBuKGEpe2Z1bmN0aW9uIGIoYSl7ZnVuY3Rpb24gYigpe2YmJihnLnB1c2goZiksZj1cIlwiKX1mdW5jdGlvbiBjKCl7Z1swXSYmKGgucHVzaChnKSxnPVtdKX1mb3IodmFyIGUsZj1cIlwiLGc9W10saD1bXSxpPTAsaj0wLGs9ITE7Oyl7aWYoZT1hLmNoYXJBdChqKSxcIlwiPT09ZSlyZXR1cm4gYigpLGMoKSxoO2lmKGspe2lmKFwiKlwiPT09ZSYmXCIvXCI9PT1hW2orMV0pe2s9ITEsais9MixiKCk7Y29udGludWV9ais9MX1lbHNle2lmKGQoZSkpe2lmKGEuY2hhckF0KGotMSkmJmQoYS5jaGFyQXQoai0xKSl8fCFmKXtqKz0xO2NvbnRpbnVlfWlmKDA9PT1pKXtiKCksais9MTtjb250aW51ZX1lPVwiIFwifWVsc2UgaWYoXCIoXCI9PT1lKWkrPTE7ZWxzZSBpZihcIilcIj09PWUpaS09MTtlbHNle2lmKFwiLFwiPT09ZSl7YigpLGMoKSxqKz0xO2NvbnRpbnVlfWlmKFwiL1wiPT09ZSYmXCIqXCI9PT1hLmNoYXJBdChqKzEpKXtrPSEwLGorPTI7Y29udGludWV9fWYrPWUsais9MX19fWZ1bmN0aW9uIGMoYSl7cmV0dXJuIGsudGVzdChhKSYmcGFyc2VGbG9hdChhKT49MD8hMDpsLnRlc3QoYSk/ITA6XCIwXCI9PT1hfHxcIi0wXCI9PT1hfHxcIiswXCI9PT1hPyEwOiExfXZhciBlLGYsZyxoLGksaixrPS9eKD86WystXT9bMC05XSt8WzAtOV0qXFwuWzAtOV0rKSg/OltlRV1bKy1dP1swLTldKyk/KD86Y2h8Y218ZW18ZXh8aW58bW18cGN8cHR8cHh8cmVtfHZofHZtaW58dm1heHx2dykkL2ksbD0vXmNhbGNcXCgoPzpbMC05YS16IFxcLlxcK1xcLVxcKlxcL1xcKFxcKV0rKVxcKSQvaTtmb3IoZj1iKGEpLGc9Zi5sZW5ndGgsZT0wO2c+ZTtlKyspaWYoaD1mW2VdLGk9aFtoLmxlbmd0aC0xXSxjKGkpKXtpZihqPWksaC5wb3AoKSwwPT09aC5sZW5ndGgpcmV0dXJuIGo7aWYoaD1oLmpvaW4oXCIgXCIpLHMubWF0Y2hlc01lZGlhKGgpKXJldHVybiBqfXJldHVyblwiMTAwdndcIn1iLmNyZWF0ZUVsZW1lbnQoXCJwaWN0dXJlXCIpO3ZhciBvLHAscSxyLHM9e30sdD0hMSx1PWZ1bmN0aW9uKCl7fSx2PWIuY3JlYXRlRWxlbWVudChcImltZ1wiKSx3PXYuZ2V0QXR0cmlidXRlLHg9di5zZXRBdHRyaWJ1dGUseT12LnJlbW92ZUF0dHJpYnV0ZSx6PWIuZG9jdW1lbnRFbGVtZW50LEE9e30sQj17YWxnb3JpdGhtOlwiXCJ9LEM9XCJkYXRhLXBmc3JjXCIsRD1DK1wic2V0XCIsRT1uYXZpZ2F0b3IudXNlckFnZW50LEY9L3JpZGVudC8udGVzdChFKXx8L2Vja28vLnRlc3QoRSkmJkUubWF0Y2goL3J2XFw6KFxcZCspLykmJlJlZ0V4cC4kMT4zNSxHPVwiY3VycmVudFNyY1wiLEg9L1xccytcXCs/XFxkKyhlXFxkKyk/dy8sST0vKFxcKFteKV0rXFwpKT9cXHMqKC4rKS8sSj1hLnBpY3R1cmVmaWxsQ0ZHLEs9XCJwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dmlzaWJpbGl0eTpoaWRkZW47ZGlzcGxheTpibG9jaztwYWRkaW5nOjA7Ym9yZGVyOm5vbmU7Zm9udC1zaXplOjFlbTt3aWR0aDoxZW07b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgwcHgsIDBweCwgMHB4LCAwcHgpXCIsTD1cImZvbnQtc2l6ZToxMDAlIWltcG9ydGFudDtcIixNPSEwLE49e30sTz17fSxQPWEuZGV2aWNlUGl4ZWxSYXRpbyxRPXtweDoxLFwiaW5cIjo5Nn0sUj1iLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLFM9ITEsVD0vXlsgXFx0XFxuXFxyXFx1MDAwY10rLyxVPS9eWywgXFx0XFxuXFxyXFx1MDAwY10rLyxWPS9eW14gXFx0XFxuXFxyXFx1MDAwY10rLyxXPS9bLF0rJC8sWD0vXlxcZCskLyxZPS9eLT8oPzpbMC05XSt8WzAtOV0qXFwuWzAtOV0rKSg/OltlRV1bKy1dP1swLTldKyk/JC8sWj1mdW5jdGlvbihhLGIsYyxkKXthLmFkZEV2ZW50TGlzdGVuZXI/YS5hZGRFdmVudExpc3RlbmVyKGIsYyxkfHwhMSk6YS5hdHRhY2hFdmVudCYmYS5hdHRhY2hFdmVudChcIm9uXCIrYixjKX0sJD1mdW5jdGlvbihhKXt2YXIgYj17fTtyZXR1cm4gZnVuY3Rpb24oYyl7cmV0dXJuIGMgaW4gYnx8KGJbY109YShjKSksYltjXX19LF89ZnVuY3Rpb24oKXt2YXIgYT0vXihbXFxkXFwuXSspKGVtfHZ3fHB4KSQvLGI9ZnVuY3Rpb24oKXtmb3IodmFyIGE9YXJndW1lbnRzLGI9MCxjPWFbMF07KytiIGluIGE7KWM9Yy5yZXBsYWNlKGFbYl0sYVsrK2JdKTtyZXR1cm4gY30sYz0kKGZ1bmN0aW9uKGEpe3JldHVyblwicmV0dXJuIFwiK2IoKGF8fFwiXCIpLnRvTG93ZXJDYXNlKCksL1xcYmFuZFxcYi9nLFwiJiZcIiwvLC9nLFwifHxcIiwvbWluLShbYS16LVxcc10rKTovZyxcImUuJDE+PVwiLC9tYXgtKFthLXotXFxzXSspOi9nLFwiZS4kMTw9XCIsL2NhbGMoW14pXSspL2csXCIoJDEpXCIsLyhcXGQrW1xcLl0qW1xcZF0qKShbYS16XSspL2csXCIoJDEgKiBlLiQyKVwiLC9eKD8hKGUuW2Etel18WzAtOVxcLiY9fD48XFwrXFwtXFwqXFwoXFwpXFwvXSkpLiovZ2ksXCJcIikrXCI7XCJ9KTtyZXR1cm4gZnVuY3Rpb24oYixkKXt2YXIgZTtpZighKGIgaW4gTikpaWYoTltiXT0hMSxkJiYoZT1iLm1hdGNoKGEpKSlOW2JdPWVbMV0qUVtlWzJdXTtlbHNlIHRyeXtOW2JdPW5ldyBGdW5jdGlvbihcImVcIixjKGIpKShRKX1jYXRjaChmKXt9cmV0dXJuIE5bYl19fSgpLGFhPWZ1bmN0aW9uKGEsYil7cmV0dXJuIGEudz8oYS5jV2lkdGg9cy5jYWxjTGlzdExlbmd0aChifHxcIjEwMHZ3XCIpLGEucmVzPWEudy9hLmNXaWR0aCk6YS5yZXM9YS5kLGF9LGJhPWZ1bmN0aW9uKGEpe2lmKHQpe3ZhciBjLGQsZSxmPWF8fHt9O2lmKGYuZWxlbWVudHMmJjE9PT1mLmVsZW1lbnRzLm5vZGVUeXBlJiYoXCJJTUdcIj09PWYuZWxlbWVudHMubm9kZU5hbWUudG9VcHBlckNhc2UoKT9mLmVsZW1lbnRzPVtmLmVsZW1lbnRzXTooZi5jb250ZXh0PWYuZWxlbWVudHMsZi5lbGVtZW50cz1udWxsKSksYz1mLmVsZW1lbnRzfHxzLnFzYShmLmNvbnRleHR8fGIsZi5yZWV2YWx1YXRlfHxmLnJlc2VsZWN0P3Muc2VsOnMuc2VsU2hvcnQpLGU9Yy5sZW5ndGgpe2ZvcihzLnNldHVwUnVuKGYpLFM9ITAsZD0wO2U+ZDtkKyspcy5maWxsSW1nKGNbZF0sZik7cy50ZWFyZG93blJ1bihmKX19fTtvPWEuY29uc29sZSYmY29uc29sZS53YXJuP2Z1bmN0aW9uKGEpe2NvbnNvbGUud2FybihhKX06dSxHIGluIHZ8fChHPVwic3JjXCIpLEFbXCJpbWFnZS9qcGVnXCJdPSEwLEFbXCJpbWFnZS9naWZcIl09ITAsQVtcImltYWdlL3BuZ1wiXT0hMCxBW1wiaW1hZ2Uvc3ZnK3htbFwiXT1iLmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoXCJodHRwOi8vd3d3LnczLm9yZy9UUi9TVkcxMS9mZWF0dXJlI0ltYWdlXCIsXCIxLjFcIikscy5ucz0oXCJwZlwiKyhuZXcgRGF0ZSkuZ2V0VGltZSgpKS5zdWJzdHIoMCw5KSxzLnN1cFNyY3NldD1cInNyY3NldFwiaW4gdixzLnN1cFNpemVzPVwic2l6ZXNcImluIHYscy5zdXBQaWN0dXJlPSEhYS5IVE1MUGljdHVyZUVsZW1lbnQscy5zdXBTcmNzZXQmJnMuc3VwUGljdHVyZSYmIXMuc3VwU2l6ZXMmJiFmdW5jdGlvbihhKXt2LnNyY3NldD1cImRhdGE6LGFcIixhLnNyYz1cImRhdGE6LGFcIixzLnN1cFNyY3NldD12LmNvbXBsZXRlPT09YS5jb21wbGV0ZSxzLnN1cFBpY3R1cmU9cy5zdXBTcmNzZXQmJnMuc3VwUGljdHVyZX0oYi5jcmVhdGVFbGVtZW50KFwiaW1nXCIpKSxzLnN1cFNyY3NldCYmIXMuc3VwU2l6ZXM/IWZ1bmN0aW9uKCl7dmFyIGE9XCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBZ0FCQVBBQUFQLy8vd0FBQUNINUJBQUFBQUFBTEFBQUFBQUNBQUVBQUFJQ0JBb0FPdz09XCIsYz1cImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBQUFBQUNINUJBRUtBQUVBTEFBQUFBQUJBQUVBQUFJQ1RBRUFPdz09XCIsZD1iLmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiksZT1mdW5jdGlvbigpe3ZhciBhPWQud2lkdGg7Mj09PWEmJihzLnN1cFNpemVzPSEwKSxxPXMuc3VwU3Jjc2V0JiYhcy5zdXBTaXplcyx0PSEwLHNldFRpbWVvdXQoYmEpfTtkLm9ubG9hZD1lLGQub25lcnJvcj1lLGQuc2V0QXR0cmlidXRlKFwic2l6ZXNcIixcIjlweFwiKSxkLnNyY3NldD1jK1wiIDF3LFwiK2ErXCIgOXdcIixkLnNyYz1jfSgpOnQ9ITAscy5zZWxTaG9ydD1cInBpY3R1cmU+aW1nLGltZ1tzcmNzZXRdXCIscy5zZWw9cy5zZWxTaG9ydCxzLmNmZz1CLHMuRFBSPVB8fDEscy51PVEscy50eXBlcz1BLHMuc2V0U2l6ZT11LHMubWFrZVVybD0kKGZ1bmN0aW9uKGEpe3JldHVybiBSLmhyZWY9YSxSLmhyZWZ9KSxzLnFzYT1mdW5jdGlvbihhLGIpe3JldHVyblwicXVlcnlTZWxlY3RvclwiaW4gYT9hLnF1ZXJ5U2VsZWN0b3JBbGwoYik6W119LHMubWF0Y2hlc01lZGlhPWZ1bmN0aW9uKCl7cmV0dXJuIGEubWF0Y2hNZWRpYSYmKG1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAwLjFlbSlcIil8fHt9KS5tYXRjaGVzP3MubWF0Y2hlc01lZGlhPWZ1bmN0aW9uKGEpe3JldHVybiFhfHxtYXRjaE1lZGlhKGEpLm1hdGNoZXN9OnMubWF0Y2hlc01lZGlhPXMubU1RLHMubWF0Y2hlc01lZGlhLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0scy5tTVE9ZnVuY3Rpb24oYSl7cmV0dXJuIGE/XyhhKTohMH0scy5jYWxjTGVuZ3RoPWZ1bmN0aW9uKGEpe3ZhciBiPV8oYSwhMCl8fCExO3JldHVybiAwPmImJihiPSExKSxifSxzLnN1cHBvcnRzVHlwZT1mdW5jdGlvbihhKXtyZXR1cm4gYT9BW2FdOiEwfSxzLnBhcnNlU2l6ZT0kKGZ1bmN0aW9uKGEpe3ZhciBiPShhfHxcIlwiKS5tYXRjaChJKTtyZXR1cm57bWVkaWE6YiYmYlsxXSxsZW5ndGg6YiYmYlsyXX19KSxzLnBhcnNlU2V0PWZ1bmN0aW9uKGEpe3JldHVybiBhLmNhbmRzfHwoYS5jYW5kcz1tKGEuc3Jjc2V0LGEpKSxhLmNhbmRzfSxzLmdldEVtVmFsdWU9ZnVuY3Rpb24oKXt2YXIgYTtpZighcCYmKGE9Yi5ib2R5KSl7dmFyIGM9Yi5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLGQ9ei5zdHlsZS5jc3NUZXh0LGU9YS5zdHlsZS5jc3NUZXh0O2Muc3R5bGUuY3NzVGV4dD1LLHouc3R5bGUuY3NzVGV4dD1MLGEuc3R5bGUuY3NzVGV4dD1MLGEuYXBwZW5kQ2hpbGQoYykscD1jLm9mZnNldFdpZHRoLGEucmVtb3ZlQ2hpbGQoYykscD1wYXJzZUZsb2F0KHAsMTApLHouc3R5bGUuY3NzVGV4dD1kLGEuc3R5bGUuY3NzVGV4dD1lfXJldHVybiBwfHwxNn0scy5jYWxjTGlzdExlbmd0aD1mdW5jdGlvbihhKXtpZighKGEgaW4gTyl8fEIudVQpe3ZhciBiPXMuY2FsY0xlbmd0aChuKGEpKTtPW2FdPWI/YjpRLndpZHRofXJldHVybiBPW2FdfSxzLnNldFJlcz1mdW5jdGlvbihhKXt2YXIgYjtpZihhKXtiPXMucGFyc2VTZXQoYSk7Zm9yKHZhciBjPTAsZD1iLmxlbmd0aDtkPmM7YysrKWFhKGJbY10sYS5zaXplcyl9cmV0dXJuIGJ9LHMuc2V0UmVzLnJlcz1hYSxzLmFwcGx5U2V0Q2FuZGlkYXRlPWZ1bmN0aW9uKGEsYil7aWYoYS5sZW5ndGgpe3ZhciBjLGQsZSxmLGgsayxsLG0sbixvPWJbcy5uc10scD1zLkRQUjtpZihrPW8uY3VyU3JjfHxiW0ddLGw9by5jdXJDYW58fGooYixrLGFbMF0uc2V0KSxsJiZsLnNldD09PWFbMF0uc2V0JiYobj1GJiYhYi5jb21wbGV0ZSYmbC5yZXMtLjE+cCxufHwobC5jYWNoZWQ9ITAsbC5yZXM+PXAmJihoPWwpKSksIWgpZm9yKGEuc29ydChpKSxmPWEubGVuZ3RoLGg9YVtmLTFdLGQ9MDtmPmQ7ZCsrKWlmKGM9YVtkXSxjLnJlcz49cCl7ZT1kLTEsaD1hW2VdJiYobnx8ayE9PXMubWFrZVVybChjLnVybCkpJiZnKGFbZV0ucmVzLGMucmVzLHAsYVtlXS5jYWNoZWQpP2FbZV06YzticmVha31oJiYobT1zLm1ha2VVcmwoaC51cmwpLG8uY3VyU3JjPW0sby5jdXJDYW49aCxtIT09ayYmcy5zZXRTcmMoYixoKSxzLnNldFNpemUoYikpfX0scy5zZXRTcmM9ZnVuY3Rpb24oYSxiKXt2YXIgYzthLnNyYz1iLnVybCxcImltYWdlL3N2Zyt4bWxcIj09PWIuc2V0LnR5cGUmJihjPWEuc3R5bGUud2lkdGgsYS5zdHlsZS53aWR0aD1hLm9mZnNldFdpZHRoKzErXCJweFwiLGEub2Zmc2V0V2lkdGgrMSYmKGEuc3R5bGUud2lkdGg9YykpfSxzLmdldFNldD1mdW5jdGlvbihhKXt2YXIgYixjLGQsZT0hMSxmPWFbcy5uc10uc2V0cztmb3IoYj0wO2I8Zi5sZW5ndGgmJiFlO2IrKylpZihjPWZbYl0sYy5zcmNzZXQmJnMubWF0Y2hlc01lZGlhKGMubWVkaWEpJiYoZD1zLnN1cHBvcnRzVHlwZShjLnR5cGUpKSl7XCJwZW5kaW5nXCI9PT1kJiYoYz1kKSxlPWM7YnJlYWt9cmV0dXJuIGV9LHMucGFyc2VTZXRzPWZ1bmN0aW9uKGEsYixkKXt2YXIgZSxmLGcsaCxpPWImJlwiUElDVFVSRVwiPT09Yi5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpLGo9YVtzLm5zXTsoai5zcmM9PT1jfHxkLnNyYykmJihqLnNyYz13LmNhbGwoYSxcInNyY1wiKSxqLnNyYz94LmNhbGwoYSxDLGouc3JjKTp5LmNhbGwoYSxDKSksKGouc3Jjc2V0PT09Y3x8ZC5zcmNzZXR8fCFzLnN1cFNyY3NldHx8YS5zcmNzZXQpJiYoZT13LmNhbGwoYSxcInNyY3NldFwiKSxqLnNyY3NldD1lLGg9ITApLGouc2V0cz1bXSxpJiYoai5waWM9ITAsbChiLGouc2V0cykpLGouc3Jjc2V0PyhmPXtzcmNzZXQ6ai5zcmNzZXQsc2l6ZXM6dy5jYWxsKGEsXCJzaXplc1wiKX0sai5zZXRzLnB1c2goZiksZz0ocXx8ai5zcmMpJiZILnRlc3Qoai5zcmNzZXR8fFwiXCIpLGd8fCFqLnNyY3x8ayhqLnNyYyxmKXx8Zi5oYXMxeHx8KGYuc3Jjc2V0Kz1cIiwgXCIrai5zcmMsZi5jYW5kcy5wdXNoKHt1cmw6ai5zcmMsZDoxLHNldDpmfSkpKTpqLnNyYyYmai5zZXRzLnB1c2goe3NyY3NldDpqLnNyYyxzaXplczpudWxsfSksai5jdXJDYW49bnVsbCxqLmN1clNyYz1jLGouc3VwcG9ydGVkPSEoaXx8ZiYmIXMuc3VwU3Jjc2V0fHxnJiYhcy5zdXBTaXplcyksaCYmcy5zdXBTcmNzZXQmJiFqLnN1cHBvcnRlZCYmKGU/KHguY2FsbChhLEQsZSksYS5zcmNzZXQ9XCJcIik6eS5jYWxsKGEsRCkpLGouc3VwcG9ydGVkJiYhai5zcmNzZXQmJighai5zcmMmJmEuc3JjfHxhLnNyYyE9PXMubWFrZVVybChqLnNyYykpJiYobnVsbD09PWouc3JjP2EucmVtb3ZlQXR0cmlidXRlKFwic3JjXCIpOmEuc3JjPWouc3JjKSxqLnBhcnNlZD0hMH0scy5maWxsSW1nPWZ1bmN0aW9uKGEsYil7dmFyIGMsZD1iLnJlc2VsZWN0fHxiLnJlZXZhbHVhdGU7YVtzLm5zXXx8KGFbcy5uc109e30pLGM9YVtzLm5zXSwoZHx8Yy5ldmFsZWQhPT1yKSYmKCghYy5wYXJzZWR8fGIucmVldmFsdWF0ZSkmJnMucGFyc2VTZXRzKGEsYS5wYXJlbnROb2RlLGIpLGMuc3VwcG9ydGVkP2MuZXZhbGVkPXI6aChhKSl9LHMuc2V0dXBSdW49ZnVuY3Rpb24oKXsoIVN8fE18fFAhPT1hLmRldmljZVBpeGVsUmF0aW8pJiZmKCl9LHMuc3VwUGljdHVyZT8oYmE9dSxzLmZpbGxJbWc9dSk6IWZ1bmN0aW9uKCl7dmFyIGMsZD1hLmF0dGFjaEV2ZW50Py9kJHxeYy86L2QkfF5jfF5pLyxlPWZ1bmN0aW9uKCl7dmFyIGE9Yi5yZWFkeVN0YXRlfHxcIlwiO2Y9c2V0VGltZW91dChlLFwibG9hZGluZ1wiPT09YT8yMDA6OTk5KSxiLmJvZHkmJihzLmZpbGxJbWdzKCksYz1jfHxkLnRlc3QoYSksYyYmY2xlYXJUaW1lb3V0KGYpKX0sZj1zZXRUaW1lb3V0KGUsYi5ib2R5Pzk6OTkpLGc9ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU9ZnVuY3Rpb24oKXt2YXIgZj1uZXcgRGF0ZS1kO2I+Zj9jPXNldFRpbWVvdXQoZSxiLWYpOihjPW51bGwsYSgpKX07cmV0dXJuIGZ1bmN0aW9uKCl7ZD1uZXcgRGF0ZSxjfHwoYz1zZXRUaW1lb3V0KGUsYikpfX0saD16LmNsaWVudEhlaWdodCxpPWZ1bmN0aW9uKCl7TT1NYXRoLm1heChhLmlubmVyV2lkdGh8fDAsei5jbGllbnRXaWR0aCkhPT1RLndpZHRofHx6LmNsaWVudEhlaWdodCE9PWgsaD16LmNsaWVudEhlaWdodCxNJiZzLmZpbGxJbWdzKCl9O1ooYSxcInJlc2l6ZVwiLGcoaSw5OSkpLFooYixcInJlYWR5c3RhdGVjaGFuZ2VcIixlKX0oKSxzLnBpY3R1cmVmaWxsPWJhLHMuZmlsbEltZ3M9YmEscy50ZWFyZG93blJ1bj11LGJhLl89cyxhLnBpY3R1cmVmaWxsQ0ZHPXtwZjpzLHB1c2g6ZnVuY3Rpb24oYSl7dmFyIGI9YS5zaGlmdCgpO1wiZnVuY3Rpb25cIj09dHlwZW9mIHNbYl0/c1tiXS5hcHBseShzLGEpOihCW2JdPWFbMF0sUyYmcy5maWxsSW1ncyh7cmVzZWxlY3Q6ITB9KSl9fTtmb3IoO0omJkoubGVuZ3RoOylhLnBpY3R1cmVmaWxsQ0ZHLnB1c2goSi5zaGlmdCgpKTthLnBpY3R1cmVmaWxsPWJhLFwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1iYTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShcInBpY3R1cmVmaWxsXCIsZnVuY3Rpb24oKXtyZXR1cm4gYmF9KSxzLnN1cFBpY3R1cmV8fChBW1wiaW1hZ2Uvd2VicFwiXT1lKFwiaW1hZ2Uvd2VicFwiLFwiZGF0YTppbWFnZS93ZWJwO2Jhc2U2NCxVa2xHUmtvQUFBQlhSVUpRVmxBNFdBb0FBQUFRQUFBQUFBQUFBQUFBUVV4UVNBd0FBQUFCQnhBUi9ROUVSUDhEQUFCV1VEZ2dHQUFBQURBQkFKMEJLZ0VBQVFBREFEUWxwQUFEY0FEKysvMVFBQT09XCIpKX0od2luZG93LGRvY3VtZW50KTsiLCIvKipcclxuICogQ29tbW9uIGRhdGFiYXNlIGhlbHBlciBmdW5jdGlvbnMuXHJcbiAqL1xyXG5jb25zdCBEQl9QUk9NSVNFRCA9IGlkYi5vcGVuKCdyZXN0cmV2aWV3cy1kYicsIDIsIHVwZ3JhZGVEQiA9PiB7XHJcbiAgc3dpdGNoICh1cGdyYWRlREIub2xkVmVyc2lvbikge1xyXG4gICAgY2FzZSAxOlxyXG4gICAgICB1cGdyYWRlREIuZGVsZXRlT2JqZWN0U3RvcmUoJ3Jldmlld3MnKTsgLy9mb3JtYXQgaGFzIGNoYW5nZWRcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDA6XHJcbiAgICAgIC8vIHVwZ3JhZGVEQi5jcmVhdGVPYmplY3RTdG9yZSgncmV2aWV3cycpOyAvL2Rvbid0IGRvIHRoaXNcclxuICB9XHJcblxyXG4gIC8vQ3JlYXRlIGEgbmV3IG9iamVjdCBzdG9yZSB3aXRoIGEgZGlmZmVyZW50IGZvcm1hdFxyXG4gIHZhciByZXZpZXdTdG9yZSA9IHVwZ3JhZGVEQi5jcmVhdGVPYmplY3RTdG9yZSgncmV2aWV3cycpO1xyXG4gIHJldmlld1N0b3JlLmNyZWF0ZUluZGV4KCdyZXN0YXVyYW50X2lkJywgJ3Jlc3RhdXJhbnRfaWQnLCB7XHJcbiAgICB1bmlxdWU6IGZhbHNlXHJcbiAgfSk7XHJcbiAgcmV2aWV3U3RvcmUuY3JlYXRlSW5kZXgoJ2NyZWF0ZWRBdCcsICdjcmVhdGVkQXQnLCB7XHJcbiAgICB1bmlxdWU6IGZhbHNlXHJcbiAgfSk7XHJcblxyXG4gIHZhciByZXN0U3RvcmUgPSB1cGdyYWRlREIuY3JlYXRlT2JqZWN0U3RvcmUoJ3Jlc3RhdXJhbnRzJyk7XHJcbiAgcmVzdFN0b3JlLmNyZWF0ZUluZGV4KCduZWlnaGJvcmhvb2QnLCAnbmVpZ2hib3Job29kJywge1xyXG4gICAgdW5pcXVlOiBmYWxzZVxyXG4gIH0pO1xyXG4gIHJlc3RTdG9yZS5jcmVhdGVJbmRleCgnbmFtZScsICduYW1lJywge1xyXG4gICAgdW5pcXVlOiBmYWxzZVxyXG4gIH0pO1xyXG59KTtcclxuXHJcbmNsYXNzIERCSGVscGVyIHtcclxuXHJcbiAgLyoqXHJcbiAgICogRGF0YWJhc2UgVVJMLlxyXG4gICAqIENoYW5nZSB0aGlzIHRvIHJlc3RhdXJhbnRzLmpzb24gZmlsZSBsb2NhdGlvbiBvbiB5b3VyIHNlcnZlci5cclxuICAgKi9cclxuICBzdGF0aWMgZ2V0IERBVEFCQVNFX1VSTCgpIHtcclxuICAgIGNvbnN0IHBvcnQgPSAxMzM3OyAvLyBDaGFuZ2UgdGhpcyB0byB5b3VyIHNlcnZlciBwb3J0XHJcbiAgICByZXR1cm4gYGh0dHA6Ly9sb2NhbGhvc3Q6JHtwb3J0fWA7IC8vREVWIG9ubHksIG5lZWQgdG8gY2hhbmdlIGluIHByb2R1Y3Rpb25cclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXQgZGJQcm9taXNlZCgpIHtcclxuICAgIHJldHVybiBEQl9QUk9NSVNFRDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXREQlJlc291cmNlKGNhbGxiYWNrLCB1cmwpIHtcclxuXHJcbiAgICAvL3ZhbGlkYXRlIHVybFxyXG4gICAgaWYgKCF1cmwpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0VNUFRZIFJlcXVlc3Qgc2VudCB0byB0aGUgV29ya2VyJyk7XHJcbiAgICAgIGNhbGxiYWNrKCdUaGVyZSB3YXMgbm90IGluZm9ybWF0aW9uIGluIHJlcXVlc3QuJywgW10pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiAodXJsKSAhPSAnc3RyaW5nJykge1xyXG4gICAgICBjb25zb2xlLmxvZygnV1JPTkcgVFlQRSBPRiBSZXF1ZXN0IHNlbnQgdG8gdGhlIFdvcmtlcicpO1xyXG4gICAgICBjYWxsYmFjayhgRGF0YSB3YXMgb2YgdHlwZTogJHt0eXBlb2YodXJsKX0gaW5zdGVhZCBvZiBzdHJpbmcgYCwgW10pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgREJIZWxwZXIuX2hhbmRsZURCRmV0Y2goKGVyciwgcmVzKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGAke3VybH0gd2FzIGZldGNoZWQgZnJvbTogJHtyZXMuc291cmNlfWApO1xyXG4gICAgICBjYWxsYmFjayhlcnIsIHJlcy5yZXNvdXJjZSk7XHJcbiAgICB9LCB1cmwpO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAvLyBQVUJMSUMgRlVOQ1RJT05TIFxyXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogRmV0Y2ggYWxsIHJlc3RhdXJhbnRzLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRzKGNhbGxiYWNrKSB7XHJcbiAgICBEQkhlbHBlci5nZXREQlJlc291cmNlKGNhbGxiYWNrLCAncmVzdGF1cmFudHMvJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBhbGwgcmV2aWV3cy5cclxuICAgKi9cclxuICBzdGF0aWMgZmV0Y2hBbGxSZXZpZXdzKGNhbGxiYWNrKSB7XHJcbiAgICBEQkhlbHBlci5nZXREQlJlc291cmNlKGNhbGxiYWNrLCAncmV2aWV3cy8nKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBhIHJlc3RhdXJhbnQgYnkgaXRzIElELlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUlkKHJlc3RfaWQsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgLy8gZmV0Y2ggYWxsIHJlc3RhdXJhbnRzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAgREJIZWxwZXIuZ2V0REJSZXNvdXJjZShjYWxsYmFjaywgYHJlc3RhdXJhbnRzLyR7cmVzdF9pZH1gKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIGEgcmV2aWV3cyBieSByZXN0YXVyYW50IGlkXHJcbiAgICovXHJcbiAgc3RhdGljIGZldGNoUmV2aWV3c0J5UmVzdGF1cmFudElkKHJlc3RfaWQsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgLy8gZmV0Y2ggYWxsIHJlc3RhdXJhbnRzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAgREJIZWxwZXIuZ2V0REJSZXNvdXJjZShjYWxsYmFjaywgYHJldmlld3M/cmVzdGF1cmFudF9pZD0ke3Jlc3RfaWR9YCk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgdHlwZSB3aXRoIHByb3BlciBlcnJvciBoYW5kbGluZy5cclxuICAgKi9cclxuICBzdGF0aWMgZmV0Y2hSZXN0YXVyYW50QnlDdWlzaW5lKGN1aXNpbmUsIGNhbGxiYWNrKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHMgIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nXHJcbiAgICBEQkhlbHBlci5nZXREQlJlc291cmNlKChlcnJvciwgcmVzdGF1cmFudHMpID0+IHtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgY2FsbGJhY2soZXJyb3IsIG51bGwpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEZpbHRlciByZXN0YXVyYW50cyB0byBoYXZlIG9ubHkgZ2l2ZW4gY3Vpc2luZSB0eXBlXHJcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHJlc3RhdXJhbnRzLmZpbHRlcihyID0+IHIuY3Vpc2luZV90eXBlID09IGN1aXNpbmUpO1xyXG4gICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdHMpO1xyXG4gICAgICB9XHJcbiAgICB9LCAncmVzdGF1cmFudHMnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIHJlc3RhdXJhbnRzIGJ5IGEgbmVpZ2hib3Job29kIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeU5laWdoYm9yaG9vZChuZWlnaGJvcmhvb2QsIGNhbGxiYWNrKSB7XHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHNcclxuICAgIERCSGVscGVyLmdldERCUmVzb3VyY2UoKGVycm9yLCByZXN0YXVyYW50cykgPT4ge1xyXG4gICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICBjYWxsYmFjayhlcnJvciwgbnVsbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gRmlsdGVyIHJlc3RhdXJhbnRzIHRvIGhhdmUgb25seSBnaXZlbiBuZWlnaGJvcmhvb2RcclxuICAgICAgICBjb25zdCByZXN1bHRzID0gcmVzdGF1cmFudHMuZmlsdGVyKHIgPT4gci5uZWlnaGJvcmhvb2QgPT0gbmVpZ2hib3Job29kKTtcclxuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgfSwgJ3Jlc3RhdXJhbnRzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCByZXN0YXVyYW50cyBieSBhIGN1aXNpbmUgYW5kIGEgbmVpZ2hib3Job29kIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaFJlc3RhdXJhbnRCeUN1aXNpbmVBbmROZWlnaGJvcmhvb2QoY3Vpc2luZSwgbmVpZ2hib3Job29kLCBjYWxsYmFjaykge1xyXG4gICAgLy8gbGV0IHVybFN0cmluZyA9ICdyZXN0YXVyYW50cyc7IFxyXG4gICAgLy8gbGV0IHF1ZXJ5RmxhZyA9IGZhbHNlOyBcclxuICAgIC8vIGlmIChjdWlzaW5lICE9ICdhbGwnKSB7XHJcbiAgICAvLyAgIHVybFN0cmluZys9IGAmY3Vpc2luZV90eXBlPSR7Y3Vpc2luZX1gO1xyXG4gICAgLy8gICBxdWVyeUZsYWcgPSB0cnVlO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gaWYgKG5laWdoYm9yaG9vZCAhPSAnYWxsJykge1xyXG4gICAgLy8gICB1cmxTdHJpbmcgKz0gYCZuZWlnaGJvcmhvb2Q9JHtuZWlnaGJvcmhvb2R9YDtcclxuICAgIC8vICAgcXVlcnlGbGFnID0gdHJ1ZTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBGZXRjaCBhbGwgcmVzdGF1cmFudHMgKGNhbiBiZSBvcHRpbWl6ZWQgdXNpbmcgaW5kZXgpXHJcbiAgICAvL1RoaXMgY29kZSBpcyByZWR1bmRhbnQgYW5kIG5lZWRzIGltcHJvdmVtZW50XHJcblxyXG4gICAgREJIZWxwZXIuZ2V0REJSZXNvdXJjZSgoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBsZXQgcmVzdWx0cyA9IHJlc3RhdXJhbnRzO1xyXG4gICAgICAgIGlmIChjdWlzaW5lICE9ICdhbGwnKSB7IC8vIGZpbHRlciBieSBjdWlzaW5lXHJcbiAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIociA9PiByLmN1aXNpbmVfdHlwZSA9PSBjdWlzaW5lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5laWdoYm9yaG9vZCAhPSAnYWxsJykgeyAvLyBmaWx0ZXIgYnkgbmVpZ2hib3Job29kXHJcbiAgICAgICAgICByZXN1bHRzID0gcmVzdWx0cy5maWx0ZXIociA9PiByLm5laWdoYm9yaG9vZCA9PSBuZWlnaGJvcmhvb2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHRzKTtcclxuICAgICAgfVxyXG4gICAgfSwgJy9yZXN0YXVyYW50cycpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlQ3Vpc2luZXMgKHJlc3RhdXJhbnRzKSB7XHJcbiAgICBcclxuICAgIGNvbnN0IGN1aXNpbmVzID0gcmVzdGF1cmFudHMubWFwKCh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5jdWlzaW5lX3R5cGUpXHJcbiAgICBcclxuICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gY3Vpc2luZXNcclxuICAgIGNvbnN0IHVuaXF1ZUN1aXNpbmVzID0gY3Vpc2luZXMuZmlsdGVyKCh2LCBpKSA9PiBjdWlzaW5lcy5pbmRleE9mKHYpID09IGkpO1xyXG4gICAgcmV0dXJuIHVuaXF1ZUN1aXNpbmVzO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHBhcnNlTmVpZ2hib3Job29kcyAocmVzdGF1cmFudHMpIHtcclxuXHJcbiAgICBjb25zdCBuZWlnaGJvcmhvb2RzID0gcmVzdGF1cmFudHMubWFwKCh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5uZWlnaGJvcmhvb2QpXHJcbiAgICBcclxuICAgIC8vIFJlbW92ZSBkdXBsaWNhdGVzIGZyb20gbmVpZ2hib3Job29kc1xyXG4gICAgY29uc3QgdW5pcXVlTmVpZ2hib3Job29kcyA9IG5laWdoYm9yaG9vZHMuZmlsdGVyKCh2LCBpKSA9PiBuZWlnaGJvcmhvb2RzLmluZGV4T2YodikgPT0gaSlcclxuICAgIHJldHVybiB1bmlxdWVOZWlnaGJvcmhvb2RzO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZldGNoIGFsbCBuZWlnaGJvcmhvb2RzIHdpdGggcHJvcGVyIGVycm9yIGhhbmRsaW5nLlxyXG4gICAqL1xyXG4gIHN0YXRpYyBmZXRjaE5laWdoYm9yaG9vZHMoY2FsbGJhY2spIHtcclxuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xyXG4gICAgREJIZWxwZXIuZ2V0REJSZXNvdXJjZSgoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBHZXQgYWxsIG5laWdoYm9yaG9vZHMgZnJvbSBhbGwgcmVzdGF1cmFudHNcclxuICAgICAgICBjb25zdCBuZWlnaGJvcmhvb2RzID0gcmVzdGF1cmFudHMubWFwKCh2LCBpKSA9PiByZXN0YXVyYW50c1tpXS5uZWlnaGJvcmhvb2QpXHJcbiAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZXMgZnJvbSBuZWlnaGJvcmhvb2RzXHJcbiAgICAgICAgY29uc3QgdW5pcXVlTmVpZ2hib3Job29kcyA9IG5laWdoYm9yaG9vZHMuZmlsdGVyKCh2LCBpKSA9PiBuZWlnaGJvcmhvb2RzLmluZGV4T2YodikgPT0gaSlcclxuICAgICAgICBjYWxsYmFjayhudWxsLCB1bmlxdWVOZWlnaGJvcmhvb2RzKTtcclxuICAgICAgfVxyXG4gICAgfSwnL3Jlc3RhdXJhbnRzJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGZXRjaCBhbGwgY3Vpc2luZXMgd2l0aCBwcm9wZXIgZXJyb3IgaGFuZGxpbmcuXHJcbiAgICovXHJcbiAgc3RhdGljIGZldGNoQ3Vpc2luZXMoY2FsbGJhY2spIHtcclxuICAgIC8vIEZldGNoIGFsbCByZXN0YXVyYW50c1xyXG4gICAgREJIZWxwZXIuZ2V0REJSZXNvdXJjZSgoZXJyb3IsIHJlc3RhdXJhbnRzKSA9PiB7XHJcbiAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgIGNhbGxiYWNrKGVycm9yLCBudWxsKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBHZXQgYWxsIGN1aXNpbmVzIGZyb20gYWxsIHJlc3RhdXJhbnRzXHJcbiAgICAgICAgY29uc3QgY3Vpc2luZXMgPSByZXN0YXVyYW50cy5tYXAoKHYsIGkpID0+IHJlc3RhdXJhbnRzW2ldLmN1aXNpbmVfdHlwZSlcclxuICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlcyBmcm9tIGN1aXNpbmVzXHJcbiAgICAgICAgY29uc3QgdW5pcXVlQ3Vpc2luZXMgPSBjdWlzaW5lcy5maWx0ZXIoKHYsIGkpID0+IGN1aXNpbmVzLmluZGV4T2YodikgPT0gaSlcclxuICAgICAgICBjYWxsYmFjayhudWxsLCB1bmlxdWVDdWlzaW5lcyk7XHJcbiAgICAgIH1cclxuICAgIH0sJy9yZXN0YXVyYW50cycpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGF1cmFudCBwYWdlIFVSTC5cclxuICAgKi9cclxuICBzdGF0aWMgdXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XHJcbiAgICByZXR1cm4gKGAuL3Jlc3RhdXJhbnQuaHRtbD9pZD0ke3Jlc3RhdXJhbnQuaWR9YCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdXJsRm9yUmV2aWV3KHJldmlldykge1xyXG4gICAgcmV0dXJuIChgLi9yZXN0YXVyYW50Lmh0bWw/aWQ9JHtyZXZpZXcucmVzdGF1cmFudF9pZH0jcmV2aWV3JHtyZXZpZXcuaWR9YCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzdGF1cmFudCBpbWFnZSBVUkwuXHJcbiAgICovXHJcbiAgc3RhdGljIGltYWdlVXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSB7XHJcbiAgICByZXR1cm4gKGAuLi9pbWFnZXNfc3JjLyR7cmVzdGF1cmFudC5waG90b2dyYXBofWApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWFwIG1hcmtlciBmb3IgYSByZXN0YXVyYW50LlxyXG4gICAqL1xyXG4gIHN0YXRpYyBtYXBNYXJrZXJGb3JSZXN0YXVyYW50KHJlc3RhdXJhbnQsIG1hcCwgbGFiZWwpIHtcclxuICAgIGNvbnN0IG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICBwb3NpdGlvbjogcmVzdGF1cmFudC5sYXRsbmcsXHJcbiAgICAgIHRpdGxlOiByZXN0YXVyYW50Lm5hbWUsXHJcbiAgICAgIC8vIGxhYmVsOiB7dGV4dDogYCR7cmVzdGF1cmFudC5pZH1gLCBjb2xvcjogJ3doaXRlJ30sXHJcbiAgICAgIHVybDogREJIZWxwZXIudXJsRm9yUmVzdGF1cmFudChyZXN0YXVyYW50KSxcclxuICAgICAgbWFwOiBtYXAsXHJcbiAgICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkRST1AsXHJcbiAgICAgIHJlc3RfaWQ6IHJlc3RhdXJhbnQuaWQsIFxyXG4gICAgICBpc19mYXY6IHJlc3RhdXJhbnQuaXNfZmF2b3JpdGUsXHJcbiAgICAgIGljb246IGAuL2ltZy9pY29ucy9tYXAtaWNvbi0ke3Jlc3RhdXJhbnQuaXNfZmF2b3JpdGUgPyAnZmF2b3JpdGUnIDogJ3JlZ3VsYXInfS5wbmdgLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG1hcmtlcjtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnZlcnQgcmF0aW5nIHRvIHN0YXJzIChhIGxpdHRsZSBvdXQgb2YgcGxhY2UsIEkga25vdylcclxuICAgKi9cclxuXHJcbiAgc3RhdGljIHJhdGluZzJzdGFycyhyYXRpbmcpIHtcclxuXHJcbiAgICBjb25zdCB0b3RhbFN0YXJzID0gNTtcclxuICAgIGNvbnN0IGNoYXJGdWxsID0gJyYjNjE0NDU7JzsgLy9mb250LWF3ZXNvbWU6IGZhLXN0YXIsIFxcZjAwNVxyXG4gICAgY29uc3QgY2hhckhhbGYgPSAnJiM2MTczMTsnOyAvL2ZvbnQtYXdlc29tZTogZmEtc3Rhci1oYWxmLW8gXFxmMTIzXHJcbiAgICBjb25zdCBjaGFyRW1wdHkgPSAnJiM2MTQ0NjsnOyAvL2ZvbnQtYXdlc29tZTogZmEtc3Rhci1vLCBcXGYwMDZcclxuXHJcbiAgICBsZXQgZnVsbFN0YXJzID0gTWF0aC50cnVuYyhyYXRpbmcpO1xyXG4gICAgbGV0IGVtcHR5U3RhcnMgPSBNYXRoLnRydW5jKHRvdGFsU3RhcnMgLSByYXRpbmcpO1xyXG4gICAgbGV0IGhhc0hhbGZTdGFyID0gZnVsbFN0YXJzICsgZW1wdHlTdGFycyA8IHRvdGFsU3RhcnM7XHJcblxyXG4gICAgLy9SZXR1cm4gdGhlIHN0YXIgY2hhcmFjdGVycyBhcyBhIHN0cmluZ1xyXG4gICAgcmV0dXJuIGNoYXJGdWxsLnJlcGVhdChmdWxsU3RhcnMpICsgY2hhckhhbGYucmVwZWF0KGhhc0hhbGZTdGFyICogMSkgKyBjaGFyRW1wdHkucmVwZWF0KGVtcHR5U3RhcnMpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIEZBVk9SSVRFU1xyXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuICBzdGF0aWMgc2V0RmF2b3JpdGVTdGF0dXMoZmF2T2JqLCBjYikge1xyXG4gICAgLypJTlBVVDogZmF2T2JqID0ge2lkOiBpbnRlZ2VyLCBpc19mYXZvcml0ZTogQm9vbGVhbn0qL1xyXG5cclxuICAgIC8vVXBkYXRlIGluIHRoZSBsb2NhbCBkYXRhYmFzZVxyXG4gICAgbGV0IGRiU3VjY2VzcyA9IERCSGVscGVyLl9jaGFuZ2VEQkZhdm9yaXRlKGZhdk9iaik7XHJcbiAgICBcclxuICAgIC8vVXBkYXRlIG9uIHNlcnZlclxyXG4gICAgaWYgKG5hdmlnYXRvci5vbkxpbmUpIHtcclxuXHJcbiAgICAgIERCSGVscGVyLl9wb3N0RmF2b3JpdGVEQihmYXZPYmosIHJlcyA9PiB7XHJcblxyXG4gICAgICAgIC8vQWRkIHRvIFEgaWYgc2VydmVyIGVycm9yXHJcbiAgICAgICAgaWYgKHJlcyAmJiByZXMucmV0cnkpIHtcclxuICAgICAgICAgIERhdGFTeW5jLnF1ZXVlRmF2b3JpdGUoZmF2T2JqKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIGNiKHJlcyk7IC8vIHNlbmQgYmFjayB0aGUgcmVzXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHsgLy9PRkZMSU5FXHJcbiAgICAgIC8vQWRkIHRvIFFcclxuICAgICAgRGF0YVN5bmMucXVldWVGYXZvcml0ZShmYXZPYmopO1xyXG4gICAgfVxyXG4gICAgICBcclxuICB9XHJcblxyXG4gIHN0YXRpYyBfcG9zdEZhdm9yaXRlREIoZmF2T2JqLCBjYikge1xyXG5cclxuICAgICAvL3B1dCBtZXRob2QgcmVzdGF1cmFudHMvcmVzdF9pZCwge2lzX2Zhdm9yaXRlOiB2YWx1ZX1cclxuICAgIGZldGNoKGAke0RCSGVscGVyLkRBVEFCQVNFX1VSTH0vcmVzdGF1cmFudHMvJHtmYXZPYmouaWR9YCx7XHJcbiAgICAgIG1ldGhvZDogJ1BVVCcsXHJcbiAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2lzX2Zhdm9yaXRlOiBmYXZPYmouaXNfZmF2b3JpdGV9KSxcclxuICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgaWYgKCFyZXMub2spIHRocm93IHJlcztcclxuICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICB9KS50aGVuKHJlc3RhdXJhbnQgPT4ge1xyXG5cclxuICAgICAgLy9VcGRhdGUgaWRiIChmb3IgZ29vZCBtZWFzdXJlKVxyXG4gICAgICBEQkhlbHBlci5fcHV0REJJdGVtKHJlc3RhdXJhbnQsJ3Jlc3RhdXJhbnRzJyk7XHJcblxyXG4gICAgICAvL1NlbmQgYmFjayB0aGUgcmVzcG9uc2VcclxuICAgICAgY2Ioe29rOiB0cnVlLCBzdGF0dXM6IDIwMCwgYm9keTpyZXN0YXVyYW50fSk7XHJcblxyXG4gICAgfSkuY2F0Y2goIGVyciA9PiBjYihEQkhlbHBlci5zZXJ2ZXJFcnJIYW5kbGVyKGVycikpICk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIFJFVklFV1NcclxuICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICBcclxuICBzdGF0aWMgYWRkVXNlclJldmlldyhmb3JtRGF0YSwgcmVzdF9uYW1lLCBjYikgeyBcclxuICAgIC8vTm90aWZ5IHVzZXIgd2l0aCBjYWxsYmFjaywgKGVyck1zZywgc3VjY2Vzc01zZyk7XHJcblxyXG4gICAgLy9TYXZlIHRoZSByZXZpZXcgdG8gaWRiIChhdXRvZ2VuZXJhdGUgSUQpIGFuZCBzZW5kIHVzZXIgc3VjY2Vzc1xyXG4gICAgbGV0IGZvcm1EYXRhREIsIG5vdGU7XHJcblxyXG4gICAgaWYgKCFmb3JtRGF0YSkgZGVidWdnZXI7IC8vc29tZXRoaW5nIGlzIHJlYWFsbHkgd3JvbmdcclxuXHJcbiAgICBpZiAoZm9ybURhdGEuaWQpIHtcclxuICAgICAgLy9BbHJlYWR5IGluIElEQlxyXG4gICAgICBmb3JtRGF0YURCID0gZm9ybURhdGE7XHJcbiAgICAgIHJlc3RfbmFtZSA9IHJlc3RfbmFtZSA/IHJlc3RfbmFtZSA6IGZvcm1EYXRhREIucmVzdGF1cmFudF9uYW1lO1xyXG5cclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvL0FkZCB0byBJREJcclxuICAgICAgZm9ybURhdGFEQiA9IGZvcm1EYXRhO1xyXG4gICAgICB2YXIgdGVtcElkID0gYC0ke0RhdGFTeW5jLnJldmlld1F1ZXVlLmxlbmd0aCsxfWA7XHJcbiAgICAgIHZhciB1c2VyTm90aWZpY2F0aW9uID0gJyc7XHJcbiAgICAgIGZvcm1EYXRhREIuaWQgPSB0ZW1wSWQ7XHJcblxyXG4gICAgICBEQkhlbHBlci5fcHV0REJJdGVtKGZvcm1EYXRhREIsJ3Jldmlld3MnKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9DaGVjayB0byBzZWUgaWYgdXNlIGlzIG9ubGluZVxyXG4gICAgaWYgKG5hdmlnYXRvci5vbkxpbmUpIHtcclxuXHJcbiAgICAgIERCSGVscGVyLl9wb3N0VXNlclJldmlldyhmb3JtRGF0YURCLCAocmVzKT0+IHtcclxuICAgICAgICBcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKHJlcyAmJiByZXMub2spIHsgLy9yZXMgZmllbGRzIC0tPiBvaywgc3RhdHVzLCBib2R5IHx8IGVycjogYWxzbyByZXRyeVxyXG4gICAgICAgICAgLy9TdWNjZXNzZnVsXHJcblxyXG4gICAgICAgICAgbm90ZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdSZXZpZXcgUG9zdGVkJyxcclxuICAgICAgICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBSZXZpZXcke3Jlc3RfbmFtZSA/ICcgZm9yICcgK3Jlc3RfbmFtZTonJ30gY3JlYXRlZC4gVGhhbmtzIWAsXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHJlcyAmJiByZXMucmV0cnkpIHsgLy9zZXJ2ZXIgb2ZmbGluZVxyXG4gICAgICAgICAgLy9TZXJ2ZXIgb2ZmbGluZSwgcG9sbCB0byBzZWUgd2hlbiB0aGUgc2VydmVyIHdpbGwgYmUgYmFjayBvbmxpbmVcclxuXHJcbiAgICAgICAgICBub3RlID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogJ1JldmlldyBQZW5kaW5nJyxcclxuICAgICAgICAgICAgc3RhdHVzOiAnaW5mbycsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBSZXZpZXcke3Jlc3RfbmFtZSA/ICcgZm9yICcgK3Jlc3RfbmFtZTogJyd9d2lsbCBiZSBwb3N0ZWQgd2hlbiB5b3UgcmVjb25uZWN0LmAsXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIC8vUXVldWUgdG8gc2VuZCBsYXRlciwgcG9sbCBzZXJ2ZXIgKG5vIGxpc3RlbmVyIGN1cnJlbnRseSBzZXR1cCkhISFcclxuICAgICAgICAgIGZvcm1EYXRhREIucmVzdGF1cmFudF9uYW1lID0gcmVzdF9uYW1lO1xyXG4gICAgICAgICAgcmVzLnJldHJ5ID0gdHJ1ZTtcclxuICAgICAgICAgIERhdGFTeW5jLnF1ZXVlUmV2aWV3KGZvcm1EYXRhREIpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHJlcyAmJiAhcmVzLnJldHJ5KSB7XHJcbiAgICAgICAgICAvL1NlcnZlciBFcnJvciwgc29tZXRoaW5nIHdyb25nIHdpdGggZm9ybVxyXG4gICAgICAgICAgbm90ZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6ICdFcnJvcicsXHJcbiAgICAgICAgICAgIHN0YXR1czogJ2ZhaWx1cmUnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBgVGhlcmUgd2FzIGFuIGVycm9yIHBvc3RpbmcgeW91ciByZXZpZXcuIFNlZSBmb3JtIGZvciBkZXRhaWxzYCxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgLy9yZW1vdmUgZnJvbSBEQiBcclxuICAgICAgICAgIERCSGFuZGxlci5fZGVsZXRlREJJdGVtKGZvcm1EYXRhREIuaWQpO1xyXG5cclxuICAgICAgICB9IGVsc2UgeyBcclxuXHJcbiAgICAgICAgICAgIG5vdGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiAnRXJyb3InLFxyXG4gICAgICAgICAgICBzdGF0dXM6ICdmYWlsdXJlJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogYEFuIHVua25vd24gZXJyb3Igb2NjdXJlZC4gUGxlYXNlIGVtYWlsIHN1cHBvcnQuYCxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgcmVzLmJvZHkgPSAnQW4gdW5rbm93biBlcnJvciBvY2N1cmVkLiBQbGVhc2UgZW1haWwgc3VwcG9ydC4nO1xyXG5cclxuICAgICAgICAgIC8vcmVtb3ZlIGZyb20gREIgXHJcbiAgICAgICAgICBEQkhhbmRsZXIuX2RlbGV0ZURCSXRlbShmb3JtRGF0YURCLmlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbm90aWZ5ICB1c2VyXHJcbiAgICAgICAgSFRNTEhlbHBlci5wb3N0Tm90aWZpY2F0aW9uKG5vdGUpO1xyXG4gICAgICAgIC8vdWRwYXRlIGZyb250ZW5kXHJcbiAgICAgICAgaWYgKGNiKSBjYihyZXMpO1xyXG5cclxuICAgICAgfSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgXHJcbiAgICAgIG5vdGUgPSB7XHJcbiAgICAgICAgdGl0bGU6ICdSZXZpZXcgUGVuZGluZycsXHJcbiAgICAgICAgc3RhdHVzOiAnaW5mbycsXHJcbiAgICAgICAgbWVzc2FnZTogYFJldmlldyR7cmVzdF9uYW1lID8gJyBmb3IgJyArcmVzdF9uYW1lOiAnJ313aWxsIGJlIHBvc3RlZCB3aGVuIHlvdSByZWNvbm5lY3QuYCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vUXVldWUgdG8gc2VuZCBsYXRlclxyXG4gICAgICBmb3JtRGF0YURCLnJlc3RhdXJhbnRfbmFtZSA9IHJlc3RfbmFtZTtcclxuICAgICAgRGF0YVN5bmMucXVldWVSZXZpZXcoZm9ybURhdGFEQik7XHJcblxyXG4gICAgICBIVE1MSGVscGVyLnBvc3ROb3RpZmljYXRpb24obm90ZSk7XHJcbiAgICAgIGlmIChjYikgY2Ioe29rOiBmYWxzZSwgcmV0cnk6IHRydWUsc3RhdHVzOiAzMDEsIGJvZHk6IGZvcm1EYXRhREJ9KTtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgc3RhdGljIF9wb3N0VXNlclJldmlldyhmb3JtRGF0YURCLCBjYikge1xyXG5cclxuICAgIGZldGNoKGAke0RCSGVscGVyLkRBVEFCQVNFX1VSTH0vcmV2aWV3c2AsIHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIG1vZGU6ICdjb3JzJyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZm9ybURhdGFEQiksXHJcbiAgICB9KS50aGVuKHJlcyA9PiB7XHJcblxyXG4gICAgICBpZiAoIXJlcy5vaykgdGhyb3cgcmVzO1xyXG4gICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgIH0pLnRoZW4ocmV2aWV3ID0+IHtcclxuICAgICAgLy9SZXBsYWNlIHRoZSBpZGIgcmV2aWV3IHdpdGggYW4gdXBkYXRlZCB2ZXJzaW9uIChxdWlldGx5KVxyXG4gICAgICBEQkhlbHBlci5fcmVwbGFjZURCUmV2aWV3KGZvcm1EYXRhREIuaWQsIHJldmlldyk7XHJcblxyXG4gICAgICAvL1NlbmQgdXNlciBzdWNjZXNzIG1lc3NhZ2VcclxuICAgICAgY2Ioe29rOiB0cnVlLCBzdGF0dXM6IDIwMCwgYm9keTogcmV2aWV3fSk7XHJcblxyXG4gICAgfSkuY2F0Y2goIGVyciA9PiB7XHJcblxyXG4gICAgICAvL2xldCB1c2VyIGtub3cgZXJyb3JcclxuICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgY2IoREJIZWxwZXIuc2VydmVyRXJySGFuZGxlcihlcnIpKTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICB9XHJcblxyXG4gIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gIC8vIFBSSVZBVEUgRlVOQ1RJT05TIChtYWlubHkpLi4ubmVlZCB0byByZW9yZ2FuaXplXHJcbiAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgc3RhdGljIF9oYW5kbGVEQkZldGNoKGNhbGxiYWNrLCB1cmxQYXRoKSB7XHJcblxyXG4gICAgbGV0IGNhbGxiYWNrU2VudCA9IGZhbHNlO1xyXG4gICAgbGV0IGZldGNoVVJMID0gYCR7REJIZWxwZXIuREFUQUJBU0VfVVJMfS8ke3VybFBhdGh9YC5yZXBsYWNlKC8oW146XVxcLylcXC8rL2csIFwiJDFcIik7XHJcblxyXG4gICAgLy9GSVJTVDogUGFyc2UgSW5wdXRcclxuICAgIGxldCBvcHRzID0gREJIZWxwZXIuX3BhcnNlVVJMSW5wdXQoZmV0Y2hVUkwpO1xyXG4gICAgbGV0IGlkID0gb3B0cy52YWx1ZTtcclxuXHJcbiAgICBjb25zdCBkYkVudHJpZXNQcm9taXNlZCA9IERCSGVscGVyLl9nZXREQkl0ZW0ob3B0cy5lbmRwb2ludCwgb3B0cy52YWx1ZSwgb3B0cy5pbmRleF9uYW1lKTtcclxuXHJcbiAgICBkYkVudHJpZXNQcm9taXNlZC50aGVuKGRiRW50cmllc0NhY2hlZCA9PiB7XHJcblxyXG4gICAgICBpZiAob3B0cy5lbmRwb2ludD09J3Jldmlld3MnKSBkYkVudHJpZXNDYWNoZWQucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgLy9JZiB5b3UgZmluZCB0aGUgZGIgZmV0Y2gsIHVzZSBpdFxyXG4gICAgICBpZiAoZGJFbnRyaWVzQ2FjaGVkLmxlbmd0aCA+IDAgfHwgZGJFbnRyaWVzQ2FjaGVkLmlkKSB7XHJcbiAgICAgICAgY2FsbGJhY2sobnVsbCwge1xyXG4gICAgICAgICAgcmVzb3VyY2U6IGRiRW50cmllc0NhY2hlZCxcclxuICAgICAgICAgIHNvdXJjZTogJ2NhY2hlJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNhbGxiYWNrU2VudCA9IHRydWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGhyLm9wZW4oJ0dFVCcsIGZldGNoVVJMKTtcclxuICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgIGNvbnN0IGRiUmVjb3JkcyA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcblxyXG4gICAgICAgICAgLy9ydW4gdGhlIGNhbGxiYWNrIGFzIHNvb24gYXMgYSByZXNwb25zZSBjb21lc1xyXG4gICAgICAgICAgaWYgKCFjYWxsYmFja1NlbnQpIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwge1xyXG4gICAgICAgICAgICAgIHJlc291cmNlOiBkYlJlY29yZHMsXHJcbiAgICAgICAgICAgICAgc291cmNlOiAnc2VydmVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2FsbGJhY2tTZW50ID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvL0FMV0FZUyB1cGRhdGUgdGhlIGl0ZW1zIGluIHRoZSBpZGJcclxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRiUmVjb3JkcykpIHtcclxuICAgICAgICAgICAgZGJSZWNvcmRzLmZvckVhY2gocmVjb3JkID0+IHtcclxuICAgICAgICAgICAgICBEQkhlbHBlci5fcHV0REJJdGVtKHJlY29yZCwgb3B0cy5lbmRwb2ludCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgREJIZWxwZXIuX3B1dERCSXRlbShkYlJlY29yZHMsIG9wdHMuZW5kcG9pbnQpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGV0IGVyciA9ICcnO1xyXG4gICAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgIGVyciA9IGAke29wdHMuZW5kcG9pbnRbMF0udG9VcHBlckNhc2UoKX0ke29wdHMuZW5kcG9pbnQuc3Vic3RyKDEpfSBkb2VzIG5vdCBleGlzdGA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlcnIgPSBgUmVxdWVzdCBmYWlsZWQgYW5kICR7b3B0cy5lbmRwb2ludH0ocykgbm90IGNhY2hlZC4gUmV0dXJuZWQgc3RhdHVzIG9mICR7eGhyLnN0YXR1c31gO1xyXG4gICAgICAgICAgICBjYWxsYmFjayhlcnIsIHtcclxuICAgICAgICAgICAgICByZXNvdXJjZTogbnVsbCxcclxuICAgICAgICAgICAgICBzb3VyY2U6ICdudWxsJ1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHhoci5zZW5kKCk7XHJcblxyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgc2VydmVyRXJySGFuZGxlcihlcnJSZXMsIG1zZ0Rpdikge1xyXG4gICAgLy9lcnJSZXMgaXMgd2hhdCBjb21lcyBmcm9tIHRoZSBTQUlMUyBiYWNrZW5kXHJcbiAgICAvL1BhcnNlIGRldGFpbGVkIGVycm9yIG1lc3NhZ2VcclxuICBcclxuICAgIGlmIChlcnJSZXMuc3RhdHVzKSB7IC8vZXJyIGZyb20gYmFja2VuZFxyXG4gICAgICBlcnJSZXMudGV4dCgpLnRoZW4oZXJyTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgc3dpdGNoIChlcnJSZXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICBjYXNlIDQwMTogLy93cm9uZyBwYXNzd29yZFxyXG4gICAgICAgICAgY2FzZSA0MDM6IC8vdXNlciBhdXRoZW50aWNhdGVkIHVzaW5nIGFub3RoZXIgcGxhdGZvcm0vbWV0aG9kXHJcbiAgICAgICAgICBjYXNlIDQwNDogLy91c2VyIG5vdCBmb3VuZFxyXG4gICAgICAgICAgZGVmYXVsdDogLy9hbm90aGVyIGVycm9yXHJcbiAgXHJcbiAgICAgICAgICAgIGlmIChtc2dEaXYpIHtcclxuICAgICAgICAgICAgICBtc2dEaXYuaW5uZXJIVE1MID0gZXJyTWVzc2FnZTsgLy9wcmluZyB0byBhIGRpdlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRVJSICR7ZXJyUmVzLnN0YXR1c306ICR7ZXJyTWVzc2FnZX1gKTsgLy9wcmludCB0byBjb25zb2xlXHJcbiAgICAgICAgICAgICAgcmV0dXJuIHtvazogZmFsc2UsIHN0YXR1czogZXJyUmVzLnN0YXR1cywgYm9keTogZXJyTWVzc2FnZSwgcmV0cnk6IGZhbHNlfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgXHJcbiAgICB9IGVsc2UgeyAvL25vdCBhIGJhY2tlbmQgZXJyb3JcclxuXHJcbiAgICAgIGlmIChlcnJSZXMuc3RhY2sgJiYgZXJyUmVzLnN0YWNrID09IFwiVHlwZUVycm9yOiBGYWlsZWQgdG8gZmV0Y2hcIikge1xyXG4gICAgICAgIHJldHVybiB7b2s6IGZhbHNlLCByZXRyeTogdHJ1ZSwgc3RhdHVzOiAnd2FpdGluZycsIGJvZHk6ICdGYWlsZWQgdG8gZmV0Y2gsIFNlcnZlciBub3QgZm91bmQnfTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobXNnRGl2KSB7XHJcbiAgICAgICAgbXNnRGl2LmlubmVySFRNTCA9IGVyclJlcztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJSZXMpO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL2NvbnZlcnQgcmVxdWVzdCBVUkwgZm9yIHJlc3RhdXJhbnQgb3IgcmV2aWV3IHRvIEpTT05cclxuICBzdGF0aWMgX3BhcnNlVVJMSW5wdXQodXJsU3RyaW5nKSB7XHJcblxyXG4gICAgbGV0IG9wdGlvbnMgPSB7fTsgLy9lbmRwb2ludCwgaW5kZXhfbmFtZSwgdmFsdWVcclxuXHJcbiAgICBsZXQgdXJsID0gbmV3IFVSTCh1cmxTdHJpbmcpO1xyXG5cclxuICAgIC8vZ2V0IHF1ZXJ5IHBhcmFtZXRlcnNcclxuICAgIGxldCBwYXJhbXNKc29uID0gZ2V0SnNvbkZyb21VcmwodXJsLnNlYXJjaCk7XHJcbiAgICBpZiAocGFyYW1zSnNvbikge1xyXG4gICAgICBvcHRpb25zLmluZGV4X25hbWUgPSBPYmplY3Qua2V5cyhwYXJhbXNKc29uKVswXVxyXG4gICAgICBvcHRpb25zLnZhbHVlID0gcGFyYW1zSnNvbltvcHRpb25zLmluZGV4X25hbWVdO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL2dldCBlbmRwb2ludCBhbmQgdmFsdWVcclxuICAgIGxldCBwYXRobmFtZSA9IHVybC5wYXRobmFtZTtcclxuICAgIGxldCBmb2xkZXJzID0gcGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoeCA9PiB4KTtcclxuICAgIGxldCBlbmRwb2ludCA9IGZvbGRlcnNbMF07XHJcbiAgICBvcHRpb25zLmVuZHBvaW50ID0gZW5kcG9pbnQ7XHJcblxyXG4gICAgaWYgKGZvbGRlcnMubGVuZ3RoID4gMSkge1xyXG4gICAgICBsZXQgdmFsdWUgPSBmb2xkZXJzLnBvcCgpO1xyXG4gICAgICBvcHRpb25zLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcblxyXG4gICAgLy9TdGFjayBFeGNoYW5nZSBGdW5jdGlvbjogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvODQ4NjA5OS9ob3ctZG8taS1wYXJzZS1hLXVybC1xdWVyeS1wYXJhbWV0ZXJzLWluLWphdmFzY3JpcHRcclxuICAgIGZ1bmN0aW9uIGdldEpzb25Gcm9tVXJsKHF1ZXJ5SW4pIHtcclxuXHJcbiAgICAgIGlmICghcXVlcnlJbikgcmV0dXJuO1xyXG5cclxuICAgICAgLy9pbmNsdWRlIHRoZSAnPycgaW4gdGhlIHF1ZXJ5IHN0cmluZ1xyXG4gICAgICB2YXIgcXVlcnkgPSBxdWVyeUluLnN1YnN0cigxKTtcclxuICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICBxdWVyeS5zcGxpdChcIiZcIikuZm9yRWFjaChmdW5jdGlvbiAocGFydCkge1xyXG4gICAgICAgIHZhciBpdGVtID0gcGFydC5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgcmVzdWx0W2l0ZW1bMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KGl0ZW1bMV0pO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuXHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9nZXREQkl0ZW0oc3RvcmVfbmFtZSwgdmFsdWUsIGluZGV4X25hbWUpIHtcclxuICAgIHJldHVybiBEQkhlbHBlci5kYlByb21pc2VkLnRoZW4oZGIgPT4ge1xyXG4gICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKHN0b3JlX25hbWUpO1xyXG5cclxuICAgICAgY29uc3QgZGJUYWJsZSA9IHR4Lm9iamVjdFN0b3JlKHN0b3JlX25hbWUpO1xyXG4gICAgICBsZXQgZGJJZHggPSBkYlRhYmxlO1xyXG5cclxuICAgICAgLy9tb2RpZnkgaW4gdGhlIGV2ZW50IG9mIGFuIGluZGV4IGJhc2VkIHNlYXJjaFxyXG4gICAgICBpZiAoaW5kZXhfbmFtZSkge1xyXG4gICAgICAgIGRiSWR4ID0gZGJUYWJsZS5pbmRleChpbmRleF9uYW1lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFsdWUgPSBpc05hTihwYXJzZUludCh2YWx1ZSkpID8gdmFsdWUgOiBwYXJzZUludCh2YWx1ZSk7XHJcblxyXG4gICAgICAvL1JldHJpZXZlIHNpbmdsZSB2YWx1ZSBvciBlbnRpcmUgdGFibGVcclxuXHJcblxyXG4gICAgICBpZiAodmFsdWUpIHsgXHJcbiAgICAgICAgcmV0dXJuIGRiSWR4LmdldEFsbChwYXJzZUludCh2YWx1ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBkYklkeC5nZXRBbGwoKTtcclxuICAgICAgfVxyXG5cclxuICAgIH0pXHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9wdXREQkl0ZW0oZW50cnksIHN0b3JlX25hbWUpIHtcclxuICAgIC8vcmV0dXJucyB0cnVlIGlmIHN1Y2Nlc3MsIGZhbHNlIGlmIGZhaWxzXHJcbiAgICByZXR1cm4gREJIZWxwZXIuZGJQcm9taXNlZC50aGVuKGRiID0+IHtcclxuICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbihzdG9yZV9uYW1lLCAncmVhZHdyaXRlJyk7XHJcbiAgICAgIGNvbnN0IHJldmlld1RhYmxlID0gdHgub2JqZWN0U3RvcmUoc3RvcmVfbmFtZSk7XHJcbiAgICAgIHJldmlld1RhYmxlLnB1dChlbnRyeSwgcGFyc2VJbnQoZW50cnkuaWQpKTtcclxuXHJcbiAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcclxuICAgIH0pLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnRW50cnlBZGRlZCcpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0pLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgLy8gY29uc29sZS5sb2coJ1Byb2JsZW0gUG9zdGluZycpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KVxyXG5cclxuICB9XHJcblxyXG4gIHN0YXRpYyBfY2hhbmdlREJGYXZvcml0ZShlbnRyeSkge1xyXG5cclxuICAgIHJldHVybiBEQkhlbHBlci5kYlByb21pc2VkLnRoZW4oIGFzeW5jIGRiID0+IHtcclxuICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmVzdGF1cmFudHMnLCdyZWFkd3JpdGUnKTtcclxuICAgICAgY29uc3QgZGJUYWJsZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXN0YXVyYW50cycpO1xyXG4gICAgICBcclxuICAgICAgLy9SZXRyaWV2ZSBzaW5nbGUgdmFsdWUgb3IgZW50aXJlIHRhYmxlXHJcbiAgICAgIGxldCByZXN0YXVyYW50ID0gYXdhaXQgZGJUYWJsZS5nZXQocGFyc2VJbnQoZW50cnkuaWQpKTtcclxuXHJcbiAgICAgIGlmICghcmVzdGF1cmFudCkgcmV0dXJuIC8vbm8gbmVlZCBmb3IgZXJyb3IsIHdpbGwgdXBkYXRlIG9uIG5leHQgc3luY1xyXG5cclxuICAgICAgLy9VcGRhdGUgYW5kIHJlcGxhY2VcclxuICAgICAgcmVzdGF1cmFudC5pc19mYXZvcml0ZSA9IEJvb2xlYW4oZW50cnkuaXNfZmF2b3JpdGUpO1xyXG4gICAgICBkYlRhYmxlLnB1dChyZXN0YXVyYW50LCBwYXJzZUludChlbnRyeS5pZCkpO1xyXG5cclxuICAgICAgLy9Eb25lXHJcbiAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgX3JlcGxhY2VEQlJldmlldyhvbGRfaWQsIG5ld19lbnRyeSkge1xyXG4gICAgcmV0dXJuIERCSGVscGVyLmRiUHJvbWlzZWQudGhlbiggZGIgPT4ge1xyXG4gICAgICBjb25zdCB0eCA9IGRiLnRyYW5zYWN0aW9uKCdyZXZpZXdzJywgJ3JlYWR3cml0ZScpO1xyXG4gICAgICBjb25zdCByZXZpZXdUYWJsZSA9IHR4Lm9iamVjdFN0b3JlKCdyZXZpZXdzJyk7XHJcbiAgICAgIHJldmlld1RhYmxlLmRlbGV0ZShwYXJzZUludChvbGRfaWQpKTtcclxuICAgICAgcmV2aWV3VGFibGUucHV0KG5ld19lbnRyeSwgcGFyc2VJbnQobmV3X2VudHJ5LmlkKSk7XHJcblxyXG4gICAgICByZXR1cm4gdHguY29tcGxldGU7XHJcbiAgICB9KS50aGVuKCgpID0+IHRydWUpLmNhdGNoKCgpPT4gZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9kZWxldGVEQlJldmlldyhvbGRfaWQpIHtcclxuICAgIHJldHVybiBEQkhlbHBlci5kYlByb21pc2VkLnRoZW4oIGRiID0+IHtcclxuICAgICAgY29uc3QgdHggPSBkYi50cmFuc2FjdGlvbigncmV2aWV3cycsICdyZWFkd3JpdGUnKTtcclxuICAgICAgY29uc3QgcmV2aWV3VGFibGUgPSB0eC5vYmplY3RTdG9yZSgncmV2aWV3cycpO1xyXG4gICAgICByZXZpZXdUYWJsZS5kZWxldGUocGFyc2VJbnQob2xkX2lkKSk7XHJcbiAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcclxuICAgIH0pLnRoZW4oKCkgPT4gdHJ1ZSkuY2F0Y2goKCk9PiBmYWxzZSk7XHJcbiAgfVxyXG5cclxuXHJcbn0iLCIvKipcclxuICogVE9ETzpGZWF0dXJlcyAmIENob3Jlc1xyXG4gKiAgMS4gQ3JlYXRlIGRlc2NyaXB0aW9ucyBmb3IgZnVuY3Rpb25zXHJcbiAqL1xyXG5cclxuIC8qXHJcbiAqXHJcbiAqICBHbG9iYWwgRE9NIHZhcnNcclxuICpcclxuICovXHJcblxyXG4gXHJcbiAvL05vdGlmaWNhdGlvbnNcclxuIC8vLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5jb25zdCBub3RpZmljYXRpb25XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5vdGlmaWNhdGlvbi13cmFwcGVyJyk7XHJcblxyXG5cclxuY2xhc3MgSFRNTEhlbHBlciB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEdlbmVyYXRlIDxpbWc+IHRhZ3Mgd2l0aCBzaXplcyBhbmQgc3Jjc2V0IGF0dHJpYnV0ZXNcclxuICAgKi9cclxuICBzdGF0aWMgZ2VuZXJhdGVJbWdIVE1MKHJlc3RhdXJhbnQsIGRlZmF1bHRTaXplLCBpbWdTaXplcyA9IFtdLCBzaXplc1F1ZXJ5ID0gJycpIHtcclxuXHJcbiAgICB2YXIgaW1nSWQ7XHJcbiAgICBpZiAoIXJlc3RhdXJhbnQucGhvdG9ncmFwaCkge1xyXG4gICAgICBpbWdJZCA9ICcwJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGltZ0lkID0gcmVzdGF1cmFudC5pZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgIGltZy5jbGFzc0xpc3QuYWRkKCdsb3phZCcpOyAvL2xhenkgbG9hZGluZ1xyXG4gICAgaW1nLnNldEF0dHJpYnV0ZSgnZGF0YS1zcmMnLCBgaW1nLyR7aW1nSWR9LSR7ZGVmYXVsdFNpemV9dy5qcGdgKTtcclxuICAgIGltZy5zZXRBdHRyaWJ1dGUoYGFsdGAsIHJlc3RhdXJhbnQucGhvdG9EZXNjKTtcclxuXHJcbiAgICBpZiAoaW1nU2l6ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICBsZXQgc3Jjc2V0VmFsID0gW107XHJcbiAgICAgIGZvciAobGV0IFtpZHgsIGltZ1NpemVdIG9mIGltZ1NpemVzLmVudHJpZXMoKSkge1xyXG4gICAgICAgIHNyY3NldFZhbC5wdXNoKGBpbWcvJHtpbWdJZH0tJHtpbWdTaXplfXcuanBnICR7aWR4ICsgMX14YClcclxuICAgICAgfVxyXG4gICAgICBpbWcuc2V0QXR0cmlidXRlKCdkYXRhLXNyY3NldCcsIHNyY3NldFZhbC5qb2luKCcsICcpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2l6ZXNRdWVyeS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgc2l6ZXNRdWVyeSk7XHJcbiAgICB9IC8vaSBtYXkgd2FudCB0byByZXdyaXRlIHRoaXMgdG8gYWNjb21tb2RhdGUgJ3cnIGluc3RlYWQgb2YgJ3gnICAgIFxyXG5cclxuICAgIHJldHVybiBpbWc7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGUgPHBpY3R1cmU+IHRhZ3MgXHJcbiAgICovXHJcbiAgc3RhdGljIGdlbmVyYXRlUGljdHVyZUhUTUwocmVzdGF1cmFudCwgaW1nU2l6ZXMsIHF1ZXJpZXMgPSBbXSkge1xyXG5cclxuICAgIC8qICBTYW1wbGUgaW5wdXRzXHJcbiAgICB2YXIgcXVlcmllcyA9IFsnKG1pbi13aWR0aDozMDBweCknLCAnJ107IC8vaW1nU2l6ZXMgbXVzdCBiZSBncmVhdGVyIHRoYW4gblF1ZXJpZXNcclxuICAgIHZhciBpbWdTaXplcyA9IFtcclxuICAgICAgWzIwMCwgNDAwLCA2MDBdLFxyXG4gICAgICBbNDAwLCA4MDBdLCAyMDBcclxuICAgIF07Ki9cclxuXHJcbiAgICBjb25zdCBwaWN0dXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncGljdHVyZScpO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW1nU2l6ZXMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgIGlmIChpIDwgcXVlcmllcy5sZW5ndGgpIHsgLy9jcmVhdGUgYSBzb3VyY2UgZWxlbWVudFxyXG5cclxuICAgICAgICBsZXQgc291cmNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XHJcbiAgICAgICAgbGV0IHNyY3NldFZhbCA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IFtpZHgsIGltZ1NpemVdIG9mIGltZ1NpemVzW2ldLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgc3Jjc2V0VmFsLnB1c2goYGltZy8ke3Jlc3RhdXJhbnQuaWR9LSR7aW1nU2l6ZX13LmpwZyAke2lkeCArIDF9eGApXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBzcmNzZXRWYWwuam9pbignLCAnKSk7XHJcblxyXG4gICAgICAgIGlmIChxdWVyaWVzW2ldLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ21lZGlhJywgcXVlcmllc1tpXSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwaWN0dXJlLmFwcGVuZENoaWxkKHNvdXJjZSk7XHJcblxyXG4gICAgICB9IGVsc2UgeyAvL2RlZmF1bHQgaW1nIHRhZ1xyXG4gICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdkYXRhLXNyYycsIGBpbWcvJHtyZXN0YXVyYW50LmlkfS0ke2ltZ1NpemVzW2ldfXcuanBnYCk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShgYWx0YCwgcmVzdGF1cmFudC5waG90b0Rlc2MpO1xyXG4gICAgICAgIHBpY3R1cmUuYXBwZW5kQ2hpbGQoaW1nKTtcclxuXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcGljdHVyZTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZS1jb25maWd1cmUgdGhlIG9yZGVyIGFuZCBmb2N1c2FiaWxpdHkgb2YgR29vZ2xlIE1hcHMgZWxlbWVudHNcclxuICAgKi9cclxuICBzdGF0aWMgc2V0TWFwVGFiT3JkZXIobWFwKSB7XHJcbiAgICAvLyBJIG1heSBuZWVkIHRvIG1vdmUgdGhlIHRhYmluZGV4IHZhbHVlIHRvIDEgZm9yIG5vbi1tYXAgZWxlbWVudHNcclxuICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyKG1hcCwgJ3RpbGVzbG9hZGVkJywgKCkgPT4ge1xyXG5cclxuICAgICAgLy9BIGxpdHRsZSBzbG9wcHksIGJ1dCB0aGUgdGltZW91dCBtYWtlcyBzdXJlIHRoZSBjb250cm9scyBhcmUgbG9hZGVkXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cclxuICAgICAgICAvL1JlbW92ZSB0YWIgaW5kZXggZnJvbTogaWZyYW1lIGFuZCBkaXZcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFwIC5nbS1zdHlsZSBkaXY6Zmlyc3QtY2hpbGQnKS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xyXG4gICAgICAgIGxldCBpRnJhbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFwIC5nbS1zdHlsZSBpZnJhbWUnKTtcclxuICAgICAgICBpRnJhbWUuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1Jlc3RhdXJhbnQgbG9jYXRpb24gbWFwJyk7XHJcbiAgICAgICAgaUZyYW1lLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XHJcblxyXG4gICAgICAgIC8vVGFiIHRocm91Z2ggZGl2cyBmaXJzdFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtYXAgLmdtLXN0eWxlIGRpdltyb2xlPVwiYnV0dG9uXCJdJylcclxuICAgICAgICAgIC5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21hcC1jb250cm9sJyk7XHJcbiAgICAgICAgICB9KTsgLy9tYXAgJiBzYXRlbGxpdGVcclxuXHJcbiAgICAgICAgLy9UaGVuIEJ1dHRvbnNcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjbWFwIC5nbS1zdHlsZSBidXR0b24nKVxyXG4gICAgICAgICAgLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbWFwLWNvbnRyb2wnKTtcclxuICAgICAgICAgIH0pOyAvL3pvb20gaW4sIHpvb21vdXQsIGZ1bGwgc2NyZWVuXHJcblxyXG4gICAgICAgIC8vRmluYWxseSBhJ3MgKGN1cnJlbnRseSBub3QgZm9jdXNhYmxlKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtYXAgLmdtLXN0eWxlIGFbaHJlZl0nKVxyXG4gICAgICAgICAgLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ21hcC1saW5rJyk7XHJcbiAgICAgICAgICB9KTsgLy96b29tIGluLCB6b29tb3V0LCBmdWxsIHNjcmVlblxyXG5cclxuICAgICAgICAvL1NldCB0aGUgYWx0IGF0dHJpYnV0ZSBvbiBnb29nbGUgbWFwc1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNtYXAgaW1nOm5vdChbYWx0XSknKVxyXG4gICAgICAgICAgLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYWx0JyxgXCJcImApO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgfSwgNTAwKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4vKlxyXG4gKlxyXG4gKiBOT1RJRklDQVRJT05TXHJcbiAqXHJcbiAqL1xyXG4gIHN0YXRpYyBwb3N0Tm90aWZpY2F0aW9uKG5vdGUpIHtcclxuICAgIC8vbm90ZSBpcyBhbiBvYmplY3Q6IHt0aXRsZSwgc3RhdHVzLCBtZXNzYWdlfVxyXG4gICAgLy9zdGF0dXMgPSBbJ2luZm8nLCAnZmFpbHVyZScsICdzdWNjZXNzJ11cclxuICBcclxuICAgIC8vY3JlYXRlIG1zZyBzdHJ1Y3R1cmVcclxuICAgIGxldCBtc2dXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBtc2dXcmFwcGVyLnNldEF0dHJpYnV0ZSgncm9sZScsICdhbGVydCcpO1xyXG4gICAgbXNnV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdub3RpZmljYXRpb24tbXNnJyk7XHJcbiAgICBtc2dXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcclxuICAgIG1zZ1dyYXBwZXIuY2xhc3NMaXN0LmFkZChub3RlLnN0YXR1cy50b0xvd2VyQ2FzZSgpKTtcclxuICBcclxuICBcclxuICAgIGxldCBtc2dIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG1zZ0hlYWRlci5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnaGVhZGluZycpO1xyXG4gICAgbXNnSGVhZGVyLnNldEF0dHJpYnV0ZSgnYXJpYS1sZXZlbCcsICcyJyk7XHJcbiAgICBtc2dIZWFkZXIuY2xhc3NMaXN0LmFkZCgnbm90aWZpY2F0aW9uLW1zZy0taGVhZGVyJyk7XHJcbiAgXHJcbiAgICBsZXQgbXNnQm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgbXNnQm9keS5jbGFzc0xpc3QuYWRkKCdub3RpZmljYXRpb24tbXNnLS1ib2R5Jyk7XHJcbiAgXHJcbiAgICBsZXQgY2xvc2VCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICBjbG9zZUJ0bi5pbm5lclRleHQgPSAnWCc7XHJcbiAgICBjbG9zZUJ0bi5jbGFzc0xpc3QuYWRkKCdub3RpZmljYXRpb24tbXNnLS1jbG9zZScpO1xyXG4gICAgY2xvc2VCdG4uc2V0QXR0cmlidXRlKCdocmVmJywgJyMnKTtcclxuICBcclxuICAgIC8vQWRkIHRoZSBub3RpZmljYXRpb24gaGVhZGVyICYgdGV4dFxyXG4gICAgbGV0IG1zZ1RpdGxlID0gbm90ZS50aXRsZSA/IG5vdGUudGl0bGUgOiBub3RlLnN0YXR1cztcclxuICAgIG1zZ0hlYWRlci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcobXNnVGl0bGUpKSk7XHJcbiAgICBtc2dCb2R5LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhub3RlLm1lc3NhZ2UpKSk7XHJcbiAgXHJcbiAgICAvL0FkZCBhIGxpc3RlbmVyIHRvIHRoZSBjbG9zZSBcclxuICAgIG1zZ1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIG1zZ1dyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xyXG4gICAgICBtc2dXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ3NlZW4nKTtcclxuICAgIH0pO1xyXG4gIFxyXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBtc2dXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcclxuICAgIH0sIDgwMDApOyAvLzUgc2Vjb25kcyB0byBmYWRlXHJcbiAgXHJcbiAgXHJcbiAgICAvL0J1aWxkIHRoZSBlbGVtZW50XHJcbiAgICBtc2dXcmFwcGVyLmFwcGVuZENoaWxkKG1zZ0hlYWRlcik7XHJcbiAgICBtc2dXcmFwcGVyLmFwcGVuZENoaWxkKG1zZ0JvZHkpO1xyXG4gICAgbXNnV3JhcHBlci5hcHBlbmRDaGlsZChjbG9zZUJ0bik7XHJcbiAgXHJcbiAgXHJcbiAgICAvL2FwcGVuZCB0byBub3RpZmljYXRpb25zXHJcbiAgICBub3RpZmljYXRpb25XcmFwcGVyLmFwcGVuZENoaWxkKG1zZ1dyYXBwZXIpO1xyXG4gIFxyXG4gIH1cclxuXHJcbiAgLypcclxuICAqXHJcbiAgKiBGYXZvcml0ZXNcclxuICAqIFxyXG4gICovXHJcblxyXG4gIC8vVGhpcyBpcyBmb3IgdGhlIGZpcnN0IHBhZ2UsIHdoZW4gcmVzdGF1cmFudHMgYXJlIGNyZWF0ZWRcclxuICBzdGF0aWMgaW5pdEZhdkVsZW1lbnQoYnRuLCBpc0Zhdikge1xyXG5cclxuXHJcbiAgICAvL2FkZCBldmVudCBsaXN0ZW5lclxyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IEhUTUxIZWxwZXIudG9nZ2xlRmF2b3JpdGUoYnRuKSk7XHJcbiAgICBidG4uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywnRmF2b3JpdGVzJyk7XHJcblxyXG4gICAgLy9zZXQgQVJJQSByb2xlc1xyXG4gICAgYnRuLnNldEF0dHJpYnV0ZSgncm9sZScsJ3N3aXRjaCcpO1xyXG5cclxuICAgIGlmIChpc0Zhdikge1xyXG4gICAgICBidG4uY2xhc3NMaXN0LmFkZCgnZmF2b3JpdGUnKTtcclxuICAgICAgYnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1jaGVja2VkJyx0cnVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtY2hlY2tlZCcsZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vU2V0IEljb24gJiBBcmlhXHJcbiAgICBIVE1MSGVscGVyLl9zZXRGYXZCdXR0b25DaGlsZHJlbihidG4sIGlzRmF2KTtcclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgX3NldEZhdkJ1dHRvbkNoaWxkcmVuKGZhdkJ0biwgaXNGYXYpIHtcclxuICAgIFxyXG4gICAgIC8vdXBkYXRlIGJ1dHRvbiBsYWJlbFxyXG4gICAgIGxldCBidG5UeHQgPSBmYXZCdG4ucXVlcnlTZWxlY3RvcignLmJ1dHRvbl9fdGV4dCcpO1xyXG4gICAgIGxldCBidG5JY29uID0gZmF2QnRuLnF1ZXJ5U2VsZWN0b3IoJy5idXR0b25fX2ljb24nKTtcclxuIFxyXG4gICAgIGlmIChidG5UeHQpIHtcclxuICAgICAgIGlmIChpc0ZhdikgeyBcclxuICAgICAgICAgYnRuVHh0LmlubmVyVGV4dCA9ICdSZW1vdmUgRmF2b3JpdGUnO1xyXG4gICAgICAgICBcclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGJ0blR4dC5pbm5lclRleHQgPSAnQWRkIEZhdm9yaXRlJztcclxuICAgICAgIH1cclxuICAgICB9XHJcbiBcclxuICAgICAvL3VzZSBjc3MgbWF5YmU/XHJcbiAgICAgaWYgKGJ0bkljb24pIHtcclxuICAgICAgIGlmIChpc0Zhdikge1xyXG4gICAgICAgICBidG5JY29uLmlubmVySFRNTCA9ICcmIzYxNDQ0Oyc7IC8vY2xvc2VkIGhlYXJ0IFxyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgYnRuSWNvbi5pbm5lckhUTUwgPSAnJiM2MTU3ODsnOyAvL29wZW4gaGVhcnQgXHJcbiAgICAgICB9XHJcbiAgICAgfSBlbHNlIHtcclxuICAgICAgIFxyXG4gICAgICBpZiAoaXNGYXYpIHtcclxuICAgICAgICBmYXZCdG4uaW5uZXJIVE1MID0gJyYjNjE0NDQ7JzsgLy9jbG9zZWQgaGVhcnQgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmF2QnRuLmlubmVySFRNTCA9ICcmIzYxNTc4Oyc7IC8vb3BlbiBoZWFydCBcclxuICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdG9nZ2xlRmF2b3JpdGUodGhpc0J0bikge1xyXG5cclxuICAgIGxldCB0aGlzSWQgPSB0aGlzQnRuLmdldEF0dHJpYnV0ZSgnZGF0YS1yZXN0LWlkJyk7XHJcbiAgICBpZiAoIXRoaXNJZCkgcmV0dXJuOyAvL0Rvbid0IGhhdmUgYW4gYXNzb2NpYXRlZCByZXN0YXVyYW50XHJcbiAgICBcclxuICAgIGxldCBpc0Zhdm9yaXRlID0gdGhpc0J0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2Zhdm9yaXRlJyk7XHJcbiAgICBsZXQgbmV3U3RhdGUgPSAhQm9vbGVhbihpc0Zhdm9yaXRlKTtcclxuICBcclxuICAgIC8vRlJPTlQgRU5EIGNoYW5nZXNcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzQnRuLmNsYXNzTGlzdC50b2dnbGUoJ2Zhdm9yaXRlJyk7IC8vY2xhc3NcclxuICAgIHRoaXNCdG4uc2V0QXR0cmlidXRlKCdhcmlhLWNoZWNrZWQnLCBuZXdTdGF0ZSk7XHJcbiAgICBIVE1MSGVscGVyLl9zZXRGYXZCdXR0b25DaGlsZHJlbih0aGlzQnRuLCBuZXdTdGF0ZSk7XHJcblxyXG4gIFxyXG4gICAgLy9CQUNLIEVORCBjaGFuZ2VzXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgbGV0IGZhdk9iaiA9IHtidG46IHRoaXNCdG4sIGlkOiBwYXJzZUludCh0aGlzSWQpLCBpc19mYXZvcml0ZTogbmV3U3RhdGV9XHJcbiAgICBEQkhlbHBlci5zZXRGYXZvcml0ZVN0YXR1cyhmYXZPYmosIChyZXMpPT4ge1xyXG4gIFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9jaGFuZ2UgbWFwIG1hcmtlclxyXG4gICAgSFRNTEhlbHBlci51cGRhdGVGYXZvcml0ZU1hcmtlcihmYXZPYmopXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgdG9nZ2xlT2ZmbGluZUNsYXNzKGZhdk9iaiwgaXNNYWtlT2ZmbGluZSkge1xyXG4gICAgLypJTlBVVDogZmF2T2JqID0ge2lkLCBidG4sIGlzRmF2fS4uLmlzTWFrZU9mZmxpbmU9Qm9vbGVhbiovXHJcblxyXG4gICAgbGV0IGJ0biA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihgLm9wdGlvbnNfX2Zhdm9yaXRlW2RhdGEtcmVzdC1pZD1cIiR7ZmF2T2JqLmlkfVwiXWApO1xyXG4gICAgaWYgKCFidG4pIHJldHVybjsgLy9jYW50IGZpbmQgdGhlIGJ1dHRvblxyXG4gICAgXHJcbiAgICAvL3RvZ2dsZSBpdFxyXG4gICAgaWYgKGlzTWFrZU9mZmxpbmUpIHtcclxuICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ29mZmxpbmUnKTtcclxuICAgIH0gZWxzZSB7IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdvZmZsaW5lJyk7IH1cclxuICB9XHJcblxyXG4gIHN0YXRpYyB1cGRhdGVGYXZvcml0ZU1hcmtlcihmYXZPYmopIHtcclxuICAgIFxyXG4gICAgLy9maW5kIHRoZSBtYXJrZXJcclxuICAgIGxldCBtYXJrZXI7XHJcbiAgICBpZihzZWxmLm1hcmtlcikge1xyXG4gICAgICBtYXJrZXIgPSBzZWxmLm1hcmtlcjtcclxuICAgIH0gZWxzZSBpZihzZWxmLm1hcmtlcnMpIHtcclxuICAgICAgbWFya2VyID0gc2VsZi5tYXJrZXJzLmZpbmQoKGVsZW1lbnQpID0+IHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudC5yZXN0X2lkID09IGZhdk9iai5pZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW1hcmtlcikgcmV0dXJuO1xyXG5cclxuICAgIG1hcmtlci5zZXRJY29uKGAuL2ltZy9pY29ucy9tYXAtaWNvbi0ke2Zhdk9iai5pc19mYXZvcml0ZSA/ICdmYXZvcml0ZSc6J3JlZ3VsYXInfS5wbmdgKTtcclxuICAgIFxyXG4gICAgLy8gbWFya2VyLnNldEFuaW1hdGlvbihnb29nbGUubWFwcy5BbmltYXRpb24uRFJPUCk7XHJcbiAgICBtYXJrZXIuc2V0QW5pbWF0aW9uKGdvb2dsZS5tYXBzLkFuaW1hdGlvbi5CT1VOQ0UpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiBtYXJrZXIuc2V0QW5pbWF0aW9uKG51bGwpLCAxNTAwKTtcclxuICB9XHJcblxyXG59XHJcblxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy9GUk9OVCBFTkQgRlVOQ1RJT05BTElUWVxyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuXHJcbi8vSW5pdGlhbGl6ZSBzdG9yYWdlXHJcbnZhciByZXZpZXdRdWV1ZSwgZmF2UXVldWU7XHJcblxyXG5jbGFzcyBEYXRhU3luYyB7XHJcblxyXG4gIC8vTWFpbiBPcGVyYXRpb25zXHJcbiAgc3RhdGljIF9nZXRRdWV1ZShuYW1lKSB7XHJcblxyXG4gICAgbGV0IHRoaXNRdWV1ZTtcclxuXHJcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xyXG4gICAgICB0aGlzUXVldWUgPSB3aW5kb3cubG9jYWxTdG9yYWdlW25hbWVdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpc1F1ZXVlID0gc2VsZltgJHtuYW1lfVF1ZXVlYF0uc3BsaWNlKDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmV0dXJuIGEgY2xvbmVkIGNvcHkgb2YgdGhlIHF1ZXVlIChub3QgdGhlIGFjdHVhbCBxdWV1ZSlcclxuICAgIHJldHVybiB0aGlzUXVldWUgPyBKU09OLnBhcnNlKHRoaXNRdWV1ZSkgOiBbXTsgLy9pbnRpYWxpemUgdG8gZW1wdHkgYXJycmF5XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgX3VwZGF0ZVF1ZXVlKG5hbWUsIG5ld1ZhbHVlKSB7IC8vJ3Jldmlldycgb3IgJ2ZhdidcclxuXHJcbiAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZSkge1xyXG4gICAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZVtuYW1lXSA9IEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBzZWxmW2Ake25hbWV9UXVldWVgXSA9IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0IGZhdm9yaXRlUXVldWUoKSB7XHJcbiAgICByZXR1cm4gRGF0YVN5bmMuX2dldFF1ZXVlKCdmYXYnKTtcclxuXHJcbiAgfVxyXG4gIHN0YXRpYyBnZXQgcmV2aWV3UXVldWUoKSB7XHJcbiAgICByZXR1cm4gRGF0YVN5bmMuX2dldFF1ZXVlKCdyZXZpZXcnKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBxdWV1ZVJldmlldyhuZXdSZXZpZXcpIHtcclxuICAgIGxldCByUXVldWUgPSAgRGF0YVN5bmMucmV2aWV3UXVldWU7XHJcbiAgICByUXVldWUucHVzaChuZXdSZXZpZXcpO1xyXG4gICAgRGF0YVN5bmMuX3VwZGF0ZVF1ZXVlKCdyZXZpZXcnLCByUXVldWUpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHF1ZXVlRmF2b3JpdGUobmV3RmF2b3JpdGUpIHtcclxuXHJcbiAgICBsZXQgY3VycmVudFF1ZXVlID0gRGF0YVN5bmMuZmF2b3JpdGVRdWV1ZTtcclxuICAgIGxldCBkdXBsaWNhdGVGbGFnID0gZmFsc2U7XHJcblxyXG4gICAgLy9JZiBhIHJlc3RhdXJhbnQgaXMgYWxyZWFkeSBvbiB0aGUgcXVldWUsIHJlbW92ZSBpdFxyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgY3VycmVudFF1ZXVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChjdXJyZW50UXVldWVbaV0uaWQgPT0gbmV3RmF2b3JpdGUuaWQpIHtcclxuXHJcbiAgICAgICAgZHVwbGljYXRlRmxhZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vcmVtb3ZlIGl0ZW0gZnJvbSBjdXJyZW50IHF1ZXVlXHJcbiAgICAgICAgSFRNTEhlbHBlci50b2dnbGVPZmZsaW5lQ2xhc3MoY3VycmVudFF1ZXVlW2ldLGZhbHNlKTtcclxuICAgICAgICBjdXJyZW50UXVldWUuc3BsaWNlKGksMSk7XHJcblxyXG4gICAgICAgIC8vc3RvcCBsb29raW5nLCB0aGVyZSB3aWxsIG9ubHkgZXZlcnkgYmUgb25lXHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWR1cGxpY2F0ZUZsYWcpIHtcclxuICAgICAgLy9hZGQgdG8gdGhlIHF1ZXVlXHJcbiAgICAgIGN1cnJlbnRRdWV1ZS5wdXNoKG5ld0Zhdm9yaXRlKTtcclxuICAgICAgSFRNTEhlbHBlci50b2dnbGVPZmZsaW5lQ2xhc3MobmV3RmF2b3JpdGUsdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgRGF0YVN5bmMuX3VwZGF0ZVF1ZXVlKCdmYXYnLCBjdXJyZW50UXVldWUpO1xyXG5cclxuICB9XHJcblxyXG4gIHN0YXRpYyBzeW5jV2l0aEJhY2tlbmQoZSkge1xyXG4gICAgLy90aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHlvdSBhcmUgYmFjayBvbmxpbmVcclxuICAgIEhUTUxIZWxwZXIucG9zdE5vdGlmaWNhdGlvbih7XHJcbiAgICAgIHRpdGxlOiAnT25saW5lJyxcclxuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXHJcbiAgICAgIG1lc3NhZ2U6ICdXZWxjb21lIGJhY2shJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9TeW5jIFJldmlld3NcclxuICAgIERhdGFTeW5jLl9zeW5jUmV2aWV3cygpO1xyXG4gICAgRGF0YVN5bmMuX3N5bmNGYXZvcml0ZXMoKTtcclxuXHJcbiAgICAvL0ltcHJvdmVtZW50OiBOZXh0IGl0ZXJhdGlvbiwgdGhpcyBzaG91bGQgYmUgaGFuZGxlZCBieSBhIHdlYiB3b3JrZXJcclxuXHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9zeW5jUmV2aWV3cygpIHtcclxuXHJcbiAgICAvL0dldCBRdWV1ZSBmcm9tIGxvY2FsU3RvcmFnZVxyXG4gICAgbGV0IHJldmlld1F1ZXVlID0gRGF0YVN5bmMucmV2aWV3UXVldWU7XHJcblxyXG4gICAgaWYgKCFyZXZpZXdRdWV1ZSkgcmV0dXJuO1xyXG5cclxuICAgIC8vUHJvY2VzcyB0aGUgUXVldWVcclxuICAgIGZvciAobGV0IGkgPSByZXZpZXdRdWV1ZS5sZW5ndGg7IGk+MDsgaS0tKSB7XHJcbiAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lKSB7XHJcbiAgICAgICAgREJIZWxwZXIuYWRkVXNlclJldmlldyhyZXZpZXdRdWV1ZVtpLTFdLCByZXZpZXdRdWV1ZVtpLTFdLnJlc3RhdXJhbnRfbmFtZSwgKHJlcykgPT4ge1xyXG5cclxuICAgICAgICAgIGlmICghcmVzLnJldHJ5KSB7XHJcblxyXG4gICAgICAgICAgICAvL3JlbW92ZSBmcm9tIHF1ZXVlXHJcbiAgICAgICAgICAgIHJldmlld1F1ZXVlLnNwbGljZShpLTEsIDEpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIC8vVXBkYXRlIHRoZSBsb2NhbFN0b3JhZ2UgKGFzeW5jLCBzbyBjYW4ndCB3YWl0IHVudGlsIGFsbCBkb25lIHcvbyBwcm9taXNlKVxyXG4gICAgICAgICAgICBEYXRhU3luYy5fdXBkYXRlUXVldWUoJ3JldmlldycsIHJldmlld1F1ZXVlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gIH1cclxuXHJcbiAgc3RhdGljIF9zeW5jRmF2b3JpdGVzKCkge1xyXG5cclxuICAgIC8vR2V0IFF1ZXVlIGZyb20gbG9jYWxTdG9yYWdlXHJcbiAgICBsZXQgZmF2c1F1ZXVlID0gRGF0YVN5bmMuZmF2b3JpdGVRdWV1ZTtcclxuXHJcbiAgICBpZiAoIWZhdnNRdWV1ZSkgcmV0dXJuO1xyXG5cclxuICAgIC8vUHJvY2VzcyB0aGUgUXVldWVcclxuICAgIGZvciAobGV0IGkgPSBmYXZzUXVldWUubGVuZ3RoOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgIGlmIChuYXZpZ2F0b3Iub25MaW5lKSB7XHJcbiAgICAgICAgREJIZWxwZXIuc2V0RmF2b3JpdGVTdGF0dXMoZmF2c1F1ZXVlW2kgLSAxXSwgKHJlcykgPT4ge1xyXG4gICAgICAgICAgaWYgKCFyZXMucmV0cnkpIHtcclxuICAgICAgICAgICAgLy9yZW1vdmUgZnJvbSBxdWV1ZVxyXG4gICAgICAgICAgICBIVE1MSGVscGVyLnRvZ2dsZU9mZmxpbmVDbGFzcyhmYXZzUXVldWVbaS0xXSxmYWxzZSk7XHJcbiAgICAgICAgICAgIGZhdnNRdWV1ZS5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9VcGRhdGUgdGhlIGxvY2FsU3RvcmFnZVxyXG4gICAgRGF0YVN5bmMuX3VwZGF0ZVF1ZXVlKCdmYXYnLCBmYXZzUXVldWUpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vL0ZST05UIEVORCBGVU5DVElPTkFMSVRZXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLypcclxuICpcclxuICogIE1PREFMIFdJTkRPV1xyXG4gKlxyXG4gKi9cclxuXHJcbmNvbnN0IG1vZGFsQnRucyA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvckFsbCgnLmJ0bi10cmlnZ2VyLW1vZGFsJyk7XHJcbmNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcignI21vZGFsLW92ZXJsYXknKTtcclxuXHJcbnZhciBmb2N1c2VkRWxlbWVudEJlZm9yZU1vZGFsO1xyXG5cclxubW9kYWxCdG5zLmZvckVhY2goaUJ0biA9PiB7XHJcblxyXG4gIC8vZ2V0IElEIGZvciBhc3NvY2lhdGVkIG1vZGFsIHdyYXBwZXJcclxuICBsZXQgbW9kYWxJRCA9IGlCdG4uZ2V0QXR0cmlidXRlKCdkYXRhLW1kbC13cnByJyk7IC8vSUQgb2Ygd3JhcHBlclxyXG4gIGxldCBtb2RhbFdyYXBwZXIgPSBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYCMke21vZGFsSUR9YCk7XHJcbiAgaUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiBvcGVuTW9kYWxXaW5kb3cobW9kYWxXcmFwcGVyKSk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gb3Blbk1vZGFsV2luZG93KG1vZGFsV3JhcHBlcikge1xyXG4gIGxldCBtb2RhbENvbnRlbnQgPSBtb2RhbFdyYXBwZXIucXVlcnlTZWxlY3RvcignLm1vZGFsLWNvbnRlbnQnKTtcclxuICBsZXQgbW9kYWxDYW5jZWwgPSBtb2RhbENvbnRlbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLWNhbmNlbCcpOyAvL2NhbmNlbEJ1dHRvblxyXG5cclxuICAvL3NhdmUgY3VycmVudCBmb2N1c1xyXG4gIGZvY3VzZWRFbGVtZW50QmVmb3JlTW9kYWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xyXG5cclxuICAvL0xpc3RlbiBmb3IgYW5kIGFkZCBrZXlib2FyZCB0cmFwXHJcbiAgbW9kYWxDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwVGFiS2V5KTtcclxuXHJcbiAgLy9EZXRlcm1pbmUgV0hJQ0ggQlVUVE9OUyBjYW4gY2xvc2UgdGhlIGFwcCAoaW4gYWRkaXRpb24gdG8gRVNDKVxyXG4gIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTW9kYWwpOyAvL2NsaWNrIGJhY2tncm91bmRcclxuICBtb2RhbENhbmNlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTW9kYWwpO1xyXG5cclxuICAvL0ZpbmQgZm9jdXNhYmxlIGNoaWxkcmVuXHJcbiAgdmFyIGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nID0gJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcclxuXHJcbiAgdmFyIGZvY3VzYWJsZUVsZW1lbnRzID0gbW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcpO1xyXG5cclxuICB2YXIgZmlyc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbMF07XHJcbiAgdmFyIGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XHJcblxyXG4gIG1vZGFsV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdzaG93LW1vZGFsJyk7XHJcbiAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ3Nob3ctbW9kYWwnKTtcclxuXHJcbiAgLy9Gb2N1cyBmaXJzdCBjaGlsZFxyXG4gIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xyXG5cclxuICBmdW5jdGlvbiB0cmFwVGFiS2V5KGUpIHtcclxuXHJcbiAgICAvL0NoZWNrIGZvciB0YWIga2V5IHByZXNzXHJcbiAgICBpZiAoZS5rZXlDb2RlID09PSA5KSB7XHJcblxyXG4gICAgICAvL1NISUZUK1RBQlxyXG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdFRhYlN0b3ApIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL1RBQlxyXG5cclxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbGFzdFRhYlN0b3ApIHtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vQ2hlY2sgZm9yIEVTQyBcclxuICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgICBtb2RhbFdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1tb2RhbCcpO1xyXG4gICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctbW9kYWwnKTtcclxuXHJcbiAgICAvL3NldCBmb2N1cyBiYWNrIHRvIGVsZW1lbnQgdGhhdCBoYWQgaXQgYmVmb3JlIG1vZGFsIHdhcyBvcGVuZWRcclxuICAgIGZvY3VzZWRFbGVtZW50QmVmb3JlTW9kYWwuZm9jdXMoKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiJdfQ==
