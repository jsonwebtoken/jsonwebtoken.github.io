var jsonlint = function() {
    var parser = {
        trace: function trace() {},
        yy: {},
        symbols_: {
            error: 2,
            JSONString: 3,
            STRING: 4,
            JSONNumber: 5,
            NUMBER: 6,
            JSONNullLiteral: 7,
            NULL: 8,
            JSONBooleanLiteral: 9,
            TRUE: 10,
            FALSE: 11,
            JSONText: 12,
            JSONValue: 13,
            EOF: 14,
            JSONObject: 15,
            JSONArray: 16,
            "{": 17,
            "}": 18,
            JSONMemberList: 19,
            JSONMember: 20,
            ":": 21,
            ",": 22,
            "[": 23,
            "]": 24,
            JSONElementList: 25,
            $accept: 0,
            $end: 1
        },
        terminals_: {
            2: "error",
            4: "STRING",
            6: "NUMBER",
            8: "NULL",
            10: "TRUE",
            11: "FALSE",
            14: "EOF",
            17: "{",
            18: "}",
            21: ":",
            22: ",",
            23: "[",
            24: "]"
        },
        productions_: [ 0, [ 3, 1 ], [ 5, 1 ], [ 7, 1 ], [ 9, 1 ], [ 9, 1 ], [ 12, 2 ], [ 13, 1 ], [ 13, 1 ], [ 13, 1 ], [ 13, 1 ], [ 13, 1 ], [ 13, 1 ], [ 15, 2 ], [ 15, 3 ], [ 20, 3 ], [ 19, 1 ], [ 19, 3 ], [ 16, 2 ], [ 16, 3 ], [ 25, 1 ], [ 25, 3 ] ],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
            var $0 = $$.length - 1;
            switch (yystate) {
              case 1:
                this.$ = yytext.replace(/\\(\\|")/g, "$" + "1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "	").replace(/\\v/g, "").replace(/\\f/g, "\f").replace(/\\b/g, "\b");
                break;

              case 2:
                this.$ = Number(yytext);
                break;

              case 3:
                this.$ = null;
                break;

              case 4:
                this.$ = true;
                break;

              case 5:
                this.$ = false;
                break;

              case 6:
                return this.$ = $$[$0 - 1];
                break;

              case 13:
                this.$ = {};
                break;

              case 14:
                this.$ = $$[$0 - 1];
                break;

              case 15:
                this.$ = [ $$[$0 - 2], $$[$0] ];
                break;

              case 16:
                this.$ = {};
                this.$[$$[$0][0]] = $$[$0][1];
                break;

              case 17:
                this.$ = $$[$0 - 2];
                $$[$0 - 2][$$[$0][0]] = $$[$0][1];
                break;

              case 18:
                this.$ = [];
                break;

              case 19:
                this.$ = $$[$0 - 1];
                break;

              case 20:
                this.$ = [ $$[$0] ];
                break;

              case 21:
                this.$ = $$[$0 - 2];
                $$[$0 - 2].push($$[$0]);
                break;
            }
        },
        table: [ {
            3: 5,
            4: [ 1, 12 ],
            5: 6,
            6: [ 1, 13 ],
            7: 3,
            8: [ 1, 9 ],
            9: 4,
            10: [ 1, 10 ],
            11: [ 1, 11 ],
            12: 1,
            13: 2,
            15: 7,
            16: 8,
            17: [ 1, 14 ],
            23: [ 1, 15 ]
        }, {
            1: [ 3 ]
        }, {
            14: [ 1, 16 ]
        }, {
            14: [ 2, 7 ],
            18: [ 2, 7 ],
            22: [ 2, 7 ],
            24: [ 2, 7 ]
        }, {
            14: [ 2, 8 ],
            18: [ 2, 8 ],
            22: [ 2, 8 ],
            24: [ 2, 8 ]
        }, {
            14: [ 2, 9 ],
            18: [ 2, 9 ],
            22: [ 2, 9 ],
            24: [ 2, 9 ]
        }, {
            14: [ 2, 10 ],
            18: [ 2, 10 ],
            22: [ 2, 10 ],
            24: [ 2, 10 ]
        }, {
            14: [ 2, 11 ],
            18: [ 2, 11 ],
            22: [ 2, 11 ],
            24: [ 2, 11 ]
        }, {
            14: [ 2, 12 ],
            18: [ 2, 12 ],
            22: [ 2, 12 ],
            24: [ 2, 12 ]
        }, {
            14: [ 2, 3 ],
            18: [ 2, 3 ],
            22: [ 2, 3 ],
            24: [ 2, 3 ]
        }, {
            14: [ 2, 4 ],
            18: [ 2, 4 ],
            22: [ 2, 4 ],
            24: [ 2, 4 ]
        }, {
            14: [ 2, 5 ],
            18: [ 2, 5 ],
            22: [ 2, 5 ],
            24: [ 2, 5 ]
        }, {
            14: [ 2, 1 ],
            18: [ 2, 1 ],
            21: [ 2, 1 ],
            22: [ 2, 1 ],
            24: [ 2, 1 ]
        }, {
            14: [ 2, 2 ],
            18: [ 2, 2 ],
            22: [ 2, 2 ],
            24: [ 2, 2 ]
        }, {
            3: 20,
            4: [ 1, 12 ],
            18: [ 1, 17 ],
            19: 18,
            20: 19
        }, {
            3: 5,
            4: [ 1, 12 ],
            5: 6,
            6: [ 1, 13 ],
            7: 3,
            8: [ 1, 9 ],
            9: 4,
            10: [ 1, 10 ],
            11: [ 1, 11 ],
            13: 23,
            15: 7,
            16: 8,
            17: [ 1, 14 ],
            23: [ 1, 15 ],
            24: [ 1, 21 ],
            25: 22
        }, {
            1: [ 2, 6 ]
        }, {
            14: [ 2, 13 ],
            18: [ 2, 13 ],
            22: [ 2, 13 ],
            24: [ 2, 13 ]
        }, {
            18: [ 1, 24 ],
            22: [ 1, 25 ]
        }, {
            18: [ 2, 16 ],
            22: [ 2, 16 ]
        }, {
            21: [ 1, 26 ]
        }, {
            14: [ 2, 18 ],
            18: [ 2, 18 ],
            22: [ 2, 18 ],
            24: [ 2, 18 ]
        }, {
            22: [ 1, 28 ],
            24: [ 1, 27 ]
        }, {
            22: [ 2, 20 ],
            24: [ 2, 20 ]
        }, {
            14: [ 2, 14 ],
            18: [ 2, 14 ],
            22: [ 2, 14 ],
            24: [ 2, 14 ]
        }, {
            3: 20,
            4: [ 1, 12 ],
            20: 29
        }, {
            3: 5,
            4: [ 1, 12 ],
            5: 6,
            6: [ 1, 13 ],
            7: 3,
            8: [ 1, 9 ],
            9: 4,
            10: [ 1, 10 ],
            11: [ 1, 11 ],
            13: 30,
            15: 7,
            16: 8,
            17: [ 1, 14 ],
            23: [ 1, 15 ]
        }, {
            14: [ 2, 19 ],
            18: [ 2, 19 ],
            22: [ 2, 19 ],
            24: [ 2, 19 ]
        }, {
            3: 5,
            4: [ 1, 12 ],
            5: 6,
            6: [ 1, 13 ],
            7: 3,
            8: [ 1, 9 ],
            9: 4,
            10: [ 1, 10 ],
            11: [ 1, 11 ],
            13: 31,
            15: 7,
            16: 8,
            17: [ 1, 14 ],
            23: [ 1, 15 ]
        }, {
            18: [ 2, 17 ],
            22: [ 2, 17 ]
        }, {
            18: [ 2, 15 ],
            22: [ 2, 15 ]
        }, {
            22: [ 2, 21 ],
            24: [ 2, 21 ]
        } ],
        defaultActions: {
            16: [ 2, 6 ]
        },
        parseError: function parseError(str, hash) {
            throw new Error(str);
        },
        parse: function parse(input) {
            var self = this, stack = [ 0 ], vstack = [ null ], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            this.lexer.setInput(input);
            this.lexer.yy = this.yy;
            this.yy.lexer = this.lexer;
            if (typeof this.lexer.yylloc == "undefined") this.lexer.yylloc = {};
            var yyloc = this.lexer.yylloc;
            lstack.push(yyloc);
            if (typeof this.yy.parseError === "function") this.parseError = this.yy.parseError;
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = self.lexer.lex() || 1;
                if (typeof token !== "number") {
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol == null) symbol = lex();
                    action = table[state] && table[state][symbol];
                }
                _handle_error: if (typeof action === "undefined" || !action.length || !action[0]) {
                    if (!recovering) {
                        expected = [];
                        for (p in table[state]) if (this.terminals_[p] && p > 2) {
                            expected.push("'" + this.terminals_[p] + "'");
                        }
                        var errStr = "";
                        if (this.lexer.showPosition) {
                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'";
                        } else {
                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                        }
                        this.parseError(errStr, {
                            text: this.lexer.match,
                            token: this.terminals_[symbol] || symbol,
                            line: this.lexer.yylineno,
                            loc: yyloc,
                            expected: expected
                        });
                    }
                    if (recovering == 3) {
                        if (symbol == EOF) {
                            throw new Error(errStr || "Parsing halted.");
                        }
                        yyleng = this.lexer.yyleng;
                        yytext = this.lexer.yytext;
                        yylineno = this.lexer.yylineno;
                        yyloc = this.lexer.yylloc;
                        symbol = lex();
                    }
                    while (1) {
                        if (TERROR.toString() in table[state]) {
                            break;
                        }
                        if (state == 0) {
                            throw new Error(errStr || "Parsing halted.");
                        }
                        popStack(1);
                        state = stack[stack.length - 1];
                    }
                    preErrorSymbol = symbol;
                    symbol = TERROR;
                    state = stack[stack.length - 1];
                    action = table[state] && table[state][TERROR];
                    recovering = 3;
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                }
                switch (action[0]) {
                  case 1:
                    stack.push(symbol);
                    vstack.push(this.lexer.yytext);
                    lstack.push(this.lexer.yylloc);
                    stack.push(action[1]);
                    symbol = null;
                    if (!preErrorSymbol) {
                        yyleng = this.lexer.yyleng;
                        yytext = this.lexer.yytext;
                        yylineno = this.lexer.yylineno;
                        yyloc = this.lexer.yylloc;
                        if (recovering > 0) recovering--;
                    } else {
                        symbol = preErrorSymbol;
                        preErrorSymbol = null;
                    }
                    break;

                  case 2:
                    len = this.productions_[action[1]][1];
                    yyval.$ = vstack[vstack.length - len];
                    yyval._$ = {
                        first_line: lstack[lstack.length - (len || 1)].first_line,
                        last_line: lstack[lstack.length - 1].last_line,
                        first_column: lstack[lstack.length - (len || 1)].first_column,
                        last_column: lstack[lstack.length - 1].last_column
                    };
                    r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                    if (typeof r !== "undefined") {
                        return r;
                    }
                    if (len) {
                        stack = stack.slice(0, -1 * len * 2);
                        vstack = vstack.slice(0, -1 * len);
                        lstack = lstack.slice(0, -1 * len);
                    }
                    stack.push(this.productions_[action[1]][0]);
                    vstack.push(yyval.$);
                    lstack.push(yyval._$);
                    newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                    stack.push(newState);
                    break;

                  case 3:
                    return true;
                }
            }
            return true;
        }
    };
    var lexer = function() {
        var lexer = {
            EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parseError) {
                    this.yy.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },
            setInput: function(input) {
                this._input = input;
                this._more = this._less = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = "";
                this.conditionStack = [ "INITIAL" ];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                return this;
            },
            input: function() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/\n/);
                if (lines) this.yylineno++;
                this._input = this._input.slice(1);
                return ch;
            },
            unput: function(ch) {
                this._input = ch + this._input;
                return this;
            },
            more: function() {
                this._more = true;
                return this;
            },
            less: function(n) {
                this._input = this.match.slice(n) + this._input;
            },
            pastInput: function() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
            },
            upcomingInput: function() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
            },
            showPosition: function() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            next: function() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) this.done = true;
                var token, match, tempMatch, index, col, lines;
                if (!this._more) {
                    this.yytext = "";
                    this.match = "";
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (!this.options.flex) break;
                    }
                }
                if (match) {
                    lines = match[0].match(/\n.*/g);
                    if (lines) this.yylineno += lines.length;
                    this.yylloc = {
                        first_line: this.yylloc.last_line,
                        last_line: this.yylineno + 1,
                        first_column: this.yylloc.last_column,
                        last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
                    };
                    this.yytext += match[0];
                    this.match += match[0];
                    this.yyleng = this.yytext.length;
                    this._more = false;
                    this._input = this._input.slice(match[0].length);
                    this.matched += match[0];
                    token = this.performAction.call(this, this.yy, this, rules[index], this.conditionStack[this.conditionStack.length - 1]);
                    if (this.done && this._input) this.done = false;
                    if (token) return token; else return;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },
            lex: function lex() {
                var r = this.next();
                if (typeof r !== "undefined") {
                    return r;
                } else {
                    return this.lex();
                }
            },
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            popState: function popState() {
                return this.conditionStack.pop();
            },
            _currentRules: function _currentRules() {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            },
            topState: function() {
                return this.conditionStack[this.conditionStack.length - 2];
            },
            pushState: function begin(condition) {
                this.begin(condition);
            }
        };
        lexer.options = {};
        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
            var YYSTATE = YY_START;
            switch ($avoiding_name_collisions) {
              case 0:
                break;

              case 1:
                return 6;
                break;

              case 2:
                yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2);
                return 4;
                break;

              case 3:
                return 17;
                break;

              case 4:
                return 18;
                break;

              case 5:
                return 23;
                break;

              case 6:
                return 24;
                break;

              case 7:
                return 22;
                break;

              case 8:
                return 21;
                break;

              case 9:
                return 10;
                break;

              case 10:
                return 11;
                break;

              case 11:
                return 8;
                break;

              case 12:
                return 14;
                break;

              case 13:
                return "INVALID";
                break;
            }
        };
        lexer.rules = [ /^(?:\s+)/, /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/, /^(?:"(?:\\[\\"bfnrt/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/, /^(?:\{)/, /^(?:\})/, /^(?:\[)/, /^(?:\])/, /^(?:,)/, /^(?::)/, /^(?:true\b)/, /^(?:false\b)/, /^(?:null\b)/, /^(?:$)/, /^(?:.)/ ];
        lexer.conditions = {
            INITIAL: {
                rules: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ],
                inclusive: true
            }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    return parser;
}();

if (typeof require !== "undefined" && typeof exports !== "undefined") {
    exports.parser = jsonlint;
    exports.parse = function() {
        return jsonlint.parse.apply(jsonlint, arguments);
    };
    exports.main = function commonjsMain(args) {
        if (!args[1]) throw new Error("Usage: " + args[0] + " FILE");
        if (typeof process !== "undefined") {
            var source = require("fs").readFileSync(require("path").join(process.cwd(), args[1]), "utf8");
        } else {
            var cwd = require("file").path(require("file").cwd());
            var source = cwd.join(args[1]).read({
                charset: "utf-8"
            });
        }
        return exports.parser.parse(source);
    };
    if (typeof module !== "undefined" && require.main === module) {
        exports.main(typeof process !== "undefined" ? process.argv.slice(1) : require("system").args);
    }
}

var jsonParse = function() {
    var e = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
    var j = '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
    var i = '(?:"' + j + '*")';
    var d = new RegExp("(?:false|true|null|[\\{\\}\\[\\]]|" + e + "|" + i + ")", "g");
    var k = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
    var g = {
        '"': '"',
        "/": "/",
        "\\": "\\",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "	"
    };
    function h(l, m, n) {
        return m ? g[m] : String.fromCharCode(parseInt(n, 16));
    }
    var c = new String("");
    var a = "\\";
    var f = {
        "{": Object,
        "[": Array
    };
    var b = Object.hasOwnProperty;
    return function(u, q) {
        var p = u.match(d);
        var x;
        var v = p[0];
        var l = false;
        if ("{" === v) {
            x = {};
        } else {
            if ("[" === v) {
                x = [];
            } else {
                x = [];
                l = true;
            }
        }
        var t;
        var r = [ x ];
        for (var o = 1 - l, m = p.length; o < m; ++o) {
            v = p[o];
            var w;
            switch (v.charCodeAt(0)) {
              default:
                w = r[0];
                w[t || w.length] = +v;
                t = void 0;
                break;

              case 34:
                v = v.substring(1, v.length - 1);
                if (v.indexOf(a) !== -1) {
                    v = v.replace(k, h);
                }
                w = r[0];
                if (!t) {
                    if (w instanceof Array) {
                        t = w.length;
                    } else {
                        t = v || c;
                        break;
                    }
                }
                w[t] = v;
                t = void 0;
                break;

              case 91:
                w = r[0];
                r.unshift(w[t || w.length] = []);
                t = void 0;
                break;

              case 93:
                r.shift();
                break;

              case 102:
                w = r[0];
                w[t || w.length] = false;
                t = void 0;
                break;

              case 110:
                w = r[0];
                w[t || w.length] = null;
                t = void 0;
                break;

              case 116:
                w = r[0];
                w[t || w.length] = true;
                t = void 0;
                break;

              case 123:
                w = r[0];
                r.unshift(w[t || w.length] = {});
                t = void 0;
                break;

              case 125:
                r.shift();
                break;
            }
        }
        if (l) {
            if (r.length !== 1) {
                throw new Error();
            }
            x = x[0];
        } else {
            if (r.length) {
                throw new Error();
            }
        }
        if (q) {
            var s = function(C, B) {
                var D = C[B];
                if (D && typeof D === "object") {
                    var n = null;
                    for (var z in D) {
                        if (b.call(D, z) && D !== C) {
                            var y = s(D, z);
                            if (y !== void 0) {
                                D[z] = y;
                            } else {
                                if (!n) {
                                    n = [];
                                }
                                n.push(z);
                            }
                        }
                    }
                    if (n) {
                        for (var A = n.length; --A >= 0; ) {
                            delete D[n[A]];
                        }
                    }
                }
                return q.call(C, B, D);
            };
            x = s({
                "": x
            }, "");
        }
        return x;
    };
}();

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") module.exports = mod(); else if (typeof define == "function" && define.amd) return define([], mod); else this.CodeMirror = mod();
})(function() {
    "use strict";
    var gecko = /gecko\/\d/i.test(navigator.userAgent);
    var ie_upto10 = /MSIE \d/.test(navigator.userAgent);
    var ie_upto7 = ie_upto10 && (document.documentMode == null || document.documentMode < 8);
    var ie_upto8 = ie_upto10 && (document.documentMode == null || document.documentMode < 9);
    var ie_upto9 = ie_upto10 && (document.documentMode == null || document.documentMode < 10);
    var ie_11up = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent);
    var ie = ie_upto10 || ie_11up;
    var webkit = /WebKit\//.test(navigator.userAgent);
    var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(navigator.userAgent);
    var chrome = /Chrome\//.test(navigator.userAgent);
    var presto = /Opera\//.test(navigator.userAgent);
    var safari = /Apple Computer/.test(navigator.vendor);
    var khtml = /KHTML\//.test(navigator.userAgent);
    var mac_geLion = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent);
    var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
    var phantom = /PhantomJS/.test(navigator.userAgent);
    var ios = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
    var mobile = ios || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
    var mac = ios || /Mac/.test(navigator.platform);
    var windows = /win/i.test(navigator.platform);
    var presto_version = presto && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    if (presto_version) presto_version = Number(presto_version[1]);
    if (presto_version && presto_version >= 15) {
        presto = false;
        webkit = true;
    }
    var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
    var captureRightClick = gecko || ie && !ie_upto8;
    var sawReadOnlySpans = false, sawCollapsedSpans = false;
    function CodeMirror(place, options) {
        if (!(this instanceof CodeMirror)) return new CodeMirror(place, options);
        this.options = options = options || {};
        for (var opt in defaults) if (!options.hasOwnProperty(opt)) options[opt] = defaults[opt];
        setGuttersForLineNumbers(options);
        var doc = options.value;
        if (typeof doc == "string") doc = new Doc(doc, options.mode);
        var display = this.display = new Display(place, doc);
        display.wrapper.CodeMirror = this;
        updateGutters(this);
        themeChanged(this);
        if (options.lineWrapping) this.display.wrapper.className += " CodeMirror-wrap";
        if (options.autofocus && !mobile) focusInput(this);
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
            highlight: new Delayed()
        };
        if (ie_upto10) setTimeout(bind(resetInput, this, true), 20);
        registerEventHandlers(this);
        var cm = this;
        runInOp(this, function() {
            cm.curOp.forceUpdate = true;
            attachDoc(cm, doc);
            if (options.autofocus && !mobile || activeElt() == display.input) setTimeout(bind(onFocus, cm), 20); else onBlur(cm);
            for (var opt in optionHandlers) if (optionHandlers.hasOwnProperty(opt)) optionHandlers[opt](cm, options[opt], Init);
            for (var i = 0; i < initHooks.length; ++i) initHooks[i](cm);
        });
    }
    function Display(place, doc) {
        var d = this;
        var input = d.input = elt("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none");
        if (webkit) input.style.width = "1000px"; else input.setAttribute("wrap", "off");
        if (ios) input.style.border = "1px solid black";
        input.setAttribute("autocorrect", "off");
        input.setAttribute("autocapitalize", "off");
        input.setAttribute("spellcheck", "false");
        d.inputDiv = elt("div", [ input ], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        d.scrollbarH = elt("div", [ elt("div", null, null, "height: 100%; min-height: 1px") ], "CodeMirror-hscrollbar");
        d.scrollbarV = elt("div", [ elt("div", null, null, "min-width: 1px") ], "CodeMirror-vscrollbar");
        d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
        d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
        d.lineDiv = elt("div", null, "CodeMirror-code");
        d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
        d.cursorDiv = elt("div", null, "CodeMirror-cursors");
        d.measure = elt("div", null, "CodeMirror-measure");
        d.lineMeasure = elt("div", null, "CodeMirror-measure");
        d.lineSpace = elt("div", [ d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv ], null, "position: relative; outline: none");
        d.mover = elt("div", [ elt("div", [ d.lineSpace ], "CodeMirror-lines") ], null, "position: relative");
        d.sizer = elt("div", [ d.mover ], "CodeMirror-sizer");
        d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerCutOff + "px; width: 1px;");
        d.gutters = elt("div", null, "CodeMirror-gutters");
        d.lineGutter = null;
        d.scroller = elt("div", [ d.sizer, d.heightForcer, d.gutters ], "CodeMirror-scroll");
        d.scroller.setAttribute("tabIndex", "-1");
        d.wrapper = elt("div", [ d.inputDiv, d.scrollbarH, d.scrollbarV, d.scrollbarFiller, d.gutterFiller, d.scroller ], "CodeMirror");
        if (ie_upto7) {
            d.gutters.style.zIndex = -1;
            d.scroller.style.paddingRight = 0;
        }
        if (ios) input.style.width = "0px";
        if (!webkit) d.scroller.draggable = true;
        if (khtml) {
            d.inputDiv.style.height = "1px";
            d.inputDiv.style.position = "absolute";
        }
        if (ie_upto7) d.scrollbarH.style.minHeight = d.scrollbarV.style.minWidth = "18px";
        if (place.appendChild) place.appendChild(d.wrapper); else place(d.wrapper);
        d.viewFrom = d.viewTo = doc.first;
        d.view = [];
        d.externalMeasured = null;
        d.viewOffset = 0;
        d.lastSizeC = 0;
        d.updateLineNumbers = null;
        d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
        d.prevInput = "";
        d.alignWidgets = false;
        d.pollingFast = false;
        d.poll = new Delayed();
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
        d.inaccurateSelection = false;
        d.maxLine = null;
        d.maxLineLength = 0;
        d.maxLineChanged = false;
        d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
        d.shift = false;
    }
    function loadMode(cm) {
        cm.doc.mode = CodeMirror.getMode(cm.options, cm.doc.modeOption);
        resetModeState(cm);
    }
    function resetModeState(cm) {
        cm.doc.iter(function(line) {
            if (line.stateAfter) line.stateAfter = null;
            if (line.styles) line.styles = null;
        });
        cm.doc.frontier = cm.doc.first;
        startWorker(cm, 100);
        cm.state.modeGen++;
        if (cm.curOp) regChange(cm);
    }
    function wrappingChanged(cm) {
        if (cm.options.lineWrapping) {
            cm.display.wrapper.className += " CodeMirror-wrap";
            cm.display.sizer.style.minWidth = "";
        } else {
            cm.display.wrapper.className = cm.display.wrapper.className.replace(" CodeMirror-wrap", "");
            findMaxLine(cm);
        }
        estimateLineHeights(cm);
        regChange(cm);
        clearCaches(cm);
        setTimeout(function() {
            updateScrollbars(cm);
        }, 100);
    }
    function estimateHeight(cm) {
        var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
        var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
        return function(line) {
            if (lineIsHidden(cm.doc, line)) return 0;
            var widgetsHeight = 0;
            if (line.widgets) for (var i = 0; i < line.widgets.length; i++) {
                if (line.widgets[i].height) widgetsHeight += line.widgets[i].height;
            }
            if (wrapping) return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th; else return widgetsHeight + th;
        };
    }
    function estimateLineHeights(cm) {
        var doc = cm.doc, est = estimateHeight(cm);
        doc.iter(function(line) {
            var estHeight = est(line);
            if (estHeight != line.height) updateLineHeight(line, estHeight);
        });
    }
    function keyMapChanged(cm) {
        var map = keyMap[cm.options.keyMap], style = map.style;
        cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (style ? " cm-keymap-" + style : "");
    }
    function themeChanged(cm) {
        cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        clearCaches(cm);
    }
    function guttersChanged(cm) {
        updateGutters(cm);
        regChange(cm);
        setTimeout(function() {
            alignHorizontally(cm);
        }, 20);
    }
    function updateGutters(cm) {
        var gutters = cm.display.gutters, specs = cm.options.gutters;
        removeChildren(gutters);
        for (var i = 0; i < specs.length; ++i) {
            var gutterClass = specs[i];
            var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + gutterClass));
            if (gutterClass == "CodeMirror-linenumbers") {
                cm.display.lineGutter = gElt;
                gElt.style.width = (cm.display.lineNumWidth || 1) + "px";
            }
        }
        gutters.style.display = i ? "" : "none";
        var width = gutters.offsetWidth;
        cm.display.sizer.style.marginLeft = width + "px";
        if (i) cm.display.scrollbarH.style.left = cm.options.fixedGutter ? width + "px" : 0;
    }
    function lineLength(line) {
        if (line.height == 0) return 0;
        var len = line.text.length, merged, cur = line;
        while (merged = collapsedSpanAtStart(cur)) {
            var found = merged.find(0, true);
            cur = found.from.line;
            len += found.from.ch - found.to.ch;
        }
        cur = line;
        while (merged = collapsedSpanAtEnd(cur)) {
            var found = merged.find(0, true);
            len -= cur.text.length - found.from.ch;
            cur = found.to.line;
            len += cur.text.length - found.to.ch;
        }
        return len;
    }
    function findMaxLine(cm) {
        var d = cm.display, doc = cm.doc;
        d.maxLine = getLine(doc, doc.first);
        d.maxLineLength = lineLength(d.maxLine);
        d.maxLineChanged = true;
        doc.iter(function(line) {
            var len = lineLength(line);
            if (len > d.maxLineLength) {
                d.maxLineLength = len;
                d.maxLine = line;
            }
        });
    }
    function setGuttersForLineNumbers(options) {
        var found = indexOf(options.gutters, "CodeMirror-linenumbers");
        if (found == -1 && options.lineNumbers) {
            options.gutters = options.gutters.concat([ "CodeMirror-linenumbers" ]);
        } else if (found > -1 && !options.lineNumbers) {
            options.gutters = options.gutters.slice(0);
            options.gutters.splice(found, 1);
        }
    }
    function measureForScrollbars(cm) {
        var scroll = cm.display.scroller;
        return {
            clientHeight: scroll.clientHeight,
            barHeight: cm.display.scrollbarV.clientHeight,
            scrollWidth: scroll.scrollWidth,
            clientWidth: scroll.clientWidth,
            barWidth: cm.display.scrollbarH.clientWidth,
            docHeight: cm.doc.height + paddingVert(cm.display)
        };
    }
    function updateScrollbars(cm, measure) {
        if (!measure) measure = measureForScrollbars(cm);
        var d = cm.display;
        var scrollHeight = measure.docHeight + scrollerCutOff;
        var needsH = measure.scrollWidth > measure.clientWidth;
        var needsV = scrollHeight > measure.clientHeight;
        if (needsV) {
            d.scrollbarV.style.display = "block";
            d.scrollbarV.style.bottom = needsH ? scrollbarWidth(d.measure) + "px" : "0";
            d.scrollbarV.firstChild.style.height = Math.max(0, scrollHeight - measure.clientHeight + (measure.barHeight || d.scrollbarV.clientHeight)) + "px";
        } else {
            d.scrollbarV.style.display = "";
            d.scrollbarV.firstChild.style.height = "0";
        }
        if (needsH) {
            d.scrollbarH.style.display = "block";
            d.scrollbarH.style.right = needsV ? scrollbarWidth(d.measure) + "px" : "0";
            d.scrollbarH.firstChild.style.width = measure.scrollWidth - measure.clientWidth + (measure.barWidth || d.scrollbarH.clientWidth) + "px";
        } else {
            d.scrollbarH.style.display = "";
            d.scrollbarH.firstChild.style.width = "0";
        }
        if (needsH && needsV) {
            d.scrollbarFiller.style.display = "block";
            d.scrollbarFiller.style.height = d.scrollbarFiller.style.width = scrollbarWidth(d.measure) + "px";
        } else d.scrollbarFiller.style.display = "";
        if (needsH && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
            d.gutterFiller.style.display = "block";
            d.gutterFiller.style.height = scrollbarWidth(d.measure) + "px";
            d.gutterFiller.style.width = d.gutters.offsetWidth + "px";
        } else d.gutterFiller.style.display = "";
        if (mac_geLion && scrollbarWidth(d.measure) === 0) {
            d.scrollbarV.style.minWidth = d.scrollbarH.style.minHeight = mac_geMountainLion ? "18px" : "12px";
            var barMouseDown = function(e) {
                if (e_target(e) != d.scrollbarV && e_target(e) != d.scrollbarH) operation(cm, onMouseDown)(e);
            };
            on(d.scrollbarV, "mousedown", barMouseDown);
            on(d.scrollbarH, "mousedown", barMouseDown);
        }
    }
    function visibleLines(display, doc, viewPort) {
        var top = viewPort && viewPort.top != null ? viewPort.top : display.scroller.scrollTop;
        top = Math.floor(top - paddingTop(display));
        var bottom = viewPort && viewPort.bottom != null ? viewPort.bottom : top + display.wrapper.clientHeight;
        var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
        if (viewPort && viewPort.ensure) {
            var ensureFrom = viewPort.ensure.from.line, ensureTo = viewPort.ensure.to.line;
            if (ensureFrom < from) return {
                from: ensureFrom,
                to: lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight)
            };
            if (Math.min(ensureTo, doc.lastLine()) >= to) return {
                from: lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight),
                to: ensureTo
            };
        }
        return {
            from: from,
            to: to
        };
    }
    function alignHorizontally(cm) {
        var display = cm.display, view = display.view;
        if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) return;
        var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
        var gutterW = display.gutters.offsetWidth, left = comp + "px";
        for (var i = 0; i < view.length; i++) if (!view[i].hidden) {
            if (cm.options.fixedGutter && view[i].gutter) view[i].gutter.style.left = left;
            var align = view[i].alignable;
            if (align) for (var j = 0; j < align.length; j++) align[j].style.left = left;
        }
        if (cm.options.fixedGutter) display.gutters.style.left = comp + gutterW + "px";
    }
    function maybeUpdateLineNumberWidth(cm) {
        if (!cm.options.lineNumbers) return false;
        var doc = cm.doc, last = lineNumberFor(cm.options, doc.first + doc.size - 1), display = cm.display;
        if (last.length != display.lineNumChars) {
            var test = display.measure.appendChild(elt("div", [ elt("div", last) ], "CodeMirror-linenumber CodeMirror-gutter-elt"));
            var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
            display.lineGutter.style.width = "";
            display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding);
            display.lineNumWidth = display.lineNumInnerWidth + padding;
            display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
            display.lineGutter.style.width = display.lineNumWidth + "px";
            var width = display.gutters.offsetWidth;
            display.scrollbarH.style.left = cm.options.fixedGutter ? width + "px" : 0;
            display.sizer.style.marginLeft = width + "px";
            return true;
        }
        return false;
    }
    function lineNumberFor(options, i) {
        return String(options.lineNumberFormatter(i + options.firstLineNumber));
    }
    function compensateForHScroll(display) {
        return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
    }
    function updateDisplay(cm, viewPort, forced) {
        var oldFrom = cm.display.viewFrom, oldTo = cm.display.viewTo, updated;
        var visible = visibleLines(cm.display, cm.doc, viewPort);
        for (var first = true; ;first = false) {
            var oldWidth = cm.display.scroller.clientWidth;
            if (!updateDisplayInner(cm, visible, forced)) break;
            updated = true;
            if (cm.display.maxLineChanged && !cm.options.lineWrapping) adjustContentWidth(cm);
            var barMeasure = measureForScrollbars(cm);
            updateSelection(cm);
            setDocumentHeight(cm, barMeasure);
            updateScrollbars(cm, barMeasure);
            if (first && cm.options.lineWrapping && oldWidth != cm.display.scroller.clientWidth) {
                forced = true;
                continue;
            }
            forced = false;
            if (viewPort && viewPort.top != null) viewPort = {
                top: Math.min(barMeasure.docHeight - scrollerCutOff - barMeasure.clientHeight, viewPort.top)
            };
            visible = visibleLines(cm.display, cm.doc, viewPort);
            if (visible.from >= cm.display.viewFrom && visible.to <= cm.display.viewTo) break;
        }
        cm.display.updateLineNumbers = null;
        if (updated) {
            signalLater(cm, "update", cm);
            if (cm.display.viewFrom != oldFrom || cm.display.viewTo != oldTo) signalLater(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
        }
        return updated;
    }
    function updateDisplayInner(cm, visible, forced) {
        var display = cm.display, doc = cm.doc;
        if (!display.wrapper.offsetWidth) {
            resetView(cm);
            return;
        }
        if (!forced && visible.from >= display.viewFrom && visible.to <= display.viewTo && countDirtyView(cm) == 0) return;
        if (maybeUpdateLineNumberWidth(cm)) resetView(cm);
        var dims = getDimensions(cm);
        var end = doc.first + doc.size;
        var from = Math.max(visible.from - cm.options.viewportMargin, doc.first);
        var to = Math.min(end, visible.to + cm.options.viewportMargin);
        if (display.viewFrom < from && from - display.viewFrom < 20) from = Math.max(doc.first, display.viewFrom);
        if (display.viewTo > to && display.viewTo - to < 20) to = Math.min(end, display.viewTo);
        if (sawCollapsedSpans) {
            from = visualLineNo(cm.doc, from);
            to = visualLineEndNo(cm.doc, to);
        }
        var different = from != display.viewFrom || to != display.viewTo || display.lastSizeC != display.wrapper.clientHeight;
        adjustView(cm, from, to);
        display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
        cm.display.mover.style.top = display.viewOffset + "px";
        var toUpdate = countDirtyView(cm);
        if (!different && toUpdate == 0 && !forced) return;
        var focused = activeElt();
        if (toUpdate > 4) display.lineDiv.style.display = "none";
        patchDisplay(cm, display.updateLineNumbers, dims);
        if (toUpdate > 4) display.lineDiv.style.display = "";
        if (focused && activeElt() != focused && focused.offsetHeight) focused.focus();
        removeChildren(display.cursorDiv);
        removeChildren(display.selectionDiv);
        if (different) {
            display.lastSizeC = display.wrapper.clientHeight;
            startWorker(cm, 400);
        }
        updateHeightsInViewport(cm);
        return true;
    }
    function adjustContentWidth(cm) {
        var display = cm.display;
        var width = measureChar(cm, display.maxLine, display.maxLine.text.length).left;
        display.maxLineChanged = false;
        var minWidth = Math.max(0, width + 3);
        var maxScrollLeft = Math.max(0, display.sizer.offsetLeft + minWidth + scrollerCutOff - display.scroller.clientWidth);
        display.sizer.style.minWidth = minWidth + "px";
        if (maxScrollLeft < cm.doc.scrollLeft) setScrollLeft(cm, Math.min(display.scroller.scrollLeft, maxScrollLeft), true);
    }
    function setDocumentHeight(cm, measure) {
        cm.display.sizer.style.minHeight = cm.display.heightForcer.style.top = measure.docHeight + "px";
        cm.display.gutters.style.height = Math.max(measure.docHeight, measure.clientHeight) + "px";
    }
    function updateHeightsInViewport(cm) {
        var display = cm.display;
        var prevBottom = display.lineDiv.offsetTop;
        for (var i = 0; i < display.view.length; i++) {
            var cur = display.view[i], height;
            if (cur.hidden) continue;
            if (ie_upto7) {
                var bot = cur.node.offsetTop + cur.node.offsetHeight;
                height = bot - prevBottom;
                prevBottom = bot;
            } else {
                var box = cur.node.getBoundingClientRect();
                height = box.bottom - box.top;
            }
            var diff = cur.line.height - height;
            if (height < 2) height = textHeight(display);
            if (diff > .001 || diff < -.001) {
                updateLineHeight(cur.line, height);
                updateWidgetHeight(cur.line);
                if (cur.rest) for (var j = 0; j < cur.rest.length; j++) updateWidgetHeight(cur.rest[j]);
            }
        }
    }
    function updateWidgetHeight(line) {
        if (line.widgets) for (var i = 0; i < line.widgets.length; ++i) line.widgets[i].height = line.widgets[i].node.offsetHeight;
    }
    function getDimensions(cm) {
        var d = cm.display, left = {}, width = {};
        for (var n = d.gutters.firstChild, i = 0; n; n = n.nextSibling, ++i) {
            left[cm.options.gutters[i]] = n.offsetLeft;
            width[cm.options.gutters[i]] = n.offsetWidth;
        }
        return {
            fixedPos: compensateForHScroll(d),
            gutterTotalWidth: d.gutters.offsetWidth,
            gutterLeft: left,
            gutterWidth: width,
            wrapperWidth: d.wrapper.clientWidth
        };
    }
    function patchDisplay(cm, updateNumbersFrom, dims) {
        var display = cm.display, lineNumbers = cm.options.lineNumbers;
        var container = display.lineDiv, cur = container.firstChild;
        function rm(node) {
            var next = node.nextSibling;
            if (webkit && mac && cm.display.currentWheelTarget == node) node.style.display = "none"; else node.parentNode.removeChild(node);
            return next;
        }
        var view = display.view, lineN = display.viewFrom;
        for (var i = 0; i < view.length; i++) {
            var lineView = view[i];
            if (lineView.hidden) {} else if (!lineView.node) {
                var node = buildLineElement(cm, lineView, lineN, dims);
                container.insertBefore(node, cur);
            } else {
                while (cur != lineView.node) cur = rm(cur);
                var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
                if (lineView.changes) {
                    if (indexOf(lineView.changes, "gutter") > -1) updateNumber = false;
                    updateLineForChanges(cm, lineView, lineN, dims);
                }
                if (updateNumber) {
                    removeChildren(lineView.lineNumber);
                    lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
                }
                cur = lineView.node.nextSibling;
            }
            lineN += lineView.size;
        }
        while (cur) cur = rm(cur);
    }
    function updateLineForChanges(cm, lineView, lineN, dims) {
        for (var j = 0; j < lineView.changes.length; j++) {
            var type = lineView.changes[j];
            if (type == "text") updateLineText(cm, lineView); else if (type == "gutter") updateLineGutter(cm, lineView, lineN, dims); else if (type == "class") updateLineClasses(lineView); else if (type == "widget") updateLineWidgets(lineView, dims);
        }
        lineView.changes = null;
    }
    function ensureLineWrapped(lineView) {
        if (lineView.node == lineView.text) {
            lineView.node = elt("div", null, null, "position: relative");
            if (lineView.text.parentNode) lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
            lineView.node.appendChild(lineView.text);
            if (ie_upto7) lineView.node.style.zIndex = 2;
        }
        return lineView.node;
    }
    function updateLineBackground(lineView) {
        var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
        if (cls) cls += " CodeMirror-linebackground";
        if (lineView.background) {
            if (cls) lineView.background.className = cls; else {
                lineView.background.parentNode.removeChild(lineView.background);
                lineView.background = null;
            }
        } else if (cls) {
            var wrap = ensureLineWrapped(lineView);
            lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
        }
    }
    function getLineContent(cm, lineView) {
        var ext = cm.display.externalMeasured;
        if (ext && ext.line == lineView.line) {
            cm.display.externalMeasured = null;
            lineView.measure = ext.measure;
            return ext.built;
        }
        return buildLineContent(cm, lineView);
    }
    function updateLineText(cm, lineView) {
        var cls = lineView.text.className;
        var built = getLineContent(cm, lineView);
        if (lineView.text == lineView.node) lineView.node = built.pre;
        lineView.text.parentNode.replaceChild(built.pre, lineView.text);
        lineView.text = built.pre;
        if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
            lineView.bgClass = built.bgClass;
            lineView.textClass = built.textClass;
            updateLineClasses(lineView);
        } else if (cls) {
            lineView.text.className = cls;
        }
    }
    function updateLineClasses(lineView) {
        updateLineBackground(lineView);
        if (lineView.line.wrapClass) ensureLineWrapped(lineView).className = lineView.line.wrapClass; else if (lineView.node != lineView.text) lineView.node.className = "";
        var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
        lineView.text.className = textClass || "";
    }
    function updateLineGutter(cm, lineView, lineN, dims) {
        if (lineView.gutter) {
            lineView.node.removeChild(lineView.gutter);
            lineView.gutter = null;
        }
        var markers = lineView.line.gutterMarkers;
        if (cm.options.lineNumbers || markers) {
            var wrap = ensureLineWrapped(lineView);
            var gutterWrap = lineView.gutter = wrap.insertBefore(elt("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px"), lineView.text);
            if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"));
            if (markers) for (var k = 0; k < cm.options.gutters.length; ++k) {
                var id = cm.options.gutters[k], found = markers.hasOwnProperty(id) && markers[id];
                if (found) gutterWrap.appendChild(elt("div", [ found ], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
            }
        }
    }
    function updateLineWidgets(lineView, dims) {
        if (lineView.alignable) lineView.alignable = null;
        for (var node = lineView.node.firstChild, next; node; node = next) {
            var next = node.nextSibling;
            if (node.className == "CodeMirror-linewidget") lineView.node.removeChild(node);
        }
        insertLineWidgets(lineView, dims);
    }
    function buildLineElement(cm, lineView, lineN, dims) {
        var built = getLineContent(cm, lineView);
        lineView.text = lineView.node = built.pre;
        if (built.bgClass) lineView.bgClass = built.bgClass;
        if (built.textClass) lineView.textClass = built.textClass;
        updateLineClasses(lineView);
        updateLineGutter(cm, lineView, lineN, dims);
        insertLineWidgets(lineView, dims);
        return lineView.node;
    }
    function insertLineWidgets(lineView, dims) {
        insertLineWidgetsFor(lineView.line, lineView, dims, true);
        if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++) insertLineWidgetsFor(lineView.rest[i], lineView, dims, false);
    }
    function insertLineWidgetsFor(line, lineView, dims, allowAbove) {
        if (!line.widgets) return;
        var wrap = ensureLineWrapped(lineView);
        for (var i = 0, ws = line.widgets; i < ws.length; ++i) {
            var widget = ws[i], node = elt("div", [ widget.node ], "CodeMirror-linewidget");
            if (!widget.handleMouseEvents) node.ignoreEvents = true;
            positionLineWidget(widget, node, lineView, dims);
            if (allowAbove && widget.above) wrap.insertBefore(node, lineView.gutter || lineView.text); else wrap.appendChild(node);
            signalLater(widget, "redraw");
        }
    }
    function positionLineWidget(widget, node, lineView, dims) {
        if (widget.noHScroll) {
            (lineView.alignable || (lineView.alignable = [])).push(node);
            var width = dims.wrapperWidth;
            node.style.left = dims.fixedPos + "px";
            if (!widget.coverGutter) {
                width -= dims.gutterTotalWidth;
                node.style.paddingLeft = dims.gutterTotalWidth + "px";
            }
            node.style.width = width + "px";
        }
        if (widget.coverGutter) {
            node.style.zIndex = 5;
            node.style.position = "relative";
            if (!widget.noHScroll) node.style.marginLeft = -dims.gutterTotalWidth + "px";
        }
    }
    var Pos = CodeMirror.Pos = function(line, ch) {
        if (!(this instanceof Pos)) return new Pos(line, ch);
        this.line = line;
        this.ch = ch;
    };
    var cmp = CodeMirror.cmpPos = function(a, b) {
        return a.line - b.line || a.ch - b.ch;
    };
    function copyPos(x) {
        return Pos(x.line, x.ch);
    }
    function maxPos(a, b) {
        return cmp(a, b) < 0 ? b : a;
    }
    function minPos(a, b) {
        return cmp(a, b) < 0 ? a : b;
    }
    function Selection(ranges, primIndex) {
        this.ranges = ranges;
        this.primIndex = primIndex;
    }
    Selection.prototype = {
        primary: function() {
            return this.ranges[this.primIndex];
        },
        equals: function(other) {
            if (other == this) return true;
            if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) return false;
            for (var i = 0; i < this.ranges.length; i++) {
                var here = this.ranges[i], there = other.ranges[i];
                if (cmp(here.anchor, there.anchor) != 0 || cmp(here.head, there.head) != 0) return false;
            }
            return true;
        },
        deepCopy: function() {
            for (var out = [], i = 0; i < this.ranges.length; i++) out[i] = new Range(copyPos(this.ranges[i].anchor), copyPos(this.ranges[i].head));
            return new Selection(out, this.primIndex);
        },
        somethingSelected: function() {
            for (var i = 0; i < this.ranges.length; i++) if (!this.ranges[i].empty()) return true;
            return false;
        },
        contains: function(pos, end) {
            if (!end) end = pos;
            for (var i = 0; i < this.ranges.length; i++) {
                var range = this.ranges[i];
                if (cmp(end, range.from()) >= 0 && cmp(pos, range.to()) <= 0) return i;
            }
            return -1;
        }
    };
    function Range(anchor, head) {
        this.anchor = anchor;
        this.head = head;
    }
    Range.prototype = {
        from: function() {
            return minPos(this.anchor, this.head);
        },
        to: function() {
            return maxPos(this.anchor, this.head);
        },
        empty: function() {
            return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
        }
    };
    function normalizeSelection(ranges, primIndex) {
        var prim = ranges[primIndex];
        ranges.sort(function(a, b) {
            return cmp(a.from(), b.from());
        });
        primIndex = indexOf(ranges, prim);
        for (var i = 1; i < ranges.length; i++) {
            var cur = ranges[i], prev = ranges[i - 1];
            if (cmp(prev.to(), cur.from()) >= 0) {
                var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
                var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
                if (i <= primIndex) --primIndex;
                ranges.splice(--i, 2, new Range(inv ? to : from, inv ? from : to));
            }
        }
        return new Selection(ranges, primIndex);
    }
    function simpleSelection(anchor, head) {
        return new Selection([ new Range(anchor, head || anchor) ], 0);
    }
    function clipLine(doc, n) {
        return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));
    }
    function clipPos(doc, pos) {
        if (pos.line < doc.first) return Pos(doc.first, 0);
        var last = doc.first + doc.size - 1;
        if (pos.line > last) return Pos(last, getLine(doc, last).text.length);
        return clipToLen(pos, getLine(doc, pos.line).text.length);
    }
    function clipToLen(pos, linelen) {
        var ch = pos.ch;
        if (ch == null || ch > linelen) return Pos(pos.line, linelen); else if (ch < 0) return Pos(pos.line, 0); else return pos;
    }
    function isLine(doc, l) {
        return l >= doc.first && l < doc.first + doc.size;
    }
    function clipPosArray(doc, array) {
        for (var out = [], i = 0; i < array.length; i++) out[i] = clipPos(doc, array[i]);
        return out;
    }
    function extendRange(doc, range, head, other) {
        if (doc.cm && doc.cm.display.shift || doc.extend) {
            var anchor = range.anchor;
            if (other) {
                var posBefore = cmp(head, anchor) < 0;
                if (posBefore != cmp(other, anchor) < 0) {
                    anchor = head;
                    head = other;
                } else if (posBefore != cmp(head, other) < 0) {
                    head = other;
                }
            }
            return new Range(anchor, head);
        } else {
            return new Range(other || head, head);
        }
    }
    function extendSelection(doc, head, other, options) {
        setSelection(doc, new Selection([ extendRange(doc, doc.sel.primary(), head, other) ], 0), options);
    }
    function extendSelections(doc, heads, options) {
        for (var out = [], i = 0; i < doc.sel.ranges.length; i++) out[i] = extendRange(doc, doc.sel.ranges[i], heads[i], null);
        var newSel = normalizeSelection(out, doc.sel.primIndex);
        setSelection(doc, newSel, options);
    }
    function replaceOneSelection(doc, i, range, options) {
        var ranges = doc.sel.ranges.slice(0);
        ranges[i] = range;
        setSelection(doc, normalizeSelection(ranges, doc.sel.primIndex), options);
    }
    function setSimpleSelection(doc, anchor, head, options) {
        setSelection(doc, simpleSelection(anchor, head), options);
    }
    function filterSelectionChange(doc, sel) {
        var obj = {
            ranges: sel.ranges,
            update: function(ranges) {
                this.ranges = [];
                for (var i = 0; i < ranges.length; i++) this.ranges[i] = new Range(clipPos(doc, ranges[i].anchor), clipPos(doc, ranges[i].head));
            }
        };
        signal(doc, "beforeSelectionChange", doc, obj);
        if (doc.cm) signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
        if (obj.ranges != sel.ranges) return normalizeSelection(obj.ranges, obj.ranges.length - 1); else return sel;
    }
    function setSelectionReplaceHistory(doc, sel, options) {
        var done = doc.history.done, last = lst(done);
        if (last && last.ranges) {
            done[done.length - 1] = sel;
            setSelectionNoUndo(doc, sel, options);
        } else {
            setSelection(doc, sel, options);
        }
    }
    function setSelection(doc, sel, options) {
        setSelectionNoUndo(doc, sel, options);
        addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
    }
    function setSelectionNoUndo(doc, sel, options) {
        if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange")) sel = filterSelectionChange(doc, sel);
        var bias = cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1;
        setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));
        if (!(options && options.scroll === false) && doc.cm) ensureCursorVisible(doc.cm);
    }
    function setSelectionInner(doc, sel) {
        if (sel.equals(doc.sel)) return;
        doc.sel = sel;
        if (doc.cm) doc.cm.curOp.updateInput = doc.cm.curOp.selectionChanged = doc.cm.curOp.cursorActivity = true;
        signalLater(doc, "cursorActivity", doc);
    }
    function reCheckSelection(doc) {
        setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false), sel_dontScroll);
    }
    function skipAtomicInSelection(doc, sel, bias, mayClear) {
        var out;
        for (var i = 0; i < sel.ranges.length; i++) {
            var range = sel.ranges[i];
            var newAnchor = skipAtomic(doc, range.anchor, bias, mayClear);
            var newHead = skipAtomic(doc, range.head, bias, mayClear);
            if (out || newAnchor != range.anchor || newHead != range.head) {
                if (!out) out = sel.ranges.slice(0, i);
                out[i] = new Range(newAnchor, newHead);
            }
        }
        return out ? normalizeSelection(out, sel.primIndex) : sel;
    }
    function skipAtomic(doc, pos, bias, mayClear) {
        var flipped = false, curPos = pos;
        var dir = bias || 1;
        doc.cantEdit = false;
        search: for (;;) {
            var line = getLine(doc, curPos.line);
            if (line.markedSpans) {
                for (var i = 0; i < line.markedSpans.length; ++i) {
                    var sp = line.markedSpans[i], m = sp.marker;
                    if ((sp.from == null || (m.inclusiveLeft ? sp.from <= curPos.ch : sp.from < curPos.ch)) && (sp.to == null || (m.inclusiveRight ? sp.to >= curPos.ch : sp.to > curPos.ch))) {
                        if (mayClear) {
                            signal(m, "beforeCursorEnter");
                            if (m.explicitlyCleared) {
                                if (!line.markedSpans) break; else {
                                    --i;
                                    continue;
                                }
                            }
                        }
                        if (!m.atomic) continue;
                        var newPos = m.find(dir < 0 ? -1 : 1);
                        if (cmp(newPos, curPos) == 0) {
                            newPos.ch += dir;
                            if (newPos.ch < 0) {
                                if (newPos.line > doc.first) newPos = clipPos(doc, Pos(newPos.line - 1)); else newPos = null;
                            } else if (newPos.ch > line.text.length) {
                                if (newPos.line < doc.first + doc.size - 1) newPos = Pos(newPos.line + 1, 0); else newPos = null;
                            }
                            if (!newPos) {
                                if (flipped) {
                                    if (!mayClear) return skipAtomic(doc, pos, bias, true);
                                    doc.cantEdit = true;
                                    return Pos(doc.first, 0);
                                }
                                flipped = true;
                                newPos = pos;
                                dir = -dir;
                            }
                        }
                        curPos = newPos;
                        continue search;
                    }
                }
            }
            return curPos;
        }
    }
    function updateSelection(cm) {
        var display = cm.display, doc = cm.doc;
        var curFragment = document.createDocumentFragment();
        var selFragment = document.createDocumentFragment();
        for (var i = 0; i < doc.sel.ranges.length; i++) {
            var range = doc.sel.ranges[i];
            var collapsed = range.empty();
            if (collapsed || cm.options.showCursorWhenSelecting) updateSelectionCursor(cm, range, curFragment);
            if (!collapsed) updateSelectionRange(cm, range, selFragment);
        }
        if (cm.options.moveInputWithCursor) {
            var headPos = cursorCoords(cm, doc.sel.primary().head, "div");
            var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
            var top = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
            var left = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
            display.inputDiv.style.top = top + "px";
            display.inputDiv.style.left = left + "px";
        }
        removeChildrenAndAdd(display.cursorDiv, curFragment);
        removeChildrenAndAdd(display.selectionDiv, selFragment);
    }
    function updateSelectionCursor(cm, range, output) {
        var pos = cursorCoords(cm, range.head, "div");
        var cursor = output.appendChild(elt("div", " ", "CodeMirror-cursor"));
        cursor.style.left = pos.left + "px";
        cursor.style.top = pos.top + "px";
        cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
        if (pos.other) {
            var otherCursor = output.appendChild(elt("div", " ", "CodeMirror-cursor CodeMirror-secondarycursor"));
            otherCursor.style.display = "";
            otherCursor.style.left = pos.other.left + "px";
            otherCursor.style.top = pos.other.top + "px";
            otherCursor.style.height = (pos.other.bottom - pos.other.top) * .85 + "px";
        }
    }
    function updateSelectionRange(cm, range, output) {
        var display = cm.display, doc = cm.doc;
        var fragment = document.createDocumentFragment();
        var padding = paddingH(cm.display), leftSide = padding.left, rightSide = display.lineSpace.offsetWidth - padding.right;
        function add(left, top, width, bottom) {
            if (top < 0) top = 0;
            fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px; top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px; height: " + (bottom - top) + "px"));
        }
        function drawForLine(line, fromArg, toArg) {
            var lineObj = getLine(doc, line);
            var lineLen = lineObj.text.length;
            var start, end;
            function coords(ch, bias) {
                return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
            }
            iterateBidiSections(getOrder(lineObj), fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir) {
                var leftPos = coords(from, "left"), rightPos, left, right;
                if (from == to) {
                    rightPos = leftPos;
                    left = right = leftPos.left;
                } else {
                    rightPos = coords(to - 1, "right");
                    if (dir == "rtl") {
                        var tmp = leftPos;
                        leftPos = rightPos;
                        rightPos = tmp;
                    }
                    left = leftPos.left;
                    right = rightPos.right;
                }
                if (fromArg == null && from == 0) left = leftSide;
                if (rightPos.top - leftPos.top > 3) {
                    add(left, leftPos.top, null, leftPos.bottom);
                    left = leftSide;
                    if (leftPos.bottom < rightPos.top) add(left, leftPos.bottom, null, rightPos.top);
                }
                if (toArg == null && to == lineLen) right = rightSide;
                if (!start || leftPos.top < start.top || leftPos.top == start.top && leftPos.left < start.left) start = leftPos;
                if (!end || rightPos.bottom > end.bottom || rightPos.bottom == end.bottom && rightPos.right > end.right) end = rightPos;
                if (left < leftSide + 1) left = leftSide;
                add(left, rightPos.top, right - left, rightPos.bottom);
            });
            return {
                start: start,
                end: end
            };
        }
        var sFrom = range.from(), sTo = range.to();
        if (sFrom.line == sTo.line) {
            drawForLine(sFrom.line, sFrom.ch, sTo.ch);
        } else {
            var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
            var singleVLine = visualLine(fromLine) == visualLine(toLine);
            var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
            var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
            if (singleVLine) {
                if (leftEnd.top < rightStart.top - 2) {
                    add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
                    add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
                } else {
                    add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
                }
            }
            if (leftEnd.bottom < rightStart.top) add(leftSide, leftEnd.bottom, null, rightStart.top);
        }
        output.appendChild(fragment);
    }
    function restartBlink(cm) {
        if (!cm.state.focused) return;
        var display = cm.display;
        clearInterval(display.blinker);
        var on = true;
        display.cursorDiv.style.visibility = "";
        if (cm.options.cursorBlinkRate > 0) display.blinker = setInterval(function() {
            display.cursorDiv.style.visibility = (on = !on) ? "" : "hidden";
        }, cm.options.cursorBlinkRate);
    }
    function startWorker(cm, time) {
        if (cm.doc.mode.startState && cm.doc.frontier < cm.display.viewTo) cm.state.highlight.set(time, bind(highlightWorker, cm));
    }
    function highlightWorker(cm) {
        var doc = cm.doc;
        if (doc.frontier < doc.first) doc.frontier = doc.first;
        if (doc.frontier >= cm.display.viewTo) return;
        var end = +new Date() + cm.options.workTime;
        var state = copyState(doc.mode, getStateBefore(cm, doc.frontier));
        runInOp(cm, function() {
            doc.iter(doc.frontier, Math.min(doc.first + doc.size, cm.display.viewTo + 500), function(line) {
                if (doc.frontier >= cm.display.viewFrom) {
                    var oldStyles = line.styles;
                    line.styles = highlightLine(cm, line, state, true);
                    var ischange = !oldStyles || oldStyles.length != line.styles.length;
                    for (var i = 0; !ischange && i < oldStyles.length; ++i) ischange = oldStyles[i] != line.styles[i];
                    if (ischange) regLineChange(cm, doc.frontier, "text");
                    line.stateAfter = copyState(doc.mode, state);
                } else {
                    processLine(cm, line.text, state);
                    line.stateAfter = doc.frontier % 5 == 0 ? copyState(doc.mode, state) : null;
                }
                ++doc.frontier;
                if (+new Date() > end) {
                    startWorker(cm, cm.options.workDelay);
                    return true;
                }
            });
        });
    }
    function findStartLine(cm, n, precise) {
        var minindent, minline, doc = cm.doc;
        var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1e3 : 100);
        for (var search = n; search > lim; --search) {
            if (search <= doc.first) return doc.first;
            var line = getLine(doc, search - 1);
            if (line.stateAfter && (!precise || search <= doc.frontier)) return search;
            var indented = countColumn(line.text, null, cm.options.tabSize);
            if (minline == null || minindent > indented) {
                minline = search - 1;
                minindent = indented;
            }
        }
        return minline;
    }
    function getStateBefore(cm, n, precise) {
        var doc = cm.doc, display = cm.display;
        if (!doc.mode.startState) return true;
        var pos = findStartLine(cm, n, precise), state = pos > doc.first && getLine(doc, pos - 1).stateAfter;
        if (!state) state = startState(doc.mode); else state = copyState(doc.mode, state);
        doc.iter(pos, n, function(line) {
            processLine(cm, line.text, state);
            var save = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo;
            line.stateAfter = save ? copyState(doc.mode, state) : null;
            ++pos;
        });
        if (precise) doc.frontier = pos;
        return state;
    }
    function paddingTop(display) {
        return display.lineSpace.offsetTop;
    }
    function paddingVert(display) {
        return display.mover.offsetHeight - display.lineSpace.offsetHeight;
    }
    function paddingH(display) {
        if (display.cachedPaddingH) return display.cachedPaddingH;
        var e = removeChildrenAndAdd(display.measure, elt("pre", "x"));
        var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
        return display.cachedPaddingH = {
            left: parseInt(style.paddingLeft),
            right: parseInt(style.paddingRight)
        };
    }
    function ensureLineHeights(cm, lineView, rect) {
        var wrapping = cm.options.lineWrapping;
        var curWidth = wrapping && cm.display.scroller.clientWidth;
        if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
            var heights = lineView.measure.heights = [];
            if (wrapping) {
                lineView.measure.width = curWidth;
                var rects = lineView.text.firstChild.getClientRects();
                for (var i = 0; i < rects.length - 1; i++) {
                    var cur = rects[i], next = rects[i + 1];
                    if (Math.abs(cur.bottom - next.bottom) > 2) heights.push((cur.bottom + next.top) / 2 - rect.top);
                }
            }
            heights.push(rect.bottom - rect.top);
        }
    }
    function mapFromLineView(lineView, line, lineN) {
        if (lineView.line == line) return {
            map: lineView.measure.map,
            cache: lineView.measure.cache
        };
        for (var i = 0; i < lineView.rest.length; i++) if (lineView.rest[i] == line) return {
            map: lineView.measure.maps[i],
            cache: lineView.measure.caches[i]
        };
        for (var i = 0; i < lineView.rest.length; i++) if (lineNo(lineView.rest[i]) > lineN) return {
            map: lineView.measure.maps[i],
            cache: lineView.measure.caches[i],
            before: true
        };
    }
    function updateExternalMeasurement(cm, line) {
        line = visualLine(line);
        var lineN = lineNo(line);
        var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
        view.lineN = lineN;
        var built = view.built = buildLineContent(cm, view);
        view.text = built.pre;
        removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
        return view;
    }
    function measureChar(cm, line, ch, bias) {
        return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
    }
    function findViewForLine(cm, lineN) {
        if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) return cm.display.view[findViewIndex(cm, lineN)];
        var ext = cm.display.externalMeasured;
        if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) return ext;
    }
    function prepareMeasureForLine(cm, line) {
        var lineN = lineNo(line);
        var view = findViewForLine(cm, lineN);
        if (view && !view.text) view = null; else if (view && view.changes) updateLineForChanges(cm, view, lineN, getDimensions(cm));
        if (!view) view = updateExternalMeasurement(cm, line);
        var info = mapFromLineView(view, line, lineN);
        return {
            line: line,
            view: view,
            rect: null,
            map: info.map,
            cache: info.cache,
            before: info.before,
            hasHeights: false
        };
    }
    function measureCharPrepared(cm, prepared, ch, bias) {
        if (prepared.before) ch = -1;
        var key = ch + (bias || ""), found;
        if (prepared.cache.hasOwnProperty(key)) {
            found = prepared.cache[key];
        } else {
            if (!prepared.rect) prepared.rect = prepared.view.text.getBoundingClientRect();
            if (!prepared.hasHeights) {
                ensureLineHeights(cm, prepared.view, prepared.rect);
                prepared.hasHeights = true;
            }
            found = measureCharInner(cm, prepared, ch, bias);
            if (!found.bogus) prepared.cache[key] = found;
        }
        return {
            left: found.left,
            right: found.right,
            top: found.top,
            bottom: found.bottom
        };
    }
    var nullRect = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    };
    function measureCharInner(cm, prepared, ch, bias) {
        var map = prepared.map;
        var node, start, end, collapse;
        for (var i = 0; i < map.length; i += 3) {
            var mStart = map[i], mEnd = map[i + 1];
            if (ch < mStart) {
                start = 0;
                end = 1;
                collapse = "left";
            } else if (ch < mEnd) {
                start = ch - mStart;
                end = start + 1;
            } else if (i == map.length - 3 || ch == mEnd && map[i + 3] > ch) {
                end = mEnd - mStart;
                start = end - 1;
                if (ch >= mEnd) collapse = "right";
            }
            if (start != null) {
                node = map[i + 2];
                if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) collapse = bias;
                if (bias == "left" && start == 0) while (i && map[i - 2] == map[i - 3] && map[i - 1].insertLeft) {
                    node = map[(i -= 3) + 2];
                    collapse = "left";
                }
                if (bias == "right" && start == mEnd - mStart) while (i < map.length - 3 && map[i + 3] == map[i + 4] && !map[i + 5].insertLeft) {
                    node = map[(i += 3) + 2];
                    collapse = "right";
                }
                break;
            }
        }
        var rect;
        if (node.nodeType == 3) {
            while (start && isExtendingChar(prepared.line.text.charAt(mStart + start))) --start;
            while (mStart + end < mEnd && isExtendingChar(prepared.line.text.charAt(mStart + end))) ++end;
            if (ie_upto8 && start == 0 && end == mEnd - mStart) {
                rect = node.parentNode.getBoundingClientRect();
            } else if (ie && cm.options.lineWrapping) {
                var rects = range(node, start, end).getClientRects();
                if (rects.length) rect = rects[bias == "right" ? rects.length - 1 : 0]; else rect = nullRect;
            } else {
                rect = range(node, start, end).getBoundingClientRect();
            }
        } else {
            if (start > 0) collapse = bias = "right";
            var rects;
            if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) rect = rects[bias == "right" ? rects.length - 1 : 0]; else rect = node.getBoundingClientRect();
        }
        if (ie_upto8 && !start && (!rect || !rect.left && !rect.right)) {
            var rSpan = node.parentNode.getClientRects()[0];
            if (rSpan) rect = {
                left: rSpan.left,
                right: rSpan.left + charWidth(cm.display),
                top: rSpan.top,
                bottom: rSpan.bottom
            }; else rect = nullRect;
        }
        var top, bot = (rect.bottom + rect.top) / 2 - prepared.rect.top;
        var heights = prepared.view.measure.heights;
        for (var i = 0; i < heights.length - 1; i++) if (bot < heights[i]) break;
        top = i ? heights[i - 1] : 0;
        bot = heights[i];
        var result = {
            left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
            right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
            top: top,
            bottom: bot
        };
        if (!rect.left && !rect.right) result.bogus = true;
        return result;
    }
    function clearLineMeasurementCacheFor(lineView) {
        if (lineView.measure) {
            lineView.measure.cache = {};
            lineView.measure.heights = null;
            if (lineView.rest) for (var i = 0; i < lineView.rest.length; i++) lineView.measure.caches[i] = {};
        }
    }
    function clearLineMeasurementCache(cm) {
        cm.display.externalMeasure = null;
        removeChildren(cm.display.lineMeasure);
        for (var i = 0; i < cm.display.view.length; i++) clearLineMeasurementCacheFor(cm.display.view[i]);
    }
    function clearCaches(cm) {
        clearLineMeasurementCache(cm);
        cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
        if (!cm.options.lineWrapping) cm.display.maxLineChanged = true;
        cm.display.lineNumChars = null;
    }
    function pageScrollX() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
    }
    function pageScrollY() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop;
    }
    function intoCoordSystem(cm, lineObj, rect, context) {
        if (lineObj.widgets) for (var i = 0; i < lineObj.widgets.length; ++i) if (lineObj.widgets[i].above) {
            var size = widgetHeight(lineObj.widgets[i]);
            rect.top += size;
            rect.bottom += size;
        }
        if (context == "line") return rect;
        if (!context) context = "local";
        var yOff = heightAtLine(lineObj);
        if (context == "local") yOff += paddingTop(cm.display); else yOff -= cm.display.viewOffset;
        if (context == "page" || context == "window") {
            var lOff = cm.display.lineSpace.getBoundingClientRect();
            yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
            var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
            rect.left += xOff;
            rect.right += xOff;
        }
        rect.top += yOff;
        rect.bottom += yOff;
        return rect;
    }
    function fromCoordSystem(cm, coords, context) {
        if (context == "div") return coords;
        var left = coords.left, top = coords.top;
        if (context == "page") {
            left -= pageScrollX();
            top -= pageScrollY();
        } else if (context == "local" || !context) {
            var localBox = cm.display.sizer.getBoundingClientRect();
            left += localBox.left;
            top += localBox.top;
        }
        var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
        return {
            left: left - lineSpaceBox.left,
            top: top - lineSpaceBox.top
        };
    }
    function charCoords(cm, pos, context, lineObj, bias) {
        if (!lineObj) lineObj = getLine(cm.doc, pos.line);
        return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
    }
    function cursorCoords(cm, pos, context, lineObj, preparedMeasure) {
        lineObj = lineObj || getLine(cm.doc, pos.line);
        if (!preparedMeasure) preparedMeasure = prepareMeasureForLine(cm, lineObj);
        function get(ch, right) {
            var m = measureCharPrepared(cm, preparedMeasure, ch, right ? "right" : "left");
            if (right) m.left = m.right; else m.right = m.left;
            return intoCoordSystem(cm, lineObj, m, context);
        }
        function getBidi(ch, partPos) {
            var part = order[partPos], right = part.level % 2;
            if (ch == bidiLeft(part) && partPos && part.level < order[partPos - 1].level) {
                part = order[--partPos];
                ch = bidiRight(part) - (part.level % 2 ? 0 : 1);
                right = true;
            } else if (ch == bidiRight(part) && partPos < order.length - 1 && part.level < order[partPos + 1].level) {
                part = order[++partPos];
                ch = bidiLeft(part) - part.level % 2;
                right = false;
            }
            if (right && ch == part.to && ch > part.from) return get(ch - 1);
            return get(ch, right);
        }
        var order = getOrder(lineObj), ch = pos.ch;
        if (!order) return get(ch);
        var partPos = getBidiPartAt(order, ch);
        var val = getBidi(ch, partPos);
        if (bidiOther != null) val.other = getBidi(ch, bidiOther);
        return val;
    }
    function estimateCoords(cm, pos) {
        var left = 0, pos = clipPos(cm.doc, pos);
        if (!cm.options.lineWrapping) left = charWidth(cm.display) * pos.ch;
        var lineObj = getLine(cm.doc, pos.line);
        var top = heightAtLine(lineObj) + paddingTop(cm.display);
        return {
            left: left,
            right: left,
            top: top,
            bottom: top + lineObj.height
        };
    }
    function PosWithInfo(line, ch, outside, xRel) {
        var pos = Pos(line, ch);
        pos.xRel = xRel;
        if (outside) pos.outside = true;
        return pos;
    }
    function coordsChar(cm, x, y) {
        var doc = cm.doc;
        y += cm.display.viewOffset;
        if (y < 0) return PosWithInfo(doc.first, 0, true, -1);
        var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
        if (lineN > last) return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, true, 1);
        if (x < 0) x = 0;
        var lineObj = getLine(doc, lineN);
        for (;;) {
            var found = coordsCharInner(cm, lineObj, lineN, x, y);
            var merged = collapsedSpanAtEnd(lineObj);
            var mergedPos = merged && merged.find(0, true);
            if (merged && (found.ch > mergedPos.from.ch || found.ch == mergedPos.from.ch && found.xRel > 0)) lineN = lineNo(lineObj = mergedPos.to.line); else return found;
        }
    }
    function coordsCharInner(cm, lineObj, lineNo, x, y) {
        var innerOff = y - heightAtLine(lineObj);
        var wrongLine = false, adjust = 2 * cm.display.wrapper.clientWidth;
        var preparedMeasure = prepareMeasureForLine(cm, lineObj);
        function getX(ch) {
            var sp = cursorCoords(cm, Pos(lineNo, ch), "line", lineObj, preparedMeasure);
            wrongLine = true;
            if (innerOff > sp.bottom) return sp.left - adjust; else if (innerOff < sp.top) return sp.left + adjust; else wrongLine = false;
            return sp.left;
        }
        var bidi = getOrder(lineObj), dist = lineObj.text.length;
        var from = lineLeft(lineObj), to = lineRight(lineObj);
        var fromX = getX(from), fromOutside = wrongLine, toX = getX(to), toOutside = wrongLine;
        if (x > toX) return PosWithInfo(lineNo, to, toOutside, 1);
        for (;;) {
            if (bidi ? to == from || to == moveVisually(lineObj, from, 1) : to - from <= 1) {
                var ch = x < fromX || x - fromX <= toX - x ? from : to;
                var xDiff = x - (ch == from ? fromX : toX);
                while (isExtendingChar(lineObj.text.charAt(ch))) ++ch;
                var pos = PosWithInfo(lineNo, ch, ch == from ? fromOutside : toOutside, xDiff < -1 ? -1 : xDiff > 1 ? 1 : 0);
                return pos;
            }
            var step = Math.ceil(dist / 2), middle = from + step;
            if (bidi) {
                middle = from;
                for (var i = 0; i < step; ++i) middle = moveVisually(lineObj, middle, 1);
            }
            var middleX = getX(middle);
            if (middleX > x) {
                to = middle;
                toX = middleX;
                if (toOutside = wrongLine) toX += 1e3;
                dist = step;
            } else {
                from = middle;
                fromX = middleX;
                fromOutside = wrongLine;
                dist -= step;
            }
        }
    }
    var measureText;
    function textHeight(display) {
        if (display.cachedTextHeight != null) return display.cachedTextHeight;
        if (measureText == null) {
            measureText = elt("pre");
            for (var i = 0; i < 49; ++i) {
                measureText.appendChild(document.createTextNode("x"));
                measureText.appendChild(elt("br"));
            }
            measureText.appendChild(document.createTextNode("x"));
        }
        removeChildrenAndAdd(display.measure, measureText);
        var height = measureText.offsetHeight / 50;
        if (height > 3) display.cachedTextHeight = height;
        removeChildren(display.measure);
        return height || 1;
    }
    function charWidth(display) {
        if (display.cachedCharWidth != null) return display.cachedCharWidth;
        var anchor = elt("span", "xxxxxxxxxx");
        var pre = elt("pre", [ anchor ]);
        removeChildrenAndAdd(display.measure, pre);
        var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
        if (width > 2) display.cachedCharWidth = width;
        return width || 10;
    }
    var nextOpId = 0;
    function startOperation(cm) {
        cm.curOp = {
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
            id: ++nextOpId
        };
        if (!delayedCallbackDepth++) delayedCallbacks = [];
    }
    function endOperation(cm) {
        var op = cm.curOp, doc = cm.doc, display = cm.display;
        cm.curOp = null;
        if (op.updateMaxLine) findMaxLine(cm);
        if (op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping) {
            var updated = updateDisplay(cm, {
                top: op.scrollTop,
                ensure: op.scrollToPos
            }, op.forceUpdate);
            if (cm.display.scroller.offsetHeight) cm.doc.scrollTop = cm.display.scroller.scrollTop;
        }
        if (!updated && op.selectionChanged) updateSelection(cm);
        if (op.scrollTop != null && display.scroller.scrollTop != op.scrollTop) {
            var top = Math.max(0, Math.min(display.scroller.scrollHeight - display.scroller.clientHeight, op.scrollTop));
            display.scroller.scrollTop = display.scrollbarV.scrollTop = doc.scrollTop = top;
        }
        if (op.scrollLeft != null && display.scroller.scrollLeft != op.scrollLeft) {
            var left = Math.max(0, Math.min(display.scroller.scrollWidth - display.scroller.clientWidth, op.scrollLeft));
            display.scroller.scrollLeft = display.scrollbarH.scrollLeft = doc.scrollLeft = left;
            alignHorizontally(cm);
        }
        if (op.scrollToPos) {
            var coords = scrollPosIntoView(cm, clipPos(cm.doc, op.scrollToPos.from), clipPos(cm.doc, op.scrollToPos.to), op.scrollToPos.margin);
            if (op.scrollToPos.isCursor && cm.state.focused) maybeScrollWindow(cm, coords);
        }
        if (op.selectionChanged) restartBlink(cm);
        if (cm.state.focused && op.updateInput) resetInput(cm, op.typing);
        var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
        if (hidden) for (var i = 0; i < hidden.length; ++i) if (!hidden[i].lines.length) signal(hidden[i], "hide");
        if (unhidden) for (var i = 0; i < unhidden.length; ++i) if (unhidden[i].lines.length) signal(unhidden[i], "unhide");
        var delayed;
        if (!--delayedCallbackDepth) {
            delayed = delayedCallbacks;
            delayedCallbacks = null;
        }
        if (op.changeObjs) {
            for (var i = 0; i < op.changeObjs.length; i++) signal(cm, "change", cm, op.changeObjs[i]);
            signal(cm, "changes", cm, op.changeObjs);
        }
        if (op.cursorActivity) signal(cm, "cursorActivity", cm);
        if (delayed) for (var i = 0; i < delayed.length; ++i) delayed[i]();
    }
    function runInOp(cm, f) {
        if (cm.curOp) return f();
        startOperation(cm);
        try {
            return f();
        } finally {
            endOperation(cm);
        }
    }
    function operation(cm, f) {
        return function() {
            if (cm.curOp) return f.apply(cm, arguments);
            startOperation(cm);
            try {
                return f.apply(cm, arguments);
            } finally {
                endOperation(cm);
            }
        };
    }
    function methodOp(f) {
        return function() {
            if (this.curOp) return f.apply(this, arguments);
            startOperation(this);
            try {
                return f.apply(this, arguments);
            } finally {
                endOperation(this);
            }
        };
    }
    function docMethodOp(f) {
        return function() {
            var cm = this.cm;
            if (!cm || cm.curOp) return f.apply(this, arguments);
            startOperation(cm);
            try {
                return f.apply(this, arguments);
            } finally {
                endOperation(cm);
            }
        };
    }
    function LineView(doc, line, lineN) {
        this.line = line;
        this.rest = visualLineContinued(line);
        this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
        this.node = this.text = null;
        this.hidden = lineIsHidden(doc, line);
    }
    function buildViewArray(cm, from, to) {
        var array = [], nextPos;
        for (var pos = from; pos < to; pos = nextPos) {
            var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
            nextPos = pos + view.size;
            array.push(view);
        }
        return array;
    }
    function regChange(cm, from, to, lendiff) {
        if (from == null) from = cm.doc.first;
        if (to == null) to = cm.doc.first + cm.doc.size;
        if (!lendiff) lendiff = 0;
        var display = cm.display;
        if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) display.updateLineNumbers = from;
        cm.curOp.viewChanged = true;
        if (from >= display.viewTo) {
            if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) resetView(cm);
        } else if (to <= display.viewFrom) {
            if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
                resetView(cm);
            } else {
                display.viewFrom += lendiff;
                display.viewTo += lendiff;
            }
        } else if (from <= display.viewFrom && to >= display.viewTo) {
            resetView(cm);
        } else if (from <= display.viewFrom) {
            var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
            if (cut) {
                display.view = display.view.slice(cut.index);
                display.viewFrom = cut.lineN;
                display.viewTo += lendiff;
            } else {
                resetView(cm);
            }
        } else if (to >= display.viewTo) {
            var cut = viewCuttingPoint(cm, from, from, -1);
            if (cut) {
                display.view = display.view.slice(0, cut.index);
                display.viewTo = cut.lineN;
            } else {
                resetView(cm);
            }
        } else {
            var cutTop = viewCuttingPoint(cm, from, from, -1);
            var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
            if (cutTop && cutBot) {
                display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
                display.viewTo += lendiff;
            } else {
                resetView(cm);
            }
        }
        var ext = display.externalMeasured;
        if (ext) {
            if (to < ext.lineN) ext.lineN += lendiff; else if (from < ext.lineN + ext.size) display.externalMeasured = null;
        }
    }
    function regLineChange(cm, line, type) {
        cm.curOp.viewChanged = true;
        var display = cm.display, ext = cm.display.externalMeasured;
        if (ext && line >= ext.lineN && line < ext.lineN + ext.size) display.externalMeasured = null;
        if (line < display.viewFrom || line >= display.viewTo) return;
        var lineView = display.view[findViewIndex(cm, line)];
        if (lineView.node == null) return;
        var arr = lineView.changes || (lineView.changes = []);
        if (indexOf(arr, type) == -1) arr.push(type);
    }
    function resetView(cm) {
        cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
        cm.display.view = [];
        cm.display.viewOffset = 0;
    }
    function findViewIndex(cm, n) {
        if (n >= cm.display.viewTo) return null;
        n -= cm.display.viewFrom;
        if (n < 0) return null;
        var view = cm.display.view;
        for (var i = 0; i < view.length; i++) {
            n -= view[i].size;
            if (n < 0) return i;
        }
    }
    function viewCuttingPoint(cm, oldN, newN, dir) {
        var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
        if (!sawCollapsedSpans) return {
            index: index,
            lineN: newN
        };
        for (var i = 0, n = cm.display.viewFrom; i < index; i++) n += view[i].size;
        if (n != oldN) {
            if (dir > 0) {
                if (index == view.length - 1) return null;
                diff = n + view[index].size - oldN;
                index++;
            } else {
                diff = n - oldN;
            }
            oldN += diff;
            newN += diff;
        }
        while (visualLineNo(cm.doc, newN) != newN) {
            if (index == (dir < 0 ? 0 : view.length - 1)) return null;
            newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
            index += dir;
        }
        return {
            index: index,
            lineN: newN
        };
    }
    function adjustView(cm, from, to) {
        var display = cm.display, view = display.view;
        if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
            display.view = buildViewArray(cm, from, to);
            display.viewFrom = from;
        } else {
            if (display.viewFrom > from) display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view); else if (display.viewFrom < from) display.view = display.view.slice(findViewIndex(cm, from));
            display.viewFrom = from;
            if (display.viewTo < to) display.view = display.view.concat(buildViewArray(cm, display.viewTo, to)); else if (display.viewTo > to) display.view = display.view.slice(0, findViewIndex(cm, to));
        }
        display.viewTo = to;
    }
    function countDirtyView(cm) {
        var view = cm.display.view, dirty = 0;
        for (var i = 0; i < view.length; i++) {
            var lineView = view[i];
            if (!lineView.hidden && (!lineView.node || lineView.changes)) ++dirty;
        }
        return dirty;
    }
    function slowPoll(cm) {
        if (cm.display.pollingFast) return;
        cm.display.poll.set(cm.options.pollInterval, function() {
            readInput(cm);
            if (cm.state.focused) slowPoll(cm);
        });
    }
    function fastPoll(cm) {
        var missed = false;
        cm.display.pollingFast = true;
        function p() {
            var changed = readInput(cm);
            if (!changed && !missed) {
                missed = true;
                cm.display.poll.set(60, p);
            } else {
                cm.display.pollingFast = false;
                slowPoll(cm);
            }
        }
        cm.display.poll.set(20, p);
    }
    function readInput(cm) {
        var input = cm.display.input, prevInput = cm.display.prevInput, doc = cm.doc;
        if (!cm.state.focused || hasSelection(input) || isReadOnly(cm) || cm.options.disableInput) return false;
        if (cm.state.pasteIncoming && cm.state.fakedLastChar) {
            input.value = input.value.substring(0, input.value.length - 1);
            cm.state.fakedLastChar = false;
        }
        var text = input.value;
        if (text == prevInput && !cm.somethingSelected()) return false;
        if (ie && !ie_upto8 && cm.display.inputHasSelection === text) {
            resetInput(cm);
            return false;
        }
        var withOp = !cm.curOp;
        if (withOp) startOperation(cm);
        cm.display.shift = false;
        var same = 0, l = Math.min(prevInput.length, text.length);
        while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) ++same;
        var inserted = text.slice(same), textLines = splitLines(inserted);
        var multiPaste = cm.state.pasteIncoming && textLines.length > 1 && doc.sel.ranges.length == textLines.length;
        for (var i = doc.sel.ranges.length - 1; i >= 0; i--) {
            var range = doc.sel.ranges[i];
            var from = range.from(), to = range.to();
            if (same < prevInput.length) from = Pos(from.line, from.ch - (prevInput.length - same)); else if (cm.state.overwrite && range.empty() && !cm.state.pasteIncoming) to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
            var updateInput = cm.curOp.updateInput;
            var changeEvent = {
                from: from,
                to: to,
                text: multiPaste ? [ textLines[i] ] : textLines,
                origin: cm.state.pasteIncoming ? "paste" : cm.state.cutIncoming ? "cut" : "+input"
            };
            makeChange(cm.doc, changeEvent);
            signalLater(cm, "inputRead", cm, changeEvent);
            if (inserted && !cm.state.pasteIncoming && cm.options.electricChars && cm.options.smartIndent && range.head.ch < 100 && (!i || doc.sel.ranges[i - 1].head.line != range.head.line)) {
                var electric = cm.getModeAt(range.head).electricChars;
                if (electric) for (var j = 0; j < electric.length; j++) if (inserted.indexOf(electric.charAt(j)) > -1) {
                    indentLine(cm, range.head.line, "smart");
                    break;
                }
            }
        }
        ensureCursorVisible(cm);
        cm.curOp.updateInput = updateInput;
        cm.curOp.typing = true;
        if (text.length > 1e3 || text.indexOf("\n") > -1) input.value = cm.display.prevInput = ""; else cm.display.prevInput = text;
        if (withOp) endOperation(cm);
        cm.state.pasteIncoming = cm.state.cutIncoming = false;
        return true;
    }
    function resetInput(cm, typing) {
        var minimal, selected, doc = cm.doc;
        if (cm.somethingSelected()) {
            cm.display.prevInput = "";
            var range = doc.sel.primary();
            minimal = hasCopyEvent && (range.to().line - range.from().line > 100 || (selected = cm.getSelection()).length > 1e3);
            var content = minimal ? "-" : selected || cm.getSelection();
            cm.display.input.value = content;
            if (cm.state.focused) selectInput(cm.display.input);
            if (ie && !ie_upto8) cm.display.inputHasSelection = content;
        } else if (!typing) {
            cm.display.prevInput = cm.display.input.value = "";
            if (ie && !ie_upto8) cm.display.inputHasSelection = null;
        }
        cm.display.inaccurateSelection = minimal;
    }
    function focusInput(cm) {
        if (cm.options.readOnly != "nocursor" && (!mobile || activeElt() != cm.display.input)) cm.display.input.focus();
    }
    function ensureFocus(cm) {
        if (!cm.state.focused) {
            focusInput(cm);
            onFocus(cm);
        }
    }
    function isReadOnly(cm) {
        return cm.options.readOnly || cm.doc.cantEdit;
    }
    function registerEventHandlers(cm) {
        var d = cm.display;
        on(d.scroller, "mousedown", operation(cm, onMouseDown));
        if (ie_upto10) on(d.scroller, "dblclick", operation(cm, function(e) {
            if (signalDOMEvent(cm, e)) return;
            var pos = posFromMouse(cm, e);
            if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) return;
            e_preventDefault(e);
            var word = findWordAt(cm.doc, pos);
            extendSelection(cm.doc, word.anchor, word.head);
        })); else on(d.scroller, "dblclick", function(e) {
            signalDOMEvent(cm, e) || e_preventDefault(e);
        });
        on(d.lineSpace, "selectstart", function(e) {
            if (!eventInWidget(d, e)) e_preventDefault(e);
        });
        if (!captureRightClick) on(d.scroller, "contextmenu", function(e) {
            onContextMenu(cm, e);
        });
        on(d.scroller, "scroll", function() {
            if (d.scroller.clientHeight) {
                setScrollTop(cm, d.scroller.scrollTop);
                setScrollLeft(cm, d.scroller.scrollLeft, true);
                signal(cm, "scroll", cm);
            }
        });
        on(d.scrollbarV, "scroll", function() {
            if (d.scroller.clientHeight) setScrollTop(cm, d.scrollbarV.scrollTop);
        });
        on(d.scrollbarH, "scroll", function() {
            if (d.scroller.clientHeight) setScrollLeft(cm, d.scrollbarH.scrollLeft);
        });
        on(d.scroller, "mousewheel", function(e) {
            onScrollWheel(cm, e);
        });
        on(d.scroller, "DOMMouseScroll", function(e) {
            onScrollWheel(cm, e);
        });
        function reFocus() {
            if (cm.state.focused) setTimeout(bind(focusInput, cm), 0);
        }
        on(d.scrollbarH, "mousedown", reFocus);
        on(d.scrollbarV, "mousedown", reFocus);
        on(d.wrapper, "scroll", function() {
            d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
        });
        var resizeTimer;
        function onResize() {
            if (resizeTimer == null) resizeTimer = setTimeout(function() {
                resizeTimer = null;
                d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = knownScrollbarWidth = null;
                cm.setSize();
            }, 100);
        }
        on(window, "resize", onResize);
        function unregister() {
            for (var p = d.wrapper.parentNode; p && p != document.body; p = p.parentNode) {}
            if (p) setTimeout(unregister, 5e3); else off(window, "resize", onResize);
        }
        setTimeout(unregister, 5e3);
        on(d.input, "keyup", operation(cm, onKeyUp));
        on(d.input, "input", function() {
            if (ie && !ie_upto8 && cm.display.inputHasSelection) cm.display.inputHasSelection = null;
            fastPoll(cm);
        });
        on(d.input, "keydown", operation(cm, onKeyDown));
        on(d.input, "keypress", operation(cm, onKeyPress));
        on(d.input, "focus", bind(onFocus, cm));
        on(d.input, "blur", bind(onBlur, cm));
        function drag_(e) {
            if (!signalDOMEvent(cm, e)) e_stop(e);
        }
        if (cm.options.dragDrop) {
            on(d.scroller, "dragstart", function(e) {
                onDragStart(cm, e);
            });
            on(d.scroller, "dragenter", drag_);
            on(d.scroller, "dragover", drag_);
            on(d.scroller, "drop", operation(cm, onDrop));
        }
        on(d.scroller, "paste", function(e) {
            if (eventInWidget(d, e)) return;
            cm.state.pasteIncoming = true;
            focusInput(cm);
            fastPoll(cm);
        });
        on(d.input, "paste", function() {
            if (webkit && !cm.state.fakedLastChar && !(new Date() - cm.state.lastMiddleDown < 200)) {
                var start = d.input.selectionStart, end = d.input.selectionEnd;
                d.input.value += "$";
                d.input.selectionStart = start;
                d.input.selectionEnd = end;
                cm.state.fakedLastChar = true;
            }
            cm.state.pasteIncoming = true;
            fastPoll(cm);
        });
        function prepareCopy(e) {
            if (d.inaccurateSelection) {
                d.prevInput = "";
                d.inaccurateSelection = false;
                d.input.value = cm.getSelection();
                selectInput(d.input);
            }
            if (e.type == "cut") cm.state.cutIncoming = true;
        }
        on(d.input, "cut", prepareCopy);
        on(d.input, "copy", prepareCopy);
        if (khtml) on(d.sizer, "mouseup", function() {
            if (activeElt() == d.input) d.input.blur();
            focusInput(cm);
        });
    }
    function eventInWidget(display, e) {
        for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
            if (!n || n.ignoreEvents || n.parentNode == display.sizer && n != display.mover) return true;
        }
    }
    function posFromMouse(cm, e, liberal, forRect) {
        var display = cm.display;
        if (!liberal) {
            var target = e_target(e);
            if (target == display.scrollbarH || target == display.scrollbarV || target == display.scrollbarFiller || target == display.gutterFiller) return null;
        }
        var x, y, space = display.lineSpace.getBoundingClientRect();
        try {
            x = e.clientX - space.left;
            y = e.clientY - space.top;
        } catch (e) {
            return null;
        }
        var coords = coordsChar(cm, x, y), line;
        if (forRect && coords.xRel == 1 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
            var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
            coords = Pos(coords.line, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff);
        }
        return coords;
    }
    function onMouseDown(e) {
        if (signalDOMEvent(this, e)) return;
        var cm = this, display = cm.display;
        display.shift = e.shiftKey;
        if (eventInWidget(display, e)) {
            if (!webkit) {
                display.scroller.draggable = false;
                setTimeout(function() {
                    display.scroller.draggable = true;
                }, 100);
            }
            return;
        }
        if (clickInGutter(cm, e)) return;
        var start = posFromMouse(cm, e);
        window.focus();
        switch (e_button(e)) {
          case 1:
            if (start) leftButtonDown(cm, e, start); else if (e_target(e) == display.scroller) e_preventDefault(e);
            break;

          case 2:
            if (webkit) cm.state.lastMiddleDown = +new Date();
            if (start) extendSelection(cm.doc, start);
            setTimeout(bind(focusInput, cm), 20);
            e_preventDefault(e);
            break;

          case 3:
            if (captureRightClick) onContextMenu(cm, e);
            break;
        }
    }
    var lastClick, lastDoubleClick;
    function leftButtonDown(cm, e, start) {
        setTimeout(bind(ensureFocus, cm), 0);
        var now = +new Date(), type;
        if (lastDoubleClick && lastDoubleClick.time > now - 400 && cmp(lastDoubleClick.pos, start) == 0) {
            type = "triple";
        } else if (lastClick && lastClick.time > now - 400 && cmp(lastClick.pos, start) == 0) {
            type = "double";
            lastDoubleClick = {
                time: now,
                pos: start
            };
        } else {
            type = "single";
            lastClick = {
                time: now,
                pos: start
            };
        }
        var sel = cm.doc.sel, addNew = mac ? e.metaKey : e.ctrlKey;
        if (cm.options.dragDrop && dragAndDrop && !addNew && !isReadOnly(cm) && type == "single" && sel.contains(start) > -1 && sel.somethingSelected()) leftButtonStartDrag(cm, e, start); else leftButtonSelect(cm, e, start, type, addNew);
    }
    function leftButtonStartDrag(cm, e, start) {
        var display = cm.display;
        var dragEnd = operation(cm, function(e2) {
            if (webkit) display.scroller.draggable = false;
            cm.state.draggingText = false;
            off(document, "mouseup", dragEnd);
            off(display.scroller, "drop", dragEnd);
            if (Math.abs(e.clientX - e2.clientX) + Math.abs(e.clientY - e2.clientY) < 10) {
                e_preventDefault(e2);
                extendSelection(cm.doc, start);
                focusInput(cm);
                if (ie_upto10 && !ie_upto8) setTimeout(function() {
                    document.body.focus();
                    focusInput(cm);
                }, 20);
            }
        });
        if (webkit) display.scroller.draggable = true;
        cm.state.draggingText = dragEnd;
        if (display.scroller.dragDrop) display.scroller.dragDrop();
        on(document, "mouseup", dragEnd);
        on(display.scroller, "drop", dragEnd);
    }
    function leftButtonSelect(cm, e, start, type, addNew) {
        var display = cm.display, doc = cm.doc;
        e_preventDefault(e);
        var ourRange, ourIndex, startSel = doc.sel;
        if (addNew) {
            ourIndex = doc.sel.contains(start);
            if (ourIndex > -1) ourRange = doc.sel.ranges[ourIndex]; else ourRange = new Range(start, start);
        } else {
            ourRange = doc.sel.primary();
        }
        if (e.altKey) {
            type = "rect";
            if (!addNew) ourRange = new Range(start, start);
            start = posFromMouse(cm, e, true, true);
            ourIndex = -1;
        } else if (type == "double") {
            var word = findWordAt(doc, start);
            if (cm.display.shift || doc.extend) ourRange = extendRange(doc, ourRange, word.anchor, word.head); else ourRange = word;
        } else if (type == "triple") {
            var line = new Range(Pos(start.line, 0), clipPos(doc, Pos(start.line + 1, 0)));
            if (cm.display.shift || doc.extend) ourRange = extendRange(doc, ourRange, line.anchor, line.head); else ourRange = line;
        } else {
            ourRange = extendRange(doc, ourRange, start);
        }
        if (!addNew) {
            ourIndex = 0;
            setSelection(doc, new Selection([ ourRange ], 0), sel_mouse);
        } else if (ourIndex > -1) {
            replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
        } else {
            ourIndex = doc.sel.ranges.length;
            setSelection(doc, normalizeSelection(doc.sel.ranges.concat([ ourRange ]), ourIndex), {
                scroll: false,
                origin: "*mouse"
            });
        }
        var lastPos = start;
        function extendTo(pos) {
            if (cmp(lastPos, pos) == 0) return;
            lastPos = pos;
            if (type == "rect") {
                var ranges = [], tabSize = cm.options.tabSize;
                var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
                var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
                var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
                for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
                    var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
                    if (left == right) ranges.push(new Range(Pos(line, leftPos), Pos(line, leftPos))); else if (text.length > leftPos) ranges.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
                }
                if (!ranges.length) ranges.push(new Range(start, start));
                setSelection(doc, normalizeSelection(startSel.ranges.slice(0, ourIndex).concat(ranges), ourIndex), sel_mouse);
            } else {
                var oldRange = ourRange;
                var anchor = oldRange.anchor, head = pos;
                if (type != "single") {
                    if (type == "double") var range = findWordAt(doc, pos); else var range = new Range(Pos(pos.line, 0), clipPos(doc, Pos(pos.line + 1, 0)));
                    if (cmp(range.anchor, anchor) > 0) {
                        head = range.head;
                        anchor = minPos(oldRange.from(), range.anchor);
                    } else {
                        head = range.anchor;
                        anchor = maxPos(oldRange.to(), range.head);
                    }
                }
                var ranges = startSel.ranges.slice(0);
                ranges[ourIndex] = new Range(clipPos(doc, anchor), head);
                setSelection(doc, normalizeSelection(ranges, ourIndex), sel_mouse);
            }
        }
        var editorSize = display.wrapper.getBoundingClientRect();
        var counter = 0;
        function extend(e) {
            var curCount = ++counter;
            var cur = posFromMouse(cm, e, true, type == "rect");
            if (!cur) return;
            if (cmp(cur, lastPos) != 0) {
                ensureFocus(cm);
                extendTo(cur);
                var visible = visibleLines(display, doc);
                if (cur.line >= visible.to || cur.line < visible.from) setTimeout(operation(cm, function() {
                    if (counter == curCount) extend(e);
                }), 150);
            } else {
                var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
                if (outside) setTimeout(operation(cm, function() {
                    if (counter != curCount) return;
                    display.scroller.scrollTop += outside;
                    extend(e);
                }), 50);
            }
        }
        function done(e) {
            counter = Infinity;
            e_preventDefault(e);
            focusInput(cm);
            off(document, "mousemove", move);
            off(document, "mouseup", up);
            doc.history.lastSelOrigin = null;
        }
        var move = operation(cm, function(e) {
            if (ie && !ie_upto9 ? !e.buttons : !e_button(e)) done(e); else extend(e);
        });
        var up = operation(cm, done);
        on(document, "mousemove", move);
        on(document, "mouseup", up);
    }
    function gutterEvent(cm, e, type, prevent, signalfn) {
        try {
            var mX = e.clientX, mY = e.clientY;
        } catch (e) {
            return false;
        }
        if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) return false;
        if (prevent) e_preventDefault(e);
        var display = cm.display;
        var lineBox = display.lineDiv.getBoundingClientRect();
        if (mY > lineBox.bottom || !hasHandler(cm, type)) return e_defaultPrevented(e);
        mY -= lineBox.top - display.viewOffset;
        for (var i = 0; i < cm.options.gutters.length; ++i) {
            var g = display.gutters.childNodes[i];
            if (g && g.getBoundingClientRect().right >= mX) {
                var line = lineAtHeight(cm.doc, mY);
                var gutter = cm.options.gutters[i];
                signalfn(cm, type, cm, line, gutter, e);
                return e_defaultPrevented(e);
            }
        }
    }
    function clickInGutter(cm, e) {
        return gutterEvent(cm, e, "gutterClick", true, signalLater);
    }
    var lastDrop = 0;
    function onDrop(e) {
        var cm = this;
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) return;
        e_preventDefault(e);
        if (ie_upto10) lastDrop = +new Date();
        var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
        if (!pos || isReadOnly(cm)) return;
        if (files && files.length && window.FileReader && window.File) {
            var n = files.length, text = Array(n), read = 0;
            var loadFile = function(file, i) {
                var reader = new FileReader();
                reader.onload = function() {
                    text[i] = reader.result;
                    if (++read == n) {
                        pos = clipPos(cm.doc, pos);
                        var change = {
                            from: pos,
                            to: pos,
                            text: splitLines(text.join("\n")),
                            origin: "paste"
                        };
                        makeChange(cm.doc, change);
                        setSelectionReplaceHistory(cm.doc, simpleSelection(pos, changeEnd(change)));
                    }
                };
                reader.readAsText(file);
            };
            for (var i = 0; i < n; ++i) loadFile(files[i], i);
        } else {
            if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
                cm.state.draggingText(e);
                setTimeout(bind(focusInput, cm), 20);
                return;
            }
            try {
                var text = e.dataTransfer.getData("Text");
                if (text) {
                    var selected = cm.state.draggingText && cm.listSelections();
                    setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
                    if (selected) for (var i = 0; i < selected.length; ++i) replaceRange(cm.doc, "", selected[i].anchor, selected[i].head, "drag");
                    cm.replaceSelection(text, "around", "paste");
                    focusInput(cm);
                }
            } catch (e) {}
        }
    }
    function onDragStart(cm, e) {
        if (ie_upto10 && (!cm.state.draggingText || +new Date() - lastDrop < 100)) {
            e_stop(e);
            return;
        }
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) return;
        e.dataTransfer.setData("Text", cm.getSelection());
        if (e.dataTransfer.setDragImage && !safari) {
            var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
            img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            if (presto) {
                img.width = img.height = 1;
                cm.display.wrapper.appendChild(img);
                img._top = img.offsetTop;
            }
            e.dataTransfer.setDragImage(img, 0, 0);
            if (presto) img.parentNode.removeChild(img);
        }
    }
    function setScrollTop(cm, val) {
        if (Math.abs(cm.doc.scrollTop - val) < 2) return;
        cm.doc.scrollTop = val;
        if (!gecko) updateDisplay(cm, {
            top: val
        });
        if (cm.display.scroller.scrollTop != val) cm.display.scroller.scrollTop = val;
        if (cm.display.scrollbarV.scrollTop != val) cm.display.scrollbarV.scrollTop = val;
        if (gecko) updateDisplay(cm);
        startWorker(cm, 100);
    }
    function setScrollLeft(cm, val, isScroller) {
        if (isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) return;
        val = Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth);
        cm.doc.scrollLeft = val;
        alignHorizontally(cm);
        if (cm.display.scroller.scrollLeft != val) cm.display.scroller.scrollLeft = val;
        if (cm.display.scrollbarH.scrollLeft != val) cm.display.scrollbarH.scrollLeft = val;
    }
    var wheelSamples = 0, wheelPixelsPerUnit = null;
    if (ie) wheelPixelsPerUnit = -.53; else if (gecko) wheelPixelsPerUnit = 15; else if (chrome) wheelPixelsPerUnit = -.7; else if (safari) wheelPixelsPerUnit = -1 / 3;
    function onScrollWheel(cm, e) {
        var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
        if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) dx = e.detail;
        if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) dy = e.detail; else if (dy == null) dy = e.wheelDelta;
        var display = cm.display, scroll = display.scroller;
        if (!(dx && scroll.scrollWidth > scroll.clientWidth || dy && scroll.scrollHeight > scroll.clientHeight)) return;
        if (dy && mac && webkit) {
            outer: for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
                for (var i = 0; i < view.length; i++) {
                    if (view[i].node == cur) {
                        cm.display.currentWheelTarget = cur;
                        break outer;
                    }
                }
            }
        }
        if (dx && !gecko && !presto && wheelPixelsPerUnit != null) {
            if (dy) setScrollTop(cm, Math.max(0, Math.min(scroll.scrollTop + dy * wheelPixelsPerUnit, scroll.scrollHeight - scroll.clientHeight)));
            setScrollLeft(cm, Math.max(0, Math.min(scroll.scrollLeft + dx * wheelPixelsPerUnit, scroll.scrollWidth - scroll.clientWidth)));
            e_preventDefault(e);
            display.wheelStartX = null;
            return;
        }
        if (dy && wheelPixelsPerUnit != null) {
            var pixels = dy * wheelPixelsPerUnit;
            var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
            if (pixels < 0) top = Math.max(0, top + pixels - 50); else bot = Math.min(cm.doc.height, bot + pixels + 50);
            updateDisplay(cm, {
                top: top,
                bottom: bot
            });
        }
        if (wheelSamples < 20) {
            if (display.wheelStartX == null) {
                display.wheelStartX = scroll.scrollLeft;
                display.wheelStartY = scroll.scrollTop;
                display.wheelDX = dx;
                display.wheelDY = dy;
                setTimeout(function() {
                    if (display.wheelStartX == null) return;
                    var movedX = scroll.scrollLeft - display.wheelStartX;
                    var movedY = scroll.scrollTop - display.wheelStartY;
                    var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
                    display.wheelStartX = display.wheelStartY = null;
                    if (!sample) return;
                    wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
                    ++wheelSamples;
                }, 200);
            } else {
                display.wheelDX += dx;
                display.wheelDY += dy;
            }
        }
    }
    function doHandleBinding(cm, bound, dropShift) {
        if (typeof bound == "string") {
            bound = commands[bound];
            if (!bound) return false;
        }
        if (cm.display.pollingFast && readInput(cm)) cm.display.pollingFast = false;
        var prevShift = cm.display.shift, done = false;
        try {
            if (isReadOnly(cm)) cm.state.suppressEdits = true;
            if (dropShift) cm.display.shift = false;
            done = bound(cm) != Pass;
        } finally {
            cm.display.shift = prevShift;
            cm.state.suppressEdits = false;
        }
        return done;
    }
    function allKeyMaps(cm) {
        var maps = cm.state.keyMaps.slice(0);
        if (cm.options.extraKeys) maps.push(cm.options.extraKeys);
        maps.push(cm.options.keyMap);
        return maps;
    }
    var maybeTransition;
    function handleKeyBinding(cm, e) {
        var startMap = getKeyMap(cm.options.keyMap), next = startMap.auto;
        clearTimeout(maybeTransition);
        if (next && !isModifierKey(e)) maybeTransition = setTimeout(function() {
            if (getKeyMap(cm.options.keyMap) == startMap) {
                cm.options.keyMap = next.call ? next.call(null, cm) : next;
                keyMapChanged(cm);
            }
        }, 50);
        var name = keyName(e, true), handled = false;
        if (!name) return false;
        var keymaps = allKeyMaps(cm);
        if (e.shiftKey) {
            handled = lookupKey("Shift-" + name, keymaps, function(b) {
                return doHandleBinding(cm, b, true);
            }) || lookupKey(name, keymaps, function(b) {
                if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) return doHandleBinding(cm, b);
            });
        } else {
            handled = lookupKey(name, keymaps, function(b) {
                return doHandleBinding(cm, b);
            });
        }
        if (handled) {
            e_preventDefault(e);
            restartBlink(cm);
            signalLater(cm, "keyHandled", cm, name, e);
        }
        return handled;
    }
    function handleCharBinding(cm, e, ch) {
        var handled = lookupKey("'" + ch + "'", allKeyMaps(cm), function(b) {
            return doHandleBinding(cm, b, true);
        });
        if (handled) {
            e_preventDefault(e);
            restartBlink(cm);
            signalLater(cm, "keyHandled", cm, "'" + ch + "'", e);
        }
        return handled;
    }
    var lastStoppedKey = null;
    function onKeyDown(e) {
        var cm = this;
        ensureFocus(cm);
        if (signalDOMEvent(cm, e)) return;
        if (ie_upto10 && e.keyCode == 27) e.returnValue = false;
        var code = e.keyCode;
        cm.display.shift = code == 16 || e.shiftKey;
        var handled = handleKeyBinding(cm, e);
        if (presto) {
            lastStoppedKey = handled ? code : null;
            if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) cm.replaceSelection("", null, "cut");
        }
    }
    function onKeyUp(e) {
        if (signalDOMEvent(this, e)) return;
        if (e.keyCode == 16) this.doc.sel.shift = false;
    }
    function onKeyPress(e) {
        var cm = this;
        if (signalDOMEvent(cm, e)) return;
        var keyCode = e.keyCode, charCode = e.charCode;
        if (presto && keyCode == lastStoppedKey) {
            lastStoppedKey = null;
            e_preventDefault(e);
            return;
        }
        if ((presto && (!e.which || e.which < 10) || khtml) && handleKeyBinding(cm, e)) return;
        var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
        if (handleCharBinding(cm, e, ch)) return;
        if (ie && !ie_upto8) cm.display.inputHasSelection = null;
        fastPoll(cm);
    }
    function onFocus(cm) {
        if (cm.options.readOnly == "nocursor") return;
        if (!cm.state.focused) {
            signal(cm, "focus", cm);
            cm.state.focused = true;
            if (cm.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1) cm.display.wrapper.className += " CodeMirror-focused";
            if (!cm.curOp) {
                resetInput(cm);
                if (webkit) setTimeout(bind(resetInput, cm, true), 0);
            }
        }
        slowPoll(cm);
        restartBlink(cm);
    }
    function onBlur(cm) {
        if (cm.state.focused) {
            signal(cm, "blur", cm);
            cm.state.focused = false;
            cm.display.wrapper.className = cm.display.wrapper.className.replace(" CodeMirror-focused", "");
        }
        clearInterval(cm.display.blinker);
        setTimeout(function() {
            if (!cm.state.focused) cm.display.shift = false;
        }, 150);
    }
    var detectingSelectAll;
    function onContextMenu(cm, e) {
        if (signalDOMEvent(cm, e, "contextmenu")) return;
        var display = cm.display;
        if (eventInWidget(display, e) || contextMenuInGutter(cm, e)) return;
        var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
        if (!pos || presto) return;
        var reset = cm.options.resetSelectionOnContextMenu;
        if (reset && cm.doc.sel.contains(pos) == -1) operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
        var oldCSS = display.input.style.cssText;
        display.inputDiv.style.position = "absolute";
        display.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (e.clientY - 5) + "px; left: " + (e.clientX - 5) + "px; z-index: 1000; background: transparent; outline: none;" + "border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);";
        focusInput(cm);
        resetInput(cm);
        var hasSelection = cm.somethingSelected();
        if (!hasSelection) display.input.value = display.prevInput = " ";
        function prepareSelectAllHack() {
            if (display.input.selectionStart != null) {
                var extval = display.input.value = "​" + (hasSelection ? display.input.value : "");
                display.prevInput = "​";
                display.input.selectionStart = 1;
                display.input.selectionEnd = extval.length;
            }
        }
        function rehide() {
            display.inputDiv.style.position = "relative";
            display.input.style.cssText = oldCSS;
            if (ie_upto8) display.scrollbarV.scrollTop = display.scroller.scrollTop = scrollPos;
            slowPoll(cm);
            if (display.input.selectionStart != null) {
                if (!ie || ie_upto8) prepareSelectAllHack();
                clearTimeout(detectingSelectAll);
                var i = 0, poll = function() {
                    if (display.prevInput == "​" && display.input.selectionStart == 0) operation(cm, commands.selectAll)(cm); else if (i++ < 10) detectingSelectAll = setTimeout(poll, 500); else resetInput(cm);
                };
                detectingSelectAll = setTimeout(poll, 200);
            }
        }
        if (ie && !ie_upto8) prepareSelectAllHack();
        if (captureRightClick) {
            e_stop(e);
            var mouseup = function() {
                off(window, "mouseup", mouseup);
                setTimeout(rehide, 20);
            };
            on(window, "mouseup", mouseup);
        } else {
            setTimeout(rehide, 50);
        }
    }
    function contextMenuInGutter(cm, e) {
        if (!hasHandler(cm, "gutterContextMenu")) return false;
        return gutterEvent(cm, e, "gutterContextMenu", false, signal);
    }
    var changeEnd = CodeMirror.changeEnd = function(change) {
        if (!change.text) return change.to;
        return Pos(change.from.line + change.text.length - 1, lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
    };
    function adjustForChange(pos, change) {
        if (cmp(pos, change.from) < 0) return pos;
        if (cmp(pos, change.to) <= 0) return changeEnd(change);
        var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
        if (pos.line == change.to.line) ch += changeEnd(change).ch - change.to.ch;
        return Pos(line, ch);
    }
    function computeSelAfterChange(doc, change) {
        var out = [];
        for (var i = 0; i < doc.sel.ranges.length; i++) {
            var range = doc.sel.ranges[i];
            out.push(new Range(adjustForChange(range.anchor, change), adjustForChange(range.head, change)));
        }
        return normalizeSelection(out, doc.sel.primIndex);
    }
    function offsetPos(pos, old, nw) {
        if (pos.line == old.line) return Pos(nw.line, pos.ch - old.ch + nw.ch); else return Pos(nw.line + (pos.line - old.line), pos.ch);
    }
    function computeReplacedSel(doc, changes, hint) {
        var out = [];
        var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
        for (var i = 0; i < changes.length; i++) {
            var change = changes[i];
            var from = offsetPos(change.from, oldPrev, newPrev);
            var to = offsetPos(changeEnd(change), oldPrev, newPrev);
            oldPrev = change.to;
            newPrev = to;
            if (hint == "around") {
                var range = doc.sel.ranges[i], inv = cmp(range.head, range.anchor) < 0;
                out[i] = new Range(inv ? to : from, inv ? from : to);
            } else {
                out[i] = new Range(from, from);
            }
        }
        return new Selection(out, doc.sel.primIndex);
    }
    function filterChange(doc, change, update) {
        var obj = {
            canceled: false,
            from: change.from,
            to: change.to,
            text: change.text,
            origin: change.origin,
            cancel: function() {
                this.canceled = true;
            }
        };
        if (update) obj.update = function(from, to, text, origin) {
            if (from) this.from = clipPos(doc, from);
            if (to) this.to = clipPos(doc, to);
            if (text) this.text = text;
            if (origin !== undefined) this.origin = origin;
        };
        signal(doc, "beforeChange", doc, obj);
        if (doc.cm) signal(doc.cm, "beforeChange", doc.cm, obj);
        if (obj.canceled) return null;
        return {
            from: obj.from,
            to: obj.to,
            text: obj.text,
            origin: obj.origin
        };
    }
    function makeChange(doc, change, ignoreReadOnly) {
        if (doc.cm) {
            if (!doc.cm.curOp) return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
            if (doc.cm.state.suppressEdits) return;
        }
        if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
            change = filterChange(doc, change, true);
            if (!change) return;
        }
        var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
        if (split) {
            for (var i = split.length - 1; i >= 0; --i) makeChangeInner(doc, {
                from: split[i].from,
                to: split[i].to,
                text: i ? [ "" ] : change.text
            });
        } else {
            makeChangeInner(doc, change);
        }
    }
    function makeChangeInner(doc, change) {
        if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) return;
        var selAfter = computeSelAfterChange(doc, change);
        addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);
        makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
        var rebased = [];
        linkedDocs(doc, function(doc, sharedHist) {
            if (!sharedHist && indexOf(rebased, doc.history) == -1) {
                rebaseHist(doc.history, change);
                rebased.push(doc.history);
            }
            makeChangeSingleDoc(doc, change, null, stretchSpansOverChange(doc, change));
        });
    }
    function makeChangeFromHistory(doc, type, allowSelectionOnly) {
        if (doc.cm && doc.cm.state.suppressEdits) return;
        var hist = doc.history, event, selAfter = doc.sel;
        var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
        for (var i = 0; i < source.length; i++) if (allowSelectionOnly || !source[i].ranges) break;
        if (i == source.length) return;
        hist.lastOrigin = hist.lastSelOrigin = null;
        for (;;) {
            event = source.pop();
            if (event.ranges) {
                pushSelectionToHistory(event, dest);
                if (allowSelectionOnly && !event.equals(doc.sel)) {
                    setSelection(doc, event, {
                        clearRedo: false
                    });
                    return;
                }
                selAfter = event;
            } else break;
        }
        var antiChanges = [];
        pushSelectionToHistory(selAfter, dest);
        dest.push({
            changes: antiChanges,
            generation: hist.generation
        });
        hist.generation = event.generation || ++hist.maxGeneration;
        var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");
        for (var i = event.changes.length - 1; i >= 0; --i) {
            var change = event.changes[i];
            change.origin = type;
            if (filter && !filterChange(doc, change, false)) {
                source.length = 0;
                return;
            }
            antiChanges.push(historyChangeFromChange(doc, change));
            var after = i ? computeSelAfterChange(doc, change, null) : lst(source);
            makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
            if (doc.cm) ensureCursorVisible(doc.cm);
            var rebased = [];
            linkedDocs(doc, function(doc, sharedHist) {
                if (!sharedHist && indexOf(rebased, doc.history) == -1) {
                    rebaseHist(doc.history, change);
                    rebased.push(doc.history);
                }
                makeChangeSingleDoc(doc, change, null, mergeOldSpans(doc, change));
            });
        }
    }
    function shiftDoc(doc, distance) {
        doc.first += distance;
        doc.sel = new Selection(map(doc.sel.ranges, function(range) {
            return new Range(Pos(range.anchor.line + distance, range.anchor.ch), Pos(range.head.line + distance, range.head.ch));
        }), doc.sel.primIndex);
        if (doc.cm) regChange(doc.cm, doc.first, doc.first - distance, distance);
    }
    function makeChangeSingleDoc(doc, change, selAfter, spans) {
        if (doc.cm && !doc.cm.curOp) return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
        if (change.to.line < doc.first) {
            shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
            return;
        }
        if (change.from.line > doc.lastLine()) return;
        if (change.from.line < doc.first) {
            var shift = change.text.length - 1 - (doc.first - change.from.line);
            shiftDoc(doc, shift);
            change = {
                from: Pos(doc.first, 0),
                to: Pos(change.to.line + shift, change.to.ch),
                text: [ lst(change.text) ],
                origin: change.origin
            };
        }
        var last = doc.lastLine();
        if (change.to.line > last) {
            change = {
                from: change.from,
                to: Pos(last, getLine(doc, last).text.length),
                text: [ change.text[0] ],
                origin: change.origin
            };
        }
        change.removed = getBetween(doc, change.from, change.to);
        if (!selAfter) selAfter = computeSelAfterChange(doc, change, null);
        if (doc.cm) makeChangeSingleDocInEditor(doc.cm, change, spans); else updateDoc(doc, change, spans);
        setSelectionNoUndo(doc, selAfter, sel_dontScroll);
    }
    function makeChangeSingleDocInEditor(cm, change, spans) {
        var doc = cm.doc, display = cm.display, from = change.from, to = change.to;
        var recomputeMaxLength = false, checkWidthStart = from.line;
        if (!cm.options.lineWrapping) {
            checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
            doc.iter(checkWidthStart, to.line + 1, function(line) {
                if (line == display.maxLine) {
                    recomputeMaxLength = true;
                    return true;
                }
            });
        }
        if (doc.sel.contains(change.from, change.to) > -1) cm.curOp.cursorActivity = true;
        updateDoc(doc, change, spans, estimateHeight(cm));
        if (!cm.options.lineWrapping) {
            doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
                var len = lineLength(line);
                if (len > display.maxLineLength) {
                    display.maxLine = line;
                    display.maxLineLength = len;
                    display.maxLineChanged = true;
                    recomputeMaxLength = false;
                }
            });
            if (recomputeMaxLength) cm.curOp.updateMaxLine = true;
        }
        doc.frontier = Math.min(doc.frontier, from.line);
        startWorker(cm, 400);
        var lendiff = change.text.length - (to.line - from.line) - 1;
        if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) regLineChange(cm, from.line, "text"); else regChange(cm, from.line, to.line + 1, lendiff);
        if (hasHandler(cm, "change") || hasHandler(cm, "changes")) (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push({
            from: from,
            to: to,
            text: change.text,
            removed: change.removed,
            origin: change.origin
        });
    }
    function replaceRange(doc, code, from, to, origin) {
        if (!to) to = from;
        if (cmp(to, from) < 0) {
            var tmp = to;
            to = from;
            from = tmp;
        }
        if (typeof code == "string") code = splitLines(code);
        makeChange(doc, {
            from: from,
            to: to,
            text: code,
            origin: origin
        });
    }
    function maybeScrollWindow(cm, coords) {
        var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
        if (coords.top + box.top < 0) doScroll = true; else if (coords.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) doScroll = false;
        if (doScroll != null && !phantom) {
            var scrollNode = elt("div", "​", null, "position: absolute; top: " + (coords.top - display.viewOffset - paddingTop(cm.display)) + "px; height: " + (coords.bottom - coords.top + scrollerCutOff) + "px; left: " + coords.left + "px; width: 2px;");
            cm.display.lineSpace.appendChild(scrollNode);
            scrollNode.scrollIntoView(doScroll);
            cm.display.lineSpace.removeChild(scrollNode);
        }
    }
    function scrollPosIntoView(cm, pos, end, margin) {
        if (margin == null) margin = 0;
        for (;;) {
            var changed = false, coords = cursorCoords(cm, pos);
            var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
            var scrollPos = calculateScrollPos(cm, Math.min(coords.left, endCoords.left), Math.min(coords.top, endCoords.top) - margin, Math.max(coords.left, endCoords.left), Math.max(coords.bottom, endCoords.bottom) + margin);
            var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
            if (scrollPos.scrollTop != null) {
                setScrollTop(cm, scrollPos.scrollTop);
                if (Math.abs(cm.doc.scrollTop - startTop) > 1) changed = true;
            }
            if (scrollPos.scrollLeft != null) {
                setScrollLeft(cm, scrollPos.scrollLeft);
                if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) changed = true;
            }
            if (!changed) return coords;
        }
    }
    function scrollIntoView(cm, x1, y1, x2, y2) {
        var scrollPos = calculateScrollPos(cm, x1, y1, x2, y2);
        if (scrollPos.scrollTop != null) setScrollTop(cm, scrollPos.scrollTop);
        if (scrollPos.scrollLeft != null) setScrollLeft(cm, scrollPos.scrollLeft);
    }
    function calculateScrollPos(cm, x1, y1, x2, y2) {
        var display = cm.display, snapMargin = textHeight(cm.display);
        if (y1 < 0) y1 = 0;
        var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
        var screen = display.scroller.clientHeight - scrollerCutOff, result = {};
        var docBottom = cm.doc.height + paddingVert(display);
        var atTop = y1 < snapMargin, atBottom = y2 > docBottom - snapMargin;
        if (y1 < screentop) {
            result.scrollTop = atTop ? 0 : y1;
        } else if (y2 > screentop + screen) {
            var newTop = Math.min(y1, (atBottom ? docBottom : y2) - screen);
            if (newTop != screentop) result.scrollTop = newTop;
        }
        var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft;
        var screenw = display.scroller.clientWidth - scrollerCutOff;
        x1 += display.gutters.offsetWidth;
        x2 += display.gutters.offsetWidth;
        var gutterw = display.gutters.offsetWidth;
        var atLeft = x1 < gutterw + 10;
        if (x1 < screenleft + gutterw || atLeft) {
            if (atLeft) x1 = 0;
            result.scrollLeft = Math.max(0, x1 - 10 - gutterw);
        } else if (x2 > screenw + screenleft - 3) {
            result.scrollLeft = x2 + 10 - screenw;
        }
        return result;
    }
    function addToScrollPos(cm, left, top) {
        if (left != null || top != null) resolveScrollToPos(cm);
        if (left != null) cm.curOp.scrollLeft = (cm.curOp.scrollLeft == null ? cm.doc.scrollLeft : cm.curOp.scrollLeft) + left;
        if (top != null) cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
    }
    function ensureCursorVisible(cm) {
        resolveScrollToPos(cm);
        var cur = cm.getCursor(), from = cur, to = cur;
        if (!cm.options.lineWrapping) {
            from = cur.ch ? Pos(cur.line, cur.ch - 1) : cur;
            to = Pos(cur.line, cur.ch + 1);
        }
        cm.curOp.scrollToPos = {
            from: from,
            to: to,
            margin: cm.options.cursorScrollMargin,
            isCursor: true
        };
    }
    function resolveScrollToPos(cm) {
        var range = cm.curOp.scrollToPos;
        if (range) {
            cm.curOp.scrollToPos = null;
            var from = estimateCoords(cm, range.from), to = estimateCoords(cm, range.to);
            var sPos = calculateScrollPos(cm, Math.min(from.left, to.left), Math.min(from.top, to.top) - range.margin, Math.max(from.right, to.right), Math.max(from.bottom, to.bottom) + range.margin);
            cm.scrollTo(sPos.scrollLeft, sPos.scrollTop);
        }
    }
    function indentLine(cm, n, how, aggressive) {
        var doc = cm.doc, state;
        if (how == null) how = "add";
        if (how == "smart") {
            if (!cm.doc.mode.indent) how = "prev"; else state = getStateBefore(cm, n);
        }
        var tabSize = cm.options.tabSize;
        var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
        if (line.stateAfter) line.stateAfter = null;
        var curSpaceString = line.text.match(/^\s*/)[0], indentation;
        if (!aggressive && !/\S/.test(line.text)) {
            indentation = 0;
            how = "not";
        } else if (how == "smart") {
            indentation = cm.doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
            if (indentation == Pass) {
                if (!aggressive) return;
                how = "prev";
            }
        }
        if (how == "prev") {
            if (n > doc.first) indentation = countColumn(getLine(doc, n - 1).text, null, tabSize); else indentation = 0;
        } else if (how == "add") {
            indentation = curSpace + cm.options.indentUnit;
        } else if (how == "subtract") {
            indentation = curSpace - cm.options.indentUnit;
        } else if (typeof how == "number") {
            indentation = curSpace + how;
        }
        indentation = Math.max(0, indentation);
        var indentString = "", pos = 0;
        if (cm.options.indentWithTabs) for (var i = Math.floor(indentation / tabSize); i; --i) {
            pos += tabSize;
            indentString += "	";
        }
        if (pos < indentation) indentString += spaceStr(indentation - pos);
        if (indentString != curSpaceString) {
            replaceRange(cm.doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
        } else {
            for (var i = 0; i < doc.sel.ranges.length; i++) {
                var range = doc.sel.ranges[i];
                if (range.head.line == n && range.head.ch < curSpaceString.length) {
                    var pos = Pos(n, curSpaceString.length);
                    replaceOneSelection(doc, i, new Range(pos, pos));
                    break;
                }
            }
        }
        line.stateAfter = null;
    }
    function changeLine(cm, handle, changeType, op) {
        var no = handle, line = handle, doc = cm.doc;
        if (typeof handle == "number") line = getLine(doc, clipLine(doc, handle)); else no = lineNo(handle);
        if (no == null) return null;
        if (op(line, no)) regLineChange(cm, no, changeType); else return null;
        return line;
    }
    function deleteNearSelection(cm, compute) {
        var ranges = cm.doc.sel.ranges, kill = [];
        for (var i = 0; i < ranges.length; i++) {
            var toKill = compute(ranges[i]);
            while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
                var replaced = kill.pop();
                if (cmp(replaced.from, toKill.from) < 0) {
                    toKill.from = replaced.from;
                    break;
                }
            }
            kill.push(toKill);
        }
        runInOp(cm, function() {
            for (var i = kill.length - 1; i >= 0; i--) replaceRange(cm.doc, "", kill[i].from, kill[i].to, "+delete");
            ensureCursorVisible(cm);
        });
    }
    function findPosH(doc, pos, dir, unit, visually) {
        var line = pos.line, ch = pos.ch, origDir = dir;
        var lineObj = getLine(doc, line);
        var possible = true;
        function findNextLine() {
            var l = line + dir;
            if (l < doc.first || l >= doc.first + doc.size) return possible = false;
            line = l;
            return lineObj = getLine(doc, l);
        }
        function moveOnce(boundToLine) {
            var next = (visually ? moveVisually : moveLogically)(lineObj, ch, dir, true);
            if (next == null) {
                if (!boundToLine && findNextLine()) {
                    if (visually) ch = (dir < 0 ? lineRight : lineLeft)(lineObj); else ch = dir < 0 ? lineObj.text.length : 0;
                } else return possible = false;
            } else ch = next;
            return true;
        }
        if (unit == "char") moveOnce(); else if (unit == "column") moveOnce(true); else if (unit == "word" || unit == "group") {
            var sawType = null, group = unit == "group";
            for (var first = true; ;first = false) {
                if (dir < 0 && !moveOnce(!first)) break;
                var cur = lineObj.text.charAt(ch) || "\n";
                var type = isWordChar(cur) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
                if (group && !first && !type) type = "s";
                if (sawType && sawType != type) {
                    if (dir < 0) {
                        dir = 1;
                        moveOnce();
                    }
                    break;
                }
                if (type) sawType = type;
                if (dir > 0 && !moveOnce(!first)) break;
            }
        }
        var result = skipAtomic(doc, Pos(line, ch), origDir, true);
        if (!possible) result.hitSide = true;
        return result;
    }
    function findPosV(cm, pos, dir, unit) {
        var doc = cm.doc, x = pos.left, y;
        if (unit == "page") {
            var pageSize = Math.min(cm.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            y = pos.top + dir * (pageSize - (dir < 0 ? 1.5 : .5) * textHeight(cm.display));
        } else if (unit == "line") {
            y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
        }
        for (;;) {
            var target = coordsChar(cm, x, y);
            if (!target.outside) break;
            if (dir < 0 ? y <= 0 : y >= doc.height) {
                target.hitSide = true;
                break;
            }
            y += dir * 5;
        }
        return target;
    }
    function findWordAt(doc, pos) {
        var line = getLine(doc, pos.line).text;
        var start = pos.ch, end = pos.ch;
        if (line) {
            if ((pos.xRel < 0 || end == line.length) && start) --start; else ++end;
            var startChar = line.charAt(start);
            var check = isWordChar(startChar) ? isWordChar : /\s/.test(startChar) ? function(ch) {
                return /\s/.test(ch);
            } : function(ch) {
                return !/\s/.test(ch) && !isWordChar(ch);
            };
            while (start > 0 && check(line.charAt(start - 1))) --start;
            while (end < line.length && check(line.charAt(end))) ++end;
        }
        return new Range(Pos(pos.line, start), Pos(pos.line, end));
    }
    CodeMirror.prototype = {
        constructor: CodeMirror,
        focus: function() {
            window.focus();
            focusInput(this);
            fastPoll(this);
        },
        setOption: function(option, value) {
            var options = this.options, old = options[option];
            if (options[option] == value && option != "mode") return;
            options[option] = value;
            if (optionHandlers.hasOwnProperty(option)) operation(this, optionHandlers[option])(this, value, old);
        },
        getOption: function(option) {
            return this.options[option];
        },
        getDoc: function() {
            return this.doc;
        },
        addKeyMap: function(map, bottom) {
            this.state.keyMaps[bottom ? "push" : "unshift"](map);
        },
        removeKeyMap: function(map) {
            var maps = this.state.keyMaps;
            for (var i = 0; i < maps.length; ++i) if (maps[i] == map || typeof maps[i] != "string" && maps[i].name == map) {
                maps.splice(i, 1);
                return true;
            }
        },
        addOverlay: methodOp(function(spec, options) {
            var mode = spec.token ? spec : CodeMirror.getMode(this.options, spec);
            if (mode.startState) throw new Error("Overlays may not be stateful.");
            this.state.overlays.push({
                mode: mode,
                modeSpec: spec,
                opaque: options && options.opaque
            });
            this.state.modeGen++;
            regChange(this);
        }),
        removeOverlay: methodOp(function(spec) {
            var overlays = this.state.overlays;
            for (var i = 0; i < overlays.length; ++i) {
                var cur = overlays[i].modeSpec;
                if (cur == spec || typeof spec == "string" && cur.name == spec) {
                    overlays.splice(i, 1);
                    this.state.modeGen++;
                    regChange(this);
                    return;
                }
            }
        }),
        indentLine: methodOp(function(n, dir, aggressive) {
            if (typeof dir != "string" && typeof dir != "number") {
                if (dir == null) dir = this.options.smartIndent ? "smart" : "prev"; else dir = dir ? "add" : "subtract";
            }
            if (isLine(this.doc, n)) indentLine(this, n, dir, aggressive);
        }),
        indentSelection: methodOp(function(how) {
            var ranges = this.doc.sel.ranges, end = -1;
            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[i];
                if (!range.empty()) {
                    var start = Math.max(end, range.from().line);
                    var to = range.to();
                    end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
                    for (var j = start; j < end; ++j) indentLine(this, j, how);
                } else if (range.head.line > end) {
                    indentLine(this, range.head.line, how, true);
                    end = range.head.line;
                    if (i == this.doc.sel.primIndex) ensureCursorVisible(this);
                }
            }
        }),
        getTokenAt: function(pos, precise) {
            var doc = this.doc;
            pos = clipPos(doc, pos);
            var state = getStateBefore(this, pos.line, precise), mode = this.doc.mode;
            var line = getLine(doc, pos.line);
            var stream = new StringStream(line.text, this.options.tabSize);
            while (stream.pos < pos.ch && !stream.eol()) {
                stream.start = stream.pos;
                var style = mode.token(stream, state);
            }
            return {
                start: stream.start,
                end: stream.pos,
                string: stream.current(),
                type: style || null,
                state: state
            };
        },
        getTokenTypeAt: function(pos) {
            pos = clipPos(this.doc, pos);
            var styles = getLineStyles(this, getLine(this.doc, pos.line));
            var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
            if (ch == 0) return styles[2];
            for (;;) {
                var mid = before + after >> 1;
                if ((mid ? styles[mid * 2 - 1] : 0) >= ch) after = mid; else if (styles[mid * 2 + 1] < ch) before = mid + 1; else return styles[mid * 2 + 2];
            }
        },
        getModeAt: function(pos) {
            var mode = this.doc.mode;
            if (!mode.innerMode) return mode;
            return CodeMirror.innerMode(mode, this.getTokenAt(pos).state).mode;
        },
        getHelper: function(pos, type) {
            return this.getHelpers(pos, type)[0];
        },
        getHelpers: function(pos, type) {
            var found = [];
            if (!helpers.hasOwnProperty(type)) return helpers;
            var help = helpers[type], mode = this.getModeAt(pos);
            if (typeof mode[type] == "string") {
                if (help[mode[type]]) found.push(help[mode[type]]);
            } else if (mode[type]) {
                for (var i = 0; i < mode[type].length; i++) {
                    var val = help[mode[type][i]];
                    if (val) found.push(val);
                }
            } else if (mode.helperType && help[mode.helperType]) {
                found.push(help[mode.helperType]);
            } else if (help[mode.name]) {
                found.push(help[mode.name]);
            }
            for (var i = 0; i < help._global.length; i++) {
                var cur = help._global[i];
                if (cur.pred(mode, this) && indexOf(found, cur.val) == -1) found.push(cur.val);
            }
            return found;
        },
        getStateAfter: function(line, precise) {
            var doc = this.doc;
            line = clipLine(doc, line == null ? doc.first + doc.size - 1 : line);
            return getStateBefore(this, line + 1, precise);
        },
        cursorCoords: function(start, mode) {
            var pos, range = this.doc.sel.primary();
            if (start == null) pos = range.head; else if (typeof start == "object") pos = clipPos(this.doc, start); else pos = start ? range.from() : range.to();
            return cursorCoords(this, pos, mode || "page");
        },
        charCoords: function(pos, mode) {
            return charCoords(this, clipPos(this.doc, pos), mode || "page");
        },
        coordsChar: function(coords, mode) {
            coords = fromCoordSystem(this, coords, mode || "page");
            return coordsChar(this, coords.left, coords.top);
        },
        lineAtHeight: function(height, mode) {
            height = fromCoordSystem(this, {
                top: height,
                left: 0
            }, mode || "page").top;
            return lineAtHeight(this.doc, height + this.display.viewOffset);
        },
        heightAtLine: function(line, mode) {
            var end = false, last = this.doc.first + this.doc.size - 1;
            if (line < this.doc.first) line = this.doc.first; else if (line > last) {
                line = last;
                end = true;
            }
            var lineObj = getLine(this.doc, line);
            return intoCoordSystem(this, getLine(this.doc, line), {
                top: 0,
                left: 0
            }, mode || "page").top + (end ? lineObj.height : 0);
        },
        defaultTextHeight: function() {
            return textHeight(this.display);
        },
        defaultCharWidth: function() {
            return charWidth(this.display);
        },
        setGutterMarker: methodOp(function(line, gutterID, value) {
            return changeLine(this, line, "gutter", function(line) {
                var markers = line.gutterMarkers || (line.gutterMarkers = {});
                markers[gutterID] = value;
                if (!value && isEmpty(markers)) line.gutterMarkers = null;
                return true;
            });
        }),
        clearGutter: methodOp(function(gutterID) {
            var cm = this, doc = cm.doc, i = doc.first;
            doc.iter(function(line) {
                if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
                    line.gutterMarkers[gutterID] = null;
                    regLineChange(cm, i, "gutter");
                    if (isEmpty(line.gutterMarkers)) line.gutterMarkers = null;
                }
                ++i;
            });
        }),
        addLineClass: methodOp(function(handle, where, cls) {
            return changeLine(this, handle, "class", function(line) {
                var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : "wrapClass";
                if (!line[prop]) line[prop] = cls; else if (new RegExp("(?:^|\\s)" + cls + "(?:$|\\s)").test(line[prop])) return false; else line[prop] += " " + cls;
                return true;
            });
        }),
        removeLineClass: methodOp(function(handle, where, cls) {
            return changeLine(this, handle, "class", function(line) {
                var prop = where == "text" ? "textClass" : where == "background" ? "bgClass" : "wrapClass";
                var cur = line[prop];
                if (!cur) return false; else if (cls == null) line[prop] = null; else {
                    var found = cur.match(new RegExp("(?:^|\\s+)" + cls + "(?:$|\\s+)"));
                    if (!found) return false;
                    var end = found.index + found[0].length;
                    line[prop] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
                }
                return true;
            });
        }),
        addLineWidget: methodOp(function(handle, node, options) {
            return addLineWidget(this, handle, node, options);
        }),
        removeLineWidget: function(widget) {
            widget.clear();
        },
        lineInfo: function(line) {
            if (typeof line == "number") {
                if (!isLine(this.doc, line)) return null;
                var n = line;
                line = getLine(this.doc, line);
                if (!line) return null;
            } else {
                var n = lineNo(line);
                if (n == null) return null;
            }
            return {
                line: n,
                handle: line,
                text: line.text,
                gutterMarkers: line.gutterMarkers,
                textClass: line.textClass,
                bgClass: line.bgClass,
                wrapClass: line.wrapClass,
                widgets: line.widgets
            };
        },
        getViewport: function() {
            return {
                from: this.display.viewFrom,
                to: this.display.viewTo
            };
        },
        addWidget: function(pos, node, scroll, vert, horiz) {
            var display = this.display;
            pos = cursorCoords(this, clipPos(this.doc, pos));
            var top = pos.bottom, left = pos.left;
            node.style.position = "absolute";
            display.sizer.appendChild(node);
            if (vert == "over") {
                top = pos.top;
            } else if (vert == "above" || vert == "near") {
                var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
                if ((vert == "above" || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) top = pos.top - node.offsetHeight; else if (pos.bottom + node.offsetHeight <= vspace) top = pos.bottom;
                if (left + node.offsetWidth > hspace) left = hspace - node.offsetWidth;
            }
            node.style.top = top + "px";
            node.style.left = node.style.right = "";
            if (horiz == "right") {
                left = display.sizer.clientWidth - node.offsetWidth;
                node.style.right = "0px";
            } else {
                if (horiz == "left") left = 0; else if (horiz == "middle") left = (display.sizer.clientWidth - node.offsetWidth) / 2;
                node.style.left = left + "px";
            }
            if (scroll) scrollIntoView(this, left, top, left + node.offsetWidth, top + node.offsetHeight);
        },
        triggerOnKeyDown: methodOp(onKeyDown),
        triggerOnKeyPress: methodOp(onKeyPress),
        triggerOnKeyUp: methodOp(onKeyUp),
        execCommand: function(cmd) {
            if (commands.hasOwnProperty(cmd)) return commands[cmd](this);
        },
        findPosH: function(from, amount, unit, visually) {
            var dir = 1;
            if (amount < 0) {
                dir = -1;
                amount = -amount;
            }
            for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
                cur = findPosH(this.doc, cur, dir, unit, visually);
                if (cur.hitSide) break;
            }
            return cur;
        },
        moveH: methodOp(function(dir, unit) {
            var cm = this;
            cm.extendSelectionsBy(function(range) {
                if (cm.display.shift || cm.doc.extend || range.empty()) return findPosH(cm.doc, range.head, dir, unit, cm.options.rtlMoveVisually); else return dir < 0 ? range.from() : range.to();
            }, sel_move);
        }),
        deleteH: methodOp(function(dir, unit) {
            var sel = this.doc.sel, doc = this.doc;
            if (sel.somethingSelected()) doc.replaceSelection("", null, "+delete"); else deleteNearSelection(this, function(range) {
                var other = findPosH(doc, range.head, dir, unit, false);
                return dir < 0 ? {
                    from: other,
                    to: range.head
                } : {
                    from: range.head,
                    to: other
                };
            });
        }),
        findPosV: function(from, amount, unit, goalColumn) {
            var dir = 1, x = goalColumn;
            if (amount < 0) {
                dir = -1;
                amount = -amount;
            }
            for (var i = 0, cur = clipPos(this.doc, from); i < amount; ++i) {
                var coords = cursorCoords(this, cur, "div");
                if (x == null) x = coords.left; else coords.left = x;
                cur = findPosV(this, coords, dir, unit);
                if (cur.hitSide) break;
            }
            return cur;
        },
        moveV: methodOp(function(dir, unit) {
            var cm = this, doc = this.doc, goals = [];
            var collapse = !cm.display.shift && !doc.sel.extend && doc.sel.somethingSelected();
            doc.extendSelectionsBy(function(range) {
                if (collapse) return dir < 0 ? range.from() : range.to();
                var headPos = cursorCoords(cm, range.head, "div");
                if (range.goalColumn != null) headPos.left = range.goalColumn;
                goals.push(headPos.left);
                var pos = findPosV(cm, headPos, dir, unit);
                if (unit == "page" && range == doc.sel.primary()) addToScrollPos(cm, null, charCoords(cm, pos, "div").top - headPos.top);
                return pos;
            }, sel_move);
            if (goals.length) for (var i = 0; i < doc.sel.ranges.length; i++) doc.sel.ranges[i].goalColumn = goals[i];
        }),
        toggleOverwrite: function(value) {
            if (value != null && value == this.state.overwrite) return;
            if (this.state.overwrite = !this.state.overwrite) this.display.cursorDiv.className += " CodeMirror-overwrite"; else this.display.cursorDiv.className = this.display.cursorDiv.className.replace(" CodeMirror-overwrite", "");
            signal(this, "overwriteToggle", this, this.state.overwrite);
        },
        hasFocus: function() {
            return activeElt() == this.display.input;
        },
        scrollTo: methodOp(function(x, y) {
            if (x != null || y != null) resolveScrollToPos(this);
            if (x != null) this.curOp.scrollLeft = x;
            if (y != null) this.curOp.scrollTop = y;
        }),
        getScrollInfo: function() {
            var scroller = this.display.scroller, co = scrollerCutOff;
            return {
                left: scroller.scrollLeft,
                top: scroller.scrollTop,
                height: scroller.scrollHeight - co,
                width: scroller.scrollWidth - co,
                clientHeight: scroller.clientHeight - co,
                clientWidth: scroller.clientWidth - co
            };
        },
        scrollIntoView: methodOp(function(range, margin) {
            if (range == null) range = {
                from: this.doc.sel.primary().head,
                to: null
            }; else if (typeof range == "number") range = {
                from: Pos(range, 0),
                to: null
            }; else if (range.from == null) range = {
                from: range,
                to: null
            };
            if (!range.to) range.to = range.from;
            range.margin = margin || 0;
            if (range.from.line != null) {
                resolveScrollToPos(this);
                this.curOp.scrollToPos = range;
            } else {
                var sPos = calculateScrollPos(this, Math.min(range.from.left, range.to.left), Math.min(range.from.top, range.to.top) - range.margin, Math.max(range.from.right, range.to.right), Math.max(range.from.bottom, range.to.bottom) + range.margin);
                this.scrollTo(sPos.scrollLeft, sPos.scrollTop);
            }
        }),
        setSize: methodOp(function(width, height) {
            function interpret(val) {
                return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
            }
            if (width != null) this.display.wrapper.style.width = interpret(width);
            if (height != null) this.display.wrapper.style.height = interpret(height);
            if (this.options.lineWrapping) clearLineMeasurementCache(this);
            this.curOp.forceUpdate = true;
            signal(this, "refresh", this);
        }),
        operation: function(f) {
            return runInOp(this, f);
        },
        refresh: methodOp(function() {
            var oldHeight = this.display.cachedTextHeight;
            regChange(this);
            clearCaches(this);
            this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop);
            if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > .5) estimateLineHeights(this);
            signal(this, "refresh", this);
        }),
        swapDoc: methodOp(function(doc) {
            var old = this.doc;
            old.cm = null;
            attachDoc(this, doc);
            clearCaches(this);
            resetInput(this);
            this.scrollTo(doc.scrollLeft, doc.scrollTop);
            signalLater(this, "swapDoc", this, old);
            return old;
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
    eventMixin(CodeMirror);
    var defaults = CodeMirror.defaults = {};
    var optionHandlers = CodeMirror.optionHandlers = {};
    function option(name, deflt, handle, notOnInit) {
        CodeMirror.defaults[name] = deflt;
        if (handle) optionHandlers[name] = notOnInit ? function(cm, val, old) {
            if (old != Init) handle(cm, val, old);
        } : handle;
    }
    var Init = CodeMirror.Init = {
        toString: function() {
            return "CodeMirror.Init";
        }
    };
    option("value", "", function(cm, val) {
        cm.setValue(val);
    }, true);
    option("mode", null, function(cm, val) {
        cm.doc.modeOption = val;
        loadMode(cm);
    }, true);
    option("indentUnit", 2, loadMode, true);
    option("indentWithTabs", false);
    option("smartIndent", true);
    option("tabSize", 4, function(cm) {
        resetModeState(cm);
        clearCaches(cm);
        regChange(cm);
    }, true);
    option("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(cm, val) {
        cm.options.specialChars = new RegExp(val.source + (val.test("	") ? "" : "|	"), "g");
        cm.refresh();
    }, true);
    option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
        cm.refresh();
    }, true);
    option("electricChars", true);
    option("rtlMoveVisually", !windows);
    option("wholeLineUpdateBefore", true);
    option("theme", "default", function(cm) {
        themeChanged(cm);
        guttersChanged(cm);
    }, true);
    option("keyMap", "default", keyMapChanged);
    option("extraKeys", null);
    option("lineWrapping", false, wrappingChanged, true);
    option("gutters", [], function(cm) {
        setGuttersForLineNumbers(cm.options);
        guttersChanged(cm);
    }, true);
    option("fixedGutter", true, function(cm, val) {
        cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
        cm.refresh();
    }, true);
    option("coverGutterNextToScrollbar", false, updateScrollbars, true);
    option("lineNumbers", false, function(cm) {
        setGuttersForLineNumbers(cm.options);
        guttersChanged(cm);
    }, true);
    option("firstLineNumber", 1, guttersChanged, true);
    option("lineNumberFormatter", function(integer) {
        return integer;
    }, guttersChanged, true);
    option("showCursorWhenSelecting", false, updateSelection, true);
    option("resetSelectionOnContextMenu", true);
    option("readOnly", false, function(cm, val) {
        if (val == "nocursor") {
            onBlur(cm);
            cm.display.input.blur();
            cm.display.disabled = true;
        } else {
            cm.display.disabled = false;
            if (!val) resetInput(cm);
        }
    });
    option("disableInput", false, function(cm, val) {
        if (!val) resetInput(cm);
    }, true);
    option("dragDrop", true);
    option("cursorBlinkRate", 530);
    option("cursorScrollMargin", 0);
    option("cursorHeight", 1);
    option("workTime", 100);
    option("workDelay", 100);
    option("flattenSpans", true, resetModeState, true);
    option("addModeClass", false, resetModeState, true);
    option("pollInterval", 100);
    option("undoDepth", 200, function(cm, val) {
        cm.doc.history.undoDepth = val;
    });
    option("historyEventDelay", 1250);
    option("viewportMargin", 10, function(cm) {
        cm.refresh();
    }, true);
    option("maxHighlightLength", 1e4, resetModeState, true);
    option("moveInputWithCursor", true, function(cm, val) {
        if (!val) cm.display.inputDiv.style.top = cm.display.inputDiv.style.left = 0;
    });
    option("tabindex", null, function(cm, val) {
        cm.display.input.tabIndex = val || "";
    });
    option("autofocus", null);
    var modes = CodeMirror.modes = {}, mimeModes = CodeMirror.mimeModes = {};
    CodeMirror.defineMode = function(name, mode) {
        if (!CodeMirror.defaults.mode && name != "null") CodeMirror.defaults.mode = name;
        if (arguments.length > 2) {
            mode.dependencies = [];
            for (var i = 2; i < arguments.length; ++i) mode.dependencies.push(arguments[i]);
        }
        modes[name] = mode;
    };
    CodeMirror.defineMIME = function(mime, spec) {
        mimeModes[mime] = spec;
    };
    CodeMirror.resolveMode = function(spec) {
        if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
            spec = mimeModes[spec];
        } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
            var found = mimeModes[spec.name];
            if (typeof found == "string") found = {
                name: found
            };
            spec = createObj(found, spec);
            spec.name = found.name;
        } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
            return CodeMirror.resolveMode("application/xml");
        }
        if (typeof spec == "string") return {
            name: spec
        }; else return spec || {
            name: "null"
        };
    };
    CodeMirror.getMode = function(options, spec) {
        var spec = CodeMirror.resolveMode(spec);
        var mfactory = modes[spec.name];
        if (!mfactory) return CodeMirror.getMode(options, "text/plain");
        var modeObj = mfactory(options, spec);
        if (modeExtensions.hasOwnProperty(spec.name)) {
            var exts = modeExtensions[spec.name];
            for (var prop in exts) {
                if (!exts.hasOwnProperty(prop)) continue;
                if (modeObj.hasOwnProperty(prop)) modeObj["_" + prop] = modeObj[prop];
                modeObj[prop] = exts[prop];
            }
        }
        modeObj.name = spec.name;
        if (spec.helperType) modeObj.helperType = spec.helperType;
        if (spec.modeProps) for (var prop in spec.modeProps) modeObj[prop] = spec.modeProps[prop];
        return modeObj;
    };
    CodeMirror.defineMode("null", function() {
        return {
            token: function(stream) {
                stream.skipToEnd();
            }
        };
    });
    CodeMirror.defineMIME("text/plain", "null");
    var modeExtensions = CodeMirror.modeExtensions = {};
    CodeMirror.extendMode = function(mode, properties) {
        var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
        copyObj(properties, exts);
    };
    CodeMirror.defineExtension = function(name, func) {
        CodeMirror.prototype[name] = func;
    };
    CodeMirror.defineDocExtension = function(name, func) {
        Doc.prototype[name] = func;
    };
    CodeMirror.defineOption = option;
    var initHooks = [];
    CodeMirror.defineInitHook = function(f) {
        initHooks.push(f);
    };
    var helpers = CodeMirror.helpers = {};
    CodeMirror.registerHelper = function(type, name, value) {
        if (!helpers.hasOwnProperty(type)) helpers[type] = CodeMirror[type] = {
            _global: []
        };
        helpers[type][name] = value;
    };
    CodeMirror.registerGlobalHelper = function(type, name, predicate, value) {
        CodeMirror.registerHelper(type, name, value);
        helpers[type]._global.push({
            pred: predicate,
            val: value
        });
    };
    var copyState = CodeMirror.copyState = function(mode, state) {
        if (state === true) return state;
        if (mode.copyState) return mode.copyState(state);
        var nstate = {};
        for (var n in state) {
            var val = state[n];
            if (val instanceof Array) val = val.concat([]);
            nstate[n] = val;
        }
        return nstate;
    };
    var startState = CodeMirror.startState = function(mode, a1, a2) {
        return mode.startState ? mode.startState(a1, a2) : true;
    };
    CodeMirror.innerMode = function(mode, state) {
        while (mode.innerMode) {
            var info = mode.innerMode(state);
            if (!info || info.mode == mode) break;
            state = info.state;
            mode = info.mode;
        }
        return info || {
            mode: mode,
            state: state
        };
    };
    var commands = CodeMirror.commands = {
        selectAll: function(cm) {
            cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
        },
        singleSelection: function(cm) {
            cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
        },
        killLine: function(cm) {
            deleteNearSelection(cm, function(range) {
                if (range.empty()) {
                    var len = getLine(cm.doc, range.head.line).text.length;
                    if (range.head.ch == len && range.head.line < cm.lastLine()) return {
                        from: range.head,
                        to: Pos(range.head.line + 1, 0)
                    }; else return {
                        from: range.head,
                        to: Pos(range.head.line, len)
                    };
                } else {
                    return {
                        from: range.from(),
                        to: range.to()
                    };
                }
            });
        },
        deleteLine: function(cm) {
            deleteNearSelection(cm, function(range) {
                return {
                    from: Pos(range.from().line, 0),
                    to: clipPos(cm.doc, Pos(range.to().line + 1, 0))
                };
            });
        },
        delLineLeft: function(cm) {
            deleteNearSelection(cm, function(range) {
                return {
                    from: Pos(range.from().line, 0),
                    to: range.from()
                };
            });
        },
        undo: function(cm) {
            cm.undo();
        },
        redo: function(cm) {
            cm.redo();
        },
        undoSelection: function(cm) {
            cm.undoSelection();
        },
        redoSelection: function(cm) {
            cm.redoSelection();
        },
        goDocStart: function(cm) {
            cm.extendSelection(Pos(cm.firstLine(), 0));
        },
        goDocEnd: function(cm) {
            cm.extendSelection(Pos(cm.lastLine()));
        },
        goLineStart: function(cm) {
            cm.extendSelectionsBy(function(range) {
                return lineStart(cm, range.head.line);
            }, sel_move);
        },
        goLineStartSmart: function(cm) {
            cm.extendSelectionsBy(function(range) {
                var start = lineStart(cm, range.head.line);
                var line = cm.getLineHandle(start.line);
                var order = getOrder(line);
                if (!order || order[0].level == 0) {
                    var firstNonWS = Math.max(0, line.text.search(/\S/));
                    var inWS = range.head.line == start.line && range.head.ch <= firstNonWS && range.head.ch;
                    return Pos(start.line, inWS ? 0 : firstNonWS);
                }
                return start;
            }, sel_move);
        },
        goLineEnd: function(cm) {
            cm.extendSelectionsBy(function(range) {
                return lineEnd(cm, range.head.line);
            }, sel_move);
        },
        goLineRight: function(cm) {
            cm.extendSelectionsBy(function(range) {
                var top = cm.charCoords(range.head, "div").top + 5;
                return cm.coordsChar({
                    left: cm.display.lineDiv.offsetWidth + 100,
                    top: top
                }, "div");
            }, sel_move);
        },
        goLineLeft: function(cm) {
            cm.extendSelectionsBy(function(range) {
                var top = cm.charCoords(range.head, "div").top + 5;
                return cm.coordsChar({
                    left: 0,
                    top: top
                }, "div");
            }, sel_move);
        },
        goLineUp: function(cm) {
            cm.moveV(-1, "line");
        },
        goLineDown: function(cm) {
            cm.moveV(1, "line");
        },
        goPageUp: function(cm) {
            cm.moveV(-1, "page");
        },
        goPageDown: function(cm) {
            cm.moveV(1, "page");
        },
        goCharLeft: function(cm) {
            cm.moveH(-1, "char");
        },
        goCharRight: function(cm) {
            cm.moveH(1, "char");
        },
        goColumnLeft: function(cm) {
            cm.moveH(-1, "column");
        },
        goColumnRight: function(cm) {
            cm.moveH(1, "column");
        },
        goWordLeft: function(cm) {
            cm.moveH(-1, "word");
        },
        goGroupRight: function(cm) {
            cm.moveH(1, "group");
        },
        goGroupLeft: function(cm) {
            cm.moveH(-1, "group");
        },
        goWordRight: function(cm) {
            cm.moveH(1, "word");
        },
        delCharBefore: function(cm) {
            cm.deleteH(-1, "char");
        },
        delCharAfter: function(cm) {
            cm.deleteH(1, "char");
        },
        delWordBefore: function(cm) {
            cm.deleteH(-1, "word");
        },
        delWordAfter: function(cm) {
            cm.deleteH(1, "word");
        },
        delGroupBefore: function(cm) {
            cm.deleteH(-1, "group");
        },
        delGroupAfter: function(cm) {
            cm.deleteH(1, "group");
        },
        indentAuto: function(cm) {
            cm.indentSelection("smart");
        },
        indentMore: function(cm) {
            cm.indentSelection("add");
        },
        indentLess: function(cm) {
            cm.indentSelection("subtract");
        },
        insertTab: function(cm) {
            cm.replaceSelection("	");
        },
        defaultTab: function(cm) {
            if (cm.somethingSelected()) cm.indentSelection("add"); else cm.execCommand("insertTab");
        },
        transposeChars: function(cm) {
            runInOp(cm, function() {
                var ranges = cm.listSelections();
                for (var i = 0; i < ranges.length; i++) {
                    var cur = ranges[i].head, line = getLine(cm.doc, cur.line);
                    if (cur.ch > 0 && cur.ch < line.length - 1) cm.replaceRange(line.charAt(cur.ch) + line.charAt(cur.ch - 1), Pos(cur.line, cur.ch - 1), Pos(cur.line, cur.ch + 1));
                }
            });
        },
        newlineAndIndent: function(cm) {
            runInOp(cm, function() {
                var len = cm.listSelections().length;
                for (var i = 0; i < len; i++) {
                    var range = cm.listSelections()[i];
                    cm.replaceRange("\n", range.anchor, range.head, "+input");
                    cm.indentLine(range.from().line + 1, null, true);
                    ensureCursorVisible(cm);
                }
            });
        },
        toggleOverwrite: function(cm) {
            cm.toggleOverwrite();
        }
    };
    var keyMap = CodeMirror.keyMap = {};
    keyMap.basic = {
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
    keyMap.pcDefault = {
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
    keyMap.macDefault = {
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
    keyMap.emacsy = {
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
    keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
    function getKeyMap(val) {
        if (typeof val == "string") return keyMap[val]; else return val;
    }
    var lookupKey = CodeMirror.lookupKey = function(name, maps, handle) {
        function lookup(map) {
            map = getKeyMap(map);
            var found = map[name];
            if (found === false) return "stop";
            if (found != null && handle(found)) return true;
            if (map.nofallthrough) return "stop";
            var fallthrough = map.fallthrough;
            if (fallthrough == null) return false;
            if (Object.prototype.toString.call(fallthrough) != "[object Array]") return lookup(fallthrough);
            for (var i = 0; i < fallthrough.length; ++i) {
                var done = lookup(fallthrough[i]);
                if (done) return done;
            }
            return false;
        }
        for (var i = 0; i < maps.length; ++i) {
            var done = lookup(maps[i]);
            if (done) return done != "stop";
        }
    };
    var isModifierKey = CodeMirror.isModifierKey = function(event) {
        var name = keyNames[event.keyCode];
        return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
    };
    var keyName = CodeMirror.keyName = function(event, noShift) {
        if (presto && event.keyCode == 34 && event["char"]) return false;
        var name = keyNames[event.keyCode];
        if (name == null || event.altGraphKey) return false;
        if (event.altKey) name = "Alt-" + name;
        if (flipCtrlCmd ? event.metaKey : event.ctrlKey) name = "Ctrl-" + name;
        if (flipCtrlCmd ? event.ctrlKey : event.metaKey) name = "Cmd-" + name;
        if (!noShift && event.shiftKey) name = "Shift-" + name;
        return name;
    };
    CodeMirror.fromTextArea = function(textarea, options) {
        if (!options) options = {};
        options.value = textarea.value;
        if (!options.tabindex && textarea.tabindex) options.tabindex = textarea.tabindex;
        if (!options.placeholder && textarea.placeholder) options.placeholder = textarea.placeholder;
        if (options.autofocus == null) {
            var hasFocus = activeElt();
            options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
        }
        function save() {
            textarea.value = cm.getValue();
        }
        if (textarea.form) {
            on(textarea.form, "submit", save);
            if (!options.leaveSubmitMethodAlone) {
                var form = textarea.form, realSubmit = form.submit;
                try {
                    var wrappedSubmit = form.submit = function() {
                        save();
                        form.submit = realSubmit;
                        form.submit();
                        form.submit = wrappedSubmit;
                    };
                } catch (e) {}
            }
        }
        textarea.style.display = "none";
        var cm = CodeMirror(function(node) {
            textarea.parentNode.insertBefore(node, textarea.nextSibling);
        }, options);
        cm.save = save;
        cm.getTextArea = function() {
            return textarea;
        };
        cm.toTextArea = function() {
            save();
            textarea.parentNode.removeChild(cm.getWrapperElement());
            textarea.style.display = "";
            if (textarea.form) {
                off(textarea.form, "submit", save);
                if (typeof textarea.form.submit == "function") textarea.form.submit = realSubmit;
            }
        };
        return cm;
    };
    var StringStream = CodeMirror.StringStream = function(string, tabSize) {
        this.pos = this.start = 0;
        this.string = string;
        this.tabSize = tabSize || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0;
    };
    StringStream.prototype = {
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
        eat: function(match) {
            var ch = this.string.charAt(this.pos);
            if (typeof match == "string") var ok = ch == match; else var ok = ch && (match.test ? match.test(ch) : match(ch));
            if (ok) {
                ++this.pos;
                return ch;
            }
        },
        eatWhile: function(match) {
            var start = this.pos;
            while (this.eat(match)) {}
            return this.pos > start;
        },
        eatSpace: function() {
            var start = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
            return this.pos > start;
        },
        skipToEnd: function() {
            this.pos = this.string.length;
        },
        skipTo: function(ch) {
            var found = this.string.indexOf(ch, this.pos);
            if (found > -1) {
                this.pos = found;
                return true;
            }
        },
        backUp: function(n) {
            this.pos -= n;
        },
        column: function() {
            if (this.lastColumnPos < this.start) {
                this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
                this.lastColumnPos = this.start;
            }
            return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
        },
        indentation: function() {
            return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
        },
        match: function(pattern, consume, caseInsensitive) {
            if (typeof pattern == "string") {
                var cased = function(str) {
                    return caseInsensitive ? str.toLowerCase() : str;
                };
                var substr = this.string.substr(this.pos, pattern.length);
                if (cased(substr) == cased(pattern)) {
                    if (consume !== false) this.pos += pattern.length;
                    return true;
                }
            } else {
                var match = this.string.slice(this.pos).match(pattern);
                if (match && match.index > 0) return null;
                if (match && consume !== false) this.pos += match[0].length;
                return match;
            }
        },
        current: function() {
            return this.string.slice(this.start, this.pos);
        },
        hideFirstChars: function(n, inner) {
            this.lineStart += n;
            try {
                return inner();
            } finally {
                this.lineStart -= n;
            }
        }
    };
    var TextMarker = CodeMirror.TextMarker = function(doc, type) {
        this.lines = [];
        this.type = type;
        this.doc = doc;
    };
    eventMixin(TextMarker);
    TextMarker.prototype.clear = function() {
        if (this.explicitlyCleared) return;
        var cm = this.doc.cm, withOp = cm && !cm.curOp;
        if (withOp) startOperation(cm);
        if (hasHandler(this, "clear")) {
            var found = this.find();
            if (found) signalLater(this, "clear", found.from, found.to);
        }
        var min = null, max = null;
        for (var i = 0; i < this.lines.length; ++i) {
            var line = this.lines[i];
            var span = getMarkedSpanFor(line.markedSpans, this);
            if (cm && !this.collapsed) regLineChange(cm, lineNo(line), "text"); else if (cm) {
                if (span.to != null) max = lineNo(line);
                if (span.from != null) min = lineNo(line);
            }
            line.markedSpans = removeMarkedSpan(line.markedSpans, span);
            if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm) updateLineHeight(line, textHeight(cm.display));
        }
        if (cm && this.collapsed && !cm.options.lineWrapping) for (var i = 0; i < this.lines.length; ++i) {
            var visual = visualLine(this.lines[i]), len = lineLength(visual);
            if (len > cm.display.maxLineLength) {
                cm.display.maxLine = visual;
                cm.display.maxLineLength = len;
                cm.display.maxLineChanged = true;
            }
        }
        if (min != null && cm && this.collapsed) regChange(cm, min, max + 1);
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
            this.doc.cantEdit = false;
            if (cm) reCheckSelection(cm.doc);
        }
        signalLater(cm, "markerCleared", cm, this);
        if (withOp) endOperation(cm);
    };
    TextMarker.prototype.find = function(side, lineObj) {
        if (side == null && this.type == "bookmark") side = 1;
        var from, to;
        for (var i = 0; i < this.lines.length; ++i) {
            var line = this.lines[i];
            var span = getMarkedSpanFor(line.markedSpans, this);
            if (span.from != null) {
                from = Pos(lineObj ? line : lineNo(line), span.from);
                if (side == -1) return from;
            }
            if (span.to != null) {
                to = Pos(lineObj ? line : lineNo(line), span.to);
                if (side == 1) return to;
            }
        }
        return from && {
            from: from,
            to: to
        };
    };
    TextMarker.prototype.changed = function() {
        var pos = this.find(-1, true), cm = this.doc.cm;
        if (!pos || !cm) return;
        var line = pos.line, lineN = lineNo(pos.line);
        var view = findViewForLine(cm, lineN);
        if (view) clearLineMeasurementCacheFor(view);
        if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
            var lineView = cm.display.view[findViewIndex(cm, lineN)];
            if (!lineView.hidden && lineView.node && lineView.node.offsetHeight != line.height) updateLineHeight(line, lineView.node.offsetHeight);
            runInOp(cm, function() {
                cm.curOp.selectionChanged = cm.curOp.forceUpdate = cm.curOp.updateMaxLine = true;
            });
        }
    };
    TextMarker.prototype.attachLine = function(line) {
        if (!this.lines.length && this.doc.cm) {
            var op = this.doc.cm.curOp;
            if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
        }
        this.lines.push(line);
    };
    TextMarker.prototype.detachLine = function(line) {
        this.lines.splice(indexOf(this.lines, line), 1);
        if (!this.lines.length && this.doc.cm) {
            var op = this.doc.cm.curOp;
            (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
        }
    };
    var nextMarkerId = 0;
    function markText(doc, from, to, options, type) {
        if (options && options.shared) return markTextShared(doc, from, to, options, type);
        if (doc.cm && !doc.cm.curOp) return operation(doc.cm, markText)(doc, from, to, options, type);
        var marker = new TextMarker(doc, type), diff = cmp(from, to);
        if (options) copyObj(options, marker);
        if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) return marker;
        if (marker.replacedWith) {
            marker.collapsed = true;
            marker.widgetNode = elt("span", [ marker.replacedWith ], "CodeMirror-widget");
            if (!options.handleMouseEvents) marker.widgetNode.ignoreEvents = true;
            if (options.insertLeft) marker.widgetNode.insertLeft = true;
        }
        if (marker.collapsed) {
            if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker)) throw new Error("Inserting collapsed marker partially overlapping an existing one");
            sawCollapsedSpans = true;
        }
        if (marker.addToHistory) addChangeToHistory(doc, {
            from: from,
            to: to,
            origin: "markText"
        }, doc.sel, NaN);
        var curLine = from.line, cm = doc.cm, updateMaxLine;
        doc.iter(curLine, to.line + 1, function(line) {
            if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) updateMaxLine = true;
            if (marker.collapsed && curLine != from.line) updateLineHeight(line, 0);
            addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch : null, curLine == to.line ? to.ch : null));
            ++curLine;
        });
        if (marker.collapsed) doc.iter(from.line, to.line + 1, function(line) {
            if (lineIsHidden(doc, line)) updateLineHeight(line, 0);
        });
        if (marker.clearOnEnter) on(marker, "beforeCursorEnter", function() {
            marker.clear();
        });
        if (marker.readOnly) {
            sawReadOnlySpans = true;
            if (doc.history.done.length || doc.history.undone.length) doc.clearHistory();
        }
        if (marker.collapsed) {
            marker.id = ++nextMarkerId;
            marker.atomic = true;
        }
        if (cm) {
            if (updateMaxLine) cm.curOp.updateMaxLine = true;
            if (marker.collapsed) regChange(cm, from.line, to.line + 1); else if (marker.className || marker.title || marker.startStyle || marker.endStyle) for (var i = from.line; i <= to.line; i++) regLineChange(cm, i, "text");
            if (marker.atomic) reCheckSelection(cm.doc);
        }
        signalLater(cm, "markerAdded", cm, marker);
        return marker;
    }
    var SharedTextMarker = CodeMirror.SharedTextMarker = function(markers, primary) {
        this.markers = markers;
        this.primary = primary;
        for (var i = 0, me = this; i < markers.length; ++i) {
            markers[i].parent = this;
            on(markers[i], "clear", function() {
                me.clear();
            });
        }
    };
    eventMixin(SharedTextMarker);
    SharedTextMarker.prototype.clear = function() {
        if (this.explicitlyCleared) return;
        this.explicitlyCleared = true;
        for (var i = 0; i < this.markers.length; ++i) this.markers[i].clear();
        signalLater(this, "clear");
    };
    SharedTextMarker.prototype.find = function(side, lineObj) {
        return this.primary.find(side, lineObj);
    };
    function markTextShared(doc, from, to, options, type) {
        options = copyObj(options);
        options.shared = false;
        var markers = [ markText(doc, from, to, options, type) ], primary = markers[0];
        var widget = options.widgetNode;
        linkedDocs(doc, function(doc) {
            if (widget) options.widgetNode = widget.cloneNode(true);
            markers.push(markText(doc, clipPos(doc, from), clipPos(doc, to), options, type));
            for (var i = 0; i < doc.linked.length; ++i) if (doc.linked[i].isParent) return;
            primary = lst(markers);
        });
        return new SharedTextMarker(markers, primary);
    }
    function MarkedSpan(marker, from, to) {
        this.marker = marker;
        this.from = from;
        this.to = to;
    }
    function getMarkedSpanFor(spans, marker) {
        if (spans) for (var i = 0; i < spans.length; ++i) {
            var span = spans[i];
            if (span.marker == marker) return span;
        }
    }
    function removeMarkedSpan(spans, span) {
        for (var r, i = 0; i < spans.length; ++i) if (spans[i] != span) (r || (r = [])).push(spans[i]);
        return r;
    }
    function addMarkedSpan(line, span) {
        line.markedSpans = line.markedSpans ? line.markedSpans.concat([ span ]) : [ span ];
        span.marker.attachLine(line);
    }
    function markedSpansBefore(old, startCh, isInsert) {
        if (old) for (var i = 0, nw; i < old.length; ++i) {
            var span = old[i], marker = span.marker;
            var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
            if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
                var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
                (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
            }
        }
        return nw;
    }
    function markedSpansAfter(old, endCh, isInsert) {
        if (old) for (var i = 0, nw; i < old.length; ++i) {
            var span = old[i], marker = span.marker;
            var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
            if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
                var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
                (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh, span.to == null ? null : span.to - endCh));
            }
        }
        return nw;
    }
    function stretchSpansOverChange(doc, change) {
        var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
        var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
        if (!oldFirst && !oldLast) return null;
        var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
        var first = markedSpansBefore(oldFirst, startCh, isInsert);
        var last = markedSpansAfter(oldLast, endCh, isInsert);
        var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
        if (first) {
            for (var i = 0; i < first.length; ++i) {
                var span = first[i];
                if (span.to == null) {
                    var found = getMarkedSpanFor(last, span.marker);
                    if (!found) span.to = startCh; else if (sameLine) span.to = found.to == null ? null : found.to + offset;
                }
            }
        }
        if (last) {
            for (var i = 0; i < last.length; ++i) {
                var span = last[i];
                if (span.to != null) span.to += offset;
                if (span.from == null) {
                    var found = getMarkedSpanFor(first, span.marker);
                    if (!found) {
                        span.from = offset;
                        if (sameLine) (first || (first = [])).push(span);
                    }
                } else {
                    span.from += offset;
                    if (sameLine) (first || (first = [])).push(span);
                }
            }
        }
        if (first) first = clearEmptySpans(first);
        if (last && last != first) last = clearEmptySpans(last);
        var newMarkers = [ first ];
        if (!sameLine) {
            var gap = change.text.length - 2, gapMarkers;
            if (gap > 0 && first) for (var i = 0; i < first.length; ++i) if (first[i].to == null) (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i].marker, null, null));
            for (var i = 0; i < gap; ++i) newMarkers.push(gapMarkers);
            newMarkers.push(last);
        }
        return newMarkers;
    }
    function clearEmptySpans(spans) {
        for (var i = 0; i < spans.length; ++i) {
            var span = spans[i];
            if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) spans.splice(i--, 1);
        }
        if (!spans.length) return null;
        return spans;
    }
    function mergeOldSpans(doc, change) {
        var old = getOldSpans(doc, change);
        var stretched = stretchSpansOverChange(doc, change);
        if (!old) return stretched;
        if (!stretched) return old;
        for (var i = 0; i < old.length; ++i) {
            var oldCur = old[i], stretchCur = stretched[i];
            if (oldCur && stretchCur) {
                spans: for (var j = 0; j < stretchCur.length; ++j) {
                    var span = stretchCur[j];
                    for (var k = 0; k < oldCur.length; ++k) if (oldCur[k].marker == span.marker) continue spans;
                    oldCur.push(span);
                }
            } else if (stretchCur) {
                old[i] = stretchCur;
            }
        }
        return old;
    }
    function removeReadOnlyRanges(doc, from, to) {
        var markers = null;
        doc.iter(from.line, to.line + 1, function(line) {
            if (line.markedSpans) for (var i = 0; i < line.markedSpans.length; ++i) {
                var mark = line.markedSpans[i].marker;
                if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) (markers || (markers = [])).push(mark);
            }
        });
        if (!markers) return null;
        var parts = [ {
            from: from,
            to: to
        } ];
        for (var i = 0; i < markers.length; ++i) {
            var mk = markers[i], m = mk.find(0);
            for (var j = 0; j < parts.length; ++j) {
                var p = parts[j];
                if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) continue;
                var newParts = [ j, 1 ], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
                if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) newParts.push({
                    from: p.from,
                    to: m.from
                });
                if (dto > 0 || !mk.inclusiveRight && !dto) newParts.push({
                    from: m.to,
                    to: p.to
                });
                parts.splice.apply(parts, newParts);
                j += newParts.length - 1;
            }
        }
        return parts;
    }
    function detachMarkedSpans(line) {
        var spans = line.markedSpans;
        if (!spans) return;
        for (var i = 0; i < spans.length; ++i) spans[i].marker.detachLine(line);
        line.markedSpans = null;
    }
    function attachMarkedSpans(line, spans) {
        if (!spans) return;
        for (var i = 0; i < spans.length; ++i) spans[i].marker.attachLine(line);
        line.markedSpans = spans;
    }
    function extraLeft(marker) {
        return marker.inclusiveLeft ? -1 : 0;
    }
    function extraRight(marker) {
        return marker.inclusiveRight ? 1 : 0;
    }
    function compareCollapsedMarkers(a, b) {
        var lenDiff = a.lines.length - b.lines.length;
        if (lenDiff != 0) return lenDiff;
        var aPos = a.find(), bPos = b.find();
        var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
        if (fromCmp) return -fromCmp;
        var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
        if (toCmp) return toCmp;
        return b.id - a.id;
    }
    function collapsedSpanAtSide(line, start) {
        var sps = sawCollapsedSpans && line.markedSpans, found;
        if (sps) for (var sp, i = 0; i < sps.length; ++i) {
            sp = sps[i];
            if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) found = sp.marker;
        }
        return found;
    }
    function collapsedSpanAtStart(line) {
        return collapsedSpanAtSide(line, true);
    }
    function collapsedSpanAtEnd(line) {
        return collapsedSpanAtSide(line, false);
    }
    function conflictingCollapsedRange(doc, lineNo, from, to, marker) {
        var line = getLine(doc, lineNo);
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) for (var i = 0; i < sps.length; ++i) {
            var sp = sps[i];
            if (!sp.marker.collapsed) continue;
            var found = sp.marker.find(0);
            var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
            var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
            if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) continue;
            if (fromCmp <= 0 && (cmp(found.to, from) || extraRight(sp.marker) - extraLeft(marker)) > 0 || fromCmp >= 0 && (cmp(found.from, to) || extraLeft(sp.marker) - extraRight(marker)) < 0) return true;
        }
    }
    function visualLine(line) {
        var merged;
        while (merged = collapsedSpanAtStart(line)) line = merged.find(-1, true).line;
        return line;
    }
    function visualLineContinued(line) {
        var merged, lines;
        while (merged = collapsedSpanAtEnd(line)) {
            line = merged.find(1, true).line;
            (lines || (lines = [])).push(line);
        }
        return lines;
    }
    function visualLineNo(doc, lineN) {
        var line = getLine(doc, lineN), vis = visualLine(line);
        if (line == vis) return lineN;
        return lineNo(vis);
    }
    function visualLineEndNo(doc, lineN) {
        if (lineN > doc.lastLine()) return lineN;
        var line = getLine(doc, lineN), merged;
        if (!lineIsHidden(doc, line)) return lineN;
        while (merged = collapsedSpanAtEnd(line)) line = merged.find(1, true).line;
        return lineNo(line) + 1;
    }
    function lineIsHidden(doc, line) {
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) for (var sp, i = 0; i < sps.length; ++i) {
            sp = sps[i];
            if (!sp.marker.collapsed) continue;
            if (sp.from == null) return true;
            if (sp.marker.widgetNode) continue;
            if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) return true;
        }
    }
    function lineIsHiddenInner(doc, line, span) {
        if (span.to == null) {
            var end = span.marker.find(1, true);
            return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
        }
        if (span.marker.inclusiveRight && span.to == line.text.length) return true;
        for (var sp, i = 0; i < line.markedSpans.length; ++i) {
            sp = line.markedSpans[i];
            if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) return true;
        }
    }
    var LineWidget = CodeMirror.LineWidget = function(cm, node, options) {
        if (options) for (var opt in options) if (options.hasOwnProperty(opt)) this[opt] = options[opt];
        this.cm = cm;
        this.node = node;
    };
    eventMixin(LineWidget);
    LineWidget.prototype.clear = function() {
        var cm = this.cm, ws = this.line.widgets, no = lineNo(this.line);
        if (no == null || !ws) return;
        for (var i = 0; i < ws.length; ++i) if (ws[i] == this) ws.splice(i--, 1);
        if (!ws.length) this.line.widgets = null;
        var aboveVisible = heightAtLine(this.line) < cm.doc.scrollTop;
        updateLineHeight(this.line, Math.max(0, this.line.height - widgetHeight(this)));
        if (aboveVisible) addToScrollPos(cm, null, -this.height);
        runInOp(cm, function() {
            regLineChange(cm, no, "widget");
        });
    };
    LineWidget.prototype.changed = function() {
        var oldH = this.height, cm = this.cm;
        this.height = null;
        var diff = widgetHeight(this) - oldH;
        if (!diff) return;
        updateLineHeight(this.line, this.line.height + diff);
        var no = lineNo(this.line);
        runInOp(cm, function() {
            regLineChange(cm, no, "widget");
        });
    };
    function widgetHeight(widget) {
        if (widget.height != null) return widget.height;
        if (!widget.node.parentNode || widget.node.parentNode.nodeType != 1) removeChildrenAndAdd(widget.cm.display.measure, elt("div", [ widget.node ], null, "position: relative"));
        return widget.height = widget.node.offsetHeight;
    }
    function addLineWidget(cm, handle, node, options) {
        var widget = new LineWidget(cm, node, options);
        if (widget.noHScroll) cm.display.alignWidgets = true;
        changeLine(cm, handle, "widget", function(line) {
            var widgets = line.widgets || (line.widgets = []);
            if (widget.insertAt == null) widgets.push(widget); else widgets.splice(Math.min(widgets.length - 1, Math.max(0, widget.insertAt)), 0, widget);
            widget.line = line;
            if (!lineIsHidden(cm.doc, line) || widget.showIfHidden) {
                var aboveVisible = heightAtLine(line) < cm.doc.scrollTop;
                updateLineHeight(line, line.height + widgetHeight(widget));
                if (aboveVisible) addToScrollPos(cm, null, widget.height);
                cm.curOp.forceUpdate = true;
            }
            return true;
        });
        return widget;
    }
    var Line = CodeMirror.Line = function(text, markedSpans, estimateHeight) {
        this.text = text;
        attachMarkedSpans(this, markedSpans);
        this.height = estimateHeight ? estimateHeight(this) : 1;
    };
    eventMixin(Line);
    Line.prototype.lineNo = function() {
        return lineNo(this);
    };
    function updateLine(line, text, markedSpans, estimateHeight) {
        line.text = text;
        if (line.stateAfter) line.stateAfter = null;
        if (line.styles) line.styles = null;
        if (line.order != null) line.order = null;
        detachMarkedSpans(line);
        attachMarkedSpans(line, markedSpans);
        var estHeight = estimateHeight ? estimateHeight(line) : 1;
        if (estHeight != line.height) updateLineHeight(line, estHeight);
    }
    function cleanUpLine(line) {
        line.parent = null;
        detachMarkedSpans(line);
    }
    function runMode(cm, text, mode, state, f, forceToEnd) {
        var flattenSpans = mode.flattenSpans;
        if (flattenSpans == null) flattenSpans = cm.options.flattenSpans;
        var curStart = 0, curStyle = null;
        var stream = new StringStream(text, cm.options.tabSize), style;
        if (text == "" && mode.blankLine) mode.blankLine(state);
        while (!stream.eol()) {
            if (stream.pos > cm.options.maxHighlightLength) {
                flattenSpans = false;
                if (forceToEnd) processLine(cm, text, state, stream.pos);
                stream.pos = text.length;
                style = null;
            } else {
                style = mode.token(stream, state);
            }
            if (cm.options.addModeClass) {
                var mName = CodeMirror.innerMode(mode, state).mode.name;
                if (mName) style = "m-" + (style ? mName + " " + style : mName);
            }
            if (!flattenSpans || curStyle != style) {
                if (curStart < stream.start) f(stream.start, curStyle);
                curStart = stream.start;
                curStyle = style;
            }
            stream.start = stream.pos;
        }
        while (curStart < stream.pos) {
            var pos = Math.min(stream.pos, curStart + 5e4);
            f(pos, curStyle);
            curStart = pos;
        }
    }
    function highlightLine(cm, line, state, forceToEnd) {
        var st = [ cm.state.modeGen ];
        runMode(cm, line.text, cm.doc.mode, state, function(end, style) {
            st.push(end, style);
        }, forceToEnd);
        for (var o = 0; o < cm.state.overlays.length; ++o) {
            var overlay = cm.state.overlays[o], i = 1, at = 0;
            runMode(cm, line.text, overlay.mode, true, function(end, style) {
                var start = i;
                while (at < end) {
                    var i_end = st[i];
                    if (i_end > end) st.splice(i, 1, end, st[i + 1], i_end);
                    i += 2;
                    at = Math.min(end, i_end);
                }
                if (!style) return;
                if (overlay.opaque) {
                    st.splice(start, i - start, end, style);
                    i = start + 2;
                } else {
                    for (;start < i; start += 2) {
                        var cur = st[start + 1];
                        st[start + 1] = cur ? cur + " " + style : style;
                    }
                }
            });
        }
        return st;
    }
    function getLineStyles(cm, line) {
        if (!line.styles || line.styles[0] != cm.state.modeGen) line.styles = highlightLine(cm, line, line.stateAfter = getStateBefore(cm, lineNo(line)));
        return line.styles;
    }
    function processLine(cm, text, state, startAt) {
        var mode = cm.doc.mode;
        var stream = new StringStream(text, cm.options.tabSize);
        stream.start = stream.pos = startAt || 0;
        if (text == "" && mode.blankLine) mode.blankLine(state);
        while (!stream.eol() && stream.pos <= cm.options.maxHighlightLength) {
            mode.token(stream, state);
            stream.start = stream.pos;
        }
    }
    var styleToClassCache = {}, styleToClassCacheWithMode = {};
    function interpretTokenStyle(style, builder) {
        if (!style) return null;
        for (;;) {
            var lineClass = style.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!lineClass) break;
            style = style.slice(0, lineClass.index) + style.slice(lineClass.index + lineClass[0].length);
            var prop = lineClass[1] ? "bgClass" : "textClass";
            if (builder[prop] == null) builder[prop] = lineClass[2]; else if (!new RegExp("(?:^|s)" + lineClass[2] + "(?:$|s)").test(builder[prop])) builder[prop] += " " + lineClass[2];
        }
        if (/^\s*$/.test(style)) return null;
        var cache = builder.cm.options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
        return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
    }
    function buildLineContent(cm, lineView) {
        var content = elt("span", null, null, webkit ? "padding-right: .1px" : null);
        var builder = {
            pre: elt("pre", [ content ]),
            content: content,
            col: 0,
            pos: 0,
            cm: cm
        };
        lineView.measure = {};
        for (var i = 0; i <= (lineView.rest ? lineView.rest.length : 0); i++) {
            var line = i ? lineView.rest[i - 1] : lineView.line, order;
            builder.pos = 0;
            builder.addToken = buildToken;
            if ((ie || webkit) && cm.getOption("lineWrapping")) builder.addToken = buildTokenSplitSpaces(builder.addToken);
            if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line))) builder.addToken = buildTokenBadBidi(builder.addToken, order);
            builder.map = [];
            insertLineContent(line, builder, getLineStyles(cm, line));
            if (builder.map.length == 0) builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
            if (i == 0) {
                lineView.measure.map = builder.map;
                lineView.measure.cache = {};
            } else {
                (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
                (lineView.measure.caches || (lineView.measure.caches = [])).push({});
            }
        }
        signal(cm, "renderLine", cm, lineView.line, builder.pre);
        return builder;
    }
    function defaultSpecialCharPlaceholder(ch) {
        var token = elt("span", "•", "cm-invalidchar");
        token.title = "\\u" + ch.charCodeAt(0).toString(16);
        return token;
    }
    function buildToken(builder, text, style, startStyle, endStyle, title) {
        if (!text) return;
        var special = builder.cm.options.specialChars, mustWrap = false;
        if (!special.test(text)) {
            builder.col += text.length;
            var content = document.createTextNode(text);
            builder.map.push(builder.pos, builder.pos + text.length, content);
            if (ie_upto8) mustWrap = true;
            builder.pos += text.length;
        } else {
            var content = document.createDocumentFragment(), pos = 0;
            while (true) {
                special.lastIndex = pos;
                var m = special.exec(text);
                var skipped = m ? m.index - pos : text.length - pos;
                if (skipped) {
                    var txt = document.createTextNode(text.slice(pos, pos + skipped));
                    if (ie_upto8) content.appendChild(elt("span", [ txt ])); else content.appendChild(txt);
                    builder.map.push(builder.pos, builder.pos + skipped, txt);
                    builder.col += skipped;
                    builder.pos += skipped;
                }
                if (!m) break;
                pos += skipped + 1;
                if (m[0] == "	") {
                    var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
                    var txt = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
                    builder.col += tabWidth;
                } else {
                    var txt = builder.cm.options.specialCharPlaceholder(m[0]);
                    if (ie_upto8) content.appendChild(elt("span", [ txt ])); else content.appendChild(txt);
                    builder.col += 1;
                }
                builder.map.push(builder.pos, builder.pos + 1, txt);
                builder.pos++;
            }
        }
        if (style || startStyle || endStyle || mustWrap) {
            var fullStyle = style || "";
            if (startStyle) fullStyle += startStyle;
            if (endStyle) fullStyle += endStyle;
            var token = elt("span", [ content ], fullStyle);
            if (title) token.title = title;
            return builder.content.appendChild(token);
        }
        builder.content.appendChild(content);
    }
    function buildTokenSplitSpaces(inner) {
        function split(old) {
            var out = " ";
            for (var i = 0; i < old.length - 2; ++i) out += i % 2 ? " " : " ";
            out += " ";
            return out;
        }
        return function(builder, text, style, startStyle, endStyle, title) {
            inner(builder, text.replace(/ {3,}/g, split), style, startStyle, endStyle, title);
        };
    }
    function buildTokenBadBidi(inner, order) {
        return function(builder, text, style, startStyle, endStyle, title) {
            style = style ? style + " cm-force-border" : "cm-force-border";
            var start = builder.pos, end = start + text.length;
            for (;;) {
                for (var i = 0; i < order.length; i++) {
                    var part = order[i];
                    if (part.to > start && part.from <= start) break;
                }
                if (part.to >= end) return inner(builder, text, style, startStyle, endStyle, title);
                inner(builder, text.slice(0, part.to - start), style, startStyle, null, title);
                startStyle = null;
                text = text.slice(part.to - start);
                start = part.to;
            }
        };
    }
    function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
        var widget = !ignoreWidget && marker.widgetNode;
        if (widget) {
            builder.map.push(builder.pos, builder.pos + size, widget);
            builder.content.appendChild(widget);
        }
        builder.pos += size;
    }
    function insertLineContent(line, builder, styles) {
        var spans = line.markedSpans, allText = line.text, at = 0;
        if (!spans) {
            for (var i = 1; i < styles.length; i += 2) builder.addToken(builder, allText.slice(at, at = styles[i]), interpretTokenStyle(styles[i + 1], builder));
            return;
        }
        var len = allText.length, pos = 0, i = 1, text = "", style;
        var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, title, collapsed;
        for (;;) {
            if (nextChange == pos) {
                spanStyle = spanEndStyle = spanStartStyle = title = "";
                collapsed = null;
                nextChange = Infinity;
                var foundBookmarks = [];
                for (var j = 0; j < spans.length; ++j) {
                    var sp = spans[j], m = sp.marker;
                    if (sp.from <= pos && (sp.to == null || sp.to > pos)) {
                        if (sp.to != null && nextChange > sp.to) {
                            nextChange = sp.to;
                            spanEndStyle = "";
                        }
                        if (m.className) spanStyle += " " + m.className;
                        if (m.startStyle && sp.from == pos) spanStartStyle += " " + m.startStyle;
                        if (m.endStyle && sp.to == nextChange) spanEndStyle += " " + m.endStyle;
                        if (m.title && !title) title = m.title;
                        if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) collapsed = sp;
                    } else if (sp.from > pos && nextChange > sp.from) {
                        nextChange = sp.from;
                    }
                    if (m.type == "bookmark" && sp.from == pos && m.widgetNode) foundBookmarks.push(m);
                }
                if (collapsed && (collapsed.from || 0) == pos) {
                    buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos, collapsed.marker, collapsed.from == null);
                    if (collapsed.to == null) return;
                }
                if (!collapsed && foundBookmarks.length) for (var j = 0; j < foundBookmarks.length; ++j) buildCollapsedSpan(builder, 0, foundBookmarks[j]);
            }
            if (pos >= len) break;
            var upto = Math.min(len, nextChange);
            while (true) {
                if (text) {
                    var end = pos + text.length;
                    if (!collapsed) {
                        var tokenText = end > upto ? text.slice(0, upto - pos) : text;
                        builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", title);
                    }
                    if (end >= upto) {
                        text = text.slice(upto - pos);
                        pos = upto;
                        break;
                    }
                    pos = end;
                    spanStartStyle = "";
                }
                text = allText.slice(at, at = styles[i++]);
                style = interpretTokenStyle(styles[i++], builder);
            }
        }
    }
    function isWholeLineUpdate(doc, change) {
        return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
    }
    function updateDoc(doc, change, markedSpans, estimateHeight) {
        function spansFor(n) {
            return markedSpans ? markedSpans[n] : null;
        }
        function update(line, text, spans) {
            updateLine(line, text, spans, estimateHeight);
            signalLater(line, "change", line, change);
        }
        var from = change.from, to = change.to, text = change.text;
        var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
        var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
        if (isWholeLineUpdate(doc, change)) {
            for (var i = 0, added = []; i < text.length - 1; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
            update(lastLine, lastLine.text, lastSpans);
            if (nlines) doc.remove(from.line, nlines);
            if (added.length) doc.insert(from.line, added);
        } else if (firstLine == lastLine) {
            if (text.length == 1) {
                update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
            } else {
                for (var added = [], i = 1; i < text.length - 1; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
                added.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight));
                update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
                doc.insert(from.line + 1, added);
            }
        } else if (text.length == 1) {
            update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
            doc.remove(from.line + 1, nlines);
        } else {
            update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
            update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
            for (var i = 1, added = []; i < text.length - 1; ++i) added.push(new Line(text[i], spansFor(i), estimateHeight));
            if (nlines > 1) doc.remove(from.line + 1, nlines - 1);
            doc.insert(from.line + 1, added);
        }
        signalLater(doc, "change", doc, change);
    }
    function LeafChunk(lines) {
        this.lines = lines;
        this.parent = null;
        for (var i = 0, height = 0; i < lines.length; ++i) {
            lines[i].parent = this;
            height += lines[i].height;
        }
        this.height = height;
    }
    LeafChunk.prototype = {
        chunkSize: function() {
            return this.lines.length;
        },
        removeInner: function(at, n) {
            for (var i = at, e = at + n; i < e; ++i) {
                var line = this.lines[i];
                this.height -= line.height;
                cleanUpLine(line);
                signalLater(line, "delete");
            }
            this.lines.splice(at, n);
        },
        collapse: function(lines) {
            lines.push.apply(lines, this.lines);
        },
        insertInner: function(at, lines, height) {
            this.height += height;
            this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
            for (var i = 0; i < lines.length; ++i) lines[i].parent = this;
        },
        iterN: function(at, n, op) {
            for (var e = at + n; at < e; ++at) if (op(this.lines[at])) return true;
        }
    };
    function BranchChunk(children) {
        this.children = children;
        var size = 0, height = 0;
        for (var i = 0; i < children.length; ++i) {
            var ch = children[i];
            size += ch.chunkSize();
            height += ch.height;
            ch.parent = this;
        }
        this.size = size;
        this.height = height;
        this.parent = null;
    }
    BranchChunk.prototype = {
        chunkSize: function() {
            return this.size;
        },
        removeInner: function(at, n) {
            this.size -= n;
            for (var i = 0; i < this.children.length; ++i) {
                var child = this.children[i], sz = child.chunkSize();
                if (at < sz) {
                    var rm = Math.min(n, sz - at), oldHeight = child.height;
                    child.removeInner(at, rm);
                    this.height -= oldHeight - child.height;
                    if (sz == rm) {
                        this.children.splice(i--, 1);
                        child.parent = null;
                    }
                    if ((n -= rm) == 0) break;
                    at = 0;
                } else at -= sz;
            }
            if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
                var lines = [];
                this.collapse(lines);
                this.children = [ new LeafChunk(lines) ];
                this.children[0].parent = this;
            }
        },
        collapse: function(lines) {
            for (var i = 0; i < this.children.length; ++i) this.children[i].collapse(lines);
        },
        insertInner: function(at, lines, height) {
            this.size += lines.length;
            this.height += height;
            for (var i = 0; i < this.children.length; ++i) {
                var child = this.children[i], sz = child.chunkSize();
                if (at <= sz) {
                    child.insertInner(at, lines, height);
                    if (child.lines && child.lines.length > 50) {
                        while (child.lines.length > 50) {
                            var spilled = child.lines.splice(child.lines.length - 25, 25);
                            var newleaf = new LeafChunk(spilled);
                            child.height -= newleaf.height;
                            this.children.splice(i + 1, 0, newleaf);
                            newleaf.parent = this;
                        }
                        this.maybeSpill();
                    }
                    break;
                }
                at -= sz;
            }
        },
        maybeSpill: function() {
            if (this.children.length <= 10) return;
            var me = this;
            do {
                var spilled = me.children.splice(me.children.length - 5, 5);
                var sibling = new BranchChunk(spilled);
                if (!me.parent) {
                    var copy = new BranchChunk(me.children);
                    copy.parent = me;
                    me.children = [ copy, sibling ];
                    me = copy;
                } else {
                    me.size -= sibling.size;
                    me.height -= sibling.height;
                    var myIndex = indexOf(me.parent.children, me);
                    me.parent.children.splice(myIndex + 1, 0, sibling);
                }
                sibling.parent = me.parent;
            } while (me.children.length > 10);
            me.parent.maybeSpill();
        },
        iterN: function(at, n, op) {
            for (var i = 0; i < this.children.length; ++i) {
                var child = this.children[i], sz = child.chunkSize();
                if (at < sz) {
                    var used = Math.min(n, sz - at);
                    if (child.iterN(at, used, op)) return true;
                    if ((n -= used) == 0) break;
                    at = 0;
                } else at -= sz;
            }
        }
    };
    var nextDocId = 0;
    var Doc = CodeMirror.Doc = function(text, mode, firstLine) {
        if (!(this instanceof Doc)) return new Doc(text, mode, firstLine);
        if (firstLine == null) firstLine = 0;
        BranchChunk.call(this, [ new LeafChunk([ new Line("", null) ]) ]);
        this.first = firstLine;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.cleanGeneration = 1;
        this.frontier = firstLine;
        var start = Pos(firstLine, 0);
        this.sel = simpleSelection(start);
        this.history = new History(null);
        this.id = ++nextDocId;
        this.modeOption = mode;
        if (typeof text == "string") text = splitLines(text);
        updateDoc(this, {
            from: start,
            to: start,
            text: text
        });
        setSelection(this, simpleSelection(start), sel_dontScroll);
    };
    Doc.prototype = createObj(BranchChunk.prototype, {
        constructor: Doc,
        iter: function(from, to, op) {
            if (op) this.iterN(from - this.first, to - from, op); else this.iterN(this.first, this.first + this.size, from);
        },
        insert: function(at, lines) {
            var height = 0;
            for (var i = 0; i < lines.length; ++i) height += lines[i].height;
            this.insertInner(at - this.first, lines, height);
        },
        remove: function(at, n) {
            this.removeInner(at - this.first, n);
        },
        getValue: function(lineSep) {
            var lines = getLines(this, this.first, this.first + this.size);
            if (lineSep === false) return lines;
            return lines.join(lineSep || "\n");
        },
        setValue: docMethodOp(function(code) {
            var top = Pos(this.first, 0), last = this.first + this.size - 1;
            makeChange(this, {
                from: top,
                to: Pos(last, getLine(this, last).text.length),
                text: splitLines(code),
                origin: "setValue"
            }, true);
            setSelection(this, simpleSelection(top));
        }),
        replaceRange: function(code, from, to, origin) {
            from = clipPos(this, from);
            to = to ? clipPos(this, to) : from;
            replaceRange(this, code, from, to, origin);
        },
        getRange: function(from, to, lineSep) {
            var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
            if (lineSep === false) return lines;
            return lines.join(lineSep || "\n");
        },
        getLine: function(line) {
            var l = this.getLineHandle(line);
            return l && l.text;
        },
        getLineHandle: function(line) {
            if (isLine(this, line)) return getLine(this, line);
        },
        getLineNumber: function(line) {
            return lineNo(line);
        },
        getLineHandleVisualStart: function(line) {
            if (typeof line == "number") line = getLine(this, line);
            return visualLine(line);
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
        clipPos: function(pos) {
            return clipPos(this, pos);
        },
        getCursor: function(start) {
            var range = this.sel.primary(), pos;
            if (start == null || start == "head") pos = range.head; else if (start == "anchor") pos = range.anchor; else if (start == "end" || start == "to" || start === false) pos = range.to(); else pos = range.from();
            return pos;
        },
        listSelections: function() {
            return this.sel.ranges;
        },
        somethingSelected: function() {
            return this.sel.somethingSelected();
        },
        setCursor: docMethodOp(function(line, ch, options) {
            setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
        }),
        setSelection: docMethodOp(function(anchor, head, options) {
            setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
        }),
        extendSelection: docMethodOp(function(head, other, options) {
            extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
        }),
        extendSelections: docMethodOp(function(heads, options) {
            extendSelections(this, clipPosArray(this, heads, options));
        }),
        extendSelectionsBy: docMethodOp(function(f, options) {
            extendSelections(this, map(this.sel.ranges, f), options);
        }),
        setSelections: docMethodOp(function(ranges, primary, options) {
            if (!ranges.length) return;
            for (var i = 0, out = []; i < ranges.length; i++) out[i] = new Range(clipPos(this, ranges[i].anchor), clipPos(this, ranges[i].head));
            if (primary == null) primary = ranges.length - 1;
            setSelection(this, normalizeSelection(out, primary), options);
        }),
        addSelection: docMethodOp(function(anchor, head, options) {
            var ranges = this.sel.ranges.slice(0);
            ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
            setSelection(this, normalizeSelection(ranges, ranges.length - 1), options);
        }),
        getSelection: function(lineSep) {
            var ranges = this.sel.ranges, lines;
            for (var i = 0; i < ranges.length; i++) {
                var sel = getBetween(this, ranges[i].from(), ranges[i].to());
                lines = lines ? lines.concat(sel) : sel;
            }
            if (lineSep === false) return lines; else return lines.join(lineSep || "\n");
        },
        getSelections: function(lineSep) {
            var parts = [], ranges = this.sel.ranges;
            for (var i = 0; i < ranges.length; i++) {
                var sel = getBetween(this, ranges[i].from(), ranges[i].to());
                if (lineSep !== false) sel = sel.join(lineSep || "\n");
                parts[i] = sel;
            }
            return parts;
        },
        replaceSelection: docMethodOp(function(code, collapse, origin) {
            var dup = [];
            for (var i = 0; i < this.sel.ranges.length; i++) dup[i] = code;
            this.replaceSelections(dup, collapse, origin || "+input");
        }),
        replaceSelections: function(code, collapse, origin) {
            var changes = [], sel = this.sel;
            for (var i = 0; i < sel.ranges.length; i++) {
                var range = sel.ranges[i];
                changes[i] = {
                    from: range.from(),
                    to: range.to(),
                    text: splitLines(code[i]),
                    origin: origin
                };
            }
            var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
            for (var i = changes.length - 1; i >= 0; i--) makeChange(this, changes[i]);
            if (newSel) setSelectionReplaceHistory(this, newSel); else if (this.cm) ensureCursorVisible(this.cm);
        },
        undo: docMethodOp(function() {
            makeChangeFromHistory(this, "undo");
        }),
        redo: docMethodOp(function() {
            makeChangeFromHistory(this, "redo");
        }),
        undoSelection: docMethodOp(function() {
            makeChangeFromHistory(this, "undo", true);
        }),
        redoSelection: docMethodOp(function() {
            makeChangeFromHistory(this, "redo", true);
        }),
        setExtending: function(val) {
            this.extend = val;
        },
        getExtending: function() {
            return this.extend;
        },
        historySize: function() {
            var hist = this.history, done = 0, undone = 0;
            for (var i = 0; i < hist.done.length; i++) if (!hist.done[i].ranges) ++done;
            for (var i = 0; i < hist.undone.length; i++) if (!hist.undone[i].ranges) ++undone;
            return {
                undo: done,
                redo: undone
            };
        },
        clearHistory: function() {
            this.history = new History(this.history.maxGeneration);
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(true);
        },
        changeGeneration: function(forceSplit) {
            if (forceSplit) this.history.lastOp = this.history.lastOrigin = null;
            return this.history.generation;
        },
        isClean: function(gen) {
            return this.history.generation == (gen || this.cleanGeneration);
        },
        getHistory: function() {
            return {
                done: copyHistoryArray(this.history.done),
                undone: copyHistoryArray(this.history.undone)
            };
        },
        setHistory: function(histData) {
            var hist = this.history = new History(this.history.maxGeneration);
            hist.done = copyHistoryArray(histData.done.slice(0), null, true);
            hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
        },
        markText: function(from, to, options) {
            return markText(this, clipPos(this, from), clipPos(this, to), options, "range");
        },
        setBookmark: function(pos, options) {
            var realOpts = {
                replacedWith: options && (options.nodeType == null ? options.widget : options),
                insertLeft: options && options.insertLeft,
                clearWhenEmpty: false
            };
            pos = clipPos(this, pos);
            return markText(this, pos, pos, realOpts, "bookmark");
        },
        findMarksAt: function(pos) {
            pos = clipPos(this, pos);
            var markers = [], spans = getLine(this, pos.line).markedSpans;
            if (spans) for (var i = 0; i < spans.length; ++i) {
                var span = spans[i];
                if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) markers.push(span.marker.parent || span.marker);
            }
            return markers;
        },
        findMarks: function(from, to) {
            from = clipPos(this, from);
            to = clipPos(this, to);
            var found = [], lineNo = from.line;
            this.iter(from.line, to.line + 1, function(line) {
                var spans = line.markedSpans;
                if (spans) for (var i = 0; i < spans.length; i++) {
                    var span = spans[i];
                    if (!(lineNo == from.line && from.ch > span.to || span.from == null && lineNo != from.line || lineNo == to.line && span.from > to.ch)) found.push(span.marker.parent || span.marker);
                }
                ++lineNo;
            });
            return found;
        },
        getAllMarks: function() {
            var markers = [];
            this.iter(function(line) {
                var sps = line.markedSpans;
                if (sps) for (var i = 0; i < sps.length; ++i) if (sps[i].from != null) markers.push(sps[i].marker);
            });
            return markers;
        },
        posFromIndex: function(off) {
            var ch, lineNo = this.first;
            this.iter(function(line) {
                var sz = line.text.length + 1;
                if (sz > off) {
                    ch = off;
                    return true;
                }
                off -= sz;
                ++lineNo;
            });
            return clipPos(this, Pos(lineNo, ch));
        },
        indexFromPos: function(coords) {
            coords = clipPos(this, coords);
            var index = coords.ch;
            if (coords.line < this.first || coords.ch < 0) return 0;
            this.iter(this.first, coords.line, function(line) {
                index += line.text.length + 1;
            });
            return index;
        },
        copy: function(copyHistory) {
            var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first);
            doc.scrollTop = this.scrollTop;
            doc.scrollLeft = this.scrollLeft;
            doc.sel = this.sel;
            doc.extend = false;
            if (copyHistory) {
                doc.history.undoDepth = this.history.undoDepth;
                doc.setHistory(this.getHistory());
            }
            return doc;
        },
        linkedDoc: function(options) {
            if (!options) options = {};
            var from = this.first, to = this.first + this.size;
            if (options.from != null && options.from > from) from = options.from;
            if (options.to != null && options.to < to) to = options.to;
            var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from);
            if (options.sharedHist) copy.history = this.history;
            (this.linked || (this.linked = [])).push({
                doc: copy,
                sharedHist: options.sharedHist
            });
            copy.linked = [ {
                doc: this,
                isParent: true,
                sharedHist: options.sharedHist
            } ];
            return copy;
        },
        unlinkDoc: function(other) {
            if (other instanceof CodeMirror) other = other.doc;
            if (this.linked) for (var i = 0; i < this.linked.length; ++i) {
                var link = this.linked[i];
                if (link.doc != other) continue;
                this.linked.splice(i, 1);
                other.unlinkDoc(this);
                break;
            }
            if (other.history == this.history) {
                var splitIds = [ other.id ];
                linkedDocs(other, function(doc) {
                    splitIds.push(doc.id);
                }, true);
                other.history = new History(null);
                other.history.done = copyHistoryArray(this.history.done, splitIds);
                other.history.undone = copyHistoryArray(this.history.undone, splitIds);
            }
        },
        iterLinkedDocs: function(f) {
            linkedDocs(this, f);
        },
        getMode: function() {
            return this.mode;
        },
        getEditor: function() {
            return this.cm;
        }
    });
    Doc.prototype.eachLine = Doc.prototype.iter;
    var dontDelegate = "iter insert remove copy getEditor".split(" ");
    for (var prop in Doc.prototype) if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) CodeMirror.prototype[prop] = function(method) {
        return function() {
            return method.apply(this.doc, arguments);
        };
    }(Doc.prototype[prop]);
    eventMixin(Doc);
    function linkedDocs(doc, f, sharedHistOnly) {
        function propagate(doc, skip, sharedHist) {
            if (doc.linked) for (var i = 0; i < doc.linked.length; ++i) {
                var rel = doc.linked[i];
                if (rel.doc == skip) continue;
                var shared = sharedHist && rel.sharedHist;
                if (sharedHistOnly && !shared) continue;
                f(rel.doc, shared);
                propagate(rel.doc, doc, shared);
            }
        }
        propagate(doc, null, true);
    }
    function attachDoc(cm, doc) {
        if (doc.cm) throw new Error("This document is already in use.");
        cm.doc = doc;
        doc.cm = cm;
        estimateLineHeights(cm);
        loadMode(cm);
        if (!cm.options.lineWrapping) findMaxLine(cm);
        cm.options.mode = doc.modeOption;
        regChange(cm);
    }
    function getLine(doc, n) {
        n -= doc.first;
        if (n < 0 || n >= doc.size) throw new Error("There is no line " + (n + doc.first) + " in the document.");
        for (var chunk = doc; !chunk.lines; ) {
            for (var i = 0; ;++i) {
                var child = chunk.children[i], sz = child.chunkSize();
                if (n < sz) {
                    chunk = child;
                    break;
                }
                n -= sz;
            }
        }
        return chunk.lines[n];
    }
    function getBetween(doc, start, end) {
        var out = [], n = start.line;
        doc.iter(start.line, end.line + 1, function(line) {
            var text = line.text;
            if (n == end.line) text = text.slice(0, end.ch);
            if (n == start.line) text = text.slice(start.ch);
            out.push(text);
            ++n;
        });
        return out;
    }
    function getLines(doc, from, to) {
        var out = [];
        doc.iter(from, to, function(line) {
            out.push(line.text);
        });
        return out;
    }
    function updateLineHeight(line, height) {
        var diff = height - line.height;
        if (diff) for (var n = line; n; n = n.parent) n.height += diff;
    }
    function lineNo(line) {
        if (line.parent == null) return null;
        var cur = line.parent, no = indexOf(cur.lines, line);
        for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
            for (var i = 0; ;++i) {
                if (chunk.children[i] == cur) break;
                no += chunk.children[i].chunkSize();
            }
        }
        return no + cur.first;
    }
    function lineAtHeight(chunk, h) {
        var n = chunk.first;
        outer: do {
            for (var i = 0; i < chunk.children.length; ++i) {
                var child = chunk.children[i], ch = child.height;
                if (h < ch) {
                    chunk = child;
                    continue outer;
                }
                h -= ch;
                n += child.chunkSize();
            }
            return n;
        } while (!chunk.lines);
        for (var i = 0; i < chunk.lines.length; ++i) {
            var line = chunk.lines[i], lh = line.height;
            if (h < lh) break;
            h -= lh;
        }
        return n + i;
    }
    function heightAtLine(lineObj) {
        lineObj = visualLine(lineObj);
        var h = 0, chunk = lineObj.parent;
        for (var i = 0; i < chunk.lines.length; ++i) {
            var line = chunk.lines[i];
            if (line == lineObj) break; else h += line.height;
        }
        for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
            for (var i = 0; i < p.children.length; ++i) {
                var cur = p.children[i];
                if (cur == chunk) break; else h += cur.height;
            }
        }
        return h;
    }
    function getOrder(line) {
        var order = line.order;
        if (order == null) order = line.order = bidiOrdering(line.text);
        return order;
    }
    function History(startGen) {
        this.done = [];
        this.undone = [];
        this.undoDepth = Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        this.generation = this.maxGeneration = startGen || 1;
    }
    function historyChangeFromChange(doc, change) {
        var histChange = {
            from: copyPos(change.from),
            to: changeEnd(change),
            text: getBetween(doc, change.from, change.to)
        };
        attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
        linkedDocs(doc, function(doc) {
            attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
        }, true);
        return histChange;
    }
    function clearSelectionEvents(array) {
        while (array.length) {
            var last = lst(array);
            if (last.ranges) array.pop(); else break;
        }
    }
    function lastChangeEvent(hist, force) {
        if (force) {
            clearSelectionEvents(hist.done);
            return lst(hist.done);
        } else if (hist.done.length && !lst(hist.done).ranges) {
            return lst(hist.done);
        } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
            hist.done.pop();
            return lst(hist.done);
        }
    }
    function addChangeToHistory(doc, change, selAfter, opId) {
        var hist = doc.history;
        hist.undone.length = 0;
        var time = +new Date(), cur;
        if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && doc.cm && hist.lastModTime > time - doc.cm.options.historyEventDelay || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
            var last = lst(cur.changes);
            if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
                last.to = changeEnd(change);
            } else {
                cur.changes.push(historyChangeFromChange(doc, change));
            }
        } else {
            var before = lst(hist.done);
            if (!before || !before.ranges) pushSelectionToHistory(doc.sel, hist.done);
            cur = {
                changes: [ historyChangeFromChange(doc, change) ],
                generation: hist.generation
            };
            hist.done.push(cur);
            while (hist.done.length > hist.undoDepth) {
                hist.done.shift();
                if (!hist.done[0].ranges) hist.done.shift();
            }
        }
        hist.done.push(selAfter);
        hist.generation = ++hist.maxGeneration;
        hist.lastModTime = time;
        hist.lastOp = opId;
        hist.lastOrigin = hist.lastSelOrigin = change.origin;
        if (!last) signal(doc, "historyAdded");
    }
    function selectionEventCanBeMerged(doc, origin, prev, sel) {
        var ch = origin.charAt(0);
        return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
    }
    function addSelectionToHistory(doc, sel, opId, options) {
        var hist = doc.history, origin = options && options.origin;
        if (opId == hist.lastOp || origin && hist.lastSelOrigin == origin && selectionEventCanBeMerged(doc, origin, lst(hist.done), sel)) hist.done[hist.done.length - 1] = sel; else pushSelectionToHistory(sel, hist.done);
        hist.lastSelTime = +new Date();
        hist.lastSelOrigin = origin;
        hist.lastOp = opId;
        if (options && options.clearRedo !== false) clearSelectionEvents(hist.undone);
    }
    function pushSelectionToHistory(sel, dest) {
        var top = lst(dest);
        if (!(top && top.ranges && top.equals(sel))) dest.push(sel);
    }
    function attachLocalSpans(doc, change, from, to) {
        var existing = change["spans_" + doc.id], n = 0;
        doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
            if (line.markedSpans) (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
            ++n;
        });
    }
    function removeClearedSpans(spans) {
        if (!spans) return null;
        for (var i = 0, out; i < spans.length; ++i) {
            if (spans[i].marker.explicitlyCleared) {
                if (!out) out = spans.slice(0, i);
            } else if (out) out.push(spans[i]);
        }
        return !out ? spans : out.length ? out : null;
    }
    function getOldSpans(doc, change) {
        var found = change["spans_" + doc.id];
        if (!found) return null;
        for (var i = 0, nw = []; i < change.text.length; ++i) nw.push(removeClearedSpans(found[i]));
        return nw;
    }
    function copyHistoryArray(events, newGroup, instantiateSel) {
        for (var i = 0, copy = []; i < events.length; ++i) {
            var event = events[i];
            if (event.ranges) {
                copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
                continue;
            }
            var changes = event.changes, newChanges = [];
            copy.push({
                changes: newChanges
            });
            for (var j = 0; j < changes.length; ++j) {
                var change = changes[j], m;
                newChanges.push({
                    from: change.from,
                    to: change.to,
                    text: change.text
                });
                if (newGroup) for (var prop in change) if (m = prop.match(/^spans_(\d+)$/)) {
                    if (indexOf(newGroup, Number(m[1])) > -1) {
                        lst(newChanges)[prop] = change[prop];
                        delete change[prop];
                    }
                }
            }
        }
        return copy;
    }
    function rebaseHistSelSingle(pos, from, to, diff) {
        if (to < pos.line) {
            pos.line += diff;
        } else if (from < pos.line) {
            pos.line = from;
            pos.ch = 0;
        }
    }
    function rebaseHistArray(array, from, to, diff) {
        for (var i = 0; i < array.length; ++i) {
            var sub = array[i], ok = true;
            if (sub.ranges) {
                if (!sub.copied) {
                    sub = array[i] = sub.deepCopy();
                    sub.copied = true;
                }
                for (var j = 0; j < sub.ranges.length; j++) {
                    rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
                    rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
                }
                continue;
            }
            for (var j = 0; j < sub.changes.length; ++j) {
                var cur = sub.changes[j];
                if (to < cur.from.line) {
                    cur.from = Pos(cur.from.line + diff, cur.from.ch);
                    cur.to = Pos(cur.to.line + diff, cur.to.ch);
                } else if (from <= cur.to.line) {
                    ok = false;
                    break;
                }
            }
            if (!ok) {
                array.splice(0, i + 1);
                i = 0;
            }
        }
    }
    function rebaseHist(hist, change) {
        var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
        rebaseHistArray(hist.done, from, to, diff);
        rebaseHistArray(hist.undone, from, to, diff);
    }
    var e_preventDefault = CodeMirror.e_preventDefault = function(e) {
        if (e.preventDefault) e.preventDefault(); else e.returnValue = false;
    };
    var e_stopPropagation = CodeMirror.e_stopPropagation = function(e) {
        if (e.stopPropagation) e.stopPropagation(); else e.cancelBubble = true;
    };
    function e_defaultPrevented(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
    }
    var e_stop = CodeMirror.e_stop = function(e) {
        e_preventDefault(e);
        e_stopPropagation(e);
    };
    function e_target(e) {
        return e.target || e.srcElement;
    }
    function e_button(e) {
        var b = e.which;
        if (b == null) {
            if (e.button & 1) b = 1; else if (e.button & 2) b = 3; else if (e.button & 4) b = 2;
        }
        if (mac && e.ctrlKey && b == 1) b = 3;
        return b;
    }
    var on = CodeMirror.on = function(emitter, type, f) {
        if (emitter.addEventListener) emitter.addEventListener(type, f, false); else if (emitter.attachEvent) emitter.attachEvent("on" + type, f); else {
            var map = emitter._handlers || (emitter._handlers = {});
            var arr = map[type] || (map[type] = []);
            arr.push(f);
        }
    };
    var off = CodeMirror.off = function(emitter, type, f) {
        if (emitter.removeEventListener) emitter.removeEventListener(type, f, false); else if (emitter.detachEvent) emitter.detachEvent("on" + type, f); else {
            var arr = emitter._handlers && emitter._handlers[type];
            if (!arr) return;
            for (var i = 0; i < arr.length; ++i) if (arr[i] == f) {
                arr.splice(i, 1);
                break;
            }
        }
    };
    var signal = CodeMirror.signal = function(emitter, type) {
        var arr = emitter._handlers && emitter._handlers[type];
        if (!arr) return;
        var args = Array.prototype.slice.call(arguments, 2);
        for (var i = 0; i < arr.length; ++i) arr[i].apply(null, args);
    };
    var delayedCallbacks, delayedCallbackDepth = 0;
    function signalLater(emitter, type) {
        var arr = emitter._handlers && emitter._handlers[type];
        if (!arr) return;
        var args = Array.prototype.slice.call(arguments, 2);
        if (!delayedCallbacks) {
            ++delayedCallbackDepth;
            delayedCallbacks = [];
            setTimeout(fireDelayed, 0);
        }
        function bnd(f) {
            return function() {
                f.apply(null, args);
            };
        }
        for (var i = 0; i < arr.length; ++i) delayedCallbacks.push(bnd(arr[i]));
    }
    function fireDelayed() {
        --delayedCallbackDepth;
        var delayed = delayedCallbacks;
        delayedCallbacks = null;
        for (var i = 0; i < delayed.length; ++i) delayed[i]();
    }
    function signalDOMEvent(cm, e, override) {
        signal(cm, override || e.type, cm, e);
        return e_defaultPrevented(e) || e.codemirrorIgnore;
    }
    function hasHandler(emitter, type) {
        var arr = emitter._handlers && emitter._handlers[type];
        return arr && arr.length > 0;
    }
    function eventMixin(ctor) {
        ctor.prototype.on = function(type, f) {
            on(this, type, f);
        };
        ctor.prototype.off = function(type, f) {
            off(this, type, f);
        };
    }
    var scrollerCutOff = 30;
    var Pass = CodeMirror.Pass = {
        toString: function() {
            return "CodeMirror.Pass";
        }
    };
    var sel_dontScroll = {
        scroll: false
    }, sel_mouse = {
        origin: "*mouse"
    }, sel_move = {
        origin: "+move"
    };
    function Delayed() {
        this.id = null;
    }
    Delayed.prototype.set = function(ms, f) {
        clearTimeout(this.id);
        this.id = setTimeout(f, ms);
    };
    var countColumn = CodeMirror.countColumn = function(string, end, tabSize, startIndex, startValue) {
        if (end == null) {
            end = string.search(/[^\s\u00a0]/);
            if (end == -1) end = string.length;
        }
        for (var i = startIndex || 0, n = startValue || 0; ;) {
            var nextTab = string.indexOf("	", i);
            if (nextTab < 0 || nextTab >= end) return n + (end - i);
            n += nextTab - i;
            n += tabSize - n % tabSize;
            i = nextTab + 1;
        }
    };
    function findColumn(string, goal, tabSize) {
        for (var pos = 0, col = 0; ;) {
            var nextTab = string.indexOf("	", pos);
            if (nextTab == -1) nextTab = string.length;
            var skipped = nextTab - pos;
            if (nextTab == string.length || col + skipped >= goal) return pos + Math.min(skipped, goal - col);
            col += nextTab - pos;
            col += tabSize - col % tabSize;
            pos = nextTab + 1;
            if (col >= goal) return pos;
        }
    }
    var spaceStrs = [ "" ];
    function spaceStr(n) {
        while (spaceStrs.length <= n) spaceStrs.push(lst(spaceStrs) + " ");
        return spaceStrs[n];
    }
    function lst(arr) {
        return arr[arr.length - 1];
    }
    var selectInput = function(node) {
        node.select();
    };
    if (ios) selectInput = function(node) {
        node.selectionStart = 0;
        node.selectionEnd = node.value.length;
    }; else if (ie) selectInput = function(node) {
        try {
            node.select();
        } catch (_e) {}
    };
    function indexOf(array, elt) {
        for (var i = 0; i < array.length; ++i) if (array[i] == elt) return i;
        return -1;
    }
    if ([].indexOf) indexOf = function(array, elt) {
        return array.indexOf(elt);
    };
    function map(array, f) {
        var out = [];
        for (var i = 0; i < array.length; i++) out[i] = f(array[i], i);
        return out;
    }
    if ([].map) map = function(array, f) {
        return array.map(f);
    };
    function createObj(base, props) {
        var inst;
        if (Object.create) {
            inst = Object.create(base);
        } else {
            var ctor = function() {};
            ctor.prototype = base;
            inst = new ctor();
        }
        if (props) copyObj(props, inst);
        return inst;
    }
    function copyObj(obj, target) {
        if (!target) target = {};
        for (var prop in obj) if (obj.hasOwnProperty(prop)) target[prop] = obj[prop];
        return target;
    }
    function bind(f) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
            return f.apply(null, args);
        };
    }
    var nonASCIISingleCaseWordChar = /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    var isWordChar = CodeMirror.isWordChar = function(ch) {
        return /\w/.test(ch) || ch > "" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
    };
    function isEmpty(obj) {
        for (var n in obj) if (obj.hasOwnProperty(n) && obj[n]) return false;
        return true;
    }
    var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function isExtendingChar(ch) {
        return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
    }
    function elt(tag, content, className, style) {
        var e = document.createElement(tag);
        if (className) e.className = className;
        if (style) e.style.cssText = style;
        if (typeof content == "string") e.appendChild(document.createTextNode(content)); else if (content) for (var i = 0; i < content.length; ++i) e.appendChild(content[i]);
        return e;
    }
    var range;
    if (document.createRange) range = function(node, start, end) {
        var r = document.createRange();
        r.setEnd(node, end);
        r.setStart(node, start);
        return r;
    }; else range = function(node, start, end) {
        var r = document.body.createTextRange();
        r.moveToElementText(node.parentNode);
        r.collapse(true);
        r.moveEnd("character", end);
        r.moveStart("character", start);
        return r;
    };
    function removeChildren(e) {
        for (var count = e.childNodes.length; count > 0; --count) e.removeChild(e.firstChild);
        return e;
    }
    function removeChildrenAndAdd(parent, e) {
        return removeChildren(parent).appendChild(e);
    }
    function activeElt() {
        return document.activeElement;
    }
    if (ie_upto10) activeElt = function() {
        try {
            return document.activeElement;
        } catch (e) {
            return document.body;
        }
    };
    var dragAndDrop = function() {
        if (ie_upto8) return false;
        var div = elt("div");
        return "draggable" in div || "dragDrop" in div;
    }();
    var knownScrollbarWidth;
    function scrollbarWidth(measure) {
        if (knownScrollbarWidth != null) return knownScrollbarWidth;
        var test = elt("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        removeChildrenAndAdd(measure, test);
        if (test.offsetWidth) knownScrollbarWidth = test.offsetHeight - test.clientHeight;
        return knownScrollbarWidth || 0;
    }
    var zwspSupported;
    function zeroWidthElement(measure) {
        if (zwspSupported == null) {
            var test = elt("span", "​");
            removeChildrenAndAdd(measure, elt("span", [ test, document.createTextNode("x") ]));
            if (measure.firstChild.offsetHeight != 0) zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !ie_upto7;
        }
        if (zwspSupported) return elt("span", "​"); else return elt("span", " ", null, "display: inline-block; width: 1px; margin-right: -1px");
    }
    var badBidiRects;
    function hasBadBidiRects(measure) {
        if (badBidiRects != null) return badBidiRects;
        var txt = removeChildrenAndAdd(measure, document.createTextNode("AخA"));
        var r0 = range(txt, 0, 1).getBoundingClientRect();
        if (r0.left == r0.right) return false;
        var r1 = range(txt, 1, 2).getBoundingClientRect();
        return badBidiRects = r1.right - r0.right < 3;
    }
    var splitLines = CodeMirror.splitLines = "\n\nb".split(/\n/).length != 3 ? function(string) {
        var pos = 0, result = [], l = string.length;
        while (pos <= l) {
            var nl = string.indexOf("\n", pos);
            if (nl == -1) nl = string.length;
            var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
            var rt = line.indexOf("\r");
            if (rt != -1) {
                result.push(line.slice(0, rt));
                pos += rt + 1;
            } else {
                result.push(line);
                pos = nl + 1;
            }
        }
        return result;
    } : function(string) {
        return string.split(/\r\n?|\n/);
    };
    var hasSelection = window.getSelection ? function(te) {
        try {
            return te.selectionStart != te.selectionEnd;
        } catch (e) {
            return false;
        }
    } : function(te) {
        try {
            var range = te.ownerDocument.selection.createRange();
        } catch (e) {}
        if (!range || range.parentElement() != te) return false;
        return range.compareEndPoints("StartToEnd", range) != 0;
    };
    var hasCopyEvent = function() {
        var e = elt("div");
        if ("oncopy" in e) return true;
        e.setAttribute("oncopy", "return;");
        return typeof e.oncopy == "function";
    }();
    var keyNames = {
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
    CodeMirror.keyNames = keyNames;
    (function() {
        for (var i = 0; i < 10; i++) keyNames[i + 48] = keyNames[i + 96] = String(i);
        for (var i = 65; i <= 90; i++) keyNames[i] = String.fromCharCode(i);
        for (var i = 1; i <= 12; i++) keyNames[i + 111] = keyNames[i + 63235] = "F" + i;
    })();
    function iterateBidiSections(order, from, to, f) {
        if (!order) return f(from, to, "ltr");
        var found = false;
        for (var i = 0; i < order.length; ++i) {
            var part = order[i];
            if (part.from < to && part.to > from || from == to && part.to == from) {
                f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr");
                found = true;
            }
        }
        if (!found) f(from, to, "ltr");
    }
    function bidiLeft(part) {
        return part.level % 2 ? part.to : part.from;
    }
    function bidiRight(part) {
        return part.level % 2 ? part.from : part.to;
    }
    function lineLeft(line) {
        var order = getOrder(line);
        return order ? bidiLeft(order[0]) : 0;
    }
    function lineRight(line) {
        var order = getOrder(line);
        if (!order) return line.text.length;
        return bidiRight(lst(order));
    }
    function lineStart(cm, lineN) {
        var line = getLine(cm.doc, lineN);
        var visual = visualLine(line);
        if (visual != line) lineN = lineNo(visual);
        var order = getOrder(visual);
        var ch = !order ? 0 : order[0].level % 2 ? lineRight(visual) : lineLeft(visual);
        return Pos(lineN, ch);
    }
    function lineEnd(cm, lineN) {
        var merged, line = getLine(cm.doc, lineN);
        while (merged = collapsedSpanAtEnd(line)) {
            line = merged.find(1, true).line;
            lineN = null;
        }
        var order = getOrder(line);
        var ch = !order ? line.text.length : order[0].level % 2 ? lineLeft(line) : lineRight(line);
        return Pos(lineN == null ? lineNo(line) : lineN, ch);
    }
    function compareBidiLevel(order, a, b) {
        var linedir = order[0].level;
        if (a == linedir) return true;
        if (b == linedir) return false;
        return a < b;
    }
    var bidiOther;
    function getBidiPartAt(order, pos) {
        bidiOther = null;
        for (var i = 0, found; i < order.length; ++i) {
            var cur = order[i];
            if (cur.from < pos && cur.to > pos) return i;
            if (cur.from == pos || cur.to == pos) {
                if (found == null) {
                    found = i;
                } else if (compareBidiLevel(order, cur.level, order[found].level)) {
                    if (cur.from != cur.to) bidiOther = found;
                    return i;
                } else {
                    if (cur.from != cur.to) bidiOther = i;
                    return found;
                }
            }
        }
        return found;
    }
    function moveInLine(line, pos, dir, byUnit) {
        if (!byUnit) return pos + dir;
        do pos += dir; while (pos > 0 && isExtendingChar(line.text.charAt(pos)));
        return pos;
    }
    function moveVisually(line, start, dir, byUnit) {
        var bidi = getOrder(line);
        if (!bidi) return moveLogically(line, start, dir, byUnit);
        var pos = getBidiPartAt(bidi, start), part = bidi[pos];
        var target = moveInLine(line, start, part.level % 2 ? -dir : dir, byUnit);
        for (;;) {
            if (target > part.from && target < part.to) return target;
            if (target == part.from || target == part.to) {
                if (getBidiPartAt(bidi, target) == pos) return target;
                part = bidi[pos += dir];
                return dir > 0 == part.level % 2 ? part.to : part.from;
            } else {
                part = bidi[pos += dir];
                if (!part) return null;
                if (dir > 0 == part.level % 2) target = moveInLine(line, part.to, -1, byUnit); else target = moveInLine(line, part.from, 1, byUnit);
            }
        }
    }
    function moveLogically(line, start, dir, byUnit) {
        var target = start + dir;
        if (byUnit) while (target > 0 && isExtendingChar(line.text.charAt(target))) target += dir;
        return target < 0 || target > line.text.length ? null : target;
    }
    var bidiOrdering = function() {
        var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
        var arabicTypes = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm";
        function charType(code) {
            if (code <= 247) return lowTypes.charAt(code); else if (1424 <= code && code <= 1524) return "R"; else if (1536 <= code && code <= 1773) return arabicTypes.charAt(code - 1536); else if (1774 <= code && code <= 2220) return "r"; else if (8192 <= code && code <= 8203) return "w"; else if (code == 8204) return "b"; else return "L";
        }
        var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
        var outerType = "L";
        function BidiSpan(level, from, to) {
            this.level = level;
            this.from = from;
            this.to = to;
        }
        return function(str) {
            if (!bidiRE.test(str)) return false;
            var len = str.length, types = [];
            for (var i = 0, type; i < len; ++i) types.push(type = charType(str.charCodeAt(i)));
            for (var i = 0, prev = outerType; i < len; ++i) {
                var type = types[i];
                if (type == "m") types[i] = prev; else prev = type;
            }
            for (var i = 0, cur = outerType; i < len; ++i) {
                var type = types[i];
                if (type == "1" && cur == "r") types[i] = "n"; else if (isStrong.test(type)) {
                    cur = type;
                    if (type == "r") types[i] = "R";
                }
            }
            for (var i = 1, prev = types[0]; i < len - 1; ++i) {
                var type = types[i];
                if (type == "+" && prev == "1" && types[i + 1] == "1") types[i] = "1"; else if (type == "," && prev == types[i + 1] && (prev == "1" || prev == "n")) types[i] = prev;
                prev = type;
            }
            for (var i = 0; i < len; ++i) {
                var type = types[i];
                if (type == ",") types[i] = "N"; else if (type == "%") {
                    for (var end = i + 1; end < len && types[end] == "%"; ++end) {}
                    var replace = i && types[i - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
                    for (var j = i; j < end; ++j) types[j] = replace;
                    i = end - 1;
                }
            }
            for (var i = 0, cur = outerType; i < len; ++i) {
                var type = types[i];
                if (cur == "L" && type == "1") types[i] = "L"; else if (isStrong.test(type)) cur = type;
            }
            for (var i = 0; i < len; ++i) {
                if (isNeutral.test(types[i])) {
                    for (var end = i + 1; end < len && isNeutral.test(types[end]); ++end) {}
                    var before = (i ? types[i - 1] : outerType) == "L";
                    var after = (end < len ? types[end] : outerType) == "L";
                    var replace = before || after ? "L" : "R";
                    for (var j = i; j < end; ++j) types[j] = replace;
                    i = end - 1;
                }
            }
            var order = [], m;
            for (var i = 0; i < len; ) {
                if (countsAsLeft.test(types[i])) {
                    var start = i;
                    for (++i; i < len && countsAsLeft.test(types[i]); ++i) {}
                    order.push(new BidiSpan(0, start, i));
                } else {
                    var pos = i, at = order.length;
                    for (++i; i < len && types[i] != "L"; ++i) {}
                    for (var j = pos; j < i; ) {
                        if (countsAsNum.test(types[j])) {
                            if (pos < j) order.splice(at, 0, new BidiSpan(1, pos, j));
                            var nstart = j;
                            for (++j; j < i && countsAsNum.test(types[j]); ++j) {}
                            order.splice(at, 0, new BidiSpan(2, nstart, j));
                            pos = j;
                        } else ++j;
                    }
                    if (pos < i) order.splice(at, 0, new BidiSpan(1, pos, i));
                }
            }
            if (order[0].level == 1 && (m = str.match(/^\s+/))) {
                order[0].from = m[0].length;
                order.unshift(new BidiSpan(0, 0, m[0].length));
            }
            if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
                lst(order).to -= m[0].length;
                order.push(new BidiSpan(0, len - m[0].length, len));
            }
            if (order[0].level != lst(order).level) order.push(new BidiSpan(order[0].level, len, len));
            return order;
        };
    }();
    CodeMirror.version = "4.0.1";
    return CodeMirror;
});

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("../../lib/codemirror")); else if (typeof define == "function" && define.amd) define([ "../../lib/codemirror" ], mod); else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
    CodeMirror.defineMode("javascript", function(config, parserConfig) {
        var indentUnit = config.indentUnit;
        var statementIndent = parserConfig.statementIndent;
        var jsonldMode = parserConfig.jsonld;
        var jsonMode = parserConfig.json || jsonldMode;
        var isTS = parserConfig.typescript;
        var keywords = function() {
            function kw(type) {
                return {
                    type: type,
                    style: "keyword"
                };
            }
            var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c");
            var operator = kw("operator"), atom = {
                type: "atom",
                style: "atom"
            };
            var jsKeywords = {
                "if": kw("if"),
                "while": A,
                "with": A,
                "else": B,
                "do": B,
                "try": B,
                "finally": B,
                "return": C,
                "break": C,
                "continue": C,
                "new": C,
                "delete": C,
                "throw": C,
                "debugger": C,
                "var": kw("var"),
                "const": kw("var"),
                let: kw("var"),
                "function": kw("function"),
                "catch": kw("catch"),
                "for": kw("for"),
                "switch": kw("switch"),
                "case": kw("case"),
                "default": kw("default"),
                "in": operator,
                "typeof": operator,
                "instanceof": operator,
                "true": atom,
                "false": atom,
                "null": atom,
                undefined: atom,
                NaN: atom,
                Infinity: atom,
                "this": kw("this"),
                module: kw("module"),
                "class": kw("class"),
                "super": kw("atom"),
                "yield": C,
                "export": kw("export"),
                "import": kw("import"),
                "extends": C
            };
            if (isTS) {
                var type = {
                    type: "variable",
                    style: "variable-3"
                };
                var tsKeywords = {
                    "interface": kw("interface"),
                    "extends": kw("extends"),
                    constructor: kw("constructor"),
                    "public": kw("public"),
                    "private": kw("private"),
                    "protected": kw("protected"),
                    "static": kw("static"),
                    string: type,
                    number: type,
                    bool: type,
                    any: type
                };
                for (var attr in tsKeywords) {
                    jsKeywords[attr] = tsKeywords[attr];
                }
            }
            return jsKeywords;
        }();
        var isOperatorChar = /[+\-*&%=<>!?|~^]/;
        var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
        function readRegexp(stream) {
            var escaped = false, next, inSet = false;
            while ((next = stream.next()) != null) {
                if (!escaped) {
                    if (next == "/" && !inSet) return;
                    if (next == "[") inSet = true; else if (inSet && next == "]") inSet = false;
                }
                escaped = !escaped && next == "\\";
            }
        }
        var type, content;
        function ret(tp, style, cont) {
            type = tp;
            content = cont;
            return style;
        }
        function tokenBase(stream, state) {
            var ch = stream.next();
            if (ch == '"' || ch == "'") {
                state.tokenize = tokenString(ch);
                return state.tokenize(stream, state);
            } else if (ch == "." && stream.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
                return ret("number", "number");
            } else if (ch == "." && stream.match("..")) {
                return ret("spread", "meta");
            } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
                return ret(ch);
            } else if (ch == "=" && stream.eat(">")) {
                return ret("=>", "operator");
            } else if (ch == "0" && stream.eat(/x/i)) {
                stream.eatWhile(/[\da-f]/i);
                return ret("number", "number");
            } else if (/\d/.test(ch)) {
                stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
                return ret("number", "number");
            } else if (ch == "/") {
                if (stream.eat("*")) {
                    state.tokenize = tokenComment;
                    return tokenComment(stream, state);
                } else if (stream.eat("/")) {
                    stream.skipToEnd();
                    return ret("comment", "comment");
                } else if (state.lastType == "operator" || state.lastType == "keyword c" || state.lastType == "sof" || /^[\[{}\(,;:]$/.test(state.lastType)) {
                    readRegexp(stream);
                    stream.eatWhile(/[gimy]/);
                    return ret("regexp", "string-2");
                } else {
                    stream.eatWhile(isOperatorChar);
                    return ret("operator", "operator", stream.current());
                }
            } else if (ch == "`") {
                state.tokenize = tokenQuasi;
                return tokenQuasi(stream, state);
            } else if (ch == "#") {
                stream.skipToEnd();
                return ret("error", "error");
            } else if (isOperatorChar.test(ch)) {
                stream.eatWhile(isOperatorChar);
                return ret("operator", "operator", stream.current());
            } else {
                stream.eatWhile(/[\w\$_]/);
                var word = stream.current(), known = keywords.propertyIsEnumerable(word) && keywords[word];
                return known && state.lastType != "." ? ret(known.type, known.style, word) : ret("variable", "variable", word);
            }
        }
        function tokenString(quote) {
            return function(stream, state) {
                var escaped = false, next;
                if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
                    state.tokenize = tokenBase;
                    return ret("jsonld-keyword", "meta");
                }
                while ((next = stream.next()) != null) {
                    if (next == quote && !escaped) break;
                    escaped = !escaped && next == "\\";
                }
                if (!escaped) state.tokenize = tokenBase;
                return ret("string", "string");
            };
        }
        function tokenComment(stream, state) {
            var maybeEnd = false, ch;
            while (ch = stream.next()) {
                if (ch == "/" && maybeEnd) {
                    state.tokenize = tokenBase;
                    break;
                }
                maybeEnd = ch == "*";
            }
            return ret("comment", "comment");
        }
        function tokenQuasi(stream, state) {
            var escaped = false, next;
            while ((next = stream.next()) != null) {
                if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
                    state.tokenize = tokenBase;
                    break;
                }
                escaped = !escaped && next == "\\";
            }
            return ret("quasi", "string-2", stream.current());
        }
        var brackets = "([{}])";
        function findFatArrow(stream, state) {
            if (state.fatArrowAt) state.fatArrowAt = null;
            var arrow = stream.string.indexOf("=>", stream.start);
            if (arrow < 0) return;
            var depth = 0, sawSomething = false;
            for (var pos = arrow - 1; pos >= 0; --pos) {
                var ch = stream.string.charAt(pos);
                var bracket = brackets.indexOf(ch);
                if (bracket >= 0 && bracket < 3) {
                    if (!depth) {
                        ++pos;
                        break;
                    }
                    if (--depth == 0) break;
                } else if (bracket >= 3 && bracket < 6) {
                    ++depth;
                } else if (/[$\w]/.test(ch)) {
                    sawSomething = true;
                } else if (sawSomething && !depth) {
                    ++pos;
                    break;
                }
            }
            if (sawSomething && !depth) state.fatArrowAt = pos;
        }
        var atomicTypes = {
            atom: true,
            number: true,
            variable: true,
            string: true,
            regexp: true,
            "this": true,
            "jsonld-keyword": true
        };
        function JSLexical(indented, column, type, align, prev, info) {
            this.indented = indented;
            this.column = column;
            this.type = type;
            this.prev = prev;
            this.info = info;
            if (align != null) this.align = align;
        }
        function inScope(state, varname) {
            for (var v = state.localVars; v; v = v.next) if (v.name == varname) return true;
            for (var cx = state.context; cx; cx = cx.prev) {
                for (var v = cx.vars; v; v = v.next) if (v.name == varname) return true;
            }
        }
        function parseJS(state, style, type, content, stream) {
            var cc = state.cc;
            cx.state = state;
            cx.stream = stream;
            cx.marked = null, cx.cc = cc;
            if (!state.lexical.hasOwnProperty("align")) state.lexical.align = true;
            while (true) {
                var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
                if (combinator(type, content)) {
                    while (cc.length && cc[cc.length - 1].lex) cc.pop()();
                    if (cx.marked) return cx.marked;
                    if (type == "variable" && inScope(state, content)) return "variable-2";
                    return style;
                }
            }
        }
        var cx = {
            state: null,
            column: null,
            marked: null,
            cc: null
        };
        function pass() {
            for (var i = arguments.length - 1; i >= 0; i--) cx.cc.push(arguments[i]);
        }
        function cont() {
            pass.apply(null, arguments);
            return true;
        }
        function register(varname) {
            function inList(list) {
                for (var v = list; v; v = v.next) if (v.name == varname) return true;
                return false;
            }
            var state = cx.state;
            if (state.context) {
                cx.marked = "def";
                if (inList(state.localVars)) return;
                state.localVars = {
                    name: varname,
                    next: state.localVars
                };
            } else {
                if (inList(state.globalVars)) return;
                if (parserConfig.globalVars) state.globalVars = {
                    name: varname,
                    next: state.globalVars
                };
            }
        }
        var defaultVars = {
            name: "this",
            next: {
                name: "arguments"
            }
        };
        function pushcontext() {
            cx.state.context = {
                prev: cx.state.context,
                vars: cx.state.localVars
            };
            cx.state.localVars = defaultVars;
        }
        function popcontext() {
            cx.state.localVars = cx.state.context.vars;
            cx.state.context = cx.state.context.prev;
        }
        function pushlex(type, info) {
            var result = function() {
                var state = cx.state, indent = state.indented;
                if (state.lexical.type == "stat") indent = state.lexical.indented;
                state.lexical = new JSLexical(indent, cx.stream.column(), type, null, state.lexical, info);
            };
            result.lex = true;
            return result;
        }
        function poplex() {
            var state = cx.state;
            if (state.lexical.prev) {
                if (state.lexical.type == ")") state.indented = state.lexical.indented;
                state.lexical = state.lexical.prev;
            }
        }
        poplex.lex = true;
        function expect(wanted) {
            function exp(type) {
                if (type == wanted) return cont(); else if (wanted == ";") return pass(); else return cont(exp);
            }
            return exp;
        }
        function statement(type, value) {
            if (type == "var") return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex);
            if (type == "keyword a") return cont(pushlex("form"), expression, statement, poplex);
            if (type == "keyword b") return cont(pushlex("form"), statement, poplex);
            if (type == "{") return cont(pushlex("}"), block, poplex);
            if (type == ";") return cont();
            if (type == "if") return cont(pushlex("form"), expression, statement, poplex, maybeelse);
            if (type == "function") return cont(functiondef);
            if (type == "for") return cont(pushlex("form"), forspec, statement, poplex);
            if (type == "variable") return cont(pushlex("stat"), maybelabel);
            if (type == "switch") return cont(pushlex("form"), expression, pushlex("}", "switch"), expect("{"), block, poplex, poplex);
            if (type == "case") return cont(expression, expect(":"));
            if (type == "default") return cont(expect(":"));
            if (type == "catch") return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"), statement, poplex, popcontext);
            if (type == "module") return cont(pushlex("form"), pushcontext, afterModule, popcontext, poplex);
            if (type == "class") return cont(pushlex("form"), className, objlit, poplex);
            if (type == "export") return cont(pushlex("form"), afterExport, poplex);
            if (type == "import") return cont(pushlex("form"), afterImport, poplex);
            return pass(pushlex("stat"), expression, expect(";"), poplex);
        }
        function expression(type) {
            return expressionInner(type, false);
        }
        function expressionNoComma(type) {
            return expressionInner(type, true);
        }
        function expressionInner(type, noComma) {
            if (cx.state.fatArrowAt == cx.stream.start) {
                var body = noComma ? arrowBodyNoComma : arrowBody;
                if (type == "(") return cont(pushcontext, pushlex(")"), commasep(pattern, ")"), poplex, expect("=>"), body, popcontext); else if (type == "variable") return pass(pushcontext, pattern, expect("=>"), body, popcontext);
            }
            var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
            if (atomicTypes.hasOwnProperty(type)) return cont(maybeop);
            if (type == "function") return cont(functiondef);
            if (type == "keyword c") return cont(noComma ? maybeexpressionNoComma : maybeexpression);
            if (type == "(") return cont(pushlex(")"), maybeexpression, comprehension, expect(")"), poplex, maybeop);
            if (type == "operator" || type == "spread") return cont(noComma ? expressionNoComma : expression);
            if (type == "[") return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
            if (type == "{") return contCommasep(objprop, "}", null, maybeop);
            return cont();
        }
        function maybeexpression(type) {
            if (type.match(/[;\}\)\],]/)) return pass();
            return pass(expression);
        }
        function maybeexpressionNoComma(type) {
            if (type.match(/[;\}\)\],]/)) return pass();
            return pass(expressionNoComma);
        }
        function maybeoperatorComma(type, value) {
            if (type == ",") return cont(expression);
            return maybeoperatorNoComma(type, value, false);
        }
        function maybeoperatorNoComma(type, value, noComma) {
            var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
            var expr = noComma == false ? expression : expressionNoComma;
            if (value == "=>") return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
            if (type == "operator") {
                if (/\+\+|--/.test(value)) return cont(me);
                if (value == "?") return cont(expression, expect(":"), expr);
                return cont(expr);
            }
            if (type == "quasi") {
                cx.cc.push(me);
                return quasi(value);
            }
            if (type == ";") return;
            if (type == "(") return contCommasep(expressionNoComma, ")", "call", me);
            if (type == ".") return cont(property, me);
            if (type == "[") return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
        }
        function quasi(value) {
            if (value.slice(value.length - 2) != "${") return cont();
            return cont(expression, continueQuasi);
        }
        function continueQuasi(type) {
            if (type == "}") {
                cx.marked = "string-2";
                cx.state.tokenize = tokenQuasi;
                return cont();
            }
        }
        function arrowBody(type) {
            findFatArrow(cx.stream, cx.state);
            if (type == "{") return pass(statement);
            return pass(expression);
        }
        function arrowBodyNoComma(type) {
            findFatArrow(cx.stream, cx.state);
            if (type == "{") return pass(statement);
            return pass(expressionNoComma);
        }
        function maybelabel(type) {
            if (type == ":") return cont(poplex, statement);
            return pass(maybeoperatorComma, expect(";"), poplex);
        }
        function property(type) {
            if (type == "variable") {
                cx.marked = "property";
                return cont();
            }
        }
        function objprop(type, value) {
            if (type == "variable") {
                cx.marked = "property";
                if (value == "get" || value == "set") return cont(getterSetter);
            } else if (type == "number" || type == "string") {
                cx.marked = jsonldMode ? "property" : type + " property";
            } else if (type == "[") {
                return cont(expression, expect("]"), afterprop);
            }
            if (atomicTypes.hasOwnProperty(type)) return cont(afterprop);
        }
        function getterSetter(type) {
            if (type != "variable") return pass(afterprop);
            cx.marked = "property";
            return cont(functiondef);
        }
        function afterprop(type) {
            if (type == ":") return cont(expressionNoComma);
            if (type == "(") return pass(functiondef);
        }
        function commasep(what, end) {
            function proceed(type) {
                if (type == ",") {
                    var lex = cx.state.lexical;
                    if (lex.info == "call") lex.pos = (lex.pos || 0) + 1;
                    return cont(what, proceed);
                }
                if (type == end) return cont();
                return cont(expect(end));
            }
            return function(type) {
                if (type == end) return cont();
                return pass(what, proceed);
            };
        }
        function contCommasep(what, end, info) {
            for (var i = 3; i < arguments.length; i++) cx.cc.push(arguments[i]);
            return cont(pushlex(end, info), commasep(what, end), poplex);
        }
        function block(type) {
            if (type == "}") return cont();
            return pass(statement, block);
        }
        function maybetype(type) {
            if (isTS && type == ":") return cont(typedef);
        }
        function typedef(type) {
            if (type == "variable") {
                cx.marked = "variable-3";
                return cont();
            }
        }
        function vardef() {
            return pass(pattern, maybetype, maybeAssign, vardefCont);
        }
        function pattern(type, value) {
            if (type == "variable") {
                register(value);
                return cont();
            }
            if (type == "[") return contCommasep(pattern, "]");
            if (type == "{") return contCommasep(proppattern, "}");
        }
        function proppattern(type, value) {
            if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
                register(value);
                return cont(maybeAssign);
            }
            if (type == "variable") cx.marked = "property";
            return cont(expect(":"), pattern, maybeAssign);
        }
        function maybeAssign(_type, value) {
            if (value == "=") return cont(expressionNoComma);
        }
        function vardefCont(type) {
            if (type == ",") return cont(vardef);
        }
        function maybeelse(type, value) {
            if (type == "keyword b" && value == "else") return cont(pushlex("form"), statement, poplex);
        }
        function forspec(type) {
            if (type == "(") return cont(pushlex(")"), forspec1, expect(")"), poplex);
        }
        function forspec1(type) {
            if (type == "var") return cont(vardef, expect(";"), forspec2);
            if (type == ";") return cont(forspec2);
            if (type == "variable") return cont(formaybeinof);
            return pass(expression, expect(";"), forspec2);
        }
        function formaybeinof(_type, value) {
            if (value == "in" || value == "of") {
                cx.marked = "keyword";
                return cont(expression);
            }
            return cont(maybeoperatorComma, forspec2);
        }
        function forspec2(type, value) {
            if (type == ";") return cont(forspec3);
            if (value == "in" || value == "of") {
                cx.marked = "keyword";
                return cont(expression);
            }
            return pass(expression, expect(";"), forspec3);
        }
        function forspec3(type) {
            if (type != ")") cont(expression);
        }
        function functiondef(type, value) {
            if (value == "*") {
                cx.marked = "keyword";
                return cont(functiondef);
            }
            if (type == "variable") {
                register(value);
                return cont(functiondef);
            }
            if (type == "(") return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, statement, popcontext);
        }
        function funarg(type) {
            if (type == "spread") return cont(funarg);
            return pass(pattern, maybetype);
        }
        function className(type, value) {
            if (type == "variable") {
                register(value);
                return cont(classNameAfter);
            }
        }
        function classNameAfter(_type, value) {
            if (value == "extends") return cont(expression);
        }
        function objlit(type) {
            if (type == "{") return contCommasep(objprop, "}");
        }
        function afterModule(type, value) {
            if (type == "string") return cont(statement);
            if (type == "variable") {
                register(value);
                return cont(maybeFrom);
            }
        }
        function afterExport(_type, value) {
            if (value == "*") {
                cx.marked = "keyword";
                return cont(maybeFrom, expect(";"));
            }
            if (value == "default") {
                cx.marked = "keyword";
                return cont(expression, expect(";"));
            }
            return pass(statement);
        }
        function afterImport(type) {
            if (type == "string") return cont();
            return pass(importSpec, maybeFrom);
        }
        function importSpec(type, value) {
            if (type == "{") return contCommasep(importSpec, "}");
            if (type == "variable") register(value);
            return cont();
        }
        function maybeFrom(_type, value) {
            if (value == "from") {
                cx.marked = "keyword";
                return cont(expression);
            }
        }
        function arrayLiteral(type) {
            if (type == "]") return cont();
            return pass(expressionNoComma, maybeArrayComprehension);
        }
        function maybeArrayComprehension(type) {
            if (type == "for") return pass(comprehension, expect("]"));
            if (type == ",") return cont(commasep(expressionNoComma, "]"));
            return pass(commasep(expressionNoComma, "]"));
        }
        function comprehension(type) {
            if (type == "for") return cont(forspec, comprehension);
            if (type == "if") return cont(expression, comprehension);
        }
        return {
            startState: function(basecolumn) {
                var state = {
                    tokenize: tokenBase,
                    lastType: "sof",
                    cc: [],
                    lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
                    localVars: parserConfig.localVars,
                    context: parserConfig.localVars && {
                        vars: parserConfig.localVars
                    },
                    indented: 0
                };
                if (parserConfig.globalVars && typeof parserConfig.globalVars == "object") state.globalVars = parserConfig.globalVars;
                return state;
            },
            token: function(stream, state) {
                if (stream.sol()) {
                    if (!state.lexical.hasOwnProperty("align")) state.lexical.align = false;
                    state.indented = stream.indentation();
                    findFatArrow(stream, state);
                }
                if (state.tokenize != tokenComment && stream.eatSpace()) return null;
                var style = state.tokenize(stream, state);
                if (type == "comment") return style;
                state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
                return parseJS(state, style, type, content, stream);
            },
            indent: function(state, textAfter) {
                if (state.tokenize == tokenComment) return CodeMirror.Pass;
                if (state.tokenize != tokenBase) return 0;
                var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical;
                for (var i = state.cc.length - 1; i >= 0; --i) {
                    var c = state.cc[i];
                    if (c == poplex) lexical = lexical.prev; else if (c != maybeelse) break;
                }
                if (lexical.type == "stat" && firstChar == "}") lexical = lexical.prev;
                if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat") lexical = lexical.prev;
                var type = lexical.type, closing = firstChar == type;
                if (type == "vardef") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info + 1 : 0); else if (type == "form" && firstChar == "{") return lexical.indented; else if (type == "form") return lexical.indented + indentUnit; else if (type == "stat") return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? statementIndent || indentUnit : 0); else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false) return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit); else if (lexical.align) return lexical.column + (closing ? 0 : 1); else return lexical.indented + (closing ? 0 : indentUnit);
            },
            electricChars: ":{}",
            blockCommentStart: jsonMode ? null : "/*",
            blockCommentEnd: jsonMode ? null : "*/",
            lineComment: jsonMode ? null : "//",
            fold: "brace",
            helperType: jsonMode ? "json" : "javascript",
            jsonldMode: jsonldMode,
            jsonMode: jsonMode
        };
    });
    CodeMirror.defineMIME("text/javascript", "javascript");
    CodeMirror.defineMIME("text/ecmascript", "javascript");
    CodeMirror.defineMIME("application/javascript", "javascript");
    CodeMirror.defineMIME("application/ecmascript", "javascript");
    CodeMirror.defineMIME("application/json", {
        name: "javascript",
        json: true
    });
    CodeMirror.defineMIME("application/x-json", {
        name: "javascript",
        json: true
    });
    CodeMirror.defineMIME("application/ld+json", {
        name: "javascript",
        jsonld: true
    });
    CodeMirror.defineMIME("text/typescript", {
        name: "javascript",
        typescript: true
    });
    CodeMirror.defineMIME("application/typescript", {
        name: "javascript",
        typescript: true
    });
});

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("../../lib/codemirror")); else if (typeof define == "function" && define.amd) define([ "../../lib/codemirror" ], mod); else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
    var GUTTER_ID = "CodeMirror-lint-markers";
    var SEVERITIES = /^(?:error|warning)$/;
    function showTooltip(e, content) {
        var tt = document.createElement("div");
        tt.className = "CodeMirror-lint-tooltip";
        tt.appendChild(content.cloneNode(true));
        document.body.appendChild(tt);
        function position(e) {
            if (!tt.parentNode) return CodeMirror.off(document, "mousemove", position);
            tt.style.top = Math.max(0, e.clientY - tt.offsetHeight - 5) + "px";
            tt.style.left = e.clientX + 5 + "px";
        }
        CodeMirror.on(document, "mousemove", position);
        position(e);
        if (tt.style.opacity != null) tt.style.opacity = 1;
        return tt;
    }
    function rm(elt) {
        if (elt.parentNode) elt.parentNode.removeChild(elt);
    }
    function hideTooltip(tt) {
        if (!tt.parentNode) return;
        if (tt.style.opacity == null) rm(tt);
        tt.style.opacity = 0;
        setTimeout(function() {
            rm(tt);
        }, 600);
    }
    function showTooltipFor(e, content, node) {
        var tooltip = showTooltip(e, content);
        function hide() {
            CodeMirror.off(node, "mouseout", hide);
            if (tooltip) {
                hideTooltip(tooltip);
                tooltip = null;
            }
        }
        var poll = setInterval(function() {
            if (tooltip) for (var n = node; ;n = n.parentNode) {
                if (n == document.body) return;
                if (!n) {
                    hide();
                    break;
                }
            }
            if (!tooltip) return clearInterval(poll);
        }, 400);
        CodeMirror.on(node, "mouseout", hide);
    }
    function LintState(cm, options, hasGutter) {
        this.marked = [];
        this.options = options;
        this.timeout = null;
        this.hasGutter = hasGutter;
        this.onMouseOver = function(e) {
            onMouseOver(cm, e);
        };
    }
    function parseOptions(cm, options) {
        if (options instanceof Function) return {
            getAnnotations: options
        };
        if (!options || options === true) options = {};
        if (!options.getAnnotations) options.getAnnotations = cm.getHelper(CodeMirror.Pos(0, 0), "lint");
        if (!options.getAnnotations) throw new Error("Required option 'getAnnotations' missing (lint addon)");
        return options;
    }
    function clearMarks(cm) {
        var state = cm.state.lint;
        if (state.hasGutter) cm.clearGutter(GUTTER_ID);
        for (var i = 0; i < state.marked.length; ++i) state.marked[i].clear();
        state.marked.length = 0;
    }
    function makeMarker(labels, severity, multiple, tooltips) {
        var marker = document.createElement("div"), inner = marker;
        marker.className = "CodeMirror-lint-marker-" + severity;
        if (multiple) {
            inner = marker.appendChild(document.createElement("div"));
            inner.className = "CodeMirror-lint-marker-multiple";
        }
        if (tooltips != false) CodeMirror.on(inner, "mouseover", function(e) {
            showTooltipFor(e, labels, inner);
        });
        return marker;
    }
    function getMaxSeverity(a, b) {
        if (a == "error") return a; else return b;
    }
    function groupByLine(annotations) {
        var lines = [];
        for (var i = 0; i < annotations.length; ++i) {
            var ann = annotations[i], line = ann.from.line;
            (lines[line] || (lines[line] = [])).push(ann);
        }
        return lines;
    }
    function annotationTooltip(ann) {
        var severity = ann.severity;
        if (!SEVERITIES.test(severity)) severity = "error";
        var tip = document.createElement("div");
        tip.className = "CodeMirror-lint-message-" + severity;
        tip.appendChild(document.createTextNode(ann.message));
        return tip;
    }
    function startLinting(cm) {
        var state = cm.state.lint, options = state.options;
        if (options.async) options.getAnnotations(cm, updateLinting, options); else updateLinting(cm, options.getAnnotations(cm.getValue(), options.options));
    }
    function updateLinting(cm, annotationsNotSorted) {
        clearMarks(cm);
        var state = cm.state.lint, options = state.options;
        var annotations = groupByLine(annotationsNotSorted);
        for (var line = 0; line < annotations.length; ++line) {
            var anns = annotations[line];
            if (!anns) continue;
            var maxSeverity = null;
            var tipLabel = state.hasGutter && document.createDocumentFragment();
            for (var i = 0; i < anns.length; ++i) {
                var ann = anns[i];
                var severity = ann.severity;
                if (!SEVERITIES.test(severity)) severity = "error";
                maxSeverity = getMaxSeverity(maxSeverity, severity);
                if (options.formatAnnotation) ann = options.formatAnnotation(ann);
                if (state.hasGutter) tipLabel.appendChild(annotationTooltip(ann));
                if (ann.to) state.marked.push(cm.markText(ann.from, ann.to, {
                    className: "CodeMirror-lint-mark-" + severity,
                    __annotation: ann
                }));
            }
            if (state.hasGutter) cm.setGutterMarker(line, GUTTER_ID, makeMarker(tipLabel, maxSeverity, anns.length > 1, state.options.tooltips));
        }
        if (options.onUpdateLinting) options.onUpdateLinting(annotationsNotSorted, annotations, cm);
    }
    function onChange(cm) {
        var state = cm.state.lint;
        clearTimeout(state.timeout);
        state.timeout = setTimeout(function() {
            startLinting(cm);
        }, state.options.delay || 500);
    }
    function popupSpanTooltip(ann, e) {
        var target = e.target || e.srcElement;
        showTooltipFor(e, annotationTooltip(ann), target);
    }
    var nearby = [ 0, 0, 0, 5, 0, -5, 5, 0, -5, 0 ];
    function onMouseOver(cm, e) {
        if (!/\bCodeMirror-lint-mark-/.test((e.target || e.srcElement).className)) return;
        for (var i = 0; i < nearby.length; i += 2) {
            var spans = cm.findMarksAt(cm.coordsChar({
                left: e.clientX + nearby[i],
                top: e.clientY + nearby[i + 1]
            }));
            for (var j = 0; j < spans.length; ++j) {
                var span = spans[j], ann = span.__annotation;
                if (ann) return popupSpanTooltip(ann, e);
            }
        }
    }
    CodeMirror.defineOption("lint", false, function(cm, val, old) {
        if (old && old != CodeMirror.Init) {
            clearMarks(cm);
            cm.off("change", onChange);
            CodeMirror.off(cm.getWrapperElement(), "mouseover", cm.state.lint.onMouseOver);
            delete cm.state.lint;
        }
        if (val) {
            var gutters = cm.getOption("gutters"), hasLintGutter = false;
            for (var i = 0; i < gutters.length; ++i) if (gutters[i] == GUTTER_ID) hasLintGutter = true;
            var state = cm.state.lint = new LintState(cm, parseOptions(cm, val), hasLintGutter);
            cm.on("change", onChange);
            if (state.options.tooltips != false) CodeMirror.on(cm.getWrapperElement(), "mouseover", state.onMouseOver);
            startLinting(cm);
        }
    });
});

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("../../lib/codemirror")); else if (typeof define == "function" && define.amd) define([ "../../lib/codemirror" ], mod); else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
    var bogus = [ "Dangerous comment" ];
    var warnings = [ [ "Expected '{'", "Statement body should be inside '{ }' braces." ] ];
    var errors = [ "Missing semicolon", "Extra comma", "Missing property name", "Unmatched ", " and instead saw", " is not defined", "Unclosed string", "Stopping, unable to continue" ];
    function validator(text, options) {
        JSHINT(text, options);
        var errors = JSHINT.data().errors, result = [];
        if (errors) parseErrors(errors, result);
        return result;
    }
    CodeMirror.registerHelper("lint", "javascript", validator);
    function cleanup(error) {
        fixWith(error, warnings, "warning", true);
        fixWith(error, errors, "error");
        return isBogus(error) ? null : error;
    }
    function fixWith(error, fixes, severity, force) {
        var description, fix, find, replace, found;
        description = error.description;
        for (var i = 0; i < fixes.length; i++) {
            fix = fixes[i];
            find = typeof fix === "string" ? fix : fix[0];
            replace = typeof fix === "string" ? null : fix[1];
            found = description.indexOf(find) !== -1;
            if (force || found) {
                error.severity = severity;
            }
            if (found && replace) {
                error.description = replace;
            }
        }
    }
    function isBogus(error) {
        var description = error.description;
        for (var i = 0; i < bogus.length; i++) {
            if (description.indexOf(bogus[i]) !== -1) {
                return true;
            }
        }
        return false;
    }
    function parseErrors(errors, output) {
        for (var i = 0; i < errors.length; i++) {
            var error = errors[i];
            if (error) {
                var linetabpositions, index;
                linetabpositions = [];
                if (error.evidence) {
                    var tabpositions = linetabpositions[error.line];
                    if (!tabpositions) {
                        var evidence = error.evidence;
                        tabpositions = [];
                        Array.prototype.forEach.call(evidence, function(item, index) {
                            if (item === "	") {
                                tabpositions.push(index + 1);
                            }
                        });
                        linetabpositions[error.line] = tabpositions;
                    }
                    if (tabpositions.length > 0) {
                        var pos = error.character;
                        tabpositions.forEach(function(tabposition) {
                            if (pos > tabposition) pos -= 1;
                        });
                        error.character = pos;
                    }
                }
                var start = error.character - 1, end = start + 1;
                if (error.evidence) {
                    index = error.evidence.substring(start).search(/.\b/);
                    if (index > -1) {
                        end += index;
                    }
                }
                error.description = error.reason;
                error.start = error.character;
                error.end = end;
                error = cleanup(error);
                if (error) output.push({
                    message: error.description,
                    severity: error.severity,
                    from: CodeMirror.Pos(error.line - 1, start),
                    to: CodeMirror.Pos(error.line - 1, end)
                });
            }
        }
    }
});

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") mod(require("../../lib/codemirror")); else if (typeof define == "function" && define.amd) define([ "../../lib/codemirror" ], mod); else mod(CodeMirror);
})(function(CodeMirror) {
    "use strict";
    CodeMirror.registerHelper("lint", "json", function(text) {
        var found = [];
        jsonlint.parseError = function(str, hash) {
            var loc = hash.loc;
            found.push({
                from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
                to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
                message: str
            });
        };
        try {
            jsonlint.parse(text);
        } catch (e) {}
        return found;
    });
});

if (typeof YAHOO == "undefined" || !YAHOO) {
    var YAHOO = {};
}

YAHOO.namespace = function() {
    var b = arguments, g = null, e, c, f;
    for (e = 0; e < b.length; e = e + 1) {
        f = ("" + b[e]).split(".");
        g = YAHOO;
        for (c = f[0] == "YAHOO" ? 1 : 0; c < f.length; c = c + 1) {
            g[f[c]] = g[f[c]] || {};
            g = g[f[c]];
        }
    }
    return g;
};

YAHOO.log = function(d, a, c) {
    var b = YAHOO.widget.Logger;
    if (b && b.log) {
        return b.log(d, a, c);
    } else {
        return false;
    }
};

YAHOO.register = function(a, f, e) {
    var k = YAHOO.env.modules, c, j, h, g, d;
    if (!k[a]) {
        k[a] = {
            versions: [],
            builds: []
        };
    }
    c = k[a];
    j = e.version;
    h = e.build;
    g = YAHOO.env.listeners;
    c.name = a;
    c.version = j;
    c.build = h;
    c.versions.push(j);
    c.builds.push(h);
    c.mainClass = f;
    for (d = 0; d < g.length; d = d + 1) {
        g[d](c);
    }
    if (f) {
        f.VERSION = j;
        f.BUILD = h;
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

YAHOO.env.parseUA = function(d) {
    var e = function(i) {
        var j = 0;
        return parseFloat(i.replace(/\./g, function() {
            return j++ == 1 ? "" : ".";
        }));
    }, h = navigator, g = {
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
        caja: h && h.cajaVersion,
        secure: false,
        os: null
    }, c = d || navigator && navigator.userAgent, f = window && window.location, b = f && f.href, a;
    g.secure = b && b.toLowerCase().indexOf("https") === 0;
    if (c) {
        if (/windows|win32/i.test(c)) {
            g.os = "windows";
        } else {
            if (/macintosh/i.test(c)) {
                g.os = "macintosh";
            } else {
                if (/rhino/i.test(c)) {
                    g.os = "rhino";
                }
            }
        }
        if (/KHTML/.test(c)) {
            g.webkit = 1;
        }
        a = c.match(/AppleWebKit\/([^\s]*)/);
        if (a && a[1]) {
            g.webkit = e(a[1]);
            if (/ Mobile\//.test(c)) {
                g.mobile = "Apple";
                a = c.match(/OS ([^\s]*)/);
                if (a && a[1]) {
                    a = e(a[1].replace("_", "."));
                }
                g.ios = a;
                g.ipad = g.ipod = g.iphone = 0;
                a = c.match(/iPad|iPod|iPhone/);
                if (a && a[0]) {
                    g[a[0].toLowerCase()] = g.ios;
                }
            } else {
                a = c.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (a) {
                    g.mobile = a[0];
                }
                if (/webOS/.test(c)) {
                    g.mobile = "WebOS";
                    a = c.match(/webOS\/([^\s]*);/);
                    if (a && a[1]) {
                        g.webos = e(a[1]);
                    }
                }
                if (/ Android/.test(c)) {
                    g.mobile = "Android";
                    a = c.match(/Android ([^\s]*);/);
                    if (a && a[1]) {
                        g.android = e(a[1]);
                    }
                }
            }
            a = c.match(/Chrome\/([^\s]*)/);
            if (a && a[1]) {
                g.chrome = e(a[1]);
            } else {
                a = c.match(/AdobeAIR\/([^\s]*)/);
                if (a) {
                    g.air = a[0];
                }
            }
        }
        if (!g.webkit) {
            a = c.match(/Opera[\s\/]([^\s]*)/);
            if (a && a[1]) {
                g.opera = e(a[1]);
                a = c.match(/Version\/([^\s]*)/);
                if (a && a[1]) {
                    g.opera = e(a[1]);
                }
                a = c.match(/Opera Mini[^;]*/);
                if (a) {
                    g.mobile = a[0];
                }
            } else {
                a = c.match(/MSIE\s([^;]*)/);
                if (a && a[1]) {
                    g.ie = e(a[1]);
                } else {
                    a = c.match(/Gecko\/([^\s]*)/);
                    if (a) {
                        g.gecko = 1;
                        a = c.match(/rv:([^\s\)]*)/);
                        if (a && a[1]) {
                            g.gecko = e(a[1]);
                        }
                    }
                }
            }
        }
    }
    return g;
};

YAHOO.env.ua = YAHOO.env.parseUA();

(function() {
    YAHOO.namespace("util", "widget", "example");
    if ("undefined" !== typeof YAHOO_config) {
        var b = YAHOO_config.listener, a = YAHOO.env.listeners, d = true, c;
        if (b) {
            for (c = 0; c < a.length; c++) {
                if (a[c] == b) {
                    d = false;
                    break;
                }
            }
            if (d) {
                a.push(b);
            }
        }
    }
})();

YAHOO.lang = YAHOO.lang || {};

(function() {
    var f = YAHOO.lang, a = Object.prototype, c = "[object Array]", h = "[object Function]", i = "[object Object]", b = [], g = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
        "`": "&#x60;"
    }, d = [ "toString", "valueOf" ], e = {
        isArray: function(j) {
            return a.toString.apply(j) === c;
        },
        isBoolean: function(j) {
            return typeof j === "boolean";
        },
        isFunction: function(j) {
            return typeof j === "function" || a.toString.apply(j) === h;
        },
        isNull: function(j) {
            return j === null;
        },
        isNumber: function(j) {
            return typeof j === "number" && isFinite(j);
        },
        isObject: function(j) {
            return j && (typeof j === "object" || f.isFunction(j)) || false;
        },
        isString: function(j) {
            return typeof j === "string";
        },
        isUndefined: function(j) {
            return typeof j === "undefined";
        },
        _IEEnumFix: YAHOO.env.ua.ie ? function(l, k) {
            var j, n, m;
            for (j = 0; j < d.length; j = j + 1) {
                n = d[j];
                m = k[n];
                if (f.isFunction(m) && m != a[n]) {
                    l[n] = m;
                }
            }
        } : function() {},
        escapeHTML: function(j) {
            return j.replace(/[&<>"'\/`]/g, function(k) {
                return g[k];
            });
        },
        extend: function(m, n, l) {
            if (!n || !m) {
                throw new Error("extend failed, please check that " + "all dependencies are included.");
            }
            var k = function() {}, j;
            k.prototype = n.prototype;
            m.prototype = new k();
            m.prototype.constructor = m;
            m.superclass = n.prototype;
            if (n.prototype.constructor == a.constructor) {
                n.prototype.constructor = n;
            }
            if (l) {
                for (j in l) {
                    if (f.hasOwnProperty(l, j)) {
                        m.prototype[j] = l[j];
                    }
                }
                f._IEEnumFix(m.prototype, l);
            }
        },
        augmentObject: function(n, m) {
            if (!m || !n) {
                throw new Error("Absorb failed, verify dependencies.");
            }
            var j = arguments, l, o, k = j[2];
            if (k && k !== true) {
                for (l = 2; l < j.length; l = l + 1) {
                    n[j[l]] = m[j[l]];
                }
            } else {
                for (o in m) {
                    if (k || !(o in n)) {
                        n[o] = m[o];
                    }
                }
                f._IEEnumFix(n, m);
            }
            return n;
        },
        augmentProto: function(m, l) {
            if (!l || !m) {
                throw new Error("Augment failed, verify dependencies.");
            }
            var j = [ m.prototype, l.prototype ], k;
            for (k = 2; k < arguments.length; k = k + 1) {
                j.push(arguments[k]);
            }
            f.augmentObject.apply(this, j);
            return m;
        },
        dump: function(j, p) {
            var l, n, r = [], t = "{...}", k = "f(){...}", q = ", ", m = " => ";
            if (!f.isObject(j)) {
                return j + "";
            } else {
                if (j instanceof Date || "nodeType" in j && "tagName" in j) {
                    return j;
                } else {
                    if (f.isFunction(j)) {
                        return k;
                    }
                }
            }
            p = f.isNumber(p) ? p : 3;
            if (f.isArray(j)) {
                r.push("[");
                for (l = 0, n = j.length; l < n; l = l + 1) {
                    if (f.isObject(j[l])) {
                        r.push(p > 0 ? f.dump(j[l], p - 1) : t);
                    } else {
                        r.push(j[l]);
                    }
                    r.push(q);
                }
                if (r.length > 1) {
                    r.pop();
                }
                r.push("]");
            } else {
                r.push("{");
                for (l in j) {
                    if (f.hasOwnProperty(j, l)) {
                        r.push(l + m);
                        if (f.isObject(j[l])) {
                            r.push(p > 0 ? f.dump(j[l], p - 1) : t);
                        } else {
                            r.push(j[l]);
                        }
                        r.push(q);
                    }
                }
                if (r.length > 1) {
                    r.pop();
                }
                r.push("}");
            }
            return r.join("");
        },
        substitute: function(x, y, E, l) {
            var D, C, B, G, t, u, F = [], p, z = x.length, A = "dump", r = " ", q = "{", m = "}", n, w;
            for (;;) {
                D = x.lastIndexOf(q, z);
                if (D < 0) {
                    break;
                }
                C = x.indexOf(m, D);
                if (D + 1 > C) {
                    break;
                }
                p = x.substring(D + 1, C);
                G = p;
                u = null;
                B = G.indexOf(r);
                if (B > -1) {
                    u = G.substring(B + 1);
                    G = G.substring(0, B);
                }
                t = y[G];
                if (E) {
                    t = E(G, t, u);
                }
                if (f.isObject(t)) {
                    if (f.isArray(t)) {
                        t = f.dump(t, parseInt(u, 10));
                    } else {
                        u = u || "";
                        n = u.indexOf(A);
                        if (n > -1) {
                            u = u.substring(4);
                        }
                        w = t.toString();
                        if (w === i || n > -1) {
                            t = f.dump(t, parseInt(u, 10));
                        } else {
                            t = w;
                        }
                    }
                } else {
                    if (!f.isString(t) && !f.isNumber(t)) {
                        t = "~-" + F.length + "-~";
                        F[F.length] = p;
                    }
                }
                x = x.substring(0, D) + t + x.substring(C + 1);
                if (l === false) {
                    z = D - 1;
                }
            }
            for (D = F.length - 1; D >= 0; D = D - 1) {
                x = x.replace(new RegExp("~-" + D + "-~"), "{" + F[D] + "}", "g");
            }
            return x;
        },
        trim: function(j) {
            try {
                return j.replace(/^\s+|\s+$/g, "");
            } catch (k) {
                return j;
            }
        },
        merge: function() {
            var n = {}, k = arguments, j = k.length, m;
            for (m = 0; m < j; m = m + 1) {
                f.augmentObject(n, k[m], true);
            }
            return n;
        },
        later: function(t, k, u, n, p) {
            t = t || 0;
            k = k || {};
            var l = u, s = n, q, j;
            if (f.isString(u)) {
                l = k[u];
            }
            if (!l) {
                throw new TypeError("method undefined");
            }
            if (!f.isUndefined(n) && !f.isArray(s)) {
                s = [ n ];
            }
            q = function() {
                l.apply(k, s || b);
            };
            j = p ? setInterval(q, t) : setTimeout(q, t);
            return {
                interval: p,
                cancel: function() {
                    if (this.interval) {
                        clearInterval(j);
                    } else {
                        clearTimeout(j);
                    }
                }
            };
        },
        isValue: function(j) {
            return f.isObject(j) || f.isString(j) || f.isNumber(j) || f.isBoolean(j);
        }
    };
    f.hasOwnProperty = a.hasOwnProperty ? function(j, k) {
        return j && j.hasOwnProperty && j.hasOwnProperty(k);
    } : function(j, k) {
        return !f.isUndefined(j[k]) && j.constructor.prototype[k] !== j[k];
    };
    e.augmentObject(f, e, true);
    YAHOO.util.Lang = f;
    f.augment = f.augmentProto;
    YAHOO.augment = f.augmentProto;
    YAHOO.extend = f.extend;
})();

YAHOO.register("yahoo", YAHOO, {
    version: "2.9.0",
    build: "2800"
});

var CryptoJS = CryptoJS || function(e, g) {
    var a = {};
    var b = a.lib = {};
    var j = b.Base = function() {
        function n() {}
        return {
            extend: function(p) {
                n.prototype = this;
                var o = new n();
                if (p) {
                    o.mixIn(p);
                }
                if (!o.hasOwnProperty("init")) {
                    o.init = function() {
                        o.$super.init.apply(this, arguments);
                    };
                }
                o.init.prototype = o;
                o.$super = this;
                return o;
            },
            create: function() {
                var o = this.extend();
                o.init.apply(o, arguments);
                return o;
            },
            init: function() {},
            mixIn: function(p) {
                for (var o in p) {
                    if (p.hasOwnProperty(o)) {
                        this[o] = p[o];
                    }
                }
                if (p.hasOwnProperty("toString")) {
                    this.toString = p.toString;
                }
            },
            clone: function() {
                return this.init.prototype.extend(this);
            }
        };
    }();
    var l = b.WordArray = j.extend({
        init: function(o, n) {
            o = this.words = o || [];
            if (n != g) {
                this.sigBytes = n;
            } else {
                this.sigBytes = o.length * 4;
            }
        },
        toString: function(n) {
            return (n || h).stringify(this);
        },
        concat: function(t) {
            var q = this.words;
            var p = t.words;
            var n = this.sigBytes;
            var s = t.sigBytes;
            this.clamp();
            if (n % 4) {
                for (var r = 0; r < s; r++) {
                    var o = p[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                    q[n + r >>> 2] |= o << 24 - (n + r) % 4 * 8;
                }
            } else {
                for (var r = 0; r < s; r += 4) {
                    q[n + r >>> 2] = p[r >>> 2];
                }
            }
            this.sigBytes += s;
            return this;
        },
        clamp: function() {
            var o = this.words;
            var n = this.sigBytes;
            o[n >>> 2] &= 4294967295 << 32 - n % 4 * 8;
            o.length = e.ceil(n / 4);
        },
        clone: function() {
            var n = j.clone.call(this);
            n.words = this.words.slice(0);
            return n;
        },
        random: function(p) {
            var o = [];
            for (var n = 0; n < p; n += 4) {
                o.push(e.random() * 4294967296 | 0);
            }
            return new l.init(o, p);
        }
    });
    var m = a.enc = {};
    var h = m.Hex = {
        stringify: function(p) {
            var r = p.words;
            var o = p.sigBytes;
            var q = [];
            for (var n = 0; n < o; n++) {
                var s = r[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                q.push((s >>> 4).toString(16));
                q.push((s & 15).toString(16));
            }
            return q.join("");
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o += 2) {
                q[o >>> 3] |= parseInt(p.substr(o, 2), 16) << 24 - o % 8 * 4;
            }
            return new l.init(q, n / 2);
        }
    };
    var d = m.Latin1 = {
        stringify: function(q) {
            var r = q.words;
            var p = q.sigBytes;
            var n = [];
            for (var o = 0; o < p; o++) {
                var s = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                n.push(String.fromCharCode(s));
            }
            return n.join("");
        },
        parse: function(p) {
            var n = p.length;
            var q = [];
            for (var o = 0; o < n; o++) {
                q[o >>> 2] |= (p.charCodeAt(o) & 255) << 24 - o % 4 * 8;
            }
            return new l.init(q, n);
        }
    };
    var c = m.Utf8 = {
        stringify: function(n) {
            try {
                return decodeURIComponent(escape(d.stringify(n)));
            } catch (o) {
                throw new Error("Malformed UTF-8 data");
            }
        },
        parse: function(n) {
            return d.parse(unescape(encodeURIComponent(n)));
        }
    };
    var i = b.BufferedBlockAlgorithm = j.extend({
        reset: function() {
            this._data = new l.init();
            this._nDataBytes = 0;
        },
        _append: function(n) {
            if (typeof n == "string") {
                n = c.parse(n);
            }
            this._data.concat(n);
            this._nDataBytes += n.sigBytes;
        },
        _process: function(w) {
            var q = this._data;
            var x = q.words;
            var n = q.sigBytes;
            var t = this.blockSize;
            var v = t * 4;
            var u = n / v;
            if (w) {
                u = e.ceil(u);
            } else {
                u = e.max((u | 0) - this._minBufferSize, 0);
            }
            var s = u * t;
            var r = e.min(s * 4, n);
            if (s) {
                for (var p = 0; p < s; p += t) {
                    this._doProcessBlock(x, p);
                }
                var o = x.splice(0, s);
                q.sigBytes -= r;
            }
            return new l.init(o, r);
        },
        clone: function() {
            var n = j.clone.call(this);
            n._data = this._data.clone();
            return n;
        },
        _minBufferSize: 0
    });
    var f = b.Hasher = i.extend({
        cfg: j.extend(),
        init: function(n) {
            this.cfg = this.cfg.extend(n);
            this.reset();
        },
        reset: function() {
            i.reset.call(this);
            this._doReset();
        },
        update: function(n) {
            this._append(n);
            this._process();
            return this;
        },
        finalize: function(n) {
            if (n) {
                this._append(n);
            }
            var o = this._doFinalize();
            return o;
        },
        blockSize: 512 / 32,
        _createHelper: function(n) {
            return function(p, o) {
                return new n.init(o).finalize(p);
            };
        },
        _createHmacHelper: function(n) {
            return function(p, o) {
                return new k.HMAC.init(n, o).finalize(p);
            };
        }
    });
    var k = a.algo = {};
    return a;
}(Math);

(function(g) {
    var a = CryptoJS, f = a.lib, e = f.Base, h = f.WordArray, a = a.x64 = {};
    a.Word = e.extend({
        init: function(b, c) {
            this.high = b;
            this.low = c;
        }
    });
    a.WordArray = e.extend({
        init: function(b, c) {
            b = this.words = b || [];
            this.sigBytes = c != g ? c : 8 * b.length;
        },
        toX32: function() {
            for (var b = this.words, c = b.length, a = [], d = 0; d < c; d++) {
                var e = b[d];
                a.push(e.high);
                a.push(e.low);
            }
            return h.create(a, this.sigBytes);
        },
        clone: function() {
            for (var b = e.clone.call(this), c = b.words = this.words.slice(0), a = c.length, d = 0; d < a; d++) c[d] = c[d].clone();
            return b;
        }
    });
})();

(function() {
    var c = CryptoJS, k = c.enc.Utf8;
    c.algo.HMAC = c.lib.Base.extend({
        init: function(a, b) {
            a = this._hasher = new a.init();
            "string" == typeof b && (b = k.parse(b));
            var c = a.blockSize, e = 4 * c;
            b.sigBytes > e && (b = a.finalize(b));
            b.clamp();
            for (var f = this._oKey = b.clone(), g = this._iKey = b.clone(), h = f.words, j = g.words, d = 0; d < c; d++) h[d] ^= 1549556828, 
            j[d] ^= 909522486;
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

(function(k) {
    for (var g = CryptoJS, h = g.lib, v = h.WordArray, j = h.Hasher, h = g.algo, s = [], t = [], u = function(q) {
        return 4294967296 * (q - (q | 0)) | 0;
    }, l = 2, b = 0; 64 > b; ) {
        var d;
        a: {
            d = l;
            for (var w = k.sqrt(d), r = 2; r <= w; r++) if (!(d % r)) {
                d = !1;
                break a;
            }
            d = !0;
        }
        d && (8 > b && (s[b] = u(k.pow(l, .5))), t[b] = u(k.pow(l, 1 / 3)), b++);
        l++;
    }
    var n = [], h = h.SHA256 = j.extend({
        _doReset: function() {
            this._hash = new v.init(s.slice(0));
        },
        _doProcessBlock: function(q, h) {
            for (var a = this._hash.words, c = a[0], d = a[1], b = a[2], k = a[3], f = a[4], g = a[5], j = a[6], l = a[7], e = 0; 64 > e; e++) {
                if (16 > e) n[e] = q[h + e] | 0; else {
                    var m = n[e - 15], p = n[e - 2];
                    n[e] = ((m << 25 | m >>> 7) ^ (m << 14 | m >>> 18) ^ m >>> 3) + n[e - 7] + ((p << 15 | p >>> 17) ^ (p << 13 | p >>> 19) ^ p >>> 10) + n[e - 16];
                }
                m = l + ((f << 26 | f >>> 6) ^ (f << 21 | f >>> 11) ^ (f << 7 | f >>> 25)) + (f & g ^ ~f & j) + t[e] + n[e];
                p = ((c << 30 | c >>> 2) ^ (c << 19 | c >>> 13) ^ (c << 10 | c >>> 22)) + (c & d ^ c & b ^ d & b);
                l = j;
                j = g;
                g = f;
                f = k + m | 0;
                k = b;
                b = d;
                d = c;
                c = m + p | 0;
            }
            a[0] = a[0] + c | 0;
            a[1] = a[1] + d | 0;
            a[2] = a[2] + b | 0;
            a[3] = a[3] + k | 0;
            a[4] = a[4] + f | 0;
            a[5] = a[5] + g | 0;
            a[6] = a[6] + j | 0;
            a[7] = a[7] + l | 0;
        },
        _doFinalize: function() {
            var d = this._data, b = d.words, a = 8 * this._nDataBytes, c = 8 * d.sigBytes;
            b[c >>> 5] |= 128 << 24 - c % 32;
            b[(c + 64 >>> 9 << 4) + 14] = k.floor(a / 4294967296);
            b[(c + 64 >>> 9 << 4) + 15] = a;
            d.sigBytes = 4 * b.length;
            this._process();
            return this._hash;
        },
        clone: function() {
            var b = j.clone.call(this);
            b._hash = this._hash.clone();
            return b;
        }
    });
    g.SHA256 = j._createHelper(h);
    g.HmacSHA256 = j._createHmacHelper(h);
})(Math);

(function() {
    var b = CryptoJS, d = b.lib.WordArray, a = b.algo, c = a.SHA256, a = a.SHA224 = c.extend({
        _doReset: function() {
            this._hash = new d.init([ 3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428 ]);
        },
        _doFinalize: function() {
            var a = c._doFinalize.call(this);
            a.sigBytes -= 4;
            return a;
        }
    });
    b.SHA224 = c._createHelper(a);
    b.HmacSHA224 = c._createHmacHelper(a);
})();

(function() {
    function a() {
        return d.create.apply(d, arguments);
    }
    for (var n = CryptoJS, r = n.lib.Hasher, e = n.x64, d = e.Word, T = e.WordArray, e = n.algo, ea = [ a(1116352408, 3609767458), a(1899447441, 602891725), a(3049323471, 3964484399), a(3921009573, 2173295548), a(961987163, 4081628472), a(1508970993, 3053834265), a(2453635748, 2937671579), a(2870763221, 3664609560), a(3624381080, 2734883394), a(310598401, 1164996542), a(607225278, 1323610764), a(1426881987, 3590304994), a(1925078388, 4068182383), a(2162078206, 991336113), a(2614888103, 633803317), a(3248222580, 3479774868), a(3835390401, 2666613458), a(4022224774, 944711139), a(264347078, 2341262773), a(604807628, 2007800933), a(770255983, 1495990901), a(1249150122, 1856431235), a(1555081692, 3175218132), a(1996064986, 2198950837), a(2554220882, 3999719339), a(2821834349, 766784016), a(2952996808, 2566594879), a(3210313671, 3203337956), a(3336571891, 1034457026), a(3584528711, 2466948901), a(113926993, 3758326383), a(338241895, 168717936), a(666307205, 1188179964), a(773529912, 1546045734), a(1294757372, 1522805485), a(1396182291, 2643833823), a(1695183700, 2343527390), a(1986661051, 1014477480), a(2177026350, 1206759142), a(2456956037, 344077627), a(2730485921, 1290863460), a(2820302411, 3158454273), a(3259730800, 3505952657), a(3345764771, 106217008), a(3516065817, 3606008344), a(3600352804, 1432725776), a(4094571909, 1467031594), a(275423344, 851169720), a(430227734, 3100823752), a(506948616, 1363258195), a(659060556, 3750685593), a(883997877, 3785050280), a(958139571, 3318307427), a(1322822218, 3812723403), a(1537002063, 2003034995), a(1747873779, 3602036899), a(1955562222, 1575990012), a(2024104815, 1125592928), a(2227730452, 2716904306), a(2361852424, 442776044), a(2428436474, 593698344), a(2756734187, 3733110249), a(3204031479, 2999351573), a(3329325298, 3815920427), a(3391569614, 3928383900), a(3515267271, 566280711), a(3940187606, 3454069534), a(4118630271, 4000239992), a(116418474, 1914138554), a(174292421, 2731055270), a(289380356, 3203993006), a(460393269, 320620315), a(685471733, 587496836), a(852142971, 1086792851), a(1017036298, 365543100), a(1126000580, 2618297676), a(1288033470, 3409855158), a(1501505948, 4234509866), a(1607167915, 987167468), a(1816402316, 1246189591) ], v = [], w = 0; 80 > w; w++) v[w] = a();
    e = e.SHA512 = r.extend({
        _doReset: function() {
            this._hash = new T.init([ new d.init(1779033703, 4089235720), new d.init(3144134277, 2227873595), new d.init(1013904242, 4271175723), new d.init(2773480762, 1595750129), new d.init(1359893119, 2917565137), new d.init(2600822924, 725511199), new d.init(528734635, 4215389547), new d.init(1541459225, 327033209) ]);
        },
        _doProcessBlock: function(a, d) {
            for (var f = this._hash.words, F = f[0], e = f[1], n = f[2], r = f[3], G = f[4], H = f[5], I = f[6], f = f[7], w = F.high, J = F.low, X = e.high, K = e.low, Y = n.high, L = n.low, Z = r.high, M = r.low, $ = G.high, N = G.low, aa = H.high, O = H.low, ba = I.high, P = I.low, ca = f.high, Q = f.low, k = w, g = J, z = X, x = K, A = Y, y = L, U = Z, B = M, l = $, h = N, R = aa, C = O, S = ba, D = P, V = ca, E = Q, m = 0; 80 > m; m++) {
                var s = v[m];
                if (16 > m) var j = s.high = a[d + 2 * m] | 0, b = s.low = a[d + 2 * m + 1] | 0; else {
                    var j = v[m - 15], b = j.high, p = j.low, j = (b >>> 1 | p << 31) ^ (b >>> 8 | p << 24) ^ b >>> 7, p = (p >>> 1 | b << 31) ^ (p >>> 8 | b << 24) ^ (p >>> 7 | b << 25), u = v[m - 2], b = u.high, c = u.low, u = (b >>> 19 | c << 13) ^ (b << 3 | c >>> 29) ^ b >>> 6, c = (c >>> 19 | b << 13) ^ (c << 3 | b >>> 29) ^ (c >>> 6 | b << 26), b = v[m - 7], W = b.high, t = v[m - 16], q = t.high, t = t.low, b = p + b.low, j = j + W + (b >>> 0 < p >>> 0 ? 1 : 0), b = b + c, j = j + u + (b >>> 0 < c >>> 0 ? 1 : 0), b = b + t, j = j + q + (b >>> 0 < t >>> 0 ? 1 : 0);
                    s.high = j;
                    s.low = b;
                }
                var W = l & R ^ ~l & S, t = h & C ^ ~h & D, s = k & z ^ k & A ^ z & A, T = g & x ^ g & y ^ x & y, p = (k >>> 28 | g << 4) ^ (k << 30 | g >>> 2) ^ (k << 25 | g >>> 7), u = (g >>> 28 | k << 4) ^ (g << 30 | k >>> 2) ^ (g << 25 | k >>> 7), c = ea[m], fa = c.high, da = c.low, c = E + ((h >>> 14 | l << 18) ^ (h >>> 18 | l << 14) ^ (h << 23 | l >>> 9)), q = V + ((l >>> 14 | h << 18) ^ (l >>> 18 | h << 14) ^ (l << 23 | h >>> 9)) + (c >>> 0 < E >>> 0 ? 1 : 0), c = c + t, q = q + W + (c >>> 0 < t >>> 0 ? 1 : 0), c = c + da, q = q + fa + (c >>> 0 < da >>> 0 ? 1 : 0), c = c + b, q = q + j + (c >>> 0 < b >>> 0 ? 1 : 0), b = u + T, s = p + s + (b >>> 0 < u >>> 0 ? 1 : 0), V = S, E = D, S = R, D = C, R = l, C = h, h = B + c | 0, l = U + q + (h >>> 0 < B >>> 0 ? 1 : 0) | 0, U = A, B = y, A = z, y = x, z = k, x = g, g = c + b | 0, k = q + s + (g >>> 0 < c >>> 0 ? 1 : 0) | 0;
            }
            J = F.low = J + g;
            F.high = w + k + (J >>> 0 < g >>> 0 ? 1 : 0);
            K = e.low = K + x;
            e.high = X + z + (K >>> 0 < x >>> 0 ? 1 : 0);
            L = n.low = L + y;
            n.high = Y + A + (L >>> 0 < y >>> 0 ? 1 : 0);
            M = r.low = M + B;
            r.high = Z + U + (M >>> 0 < B >>> 0 ? 1 : 0);
            N = G.low = N + h;
            G.high = $ + l + (N >>> 0 < h >>> 0 ? 1 : 0);
            O = H.low = O + C;
            H.high = aa + R + (O >>> 0 < C >>> 0 ? 1 : 0);
            P = I.low = P + D;
            I.high = ba + S + (P >>> 0 < D >>> 0 ? 1 : 0);
            Q = f.low = Q + E;
            f.high = ca + V + (Q >>> 0 < E >>> 0 ? 1 : 0);
        },
        _doFinalize: function() {
            var a = this._data, d = a.words, f = 8 * this._nDataBytes, e = 8 * a.sigBytes;
            d[e >>> 5] |= 128 << 24 - e % 32;
            d[(e + 128 >>> 10 << 5) + 30] = Math.floor(f / 4294967296);
            d[(e + 128 >>> 10 << 5) + 31] = f;
            a.sigBytes = 4 * d.length;
            this._process();
            return this._hash.toX32();
        },
        clone: function() {
            var a = r.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        },
        blockSize: 32
    });
    n.SHA512 = r._createHelper(e);
    n.HmacSHA512 = r._createHmacHelper(e);
})();

(function() {
    var c = CryptoJS, a = c.x64, b = a.Word, e = a.WordArray, a = c.algo, d = a.SHA512, a = a.SHA384 = d.extend({
        _doReset: function() {
            this._hash = new e.init([ new b.init(3418070365, 3238371032), new b.init(1654270250, 914150663), new b.init(2438529370, 812702999), new b.init(355462360, 4144912697), new b.init(1731405415, 4290775857), new b.init(2394180231, 1750603025), new b.init(3675008525, 1694076839), new b.init(1203062813, 3204075428) ]);
        },
        _doFinalize: function() {
            var a = d._doFinalize.call(this);
            a.sigBytes -= 16;
            return a;
        }
    });
    c.SHA384 = d._createHelper(a);
    c.HmacSHA384 = d._createHmacHelper(a);
})();

(function(E) {
    function h(a, f, g, j, p, h, k) {
        a = a + (f & g | ~f & j) + p + k;
        return (a << h | a >>> 32 - h) + f;
    }
    function k(a, f, g, j, p, h, k) {
        a = a + (f & j | g & ~j) + p + k;
        return (a << h | a >>> 32 - h) + f;
    }
    function l(a, f, g, j, h, k, l) {
        a = a + (f ^ g ^ j) + h + l;
        return (a << k | a >>> 32 - k) + f;
    }
    function n(a, f, g, j, h, k, l) {
        a = a + (g ^ (f | ~j)) + h + l;
        return (a << k | a >>> 32 - k) + f;
    }
    for (var r = CryptoJS, q = r.lib, F = q.WordArray, s = q.Hasher, q = r.algo, a = [], t = 0; 64 > t; t++) a[t] = 4294967296 * E.abs(E.sin(t + 1)) | 0;
    q = q.MD5 = s.extend({
        _doReset: function() {
            this._hash = new F.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function(m, f) {
            for (var g = 0; 16 > g; g++) {
                var j = f + g, p = m[j];
                m[j] = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360;
            }
            var g = this._hash.words, j = m[f + 0], p = m[f + 1], q = m[f + 2], r = m[f + 3], s = m[f + 4], t = m[f + 5], u = m[f + 6], v = m[f + 7], w = m[f + 8], x = m[f + 9], y = m[f + 10], z = m[f + 11], A = m[f + 12], B = m[f + 13], C = m[f + 14], D = m[f + 15], b = g[0], c = g[1], d = g[2], e = g[3], b = h(b, c, d, e, j, 7, a[0]), e = h(e, b, c, d, p, 12, a[1]), d = h(d, e, b, c, q, 17, a[2]), c = h(c, d, e, b, r, 22, a[3]), b = h(b, c, d, e, s, 7, a[4]), e = h(e, b, c, d, t, 12, a[5]), d = h(d, e, b, c, u, 17, a[6]), c = h(c, d, e, b, v, 22, a[7]), b = h(b, c, d, e, w, 7, a[8]), e = h(e, b, c, d, x, 12, a[9]), d = h(d, e, b, c, y, 17, a[10]), c = h(c, d, e, b, z, 22, a[11]), b = h(b, c, d, e, A, 7, a[12]), e = h(e, b, c, d, B, 12, a[13]), d = h(d, e, b, c, C, 17, a[14]), c = h(c, d, e, b, D, 22, a[15]), b = k(b, c, d, e, p, 5, a[16]), e = k(e, b, c, d, u, 9, a[17]), d = k(d, e, b, c, z, 14, a[18]), c = k(c, d, e, b, j, 20, a[19]), b = k(b, c, d, e, t, 5, a[20]), e = k(e, b, c, d, y, 9, a[21]), d = k(d, e, b, c, D, 14, a[22]), c = k(c, d, e, b, s, 20, a[23]), b = k(b, c, d, e, x, 5, a[24]), e = k(e, b, c, d, C, 9, a[25]), d = k(d, e, b, c, r, 14, a[26]), c = k(c, d, e, b, w, 20, a[27]), b = k(b, c, d, e, B, 5, a[28]), e = k(e, b, c, d, q, 9, a[29]), d = k(d, e, b, c, v, 14, a[30]), c = k(c, d, e, b, A, 20, a[31]), b = l(b, c, d, e, t, 4, a[32]), e = l(e, b, c, d, w, 11, a[33]), d = l(d, e, b, c, z, 16, a[34]), c = l(c, d, e, b, C, 23, a[35]), b = l(b, c, d, e, p, 4, a[36]), e = l(e, b, c, d, s, 11, a[37]), d = l(d, e, b, c, v, 16, a[38]), c = l(c, d, e, b, y, 23, a[39]), b = l(b, c, d, e, B, 4, a[40]), e = l(e, b, c, d, j, 11, a[41]), d = l(d, e, b, c, r, 16, a[42]), c = l(c, d, e, b, u, 23, a[43]), b = l(b, c, d, e, x, 4, a[44]), e = l(e, b, c, d, A, 11, a[45]), d = l(d, e, b, c, D, 16, a[46]), c = l(c, d, e, b, q, 23, a[47]), b = n(b, c, d, e, j, 6, a[48]), e = n(e, b, c, d, v, 10, a[49]), d = n(d, e, b, c, C, 15, a[50]), c = n(c, d, e, b, t, 21, a[51]), b = n(b, c, d, e, A, 6, a[52]), e = n(e, b, c, d, r, 10, a[53]), d = n(d, e, b, c, y, 15, a[54]), c = n(c, d, e, b, p, 21, a[55]), b = n(b, c, d, e, w, 6, a[56]), e = n(e, b, c, d, D, 10, a[57]), d = n(d, e, b, c, u, 15, a[58]), c = n(c, d, e, b, B, 21, a[59]), b = n(b, c, d, e, s, 6, a[60]), e = n(e, b, c, d, z, 10, a[61]), d = n(d, e, b, c, q, 15, a[62]), c = n(c, d, e, b, x, 21, a[63]);
            g[0] = g[0] + b | 0;
            g[1] = g[1] + c | 0;
            g[2] = g[2] + d | 0;
            g[3] = g[3] + e | 0;
        },
        _doFinalize: function() {
            var a = this._data, f = a.words, g = 8 * this._nDataBytes, j = 8 * a.sigBytes;
            f[j >>> 5] |= 128 << 24 - j % 32;
            var h = E.floor(g / 4294967296);
            f[(j + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
            f[(j + 64 >>> 9 << 4) + 14] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
            a.sigBytes = 4 * (f.length + 1);
            this._process();
            a = this._hash;
            f = a.words;
            for (g = 0; 4 > g; g++) j = f[g], f[g] = (j << 8 | j >>> 24) & 16711935 | (j << 24 | j >>> 8) & 4278255360;
            return a;
        },
        clone: function() {
            var a = s.clone.call(this);
            a._hash = this._hash.clone();
            return a;
        }
    });
    r.MD5 = s._createHelper(q);
    r.HmacMD5 = s._createHmacHelper(q);
})(Math);

(function() {
    var h = CryptoJS, j = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function(b) {
            var e = b.words, f = b.sigBytes, c = this._map;
            b.clamp();
            b = [];
            for (var a = 0; a < f; a += 3) for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + .75 * g < f; g++) b.push(c.charAt(d >>> 6 * (3 - g) & 63));
            if (e = c.charAt(64)) for (;b.length % 4; ) b.push(e);
            return b.join("");
        },
        parse: function(b) {
            var e = b.length, f = this._map, c = f.charAt(64);
            c && (c = b.indexOf(c), -1 != c && (e = c));
            for (var c = [], a = 0, d = 0; d < e; d++) if (d % 4) {
                var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4), h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
                c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
                a++;
            }
            return j.create(c, a);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
})();

CryptoJS.lib.Cipher || function(u) {
    var g = CryptoJS, f = g.lib, k = f.Base, l = f.WordArray, q = f.BufferedBlockAlgorithm, r = g.enc.Base64, v = g.algo.EvpKDF, n = f.Cipher = q.extend({
        cfg: k.extend(),
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
            q.reset.call(this);
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
                    return ("string" == typeof c ? s : j).encrypt(a, b, c, d);
                },
                decrypt: function(b, c, d) {
                    return ("string" == typeof c ? s : j).decrypt(a, b, c, d);
                }
            };
        }
    });
    f.StreamCipher = n.extend({
        _doFinalize: function() {
            return this._process(!0);
        },
        blockSize: 1
    });
    var m = g.mode = {}, t = function(a, b, c) {
        var d = this._iv;
        d ? this._iv = u : d = this._prevBlock;
        for (var e = 0; e < c; e++) a[b + e] ^= d[e];
    }, h = (f.BlockCipherMode = k.extend({
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
    h.Encryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher, d = c.blockSize;
            t.call(this, a, b, d);
            c.encryptBlock(a, b);
            this._prevBlock = a.slice(b, b + d);
        }
    });
    h.Decryptor = h.extend({
        processBlock: function(a, b) {
            var c = this._cipher, d = c.blockSize, e = a.slice(b, b + d);
            c.decryptBlock(a, b);
            t.call(this, a, b, d);
            this._prevBlock = e;
        }
    });
    m = m.CBC = h;
    h = (g.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; f < c; f += 4) e.push(d);
            c = l.create(e, c);
            a.concat(c);
        },
        unpad: function(a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255;
        }
    };
    f.BlockCipher = n.extend({
        cfg: n.cfg.extend({
            mode: m,
            padding: h
        }),
        reset: function() {
            n.reset.call(this);
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
    var p = f.CipherParams = k.extend({
        init: function(a) {
            this.mixIn(a);
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this);
        }
    }), m = (g.format = {}).OpenSSL = {
        stringify: function(a) {
            var b = a.ciphertext;
            a = a.salt;
            return (a ? l.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(r);
        },
        parse: function(a) {
            a = r.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = l.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16;
            }
            return p.create({
                ciphertext: a,
                salt: c
            });
        }
    }, j = f.SerializableCipher = k.extend({
        cfg: k.extend({
            format: m
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            var e = a.createEncryptor(c, d);
            b = e.finalize(b);
            e = e.cfg;
            return p.create({
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
    }), g = (g.kdf = {}).OpenSSL = {
        execute: function(a, b, c, d) {
            d || (d = l.random(8));
            a = v.create({
                keySize: b + c
            }).compute(a, d);
            c = l.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return p.create({
                key: a,
                iv: c,
                salt: d
            });
        }
    }, s = f.PasswordBasedCipher = j.extend({
        cfg: j.cfg.extend({
            kdf: g
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            c = d.kdf.execute(c, a.keySize, a.ivSize);
            d.iv = c.iv;
            a = j.encrypt.call(this, a, b, c.key, d);
            a.mixIn(c);
            return a;
        },
        decrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
            d.iv = c.iv;
            return j.decrypt.call(this, a, b, c.key, d);
        }
    });
}();

(function() {
    for (var q = CryptoJS, x = q.lib.BlockCipher, r = q.algo, j = [], y = [], z = [], A = [], B = [], C = [], s = [], u = [], v = [], w = [], g = [], k = 0; 256 > k; k++) g[k] = 128 > k ? k << 1 : k << 1 ^ 283;
    for (var n = 0, l = 0, k = 0; 256 > k; k++) {
        var f = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4, f = f >>> 8 ^ f & 255 ^ 99;
        j[n] = f;
        y[f] = n;
        var t = g[n], D = g[t], E = g[D], b = 257 * g[f] ^ 16843008 * f;
        z[n] = b << 24 | b >>> 8;
        A[n] = b << 16 | b >>> 16;
        B[n] = b << 8 | b >>> 24;
        C[n] = b;
        b = 16843009 * E ^ 65537 * D ^ 257 * t ^ 16843008 * n;
        s[f] = b << 24 | b >>> 8;
        u[f] = b << 16 | b >>> 16;
        v[f] = b << 8 | b >>> 24;
        w[f] = b;
        n ? (n = t ^ g[g[g[E ^ t]]], l ^= g[g[l]]) : n = l = 1;
    }
    var F = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], r = r.AES = x.extend({
        _doReset: function() {
            for (var c = this._key, e = c.words, a = c.sigBytes / 4, c = 4 * ((this._nRounds = a + 6) + 1), b = this._keySchedule = [], h = 0; h < c; h++) if (h < a) b[h] = e[h]; else {
                var d = b[h - 1];
                h % a ? 6 < a && 4 == h % a && (d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255]) : (d = d << 8 | d >>> 24, 
                d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255], 
                d ^= F[h / a | 0] << 24);
                b[h] = b[h - a] ^ d;
            }
            e = this._invKeySchedule = [];
            for (a = 0; a < c; a++) h = c - a, d = a % 4 ? b[h] : b[h - 4], e[a] = 4 > a || 4 >= h ? d : s[j[d >>> 24]] ^ u[j[d >>> 16 & 255]] ^ v[j[d >>> 8 & 255]] ^ w[j[d & 255]];
        },
        encryptBlock: function(c, e) {
            this._doCryptBlock(c, e, this._keySchedule, z, A, B, C, j);
        },
        decryptBlock: function(c, e) {
            var a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a;
            this._doCryptBlock(c, e, this._invKeySchedule, s, u, v, w, y);
            a = c[e + 1];
            c[e + 1] = c[e + 3];
            c[e + 3] = a;
        },
        _doCryptBlock: function(c, e, a, b, h, d, j, m) {
            for (var n = this._nRounds, f = c[e] ^ a[0], g = c[e + 1] ^ a[1], k = c[e + 2] ^ a[2], p = c[e + 3] ^ a[3], l = 4, t = 1; t < n; t++) var q = b[f >>> 24] ^ h[g >>> 16 & 255] ^ d[k >>> 8 & 255] ^ j[p & 255] ^ a[l++], r = b[g >>> 24] ^ h[k >>> 16 & 255] ^ d[p >>> 8 & 255] ^ j[f & 255] ^ a[l++], s = b[k >>> 24] ^ h[p >>> 16 & 255] ^ d[f >>> 8 & 255] ^ j[g & 255] ^ a[l++], p = b[p >>> 24] ^ h[f >>> 16 & 255] ^ d[g >>> 8 & 255] ^ j[k & 255] ^ a[l++], f = q, g = r, k = s;
            q = (m[f >>> 24] << 24 | m[g >>> 16 & 255] << 16 | m[k >>> 8 & 255] << 8 | m[p & 255]) ^ a[l++];
            r = (m[g >>> 24] << 24 | m[k >>> 16 & 255] << 16 | m[p >>> 8 & 255] << 8 | m[f & 255]) ^ a[l++];
            s = (m[k >>> 24] << 24 | m[p >>> 16 & 255] << 16 | m[f >>> 8 & 255] << 8 | m[g & 255]) ^ a[l++];
            p = (m[p >>> 24] << 24 | m[f >>> 16 & 255] << 16 | m[g >>> 8 & 255] << 8 | m[k & 255]) ^ a[l++];
            c[e] = q;
            c[e + 1] = r;
            c[e + 2] = s;
            c[e + 3] = p;
        },
        keySize: 8
    });
    q.AES = x._createHelper(r);
})();

(function() {
    function j(b, c) {
        var a = (this._lBlock >>> b ^ this._rBlock) & c;
        this._rBlock ^= a;
        this._lBlock ^= a << b;
    }
    function l(b, c) {
        var a = (this._rBlock >>> b ^ this._lBlock) & c;
        this._lBlock ^= a;
        this._rBlock ^= a << b;
    }
    var h = CryptoJS, e = h.lib, n = e.WordArray, e = e.BlockCipher, g = h.algo, q = [ 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ], p = [ 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ], r = [ 1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 ], s = [ {
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
    } ], t = [ 4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679 ], m = g.DES = e.extend({
        _doReset: function() {
            for (var b = this._key.words, c = [], a = 0; 56 > a; a++) {
                var f = q[a] - 1;
                c[a] = b[f >>> 5] >>> 31 - f % 32 & 1;
            }
            b = this._subKeys = [];
            for (f = 0; 16 > f; f++) {
                for (var d = b[f] = [], e = r[f], a = 0; 24 > a; a++) d[a / 6 | 0] |= c[(p[a] - 1 + e) % 28] << 31 - a % 6, 
                d[4 + (a / 6 | 0)] |= c[28 + (p[a + 24] - 1 + e) % 28] << 31 - a % 6;
                d[0] = d[0] << 1 | d[0] >>> 31;
                for (a = 1; 7 > a; a++) d[a] >>>= 4 * (a - 1) + 3;
                d[7] = d[7] << 5 | d[7] >>> 27;
            }
            c = this._invSubKeys = [];
            for (a = 0; 16 > a; a++) c[a] = b[15 - a];
        },
        encryptBlock: function(b, c) {
            this._doCryptBlock(b, c, this._subKeys);
        },
        decryptBlock: function(b, c) {
            this._doCryptBlock(b, c, this._invSubKeys);
        },
        _doCryptBlock: function(b, c, a) {
            this._lBlock = b[c];
            this._rBlock = b[c + 1];
            j.call(this, 4, 252645135);
            j.call(this, 16, 65535);
            l.call(this, 2, 858993459);
            l.call(this, 8, 16711935);
            j.call(this, 1, 1431655765);
            for (var f = 0; 16 > f; f++) {
                for (var d = a[f], e = this._lBlock, h = this._rBlock, g = 0, k = 0; 8 > k; k++) g |= s[k][((h ^ d[k]) & t[k]) >>> 0];
                this._lBlock = h;
                this._rBlock = e ^ g;
            }
            a = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = a;
            j.call(this, 1, 1431655765);
            l.call(this, 8, 16711935);
            l.call(this, 2, 858993459);
            j.call(this, 16, 65535);
            j.call(this, 4, 252645135);
            b[c] = this._lBlock;
            b[c + 1] = this._rBlock;
        },
        keySize: 2,
        ivSize: 2,
        blockSize: 2
    });
    h.DES = e._createHelper(m);
    g = g.TripleDES = e.extend({
        _doReset: function() {
            var b = this._key.words;
            this._des1 = m.createEncryptor(n.create(b.slice(0, 2)));
            this._des2 = m.createEncryptor(n.create(b.slice(2, 4)));
            this._des3 = m.createEncryptor(n.create(b.slice(4, 6)));
        },
        encryptBlock: function(b, c) {
            this._des1.encryptBlock(b, c);
            this._des2.decryptBlock(b, c);
            this._des3.encryptBlock(b, c);
        },
        decryptBlock: function(b, c) {
            this._des3.decryptBlock(b, c);
            this._des2.encryptBlock(b, c);
            this._des1.decryptBlock(b, c);
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2
    });
    h.TripleDES = e._createHelper(g);
})();

(function() {
    var k = CryptoJS, b = k.lib, m = b.WordArray, l = b.Hasher, d = [], b = k.algo.SHA1 = l.extend({
        _doReset: function() {
            this._hash = new m.init([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
        },
        _doProcessBlock: function(n, p) {
            for (var a = this._hash.words, e = a[0], f = a[1], h = a[2], j = a[3], b = a[4], c = 0; 80 > c; c++) {
                if (16 > c) d[c] = n[p + c] | 0; else {
                    var g = d[c - 3] ^ d[c - 8] ^ d[c - 14] ^ d[c - 16];
                    d[c] = g << 1 | g >>> 31;
                }
                g = (e << 5 | e >>> 27) + b + d[c];
                g = 20 > c ? g + ((f & h | ~f & j) + 1518500249) : 40 > c ? g + ((f ^ h ^ j) + 1859775393) : 60 > c ? g + ((f & h | f & j | h & j) - 1894007588) : g + ((f ^ h ^ j) - 899497514);
                b = j;
                j = h;
                h = f << 30 | f >>> 2;
                f = e;
                e = g;
            }
            a[0] = a[0] + e | 0;
            a[1] = a[1] + f | 0;
            a[2] = a[2] + h | 0;
            a[3] = a[3] + j | 0;
            a[4] = a[4] + b | 0;
        },
        _doFinalize: function() {
            var b = this._data, d = b.words, a = 8 * this._nDataBytes, e = 8 * b.sigBytes;
            d[e >>> 5] |= 128 << 24 - e % 32;
            d[(e + 64 >>> 9 << 4) + 14] = Math.floor(a / 4294967296);
            d[(e + 64 >>> 9 << 4) + 15] = a;
            b.sigBytes = 4 * d.length;
            this._process();
            return this._hash;
        },
        clone: function() {
            var b = l.clone.call(this);
            b._hash = this._hash.clone();
            return b;
        }
    });
    k.SHA1 = l._createHelper(b);
    k.HmacSHA1 = l._createHmacHelper(b);
})();

(function() {
    var q = CryptoJS, d = q.lib, n = d.WordArray, p = d.Hasher, d = q.algo, x = n.create([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13 ]), y = n.create([ 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11 ]), z = n.create([ 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6 ]), A = n.create([ 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11 ]), B = n.create([ 0, 1518500249, 1859775393, 2400959708, 2840853838 ]), C = n.create([ 1352829926, 1548603684, 1836072691, 2053994217, 0 ]), d = d.RIPEMD160 = p.extend({
        _doReset: function() {
            this._hash = n.create([ 1732584193, 4023233417, 2562383102, 271733878, 3285377520 ]);
        },
        _doProcessBlock: function(e, v) {
            for (var b = 0; 16 > b; b++) {
                var c = v + b, f = e[c];
                e[c] = (f << 8 | f >>> 24) & 16711935 | (f << 24 | f >>> 8) & 4278255360;
            }
            var c = this._hash.words, f = B.words, d = C.words, n = x.words, q = y.words, p = z.words, w = A.words, t, g, h, j, r, u, k, l, m, s;
            u = t = c[0];
            k = g = c[1];
            l = h = c[2];
            m = j = c[3];
            s = r = c[4];
            for (var a, b = 0; 80 > b; b += 1) a = t + e[v + n[b]] | 0, a = 16 > b ? a + ((g ^ h ^ j) + f[0]) : 32 > b ? a + ((g & h | ~g & j) + f[1]) : 48 > b ? a + (((g | ~h) ^ j) + f[2]) : 64 > b ? a + ((g & j | h & ~j) + f[3]) : a + ((g ^ (h | ~j)) + f[4]), 
            a |= 0, a = a << p[b] | a >>> 32 - p[b], a = a + r | 0, t = r, r = j, j = h << 10 | h >>> 22, 
            h = g, g = a, a = u + e[v + q[b]] | 0, a = 16 > b ? a + ((k ^ (l | ~m)) + d[0]) : 32 > b ? a + ((k & m | l & ~m) + d[1]) : 48 > b ? a + (((k | ~l) ^ m) + d[2]) : 64 > b ? a + ((k & l | ~k & m) + d[3]) : a + ((k ^ l ^ m) + d[4]), 
            a |= 0, a = a << w[b] | a >>> 32 - w[b], a = a + s | 0, u = s, s = m, m = l << 10 | l >>> 22, 
            l = k, k = a;
            a = c[1] + h + m | 0;
            c[1] = c[2] + j + s | 0;
            c[2] = c[3] + r + u | 0;
            c[3] = c[4] + t + k | 0;
            c[4] = c[0] + g + l | 0;
            c[0] = a;
        },
        _doFinalize: function() {
            var e = this._data, d = e.words, b = 8 * this._nDataBytes, c = 8 * e.sigBytes;
            d[c >>> 5] |= 128 << 24 - c % 32;
            d[(c + 64 >>> 9 << 4) + 14] = (b << 8 | b >>> 24) & 16711935 | (b << 24 | b >>> 8) & 4278255360;
            e.sigBytes = 4 * (d.length + 1);
            this._process();
            e = this._hash;
            d = e.words;
            for (b = 0; 5 > b; b++) c = d[b], d[b] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
            return e;
        },
        clone: function() {
            var d = p.clone.call(this);
            d._hash = this._hash.clone();
            return d;
        }
    });
    q.RIPEMD160 = p._createHelper(d);
    q.HmacRIPEMD160 = p._createHmacHelper(d);
})(Math);

(function() {
    var b = CryptoJS, a = b.lib, d = a.Base, m = a.WordArray, a = b.algo, q = a.HMAC, l = a.PBKDF2 = d.extend({
        cfg: d.extend({
            keySize: 4,
            hasher: a.SHA1,
            iterations: 1
        }),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
        },
        compute: function(a, b) {
            for (var c = this.cfg, f = q.create(c.hasher, a), g = m.create(), d = m.create([ 1 ]), l = g.words, r = d.words, n = c.keySize, c = c.iterations; l.length < n; ) {
                var h = f.update(b).finalize(d);
                f.reset();
                for (var j = h.words, s = j.length, k = h, p = 1; p < c; p++) {
                    k = f.finalize(k);
                    f.reset();
                    for (var t = k.words, e = 0; e < s; e++) j[e] ^= t[e];
                }
                g.concat(h);
                r[0]++;
            }
            g.sigBytes = 4 * n;
            return g;
        }
    });
    b.PBKDF2 = function(a, b, c) {
        return l.create(c).compute(a, b);
    };
})();

var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

var b64pad = "=";

function hex2b64(d) {
    var b;
    var e;
    var a = "";
    for (b = 0; b + 3 <= d.length; b += 3) {
        e = parseInt(d.substring(b, b + 3), 16);
        a += b64map.charAt(e >> 6) + b64map.charAt(e & 63);
    }
    if (b + 1 == d.length) {
        e = parseInt(d.substring(b, b + 1), 16);
        a += b64map.charAt(e << 2);
    } else {
        if (b + 2 == d.length) {
            e = parseInt(d.substring(b, b + 2), 16);
            a += b64map.charAt(e >> 2) + b64map.charAt((e & 3) << 4);
        }
    }
    if (b64pad) {
        while ((a.length & 3) > 0) {
            a += b64pad;
        }
    }
    return a;
}

function b64tohex(f) {
    var d = "";
    var e;
    var b = 0;
    var c;
    var a;
    for (e = 0; e < f.length; ++e) {
        if (f.charAt(e) == b64pad) {
            break;
        }
        a = b64map.indexOf(f.charAt(e));
        if (a < 0) {
            continue;
        }
        if (b == 0) {
            d += int2char(a >> 2);
            c = a & 3;
            b = 1;
        } else {
            if (b == 1) {
                d += int2char(c << 2 | a >> 4);
                c = a & 15;
                b = 2;
            } else {
                if (b == 2) {
                    d += int2char(c);
                    d += int2char(a >> 2);
                    c = a & 3;
                    b = 3;
                } else {
                    d += int2char(c << 2 | a >> 4);
                    d += int2char(a & 15);
                    b = 0;
                }
            }
        }
    }
    if (b == 1) {
        d += int2char(c << 2);
    }
    return d;
}

function b64toBA(e) {
    var d = b64tohex(e);
    var c;
    var b = new Array();
    for (c = 0; 2 * c < d.length; ++c) {
        b[c] = parseInt(d.substring(2 * c, 2 * c + 2), 16);
    }
    return b;
}

var dbits;

var canary = 0xdeadbeefcafe;

var j_lm = (canary & 16777215) == 15715070;

function BigInteger(e, d, f) {
    if (e != null) {
        if ("number" == typeof e) {
            this.fromNumber(e, d, f);
        } else {
            if (d == null && "string" != typeof e) {
                this.fromString(e, 256);
            } else {
                this.fromString(e, d);
            }
        }
    }
}

function nbi() {
    return new BigInteger(null);
}

function am1(f, a, b, e, h, g) {
    while (--g >= 0) {
        var d = a * this[f++] + b[e] + h;
        h = Math.floor(d / 67108864);
        b[e++] = d & 67108863;
    }
    return h;
}

function am2(f, q, r, e, o, a) {
    var k = q & 32767, p = q >> 15;
    while (--a >= 0) {
        var d = this[f] & 32767;
        var g = this[f++] >> 15;
        var b = p * d + g * k;
        d = k * d + ((b & 32767) << 15) + r[e] + (o & 1073741823);
        o = (d >>> 30) + (b >>> 15) + p * g + (o >>> 30);
        r[e++] = d & 1073741823;
    }
    return o;
}

function am3(f, q, r, e, o, a) {
    var k = q & 16383, p = q >> 14;
    while (--a >= 0) {
        var d = this[f] & 16383;
        var g = this[f++] >> 14;
        var b = p * d + g * k;
        d = k * d + ((b & 16383) << 14) + r[e] + o;
        o = (d >> 28) + (b >> 14) + p * g;
        r[e++] = d & 268435455;
    }
    return o;
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

function intAt(b, a) {
    var d = BI_RC[b.charCodeAt(a)];
    return d == null ? -1 : d;
}

function bnpCopyTo(b) {
    for (var a = this.t - 1; a >= 0; --a) {
        b[a] = this[a];
    }
    b.t = this.t;
    b.s = this.s;
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

function bnpFromString(h, c) {
    var e;
    if (c == 16) {
        e = 4;
    } else {
        if (c == 8) {
            e = 3;
        } else {
            if (c == 256) {
                e = 8;
            } else {
                if (c == 2) {
                    e = 1;
                } else {
                    if (c == 32) {
                        e = 5;
                    } else {
                        if (c == 4) {
                            e = 2;
                        } else {
                            this.fromRadix(h, c);
                            return;
                        }
                    }
                }
            }
        }
    }
    this.t = 0;
    this.s = 0;
    var g = h.length, d = false, f = 0;
    while (--g >= 0) {
        var a = e == 8 ? h[g] & 255 : intAt(h, g);
        if (a < 0) {
            if (h.charAt(g) == "-") {
                d = true;
            }
            continue;
        }
        d = false;
        if (f == 0) {
            this[this.t++] = a;
        } else {
            if (f + e > this.DB) {
                this[this.t - 1] |= (a & (1 << this.DB - f) - 1) << f;
                this[this.t++] = a >> this.DB - f;
            } else {
                this[this.t - 1] |= a << f;
            }
        }
        f += e;
        if (f >= this.DB) {
            f -= this.DB;
        }
    }
    if (e == 8 && (h[0] & 128) != 0) {
        this.s = -1;
        if (f > 0) {
            this[this.t - 1] |= (1 << this.DB - f) - 1 << f;
        }
    }
    this.clamp();
    if (d) {
        BigInteger.ZERO.subTo(this, this);
    }
}

function bnpClamp() {
    var a = this.s & this.DM;
    while (this.t > 0 && this[this.t - 1] == a) {
        --this.t;
    }
}

function bnToString(c) {
    if (this.s < 0) {
        return "-" + this.negate().toString(c);
    }
    var e;
    if (c == 16) {
        e = 4;
    } else {
        if (c == 8) {
            e = 3;
        } else {
            if (c == 2) {
                e = 1;
            } else {
                if (c == 32) {
                    e = 5;
                } else {
                    if (c == 4) {
                        e = 2;
                    } else {
                        return this.toRadix(c);
                    }
                }
            }
        }
    }
    var g = (1 << e) - 1, l, a = false, h = "", f = this.t;
    var j = this.DB - f * this.DB % e;
    if (f-- > 0) {
        if (j < this.DB && (l = this[f] >> j) > 0) {
            a = true;
            h = int2char(l);
        }
        while (f >= 0) {
            if (j < e) {
                l = (this[f] & (1 << j) - 1) << e - j;
                l |= this[--f] >> (j += this.DB - e);
            } else {
                l = this[f] >> (j -= e) & g;
                if (j <= 0) {
                    j += this.DB;
                    --f;
                }
            }
            if (l > 0) {
                a = true;
            }
            if (a) {
                h += int2char(l);
            }
        }
    }
    return a ? h : "0";
}

function bnNegate() {
    var a = nbi();
    BigInteger.ZERO.subTo(this, a);
    return a;
}

function bnAbs() {
    return this.s < 0 ? this.negate() : this;
}

function bnCompareTo(b) {
    var d = this.s - b.s;
    if (d != 0) {
        return d;
    }
    var c = this.t;
    d = c - b.t;
    if (d != 0) {
        return this.s < 0 ? -d : d;
    }
    while (--c >= 0) {
        if ((d = this[c] - b[c]) != 0) {
            return d;
        }
    }
    return 0;
}

function nbits(a) {
    var c = 1, b;
    if ((b = a >>> 16) != 0) {
        a = b;
        c += 16;
    }
    if ((b = a >> 8) != 0) {
        a = b;
        c += 8;
    }
    if ((b = a >> 4) != 0) {
        a = b;
        c += 4;
    }
    if ((b = a >> 2) != 0) {
        a = b;
        c += 2;
    }
    if ((b = a >> 1) != 0) {
        a = b;
        c += 1;
    }
    return c;
}

function bnBitLength() {
    if (this.t <= 0) {
        return 0;
    }
    return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}

function bnpDLShiftTo(c, b) {
    var a;
    for (a = this.t - 1; a >= 0; --a) {
        b[a + c] = this[a];
    }
    for (a = c - 1; a >= 0; --a) {
        b[a] = 0;
    }
    b.t = this.t + c;
    b.s = this.s;
}

function bnpDRShiftTo(c, b) {
    for (var a = c; a < this.t; ++a) {
        b[a - c] = this[a];
    }
    b.t = Math.max(this.t - c, 0);
    b.s = this.s;
}

function bnpLShiftTo(j, e) {
    var b = j % this.DB;
    var a = this.DB - b;
    var g = (1 << a) - 1;
    var f = Math.floor(j / this.DB), h = this.s << b & this.DM, d;
    for (d = this.t - 1; d >= 0; --d) {
        e[d + f + 1] = this[d] >> a | h;
        h = (this[d] & g) << b;
    }
    for (d = f - 1; d >= 0; --d) {
        e[d] = 0;
    }
    e[f] = h;
    e.t = this.t + f + 1;
    e.s = this.s;
    e.clamp();
}

function bnpRShiftTo(g, d) {
    d.s = this.s;
    var e = Math.floor(g / this.DB);
    if (e >= this.t) {
        d.t = 0;
        return;
    }
    var b = g % this.DB;
    var a = this.DB - b;
    var f = (1 << b) - 1;
    d[0] = this[e] >> b;
    for (var c = e + 1; c < this.t; ++c) {
        d[c - e - 1] |= (this[c] & f) << a;
        d[c - e] = this[c] >> b;
    }
    if (b > 0) {
        d[this.t - e - 1] |= (this.s & f) << a;
    }
    d.t = this.t - e;
    d.clamp();
}

function bnpSubTo(d, f) {
    var e = 0, g = 0, b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] - d[e];
        f[e++] = g & this.DM;
        g >>= this.DB;
    }
    if (d.t < this.t) {
        g -= d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB;
        }
        g += this.s;
    } else {
        g += this.s;
        while (e < d.t) {
            g -= d[e];
            f[e++] = g & this.DM;
            g >>= this.DB;
        }
        g -= d.s;
    }
    f.s = g < 0 ? -1 : 0;
    if (g < -1) {
        f[e++] = this.DV + g;
    } else {
        if (g > 0) {
            f[e++] = g;
        }
    }
    f.t = e;
    f.clamp();
}

function bnpMultiplyTo(c, e) {
    var b = this.abs(), f = c.abs();
    var d = b.t;
    e.t = d + f.t;
    while (--d >= 0) {
        e[d] = 0;
    }
    for (d = 0; d < f.t; ++d) {
        e[d + b.t] = b.am(0, f[d], e, d, 0, b.t);
    }
    e.s = 0;
    e.clamp();
    if (this.s != c.s) {
        BigInteger.ZERO.subTo(e, e);
    }
}

function bnpSquareTo(d) {
    var a = this.abs();
    var b = d.t = 2 * a.t;
    while (--b >= 0) {
        d[b] = 0;
    }
    for (b = 0; b < a.t - 1; ++b) {
        var e = a.am(b, a[b], d, 2 * b, 0, 1);
        if ((d[b + a.t] += a.am(b + 1, 2 * a[b], d, 2 * b + 1, e, a.t - b - 1)) >= a.DV) {
            d[b + a.t] -= a.DV;
            d[b + a.t + 1] = 1;
        }
    }
    if (d.t > 0) {
        d[d.t - 1] += a.am(b, a[b], d, 2 * b, 0, 1);
    }
    d.s = 0;
    d.clamp();
}

function bnpDivRemTo(n, h, g) {
    var w = n.abs();
    if (w.t <= 0) {
        return;
    }
    var k = this.abs();
    if (k.t < w.t) {
        if (h != null) {
            h.fromInt(0);
        }
        if (g != null) {
            this.copyTo(g);
        }
        return;
    }
    if (g == null) {
        g = nbi();
    }
    var d = nbi(), a = this.s, l = n.s;
    var v = this.DB - nbits(w[w.t - 1]);
    if (v > 0) {
        w.lShiftTo(v, d);
        k.lShiftTo(v, g);
    } else {
        w.copyTo(d);
        k.copyTo(g);
    }
    var p = d.t;
    var b = d[p - 1];
    if (b == 0) {
        return;
    }
    var o = b * (1 << this.F1) + (p > 1 ? d[p - 2] >> this.F2 : 0);
    var A = this.FV / o, z = (1 << this.F1) / o, x = 1 << this.F2;
    var u = g.t, s = u - p, f = h == null ? nbi() : h;
    d.dlShiftTo(s, f);
    if (g.compareTo(f) >= 0) {
        g[g.t++] = 1;
        g.subTo(f, g);
    }
    BigInteger.ONE.dlShiftTo(p, f);
    f.subTo(d, d);
    while (d.t < p) {
        d[d.t++] = 0;
    }
    while (--s >= 0) {
        var c = g[--u] == b ? this.DM : Math.floor(g[u] * A + (g[u - 1] + x) * z);
        if ((g[u] += d.am(0, c, g, s, 0, p)) < c) {
            d.dlShiftTo(s, f);
            g.subTo(f, g);
            while (g[u] < --c) {
                g.subTo(f, g);
            }
        }
    }
    if (h != null) {
        g.drShiftTo(p, h);
        if (a != l) {
            BigInteger.ZERO.subTo(h, h);
        }
    }
    g.t = p;
    g.clamp();
    if (v > 0) {
        g.rShiftTo(v, g);
    }
    if (a < 0) {
        BigInteger.ZERO.subTo(g, g);
    }
}

function bnMod(b) {
    var c = nbi();
    this.abs().divRemTo(b, null, c);
    if (this.s < 0 && c.compareTo(BigInteger.ZERO) > 0) {
        b.subTo(c, c);
    }
    return c;
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

function cMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b);
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
    for (var c = 0; c < this.m.t; ++c) {
        var b = a[c] & 32767;
        var d = b * this.mpl + ((b * this.mph + (a[c] >> 15) * this.mpl & this.um) << 15) & a.DM;
        b = c + this.m.t;
        a[b] += this.m.am(0, d, a, c, 0, this.m.t);
        while (a[b] >= a.DV) {
            a[b] -= a.DV;
            a[++b]++;
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

function montMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b);
}

Montgomery.prototype.convert = montConvert;

Montgomery.prototype.revert = montRevert;

Montgomery.prototype.reduce = montReduce;

Montgomery.prototype.mulTo = montMulTo;

Montgomery.prototype.sqrTo = montSqrTo;

function bnpIsEven() {
    return (this.t > 0 ? this[0] & 1 : this.s) == 0;
}

function bnpExp(h, j) {
    if (h > 4294967295 || h < 1) {
        return BigInteger.ONE;
    }
    var f = nbi(), a = nbi(), d = j.convert(this), c = nbits(h) - 1;
    d.copyTo(f);
    while (--c >= 0) {
        j.sqrTo(f, a);
        if ((h & 1 << c) > 0) {
            j.mulTo(a, d, f);
        } else {
            var b = f;
            f = a;
            a = b;
        }
    }
    return j.revert(f);
}

function bnModPowInt(b, a) {
    var c;
    if (b < 256 || a.isEven()) {
        c = new Classic(a);
    } else {
        c = new Montgomery(a);
    }
    return this.exp(b, c);
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

function bnpToRadix(c) {
    if (c == null) {
        c = 10;
    }
    if (this.signum() == 0 || c < 2 || c > 36) {
        return "0";
    }
    var f = this.chunkSize(c);
    var e = Math.pow(c, f);
    var i = nbv(e), j = nbi(), h = nbi(), g = "";
    this.divRemTo(i, j, h);
    while (j.signum() > 0) {
        g = (e + h.intValue()).toString(c).substr(1) + g;
        j.divRemTo(i, j, h);
    }
    return h.intValue().toString(c) + g;
}

function bnpFromRadix(m, h) {
    this.fromInt(0);
    if (h == null) {
        h = 10;
    }
    var f = this.chunkSize(h);
    var g = Math.pow(h, f), e = false, a = 0, l = 0;
    for (var c = 0; c < m.length; ++c) {
        var k = intAt(m, c);
        if (k < 0) {
            if (m.charAt(c) == "-" && this.signum() == 0) {
                e = true;
            }
            continue;
        }
        l = h * l + k;
        if (++a >= f) {
            this.dMultiply(g);
            this.dAddOffset(l, 0);
            a = 0;
            l = 0;
        }
    }
    if (a > 0) {
        this.dMultiply(Math.pow(h, a));
        this.dAddOffset(l, 0);
    }
    if (e) {
        BigInteger.ZERO.subTo(this, this);
    }
}

function bnpFromNumber(f, e, h) {
    if ("number" == typeof e) {
        if (f < 2) {
            this.fromInt(1);
        } else {
            this.fromNumber(f, h);
            if (!this.testBit(f - 1)) {
                this.bitwiseTo(BigInteger.ONE.shiftLeft(f - 1), op_or, this);
            }
            if (this.isEven()) {
                this.dAddOffset(1, 0);
            }
            while (!this.isProbablePrime(e)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > f) {
                    this.subTo(BigInteger.ONE.shiftLeft(f - 1), this);
                }
            }
        }
    } else {
        var d = new Array(), g = f & 7;
        d.length = (f >> 3) + 1;
        e.nextBytes(d);
        if (g > 0) {
            d[0] &= (1 << g) - 1;
        } else {
            d[0] = 0;
        }
        this.fromString(d, 256);
    }
}

function bnToByteArray() {
    var b = this.t, c = new Array();
    c[0] = this.s;
    var e = this.DB - b * this.DB % 8, f, a = 0;
    if (b-- > 0) {
        if (e < this.DB && (f = this[b] >> e) != (this.s & this.DM) >> e) {
            c[a++] = f | this.s << this.DB - e;
        }
        while (b >= 0) {
            if (e < 8) {
                f = (this[b] & (1 << e) - 1) << 8 - e;
                f |= this[--b] >> (e += this.DB - 8);
            } else {
                f = this[b] >> (e -= 8) & 255;
                if (e <= 0) {
                    e += this.DB;
                    --b;
                }
            }
            if ((f & 128) != 0) {
                f |= -256;
            }
            if (a == 0 && (this.s & 128) != (f & 128)) {
                ++a;
            }
            if (a > 0 || f != this.s) {
                c[a++] = f;
            }
        }
    }
    return c;
}

function bnEquals(b) {
    return this.compareTo(b) == 0;
}

function bnMin(b) {
    return this.compareTo(b) < 0 ? this : b;
}

function bnMax(b) {
    return this.compareTo(b) > 0 ? this : b;
}

function bnpBitwiseTo(c, h, e) {
    var d, g, b = Math.min(c.t, this.t);
    for (d = 0; d < b; ++d) {
        e[d] = h(this[d], c[d]);
    }
    if (c.t < this.t) {
        g = c.s & this.DM;
        for (d = b; d < this.t; ++d) {
            e[d] = h(this[d], g);
        }
        e.t = this.t;
    } else {
        g = this.s & this.DM;
        for (d = b; d < c.t; ++d) {
            e[d] = h(g, c[d]);
        }
        e.t = c.t;
    }
    e.s = h(this.s, c.s);
    e.clamp();
}

function op_and(a, b) {
    return a & b;
}

function bnAnd(b) {
    var c = nbi();
    this.bitwiseTo(b, op_and, c);
    return c;
}

function op_or(a, b) {
    return a | b;
}

function bnOr(b) {
    var c = nbi();
    this.bitwiseTo(b, op_or, c);
    return c;
}

function op_xor(a, b) {
    return a ^ b;
}

function bnXor(b) {
    var c = nbi();
    this.bitwiseTo(b, op_xor, c);
    return c;
}

function op_andnot(a, b) {
    return a & ~b;
}

function bnAndNot(b) {
    var c = nbi();
    this.bitwiseTo(b, op_andnot, c);
    return c;
}

function bnNot() {
    var b = nbi();
    for (var a = 0; a < this.t; ++a) {
        b[a] = this.DM & ~this[a];
    }
    b.t = this.t;
    b.s = ~this.s;
    return b;
}

function bnShiftLeft(b) {
    var a = nbi();
    if (b < 0) {
        this.rShiftTo(-b, a);
    } else {
        this.lShiftTo(b, a);
    }
    return a;
}

function bnShiftRight(b) {
    var a = nbi();
    if (b < 0) {
        this.lShiftTo(-b, a);
    } else {
        this.rShiftTo(b, a);
    }
    return a;
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
    var c = 0, a = this.s & this.DM;
    for (var b = 0; b < this.t; ++b) {
        c += cbit(this[b] ^ a);
    }
    return c;
}

function bnTestBit(b) {
    var a = Math.floor(b / this.DB);
    if (a >= this.t) {
        return this.s != 0;
    }
    return (this[a] & 1 << b % this.DB) != 0;
}

function bnpChangeBit(c, b) {
    var a = BigInteger.ONE.shiftLeft(c);
    this.bitwiseTo(a, b, a);
    return a;
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

function bnpAddTo(d, f) {
    var e = 0, g = 0, b = Math.min(d.t, this.t);
    while (e < b) {
        g += this[e] + d[e];
        f[e++] = g & this.DM;
        g >>= this.DB;
    }
    if (d.t < this.t) {
        g += d.s;
        while (e < this.t) {
            g += this[e];
            f[e++] = g & this.DM;
            g >>= this.DB;
        }
        g += this.s;
    } else {
        g += this.s;
        while (e < d.t) {
            g += d[e];
            f[e++] = g & this.DM;
            g >>= this.DB;
        }
        g += d.s;
    }
    f.s = g < 0 ? -1 : 0;
    if (g > 0) {
        f[e++] = g;
    } else {
        if (g < -1) {
            f[e++] = this.DV + g;
        }
    }
    f.t = e;
    f.clamp();
}

function bnAdd(b) {
    var c = nbi();
    this.addTo(b, c);
    return c;
}

function bnSubtract(b) {
    var c = nbi();
    this.subTo(b, c);
    return c;
}

function bnMultiply(b) {
    var c = nbi();
    this.multiplyTo(b, c);
    return c;
}

function bnSquare() {
    var a = nbi();
    this.squareTo(a);
    return a;
}

function bnDivide(b) {
    var c = nbi();
    this.divRemTo(b, c, null);
    return c;
}

function bnRemainder(b) {
    var c = nbi();
    this.divRemTo(b, null, c);
    return c;
}

function bnDivideAndRemainder(b) {
    var d = nbi(), c = nbi();
    this.divRemTo(b, d, c);
    return new Array(d, c);
}

function bnpDMultiply(a) {
    this[this.t] = this.am(0, a - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp();
}

function bnpDAddOffset(b, a) {
    if (b == 0) {
        return;
    }
    while (this.t <= a) {
        this[this.t++] = 0;
    }
    this[a] += b;
    while (this[a] >= this.DV) {
        this[a] -= this.DV;
        if (++a >= this.t) {
            this[this.t++] = 0;
        }
        ++this[a];
    }
}

function NullExp() {}

function nNop(a) {
    return a;
}

function nMulTo(a, c, b) {
    a.multiplyTo(c, b);
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

function bnpMultiplyLowerTo(b, f, e) {
    var d = Math.min(this.t + b.t, f);
    e.s = 0;
    e.t = d;
    while (d > 0) {
        e[--d] = 0;
    }
    var c;
    for (c = e.t - this.t; d < c; ++d) {
        e[d + this.t] = this.am(0, b[d], e, d, 0, this.t);
    }
    for (c = Math.min(b.t, f); d < c; ++d) {
        this.am(0, b[d], e, d, 0, f - d);
    }
    e.clamp();
}

function bnpMultiplyUpperTo(b, e, d) {
    --e;
    var c = d.t = this.t + b.t - e;
    d.s = 0;
    while (--c >= 0) {
        d[c] = 0;
    }
    for (c = Math.max(e - this.t, 0); c < b.t; ++c) {
        d[this.t + c - e] = this.am(e - c, b[c], d, 0, 0, this.t + c - e);
    }
    d.clamp();
    d.drShiftTo(1, d);
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

function barrettMulTo(a, c, b) {
    a.multiplyTo(c, b);
    this.reduce(b);
}

Barrett.prototype.convert = barrettConvert;

Barrett.prototype.revert = barrettRevert;

Barrett.prototype.reduce = barrettReduce;

Barrett.prototype.mulTo = barrettMulTo;

Barrett.prototype.sqrTo = barrettSqrTo;

function bnModPow(q, f) {
    var o = q.bitLength(), h, b = nbv(1), v;
    if (o <= 0) {
        return b;
    } else {
        if (o < 18) {
            h = 1;
        } else {
            if (o < 48) {
                h = 3;
            } else {
                if (o < 144) {
                    h = 4;
                } else {
                    if (o < 768) {
                        h = 5;
                    } else {
                        h = 6;
                    }
                }
            }
        }
    }
    if (o < 8) {
        v = new Classic(f);
    } else {
        if (f.isEven()) {
            v = new Barrett(f);
        } else {
            v = new Montgomery(f);
        }
    }
    var p = new Array(), d = 3, s = h - 1, a = (1 << h) - 1;
    p[1] = v.convert(this);
    if (h > 1) {
        var A = nbi();
        v.sqrTo(p[1], A);
        while (d <= a) {
            p[d] = nbi();
            v.mulTo(A, p[d - 2], p[d]);
            d += 2;
        }
    }
    var l = q.t - 1, x, u = true, c = nbi(), y;
    o = nbits(q[l]) - 1;
    while (l >= 0) {
        if (o >= s) {
            x = q[l] >> o - s & a;
        } else {
            x = (q[l] & (1 << o + 1) - 1) << s - o;
            if (l > 0) {
                x |= q[l - 1] >> this.DB + o - s;
            }
        }
        d = h;
        while ((x & 1) == 0) {
            x >>= 1;
            --d;
        }
        if ((o -= d) < 0) {
            o += this.DB;
            --l;
        }
        if (u) {
            p[x].copyTo(b);
            u = false;
        } else {
            while (d > 1) {
                v.sqrTo(b, c);
                v.sqrTo(c, b);
                d -= 2;
            }
            if (d > 0) {
                v.sqrTo(b, c);
            } else {
                y = b;
                b = c;
                c = y;
            }
            v.mulTo(c, p[x], b);
        }
        while (l >= 0 && (q[l] & 1 << o) == 0) {
            v.sqrTo(b, c);
            y = b;
            b = c;
            c = y;
            if (--o < 0) {
                o = this.DB - 1;
                --l;
            }
        }
    }
    return v.revert(b);
}

function bnGCD(c) {
    var b = this.s < 0 ? this.negate() : this.clone();
    var h = c.s < 0 ? c.negate() : c.clone();
    if (b.compareTo(h) < 0) {
        var e = b;
        b = h;
        h = e;
    }
    var d = b.getLowestSetBit(), f = h.getLowestSetBit();
    if (f < 0) {
        return b;
    }
    if (d < f) {
        f = d;
    }
    if (f > 0) {
        b.rShiftTo(f, b);
        h.rShiftTo(f, h);
    }
    while (b.signum() > 0) {
        if ((d = b.getLowestSetBit()) > 0) {
            b.rShiftTo(d, b);
        }
        if ((d = h.getLowestSetBit()) > 0) {
            h.rShiftTo(d, h);
        }
        if (b.compareTo(h) >= 0) {
            b.subTo(h, b);
            b.rShiftTo(1, b);
        } else {
            h.subTo(b, h);
            h.rShiftTo(1, h);
        }
    }
    if (f > 0) {
        h.lShiftTo(f, h);
    }
    return h;
}

function bnpModInt(e) {
    if (e <= 0) {
        return 0;
    }
    var c = this.DV % e, b = this.s < 0 ? e - 1 : 0;
    if (this.t > 0) {
        if (c == 0) {
            b = this[0] % e;
        } else {
            for (var a = this.t - 1; a >= 0; --a) {
                b = (c * b + this[a]) % e;
            }
        }
    }
    return b;
}

function bnModInverse(f) {
    var j = f.isEven();
    if (this.isEven() && j || f.signum() == 0) {
        return BigInteger.ZERO;
    }
    var i = f.clone(), h = this.clone();
    var g = nbv(1), e = nbv(0), l = nbv(0), k = nbv(1);
    while (i.signum() != 0) {
        while (i.isEven()) {
            i.rShiftTo(1, i);
            if (j) {
                if (!g.isEven() || !e.isEven()) {
                    g.addTo(this, g);
                    e.subTo(f, e);
                }
                g.rShiftTo(1, g);
            } else {
                if (!e.isEven()) {
                    e.subTo(f, e);
                }
            }
            e.rShiftTo(1, e);
        }
        while (h.isEven()) {
            h.rShiftTo(1, h);
            if (j) {
                if (!l.isEven() || !k.isEven()) {
                    l.addTo(this, l);
                    k.subTo(f, k);
                }
                l.rShiftTo(1, l);
            } else {
                if (!k.isEven()) {
                    k.subTo(f, k);
                }
            }
            k.rShiftTo(1, k);
        }
        if (i.compareTo(h) >= 0) {
            i.subTo(h, i);
            if (j) {
                g.subTo(l, g);
            }
            e.subTo(k, e);
        } else {
            h.subTo(i, h);
            if (j) {
                l.subTo(g, l);
            }
            k.subTo(e, k);
        }
    }
    if (h.compareTo(BigInteger.ONE) != 0) {
        return BigInteger.ZERO;
    }
    if (k.compareTo(f) >= 0) {
        return k.subtract(f);
    }
    if (k.signum() < 0) {
        k.addTo(f, k);
    } else {
        return k;
    }
    if (k.signum() < 0) {
        return k.add(f);
    } else {
        return k;
    }
}

var lowprimes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997 ];

var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];

function bnIsProbablePrime(e) {
    var d, b = this.abs();
    if (b.t == 1 && b[0] <= lowprimes[lowprimes.length - 1]) {
        for (d = 0; d < lowprimes.length; ++d) {
            if (b[0] == lowprimes[d]) {
                return true;
            }
        }
        return false;
    }
    if (b.isEven()) {
        return false;
    }
    d = 1;
    while (d < lowprimes.length) {
        var a = lowprimes[d], c = d + 1;
        while (c < lowprimes.length && a < lplim) {
            a *= lowprimes[c++];
        }
        a = b.modInt(a);
        while (d < c) {
            if (a % lowprimes[d++] == 0) {
                return false;
            }
        }
    }
    return b.millerRabin(e);
}

function bnpMillerRabin(f) {
    var g = this.subtract(BigInteger.ONE);
    var c = g.getLowestSetBit();
    if (c <= 0) {
        return false;
    }
    var h = g.shiftRight(c);
    f = f + 1 >> 1;
    if (f > lowprimes.length) {
        f = lowprimes.length;
    }
    var b = nbi();
    for (var e = 0; e < f; ++e) {
        b.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var l = b.modPow(h, this);
        if (l.compareTo(BigInteger.ONE) != 0 && l.compareTo(g) != 0) {
            var d = 1;
            while (d++ < c && l.compareTo(g) != 0) {
                l = l.modPowInt(2, this);
                if (l.compareTo(BigInteger.ONE) == 0) {
                    return false;
                }
            }
            if (l.compareTo(g) != 0) {
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

function ARC4init(d) {
    var c, a, b;
    for (c = 0; c < 256; ++c) {
        this.S[c] = c;
    }
    a = 0;
    for (c = 0; c < 256; ++c) {
        a = a + this.S[c] + d[c % d.length] & 255;
        b = this.S[c];
        this.S[c] = this.S[a];
        this.S[a] = b;
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

function rng_get_bytes(b) {
    var a;
    for (a = 0; a < b.length; ++a) {
        b[a] = rng_get_byte();
    }
}

function SecureRandom() {}

SecureRandom.prototype.nextBytes = rng_get_bytes;

function parseBigInt(b, a) {
    return new BigInteger(b, a);
}

function linebrk(c, d) {
    var a = "";
    var b = 0;
    while (b + d < c.length) {
        a += c.substring(b, b + d) + "\n";
        b += d;
    }
    return a + c.substring(b, c.length);
}

function byte2Hex(a) {
    if (a < 16) {
        return "0" + a.toString(16);
    } else {
        return a.toString(16);
    }
}

function pkcs1pad2(e, h) {
    if (h < e.length + 11) {
        alert("Message too long for RSA");
        return null;
    }
    var g = new Array();
    var d = e.length - 1;
    while (d >= 0 && h > 0) {
        var f = e.charCodeAt(d--);
        if (f < 128) {
            g[--h] = f;
        } else {
            if (f > 127 && f < 2048) {
                g[--h] = f & 63 | 128;
                g[--h] = f >> 6 | 192;
            } else {
                g[--h] = f & 63 | 128;
                g[--h] = f >> 6 & 63 | 128;
                g[--h] = f >> 12 | 224;
            }
        }
    }
    g[--h] = 0;
    var b = new SecureRandom();
    var a = new Array();
    while (h > 2) {
        a[0] = 0;
        while (a[0] == 0) {
            b.nextBytes(a);
        }
        g[--h] = a[0];
    }
    g[--h] = 2;
    g[--h] = 0;
    return new BigInteger(g);
}

function oaep_mgf1_arr(c, a, e) {
    var b = "", d = 0;
    while (b.length < a) {
        b += e(String.fromCharCode.apply(String, c.concat([ (d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255 ])));
        d += 1;
    }
    return b;
}

var SHA1_SIZE = 20;

function oaep_pad(l, a, c) {
    if (l.length + 2 * SHA1_SIZE + 2 > a) {
        throw "Message too long for RSA";
    }
    var h = "", d;
    for (d = 0; d < a - l.length - 2 * SHA1_SIZE - 2; d += 1) {
        h += "\x00";
    }
    var e = rstr_sha1("") + h + "" + l;
    var f = new Array(SHA1_SIZE);
    new SecureRandom().nextBytes(f);
    var g = oaep_mgf1_arr(f, e.length, c || rstr_sha1);
    var k = [];
    for (d = 0; d < e.length; d += 1) {
        k[d] = e.charCodeAt(d) ^ g.charCodeAt(d);
    }
    var j = oaep_mgf1_arr(k, f.length, rstr_sha1);
    var b = [ 0 ];
    for (d = 0; d < f.length; d += 1) {
        b[d + 1] = f[d] ^ j.charCodeAt(d);
    }
    return new BigInteger(b.concat(k));
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

function RSASetPublic(b, a) {
    if (typeof b !== "string") {
        this.n = b;
        this.e = a;
    } else {
        if (b != null && a != null && b.length > 0 && a.length > 0) {
            this.n = parseBigInt(b, 16);
            this.e = parseInt(a, 16);
        } else {
            alert("Invalid RSA public key");
        }
    }
}

function RSADoPublic(a) {
    return a.modPowInt(this.e, this.n);
}

function RSAEncrypt(d) {
    var a = pkcs1pad2(d, this.n.bitLength() + 7 >> 3);
    if (a == null) {
        return null;
    }
    var e = this.doPublic(a);
    if (e == null) {
        return null;
    }
    var b = e.toString(16);
    if ((b.length & 1) == 0) {
        return b;
    } else {
        return "0" + b;
    }
}

function RSAEncryptOAEP(e, d) {
    var a = oaep_pad(e, this.n.bitLength() + 7 >> 3, d);
    if (a == null) {
        return null;
    }
    var f = this.doPublic(a);
    if (f == null) {
        return null;
    }
    var b = f.toString(16);
    if ((b.length & 1) == 0) {
        return b;
    } else {
        return "0" + b;
    }
}

RSAKey.prototype.doPublic = RSADoPublic;

RSAKey.prototype.setPublic = RSASetPublic;

RSAKey.prototype.encrypt = RSAEncrypt;

RSAKey.prototype.encryptOAEP = RSAEncryptOAEP;

RSAKey.prototype.type = "RSA";

function pkcs1unpad2(g, j) {
    var a = g.toByteArray();
    var f = 0;
    while (f < a.length && a[f] == 0) {
        ++f;
    }
    if (a.length - f != j - 1 || a[f] != 2) {
        return null;
    }
    ++f;
    while (a[f] != 0) {
        if (++f >= a.length) {
            return null;
        }
    }
    var e = "";
    while (++f < a.length) {
        var h = a[f] & 255;
        if (h < 128) {
            e += String.fromCharCode(h);
        } else {
            if (h > 191 && h < 224) {
                e += String.fromCharCode((h & 31) << 6 | a[f + 1] & 63);
                ++f;
            } else {
                e += String.fromCharCode((h & 15) << 12 | (a[f + 1] & 63) << 6 | a[f + 2] & 63);
                f += 2;
            }
        }
    }
    return e;
}

function oaep_mgf1_str(c, a, e) {
    var b = "", d = 0;
    while (b.length < a) {
        b += e(c + String.fromCharCode.apply(String, [ (d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255 ]));
        d += 1;
    }
    return b;
}

var SHA1_SIZE = 20;

function oaep_unpad(l, b, e) {
    l = l.toByteArray();
    var f;
    for (f = 0; f < l.length; f += 1) {
        l[f] &= 255;
    }
    while (l.length < b) {
        l.unshift(0);
    }
    l = String.fromCharCode.apply(String, l);
    if (l.length < 2 * SHA1_SIZE + 2) {
        throw "Cipher too short";
    }
    var c = l.substr(1, SHA1_SIZE);
    var o = l.substr(SHA1_SIZE + 1);
    var m = oaep_mgf1_str(o, SHA1_SIZE, e || rstr_sha1);
    var h = [], f;
    for (f = 0; f < c.length; f += 1) {
        h[f] = c.charCodeAt(f) ^ m.charCodeAt(f);
    }
    var j = oaep_mgf1_str(String.fromCharCode.apply(String, h), l.length - SHA1_SIZE, rstr_sha1);
    var g = [];
    for (f = 0; f < o.length; f += 1) {
        g[f] = o.charCodeAt(f) ^ j.charCodeAt(f);
    }
    g = String.fromCharCode.apply(String, g);
    if (g.substr(0, SHA1_SIZE) !== rstr_sha1("")) {
        throw "Hash mismatch";
    }
    g = g.substr(SHA1_SIZE);
    var a = g.indexOf("");
    var k = a != -1 ? g.substr(0, a).lastIndexOf("\x00") : -1;
    if (k + 1 != a) {
        throw "Malformed data";
    }
    return g.substr(a + 1);
}

function RSASetPrivate(c, a, b) {
    if (typeof c !== "string") {
        this.n = c;
        this.e = a;
        this.d = b;
    } else {
        if (c != null && a != null && c.length > 0 && a.length > 0) {
            this.n = parseBigInt(c, 16);
            this.e = parseInt(a, 16);
            this.d = parseBigInt(b, 16);
        } else {
            alert("Invalid RSA private key");
        }
    }
}

function RSASetPrivateEx(g, d, e, c, b, a, h, f) {
    if (g == null) {
        throw "RSASetPrivateEx N == null";
    }
    if (d == null) {
        throw "RSASetPrivateEx E == null";
    }
    if (g.length == 0) {
        throw "RSASetPrivateEx N.length == 0";
    }
    if (d.length == 0) {
        throw "RSASetPrivateEx E.length == 0";
    }
    if (g != null && d != null && g.length > 0 && d.length > 0) {
        this.n = parseBigInt(g, 16);
        this.e = parseInt(d, 16);
        this.d = parseBigInt(e, 16);
        this.p = parseBigInt(c, 16);
        this.q = parseBigInt(b, 16);
        this.dmp1 = parseBigInt(a, 16);
        this.dmq1 = parseBigInt(h, 16);
        this.coeff = parseBigInt(f, 16);
    } else {
        alert("Invalid RSA private key in RSASetPrivateEx");
    }
}

function RSAGenerate(b, i) {
    var a = new SecureRandom();
    var f = b >> 1;
    this.e = parseInt(i, 16);
    var c = new BigInteger(i, 16);
    for (;;) {
        for (;;) {
            this.p = new BigInteger(b - f, 1, a);
            if (this.p.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
                break;
            }
        }
        for (;;) {
            this.q = new BigInteger(f, 1, a);
            if (this.q.subtract(BigInteger.ONE).gcd(c).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
                break;
            }
        }
        if (this.p.compareTo(this.q) <= 0) {
            var h = this.p;
            this.p = this.q;
            this.q = h;
        }
        var g = this.p.subtract(BigInteger.ONE);
        var d = this.q.subtract(BigInteger.ONE);
        var e = g.multiply(d);
        if (e.gcd(c).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = c.modInverse(e);
            this.dmp1 = this.d.mod(g);
            this.dmq1 = this.d.mod(d);
            this.coeff = this.q.modInverse(this.p);
            break;
        }
    }
}

function RSADoPrivate(a) {
    if (this.p == null || this.q == null) {
        return a.modPow(this.d, this.n);
    }
    var c = a.mod(this.p).modPow(this.dmp1, this.p);
    var b = a.mod(this.q).modPow(this.dmq1, this.q);
    while (c.compareTo(b) < 0) {
        c = c.add(this.p);
    }
    return c.subtract(b).multiply(this.coeff).mod(this.p).multiply(this.q).add(b);
}

function RSADecrypt(b) {
    var d = parseBigInt(b, 16);
    var a = this.doPrivate(d);
    if (a == null) {
        return null;
    }
    return pkcs1unpad2(a, this.n.bitLength() + 7 >> 3);
}

function RSADecryptOAEP(d, b) {
    var e = parseBigInt(d, 16);
    var a = this.doPrivate(e);
    if (a == null) {
        return null;
    }
    return oaep_unpad(a, this.n.bitLength() + 7 >> 3, b);
}

RSAKey.prototype.doPrivate = RSADoPrivate;

RSAKey.prototype.setPrivate = RSASetPrivate;

RSAKey.prototype.setPrivateEx = RSASetPrivateEx;

RSAKey.prototype.generate = RSAGenerate;

RSAKey.prototype.decrypt = RSADecrypt;

RSAKey.prototype.decryptOAEP = RSADecryptOAEP;

function ECFieldElementFp(b, a) {
    this.x = a;
    this.q = b;
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

function ECPointFp(c, a, d, b) {
    this.curve = c;
    this.x = a;
    this.y = d;
    if (b == null) {
        this.z = BigInteger.ONE;
    } else {
        this.z = b;
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
    var c, b;
    c = a.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(a.z)).mod(this.curve.q);
    if (!c.equals(BigInteger.ZERO)) {
        return false;
    }
    b = a.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(a.z)).mod(this.curve.q);
    return b.equals(BigInteger.ZERO);
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

function pointFpAdd(l) {
    if (this.isInfinity()) {
        return l;
    }
    if (l.isInfinity()) {
        return this;
    }
    var p = l.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(l.z)).mod(this.curve.q);
    var o = l.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(l.z)).mod(this.curve.q);
    if (BigInteger.ZERO.equals(o)) {
        if (BigInteger.ZERO.equals(p)) {
            return this.twice();
        }
        return this.curve.getInfinity();
    }
    var j = new BigInteger("3");
    var e = this.x.toBigInteger();
    var n = this.y.toBigInteger();
    var c = l.x.toBigInteger();
    var k = l.y.toBigInteger();
    var m = o.square();
    var i = m.multiply(o);
    var d = e.multiply(m);
    var g = p.square().multiply(this.z);
    var a = g.subtract(d.shiftLeft(1)).multiply(l.z).subtract(i).multiply(o).mod(this.curve.q);
    var h = d.multiply(j).multiply(p).subtract(n.multiply(i)).subtract(g.multiply(p)).multiply(l.z).add(p.multiply(i)).mod(this.curve.q);
    var f = i.multiply(this.z).multiply(l.z).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(a), this.curve.fromBigInteger(h), f);
}

function pointFpTwice() {
    if (this.isInfinity()) {
        return this;
    }
    if (this.y.toBigInteger().signum() == 0) {
        return this.curve.getInfinity();
    }
    var g = new BigInteger("3");
    var c = this.x.toBigInteger();
    var h = this.y.toBigInteger();
    var e = h.multiply(this.z);
    var j = e.multiply(h).mod(this.curve.q);
    var i = this.curve.a.toBigInteger();
    var k = c.square().multiply(g);
    if (!BigInteger.ZERO.equals(i)) {
        k = k.add(this.z.square().multiply(i));
    }
    k = k.mod(this.curve.q);
    var b = k.square().subtract(c.shiftLeft(3).multiply(j)).shiftLeft(1).multiply(e).mod(this.curve.q);
    var f = k.multiply(g).multiply(c).subtract(j.shiftLeft(1)).shiftLeft(2).multiply(j).subtract(k.square().multiply(k)).mod(this.curve.q);
    var d = e.square().multiply(e).shiftLeft(3).mod(this.curve.q);
    return new ECPointFp(this.curve, this.curve.fromBigInteger(b), this.curve.fromBigInteger(f), d);
}

function pointFpMultiply(b) {
    if (this.isInfinity()) {
        return this;
    }
    if (b.signum() == 0) {
        return this.curve.getInfinity();
    }
    var g = b;
    var f = g.multiply(new BigInteger("3"));
    var l = this.negate();
    var d = this;
    var c;
    for (c = f.bitLength() - 2; c > 0; --c) {
        d = d.twice();
        var a = f.testBit(c);
        var j = g.testBit(c);
        if (a != j) {
            d = d.add(a ? this : l);
        }
    }
    return d;
}

function pointFpMultiplyTwo(c, a, b) {
    var d;
    if (c.bitLength() > b.bitLength()) {
        d = c.bitLength() - 1;
    } else {
        d = b.bitLength() - 1;
    }
    var f = this.curve.getInfinity();
    var e = this.add(a);
    while (d >= 0) {
        f = f.twice();
        if (c.testBit(d)) {
            if (b.testBit(d)) {
                f = f.add(e);
            } else {
                f = f.add(this);
            }
        } else {
            if (b.testBit(d)) {
                f = f.add(a);
            }
        }
        --d;
    }
    return f;
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

function ECCurveFp(e, d, c) {
    this.q = e;
    this.a = this.fromBigInteger(d);
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

function curveFpDecodePointHex(d) {
    switch (parseInt(d.substr(0, 2), 16)) {
      case 0:
        return this.infinity;

      case 2:
      case 3:
        return null;

      case 4:
      case 6:
      case 7:
        var a = (d.length - 2) / 2;
        var c = d.substr(2, a);
        var b = d.substr(a + 2, a);
        return new ECPointFp(this, this.fromBigInteger(new BigInteger(c, 16)), this.fromBigInteger(new BigInteger(b, 16)));

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

ECPointFp.prototype.getEncoded = function(c) {
    var d = function(h, f) {
        var g = h.toByteArrayUnsigned();
        if (f < g.length) {
            g = g.slice(g.length - f);
        } else {
            while (f > g.length) {
                g.unshift(0);
            }
        }
        return g;
    };
    var a = this.getX().toBigInteger();
    var e = this.getY().toBigInteger();
    var b = d(a, 32);
    if (c) {
        if (e.isEven()) {
            b.unshift(2);
        } else {
            b.unshift(3);
        }
    } else {
        b.unshift(4);
        b = b.concat(d(e, 32));
    }
    return b;
};

ECPointFp.decodeFrom = function(g, c) {
    var f = c[0];
    var e = c.length - 1;
    var d = c.slice(1, 1 + e / 2);
    var b = c.slice(1 + e / 2, 1 + e);
    d.unshift(0);
    b.unshift(0);
    var a = new BigInteger(d);
    var h = new BigInteger(b);
    return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h));
};

ECPointFp.decodeFromHex = function(g, c) {
    var f = c.substr(0, 2);
    var e = c.length - 2;
    var d = c.substr(2, e / 2);
    var b = c.substr(2 + e / 2, e / 2);
    var a = new BigInteger(d, 16);
    var h = new BigInteger(b, 16);
    return new ECPointFp(g, g.fromBigInteger(a), g.fromBigInteger(h));
};

ECPointFp.prototype.add2D = function(c) {
    if (this.isInfinity()) {
        return c;
    }
    if (c.isInfinity()) {
        return this;
    }
    if (this.x.equals(c.x)) {
        if (this.y.equals(c.y)) {
            return this.twice();
        }
        return this.curve.getInfinity();
    }
    var g = c.x.subtract(this.x);
    var e = c.y.subtract(this.y);
    var a = e.divide(g);
    var d = a.square().subtract(this.x).subtract(c.x);
    var f = a.multiply(this.x.subtract(d)).subtract(this.y);
    return new ECPointFp(this.curve, d, f);
};

ECPointFp.prototype.twice2D = function() {
    if (this.isInfinity()) {
        return this;
    }
    if (this.y.toBigInteger().signum() == 0) {
        return this.curve.getInfinity();
    }
    var b = this.curve.fromBigInteger(BigInteger.valueOf(2));
    var e = this.curve.fromBigInteger(BigInteger.valueOf(3));
    var a = this.x.square().multiply(e).add(this.curve.a).divide(this.y.multiply(b));
    var c = a.square().subtract(this.x.multiply(b));
    var d = a.multiply(this.x.subtract(c)).subtract(this.y);
    return new ECPointFp(this.curve, c, d);
};

ECPointFp.prototype.multiply2D = function(b) {
    if (this.isInfinity()) {
        return this;
    }
    if (b.signum() == 0) {
        return this.curve.getInfinity();
    }
    var g = b;
    var f = g.multiply(new BigInteger("3"));
    var l = this.negate();
    var d = this;
    var c;
    for (c = f.bitLength() - 2; c > 0; --c) {
        d = d.twice();
        var a = f.testBit(c);
        var j = g.testBit(c);
        if (a != j) {
            d = d.add2D(a ? this : l);
        }
    }
    return d;
};

ECPointFp.prototype.isOnCurve = function() {
    var d = this.getX().toBigInteger();
    var i = this.getY().toBigInteger();
    var f = this.curve.getA().toBigInteger();
    var c = this.curve.getB().toBigInteger();
    var h = this.curve.getQ();
    var e = i.multiply(i).mod(h);
    var g = d.multiply(d).multiply(d).add(f.multiply(d)).add(c).mod(h);
    return e.equals(g);
};

ECPointFp.prototype.toString = function() {
    return "(" + this.getX().toBigInteger().toString() + "," + this.getY().toBigInteger().toString() + ")";
};

ECPointFp.prototype.validate = function() {
    var c = this.curve.getQ();
    if (this.isInfinity()) {
        throw new Error("Point is at infinity.");
    }
    var a = this.getX().toBigInteger();
    var b = this.getY().toBigInteger();
    if (a.compareTo(BigInteger.ONE) < 0 || a.compareTo(c.subtract(BigInteger.ONE)) > 0) {
        throw new Error("x coordinate out of bounds");
    }
    if (b.compareTo(BigInteger.ONE) < 0 || b.compareTo(c.subtract(BigInteger.ONE)) > 0) {
        throw new Error("y coordinate out of bounds");
    }
    if (!this.isOnCurve()) {
        throw new Error("Point is not on the curve.");
    }
    if (this.multiply(c).isInfinity()) {
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
    this.bigIntToMinTwosComplementsHex = function(j) {
        var f = j.toString(16);
        if (f.substr(0, 1) != "-") {
            if (f.length % 2 == 1) {
                f = "0" + f;
            } else {
                if (!f.match(/^[0-7]/)) {
                    f = "00" + f;
                }
            }
        } else {
            var a = f.substr(1);
            var e = a.length;
            if (e % 2 == 1) {
                e += 1;
            } else {
                if (!f.match(/^[0-7]/)) {
                    e += 2;
                }
            }
            var g = "";
            for (var d = 0; d < e; d++) {
                g += "f";
            }
            var c = new BigInteger(g, 16);
            var b = c.xor(j).add(BigInteger.ONE);
            f = b.toString(16).replace(/^-/, "");
        }
        return f;
    };
    this.getPEMStringFromHex = function(a, b) {
        var c = KJUR.asn1;
        var f = CryptoJS.enc.Hex.parse(a);
        var d = CryptoJS.enc.Base64.stringify(f);
        var e = d.replace(/(.{64})/g, "$1\r\n");
        e = e.replace(/\r\n$/, "");
        return "-----BEGIN " + b + "-----\r\n" + e + "\r\n-----END " + b + "-----\r\n";
    };
    this.newObject = function(b) {
        var e = KJUR.asn1;
        var h = Object.keys(b);
        if (h.length != 1) {
            throw "key of param shall be only one.";
        }
        var g = h[0];
        if (":bool:int:bitstr:octstr:null:oid:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + g + ":") == -1) {
            throw "undefined key: " + g;
        }
        if (g == "bool") {
            return new e.DERBoolean(b[g]);
        }
        if (g == "int") {
            return new e.DERInteger(b[g]);
        }
        if (g == "bitstr") {
            return new e.DERBitString(b[g]);
        }
        if (g == "octstr") {
            return new e.DEROctetString(b[g]);
        }
        if (g == "null") {
            return new e.DERNull(b[g]);
        }
        if (g == "oid") {
            return new e.DERObjectIdentifier(b[g]);
        }
        if (g == "utf8str") {
            return new e.DERUTF8String(b[g]);
        }
        if (g == "numstr") {
            return new e.DERNumericString(b[g]);
        }
        if (g == "prnstr") {
            return new e.DERPrintableString(b[g]);
        }
        if (g == "telstr") {
            return new e.DERTeletexString(b[g]);
        }
        if (g == "ia5str") {
            return new e.DERIA5String(b[g]);
        }
        if (g == "utctime") {
            return new e.DERUTCTime(b[g]);
        }
        if (g == "gentime") {
            return new e.DERGeneralizedTime(b[g]);
        }
        if (g == "seq") {
            var k = b[g];
            var f = [];
            for (var c = 0; c < k.length; c++) {
                var j = e.ASN1Util.newObject(k[c]);
                f.push(j);
            }
            return new e.DERSequence({
                array: f
            });
        }
        if (g == "set") {
            var k = b[g];
            var f = [];
            for (var c = 0; c < k.length; c++) {
                var j = e.ASN1Util.newObject(k[c]);
                f.push(j);
            }
            return new e.DERSet({
                array: f
            });
        }
        if (g == "tag") {
            var d = {};
            if (b[g].explicit !== undefined) {
                d.explicit = b[g].explicit;
            }
            if (b[g].tag !== undefined) {
                d.tag = b[g].tag;
            }
            if (b[g].obj === undefined) {
                throw "obj shall be specified for 'tag'.";
            }
            d.obj = e.ASN1Util.newObject(b[g].obj);
            return new e.DERTaggedObject(d);
        }
    };
}();

KJUR.asn1.ASN1Object = function() {
    var c = true;
    var b = null;
    var d = "00";
    var e = "00";
    var a = "";
    this.getLengthHexFromValue = function() {
        if (typeof this.hV == "undefined" || this.hV == null) {
            throw "this.hV is null or undefined.";
        }
        if (this.hV.length % 2 == 1) {
            throw "value hex must be even length: n=" + a.length + ",v=" + this.hV;
        }
        var i = this.hV.length / 2;
        var h = i.toString(16);
        if (h.length % 2 == 1) {
            h = "0" + h;
        }
        if (i < 128) {
            return h;
        } else {
            var g = h.length / 2;
            if (g > 15) {
                throw "ASN.1 length too long to represent by 8x: n = " + i.toString(16);
            }
            var f = 128 + g;
            return f.toString(16) + h;
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

KJUR.asn1.DERAbstractString = function(c) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.getString = function() {
        return this.s;
    };
    this.setString = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = d;
        this.hV = stohex(this.s);
    };
    this.setStringHex = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = d;
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
    if (typeof c != "undefined") {
        if (typeof c == "string") {
            this.setString(c);
        } else {
            if (typeof c.str != "undefined") {
                this.setString(c.str);
            } else {
                if (typeof c.hex != "undefined") {
                    this.setStringHex(c.hex);
                }
            }
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);

KJUR.asn1.DERAbstractTime = function(c) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.localDateToUTC = function(f) {
        utc = f.getTime() + f.getTimezoneOffset() * 6e4;
        var e = new Date(utc);
        return e;
    };
    this.formatDate = function(j, l) {
        var e = this.zeroPadding;
        var k = this.localDateToUTC(j);
        var m = String(k.getFullYear());
        if (l == "utc") {
            m = m.substr(2, 2);
        }
        var i = e(String(k.getMonth() + 1), 2);
        var n = e(String(k.getDate()), 2);
        var f = e(String(k.getHours()), 2);
        var g = e(String(k.getMinutes()), 2);
        var h = e(String(k.getSeconds()), 2);
        return m + i + n + f + g + h + "Z";
    };
    this.zeroPadding = function(e, d) {
        if (e.length >= d) {
            return e;
        }
        return new Array(d - e.length + 1).join("0") + e;
    };
    this.getString = function() {
        return this.s;
    };
    this.setString = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = d;
        this.hV = stohex(d);
    };
    this.setByDateValue = function(h, j, e, d, f, g) {
        var i = new Date(Date.UTC(h, j - 1, e, d, f, g, 0));
        this.setByDate(i);
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
};

YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);

KJUR.asn1.DERAbstractStructured = function(b) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    var a = null;
    this.setByASN1ObjectArray = function(c) {
        this.hTLV = null;
        this.isModified = true;
        this.asn1Array = c;
    };
    this.appendASN1Object = function(c) {
        this.hTLV = null;
        this.isModified = true;
        this.asn1Array.push(c);
    };
    this.asn1Array = new Array();
    if (typeof b != "undefined") {
        if (typeof b.array != "undefined") {
            this.asn1Array = b.array;
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
    this.setByBigInteger = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(b);
    };
    this.setByInteger = function(c) {
        var b = new BigInteger(String(c), 10);
        this.setByBigInteger(b);
    };
    this.setValueHex = function(b) {
        this.hV = b;
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
    this.setHexValueIncludingUnusedBits = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.hV = b;
    };
    this.setUnusedBitsAndHexValue = function(b, d) {
        if (b < 0 || 7 < b) {
            throw "unused bits shall be from 0 to 7: u = " + b;
        }
        var c = "0" + b;
        this.hTLV = null;
        this.isModified = true;
        this.hV = c + d;
    };
    this.setByBinaryString = function(e) {
        e = e.replace(/0+$/, "");
        var f = 8 - e.length % 8;
        if (f == 8) {
            f = 0;
        }
        for (var g = 0; g <= f; g++) {
            e += "0";
        }
        var j = "";
        for (var g = 0; g < e.length - 1; g += 8) {
            var d = e.substr(g, 8);
            var c = parseInt(d, 2).toString(16);
            if (c.length == 1) {
                c = "0" + c;
            }
            j += c;
        }
        this.hTLV = null;
        this.isModified = true;
        this.hV = "0" + f + j;
    };
    this.setByBooleanArray = function(d) {
        var c = "";
        for (var b = 0; b < d.length; b++) {
            if (d[b] == true) {
                c += "1";
            } else {
                c += "0";
            }
        }
        this.setByBinaryString(c);
    };
    this.newFalseArray = function(d) {
        var b = new Array(d);
        for (var c = 0; c < d; c++) {
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

KJUR.asn1.DERObjectIdentifier = function(c) {
    var b = function(d) {
        var e = d.toString(16);
        if (e.length == 1) {
            e = "0" + e;
        }
        return e;
    };
    var a = function(k) {
        var j = "";
        var e = new BigInteger(k, 10);
        var d = e.toString(2);
        var f = 7 - d.length % 7;
        if (f == 7) {
            f = 0;
        }
        var m = "";
        for (var g = 0; g < f; g++) {
            m += "0";
        }
        d = m + d;
        for (var g = 0; g < d.length - 1; g += 7) {
            var l = d.substr(g, 7);
            if (g != d.length - 7) {
                l = "1" + l;
            }
            j += b(parseInt(l, 2));
        }
        return j;
    };
    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    this.setValueHex = function(d) {
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = d;
    };
    this.setValueOidString = function(f) {
        if (!f.match(/^[0-9.]+$/)) {
            throw "malformed oid string: " + f;
        }
        var g = "";
        var d = f.split(".");
        var j = parseInt(d[0]) * 40 + parseInt(d[1]);
        g += b(j);
        d.splice(0, 2);
        for (var e = 0; e < d.length; e++) {
            g += a(d[e]);
        }
        this.hTLV = null;
        this.isModified = true;
        this.s = null;
        this.hV = g;
    };
    this.setValueName = function(e) {
        if (typeof KJUR.asn1.x509.OID.name2oidList[e] != "undefined") {
            var d = KJUR.asn1.x509.OID.name2oidList[e];
            this.setValueOidString(d);
        } else {
            throw "DERObjectIdentifier oidName undefined: " + e;
        }
    };
    this.getFreshValueHex = function() {
        return this.hV;
    };
    if (typeof c != "undefined") {
        if (typeof c == "string" && c.match(/^[0-2].[0-9.]+$/)) {
            this.setValueOidString(c);
        } else {
            if (KJUR.asn1.x509.OID.name2oidList[c] !== undefined) {
                this.setValueOidString(KJUR.asn1.x509.OID.name2oidList[c]);
            } else {
                if (typeof c.oid != "undefined") {
                    this.setValueOidString(c.oid);
                } else {
                    if (typeof c.hex != "undefined") {
                        this.setValueHex(c.hex);
                    } else {
                        if (typeof c.name != "undefined") {
                            this.setValueName(c.name);
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
    this.setByDate = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.date = b;
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
    this.setByDate = function(b) {
        this.hTLV = null;
        this.isModified = true;
        this.date = b;
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
        var c = "";
        for (var b = 0; b < this.asn1Array.length; b++) {
            var d = this.asn1Array[b];
            c += d.getEncodedHex();
        }
        this.hV = c;
        return this.hV;
    };
};

YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);

KJUR.asn1.DERSet = function(a) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, a);
    this.hT = "31";
    this.getFreshValueHex = function() {
        var b = new Array();
        for (var c = 0; c < this.asn1Array.length; c++) {
            var d = this.asn1Array[c];
            b.push(d.getEncodedHex());
        }
        b.sort();
        this.hV = b.join("");
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
    this.setASN1Object = function(b, c, d) {
        this.hT = c;
        this.isExplicit = b;
        this.asn1Object = d;
        if (this.isExplicit) {
            this.hV = this.asn1Object.getEncodedHex();
            this.hTLV = null;
            this.isModified = true;
        } else {
            this.hV = null;
            this.hTLV = d.getEncodedHex();
            this.hTLV = this.hTLV.replace(/^../, c);
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
    this.getByteLengthOfL_AtObj = function(b, c) {
        if (b.substring(c + 2, c + 3) != "8") {
            return 1;
        }
        var a = parseInt(b.substring(c + 3, c + 4));
        if (a == 0) {
            return -1;
        }
        if (0 < a && a < 10) {
            return a + 1;
        }
        return -2;
    };
    this.getHexOfL_AtObj = function(b, c) {
        var a = this.getByteLengthOfL_AtObj(b, c);
        if (a < 1) {
            return "";
        }
        return b.substring(c + 2, c + 2 + a * 2);
    };
    this.getIntOfL_AtObj = function(c, d) {
        var b = this.getHexOfL_AtObj(c, d);
        if (b == "") {
            return -1;
        }
        var a;
        if (parseInt(b.substring(0, 1)) < 8) {
            a = new BigInteger(b, 16);
        } else {
            a = new BigInteger(b.substring(2), 16);
        }
        return a.intValue();
    };
    this.getStartPosOfV_AtObj = function(b, c) {
        var a = this.getByteLengthOfL_AtObj(b, c);
        if (a < 0) {
            return a;
        }
        return c + (a + 1) * 2;
    };
    this.getHexOfV_AtObj = function(c, d) {
        var b = this.getStartPosOfV_AtObj(c, d);
        var a = this.getIntOfL_AtObj(c, d);
        return c.substring(b, b + a * 2);
    };
    this.getHexOfTLV_AtObj = function(c, e) {
        var b = c.substr(e, 2);
        var d = this.getHexOfL_AtObj(c, e);
        var a = this.getHexOfV_AtObj(c, e);
        return b + d + a;
    };
    this.getPosOfNextSibling_AtObj = function(c, d) {
        var b = this.getStartPosOfV_AtObj(c, d);
        var a = this.getIntOfL_AtObj(c, d);
        return b + a * 2;
    };
    this.getPosArrayOfChildren_AtObj = function(f, j) {
        var c = new Array();
        var i = this.getStartPosOfV_AtObj(f, j);
        c.push(i);
        var b = this.getIntOfL_AtObj(f, j);
        var g = i;
        var d = 0;
        while (1) {
            var e = this.getPosOfNextSibling_AtObj(f, g);
            if (e == null || e - i >= b * 2) {
                break;
            }
            if (d >= 200) {
                break;
            }
            c.push(e);
            g = e;
            d++;
        }
        return c;
    };
    this.getNthChildIndex_AtObj = function(d, b, e) {
        var c = this.getPosArrayOfChildren_AtObj(d, b);
        return c[e];
    };
    this.getDecendantIndexByNthList = function(e, d, c) {
        if (c.length == 0) {
            return d;
        }
        var f = c.shift();
        var b = this.getPosArrayOfChildren_AtObj(e, d);
        return this.getDecendantIndexByNthList(e, b[f], c);
    };
    this.getDecendantHexTLVByNthList = function(d, c, b) {
        var a = this.getDecendantIndexByNthList(d, c, b);
        return this.getHexOfTLV_AtObj(d, a);
    };
    this.getDecendantHexVByNthList = function(d, c, b) {
        var a = this.getDecendantIndexByNthList(d, c, b);
        return this.getHexOfV_AtObj(d, a);
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

KJUR.asn1.x509.Certificate = function(f) {
    KJUR.asn1.x509.Certificate.superclass.constructor.call(this);
    var a = null;
    var c = null;
    var e = null;
    var b = null;
    var d = null;
    this.setRsaPrvKeyByPEMandPass = function(h, j) {
        var g = PKCS5PKEY.getDecryptedKeyHex(h, j);
        var i = new RSAKey();
        i.readPrivateKeyFromASN1HexString(g);
        this.rsaPrvKey = i;
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
        var g = new KJUR.asn1.DERSequence({
            array: [ this.asn1TBSCert, this.asn1SignatureAlg, this.asn1Sig ]
        });
        this.hTLV = g.getEncodedHex();
        this.isModified = false;
    };
    this.getEncodedHex = function() {
        if (this.isModified == false && this.hTLV != null) {
            return this.hTLV;
        }
        throw "not signed yet";
    };
    this.getPEMString = function() {
        var i = this.getEncodedHex();
        var g = CryptoJS.enc.Hex.parse(i);
        var h = CryptoJS.enc.Base64.stringify(g);
        var j = h.replace(/(.{64})/g, "$1\r\n");
        return "-----BEGIN CERTIFICATE-----\r\n" + j + "\r\n-----END CERTIFICATE-----\r\n";
    };
    if (typeof f != "undefined") {
        if (typeof f.tbscertobj != "undefined") {
            this.asn1TBSCert = f.tbscertobj;
        }
        if (typeof f.rsaprvkey != "undefined") {
            this.rsaPrvKey = f.rsaprvkey;
        }
        if (typeof f.rsaprvpem != "undefined" && typeof f.rsaprvpas != "undefined") {
            this.setRsaPrvKeyByPEMandPass(f.rsaprvpem, f.rsaprvpas);
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
    this.setSerialNumberByParam = function(b) {
        this.asn1SerialNumber = new KJUR.asn1.DERInteger(b);
    };
    this.setSignatureAlgByParam = function(b) {
        this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(b);
    };
    this.setIssuerByParam = function(b) {
        this.asn1Issuer = new KJUR.asn1.x509.X500Name(b);
    };
    this.setNotBeforeByParam = function(b) {
        this.asn1NotBefore = new KJUR.asn1.x509.Time(b);
    };
    this.setNotAfterByParam = function(b) {
        this.asn1NotAfter = new KJUR.asn1.x509.Time(b);
    };
    this.setSubjectByParam = function(b) {
        this.asn1Subject = new KJUR.asn1.x509.X500Name(b);
    };
    this.setSubjectPublicKeyByParam = function(b) {
        this.asn1SubjPKey = new KJUR.asn1.x509.SubjectPublicKeyInfo(b);
    };
    this.appendExtension = function(b) {
        this.extensionsArray.push(b);
    };
    this.getEncodedHex = function() {
        if (this.asn1NotBefore == null || this.asn1NotAfter == null) {
            throw "notBefore and/or notAfter not set";
        }
        var c = new KJUR.asn1.DERSequence({
            array: [ this.asn1NotBefore, this.asn1NotAfter ]
        });
        this.asn1Array = new Array();
        this.asn1Array.push(this.asn1Version);
        this.asn1Array.push(this.asn1SerialNumber);
        this.asn1Array.push(this.asn1SignatureAlg);
        this.asn1Array.push(this.asn1Issuer);
        this.asn1Array.push(c);
        this.asn1Array.push(this.asn1Subject);
        this.asn1Array.push(this.asn1SubjPKey);
        if (this.extensionsArray.length > 0) {
            var d = new KJUR.asn1.DERSequence({
                array: this.extensionsArray
            });
            var b = new KJUR.asn1.DERTaggedObject({
                explicit: true,
                tag: "a3",
                obj: d
            });
            this.asn1Array.push(b);
        }
        var e = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.hTLV = e.getEncodedHex();
        this.isModified = false;
        return this.hTLV;
    };
    this._initialize();
};

YAHOO.lang.extend(KJUR.asn1.x509.TBSCertificate, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.Extension = function(b) {
    KJUR.asn1.x509.Extension.superclass.constructor.call(this);
    var a = null;
    this.getEncodedHex = function() {
        var f = new KJUR.asn1.DERObjectIdentifier({
            oid: this.oid
        });
        var e = new KJUR.asn1.DEROctetString({
            hex: this.getExtnValueHex()
        });
        var d = new Array();
        d.push(f);
        if (this.critical) {
            d.push(new KJUR.asn1.DERBoolean());
        }
        d.push(e);
        var c = new KJUR.asn1.DERSequence({
            array: d
        });
        return c.getEncodedHex();
    };
    this.critical = false;
    if (typeof b != "undefined") {
        if (typeof b.critical != "undefined") {
            this.critical = b.critical;
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

KJUR.asn1.x509.BasicConstraints = function(c) {
    KJUR.asn1.x509.BasicConstraints.superclass.constructor.call(this, c);
    var a = false;
    var b = -1;
    this.getExtnValueHex = function() {
        var e = new Array();
        if (this.cA) {
            e.push(new KJUR.asn1.DERBoolean());
        }
        if (this.pathLen > -1) {
            e.push(new KJUR.asn1.DERInteger({
                "int": this.pathLen
            }));
        }
        var d = new KJUR.asn1.DERSequence({
            array: e
        });
        this.asn1ExtnValue = d;
        return this.asn1ExtnValue.getEncodedHex();
    };
    this.oid = "2.5.29.19";
    this.cA = false;
    this.pathLen = -1;
    if (typeof c != "undefined") {
        if (typeof c.cA != "undefined") {
            this.cA = c.cA;
        }
        if (typeof c.pathLen != "undefined") {
            this.pathLen = c.pathLen;
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.BasicConstraints, KJUR.asn1.x509.Extension);

KJUR.asn1.x509.CRLDistributionPoints = function(a) {
    KJUR.asn1.x509.CRLDistributionPoints.superclass.constructor.call(this, a);
    this.getExtnValueHex = function() {
        return this.asn1ExtnValue.getEncodedHex();
    };
    this.setByDPArray = function(b) {
        this.asn1ExtnValue = new KJUR.asn1.DERSequence({
            array: b
        });
    };
    this.setByOneURI = function(e) {
        var b = new KJUR.asn1.x509.GeneralNames([ {
            uri: e
        } ]);
        var d = new KJUR.asn1.x509.DistributionPointName(b);
        var c = new KJUR.asn1.x509.DistributionPoint({
            dpobj: d
        });
        this.setByDPArray([ c ]);
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
    this.setPurposeArray = function(b) {
        this.asn1ExtnValue = new KJUR.asn1.DERSequence();
        for (var c = 0; c < b.length; c++) {
            var d = new KJUR.asn1.DERObjectIdentifier(b[c]);
            this.asn1ExtnValue.appendASN1Object(d);
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

KJUR.asn1.x509.CRL = function(f) {
    KJUR.asn1.x509.CRL.superclass.constructor.call(this);
    var a = null;
    var c = null;
    var e = null;
    var b = null;
    var d = null;
    this.setRsaPrvKeyByPEMandPass = function(h, j) {
        var g = PKCS5PKEY.getDecryptedKeyHex(h, j);
        var i = new RSAKey();
        i.readPrivateKeyFromASN1HexString(g);
        this.rsaPrvKey = i;
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
        var g = new KJUR.asn1.DERSequence({
            array: [ this.asn1TBSCertList, this.asn1SignatureAlg, this.asn1Sig ]
        });
        this.hTLV = g.getEncodedHex();
        this.isModified = false;
    };
    this.getEncodedHex = function() {
        if (this.isModified == false && this.hTLV != null) {
            return this.hTLV;
        }
        throw "not signed yet";
    };
    this.getPEMString = function() {
        var i = this.getEncodedHex();
        var g = CryptoJS.enc.Hex.parse(i);
        var h = CryptoJS.enc.Base64.stringify(g);
        var j = h.replace(/(.{64})/g, "$1\r\n");
        return "-----BEGIN X509 CRL-----\r\n" + j + "\r\n-----END X509 CRL-----\r\n";
    };
    if (typeof f != "undefined") {
        if (typeof f.tbsobj != "undefined") {
            this.asn1TBSCertList = f.tbsobj;
        }
        if (typeof f.rsaprvkey != "undefined") {
            this.rsaPrvKey = f.rsaprvkey;
        }
        if (typeof f.rsaprvpem != "undefined" && typeof f.rsaprvpas != "undefined") {
            this.setRsaPrvKeyByPEMandPass(f.rsaprvpem, f.rsaprvpas);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.CRL, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.TBSCertList = function(b) {
    KJUR.asn1.x509.TBSCertList.superclass.constructor.call(this);
    var a = null;
    this.setSignatureAlgByParam = function(c) {
        this.asn1SignatureAlg = new KJUR.asn1.x509.AlgorithmIdentifier(c);
    };
    this.setIssuerByParam = function(c) {
        this.asn1Issuer = new KJUR.asn1.x509.X500Name(c);
    };
    this.setThisUpdateByParam = function(c) {
        this.asn1ThisUpdate = new KJUR.asn1.x509.Time(c);
    };
    this.setNextUpdateByParam = function(c) {
        this.asn1NextUpdate = new KJUR.asn1.x509.Time(c);
    };
    this.addRevokedCert = function(c, d) {
        var f = {};
        if (c != undefined && c != null) {
            f.sn = c;
        }
        if (d != undefined && d != null) {
            f.time = d;
        }
        var e = new KJUR.asn1.x509.CRLEntry(f);
        this.aRevokedCert.push(e);
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
            var c = new KJUR.asn1.DERSequence({
                array: this.aRevokedCert
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

KJUR.asn1.x509.CRLEntry = function(c) {
    KJUR.asn1.x509.CRLEntry.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.setCertSerial = function(d) {
        this.sn = new KJUR.asn1.DERInteger(d);
    };
    this.setRevocationDate = function(d) {
        this.time = new KJUR.asn1.x509.Time(d);
    };
    this.getEncodedHex = function() {
        var d = new KJUR.asn1.DERSequence({
            array: [ this.sn, this.time ]
        });
        this.TLV = d.getEncodedHex();
        return this.TLV;
    };
    if (typeof c != "undefined") {
        if (typeof c.time != "undefined") {
            this.setRevocationDate(c.time);
        }
        if (typeof c.sn != "undefined") {
            this.setCertSerial(c.sn);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.CRLEntry, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.X500Name = function(a) {
    KJUR.asn1.x509.X500Name.superclass.constructor.call(this);
    this.asn1Array = new Array();
    this.setByString = function(b) {
        var c = b.split("/");
        c.shift();
        for (var d = 0; d < c.length; d++) {
            this.asn1Array.push(new KJUR.asn1.x509.RDN({
                str: c[d]
            }));
        }
    };
    this.getEncodedHex = function() {
        var b = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        this.TLV = b.getEncodedHex();
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
    this.addByString = function(b) {
        this.asn1Array.push(new KJUR.asn1.x509.AttributeTypeAndValue({
            str: b
        }));
    };
    this.getEncodedHex = function() {
        var b = new KJUR.asn1.DERSet({
            array: this.asn1Array
        });
        this.TLV = b.getEncodedHex();
        return this.TLV;
    };
    if (typeof a != "undefined") {
        if (typeof a.str != "undefined") {
            this.addByString(a.str);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.RDN, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.AttributeTypeAndValue = function(b) {
    KJUR.asn1.x509.AttributeTypeAndValue.superclass.constructor.call(this);
    var d = null;
    var c = null;
    var a = "utf8";
    this.setByString = function(e) {
        if (e.match(/^([^=]+)=(.+)$/)) {
            this.setByAttrTypeAndValueStr(RegExp.$1, RegExp.$2);
        } else {
            throw "malformed attrTypeAndValueStr: " + e;
        }
    };
    this.setByAttrTypeAndValueStr = function(g, f) {
        this.typeObj = KJUR.asn1.x509.OID.atype2obj(g);
        var e = a;
        if (g == "C") {
            e = "prn";
        }
        this.valueObj = this.getValueObj(e, f);
    };
    this.getValueObj = function(f, e) {
        if (f == "utf8") {
            return new KJUR.asn1.DERUTF8String({
                str: e
            });
        }
        if (f == "prn") {
            return new KJUR.asn1.DERPrintableString({
                str: e
            });
        }
        if (f == "tel") {
            return new KJUR.asn1.DERTeletexString({
                str: e
            });
        }
        if (f == "ia5") {
            return new KJUR.asn1.DERIA5String({
                str: e
            });
        }
        throw "unsupported directory string type: type=" + f + " value=" + e;
    };
    this.getEncodedHex = function() {
        var e = new KJUR.asn1.DERSequence({
            array: [ this.typeObj, this.valueObj ]
        });
        this.TLV = e.getEncodedHex();
        return this.TLV;
    };
    if (typeof b != "undefined") {
        if (typeof b.str != "undefined") {
            this.setByString(b.str);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.AttributeTypeAndValue, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.SubjectPublicKeyInfo = function(d) {
    KJUR.asn1.x509.SubjectPublicKeyInfo.superclass.constructor.call(this);
    var b = null;
    var c = null;
    var a = null;
    this.setRSAKey = function(e) {
        if (!RSAKey.prototype.isPrototypeOf(e)) {
            throw "argument is not RSAKey instance";
        }
        this.rsaKey = e;
        var g = new KJUR.asn1.DERInteger({
            bigint: e.n
        });
        var f = new KJUR.asn1.DERInteger({
            "int": e.e
        });
        var i = new KJUR.asn1.DERSequence({
            array: [ g, f ]
        });
        var h = i.getEncodedHex();
        this.asn1AlgId = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "rsaEncryption"
        });
        this.asn1SubjPKey = new KJUR.asn1.DERBitString({
            hex: "00" + h
        });
    };
    this.setRSAPEM = function(g) {
        if (g.match(/-----BEGIN PUBLIC KEY-----/)) {
            var n = g;
            n = n.replace(/^-----[^-]+-----/, "");
            n = n.replace(/-----[^-]+-----\s*$/, "");
            var m = n.replace(/\s+/g, "");
            var f = CryptoJS.enc.Base64.parse(m);
            var i = CryptoJS.enc.Hex.stringify(f);
            var k = _rsapem_getHexValueArrayOfChildrenFromHex(i);
            var h = k[1];
            var l = h.substr(2);
            var e = _rsapem_getHexValueArrayOfChildrenFromHex(l);
            var j = new RSAKey();
            j.setPublic(e[0], e[1]);
            this.setRSAKey(j);
        } else {
            throw "key not supported";
        }
    };
    this.getEncodedHex = function() {
        if (this.asn1AlgId == null || this.asn1SubjPKey == null) {
            throw "algId and/or subjPubKey not set";
        }
        var e = new KJUR.asn1.DERSequence({
            array: [ this.asn1AlgId, this.asn1SubjPKey ]
        });
        this.hTLV = e.getEncodedHex();
        return this.hTLV;
    };
    if (typeof d != "undefined") {
        if (typeof d.rsakey != "undefined") {
            this.setRSAKey(d.rsakey);
        }
        if (typeof d.rsapem != "undefined") {
            this.setRSAPEM(d.rsapem);
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.SubjectPublicKeyInfo, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.Time = function(c) {
    KJUR.asn1.x509.Time.superclass.constructor.call(this);
    var b = null;
    var a = null;
    this.setTimeParams = function(d) {
        this.timeParams = d;
    };
    this.getEncodedHex = function() {
        if (this.timeParams == null) {
            throw "timeParams shall be specified. ({'str':'130403235959Z'}}";
        }
        var d = null;
        if (this.type == "utc") {
            d = new KJUR.asn1.DERUTCTime(this.timeParams);
        } else {
            d = new KJUR.asn1.DERGeneralizedTime(this.timeParams);
        }
        this.TLV = d.getEncodedHex();
        return this.TLV;
    };
    this.type = "utc";
    if (typeof c != "undefined") {
        if (typeof c.type != "undefined") {
            this.type = c.type;
        }
        this.timeParams = c;
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.Time, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.AlgorithmIdentifier = function(d) {
    KJUR.asn1.x509.AlgorithmIdentifier.superclass.constructor.call(this);
    var a = null;
    var c = null;
    var b = null;
    this.getEncodedHex = function() {
        if (this.nameAlg == null && this.asn1Alg == null) {
            throw "algorithm not specified";
        }
        if (this.nameAlg != null && this.asn1Alg == null) {
            this.asn1Alg = KJUR.asn1.x509.OID.name2obj(this.nameAlg);
        }
        var e = new KJUR.asn1.DERSequence({
            array: [ this.asn1Alg, this.asn1Params ]
        });
        this.hTLV = e.getEncodedHex();
        return this.hTLV;
    };
    if (typeof d != "undefined") {
        if (typeof d.name != "undefined") {
            this.nameAlg = d.name;
        }
        if (typeof d.asn1params != "undefined") {
            this.asn1Params = d.asn1params;
        }
    }
    if (this.asn1Params == null) {
        this.asn1Params = new KJUR.asn1.DERNull();
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.AlgorithmIdentifier, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.GeneralName = function(d) {
    KJUR.asn1.x509.GeneralName.superclass.constructor.call(this);
    var c = null;
    var b = null;
    var a = {
        rfc822: "81",
        dns: "82",
        uri: "86"
    };
    this.setByParam = function(g) {
        var f = null;
        var e = null;
        if (typeof g.rfc822 != "undefined") {
            this.type = "rfc822";
            e = new KJUR.asn1.DERIA5String({
                str: g[this.type]
            });
        }
        if (typeof g.dns != "undefined") {
            this.type = "dns";
            e = new KJUR.asn1.DERIA5String({
                str: g[this.type]
            });
        }
        if (typeof g.uri != "undefined") {
            this.type = "uri";
            e = new KJUR.asn1.DERIA5String({
                str: g[this.type]
            });
        }
        if (this.type == null) {
            throw "unsupported type in params=" + g;
        }
        this.asn1Obj = new KJUR.asn1.DERTaggedObject({
            explicit: false,
            tag: a[this.type],
            obj: e
        });
    };
    this.getEncodedHex = function() {
        return this.asn1Obj.getEncodedHex();
    };
    if (typeof d != "undefined") {
        this.setByParam(d);
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.GeneralName, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.GeneralNames = function(b) {
    KJUR.asn1.x509.GeneralNames.superclass.constructor.call(this);
    var a = null;
    this.setByParamArray = function(e) {
        for (var c = 0; c < e.length; c++) {
            var d = new KJUR.asn1.x509.GeneralName(e[c]);
            this.asn1Array.push(d);
        }
    };
    this.getEncodedHex = function() {
        var c = new KJUR.asn1.DERSequence({
            array: this.asn1Array
        });
        return c.getEncodedHex();
    };
    this.asn1Array = new Array();
    if (typeof b != "undefined") {
        this.setByParamArray(b);
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.GeneralNames, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.DistributionPointName = function(b) {
    KJUR.asn1.x509.DistributionPointName.superclass.constructor.call(this);
    var e = null;
    var c = null;
    var a = null;
    var d = null;
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
    if (typeof b != "undefined") {
        if (KJUR.asn1.x509.GeneralNames.prototype.isPrototypeOf(b)) {
            this.type = "full";
            this.tag = "a0";
            this.asn1V = b;
        } else {
            throw "This class supports GeneralNames only as argument";
        }
    }
};

YAHOO.lang.extend(KJUR.asn1.x509.DistributionPointName, KJUR.asn1.ASN1Object);

KJUR.asn1.x509.DistributionPoint = function(b) {
    KJUR.asn1.x509.DistributionPoint.superclass.constructor.call(this);
    var a = null;
    this.getEncodedHex = function() {
        var c = new KJUR.asn1.DERSequence();
        if (this.asn1DP != null) {
            var d = new KJUR.asn1.DERTaggedObject({
                explicit: true,
                tag: "a0",
                obj: this.asn1DP
            });
            c.appendASN1Object(d);
        }
        this.hTLV = c.getEncodedHex();
        return this.hTLV;
    };
    if (typeof b != "undefined") {
        if (typeof b.dpobj != "undefined") {
            this.asn1DP = b.dpobj;
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
    this.name2obj = function(b) {
        if (typeof this.objCache[b] != "undefined") {
            return this.objCache[b];
        }
        if (typeof this.name2oidList[b] == "undefined") {
            throw "Name of ObjectIdentifier not defined: " + b;
        }
        var c = this.name2oidList[b];
        var d = new KJUR.asn1.DERObjectIdentifier({
            oid: c
        });
        this.objCache[b] = d;
        return d;
    };
    this.atype2obj = function(b) {
        if (typeof this.objCache[b] != "undefined") {
            return this.objCache[b];
        }
        if (typeof this.atype2oidList[b] == "undefined") {
            throw "AttributeType name undefined: " + b;
        }
        var c = this.atype2oidList[b];
        var d = new KJUR.asn1.DERObjectIdentifier({
            oid: c
        });
        this.objCache[b] = d;
        return d;
    };
}();

KJUR.asn1.x509.X509Util = new function() {
    this.getPKCS8PubKeyPEMfromRSAKey = function(i) {
        var h = null;
        var f = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(i.n);
        var j = KJUR.asn1.ASN1Util.integerToByteHex(i.e);
        var a = new KJUR.asn1.DERInteger({
            hex: f
        });
        var g = new KJUR.asn1.DERInteger({
            hex: j
        });
        var l = new KJUR.asn1.DERSequence({
            array: [ a, g ]
        });
        var c = l.getEncodedHex();
        var d = new KJUR.asn1.x509.AlgorithmIdentifier({
            name: "rsaEncryption"
        });
        var b = new KJUR.asn1.DERBitString({
            hex: "00" + c
        });
        var k = new KJUR.asn1.DERSequence({
            array: [ d, b ]
        });
        var e = k.getEncodedHex();
        var h = KJUR.asn1.ASN1Util.getPEMStringFromHex(e, "PUBLIC KEY");
        return h;
    };
}();

function Base64x() {}

function stoBA(d) {
    var b = new Array();
    for (var c = 0; c < d.length; c++) {
        b[c] = d.charCodeAt(c);
    }
    return b;
}

function BAtos(b) {
    var d = "";
    for (var c = 0; c < b.length; c++) {
        d = d + String.fromCharCode(b[c]);
    }
    return d;
}

function BAtohex(b) {
    var e = "";
    for (var d = 0; d < b.length; d++) {
        var c = b[d].toString(16);
        if (c.length == 1) {
            c = "0" + c;
        }
        e = e + c;
    }
    return e;
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

function hextorstr(c) {
    var b = "";
    for (var a = 0; a < c.length - 1; a += 2) {
        b += String.fromCharCode(parseInt(c.substr(a, 2), 16));
    }
    return b;
}

function rstrtohex(c) {
    var a = "";
    for (var b = 0; b < c.length; b++) {
        a += ("0" + c.charCodeAt(b).toString(16)).slice(-2);
    }
    return a;
}

function uricmptohex(a) {
    return a.replace(/%/g, "");
}

function hextouricmp(a) {
    return a.replace(/(..)/g, "%$1");
}

function encodeURIComponentAll(a) {
    var d = encodeURIComponent(a);
    var b = "";
    for (var c = 0; c < d.length; c++) {
        if (d[c] == "%") {
            b = b + d.substr(c, 3);
            c = c + 2;
        } else {
            b = b + "%" + stohex(d[c]);
        }
    }
    return b;
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
    this.getPaddedDigestInfoHex = function(h, a, j) {
        var c = this.getDigestInfoHex(h, a);
        var d = j / 4;
        if (c.length + 22 > d) {
            throw "key is too short for SigAlg: keylen=" + j + "," + a;
        }
        var b = "0001";
        var k = "00" + c;
        var g = "";
        var l = d - b.length - k.length;
        for (var f = 0; f < l; f += 2) {
            g += "ff";
        }
        var e = b + g + k;
        return e;
    };
    this.hashString = function(a, c) {
        var b = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return b.digestString(a);
    };
    this.hashHex = function(b, c) {
        var a = new KJUR.crypto.MessageDigest({
            alg: c
        });
        return a.digestHex(b);
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
            this.updateString = function(str) {
                this.md.update(str);
            };
            this.updateHex = function(hex) {
                var wHex = CryptoJS.enc.Hex.parse(hex);
                this.md.update(wHex);
            };
            this.digest = function() {
                var hash = this.md.finalize();
                return hash.toString(CryptoJS.enc.Hex);
            };
            this.digestString = function(str) {
                this.updateString(str);
                return this.digest();
            };
            this.digestHex = function(hex) {
                this.updateHex(hex);
                return this.digest();
            };
        }
        if (":sha256:".indexOf(alg) != -1 && prov == "sjcl") {
            try {
                this.md = new sjcl.hash.sha256();
            } catch (ex) {
                throw "setAlgAndProvider hash alg set fail alg=" + alg + "/" + ex;
            }
            this.updateString = function(str) {
                this.md.update(str);
            };
            this.updateHex = function(hex) {
                var baHex = sjcl.codec.hex.toBits(hex);
                this.md.update(baHex);
            };
            this.digest = function() {
                var hash = this.md.finalize();
                return sjcl.codec.hex.fromBits(hash);
            };
            this.digestString = function(str) {
                this.updateString(str);
                return this.digest();
            };
            this.digestHex = function(hex) {
                this.updateHex(hex);
                return this.digest();
            };
        }
    };
    this.updateString = function(str) {
        throw "updateString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.updateHex = function(hex) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.digest = function() {
        throw "digest() not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.digestString = function(str) {
        throw "digestString(str) not supported for this alg/prov: " + this.algName + "/" + this.provName;
    };
    this.digestHex = function(hex) {
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
            this.updateString = function(str) {
                this.mac.update(str);
            };
            this.updateHex = function(hex) {
                var wHex = CryptoJS.enc.Hex.parse(hex);
                this.mac.update(wHex);
            };
            this.doFinal = function() {
                var hash = this.mac.finalize();
                return hash.toString(CryptoJS.enc.Hex);
            };
            this.doFinalString = function(str) {
                this.updateString(str);
                return this.doFinal();
            };
            this.doFinalHex = function(hex) {
                this.updateHex(hex);
                return this.doFinal();
            };
        }
    };
    this.updateString = function(str) {
        throw "updateString(str) not supported for this alg/prov: " + this.algProv;
    };
    this.updateHex = function(hex) {
        throw "updateHex(hex) not supported for this alg/prov: " + this.algProv;
    };
    this.doFinal = function() {
        throw "digest() not supported for this alg/prov: " + this.algProv;
    };
    this.doFinalString = function(str) {
        throw "digestString(str) not supported for this alg/prov: " + this.algProv;
    };
    this.doFinalHex = function(hex) {
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

KJUR.crypto.Signature = function(o) {
    var q = null;
    var n = null;
    var r = null;
    var c = null;
    var l = null;
    var d = null;
    var k = null;
    var h = null;
    var p = null;
    var e = null;
    var b = -1;
    var g = null;
    var j = null;
    var a = null;
    var i = null;
    var f = null;
    this._setAlgNames = function() {
        if (this.algName.match(/^(.+)with(.+)$/)) {
            this.mdAlgName = RegExp.$1.toLowerCase();
            this.pubkeyAlgName = RegExp.$2.toLowerCase();
        }
    };
    this._zeroPaddingOfSignature = function(x, w) {
        var v = "";
        var t = w / 4 - x.length;
        for (var u = 0; u < t; u++) {
            v = v + "0";
        }
        return v + x;
    };
    this.setAlgAndProvider = function(u, t) {
        this._setAlgNames();
        if (t != "cryptojs/jsrsa") {
            throw "provider not supported: " + t;
        }
        if (":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName) != -1) {
            try {
                this.md = new KJUR.crypto.MessageDigest({
                    alg: this.mdAlgName
                });
            } catch (s) {
                throw "setAlgAndProvider hash alg set fail alg=" + this.mdAlgName + "/" + s;
            }
            this.init = function(v, w) {
                if (typeof v == "string") {
                    if (v.indexOf("-END ENCRYPTED PRIVATE KEY-", 0) != -1 && w !== undefined) {
                        this.prvKey = PKCS5PKEY.getKeyFromEncryptedPKCS8PEM(v, w);
                        this.state = "SIGN";
                    } else {
                        if (v.indexOf("-END RSA PRIVATE KEY-", 0) != -1 && v.indexOf(",ENCRYPTED", 0) != -1 && w !== undefined) {
                            this.prvKey = PKCS5PKEY.getRSAKeyFromEncryptedPKCS5PEM(v, w);
                            this.state = "SIGN";
                        } else {
                            if (v.indexOf("-END RSA PRIVATE KEY-", 0) != -1 && v.indexOf(",ENCRYPTED", 0) == -1 && w === undefined) {
                                this.prvKey = new RSAKey();
                                this.prvKey.readPrivateKeyFromPEMString(v);
                                this.state = "SIGN";
                            } else {
                                if (v.indexOf("-END PRIVATE KEY-", 0) != -1 && w === undefined) {
                                    this.prvKey = PKCS5PKEY.getKeyFromPlainPrivatePKCS8PEM(v);
                                    this.state = "SIGN";
                                } else {
                                    if (v.indexOf("-END PUBLIC KEY-", 0) != -1 && w === undefined) {
                                        this.pubKey = PKCS5PKEY.getKeyFromPublicPKCS8PEM(v);
                                        this.state = "VERIFY";
                                    } else {
                                        if ((v.indexOf("-END CERTIFICATE-", 0) != -1 || v.indexOf("-END X509 CERTIFICATE-", 0) != -1 || v.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) && w === undefined) {
                                            this.pubKey = X509.getPublicKeyFromCertPEM(v);
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
                    if (v instanceof RSAKey) {
                        if (v.d != null) {
                            this.prvKey = v;
                            this.state = "SIGN";
                        } else {
                            if (v.n != null) {
                                this.pubKey = v;
                                this.state = "VERIFY";
                            } else {
                                throw "RSAKey object is not private and public key";
                            }
                        }
                    } else {
                        if (v instanceof KJUR.crypto.ECDSA) {
                            if (v.prvKeyHex != null) {
                                this.prvKey = v;
                                this.state = "SIGN";
                            } else {
                                if (v.pubKeyHex != null) {
                                    this.pubKey = v;
                                    this.state = "VERIFY";
                                } else {
                                    throw "ECDSA object is not private and public key";
                                }
                            }
                        }
                    }
                }
            };
            this.initSign = function(v) {
                if (typeof v.ecprvhex == "string" && typeof v.eccurvename == "string") {
                    this.ecprvhex = v.ecprvhex;
                    this.eccurvename = v.eccurvename;
                } else {
                    this.prvKey = v;
                }
                this.state = "SIGN";
            };
            this.initVerifyByPublicKey = function(v) {
                if (typeof v.ecpubhex == "string" && typeof v.eccurvename == "string") {
                    this.ecpubhex = v.ecpubhex;
                    this.eccurvename = v.eccurvename;
                } else {
                    if (v instanceof KJUR.crypto.ECDSA) {
                        this.pubKey = v;
                    } else {
                        if (v instanceof RSAKey) {
                            this.pubKey = v;
                        }
                    }
                }
                this.state = "VERIFY";
            };
            this.initVerifyByCertificatePEM = function(v) {
                var w = new X509();
                w.readCertPEM(v);
                this.pubKey = w.subjectPublicKeyRSA;
                this.state = "VERIFY";
            };
            this.updateString = function(v) {
                this.md.updateString(v);
            };
            this.updateHex = function(v) {
                this.md.updateHex(v);
            };
            this.sign = function() {
                this.sHashHex = this.md.digest();
                if (typeof this.ecprvhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var v = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    this.hSign = v.signHex(this.sHashHex, this.ecprvhex);
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
            this.signString = function(v) {
                this.updateString(v);
                this.sign();
            };
            this.signHex = function(v) {
                this.updateHex(v);
                this.sign();
            };
            this.verify = function(v) {
                this.sHashHex = this.md.digest();
                if (typeof this.ecpubhex != "undefined" && typeof this.eccurvename != "undefined") {
                    var w = new KJUR.crypto.ECDSA({
                        curve: this.eccurvename
                    });
                    return w.verifyHex(this.sHashHex, v, this.ecpubhex);
                } else {
                    if (this.pubkeyAlgName == "rsaandmgf1") {
                        return this.pubKey.verifyWithMessageHashPSS(this.sHashHex, v, this.mdAlgName, this.pssSaltLen);
                    } else {
                        if (this.pubkeyAlgName == "rsa") {
                            return this.pubKey.verifyWithMessageHash(this.sHashHex, v);
                        } else {
                            if (this.pubKey instanceof KJUR.crypto.ECDSA) {
                                return this.pubKey.verifyWithMessageHash(this.sHashHex, v);
                            } else {
                                throw "Signature: unsupported public key alg: " + this.pubkeyAlgName;
                            }
                        }
                    }
                }
            };
        }
    };
    this.init = function(s, t) {
        throw "init(key, pass) not supported for this alg:prov=" + this.algProvName;
    };
    this.initVerifyByPublicKey = function(s) {
        throw "initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov=" + this.algProvName;
    };
    this.initVerifyByCertificatePEM = function(s) {
        throw "initVerifyByCertificatePEM(certPEM) not supported for this alg:prov=" + this.algProvName;
    };
    this.initSign = function(s) {
        throw "initSign(prvKey) not supported for this alg:prov=" + this.algProvName;
    };
    this.updateString = function(s) {
        throw "updateString(str) not supported for this alg:prov=" + this.algProvName;
    };
    this.updateHex = function(s) {
        throw "updateHex(hex) not supported for this alg:prov=" + this.algProvName;
    };
    this.sign = function() {
        throw "sign() not supported for this alg:prov=" + this.algProvName;
    };
    this.signString = function(s) {
        throw "digestString(str) not supported for this alg:prov=" + this.algProvName;
    };
    this.signHex = function(s) {
        throw "digestHex(hex) not supported for this alg:prov=" + this.algProvName;
    };
    this.verify = function(s) {
        throw "verify(hSigVal) not supported for this alg:prov=" + this.algProvName;
    };
    this.initParams = o;
    if (o !== undefined) {
        if (o.alg !== undefined) {
            this.algName = o.alg;
            if (o.prov === undefined) {
                this.provName = KJUR.crypto.Util.DEFAULTPROVIDER[this.algName];
            } else {
                this.provName = o.prov;
            }
            this.algProvName = this.algName + ":" + this.provName;
            this.setAlgAndProvider(this.algName, this.provName);
            this._setAlgNames();
        }
        if (o.psssaltlen !== undefined) {
            this.pssSaltLen = o.psssaltlen;
        }
        if (o.prvkeypem !== undefined) {
            if (o.prvkeypas !== undefined) {
                throw "both prvkeypem and prvkeypas parameters not supported";
            } else {
                try {
                    var q = new RSAKey();
                    q.readPrivateKeyFromPEMString(o.prvkeypem);
                    this.initSign(q);
                } catch (m) {
                    throw "fatal error to load pem private key: " + m;
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

KJUR.crypto.ECDSA = function(h) {
    var e = "secp256r1";
    var g = null;
    var b = null;
    var f = null;
    var a = new SecureRandom();
    var d = null;
    this.type = "EC";
    function c(s, o, r, n) {
        var j = Math.max(o.bitLength(), n.bitLength());
        var t = s.add2D(r);
        var q = s.curve.getInfinity();
        for (var p = j - 1; p >= 0; --p) {
            q = q.twice2D();
            q.z = BigInteger.ONE;
            if (o.testBit(p)) {
                if (n.testBit(p)) {
                    q = q.add2D(t);
                } else {
                    q = q.add2D(s);
                }
            } else {
                if (n.testBit(p)) {
                    q = q.add2D(r);
                }
            }
        }
        return q;
    }
    this.getBigRandom = function(i) {
        return new BigInteger(i.bitLength(), a).mod(i.subtract(BigInteger.ONE)).add(BigInteger.ONE);
    };
    this.setNamedCurve = function(i) {
        this.ecparams = KJUR.crypto.ECParameterDB.getByName(i);
        this.prvKeyHex = null;
        this.pubKeyHex = null;
        this.curveName = i;
    };
    this.setPrivateKeyHex = function(i) {
        this.prvKeyHex = i;
    };
    this.setPublicKeyHex = function(i) {
        this.pubKeyHex = i;
    };
    this.generateKeyPairHex = function() {
        var k = this.ecparams.n;
        var n = this.getBigRandom(k);
        var l = this.ecparams.G.multiply(n);
        var q = l.getX().toBigInteger();
        var o = l.getY().toBigInteger();
        var i = this.ecparams.keylen / 4;
        var m = ("0000000000" + n.toString(16)).slice(-i);
        var r = ("0000000000" + q.toString(16)).slice(-i);
        var p = ("0000000000" + o.toString(16)).slice(-i);
        var j = "04" + r + p;
        this.prvKeyHex = m;
        this.pubKeyHex = j;
        return {
            ecprvhex: m,
            ecpubhex: j
        };
    };
    this.signWithMessageHash = function(i) {
        return this.signHex(i, this.prvKeyHex);
    };
    this.signHex = function(o, j) {
        var t = new BigInteger(j, 16);
        var l = this.ecparams.n;
        var q = new BigInteger(o, 16);
        do {
            var m = this.getBigRandom(l);
            var u = this.ecparams.G;
            var p = u.multiply(m);
            var i = p.getX().toBigInteger().mod(l);
        } while (i.compareTo(BigInteger.ZERO) <= 0);
        var v = m.modInverse(l).multiply(q.add(t.multiply(i))).mod(l);
        return KJUR.crypto.ECDSA.biRSSigToASN1Sig(i, v);
    };
    this.sign = function(m, u) {
        var q = u;
        var j = this.ecparams.n;
        var p = BigInteger.fromByteArrayUnsigned(m);
        do {
            var l = this.getBigRandom(j);
            var t = this.ecparams.G;
            var o = t.multiply(l);
            var i = o.getX().toBigInteger().mod(j);
        } while (i.compareTo(BigInteger.ZERO) <= 0);
        var v = l.modInverse(j).multiply(p.add(q.multiply(i))).mod(j);
        return this.serializeSig(i, v);
    };
    this.verifyWithMessageHash = function(j, i) {
        return this.verifyHex(j, i, this.pubKeyHex);
    };
    this.verifyHex = function(m, i, p) {
        var l, j;
        var o = KJUR.crypto.ECDSA.parseSigHex(i);
        l = o.r;
        j = o.s;
        var k;
        k = ECPointFp.decodeFromHex(this.ecparams.curve, p);
        var n = new BigInteger(m, 16);
        return this.verifyRaw(n, l, j, k);
    };
    this.verify = function(o, p, j) {
        var l, i;
        if (Bitcoin.Util.isArray(p)) {
            var n = this.parseSig(p);
            l = n.r;
            i = n.s;
        } else {
            if ("object" === typeof p && p.r && p.s) {
                l = p.r;
                i = p.s;
            } else {
                throw "Invalid value for signature";
            }
        }
        var k;
        if (j instanceof ECPointFp) {
            k = j;
        } else {
            if (Bitcoin.Util.isArray(j)) {
                k = ECPointFp.decodeFrom(this.ecparams.curve, j);
            } else {
                throw "Invalid format for pubkey value, must be byte array or ECPointFp";
            }
        }
        var m = BigInteger.fromByteArrayUnsigned(o);
        return this.verifyRaw(m, l, i, k);
    };
    this.verifyRaw = function(o, i, w, m) {
        var l = this.ecparams.n;
        var u = this.ecparams.G;
        if (i.compareTo(BigInteger.ONE) < 0 || i.compareTo(l) >= 0) {
            return false;
        }
        if (w.compareTo(BigInteger.ONE) < 0 || w.compareTo(l) >= 0) {
            return false;
        }
        var p = w.modInverse(l);
        var k = o.multiply(p).mod(l);
        var j = i.multiply(p).mod(l);
        var q = u.multiply(k).add(m.multiply(j));
        var t = q.getX().toBigInteger().mod(l);
        return t.equals(i);
    };
    this.serializeSig = function(k, j) {
        var l = k.toByteArraySigned();
        var i = j.toByteArraySigned();
        var m = [];
        m.push(2);
        m.push(l.length);
        m = m.concat(l);
        m.push(2);
        m.push(i.length);
        m = m.concat(i);
        m.unshift(m.length);
        m.unshift(48);
        return m;
    };
    this.parseSig = function(n) {
        var m;
        if (n[0] != 48) {
            throw new Error("Signature not a valid DERSequence");
        }
        m = 2;
        if (n[m] != 2) {
            throw new Error("First element in signature must be a DERInteger");
        }
        var l = n.slice(m + 2, m + 2 + n[m + 1]);
        m += 2 + n[m + 1];
        if (n[m] != 2) {
            throw new Error("Second element in signature must be a DERInteger");
        }
        var i = n.slice(m + 2, m + 2 + n[m + 1]);
        m += 2 + n[m + 1];
        var k = BigInteger.fromByteArrayUnsigned(l);
        var j = BigInteger.fromByteArrayUnsigned(i);
        return {
            r: k,
            s: j
        };
    };
    this.parseSigCompact = function(m) {
        if (m.length !== 65) {
            throw "Signature has the wrong length";
        }
        var j = m[0] - 27;
        if (j < 0 || j > 7) {
            throw "Invalid signature type";
        }
        var o = this.ecparams.n;
        var l = BigInteger.fromByteArrayUnsigned(m.slice(1, 33)).mod(o);
        var k = BigInteger.fromByteArrayUnsigned(m.slice(33, 65)).mod(o);
        return {
            r: l,
            s: k,
            i: j
        };
    };
    if (h !== undefined) {
        if (h.curve !== undefined) {
            this.curveName = h.curve;
        }
    }
    if (this.curveName === undefined) {
        this.curveName = e;
    }
    this.setNamedCurve(this.curveName);
    if (h !== undefined) {
        if (h.prv !== undefined) {
            this.prvKeyHex = h.prv;
        }
        if (h.pub !== undefined) {
            this.pubKeyHex = h.pub;
        }
    }
};

KJUR.crypto.ECDSA.parseSigHex = function(a) {
    var b = KJUR.crypto.ECDSA.parseSigHexInHexRS(a);
    var d = new BigInteger(b.r, 16);
    var c = new BigInteger(b.s, 16);
    return {
        r: d,
        s: c
    };
};

KJUR.crypto.ECDSA.parseSigHexInHexRS = function(c) {
    if (c.substr(0, 2) != "30") {
        throw "signature is not a ASN.1 sequence";
    }
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(c, 0);
    if (b.length != 2) {
        throw "number of signature ASN.1 sequence elements seem wrong";
    }
    var g = b[0];
    var f = b[1];
    if (c.substr(g, 2) != "02") {
        throw "1st item of sequene of signature is not ASN.1 integer";
    }
    if (c.substr(f, 2) != "02") {
        throw "2nd item of sequene of signature is not ASN.1 integer";
    }
    var e = ASN1HEX.getHexOfV_AtObj(c, g);
    var d = ASN1HEX.getHexOfV_AtObj(c, f);
    return {
        r: e,
        s: d
    };
};

KJUR.crypto.ECDSA.asn1SigToConcatSig = function(c) {
    var d = KJUR.crypto.ECDSA.parseSigHexInHexRS(c);
    var b = d.r;
    var a = d.s;
    if (b.substr(0, 2) == "00" && b.length / 2 * 8 % (16 * 8) == 8) {
        b = b.substr(2);
    }
    if (a.substr(0, 2) == "00" && a.length / 2 * 8 % (16 * 8) == 8) {
        a = a.substr(2);
    }
    if (b.length / 2 * 8 % (16 * 8) != 0) {
        throw "unknown ECDSA sig r length error";
    }
    if (a.length / 2 * 8 % (16 * 8) != 0) {
        throw "unknown ECDSA sig s length error";
    }
    return b + a;
};

KJUR.crypto.ECDSA.concatSigToASN1Sig = function(a) {
    if (a.length / 2 * 8 % (16 * 8) != 0) {
        throw "unknown ECDSA concatinated r-s sig  length error";
    }
    var c = a.substr(0, a.length / 2);
    var b = a.substr(a.length / 2);
    return KJUR.crypto.ECDSA.hexRSSigToASN1Sig(c, b);
};

KJUR.crypto.ECDSA.hexRSSigToASN1Sig = function(b, a) {
    var d = new BigInteger(b, 16);
    var c = new BigInteger(a, 16);
    return KJUR.crypto.ECDSA.biRSSigToASN1Sig(d, c);
};

KJUR.crypto.ECDSA.biRSSigToASN1Sig = function(e, c) {
    var b = new KJUR.asn1.DERInteger({
        bigint: e
    });
    var a = new KJUR.asn1.DERInteger({
        bigint: c
    });
    var d = new KJUR.asn1.DERSequence({
        array: [ b, a ]
    });
    return d.getEncodedHex();
};

if (typeof KJUR == "undefined" || !KJUR) {
    KJUR = {};
}

if (typeof KJUR.crypto == "undefined" || !KJUR.crypto) {
    KJUR.crypto = {};
}

KJUR.crypto.ECParameterDB = new function() {
    var b = {};
    var c = {};
    function a(d) {
        return new BigInteger(d, 16);
    }
    this.getByName = function(e) {
        var d = e;
        if (typeof c[d] != "undefined") {
            d = c[e];
        }
        if (typeof b[d] != "undefined") {
            return b[d];
        }
        throw "unregistered EC curve name: " + d;
    };
    this.regist = function(A, l, o, g, m, e, j, f, k, u, d, x) {
        b[A] = {};
        var s = a(o);
        var z = a(g);
        var y = a(m);
        var t = a(e);
        var w = a(j);
        var r = new ECCurveFp(s, z, y);
        var q = r.decodePointHex("04" + f + k);
        b[A]["name"] = A;
        b[A]["keylen"] = l;
        b[A]["curve"] = r;
        b[A]["G"] = q;
        b[A]["n"] = t;
        b[A]["h"] = w;
        b[A]["oid"] = d;
        b[A]["info"] = x;
        for (var v = 0; v < u.length; v++) {
            c[u[v]] = A;
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
    var c = function(n, p, o) {
        return i(CryptoJS.AES, n, p, o);
    };
    var d = function(n, p, o) {
        return i(CryptoJS.TripleDES, n, p, o);
    };
    var i = function(q, v, s, o) {
        var p = CryptoJS.enc.Hex.parse(v);
        var u = CryptoJS.enc.Hex.parse(s);
        var n = CryptoJS.enc.Hex.parse(o);
        var r = {};
        r.key = u;
        r.iv = n;
        r.ciphertext = p;
        var t = q.decrypt(r, u, {
            iv: n
        });
        return CryptoJS.enc.Hex.stringify(t);
    };
    var j = function(n, p, o) {
        return e(CryptoJS.AES, n, p, o);
    };
    var m = function(n, p, o) {
        return e(CryptoJS.TripleDES, n, p, o);
    };
    var e = function(s, x, v, p) {
        var r = CryptoJS.enc.Hex.parse(x);
        var w = CryptoJS.enc.Hex.parse(v);
        var o = CryptoJS.enc.Hex.parse(p);
        var n = {};
        var u = s.encrypt(r, w, {
            iv: o
        });
        var q = CryptoJS.enc.Hex.parse(u.toString());
        var t = CryptoJS.enc.Base64.stringify(q);
        return t;
    };
    var g = {
        "AES-256-CBC": {
            proc: c,
            eproc: j,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: c,
            eproc: j,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: c,
            eproc: j,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: d,
            eproc: m,
            keylen: 24,
            ivlen: 8
        }
    };
    var b = function(n) {
        return g[n]["proc"];
    };
    var k = function(n) {
        var p = CryptoJS.lib.WordArray.random(n);
        var o = CryptoJS.enc.Hex.stringify(p);
        return o;
    };
    var l = function(q) {
        var r = {};
        if (q.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"))) {
            r.cipher = RegExp.$1;
            r.ivsalt = RegExp.$2;
        }
        if (q.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"))) {
            r.type = RegExp.$1;
        }
        var p = -1;
        var t = 0;
        if (q.indexOf("\r\n\r\n") != -1) {
            p = q.indexOf("\r\n\r\n");
            t = 2;
        }
        if (q.indexOf("\n\n") != -1) {
            p = q.indexOf("\n\n");
            t = 1;
        }
        var o = q.indexOf("-----END");
        if (p != -1 && o != -1) {
            var n = q.substring(p + t * 2, o - t);
            n = n.replace(/\s+/g, "");
            r.data = n;
        }
        return r;
    };
    var h = function(o, w, n) {
        var t = n.substring(0, 16);
        var r = CryptoJS.enc.Hex.parse(t);
        var p = CryptoJS.enc.Utf8.parse(w);
        var s = g[o]["keylen"] + g[o]["ivlen"];
        var v = "";
        var u = null;
        for (;;) {
            var q = CryptoJS.algo.MD5.create();
            if (u != null) {
                q.update(u);
            }
            q.update(p);
            q.update(r);
            u = q.finalize();
            v = v + CryptoJS.enc.Hex.stringify(u);
            if (v.length >= s * 2) {
                break;
            }
        }
        var x = {};
        x.keyhex = v.substr(0, g[o]["keylen"] * 2);
        x.ivhex = v.substr(g[o]["keylen"] * 2, g[o]["ivlen"] * 2);
        return x;
    };
    var a = function(n, t, p, u) {
        var q = CryptoJS.enc.Base64.parse(n);
        var o = CryptoJS.enc.Hex.stringify(q);
        var s = g[t]["proc"];
        var r = s(o, p, u);
        return r;
    };
    var f = function(n, q, o, s) {
        var p = g[q]["eproc"];
        var r = p(n, o, s);
        return r;
    };
    return {
        version: "1.0.5",
        getHexFromPEM: function(o, r) {
            var p = o;
            if (p.indexOf("BEGIN " + r) == -1) {
                throw "can't find PEM header: " + r;
            }
            p = p.replace("-----BEGIN " + r + "-----", "");
            p = p.replace("-----END " + r + "-----", "");
            var q = p.replace(/\s+/g, "");
            var n = b64tohex(q);
            return n;
        },
        getDecryptedKeyHexByKeyIV: function(o, r, q, p) {
            var n = b(r);
            return n(o, q, p);
        },
        parsePKCS5PEM: function(n) {
            return l(n);
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(o, n, p) {
            return h(o, n, p);
        },
        decryptKeyB64: function(n, p, o, q) {
            return a(n, p, o, q);
        },
        getDecryptedKeyHex: function(w, v) {
            var o = l(w);
            var r = o.type;
            var p = o.cipher;
            var n = o.ivsalt;
            var q = o.data;
            var u = h(p, v, n);
            var t = u.keyhex;
            var s = a(q, p, t, n);
            return s;
        },
        getRSAKeyFromEncryptedPKCS5PEM: function(p, o) {
            var q = this.getDecryptedKeyHex(p, o);
            var n = new RSAKey();
            n.readPrivateKeyFromASN1HexString(q);
            return n;
        },
        getEryptedPKCS5PEMFromPrvKeyHex: function(q, x, r, p) {
            var n = "";
            if (typeof r == "undefined" || r == null) {
                r = "AES-256-CBC";
            }
            if (typeof g[r] == "undefined") {
                throw "PKCS5PKEY unsupported algorithm: " + r;
            }
            if (typeof p == "undefined" || p == null) {
                var t = g[r]["ivlen"];
                var s = k(t);
                p = s.toUpperCase();
            }
            var w = h(r, x, p);
            var v = w.keyhex;
            var u = f(q, r, v, p);
            var o = u.replace(/(.{64})/g, "$1\r\n");
            var n = "-----BEGIN RSA PRIVATE KEY-----\r\n";
            n += "Proc-Type: 4,ENCRYPTED\r\n";
            n += "DEK-Info: " + r + "," + p + "\r\n";
            n += "\r\n";
            n += o;
            n += "\r\n-----END RSA PRIVATE KEY-----\r\n";
            return n;
        },
        getEryptedPKCS5PEMFromRSAKey: function(C, D, o, s) {
            var A = new KJUR.asn1.DERInteger({
                "int": 0
            });
            var v = new KJUR.asn1.DERInteger({
                bigint: C.n
            });
            var z = new KJUR.asn1.DERInteger({
                "int": C.e
            });
            var B = new KJUR.asn1.DERInteger({
                bigint: C.d
            });
            var t = new KJUR.asn1.DERInteger({
                bigint: C.p
            });
            var r = new KJUR.asn1.DERInteger({
                bigint: C.q
            });
            var y = new KJUR.asn1.DERInteger({
                bigint: C.dmp1
            });
            var u = new KJUR.asn1.DERInteger({
                bigint: C.dmq1
            });
            var x = new KJUR.asn1.DERInteger({
                bigint: C.coeff
            });
            var E = new KJUR.asn1.DERSequence({
                array: [ A, v, z, B, t, r, y, u, x ]
            });
            var w = E.getEncodedHex();
            return this.getEryptedPKCS5PEMFromPrvKeyHex(w, D, o, s);
        },
        newEncryptedPKCS5PEM: function(n, o, r, s) {
            if (typeof o == "undefined" || o == null) {
                o = 1024;
            }
            if (typeof r == "undefined" || r == null) {
                r = "10001";
            }
            var p = new RSAKey();
            p.generate(o, r);
            var q = null;
            if (typeof s == "undefined" || s == null) {
                q = this.getEncryptedPKCS5PEMFromRSAKey(pkey, n);
            } else {
                q = this.getEncryptedPKCS5PEMFromRSAKey(pkey, n, s);
            }
            return q;
        },
        getRSAKeyFromPlainPKCS8PEM: function(p) {
            if (p.match(/ENCRYPTED/)) {
                throw "pem shall be not ENCRYPTED";
            }
            var o = this.getHexFromPEM(p, "PRIVATE KEY");
            var n = this.getRSAKeyFromPlainPKCS8Hex(o);
            return n;
        },
        getRSAKeyFromPlainPKCS8Hex: function(q) {
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
            if (p.length != 3) {
                throw "outer DERSequence shall have 3 elements: " + p.length;
            }
            var o = ASN1HEX.getHexOfTLV_AtObj(q, p[1]);
            if (o != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmIdentifier is not rsaEnc: " + o;
            }
            var o = ASN1HEX.getHexOfTLV_AtObj(q, p[1]);
            var r = ASN1HEX.getHexOfTLV_AtObj(q, p[2]);
            var s = ASN1HEX.getHexOfV_AtObj(r, 0);
            var n = new RSAKey();
            n.readPrivateKeyFromASN1HexString(s);
            return n;
        },
        parseHexOfEncryptedPKCS8: function(u) {
            var q = {};
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(u, 0);
            if (p.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + p.length;
            }
            q.ciphertext = ASN1HEX.getHexOfV_AtObj(u, p[1]);
            var w = ASN1HEX.getPosArrayOfChildren_AtObj(u, p[0]);
            if (w.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + w.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(u, w[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(u, w[1]);
            if (w.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + n.length;
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(u, n[1]);
            if (o.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + o.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(u, o[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES";
            }
            q.encryptionSchemeAlg = "TripleDES";
            q.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(u, o[1]);
            var r = ASN1HEX.getPosArrayOfChildren_AtObj(u, n[0]);
            if (r.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + r.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(u, r[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2";
            }
            var v = ASN1HEX.getPosArrayOfChildren_AtObj(u, r[1]);
            if (v.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + v.length;
            }
            q.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(u, v[0]);
            var s = ASN1HEX.getHexOfV_AtObj(u, v[1]);
            try {
                q.pbkdf2Iter = parseInt(s, 16);
            } catch (t) {
                throw "malformed format pbkdf2Iter: " + s;
            }
            return q;
        },
        getPBKDF2KeyHexFromParam: function(s, n) {
            var r = CryptoJS.enc.Hex.parse(s.pbkdf2Salt);
            var o = s.pbkdf2Iter;
            var q = CryptoJS.PBKDF2(n, r, {
                keySize: 192 / 32,
                iterations: o
            });
            var p = CryptoJS.enc.Hex.stringify(q);
            return p;
        },
        getPlainPKCS8HexFromEncryptedPKCS8PEM: function(v, w) {
            var p = this.getHexFromPEM(v, "ENCRYPTED PRIVATE KEY");
            var n = this.parseHexOfEncryptedPKCS8(p);
            var s = PKCS5PKEY.getPBKDF2KeyHexFromParam(n, w);
            var t = {};
            t.ciphertext = CryptoJS.enc.Hex.parse(n.ciphertext);
            var r = CryptoJS.enc.Hex.parse(s);
            var q = CryptoJS.enc.Hex.parse(n.encryptionSchemeIV);
            var u = CryptoJS.TripleDES.decrypt(t, r, {
                iv: q
            });
            var o = CryptoJS.enc.Hex.stringify(u);
            return o;
        },
        getRSAKeyFromEncryptedPKCS8PEM: function(q, p) {
            var o = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(q, p);
            var n = this.getRSAKeyFromPlainPKCS8Hex(o);
            return n;
        },
        getKeyFromEncryptedPKCS8PEM: function(q, o) {
            var n = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(q, o);
            var p = this.getKeyFromPlainPrivatePKCS8Hex(n);
            return p;
        },
        parsePlainPrivatePKCS8Hex: function(q) {
            var o = {};
            o.algparam = null;
            if (q.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)";
            }
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
            if (p.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)";
            }
            if (q.substr(p[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(q, p[1]);
            if (n.length != 2) {
                throw "malformed PKCS8 private key(code:004)";
            }
            if (q.substr(n[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)";
            }
            o.algoid = ASN1HEX.getHexOfV_AtObj(q, n[0]);
            if (q.substr(n[1], 2) == "06") {
                o.algparam = ASN1HEX.getHexOfV_AtObj(q, n[1]);
            }
            if (q.substr(p[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)";
            }
            o.keyidx = ASN1HEX.getStartPosOfV_AtObj(q, p[2]);
            return o;
        },
        getKeyFromPlainPrivatePKCS8PEM: function(o) {
            var n = this.getHexFromPEM(o, "PRIVATE KEY");
            var p = this.getKeyFromPlainPrivatePKCS8Hex(n);
            return p;
        },
        getKeyFromPlainPrivatePKCS8Hex: function(n) {
            var p = this.parsePlainPrivatePKCS8Hex(n);
            if (p.algoid == "2a864886f70d010101") {
                this.parsePrivateRawRSAKeyHexAtObj(n, p);
                var o = p.key;
                var q = new RSAKey();
                q.setPrivateEx(o.n, o.e, o.d, o.p, o.q, o.dp, o.dq, o.co);
                return q;
            } else {
                if (p.algoid == "2a8648ce3d0201") {
                    this.parsePrivateRawECKeyHexAtObj(n, p);
                    if (KJUR.crypto.OID.oidhex2name[p.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + p.algparam;
                    }
                    var r = KJUR.crypto.OID.oidhex2name[p.algparam];
                    var q = new KJUR.crypto.ECDSA({
                        curve: r,
                        prv: p.key
                    });
                    return q;
                } else {
                    throw "unsupported private key algorithm";
                }
            }
        },
        getRSAKeyFromPublicPKCS8PEM: function(o) {
            var p = this.getHexFromPEM(o, "PUBLIC KEY");
            var n = this.getRSAKeyFromPublicPKCS8Hex(p);
            return n;
        },
        getKeyFromPublicPKCS8PEM: function(o) {
            var p = this.getHexFromPEM(o, "PUBLIC KEY");
            var n = this.getKeyFromPublicPKCS8Hex(p);
            return n;
        },
        getKeyFromPublicPKCS8Hex: function(o) {
            var n = this.parsePublicPKCS8Hex(o);
            if (n.algoid == "2a864886f70d010101") {
                var r = this.parsePublicRawRSAKeyHex(n.key);
                var p = new RSAKey();
                p.setPublic(r.n, r.e);
                return p;
            } else {
                if (n.algoid == "2a8648ce3d0201") {
                    if (KJUR.crypto.OID.oidhex2name[n.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + n.algparam;
                    }
                    var q = KJUR.crypto.OID.oidhex2name[n.algparam];
                    var p = new KJUR.crypto.ECDSA({
                        curve: q,
                        pub: n.key
                    });
                    return p;
                } else {
                    throw "unsupported public key algorithm";
                }
            }
        },
        parsePublicRawRSAKeyHex: function(p) {
            var n = {};
            if (p.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)";
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(p, 0);
            if (o.length != 2) {
                throw "malformed RSA key(code:002)";
            }
            if (p.substr(o[0], 2) != "02") {
                throw "malformed RSA key(code:003)";
            }
            n.n = ASN1HEX.getHexOfV_AtObj(p, o[0]);
            if (p.substr(o[1], 2) != "02") {
                throw "malformed RSA key(code:004)";
            }
            n.e = ASN1HEX.getHexOfV_AtObj(p, o[1]);
            return n;
        },
        parsePrivateRawRSAKeyHexAtObj: function(o, q) {
            var p = q.keyidx;
            if (o.substr(p, 2) != "30") {
                throw "malformed RSA private key(code:001)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(o, p);
            if (n.length != 9) {
                throw "malformed RSA private key(code:002)";
            }
            q.key = {};
            q.key.n = ASN1HEX.getHexOfV_AtObj(o, n[1]);
            q.key.e = ASN1HEX.getHexOfV_AtObj(o, n[2]);
            q.key.d = ASN1HEX.getHexOfV_AtObj(o, n[3]);
            q.key.p = ASN1HEX.getHexOfV_AtObj(o, n[4]);
            q.key.q = ASN1HEX.getHexOfV_AtObj(o, n[5]);
            q.key.dp = ASN1HEX.getHexOfV_AtObj(o, n[6]);
            q.key.dq = ASN1HEX.getHexOfV_AtObj(o, n[7]);
            q.key.co = ASN1HEX.getHexOfV_AtObj(o, n[8]);
        },
        parsePrivateRawECKeyHexAtObj: function(o, q) {
            var p = q.keyidx;
            if (o.substr(p, 2) != "30") {
                throw "malformed ECC private key(code:001)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(o, p);
            if (n.length != 3) {
                throw "malformed ECC private key(code:002)";
            }
            if (o.substr(n[1], 2) != "04") {
                throw "malformed ECC private key(code:003)";
            }
            q.key = ASN1HEX.getHexOfV_AtObj(o, n[1]);
        },
        parsePublicPKCS8Hex: function(q) {
            var o = {};
            o.algparam = null;
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
            if (p.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + p.length;
            }
            var r = p[0];
            if (q.substr(r, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(q, r);
            if (n.length != 2) {
                throw "malformed PKCS8 public key(code:002)";
            }
            if (q.substr(n[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)";
            }
            o.algoid = ASN1HEX.getHexOfV_AtObj(q, n[0]);
            if (q.substr(n[1], 2) == "06") {
                o.algparam = ASN1HEX.getHexOfV_AtObj(q, n[1]);
            }
            if (q.substr(p[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)";
            }
            o.key = ASN1HEX.getHexOfV_AtObj(q, p[1]).substr(2);
            return o;
        },
        getRSAKeyFromPublicPKCS8Hex: function(r) {
            var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
            if (q.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + q.length;
            }
            var p = ASN1HEX.getHexOfTLV_AtObj(r, q[0]);
            if (p != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmId is not rsaEncryption";
            }
            if (r.substr(q[1], 2) != "03") {
                throw "PKCS8 Public Key is not BITSTRING encapslated.";
            }
            var t = ASN1HEX.getStartPosOfV_AtObj(r, q[1]) + 2;
            if (r.substr(t, 2) != "30") {
                throw "PKCS8 Public Key is not SEQUENCE.";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(r, t);
            if (n.length != 2) {
                throw "inner DERSequence shall have 2 elements: " + n.length;
            }
            if (r.substr(n[0], 2) != "02") {
                throw "N is not ASN.1 INTEGER";
            }
            if (r.substr(n[1], 2) != "02") {
                throw "E is not ASN.1 INTEGER";
            }
            var u = ASN1HEX.getHexOfV_AtObj(r, n[0]);
            var s = ASN1HEX.getHexOfV_AtObj(r, n[1]);
            var o = new RSAKey();
            o.setPublic(u, s);
            return o;
        }
    };
}();

var KEYUTIL = function() {
    var c = function(n, p, o) {
        return i(CryptoJS.AES, n, p, o);
    };
    var d = function(n, p, o) {
        return i(CryptoJS.TripleDES, n, p, o);
    };
    var i = function(q, v, s, o) {
        var p = CryptoJS.enc.Hex.parse(v);
        var u = CryptoJS.enc.Hex.parse(s);
        var n = CryptoJS.enc.Hex.parse(o);
        var r = {};
        r.key = u;
        r.iv = n;
        r.ciphertext = p;
        var t = q.decrypt(r, u, {
            iv: n
        });
        return CryptoJS.enc.Hex.stringify(t);
    };
    var j = function(n, p, o) {
        return e(CryptoJS.AES, n, p, o);
    };
    var m = function(n, p, o) {
        return e(CryptoJS.TripleDES, n, p, o);
    };
    var e = function(r, w, t, o) {
        var q = CryptoJS.enc.Hex.parse(w);
        var v = CryptoJS.enc.Hex.parse(t);
        var n = CryptoJS.enc.Hex.parse(o);
        var u = r.encrypt(q, v, {
            iv: n
        });
        var p = CryptoJS.enc.Hex.parse(u.toString());
        var s = CryptoJS.enc.Base64.stringify(p);
        return s;
    };
    var g = {
        "AES-256-CBC": {
            proc: c,
            eproc: j,
            keylen: 32,
            ivlen: 16
        },
        "AES-192-CBC": {
            proc: c,
            eproc: j,
            keylen: 24,
            ivlen: 16
        },
        "AES-128-CBC": {
            proc: c,
            eproc: j,
            keylen: 16,
            ivlen: 16
        },
        "DES-EDE3-CBC": {
            proc: d,
            eproc: m,
            keylen: 24,
            ivlen: 8
        }
    };
    var b = function(n) {
        return g[n]["proc"];
    };
    var k = function(n) {
        var p = CryptoJS.lib.WordArray.random(n);
        var o = CryptoJS.enc.Hex.stringify(p);
        return o;
    };
    var l = function(q) {
        var r = {};
        if (q.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)", "m"))) {
            r.cipher = RegExp.$1;
            r.ivsalt = RegExp.$2;
        }
        if (q.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"))) {
            r.type = RegExp.$1;
        }
        var p = -1;
        var t = 0;
        if (q.indexOf("\r\n\r\n") != -1) {
            p = q.indexOf("\r\n\r\n");
            t = 2;
        }
        if (q.indexOf("\n\n") != -1) {
            p = q.indexOf("\n\n");
            t = 1;
        }
        var o = q.indexOf("-----END");
        if (p != -1 && o != -1) {
            var n = q.substring(p + t * 2, o - t);
            n = n.replace(/\s+/g, "");
            r.data = n;
        }
        return r;
    };
    var h = function(o, w, n) {
        var t = n.substring(0, 16);
        var r = CryptoJS.enc.Hex.parse(t);
        var p = CryptoJS.enc.Utf8.parse(w);
        var s = g[o]["keylen"] + g[o]["ivlen"];
        var v = "";
        var u = null;
        for (;;) {
            var q = CryptoJS.algo.MD5.create();
            if (u != null) {
                q.update(u);
            }
            q.update(p);
            q.update(r);
            u = q.finalize();
            v = v + CryptoJS.enc.Hex.stringify(u);
            if (v.length >= s * 2) {
                break;
            }
        }
        var x = {};
        x.keyhex = v.substr(0, g[o]["keylen"] * 2);
        x.ivhex = v.substr(g[o]["keylen"] * 2, g[o]["ivlen"] * 2);
        return x;
    };
    var a = function(n, t, p, u) {
        var q = CryptoJS.enc.Base64.parse(n);
        var o = CryptoJS.enc.Hex.stringify(q);
        var s = g[t]["proc"];
        var r = s(o, p, u);
        return r;
    };
    var f = function(n, q, o, s) {
        var p = g[q]["eproc"];
        var r = p(n, o, s);
        return r;
    };
    return {
        version: "1.0.0",
        getHexFromPEM: function(o, r) {
            var p = o;
            if (p.indexOf("BEGIN " + r) == -1) {
                throw "can't find PEM header: " + r;
            }
            p = p.replace("-----BEGIN " + r + "-----", "");
            p = p.replace("-----END " + r + "-----", "");
            var q = p.replace(/\s+/g, "");
            var n = b64tohex(q);
            return n;
        },
        getDecryptedKeyHexByKeyIV: function(o, r, q, p) {
            var n = b(r);
            return n(o, q, p);
        },
        parsePKCS5PEM: function(n) {
            return l(n);
        },
        getKeyAndUnusedIvByPasscodeAndIvsalt: function(o, n, p) {
            return h(o, n, p);
        },
        decryptKeyB64: function(n, p, o, q) {
            return a(n, p, o, q);
        },
        getDecryptedKeyHex: function(w, v) {
            var o = l(w);
            var r = o.type;
            var p = o.cipher;
            var n = o.ivsalt;
            var q = o.data;
            var u = h(p, v, n);
            var t = u.keyhex;
            var s = a(q, p, t, n);
            return s;
        },
        getRSAKeyFromEncryptedPKCS5PEM: function(p, o) {
            var q = this.getDecryptedKeyHex(p, o);
            var n = new RSAKey();
            n.readPrivateKeyFromASN1HexString(q);
            return n;
        },
        getEncryptedPKCS5PEMFromPrvKeyHex: function(q, x, r, p) {
            var n = "";
            if (typeof r == "undefined" || r == null) {
                r = "AES-256-CBC";
            }
            if (typeof g[r] == "undefined") {
                throw "KEYUTIL unsupported algorithm: " + r;
            }
            if (typeof p == "undefined" || p == null) {
                var t = g[r]["ivlen"];
                var s = k(t);
                p = s.toUpperCase();
            }
            var w = h(r, x, p);
            var v = w.keyhex;
            var u = f(q, r, v, p);
            var o = u.replace(/(.{64})/g, "$1\r\n");
            var n = "-----BEGIN RSA PRIVATE KEY-----\r\n";
            n += "Proc-Type: 4,ENCRYPTED\r\n";
            n += "DEK-Info: " + r + "," + p + "\r\n";
            n += "\r\n";
            n += o;
            n += "\r\n-----END RSA PRIVATE KEY-----\r\n";
            return n;
        },
        getEncryptedPKCS5PEMFromRSAKey: function(C, D, o, s) {
            var A = new KJUR.asn1.DERInteger({
                "int": 0
            });
            var v = new KJUR.asn1.DERInteger({
                bigint: C.n
            });
            var z = new KJUR.asn1.DERInteger({
                "int": C.e
            });
            var B = new KJUR.asn1.DERInteger({
                bigint: C.d
            });
            var t = new KJUR.asn1.DERInteger({
                bigint: C.p
            });
            var r = new KJUR.asn1.DERInteger({
                bigint: C.q
            });
            var y = new KJUR.asn1.DERInteger({
                bigint: C.dmp1
            });
            var u = new KJUR.asn1.DERInteger({
                bigint: C.dmq1
            });
            var x = new KJUR.asn1.DERInteger({
                bigint: C.coeff
            });
            var E = new KJUR.asn1.DERSequence({
                array: [ A, v, z, B, t, r, y, u, x ]
            });
            var w = E.getEncodedHex();
            return this.getEncryptedPKCS5PEMFromPrvKeyHex(w, D, o, s);
        },
        newEncryptedPKCS5PEM: function(n, o, r, s) {
            if (typeof o == "undefined" || o == null) {
                o = 1024;
            }
            if (typeof r == "undefined" || r == null) {
                r = "10001";
            }
            var p = new RSAKey();
            p.generate(o, r);
            var q = null;
            if (typeof s == "undefined" || s == null) {
                q = this.getEncryptedPKCS5PEMFromRSAKey(pkey, n);
            } else {
                q = this.getEncryptedPKCS5PEMFromRSAKey(pkey, n, s);
            }
            return q;
        },
        getRSAKeyFromPlainPKCS8PEM: function(p) {
            if (p.match(/ENCRYPTED/)) {
                throw "pem shall be not ENCRYPTED";
            }
            var o = this.getHexFromPEM(p, "PRIVATE KEY");
            var n = this.getRSAKeyFromPlainPKCS8Hex(o);
            return n;
        },
        getRSAKeyFromPlainPKCS8Hex: function(q) {
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
            if (p.length != 3) {
                throw "outer DERSequence shall have 3 elements: " + p.length;
            }
            var o = ASN1HEX.getHexOfTLV_AtObj(q, p[1]);
            if (o != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmIdentifier is not rsaEnc: " + o;
            }
            var o = ASN1HEX.getHexOfTLV_AtObj(q, p[1]);
            var r = ASN1HEX.getHexOfTLV_AtObj(q, p[2]);
            var s = ASN1HEX.getHexOfV_AtObj(r, 0);
            var n = new RSAKey();
            n.readPrivateKeyFromASN1HexString(s);
            return n;
        },
        parseHexOfEncryptedPKCS8: function(u) {
            var q = {};
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(u, 0);
            if (p.length != 2) {
                throw "malformed format: SEQUENCE(0).items != 2: " + p.length;
            }
            q.ciphertext = ASN1HEX.getHexOfV_AtObj(u, p[1]);
            var w = ASN1HEX.getPosArrayOfChildren_AtObj(u, p[0]);
            if (w.length != 2) {
                throw "malformed format: SEQUENCE(0.0).items != 2: " + w.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(u, w[0]) != "2a864886f70d01050d") {
                throw "this only supports pkcs5PBES2";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(u, w[1]);
            if (w.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1).items != 2: " + n.length;
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(u, n[1]);
            if (o.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.1).items != 2: " + o.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(u, o[0]) != "2a864886f70d0307") {
                throw "this only supports TripleDES";
            }
            q.encryptionSchemeAlg = "TripleDES";
            q.encryptionSchemeIV = ASN1HEX.getHexOfV_AtObj(u, o[1]);
            var r = ASN1HEX.getPosArrayOfChildren_AtObj(u, n[0]);
            if (r.length != 2) {
                throw "malformed format: SEQUENCE(0.0.1.0).items != 2: " + r.length;
            }
            if (ASN1HEX.getHexOfV_AtObj(u, r[0]) != "2a864886f70d01050c") {
                throw "this only supports pkcs5PBKDF2";
            }
            var v = ASN1HEX.getPosArrayOfChildren_AtObj(u, r[1]);
            if (v.length < 2) {
                throw "malformed format: SEQUENCE(0.0.1.0.1).items < 2: " + v.length;
            }
            q.pbkdf2Salt = ASN1HEX.getHexOfV_AtObj(u, v[0]);
            var s = ASN1HEX.getHexOfV_AtObj(u, v[1]);
            try {
                q.pbkdf2Iter = parseInt(s, 16);
            } catch (t) {
                throw "malformed format pbkdf2Iter: " + s;
            }
            return q;
        },
        getPBKDF2KeyHexFromParam: function(s, n) {
            var r = CryptoJS.enc.Hex.parse(s.pbkdf2Salt);
            var o = s.pbkdf2Iter;
            var q = CryptoJS.PBKDF2(n, r, {
                keySize: 192 / 32,
                iterations: o
            });
            var p = CryptoJS.enc.Hex.stringify(q);
            return p;
        },
        getPlainPKCS8HexFromEncryptedPKCS8PEM: function(v, w) {
            var p = this.getHexFromPEM(v, "ENCRYPTED PRIVATE KEY");
            var n = this.parseHexOfEncryptedPKCS8(p);
            var s = KEYUTIL.getPBKDF2KeyHexFromParam(n, w);
            var t = {};
            t.ciphertext = CryptoJS.enc.Hex.parse(n.ciphertext);
            var r = CryptoJS.enc.Hex.parse(s);
            var q = CryptoJS.enc.Hex.parse(n.encryptionSchemeIV);
            var u = CryptoJS.TripleDES.decrypt(t, r, {
                iv: q
            });
            var o = CryptoJS.enc.Hex.stringify(u);
            return o;
        },
        getRSAKeyFromEncryptedPKCS8PEM: function(q, p) {
            var o = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(q, p);
            var n = this.getRSAKeyFromPlainPKCS8Hex(o);
            return n;
        },
        getKeyFromEncryptedPKCS8PEM: function(q, o) {
            var n = this.getPlainPKCS8HexFromEncryptedPKCS8PEM(q, o);
            var p = this.getKeyFromPlainPrivatePKCS8Hex(n);
            return p;
        },
        parsePlainPrivatePKCS8Hex: function(q) {
            var o = {};
            o.algparam = null;
            if (q.substr(0, 2) != "30") {
                throw "malformed plain PKCS8 private key(code:001)";
            }
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
            if (p.length != 3) {
                throw "malformed plain PKCS8 private key(code:002)";
            }
            if (q.substr(p[1], 2) != "30") {
                throw "malformed PKCS8 private key(code:003)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(q, p[1]);
            if (n.length != 2) {
                throw "malformed PKCS8 private key(code:004)";
            }
            if (q.substr(n[0], 2) != "06") {
                throw "malformed PKCS8 private key(code:005)";
            }
            o.algoid = ASN1HEX.getHexOfV_AtObj(q, n[0]);
            if (q.substr(n[1], 2) == "06") {
                o.algparam = ASN1HEX.getHexOfV_AtObj(q, n[1]);
            }
            if (q.substr(p[2], 2) != "04") {
                throw "malformed PKCS8 private key(code:006)";
            }
            o.keyidx = ASN1HEX.getStartPosOfV_AtObj(q, p[2]);
            return o;
        },
        getKeyFromPlainPrivatePKCS8PEM: function(o) {
            var n = this.getHexFromPEM(o, "PRIVATE KEY");
            var p = this.getKeyFromPlainPrivatePKCS8Hex(n);
            return p;
        },
        getKeyFromPlainPrivatePKCS8Hex: function(n) {
            var p = this.parsePlainPrivatePKCS8Hex(n);
            if (p.algoid == "2a864886f70d010101") {
                this.parsePrivateRawRSAKeyHexAtObj(n, p);
                var o = p.key;
                var q = new RSAKey();
                q.setPrivateEx(o.n, o.e, o.d, o.p, o.q, o.dp, o.dq, o.co);
                return q;
            } else {
                if (p.algoid == "2a8648ce3d0201") {
                    this.parsePrivateRawECKeyHexAtObj(n, p);
                    if (KJUR.crypto.OID.oidhex2name[p.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + p.algparam;
                    }
                    var r = KJUR.crypto.OID.oidhex2name[p.algparam];
                    var q = new KJUR.crypto.ECDSA({
                        curve: r,
                        prv: p.key
                    });
                    return q;
                } else {
                    throw "unsupported private key algorithm";
                }
            }
        },
        getRSAKeyFromPublicPKCS8PEM: function(o) {
            var p = this.getHexFromPEM(o, "PUBLIC KEY");
            var n = this.getRSAKeyFromPublicPKCS8Hex(p);
            return n;
        },
        getKeyFromPublicPKCS8PEM: function(o) {
            var p = this.getHexFromPEM(o, "PUBLIC KEY");
            var n = this.getKeyFromPublicPKCS8Hex(p);
            return n;
        },
        getKeyFromPublicPKCS8Hex: function(o) {
            var n = this.parsePublicPKCS8Hex(o);
            if (n.algoid == "2a864886f70d010101") {
                var r = this.parsePublicRawRSAKeyHex(n.key);
                var p = new RSAKey();
                p.setPublic(r.n, r.e);
                return p;
            } else {
                if (n.algoid == "2a8648ce3d0201") {
                    if (KJUR.crypto.OID.oidhex2name[n.algparam] === undefined) {
                        throw "KJUR.crypto.OID.oidhex2name undefined: " + n.algparam;
                    }
                    var q = KJUR.crypto.OID.oidhex2name[n.algparam];
                    var p = new KJUR.crypto.ECDSA({
                        curve: q,
                        pub: n.key
                    });
                    return p;
                } else {
                    throw "unsupported public key algorithm";
                }
            }
        },
        parsePublicRawRSAKeyHex: function(p) {
            var n = {};
            if (p.substr(0, 2) != "30") {
                throw "malformed RSA key(code:001)";
            }
            var o = ASN1HEX.getPosArrayOfChildren_AtObj(p, 0);
            if (o.length != 2) {
                throw "malformed RSA key(code:002)";
            }
            if (p.substr(o[0], 2) != "02") {
                throw "malformed RSA key(code:003)";
            }
            n.n = ASN1HEX.getHexOfV_AtObj(p, o[0]);
            if (p.substr(o[1], 2) != "02") {
                throw "malformed RSA key(code:004)";
            }
            n.e = ASN1HEX.getHexOfV_AtObj(p, o[1]);
            return n;
        },
        parsePrivateRawRSAKeyHexAtObj: function(o, q) {
            var p = q.keyidx;
            if (o.substr(p, 2) != "30") {
                throw "malformed RSA private key(code:001)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(o, p);
            if (n.length != 9) {
                throw "malformed RSA private key(code:002)";
            }
            q.key = {};
            q.key.n = ASN1HEX.getHexOfV_AtObj(o, n[1]);
            q.key.e = ASN1HEX.getHexOfV_AtObj(o, n[2]);
            q.key.d = ASN1HEX.getHexOfV_AtObj(o, n[3]);
            q.key.p = ASN1HEX.getHexOfV_AtObj(o, n[4]);
            q.key.q = ASN1HEX.getHexOfV_AtObj(o, n[5]);
            q.key.dp = ASN1HEX.getHexOfV_AtObj(o, n[6]);
            q.key.dq = ASN1HEX.getHexOfV_AtObj(o, n[7]);
            q.key.co = ASN1HEX.getHexOfV_AtObj(o, n[8]);
        },
        parsePrivateRawECKeyHexAtObj: function(o, q) {
            var p = q.keyidx;
            if (o.substr(p, 2) != "30") {
                throw "malformed ECC private key(code:001)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(o, p);
            if (n.length != 3) {
                throw "malformed ECC private key(code:002)";
            }
            if (o.substr(n[1], 2) != "04") {
                throw "malformed ECC private key(code:003)";
            }
            q.key = ASN1HEX.getHexOfV_AtObj(o, n[1]);
        },
        parsePublicPKCS8Hex: function(q) {
            var o = {};
            o.algparam = null;
            var p = ASN1HEX.getPosArrayOfChildren_AtObj(q, 0);
            if (p.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + p.length;
            }
            var r = p[0];
            if (q.substr(r, 2) != "30") {
                throw "malformed PKCS8 public key(code:001)";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(q, r);
            if (n.length != 2) {
                throw "malformed PKCS8 public key(code:002)";
            }
            if (q.substr(n[0], 2) != "06") {
                throw "malformed PKCS8 public key(code:003)";
            }
            o.algoid = ASN1HEX.getHexOfV_AtObj(q, n[0]);
            if (q.substr(n[1], 2) == "06") {
                o.algparam = ASN1HEX.getHexOfV_AtObj(q, n[1]);
            }
            if (q.substr(p[1], 2) != "03") {
                throw "malformed PKCS8 public key(code:004)";
            }
            o.key = ASN1HEX.getHexOfV_AtObj(q, p[1]).substr(2);
            return o;
        },
        getRSAKeyFromPublicPKCS8Hex: function(r) {
            var q = ASN1HEX.getPosArrayOfChildren_AtObj(r, 0);
            if (q.length != 2) {
                throw "outer DERSequence shall have 2 elements: " + q.length;
            }
            var p = ASN1HEX.getHexOfTLV_AtObj(r, q[0]);
            if (p != "300d06092a864886f70d0101010500") {
                throw "PKCS8 AlgorithmId is not rsaEncryption";
            }
            if (r.substr(q[1], 2) != "03") {
                throw "PKCS8 Public Key is not BITSTRING encapslated.";
            }
            var t = ASN1HEX.getStartPosOfV_AtObj(r, q[1]) + 2;
            if (r.substr(t, 2) != "30") {
                throw "PKCS8 Public Key is not SEQUENCE.";
            }
            var n = ASN1HEX.getPosArrayOfChildren_AtObj(r, t);
            if (n.length != 2) {
                throw "inner DERSequence shall have 2 elements: " + n.length;
            }
            if (r.substr(n[0], 2) != "02") {
                throw "N is not ASN.1 INTEGER";
            }
            if (r.substr(n[1], 2) != "02") {
                throw "E is not ASN.1 INTEGER";
            }
            var u = ASN1HEX.getHexOfV_AtObj(r, n[0]);
            var s = ASN1HEX.getHexOfV_AtObj(r, n[1]);
            var o = new RSAKey();
            o.setPublic(u, s);
            return o;
        }
    };
}();

KEYUTIL.getKey = function(d, a, c) {
    if (d instanceof RSAKey) {
        return d;
    }
    if (d instanceof KJUR.crypto.ECDSA) {
        return d;
    }
    if (d.xy !== undefined && d.curve !== undefined) {
        return new KJUR.crypto.ECDSA({
            prv: d.xy,
            curve: d.curve
        });
    }
    if (d.n !== undefined && d.e !== undefined && d.d !== undefined && d.p !== undefined && d.q !== undefined && d.dp !== undefined && d.dq !== undefined && d.co !== undefined) {
        var b = new RSAKey();
        b.setPrivateEx(d.n, d.e, d.d, d.p, d.q, d.dp, d.dq, d.co);
        return b;
    }
    if (d.d !== undefined && d.curve !== undefined) {
        return new KJUR.crypto.ECDSA({
            pub: d.d,
            curve: d.curve
        });
    }
    if (d.n !== undefined && d.e) {
        var b = new RSAKey();
        b.setPublic(d.n, d.e);
        return b;
    }
    if (d.indexOf("-END CERTIFICATE-", 0) != -1 || d.indexOf("-END X509 CERTIFICATE-", 0) != -1 || d.indexOf("-END TRUSTED CERTIFICATE-", 0) != -1) {
        return X509.getPublicKeyFromCertPEM(d);
    }
    if (c === "pkcs8pub") {
        return KEYUTIL.getKeyFromPublicPKCS8Hex(d);
    }
    if (d.indexOf("-END PUBLIC KEY-") != -1) {
        return KEYUTIL.getKeyFromPublicPKCS8PEM(d);
    }
    if (c === "pkcs5prv") {
        var b = new RSAKey();
        b.readPrivateKeyFromASN1HexString(d);
        return b;
    }
    if (c === "pkcs5prv") {
        var b = new RSAKey();
        b.readPrivateKeyFromASN1HexString(d);
        return b;
    }
    if (d.indexOf("-END RSA PRIVATE KEY-") != -1 && d.indexOf("4,ENCRYPTED") == -1) {
        var b = new RSAKey();
        b.readPrivateKeyFromPEMString(d);
        return b;
    }
    if (d.indexOf("-END PRIVATE KEY-") != -1) {
        return KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(d);
    }
    if (d.indexOf("-END RSA PRIVATE KEY-") != -1 && d.indexOf("4,ENCRYPTED") != -1) {
        return KEYUTIL.getRSAKeyFromEncryptedPKCS5PEM(d, a);
    }
    if (d.indexOf("-END ENCRYPTED PRIVATE KEY-") != -1) {
        return KEYUTIL.getKeyFromEncryptedPKCS8PEM(d, a);
    }
    throw "not supported argument";
};

KEYUTIL.generateKeypair = function(a, c) {
    if (a == "RSA") {
        var b = c;
        var h = new RSAKey();
        h.generate(b, "10001");
        var f = new RSAKey();
        var e = h.n.toString(16);
        var i = h.e.toString(16);
        f.setPublic(e, i);
        var k = {};
        k.prvKeyObj = h;
        k.pubKeyObj = f;
        return k;
    } else {
        if (a == "EC") {
            var d = c;
            var g = new KJUR.crypto.ECDSA({
                curve: d
            });
            var j = g.generateKeyPairHex();
            var h = new KJUR.crypto.ECDSA({
                curve: d
            });
            h.setPrivateKeyHex(j.ecprvhex);
            var f = new KJUR.crypto.ECDSA({
                curve: d
            });
            f.setPublicKeyHex(j.ecpubhex);
            var k = {};
            k.prvKeyObj = h;
            k.pubKeyObj = f;
            return k;
        } else {
            throw "unknown algorithm: " + a;
        }
    }
};

function _rsapem_pemToBase64(b) {
    var a = b;
    a = a.replace("-----BEGIN RSA PRIVATE KEY-----", "");
    a = a.replace("-----END RSA PRIVATE KEY-----", "");
    a = a.replace(/[ \n]+/g, "");
    return a;
}

function _rsapem_getPosArrayOfChildrenFromHex(d) {
    var j = new Array();
    var k = ASN1HEX.getStartPosOfV_AtObj(d, 0);
    var f = ASN1HEX.getPosOfNextSibling_AtObj(d, k);
    var h = ASN1HEX.getPosOfNextSibling_AtObj(d, f);
    var b = ASN1HEX.getPosOfNextSibling_AtObj(d, h);
    var l = ASN1HEX.getPosOfNextSibling_AtObj(d, b);
    var e = ASN1HEX.getPosOfNextSibling_AtObj(d, l);
    var g = ASN1HEX.getPosOfNextSibling_AtObj(d, e);
    var c = ASN1HEX.getPosOfNextSibling_AtObj(d, g);
    var i = ASN1HEX.getPosOfNextSibling_AtObj(d, c);
    j.push(k, f, h, b, l, e, g, c, i);
    return j;
}

function _rsapem_getHexValueArrayOfChildrenFromHex(i) {
    var o = _rsapem_getPosArrayOfChildrenFromHex(i);
    var r = ASN1HEX.getHexOfV_AtObj(i, o[0]);
    var f = ASN1HEX.getHexOfV_AtObj(i, o[1]);
    var j = ASN1HEX.getHexOfV_AtObj(i, o[2]);
    var k = ASN1HEX.getHexOfV_AtObj(i, o[3]);
    var c = ASN1HEX.getHexOfV_AtObj(i, o[4]);
    var b = ASN1HEX.getHexOfV_AtObj(i, o[5]);
    var h = ASN1HEX.getHexOfV_AtObj(i, o[6]);
    var g = ASN1HEX.getHexOfV_AtObj(i, o[7]);
    var l = ASN1HEX.getHexOfV_AtObj(i, o[8]);
    var m = new Array();
    m.push(r, f, j, k, c, b, h, g, l);
    return m;
}

function _rsapem_readPrivateKeyFromASN1HexString(c) {
    var b = _rsapem_getHexValueArrayOfChildrenFromHex(c);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);
}

function _rsapem_readPrivateKeyFromPEMString(e) {
    var c = _rsapem_pemToBase64(e);
    var d = b64tohex(c);
    var b = _rsapem_getHexValueArrayOfChildrenFromHex(d);
    this.setPrivateEx(b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8]);
}

RSAKey.prototype.readPrivateKeyFromPEMString = _rsapem_readPrivateKeyFromPEMString;

RSAKey.prototype.readPrivateKeyFromASN1HexString = _rsapem_readPrivateKeyFromASN1HexString;

var _RE_HEXDECONLY = new RegExp("");

_RE_HEXDECONLY.compile("[^0-9a-f]", "gi");

function _rsasign_getHexPaddedDigestInfoForString(d, e, a) {
    var b = function(f) {
        return KJUR.crypto.Util.hashString(f, a);
    };
    var c = b(d);
    return KJUR.crypto.Util.getPaddedDigestInfoHex(c, a, e);
}

function _zeroPaddingOfSignature(e, d) {
    var c = "";
    var a = d / 4 - e.length;
    for (var b = 0; b < a; b++) {
        c = c + "0";
    }
    return c + e;
}

function _rsasign_signString(d, a) {
    var b = function(e) {
        return KJUR.crypto.Util.hashString(e, a);
    };
    var c = b(d);
    return this.signWithMessageHash(c, a);
}

function _rsasign_signWithMessageHash(e, c) {
    var f = KJUR.crypto.Util.getPaddedDigestInfoHex(e, c, this.n.bitLength());
    var b = parseBigInt(f, 16);
    var d = this.doPrivate(b);
    var a = d.toString(16);
    return _zeroPaddingOfSignature(a, this.n.bitLength());
}

function _rsasign_signStringWithSHA1(a) {
    return _rsasign_signString.call(this, a, "sha1");
}

function _rsasign_signStringWithSHA256(a) {
    return _rsasign_signString.call(this, a, "sha256");
}

function pss_mgf1_str(c, a, e) {
    var b = "", d = 0;
    while (b.length < a) {
        b += hextorstr(e(rstrtohex(c + String.fromCharCode.apply(String, [ (d & 4278190080) >> 24, (d & 16711680) >> 16, (d & 65280) >> 8, d & 255 ]))));
        d += 1;
    }
    return b;
}

function _rsasign_signStringPSS(e, a, d) {
    var c = function(f) {
        return KJUR.crypto.Util.hashHex(f, a);
    };
    var b = c(rstrtohex(e));
    if (d === undefined) {
        d = -1;
    }
    return this.signWithMessageHashPSS(b, a, d);
}

function _rsasign_signWithMessageHashPSS(l, a, k) {
    var b = hextorstr(l);
    var g = b.length;
    var m = this.n.bitLength() - 1;
    var c = Math.ceil(m / 8);
    var d;
    var o = function(i) {
        return KJUR.crypto.Util.hashHex(i, a);
    };
    if (k === -1 || k === undefined) {
        k = g;
    } else {
        if (k === -2) {
            k = c - g - 2;
        } else {
            if (k < -2) {
                throw "invalid salt length";
            }
        }
    }
    if (c < g + k + 2) {
        throw "data too long";
    }
    var f = "";
    if (k > 0) {
        f = new Array(k);
        new SecureRandom().nextBytes(f);
        f = String.fromCharCode.apply(String, f);
    }
    var n = hextorstr(o(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + b + f)));
    var j = [];
    for (d = 0; d < c - k - g - 2; d += 1) {
        j[d] = 0;
    }
    var e = String.fromCharCode.apply(String, j) + "" + f;
    var h = pss_mgf1_str(n, e.length, o);
    var q = [];
    for (d = 0; d < e.length; d += 1) {
        q[d] = e.charCodeAt(d) ^ h.charCodeAt(d);
    }
    var p = 65280 >> 8 * c - m & 255;
    q[0] &= ~p;
    for (d = 0; d < g; d++) {
        q.push(n.charCodeAt(d));
    }
    q.push(188);
    return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(q)).toString(16), this.n.bitLength());
}

function _rsasign_getDecryptSignatureBI(a, d, c) {
    var b = new RSAKey();
    b.setPublic(d, c);
    var e = b.doPublic(a);
    return e;
}

function _rsasign_getHexDigestInfoFromSig(a, c, b) {
    var e = _rsasign_getDecryptSignatureBI(a, c, b);
    var d = e.toString(16).replace(/^1f+00/, "");
    return d;
}

function _rsasign_getAlgNameAndHashFromHexDisgestInfo(f) {
    for (var e in KJUR.crypto.Util.DIGESTINFOHEAD) {
        var d = KJUR.crypto.Util.DIGESTINFOHEAD[e];
        var b = d.length;
        if (f.substring(0, b) == d) {
            var c = [ e, f.substring(b) ];
            return c;
        }
    }
    return [];
}

function _rsasign_verifySignatureWithArgs(f, b, g, j) {
    var e = _rsasign_getHexDigestInfoFromSig(b, g, j);
    var h = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (h.length == 0) {
        return false;
    }
    var d = h[0];
    var i = h[1];
    var a = function(k) {
        return KJUR.crypto.Util.hashString(k, d);
    };
    var c = a(f);
    return i == c;
}

function _rsasign_verifyHexSignatureForMessage(c, b) {
    var d = parseBigInt(c, 16);
    var a = _rsasign_verifySignatureWithArgs(b, d, this.n.toString(16), this.e.toString(16));
    return a;
}

function _rsasign_verifyString(f, j) {
    j = j.replace(_RE_HEXDECONLY, "");
    j = j.replace(/[ \n]+/g, "");
    var b = parseBigInt(j, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0;
    }
    var i = this.doPublic(b);
    var e = i.toString(16).replace(/^1f+00/, "");
    var g = _rsasign_getAlgNameAndHashFromHexDisgestInfo(e);
    if (g.length == 0) {
        return false;
    }
    var d = g[0];
    var h = g[1];
    var a = function(k) {
        return KJUR.crypto.Util.hashString(k, d);
    };
    var c = a(f);
    return h == c;
}

function _rsasign_verifyWithMessageHash(e, a) {
    a = a.replace(_RE_HEXDECONLY, "");
    a = a.replace(/[ \n]+/g, "");
    var b = parseBigInt(a, 16);
    if (b.bitLength() > this.n.bitLength()) {
        return 0;
    }
    var h = this.doPublic(b);
    var g = h.toString(16).replace(/^1f+00/, "");
    var c = _rsasign_getAlgNameAndHashFromHexDisgestInfo(g);
    if (c.length == 0) {
        return false;
    }
    var d = c[0];
    var f = c[1];
    return f == e;
}

function _rsasign_verifyStringPSS(c, b, a, f) {
    var e = function(g) {
        return KJUR.crypto.Util.hashHex(g, a);
    };
    var d = e(rstrtohex(c));
    if (f === undefined) {
        f = -1;
    }
    return this.verifyWithMessageHashPSS(d, b, a, f);
}

function _rsasign_verifyWithMessageHashPSS(f, s, l, c) {
    var k = new BigInteger(s, 16);
    if (k.bitLength() > this.n.bitLength()) {
        return false;
    }
    var r = function(i) {
        return KJUR.crypto.Util.hashHex(i, l);
    };
    var j = hextorstr(f);
    var h = j.length;
    var g = this.n.bitLength() - 1;
    var m = Math.ceil(g / 8);
    var q;
    if (c === -1 || c === undefined) {
        c = h;
    } else {
        if (c === -2) {
            c = m - h - 2;
        } else {
            if (c < -2) {
                throw "invalid salt length";
            }
        }
    }
    if (m < h + c + 2) {
        throw "data too long";
    }
    var a = this.doPublic(k).toByteArray();
    for (q = 0; q < a.length; q += 1) {
        a[q] &= 255;
    }
    while (a.length < m) {
        a.unshift(0);
    }
    if (a[m - 1] !== 188) {
        throw "encoded message does not end in 0xbc";
    }
    a = String.fromCharCode.apply(String, a);
    var d = a.substr(0, m - h - 1);
    var e = a.substr(d.length, h);
    var p = 65280 >> 8 * m - g & 255;
    if ((d.charCodeAt(0) & p) !== 0) {
        throw "bits beyond keysize not zero";
    }
    var n = pss_mgf1_str(e, d.length, r);
    var o = [];
    for (q = 0; q < d.length; q += 1) {
        o[q] = d.charCodeAt(q) ^ n.charCodeAt(q);
    }
    o[0] &= ~p;
    var b = m - h - c - 2;
    for (q = 0; q < b; q += 1) {
        if (o[q] !== 0) {
            throw "leftmost octets not zero";
        }
    }
    if (o[b] !== 1) {
        throw "0x01 marker not found";
    }
    return e === hextorstr(r(rstrtohex("\x00\x00\x00\x00\x00\x00\x00\x00" + j + String.fromCharCode.apply(String, o.slice(-c)))));
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
    this.readCertPEM = function(c) {
        var e = X509.pemToHex(c);
        var b = X509.getPublicKeyHexArrayFromCertHex(e);
        var d = new RSAKey();
        d.setPublic(b[0], b[1]);
        this.subjectPublicKeyRSA = d;
        this.subjectPublicKeyRSA_hN = b[0];
        this.subjectPublicKeyRSA_hE = b[1];
        this.hex = e;
    };
    this.readCertPEMWithoutRSAInit = function(c) {
        var d = X509.pemToHex(c);
        var b = X509.getPublicKeyHexArrayFromCertHex(d);
        this.subjectPublicKeyRSA.setPublic(b[0], b[1]);
        this.subjectPublicKeyRSA_hN = b[0];
        this.subjectPublicKeyRSA_hE = b[1];
        this.hex = d;
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
    var c = X509.pemToBase64(a);
    var b = b64tohex(c);
    return b;
};

X509.getSubjectPublicKeyPosFromCertHex = function(f) {
    var e = X509.getSubjectPublicKeyInfoPosFromCertHex(f);
    if (e == -1) {
        return -1;
    }
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, e);
    if (b.length != 2) {
        return -1;
    }
    var d = b[1];
    if (f.substring(d, d + 2) != "03") {
        return -1;
    }
    var c = ASN1HEX.getStartPosOfV_AtObj(f, d);
    if (f.substring(c, c + 2) != "00") {
        return -1;
    }
    return c + 2;
};

X509.getSubjectPublicKeyInfoPosFromCertHex = function(d) {
    var c = ASN1HEX.getStartPosOfV_AtObj(d, 0);
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(d, c);
    if (b.length < 1) {
        return -1;
    }
    if (d.substring(b[0], b[0] + 10) == "a003020102") {
        if (b.length < 6) {
            return -1;
        }
        return b[6];
    } else {
        if (b.length < 5) {
            return -1;
        }
        return b[5];
    }
};

X509.getPublicKeyHexArrayFromCertHex = function(f) {
    var e = X509.getSubjectPublicKeyPosFromCertHex(f);
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(f, e);
    if (b.length != 2) {
        return [];
    }
    var d = ASN1HEX.getHexOfV_AtObj(f, b[0]);
    var c = ASN1HEX.getHexOfV_AtObj(f, b[1]);
    if (d != null && c != null) {
        return [ d, c ];
    } else {
        return [];
    }
};

X509.getHexTbsCertificateFromCert = function(b) {
    var a = ASN1HEX.getStartPosOfV_AtObj(b, 0);
    return a;
};

X509.getPublicKeyHexArrayFromCertPEM = function(c) {
    var d = X509.pemToHex(c);
    var b = X509.getPublicKeyHexArrayFromCertHex(d);
    return b;
};

X509.hex2dn = function(e) {
    var f = "";
    var c = ASN1HEX.getPosArrayOfChildren_AtObj(e, 0);
    for (var d = 0; d < c.length; d++) {
        var b = ASN1HEX.getHexOfTLV_AtObj(e, c[d]);
        f = f + "/" + X509.hex2rdn(b);
    }
    return f;
};

X509.hex2rdn = function(a) {
    var f = ASN1HEX.getDecendantHexTLVByNthList(a, 0, [ 0, 0 ]);
    var e = ASN1HEX.getDecendantHexVByNthList(a, 0, [ 0, 1 ]);
    var c = "";
    try {
        c = X509.DN_ATTRHEX[f];
    } catch (b) {
        c = f;
    }
    e = e.replace(/(..)/g, "%$1");
    var d = decodeURIComponent(e);
    return c + "=" + d;
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
    var d = X509.getPublicKeyInfoPropOfCertPEM(a);
    if (d.algoid == "2a864886f70d010101") {
        var e = PKCS5PKEY.parsePublicRawRSAKeyHex(d.keyhex);
        var b = new RSAKey();
        b.setPublic(e.n, e.e);
        return b;
    } else {
        if (d.algoid = "2a8648ce3d0201") {
            var c = KJUR.crypto.OID.oidhex2name[d.algparam];
            var b = new KJUR.crypto.ECDSA({
                curve: c,
                info: d.keyhex
            });
            b.setPublicKeyHex(d.keyhex);
            return b;
        } else {
            throw "unsupported key";
        }
    }
};

X509.getPublicKeyInfoPropOfCertPEM = function(e) {
    var c = {};
    c.algparam = null;
    var g = X509.pemToHex(e);
    var d = ASN1HEX.getPosArrayOfChildren_AtObj(g, 0);
    if (d.length != 3) {
        throw "malformed X.509 certificate PEM (code:001)";
    }
    if (g.substr(d[0], 2) != "30") {
        throw "malformed X.509 certificate PEM (code:002)";
    }
    var b = ASN1HEX.getPosArrayOfChildren_AtObj(g, d[0]);
    if (b.length < 7) {
        throw "malformed X.509 certificate PEM (code:003)";
    }
    var h = ASN1HEX.getPosArrayOfChildren_AtObj(g, b[6]);
    if (h.length != 2) {
        throw "malformed X.509 certificate PEM (code:004)";
    }
    var f = ASN1HEX.getPosArrayOfChildren_AtObj(g, h[0]);
    if (f.length != 2) {
        throw "malformed X.509 certificate PEM (code:005)";
    }
    c.algoid = ASN1HEX.getHexOfV_AtObj(g, f[0]);
    if (g.substr(f[1], 2) == "06") {
        c.algparam = ASN1HEX.getHexOfV_AtObj(g, f[1]);
    }
    if (g.substr(h[1], 2) != "03") {
        throw "malformed X.509 certificate PEM (code:006)";
    }
    var a = ASN1HEX.getHexOfV_AtObj(g, h[1]);
    c.keyhex = a.substr(2);
    return c;
};

if (typeof KJUR == "undefined" || !KJUR) KJUR = {};

if (typeof KJUR.jws == "undefined" || !KJUR.jws) KJUR.jws = {};

KJUR.jws.JWS = function() {
    this.parseJWS = function(sJWS, sigValNotNeeded) {
        if (this.parsedJWS !== undefined && (sigValNotNeeded || this.parsedJWS.sigvalH !== undefined)) {
            return;
        }
        if (sJWS.match(/^([^.]+)\.([^.]+)\.([^.]+)$/) == null) {
            throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
        }
        var b6Head = RegExp.$1;
        var b6Payload = RegExp.$2;
        var b6SigVal = RegExp.$3;
        var sSI = b6Head + "." + b6Payload;
        this.parsedJWS = {};
        this.parsedJWS.headB64U = b6Head;
        this.parsedJWS.payloadB64U = b6Payload;
        this.parsedJWS.sigvalB64U = b6SigVal;
        this.parsedJWS.si = sSI;
        if (!sigValNotNeeded) {
            var hSigVal = b64utohex(b6SigVal);
            var biSigVal = parseBigInt(hSigVal, 16);
            this.parsedJWS.sigvalH = hSigVal;
            this.parsedJWS.sigvalBI = biSigVal;
        }
        var sHead = b64utoutf8(b6Head);
        var sPayload = b64utoutf8(b6Payload);
        this.parsedJWS.headS = sHead;
        this.parsedJWS.payloadS = sPayload;
        if (!this.isSafeJSONString(sHead, this.parsedJWS, "headP")) throw "malformed JSON string for JWS Head: " + sHead;
    };
    function _getSignatureInputByString(sHead, sPayload) {
        return utf8tob64u(sHead) + "." + utf8tob64u(sPayload);
    }
    function _getHashBySignatureInput(sSignatureInput, sHashAlg) {
        var hashfunc = function(s) {
            return KJUR.crypto.Util.hashString(s, sHashAlg);
        };
        if (hashfunc == null) throw "hash function not defined in jsrsasign: " + sHashAlg;
        return hashfunc(sSignatureInput);
    }
    function _jws_verifySignature(sHead, sPayload, hSig, hN, hE) {
        var sSignatureInput = _getSignatureInputByString(sHead, sPayload);
        var biSig = parseBigInt(hSig, 16);
        return _rsasign_verifySignatureWithArgs(sSignatureInput, biSig, hN, hE);
    }
    this.verifyJWSByNE = function(sJWS, hN, hE) {
        this.parseJWS(sJWS);
        return _rsasign_verifySignatureWithArgs(this.parsedJWS.si, this.parsedJWS.sigvalBI, hN, hE);
    };
    this.verifyJWSByKey = function(sJWS, key) {
        this.parseJWS(sJWS);
        var hashAlg = _jws_getHashAlgFromParsedHead(this.parsedJWS.headP);
        var isPSS = this.parsedJWS.headP["alg"].substr(0, 2) == "PS";
        if (key.hashAndVerify) {
            return key.hashAndVerify(hashAlg, new Buffer(this.parsedJWS.si, "utf8").toString("base64"), b64utob64(this.parsedJWS.sigvalB64U), "base64", isPSS);
        } else if (isPSS) {
            return key.verifyStringPSS(this.parsedJWS.si, this.parsedJWS.sigvalH, hashAlg);
        } else {
            return key.verifyString(this.parsedJWS.si, this.parsedJWS.sigvalH);
        }
    };
    this.verifyJWSByPemX509Cert = function(sJWS, sPemX509Cert) {
        this.parseJWS(sJWS);
        var x509 = new X509();
        x509.readCertPEM(sPemX509Cert);
        return x509.subjectPublicKeyRSA.verifyString(this.parsedJWS.si, this.parsedJWS.sigvalH);
    };
    function _jws_getHashAlgFromParsedHead(head) {
        var sigAlg = head["alg"];
        var hashAlg = "";
        if (sigAlg != "RS256" && sigAlg != "RS512" && sigAlg != "PS256" && sigAlg != "PS512") throw "JWS signature algorithm not supported: " + sigAlg;
        if (sigAlg.substr(2) == "256") hashAlg = "sha256";
        if (sigAlg.substr(2) == "512") hashAlg = "sha512";
        return hashAlg;
    }
    function _jws_getHashAlgFromHead(sHead) {
        return _jws_getHashAlgFromParsedHead(jsonParse(sHead));
    }
    function _jws_generateSignatureValueBySI_NED(sHead, sPayload, sSI, hN, hE, hD) {
        var rsa = new RSAKey();
        rsa.setPrivate(hN, hE, hD);
        var hashAlg = _jws_getHashAlgFromHead(sHead);
        var sigValue = rsa.signString(sSI, hashAlg);
        return sigValue;
    }
    function _jws_generateSignatureValueBySI_Key(sHead, sPayload, sSI, key, head) {
        var hashAlg = null;
        if (typeof head == "undefined") {
            hashAlg = _jws_getHashAlgFromHead(sHead);
        } else {
            hashAlg = _jws_getHashAlgFromParsedHead(head);
        }
        var isPSS = head["alg"].substr(0, 2) == "PS";
        if (key.hashAndSign) {
            return b64tob64u(key.hashAndSign(hashAlg, sSI, "binary", "base64", isPSS));
        } else if (isPSS) {
            return hextob64u(key.signStringPSS(sSI, hashAlg));
        } else {
            return hextob64u(key.signString(sSI, hashAlg));
        }
    }
    function _jws_generateSignatureValueByNED(sHead, sPayload, hN, hE, hD) {
        var sSI = _getSignatureInputByString(sHead, sPayload);
        return _jws_generateSignatureValueBySI_NED(sHead, sPayload, sSI, hN, hE, hD);
    }
    this.generateJWSByNED = function(sHead, sPayload, hN, hE, hD) {
        if (!this.isSafeJSONString(sHead)) throw "JWS Head is not safe JSON string: " + sHead;
        var sSI = _getSignatureInputByString(sHead, sPayload);
        var hSigValue = _jws_generateSignatureValueBySI_NED(sHead, sPayload, sSI, hN, hE, hD);
        var b64SigValue = hextob64u(hSigValue);
        this.parsedJWS = {};
        this.parsedJWS.headB64U = sSI.split(".")[0];
        this.parsedJWS.payloadB64U = sSI.split(".")[1];
        this.parsedJWS.sigvalB64U = b64SigValue;
        return sSI + "." + b64SigValue;
    };
    this.generateJWSByKey = function(sHead, sPayload, key) {
        var obj = {};
        if (!this.isSafeJSONString(sHead, obj, "headP")) throw "JWS Head is not safe JSON string: " + sHead;
        var sSI = _getSignatureInputByString(sHead, sPayload);
        var b64SigValue = _jws_generateSignatureValueBySI_Key(sHead, sPayload, sSI, key, obj.headP);
        this.parsedJWS = {};
        this.parsedJWS.headB64U = sSI.split(".")[0];
        this.parsedJWS.payloadB64U = sSI.split(".")[1];
        this.parsedJWS.sigvalB64U = b64SigValue;
        return sSI + "." + b64SigValue;
    };
    function _jws_generateSignatureValueBySI_PemPrvKey(sHead, sPayload, sSI, sPemPrvKey) {
        var rsa = new RSAKey();
        rsa.readPrivateKeyFromPEMString(sPemPrvKey);
        var hashAlg = _jws_getHashAlgFromHead(sHead);
        var sigValue = rsa.signString(sSI, hashAlg);
        return sigValue;
    }
    this.generateJWSByP1PrvKey = function(sHead, sPayload, sPemPrvKey) {
        if (!this.isSafeJSONString(sHead)) throw "JWS Head is not safe JSON string: " + sHead;
        var sSI = _getSignatureInputByString(sHead, sPayload);
        var hSigValue = _jws_generateSignatureValueBySI_PemPrvKey(sHead, sPayload, sSI, sPemPrvKey);
        var b64SigValue = hextob64u(hSigValue);
        this.parsedJWS = {};
        this.parsedJWS.headB64U = sSI.split(".")[0];
        this.parsedJWS.payloadB64U = sSI.split(".")[1];
        this.parsedJWS.sigvalB64U = b64SigValue;
        return sSI + "." + b64SigValue;
    };
};

KJUR.jws.JWS.sign = function(alg, sHeader, sPayload, key, pass) {
    var ns1 = KJUR.jws.JWS;
    if (!ns1.isSafeJSONString(sHeader)) throw "JWS Head is not safe JSON string: " + sHead;
    var pHeader = ns1.readSafeJSONString(sHeader);
    if ((alg == "" || alg == null) && pHeader["alg"] !== undefined) {
        alg = pHeader["alg"];
    }
    if (alg != "" && alg != null && pHeader["alg"] === undefined) {
        pHeader["alg"] = alg;
        sHeader = JSON.stringify(pHeader);
    }
    var sigAlg = null;
    if (ns1.jwsalg2sigalg[alg] === undefined) {
        throw "unsupported alg name: " + alg;
    } else {
        sigAlg = ns1.jwsalg2sigalg[alg];
    }
    var uHeader = utf8tob64u(sHeader);
    var uPayload = utf8tob64u(sPayload);
    var uSignatureInput = uHeader + "." + uPayload;
    var hSig = "";
    if (sigAlg.substr(0, 4) == "Hmac") {
        if (key === undefined) throw "hexadecimal key shall be specified for HMAC";
        var mac = new KJUR.crypto.Mac({
            alg: sigAlg,
            pass: hextorstr(key)
        });
        mac.updateString(uSignatureInput);
        hSig = mac.doFinal();
    } else if (sigAlg.indexOf("withECDSA") != -1) {
        var sig = new KJUR.crypto.Signature({
            alg: sigAlg
        });
        sig.init(key, pass);
        sig.updateString(uSignatureInput);
        hASN1Sig = sig.sign();
        hSig = KJUR.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig);
    } else if (sigAlg != "none") {
        var sig = new KJUR.crypto.Signature({
            alg: sigAlg
        });
        sig.init(key, pass);
        sig.updateString(uSignatureInput);
        hSig = sig.sign();
    }
    var uSig = hextob64u(hSig);
    return uSignatureInput + "." + uSig;
};

KJUR.jws.JWS.verify = function(sJWS, key) {
    var jws = KJUR.jws.JWS;
    var a = sJWS.split(".");
    var uHeader = a[0];
    var uPayload = a[1];
    var uSignatureInput = uHeader + "." + uPayload;
    var hSig = b64utohex(a[2]);
    var pHeader = jws.readSafeJSONString(b64utoutf8(a[0]));
    var alg = null;
    if (pHeader.alg === undefined) {
        throw "algorithm not specified in header";
    } else {
        alg = pHeader.alg;
    }
    var sigAlg = null;
    if (jws.jwsalg2sigalg[pHeader.alg] === undefined) {
        throw "unsupported alg name: " + alg;
    } else {
        sigAlg = jws.jwsalg2sigalg[alg];
    }
    if (sigAlg == "none") {
        return true;
    } else if (sigAlg.substr(0, 4) == "Hmac") {
        if (key === undefined) throw "hexadecimal key shall be specified for HMAC";
        var mac = new KJUR.crypto.Mac({
            alg: sigAlg,
            pass: hextorstr(key)
        });
        mac.updateString(uSignatureInput);
        hSig2 = mac.doFinal();
        return hSig == hSig2;
    } else if (sigAlg.indexOf("withECDSA") != -1) {
        var hASN1Sig = null;
        try {
            hASN1Sig = KJUR.crypto.ECDSA.concatSigToASN1Sig(hSig);
        } catch (ex) {
            return false;
        }
        var sig = new KJUR.crypto.Signature({
            alg: sigAlg
        });
        sig.init(key);
        sig.updateString(uSignatureInput);
        return sig.verify(hASN1Sig);
    } else {
        var sig = new KJUR.crypto.Signature({
            alg: sigAlg
        });
        sig.init(key);
        sig.updateString(uSignatureInput);
        return sig.verify(hSig);
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

KJUR.jws.JWS.isSafeJSONString = function(s, h, p) {
    var o = null;
    try {
        o = jsonParse(s);
        if (typeof o != "object") return 0;
        if (o.constructor === Array) return 0;
        if (h) h[p] = o;
        return 1;
    } catch (ex) {
        return 0;
    }
};

KJUR.jws.JWS.readSafeJSONString = function(s) {
    var o = null;
    try {
        o = jsonParse(s);
        if (typeof o != "object") return null;
        if (o.constructor === Array) return null;
        return o;
    } catch (ex) {
        return null;
    }
};

KJUR.jws.JWS.getEncodedSignatureValueFromJWS = function(sJWS) {
    if (sJWS.match(/^[^.]+\.[^.]+\.([^.]+)$/) == null) {
        throw "JWS signature is not a form of 'Head.Payload.SigValue'.";
    }
    return RegExp.$1;
};

KJUR.jws.IntDate = function() {};

KJUR.jws.IntDate.get = function(s) {
    if (s == "now") {
        return KJUR.jws.IntDate.getNow();
    } else if (s == "now + 1hour") {
        return KJUR.jws.IntDate.getNow() + 60 * 60;
    } else if (s == "now + 1day") {
        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24;
    } else if (s == "now + 1month") {
        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 30;
    } else if (s == "now + 1year") {
        return KJUR.jws.IntDate.getNow() + 60 * 60 * 24 * 365;
    } else if (s.match(/Z$/)) {
        return KJUR.jws.IntDate.getZulu(s);
    } else if (s.match(/^[0-9]+$/)) {
        return parseInt(s);
    }
    throw "unsupported format: " + s;
};

KJUR.jws.IntDate.getZulu = function(s) {
    if (a = s.match(/(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)Z/)) {
        var year = parseInt(RegExp.$1);
        var month = parseInt(RegExp.$2) - 1;
        var day = parseInt(RegExp.$3);
        var hour = parseInt(RegExp.$4);
        var min = parseInt(RegExp.$5);
        var sec = parseInt(RegExp.$6);
        var d = new Date(Date.UTC(year, month, day, hour, min, sec));
        return ~~(d / 1e3);
    }
    throw "unsupported format: " + s;
};

KJUR.jws.IntDate.getNow = function() {
    var d = ~~(new Date() / 1e3);
    return d;
};

KJUR.jws.IntDate.intDate2UTCString = function(intDate) {
    var d = new Date(intDate * 1e3);
    return d.toUTCString();
};

KJUR.jws.IntDate.intDate2Zulu = function(intDate) {
    var d = new Date(intDate * 1e3);
    var year = ("0000" + d.getUTCFullYear()).slice(-4);
    var mon = ("00" + (d.getUTCMonth() + 1)).slice(-2);
    var day = ("00" + d.getUTCDate()).slice(-2);
    var hour = ("00" + d.getUTCHours()).slice(-2);
    var min = ("00" + d.getUTCMinutes()).slice(-2);
    var sec = ("00" + d.getUTCSeconds()).slice(-2);
    return year + mon + day + hour + min + sec + "Z";
};

CodeMirror.defineMode("jwt", function() {
    function jwtHeader(stream, state) {
        stream.eatWhile(/[^.]/);
        state.cur = firstDot;
        return "jwt-header";
    }
    function firstDot(stream, state) {
        stream.next();
        state.cur = jwtPayload;
        return "jwt-dot";
    }
    function jwtPayload(stream, state) {
        stream.eatWhile(/[^.]/);
        state.cur = secondDot;
        return "jwt-payload";
    }
    function secondDot(stream, state) {
        stream.next();
        state.cur = jwtSignature;
        return "jwt-dot";
    }
    function jwtSignature(stream) {
        stream.skipToEnd();
        return "jwt-signature";
    }
    return {
        token: function(stream, state) {
            var cur = state.cur;
            return cur(stream, state);
        },
        startState: function() {
            return {
                cur: jwtHeader
            };
        }
    };
});

function url_base64_decode(str) {
    var output = str.replace("-", "+").replace("_", "/");
    switch (output.length % 4) {
      case 0:
        break;

      case 2:
        output += "==";
        break;

      case 3:
        output += "=";
        break;

      default:
        throw "Illegal base64url string!";
    }
    return window.atob(output);
}

window.decode = function(base64json) {
    var json = null, error = null;
    try {
        json = url_base64_decode(base64json);
        json = JSON.stringify(JSON.parse(json), undefined, 2);
    } catch (e) {
        error = e;
    }
    return {
        result: json,
        error: error
    };
};

function asciiToHex(s) {
    var i = 0, hexSecret = "";
    for (i = 0; i < s.length; i++) {
        hexSecret += s.charCodeAt(i).toString(16);
    }
    return hexSecret;
}

window.sign = function(header, payload, secret) {
    var value = "", error = null, headerAsJSON, payloadAsJSON;
    try {
        headerAsJSON = JSON.stringify(JSON.parse(header));
    } catch (e) {
        error = {
            result: null,
            error: {
                cause: e,
                who: [ "header" ]
            }
        };
    }
    try {
        payloadAsJSON = JSON.stringify(JSON.parse(payload));
    } catch (e) {
        if (error) {
            error.error.who.push("payload");
        } else {
            error = {
                result: null,
                error: {
                    cause: e,
                    who: [ "payload" ]
                }
            };
        }
    }
    if (error) {
        return error;
    }
    try {
        value = KJUR.jws.JWS.sign(null, headerAsJSON, payloadAsJSON, asciiToHex(secret));
    } catch (e) {
        error = e;
    }
    return {
        result: value,
        error: error
    };
};

window.verify = function(value, secret) {
    var result = "", error = null;
    try {
        result = KJUR.jws.JWS.verify(value, asciiToHex(secret));
    } catch (e) {
        error = e;
    }
    return {
        result: result,
        error: error
    };
};

(function() {
    var $ = window.$;
    function fireEvent(element) {
        var event;
        if (document.createEvent) {
            event = document.createEvent("HTMLEvents");
            event.initEvent("change", true, true);
        } else {
            event = document.createEventObject();
            event.eventType = "change";
        }
        event.eventName = "change";
        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
            element.fireEvent("on" + event.eventType, event);
        }
    }
    var codeMirror = CodeMirror;
    function tabHack(instance) {
        instance.replaceSelection("   ", "end");
    }
    var tokenEditor = codeMirror(document.getElementsByClassName("js-input")[0], {
        mode: "jwt",
        theme: "night",
        lineWrapping: true,
        autofocus: true,
        extraKeys: {
            Tab: tabHack
        }
    });
    var headerEditor = codeMirror(document.getElementsByClassName("js-header")[0], {
        mode: "application/json",
        lineWrapping: true,
        extraKeys: {
            Tab: tabHack
        },
        lint: true
    });
    var payloadEditor = codeMirror(document.getElementsByClassName("js-payload")[0], {
        mode: "application/json",
        lineWrapping: true,
        extraKeys: {
            Tab: tabHack
        },
        lint: true
    });
    function tokenEditorOnChangeListener(instance) {
        var value = getTrimmedValue(instance);
        if (!value) {
            return;
        }
        var parts = value.split(".");
        if (parts.length !== 3) {
            return null;
        }
        var secretElement = document.getElementsByName("secret")[0];
        var signatureElement = getFirstElementByClassName("js-signature");
        if (!signatureElement) {
            return;
        }
        headerEditor.off("change", refreshTokenEditor);
        var decodedHeader = window.decode(parts[0]);
        if (decodedHeader.error) {
            headerEditor.setValue(decodedHeader.result);
            $(".jwt-header").addClass("error");
        } else {
            headerEditor.setValue(decodedHeader.result);
            $(".jwt-header").removeClass("error");
        }
        headerEditor.on("change", refreshTokenEditor);
        payloadEditor.off("change", refreshTokenEditor);
        var decodedPayload = window.decode(parts[1]);
        if (decodedPayload.error) {
            payloadEditor.setValue(decodedHeader.result);
            $(".jwt-payload").addClass("error");
        } else {
            payloadEditor.setValue(decodedPayload.result);
            $(".jwt-payload").removeClass("error");
        }
        payloadEditor.on("change", refreshTokenEditor);
        fireEvent(secretElement);
    }
    function refreshTokenEditor(instance) {
        tokenEditor.off("change", tokenEditorOnChangeListener);
        var secretElement = document.getElementsByName("secret")[0];
        var signResult = window.sign(headerEditor.getValue(), payloadEditor.getValue(), secretElement.value);
        if (signResult.error) {
            tokenEditor.setValue("");
            var elements = {
                payload: ".jwt-payload",
                header: ".jwt-header"
            };
            $(".jwt-payload").removeClass("error");
            $(".jwt-header").removeClass("error");
            if (signResult.error.who) {
                signResult.error.who.map(function(e) {
                    return elements[e];
                }).forEach(function(e) {
                    $(e).addClass("error");
                });
            }
            $(".input").addClass("error");
            tokenEditor.setValue(signResult.result);
        } else {
            tokenEditor.setValue(signResult.result);
            $(".input").removeClass("error");
            $(".jwt-payload").removeClass("error");
            $(".jwt-header").removeClass("error");
        }
        tokenEditor.on("change", tokenEditorOnChangeListener);
        fireEvent(secretElement);
    }
    function getFirstElementByClassName(selector) {
        var headerElement = document.getElementsByClassName(selector);
        return headerElement.length ? headerElement[0] : null;
    }
    function getTrimmedValue(instance) {
        var value = instance.getValue();
        if (!value) {
            return null;
        }
        return value.replace(/\s/g, "");
    }
    tokenEditor.on("change", tokenEditorOnChangeListener);
    payloadEditor.on("change", refreshTokenEditor);
    headerEditor.on("change", refreshTokenEditor);
    var secretElement = document.getElementsByName("secret")[0];
    function updateSignature() {
        var signatureElement = getFirstElementByClassName("js-signature");
        if (!signatureElement) {
            return;
        }
        var value = getTrimmedValue(tokenEditor);
        var result = window.verify(value, secretElement.value).result;
        signatureElement.innerText = result;
    }
    secretElement.addEventListener("change", updateSignature, false);
    secretElement.addEventListener("keyup", updateSignature, false);
    tokenEditor.setValue("eyJhbGciOiJIUzI1NiIsImN0eSI6IkpXVCJ9.eyJhZ2UiOjIxfQ.pLem30ReEpeXgMt6e3gjZ6QYSpLBbhd_NB-Afud1m4A");
})();