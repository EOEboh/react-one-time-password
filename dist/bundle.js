import React, { useState } from 'react';

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
    var length = _a.length, onChange = _a.onChange;
    var _b = useState(Array(length).fill("")), otp = _b[0], setOtp = _b[1];
    var handleChange = function (element, index) {
        var value = element.value;
        if (/[^0-9]/.test(value))
            return;
        var newOtp = __spreadArray([], otp, true);
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));
        if (value && element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    return (React.createElement("div", null, otp.map(function (_, index) { return (React.createElement("input", { key: index, type: "text", maxLength: 1, value: otp[index], onChange: function (e) { return handleChange(e.target, index); }, onFocus: function (e) { return e.target.select(); }, style: { width: "2rem", marginRight: "0.5rem", textAlign: "center" } })); })));
};

export { OTPInput };
