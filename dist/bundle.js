import React, { useState, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var OTPInput = function (_a) {
    var numberOfInputs = _a.numberOfInputs, onChange = _a.onChange, _b = _a.inputWidth, inputWidth = _b === void 0 ? "2.5rem" : _b, _c = _a.inputHeight, inputHeight = _c === void 0 ? "3rem" : _c, _d = _a.disableAutoFocus, disableAutoFocus = _d === void 0 ? false : _d, focusColor = _a.focusColor, borderRadius = _a.borderRadius, _e = _a.showSeparators, showSeparators = _e === void 0 ? true : _e, _f = _a.renderCustomSeparators, renderCustomSeparators = _f === void 0 ? function () { return React.createElement("span", { style: { margin: "0 0.5rem" } }, "-"); } : _f, inputStyle = _a.inputStyle, containerStyle = _a.containerStyle, _g = _a.inputType, inputType = _g === void 0 ? "text" : _g;
    var _h = useState(Array(numberOfInputs).fill("")), otp = _h[0], setOtp = _h[1];
    var _j = useState(false), isFocused = _j[0], setIsFocused = _j[1];
    useEffect(function () {
        if (!disableAutoFocus) {
            var firstInput = document.getElementById("otp-input-0");
            if (firstInput)
                firstInput.focus();
        }
    }, [disableAutoFocus]);
    var handleOnFocus = function (event) {
        event.target.select();
        setIsFocused(true);
    };
    var handleBlur = function () {
        setIsFocused(false);
    };
    var handleChange = function (element, index) {
        var value = element.value;
        if (/[^0-9]/.test(value))
            return;
        var newOtp = __spreadArray([], otp, true);
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));
        // maintain next focus even with `renderCustomSeparators`
        if (value) {
            var nextInput = document.getElementById("otp-input-".concat(index + 1));
            if (nextInput) {
                nextInput.focus();
            }
        }
    };
    return (React.createElement("div", { style: containerStyle }, otp.map(function (_, index) { return (React.createElement(React.Fragment, { key: index },
        React.createElement("input", { id: "otp-input-".concat(index), key: index, type: inputType, maxLength: 1, value: otp[index], onChange: function (e) { return handleChange(e.target, index); }, onFocus: handleOnFocus, onBlur: handleBlur, style: __assign({ width: inputWidth, height: inputHeight, marginRight: "0.5rem", textAlign: "center", borderRadius: borderRadius, borderColor: isFocused && focusColor ? focusColor : undefined }, inputStyle) }),
        showSeparators &&
            index < numberOfInputs - 1 &&
            (typeof renderCustomSeparators === "function"
                ? renderCustomSeparators()
                : renderCustomSeparators))); })));
};

export { OTPInput };
//# sourceMappingURL=bundle.js.map
