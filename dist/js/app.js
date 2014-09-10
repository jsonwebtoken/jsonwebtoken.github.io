(function(a) {
    if (typeof exports == "object" && typeof module == "object") module.exports = a(); else if (typeof define == "function" && define.amd) return define([], a); else this.CodeMirror = a();
})(function() {
    "use strict";
    var a = /gecko\/\d/i.test(navigator.userAgent);
    var b = /MSIE \d/.test(navigator.userAgent);
    var c = b && (document.documentMode == null || document.documentMode < 8);
    var d = b && (document.documentMode == null || document.documentMode < 9);
    var e = b && (document.documentMode == null || document.documentMode < 10);
    var f = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent);
    var g = b || f;
    var h = /WebKit\//.test(navigator.userAgent);
    var i = h && /Qt\/\d+\.\d+/.test(navigator.userAgent);
    var j = /Chrome\//.test(navigator.userAgent);
    var k = /Opera\//.test(navigator.userAgent);
    var l = /Apple Computer/.test(navigator.vendor);
    var m = /KHTML\//.test(navigator.userAgent);
    var n = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent);
    var o = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
    var p = /PhantomJS/.test(navigator.userAgent);
    var q = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
    var r = q || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
    var s = q || /Mac/.test(navigator.platform);
    var t = /win/i.test(navigator.platform);
    var u = k && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    if (u) u = Number(u[1]);
    if (u && u >= 15) {
        k = false;
        h = true;
    }
    var v = s && (i || k && (u == null || u < 12.11));
    var w = a || g && !d;
    var x = false, y = false;
    function z(a, c) {
        if (!(this instanceof z)) return new z(a, c);
        this.options = c = c || {};
        for (var d in Xd) if (!c.hasOwnProperty(d)) c[d] = Xd[d];
        M(c);
        var e = c.value;
        if (typeof e == "string") e = new pf(e, c.mode);
        var f = this.display = new A(a, e);
        f.wrapper.CodeMirror = this;
        J(this);
        H(this);
        if (c.lineWrapping) this.display.wrapper.className += " CodeMirror-wrap";
        if (c.autofocus && !r) Pc(this);
        this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: false,
            focused: false,
            suppressEdits: false,
            pasteIncoming: false,
            cutIncoming: false,
            draggingText: false,
            highlight: new kg()
        };
        if (b) setTimeout(vg(Oc, this, true), 20);
        Sc(this);
        var g = this;
        yc(this, function() {
            g.curOp.forceUpdate = true;
            tf(g, e);
            if (c.autofocus && !r || Fg() == f.input) setTimeout(vg(sd, g), 20); else td(g);
            for (var a in Yd) if (Yd.hasOwnProperty(a)) Yd[a](g, c[a], $d);
            for (var b = 0; b < ce.length; ++b) ce[b](g);
        });
    }
    function A(a, b) {
        var d = this;
        var e = d.input = Bg("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
        if (h) e.style.width = "1000px"; else e.setAttribute("wrap", "off");
        if (q) e.style.border = "1px solid black";
        e.setAttribute("autocorrect", "off");
        e.setAttribute("autocapitalize", "off");
        e.setAttribute("spellcheck", "false");
        d.inputDiv = Bg("div", [ e ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        d.scrollbarH = Bg("div", [ Bg("div", null, null, "height: 100%; min-height: 1px") ], "CodeMirror-hscrollbar");
        d.scrollbarV = Bg("div", [ Bg("div", null, null, "min-width: 1px") ], "CodeMirror-vscrollbar");
        d.scrollbarFiller = Bg("div", null, "CodeMirror-scrollbar-filler");
        d.gutterFiller = Bg("div", null, "CodeMirror-gutter-filler");
        d.lineDiv = Bg("div", null, "CodeMirror-code");
        d.selectionDiv = Bg("div", null, null, "position: relative; z-index: 1");
        d.cursorDiv = Bg("div", null, "CodeMirror-cursors");
        d.measure = Bg("div", null, "CodeMirror-measure");
        d.lineMeasure = Bg("div", null, "CodeMirror-measure");
        d.lineSpace = Bg("div", [ d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv ], null, "position: relative; outline: none");
        d.mover = Bg("div", [ Bg("div", [ d.lineSpace ], "CodeMirror-lines") ], null, "position: relative");
        d.sizer = Bg("div", [ d.mover ], "CodeMirror-sizer");
        d.heightForcer = Bg("div", null, null, "position: absolute; height: " + fg + "px; width: 1px;");
        d.gutters = Bg("div", null, "CodeMirror-gutters");
        d.lineGutter = null;
        d.scroller = Bg("div", [ d.sizer, d.heightForcer, d.gutters ], "CodeMirror-scroll");
        d.scroller.setAttribute("tabIndex", "-1");
        d.wrapper = Bg("div", [ d.inputDiv, d.scrollbarH, d.scrollbarV, d.scrollbarFiller, d.gutterFiller, d.scroller ], "CodeMirror");
        if (c) {
            d.gutters.style.zIndex = -1;
            d.scroller.style.paddingRight = 0;
        }
        if (q) e.style.width = "0px";
        if (!h) d.scroller.draggable = true;
        if (m) {
            d.inputDiv.style.height = "1px";
            d.inputDiv.style.position = "absolute";
        }
        if (c) d.scrollbarH.style.minHeight = d.scrollbarV.style.minWidth = "18px";
        if (a.appendChild) a.appendChild(d.wrapper); else a(d.wrapper);
        d.viewFrom = d.viewTo = b.first;
        d.view = [];
        d.externalMeasured = null;
        d.viewOffset = 0;
        d.lastSizeC = 0;
        d.updateLineNumbers = null;
        d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
        d.prevInput = "";
        d.alignWidgets = false;
        d.pollingFast = false;
        d.poll = new kg();
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
        d.inaccurateSelection = false;
        d.maxLine = null;
        d.maxLineLength = 0;
        d.maxLineChanged = false;
        d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
        d.shift = false;
    }
    function B(a) {
        a.doc.mode = z.getMode(a.options, a.doc.modeOption);
        C(a);
    }
    function C(a) {
        a.doc.iter(function(a) {
            if (a.stateAfter) a.stateAfter = null;
            if (a.styles) a.styles = null;
        });
        a.doc.frontier = a.doc.first;
        Rb(a, 100);
        a.state.modeGen++;
        if (a.curOp) Ec(a);
    }
    function D(a) {
        if (a.options.lineWrapping) {
            a.display.wrapper.className += " CodeMirror-wrap";
            a.display.sizer.style.minWidth = "";
        } else {
            a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-wrap", "");
            L(a);
        }
        F(a);
        Ec(a);
        hc(a);
        setTimeout(function() {
            O(a);
        }, 100);
    }
    function E(a) {
        var b = tc(a.display), c = a.options.lineWrapping;
        var d = c && Math.max(5, a.display.scroller.clientWidth / uc(a.display) - 3);
        return function(e) {
            if (Pe(a.doc, e)) return 0;
            var f = 0;
            if (e.widgets) for (var g = 0; g < e.widgets.length; g++) {
                if (e.widgets[g].height) f += e.widgets[g].height;
            }
            if (c) return f + (Math.ceil(e.text.length / d) || 1) * b; else return f + b;
        };
    }
    function F(a) {
        var b = a.doc, c = E(a);
        b.iter(function(a) {
            var b = c(a);
            if (b != a.height) xf(a, b);
        });
    }
    function G(a) {
        var b = he[a.options.keyMap], c = b.style;
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (c ? " cm-keymap-" + c : "");
    }
    function H(a) {
        a.display.wrapper.className = a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + a.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        hc(a);
    }
    function I(a) {
        J(a);
        Ec(a);
        setTimeout(function() {
            Q(a);
        }, 20);
    }
    function J(a) {
        var b = a.display.gutters, c = a.options.gutters;
        Dg(b);
        for (var d = 0; d < c.length; ++d) {
            var e = c[d];
            var f = b.appendChild(Bg("div", null, "CodeMirror-gutter " + e));
            if (e == "CodeMirror-linenumbers") {
                a.display.lineGutter = f;
                f.style.width = (a.display.lineNumWidth || 1) + "px";
            }
        }
        b.style.display = d ? "" : "none";
        var g = b.offsetWidth;
        a.display.sizer.style.marginLeft = g + "px";
        if (d) a.display.scrollbarH.style.left = a.options.fixedGutter ? g + "px" : 0;
    }
    function K(a) {
        if (a.height == 0) return 0;
        var b = a.text.length, c, d = a;
        while (c = Ie(d)) {
            var e = c.find(0, true);
            d = e.from.line;
            b += e.from.ch - e.to.ch;
        }
        d = a;
        while (c = Je(d)) {
            var e = c.find(0, true);
            b -= d.text.length - e.from.ch;
            d = e.to.line;
            b += d.text.length - e.to.ch;
        }
        return b;
    }
    function L(a) {
        var b = a.display, c = a.doc;
        b.maxLine = uf(c, c.first);
        b.maxLineLength = K(b.maxLine);
        b.maxLineChanged = true;
        c.iter(function(a) {
            var c = K(a);
            if (c > b.maxLineLength) {
                b.maxLineLength = c;
                b.maxLine = a;
            }
        });
    }
    function M(a) {
        var b = rg(a.gutters, "CodeMirror-linenumbers");
        if (b == -1 && a.lineNumbers) {
            a.gutters = a.gutters.concat([ "CodeMirror-linenumbers" ]);
        } else if (b > -1 && !a.lineNumbers) {
            a.gutters = a.gutters.slice(0);
            a.gutters.splice(b, 1);
        }
    }
    function N(a) {
        var b = a.display.scroller;
        return {
            clientHeight: b.clientHeight,
            barHeight: a.display.scrollbarV.clientHeight,
            scrollWidth: b.scrollWidth,
            clientWidth: b.clientWidth,
            barWidth: a.display.scrollbarH.clientWidth,
            docHeight: a.doc.height + Wb(a.display)
        };
    }
    function O(a, b) {
        if (!b) b = N(a);
        var c = a.display;
        var d = b.docHeight + fg;
        var e = b.scrollWidth > b.clientWidth;
        var f = d > b.clientHeight;
        if (f) {
            c.scrollbarV.style.display = "block";
            c.scrollbarV.style.bottom = e ? Ig(c.measure) + "px" : "0";
            c.scrollbarV.firstChild.style.height = Math.max(0, d - b.clientHeight + (b.barHeight || c.scrollbarV.clientHeight)) + "px";
        } else {
            c.scrollbarV.style.display = "";
            c.scrollbarV.firstChild.style.height = "0";
        }
        if (e) {
            c.scrollbarH.style.display = "block";
            c.scrollbarH.style.right = f ? Ig(c.measure) + "px" : "0";
            c.scrollbarH.firstChild.style.width = b.scrollWidth - b.clientWidth + (b.barWidth || c.scrollbarH.clientWidth) + "px";
        } else {
            c.scrollbarH.style.display = "";
            c.scrollbarH.firstChild.style.width = "0";
        }
        if (e && f) {
            c.scrollbarFiller.style.display = "block";
            c.scrollbarFiller.style.height = c.scrollbarFiller.style.width = Ig(c.measure) + "px";
        } else c.scrollbarFiller.style.display = "";
        if (e && a.options.coverGutterNextToScrollbar && a.options.fixedGutter) {
            c.gutterFiller.style.display = "block";
            c.gutterFiller.style.height = Ig(c.measure) + "px";
            c.gutterFiller.style.width = c.gutters.offsetWidth + "px";
        } else c.gutterFiller.style.display = "";
        if (n && Ig(c.measure) === 0) {
            c.scrollbarV.style.minWidth = c.scrollbarH.style.minHeight = o ? "18px" : "12px";
            var g = function(b) {
                if (Vf(b) != c.scrollbarV && Vf(b) != c.scrollbarH) zc(a, Vc)(b);
            };
            Xf(c.scrollbarV, "mousedown", g);
            Xf(c.scrollbarH, "mousedown", g);
        }
    }
    function P(a, b, c) {
        var d = c && c.top != null ? c.top : a.scroller.scrollTop;
        d = Math.floor(d - Vb(a));
        var e = c && c.bottom != null ? c.bottom : d + a.wrapper.clientHeight;
        var f = zf(b, d), g = zf(b, e);
        if (c && c.ensure) {
            var h = c.ensure.from.line, i = c.ensure.to.line;
            if (h < f) return {
                from: h,
                to: zf(b, Af(uf(b, h)) + a.wrapper.clientHeight)
            };
            if (Math.min(i, b.lastLine()) >= g) return {
                from: zf(b, Af(uf(b, i)) - a.wrapper.clientHeight),
                to: i
            };
        }
        return {
            from: f,
            to: g
        };
    }
    function Q(a) {
        var b = a.display, c = b.view;
        if (!b.alignWidgets && (!b.gutters.firstChild || !a.options.fixedGutter)) return;
        var d = T(b) - b.scroller.scrollLeft + a.doc.scrollLeft;
        var e = b.gutters.offsetWidth, f = d + "px";
        for (var g = 0; g < c.length; g++) if (!c[g].hidden) {
            if (a.options.fixedGutter && c[g].gutter) c[g].gutter.style.left = f;
            var h = c[g].alignable;
            if (h) for (var i = 0; i < h.length; i++) h[i].style.left = f;
        }
        if (a.options.fixedGutter) b.gutters.style.left = d + e + "px";
    }
    function R(a) {
        if (!a.options.lineNumbers) return false;
        var b = a.doc, c = S(a.options, b.first + b.size - 1), d = a.display;
        if (c.length != d.lineNumChars) {
            var e = d.measure.appendChild(Bg("div", [ Bg("div", c) ], "CodeMirror-linenumber CodeMirror-gutter-elt"));
            var f = e.firstChild.offsetWidth, g = e.offsetWidth - f;
            d.lineGutter.style.width = "";
            d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g);
            d.lineNumWidth = d.lineNumInnerWidth + g;
            d.lineNumChars = d.lineNumInnerWidth ? c.length : -1;
            d.lineGutter.style.width = d.lineNumWidth + "px";
            var h = d.gutters.offsetWidth;
            d.scrollbarH.style.left = a.options.fixedGutter ? h + "px" : 0;
            d.sizer.style.marginLeft = h + "px";
            return true;
        }
        return false;
    }
    function S(a, b) {
        return String(a.lineNumberFormatter(b + a.firstLineNumber));
    }
    function T(a) {
        return a.scroller.getBoundingClientRect().left - a.sizer.getBoundingClientRect().left;
    }
    function U(a, b, c) {
        var d = a.display.viewFrom, e = a.display.viewTo, f;
        var g = P(a.display, a.doc, b);
        for (var h = true; ;h = false) {
            var i = a.display.scroller.clientWidth;
            if (!V(a, g, c)) break;
            f = true;
            if (a.display.maxLineChanged && !a.options.lineWrapping) W(a);
            var j = N(a);
            Nb(a);
            X(a, j);
            O(a, j);
            if (h && a.options.lineWrapping && i != a.display.scroller.clientWidth) {
                c = true;
                continue;
            }
            c = false;
            if (b && b.top != null) b = {
                top: Math.min(j.docHeight - fg - j.clientHeight, b.top)
            };
            g = P(a.display, a.doc, b);
            if (g.from >= a.display.viewFrom && g.to <= a.display.viewTo) break;
        }
        a.display.updateLineNumbers = null;
        if (f) {
            ag(a, "update", a);
            if (a.display.viewFrom != d || a.display.viewTo != e) ag(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo);
        }
        return f;
    }
    function V(a, b, c) {
        var d = a.display, e = a.doc;
        if (!d.wrapper.offsetWidth) {
            Gc(a);
            return;
        }
        if (!c && b.from >= d.viewFrom && b.to <= d.viewTo && Kc(a) == 0) return;
        if (R(a)) Gc(a);
        var f = $(a);
        var g = e.first + e.size;
        var h = Math.max(b.from - a.options.viewportMargin, e.first);
        var i = Math.min(g, b.to + a.options.viewportMargin);
        if (d.viewFrom < h && h - d.viewFrom < 20) h = Math.max(e.first, d.viewFrom);
        if (d.viewTo > i && d.viewTo - i < 20) i = Math.min(g, d.viewTo);
        if (y) {
            h = Ne(a.doc, h);
            i = Oe(a.doc, i);
        }
        var j = h != d.viewFrom || i != d.viewTo || d.lastSizeC != d.wrapper.clientHeight;
        Jc(a, h, i);
        d.viewOffset = Af(uf(a.doc, d.viewFrom));
        a.display.mover.style.top = d.viewOffset + "px";
        var k = Kc(a);
        if (!j && k == 0 && !c) return;
        var l = Fg();
        if (k > 4) d.lineDiv.style.display = "none";
        _(a, d.updateLineNumbers, f);
        if (k > 4) d.lineDiv.style.display = "";
        if (l && Fg() != l && l.offsetHeight) l.focus();
        Dg(d.cursorDiv);
        Dg(d.selectionDiv);
        if (j) {
            d.lastSizeC = d.wrapper.clientHeight;
            Rb(a, 400);
        }
        Y(a);
        return true;
    }
    function W(a) {
        var b = a.display;
        var c = _b(a, b.maxLine, b.maxLine.text.length).left;
        b.maxLineChanged = false;
        var d = Math.max(0, c + 3);
        var e = Math.max(0, b.sizer.offsetLeft + d + fg - b.scroller.clientWidth);
        b.sizer.style.minWidth = d + "px";
        if (e < a.doc.scrollLeft) fd(a, Math.min(b.scroller.scrollLeft, e), true);
    }
    function X(a, b) {
        a.display.sizer.style.minHeight = a.display.heightForcer.style.top = b.docHeight + "px";
        a.display.gutters.style.height = Math.max(b.docHeight, b.clientHeight) + "px";
    }
    function Y(a) {
        var b = a.display;
        var d = b.lineDiv.offsetTop;
        for (var e = 0; e < b.view.length; e++) {
            var f = b.view[e], g;
            if (f.hidden) continue;
            if (c) {
                var h = f.node.offsetTop + f.node.offsetHeight;
                g = h - d;
                d = h;
            } else {
                var i = f.node.getBoundingClientRect();
                g = i.bottom - i.top;
            }
            var j = f.line.height - g;
            if (g < 2) g = tc(b);
            if (j > .001 || j < -.001) {
                xf(f.line, g);
                Z(f.line);
                if (f.rest) for (var k = 0; k < f.rest.length; k++) Z(f.rest[k]);
            }
        }
    }
    function Z(a) {
        if (a.widgets) for (var b = 0; b < a.widgets.length; ++b) a.widgets[b].height = a.widgets[b].node.offsetHeight;
    }
    function $(a) {
        var b = a.display, c = {}, d = {};
        for (var e = b.gutters.firstChild, f = 0; e; e = e.nextSibling, ++f) {
            c[a.options.gutters[f]] = e.offsetLeft;
            d[a.options.gutters[f]] = e.offsetWidth;
        }
        return {
            fixedPos: T(b),
            gutterTotalWidth: b.gutters.offsetWidth,
            gutterLeft: c,
            gutterWidth: d,
            wrapperWidth: b.wrapper.clientWidth
        };
    }
    function _(a, b, c) {
        var d = a.display, e = a.options.lineNumbers;
        var f = d.lineDiv, g = f.firstChild;
        function i(b) {
            var c = b.nextSibling;
            if (h && s && a.display.currentWheelTarget == b) b.style.display = "none"; else b.parentNode.removeChild(b);
            return c;
        }
        var j = d.view, k = d.viewFrom;
        for (var l = 0; l < j.length; l++) {
            var m = j[l];
            if (m.hidden) {} else if (!m.node) {
                var n = ib(a, m, k, c);
                f.insertBefore(n, g);
            } else {
                while (g != m.node) g = i(g);
                var o = e && b != null && b <= k && m.lineNumber;
                if (m.changes) {
                    if (rg(m.changes, "gutter") > -1) o = false;
                    ab(a, m, k, c);
                }
                if (o) {
                    Dg(m.lineNumber);
                    m.lineNumber.appendChild(document.createTextNode(S(a.options, k)));
                }
                g = m.node.nextSibling;
            }
            k += m.size;
        }
        while (g) g = i(g);
    }
    function ab(a, b, c, d) {
        for (var e = 0; e < b.changes.length; e++) {
            var f = b.changes[e];
            if (f == "text") eb(a, b); else if (f == "gutter") gb(a, b, c, d); else if (f == "class") fb(b); else if (f == "widget") hb(b, d);
        }
        b.changes = null;
    }
    function bb(a) {
        if (a.node == a.text) {
            a.node = Bg("div", null, null, "position: relative");
            if (a.text.parentNode) a.text.parentNode.replaceChild(a.node, a.text);
            a.node.appendChild(a.text);
            if (c) a.node.style.zIndex = 2;
        }
        return a.node;
    }
    function cb(a) {
        var b = a.bgClass ? a.bgClass + " " + (a.line.bgClass || "") : a.line.bgClass;
        if (b) b += " CodeMirror-linebackground";
        if (a.background) {
            if (b) a.background.className = b; else {
                a.background.parentNode.removeChild(a.background);
                a.background = null;
            }
        } else if (b) {
            var c = bb(a);
            a.background = c.insertBefore(Bg("div", null, b), c.firstChild);
        }
    }
    function db(a, b) {
        var c = a.display.externalMeasured;
        if (c && c.line == b.line) {
            a.display.externalMeasured = null;
            b.measure = c.measure;
            return c.built;
        }
        return cf(a, b);
    }
    function eb(a, b) {
        var c = b.text.className;
        var d = db(a, b);
        if (b.text == b.node) b.node = d.pre;
        b.text.parentNode.replaceChild(d.pre, b.text);
        b.text = d.pre;
        if (d.bgClass != b.bgClass || d.textClass != b.textClass) {
            b.bgClass = d.bgClass;
            b.textClass = d.textClass;
            fb(b);
        } else if (c) {
            b.text.className = c;
        }
    }
    function fb(a) {
        cb(a);
        if (a.line.wrapClass) bb(a).className = a.line.wrapClass; else if (a.node != a.text) a.node.className = "";
        var b = a.textClass ? a.textClass + " " + (a.line.textClass || "") : a.line.textClass;
        a.text.className = b || "";
    }
    function gb(a, b, c, d) {
        if (b.gutter) {
            b.node.removeChild(b.gutter);
            b.gutter = null;
        }
        var e = b.line.gutterMarkers;
        if (a.options.lineNumbers || e) {
            var f = bb(b);
            var g = b.gutter = f.insertBefore(Bg("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) + "px"), b.text);
            if (a.options.lineNumbers && (!e || !e["CodeMirror-linenumbers"])) b.lineNumber = g.appendChild(Bg("div", S(a.options, c), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + d.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + a.display.lineNumInnerWidth + "px"));
            if (e) for (var h = 0; h < a.options.gutters.length; ++h) {
                var i = a.options.gutters[h], j = e.hasOwnProperty(i) && e[i];
                if (j) g.appendChild(Bg("div", [ j ], "CodeMirror-gutter-elt", "left: " + d.gutterLeft[i] + "px; width: " + d.gutterWidth[i] + "px"));
            }
        }
    }
    function hb(a, b) {
        if (a.alignable) a.alignable = null;
        for (var c = a.node.firstChild, d; c; c = d) {
            var d = c.nextSibling;
            if (c.className == "CodeMirror-linewidget") a.node.removeChild(c);
        }
        jb(a, b);
    }
    function ib(a, b, c, d) {
        var e = db(a, b);
        b.text = b.node = e.pre;
        if (e.bgClass) b.bgClass = e.bgClass;
        if (e.textClass) b.textClass = e.textClass;
        fb(b);
        gb(a, b, c, d);
        jb(b, d);
        return b.node;
    }
    function jb(a, b) {
        kb(a.line, a, b, true);
        if (a.rest) for (var c = 0; c < a.rest.length; c++) kb(a.rest[c], a, b, false);
    }
    function kb(a, b, c, d) {
        if (!a.widgets) return;
        var e = bb(b);
        for (var f = 0, g = a.widgets; f < g.length; ++f) {
            var h = g[f], i = Bg("div", [ h.node ], "CodeMirror-linewidget");
            if (!h.handleMouseEvents) i.ignoreEvents = true;
            lb(h, i, b, c);
            if (d && h.above) e.insertBefore(i, b.gutter || b.text); else e.appendChild(i);
            ag(h, "redraw");
        }
    }
    function lb(a, b, c, d) {
        if (a.noHScroll) {
            (c.alignable || (c.alignable = [])).push(b);
            var e = d.wrapperWidth;
            b.style.left = d.fixedPos + "px";
            if (!a.coverGutter) {
                e -= d.gutterTotalWidth;
                b.style.paddingLeft = d.gutterTotalWidth + "px";
            }
            b.style.width = e + "px";
        }
        if (a.coverGutter) {
            b.style.zIndex = 5;
            b.style.position = "relative";
            if (!a.noHScroll) b.style.marginLeft = -d.gutterTotalWidth + "px";
        }
    }
    var mb = z.Pos = function(a, b) {
        if (!(this instanceof mb)) return new mb(a, b);
        this.line = a;
        this.ch = b;
    };
    var nb = z.cmpPos = function(a, b) {
        return a.line - b.line || a.ch - b.ch;
    };
    function ob(a) {
        return mb(a.line, a.ch);
    }
    function pb(a, b) {
        return nb(a, b) < 0 ? b : a;
    }
    function qb(a, b) {
        return nb(a, b) < 0 ? a : b;
    }
    function rb(a, b) {
        this.ranges = a;
        this.primIndex = b;
    }
    rb.prototype = {
        primary: function() {
            return this.ranges[this.primIndex];
        },
        equals: function(a) {
            if (a == this) return true;
            if (a.primIndex != this.primIndex || a.ranges.length != this.ranges.length) return false;
            for (var b = 0; b < this.ranges.length; b++) {
                var c = this.ranges[b], d = a.ranges[b];
                if (nb(c.anchor, d.anchor) != 0 || nb(c.head, d.head) != 0) return false;
            }
            return true;
        },
        deepCopy: function() {
            for (var a = [], b = 0; b < this.ranges.length; b++) a[b] = new sb(ob(this.ranges[b].anchor), ob(this.ranges[b].head));
            return new rb(a, this.primIndex);
        },
        somethingSelected: function() {
            for (var a = 0; a < this.ranges.length; a++) if (!this.ranges[a].empty()) return true;
            return false;
        },
        contains: function(a, b) {
            if (!b) b = a;
            for (var c = 0; c < this.ranges.length; c++) {
                var d = this.ranges[c];
                if (nb(b, d.from()) >= 0 && nb(a, d.to()) <= 0) return c;
            }
            return -1;
        }
    };
    function sb(a, b) {
        this.anchor = a;
        this.head = b;
    }
    sb.prototype = {
        from: function() {
            return qb(this.anchor, this.head);
        },
        to: function() {
            return pb(this.anchor, this.head);
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
        }
    };
    function tb(a, b) {
        var c = a[b];
        a.sort(function(a, b) {
            return nb(a.from(), b.from());
        });
        b = rg(a, c);
        for (var d = 1; d < a.length; d++) {
            var e = a[d], f = a[d - 1];
            if (nb(f.to(), e.from()) >= 0) {
                var g = qb(f.from(), e.from()), h = pb(f.to(), e.to());
                var i = f.empty() ? e.from() == e.head : f.from() == f.head;
                if (d <= b) --b;
                a.splice(--d, 2, new sb(i ? h : g, i ? g : h));
            }
        }
        return new rb(a, b);
    }
    function ub(a, b) {
        return new rb([ new sb(a, b || a) ], 0);
    }
    function vb(a, b) {
        return Math.max(a.first, Math.min(b, a.first + a.size - 1));
    }
    function wb(a, b) {
        if (b.line < a.first) return mb(a.first, 0);
        var c = a.first + a.size - 1;
        if (b.line > c) return mb(c, uf(a, c).text.length);
        return xb(b, uf(a, b.line).text.length);
    }
    function xb(a, b) {
        var c = a.ch;
        if (c == null || c > b) return mb(a.line, b); else if (c < 0) return mb(a.line, 0); else return a;
    }
    function yb(a, b) {
        return b >= a.first && b < a.first + a.size;
    }
    function zb(a, b) {
        for (var c = [], d = 0; d < b.length; d++) c[d] = wb(a, b[d]);
        return c;
    }
    function Ab(a, b, c, d) {
        if (a.cm && a.cm.display.shift || a.extend) {
            var e = b.anchor;
            if (d) {
                var f = nb(c, e) < 0;
                if (f != nb(d, e) < 0) {
                    e = c;
                    c = d;
                } else if (f != nb(c, d) < 0) {
                    c = d;
                }
            }
            return new sb(e, c);
        } else {
            return new sb(d || c, c);
        }
    }
    function Bb(a, b, c, d) {
        Hb(a, new rb([ Ab(a, a.sel.primary(), b, c) ], 0), d);
    }
    function Cb(a, b, c) {
        for (var d = [], e = 0; e < a.sel.ranges.length; e++) d[e] = Ab(a, a.sel.ranges[e], b[e], null);
        var f = tb(d, a.sel.primIndex);
        Hb(a, f, c);
    }
    function Db(a, b, c, d) {
        var e = a.sel.ranges.slice(0);
        e[b] = c;
        Hb(a, tb(e, a.sel.primIndex), d);
    }
    function Eb(a, b, c, d) {
        Hb(a, ub(b, c), d);
    }
    function Fb(a, b) {
        var c = {
            ranges: b.ranges,
            update: function(b) {
                this.ranges = [];
                for (var c = 0; c < b.length; c++) this.ranges[c] = new sb(wb(a, b[c].anchor), wb(a, b[c].head));
            }
        };
        Zf(a, "beforeSelectionChange", a, c);
        if (a.cm) Zf(a.cm, "beforeSelectionChange", a.cm, c);
        if (c.ranges != b.ranges) return tb(c.ranges, c.ranges.length - 1); else return b;
    }
    function Gb(a, b, c) {
        var d = a.history.done, e = pg(d);
        if (e && e.ranges) {
            d[d.length - 1] = b;
            Ib(a, b, c);
        } else {
            Hb(a, b, c);
        }
    }
    function Hb(a, b, c) {
        Ib(a, b, c);
        If(a, a.sel, a.cm ? a.cm.curOp.id : NaN, c);
    }
    function Ib(a, b, c) {
        if (dg(a, "beforeSelectionChange") || a.cm && dg(a.cm, "beforeSelectionChange")) b = Fb(a, b);
        var d = nb(b.primary().head, a.sel.primary().head) < 0 ? -1 : 1;
        Jb(a, Lb(a, b, d, true));
        if (!(c && c.scroll === false) && a.cm) Pd(a.cm);
    }
    function Jb(a, b) {
        if (b.equals(a.sel)) return;
        a.sel = b;
        if (a.cm) a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = a.cm.curOp.cursorActivity = true;
        ag(a, "cursorActivity", a);
    }
    function Kb(a) {
        Jb(a, Lb(a, a.sel, null, false), hg);
    }
    function Lb(a, b, c, d) {
        var e;
        for (var f = 0; f < b.ranges.length; f++) {
            var g = b.ranges[f];
            var h = Mb(a, g.anchor, c, d);
            var i = Mb(a, g.head, c, d);
            if (e || h != g.anchor || i != g.head) {
                if (!e) e = b.ranges.slice(0, f);
                e[f] = new sb(h, i);
            }
        }
        return e ? tb(e, b.primIndex) : b;
    }
    function Mb(a, b, c, d) {
        var e = false, f = b;
        var g = c || 1;
        a.cantEdit = false;
        a: for (;;) {
            var h = uf(a, f.line);
            if (h.markedSpans) {
                for (var i = 0; i < h.markedSpans.length; ++i) {
                    var j = h.markedSpans[i], k = j.marker;
                    if ((j.from == null || (k.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) && (j.to == null || (k.inclusiveRight ? j.to >= f.ch : j.to > f.ch))) {
                        if (d) {
                            Zf(k, "beforeCursorEnter");
                            if (k.explicitlyCleared) {
                                if (!h.markedSpans) break; else {
                                    --i;
                                    continue;
                                }
                            }
                        }
                        if (!k.atomic) continue;
                        var l = k.find(g < 0 ? -1 : 1);
                        if (nb(l, f) == 0) {
                            l.ch += g;
                            if (l.ch < 0) {
                                if (l.line > a.first) l = wb(a, mb(l.line - 1)); else l = null;
                            } else if (l.ch > h.text.length) {
                                if (l.line < a.first + a.size - 1) l = mb(l.line + 1, 0); else l = null;
                            }
                            if (!l) {
                                if (e) {
                                    if (!d) return Mb(a, b, c, true);
                                    a.cantEdit = true;
                                    return mb(a.first, 0);
                                }
                                e = true;
                                l = b;
                                g = -g;
                            }
                        }
                        f = l;
                        continue a;
                    }
                }
            }
            return f;
        }
    }
    function Nb(a) {
        var b = a.display, c = a.doc;
        var d = document.createDocumentFragment();
        var e = document.createDocumentFragment();
        for (var f = 0; f < c.sel.ranges.length; f++) {
            var g = c.sel.ranges[f];
            var h = g.empty();
            if (h || a.options.showCursorWhenSelecting) Ob(a, g, d);
            if (!h) Pb(a, g, e);
        }
        if (a.options.moveInputWithCursor) {
            var i = nc(a, c.sel.primary().head, "div");
            var j = b.wrapper.getBoundingClientRect(), k = b.lineDiv.getBoundingClientRect();
            var l = Math.max(0, Math.min(b.wrapper.clientHeight - 10, i.top + k.top - j.top));
            var m = Math.max(0, Math.min(b.wrapper.clientWidth - 10, i.left + k.left - j.left));
            b.inputDiv.style.top = l + "px";
            b.inputDiv.style.left = m + "px";
        }
        Eg(b.cursorDiv, d);
        Eg(b.selectionDiv, e);
    }
    function Ob(a, b, c) {
        var d = nc(a, b.head, "div");
        var e = c.appendChild(Bg("div", " ", "CodeMirror-cursor"));
        e.style.left = d.left + "px";
        e.style.top = d.top + "px";
        e.style.height = Math.max(0, d.bottom - d.top) * a.options.cursorHeight + "px";
        if (d.other) {
            var f = c.appendChild(Bg("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            f.style.display = "";
            f.style.left = d.other.left + "px";
            f.style.top = d.other.top + "px";
            f.style.height = (d.other.bottom - d.other.top) * .85 + "px";
        }
    }
    function Pb(a, b, c) {
        var d = a.display, e = a.doc;
        var f = document.createDocumentFragment();
        var g = Xb(a.display), h = g.left, i = d.lineSpace.offsetWidth - g.right;
        function j(a, b, c, d) {
            if (b < 0) b = 0;
            f.appendChild(Bg("div", null, "CodeMirror-selected", "position: absolute; left: " + a + "px; top: " + b + "px; width: " + (c == null ? i - a : c) + "px; height: " + (d - b) + "px"));
        }
        function k(b, c, d) {
            var f = uf(e, b);
            var g = f.text.length;
            var k, l;
            function m(c, d) {
                return mc(a, mb(b, c), "div", f, d);
            }
            Rg(Bf(f), c || 0, d == null ? g : d, function(a, b, e) {
                var f = m(a, "left"), n, o, p;
                if (a == b) {
                    n = f;
                    o = p = f.left;
                } else {
                    n = m(b - 1, "right");
                    if (e == "rtl") {
                        var q = f;
                        f = n;
                        n = q;
                    }
                    o = f.left;
                    p = n.right;
                }
                if (c == null && a == 0) o = h;
                if (n.top - f.top > 3) {
                    j(o, f.top, null, f.bottom);
                    o = h;
                    if (f.bottom < n.top) j(o, f.bottom, null, n.top);
                }
                if (d == null && b == g) p = i;
                if (!k || f.top < k.top || f.top == k.top && f.left < k.left) k = f;
                if (!l || n.bottom > l.bottom || n.bottom == l.bottom && n.right > l.right) l = n;
                if (o < h + 1) o = h;
                j(o, n.top, p - o, n.bottom);
            });
            return {
                start: k,
                end: l
            };
        }
        var l = b.from(), m = b.to();
        if (l.line == m.line) {
            k(l.line, l.ch, m.ch);
        } else {
            var n = uf(e, l.line), o = uf(e, m.line);
            var p = Le(n) == Le(o);
            var q = k(l.line, l.ch, p ? n.text.length + 1 : null).end;
            var r = k(m.line, p ? 0 : null, m.ch).start;
            if (p) {
                if (q.top < r.top - 2) {
                    j(q.right, q.top, null, q.bottom);
                    j(h, r.top, r.left, r.bottom);
                } else {
                    j(q.right, q.top, r.left - q.right, q.bottom);
                }
            }
            if (q.bottom < r.top) j(h, q.bottom, null, r.top);
        }
        c.appendChild(f);
    }
    function Qb(a) {
        if (!a.state.focused) return;
        var b = a.display;
        clearInterval(b.blinker);
        var c = true;
        b.cursorDiv.style.visibility = "";
        if (a.options.cursorBlinkRate > 0) b.blinker = setInterval(function() {
            b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden";
        }, a.options.cursorBlinkRate);
    }
    function Rb(a, b) {
        if (a.doc.mode.startState && a.doc.frontier < a.display.viewTo) a.state.highlight.set(b, vg(Sb, a));
    }
    function Sb(a) {
        var b = a.doc;
        if (b.frontier < b.first) b.frontier = b.first;
        if (b.frontier >= a.display.viewTo) return;
        var c = +new Date() + a.options.workTime;
        var d = ee(b.mode, Ub(a, b.frontier));
        yc(a, function() {
            b.iter(b.frontier, Math.min(b.first + b.size, a.display.viewTo + 500), function(e) {
                if (b.frontier >= a.display.viewFrom) {
                    var f = e.styles;
                    e.styles = Ye(a, e, d, true);
                    var g = !f || f.length != e.styles.length;
                    for (var h = 0; !g && h < f.length; ++h) g = f[h] != e.styles[h];
                    if (g) Fc(a, b.frontier, "text");
                    e.stateAfter = ee(b.mode, d);
                } else {
                    $e(a, e.text, d);
                    e.stateAfter = b.frontier % 5 == 0 ? ee(b.mode, d) : null;
                }
                ++b.frontier;
                if (+new Date() > c) {
                    Rb(a, a.options.workDelay);
                    return true;
                }
            });
        });
    }
    function Tb(a, b, c) {
        var d, e, f = a.doc;
        var g = c ? -1 : b - (a.doc.mode.innerMode ? 1e3 : 100);
        for (var h = b; h > g; --h) {
            if (h <= f.first) return f.first;
            var i = uf(f, h - 1);
            if (i.stateAfter && (!c || h <= f.frontier)) return h;
            var j = lg(i.text, null, a.options.tabSize);
            if (e == null || d > j) {
                e = h - 1;
                d = j;
            }
        }
        return e;
    }
    function Ub(a, b, c) {
        var d = a.doc, e = a.display;
        if (!d.mode.startState) return true;
        var f = Tb(a, b, c), g = f > d.first && uf(d, f - 1).stateAfter;
        if (!g) g = fe(d.mode); else g = ee(d.mode, g);
        d.iter(f, b, function(c) {
            $e(a, c.text, g);
            var h = f == b - 1 || f % 5 == 0 || f >= e.viewFrom && f < e.viewTo;
            c.stateAfter = h ? ee(d.mode, g) : null;
            ++f;
        });
        if (c) d.frontier = f;
        return g;
    }
    function Vb(a) {
        return a.lineSpace.offsetTop;
    }
    function Wb(a) {
        return a.mover.offsetHeight - a.lineSpace.offsetHeight;
    }
    function Xb(a) {
        if (a.cachedPaddingH) return a.cachedPaddingH;
        var b = Eg(a.measure, Bg("pre", "x"));
        var c = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle;
        return a.cachedPaddingH = {
            left: parseInt(c.paddingLeft),
            right: parseInt(c.paddingRight)
        };
    }
    function Yb(a, b, c) {
        var d = a.options.lineWrapping;
        var e = d && a.display.scroller.clientWidth;
        if (!b.measure.heights || d && b.measure.width != e) {
            var f = b.measure.heights = [];
            if (d) {
                b.measure.width = e;
                var g = b.text.firstChild.getClientRects();
                for (var h = 0; h < g.length - 1; h++) {
                    var i = g[h], j = g[h + 1];
                    if (Math.abs(i.bottom - j.bottom) > 2) f.push((i.bottom + j.top) / 2 - c.top);
                }
            }
            f.push(c.bottom - c.top);
        }
    }
    function Zb(a, b, c) {
        if (a.line == b) return {
            map: a.measure.map,
            cache: a.measure.cache
        };
        for (var d = 0; d < a.rest.length; d++) if (a.rest[d] == b) return {
            map: a.measure.maps[d],
            cache: a.measure.caches[d]
        };
        for (var d = 0; d < a.rest.length; d++) if (yf(a.rest[d]) > c) return {
            map: a.measure.maps[d],
            cache: a.measure.caches[d],
            before: true
        };
    }
    function $b(a, b) {
        b = Le(b);
        var c = yf(b);
        var d = a.display.externalMeasured = new Cc(a.doc, b, c);
        d.lineN = c;
        var e = d.built = cf(a, d);
        d.text = e.pre;
        Eg(a.display.lineMeasure, e.pre);
        return d;
    }
    function _b(a, b, c, d) {
        return cc(a, bc(a, b), c, d);
    }
    function ac(a, b) {
        if (b >= a.display.viewFrom && b < a.display.viewTo) return a.display.view[Hc(a, b)];
        var c = a.display.externalMeasured;
        if (c && b >= c.lineN && b < c.lineN + c.size) return c;
    }
    function bc(a, b) {
        var c = yf(b);
        var d = ac(a, c);
        if (d && !d.text) d = null; else if (d && d.changes) ab(a, d, c, $(a));
        if (!d) d = $b(a, b);
        var e = Zb(d, b, c);
        return {
            line: b,
            view: d,
            rect: null,
            map: e.map,
            cache: e.cache,
            before: e.before,
            hasHeights: false
        };
    }
    function cc(a, b, c, d) {
        if (b.before) c = -1;
        var e = c + (d || ""), f;
        if (b.cache.hasOwnProperty(e)) {
            f = b.cache[e];
        } else {
            if (!b.rect) b.rect = b.view.text.getBoundingClientRect();
            if (!b.hasHeights) {
                Yb(a, b.view, b.rect);
                b.hasHeights = true;
            }
            f = ec(a, b, c, d);
            if (!f.bogus) b.cache[e] = f;
        }
        return {
            left: f.left,
            right: f.right,
            top: f.top,
            bottom: f.bottom
        };
    }
    var dc = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    function ec(a, b, c, e) {
        var f = b.map;
        var h, i, j, k;
        for (var l = 0; l < f.length; l += 3) {
            var m = f[l], n = f[l + 1];
            if (c < m) {
                i = 0;
                j = 1;
                k = "left";
            } else if (c < n) {
                i = c - m;
                j = i + 1;
            } else if (l == f.length - 3 || c == n && f[l + 3] > c) {
                j = n - m;
                i = j - 1;
                if (c >= n) k = "right";
            }
            if (i != null) {
                h = f[l + 2];
                if (m == n && e == (h.insertLeft ? "left" : "right")) k = e;
                if (e == "left" && i == 0) while (l && f[l - 2] == f[l - 3] && f[l - 1].insertLeft) {
                    h = f[(l -= 3) + 2];
                    k = "left";
                }
                if (e == "right" && i == n - m) while (l < f.length - 3 && f[l + 3] == f[l + 4] && !f[l + 5].insertLeft) {
                    h = f[(l += 3) + 2];
                    k = "right";
                }
                break;
            }
        }
        var o;
        if (h.nodeType == 3) {
            while (i && Ag(b.line.text.charAt(m + i))) --i;
            while (m + j < n && Ag(b.line.text.charAt(m + j))) ++j;
            if (d && i == 0 && j == n - m) {
                o = h.parentNode.getBoundingClientRect();
            } else if (g && a.options.lineWrapping) {
                var p = Cg(h, i, j).getClientRects();
                if (p.length) o = p[e == "right" ? p.length - 1 : 0]; else o = dc;
            } else {
                o = Cg(h, i, j).getBoundingClientRect();
            }
        } else {
            if (i > 0) k = e = "right";
            var p;
            if (a.options.lineWrapping && (p = h.getClientRects()).length > 1) o = p[e == "right" ? p.length - 1 : 0]; else o = h.getBoundingClientRect();
        }
        if (d && !i && (!o || !o.left && !o.right)) {
            var q = h.parentNode.getClientRects()[0];
            if (q) o = {
                left: q.left,
                right: q.left + uc(a.display),
                top: q.top,
                bottom: q.bottom
            }; else o = dc;
        }
        var r, s = (o.bottom + o.top) / 2 - b.rect.top;
        var t = b.view.measure.heights;
        for (var l = 0; l < t.length - 1; l++) if (s < t[l]) break;
        r = l ? t[l - 1] : 0;
        s = t[l];
        var u = {
            left: (k == "right" ? o.right : o.left) - b.rect.left,
            right: (k == "left" ? o.left : o.right) - b.rect.left,
            top: r,
            bottom: s
        };
        if (!o.left && !o.right) u.bogus = true;
        return u;
    }
    function fc(a) {
        if (a.measure) {
            a.measure.cache = {};
            a.measure.heights = null;
            if (a.rest) for (var b = 0; b < a.rest.length; b++) a.measure.caches[b] = {};
        }
    }
    function gc(a) {
        a.display.externalMeasure = null;
        Dg(a.display.lineMeasure);
        for (var b = 0; b < a.display.view.length; b++) fc(a.display.view[b]);
    }
    function hc(a) {
        gc(a);
        a.display.cachedCharWidth = a.display.cachedTextHeight = a.display.cachedPaddingH = null;
        if (!a.options.lineWrapping) a.display.maxLineChanged = true;
        a.display.lineNumChars = null;
    }
    function ic() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
    }
    function jc() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop;
    }
    function kc(a, b, c, d) {
        if (b.widgets) for (var e = 0; e < b.widgets.length; ++e) if (b.widgets[e].above) {
            var f = Se(b.widgets[e]);
            c.top += f;
            c.bottom += f;
        }
        if (d == "line") return c;
        if (!d) d = "local";
        var g = Af(b);
        if (d == "local") g += Vb(a.display); else g -= a.display.viewOffset;
        if (d == "page" || d == "window") {
            var h = a.display.lineSpace.getBoundingClientRect();
            g += h.top + (d == "window" ? 0 : jc());
            var i = h.left + (d == "window" ? 0 : ic());
            c.left += i;
            c.right += i;
        }
        c.top += g;
        c.bottom += g;
        return c;
    }
    function lc(a, b, c) {
        if (c == "div") return b;
        var d = b.left, e = b.top;
        if (c == "page") {
            d -= ic();
            e -= jc();
        } else if (c == "local" || !c) {
            var f = a.display.sizer.getBoundingClientRect();
            d += f.left;
            e += f.top;
        }
        var g = a.display.lineSpace.getBoundingClientRect();
        return {
            left: d - g.left,
            top: e - g.top
        };
    }
    function mc(a, b, c, d, e) {
        if (!d) d = uf(a.doc, b.line);
        return kc(a, d, _b(a, d, b.ch, e), c);
    }
    function nc(a, b, c, d, e) {
        d = d || uf(a.doc, b.line);
        if (!e) e = bc(a, d);
        function f(b, f) {
            var g = cc(a, e, b, f ? "right" : "left");
            if (f) g.left = g.right; else g.right = g.left;
            return kc(a, d, g, c);
        }
        function g(a, b) {
            var c = h[b], d = c.level % 2;
            if (a == Sg(c) && b && c.level < h[b - 1].level) {
                c = h[--b];
                a = Tg(c) - (c.level % 2 ? 0 : 1);
                d = true;
            } else if (a == Tg(c) && b < h.length - 1 && c.level < h[b + 1].level) {
                c = h[++b];
                a = Sg(c) - c.level % 2;
                d = false;
            }
            if (d && a == c.to && a > c.from) return f(a - 1);
            return f(a, d);
        }
        var h = Bf(d), i = b.ch;
        if (!h) return f(i);
        var j = $g(h, i);
        var k = g(i, j);
        if (Zg != null) k.other = g(i, Zg);
        return k;
    }
    function oc(a, b) {
        var c = 0, b = wb(a.doc, b);
        if (!a.options.lineWrapping) c = uc(a.display) * b.ch;
        var d = uf(a.doc, b.line);
        var e = Af(d) + Vb(a.display);
        return {
            left: c,
            right: c,
            top: e,
            bottom: e + d.height
        };
    }
    function pc(a, b, c, d) {
        var e = mb(a, b);
        e.xRel = d;
        if (c) e.outside = true;
        return e;
    }
    function qc(a, b, c) {
        var d = a.doc;
        c += a.display.viewOffset;
        if (c < 0) return pc(d.first, 0, true, -1);
        var e = zf(d, c), f = d.first + d.size - 1;
        if (e > f) return pc(d.first + d.size - 1, uf(d, f).text.length, true, 1);
        if (b < 0) b = 0;
        var g = uf(d, e);
        for (;;) {
            var h = rc(a, g, e, b, c);
            var i = Je(g);
            var j = i && i.find(0, true);
            if (i && (h.ch > j.from.ch || h.ch == j.from.ch && h.xRel > 0)) e = yf(g = j.to.line); else return h;
        }
    }
    function rc(a, b, c, d, e) {
        var f = e - Af(b);
        var g = false, h = 2 * a.display.wrapper.clientWidth;
        var i = bc(a, b);
        function j(d) {
            var e = nc(a, mb(c, d), "line", b, i);
            g = true;
            if (f > e.bottom) return e.left - h; else if (f < e.top) return e.left + h; else g = false;
            return e.left;
        }
        var k = Bf(b), l = b.text.length;
        var m = Ug(b), n = Vg(b);
        var o = j(m), p = g, q = j(n), r = g;
        if (d > q) return pc(c, n, r, 1);
        for (;;) {
            if (k ? n == m || n == ah(b, m, 1) : n - m <= 1) {
                var s = d < o || d - o <= q - d ? m : n;
                var t = d - (s == m ? o : q);
                while (Ag(b.text.charAt(s))) ++s;
                var u = pc(c, s, s == m ? p : r, t < -1 ? -1 : t > 1 ? 1 : 0);
                return u;
            }
            var v = Math.ceil(l / 2), w = m + v;
            if (k) {
                w = m;
                for (var x = 0; x < v; ++x) w = ah(b, w, 1);
            }
            var y = j(w);
            if (y > d) {
                n = w;
                q = y;
                if (r = g) q += 1e3;
                l = v;
            } else {
                m = w;
                o = y;
                p = g;
                l -= v;
            }
        }
    }
    var sc;
    function tc(a) {
        if (a.cachedTextHeight != null) return a.cachedTextHeight;
        if (sc == null) {
            sc = Bg("pre");
            for (var b = 0; b < 49; ++b) {
                sc.appendChild(document.createTextNode("x"));
                sc.appendChild(Bg("br"));
            }
            sc.appendChild(document.createTextNode("x"));
        }
        Eg(a.measure, sc);
        var c = sc.offsetHeight / 50;
        if (c > 3) a.cachedTextHeight = c;
        Dg(a.measure);
        return c || 1;
    }
    function uc(a) {
        if (a.cachedCharWidth != null) return a.cachedCharWidth;
        var b = Bg("span", "xxxxxxxxxx");
        var c = Bg("pre", [ b ]);
        Eg(a.measure, c);
        var d = b.getBoundingClientRect(), e = (d.right - d.left) / 10;
        if (e > 2) a.cachedCharWidth = e;
        return e || 10;
    }
    var vc = 0;
    function wc(a) {
        a.curOp = {
            viewChanged: false,
            forceUpdate: false,
            updateInput: null,
            typing: false,
            changeObjs: null,
            cursorActivity: false,
            selectionChanged: false,
            updateMaxLine: false,
            scrollLeft: null,
            scrollTop: null,
            scrollToPos: null,
            id: ++vc
        };
        if (!_f++) $f = [];
    }
    function xc(a) {
        var b = a.curOp, c = a.doc, d = a.display;
        a.curOp = null;
        if (b.updateMaxLine) L(a);
        if (b.viewChanged || b.forceUpdate || b.scrollTop != null || b.scrollToPos && (b.scrollToPos.from.line < d.viewFrom || b.scrollToPos.to.line >= d.viewTo) || d.maxLineChanged && a.options.lineWrapping) {
            var e = U(a, {
                top: b.scrollTop,
                ensure: b.scrollToPos
            }, b.forceUpdate);
            if (a.display.scroller.offsetHeight) a.doc.scrollTop = a.display.scroller.scrollTop;
        }
        if (!e && b.selectionChanged) Nb(a);
        if (b.scrollTop != null && d.scroller.scrollTop != b.scrollTop) {
            var f = Math.max(0, Math.min(d.scroller.scrollHeight - d.scroller.clientHeight, b.scrollTop));
            d.scroller.scrollTop = d.scrollbarV.scrollTop = c.scrollTop = f;
        }
        if (b.scrollLeft != null && d.scroller.scrollLeft != b.scrollLeft) {
            var g = Math.max(0, Math.min(d.scroller.scrollWidth - d.scroller.clientWidth, b.scrollLeft));
            d.scroller.scrollLeft = d.scrollbarH.scrollLeft = c.scrollLeft = g;
            Q(a);
        }
        if (b.scrollToPos) {
            var h = Ld(a, wb(a.doc, b.scrollToPos.from), wb(a.doc, b.scrollToPos.to), b.scrollToPos.margin);
            if (b.scrollToPos.isCursor && a.state.focused) Kd(a, h);
        }
        if (b.selectionChanged) Qb(a);
        if (a.state.focused && b.updateInput) Oc(a, b.typing);
        var i = b.maybeHiddenMarkers, j = b.maybeUnhiddenMarkers;
        if (i) for (var k = 0; k < i.length; ++k) if (!i[k].lines.length) Zf(i[k], "hide");
        if (j) for (var k = 0; k < j.length; ++k) if (j[k].lines.length) Zf(j[k], "unhide");
        var l;
        if (!--_f) {
            l = $f;
            $f = null;
        }
        if (b.changeObjs) {
            for (var k = 0; k < b.changeObjs.length; k++) Zf(a, "change", a, b.changeObjs[k]);
            Zf(a, "changes", a, b.changeObjs);
        }
        if (b.cursorActivity) Zf(a, "cursorActivity", a);
        if (l) for (var k = 0; k < l.length; ++k) l[k]();
    }
    function yc(a, b) {
        if (a.curOp) return b();
        wc(a);
        try {
            return b();
        } finally {
            xc(a);
        }
    }
    function zc(a, b) {
        return function() {
            if (a.curOp) return b.apply(a, arguments);
            wc(a);
            try {
                return b.apply(a, arguments);
            } finally {
                xc(a);
            }
        };
    }
    function Ac(a) {
        return function() {
            if (this.curOp) return a.apply(this, arguments);
            wc(this);
            try {
                return a.apply(this, arguments);
            } finally {
                xc(this);
            }
        };
    }
    function Bc(a) {
        return function() {
            var b = this.cm;
            if (!b || b.curOp) return a.apply(this, arguments);
            wc(b);
            try {
                return a.apply(this, arguments);
            } finally {
                xc(b);
            }
        };
    }
    function Cc(a, b, c) {
        this.line = b;
        this.rest = Me(b);
        this.size = this.rest ? yf(pg(this.rest)) - c + 1 : 1;
        this.node = this.text = null;
        this.hidden = Pe(a, b);
    }
    function Dc(a, b, c) {
        var d = [], e;
        for (var f = b; f < c; f = e) {
            var g = new Cc(a.doc, uf(a.doc, f), f);
            e = f + g.size;
            d.push(g);
        }
        return d;
    }
    function Ec(a, b, c, d) {
        if (b == null) b = a.doc.first;
        if (c == null) c = a.doc.first + a.doc.size;
        if (!d) d = 0;
        var e = a.display;
        if (d && c < e.viewTo && (e.updateLineNumbers == null || e.updateLineNumbers > b)) e.updateLineNumbers = b;
        a.curOp.viewChanged = true;
        if (b >= e.viewTo) {
            if (y && Ne(a.doc, b) < e.viewTo) Gc(a);
        } else if (c <= e.viewFrom) {
            if (y && Oe(a.doc, c + d) > e.viewFrom) {
                Gc(a);
            } else {
                e.viewFrom += d;
                e.viewTo += d;
            }
        } else if (b <= e.viewFrom && c >= e.viewTo) {
            Gc(a);
        } else if (b <= e.viewFrom) {
            var f = Ic(a, c, c + d, 1);
            if (f) {
                e.view = e.view.slice(f.index);
                e.viewFrom = f.lineN;
                e.viewTo += d;
            } else {
                Gc(a);
            }
        } else if (c >= e.viewTo) {
            var f = Ic(a, b, b, -1);
            if (f) {
                e.view = e.view.slice(0, f.index);
                e.viewTo = f.lineN;
            } else {
                Gc(a);
            }
        } else {
            var g = Ic(a, b, b, -1);
            var h = Ic(a, c, c + d, 1);
            if (g && h) {
                e.view = e.view.slice(0, g.index).concat(Dc(a, g.lineN, h.lineN)).concat(e.view.slice(h.index));
                e.viewTo += d;
            } else {
                Gc(a);
            }
        }
        var i = e.externalMeasured;
        if (i) {
            if (c < i.lineN) i.lineN += d; else if (b < i.lineN + i.size) e.externalMeasured = null;
        }
    }
    function Fc(a, b, c) {
        a.curOp.viewChanged = true;
        var d = a.display, e = a.display.externalMeasured;
        if (e && b >= e.lineN && b < e.lineN + e.size) d.externalMeasured = null;
        if (b < d.viewFrom || b >= d.viewTo) return;
        var f = d.view[Hc(a, b)];
        if (f.node == null) return;
        var g = f.changes || (f.changes = []);
        if (rg(g, c) == -1) g.push(c);
    }
    function Gc(a) {
        a.display.viewFrom = a.display.viewTo = a.doc.first;
        a.display.view = [];
        a.display.viewOffset = 0;
    }
    function Hc(a, b) {
        if (b >= a.display.viewTo) return null;
        b -= a.display.viewFrom;
        if (b < 0) return null;
        var c = a.display.view;
        for (var d = 0; d < c.length; d++) {
            b -= c[d].size;
            if (b < 0) return d;
        }
    }
    function Ic(a, b, c, d) {
        var e = Hc(a, b), f, g = a.display.view;
        if (!y) return {
            index: e,
            lineN: c
        };
        for (var h = 0, i = a.display.viewFrom; h < e; h++) i += g[h].size;
        if (i != b) {
            if (d > 0) {
                if (e == g.length - 1) return null;
                f = i + g[e].size - b;
                e++;
            } else {
                f = i - b;
            }
            b += f;
            c += f;
        }
        while (Ne(a.doc, c) != c) {
            if (e == (d < 0 ? 0 : g.length - 1)) return null;
            c += d * g[e - (d < 0 ? 1 : 0)].size;
            e += d;
        }
        return {
            index: e,
            lineN: c
        };
    }
    function Jc(a, b, c) {
        var d = a.display, e = d.view;
        if (e.length == 0 || b >= d.viewTo || c <= d.viewFrom) {
            d.view = Dc(a, b, c);
            d.viewFrom = b;
        } else {
            if (d.viewFrom > b) d.view = Dc(a, b, d.viewFrom).concat(d.view); else if (d.viewFrom < b) d.view = d.view.slice(Hc(a, b));
            d.viewFrom = b;
            if (d.viewTo < c) d.view = d.view.concat(Dc(a, d.viewTo, c)); else if (d.viewTo > c) d.view = d.view.slice(0, Hc(a, c));
        }
        d.viewTo = c;
    }
    function Kc(a) {
        var b = a.display.view, c = 0;
        for (var d = 0; d < b.length; d++) {
            var e = b[d];
            if (!e.hidden && (!e.node || e.changes)) ++c;
        }
        return c;
    }
    function Lc(a) {
        if (a.display.pollingFast) return;
        a.display.poll.set(a.options.pollInterval, function() {
            Nc(a);
            if (a.state.focused) Lc(a);
        });
    }
    function Mc(a) {
        var b = false;
        a.display.pollingFast = true;
        function c() {
            var d = Nc(a);
            if (!d && !b) {
                b = true;
                a.display.poll.set(60, c);
            } else {
                a.display.pollingFast = false;
                Lc(a);
            }
        }
        a.display.poll.set(20, c);
    }
    function Nc(a) {
        var b = a.display.input, c = a.display.prevInput, e = a.doc;
        if (!a.state.focused || Og(b) || Rc(a) || a.options.disableInput) return false;
        if (a.state.pasteIncoming && a.state.fakedLastChar) {
            b.value = b.value.substring(0, b.value.length - 1);
            a.state.fakedLastChar = false;
        }
        var f = b.value;
        if (f == c && !a.somethingSelected()) return false;
        if (g && !d && a.display.inputHasSelection === f) {
            Oc(a);
            return false;
        }
        var h = !a.curOp;
        if (h) wc(a);
        a.display.shift = false;
        var i = 0, j = Math.min(c.length, f.length);
        while (i < j && c.charCodeAt(i) == f.charCodeAt(i)) ++i;
        var k = f.slice(i), l = Ng(k);
        var m = a.state.pasteIncoming && l.length > 1 && e.sel.ranges.length == l.length;
        for (var n = e.sel.ranges.length - 1; n >= 0; n--) {
            var o = e.sel.ranges[n];
            var p = o.from(), q = o.to();
            if (i < c.length) p = mb(p.line, p.ch - (c.length - i)); else if (a.state.overwrite && o.empty() && !a.state.pasteIncoming) q = mb(q.line, Math.min(uf(e, q.line).text.length, q.ch + pg(l).length));
            var r = a.curOp.updateInput;
            var s = {
                from: p,
                to: q,
                text: m ? [ l[n] ] : l,
                origin: a.state.pasteIncoming ? "paste" : a.state.cutIncoming ? "cut" : "+input"
            };
            Dd(a.doc, s);
            ag(a, "inputRead", a, s);
            if (k && !a.state.pasteIncoming && a.options.electricChars && a.options.smartIndent && o.head.ch < 100 && (!n || e.sel.ranges[n - 1].head.line != o.head.line)) {
                var t = a.getModeAt(o.head).electricChars;
                if (t) for (var u = 0; u < t.length; u++) if (k.indexOf(t.charAt(u)) > -1) {
                    Rd(a, o.head.line, "smart");
                    break;
                }
            }
        }
        Pd(a);
        a.curOp.updateInput = r;
        a.curOp.typing = true;
        if (f.length > 1e3 || f.indexOf("\n") > -1) b.value = a.display.prevInput = ""; else a.display.prevInput = f;
        if (h) xc(a);
        a.state.pasteIncoming = a.state.cutIncoming = false;
        return true;
    }
    function Oc(a, b) {
        var c, e, f = a.doc;
        if (a.somethingSelected()) {
            a.display.prevInput = "";
            var h = f.sel.primary();
            c = Pg && (h.to().line - h.from().line > 100 || (e = a.getSelection()).length > 1e3);
            var i = c ? "-" : e || a.getSelection();
            a.display.input.value = i;
            if (a.state.focused) qg(a.display.input);
            if (g && !d) a.display.inputHasSelection = i;
        } else if (!b) {
            a.display.prevInput = a.display.input.value = "";
            if (g && !d) a.display.inputHasSelection = null;
        }
        a.display.inaccurateSelection = c;
    }
    function Pc(a) {
        if (a.options.readOnly != "nocursor" && (!r || Fg() != a.display.input)) a.display.input.focus();
    }
    function Qc(a) {
        if (!a.state.focused) {
            Pc(a);
            sd(a);
        }
    }
    function Rc(a) {
        return a.options.readOnly || a.doc.cantEdit;
    }
    function Sc(a) {
        var c = a.display;
        Xf(c.scroller, "mousedown", zc(a, Vc));
        if (b) Xf(c.scroller, "dblclick", zc(a, function(b) {
            if (cg(a, b)) return;
            var c = Uc(a, b);
            if (!c || ad(a, b) || Tc(a.display, b)) return;
            Rf(b);
            var d = Wd(a.doc, c);
            Bb(a.doc, d.anchor, d.head);
        })); else Xf(c.scroller, "dblclick", function(b) {
            cg(a, b) || Rf(b);
        });
        Xf(c.lineSpace, "selectstart", function(a) {
            if (!Tc(c, a)) Rf(a);
        });
        if (!w) Xf(c.scroller, "contextmenu", function(b) {
            vd(a, b);
        });
        Xf(c.scroller, "scroll", function() {
            if (c.scroller.clientHeight) {
                ed(a, c.scroller.scrollTop);
                fd(a, c.scroller.scrollLeft, true);
                Zf(a, "scroll", a);
            }
        });
        Xf(c.scrollbarV, "scroll", function() {
            if (c.scroller.clientHeight) ed(a, c.scrollbarV.scrollTop);
        });
        Xf(c.scrollbarH, "scroll", function() {
            if (c.scroller.clientHeight) fd(a, c.scrollbarH.scrollLeft);
        });
        Xf(c.scroller, "mousewheel", function(b) {
            id(a, b);
        });
        Xf(c.scroller, "DOMMouseScroll", function(b) {
            id(a, b);
        });
        function e() {
            if (a.state.focused) setTimeout(vg(Pc, a), 0);
        }
        Xf(c.scrollbarH, "mousedown", e);
        Xf(c.scrollbarV, "mousedown", e);
        Xf(c.wrapper, "scroll", function() {
            c.wrapper.scrollTop = c.wrapper.scrollLeft = 0;
        });
        var f;
        function i() {
            if (f == null) f = setTimeout(function() {
                f = null;
                c.cachedCharWidth = c.cachedTextHeight = c.cachedPaddingH = Hg = null;
                a.setSize();
            }, 100);
        }
        Xf(window, "resize", i);
        function j() {
            for (var a = c.wrapper.parentNode; a && a != document.body; a = a.parentNode) {}
            if (a) setTimeout(j, 5e3); else Yf(window, "resize", i);
        }
        setTimeout(j, 5e3);
        Xf(c.input, "keyup", zc(a, qd));
        Xf(c.input, "input", function() {
            if (g && !d && a.display.inputHasSelection) a.display.inputHasSelection = null;
            Mc(a);
        });
        Xf(c.input, "keydown", zc(a, pd));
        Xf(c.input, "keypress", zc(a, rd));
        Xf(c.input, "focus", vg(sd, a));
        Xf(c.input, "blur", vg(td, a));
        function k(b) {
            if (!cg(a, b)) Uf(b);
        }
        if (a.options.dragDrop) {
            Xf(c.scroller, "dragstart", function(b) {
                dd(a, b);
            });
            Xf(c.scroller, "dragenter", k);
            Xf(c.scroller, "dragover", k);
            Xf(c.scroller, "drop", zc(a, cd));
        }
        Xf(c.scroller, "paste", function(b) {
            if (Tc(c, b)) return;
            a.state.pasteIncoming = true;
            Pc(a);
            Mc(a);
        });
        Xf(c.input, "paste", function() {
            if (h && !a.state.fakedLastChar && !(new Date() - a.state.lastMiddleDown < 200)) {
                var b = c.input.selectionStart, d = c.input.selectionEnd;
                c.input.value += "$";
                c.input.selectionStart = b;
                c.input.selectionEnd = d;
                a.state.fakedLastChar = true;
            }
            a.state.pasteIncoming = true;
            Mc(a);
        });
        function l(b) {
            if (c.inaccurateSelection) {
                c.prevInput = "";
                c.inaccurateSelection = false;
                c.input.value = a.getSelection();
                qg(c.input);
            }
            if (b.type == "cut") a.state.cutIncoming = true;
        }
        Xf(c.input, "cut", l);
        Xf(c.input, "copy", l);
        if (m) Xf(c.sizer, "mouseup", function() {
            if (Fg() == c.input) c.input.blur();
            Pc(a);
        });
    }
    function Tc(a, b) {
        for (var c = Vf(b); c != a.wrapper; c = c.parentNode) {
            if (!c || c.ignoreEvents || c.parentNode == a.sizer && c != a.mover) return true;
        }
    }
    function Uc(a, b, c, d) {
        var e = a.display;
        if (!c) {
            var f = Vf(b);
            if (f == e.scrollbarH || f == e.scrollbarV || f == e.scrollbarFiller || f == e.gutterFiller) return null;
        }
        var g, h, i = e.lineSpace.getBoundingClientRect();
        try {
            g = b.clientX - i.left;
            h = b.clientY - i.top;
        } catch (b) {
            return null;
        }
        var j = qc(a, g, h), k;
        if (d && j.xRel == 1 && (k = uf(a.doc, j.line).text).length == j.ch) {
            var l = lg(k, k.length, a.options.tabSize) - k.length;
            j = mb(j.line, Math.round((g - Xb(a.display).left) / uc(a.display)) - l);
        }
        return j;
    }
    function Vc(a) {
        if (cg(this, a)) return;
        var b = this, c = b.display;
        c.shift = a.shiftKey;
        if (Tc(c, a)) {
            if (!h) {
                c.scroller.draggable = false;
                setTimeout(function() {
                    c.scroller.draggable = true;
                }, 100);
            }
            return;
        }
        if (ad(b, a)) return;
        var d = Uc(b, a);
        window.focus();
        switch (Wf(a)) {
          case 1:
            if (d) Yc(b, a, d); else if (Vf(a) == c.scroller) Rf(a);
            break;

          case 2:
            if (h) b.state.lastMiddleDown = +new Date();
            if (d) Bb(b.doc, d);
            setTimeout(vg(Pc, b), 20);
            Rf(a);
            break;

          case 3:
            if (w) vd(b, a);
            break;
        }
    }
    var Wc, Xc;
    function Yc(a, b, c) {
        setTimeout(vg(Qc, a), 0);
        var d = +new Date(), e;
        if (Xc && Xc.time > d - 400 && nb(Xc.pos, c) == 0) {
            e = "triple";
        } else if (Wc && Wc.time > d - 400 && nb(Wc.pos, c) == 0) {
            e = "double";
            Xc = {
                time: d,
                pos: c
            };
        } else {
            e = "single";
            Wc = {
                time: d,
                pos: c
            };
        }
        var f = a.doc.sel, g = s ? b.metaKey : b.ctrlKey;
        if (a.options.dragDrop && Gg && !g && !Rc(a) && e == "single" && f.contains(c) > -1 && f.somethingSelected()) Zc(a, b, c); else $c(a, b, c, e, g);
    }
    function Zc(a, c, e) {
        var f = a.display;
        var g = zc(a, function(i) {
            if (h) f.scroller.draggable = false;
            a.state.draggingText = false;
            Yf(document, "mouseup", g);
            Yf(f.scroller, "drop", g);
            if (Math.abs(c.clientX - i.clientX) + Math.abs(c.clientY - i.clientY) < 10) {
                Rf(i);
                Bb(a.doc, e);
                Pc(a);
                if (b && !d) setTimeout(function() {
                    document.body.focus();
                    Pc(a);
                }, 20);
            }
        });
        if (h) f.scroller.draggable = true;
        a.state.draggingText = g;
        if (f.scroller.dragDrop) f.scroller.dragDrop();
        Xf(document, "mouseup", g);
        Xf(f.scroller, "drop", g);
    }
    function $c(a, b, c, d, f) {
        var h = a.display, i = a.doc;
        Rf(b);
        var j, k, l = i.sel;
        if (f) {
            k = i.sel.contains(c);
            if (k > -1) j = i.sel.ranges[k]; else j = new sb(c, c);
        } else {
            j = i.sel.primary();
        }
        if (b.altKey) {
            d = "rect";
            if (!f) j = new sb(c, c);
            c = Uc(a, b, true, true);
            k = -1;
        } else if (d == "double") {
            var m = Wd(i, c);
            if (a.display.shift || i.extend) j = Ab(i, j, m.anchor, m.head); else j = m;
        } else if (d == "triple") {
            var n = new sb(mb(c.line, 0), wb(i, mb(c.line + 1, 0)));
            if (a.display.shift || i.extend) j = Ab(i, j, n.anchor, n.head); else j = n;
        } else {
            j = Ab(i, j, c);
        }
        if (!f) {
            k = 0;
            Hb(i, new rb([ j ], 0), ig);
        } else if (k > -1) {
            Db(i, k, j, ig);
        } else {
            k = i.sel.ranges.length;
            Hb(i, tb(i.sel.ranges.concat([ j ]), k), {
                scroll: false,
                origin: "*mouse"
            });
        }
        var o = c;
        function p(b) {
            if (nb(o, b) == 0) return;
            o = b;
            if (d == "rect") {
                var e = [], f = a.options.tabSize;
                var g = lg(uf(i, c.line).text, c.ch, f);
                var h = lg(uf(i, b.line).text, b.ch, f);
                var m = Math.min(g, h), n = Math.max(g, h);
                for (var p = Math.min(c.line, b.line), q = Math.min(a.lastLine(), Math.max(c.line, b.line)); p <= q; p++) {
                    var r = uf(i, p).text, s = mg(r, m, f);
                    if (m == n) e.push(new sb(mb(p, s), mb(p, s))); else if (r.length > s) e.push(new sb(mb(p, s), mb(p, mg(r, n, f))));
                }
                if (!e.length) e.push(new sb(c, c));
                Hb(i, tb(l.ranges.slice(0, k).concat(e), k), ig);
            } else {
                var t = j;
                var u = t.anchor, v = b;
                if (d != "single") {
                    if (d == "double") var w = Wd(i, b); else var w = new sb(mb(b.line, 0), wb(i, mb(b.line + 1, 0)));
                    if (nb(w.anchor, u) > 0) {
                        v = w.head;
                        u = qb(t.from(), w.anchor);
                    } else {
                        v = w.anchor;
                        u = pb(t.to(), w.head);
                    }
                }
                var e = l.ranges.slice(0);
                e[k] = new sb(wb(i, u), v);
                Hb(i, tb(e, k), ig);
            }
        }
        var q = h.wrapper.getBoundingClientRect();
        var r = 0;
        function s(b) {
            var c = ++r;
            var e = Uc(a, b, true, d == "rect");
            if (!e) return;
            if (nb(e, o) != 0) {
                Qc(a);
                p(e);
                var f = P(h, i);
                if (e.line >= f.to || e.line < f.from) setTimeout(zc(a, function() {
                    if (r == c) s(b);
                }), 150);
            } else {
                var g = b.clientY < q.top ? -20 : b.clientY > q.bottom ? 20 : 0;
                if (g) setTimeout(zc(a, function() {
                    if (r != c) return;
                    h.scroller.scrollTop += g;
                    s(b);
                }), 50);
            }
        }
        function t(b) {
            r = Infinity;
            Rf(b);
            Pc(a);
            Yf(document, "mousemove", u);
            Yf(document, "mouseup", v);
            i.history.lastSelOrigin = null;
        }
        var u = zc(a, function(a) {
            if (g && !e ? !a.buttons : !Wf(a)) t(a); else s(a);
        });
        var v = zc(a, t);
        Xf(document, "mousemove", u);
        Xf(document, "mouseup", v);
    }
    function _c(a, b, c, d, e) {
        try {
            var f = b.clientX, g = b.clientY;
        } catch (b) {
            return false;
        }
        if (f >= Math.floor(a.display.gutters.getBoundingClientRect().right)) return false;
        if (d) Rf(b);
        var h = a.display;
        var i = h.lineDiv.getBoundingClientRect();
        if (g > i.bottom || !dg(a, c)) return Tf(b);
        g -= i.top - h.viewOffset;
        for (var j = 0; j < a.options.gutters.length; ++j) {
            var k = h.gutters.childNodes[j];
            if (k && k.getBoundingClientRect().right >= f) {
                var l = zf(a.doc, g);
                var m = a.options.gutters[j];
                e(a, c, a, l, m, b);
                return Tf(b);
            }
        }
    }
    function ad(a, b) {
        return _c(a, b, "gutterClick", true, ag);
    }
    var bd = 0;
    function cd(a) {
        var c = this;
        if (cg(c, a) || Tc(c.display, a)) return;
        Rf(a);
        if (b) bd = +new Date();
        var d = Uc(c, a, true), e = a.dataTransfer.files;
        if (!d || Rc(c)) return;
        if (e && e.length && window.FileReader && window.File) {
            var f = e.length, g = Array(f), h = 0;
            var i = function(a, b) {
                var e = new FileReader();
                e.onload = function() {
                    g[b] = e.result;
                    if (++h == f) {
                        d = wb(c.doc, d);
                        var a = {
                            from: d,
                            to: d,
                            text: Ng(g.join("\n")),
                            origin: "paste"
                        };
                        Dd(c.doc, a);
                        Gb(c.doc, ub(d, xd(a)));
                    }
                };
                e.readAsText(a);
            };
            for (var j = 0; j < f; ++j) i(e[j], j);
        } else {
            if (c.state.draggingText && c.doc.sel.contains(d) > -1) {
                c.state.draggingText(a);
                setTimeout(vg(Pc, c), 20);
                return;
            }
            try {
                var g = a.dataTransfer.getData("Text");
                if (g) {
                    var k = c.state.draggingText && c.listSelections();
                    Ib(c.doc, ub(d, d));
                    if (k) for (var j = 0; j < k.length; ++j) Jd(c.doc, "", k[j].anchor, k[j].head, "drag");
                    c.replaceSelection(g, "around", "paste");
                    Pc(c);
                }
            } catch (a) {}
        }
    }
    function dd(a, c) {
        if (b && (!a.state.draggingText || +new Date() - bd < 100)) {
            Uf(c);
            return;
        }
        if (cg(a, c) || Tc(a.display, c)) return;
        c.dataTransfer.setData("Text", a.getSelection());
        if (c.dataTransfer.setDragImage && !l) {
            var d = Bg("img", null, null, "position: fixed; left: 0; top: 0;");
            d.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            if (k) {
                d.width = d.height = 1;
                a.display.wrapper.appendChild(d);
                d._top = d.offsetTop;
            }
            c.dataTransfer.setDragImage(d, 0, 0);
            if (k) d.parentNode.removeChild(d);
        }
    }
    function ed(b, c) {
        if (Math.abs(b.doc.scrollTop - c) < 2) return;
        b.doc.scrollTop = c;
        if (!a) U(b, {
            top: c
        });
        if (b.display.scroller.scrollTop != c) b.display.scroller.scrollTop = c;
        if (b.display.scrollbarV.scrollTop != c) b.display.scrollbarV.scrollTop = c;
        if (a) U(b);
        Rb(b, 100);
    }
    function fd(a, b, c) {
        if (c ? b == a.doc.scrollLeft : Math.abs(a.doc.scrollLeft - b) < 2) return;
        b = Math.min(b, a.display.scroller.scrollWidth - a.display.scroller.clientWidth);
        a.doc.scrollLeft = b;
        Q(a);
        if (a.display.scroller.scrollLeft != b) a.display.scroller.scrollLeft = b;
        if (a.display.scrollbarH.scrollLeft != b) a.display.scrollbarH.scrollLeft = b;
    }
    var gd = 0, hd = null;
    if (g) hd = -.53; else if (a) hd = 15; else if (j) hd = -.7; else if (l) hd = -1 / 3;
    function id(b, c) {
        var d = c.wheelDeltaX, e = c.wheelDeltaY;
        if (d == null && c.detail && c.axis == c.HORIZONTAL_AXIS) d = c.detail;
        if (e == null && c.detail && c.axis == c.VERTICAL_AXIS) e = c.detail; else if (e == null) e = c.wheelDelta;
        var f = b.display, g = f.scroller;
        if (!(d && g.scrollWidth > g.clientWidth || e && g.scrollHeight > g.clientHeight)) return;
        if (e && s && h) {
            a: for (var i = c.target, j = f.view; i != g; i = i.parentNode) {
                for (var l = 0; l < j.length; l++) {
                    if (j[l].node == i) {
                        b.display.currentWheelTarget = i;
                        break a;
                    }
                }
            }
        }
        if (d && !a && !k && hd != null) {
            if (e) ed(b, Math.max(0, Math.min(g.scrollTop + e * hd, g.scrollHeight - g.clientHeight)));
            fd(b, Math.max(0, Math.min(g.scrollLeft + d * hd, g.scrollWidth - g.clientWidth)));
            Rf(c);
            f.wheelStartX = null;
            return;
        }
        if (e && hd != null) {
            var m = e * hd;
            var n = b.doc.scrollTop, o = n + f.wrapper.clientHeight;
            if (m < 0) n = Math.max(0, n + m - 50); else o = Math.min(b.doc.height, o + m + 50);
            U(b, {
                top: n,
                bottom: o
            });
        }
        if (gd < 20) {
            if (f.wheelStartX == null) {
                f.wheelStartX = g.scrollLeft;
                f.wheelStartY = g.scrollTop;
                f.wheelDX = d;
                f.wheelDY = e;
                setTimeout(function() {
                    if (f.wheelStartX == null) return;
                    var a = g.scrollLeft - f.wheelStartX;
                    var b = g.scrollTop - f.wheelStartY;
                    var c = b && f.wheelDY && b / f.wheelDY || a && f.wheelDX && a / f.wheelDX;
                    f.wheelStartX = f.wheelStartY = null;
                    if (!c) return;
                    hd = (hd * gd + c) / (gd + 1);
                    ++gd;
                }, 200);
            } else {
                f.wheelDX += d;
                f.wheelDY += e;
            }
        }
    }
    function jd(a, b, c) {
        if (typeof b == "string") {
            b = ge[b];
            if (!b) return false;
        }
        if (a.display.pollingFast && Nc(a)) a.display.pollingFast = false;
        var d = a.display.shift, e = false;
        try {
            if (Rc(a)) a.state.suppressEdits = true;
            if (c) a.display.shift = false;
            e = b(a) != gg;
        } finally {
            a.display.shift = d;
            a.state.suppressEdits = false;
        }
        return e;
    }
    function kd(a) {
        var b = a.state.keyMaps.slice(0);
        if (a.options.extraKeys) b.push(a.options.extraKeys);
        b.push(a.options.keyMap);
        return b;
    }
    var ld;
    function md(a, b) {
        var c = ie(a.options.keyMap), d = c.auto;
        clearTimeout(ld);
        if (d && !ke(b)) ld = setTimeout(function() {
            if (ie(a.options.keyMap) == c) {
                a.options.keyMap = d.call ? d.call(null, a) : d;
                G(a);
            }
        }, 50);
        var e = le(b, true), f = false;
        if (!e) return false;
        var g = kd(a);
        if (b.shiftKey) {
            f = je("Shift-" + e, g, function(b) {
                return jd(a, b, true);
            }) || je(e, g, function(b) {
                if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) return jd(a, b);
            });
        } else {
            f = je(e, g, function(b) {
                return jd(a, b);
            });
        }
        if (f) {
            Rf(b);
            Qb(a);
            ag(a, "keyHandled", a, e, b);
        }
        return f;
    }
    function nd(a, b, c) {
        var d = je("'" + c + "'", kd(a), function(b) {
            return jd(a, b, true);
        });
        if (d) {
            Rf(b);
            Qb(a);
            ag(a, "keyHandled", a, "'" + c + "'", b);
        }
        return d;
    }
    var od = null;
    function pd(a) {
        var c = this;
        Qc(c);
        if (cg(c, a)) return;
        if (b && a.keyCode == 27) a.returnValue = false;
        var d = a.keyCode;
        c.display.shift = d == 16 || a.shiftKey;
        var e = md(c, a);
        if (k) {
            od = e ? d : null;
            if (!e && d == 88 && !Pg && (s ? a.metaKey : a.ctrlKey)) c.replaceSelection("", null, "cut");
        }
    }
    function qd(a) {
        if (cg(this, a)) return;
        if (a.keyCode == 16) this.doc.sel.shift = false;
    }
    function rd(a) {
        var b = this;
        if (cg(b, a)) return;
        var c = a.keyCode, e = a.charCode;
        if (k && c == od) {
            od = null;
            Rf(a);
            return;
        }
        if ((k && (!a.which || a.which < 10) || m) && md(b, a)) return;
        var f = String.fromCharCode(e == null ? c : e);
        if (nd(b, a, f)) return;
        if (g && !d) b.display.inputHasSelection = null;
        Mc(b);
    }
    function sd(a) {
        if (a.options.readOnly == "nocursor") return;
        if (!a.state.focused) {
            Zf(a, "focus", a);
            a.state.focused = true;
            if (a.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1) a.display.wrapper.className += " CodeMirror-focused";
            if (!a.curOp) {
                Oc(a);
                if (h) setTimeout(vg(Oc, a, true), 0);
            }
        }
        Lc(a);
        Qb(a);
    }
    function td(a) {
        if (a.state.focused) {
            Zf(a, "blur", a);
            a.state.focused = false;
            a.display.wrapper.className = a.display.wrapper.className.replace(" CodeMirror-focused", "");
        }
        clearInterval(a.display.blinker);
        setTimeout(function() {
            if (!a.state.focused) a.display.shift = false;
        }, 150);
    }
    var ud;
    function vd(a, b) {
        if (cg(a, b, "contextmenu")) return;
        var c = a.display;
        if (Tc(c, b) || wd(a, b)) return;
        var e = Uc(a, b), f = c.scroller.scrollTop;
        if (!e || k) return;
        var h = a.options.resetSelectionOnContextMenu;
        if (h && a.doc.sel.contains(e) == -1) zc(a, Hb)(a.doc, ub(e), hg);
        var i = c.input.style.cssText;
        c.inputDiv.style.position = "absolute";
        c.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (b.clientY - 5) + "px; left: " + (b.clientX - 5) + "px; z-index: 1000; background: transparent; outline: none;" + "border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);";
        Pc(a);
        Oc(a);
        var j = a.somethingSelected();
        if (!j) c.input.value = c.prevInput = " ";
        function l() {
            if (c.input.selectionStart != null) {
                var a = c.input.value = "​" + (j ? c.input.value : "");
                c.prevInput = "​";
                c.input.selectionStart = 1;
                c.input.selectionEnd = a.length;
            }
        }
        function m() {
            c.inputDiv.style.position = "relative";
            c.input.style.cssText = i;
            if (d) c.scrollbarV.scrollTop = c.scroller.scrollTop = f;
            Lc(a);
            if (c.input.selectionStart != null) {
                if (!g || d) l();
                clearTimeout(ud);
                var b = 0, e = function() {
                    if (c.prevInput == "​" && c.input.selectionStart == 0) zc(a, ge.selectAll)(a); else if (b++ < 10) ud = setTimeout(e, 500); else Oc(a);
                };
                ud = setTimeout(e, 200);
            }
        }
        if (g && !d) l();
        if (w) {
            Uf(b);
            var n = function() {
                Yf(window, "mouseup", n);
                setTimeout(m, 20);
            };
            Xf(window, "mouseup", n);
        } else {
            setTimeout(m, 50);
        }
    }
    function wd(a, b) {
        if (!dg(a, "gutterContextMenu")) return false;
        return _c(a, b, "gutterContextMenu", false, Zf);
    }
    var xd = z.changeEnd = function(a) {
        if (!a.text) return a.to;
        return mb(a.from.line + a.text.length - 1, pg(a.text).length + (a.text.length == 1 ? a.from.ch : 0));
    };
    function yd(a, b) {
        if (nb(a, b.from) < 0) return a;
        if (nb(a, b.to) <= 0) return xd(b);
        var c = a.line + b.text.length - (b.to.line - b.from.line) - 1, d = a.ch;
        if (a.line == b.to.line) d += xd(b).ch - b.to.ch;
        return mb(c, d);
    }
    function zd(a, b) {
        var c = [];
        for (var d = 0; d < a.sel.ranges.length; d++) {
            var e = a.sel.ranges[d];
            c.push(new sb(yd(e.anchor, b), yd(e.head, b)));
        }
        return tb(c, a.sel.primIndex);
    }
    function Ad(a, b, c) {
        if (a.line == b.line) return mb(c.line, a.ch - b.ch + c.ch); else return mb(c.line + (a.line - b.line), a.ch);
    }
    function Bd(a, b, c) {
        var d = [];
        var e = mb(a.first, 0), f = e;
        for (var g = 0; g < b.length; g++) {
            var h = b[g];
            var i = Ad(h.from, e, f);
            var j = Ad(xd(h), e, f);
            e = h.to;
            f = j;
            if (c == "around") {
                var k = a.sel.ranges[g], l = nb(k.head, k.anchor) < 0;
                d[g] = new sb(l ? j : i, l ? i : j);
            } else {
                d[g] = new sb(i, i);
            }
        }
        return new rb(d, a.sel.primIndex);
    }
    function Cd(a, b, c) {
        var d = {
            canceled: false,
            from: b.from,
            to: b.to,
            text: b.text,
            origin: b.origin,
            cancel: function() {
                this.canceled = true;
            }
        };
        if (c) d.update = function(b, c, d, e) {
            if (b) this.from = wb(a, b);
            if (c) this.to = wb(a, c);
            if (d) this.text = d;
            if (e !== undefined) this.origin = e;
        };
        Zf(a, "beforeChange", a, d);
        if (a.cm) Zf(a.cm, "beforeChange", a.cm, d);
        if (d.canceled) return null;
        return {
            from: d.from,
            to: d.to,
            text: d.text,
            origin: d.origin
        };
    }
    function Dd(a, b, c) {
        if (a.cm) {
            if (!a.cm.curOp) return zc(a.cm, Dd)(a, b, c);
            if (a.cm.state.suppressEdits) return;
        }
        if (dg(a, "beforeChange") || a.cm && dg(a.cm, "beforeChange")) {
            b = Cd(a, b, true);
            if (!b) return;
        }
        var d = x && !c && Be(a, b.from, b.to);
        if (d) {
            for (var e = d.length - 1; e >= 0; --e) Ed(a, {
                from: d[e].from,
                to: d[e].to,
                text: e ? [ "" ] : b.text
            });
        } else {
            Ed(a, b);
        }
    }
    function Ed(a, b) {
        if (b.text.length == 1 && b.text[0] == "" && nb(b.from, b.to) == 0) return;
        var c = zd(a, b);
        Gf(a, b, c, a.cm ? a.cm.curOp.id : NaN);
        Hd(a, b, c, ye(a, b));
        var d = [];
        sf(a, function(a, c) {
            if (!c && rg(d, a.history) == -1) {
                Qf(a.history, b);
                d.push(a.history);
            }
            Hd(a, b, null, ye(a, b));
        });
    }
    function Fd(a, b, c) {
        if (a.cm && a.cm.state.suppressEdits) return;
        var d = a.history, e, f = a.sel;
        var g = b == "undo" ? d.done : d.undone, h = b == "undo" ? d.undone : d.done;
        for (var i = 0; i < g.length; i++) if (c || !g[i].ranges) break;
        if (i == g.length) return;
        d.lastOrigin = d.lastSelOrigin = null;
        for (;;) {
            e = g.pop();
            if (e.ranges) {
                Jf(e, h);
                if (c && !e.equals(a.sel)) {
                    Hb(a, e, {
                        clearRedo: false
                    });
                    return;
                }
                f = e;
            } else break;
        }
        var j = [];
        Jf(f, h);
        h.push({
            changes: j,
            generation: d.generation
        });
        d.generation = e.generation || ++d.maxGeneration;
        var k = dg(a, "beforeChange") || a.cm && dg(a.cm, "beforeChange");
        for (var i = e.changes.length - 1; i >= 0; --i) {
            var l = e.changes[i];
            l.origin = b;
            if (k && !Cd(a, l, false)) {
                g.length = 0;
                return;
            }
            j.push(Df(a, l));
            var m = i ? zd(a, l, null) : pg(g);
            Hd(a, l, m, Ae(a, l));
            if (a.cm) Pd(a.cm);
            var n = [];
            sf(a, function(a, b) {
                if (!b && rg(n, a.history) == -1) {
                    Qf(a.history, l);
                    n.push(a.history);
                }
                Hd(a, l, null, Ae(a, l));
            });
        }
    }
    function Gd(a, b) {
        a.first += b;
        a.sel = new rb(sg(a.sel.ranges, function(a) {
            return new sb(mb(a.anchor.line + b, a.anchor.ch), mb(a.head.line + b, a.head.ch));
        }), a.sel.primIndex);
        if (a.cm) Ec(a.cm, a.first, a.first - b, b);
    }
    function Hd(a, b, c, d) {
        if (a.cm && !a.cm.curOp) return zc(a.cm, Hd)(a, b, c, d);
        if (b.to.line < a.first) {
            Gd(a, b.text.length - 1 - (b.to.line - b.from.line));
            return;
        }
        if (b.from.line > a.lastLine()) return;
        if (b.from.line < a.first) {
            var e = b.text.length - 1 - (a.first - b.from.line);
            Gd(a, e);
            b = {
                from: mb(a.first, 0),
                to: mb(b.to.line + e, b.to.ch),
                text: [ pg(b.text) ],
                origin: b.origin
            };
        }
        var f = a.lastLine();
        if (b.to.line > f) {
            b = {
                from: b.from,
                to: mb(f, uf(a, f).text.length),
                text: [ b.text[0] ],
                origin: b.origin
            };
        }
        b.removed = vf(a, b.from, b.to);
        if (!c) c = zd(a, b, null);
        if (a.cm) Id(a.cm, b, d); else lf(a, b, d);
        Ib(a, c, hg);
    }
    function Id(a, b, c) {
        var d = a.doc, e = a.display, f = b.from, g = b.to;
        var h = false, i = f.line;
        if (!a.options.lineWrapping) {
            i = yf(Le(uf(d, f.line)));
            d.iter(i, g.line + 1, function(a) {
                if (a == e.maxLine) {
                    h = true;
                    return true;
                }
            });
        }
        if (d.sel.contains(b.from, b.to) > -1) a.curOp.cursorActivity = true;
        lf(d, b, c, E(a));
        if (!a.options.lineWrapping) {
            d.iter(i, f.line + b.text.length, function(a) {
                var b = K(a);
                if (b > e.maxLineLength) {
                    e.maxLine = a;
                    e.maxLineLength = b;
                    e.maxLineChanged = true;
                    h = false;
                }
            });
            if (h) a.curOp.updateMaxLine = true;
        }
        d.frontier = Math.min(d.frontier, f.line);
        Rb(a, 400);
        var j = b.text.length - (g.line - f.line) - 1;
        if (f.line == g.line && b.text.length == 1 && !kf(a.doc, b)) Fc(a, f.line, "text"); else Ec(a, f.line, g.line + 1, j);
        if (dg(a, "change") || dg(a, "changes")) (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push({
            from: f,
            to: g,
            text: b.text,
            removed: b.removed,
            origin: b.origin
        });
    }
    function Jd(a, b, c, d, e) {
        if (!d) d = c;
        if (nb(d, c) < 0) {
            var f = d;
            d = c;
            c = f;
        }
        if (typeof b == "string") b = Ng(b);
        Dd(a, {
            from: c,
            to: d,
            text: b,
            origin: e
        });
    }
    function Kd(a, b) {
        var c = a.display, d = c.sizer.getBoundingClientRect(), e = null;
        if (b.top + d.top < 0) e = true; else if (b.bottom + d.top > (window.innerHeight || document.documentElement.clientHeight)) e = false;
        if (e != null && !p) {
            var f = Bg("div", "​", null, "position: absolute; top: " + (b.top - c.viewOffset - Vb(a.display)) + "px; height: " + (b.bottom - b.top + fg) + "px; left: " + b.left + "px; width: 2px;");
            a.display.lineSpace.appendChild(f);
            f.scrollIntoView(e);
            a.display.lineSpace.removeChild(f);
        }
    }
    function Ld(a, b, c, d) {
        if (d == null) d = 0;
        for (;;) {
            var e = false, f = nc(a, b);
            var g = !c || c == b ? f : nc(a, c);
            var h = Nd(a, Math.min(f.left, g.left), Math.min(f.top, g.top) - d, Math.max(f.left, g.left), Math.max(f.bottom, g.bottom) + d);
            var i = a.doc.scrollTop, j = a.doc.scrollLeft;
            if (h.scrollTop != null) {
                ed(a, h.scrollTop);
                if (Math.abs(a.doc.scrollTop - i) > 1) e = true;
            }
            if (h.scrollLeft != null) {
                fd(a, h.scrollLeft);
                if (Math.abs(a.doc.scrollLeft - j) > 1) e = true;
            }
            if (!e) return f;
        }
    }
    function Md(a, b, c, d, e) {
        var f = Nd(a, b, c, d, e);
        if (f.scrollTop != null) ed(a, f.scrollTop);
        if (f.scrollLeft != null) fd(a, f.scrollLeft);
    }
    function Nd(a, b, c, d, e) {
        var f = a.display, g = tc(a.display);
        if (c < 0) c = 0;
        var h = a.curOp && a.curOp.scrollTop != null ? a.curOp.scrollTop : f.scroller.scrollTop;
        var i = f.scroller.clientHeight - fg, j = {};
        var k = a.doc.height + Wb(f);
        var l = c < g, m = e > k - g;
        if (c < h) {
            j.scrollTop = l ? 0 : c;
        } else if (e > h + i) {
            var n = Math.min(c, (m ? k : e) - i);
            if (n != h) j.scrollTop = n;
        }
        var o = a.curOp && a.curOp.scrollLeft != null ? a.curOp.scrollLeft : f.scroller.scrollLeft;
        var p = f.scroller.clientWidth - fg;
        b += f.gutters.offsetWidth;
        d += f.gutters.offsetWidth;
        var q = f.gutters.offsetWidth;
        var r = b < q + 10;
        if (b < o + q || r) {
            if (r) b = 0;
            j.scrollLeft = Math.max(0, b - 10 - q);
        } else if (d > p + o - 3) {
            j.scrollLeft = d + 10 - p;
        }
        return j;
    }
    function Od(a, b, c) {
        if (b != null || c != null) Qd(a);
        if (b != null) a.curOp.scrollLeft = (a.curOp.scrollLeft == null ? a.doc.scrollLeft : a.curOp.scrollLeft) + b;
        if (c != null) a.curOp.scrollTop = (a.curOp.scrollTop == null ? a.doc.scrollTop : a.curOp.scrollTop) + c;
    }
    function Pd(a) {
        Qd(a);
        var b = a.getCursor(), c = b, d = b;
        if (!a.options.lineWrapping) {
            c = b.ch ? mb(b.line, b.ch - 1) : b;
            d = mb(b.line, b.ch + 1);
        }
        a.curOp.scrollToPos = {
            from: c,
            to: d,
            margin: a.options.cursorScrollMargin,
            isCursor: true
        };
    }
    function Qd(a) {
        var b = a.curOp.scrollToPos;
        if (b) {
            a.curOp.scrollToPos = null;
            var c = oc(a, b.from), d = oc(a, b.to);
            var e = Nd(a, Math.min(c.left, d.left), Math.min(c.top, d.top) - b.margin, Math.max(c.right, d.right), Math.max(c.bottom, d.bottom) + b.margin);
            a.scrollTo(e.scrollLeft, e.scrollTop);
        }
    }
    function Rd(a, b, c, d) {
        var e = a.doc, f;
        if (c == null) c = "add";
        if (c == "smart") {
            if (!a.doc.mode.indent) c = "prev"; else f = Ub(a, b);
        }
        var g = a.options.tabSize;
        var h = uf(e, b), i = lg(h.text, null, g);
        if (h.stateAfter) h.stateAfter = null;
        var j = h.text.match(/^\s*/)[0], k;
        if (!d && !/\S/.test(h.text)) {
            k = 0;
            c = "not";
        } else if (c == "smart") {
            k = a.doc.mode.indent(f, h.text.slice(j.length), h.text);
            if (k == gg) {
                if (!d) return;
                c = "prev";
            }
        }
        if (c == "prev") {
            if (b > e.first) k = lg(uf(e, b - 1).text, null, g); else k = 0;
        } else if (c == "add") {
            k = i + a.options.indentUnit;
        } else if (c == "subtract") {
            k = i - a.options.indentUnit;
        } else if (typeof c == "number") {
            k = i + c;
        }
        k = Math.max(0, k);
        var l = "", m = 0;
        if (a.options.indentWithTabs) for (var n = Math.floor(k / g); n; --n) {
            m += g;
            l += "	";
        }
        if (m < k) l += og(k - m);
        if (l != j) {
            Jd(a.doc, l, mb(b, 0), mb(b, j.length), "+input");
        } else {
            for (var n = 0; n < e.sel.ranges.length; n++) {
                var o = e.sel.ranges[n];
                if (o.head.line == b && o.head.ch < j.length) {
                    var m = mb(b, j.length);
                    Db(e, n, new sb(m, m));
                    break;
                }
            }
        }
        h.stateAfter = null;
    }
    function Sd(a, b, c, d) {
        var e = b, f = b, g = a.doc;
        if (typeof b == "number") f = uf(g, vb(g, b)); else e = yf(b);
        if (e == null) return null;
        if (d(f, e)) Fc(a, e, c); else return null;
        return f;
    }
    function Td(a, b) {
        var c = a.doc.sel.ranges, d = [];
        for (var e = 0; e < c.length; e++) {
            var f = b(c[e]);
            while (d.length && nb(f.from, pg(d).to) <= 0) {
                var g = d.pop();
                if (nb(g.from, f.from) < 0) {
                    f.from = g.from;
                    break;
                }
            }
            d.push(f);
        }
        yc(a, function() {
            for (var b = d.length - 1; b >= 0; b--) Jd(a.doc, "", d[b].from, d[b].to, "+delete");
            Pd(a);
        });
    }
    function Ud(a, b, c, d, e) {
        var f = b.line, g = b.ch, h = c;
        var i = uf(a, f);
        var j = true;
        function k() {
            var b = f + c;
            if (b < a.first || b >= a.first + a.size) return j = false;
            f = b;
            return i = uf(a, b);
        }
        function l(a) {
            var b = (e ? ah : bh)(i, g, c, true);
            if (b == null) {
                if (!a && k()) {
                    if (e) g = (c < 0 ? Vg : Ug)(i); else g = c < 0 ? i.text.length : 0;
                } else return j = false;
            } else g = b;
            return true;
        }
        if (d == "char") l(); else if (d == "column") l(true); else if (d == "word" || d == "group") {
            var m = null, n = d == "group";
            for (var o = true; ;o = false) {
                if (c < 0 && !l(!o)) break;
                var p = i.text.charAt(g) || "\n";
                var q = xg(p) ? "w" : n && p == "\n" ? "n" : !n || /\s/.test(p) ? null : "p";
                if (n && !o && !q) q = "s";
                if (m && m != q) {
                    if (c < 0) {
                        c = 1;
                        l();
                    }
                    break;
                }
                if (q) m = q;
                if (c > 0 && !l(!o)) break;
            }
        }
        var r = Mb(a, mb(f, g), h, true);
        if (!j) r.hitSide = true;
        return r;
    }
    function Vd(a, b, c, d) {
        var e = a.doc, f = b.left, g;
        if (d == "page") {
            var h = Math.min(a.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            g = b.top + c * (h - (c < 0 ? 1.5 : .5) * tc(a.display));
        } else if (d == "line") {
            g = c > 0 ? b.bottom + 3 : b.top - 3;
        }
        for (;;) {
            var i = qc(a, f, g);
            if (!i.outside) break;
            if (c < 0 ? g <= 0 : g >= e.height) {
                i.hitSide = true;
                break;
            }
            g += c * 5;
        }
        return i;
    }
    function Wd(a, b) {
        var c = uf(a, b.line).text;
        var d = b.ch, e = b.ch;
        if (c) {
            if ((b.xRel < 0 || e == c.length) && d) --d; else ++e;
            var f = c.charAt(d);
            var g = xg(f) ? xg : /\s/.test(f) ? function(a) {
                return /\s/.test(a);
            } : function(a) {
                return !/\s/.test(a) && !xg(a);
            };
            while (d > 0 && g(c.charAt(d - 1))) --d;
            while (e < c.length && g(c.charAt(e))) ++e;
        }
        return new sb(mb(b.line, d), mb(b.line, e));
    }
    z.prototype = {
        constructor: z,
        focus: function() {
            window.focus();
            Pc(this);
            Mc(this);
        },
        setOption: function(a, b) {
            var c = this.options, d = c[a];
            if (c[a] == b && a != "mode") return;
            c[a] = b;
            if (Yd.hasOwnProperty(a)) zc(this, Yd[a])(this, b, d);
        },
        getOption: function(a) {
            return this.options[a];
        },
        getDoc: function() {
            return this.doc;
        },
        addKeyMap: function(a, b) {
            this.state.keyMaps[b ? "push" : "unshift"](a);
        },
        removeKeyMap: function(a) {
            var b = this.state.keyMaps;
            for (var c = 0; c < b.length; ++c) if (b[c] == a || typeof b[c] != "string" && b[c].name == a) {
                b.splice(c, 1);
                return true;
            }
        },
        addOverlay: Ac(function(a, b) {
            var c = a.token ? a : z.getMode(this.options, a);
            if (c.startState) throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: c,
                modeSpec: a,
                opaque: b && b.opaque
            });
            this.state.modeGen++;
            Ec(this);
        }),
        removeOverlay: Ac(function(a) {
            var b = this.state.overlays;
            for (var c = 0; c < b.length; ++c) {
                var d = b[c].modeSpec;
                if (d == a || typeof a == "string" && d.name == a) {
                    b.splice(c, 1);
                    this.state.modeGen++;
                    Ec(this);
                    return;
                }
            }
        }),
        indentLine: Ac(function(a, b, c) {
            if (typeof b != "string" && typeof b != "number") {
                if (b == null) b = this.options.smartIndent ? "smart" : "prev"; else b = b ? "add" : "subtract";
            }
            if (yb(this.doc, a)) Rd(this, a, b, c);
        }),
        indentSelection: Ac(function(a) {
            var b = this.doc.sel.ranges, c = -1;
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                if (!e.empty()) {
                    var f = Math.max(c, e.from().line);
                    var g = e.to();
                    c = Math.min(this.lastLine(), g.line - (g.ch ? 0 : 1)) + 1;
                    for (var h = f; h < c; ++h) Rd(this, h, a);
                } else if (e.head.line > c) {
                    Rd(this, e.head.line, a, true);
                    c = e.head.line;
                    if (d == this.doc.sel.primIndex) Pd(this);
                }
            }
        }),
        getTokenAt: function(a, b) {
            var c = this.doc;
            a = wb(c, a);
            var d = Ub(this, a.line, b), e = this.doc.mode;
            var f = uf(c, a.line);
            var g = new me(f.text, this.options.tabSize);
            while (g.pos < a.ch && !g.eol()) {
                g.start = g.pos;
                var h = e.token(g, d);
            }
            return {
                start: g.start,
                end: g.pos,
                string: g.current(),
                type: h || null,
                state: d
            };
        },
        getTokenTypeAt: function(a) {
            a = wb(this.doc, a);
            var b = Ze(this, uf(this.doc, a.line));
            var c = 0, d = (b.length - 1) / 2, e = a.ch;
            if (e == 0) return b[2];
            for (;;) {
                var f = c + d >> 1;
                if ((f ? b[f * 2 - 1] : 0) >= e) d = f; else if (b[f * 2 + 1] < e) c = f + 1; else return b[f * 2 + 2];
            }
        },
        getModeAt: function(a) {
            var b = this.doc.mode;
            if (!b.innerMode) return b;
            return z.innerMode(b, this.getTokenAt(a).state).mode;
        },
        getHelper: function(a, b) {
            return this.getHelpers(a, b)[0];
        },
        getHelpers: function(a, b) {
            var c = [];
            if (!de.hasOwnProperty(b)) return de;
            var d = de[b], e = this.getModeAt(a);
            if (typeof e[b] == "string") {
                if (d[e[b]]) c.push(d[e[b]]);
            } else if (e[b]) {
                for (var f = 0; f < e[b].length; f++) {
                    var g = d[e[b][f]];
                    if (g) c.push(g);
                }
            } else if (e.helperType && d[e.helperType]) {
                c.push(d[e.helperType]);
            } else if (d[e.name]) {
                c.push(d[e.name]);
            }
            for (var f = 0; f < d._global.length; f++) {
                var h = d._global[f];
                if (h.pred(e, this) && rg(c, h.val) == -1) c.push(h.val);
            }
            return c;
        },
        getStateAfter: function(a, b) {
            var c = this.doc;
            a = vb(c, a == null ? c.first + c.size - 1 : a);
            return Ub(this, a + 1, b);
        },
        cursorCoords: function(a, b) {
            var c, d = this.doc.sel.primary();
            if (a == null) c = d.head; else if (typeof a == "object") c = wb(this.doc, a); else c = a ? d.from() : d.to();
            return nc(this, c, b || "page");
        },
        charCoords: function(a, b) {
            return mc(this, wb(this.doc, a), b || "page");
        },
        coordsChar: function(a, b) {
            a = lc(this, a, b || "page");
            return qc(this, a.left, a.top);
        },
        lineAtHeight: function(a, b) {
            a = lc(this, {
                top: a,
                left: 0
            }, b || "page").top;
            return zf(this.doc, a + this.display.viewOffset);
        },
        heightAtLine: function(a, b) {
            var c = false, d = this.doc.first + this.doc.size - 1;
            if (a < this.doc.first) a = this.doc.first; else if (a > d) {
                a = d;
                c = true;
            }
            var e = uf(this.doc, a);
            return kc(this, uf(this.doc, a), {
                top: 0,
                left: 0
            }, b || "page").top + (c ? e.height : 0);
        },
        defaultTextHeight: function() {
            return tc(this.display);
        },
        defaultCharWidth: function() {
            return uc(this.display);
        },
        setGutterMarker: Ac(function(a, b, c) {
            return Sd(this, a, "gutter", function(a) {
                var d = a.gutterMarkers || (a.gutterMarkers = {});
                d[b] = c;
                if (!c && yg(d)) a.gutterMarkers = null;
                return true;
            });
        }),
        clearGutter: Ac(function(a) {
            var b = this, c = b.doc, d = c.first;
            c.iter(function(c) {
                if (c.gutterMarkers && c.gutterMarkers[a]) {
                    c.gutterMarkers[a] = null;
                    Fc(b, d, "gutter");
                    if (yg(c.gutterMarkers)) c.gutterMarkers = null;
                }
                ++d;
            });
        }),
        addLineClass: Ac(function(a, b, c) {
            return Sd(this, a, "class", function(a) {
                var d = b == "text" ? "textClass" : b == "background" ? "bgClass" : "wrapClass";
                if (!a[d]) a[d] = c; else if (new RegExp("(?:^|\\s)" + c + "(?:$|\\s)").test(a[d])) return false; else a[d] += " " + c;
                return true;
            });
        }),
        removeLineClass: Ac(function(a, b, c) {
            return Sd(this, a, "class", function(a) {
                var d = b == "text" ? "textClass" : b == "background" ? "bgClass" : "wrapClass";
                var e = a[d];
                if (!e) return false; else if (c == null) a[d] = null; else {
                    var f = e.match(new RegExp("(?:^|\\s+)" + c + "(?:$|\\s+)"));
                    if (!f) return false;
                    var g = f.index + f[0].length;
                    a[d] = e.slice(0, f.index) + (!f.index || g == e.length ? "" : " ") + e.slice(g) || null;
                }
                return true;
            });
        }),
        addLineWidget: Ac(function(a, b, c) {
            return Te(this, a, b, c);
        }),
        removeLineWidget: function(a) {
            a.clear();
        },
        lineInfo: function(a) {
            if (typeof a == "number") {
                if (!yb(this.doc, a)) return null;
                var b = a;
                a = uf(this.doc, a);
                if (!a) return null;
            } else {
                var b = yf(a);
                if (b == null) return null;
            }
            return {
                line: b,
                handle: a,
                text: a.text,
                gutterMarkers: a.gutterMarkers,
                textClass: a.textClass,
                bgClass: a.bgClass,
                wrapClass: a.wrapClass,
                widgets: a.widgets
            };
        },
        getViewport: function() {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            };
        },
        addWidget: function(a, b, c, d, e) {
            var f = this.display;
            a = nc(this, wb(this.doc, a));
            var g = a.bottom, h = a.left;
            b.style.position = "absolute";
            f.sizer.appendChild(b);
            if (d == "over") {
                g = a.top;
            } else if (d == "above" || d == "near") {
                var i = Math.max(f.wrapper.clientHeight, this.doc.height), j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
                if ((d == "above" || a.bottom + b.offsetHeight > i) && a.top > b.offsetHeight) g = a.top - b.offsetHeight; else if (a.bottom + b.offsetHeight <= i) g = a.bottom;
                if (h + b.offsetWidth > j) h = j - b.offsetWidth;
            }
            b.style.top = g + "px";
            b.style.left = b.style.right = "";
            if (e == "right") {
                h = f.sizer.clientWidth - b.offsetWidth;
                b.style.right = "0px";
            } else {
                if (e == "left") h = 0; else if (e == "middle") h = (f.sizer.clientWidth - b.offsetWidth) / 2;
                b.style.left = h + "px";
            }
            if (c) Md(this, h, g, h + b.offsetWidth, g + b.offsetHeight);
        },
        triggerOnKeyDown: Ac(pd),
        triggerOnKeyPress: Ac(rd),
        triggerOnKeyUp: Ac(qd),
        execCommand: function(a) {
            if (ge.hasOwnProperty(a)) return ge[a](this);
        },
        findPosH: function(a, b, c, d) {
            var e = 1;
            if (b < 0) {
                e = -1;
                b = -b;
            }
            for (var f = 0, g = wb(this.doc, a); f < b; ++f) {
                g = Ud(this.doc, g, e, c, d);
                if (g.hitSide) break;
            }
            return g;
        },
        moveH: Ac(function(a, b) {
            var c = this;
            c.extendSelectionsBy(function(d) {
                if (c.display.shift || c.doc.extend || d.empty()) return Ud(c.doc, d.head, a, b, c.options.rtlMoveVisually); else return a < 0 ? d.from() : d.to();
            }, jg);
        }),
        deleteH: Ac(function(a, b) {
            var c = this.doc.sel, d = this.doc;
            if (c.somethingSelected()) d.replaceSelection("", null, "+delete"); else Td(this, function(c) {
                var e = Ud(d, c.head, a, b, false);
                return a < 0 ? {
                    from: e,
                    to: c.head
                } : {
                    from: c.head,
                    to: e
                };
            });
        }),
        findPosV: function(a, b, c, d) {
            var e = 1, f = d;
            if (b < 0) {
                e = -1;
                b = -b;
            }
            for (var g = 0, h = wb(this.doc, a); g < b; ++g) {
                var i = nc(this, h, "div");
                if (f == null) f = i.left; else i.left = f;
                h = Vd(this, i, e, c);
                if (h.hitSide) break;
            }
            return h;
        },
        moveV: Ac(function(a, b) {
            var c = this, d = this.doc, e = [];
            var f = !c.display.shift && !d.sel.extend && d.sel.somethingSelected();
            d.extendSelectionsBy(function(g) {
                if (f) return a < 0 ? g.from() : g.to();
                var h = nc(c, g.head, "div");
                if (g.goalColumn != null) h.left = g.goalColumn;
                e.push(h.left);
                var i = Vd(c, h, a, b);
                if (b == "page" && g == d.sel.primary()) Od(c, null, mc(c, i, "div").top - h.top);
                return i;
            }, jg);
            if (e.length) for (var g = 0; g < d.sel.ranges.length; g++) d.sel.ranges[g].goalColumn = e[g];
        }),
        toggleOverwrite: function(a) {
            if (a != null && a == this.state.overwrite) return;
            if (this.state.overwrite = !this.state.overwrite) this.display.cursorDiv.className += " CodeMirror-overwrite"; else this.display.cursorDiv.className = this.display.cursorDiv.className.replace(" CodeMirror-overwrite", "");
            Zf(this, "overwriteToggle", this, this.state.overwrite);
        },
        hasFocus: function() {
            return Fg() == this.display.input;
        },
        scrollTo: Ac(function(a, b) {
            if (a != null || b != null) Qd(this);
            if (a != null) this.curOp.scrollLeft = a;
            if (b != null) this.curOp.scrollTop = b;
        }),
        getScrollInfo: function() {
            var a = this.display.scroller, b = fg;
            return {
                left: a.scrollLeft,
                top: a.scrollTop,
                height: a.scrollHeight - b,
                width: a.scrollWidth - b,
                clientHeight: a.clientHeight - b,
                clientWidth: a.clientWidth - b
            };
        },
        scrollIntoView: Ac(function(a, b) {
            if (a == null) a = {
                from: this.doc.sel.primary().head,
                to: null
            }; else if (typeof a == "number") a = {
                from: mb(a, 0),
                to: null
            }; else if (a.from == null) a = {
                from: a,
                to: null
            };
            if (!a.to) a.to = a.from;
            a.margin = b || 0;
            if (a.from.line != null) {
                Qd(this);
                this.curOp.scrollToPos = a;
            } else {
                var c = Nd(this, Math.min(a.from.left, a.to.left), Math.min(a.from.top, a.to.top) - a.margin, Math.max(a.from.right, a.to.right), Math.max(a.from.bottom, a.to.bottom) + a.margin);
                this.scrollTo(c.scrollLeft, c.scrollTop);
            }
        }),
        setSize: Ac(function(a, b) {
            function c(a) {
                return typeof a == "number" || /^\d+$/.test(String(a)) ? a + "px" : a;
            }
            if (a != null) this.display.wrapper.style.width = c(a);
            if (b != null) this.display.wrapper.style.height = c(b);
            if (this.options.lineWrapping) gc(this);
            this.curOp.forceUpdate = true;
            Zf(this, "refresh", this);
        }),
        operation: function(a) {
            return yc(this, a);
        },
        refresh: Ac(function() {
            var a = this.display.cachedTextHeight;
            Ec(this);
            hc(this);
            this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
            if (a == null || Math.abs(a - tc(this.display)) > .5) F(this);
            Zf(this, "refresh", this);
        }),
        swapDoc: Ac(function(a) {
            var b = this.doc;
            b.cm = null;
            tf(this, a);
            hc(this);
            Oc(this);
            this.scrollTo(a.scrollLeft, a.scrollTop);
            ag(this, "swapDoc", this, b);
            return b;
        }),
        getInputField: function() {
            return this.display.input;
        },
        getWrapperElement: function() {
            return this.display.wrapper;
        },
        getScrollerElement: function() {
            return this.display.scroller;
        },
        getGutterElement: function() {
            return this.display.gutters;
        }
    };
    eg(z);
    var Xd = z.defaults = {};
    var Yd = z.optionHandlers = {};
    function Zd(a, b, c, d) {
        z.defaults[a] = b;
        if (c) Yd[a] = d ? function(a, b, d) {
            if (d != $d) c(a, b, d);
        } : c;
    }
    var $d = z.Init = {
        toString: function() {
            return "CodeMirror.Init";
        }
    };
    Zd("value", "", function(a, b) {
        a.setValue(b);
    }, true);
    Zd("mode", null, function(a, b) {
        a.doc.modeOption = b;
        B(a);
    }, true);
    Zd("indentUnit", 2, B, true);
    Zd("indentWithTabs", false);
    Zd("smartIndent", true);
    Zd("tabSize", 4, function(a) {
        C(a);
        hc(a);
        Ec(a);
    }, true);
    Zd("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(a, b) {
        a.options.specialChars = new RegExp(b.source + (b.test("	") ? "" : "|	"), "g");
        a.refresh();
    }, true);
    Zd("specialCharPlaceholder", df, function(a) {
        a.refresh();
    }, true);
    Zd("electricChars", true);
    Zd("rtlMoveVisually", !t);
    Zd("wholeLineUpdateBefore", true);
    Zd("theme", "default", function(a) {
        H(a);
        I(a);
    }, true);
    Zd("keyMap", "default", G);
    Zd("extraKeys", null);
    Zd("lineWrapping", false, D, true);
    Zd("gutters", [], function(a) {
        M(a.options);
        I(a);
    }, true);
    Zd("fixedGutter", true, function(a, b) {
        a.display.gutters.style.left = b ? T(a.display) + "px" : "0";
        a.refresh();
    }, true);
    Zd("coverGutterNextToScrollbar", false, O, true);
    Zd("lineNumbers", false, function(a) {
        M(a.options);
        I(a);
    }, true);
    Zd("firstLineNumber", 1, I, true);
    Zd("lineNumberFormatter", function(a) {
        return a;
    }, I, true);
    Zd("showCursorWhenSelecting", false, Nb, true);
    Zd("resetSelectionOnContextMenu", true);
    Zd("readOnly", false, function(a, b) {
        if (b == "nocursor") {
            td(a);
            a.display.input.blur();
            a.display.disabled = true;
        } else {
            a.display.disabled = false;
            if (!b) Oc(a);
        }
    });
    Zd("disableInput", false, function(a, b) {
        if (!b) Oc(a);
    }, true);
    Zd("dragDrop", true);
    Zd("cursorBlinkRate", 530);
    Zd("cursorScrollMargin", 0);
    Zd("cursorHeight", 1);
    Zd("workTime", 100);
    Zd("workDelay", 100);
    Zd("flattenSpans", true, C, true);
    Zd("addModeClass", false, C, true);
    Zd("pollInterval", 100);
    Zd("undoDepth", 200, function(a, b) {
        a.doc.history.undoDepth = b;
    });
    Zd("historyEventDelay", 1250);
    Zd("viewportMargin", 10, function(a) {
        a.refresh();
    }, true);
    Zd("maxHighlightLength", 1e4, C, true);
    Zd("moveInputWithCursor", true, function(a, b) {
        if (!b) a.display.inputDiv.style.top = a.display.inputDiv.style.left = 0;
    });
    Zd("tabindex", null, function(a, b) {
        a.display.input.tabIndex = b || "";
    });
    Zd("autofocus", null);
    var _d = z.modes = {}, ae = z.mimeModes = {};
    z.defineMode = function(a, b) {
        if (!z.defaults.mode && a != "null") z.defaults.mode = a;
        if (arguments.length > 2) {
            b.dependencies = [];
            for (var c = 2; c < arguments.length; ++c) b.dependencies.push(arguments[c]);
        }
        _d[a] = b;
    };
    z.defineMIME = function(a, b) {
        ae[a] = b;
    };
    z.resolveMode = function(a) {
        if (typeof a == "string" && ae.hasOwnProperty(a)) {
            a = ae[a];
        } else if (a && typeof a.name == "string" && ae.hasOwnProperty(a.name)) {
            var b = ae[a.name];
            if (typeof b == "string") b = {
                name: b
            };
            a = tg(b, a);
            a.name = b.name;
        } else if (typeof a == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(a)) {
            return z.resolveMode("application/xml");
        }
        if (typeof a == "string") return {
            name: a
        }; else return a || {
            name: "null"
        };
    };
    z.getMode = function(a, b) {
        var b = z.resolveMode(b);
        var c = _d[b.name];
        if (!c) return z.getMode(a, "text/plain");
        var d = c(a, b);
        if (be.hasOwnProperty(b.name)) {
            var e = be[b.name];
            for (var f in e) {
                if (!e.hasOwnProperty(f)) continue;
                if (d.hasOwnProperty(f)) d["_" + f] = d[f];
                d[f] = e[f];
            }
        }
        d.name = b.name;
        if (b.helperType) d.helperType = b.helperType;
        if (b.modeProps) for (var f in b.modeProps) d[f] = b.modeProps[f];
        return d;
    };
    z.defineMode("null", function() {
        return {
            token: function(a) {
                a.skipToEnd();
            }
        };
    });
    z.defineMIME("text/plain", "null");
    var be = z.modeExtensions = {};
    z.extendMode = function(a, b) {
        var c = be.hasOwnProperty(a) ? be[a] : be[a] = {};
        ug(b, c);
    };
    z.defineExtension = function(a, b) {
        z.prototype[a] = b;
    };
    z.defineDocExtension = function(a, b) {
        pf.prototype[a] = b;
    };
    z.defineOption = Zd;
    var ce = [];
    z.defineInitHook = function(a) {
        ce.push(a);
    };
    var de = z.helpers = {};
    z.registerHelper = function(a, b, c) {
        if (!de.hasOwnProperty(a)) de[a] = z[a] = {
            _global: []
        };
        de[a][b] = c;
    };
    z.registerGlobalHelper = function(a, b, c, d) {
        z.registerHelper(a, b, d);
        de[a]._global.push({
            pred: c,
            val: d
        });
    };
    var ee = z.copyState = function(a, b) {
        if (b === true) return b;
        if (a.copyState) return a.copyState(b);
        var c = {};
        for (var d in b) {
            var e = b[d];
            if (e instanceof Array) e = e.concat([]);
            c[d] = e;
        }
        return c;
    };
    var fe = z.startState = function(a, b, c) {
        return a.startState ? a.startState(b, c) : true;
    };
    z.innerMode = function(a, b) {
        while (a.innerMode) {
            var c = a.innerMode(b);
            if (!c || c.mode == a) break;
            b = c.state;
            a = c.mode;
        }
        return c || {
            mode: a,
            state: b
        };
    };
    var ge = z.commands = {
        selectAll: function(a) {
            a.setSelection(mb(a.firstLine(), 0), mb(a.lastLine()), hg);
        },
        singleSelection: function(a) {
            a.setSelection(a.getCursor("anchor"), a.getCursor("head"), hg);
        },
        killLine: function(a) {
            Td(a, function(b) {
                if (b.empty()) {
                    var c = uf(a.doc, b.head.line).text.length;
                    if (b.head.ch == c && b.head.line < a.lastLine()) return {
                        from: b.head,
                        to: mb(b.head.line + 1, 0)
                    }; else return {
                        from: b.head,
                        to: mb(b.head.line, c)
                    };
                } else {
                    return {
                        from: b.from(),
                        to: b.to()
                    };
                }
            });
        },
        deleteLine: function(a) {
            Td(a, function(b) {
                return {
                    from: mb(b.from().line, 0),
                    to: wb(a.doc, mb(b.to().line + 1, 0))
                };
            });
        },
        delLineLeft: function(a) {
            Td(a, function(a) {
                return {
                    from: mb(a.from().line, 0),
                    to: a.from()
                };
            });
        },
        undo: function(a) {
            a.undo();
        },
        redo: function(a) {
            a.redo();
        },
        undoSelection: function(a) {
            a.undoSelection();
        },
        redoSelection: function(a) {
            a.redoSelection();
        },
        goDocStart: function(a) {
            a.extendSelection(mb(a.firstLine(), 0));
        },
        goDocEnd: function(a) {
            a.extendSelection(mb(a.lastLine()));
        },
        goLineStart: function(a) {
            a.extendSelectionsBy(function(b) {
                return Wg(a, b.head.line);
            }, jg);
        },
        goLineStartSmart: function(a) {
            a.extendSelectionsBy(function(b) {
                var c = Wg(a, b.head.line);
                var d = a.getLineHandle(c.line);
                var e = Bf(d);
                if (!e || e[0].level == 0) {
                    var f = Math.max(0, d.text.search(/\S/));
                    var g = b.head.line == c.line && b.head.ch <= f && b.head.ch;
                    return mb(c.line, g ? 0 : f);
                }
                return c;
            }, jg);
        },
        goLineEnd: function(a) {
            a.extendSelectionsBy(function(b) {
                return Xg(a, b.head.line);
            }, jg);
        },
        goLineRight: function(a) {
            a.extendSelectionsBy(function(b) {
                var c = a.charCoords(b.head, "div").top + 5;
                return a.coordsChar({
                    left: a.display.lineDiv.offsetWidth + 100,
                    top: c
                }, "div");
            }, jg);
        },
        goLineLeft: function(a) {
            a.extendSelectionsBy(function(b) {
                var c = a.charCoords(b.head, "div").top + 5;
                return a.coordsChar({
                    left: 0,
                    top: c
                }, "div");
            }, jg);
        },
        goLineUp: function(a) {
            a.moveV(-1, "line");
        },
        goLineDown: function(a) {
            a.moveV(1, "line");
        },
        goPageUp: function(a) {
            a.moveV(-1, "page");
        },
        goPageDown: function(a) {
            a.moveV(1, "page");
        },
        goCharLeft: function(a) {
            a.moveH(-1, "char");
        },
        goCharRight: function(a) {
            a.moveH(1, "char");
        },
        goColumnLeft: function(a) {
            a.moveH(-1, "column");
        },
        goColumnRight: function(a) {
            a.moveH(1, "column");
        },
        goWordLeft: function(a) {
            a.moveH(-1, "word");
        },
        goGroupRight: function(a) {
            a.moveH(1, "group");
        },
        goGroupLeft: function(a) {
            a.moveH(-1, "group");
        },
        goWordRight: function(a) {
            a.moveH(1, "word");
        },
        delCharBefore: function(a) {
            a.deleteH(-1, "char");
        },
        delCharAfter: function(a) {
            a.deleteH(1, "char");
        },
        delWordBefore: function(a) {
            a.deleteH(-1, "word");
        },
        delWordAfter: function(a) {
            a.deleteH(1, "word");
        },
        delGroupBefore: function(a) {
            a.deleteH(-1, "group");
        },
        delGroupAfter: function(a) {
            a.deleteH(1, "group");
        },
        indentAuto: function(a) {
            a.indentSelection("smart");
        },
        indentMore: function(a) {
            a.indentSelection("add");
        },
        indentLess: function(a) {
            a.indentSelection("subtract");
        },
        insertTab: function(a) {
            a.replaceSelection("	");
        },
        defaultTab: function(a) {
            if (a.somethingSelected()) a.indentSelection("add"); else a.execCommand("insertTab");
        },
        transposeChars: function(a) {
            yc(a, function() {
                var b = a.listSelections();
                for (var c = 0; c < b.length; c++) {
                    var d = b[c].head, e = uf(a.doc, d.line);
                    if (d.ch > 0 && d.ch < e.length - 1) a.replaceRange(e.charAt(d.ch) + e.charAt(d.ch - 1), mb(d.line, d.ch - 1), mb(d.line, d.ch + 1));
                }
            });
        },
        newlineAndIndent: function(a) {
            yc(a, function() {
                var b = a.listSelections().length;
                for (var c = 0; c < b; c++) {
                    var d = a.listSelections()[c];
                    a.replaceRange("\n", d.anchor, d.head, "+input");
                    a.indentLine(d.from().line + 1, null, true);
                    Pd(a);
                }
            });
        },
        toggleOverwrite: function(a) {
            a.toggleOverwrite();
        }
    };
    var he = z.keyMap = {};
    he.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite",
        Esc: "singleSelection"
    };
    he.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        fallthrough: "basic"
    };
    he.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delLineLeft",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        fallthrough: [ "basic", "emacsy" ]
    };
    he.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    };
    he["default"] = s ? he.macDefault : he.pcDefault;
    function ie(a) {
        if (typeof a == "string") return he[a]; else return a;
    }
    var je = z.lookupKey = function(a, b, c) {
        function d(b) {
            b = ie(b);
            var e = b[a];
            if (e === false) return "stop";
            if (e != null && c(e)) return true;
            if (b.nofallthrough) return "stop";
            var f = b.fallthrough;
            if (f == null) return false;
            if (Object.prototype.toString.call(f) != "[object Array]") return d(f);
            for (var g = 0; g < f.length; ++g) {
                var h = d(f[g]);
                if (h) return h;
            }
            return false;
        }
        for (var e = 0; e < b.length; ++e) {
            var f = d(b[e]);
            if (f) return f != "stop";
        }
    };
    var ke = z.isModifierKey = function(a) {
        var b = Qg[a.keyCode];
        return b == "Ctrl" || b == "Alt" || b == "Shift" || b == "Mod";
    };
    var le = z.keyName = function(a, b) {
        if (k && a.keyCode == 34 && a["char"]) return false;
        var c = Qg[a.keyCode];
        if (c == null || a.altGraphKey) return false;
        if (a.altKey) c = "Alt-" + c;
        if (v ? a.metaKey : a.ctrlKey) c = "Ctrl-" + c;
        if (v ? a.ctrlKey : a.metaKey) c = "Cmd-" + c;
        if (!b && a.shiftKey) c = "Shift-" + c;
        return c;
    };
    z.fromTextArea = function(a, b) {
        if (!b) b = {};
        b.value = a.value;
        if (!b.tabindex && a.tabindex) b.tabindex = a.tabindex;
        if (!b.placeholder && a.placeholder) b.placeholder = a.placeholder;
        if (b.autofocus == null) {
            var c = Fg();
            b.autofocus = c == a || a.getAttribute("autofocus") != null && c == document.body;
        }
        function d() {
            a.value = i.getValue();
        }
        if (a.form) {
            Xf(a.form, "submit", d);
            if (!b.leaveSubmitMethodAlone) {
                var e = a.form, f = e.submit;
                try {
                    var g = e.submit = function() {
                        d();
                        e.submit = f;
                        e.submit();
                        e.submit = g;
                    };
                } catch (h) {}
            }
        }
        a.style.display = "none";
        var i = z(function(b) {
            a.parentNode.insertBefore(b, a.nextSibling);
        }, b);
        i.save = d;
        i.getTextArea = function() {
            return a;
        };
        i.toTextArea = function() {
            d();
            a.parentNode.removeChild(i.getWrapperElement());
            a.style.display = "";
            if (a.form) {
                Yf(a.form, "submit", d);
                if (typeof a.form.submit == "function") a.form.submit = f;
            }
        };
        return i;
    };
    var me = z.StringStream = function(a, b) {
        this.pos = this.start = 0;
        this.string = a;
        this.tabSize = b || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0;
    };
    me.prototype = {
        eol: function() {
            return this.pos >= this.string.length;
        },
        sol: function() {
            return this.pos == this.lineStart;
        },
        peek: function() {
            return this.string.charAt(this.pos) || undefined;
        },
        next: function() {
            if (this.pos < this.string.length) return this.string.charAt(this.pos++);
        },
        eat: function(a) {
            var b = this.string.charAt(this.pos);
            if (typeof a == "string") var c = b == a; else var c = b && (a.test ? a.test(b) : a(b));
            if (c) {
                ++this.pos;
                return b;
            }
        },
        eatWhile: function(a) {
            var b = this.pos;
            while (this.eat(a)) {}
            return this.pos > b;
        },
        eatSpace: function() {
            var a = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
            return this.pos > a;
        },
        skipToEnd: function() {
            this.pos = this.string.length;
        },
        skipTo: function(a) {
            var b = this.string.indexOf(a, this.pos);
            if (b > -1) {
                this.pos = b;
                return true;
            }
        },
        backUp: function(a) {
            this.pos -= a;
        },
        column: function() {
            if (this.lastColumnPos < this.start) {
                this.lastColumnValue = lg(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
                this.lastColumnPos = this.start;
            }
            return this.lastColumnValue - (this.lineStart ? lg(this.string, this.lineStart, this.tabSize) : 0);
        },
        indentation: function() {
            return lg(this.string, null, this.tabSize) - (this.lineStart ? lg(this.string, this.lineStart, this.tabSize) : 0);
        },
        match: function(a, b, c) {
            if (typeof a == "string") {
                var d = function(a) {
                    return c ? a.toLowerCase() : a;
                };
                var e = this.string.substr(this.pos, a.length);
                if (d(e) == d(a)) {
                    if (b !== false) this.pos += a.length;
                    return true;
                }
            } else {
                var f = this.string.slice(this.pos).match(a);
                if (f && f.index > 0) return null;
                if (f && b !== false) this.pos += f[0].length;
                return f;
            }
        },
        current: function() {
            return this.string.slice(this.start, this.pos);
        },
        hideFirstChars: function(a, b) {
            this.lineStart += a;
            try {
                return b();
            } finally {
                this.lineStart -= a;
            }
        }
    };
    var ne = z.TextMarker = function(a, b) {
        this.lines = [];
        this.type = b;
        this.doc = a;
    };
    eg(ne);
    ne.prototype.clear = function() {
        if (this.explicitlyCleared) return;
        var a = this.doc.cm, b = a && !a.curOp;
        if (b) wc(a);
        if (dg(this, "clear")) {
            var c = this.find();
            if (c) ag(this, "clear", c.from, c.to);
        }
        var d = null, e = null;
        for (var f = 0; f < this.lines.length; ++f) {
            var g = this.lines[f];
            var h = te(g.markedSpans, this);
            if (a && !this.collapsed) Fc(a, yf(g), "text"); else if (a) {
                if (h.to != null) e = yf(g);
                if (h.from != null) d = yf(g);
            }
            g.markedSpans = ue(g.markedSpans, h);
            if (h.from == null && this.collapsed && !Pe(this.doc, g) && a) xf(g, tc(a.display));
        }
        if (a && this.collapsed && !a.options.lineWrapping) for (var f = 0; f < this.lines.length; ++f) {
            var i = Le(this.lines[f]), j = K(i);
            if (j > a.display.maxLineLength) {
                a.display.maxLine = i;
                a.display.maxLineLength = j;
                a.display.maxLineChanged = true;
            }
        }
        if (d != null && a && this.collapsed) Ec(a, d, e + 1);
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
            this.doc.cantEdit = false;
            if (a) Kb(a.doc);
        }
        ag(a, "markerCleared", a, this);
        if (b) xc(a);
    };
    ne.prototype.find = function(a, b) {
        if (a == null && this.type == "bookmark") a = 1;
        var c, d;
        for (var e = 0; e < this.lines.length; ++e) {
            var f = this.lines[e];
            var g = te(f.markedSpans, this);
            if (g.from != null) {
                c = mb(b ? f : yf(f), g.from);
                if (a == -1) return c;
            }
            if (g.to != null) {
                d = mb(b ? f : yf(f), g.to);
                if (a == 1) return d;
            }
        }
        return c && {
            from: c,
            to: d
        };
    };
    ne.prototype.changed = function() {
        var a = this.find(-1, true), b = this.doc.cm;
        if (!a || !b) return;
        var c = a.line, d = yf(a.line);
        var e = ac(b, d);
        if (e) fc(e);
        if (d >= b.display.viewFrom && d < b.display.viewTo) {
            var f = b.display.view[Hc(b, d)];
            if (!f.hidden && f.node && f.node.offsetHeight != c.height) xf(c, f.node.offsetHeight);
            yc(b, function() {
                b.curOp.selectionChanged = b.curOp.forceUpdate = b.curOp.updateMaxLine = true;
            });
        }
    };
    ne.prototype.attachLine = function(a) {
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            if (!b.maybeHiddenMarkers || rg(b.maybeHiddenMarkers, this) == -1) (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(a);
    };
    ne.prototype.detachLine = function(a) {
        this.lines.splice(rg(this.lines, a), 1);
        if (!this.lines.length && this.doc.cm) {
            var b = this.doc.cm.curOp;
            (b.maybeHiddenMarkers || (b.maybeHiddenMarkers = [])).push(this);
        }
    };
    var oe = 0;
    function pe(a, b, c, d, e) {
        if (d && d.shared) return re(a, b, c, d, e);
        if (a.cm && !a.cm.curOp) return zc(a.cm, pe)(a, b, c, d, e);
        var f = new ne(a, e), g = nb(b, c);
        if (d) ug(d, f);
        if (g > 0 || g == 0 && f.clearWhenEmpty !== false) return f;
        if (f.replacedWith) {
            f.collapsed = true;
            f.widgetNode = Bg("span", [ f.replacedWith ], "CodeMirror-widget");
            if (!d.handleMouseEvents) f.widgetNode.ignoreEvents = true;
            if (d.insertLeft) f.widgetNode.insertLeft = true;
        }
        if (f.collapsed) {
            if (Ke(a, b.line, b, c, f) || b.line != c.line && Ke(a, c.line, b, c, f)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            y = true;
        }
        if (f.addToHistory) Gf(a, {
            from: b,
            to: c,
            origin: "markText"
        }, a.sel, NaN);
        var h = b.line, i = a.cm, j;
        a.iter(h, c.line + 1, function(a) {
            if (i && f.collapsed && !i.options.lineWrapping && Le(a) == i.display.maxLine) j = true;
            if (f.collapsed && h != b.line) xf(a, 0);
            ve(a, new se(f, h == b.line ? b.ch : null, h == c.line ? c.ch : null));
            ++h;
        });
        if (f.collapsed) a.iter(b.line, c.line + 1, function(b) {
            if (Pe(a, b)) xf(b, 0);
        });
        if (f.clearOnEnter) Xf(f, "beforeCursorEnter", function() {
            f.clear();
        });
        if (f.readOnly) {
            x = true;
            if (a.history.done.length || a.history.undone.length) a.clearHistory();
        }
        if (f.collapsed) {
            f.id = ++oe;
            f.atomic = true;
        }
        if (i) {
            if (j) i.curOp.updateMaxLine = true;
            if (f.collapsed) Ec(i, b.line, c.line + 1); else if (f.className || f.title || f.startStyle || f.endStyle) for (var k = b.line; k <= c.line; k++) Fc(i, k, "text");
            if (f.atomic) Kb(i.doc);
        }
        ag(i, "markerAdded", i, f);
        return f;
    }
    var qe = z.SharedTextMarker = function(a, b) {
        this.markers = a;
        this.primary = b;
        for (var c = 0, d = this; c < a.length; ++c) {
            a[c].parent = this;
            Xf(a[c], "clear", function() {
                d.clear();
            });
        }
    };
    eg(qe);
    qe.prototype.clear = function() {
        if (this.explicitlyCleared) return;
        this.explicitlyCleared = true;
        for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
        ag(this, "clear");
    };
    qe.prototype.find = function(a, b) {
        return this.primary.find(a, b);
    };
    function re(a, b, c, d, e) {
        d = ug(d);
        d.shared = false;
        var f = [ pe(a, b, c, d, e) ], g = f[0];
        var h = d.widgetNode;
        sf(a, function(a) {
            if (h) d.widgetNode = h.cloneNode(true);
            f.push(pe(a, wb(a, b), wb(a, c), d, e));
            for (var i = 0; i < a.linked.length; ++i) if (a.linked[i].isParent) return;
            g = pg(f);
        });
        return new qe(f, g);
    }
    function se(a, b, c) {
        this.marker = a;
        this.from = b;
        this.to = c;
    }
    function te(a, b) {
        if (a) for (var c = 0; c < a.length; ++c) {
            var d = a[c];
            if (d.marker == b) return d;
        }
    }
    function ue(a, b) {
        for (var c, d = 0; d < a.length; ++d) if (a[d] != b) (c || (c = [])).push(a[d]);
        return c;
    }
    function ve(a, b) {
        a.markedSpans = a.markedSpans ? a.markedSpans.concat([ b ]) : [ b ];
        b.marker.attachLine(a);
    }
    function we(a, b, c) {
        if (a) for (var d = 0, e; d < a.length; ++d) {
            var f = a[d], g = f.marker;
            var h = f.from == null || (g.inclusiveLeft ? f.from <= b : f.from < b);
            if (h || f.from == b && g.type == "bookmark" && (!c || !f.marker.insertLeft)) {
                var i = f.to == null || (g.inclusiveRight ? f.to >= b : f.to > b);
                (e || (e = [])).push(new se(g, f.from, i ? null : f.to));
            }
        }
        return e;
    }
    function xe(a, b, c) {
        if (a) for (var d = 0, e; d < a.length; ++d) {
            var f = a[d], g = f.marker;
            var h = f.to == null || (g.inclusiveRight ? f.to >= b : f.to > b);
            if (h || f.from == b && g.type == "bookmark" && (!c || f.marker.insertLeft)) {
                var i = f.from == null || (g.inclusiveLeft ? f.from <= b : f.from < b);
                (e || (e = [])).push(new se(g, i ? null : f.from - b, f.to == null ? null : f.to - b));
            }
        }
        return e;
    }
    function ye(a, b) {
        var c = yb(a, b.from.line) && uf(a, b.from.line).markedSpans;
        var d = yb(a, b.to.line) && uf(a, b.to.line).markedSpans;
        if (!c && !d) return null;
        var e = b.from.ch, f = b.to.ch, g = nb(b.from, b.to) == 0;
        var h = we(c, e, g);
        var i = xe(d, f, g);
        var j = b.text.length == 1, k = pg(b.text).length + (j ? e : 0);
        if (h) {
            for (var l = 0; l < h.length; ++l) {
                var m = h[l];
                if (m.to == null) {
                    var n = te(i, m.marker);
                    if (!n) m.to = e; else if (j) m.to = n.to == null ? null : n.to + k;
                }
            }
        }
        if (i) {
            for (var l = 0; l < i.length; ++l) {
                var m = i[l];
                if (m.to != null) m.to += k;
                if (m.from == null) {
                    var n = te(h, m.marker);
                    if (!n) {
                        m.from = k;
                        if (j) (h || (h = [])).push(m);
                    }
                } else {
                    m.from += k;
                    if (j) (h || (h = [])).push(m);
                }
            }
        }
        if (h) h = ze(h);
        if (i && i != h) i = ze(i);
        var o = [ h ];
        if (!j) {
            var p = b.text.length - 2, q;
            if (p > 0 && h) for (var l = 0; l < h.length; ++l) if (h[l].to == null) (q || (q = [])).push(new se(h[l].marker, null, null));
            for (var l = 0; l < p; ++l) o.push(q);
            o.push(i);
        }
        return o;
    }
    function ze(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c.from != null && c.from == c.to && c.marker.clearWhenEmpty !== false) a.splice(b--, 1);
        }
        if (!a.length) return null;
        return a;
    }
    function Ae(a, b) {
        var c = Mf(a, b);
        var d = ye(a, b);
        if (!c) return d;
        if (!d) return c;
        for (var e = 0; e < c.length; ++e) {
            var f = c[e], g = d[e];
            if (f && g) {
                a: for (var h = 0; h < g.length; ++h) {
                    var i = g[h];
                    for (var j = 0; j < f.length; ++j) if (f[j].marker == i.marker) continue a;
                    f.push(i);
                }
            } else if (g) {
                c[e] = g;
            }
        }
        return c;
    }
    function Be(a, b, c) {
        var d = null;
        a.iter(b.line, c.line + 1, function(a) {
            if (a.markedSpans) for (var b = 0; b < a.markedSpans.length; ++b) {
                var c = a.markedSpans[b].marker;
                if (c.readOnly && (!d || rg(d, c) == -1)) (d || (d = [])).push(c);
            }
        });
        if (!d) return null;
        var e = [ {
            from: b,
            to: c
        } ];
        for (var f = 0; f < d.length; ++f) {
            var g = d[f], h = g.find(0);
            for (var i = 0; i < e.length; ++i) {
                var j = e[i];
                if (nb(j.to, h.from) < 0 || nb(j.from, h.to) > 0) continue;
                var k = [ i, 1 ], l = nb(j.from, h.from), m = nb(j.to, h.to);
                if (l < 0 || !g.inclusiveLeft && !l) k.push({
                    from: j.from,
                    to: h.from
                });
                if (m > 0 || !g.inclusiveRight && !m) k.push({
                    from: h.to,
                    to: j.to
                });
                e.splice.apply(e, k);
                i += k.length - 1;
            }
        }
        return e;
    }
    function Ce(a) {
        var b = a.markedSpans;
        if (!b) return;
        for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
        a.markedSpans = null;
    }
    function De(a, b) {
        if (!b) return;
        for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
        a.markedSpans = b;
    }
    function Ee(a) {
        return a.inclusiveLeft ? -1 : 0;
    }
    function Fe(a) {
        return a.inclusiveRight ? 1 : 0;
    }
    function Ge(a, b) {
        var c = a.lines.length - b.lines.length;
        if (c != 0) return c;
        var d = a.find(), e = b.find();
        var f = nb(d.from, e.from) || Ee(a) - Ee(b);
        if (f) return -f;
        var g = nb(d.to, e.to) || Fe(a) - Fe(b);
        if (g) return g;
        return b.id - a.id;
    }
    function He(a, b) {
        var c = y && a.markedSpans, d;
        if (c) for (var e, f = 0; f < c.length; ++f) {
            e = c[f];
            if (e.marker.collapsed && (b ? e.from : e.to) == null && (!d || Ge(d, e.marker) < 0)) d = e.marker;
        }
        return d;
    }
    function Ie(a) {
        return He(a, true);
    }
    function Je(a) {
        return He(a, false);
    }
    function Ke(a, b, c, d, e) {
        var f = uf(a, b);
        var g = y && f.markedSpans;
        if (g) for (var h = 0; h < g.length; ++h) {
            var i = g[h];
            if (!i.marker.collapsed) continue;
            var j = i.marker.find(0);
            var k = nb(j.from, c) || Ee(i.marker) - Ee(e);
            var l = nb(j.to, d) || Fe(i.marker) - Fe(e);
            if (k >= 0 && l <= 0 || k <= 0 && l >= 0) continue;
            if (k <= 0 && (nb(j.to, c) || Fe(i.marker) - Ee(e)) > 0 || k >= 0 && (nb(j.from, d) || Ee(i.marker) - Fe(e)) < 0) return true;
        }
    }
    function Le(a) {
        var b;
        while (b = Ie(a)) a = b.find(-1, true).line;
        return a;
    }
    function Me(a) {
        var b, c;
        while (b = Je(a)) {
            a = b.find(1, true).line;
            (c || (c = [])).push(a);
        }
        return c;
    }
    function Ne(a, b) {
        var c = uf(a, b), d = Le(c);
        if (c == d) return b;
        return yf(d);
    }
    function Oe(a, b) {
        if (b > a.lastLine()) return b;
        var c = uf(a, b), d;
        if (!Pe(a, c)) return b;
        while (d = Je(c)) c = d.find(1, true).line;
        return yf(c) + 1;
    }
    function Pe(a, b) {
        var c = y && b.markedSpans;
        if (c) for (var d, e = 0; e < c.length; ++e) {
            d = c[e];
            if (!d.marker.collapsed) continue;
            if (d.from == null) return true;
            if (d.marker.widgetNode) continue;
            if (d.from == 0 && d.marker.inclusiveLeft && Qe(a, b, d)) return true;
        }
    }
    function Qe(a, b, c) {
        if (c.to == null) {
            var d = c.marker.find(1, true);
            return Qe(a, d.line, te(d.line.markedSpans, c.marker));
        }
        if (c.marker.inclusiveRight && c.to == b.text.length) return true;
        for (var e, f = 0; f < b.markedSpans.length; ++f) {
            e = b.markedSpans[f];
            if (e.marker.collapsed && !e.marker.widgetNode && e.from == c.to && (e.to == null || e.to != c.from) && (e.marker.inclusiveLeft || c.marker.inclusiveRight) && Qe(a, b, e)) return true;
        }
    }
    var Re = z.LineWidget = function(a, b, c) {
        if (c) for (var d in c) if (c.hasOwnProperty(d)) this[d] = c[d];
        this.cm = a;
        this.node = b;
    };
    eg(Re);
    Re.prototype.clear = function() {
        var a = this.cm, b = this.line.widgets, c = yf(this.line);
        if (c == null || !b) return;
        for (var d = 0; d < b.length; ++d) if (b[d] == this) b.splice(d--, 1);
        if (!b.length) this.line.widgets = null;
        var e = Af(this.line) < a.doc.scrollTop;
        xf(this.line, Math.max(0, this.line.height - Se(this)));
        if (e) Od(a, null, -this.height);
        yc(a, function() {
            Fc(a, c, "widget");
        });
    };
    Re.prototype.changed = function() {
        var a = this.height, b = this.cm;
        this.height = null;
        var c = Se(this) - a;
        if (!c) return;
        xf(this.line, this.line.height + c);
        var d = yf(this.line);
        yc(b, function() {
            Fc(b, d, "widget");
        });
    };
    function Se(a) {
        if (a.height != null) return a.height;
        if (!a.node.parentNode || a.node.parentNode.nodeType != 1) Eg(a.cm.display.measure, Bg("div", [ a.node ], null, "position: relative"));
        return a.height = a.node.offsetHeight;
    }
    function Te(a, b, c, d) {
        var e = new Re(a, c, d);
        if (e.noHScroll) a.display.alignWidgets = true;
        Sd(a, b, "widget", function(b) {
            var c = b.widgets || (b.widgets = []);
            if (e.insertAt == null) c.push(e); else c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e);
            e.line = b;
            if (!Pe(a.doc, b) || e.showIfHidden) {
                var d = Af(b) < a.doc.scrollTop;
                xf(b, b.height + Se(e));
                if (d) Od(a, null, e.height);
                a.curOp.forceUpdate = true;
            }
            return true;
        });
        return e;
    }
    var Ue = z.Line = function(a, b, c) {
        this.text = a;
        De(this, b);
        this.height = c ? c(this) : 1;
    };
    eg(Ue);
    Ue.prototype.lineNo = function() {
        return yf(this);
    };
    function Ve(a, b, c, d) {
        a.text = b;
        if (a.stateAfter) a.stateAfter = null;
        if (a.styles) a.styles = null;
        if (a.order != null) a.order = null;
        Ce(a);
        De(a, c);
        var e = d ? d(a) : 1;
        if (e != a.height) xf(a, e);
    }
    function We(a) {
        a.parent = null;
        Ce(a);
    }
    function Xe(a, b, c, d, e, f) {
        var g = c.flattenSpans;
        if (g == null) g = a.options.flattenSpans;
        var h = 0, i = null;
        var j = new me(b, a.options.tabSize), k;
        if (b == "" && c.blankLine) c.blankLine(d);
        while (!j.eol()) {
            if (j.pos > a.options.maxHighlightLength) {
                g = false;
                if (f) $e(a, b, d, j.pos);
                j.pos = b.length;
                k = null;
            } else {
                k = c.token(j, d);
            }
            if (a.options.addModeClass) {
                var l = z.innerMode(c, d).mode.name;
                if (l) k = "m-" + (k ? l + " " + k : l);
            }
            if (!g || i != k) {
                if (h < j.start) e(j.start, i);
                h = j.start;
                i = k;
            }
            j.start = j.pos;
        }
        while (h < j.pos) {
            var m = Math.min(j.pos, h + 5e4);
            e(m, i);
            h = m;
        }
    }
    function Ye(a, b, c, d) {
        var e = [ a.state.modeGen ];
        Xe(a, b.text, a.doc.mode, c, function(a, b) {
            e.push(a, b);
        }, d);
        for (var f = 0; f < a.state.overlays.length; ++f) {
            var g = a.state.overlays[f], h = 1, i = 0;
            Xe(a, b.text, g.mode, true, function(a, b) {
                var c = h;
                while (i < a) {
                    var d = e[h];
                    if (d > a) e.splice(h, 1, a, e[h + 1], d);
                    h += 2;
                    i = Math.min(a, d);
                }
                if (!b) return;
                if (g.opaque) {
                    e.splice(c, h - c, a, b);
                    h = c + 2;
                } else {
                    for (;c < h; c += 2) {
                        var f = e[c + 1];
                        e[c + 1] = f ? f + " " + b : b;
                    }
                }
            });
        }
        return e;
    }
    function Ze(a, b) {
        if (!b.styles || b.styles[0] != a.state.modeGen) b.styles = Ye(a, b, b.stateAfter = Ub(a, yf(b)));
        return b.styles;
    }
    function $e(a, b, c, d) {
        var e = a.doc.mode;
        var f = new me(b, a.options.tabSize);
        f.start = f.pos = d || 0;
        if (b == "" && e.blankLine) e.blankLine(c);
        while (!f.eol() && f.pos <= a.options.maxHighlightLength) {
            e.token(f, c);
            f.start = f.pos;
        }
    }
    var _e = {}, af = {};
    function bf(a, b) {
        if (!a) return null;
        for (;;) {
            var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!c) break;
            a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
            var d = c[1] ? "bgClass" : "textClass";
            if (b[d] == null) b[d] = c[2]; else if (!new RegExp("(?:^|s)" + c[2] + "(?:$|s)").test(b[d])) b[d] += " " + c[2];
        }
        if (/^\s*$/.test(a)) return null;
        var e = b.cm.options.addModeClass ? af : _e;
        return e[a] || (e[a] = a.replace(/\S+/g, "cm-$&"));
    }
    function cf(a, b) {
        var c = Bg("span", null, null, h ? "padding-right: .1px" : null);
        var d = {
            pre: Bg("pre", [ c ]),
            content: c,
            col: 0,
            pos: 0,
            cm: a
        };
        b.measure = {};
        for (var e = 0; e <= (b.rest ? b.rest.length : 0); e++) {
            var f = e ? b.rest[e - 1] : b.line, i;
            d.pos = 0;
            d.addToken = ef;
            if ((g || h) && a.getOption("lineWrapping")) d.addToken = ff(d.addToken);
            if (Mg(a.display.measure) && (i = Bf(f))) d.addToken = gf(d.addToken, i);
            d.map = [];
            jf(f, d, Ze(a, f));
            if (d.map.length == 0) d.map.push(0, 0, d.content.appendChild(Kg(a.display.measure)));
            if (e == 0) {
                b.measure.map = d.map;
                b.measure.cache = {};
            } else {
                (b.measure.maps || (b.measure.maps = [])).push(d.map);
                (b.measure.caches || (b.measure.caches = [])).push({});
            }
        }
        Zf(a, "renderLine", a, b.line, d.pre);
        return d;
    }
    function df(a) {
        var b = Bg("span", "•", "cm-invalidchar");
        b.title = "\\u" + a.charCodeAt(0).toString(16);
        return b;
    }
    function ef(a, b, c, e, f, g) {
        if (!b) return;
        var h = a.cm.options.specialChars, i = false;
        if (!h.test(b)) {
            a.col += b.length;
            var j = document.createTextNode(b);
            a.map.push(a.pos, a.pos + b.length, j);
            if (d) i = true;
            a.pos += b.length;
        } else {
            var j = document.createDocumentFragment(), k = 0;
            while (true) {
                h.lastIndex = k;
                var l = h.exec(b);
                var m = l ? l.index - k : b.length - k;
                if (m) {
                    var n = document.createTextNode(b.slice(k, k + m));
                    if (d) j.appendChild(Bg("span", [ n ])); else j.appendChild(n);
                    a.map.push(a.pos, a.pos + m, n);
                    a.col += m;
                    a.pos += m;
                }
                if (!l) break;
                k += m + 1;
                if (l[0] == "	") {
                    var o = a.cm.options.tabSize, p = o - a.col % o;
                    var n = j.appendChild(Bg("span", og(p), "cm-tab"));
                    a.col += p;
                } else {
                    var n = a.cm.options.specialCharPlaceholder(l[0]);
                    if (d) j.appendChild(Bg("span", [ n ])); else j.appendChild(n);
                    a.col += 1;
                }
                a.map.push(a.pos, a.pos + 1, n);
                a.pos++;
            }
        }
        if (c || e || f || i) {
            var q = c || "";
            if (e) q += e;
            if (f) q += f;
            var r = Bg("span", [ j ], q);
            if (g) r.title = g;
            return a.content.appendChild(r);
        }
        a.content.appendChild(j);
    }
    function ff(a) {
        function b(a) {
            var b = " ";
            for (var c = 0; c < a.length - 2; ++c) b += c % 2 ? " " : " ";
            b += " ";
            return b;
        }
        return function(c, d, e, f, g, h) {
            a(c, d.replace(/ {3,}/g, b), e, f, g, h);
        };
    }
    function gf(a, b) {
        return function(c, d, e, f, g, h) {
            e = e ? e + " cm-force-border" : "cm-force-border";
            var i = c.pos, j = i + d.length;
            for (;;) {
                for (var k = 0; k < b.length; k++) {
                    var l = b[k];
                    if (l.to > i && l.from <= i) break;
                }
                if (l.to >= j) return a(c, d, e, f, g, h);
                a(c, d.slice(0, l.to - i), e, f, null, h);
                f = null;
                d = d.slice(l.to - i);
                i = l.to;
            }
        };
    }
    function hf(a, b, c, d) {
        var e = !d && c.widgetNode;
        if (e) {
            a.map.push(a.pos, a.pos + b, e);
            a.content.appendChild(e);
        }
        a.pos += b;
    }
    function jf(a, b, c) {
        var d = a.markedSpans, e = a.text, f = 0;
        if (!d) {
            for (var g = 1; g < c.length; g += 2) b.addToken(b, e.slice(f, f = c[g]), bf(c[g + 1], b));
            return;
        }
        var h = e.length, i = 0, g = 1, j = "", k;
        var l = 0, m, n, o, p, q;
        for (;;) {
            if (l == i) {
                m = n = o = p = "";
                q = null;
                l = Infinity;
                var r = [];
                for (var s = 0; s < d.length; ++s) {
                    var t = d[s], u = t.marker;
                    if (t.from <= i && (t.to == null || t.to > i)) {
                        if (t.to != null && l > t.to) {
                            l = t.to;
                            n = "";
                        }
                        if (u.className) m += " " + u.className;
                        if (u.startStyle && t.from == i) o += " " + u.startStyle;
                        if (u.endStyle && t.to == l) n += " " + u.endStyle;
                        if (u.title && !p) p = u.title;
                        if (u.collapsed && (!q || Ge(q.marker, u) < 0)) q = t;
                    } else if (t.from > i && l > t.from) {
                        l = t.from;
                    }
                    if (u.type == "bookmark" && t.from == i && u.widgetNode) r.push(u);
                }
                if (q && (q.from || 0) == i) {
                    hf(b, (q.to == null ? h + 1 : q.to) - i, q.marker, q.from == null);
                    if (q.to == null) return;
                }
                if (!q && r.length) for (var s = 0; s < r.length; ++s) hf(b, 0, r[s]);
            }
            if (i >= h) break;
            var v = Math.min(h, l);
            while (true) {
                if (j) {
                    var w = i + j.length;
                    if (!q) {
                        var x = w > v ? j.slice(0, v - i) : j;
                        b.addToken(b, x, k ? k + m : m, o, i + x.length == l ? n : "", p);
                    }
                    if (w >= v) {
                        j = j.slice(v - i);
                        i = v;
                        break;
                    }
                    i = w;
                    o = "";
                }
                j = e.slice(f, f = c[g++]);
                k = bf(c[g++], b);
            }
        }
    }
    function kf(a, b) {
        return b.from.ch == 0 && b.to.ch == 0 && pg(b.text) == "" && (!a.cm || a.cm.options.wholeLineUpdateBefore);
    }
    function lf(a, b, c, d) {
        function e(a) {
            return c ? c[a] : null;
        }
        function f(a, c, e) {
            Ve(a, c, e, d);
            ag(a, "change", a, b);
        }
        var g = b.from, h = b.to, i = b.text;
        var j = uf(a, g.line), k = uf(a, h.line);
        var l = pg(i), m = e(i.length - 1), n = h.line - g.line;
        if (kf(a, b)) {
            for (var o = 0, p = []; o < i.length - 1; ++o) p.push(new Ue(i[o], e(o), d));
            f(k, k.text, m);
            if (n) a.remove(g.line, n);
            if (p.length) a.insert(g.line, p);
        } else if (j == k) {
            if (i.length == 1) {
                f(j, j.text.slice(0, g.ch) + l + j.text.slice(h.ch), m);
            } else {
                for (var p = [], o = 1; o < i.length - 1; ++o) p.push(new Ue(i[o], e(o), d));
                p.push(new Ue(l + j.text.slice(h.ch), m, d));
                f(j, j.text.slice(0, g.ch) + i[0], e(0));
                a.insert(g.line + 1, p);
            }
        } else if (i.length == 1) {
            f(j, j.text.slice(0, g.ch) + i[0] + k.text.slice(h.ch), e(0));
            a.remove(g.line + 1, n);
        } else {
            f(j, j.text.slice(0, g.ch) + i[0], e(0));
            f(k, l + k.text.slice(h.ch), m);
            for (var o = 1, p = []; o < i.length - 1; ++o) p.push(new Ue(i[o], e(o), d));
            if (n > 1) a.remove(g.line + 1, n - 1);
            a.insert(g.line + 1, p);
        }
        ag(a, "change", a, b);
    }
    function mf(a) {
        this.lines = a;
        this.parent = null;
        for (var b = 0, c = 0; b < a.length; ++b) {
            a[b].parent = this;
            c += a[b].height;
        }
        this.height = c;
    }
    mf.prototype = {
        chunkSize: function() {
            return this.lines.length;
        },
        removeInner: function(a, b) {
            for (var c = a, d = a + b; c < d; ++c) {
                var e = this.lines[c];
                this.height -= e.height;
                We(e);
                ag(e, "delete");
            }
            this.lines.splice(a, b);
        },
        collapse: function(a) {
            a.push.apply(a, this.lines);
        },
        insertInner: function(a, b, c) {
            this.height += c;
            this.lines = this.lines.slice(0, a).concat(b).concat(this.lines.slice(a));
            for (var d = 0; d < b.length; ++d) b[d].parent = this;
        },
        iterN: function(a, b, c) {
            for (var d = a + b; a < d; ++a) if (c(this.lines[a])) return true;
        }
    };
    function nf(a) {
        this.children = a;
        var b = 0, c = 0;
        for (var d = 0; d < a.length; ++d) {
            var e = a[d];
            b += e.chunkSize();
            c += e.height;
            e.parent = this;
        }
        this.size = b;
        this.height = c;
        this.parent = null;
    }
    nf.prototype = {
        chunkSize: function() {
            return this.size;
        },
        removeInner: function(a, b) {
            this.size -= b;
            for (var c = 0; c < this.children.length; ++c) {
                var d = this.children[c], e = d.chunkSize();
                if (a < e) {
                    var f = Math.min(b, e - a), g = d.height;
                    d.removeInner(a, f);
                    this.height -= g - d.height;
                    if (e == f) {
                        this.children.splice(c--, 1);
                        d.parent = null;
                    }
                    if ((b -= f) == 0) break;
                    a = 0;
                } else a -= e;
            }
            if (this.size - b < 25 && (this.children.length > 1 || !(this.children[0] instanceof mf))) {
                var h = [];
                this.collapse(h);
                this.children = [ new mf(h) ];
                this.children[0].parent = this;
            }
        },
        collapse: function(a) {
            for (var b = 0; b < this.children.length; ++b) this.children[b].collapse(a);
        },
        insertInner: function(a, b, c) {
            this.size += b.length;
            this.height += c;
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d], f = e.chunkSize();
                if (a <= f) {
                    e.insertInner(a, b, c);
                    if (e.lines && e.lines.length > 50) {
                        while (e.lines.length > 50) {
                            var g = e.lines.splice(e.lines.length - 25, 25);
                            var h = new mf(g);
                            e.height -= h.height;
                            this.children.splice(d + 1, 0, h);
                            h.parent = this;
                        }
                        this.maybeSpill();
                    }
                    break;
                }
                a -= f;
            }
        },
        maybeSpill: function() {
            if (this.children.length <= 10) return;
            var a = this;
            do {
                var b = a.children.splice(a.children.length - 5, 5);
                var c = new nf(b);
                if (!a.parent) {
                    var d = new nf(a.children);
                    d.parent = a;
                    a.children = [ d, c ];
                    a = d;
                } else {
                    a.size -= c.size;
                    a.height -= c.height;
                    var e = rg(a.parent.children, a);
                    a.parent.children.splice(e + 1, 0, c);
                }
                c.parent = a.parent;
            } while (a.children.length > 10);
            a.parent.maybeSpill();
        },
        iterN: function(a, b, c) {
            for (var d = 0; d < this.children.length; ++d) {
                var e = this.children[d], f = e.chunkSize();
                if (a < f) {
                    var g = Math.min(b, f - a);
                    if (e.iterN(a, g, c)) return true;
                    if ((b -= g) == 0) break;
                    a = 0;
                } else a -= f;
            }
        }
    };
    var of = 0;
    var pf = z.Doc = function(a, b, c) {
        if (!(this instanceof pf)) return new pf(a, b, c);
        if (c == null) c = 0;
        nf.call(this, [ new mf([ new Ue("", null) ]) ]);
        this.first = c;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.cleanGeneration = 1;
        this.frontier = c;
        var d = mb(c, 0);
        this.sel = ub(d);
        this.history = new Cf(null);
        this.id = ++of;
        this.modeOption = b;
        if (typeof a == "string") a = Ng(a);
        lf(this, {
            from: d,
            to: d,
            text: a
        });
        Hb(this, ub(d), hg);
    };
    pf.prototype = tg(nf.prototype, {
        constructor: pf,
        iter: function(a, b, c) {
            if (c) this.iterN(a - this.first, b - a, c); else this.iterN(this.first, this.first + this.size, a);
        },
        insert: function(a, b) {
            var c = 0;
            for (var d = 0; d < b.length; ++d) c += b[d].height;
            this.insertInner(a - this.first, b, c);
        },
        remove: function(a, b) {
            this.removeInner(a - this.first, b);
        },
        getValue: function(a) {
            var b = wf(this, this.first, this.first + this.size);
            if (a === false) return b;
            return b.join(a || "\n");
        },
        setValue: Bc(function(a) {
            var b = mb(this.first, 0), c = this.first + this.size - 1;
            Dd(this, {
                from: b,
                to: mb(c, uf(this, c).text.length),
                text: Ng(a),
                origin: "setValue"
            }, true);
            Hb(this, ub(b));
        }),
        replaceRange: function(a, b, c, d) {
            b = wb(this, b);
            c = c ? wb(this, c) : b;
            Jd(this, a, b, c, d);
        },
        getRange: function(a, b, c) {
            var d = vf(this, wb(this, a), wb(this, b));
            if (c === false) return d;
            return d.join(c || "\n");
        },
        getLine: function(a) {
            var b = this.getLineHandle(a);
            return b && b.text;
        },
        getLineHandle: function(a) {
            if (yb(this, a)) return uf(this, a);
        },
        getLineNumber: function(a) {
            return yf(a);
        },
        getLineHandleVisualStart: function(a) {
            if (typeof a == "number") a = uf(this, a);
            return Le(a);
        },
        lineCount: function() {
            return this.size;
        },
        firstLine: function() {
            return this.first;
        },
        lastLine: function() {
            return this.first + this.size - 1;
        },
        clipPos: function(a) {
            return wb(this, a);
        },
        getCursor: function(a) {
            var b = this.sel.primary(), c;
            if (a == null || a == "head") c = b.head; else if (a == "anchor") c = b.anchor; else if (a == "end" || a == "to" || a === false) c = b.to(); else c = b.from();
            return c;
        },
        listSelections: function() {
            return this.sel.ranges;
        },
        somethingSelected: function() {
            return this.sel.somethingSelected();
        },
        setCursor: Bc(function(a, b, c) {
            Eb(this, wb(this, typeof a == "number" ? mb(a, b || 0) : a), null, c);
        }),
        setSelection: Bc(function(a, b, c) {
            Eb(this, wb(this, a), wb(this, b || a), c);
        }),
        extendSelection: Bc(function(a, b, c) {
            Bb(this, wb(this, a), b && wb(this, b), c);
        }),
        extendSelections: Bc(function(a, b) {
            Cb(this, zb(this, a, b));
        }),
        extendSelectionsBy: Bc(function(a, b) {
            Cb(this, sg(this.sel.ranges, a), b);
        }),
        setSelections: Bc(function(a, b, c) {
            if (!a.length) return;
            for (var d = 0, e = []; d < a.length; d++) e[d] = new sb(wb(this, a[d].anchor), wb(this, a[d].head));
            if (b == null) b = a.length - 1;
            Hb(this, tb(e, b), c);
        }),
        addSelection: Bc(function(a, b, c) {
            var d = this.sel.ranges.slice(0);
            d.push(new sb(wb(this, a), wb(this, b || a)));
            Hb(this, tb(d, d.length - 1), c);
        }),
        getSelection: function(a) {
            var b = this.sel.ranges, c;
            for (var d = 0; d < b.length; d++) {
                var e = vf(this, b[d].from(), b[d].to());
                c = c ? c.concat(e) : e;
            }
            if (a === false) return c; else return c.join(a || "\n");
        },
        getSelections: function(a) {
            var b = [], c = this.sel.ranges;
            for (var d = 0; d < c.length; d++) {
                var e = vf(this, c[d].from(), c[d].to());
                if (a !== false) e = e.join(a || "\n");
                b[d] = e;
            }
            return b;
        },
        replaceSelection: Bc(function(a, b, c) {
            var d = [];
            for (var e = 0; e < this.sel.ranges.length; e++) d[e] = a;
            this.replaceSelections(d, b, c || "+input");
        }),
        replaceSelections: function(a, b, c) {
            var d = [], e = this.sel;
            for (var f = 0; f < e.ranges.length; f++) {
                var g = e.ranges[f];
                d[f] = {
                    from: g.from(),
                    to: g.to(),
                    text: Ng(a[f]),
                    origin: c
                };
            }
            var h = b && b != "end" && Bd(this, d, b);
            for (var f = d.length - 1; f >= 0; f--) Dd(this, d[f]);
            if (h) Gb(this, h); else if (this.cm) Pd(this.cm);
        },
        undo: Bc(function() {
            Fd(this, "undo");
        }),
        redo: Bc(function() {
            Fd(this, "redo");
        }),
        undoSelection: Bc(function() {
            Fd(this, "undo", true);
        }),
        redoSelection: Bc(function() {
            Fd(this, "redo", true);
        }),
        setExtending: function(a) {
            this.extend = a;
        },
        getExtending: function() {
            return this.extend;
        },
        historySize: function() {
            var a = this.history, b = 0, c = 0;
            for (var d = 0; d < a.done.length; d++) if (!a.done[d].ranges) ++b;
            for (var d = 0; d < a.undone.length; d++) if (!a.undone[d].ranges) ++c;
            return {
                undo: b,
                redo: c
            };
        },
        clearHistory: function() {
            this.history = new Cf(this.history.maxGeneration);
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(true);
        },
        changeGeneration: function(a) {
            if (a) this.history.lastOp = this.history.lastOrigin = null;
            return this.history.generation;
        },
        isClean: function(a) {
            return this.history.generation == (a || this.cleanGeneration);
        },
        getHistory: function() {
            return {
                done: Nf(this.history.done),
                undone: Nf(this.history.undone)
            };
        },
        setHistory: function(a) {
            var b = this.history = new Cf(this.history.maxGeneration);
            b.done = Nf(a.done.slice(0), null, true);
            b.undone = Nf(a.undone.slice(0), null, true);
        },
        markText: function(a, b, c) {
            return pe(this, wb(this, a), wb(this, b), c, "range");
        },
        setBookmark: function(a, b) {
            var c = {
                replacedWith: b && (b.nodeType == null ? b.widget : b),
                insertLeft: b && b.insertLeft,
                clearWhenEmpty: false
            };
            a = wb(this, a);
            return pe(this, a, a, c, "bookmark");
        },
        findMarksAt: function(a) {
            a = wb(this, a);
            var b = [], c = uf(this, a.line).markedSpans;
            if (c) for (var d = 0; d < c.length; ++d) {
                var e = c[d];
                if ((e.from == null || e.from <= a.ch) && (e.to == null || e.to >= a.ch)) b.push(e.marker.parent || e.marker);
            }
            return b;
        },
        findMarks: function(a, b) {
            a = wb(this, a);
            b = wb(this, b);
            var c = [], d = a.line;
            this.iter(a.line, b.line + 1, function(e) {
                var f = e.markedSpans;
                if (f) for (var g = 0; g < f.length; g++) {
                    var h = f[g];
                    if (!(d == a.line && a.ch > h.to || h.from == null && d != a.line || d == b.line && h.from > b.ch)) c.push(h.marker.parent || h.marker);
                }
                ++d;
            });
            return c;
        },
        getAllMarks: function() {
            var a = [];
            this.iter(function(b) {
                var c = b.markedSpans;
                if (c) for (var d = 0; d < c.length; ++d) if (c[d].from != null) a.push(c[d].marker);
            });
            return a;
        },
        posFromIndex: function(a) {
            var b, c = this.first;
            this.iter(function(d) {
                var e = d.text.length + 1;
                if (e > a) {
                    b = a;
                    return true;
                }
                a -= e;
                ++c;
            });
            return wb(this, mb(c, b));
        },
        indexFromPos: function(a) {
            a = wb(this, a);
            var b = a.ch;
            if (a.line < this.first || a.ch < 0) return 0;
            this.iter(this.first, a.line, function(a) {
                b += a.text.length + 1;
            });
            return b;
        },
        copy: function(a) {
            var b = new pf(wf(this, this.first, this.first + this.size), this.modeOption, this.first);
            b.scrollTop = this.scrollTop;
            b.scrollLeft = this.scrollLeft;
            b.sel = this.sel;
            b.extend = false;
            if (a) {
                b.history.undoDepth = this.history.undoDepth;
                b.setHistory(this.getHistory());
            }
            return b;
        },
        linkedDoc: function(a) {
            if (!a) a = {};
            var b = this.first, c = this.first + this.size;
            if (a.from != null && a.from > b) b = a.from;
            if (a.to != null && a.to < c) c = a.to;
            var d = new pf(wf(this, b, c), a.mode || this.modeOption, b);
            if (a.sharedHist) d.history = this.history;
            (this.linked || (this.linked = [])).push({
                doc: d,
                sharedHist: a.sharedHist
            });
            d.linked = [ {
                doc: this,
                isParent: true,
                sharedHist: a.sharedHist
            } ];
            return d;
        },
        unlinkDoc: function(a) {
            if (a instanceof z) a = a.doc;
            if (this.linked) for (var b = 0; b < this.linked.length; ++b) {
                var c = this.linked[b];
                if (c.doc != a) continue;
                this.linked.splice(b, 1);
                a.unlinkDoc(this);
                break;
            }
            if (a.history == this.history) {
                var d = [ a.id ];
                sf(a, function(a) {
                    d.push(a.id);
                }, true);
                a.history = new Cf(null);
                a.history.done = Nf(this.history.done, d);
                a.history.undone = Nf(this.history.undone, d);
            }
        },
        iterLinkedDocs: function(a) {
            sf(this, a);
        },
        getMode: function() {
            return this.mode;
        },
        getEditor: function() {
            return this.cm;
        }
    });
    pf.prototype.eachLine = pf.prototype.iter;
    var qf = "iter insert remove copy getEditor".split(" ");
    for (var rf in pf.prototype) if (pf.prototype.hasOwnProperty(rf) && rg(qf, rf) < 0) z.prototype[rf] = function(a) {
        return function() {
            return a.apply(this.doc, arguments);
        };
    }(pf.prototype[rf]);
    eg(pf);
    function sf(a, b, c) {
        function d(a, e, f) {
            if (a.linked) for (var g = 0; g < a.linked.length; ++g) {
                var h = a.linked[g];
                if (h.doc == e) continue;
                var i = f && h.sharedHist;
                if (c && !i) continue;
                b(h.doc, i);
                d(h.doc, a, i);
            }
        }
        d(a, null, true);
    }
    function tf(a, b) {
        if (b.cm) throw new Error("This document is already in use.");
        a.doc = b;
        b.cm = a;
        F(a);
        B(a);
        if (!a.options.lineWrapping) L(a);
        a.options.mode = b.modeOption;
        Ec(a);
    }
    function uf(a, b) {
        b -= a.first;
        if (b < 0 || b >= a.size) throw new Error("There is no line " + (b + a.first) + " in the document.");
        for (var c = a; !c.lines; ) {
            for (var d = 0; ;++d) {
                var e = c.children[d], f = e.chunkSize();
                if (b < f) {
                    c = e;
                    break;
                }
                b -= f;
            }
        }
        return c.lines[b];
    }
    function vf(a, b, c) {
        var d = [], e = b.line;
        a.iter(b.line, c.line + 1, function(a) {
            var f = a.text;
            if (e == c.line) f = f.slice(0, c.ch);
            if (e == b.line) f = f.slice(b.ch);
            d.push(f);
            ++e;
        });
        return d;
    }
    function wf(a, b, c) {
        var d = [];
        a.iter(b, c, function(a) {
            d.push(a.text);
        });
        return d;
    }
    function xf(a, b) {
        var c = b - a.height;
        if (c) for (var d = a; d; d = d.parent) d.height += c;
    }
    function yf(a) {
        if (a.parent == null) return null;
        var b = a.parent, c = rg(b.lines, a);
        for (var d = b.parent; d; b = d, d = d.parent) {
            for (var e = 0; ;++e) {
                if (d.children[e] == b) break;
                c += d.children[e].chunkSize();
            }
        }
        return c + b.first;
    }
    function zf(a, b) {
        var c = a.first;
        a: do {
            for (var d = 0; d < a.children.length; ++d) {
                var e = a.children[d], f = e.height;
                if (b < f) {
                    a = e;
                    continue a;
                }
                b -= f;
                c += e.chunkSize();
            }
            return c;
        } while (!a.lines);
        for (var d = 0; d < a.lines.length; ++d) {
            var g = a.lines[d], h = g.height;
            if (b < h) break;
            b -= h;
        }
        return c + d;
    }
    function Af(a) {
        a = Le(a);
        var b = 0, c = a.parent;
        for (var d = 0; d < c.lines.length; ++d) {
            var e = c.lines[d];
            if (e == a) break; else b += e.height;
        }
        for (var f = c.parent; f; c = f, f = c.parent) {
            for (var d = 0; d < f.children.length; ++d) {
                var g = f.children[d];
                if (g == c) break; else b += g.height;
            }
        }
        return b;
    }
    function Bf(a) {
        var b = a.order;
        if (b == null) b = a.order = ch(a.text);
        return b;
    }
    function Cf(a) {
        this.done = [];
        this.undone = [];
        this.undoDepth = Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        this.generation = this.maxGeneration = a || 1;
    }
    function Df(a, b) {
        var c = {
            from: ob(b.from),
            to: xd(b),
            text: vf(a, b.from, b.to)
        };
        Kf(a, c, b.from.line, b.to.line + 1);
        sf(a, function(a) {
            Kf(a, c, b.from.line, b.to.line + 1);
        }, true);
        return c;
    }
    function Ef(a) {
        while (a.length) {
            var b = pg(a);
            if (b.ranges) a.pop(); else break;
        }
    }
    function Ff(a, b) {
        if (b) {
            Ef(a.done);
            return pg(a.done);
        } else if (a.done.length && !pg(a.done).ranges) {
            return pg(a.done);
        } else if (a.done.length > 1 && !a.done[a.done.length - 2].ranges) {
            a.done.pop();
            return pg(a.done);
        }
    }
    function Gf(a, b, c, d) {
        var e = a.history;
        e.undone.length = 0;
        var f = +new Date(), g;
        if ((e.lastOp == d || e.lastOrigin == b.origin && b.origin && (b.origin.charAt(0) == "+" && a.cm && e.lastModTime > f - a.cm.options.historyEventDelay || b.origin.charAt(0) == "*")) && (g = Ff(e, e.lastOp == d))) {
            var h = pg(g.changes);
            if (nb(b.from, b.to) == 0 && nb(b.from, h.to) == 0) {
                h.to = xd(b);
            } else {
                g.changes.push(Df(a, b));
            }
        } else {
            var i = pg(e.done);
            if (!i || !i.ranges) Jf(a.sel, e.done);
            g = {
                changes: [ Df(a, b) ],
                generation: e.generation
            };
            e.done.push(g);
            while (e.done.length > e.undoDepth) {
                e.done.shift();
                if (!e.done[0].ranges) e.done.shift();
            }
        }
        e.done.push(c);
        e.generation = ++e.maxGeneration;
        e.lastModTime = f;
        e.lastOp = d;
        e.lastOrigin = e.lastSelOrigin = b.origin;
        if (!h) Zf(a, "historyAdded");
    }
    function Hf(a, b, c, d) {
        var e = b.charAt(0);
        return e == "*" || e == "+" && c.ranges.length == d.ranges.length && c.somethingSelected() == d.somethingSelected() && new Date() - a.history.lastSelTime <= (a.cm ? a.cm.options.historyEventDelay : 500);
    }
    function If(a, b, c, d) {
        var e = a.history, f = d && d.origin;
        if (c == e.lastOp || f && e.lastSelOrigin == f && Hf(a, f, pg(e.done), b)) e.done[e.done.length - 1] = b; else Jf(b, e.done);
        e.lastSelTime = +new Date();
        e.lastSelOrigin = f;
        e.lastOp = c;
        if (d && d.clearRedo !== false) Ef(e.undone);
    }
    function Jf(a, b) {
        var c = pg(b);
        if (!(c && c.ranges && c.equals(a))) b.push(a);
    }
    function Kf(a, b, c, d) {
        var e = b["spans_" + a.id], f = 0;
        a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function(c) {
            if (c.markedSpans) (e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans;
            ++f;
        });
    }
    function Lf(a) {
        if (!a) return null;
        for (var b = 0, c; b < a.length; ++b) {
            if (a[b].marker.explicitlyCleared) {
                if (!c) c = a.slice(0, b);
            } else if (c) c.push(a[b]);
        }
        return !c ? a : c.length ? c : null;
    }
    function Mf(a, b) {
        var c = b["spans_" + a.id];
        if (!c) return null;
        for (var d = 0, e = []; d < b.text.length; ++d) e.push(Lf(c[d]));
        return e;
    }
    function Nf(a, b, c) {
        for (var d = 0, e = []; d < a.length; ++d) {
            var f = a[d];
            if (f.ranges) {
                e.push(c ? rb.prototype.deepCopy.call(f) : f);
                continue;
            }
            var g = f.changes, h = [];
            e.push({
                changes: h
            });
            for (var i = 0; i < g.length; ++i) {
                var j = g[i], k;
                h.push({
                    from: j.from,
                    to: j.to,
                    text: j.text
                });
                if (b) for (var l in j) if (k = l.match(/^spans_(\d+)$/)) {
                    if (rg(b, Number(k[1])) > -1) {
                        pg(h)[l] = j[l];
                        delete j[l];
                    }
                }
            }
        }
        return e;
    }
    function Of(a, b, c, d) {
        if (c < a.line) {
            a.line += d;
        } else if (b < a.line) {
            a.line = b;
            a.ch = 0;
        }
    }
    function Pf(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e], g = true;
            if (f.ranges) {
                if (!f.copied) {
                    f = a[e] = f.deepCopy();
                    f.copied = true;
                }
                for (var h = 0; h < f.ranges.length; h++) {
                    Of(f.ranges[h].anchor, b, c, d);
                    Of(f.ranges[h].head, b, c, d);
                }
                continue;
            }
            for (var h = 0; h < f.changes.length; ++h) {
                var i = f.changes[h];
                if (c < i.from.line) {
                    i.from = mb(i.from.line + d, i.from.ch);
                    i.to = mb(i.to.line + d, i.to.ch);
                } else if (b <= i.to.line) {
                    g = false;
                    break;
                }
            }
            if (!g) {
                a.splice(0, e + 1);
                e = 0;
            }
        }
    }
    function Qf(a, b) {
        var c = b.from.line, d = b.to.line, e = b.text.length - (d - c) - 1;
        Pf(a.done, c, d, e);
        Pf(a.undone, c, d, e);
    }
    var Rf = z.e_preventDefault = function(a) {
        if (a.preventDefault) a.preventDefault(); else a.returnValue = false;
    };
    var Sf = z.e_stopPropagation = function(a) {
        if (a.stopPropagation) a.stopPropagation(); else a.cancelBubble = true;
    };
    function Tf(a) {
        return a.defaultPrevented != null ? a.defaultPrevented : a.returnValue == false;
    }
    var Uf = z.e_stop = function(a) {
        Rf(a);
        Sf(a);
    };
    function Vf(a) {
        return a.target || a.srcElement;
    }
    function Wf(a) {
        var b = a.which;
        if (b == null) {
            if (a.button & 1) b = 1; else if (a.button & 2) b = 3; else if (a.button & 4) b = 2;
        }
        if (s && a.ctrlKey && b == 1) b = 3;
        return b;
    }
    var Xf = z.on = function(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, false); else if (a.attachEvent) a.attachEvent("on" + b, c); else {
            var d = a._handlers || (a._handlers = {});
            var e = d[b] || (d[b] = []);
            e.push(c);
        }
    };
    var Yf = z.off = function(a, b, c) {
        if (a.removeEventListener) a.removeEventListener(b, c, false); else if (a.detachEvent) a.detachEvent("on" + b, c); else {
            var d = a._handlers && a._handlers[b];
            if (!d) return;
            for (var e = 0; e < d.length; ++e) if (d[e] == c) {
                d.splice(e, 1);
                break;
            }
        }
    };
    var Zf = z.signal = function(a, b) {
        var c = a._handlers && a._handlers[b];
        if (!c) return;
        var d = Array.prototype.slice.call(arguments, 2);
        for (var e = 0; e < c.length; ++e) c[e].apply(null, d);
    };
    var $f, _f = 0;
    function ag(a, b) {
        var c = a._handlers && a._handlers[b];
        if (!c) return;
        var d = Array.prototype.slice.call(arguments, 2);
        if (!$f) {
            ++_f;
            $f = [];
            setTimeout(bg, 0);
        }
        function e(a) {
            return function() {
                a.apply(null, d);
            };
        }
        for (var f = 0; f < c.length; ++f) $f.push(e(c[f]));
    }
    function bg() {
        --_f;
        var a = $f;
        $f = null;
        for (var b = 0; b < a.length; ++b) a[b]();
    }
    function cg(a, b, c) {
        Zf(a, c || b.type, a, b);
        return Tf(b) || b.codemirrorIgnore;
    }
    function dg(a, b) {
        var c = a._handlers && a._handlers[b];
        return c && c.length > 0;
    }
    function eg(a) {
        a.prototype.on = function(a, b) {
            Xf(this, a, b);
        };
        a.prototype.off = function(a, b) {
            Yf(this, a, b);
        };
    }
    var fg = 30;
    var gg = z.Pass = {
        toString: function() {
            return "CodeMirror.Pass";
        }
    };
    var hg = {
        scroll: false
    }, ig = {
        origin: "*mouse"
    }, jg = {
        origin: "+move"
    };
    function kg() {
        this.id = null;
    }
    kg.prototype.set = function(a, b) {
        clearTimeout(this.id);
        this.id = setTimeout(b, a);
    };
    var lg = z.countColumn = function(a, b, c, d, e) {
        if (b == null) {
            b = a.search(/[^\s\u00a0]/);
            if (b == -1) b = a.length;
        }
        for (var f = d || 0, g = e || 0; ;) {
            var h = a.indexOf("	", f);
            if (h < 0 || h >= b) return g + (b - f);
            g += h - f;
            g += c - g % c;
            f = h + 1;
        }
    };
    function mg(a, b, c) {
        for (var d = 0, e = 0; ;) {
            var f = a.indexOf("	", d);
            if (f == -1) f = a.length;
            var g = f - d;
            if (f == a.length || e + g >= b) return d + Math.min(g, b - e);
            e += f - d;
            e += c - e % c;
            d = f + 1;
            if (e >= b) return d;
        }
    }
    var ng = [ "" ];
    function og(a) {
        while (ng.length <= a) ng.push(pg(ng) + " ");
        return ng[a];
    }
    function pg(a) {
        return a[a.length - 1];
    }
    var qg = function(a) {
        a.select();
    };
    if (q) qg = function(a) {
        a.selectionStart = 0;
        a.selectionEnd = a.value.length;
    }; else if (g) qg = function(a) {
        try {
            a.select();
        } catch (b) {}
    };
    function rg(a, b) {
        for (var c = 0; c < a.length; ++c) if (a[c] == b) return c;
        return -1;
    }
    if ([].indexOf) rg = function(a, b) {
        return a.indexOf(b);
    };
    function sg(a, b) {
        var c = [];
        for (var d = 0; d < a.length; d++) c[d] = b(a[d], d);
        return c;
    }
    if ([].map) sg = function(a, b) {
        return a.map(b);
    };
    function tg(a, b) {
        var c;
        if (Object.create) {
            c = Object.create(a);
        } else {
            var d = function() {};
            d.prototype = a;
            c = new d();
        }
        if (b) ug(b, c);
        return c;
    }
    function ug(a, b) {
        if (!b) b = {};
        for (var c in a) if (a.hasOwnProperty(c)) b[c] = a[c];
        return b;
    }
    function vg(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return function() {
            return a.apply(null, b);
        };
    }
    var wg = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    var xg = z.isWordChar = function(a) {
        return /\w/.test(a) || a > "" && (a.toUpperCase() != a.toLowerCase() || wg.test(a));
    };
    function yg(a) {
        for (var b in a) if (a.hasOwnProperty(b) && a[b]) return false;
        return true;
    }
    var zg = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function Ag(a) {
        return a.charCodeAt(0) >= 768 && zg.test(a);
    }
    function Bg(a, b, c, d) {
        var e = document.createElement(a);
        if (c) e.className = c;
        if (d) e.style.cssText = d;
        if (typeof b == "string") e.appendChild(document.createTextNode(b)); else if (b) for (var f = 0; f < b.length; ++f) e.appendChild(b[f]);
        return e;
    }
    var Cg;
    if (document.createRange) Cg = function(a, b, c) {
        var d = document.createRange();
        d.setEnd(a, c);
        d.setStart(a, b);
        return d;
    }; else Cg = function(a, b, c) {
        var d = document.body.createTextRange();
        d.moveToElementText(a.parentNode);
        d.collapse(true);
        d.moveEnd("character", c);
        d.moveStart("character", b);
        return d;
    };
    function Dg(a) {
        for (var b = a.childNodes.length; b > 0; --b) a.removeChild(a.firstChild);
        return a;
    }
    function Eg(a, b) {
        return Dg(a).appendChild(b);
    }
    function Fg() {
        return document.activeElement;
    }
    if (b) Fg = function() {
        try {
            return document.activeElement;
        } catch (a) {
            return document.body;
        }
    };
    var Gg = function() {
        if (d) return false;
        var a = Bg("div");
        return "draggable" in a || "dragDrop" in a;
    }();
    var Hg;
    function Ig(a) {
        if (Hg != null) return Hg;
        var b = Bg("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        Eg(a, b);
        if (b.offsetWidth) Hg = b.offsetHeight - b.clientHeight;
        return Hg || 0;
    }
    var Jg;
    function Kg(a) {
        if (Jg == null) {
            var b = Bg("span", "​");
            Eg(a, Bg("span", [ b, document.createTextNode("x") ]));
            if (a.firstChild.offsetHeight != 0) Jg = b.offsetWidth <= 1 && b.offsetHeight > 2 && !c;
        }
        if (Jg) return Bg("span", "​"); else return Bg("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
    }
    var Lg;
    function Mg(a) {
        if (Lg != null) return Lg;
        var b = Eg(a, document.createTextNode("AخA"));
        var c = Cg(b, 0, 1).getBoundingClientRect();
        if (c.left == c.right) return false;
        var d = Cg(b, 1, 2).getBoundingClientRect();
        return Lg = d.right - c.right < 3;
    }
    var Ng = z.splitLines = "\n\nb".split(/\n/).length != 3 ? function(a) {
        var b = 0, c = [], d = a.length;
        while (b <= d) {
            var e = a.indexOf("\n", b);
            if (e == -1) e = a.length;
            var f = a.slice(b, a.charAt(e - 1) == "\r" ? e - 1 : e);
            var g = f.indexOf("\r");
            if (g != -1) {
                c.push(f.slice(0, g));
                b += g + 1;
            } else {
                c.push(f);
                b = e + 1;
            }
        }
        return c;
    } : function(a) {
        return a.split(/\r\n?|\n/);
    };
    var Og = window.getSelection ? function(a) {
        try {
            return a.selectionStart != a.selectionEnd;
        } catch (b) {
            return false;
        }
    } : function(a) {
        try {
            var b = a.ownerDocument.selection.createRange();
        } catch (c) {}
        if (!b || b.parentElement() != a) return false;
        return b.compareEndPoints("StartToEnd", b) != 0;
    };
    var Pg = function() {
        var a = Bg("div");
        if ("oncopy" in a) return true;
        a.setAttribute("oncopy", "return;");
        return typeof a.oncopy == "function";
    }();
    var Qg = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        107: "=",
        109: "-",
        127: "Delete",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    };
    z.keyNames = Qg;
    (function() {
        for (var a = 0; a < 10; a++) Qg[a + 48] = Qg[a + 96] = String(a);
        for (var a = 65; a <= 90; a++) Qg[a] = String.fromCharCode(a);
        for (var a = 1; a <= 12; a++) Qg[a + 111] = Qg[a + 63235] = "F" + a;
    })();
    function Rg(a, b, c, d) {
        if (!a) return d(b, c, "ltr");
        var e = false;
        for (var f = 0; f < a.length; ++f) {
            var g = a[f];
            if (g.from < c && g.to > b || b == c && g.to == b) {
                d(Math.max(g.from, b), Math.min(g.to, c), g.level == 1 ? "rtl" : "ltr");
                e = true;
            }
        }
        if (!e) d(b, c, "ltr");
    }
    function Sg(a) {
        return a.level % 2 ? a.to : a.from;
    }
    function Tg(a) {
        return a.level % 2 ? a.from : a.to;
    }
    function Ug(a) {
        var b = Bf(a);
        return b ? Sg(b[0]) : 0;
    }
    function Vg(a) {
        var b = Bf(a);
        if (!b) return a.text.length;
        return Tg(pg(b));
    }
    function Wg(a, b) {
        var c = uf(a.doc, b);
        var d = Le(c);
        if (d != c) b = yf(d);
        var e = Bf(d);
        var f = !e ? 0 : e[0].level % 2 ? Vg(d) : Ug(d);
        return mb(b, f);
    }
    function Xg(a, b) {
        var c, d = uf(a.doc, b);
        while (c = Je(d)) {
            d = c.find(1, true).line;
            b = null;
        }
        var e = Bf(d);
        var f = !e ? d.text.length : e[0].level % 2 ? Ug(d) : Vg(d);
        return mb(b == null ? yf(d) : b, f);
    }
    function Yg(a, b, c) {
        var d = a[0].level;
        if (b == d) return true;
        if (c == d) return false;
        return b < c;
    }
    var Zg;
    function $g(a, b) {
        Zg = null;
        for (var c = 0, d; c < a.length; ++c) {
            var e = a[c];
            if (e.from < b && e.to > b) return c;
            if (e.from == b || e.to == b) {
                if (d == null) {
                    d = c;
                } else if (Yg(a, e.level, a[d].level)) {
                    if (e.from != e.to) Zg = d;
                    return c;
                } else {
                    if (e.from != e.to) Zg = c;
                    return d;
                }
            }
        }
        return d;
    }
    function _g(a, b, c, d) {
        if (!d) return b + c;
        do b += c; while (b > 0 && Ag(a.text.charAt(b)));
        return b;
    }
    function ah(a, b, c, d) {
        var e = Bf(a);
        if (!e) return bh(a, b, c, d);
        var f = $g(e, b), g = e[f];
        var h = _g(a, b, g.level % 2 ? -c : c, d);
        for (;;) {
            if (h > g.from && h < g.to) return h;
            if (h == g.from || h == g.to) {
                if ($g(e, h) == f) return h;
                g = e[f += c];
                return c > 0 == g.level % 2 ? g.to : g.from;
            } else {
                g = e[f += c];
                if (!g) return null;
                if (c > 0 == g.level % 2) h = _g(a, g.to, -1, d); else h = _g(a, g.from, 1, d);
            }
        }
    }
    function bh(a, b, c, d) {
        var e = b + c;
        if (d) while (e > 0 && Ag(a.text.charAt(e))) e += c;
        return e < 0 || e > a.text.length ? null : e;
    }
    var ch = function() {
        var a = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
        var b = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
        function c(c) {
            if (c <= 247) return a.charAt(c); else if (1424 <= c && c <= 1524) return "R"; else if (1536 <= c && c <= 1773) return b.charAt(c - 1536); else if (1774 <= c && c <= 2220) return "r"; else if (8192 <= c && c <= 8203) return "w"; else if (c == 8204) return "b"; else return "L";
        }
        var d = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var e = /[stwN]/, f = /[LRr]/, g = /[Lb1n]/, h = /[1n]/;
        var i = "L";
        function j(a, b, c) {
            this.level = a;
            this.from = b;
            this.to = c;
        }
        return function(a) {
            if (!d.test(a)) return false;
            var b = a.length, k = [];
            for (var l = 0, m; l < b; ++l) k.push(m = c(a.charCodeAt(l)));
            for (var l = 0, n = i; l < b; ++l) {
                var m = k[l];
                if (m == "m") k[l] = n; else n = m;
            }
            for (var l = 0, o = i; l < b; ++l) {
                var m = k[l];
                if (m == "1" && o == "r") k[l] = "n"; else if (f.test(m)) {
                    o = m;
                    if (m == "r") k[l] = "R";
                }
            }
            for (var l = 1, n = k[0]; l < b - 1; ++l) {
                var m = k[l];
                if (m == "+" && n == "1" && k[l + 1] == "1") k[l] = "1"; else if (m == "," && n == k[l + 1] && (n == "1" || n == "n")) k[l] = n;
                n = m;
            }
            for (var l = 0; l < b; ++l) {
                var m = k[l];
                if (m == ",") k[l] = "N"; else if (m == "%") {
                    for (var p = l + 1; p < b && k[p] == "%"; ++p) {}
                    var q = l && k[l - 1] == "!" || p < b && k[p] == "1" ? "1" : "N";
                    for (var r = l; r < p; ++r) k[r] = q;
                    l = p - 1;
                }
            }
            for (var l = 0, o = i; l < b; ++l) {
                var m = k[l];
                if (o == "L" && m == "1") k[l] = "L"; else if (f.test(m)) o = m;
            }
            for (var l = 0; l < b; ++l) {
                if (e.test(k[l])) {
                    for (var p = l + 1; p < b && e.test(k[p]); ++p) {}
                    var s = (l ? k[l - 1] : i) == "L";
                    var t = (p < b ? k[p] : i) == "L";
                    var q = s || t ? "L" : "R";
                    for (var r = l; r < p; ++r) k[r] = q;
                    l = p - 1;
                }
            }
            var u = [], v;
            for (var l = 0; l < b; ) {
                if (g.test(k[l])) {
                    var w = l;
                    for (++l; l < b && g.test(k[l]); ++l) {}
                    u.push(new j(0, w, l));
                } else {
                    var x = l, y = u.length;
                    for (++l; l < b && k[l] != "L"; ++l) {}
                    for (var r = x; r < l; ) {
                        if (h.test(k[r])) {
                            if (x < r) u.splice(y, 0, new j(1, x, r));
                            var z = r;
                            for (++r; r < l && h.test(k[r]); ++r) {}
                            u.splice(y, 0, new j(2, z, r));
                            x = r;
                        } else ++r;
                    }
                    if (x < l) u.splice(y, 0, new j(1, x, l));
                }
            }
            if (u[0].level == 1 && (v = a.match(/^\s+/))) {
                u[0].from = v[0].length;
                u.unshift(new j(0, 0, v[0].length));
            }
            if (pg(u).level == 1 && (v = a.match(/\s+$/))) {
                pg(u).to -= v[0].length;
                u.push(new j(0, b - v[0].length, b));
            }
            if (u[0].level != pg(u).level) u.push(new j(u[0].level, b, b));
            return u;
        };
    }();
    z.version = "4.0.1";
    return z;
});

(function(a) {
    if (typeof exports == "object" && typeof module == "object") a(require("../../lib/codemirror")); else if (typeof define == "function" && define.amd) define([ "../../lib/codemirror" ], a); else a(CodeMirror);
})(function(a) {
    "use strict";
    a.defineMode("xml", function(b, c) {
        var d = b.indentUnit;
        var e = c.multilineTagIndentFactor || 1;
        var f = c.multilineTagIndentPastTag;
        if (f == null) f = true;
        var g = c.htmlMode ? {
            autoSelfClosers: {
                area: true,
                base: true,
                br: true,
                col: true,
                command: true,
                embed: true,
                frame: true,
                hr: true,
                img: true,
                input: true,
                keygen: true,
                link: true,
                meta: true,
                param: true,
                source: true,
                track: true,
                wbr: true
            },
            implicitlyClosed: {
                dd: true,
                li: true,
                optgroup: true,
                option: true,
                p: true,
                rp: true,
                rt: true,
                tbody: true,
                td: true,
                tfoot: true,
                th: true,
                tr: true
            },
            contextGrabbers: {
                dd: {
                    dd: true,
                    dt: true
                },
                dt: {
                    dd: true,
                    dt: true
                },
                li: {
                    li: true
                },
                option: {
                    option: true,
                    optgroup: true
                },
                optgroup: {
                    optgroup: true
                },
                p: {
                    address: true,
                    article: true,
                    aside: true,
                    blockquote: true,
                    dir: true,
                    div: true,
                    dl: true,
                    fieldset: true,
                    footer: true,
                    form: true,
                    h1: true,
                    h2: true,
                    h3: true,
                    h4: true,
                    h5: true,
                    h6: true,
                    header: true,
                    hgroup: true,
                    hr: true,
                    menu: true,
                    nav: true,
                    ol: true,
                    p: true,
                    pre: true,
                    section: true,
                    table: true,
                    ul: true
                },
                rp: {
                    rp: true,
                    rt: true
                },
                rt: {
                    rp: true,
                    rt: true
                },
                tbody: {
                    tbody: true,
                    tfoot: true
                },
                td: {
                    td: true,
                    th: true
                },
                tfoot: {
                    tbody: true
                },
                th: {
                    td: true,
                    th: true
                },
                thead: {
                    tbody: true,
                    tfoot: true
                },
                tr: {
                    tr: true
                }
            },
            doNotIndent: {
                pre: true
            },
            allowUnquoted: true,
            allowMissing: true,
            caseFold: true
        } : {
            autoSelfClosers: {},
            implicitlyClosed: {},
            contextGrabbers: {},
            doNotIndent: {},
            allowUnquoted: false,
            allowMissing: false,
            caseFold: false
        };
        var h = c.alignCDATA;
        var i, j, k;
        function l(a, b) {
            function c(c) {
                b.tokenize = c;
                return c(a, b);
            }
            var d = a.next();
            if (d == "<") {
                if (a.eat("!")) {
                    if (a.eat("[")) {
                        if (a.match("CDATA[")) return c(o("atom", "]]>")); else return null;
                    } else if (a.match("--")) {
                        return c(o("comment", "-->"));
                    } else if (a.match("DOCTYPE", true, true)) {
                        a.eatWhile(/[\w\._\-]/);
                        return c(p(1));
                    } else {
                        return null;
                    }
                } else if (a.eat("?")) {
                    a.eatWhile(/[\w\._\-]/);
                    b.tokenize = o("meta", "?>");
                    return "meta";
                } else {
                    var e = a.eat("/");
                    i = "";
                    var f;
                    while (f = a.eat(/[^\s\u00a0=<>\"\'\/?]/)) i += f;
                    if (g.caseFold) i = i.toLowerCase();
                    if (!i) return "tag error";
                    j = e ? "closeTag" : "openTag";
                    b.tokenize = m;
                    return "tag";
                }
            } else if (d == "&") {
                var h;
                if (a.eat("#")) {
                    if (a.eat("x")) {
                        h = a.eatWhile(/[a-fA-F\d]/) && a.eat(";");
                    } else {
                        h = a.eatWhile(/[\d]/) && a.eat(";");
                    }
                } else {
                    h = a.eatWhile(/[\w\.\-:]/) && a.eat(";");
                }
                return h ? "atom" : "error";
            } else {
                a.eatWhile(/[^&<]/);
                return null;
            }
        }
        function m(a, b) {
            var c = a.next();
            if (c == ">" || c == "/" && a.eat(">")) {
                b.tokenize = l;
                j = c == ">" ? "endTag" : "selfcloseTag";
                return "tag";
            } else if (c == "=") {
                j = "equals";
                return null;
            } else if (c == "<") {
                b.tokenize = l;
                b.state = t;
                b.tagName = b.tagStart = null;
                var d = b.tokenize(a, b);
                return d ? d + " error" : "error";
            } else if (/[\'\"]/.test(c)) {
                b.tokenize = n(c);
                b.stringStartCol = a.column();
                return b.tokenize(a, b);
            } else {
                a.eatWhile(/[^\s\u00a0=<>\"\']/);
                return "word";
            }
        }
        function n(a) {
            var b = function(b, c) {
                while (!b.eol()) {
                    if (b.next() == a) {
                        c.tokenize = m;
                        break;
                    }
                }
                return "string";
            };
            b.isInAttribute = true;
            return b;
        }
        function o(a, b) {
            return function(c, d) {
                while (!c.eol()) {
                    if (c.match(b)) {
                        d.tokenize = l;
                        break;
                    }
                    c.next();
                }
                return a;
            };
        }
        function p(a) {
            return function(b, c) {
                var d;
                while ((d = b.next()) != null) {
                    if (d == "<") {
                        c.tokenize = p(a + 1);
                        return c.tokenize(b, c);
                    } else if (d == ">") {
                        if (a == 1) {
                            c.tokenize = l;
                            break;
                        } else {
                            c.tokenize = p(a - 1);
                            return c.tokenize(b, c);
                        }
                    }
                }
                return "meta";
            };
        }
        function q(a, b, c) {
            this.prev = a.context;
            this.tagName = b;
            this.indent = a.indented;
            this.startOfLine = c;
            if (g.doNotIndent.hasOwnProperty(b) || a.context && a.context.noIndent) this.noIndent = true;
        }
        function r(a) {
            if (a.context) a.context = a.context.prev;
        }
        function s(a, b) {
            var c;
            while (true) {
                if (!a.context) {
                    return;
                }
                c = a.context.tagName;
                if (!g.contextGrabbers.hasOwnProperty(c) || !g.contextGrabbers[c].hasOwnProperty(b)) {
                    return;
                }
                r(a);
            }
        }
        function t(a, b, c) {
            if (a == "openTag") {
                c.tagName = i;
                c.tagStart = b.column();
                return w;
            } else if (a == "closeTag") {
                var d = false;
                if (c.context) {
                    if (c.context.tagName != i) {
                        if (g.implicitlyClosed.hasOwnProperty(c.context.tagName)) r(c);
                        d = !c.context || c.context.tagName != i;
                    }
                } else {
                    d = true;
                }
                if (d) k = "error";
                return d ? v : u;
            } else {
                return t;
            }
        }
        function u(a, b, c) {
            if (a != "endTag") {
                k = "error";
                return u;
            }
            r(c);
            return t;
        }
        function v(a, b, c) {
            k = "error";
            return u(a, b, c);
        }
        function w(a, b, c) {
            if (a == "word") {
                k = "attribute";
                return x;
            } else if (a == "endTag" || a == "selfcloseTag") {
                var d = c.tagName, e = c.tagStart;
                c.tagName = c.tagStart = null;
                if (a == "selfcloseTag" || g.autoSelfClosers.hasOwnProperty(d)) {
                    s(c, d);
                } else {
                    s(c, d);
                    c.context = new q(c, d, e == c.indented);
                }
                return t;
            }
            k = "error";
            return w;
        }
        function x(a, b, c) {
            if (a == "equals") return y;
            if (!g.allowMissing) k = "error";
            return w(a, b, c);
        }
        function y(a, b, c) {
            if (a == "string") return z;
            if (a == "word" && g.allowUnquoted) {
                k = "string";
                return w;
            }
            k = "error";
            return w(a, b, c);
        }
        function z(a, b, c) {
            if (a == "string") return z;
            return w(a, b, c);
        }
        return {
            startState: function() {
                return {
                    tokenize: l,
                    state: t,
                    indented: 0,
                    tagName: null,
                    tagStart: null,
                    context: null
                };
            },
            token: function(a, b) {
                if (!b.tagName && a.sol()) b.indented = a.indentation();
                if (a.eatSpace()) return null;
                i = j = null;
                var c = b.tokenize(a, b);
                if ((c || j) && c != "comment") {
                    k = null;
                    b.state = b.state(j || c, a, b);
                    if (k) c = k == "error" ? c + " error" : k;
                }
                return c;
            },
            indent: function(b, c, g) {
                var i = b.context;
                if (b.tokenize.isInAttribute) {
                    return b.stringStartCol + 1;
                }
                if (i && i.noIndent) return a.Pass;
                if (b.tokenize != m && b.tokenize != l) return g ? g.match(/^(\s*)/)[0].length : 0;
                if (b.tagName) {
                    if (f) return b.tagStart + b.tagName.length + 2; else return b.tagStart + d * e;
                }
                if (h && /<!\[CDATA\[/.test(c)) return 0;
                if (i && /^<\//.test(c)) i = i.prev;
                while (i && !i.startOfLine) i = i.prev;
                if (i) return i.indent + d; else return 0;
            },
            electricChars: "/",
            blockCommentStart: "<!--",
            blockCommentEnd: "-->",
            configuration: c.htmlMode ? "html" : "xml",
            helperType: c.htmlMode ? "html" : "xml"
        };
    });
    a.defineMIME("text/xml", "xml");
    a.defineMIME("application/xml", "xml");
    if (!a.mimeModes.hasOwnProperty("text/html")) a.defineMIME("text/html", {
        name: "xml",
        htmlMode: true
    });
});

if (typeof YAHOO == "undefined" || !YAHOO) {
    var YAHOO = {};
}

YAHOO.namespace = function() {
    var a = arguments, b = null, c, d, e;
    for (c = 0; c < a.length; c = c + 1) {
        e = ("" + a[c]).split(".");
        b = YAHOO;
        for (d = e[0] == "YAHOO" ? 1 : 0; d < e.length; d = d + 1) {
            b[e[d]] = b[e[d]] || {};
            b = b[e[d]];
        }
    }
    return b;
};

YAHOO.log = function(a, b, c) {
    var d = YAHOO.widget.Logger;
    if (d && d.log) {
        return d.log(a, b, c);
    } else {
        return false;
    }
};

YAHOO.register = function(a, b, c) {
    var d = YAHOO.env.modules, e, f, g, h, i;
    if (!d[a]) {
        d[a] = {
            versions: [],
            builds: []
        };
    }
    e = d[a];
    f = c.version;
    g = c.build;
    h = YAHOO.env.listeners;
    e.name = a;
    e.version = f;
    e.build = g;
    e.versions.push(f);
    e.builds.push(g);
    e.mainClass = b;
    for (i = 0; i < h.length; i = i + 1) {
        h[i](e);
    }
    if (b) {
        b.VERSION = f;
        b.BUILD = g;
    } else {
        YAHOO.log("mainClass is undefined for module " + a, "warn");
    }
};

YAHOO.env = YAHOO.env || {
    modules: [],
    listeners: []
};

YAHOO.env.getVersion = function(a) {
    return YAHOO.env.modules[a] || null;
};

YAHOO.env.parseUA = function(a) {
    var b = function(a) {
        var b = 0;
        return parseFloat(a.replace(/\./g, function() {
            return b++ == 1 ? "" : ".";
        }));
    }, c = navigator, d = {
        ie: 0,
        opera: 0,
        gecko: 0,
        webkit: 0,
        chrome: 0,
        mobile: null,
        air: 0,
        ipad: 0,
        iphone: 0,
        ipod: 0,
        ios: null,
        android: 0,
        webos: 0,
        caja: c && c.cajaVersion,
        secure: false,
        os: null
    }, e = a || navigator && navigator.userAgent, f = window && window.location, g = f && f.href, h;
    d.secure = g && g.toLowerCase().indexOf("https") === 0;
    if (e) {
        if (/windows|win32/i.test(e)) {
            d.os = "windows";
        } else {
            if (/macintosh/i.test(e)) {
                d.os = "macintosh";
            } else {
                if (/rhino/i.test(e)) {
                    d.os = "rhino";
                }
            }
        }
        if (/KHTML/.test(e)) {
            d.webkit = 1;
        }
        h = e.match(/AppleWebKit\/([^\s]*)/);
        if (h && h[1]) {
            d.webkit = b(h[1]);
            if (/ Mobile\//.test(e)) {
                d.mobile = "Apple";
                h = e.match(/OS ([^\s]*)/);
                if (h && h[1]) {
                    h = b(h[1].replace("_", "."));
                }
                d.ios = h;
                d.ipad = d.ipod = d.iphone = 0;
                h = e.match(/iPad|iPod|iPhone/);
                if (h && h[0]) {
                    d[h[0].toLowerCase()] = d.ios;
                }
            } else {
                h = e.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (h) {
                    d.mobile = h[0];
                }
                if (/webOS/.test(e)) {
                    d.mobile = "WebOS";
                    h = e.match(/webOS\/([^\s]*);/);
                    if (h && h[1]) {
                        d.webos = b(h[1]);
                    }
                }
                if (/ Android/.test(e)) {
                    d.mobile = "Android";
                    h = e.match(/Android ([^\s]*);/);
                    if (h && h[1]) {
                        d.android = b(h[1]);
                    }
                }
            }
            h = e.match(/Chrome\/([^\s]*)/);
            if (h && h[1]) {
                d.chrome = b(h[1]);
            } else {
                h = e.match(/AdobeAIR\/([^\s]*)/);
                if (h) {
                    d.air = h[0];
                }
            }
        }
        if (!d.webkit) {
            h = e.match(/Opera[\s\/]([^\s]*)/);
            if (h && h[1]) {
                d.opera = b(h[1]);
                h = e.match(/Version\/([^\s]*)/);
                if (h && h[1]) {
                    d.opera = b(h[1]);
                }
                h = e.match(/Opera Mini[^;]*/);
                if (h) {
                    d.mobile = h[0];
                }
            } else {
                h = e.match(/MSIE\s([^;]*)/);
                if (h && h[1]) {
                    d.ie = b(h[1]);
                } else {
                    h = e.match(/Gecko\/([^\s]*)/);
                    if (h) {
                        d.gecko = 1;
                        h = e.match(/rv:([^\s\)]*)/);
                        if (h && h[1]) {
                            d.gecko = b(h[1]);
                        }
                    }
                }
            }
        }
    }
    return d;
};

YAHOO.env.ua = YAHOO.env.parseUA();

(function() {
    YAHOO.namespace("util", "widget", "example");
    if ("undefined" !== typeof YAHOO_config) {
        var a = YAHOO_config.listener, b = YAHOO.env.listeners, c = true, d;
        if (a) {
            for (d = 0; d < b.length; d++) {
                if (b[d] == a) {
                    c = false;
                    break;
                }
            }
            if (c) {
                b.push(a);
            }
        }
    }
})();

YAHOO.lang = YAHOO.lang || {};

(function() {
    var a = YAHOO.lang, b = Object.prototype, c = "[object Array]", d = "[object Function]", e = "[object Object]", f = [], g = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
        "`": "&#x60;"
    }, h = [ "toString", "valueOf" ], i = {
        isArray: function(a) {
            return b.toString.apply(a) === c;
        },
        isBoolean: function(a) {
            return typeof a === "boolean";
        },
        isFunction: function(a) {
            return typeof a === "function" || b.toString.apply(a) === d;
        },
        isNull: function(a) {
            return a === null;
        },
        isNumber: function(a) {
            return typeof a === "number" && isFinite(a);
        },
        isObject: function(b) {
            return b && (typeof b === "object" || a.isFunction(b)) || false;
        },
        isString: function(a) {
            return typeof a === "string";
        },
        isUndefined: function(a) {
            return typeof a === "undefined";
        },
        _IEEnumFix: YAHOO.env.ua.ie ? function(c, d) {
            var e, f, g;
            for (e = 0; e < h.length; e = e + 1) {
                f = h[e];
                g = d[f];
                if (a.isFunction(g) && g != b[f]) {
                    c[f] = g;
                }
            }
        } : function() {},
        escapeHTML: function(a) {
            return a.replace(/[&<>"'\/`]/g, function(a) {
                return g[a];
            });
        },
        extend: function(c, d, e) {
            if (!d || !c) {
                throw new Error("extend failed, please check that " + "all dependencies are included.");
            }
            var f = function() {}, g;
            f.prototype = d.prototype;
            c.prototype = new f();
            c.prototype.constructor = c;
            c.superclass = d.prototype;
            if (d.prototype.constructor == b.constructor) {
                d.prototype.constructor = d;
            }
            if (e) {
                for (g in e) {
                    if (a.hasOwnProperty(e, g)) {
                        c.prototype[g] = e[g];
                    }
                }
                a._IEEnumFix(c.prototype, e);
            }
        },
        augmentObject: function(b, c) {
            if (!c || !b) {
                throw new Error("Absorb failed, verify dependencies.");
            }
            var d = arguments, e, f, g = d[2];
            if (g && g !== true) {
                for (e = 2; e < d.length; e = e + 1) {
                    b[d[e]] = c[d[e]];
                }
            } else {
                for (f in c) {
                    if (g || !(f in b)) {
                        b[f] = c[f];
                    }
                }
                a._IEEnumFix(b, c);
            }
            return b;
        },
        augmentProto: function(b, c) {
            if (!c || !b) {
                throw new Error("Augment failed, verify dependencies.");
            }
            var d = [ b.prototype, c.prototype ], e;
            for (e = 2; e < arguments.length; e = e + 1) {
                d.push(arguments[e]);
            }
            a.augmentObject.apply(this, d);
            return b;
        },
        dump: function(b, c) {
            var d, e, f = [], g = "{...}", h = "f(){...}", i = ", ", j = " => ";
            if (!a.isObject(b)) {
                return b + "";
            } else {
                if (b instanceof Date || "nodeType" in b && "tagName" in b) {
                    return b;
                } else {
                    if (a.isFunction(b)) {
                        return h;
                    }
                }
            }
            c = a.isNumber(c) ? c : 3;
            if (a.isArray(b)) {
                f.push("[");
                for (d = 0, e = b.length; d < e; d = d + 1) {
                    if (a.isObject(b[d])) {
                        f.push(c > 0 ? a.dump(b[d], c - 1) : g);
                    } else {
                        f.push(b[d]);
                    }
                    f.push(i);
                }
                if (f.length > 1) {
                    f.pop();
                }
                f.push("]");
            } else {
                f.push("{");
                for (d in b) {
                    if (a.hasOwnProperty(b, d)) {
                        f.push(d + j);
                        if (a.isObject(b[d])) {
                            f.push(c > 0 ? a.dump(b[d], c - 1) : g);
                        } else {
                            f.push(b[d]);
                        }
                        f.push(i);
                    }
                }
                if (f.length > 1) {
                    f.pop();
                }
                f.push("}");
            }
            return f.join("");
        },
        substitute: function(b, c, d, f) {
            var g, h, i, j, k, l, m = [], n, o = b.length, p = "dump", q = " ", r = "{", s = "}", t, u;
            for (;;) {
                g = b.lastIndexOf(r, o);
                if (g < 0) {
                    break;
                }
                h = b.indexOf(s, g);
                if (g + 1 > h) {
                    break;
                }
                n = b.substring(g + 1, h);
                j = n;
                l = null;
                i = j.indexOf(q);
                if (i > -1) {
                    l = j.substring(i + 1);
                    j = j.substring(0, i);
                }
                k = c[j];
                if (d) {
                    k = d(j, k, l);
                }
                if (a.isObject(k)) {
                    if (a.isArray(k)) {
                        k = a.dump(k, parseInt(l, 10));
                    } else {
                        l = l || "";
                        t = l.indexOf(p);
                        if (t > -1) {
                            l = l.substring(4);
                        }
                        u = k.toString();
                        if (u === e || t > -1) {
                            k = a.dump(k, parseInt(l, 10));
                        } else {
                            k = u;
                        }
                    }
                } else {
                    if (!a.isString(k) && !a.isNumber(k)) {
                        k = "~-" + m.length + "-~";
                        m[m.length] = n;
                    }
                }
                b = b.substring(0, g) + k + b.substring(h + 1);
                if (f === false) {
                    o = g - 1;
                }
            }
            for (g = m.length - 1; g >= 0; g = g - 1) {
                b = b.replace(new RegExp("~-" + g + "-~"), "{" + m[g] + "}", "g");
            }
            return b;
        },
        trim: function(a) {
            try {
                return a.replace(/^\s+|\s+$/g, "");
            } catch (b) {
                return a;
            }
        },
        merge: function() {
            var b = {}, c = arguments, d = c.length, e;
            for (e = 0; e < d; e = e + 1) {
                a.augmentObject(b, c[e], true);
            }
            return b;
        },
        later: function(b, c, d, e, g) {
            b = b || 0;
            c = c || {};
            var h = d, i = e, j, k;
            if (a.isString(d)) {
                h = c[d];
            }
            if (!h) {
                throw new TypeError("method undefined");
            }
            if (!a.isUndefined(e) && !a.isArray(i)) {
                i = [ e ];
            }
            j = function() {
                h.apply(c, i || f);
            };
            k = g ? setInterval(j, b) : setTimeout(j, b);
            return {
                interval: g,
                cancel: function() {
                    if (this.interval) {
                        clearInterval(k);
                    } else {
                        clearTimeout(k);
                    }
                }
            };
        },
        isValue: function(b) {
            return a.isObject(b) || a.isString(b) || a.isNumber(b) || a.isBoolean(b);
        }
    };
    a.hasOwnProperty = b.hasOwnProperty ? function(a, b) {
        return a && a.hasOwnProperty && a.hasOwnProperty(b);
    } : function(b, c) {
        return !a.isUndefined(b[c]) && b.constructor.prototype[c] !== b[c];
    };
    i.augmentObject(a, i, true);
    YAHOO.util.Lang = a;
    a.augment = a.augmentProto;
    YAHOO.augment = a.augmentProto;
    YAHOO.extend = a.extend;
})();

YAHOO.register("yahoo", YAHOO, {
    version: "2.9.0",
    build: "2800"
});

var CryptoJS = CryptoJS || function(a, b) {
    var c = {};
    var d = c.lib = {};
    var e = d.Base = function() {
        function a() {}
        return {
            extend: function(b) {
                a.prototype = this;
                var c = new a();
                if (b) {
                    c.mixIn(b);
                }
                if (!c.hasOwnProperty("init")) {
                    c.init = function() {
                        c.$super.init.apply(this, arguments);
                    };
                }
                c.init.prototype = c;
                c.$super = this;
                return c;
            },
            create: function() {
                var a = this.extend();
                a.init.apply(a, arguments);
                return a;
            },
            init: function() {},
            mixIn: function(a) {
                for (var b in a) {
                    if (a.hasOwnProperty(b)) {
                        this[b] = a[b];
                    }
                }
                if (a.hasOwnProperty("toString")) {
                    this.toString = a.toString;
                }
            },
            clone: function() {
                return this.init.prototype.extend(this);
            }
        };
    }();
    var f = d.WordArray = e.extend({
        init: function(a, c) {
            a = this.words = a || [];
            if (c != b) {
                this.sigBytes = c;
            } else {
                this.sigBytes = a.length * 4;
            }
        },
        toString: function(a) {
            return (a || h).stringify(this);
        },
        concat: function(a) {
            var b = this.words;
            var c = a.words;
            var d = this.sigBytes;
            var e = a.sigBytes;
            this.clamp();
            if (d % 4) {
                for (var f = 0; f < e; f++) {
                    var g = c[f >>> 2] >>> 24 - f % 4 * 8 & 255;
                    b[d + f >>> 2] |= g << 24 - (d + f) % 4 * 8;
                }
            } else {
                for (var f = 0; f < e; f += 4) {
                    b[d + f >>> 2] = c[f >>> 2];
                }
            }
            this.sigBytes += e;
            return this;
        },
        clamp: function() {
            var b = this.words;
            var c = this.sigBytes;
            b[c >>> 2] &= 4294967295 << 32 - c % 4 * 8;
            b.length = a.ceil(c / 4);
        },
        clone: function() {
            var a = e.clone.call(this);
            a.words = this.words.slice(0);
            return a;
        },
        random: function(b) {
            var c = [];
            for (var d = 0; d < b; d += 4) {
                c.push(a.random() * 4294967296 | 0);
            }
            return new f.init(c, b);
        }
    });
    var g = c.enc = {};
    var h = g.Hex = {
        stringify: function(a) {
            var b = a.words;
            var c = a.sigBytes;
            var d = [];
            for (var e = 0; e < c; e++) {
                var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
                d.push((f >>> 4).toString(16));
                d.push((f & 15).toString(16));
            }
            return d.join("");
        },
        parse: function(a) {
            var b = a.length;
            var c = [];
            for (var d = 0; d < b; d += 2) {
                c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
            }
            return new f.init(c, b / 2);
        }
    };
    var i = g.Latin1 = {
        stringify: function(a) {
            var b = a.words;
            var c = a.sigBytes;
            var d = [];
            for (var e = 0; e < c; e++) {
                var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;
                d.push(String.fromCharCode(f));
            }
            return d.join("");
        },
        parse: function(a) {
            var b = a.length;
            var c = [];
            for (var d = 0; d < b; d++) {
                c[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - d % 4 * 8;
            }
            return new f.init(c, b);
        }
    };
    var j = g.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(i.stringify(a)));
            } catch (b) {
                throw new Error("Malformed UTF-8 data");
            }
        },
        parse: function(a) {
            return i.parse(unescape(encodeURIComponent(a)));
        }
    };
    var k = d.BufferedBlockAlgorithm = e.extend({
        reset: function() {
            this._data = new f.init();
            this._nDataBytes = 0;
        },
        _append: function(a) {
            if (typeof a == "string") {
                a = j.parse(a);
            }
            this._data.concat(a);
            this._nDataBytes += a.sigBytes;
        },
        _process: function(b) {
            var c = this._data;
            var d = c.words;
            var e = c.sigBytes;
            var g = this.blockSize;
            var h = g * 4;
            var i = e / h;
            if (b) {
                i = a.ceil(i);
            } else {
                i = a.max((i | 0) - this._minBufferSize, 0);
            }
            var j = i * g;
            var k = a.min(j * 4, e);
            if (j) {
                for (var l = 0; l < j; l += g) {
                    this._doProcessBlock(d, l);
                }
                var m = d.splice(0, j);
                c.sigBytes -= k;
            }
            return new f.init(m, k);
        },
        clone: function() {
            var a = e.clone.call(this);
            a._data = this._data.clone();
            return a;
        },
        _minBufferSize: 0
    });
    var l = d.Hasher = k.extend({
        cfg: e.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
            this.reset();
        },
        reset: function() {
            k.reset.call(this);
            this._doReset();
        },
        update: function(a) {
            this._append(a);
            this._process();
            return this;
        },
        finalize: function(a) {
            if (a) {
                this._append(a);
            }
            var b = this._doFinalize();
            return b;
        },
        blockSize: 512 / 32,
        _createHelper: function(a) {
            return function(b, c) {
                return new a.init(c).finalize(b);
            };
        },
        _createHmacHelper: function(a) {
            return function(b, c) {
                return new m.HMAC.init(a, c).finalize(b);
            };
        }
    });
    var m = c.algo = {};
    return c;
}(Math);

(function(a) {
    var b = CryptoJS, c = b.lib, d = c.Base, e = c.WordArray, b = b.x64 = {};
    b.Word = d.extend({
        init: function(a, b) {
            this.high = a;
            this.low = b;
        }
    });
    b.WordArray = d.extend({
        init: function(b, c) {
            b = this.words = b || [];
            this.sigBytes = c != a ? c : 8 * b.length;
        },
        toX32: function() {
            for (var a = this.words, b = a.length, c = [], d = 0; d < b; d++) {
                var f = a[d];
                c.push(f.high);
                c.push(f.low);
            }
            return e.create(c, this.sigBytes);
        },
        clone: function() {
            for (var a = d.clone.call(this), b = a.words = this.words.slice(0), c = b.length, e = 0; e < c; e++) b[e] = b[e].clone();
            return a;
        }
    });
})();

(function() {
    var a = CryptoJS, b = a.enc.Utf8;
    a.algo.HMAC = a.lib.Base.extend({
        init: function(a, c) {
            a = this._hasher = new a.init();
            "string" == typeof c && (c = b.parse(c));
            var d = a.blockSize, e = 4 * d;
            c.sigBytes > e && (c = a.finalize(c));
            c.clamp();
            for (var f = this._oKey = c.clone(), g = this._iKey = c.clone(), h = f.words, i = g.words, j = 0; j < d; j++) h[j] ^= 1549556828, 
            i[j] ^= 909522486;
            f.sigBytes = g.sigBytes = e;
            this.reset();
        },
        reset: function() {
            var a = this._hasher;
            a.reset();
            a.update(this._iKey);
        },
        update: function(a) {
            this._hasher.update(a);
            return this;
        },
        finalize: function(a) {
            var b = this._hasher;
            a = b.finalize(a);
            b.reset();
            return b.finalize(this._oKey.clone().concat(a));
        }
    });
})();

(function(a) {
    for (var b = CryptoJS, c = b.lib, d = c.WordArray, e = c.Hasher, c = b.algo, f = [], g = [], h = function(a) {
        return 4294967296 * (a - (a | 0)) | 0;
    }, i = 2, j = 0; 64 > j; ) {
        var k;
        a: {
            k = i;
            for (var l = a.sqrt(k), m = 2; m <= l; m++) if (!(k % m)) {
                k = !1;
                break a;
            }
            k = !0;
        }
        k && (8 > j && (f[j] = h(a.pow(i, .5))), g[j] = h(a.pow(i, 1 / 3)), j++);
        i++;
    }
    var n = [], c = c.SHA256 = e.extend({
        _doReset: function() {
            this._hash = new d.init(f.slice(0));
        },
        _doProcessBlock: function(a, b) {
            for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = c[5], k = c[6], l = c[7], m = 0; 64 > m; m++) {
                if (16 > m) n[m] = a[b + m] | 0; else {
                    var o = n[m - 15], p = n[m - 2];
                    n[m] = ((o << 25 | o >>> 7) ^ (o << 14 | o >>> 18) ^ o >>> 3) + n[m - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[m - 16];
                }
                o = l + ((i << 26 | i >>> 6) ^ (i << 21 | i >>> 11) ^ (i << 7 | i >>> 25)) + (i & j ^ ~i & k) + g[m] + n[m];
                p = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f);
                l = k;
                k = j;
                j = i;
                i = h + o | 0;
                h = f;
                f = e;
                e = d;
                d = o + p | 0;
            }
            c[0] = c[0] + d | 0;
            c[1] = c[1] + e | 0;
            c[2] = c[2] + f | 0;
            c[3] = c[3] + h | 0;
            c[4] = c[4] + i | 0;
            c[5] = c[5] + j | 0;
            c[6] = c[6] + k | 0;
            c[7] = c[7] + l | 0;
        },
        _doFinalize: function() {
            var b = this._data, c = b.words, d = 8 * this._nDataBytes, e = 8 * b.sigBytes;
            c[e >>> 5] |= 128 << 24 - e % 32;
            c[(e + 64 >>> 9 << 4) + 14] = a.floor(d / 4294967296);
            c[(e + 64 >>> 9 << 4) + 15] = d;
            b.sigBytes = 4 * c.length;
            this._process();
            return this._hash;
        },
        clone: function() {
            var a = e.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        }
    });
    b.SHA256 = e._createHelper(c);
    b.HmacSHA256 = e._createHmacHelper(c);
})(Math);

(function() {
    var a = CryptoJS, b = a.lib.WordArray, c = a.algo, d = c.SHA256, c = c.SHA224 = d.extend({
        _doReset: function() {
            this._hash = new b.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
        },
        _doFinalize: function() {
            var a = d._doFinalize.call(this);
            a.sigBytes -= 4;
            return a;
        }
    });
    a.SHA224 = d._createHelper(c);
    a.HmacSHA224 = d._createHmacHelper(c);
})();

(function() {
    function a() {
        return e.create.apply(e, arguments);
    }
    for (var b = CryptoJS, c = b.lib.Hasher, d = b.x64, e = d.Word, f = d.WordArray, d = b.algo, g = [ a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317), a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291, 2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899), a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470, 3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591) ], h = [], i = 0; 80 > i; i++) h[i] = a();
    d = d.SHA512 = c.extend({
        _doReset: function() {
            this._hash = new f.init([ new e.init(1779033703, 4089235720), new e.init(3144134277, 2227873595), new e.init(1013904242, 4271175723), new e.init(2773480762, 1595750129), new e.init(1359893119, 2917565137), new e.init(2600822924, 725511199), new e.init(528734635, 4215389547), new e.init(1541459225, 327033209) ]);
        },
        _doProcessBlock: function(a, b) {
            for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], i = c[3], j = c[4], k = c[5], l = c[6], c = c[7], m = d.high, n = d.low, o = e.high, p = e.low, q = f.high, r = f.low, s = i.high, t = i.low, u = j.high, v = j.low, w = k.high, x = k.low, y = l.high, z = l.low, A = c.high, B = c.low, C = m, D = n, E = o, F = p, G = q, H = r, I = s, J = t, K = u, L = v, M = w, N = x, O = y, P = z, Q = A, R = B, S = 0; 80 > S; S++) {
                var T = h[S];
                if (16 > S) var U = T.high = a[b + 2 * S] | 0, V = T.low = a[b + 2 * S + 1] | 0; else {
                    var U = h[S - 15], V = U.high, W = U.low, U = (V >>> 1 | W << 31) ^ (V >>> 8 | W << 24) ^ V >>> 7, W = (W >>> 1 | V << 31) ^ (W >>> 8 | V << 24) ^ (W >>> 7 | V << 25), X = h[S - 2], V = X.high, Y = X.low, X = (V >>> 19 | Y << 13) ^ (V << 3 | Y >>> 29) ^ V >>> 6, Y = (Y >>> 19 | V << 13) ^ (Y << 3 | V >>> 29) ^ (Y >>> 6 | V << 26), V = h[S - 7], Z = V.high, $ = h[S - 16], _ = $.high, $ = $.low, V = W + V.low, U = U + Z + (V >>> 0 < W >>> 0 ? 1 : 0), V = V + Y, U = U + X + (V >>> 0 < Y >>> 0 ? 1 : 0), V = V + $, U = U + _ + (V >>> 0 < $ >>> 0 ? 1 : 0);
                    T.high = U;
                    T.low = V;
                }
                var Z = K & M ^ ~K & O, $ = L & N ^ ~L & P, T = C & E ^ C & G ^ E & G, ab = D & F ^ D & H ^ F & H, W = (C >>> 28 | D << 4) ^ (C << 30 | D >>> 2) ^ (C << 25 | D >>> 7), X = (D >>> 28 | C << 4) ^ (D << 30 | C >>> 2) ^ (D << 25 | C >>> 7), Y = g[S], bb = Y.high, cb = Y.low, Y = R + ((L >>> 14 | K << 18) ^ (L >>> 18 | K << 14) ^ (L << 23 | K >>> 9)), _ = Q + ((K >>> 14 | L << 18) ^ (K >>> 18 | L << 14) ^ (K << 23 | L >>> 9)) + (Y >>> 0 < R >>> 0 ? 1 : 0), Y = Y + $, _ = _ + Z + (Y >>> 0 < $ >>> 0 ? 1 : 0), Y = Y + cb, _ = _ + bb + (Y >>> 0 < cb >>> 0 ? 1 : 0), Y = Y + V, _ = _ + U + (Y >>> 0 < V >>> 0 ? 1 : 0), V = X + ab, T = W + T + (V >>> 0 < X >>> 0 ? 1 : 0), Q = O, R = P, O = M, P = N, M = K, N = L, L = J + Y | 0, K = I + _ + (L >>> 0 < J >>> 0 ? 1 : 0) | 0, I = G, J = H, G = E, H = F, E = C, F = D, D = Y + V | 0, C = _ + T + (D >>> 0 < Y >>> 0 ? 1 : 0) | 0;
            }
            n = d.low = n + D;
            d.high = m + C + (n >>> 0 < D >>> 0 ? 1 : 0);
            p = e.low = p + F;
            e.high = o + E + (p >>> 0 < F >>> 0 ? 1 : 0);
            r = f.low = r + H;
            f.high = q + G + (r >>> 0 < H >>> 0 ? 1 : 0);
            t = i.low = t + J;
            i.high = s + I + (t >>> 0 < J >>> 0 ? 1 : 0);
            v = j.low = v + L;
            j.high = u + K + (v >>> 0 < L >>> 0 ? 1 : 0);
            x = k.low = x + N;
            k.high = w + M + (x >>> 0 < N >>> 0 ? 1 : 0);
            z = l.low = z + P;
            l.high = y + O + (z >>> 0 < P >>> 0 ? 1 : 0);
            B = c.low = B + R;
            c.high = A + Q + (B >>> 0 < R >>> 0 ? 1 : 0);
        },
        _doFinalize: function() {
            var a = this._data, b = a.words, c = 8 * this._nDataBytes, d = 8 * a.sigBytes;
            b[d >>> 5] |= 128 << 24 - d % 32;
            b[(d + 128 >>> 10 << 5) + 30] = Math.floor(c / 4294967296);
            b[(d + 128 >>> 10 << 5) + 31] = c;
            a.sigBytes = 4 * b.length;
            this._process();
            return this._hash.toX32();
        },
        clone: function() {
            var a = c.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        },
        blockSize: 32
    });
    b.SHA512 = c._createHelper(d);
    b.HmacSHA512 = c._createHmacHelper(d);
})();

(function() {
    var a = CryptoJS, b = a.x64, c = b.Word, d = b.WordArray, b = a.algo, e = b.SHA512, b = b.SHA384 = e.extend({
        _doReset: function() {
            this._hash = new d.init([ new c.init(3418070365, 3238371032), new c.init(1654270250, 914150663), new c.init(2438529370, 812702999), new c.init(355462360, 4144912697), new c.init(1731405415, 4290775857), new c.init(2394180231, 1750603025), new c.init(3675008525, 1694076839), new c.init(1203062813, 3204075428) ]);
        },
        _doFinalize: function() {
            var a = e._doFinalize.call(this);
            a.sigBytes -= 16;
            return a;
        }
    });
    a.SHA384 = e._createHelper(b);
    a.HmacSHA384 = e._createHmacHelper(b);
})();

(function(a) {
    function b(a, b, c, d, e, f, g) {
        a = a + (b & c | ~b & d) + e + g;
        return (a << f | a >>> 32 - f) + b;
    }
    function c(a, b, c, d, e, f, g) {
        a = a + (b & d | c & ~d) + e + g;
        return (a << f | a >>> 32 - f) + b;
    }
    function d(a, b, c, d, e, f, g) {
        a = a + (b ^ c ^ d) + e + g;
        return (a << f | a >>> 32 - f) + b;
    }
    function e(a, b, c, d, e, f, g) {
        a = a + (c ^ (b | ~d)) + e + g;
        return (a << f | a >>> 32 - f) + b;
    }
    for (var f = CryptoJS, g = f.lib, h = g.WordArray, i = g.Hasher, g = f.algo, j = [], k = 0; 64 > k; k++) j[k] = 4294967296 * a.abs(a.sin(k + 1)) | 0;
    g = g.MD5 = i.extend({
        _doReset: function() {
            this._hash = new h.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function(a, f) {
            for (var g = 0; 16 > g; g++) {
                var h = f + g, i = a[h];
                a[h] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360;
            }
            var g = this._hash.words, h = a[f + 0], i = a[f + 1], k = a[f + 2], l = a[f + 3], m = a[f + 4], n = a[f + 5], o = a[f + 6], p = a[f + 7], q = a[f + 8], r = a[f + 9], s = a[f + 10], t = a[f + 11], u = a[f + 12], v = a[f + 13], w = a[f + 14], x = a[f + 15], y = g[0], z = g[1], A = g[2], B = g[3], y = b(y, z, A, B, h, 7, j[0]), B = b(B, y, z, A, i, 12, j[1]), A = b(A, B, y, z, k, 17, j[2]), z = b(z, A, B, y, l, 22, j[3]), y = b(y, z, A, B, m, 7, j[4]), B = b(B, y, z, A, n, 12, j[5]), A = b(A, B, y, z, o, 17, j[6]), z = b(z, A, B, y, p, 22, j[7]), y = b(y, z, A, B, q, 7, j[8]), B = b(B, y, z, A, r, 12, j[9]), A = b(A, B, y, z, s, 17, j[10]), z = b(z, A, B, y, t, 22, j[11]), y = b(y, z, A, B, u, 7, j[12]), B = b(B, y, z, A, v, 12, j[13]), A = b(A, B, y, z, w, 17, j[14]), z = b(z, A, B, y, x, 22, j[15]), y = c(y, z, A, B, i, 5, j[16]), B = c(B, y, z, A, o, 9, j[17]), A = c(A, B, y, z, t, 14, j[18]), z = c(z, A, B, y, h, 20, j[19]), y = c(y, z, A, B, n, 5, j[20]), B = c(B, y, z, A, s, 9, j[21]), A = c(A, B, y, z, x, 14, j[22]), z = c(z, A, B, y, m, 20, j[23]), y = c(y, z, A, B, r, 5, j[24]), B = c(B, y, z, A, w, 9, j[25]), A = c(A, B, y, z, l, 14, j[26]), z = c(z, A, B, y, q, 20, j[27]), y = c(y, z, A, B, v, 5, j[28]), B = c(B, y, z, A, k, 9, j[29]), A = c(A, B, y, z, p, 14, j[30]), z = c(z, A, B, y, u, 20, j[31]), y = d(y, z, A, B, n, 4, j[32]), B = d(B, y, z, A, q, 11, j[33]), A = d(A, B, y, z, t, 16, j[34]), z = d(z, A, B, y, w, 23, j[35]), y = d(y, z, A, B, i, 4, j[36]), B = d(B, y, z, A, m, 11, j[37]), A = d(A, B, y, z, p, 16, j[38]), z = d(z, A, B, y, s, 23, j[39]), y = d(y, z, A, B, v, 4, j[40]), B = d(B, y, z, A, h, 11, j[41]), A = d(A, B, y, z, l, 16, j[42]), z = d(z, A, B, y, o, 23, j[43]), y = d(y, z, A, B, r, 4, j[44]), B = d(B, y, z, A, u, 11, j[45]), A = d(A, B, y, z, x, 16, j[46]), z = d(z, A, B, y, k, 23, j[47]), y = e(y, z, A, B, h, 6, j[48]), B = e(B, y, z, A, p, 10, j[49]), A = e(A, B, y, z, w, 15, j[50]), z = e(z, A, B, y, n, 21, j[51]), y = e(y, z, A, B, u, 6, j[52]), B = e(B, y, z, A, l, 10, j[53]), A = e(A, B, y, z, s, 15, j[54]), z = e(z, A, B, y, i, 21, j[55]), y = e(y, z, A, B, q, 6, j[56]), B = e(B, y, z, A, x, 10, j[57]), A = e(A, B, y, z, o, 15, j[58]), z = e(z, A, B, y, v, 21, j[59]), y = e(y, z, A, B, m, 6, j[60]), B = e(B, y, z, A, t, 10, j[61]), A = e(A, B, y, z, k, 15, j[62]), z = e(z, A, B, y, r, 21, j[63]);
            g[0] = g[0] + y | 0;
            g[1] = g[1] + z | 0;
            g[2] = g[2] + A | 0;
            g[3] = g[3] + B | 0;
        },
        _doFinalize: function() {
            var b = this._data, c = b.words, d = 8 * this._nDataBytes, e = 8 * b.sigBytes;
            c[e >>> 5] |= 128 << 24 - e % 32;
            var f = a.floor(d / 4294967296);
            c[(e + 64 >>> 9 << 4) + 15] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
            c[(e + 64 >>> 9 << 4) + 14] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360;
            b.sigBytes = 4 * (c.length + 1);
            this._process();
            b = this._hash;
            c = b.words;
            for (d = 0; 4 > d; d++) e = c[d], c[d] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
            return b;
        },
        clone: function() {
            var a = i.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        }
    });
    f.MD5 = i._createHelper(g);
    f.HmacMD5 = i._createHmacHelper(g);
})(Math);

(function() {
    var a = CryptoJS, b = a.lib.WordArray;
    a.enc.Base64 = {
        stringify: function(a) {
            var b = a.words, c = a.sigBytes, d = this._map;
            a.clamp();
            a = [];
            for (var e = 0; e < c; e += 3) for (var f = (b[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 16 | (b[e + 1 >>> 2] >>> 24 - 8 * ((e + 1) % 4) & 255) << 8 | b[e + 2 >>> 2] >>> 24 - 8 * ((e + 2) % 4) & 255, g = 0; 4 > g && e + .75 * g < c; g++) a.push(d.charAt(f >>> 6 * (3 - g) & 63));
            if (b = d.charAt(64)) for (;a.length % 4; ) a.push(b);
            return a.join("");
        },
        parse: function(a) {
            var c = a.length, d = this._map, e = d.charAt(64);
            e && (e = a.indexOf(e), -1 != e && (c = e));
            for (var e = [], f = 0, g = 0; g < c; g++) if (g % 4) {
                var h = d.indexOf(a.charAt(g - 1)) << 2 * (g % 4), i = d.indexOf(a.charAt(g)) >>> 6 - 2 * (g % 4);
                e[f >>> 2] |= (h | i) << 24 - 8 * (f % 4);
                f++;
            }
            return b.create(e, f);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
})();

CryptoJS.lib.Cipher || function(a) {
    var b = CryptoJS, c = b.lib, d = c.Base, e = c.WordArray, f = c.BufferedBlockAlgorithm, g = b.enc.Base64, h = b.algo.EvpKDF, i = c.Cipher = f.extend({
        cfg: d.extend(),
        createEncryptor: function(a, b) {
            return this.create(this._ENC_XFORM_MODE, a, b);
        },
        createDecryptor: function(a, b) {
            return this.create(this._DEC_XFORM_MODE, a, b);
        },
        init: function(a, b, c) {
            this.cfg = this.cfg.extend(c);
            this._xformMode = a;
            this._key = b;
            this.reset();
        },
        reset: function() {
            f.reset.call(this);
            this._doReset();
        },
        process: function(a) {
            this._append(a);
            return this._process();
        },
        finalize: function(a) {
            a && this._append(a);
            return this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function(a) {
            return {
                encrypt: function(b, c, d) {
                    return ("string" == typeof c ? o : n).encrypt(a, b, c, d);
                },
                decrypt: function(b, c, d) {
                    return ("string" == typeof c ? o : n).decrypt(a, b, c, d);
                }
            };
        }
    });
    c.StreamCipher = i.extend({
        _doFinalize: function() {
            return this._process(!0);
        },
        blockSize: 1
    });
    var j = b.mode = {}, k = function(b, c, d) {
        var e = this._iv;
        e ? this._iv = a : e = this._prevBlock;
        for (var f = 0; f < d; f++) b[c + f] ^= e[f];
    }, l = (c.BlockCipherMode = d.extend({
        createEncryptor: function(a, b) {
            return this.Encryptor.create(a, b);
        },
        createDecryptor: function(a, b) {
            return this.Decryptor.create(a, b);
        },
        init: function(a, b) {
            this._cipher = a;
            this._iv = b;
        }
    })).extend();
    l.Encryptor = l.extend({
        processBlock: function(a, b) {
            var c = this._cipher, d = c.blockSize;
            k.call(this, a, b, d);
            c.encryptBlock(a, b);
            this._prevBlock = a.slice(b, b + d);
        }
    });
    l.Decryptor = l.extend({
        processBlock: function(a, b) {
            var c = this._cipher, d = c.blockSize, e = a.slice(b, b + d);
            c.decryptBlock(a, b);
            k.call(this, a, b, d);
            this._prevBlock = e;
        }
    });
    j = j.CBC = l;
    l = (b.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, f = [], g = 0; g < c; g += 4) f.push(d);
            c = e.create(f, c);
            a.concat(c);
        },
        unpad: function(a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255;
        }
    };
    c.BlockCipher = i.extend({
        cfg: i.cfg.extend({
            mode: j,
            padding: l
        }),
        reset: function() {
            i.reset.call(this);
            var a = this.cfg, b = a.iv, a = a.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, 
            this._minBufferSize = 1;
            this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function(a, b) {
            this._mode.processBlock(a, b);
        },
        _doFinalize: function() {
            var a = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(!0);
            } else b = this._process(!0), a.unpad(b);
            return b;
        },
        blockSize: 4
    });
    var m = c.CipherParams = d.extend({
        init: function(a) {
            this.mixIn(a);
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this);
        }
    }), j = (b.format = {}).OpenSSL = {
        stringify: function(a) {
            var b = a.ciphertext;
            a = a.salt;
            return (a ? e.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(g);
        },
        parse: function(a) {
            a = g.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = e.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16;
            }
            return m.create({
                ciphertext: a,
                salt: c
            });
        }
    }, n = c.SerializableCipher = d.extend({
        cfg: d.extend({
            format: j
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            var e = a.createEncryptor(c, d);
            b = e.finalize(b);
            e = e.cfg;
            return m.create({
                ciphertext: b,
                key: c,
                iv: e.iv,
                algorithm: a,
                mode: e.mode,
                padding: e.padding,
                blockSize: a.blockSize,
                formatter: d.format
            });
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            return a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function(a, b) {
            return "string" == typeof a ? b.parse(a, this) : a;
        }
    }), b = (b.kdf = {}).OpenSSL = {
        execute: function(a, b, c, d) {
            d || (d = e.random(8));
            a = h.create({
                keySize: b + c
            }).compute(a, d);
            c = e.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return m.create({
                key: a,
                iv: c,
                salt: d
            });
        }
    }, o = c.PasswordBasedCipher = n.extend({
        cfg: n.cfg.extend({
            kdf: b
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            c = d.kdf.execute(c, a.keySize, a.ivSize);
            d.iv = c.iv;
            a = n.encrypt.call(this, a, b, c.key, d);
            a.mixIn(c);
            return a;
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
            d.iv = c.iv;
            return n.decrypt.call(this, a, b, c.key, d);
        }
    });
}();

(function() {
    for (var a = CryptoJS, b = a.lib.BlockCipher, c = a.algo, d = [], e = [], f = [], g = [], h = [], i = [], j = [], k = [], l = [], m = [], n = [], o = 0; 256 > o; o++) n[o] = 128 > o ? o << 1 : o << 1 ^ 283;
    for (var p = 0, q = 0, o = 0; 256 > o; o++) {
        var r = q ^ q << 1 ^ q << 2 ^ q << 3 ^ q << 4, r = r >>> 8 ^ r & 255 ^ 99;
        d[p] = r;
        e[r] = p;
        var s = n[p], t = n[s], u = n[t], v = 257 * n[r] ^ 16843008 * r;
        f[p] = v << 24 | v >>> 8;
        g[p] = v << 16 | v >>> 16;
        h[p] = v << 8 | v >>> 24;
        i[p] = v;
        v = 16843009 * u ^ 65537 * t ^ 257 * s ^ 16843008 * p;
        j[r] = v << 24 | v >>> 8;
        k[r] = v << 16 | v >>> 16;
        l[r] = v << 8 | v >>> 24;
        m[r] = v;
        p ? (p = s ^ n[n[n[u ^ s]]], q ^= n[n[q]]) : p = q = 1;
    }
    var w = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], c = c.AES = b.extend({
        _doReset: function() {
            for (var a = this._key, b = a.words, c = a.sigBytes / 4, a = 4 * ((this._nRounds = c + 6) + 1), e = this._keySchedule = [], f = 0; f < a; f++) if (f < c) e[f] = b[f]; else {
                var g = e[f - 1];
                f % c ? 6 < c && 4 == f % c && (g = d[g >>> 24] << 24 | d[g >>> 16 & 255] << 16 | d[g >>> 8 & 255] << 8 | d[g & 255]) : (g = g << 8 | g >>> 24, 
                g = d[g >>> 24] << 24 | d[g >>> 16 & 255] << 16 | d[g >>> 8 & 255] << 8 | d[g & 255], 
                g ^= w[f / c | 0] << 24);
                e[f] = e[f - c] ^ g;
            }
            b = this._invKeySchedule = [];
            for (c = 0; c < a; c++) f = a - c, g = c % 4 ? e[f] : e[f - 4], b[c] = 4 > c || 4 >= f ? g : j[d[g >>> 24]] ^ k[d[g >>> 16 & 255]] ^ l[d[g >>> 8 & 255]] ^ m[d[g & 255]];
        },
        encryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._keySchedule, f, g, h, i, d);
        },
        decryptBlock: function(a, b) {
            var c = a[b + 1];
            a[b + 1] = a[b + 3];
            a[b + 3] = c;
            this._doCryptBlock(a, b, this._invKeySchedule, j, k, l, m, e);
            c = a[b + 1];
            a[b + 1] = a[b + 3];
            a[b + 3] = c;
        },
        _doCryptBlock: function(a, b, c, d, e, f, g, h) {
            for (var i = this._nRounds, j = a[b] ^ c[0], k = a[b + 1] ^ c[1], l = a[b + 2] ^ c[2], m = a[b + 3] ^ c[3], n = 4, o = 1; o < i; o++) var p = d[j >>> 24] ^ e[k >>> 16 & 255] ^ f[l >>> 8 & 255] ^ g[m & 255] ^ c[n++], q = d[k >>> 24] ^ e[l >>> 16 & 255] ^ f[m >>> 8 & 255] ^ g[j & 255] ^ c[n++], r = d[l >>> 24] ^ e[m >>> 16 & 255] ^ f[j >>> 8 & 255] ^ g[k & 255] ^ c[n++], m = d[m >>> 24] ^ e[j >>> 16 & 255] ^ f[k >>> 8 & 255] ^ g[l & 255] ^ c[n++], j = p, k = q, l = r;
            p = (h[j >>> 24] << 24 | h[k >>> 16 & 255] << 16 | h[l >>> 8 & 255] << 8 | h[m & 255]) ^ c[n++];
            q = (h[k >>> 24] << 24 | h[l >>> 16 & 255] << 16 | h[m >>> 8 & 255] << 8 | h[j & 255]) ^ c[n++];
            r = (h[l >>> 24] << 24 | h[m >>> 16 & 255] << 16 | h[j >>> 8 & 255] << 8 | h[k & 255]) ^ c[n++];
            m = (h[m >>> 24] << 24 | h[j >>> 16 & 255] << 16 | h[k >>> 8 & 255] << 8 | h[l & 255]) ^ c[n++];
            a[b] = p;
            a[b + 1] = q;
            a[b + 2] = r;
            a[b + 3] = m;
        },
        keySize: 8
    });
    a.AES = b._createHelper(c);
})();

(function() {
    function a(a, b) {
        var c = (this._lBlock >>> a ^ this._rBlock) & b;
        this._rBlock ^= c;
        this._lBlock ^= c << a;
    }
    function b(a, b) {
        var c = (this._rBlock >>> a ^ this._lBlock) & b;
        this._lBlock ^= c;
        this._rBlock ^= c << a;
    }
    var c = CryptoJS, d = c.lib, e = d.WordArray, d = d.BlockCipher, f = c.algo, g = [ 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ], h = [ 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ], i = [ 1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 ], j = [ {
        "0": 8421888,
        268435456: 32768,
        536870912: 8421378,
        805306368: 2,
        1073741824: 512,
        1342177280: 8421890,
        1610612736: 8389122,
        1879048192: 8388608,
        2147483648: 514,
        2415919104: 8389120,
        2684354560: 33280,
        2952790016: 8421376,
        3221225472: 32770,
        3489660928: 8388610,
        3758096384: 0,
        4026531840: 33282,
        134217728: 0,
        402653184: 8421890,
        671088640: 33282,
        939524096: 32768,
        1207959552: 8421888,
        1476395008: 512,
        1744830464: 8421378,
        2013265920: 2,
        2281701376: 8389120,
        2550136832: 33280,
        2818572288: 8421376,
        3087007744: 8389122,
        3355443200: 8388610,
        3623878656: 32770,
        3892314112: 514,
        4160749568: 8388608,
        1: 32768,
        268435457: 2,
        536870913: 8421888,
        805306369: 8388608,
        1073741825: 8421378,
        1342177281: 33280,
        1610612737: 512,
        1879048193: 8389122,
        2147483649: 8421890,
        2415919105: 8421376,
        2684354561: 8388610,
        2952790017: 33282,
        3221225473: 514,
        3489660929: 8389120,
        3758096385: 32770,
        4026531841: 0,
        134217729: 8421890,
        402653185: 8421376,
        671088641: 8388608,
        939524097: 512,
        1207959553: 32768,
        1476395009: 8388610,
        1744830465: 2,
        2013265921: 33282,
        2281701377: 32770,
        2550136833: 8389122,
        2818572289: 514,
        3087007745: 8421888,
        3355443201: 8389120,
        3623878657: 0,
        3892314113: 33280,
        4160749569: 8421378
    }, {
        "0": 1074282512,
        16777216: 16384,
        33554432: 524288,
        50331648: 1074266128,
        67108864: 1073741840,
        83886080: 1074282496,
        100663296: 1073758208,
        117440512: 16,
        134217728: 540672,
        150994944: 1073758224,
        167772160: 1073741824,
        184549376: 540688,
        201326592: 524304,
        218103808: 0,
        234881024: 16400,
        251658240: 1074266112,
        8388608: 1073758208,
        25165824: 540688,
        41943040: 16,
        58720256: 1073758224,
        75497472: 1074282512,
        92274688: 1073741824,
        109051904: 524288,
        125829120: 1074266128,
        142606336: 524304,
        159383552: 0,
        176160768: 16384,
        192937984: 1074266112,
        209715200: 1073741840,
        226492416: 540672,
        243269632: 1074282496,
        260046848: 16400,
        268435456: 0,
        285212672: 1074266128,
        301989888: 1073758224,
        318767104: 1074282496,
        335544320: 1074266112,
        352321536: 16,
        369098752: 540688,
        385875968: 16384,
        402653184: 16400,
        419430400: 524288,
        436207616: 524304,
        452984832: 1073741840,
        469762048: 540672,
        486539264: 1073758208,
        503316480: 1073741824,
        520093696: 1074282512,
        276824064: 540688,
        293601280: 524288,
        310378496: 1074266112,
        327155712: 16384,
        343932928: 1073758208,
        360710144: 1074282512,
        377487360: 16,
        394264576: 1073741824,
        411041792: 1074282496,
        427819008: 1073741840,
        444596224: 1073758224,
        461373440: 524304,
        478150656: 0,
        494927872: 16400,
        511705088: 1074266128,
        528482304: 540672
    }, {
        "0": 260,
        1048576: 0,
        2097152: 67109120,
        3145728: 65796,
        4194304: 65540,
        5242880: 67108868,
        6291456: 67174660,
        7340032: 67174400,
        8388608: 67108864,
        9437184: 67174656,
        10485760: 65792,
        11534336: 67174404,
        12582912: 67109124,
        13631488: 65536,
        14680064: 4,
        15728640: 256,
        524288: 67174656,
        1572864: 67174404,
        2621440: 0,
        3670016: 67109120,
        4718592: 67108868,
        5767168: 65536,
        6815744: 65540,
        7864320: 260,
        8912896: 4,
        9961472: 256,
        11010048: 67174400,
        12058624: 65796,
        13107200: 65792,
        14155776: 67109124,
        15204352: 67174660,
        16252928: 67108864,
        16777216: 67174656,
        17825792: 65540,
        18874368: 65536,
        19922944: 67109120,
        20971520: 256,
        22020096: 67174660,
        23068672: 67108868,
        24117248: 0,
        25165824: 67109124,
        26214400: 67108864,
        27262976: 4,
        28311552: 65792,
        29360128: 67174400,
        30408704: 260,
        31457280: 65796,
        32505856: 67174404,
        17301504: 67108864,
        18350080: 260,
        19398656: 67174656,
        20447232: 0,
        21495808: 65540,
        22544384: 67109120,
        23592960: 256,
        24641536: 67174404,
        25690112: 65536,
        26738688: 67174660,
        27787264: 65796,
        28835840: 67108868,
        29884416: 67109124,
        30932992: 67174400,
        31981568: 4,
        33030144: 65792
    }, {
        "0": 2151682048,
        65536: 2147487808,
        131072: 4198464,
        196608: 2151677952,
        262144: 0,
        327680: 4198400,
        393216: 2147483712,
        458752: 4194368,
        524288: 2147483648,
        589824: 4194304,
        655360: 64,
        720896: 2147487744,
        786432: 2151678016,
        851968: 4160,
        917504: 4096,
        983040: 2151682112,
        32768: 2147487808,
        98304: 64,
        163840: 2151678016,
        229376: 2147487744,
        294912: 4198400,
        360448: 2151682112,
        425984: 0,
        491520: 2151677952,
        557056: 4096,
        622592: 2151682048,
        688128: 4194304,
        753664: 4160,
        819200: 2147483648,
        884736: 4194368,
        950272: 4198464,
        1015808: 2147483712,
        1048576: 4194368,
        1114112: 4198400,
        1179648: 2147483712,
        1245184: 0,
        1310720: 4160,
        1376256: 2151678016,
        1441792: 2151682048,
        1507328: 2147487808,
        1572864: 2151682112,
        1638400: 2147483648,
        1703936: 2151677952,
        1769472: 4198464,
        1835008: 2147487744,
        1900544: 4194304,
        1966080: 64,
        2031616: 4096,
        1081344: 2151677952,
        1146880: 2151682112,
        1212416: 0,
        1277952: 4198400,
        1343488: 4194368,
        1409024: 2147483648,
        1474560: 2147487808,
        1540096: 64,
        1605632: 2147483712,
        1671168: 4096,
        1736704: 2147487744,
        1802240: 2151678016,
        1867776: 4160,
        1933312: 2151682048,
        1998848: 4194304,
        2064384: 4198464
    }, {
        "0": 128,
        4096: 17039360,
        8192: 262144,
        12288: 536870912,
        16384: 537133184,
        20480: 16777344,
        24576: 553648256,
        28672: 262272,
        32768: 16777216,
        36864: 537133056,
        40960: 536871040,
        45056: 553910400,
        49152: 553910272,
        53248: 0,
        57344: 17039488,
        61440: 553648128,
        2048: 17039488,
        6144: 553648256,
        10240: 128,
        14336: 17039360,
        18432: 262144,
        22528: 537133184,
        26624: 553910272,
        30720: 536870912,
        34816: 537133056,
        38912: 0,
        43008: 553910400,
        47104: 16777344,
        51200: 536871040,
        55296: 553648128,
        59392: 16777216,
        63488: 262272,
        65536: 262144,
        69632: 128,
        73728: 536870912,
        77824: 553648256,
        81920: 16777344,
        86016: 553910272,
        90112: 537133184,
        94208: 16777216,
        98304: 553910400,
        102400: 553648128,
        106496: 17039360,
        110592: 537133056,
        114688: 262272,
        118784: 536871040,
        122880: 0,
        126976: 17039488,
        67584: 553648256,
        71680: 16777216,
        75776: 17039360,
        79872: 537133184,
        83968: 536870912,
        88064: 17039488,
        92160: 128,
        96256: 553910272,
        100352: 262272,
        104448: 553910400,
        108544: 0,
        112640: 553648128,
        116736: 16777344,
        120832: 262144,
        124928: 537133056,
        129024: 536871040
    }, {
        "0": 268435464,
        256: 8192,
        512: 270532608,
        768: 270540808,
        1024: 268443648,
        1280: 2097152,
        1536: 2097160,
        1792: 268435456,
        2048: 0,
        2304: 268443656,
        2560: 2105344,
        2816: 8,
        3072: 270532616,
        3328: 2105352,
        3584: 8200,
        3840: 270540800,
        128: 270532608,
        384: 270540808,
        640: 8,
        896: 2097152,
        1152: 2105352,
        1408: 268435464,
        1664: 268443648,
        1920: 8200,
        2176: 2097160,
        2432: 8192,
        2688: 268443656,
        2944: 270532616,
        3200: 0,
        3456: 270540800,
        3712: 2105344,
        3968: 268435456,
        4096: 268443648,
        4352: 270532616,
        4608: 270540808,
        4864: 8200,
        5120: 2097152,
        5376: 268435456,
        5632: 268435464,
        5888: 2105344,
        6144: 2105352,
        6400: 0,
        6656: 8,
        6912: 270532608,
        7168: 8192,
        7424: 268443656,
        7680: 270540800,
        7936: 2097160,
        4224: 8,
        4480: 2105344,
        4736: 2097152,
        4992: 268435464,
        5248: 268443648,
        5504: 8200,
        5760: 270540808,
        6016: 270532608,
        6272: 270540800,
        6528: 270532616,
        6784: 8192,
        7040: 2105352,
        7296: 2097160,
        7552: 0,
        7808: 268435456,
        8064: 268443656
    }, {
        "0": 1048576,
        16: 33555457,
        32: 1024,
        48: 1049601,
        64: 34604033,
        80: 0,
        96: 1,
        112: 34603009,
        128: 33555456,
        144: 1048577,
        160: 33554433,
        176: 34604032,
        192: 34603008,
        208: 1025,
        224: 1049600,
        240: 33554432,
        8: 34603009,
        24: 0,
        40: 33555457,
        56: 34604032,
        72: 1048576,
        88: 33554433,
        104: 33554432,
        120: 1025,
        136: 1049601,
        152: 33555456,
        168: 34603008,
        184: 1048577,
        200: 1024,
        216: 34604033,
        232: 1,
        248: 1049600,
        256: 33554432,
        272: 1048576,
        288: 33555457,
        304: 34603009,
        320: 1048577,
        336: 33555456,
        352: 34604032,
        368: 1049601,
        384: 1025,
        400: 34604033,
        416: 1049600,
        432: 1,
        448: 0,
        464: 34603008,
        480: 33554433,
        496: 1024,
        264: 1049600,
        280: 33555457,
        296: 34603009,
        312: 1,
        328: 33554432,
        344: 1048576,
        360: 1025,
        376: 34604032,
        392: 33554433,
        408: 34603008,
        424: 0,
        440: 34604033,
        456: 1049601,
        472: 1024,
        488: 33555456,
        504: 1048577
    }, {
        "0": 134219808,
        1: 131072,
        2: 134217728,
        3: 32,
        4: 131104,
        5: 134350880,
        6: 134350848,
        7: 2048,
        8: 134348800,
        9: 134219776,
        10: 133120,
        11: 134348832,
        12: 2080,
        13: 0,
        14: 134217760,
        15: 133152,
        2147483648: 2048,
        2147483649: 134350880,
        2147483650: 134219808,
        2147483651: 134217728,
        2147483652: 134348800,
        2147483653: 133120,
        2147483654: 133152,
        2147483655: 32,
        2147483656: 134217760,
        2147483657: 2080,
        2147483658: 131104,
        2147483659: 134350848,
        2147483660: 0,
        2147483661: 134348832,
        2147483662: 134219776,
        2147483663: 131072,
        16: 133152,
        17: 134350848,
        18: 32,
        19: 2048,
        20: 134219776,
        21: 134217760,
        22: 134348832,
        23: 131072,
        24: 0,
        25: 131104,
        26: 134348800,
        27: 134219808,
        28: 134350880,
        29: 133120,
        30: 2080,
        31: 134217728,
        2147483664: 131072,
        2147483665: 2048,
        2147483666: 134348832,
        2147483667: 133152,
        2147483668: 32,
        2147483669: 134348800,
        2147483670: 134217728,
        2147483671: 134219808,
        2147483672: 134350880,
        2147483673: 134217760,
        2147483674: 134219776,
        2147483675: 0,
        2147483676: 133120,
        2147483677: 2080,
        2147483678: 131104,
        2147483679: 134350848
    } ], k = [ 4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679 ], l = f.DES = d.extend({
        _doReset: function() {
            for (var a = this._key.words, b = [], c = 0; 56 > c; c++) {
                var d = g[c] - 1;
                b[c] = a[d >>> 5] >>> 31 - d % 32 & 1;
            }
            a = this._subKeys = [];
            for (d = 0; 16 > d; d++) {
                for (var e = a[d] = [], f = i[d], c = 0; 24 > c; c++) e[c / 6 | 0] |= b[(h[c] - 1 + f) % 28] << 31 - c % 6, 
                e[4 + (c / 6 | 0)] |= b[28 + (h[c + 24] - 1 + f) % 28] << 31 - c % 6;
                e[0] = e[0] << 1 | e[0] >>> 31;
                for (c = 1; 7 > c; c++) e[c] >>>= 4 * (c - 1) + 3;
                e[7] = e[7] << 5 | e[7] >>> 27;
            }
            b = this._invSubKeys = [];
            for (c = 0; 16 > c; c++) b[c] = a[15 - c];
        },
        encryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._subKeys);
        },
        decryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._invSubKeys);
        },
        _doCryptBlock: function(c, d, e) {
            this._lBlock = c[d];
            this._rBlock = c[d + 1];
            a.call(this, 4, 252645135);
            a.call(this, 16, 65535);
            b.call(this, 2, 858993459);
            b.call(this, 8, 16711935);
            a.call(this, 1, 1431655765);
            for (var f = 0; 16 > f; f++) {
                for (var g = e[f], h = this._lBlock, i = this._rBlock, l = 0, m = 0; 8 > m; m++) l |= j[m][((i ^ g[m]) & k[m]) >>> 0];
                this._lBlock = i;
                this._rBlock = h ^ l;
            }
            e = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = e;
            a.call(this, 1, 1431655765);
            b.call(this, 8, 16711935);
            b.call(this, 2, 858993459);
            a.call(this, 16, 65535);
            a.call(this, 4, 252645135);
            c[d] = this._lBlock;
            c[d + 1] = this._rBlock;
        },
        keySize: 2,
        ivSize: 2,
        blockSize: 2
    });
    c.DES = d._createHelper(l);
    f = f.TripleDES = d.extend({
        _doReset: function() {
            var a = this._key.words;
            this._des1 = l.createEncryptor(e.create(a.slice(0, 2)));
            this._des2 = l.createEncryptor(e.create(a.slice(2, 4)));
            this._des3 = l.createEncryptor(e.create(a.slice(4, 6)));
        },
        encryptBlock: function(a, b) {
            this._des1.encryptBlock(a, b);
            this._des2.decryptBlock(a, b);
            this._des3.encryptBlock(a, b);
        },
        decryptBlock: function(a, b) {
            this._des3.decryptBlock(a, b);
            this._des2.encryptBlock(a, b);
            this._des1.decryptBlock(a, b);
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2
    });
    c.TripleDES = d._createHelper(f);
})();

(function() {
    var a = CryptoJS, b = a.lib, c = b.WordArray, d = b.Hasher, e = [], b = a.algo.SHA1 = d.extend({
        _doReset: function() {
            this._hash = new c.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
        },
        _doProcessBlock: function(a, b) {
            for (var c = this._hash.words, d = c[0], f = c[1], g = c[2], h = c[3], i = c[4], j = 0; 80 > j; j++) {
                if (16 > j) e[j] = a[b + j] | 0; else {
                    var k = e[j - 3] ^ e[j - 8] ^ e[j - 14] ^ e[j - 16];
                    e[j] = k << 1 | k >>> 31;
                }
                k = (d << 5 | d >>> 27) + i + e[j];
                k = 20 > j ? k + ((f & g | ~f & h) + 1518500249) : 40 > j ? k + ((f ^ g ^ h) + 1859775393) : 60 > j ? k + ((f & g | f & h | g & h) - 1894007588) : k + ((f ^ g ^ h) - 899497514);
                i = h;
                h = g;
                g = f << 30 | f >>> 2;
                f = d;
                d = k;
            }
            c[0] = c[0] + d | 0;
            c[1] = c[1] + f | 0;
            c[2] = c[2] + g | 0;
            c[3] = c[3] + h | 0;
            c[4] = c[4] + i | 0;
        },
        _doFinalize: function() {
            var a = this._data, b = a.words, c = 8 * this._nDataBytes, d = 8 * a.sigBytes;
            b[d >>> 5] |= 128 << 24 - d % 32;
            b[(d + 64 >>> 9 << 4) + 14] = Math.floor(c / 4294967296);
            b[(d + 64 >>> 9 << 4) + 15] = c;
            a.sigBytes = 4 * b.length;
            this._process();
            return this._hash;
        },
        clone: function() {
            var a = d.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        }
    });
    a.SHA1 = d._createHelper(b);
    a.HmacSHA1 = d._createHmacHelper(b);
})();

(function() {
    var a = CryptoJS, b = a.lib, c = b.WordArray, d = b.Hasher, b = a.algo, e = c.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]), f = c.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]), g = c.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]), h = c.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]), i = c.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]), j = c.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]), b = b.RIPEMD160 = d.extend({
        _doReset: function() {
            this._hash = c.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
        },
        _doProcessBlock: function(a, b) {
            for (var c = 0; 16 > c; c++) {
                var d = b + c, k = a[d];
                a[d] = (k << 8 | k >>> 24) & 16711935 | (k << 24 | k >>> 8) & 4278255360;
            }
            var d = this._hash.words, k = i.words, l = j.words, m = e.words, n = f.words, o = g.words, p = h.words, q, r, s, t, u, v, w, x, y, z;
            v = q = d[0];
            w = r = d[1];
            x = s = d[2];
            y = t = d[3];
            z = u = d[4];
            for (var A, c = 0; 80 > c; c += 1) A = q + a[b + m[c]] | 0, A = 16 > c ? A + ((r ^ s ^ t) + k[0]) : 32 > c ? A + ((r & s | ~r & t) + k[1]) : 48 > c ? A + (((r | ~s) ^ t) + k[2]) : 64 > c ? A + ((r & t | s & ~t) + k[3]) : A + ((r ^ (s | ~t)) + k[4]), 
            A |= 0, A = A << o[c] | A >>> 32 - o[c], A = A + u | 0, q = u, u = t, t = s << 10 | s >>> 22, 
            s = r, r = A, A = v + a[b + n[c]] | 0, A = 16 > c ? A + ((w ^ (x | ~y)) + l[0]) : 32 > c ? A + ((w & y | x & ~y) + l[1]) : 48 > c ? A + (((w | ~x) ^ y) + l[2]) : 64 > c ? A + ((w & x | ~w & y) + l[3]) : A + ((w ^ x ^ y) + l[4]), 
            A |= 0, A = A << p[c] | A >>> 32 - p[c], A = A + z | 0, v = z, z = y, y = x << 10 | x >>> 22, 
            x = w, w = A;
            A = d[1] + s + y | 0;
            d[1] = d[2] + t + z | 0;
            d[2] = d[3] + u + v | 0;
            d[3] = d[4] + q + w | 0;
            d[4] = d[0] + r + x | 0;
            d[0] = A;
        },
        _doFinalize: function() {
            var a = this._data, b = a.words, c = 8 * this._nDataBytes, d = 8 * a.sigBytes;
            b[d >>> 5] |= 128 << 24 - d % 32;
            b[(d + 64 >>> 9 << 4) + 14] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
            a.sigBytes = 4 * (b.length + 1);
            this._process();
            a = this._hash;
            b = a.words;
            for (c = 0; 5 > c; c++) d = b[c], b[c] = (d << 8 | d >>> 24) & 16711935 | (d << 24 | d >>> 8) & 4278255360;
            return a;
        },
        clone: function() {
            var a = d.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        }
    });
    a.RIPEMD160 = d._createHelper(b);
    a.HmacRIPEMD160 = d._createHmacHelper(b);
})(Math);

(function() {
    var a = CryptoJS, b = a.lib, c = b.Base, d = b.WordArray, b = a.algo, e = b.HMAC, f = b.PBKDF2 = c.extend({
        cfg: c.extend({
            keySize: 4,
            hasher: b.SHA1,
            iterations: 1
        }),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
        },
        compute: function(a, b) {
            for (var c = this.cfg, f = e.create(c.hasher, a), g = d.create(), h = d.create([ 1 ]), i = g.words, j = h.words, k = c.keySize, c = c.iterations; i.length < k; ) {
                var l = f.update(b).finalize(h);
                f.reset();
                for (var m = l.words, n = m.length, o = l, p = 1; p < c; p++) {
                    o = f.finalize(o);
                    f.reset();
                    for (var q = o.words, r = 0; r < n; r++) m[r] ^= q[r];
                }
                g.concat(l);
                j[0]++;
            }
            g.sigBytes = 4 * k;
            return g;
        }
    });
    a.PBKDF2 = function(a, b, c) {
        return f.create(c).compute(a, b);
    };
})();

var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var b64pad = "=";

function hex2b64(a) {
    var b;
    var c;
    var d = "";
    for (b = 0; b + 3 <= a.length; b += 3) {
        c = parseInt(a.substring(b, b + 3), 16);
        d += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
    }
    if (b + 1 == a.length) {
        c = parseInt(a.substring(b, b + 1), 16);
        d += b64map.charAt(c << 2);
    } else {
        if (b + 2 == a.length) {
            c = parseInt(a.substring(b, b + 2), 16);
            d += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
        }
    }
    if (b64pad) {
        while ((d.length & 3) > 0) {
            d += b64pad;
        }
    }
    return d;
}

function b64tohex(a) {
    var b = "";
    var c;
    var d = 0;
    var e;
    var f;
    for (c = 0; c < a.length; ++c) {
        if (a.charAt(c) == b64pad) {
            break;
        }
        f = b64map.indexOf(a.charAt(c));
        if (f < 0) {
            continue;
        }
        if (d == 0) {
            b += int2char(f >> 2);
            e = f & 3;
            d = 1;
        } else {
            if (d == 1) {
                b += int2char(e << 2 | f >> 4);
                e = f & 15;
                d = 2;
            } else {
                if (d == 2) {
                    b += int2char(e);
                    b += int2char(f >> 2);
                    e = f & 3;
                    d = 3;
                } else {
                    b += int2char(e << 2 | f >> 4);
                    b += int2char(f & 15);
                    d = 0;
                }
            }
        }
    }
    if (d == 1) {
        b += int2char(e << 2);
    }
    return b;
}

function b64toBA(a) {
    var b = b64tohex(a);
    var c;
    var d = new Array();
    for (c = 0; 2 * c < b.length; ++c) {
        d[c] = parseInt(b.substring(2 * c, 2 * c + 2), 16);
    }
    return d;
}

var dbits;

var canary = 0xdeadbeefcafe;

var j_lm = (canary & 16777215) == 15715070;

function BigInteger(a, b, c) {
    if (a != null) {
        if ("number" == typeof a) {
            this.fromNumber(a, b, c);
        } else {
            if (b == null && "string" != typeof a) {
                this.fromString(a, 256);
            } else {
                this.fromString(a, b);
            }
        }
    }
}

function nbi() {
    return new BigInteger(null);
}

function am1(a, b, c, d, e, f) {
    while (--f >= 0) {
        var g = b * this[a++] + c[d] + e;
        e = Math.floor(g / 67108864);
        c[d++] = g & 67108863;
    }
    return e;
}

function am2(a, b, c, d, e, f) {
    var g = b & 32767, h = b >> 15;
    while (--f >= 0) {
        var i = this[a] & 32767;
        var j = this[a++] >> 15;
        var k = h * i + j * g;
        i = g * i + ((k & 32767) << 15) + c[d] + (e & 1073741823);
        e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30);
        c[d++] = i & 1073741823;
    }
    return e;
}

function am3(a, b, c, d, e, f) {
    var g = b & 16383, h = b >> 14;
    while (--f >= 0) {
        var i = this[a] & 16383;
        var j = this[a++] >> 14;
        var k = h * i + j * g;
        i = g * i + ((k & 16383) << 14) + c[d] + e;
        e = (i >> 28) + (k >> 14) + h * j;
        c[d++] = i & 268435455;
    }
    return e;
}

if (j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = am2;
    dbits = 30;
} else {
    if (j_lm && navigator.appName != "Netscape") {
        BigInteger.prototype.am = am1;
        dbits = 26;
    } else {
        BigInteger.prototype.am = am3;
        dbits = 28;
    }
}

BigInteger.prototype.DB = dbits;

BigInteger.prototype.DM = (1 << dbits) - 1;

BigInteger.prototype.DV = 1 << dbits;

var BI_FP = 52;

BigInteger.prototype.FV = Math.pow(2, BI_FP);

BigInteger.prototype.F1 = BI_FP - dbits;

BigInteger.prototype.F2 = 2 * dbits - BI_FP;

var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";

var BI_RC = new Array();

var rr, vv;

rr = "0".charCodeAt(0);

for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
}

rr = "a".charCodeAt(0);

for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}

rr = "A".charCodeAt(0);

for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
}

function int2char(a) {
    return BI_RM.charAt(a);
}

function intAt(a, b) {
    var c = BI_RC[a.charCodeAt(b)];
    return c == null ? -1 : c;
}

function bnpCopyTo(a) {
    for (var b = this.t - 1; b >= 0; --b) {
        a[b] = this[b];
    }
    a.t = this.t;
    a.s = this.s;
}

function bnpFromInt(a) {
    this.t = 1;
    this.s = a < 0 ? -1 : 0;
    if (a > 0) {
        this[0] = a;
    } else {
        if (a < -1) {
            this[0] = a + this.DV;
        } else {
            this.t = 0;
        }
    }
}

function nbv(a) {
    var b = nbi();
    b.fromInt(a);
    return b;
}

function bnpFromString(a, b) {
    var c;
    if (b == 16) {
        c = 4;
    } else {
        if (b == 8) {
            c = 3;
        } else {
            if (b == 256) {
                c = 8;
            } else {
                if (b == 2) {
                    c = 1;
                } else {
                    if (b == 32) {
                        c = 5;
                    } else {
                        if (b == 4) {
                            c = 2;
                        } else {
                            this.fromRadix(a, b);
                            return;
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var d = a.length, e = false, f = 0;
    while (--d >= 0) {
        var g = c == 8 ? a[d] & 255 : intAt(a, d);
        if (g < 0) {
            if (a.charAt(d) == "-") {
                e = true;
            }
            continue;
        }
        e = false;
        if (f == 0) {
            this[this.t++] = g;
        } else {
            if (f + c > this.DB) {
                this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f;
                this[this.t++] = g >> this.DB - f;
            } else {
                this[this.t - 1] |= g << f;
            }
        }
        f += c;
        if (f >= this.DB) {
            f -= this.DB;
        }
    }
    if (c == 8 && (a[0] & 128) != 0) {
        this.s = -1;
        if (f > 0) {
            this[this.t - 1] |= (1 << this.DB - f) - 1 << f;
        }
    }
    this.clamp();
    if (e) {
        BigInteger.ZERO.subTo(this, this);
    }
}

function bnpClamp() {
    var a = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == a) {
        --this.t;
    }
}

function bnToString(a) {
    if (this.s < 0) {
        return "-" + this.negate().toString(a);
    }
    var b;
    if (a == 16) {
        b = 4;
    } else {
        if (a == 8) {
            b = 3;
        } else {
            if (a == 2) {
                b = 1;
            } else {
                if (a == 32) {
                    b = 5;
                } else {
                    if (a == 4) {
                        b = 2;
                    } else {
                        return this.toRadix(a);
                    }
                }
            }
        }
    }
    var c = (1 << b) - 1, d, e = false, f = "", g = this.t;
    var h = this.DB - g * this.DB % b;
    if (g-- > 0) {
        if (h < this.DB && (d = this[g] >> h) > 0) {
            e = true;
            f = int2char(d);
        }
        while (g >= 0) {
            if (h < b) {
                d = (this[g] & (1 << h) - 1) << b - h;
                d |= this[--g] >> (h += this.DB - b);
            } else {
                d = this[g] >> (h -= b) & c;
                if (h <= 0) {
                    h += this.DB;
                    --g;
                }
            }
            if (d > 0) {
                e = true;
            }
            if (e) {
                f += int2char(d);
            }
        }
    }
    return e ? f : "0";
}

function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a;
}

function bnAbs() {
    return this.s < 0 ? this.negate() : this;
}

function bnCompareTo(a) {
    var b = this.s - a.s;
    if (b != 0) {
        return b;
    }
    var c = this.t;
    b = c - a.t;
    if (b != 0) {
        return this.s < 0 ? -b : b;
    }
    while (--c >= 0) {
        if ((b = this[c] - a[c]) != 0) {
            return b;
        }
    }
    return 0;
}

function nbits(a) {
    var b = 1, c;
    if ((c = a >>> 16) != 0) {
        a = c;
        b += 16;
    }
    if ((c = a >> 8) != 0) {
        a = c;
        b += 8;
    }
    if ((c = a >> 4) != 0) {
        a = c;
        b += 4;
    }
    if ((c = a >> 2) != 0) {
        a = c;
        b += 2;
    }
    if ((c = a >> 1) != 0) {
        a = c;
        b += 1;
    }
    return b;
}

function bnBitLength() {
    if (this.t <= 0) {
        return 0;
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}

function bnpDLShiftTo(a, b) {
    var c;
    for (c = this.t - 1; c >= 0; --c) {
        b[c + a] = this[c];
    }
    for (c = a - 1; c >= 0; --c) {
        b[c] = 0;
    }
    b.t = this.t + a;
    b.s = this.s;
}

function bnpDRShiftTo(a, b) {
    for (var c = a; c < this.t; ++c) {
        b[c - a] = this[c];
    }
    b.t = Math.max(this.t - a, 0);
    b.s = this.s;
}

function bnpLShiftTo(a, b) {
    var c = a % this.DB;
    var d = this.DB - c;
    var e = (1 << d) - 1;
    var f = Math.floor(a / this.DB), g = this.s << c & this.DM, h;
    for (h = this.t - 1; h >= 0; --h) {
        b[h + f + 1] = this[h] >> d | g;
        g = (this[h] & e) << c;
    }
    for (h = f - 1; h >= 0; --h) {
        b[h] = 0;
    }
    b[f] = g;
    b.t = this.t + f + 1;
    b.s = this.s;
    b.clamp();
}

function bnpRShiftTo(a, b) {
    b.s = this.s;
    var c = Math.floor(a / this.DB);
    if (c >= this.t) {
        b.t = 0;
        return;
    }
    var d = a % this.DB;
    var e = this.DB - d;
    var f = (1 << d) - 1;
    b[0] = this[c] >> d;
    for (var g = c + 1; g < this.t; ++g) {
        b[g - c - 1] |= (this[g] & f) << e;
        b[g - c] = this[g] >> d;
    }
    if (d > 0) {
        b[this.t - c - 1] |= (this.s & f) << e;
    }
    b.t = this.t - c;
    b.clamp();
}

function bnpSubTo(a, b) {
    var c = 0, d = 0, e = Math.min(a.t, this.t);
    while (c < e) {
        d += this[c] - a[c];
        b[c++] = d & this.DM;
        d >>= this.DB;
    }
    if (a.t < this.t) {
        d -= a.s;
        while (c < this.t) {
            d += this[c];
            b[c++] = d & this.DM;
            d >>= this.DB;
        }
        d += this.s;
    } else {
        d += this.s;
        while (c < a.t) {
            d -= a[c];
            b[c++] = d & this.DM;
            d >>= this.DB;
        }
        d -= a.s;
    }
    b.s = d < 0 ? -1 : 0;
    if (d < -1) {
        b[c++] = this.DV + d;
    } else {
        if (d > 0) {
            b[c++] = d;
        }
    }
    b.t = c;
    b.clamp();
}

function bnpMultiplyTo(a, b) {
    var c = this.abs(), d = a.abs();
    var e = c.t;
    b.t = e + d.t;
    while (--e >= 0) {
        b[e] = 0;
    }
    for (e = 0; e < d.t; ++e) {
        b[e + c.t] = c.am(0, d[e], b, e, 0, c.t);
    }
    b.s = 0;
    b.clamp();
    if (this.s != a.s) {
        BigInteger.ZERO.subTo(b, b);
    }
}

function bnpSquareTo(a) {
    var b = this.abs();
    var c = a.t = 2 * b.t;
    while (--c >= 0) {
        a[c] = 0;
    }
    for (c = 0; c < b.t - 1; ++c) {
        var d = b.am(c, b[c], a, 2 * c, 0, 1);
        if ((a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV) {
            a[c + b.t] -= b.DV;
            a[c + b.t + 1] = 1;
        }
    }
    if (a.t > 0) {
        a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1);
    }
    a.s = 0;
    a.clamp();
}

function bnpDivRemTo(a, b, c) {
    var d = a.abs();
    if (d.t <= 0) {
        return;
    }
    var e = this.abs();
    if (e.t < d.t) {
        if (b != null) {
            b.fromInt(0);
        }
        if (c != null) {
            this.copyTo(c);
        }
        return;
    }
    if (c == null) {
        c = nbi();
    }
    var f = nbi(), g = this.s, h = a.s;
    var i = this.DB - nbits(d[d.t - 1]);
    if (i > 0) {
        d.lShiftTo(i, f);
        e.lShiftTo(i, c);
    } else {
        d.copyTo(f);
        e.copyTo(c);
    }
    var j = f.t;
    var k = f[j - 1];
    if (k == 0) {
        return;
    }
    var l = k * (1 << this.F1) + (j > 1 ? f[j - 2] >> this.F2 : 0);
    var m = this.FV / l, n = (1 << this.F1) / l, o = 1 << this.F2;
    var p = c.t, q = p - j, r = b == null ? nbi() : b;
    f.dlShiftTo(q, r);
    if (c.compareTo(r) >= 0) {
        c[c.t++] = 1;
        c.subTo(r, c);
    }
    BigInteger.ONE.dlShiftTo(j, r);
    r.subTo(f, f);
    while (f.t < j) {
        f[f.t++] = 0;
    }
    while (--q >= 0) {
        var s = c[--p] == k ? this.DM : Math.floor(c[p] * m + (c[p - 1] + o) * n);
        if ((c[p] += f.am(0, s, c, q, 0, j)) < s) {
            f.dlShiftTo(q, r);
            c.subTo(r, c);
            while (c[p] < --s) {
                c.subTo(r, c);
            }
        }
    }
    if (b != null) {
        c.drShiftTo(j, b);
        if (g != h) {
            BigInteger.ZERO.subTo(b, b);
        }
    }
    c.t = j;
    c.clamp();
    if (i > 0) {
        c.rShiftTo(i, c);
    }
    if (g < 0) {
        BigInteger.ZERO.subTo(c, c);
    }
}

function bnMod(a) {
    var b = nbi();
    this.abs().divRemTo(a, null, b);
    if (this.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
        a.subTo(b, b);
    }
    return b;
}

function Classic(a) {
    this.m = a;
}

function cConvert(a) {
    if (a.s < 0 || a.compareTo(this.m) >= 0) {
        return a.mod(this.m);
    } else {
        return a;
    }
}

function cRevert(a) {
    return a;
}

function cReduce(a) {
    a.divRemTo(this.m, null, a);
}

function cMulTo(a, b, c) {
    a.multiplyTo(b, c);
    this.reduce(c);
}

function cSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b);
}

Classic.prototype.convert = cConvert;

Classic.prototype.revert = cRevert;

Classic.prototype.reduce = cReduce;

Classic.prototype.mulTo = cMulTo;

Classic.prototype.sqrTo = cSqrTo;

function bnpInvDigit() {
    if (this.t < 1) {
        return 0;
    }
    var a = this[0];
    if ((a & 1) == 0) {
        return 0;
    }
    var b = a & 3;
    b = b * (2 - (a & 15) * b) & 15;
    b = b * (2 - (a & 255) * b) & 255;
    b = b * (2 - ((a & 65535) * b & 65535)) & 65535;
    b = b * (2 - a * b % this.DV) % this.DV;
    return b > 0 ? this.DV - b : -b;
}

function Montgomery(a) {
    this.m = a;
    this.mp = a.invDigit();
    this.mpl = this.mp & 32767;
    this.mph = this.mp >> 15;
    this.um = (1 << a.DB - 15) - 1;
    this.mt2 = 2 * a.t;
}

function montConvert(a) {
    var b = nbi();
    a.abs().dlShiftTo(this.m.t, b);
    b.divRemTo(this.m, null, b);
    if (a.s < 0 && b.compareTo(BigInteger.ZERO) > 0) {
        this.m.subTo(b, b);
    }
    return b;
}

function montRevert(a) {
    var b = nbi();
    a.copyTo(b);
    this.reduce(b);
    return b;
}

function montReduce(a) {
    while (a.t <= this.mt2) {
        a[a.t++] = 0;
    }
    for (var b = 0; b < this.m.t; ++b) {
        var c = a[b] & 32767;
        var d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
        c = b + this.m.t;
        a[c] += this.m.am(0, d, a, b, 0, this.m.t);
        while (a[c] >= a.DV) {
            a[c] -= a.DV;
            a[++c]++;
        }
    }
    a.clamp();
    a.drShiftTo(this.m.t, a);
    if (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a);
    }
}

function montSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b);
}

function montMulTo(a, b, c) {
    a.multiplyTo(b, c);
    this.reduce(c);
}

Montgomery.prototype.convert = montConvert;

Montgomery.prototype.revert = montRevert;

Montgomery.prototype.reduce = montReduce;

Montgomery.prototype.mulTo = montMulTo;

Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0;
}

function bnpExp(a, b) {
    if (a > 4294967295 || a < 1) {
        return BigInteger.ONE;
    }
    var c = nbi(), d = nbi(), e = b.convert(this), f = nbits(a) - 1;
    e.copyTo(c);
    while (--f >= 0) {
        b.sqrTo(c, d);
        if ((a & 1 << f) > 0) {
            b.mulTo(d, e, c);
        } else {
            var g = c;
            c = d;
            d = g;
        }
    }
    return b.revert(c);
}

function bnModPowInt(a, b) {
    var c;
    if (a < 256 || b.isEven()) {
        c = new Classic(b);
    } else {
        c = new Montgomery(b);
    }
    return this.exp(a, c);
}

BigInteger.prototype.copyTo = bnpCopyTo;

BigInteger.prototype.fromInt = bnpFromInt;

BigInteger.prototype.fromString = bnpFromString;

BigInteger.prototype.clamp = bnpClamp;

BigInteger.prototype.dlShiftTo = bnpDLShiftTo;

BigInteger.prototype.drShiftTo = bnpDRShiftTo;

BigInteger.prototype.lShiftTo = bnpLShiftTo;

BigInteger.prototype.rShiftTo = bnpRShiftTo;

BigInteger.prototype.subTo = bnpSubTo;

BigInteger.prototype.multiplyTo = bnpMultiplyTo;

BigInteger.prototype.squareTo = bnpSquareTo;

BigInteger.prototype.divRemTo = bnpDivRemTo;

BigInteger.prototype.invDigit = bnpInvDigit;

BigInteger.prototype.isEven = bnpIsEven;

BigInteger.prototype.exp = bnpExp;

BigInteger.prototype.toString = bnToString;

BigInteger.prototype.negate = bnNegate;

BigInteger.prototype.abs = bnAbs;

BigInteger.prototype.compareTo = bnCompareTo;

BigInteger.prototype.bitLength = bnBitLength;

BigInteger.prototype.mod = bnMod;

BigInteger.prototype.modPowInt = bnModPowInt;

BigInteger.ZERO = nbv(0);

BigInteger.ONE = nbv(1);

function bnClone() {
    var a = nbi();
    this.copyTo(a);
    return a;
}

function bnIntValue() {
    if (this.s < 0) {
        if (this.t == 1) {
            return this[0] - this.DV;
        } else {
            if (this.t == 0) {
                return -1;
            }
        }
    } else {
        if (this.t == 1) {
            return this[0];
        } else {
            if (this.t == 0) {
                return 0;
            }
        }
    }
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
}

function bnByteValue() {
    return this.t == 0 ? this.s : this[0] << 24 >> 24;
}

function bnShortValue() {
    return this.t == 0 ? this.s : this[0] << 16 >> 16;
}

function bnpChunkSize(a) {
    return Math.floor(Math.LN2 * this.DB / Math.log(a));
}

function bnSigNum() {
    if (this.s < 0) {
        return -1;
    } else {
        if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
            return 0;
        } else {
            return 1;
        }
    }
}

function bnpToRadix(a) {
    if (a == null) {
        a = 10;
    }
    if (this.signum() == 0 || a < 2 || a > 36) {
        return "0";
    }
    var b = this.chunkSize(a);
    var c = Math.pow(a, b);
    var d = nbv(c), e = nbi(), f = nbi(), g = "";
    this.divRemTo(d, e, f);
    while (e.signum() > 0) {
        g = (c + f.intValue()).toString(a).substr(1) + g;
        e.divRemTo(d, e, f);
    }
    return f.intValue().toString(a) + g;
}

function bnpFromRadix(a, b) {
    this.fromInt(0);
    if (b == null) {
        b = 10;
    }
    var c = this.chunkSize(b);
    var d = Math.pow(b, c), e = false, f = 0, g = 0;
    for (var h = 0; h < a.length; ++h) {
        var i = intAt(a, h);
        if (i < 0) {
            if (a.charAt(h) == "-" && this.signum() == 0) {
                e = true;
            }
            continue;
        }
        g = b * g + i;
        if (++f >= c) {
            this.dMultiply(d);
            this.dAddOffset(g, 0);
            f = 0;
            g = 0;
        }
    }
    if (f > 0) {
        this.dMultiply(Math.pow(b, f));
        this.dAddOffset(g, 0);
    }
    if (e) {
        BigInteger.ZERO.subTo(this, this);
    }
}

function bnpFromNumber(a, b, c) {
    if ("number" == typeof b) {
        if (a < 2) {
            this.fromInt(1);
        } else {
            this.fromNumber(a, c);
            if (!this.testBit(a - 1)) {
                this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this);
            }
            if (this.isEven()) {
                this.dAddOffset(1, 0);
            }
            while (!this.isProbablePrime(b)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > a) {
                    this.subTo(BigInteger.ONE.shiftLeft(a - 1), this);
                }
            }
        }
    } else {
        var d = new Array(), e = a & 7;
        d.length = (a >> 3) + 1;
        b.nextBytes(d);
        if (e > 0) {
            d[0] &= (1 << e) - 1;
        } else {
            d[0] = 0;
        }
        this.fromString(d, 256);
    }
}

function bnToByteArray() {
    var a = this.t, b = new Array();
    b[0] = this.s;
    var c = this.DB - a * this.DB % 8, d, e = 0;
    if (a-- > 0) {
        if (c < this.DB && (d = this[a] >> c) != (this.s & this.DM) >> c) {
            b[e++] = d | this.s << this.DB - c;
        }
        while (a >= 0) {
            if (c < 8) {
                d = (this[a] & (1 << c) - 1) << 8 - c;
                d |= this[--a] >> (c += this.DB - 8);
            } else {
                d = this[a] >> (c -= 8) & 255;
                if (c <= 0) {
                    c += this.DB;
                    --a;
                }
            }
            if ((d & 128) != 0) {
                d |= -256;
            }
            if (e == 0 && (this.s & 128) != (d & 128)) {
                ++e;
            }
            if (e > 0 || d != this.s) {
                b[e++] = d;
            }
        }
    }
    return b;
}

function bnEquals(a) {
    return this.compareTo(a) == 0;
}

function bnMin(a) {
    return this.compareTo(a) < 0 ? this : a;
}

function bnMax(a) {
    return this.compareTo(a) > 0 ? this : a;
}

function bnpBitwiseTo(a, b, c) {
    var d, e, f = Math.min(a.t, this.t);
    for (d = 0; d < f; ++d) {
        c[d] = b(this[d], a[d]);
    }
    if (a.t < this.t) {
        e = a.s & this.DM;
        for (d = f; d < this.t; ++d) {
            c[d] = b(this[d], e);
        }
        c.t = this.t;
    } else {
        e = this.s & this.DM;
        for (d = f; d < a.t; ++d) {
            c[d] = b(e, a[d]);
        }
        c.t = a.t;
    }
    c.s = b(this.s, a.s);
    c.clamp();
}

function op_and(a, b) {
    return a & b;
}

function bnAnd(a) {
    var b = nbi();
    this.bitwiseTo(a, op_and, b);
    return b;
}

function op_or(a, b) {
    return a | b;
}

function bnOr(a) {
    var b = nbi();
    this.bitwiseTo(a, op_or, b);
    return b;
}

function op_xor(a, b) {
    return a ^ b;
}

function bnXor(a) {
    var b = nbi();
    this.bitwiseTo(a, op_xor, b);
    return b;
}

function op_andnot(a, b) {
    return a & ~b;
}

function bnAndNot(a) {
    var b = nbi();
    this.bitwiseTo(a, op_andnot, b);
    return b;
}

function bnNot() {
    var a = nbi();
    for (var b = 0; b < this.t; ++b) {
        a[b] = this.DM & ~this[b];
    }
    a.t = this.t;
    a.s = ~this.s;
    return a;
}

function bnShiftLeft(a) {
    var b = nbi();
    if (a < 0) {
        this.rShiftTo(-a, b);
    } else {
        this.lShiftTo(a, b);
    }
    return b;
}

function bnShiftRight(a) {
    var b = nbi();
    if (a < 0) {
        this.lShiftTo(-a, b);
    } else {
        this.rShiftTo(a, b);
    }
    return b;
}

function lbit(a) {
    if (a == 0) {
        return -1;
    }
    var b = 0;
    if ((a & 65535) == 0) {
        a >>= 16;
        b += 16;
    }
    if ((a & 255) == 0) {
        a >>= 8;
        b += 8;
    }
    if ((a & 15) == 0) {
        a >>= 4;
        b += 4;
    }
    if ((a & 3) == 0) {
        a >>= 2;
        b += 2;
    }
    if ((a & 1) == 0) {
        ++b;
    }
    return b;
}

function bnGetLowestSetBit() {
    for (var a = 0; a < this.t; ++a) {
        if (this[a] != 0) {
            return a * this.DB + lbit(this[a]);
        }
    }
    if (this.s < 0) {
        return this.t * this.DB;
    }
    return -1;
}

function cbit(a) {
    var b = 0;
    while (a != 0) {
        a &= a - 1;
        ++b;
    }
    return b;
}

function bnBitCount() {
    var a = 0, b = this.s & this.DM;
    for (var c = 0; c < this.t; ++c) {
        a += cbit(this[c] ^ b);
    }
    return a;
}

function bnTestBit(a) {
    var b = Math.floor(a / this.DB);
    if (b >= this.t) {
        return this.s != 0;
    }
    return (this[b] & 1 << a % this.DB) != 0;
}

function bnpChangeBit(a, b) {
    var c = BigInteger.ONE.shiftLeft(a);
    this.bitwiseTo(c, b, c);
    return c;
}

function bnSetBit(a) {
    return this.changeBit(a, op_or);
}

function bnClearBit(a) {
    return this.changeBit(a, op_andnot);
}

function bnFlipBit(a) {
    return this.changeBit(a, op_xor);
}

function bnpAddTo(a, b) {
    var c = 0, d = 0, e = Math.min(a.t, this.t);
    while (c < e) {
        d += this[c] + a[c];
        b[c++] = d & this.DM;
        d >>= this.DB;
    }
    if (a.t < this.t) {
        d += a.s;
        while (c < this.t) {
            d += this[c];
            b[c++] = d & this.DM;
            d >>= this.DB;
        }
        d += this.s;
    } else {
        d += this.s;
        while (c < a.t) {
            d += a[c];
            b[c++] = d & this.DM;
            d >>= this.DB;
        }
        d += a.s;
    }
    b.s = d < 0 ? -1 : 0;
    if (d > 0) {
        b[c++] = d;
    } else {
        if (d < -1) {
            b[c++] = this.DV + d;
        }
    }
    b.t = c;
    b.clamp();
}

function bnAdd(a) {
    var b = nbi();
    this.addTo(a, b);
    return b;
}

function bnSubtract(a) {
    var b = nbi();
    this.subTo(a, b);
    return b;
}

function bnMultiply(a) {
    var b = nbi();
    this.multiplyTo(a, b);
    return b;
}

function bnSquare() {
    var a = nbi();
    this.squareTo(a);
    return a;
}

function bnDivide(a) {
    var b = nbi();
    this.divRemTo(a, b, null);
    return b;
}

function bnRemainder(a) {
    var b = nbi();
    this.divRemTo(a, null, b);
    return b;
}

function bnDivideAndRemainder(a) {
    var b = nbi(), c = nbi();
    this.divRemTo(a, b, c);
    return new Array(b, c);
}

function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
}

function bnpDAddOffset(a, b) {
    if (a == 0) {
        return;
    }
    while (this.t <= b) {
        this[this.t++] = 0;
    }
    this[b] += a;
    while (this[b] >= this.DV) {
        this[b] -= this.DV;
        if (++b >= this.t) {
            this[this.t++] = 0;
        }
        ++this[b];
    }
}

function NullExp() {}

function nNop(a) {
    return a;
}

function nMulTo(a, b, c) {
    a.multiplyTo(b, c);
}

function nSqrTo(a, b) {
    a.squareTo(b);
}

NullExp.prototype.convert = nNop;

NullExp.prototype.revert = nNop;

NullExp.prototype.mulTo = nMulTo;

NullExp.prototype.sqrTo = nSqrTo;

function bnPow(a) {
    return this.exp(a, new NullExp());
}

function bnpMultiplyLowerTo(a, b, c) {
    var d = Math.min(this.t + a.t, b);
    c.s = 0;
    c.t = d;
    while (d > 0) {
        c[--d] = 0;
    }
    var e;
    for (e = c.t - this.t; d < e; ++d) {
        c[d + this.t] = this.am(0, a[d], c, d, 0, this.t);
    }
    for (e = Math.min(a.t, b); d < e; ++d) {
        this.am(0, a[d], c, d, 0, b - d);
    }
    c.clamp();
}

function bnpMultiplyUpperTo(a, b, c) {
    --b;
    var d = c.t = this.t + a.t - b;
    c.s = 0;
    while (--d >= 0) {
        c[d] = 0;
    }
    for (d = Math.max(b - this.t, 0); d < a.t; ++d) {
        c[this.t + d - b] = this.am(b - d, a[d], c, 0, 0, this.t + d - b);
    }
    c.clamp();
    c.drShiftTo(1, c);
}

function Barrett(a) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * a.t, this.r2);
    this.mu = this.r2.divide(a);
    this.m = a;
}

function barrettConvert(a) {
    if (a.s < 0 || a.t > 2 * this.m.t) {
        return a.mod(this.m);
    } else {
        if (a.compareTo(this.m) < 0) {
            return a;
        } else {
            var b = nbi();
            a.copyTo(b);
            this.reduce(b);
            return b;
        }
    }
}

function barrettRevert(a) {
    return a;
}

function barrettReduce(a) {
    a.drShiftTo(this.m.t - 1, this.r2);
    if (a.t > this.m.t + 1) {
        a.t = this.m.t + 1;
        a.clamp();
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    while (a.compareTo(this.r2) < 0) {
        a.dAddOffset(1, this.m.t + 1);
    }
    a.subTo(this.r2, a);
    while (a.compareTo(this.m) >= 0) {
        a.subTo(this.m, a);
    }
}

function barrettSqrTo(a, b) {
    a.squareTo(b);
    this.reduce(b);
}

function barrettMulTo(a, b, c) {
    a.multiplyTo(b, c);
    this.reduce(c);
}

Barrett.prototype.convert = barrettConvert;

Barrett.prototype.revert = barrettRevert;

Barrett.prototype.reduce = barrettReduce;

Barrett.prototype.mulTo = barrettMulTo;

Barrett.prototype.sqrTo = barrettSqrTo;

function bnModPow(a, b) {
    var c = a.bitLength(), d, e = nbv(1), f;
    if (c <= 0) {
        return e;
    } else {
        if (c < 18) {
            d = 1;
        } else {
            if (c < 48) {
                d = 3;
            } else {
                if (c < 144) {
                    d = 4;
                } else {
                    if (c < 768) {
                        d = 5;
                    } else {
                        d = 6;
                    }
                }
            }
        }
    }
    if (c < 8) {
        f = new Classic(b);
    } else {
        if (b.isEven()) {
            f = new Barrett(b);
        } else {
            f = new Montgomery(b);
        }
    }
    var g = new Array(), h = 3, i = d - 1, j = (1 << d) - 1;
    g[1] = f.convert(this);
    if (d > 1) {
        var k = nbi();
        f.sqrTo(g[1], k);
        while (h <= j) {
            g[h] = nbi();
            f.mulTo(k, g[h - 2], g[h]);
            h += 2;
        }
    }
    var l = a.t - 1, m, n = true, o = nbi(), p;
    c = nbits(a[l]) - 1;
    while (l >= 0) {
        if (c >= i) {
            m = a[l] >> c - i & j;
        } else {
            m = (a[l] & (1 << c + 1) - 1) << i - c;
            if (l > 0) {
                m |= a[l - 1] >> this.DB + c - i;
            }
        }
        h = d;
        while ((m & 1) == 0) {
            m >>= 1;
            --h;
        }
        if ((c -= h) < 0) {
            c += this.DB;
            --l;
        }
        if (n) {
            g[m].copyTo(e);
            n = false;
        } else {
            while (h > 1) {
                f.sqrTo(e, o);
                f.sqrTo(o, e);
                h -= 2;
            }
            if (h > 0) {
                f.sqrTo(e, o);
            } else {
                p = e;
                e = o;
                o = p;
            }
            f.mulTo(o, g[m], e);
        }
        while (l >= 0 && (a[l] & 1 << c) == 0) {
            f.sqrTo(e, o);
            p = e;
            e = o;
            o = p;
            if (--c < 0) {
                c = this.DB - 1;
                --l;
            }
        }
    }
    return f.revert(e);
}

function bnGCD(a) {
    var b = this.s < 0 ? this.negate() : this.clone();
    var c = a.s < 0 ? a.negate() : a.clone();
    if (b.compareTo(c) < 0) {
        var d = b;
        b = c;
        c = d;
    }
    var e = b.getLowestSetBit(), f = c.getLowestSetBit();
    if (f < 0) {
        return b;
    }
    if (e < f) {
        f = e;
    }
    if (f > 0) {
        b.rShiftTo(f, b);
        c.rShiftTo(f, c);
    }
    while (b.signum() > 0) {
        if ((e = b.getLowestSetBit()) > 0) {
            b.rShiftTo(e, b);
        }
        if ((e = c.getLowestSetBit()) > 0) {
            c.rShiftTo(e, c);
        }
        if (b.compareTo(c) >= 0) {
            b.subTo(c, b);
            b.rShiftTo(1, b);
        } else {
            c.subTo(b, c);
            c.rShiftTo(1, c);
        }
    }
    if (f > 0) {
        c.lShiftTo(f, c);
    }
    return c;
}

function bnpModInt(a) {
    if (a <= 0) {
        return 0;
    }
    var b = this.DV % a, c = this.s < 0 ? a - 1 : 0;
    if (this.t > 0) {
        if (b == 0) {
            c = this[0] % a;
        } else {
            for (var d = this.t - 1; d >= 0; --d) {
                c = (b * c + this[d]) % a;
            }
        }
    }
    return c;
}

function bnModInverse(a) {
    var b = a.isEven();
    if (this.isEven() && b || a.signum() == 0) {
        return BigInteger.ZERO;
    }
    var c = a.clone(), d = this.clone();
    var e = nbv(1), f = nbv(0), g = nbv(0), h = nbv(1);
    while (c.signum() != 0) {
        while (c.isEven()) {
            c.rShiftTo(1, c);
            if (b) {
                if (!e.isEven() || !f.isEven()) {
                    e.addTo(this, e);
                    f.subTo(a, f);
                }
                e.rShiftTo(1, e);
            } else {
                if (!f.isEven()) {
                    f.subTo(a, f);
                }
            }
            f.rShiftTo(1, f);
        }
        while (d.isEven()) {
            d.rShiftTo(1, d);
            if (b) {
                if (!g.isEven() || !h.isEven()) {
                    g.addTo(this, g);
                    h.subTo(a, h);
                }
                g.rShiftTo(1, g);
            } else {
                if (!h.isEven()) {
                    h.subTo(a, h);
                }
            }
            h.rShiftTo(1, h);
        }
        if (c.compareTo(d) >= 0) {
            c.subTo(d, c);
            if (b) {
                e.subTo(g, e);
            }
            f.subTo(h, f);
        } else {
            d.subTo(c, d);
            if (b) {
                g.subTo(e, g);
            }
            h.subTo(f, h);
        }
    }
    if (d.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO;
    }
    if (h.compareTo(a) >= 0) {
        return h.subtract(a);
    }
    if (h.signum() < 0) {
        h.addTo(a, h);
    } else {
        return h;
    }
    if (h.signum() < 0) {
        return h.add(a);
    } else {
        return h;
    }
}

var lowprimes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997 ];

var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];

function bnIsProbablePrime(a) {
    var b, c = this.abs();
    if (c.t == 1 && c[0] <= lowprimes[lowprimes.length - 1]) {
        for (b = 0; b < lowprimes.length; ++b) {
            if (c[0] == lowprimes[b]) {
                return true;
            }
        }
        return false;
    }
    if (c.isEven()) {
        return false;
    }
    b = 1;
    while (b < lowprimes.length) {
        var d = lowprimes[b], e = b + 1;
        while (e < lowprimes.length && d < lplim) {
            d *= lowprimes[e++];
        }
        d = c.modInt(d);
        while (b < e) {
            if (d % lowprimes[b++] == 0) {
                return false;
            }
        }
    }
    return c.millerRabin(a);
}

function bnpMillerRabin(a) {
    var b = this.subtract(BigInteger.ONE);
    var c = b.getLowestSetBit();
    if (c <= 0) {
        return false;
    }
    var d = b.shiftRight(c);
    a = a + 1 >> 1;
    if (a > lowprimes.length) {
        a = lowprimes.length;
    }
    var e = nbi();
    for (var f = 0; f < a; ++f) {
        e.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var g = e.modPow(d, this);
        if (g.compareTo(BigInteger.ONE) != 0 && g.compareTo(b) != 0) {
            var h = 1;
            while (h++ < c && g.compareTo(b) != 0) {
                g = g.modPowInt(2, this);
                if (g.compareTo(BigInteger.ONE) == 0) {
                    return false;
                }
            }
            if (g.compareTo(b) != 0) {
                return false;
            }
        }
    }
    return true;
}

BigInteger.prototype.chunkSize = bnpChunkSize;

BigInteger.prototype.toRadix = bnpToRadix;

BigInteger.prototype.fromRadix = bnpFromRadix;

BigInteger.prototype.fromNumber = bnpFromNumber;

BigInteger.prototype.bitwiseTo = bnpBitwiseTo;

BigInteger.prototype.changeBit = bnpChangeBit;

BigInteger.prototype.addTo = bnpAddTo;

BigInteger.prototype.dMultiply = bnpDMultiply;

BigInteger.prototype.dAddOffset = bnpDAddOffset;

BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;

BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;

BigInteger.prototype.modInt = bnpModInt;

BigInteger.prototype.millerRabin = bnpMillerRabin;

BigInteger.prototype.clone = bnClone;

BigInteger.prototype.intValue = bnIntValue;

BigInteger.prototype.byteValue = bnByteValue;

BigInteger.prototype.shortValue = bnShortValue;

BigInteger.prototype.signum = bnSigNum;

BigInteger.prototype.toByteArray = bnToByteArray;

BigInteger.prototype.equals = bnEquals;

BigInteger.prototype.min = bnMin;

BigInteger.prototype.max = bnMax;

BigInteger.prototype.and = bnAnd;

BigInteger.prototype.or = bnOr;

BigInteger.prototype.xor = bnXor;

BigInteger.prototype.andNot = bnAndNot;

BigInteger.prototype.not = bnNot;

BigInteger.prototype.shiftLeft = bnShiftLeft;

BigInteger.prototype.shiftRight = bnShiftRight;

BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;

BigInteger.prototype.bitCount = bnBitCount;

BigInteger.prototype.testBit = bnTestBit;

BigInteger.prototype.setBit = bnSetBit;

BigInteger.prototype.clearBit = bnClearBit;

BigInteger.prototype.flipBit = bnFlipBit;

BigInteger.prototype.add = bnAdd;

BigInteger.prototype.subtract = bnSubtract;

BigInteger.prototype.multiply = bnMultiply;

BigInteger.prototype.divide = bnDivide;

BigInteger.prototype.remainder = bnRemainder;

BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;

BigInteger.prototype.modPow = bnModPow;

BigInteger.prototype.modInverse = bnModInverse;

BigInteger.prototype.pow = bnPow;

BigInteger.prototype.gcd = bnGCD;

BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

BigInteger.prototype.square = bnSquare;

function Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Array();
}

function ARC4init(a) {
    var b, c, d;
    for (b = 0; b < 256; ++b) {
        this.S[b] = b;
    }
    c = 0;
    for (b = 0; b < 256; ++b) {
        c = c + this.S[b] + a[b % a.length] & 255;
        d = this.S[b];
        this.S[b] = this.S[c];
        this.S[c] = d;
    }
    this.i = 0;
    this.j = 0;
}

function ARC4next() {
    var a;
    this.i = this.i + 1 & 255;
    this.j = this.j + this.S[this.i] & 255;
    a = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = a;
    return this.S[a + this.S[this.i] & 255];
}

Arcfour.prototype.init = ARC4init;

Arcfour.prototype.next = ARC4next;

function prng_newstate() {
    return new Arcfour();
}

var rng_psize = 256;

var rng_state;

var rng_pool;

var rng_pptr;

function rng_seed_int(a) {
    rng_pool[rng_pptr++] ^= a & 255;
    rng_pool[rng_pptr++] ^= a >> 8 & 255;
    rng_pool[rng_pptr++] ^= a >> 16 & 255;
    rng_pool[rng_pptr++] ^= a >> 24 & 255;
    if (rng_pptr >= rng_psize) {
        rng_pptr -= rng_psize;
    }
}

function rng_seed_time() {
    rng_seed_int(new Date().getTime());
}

if (rng_pool == null) {
    rng_pool = new Array();
    rng_pptr = 0;
    var t;
    if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t) {
            rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
        }
    }
    while (rng_pptr < rng_psize) {
        t = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = t >>> 8;
        rng_pool[rng_pptr++] = t & 255;
    }
    rng_pptr = 0;
    rng_seed_time();
}

function rng_get_byte() {
    if (rng_state == null) {
        rng_seed_time();
        rng_state = prng_newstate();
        rng_state.init(rng_pool);
        for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
            rng_pool[rng_pptr] = 0;
        }
        rng_pptr = 0;
    }
    return rng_state.next();
}

function rng_get_bytes(a) {
    var b;
    for (b = 0; b < a.length; ++b) {
        a[b] = rng_get_byte();
    }
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;

function parseBigInt(a, b) {
    return new BigInteger(a, b);
}

function linebrk(a, b) {
    var c = "";
    var d = 0;
    while (d + b < a.length) {
        c += a.substring(d, d + b) + "\n";
        d += b;
    }
    return c + a.substring(d, a.length);
}

function byte2Hex(a) {
    if (a < 16) {
        return "0" + a.toString(16);
    } else {
        return a.toString(16);
    }
}

function pkcs1pad2(a, b) {
    if (b < a.length + 11) {
        alert("Message too long for RSA");
        return null;
    }
    var c = new Array();
    var d = a.length - 1;
    while (d >= 0 && b > 0) {
        var e = a.charCodeAt(d--);
        if (e < 128) {
            c[--b] = e;
        } else {
            if (e > 127 && e < 2048) {
                c[--b] = e & 63 | 128;
                c[--b] = e >> 6 | 192;
            } else {
                c[--b] = e & 63 | 128;
                c[--b] = e >> 6 & 63 | 128;
                c[--b] = e >> 12 | 224;
            }
        }
    }
    c[--b] = 0;
    var f = new SecureRandom();
    var g = new Array();
    while (b > 2) {
        g[0] = 0;
        while (g[0] == 0) {
            f.nextBytes(g);
        }
        c[--b] = g[0];
    }
    c[--b] = 2;
    c[--b] = 0;
    return new BigInteger(c);
}

function oaep_mgf1_arr(a, b, c) {
    var d = "", e = 0;
    while (d.length < b) {
        d += c(String.fromCharCode.apply(String, a.concat([ (e & 4278190080) >> 24, (e & 16711680) >> 16, (e & 65280) >> 8, e & 255 ])));
        e += 1;
    }
    return d;
}

var SHA1_SIZE = 20;

function oaep_pad(a, b, c) {
    if (a.length + 2 * SHA1_SIZE + 2 > b) {
        throw "Message too long for RSA";
    }
    var d = "", e;
    for (e = 0; e < b - a.length - 2 * SHA1_SIZE - 2; e += 1) {
        d += "\x00";
    }
    var f = rstr_sha1("") + d + "" + a;
    var g = new Array(SHA1_SIZE);
    new SecureRandom().nextBytes(g);
    var h = oaep_mgf1_arr(g, f.length, c || rstr_sha1);
    var i = [];
    for (e = 0; e < f.length; e += 1) {
        i[e] = f.charCodeAt(e) ^ h.charCodeAt(e);
    }
    var j = oaep_mgf1_arr(i, g.length, rstr_sha1);
    var k = [ 0 ];
    for (e = 0; e < g.length; e += 1) {
        k[e + 1] = g[e] ^ j.charCodeAt(e);
    }
    return new BigInteger(k.concat(i));
}

function RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
}

function RSASetPublic(a, b) {
    if (typeof a !== "string") {
        this.n = a;
        this.e = b;
    } else {
        if (a != null && b != null && a.length > 0 && b.length > 0) {
            this.n = parseBigInt(a, 16);
            this.e = parseInt(b, 16);
        } else {
            alert("Invalid RSA public key");
        }
    }
}

function RSADoPublic(a) {
    return a.modPowInt(this.e, this.n);
}

function RSAEncrypt(a) {
    var b = pkcs1pad2(a, this.n.bitLength() + 7 >> 3);
    if (b == null) {
        return null;
    }
    var c = this.doPublic(b);
    if (c == null) {
        return null;
    }
    var d = c.toString(16);
    if ((d.length & 1) == 0) {
        return d;
    } else {
        return "0" + d;
    }
}

function RSAEncryptOAEP(a, b) {
    var c = oaep_pad(a, this.n.bitLength() + 7 >> 3, b);
    if (c == null) {
        return null;
    }
    var d = this.doPublic(c);
    if (d == null) {
        return null;
    }
    var e = d.toString(16);
    if ((e.length & 1) == 0) {
        return e;
    } else {
        return "0" + e;
    }
}

RSAKey.prototype.doPublic = RSADoPublic;

RSAKey.prototype.setPublic = RSASetPublic;

RSAKey.prototype.encrypt = RSAEncrypt;

RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;

RSAKey.prototype.type = "RSA";

function pkcs1unpad2(a, b) {
    var c = a.toByteArray();
    var d = 0;
    while (d < c.length && c[d] == 0) {
        ++d;
    }
    if (c.length - d != b - 1 || c[d] != 2) {
        return null;
    }
    ++d;
    while (c[d] != 0) {
        if (++d >= c.length) {
            return null;
        }
    }
    var e = "";
    while (++d < c.length) {
        var f = c[d] & 255;
        if (f < 128) {
            e += String.fromCharCode(f);
        } else {
            if (f > 191 && f < 224) {
                e += String.fromCharCode((f & 31) << 6 | c[d + 1] & 63);
                ++d;
            } else {
                e += String.fromCharCode((f & 15) << 12 | (c[d + 1] & 63) << 6 | c[d + 2] & 63);
                d += 2;
            }
        }
    }
    return e;
}

function oaep_mgf1_str(a, b, c) {
    var d = "", e = 0;
    while (d.length < b) {
        d += c(a + String.fromCharCode.apply(String, [ (e & 4278190080) >> 24, (e & 16711680) >> 16, (e & 65280) >> 8, e & 255 ]));
        e += 1;
    }
    return d;
}

var SHA1_SIZE = 20;

function oaep_unpad(a, b, c) {
    a = a.toByteArray();
    var d;
    for (d = 0; d < a.length; d += 1) {
        a[d] &= 255;
    }
    while (a.length < b) {
        a.unshift(0);
    }
    a = String.fromCharCode.apply(String, a);
    if (a.length < 2 * SHA1_SIZE + 2) {
        throw "Cipher too short";
    }
    var e = a.substr(1, SHA1_SIZE);
    var f = a.substr(SHA1_SIZE + 1);
    var g = oaep_mgf1_str(f, SHA1_SIZE, c || rstr_sha1);
    var h = [], d;
    for (d = 0; d < e.length; d += 1) {
        h[d] = e.charCodeAt(d) ^ g.charCodeAt(d);
    }
    var i = oaep_mgf1_str(String.fromCharCode.apply(String, h), a.length - SHA1_SIZE, rstr_sha1);
    var j = [];
    for (d = 0; d < f.length; d += 1) {
        j[d] = f.charCodeAt(d) ^ i.charCodeAt(d);
    }
    j = String.fromCharCode.apply(String, j);
    if (j.substr(0, SHA1_SIZE) !== rstr_sha1("")) {
        throw "Hash mismatch";
    }
    j = j.substr(SHA1_SIZE);
    var k = j.indexOf("");
    var l = k != -1 ? j.substr(0, k).lastIndexOf("\x00") : -1;
    if (l + 1 != k) {
        throw "Malformed data";
    }
    return j.substr(k + 1);
}

function RSASetPrivate(a, b, c) {
    if (typeof a !== "string") {
        this.n = a;
        this.e = b;
        this.d = c;
    } else {
        if (a != null && b != null && a.length > 0 && b.length > 0) {
            this.n = parseBigInt(a, 16);
            this.e = parseInt(b, 16);
            this.d = parseBigInt(c, 16);
        } else {
            alert("Invalid RSA private key");
        }
    }
}

function RSASetPrivateEx(a, b, c, d, e, f, g, h) {
    if (a == null) {
        throw "RSASetPrivateEx N == null";
    }
    if (b == null) {
        throw "RSASetPrivateEx E == null";
    }
    if (a.length == 0) {
        throw "RSASetPrivateEx N.length == 0";
    }
    if (b.length == 0) {
        throw "RSASetPrivateEx E.length == 0";
    }
    if (a != null && b != null && a.length > 0 && b.length > 0) {
        this.n = parseBigInt(a, 16);
        this.e = parseInt(b, 16);
        this.d = parseBigInt(c, 16);
        this.p = parseBigInt(d, 16);
        this.q = parseBigInt(e, 16);
        this.dmp1 = parseBigInt(f, 16);
        this.dmq1 = parseBigInt(g, 16);
        this.coeff = parseBigInt(h, 16);
    } else {
        alert("Invalid RSA private key in RSASetPrivateEx");
    }
}

function RSAGenerate(a, b) {
    var c = new SecureRandom();
    var d = a >> 1;
    this.e = parseInt(b, 16);
    var e = new BigInteger(b, 16);
    for (;;) {
        for (;;) {
            this.p = new BigInteger(a - d, 1, c);
            if (this.p.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                break;
            }
        }
        for (;;) {
            this.q = new BigInteger(d, 1, c);
            if (this.q.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                break;
            }
        }
        if (this.p.compareTo(this.q) <= 0) {
            var f = this.p;
            this.p = this.q;
            this.q = f;
        }
        var g = this.p.subtract(BigInteger.ONE);
        var h = this.q.subtract(BigInteger.ONE);
        var i = g.multiply(h);
        if (i.gcd(e).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = e.modInverse(i);
            this.dmp1 = this.d.mod(g);
            this.dmq1 = this.d.mod(h);
            this.coeff = this.q.modInverse(this.p);
            break;
        }
    }
}

function RSADoPrivate(a) {
    if (this.p == null || this.q == null) {
        return a.modPow(this.d, this.n);
    }
    var b = a.mod(this.p).modPow(this.dmp1, this.p);
    var c = a.mod(this.q).modPow(this.dmq1, this.q);
    while (b.compareTo(c) < 0) {
        b = b.add(this.p);
    }
    return b.subtract(c).multiply(this.coeff).mod(this.p).multiply(this.q).add(c);
}

function RSADecrypt(a) {
    var b = parseBigInt(a, 16);
    var c = this.doPrivate(b);
    if (c == null) {
        return null;
    }
    return pkcs1unpad2(c, this.n.bitLength() + 7 >> 3);
}

function RSADecryptOAEP(a, b) {
    var c = parseBigInt(a, 16);
    var d = this.doPrivate(c);
    if (d == null) {
        return null;
    }
    return oaep_unpad(d, this.n.bitLength() + 7 >> 3, b);
}

RSAKey.prototype.doPrivate = RSADoPrivate;

RSAKey.prototype.setPrivate = RSASetPrivate;

RSAKey.prototype.setPrivateEx = RSASetPrivateEx;

RSAKey.prototype.generate = RSAGenerate;

RSAKey.prototype.decrypt = RSADecrypt;

RSAKey.prototype.decryptOAEP = RSADecryptOAEP;

function ECFieldElementFp(a, b) {
    this.x = b;
    this.q = a;
}

function feFpEquals(a) {
    if (a == this) {
        return true;
    }
    return this.q.equals(a.q) && this.x.equals(a.x);
}

function feFpToBigInteger() {
    return this.x;
}

function feFpNegate() {
    return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
}

function feFpAdd(a) {
    return new ECFieldElementFp(this.q, this.x.add(a.toBigInteger()).mod(this.q));
}

function feFpSubtract(a) {
    return new ECFieldElementFp(this.q, this.x.subtract(a.toBigInteger()).mod(this.q));
}

function feFpMultiply(a) {
    return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger()).mod(this.q));
}

function feFpSquare() {
    return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
}

function feFpDivide(a) {
    return new ECFieldElementFp(this.q, this.x.multiply(a.toBigInteger().modInverse(this.q)).mod(this.q));
}

ECFieldElementFp.prototype.equals = feFpEquals;

ECFieldElementFp.prototype.toBigInteger = feFpToBigInteger;

ECFieldElementFp.prototype.negate = feFpNegate;

ECFieldElementFp.prototype.add = feFpAdd;

ECFieldElementFp.prototype.subtract = feFpSubtract;

ECFieldElementFp.prototype.multiply = feFpMultiply;

ECFieldElementFp.prototype.square = feFpSquare;

ECFieldElementFp.prototype.divide = feFpDivide;

function ECPointFp(a, b, c, d) {
    this.curve = a;
    this.x = b;
    this.y = c;
    if (d == null) {
        this.z = BigInteger.ONE;
    } else {
        this.z = d;
    }
    this.zinv = null;
}

function pointFpGetX() {
    if (this.zinv == null) {
        this.zinv = this.z.modInverse(this.curve.q);
    }
    return this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}

function pointFpGetY() {
    if (this.zinv == null) {
        this.zinv = this.z.modInverse(this.curve.q);
    }
    return this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q));
}

function pointFpEquals(a) {
    if (a == this) {
        return true;
    }
    if (this.isInfinity()) {
        return a.isInfinity();
    }
    if (a.isInfinity()) {
        return this.isInfinity();
    }
    var b, c;
    b = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);
    if (!b.equals(BigInteger.ZERO)) {
        return false;
    }
    c = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
    return c.equals(BigInteger.ZERO);
}

function pointFpIsInfinity() {
    if (this.x == null && this.y == null) {
        return true;
    }
    return this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
}

function pointFpNegate() {
    return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
}

function pointFpAdd(a) {
    if (this.isInfinity()) {
        return a;
    }
    if (a.isInfinity()) {
        return this;
    }
    var b = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);
    var c = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
    if (BigInteger.ZERO.equals(c)) {
        if (BigInteger.ZERO.equals(b)) {
            return this.twice();
        }
        return this.curve.getInfinity();
    }
    var d = new BigInteger("3");
    var e = this.x.toBigInteger();
    var f = this.y.toBigInteger();
    var g = a.x.toBigInteger();
    var h = a.y.toBigInteger();
    var i = c.square();
    var j = i.multiply(c);
    var k = e.multiply(i);
    var l = b.square().multiply(this.z);
    var m = l.subtract(k.shiftLeft(1)).multiply(a.z).subtract(j).multiply(c).mod(this.curve.q);
    var n = k.multiply(d).multiply(b).subtract(f.multiply(j)).subtract(l.multiply(b)).multiply(a.z).add(b.multiply(j)).mod(this.curve.q);
    var o = j.multiply(this.z).multiply(a.z).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(m), this.curve.fromBigInteger(n), o);
}

function pointFpTwice() {
    if (this.isInfinity()) {
        return this;
    }
    if (this.y.toBigInteger().signum() == 0) {
        return this.curve.getInfinity();
    }
    var a = new BigInteger("3");
    var b = this.x.toBigInteger();
    var c = this.y.toBigInteger();
    var d = c.multiply(this.z);
    var e = d.multiply(c).mod(this.curve.q);
    var f = this.curve.a.toBigInteger();
    var g = b.square().multiply(a);
    if (!BigInteger.ZERO.equals(f)) {
        g = g.add(this.z.square().multiply(f));
    }
    g = g.mod(this.curve.q);
    var h = g.square().subtract(b.shiftLeft(3).multiply(e)).shiftLeft(1).multiply(d).mod(this.curve.q);
    var i = g.multiply(a).multiply(b).subtract(e.shiftLeft(1)).shiftLeft(2).multiply(e).subtract(g.square().multiply(g)).mod(this.curve.q);
    var j = d.square().multiply(d).shiftLeft(3).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(h), this.curve.fromBigInteger(i), j);
}

function pointFpMultiply(a) {
    if (this.isInfinity()) {
        return this;
    }
    if (a.signum() == 0) {
        return this.curve.getInfinity();
    }
    var b = a;
    var c = b.multiply(new BigInteger("3"));
    var d = this.negate();
    var e = this;
    var f;
    for (f = c.bitLength() - 2; f > 0; --f) {
        e = e.twice();
        var g = c.testBit(f);
        var h = b.testBit(f);
        if (g != h) {
            e = e.add(g ? this : d);
        }
    }
    return e;
}

function pointFpMultiplyTwo(a, b, c) {
    var d;
    if (a.bitLength() > c.bitLength()) {
        d = a.bitLength() - 1;
    } else {
        d = c.bitLength() - 1;
    }
    var e = this.curve.getInfinity();
    var f = this.add(b);
    while (d >= 0) {
        e = e.twice();
        if (a.testBit(d)) {
            if (c.testBit(d)) {
                e = e.add(f);
            } else {
                e = e.add(this);
            }
        } else {
            if (c.testBit(d)) {
                e = e.add(b);
            }
        }
        --d;
    }
    return e;
}

ECPointFp.prototype.getX = pointFpGetX;

ECPointFp.prototype.getY = pointFpGetY;

ECPointFp.prototype.equals = pointFpEquals;

ECPointFp.prototype.isInfinity = pointFpIsInfinity;

ECPointFp.prototype.negate = pointFpNegate;

ECPointFp.prototype.add = pointFpAdd;

ECPointFp.prototype.twice = pointFpTwice;

ECPointFp.prototype.multiply = pointFpMultiply;

ECPointFp.prototype.multiplyTwo = pointFpMultiplyTwo;

function ECCurveFp(a, b, c) {
    this.q = a;
    this.a = this.fromBigInteger(b);
    this.b = this.fromBigInteger(c);
    this.infinity = new ECPointFp(this, null, null);
}

function curveFpGetQ() {
    return this.q;
}

function curveFpGetA() {
    return this.a;
}

function curveFpGetB() {
    return this.b;
}

function curveFpEquals(a) {
    if (a == this) {
        return true;
    }
    return this.q.equals(a.q) && this.a.equals(a.a) && this.b.equals(a.b);
}

function curveFpGetInfinity() {
    return this.infinity;
}

function curveFpFromBigInteger(a) {
    return new ECFieldElementFp(this.q, a);
}

function curveFpDecodePointHex(a) {
    switch (parseInt(a.substr(0, 2), 16)) {
      case 0:
        return this.infinity;

      case 2:
      case 3:
        return null;

      case 4:
      case 6:
      case 7:
        var b = (a.length - 2) / 2;
        var c = a.substr(2, b);
        var d = a.substr(b + 2, b);
        return new ECPointFp(this, this.fromBigInteger(new BigInteger(c, 16)), this.fromBigInteger(new BigInteger(d, 16)));

      default:
        return null;
    }
}

ECCurveFp.prototype.getQ = curveFpGetQ;

ECCurveFp.prototype.getA = curveFpGetA;

ECCurveFp.prototype.getB = curveFpGetB;

ECCurveFp.prototype.equals = curveFpEquals;

ECCurveFp.prototype.getInfinity = curveFpGetInfinity;

ECCurveFp.prototype.fromBigInteger = curveFpFromBigInteger;

ECCurveFp.prototype.decodePointHex = curveFpDecodePointHex;

ECFieldElementFp.prototype.getByteLength = function() {
    return Math.floor((this.toBigInteger().bitLength() + 7) / 8);
};

ECPointFp.prototype.getEncoded = function(a) {
    var b = function(a, b) {
        var c = a.toByteArrayUnsigned();
        if (b < c.length) {
            c = c.slice(c.length - b);
        } else {
            while (b > c.length) {
                c.unshift(0);
            }
        }
        return c;
    };
    var c = this.getX().toBigInteger();
    var d = this.getY().toBigInteger();
    var e = b(c, 32);
    if (a) {
        if (d.isEven()) {
            e.unshift(2);
        } else {
            e.unshift(3);
        }
    } else {
        e.unshift(4);
        e = e.concat(b(d, 32));
    }
    return e;
};

ECPointFp.decodeFrom = function(a, b) {
    var c = b[0];
    var d = b.length - 1;
    var e = b.slice(1, 1 + d / 2);
    var f = b.slice(1 + d / 2, 1 + d);
    e.unshift(0);
    f.unshift(0);
    var g = new BigInteger(e);
    var h = new BigInteger(f);
    return new ECPointFp(a, a.fromBigInteger(g), a.fromBigInteger(h));
};

ECPointFp.decodeFromHex = function(a, b) {
    var c = b.substr(0, 2);
    var d = b.length - 2;
    var e = b.substr(2, d / 2);
    var f = b.substr(2 + d / 2, d / 2);
    var g = new BigInteger(e, 16);
    var h = new BigInteger(f, 16);
    return new ECPointFp(a, a.fromBigInteger(g), a.fromBigInteger(h));
};

ECPointFp.prototype.add2D = function(a) {
    if (this.isInfinity()) {
        return a;
    }
    if (a.isInfinity()) {
        return this;
    }
    if (this.x.equals(a.x)) {
        if (this.y.equals(a.y)) {
            return this.twice();
        }
        return this.curve.getInfinity();
    }
    var b = a.x.subtract(this.x);
    var c = a.y.subtract(this.y);
    var d = c.divide(b);
    var e = d.square().subtract(this.x).subtract(a.x);
    var f = d.multiply(this.x.subtract(e)).subtract(this.y);
    return new ECPointFp(this.curve, e, f);
};

ECPointFp.prototype.twice2D = function() {
    if (this.isInfinity()) {
        return this;
    }
    if (this.y.toBigInteger().signum() == 0) {
        return this.curve.getInfinity();
    }
    var a = this.curve.fromBigInteger(BigInteger.valueOf(2));
    var b = this.curve.fromBigInteger(BigInteger.valueOf(3));
    var c = this.x.square().multiply(b).add(this.curve.a).divide(this.y.multiply(a));
    var d = c.square().subtract(this.x.multiply(a));
    var e = c.multiply(this.x.subtract(d)).subtract(this.y);
    return new ECPointFp(this.curve, d, e);
};

ECPointFp.prototype.multiply2D = function(a) {
    if (this.isInfinity()) {
        return this;
    }
    if (a.signum() == 0) {
        return this.curve.getInfinity();
    }
    var b = a;
    var c = b.multiply(new BigInteger("3"));
    var d = this.negate();
    var e = this;
    var f;
    for (f = c.bitLength() - 2; f > 0; --f) {
        e = e.twice();
        var g = c.testBit(f);
        var h = b.testBit(f);
        if (g != h) {
            e = e.add2D(g ? this : d);
        }
    }
    return e;
};

ECPointFp.prototype.isOnCurve = function() {
    var a = this.getX().toBigInteger();
    var b = this.getY().toBigInteger();
    var c = this.curve.getA().toBigInteger();
    var d = this.curve.getB().toBigInteger();
    var e = this.curve.getQ();
    var f = b.multiply(b).mod(e);
    var g = a.multiply(a).multiply(a).add(c.multiply(a)).add(d).mod(e);
    return f.equals(g);
};

ECPointFp.prototype.toString = function() {
    return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")";
};

ECPointFp.prototype.validate = function() {
    var a = this.curve.getQ();
    if (this.isInfinity()) {
        throw new Error("Point is at infinity.");
    }
    var b = this.getX().toBigInteger();
    var c = this.getY().toBigInteger();
    if (b.compareTo(BigInteger.ONE) < 0 || b.compareTo(a.subtract(BigInteger.ONE)) > 0) {
        throw new Error("x coordinate out of bounds");
    }
    if (c.compareTo(BigInteger.ONE) < 0 || c.compareTo(a.subtract(BigInteger.ONE)) > 0) {
        throw new Error("y coordinate out of bounds");
    }
    if (!this.isOnCurve()) {
        throw new Error("Point is not on the curve.");
    }
    if (this.multiply(a).isInfinity()) {
        throw new Error("Point is not a scalar multiple of G.");
    }
    return true;
};

if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {};
}

if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {};
}

KJUR.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(a) {
        var b = a.toString(16);
        if (b.length % 2 == 1) {
            b = "0" + b;
        }
        return b;
    };
    this.bigIntToMinTwosComplementsHex = function(a) {
        var b = a.toString(16);
        if (b.substr(0, 1) != "-") {
            if (b.length % 2 == 1) {
                b = "0" + b;
            } else {
                if (!b.match(/^[0-7]/)) {
                    b = "00" + b;
                }
            }
        } else {
            var c = b.substr(1);
            var d = c.length;
            if (d % 2 == 1) {
                d += 1;
            } else {
                if (!b.match(/^[0-7]/)) {
                    d += 2;
                }
            }
            var e = "";
            for (var f = 0; f < d; f++) {
                e += "f";
            }
            var g = new BigInteger(e, 16);
            var h = g.xor(a).add(BigInteger.ONE);
            b = h.toString(16).replace(/^-/, "");
        }
        return b;
    };
    this.getPEMStringFromHex = function(a, b) {
        var c = KJUR.asn1;
        var d = CryptoJS.enc.Hex.parse(a);
        var e = CryptoJS.enc.Base64.stringify(d);
        var f = e.replace(/(.{64})/g, "$1\r\n");
        f = f.replace(/\r\n$/, "");
        return "-----BEGIN " + b + "-----\r\n" + f + "\r\n-----END " + b + "-----\r\n";
    };
    this.newObject = function(a) {
        var b = KJUR.asn1;
        var c = Object.keys(a);
        if (c.length != 1) {
            throw "key of param shall be only one.";
        }
        var d = c[0];
        if (":bool:int:bitstr:octstr:null:oid:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + d + ":") == -1) {
            throw "undefined key: " + d;
        }
        if (d == "bool") {
            return new b.DERBoolean(a[d]);
        }
        if (d == "int") {
            return new b.DERInteger(a[d]);
        }
        if (d == "bitstr") {
            return new b.DERBitString(a[d]);
        }
        if (d == "octstr") {
            return new b.DEROctetString(a[d]);
        }
        if (d == "null") {
            return new b.DERNull(a[d]);
        }
        if (d == "oid") {
            return new b.DERObjectIdentifier(a[d]);
        }
        if (d == "utf8str") {
            return new b.DERUTF8String(a[d]);
        }
        if (d == "numstr") {
            return new b.DERNumericString(a[d]);
        }
        if (d == "prnstr") {
            return new b.DERPrintableString(a[d]);
        }
        if (d == "telstr") {
            return new b.DERTeletexString(a[d]);
        }
        if (d == "ia5str") {
            return new b.DERIA5String(a[d]);
        }
        if (d == "utctime") {
            return new b.DERUTCTime(a[d]);
        }
        if (d == "gentime") {
            return new b.DERGeneralizedTime(a[d]);
        }
        if (d == "seq") {
            var e = a[d];
            var f = [];
            for (var g = 0; g < e.length; g++) {
                var h = b.ASN1Util.newObject(e[g]);
                f.push(h);
            }
            return new b.DERSequence({
                array: f
            });
        }
        if (d == "set") {
            var e = a[d];
            var f = [];
            for (var g = 0; g < e.length; g++) {
                var h = b.ASN1Util.newObject(e[g]);
                f.push(h);
            }
            return new b.DERSet({
                array: f
            });
        }
        if (d == "tag") {
            var i = {};
            if (a[d].explicit !== undefined) {
                i.explicit = a[d].explicit;
            }
            if (a[d].tag !== undefined) {
                i.tag = a[d].tag;
            }
            if (a[d].obj === undefined) {
                throw "obj shall be specified for 'tag'.";
            }
            i.obj = b.ASN1Util.newObject(a[d].obj);
            return new b.DERTaggedObject(i);
        }
    };
}();

KJUR.asn1.ASN1Object = function() {
    var a = true;
    var b = null;
    var c = "00";
    var d = "00";
    var e = "";
    this.getLengthHexFromValue = function() {
        if (typeof this.hV == "undefined" || this.hV == null) {
            throw "this.hV is null or undefined.";
        }
        if (this.hV.length % 2 == 1) {
            throw "value hex must be even length: n=" + e.length + ",v=" + this.hV;
        }
        var a = this.hV.length / 2;
        var b = a.toString(16);
        if (b.length % 2 == 1) {
            b = "0" + b;
        }
        if (a < 128) {
            return b;
        } else {
            var c = b.length / 2;
            if (c > 15) {
                throw "ASN.1 length too long to represent by 8x: n = " + a.toString(16);
            }
            var d = 128 + c;
            return d.toString(16) + b;
        }
    };
    this.getEncodedHex = function() {
        if (this.hTLV == null || this.isModified) {
            this.hV = this.getFreshValueHex();
            this.hL = this.getLengthHexFromValue();
            this.hTLV = this.hT + this.hL + this.hV;
            this.isModified = false;
        }
        return this.hTLV;
    };
    this.getValueHex = function() {
        this.getEncodedHex();
        return this.hV;
    };
    this.getFreshValueHex = function() {
        return "";
    };
};

KJUR.asn1.DERAbstractString = function(a) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var b = null;
    var c = null;
    this.getString = function() {
        return this.s;
    };
    this.setString = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.s = a;
        this.hV = stohex(this.s);
    };
    this.setStringHex = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = a;
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
    if (typeof a != "undefined") {
        if (typeof a == "string") {
            this.setString(a);
        } else {
            if (typeof a.str != "undefined") {
                this.setString(a.str);
            } else {
                if (typeof a.hex != "undefined") {
                    this.setStringHex(a.hex);
                }
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);

KJUR.asn1.DERAbstractTime = function(a) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    var b = null;
    var c = null;
    this.localDateToUTC = function(a) {
        utc = a.getTime() + a.getTimezoneOffset() * 6e4;
        var b = new Date(utc);
        return b;
    };
    this.formatDate = function(a, b) {
        var c = this.zeroPadding;
        var d = this.localDateToUTC(a);
        var e = String(d.getFullYear());
        if (b == "utc") {
            e = e.substr(2, 2);
        }
        var f = c(String(d.getMonth() + 1), 2);
        var g = c(String(d.getDate()), 2);
        var h = c(String(d.getHours()), 2);
        var i = c(String(d.getMinutes()), 2);
        var j = c(String(d.getSeconds()), 2);
        return e + f + g + h + i + j + "Z";
    };
    this.zeroPadding = function(a, b) {
        if (a.length >= b) {
            return a;
        }
        return new Array(b - a.length + 1).join("0") + a;
    };
    this.getString = function() {
        return this.s;
    };
    this.setString = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.s = a;
        this.hV = stohex(a);
    };
    this.setByDateValue = function(a, b, c, d, e, f) {
        var g = new Date(Date.UTC(a, b - 1, c, d, e, f, 0));
        this.setByDate(g);
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
};

YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);

KJUR.asn1.DERAbstractStructured = function(a) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var b = null;
    this.setByASN1ObjectArray = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.asn1Array = a;
    };
    this.appendASN1Object = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.asn1Array.push(a);
    };
    this.asn1Array = new Array();
    if (typeof a != "undefined") {
        if (typeof a.array != "undefined") {
            this.asn1Array = a.array;
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);

KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
};

YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);

KJUR.asn1.DERInteger = function(a) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";
    this.setByBigInteger = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a);
    };
    this.setByInteger = function(a) {
        var b = new BigInteger(String(a), 10);
        this.setByBigInteger(b);
    };
    this.setValueHex = function(a) {
        this.hV = a;
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
    if (typeof a != "undefined") {
        if (typeof a.bigint != "undefined") {
            this.setByBigInteger(a.bigint);
        } else {
            if (typeof a["int"] != "undefined") {
                this.setByInteger(a["int"]);
            } else {
                if (typeof a == "number") {
                    this.setByInteger(a);
                } else {
                    if (typeof a.hex != "undefined") {
                        this.setValueHex(a.hex);
                    }
                }
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);

KJUR.asn1.DERBitString = function(a) {
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";
    this.setHexValueIncludingUnusedBits = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.hV = a;
    };
    this.setUnusedBitsAndHexValue = function(a, b) {
        if (a < 0 || 7 < a) {
            throw "unused bits shall be from 0 to 7: u = " + a;
        }
        var c = "0" + a;
        this.hTLV = null;
        this.isModified = true;
        this.hV = c + b;
    };
    this.setByBinaryString = function(a) {
        a = a.replace(/0+$/, "");
        var b = 8 - a.length % 8;
        if (b == 8) {
            b = 0;
        }
        for (var c = 0; c <= b; c++) {
            a += "0";
        }
        var d = "";
        for (var c = 0; c < a.length - 1; c += 8) {
            var e = a.substr(c, 8);
            var f = parseInt(e, 2).toString(16);
            if (f.length == 1) {
                f = "0" + f;
            }
            d += f;
        }
        this.hTLV = null;
        this.isModified = true;
        this.hV = "0" + b + d;
    };
    this.setByBooleanArray = function(a) {
        var b = "";
        for (var c = 0; c < a.length; c++) {
            if (a[c] == true) {
                b += "1";
            } else {
                b += "0";
            }
        }
        this.setByBinaryString(b);
    };
    this.newFalseArray = function(a) {
        var b = new Array(a);
        for (var c = 0; c < a; c++) {
            b[c] = false;
        }
        return b;
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
    if (typeof a != "undefined") {
        if (typeof a == "string" && a.toLowerCase().match(/^[0-9a-f]+$/)) {
            this.setHexValueIncludingUnusedBits(a);
        } else {
            if (typeof a.hex != "undefined") {
                this.setHexValueIncludingUnusedBits(a.hex);
            } else {
                if (typeof a.bin != "undefined") {
                    this.setByBinaryString(a.bin);
                } else {
                    if (typeof a.array != "undefined") {
                        this.setByBooleanArray(a.array);
                    }
                }
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);

KJUR.asn1.DEROctetString = function(a) {
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, a);
    this.hT = "04";
};

YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);

KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
};

YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);

KJUR.asn1.DERObjectIdentifier = function(a) {
    var b = function(a) {
        var b = a.toString(16);
        if (b.length == 1) {
            b = "0" + b;
        }
        return b;
    };
    var c = function(a) {
        var c = "";
        var d = new BigInteger(a, 10);
        var e = d.toString(2);
        var f = 7 - e.length % 7;
        if (f == 7) {
            f = 0;
        }
        var g = "";
        for (var h = 0; h < f; h++) {
            g += "0";
        }
        e = g + e;
        for (var h = 0; h < e.length - 1; h += 7) {
            var i = e.substr(h, 7);
            if (h != e.length - 7) {
                i = "1" + i;
            }
            c += b(parseInt(i, 2));
        }
        return c;
    };
    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    this.setValueHex = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = a;
    };
    this.setValueOidString = function(a) {
        if (!a.match(/^[0-9.]+$/)) {
            throw "malformed oid string: " + a;
        }
        var d = "";
        var e = a.split(".");
        var f = parseInt(e[0]) * 40 + parseInt(e[1]);
        d += b(f);
        e.splice(0, 2);
        for (var g = 0; g < e.length; g++) {
            d += c(e[g]);
        }
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = d;
    };
    this.setValueName = function(a) {
        if (typeof KJUR.asn1.x509.OID.name2oidList[a] != "undefined") {
            var b = KJUR.asn1.x509.OID.name2oidList[a];
            this.setValueOidString(b);
        } else {
            throw "DERObjectIdentifier oidName undefined: " + a;
        }
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
    if (typeof a != "undefined") {
        if (typeof a == "string" && a.match(/^[0-2].[0-9.]+$/)) {
            this.setValueOidString(a);
        } else {
            if (KJUR.asn1.x509.OID.name2oidList[a] !== undefined) {
                this.setValueOidString(KJUR.asn1.x509.OID.name2oidList[a]);
            } else {
                if (typeof a.oid != "undefined") {
                    this.setValueOidString(a.oid);
                } else {
                    if (typeof a.hex != "undefined") {
                        this.setValueHex(a.hex);
                    } else {
                        if (typeof a.name != "undefined") {
                            this.setValueName(a.name);
                        }
                    }
                }
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);

KJUR.asn1.DERUTF8String = function(a) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, a);
    this.hT = "0c";
};

YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);

KJUR.asn1.DERNumericString = function(a) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, a);
    this.hT = "12";
};

YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);

KJUR.asn1.DERPrintableString = function(a) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, a);
    this.hT = "13";
};

YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);

KJUR.asn1.DERTeletexString = function(a) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, a);
    this.hT = "14";
};

YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);

KJUR.asn1.DERIA5String = function(a) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, a);
    this.hT = "16";
};

YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);

KJUR.asn1.DERUTCTime = function(a) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, a);
    this.hT = "17";
    this.setByDate = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.date = a;
        this.s = this.formatDate(this.date, "utc");
        this.hV = stohex(this.s);
    };
    if (typeof a != "undefined") {
        if (typeof a.str != "undefined") {
            this.setString(a.str);
        } else {
            if (typeof a == "string" && a.match(/^[0-9]{12}Z$/)) {
                this.setString(a);
            } else {
                if (typeof a.hex != "undefined") {
                    this.setStringHex(a.hex);
                } else {
                    if (typeof a.date != "undefined") {
                        this.setByDate(a.date);
                    }
                }
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);

KJUR.asn1.DERGeneralizedTime = function(a) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, a);
    this.hT = "18";
    this.setByDate = function(a) {
        this.hTLV = null;
        this.isModified = true;
        this.date = a;
        this.s = this.formatDate(this.date, "gen");
        this.hV = stohex(this.s);
    };
    if (typeof a != "undefined") {
        if (typeof a.str != "undefined") {
            this.setString(a.str);
        } else {
            if (typeof a == "string" && a.match(/^[0-9]{14}Z$/)) {
                this.setString(a);
            } else {
                if (typeof a.hex != "undefined") {
                    this.setStringHex(a.hex);
                } else {
                    if (typeof a.date != "undefined") {
                        this.setByDate(a.date);
                    }
                }
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);

KJUR.asn1.DERSequence = function(a) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, a);
    this.hT = "30";
    this.getFreshValueHex = function() {
        var a = "";
        for (var b = 0; b < this.asn1Array.length; b++) {
            var c = this.asn1Array[b];
            a += c.getEncodedHex();
        }
        this.hV = a;
        return this.hV;
    };
};

YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

KJUR.asn1.DERSet = function(a) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, a);
    this.hT = "31";
    this.getFreshValueHex = function() {
        var a = new Array();
        for (var b = 0; b < this.asn1Array.length; b++) {
            var c = this.asn1Array[b];
            a.push(c.getEncodedHex());
        }
        a.sort();
        this.hV = a.join("");
        return this.hV;
    };
};

YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);

KJUR.asn1.DERTaggedObject = function(a) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = "";
    this.isExplicit = true;
    this.asn1Object = null;
    this.setASN1Object = function(a, b, c) {
        this.hT = b;
        this.isExplicit = a;
        this.asn1Object = c;
        if (this.isExplicit) {
            this.hV = this.asn1Object.getEncodedHex();
            this.hTLV = null;
            this.isModified = true;
        } else {
            this.hV = null;
            this.hTLV = c.getEncodedHex();
            this.hTLV = this.hTLV.replace(/^../, b);
            this.isModified = false;
        }
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
    if (typeof a != "undefined") {
        if (typeof a.tag != "undefined") {
            this.hT = a.tag;
        }
        if (typeof a.explicit != "undefined") {
            this.isExplicit = a.explicit;
        }
        if (typeof a.obj != "undefined") {
            this.asn1Object = a.obj;
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);

var ASN1HEX = new function() {
    this.getByteLengthOfL_AtObj = function(a, b) {
        if (a.substring(b + 2, b + 3) != "8") {
            return 1;
        }
        var c = parseInt(a.substring(b + 3, b + 4));
        if (c == 0) {
            return -1;
        }
        if (0 < c && c < 10) {
            return c + 1;
        }
        return -2;
    };
    this.getHexOfL_AtObj = function(a, b) {
        var c = this.getByteLengthOfL_AtObj(a, b);
        if (c < 1) {
            return "";
        }
        return a.substring(b + 2, b + 2 + c * 2);
    };
    this.getIntOfL_AtObj = function(a, b) {
        var c = this.getHexOfL_AtObj(a, b);
        if (c == "") {
            return -1;
        }
        var d;
        if (parseInt(c.substring(0, 1)) < 8) {
            d = new BigInteger(c, 16);
        } else {
            d = new BigInteger(c.substring(2), 16);
        }
        return d.intValue();
    };
    this.getStartPosOfV_AtObj = function(a, b) {
        var c = this.getByteLengthOfL_AtObj(a, b);
        if (c < 0) {
            return c;
        }
        return b + (c + 1) * 2;
    };
    this.getHexOfV_AtObj = function(a, b) {
        var c = this.getStartPosOfV_AtObj(a, b);
        var d = this.getIntOfL_AtObj(a, b);
        return a.substring(c, c + d * 2);
    };
    this.getHexOfTLV_AtObj = function(a, b) {
        var c = a.substr(b, 2);
        var d = this.getHexOfL_AtObj(a, b);
        var e = this.getHexOfV_AtObj(a, b);
        return c + d + e;
    };
    this.getPosOfNextSibling_AtObj = function(a, b) {
        var c = this.getStartPosOfV_AtObj(a, b);
        var d = this.getIntOfL_AtObj(a, b);
        return c + d * 2;
    };
    this.getPosArrayOfChildren_AtObj = function(a, b) {
        var c = new Array();
        var d = this.getStartPosOfV_AtObj(a, b);
        c.push(d);
        var e = this.getIntOfL_AtObj(a, b);
        var f = d;
        var g = 0;
        while (1) {
            var h = this.getPosOfNextSibling_AtObj(a, f);
            if (h == null || h - d >= e * 2) {
                break;
            }
            if (g >= 200) {
                break;
            }
            c.push(h);
            f = h;
            g++;
        }
        return c;
    };
    this.getNthChildIndex_AtObj = function(a, b, c) {
        var d = this.getPosArrayOfChildren_AtObj(a, b);
        return d[c];
    };
    this.getDecendantIndexByNthList = function(a, b, c) {
        if (c.length == 0) {
            return b;
        }
        var d = c.shift();
        var e = this.getPosArrayOfChildren_AtObj(a, b);
        return this.getDecendantIndexByNthList(a, e[d], c);
    };
    this.getDecendantHexTLVByNthList = function(a, b, c) {
        var d = this.getDecendantIndexByNthList(a, b, c);
        return this.getHexOfTLV_AtObj(a, d);
    };
    this.getDecendantHexVByNthList = function(a, b, c) {
        var d = this.getDecendantIndexByNthList(a, b, c);
        return this.getHexOfV_AtObj(a, d);
    };
}();

if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {};
}

if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1) {
    KJUR.asn1 = {};
}

if (typeof KJUR.asn1.x509 == "undefined" || !KJUR.asn1.x509) {
    KJUR.asn1.x509 = {};
}

KJUR.asn1.x509.Certificate = function(a) {
    KJUR.asn1.x509.Certificate.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var d = null;
    var e = null;
    var f = null;
    this.setRsaPrvKeyByPEMandPass = function(a, b) {
        var c = PKCS5PKEY.getDecryptedKeyHex(a, b);
        var d = new RSAKey();
        d.readPrivateKeyFromASN1HexString(c);
        this.rsaPrvKey = d;
    };
    this.sign = function() {
        this.asn1SignatureAlg = this.asn1TBSCert.asn1SignatureAlg;
        sig = new KJUR.crypto.Signature({
            alg: "SHA1withRSA",
            prov: "cryptojs/jsrsa"
        });
        sig.initSign(this.rsaPrvKey);
        sig.updateHex(this.asn1TBSCert.getEncodedHex());
        this.hexSig = sig.sign();
        this.asn1Sig = new KJUR.asn1.DERBitString({
            hex: "00" + this.hexSig
        });
        var a = new KJUR.asn1.DERSequence({
            array: [ this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig ]
        });
        this.hTLV = a.getEncodedHex();
        this.isModified = false;
    };
    this.getEncodedHex = function() {
        if (this.isModified == false && this.hTLV != null) {
            return this.hTLV;
        }
        throw "not signed yet";
    };
    this.getPEMString = function() {
        var a = this.getEncodedHex();
        var b = CryptoJS.enc.Hex.parse(a);
        var c = CryptoJS.enc.Base64.stringify(b);
        var d = c.replace(/(.{64})/g, "$1\r\n");
        return "-----BEGIN CERTIFICATE-----\r\n" + d + "\r\n-----END CERTIFICATE-----\r\n";
    };
    if (typeof a != "undefined") {
        if (typeof a.tbscertobj != "undefined") {
            this.asn1TBSCert = a.tbscertobj;
        }
        if (typeof a.rsaprvkey != "undefined") {
            this.rsaPrvKey = a.rsaprvkey;
        }
        if (typeof a.rsaprvpem != "undefined" && typeof a.rsaprvpas != "undefined") {
            this.setRsaPrvKeyByPEMandPass(a.rsaprvpem, a.rsaprvpas);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.Certificate, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.TBSCertificate = function(a) {
    KJUR.asn1.x509.TBSCertificate.superclass.constructor.call(this);
    this._initialize = function() {
        this.asn1Array = new Array();
        this.asn1Version = new KJUR.asn1.DERTaggedObject({
            obj: new KJUR.asn1.DERInteger({
                "int": 2
            })
        });
        this.asn1SerialNumber = null;
        this.asn1SignatureAlg = null;
        this.asn1Issuer = null;
        this.asn1NotBefore = null;
        this.asn1NotAfter = null;
        this.asn1Subject = null;
        this.asn1SubjPKey = null;
        this.extensionsArray = new Array();
    };
    this.setSerialNumberByParam = function(a) {
        this.asn1SerialNumber = new KJUR.asn1.DERInteger(a);
    };
    this.setSignatureAlgByParam = function(a) {
        this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(a);
    };
    this.setIssuerByParam = function(a) {
        this.asn1Issuer = new KJUR.asn1.x509.X500Name(a);
    };
    this.setNotBeforeByParam = function(a) {
        this.asn1NotBefore = new KJUR.asn1.x509.Time(a);
    };
    this.setNotAfterByParam = function(a) {
        this.asn1NotAfter = new KJUR.asn1.x509.Time(a);
    };
    this.setSubjectByParam = function(a) {
        this.asn1Subject = new KJUR.asn1.x509.X500Name(a);
    };
    this.setSubjectPublicKeyByParam = function(a) {
        this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(a);
    };
    this.appendExtension = function(a) {
        this.extensionsArray.push(a);
    };
    this.getEncodedHex = function() {
        if (this.asn1NotBefore == null || this.asn1NotAfter == null) {
            throw "notBefore and/or notAfter not set";
        }
        var a = new KJUR.asn1.DERSequence({
            array: [ this.asn1NotBefore, this.asn1NotAfter ]
        });
        this.asn1Array = new Array();
        this.asn1Array.push(this.asn1Version);
        this.asn1Array.push(this.asn1SerialNumber);
        this.asn1Array.push(this.asn1SignatureAlg);
        this.asn1Array.push(this.asn1Issuer);
        this.asn1Array.push(a);
        this.asn1Array.push(this.asn1Subject);
        this.asn1Array.push(this.asn1SubjPKey);
        if (this.extensionsArray.length > 0) {
            var b = new KJUR.asn1.DERSequence({
                array: this.extensionsArray
            });
            var c = new KJUR.asn1.DERTaggedObject({
                explicit: true,
                tag: "a3",
                obj: b
            });
            this.asn1Array.push(c);
        }
        var d = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.hTLV = d.getEncodedHex();
        this.isModified = false;
        return this.hTLV;
    };
    this._initialize();
};

YAHOO.lang.extend(KJUR.asn1.x509.TBSCertificate, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.Extension = function(a) {
    KJUR.asn1.x509.Extension.superclass.constructor.call(this);
    var b = null;
    this.getEncodedHex = function() {
        var a = new KJUR.asn1.DERObjectIdentifier({
            oid: this.oid
        });
        var b = new KJUR.asn1.DEROctetString({
            hex: this.getExtnValueHex()
        });
        var c = new Array();
        c.push(a);
        if (this.critical) {
            c.push(new KJUR.asn1.DERBoolean());
        }
        c.push(b);
        var d = new KJUR.asn1.DERSequence({
            array: c
        });
        return d.getEncodedHex();
    };
    this.critical = false;
    if (typeof a != "undefined") {
        if (typeof a.critical != "undefined") {
            this.critical = a.critical;
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.Extension, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.KeyUsage = function(a) {
    KJUR.asn1.x509.KeyUsage.superclass.constructor.call(this, a);
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex();
    };
    this.oid = "2.5.29.15";
    if (typeof a != "undefined") {
        if (typeof a.bin != "undefined") {
            this.asn1ExtnValue = new KJUR.asn1.DERBitString(a);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.KeyUsage, KJUR.asn1.x509.Extension);

KJUR.asn1.x509.BasicConstraints = function(a) {
    KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this, a);
    var b = false;
    var c = -1;
    this.getExtnValueHex = function() {
        var a = new Array();
        if (this.cA) {
            a.push(new KJUR.asn1.DERBoolean());
        }
        if (this.pathLen > -1) {
            a.push(new KJUR.asn1.DERInteger({
                "int": this.pathLen
            }));
        }
        var b = new KJUR.asn1.DERSequence({
            array: a
        });
        this.asn1ExtnValue = b;
        return this.asn1ExtnValue.getEncodedHex();
    };
    this.oid = "2.5.29.19";
    this.cA = false;
    this.pathLen = -1;
    if (typeof a != "undefined") {
        if (typeof a.cA != "undefined") {
            this.cA = a.cA;
        }
        if (typeof a.pathLen != "undefined") {
            this.pathLen = a.pathLen;
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.BasicConstraints, KJUR.asn1.x509.Extension);

KJUR.asn1.x509.CRLDistributionPoints = function(a) {
    KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, a);
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex();
    };
    this.setByDPArray = function(a) {
        this.asn1ExtnValue = new KJUR.asn1.DERSequence({
            array: a
        });
    };
    this.setByOneURI = function(a) {
        var b = new KJUR.asn1.x509.GeneralNames([ {
            uri: a
        } ]);
        var c = new KJUR.asn1.x509.DistributionPointName(b);
        var d = new KJUR.asn1.x509.DistributionPoint({
            dpobj: c
        });
        this.setByDPArray([ d ]);
    };
    this.oid = "2.5.29.31";
    if (typeof a != "undefined") {
        if (typeof a.array != "undefined") {
            this.setByDPArray(a.array);
        } else {
            if (typeof a.uri != "undefined") {
                this.setByOneURI(a.uri);
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.CRLDistributionPoints, KJUR.asn1.x509.Extension);

KJUR.asn1.x509.ExtKeyUsage = function(a) {
    KJUR.asn1.x509.ExtKeyUsage.superclass.constructor.call(this, a);
    this.setPurposeArray = function(a) {
        this.asn1ExtnValue = new KJUR.asn1.DERSequence();
        for (var b = 0; b < a.length; b++) {
            var c = new KJUR.asn1.DERObjectIdentifier(a[b]);
            this.asn1ExtnValue.appendASN1Object(c);
        }
    };
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex();
    };
    this.oid = "2.5.29.37";
    if (typeof a != "undefined") {
        if (typeof a.array != "undefined") {
            this.setPurposeArray(a.array);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.ExtKeyUsage, KJUR.asn1.x509.Extension);

KJUR.asn1.x509.CRL = function(a) {
    KJUR.asn1.x509.CRL.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var d = null;
    var e = null;
    var f = null;
    this.setRsaPrvKeyByPEMandPass = function(a, b) {
        var c = PKCS5PKEY.getDecryptedKeyHex(a, b);
        var d = new RSAKey();
        d.readPrivateKeyFromASN1HexString(c);
        this.rsaPrvKey = d;
    };
    this.sign = function() {
        this.asn1SignatureAlg = this.asn1TBSCertList.asn1SignatureAlg;
        sig = new KJUR.crypto.Signature({
            alg: "SHA1withRSA",
            prov: "cryptojs/jsrsa"
        });
        sig.initSign(this.rsaPrvKey);
        sig.updateHex(this.asn1TBSCertList.getEncodedHex());
        this.hexSig = sig.sign();
        this.asn1Sig = new KJUR.asn1.DERBitString({
            hex: "00" + this.hexSig
        });
        var a = new KJUR.asn1.DERSequence({
            array: [ this.asn1TBSCertList, this.asn1SignatureAlg, this.asn1Sig ]
        });
        this.hTLV = a.getEncodedHex();
        this.isModified = false;
    };
    this.getEncodedHex = function() {
        if (this.isModified == false && this.hTLV != null) {
            return this.hTLV;
        }
        throw "not signed yet";
    };
    this.getPEMString = function() {
        var a = this.getEncodedHex();
        var b = CryptoJS.enc.Hex.parse(a);
        var c = CryptoJS.enc.Base64.stringify(b);
        var d = c.replace(/(.{64})/g, "$1\r\n");
        return "-----BEGIN X509 CRL-----\r\n" + d + "\r\n-----END X509 CRL-----\r\n";
    };
    if (typeof a != "undefined") {
        if (typeof a.tbsobj != "undefined") {
            this.asn1TBSCertList = a.tbsobj;
        }
        if (typeof a.rsaprvkey != "undefined") {
            this.rsaPrvKey = a.rsaprvkey;
        }
        if (typeof a.rsaprvpem != "undefined" && typeof a.rsaprvpas != "undefined") {
            this.setRsaPrvKeyByPEMandPass(a.rsaprvpem, a.rsaprvpas);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.CRL, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.TBSCertList = function(a) {
    KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);
    var b = null;
    this.setSignatureAlgByParam = function(a) {
        this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(a);
    };
    this.setIssuerByParam = function(a) {
        this.asn1Issuer = new KJUR.asn1.x509.X500Name(a);
    };
    this.setThisUpdateByParam = function(a) {
        this.asn1ThisUpdate = new KJUR.asn1.x509.Time(a);
    };
    this.setNextUpdateByParam = function(a) {
        this.asn1NextUpdate = new KJUR.asn1.x509.Time(a);
    };
    this.addRevokedCert = function(a, b) {
        var c = {};
        if (a != undefined && a != null) {
            c.sn = a;
        }
        if (b != undefined && b != null) {
            c.time = b;
        }
        var d = new KJUR.asn1.x509.CRLEntry(c);
        this.aRevokedCert.push(d);
    };
    this.getEncodedHex = function() {
        this.asn1Array = new Array();
        if (this.asn1Version != null) {
            this.asn1Array.push(this.asn1Version);
        }
        this.asn1Array.push(this.asn1SignatureAlg);
        this.asn1Array.push(this.asn1Issuer);
        this.asn1Array.push(this.asn1ThisUpdate);
        if (this.asn1NextUpdate != null) {
            this.asn1Array.push(this.asn1NextUpdate);
        }
        if (this.aRevokedCert.length > 0) {
            var a = new KJUR.asn1.DERSequence({
                array: this.aRevokedCert
            });
            this.asn1Array.push(a);
        }
        var b = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.hTLV = b.getEncodedHex();
        this.isModified = false;
        return this.hTLV;
    };
    this._initialize = function() {
        this.asn1Version = null;
        this.asn1SignatureAlg = null;
        this.asn1Issuer = null;
        this.asn1ThisUpdate = null;
        this.asn1NextUpdate = null;
        this.aRevokedCert = new Array();
    };
    this._initialize();
};

YAHOO.lang.extend(KJUR.asn1.x509.TBSCertList, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.CRLEntry = function(a) {
    KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);
    var b = null;
    var c = null;
    this.setCertSerial = function(a) {
        this.sn = new KJUR.asn1.DERInteger(a);
    };
    this.setRevocationDate = function(a) {
        this.time = new KJUR.asn1.x509.Time(a);
    };
    this.getEncodedHex = function() {
        var a = new KJUR.asn1.DERSequence({
            array: [ this.sn, this.time ]
        });
        this.TLV = a.getEncodedHex();
        return this.TLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.time != "undefined") {
            this.setRevocationDate(a.time);
        }
        if (typeof a.sn != "undefined") {
            this.setCertSerial(a.sn);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.CRLEntry, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.X500Name = function(a) {
    KJUR.asn1.x509.X500Name.superclass.constructor.call(this);
    this.asn1Array = new Array();
    this.setByString = function(a) {
        var b = a.split("/");
        b.shift();
        for (var c = 0; c < b.length; c++) {
            this.asn1Array.push(new KJUR.asn1.x509.RDN({
                str: b[c]
            }));
        }
    };
    this.getEncodedHex = function() {
        var a = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.TLV = a.getEncodedHex();
        return this.TLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.str != "undefined") {
            this.setByString(a.str);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.X500Name, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.RDN = function(a) {
    KJUR.asn1.x509.RDN.superclass.constructor.call(this);
    this.asn1Array = new Array();
    this.addByString = function(a) {
        this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({
            str: a
        }));
    };
    this.getEncodedHex = function() {
        var a = new KJUR.asn1.DERSet({
            array: this.asn1Array
        });
        this.TLV = a.getEncodedHex();
        return this.TLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.str != "undefined") {
            this.addByString(a.str);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.RDN, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.AttributeTypeAndValue = function(a) {
    KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var d = "utf8";
    this.setByString = function(a) {
        if (a.match(/^([^=]+)=(.+)$/)) {
            this.setByAttrTypeAndValueStr(RegExp.$1, RegExp.$2);
        } else {
            throw "malformed attrTypeAndValueStr: " + a;
        }
    };
    this.setByAttrTypeAndValueStr = function(a, b) {
        this.typeObj = KJUR.asn1.x509.OID.atype2obj(a);
        var c = d;
        if (a == "C") {
            c = "prn";
        }
        this.valueObj = this.getValueObj(c, b);
    };
    this.getValueObj = function(a, b) {
        if (a == "utf8") {
            return new KJUR.asn1.DERUTF8String({
                str: b
            });
        }
        if (a == "prn") {
            return new KJUR.asn1.DERPrintableString({
                str: b
            });
        }
        if (a == "tel") {
            return new KJUR.asn1.DERTeletexString({
                str: b
            });
        }
        if (a == "ia5") {
            return new KJUR.asn1.DERIA5String({
                str: b
            });
        }
        throw "unsupported directory string type: type=" + a + " value=" + b;
    };
    this.getEncodedHex = function() {
        var a = new KJUR.asn1.DERSequence({
            array: [ this.typeObj, this.valueObj ]
        });
        this.TLV = a.getEncodedHex();
        return this.TLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.str != "undefined") {
            this.setByString(a.str);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.AttributeTypeAndValue, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.SubjectPublicKeyInfo = function(a) {
    KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var d = null;
    this.setRSAKey = function(a) {
        if (!RSAKey.prototype.isPrototypeOf(a)) {
            throw "argument is not RSAKey instance";
        }
        this.rsaKey = a;
        var b = new KJUR.asn1.DERInteger({
            bigint: a.n
        });
        var c = new KJUR.asn1.DERInteger({
            "int": a.e
        });
        var d = new KJUR.asn1.DERSequence({
            array: [ b, c ]
        });
        var e = d.getEncodedHex();
        this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "rsaEncryption"
        });
        this.asn1SubjPKey = new KJUR.asn1.DERBitString({
            hex: "00" + e
        });
    };
    this.setRSAPEM = function(a) {
        if (a.match(/-----BEGIN PUBLIC KEY-----/)) {
            var b = a;
            b = b.replace(/^-----[^-]+-----/, "");
            b = b.replace(/-----[^-]+-----\s*$/, "");
            var c = b.replace(/\s+/g, "");
            var d = CryptoJS.enc.Base64.parse(c);
            var e = CryptoJS.enc.Hex.stringify(d);
            var f = _rsapem_getHexValueArrayOfChildrenFromHex(e);
            var g = f[1];
            var h = g.substr(2);
            var i = _rsapem_getHexValueArrayOfChildrenFromHex(h);
            var j = new RSAKey();
            j.setPublic(i[0], i[1]);
            this.setRSAKey(j);
        } else {
            throw "key not supported";
        }
    };
    this.getEncodedHex = function() {
        if (this.asn1AlgId == null || this.asn1SubjPKey == null) {
            throw "algId and/or subjPubKey not set";
        }
        var a = new KJUR.asn1.DERSequence({
            array: [ this.asn1AlgId, this.asn1SubjPKey ]
        });
        this.hTLV = a.getEncodedHex();
        return this.hTLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.rsakey != "undefined") {
            this.setRSAKey(a.rsakey);
        }
        if (typeof a.rsapem != "undefined") {
            this.setRSAPEM(a.rsapem);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.SubjectPublicKeyInfo, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.Time = function(a) {
    KJUR.asn1.x509.Time.superclass.constructor.call(this);
    var b = null;
    var c = null;
    this.setTimeParams = function(a) {
        this.timeParams = a;
    };
    this.getEncodedHex = function() {
        if (this.timeParams == null) {
            throw "timeParams shall be specified. ({'str':'130403235959Z'}}";
        }
        var a = null;
        if (this.type == "utc") {
            a = new KJUR.asn1.DERUTCTime(this.timeParams);
        } else {
            a = new KJUR.asn1.DERGeneralizedTime(this.timeParams);
        }
        this.TLV = a.getEncodedHex();
        return this.TLV;
    };
    this.type = "utc";
    if (typeof a != "undefined") {
        if (typeof a.type != "undefined") {
            this.type = a.type;
        }
        this.timeParams = a;
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.Time, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.AlgorithmIdentifier = function(a) {
    KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var d = null;
    this.getEncodedHex = function() {
        if (this.nameAlg == null && this.asn1Alg == null) {
            throw "algorithm not specified";
        }
        if (this.nameAlg != null && this.asn1Alg == null) {
            this.asn1Alg = KJUR.asn1.x509.OID.name2obj(this.nameAlg);
        }
        var a = new KJUR.asn1.DERSequence({
            array: [ this.asn1Alg, this.asn1Params ]
        });
        this.hTLV = a.getEncodedHex();
        return this.hTLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.name != "undefined") {
            this.nameAlg = a.name;
        }
        if (typeof a.asn1params != "undefined") {
            this.asn1Params = a.asn1params;
        }
    }
    if (this.asn1Params == null) {
        this.asn1Params = new KJUR.asn1.DERNull();
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.AlgorithmIdentifier, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.GeneralName = function(a) {
    KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var d = {
        rfc822: "81",
        dns: "82",
        uri: "86"
    };
    this.setByParam = function(a) {
        var b = null;
        var c = null;
        if (typeof a.rfc822 != "undefined") {
            this.type = "rfc822";
            c = new KJUR.asn1.DERIA5String({
                str: a[this.type]
            });
        }
        if (typeof a.dns != "undefined") {
            this.type = "dns";
            c = new KJUR.asn1.DERIA5String({
                str: a[this.type]
            });
        }
        if (typeof a.uri != "undefined") {
            this.type = "uri";
            c = new KJUR.asn1.DERIA5String({
                str: a[this.type]
            });
        }
        if (this.type == null) {
            throw "unsupported type in params=" + a;
        }
        this.asn1Obj = new KJUR.asn1.DERTaggedObject({
            explicit: false,
            tag: d[this.type],
            obj: c
        });
    };
    this.getEncodedHex = function() {
        return this.asn1Obj.getEncodedHex();
    };
    if (typeof a != "undefined") {
        this.setByParam(a);
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.GeneralName, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.GeneralNames = function(a) {
    KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);
    var b = null;
    this.setByParamArray = function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = new KJUR.asn1.x509.GeneralName(a[b]);
            this.asn1Array.push(c);
        }
    };
    this.getEncodedHex = function() {
        var a = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        return a.getEncodedHex();
    };
    this.asn1Array = new Array();
    if (typeof a != "undefined") {
        this.setByParamArray(a);
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.GeneralNames, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.DistributionPointName = function(a) {
    KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var d = null;
    var e = null;
    this.getEncodedHex = function() {
        if (this.type != "full") {
            throw "currently type shall be 'full': " + this.type;
        }
        this.asn1Obj = new KJUR.asn1.DERTaggedObject({
            explicit: false,
            tag: this.tag,
            obj: this.asn1V
        });
        this.hTLV = this.asn1Obj.getEncodedHex();
        return this.hTLV;
    };
    if (typeof a != "undefined") {
        if (KJUR.asn1.x509.GeneralNames.prototype.isPrototypeOf(a)) {
            this.type = "full";
            this.tag = "a0";
            this.asn1V = a;
        } else {
            throw "This class supports GeneralNames only as argument";
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.DistributionPointName, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.DistributionPoint = function(a) {
    KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);
    var b = null;
    this.getEncodedHex = function() {
        var a = new KJUR.asn1.DERSequence();
        if (this.asn1DP != null) {
            var b = new KJUR.asn1.DERTaggedObject({
                explicit: true,
                tag: "a0",
                obj: this.asn1DP
            });
            a.appendASN1Object(b);
        }
        this.hTLV = a.getEncodedHex();
        return this.hTLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.dpobj != "undefined") {
            this.asn1DP = a.dpobj;
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.DistributionPoint, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.OID = new function(a) {
    this.atype2oidList = {
        C: "2.5.4.6",
        O: "2.5.4.10",
        OU: "2.5.4.11",
        ST: "2.5.4.8",
        L: "2.5.4.7",
        CN: "2.5.4.3"
    };
    this.name2oidList = {
        sha384: "2.16.840.1.101.3.4.2.2",
        sha224: "2.16.840.1.101.3.4.2.4",
        SHA1withRSA: "1.2.840.113549.1.1.5",
        rsaEncryption: "1.2.840.113549.1.1.1",
        subjectKeyIdentifier: "2.5.29.14",
        countryName: "2.5.4.6",
        organization: "2.5.4.10",
        organizationalUnit: "2.5.4.11",
        stateOrProvinceName: "2.5.4.8",
        locality: "2.5.4.7",
        commonName: "2.5.4.3",
        keyUsage: "2.5.29.15",
        basicConstraints: "2.5.29.19",
        cRLDistributionPoints: "2.5.29.31",
        certificatePolicies: "2.5.29.32",
        authorityKeyIdentifier: "2.5.29.35",
        extKeyUsage: "2.5.29.37",
        anyExtendedKeyUsage: "2.5.29.37.0",
        serverAuth: "1.3.6.1.5.5.7.3.1",
        clientAuth: "1.3.6.1.5.5.7.3.2",
        codeSigning: "1.3.6.1.5.5.7.3.3",
        emailProtection: "1.3.6.1.5.5.7.3.4",
        timeStamping: "1.3.6.1.5.5.7.3.8",
        ocspSigning: "1.3.6.1.5.5.7.3.9"
    };
    this.objCache = {};
    this.name2obj = function(a) {
        if (typeof this.objCache[a] != "undefined") {
            return this.objCache[a];
        }
        if (typeof this.name2oidList[a] == "undefined") {
            throw "Name of ObjectIdentifier not defined: " + a;
        }
        var b = this.name2oidList[a];
        var c = new KJUR.asn1.DERObjectIdentifier({
            oid: b
        });
        this.objCache[a] = c;
        return c;
    };
    this.atype2obj = function(a) {
        if (typeof this.objCache[a] != "undefined") {
            return this.objCache[a];
        }
        if (typeof this.atype2oidList[a] == "undefined") {
            throw "AttributeType name undefined: " + a;
        }
        var b = this.atype2oidList[a];
        var c = new KJUR.asn1.DERObjectIdentifier({
            oid: b
        });
        this.objCache[a] = c;
        return c;
    };
}();

KJUR.asn1.x509.X509Util = new function() {
    this.getPKCS8PubKeyPEMfromRSAKey = function(a) {
        var b = null;
        var c = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(a.n);
        var d = KJUR.asn1.ASN1Util.integerToByteHex(a.e);
        var e = new KJUR.asn1.DERInteger({
            hex: c
        });
        var f = new KJUR.asn1.DERInteger({
            hex: d
        });
        var g = new KJUR.asn1.DERSequence({
            array: [ e, f ]
        });
        var h = g.getEncodedHex();
        var i = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "rsaEncryption"
        });
        var j = new KJUR.asn1.DERBitString({
            hex: "00" + h
        });
        var k = new KJUR.asn1.DERSequence({
            array: [ i, j ]
        });
        var l = k.getEncodedHex();
        var b = KJUR.asn1.ASN1Util.getPEMStringFromHex(l, "PUBLIC KEY");
        return b;
    };
}();

function Base64x() {}

function stoBA(a) {
    var b = new Array();
    for (var c = 0; c < a.length; c++) {
        b[c] = a.charCodeAt(c);
    }
    return b;
}

function BAtos(a) {
    var b = "";
    for (var c = 0; c < a.length; c++) {
        b = b + String.fromCharCode(a[c]);
    }
    return b;
}

function BAtohex(a) {
    var b = "";
    for (var c = 0; c < a.length; c++) {
        var d = a[c].toString(16);
        if (d.length == 1) {
            d = "0" + d;
        }
        b = b + d;
    }
    return b;
}

function stohex(a) {
    return BAtohex(stoBA(a));
}

function stob64(a) {
    return hex2b64(stohex(a));
}

function stob64u(a) {
    return b64tob64u(hex2b64(stohex(a)));
}

function b64utos(a) {
    return BAtos(b64toBA(b64utob64(a)));
}

function b64tob64u(a) {
    a = a.replace(/\=/g, "");
    a = a.replace(/\+/g, "-");
    a = a.replace(/\//g, "_");
    return a;
}

function b64utob64(a) {
    if (a.length % 4 == 2) {
        a = a + "==";
    } else {
        if (a.length % 4 == 3) {
            a = a + "=";
        }
    }
    a = a.replace(/-/g, "+");
    a = a.replace(/_/g, "/");
    return a;
}

function hextob64u(a) {
    return b64tob64u(hex2b64(a));
}

function b64utohex(a) {
    return b64tohex(b64utob64(a));
}

var utf8tob64u, b64utoutf8;

if (typeof Buffer === "function") {
    utf8tob64u = function(a) {
        return b64tob64u(new Buffer(a, "utf8").toString("base64"));
    };
    b64utoutf8 = function(a) {
        return new Buffer(b64utob64(a), "base64").toString("utf8");
    };
} else {
    utf8tob64u = function(a) {
        return hextob64u(uricmptohex(encodeURIComponentAll(a)));
    };
    b64utoutf8 = function(a) {
        return decodeURIComponent(hextouricmp(b64utohex(a)));
    };
}

function utf8tob64(a) {
    return hex2b64(uricmptohex(encodeURIComponentAll(a)));
}

function b64toutf8(a) {
    return decodeURIComponent(hextouricmp(b64tohex(a)));
}

function utf8tohex(a) {
    return uricmptohex(encodeURIComponentAll(a));
}

function hextoutf8(a) {
    return decodeURIComponent(hextouricmp(a));
}

function hextorstr(a) {
    var b = "";
    for (var c = 0; c < a.length - 1; c += 2) {
        b += String.fromCharCode(parseInt(a.substr(c, 2), 16));
    }
    return b;
}

function rstrtohex(a) {
    var b = "";
    for (var c = 0; c < a.length; c++) {
        b += ("0" + a.charCodeAt(c).toString(16)).slice(-2);
    }
    return b;
}

function uricmptohex(a) {
    return a.replace(/%/g, "");
}

function hextouricmp(a) {
    return a.replace(/(..)/g, "%$1");
}

function encodeURIComponentAll(a) {
    var b = encodeURIComponent(a);
    var c = "";
    for (var d = 0; d < b.length; d++) {
        if (b[d] == "%") {
            c = c + b.substr(d, 3);
            d = d + 2;
        } else {
            c = c + "%" + stohex(b[d]);
        }
    }
    return c;
}

function newline_toUnix(a) {
    a = a.replace(/\r\n/gm, "\n");
    return a;
}

function newline_toDos(a) {
    a = a.replace(/\r\n/gm, "\n");
    a = a.replace(/\n/gm, "\r\n");
    return a;
}

if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {};
}

if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {};
}

KJUR.crypto.Util = new function() {
    this.DIGESTINFOHEAD = {
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        ripemd160: "3021300906052b2403020105000414"
    };
    this.DEFAULTPROVIDER = {
        md5: "cryptojs",
        sha1: "cryptojs",
        sha224: "cryptojs",
        sha256: "cryptojs",
        sha384: "cryptojs",
        sha512: "cryptojs",
        ripemd160: "cryptojs",
        hmacmd5: "cryptojs",
        hmacsha1: "cryptojs",
        hmacsha224: "cryptojs",
        hmacsha256: "cryptojs",
        hmacsha384: "cryptojs",
        hmacsha512: "cryptojs",
        hmacripemd160: "cryptojs",
        MD5withRSA: "cryptojs/jsrsa",
        SHA1withRSA: "cryptojs/jsrsa",
        SHA224withRSA: "cryptojs/jsrsa",
        SHA256withRSA: "cryptojs/jsrsa",
        SHA384withRSA: "cryptojs/jsrsa",
        SHA512withRSA: "cryptojs/jsrsa",
        RIPEMD160withRSA: "cryptojs/jsrsa",
        MD5withECDSA: "cryptojs/jsrsa",
        SHA1withECDSA: "cryptojs/jsrsa",
        SHA224withECDSA: "cryptojs/jsrsa",
        SHA256withECDSA: "cryptojs/jsrsa",
        SHA384withECDSA: "cryptojs/jsrsa",
        SHA512withECDSA: "cryptojs/jsrsa",
        RIPEMD160withECDSA: "cryptojs/jsrsa",
        MD5withRSAandMGF1: "cryptojs/jsrsa",
        SHA1withRSAandMGF1: "cryptojs/jsrsa",
        SHA224withRSAandMGF1: "cryptojs/jsrsa",
        SHA256withRSAandMGF1: "cryptojs/jsrsa",
        SHA384withRSAandMGF1: "cryptojs/jsrsa",
        SHA512withRSAandMGF1: "cryptojs/jsrsa",
        RIPEMD160withRSAandMGF1: "cryptojs/jsrsa"
    };
    this.CRYPTOJSMESSAGEDIGESTNAME = {
        md5: "CryptoJS.algo.MD5",
        sha1: "CryptoJS.algo.SHA1",
        sha224: "CryptoJS.algo.SHA224",
        sha256: "CryptoJS.algo.SHA256",
        sha384: "CryptoJS.algo.SHA384",
        sha512: "CryptoJS.algo.SHA512",
        ripemd160: "CryptoJS.algo.RIPEMD160"
    };
    this.getDigestInfoHex = function(a, b) {
        if (typeof this.DIGESTINFOHEAD[b] == "undefined") {
            throw "alg not supported in Util.DIGESTINFOHEAD: " + b;
        }
        return this.DIGESTINFOHEAD[b] + a;
    };
    this.getPaddedDigestInfoHex = function(a, b, c) {
        var d = this.getDigestInfoHex(a, b);
        var e = c / 4;
        if (d.length + 22 > e) {
            throw "key is too short for SigAlg: keylen=" + c + "," + b;
        }
        var f = "0001";
        var g = "00" + d;
        var h = "";
        var i = e - f.length - g.length;
        for (var j = 0; j < i; j += 2) {
            h += "ff";
        }
        var k = f + h + g;
        return k;
    };
    this.hashString = function(a, b) {
        var c = new KJUR.crypto.MessageDigest({
            alg: b
        });
        return c.digestString(a);
    };
    this.hashHex = function(a, b) {
        var c = new KJUR.crypto.MessageDigest({
            alg: b
        });
        return c.digestHex(a);
    };
    this.sha1 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha1",
            prov: "cryptojs"
        });
        return b.digestString(a);
    };
    this.sha256 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestString(a);
    };
    this.sha256Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha256",
            prov: "cryptojs"
        });
        return b.digestHex(a);
    };
    this.sha512 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestString(a);
    };
    this.sha512Hex = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "sha512",
            prov: "cryptojs"
        });
        return b.digestHex(a);
    };
    this.md5 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "md5",
            prov: "cryptojs"
        });
        return b.digestString(a);
    };
    this.ripemd160 = function(a) {
        var b = new KJUR.crypto.MessageDigest({
            alg: "ripemd160",
            prov: "cryptojs"
        });
        return b.digestString(a);
    };
    this.getCryptoJSMDByName = function(a) {};
}();

KJUR.crypto.MessageDigest = function(params) {
    var md = null;
    var algName = null;
    var provName = null;
    this.setAlgAndProvider = function(alg, prov) {
        if (alg != null && prov === undefined) {
            prov = KJUR.crypto.Util.DEFAULTPROVIDER[alg];
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(alg) != -1 && prov == "cryptojs") {
            try {
                this.md = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[alg]).create();
            } catch (ex) {
                throw "setAlgAndProvider hash alg set fail alg=" + alg + "/" + ex;
            }
            this.updateString = function(a) {
                this.md.update(a);
            };
            this.updateHex = function(a) {
                var b = CryptoJS.enc.Hex.parse(a);
                this.md.update(b);
            };
            this.digest = function() {
                var a = this.md.finalize();
                return a.toString(CryptoJS.enc.Hex);
            };
            this.digestString = function(a) {
                this.updateString(a);
                return this.digest();
            };
            this.digestHex = function(a) {
                this.updateHex(a);
                return this.digest();
            };
        }
        if (":sha256:".indexOf(alg) != -1 && prov == "sjcl") {
            try {
                this.md = new sjcl.hash.sha256();
            } catch (ex) {
                throw "setAlgAndProvider hash alg set fail alg=" + alg + "/" + ex;
            }
            this.updateString = function(a) {
                this.md.update(a);
            };
            this.updateHex = function(a) {
                var b = sjcl.codec.hex.toBits(a);
                this.md.update(b);
            };
            this.digest = function() {
                var a = this.md.finalize();
                return sjcl.codec.hex.fromBits(a);
            };
            this.digestString = function(a) {
                this.updateString(a);
                return this.digest();
            };
            this.digestHex = function(a) {
                this.updateHex(a);
                return this.digest();
            };
        }
    };
    this.updateString = function(a) {
        throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.updateHex = function(a) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.digest = function() {
        throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.digestString = function(a) {
        throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.digestHex = function(a) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    if (params !== undefined) {
        if (params.alg !== undefined) {
            this.algName = params.alg;
            if (params.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
            }
            this.setAlgAndProvider(this.algName, this.provName);
        }
    }
};

KJUR.crypto.Mac = function(params) {
    var mac = null;
    var pass = null;
    var algName = null;
    var provName = null;
    var algProv = null;
    this.setAlgAndProvider = function(alg, prov) {
        if (alg == null) {
            alg = "hmacsha1";
        }
        alg = alg.toLowerCase();
        if (alg.substr(0, 4) != "hmac") {
            throw "setAlgAndProvider unsupported HMAC alg: " + alg;
        }
        if (prov === undefined) {
            prov = KJUR.crypto.Util.DEFAULTPROVIDER[alg];
        }
        this.algProv = alg + "/" + prov;
        var hashAlg = alg.substr(4);
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(hashAlg) != -1 && prov == "cryptojs") {
            try {
                var mdObj = eval(KJUR.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[hashAlg]);
                this.mac = CryptoJS.algo.HMAC.create(mdObj, this.pass);
            } catch (ex) {
                throw "setAlgAndProvider hash alg set fail hashAlg=" + hashAlg + "/" + ex;
            }
            this.updateString = function(a) {
                this.mac.update(a);
            };
            this.updateHex = function(a) {
                var b = CryptoJS.enc.Hex.parse(a);
                this.mac.update(b);
            };
            this.doFinal = function() {
                var a = this.mac.finalize();
                return a.toString(CryptoJS.enc.Hex);
            };
            this.doFinalString = function(a) {
                this.updateString(a);
                return this.doFinal();
            };
            this.doFinalHex = function(a) {
                this.updateHex(a);
                return this.doFinal();
            };
        }
    };
    this.updateString = function(a) {
        throw "updateString(str) not supported for this alg/prov: " + this.algProv;
    };
    this.updateHex = function(a) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algProv;
    };
    this.doFinal = function() {
        throw "digest() not supported for this alg/prov: " + this.algProv;
    };
    this.doFinalString = function(a) {
        throw "digestString(str) not supported for this alg/prov: " + this.algProv;
    };
    this.doFinalHex = function(a) {
        throw "digestHex(hex) not supported for this alg/prov: " + this.algProv;
    };
    if (params !== undefined) {
        if (params.pass !== undefined) {
            this.pass = params.pass;
        }
        if (params.alg !== undefined) {
            this.algName = params.alg;
            if (params.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
            }
            this.setAlgAndProvider(this.algName, this.provName);
        }
    }
};

KJUR.crypto.Signature = function(a) {
    var b = null;
    var c = null;
    var d = null;
    var e = null;
    var f = null;
    var g = null;
    var h = null;
    var i = null;
    var j = null;
    var k = null;
    var l = -1;
    var m = null;
    var n = null;
    var o = null;
    var p = null;
    var q = null;
    this._setAlgNames = function() {
        if (this.algName.match(/^(.+)with(.+)$/)) {
            this.mdAlgName = RegExp.$1.toLowerCase();
            this.pubkeyAlgName = RegExp.$2.toLowerCase();
        }
    };
    this._zeroPaddingOfSignature = function(a, b) {
        var c = "";
        var d = b / 4 - a.length;
        for (var e = 0; e < d; e++) {
            c = c + "0";
        }
        return c + a;
    };
    this.setAlgAndProvider = function(a, b) {
        this._setAlgNames();
        if (b != "cryptojs/jsrsa") {
            throw "provider not supported: " + b;
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
            try {
                this.md = new KJUR.crypto.MessageDigest({
                    alg: this.mdAlgName
                });
            } catch (c) {
                throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + c;
            }
            this.init = function(a, b) {
                if (typeof a == "string") {
                    if (a.indexOf("-END ENCRYPTED PRIVATE KEY-", 0) != -1 && b !== undefined) {
                        this.prvKey = PKCS5PKEY.getKeyFromEncryptedPKCS8PEM(a, b);
                        this.state = "SIGN";
                    } else {
                        if (a.indexOf("-END RSA PRIVATE KEY-", 0) != -1 && a.indexOf(",ENCRYPTED", 0) != -1 && b !== undefined) {
                            this.prvKey = PKCS5PKEY.getRSAKeyFromEncryptedPKCS5PEM(a, b);
                            this.state = "SIGN";
                        } else {
                            if (a.indexOf("-END RSA PRIVATE KEY-", 0) != -1 && a.indexOf(",ENCRYPTED", 0) == -1 && b === undefined) {
                                this.prvKey = new RSAKey();
                                this.prvKey.readPrivateKeyFromPEMString(a);
                                this.state = "SIGN";
                            } else {
                                if (a.indexOf("-END PRIVATE KEY-", 0) != -1 && b === undefined) {
                                    this.prvKey = PKCS5PKEY.getKeyFromPlainPrivatePKCS8PEM(a);
                                    this.state = "SIGN";
                                } else {
                                    if (a.indexOf("-END PUBLIC KEY-", 0) != -1 && b === undefined) {
                                        this.pubKey = PKCS5PKEY.getKeyFromPublicPKCS8PEM(a);
                                        this.state = "VERIFY";
                                    } else {
                                        if ((a.indexOf("-END CERTIFICATE-", 0) != -1 || a.indexOf("-END X509 CERTIFICATE-", 0) != -1 || a.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) && b === undefined) {
                                            this.pubKey = X509.getPublicKeyFromCertPEM(a);
                                            this.state = "VERIFY";
                                        } else {
                                            throw "unsupported arguments";
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (a instanceof RSAKey) {
                        if (a.d != null) {
                            this.prvKey = a;
                            this.state = "SIGN";
                        } else {
                            if (a.n != null) {
                                this.pubKey = a;
                                this.state = "VERIFY";
                            } else {
                                throw "RSAKey object is not private and public key";
                            }
                        }
                    } else {
                        if (a instanceof KJUR.crypto.ECDSA) {
                            if (a.prvKeyHex != null) {
                                this.prvKey = a;
                                this.state = "SIGN";
                            } else {
                                if (a.pubKeyHex != null) {
                                    this.pubKey = a;
                                    this.state = "VERIFY";
                                } else {
                                    throw "ECDSA object is not private and public key";
                                }
                            }
                        }
                    }
                }
            };
            this.initSign = function(a) {
                if (typeof a.ecprvhex == "string" && typeof a.eccurvename == "string") {
                    this.ecprvhex = a.ecprvhex;
                    this.eccurvename = a.eccurvename;
                } else {
                    this.prvKey = a;
                }
                this.state = "SIGN";
            };
            this.initVerifyByPublicKey = function(a) {
                if (typeof a.ecpubhex == "string" && typeof a.eccurvename == "string") {
                    this.ecpubhex = a.ecpubhex;
                    this.eccurvename = a.eccurvename;
                } else {
                    if (a instanceof KJUR.crypto.ECDSA) {
                        this.pubKey = a;
                    } else {
                        if (a instanceof RSAKey) {
                            this.pubKey = a;
                        }
                    }
                }
                this.state = "VERIFY";
            };
            this.initVerifyByCertificatePEM = function(a) {
                var b = new X509();
                b.readCertPEM(a);
                this.pubKey = b.subjectPublicKeyRSA;
                this.state = "VERIFY";
            };
            this.updateString = function(a) {
                this.md.updateString(a);
            };
            this.updateHex = function(a) {
                this.md.updateHex(a);
            };
            this.sign = function() {
                this.sHashHex = this.md.digest();
                if (typeof this.ecprvhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var a = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    this.hSign = a.signHex(this.sHashHex, this.ecprvhex);
                } else {
                    if (this.pubkeyAlgName == "rsaandmgf1") {
                        this.hSign = this.prvKey.signWithMessageHashPSS(this.sHashHex, this.mdAlgName, this.pssSaltLen);
                    } else {
                        if (this.pubkeyAlgName == "rsa") {
                            this.hSign = this.prvKey.signWithMessageHash(this.sHashHex, this.mdAlgName);
                        } else {
                            if (this.prvKey instanceof KJUR.crypto.ECDSA) {
                                this.hSign = this.prvKey.signWithMessageHash(this.sHashHex);
                            } else {
                                throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
                            }
                        }
                    }
                }
                return this.hSign;
            };
            this.signString = function(a) {
                this.updateString(a);
                this.sign();
            };
            this.signHex = function(a) {
                this.updateHex(a);
                this.sign();
            };
            this.verify = function(a) {
                this.sHashHex = this.md.digest();
                if (typeof this.ecpubhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var b = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    return b.verifyHex(this.sHashHex, a, this.ecpubhex);
                } else {
                    if (this.pubkeyAlgName == "rsaandmgf1") {
                        return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, a, this.mdAlgName, this.pssSaltLen);
                    } else {
                        if (this.pubkeyAlgName == "rsa") {
                            return this.pubKey.verifyWithMessageHash(this.sHashHex, a);
                        } else {
                            if (this.pubKey instanceof KJUR.crypto.ECDSA) {
                                return this.pubKey.verifyWithMessageHash(this.sHashHex, a);
                            } else {
                                throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
                            }
                        }
                    }
                }
            };
        }
    };
    this.init = function(a, b) {
        throw "init(key, pass) not supported for this alg:prov=" + this.algProvName;
    };
    this.initVerifyByPublicKey = function(a) {
        throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" + this.algProvName;
    };
    this.initVerifyByCertificatePEM = function(a) {
        throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" + this.algProvName;
    };
    this.initSign = function(a) {
        throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName;
    };
    this.updateString = function(a) {
        throw "updateString(str) not supported for this alg:prov=" + this.algProvName;
    };
    this.updateHex = function(a) {
        throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName;
    };
    this.sign = function() {
        throw "sign() not supported for this alg:prov=" + this.algProvName;
    };
    this.signString = function(a) {
        throw "digestString(str) not supported for this alg:prov=" + this.algProvName;
    };
    this.signHex = function(a) {
        throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName;
    };
    this.verify = function(a) {
        throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName;
    };
    this.initParams = a;
    if (a !== undefined) {
        if (a.alg !== undefined) {
            this.algName = a.alg;
            if (a.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
            } else {
                this.provName = a.prov;
            }
            this.algProvName = this.algName + ":" + this.provName;
            this.setAlgAndProvider(this.algName, this.provName);
            this._setAlgNames();
        }
        if (a.psssaltlen !== undefined) {
            this.pssSaltLen = a.psssaltlen;
        }
        if (a.prvkeypem !== undefined) {
            if (a.prvkeypas !== undefined) {
                throw "both prvkeypem and prvkeypas parameters not supported";
            } else {
                try {
                    var b = new RSAKey();
                    b.readPrivateKeyFromPEMString(a.prvkeypem);
                    this.initSign(b);
                } catch (r) {
                    throw "fatal error to load pem private key: " + r;
                }
            }
        }
    }
};

KJUR.crypto.OID = new function() {
    this.oidhex2name = {
        "2a864886f70d010101": "rsaEncryption",
        "2a8648ce3d0201": "ecPublicKey",
        "2a8648ce3d030107": "secp256r1",
        "2b8104001f": "secp192k1",
        "2b81040021": "secp224r1",
        "2b8104000a": "secp256k1",
        "2b81040023": "secp521r1",
        "2b81040022": "secp384r1"
    };
}();

if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {};
}

if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {};
}

KJUR.crypto.ECDSA = function(a) {
    var b = "secp256r1";
    var c = null;
    var d = null;
    var e = null;
    var f = new SecureRandom();
    var g = null;
    this.type = "EC";
    function h(a, b, c, d) {
        var e = Math.max(b.bitLength(), d.bitLength());
        var f = a.add2D(c);
        var g = a.curve.getInfinity();
        for (var h = e - 1; h >= 0; --h) {
            g = g.twice2D();
            g.z = BigInteger.ONE;
            if (b.testBit(h)) {
                if (d.testBit(h)) {
                    g = g.add2D(f);
                } else {
                    g = g.add2D(a);
                }
            } else {
                if (d.testBit(h)) {
                    g = g.add2D(c);
                }
            }
        }
        return g;
    }
    this.getBigRandom = function(a) {
        return new BigInteger(a.bitLength(), f).mod(a.subtract(BigInteger.ONE)).add(BigInteger.ONE);
    };
    this.setNamedCurve = function(a) {
        this.ecparams = KJUR.crypto.ECParameterDB.getByName(a);
        this.prvKeyHex = null;
        this.pubKeyHex = null;
        this.curveName = a;
    };
    this.setPrivateKeyHex = function(a) {
        this.prvKeyHex = a;
    };
    this.setPublicKeyHex = function(a) {
        this.pubKeyHex = a;
    };
    this.generateKeyPairHex = function() {
        var a = this.ecparams.n;
        var b = this.getBigRandom(a);
        var c = this.ecparams.G.multiply(b);
        var d = c.getX().toBigInteger();
        var e = c.getY().toBigInteger();
        var f = this.ecparams.keylen / 4;
        var g = ("0000000000" + b.toString(16)).slice(-f);
        var h = ("0000000000" + d.toString(16)).slice(-f);
        var i = ("0000000000" + e.toString(16)).slice(-f);
        var j = "04" + h + i;
        this.prvKeyHex = g;
        this.pubKeyHex = j;
        return {
            ecprvhex: g,
            ecpubhex: j
        };
    };
    this.signWithMessageHash = function(a) {
        return this.signHex(a, this.prvKeyHex);
    };
    this.signHex = function(a, b) {
        var c = new BigInteger(b, 16);
        var d = this.ecparams.n;
        var e = new BigInteger(a, 16);
        do {
            var f = this.getBigRandom(d);
            var g = this.ecparams.G;
            var h = g.multiply(f);
            var i = h.getX().toBigInteger().mod(d);
        } while (i.compareTo(BigInteger.ZERO) <= 0);
        var j = f.modInverse(d).multiply(e.add(c.multiply(i))).mod(d);
        return KJUR.crypto.ECDSA.biRSSigToASN1Sig(i, j);
    };
    this.sign = function(a, b) {
        var c = b;
        var d = this.ecparams.n;
        var e = BigInteger.fromByteArrayUnsigned(a);
        do {
            var f = this.getBigRandom(d);
            var g = this.ecparams.G;
            var h = g.multiply(f);
            var i = h.getX().toBigInteger().mod(d);
        } while (i.compareTo(BigInteger.ZERO) <= 0);
        var j = f.modInverse(d).multiply(e.add(c.multiply(i))).mod(d);
        return this.serializeSig(i, j);
    };
    this.verifyWithMessageHash = function(a, b) {
        return this.verifyHex(a, b, this.pubKeyHex);
    };
    this.verifyHex = function(a, b, c) {
        var d, e;
        var f = KJUR.crypto.ECDSA.parseSigHex(b);
        d = f.r;
        e = f.s;
        var g;
        g = ECPointFp.decodeFromHex(this.ecparams.curve, c);
        var h = new BigInteger(a, 16);
        return this.verifyRaw(h, d, e, g);
    };
    this.verify = function(a, b, c) {
        var d, e;
        if (Bitcoin.Util.isArray(b)) {
            var f = this.parseSig(b);
            d = f.r;
            e = f.s;
        } else {
            if ("object" === typeof b && b.r && b.s) {
                d = b.r;
                e = b.s;
            } else {
                throw "Invalid value for signature";
            }
        }
        var g;
        if (c instanceof ECPointFp) {
            g = c;
        } else {
            if (Bitcoin.Util.isArray(c)) {
                g = ECPointFp.decodeFrom(this.ecparams.curve, c);
            } else {
                throw "Invalid format for pubkey value, must be byte array or ECPointFp";
            }
        }
        var h = BigInteger.fromByteArrayUnsigned(a);
        return this.verifyRaw(h, d, e, g);
    };
    this.verifyRaw = function(a, b, c, d) {
        var e = this.ecparams.n;
        var f = this.ecparams.G;
        if (b.compareTo(BigInteger.ONE) < 0 || b.compareTo(e) >= 0) {
            return false;
        }
        if (c.compareTo(BigInteger.ONE) < 0 || c.compareTo(e) >= 0) {
            return false;
        }
        var g = c.modInverse(e);
        var h = a.multiply(g).mod(e);
        var i = b.multiply(g).mod(e);
        var j = f.multiply(h).add(d.multiply(i));
        var k = j.getX().toBigInteger().mod(e);
        return k.equals(b);
    };
    this.serializeSig = function(a, b) {
        var c = a.toByteArraySigned();
        var d = b.toByteArraySigned();
        var e = [];
        e.push(2);
        e.push(c.length);
        e = e.concat(c);
        e.push(2);
        e.push(d.length);
        e = e.concat(d);
        e.unshift(e.length);
        e.unshift(48);
        return e;
    };
    this.parseSig = function(a) {
        var b;
        if (a[0] != 48) {
            throw new Error("Signature not a valid DERSequence");
        }
        b = 2;
        if (a[b] != 2) {
            throw new Error("First element in signature must be a DERInteger");
        }
        var c = a.slice(b + 2, b + 2 + a[b + 1]);
        b += 2 + a[b + 1];
        if (a[b] != 2) {
            throw new Error("Second element in signature must be a DERInteger");
        }
        var d = a.slice(b + 2, b + 2 + a[b + 1]);
        b += 2 + a[b + 1];
        var e = BigInteger.fromByteArrayUnsigned(c);
        var f = BigInteger.fromByteArrayUnsigned(d);
        return {
            r: e,
            s: f
        };
    };
    this.parseSigCompact = function(a) {
        if (a.length !== 65) {
            throw "Signature has the wrong length";
        }
        var b = a[0] - 27;
        if (b < 0 || b > 7) {
            throw "Invalid signature type";
        }
        var c = this.ecparams.n;
        var d = BigInteger.fromByteArrayUnsigned(a.slice(1, 33)).mod(c);
        var e = BigInteger.fromByteArrayUnsigned(a.slice(33, 65)).mod(c);
        return {
            r: d,
            s: e,
            i: b
        };
    };
    if (a !== undefined) {
        if (a.curve !== undefined) {
            this.curveName = a.curve;
        }
    }
    if (this.curveName === undefined) {
        this.curveName = b;
    }
    this.setNamedCurve(this.curveName);
    if (a !== undefined) {
        if (a.prv !== undefined) {
            this.prvKeyHex = a.prv;
        }
        if (a.pub !== undefined) {
            this.pubKeyHex = a.pub;
        }
    }
};

KJUR.crypto.ECDSA.parseSigHex = function(a) {
    var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);
    var c = new BigInteger(b.r, 16);
    var d = new BigInteger(b.s, 16);
    return {
        r: c,
        s: d
    };
};

KJUR.crypto.ECDSA.parseSigHexInHexRS = function(a) {
    if (a.substr(0, 2) != "30") {
        throw "signature is not a ASN.1 sequence";
    }
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
    if (b.length != 2) {
        throw "number of signature ASN.1 sequence elements seem wrong";
    }
    var c = b[0];
    var d = b[1];
    if (a.substr(c, 2) != "02") {
        throw "1st item of sequene of signature is not ASN.1 integer";
    }
    if (a.substr(d, 2) != "02") {
        throw "2nd item of sequene of signature is not ASN.1 integer";
    }
    var e = ASN1HEX.getHexOfV_AtObj(a, c);
    var f = ASN1HEX.getHexOfV_AtObj(a, d);
    return {
        r: e,
        s: f
    };
};

KJUR.crypto.ECDSA.asn1SigToConcatSig = function(a) {
    var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);
    var c = b.r;
    var d = b.s;
    if (c.substr(0, 2) == "00" && c.length / 2 * 8 % (16 * 8) == 8) {
        c = c.substr(2);
    }
    if (d.substr(0, 2) == "00" && d.length / 2 * 8 % (16 * 8) == 8) {
        d = d.substr(2);
    }
    if (c.length / 2 * 8 % (16 * 8) != 0) {
        throw "unknown ECDSA sig r length error";
    }
    if (d.length / 2 * 8 % (16 * 8) != 0) {
        throw "unknown ECDSA sig s length error";
    }
    return c + d;
};

KJUR.crypto.ECDSA.concatSigToASN1Sig = function(a) {
    if (a.length / 2 * 8 % (16 * 8) != 0) {
        throw "unknown ECDSA concatinated r-s sig  length error";
    }
    var b = a.substr(0, a.length / 2);
    var c = a.substr(a.length / 2);
    return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(b, c);
};

KJUR.crypto.ECDSA.hexRSSigToASN1Sig = function(a, b) {
    var c = new BigInteger(a, 16);
    var d = new BigInteger(b, 16);
    return KJUR.crypto.ECDSA.biRSSigToASN1Sig(c, d);
};

KJUR.crypto.ECDSA.biRSSigToASN1Sig = function(a, b) {
    var c = new KJUR.asn1.DERInteger({
        bigint: a
    });
    var d = new KJUR.asn1.DERInteger({
        bigint: b
    });
    var e = new KJUR.asn1.DERSequence({
        array: [ c, d ]
    });
    return e.getEncodedHex();
};

if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {};
}

if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {};
}

KJUR.crypto.ECParameterDB = new function() {
    var a = {};
    var b = {};
    function c(a) {
        return new BigInteger(a, 16);
    }
    this.getByName = function(c) {
        var d = c;
        if (typeof b[d] != "undefined") {
            d = b[c];
        }
        if (typeof a[d] != "undefined") {
            return a[d];
        }
        throw "unregistered EC curve name: " + d;
    };
    this.regist = function(d, e, f, g, h, i, j, k, l, m, n, o) {
        a[d] = {};
        var p = c(f);
        var q = c(g);
        var r = c(h);
        var s = c(i);
        var t = c(j);
        var u = new ECCurveFp(p, q, r);
        var v = u.decodePointHex("04" + k + l);
        a[d]["name"] = d;
        a[d]["keylen"] = e;
        a[d]["curve"] = u;
        a[d]["G"] = v;
        a[d]["n"] = s;
        a[d]["h"] = t;
        a[d]["oid"] = n;
        a[d]["info"] = o;
        for (var w = 0; w < m.length; w++) {
            b[m[w]] = d;
        }
    };
}();

KJUR.crypto.ECParameterDB.regist("secp128r1", 128, "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC", "E87579C11079F43DD824993C2CEE5ED3", "FFFFFFFE0000000075A30D1B9038A115", "1", "161FF7528B899B2D0C28607CA52C5B86", "CF5AC8395BAFEB13C02DA292DDED7A83", [], "", "secp128r1 : SECG curve over a 128 bit prime field");

KJUR.crypto.ECParameterDB.regist("secp160k1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73", "0", "7", "0100000000000000000001B8FA16DFAB9ACA16B6B3", "1", "3B4C382CE37AA192A4019E763036F4F5DD4D7EBB", "938CF935318FDCED6BC28286531733C3F03C4FEE", [], "", "secp160k1 : SECG curve over a 160 bit prime field");

KJUR.crypto.ECParameterDB.regist("secp160r1", 160, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC", "1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45", "0100000000000000000001F4C8F927AED3CA752257", "1", "4A96B5688EF573284664698968C38BB913CBFC82", "23A628553168947D59DCC912042351377AC5FB32", [], "", "secp160r1 : SECG curve over a 160 bit prime field");

KJUR.crypto.ECParameterDB.regist("secp192k1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37", "0", "3", "FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D", "1", "DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D", "9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D", []);

KJUR.crypto.ECParameterDB.regist("secp192r1", 192, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC", "64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1", "FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831", "1", "188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012", "07192B95FFC8DA78631011ED6B24CDD573F977A11E794811", []);

KJUR.crypto.ECParameterDB.regist("secp224r1", 224, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE", "B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4", "FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D", "1", "B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21", "BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34", []);

KJUR.crypto.ECParameterDB.regist("secp256k1", 256, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F", "0", "7", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", "1", "79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798", "483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8", []);

KJUR.crypto.ECParameterDB.regist("secp256r1", 256, "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF", "FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC", "5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B", "FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551", "1", "6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296", "4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5", [ "NIST P-256", "P-256", "prime256v1" ]);

KJUR.crypto.ECParameterDB.regist("secp384r1", 384, "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC", "B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF", "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973", "1", "AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7", "3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f", [ "NIST P-384", "P-384" ]);

KJUR.crypto.ECParameterDB.regist("secp521r1", 521, "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC", "051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00", "1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409", "1", "C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66", "011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650", [ "NIST P-521", "P-521" ]);

var PKCS5PKEY = function() {
    var a = function(a, b, d) {
        return c(CryptoJS.AES, a, b, d);
    };
    var b = function(a, b, d) {
        return c(CryptoJS.TripleDES, a, b, d);
    };
    var c = function(a, b, c, d) {
        var e = CryptoJS.enc.Hex.parse(b);
        var f = CryptoJS.enc.Hex.parse(c);
        var g = CryptoJS.enc.Hex.parse(d);
        var h = {};
        h.key = f;
        h.iv = g;
        h.ciphertext = e;
        var i = a.decrypt(h, f, {
            iv: g
        });
        return CryptoJS.enc.Hex.stringify(i);
    };
    var d = function(a, b, c) {
        return f(CryptoJS.AES, a, b, c);
    };
    var e = function(a, b, c) {
        return f(CryptoJS.TripleDES, a, b, c);
    };
    var f = function(a, b, c, d) {
        var e = CryptoJS.enc.Hex.parse(b);
        var f = CryptoJS.enc.Hex.parse(c);
        var g = CryptoJS.enc.Hex.parse(d);
        var h = {};
        var i = a.encrypt(e, f, {
            iv: g
        });
        var j = CryptoJS.enc.Hex.parse(i.toString());
        var k = CryptoJS.enc.Base64.stringify(j);
        return k;
    };
    var g = {
        "AES-256-CBC": {
            proc: a,
            eproc: d,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: a,
            eproc: d,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: a,
            eproc: d,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: b,
            eproc: e,
            keylen: 24,
            ivlen: 8
        }
    };
    var h = function(a) {
        return g[a]["proc"];
    };
    var i = function(a) {
        var b = CryptoJS.lib.WordArray.random(a);
        var c = CryptoJS.enc.Hex.stringify(b);
        return c;
    };
    var j = function(a) {
        var b = {};
        if (a.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"))) {
            b.cipher = RegExp.$1;
            b.ivsalt = RegExp.$2;
        }
        if (a.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"))) {
            b.type = RegExp.$1;
        }
        var c = -1;
        var d = 0;
        if (a.indexOf("\r\n\r\n") != -1) {
            c = a.indexOf("\r\n\r\n");
            d = 2;
        }
        if (a.indexOf("\n\n") != -1) {
            c = a.indexOf("\n\n");
            d = 1;
        }
        var e = a.indexOf("-----END");
        if (c != -1 && e != -1) {
            var f = a.substring(c + d * 2, e - d);
            f = f.replace(/\s+/g, "");
            b.data = f;
        }
        return b;
    };
    var k = function(a, b, c) {
        var d = c.substring(0, 16);
        var e = CryptoJS.enc.Hex.parse(d);
        var f = CryptoJS.enc.Utf8.parse(b);
        var h = g[a]["keylen"] + g[a]["ivlen"];
        var i = "";
        var j = null;
        for (;;) {
            var k = CryptoJS.algo.MD5.create();
            if (j != null) {
                k.update(j);
            }
            k.update(f);
            k.update(e);
            j = k.finalize();
            i = i + CryptoJS.enc.Hex.stringify(j);
            if (i.length >= h * 2) {
                break;
            }
        }
        var l = {};
        l.keyhex = i.substr(0, g[a]["keylen"] * 2);
        l.ivhex = i.substr(g[a]["keylen"] * 2, g[a]["ivlen"] * 2);
        return l;
    };
    var l = function(a, b, c, d) {
        var e = CryptoJS.enc.Base64.parse(a);
        var f = CryptoJS.enc.Hex.stringify(e);
        var h = g[b]["proc"];
        var i = h(f, c, d);
        return i;
    };
    var m = function(a, b, c, d) {
        var e = g[b]["eproc"];
        var f = e(a, c, d);
        return f;
    };
    return {
        version: "1.0.5",
        getHexFromPEM: function(a, b) {
            var c = a;
            if (c.indexOf("BEGIN " + b) == -1) {
                throw "can't find PEM header: " + b;
            }
            c = c.replace("-----BEGIN " + b + "-----", "");
            c = c.replace("-----END " + b + "-----", "");
            var d = c.replace(/\s+/g, "");
            var e = b64tohex(d);
            return e;
        },
        getDecryptedKeyHexByKeyIV: function(a, b, c, d) {
            var e = h(b);
            return e(a, c, d);
        },
        parsePKCS5PEM: function(a) {
            return j(a);
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(a, b, c) {
            return k(a, b, c);
        },
        decryptKeyB64: function(a, b, c, d) {
            return l(a, b, c, d);
        },
        getDecryptedKeyHex: function(a, b) {
            var c = j(a);
            var d = c.type;
            var e = c.cipher;
            var f = c.ivsalt;
            var g = c.data;
            var h = k(e, b, f);
            var i = h.keyhex;
            var m = l(g, e, i, f);
            return m;
        },
        getRSAKeyFromEncryptedPKCS5PEM: function(a, b) {
            var c = this.getDecryptedKeyHex(a, b);
            var d = new RSAKey();
            d.readPrivateKeyFromASN1HexString(c);
            return d;
        },
        getEryptedPKCS5PEMFromPrvKeyHex: function(a, b, c, d) {
            var e = "";
            if (typeof c == "undefined" || c == null) {
                c = "AES-256-CBC";
            }
            if (typeof g[c] == "undefined") {
                throw "PKCS5PKEY unsupported algorithm: " + c;
            }
            if (typeof d == "undefined" || d == null) {
                var f = g[c]["ivlen"];
                var h = i(f);
                d = h.toUpperCase();
            }
            var j = k(c, b, d);
            var l = j.keyhex;
            var n = m(a, c, l, d);
            var o = n.replace(/(.{64})/g, "$1\r\n");
            var e = "-----BEGIN RSA PRIVATE KEY-----\r\n";
            e += "Proc-Type: 4,ENCRYPTED\r\n";
            e += "DEK-Info: " + c + "," + d + "\r\n";
            e += "\r\n";
            e += o;
            e += "\r\n-----END RSA PRIVATE KEY-----\r\n";
            return e;
        },
        getEryptedPKCS5PEMFromRSAKey: function(a, b, c, d) {
            var e = new KJUR.asn1.DERInteger({
                "int": 0
            });
            var f = new KJUR.asn1.DERInteger({
                bigint: a.n
            });
            var g = new KJUR.asn1.DERInteger({
                "int": a.e
            });
            var h = new KJUR.asn1.DERInteger({
                bigint: a.d
            });
            var i = new KJUR.asn1.DERInteger({
                bigint: a.p
            });
            var j = new KJUR.asn1.DERInteger({
                bigint: a.q
            });
            var k = new KJUR.asn1.DERInteger({
                bigint: a.dmp1
            });
            var l = new KJUR.asn1.DERInteger({
                bigint: a.dmq1
            });
            var m = new KJUR.asn1.DERInteger({
                bigint: a.coeff
            });
            var n = new KJUR.asn1.DERSequence({
                array: [ e, f, g, h, i, j, k, l, m ]
            });
            var o = n.getEncodedHex();
            return this.getEryptedPKCS5PEMFromPrvKeyHex(o, b, c, d);
        },
        newEncryptedPKCS5PEM: function(a, b, c, d) {
            if (typeof b == "undefined" || b == null) {
                b = 1024;
            }
            if (typeof c == "undefined" || c == null) {
                c = "10001";
            }
            var e = new RSAKey();
            e.generate(b, c);
            var f = null;
            if (typeof d == "undefined" || d == null) {
                f = this.getEncryptedPKCS5PEMFromRSAKey(pkey, a);
            } else {
                f = this.getEncryptedPKCS5PEMFromRSAKey(pkey, a, d);
            }
            return f;
        },
        getRSAKeyFromPlainPKCS8PEM: function(a) {
            if (a.match(/ENCRYPTED/)) {
                throw "pem shall be not ENCRYPTED";
            }
            var b = this.getHexFromPEM(a, "PRIVATE KEY");
            var c = this.getRSAKeyFromPlainPKCS8Hex(b);
            return c;
        },
        getRSAKeyFromPlainPKCS8Hex: function(a) {
            var b = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (b.length != 3) {
                throw "outer DERSequence shall have 3 elements: " + b.length;
            }
            var c = ASN1HEX.getHexOfTLV_AtObj(a, b[1]);
            if (c != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmIdentifier is not rsaEnc: " + c;
            }
            var c = ASN1HEX.getHexOfTLV_AtObj(a, b[1]);
            var d = ASN1HEX.getHexOfTLV_AtObj(a, b[2]);
            var e = ASN1HEX.getHexOfV_AtObj(d, 0);
            var f = new RSAKey();
            f.readPrivateKeyFromASN1HexString(e);
            return f;
        },
        parseHexOfEncryptedPKCS8: function(a) {
            var b = {};
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + c.length;
            }
            b.ciphertext = ASN1HEX.getHexOfV_AtObj(a, c[1]);
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c[0]);
            if (d.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + d.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(a, d[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2";
            }
            var e = ASN1HEX.getPosArrayOfChildren_AtObj(a, d[1]);
            if (d.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + e.length;
            }
            var f = ASN1HEX.getPosArrayOfChildren_AtObj(a, e[1]);
            if (f.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + f.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(a, f[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES";
            }
            b.encryptionSchemeAlg = "TripleDES";
            b.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(a, f[1]);
            var g = ASN1HEX.getPosArrayOfChildren_AtObj(a, e[0]);
            if (g.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + g.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(a, g[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2";
            }
            var h = ASN1HEX.getPosArrayOfChildren_AtObj(a, g[1]);
            if (h.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + h.length;
            }
            b.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(a, h[0]);
            var i = ASN1HEX.getHexOfV_AtObj(a, h[1]);
            try {
                b.pbkdf2Iter = parseInt(i, 16);
            } catch (j) {
                throw "malformed format pbkdf2Iter: " + i;
            }
            return b;
        },
        getPBKDF2KeyHexFromParam: function(a, b) {
            var c = CryptoJS.enc.Hex.parse(a.pbkdf2Salt);
            var d = a.pbkdf2Iter;
            var e = CryptoJS.PBKDF2(b, c, {
                keySize: 192 / 32,
                iterations: d
            });
            var f = CryptoJS.enc.Hex.stringify(e);
            return f;
        },
        getPlainPKCS8HexFromEncryptedPKCS8PEM: function(a, b) {
            var c = this.getHexFromPEM(a, "ENCRYPTED PRIVATE KEY");
            var d = this.parseHexOfEncryptedPKCS8(c);
            var e = PKCS5PKEY.getPBKDF2KeyHexFromParam(d, b);
            var f = {};
            f.ciphertext = CryptoJS.enc.Hex.parse(d.ciphertext);
            var g = CryptoJS.enc.Hex.parse(e);
            var h = CryptoJS.enc.Hex.parse(d.encryptionSchemeIV);
            var i = CryptoJS.TripleDES.decrypt(f, g, {
                iv: h
            });
            var j = CryptoJS.enc.Hex.stringify(i);
            return j;
        },
        getRSAKeyFromEncryptedPKCS8PEM: function(a, b) {
            var c = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(a, b);
            var d = this.getRSAKeyFromPlainPKCS8Hex(c);
            return d;
        },
        getKeyFromEncryptedPKCS8PEM: function(a, b) {
            var c = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(a, b);
            var d = this.getKeyFromPlainPrivatePKCS8Hex(c);
            return d;
        },
        parsePlainPrivatePKCS8Hex: function(a) {
            var b = {};
            b.algparam = null;
            if (a.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)";
            }
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)";
            }
            if (a.substr(c[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)";
            }
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c[1]);
            if (d.length != 2) {
                throw "malformed PKCS8 private key(code:004)";
            }
            if (a.substr(d[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)";
            }
            b.algoid = ASN1HEX.getHexOfV_AtObj(a, d[0]);
            if (a.substr(d[1], 2) == "06") {
                b.algparam = ASN1HEX.getHexOfV_AtObj(a, d[1]);
            }
            if (a.substr(c[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)";
            }
            b.keyidx = ASN1HEX.getStartPosOfV_AtObj(a, c[2]);
            return b;
        },
        getKeyFromPlainPrivatePKCS8PEM: function(a) {
            var b = this.getHexFromPEM(a, "PRIVATE KEY");
            var c = this.getKeyFromPlainPrivatePKCS8Hex(b);
            return c;
        },
        getKeyFromPlainPrivatePKCS8Hex: function(a) {
            var b = this.parsePlainPrivatePKCS8Hex(a);
            if (b.algoid == "2a864886f70d010101") {
                this.parsePrivateRawRSAKeyHexAtObj(a, b);
                var c = b.key;
                var d = new RSAKey();
                d.setPrivateEx(c.n, c.e, c.d, c.p, c.q, c.dp, c.dq, c.co);
                return d;
            } else {
                if (b.algoid == "2a8648ce3d0201") {
                    this.parsePrivateRawECKeyHexAtObj(a, b);
                    if (KJUR.crypto.OID.oidhex2name[b.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + b.algparam;
                    }
                    var e = KJUR.crypto.OID.oidhex2name[b.algparam];
                    var d = new KJUR.crypto.ECDSA({
                        curve: e,
                        prv: b.key
                    });
                    return d;
                } else {
                    throw "unsupported private key algorithm";
                }
            }
        },
        getRSAKeyFromPublicPKCS8PEM: function(a) {
            var b = this.getHexFromPEM(a, "PUBLIC KEY");
            var c = this.getRSAKeyFromPublicPKCS8Hex(b);
            return c;
        },
        getKeyFromPublicPKCS8PEM: function(a) {
            var b = this.getHexFromPEM(a, "PUBLIC KEY");
            var c = this.getKeyFromPublicPKCS8Hex(b);
            return c;
        },
        getKeyFromPublicPKCS8Hex: function(a) {
            var b = this.parsePublicPKCS8Hex(a);
            if (b.algoid == "2a864886f70d010101") {
                var c = this.parsePublicRawRSAKeyHex(b.key);
                var d = new RSAKey();
                d.setPublic(c.n, c.e);
                return d;
            } else {
                if (b.algoid == "2a8648ce3d0201") {
                    if (KJUR.crypto.OID.oidhex2name[b.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + b.algparam;
                    }
                    var e = KJUR.crypto.OID.oidhex2name[b.algparam];
                    var d = new KJUR.crypto.ECDSA({
                        curve: e,
                        pub: b.key
                    });
                    return d;
                } else {
                    throw "unsupported public key algorithm";
                }
            }
        },
        parsePublicRawRSAKeyHex: function(a) {
            var b = {};
            if (a.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)";
            }
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 2) {
                throw "malformed RSA key(code:002)";
            }
            if (a.substr(c[0], 2) != "02") {
                throw "malformed RSA key(code:003)";
            }
            b.n = ASN1HEX.getHexOfV_AtObj(a, c[0]);
            if (a.substr(c[1], 2) != "02") {
                throw "malformed RSA key(code:004)";
            }
            b.e = ASN1HEX.getHexOfV_AtObj(a, c[1]);
            return b;
        },
        parsePrivateRawRSAKeyHexAtObj: function(a, b) {
            var c = b.keyidx;
            if (a.substr(c, 2) != "30") {
                throw "malformed RSA private key(code:001)";
            }
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c);
            if (d.length != 9) {
                throw "malformed RSA private key(code:002)";
            }
            b.key = {};
            b.key.n = ASN1HEX.getHexOfV_AtObj(a, d[1]);
            b.key.e = ASN1HEX.getHexOfV_AtObj(a, d[2]);
            b.key.d = ASN1HEX.getHexOfV_AtObj(a, d[3]);
            b.key.p = ASN1HEX.getHexOfV_AtObj(a, d[4]);
            b.key.q = ASN1HEX.getHexOfV_AtObj(a, d[5]);
            b.key.dp = ASN1HEX.getHexOfV_AtObj(a, d[6]);
            b.key.dq = ASN1HEX.getHexOfV_AtObj(a, d[7]);
            b.key.co = ASN1HEX.getHexOfV_AtObj(a, d[8]);
        },
        parsePrivateRawECKeyHexAtObj: function(a, b) {
            var c = b.keyidx;
            if (a.substr(c, 2) != "30") {
                throw "malformed ECC private key(code:001)";
            }
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c);
            if (d.length != 3) {
                throw "malformed ECC private key(code:002)";
            }
            if (a.substr(d[1], 2) != "04") {
                throw "malformed ECC private key(code:003)";
            }
            b.key = ASN1HEX.getHexOfV_AtObj(a, d[1]);
        },
        parsePublicPKCS8Hex: function(a) {
            var b = {};
            b.algparam = null;
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + c.length;
            }
            var d = c[0];
            if (a.substr(d, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)";
            }
            var e = ASN1HEX.getPosArrayOfChildren_AtObj(a, d);
            if (e.length != 2) {
                throw "malformed PKCS8 public key(code:002)";
            }
            if (a.substr(e[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)";
            }
            b.algoid = ASN1HEX.getHexOfV_AtObj(a, e[0]);
            if (a.substr(e[1], 2) == "06") {
                b.algparam = ASN1HEX.getHexOfV_AtObj(a, e[1]);
            }
            if (a.substr(c[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)";
            }
            b.key = ASN1HEX.getHexOfV_AtObj(a, c[1]).substr(2);
            return b;
        },
        getRSAKeyFromPublicPKCS8Hex: function(a) {
            var b = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (b.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + b.length;
            }
            var c = ASN1HEX.getHexOfTLV_AtObj(a, b[0]);
            if (c != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmId is not rsaEncryption";
            }
            if (a.substr(b[1], 2) != "03") {
                throw "PKCS8 Public Key is not BITSTRING encapslated.";
            }
            var d = ASN1HEX.getStartPosOfV_AtObj(a, b[1]) + 2;
            if (a.substr(d, 2) != "30") {
                throw "PKCS8 Public Key is not SEQUENCE.";
            }
            var e = ASN1HEX.getPosArrayOfChildren_AtObj(a, d);
            if (e.length != 2) {
                throw "inner DERSequence shall have 2 elements: " + e.length;
            }
            if (a.substr(e[0], 2) != "02") {
                throw "N is not ASN.1 INTEGER";
            }
            if (a.substr(e[1], 2) != "02") {
                throw "E is not ASN.1 INTEGER";
            }
            var f = ASN1HEX.getHexOfV_AtObj(a, e[0]);
            var g = ASN1HEX.getHexOfV_AtObj(a, e[1]);
            var h = new RSAKey();
            h.setPublic(f, g);
            return h;
        }
    };
}();

var KEYUTIL = function() {
    var a = function(a, b, d) {
        return c(CryptoJS.AES, a, b, d);
    };
    var b = function(a, b, d) {
        return c(CryptoJS.TripleDES, a, b, d);
    };
    var c = function(a, b, c, d) {
        var e = CryptoJS.enc.Hex.parse(b);
        var f = CryptoJS.enc.Hex.parse(c);
        var g = CryptoJS.enc.Hex.parse(d);
        var h = {};
        h.key = f;
        h.iv = g;
        h.ciphertext = e;
        var i = a.decrypt(h, f, {
            iv: g
        });
        return CryptoJS.enc.Hex.stringify(i);
    };
    var d = function(a, b, c) {
        return f(CryptoJS.AES, a, b, c);
    };
    var e = function(a, b, c) {
        return f(CryptoJS.TripleDES, a, b, c);
    };
    var f = function(a, b, c, d) {
        var e = CryptoJS.enc.Hex.parse(b);
        var f = CryptoJS.enc.Hex.parse(c);
        var g = CryptoJS.enc.Hex.parse(d);
        var h = a.encrypt(e, f, {
            iv: g
        });
        var i = CryptoJS.enc.Hex.parse(h.toString());
        var j = CryptoJS.enc.Base64.stringify(i);
        return j;
    };
    var g = {
        "AES-256-CBC": {
            proc: a,
            eproc: d,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: a,
            eproc: d,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: a,
            eproc: d,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: b,
            eproc: e,
            keylen: 24,
            ivlen: 8
        }
    };
    var h = function(a) {
        return g[a]["proc"];
    };
    var i = function(a) {
        var b = CryptoJS.lib.WordArray.random(a);
        var c = CryptoJS.enc.Hex.stringify(b);
        return c;
    };
    var j = function(a) {
        var b = {};
        if (a.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"))) {
            b.cipher = RegExp.$1;
            b.ivsalt = RegExp.$2;
        }
        if (a.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"))) {
            b.type = RegExp.$1;
        }
        var c = -1;
        var d = 0;
        if (a.indexOf("\r\n\r\n") != -1) {
            c = a.indexOf("\r\n\r\n");
            d = 2;
        }
        if (a.indexOf("\n\n") != -1) {
            c = a.indexOf("\n\n");
            d = 1;
        }
        var e = a.indexOf("-----END");
        if (c != -1 && e != -1) {
            var f = a.substring(c + d * 2, e - d);
            f = f.replace(/\s+/g, "");
            b.data = f;
        }
        return b;
    };
    var k = function(a, b, c) {
        var d = c.substring(0, 16);
        var e = CryptoJS.enc.Hex.parse(d);
        var f = CryptoJS.enc.Utf8.parse(b);
        var h = g[a]["keylen"] + g[a]["ivlen"];
        var i = "";
        var j = null;
        for (;;) {
            var k = CryptoJS.algo.MD5.create();
            if (j != null) {
                k.update(j);
            }
            k.update(f);
            k.update(e);
            j = k.finalize();
            i = i + CryptoJS.enc.Hex.stringify(j);
            if (i.length >= h * 2) {
                break;
            }
        }
        var l = {};
        l.keyhex = i.substr(0, g[a]["keylen"] * 2);
        l.ivhex = i.substr(g[a]["keylen"] * 2, g[a]["ivlen"] * 2);
        return l;
    };
    var l = function(a, b, c, d) {
        var e = CryptoJS.enc.Base64.parse(a);
        var f = CryptoJS.enc.Hex.stringify(e);
        var h = g[b]["proc"];
        var i = h(f, c, d);
        return i;
    };
    var m = function(a, b, c, d) {
        var e = g[b]["eproc"];
        var f = e(a, c, d);
        return f;
    };
    return {
        version: "1.0.0",
        getHexFromPEM: function(a, b) {
            var c = a;
            if (c.indexOf("BEGIN " + b) == -1) {
                throw "can't find PEM header: " + b;
            }
            c = c.replace("-----BEGIN " + b + "-----", "");
            c = c.replace("-----END " + b + "-----", "");
            var d = c.replace(/\s+/g, "");
            var e = b64tohex(d);
            return e;
        },
        getDecryptedKeyHexByKeyIV: function(a, b, c, d) {
            var e = h(b);
            return e(a, c, d);
        },
        parsePKCS5PEM: function(a) {
            return j(a);
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(a, b, c) {
            return k(a, b, c);
        },
        decryptKeyB64: function(a, b, c, d) {
            return l(a, b, c, d);
        },
        getDecryptedKeyHex: function(a, b) {
            var c = j(a);
            var d = c.type;
            var e = c.cipher;
            var f = c.ivsalt;
            var g = c.data;
            var h = k(e, b, f);
            var i = h.keyhex;
            var m = l(g, e, i, f);
            return m;
        },
        getRSAKeyFromEncryptedPKCS5PEM: function(a, b) {
            var c = this.getDecryptedKeyHex(a, b);
            var d = new RSAKey();
            d.readPrivateKeyFromASN1HexString(c);
            return d;
        },
        getEncryptedPKCS5PEMFromPrvKeyHex: function(a, b, c, d) {
            var e = "";
            if (typeof c == "undefined" || c == null) {
                c = "AES-256-CBC";
            }
            if (typeof g[c] == "undefined") {
                throw "KEYUTIL unsupported algorithm: " + c;
            }
            if (typeof d == "undefined" || d == null) {
                var f = g[c]["ivlen"];
                var h = i(f);
                d = h.toUpperCase();
            }
            var j = k(c, b, d);
            var l = j.keyhex;
            var n = m(a, c, l, d);
            var o = n.replace(/(.{64})/g, "$1\r\n");
            var e = "-----BEGIN RSA PRIVATE KEY-----\r\n";
            e += "Proc-Type: 4,ENCRYPTED\r\n";
            e += "DEK-Info: " + c + "," + d + "\r\n";
            e += "\r\n";
            e += o;
            e += "\r\n-----END RSA PRIVATE KEY-----\r\n";
            return e;
        },
        getEncryptedPKCS5PEMFromRSAKey: function(a, b, c, d) {
            var e = new KJUR.asn1.DERInteger({
                "int": 0
            });
            var f = new KJUR.asn1.DERInteger({
                bigint: a.n
            });
            var g = new KJUR.asn1.DERInteger({
                "int": a.e
            });
            var h = new KJUR.asn1.DERInteger({
                bigint: a.d
            });
            var i = new KJUR.asn1.DERInteger({
                bigint: a.p
            });
            var j = new KJUR.asn1.DERInteger({
                bigint: a.q
            });
            var k = new KJUR.asn1.DERInteger({
                bigint: a.dmp1
            });
            var l = new KJUR.asn1.DERInteger({
                bigint: a.dmq1
            });
            var m = new KJUR.asn1.DERInteger({
                bigint: a.coeff
            });
            var n = new KJUR.asn1.DERSequence({
                array: [ e, f, g, h, i, j, k, l, m ]
            });
            var o = n.getEncodedHex();
            return this.getEncryptedPKCS5PEMFromPrvKeyHex(o, b, c, d);
        },
        newEncryptedPKCS5PEM: function(a, b, c, d) {
            if (typeof b == "undefined" || b == null) {
                b = 1024;
            }
            if (typeof c == "undefined" || c == null) {
                c = "10001";
            }
            var e = new RSAKey();
            e.generate(b, c);
            var f = null;
            if (typeof d == "undefined" || d == null) {
                f = this.getEncryptedPKCS5PEMFromRSAKey(pkey, a);
            } else {
                f = this.getEncryptedPKCS5PEMFromRSAKey(pkey, a, d);
            }
            return f;
        },
        getRSAKeyFromPlainPKCS8PEM: function(a) {
            if (a.match(/ENCRYPTED/)) {
                throw "pem shall be not ENCRYPTED";
            }
            var b = this.getHexFromPEM(a, "PRIVATE KEY");
            var c = this.getRSAKeyFromPlainPKCS8Hex(b);
            return c;
        },
        getRSAKeyFromPlainPKCS8Hex: function(a) {
            var b = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (b.length != 3) {
                throw "outer DERSequence shall have 3 elements: " + b.length;
            }
            var c = ASN1HEX.getHexOfTLV_AtObj(a, b[1]);
            if (c != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmIdentifier is not rsaEnc: " + c;
            }
            var c = ASN1HEX.getHexOfTLV_AtObj(a, b[1]);
            var d = ASN1HEX.getHexOfTLV_AtObj(a, b[2]);
            var e = ASN1HEX.getHexOfV_AtObj(d, 0);
            var f = new RSAKey();
            f.readPrivateKeyFromASN1HexString(e);
            return f;
        },
        parseHexOfEncryptedPKCS8: function(a) {
            var b = {};
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + c.length;
            }
            b.ciphertext = ASN1HEX.getHexOfV_AtObj(a, c[1]);
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c[0]);
            if (d.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + d.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(a, d[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2";
            }
            var e = ASN1HEX.getPosArrayOfChildren_AtObj(a, d[1]);
            if (d.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + e.length;
            }
            var f = ASN1HEX.getPosArrayOfChildren_AtObj(a, e[1]);
            if (f.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + f.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(a, f[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES";
            }
            b.encryptionSchemeAlg = "TripleDES";
            b.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(a, f[1]);
            var g = ASN1HEX.getPosArrayOfChildren_AtObj(a, e[0]);
            if (g.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + g.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(a, g[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2";
            }
            var h = ASN1HEX.getPosArrayOfChildren_AtObj(a, g[1]);
            if (h.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + h.length;
            }
            b.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(a, h[0]);
            var i = ASN1HEX.getHexOfV_AtObj(a, h[1]);
            try {
                b.pbkdf2Iter = parseInt(i, 16);
            } catch (j) {
                throw "malformed format pbkdf2Iter: " + i;
            }
            return b;
        },
        getPBKDF2KeyHexFromParam: function(a, b) {
            var c = CryptoJS.enc.Hex.parse(a.pbkdf2Salt);
            var d = a.pbkdf2Iter;
            var e = CryptoJS.PBKDF2(b, c, {
                keySize: 192 / 32,
                iterations: d
            });
            var f = CryptoJS.enc.Hex.stringify(e);
            return f;
        },
        getPlainPKCS8HexFromEncryptedPKCS8PEM: function(a, b) {
            var c = this.getHexFromPEM(a, "ENCRYPTED PRIVATE KEY");
            var d = this.parseHexOfEncryptedPKCS8(c);
            var e = KEYUTIL.getPBKDF2KeyHexFromParam(d, b);
            var f = {};
            f.ciphertext = CryptoJS.enc.Hex.parse(d.ciphertext);
            var g = CryptoJS.enc.Hex.parse(e);
            var h = CryptoJS.enc.Hex.parse(d.encryptionSchemeIV);
            var i = CryptoJS.TripleDES.decrypt(f, g, {
                iv: h
            });
            var j = CryptoJS.enc.Hex.stringify(i);
            return j;
        },
        getRSAKeyFromEncryptedPKCS8PEM: function(a, b) {
            var c = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(a, b);
            var d = this.getRSAKeyFromPlainPKCS8Hex(c);
            return d;
        },
        getKeyFromEncryptedPKCS8PEM: function(a, b) {
            var c = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(a, b);
            var d = this.getKeyFromPlainPrivatePKCS8Hex(c);
            return d;
        },
        parsePlainPrivatePKCS8Hex: function(a) {
            var b = {};
            b.algparam = null;
            if (a.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)";
            }
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)";
            }
            if (a.substr(c[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)";
            }
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c[1]);
            if (d.length != 2) {
                throw "malformed PKCS8 private key(code:004)";
            }
            if (a.substr(d[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)";
            }
            b.algoid = ASN1HEX.getHexOfV_AtObj(a, d[0]);
            if (a.substr(d[1], 2) == "06") {
                b.algparam = ASN1HEX.getHexOfV_AtObj(a, d[1]);
            }
            if (a.substr(c[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)";
            }
            b.keyidx = ASN1HEX.getStartPosOfV_AtObj(a, c[2]);
            return b;
        },
        getKeyFromPlainPrivatePKCS8PEM: function(a) {
            var b = this.getHexFromPEM(a, "PRIVATE KEY");
            var c = this.getKeyFromPlainPrivatePKCS8Hex(b);
            return c;
        },
        getKeyFromPlainPrivatePKCS8Hex: function(a) {
            var b = this.parsePlainPrivatePKCS8Hex(a);
            if (b.algoid == "2a864886f70d010101") {
                this.parsePrivateRawRSAKeyHexAtObj(a, b);
                var c = b.key;
                var d = new RSAKey();
                d.setPrivateEx(c.n, c.e, c.d, c.p, c.q, c.dp, c.dq, c.co);
                return d;
            } else {
                if (b.algoid == "2a8648ce3d0201") {
                    this.parsePrivateRawECKeyHexAtObj(a, b);
                    if (KJUR.crypto.OID.oidhex2name[b.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + b.algparam;
                    }
                    var e = KJUR.crypto.OID.oidhex2name[b.algparam];
                    var d = new KJUR.crypto.ECDSA({
                        curve: e,
                        prv: b.key
                    });
                    return d;
                } else {
                    throw "unsupported private key algorithm";
                }
            }
        },
        getRSAKeyFromPublicPKCS8PEM: function(a) {
            var b = this.getHexFromPEM(a, "PUBLIC KEY");
            var c = this.getRSAKeyFromPublicPKCS8Hex(b);
            return c;
        },
        getKeyFromPublicPKCS8PEM: function(a) {
            var b = this.getHexFromPEM(a, "PUBLIC KEY");
            var c = this.getKeyFromPublicPKCS8Hex(b);
            return c;
        },
        getKeyFromPublicPKCS8Hex: function(a) {
            var b = this.parsePublicPKCS8Hex(a);
            if (b.algoid == "2a864886f70d010101") {
                var c = this.parsePublicRawRSAKeyHex(b.key);
                var d = new RSAKey();
                d.setPublic(c.n, c.e);
                return d;
            } else {
                if (b.algoid == "2a8648ce3d0201") {
                    if (KJUR.crypto.OID.oidhex2name[b.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + b.algparam;
                    }
                    var e = KJUR.crypto.OID.oidhex2name[b.algparam];
                    var d = new KJUR.crypto.ECDSA({
                        curve: e,
                        pub: b.key
                    });
                    return d;
                } else {
                    throw "unsupported public key algorithm";
                }
            }
        },
        parsePublicRawRSAKeyHex: function(a) {
            var b = {};
            if (a.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)";
            }
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 2) {
                throw "malformed RSA key(code:002)";
            }
            if (a.substr(c[0], 2) != "02") {
                throw "malformed RSA key(code:003)";
            }
            b.n = ASN1HEX.getHexOfV_AtObj(a, c[0]);
            if (a.substr(c[1], 2) != "02") {
                throw "malformed RSA key(code:004)";
            }
            b.e = ASN1HEX.getHexOfV_AtObj(a, c[1]);
            return b;
        },
        parsePrivateRawRSAKeyHexAtObj: function(a, b) {
            var c = b.keyidx;
            if (a.substr(c, 2) != "30") {
                throw "malformed RSA private key(code:001)";
            }
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c);
            if (d.length != 9) {
                throw "malformed RSA private key(code:002)";
            }
            b.key = {};
            b.key.n = ASN1HEX.getHexOfV_AtObj(a, d[1]);
            b.key.e = ASN1HEX.getHexOfV_AtObj(a, d[2]);
            b.key.d = ASN1HEX.getHexOfV_AtObj(a, d[3]);
            b.key.p = ASN1HEX.getHexOfV_AtObj(a, d[4]);
            b.key.q = ASN1HEX.getHexOfV_AtObj(a, d[5]);
            b.key.dp = ASN1HEX.getHexOfV_AtObj(a, d[6]);
            b.key.dq = ASN1HEX.getHexOfV_AtObj(a, d[7]);
            b.key.co = ASN1HEX.getHexOfV_AtObj(a, d[8]);
        },
        parsePrivateRawECKeyHexAtObj: function(a, b) {
            var c = b.keyidx;
            if (a.substr(c, 2) != "30") {
                throw "malformed ECC private key(code:001)";
            }
            var d = ASN1HEX.getPosArrayOfChildren_AtObj(a, c);
            if (d.length != 3) {
                throw "malformed ECC private key(code:002)";
            }
            if (a.substr(d[1], 2) != "04") {
                throw "malformed ECC private key(code:003)";
            }
            b.key = ASN1HEX.getHexOfV_AtObj(a, d[1]);
        },
        parsePublicPKCS8Hex: function(a) {
            var b = {};
            b.algparam = null;
            var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (c.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + c.length;
            }
            var d = c[0];
            if (a.substr(d, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)";
            }
            var e = ASN1HEX.getPosArrayOfChildren_AtObj(a, d);
            if (e.length != 2) {
                throw "malformed PKCS8 public key(code:002)";
            }
            if (a.substr(e[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)";
            }
            b.algoid = ASN1HEX.getHexOfV_AtObj(a, e[0]);
            if (a.substr(e[1], 2) == "06") {
                b.algparam = ASN1HEX.getHexOfV_AtObj(a, e[1]);
            }
            if (a.substr(c[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)";
            }
            b.key = ASN1HEX.getHexOfV_AtObj(a, c[1]).substr(2);
            return b;
        },
        getRSAKeyFromPublicPKCS8Hex: function(a) {
            var b = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
            if (b.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + b.length;
            }
            var c = ASN1HEX.getHexOfTLV_AtObj(a, b[0]);
            if (c != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmId is not rsaEncryption";
            }
            if (a.substr(b[1], 2) != "03") {
                throw "PKCS8 Public Key is not BITSTRING encapslated.";
            }
            var d = ASN1HEX.getStartPosOfV_AtObj(a, b[1]) + 2;
            if (a.substr(d, 2) != "30") {
                throw "PKCS8 Public Key is not SEQUENCE.";
            }
            var e = ASN1HEX.getPosArrayOfChildren_AtObj(a, d);
            if (e.length != 2) {
                throw "inner DERSequence shall have 2 elements: " + e.length;
            }
            if (a.substr(e[0], 2) != "02") {
                throw "N is not ASN.1 INTEGER";
            }
            if (a.substr(e[1], 2) != "02") {
                throw "E is not ASN.1 INTEGER";
            }
            var f = ASN1HEX.getHexOfV_AtObj(a, e[0]);
            var g = ASN1HEX.getHexOfV_AtObj(a, e[1]);
            var h = new RSAKey();
            h.setPublic(f, g);
            return h;
        }
    };
}();

KEYUTIL.getKey = function(a, b, c) {
    if (a instanceof RSAKey) {
        return a;
    }
    if (a instanceof KJUR.crypto.ECDSA) {
        return a;
    }
    if (a.xy !== undefined && a.curve !== undefined) {
        return new KJUR.crypto.ECDSA({
            prv: a.xy,
            curve: a.curve
        });
    }
    if (a.n !== undefined && a.e !== undefined && a.d !== undefined && a.p !== undefined && a.q !== undefined && a.dp !== undefined && a.dq !== undefined && a.co !== undefined) {
        var d = new RSAKey();
        d.setPrivateEx(a.n, a.e, a.d, a.p, a.q, a.dp, a.dq, a.co);
        return d;
    }
    if (a.d !== undefined && a.curve !== undefined) {
        return new KJUR.crypto.ECDSA({
            pub: a.d,
            curve: a.curve
        });
    }
    if (a.n !== undefined && a.e) {
        var d = new RSAKey();
        d.setPublic(a.n, a.e);
        return d;
    }
    if (a.indexOf("-END CERTIFICATE-", 0) != -1 || a.indexOf("-END X509 CERTIFICATE-", 0) != -1 || a.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {
        return X509.getPublicKeyFromCertPEM(a);
    }
    if (c === "pkcs8pub") {
        return KEYUTIL.getKeyFromPublicPKCS8Hex(a);
    }
    if (a.indexOf("-END PUBLIC KEY-") != -1) {
        return KEYUTIL.getKeyFromPublicPKCS8PEM(a);
    }
    if (c === "pkcs5prv") {
        var d = new RSAKey();
        d.readPrivateKeyFromASN1HexString(a);
        return d;
    }
    if (c === "pkcs5prv") {
        var d = new RSAKey();
        d.readPrivateKeyFromASN1HexString(a);
        return d;
    }
    if (a.indexOf("-END RSA PRIVATE KEY-") != -1 && a.indexOf("4,ENCRYPTED") == -1) {
        var d = new RSAKey();
        d.readPrivateKeyFromPEMString(a);
        return d;
    }
    if (a.indexOf("-END PRIVATE KEY-") != -1) {
        return KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(a);
    }
    if (a.indexOf("-END RSA PRIVATE KEY-") != -1 && a.indexOf("4,ENCRYPTED") != -1) {
        return KEYUTIL.getRSAKeyFromEncryptedPKCS5PEM(a, b);
    }
    if (a.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {
        return KEYUTIL.getKeyFromEncryptedPKCS8PEM(a, b);
    }
    throw "not supported argument";
};

KEYUTIL.generateKeypair = function(a, b) {
    if (a == "RSA") {
        var c = b;
        var d = new RSAKey();
        d.generate(c, "10001");
        var e = new RSAKey();
        var f = d.n.toString(16);
        var g = d.e.toString(16);
        e.setPublic(f, g);
        var h = {};
        h.prvKeyObj = d;
        h.pubKeyObj = e;
        return h;
    } else {
        if (a == "EC") {
            var i = b;
            var j = new KJUR.crypto.ECDSA({
                curve: i
            });
            var k = j.generateKeyPairHex();
            var d = new KJUR.crypto.ECDSA({
                curve: i
            });
            d.setPrivateKeyHex(k.ecprvhex);
            var e = new KJUR.crypto.ECDSA({
                curve: i
            });
            e.setPublicKeyHex(k.ecpubhex);
            var h = {};
            h.prvKeyObj = d;
            h.pubKeyObj = e;
            return h;
        } else {
            throw "unknown algorithm: " + a;
        }
    }
};

function _rsapem_pemToBase64(a) {
    var b = a;
    b = b.replace("-----BEGIN RSA PRIVATE KEY-----", "");
    b = b.replace("-----END RSA PRIVATE KEY-----", "");
    b = b.replace(/[ \n]+/g, "");
    return b;
}

function _rsapem_getPosArrayOfChildrenFromHex(a) {
    var b = new Array();
    var c = ASN1HEX.getStartPosOfV_AtObj(a, 0);
    var d = ASN1HEX.getPosOfNextSibling_AtObj(a, c);
    var e = ASN1HEX.getPosOfNextSibling_AtObj(a, d);
    var f = ASN1HEX.getPosOfNextSibling_AtObj(a, e);
    var g = ASN1HEX.getPosOfNextSibling_AtObj(a, f);
    var h = ASN1HEX.getPosOfNextSibling_AtObj(a, g);
    var i = ASN1HEX.getPosOfNextSibling_AtObj(a, h);
    var j = ASN1HEX.getPosOfNextSibling_AtObj(a, i);
    var k = ASN1HEX.getPosOfNextSibling_AtObj(a, j);
    b.push(c, d, e, f, g, h, i, j, k);
    return b;
}

function _rsapem_getHexValueArrayOfChildrenFromHex(a) {
    var b = _rsapem_getPosArrayOfChildrenFromHex(a);
    var c = ASN1HEX.getHexOfV_AtObj(a, b[0]);
    var d = ASN1HEX.getHexOfV_AtObj(a, b[1]);
    var e = ASN1HEX.getHexOfV_AtObj(a, b[2]);
    var f = ASN1HEX.getHexOfV_AtObj(a, b[3]);
    var g = ASN1HEX.getHexOfV_AtObj(a, b[4]);
    var h = ASN1HEX.getHexOfV_AtObj(a, b[5]);
    var i = ASN1HEX.getHexOfV_AtObj(a, b[6]);
    var j = ASN1HEX.getHexOfV_AtObj(a, b[7]);
    var k = ASN1HEX.getHexOfV_AtObj(a, b[8]);
    var l = new Array();
    l.push(c, d, e, f, g, h, i, j, k);
    return l;
}

function _rsapem_readPrivateKeyFromASN1HexString(a) {
    var b = _rsapem_getHexValueArrayOfChildrenFromHex(a);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);
}

function _rsapem_readPrivateKeyFromPEMString(a) {
    var b = _rsapem_pemToBase64(a);
    var c = b64tohex(b);
    var d = _rsapem_getHexValueArrayOfChildrenFromHex(c);
    this.setPrivateEx(d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]);
}

RSAKey.prototype.readPrivateKeyFromPEMString = _rsapem_readPrivateKeyFromPEMString;

RSAKey.prototype.readPrivateKeyFromASN1HexString = _rsapem_readPrivateKeyFromASN1HexString;

var _RE_HEXDECONLY = new RegExp("");

_RE_HEXDECONLY.compile("[^0-9a-f]", "gi");

function _rsasign_getHexPaddedDigestInfoForString(a, b, c) {
    var d = function(a) {
        return KJUR.crypto.Util.hashString(a, c);
    };
    var e = d(a);
    return KJUR.crypto.Util.getPaddedDigestInfoHex(e, c, b);
}

function _zeroPaddingOfSignature(a, b) {
    var c = "";
    var d = b / 4 - a.length;
    for (var e = 0; e < d; e++) {
        c = c + "0";
    }
    return c + a;
}

function _rsasign_signString(a, b) {
    var c = function(a) {
        return KJUR.crypto.Util.hashString(a, b);
    };
    var d = c(a);
    return this.signWithMessageHash(d, b);
}

function _rsasign_signWithMessageHash(a, b) {
    var c = KJUR.crypto.Util.getPaddedDigestInfoHex(a, b, this.n.bitLength());
    var d = parseBigInt(c, 16);
    var e = this.doPrivate(d);
    var f = e.toString(16);
    return _zeroPaddingOfSignature(f, this.n.bitLength());
}

function _rsasign_signStringWithSHA1(a) {
    return _rsasign_signString.call(this, a, "sha1");
}

function _rsasign_signStringWithSHA256(a) {
    return _rsasign_signString.call(this, a, "sha256");
}

function pss_mgf1_str(a, b, c) {
    var d = "", e = 0;
    while (d.length < b) {
        d += hextorstr(c(rstrtohex(a + String.fromCharCode.apply(String, [ (e & 4278190080) >> 24, (e & 16711680) >> 16, (e & 65280) >> 8, e & 255 ]))));
        e += 1;
    }
    return d;
}

function _rsasign_signStringPSS(a, b, c) {
    var d = function(a) {
        return KJUR.crypto.Util.hashHex(a, b);
    };
    var e = d(rstrtohex(a));
    if (c === undefined) {
        c = -1;
    }
    return this.signWithMessageHashPSS(e, b, c);
}

function _rsasign_signWithMessageHashPSS(a, b, c) {
    var d = hextorstr(a);
    var e = d.length;
    var f = this.n.bitLength() - 1;
    var g = Math.ceil(f / 8);
    var h;
    var i = function(a) {
        return KJUR.crypto.Util.hashHex(a, b);
    };
    if (c === -1 || c === undefined) {
        c = e;
    } else {
        if (c === -2) {
            c = g - e - 2;
        } else {
            if (c < -2) {
                throw "invalid salt length";
            }
        }
    }
    if (g < e + c + 2) {
        throw "data too long";
    }
    var j = "";
    if (c > 0) {
        j = new Array(c);
        new SecureRandom().nextBytes(j);
        j = String.fromCharCode.apply(String, j);
    }
    var k = hextorstr(i(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + d + j)));
    var l = [];
    for (h = 0; h < g - c - e - 2; h += 1) {
        l[h] = 0;
    }
    var m = String.fromCharCode.apply(String, l) + "" + j;
    var n = pss_mgf1_str(k, m.length, i);
    var o = [];
    for (h = 0; h < m.length; h += 1) {
        o[h] = m.charCodeAt(h) ^ n.charCodeAt(h);
    }
    var p = 65280 >> 8 * g - f & 255;
    o[0] &= ~p;
    for (h = 0; h < e; h++) {
        o.push(k.charCodeAt(h));
    }
    o.push(188);
    return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(o)).toString(16), this.n.bitLength());
}

function _rsasign_getDecryptSignatureBI(a, b, c) {
    var d = new RSAKey();
    d.setPublic(b, c);
    var e = d.doPublic(a);
    return e;
}

function _rsasign_getHexDigestInfoFromSig(a, b, c) {
    var d = _rsasign_getDecryptSignatureBI(a, b, c);
    var e = d.toString(16).replace(/^1f+00/, "");
    return e;
}

function _rsasign_getAlgNameAndHashFromHexDisgestInfo(a) {
    for (var b in KJUR.crypto.Util.DIGESTINFOHEAD) {
        var c = KJUR.crypto.Util.DIGESTINFOHEAD[b];
        var d = c.length;
        if (a.substring(0, d) == c) {
            var e = [ b, a.substring(d) ];
            return e;
        }
    }
    return [];
}

function _rsasign_verifySignatureWithArgs(a, b, c, d) {
    var e = _rsasign_getHexDigestInfoFromSig(b, c, d);
    var f = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (f.length == 0) {
        return false;
    }
    var g = f[0];
    var h = f[1];
    var i = function(a) {
        return KJUR.crypto.Util.hashString(a, g);
    };
    var j = i(a);
    return h == j;
}

function _rsasign_verifyHexSignatureForMessage(a, b) {
    var c = parseBigInt(a, 16);
    var d = _rsasign_verifySignatureWithArgs(b, c, this.n.toString(16), this.e.toString(16));
    return d;
}

function _rsasign_verifyString(a, b) {
    b = b.replace(_RE_HEXDECONLY, "");
    b = b.replace(/[ \n]+/g, "");
    var c = parseBigInt(b, 16);
    if (c.bitLength() > this.n.bitLength()) {
        return 0;
    }
    var d = this.doPublic(c);
    var e = d.toString(16).replace(/^1f+00/, "");
    var f = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (f.length == 0) {
        return false;
    }
    var g = f[0];
    var h = f[1];
    var i = function(a) {
        return KJUR.crypto.Util.hashString(a, g);
    };
    var j = i(a);
    return h == j;
}

function _rsasign_verifyWithMessageHash(a, b) {
    b = b.replace(_RE_HEXDECONLY, "");
    b = b.replace(/[ \n]+/g, "");
    var c = parseBigInt(b, 16);
    if (c.bitLength() > this.n.bitLength()) {
        return 0;
    }
    var d = this.doPublic(c);
    var e = d.toString(16).replace(/^1f+00/, "");
    var f = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (f.length == 0) {
        return false;
    }
    var g = f[0];
    var h = f[1];
    return h == a;
}

function _rsasign_verifyStringPSS(a, b, c, d) {
    var e = function(a) {
        return KJUR.crypto.Util.hashHex(a, c);
    };
    var f = e(rstrtohex(a));
    if (d === undefined) {
        d = -1;
    }
    return this.verifyWithMessageHashPSS(f, b, c, d);
}

function _rsasign_verifyWithMessageHashPSS(a, b, c, d) {
    var e = new BigInteger(b, 16);
    if (e.bitLength() > this.n.bitLength()) {
        return false;
    }
    var f = function(a) {
        return KJUR.crypto.Util.hashHex(a, c);
    };
    var g = hextorstr(a);
    var h = g.length;
    var i = this.n.bitLength() - 1;
    var j = Math.ceil(i / 8);
    var k;
    if (d === -1 || d === undefined) {
        d = h;
    } else {
        if (d === -2) {
            d = j - h - 2;
        } else {
            if (d < -2) {
                throw "invalid salt length";
            }
        }
    }
    if (j < h + d + 2) {
        throw "data too long";
    }
    var l = this.doPublic(e).toByteArray();
    for (k = 0; k < l.length; k += 1) {
        l[k] &= 255;
    }
    while (l.length < j) {
        l.unshift(0);
    }
    if (l[j - 1] !== 188) {
        throw "encoded message does not end in 0xbc";
    }
    l = String.fromCharCode.apply(String, l);
    var m = l.substr(0, j - h - 1);
    var n = l.substr(m.length, h);
    var o = 65280 >> 8 * j - i & 255;
    if ((m.charCodeAt(0) & o) !== 0) {
        throw "bits beyond keysize not zero";
    }
    var p = pss_mgf1_str(n, m.length, f);
    var q = [];
    for (k = 0; k < m.length; k += 1) {
        q[k] = m.charCodeAt(k) ^ p.charCodeAt(k);
    }
    q[0] &= ~o;
    var r = j - h - d - 2;
    for (k = 0; k < r; k += 1) {
        if (q[k] !== 0) {
            throw "leftmost octets not zero";
        }
    }
    if (q[r] !== 1) {
        throw "0x01 marker not found";
    }
    return n === hextorstr(f(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + g + String.fromCharCode.apply(String, q.slice(-d)))));
}

RSAKey.prototype.signWithMessageHash = _rsasign_signWithMessageHash;

RSAKey.prototype.signString = _rsasign_signString;

RSAKey.prototype.signStringWithSHA1 = _rsasign_signStringWithSHA1;

RSAKey.prototype.signStringWithSHA256 = _rsasign_signStringWithSHA256;

RSAKey.prototype.sign = _rsasign_signString;

RSAKey.prototype.signWithSHA1 = _rsasign_signStringWithSHA1;

RSAKey.prototype.signWithSHA256 = _rsasign_signStringWithSHA256;

RSAKey.prototype.signWithMessageHashPSS = _rsasign_signWithMessageHashPSS;

RSAKey.prototype.signStringPSS = _rsasign_signStringPSS;

RSAKey.prototype.signPSS = _rsasign_signStringPSS;

RSAKey.SALT_LEN_HLEN = -1;

RSAKey.SALT_LEN_MAX = -2;

RSAKey.prototype.verifyWithMessageHash = _rsasign_verifyWithMessageHash;

RSAKey.prototype.verifyString = _rsasign_verifyString;

RSAKey.prototype.verifyHexSignatureForMessage = _rsasign_verifyHexSignatureForMessage;

RSAKey.prototype.verify = _rsasign_verifyString;

RSAKey.prototype.verifyHexSignatureForByteArrayMessage = _rsasign_verifyHexSignatureForMessage;

RSAKey.prototype.verifyWithMessageHashPSS = _rsasign_verifyWithMessageHashPSS;

RSAKey.prototype.verifyStringPSS = _rsasign_verifyStringPSS;

RSAKey.prototype.verifyPSS = _rsasign_verifyStringPSS;

RSAKey.SALT_LEN_RECOVER = -2;

function X509() {
    this.subjectPublicKeyRSA = null;
    this.subjectPublicKeyRSA_hN = null;
    this.subjectPublicKeyRSA_hE = null;
    this.hex = null;
    this.getSerialNumberHex = function() {
        return ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [ 0, 1 ]);
    };
    this.getIssuerHex = function() {
        return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [ 0, 3 ]);
    };
    this.getIssuerString = function() {
        return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [ 0, 3 ]));
    };
    this.getSubjectHex = function() {
        return ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [ 0, 5 ]);
    };
    this.getSubjectString = function() {
        return X509.hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex, 0, [ 0, 5 ]));
    };
    this.getNotBefore = function() {
        var a = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [ 0, 4, 0 ]);
        a = a.replace(/(..)/g, "%$1");
        a = decodeURIComponent(a);
        return a;
    };
    this.getNotAfter = function() {
        var a = ASN1HEX.getDecendantHexVByNthList(this.hex, 0, [ 0, 4, 1 ]);
        a = a.replace(/(..)/g, "%$1");
        a = decodeURIComponent(a);
        return a;
    };
    this.readCertPEM = function(a) {
        var b = X509.pemToHex(a);
        var c = X509.getPublicKeyHexArrayFromCertHex(b);
        var d = new RSAKey();
        d.setPublic(c[0], c[1]);
        this.subjectPublicKeyRSA = d;
        this.subjectPublicKeyRSA_hN = c[0];
        this.subjectPublicKeyRSA_hE = c[1];
        this.hex = b;
    };
    this.readCertPEMWithoutRSAInit = function(a) {
        var b = X509.pemToHex(a);
        var c = X509.getPublicKeyHexArrayFromCertHex(b);
        this.subjectPublicKeyRSA.setPublic(c[0], c[1]);
        this.subjectPublicKeyRSA_hN = c[0];
        this.subjectPublicKeyRSA_hE = c[1];
        this.hex = b;
    };
}

X509.pemToBase64 = function(a) {
    var b = a;
    b = b.replace("-----BEGIN CERTIFICATE-----", "");
    b = b.replace("-----END CERTIFICATE-----", "");
    b = b.replace(/[ \n]+/g, "");
    return b;
};

X509.pemToHex = function(a) {
    var b = X509.pemToBase64(a);
    var c = b64tohex(b);
    return c;
};

X509.getSubjectPublicKeyPosFromCertHex = function(a) {
    var b = X509.getSubjectPublicKeyInfoPosFromCertHex(a);
    if (b == -1) {
        return -1;
    }
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, b);
    if (c.length != 2) {
        return -1;
    }
    var d = c[1];
    if (a.substring(d, d + 2) != "03") {
        return -1;
    }
    var e = ASN1HEX.getStartPosOfV_AtObj(a, d);
    if (a.substring(e, e + 2) != "00") {
        return -1;
    }
    return e + 2;
};

X509.getSubjectPublicKeyInfoPosFromCertHex = function(a) {
    var b = ASN1HEX.getStartPosOfV_AtObj(a, 0);
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, b);
    if (c.length < 1) {
        return -1;
    }
    if (a.substring(c[0], c[0] + 10) == "a003020102") {
        if (c.length < 6) {
            return -1;
        }
        return c[6];
    } else {
        if (c.length < 5) {
            return -1;
        }
        return c[5];
    }
};

X509.getPublicKeyHexArrayFromCertHex = function(a) {
    var b = X509.getSubjectPublicKeyPosFromCertHex(a);
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, b);
    if (c.length != 2) {
        return [];
    }
    var d = ASN1HEX.getHexOfV_AtObj(a, c[0]);
    var e = ASN1HEX.getHexOfV_AtObj(a, c[1]);
    if (d != null && e != null) {
        return [ d, e ];
    } else {
        return [];
    }
};

X509.getHexTbsCertificateFromCert = function(a) {
    var b = ASN1HEX.getStartPosOfV_AtObj(a, 0);
    return b;
};

X509.getPublicKeyHexArrayFromCertPEM = function(a) {
    var b = X509.pemToHex(a);
    var c = X509.getPublicKeyHexArrayFromCertHex(b);
    return c;
};

X509.hex2dn = function(a) {
    var b = "";
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(a, 0);
    for (var d = 0; d < c.length; d++) {
        var e = ASN1HEX.getHexOfTLV_AtObj(a, c[d]);
        b = b + "/" + X509.hex2rdn(e);
    }
    return b;
};

X509.hex2rdn = function(a) {
    var b = ASN1HEX.getDecendantHexTLVByNthList(a, 0, [ 0, 0 ]);
    var c = ASN1HEX.getDecendantHexVByNthList(a, 0, [ 0, 1 ]);
    var d = "";
    try {
        d = X509.DN_ATTRHEX[b];
    } catch (e) {
        d = b;
    }
    c = c.replace(/(..)/g, "%$1");
    var f = decodeURIComponent(c);
    return d + "=" + f;
};

X509.DN_ATTRHEX = {
    "0603550406": "C",
    "060355040a": "O",
    "060355040b": "OU",
    "0603550403": "CN",
    "0603550405": "SN",
    "0603550408": "ST",
    "0603550407": "L"
};

X509.getPublicKeyFromCertPEM = function(a) {
    var b = X509.getPublicKeyInfoPropOfCertPEM(a);
    if (b.algoid == "2a864886f70d010101") {
        var c = PKCS5PKEY.parsePublicRawRSAKeyHex(b.keyhex);
        var d = new RSAKey();
        d.setPublic(c.n, c.e);
        return d;
    } else {
        if (b.algoid = "2a8648ce3d0201") {
            var e = KJUR.crypto.OID.oidhex2name[b.algparam];
            var d = new KJUR.crypto.ECDSA({
                curve: e,
                info: b.keyhex
            });
            d.setPublicKeyHex(b.keyhex);
            return d;
        } else {
            throw "unsupported key";
        }
    }
};

X509.getPublicKeyInfoPropOfCertPEM = function(a) {
    var b = {};
    b.algparam = null;
    var c = X509.pemToHex(a);
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
    if (d.length != 3) {
        throw "malformed X.509 certificate PEM (code:001)";
    }
    if (c.substr(d[0], 2) != "30") {
        throw "malformed X.509 certificate PEM (code:002)";
    }
    var e = ASN1HEX.getPosArrayOfChildren_AtObj(c, d[0]);
    if (e.length < 7) {
        throw "malformed X.509 certificate PEM (code:003)";
    }
    var f = ASN1HEX.getPosArrayOfChildren_AtObj(c, e[6]);
    if (f.length != 2) {
        throw "malformed X.509 certificate PEM (code:004)";
    }
    var g = ASN1HEX.getPosArrayOfChildren_AtObj(c, f[0]);
    if (g.length != 2) {
        throw "malformed X.509 certificate PEM (code:005)";
    }
    b.algoid = ASN1HEX.getHexOfV_AtObj(c, g[0]);
    if (c.substr(g[1], 2) == "06") {
        b.algparam = ASN1HEX.getHexOfV_AtObj(c, g[1]);
    }
    if (c.substr(f[1], 2) != "03") {
        throw "malformed X.509 certificate PEM (code:006)";
    }
    var h = ASN1HEX.getHexOfV_AtObj(c, f[1]);
    b.keyhex = h.substr(2);
    return b;
};

if (typeof KJUR == "undefined" || !KJUR) KJUR = {};

if (typeof KJUR.jws == "undefined" || !KJUR.jws) KJUR.jws = {};

KJUR.jws.JWS = function() {
    this.parseJWS = function(a, b) {
        if (this.parsedJWS !== undefined && (b || this.parsedJWS.sigvalH !== undefined)) {
            return;
        }
        if (a.match(/^([^.]+)\.([^.]+)\.([^.]+)$/) == null) {
            throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
        }
        var c = RegExp.$1;
        var d = RegExp.$2;
        var e = RegExp.$3;
        var f = c + "." + d;
        this.parsedJWS = {};
        this.parsedJWS.headB64U = c;
        this.parsedJWS.payloadB64U = d;
        this.parsedJWS.sigvalB64U = e;
        this.parsedJWS.si = f;
        if (!b) {
            var g = b64utohex(e);
            var h = parseBigInt(g, 16);
            this.parsedJWS.sigvalH = g;
            this.parsedJWS.sigvalBI = h;
        }
        var i = b64utoutf8(c);
        var j = b64utoutf8(d);
        this.parsedJWS.headS = i;
        this.parsedJWS.payloadS = j;
        if (!this.isSafeJSONString(i, this.parsedJWS, "headP")) throw "malformed JSON string for JWS Head: " + i;
    };
    function a(a, b) {
        return utf8tob64u(a) + "." + utf8tob64u(b);
    }
    function b(a, b) {
        var c = function(a) {
            return KJUR.crypto.Util.hashString(a, b);
        };
        if (c == null) throw "hash function not defined in jsrsasign: " + b;
        return c(a);
    }
    function c(b, c, d, e, f) {
        var g = a(b, c);
        var h = parseBigInt(d, 16);
        return _rsasign_verifySignatureWithArgs(g, h, e, f);
    }
    this.verifyJWSByNE = function(a, b, c) {
        this.parseJWS(a);
        return _rsasign_verifySignatureWithArgs(this.parsedJWS.si, this.parsedJWS.sigvalBI, b, c);
    };
    this.verifyJWSByKey = function(a, b) {
        this.parseJWS(a);
        var c = d(this.parsedJWS.headP);
        var e = this.parsedJWS.headP["alg"].substr(0, 2) == "PS";
        if (b.hashAndVerify) {
            return b.hashAndVerify(c, new Buffer(this.parsedJWS.si, "utf8").toString("base64"), b64utob64(this.parsedJWS.sigvalB64U), "base64", e);
        } else if (e) {
            return b.verifyStringPSS(this.parsedJWS.si, this.parsedJWS.sigvalH, c);
        } else {
            return b.verifyString(this.parsedJWS.si, this.parsedJWS.sigvalH);
        }
    };
    this.verifyJWSByPemX509Cert = function(a, b) {
        this.parseJWS(a);
        var c = new X509();
        c.readCertPEM(b);
        return c.subjectPublicKeyRSA.verifyString(this.parsedJWS.si, this.parsedJWS.sigvalH);
    };
    function d(a) {
        var b = a["alg"];
        var c = "";
        if (b != "RS256" && b != "RS512" && b != "PS256" && b != "PS512") throw "JWS signature algorithm not supported: " + b;
        if (b.substr(2) == "256") c = "sha256";
        if (b.substr(2) == "512") c = "sha512";
        return c;
    }
    function e(a) {
        return d(jsonParse(a));
    }
    function f(a, b, c, d, f, g) {
        var h = new RSAKey();
        h.setPrivate(d, f, g);
        var i = e(a);
        var j = h.signString(c, i);
        return j;
    }
    function g(a, b, c, f, g) {
        var h = null;
        if (typeof g == "undefined") {
            h = e(a);
        } else {
            h = d(g);
        }
        var i = g["alg"].substr(0, 2) == "PS";
        if (f.hashAndSign) {
            return b64tob64u(f.hashAndSign(h, c, "binary", "base64", i));
        } else if (i) {
            return hextob64u(f.signStringPSS(c, h));
        } else {
            return hextob64u(f.signString(c, h));
        }
    }
    function h(b, c, d, e, g) {
        var h = a(b, c);
        return f(b, c, h, d, e, g);
    }
    this.generateJWSByNED = function(b, c, d, e, g) {
        if (!this.isSafeJSONString(b)) throw "JWS Head is not safe JSON string: " + b;
        var h = a(b, c);
        var i = f(b, c, h, d, e, g);
        var j = hextob64u(i);
        this.parsedJWS = {};
        this.parsedJWS.headB64U = h.split(".")[0];
        this.parsedJWS.payloadB64U = h.split(".")[1];
        this.parsedJWS.sigvalB64U = j;
        return h + "." + j;
    };
    this.generateJWSByKey = function(b, c, d) {
        var e = {};
        if (!this.isSafeJSONString(b, e, "headP")) throw "JWS Head is not safe JSON string: " + b;
        var f = a(b, c);
        var h = g(b, c, f, d, e.headP);
        this.parsedJWS = {};
        this.parsedJWS.headB64U = f.split(".")[0];
        this.parsedJWS.payloadB64U = f.split(".")[1];
        this.parsedJWS.sigvalB64U = h;
        return f + "." + h;
    };
    function i(a, b, c, d) {
        var f = new RSAKey();
        f.readPrivateKeyFromPEMString(d);
        var g = e(a);
        var h = f.signString(c, g);
        return h;
    }
    this.generateJWSByP1PrvKey = function(b, c, d) {
        if (!this.isSafeJSONString(b)) throw "JWS Head is not safe JSON string: " + b;
        var e = a(b, c);
        var f = i(b, c, e, d);
        var g = hextob64u(f);
        this.parsedJWS = {};
        this.parsedJWS.headB64U = e.split(".")[0];
        this.parsedJWS.payloadB64U = e.split(".")[1];
        this.parsedJWS.sigvalB64U = g;
        return e + "." + g;
    };
};

KJUR.jws.JWS.sign = function(a, b, c, d, e) {
    var f = KJUR.jws.JWS;
    if (!f.isSafeJSONString(b)) throw "JWS Head is not safe JSON string: " + sHead;
    var g = f.readSafeJSONString(b);
    if ((a == "" || a == null) && g["alg"] !== undefined) {
        a = g["alg"];
    }
    if (a != "" && a != null && g["alg"] === undefined) {
        g["alg"] = a;
        b = JSON.stringify(g);
    }
    var h = null;
    if (f.jwsalg2sigalg[a] === undefined) {
        throw "unsupported alg name: " + a;
    } else {
        h = f.jwsalg2sigalg[a];
    }
    var i = utf8tob64u(b);
    var j = utf8tob64u(c);
    var k = i + "." + j;
    var l = "";
    if (h.substr(0, 4) == "Hmac") {
        if (d === undefined) throw "hexadecimal key shall be specified for HMAC";
        var m = new KJUR.crypto.Mac({
            alg: h,
            pass: hextorstr(d)
        });
        m.updateString(k);
        l = m.doFinal();
    } else if (h.indexOf("withECDSA") != -1) {
        var n = new KJUR.crypto.Signature({
            alg: h
        });
        n.init(d, e);
        n.updateString(k);
        hASN1Sig = n.sign();
        l = KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig);
    } else if (h != "none") {
        var n = new KJUR.crypto.Signature({
            alg: h
        });
        n.init(d, e);
        n.updateString(k);
        l = n.sign();
    }
    var o = hextob64u(l);
    return k + "." + o;
};

KJUR.jws.JWS.verify = function(a, b) {
    var c = KJUR.jws.JWS;
    var d = a.split(".");
    var e = d[0];
    var f = d[1];
    var g = e + "." + f;
    var h = b64utohex(d[2]);
    var i = c.readSafeJSONString(b64utoutf8(d[0]));
    var j = null;
    if (i.alg === undefined) {
        throw "algorithm not specified in header";
    } else {
        j = i.alg;
    }
    var k = null;
    if (c.jwsalg2sigalg[i.alg] === undefined) {
        throw "unsupported alg name: " + j;
    } else {
        k = c.jwsalg2sigalg[j];
    }
    if (k == "none") {
        return true;
    } else if (k.substr(0, 4) == "Hmac") {
        if (b === undefined) throw "hexadecimal key shall be specified for HMAC";
        var l = new KJUR.crypto.Mac({
            alg: k,
            pass: hextorstr(b)
        });
        l.updateString(g);
        hSig2 = l.doFinal();
        return h == hSig2;
    } else if (k.indexOf("withECDSA") != -1) {
        var m = null;
        try {
            m = KJUR.crypto.ECDSA.concatSigToASN1Sig(h);
        } catch (n) {
            return false;
        }
        var o = new KJUR.crypto.Signature({
            alg: k
        });
        o.init(b);
        o.updateString(g);
        return o.verify(m);
    } else {
        var o = new KJUR.crypto.Signature({
            alg: k
        });
        o.init(b);
        o.updateString(g);
        return o.verify(h);
    }
};

KJUR.jws.JWS.jwsalg2sigalg = {
    HS256: "HmacSHA256",
    HS512: "HmacSHA512",
    RS256: "SHA256withRSA",
    RS384: "SHA384withRSA",
    RS512: "SHA512withRSA",
    ES256: "SHA256withECDSA",
    ES384: "SHA384withECDSA",
    PS256: "SHA256withRSAandMGF1",
    PS384: "SHA384withRSAandMGF1",
    PS512: "SHA512withRSAandMGF1",
    none: "none"
};

KJUR.jws.JWS.isSafeJSONString = function(a, b, c) {
    var d = null;
    try {
        d = jsonParse(a);
        if (typeof d != "object") return 0;
        if (d.constructor === Array) return 0;
        if (b) b[c] = d;
        return 1;
    } catch (e) {
        return 0;
    }
};

KJUR.jws.JWS.readSafeJSONString = function(a) {
    var b = null;
    try {
        b = jsonParse(a);
        if (typeof b != "object") return null;
        if (b.constructor === Array) return null;
        return b;
    } catch (c) {
        return null;
    }
};

KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function(a) {
    if (a.match(/^[^.]+\.[^.]+\.([^.]+)$/) == null) {
        throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
    }
    return RegExp.$1;
};

KJUR.jws.IntDate = function() {};

KJUR.jws.IntDate.get = function(a) {
    if (a == "now") {
        return KJUR.jws.IntDate.getNow();
    } else if (a == "now + 1hour") {
        return KJUR.jws.IntDate.getNow() + 60 * 60;
    } else if (a == "now + 1day") {
        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24;
    } else if (a == "now + 1month") {
        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 30;
    } else if (a == "now + 1year") {
        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 365;
    } else if (a.match(/Z$/)) {
        return KJUR.jws.IntDate.getZulu(a);
    } else if (a.match(/^[0-9]+$/)) {
        return parseInt(a);
    }
    throw "unsupported format: " + a;
};

KJUR.jws.IntDate.getZulu = function(b) {
    if (a = b.match(/(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)Z/)) {
        var c = parseInt(RegExp.$1);
        var d = parseInt(RegExp.$2) - 1;
        var e = parseInt(RegExp.$3);
        var f = parseInt(RegExp.$4);
        var g = parseInt(RegExp.$5);
        var h = parseInt(RegExp.$6);
        var i = new Date(Date.UTC(c, d, e, f, g, h));
        return ~~(i / 1e3);
    }
    throw "unsupported format: " + b;
};

KJUR.jws.IntDate.getNow = function() {
    var a = ~~(new Date() / 1e3);
    return a;
};

KJUR.jws.IntDate.intDate2UTCString = function(a) {
    var b = new Date(a * 1e3);
    return b.toUTCString();
};

KJUR.jws.IntDate.intDate2Zulu = function(a) {
    var b = new Date(a * 1e3);
    var c = ("0000" + b.getUTCFullYear()).slice(-4);
    var d = ("00" + (b.getUTCMonth() + 1)).slice(-2);
    var e = ("00" + b.getUTCDate()).slice(-2);
    var f = ("00" + b.getUTCHours()).slice(-2);
    var g = ("00" + b.getUTCMinutes()).slice(-2);
    var h = ("00" + b.getUTCSeconds()).slice(-2);
    return c + d + e + f + g + h + "Z";
};

CodeMirror.defineMode("jwt", function() {
    function a(a, c) {
        a.eatWhile(/[^.]/);
        c.cur = b;
        return "jwt-header";
    }
    function b(a, b) {
        a.next();
        b.cur = c;
        return "jwt-dot";
    }
    function c(a, b) {
        a.eatWhile(/[^.]/);
        b.cur = d;
        return "jwt-payload";
    }
    function d(a, b) {
        a.next();
        b.cur = e;
        return "jwt-dot";
    }
    function e(a) {
        a.skipToEnd();
        return "jwt-signature";
    }
    return {
        token: function(a, b) {
            var c = b.cur;
            return c(a, b);
        },
        startState: function() {
            return {
                cur: a
            };
        }
    };
});

window.hextorstr = function(a) {
    return window.CryptoJS.enc.Hex.parse(a);
};

function url_base64_decode(a) {
    var b = a.replace("-", "+").replace("_", "/");
    switch (b.length % 4) {
      case 0:
        break;

      case 2:
        b += "==";
        break;

      case 3:
        b += "=";
        break;

      default:
        throw "Illegal base64url string!";
    }
    return window.atob(b);
}

window.decode = function(a) {
    var b = null, c = null;
    try {
        b = url_base64_decode(a);
    } catch (d) {
        c = d;
    }
    return {
        result: b,
        error: c
    };
};

window.sign = function(a, b, c, d) {
    var e = "", f = null, g, h;
    try {
        g = JSON.stringify(JSON.parse(a));
    } catch (i) {
        f = {
            result: null,
            error: {
                cause: i,
                who: [ "header" ]
            }
        };
    }
    try {
        h = JSON.stringify(JSON.parse(b));
    } catch (i) {
        if (f) {
            f.error.who.push("payload");
        } else {
            f = {
                result: null,
                error: {
                    cause: i,
                    who: [ "payload" ]
                }
            };
        }
    }
    if (f) {
        return f;
    }
    if (d) {
        try {
            c = window.b64utob64(c);
            c = window.CryptoJS.enc.Base64.parse(c).toString();
        } catch (i) {
            return {
                result: "",
                error: i
            };
        }
    } else {
        c = window.CryptoJS.enc.Latin1.parse(c).toString();
    }
    try {
        e = KJUR.jws.JWS.sign(null, g, h, c);
    } catch (i) {
        f = i;
    }
    return {
        result: e,
        error: f
    };
};

window.isValidBase64String = function(a) {
    try {
        a = window.b64utob64(a);
        window.CryptoJS.enc.Base64.parse(a).toString();
        return true;
    } catch (b) {
        return false;
    }
};

window.verify = function(a, b, c) {
    var d = "", e = null;
    if (c) {
        try {
            b = window.b64utob64(b);
            b = window.CryptoJS.enc.Base64.parse(b).toString();
        } catch (f) {
            return {
                result: "",
                error: f
            };
        }
    } else {
        b = window.CryptoJS.enc.Latin1.parse(b).toString();
    }
    try {
        d = KJUR.jws.JWS.verify(a, b);
    } catch (f) {
        e = f;
    }
    return {
        result: d,
        error: e
    };
};

(function() {
    function a(a) {
        var b;
        if (document.createEvent) {
            b = document.createEvent("HTMLEvents");
            b.initEvent("change", true, true);
        } else {
            b = document.createEventObject();
            b.eventType = "change";
        }
        b.eventName = "change";
        if (document.createEvent) {
            a.dispatchEvent(b);
        } else {
            a.fireEvent("on" + b.eventType, b);
        }
    }
    var b = CodeMirror;
    function c(a) {
        a.replaceSelection("   ", "end");
    }
    var d = $(".token-input");
    var e = b(document.getElementsByClassName("xml-input")[0], {
        mode: "text/html",
        htmlMode: false,
        autofocus: true,
        extraKeys: {
            Tab: c
        }
    });
    function f(a) {
        localStorage.jwtValue = a;
    }
    function g(a) {
        a(localStorage.jwtValue);
        localStorage.clear();
    }
    function h(a) {
        if (!a) {
            return null;
        }
        return a.replace(/\s/g, "");
    }
    d.on("change keypress paste focus textInput input", function() {
        var a = window.decode(d.val()).result;
    });
    g(function(a) {
        d.val(a || "PHNhbWxwOlJlc3BvbnNlIHhtbG5zOnNhbWxwPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6cHJvdG9jb2wiIElEPSJzMmEwZGEzNTA0YWZmOTc4YjBmOGM4MGY2YTYyYzcxM2M0YTJmNjRjNWIiIEluUmVzcG9uc2VUbz0iX2JlYzQyNGZhNTEwMzQyODkwOWEzMGZmMWUzMTE2ODMyN2Y3OTQ3NDk4NCIgVmVyc2lvbj0iMi4wIiBJc3N1ZUluc3RhbnQ9IjIwMDctMTItMTBUMTE6Mzk6NDhaIiBEZXN0aW5hdGlvbj0iaHR0cDovL21vb2RsZS5icmlkZ2UuZmVpZGUubm8vc2ltcGxlc2FtbC9zYW1sMi9zcC9Bc3NlcnRpb25Db25zdW1lclNlcnZpY2UucGhwIj4NCiAgICA8c2FtbDpJc3N1ZXIgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgIG1heC5mZWlkZS5ubw0KICAgIDwvc2FtbDpJc3N1ZXI+DQogICAgPHNhbWxwOlN0YXR1cyB4bWxuczpzYW1scD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOnByb3RvY29sIj4NCiAgICAgICAgPHNhbWxwOlN0YXR1c0NvZGUgeG1sbnM6c2FtbHA9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpwcm90b2NvbCIgVmFsdWU9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDpzdGF0dXM6U3VjY2VzcyI+DQogICAgICAgIDwvc2FtbHA6U3RhdHVzQ29kZT4NCiAgICA8L3NhbWxwOlN0YXR1cz4NCiAgICA8c2FtbDpBc3NlcnRpb24geG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiIgVmVyc2lvbj0iMi4wIiBJRD0iczJiN2FmZThlMjFhMDkxMGQwMjdkZmJjOTRlYzRiODYyZTFmYmJkOWFiIiBJc3N1ZUluc3RhbnQ9IjIwMDctMTItMTBUMTE6Mzk6NDhaIj4NCiAgICAgICAgPHNhbWw6SXNzdWVyPg0KICAgICAgICAgICAgbWF4LmZlaWRlLm5vDQogICAgICAgIDwvc2FtbDpJc3N1ZXI+DQogICAgICAgIDxTaWduYXR1cmUgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyMiPg0KICAgICAgICAgICAgPFNpZ25lZEluZm8+DQogICAgICAgICAgICAgICAgPENhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzEwL3htbC1leGMtYzE0biMiIC8+DQogICAgICAgICAgICAgICAgPFNpZ25hdHVyZU1ldGhvZCBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNyc2Etc2hhMSIgLz4NCiAgICAgICAgICAgICAgICA8UmVmZXJlbmNlIFVSST0iI3MyYjdhZmU4ZTIxYTA5MTBkMDI3ZGZiYzk0ZWM0Yjg2MmUxZmJiZDlhYiI+DQogICAgICAgICAgICAgICAgICAgIDxUcmFuc2Zvcm1zPg0KICAgICAgICAgICAgICAgICAgICAgICAgPFRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvMDkveG1sZHNpZyNlbnZlbG9wZWQtc2lnbmF0dXJlIiAvPg0KICAgICAgICAgICAgICAgICAgICAgICAgPFRyYW5zZm9ybSBBbGdvcml0aG09Imh0dHA6Ly93d3cudzMub3JnLzIwMDEvMTAveG1sLWV4Yy1jMTRuIyIgLz4NCiAgICAgICAgICAgICAgICAgICAgPC9UcmFuc2Zvcm1zPg0KICAgICAgICAgICAgICAgICAgICA8RGlnZXN0TWV0aG9kIEFsZ29yaXRobT0iaHR0cDovL3d3dy53My5vcmcvMjAwMC8wOS94bWxkc2lnI3NoYTEiIC8+DQogICAgICAgICAgICAgICAgICAgIDxEaWdlc3RWYWx1ZT4NCiAgICAgICAgICAgICAgICAgICAgICAgIGs3ei90M2lQS2l5WTlQN0I4N0ZJc014bmxuaz0NCiAgICAgICAgICAgICAgICAgICAgPC9EaWdlc3RWYWx1ZT4NCiAgICAgICAgICAgICAgICA8L1JlZmVyZW5jZT4NCiAgICAgICAgICAgIDwvU2lnbmVkSW5mbz4NCiAgICAgICAgICAgIDxTaWduYXR1cmVWYWx1ZT4NCiAgICAgICAgICAgICAgICBLdlVyekdjd0dzdThXTU5vZ0lSZkF4eFdsTzR1S1hoSnJvdU9ZYWFka3pVSHZ6MXhiVlVSSDM1c2k2VTgwODR1dE5BalhUalp5eGZqIHF1ckVYN1ZnQ3c2WG43RnhuNG5KeEQ2Rk9QNXgvaVJrOEtxQ3VmaXBSTkh3SUNxL1Z1ZnFQa3JQN3NWTGR5bUp5WjJDdTVRckVVMjMgcWFJempGZjg0S2ZwNExWbmxKWT0NCiAgICAgICAgICAgIDwvU2lnbmF0dXJlVmFsdWU+DQogICAgICAgICAgICA8S2V5SW5mbz4NCiAgICAgICAgICAgICAgICA8WDUwOURhdGE+DQogICAgICAgICAgICAgICAgICAgIDxYNTA5Q2VydGlmaWNhdGU+DQogICAgICAgICAgICAgICAgICAgICAgICBNSUlCL2pDQ0FXY0NCRWJ6ak5zd0RRWUpLb1pJaHZjTkFRRUZCUUF3UmpFTE1Ba0dBMVVFQmhNQ1RrOHhFREFPQmdOVkJBb1RCMVZPIFNVNUZWRlF4RGpBTUJnTlZCQXNUQlVabGFXUmxNUlV3RXdZRFZRUURFd3h0WVhndVptVnBaR1V1Ym04d0hoY05NRGN3T1RJeE1Ea3kgTURJM1doY05NRGN4TWpJd01Ea3lNREkzV2pCR01Rc3dDUVlEVlFRR0V3Sk9UekVRTUE0R0ExVUVDaE1IVlU1SlRrVlVWREVPTUF3RyBBMVVFQ3hNRlJtVnBaR1V4RlRBVEJnTlZCQU1UREcxaGVDNW1aV2xrWlM1dWJ6Q0JuekFOQmdrcWhraUc5dzBCQVFFRkFBT0JqUUF3IGdZa0NnWUVBdlpsQnpRMmpHTTZROVNUQko2dHF0dWdrT0JNRVUva3B2dndPbFQ2YzFYNVVJWE13QXBMK05WMkVhcWsrb0EwTitNNDIgSjdTeTBkTERxS1ZDd3NoN3Fwc0lZbERTL29teVVNZHk2QXp2cHRSVVVoTExoQzZ6UUZGQVUrNnJjVUtFaVNrRVI1ZXppQjRNM2FlMCBFa1cwZHJtMXJPWndiMjJ0cjhOSjY1cTNnbnNDQXdFQUFUQU5CZ2txaGtpRzl3MEJBUVVGQUFPQmdRQ21WU3RhOVRXaW4vd3Z2R09pIGU4Q3E3Y0VnME1KTGtCV0xvZk5OenJ6aDZoaVFnZnV6OUtNb20va2g5SnVHRWp5RTdySURiWHAyaWx4U0hnWlNhVmZFa3duTWZRNTEgdnVIVXJ0Um9sRC9za3lzSW9jbStISktic21QTWpTUmZVRnl6Qmg0Uk5qUG9Ddlp2VGRueUJmTVAvaS9IMzluakFkQlJpKzQ5YW9wYyB2dz09DQogICAgICAgICAgICAgICAgICAgIDwvWDUwOUNlcnRpZmljYXRlPg0KICAgICAgICAgICAgICAgIDwvWDUwOURhdGE+DQogICAgICAgICAgICA8L0tleUluZm8+DQogICAgICAgIDwvU2lnbmF0dXJlPg0KICAgICAgICA8c2FtbDpTdWJqZWN0Pg0KICAgICAgICAgICAgPHNhbWw6TmFtZUlEIE5hbWVRdWFsaWZpZXI9Im1heC5mZWlkZS5ubyIgU1BOYW1lUXVhbGlmaWVyPSJ1cm46bWFjZTpmZWlkZS5ubzpzZXJ2aWNlczpuby5mZWlkZS5tb29kbGUiIEZvcm1hdD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOm5hbWVpZC1mb3JtYXQ6cGVyc2lzdGVudCI+DQogICAgICAgICAgICAgICAgVUIvV0pBYUtBUHJTSGJxbGJjS1d1N0prdGNLWQ0KICAgICAgICAgICAgPC9zYW1sOk5hbWVJRD4NCiAgICAgICAgICAgIDxzYW1sOlN1YmplY3RDb25maXJtYXRpb24gTWV0aG9kPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6Y206YmVhcmVyIj4NCiAgICAgICAgICAgICAgICA8c2FtbDpTdWJqZWN0Q29uZmlybWF0aW9uRGF0YSBOb3RPbk9yQWZ0ZXI9IjIwMDctMTItMTBUMTk6Mzk6NDhaIiBJblJlc3BvbnNlVG89Il9iZWM0MjRmYTUxMDM0Mjg5MDlhMzBmZjFlMzExNjgzMjdmNzk0NzQ5ODQiIFJlY2lwaWVudD0iaHR0cDovL21vb2RsZS5icmlkZ2UuZmVpZGUubm8vc2ltcGxlc2FtbC9zYW1sMi9zcC9Bc3NlcnRpb25Db25zdW1lclNlcnZpY2UucGhwIj4NCiAgICAgICAgICAgICAgICA8L3NhbWw6U3ViamVjdENvbmZpcm1hdGlvbkRhdGE+DQogICAgICAgICAgICA8L3NhbWw6U3ViamVjdENvbmZpcm1hdGlvbj4NCiAgICAgICAgPC9zYW1sOlN1YmplY3Q+DQogICAgICAgIDxzYW1sOkNvbmRpdGlvbnMgTm90QmVmb3JlPSIyMDA3LTEyLTEwVDExOjI5OjQ4WiIgTm90T25PckFmdGVyPSIyMDA3LTEyLTEwVDE5OjM5OjQ4WiI+DQogICAgICAgICAgICA8c2FtbDpBdWRpZW5jZVJlc3RyaWN0aW9uPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF1ZGllbmNlPg0KICAgICAgICAgICAgICAgICAgICB1cm46bWFjZTpmZWlkZS5ubzpzZXJ2aWNlczpuby5mZWlkZS5tb29kbGUNCiAgICAgICAgICAgICAgICA8L3NhbWw6QXVkaWVuY2U+DQogICAgICAgICAgICA8L3NhbWw6QXVkaWVuY2VSZXN0cmljdGlvbj4NCiAgICAgICAgPC9zYW1sOkNvbmRpdGlvbnM+DQogICAgICAgIDxzYW1sOkF1dGhuU3RhdGVtZW50IEF1dGhuSW5zdGFudD0iMjAwNy0xMi0xMFQxMTozOTo0OFoiIFNlc3Npb25JbmRleD0iczI1OWZhZDljYWQwY2Y3ZDJiM2I2OGY0MmIxN2QwY2ZhNjY2OGUwMjAxIj4NCiAgICAgICAgICAgIDxzYW1sOkF1dGhuQ29udGV4dD4NCiAgICAgICAgICAgICAgICA8c2FtbDpBdXRobkNvbnRleHRDbGFzc1JlZj4NCiAgICAgICAgICAgICAgICAgICAgdXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFjOmNsYXNzZXM6UGFzc3dvcmQNCiAgICAgICAgICAgICAgICA8L3NhbWw6QXV0aG5Db250ZXh0Q2xhc3NSZWY+DQogICAgICAgICAgICA8L3NhbWw6QXV0aG5Db250ZXh0Pg0KICAgICAgICA8L3NhbWw6QXV0aG5TdGF0ZW1lbnQ+DQogICAgICAgIDxzYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJnaXZlbk5hbWUiPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBSa1ZKUkVVZ1ZHVnpkQ0JWYzJWeUlDaG5hWFpsYms1aGJXVXBJTU80dzZiRHBjT1l3NGJEaFE9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZWR1UGVyc29uUHJpbmNpcGFsTmFtZSI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGRHVnpkRUJtWldsa1pTNXVidz09DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJvIj4NCiAgICAgICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGVWYWx1ZSB4bWxuczpzYW1sPSJ1cm46b2FzaXM6bmFtZXM6dGM6U0FNTDoyLjA6YXNzZXJ0aW9uIj4NCiAgICAgICAgICAgICAgICAgICAgVlU1SlRrVlVWQT09DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJvdSI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIFZVNUpUa1ZVVkE9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZWR1UGVyc29uT3JnRE4iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBaR005ZFc1cGJtVjBkQ3hrWXoxdWJ3PT0NCiAgICAgICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlVmFsdWU+DQogICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlPg0KICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlIE5hbWU9ImVkdVBlcnNvblByaW1hcnlBZmZpbGlhdGlvbiI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGMzUjFaR1Z1ZEE9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0ibWFpbCI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGJXOXlhV0V0YzNWd2NHOXlkRUIxYm1sdVpYUjBMbTV2DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZSBOYW1lPSJwcmVmZXJyZWRMYW5ndWFnZSI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGJtOD0NCiAgICAgICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlVmFsdWU+DQogICAgICAgICAgICA8L3NhbWw6QXR0cmlidXRlPg0KICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlIE5hbWU9ImVkdVBlcnNvbk9yZ1VuaXRETiI+DQogICAgICAgICAgICAgICAgPHNhbWw6QXR0cmlidXRlVmFsdWUgeG1sbnM6c2FtbD0idXJuOm9hc2lzOm5hbWVzOnRjOlNBTUw6Mi4wOmFzc2VydGlvbiI+DQogICAgICAgICAgICAgICAgICAgIGIzVTlkVzVwYm1WMGRDeHZkVDF2Y21kaGJtbDZZWFJwYjI0c1pHTTlkVzVwYm1WMGRDeGtZejF1Ync9PQ0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0ic24iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBSa1ZKUkVVZ1ZHVnpkQ0JWYzJWeUlDaHpiaWtndzdqRHBzT2x3NWpEaHNPRg0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iY24iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBSa1ZKUkVVZ1ZHVnpkQ0JWYzJWeUlDaGpiaWtndzdqRHBzT2x3NWpEaHNPRg0KICAgICAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGVWYWx1ZT4NCiAgICAgICAgICAgIDwvc2FtbDpBdHRyaWJ1dGU+DQogICAgICAgICAgICA8c2FtbDpBdHRyaWJ1dGUgTmFtZT0iZWR1UGVyc29uQWZmaWxpYXRpb24iPg0KICAgICAgICAgICAgICAgIDxzYW1sOkF0dHJpYnV0ZVZhbHVlIHhtbG5zOnNhbWw9InVybjpvYXNpczpuYW1lczp0YzpTQU1MOjIuMDphc3NlcnRpb24iPg0KICAgICAgICAgICAgICAgICAgICBaVzF3Ykc5NVpXVT1fYzNSaFptWT1fYzNSMVpHVnVkQT09DQogICAgICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVZhbHVlPg0KICAgICAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZT4NCiAgICAgICAgPC9zYW1sOkF0dHJpYnV0ZVN0YXRlbWVudD4NCiAgICA8L3NhbWw6QXNzZXJ0aW9uPg0KPC9zYW1scDpSZXNwb25zZT4=");
        var b = window.decode(d.val()).result;
        e.setValue(b);
        console.log(e);
    });
})();

(function() {
    setInterval(function() {
        var a, b;
        b = new Date(1987, 5, 30);
        a = new Date();
        return $("#time").text(((a - b) / 1e3).toFixed(0));
    }, 1e3);
}).call(this);

$(window).on("resize", function() {
    reinit();
});

$(function() {
    var a = document.querySelector("canvas"), b = a.getContext("2d"), c = "#000000";
    a.width = window.innerWidth;
    a.height = window.innerHeight;
    a.style.display = "block";
    b.fillStyle = c;
    b.lineWidth = .1;
    b.strokeStyle = c;
    var d = {
        x: 30 * a.width / 100,
        y: 30 * a.height / 100
    };
    var e = {
        nb: 300,
        distance: 100,
        d_radius: 150,
        array: []
    };
    function f() {
        this.x = Math.random() * a.width;
        this.y = Math.random() * a.height;
        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();
        this.radius = Math.random();
    }
    f.prototype = {
        create: function() {
            b.beginPath();
            b.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            b.fill();
        },
        animate: function() {
            for (i = 0; i < e.nb; i++) {
                var b = e.array[i];
                if (b.y < 0 || b.y > a.height) {
                    b.vx = b.vx;
                    b.vy = -b.vy;
                } else if (b.x < 0 || b.x > a.width) {
                    b.vx = -b.vx;
                    b.vy = b.vy;
                }
                b.x += b.vx;
                b.y += b.vy;
            }
        },
        line: function() {
            for (i = 0; i < e.nb; i++) {
                for (j = 0; j < e.nb; j++) {
                    i_dot = e.array[i];
                    j_dot = e.array[j];
                    if (i_dot.x - j_dot.x < e.distance && i_dot.y - j_dot.y < e.distance && i_dot.x - j_dot.x > -e.distance && i_dot.y - j_dot.y > -e.distance) {
                        if (i_dot.x - d.x < e.d_radius && i_dot.y - d.y < e.d_radius && i_dot.x - d.x > -e.d_radius && i_dot.y - d.y > -e.d_radius) {
                            b.beginPath();
                            b.moveTo(i_dot.x, i_dot.y);
                            b.lineTo(j_dot.x, j_dot.y);
                            b.stroke();
                            b.closePath();
                        }
                    }
                }
            }
        }
    };
    function g() {
        b.clearRect(0, 0, a.width, a.height);
        for (i = 0; i < e.nb; i++) {
            e.array.push(new f());
            dot = e.array[i];
            dot.create();
        }
        dot.line();
        dot.animate();
    }
    $("canvas").on("mousemove mouseleave", function(b) {
        if (b.type == "mousemove") {
            d.x = b.pageX;
            d.y = b.pageY;
        }
        if (b.type == "mouseleave") {
            d.x = a.width / 2;
            d.y = a.height / 2;
        }
    });
    setInterval(g, 1e3 / 30);
});