(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/olivernn/lunr.js@v2.3.9+incompatible/lunr.js
  var require_lunr = __commonJS({
    "ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/olivernn/lunr.js@v2.3.9+incompatible/lunr.js"(exports, module) {
      (function() {
        var lunr2 = function(config) {
          var builder = new lunr2.Builder();
          builder.pipeline.add(
            lunr2.trimmer,
            lunr2.stopWordFilter,
            lunr2.stemmer
          );
          builder.searchPipeline.add(
            lunr2.stemmer
          );
          config.call(builder, builder);
          return builder.build();
        };
        lunr2.version = "2.3.9";
        lunr2.utils = {};
        lunr2.utils.warn = /* @__PURE__ */ (function(global) {
          return function(message) {
            if (global.console && console.warn) {
              console.warn(message);
            }
          };
        })(this);
        lunr2.utils.asString = function(obj) {
          if (obj === void 0 || obj === null) {
            return "";
          } else {
            return obj.toString();
          }
        };
        lunr2.utils.clone = function(obj) {
          if (obj === null || obj === void 0) {
            return obj;
          }
          var clone2 = /* @__PURE__ */ Object.create(null), keys = Object.keys(obj);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i], val = obj[key];
            if (Array.isArray(val)) {
              clone2[key] = val.slice();
              continue;
            }
            if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
              clone2[key] = val;
              continue;
            }
            throw new TypeError("clone is not deep and does not support nested objects");
          }
          return clone2;
        };
        lunr2.FieldRef = function(docRef, fieldName, stringValue) {
          this.docRef = docRef;
          this.fieldName = fieldName;
          this._stringValue = stringValue;
        };
        lunr2.FieldRef.joiner = "/";
        lunr2.FieldRef.fromString = function(s) {
          var n = s.indexOf(lunr2.FieldRef.joiner);
          if (n === -1) {
            throw "malformed field ref string";
          }
          var fieldRef = s.slice(0, n), docRef = s.slice(n + 1);
          return new lunr2.FieldRef(docRef, fieldRef, s);
        };
        lunr2.FieldRef.prototype.toString = function() {
          if (this._stringValue == void 0) {
            this._stringValue = this.fieldName + lunr2.FieldRef.joiner + this.docRef;
          }
          return this._stringValue;
        };
        lunr2.Set = function(elements) {
          this.elements = /* @__PURE__ */ Object.create(null);
          if (elements) {
            this.length = elements.length;
            for (var i = 0; i < this.length; i++) {
              this.elements[elements[i]] = true;
            }
          } else {
            this.length = 0;
          }
        };
        lunr2.Set.complete = {
          intersect: function(other) {
            return other;
          },
          union: function() {
            return this;
          },
          contains: function() {
            return true;
          }
        };
        lunr2.Set.empty = {
          intersect: function() {
            return this;
          },
          union: function(other) {
            return other;
          },
          contains: function() {
            return false;
          }
        };
        lunr2.Set.prototype.contains = function(object) {
          return !!this.elements[object];
        };
        lunr2.Set.prototype.intersect = function(other) {
          var a, b, elements, intersection = [];
          if (other === lunr2.Set.complete) {
            return this;
          }
          if (other === lunr2.Set.empty) {
            return other;
          }
          if (this.length < other.length) {
            a = this;
            b = other;
          } else {
            a = other;
            b = this;
          }
          elements = Object.keys(a.elements);
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (element in b.elements) {
              intersection.push(element);
            }
          }
          return new lunr2.Set(intersection);
        };
        lunr2.Set.prototype.union = function(other) {
          if (other === lunr2.Set.complete) {
            return lunr2.Set.complete;
          }
          if (other === lunr2.Set.empty) {
            return this;
          }
          return new lunr2.Set(Object.keys(this.elements).concat(Object.keys(other.elements)));
        };
        lunr2.idf = function(posting, documentCount) {
          var documentsWithTerm = 0;
          for (var fieldName in posting) {
            if (fieldName == "_index") continue;
            documentsWithTerm += Object.keys(posting[fieldName]).length;
          }
          var x = (documentCount - documentsWithTerm + 0.5) / (documentsWithTerm + 0.5);
          return Math.log(1 + Math.abs(x));
        };
        lunr2.Token = function(str, metadata) {
          this.str = str || "";
          this.metadata = metadata || {};
        };
        lunr2.Token.prototype.toString = function() {
          return this.str;
        };
        lunr2.Token.prototype.update = function(fn) {
          this.str = fn(this.str, this.metadata);
          return this;
        };
        lunr2.Token.prototype.clone = function(fn) {
          fn = fn || function(s) {
            return s;
          };
          return new lunr2.Token(fn(this.str, this.metadata), this.metadata);
        };
        lunr2.tokenizer = function(obj, metadata) {
          if (obj == null || obj == void 0) {
            return [];
          }
          if (Array.isArray(obj)) {
            return obj.map(function(t) {
              return new lunr2.Token(
                lunr2.utils.asString(t).toLowerCase(),
                lunr2.utils.clone(metadata)
              );
            });
          }
          var str = obj.toString().toLowerCase(), len = str.length, tokens = [];
          for (var sliceEnd = 0, sliceStart = 0; sliceEnd <= len; sliceEnd++) {
            var char = str.charAt(sliceEnd), sliceLength = sliceEnd - sliceStart;
            if (char.match(lunr2.tokenizer.separator) || sliceEnd == len) {
              if (sliceLength > 0) {
                var tokenMetadata = lunr2.utils.clone(metadata) || {};
                tokenMetadata["position"] = [sliceStart, sliceLength];
                tokenMetadata["index"] = tokens.length;
                tokens.push(
                  new lunr2.Token(
                    str.slice(sliceStart, sliceEnd),
                    tokenMetadata
                  )
                );
              }
              sliceStart = sliceEnd + 1;
            }
          }
          return tokens;
        };
        lunr2.tokenizer.separator = /[\s\-]+/;
        lunr2.Pipeline = function() {
          this._stack = [];
        };
        lunr2.Pipeline.registeredFunctions = /* @__PURE__ */ Object.create(null);
        lunr2.Pipeline.registerFunction = function(fn, label) {
          if (label in this.registeredFunctions) {
            lunr2.utils.warn("Overwriting existing registered function: " + label);
          }
          fn.label = label;
          lunr2.Pipeline.registeredFunctions[fn.label] = fn;
        };
        lunr2.Pipeline.warnIfFunctionNotRegistered = function(fn) {
          var isRegistered = fn.label && fn.label in this.registeredFunctions;
          if (!isRegistered) {
            lunr2.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n", fn);
          }
        };
        lunr2.Pipeline.load = function(serialised) {
          var pipeline = new lunr2.Pipeline();
          serialised.forEach(function(fnName) {
            var fn = lunr2.Pipeline.registeredFunctions[fnName];
            if (fn) {
              pipeline.add(fn);
            } else {
              throw new Error("Cannot load unregistered function: " + fnName);
            }
          });
          return pipeline;
        };
        lunr2.Pipeline.prototype.add = function() {
          var fns = Array.prototype.slice.call(arguments);
          fns.forEach(function(fn) {
            lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
            this._stack.push(fn);
          }, this);
        };
        lunr2.Pipeline.prototype.after = function(existingFn, newFn) {
          lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          pos = pos + 1;
          this._stack.splice(pos, 0, newFn);
        };
        lunr2.Pipeline.prototype.before = function(existingFn, newFn) {
          lunr2.Pipeline.warnIfFunctionNotRegistered(newFn);
          var pos = this._stack.indexOf(existingFn);
          if (pos == -1) {
            throw new Error("Cannot find existingFn");
          }
          this._stack.splice(pos, 0, newFn);
        };
        lunr2.Pipeline.prototype.remove = function(fn) {
          var pos = this._stack.indexOf(fn);
          if (pos == -1) {
            return;
          }
          this._stack.splice(pos, 1);
        };
        lunr2.Pipeline.prototype.run = function(tokens) {
          var stackLength = this._stack.length;
          for (var i = 0; i < stackLength; i++) {
            var fn = this._stack[i];
            var memo = [];
            for (var j = 0; j < tokens.length; j++) {
              var result = fn(tokens[j], j, tokens);
              if (result === null || result === void 0 || result === "") continue;
              if (Array.isArray(result)) {
                for (var k = 0; k < result.length; k++) {
                  memo.push(result[k]);
                }
              } else {
                memo.push(result);
              }
            }
            tokens = memo;
          }
          return tokens;
        };
        lunr2.Pipeline.prototype.runString = function(str, metadata) {
          var token = new lunr2.Token(str, metadata);
          return this.run([token]).map(function(t) {
            return t.toString();
          });
        };
        lunr2.Pipeline.prototype.reset = function() {
          this._stack = [];
        };
        lunr2.Pipeline.prototype.toJSON = function() {
          return this._stack.map(function(fn) {
            lunr2.Pipeline.warnIfFunctionNotRegistered(fn);
            return fn.label;
          });
        };
        lunr2.Vector = function(elements) {
          this._magnitude = 0;
          this.elements = elements || [];
        };
        lunr2.Vector.prototype.positionForIndex = function(index) {
          if (this.elements.length == 0) {
            return 0;
          }
          var start2 = 0, end = this.elements.length / 2, sliceLength = end - start2, pivotPoint = Math.floor(sliceLength / 2), pivotIndex = this.elements[pivotPoint * 2];
          while (sliceLength > 1) {
            if (pivotIndex < index) {
              start2 = pivotPoint;
            }
            if (pivotIndex > index) {
              end = pivotPoint;
            }
            if (pivotIndex == index) {
              break;
            }
            sliceLength = end - start2;
            pivotPoint = start2 + Math.floor(sliceLength / 2);
            pivotIndex = this.elements[pivotPoint * 2];
          }
          if (pivotIndex == index) {
            return pivotPoint * 2;
          }
          if (pivotIndex > index) {
            return pivotPoint * 2;
          }
          if (pivotIndex < index) {
            return (pivotPoint + 1) * 2;
          }
        };
        lunr2.Vector.prototype.insert = function(insertIdx, val) {
          this.upsert(insertIdx, val, function() {
            throw "duplicate index";
          });
        };
        lunr2.Vector.prototype.upsert = function(insertIdx, val, fn) {
          this._magnitude = 0;
          var position = this.positionForIndex(insertIdx);
          if (this.elements[position] == insertIdx) {
            this.elements[position + 1] = fn(this.elements[position + 1], val);
          } else {
            this.elements.splice(position, 0, insertIdx, val);
          }
        };
        lunr2.Vector.prototype.magnitude = function() {
          if (this._magnitude) return this._magnitude;
          var sumOfSquares = 0, elementsLength = this.elements.length;
          for (var i = 1; i < elementsLength; i += 2) {
            var val = this.elements[i];
            sumOfSquares += val * val;
          }
          return this._magnitude = Math.sqrt(sumOfSquares);
        };
        lunr2.Vector.prototype.dot = function(otherVector) {
          var dotProduct = 0, a = this.elements, b = otherVector.elements, aLen = a.length, bLen = b.length, aVal = 0, bVal = 0, i = 0, j = 0;
          while (i < aLen && j < bLen) {
            aVal = a[i], bVal = b[j];
            if (aVal < bVal) {
              i += 2;
            } else if (aVal > bVal) {
              j += 2;
            } else if (aVal == bVal) {
              dotProduct += a[i + 1] * b[j + 1];
              i += 2;
              j += 2;
            }
          }
          return dotProduct;
        };
        lunr2.Vector.prototype.similarity = function(otherVector) {
          return this.dot(otherVector) / this.magnitude() || 0;
        };
        lunr2.Vector.prototype.toArray = function() {
          var output = new Array(this.elements.length / 2);
          for (var i = 1, j = 0; i < this.elements.length; i += 2, j++) {
            output[j] = this.elements[i];
          }
          return output;
        };
        lunr2.Vector.prototype.toJSON = function() {
          return this.elements;
        };
        lunr2.stemmer = (function() {
          var step2list = {
            "ational": "ate",
            "tional": "tion",
            "enci": "ence",
            "anci": "ance",
            "izer": "ize",
            "bli": "ble",
            "alli": "al",
            "entli": "ent",
            "eli": "e",
            "ousli": "ous",
            "ization": "ize",
            "ation": "ate",
            "ator": "ate",
            "alism": "al",
            "iveness": "ive",
            "fulness": "ful",
            "ousness": "ous",
            "aliti": "al",
            "iviti": "ive",
            "biliti": "ble",
            "logi": "log"
          }, step3list = {
            "icate": "ic",
            "ative": "",
            "alize": "al",
            "iciti": "ic",
            "ical": "ic",
            "ful": "",
            "ness": ""
          }, c = "[^aeiou]", v = "[aeiouy]", C = c + "[^aeiouy]*", V = v + "[aeiou]*", mgr0 = "^(" + C + ")?" + V + C, meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$", mgr1 = "^(" + C + ")?" + V + C + V + C, s_v = "^(" + C + ")?" + v;
          var re_mgr0 = new RegExp(mgr0);
          var re_mgr1 = new RegExp(mgr1);
          var re_meq1 = new RegExp(meq1);
          var re_s_v = new RegExp(s_v);
          var re_1a = /^(.+?)(ss|i)es$/;
          var re2_1a = /^(.+?)([^s])s$/;
          var re_1b = /^(.+?)eed$/;
          var re2_1b = /^(.+?)(ed|ing)$/;
          var re_1b_2 = /.$/;
          var re2_1b_2 = /(at|bl|iz)$/;
          var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
          var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");
          var re_1c = /^(.+?[^aeiou])y$/;
          var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
          var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
          var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
          var re2_4 = /^(.+?)(s|t)(ion)$/;
          var re_5 = /^(.+?)e$/;
          var re_5_1 = /ll$/;
          var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");
          var porterStemmer = function porterStemmer2(w) {
            var stem, suffix, firstch, re, re2, re3, re4;
            if (w.length < 3) {
              return w;
            }
            firstch = w.substr(0, 1);
            if (firstch == "y") {
              w = firstch.toUpperCase() + w.substr(1);
            }
            re = re_1a;
            re2 = re2_1a;
            if (re.test(w)) {
              w = w.replace(re, "$1$2");
            } else if (re2.test(w)) {
              w = w.replace(re2, "$1$2");
            }
            re = re_1b;
            re2 = re2_1b;
            if (re.test(w)) {
              var fp = re.exec(w);
              re = re_mgr0;
              if (re.test(fp[1])) {
                re = re_1b_2;
                w = w.replace(re, "");
              }
            } else if (re2.test(w)) {
              var fp = re2.exec(w);
              stem = fp[1];
              re2 = re_s_v;
              if (re2.test(stem)) {
                w = stem;
                re2 = re2_1b_2;
                re3 = re3_1b_2;
                re4 = re4_1b_2;
                if (re2.test(w)) {
                  w = w + "e";
                } else if (re3.test(w)) {
                  re = re_1b_2;
                  w = w.replace(re, "");
                } else if (re4.test(w)) {
                  w = w + "e";
                }
              }
            }
            re = re_1c;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              w = stem + "i";
            }
            re = re_2;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              suffix = fp[2];
              re = re_mgr0;
              if (re.test(stem)) {
                w = stem + step2list[suffix];
              }
            }
            re = re_3;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              suffix = fp[2];
              re = re_mgr0;
              if (re.test(stem)) {
                w = stem + step3list[suffix];
              }
            }
            re = re_4;
            re2 = re2_4;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              re = re_mgr1;
              if (re.test(stem)) {
                w = stem;
              }
            } else if (re2.test(w)) {
              var fp = re2.exec(w);
              stem = fp[1] + fp[2];
              re2 = re_mgr1;
              if (re2.test(stem)) {
                w = stem;
              }
            }
            re = re_5;
            if (re.test(w)) {
              var fp = re.exec(w);
              stem = fp[1];
              re = re_mgr1;
              re2 = re_meq1;
              re3 = re3_5;
              if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
                w = stem;
              }
            }
            re = re_5_1;
            re2 = re_mgr1;
            if (re.test(w) && re2.test(w)) {
              re = re_1b_2;
              w = w.replace(re, "");
            }
            if (firstch == "y") {
              w = firstch.toLowerCase() + w.substr(1);
            }
            return w;
          };
          return function(token) {
            return token.update(porterStemmer);
          };
        })();
        lunr2.Pipeline.registerFunction(lunr2.stemmer, "stemmer");
        lunr2.generateStopWordFilter = function(stopWords) {
          var words = stopWords.reduce(function(memo, stopWord) {
            memo[stopWord] = stopWord;
            return memo;
          }, {});
          return function(token) {
            if (token && words[token.toString()] !== token.toString()) return token;
          };
        };
        lunr2.stopWordFilter = lunr2.generateStopWordFilter([
          "a",
          "able",
          "about",
          "across",
          "after",
          "all",
          "almost",
          "also",
          "am",
          "among",
          "an",
          "and",
          "any",
          "are",
          "as",
          "at",
          "be",
          "because",
          "been",
          "but",
          "by",
          "can",
          "cannot",
          "could",
          "dear",
          "did",
          "do",
          "does",
          "either",
          "else",
          "ever",
          "every",
          "for",
          "from",
          "get",
          "got",
          "had",
          "has",
          "have",
          "he",
          "her",
          "hers",
          "him",
          "his",
          "how",
          "however",
          "i",
          "if",
          "in",
          "into",
          "is",
          "it",
          "its",
          "just",
          "least",
          "let",
          "like",
          "likely",
          "may",
          "me",
          "might",
          "most",
          "must",
          "my",
          "neither",
          "no",
          "nor",
          "not",
          "of",
          "off",
          "often",
          "on",
          "only",
          "or",
          "other",
          "our",
          "own",
          "rather",
          "said",
          "say",
          "says",
          "she",
          "should",
          "since",
          "so",
          "some",
          "than",
          "that",
          "the",
          "their",
          "them",
          "then",
          "there",
          "these",
          "they",
          "this",
          "tis",
          "to",
          "too",
          "twas",
          "us",
          "wants",
          "was",
          "we",
          "were",
          "what",
          "when",
          "where",
          "which",
          "while",
          "who",
          "whom",
          "why",
          "will",
          "with",
          "would",
          "yet",
          "you",
          "your"
        ]);
        lunr2.Pipeline.registerFunction(lunr2.stopWordFilter, "stopWordFilter");
        lunr2.trimmer = function(token) {
          return token.update(function(s) {
            return s.replace(/^\W+/, "").replace(/\W+$/, "");
          });
        };
        lunr2.Pipeline.registerFunction(lunr2.trimmer, "trimmer");
        lunr2.TokenSet = function() {
          this.final = false;
          this.edges = {};
          this.id = lunr2.TokenSet._nextId;
          lunr2.TokenSet._nextId += 1;
        };
        lunr2.TokenSet._nextId = 1;
        lunr2.TokenSet.fromArray = function(arr) {
          var builder = new lunr2.TokenSet.Builder();
          for (var i = 0, len = arr.length; i < len; i++) {
            builder.insert(arr[i]);
          }
          builder.finish();
          return builder.root;
        };
        lunr2.TokenSet.fromClause = function(clause) {
          if ("editDistance" in clause) {
            return lunr2.TokenSet.fromFuzzyString(clause.term, clause.editDistance);
          } else {
            return lunr2.TokenSet.fromString(clause.term);
          }
        };
        lunr2.TokenSet.fromFuzzyString = function(str, editDistance) {
          var root = new lunr2.TokenSet();
          var stack = [{
            node: root,
            editsRemaining: editDistance,
            str
          }];
          while (stack.length) {
            var frame = stack.pop();
            if (frame.str.length > 0) {
              var char = frame.str.charAt(0), noEditNode;
              if (char in frame.node.edges) {
                noEditNode = frame.node.edges[char];
              } else {
                noEditNode = new lunr2.TokenSet();
                frame.node.edges[char] = noEditNode;
              }
              if (frame.str.length == 1) {
                noEditNode.final = true;
              }
              stack.push({
                node: noEditNode,
                editsRemaining: frame.editsRemaining,
                str: frame.str.slice(1)
              });
            }
            if (frame.editsRemaining == 0) {
              continue;
            }
            if ("*" in frame.node.edges) {
              var insertionNode = frame.node.edges["*"];
            } else {
              var insertionNode = new lunr2.TokenSet();
              frame.node.edges["*"] = insertionNode;
            }
            if (frame.str.length == 0) {
              insertionNode.final = true;
            }
            stack.push({
              node: insertionNode,
              editsRemaining: frame.editsRemaining - 1,
              str: frame.str
            });
            if (frame.str.length > 1) {
              stack.push({
                node: frame.node,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length == 1) {
              frame.node.final = true;
            }
            if (frame.str.length >= 1) {
              if ("*" in frame.node.edges) {
                var substitutionNode = frame.node.edges["*"];
              } else {
                var substitutionNode = new lunr2.TokenSet();
                frame.node.edges["*"] = substitutionNode;
              }
              if (frame.str.length == 1) {
                substitutionNode.final = true;
              }
              stack.push({
                node: substitutionNode,
                editsRemaining: frame.editsRemaining - 1,
                str: frame.str.slice(1)
              });
            }
            if (frame.str.length > 1) {
              var charA = frame.str.charAt(0), charB = frame.str.charAt(1), transposeNode;
              if (charB in frame.node.edges) {
                transposeNode = frame.node.edges[charB];
              } else {
                transposeNode = new lunr2.TokenSet();
                frame.node.edges[charB] = transposeNode;
              }
              if (frame.str.length == 1) {
                transposeNode.final = true;
              }
              stack.push({
                node: transposeNode,
                editsRemaining: frame.editsRemaining - 1,
                str: charA + frame.str.slice(2)
              });
            }
          }
          return root;
        };
        lunr2.TokenSet.fromString = function(str) {
          var node = new lunr2.TokenSet(), root = node;
          for (var i = 0, len = str.length; i < len; i++) {
            var char = str[i], final = i == len - 1;
            if (char == "*") {
              node.edges[char] = node;
              node.final = final;
            } else {
              var next = new lunr2.TokenSet();
              next.final = final;
              node.edges[char] = next;
              node = next;
            }
          }
          return root;
        };
        lunr2.TokenSet.prototype.toArray = function() {
          var words = [];
          var stack = [{
            prefix: "",
            node: this
          }];
          while (stack.length) {
            var frame = stack.pop(), edges = Object.keys(frame.node.edges), len = edges.length;
            if (frame.node.final) {
              frame.prefix.charAt(0);
              words.push(frame.prefix);
            }
            for (var i = 0; i < len; i++) {
              var edge = edges[i];
              stack.push({
                prefix: frame.prefix.concat(edge),
                node: frame.node.edges[edge]
              });
            }
          }
          return words;
        };
        lunr2.TokenSet.prototype.toString = function() {
          if (this._str) {
            return this._str;
          }
          var str = this.final ? "1" : "0", labels = Object.keys(this.edges).sort(), len = labels.length;
          for (var i = 0; i < len; i++) {
            var label = labels[i], node = this.edges[label];
            str = str + label + node.id;
          }
          return str;
        };
        lunr2.TokenSet.prototype.intersect = function(b) {
          var output = new lunr2.TokenSet(), frame = void 0;
          var stack = [{
            qNode: b,
            output,
            node: this
          }];
          while (stack.length) {
            frame = stack.pop();
            var qEdges = Object.keys(frame.qNode.edges), qLen = qEdges.length, nEdges = Object.keys(frame.node.edges), nLen = nEdges.length;
            for (var q = 0; q < qLen; q++) {
              var qEdge = qEdges[q];
              for (var n = 0; n < nLen; n++) {
                var nEdge = nEdges[n];
                if (nEdge == qEdge || qEdge == "*") {
                  var node = frame.node.edges[nEdge], qNode = frame.qNode.edges[qEdge], final = node.final && qNode.final, next = void 0;
                  if (nEdge in frame.output.edges) {
                    next = frame.output.edges[nEdge];
                    next.final = next.final || final;
                  } else {
                    next = new lunr2.TokenSet();
                    next.final = final;
                    frame.output.edges[nEdge] = next;
                  }
                  stack.push({
                    qNode,
                    output: next,
                    node
                  });
                }
              }
            }
          }
          return output;
        };
        lunr2.TokenSet.Builder = function() {
          this.previousWord = "";
          this.root = new lunr2.TokenSet();
          this.uncheckedNodes = [];
          this.minimizedNodes = {};
        };
        lunr2.TokenSet.Builder.prototype.insert = function(word) {
          var node, commonPrefix = 0;
          if (word < this.previousWord) {
            throw new Error("Out of order word insertion");
          }
          for (var i = 0; i < word.length && i < this.previousWord.length; i++) {
            if (word[i] != this.previousWord[i]) break;
            commonPrefix++;
          }
          this.minimize(commonPrefix);
          if (this.uncheckedNodes.length == 0) {
            node = this.root;
          } else {
            node = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
          }
          for (var i = commonPrefix; i < word.length; i++) {
            var nextNode = new lunr2.TokenSet(), char = word[i];
            node.edges[char] = nextNode;
            this.uncheckedNodes.push({
              parent: node,
              char,
              child: nextNode
            });
            node = nextNode;
          }
          node.final = true;
          this.previousWord = word;
        };
        lunr2.TokenSet.Builder.prototype.finish = function() {
          this.minimize(0);
        };
        lunr2.TokenSet.Builder.prototype.minimize = function(downTo) {
          for (var i = this.uncheckedNodes.length - 1; i >= downTo; i--) {
            var node = this.uncheckedNodes[i], childKey = node.child.toString();
            if (childKey in this.minimizedNodes) {
              node.parent.edges[node.char] = this.minimizedNodes[childKey];
            } else {
              node.child._str = childKey;
              this.minimizedNodes[childKey] = node.child;
            }
            this.uncheckedNodes.pop();
          }
        };
        lunr2.Index = function(attrs) {
          this.invertedIndex = attrs.invertedIndex;
          this.fieldVectors = attrs.fieldVectors;
          this.tokenSet = attrs.tokenSet;
          this.fields = attrs.fields;
          this.pipeline = attrs.pipeline;
        };
        lunr2.Index.prototype.search = function(queryString) {
          return this.query(function(query) {
            var parser = new lunr2.QueryParser(queryString, query);
            parser.parse();
          });
        };
        lunr2.Index.prototype.query = function(fn) {
          var query = new lunr2.Query(this.fields), matchingFields = /* @__PURE__ */ Object.create(null), queryVectors = /* @__PURE__ */ Object.create(null), termFieldCache = /* @__PURE__ */ Object.create(null), requiredMatches = /* @__PURE__ */ Object.create(null), prohibitedMatches = /* @__PURE__ */ Object.create(null);
          for (var i = 0; i < this.fields.length; i++) {
            queryVectors[this.fields[i]] = new lunr2.Vector();
          }
          fn.call(query, query);
          for (var i = 0; i < query.clauses.length; i++) {
            var clause = query.clauses[i], terms = null, clauseMatches = lunr2.Set.empty;
            if (clause.usePipeline) {
              terms = this.pipeline.runString(clause.term, {
                fields: clause.fields
              });
            } else {
              terms = [clause.term];
            }
            for (var m = 0; m < terms.length; m++) {
              var term = terms[m];
              clause.term = term;
              var termTokenSet = lunr2.TokenSet.fromClause(clause), expandedTerms = this.tokenSet.intersect(termTokenSet).toArray();
              if (expandedTerms.length === 0 && clause.presence === lunr2.Query.presence.REQUIRED) {
                for (var k = 0; k < clause.fields.length; k++) {
                  var field = clause.fields[k];
                  requiredMatches[field] = lunr2.Set.empty;
                }
                break;
              }
              for (var j = 0; j < expandedTerms.length; j++) {
                var expandedTerm = expandedTerms[j], posting = this.invertedIndex[expandedTerm], termIndex = posting._index;
                for (var k = 0; k < clause.fields.length; k++) {
                  var field = clause.fields[k], fieldPosting = posting[field], matchingDocumentRefs = Object.keys(fieldPosting), termField = expandedTerm + "/" + field, matchingDocumentsSet = new lunr2.Set(matchingDocumentRefs);
                  if (clause.presence == lunr2.Query.presence.REQUIRED) {
                    clauseMatches = clauseMatches.union(matchingDocumentsSet);
                    if (requiredMatches[field] === void 0) {
                      requiredMatches[field] = lunr2.Set.complete;
                    }
                  }
                  if (clause.presence == lunr2.Query.presence.PROHIBITED) {
                    if (prohibitedMatches[field] === void 0) {
                      prohibitedMatches[field] = lunr2.Set.empty;
                    }
                    prohibitedMatches[field] = prohibitedMatches[field].union(matchingDocumentsSet);
                    continue;
                  }
                  queryVectors[field].upsert(termIndex, clause.boost, function(a, b) {
                    return a + b;
                  });
                  if (termFieldCache[termField]) {
                    continue;
                  }
                  for (var l = 0; l < matchingDocumentRefs.length; l++) {
                    var matchingDocumentRef = matchingDocumentRefs[l], matchingFieldRef = new lunr2.FieldRef(matchingDocumentRef, field), metadata = fieldPosting[matchingDocumentRef], fieldMatch;
                    if ((fieldMatch = matchingFields[matchingFieldRef]) === void 0) {
                      matchingFields[matchingFieldRef] = new lunr2.MatchData(expandedTerm, field, metadata);
                    } else {
                      fieldMatch.add(expandedTerm, field, metadata);
                    }
                  }
                  termFieldCache[termField] = true;
                }
              }
            }
            if (clause.presence === lunr2.Query.presence.REQUIRED) {
              for (var k = 0; k < clause.fields.length; k++) {
                var field = clause.fields[k];
                requiredMatches[field] = requiredMatches[field].intersect(clauseMatches);
              }
            }
          }
          var allRequiredMatches = lunr2.Set.complete, allProhibitedMatches = lunr2.Set.empty;
          for (var i = 0; i < this.fields.length; i++) {
            var field = this.fields[i];
            if (requiredMatches[field]) {
              allRequiredMatches = allRequiredMatches.intersect(requiredMatches[field]);
            }
            if (prohibitedMatches[field]) {
              allProhibitedMatches = allProhibitedMatches.union(prohibitedMatches[field]);
            }
          }
          var matchingFieldRefs = Object.keys(matchingFields), results = [], matches = /* @__PURE__ */ Object.create(null);
          if (query.isNegated()) {
            matchingFieldRefs = Object.keys(this.fieldVectors);
            for (var i = 0; i < matchingFieldRefs.length; i++) {
              var matchingFieldRef = matchingFieldRefs[i];
              var fieldRef = lunr2.FieldRef.fromString(matchingFieldRef);
              matchingFields[matchingFieldRef] = new lunr2.MatchData();
            }
          }
          for (var i = 0; i < matchingFieldRefs.length; i++) {
            var fieldRef = lunr2.FieldRef.fromString(matchingFieldRefs[i]), docRef = fieldRef.docRef;
            if (!allRequiredMatches.contains(docRef)) {
              continue;
            }
            if (allProhibitedMatches.contains(docRef)) {
              continue;
            }
            var fieldVector = this.fieldVectors[fieldRef], score = queryVectors[fieldRef.fieldName].similarity(fieldVector), docMatch;
            if ((docMatch = matches[docRef]) !== void 0) {
              docMatch.score += score;
              docMatch.matchData.combine(matchingFields[fieldRef]);
            } else {
              var match = {
                ref: docRef,
                score,
                matchData: matchingFields[fieldRef]
              };
              matches[docRef] = match;
              results.push(match);
            }
          }
          return results.sort(function(a, b) {
            return b.score - a.score;
          });
        };
        lunr2.Index.prototype.toJSON = function() {
          var invertedIndex = Object.keys(this.invertedIndex).sort().map(function(term) {
            return [term, this.invertedIndex[term]];
          }, this);
          var fieldVectors = Object.keys(this.fieldVectors).map(function(ref) {
            return [ref, this.fieldVectors[ref].toJSON()];
          }, this);
          return {
            version: lunr2.version,
            fields: this.fields,
            fieldVectors,
            invertedIndex,
            pipeline: this.pipeline.toJSON()
          };
        };
        lunr2.Index.load = function(serializedIndex) {
          var attrs = {}, fieldVectors = {}, serializedVectors = serializedIndex.fieldVectors, invertedIndex = /* @__PURE__ */ Object.create(null), serializedInvertedIndex = serializedIndex.invertedIndex, tokenSetBuilder = new lunr2.TokenSet.Builder(), pipeline = lunr2.Pipeline.load(serializedIndex.pipeline);
          if (serializedIndex.version != lunr2.version) {
            lunr2.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + lunr2.version + "' does not match serialized index '" + serializedIndex.version + "'");
          }
          for (var i = 0; i < serializedVectors.length; i++) {
            var tuple = serializedVectors[i], ref = tuple[0], elements = tuple[1];
            fieldVectors[ref] = new lunr2.Vector(elements);
          }
          for (var i = 0; i < serializedInvertedIndex.length; i++) {
            var tuple = serializedInvertedIndex[i], term = tuple[0], posting = tuple[1];
            tokenSetBuilder.insert(term);
            invertedIndex[term] = posting;
          }
          tokenSetBuilder.finish();
          attrs.fields = serializedIndex.fields;
          attrs.fieldVectors = fieldVectors;
          attrs.invertedIndex = invertedIndex;
          attrs.tokenSet = tokenSetBuilder.root;
          attrs.pipeline = pipeline;
          return new lunr2.Index(attrs);
        };
        lunr2.Builder = function() {
          this._ref = "id";
          this._fields = /* @__PURE__ */ Object.create(null);
          this._documents = /* @__PURE__ */ Object.create(null);
          this.invertedIndex = /* @__PURE__ */ Object.create(null);
          this.fieldTermFrequencies = {};
          this.fieldLengths = {};
          this.tokenizer = lunr2.tokenizer;
          this.pipeline = new lunr2.Pipeline();
          this.searchPipeline = new lunr2.Pipeline();
          this.documentCount = 0;
          this._b = 0.75;
          this._k1 = 1.2;
          this.termIndex = 0;
          this.metadataWhitelist = [];
        };
        lunr2.Builder.prototype.ref = function(ref) {
          this._ref = ref;
        };
        lunr2.Builder.prototype.field = function(fieldName, attributes) {
          if (/\//.test(fieldName)) {
            throw new RangeError("Field '" + fieldName + "' contains illegal character '/'");
          }
          this._fields[fieldName] = attributes || {};
        };
        lunr2.Builder.prototype.b = function(number) {
          if (number < 0) {
            this._b = 0;
          } else if (number > 1) {
            this._b = 1;
          } else {
            this._b = number;
          }
        };
        lunr2.Builder.prototype.k1 = function(number) {
          this._k1 = number;
        };
        lunr2.Builder.prototype.add = function(doc, attributes) {
          var docRef = doc[this._ref], fields = Object.keys(this._fields);
          this._documents[docRef] = attributes || {};
          this.documentCount += 1;
          for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i], extractor = this._fields[fieldName].extractor, field = extractor ? extractor(doc) : doc[fieldName], tokens = this.tokenizer(field, {
              fields: [fieldName]
            }), terms = this.pipeline.run(tokens), fieldRef = new lunr2.FieldRef(docRef, fieldName), fieldTerms = /* @__PURE__ */ Object.create(null);
            this.fieldTermFrequencies[fieldRef] = fieldTerms;
            this.fieldLengths[fieldRef] = 0;
            this.fieldLengths[fieldRef] += terms.length;
            for (var j = 0; j < terms.length; j++) {
              var term = terms[j];
              if (fieldTerms[term] == void 0) {
                fieldTerms[term] = 0;
              }
              fieldTerms[term] += 1;
              if (this.invertedIndex[term] == void 0) {
                var posting = /* @__PURE__ */ Object.create(null);
                posting["_index"] = this.termIndex;
                this.termIndex += 1;
                for (var k = 0; k < fields.length; k++) {
                  posting[fields[k]] = /* @__PURE__ */ Object.create(null);
                }
                this.invertedIndex[term] = posting;
              }
              if (this.invertedIndex[term][fieldName][docRef] == void 0) {
                this.invertedIndex[term][fieldName][docRef] = /* @__PURE__ */ Object.create(null);
              }
              for (var l = 0; l < this.metadataWhitelist.length; l++) {
                var metadataKey = this.metadataWhitelist[l], metadata = term.metadata[metadataKey];
                if (this.invertedIndex[term][fieldName][docRef][metadataKey] == void 0) {
                  this.invertedIndex[term][fieldName][docRef][metadataKey] = [];
                }
                this.invertedIndex[term][fieldName][docRef][metadataKey].push(metadata);
              }
            }
          }
        };
        lunr2.Builder.prototype.calculateAverageFieldLengths = function() {
          var fieldRefs = Object.keys(this.fieldLengths), numberOfFields = fieldRefs.length, accumulator = {}, documentsWithField = {};
          for (var i = 0; i < numberOfFields; i++) {
            var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), field = fieldRef.fieldName;
            documentsWithField[field] || (documentsWithField[field] = 0);
            documentsWithField[field] += 1;
            accumulator[field] || (accumulator[field] = 0);
            accumulator[field] += this.fieldLengths[fieldRef];
          }
          var fields = Object.keys(this._fields);
          for (var i = 0; i < fields.length; i++) {
            var fieldName = fields[i];
            accumulator[fieldName] = accumulator[fieldName] / documentsWithField[fieldName];
          }
          this.averageFieldLength = accumulator;
        };
        lunr2.Builder.prototype.createFieldVectors = function() {
          var fieldVectors = {}, fieldRefs = Object.keys(this.fieldTermFrequencies), fieldRefsLength = fieldRefs.length, termIdfCache = /* @__PURE__ */ Object.create(null);
          for (var i = 0; i < fieldRefsLength; i++) {
            var fieldRef = lunr2.FieldRef.fromString(fieldRefs[i]), fieldName = fieldRef.fieldName, fieldLength = this.fieldLengths[fieldRef], fieldVector = new lunr2.Vector(), termFrequencies = this.fieldTermFrequencies[fieldRef], terms = Object.keys(termFrequencies), termsLength = terms.length;
            var fieldBoost = this._fields[fieldName].boost || 1, docBoost = this._documents[fieldRef.docRef].boost || 1;
            for (var j = 0; j < termsLength; j++) {
              var term = terms[j], tf = termFrequencies[term], termIndex = this.invertedIndex[term]._index, idf, score, scoreWithPrecision;
              if (termIdfCache[term] === void 0) {
                idf = lunr2.idf(this.invertedIndex[term], this.documentCount);
                termIdfCache[term] = idf;
              } else {
                idf = termIdfCache[term];
              }
              score = idf * ((this._k1 + 1) * tf) / (this._k1 * (1 - this._b + this._b * (fieldLength / this.averageFieldLength[fieldName])) + tf);
              score *= fieldBoost;
              score *= docBoost;
              scoreWithPrecision = Math.round(score * 1e3) / 1e3;
              fieldVector.insert(termIndex, scoreWithPrecision);
            }
            fieldVectors[fieldRef] = fieldVector;
          }
          this.fieldVectors = fieldVectors;
        };
        lunr2.Builder.prototype.createTokenSet = function() {
          this.tokenSet = lunr2.TokenSet.fromArray(
            Object.keys(this.invertedIndex).sort()
          );
        };
        lunr2.Builder.prototype.build = function() {
          this.calculateAverageFieldLengths();
          this.createFieldVectors();
          this.createTokenSet();
          return new lunr2.Index({
            invertedIndex: this.invertedIndex,
            fieldVectors: this.fieldVectors,
            tokenSet: this.tokenSet,
            fields: Object.keys(this._fields),
            pipeline: this.searchPipeline
          });
        };
        lunr2.Builder.prototype.use = function(fn) {
          var args = Array.prototype.slice.call(arguments, 1);
          args.unshift(this);
          fn.apply(this, args);
        };
        lunr2.MatchData = function(term, field, metadata) {
          var clonedMetadata = /* @__PURE__ */ Object.create(null), metadataKeys = Object.keys(metadata || {});
          for (var i = 0; i < metadataKeys.length; i++) {
            var key = metadataKeys[i];
            clonedMetadata[key] = metadata[key].slice();
          }
          this.metadata = /* @__PURE__ */ Object.create(null);
          if (term !== void 0) {
            this.metadata[term] = /* @__PURE__ */ Object.create(null);
            this.metadata[term][field] = clonedMetadata;
          }
        };
        lunr2.MatchData.prototype.combine = function(otherMatchData) {
          var terms = Object.keys(otherMatchData.metadata);
          for (var i = 0; i < terms.length; i++) {
            var term = terms[i], fields = Object.keys(otherMatchData.metadata[term]);
            if (this.metadata[term] == void 0) {
              this.metadata[term] = /* @__PURE__ */ Object.create(null);
            }
            for (var j = 0; j < fields.length; j++) {
              var field = fields[j], keys = Object.keys(otherMatchData.metadata[term][field]);
              if (this.metadata[term][field] == void 0) {
                this.metadata[term][field] = /* @__PURE__ */ Object.create(null);
              }
              for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                if (this.metadata[term][field][key] == void 0) {
                  this.metadata[term][field][key] = otherMatchData.metadata[term][field][key];
                } else {
                  this.metadata[term][field][key] = this.metadata[term][field][key].concat(otherMatchData.metadata[term][field][key]);
                }
              }
            }
          }
        };
        lunr2.MatchData.prototype.add = function(term, field, metadata) {
          if (!(term in this.metadata)) {
            this.metadata[term] = /* @__PURE__ */ Object.create(null);
            this.metadata[term][field] = metadata;
            return;
          }
          if (!(field in this.metadata[term])) {
            this.metadata[term][field] = metadata;
            return;
          }
          var metadataKeys = Object.keys(metadata);
          for (var i = 0; i < metadataKeys.length; i++) {
            var key = metadataKeys[i];
            if (key in this.metadata[term][field]) {
              this.metadata[term][field][key] = this.metadata[term][field][key].concat(metadata[key]);
            } else {
              this.metadata[term][field][key] = metadata[key];
            }
          }
        };
        lunr2.Query = function(allFields) {
          this.clauses = [];
          this.allFields = allFields;
        };
        lunr2.Query.wildcard = new String("*");
        lunr2.Query.wildcard.NONE = 0;
        lunr2.Query.wildcard.LEADING = 1;
        lunr2.Query.wildcard.TRAILING = 2;
        lunr2.Query.presence = {
          /**
           * Term's presence in a document is optional, this is the default value.
           */
          OPTIONAL: 1,
          /**
           * Term's presence in a document is required, documents that do not contain
           * this term will not be returned.
           */
          REQUIRED: 2,
          /**
           * Term's presence in a document is prohibited, documents that do contain
           * this term will not be returned.
           */
          PROHIBITED: 3
        };
        lunr2.Query.prototype.clause = function(clause) {
          if (!("fields" in clause)) {
            clause.fields = this.allFields;
          }
          if (!("boost" in clause)) {
            clause.boost = 1;
          }
          if (!("usePipeline" in clause)) {
            clause.usePipeline = true;
          }
          if (!("wildcard" in clause)) {
            clause.wildcard = lunr2.Query.wildcard.NONE;
          }
          if (clause.wildcard & lunr2.Query.wildcard.LEADING && clause.term.charAt(0) != lunr2.Query.wildcard) {
            clause.term = "*" + clause.term;
          }
          if (clause.wildcard & lunr2.Query.wildcard.TRAILING && clause.term.slice(-1) != lunr2.Query.wildcard) {
            clause.term = "" + clause.term + "*";
          }
          if (!("presence" in clause)) {
            clause.presence = lunr2.Query.presence.OPTIONAL;
          }
          this.clauses.push(clause);
          return this;
        };
        lunr2.Query.prototype.isNegated = function() {
          for (var i = 0; i < this.clauses.length; i++) {
            if (this.clauses[i].presence != lunr2.Query.presence.PROHIBITED) {
              return false;
            }
          }
          return true;
        };
        lunr2.Query.prototype.term = function(term, options) {
          if (Array.isArray(term)) {
            term.forEach(function(t) {
              this.term(t, lunr2.utils.clone(options));
            }, this);
            return this;
          }
          var clause = options || {};
          clause.term = term.toString();
          this.clause(clause);
          return this;
        };
        lunr2.QueryParseError = function(message, start2, end) {
          this.name = "QueryParseError";
          this.message = message;
          this.start = start2;
          this.end = end;
        };
        lunr2.QueryParseError.prototype = new Error();
        lunr2.QueryLexer = function(str) {
          this.lexemes = [];
          this.str = str;
          this.length = str.length;
          this.pos = 0;
          this.start = 0;
          this.escapeCharPositions = [];
        };
        lunr2.QueryLexer.prototype.run = function() {
          var state = lunr2.QueryLexer.lexText;
          while (state) {
            state = state(this);
          }
        };
        lunr2.QueryLexer.prototype.sliceString = function() {
          var subSlices = [], sliceStart = this.start, sliceEnd = this.pos;
          for (var i = 0; i < this.escapeCharPositions.length; i++) {
            sliceEnd = this.escapeCharPositions[i];
            subSlices.push(this.str.slice(sliceStart, sliceEnd));
            sliceStart = sliceEnd + 1;
          }
          subSlices.push(this.str.slice(sliceStart, this.pos));
          this.escapeCharPositions.length = 0;
          return subSlices.join("");
        };
        lunr2.QueryLexer.prototype.emit = function(type) {
          this.lexemes.push({
            type,
            str: this.sliceString(),
            start: this.start,
            end: this.pos
          });
          this.start = this.pos;
        };
        lunr2.QueryLexer.prototype.escapeCharacter = function() {
          this.escapeCharPositions.push(this.pos - 1);
          this.pos += 1;
        };
        lunr2.QueryLexer.prototype.next = function() {
          if (this.pos >= this.length) {
            return lunr2.QueryLexer.EOS;
          }
          var char = this.str.charAt(this.pos);
          this.pos += 1;
          return char;
        };
        lunr2.QueryLexer.prototype.width = function() {
          return this.pos - this.start;
        };
        lunr2.QueryLexer.prototype.ignore = function() {
          if (this.start == this.pos) {
            this.pos += 1;
          }
          this.start = this.pos;
        };
        lunr2.QueryLexer.prototype.backup = function() {
          this.pos -= 1;
        };
        lunr2.QueryLexer.prototype.acceptDigitRun = function() {
          var char, charCode;
          do {
            char = this.next();
            charCode = char.charCodeAt(0);
          } while (charCode > 47 && charCode < 58);
          if (char != lunr2.QueryLexer.EOS) {
            this.backup();
          }
        };
        lunr2.QueryLexer.prototype.more = function() {
          return this.pos < this.length;
        };
        lunr2.QueryLexer.EOS = "EOS";
        lunr2.QueryLexer.FIELD = "FIELD";
        lunr2.QueryLexer.TERM = "TERM";
        lunr2.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE";
        lunr2.QueryLexer.BOOST = "BOOST";
        lunr2.QueryLexer.PRESENCE = "PRESENCE";
        lunr2.QueryLexer.lexField = function(lexer) {
          lexer.backup();
          lexer.emit(lunr2.QueryLexer.FIELD);
          lexer.ignore();
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexTerm = function(lexer) {
          if (lexer.width() > 1) {
            lexer.backup();
            lexer.emit(lunr2.QueryLexer.TERM);
          }
          lexer.ignore();
          if (lexer.more()) {
            return lunr2.QueryLexer.lexText;
          }
        };
        lunr2.QueryLexer.lexEditDistance = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr2.QueryLexer.EDIT_DISTANCE);
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexBoost = function(lexer) {
          lexer.ignore();
          lexer.acceptDigitRun();
          lexer.emit(lunr2.QueryLexer.BOOST);
          return lunr2.QueryLexer.lexText;
        };
        lunr2.QueryLexer.lexEOS = function(lexer) {
          if (lexer.width() > 0) {
            lexer.emit(lunr2.QueryLexer.TERM);
          }
        };
        lunr2.QueryLexer.termSeparator = lunr2.tokenizer.separator;
        lunr2.QueryLexer.lexText = function(lexer) {
          while (true) {
            var char = lexer.next();
            if (char == lunr2.QueryLexer.EOS) {
              return lunr2.QueryLexer.lexEOS;
            }
            if (char.charCodeAt(0) == 92) {
              lexer.escapeCharacter();
              continue;
            }
            if (char == ":") {
              return lunr2.QueryLexer.lexField;
            }
            if (char == "~") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr2.QueryLexer.TERM);
              }
              return lunr2.QueryLexer.lexEditDistance;
            }
            if (char == "^") {
              lexer.backup();
              if (lexer.width() > 0) {
                lexer.emit(lunr2.QueryLexer.TERM);
              }
              return lunr2.QueryLexer.lexBoost;
            }
            if (char == "+" && lexer.width() === 1) {
              lexer.emit(lunr2.QueryLexer.PRESENCE);
              return lunr2.QueryLexer.lexText;
            }
            if (char == "-" && lexer.width() === 1) {
              lexer.emit(lunr2.QueryLexer.PRESENCE);
              return lunr2.QueryLexer.lexText;
            }
            if (char.match(lunr2.QueryLexer.termSeparator)) {
              return lunr2.QueryLexer.lexTerm;
            }
          }
        };
        lunr2.QueryParser = function(str, query) {
          this.lexer = new lunr2.QueryLexer(str);
          this.query = query;
          this.currentClause = {};
          this.lexemeIdx = 0;
        };
        lunr2.QueryParser.prototype.parse = function() {
          this.lexer.run();
          this.lexemes = this.lexer.lexemes;
          var state = lunr2.QueryParser.parseClause;
          while (state) {
            state = state(this);
          }
          return this.query;
        };
        lunr2.QueryParser.prototype.peekLexeme = function() {
          return this.lexemes[this.lexemeIdx];
        };
        lunr2.QueryParser.prototype.consumeLexeme = function() {
          var lexeme = this.peekLexeme();
          this.lexemeIdx += 1;
          return lexeme;
        };
        lunr2.QueryParser.prototype.nextClause = function() {
          var completedClause = this.currentClause;
          this.query.clause(completedClause);
          this.currentClause = {};
        };
        lunr2.QueryParser.parseClause = function(parser) {
          var lexeme = parser.peekLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.type) {
            case lunr2.QueryLexer.PRESENCE:
              return lunr2.QueryParser.parsePresence;
            case lunr2.QueryLexer.FIELD:
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expected either a field or a term, found " + lexeme.type;
              if (lexeme.str.length >= 1) {
                errorMessage += " with value '" + lexeme.str + "'";
              }
              throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
        };
        lunr2.QueryParser.parsePresence = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          switch (lexeme.str) {
            case "-":
              parser.currentClause.presence = lunr2.Query.presence.PROHIBITED;
              break;
            case "+":
              parser.currentClause.presence = lunr2.Query.presence.REQUIRED;
              break;
            default:
              var errorMessage = "unrecognised presence operator'" + lexeme.str + "'";
              throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term or field, found nothing";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.FIELD:
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term or field, found '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseField = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          if (parser.query.allFields.indexOf(lexeme.str) == -1) {
            var possibleFields = parser.query.allFields.map(function(f) {
              return "'" + f + "'";
            }).join(", "), errorMessage = "unrecognised field '" + lexeme.str + "', possible fields: " + possibleFields;
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.fields = [lexeme.str];
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            var errorMessage = "expecting term, found nothing";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              return lunr2.QueryParser.parseTerm;
            default:
              var errorMessage = "expecting term, found '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseTerm = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          parser.currentClause.term = lexeme.str.toLowerCase();
          if (lexeme.str.indexOf("*") != -1) {
            parser.currentClause.usePipeline = false;
          }
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseEditDistance = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var editDistance = parseInt(lexeme.str, 10);
          if (isNaN(editDistance)) {
            var errorMessage = "edit distance must be numeric";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.editDistance = editDistance;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        lunr2.QueryParser.parseBoost = function(parser) {
          var lexeme = parser.consumeLexeme();
          if (lexeme == void 0) {
            return;
          }
          var boost = parseInt(lexeme.str, 10);
          if (isNaN(boost)) {
            var errorMessage = "boost must be numeric";
            throw new lunr2.QueryParseError(errorMessage, lexeme.start, lexeme.end);
          }
          parser.currentClause.boost = boost;
          var nextLexeme = parser.peekLexeme();
          if (nextLexeme == void 0) {
            parser.nextClause();
            return;
          }
          switch (nextLexeme.type) {
            case lunr2.QueryLexer.TERM:
              parser.nextClause();
              return lunr2.QueryParser.parseTerm;
            case lunr2.QueryLexer.FIELD:
              parser.nextClause();
              return lunr2.QueryParser.parseField;
            case lunr2.QueryLexer.EDIT_DISTANCE:
              return lunr2.QueryParser.parseEditDistance;
            case lunr2.QueryLexer.BOOST:
              return lunr2.QueryParser.parseBoost;
            case lunr2.QueryLexer.PRESENCE:
              parser.nextClause();
              return lunr2.QueryParser.parsePresence;
            default:
              var errorMessage = "Unexpected lexeme type '" + nextLexeme.type + "'";
              throw new lunr2.QueryParseError(errorMessage, nextLexeme.start, nextLexeme.end);
          }
        };
        (function(root, factory) {
          if (typeof define === "function" && define.amd) {
            define(factory);
          } else if (typeof exports === "object") {
            module.exports = factory();
          } else {
            root.lunr = factory();
          }
        })(this, function() {
          return lunr2;
        });
      })();
    }
  });

  // ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/bep/docuapi/v2@v2.4.2/assets/js/controllers/lang.js
  var debug = 0 ? console.log.bind(console, "[lang]") : function() {
  };
  var toggleCodeblockVisibility = function(lang, visible) {
    debug("toggleCodeblockVisibility", lang, visible);
    document.querySelectorAll(`.highlight code.language-${lang}`).forEach((el) => {
      let highlight = el.closest(".highlight");
      highlight.style.display = visible ? "block" : "none";
    });
  };
  function newLangController() {
    return {
      tabs: [],
      changeLanguage: function(index) {
        debug("changeLanguage", index);
        for (let i = 0; i < this.tabs.length; i++) {
          let isActive = i === index;
          this.tabs[i].active = isActive;
          toggleCodeblockVisibility(this.tabs[i].key, isActive);
        }
      },
      initLangs: function(tabs) {
        debug("initLangs", tabs);
        tabs[0].active = true;
        this.tabs = tabs;
        return this.$nextTick(() => {
          this.changeLanguage(0);
        });
      }
    };
  }

  // ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/bep/docuapi/v2@v2.4.2/assets/js/controllers/search-lunr.js
  var lunr = __toESM(require_lunr());

  // ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/bep/docuapi/v2@v2.4.2/assets/js/helpers/highlight.js
  var Highlight = class {
    constructor(opts = {
      contentSelector: ".content",
      markClass: "da-highlight-mark"
    }) {
      this.opts = opts;
      this.nodeStack = [];
    }
    apply(re) {
      const treeWalker = document.createTreeWalker(
        this.content(),
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (node.parentNode.classList.contains(this.opts.markClass)) {
              return NodeFilter.FILTER_REJECT;
            }
            if (/\S/.test(node.data)) {
              return NodeFilter.FILTER_ACCEPT;
            }
            return NodeFilter.FILTER_REJECT;
          }
        },
        false
      );
      let matches = [];
      while (treeWalker.nextNode()) {
        let node = treeWalker.currentNode;
        if (node.data.match(re)) {
          matches.push(node);
        }
      }
      matches.forEach((node) => {
        let parentClone = node.parentNode.cloneNode(true);
        parentClone.childNodes.forEach((node2) => {
          if (node2.nodeType !== Node.TEXT_NODE) {
            return;
          }
          let match = node2.data.match(re);
          if (!match) {
            return;
          }
          let pos = node2.data.indexOf(match[0], match.index);
          if (pos === -1) {
            return;
          }
          let mark = document.createElement("mark");
          mark.classList.add(this.opts.markClass);
          let wordNode = node2.splitText(pos);
          wordNode.splitText(match[0].length);
          let wordClone = wordNode.cloneNode(true);
          mark.appendChild(wordClone);
          parentClone.replaceChild(mark, wordNode);
        });
        if (node.parentNode && node.parentNode.parentNode) {
          this.nodeStack.push({
            old: node.parentNode,
            new: parentClone
          });
          node.parentNode.parentNode.replaceChild(parentClone, node.parentNode);
        }
      });
    }
    remove() {
      while (this.nodeStack.length) {
        let pair = this.nodeStack.pop();
        pair.new.parentNode.replaceChild(pair.old, pair.new);
      }
    }
    content() {
      return document.querySelector(this.opts.contentSelector);
    }
  };

  // ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/bep/docuapi/v2@v2.4.2/assets/js/controllers/search-lunr.js
  function nextUntil(elem, selector) {
    var siblings = [];
    elem = elem.nextElementSibling;
    while (elem) {
      if (elem.matches(selector)) break;
      siblings.push(elem);
      elem = elem.nextElementSibling;
    }
    return siblings;
  }
  function newSearchController() {
    var index;
    var buildIndex = function(config) {
      var builder = new lunr.Builder();
      builder.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);
      builder.searchPipeline.add(lunr.stemmer);
      config.call(builder, builder);
      return builder.build();
    };
    function populateIndex() {
      index = buildIndex(function() {
        this.ref("id");
        this.field("title", { boost: 10 });
        this.field("body");
        this.pipeline.add(lunr.trimmer, lunr.stopWordFilter);
        document.querySelectorAll("h1, h2").forEach((headerEl) => {
          let body = "";
          nextUntil(headerEl, "h1, h2").forEach((el) => {
            body = body.concat(" ", el.textContent);
          });
          this.add({
            id: headerEl.id,
            title: headerEl.textContent,
            body
          });
        });
      });
    }
    let highlight = new Highlight();
    return {
      query: "",
      results: [],
      init: function() {
        return this.$nextTick(() => {
          populateIndex();
          this.$watch("query", () => {
            this.search();
          });
        });
      },
      search: function() {
        highlight.remove();
        let results = index.search(this.query).filter((item) => item.score > 1e-4);
        this.results = results.map((item) => {
          var elem = document.getElementById(item.ref);
          return {
            title: elem.innerText,
            id: item.ref
          };
        });
        if (this.results.length > 0) {
          highlight.apply(new RegExp(this.query, "i"));
        }
      }
    };
  }

  // ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/bep/docuapi/v2@v2.4.2/assets/js/controllers/toc.js
  var debug2 = 0 ? console.log.bind(console, "[toc]") : function() {
  };
  var headerEls = () => document.querySelectorAll(".content h1, .content h2, .content h3");
  var setProgress = function(self, el) {
    let mainEl = document.querySelector(".content");
    let mainHeight = mainEl.offsetHeight;
    let mainStart = mainEl.offsetTop;
    let progress = Math.round((el.offsetTop - mainStart) / mainHeight * 100);
    self.activeHeading.title = el.innerText;
    self.activeHeading.progress = progress;
  };
  function newToCController() {
    const setOpenRecursive = function(row, shouldOpen) {
      if (!row.sub) {
        return false;
      }
      let isOpen = false;
      row.sub.forEach((rowsub) => {
        rowsub.open = shouldOpen(rowsub);
        rowsub.active = rowsub.open;
        rowsub.open = rowsub.open || setOpenRecursive(rowsub, shouldOpen);
        if (rowsub.open) {
          isOpen = true;
        }
      });
      row.active_parent = isOpen;
      isOpen = isOpen || shouldOpen(row);
      row.open = isOpen;
      row.active = shouldOpen(row);
      return isOpen;
    };
    return {
      activeHeading: {
        title: "",
        progress: 0
      },
      showHeading: true,
      rows: [],
      load: function(rows) {
        this.rows = rows;
      },
      transitions: function() {
        return {
          "x-transition:enter.duration.500ms": "",
          "x-transition:leave.duration.400ms": "",
          "x-transition.scale.origin.top.left.80": ""
        };
      },
      rowClass: function(row) {
        return {
          ["x-bind:class"]() {
            return `toc-h${row.level}${row.active ? " active" : ""}${row.active_parent ? " active-parent" : ""}`;
          }
        };
      },
      click: function(row) {
        this.rows.forEach((row2) => {
          setOpenRecursive(row2, (row3) => {
            return row === row3;
          });
        });
      },
      onScroll: function() {
        debug2("onScroll");
        let scrollpos = window.scrollY;
        headerEls().forEach((el) => {
          let offset = el.offsetTop;
          if (offset < scrollpos + 10) {
            debug2("Set for", el.id);
            this.rows.forEach((row) => {
              setOpenRecursive(row, (row2) => {
                return row2.id === el.id;
              });
            });
            setProgress(this, el);
          }
          if (window.innerHeight + scrollpos >= document.body.offsetHeight) {
            this.activeHeading.progress = 100;
          }
        });
      }
    };
  }

  // ns-hugo-imp:/Users/sasikesani/Library/Caches/hugo_cache/modules/filecache/modules/pkg/mod/github.com/gohugoio/hugo-mod-jslibs-dist/alpinejs/v3@v3.21000.20300/packages/alpinejs/dist/module.esm.js
  var flushPending = false;
  var flushing = false;
  var queue = [];
  function scheduler(callback) {
    queueJob(callback);
  }
  function queueJob(job) {
    if (!queue.includes(job))
      queue.push(job);
    queueFlush();
  }
  function dequeueJob(job) {
    let index = queue.indexOf(job);
    if (index !== -1)
      queue.splice(index, 1);
  }
  function queueFlush() {
    if (!flushing && !flushPending) {
      flushPending = true;
      queueMicrotask(flushJobs);
    }
  }
  function flushJobs() {
    flushPending = false;
    flushing = true;
    for (let i = 0; i < queue.length; i++) {
      queue[i]();
    }
    queue.length = 0;
    flushing = false;
  }
  var reactive;
  var effect;
  var release;
  var raw;
  var shouldSchedule = true;
  function disableEffectScheduling(callback) {
    shouldSchedule = false;
    callback();
    shouldSchedule = true;
  }
  function setReactivityEngine(engine) {
    reactive = engine.reactive;
    release = engine.release;
    effect = (callback) => engine.effect(callback, { scheduler: (task) => {
      if (shouldSchedule) {
        scheduler(task);
      } else {
        task();
      }
    } });
    raw = engine.raw;
  }
  function overrideEffect(override) {
    effect = override;
  }
  function elementBoundEffect(el) {
    let cleanup2 = () => {
    };
    let wrappedEffect = (callback) => {
      let effectReference = effect(callback);
      if (!el._x_effects) {
        el._x_effects = /* @__PURE__ */ new Set();
        el._x_runEffects = () => {
          el._x_effects.forEach((i) => i());
        };
      }
      el._x_effects.add(effectReference);
      cleanup2 = () => {
        if (effectReference === void 0)
          return;
        el._x_effects.delete(effectReference);
        release(effectReference);
      };
      return effectReference;
    };
    return [wrappedEffect, () => {
      cleanup2();
    }];
  }
  var onAttributeAddeds = [];
  var onElRemoveds = [];
  var onElAddeds = [];
  function onElAdded(callback) {
    onElAddeds.push(callback);
  }
  function onElRemoved(el, callback) {
    if (typeof callback === "function") {
      if (!el._x_cleanups)
        el._x_cleanups = [];
      el._x_cleanups.push(callback);
    } else {
      callback = el;
      onElRemoveds.push(callback);
    }
  }
  function onAttributesAdded(callback) {
    onAttributeAddeds.push(callback);
  }
  function onAttributeRemoved(el, name, callback) {
    if (!el._x_attributeCleanups)
      el._x_attributeCleanups = {};
    if (!el._x_attributeCleanups[name])
      el._x_attributeCleanups[name] = [];
    el._x_attributeCleanups[name].push(callback);
  }
  function cleanupAttributes(el, names) {
    if (!el._x_attributeCleanups)
      return;
    Object.entries(el._x_attributeCleanups).forEach(([name, value]) => {
      if (names === void 0 || names.includes(name)) {
        value.forEach((i) => i());
        delete el._x_attributeCleanups[name];
      }
    });
  }
  var observer = new MutationObserver(onMutate);
  var currentlyObserving = false;
  function startObservingMutations() {
    observer.observe(document, { subtree: true, childList: true, attributes: true, attributeOldValue: true });
    currentlyObserving = true;
  }
  function stopObservingMutations() {
    flushObserver();
    observer.disconnect();
    currentlyObserving = false;
  }
  var recordQueue = [];
  var willProcessRecordQueue = false;
  function flushObserver() {
    recordQueue = recordQueue.concat(observer.takeRecords());
    if (recordQueue.length && !willProcessRecordQueue) {
      willProcessRecordQueue = true;
      queueMicrotask(() => {
        processRecordQueue();
        willProcessRecordQueue = false;
      });
    }
  }
  function processRecordQueue() {
    onMutate(recordQueue);
    recordQueue.length = 0;
  }
  function mutateDom(callback) {
    if (!currentlyObserving)
      return callback();
    stopObservingMutations();
    let result = callback();
    startObservingMutations();
    return result;
  }
  var isCollecting = false;
  var deferredMutations = [];
  function deferMutations() {
    isCollecting = true;
  }
  function flushAndStopDeferringMutations() {
    isCollecting = false;
    onMutate(deferredMutations);
    deferredMutations = [];
  }
  function onMutate(mutations) {
    if (isCollecting) {
      deferredMutations = deferredMutations.concat(mutations);
      return;
    }
    let addedNodes = [];
    let removedNodes = [];
    let addedAttributes = /* @__PURE__ */ new Map();
    let removedAttributes = /* @__PURE__ */ new Map();
    for (let i = 0; i < mutations.length; i++) {
      if (mutations[i].target._x_ignoreMutationObserver)
        continue;
      if (mutations[i].type === "childList") {
        mutations[i].addedNodes.forEach((node) => node.nodeType === 1 && addedNodes.push(node));
        mutations[i].removedNodes.forEach((node) => node.nodeType === 1 && removedNodes.push(node));
      }
      if (mutations[i].type === "attributes") {
        let el = mutations[i].target;
        let name = mutations[i].attributeName;
        let oldValue = mutations[i].oldValue;
        let add2 = () => {
          if (!addedAttributes.has(el))
            addedAttributes.set(el, []);
          addedAttributes.get(el).push({ name, value: el.getAttribute(name) });
        };
        let remove = () => {
          if (!removedAttributes.has(el))
            removedAttributes.set(el, []);
          removedAttributes.get(el).push(name);
        };
        if (el.hasAttribute(name) && oldValue === null) {
          add2();
        } else if (el.hasAttribute(name)) {
          remove();
          add2();
        } else {
          remove();
        }
      }
    }
    removedAttributes.forEach((attrs, el) => {
      cleanupAttributes(el, attrs);
    });
    addedAttributes.forEach((attrs, el) => {
      onAttributeAddeds.forEach((i) => i(el, attrs));
    });
    for (let node of removedNodes) {
      if (addedNodes.includes(node))
        continue;
      onElRemoveds.forEach((i) => i(node));
      if (node._x_cleanups) {
        while (node._x_cleanups.length)
          node._x_cleanups.pop()();
      }
    }
    addedNodes.forEach((node) => {
      node._x_ignoreSelf = true;
      node._x_ignore = true;
    });
    for (let node of addedNodes) {
      if (removedNodes.includes(node))
        continue;
      if (!node.isConnected)
        continue;
      delete node._x_ignoreSelf;
      delete node._x_ignore;
      onElAddeds.forEach((i) => i(node));
      node._x_ignore = true;
      node._x_ignoreSelf = true;
    }
    addedNodes.forEach((node) => {
      delete node._x_ignoreSelf;
      delete node._x_ignore;
    });
    addedNodes = null;
    removedNodes = null;
    addedAttributes = null;
    removedAttributes = null;
  }
  function scope(node) {
    return mergeProxies(closestDataStack(node));
  }
  function addScopeToNode(node, data2, referenceNode) {
    node._x_dataStack = [data2, ...closestDataStack(referenceNode || node)];
    return () => {
      node._x_dataStack = node._x_dataStack.filter((i) => i !== data2);
    };
  }
  function refreshScope(element, scope2) {
    let existingScope = element._x_dataStack[0];
    Object.entries(scope2).forEach(([key, value]) => {
      existingScope[key] = value;
    });
  }
  function closestDataStack(node) {
    if (node._x_dataStack)
      return node._x_dataStack;
    if (typeof ShadowRoot === "function" && node instanceof ShadowRoot) {
      return closestDataStack(node.host);
    }
    if (!node.parentNode) {
      return [];
    }
    return closestDataStack(node.parentNode);
  }
  function mergeProxies(objects) {
    let thisProxy = new Proxy({}, {
      ownKeys: () => {
        return Array.from(new Set(objects.flatMap((i) => Object.keys(i))));
      },
      has: (target, name) => {
        return objects.some((obj) => obj.hasOwnProperty(name));
      },
      get: (target, name) => {
        return (objects.find((obj) => {
          if (obj.hasOwnProperty(name)) {
            let descriptor = Object.getOwnPropertyDescriptor(obj, name);
            if (descriptor.get && descriptor.get._x_alreadyBound || descriptor.set && descriptor.set._x_alreadyBound) {
              return true;
            }
            if ((descriptor.get || descriptor.set) && descriptor.enumerable) {
              let getter = descriptor.get;
              let setter = descriptor.set;
              let property = descriptor;
              getter = getter && getter.bind(thisProxy);
              setter = setter && setter.bind(thisProxy);
              if (getter)
                getter._x_alreadyBound = true;
              if (setter)
                setter._x_alreadyBound = true;
              Object.defineProperty(obj, name, {
                ...property,
                get: getter,
                set: setter
              });
            }
            return true;
          }
          return false;
        }) || {})[name];
      },
      set: (target, name, value) => {
        let closestObjectWithKey = objects.find((obj) => obj.hasOwnProperty(name));
        if (closestObjectWithKey) {
          closestObjectWithKey[name] = value;
        } else {
          objects[objects.length - 1][name] = value;
        }
        return true;
      }
    });
    return thisProxy;
  }
  function initInterceptors(data2) {
    let isObject2 = (val) => typeof val === "object" && !Array.isArray(val) && val !== null;
    let recurse = (obj, basePath = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(obj)).forEach(([key, { value, enumerable }]) => {
        if (enumerable === false || value === void 0)
          return;
        let path = basePath === "" ? key : `${basePath}.${key}`;
        if (typeof value === "object" && value !== null && value._x_interceptor) {
          obj[key] = value.initialize(data2, path, key);
        } else {
          if (isObject2(value) && value !== obj && !(value instanceof Element)) {
            recurse(value, path);
          }
        }
      });
    };
    return recurse(data2);
  }
  function interceptor(callback, mutateObj = () => {
  }) {
    let obj = {
      initialValue: void 0,
      _x_interceptor: true,
      initialize(data2, path, key) {
        return callback(this.initialValue, () => get(data2, path), (value) => set(data2, path, value), path, key);
      }
    };
    mutateObj(obj);
    return (initialValue) => {
      if (typeof initialValue === "object" && initialValue !== null && initialValue._x_interceptor) {
        let initialize = obj.initialize.bind(obj);
        obj.initialize = (data2, path, key) => {
          let innerValue = initialValue.initialize(data2, path, key);
          obj.initialValue = innerValue;
          return initialize(data2, path, key);
        };
      } else {
        obj.initialValue = initialValue;
      }
      return obj;
    };
  }
  function get(obj, path) {
    return path.split(".").reduce((carry, segment) => carry[segment], obj);
  }
  function set(obj, path, value) {
    if (typeof path === "string")
      path = path.split(".");
    if (path.length === 1)
      obj[path[0]] = value;
    else if (path.length === 0)
      throw error;
    else {
      if (obj[path[0]])
        return set(obj[path[0]], path.slice(1), value);
      else {
        obj[path[0]] = {};
        return set(obj[path[0]], path.slice(1), value);
      }
    }
  }
  var magics = {};
  function magic(name, callback) {
    magics[name] = callback;
  }
  function injectMagics(obj, el) {
    Object.entries(magics).forEach(([name, callback]) => {
      Object.defineProperty(obj, `$${name}`, {
        get() {
          let [utilities, cleanup2] = getElementBoundUtilities(el);
          utilities = { interceptor, ...utilities };
          onElRemoved(el, cleanup2);
          return callback(el, utilities);
        },
        enumerable: false
      });
    });
    return {
      obj,
      cleanup: () => {
        el = null;
      }
    };
  }
  function tryCatch(el, expression, callback, ...args) {
    try {
      return callback(...args);
    } catch (e) {
      handleError(e, el, expression);
    }
  }
  function handleError(error2, el, expression = void 0) {
    Object.assign(error2, { el, expression });
    console.warn(`Alpine Expression Error: ${error2.message}

${expression ? 'Expression: "' + expression + '"\n\n' : ""}`, el);
    setTimeout(() => {
      throw error2;
    }, 0);
  }
  var shouldAutoEvaluateFunctions = true;
  function dontAutoEvaluateFunctions(callback) {
    let cache = shouldAutoEvaluateFunctions;
    shouldAutoEvaluateFunctions = false;
    callback();
    shouldAutoEvaluateFunctions = cache;
  }
  function evaluate(el, expression, extras = {}) {
    let result;
    evaluateLater(el, expression)((value) => result = value, extras);
    return result;
  }
  function evaluateLater(...args) {
    return theEvaluatorFunction(...args);
  }
  var theEvaluatorFunction = normalEvaluator;
  function setEvaluator(newEvaluator) {
    theEvaluatorFunction = newEvaluator;
  }
  function normalEvaluator(el, expression) {
    let overriddenMagics = {};
    let cleanup2 = injectMagics(overriddenMagics, el).cleanup;
    onAttributeRemoved(el, "evaluator", cleanup2);
    let dataStack = [overriddenMagics, ...closestDataStack(el)];
    if (typeof expression === "function") {
      return generateEvaluatorFromFunction(dataStack, expression);
    }
    let evaluator = generateEvaluatorFromString(dataStack, expression, el);
    return tryCatch.bind(null, el, expression, evaluator);
  }
  function generateEvaluatorFromFunction(dataStack, func) {
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      let result = func.apply(mergeProxies([scope2, ...dataStack]), params);
      runIfTypeOfFunction(receiver, result);
    };
  }
  var evaluatorMemo = {};
  function generateFunctionFromString(expression, el) {
    if (evaluatorMemo[expression]) {
      return evaluatorMemo[expression];
    }
    let AsyncFunction = Object.getPrototypeOf(async function() {
    }).constructor;
    let rightSideSafeExpression = /^[\n\s]*if.*\(.*\)/.test(expression) || /^(let|const)\s/.test(expression) ? `(() => { ${expression} })()` : expression;
    const safeAsyncFunction = () => {
      try {
        return new AsyncFunction(["__self", "scope"], `with (scope) { __self.result = ${rightSideSafeExpression} }; __self.finished = true; return __self.result;`);
      } catch (error2) {
        handleError(error2, el, expression);
        return Promise.resolve();
      }
    };
    let func = safeAsyncFunction();
    evaluatorMemo[expression] = func;
    return func;
  }
  function generateEvaluatorFromString(dataStack, expression, el) {
    let func = generateFunctionFromString(expression, el);
    return (receiver = () => {
    }, { scope: scope2 = {}, params = [] } = {}) => {
      func.result = void 0;
      func.finished = false;
      let completeScope = mergeProxies([scope2, ...dataStack]);
      if (typeof func === "function") {
        let promise = func(func, completeScope).catch((error2) => handleError(error2, el, expression));
        if (func.finished) {
          runIfTypeOfFunction(receiver, func.result, completeScope, params, el);
          func.result = void 0;
        } else {
          promise.then((result) => {
            runIfTypeOfFunction(receiver, result, completeScope, params, el);
          }).catch((error2) => handleError(error2, el, expression)).finally(() => func.result = void 0);
        }
      }
    };
  }
  function runIfTypeOfFunction(receiver, value, scope2, params, el) {
    if (shouldAutoEvaluateFunctions && typeof value === "function") {
      let result = value.apply(scope2, params);
      if (result instanceof Promise) {
        result.then((i) => runIfTypeOfFunction(receiver, i, scope2, params)).catch((error2) => handleError(error2, el, value));
      } else {
        receiver(result);
      }
    } else {
      receiver(value);
    }
  }
  var prefixAsString = "x-";
  function prefix(subject = "") {
    return prefixAsString + subject;
  }
  function setPrefix(newPrefix) {
    prefixAsString = newPrefix;
  }
  var directiveHandlers = {};
  function directive(name, callback) {
    directiveHandlers[name] = callback;
  }
  function directives(el, attributes, originalAttributeOverride) {
    attributes = Array.from(attributes);
    if (el._x_virtualDirectives) {
      let vAttributes = Object.entries(el._x_virtualDirectives).map(([name, value]) => ({ name, value }));
      let staticAttributes = attributesOnly(vAttributes);
      vAttributes = vAttributes.map((attribute) => {
        if (staticAttributes.find((attr) => attr.name === attribute.name)) {
          return {
            name: `x-bind:${attribute.name}`,
            value: `"${attribute.value}"`
          };
        }
        return attribute;
      });
      attributes = attributes.concat(vAttributes);
    }
    let transformedAttributeMap = {};
    let directives2 = attributes.map(toTransformedAttributes((newName, oldName) => transformedAttributeMap[newName] = oldName)).filter(outNonAlpineAttributes).map(toParsedDirectives(transformedAttributeMap, originalAttributeOverride)).sort(byPriority);
    return directives2.map((directive2) => {
      return getDirectiveHandler(el, directive2);
    });
  }
  function attributesOnly(attributes) {
    return Array.from(attributes).map(toTransformedAttributes()).filter((attr) => !outNonAlpineAttributes(attr));
  }
  var isDeferringHandlers = false;
  var directiveHandlerStacks = /* @__PURE__ */ new Map();
  var currentHandlerStackKey = Symbol();
  function deferHandlingDirectives(callback) {
    isDeferringHandlers = true;
    let key = Symbol();
    currentHandlerStackKey = key;
    directiveHandlerStacks.set(key, []);
    let flushHandlers = () => {
      while (directiveHandlerStacks.get(key).length)
        directiveHandlerStacks.get(key).shift()();
      directiveHandlerStacks.delete(key);
    };
    let stopDeferring = () => {
      isDeferringHandlers = false;
      flushHandlers();
    };
    callback(flushHandlers);
    stopDeferring();
  }
  function getElementBoundUtilities(el) {
    let cleanups = [];
    let cleanup2 = (callback) => cleanups.push(callback);
    let [effect3, cleanupEffect] = elementBoundEffect(el);
    cleanups.push(cleanupEffect);
    let utilities = {
      Alpine: alpine_default,
      effect: effect3,
      cleanup: cleanup2,
      evaluateLater: evaluateLater.bind(evaluateLater, el),
      evaluate: evaluate.bind(evaluate, el)
    };
    let doCleanup = () => cleanups.forEach((i) => i());
    return [utilities, doCleanup];
  }
  function getDirectiveHandler(el, directive2) {
    let noop = () => {
    };
    let handler3 = directiveHandlers[directive2.type] || noop;
    let [utilities, cleanup2] = getElementBoundUtilities(el);
    onAttributeRemoved(el, directive2.original, cleanup2);
    let fullHandler = () => {
      if (el._x_ignore || el._x_ignoreSelf)
        return;
      handler3.inline && handler3.inline(el, directive2, utilities);
      handler3 = handler3.bind(handler3, el, directive2, utilities);
      isDeferringHandlers ? directiveHandlerStacks.get(currentHandlerStackKey).push(handler3) : handler3();
    };
    fullHandler.runCleanups = cleanup2;
    return fullHandler;
  }
  var startingWith = (subject, replacement) => ({ name, value }) => {
    if (name.startsWith(subject))
      name = name.replace(subject, replacement);
    return { name, value };
  };
  var into = (i) => i;
  function toTransformedAttributes(callback = () => {
  }) {
    return ({ name, value }) => {
      let { name: newName, value: newValue } = attributeTransformers.reduce((carry, transform) => {
        return transform(carry);
      }, { name, value });
      if (newName !== name)
        callback(newName, name);
      return { name: newName, value: newValue };
    };
  }
  var attributeTransformers = [];
  function mapAttributes(callback) {
    attributeTransformers.push(callback);
  }
  function outNonAlpineAttributes({ name }) {
    return alpineAttributeRegex().test(name);
  }
  var alpineAttributeRegex = () => new RegExp(`^${prefixAsString}([^:^.]+)\\b`);
  function toParsedDirectives(transformedAttributeMap, originalAttributeOverride) {
    return ({ name, value }) => {
      let typeMatch = name.match(alpineAttributeRegex());
      let valueMatch = name.match(/:([a-zA-Z0-9\-:]+)/);
      let modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || [];
      let original = originalAttributeOverride || transformedAttributeMap[name] || name;
      return {
        type: typeMatch ? typeMatch[1] : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map((i) => i.replace(".", "")),
        expression: value,
        original
      };
    };
  }
  var DEFAULT = "DEFAULT";
  var directiveOrder = [
    "ignore",
    "ref",
    "data",
    "id",
    "bind",
    "init",
    "for",
    "mask",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    DEFAULT,
    "teleport"
  ];
  function byPriority(a, b) {
    let typeA = directiveOrder.indexOf(a.type) === -1 ? DEFAULT : a.type;
    let typeB = directiveOrder.indexOf(b.type) === -1 ? DEFAULT : b.type;
    return directiveOrder.indexOf(typeA) - directiveOrder.indexOf(typeB);
  }
  function dispatch(el, name, detail = {}) {
    el.dispatchEvent(new CustomEvent(name, {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true
    }));
  }
  var tickStack = [];
  var isHolding = false;
  function nextTick(callback = () => {
  }) {
    queueMicrotask(() => {
      isHolding || setTimeout(() => {
        releaseNextTicks();
      });
    });
    return new Promise((res) => {
      tickStack.push(() => {
        callback();
        res();
      });
    });
  }
  function releaseNextTicks() {
    isHolding = false;
    while (tickStack.length)
      tickStack.shift()();
  }
  function holdNextTicks() {
    isHolding = true;
  }
  function walk(el, callback) {
    if (typeof ShadowRoot === "function" && el instanceof ShadowRoot) {
      Array.from(el.children).forEach((el2) => walk(el2, callback));
      return;
    }
    let skip = false;
    callback(el, () => skip = true);
    if (skip)
      return;
    let node = el.firstElementChild;
    while (node) {
      walk(node, callback, false);
      node = node.nextElementSibling;
    }
  }
  function warn(message, ...args) {
    console.warn(`Alpine Warning: ${message}`, ...args);
  }
  function start() {
    if (!document.body)
      warn("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?");
    dispatch(document, "alpine:init");
    dispatch(document, "alpine:initializing");
    startObservingMutations();
    onElAdded((el) => initTree(el, walk));
    onElRemoved((el) => destroyTree(el));
    onAttributesAdded((el, attrs) => {
      directives(el, attrs).forEach((handle) => handle());
    });
    let outNestedComponents = (el) => !closestRoot(el.parentElement, true);
    Array.from(document.querySelectorAll(allSelectors())).filter(outNestedComponents).forEach((el) => {
      initTree(el);
    });
    dispatch(document, "alpine:initialized");
  }
  var rootSelectorCallbacks = [];
  var initSelectorCallbacks = [];
  function rootSelectors() {
    return rootSelectorCallbacks.map((fn) => fn());
  }
  function allSelectors() {
    return rootSelectorCallbacks.concat(initSelectorCallbacks).map((fn) => fn());
  }
  function addRootSelector(selectorCallback) {
    rootSelectorCallbacks.push(selectorCallback);
  }
  function addInitSelector(selectorCallback) {
    initSelectorCallbacks.push(selectorCallback);
  }
  function closestRoot(el, includeInitSelectors = false) {
    return findClosest(el, (element) => {
      const selectors = includeInitSelectors ? allSelectors() : rootSelectors();
      if (selectors.some((selector) => element.matches(selector)))
        return true;
    });
  }
  function findClosest(el, callback) {
    if (!el)
      return;
    if (callback(el))
      return el;
    if (el._x_teleportBack)
      el = el._x_teleportBack;
    if (!el.parentElement)
      return;
    return findClosest(el.parentElement, callback);
  }
  function isRoot(el) {
    return rootSelectors().some((selector) => el.matches(selector));
  }
  function initTree(el, walker = walk) {
    deferHandlingDirectives(() => {
      walker(el, (el2, skip) => {
        directives(el2, el2.attributes).forEach((handle) => handle());
        el2._x_ignore && skip();
      });
    });
  }
  function destroyTree(root) {
    walk(root, (el) => cleanupAttributes(el));
  }
  function setClasses(el, value) {
    if (Array.isArray(value)) {
      return setClassesFromString(el, value.join(" "));
    } else if (typeof value === "object" && value !== null) {
      return setClassesFromObject(el, value);
    } else if (typeof value === "function") {
      return setClasses(el, value());
    }
    return setClassesFromString(el, value);
  }
  function setClassesFromString(el, classString) {
    let split = (classString2) => classString2.split(" ").filter(Boolean);
    let missingClasses = (classString2) => classString2.split(" ").filter((i) => !el.classList.contains(i)).filter(Boolean);
    let addClassesAndReturnUndo = (classes) => {
      el.classList.add(...classes);
      return () => {
        el.classList.remove(...classes);
      };
    };
    classString = classString === true ? classString = "" : classString || "";
    return addClassesAndReturnUndo(missingClasses(classString));
  }
  function setClassesFromObject(el, classObject) {
    let split = (classString) => classString.split(" ").filter(Boolean);
    let forAdd = Object.entries(classObject).flatMap(([classString, bool]) => bool ? split(classString) : false).filter(Boolean);
    let forRemove = Object.entries(classObject).flatMap(([classString, bool]) => !bool ? split(classString) : false).filter(Boolean);
    let added = [];
    let removed = [];
    forRemove.forEach((i) => {
      if (el.classList.contains(i)) {
        el.classList.remove(i);
        removed.push(i);
      }
    });
    forAdd.forEach((i) => {
      if (!el.classList.contains(i)) {
        el.classList.add(i);
        added.push(i);
      }
    });
    return () => {
      removed.forEach((i) => el.classList.add(i));
      added.forEach((i) => el.classList.remove(i));
    };
  }
  function setStyles(el, value) {
    if (typeof value === "object" && value !== null) {
      return setStylesFromObject(el, value);
    }
    return setStylesFromString(el, value);
  }
  function setStylesFromObject(el, value) {
    let previousStyles = {};
    Object.entries(value).forEach(([key, value2]) => {
      previousStyles[key] = el.style[key];
      if (!key.startsWith("--")) {
        key = kebabCase(key);
      }
      el.style.setProperty(key, value2);
    });
    setTimeout(() => {
      if (el.style.length === 0) {
        el.removeAttribute("style");
      }
    });
    return () => {
      setStyles(el, previousStyles);
    };
  }
  function setStylesFromString(el, value) {
    let cache = el.getAttribute("style", value);
    el.setAttribute("style", value);
    return () => {
      el.setAttribute("style", cache || "");
    };
  }
  function kebabCase(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function once(callback, fallback = () => {
  }) {
    let called = false;
    return function() {
      if (!called) {
        called = true;
        callback.apply(this, arguments);
      } else {
        fallback.apply(this, arguments);
      }
    };
  }
  directive("transition", (el, { value, modifiers, expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "function")
      expression = evaluate2(expression);
    if (!expression) {
      registerTransitionsFromHelper(el, modifiers, value);
    } else {
      registerTransitionsFromClassString(el, expression, value);
    }
  });
  function registerTransitionsFromClassString(el, classString, stage) {
    registerTransitionObject(el, setClasses, "");
    let directiveStorageMap = {
      enter: (classes) => {
        el._x_transition.enter.during = classes;
      },
      "enter-start": (classes) => {
        el._x_transition.enter.start = classes;
      },
      "enter-end": (classes) => {
        el._x_transition.enter.end = classes;
      },
      leave: (classes) => {
        el._x_transition.leave.during = classes;
      },
      "leave-start": (classes) => {
        el._x_transition.leave.start = classes;
      },
      "leave-end": (classes) => {
        el._x_transition.leave.end = classes;
      }
    };
    directiveStorageMap[stage](classString);
  }
  function registerTransitionsFromHelper(el, modifiers, stage) {
    registerTransitionObject(el, setStyles);
    let doesntSpecify = !modifiers.includes("in") && !modifiers.includes("out") && !stage;
    let transitioningIn = doesntSpecify || modifiers.includes("in") || ["enter"].includes(stage);
    let transitioningOut = doesntSpecify || modifiers.includes("out") || ["leave"].includes(stage);
    if (modifiers.includes("in") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index < modifiers.indexOf("out"));
    }
    if (modifiers.includes("out") && !doesntSpecify) {
      modifiers = modifiers.filter((i, index) => index > modifiers.indexOf("out"));
    }
    let wantsAll = !modifiers.includes("opacity") && !modifiers.includes("scale");
    let wantsOpacity = wantsAll || modifiers.includes("opacity");
    let wantsScale = wantsAll || modifiers.includes("scale");
    let opacityValue = wantsOpacity ? 0 : 1;
    let scaleValue = wantsScale ? modifierValue(modifiers, "scale", 95) / 100 : 1;
    let delay = modifierValue(modifiers, "delay", 0);
    let origin = modifierValue(modifiers, "origin", "center");
    let property = "opacity, transform";
    let durationIn = modifierValue(modifiers, "duration", 150) / 1e3;
    let durationOut = modifierValue(modifiers, "duration", 75) / 1e3;
    let easing = `cubic-bezier(0.4, 0.0, 0.2, 1)`;
    if (transitioningIn) {
      el._x_transition.enter.during = {
        transformOrigin: origin,
        transitionDelay: delay,
        transitionProperty: property,
        transitionDuration: `${durationIn}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.enter.start = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
      el._x_transition.enter.end = {
        opacity: 1,
        transform: `scale(1)`
      };
    }
    if (transitioningOut) {
      el._x_transition.leave.during = {
        transformOrigin: origin,
        transitionDelay: delay,
        transitionProperty: property,
        transitionDuration: `${durationOut}s`,
        transitionTimingFunction: easing
      };
      el._x_transition.leave.start = {
        opacity: 1,
        transform: `scale(1)`
      };
      el._x_transition.leave.end = {
        opacity: opacityValue,
        transform: `scale(${scaleValue})`
      };
    }
  }
  function registerTransitionObject(el, setFunction, defaultValue = {}) {
    if (!el._x_transition)
      el._x_transition = {
        enter: { during: defaultValue, start: defaultValue, end: defaultValue },
        leave: { during: defaultValue, start: defaultValue, end: defaultValue },
        in(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, before, after);
        },
        out(before = () => {
        }, after = () => {
        }) {
          transition(el, setFunction, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, before, after);
        }
      };
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function(el, value, show, hide) {
    const nextTick2 = document.visibilityState === "visible" ? requestAnimationFrame : setTimeout;
    let clickAwayCompatibleShow = () => nextTick2(show);
    if (value) {
      if (el._x_transition && (el._x_transition.enter || el._x_transition.leave)) {
        el._x_transition.enter && (Object.entries(el._x_transition.enter.during).length || Object.entries(el._x_transition.enter.start).length || Object.entries(el._x_transition.enter.end).length) ? el._x_transition.in(show) : clickAwayCompatibleShow();
      } else {
        el._x_transition ? el._x_transition.in(show) : clickAwayCompatibleShow();
      }
      return;
    }
    el._x_hidePromise = el._x_transition ? new Promise((resolve, reject) => {
      el._x_transition.out(() => {
      }, () => resolve(hide));
      el._x_transitioning.beforeCancel(() => reject({ isFromCancelledTransition: true }));
    }) : Promise.resolve(hide);
    queueMicrotask(() => {
      let closest = closestHide(el);
      if (closest) {
        if (!closest._x_hideChildren)
          closest._x_hideChildren = [];
        closest._x_hideChildren.push(el);
      } else {
        nextTick2(() => {
          let hideAfterChildren = (el2) => {
            let carry = Promise.all([
              el2._x_hidePromise,
              ...(el2._x_hideChildren || []).map(hideAfterChildren)
            ]).then(([i]) => i());
            delete el2._x_hidePromise;
            delete el2._x_hideChildren;
            return carry;
          };
          hideAfterChildren(el).catch((e) => {
            if (!e.isFromCancelledTransition)
              throw e;
          });
        });
      }
    });
  };
  function closestHide(el) {
    let parent = el.parentNode;
    if (!parent)
      return;
    return parent._x_hidePromise ? parent : closestHide(parent);
  }
  function transition(el, setFunction, { during, start: start2, end } = {}, before = () => {
  }, after = () => {
  }) {
    if (el._x_transitioning)
      el._x_transitioning.cancel();
    if (Object.keys(during).length === 0 && Object.keys(start2).length === 0 && Object.keys(end).length === 0) {
      before();
      after();
      return;
    }
    let undoStart, undoDuring, undoEnd;
    performTransition(el, {
      start() {
        undoStart = setFunction(el, start2);
      },
      during() {
        undoDuring = setFunction(el, during);
      },
      before,
      end() {
        undoStart();
        undoEnd = setFunction(el, end);
      },
      after,
      cleanup() {
        undoDuring();
        undoEnd();
      }
    });
  }
  function performTransition(el, stages) {
    let interrupted, reachedBefore, reachedEnd;
    let finish = once(() => {
      mutateDom(() => {
        interrupted = true;
        if (!reachedBefore)
          stages.before();
        if (!reachedEnd) {
          stages.end();
          releaseNextTicks();
        }
        stages.after();
        if (el.isConnected)
          stages.cleanup();
        delete el._x_transitioning;
      });
    });
    el._x_transitioning = {
      beforeCancels: [],
      beforeCancel(callback) {
        this.beforeCancels.push(callback);
      },
      cancel: once(function() {
        while (this.beforeCancels.length) {
          this.beforeCancels.shift()();
        }
        ;
        finish();
      }),
      finish
    };
    mutateDom(() => {
      stages.start();
      stages.during();
    });
    holdNextTicks();
    requestAnimationFrame(() => {
      if (interrupted)
        return;
      let duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3;
      let delay = Number(getComputedStyle(el).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
      if (duration === 0)
        duration = Number(getComputedStyle(el).animationDuration.replace("s", "")) * 1e3;
      mutateDom(() => {
        stages.before();
      });
      reachedBefore = true;
      requestAnimationFrame(() => {
        if (interrupted)
          return;
        mutateDom(() => {
          stages.end();
        });
        releaseNextTicks();
        setTimeout(el._x_transitioning.finish, duration + delay);
        reachedEnd = true;
      });
    });
  }
  function modifierValue(modifiers, key, fallback) {
    if (modifiers.indexOf(key) === -1)
      return fallback;
    const rawValue = modifiers[modifiers.indexOf(key) + 1];
    if (!rawValue)
      return fallback;
    if (key === "scale") {
      if (isNaN(rawValue))
        return fallback;
    }
    if (key === "duration") {
      let match = rawValue.match(/([0-9]+)ms/);
      if (match)
        return match[1];
    }
    if (key === "origin") {
      if (["top", "right", "left", "center", "bottom"].includes(modifiers[modifiers.indexOf(key) + 2])) {
        return [rawValue, modifiers[modifiers.indexOf(key) + 2]].join(" ");
      }
    }
    return rawValue;
  }
  var isCloning = false;
  function skipDuringClone(callback, fallback = () => {
  }) {
    return (...args) => isCloning ? fallback(...args) : callback(...args);
  }
  function clone(oldEl, newEl) {
    if (!newEl._x_dataStack)
      newEl._x_dataStack = oldEl._x_dataStack;
    isCloning = true;
    dontRegisterReactiveSideEffects(() => {
      cloneTree(newEl);
    });
    isCloning = false;
  }
  function cloneTree(el) {
    let hasRunThroughFirstEl = false;
    let shallowWalker = (el2, callback) => {
      walk(el2, (el3, skip) => {
        if (hasRunThroughFirstEl && isRoot(el3))
          return skip();
        hasRunThroughFirstEl = true;
        callback(el3, skip);
      });
    };
    initTree(el, shallowWalker);
  }
  function dontRegisterReactiveSideEffects(callback) {
    let cache = effect;
    overrideEffect((callback2, el) => {
      let storedEffect = cache(callback2);
      release(storedEffect);
      return () => {
      };
    });
    callback();
    overrideEffect(cache);
  }
  function bind(el, name, value, modifiers = []) {
    if (!el._x_bindings)
      el._x_bindings = reactive({});
    el._x_bindings[name] = value;
    name = modifiers.includes("camel") ? camelCase(name) : name;
    switch (name) {
      case "value":
        bindInputValue(el, value);
        break;
      case "style":
        bindStyles(el, value);
        break;
      case "class":
        bindClasses(el, value);
        break;
      default:
        bindAttribute(el, name, value);
        break;
    }
  }
  function bindInputValue(el, value) {
    if (el.type === "radio") {
      if (el.attributes.value === void 0) {
        el.value = value;
      }
      if (window.fromModel) {
        el.checked = checkedAttrLooseCompare(el.value, value);
      }
    } else if (el.type === "checkbox") {
      if (Number.isInteger(value)) {
        el.value = value;
      } else if (!Number.isInteger(value) && !Array.isArray(value) && typeof value !== "boolean" && ![null, void 0].includes(value)) {
        el.value = String(value);
      } else {
        if (Array.isArray(value)) {
          el.checked = value.some((val) => checkedAttrLooseCompare(val, el.value));
        } else {
          el.checked = !!value;
        }
      }
    } else if (el.tagName === "SELECT") {
      updateSelect(el, value);
    } else {
      if (el.value === value)
        return;
      el.value = value;
    }
  }
  function bindClasses(el, value) {
    if (el._x_undoAddedClasses)
      el._x_undoAddedClasses();
    el._x_undoAddedClasses = setClasses(el, value);
  }
  function bindStyles(el, value) {
    if (el._x_undoAddedStyles)
      el._x_undoAddedStyles();
    el._x_undoAddedStyles = setStyles(el, value);
  }
  function bindAttribute(el, name, value) {
    if ([null, void 0, false].includes(value) && attributeShouldntBePreservedIfFalsy(name)) {
      el.removeAttribute(name);
    } else {
      if (isBooleanAttr(name))
        value = name;
      setIfChanged(el, name, value);
    }
  }
  function setIfChanged(el, attrName, value) {
    if (el.getAttribute(attrName) != value) {
      el.setAttribute(attrName, value);
    }
  }
  function updateSelect(el, value) {
    const arrayWrappedValue = [].concat(value).map((value2) => {
      return value2 + "";
    });
    Array.from(el.options).forEach((option) => {
      option.selected = arrayWrappedValue.includes(option.value);
    });
  }
  function camelCase(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function checkedAttrLooseCompare(valueA, valueB) {
    return valueA == valueB;
  }
  function isBooleanAttr(attrName) {
    const booleanAttributes = [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule"
    ];
    return booleanAttributes.includes(attrName);
  }
  function attributeShouldntBePreservedIfFalsy(name) {
    return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(name);
  }
  function getBinding(el, name, fallback) {
    if (el._x_bindings && el._x_bindings[name] !== void 0)
      return el._x_bindings[name];
    let attr = el.getAttribute(name);
    if (attr === null)
      return typeof fallback === "function" ? fallback() : fallback;
    if (isBooleanAttr(name)) {
      return !![name, "true"].includes(attr);
    }
    if (attr === "")
      return true;
    return attr;
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      let context = this, args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  function plugin(callback) {
    callback(alpine_default);
  }
  var stores = {};
  var isReactive = false;
  function store(name, value) {
    if (!isReactive) {
      stores = reactive(stores);
      isReactive = true;
    }
    if (value === void 0) {
      return stores[name];
    }
    stores[name] = value;
    if (typeof value === "object" && value !== null && value.hasOwnProperty("init") && typeof value.init === "function") {
      stores[name].init();
    }
    initInterceptors(stores[name]);
  }
  function getStores() {
    return stores;
  }
  var binds = {};
  function bind2(name, bindings) {
    let getBindings = typeof bindings !== "function" ? () => bindings : bindings;
    if (name instanceof Element) {
      applyBindingsObject(name, getBindings());
    } else {
      binds[name] = getBindings;
    }
  }
  function injectBindingProviders(obj) {
    Object.entries(binds).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback(...args);
          };
        }
      });
    });
    return obj;
  }
  function applyBindingsObject(el, obj, original) {
    let cleanupRunners = [];
    while (cleanupRunners.length)
      cleanupRunners.pop()();
    let attributes = Object.entries(obj).map(([name, value]) => ({ name, value }));
    let staticAttributes = attributesOnly(attributes);
    attributes = attributes.map((attribute) => {
      if (staticAttributes.find((attr) => attr.name === attribute.name)) {
        return {
          name: `x-bind:${attribute.name}`,
          value: `"${attribute.value}"`
        };
      }
      return attribute;
    });
    directives(el, attributes, original).map((handle) => {
      cleanupRunners.push(handle.runCleanups);
      handle();
    });
  }
  var datas = {};
  function data(name, callback) {
    datas[name] = callback;
  }
  function injectDataProviders(obj, context) {
    Object.entries(datas).forEach(([name, callback]) => {
      Object.defineProperty(obj, name, {
        get() {
          return (...args) => {
            return callback.bind(context)(...args);
          };
        },
        enumerable: false
      });
    });
    return obj;
  }
  var Alpine = {
    get reactive() {
      return reactive;
    },
    get release() {
      return release;
    },
    get effect() {
      return effect;
    },
    get raw() {
      return raw;
    },
    version: "3.10.3",
    flushAndStopDeferringMutations,
    dontAutoEvaluateFunctions,
    disableEffectScheduling,
    stopObservingMutations,
    destroyTree,
    setReactivityEngine,
    closestDataStack,
    skipDuringClone,
    addRootSelector,
    addInitSelector,
    addScopeToNode,
    deferMutations,
    mapAttributes,
    evaluateLater,
    setEvaluator,
    mergeProxies,
    findClosest,
    closestRoot,
    interceptor,
    transition,
    setStyles,
    mutateDom,
    directive,
    throttle,
    debounce,
    evaluate,
    initTree,
    nextTick,
    prefixed: prefix,
    prefix: setPrefix,
    plugin,
    magic,
    store,
    start,
    clone,
    bound: getBinding,
    $data: scope,
    data,
    bind: bind2
  };
  var alpine_default = Alpine;
  function makeMap(str, expectsLowerCase) {
    const map = /* @__PURE__ */ Object.create(null);
    const list = str.split(",");
    for (let i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
  }
  var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var isBooleanAttr2 = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
  var EMPTY_OBJ = true ? Object.freeze({}) : {};
  var EMPTY_ARR = true ? Object.freeze([]) : [];
  var extend = Object.assign;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasOwn = (val, key) => hasOwnProperty.call(val, key);
  var isArray = Array.isArray;
  var isMap = (val) => toTypeString(val) === "[object Map]";
  var isString = (val) => typeof val === "string";
  var isSymbol = (val) => typeof val === "symbol";
  var isObject = (val) => val !== null && typeof val === "object";
  var objectToString = Object.prototype.toString;
  var toTypeString = (value) => objectToString.call(value);
  var toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
  var cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  var camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  var hyphenateRE = /\B([A-Z])/g;
  var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
  var capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
  var toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
  var hasChanged = (value, oldValue) => value !== oldValue && (value === value || oldValue === oldValue);
  var targetMap = /* @__PURE__ */ new WeakMap();
  var effectStack = [];
  var activeEffect;
  var ITERATE_KEY = Symbol(true ? "iterate" : "");
  var MAP_KEY_ITERATE_KEY = Symbol(true ? "Map key iterate" : "");
  function isEffect(fn) {
    return fn && fn._isEffect === true;
  }
  function effect2(fn, options = EMPTY_OBJ) {
    if (isEffect(fn)) {
      fn = fn.raw;
    }
    const effect3 = createReactiveEffect(fn, options);
    if (!options.lazy) {
      effect3();
    }
    return effect3;
  }
  function stop(effect3) {
    if (effect3.active) {
      cleanup(effect3);
      if (effect3.options.onStop) {
        effect3.options.onStop();
      }
      effect3.active = false;
    }
  }
  var uid = 0;
  function createReactiveEffect(fn, options) {
    const effect3 = function reactiveEffect() {
      if (!effect3.active) {
        return fn();
      }
      if (!effectStack.includes(effect3)) {
        cleanup(effect3);
        try {
          enableTracking();
          effectStack.push(effect3);
          activeEffect = effect3;
          return fn();
        } finally {
          effectStack.pop();
          resetTracking();
          activeEffect = effectStack[effectStack.length - 1];
        }
      }
    };
    effect3.id = uid++;
    effect3.allowRecurse = !!options.allowRecurse;
    effect3._isEffect = true;
    effect3.active = true;
    effect3.raw = fn;
    effect3.deps = [];
    effect3.options = options;
    return effect3;
  }
  function cleanup(effect3) {
    const { deps } = effect3;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect3);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function enableTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = true;
  }
  function resetTracking() {
    const last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
  }
  function track(target, type, key) {
    if (!shouldTrack || activeEffect === void 0) {
      return;
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = /* @__PURE__ */ new Set());
    }
    if (!dep.has(activeEffect)) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (activeEffect.options.onTrack) {
        activeEffect.options.onTrack({
          effect: activeEffect,
          target,
          type,
          key
        });
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    const depsMap = targetMap.get(target);
    if (!depsMap) {
      return;
    }
    const effects = /* @__PURE__ */ new Set();
    const add2 = (effectsToAdd) => {
      if (effectsToAdd) {
        effectsToAdd.forEach((effect3) => {
          if (effect3 !== activeEffect || effect3.allowRecurse) {
            effects.add(effect3);
          }
        });
      }
    };
    if (type === "clear") {
      depsMap.forEach(add2);
    } else if (key === "length" && isArray(target)) {
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 >= newValue) {
          add2(dep);
        }
      });
    } else {
      if (key !== void 0) {
        add2(depsMap.get(key));
      }
      switch (type) {
        case "add":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            add2(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!isArray(target)) {
            add2(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              add2(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            add2(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    const run = (effect3) => {
      if (effect3.options.onTrigger) {
        effect3.options.onTrigger({
          effect: effect3,
          target,
          key,
          type,
          newValue,
          oldValue,
          oldTarget
        });
      }
      if (effect3.options.scheduler) {
        effect3.options.scheduler(effect3);
      } else {
        effect3();
      }
    };
    effects.forEach(run);
  }
  var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
  var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
  var get2 = /* @__PURE__ */ createGetter();
  var shallowGet = /* @__PURE__ */ createGetter(false, true);
  var readonlyGet = /* @__PURE__ */ createGetter(true);
  var shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
  var arrayInstrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = method.apply(arr, args);
      if (res === -1 || res === false) {
        return method.apply(arr, args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    const method = Array.prototype[key];
    arrayInstrumentations[key] = function(...args) {
      pauseTracking();
      const res = method.apply(this, args);
      resetTracking();
      return res;
    };
  });
  function createGetter(isReadonly = false, shallow = false) {
    return function get3(target, key, receiver) {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw" && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      const targetIsArray = isArray(target);
      if (!isReadonly && targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      const res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get", key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
        return shouldUnwrap ? res.value : res;
      }
      if (isObject(res)) {
        return isReadonly ? readonly(res) : reactive2(res);
      }
      return res;
    };
  }
  var set2 = /* @__PURE__ */ createSetter();
  var shallowSet = /* @__PURE__ */ createSetter(true);
  function createSetter(shallow = false) {
    return function set3(target, key, value, receiver) {
      let oldValue = target[key];
      if (!shallow) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
        if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      const result = Reflect.set(target, key, value, receiver);
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get: get2,
    set: set2,
    deleteProperty,
    has,
    ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set(target, key) {
      if (true) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    },
    deleteProperty(target, key) {
      if (true) {
        console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
      }
      return true;
    }
  };
  var shallowReactiveHandlers = extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  var shallowReadonlyHandlers = extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
  });
  var toReactive = (value) => isObject(value) ? reactive2(value) : value;
  var toReadonly = (value) => isObject(value) ? readonly(value) : value;
  var toShallow = (value) => value;
  var getProto = (v) => Reflect.getPrototypeOf(v);
  function get$1(target, key, isReadonly = false, isShallow = false) {
    target = target["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "get", key);
    }
    !isReadonly && track(rawTarget, "get", rawKey);
    const { has: has2 } = getProto(rawTarget);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has2.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has2.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      target.get(key);
    }
  }
  function has$1(key, isReadonly = false) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const rawKey = toRaw(key);
    if (key !== rawKey) {
      !isReadonly && track(rawTarget, "has", key);
    }
    !isReadonly && track(rawTarget, "has", rawKey);
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target, isReadonly = false) {
    target = target["__v_raw"];
    !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
  }
  function add(value) {
    value = toRaw(value);
    const target = toRaw(this);
    const proto = getProto(target);
    const hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add", value, value);
    }
    return this;
  }
  function set$1(key, value) {
    value = toRaw(value);
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set", key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    const target = toRaw(this);
    const { has: has2, get: get3 } = getProto(target);
    let hadKey = has2.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has2.call(target, key);
    } else if (true) {
      checkIdentityKeys(target, has2, key);
    }
    const oldValue = get3 ? get3.call(target, key) : void 0;
    const result = target.delete(key);
    if (hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  function clear() {
    const target = toRaw(this);
    const hadItems = target.size !== 0;
    const oldTarget = true ? isMap(target) ? new Map(target) : new Set(target) : void 0;
    const result = target.clear();
    if (hadItems) {
      trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function(...args) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const targetIsMap = isMap(rawTarget);
      const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
      const isKeyOnly = method === "keys" && targetIsMap;
      const innerIterator = target[method](...args);
      const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      return {
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        },
        [Symbol.iterator]() {
          return this;
        }
      };
    };
  }
  function createReadonlyMethod(type) {
    return function(...args) {
      if (true) {
        const key = args[0] ? `on key "${args[0]}" ` : ``;
        console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
      }
      return type === "delete" ? false : this;
    };
  }
  var mutableInstrumentations = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  var shallowInstrumentations = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  var readonlyInstrumentations = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  var shallowReadonlyInstrumentations = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  var iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations[method] = createIterableMethod(method, true, false);
    shallowInstrumentations[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
  });
  function createInstrumentationGetter(isReadonly, shallow) {
    const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return (target, key, receiver) => {
      if (key === "__v_isReactive") {
        return !isReadonly;
      } else if (key === "__v_isReadonly") {
        return isReadonly;
      } else if (key === "__v_raw") {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: createInstrumentationGetter(false, false)
  };
  var shallowCollectionHandlers = {
    get: createInstrumentationGetter(false, true)
  };
  var readonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, false)
  };
  var shallowReadonlyCollectionHandlers = {
    get: createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has2, key) {
    const rawKey = toRaw(key);
    if (rawKey !== key && has2.call(target, rawKey)) {
      const type = toRawType(target);
      console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
    }
  }
  var reactiveMap = /* @__PURE__ */ new WeakMap();
  var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
  var readonlyMap = /* @__PURE__ */ new WeakMap();
  var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function getTargetType(value) {
    return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
  }
  function reactive2(target) {
    if (target && target["__v_isReadonly"]) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (true) {
        console.warn(`value cannot be made reactive: ${String(target)}`);
      }
      return target;
    }
    if (target["__v_raw"] && !(isReadonly && target["__v_isReactive"])) {
      return target;
    }
    const existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    const targetType = getTargetType(target);
    if (targetType === 0) {
      return target;
    }
    const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function toRaw(observed) {
    return observed && toRaw(observed["__v_raw"]) || observed;
  }
  function isRef(r) {
    return Boolean(r && r.__v_isRef === true);
  }
  magic("nextTick", () => nextTick);
  magic("dispatch", (el) => dispatch.bind(dispatch, el));
  magic("watch", (el, { evaluateLater: evaluateLater2, effect: effect3 }) => (key, callback) => {
    let evaluate2 = evaluateLater2(key);
    let firstTime = true;
    let oldValue;
    let effectReference = effect3(() => evaluate2((value) => {
      JSON.stringify(value);
      if (!firstTime) {
        queueMicrotask(() => {
          callback(value, oldValue);
          oldValue = value;
        });
      } else {
        oldValue = value;
      }
      firstTime = false;
    }));
    el._x_effects.delete(effectReference);
  });
  magic("store", getStores);
  magic("data", (el) => scope(el));
  magic("root", (el) => closestRoot(el));
  magic("refs", (el) => {
    if (el._x_refs_proxy)
      return el._x_refs_proxy;
    el._x_refs_proxy = mergeProxies(getArrayOfRefObject(el));
    return el._x_refs_proxy;
  });
  function getArrayOfRefObject(el) {
    let refObjects = [];
    let currentEl = el;
    while (currentEl) {
      if (currentEl._x_refs)
        refObjects.push(currentEl._x_refs);
      currentEl = currentEl.parentNode;
    }
    return refObjects;
  }
  var globalIdMemo = {};
  function findAndIncrementId(name) {
    if (!globalIdMemo[name])
      globalIdMemo[name] = 0;
    return ++globalIdMemo[name];
  }
  function closestIdRoot(el, name) {
    return findClosest(el, (element) => {
      if (element._x_ids && element._x_ids[name])
        return true;
    });
  }
  function setIdRoot(el, name) {
    if (!el._x_ids)
      el._x_ids = {};
    if (!el._x_ids[name])
      el._x_ids[name] = findAndIncrementId(name);
  }
  magic("id", (el) => (name, key = null) => {
    let root = closestIdRoot(el, name);
    let id = root ? root._x_ids[name] : findAndIncrementId(name);
    return key ? `${name}-${id}-${key}` : `${name}-${id}`;
  });
  magic("el", (el) => el);
  warnMissingPluginMagic("Focus", "focus", "focus");
  warnMissingPluginMagic("Persist", "persist", "persist");
  function warnMissingPluginMagic(name, magicName, slug) {
    magic(magicName, (el) => warn(`You can't use [$${directiveName}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  directive("modelable", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let func = evaluateLater2(expression);
    let innerGet = () => {
      let result;
      func((i) => result = i);
      return result;
    };
    let evaluateInnerSet = evaluateLater2(`${expression} = __placeholder`);
    let innerSet = (val) => evaluateInnerSet(() => {
    }, { scope: { __placeholder: val } });
    let initialValue = innerGet();
    innerSet(initialValue);
    queueMicrotask(() => {
      if (!el._x_model)
        return;
      el._x_removeModelListeners["default"]();
      let outerGet = el._x_model.get;
      let outerSet = el._x_model.set;
      effect3(() => innerSet(outerGet()));
      effect3(() => outerSet(innerGet()));
    });
  });
  directive("teleport", (el, { expression }, { cleanup: cleanup2 }) => {
    if (el.tagName.toLowerCase() !== "template")
      warn("x-teleport can only be used on a <template> tag", el);
    let target = document.querySelector(expression);
    if (!target)
      warn(`Cannot find x-teleport element for selector: "${expression}"`);
    let clone2 = el.content.cloneNode(true).firstElementChild;
    el._x_teleport = clone2;
    clone2._x_teleportBack = el;
    if (el._x_forwardEvents) {
      el._x_forwardEvents.forEach((eventName) => {
        clone2.addEventListener(eventName, (e) => {
          e.stopPropagation();
          el.dispatchEvent(new e.constructor(e.type, e));
        });
      });
    }
    addScopeToNode(clone2, {}, el);
    mutateDom(() => {
      target.appendChild(clone2);
      initTree(clone2);
      clone2._x_ignore = true;
    });
    cleanup2(() => clone2.remove());
  });
  var handler = () => {
  };
  handler.inline = (el, { modifiers }, { cleanup: cleanup2 }) => {
    modifiers.includes("self") ? el._x_ignoreSelf = true : el._x_ignore = true;
    cleanup2(() => {
      modifiers.includes("self") ? delete el._x_ignoreSelf : delete el._x_ignore;
    });
  };
  directive("ignore", handler);
  directive("effect", (el, { expression }, { effect: effect3 }) => effect3(evaluateLater(el, expression)));
  function on(el, event, modifiers, callback) {
    let listenerTarget = el;
    let handler3 = (e) => callback(e);
    let options = {};
    let wrapHandler = (callback2, wrapper) => (e) => wrapper(callback2, e);
    if (modifiers.includes("dot"))
      event = dotSyntax(event);
    if (modifiers.includes("camel"))
      event = camelCase2(event);
    if (modifiers.includes("passive"))
      options.passive = true;
    if (modifiers.includes("capture"))
      options.capture = true;
    if (modifiers.includes("window"))
      listenerTarget = window;
    if (modifiers.includes("document"))
      listenerTarget = document;
    if (modifiers.includes("prevent"))
      handler3 = wrapHandler(handler3, (next, e) => {
        e.preventDefault();
        next(e);
      });
    if (modifiers.includes("stop"))
      handler3 = wrapHandler(handler3, (next, e) => {
        e.stopPropagation();
        next(e);
      });
    if (modifiers.includes("self"))
      handler3 = wrapHandler(handler3, (next, e) => {
        e.target === el && next(e);
      });
    if (modifiers.includes("away") || modifiers.includes("outside")) {
      listenerTarget = document;
      handler3 = wrapHandler(handler3, (next, e) => {
        if (el.contains(e.target))
          return;
        if (e.target.isConnected === false)
          return;
        if (el.offsetWidth < 1 && el.offsetHeight < 1)
          return;
        if (el._x_isShown === false)
          return;
        next(e);
      });
    }
    if (modifiers.includes("once")) {
      handler3 = wrapHandler(handler3, (next, e) => {
        next(e);
        listenerTarget.removeEventListener(event, handler3, options);
      });
    }
    handler3 = wrapHandler(handler3, (next, e) => {
      if (isKeyEvent(event)) {
        if (isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers)) {
          return;
        }
      }
      next(e);
    });
    if (modifiers.includes("debounce")) {
      let nextModifier = modifiers[modifiers.indexOf("debounce") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler3 = debounce(handler3, wait);
    }
    if (modifiers.includes("throttle")) {
      let nextModifier = modifiers[modifiers.indexOf("throttle") + 1] || "invalid-wait";
      let wait = isNumeric(nextModifier.split("ms")[0]) ? Number(nextModifier.split("ms")[0]) : 250;
      handler3 = throttle(handler3, wait);
    }
    listenerTarget.addEventListener(event, handler3, options);
    return () => {
      listenerTarget.removeEventListener(event, handler3, options);
    };
  }
  function dotSyntax(subject) {
    return subject.replace(/-/g, ".");
  }
  function camelCase2(subject) {
    return subject.toLowerCase().replace(/-(\w)/g, (match, char) => char.toUpperCase());
  }
  function isNumeric(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function kebabCase2(subject) {
    return subject.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
  }
  function isKeyEvent(event) {
    return ["keydown", "keyup"].includes(event);
  }
  function isListeningForASpecificKeyThatHasntBeenPressed(e, modifiers) {
    let keyModifiers = modifiers.filter((i) => {
      return !["window", "document", "prevent", "stop", "once"].includes(i);
    });
    if (keyModifiers.includes("debounce")) {
      let debounceIndex = keyModifiers.indexOf("debounce");
      keyModifiers.splice(debounceIndex, isNumeric((keyModifiers[debounceIndex + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (keyModifiers.length === 0)
      return false;
    if (keyModifiers.length === 1 && keyToModifiers(e.key).includes(keyModifiers[0]))
      return false;
    const systemKeyModifiers = ["ctrl", "shift", "alt", "meta", "cmd", "super"];
    const selectedSystemKeyModifiers = systemKeyModifiers.filter((modifier) => keyModifiers.includes(modifier));
    keyModifiers = keyModifiers.filter((i) => !selectedSystemKeyModifiers.includes(i));
    if (selectedSystemKeyModifiers.length > 0) {
      const activelyPressedKeyModifiers = selectedSystemKeyModifiers.filter((modifier) => {
        if (modifier === "cmd" || modifier === "super")
          modifier = "meta";
        return e[`${modifier}Key`];
      });
      if (activelyPressedKeyModifiers.length === selectedSystemKeyModifiers.length) {
        if (keyToModifiers(e.key).includes(keyModifiers[0]))
          return false;
      }
    }
    return true;
  }
  function keyToModifiers(key) {
    if (!key)
      return [];
    key = kebabCase2(key);
    let modifierToKeyMap = {
      ctrl: "control",
      slash: "/",
      space: "-",
      spacebar: "-",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      equal: "="
    };
    modifierToKeyMap[key] = key;
    return Object.keys(modifierToKeyMap).map((modifier) => {
      if (modifierToKeyMap[modifier] === key)
        return modifier;
    }).filter((modifier) => modifier);
  }
  directive("model", (el, { modifiers, expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let evaluate2 = evaluateLater(el, expression);
    let assignmentExpression = `${expression} = rightSideOfExpression($event, ${expression})`;
    let evaluateAssignment = evaluateLater(el, assignmentExpression);
    var event = el.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(el.type) || modifiers.includes("lazy") ? "change" : "input";
    let assigmentFunction = generateAssignmentFunction(el, modifiers, expression);
    let removeListener = on(el, event, modifiers, (e) => {
      evaluateAssignment(() => {
      }, { scope: {
        $event: e,
        rightSideOfExpression: assigmentFunction
      } });
    });
    if (!el._x_removeModelListeners)
      el._x_removeModelListeners = {};
    el._x_removeModelListeners["default"] = removeListener;
    cleanup2(() => el._x_removeModelListeners["default"]());
    let evaluateSetModel = evaluateLater(el, `${expression} = __placeholder`);
    el._x_model = {
      get() {
        let result;
        evaluate2((value) => result = value);
        return result;
      },
      set(value) {
        evaluateSetModel(() => {
        }, { scope: { __placeholder: value } });
      }
    };
    el._x_forceModelUpdate = () => {
      evaluate2((value) => {
        if (value === void 0 && expression.match(/\./))
          value = "";
        window.fromModel = true;
        mutateDom(() => bind(el, "value", value));
        delete window.fromModel;
      });
    };
    effect3(() => {
      if (modifiers.includes("unintrusive") && document.activeElement.isSameNode(el))
        return;
      el._x_forceModelUpdate();
    });
  });
  function generateAssignmentFunction(el, modifiers, expression) {
    if (el.type === "radio") {
      mutateDom(() => {
        if (!el.hasAttribute("name"))
          el.setAttribute("name", expression);
      });
    }
    return (event, currentValue) => {
      return mutateDom(() => {
        if (event instanceof CustomEvent && event.detail !== void 0) {
          return event.detail || event.target.value;
        } else if (el.type === "checkbox") {
          if (Array.isArray(currentValue)) {
            let newValue = modifiers.includes("number") ? safeParseNumber(event.target.value) : event.target.value;
            return event.target.checked ? currentValue.concat([newValue]) : currentValue.filter((el2) => !checkedAttrLooseCompare2(el2, newValue));
          } else {
            return event.target.checked;
          }
        } else if (el.tagName.toLowerCase() === "select" && el.multiple) {
          return modifiers.includes("number") ? Array.from(event.target.selectedOptions).map((option) => {
            let rawValue = option.value || option.text;
            return safeParseNumber(rawValue);
          }) : Array.from(event.target.selectedOptions).map((option) => {
            return option.value || option.text;
          });
        } else {
          let rawValue = event.target.value;
          return modifiers.includes("number") ? safeParseNumber(rawValue) : modifiers.includes("trim") ? rawValue.trim() : rawValue;
        }
      });
    };
  }
  function safeParseNumber(rawValue) {
    let number = rawValue ? parseFloat(rawValue) : null;
    return isNumeric2(number) ? number : rawValue;
  }
  function checkedAttrLooseCompare2(valueA, valueB) {
    return valueA == valueB;
  }
  function isNumeric2(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  directive("cloak", (el) => queueMicrotask(() => mutateDom(() => el.removeAttribute(prefix("cloak")))));
  addInitSelector(() => `[${prefix("init")}]`);
  directive("init", skipDuringClone((el, { expression }, { evaluate: evaluate2 }) => {
    if (typeof expression === "string") {
      return !!expression.trim() && evaluate2(expression, {}, false);
    }
    return evaluate2(expression, {}, false);
  }));
  directive("text", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.textContent = value;
        });
      });
    });
  });
  directive("html", (el, { expression }, { effect: effect3, evaluateLater: evaluateLater2 }) => {
    let evaluate2 = evaluateLater2(expression);
    effect3(() => {
      evaluate2((value) => {
        mutateDom(() => {
          el.innerHTML = value;
          el._x_ignoreSelf = true;
          initTree(el);
          delete el._x_ignoreSelf;
        });
      });
    });
  });
  mapAttributes(startingWith(":", into(prefix("bind:"))));
  directive("bind", (el, { value, modifiers, expression, original }, { effect: effect3 }) => {
    if (!value) {
      let bindingProviders = {};
      injectBindingProviders(bindingProviders);
      let getBindings = evaluateLater(el, expression);
      getBindings((bindings) => {
        applyBindingsObject(el, bindings, original);
      }, { scope: bindingProviders });
      return;
    }
    if (value === "key")
      return storeKeyForXFor(el, expression);
    let evaluate2 = evaluateLater(el, expression);
    effect3(() => evaluate2((result) => {
      if (result === void 0 && expression.match(/\./))
        result = "";
      mutateDom(() => bind(el, value, result, modifiers));
    }));
  });
  function storeKeyForXFor(el, expression) {
    el._x_keyExpression = expression;
  }
  addRootSelector(() => `[${prefix("data")}]`);
  directive("data", skipDuringClone((el, { expression }, { cleanup: cleanup2 }) => {
    expression = expression === "" ? "{}" : expression;
    let magicContext = {};
    let cleanup1 = injectMagics(magicContext, el).cleanup;
    let dataProviderContext = {};
    injectDataProviders(dataProviderContext, magicContext);
    let data2 = evaluate(el, expression, { scope: dataProviderContext });
    if (data2 === void 0)
      data2 = {};
    let cleanup22 = injectMagics(data2, el).cleanup;
    let reactiveData = reactive(data2);
    initInterceptors(reactiveData);
    let undo = addScopeToNode(el, reactiveData);
    reactiveData["init"] && evaluate(el, reactiveData["init"]);
    cleanup2(() => {
      undo();
      cleanup1();
      cleanup22();
      reactiveData["destroy"] && evaluate(el, reactiveData["destroy"]);
      undo();
    });
  }));
  directive("show", (el, { modifiers, expression }, { effect: effect3 }) => {
    let evaluate2 = evaluateLater(el, expression);
    if (!el._x_doHide)
      el._x_doHide = () => {
        mutateDom(() => {
          el.style.setProperty("display", "none", modifiers.includes("important") ? "important" : void 0);
        });
      };
    if (!el._x_doShow)
      el._x_doShow = () => {
        mutateDom(() => {
          if (el.style.length === 1 && el.style.display === "none") {
            el.removeAttribute("style");
          } else {
            el.style.removeProperty("display");
          }
        });
      };
    let hide = () => {
      el._x_doHide();
      el._x_isShown = false;
    };
    let show = () => {
      el._x_doShow();
      el._x_isShown = true;
    };
    let clickAwayCompatibleShow = () => setTimeout(show);
    let toggle = once((value) => value ? show() : hide(), (value) => {
      if (typeof el._x_toggleAndCascadeWithTransitions === "function") {
        el._x_toggleAndCascadeWithTransitions(el, value, show, hide);
      } else {
        value ? clickAwayCompatibleShow() : hide();
      }
    });
    let oldValue;
    let firstTime = true;
    effect3(() => evaluate2((value) => {
      if (!firstTime && value === oldValue)
        return;
      if (modifiers.includes("immediate"))
        value ? clickAwayCompatibleShow() : hide();
      toggle(value);
      oldValue = value;
      firstTime = false;
    }));
  });
  directive("for", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let iteratorNames = parseForExpression(expression);
    let evaluateItems = evaluateLater(el, iteratorNames.items);
    let evaluateKey = evaluateLater(el, el._x_keyExpression || "index");
    el._x_prevKeys = [];
    el._x_lookup = {};
    effect3(() => loop(el, iteratorNames, evaluateItems, evaluateKey));
    cleanup2(() => {
      Object.values(el._x_lookup).forEach((el2) => el2.remove());
      delete el._x_prevKeys;
      delete el._x_lookup;
    });
  });
  function loop(el, iteratorNames, evaluateItems, evaluateKey) {
    let isObject2 = (i) => typeof i === "object" && !Array.isArray(i);
    let templateEl = el;
    evaluateItems((items) => {
      if (isNumeric3(items) && items >= 0) {
        items = Array.from(Array(items).keys(), (i) => i + 1);
      }
      if (items === void 0)
        items = [];
      let lookup = el._x_lookup;
      let prevKeys = el._x_prevKeys;
      let scopes = [];
      let keys = [];
      if (isObject2(items)) {
        items = Object.entries(items).map(([key, value]) => {
          let scope2 = getIterationScopeVariables(iteratorNames, value, key, items);
          evaluateKey((value2) => keys.push(value2), { scope: { index: key, ...scope2 } });
          scopes.push(scope2);
        });
      } else {
        for (let i = 0; i < items.length; i++) {
          let scope2 = getIterationScopeVariables(iteratorNames, items[i], i, items);
          evaluateKey((value) => keys.push(value), { scope: { index: i, ...scope2 } });
          scopes.push(scope2);
        }
      }
      let adds = [];
      let moves = [];
      let removes = [];
      let sames = [];
      for (let i = 0; i < prevKeys.length; i++) {
        let key = prevKeys[i];
        if (keys.indexOf(key) === -1)
          removes.push(key);
      }
      prevKeys = prevKeys.filter((key) => !removes.includes(key));
      let lastKey = "template";
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let prevIndex = prevKeys.indexOf(key);
        if (prevIndex === -1) {
          prevKeys.splice(i, 0, key);
          adds.push([lastKey, i]);
        } else if (prevIndex !== i) {
          let keyInSpot = prevKeys.splice(i, 1)[0];
          let keyForSpot = prevKeys.splice(prevIndex - 1, 1)[0];
          prevKeys.splice(i, 0, keyForSpot);
          prevKeys.splice(prevIndex, 0, keyInSpot);
          moves.push([keyInSpot, keyForSpot]);
        } else {
          sames.push(key);
        }
        lastKey = key;
      }
      for (let i = 0; i < removes.length; i++) {
        let key = removes[i];
        if (!!lookup[key]._x_effects) {
          lookup[key]._x_effects.forEach(dequeueJob);
        }
        lookup[key].remove();
        lookup[key] = null;
        delete lookup[key];
      }
      for (let i = 0; i < moves.length; i++) {
        let [keyInSpot, keyForSpot] = moves[i];
        let elInSpot = lookup[keyInSpot];
        let elForSpot = lookup[keyForSpot];
        let marker = document.createElement("div");
        mutateDom(() => {
          elForSpot.after(marker);
          elInSpot.after(elForSpot);
          elForSpot._x_currentIfEl && elForSpot.after(elForSpot._x_currentIfEl);
          marker.before(elInSpot);
          elInSpot._x_currentIfEl && elInSpot.after(elInSpot._x_currentIfEl);
          marker.remove();
        });
        refreshScope(elForSpot, scopes[keys.indexOf(keyForSpot)]);
      }
      for (let i = 0; i < adds.length; i++) {
        let [lastKey2, index] = adds[i];
        let lastEl = lastKey2 === "template" ? templateEl : lookup[lastKey2];
        if (lastEl._x_currentIfEl)
          lastEl = lastEl._x_currentIfEl;
        let scope2 = scopes[index];
        let key = keys[index];
        let clone2 = document.importNode(templateEl.content, true).firstElementChild;
        addScopeToNode(clone2, reactive(scope2), templateEl);
        mutateDom(() => {
          lastEl.after(clone2);
          initTree(clone2);
        });
        if (typeof key === "object") {
          warn("x-for key cannot be an object, it must be a string or an integer", templateEl);
        }
        lookup[key] = clone2;
      }
      for (let i = 0; i < sames.length; i++) {
        refreshScope(lookup[sames[i]], scopes[keys.indexOf(sames[i])]);
      }
      templateEl._x_prevKeys = keys;
    });
  }
  function parseForExpression(expression) {
    let forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
    let stripParensRE = /^\s*\(|\)\s*$/g;
    let forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
    let inMatch = expression.match(forAliasRE);
    if (!inMatch)
      return;
    let res = {};
    res.items = inMatch[2].trim();
    let item = inMatch[1].replace(stripParensRE, "").trim();
    let iteratorMatch = item.match(forIteratorRE);
    if (iteratorMatch) {
      res.item = item.replace(forIteratorRE, "").trim();
      res.index = iteratorMatch[1].trim();
      if (iteratorMatch[2]) {
        res.collection = iteratorMatch[2].trim();
      }
    } else {
      res.item = item;
    }
    return res;
  }
  function getIterationScopeVariables(iteratorNames, item, index, items) {
    let scopeVariables = {};
    if (/^\[.*\]$/.test(iteratorNames.item) && Array.isArray(item)) {
      let names = iteratorNames.item.replace("[", "").replace("]", "").split(",").map((i) => i.trim());
      names.forEach((name, i) => {
        scopeVariables[name] = item[i];
      });
    } else if (/^\{.*\}$/.test(iteratorNames.item) && !Array.isArray(item) && typeof item === "object") {
      let names = iteratorNames.item.replace("{", "").replace("}", "").split(",").map((i) => i.trim());
      names.forEach((name) => {
        scopeVariables[name] = item[name];
      });
    } else {
      scopeVariables[iteratorNames.item] = item;
    }
    if (iteratorNames.index)
      scopeVariables[iteratorNames.index] = index;
    if (iteratorNames.collection)
      scopeVariables[iteratorNames.collection] = items;
    return scopeVariables;
  }
  function isNumeric3(subject) {
    return !Array.isArray(subject) && !isNaN(subject);
  }
  function handler2() {
  }
  handler2.inline = (el, { expression }, { cleanup: cleanup2 }) => {
    let root = closestRoot(el);
    if (!root._x_refs)
      root._x_refs = {};
    root._x_refs[expression] = el;
    cleanup2(() => delete root._x_refs[expression]);
  };
  directive("ref", handler2);
  directive("if", (el, { expression }, { effect: effect3, cleanup: cleanup2 }) => {
    let evaluate2 = evaluateLater(el, expression);
    let show = () => {
      if (el._x_currentIfEl)
        return el._x_currentIfEl;
      let clone2 = el.content.cloneNode(true).firstElementChild;
      addScopeToNode(clone2, {}, el);
      mutateDom(() => {
        el.after(clone2);
        initTree(clone2);
      });
      el._x_currentIfEl = clone2;
      el._x_undoIf = () => {
        walk(clone2, (node) => {
          if (!!node._x_effects) {
            node._x_effects.forEach(dequeueJob);
          }
        });
        clone2.remove();
        delete el._x_currentIfEl;
      };
      return clone2;
    };
    let hide = () => {
      if (!el._x_undoIf)
        return;
      el._x_undoIf();
      delete el._x_undoIf;
    };
    effect3(() => evaluate2((value) => {
      value ? show() : hide();
    }));
    cleanup2(() => el._x_undoIf && el._x_undoIf());
  });
  directive("id", (el, { expression }, { evaluate: evaluate2 }) => {
    let names = evaluate2(expression);
    names.forEach((name) => setIdRoot(el, name));
  });
  mapAttributes(startingWith("@", into(prefix("on:"))));
  directive("on", skipDuringClone((el, { value, modifiers, expression }, { cleanup: cleanup2 }) => {
    let evaluate2 = expression ? evaluateLater(el, expression) : () => {
    };
    if (el.tagName.toLowerCase() === "template") {
      if (!el._x_forwardEvents)
        el._x_forwardEvents = [];
      if (!el._x_forwardEvents.includes(value))
        el._x_forwardEvents.push(value);
    }
    let removeListener = on(el, value, modifiers, (e) => {
      evaluate2(() => {
      }, { scope: { $event: e }, params: [e] });
    });
    cleanup2(() => removeListener());
  }));
  warnMissingPluginDirective("Collapse", "collapse", "collapse");
  warnMissingPluginDirective("Intersect", "intersect", "intersect");
  warnMissingPluginDirective("Focus", "trap", "focus");
  warnMissingPluginDirective("Mask", "mask", "mask");
  function warnMissingPluginDirective(name, directiveName2, slug) {
    directive(directiveName2, (el) => warn(`You can't use [x-${directiveName2}] without first installing the "${name}" plugin here: https://alpinejs.dev/plugins/${slug}`, el));
  }
  alpine_default.setEvaluator(normalEvaluator);
  alpine_default.setReactivityEngine({ reactive: reactive2, effect: effect2, release: stop, raw: toRaw });
  var src_default = alpine_default;
  var module_default = src_default;

  // <stdin>
  module_default.data("searchController", newSearchController);
  module_default.data("tocController", newToCController);
  module_default.data("langController", newLangController);
  module_default.start();
})();
/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
/*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */
/*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnby1pbXA6L1VzZXJzL3Nhc2lrZXNhbmkvTGlicmFyeS9DYWNoZXMvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS9vbGl2ZXJubi9sdW5yLmpzQHYyLjMuOStpbmNvbXBhdGlibGUvbHVuci5qcyIsICJucy1odWdvLWltcDovVXNlcnMvc2FzaWtlc2FuaS9MaWJyYXJ5L0NhY2hlcy9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL2JlcC9kb2N1YXBpL3YyQHYyLjQuMi9hc3NldHMvanMvY29udHJvbGxlcnMvbGFuZy5qcyIsICJucy1odWdvLWltcDovVXNlcnMvc2FzaWtlc2FuaS9MaWJyYXJ5L0NhY2hlcy9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL2JlcC9kb2N1YXBpL3YyQHYyLjQuMi9hc3NldHMvanMvY29udHJvbGxlcnMvc2VhcmNoLWx1bnIuanMiLCAibnMtaHVnby1pbXA6L1VzZXJzL3Nhc2lrZXNhbmkvTGlicmFyeS9DYWNoZXMvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS9iZXAvZG9jdWFwaS92MkB2Mi40LjIvYXNzZXRzL2pzL2hlbHBlcnMvaGlnaGxpZ2h0LmpzIiwgIm5zLWh1Z28taW1wOi9Vc2Vycy9zYXNpa2VzYW5pL0xpYnJhcnkvQ2FjaGVzL2h1Z29fY2FjaGUvbW9kdWxlcy9maWxlY2FjaGUvbW9kdWxlcy9wa2cvbW9kL2dpdGh1Yi5jb20vYmVwL2RvY3VhcGkvdjJAdjIuNC4yL2Fzc2V0cy9qcy9jb250cm9sbGVycy90b2MuanMiLCAibnMtaHVnby1pbXA6L1VzZXJzL3Nhc2lrZXNhbmkvTGlicmFyeS9DYWNoZXMvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS9nb2h1Z29pby9odWdvLW1vZC1qc2xpYnMtZGlzdC9hbHBpbmVqcy92M0B2My4yMTAwMC4yMDMwMC9wYWNrYWdlcy9hbHBpbmVqcy9kaXN0L21vZHVsZS5lc20uanMiLCAiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBsdW5yIC0gaHR0cDovL2x1bnJqcy5jb20gLSBBIGJpdCBsaWtlIFNvbHIsIGJ1dCBtdWNoIHNtYWxsZXIgYW5kIG5vdCBhcyBicmlnaHQgLSAyLjMuOVxuICogQ29weXJpZ2h0IChDKSAyMDIwIE9saXZlciBOaWdodGluZ2FsZVxuICogQGxpY2Vuc2UgTUlUXG4gKi9cblxuOyhmdW5jdGlvbigpe1xuXG4vKipcbiAqIEEgY29udmVuaWVuY2UgZnVuY3Rpb24gZm9yIGNvbmZpZ3VyaW5nIGFuZCBjb25zdHJ1Y3RpbmdcbiAqIGEgbmV3IGx1bnIgSW5kZXguXG4gKlxuICogQSBsdW5yLkJ1aWxkZXIgaW5zdGFuY2UgaXMgY3JlYXRlZCBhbmQgdGhlIHBpcGVsaW5lIHNldHVwXG4gKiB3aXRoIGEgdHJpbW1lciwgc3RvcCB3b3JkIGZpbHRlciBhbmQgc3RlbW1lci5cbiAqXG4gKiBUaGlzIGJ1aWxkZXIgb2JqZWN0IGlzIHlpZWxkZWQgdG8gdGhlIGNvbmZpZ3VyYXRpb24gZnVuY3Rpb25cbiAqIHRoYXQgaXMgcGFzc2VkIGFzIGEgcGFyYW1ldGVyLCBhbGxvd2luZyB0aGUgbGlzdCBvZiBmaWVsZHNcbiAqIGFuZCBvdGhlciBidWlsZGVyIHBhcmFtZXRlcnMgdG8gYmUgY3VzdG9taXNlZC5cbiAqXG4gKiBBbGwgZG9jdW1lbnRzIF9tdXN0XyBiZSBhZGRlZCB3aXRoaW4gdGhlIHBhc3NlZCBjb25maWcgZnVuY3Rpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBpZHggPSBsdW5yKGZ1bmN0aW9uICgpIHtcbiAqICAgdGhpcy5maWVsZCgndGl0bGUnKVxuICogICB0aGlzLmZpZWxkKCdib2R5JylcbiAqICAgdGhpcy5yZWYoJ2lkJylcbiAqXG4gKiAgIGRvY3VtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkb2MpIHtcbiAqICAgICB0aGlzLmFkZChkb2MpXG4gKiAgIH0sIHRoaXMpXG4gKiB9KVxuICpcbiAqIEBzZWUge0BsaW5rIGx1bnIuQnVpbGRlcn1cbiAqIEBzZWUge0BsaW5rIGx1bnIuUGlwZWxpbmV9XG4gKiBAc2VlIHtAbGluayBsdW5yLnRyaW1tZXJ9XG4gKiBAc2VlIHtAbGluayBsdW5yLnN0b3BXb3JkRmlsdGVyfVxuICogQHNlZSB7QGxpbmsgbHVuci5zdGVtbWVyfVxuICogQG5hbWVzcGFjZSB7ZnVuY3Rpb259IGx1bnJcbiAqL1xudmFyIGx1bnIgPSBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHZhciBidWlsZGVyID0gbmV3IGx1bnIuQnVpbGRlclxuXG4gIGJ1aWxkZXIucGlwZWxpbmUuYWRkKFxuICAgIGx1bnIudHJpbW1lcixcbiAgICBsdW5yLnN0b3BXb3JkRmlsdGVyLFxuICAgIGx1bnIuc3RlbW1lclxuICApXG5cbiAgYnVpbGRlci5zZWFyY2hQaXBlbGluZS5hZGQoXG4gICAgbHVuci5zdGVtbWVyXG4gIClcblxuICBjb25maWcuY2FsbChidWlsZGVyLCBidWlsZGVyKVxuICByZXR1cm4gYnVpbGRlci5idWlsZCgpXG59XG5cbmx1bnIudmVyc2lvbiA9IFwiMi4zLjlcIlxuLyohXG4gKiBsdW5yLnV0aWxzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjAgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBBIG5hbWVzcGFjZSBjb250YWluaW5nIHV0aWxzIGZvciB0aGUgcmVzdCBvZiB0aGUgbHVuciBsaWJyYXJ5XG4gKiBAbmFtZXNwYWNlIGx1bnIudXRpbHNcbiAqL1xubHVuci51dGlscyA9IHt9XG5cbi8qKlxuICogUHJpbnQgYSB3YXJuaW5nIG1lc3NhZ2UgdG8gdGhlIGNvbnNvbGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIG1lc3NhZ2UgdG8gYmUgcHJpbnRlZC5cbiAqIEBtZW1iZXJPZiBsdW5yLnV0aWxzXG4gKiBAZnVuY3Rpb25cbiAqL1xubHVuci51dGlscy53YXJuID0gKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICByZXR1cm4gZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICBpZiAoZ2xvYmFsLmNvbnNvbGUgJiYgY29uc29sZS53YXJuKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSlcbiAgICB9XG4gIH1cbiAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG59KSh0aGlzKVxuXG4vKipcbiAqIENvbnZlcnQgYW4gb2JqZWN0IHRvIGEgc3RyaW5nLlxuICpcbiAqIEluIHRoZSBjYXNlIG9mIGBudWxsYCBhbmQgYHVuZGVmaW5lZGAgdGhlIGZ1bmN0aW9uIHJldHVybnNcbiAqIHRoZSBlbXB0eSBzdHJpbmcsIGluIGFsbCBvdGhlciBjYXNlcyB0aGUgcmVzdWx0IG9mIGNhbGxpbmdcbiAqIGB0b1N0cmluZ2Agb24gdGhlIHBhc3NlZCBvYmplY3QgaXMgcmV0dXJuZWQuXG4gKlxuICogQHBhcmFtIHtBbnl9IG9iaiBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgdG8gYSBzdHJpbmcuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcGFzc2VkIG9iamVjdC5cbiAqIEBtZW1iZXJPZiBsdW5yLnV0aWxzXG4gKi9cbmx1bnIudXRpbHMuYXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmIChvYmogPT09IHZvaWQgMCB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBvYmoudG9TdHJpbmcoKVxuICB9XG59XG5cbi8qKlxuICogQ2xvbmVzIGFuIG9iamVjdC5cbiAqXG4gKiBXaWxsIGNyZWF0ZSBhIGNvcHkgb2YgYW4gZXhpc3Rpbmcgb2JqZWN0IHN1Y2ggdGhhdCBhbnkgbXV0YXRpb25zXG4gKiBvbiB0aGUgY29weSBjYW5ub3QgYWZmZWN0IHRoZSBvcmlnaW5hbC5cbiAqXG4gKiBPbmx5IHNoYWxsb3cgb2JqZWN0cyBhcmUgc3VwcG9ydGVkLCBwYXNzaW5nIGEgbmVzdGVkIG9iamVjdCB0byB0aGlzXG4gKiBmdW5jdGlvbiB3aWxsIGNhdXNlIGEgVHlwZUVycm9yLlxuICpcbiAqIE9iamVjdHMgd2l0aCBwcmltaXRpdmVzLCBhbmQgYXJyYXlzIG9mIHByaW1pdGl2ZXMgYXJlIHN1cHBvcnRlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJuIHtPYmplY3R9IGEgY2xvbmUgb2YgdGhlIHBhc3NlZCBvYmplY3QuXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IHdoZW4gYSBuZXN0ZWQgb2JqZWN0IGlzIHBhc3NlZC5cbiAqIEBtZW1iZXJPZiBVdGlsc1xuICovXG5sdW5yLnV0aWxzLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG9ialxuICB9XG5cbiAgdmFyIGNsb25lID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvYmopXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV0sXG4gICAgICAgIHZhbCA9IG9ialtrZXldXG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICBjbG9uZVtrZXldID0gdmFsLnNsaWNlKClcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnIHx8XG4gICAgICAgIHR5cGVvZiB2YWwgPT09ICdudW1iZXInIHx8XG4gICAgICAgIHR5cGVvZiB2YWwgPT09ICdib29sZWFuJykge1xuICAgICAgY2xvbmVba2V5XSA9IHZhbFxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2xvbmUgaXMgbm90IGRlZXAgYW5kIGRvZXMgbm90IHN1cHBvcnQgbmVzdGVkIG9iamVjdHNcIilcbiAgfVxuXG4gIHJldHVybiBjbG9uZVxufVxubHVuci5GaWVsZFJlZiA9IGZ1bmN0aW9uIChkb2NSZWYsIGZpZWxkTmFtZSwgc3RyaW5nVmFsdWUpIHtcbiAgdGhpcy5kb2NSZWYgPSBkb2NSZWZcbiAgdGhpcy5maWVsZE5hbWUgPSBmaWVsZE5hbWVcbiAgdGhpcy5fc3RyaW5nVmFsdWUgPSBzdHJpbmdWYWx1ZVxufVxuXG5sdW5yLkZpZWxkUmVmLmpvaW5lciA9IFwiL1wiXG5cbmx1bnIuRmllbGRSZWYuZnJvbVN0cmluZyA9IGZ1bmN0aW9uIChzKSB7XG4gIHZhciBuID0gcy5pbmRleE9mKGx1bnIuRmllbGRSZWYuam9pbmVyKVxuXG4gIGlmIChuID09PSAtMSkge1xuICAgIHRocm93IFwibWFsZm9ybWVkIGZpZWxkIHJlZiBzdHJpbmdcIlxuICB9XG5cbiAgdmFyIGZpZWxkUmVmID0gcy5zbGljZSgwLCBuKSxcbiAgICAgIGRvY1JlZiA9IHMuc2xpY2UobiArIDEpXG5cbiAgcmV0dXJuIG5ldyBsdW5yLkZpZWxkUmVmIChkb2NSZWYsIGZpZWxkUmVmLCBzKVxufVxuXG5sdW5yLkZpZWxkUmVmLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuX3N0cmluZ1ZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3N0cmluZ1ZhbHVlID0gdGhpcy5maWVsZE5hbWUgKyBsdW5yLkZpZWxkUmVmLmpvaW5lciArIHRoaXMuZG9jUmVmXG4gIH1cblxuICByZXR1cm4gdGhpcy5fc3RyaW5nVmFsdWVcbn1cbi8qIVxuICogbHVuci5TZXRcbiAqIENvcHlyaWdodCAoQykgMjAyMCBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgbHVuciBzZXQuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmx1bnIuU2V0ID0gZnVuY3Rpb24gKGVsZW1lbnRzKSB7XG4gIHRoaXMuZWxlbWVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgaWYgKGVsZW1lbnRzKSB7XG4gICAgdGhpcy5sZW5ndGggPSBlbGVtZW50cy5sZW5ndGhcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5lbGVtZW50c1tlbGVtZW50c1tpXV0gPSB0cnVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMubGVuZ3RoID0gMFxuICB9XG59XG5cbi8qKlxuICogQSBjb21wbGV0ZSBzZXQgdGhhdCBjb250YWlucyBhbGwgZWxlbWVudHMuXG4gKlxuICogQHN0YXRpY1xuICogQHJlYWRvbmx5XG4gKiBAdHlwZSB7bHVuci5TZXR9XG4gKi9cbmx1bnIuU2V0LmNvbXBsZXRlID0ge1xuICBpbnRlcnNlY3Q6IGZ1bmN0aW9uIChvdGhlcikge1xuICAgIHJldHVybiBvdGhlclxuICB9LFxuXG4gIHVuaW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcblxuICBjb250YWluczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cblxuLyoqXG4gKiBBbiBlbXB0eSBzZXQgdGhhdCBjb250YWlucyBubyBlbGVtZW50cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAcmVhZG9ubHlcbiAqIEB0eXBlIHtsdW5yLlNldH1cbiAqL1xubHVuci5TZXQuZW1wdHkgPSB7XG4gIGludGVyc2VjdDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH0sXG5cbiAgdW5pb246IGZ1bmN0aW9uIChvdGhlcikge1xuICAgIHJldHVybiBvdGhlclxuICB9LFxuXG4gIGNvbnRhaW5zOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBzZXQgY29udGFpbnMgdGhlIHNwZWNpZmllZCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdCAtIE9iamVjdCB3aG9zZSBwcmVzZW5jZSBpbiB0aGlzIHNldCBpcyB0byBiZSB0ZXN0ZWQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSBUcnVlIGlmIHRoaXMgc2V0IGNvbnRhaW5zIHRoZSBzcGVjaWZpZWQgb2JqZWN0LlxuICovXG5sdW5yLlNldC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHJldHVybiAhIXRoaXMuZWxlbWVudHNbb2JqZWN0XVxufVxuXG4vKipcbiAqIFJldHVybnMgYSBuZXcgc2V0IGNvbnRhaW5pbmcgb25seSB0aGUgZWxlbWVudHMgdGhhdCBhcmUgcHJlc2VudCBpbiBib3RoXG4gKiB0aGlzIHNldCBhbmQgdGhlIHNwZWNpZmllZCBzZXQuXG4gKlxuICogQHBhcmFtIHtsdW5yLlNldH0gb3RoZXIgLSBzZXQgdG8gaW50ZXJzZWN0IHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJucyB7bHVuci5TZXR9IGEgbmV3IHNldCB0aGF0IGlzIHRoZSBpbnRlcnNlY3Rpb24gb2YgdGhpcyBhbmQgdGhlIHNwZWNpZmllZCBzZXQuXG4gKi9cblxubHVuci5TZXQucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uIChvdGhlcikge1xuICB2YXIgYSwgYiwgZWxlbWVudHMsIGludGVyc2VjdGlvbiA9IFtdXG5cbiAgaWYgKG90aGVyID09PSBsdW5yLlNldC5jb21wbGV0ZSkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpZiAob3RoZXIgPT09IGx1bnIuU2V0LmVtcHR5KSB7XG4gICAgcmV0dXJuIG90aGVyXG4gIH1cblxuICBpZiAodGhpcy5sZW5ndGggPCBvdGhlci5sZW5ndGgpIHtcbiAgICBhID0gdGhpc1xuICAgIGIgPSBvdGhlclxuICB9IGVsc2Uge1xuICAgIGEgPSBvdGhlclxuICAgIGIgPSB0aGlzXG4gIH1cblxuICBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGEuZWxlbWVudHMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBlbGVtZW50ID0gZWxlbWVudHNbaV1cbiAgICBpZiAoZWxlbWVudCBpbiBiLmVsZW1lbnRzKSB7XG4gICAgICBpbnRlcnNlY3Rpb24ucHVzaChlbGVtZW50KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgbHVuci5TZXQgKGludGVyc2VjdGlvbilcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbmV3IHNldCBjb21iaW5pbmcgdGhlIGVsZW1lbnRzIG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgc2V0LlxuICpcbiAqIEBwYXJhbSB7bHVuci5TZXR9IG90aGVyIC0gc2V0IHRvIHVuaW9uIHdpdGggdGhpcyBzZXQuXG4gKiBAcmV0dXJuIHtsdW5yLlNldH0gYSBuZXcgc2V0IHRoYXQgaXMgdGhlIHVuaW9uIG9mIHRoaXMgYW5kIHRoZSBzcGVjaWZpZWQgc2V0LlxuICovXG5cbmx1bnIuU2V0LnByb3RvdHlwZS51bmlvbiA9IGZ1bmN0aW9uIChvdGhlcikge1xuICBpZiAob3RoZXIgPT09IGx1bnIuU2V0LmNvbXBsZXRlKSB7XG4gICAgcmV0dXJuIGx1bnIuU2V0LmNvbXBsZXRlXG4gIH1cblxuICBpZiAob3RoZXIgPT09IGx1bnIuU2V0LmVtcHR5KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJldHVybiBuZXcgbHVuci5TZXQoT2JqZWN0LmtleXModGhpcy5lbGVtZW50cykuY29uY2F0KE9iamVjdC5rZXlzKG90aGVyLmVsZW1lbnRzKSkpXG59XG4vKipcbiAqIEEgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBpbnZlcnNlIGRvY3VtZW50IGZyZXF1ZW5jeSBmb3JcbiAqIGEgcG9zdGluZy4gVGhpcyBpcyBzaGFyZWQgYmV0d2VlbiB0aGUgYnVpbGRlciBhbmQgdGhlIGluZGV4XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb3N0aW5nIC0gVGhlIHBvc3RpbmcgZm9yIGEgZ2l2ZW4gdGVybVxuICogQHBhcmFtIHtudW1iZXJ9IGRvY3VtZW50Q291bnQgLSBUaGUgdG90YWwgbnVtYmVyIG9mIGRvY3VtZW50cy5cbiAqL1xubHVuci5pZGYgPSBmdW5jdGlvbiAocG9zdGluZywgZG9jdW1lbnRDb3VudCkge1xuICB2YXIgZG9jdW1lbnRzV2l0aFRlcm0gPSAwXG5cbiAgZm9yICh2YXIgZmllbGROYW1lIGluIHBvc3RpbmcpIHtcbiAgICBpZiAoZmllbGROYW1lID09ICdfaW5kZXgnKSBjb250aW51ZSAvLyBJZ25vcmUgdGhlIHRlcm0gaW5kZXgsIGl0cyBub3QgYSBmaWVsZFxuICAgIGRvY3VtZW50c1dpdGhUZXJtICs9IE9iamVjdC5rZXlzKHBvc3RpbmdbZmllbGROYW1lXSkubGVuZ3RoXG4gIH1cblxuICB2YXIgeCA9IChkb2N1bWVudENvdW50IC0gZG9jdW1lbnRzV2l0aFRlcm0gKyAwLjUpIC8gKGRvY3VtZW50c1dpdGhUZXJtICsgMC41KVxuXG4gIHJldHVybiBNYXRoLmxvZygxICsgTWF0aC5hYnMoeCkpXG59XG5cbi8qKlxuICogQSB0b2tlbiB3cmFwcyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHRva2VuXG4gKiBhcyBpdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGUgdGV4dCBwcm9jZXNzaW5nIHBpcGVsaW5lLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IFtzdHI9JyddIC0gVGhlIHN0cmluZyB0b2tlbiBiZWluZyB3cmFwcGVkLlxuICogQHBhcmFtIHtvYmplY3R9IFttZXRhZGF0YT17fV0gLSBNZXRhZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyB0b2tlbi5cbiAqL1xubHVuci5Ub2tlbiA9IGZ1bmN0aW9uIChzdHIsIG1ldGFkYXRhKSB7XG4gIHRoaXMuc3RyID0gc3RyIHx8IFwiXCJcbiAgdGhpcy5tZXRhZGF0YSA9IG1ldGFkYXRhIHx8IHt9XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdG9rZW4gc3RyaW5nIHRoYXQgaXMgYmVpbmcgd3JhcHBlZCBieSB0aGlzIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5sdW5yLlRva2VuLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuc3RyXG59XG5cbi8qKlxuICogQSB0b2tlbiB1cGRhdGUgZnVuY3Rpb24gaXMgdXNlZCB3aGVuIHVwZGF0aW5nIG9yIG9wdGlvbmFsbHlcbiAqIHdoZW4gY2xvbmluZyBhIHRva2VuLlxuICpcbiAqIEBjYWxsYmFjayBsdW5yLlRva2VufnVwZGF0ZUZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdG9rZW4uXG4gKiBAcGFyYW0ge09iamVjdH0gbWV0YWRhdGEgLSBBbGwgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoaXMgdG9rZW4uXG4gKi9cblxuLyoqXG4gKiBBcHBsaWVzIHRoZSBnaXZlbiBmdW5jdGlvbiB0byB0aGUgd3JhcHBlZCBzdHJpbmcgdG9rZW4uXG4gKlxuICogQGV4YW1wbGVcbiAqIHRva2VuLnVwZGF0ZShmdW5jdGlvbiAoc3RyLCBtZXRhZGF0YSkge1xuICogICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKClcbiAqIH0pXG4gKlxuICogQHBhcmFtIHtsdW5yLlRva2VufnVwZGF0ZUZ1bmN0aW9ufSBmbiAtIEEgZnVuY3Rpb24gdG8gYXBwbHkgdG8gdGhlIHRva2VuIHN0cmluZy5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VufVxuICovXG5sdW5yLlRva2VuLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdGhpcy5zdHIgPSBmbih0aGlzLnN0ciwgdGhpcy5tZXRhZGF0YSlcbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB0b2tlbi4gT3B0aW9uYWxseSBhIGZ1bmN0aW9uIGNhbiBiZVxuICogYXBwbGllZCB0byB0aGUgY2xvbmVkIHRva2VuLlxuICpcbiAqIEBwYXJhbSB7bHVuci5Ub2tlbn51cGRhdGVGdW5jdGlvbn0gW2ZuXSAtIEFuIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSBjbG9uZWQgdG9rZW4uXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlbn1cbiAqL1xubHVuci5Ub2tlbi5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgZm4gPSBmbiB8fCBmdW5jdGlvbiAocykgeyByZXR1cm4gcyB9XG4gIHJldHVybiBuZXcgbHVuci5Ub2tlbiAoZm4odGhpcy5zdHIsIHRoaXMubWV0YWRhdGEpLCB0aGlzLm1ldGFkYXRhKVxufVxuLyohXG4gKiBsdW5yLnRva2VuaXplclxuICogQ29weXJpZ2h0IChDKSAyMDIwIE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQSBmdW5jdGlvbiBmb3Igc3BsaXR0aW5nIGEgc3RyaW5nIGludG8gdG9rZW5zIHJlYWR5IHRvIGJlIGluc2VydGVkIGludG9cbiAqIHRoZSBzZWFyY2ggaW5kZXguIFVzZXMgYGx1bnIudG9rZW5pemVyLnNlcGFyYXRvcmAgdG8gc3BsaXQgc3RyaW5ncywgY2hhbmdlXG4gKiB0aGUgdmFsdWUgb2YgdGhpcyBwcm9wZXJ0eSB0byBjaGFuZ2UgaG93IHN0cmluZ3MgYXJlIHNwbGl0IGludG8gdG9rZW5zLlxuICpcbiAqIFRoaXMgdG9rZW5pemVyIHdpbGwgY29udmVydCBpdHMgcGFyYW1ldGVyIHRvIGEgc3RyaW5nIGJ5IGNhbGxpbmcgYHRvU3RyaW5nYCBhbmRcbiAqIHRoZW4gd2lsbCBzcGxpdCB0aGlzIHN0cmluZyBvbiB0aGUgY2hhcmFjdGVyIGluIGBsdW5yLnRva2VuaXplci5zZXBhcmF0b3JgLlxuICogQXJyYXlzIHdpbGwgaGF2ZSB0aGVpciBlbGVtZW50cyBjb252ZXJ0ZWQgdG8gc3RyaW5ncyBhbmQgd3JhcHBlZCBpbiBhIGx1bnIuVG9rZW4uXG4gKlxuICogT3B0aW9uYWwgbWV0YWRhdGEgY2FuIGJlIHBhc3NlZCB0byB0aGUgdG9rZW5pemVyLCB0aGlzIG1ldGFkYXRhIHdpbGwgYmUgY2xvbmVkIGFuZFxuICogYWRkZWQgYXMgbWV0YWRhdGEgdG8gZXZlcnkgdG9rZW4gdGhhdCBpcyBjcmVhdGVkIGZyb20gdGhlIG9iamVjdCB0byBiZSB0b2tlbml6ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQHBhcmFtIHs/KHN0cmluZ3xvYmplY3R8b2JqZWN0W10pfSBvYmogLSBUaGUgb2JqZWN0IHRvIGNvbnZlcnQgaW50byB0b2tlbnNcbiAqIEBwYXJhbSB7P29iamVjdH0gbWV0YWRhdGEgLSBPcHRpb25hbCBtZXRhZGF0YSB0byBhc3NvY2lhdGUgd2l0aCBldmVyeSB0b2tlblxuICogQHJldHVybnMge2x1bnIuVG9rZW5bXX1cbiAqIEBzZWUge0BsaW5rIGx1bnIuUGlwZWxpbmV9XG4gKi9cbmx1bnIudG9rZW5pemVyID0gZnVuY3Rpb24gKG9iaiwgbWV0YWRhdGEpIHtcbiAgaWYgKG9iaiA9PSBudWxsIHx8IG9iaiA9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAodCkge1xuICAgICAgcmV0dXJuIG5ldyBsdW5yLlRva2VuKFxuICAgICAgICBsdW5yLnV0aWxzLmFzU3RyaW5nKHQpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgIGx1bnIudXRpbHMuY2xvbmUobWV0YWRhdGEpXG4gICAgICApXG4gICAgfSlcbiAgfVxuXG4gIHZhciBzdHIgPSBvYmoudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgbGVuID0gc3RyLmxlbmd0aCxcbiAgICAgIHRva2VucyA9IFtdXG5cbiAgZm9yICh2YXIgc2xpY2VFbmQgPSAwLCBzbGljZVN0YXJ0ID0gMDsgc2xpY2VFbmQgPD0gbGVuOyBzbGljZUVuZCsrKSB7XG4gICAgdmFyIGNoYXIgPSBzdHIuY2hhckF0KHNsaWNlRW5kKSxcbiAgICAgICAgc2xpY2VMZW5ndGggPSBzbGljZUVuZCAtIHNsaWNlU3RhcnRcblxuICAgIGlmICgoY2hhci5tYXRjaChsdW5yLnRva2VuaXplci5zZXBhcmF0b3IpIHx8IHNsaWNlRW5kID09IGxlbikpIHtcblxuICAgICAgaWYgKHNsaWNlTGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgdG9rZW5NZXRhZGF0YSA9IGx1bnIudXRpbHMuY2xvbmUobWV0YWRhdGEpIHx8IHt9XG4gICAgICAgIHRva2VuTWV0YWRhdGFbXCJwb3NpdGlvblwiXSA9IFtzbGljZVN0YXJ0LCBzbGljZUxlbmd0aF1cbiAgICAgICAgdG9rZW5NZXRhZGF0YVtcImluZGV4XCJdID0gdG9rZW5zLmxlbmd0aFxuXG4gICAgICAgIHRva2Vucy5wdXNoKFxuICAgICAgICAgIG5ldyBsdW5yLlRva2VuIChcbiAgICAgICAgICAgIHN0ci5zbGljZShzbGljZVN0YXJ0LCBzbGljZUVuZCksXG4gICAgICAgICAgICB0b2tlbk1ldGFkYXRhXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHNsaWNlU3RhcnQgPSBzbGljZUVuZCArIDFcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiB0b2tlbnNcbn1cblxuLyoqXG4gKiBUaGUgc2VwYXJhdG9yIHVzZWQgdG8gc3BsaXQgYSBzdHJpbmcgaW50byB0b2tlbnMuIE92ZXJyaWRlIHRoaXMgcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBiZWhhdmlvdXIgb2ZcbiAqIGBsdW5yLnRva2VuaXplcmAgYmVoYXZpb3VyIHdoZW4gdG9rZW5pemluZyBzdHJpbmdzLiBCeSBkZWZhdWx0IHRoaXMgc3BsaXRzIG9uIHdoaXRlc3BhY2UgYW5kIGh5cGhlbnMuXG4gKlxuICogQHN0YXRpY1xuICogQHNlZSBsdW5yLnRva2VuaXplclxuICovXG5sdW5yLnRva2VuaXplci5zZXBhcmF0b3IgPSAvW1xcc1xcLV0rL1xuLyohXG4gKiBsdW5yLlBpcGVsaW5lXG4gKiBDb3B5cmlnaHQgKEMpIDIwMjAgT2xpdmVyIE5pZ2h0aW5nYWxlXG4gKi9cblxuLyoqXG4gKiBsdW5yLlBpcGVsaW5lcyBtYWludGFpbiBhbiBvcmRlcmVkIGxpc3Qgb2YgZnVuY3Rpb25zIHRvIGJlIGFwcGxpZWQgdG8gYWxsXG4gKiB0b2tlbnMgaW4gZG9jdW1lbnRzIGVudGVyaW5nIHRoZSBzZWFyY2ggaW5kZXggYW5kIHF1ZXJpZXMgYmVpbmcgcmFuIGFnYWluc3RcbiAqIHRoZSBpbmRleC5cbiAqXG4gKiBBbiBpbnN0YW5jZSBvZiBsdW5yLkluZGV4IGNyZWF0ZWQgd2l0aCB0aGUgbHVuciBzaG9ydGN1dCB3aWxsIGNvbnRhaW4gYVxuICogcGlwZWxpbmUgd2l0aCBhIHN0b3Agd29yZCBmaWx0ZXIgYW5kIGFuIEVuZ2xpc2ggbGFuZ3VhZ2Ugc3RlbW1lci4gRXh0cmFcbiAqIGZ1bmN0aW9ucyBjYW4gYmUgYWRkZWQgYmVmb3JlIG9yIGFmdGVyIGVpdGhlciBvZiB0aGVzZSBmdW5jdGlvbnMgb3IgdGhlc2VcbiAqIGRlZmF1bHQgZnVuY3Rpb25zIGNhbiBiZSByZW1vdmVkLlxuICpcbiAqIFdoZW4gcnVuIHRoZSBwaXBlbGluZSB3aWxsIGNhbGwgZWFjaCBmdW5jdGlvbiBpbiB0dXJuLCBwYXNzaW5nIGEgdG9rZW4sIHRoZVxuICogaW5kZXggb2YgdGhhdCB0b2tlbiBpbiB0aGUgb3JpZ2luYWwgbGlzdCBvZiBhbGwgdG9rZW5zIGFuZCBmaW5hbGx5IGEgbGlzdCBvZlxuICogYWxsIHRoZSBvcmlnaW5hbCB0b2tlbnMuXG4gKlxuICogVGhlIG91dHB1dCBvZiBmdW5jdGlvbnMgaW4gdGhlIHBpcGVsaW5lIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBuZXh0IGZ1bmN0aW9uXG4gKiBpbiB0aGUgcGlwZWxpbmUuIFRvIGV4Y2x1ZGUgYSB0b2tlbiBmcm9tIGVudGVyaW5nIHRoZSBpbmRleCB0aGUgZnVuY3Rpb25cbiAqIHNob3VsZCByZXR1cm4gdW5kZWZpbmVkLCB0aGUgcmVzdCBvZiB0aGUgcGlwZWxpbmUgd2lsbCBub3QgYmUgY2FsbGVkIHdpdGhcbiAqIHRoaXMgdG9rZW4uXG4gKlxuICogRm9yIHNlcmlhbGlzYXRpb24gb2YgcGlwZWxpbmVzIHRvIHdvcmssIGFsbCBmdW5jdGlvbnMgdXNlZCBpbiBhbiBpbnN0YW5jZSBvZlxuICogYSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCB3aXRoIGx1bnIuUGlwZWxpbmUuIFJlZ2lzdGVyZWQgZnVuY3Rpb25zIGNhblxuICogdGhlbiBiZSBsb2FkZWQuIElmIHRyeWluZyB0byBsb2FkIGEgc2VyaWFsaXNlZCBwaXBlbGluZSB0aGF0IHVzZXMgZnVuY3Rpb25zXG4gKiB0aGF0IGFyZSBub3QgcmVnaXN0ZXJlZCBhbiBlcnJvciB3aWxsIGJlIHRocm93bi5cbiAqXG4gKiBJZiBub3QgcGxhbm5pbmcgb24gc2VyaWFsaXNpbmcgdGhlIHBpcGVsaW5lIHRoZW4gcmVnaXN0ZXJpbmcgcGlwZWxpbmUgZnVuY3Rpb25zXG4gKiBpcyBub3QgbmVjZXNzYXJ5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlBpcGVsaW5lID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGFjayA9IFtdXG59XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJlZEZ1bmN0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuLyoqXG4gKiBBIHBpcGVsaW5lIGZ1bmN0aW9uIG1hcHMgbHVuci5Ub2tlbiB0byBsdW5yLlRva2VuLiBBIGx1bnIuVG9rZW4gY29udGFpbnMgdGhlIHRva2VuXG4gKiBzdHJpbmcgYXMgd2VsbCBhcyBhbGwga25vd24gbWV0YWRhdGEuIEEgcGlwZWxpbmUgZnVuY3Rpb24gY2FuIG11dGF0ZSB0aGUgdG9rZW4gc3RyaW5nXG4gKiBvciBtdXRhdGUgKG9yIGFkZCkgbWV0YWRhdGEgZm9yIGEgZ2l2ZW4gdG9rZW4uXG4gKlxuICogQSBwaXBlbGluZSBmdW5jdGlvbiBjYW4gaW5kaWNhdGUgdGhhdCB0aGUgcGFzc2VkIHRva2VuIHNob3VsZCBiZSBkaXNjYXJkZWQgYnkgcmV0dXJuaW5nXG4gKiBudWxsLCB1bmRlZmluZWQgb3IgYW4gZW1wdHkgc3RyaW5nLiBUaGlzIHRva2VuIHdpbGwgbm90IGJlIHBhc3NlZCB0byBhbnkgZG93bnN0cmVhbSBwaXBlbGluZVxuICogZnVuY3Rpb25zIGFuZCB3aWxsIG5vdCBiZSBhZGRlZCB0byB0aGUgaW5kZXguXG4gKlxuICogTXVsdGlwbGUgdG9rZW5zIGNhbiBiZSByZXR1cm5lZCBieSByZXR1cm5pbmcgYW4gYXJyYXkgb2YgdG9rZW5zLiBFYWNoIHRva2VuIHdpbGwgYmUgcGFzc2VkXG4gKiB0byBhbnkgZG93bnN0cmVhbSBwaXBlbGluZSBmdW5jdGlvbnMgYW5kIGFsbCB3aWxsIHJldHVybmVkIHRva2VucyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBBbnkgbnVtYmVyIG9mIHBpcGVsaW5lIGZ1bmN0aW9ucyBtYXkgYmUgY2hhaW5lZCB0b2dldGhlciB1c2luZyBhIGx1bnIuUGlwZWxpbmUuXG4gKlxuICogQGludGVyZmFjZSBsdW5yLlBpcGVsaW5lRnVuY3Rpb25cbiAqIEBwYXJhbSB7bHVuci5Ub2tlbn0gdG9rZW4gLSBBIHRva2VuIGZyb20gdGhlIGRvY3VtZW50IGJlaW5nIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpIC0gVGhlIGluZGV4IG9mIHRoaXMgdG9rZW4gaW4gdGhlIGNvbXBsZXRlIGxpc3Qgb2YgdG9rZW5zIGZvciB0aGlzIGRvY3VtZW50L2ZpZWxkLlxuICogQHBhcmFtIHtsdW5yLlRva2VuW119IHRva2VucyAtIEFsbCB0b2tlbnMgZm9yIHRoaXMgZG9jdW1lbnQvZmllbGQuXG4gKiBAcmV0dXJucyB7KD9sdW5yLlRva2VufGx1bnIuVG9rZW5bXSl9XG4gKi9cblxuLyoqXG4gKiBSZWdpc3RlciBhIGZ1bmN0aW9uIHdpdGggdGhlIHBpcGVsaW5lLlxuICpcbiAqIEZ1bmN0aW9ucyB0aGF0IGFyZSB1c2VkIGluIHRoZSBwaXBlbGluZSBzaG91bGQgYmUgcmVnaXN0ZXJlZCBpZiB0aGUgcGlwZWxpbmVcbiAqIG5lZWRzIHRvIGJlIHNlcmlhbGlzZWQsIG9yIGEgc2VyaWFsaXNlZCBwaXBlbGluZSBuZWVkcyB0byBiZSBsb2FkZWQuXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBmdW5jdGlvbiBkb2VzIG5vdCBhZGQgaXQgdG8gYSBwaXBlbGluZSwgZnVuY3Rpb25zIG11c3Qgc3RpbGwgYmVcbiAqIGFkZGVkIHRvIGluc3RhbmNlcyBvZiB0aGUgcGlwZWxpbmUgZm9yIHRoZW0gdG8gYmUgdXNlZCB3aGVuIHJ1bm5pbmcgYSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2hlY2sgZm9yLlxuICogQHBhcmFtIHtTdHJpbmd9IGxhYmVsIC0gVGhlIGxhYmVsIHRvIHJlZ2lzdGVyIHRoaXMgZnVuY3Rpb24gd2l0aFxuICovXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24gPSBmdW5jdGlvbiAoZm4sIGxhYmVsKSB7XG4gIGlmIChsYWJlbCBpbiB0aGlzLnJlZ2lzdGVyZWRGdW5jdGlvbnMpIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oJ092ZXJ3cml0aW5nIGV4aXN0aW5nIHJlZ2lzdGVyZWQgZnVuY3Rpb246ICcgKyBsYWJlbClcbiAgfVxuXG4gIGZuLmxhYmVsID0gbGFiZWxcbiAgbHVuci5QaXBlbGluZS5yZWdpc3RlcmVkRnVuY3Rpb25zW2ZuLmxhYmVsXSA9IGZuXG59XG5cbi8qKlxuICogV2FybnMgaWYgdGhlIGZ1bmN0aW9uIGlzIG5vdCByZWdpc3RlcmVkIGFzIGEgUGlwZWxpbmUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259IGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIGZvci5cbiAqIEBwcml2YXRlXG4gKi9cbmx1bnIuUGlwZWxpbmUud2FybklmRnVuY3Rpb25Ob3RSZWdpc3RlcmVkID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBpc1JlZ2lzdGVyZWQgPSBmbi5sYWJlbCAmJiAoZm4ubGFiZWwgaW4gdGhpcy5yZWdpc3RlcmVkRnVuY3Rpb25zKVxuXG4gIGlmICghaXNSZWdpc3RlcmVkKSB7XG4gICAgbHVuci51dGlscy53YXJuKCdGdW5jdGlvbiBpcyBub3QgcmVnaXN0ZXJlZCB3aXRoIHBpcGVsaW5lLiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aGVuIHNlcmlhbGlzaW5nIHRoZSBpbmRleC5cXG4nLCBmbilcbiAgfVxufVxuXG4vKipcbiAqIExvYWRzIGEgcHJldmlvdXNseSBzZXJpYWxpc2VkIHBpcGVsaW5lLlxuICpcbiAqIEFsbCBmdW5jdGlvbnMgdG8gYmUgbG9hZGVkIG11c3QgYWxyZWFkeSBiZSByZWdpc3RlcmVkIHdpdGggbHVuci5QaXBlbGluZS5cbiAqIElmIGFueSBmdW5jdGlvbiBmcm9tIHRoZSBzZXJpYWxpc2VkIGRhdGEgaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQgdGhlbiBhblxuICogZXJyb3Igd2lsbCBiZSB0aHJvd24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGlzZWQgLSBUaGUgc2VyaWFsaXNlZCBwaXBlbGluZSB0byBsb2FkLlxuICogQHJldHVybnMge2x1bnIuUGlwZWxpbmV9XG4gKi9cbmx1bnIuUGlwZWxpbmUubG9hZCA9IGZ1bmN0aW9uIChzZXJpYWxpc2VkKSB7XG4gIHZhciBwaXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG5cbiAgc2VyaWFsaXNlZC5mb3JFYWNoKGZ1bmN0aW9uIChmbk5hbWUpIHtcbiAgICB2YXIgZm4gPSBsdW5yLlBpcGVsaW5lLnJlZ2lzdGVyZWRGdW5jdGlvbnNbZm5OYW1lXVxuXG4gICAgaWYgKGZuKSB7XG4gICAgICBwaXBlbGluZS5hZGQoZm4pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGxvYWQgdW5yZWdpc3RlcmVkIGZ1bmN0aW9uOiAnICsgZm5OYW1lKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gcGlwZWxpbmVcbn1cblxuLyoqXG4gKiBBZGRzIG5ldyBmdW5jdGlvbnMgdG8gdGhlIGVuZCBvZiB0aGUgcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9uW119IGZ1bmN0aW9ucyAtIEFueSBudW1iZXIgb2YgZnVuY3Rpb25zIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGZucyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcblxuICBmbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChmbilcbiAgICB0aGlzLl9zdGFjay5wdXNoKGZuKVxuICB9LCB0aGlzKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYWZ0ZXIgYSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZVxuICogcGlwZWxpbmUuXG4gKlxuICogTG9ncyBhIHdhcm5pbmcgaWYgdGhlIGZ1bmN0aW9uIGhhcyBub3QgYmVlbiByZWdpc3RlcmVkLlxuICpcbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufSBleGlzdGluZ0ZuIC0gQSBmdW5jdGlvbiB0aGF0IGFscmVhZHkgZXhpc3RzIGluIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufSBuZXdGbiAtIFRoZSBuZXcgZnVuY3Rpb24gdG8gYWRkIHRvIHRoZSBwaXBlbGluZS5cbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUuYWZ0ZXIgPSBmdW5jdGlvbiAoZXhpc3RpbmdGbiwgbmV3Rm4pIHtcbiAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQobmV3Rm4pXG5cbiAgdmFyIHBvcyA9IHRoaXMuX3N0YWNrLmluZGV4T2YoZXhpc3RpbmdGbilcbiAgaWYgKHBvcyA9PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGZpbmQgZXhpc3RpbmdGbicpXG4gIH1cblxuICBwb3MgPSBwb3MgKyAxXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIEFkZHMgYSBzaW5nbGUgZnVuY3Rpb24gYmVmb3JlIGEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGVcbiAqIHBpcGVsaW5lLlxuICpcbiAqIExvZ3MgYSB3YXJuaW5nIGlmIHRoZSBmdW5jdGlvbiBoYXMgbm90IGJlZW4gcmVnaXN0ZXJlZC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZXhpc3RpbmdGbiAtIEEgZnVuY3Rpb24gdGhhdCBhbHJlYWR5IGV4aXN0cyBpbiB0aGUgcGlwZWxpbmUuXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gbmV3Rm4gLSBUaGUgbmV3IGZ1bmN0aW9uIHRvIGFkZCB0byB0aGUgcGlwZWxpbmUuXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLmJlZm9yZSA9IGZ1bmN0aW9uIChleGlzdGluZ0ZuLCBuZXdGbikge1xuICBsdW5yLlBpcGVsaW5lLndhcm5JZkZ1bmN0aW9uTm90UmVnaXN0ZXJlZChuZXdGbilcblxuICB2YXIgcG9zID0gdGhpcy5fc3RhY2suaW5kZXhPZihleGlzdGluZ0ZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBleGlzdGluZ0ZuJylcbiAgfVxuXG4gIHRoaXMuX3N0YWNrLnNwbGljZShwb3MsIDAsIG5ld0ZuKVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYSBmdW5jdGlvbiBmcm9tIHRoZSBwaXBlbGluZS5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuUGlwZWxpbmVGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHJlbW92ZSBmcm9tIHRoZSBwaXBlbGluZS5cbiAqL1xubHVuci5QaXBlbGluZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGZuKSB7XG4gIHZhciBwb3MgPSB0aGlzLl9zdGFjay5pbmRleE9mKGZuKVxuICBpZiAocG9zID09IC0xKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLl9zdGFjay5zcGxpY2UocG9zLCAxKVxufVxuXG4vKipcbiAqIFJ1bnMgdGhlIGN1cnJlbnQgbGlzdCBvZiBmdW5jdGlvbnMgdGhhdCBtYWtlIHVwIHRoZSBwaXBlbGluZSBhZ2FpbnN0IHRoZVxuICogcGFzc2VkIHRva2Vucy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB0b2tlbnMgVGhlIHRva2VucyB0byBydW4gdGhyb3VnaCB0aGUgcGlwZWxpbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICh0b2tlbnMpIHtcbiAgdmFyIHN0YWNrTGVuZ3RoID0gdGhpcy5fc3RhY2subGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFja0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGZuID0gdGhpcy5fc3RhY2tbaV1cbiAgICB2YXIgbWVtbyA9IFtdXG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRva2Vucy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIHJlc3VsdCA9IGZuKHRva2Vuc1tqXSwgaiwgdG9rZW5zKVxuXG4gICAgICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdm9pZCAwIHx8IHJlc3VsdCA9PT0gJycpIGNvbnRpbnVlXG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCByZXN1bHQubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICBtZW1vLnB1c2gocmVzdWx0W2tdKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZW1vLnB1c2gocmVzdWx0KVxuICAgICAgfVxuICAgIH1cblxuICAgIHRva2VucyA9IG1lbW9cbiAgfVxuXG4gIHJldHVybiB0b2tlbnNcbn1cblxuLyoqXG4gKiBDb252ZW5pZW5jZSBtZXRob2QgZm9yIHBhc3NpbmcgYSBzdHJpbmcgdGhyb3VnaCBhIHBpcGVsaW5lIGFuZCBnZXR0aW5nXG4gKiBzdHJpbmdzIG91dC4gVGhpcyBtZXRob2QgdGFrZXMgY2FyZSBvZiB3cmFwcGluZyB0aGUgcGFzc2VkIHN0cmluZyBpbiBhXG4gKiB0b2tlbiBhbmQgbWFwcGluZyB0aGUgcmVzdWx0aW5nIHRva2VucyBiYWNrIHRvIHN0cmluZ3MuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIFRoZSBzdHJpbmcgdG8gcGFzcyB0aHJvdWdoIHRoZSBwaXBlbGluZS5cbiAqIEBwYXJhbSB7P29iamVjdH0gbWV0YWRhdGEgLSBPcHRpb25hbCBtZXRhZGF0YSB0byBhc3NvY2lhdGUgd2l0aCB0aGUgdG9rZW5cbiAqIHBhc3NlZCB0byB0aGUgcGlwZWxpbmUuXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJ1blN0cmluZyA9IGZ1bmN0aW9uIChzdHIsIG1ldGFkYXRhKSB7XG4gIHZhciB0b2tlbiA9IG5ldyBsdW5yLlRva2VuIChzdHIsIG1ldGFkYXRhKVxuXG4gIHJldHVybiB0aGlzLnJ1bihbdG9rZW5dKS5tYXAoZnVuY3Rpb24gKHQpIHtcbiAgICByZXR1cm4gdC50b1N0cmluZygpXG4gIH0pXG59XG5cbi8qKlxuICogUmVzZXRzIHRoZSBwaXBlbGluZSBieSByZW1vdmluZyBhbnkgZXhpc3RpbmcgcHJvY2Vzc29ycy5cbiAqXG4gKi9cbmx1bnIuUGlwZWxpbmUucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLl9zdGFjayA9IFtdXG59XG5cbi8qKlxuICogUmV0dXJucyBhIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwaXBlbGluZSByZWFkeSBmb3Igc2VyaWFsaXNhdGlvbi5cbiAqXG4gKiBMb2dzIGEgd2FybmluZyBpZiB0aGUgZnVuY3Rpb24gaGFzIG5vdCBiZWVuIHJlZ2lzdGVyZWQuXG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5sdW5yLlBpcGVsaW5lLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLl9zdGFjay5tYXAoZnVuY3Rpb24gKGZuKSB7XG4gICAgbHVuci5QaXBlbGluZS53YXJuSWZGdW5jdGlvbk5vdFJlZ2lzdGVyZWQoZm4pXG5cbiAgICByZXR1cm4gZm4ubGFiZWxcbiAgfSlcbn1cbi8qIVxuICogbHVuci5WZWN0b3JcbiAqIENvcHlyaWdodCAoQykgMjAyMCBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgdmVjdG9yIGlzIHVzZWQgdG8gY29uc3RydWN0IHRoZSB2ZWN0b3Igc3BhY2Ugb2YgZG9jdW1lbnRzIGFuZCBxdWVyaWVzLiBUaGVzZVxuICogdmVjdG9ycyBzdXBwb3J0IG9wZXJhdGlvbnMgdG8gZGV0ZXJtaW5lIHRoZSBzaW1pbGFyaXR5IGJldHdlZW4gdHdvIGRvY3VtZW50cyBvclxuICogYSBkb2N1bWVudCBhbmQgYSBxdWVyeS5cbiAqXG4gKiBOb3JtYWxseSBubyBwYXJhbWV0ZXJzIGFyZSByZXF1aXJlZCBmb3IgaW5pdGlhbGl6aW5nIGEgdmVjdG9yLCBidXQgaW4gdGhlIGNhc2Ugb2ZcbiAqIGxvYWRpbmcgYSBwcmV2aW91c2x5IGR1bXBlZCB2ZWN0b3IgdGhlIHJhdyBlbGVtZW50cyBjYW4gYmUgcHJvdmlkZWQgdG8gdGhlIGNvbnN0cnVjdG9yLlxuICpcbiAqIEZvciBwZXJmb3JtYW5jZSByZWFzb25zIHZlY3RvcnMgYXJlIGltcGxlbWVudGVkIHdpdGggYSBmbGF0IGFycmF5LCB3aGVyZSBhbiBlbGVtZW50c1xuICogaW5kZXggaXMgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgaXRzIHZhbHVlLiBFLmcuIFtpbmRleCwgdmFsdWUsIGluZGV4LCB2YWx1ZV0uIFRoaXNcbiAqIGFsbG93cyB0aGUgdW5kZXJseWluZyBhcnJheSB0byBiZSBhcyBzcGFyc2UgYXMgcG9zc2libGUgYW5kIHN0aWxsIG9mZmVyIGRlY2VudFxuICogcGVyZm9ybWFuY2Ugd2hlbiBiZWluZyB1c2VkIGZvciB2ZWN0b3IgY2FsY3VsYXRpb25zLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtOdW1iZXJbXX0gW2VsZW1lbnRzXSAtIFRoZSBmbGF0IGxpc3Qgb2YgZWxlbWVudCBpbmRleCBhbmQgZWxlbWVudCB2YWx1ZSBwYWlycy5cbiAqL1xubHVuci5WZWN0b3IgPSBmdW5jdGlvbiAoZWxlbWVudHMpIHtcbiAgdGhpcy5fbWFnbml0dWRlID0gMFxuICB0aGlzLmVsZW1lbnRzID0gZWxlbWVudHMgfHwgW11cbn1cblxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIHBvc2l0aW9uIHdpdGhpbiB0aGUgdmVjdG9yIHRvIGluc2VydCBhIGdpdmVuIGluZGV4LlxuICpcbiAqIFRoaXMgaXMgdXNlZCBpbnRlcm5hbGx5IGJ5IGluc2VydCBhbmQgdXBzZXJ0LiBJZiB0aGVyZSBhcmUgZHVwbGljYXRlIGluZGV4ZXMgdGhlblxuICogdGhlIHBvc2l0aW9uIGlzIHJldHVybmVkIGFzIGlmIHRoZSB2YWx1ZSBmb3IgdGhhdCBpbmRleCB3ZXJlIHRvIGJlIHVwZGF0ZWQsIGJ1dCBpdFxuICogaXMgdGhlIGNhbGxlcnMgcmVzcG9uc2liaWxpdHkgdG8gY2hlY2sgd2hldGhlciB0aGVyZSBpcyBhIGR1cGxpY2F0ZSBhdCB0aGF0IGluZGV4XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGluc2VydElkeCAtIFRoZSBpbmRleCBhdCB3aGljaCB0aGUgZWxlbWVudCBzaG91bGQgYmUgaW5zZXJ0ZWQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUucG9zaXRpb25Gb3JJbmRleCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAvLyBGb3IgYW4gZW1wdHkgdmVjdG9yIHRoZSB0dXBsZSBjYW4gYmUgaW5zZXJ0ZWQgYXQgdGhlIGJlZ2lubmluZ1xuICBpZiAodGhpcy5lbGVtZW50cy5sZW5ndGggPT0gMCkge1xuICAgIHJldHVybiAwXG4gIH1cblxuICB2YXIgc3RhcnQgPSAwLFxuICAgICAgZW5kID0gdGhpcy5lbGVtZW50cy5sZW5ndGggLyAyLFxuICAgICAgc2xpY2VMZW5ndGggPSBlbmQgLSBzdGFydCxcbiAgICAgIHBpdm90UG9pbnQgPSBNYXRoLmZsb29yKHNsaWNlTGVuZ3RoIC8gMiksXG4gICAgICBwaXZvdEluZGV4ID0gdGhpcy5lbGVtZW50c1twaXZvdFBvaW50ICogMl1cblxuICB3aGlsZSAoc2xpY2VMZW5ndGggPiAxKSB7XG4gICAgaWYgKHBpdm90SW5kZXggPCBpbmRleCkge1xuICAgICAgc3RhcnQgPSBwaXZvdFBvaW50XG4gICAgfVxuXG4gICAgaWYgKHBpdm90SW5kZXggPiBpbmRleCkge1xuICAgICAgZW5kID0gcGl2b3RQb2ludFxuICAgIH1cblxuICAgIGlmIChwaXZvdEluZGV4ID09IGluZGV4KSB7XG4gICAgICBicmVha1xuICAgIH1cblxuICAgIHNsaWNlTGVuZ3RoID0gZW5kIC0gc3RhcnRcbiAgICBwaXZvdFBvaW50ID0gc3RhcnQgKyBNYXRoLmZsb29yKHNsaWNlTGVuZ3RoIC8gMilcbiAgICBwaXZvdEluZGV4ID0gdGhpcy5lbGVtZW50c1twaXZvdFBvaW50ICogMl1cbiAgfVxuXG4gIGlmIChwaXZvdEluZGV4ID09IGluZGV4KSB7XG4gICAgcmV0dXJuIHBpdm90UG9pbnQgKiAyXG4gIH1cblxuICBpZiAocGl2b3RJbmRleCA+IGluZGV4KSB7XG4gICAgcmV0dXJuIHBpdm90UG9pbnQgKiAyXG4gIH1cblxuICBpZiAocGl2b3RJbmRleCA8IGluZGV4KSB7XG4gICAgcmV0dXJuIChwaXZvdFBvaW50ICsgMSkgKiAyXG4gIH1cbn1cblxuLyoqXG4gKiBJbnNlcnRzIGFuIGVsZW1lbnQgYXQgYW4gaW5kZXggd2l0aGluIHRoZSB2ZWN0b3IuXG4gKlxuICogRG9lcyBub3QgYWxsb3cgZHVwbGljYXRlcywgd2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbHJlYWR5IGFuIGVudHJ5XG4gKiBmb3IgdGhpcyBpbmRleC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5zZXJ0SWR4IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBlbGVtZW50IHNob3VsZCBiZSBpbnNlcnRlZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWwgLSBUaGUgdmFsdWUgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgdmVjdG9yLlxuICovXG5sdW5yLlZlY3Rvci5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gKGluc2VydElkeCwgdmFsKSB7XG4gIHRoaXMudXBzZXJ0KGluc2VydElkeCwgdmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgXCJkdXBsaWNhdGUgaW5kZXhcIlxuICB9KVxufVxuXG4vKipcbiAqIEluc2VydHMgb3IgdXBkYXRlcyBhbiBleGlzdGluZyBpbmRleCB3aXRoaW4gdGhlIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaW5zZXJ0SWR4IC0gVGhlIGluZGV4IGF0IHdoaWNoIHRoZSBlbGVtZW50IHNob3VsZCBiZSBpbnNlcnRlZC5cbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWwgLSBUaGUgdmFsdWUgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgdmVjdG9yLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gLSBBIGZ1bmN0aW9uIHRoYXQgaXMgY2FsbGVkIGZvciB1cGRhdGVzLCB0aGUgZXhpc3RpbmcgdmFsdWUgYW5kIHRoZVxuICogcmVxdWVzdGVkIHZhbHVlIGFyZSBwYXNzZWQgYXMgYXJndW1lbnRzXG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS51cHNlcnQgPSBmdW5jdGlvbiAoaW5zZXJ0SWR4LCB2YWwsIGZuKSB7XG4gIHRoaXMuX21hZ25pdHVkZSA9IDBcbiAgdmFyIHBvc2l0aW9uID0gdGhpcy5wb3NpdGlvbkZvckluZGV4KGluc2VydElkeClcblxuICBpZiAodGhpcy5lbGVtZW50c1twb3NpdGlvbl0gPT0gaW5zZXJ0SWR4KSB7XG4gICAgdGhpcy5lbGVtZW50c1twb3NpdGlvbiArIDFdID0gZm4odGhpcy5lbGVtZW50c1twb3NpdGlvbiArIDFdLCB2YWwpXG4gIH0gZWxzZSB7XG4gICAgdGhpcy5lbGVtZW50cy5zcGxpY2UocG9zaXRpb24sIDAsIGluc2VydElkeCwgdmFsKVxuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbWFnbml0dWRlIG9mIHRoaXMgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLl9tYWduaXR1ZGUpIHJldHVybiB0aGlzLl9tYWduaXR1ZGVcblxuICB2YXIgc3VtT2ZTcXVhcmVzID0gMCxcbiAgICAgIGVsZW1lbnRzTGVuZ3RoID0gdGhpcy5lbGVtZW50cy5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGVsZW1lbnRzTGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIgdmFsID0gdGhpcy5lbGVtZW50c1tpXVxuICAgIHN1bU9mU3F1YXJlcyArPSB2YWwgKiB2YWxcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9tYWduaXR1ZGUgPSBNYXRoLnNxcnQoc3VtT2ZTcXVhcmVzKVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciAtIFRoZSB2ZWN0b3IgdG8gY29tcHV0ZSB0aGUgZG90IHByb2R1Y3Qgd2l0aC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gKi9cbmx1bnIuVmVjdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAob3RoZXJWZWN0b3IpIHtcbiAgdmFyIGRvdFByb2R1Y3QgPSAwLFxuICAgICAgYSA9IHRoaXMuZWxlbWVudHMsIGIgPSBvdGhlclZlY3Rvci5lbGVtZW50cyxcbiAgICAgIGFMZW4gPSBhLmxlbmd0aCwgYkxlbiA9IGIubGVuZ3RoLFxuICAgICAgYVZhbCA9IDAsIGJWYWwgPSAwLFxuICAgICAgaSA9IDAsIGogPSAwXG5cbiAgd2hpbGUgKGkgPCBhTGVuICYmIGogPCBiTGVuKSB7XG4gICAgYVZhbCA9IGFbaV0sIGJWYWwgPSBiW2pdXG4gICAgaWYgKGFWYWwgPCBiVmFsKSB7XG4gICAgICBpICs9IDJcbiAgICB9IGVsc2UgaWYgKGFWYWwgPiBiVmFsKSB7XG4gICAgICBqICs9IDJcbiAgICB9IGVsc2UgaWYgKGFWYWwgPT0gYlZhbCkge1xuICAgICAgZG90UHJvZHVjdCArPSBhW2kgKyAxXSAqIGJbaiArIDFdXG4gICAgICBpICs9IDJcbiAgICAgIGogKz0gMlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkb3RQcm9kdWN0XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc2ltaWxhcml0eSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyIHZlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVmVjdG9yfSBvdGhlclZlY3RvciAtIFRoZSBvdGhlciB2ZWN0b3IgdG8gY2FsY3VsYXRlIHRoZVxuICogc2ltaWxhcml0eSB3aXRoLlxuICogQHJldHVybnMge051bWJlcn1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnNpbWlsYXJpdHkgPSBmdW5jdGlvbiAob3RoZXJWZWN0b3IpIHtcbiAgcmV0dXJuIHRoaXMuZG90KG90aGVyVmVjdG9yKSAvIHRoaXMubWFnbml0dWRlKCkgfHwgMFxufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSB2ZWN0b3IgdG8gYW4gYXJyYXkgb2YgdGhlIGVsZW1lbnRzIHdpdGhpbiB0aGUgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJbXX1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXRwdXQgPSBuZXcgQXJyYXkgKHRoaXMuZWxlbWVudHMubGVuZ3RoIC8gMilcblxuICBmb3IgKHZhciBpID0gMSwgaiA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSArPSAyLCBqKyspIHtcbiAgICBvdXRwdXRbal0gPSB0aGlzLmVsZW1lbnRzW2ldXG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8qKlxuICogQSBKU09OIHNlcmlhbGl6YWJsZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHtOdW1iZXJbXX1cbiAqL1xubHVuci5WZWN0b3IucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuZWxlbWVudHNcbn1cbi8qIGVzbGludC1kaXNhYmxlICovXG4vKiFcbiAqIGx1bnIuc3RlbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDIwIE9saXZlciBOaWdodGluZ2FsZVxuICogSW5jbHVkZXMgY29kZSBmcm9tIC0gaHR0cDovL3RhcnRhcnVzLm9yZy9+bWFydGluL1BvcnRlclN0ZW1tZXIvanMudHh0XG4gKi9cblxuLyoqXG4gKiBsdW5yLnN0ZW1tZXIgaXMgYW4gZW5nbGlzaCBsYW5ndWFnZSBzdGVtbWVyLCB0aGlzIGlzIGEgSmF2YVNjcmlwdFxuICogaW1wbGVtZW50YXRpb24gb2YgdGhlIFBvcnRlclN0ZW1tZXIgdGFrZW4gZnJvbSBodHRwOi8vdGFydGFydXMub3JnL35tYXJ0aW5cbiAqXG4gKiBAc3RhdGljXG4gKiBAaW1wbGVtZW50cyB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufVxuICogQHBhcmFtIHtsdW5yLlRva2VufSB0b2tlbiAtIFRoZSBzdHJpbmcgdG8gc3RlbVxuICogQHJldHVybnMge2x1bnIuVG9rZW59XG4gKiBAc2VlIHtAbGluayBsdW5yLlBpcGVsaW5lfVxuICogQGZ1bmN0aW9uXG4gKi9cbmx1bnIuc3RlbW1lciA9IChmdW5jdGlvbigpe1xuICB2YXIgc3RlcDJsaXN0ID0ge1xuICAgICAgXCJhdGlvbmFsXCIgOiBcImF0ZVwiLFxuICAgICAgXCJ0aW9uYWxcIiA6IFwidGlvblwiLFxuICAgICAgXCJlbmNpXCIgOiBcImVuY2VcIixcbiAgICAgIFwiYW5jaVwiIDogXCJhbmNlXCIsXG4gICAgICBcIml6ZXJcIiA6IFwiaXplXCIsXG4gICAgICBcImJsaVwiIDogXCJibGVcIixcbiAgICAgIFwiYWxsaVwiIDogXCJhbFwiLFxuICAgICAgXCJlbnRsaVwiIDogXCJlbnRcIixcbiAgICAgIFwiZWxpXCIgOiBcImVcIixcbiAgICAgIFwib3VzbGlcIiA6IFwib3VzXCIsXG4gICAgICBcIml6YXRpb25cIiA6IFwiaXplXCIsXG4gICAgICBcImF0aW9uXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhdG9yXCIgOiBcImF0ZVwiLFxuICAgICAgXCJhbGlzbVwiIDogXCJhbFwiLFxuICAgICAgXCJpdmVuZXNzXCIgOiBcIml2ZVwiLFxuICAgICAgXCJmdWxuZXNzXCIgOiBcImZ1bFwiLFxuICAgICAgXCJvdXNuZXNzXCIgOiBcIm91c1wiLFxuICAgICAgXCJhbGl0aVwiIDogXCJhbFwiLFxuICAgICAgXCJpdml0aVwiIDogXCJpdmVcIixcbiAgICAgIFwiYmlsaXRpXCIgOiBcImJsZVwiLFxuICAgICAgXCJsb2dpXCIgOiBcImxvZ1wiXG4gICAgfSxcblxuICAgIHN0ZXAzbGlzdCA9IHtcbiAgICAgIFwiaWNhdGVcIiA6IFwiaWNcIixcbiAgICAgIFwiYXRpdmVcIiA6IFwiXCIsXG4gICAgICBcImFsaXplXCIgOiBcImFsXCIsXG4gICAgICBcImljaXRpXCIgOiBcImljXCIsXG4gICAgICBcImljYWxcIiA6IFwiaWNcIixcbiAgICAgIFwiZnVsXCIgOiBcIlwiLFxuICAgICAgXCJuZXNzXCIgOiBcIlwiXG4gICAgfSxcblxuICAgIGMgPSBcIlteYWVpb3VdXCIsICAgICAgICAgIC8vIGNvbnNvbmFudFxuICAgIHYgPSBcIlthZWlvdXldXCIsICAgICAgICAgIC8vIHZvd2VsXG4gICAgQyA9IGMgKyBcIlteYWVpb3V5XSpcIiwgICAgLy8gY29uc29uYW50IHNlcXVlbmNlXG4gICAgViA9IHYgKyBcIlthZWlvdV0qXCIsICAgICAgLy8gdm93ZWwgc2VxdWVuY2VcblxuICAgIG1ncjAgPSBcIl4oXCIgKyBDICsgXCIpP1wiICsgViArIEMsICAgICAgICAgICAgICAgLy8gW0NdVkMuLi4gaXMgbT4wXG4gICAgbWVxMSA9IFwiXihcIiArIEMgKyBcIik/XCIgKyBWICsgQyArIFwiKFwiICsgViArIFwiKT8kXCIsICAvLyBbQ11WQ1tWXSBpcyBtPTFcbiAgICBtZ3IxID0gXCJeKFwiICsgQyArIFwiKT9cIiArIFYgKyBDICsgViArIEMsICAgICAgIC8vIFtDXVZDVkMuLi4gaXMgbT4xXG4gICAgc192ID0gXCJeKFwiICsgQyArIFwiKT9cIiArIHY7ICAgICAgICAgICAgICAgICAgIC8vIHZvd2VsIGluIHN0ZW1cblxuICB2YXIgcmVfbWdyMCA9IG5ldyBSZWdFeHAobWdyMCk7XG4gIHZhciByZV9tZ3IxID0gbmV3IFJlZ0V4cChtZ3IxKTtcbiAgdmFyIHJlX21lcTEgPSBuZXcgUmVnRXhwKG1lcTEpO1xuICB2YXIgcmVfc192ID0gbmV3IFJlZ0V4cChzX3YpO1xuXG4gIHZhciByZV8xYSA9IC9eKC4rPykoc3N8aSllcyQvO1xuICB2YXIgcmUyXzFhID0gL14oLis/KShbXnNdKXMkLztcbiAgdmFyIHJlXzFiID0gL14oLis/KWVlZCQvO1xuICB2YXIgcmUyXzFiID0gL14oLis/KShlZHxpbmcpJC87XG4gIHZhciByZV8xYl8yID0gLy4kLztcbiAgdmFyIHJlMl8xYl8yID0gLyhhdHxibHxpeikkLztcbiAgdmFyIHJlM18xYl8yID0gbmV3IFJlZ0V4cChcIihbXmFlaW91eWxzel0pXFxcXDEkXCIpO1xuICB2YXIgcmU0XzFiXzIgPSBuZXcgUmVnRXhwKFwiXlwiICsgQyArIHYgKyBcIlteYWVpb3V3eHldJFwiKTtcblxuICB2YXIgcmVfMWMgPSAvXiguKz9bXmFlaW91XSl5JC87XG4gIHZhciByZV8yID0gL14oLis/KShhdGlvbmFsfHRpb25hbHxlbmNpfGFuY2l8aXplcnxibGl8YWxsaXxlbnRsaXxlbGl8b3VzbGl8aXphdGlvbnxhdGlvbnxhdG9yfGFsaXNtfGl2ZW5lc3N8ZnVsbmVzc3xvdXNuZXNzfGFsaXRpfGl2aXRpfGJpbGl0aXxsb2dpKSQvO1xuXG4gIHZhciByZV8zID0gL14oLis/KShpY2F0ZXxhdGl2ZXxhbGl6ZXxpY2l0aXxpY2FsfGZ1bHxuZXNzKSQvO1xuXG4gIHZhciByZV80ID0gL14oLis/KShhbHxhbmNlfGVuY2V8ZXJ8aWN8YWJsZXxpYmxlfGFudHxlbWVudHxtZW50fGVudHxvdXxpc218YXRlfGl0aXxvdXN8aXZlfGl6ZSkkLztcbiAgdmFyIHJlMl80ID0gL14oLis/KShzfHQpKGlvbikkLztcblxuICB2YXIgcmVfNSA9IC9eKC4rPyllJC87XG4gIHZhciByZV81XzEgPSAvbGwkLztcbiAgdmFyIHJlM181ID0gbmV3IFJlZ0V4cChcIl5cIiArIEMgKyB2ICsgXCJbXmFlaW91d3h5XSRcIik7XG5cbiAgdmFyIHBvcnRlclN0ZW1tZXIgPSBmdW5jdGlvbiBwb3J0ZXJTdGVtbWVyKHcpIHtcbiAgICB2YXIgc3RlbSxcbiAgICAgIHN1ZmZpeCxcbiAgICAgIGZpcnN0Y2gsXG4gICAgICByZSxcbiAgICAgIHJlMixcbiAgICAgIHJlMyxcbiAgICAgIHJlNDtcblxuICAgIGlmICh3Lmxlbmd0aCA8IDMpIHsgcmV0dXJuIHc7IH1cblxuICAgIGZpcnN0Y2ggPSB3LnN1YnN0cigwLDEpO1xuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b1VwcGVyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgLy8gU3RlcCAxYVxuICAgIHJlID0gcmVfMWFcbiAgICByZTIgPSByZTJfMWE7XG5cbiAgICBpZiAocmUudGVzdCh3KSkgeyB3ID0gdy5yZXBsYWNlKHJlLFwiJDEkMlwiKTsgfVxuICAgIGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7IHcgPSB3LnJlcGxhY2UocmUyLFwiJDEkMlwiKTsgfVxuXG4gICAgLy8gU3RlcCAxYlxuICAgIHJlID0gcmVfMWI7XG4gICAgcmUyID0gcmUyXzFiO1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3QoZnBbMV0pKSB7XG4gICAgICAgIHJlID0gcmVfMWJfMjtcbiAgICAgICAgdyA9IHcucmVwbGFjZShyZSxcIlwiKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJlMi50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZTIuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHJlMiA9IHJlX3NfdjtcbiAgICAgIGlmIChyZTIudGVzdChzdGVtKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgICAgcmUyID0gcmUyXzFiXzI7XG4gICAgICAgIHJlMyA9IHJlM18xYl8yO1xuICAgICAgICByZTQgPSByZTRfMWJfMjtcbiAgICAgICAgaWYgKHJlMi50ZXN0KHcpKSB7IHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgICAgZWxzZSBpZiAocmUzLnRlc3QodykpIHsgcmUgPSByZV8xYl8yOyB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpOyB9XG4gICAgICAgIGVsc2UgaWYgKHJlNC50ZXN0KHcpKSB7IHcgPSB3ICsgXCJlXCI7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDFjIC0gcmVwbGFjZSBzdWZmaXggeSBvciBZIGJ5IGkgaWYgcHJlY2VkZWQgYnkgYSBub24tdm93ZWwgd2hpY2ggaXMgbm90IHRoZSBmaXJzdCBsZXR0ZXIgb2YgdGhlIHdvcmQgKHNvIGNyeSAtPiBjcmksIGJ5IC0+IGJ5LCBzYXkgLT4gc2F5KVxuICAgIHJlID0gcmVfMWM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICB3ID0gc3RlbSArIFwiaVwiO1xuICAgIH1cblxuICAgIC8vIFN0ZXAgMlxuICAgIHJlID0gcmVfMjtcbiAgICBpZiAocmUudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUuZXhlYyh3KTtcbiAgICAgIHN0ZW0gPSBmcFsxXTtcbiAgICAgIHN1ZmZpeCA9IGZwWzJdO1xuICAgICAgcmUgPSByZV9tZ3IwO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW0gKyBzdGVwMmxpc3Rbc3VmZml4XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTdGVwIDNcbiAgICByZSA9IHJlXzM7XG4gICAgaWYgKHJlLnRlc3QodykpIHtcbiAgICAgIHZhciBmcCA9IHJlLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV07XG4gICAgICBzdWZmaXggPSBmcFsyXTtcbiAgICAgIHJlID0gcmVfbWdyMDtcbiAgICAgIGlmIChyZS50ZXN0KHN0ZW0pKSB7XG4gICAgICAgIHcgPSBzdGVtICsgc3RlcDNsaXN0W3N1ZmZpeF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA0XG4gICAgcmUgPSByZV80O1xuICAgIHJlMiA9IHJlMl80O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChyZTIudGVzdCh3KSkge1xuICAgICAgdmFyIGZwID0gcmUyLmV4ZWModyk7XG4gICAgICBzdGVtID0gZnBbMV0gKyBmcFsyXTtcbiAgICAgIHJlMiA9IHJlX21ncjE7XG4gICAgICBpZiAocmUyLnRlc3Qoc3RlbSkpIHtcbiAgICAgICAgdyA9IHN0ZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3RlcCA1XG4gICAgcmUgPSByZV81O1xuICAgIGlmIChyZS50ZXN0KHcpKSB7XG4gICAgICB2YXIgZnAgPSByZS5leGVjKHcpO1xuICAgICAgc3RlbSA9IGZwWzFdO1xuICAgICAgcmUgPSByZV9tZ3IxO1xuICAgICAgcmUyID0gcmVfbWVxMTtcbiAgICAgIHJlMyA9IHJlM181O1xuICAgICAgaWYgKHJlLnRlc3Qoc3RlbSkgfHwgKHJlMi50ZXN0KHN0ZW0pICYmICEocmUzLnRlc3Qoc3RlbSkpKSkge1xuICAgICAgICB3ID0gc3RlbTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZSA9IHJlXzVfMTtcbiAgICByZTIgPSByZV9tZ3IxO1xuICAgIGlmIChyZS50ZXN0KHcpICYmIHJlMi50ZXN0KHcpKSB7XG4gICAgICByZSA9IHJlXzFiXzI7XG4gICAgICB3ID0gdy5yZXBsYWNlKHJlLFwiXCIpO1xuICAgIH1cblxuICAgIC8vIGFuZCB0dXJuIGluaXRpYWwgWSBiYWNrIHRvIHlcblxuICAgIGlmIChmaXJzdGNoID09IFwieVwiKSB7XG4gICAgICB3ID0gZmlyc3RjaC50b0xvd2VyQ2FzZSgpICsgdy5zdWJzdHIoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHc7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICh0b2tlbikge1xuICAgIHJldHVybiB0b2tlbi51cGRhdGUocG9ydGVyU3RlbW1lcik7XG4gIH1cbn0pKCk7XG5cbmx1bnIuUGlwZWxpbmUucmVnaXN0ZXJGdW5jdGlvbihsdW5yLnN0ZW1tZXIsICdzdGVtbWVyJylcbi8qIVxuICogbHVuci5zdG9wV29yZEZpbHRlclxuICogQ29weXJpZ2h0IChDKSAyMDIwIE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyIGJ1aWxkcyBhIHN0b3BXb3JkRmlsdGVyIGZ1bmN0aW9uIGZyb20gdGhlIHByb3ZpZGVkXG4gKiBsaXN0IG9mIHN0b3Agd29yZHMuXG4gKlxuICogVGhlIGJ1aWx0IGluIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYnVpbHQgdXNpbmcgdGhpcyBnZW5lcmF0b3IgYW5kIGNhbiBiZSB1c2VkXG4gKiB0byBnZW5lcmF0ZSBjdXN0b20gc3RvcFdvcmRGaWx0ZXJzIGZvciBhcHBsaWNhdGlvbnMgb3Igbm9uIEVuZ2xpc2ggbGFuZ3VhZ2VzLlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtBcnJheX0gdG9rZW4gVGhlIHRva2VuIHRvIHBhc3MgdGhyb3VnaCB0aGUgZmlsdGVyXG4gKiBAcmV0dXJucyB7bHVuci5QaXBlbGluZUZ1bmN0aW9ufVxuICogQHNlZSBsdW5yLlBpcGVsaW5lXG4gKiBAc2VlIGx1bnIuc3RvcFdvcmRGaWx0ZXJcbiAqL1xubHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyID0gZnVuY3Rpb24gKHN0b3BXb3Jkcykge1xuICB2YXIgd29yZHMgPSBzdG9wV29yZHMucmVkdWNlKGZ1bmN0aW9uIChtZW1vLCBzdG9wV29yZCkge1xuICAgIG1lbW9bc3RvcFdvcmRdID0gc3RvcFdvcmRcbiAgICByZXR1cm4gbWVtb1xuICB9LCB7fSlcblxuICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgaWYgKHRva2VuICYmIHdvcmRzW3Rva2VuLnRvU3RyaW5nKCldICE9PSB0b2tlbi50b1N0cmluZygpKSByZXR1cm4gdG9rZW5cbiAgfVxufVxuXG4vKipcbiAqIGx1bnIuc3RvcFdvcmRGaWx0ZXIgaXMgYW4gRW5nbGlzaCBsYW5ndWFnZSBzdG9wIHdvcmQgbGlzdCBmaWx0ZXIsIGFueSB3b3Jkc1xuICogY29udGFpbmVkIGluIHRoZSBsaXN0IHdpbGwgbm90IGJlIHBhc3NlZCB0aHJvdWdoIHRoZSBmaWx0ZXIuXG4gKlxuICogVGhpcyBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGluIHRoZSBQaXBlbGluZS4gSWYgdGhlIHRva2VuIGRvZXMgbm90IHBhc3MgdGhlXG4gKiBmaWx0ZXIgdGhlbiB1bmRlZmluZWQgd2lsbCBiZSByZXR1cm5lZC5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBpbXBsZW1lbnRzIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259XG4gKiBAcGFyYW1zIHtsdW5yLlRva2VufSB0b2tlbiAtIEEgdG9rZW4gdG8gY2hlY2sgZm9yIGJlaW5nIGEgc3RvcCB3b3JkLlxuICogQHJldHVybnMge2x1bnIuVG9rZW59XG4gKiBAc2VlIHtAbGluayBsdW5yLlBpcGVsaW5lfVxuICovXG5sdW5yLnN0b3BXb3JkRmlsdGVyID0gbHVuci5nZW5lcmF0ZVN0b3BXb3JkRmlsdGVyKFtcbiAgJ2EnLFxuICAnYWJsZScsXG4gICdhYm91dCcsXG4gICdhY3Jvc3MnLFxuICAnYWZ0ZXInLFxuICAnYWxsJyxcbiAgJ2FsbW9zdCcsXG4gICdhbHNvJyxcbiAgJ2FtJyxcbiAgJ2Ftb25nJyxcbiAgJ2FuJyxcbiAgJ2FuZCcsXG4gICdhbnknLFxuICAnYXJlJyxcbiAgJ2FzJyxcbiAgJ2F0JyxcbiAgJ2JlJyxcbiAgJ2JlY2F1c2UnLFxuICAnYmVlbicsXG4gICdidXQnLFxuICAnYnknLFxuICAnY2FuJyxcbiAgJ2Nhbm5vdCcsXG4gICdjb3VsZCcsXG4gICdkZWFyJyxcbiAgJ2RpZCcsXG4gICdkbycsXG4gICdkb2VzJyxcbiAgJ2VpdGhlcicsXG4gICdlbHNlJyxcbiAgJ2V2ZXInLFxuICAnZXZlcnknLFxuICAnZm9yJyxcbiAgJ2Zyb20nLFxuICAnZ2V0JyxcbiAgJ2dvdCcsXG4gICdoYWQnLFxuICAnaGFzJyxcbiAgJ2hhdmUnLFxuICAnaGUnLFxuICAnaGVyJyxcbiAgJ2hlcnMnLFxuICAnaGltJyxcbiAgJ2hpcycsXG4gICdob3cnLFxuICAnaG93ZXZlcicsXG4gICdpJyxcbiAgJ2lmJyxcbiAgJ2luJyxcbiAgJ2ludG8nLFxuICAnaXMnLFxuICAnaXQnLFxuICAnaXRzJyxcbiAgJ2p1c3QnLFxuICAnbGVhc3QnLFxuICAnbGV0JyxcbiAgJ2xpa2UnLFxuICAnbGlrZWx5JyxcbiAgJ21heScsXG4gICdtZScsXG4gICdtaWdodCcsXG4gICdtb3N0JyxcbiAgJ211c3QnLFxuICAnbXknLFxuICAnbmVpdGhlcicsXG4gICdubycsXG4gICdub3InLFxuICAnbm90JyxcbiAgJ29mJyxcbiAgJ29mZicsXG4gICdvZnRlbicsXG4gICdvbicsXG4gICdvbmx5JyxcbiAgJ29yJyxcbiAgJ290aGVyJyxcbiAgJ291cicsXG4gICdvd24nLFxuICAncmF0aGVyJyxcbiAgJ3NhaWQnLFxuICAnc2F5JyxcbiAgJ3NheXMnLFxuICAnc2hlJyxcbiAgJ3Nob3VsZCcsXG4gICdzaW5jZScsXG4gICdzbycsXG4gICdzb21lJyxcbiAgJ3RoYW4nLFxuICAndGhhdCcsXG4gICd0aGUnLFxuICAndGhlaXInLFxuICAndGhlbScsXG4gICd0aGVuJyxcbiAgJ3RoZXJlJyxcbiAgJ3RoZXNlJyxcbiAgJ3RoZXknLFxuICAndGhpcycsXG4gICd0aXMnLFxuICAndG8nLFxuICAndG9vJyxcbiAgJ3R3YXMnLFxuICAndXMnLFxuICAnd2FudHMnLFxuICAnd2FzJyxcbiAgJ3dlJyxcbiAgJ3dlcmUnLFxuICAnd2hhdCcsXG4gICd3aGVuJyxcbiAgJ3doZXJlJyxcbiAgJ3doaWNoJyxcbiAgJ3doaWxlJyxcbiAgJ3dobycsXG4gICd3aG9tJyxcbiAgJ3doeScsXG4gICd3aWxsJyxcbiAgJ3dpdGgnLFxuICAnd291bGQnLFxuICAneWV0JyxcbiAgJ3lvdScsXG4gICd5b3VyJ1xuXSlcblxubHVuci5QaXBlbGluZS5yZWdpc3RlckZ1bmN0aW9uKGx1bnIuc3RvcFdvcmRGaWx0ZXIsICdzdG9wV29yZEZpbHRlcicpXG4vKiFcbiAqIGx1bnIudHJpbW1lclxuICogQ29weXJpZ2h0IChDKSAyMDIwIE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogbHVuci50cmltbWVyIGlzIGEgcGlwZWxpbmUgZnVuY3Rpb24gZm9yIHRyaW1taW5nIG5vbiB3b3JkXG4gKiBjaGFyYWN0ZXJzIGZyb20gdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIHRva2VucyBiZWZvcmUgdGhleVxuICogZW50ZXIgdGhlIGluZGV4LlxuICpcbiAqIFRoaXMgaW1wbGVtZW50YXRpb24gbWF5IG5vdCB3b3JrIGNvcnJlY3RseSBmb3Igbm9uIGxhdGluXG4gKiBjaGFyYWN0ZXJzIGFuZCBzaG91bGQgZWl0aGVyIGJlIHJlbW92ZWQgb3IgYWRhcHRlZCBmb3IgdXNlXG4gKiB3aXRoIGxhbmd1YWdlcyB3aXRoIG5vbi1sYXRpbiBjaGFyYWN0ZXJzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBpbXBsZW1lbnRzIHtsdW5yLlBpcGVsaW5lRnVuY3Rpb259XG4gKiBAcGFyYW0ge2x1bnIuVG9rZW59IHRva2VuIFRoZSB0b2tlbiB0byBwYXNzIHRocm91Z2ggdGhlIGZpbHRlclxuICogQHJldHVybnMge2x1bnIuVG9rZW59XG4gKiBAc2VlIGx1bnIuUGlwZWxpbmVcbiAqL1xubHVuci50cmltbWVyID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gIHJldHVybiB0b2tlbi51cGRhdGUoZnVuY3Rpb24gKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9eXFxXKy8sICcnKS5yZXBsYWNlKC9cXFcrJC8sICcnKVxuICB9KVxufVxuXG5sdW5yLlBpcGVsaW5lLnJlZ2lzdGVyRnVuY3Rpb24obHVuci50cmltbWVyLCAndHJpbW1lcicpXG4vKiFcbiAqIGx1bnIuVG9rZW5TZXRcbiAqIENvcHlyaWdodCAoQykgMjAyMCBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIEEgdG9rZW4gc2V0IGlzIHVzZWQgdG8gc3RvcmUgdGhlIHVuaXF1ZSBsaXN0IG9mIGFsbCB0b2tlbnNcbiAqIHdpdGhpbiBhbiBpbmRleC4gVG9rZW4gc2V0cyBhcmUgYWxzbyB1c2VkIHRvIHJlcHJlc2VudCBhblxuICogaW5jb21pbmcgcXVlcnkgdG8gdGhlIGluZGV4LCB0aGlzIHF1ZXJ5IHRva2VuIHNldCBhbmQgaW5kZXhcbiAqIHRva2VuIHNldCBhcmUgdGhlbiBpbnRlcnNlY3RlZCB0byBmaW5kIHdoaWNoIHRva2VucyB0byBsb29rXG4gKiB1cCBpbiB0aGUgaW52ZXJ0ZWQgaW5kZXguXG4gKlxuICogQSB0b2tlbiBzZXQgY2FuIGhvbGQgbXVsdGlwbGUgdG9rZW5zLCBhcyBpbiB0aGUgY2FzZSBvZiB0aGVcbiAqIGluZGV4IHRva2VuIHNldCwgb3IgaXQgY2FuIGhvbGQgYSBzaW5nbGUgdG9rZW4gYXMgaW4gdGhlXG4gKiBjYXNlIG9mIGEgc2ltcGxlIHF1ZXJ5IHRva2VuIHNldC5cbiAqXG4gKiBBZGRpdGlvbmFsbHkgdG9rZW4gc2V0cyBhcmUgdXNlZCB0byBwZXJmb3JtIHdpbGRjYXJkIG1hdGNoaW5nLlxuICogTGVhZGluZywgY29udGFpbmVkIGFuZCB0cmFpbGluZyB3aWxkY2FyZHMgYXJlIHN1cHBvcnRlZCwgYW5kXG4gKiBmcm9tIHRoaXMgZWRpdCBkaXN0YW5jZSBtYXRjaGluZyBjYW4gYWxzbyBiZSBwcm92aWRlZC5cbiAqXG4gKiBUb2tlbiBzZXRzIGFyZSBpbXBsZW1lbnRlZCBhcyBhIG1pbmltYWwgZmluaXRlIHN0YXRlIGF1dG9tYXRhLFxuICogd2hlcmUgYm90aCBjb21tb24gcHJlZml4ZXMgYW5kIHN1ZmZpeGVzIGFyZSBzaGFyZWQgYmV0d2VlbiB0b2tlbnMuXG4gKiBUaGlzIGhlbHBzIHRvIHJlZHVjZSB0aGUgc3BhY2UgdXNlZCBmb3Igc3RvcmluZyB0aGUgdG9rZW4gc2V0LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5sdW5yLlRva2VuU2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZpbmFsID0gZmFsc2VcbiAgdGhpcy5lZGdlcyA9IHt9XG4gIHRoaXMuaWQgPSBsdW5yLlRva2VuU2V0Ll9uZXh0SWRcbiAgbHVuci5Ub2tlblNldC5fbmV4dElkICs9IDFcbn1cblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgbmV4dCwgYXV0byBpbmNyZW1lbnQsIGlkZW50aWZpZXIgdG8gYXNzaWduXG4gKiB0byBhIG5ldyB0b2tlblNldC5cbiAqXG4gKiBUb2tlblNldHMgcmVxdWlyZSBhIHVuaXF1ZSBpZGVudGlmaWVyIHRvIGJlIGNvcnJlY3RseSBtaW5pbWlzZWQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xubHVuci5Ub2tlblNldC5fbmV4dElkID0gMVxuXG4vKipcbiAqIENyZWF0ZXMgYSBUb2tlblNldCBpbnN0YW5jZSBmcm9tIHRoZSBnaXZlbiBzb3J0ZWQgYXJyYXkgb2Ygd29yZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmdbXX0gYXJyIC0gQSBzb3J0ZWQgYXJyYXkgb2Ygc3RyaW5ncyB0byBjcmVhdGUgdGhlIHNldCBmcm9tLlxuICogQHJldHVybnMge2x1bnIuVG9rZW5TZXR9XG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGlucHV0IGFycmF5IGlzIG5vdCBzb3J0ZWQuXG4gKi9cbmx1bnIuVG9rZW5TZXQuZnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuICB2YXIgYnVpbGRlciA9IG5ldyBsdW5yLlRva2VuU2V0LkJ1aWxkZXJcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgYnVpbGRlci5pbnNlcnQoYXJyW2ldKVxuICB9XG5cbiAgYnVpbGRlci5maW5pc2goKVxuICByZXR1cm4gYnVpbGRlci5yb290XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRva2VuIHNldCBmcm9tIGEgcXVlcnkgY2xhdXNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gY2xhdXNlIC0gQSBzaW5nbGUgY2xhdXNlIGZyb20gbHVuci5RdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGF1c2UudGVybSAtIFRoZSBxdWVyeSBjbGF1c2UgdGVybS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbY2xhdXNlLmVkaXREaXN0YW5jZV0gLSBUaGUgb3B0aW9uYWwgZWRpdCBkaXN0YW5jZSBmb3IgdGhlIHRlcm0uXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblNldH1cbiAqL1xubHVuci5Ub2tlblNldC5mcm9tQ2xhdXNlID0gZnVuY3Rpb24gKGNsYXVzZSkge1xuICBpZiAoJ2VkaXREaXN0YW5jZScgaW4gY2xhdXNlKSB7XG4gICAgcmV0dXJuIGx1bnIuVG9rZW5TZXQuZnJvbUZ1enp5U3RyaW5nKGNsYXVzZS50ZXJtLCBjbGF1c2UuZWRpdERpc3RhbmNlKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBsdW5yLlRva2VuU2V0LmZyb21TdHJpbmcoY2xhdXNlLnRlcm0pXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdG9rZW4gc2V0IHJlcHJlc2VudGluZyBhIHNpbmdsZSBzdHJpbmcgd2l0aCBhIHNwZWNpZmllZFxuICogZWRpdCBkaXN0YW5jZS5cbiAqXG4gKiBJbnNlcnRpb25zLCBkZWxldGlvbnMsIHN1YnN0aXR1dGlvbnMgYW5kIHRyYW5zcG9zaXRpb25zIGFyZSBlYWNoXG4gKiB0cmVhdGVkIGFzIGFuIGVkaXQgZGlzdGFuY2Ugb2YgMS5cbiAqXG4gKiBJbmNyZWFzaW5nIHRoZSBhbGxvd2VkIGVkaXQgZGlzdGFuY2Ugd2lsbCBoYXZlIGEgZHJhbWF0aWMgaW1wYWN0XG4gKiBvbiB0aGUgcGVyZm9ybWFuY2Ugb2YgYm90aCBjcmVhdGluZyBhbmQgaW50ZXJzZWN0aW5nIHRoZXNlIFRva2VuU2V0cy5cbiAqIEl0IGlzIGFkdmlzZWQgdG8ga2VlcCB0aGUgZWRpdCBkaXN0YW5jZSBsZXNzIHRoYW4gMy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIC0gVGhlIHN0cmluZyB0byBjcmVhdGUgdGhlIHRva2VuIHNldCBmcm9tLlxuICogQHBhcmFtIHtudW1iZXJ9IGVkaXREaXN0YW5jZSAtIFRoZSBhbGxvd2VkIGVkaXQgZGlzdGFuY2UgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7bHVuci5WZWN0b3J9XG4gKi9cbmx1bnIuVG9rZW5TZXQuZnJvbUZ1enp5U3RyaW5nID0gZnVuY3Rpb24gKHN0ciwgZWRpdERpc3RhbmNlKSB7XG4gIHZhciByb290ID0gbmV3IGx1bnIuVG9rZW5TZXRcblxuICB2YXIgc3RhY2sgPSBbe1xuICAgIG5vZGU6IHJvb3QsXG4gICAgZWRpdHNSZW1haW5pbmc6IGVkaXREaXN0YW5jZSxcbiAgICBzdHI6IHN0clxuICB9XVxuXG4gIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICB2YXIgZnJhbWUgPSBzdGFjay5wb3AoKVxuXG4gICAgLy8gbm8gZWRpdFxuICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGNoYXIgPSBmcmFtZS5zdHIuY2hhckF0KDApLFxuICAgICAgICAgIG5vRWRpdE5vZGVcblxuICAgICAgaWYgKGNoYXIgaW4gZnJhbWUubm9kZS5lZGdlcykge1xuICAgICAgICBub0VkaXROb2RlID0gZnJhbWUubm9kZS5lZGdlc1tjaGFyXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9FZGl0Tm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgIGZyYW1lLm5vZGUuZWRnZXNbY2hhcl0gPSBub0VkaXROb2RlXG4gICAgICB9XG5cbiAgICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID09IDEpIHtcbiAgICAgICAgbm9FZGl0Tm9kZS5maW5hbCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgIG5vZGU6IG5vRWRpdE5vZGUsXG4gICAgICAgIGVkaXRzUmVtYWluaW5nOiBmcmFtZS5lZGl0c1JlbWFpbmluZyxcbiAgICAgICAgc3RyOiBmcmFtZS5zdHIuc2xpY2UoMSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKGZyYW1lLmVkaXRzUmVtYWluaW5nID09IDApIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgLy8gaW5zZXJ0aW9uXG4gICAgaWYgKFwiKlwiIGluIGZyYW1lLm5vZGUuZWRnZXMpIHtcbiAgICAgIHZhciBpbnNlcnRpb25Ob2RlID0gZnJhbWUubm9kZS5lZGdlc1tcIipcIl1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGluc2VydGlvbk5vZGUgPSBuZXcgbHVuci5Ub2tlblNldFxuICAgICAgZnJhbWUubm9kZS5lZGdlc1tcIipcIl0gPSBpbnNlcnRpb25Ob2RlXG4gICAgfVxuXG4gICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPT0gMCkge1xuICAgICAgaW5zZXJ0aW9uTm9kZS5maW5hbCA9IHRydWVcbiAgICB9XG5cbiAgICBzdGFjay5wdXNoKHtcbiAgICAgIG5vZGU6IGluc2VydGlvbk5vZGUsXG4gICAgICBlZGl0c1JlbWFpbmluZzogZnJhbWUuZWRpdHNSZW1haW5pbmcgLSAxLFxuICAgICAgc3RyOiBmcmFtZS5zdHJcbiAgICB9KVxuXG4gICAgLy8gZGVsZXRpb25cbiAgICAvLyBjYW4gb25seSBkbyBhIGRlbGV0aW9uIGlmIHdlIGhhdmUgZW5vdWdoIGVkaXRzIHJlbWFpbmluZ1xuICAgIC8vIGFuZCBpZiB0aGVyZSBhcmUgY2hhcmFjdGVycyBsZWZ0IHRvIGRlbGV0ZSBpbiB0aGUgc3RyaW5nXG4gICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPiAxKSB7XG4gICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgbm9kZTogZnJhbWUubm9kZSxcbiAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nIC0gMSxcbiAgICAgICAgc3RyOiBmcmFtZS5zdHIuc2xpY2UoMSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gZGVsZXRpb25cbiAgICAvLyBqdXN0IHJlbW92aW5nIHRoZSBsYXN0IGNoYXJhY3RlciBmcm9tIHRoZSBzdHJcbiAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA9PSAxKSB7XG4gICAgICBmcmFtZS5ub2RlLmZpbmFsID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIHN1YnN0aXR1dGlvblxuICAgIC8vIGNhbiBvbmx5IGRvIGEgc3Vic3RpdHV0aW9uIGlmIHdlIGhhdmUgZW5vdWdoIGVkaXRzIHJlbWFpbmluZ1xuICAgIC8vIGFuZCBpZiB0aGVyZSBhcmUgY2hhcmFjdGVycyBsZWZ0IHRvIHN1YnN0aXR1dGVcbiAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA+PSAxKSB7XG4gICAgICBpZiAoXCIqXCIgaW4gZnJhbWUubm9kZS5lZGdlcykge1xuICAgICAgICB2YXIgc3Vic3RpdHV0aW9uTm9kZSA9IGZyYW1lLm5vZGUuZWRnZXNbXCIqXCJdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc3Vic3RpdHV0aW9uTm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgIGZyYW1lLm5vZGUuZWRnZXNbXCIqXCJdID0gc3Vic3RpdHV0aW9uTm9kZVxuICAgICAgfVxuXG4gICAgICBpZiAoZnJhbWUuc3RyLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIHN1YnN0aXR1dGlvbk5vZGUuZmluYWwgPSB0cnVlXG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2goe1xuICAgICAgICBub2RlOiBzdWJzdGl0dXRpb25Ob2RlLFxuICAgICAgICBlZGl0c1JlbWFpbmluZzogZnJhbWUuZWRpdHNSZW1haW5pbmcgLSAxLFxuICAgICAgICBzdHI6IGZyYW1lLnN0ci5zbGljZSgxKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyB0cmFuc3Bvc2l0aW9uXG4gICAgLy8gY2FuIG9ubHkgZG8gYSB0cmFuc3Bvc2l0aW9uIGlmIHRoZXJlIGFyZSBlZGl0cyByZW1haW5pbmdcbiAgICAvLyBhbmQgdGhlcmUgYXJlIGVub3VnaCBjaGFyYWN0ZXJzIHRvIHRyYW5zcG9zZVxuICAgIGlmIChmcmFtZS5zdHIubGVuZ3RoID4gMSkge1xuICAgICAgdmFyIGNoYXJBID0gZnJhbWUuc3RyLmNoYXJBdCgwKSxcbiAgICAgICAgICBjaGFyQiA9IGZyYW1lLnN0ci5jaGFyQXQoMSksXG4gICAgICAgICAgdHJhbnNwb3NlTm9kZVxuXG4gICAgICBpZiAoY2hhckIgaW4gZnJhbWUubm9kZS5lZGdlcykge1xuICAgICAgICB0cmFuc3Bvc2VOb2RlID0gZnJhbWUubm9kZS5lZGdlc1tjaGFyQl1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zcG9zZU5vZGUgPSBuZXcgbHVuci5Ub2tlblNldFxuICAgICAgICBmcmFtZS5ub2RlLmVkZ2VzW2NoYXJCXSA9IHRyYW5zcG9zZU5vZGVcbiAgICAgIH1cblxuICAgICAgaWYgKGZyYW1lLnN0ci5sZW5ndGggPT0gMSkge1xuICAgICAgICB0cmFuc3Bvc2VOb2RlLmZpbmFsID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBzdGFjay5wdXNoKHtcbiAgICAgICAgbm9kZTogdHJhbnNwb3NlTm9kZSxcbiAgICAgICAgZWRpdHNSZW1haW5pbmc6IGZyYW1lLmVkaXRzUmVtYWluaW5nIC0gMSxcbiAgICAgICAgc3RyOiBjaGFyQSArIGZyYW1lLnN0ci5zbGljZSgyKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcm9vdFxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBUb2tlblNldCBmcm9tIGEgc3RyaW5nLlxuICpcbiAqIFRoZSBzdHJpbmcgbWF5IGNvbnRhaW4gb25lIG9yIG1vcmUgd2lsZGNhcmQgY2hhcmFjdGVycyAoKilcbiAqIHRoYXQgd2lsbCBhbGxvdyB3aWxkY2FyZCBtYXRjaGluZyB3aGVuIGludGVyc2VjdGluZyB3aXRoXG4gKiBhbm90aGVyIFRva2VuU2V0LlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGNyZWF0ZSBhIFRva2VuU2V0IGZyb20uXG4gKiBAcmV0dXJucyB7bHVuci5Ub2tlblNldH1cbiAqL1xubHVuci5Ub2tlblNldC5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuICB2YXIgbm9kZSA9IG5ldyBsdW5yLlRva2VuU2V0LFxuICAgICAgcm9vdCA9IG5vZGVcblxuICAvKlxuICAgKiBJdGVyYXRlcyB0aHJvdWdoIGFsbCBjaGFyYWN0ZXJzIHdpdGhpbiB0aGUgcGFzc2VkIHN0cmluZ1xuICAgKiBhcHBlbmRpbmcgYSBub2RlIGZvciBlYWNoIGNoYXJhY3Rlci5cbiAgICpcbiAgICogV2hlbiBhIHdpbGRjYXJkIGNoYXJhY3RlciBpcyBmb3VuZCB0aGVuIGEgc2VsZlxuICAgKiByZWZlcmVuY2luZyBlZGdlIGlzIGludHJvZHVjZWQgdG8gY29udGludWFsbHkgbWF0Y2hcbiAgICogYW55IG51bWJlciBvZiBhbnkgY2hhcmFjdGVycy5cbiAgICovXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgY2hhciA9IHN0cltpXSxcbiAgICAgICAgZmluYWwgPSAoaSA9PSBsZW4gLSAxKVxuXG4gICAgaWYgKGNoYXIgPT0gXCIqXCIpIHtcbiAgICAgIG5vZGUuZWRnZXNbY2hhcl0gPSBub2RlXG4gICAgICBub2RlLmZpbmFsID0gZmluYWxcblxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbmV4dCA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICBuZXh0LmZpbmFsID0gZmluYWxcblxuICAgICAgbm9kZS5lZGdlc1tjaGFyXSA9IG5leHRcbiAgICAgIG5vZGUgPSBuZXh0XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJvb3Rcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGlzIFRva2VuU2V0IGludG8gYW4gYXJyYXkgb2Ygc3RyaW5nc1xuICogY29udGFpbmVkIHdpdGhpbiB0aGUgVG9rZW5TZXQuXG4gKlxuICogVGhpcyBpcyBub3QgaW50ZW5kZWQgdG8gYmUgdXNlZCBvbiBhIFRva2VuU2V0IHRoYXRcbiAqIGNvbnRhaW5zIHdpbGRjYXJkcywgaW4gdGhlc2UgY2FzZXMgdGhlIHJlc3VsdHMgYXJlXG4gKiB1bmRlZmluZWQgYW5kIGFyZSBsaWtlbHkgdG8gY2F1c2UgYW4gaW5maW5pdGUgbG9vcC5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nW119XG4gKi9cbmx1bnIuVG9rZW5TZXQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB3b3JkcyA9IFtdXG5cbiAgdmFyIHN0YWNrID0gW3tcbiAgICBwcmVmaXg6IFwiXCIsXG4gICAgbm9kZTogdGhpc1xuICB9XVxuXG4gIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICB2YXIgZnJhbWUgPSBzdGFjay5wb3AoKSxcbiAgICAgICAgZWRnZXMgPSBPYmplY3Qua2V5cyhmcmFtZS5ub2RlLmVkZ2VzKSxcbiAgICAgICAgbGVuID0gZWRnZXMubGVuZ3RoXG5cbiAgICBpZiAoZnJhbWUubm9kZS5maW5hbCkge1xuICAgICAgLyogSW4gU2FmYXJpLCBhdCB0aGlzIHBvaW50IHRoZSBwcmVmaXggaXMgc29tZXRpbWVzIGNvcnJ1cHRlZCwgc2VlOlxuICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL29saXZlcm5uL2x1bnIuanMvaXNzdWVzLzI3OSBDYWxsaW5nIGFueVxuICAgICAgICogU3RyaW5nLnByb3RvdHlwZSBtZXRob2QgZm9yY2VzIFNhZmFyaSB0byBcImNhc3RcIiB0aGlzIHN0cmluZyB0byB3aGF0XG4gICAgICAgKiBpdCdzIHN1cHBvc2VkIHRvIGJlLCBmaXhpbmcgdGhlIGJ1Zy4gKi9cbiAgICAgIGZyYW1lLnByZWZpeC5jaGFyQXQoMClcbiAgICAgIHdvcmRzLnB1c2goZnJhbWUucHJlZml4KVxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHZhciBlZGdlID0gZWRnZXNbaV1cblxuICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgIHByZWZpeDogZnJhbWUucHJlZml4LmNvbmNhdChlZGdlKSxcbiAgICAgICAgbm9kZTogZnJhbWUubm9kZS5lZGdlc1tlZGdlXVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gd29yZHNcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBUb2tlblNldC5cbiAqXG4gKiBUaGlzIGlzIGludGVuZGVkIHRvIGFsbG93IFRva2VuU2V0cyB0byBiZSB1c2VkIGFzIGtleXNcbiAqIGluIG9iamVjdHMsIGxhcmdlbHkgdG8gYWlkIHRoZSBjb25zdHJ1Y3Rpb24gYW5kIG1pbmltaXNhdGlvblxuICogb2YgYSBUb2tlblNldC4gQXMgc3VjaCBpdCBpcyBub3QgZGVzaWduZWQgdG8gYmUgYSBodW1hblxuICogZnJpZW5kbHkgcmVwcmVzZW50YXRpb24gb2YgdGhlIFRva2VuU2V0LlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmx1bnIuVG9rZW5TZXQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAvLyBOT1RFOiBVc2luZyBPYmplY3Qua2V5cyBoZXJlIGFzIHRoaXMuZWRnZXMgaXMgdmVyeSBsaWtlbHlcbiAgLy8gdG8gZW50ZXIgJ2hhc2gtbW9kZScgd2l0aCBtYW55IGtleXMgYmVpbmcgYWRkZWRcbiAgLy9cbiAgLy8gYXZvaWRpbmcgYSBmb3ItaW4gbG9vcCBoZXJlIGFzIGl0IGxlYWRzIHRvIHRoZSBmdW5jdGlvblxuICAvLyBiZWluZyBkZS1vcHRpbWlzZWQgKGF0IGxlYXN0IGluIFY4KS4gRnJvbSBzb21lIHNpbXBsZVxuICAvLyBiZW5jaG1hcmtzIHRoZSBwZXJmb3JtYW5jZSBpcyBjb21wYXJhYmxlLCBidXQgYWxsb3dpbmdcbiAgLy8gVjggdG8gb3B0aW1pemUgbWF5IG1lYW4gZWFzeSBwZXJmb3JtYW5jZSB3aW5zIGluIHRoZSBmdXR1cmUuXG5cbiAgaWYgKHRoaXMuX3N0cikge1xuICAgIHJldHVybiB0aGlzLl9zdHJcbiAgfVxuXG4gIHZhciBzdHIgPSB0aGlzLmZpbmFsID8gJzEnIDogJzAnLFxuICAgICAgbGFiZWxzID0gT2JqZWN0LmtleXModGhpcy5lZGdlcykuc29ydCgpLFxuICAgICAgbGVuID0gbGFiZWxzLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICB2YXIgbGFiZWwgPSBsYWJlbHNbaV0sXG4gICAgICAgIG5vZGUgPSB0aGlzLmVkZ2VzW2xhYmVsXVxuXG4gICAgc3RyID0gc3RyICsgbGFiZWwgKyBub2RlLmlkXG4gIH1cblxuICByZXR1cm4gc3RyXG59XG5cbi8qKlxuICogUmV0dXJucyBhIG5ldyBUb2tlblNldCB0aGF0IGlzIHRoZSBpbnRlcnNlY3Rpb24gb2ZcbiAqIHRoaXMgVG9rZW5TZXQgYW5kIHRoZSBwYXNzZWQgVG9rZW5TZXQuXG4gKlxuICogVGhpcyBpbnRlcnNlY3Rpb24gd2lsbCB0YWtlIGludG8gYWNjb3VudCBhbnkgd2lsZGNhcmRzXG4gKiBjb250YWluZWQgd2l0aGluIHRoZSBUb2tlblNldC5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuVG9rZW5TZXR9IGIgLSBBbiBvdGhlciBUb2tlblNldCB0byBpbnRlcnNlY3Qgd2l0aC5cbiAqIEByZXR1cm5zIHtsdW5yLlRva2VuU2V0fVxuICovXG5sdW5yLlRva2VuU2V0LnByb3RvdHlwZS5pbnRlcnNlY3QgPSBmdW5jdGlvbiAoYikge1xuICB2YXIgb3V0cHV0ID0gbmV3IGx1bnIuVG9rZW5TZXQsXG4gICAgICBmcmFtZSA9IHVuZGVmaW5lZFxuXG4gIHZhciBzdGFjayA9IFt7XG4gICAgcU5vZGU6IGIsXG4gICAgb3V0cHV0OiBvdXRwdXQsXG4gICAgbm9kZTogdGhpc1xuICB9XVxuXG4gIHdoaWxlIChzdGFjay5sZW5ndGgpIHtcbiAgICBmcmFtZSA9IHN0YWNrLnBvcCgpXG5cbiAgICAvLyBOT1RFOiBBcyB3aXRoIHRoZSAjdG9TdHJpbmcgbWV0aG9kLCB3ZSBhcmUgdXNpbmdcbiAgICAvLyBPYmplY3Qua2V5cyBhbmQgYSBmb3IgbG9vcCBpbnN0ZWFkIG9mIGEgZm9yLWluIGxvb3BcbiAgICAvLyBhcyBib3RoIG9mIHRoZXNlIG9iamVjdHMgZW50ZXIgJ2hhc2gnIG1vZGUsIGNhdXNpbmdcbiAgICAvLyB0aGUgZnVuY3Rpb24gdG8gYmUgZGUtb3B0aW1pc2VkIGluIFY4XG4gICAgdmFyIHFFZGdlcyA9IE9iamVjdC5rZXlzKGZyYW1lLnFOb2RlLmVkZ2VzKSxcbiAgICAgICAgcUxlbiA9IHFFZGdlcy5sZW5ndGgsXG4gICAgICAgIG5FZGdlcyA9IE9iamVjdC5rZXlzKGZyYW1lLm5vZGUuZWRnZXMpLFxuICAgICAgICBuTGVuID0gbkVkZ2VzLmxlbmd0aFxuXG4gICAgZm9yICh2YXIgcSA9IDA7IHEgPCBxTGVuOyBxKyspIHtcbiAgICAgIHZhciBxRWRnZSA9IHFFZGdlc1txXVxuXG4gICAgICBmb3IgKHZhciBuID0gMDsgbiA8IG5MZW47IG4rKykge1xuICAgICAgICB2YXIgbkVkZ2UgPSBuRWRnZXNbbl1cblxuICAgICAgICBpZiAobkVkZ2UgPT0gcUVkZ2UgfHwgcUVkZ2UgPT0gJyonKSB7XG4gICAgICAgICAgdmFyIG5vZGUgPSBmcmFtZS5ub2RlLmVkZ2VzW25FZGdlXSxcbiAgICAgICAgICAgICAgcU5vZGUgPSBmcmFtZS5xTm9kZS5lZGdlc1txRWRnZV0sXG4gICAgICAgICAgICAgIGZpbmFsID0gbm9kZS5maW5hbCAmJiBxTm9kZS5maW5hbCxcbiAgICAgICAgICAgICAgbmV4dCA9IHVuZGVmaW5lZFxuXG4gICAgICAgICAgaWYgKG5FZGdlIGluIGZyYW1lLm91dHB1dC5lZGdlcykge1xuICAgICAgICAgICAgLy8gYW4gZWRnZSBhbHJlYWR5IGV4aXN0cyBmb3IgdGhpcyBjaGFyYWN0ZXJcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgdG8gY3JlYXRlIGEgbmV3IG5vZGUsIGp1c3Qgc2V0IHRoZSBmaW5hbGl0eVxuICAgICAgICAgICAgLy8gYml0IHVubGVzcyB0aGlzIG5vZGUgaXMgYWxyZWFkeSBmaW5hbFxuICAgICAgICAgICAgbmV4dCA9IGZyYW1lLm91dHB1dC5lZGdlc1tuRWRnZV1cbiAgICAgICAgICAgIG5leHQuZmluYWwgPSBuZXh0LmZpbmFsIHx8IGZpbmFsXG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gbm8gZWRnZSBleGlzdHMgeWV0LCBtdXN0IGNyZWF0ZSBvbmVcbiAgICAgICAgICAgIC8vIHNldCB0aGUgZmluYWxpdHkgYml0IGFuZCBpbnNlcnQgaXRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIG91dHB1dFxuICAgICAgICAgICAgbmV4dCA9IG5ldyBsdW5yLlRva2VuU2V0XG4gICAgICAgICAgICBuZXh0LmZpbmFsID0gZmluYWxcbiAgICAgICAgICAgIGZyYW1lLm91dHB1dC5lZGdlc1tuRWRnZV0gPSBuZXh0XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc3RhY2sucHVzaCh7XG4gICAgICAgICAgICBxTm9kZTogcU5vZGUsXG4gICAgICAgICAgICBvdXRwdXQ6IG5leHQsXG4gICAgICAgICAgICBub2RlOiBub2RlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cbmx1bnIuVG9rZW5TZXQuQnVpbGRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5wcmV2aW91c1dvcmQgPSBcIlwiXG4gIHRoaXMucm9vdCA9IG5ldyBsdW5yLlRva2VuU2V0XG4gIHRoaXMudW5jaGVja2VkTm9kZXMgPSBbXVxuICB0aGlzLm1pbmltaXplZE5vZGVzID0ge31cbn1cblxubHVuci5Ub2tlblNldC5CdWlsZGVyLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiAod29yZCkge1xuICB2YXIgbm9kZSxcbiAgICAgIGNvbW1vblByZWZpeCA9IDBcblxuICBpZiAod29yZCA8IHRoaXMucHJldmlvdXNXb3JkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yIChcIk91dCBvZiBvcmRlciB3b3JkIGluc2VydGlvblwiKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3b3JkLmxlbmd0aCAmJiBpIDwgdGhpcy5wcmV2aW91c1dvcmQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAod29yZFtpXSAhPSB0aGlzLnByZXZpb3VzV29yZFtpXSkgYnJlYWtcbiAgICBjb21tb25QcmVmaXgrK1xuICB9XG5cbiAgdGhpcy5taW5pbWl6ZShjb21tb25QcmVmaXgpXG5cbiAgaWYgKHRoaXMudW5jaGVja2VkTm9kZXMubGVuZ3RoID09IDApIHtcbiAgICBub2RlID0gdGhpcy5yb290XG4gIH0gZWxzZSB7XG4gICAgbm9kZSA9IHRoaXMudW5jaGVja2VkTm9kZXNbdGhpcy51bmNoZWNrZWROb2Rlcy5sZW5ndGggLSAxXS5jaGlsZFxuICB9XG5cbiAgZm9yICh2YXIgaSA9IGNvbW1vblByZWZpeDsgaSA8IHdvcmQubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgbmV4dE5vZGUgPSBuZXcgbHVuci5Ub2tlblNldCxcbiAgICAgICAgY2hhciA9IHdvcmRbaV1cblxuICAgIG5vZGUuZWRnZXNbY2hhcl0gPSBuZXh0Tm9kZVxuXG4gICAgdGhpcy51bmNoZWNrZWROb2Rlcy5wdXNoKHtcbiAgICAgIHBhcmVudDogbm9kZSxcbiAgICAgIGNoYXI6IGNoYXIsXG4gICAgICBjaGlsZDogbmV4dE5vZGVcbiAgICB9KVxuXG4gICAgbm9kZSA9IG5leHROb2RlXG4gIH1cblxuICBub2RlLmZpbmFsID0gdHJ1ZVxuICB0aGlzLnByZXZpb3VzV29yZCA9IHdvcmRcbn1cblxubHVuci5Ub2tlblNldC5CdWlsZGVyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubWluaW1pemUoMClcbn1cblxubHVuci5Ub2tlblNldC5CdWlsZGVyLnByb3RvdHlwZS5taW5pbWl6ZSA9IGZ1bmN0aW9uIChkb3duVG8pIHtcbiAgZm9yICh2YXIgaSA9IHRoaXMudW5jaGVja2VkTm9kZXMubGVuZ3RoIC0gMTsgaSA+PSBkb3duVG87IGktLSkge1xuICAgIHZhciBub2RlID0gdGhpcy51bmNoZWNrZWROb2Rlc1tpXSxcbiAgICAgICAgY2hpbGRLZXkgPSBub2RlLmNoaWxkLnRvU3RyaW5nKClcblxuICAgIGlmIChjaGlsZEtleSBpbiB0aGlzLm1pbmltaXplZE5vZGVzKSB7XG4gICAgICBub2RlLnBhcmVudC5lZGdlc1tub2RlLmNoYXJdID0gdGhpcy5taW5pbWl6ZWROb2Rlc1tjaGlsZEtleV1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2FjaGUgdGhlIGtleSBmb3IgdGhpcyBub2RlIHNpbmNlXG4gICAgICAvLyB3ZSBrbm93IGl0IGNhbid0IGNoYW5nZSBhbnltb3JlXG4gICAgICBub2RlLmNoaWxkLl9zdHIgPSBjaGlsZEtleVxuXG4gICAgICB0aGlzLm1pbmltaXplZE5vZGVzW2NoaWxkS2V5XSA9IG5vZGUuY2hpbGRcbiAgICB9XG5cbiAgICB0aGlzLnVuY2hlY2tlZE5vZGVzLnBvcCgpXG4gIH1cbn1cbi8qIVxuICogbHVuci5JbmRleFxuICogQ29weXJpZ2h0IChDKSAyMDIwIE9saXZlciBOaWdodGluZ2FsZVxuICovXG5cbi8qKlxuICogQW4gaW5kZXggY29udGFpbnMgdGhlIGJ1aWx0IGluZGV4IG9mIGFsbCBkb2N1bWVudHMgYW5kIHByb3ZpZGVzIGEgcXVlcnkgaW50ZXJmYWNlXG4gKiB0byB0aGUgaW5kZXguXG4gKlxuICogVXN1YWxseSBpbnN0YW5jZXMgb2YgbHVuci5JbmRleCB3aWxsIG5vdCBiZSBjcmVhdGVkIHVzaW5nIHRoaXMgY29uc3RydWN0b3IsIGluc3RlYWRcbiAqIGx1bnIuQnVpbGRlciBzaG91bGQgYmUgdXNlZCB0byBjb25zdHJ1Y3QgbmV3IGluZGV4ZXMsIG9yIGx1bnIuSW5kZXgubG9hZCBzaG91bGQgYmVcbiAqIHVzZWQgdG8gbG9hZCBwcmV2aW91c2x5IGJ1aWx0IGFuZCBzZXJpYWxpemVkIGluZGV4ZXMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gYXR0cnMgLSBUaGUgYXR0cmlidXRlcyBvZiB0aGUgYnVpbHQgc2VhcmNoIGluZGV4LlxuICogQHBhcmFtIHtPYmplY3R9IGF0dHJzLmludmVydGVkSW5kZXggLSBBbiBpbmRleCBvZiB0ZXJtL2ZpZWxkIHRvIGRvY3VtZW50IHJlZmVyZW5jZS5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgbHVuci5WZWN0b3I+fSBhdHRycy5maWVsZFZlY3RvcnMgLSBGaWVsZCB2ZWN0b3JzXG4gKiBAcGFyYW0ge2x1bnIuVG9rZW5TZXR9IGF0dHJzLnRva2VuU2V0IC0gQW4gc2V0IG9mIGFsbCBjb3JwdXMgdG9rZW5zLlxuICogQHBhcmFtIHtzdHJpbmdbXX0gYXR0cnMuZmllbGRzIC0gVGhlIG5hbWVzIG9mIGluZGV4ZWQgZG9jdW1lbnQgZmllbGRzLlxuICogQHBhcmFtIHtsdW5yLlBpcGVsaW5lfSBhdHRycy5waXBlbGluZSAtIFRoZSBwaXBlbGluZSB0byB1c2UgZm9yIHNlYXJjaCB0ZXJtcy5cbiAqL1xubHVuci5JbmRleCA9IGZ1bmN0aW9uIChhdHRycykge1xuICB0aGlzLmludmVydGVkSW5kZXggPSBhdHRycy5pbnZlcnRlZEluZGV4XG4gIHRoaXMuZmllbGRWZWN0b3JzID0gYXR0cnMuZmllbGRWZWN0b3JzXG4gIHRoaXMudG9rZW5TZXQgPSBhdHRycy50b2tlblNldFxuICB0aGlzLmZpZWxkcyA9IGF0dHJzLmZpZWxkc1xuICB0aGlzLnBpcGVsaW5lID0gYXR0cnMucGlwZWxpbmVcbn1cblxuLyoqXG4gKiBBIHJlc3VsdCBjb250YWlucyBkZXRhaWxzIG9mIGEgZG9jdW1lbnQgbWF0Y2hpbmcgYSBzZWFyY2ggcXVlcnkuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBsdW5yLkluZGV4flJlc3VsdFxuICogQHByb3BlcnR5IHtzdHJpbmd9IHJlZiAtIFRoZSByZWZlcmVuY2Ugb2YgdGhlIGRvY3VtZW50IHRoaXMgcmVzdWx0IHJlcHJlc2VudHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2NvcmUgLSBBIG51bWJlciBiZXR3ZWVuIDAgYW5kIDEgcmVwcmVzZW50aW5nIGhvdyBzaW1pbGFyIHRoaXMgZG9jdW1lbnQgaXMgdG8gdGhlIHF1ZXJ5LlxuICogQHByb3BlcnR5IHtsdW5yLk1hdGNoRGF0YX0gbWF0Y2hEYXRhIC0gQ29udGFpbnMgbWV0YWRhdGEgYWJvdXQgdGhpcyBtYXRjaCBpbmNsdWRpbmcgd2hpY2ggdGVybShzKSBjYXVzZWQgdGhlIG1hdGNoLlxuICovXG5cbi8qKlxuICogQWx0aG91Z2ggbHVuciBwcm92aWRlcyB0aGUgYWJpbGl0eSB0byBjcmVhdGUgcXVlcmllcyB1c2luZyBsdW5yLlF1ZXJ5LCBpdCBhbHNvIHByb3ZpZGVzIGEgc2ltcGxlXG4gKiBxdWVyeSBsYW5ndWFnZSB3aGljaCBpdHNlbGYgaXMgcGFyc2VkIGludG8gYW4gaW5zdGFuY2Ugb2YgbHVuci5RdWVyeS5cbiAqXG4gKiBGb3IgcHJvZ3JhbW1hdGljYWxseSBidWlsZGluZyBxdWVyaWVzIGl0IGlzIGFkdmlzZWQgdG8gZGlyZWN0bHkgdXNlIGx1bnIuUXVlcnksIHRoZSBxdWVyeSBsYW5ndWFnZVxuICogaXMgYmVzdCB1c2VkIGZvciBodW1hbiBlbnRlcmVkIHRleHQgcmF0aGVyIHRoYW4gcHJvZ3JhbSBnZW5lcmF0ZWQgdGV4dC5cbiAqXG4gKiBBdCBpdHMgc2ltcGxlc3QgcXVlcmllcyBjYW4ganVzdCBiZSBhIHNpbmdsZSB0ZXJtLCBlLmcuIGBoZWxsb2AsIG11bHRpcGxlIHRlcm1zIGFyZSBhbHNvIHN1cHBvcnRlZFxuICogYW5kIHdpbGwgYmUgY29tYmluZWQgd2l0aCBPUiwgZS5nIGBoZWxsbyB3b3JsZGAgd2lsbCBtYXRjaCBkb2N1bWVudHMgdGhhdCBjb250YWluIGVpdGhlciAnaGVsbG8nXG4gKiBvciAnd29ybGQnLCB0aG91Z2ggdGhvc2UgdGhhdCBjb250YWluIGJvdGggd2lsbCByYW5rIGhpZ2hlciBpbiB0aGUgcmVzdWx0cy5cbiAqXG4gKiBXaWxkY2FyZHMgY2FuIGJlIGluY2x1ZGVkIGluIHRlcm1zIHRvIG1hdGNoIG9uZSBvciBtb3JlIHVuc3BlY2lmaWVkIGNoYXJhY3RlcnMsIHRoZXNlIHdpbGRjYXJkcyBjYW5cbiAqIGJlIGluc2VydGVkIGFueXdoZXJlIHdpdGhpbiB0aGUgdGVybSwgYW5kIG1vcmUgdGhhbiBvbmUgd2lsZGNhcmQgY2FuIGV4aXN0IGluIGEgc2luZ2xlIHRlcm0uIEFkZGluZ1xuICogd2lsZGNhcmRzIHdpbGwgaW5jcmVhc2UgdGhlIG51bWJlciBvZiBkb2N1bWVudHMgdGhhdCB3aWxsIGJlIGZvdW5kIGJ1dCBjYW4gYWxzbyBoYXZlIGEgbmVnYXRpdmVcbiAqIGltcGFjdCBvbiBxdWVyeSBwZXJmb3JtYW5jZSwgZXNwZWNpYWxseSB3aXRoIHdpbGRjYXJkcyBhdCB0aGUgYmVnaW5uaW5nIG9mIGEgdGVybS5cbiAqXG4gKiBUZXJtcyBjYW4gYmUgcmVzdHJpY3RlZCB0byBzcGVjaWZpYyBmaWVsZHMsIGUuZy4gYHRpdGxlOmhlbGxvYCwgb25seSBkb2N1bWVudHMgd2l0aCB0aGUgdGVybVxuICogaGVsbG8gaW4gdGhlIHRpdGxlIGZpZWxkIHdpbGwgbWF0Y2ggdGhpcyBxdWVyeS4gVXNpbmcgYSBmaWVsZCBub3QgcHJlc2VudCBpbiB0aGUgaW5kZXggd2lsbCBsZWFkXG4gKiB0byBhbiBlcnJvciBiZWluZyB0aHJvd24uXG4gKlxuICogTW9kaWZpZXJzIGNhbiBhbHNvIGJlIGFkZGVkIHRvIHRlcm1zLCBsdW5yIHN1cHBvcnRzIGVkaXQgZGlzdGFuY2UgYW5kIGJvb3N0IG1vZGlmaWVycyBvbiB0ZXJtcy4gQSB0ZXJtXG4gKiBib29zdCB3aWxsIG1ha2UgZG9jdW1lbnRzIG1hdGNoaW5nIHRoYXQgdGVybSBzY29yZSBoaWdoZXIsIGUuZy4gYGZvb141YC4gRWRpdCBkaXN0YW5jZSBpcyBhbHNvIHN1cHBvcnRlZFxuICogdG8gcHJvdmlkZSBmdXp6eSBtYXRjaGluZywgZS5nLiAnaGVsbG9+Micgd2lsbCBtYXRjaCBkb2N1bWVudHMgd2l0aCBoZWxsbyB3aXRoIGFuIGVkaXQgZGlzdGFuY2Ugb2YgMi5cbiAqIEF2b2lkIGxhcmdlIHZhbHVlcyBmb3IgZWRpdCBkaXN0YW5jZSB0byBpbXByb3ZlIHF1ZXJ5IHBlcmZvcm1hbmNlLlxuICpcbiAqIEVhY2ggdGVybSBhbHNvIHN1cHBvcnRzIGEgcHJlc2VuY2UgbW9kaWZpZXIuIEJ5IGRlZmF1bHQgYSB0ZXJtJ3MgcHJlc2VuY2UgaW4gZG9jdW1lbnQgaXMgb3B0aW9uYWwsIGhvd2V2ZXJcbiAqIHRoaXMgY2FuIGJlIGNoYW5nZWQgdG8gZWl0aGVyIHJlcXVpcmVkIG9yIHByb2hpYml0ZWQuIEZvciBhIHRlcm0ncyBwcmVzZW5jZSB0byBiZSByZXF1aXJlZCBpbiBhIGRvY3VtZW50IHRoZVxuICogdGVybSBzaG91bGQgYmUgcHJlZml4ZWQgd2l0aCBhICcrJywgZS5nLiBgK2ZvbyBiYXJgIGlzIGEgc2VhcmNoIGZvciBkb2N1bWVudHMgdGhhdCBtdXN0IGNvbnRhaW4gJ2ZvbycgYW5kXG4gKiBvcHRpb25hbGx5IGNvbnRhaW4gJ2JhcicuIENvbnZlcnNlbHkgYSBsZWFkaW5nICctJyBzZXRzIHRoZSB0ZXJtcyBwcmVzZW5jZSB0byBwcm9oaWJpdGVkLCBpLmUuIGl0IG11c3Qgbm90XG4gKiBhcHBlYXIgaW4gYSBkb2N1bWVudCwgZS5nLiBgLWZvbyBiYXJgIGlzIGEgc2VhcmNoIGZvciBkb2N1bWVudHMgdGhhdCBkbyBub3QgY29udGFpbiAnZm9vJyBidXQgbWF5IGNvbnRhaW4gJ2JhcicuXG4gKlxuICogVG8gZXNjYXBlIHNwZWNpYWwgY2hhcmFjdGVycyB0aGUgYmFja3NsYXNoIGNoYXJhY3RlciAnXFwnIGNhbiBiZSB1c2VkLCB0aGlzIGFsbG93cyBzZWFyY2hlcyB0byBpbmNsdWRlXG4gKiBjaGFyYWN0ZXJzIHRoYXQgd291bGQgbm9ybWFsbHkgYmUgY29uc2lkZXJlZCBtb2RpZmllcnMsIGUuZy4gYGZvb1xcfjJgIHdpbGwgc2VhcmNoIGZvciBhIHRlcm0gXCJmb29+MlwiIGluc3RlYWRcbiAqIG9mIGF0dGVtcHRpbmcgdG8gYXBwbHkgYSBib29zdCBvZiAyIHRvIHRoZSBzZWFyY2ggdGVybSBcImZvb1wiLlxuICpcbiAqIEB0eXBlZGVmIHtzdHJpbmd9IGx1bnIuSW5kZXh+UXVlcnlTdHJpbmdcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNpbXBsZSBzaW5nbGUgdGVybSBxdWVyeTwvY2FwdGlvbj5cbiAqIGhlbGxvXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5NdWx0aXBsZSB0ZXJtIHF1ZXJ5PC9jYXB0aW9uPlxuICogaGVsbG8gd29ybGRcbiAqIEBleGFtcGxlIDxjYXB0aW9uPnRlcm0gc2NvcGVkIHRvIGEgZmllbGQ8L2NhcHRpb24+XG4gKiB0aXRsZTpoZWxsb1xuICogQGV4YW1wbGUgPGNhcHRpb24+dGVybSB3aXRoIGEgYm9vc3Qgb2YgMTA8L2NhcHRpb24+XG4gKiBoZWxsb14xMFxuICogQGV4YW1wbGUgPGNhcHRpb24+dGVybSB3aXRoIGFuIGVkaXQgZGlzdGFuY2Ugb2YgMjwvY2FwdGlvbj5cbiAqIGhlbGxvfjJcbiAqIEBleGFtcGxlIDxjYXB0aW9uPnRlcm1zIHdpdGggcHJlc2VuY2UgbW9kaWZpZXJzPC9jYXB0aW9uPlxuICogLWZvbyArYmFyIGJhelxuICovXG5cbi8qKlxuICogUGVyZm9ybXMgYSBzZWFyY2ggYWdhaW5zdCB0aGUgaW5kZXggdXNpbmcgbHVuciBxdWVyeSBzeW50YXguXG4gKlxuICogUmVzdWx0cyB3aWxsIGJlIHJldHVybmVkIHNvcnRlZCBieSB0aGVpciBzY29yZSwgdGhlIG1vc3QgcmVsZXZhbnQgcmVzdWx0c1xuICogd2lsbCBiZSByZXR1cm5lZCBmaXJzdC4gIEZvciBkZXRhaWxzIG9uIGhvdyB0aGUgc2NvcmUgaXMgY2FsY3VsYXRlZCwgcGxlYXNlIHNlZVxuICogdGhlIHtAbGluayBodHRwczovL2x1bnJqcy5jb20vZ3VpZGVzL3NlYXJjaGluZy5odG1sI3Njb3Jpbmd8Z3VpZGV9LlxuICpcbiAqIEZvciBtb3JlIHByb2dyYW1tYXRpYyBxdWVyeWluZyB1c2UgbHVuci5JbmRleCNxdWVyeS5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuSW5kZXh+UXVlcnlTdHJpbmd9IHF1ZXJ5U3RyaW5nIC0gQSBzdHJpbmcgY29udGFpbmluZyBhIGx1bnIgcXVlcnkuXG4gKiBAdGhyb3dzIHtsdW5yLlF1ZXJ5UGFyc2VFcnJvcn0gSWYgdGhlIHBhc3NlZCBxdWVyeSBzdHJpbmcgY2Fubm90IGJlIHBhcnNlZC5cbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4flJlc3VsdFtdfVxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbiAocXVlcnlTdHJpbmcpIHtcbiAgcmV0dXJuIHRoaXMucXVlcnkoZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgdmFyIHBhcnNlciA9IG5ldyBsdW5yLlF1ZXJ5UGFyc2VyKHF1ZXJ5U3RyaW5nLCBxdWVyeSlcbiAgICBwYXJzZXIucGFyc2UoKVxuICB9KVxufVxuXG4vKipcbiAqIEEgcXVlcnkgYnVpbGRlciBjYWxsYmFjayBwcm92aWRlcyBhIHF1ZXJ5IG9iamVjdCB0byBiZSB1c2VkIHRvIGV4cHJlc3NcbiAqIHRoZSBxdWVyeSB0byBwZXJmb3JtIG9uIHRoZSBpbmRleC5cbiAqXG4gKiBAY2FsbGJhY2sgbHVuci5JbmRleH5xdWVyeUJ1aWxkZXJcbiAqIEBwYXJhbSB7bHVuci5RdWVyeX0gcXVlcnkgLSBUaGUgcXVlcnkgb2JqZWN0IHRvIGJ1aWxkIHVwLlxuICogQHRoaXMgbHVuci5RdWVyeVxuICovXG5cbi8qKlxuICogUGVyZm9ybXMgYSBxdWVyeSBhZ2FpbnN0IHRoZSBpbmRleCB1c2luZyB0aGUgeWllbGRlZCBsdW5yLlF1ZXJ5IG9iamVjdC5cbiAqXG4gKiBJZiBwZXJmb3JtaW5nIHByb2dyYW1tYXRpYyBxdWVyaWVzIGFnYWluc3QgdGhlIGluZGV4LCB0aGlzIG1ldGhvZCBpcyBwcmVmZXJyZWRcbiAqIG92ZXIgbHVuci5JbmRleCNzZWFyY2ggc28gYXMgdG8gYXZvaWQgdGhlIGFkZGl0aW9uYWwgcXVlcnkgcGFyc2luZyBvdmVyaGVhZC5cbiAqXG4gKiBBIHF1ZXJ5IG9iamVjdCBpcyB5aWVsZGVkIHRvIHRoZSBzdXBwbGllZCBmdW5jdGlvbiB3aGljaCBzaG91bGQgYmUgdXNlZCB0b1xuICogZXhwcmVzcyB0aGUgcXVlcnkgdG8gYmUgcnVuIGFnYWluc3QgdGhlIGluZGV4LlxuICpcbiAqIE5vdGUgdGhhdCBhbHRob3VnaCB0aGlzIGZ1bmN0aW9uIHRha2VzIGEgY2FsbGJhY2sgcGFyYW1ldGVyIGl0IGlzIF9ub3RfIGFuXG4gKiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLCB0aGUgY2FsbGJhY2sgaXMganVzdCB5aWVsZGVkIGEgcXVlcnkgb2JqZWN0IHRvIGJlXG4gKiBjdXN0b21pemVkLlxuICpcbiAqIEBwYXJhbSB7bHVuci5JbmRleH5xdWVyeUJ1aWxkZXJ9IGZuIC0gQSBmdW5jdGlvbiB0aGF0IGlzIHVzZWQgdG8gYnVpbGQgdGhlIHF1ZXJ5LlxuICogQHJldHVybnMge2x1bnIuSW5kZXh+UmVzdWx0W119XG4gKi9cbmx1bnIuSW5kZXgucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24gKGZuKSB7XG4gIC8vIGZvciBlYWNoIHF1ZXJ5IGNsYXVzZVxuICAvLyAqIHByb2Nlc3MgdGVybXNcbiAgLy8gKiBleHBhbmQgdGVybXMgZnJvbSB0b2tlbiBzZXRcbiAgLy8gKiBmaW5kIG1hdGNoaW5nIGRvY3VtZW50cyBhbmQgbWV0YWRhdGFcbiAgLy8gKiBnZXQgZG9jdW1lbnQgdmVjdG9yc1xuICAvLyAqIHNjb3JlIGRvY3VtZW50c1xuXG4gIHZhciBxdWVyeSA9IG5ldyBsdW5yLlF1ZXJ5KHRoaXMuZmllbGRzKSxcbiAgICAgIG1hdGNoaW5nRmllbGRzID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIHF1ZXJ5VmVjdG9ycyA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICB0ZXJtRmllbGRDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICByZXF1aXJlZE1hdGNoZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgcHJvaGliaXRlZE1hdGNoZXMgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgLypcbiAgICogVG8gc3VwcG9ydCBmaWVsZCBsZXZlbCBib29zdHMgYSBxdWVyeSB2ZWN0b3IgaXMgY3JlYXRlZCBwZXJcbiAgICogZmllbGQuIEFuIGVtcHR5IHZlY3RvciBpcyBlYWdlcmx5IGNyZWF0ZWQgdG8gc3VwcG9ydCBuZWdhdGVkXG4gICAqIHF1ZXJpZXMuXG4gICAqL1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgcXVlcnlWZWN0b3JzW3RoaXMuZmllbGRzW2ldXSA9IG5ldyBsdW5yLlZlY3RvclxuICB9XG5cbiAgZm4uY2FsbChxdWVyeSwgcXVlcnkpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyeS5jbGF1c2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgLypcbiAgICAgKiBVbmxlc3MgdGhlIHBpcGVsaW5lIGhhcyBiZWVuIGRpc2FibGVkIGZvciB0aGlzIHRlcm0sIHdoaWNoIGlzXG4gICAgICogdGhlIGNhc2UgZm9yIHRlcm1zIHdpdGggd2lsZGNhcmRzLCB3ZSBuZWVkIHRvIHBhc3MgdGhlIGNsYXVzZVxuICAgICAqIHRlcm0gdGhyb3VnaCB0aGUgc2VhcmNoIHBpcGVsaW5lLiBBIHBpcGVsaW5lIHJldHVybnMgYW4gYXJyYXlcbiAgICAgKiBvZiBwcm9jZXNzZWQgdGVybXMuIFBpcGVsaW5lIGZ1bmN0aW9ucyBtYXkgZXhwYW5kIHRoZSBwYXNzZWRcbiAgICAgKiB0ZXJtLCB3aGljaCBtZWFucyB3ZSBtYXkgZW5kIHVwIHBlcmZvcm1pbmcgbXVsdGlwbGUgaW5kZXggbG9va3Vwc1xuICAgICAqIGZvciBhIHNpbmdsZSBxdWVyeSB0ZXJtLlxuICAgICAqL1xuICAgIHZhciBjbGF1c2UgPSBxdWVyeS5jbGF1c2VzW2ldLFxuICAgICAgICB0ZXJtcyA9IG51bGwsXG4gICAgICAgIGNsYXVzZU1hdGNoZXMgPSBsdW5yLlNldC5lbXB0eVxuXG4gICAgaWYgKGNsYXVzZS51c2VQaXBlbGluZSkge1xuICAgICAgdGVybXMgPSB0aGlzLnBpcGVsaW5lLnJ1blN0cmluZyhjbGF1c2UudGVybSwge1xuICAgICAgICBmaWVsZHM6IGNsYXVzZS5maWVsZHNcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRlcm1zID0gW2NsYXVzZS50ZXJtXVxuICAgIH1cblxuICAgIGZvciAodmFyIG0gPSAwOyBtIDwgdGVybXMubGVuZ3RoOyBtKyspIHtcbiAgICAgIHZhciB0ZXJtID0gdGVybXNbbV1cblxuICAgICAgLypcbiAgICAgICAqIEVhY2ggdGVybSByZXR1cm5lZCBmcm9tIHRoZSBwaXBlbGluZSBuZWVkcyB0byB1c2UgdGhlIHNhbWUgcXVlcnlcbiAgICAgICAqIGNsYXVzZSBvYmplY3QsIGUuZy4gdGhlIHNhbWUgYm9vc3QgYW5kIG9yIGVkaXQgZGlzdGFuY2UuIFRoZVxuICAgICAgICogc2ltcGxlc3Qgd2F5IHRvIGRvIHRoaXMgaXMgdG8gcmUtdXNlIHRoZSBjbGF1c2Ugb2JqZWN0IGJ1dCBtdXRhdGVcbiAgICAgICAqIGl0cyB0ZXJtIHByb3BlcnR5LlxuICAgICAgICovXG4gICAgICBjbGF1c2UudGVybSA9IHRlcm1cblxuICAgICAgLypcbiAgICAgICAqIEZyb20gdGhlIHRlcm0gaW4gdGhlIGNsYXVzZSB3ZSBjcmVhdGUgYSB0b2tlbiBzZXQgd2hpY2ggd2lsbCB0aGVuXG4gICAgICAgKiBiZSB1c2VkIHRvIGludGVyc2VjdCB0aGUgaW5kZXhlcyB0b2tlbiBzZXQgdG8gZ2V0IGEgbGlzdCBvZiB0ZXJtc1xuICAgICAgICogdG8gbG9va3VwIGluIHRoZSBpbnZlcnRlZCBpbmRleFxuICAgICAgICovXG4gICAgICB2YXIgdGVybVRva2VuU2V0ID0gbHVuci5Ub2tlblNldC5mcm9tQ2xhdXNlKGNsYXVzZSksXG4gICAgICAgICAgZXhwYW5kZWRUZXJtcyA9IHRoaXMudG9rZW5TZXQuaW50ZXJzZWN0KHRlcm1Ub2tlblNldCkudG9BcnJheSgpXG5cbiAgICAgIC8qXG4gICAgICAgKiBJZiBhIHRlcm0gbWFya2VkIGFzIHJlcXVpcmVkIGRvZXMgbm90IGV4aXN0IGluIHRoZSB0b2tlblNldCBpdCBpc1xuICAgICAgICogaW1wb3NzaWJsZSBmb3IgdGhlIHNlYXJjaCB0byByZXR1cm4gYW55IG1hdGNoZXMuIFdlIHNldCBhbGwgdGhlIGZpZWxkXG4gICAgICAgKiBzY29wZWQgcmVxdWlyZWQgbWF0Y2hlcyBzZXQgdG8gZW1wdHkgYW5kIHN0b3AgZXhhbWluaW5nIGFueSBmdXJ0aGVyXG4gICAgICAgKiBjbGF1c2VzLlxuICAgICAgICovXG4gICAgICBpZiAoZXhwYW5kZWRUZXJtcy5sZW5ndGggPT09IDAgJiYgY2xhdXNlLnByZXNlbmNlID09PSBsdW5yLlF1ZXJ5LnByZXNlbmNlLlJFUVVJUkVEKSB7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2xhdXNlLmZpZWxkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIHZhciBmaWVsZCA9IGNsYXVzZS5maWVsZHNba11cbiAgICAgICAgICByZXF1aXJlZE1hdGNoZXNbZmllbGRdID0gbHVuci5TZXQuZW1wdHlcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZXhwYW5kZWRUZXJtcy5sZW5ndGg7IGorKykge1xuICAgICAgICAvKlxuICAgICAgICAgKiBGb3IgZWFjaCB0ZXJtIGdldCB0aGUgcG9zdGluZyBhbmQgdGVybUluZGV4LCB0aGlzIGlzIHJlcXVpcmVkIGZvclxuICAgICAgICAgKiBidWlsZGluZyB0aGUgcXVlcnkgdmVjdG9yLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGV4cGFuZGVkVGVybSA9IGV4cGFuZGVkVGVybXNbal0sXG4gICAgICAgICAgICBwb3N0aW5nID0gdGhpcy5pbnZlcnRlZEluZGV4W2V4cGFuZGVkVGVybV0sXG4gICAgICAgICAgICB0ZXJtSW5kZXggPSBwb3N0aW5nLl9pbmRleFxuXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2xhdXNlLmZpZWxkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIC8qXG4gICAgICAgICAgICogRm9yIGVhY2ggZmllbGQgdGhhdCB0aGlzIHF1ZXJ5IHRlcm0gaXMgc2NvcGVkIGJ5IChieSBkZWZhdWx0XG4gICAgICAgICAgICogYWxsIGZpZWxkcyBhcmUgaW4gc2NvcGUpIHdlIG5lZWQgdG8gZ2V0IGFsbCB0aGUgZG9jdW1lbnQgcmVmc1xuICAgICAgICAgICAqIHRoYXQgaGF2ZSB0aGlzIHRlcm0gaW4gdGhhdCBmaWVsZC5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqIFRoZSBwb3N0aW5nIGlzIHRoZSBlbnRyeSBpbiB0aGUgaW52ZXJ0ZWRJbmRleCBmb3IgdGhlIG1hdGNoaW5nXG4gICAgICAgICAgICogdGVybSBmcm9tIGFib3ZlLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBmaWVsZCA9IGNsYXVzZS5maWVsZHNba10sXG4gICAgICAgICAgICAgIGZpZWxkUG9zdGluZyA9IHBvc3RpbmdbZmllbGRdLFxuICAgICAgICAgICAgICBtYXRjaGluZ0RvY3VtZW50UmVmcyA9IE9iamVjdC5rZXlzKGZpZWxkUG9zdGluZyksXG4gICAgICAgICAgICAgIHRlcm1GaWVsZCA9IGV4cGFuZGVkVGVybSArIFwiL1wiICsgZmllbGQsXG4gICAgICAgICAgICAgIG1hdGNoaW5nRG9jdW1lbnRzU2V0ID0gbmV3IGx1bnIuU2V0KG1hdGNoaW5nRG9jdW1lbnRSZWZzKVxuXG4gICAgICAgICAgLypcbiAgICAgICAgICAgKiBpZiB0aGUgcHJlc2VuY2Ugb2YgdGhpcyB0ZXJtIGlzIHJlcXVpcmVkIGVuc3VyZSB0aGF0IHRoZSBtYXRjaGluZ1xuICAgICAgICAgICAqIGRvY3VtZW50cyBhcmUgYWRkZWQgdG8gdGhlIHNldCBvZiByZXF1aXJlZCBtYXRjaGVzIGZvciB0aGlzIGNsYXVzZS5cbiAgICAgICAgICAgKlxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChjbGF1c2UucHJlc2VuY2UgPT0gbHVuci5RdWVyeS5wcmVzZW5jZS5SRVFVSVJFRCkge1xuICAgICAgICAgICAgY2xhdXNlTWF0Y2hlcyA9IGNsYXVzZU1hdGNoZXMudW5pb24obWF0Y2hpbmdEb2N1bWVudHNTZXQpXG5cbiAgICAgICAgICAgIGlmIChyZXF1aXJlZE1hdGNoZXNbZmllbGRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgcmVxdWlyZWRNYXRjaGVzW2ZpZWxkXSA9IGx1bnIuU2V0LmNvbXBsZXRlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLypcbiAgICAgICAgICAgKiBpZiB0aGUgcHJlc2VuY2Ugb2YgdGhpcyB0ZXJtIGlzIHByb2hpYml0ZWQgZW5zdXJlIHRoYXQgdGhlIG1hdGNoaW5nXG4gICAgICAgICAgICogZG9jdW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgc2V0IG9mIHByb2hpYml0ZWQgbWF0Y2hlcyBmb3IgdGhpcyBmaWVsZCxcbiAgICAgICAgICAgKiBjcmVhdGluZyB0aGF0IHNldCBpZiBpdCBkb2VzIG5vdCB5ZXQgZXhpc3QuXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKGNsYXVzZS5wcmVzZW5jZSA9PSBsdW5yLlF1ZXJ5LnByZXNlbmNlLlBST0hJQklURUQpIHtcbiAgICAgICAgICAgIGlmIChwcm9oaWJpdGVkTWF0Y2hlc1tmaWVsZF0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBwcm9oaWJpdGVkTWF0Y2hlc1tmaWVsZF0gPSBsdW5yLlNldC5lbXB0eVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcm9oaWJpdGVkTWF0Y2hlc1tmaWVsZF0gPSBwcm9oaWJpdGVkTWF0Y2hlc1tmaWVsZF0udW5pb24obWF0Y2hpbmdEb2N1bWVudHNTZXQpXG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBQcm9oaWJpdGVkIG1hdGNoZXMgc2hvdWxkIG5vdCBiZSBwYXJ0IG9mIHRoZSBxdWVyeSB2ZWN0b3IgdXNlZCBmb3JcbiAgICAgICAgICAgICAqIHNpbWlsYXJpdHkgc2NvcmluZyBhbmQgbm8gbWV0YWRhdGEgc2hvdWxkIGJlIGV4dHJhY3RlZCBzbyB3ZSBjb250aW51ZVxuICAgICAgICAgICAgICogdG8gdGhlIG5leHQgZmllbGRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKlxuICAgICAgICAgICAqIFRoZSBxdWVyeSBmaWVsZCB2ZWN0b3IgaXMgcG9wdWxhdGVkIHVzaW5nIHRoZSB0ZXJtSW5kZXggZm91bmQgZm9yXG4gICAgICAgICAgICogdGhlIHRlcm0gYW5kIGEgdW5pdCB2YWx1ZSB3aXRoIHRoZSBhcHByb3ByaWF0ZSBib29zdCBhcHBsaWVkLlxuICAgICAgICAgICAqIFVzaW5nIHVwc2VydCBiZWNhdXNlIHRoZXJlIGNvdWxkIGFscmVhZHkgYmUgYW4gZW50cnkgaW4gdGhlIHZlY3RvclxuICAgICAgICAgICAqIGZvciB0aGUgdGVybSB3ZSBhcmUgd29ya2luZyB3aXRoLiBJbiB0aGF0IGNhc2Ugd2UganVzdCBhZGQgdGhlIHNjb3Jlc1xuICAgICAgICAgICAqIHRvZ2V0aGVyLlxuICAgICAgICAgICAqL1xuICAgICAgICAgIHF1ZXJ5VmVjdG9yc1tmaWVsZF0udXBzZXJ0KHRlcm1JbmRleCwgY2xhdXNlLmJvb3N0LCBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGIgfSlcblxuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHdlJ3ZlIGFscmVhZHkgc2VlbiB0aGlzIHRlcm0sIGZpZWxkIGNvbWJvIHRoZW4gd2UndmUgYWxyZWFkeSBjb2xsZWN0ZWRcbiAgICAgICAgICAgKiB0aGUgbWF0Y2hpbmcgZG9jdW1lbnRzIGFuZCBtZXRhZGF0YSwgbm8gbmVlZCB0byBnbyB0aHJvdWdoIGFsbCB0aGF0IGFnYWluXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKHRlcm1GaWVsZENhY2hlW3Rlcm1GaWVsZF0pIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBtYXRjaGluZ0RvY3VtZW50UmVmcy5sZW5ndGg7IGwrKykge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIEFsbCBtZXRhZGF0YSBmb3IgdGhpcyB0ZXJtL2ZpZWxkL2RvY3VtZW50IHRyaXBsZVxuICAgICAgICAgICAgICogYXJlIHRoZW4gZXh0cmFjdGVkIGFuZCBjb2xsZWN0ZWQgaW50byBhbiBpbnN0YW5jZVxuICAgICAgICAgICAgICogb2YgbHVuci5NYXRjaERhdGEgcmVhZHkgdG8gYmUgcmV0dXJuZWQgaW4gdGhlIHF1ZXJ5XG4gICAgICAgICAgICAgKiByZXN1bHRzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBtYXRjaGluZ0RvY3VtZW50UmVmID0gbWF0Y2hpbmdEb2N1bWVudFJlZnNbbF0sXG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdGaWVsZFJlZiA9IG5ldyBsdW5yLkZpZWxkUmVmIChtYXRjaGluZ0RvY3VtZW50UmVmLCBmaWVsZCksXG4gICAgICAgICAgICAgICAgbWV0YWRhdGEgPSBmaWVsZFBvc3RpbmdbbWF0Y2hpbmdEb2N1bWVudFJlZl0sXG4gICAgICAgICAgICAgICAgZmllbGRNYXRjaFxuXG4gICAgICAgICAgICBpZiAoKGZpZWxkTWF0Y2ggPSBtYXRjaGluZ0ZpZWxkc1ttYXRjaGluZ0ZpZWxkUmVmXSkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBtYXRjaGluZ0ZpZWxkc1ttYXRjaGluZ0ZpZWxkUmVmXSA9IG5ldyBsdW5yLk1hdGNoRGF0YSAoZXhwYW5kZWRUZXJtLCBmaWVsZCwgbWV0YWRhdGEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBmaWVsZE1hdGNoLmFkZChleHBhbmRlZFRlcm0sIGZpZWxkLCBtZXRhZGF0YSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRlcm1GaWVsZENhY2hlW3Rlcm1GaWVsZF0gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgcHJlc2VuY2Ugd2FzIHJlcXVpcmVkIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSByZXF1aXJlZE1hdGNoZXMgZmllbGQgc2V0cy5cbiAgICAgKiBXZSBkbyB0aGlzIGFmdGVyIGFsbCBmaWVsZHMgZm9yIHRoZSB0ZXJtIGhhdmUgY29sbGVjdGVkIHRoZWlyIG1hdGNoZXMgYmVjYXVzZVxuICAgICAqIHRoZSBjbGF1c2UgdGVybXMgcHJlc2VuY2UgaXMgcmVxdWlyZWQgaW4gX2FueV8gb2YgdGhlIGZpZWxkcyBub3QgX2FsbF8gb2YgdGhlXG4gICAgICogZmllbGRzLlxuICAgICAqL1xuICAgIGlmIChjbGF1c2UucHJlc2VuY2UgPT09IGx1bnIuUXVlcnkucHJlc2VuY2UuUkVRVUlSRUQpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgY2xhdXNlLmZpZWxkcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgZmllbGQgPSBjbGF1c2UuZmllbGRzW2tdXG4gICAgICAgIHJlcXVpcmVkTWF0Y2hlc1tmaWVsZF0gPSByZXF1aXJlZE1hdGNoZXNbZmllbGRdLmludGVyc2VjdChjbGF1c2VNYXRjaGVzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBOZWVkIHRvIGNvbWJpbmUgdGhlIGZpZWxkIHNjb3BlZCByZXF1aXJlZCBhbmQgcHJvaGliaXRlZFxuICAgKiBtYXRjaGluZyBkb2N1bWVudHMgaW50byBhIGdsb2JhbCBzZXQgb2YgcmVxdWlyZWQgYW5kIHByb2hpYml0ZWRcbiAgICogbWF0Y2hlc1xuICAgKi9cbiAgdmFyIGFsbFJlcXVpcmVkTWF0Y2hlcyA9IGx1bnIuU2V0LmNvbXBsZXRlLFxuICAgICAgYWxsUHJvaGliaXRlZE1hdGNoZXMgPSBsdW5yLlNldC5lbXB0eVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5maWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmllbGQgPSB0aGlzLmZpZWxkc1tpXVxuXG4gICAgaWYgKHJlcXVpcmVkTWF0Y2hlc1tmaWVsZF0pIHtcbiAgICAgIGFsbFJlcXVpcmVkTWF0Y2hlcyA9IGFsbFJlcXVpcmVkTWF0Y2hlcy5pbnRlcnNlY3QocmVxdWlyZWRNYXRjaGVzW2ZpZWxkXSlcbiAgICB9XG5cbiAgICBpZiAocHJvaGliaXRlZE1hdGNoZXNbZmllbGRdKSB7XG4gICAgICBhbGxQcm9oaWJpdGVkTWF0Y2hlcyA9IGFsbFByb2hpYml0ZWRNYXRjaGVzLnVuaW9uKHByb2hpYml0ZWRNYXRjaGVzW2ZpZWxkXSlcbiAgICB9XG4gIH1cblxuICB2YXIgbWF0Y2hpbmdGaWVsZFJlZnMgPSBPYmplY3Qua2V5cyhtYXRjaGluZ0ZpZWxkcyksXG4gICAgICByZXN1bHRzID0gW10sXG4gICAgICBtYXRjaGVzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gIC8qXG4gICAqIElmIHRoZSBxdWVyeSBpcyBuZWdhdGVkIChjb250YWlucyBvbmx5IHByb2hpYml0ZWQgdGVybXMpXG4gICAqIHdlIG5lZWQgdG8gZ2V0IF9hbGxfIGZpZWxkUmVmcyBjdXJyZW50bHkgZXhpc3RpbmcgaW4gdGhlXG4gICAqIGluZGV4LiBUaGlzIGlzIG9ubHkgZG9uZSB3aGVuIHdlIGtub3cgdGhhdCB0aGUgcXVlcnkgaXNcbiAgICogZW50aXJlbHkgcHJvaGliaXRlZCB0ZXJtcyB0byBhdm9pZCBhbnkgY29zdCBvZiBnZXR0aW5nIGFsbFxuICAgKiBmaWVsZFJlZnMgdW5uZWNlc3NhcmlseS5cbiAgICpcbiAgICogQWRkaXRpb25hbGx5LCBibGFuayBNYXRjaERhdGEgbXVzdCBiZSBjcmVhdGVkIHRvIGNvcnJlY3RseVxuICAgKiBwb3B1bGF0ZSB0aGUgcmVzdWx0cy5cbiAgICovXG4gIGlmIChxdWVyeS5pc05lZ2F0ZWQoKSkge1xuICAgIG1hdGNoaW5nRmllbGRSZWZzID0gT2JqZWN0LmtleXModGhpcy5maWVsZFZlY3RvcnMpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoaW5nRmllbGRSZWZzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbWF0Y2hpbmdGaWVsZFJlZiA9IG1hdGNoaW5nRmllbGRSZWZzW2ldXG4gICAgICB2YXIgZmllbGRSZWYgPSBsdW5yLkZpZWxkUmVmLmZyb21TdHJpbmcobWF0Y2hpbmdGaWVsZFJlZilcbiAgICAgIG1hdGNoaW5nRmllbGRzW21hdGNoaW5nRmllbGRSZWZdID0gbmV3IGx1bnIuTWF0Y2hEYXRhXG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaGluZ0ZpZWxkUmVmcy5sZW5ndGg7IGkrKykge1xuICAgIC8qXG4gICAgICogQ3VycmVudGx5IHdlIGhhdmUgZG9jdW1lbnQgZmllbGRzIHRoYXQgbWF0Y2ggdGhlIHF1ZXJ5LCBidXQgd2VcbiAgICAgKiBuZWVkIHRvIHJldHVybiBkb2N1bWVudHMuIFRoZSBtYXRjaERhdGEgYW5kIHNjb3JlcyBhcmUgY29tYmluZWRcbiAgICAgKiBmcm9tIG11bHRpcGxlIGZpZWxkcyBiZWxvbmdpbmcgdG8gdGhlIHNhbWUgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBTY29yZXMgYXJlIGNhbGN1bGF0ZWQgYnkgZmllbGQsIHVzaW5nIHRoZSBxdWVyeSB2ZWN0b3JzIGNyZWF0ZWRcbiAgICAgKiBhYm92ZSwgYW5kIGNvbWJpbmVkIGludG8gYSBmaW5hbCBkb2N1bWVudCBzY29yZSB1c2luZyBhZGRpdGlvbi5cbiAgICAgKi9cbiAgICB2YXIgZmllbGRSZWYgPSBsdW5yLkZpZWxkUmVmLmZyb21TdHJpbmcobWF0Y2hpbmdGaWVsZFJlZnNbaV0pLFxuICAgICAgICBkb2NSZWYgPSBmaWVsZFJlZi5kb2NSZWZcblxuICAgIGlmICghYWxsUmVxdWlyZWRNYXRjaGVzLmNvbnRhaW5zKGRvY1JlZikpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgaWYgKGFsbFByb2hpYml0ZWRNYXRjaGVzLmNvbnRhaW5zKGRvY1JlZikpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgdmFyIGZpZWxkVmVjdG9yID0gdGhpcy5maWVsZFZlY3RvcnNbZmllbGRSZWZdLFxuICAgICAgICBzY29yZSA9IHF1ZXJ5VmVjdG9yc1tmaWVsZFJlZi5maWVsZE5hbWVdLnNpbWlsYXJpdHkoZmllbGRWZWN0b3IpLFxuICAgICAgICBkb2NNYXRjaFxuXG4gICAgaWYgKChkb2NNYXRjaCA9IG1hdGNoZXNbZG9jUmVmXSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZG9jTWF0Y2guc2NvcmUgKz0gc2NvcmVcbiAgICAgIGRvY01hdGNoLm1hdGNoRGF0YS5jb21iaW5lKG1hdGNoaW5nRmllbGRzW2ZpZWxkUmVmXSlcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hdGNoID0ge1xuICAgICAgICByZWY6IGRvY1JlZixcbiAgICAgICAgc2NvcmU6IHNjb3JlLFxuICAgICAgICBtYXRjaERhdGE6IG1hdGNoaW5nRmllbGRzW2ZpZWxkUmVmXVxuICAgICAgfVxuICAgICAgbWF0Y2hlc1tkb2NSZWZdID0gbWF0Y2hcbiAgICAgIHJlc3VsdHMucHVzaChtYXRjaClcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBTb3J0IHRoZSByZXN1bHRzIG9iamVjdHMgYnkgc2NvcmUsIGhpZ2hlc3QgZmlyc3QuXG4gICAqL1xuICByZXR1cm4gcmVzdWx0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGIuc2NvcmUgLSBhLnNjb3JlXG4gIH0pXG59XG5cbi8qKlxuICogUHJlcGFyZXMgdGhlIGluZGV4IGZvciBKU09OIHNlcmlhbGl6YXRpb24uXG4gKlxuICogVGhlIHNjaGVtYSBmb3IgdGhpcyBKU09OIGJsb2Igd2lsbCBiZSBkZXNjcmliZWQgaW4gYVxuICogc2VwYXJhdGUgSlNPTiBzY2hlbWEgZmlsZS5cbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5sdW5yLkluZGV4LnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpbnZlcnRlZEluZGV4ID0gT2JqZWN0LmtleXModGhpcy5pbnZlcnRlZEluZGV4KVxuICAgIC5zb3J0KClcbiAgICAubWFwKGZ1bmN0aW9uICh0ZXJtKSB7XG4gICAgICByZXR1cm4gW3Rlcm0sIHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXV1cbiAgICB9LCB0aGlzKVxuXG4gIHZhciBmaWVsZFZlY3RvcnMgPSBPYmplY3Qua2V5cyh0aGlzLmZpZWxkVmVjdG9ycylcbiAgICAubWFwKGZ1bmN0aW9uIChyZWYpIHtcbiAgICAgIHJldHVybiBbcmVmLCB0aGlzLmZpZWxkVmVjdG9yc1tyZWZdLnRvSlNPTigpXVxuICAgIH0sIHRoaXMpXG5cbiAgcmV0dXJuIHtcbiAgICB2ZXJzaW9uOiBsdW5yLnZlcnNpb24sXG4gICAgZmllbGRzOiB0aGlzLmZpZWxkcyxcbiAgICBmaWVsZFZlY3RvcnM6IGZpZWxkVmVjdG9ycyxcbiAgICBpbnZlcnRlZEluZGV4OiBpbnZlcnRlZEluZGV4LFxuICAgIHBpcGVsaW5lOiB0aGlzLnBpcGVsaW5lLnRvSlNPTigpXG4gIH1cbn1cblxuLyoqXG4gKiBMb2FkcyBhIHByZXZpb3VzbHkgc2VyaWFsaXplZCBsdW5yLkluZGV4XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHNlcmlhbGl6ZWRJbmRleCAtIEEgcHJldmlvdXNseSBzZXJpYWxpemVkIGx1bnIuSW5kZXhcbiAqIEByZXR1cm5zIHtsdW5yLkluZGV4fVxuICovXG5sdW5yLkluZGV4LmxvYWQgPSBmdW5jdGlvbiAoc2VyaWFsaXplZEluZGV4KSB7XG4gIHZhciBhdHRycyA9IHt9LFxuICAgICAgZmllbGRWZWN0b3JzID0ge30sXG4gICAgICBzZXJpYWxpemVkVmVjdG9ycyA9IHNlcmlhbGl6ZWRJbmRleC5maWVsZFZlY3RvcnMsXG4gICAgICBpbnZlcnRlZEluZGV4ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIHNlcmlhbGl6ZWRJbnZlcnRlZEluZGV4ID0gc2VyaWFsaXplZEluZGV4LmludmVydGVkSW5kZXgsXG4gICAgICB0b2tlblNldEJ1aWxkZXIgPSBuZXcgbHVuci5Ub2tlblNldC5CdWlsZGVyLFxuICAgICAgcGlwZWxpbmUgPSBsdW5yLlBpcGVsaW5lLmxvYWQoc2VyaWFsaXplZEluZGV4LnBpcGVsaW5lKVxuXG4gIGlmIChzZXJpYWxpemVkSW5kZXgudmVyc2lvbiAhPSBsdW5yLnZlcnNpb24pIHtcbiAgICBsdW5yLnV0aWxzLndhcm4oXCJWZXJzaW9uIG1pc21hdGNoIHdoZW4gbG9hZGluZyBzZXJpYWxpc2VkIGluZGV4LiBDdXJyZW50IHZlcnNpb24gb2YgbHVuciAnXCIgKyBsdW5yLnZlcnNpb24gKyBcIicgZG9lcyBub3QgbWF0Y2ggc2VyaWFsaXplZCBpbmRleCAnXCIgKyBzZXJpYWxpemVkSW5kZXgudmVyc2lvbiArIFwiJ1wiKVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXJpYWxpemVkVmVjdG9ycy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0dXBsZSA9IHNlcmlhbGl6ZWRWZWN0b3JzW2ldLFxuICAgICAgICByZWYgPSB0dXBsZVswXSxcbiAgICAgICAgZWxlbWVudHMgPSB0dXBsZVsxXVxuXG4gICAgZmllbGRWZWN0b3JzW3JlZl0gPSBuZXcgbHVuci5WZWN0b3IoZWxlbWVudHMpXG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHNlcmlhbGl6ZWRJbnZlcnRlZEluZGV4Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHR1cGxlID0gc2VyaWFsaXplZEludmVydGVkSW5kZXhbaV0sXG4gICAgICAgIHRlcm0gPSB0dXBsZVswXSxcbiAgICAgICAgcG9zdGluZyA9IHR1cGxlWzFdXG5cbiAgICB0b2tlblNldEJ1aWxkZXIuaW5zZXJ0KHRlcm0pXG4gICAgaW52ZXJ0ZWRJbmRleFt0ZXJtXSA9IHBvc3RpbmdcbiAgfVxuXG4gIHRva2VuU2V0QnVpbGRlci5maW5pc2goKVxuXG4gIGF0dHJzLmZpZWxkcyA9IHNlcmlhbGl6ZWRJbmRleC5maWVsZHNcblxuICBhdHRycy5maWVsZFZlY3RvcnMgPSBmaWVsZFZlY3RvcnNcbiAgYXR0cnMuaW52ZXJ0ZWRJbmRleCA9IGludmVydGVkSW5kZXhcbiAgYXR0cnMudG9rZW5TZXQgPSB0b2tlblNldEJ1aWxkZXIucm9vdFxuICBhdHRycy5waXBlbGluZSA9IHBpcGVsaW5lXG5cbiAgcmV0dXJuIG5ldyBsdW5yLkluZGV4KGF0dHJzKVxufVxuLyohXG4gKiBsdW5yLkJ1aWxkZXJcbiAqIENvcHlyaWdodCAoQykgMjAyMCBPbGl2ZXIgTmlnaHRpbmdhbGVcbiAqL1xuXG4vKipcbiAqIGx1bnIuQnVpbGRlciBwZXJmb3JtcyBpbmRleGluZyBvbiBhIHNldCBvZiBkb2N1bWVudHMgYW5kXG4gKiByZXR1cm5zIGluc3RhbmNlcyBvZiBsdW5yLkluZGV4IHJlYWR5IGZvciBxdWVyeWluZy5cbiAqXG4gKiBBbGwgY29uZmlndXJhdGlvbiBvZiB0aGUgaW5kZXggaXMgZG9uZSB2aWEgdGhlIGJ1aWxkZXIsIHRoZVxuICogZmllbGRzIHRvIGluZGV4LCB0aGUgZG9jdW1lbnQgcmVmZXJlbmNlLCB0aGUgdGV4dCBwcm9jZXNzaW5nXG4gKiBwaXBlbGluZSBhbmQgZG9jdW1lbnQgc2NvcmluZyBwYXJhbWV0ZXJzIGFyZSBhbGwgc2V0IG9uIHRoZVxuICogYnVpbGRlciBiZWZvcmUgaW5kZXhpbmcuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJvcGVydHkge3N0cmluZ30gX3JlZiAtIEludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgcmVmZXJlbmNlIGZpZWxkLlxuICogQHByb3BlcnR5IHtzdHJpbmdbXX0gX2ZpZWxkcyAtIEludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgZG9jdW1lbnQgZmllbGRzIHRvIGluZGV4LlxuICogQHByb3BlcnR5IHtvYmplY3R9IGludmVydGVkSW5kZXggLSBUaGUgaW52ZXJ0ZWQgaW5kZXggbWFwcyB0ZXJtcyB0byBkb2N1bWVudCBmaWVsZHMuXG4gKiBAcHJvcGVydHkge29iamVjdH0gZG9jdW1lbnRUZXJtRnJlcXVlbmNpZXMgLSBLZWVwcyB0cmFjayBvZiBkb2N1bWVudCB0ZXJtIGZyZXF1ZW5jaWVzLlxuICogQHByb3BlcnR5IHtvYmplY3R9IGRvY3VtZW50TGVuZ3RocyAtIEtlZXBzIHRyYWNrIG9mIHRoZSBsZW5ndGggb2YgZG9jdW1lbnRzIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqIEBwcm9wZXJ0eSB7bHVuci50b2tlbml6ZXJ9IHRva2VuaXplciAtIEZ1bmN0aW9uIGZvciBzcGxpdHRpbmcgc3RyaW5ncyBpbnRvIHRva2VucyBmb3IgaW5kZXhpbmcuXG4gKiBAcHJvcGVydHkge2x1bnIuUGlwZWxpbmV9IHBpcGVsaW5lIC0gVGhlIHBpcGVsaW5lIHBlcmZvcm1zIHRleHQgcHJvY2Vzc2luZyBvbiB0b2tlbnMgYmVmb3JlIGluZGV4aW5nLlxuICogQHByb3BlcnR5IHtsdW5yLlBpcGVsaW5lfSBzZWFyY2hQaXBlbGluZSAtIEEgcGlwZWxpbmUgZm9yIHByb2Nlc3Npbmcgc2VhcmNoIHRlcm1zIGJlZm9yZSBxdWVyeWluZyB0aGUgaW5kZXguXG4gKiBAcHJvcGVydHkge251bWJlcn0gZG9jdW1lbnRDb3VudCAtIEtlZXBzIHRyYWNrIG9mIHRoZSB0b3RhbCBudW1iZXIgb2YgZG9jdW1lbnRzIGluZGV4ZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gX2IgLSBBIHBhcmFtZXRlciB0byBjb250cm9sIGZpZWxkIGxlbmd0aCBub3JtYWxpemF0aW9uLCBzZXR0aW5nIHRoaXMgdG8gMCBkaXNhYmxlZCBub3JtYWxpemF0aW9uLCAxIGZ1bGx5IG5vcm1hbGl6ZXMgZmllbGQgbGVuZ3RocywgdGhlIGRlZmF1bHQgdmFsdWUgaXMgMC43NS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBfazEgLSBBIHBhcmFtZXRlciB0byBjb250cm9sIGhvdyBxdWlja2x5IGFuIGluY3JlYXNlIGluIHRlcm0gZnJlcXVlbmN5IHJlc3VsdHMgaW4gdGVybSBmcmVxdWVuY3kgc2F0dXJhdGlvbiwgdGhlIGRlZmF1bHQgdmFsdWUgaXMgMS4yLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRlcm1JbmRleCAtIEEgY291bnRlciBpbmNyZW1lbnRlZCBmb3IgZWFjaCB1bmlxdWUgdGVybSwgdXNlZCB0byBpZGVudGlmeSBhIHRlcm1zIHBvc2l0aW9uIGluIHRoZSB2ZWN0b3Igc3BhY2UuXG4gKiBAcHJvcGVydHkge2FycmF5fSBtZXRhZGF0YVdoaXRlbGlzdCAtIEEgbGlzdCBvZiBtZXRhZGF0YSBrZXlzIHRoYXQgaGF2ZSBiZWVuIHdoaXRlbGlzdGVkIGZvciBlbnRyeSBpbiB0aGUgaW5kZXguXG4gKi9cbmx1bnIuQnVpbGRlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5fcmVmID0gXCJpZFwiXG4gIHRoaXMuX2ZpZWxkcyA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgdGhpcy5fZG9jdW1lbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICB0aGlzLmludmVydGVkSW5kZXggPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gIHRoaXMuZmllbGRUZXJtRnJlcXVlbmNpZXMgPSB7fVxuICB0aGlzLmZpZWxkTGVuZ3RocyA9IHt9XG4gIHRoaXMudG9rZW5pemVyID0gbHVuci50b2tlbml6ZXJcbiAgdGhpcy5waXBlbGluZSA9IG5ldyBsdW5yLlBpcGVsaW5lXG4gIHRoaXMuc2VhcmNoUGlwZWxpbmUgPSBuZXcgbHVuci5QaXBlbGluZVxuICB0aGlzLmRvY3VtZW50Q291bnQgPSAwXG4gIHRoaXMuX2IgPSAwLjc1XG4gIHRoaXMuX2sxID0gMS4yXG4gIHRoaXMudGVybUluZGV4ID0gMFxuICB0aGlzLm1ldGFkYXRhV2hpdGVsaXN0ID0gW11cbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBkb2N1bWVudCBmaWVsZCB1c2VkIGFzIHRoZSBkb2N1bWVudCByZWZlcmVuY2UuIEV2ZXJ5IGRvY3VtZW50IG11c3QgaGF2ZSB0aGlzIGZpZWxkLlxuICogVGhlIHR5cGUgb2YgdGhpcyBmaWVsZCBpbiB0aGUgZG9jdW1lbnQgc2hvdWxkIGJlIGEgc3RyaW5nLCBpZiBpdCBpcyBub3QgYSBzdHJpbmcgaXQgd2lsbCBiZVxuICogY29lcmNlZCBpbnRvIGEgc3RyaW5nIGJ5IGNhbGxpbmcgdG9TdHJpbmcuXG4gKlxuICogVGhlIGRlZmF1bHQgcmVmIGlzICdpZCcuXG4gKlxuICogVGhlIHJlZiBzaG91bGQgX25vdF8gYmUgY2hhbmdlZCBkdXJpbmcgaW5kZXhpbmcsIGl0IHNob3VsZCBiZSBzZXQgYmVmb3JlIGFueSBkb2N1bWVudHMgYXJlXG4gKiBhZGRlZCB0byB0aGUgaW5kZXguIENoYW5naW5nIGl0IGR1cmluZyBpbmRleGluZyBjYW4gbGVhZCB0byBpbmNvbnNpc3RlbnQgcmVzdWx0cy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVmIC0gVGhlIG5hbWUgb2YgdGhlIHJlZmVyZW5jZSBmaWVsZCBpbiB0aGUgZG9jdW1lbnQuXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24gKHJlZikge1xuICB0aGlzLl9yZWYgPSByZWZcbn1cblxuLyoqXG4gKiBBIGZ1bmN0aW9uIHRoYXQgaXMgdXNlZCB0byBleHRyYWN0IGEgZmllbGQgZnJvbSBhIGRvY3VtZW50LlxuICpcbiAqIEx1bnIgZXhwZWN0cyBhIGZpZWxkIHRvIGJlIGF0IHRoZSB0b3AgbGV2ZWwgb2YgYSBkb2N1bWVudCwgaWYgaG93ZXZlciB0aGUgZmllbGRcbiAqIGlzIGRlZXBseSBuZXN0ZWQgd2l0aGluIGEgZG9jdW1lbnQgYW4gZXh0cmFjdG9yIGZ1bmN0aW9uIGNhbiBiZSB1c2VkIHRvIGV4dHJhY3RcbiAqIHRoZSByaWdodCBmaWVsZCBmb3IgaW5kZXhpbmcuXG4gKlxuICogQGNhbGxiYWNrIGZpZWxkRXh0cmFjdG9yXG4gKiBAcGFyYW0ge29iamVjdH0gZG9jIC0gVGhlIGRvY3VtZW50IGJlaW5nIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqIEByZXR1cm5zIHs/KHN0cmluZ3xvYmplY3R8b2JqZWN0W10pfSBvYmogLSBUaGUgb2JqZWN0IHRoYXQgd2lsbCBiZSBpbmRleGVkIGZvciB0aGlzIGZpZWxkLlxuICogQGV4YW1wbGUgPGNhcHRpb24+RXh0cmFjdGluZyBhIG5lc3RlZCBmaWVsZDwvY2FwdGlvbj5cbiAqIGZ1bmN0aW9uIChkb2MpIHsgcmV0dXJuIGRvYy5uZXN0ZWQuZmllbGQgfVxuICovXG5cbi8qKlxuICogQWRkcyBhIGZpZWxkIHRvIHRoZSBsaXN0IG9mIGRvY3VtZW50IGZpZWxkcyB0aGF0IHdpbGwgYmUgaW5kZXhlZC4gRXZlcnkgZG9jdW1lbnQgYmVpbmdcbiAqIGluZGV4ZWQgc2hvdWxkIGhhdmUgdGhpcyBmaWVsZC4gTnVsbCB2YWx1ZXMgZm9yIHRoaXMgZmllbGQgaW4gaW5kZXhlZCBkb2N1bWVudHMgd2lsbFxuICogbm90IGNhdXNlIGVycm9ycyBidXQgd2lsbCBsaW1pdCB0aGUgY2hhbmNlIG9mIHRoYXQgZG9jdW1lbnQgYmVpbmcgcmV0cmlldmVkIGJ5IHNlYXJjaGVzLlxuICpcbiAqIEFsbCBmaWVsZHMgc2hvdWxkIGJlIGFkZGVkIGJlZm9yZSBhZGRpbmcgZG9jdW1lbnRzIHRvIHRoZSBpbmRleC4gQWRkaW5nIGZpZWxkcyBhZnRlclxuICogYSBkb2N1bWVudCBoYXMgYmVlbiBpbmRleGVkIHdpbGwgaGF2ZSBubyBlZmZlY3Qgb24gYWxyZWFkeSBpbmRleGVkIGRvY3VtZW50cy5cbiAqXG4gKiBGaWVsZHMgY2FuIGJlIGJvb3N0ZWQgYXQgYnVpbGQgdGltZS4gVGhpcyBhbGxvd3MgdGVybXMgd2l0aGluIHRoYXQgZmllbGQgdG8gaGF2ZSBtb3JlXG4gKiBpbXBvcnRhbmNlIHdoZW4gcmFua2luZyBzZWFyY2ggcmVzdWx0cy4gVXNlIGEgZmllbGQgYm9vc3QgdG8gc3BlY2lmeSB0aGF0IG1hdGNoZXMgd2l0aGluXG4gKiBvbmUgZmllbGQgYXJlIG1vcmUgaW1wb3J0YW50IHRoYW4gb3RoZXIgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZE5hbWUgLSBUaGUgbmFtZSBvZiBhIGZpZWxkIHRvIGluZGV4IGluIGFsbCBkb2N1bWVudHMuXG4gKiBAcGFyYW0ge29iamVjdH0gYXR0cmlidXRlcyAtIE9wdGlvbmFsIGF0dHJpYnV0ZXMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZmllbGQuXG4gKiBAcGFyYW0ge251bWJlcn0gW2F0dHJpYnV0ZXMuYm9vc3Q9MV0gLSBCb29zdCBhcHBsaWVkIHRvIGFsbCB0ZXJtcyB3aXRoaW4gdGhpcyBmaWVsZC5cbiAqIEBwYXJhbSB7ZmllbGRFeHRyYWN0b3J9IFthdHRyaWJ1dGVzLmV4dHJhY3Rvcl0gLSBGdW5jdGlvbiB0byBleHRyYWN0IGEgZmllbGQgZnJvbSBhIGRvY3VtZW50LlxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gZmllbGROYW1lIGNhbm5vdCBjb250YWluIHVuc3VwcG9ydGVkIGNoYXJhY3RlcnMgJy8nXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbiAoZmllbGROYW1lLCBhdHRyaWJ1dGVzKSB7XG4gIGlmICgvXFwvLy50ZXN0KGZpZWxkTmFtZSkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvciAoXCJGaWVsZCAnXCIgKyBmaWVsZE5hbWUgKyBcIicgY29udGFpbnMgaWxsZWdhbCBjaGFyYWN0ZXIgJy8nXCIpXG4gIH1cblxuICB0aGlzLl9maWVsZHNbZmllbGROYW1lXSA9IGF0dHJpYnV0ZXMgfHwge31cbn1cblxuLyoqXG4gKiBBIHBhcmFtZXRlciB0byB0dW5lIHRoZSBhbW91bnQgb2YgZmllbGQgbGVuZ3RoIG5vcm1hbGlzYXRpb24gdGhhdCBpcyBhcHBsaWVkIHdoZW5cbiAqIGNhbGN1bGF0aW5nIHJlbGV2YW5jZSBzY29yZXMuIEEgdmFsdWUgb2YgMCB3aWxsIGNvbXBsZXRlbHkgZGlzYWJsZSBhbnkgbm9ybWFsaXNhdGlvblxuICogYW5kIGEgdmFsdWUgb2YgMSB3aWxsIGZ1bGx5IG5vcm1hbGlzZSBmaWVsZCBsZW5ndGhzLiBUaGUgZGVmYXVsdCBpcyAwLjc1LiBWYWx1ZXMgb2YgYlxuICogd2lsbCBiZSBjbGFtcGVkIHRvIHRoZSByYW5nZSAwIC0gMS5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gVGhlIHZhbHVlIHRvIHNldCBmb3IgdGhpcyB0dW5pbmcgcGFyYW1ldGVyLlxuICovXG5sdW5yLkJ1aWxkZXIucHJvdG90eXBlLmIgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gIGlmIChudW1iZXIgPCAwKSB7XG4gICAgdGhpcy5fYiA9IDBcbiAgfSBlbHNlIGlmIChudW1iZXIgPiAxKSB7XG4gICAgdGhpcy5fYiA9IDFcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9iID0gbnVtYmVyXG4gIH1cbn1cblxuLyoqXG4gKiBBIHBhcmFtZXRlciB0aGF0IGNvbnRyb2xzIHRoZSBzcGVlZCBhdCB3aGljaCBhIHJpc2UgaW4gdGVybSBmcmVxdWVuY3kgcmVzdWx0cyBpbiB0ZXJtXG4gKiBmcmVxdWVuY3kgc2F0dXJhdGlvbi4gVGhlIGRlZmF1bHQgdmFsdWUgaXMgMS4yLiBTZXR0aW5nIHRoaXMgdG8gYSBoaWdoZXIgdmFsdWUgd2lsbCBnaXZlXG4gKiBzbG93ZXIgc2F0dXJhdGlvbiBsZXZlbHMsIGEgbG93ZXIgdmFsdWUgd2lsbCByZXN1bHQgaW4gcXVpY2tlciBzYXR1cmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgLSBUaGUgdmFsdWUgdG8gc2V0IGZvciB0aGlzIHR1bmluZyBwYXJhbWV0ZXIuXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuazEgPSBmdW5jdGlvbiAobnVtYmVyKSB7XG4gIHRoaXMuX2sxID0gbnVtYmVyXG59XG5cbi8qKlxuICogQWRkcyBhIGRvY3VtZW50IHRvIHRoZSBpbmRleC5cbiAqXG4gKiBCZWZvcmUgYWRkaW5nIGZpZWxkcyB0byB0aGUgaW5kZXggdGhlIGluZGV4IHNob3VsZCBoYXZlIGJlZW4gZnVsbHkgc2V0dXAsIHdpdGggdGhlIGRvY3VtZW50XG4gKiByZWYgYW5kIGFsbCBmaWVsZHMgdG8gaW5kZXggYWxyZWFkeSBoYXZpbmcgYmVlbiBzcGVjaWZpZWQuXG4gKlxuICogVGhlIGRvY3VtZW50IG11c3QgaGF2ZSBhIGZpZWxkIG5hbWUgYXMgc3BlY2lmaWVkIGJ5IHRoZSByZWYgKGJ5IGRlZmF1bHQgdGhpcyBpcyAnaWQnKSBhbmRcbiAqIGl0IHNob3VsZCBoYXZlIGFsbCBmaWVsZHMgZGVmaW5lZCBmb3IgaW5kZXhpbmcsIHRob3VnaCBudWxsIG9yIHVuZGVmaW5lZCB2YWx1ZXMgd2lsbCBub3RcbiAqIGNhdXNlIGVycm9ycy5cbiAqXG4gKiBFbnRpcmUgZG9jdW1lbnRzIGNhbiBiZSBib29zdGVkIGF0IGJ1aWxkIHRpbWUuIEFwcGx5aW5nIGEgYm9vc3QgdG8gYSBkb2N1bWVudCBpbmRpY2F0ZXMgdGhhdFxuICogdGhpcyBkb2N1bWVudCBzaG91bGQgcmFuayBoaWdoZXIgaW4gc2VhcmNoIHJlc3VsdHMgdGhhbiBvdGhlciBkb2N1bWVudHMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGRvYyAtIFRoZSBkb2N1bWVudCB0byBhZGQgdG8gdGhlIGluZGV4LlxuICogQHBhcmFtIHtvYmplY3R9IGF0dHJpYnV0ZXMgLSBPcHRpb25hbCBhdHRyaWJ1dGVzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRvY3VtZW50LlxuICogQHBhcmFtIHtudW1iZXJ9IFthdHRyaWJ1dGVzLmJvb3N0PTFdIC0gQm9vc3QgYXBwbGllZCB0byBhbGwgdGVybXMgd2l0aGluIHRoaXMgZG9jdW1lbnQuXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGRvYywgYXR0cmlidXRlcykge1xuICB2YXIgZG9jUmVmID0gZG9jW3RoaXMuX3JlZl0sXG4gICAgICBmaWVsZHMgPSBPYmplY3Qua2V5cyh0aGlzLl9maWVsZHMpXG5cbiAgdGhpcy5fZG9jdW1lbnRzW2RvY1JlZl0gPSBhdHRyaWJ1dGVzIHx8IHt9XG4gIHRoaXMuZG9jdW1lbnRDb3VudCArPSAxXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmllbGROYW1lID0gZmllbGRzW2ldLFxuICAgICAgICBleHRyYWN0b3IgPSB0aGlzLl9maWVsZHNbZmllbGROYW1lXS5leHRyYWN0b3IsXG4gICAgICAgIGZpZWxkID0gZXh0cmFjdG9yID8gZXh0cmFjdG9yKGRvYykgOiBkb2NbZmllbGROYW1lXSxcbiAgICAgICAgdG9rZW5zID0gdGhpcy50b2tlbml6ZXIoZmllbGQsIHtcbiAgICAgICAgICBmaWVsZHM6IFtmaWVsZE5hbWVdXG4gICAgICAgIH0pLFxuICAgICAgICB0ZXJtcyA9IHRoaXMucGlwZWxpbmUucnVuKHRva2VucyksXG4gICAgICAgIGZpZWxkUmVmID0gbmV3IGx1bnIuRmllbGRSZWYgKGRvY1JlZiwgZmllbGROYW1lKSxcbiAgICAgICAgZmllbGRUZXJtcyA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICAgIHRoaXMuZmllbGRUZXJtRnJlcXVlbmNpZXNbZmllbGRSZWZdID0gZmllbGRUZXJtc1xuICAgIHRoaXMuZmllbGRMZW5ndGhzW2ZpZWxkUmVmXSA9IDBcblxuICAgIC8vIHN0b3JlIHRoZSBsZW5ndGggb2YgdGhpcyBmaWVsZCBmb3IgdGhpcyBkb2N1bWVudFxuICAgIHRoaXMuZmllbGRMZW5ndGhzW2ZpZWxkUmVmXSArPSB0ZXJtcy5sZW5ndGhcblxuICAgIC8vIGNhbGN1bGF0ZSB0ZXJtIGZyZXF1ZW5jaWVzIGZvciB0aGlzIGZpZWxkXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCB0ZXJtcy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIHRlcm0gPSB0ZXJtc1tqXVxuXG4gICAgICBpZiAoZmllbGRUZXJtc1t0ZXJtXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZmllbGRUZXJtc1t0ZXJtXSA9IDBcbiAgICAgIH1cblxuICAgICAgZmllbGRUZXJtc1t0ZXJtXSArPSAxXG5cbiAgICAgIC8vIGFkZCB0byBpbnZlcnRlZCBpbmRleFxuICAgICAgLy8gY3JlYXRlIGFuIGluaXRpYWwgcG9zdGluZyBpZiBvbmUgZG9lc24ndCBleGlzdFxuICAgICAgaWYgKHRoaXMuaW52ZXJ0ZWRJbmRleFt0ZXJtXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHBvc3RpbmcgPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgIHBvc3RpbmdbXCJfaW5kZXhcIl0gPSB0aGlzLnRlcm1JbmRleFxuICAgICAgICB0aGlzLnRlcm1JbmRleCArPSAxXG5cbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBmaWVsZHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICBwb3N0aW5nW2ZpZWxkc1trXV0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV0gPSBwb3N0aW5nXG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCBhbiBlbnRyeSBmb3IgdGhpcyB0ZXJtL2ZpZWxkTmFtZS9kb2NSZWYgdG8gdGhlIGludmVydGVkSW5kZXhcbiAgICAgIGlmICh0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdID09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLmludmVydGVkSW5kZXhbdGVybV1bZmllbGROYW1lXVtkb2NSZWZdID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgICAgfVxuXG4gICAgICAvLyBzdG9yZSBhbGwgd2hpdGVsaXN0ZWQgbWV0YWRhdGEgYWJvdXQgdGhpcyB0b2tlbiBpbiB0aGVcbiAgICAgIC8vIGludmVydGVkIGluZGV4XG4gICAgICBmb3IgKHZhciBsID0gMDsgbCA8IHRoaXMubWV0YWRhdGFXaGl0ZWxpc3QubGVuZ3RoOyBsKyspIHtcbiAgICAgICAgdmFyIG1ldGFkYXRhS2V5ID0gdGhpcy5tZXRhZGF0YVdoaXRlbGlzdFtsXSxcbiAgICAgICAgICAgIG1ldGFkYXRhID0gdGVybS5tZXRhZGF0YVttZXRhZGF0YUtleV1cblxuICAgICAgICBpZiAodGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dW2ZpZWxkTmFtZV1bZG9jUmVmXVttZXRhZGF0YUtleV0gPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dW2ZpZWxkTmFtZV1bZG9jUmVmXVttZXRhZGF0YUtleV0gPSBbXVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dW2ZpZWxkTmFtZV1bZG9jUmVmXVttZXRhZGF0YUtleV0ucHVzaChtZXRhZGF0YSlcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGF2ZXJhZ2UgZG9jdW1lbnQgbGVuZ3RoIGZvciB0aGlzIGluZGV4XG4gKlxuICogQHByaXZhdGVcbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5jYWxjdWxhdGVBdmVyYWdlRmllbGRMZW5ndGhzID0gZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmaWVsZFJlZnMgPSBPYmplY3Qua2V5cyh0aGlzLmZpZWxkTGVuZ3RocyksXG4gICAgICBudW1iZXJPZkZpZWxkcyA9IGZpZWxkUmVmcy5sZW5ndGgsXG4gICAgICBhY2N1bXVsYXRvciA9IHt9LFxuICAgICAgZG9jdW1lbnRzV2l0aEZpZWxkID0ge31cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlck9mRmllbGRzOyBpKyspIHtcbiAgICB2YXIgZmllbGRSZWYgPSBsdW5yLkZpZWxkUmVmLmZyb21TdHJpbmcoZmllbGRSZWZzW2ldKSxcbiAgICAgICAgZmllbGQgPSBmaWVsZFJlZi5maWVsZE5hbWVcblxuICAgIGRvY3VtZW50c1dpdGhGaWVsZFtmaWVsZF0gfHwgKGRvY3VtZW50c1dpdGhGaWVsZFtmaWVsZF0gPSAwKVxuICAgIGRvY3VtZW50c1dpdGhGaWVsZFtmaWVsZF0gKz0gMVxuXG4gICAgYWNjdW11bGF0b3JbZmllbGRdIHx8IChhY2N1bXVsYXRvcltmaWVsZF0gPSAwKVxuICAgIGFjY3VtdWxhdG9yW2ZpZWxkXSArPSB0aGlzLmZpZWxkTGVuZ3Roc1tmaWVsZFJlZl1cbiAgfVxuXG4gIHZhciBmaWVsZHMgPSBPYmplY3Qua2V5cyh0aGlzLl9maWVsZHMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZmllbGROYW1lID0gZmllbGRzW2ldXG4gICAgYWNjdW11bGF0b3JbZmllbGROYW1lXSA9IGFjY3VtdWxhdG9yW2ZpZWxkTmFtZV0gLyBkb2N1bWVudHNXaXRoRmllbGRbZmllbGROYW1lXVxuICB9XG5cbiAgdGhpcy5hdmVyYWdlRmllbGRMZW5ndGggPSBhY2N1bXVsYXRvclxufVxuXG4vKipcbiAqIEJ1aWxkcyBhIHZlY3RvciBzcGFjZSBtb2RlbCBvZiBldmVyeSBkb2N1bWVudCB1c2luZyBsdW5yLlZlY3RvclxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuY3JlYXRlRmllbGRWZWN0b3JzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZmllbGRWZWN0b3JzID0ge30sXG4gICAgICBmaWVsZFJlZnMgPSBPYmplY3Qua2V5cyh0aGlzLmZpZWxkVGVybUZyZXF1ZW5jaWVzKSxcbiAgICAgIGZpZWxkUmVmc0xlbmd0aCA9IGZpZWxkUmVmcy5sZW5ndGgsXG4gICAgICB0ZXJtSWRmQ2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZFJlZnNMZW5ndGg7IGkrKykge1xuICAgIHZhciBmaWVsZFJlZiA9IGx1bnIuRmllbGRSZWYuZnJvbVN0cmluZyhmaWVsZFJlZnNbaV0pLFxuICAgICAgICBmaWVsZE5hbWUgPSBmaWVsZFJlZi5maWVsZE5hbWUsXG4gICAgICAgIGZpZWxkTGVuZ3RoID0gdGhpcy5maWVsZExlbmd0aHNbZmllbGRSZWZdLFxuICAgICAgICBmaWVsZFZlY3RvciA9IG5ldyBsdW5yLlZlY3RvcixcbiAgICAgICAgdGVybUZyZXF1ZW5jaWVzID0gdGhpcy5maWVsZFRlcm1GcmVxdWVuY2llc1tmaWVsZFJlZl0sXG4gICAgICAgIHRlcm1zID0gT2JqZWN0LmtleXModGVybUZyZXF1ZW5jaWVzKSxcbiAgICAgICAgdGVybXNMZW5ndGggPSB0ZXJtcy5sZW5ndGhcblxuXG4gICAgdmFyIGZpZWxkQm9vc3QgPSB0aGlzLl9maWVsZHNbZmllbGROYW1lXS5ib29zdCB8fCAxLFxuICAgICAgICBkb2NCb29zdCA9IHRoaXMuX2RvY3VtZW50c1tmaWVsZFJlZi5kb2NSZWZdLmJvb3N0IHx8IDFcblxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGVybXNMZW5ndGg7IGorKykge1xuICAgICAgdmFyIHRlcm0gPSB0ZXJtc1tqXSxcbiAgICAgICAgICB0ZiA9IHRlcm1GcmVxdWVuY2llc1t0ZXJtXSxcbiAgICAgICAgICB0ZXJtSW5kZXggPSB0aGlzLmludmVydGVkSW5kZXhbdGVybV0uX2luZGV4LFxuICAgICAgICAgIGlkZiwgc2NvcmUsIHNjb3JlV2l0aFByZWNpc2lvblxuXG4gICAgICBpZiAodGVybUlkZkNhY2hlW3Rlcm1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWRmID0gbHVuci5pZGYodGhpcy5pbnZlcnRlZEluZGV4W3Rlcm1dLCB0aGlzLmRvY3VtZW50Q291bnQpXG4gICAgICAgIHRlcm1JZGZDYWNoZVt0ZXJtXSA9IGlkZlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWRmID0gdGVybUlkZkNhY2hlW3Rlcm1dXG4gICAgICB9XG5cbiAgICAgIHNjb3JlID0gaWRmICogKCh0aGlzLl9rMSArIDEpICogdGYpIC8gKHRoaXMuX2sxICogKDEgLSB0aGlzLl9iICsgdGhpcy5fYiAqIChmaWVsZExlbmd0aCAvIHRoaXMuYXZlcmFnZUZpZWxkTGVuZ3RoW2ZpZWxkTmFtZV0pKSArIHRmKVxuICAgICAgc2NvcmUgKj0gZmllbGRCb29zdFxuICAgICAgc2NvcmUgKj0gZG9jQm9vc3RcbiAgICAgIHNjb3JlV2l0aFByZWNpc2lvbiA9IE1hdGgucm91bmQoc2NvcmUgKiAxMDAwKSAvIDEwMDBcbiAgICAgIC8vIENvbnZlcnRzIDEuMjM0NTY3ODkgdG8gMS4yMzQuXG4gICAgICAvLyBSZWR1Y2luZyB0aGUgcHJlY2lzaW9uIHNvIHRoYXQgdGhlIHZlY3RvcnMgdGFrZSB1cCBsZXNzXG4gICAgICAvLyBzcGFjZSB3aGVuIHNlcmlhbGlzZWQuIERvaW5nIGl0IG5vdyBzbyB0aGF0IHRoZXkgYmVoYXZlXG4gICAgICAvLyB0aGUgc2FtZSBiZWZvcmUgYW5kIGFmdGVyIHNlcmlhbGlzYXRpb24uIEFsc28sIHRoaXMgaXNcbiAgICAgIC8vIHRoZSBmYXN0ZXN0IGFwcHJvYWNoIHRvIHJlZHVjaW5nIGEgbnVtYmVyJ3MgcHJlY2lzaW9uIGluXG4gICAgICAvLyBKYXZhU2NyaXB0LlxuXG4gICAgICBmaWVsZFZlY3Rvci5pbnNlcnQodGVybUluZGV4LCBzY29yZVdpdGhQcmVjaXNpb24pXG4gICAgfVxuXG4gICAgZmllbGRWZWN0b3JzW2ZpZWxkUmVmXSA9IGZpZWxkVmVjdG9yXG4gIH1cblxuICB0aGlzLmZpZWxkVmVjdG9ycyA9IGZpZWxkVmVjdG9yc1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB0b2tlbiBzZXQgb2YgYWxsIHRva2VucyBpbiB0aGUgaW5kZXggdXNpbmcgbHVuci5Ub2tlblNldFxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmx1bnIuQnVpbGRlci5wcm90b3R5cGUuY3JlYXRlVG9rZW5TZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMudG9rZW5TZXQgPSBsdW5yLlRva2VuU2V0LmZyb21BcnJheShcbiAgICBPYmplY3Qua2V5cyh0aGlzLmludmVydGVkSW5kZXgpLnNvcnQoKVxuICApXG59XG5cbi8qKlxuICogQnVpbGRzIHRoZSBpbmRleCwgY3JlYXRpbmcgYW4gaW5zdGFuY2Ugb2YgbHVuci5JbmRleC5cbiAqXG4gKiBUaGlzIGNvbXBsZXRlcyB0aGUgaW5kZXhpbmcgcHJvY2VzcyBhbmQgc2hvdWxkIG9ubHkgYmUgY2FsbGVkXG4gKiBvbmNlIGFsbCBkb2N1bWVudHMgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZSBpbmRleC5cbiAqXG4gKiBAcmV0dXJucyB7bHVuci5JbmRleH1cbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS5idWlsZCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jYWxjdWxhdGVBdmVyYWdlRmllbGRMZW5ndGhzKClcbiAgdGhpcy5jcmVhdGVGaWVsZFZlY3RvcnMoKVxuICB0aGlzLmNyZWF0ZVRva2VuU2V0KClcblxuICByZXR1cm4gbmV3IGx1bnIuSW5kZXgoe1xuICAgIGludmVydGVkSW5kZXg6IHRoaXMuaW52ZXJ0ZWRJbmRleCxcbiAgICBmaWVsZFZlY3RvcnM6IHRoaXMuZmllbGRWZWN0b3JzLFxuICAgIHRva2VuU2V0OiB0aGlzLnRva2VuU2V0LFxuICAgIGZpZWxkczogT2JqZWN0LmtleXModGhpcy5fZmllbGRzKSxcbiAgICBwaXBlbGluZTogdGhpcy5zZWFyY2hQaXBlbGluZVxuICB9KVxufVxuXG4vKipcbiAqIEFwcGxpZXMgYSBwbHVnaW4gdG8gdGhlIGluZGV4IGJ1aWxkZXIuXG4gKlxuICogQSBwbHVnaW4gaXMgYSBmdW5jdGlvbiB0aGF0IGlzIGNhbGxlZCB3aXRoIHRoZSBpbmRleCBidWlsZGVyIGFzIGl0cyBjb250ZXh0LlxuICogUGx1Z2lucyBjYW4gYmUgdXNlZCB0byBjdXN0b21pc2Ugb3IgZXh0ZW5kIHRoZSBiZWhhdmlvdXIgb2YgdGhlIGluZGV4XG4gKiBpbiBzb21lIHdheS4gQSBwbHVnaW4gaXMganVzdCBhIGZ1bmN0aW9uLCB0aGF0IGVuY2Fwc3VsYXRlZCB0aGUgY3VzdG9tXG4gKiBiZWhhdmlvdXIgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB3aGVuIGJ1aWxkaW5nIHRoZSBpbmRleC5cbiAqXG4gKiBUaGUgcGx1Z2luIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGluZGV4IGJ1aWxkZXIgYXMgaXRzIGFyZ3VtZW50LCBhZGRpdGlvbmFsXG4gKiBhcmd1bWVudHMgY2FuIGFsc28gYmUgcGFzc2VkIHdoZW4gY2FsbGluZyB1c2UuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZFxuICogd2l0aCB0aGUgaW5kZXggYnVpbGRlciBhcyBpdHMgY29udGV4dC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwbHVnaW4gVGhlIHBsdWdpbiB0byBhcHBseS5cbiAqL1xubHVuci5CdWlsZGVyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiAoZm4pIHtcbiAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gIGFyZ3MudW5zaGlmdCh0aGlzKVxuICBmbi5hcHBseSh0aGlzLCBhcmdzKVxufVxuLyoqXG4gKiBDb250YWlucyBhbmQgY29sbGVjdHMgbWV0YWRhdGEgYWJvdXQgYSBtYXRjaGluZyBkb2N1bWVudC5cbiAqIEEgc2luZ2xlIGluc3RhbmNlIG9mIGx1bnIuTWF0Y2hEYXRhIGlzIHJldHVybmVkIGFzIHBhcnQgb2YgZXZlcnlcbiAqIGx1bnIuSW5kZXh+UmVzdWx0LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtzdHJpbmd9IHRlcm0gLSBUaGUgdGVybSB0aGlzIG1hdGNoIGRhdGEgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSBUaGUgZmllbGQgaW4gd2hpY2ggdGhlIHRlcm0gd2FzIGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGEgLSBUaGUgbWV0YWRhdGEgcmVjb3JkZWQgYWJvdXQgdGhpcyB0ZXJtIGluIHRoaXMgZmllbGRcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtZXRhZGF0YSAtIEEgY2xvbmVkIGNvbGxlY3Rpb24gb2YgbWV0YWRhdGEgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZG9jdW1lbnQuXG4gKiBAc2VlIHtAbGluayBsdW5yLkluZGV4flJlc3VsdH1cbiAqL1xubHVuci5NYXRjaERhdGEgPSBmdW5jdGlvbiAodGVybSwgZmllbGQsIG1ldGFkYXRhKSB7XG4gIHZhciBjbG9uZWRNZXRhZGF0YSA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICBtZXRhZGF0YUtleXMgPSBPYmplY3Qua2V5cyhtZXRhZGF0YSB8fCB7fSlcblxuICAvLyBDbG9uaW5nIHRoZSBtZXRhZGF0YSB0byBwcmV2ZW50IHRoZSBvcmlnaW5hbFxuICAvLyBiZWluZyBtdXRhdGVkIGR1cmluZyBtYXRjaCBkYXRhIGNvbWJpbmF0aW9uLlxuICAvLyBNZXRhZGF0YSBpcyBrZXB0IGluIGFuIGFycmF5IHdpdGhpbiB0aGUgaW52ZXJ0ZWRcbiAgLy8gaW5kZXggc28gY2xvbmluZyB0aGUgZGF0YSBjYW4gYmUgZG9uZSB3aXRoXG4gIC8vIEFycmF5I3NsaWNlXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbWV0YWRhdGFLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IG1ldGFkYXRhS2V5c1tpXVxuICAgIGNsb25lZE1ldGFkYXRhW2tleV0gPSBtZXRhZGF0YVtrZXldLnNsaWNlKClcbiAgfVxuXG4gIHRoaXMubWV0YWRhdGEgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgaWYgKHRlcm0gIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMubWV0YWRhdGFbdGVybV0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0gPSBjbG9uZWRNZXRhZGF0YVxuICB9XG59XG5cbi8qKlxuICogQW4gaW5zdGFuY2Ugb2YgbHVuci5NYXRjaERhdGEgd2lsbCBiZSBjcmVhdGVkIGZvciBldmVyeSB0ZXJtIHRoYXQgbWF0Y2hlcyBhXG4gKiBkb2N1bWVudC4gSG93ZXZlciBvbmx5IG9uZSBpbnN0YW5jZSBpcyByZXF1aXJlZCBpbiBhIGx1bnIuSW5kZXh+UmVzdWx0LiBUaGlzXG4gKiBtZXRob2QgY29tYmluZXMgbWV0YWRhdGEgZnJvbSBhbm90aGVyIGluc3RhbmNlIG9mIGx1bnIuTWF0Y2hEYXRhIHdpdGggdGhpc1xuICogb2JqZWN0cyBtZXRhZGF0YS5cbiAqXG4gKiBAcGFyYW0ge2x1bnIuTWF0Y2hEYXRhfSBvdGhlck1hdGNoRGF0YSAtIEFub3RoZXIgaW5zdGFuY2Ugb2YgbWF0Y2ggZGF0YSB0byBtZXJnZSB3aXRoIHRoaXMgb25lLlxuICogQHNlZSB7QGxpbmsgbHVuci5JbmRleH5SZXN1bHR9XG4gKi9cbmx1bnIuTWF0Y2hEYXRhLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24gKG90aGVyTWF0Y2hEYXRhKSB7XG4gIHZhciB0ZXJtcyA9IE9iamVjdC5rZXlzKG90aGVyTWF0Y2hEYXRhLm1ldGFkYXRhKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGVybXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdGVybSA9IHRlcm1zW2ldLFxuICAgICAgICBmaWVsZHMgPSBPYmplY3Qua2V5cyhvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXSlcblxuICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dID09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXSA9IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICB9XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZpZWxkcy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIGZpZWxkID0gZmllbGRzW2pdLFxuICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0pXG5cbiAgICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwga2V5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1trXVxuXG4gICAgICAgIGlmICh0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPSBvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdW2tleV0gPSB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldLmNvbmNhdChvdGhlck1hdGNoRGF0YS5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSlcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWRkIG1ldGFkYXRhIGZvciBhIHRlcm0vZmllbGQgcGFpciB0byB0aGlzIGluc3RhbmNlIG9mIG1hdGNoIGRhdGEuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRlcm0gLSBUaGUgdGVybSB0aGlzIG1hdGNoIGRhdGEgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gZmllbGQgLSBUaGUgZmllbGQgaW4gd2hpY2ggdGhlIHRlcm0gd2FzIGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gbWV0YWRhdGEgLSBUaGUgbWV0YWRhdGEgcmVjb3JkZWQgYWJvdXQgdGhpcyB0ZXJtIGluIHRoaXMgZmllbGRcbiAqL1xubHVuci5NYXRjaERhdGEucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0ZXJtLCBmaWVsZCwgbWV0YWRhdGEpIHtcbiAgaWYgKCEodGVybSBpbiB0aGlzLm1ldGFkYXRhKSkge1xuICAgIHRoaXMubWV0YWRhdGFbdGVybV0gPSBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF0gPSBtZXRhZGF0YVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCEoZmllbGQgaW4gdGhpcy5tZXRhZGF0YVt0ZXJtXSkpIHtcbiAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXSA9IG1ldGFkYXRhXG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgbWV0YWRhdGFLZXlzID0gT2JqZWN0LmtleXMobWV0YWRhdGEpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRhZGF0YUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gbWV0YWRhdGFLZXlzW2ldXG5cbiAgICBpZiAoa2V5IGluIHRoaXMubWV0YWRhdGFbdGVybV1bZmllbGRdKSB7XG4gICAgICB0aGlzLm1ldGFkYXRhW3Rlcm1dW2ZpZWxkXVtrZXldID0gdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XS5jb25jYXQobWV0YWRhdGFba2V5XSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXRhZGF0YVt0ZXJtXVtmaWVsZF1ba2V5XSA9IG1ldGFkYXRhW2tleV1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogQSBsdW5yLlF1ZXJ5IHByb3ZpZGVzIGEgcHJvZ3JhbW1hdGljIHdheSBvZiBkZWZpbmluZyBxdWVyaWVzIHRvIGJlIHBlcmZvcm1lZFxuICogYWdhaW5zdCBhIHtAbGluayBsdW5yLkluZGV4fS5cbiAqXG4gKiBQcmVmZXIgY29uc3RydWN0aW5nIGEgbHVuci5RdWVyeSB1c2luZyB0aGUge0BsaW5rIGx1bnIuSW5kZXgjcXVlcnl9IG1ldGhvZFxuICogc28gdGhlIHF1ZXJ5IG9iamVjdCBpcyBwcmUtaW5pdGlhbGl6ZWQgd2l0aCB0aGUgcmlnaHQgaW5kZXggZmllbGRzLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHByb3BlcnR5IHtsdW5yLlF1ZXJ5fkNsYXVzZVtdfSBjbGF1c2VzIC0gQW4gYXJyYXkgb2YgcXVlcnkgY2xhdXNlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nW119IGFsbEZpZWxkcyAtIEFuIGFycmF5IG9mIGFsbCBhdmFpbGFibGUgZmllbGRzIGluIGEgbHVuci5JbmRleC5cbiAqL1xubHVuci5RdWVyeSA9IGZ1bmN0aW9uIChhbGxGaWVsZHMpIHtcbiAgdGhpcy5jbGF1c2VzID0gW11cbiAgdGhpcy5hbGxGaWVsZHMgPSBhbGxGaWVsZHNcbn1cblxuLyoqXG4gKiBDb25zdGFudHMgZm9yIGluZGljYXRpbmcgd2hhdCBraW5kIG9mIGF1dG9tYXRpYyB3aWxkY2FyZCBpbnNlcnRpb24gd2lsbCBiZSB1c2VkIHdoZW4gY29uc3RydWN0aW5nIGEgcXVlcnkgY2xhdXNlLlxuICpcbiAqIFRoaXMgYWxsb3dzIHdpbGRjYXJkcyB0byBiZSBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSB0ZXJtIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IGRvIGFueSBzdHJpbmdcbiAqIGNvbmNhdGVuYXRpb24uXG4gKlxuICogVGhlIHdpbGRjYXJkIGNvbnN0YW50cyBjYW4gYmUgYml0d2lzZSBjb21iaW5lZCB0byBzZWxlY3QgYm90aCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aWxkY2FyZHMuXG4gKlxuICogQGNvbnN0YW50XG4gKiBAZGVmYXVsdFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpbGRjYXJkLk5PTkUgLSBUaGUgdGVybSB3aWxsIGhhdmUgbm8gd2lsZGNhcmRzIGluc2VydGVkLCB0aGlzIGlzIHRoZSBkZWZhdWx0IGJlaGF2aW91clxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpbGRjYXJkLkxFQURJTkcgLSBQcmVwZW5kIHRoZSB0ZXJtIHdpdGggYSB3aWxkY2FyZCwgdW5sZXNzIGEgbGVhZGluZyB3aWxkY2FyZCBhbHJlYWR5IGV4aXN0c1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpbGRjYXJkLlRSQUlMSU5HIC0gQXBwZW5kIGEgd2lsZGNhcmQgdG8gdGhlIHRlcm0sIHVubGVzcyBhIHRyYWlsaW5nIHdpbGRjYXJkIGFscmVhZHkgZXhpc3RzXG4gKiBAc2VlIGx1bnIuUXVlcnl+Q2xhdXNlXG4gKiBAc2VlIGx1bnIuUXVlcnkjY2xhdXNlXG4gKiBAc2VlIGx1bnIuUXVlcnkjdGVybVxuICogQGV4YW1wbGUgPGNhcHRpb24+cXVlcnkgdGVybSB3aXRoIHRyYWlsaW5nIHdpbGRjYXJkPC9jYXB0aW9uPlxuICogcXVlcnkudGVybSgnZm9vJywgeyB3aWxkY2FyZDogbHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElORyB9KVxuICogQGV4YW1wbGUgPGNhcHRpb24+cXVlcnkgdGVybSB3aXRoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdpbGRjYXJkPC9jYXB0aW9uPlxuICogcXVlcnkudGVybSgnZm9vJywge1xuICogICB3aWxkY2FyZDogbHVuci5RdWVyeS53aWxkY2FyZC5MRUFESU5HIHwgbHVuci5RdWVyeS53aWxkY2FyZC5UUkFJTElOR1xuICogfSlcbiAqL1xuXG5sdW5yLlF1ZXJ5LndpbGRjYXJkID0gbmV3IFN0cmluZyAoXCIqXCIpXG5sdW5yLlF1ZXJ5LndpbGRjYXJkLk5PTkUgPSAwXG5sdW5yLlF1ZXJ5LndpbGRjYXJkLkxFQURJTkcgPSAxXG5sdW5yLlF1ZXJ5LndpbGRjYXJkLlRSQUlMSU5HID0gMlxuXG4vKipcbiAqIENvbnN0YW50cyBmb3IgaW5kaWNhdGluZyB3aGF0IGtpbmQgb2YgcHJlc2VuY2UgYSB0ZXJtIG11c3QgaGF2ZSBpbiBtYXRjaGluZyBkb2N1bWVudHMuXG4gKlxuICogQGNvbnN0YW50XG4gKiBAZW51bSB7bnVtYmVyfVxuICogQHNlZSBsdW5yLlF1ZXJ5fkNsYXVzZVxuICogQHNlZSBsdW5yLlF1ZXJ5I2NsYXVzZVxuICogQHNlZSBsdW5yLlF1ZXJ5I3Rlcm1cbiAqIEBleGFtcGxlIDxjYXB0aW9uPnF1ZXJ5IHRlcm0gd2l0aCByZXF1aXJlZCBwcmVzZW5jZTwvY2FwdGlvbj5cbiAqIHF1ZXJ5LnRlcm0oJ2ZvbycsIHsgcHJlc2VuY2U6IGx1bnIuUXVlcnkucHJlc2VuY2UuUkVRVUlSRUQgfSlcbiAqL1xubHVuci5RdWVyeS5wcmVzZW5jZSA9IHtcbiAgLyoqXG4gICAqIFRlcm0ncyBwcmVzZW5jZSBpbiBhIGRvY3VtZW50IGlzIG9wdGlvbmFsLCB0aGlzIGlzIHRoZSBkZWZhdWx0IHZhbHVlLlxuICAgKi9cbiAgT1BUSU9OQUw6IDEsXG5cbiAgLyoqXG4gICAqIFRlcm0ncyBwcmVzZW5jZSBpbiBhIGRvY3VtZW50IGlzIHJlcXVpcmVkLCBkb2N1bWVudHMgdGhhdCBkbyBub3QgY29udGFpblxuICAgKiB0aGlzIHRlcm0gd2lsbCBub3QgYmUgcmV0dXJuZWQuXG4gICAqL1xuICBSRVFVSVJFRDogMixcblxuICAvKipcbiAgICogVGVybSdzIHByZXNlbmNlIGluIGEgZG9jdW1lbnQgaXMgcHJvaGliaXRlZCwgZG9jdW1lbnRzIHRoYXQgZG8gY29udGFpblxuICAgKiB0aGlzIHRlcm0gd2lsbCBub3QgYmUgcmV0dXJuZWQuXG4gICAqL1xuICBQUk9ISUJJVEVEOiAzXG59XG5cbi8qKlxuICogQSBzaW5nbGUgY2xhdXNlIGluIGEge0BsaW5rIGx1bnIuUXVlcnl9IGNvbnRhaW5zIGEgdGVybSBhbmQgZGV0YWlscyBvbiBob3cgdG9cbiAqIG1hdGNoIHRoYXQgdGVybSBhZ2FpbnN0IGEge0BsaW5rIGx1bnIuSW5kZXh9LlxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IGx1bnIuUXVlcnl+Q2xhdXNlXG4gKiBAcHJvcGVydHkge3N0cmluZ1tdfSBmaWVsZHMgLSBUaGUgZmllbGRzIGluIGFuIGluZGV4IHRoaXMgY2xhdXNlIHNob3VsZCBiZSBtYXRjaGVkIGFnYWluc3QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gW2Jvb3N0PTFdIC0gQW55IGJvb3N0IHRoYXQgc2hvdWxkIGJlIGFwcGxpZWQgd2hlbiBtYXRjaGluZyB0aGlzIGNsYXVzZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbZWRpdERpc3RhbmNlXSAtIFdoZXRoZXIgdGhlIHRlcm0gc2hvdWxkIGhhdmUgZnV6enkgbWF0Y2hpbmcgYXBwbGllZCwgYW5kIGhvdyBmdXp6eSB0aGUgbWF0Y2ggc2hvdWxkIGJlLlxuICogQHByb3BlcnR5IHtib29sZWFufSBbdXNlUGlwZWxpbmVdIC0gV2hldGhlciB0aGUgdGVybSBzaG91bGQgYmUgcGFzc2VkIHRocm91Z2ggdGhlIHNlYXJjaCBwaXBlbGluZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbd2lsZGNhcmQ9bHVuci5RdWVyeS53aWxkY2FyZC5OT05FXSAtIFdoZXRoZXIgdGhlIHRlcm0gc2hvdWxkIGhhdmUgd2lsZGNhcmRzIGFwcGVuZGVkIG9yIHByZXBlbmRlZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcHJlc2VuY2U9bHVuci5RdWVyeS5wcmVzZW5jZS5PUFRJT05BTF0gLSBUaGUgdGVybXMgcHJlc2VuY2UgaW4gYW55IG1hdGNoaW5nIGRvY3VtZW50cy5cbiAqL1xuXG4vKipcbiAqIEFkZHMgYSB7QGxpbmsgbHVuci5RdWVyeX5DbGF1c2V9IHRvIHRoaXMgcXVlcnkuXG4gKlxuICogVW5sZXNzIHRoZSBjbGF1c2UgY29udGFpbnMgdGhlIGZpZWxkcyB0byBiZSBtYXRjaGVkIGFsbCBmaWVsZHMgd2lsbCBiZSBtYXRjaGVkLiBJbiBhZGRpdGlvblxuICogYSBkZWZhdWx0IGJvb3N0IG9mIDEgaXMgYXBwbGllZCB0byB0aGUgY2xhdXNlLlxuICpcbiAqIEBwYXJhbSB7bHVuci5RdWVyeX5DbGF1c2V9IGNsYXVzZSAtIFRoZSBjbGF1c2UgdG8gYWRkIHRvIHRoaXMgcXVlcnkuXG4gKiBAc2VlIGx1bnIuUXVlcnl+Q2xhdXNlXG4gKiBAcmV0dXJucyB7bHVuci5RdWVyeX1cbiAqL1xubHVuci5RdWVyeS5wcm90b3R5cGUuY2xhdXNlID0gZnVuY3Rpb24gKGNsYXVzZSkge1xuICBpZiAoISgnZmllbGRzJyBpbiBjbGF1c2UpKSB7XG4gICAgY2xhdXNlLmZpZWxkcyA9IHRoaXMuYWxsRmllbGRzXG4gIH1cblxuICBpZiAoISgnYm9vc3QnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2UuYm9vc3QgPSAxXG4gIH1cblxuICBpZiAoISgndXNlUGlwZWxpbmUnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2UudXNlUGlwZWxpbmUgPSB0cnVlXG4gIH1cblxuICBpZiAoISgnd2lsZGNhcmQnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2Uud2lsZGNhcmQgPSBsdW5yLlF1ZXJ5LndpbGRjYXJkLk5PTkVcbiAgfVxuXG4gIGlmICgoY2xhdXNlLndpbGRjYXJkICYgbHVuci5RdWVyeS53aWxkY2FyZC5MRUFESU5HKSAmJiAoY2xhdXNlLnRlcm0uY2hhckF0KDApICE9IGx1bnIuUXVlcnkud2lsZGNhcmQpKSB7XG4gICAgY2xhdXNlLnRlcm0gPSBcIipcIiArIGNsYXVzZS50ZXJtXG4gIH1cblxuICBpZiAoKGNsYXVzZS53aWxkY2FyZCAmIGx1bnIuUXVlcnkud2lsZGNhcmQuVFJBSUxJTkcpICYmIChjbGF1c2UudGVybS5zbGljZSgtMSkgIT0gbHVuci5RdWVyeS53aWxkY2FyZCkpIHtcbiAgICBjbGF1c2UudGVybSA9IFwiXCIgKyBjbGF1c2UudGVybSArIFwiKlwiXG4gIH1cblxuICBpZiAoISgncHJlc2VuY2UnIGluIGNsYXVzZSkpIHtcbiAgICBjbGF1c2UucHJlc2VuY2UgPSBsdW5yLlF1ZXJ5LnByZXNlbmNlLk9QVElPTkFMXG4gIH1cblxuICB0aGlzLmNsYXVzZXMucHVzaChjbGF1c2UpXG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBBIG5lZ2F0ZWQgcXVlcnkgaXMgb25lIGluIHdoaWNoIGV2ZXJ5IGNsYXVzZSBoYXMgYSBwcmVzZW5jZSBvZlxuICogcHJvaGliaXRlZC4gVGhlc2UgcXVlcmllcyByZXF1aXJlIHNvbWUgc3BlY2lhbCBwcm9jZXNzaW5nIHRvIHJldHVyblxuICogdGhlIGV4cGVjdGVkIHJlc3VsdHMuXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5sdW5yLlF1ZXJ5LnByb3RvdHlwZS5pc05lZ2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jbGF1c2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRoaXMuY2xhdXNlc1tpXS5wcmVzZW5jZSAhPSBsdW5yLlF1ZXJ5LnByZXNlbmNlLlBST0hJQklURUQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbi8qKlxuICogQWRkcyBhIHRlcm0gdG8gdGhlIGN1cnJlbnQgcXVlcnksIHVuZGVyIHRoZSBjb3ZlcnMgdGhpcyB3aWxsIGNyZWF0ZSBhIHtAbGluayBsdW5yLlF1ZXJ5fkNsYXVzZX1cbiAqIHRvIHRoZSBsaXN0IG9mIGNsYXVzZXMgdGhhdCBtYWtlIHVwIHRoaXMgcXVlcnkuXG4gKlxuICogVGhlIHRlcm0gaXMgdXNlZCBhcyBpcywgaS5lLiBubyB0b2tlbml6YXRpb24gd2lsbCBiZSBwZXJmb3JtZWQgYnkgdGhpcyBtZXRob2QuIEluc3RlYWQgY29udmVyc2lvblxuICogdG8gYSB0b2tlbiBvciB0b2tlbi1saWtlIHN0cmluZyBzaG91bGQgYmUgZG9uZSBiZWZvcmUgY2FsbGluZyB0aGlzIG1ldGhvZC5cbiAqXG4gKiBUaGUgdGVybSB3aWxsIGJlIGNvbnZlcnRlZCB0byBhIHN0cmluZyBieSBjYWxsaW5nIGB0b1N0cmluZ2AuIE11bHRpcGxlIHRlcm1zIGNhbiBiZSBwYXNzZWQgYXMgYW5cbiAqIGFycmF5LCBlYWNoIHRlcm0gaW4gdGhlIGFycmF5IHdpbGwgc2hhcmUgdGhlIHNhbWUgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxvYmplY3RbXX0gdGVybSAtIFRoZSB0ZXJtKHMpIHRvIGFkZCB0byB0aGUgcXVlcnkuXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdIC0gQW55IGFkZGl0aW9uYWwgcHJvcGVydGllcyB0byBhZGQgdG8gdGhlIHF1ZXJ5IGNsYXVzZS5cbiAqIEByZXR1cm5zIHtsdW5yLlF1ZXJ5fVxuICogQHNlZSBsdW5yLlF1ZXJ5I2NsYXVzZVxuICogQHNlZSBsdW5yLlF1ZXJ5fkNsYXVzZVxuICogQGV4YW1wbGUgPGNhcHRpb24+YWRkaW5nIGEgc2luZ2xlIHRlcm0gdG8gYSBxdWVyeTwvY2FwdGlvbj5cbiAqIHF1ZXJ5LnRlcm0oXCJmb29cIilcbiAqIEBleGFtcGxlIDxjYXB0aW9uPmFkZGluZyBhIHNpbmdsZSB0ZXJtIHRvIGEgcXVlcnkgYW5kIHNwZWNpZnlpbmcgc2VhcmNoIGZpZWxkcywgdGVybSBib29zdCBhbmQgYXV0b21hdGljIHRyYWlsaW5nIHdpbGRjYXJkPC9jYXB0aW9uPlxuICogcXVlcnkudGVybShcImZvb1wiLCB7XG4gKiAgIGZpZWxkczogW1widGl0bGVcIl0sXG4gKiAgIGJvb3N0OiAxMCxcbiAqICAgd2lsZGNhcmQ6IGx1bnIuUXVlcnkud2lsZGNhcmQuVFJBSUxJTkdcbiAqIH0pXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj51c2luZyBsdW5yLnRva2VuaXplciB0byBjb252ZXJ0IGEgc3RyaW5nIHRvIHRva2VucyBiZWZvcmUgdXNpbmcgdGhlbSBhcyB0ZXJtczwvY2FwdGlvbj5cbiAqIHF1ZXJ5LnRlcm0obHVuci50b2tlbml6ZXIoXCJmb28gYmFyXCIpKVxuICovXG5sdW5yLlF1ZXJ5LnByb3RvdHlwZS50ZXJtID0gZnVuY3Rpb24gKHRlcm0sIG9wdGlvbnMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodGVybSkpIHtcbiAgICB0ZXJtLmZvckVhY2goZnVuY3Rpb24gKHQpIHsgdGhpcy50ZXJtKHQsIGx1bnIudXRpbHMuY2xvbmUob3B0aW9ucykpIH0sIHRoaXMpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHZhciBjbGF1c2UgPSBvcHRpb25zIHx8IHt9XG4gIGNsYXVzZS50ZXJtID0gdGVybS50b1N0cmluZygpXG5cbiAgdGhpcy5jbGF1c2UoY2xhdXNlKVxuXG4gIHJldHVybiB0aGlzXG59XG5sdW5yLlF1ZXJ5UGFyc2VFcnJvciA9IGZ1bmN0aW9uIChtZXNzYWdlLCBzdGFydCwgZW5kKSB7XG4gIHRoaXMubmFtZSA9IFwiUXVlcnlQYXJzZUVycm9yXCJcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICB0aGlzLnN0YXJ0ID0gc3RhcnRcbiAgdGhpcy5lbmQgPSBlbmRcbn1cblxubHVuci5RdWVyeVBhcnNlRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yXG5sdW5yLlF1ZXJ5TGV4ZXIgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIHRoaXMubGV4ZW1lcyA9IFtdXG4gIHRoaXMuc3RyID0gc3RyXG4gIHRoaXMubGVuZ3RoID0gc3RyLmxlbmd0aFxuICB0aGlzLnBvcyA9IDBcbiAgdGhpcy5zdGFydCA9IDBcbiAgdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zID0gW11cbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdGF0ZSA9IGx1bnIuUXVlcnlMZXhlci5sZXhUZXh0XG5cbiAgd2hpbGUgKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSh0aGlzKVxuICB9XG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuc2xpY2VTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzdWJTbGljZXMgPSBbXSxcbiAgICAgIHNsaWNlU3RhcnQgPSB0aGlzLnN0YXJ0LFxuICAgICAgc2xpY2VFbmQgPSB0aGlzLnBvc1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgc2xpY2VFbmQgPSB0aGlzLmVzY2FwZUNoYXJQb3NpdGlvbnNbaV1cbiAgICBzdWJTbGljZXMucHVzaCh0aGlzLnN0ci5zbGljZShzbGljZVN0YXJ0LCBzbGljZUVuZCkpXG4gICAgc2xpY2VTdGFydCA9IHNsaWNlRW5kICsgMVxuICB9XG5cbiAgc3ViU2xpY2VzLnB1c2godGhpcy5zdHIuc2xpY2Uoc2xpY2VTdGFydCwgdGhpcy5wb3MpKVxuICB0aGlzLmVzY2FwZUNoYXJQb3NpdGlvbnMubGVuZ3RoID0gMFxuXG4gIHJldHVybiBzdWJTbGljZXMuam9pbignJylcbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdGhpcy5sZXhlbWVzLnB1c2goe1xuICAgIHR5cGU6IHR5cGUsXG4gICAgc3RyOiB0aGlzLnNsaWNlU3RyaW5nKCksXG4gICAgc3RhcnQ6IHRoaXMuc3RhcnQsXG4gICAgZW5kOiB0aGlzLnBvc1xuICB9KVxuXG4gIHRoaXMuc3RhcnQgPSB0aGlzLnBvc1xufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLmVzY2FwZUNoYXJhY3RlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lc2NhcGVDaGFyUG9zaXRpb25zLnB1c2godGhpcy5wb3MgLSAxKVxuICB0aGlzLnBvcyArPSAxXG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucG9zID49IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5FT1NcbiAgfVxuXG4gIHZhciBjaGFyID0gdGhpcy5zdHIuY2hhckF0KHRoaXMucG9zKVxuICB0aGlzLnBvcyArPSAxXG4gIHJldHVybiBjaGFyXG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUud2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnBvcyAtIHRoaXMuc3RhcnRcbn1cblxubHVuci5RdWVyeUxleGVyLnByb3RvdHlwZS5pZ25vcmUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnN0YXJ0ID09IHRoaXMucG9zKSB7XG4gICAgdGhpcy5wb3MgKz0gMVxuICB9XG5cbiAgdGhpcy5zdGFydCA9IHRoaXMucG9zXG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuYmFja3VwID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBvcyAtPSAxXG59XG5cbmx1bnIuUXVlcnlMZXhlci5wcm90b3R5cGUuYWNjZXB0RGlnaXRSdW4gPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBjaGFyLCBjaGFyQ29kZVxuXG4gIGRvIHtcbiAgICBjaGFyID0gdGhpcy5uZXh0KClcbiAgICBjaGFyQ29kZSA9IGNoYXIuY2hhckNvZGVBdCgwKVxuICB9IHdoaWxlIChjaGFyQ29kZSA+IDQ3ICYmIGNoYXJDb2RlIDwgNTgpXG5cbiAgaWYgKGNoYXIgIT0gbHVuci5RdWVyeUxleGVyLkVPUykge1xuICAgIHRoaXMuYmFja3VwKClcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIucHJvdG90eXBlLm1vcmUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnBvcyA8IHRoaXMubGVuZ3RoXG59XG5cbmx1bnIuUXVlcnlMZXhlci5FT1MgPSAnRU9TJ1xubHVuci5RdWVyeUxleGVyLkZJRUxEID0gJ0ZJRUxEJ1xubHVuci5RdWVyeUxleGVyLlRFUk0gPSAnVEVSTSdcbmx1bnIuUXVlcnlMZXhlci5FRElUX0RJU1RBTkNFID0gJ0VESVRfRElTVEFOQ0UnXG5sdW5yLlF1ZXJ5TGV4ZXIuQk9PU1QgPSAnQk9PU1QnXG5sdW5yLlF1ZXJ5TGV4ZXIuUFJFU0VOQ0UgPSAnUFJFU0VOQ0UnXG5cbmx1bnIuUXVlcnlMZXhlci5sZXhGaWVsZCA9IGZ1bmN0aW9uIChsZXhlcikge1xuICBsZXhlci5iYWNrdXAoKVxuICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5GSUVMRClcbiAgbGV4ZXIuaWdub3JlKClcbiAgcmV0dXJuIGx1bnIuUXVlcnlMZXhlci5sZXhUZXh0XG59XG5cbmx1bnIuUXVlcnlMZXhlci5sZXhUZXJtID0gZnVuY3Rpb24gKGxleGVyKSB7XG4gIGlmIChsZXhlci53aWR0aCgpID4gMSkge1xuICAgIGxleGVyLmJhY2t1cCgpXG4gICAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuVEVSTSlcbiAgfVxuXG4gIGxleGVyLmlnbm9yZSgpXG5cbiAgaWYgKGxleGVyLm1vcmUoKSkge1xuICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dFxuICB9XG59XG5cbmx1bnIuUXVlcnlMZXhlci5sZXhFZGl0RGlzdGFuY2UgPSBmdW5jdGlvbiAobGV4ZXIpIHtcbiAgbGV4ZXIuaWdub3JlKClcbiAgbGV4ZXIuYWNjZXB0RGlnaXRSdW4oKVxuICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5FRElUX0RJU1RBTkNFKVxuICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHRcbn1cblxubHVuci5RdWVyeUxleGVyLmxleEJvb3N0ID0gZnVuY3Rpb24gKGxleGVyKSB7XG4gIGxleGVyLmlnbm9yZSgpXG4gIGxleGVyLmFjY2VwdERpZ2l0UnVuKClcbiAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuQk9PU1QpXG4gIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dFxufVxuXG5sdW5yLlF1ZXJ5TGV4ZXIubGV4RU9TID0gZnVuY3Rpb24gKGxleGVyKSB7XG4gIGlmIChsZXhlci53aWR0aCgpID4gMCkge1xuICAgIGxleGVyLmVtaXQobHVuci5RdWVyeUxleGVyLlRFUk0pXG4gIH1cbn1cblxuLy8gVGhpcyBtYXRjaGVzIHRoZSBzZXBhcmF0b3IgdXNlZCB3aGVuIHRva2VuaXNpbmcgZmllbGRzXG4vLyB3aXRoaW4gYSBkb2N1bWVudC4gVGhlc2Ugc2hvdWxkIG1hdGNoIG90aGVyd2lzZSBpdCBpc1xuLy8gbm90IHBvc3NpYmxlIHRvIHNlYXJjaCBmb3Igc29tZSB0b2tlbnMgd2l0aGluIGEgZG9jdW1lbnQuXG4vL1xuLy8gSXQgaXMgcG9zc2libGUgZm9yIHRoZSB1c2VyIHRvIGNoYW5nZSB0aGUgc2VwYXJhdG9yIG9uIHRoZVxuLy8gdG9rZW5pemVyIHNvIGl0IF9taWdodF8gY2xhc2ggd2l0aCBhbnkgb3RoZXIgb2YgdGhlIHNwZWNpYWxcbi8vIGNoYXJhY3RlcnMgYWxyZWFkeSB1c2VkIHdpdGhpbiB0aGUgc2VhcmNoIHN0cmluZywgZS5nLiA6LlxuLy9cbi8vIFRoaXMgbWVhbnMgdGhhdCBpdCBpcyBwb3NzaWJsZSB0byBjaGFuZ2UgdGhlIHNlcGFyYXRvciBpblxuLy8gc3VjaCBhIHdheSB0aGF0IG1ha2VzIHNvbWUgd29yZHMgdW5zZWFyY2hhYmxlIHVzaW5nIGEgc2VhcmNoXG4vLyBzdHJpbmcuXG5sdW5yLlF1ZXJ5TGV4ZXIudGVybVNlcGFyYXRvciA9IGx1bnIudG9rZW5pemVyLnNlcGFyYXRvclxuXG5sdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dCA9IGZ1bmN0aW9uIChsZXhlcikge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBjaGFyID0gbGV4ZXIubmV4dCgpXG5cbiAgICBpZiAoY2hhciA9PSBsdW5yLlF1ZXJ5TGV4ZXIuRU9TKSB7XG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleEVPU1xuICAgIH1cblxuICAgIC8vIEVzY2FwZSBjaGFyYWN0ZXIgaXMgJ1xcJ1xuICAgIGlmIChjaGFyLmNoYXJDb2RlQXQoMCkgPT0gOTIpIHtcbiAgICAgIGxleGVyLmVzY2FwZUNoYXJhY3RlcigpXG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChjaGFyID09IFwiOlwiKSB7XG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleEZpZWxkXG4gICAgfVxuXG4gICAgaWYgKGNoYXIgPT0gXCJ+XCIpIHtcbiAgICAgIGxleGVyLmJhY2t1cCgpXG4gICAgICBpZiAobGV4ZXIud2lkdGgoKSA+IDApIHtcbiAgICAgICAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuVEVSTSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4RWRpdERpc3RhbmNlXG4gICAgfVxuXG4gICAgaWYgKGNoYXIgPT0gXCJeXCIpIHtcbiAgICAgIGxleGVyLmJhY2t1cCgpXG4gICAgICBpZiAobGV4ZXIud2lkdGgoKSA+IDApIHtcbiAgICAgICAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuVEVSTSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4Qm9vc3RcbiAgICB9XG5cbiAgICAvLyBcIitcIiBpbmRpY2F0ZXMgdGVybSBwcmVzZW5jZSBpcyByZXF1aXJlZFxuICAgIC8vIGNoZWNraW5nIGZvciBsZW5ndGggdG8gZW5zdXJlIHRoYXQgb25seVxuICAgIC8vIGxlYWRpbmcgXCIrXCIgYXJlIGNvbnNpZGVyZWRcbiAgICBpZiAoY2hhciA9PSBcIitcIiAmJiBsZXhlci53aWR0aCgpID09PSAxKSB7XG4gICAgICBsZXhlci5lbWl0KGx1bnIuUXVlcnlMZXhlci5QUkVTRU5DRSlcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGV4dFxuICAgIH1cblxuICAgIC8vIFwiLVwiIGluZGljYXRlcyB0ZXJtIHByZXNlbmNlIGlzIHByb2hpYml0ZWRcbiAgICAvLyBjaGVja2luZyBmb3IgbGVuZ3RoIHRvIGVuc3VyZSB0aGF0IG9ubHlcbiAgICAvLyBsZWFkaW5nIFwiLVwiIGFyZSBjb25zaWRlcmVkXG4gICAgaWYgKGNoYXIgPT0gXCItXCIgJiYgbGV4ZXIud2lkdGgoKSA9PT0gMSkge1xuICAgICAgbGV4ZXIuZW1pdChsdW5yLlF1ZXJ5TGV4ZXIuUFJFU0VOQ0UpXG4gICAgICByZXR1cm4gbHVuci5RdWVyeUxleGVyLmxleFRleHRcbiAgICB9XG5cbiAgICBpZiAoY2hhci5tYXRjaChsdW5yLlF1ZXJ5TGV4ZXIudGVybVNlcGFyYXRvcikpIHtcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5TGV4ZXIubGV4VGVybVxuICAgIH1cbiAgfVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyID0gZnVuY3Rpb24gKHN0ciwgcXVlcnkpIHtcbiAgdGhpcy5sZXhlciA9IG5ldyBsdW5yLlF1ZXJ5TGV4ZXIgKHN0cilcbiAgdGhpcy5xdWVyeSA9IHF1ZXJ5XG4gIHRoaXMuY3VycmVudENsYXVzZSA9IHt9XG4gIHRoaXMubGV4ZW1lSWR4ID0gMFxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sZXhlci5ydW4oKVxuICB0aGlzLmxleGVtZXMgPSB0aGlzLmxleGVyLmxleGVtZXNcblxuICB2YXIgc3RhdGUgPSBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlQ2xhdXNlXG5cbiAgd2hpbGUgKHN0YXRlKSB7XG4gICAgc3RhdGUgPSBzdGF0ZSh0aGlzKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMucXVlcnlcbn1cblxubHVuci5RdWVyeVBhcnNlci5wcm90b3R5cGUucGVla0xleGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMubGV4ZW1lc1t0aGlzLmxleGVtZUlkeF1cbn1cblxubHVuci5RdWVyeVBhcnNlci5wcm90b3R5cGUuY29uc3VtZUxleGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxleGVtZSA9IHRoaXMucGVla0xleGVtZSgpXG4gIHRoaXMubGV4ZW1lSWR4ICs9IDFcbiAgcmV0dXJuIGxleGVtZVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnByb3RvdHlwZS5uZXh0Q2xhdXNlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgY29tcGxldGVkQ2xhdXNlID0gdGhpcy5jdXJyZW50Q2xhdXNlXG4gIHRoaXMucXVlcnkuY2xhdXNlKGNvbXBsZXRlZENsYXVzZSlcbiAgdGhpcy5jdXJyZW50Q2xhdXNlID0ge31cbn1cblxubHVuci5RdWVyeVBhcnNlci5wYXJzZUNsYXVzZSA9IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgdmFyIGxleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKClcblxuICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgc3dpdGNoIChsZXhlbWUudHlwZSkge1xuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlBSRVNFTkNFOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VQcmVzZW5jZVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlRFUk06XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZVRlcm1cbiAgICBkZWZhdWx0OlxuICAgICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiZXhwZWN0ZWQgZWl0aGVyIGEgZmllbGQgb3IgYSB0ZXJtLCBmb3VuZCBcIiArIGxleGVtZS50eXBlXG5cbiAgICAgIGlmIChsZXhlbWUuc3RyLmxlbmd0aCA+PSAxKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSArPSBcIiB3aXRoIHZhbHVlICdcIiArIGxleGVtZS5zdHIgKyBcIidcIlxuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKVxuICB9XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucGFyc2VQcmVzZW5jZSA9IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgdmFyIGxleGVtZSA9IHBhcnNlci5jb25zdW1lTGV4ZW1lKClcblxuICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgc3dpdGNoIChsZXhlbWUuc3RyKSB7XG4gICAgY2FzZSBcIi1cIjpcbiAgICAgIHBhcnNlci5jdXJyZW50Q2xhdXNlLnByZXNlbmNlID0gbHVuci5RdWVyeS5wcmVzZW5jZS5QUk9ISUJJVEVEXG4gICAgICBicmVha1xuICAgIGNhc2UgXCIrXCI6XG4gICAgICBwYXJzZXIuY3VycmVudENsYXVzZS5wcmVzZW5jZSA9IGx1bnIuUXVlcnkucHJlc2VuY2UuUkVRVUlSRURcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcInVucmVjb2duaXNlZCBwcmVzZW5jZSBvcGVyYXRvcidcIiArIGxleGVtZS5zdHIgKyBcIidcIlxuICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIGxleGVtZS5zdGFydCwgbGV4ZW1lLmVuZClcbiAgfVxuXG4gIHZhciBuZXh0TGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKVxuXG4gIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcImV4cGVjdGluZyB0ZXJtIG9yIGZpZWxkLCBmb3VuZCBub3RoaW5nXCJcbiAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKVxuICB9XG5cbiAgc3dpdGNoIChuZXh0TGV4ZW1lLnR5cGUpIHtcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5GSUVMRDpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRmllbGRcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5URVJNOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcImV4cGVjdGluZyB0ZXJtIG9yIGZpZWxkLCBmb3VuZCAnXCIgKyBuZXh0TGV4ZW1lLnR5cGUgKyBcIidcIlxuICAgICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIG5leHRMZXhlbWUuc3RhcnQsIG5leHRMZXhlbWUuZW5kKVxuICB9XG59XG5cbmx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZCA9IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgdmFyIGxleGVtZSA9IHBhcnNlci5jb25zdW1lTGV4ZW1lKClcblxuICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKHBhcnNlci5xdWVyeS5hbGxGaWVsZHMuaW5kZXhPZihsZXhlbWUuc3RyKSA9PSAtMSkge1xuICAgIHZhciBwb3NzaWJsZUZpZWxkcyA9IHBhcnNlci5xdWVyeS5hbGxGaWVsZHMubWFwKGZ1bmN0aW9uIChmKSB7IHJldHVybiBcIidcIiArIGYgKyBcIidcIiB9KS5qb2luKCcsICcpLFxuICAgICAgICBlcnJvck1lc3NhZ2UgPSBcInVucmVjb2duaXNlZCBmaWVsZCAnXCIgKyBsZXhlbWUuc3RyICsgXCInLCBwb3NzaWJsZSBmaWVsZHM6IFwiICsgcG9zc2libGVGaWVsZHNcblxuICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBsZXhlbWUuc3RhcnQsIGxleGVtZS5lbmQpXG4gIH1cblxuICBwYXJzZXIuY3VycmVudENsYXVzZS5maWVsZHMgPSBbbGV4ZW1lLnN0cl1cblxuICB2YXIgbmV4dExleGVtZSA9IHBhcnNlci5wZWVrTGV4ZW1lKClcblxuICBpZiAobmV4dExleGVtZSA9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJleHBlY3RpbmcgdGVybSwgZm91bmQgbm90aGluZ1wiXG4gICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIGxleGVtZS5zdGFydCwgbGV4ZW1lLmVuZClcbiAgfVxuXG4gIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybVxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJleHBlY3RpbmcgdGVybSwgZm91bmQgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCJcbiAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBuZXh0TGV4ZW1lLnN0YXJ0LCBuZXh0TGV4ZW1lLmVuZClcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybSA9IGZ1bmN0aW9uIChwYXJzZXIpIHtcbiAgdmFyIGxleGVtZSA9IHBhcnNlci5jb25zdW1lTGV4ZW1lKClcblxuICBpZiAobGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgcGFyc2VyLmN1cnJlbnRDbGF1c2UudGVybSA9IGxleGVtZS5zdHIudG9Mb3dlckNhc2UoKVxuXG4gIGlmIChsZXhlbWUuc3RyLmluZGV4T2YoXCIqXCIpICE9IC0xKSB7XG4gICAgcGFyc2VyLmN1cnJlbnRDbGF1c2UudXNlUGlwZWxpbmUgPSBmYWxzZVxuICB9XG5cbiAgdmFyIG5leHRMZXhlbWUgPSBwYXJzZXIucGVla0xleGVtZSgpXG5cbiAgaWYgKG5leHRMZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgIHJldHVyblxuICB9XG5cbiAgc3dpdGNoIChuZXh0TGV4ZW1lLnR5cGUpIHtcbiAgICBjYXNlIGx1bnIuUXVlcnlMZXhlci5URVJNOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VUZXJtXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRklFTEQ6XG4gICAgICBwYXJzZXIubmV4dENsYXVzZSgpXG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUZpZWxkXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuRURJVF9ESVNUQU5DRTpcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRWRpdERpc3RhbmNlXG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuQk9PU1Q6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUJvb3N0XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuUFJFU0VOQ0U6XG4gICAgICBwYXJzZXIubmV4dENsYXVzZSgpXG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZVByZXNlbmNlXG4gICAgZGVmYXVsdDpcbiAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBcIlVuZXhwZWN0ZWQgbGV4ZW1lIHR5cGUgJ1wiICsgbmV4dExleGVtZS50eXBlICsgXCInXCJcbiAgICAgIHRocm93IG5ldyBsdW5yLlF1ZXJ5UGFyc2VFcnJvciAoZXJyb3JNZXNzYWdlLCBuZXh0TGV4ZW1lLnN0YXJ0LCBuZXh0TGV4ZW1lLmVuZClcbiAgfVxufVxuXG5sdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlRWRpdERpc3RhbmNlID0gZnVuY3Rpb24gKHBhcnNlcikge1xuICB2YXIgbGV4ZW1lID0gcGFyc2VyLmNvbnN1bWVMZXhlbWUoKVxuXG4gIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgZWRpdERpc3RhbmNlID0gcGFyc2VJbnQobGV4ZW1lLnN0ciwgMTApXG5cbiAgaWYgKGlzTmFOKGVkaXREaXN0YW5jZSkpIHtcbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJlZGl0IGRpc3RhbmNlIG11c3QgYmUgbnVtZXJpY1wiXG4gICAgdGhyb3cgbmV3IGx1bnIuUXVlcnlQYXJzZUVycm9yIChlcnJvck1lc3NhZ2UsIGxleGVtZS5zdGFydCwgbGV4ZW1lLmVuZClcbiAgfVxuXG4gIHBhcnNlci5jdXJyZW50Q2xhdXNlLmVkaXREaXN0YW5jZSA9IGVkaXREaXN0YW5jZVxuXG4gIHZhciBuZXh0TGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKVxuXG4gIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkVESVRfRElTVEFOQ0U6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUVkaXREaXN0YW5jZVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkJPT1NUOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VCb29zdFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlBSRVNFTkNFOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VQcmVzZW5jZVxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJVbmV4cGVjdGVkIGxleGVtZSB0eXBlICdcIiArIG5leHRMZXhlbWUudHlwZSArIFwiJ1wiXG4gICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbmV4dExleGVtZS5zdGFydCwgbmV4dExleGVtZS5lbmQpXG4gIH1cbn1cblxubHVuci5RdWVyeVBhcnNlci5wYXJzZUJvb3N0ID0gZnVuY3Rpb24gKHBhcnNlcikge1xuICB2YXIgbGV4ZW1lID0gcGFyc2VyLmNvbnN1bWVMZXhlbWUoKVxuXG4gIGlmIChsZXhlbWUgPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgYm9vc3QgPSBwYXJzZUludChsZXhlbWUuc3RyLCAxMClcblxuICBpZiAoaXNOYU4oYm9vc3QpKSB7XG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IFwiYm9vc3QgbXVzdCBiZSBudW1lcmljXCJcbiAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbGV4ZW1lLnN0YXJ0LCBsZXhlbWUuZW5kKVxuICB9XG5cbiAgcGFyc2VyLmN1cnJlbnRDbGF1c2UuYm9vc3QgPSBib29zdFxuXG4gIHZhciBuZXh0TGV4ZW1lID0gcGFyc2VyLnBlZWtMZXhlbWUoKVxuXG4gIGlmIChuZXh0TGV4ZW1lID09IHVuZGVmaW5lZCkge1xuICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICByZXR1cm5cbiAgfVxuXG4gIHN3aXRjaCAobmV4dExleGVtZS50eXBlKSB7XG4gICAgY2FzZSBsdW5yLlF1ZXJ5TGV4ZXIuVEVSTTpcbiAgICAgIHBhcnNlci5uZXh0Q2xhdXNlKClcbiAgICAgIHJldHVybiBsdW5yLlF1ZXJ5UGFyc2VyLnBhcnNlVGVybVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkZJRUxEOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VGaWVsZFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkVESVRfRElTVEFOQ0U6XG4gICAgICByZXR1cm4gbHVuci5RdWVyeVBhcnNlci5wYXJzZUVkaXREaXN0YW5jZVxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLkJPT1NUOlxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VCb29zdFxuICAgIGNhc2UgbHVuci5RdWVyeUxleGVyLlBSRVNFTkNFOlxuICAgICAgcGFyc2VyLm5leHRDbGF1c2UoKVxuICAgICAgcmV0dXJuIGx1bnIuUXVlcnlQYXJzZXIucGFyc2VQcmVzZW5jZVxuICAgIGRlZmF1bHQ6XG4gICAgICB2YXIgZXJyb3JNZXNzYWdlID0gXCJVbmV4cGVjdGVkIGxleGVtZSB0eXBlICdcIiArIG5leHRMZXhlbWUudHlwZSArIFwiJ1wiXG4gICAgICB0aHJvdyBuZXcgbHVuci5RdWVyeVBhcnNlRXJyb3IgKGVycm9yTWVzc2FnZSwgbmV4dExleGVtZS5zdGFydCwgbmV4dExleGVtZS5lbmQpXG4gIH1cbn1cblxuICAvKipcbiAgICogZXhwb3J0IHRoZSBtb2R1bGUgdmlhIEFNRCwgQ29tbW9uSlMgb3IgYXMgYSBicm93c2VyIGdsb2JhbFxuICAgKiBFeHBvcnQgY29kZSBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuICAgKi9cbiAgOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgIGRlZmluZShmYWN0b3J5KVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAvKipcbiAgICAgICAqIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICogb25seSBDb21tb25KUy1saWtlIGVudmlyb21lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAqIGxpa2UgTm9kZS5cbiAgICAgICAqL1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KClcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgIHJvb3QubHVuciA9IGZhY3RvcnkoKVxuICAgIH1cbiAgfSh0aGlzLCBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogSnVzdCByZXR1cm4gYSB2YWx1ZSB0byBkZWZpbmUgdGhlIG1vZHVsZSBleHBvcnQuXG4gICAgICogVGhpcyBleGFtcGxlIHJldHVybnMgYW4gb2JqZWN0LCBidXQgdGhlIG1vZHVsZVxuICAgICAqIGNhbiByZXR1cm4gYSBmdW5jdGlvbiBhcyB0aGUgZXhwb3J0ZWQgdmFsdWUuXG4gICAgICovXG4gICAgcmV0dXJuIGx1bnJcbiAgfSkpXG59KSgpO1xuIiwgImNvbnN0IGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1tsYW5nXScpIDogZnVuY3Rpb24gKCkge307XG5cbmNvbnN0IHRvZ2dsZUNvZGVibG9ja1Zpc2liaWxpdHkgPSBmdW5jdGlvbiAobGFuZywgdmlzaWJsZSkge1xuXHRkZWJ1ZygndG9nZ2xlQ29kZWJsb2NrVmlzaWJpbGl0eScsIGxhbmcsIHZpc2libGUpO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuaGlnaGxpZ2h0IGNvZGUubGFuZ3VhZ2UtJHtsYW5nfWApLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0bGV0IGhpZ2hsaWdodCA9IGVsLmNsb3Nlc3QoJy5oaWdobGlnaHQnKTtcblx0XHRoaWdobGlnaHQuc3R5bGUuZGlzcGxheSA9IHZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnO1xuXHR9KTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdMYW5nQ29udHJvbGxlcigpIHtcblx0cmV0dXJuIHtcblx0XHR0YWJzOiBbXSxcblx0XHRjaGFuZ2VMYW5ndWFnZTogZnVuY3Rpb24gKGluZGV4KSB7XG5cdFx0XHRkZWJ1ZygnY2hhbmdlTGFuZ3VhZ2UnLCBpbmRleCk7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRsZXQgaXNBY3RpdmUgPSBpID09PSBpbmRleDtcblx0XHRcdFx0dGhpcy50YWJzW2ldLmFjdGl2ZSA9IGlzQWN0aXZlO1xuXG5cdFx0XHRcdHRvZ2dsZUNvZGVibG9ja1Zpc2liaWxpdHkodGhpcy50YWJzW2ldLmtleSwgaXNBY3RpdmUpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0aW5pdExhbmdzOiBmdW5jdGlvbiAodGFicykge1xuXHRcdFx0ZGVidWcoJ2luaXRMYW5ncycsIHRhYnMpO1xuXHRcdFx0dGFic1swXS5hY3RpdmUgPSB0cnVlO1xuXHRcdFx0dGhpcy50YWJzID0gdGFicztcblxuXHRcdFx0cmV0dXJuIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcblx0XHRcdFx0dGhpcy5jaGFuZ2VMYW5ndWFnZSgwKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiaW1wb3J0ICogYXMgbHVuciBmcm9tICdqcy9saWIvbHVuci5qcyc7XG5pbXBvcnQgeyBIaWdobGlnaHQgfSBmcm9tICdqcy9oZWxwZXJzJztcblxuZnVuY3Rpb24gbmV4dFVudGlsKGVsZW0sIHNlbGVjdG9yKSB7XG5cdHZhciBzaWJsaW5ncyA9IFtdO1xuXG5cdGVsZW0gPSBlbGVtLm5leHRFbGVtZW50U2libGluZztcblxuXHR3aGlsZSAoZWxlbSkge1xuXHRcdGlmIChlbGVtLm1hdGNoZXMoc2VsZWN0b3IpKSBicmVhaztcblx0XHRzaWJsaW5ncy5wdXNoKGVsZW0pO1xuXHRcdGVsZW0gPSBlbGVtLm5leHRFbGVtZW50U2libGluZztcblx0fVxuXG5cdHJldHVybiBzaWJsaW5ncztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ld1NlYXJjaENvbnRyb2xsZXIoKSB7XG5cdHZhciBpbmRleDtcblxuXHR2YXIgYnVpbGRJbmRleCA9IGZ1bmN0aW9uIChjb25maWcpIHtcblx0XHR2YXIgYnVpbGRlciA9IG5ldyBsdW5yLkJ1aWxkZXIoKTtcblxuXHRcdGJ1aWxkZXIucGlwZWxpbmUuYWRkKGx1bnIudHJpbW1lciwgbHVuci5zdG9wV29yZEZpbHRlciwgbHVuci5zdGVtbWVyKTtcblxuXHRcdGJ1aWxkZXIuc2VhcmNoUGlwZWxpbmUuYWRkKGx1bnIuc3RlbW1lcik7XG5cblx0XHRjb25maWcuY2FsbChidWlsZGVyLCBidWlsZGVyKTtcblx0XHRyZXR1cm4gYnVpbGRlci5idWlsZCgpO1xuXHR9O1xuXG5cdGZ1bmN0aW9uIHBvcHVsYXRlSW5kZXgoKSB7XG5cdFx0aW5kZXggPSBidWlsZEluZGV4KGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMucmVmKCdpZCcpO1xuXHRcdFx0dGhpcy5maWVsZCgndGl0bGUnLCB7IGJvb3N0OiAxMCB9KTtcblx0XHRcdHRoaXMuZmllbGQoJ2JvZHknKTtcblx0XHRcdHRoaXMucGlwZWxpbmUuYWRkKGx1bnIudHJpbW1lciwgbHVuci5zdG9wV29yZEZpbHRlcik7XG5cblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2gxLCBoMicpLmZvckVhY2goKGhlYWRlckVsKSA9PiB7XG5cdFx0XHRcdGxldCBib2R5ID0gJyc7XG5cdFx0XHRcdG5leHRVbnRpbChoZWFkZXJFbCwgJ2gxLCBoMicpLmZvckVhY2goKGVsKSA9PiB7XG5cdFx0XHRcdFx0Ym9keSA9IGJvZHkuY29uY2F0KCcgJywgZWwudGV4dENvbnRlbnQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5hZGQoe1xuXHRcdFx0XHRcdGlkOiBoZWFkZXJFbC5pZCxcblx0XHRcdFx0XHR0aXRsZTogaGVhZGVyRWwudGV4dENvbnRlbnQsXG5cdFx0XHRcdFx0Ym9keTogYm9keSxcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGxldCBoaWdobGlnaHQgPSBuZXcgSGlnaGxpZ2h0KCk7XG5cblx0cmV0dXJuIHtcblx0XHRxdWVyeTogJycsXG5cdFx0cmVzdWx0czogW10sXG5cdFx0aW5pdDogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuJG5leHRUaWNrKCgpID0+IHtcblx0XHRcdFx0cG9wdWxhdGVJbmRleCgpO1xuXHRcdFx0XHR0aGlzLiR3YXRjaCgncXVlcnknLCAoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5zZWFyY2goKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdHNlYXJjaDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aGlnaGxpZ2h0LnJlbW92ZSgpO1xuXHRcdFx0bGV0IHJlc3VsdHMgPSBpbmRleC5zZWFyY2godGhpcy5xdWVyeSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnNjb3JlID4gMC4wMDAxKTtcblxuXHRcdFx0dGhpcy5yZXN1bHRzID0gcmVzdWx0cy5tYXAoKGl0ZW0pID0+IHtcblx0XHRcdFx0dmFyIGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtLnJlZik7XG5cblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0aXRsZTogZWxlbS5pbm5lclRleHQsXG5cdFx0XHRcdFx0aWQ6IGl0ZW0ucmVmLFxuXHRcdFx0XHR9O1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICh0aGlzLnJlc3VsdHMubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRoaWdobGlnaHQuYXBwbHkobmV3IFJlZ0V4cCh0aGlzLnF1ZXJ5LCAnaScpKTtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xufVxuIiwgImV4cG9ydCBjbGFzcyBIaWdobGlnaHQge1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRvcHRzID0ge1xuXHRcdFx0Y29udGVudFNlbGVjdG9yOiAnLmNvbnRlbnQnLFxuXHRcdFx0bWFya0NsYXNzOiAnZGEtaGlnaGxpZ2h0LW1hcmsnLFxuXHRcdH1cblx0KSB7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblx0XHR0aGlzLm5vZGVTdGFjayA9IFtdO1xuXHR9XG5cblx0YXBwbHkocmUpIHtcblx0XHRjb25zdCB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcblx0XHRcdHRoaXMuY29udGVudCgpLFxuXHRcdFx0Tm9kZUZpbHRlci5TSE9XX1RFWFQsXG5cdFx0XHR7XG5cdFx0XHRcdGFjY2VwdE5vZGU6IChub2RlKSA9PiB7XG5cdFx0XHRcdFx0aWYgKG5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnModGhpcy5vcHRzLm1hcmtDbGFzcykpIHtcblx0XHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICgvXFxTLy50ZXN0KG5vZGUuZGF0YSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9BQ0NFUFQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBOb2RlRmlsdGVyLkZJTFRFUl9SRUpFQ1Q7XG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0ZmFsc2Vcblx0XHQpO1xuXG5cdFx0Ly8gRmlycyBwYXNzOiBDb2xsZWN0IGFsbCB0aGUgdGV4dCBub2RlcyBtYXRjaGluZyB0aGUgcHJvdmlkZWQgcmVnZXhwLlxuXHRcdC8vIFRPRE8oYmVwKSBpbXByb3ZlIHRleHQgbWF0Y2hpbmcuXG5cdFx0bGV0IG1hdGNoZXMgPSBbXTtcblx0XHR3aGlsZSAodHJlZVdhbGtlci5uZXh0Tm9kZSgpKSB7XG5cdFx0XHRsZXQgbm9kZSA9IHRyZWVXYWxrZXIuY3VycmVudE5vZGU7XG5cdFx0XHRpZiAobm9kZS5kYXRhLm1hdGNoKHJlKSkge1xuXHRcdFx0XHRtYXRjaGVzLnB1c2gobm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2Vjb25kIHBhc3M6IFJlcGxhY2UgdGhlIG1hdGNoZXMgd2l0aCBub2RlcyB3cmFwcGVkIGluIDxtYXJrPiB0YWdzLlxuXHRcdG1hdGNoZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuXHRcdFx0Ly8gQ2xvbmUgdGhlIHBhcmVudCBzbyB3ZSBjYW4gcmVzdG9yZSBpdC5cblx0XHRcdGxldCBwYXJlbnRDbG9uZSA9IG5vZGUucGFyZW50Tm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG5cblx0XHRcdHBhcmVudENsb25lLmNoaWxkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuXHRcdFx0XHRpZiAobm9kZS5ub2RlVHlwZSAhPT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgbWF0Y2ggPSBub2RlLmRhdGEubWF0Y2gocmUpO1xuXHRcdFx0XHRpZiAoIW1hdGNoKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHBvcyA9IG5vZGUuZGF0YS5pbmRleE9mKG1hdGNoWzBdLCBtYXRjaC5pbmRleCk7XG5cdFx0XHRcdGlmIChwb3MgPT09IC0xKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IG1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYXJrJyk7XG5cdFx0XHRcdG1hcmsuY2xhc3NMaXN0LmFkZCh0aGlzLm9wdHMubWFya0NsYXNzKTtcblxuXHRcdFx0XHRsZXQgd29yZE5vZGUgPSBub2RlLnNwbGl0VGV4dChwb3MpO1xuXHRcdFx0XHR3b3JkTm9kZS5zcGxpdFRleHQobWF0Y2hbMF0ubGVuZ3RoKTtcblx0XHRcdFx0bGV0IHdvcmRDbG9uZSA9IHdvcmROb2RlLmNsb25lTm9kZSh0cnVlKTtcblxuXHRcdFx0XHRtYXJrLmFwcGVuZENoaWxkKHdvcmRDbG9uZSk7XG5cdFx0XHRcdHBhcmVudENsb25lLnJlcGxhY2VDaGlsZChtYXJrLCB3b3JkTm9kZSk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKG5vZGUucGFyZW50Tm9kZSAmJiBub2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZSkge1xuXHRcdFx0XHR0aGlzLm5vZGVTdGFjay5wdXNoKHtcblx0XHRcdFx0XHRvbGQ6IG5vZGUucGFyZW50Tm9kZSxcblx0XHRcdFx0XHRuZXc6IHBhcmVudENsb25lLFxuXHRcdFx0XHR9KTtcblx0XHRcdFx0bm9kZS5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHBhcmVudENsb25lLCBub2RlLnBhcmVudE5vZGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmVtb3ZlKCkge1xuXHRcdHdoaWxlICh0aGlzLm5vZGVTdGFjay5sZW5ndGgpIHtcblx0XHRcdGxldCBwYWlyID0gdGhpcy5ub2RlU3RhY2sucG9wKCk7XG5cdFx0XHRwYWlyLm5ldy5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChwYWlyLm9sZCwgcGFpci5uZXcpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnRlbnQoKSB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRzLmNvbnRlbnRTZWxlY3Rvcik7XG5cdH1cbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGRlYnVnID0gMCA/IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSwgJ1t0b2NdJykgOiBmdW5jdGlvbiAoKSB7fTtcblxuY29uc3QgaGVhZGVyRWxzID0gKCkgPT4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRlbnQgaDEsIC5jb250ZW50IGgyLCAuY29udGVudCBoMycpO1xuXG5jb25zdCBzZXRQcm9ncmVzcyA9IGZ1bmN0aW9uIChzZWxmLCBlbCkge1xuXHRsZXQgbWFpbkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKTtcblx0bGV0IG1haW5IZWlnaHQgPSBtYWluRWwub2Zmc2V0SGVpZ2h0O1xuXHRsZXQgbWFpblN0YXJ0ID0gbWFpbkVsLm9mZnNldFRvcDtcblx0bGV0IHByb2dyZXNzID0gTWF0aC5yb3VuZCgoKGVsLm9mZnNldFRvcCAtIG1haW5TdGFydCkgLyBtYWluSGVpZ2h0KSAqIDEwMCk7XG5cdHNlbGYuYWN0aXZlSGVhZGluZy50aXRsZSA9IGVsLmlubmVyVGV4dDtcblx0c2VsZi5hY3RpdmVIZWFkaW5nLnByb2dyZXNzID0gcHJvZ3Jlc3M7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbmV3VG9DQ29udHJvbGxlcigpIHtcblx0Y29uc3Qgc2V0T3BlblJlY3Vyc2l2ZSA9IGZ1bmN0aW9uIChyb3csIHNob3VsZE9wZW4pIHtcblx0XHRpZiAoIXJvdy5zdWIpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0bGV0IGlzT3BlbiA9IGZhbHNlO1xuXG5cdFx0cm93LnN1Yi5mb3JFYWNoKChyb3dzdWIpID0+IHtcblx0XHRcdHJvd3N1Yi5vcGVuID0gc2hvdWxkT3Blbihyb3dzdWIpO1xuXHRcdFx0cm93c3ViLmFjdGl2ZSA9IHJvd3N1Yi5vcGVuO1xuXG5cdFx0XHRyb3dzdWIub3BlbiA9IHJvd3N1Yi5vcGVuIHx8IHNldE9wZW5SZWN1cnNpdmUocm93c3ViLCBzaG91bGRPcGVuKTtcblxuXHRcdFx0aWYgKHJvd3N1Yi5vcGVuKSB7XG5cdFx0XHRcdGlzT3BlbiA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyb3cuYWN0aXZlX3BhcmVudCA9IGlzT3Blbjtcblx0XHRpc09wZW4gPSBpc09wZW4gfHwgc2hvdWxkT3Blbihyb3cpO1xuXHRcdHJvdy5vcGVuID0gaXNPcGVuO1xuXHRcdHJvdy5hY3RpdmUgPSBzaG91bGRPcGVuKHJvdyk7XG5cblx0XHRyZXR1cm4gaXNPcGVuO1xuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0YWN0aXZlSGVhZGluZzoge1xuXHRcdFx0dGl0bGU6ICcnLFxuXHRcdFx0cHJvZ3Jlc3M6IDAsXG5cdFx0fSxcblx0XHRzaG93SGVhZGluZzogdHJ1ZSxcblx0XHRyb3dzOiBbXSxcblx0XHRsb2FkOiBmdW5jdGlvbiAocm93cykge1xuXHRcdFx0dGhpcy5yb3dzID0gcm93cztcblx0XHR9LFxuXG5cdFx0dHJhbnNpdGlvbnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdCd4LXRyYW5zaXRpb246ZW50ZXIuZHVyYXRpb24uNTAwbXMnOiAnJyxcblx0XHRcdFx0J3gtdHJhbnNpdGlvbjpsZWF2ZS5kdXJhdGlvbi40MDBtcyc6ICcnLFxuXHRcdFx0XHQneC10cmFuc2l0aW9uLnNjYWxlLm9yaWdpbi50b3AubGVmdC44MCc6ICcnLFxuXHRcdFx0fTtcblx0XHR9LFxuXG5cdFx0cm93Q2xhc3M6IGZ1bmN0aW9uIChyb3cpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFsneC1iaW5kOmNsYXNzJ10oKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGB0b2MtaCR7cm93LmxldmVsfSR7cm93LmFjdGl2ZSA/ICcgYWN0aXZlJyA6ICcnfSR7cm93LmFjdGl2ZV9wYXJlbnQgPyAnIGFjdGl2ZS1wYXJlbnQnIDogJyd9YDtcblx0XHRcdFx0fSxcblx0XHRcdH07XG5cdFx0fSxcblxuXHRcdGNsaWNrOiBmdW5jdGlvbiAocm93KSB7XG5cdFx0XHR0aGlzLnJvd3MuZm9yRWFjaCgocm93MikgPT4ge1xuXHRcdFx0XHRzZXRPcGVuUmVjdXJzaXZlKHJvdzIsIChyb3czKSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJvdyA9PT0gcm93Mztcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0b25TY3JvbGw6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGRlYnVnKCdvblNjcm9sbCcpO1xuXHRcdFx0bGV0IHNjcm9sbHBvcyA9IHdpbmRvdy5zY3JvbGxZO1xuXG5cdFx0XHRoZWFkZXJFbHMoKS5mb3JFYWNoKChlbCkgPT4ge1xuXHRcdFx0XHRsZXQgb2Zmc2V0ID0gZWwub2Zmc2V0VG9wO1xuXG5cdFx0XHRcdGlmIChvZmZzZXQgPCBzY3JvbGxwb3MgKyAxMCkge1xuXHRcdFx0XHRcdGRlYnVnKCdTZXQgZm9yJywgZWwuaWQpO1xuXG5cdFx0XHRcdFx0dGhpcy5yb3dzLmZvckVhY2goKHJvdykgPT4ge1xuXHRcdFx0XHRcdFx0c2V0T3BlblJlY3Vyc2l2ZShyb3csIChyb3cpID0+IHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHJvdy5pZCA9PT0gZWwuaWQ7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdHNldFByb2dyZXNzKHRoaXMsIGVsKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgKyBzY3JvbGxwb3MgPj0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQpIHtcblx0XHRcdFx0XHR0aGlzLmFjdGl2ZUhlYWRpbmcucHJvZ3Jlc3MgPSAxMDA7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0sXG5cdH07XG59XG4iLCAiLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3NjaGVkdWxlci5qc1xudmFyIGZsdXNoUGVuZGluZyA9IGZhbHNlO1xudmFyIGZsdXNoaW5nID0gZmFsc2U7XG52YXIgcXVldWUgPSBbXTtcbmZ1bmN0aW9uIHNjaGVkdWxlcihjYWxsYmFjaykge1xuICBxdWV1ZUpvYihjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBxdWV1ZUpvYihqb2IpIHtcbiAgaWYgKCFxdWV1ZS5pbmNsdWRlcyhqb2IpKVxuICAgIHF1ZXVlLnB1c2goam9iKTtcbiAgcXVldWVGbHVzaCgpO1xufVxuZnVuY3Rpb24gZGVxdWV1ZUpvYihqb2IpIHtcbiAgbGV0IGluZGV4ID0gcXVldWUuaW5kZXhPZihqb2IpO1xuICBpZiAoaW5kZXggIT09IC0xKVxuICAgIHF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG59XG5mdW5jdGlvbiBxdWV1ZUZsdXNoKCkge1xuICBpZiAoIWZsdXNoaW5nICYmICFmbHVzaFBlbmRpbmcpIHtcbiAgICBmbHVzaFBlbmRpbmcgPSB0cnVlO1xuICAgIHF1ZXVlTWljcm90YXNrKGZsdXNoSm9icyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGZsdXNoSm9icygpIHtcbiAgZmx1c2hQZW5kaW5nID0gZmFsc2U7XG4gIGZsdXNoaW5nID0gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgIHF1ZXVlW2ldKCk7XG4gIH1cbiAgcXVldWUubGVuZ3RoID0gMDtcbiAgZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3JlYWN0aXZpdHkuanNcbnZhciByZWFjdGl2ZTtcbnZhciBlZmZlY3Q7XG52YXIgcmVsZWFzZTtcbnZhciByYXc7XG52YXIgc2hvdWxkU2NoZWR1bGUgPSB0cnVlO1xuZnVuY3Rpb24gZGlzYWJsZUVmZmVjdFNjaGVkdWxpbmcoY2FsbGJhY2spIHtcbiAgc2hvdWxkU2NoZWR1bGUgPSBmYWxzZTtcbiAgY2FsbGJhY2soKTtcbiAgc2hvdWxkU2NoZWR1bGUgPSB0cnVlO1xufVxuZnVuY3Rpb24gc2V0UmVhY3Rpdml0eUVuZ2luZShlbmdpbmUpIHtcbiAgcmVhY3RpdmUgPSBlbmdpbmUucmVhY3RpdmU7XG4gIHJlbGVhc2UgPSBlbmdpbmUucmVsZWFzZTtcbiAgZWZmZWN0ID0gKGNhbGxiYWNrKSA9PiBlbmdpbmUuZWZmZWN0KGNhbGxiYWNrLCB7c2NoZWR1bGVyOiAodGFzaykgPT4ge1xuICAgIGlmIChzaG91bGRTY2hlZHVsZSkge1xuICAgICAgc2NoZWR1bGVyKHRhc2spO1xuICAgIH0gZWxzZSB7XG4gICAgICB0YXNrKCk7XG4gICAgfVxuICB9fSk7XG4gIHJhdyA9IGVuZ2luZS5yYXc7XG59XG5mdW5jdGlvbiBvdmVycmlkZUVmZmVjdChvdmVycmlkZSkge1xuICBlZmZlY3QgPSBvdmVycmlkZTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRCb3VuZEVmZmVjdChlbCkge1xuICBsZXQgY2xlYW51cDIgPSAoKSA9PiB7XG4gIH07XG4gIGxldCB3cmFwcGVkRWZmZWN0ID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgbGV0IGVmZmVjdFJlZmVyZW5jZSA9IGVmZmVjdChjYWxsYmFjayk7XG4gICAgaWYgKCFlbC5feF9lZmZlY3RzKSB7XG4gICAgICBlbC5feF9lZmZlY3RzID0gbmV3IFNldCgpO1xuICAgICAgZWwuX3hfcnVuRWZmZWN0cyA9ICgpID0+IHtcbiAgICAgICAgZWwuX3hfZWZmZWN0cy5mb3JFYWNoKChpKSA9PiBpKCkpO1xuICAgICAgfTtcbiAgICB9XG4gICAgZWwuX3hfZWZmZWN0cy5hZGQoZWZmZWN0UmVmZXJlbmNlKTtcbiAgICBjbGVhbnVwMiA9ICgpID0+IHtcbiAgICAgIGlmIChlZmZlY3RSZWZlcmVuY2UgPT09IHZvaWQgMClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgZWwuX3hfZWZmZWN0cy5kZWxldGUoZWZmZWN0UmVmZXJlbmNlKTtcbiAgICAgIHJlbGVhc2UoZWZmZWN0UmVmZXJlbmNlKTtcbiAgICB9O1xuICAgIHJldHVybiBlZmZlY3RSZWZlcmVuY2U7XG4gIH07XG4gIHJldHVybiBbd3JhcHBlZEVmZmVjdCwgKCkgPT4ge1xuICAgIGNsZWFudXAyKCk7XG4gIH1dO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbXV0YXRpb24uanNcbnZhciBvbkF0dHJpYnV0ZUFkZGVkcyA9IFtdO1xudmFyIG9uRWxSZW1vdmVkcyA9IFtdO1xudmFyIG9uRWxBZGRlZHMgPSBbXTtcbmZ1bmN0aW9uIG9uRWxBZGRlZChjYWxsYmFjaykge1xuICBvbkVsQWRkZWRzLnB1c2goY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gb25FbFJlbW92ZWQoZWwsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGlmICghZWwuX3hfY2xlYW51cHMpXG4gICAgICBlbC5feF9jbGVhbnVwcyA9IFtdO1xuICAgIGVsLl94X2NsZWFudXBzLnB1c2goY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrID0gZWw7XG4gICAgb25FbFJlbW92ZWRzLnB1c2goY2FsbGJhY2spO1xuICB9XG59XG5mdW5jdGlvbiBvbkF0dHJpYnV0ZXNBZGRlZChjYWxsYmFjaykge1xuICBvbkF0dHJpYnV0ZUFkZGVkcy5wdXNoKGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIG9uQXR0cmlidXRlUmVtb3ZlZChlbCwgbmFtZSwgY2FsbGJhY2spIHtcbiAgaWYgKCFlbC5feF9hdHRyaWJ1dGVDbGVhbnVwcylcbiAgICBlbC5feF9hdHRyaWJ1dGVDbGVhbnVwcyA9IHt9O1xuICBpZiAoIWVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdKVxuICAgIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdID0gW107XG4gIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdLnB1c2goY2FsbGJhY2spO1xufVxuZnVuY3Rpb24gY2xlYW51cEF0dHJpYnV0ZXMoZWwsIG5hbWVzKSB7XG4gIGlmICghZWwuX3hfYXR0cmlidXRlQ2xlYW51cHMpXG4gICAgcmV0dXJuO1xuICBPYmplY3QuZW50cmllcyhlbC5feF9hdHRyaWJ1dGVDbGVhbnVwcykuZm9yRWFjaCgoW25hbWUsIHZhbHVlXSkgPT4ge1xuICAgIGlmIChuYW1lcyA9PT0gdm9pZCAwIHx8IG5hbWVzLmluY2x1ZGVzKG5hbWUpKSB7XG4gICAgICB2YWx1ZS5mb3JFYWNoKChpKSA9PiBpKCkpO1xuICAgICAgZGVsZXRlIGVsLl94X2F0dHJpYnV0ZUNsZWFudXBzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59XG52YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihvbk11dGF0ZSk7XG52YXIgY3VycmVudGx5T2JzZXJ2aW5nID0gZmFsc2U7XG5mdW5jdGlvbiBzdGFydE9ic2VydmluZ011dGF0aW9ucygpIHtcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudCwge3N1YnRyZWU6IHRydWUsIGNoaWxkTGlzdDogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZSwgYXR0cmlidXRlT2xkVmFsdWU6IHRydWV9KTtcbiAgY3VycmVudGx5T2JzZXJ2aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHN0b3BPYnNlcnZpbmdNdXRhdGlvbnMoKSB7XG4gIGZsdXNoT2JzZXJ2ZXIoKTtcbiAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICBjdXJyZW50bHlPYnNlcnZpbmcgPSBmYWxzZTtcbn1cbnZhciByZWNvcmRRdWV1ZSA9IFtdO1xudmFyIHdpbGxQcm9jZXNzUmVjb3JkUXVldWUgPSBmYWxzZTtcbmZ1bmN0aW9uIGZsdXNoT2JzZXJ2ZXIoKSB7XG4gIHJlY29yZFF1ZXVlID0gcmVjb3JkUXVldWUuY29uY2F0KG9ic2VydmVyLnRha2VSZWNvcmRzKCkpO1xuICBpZiAocmVjb3JkUXVldWUubGVuZ3RoICYmICF3aWxsUHJvY2Vzc1JlY29yZFF1ZXVlKSB7XG4gICAgd2lsbFByb2Nlc3NSZWNvcmRRdWV1ZSA9IHRydWU7XG4gICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgcHJvY2Vzc1JlY29yZFF1ZXVlKCk7XG4gICAgICB3aWxsUHJvY2Vzc1JlY29yZFF1ZXVlID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cbmZ1bmN0aW9uIHByb2Nlc3NSZWNvcmRRdWV1ZSgpIHtcbiAgb25NdXRhdGUocmVjb3JkUXVldWUpO1xuICByZWNvcmRRdWV1ZS5sZW5ndGggPSAwO1xufVxuZnVuY3Rpb24gbXV0YXRlRG9tKGNhbGxiYWNrKSB7XG4gIGlmICghY3VycmVudGx5T2JzZXJ2aW5nKVxuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICBzdG9wT2JzZXJ2aW5nTXV0YXRpb25zKCk7XG4gIGxldCByZXN1bHQgPSBjYWxsYmFjaygpO1xuICBzdGFydE9ic2VydmluZ011dGF0aW9ucygpO1xuICByZXR1cm4gcmVzdWx0O1xufVxudmFyIGlzQ29sbGVjdGluZyA9IGZhbHNlO1xudmFyIGRlZmVycmVkTXV0YXRpb25zID0gW107XG5mdW5jdGlvbiBkZWZlck11dGF0aW9ucygpIHtcbiAgaXNDb2xsZWN0aW5nID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGZsdXNoQW5kU3RvcERlZmVycmluZ011dGF0aW9ucygpIHtcbiAgaXNDb2xsZWN0aW5nID0gZmFsc2U7XG4gIG9uTXV0YXRlKGRlZmVycmVkTXV0YXRpb25zKTtcbiAgZGVmZXJyZWRNdXRhdGlvbnMgPSBbXTtcbn1cbmZ1bmN0aW9uIG9uTXV0YXRlKG11dGF0aW9ucykge1xuICBpZiAoaXNDb2xsZWN0aW5nKSB7XG4gICAgZGVmZXJyZWRNdXRhdGlvbnMgPSBkZWZlcnJlZE11dGF0aW9ucy5jb25jYXQobXV0YXRpb25zKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IGFkZGVkTm9kZXMgPSBbXTtcbiAgbGV0IHJlbW92ZWROb2RlcyA9IFtdO1xuICBsZXQgYWRkZWRBdHRyaWJ1dGVzID0gbmV3IE1hcCgpO1xuICBsZXQgcmVtb3ZlZEF0dHJpYnV0ZXMgPSBuZXcgTWFwKCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbXV0YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG11dGF0aW9uc1tpXS50YXJnZXQuX3hfaWdub3JlTXV0YXRpb25PYnNlcnZlcilcbiAgICAgIGNvbnRpbnVlO1xuICAgIGlmIChtdXRhdGlvbnNbaV0udHlwZSA9PT0gXCJjaGlsZExpc3RcIikge1xuICAgICAgbXV0YXRpb25zW2ldLmFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBhZGRlZE5vZGVzLnB1c2gobm9kZSkpO1xuICAgICAgbXV0YXRpb25zW2ldLnJlbW92ZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiBub2RlLm5vZGVUeXBlID09PSAxICYmIHJlbW92ZWROb2Rlcy5wdXNoKG5vZGUpKTtcbiAgICB9XG4gICAgaWYgKG11dGF0aW9uc1tpXS50eXBlID09PSBcImF0dHJpYnV0ZXNcIikge1xuICAgICAgbGV0IGVsID0gbXV0YXRpb25zW2ldLnRhcmdldDtcbiAgICAgIGxldCBuYW1lID0gbXV0YXRpb25zW2ldLmF0dHJpYnV0ZU5hbWU7XG4gICAgICBsZXQgb2xkVmFsdWUgPSBtdXRhdGlvbnNbaV0ub2xkVmFsdWU7XG4gICAgICBsZXQgYWRkMiA9ICgpID0+IHtcbiAgICAgICAgaWYgKCFhZGRlZEF0dHJpYnV0ZXMuaGFzKGVsKSlcbiAgICAgICAgICBhZGRlZEF0dHJpYnV0ZXMuc2V0KGVsLCBbXSk7XG4gICAgICAgIGFkZGVkQXR0cmlidXRlcy5nZXQoZWwpLnB1c2goe25hbWUsIHZhbHVlOiBlbC5nZXRBdHRyaWJ1dGUobmFtZSl9KTtcbiAgICAgIH07XG4gICAgICBsZXQgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBpZiAoIXJlbW92ZWRBdHRyaWJ1dGVzLmhhcyhlbCkpXG4gICAgICAgICAgcmVtb3ZlZEF0dHJpYnV0ZXMuc2V0KGVsLCBbXSk7XG4gICAgICAgIHJlbW92ZWRBdHRyaWJ1dGVzLmdldChlbCkucHVzaChuYW1lKTtcbiAgICAgIH07XG4gICAgICBpZiAoZWwuaGFzQXR0cmlidXRlKG5hbWUpICYmIG9sZFZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIGFkZDIoKTtcbiAgICAgIH0gZWxzZSBpZiAoZWwuaGFzQXR0cmlidXRlKG5hbWUpKSB7XG4gICAgICAgIHJlbW92ZSgpO1xuICAgICAgICBhZGQyKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVtb3ZlZEF0dHJpYnV0ZXMuZm9yRWFjaCgoYXR0cnMsIGVsKSA9PiB7XG4gICAgY2xlYW51cEF0dHJpYnV0ZXMoZWwsIGF0dHJzKTtcbiAgfSk7XG4gIGFkZGVkQXR0cmlidXRlcy5mb3JFYWNoKChhdHRycywgZWwpID0+IHtcbiAgICBvbkF0dHJpYnV0ZUFkZGVkcy5mb3JFYWNoKChpKSA9PiBpKGVsLCBhdHRycykpO1xuICB9KTtcbiAgZm9yIChsZXQgbm9kZSBvZiByZW1vdmVkTm9kZXMpIHtcbiAgICBpZiAoYWRkZWROb2Rlcy5pbmNsdWRlcyhub2RlKSlcbiAgICAgIGNvbnRpbnVlO1xuICAgIG9uRWxSZW1vdmVkcy5mb3JFYWNoKChpKSA9PiBpKG5vZGUpKTtcbiAgICBpZiAobm9kZS5feF9jbGVhbnVwcykge1xuICAgICAgd2hpbGUgKG5vZGUuX3hfY2xlYW51cHMubGVuZ3RoKVxuICAgICAgICBub2RlLl94X2NsZWFudXBzLnBvcCgpKCk7XG4gICAgfVxuICB9XG4gIGFkZGVkTm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIG5vZGUuX3hfaWdub3JlU2VsZiA9IHRydWU7XG4gICAgbm9kZS5feF9pZ25vcmUgPSB0cnVlO1xuICB9KTtcbiAgZm9yIChsZXQgbm9kZSBvZiBhZGRlZE5vZGVzKSB7XG4gICAgaWYgKHJlbW92ZWROb2Rlcy5pbmNsdWRlcyhub2RlKSlcbiAgICAgIGNvbnRpbnVlO1xuICAgIGlmICghbm9kZS5pc0Nvbm5lY3RlZClcbiAgICAgIGNvbnRpbnVlO1xuICAgIGRlbGV0ZSBub2RlLl94X2lnbm9yZVNlbGY7XG4gICAgZGVsZXRlIG5vZGUuX3hfaWdub3JlO1xuICAgIG9uRWxBZGRlZHMuZm9yRWFjaCgoaSkgPT4gaShub2RlKSk7XG4gICAgbm9kZS5feF9pZ25vcmUgPSB0cnVlO1xuICAgIG5vZGUuX3hfaWdub3JlU2VsZiA9IHRydWU7XG4gIH1cbiAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgZGVsZXRlIG5vZGUuX3hfaWdub3JlU2VsZjtcbiAgICBkZWxldGUgbm9kZS5feF9pZ25vcmU7XG4gIH0pO1xuICBhZGRlZE5vZGVzID0gbnVsbDtcbiAgcmVtb3ZlZE5vZGVzID0gbnVsbDtcbiAgYWRkZWRBdHRyaWJ1dGVzID0gbnVsbDtcbiAgcmVtb3ZlZEF0dHJpYnV0ZXMgPSBudWxsO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvc2NvcGUuanNcbmZ1bmN0aW9uIHNjb3BlKG5vZGUpIHtcbiAgcmV0dXJuIG1lcmdlUHJveGllcyhjbG9zZXN0RGF0YVN0YWNrKG5vZGUpKTtcbn1cbmZ1bmN0aW9uIGFkZFNjb3BlVG9Ob2RlKG5vZGUsIGRhdGEyLCByZWZlcmVuY2VOb2RlKSB7XG4gIG5vZGUuX3hfZGF0YVN0YWNrID0gW2RhdGEyLCAuLi5jbG9zZXN0RGF0YVN0YWNrKHJlZmVyZW5jZU5vZGUgfHwgbm9kZSldO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIG5vZGUuX3hfZGF0YVN0YWNrID0gbm9kZS5feF9kYXRhU3RhY2suZmlsdGVyKChpKSA9PiBpICE9PSBkYXRhMik7XG4gIH07XG59XG5mdW5jdGlvbiByZWZyZXNoU2NvcGUoZWxlbWVudCwgc2NvcGUyKSB7XG4gIGxldCBleGlzdGluZ1Njb3BlID0gZWxlbWVudC5feF9kYXRhU3RhY2tbMF07XG4gIE9iamVjdC5lbnRyaWVzKHNjb3BlMikuZm9yRWFjaCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgZXhpc3RpbmdTY29wZVtrZXldID0gdmFsdWU7XG4gIH0pO1xufVxuZnVuY3Rpb24gY2xvc2VzdERhdGFTdGFjayhub2RlKSB7XG4gIGlmIChub2RlLl94X2RhdGFTdGFjaylcbiAgICByZXR1cm4gbm9kZS5feF9kYXRhU3RhY2s7XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gXCJmdW5jdGlvblwiICYmIG5vZGUgaW5zdGFuY2VvZiBTaGFkb3dSb290KSB7XG4gICAgcmV0dXJuIGNsb3Nlc3REYXRhU3RhY2sobm9kZS5ob3N0KTtcbiAgfVxuICBpZiAoIW5vZGUucGFyZW50Tm9kZSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICByZXR1cm4gY2xvc2VzdERhdGFTdGFjayhub2RlLnBhcmVudE5vZGUpO1xufVxuZnVuY3Rpb24gbWVyZ2VQcm94aWVzKG9iamVjdHMpIHtcbiAgbGV0IHRoaXNQcm94eSA9IG5ldyBQcm94eSh7fSwge1xuICAgIG93bktleXM6ICgpID0+IHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQob2JqZWN0cy5mbGF0TWFwKChpKSA9PiBPYmplY3Qua2V5cyhpKSkpKTtcbiAgICB9LFxuICAgIGhhczogKHRhcmdldCwgbmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIG9iamVjdHMuc29tZSgob2JqKSA9PiBvYmouaGFzT3duUHJvcGVydHkobmFtZSkpO1xuICAgIH0sXG4gICAgZ2V0OiAodGFyZ2V0LCBuYW1lKSA9PiB7XG4gICAgICByZXR1cm4gKG9iamVjdHMuZmluZCgob2JqKSA9PiB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBsZXQgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBuYW1lKTtcbiAgICAgICAgICBpZiAoZGVzY3JpcHRvci5nZXQgJiYgZGVzY3JpcHRvci5nZXQuX3hfYWxyZWFkeUJvdW5kIHx8IGRlc2NyaXB0b3Iuc2V0ICYmIGRlc2NyaXB0b3Iuc2V0Ll94X2FscmVhZHlCb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgbGV0IGdldHRlciA9IGRlc2NyaXB0b3IuZ2V0O1xuICAgICAgICAgICAgbGV0IHNldHRlciA9IGRlc2NyaXB0b3Iuc2V0O1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gZGVzY3JpcHRvcjtcbiAgICAgICAgICAgIGdldHRlciA9IGdldHRlciAmJiBnZXR0ZXIuYmluZCh0aGlzUHJveHkpO1xuICAgICAgICAgICAgc2V0dGVyID0gc2V0dGVyICYmIHNldHRlci5iaW5kKHRoaXNQcm94eSk7XG4gICAgICAgICAgICBpZiAoZ2V0dGVyKVxuICAgICAgICAgICAgICBnZXR0ZXIuX3hfYWxyZWFkeUJvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzZXR0ZXIpXG4gICAgICAgICAgICAgIHNldHRlci5feF9hbHJlYWR5Qm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgICAgICAgICAgICAuLi5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgIHNldDogc2V0dGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSkgfHwge30pW25hbWVdO1xuICAgIH0sXG4gICAgc2V0OiAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgbGV0IGNsb3Nlc3RPYmplY3RXaXRoS2V5ID0gb2JqZWN0cy5maW5kKChvYmopID0+IG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKSk7XG4gICAgICBpZiAoY2xvc2VzdE9iamVjdFdpdGhLZXkpIHtcbiAgICAgICAgY2xvc2VzdE9iamVjdFdpdGhLZXlbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdHNbb2JqZWN0cy5sZW5ndGggLSAxXVtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHRoaXNQcm94eTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2ludGVyY2VwdG9yLmpzXG5mdW5jdGlvbiBpbml0SW50ZXJjZXB0b3JzKGRhdGEyKSB7XG4gIGxldCBpc09iamVjdDIgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmICFBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsICE9PSBudWxsO1xuICBsZXQgcmVjdXJzZSA9IChvYmosIGJhc2VQYXRoID0gXCJcIikgPT4ge1xuICAgIE9iamVjdC5lbnRyaWVzKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG9iaikpLmZvckVhY2goKFtrZXksIHt2YWx1ZSwgZW51bWVyYWJsZX1dKSA9PiB7XG4gICAgICBpZiAoZW51bWVyYWJsZSA9PT0gZmFsc2UgfHwgdmFsdWUgPT09IHZvaWQgMClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbGV0IHBhdGggPSBiYXNlUGF0aCA9PT0gXCJcIiA/IGtleSA6IGAke2Jhc2VQYXRofS4ke2tleX1gO1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5feF9pbnRlcmNlcHRvcikge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlLmluaXRpYWxpemUoZGF0YTIsIHBhdGgsIGtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNPYmplY3QyKHZhbHVlKSAmJiB2YWx1ZSAhPT0gb2JqICYmICEodmFsdWUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICAgIHJlY3Vyc2UodmFsdWUsIHBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHJldHVybiByZWN1cnNlKGRhdGEyKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdG9yKGNhbGxiYWNrLCBtdXRhdGVPYmogPSAoKSA9PiB7XG59KSB7XG4gIGxldCBvYmogPSB7XG4gICAgaW5pdGlhbFZhbHVlOiB2b2lkIDAsXG4gICAgX3hfaW50ZXJjZXB0b3I6IHRydWUsXG4gICAgaW5pdGlhbGl6ZShkYXRhMiwgcGF0aCwga2V5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5pbml0aWFsVmFsdWUsICgpID0+IGdldChkYXRhMiwgcGF0aCksICh2YWx1ZSkgPT4gc2V0KGRhdGEyLCBwYXRoLCB2YWx1ZSksIHBhdGgsIGtleSk7XG4gICAgfVxuICB9O1xuICBtdXRhdGVPYmoob2JqKTtcbiAgcmV0dXJuIChpbml0aWFsVmFsdWUpID0+IHtcbiAgICBpZiAodHlwZW9mIGluaXRpYWxWYWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBpbml0aWFsVmFsdWUgIT09IG51bGwgJiYgaW5pdGlhbFZhbHVlLl94X2ludGVyY2VwdG9yKSB7XG4gICAgICBsZXQgaW5pdGlhbGl6ZSA9IG9iai5pbml0aWFsaXplLmJpbmQob2JqKTtcbiAgICAgIG9iai5pbml0aWFsaXplID0gKGRhdGEyLCBwYXRoLCBrZXkpID0+IHtcbiAgICAgICAgbGV0IGlubmVyVmFsdWUgPSBpbml0aWFsVmFsdWUuaW5pdGlhbGl6ZShkYXRhMiwgcGF0aCwga2V5KTtcbiAgICAgICAgb2JqLmluaXRpYWxWYWx1ZSA9IGlubmVyVmFsdWU7XG4gICAgICAgIHJldHVybiBpbml0aWFsaXplKGRhdGEyLCBwYXRoLCBrZXkpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLmluaXRpYWxWYWx1ZSA9IGluaXRpYWxWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldChvYmosIHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgoY2FycnksIHNlZ21lbnQpID0+IGNhcnJ5W3NlZ21lbnRdLCBvYmopO1xufVxuZnVuY3Rpb24gc2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiKVxuICAgIHBhdGggPSBwYXRoLnNwbGl0KFwiLlwiKTtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAxKVxuICAgIG9ialtwYXRoWzBdXSA9IHZhbHVlO1xuICBlbHNlIGlmIChwYXRoLmxlbmd0aCA9PT0gMClcbiAgICB0aHJvdyBlcnJvcjtcbiAgZWxzZSB7XG4gICAgaWYgKG9ialtwYXRoWzBdXSlcbiAgICAgIHJldHVybiBzZXQob2JqW3BhdGhbMF1dLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSk7XG4gICAgZWxzZSB7XG4gICAgICBvYmpbcGF0aFswXV0gPSB7fTtcbiAgICAgIHJldHVybiBzZXQob2JqW3BhdGhbMF1dLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MuanNcbnZhciBtYWdpY3MgPSB7fTtcbmZ1bmN0aW9uIG1hZ2ljKG5hbWUsIGNhbGxiYWNrKSB7XG4gIG1hZ2ljc1tuYW1lXSA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gaW5qZWN0TWFnaWNzKG9iaiwgZWwpIHtcbiAgT2JqZWN0LmVudHJpZXMobWFnaWNzKS5mb3JFYWNoKChbbmFtZSwgY2FsbGJhY2tdKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgYCQke25hbWV9YCwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICBsZXQgW3V0aWxpdGllcywgY2xlYW51cDJdID0gZ2V0RWxlbWVudEJvdW5kVXRpbGl0aWVzKGVsKTtcbiAgICAgICAgdXRpbGl0aWVzID0ge2ludGVyY2VwdG9yLCAuLi51dGlsaXRpZXN9O1xuICAgICAgICBvbkVsUmVtb3ZlZChlbCwgY2xlYW51cDIpO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZWwsIHV0aWxpdGllcyk7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgb2JqLFxuICAgIGNsZWFudXA6ICgpID0+IHtcbiAgICAgIGVsID0gbnVsbDtcbiAgICB9XG4gIH07XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy9lcnJvci5qc1xuZnVuY3Rpb24gdHJ5Q2F0Y2goZWwsIGV4cHJlc3Npb24sIGNhbGxiYWNrLCAuLi5hcmdzKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKC4uLmFyZ3MpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgaGFuZGxlRXJyb3IoZSwgZWwsIGV4cHJlc3Npb24pO1xuICB9XG59XG5mdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcjIsIGVsLCBleHByZXNzaW9uID0gdm9pZCAwKSB7XG4gIE9iamVjdC5hc3NpZ24oZXJyb3IyLCB7ZWwsIGV4cHJlc3Npb259KTtcbiAgY29uc29sZS53YXJuKGBBbHBpbmUgRXhwcmVzc2lvbiBFcnJvcjogJHtlcnJvcjIubWVzc2FnZX1cblxuJHtleHByZXNzaW9uID8gJ0V4cHJlc3Npb246IFwiJyArIGV4cHJlc3Npb24gKyAnXCJcXG5cXG4nIDogXCJcIn1gLCBlbCk7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRocm93IGVycm9yMjtcbiAgfSwgMCk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9ldmFsdWF0b3IuanNcbnZhciBzaG91bGRBdXRvRXZhbHVhdGVGdW5jdGlvbnMgPSB0cnVlO1xuZnVuY3Rpb24gZG9udEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyhjYWxsYmFjaykge1xuICBsZXQgY2FjaGUgPSBzaG91bGRBdXRvRXZhbHVhdGVGdW5jdGlvbnM7XG4gIHNob3VsZEF1dG9FdmFsdWF0ZUZ1bmN0aW9ucyA9IGZhbHNlO1xuICBjYWxsYmFjaygpO1xuICBzaG91bGRBdXRvRXZhbHVhdGVGdW5jdGlvbnMgPSBjYWNoZTtcbn1cbmZ1bmN0aW9uIGV2YWx1YXRlKGVsLCBleHByZXNzaW9uLCBleHRyYXMgPSB7fSkge1xuICBsZXQgcmVzdWx0O1xuICBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKSgodmFsdWUpID0+IHJlc3VsdCA9IHZhbHVlLCBleHRyYXMpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZXZhbHVhdGVMYXRlciguLi5hcmdzKSB7XG4gIHJldHVybiB0aGVFdmFsdWF0b3JGdW5jdGlvbiguLi5hcmdzKTtcbn1cbnZhciB0aGVFdmFsdWF0b3JGdW5jdGlvbiA9IG5vcm1hbEV2YWx1YXRvcjtcbmZ1bmN0aW9uIHNldEV2YWx1YXRvcihuZXdFdmFsdWF0b3IpIHtcbiAgdGhlRXZhbHVhdG9yRnVuY3Rpb24gPSBuZXdFdmFsdWF0b3I7XG59XG5mdW5jdGlvbiBub3JtYWxFdmFsdWF0b3IoZWwsIGV4cHJlc3Npb24pIHtcbiAgbGV0IG92ZXJyaWRkZW5NYWdpY3MgPSB7fTtcbiAgbGV0IGNsZWFudXAyID0gaW5qZWN0TWFnaWNzKG92ZXJyaWRkZW5NYWdpY3MsIGVsKS5jbGVhbnVwO1xuICBvbkF0dHJpYnV0ZVJlbW92ZWQoZWwsIFwiZXZhbHVhdG9yXCIsIGNsZWFudXAyKTtcbiAgbGV0IGRhdGFTdGFjayA9IFtvdmVycmlkZGVuTWFnaWNzLCAuLi5jbG9zZXN0RGF0YVN0YWNrKGVsKV07XG4gIGlmICh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGdlbmVyYXRlRXZhbHVhdG9yRnJvbUZ1bmN0aW9uKGRhdGFTdGFjaywgZXhwcmVzc2lvbik7XG4gIH1cbiAgbGV0IGV2YWx1YXRvciA9IGdlbmVyYXRlRXZhbHVhdG9yRnJvbVN0cmluZyhkYXRhU3RhY2ssIGV4cHJlc3Npb24sIGVsKTtcbiAgcmV0dXJuIHRyeUNhdGNoLmJpbmQobnVsbCwgZWwsIGV4cHJlc3Npb24sIGV2YWx1YXRvcik7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUV2YWx1YXRvckZyb21GdW5jdGlvbihkYXRhU3RhY2ssIGZ1bmMpIHtcbiAgcmV0dXJuIChyZWNlaXZlciA9ICgpID0+IHtcbiAgfSwge3Njb3BlOiBzY29wZTIgPSB7fSwgcGFyYW1zID0gW119ID0ge30pID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gZnVuYy5hcHBseShtZXJnZVByb3hpZXMoW3Njb3BlMiwgLi4uZGF0YVN0YWNrXSksIHBhcmFtcyk7XG4gICAgcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgcmVzdWx0KTtcbiAgfTtcbn1cbnZhciBldmFsdWF0b3JNZW1vID0ge307XG5mdW5jdGlvbiBnZW5lcmF0ZUZ1bmN0aW9uRnJvbVN0cmluZyhleHByZXNzaW9uLCBlbCkge1xuICBpZiAoZXZhbHVhdG9yTWVtb1tleHByZXNzaW9uXSkge1xuICAgIHJldHVybiBldmFsdWF0b3JNZW1vW2V4cHJlc3Npb25dO1xuICB9XG4gIGxldCBBc3luY0Z1bmN0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jIGZ1bmN0aW9uKCkge1xuICB9KS5jb25zdHJ1Y3RvcjtcbiAgbGV0IHJpZ2h0U2lkZVNhZmVFeHByZXNzaW9uID0gL15bXFxuXFxzXSppZi4qXFwoLipcXCkvLnRlc3QoZXhwcmVzc2lvbikgfHwgL14obGV0fGNvbnN0KVxccy8udGVzdChleHByZXNzaW9uKSA/IGAoKCkgPT4geyAke2V4cHJlc3Npb259IH0pKClgIDogZXhwcmVzc2lvbjtcbiAgY29uc3Qgc2FmZUFzeW5jRnVuY3Rpb24gPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBuZXcgQXN5bmNGdW5jdGlvbihbXCJfX3NlbGZcIiwgXCJzY29wZVwiXSwgYHdpdGggKHNjb3BlKSB7IF9fc2VsZi5yZXN1bHQgPSAke3JpZ2h0U2lkZVNhZmVFeHByZXNzaW9ufSB9OyBfX3NlbGYuZmluaXNoZWQgPSB0cnVlOyByZXR1cm4gX19zZWxmLnJlc3VsdDtgKTtcbiAgICB9IGNhdGNoIChlcnJvcjIpIHtcbiAgICAgIGhhbmRsZUVycm9yKGVycm9yMiwgZWwsIGV4cHJlc3Npb24pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgfTtcbiAgbGV0IGZ1bmMgPSBzYWZlQXN5bmNGdW5jdGlvbigpO1xuICBldmFsdWF0b3JNZW1vW2V4cHJlc3Npb25dID0gZnVuYztcbiAgcmV0dXJuIGZ1bmM7XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUV2YWx1YXRvckZyb21TdHJpbmcoZGF0YVN0YWNrLCBleHByZXNzaW9uLCBlbCkge1xuICBsZXQgZnVuYyA9IGdlbmVyYXRlRnVuY3Rpb25Gcm9tU3RyaW5nKGV4cHJlc3Npb24sIGVsKTtcbiAgcmV0dXJuIChyZWNlaXZlciA9ICgpID0+IHtcbiAgfSwge3Njb3BlOiBzY29wZTIgPSB7fSwgcGFyYW1zID0gW119ID0ge30pID0+IHtcbiAgICBmdW5jLnJlc3VsdCA9IHZvaWQgMDtcbiAgICBmdW5jLmZpbmlzaGVkID0gZmFsc2U7XG4gICAgbGV0IGNvbXBsZXRlU2NvcGUgPSBtZXJnZVByb3hpZXMoW3Njb3BlMiwgLi4uZGF0YVN0YWNrXSk7XG4gICAgaWYgKHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGxldCBwcm9taXNlID0gZnVuYyhmdW5jLCBjb21wbGV0ZVNjb3BlKS5jYXRjaCgoZXJyb3IyKSA9PiBoYW5kbGVFcnJvcihlcnJvcjIsIGVsLCBleHByZXNzaW9uKSk7XG4gICAgICBpZiAoZnVuYy5maW5pc2hlZCkge1xuICAgICAgICBydW5JZlR5cGVPZkZ1bmN0aW9uKHJlY2VpdmVyLCBmdW5jLnJlc3VsdCwgY29tcGxldGVTY29wZSwgcGFyYW1zLCBlbCk7XG4gICAgICAgIGZ1bmMucmVzdWx0ID0gdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICBydW5JZlR5cGVPZkZ1bmN0aW9uKHJlY2VpdmVyLCByZXN1bHQsIGNvbXBsZXRlU2NvcGUsIHBhcmFtcywgZWwpO1xuICAgICAgICB9KS5jYXRjaCgoZXJyb3IyKSA9PiBoYW5kbGVFcnJvcihlcnJvcjIsIGVsLCBleHByZXNzaW9uKSkuZmluYWxseSgoKSA9PiBmdW5jLnJlc3VsdCA9IHZvaWQgMCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gcnVuSWZUeXBlT2ZGdW5jdGlvbihyZWNlaXZlciwgdmFsdWUsIHNjb3BlMiwgcGFyYW1zLCBlbCkge1xuICBpZiAoc2hvdWxkQXV0b0V2YWx1YXRlRnVuY3Rpb25zICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHJlc3VsdCA9IHZhbHVlLmFwcGx5KHNjb3BlMiwgcGFyYW1zKTtcbiAgICBpZiAocmVzdWx0IGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgcmVzdWx0LnRoZW4oKGkpID0+IHJ1bklmVHlwZU9mRnVuY3Rpb24ocmVjZWl2ZXIsIGksIHNjb3BlMiwgcGFyYW1zKSkuY2F0Y2goKGVycm9yMikgPT4gaGFuZGxlRXJyb3IoZXJyb3IyLCBlbCwgdmFsdWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVjZWl2ZXIocmVzdWx0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVjZWl2ZXIodmFsdWUpO1xuICB9XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzLmpzXG52YXIgcHJlZml4QXNTdHJpbmcgPSBcIngtXCI7XG5mdW5jdGlvbiBwcmVmaXgoc3ViamVjdCA9IFwiXCIpIHtcbiAgcmV0dXJuIHByZWZpeEFzU3RyaW5nICsgc3ViamVjdDtcbn1cbmZ1bmN0aW9uIHNldFByZWZpeChuZXdQcmVmaXgpIHtcbiAgcHJlZml4QXNTdHJpbmcgPSBuZXdQcmVmaXg7XG59XG52YXIgZGlyZWN0aXZlSGFuZGxlcnMgPSB7fTtcbmZ1bmN0aW9uIGRpcmVjdGl2ZShuYW1lLCBjYWxsYmFjaykge1xuICBkaXJlY3RpdmVIYW5kbGVyc1tuYW1lXSA9IGNhbGxiYWNrO1xufVxuZnVuY3Rpb24gZGlyZWN0aXZlcyhlbCwgYXR0cmlidXRlcywgb3JpZ2luYWxBdHRyaWJ1dGVPdmVycmlkZSkge1xuICBhdHRyaWJ1dGVzID0gQXJyYXkuZnJvbShhdHRyaWJ1dGVzKTtcbiAgaWYgKGVsLl94X3ZpcnR1YWxEaXJlY3RpdmVzKSB7XG4gICAgbGV0IHZBdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMoZWwuX3hfdmlydHVhbERpcmVjdGl2ZXMpLm1hcCgoW25hbWUsIHZhbHVlXSkgPT4gKHtuYW1lLCB2YWx1ZX0pKTtcbiAgICBsZXQgc3RhdGljQXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNPbmx5KHZBdHRyaWJ1dGVzKTtcbiAgICB2QXR0cmlidXRlcyA9IHZBdHRyaWJ1dGVzLm1hcCgoYXR0cmlidXRlKSA9PiB7XG4gICAgICBpZiAoc3RhdGljQXR0cmlidXRlcy5maW5kKChhdHRyKSA9PiBhdHRyLm5hbWUgPT09IGF0dHJpYnV0ZS5uYW1lKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGB4LWJpbmQ6JHthdHRyaWJ1dGUubmFtZX1gLFxuICAgICAgICAgIHZhbHVlOiBgXCIke2F0dHJpYnV0ZS52YWx1ZX1cImBcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhdHRyaWJ1dGU7XG4gICAgfSk7XG4gICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuY29uY2F0KHZBdHRyaWJ1dGVzKTtcbiAgfVxuICBsZXQgdHJhbnNmb3JtZWRBdHRyaWJ1dGVNYXAgPSB7fTtcbiAgbGV0IGRpcmVjdGl2ZXMyID0gYXR0cmlidXRlcy5tYXAodG9UcmFuc2Zvcm1lZEF0dHJpYnV0ZXMoKG5ld05hbWUsIG9sZE5hbWUpID0+IHRyYW5zZm9ybWVkQXR0cmlidXRlTWFwW25ld05hbWVdID0gb2xkTmFtZSkpLmZpbHRlcihvdXROb25BbHBpbmVBdHRyaWJ1dGVzKS5tYXAodG9QYXJzZWREaXJlY3RpdmVzKHRyYW5zZm9ybWVkQXR0cmlidXRlTWFwLCBvcmlnaW5hbEF0dHJpYnV0ZU92ZXJyaWRlKSkuc29ydChieVByaW9yaXR5KTtcbiAgcmV0dXJuIGRpcmVjdGl2ZXMyLm1hcCgoZGlyZWN0aXZlMikgPT4ge1xuICAgIHJldHVybiBnZXREaXJlY3RpdmVIYW5kbGVyKGVsLCBkaXJlY3RpdmUyKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBhdHRyaWJ1dGVzT25seShhdHRyaWJ1dGVzKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKGF0dHJpYnV0ZXMpLm1hcCh0b1RyYW5zZm9ybWVkQXR0cmlidXRlcygpKS5maWx0ZXIoKGF0dHIpID0+ICFvdXROb25BbHBpbmVBdHRyaWJ1dGVzKGF0dHIpKTtcbn1cbnZhciBpc0RlZmVycmluZ0hhbmRsZXJzID0gZmFsc2U7XG52YXIgZGlyZWN0aXZlSGFuZGxlclN0YWNrcyA9IG5ldyBNYXAoKTtcbnZhciBjdXJyZW50SGFuZGxlclN0YWNrS2V5ID0gU3ltYm9sKCk7XG5mdW5jdGlvbiBkZWZlckhhbmRsaW5nRGlyZWN0aXZlcyhjYWxsYmFjaykge1xuICBpc0RlZmVycmluZ0hhbmRsZXJzID0gdHJ1ZTtcbiAgbGV0IGtleSA9IFN5bWJvbCgpO1xuICBjdXJyZW50SGFuZGxlclN0YWNrS2V5ID0ga2V5O1xuICBkaXJlY3RpdmVIYW5kbGVyU3RhY2tzLnNldChrZXksIFtdKTtcbiAgbGV0IGZsdXNoSGFuZGxlcnMgPSAoKSA9PiB7XG4gICAgd2hpbGUgKGRpcmVjdGl2ZUhhbmRsZXJTdGFja3MuZ2V0KGtleSkubGVuZ3RoKVxuICAgICAgZGlyZWN0aXZlSGFuZGxlclN0YWNrcy5nZXQoa2V5KS5zaGlmdCgpKCk7XG4gICAgZGlyZWN0aXZlSGFuZGxlclN0YWNrcy5kZWxldGUoa2V5KTtcbiAgfTtcbiAgbGV0IHN0b3BEZWZlcnJpbmcgPSAoKSA9PiB7XG4gICAgaXNEZWZlcnJpbmdIYW5kbGVycyA9IGZhbHNlO1xuICAgIGZsdXNoSGFuZGxlcnMoKTtcbiAgfTtcbiAgY2FsbGJhY2soZmx1c2hIYW5kbGVycyk7XG4gIHN0b3BEZWZlcnJpbmcoKTtcbn1cbmZ1bmN0aW9uIGdldEVsZW1lbnRCb3VuZFV0aWxpdGllcyhlbCkge1xuICBsZXQgY2xlYW51cHMgPSBbXTtcbiAgbGV0IGNsZWFudXAyID0gKGNhbGxiYWNrKSA9PiBjbGVhbnVwcy5wdXNoKGNhbGxiYWNrKTtcbiAgbGV0IFtlZmZlY3QzLCBjbGVhbnVwRWZmZWN0XSA9IGVsZW1lbnRCb3VuZEVmZmVjdChlbCk7XG4gIGNsZWFudXBzLnB1c2goY2xlYW51cEVmZmVjdCk7XG4gIGxldCB1dGlsaXRpZXMgPSB7XG4gICAgQWxwaW5lOiBhbHBpbmVfZGVmYXVsdCxcbiAgICBlZmZlY3Q6IGVmZmVjdDMsXG4gICAgY2xlYW51cDogY2xlYW51cDIsXG4gICAgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlci5iaW5kKGV2YWx1YXRlTGF0ZXIsIGVsKSxcbiAgICBldmFsdWF0ZTogZXZhbHVhdGUuYmluZChldmFsdWF0ZSwgZWwpXG4gIH07XG4gIGxldCBkb0NsZWFudXAgPSAoKSA9PiBjbGVhbnVwcy5mb3JFYWNoKChpKSA9PiBpKCkpO1xuICByZXR1cm4gW3V0aWxpdGllcywgZG9DbGVhbnVwXTtcbn1cbmZ1bmN0aW9uIGdldERpcmVjdGl2ZUhhbmRsZXIoZWwsIGRpcmVjdGl2ZTIpIHtcbiAgbGV0IG5vb3AgPSAoKSA9PiB7XG4gIH07XG4gIGxldCBoYW5kbGVyMyA9IGRpcmVjdGl2ZUhhbmRsZXJzW2RpcmVjdGl2ZTIudHlwZV0gfHwgbm9vcDtcbiAgbGV0IFt1dGlsaXRpZXMsIGNsZWFudXAyXSA9IGdldEVsZW1lbnRCb3VuZFV0aWxpdGllcyhlbCk7XG4gIG9uQXR0cmlidXRlUmVtb3ZlZChlbCwgZGlyZWN0aXZlMi5vcmlnaW5hbCwgY2xlYW51cDIpO1xuICBsZXQgZnVsbEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKGVsLl94X2lnbm9yZSB8fCBlbC5feF9pZ25vcmVTZWxmKVxuICAgICAgcmV0dXJuO1xuICAgIGhhbmRsZXIzLmlubGluZSAmJiBoYW5kbGVyMy5pbmxpbmUoZWwsIGRpcmVjdGl2ZTIsIHV0aWxpdGllcyk7XG4gICAgaGFuZGxlcjMgPSBoYW5kbGVyMy5iaW5kKGhhbmRsZXIzLCBlbCwgZGlyZWN0aXZlMiwgdXRpbGl0aWVzKTtcbiAgICBpc0RlZmVycmluZ0hhbmRsZXJzID8gZGlyZWN0aXZlSGFuZGxlclN0YWNrcy5nZXQoY3VycmVudEhhbmRsZXJTdGFja0tleSkucHVzaChoYW5kbGVyMykgOiBoYW5kbGVyMygpO1xuICB9O1xuICBmdWxsSGFuZGxlci5ydW5DbGVhbnVwcyA9IGNsZWFudXAyO1xuICByZXR1cm4gZnVsbEhhbmRsZXI7XG59XG52YXIgc3RhcnRpbmdXaXRoID0gKHN1YmplY3QsIHJlcGxhY2VtZW50KSA9PiAoe25hbWUsIHZhbHVlfSkgPT4ge1xuICBpZiAobmFtZS5zdGFydHNXaXRoKHN1YmplY3QpKVxuICAgIG5hbWUgPSBuYW1lLnJlcGxhY2Uoc3ViamVjdCwgcmVwbGFjZW1lbnQpO1xuICByZXR1cm4ge25hbWUsIHZhbHVlfTtcbn07XG52YXIgaW50byA9IChpKSA9PiBpO1xuZnVuY3Rpb24gdG9UcmFuc2Zvcm1lZEF0dHJpYnV0ZXMoY2FsbGJhY2sgPSAoKSA9PiB7XG59KSB7XG4gIHJldHVybiAoe25hbWUsIHZhbHVlfSkgPT4ge1xuICAgIGxldCB7bmFtZTogbmV3TmFtZSwgdmFsdWU6IG5ld1ZhbHVlfSA9IGF0dHJpYnV0ZVRyYW5zZm9ybWVycy5yZWR1Y2UoKGNhcnJ5LCB0cmFuc2Zvcm0pID0+IHtcbiAgICAgIHJldHVybiB0cmFuc2Zvcm0oY2FycnkpO1xuICAgIH0sIHtuYW1lLCB2YWx1ZX0pO1xuICAgIGlmIChuZXdOYW1lICE9PSBuYW1lKVxuICAgICAgY2FsbGJhY2sobmV3TmFtZSwgbmFtZSk7XG4gICAgcmV0dXJuIHtuYW1lOiBuZXdOYW1lLCB2YWx1ZTogbmV3VmFsdWV9O1xuICB9O1xufVxudmFyIGF0dHJpYnV0ZVRyYW5zZm9ybWVycyA9IFtdO1xuZnVuY3Rpb24gbWFwQXR0cmlidXRlcyhjYWxsYmFjaykge1xuICBhdHRyaWJ1dGVUcmFuc2Zvcm1lcnMucHVzaChjYWxsYmFjayk7XG59XG5mdW5jdGlvbiBvdXROb25BbHBpbmVBdHRyaWJ1dGVzKHtuYW1lfSkge1xuICByZXR1cm4gYWxwaW5lQXR0cmlidXRlUmVnZXgoKS50ZXN0KG5hbWUpO1xufVxudmFyIGFscGluZUF0dHJpYnV0ZVJlZ2V4ID0gKCkgPT4gbmV3IFJlZ0V4cChgXiR7cHJlZml4QXNTdHJpbmd9KFteOl4uXSspXFxcXGJgKTtcbmZ1bmN0aW9uIHRvUGFyc2VkRGlyZWN0aXZlcyh0cmFuc2Zvcm1lZEF0dHJpYnV0ZU1hcCwgb3JpZ2luYWxBdHRyaWJ1dGVPdmVycmlkZSkge1xuICByZXR1cm4gKHtuYW1lLCB2YWx1ZX0pID0+IHtcbiAgICBsZXQgdHlwZU1hdGNoID0gbmFtZS5tYXRjaChhbHBpbmVBdHRyaWJ1dGVSZWdleCgpKTtcbiAgICBsZXQgdmFsdWVNYXRjaCA9IG5hbWUubWF0Y2goLzooW2EtekEtWjAtOVxcLTpdKykvKTtcbiAgICBsZXQgbW9kaWZpZXJzID0gbmFtZS5tYXRjaCgvXFwuW14uXFxdXSsoPz1bXlxcXV0qJCkvZykgfHwgW107XG4gICAgbGV0IG9yaWdpbmFsID0gb3JpZ2luYWxBdHRyaWJ1dGVPdmVycmlkZSB8fCB0cmFuc2Zvcm1lZEF0dHJpYnV0ZU1hcFtuYW1lXSB8fCBuYW1lO1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiB0eXBlTWF0Y2ggPyB0eXBlTWF0Y2hbMV0gOiBudWxsLFxuICAgICAgdmFsdWU6IHZhbHVlTWF0Y2ggPyB2YWx1ZU1hdGNoWzFdIDogbnVsbCxcbiAgICAgIG1vZGlmaWVyczogbW9kaWZpZXJzLm1hcCgoaSkgPT4gaS5yZXBsYWNlKFwiLlwiLCBcIlwiKSksXG4gICAgICBleHByZXNzaW9uOiB2YWx1ZSxcbiAgICAgIG9yaWdpbmFsXG4gICAgfTtcbiAgfTtcbn1cbnZhciBERUZBVUxUID0gXCJERUZBVUxUXCI7XG52YXIgZGlyZWN0aXZlT3JkZXIgPSBbXG4gIFwiaWdub3JlXCIsXG4gIFwicmVmXCIsXG4gIFwiZGF0YVwiLFxuICBcImlkXCIsXG4gIFwiYmluZFwiLFxuICBcImluaXRcIixcbiAgXCJmb3JcIixcbiAgXCJtYXNrXCIsXG4gIFwibW9kZWxcIixcbiAgXCJtb2RlbGFibGVcIixcbiAgXCJ0cmFuc2l0aW9uXCIsXG4gIFwic2hvd1wiLFxuICBcImlmXCIsXG4gIERFRkFVTFQsXG4gIFwidGVsZXBvcnRcIlxuXTtcbmZ1bmN0aW9uIGJ5UHJpb3JpdHkoYSwgYikge1xuICBsZXQgdHlwZUEgPSBkaXJlY3RpdmVPcmRlci5pbmRleE9mKGEudHlwZSkgPT09IC0xID8gREVGQVVMVCA6IGEudHlwZTtcbiAgbGV0IHR5cGVCID0gZGlyZWN0aXZlT3JkZXIuaW5kZXhPZihiLnR5cGUpID09PSAtMSA/IERFRkFVTFQgOiBiLnR5cGU7XG4gIHJldHVybiBkaXJlY3RpdmVPcmRlci5pbmRleE9mKHR5cGVBKSAtIGRpcmVjdGl2ZU9yZGVyLmluZGV4T2YodHlwZUIpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvZGlzcGF0Y2guanNcbmZ1bmN0aW9uIGRpc3BhdGNoKGVsLCBuYW1lLCBkZXRhaWwgPSB7fSkge1xuICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgZGV0YWlsLFxuICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgY29tcG9zZWQ6IHRydWUsXG4gICAgY2FuY2VsYWJsZTogdHJ1ZVxuICB9KSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9uZXh0VGljay5qc1xudmFyIHRpY2tTdGFjayA9IFtdO1xudmFyIGlzSG9sZGluZyA9IGZhbHNlO1xuZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2sgPSAoKSA9PiB7XG59KSB7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpc0hvbGRpbmcgfHwgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZWxlYXNlTmV4dFRpY2tzKCk7XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlcykgPT4ge1xuICAgIHRpY2tTdGFjay5wdXNoKCgpID0+IHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgICByZXMoKTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiByZWxlYXNlTmV4dFRpY2tzKCkge1xuICBpc0hvbGRpbmcgPSBmYWxzZTtcbiAgd2hpbGUgKHRpY2tTdGFjay5sZW5ndGgpXG4gICAgdGlja1N0YWNrLnNoaWZ0KCkoKTtcbn1cbmZ1bmN0aW9uIGhvbGROZXh0VGlja3MoKSB7XG4gIGlzSG9sZGluZyA9IHRydWU7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy93YWxrLmpzXG5mdW5jdGlvbiB3YWxrKGVsLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIFNoYWRvd1Jvb3QgPT09IFwiZnVuY3Rpb25cIiAmJiBlbCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICBBcnJheS5mcm9tKGVsLmNoaWxkcmVuKS5mb3JFYWNoKChlbDIpID0+IHdhbGsoZWwyLCBjYWxsYmFjaykpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgc2tpcCA9IGZhbHNlO1xuICBjYWxsYmFjayhlbCwgKCkgPT4gc2tpcCA9IHRydWUpO1xuICBpZiAoc2tpcClcbiAgICByZXR1cm47XG4gIGxldCBub2RlID0gZWwuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIHdoaWxlIChub2RlKSB7XG4gICAgd2Fsayhub2RlLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgIG5vZGUgPSBub2RlLm5leHRFbGVtZW50U2libGluZztcbiAgfVxufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvd2Fybi5qc1xuZnVuY3Rpb24gd2FybihtZXNzYWdlLCAuLi5hcmdzKSB7XG4gIGNvbnNvbGUud2FybihgQWxwaW5lIFdhcm5pbmc6ICR7bWVzc2FnZX1gLCAuLi5hcmdzKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2xpZmVjeWNsZS5qc1xuZnVuY3Rpb24gc3RhcnQoKSB7XG4gIGlmICghZG9jdW1lbnQuYm9keSlcbiAgICB3YXJuKFwiVW5hYmxlIHRvIGluaXRpYWxpemUuIFRyeWluZyB0byBsb2FkIEFscGluZSBiZWZvcmUgYDxib2R5PmAgaXMgYXZhaWxhYmxlLiBEaWQgeW91IGZvcmdldCB0byBhZGQgYGRlZmVyYCBpbiBBbHBpbmUncyBgPHNjcmlwdD5gIHRhZz9cIik7XG4gIGRpc3BhdGNoKGRvY3VtZW50LCBcImFscGluZTppbml0XCIpO1xuICBkaXNwYXRjaChkb2N1bWVudCwgXCJhbHBpbmU6aW5pdGlhbGl6aW5nXCIpO1xuICBzdGFydE9ic2VydmluZ011dGF0aW9ucygpO1xuICBvbkVsQWRkZWQoKGVsKSA9PiBpbml0VHJlZShlbCwgd2FsaykpO1xuICBvbkVsUmVtb3ZlZCgoZWwpID0+IGRlc3Ryb3lUcmVlKGVsKSk7XG4gIG9uQXR0cmlidXRlc0FkZGVkKChlbCwgYXR0cnMpID0+IHtcbiAgICBkaXJlY3RpdmVzKGVsLCBhdHRycykuZm9yRWFjaCgoaGFuZGxlKSA9PiBoYW5kbGUoKSk7XG4gIH0pO1xuICBsZXQgb3V0TmVzdGVkQ29tcG9uZW50cyA9IChlbCkgPT4gIWNsb3Nlc3RSb290KGVsLnBhcmVudEVsZW1lbnQsIHRydWUpO1xuICBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYWxsU2VsZWN0b3JzKCkpKS5maWx0ZXIob3V0TmVzdGVkQ29tcG9uZW50cykuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBpbml0VHJlZShlbCk7XG4gIH0pO1xuICBkaXNwYXRjaChkb2N1bWVudCwgXCJhbHBpbmU6aW5pdGlhbGl6ZWRcIik7XG59XG52YXIgcm9vdFNlbGVjdG9yQ2FsbGJhY2tzID0gW107XG52YXIgaW5pdFNlbGVjdG9yQ2FsbGJhY2tzID0gW107XG5mdW5jdGlvbiByb290U2VsZWN0b3JzKCkge1xuICByZXR1cm4gcm9vdFNlbGVjdG9yQ2FsbGJhY2tzLm1hcCgoZm4pID0+IGZuKCkpO1xufVxuZnVuY3Rpb24gYWxsU2VsZWN0b3JzKCkge1xuICByZXR1cm4gcm9vdFNlbGVjdG9yQ2FsbGJhY2tzLmNvbmNhdChpbml0U2VsZWN0b3JDYWxsYmFja3MpLm1hcCgoZm4pID0+IGZuKCkpO1xufVxuZnVuY3Rpb24gYWRkUm9vdFNlbGVjdG9yKHNlbGVjdG9yQ2FsbGJhY2spIHtcbiAgcm9vdFNlbGVjdG9yQ2FsbGJhY2tzLnB1c2goc2VsZWN0b3JDYWxsYmFjayk7XG59XG5mdW5jdGlvbiBhZGRJbml0U2VsZWN0b3Ioc2VsZWN0b3JDYWxsYmFjaykge1xuICBpbml0U2VsZWN0b3JDYWxsYmFja3MucHVzaChzZWxlY3RvckNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3RSb290KGVsLCBpbmNsdWRlSW5pdFNlbGVjdG9ycyA9IGZhbHNlKSB7XG4gIHJldHVybiBmaW5kQ2xvc2VzdChlbCwgKGVsZW1lbnQpID0+IHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBpbmNsdWRlSW5pdFNlbGVjdG9ycyA/IGFsbFNlbGVjdG9ycygpIDogcm9vdFNlbGVjdG9ycygpO1xuICAgIGlmIChzZWxlY3RvcnMuc29tZSgoc2VsZWN0b3IpID0+IGVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpKVxuICAgICAgcmV0dXJuIHRydWU7XG4gIH0pO1xufVxuZnVuY3Rpb24gZmluZENsb3Nlc3QoZWwsIGNhbGxiYWNrKSB7XG4gIGlmICghZWwpXG4gICAgcmV0dXJuO1xuICBpZiAoY2FsbGJhY2soZWwpKVxuICAgIHJldHVybiBlbDtcbiAgaWYgKGVsLl94X3RlbGVwb3J0QmFjaylcbiAgICBlbCA9IGVsLl94X3RlbGVwb3J0QmFjaztcbiAgaWYgKCFlbC5wYXJlbnRFbGVtZW50KVxuICAgIHJldHVybjtcbiAgcmV0dXJuIGZpbmRDbG9zZXN0KGVsLnBhcmVudEVsZW1lbnQsIGNhbGxiYWNrKTtcbn1cbmZ1bmN0aW9uIGlzUm9vdChlbCkge1xuICByZXR1cm4gcm9vdFNlbGVjdG9ycygpLnNvbWUoKHNlbGVjdG9yKSA9PiBlbC5tYXRjaGVzKHNlbGVjdG9yKSk7XG59XG5mdW5jdGlvbiBpbml0VHJlZShlbCwgd2Fsa2VyID0gd2Fsaykge1xuICBkZWZlckhhbmRsaW5nRGlyZWN0aXZlcygoKSA9PiB7XG4gICAgd2Fsa2VyKGVsLCAoZWwyLCBza2lwKSA9PiB7XG4gICAgICBkaXJlY3RpdmVzKGVsMiwgZWwyLmF0dHJpYnV0ZXMpLmZvckVhY2goKGhhbmRsZSkgPT4gaGFuZGxlKCkpO1xuICAgICAgZWwyLl94X2lnbm9yZSAmJiBza2lwKCk7XG4gICAgfSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gZGVzdHJveVRyZWUocm9vdCkge1xuICB3YWxrKHJvb3QsIChlbCkgPT4gY2xlYW51cEF0dHJpYnV0ZXMoZWwpKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL3V0aWxzL2NsYXNzZXMuanNcbmZ1bmN0aW9uIHNldENsYXNzZXMoZWwsIHZhbHVlKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBzZXRDbGFzc2VzRnJvbVN0cmluZyhlbCwgdmFsdWUuam9pbihcIiBcIikpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBzZXRDbGFzc2VzRnJvbU9iamVjdChlbCwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHNldENsYXNzZXMoZWwsIHZhbHVlKCkpO1xuICB9XG4gIHJldHVybiBzZXRDbGFzc2VzRnJvbVN0cmluZyhlbCwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0Q2xhc3Nlc0Zyb21TdHJpbmcoZWwsIGNsYXNzU3RyaW5nKSB7XG4gIGxldCBzcGxpdCA9IChjbGFzc1N0cmluZzIpID0+IGNsYXNzU3RyaW5nMi5zcGxpdChcIiBcIikuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgbWlzc2luZ0NsYXNzZXMgPSAoY2xhc3NTdHJpbmcyKSA9PiBjbGFzc1N0cmluZzIuc3BsaXQoXCIgXCIpLmZpbHRlcigoaSkgPT4gIWVsLmNsYXNzTGlzdC5jb250YWlucyhpKSkuZmlsdGVyKEJvb2xlYW4pO1xuICBsZXQgYWRkQ2xhc3Nlc0FuZFJldHVyblVuZG8gPSAoY2xhc3NlcykgPT4ge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlcyk7XG4gICAgfTtcbiAgfTtcbiAgY2xhc3NTdHJpbmcgPSBjbGFzc1N0cmluZyA9PT0gdHJ1ZSA/IGNsYXNzU3RyaW5nID0gXCJcIiA6IGNsYXNzU3RyaW5nIHx8IFwiXCI7XG4gIHJldHVybiBhZGRDbGFzc2VzQW5kUmV0dXJuVW5kbyhtaXNzaW5nQ2xhc3NlcyhjbGFzc1N0cmluZykpO1xufVxuZnVuY3Rpb24gc2V0Q2xhc3Nlc0Zyb21PYmplY3QoZWwsIGNsYXNzT2JqZWN0KSB7XG4gIGxldCBzcGxpdCA9IChjbGFzc1N0cmluZykgPT4gY2xhc3NTdHJpbmcuc3BsaXQoXCIgXCIpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGZvckFkZCA9IE9iamVjdC5lbnRyaWVzKGNsYXNzT2JqZWN0KS5mbGF0TWFwKChbY2xhc3NTdHJpbmcsIGJvb2xdKSA9PiBib29sID8gc3BsaXQoY2xhc3NTdHJpbmcpIDogZmFsc2UpLmZpbHRlcihCb29sZWFuKTtcbiAgbGV0IGZvclJlbW92ZSA9IE9iamVjdC5lbnRyaWVzKGNsYXNzT2JqZWN0KS5mbGF0TWFwKChbY2xhc3NTdHJpbmcsIGJvb2xdKSA9PiAhYm9vbCA/IHNwbGl0KGNsYXNzU3RyaW5nKSA6IGZhbHNlKS5maWx0ZXIoQm9vbGVhbik7XG4gIGxldCBhZGRlZCA9IFtdO1xuICBsZXQgcmVtb3ZlZCA9IFtdO1xuICBmb3JSZW1vdmUuZm9yRWFjaCgoaSkgPT4ge1xuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoaSkpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoaSk7XG4gICAgICByZW1vdmVkLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgZm9yQWRkLmZvckVhY2goKGkpID0+IHtcbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucyhpKSkge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChpKTtcbiAgICAgIGFkZGVkLnB1c2goaSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuICgpID0+IHtcbiAgICByZW1vdmVkLmZvckVhY2goKGkpID0+IGVsLmNsYXNzTGlzdC5hZGQoaSkpO1xuICAgIGFkZGVkLmZvckVhY2goKGkpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoaSkpO1xuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvc3R5bGVzLmpzXG5mdW5jdGlvbiBzZXRTdHlsZXMoZWwsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2V0U3R5bGVzRnJvbU9iamVjdChlbCwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBzZXRTdHlsZXNGcm9tU3RyaW5nKGVsLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBzZXRTdHlsZXNGcm9tT2JqZWN0KGVsLCB2YWx1ZSkge1xuICBsZXQgcHJldmlvdXNTdHlsZXMgPSB7fTtcbiAgT2JqZWN0LmVudHJpZXModmFsdWUpLmZvckVhY2goKFtrZXksIHZhbHVlMl0pID0+IHtcbiAgICBwcmV2aW91c1N0eWxlc1trZXldID0gZWwuc3R5bGVba2V5XTtcbiAgICBpZiAoIWtleS5zdGFydHNXaXRoKFwiLS1cIikpIHtcbiAgICAgIGtleSA9IGtlYmFiQ2FzZShrZXkpO1xuICAgIH1cbiAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlMik7XG4gIH0pO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAoZWwuc3R5bGUubGVuZ3RoID09PSAwKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHNldFN0eWxlcyhlbCwgcHJldmlvdXNTdHlsZXMpO1xuICB9O1xufVxuZnVuY3Rpb24gc2V0U3R5bGVzRnJvbVN0cmluZyhlbCwgdmFsdWUpIHtcbiAgbGV0IGNhY2hlID0gZWwuZ2V0QXR0cmlidXRlKFwic3R5bGVcIiwgdmFsdWUpO1xuICBlbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCB2YWx1ZSk7XG4gIHJldHVybiAoKSA9PiB7XG4gICAgZWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgY2FjaGUgfHwgXCJcIik7XG4gIH07XG59XG5mdW5jdGlvbiBrZWJhYkNhc2Uoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBcIiQxLSQyXCIpLnRvTG93ZXJDYXNlKCk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy91dGlscy9vbmNlLmpzXG5mdW5jdGlvbiBvbmNlKGNhbGxiYWNrLCBmYWxsYmFjayA9ICgpID0+IHtcbn0pIHtcbiAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFjYWxsZWQpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmYWxsYmFjay5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC10cmFuc2l0aW9uLmpzXG5kaXJlY3RpdmUoXCJ0cmFuc2l0aW9uXCIsIChlbCwge3ZhbHVlLCBtb2RpZmllcnMsIGV4cHJlc3Npb259LCB7ZXZhbHVhdGU6IGV2YWx1YXRlMn0pID0+IHtcbiAgaWYgKHR5cGVvZiBleHByZXNzaW9uID09PSBcImZ1bmN0aW9uXCIpXG4gICAgZXhwcmVzc2lvbiA9IGV2YWx1YXRlMihleHByZXNzaW9uKTtcbiAgaWYgKCFleHByZXNzaW9uKSB7XG4gICAgcmVnaXN0ZXJUcmFuc2l0aW9uc0Zyb21IZWxwZXIoZWwsIG1vZGlmaWVycywgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHJlZ2lzdGVyVHJhbnNpdGlvbnNGcm9tQ2xhc3NTdHJpbmcoZWwsIGV4cHJlc3Npb24sIHZhbHVlKTtcbiAgfVxufSk7XG5mdW5jdGlvbiByZWdpc3RlclRyYW5zaXRpb25zRnJvbUNsYXNzU3RyaW5nKGVsLCBjbGFzc1N0cmluZywgc3RhZ2UpIHtcbiAgcmVnaXN0ZXJUcmFuc2l0aW9uT2JqZWN0KGVsLCBzZXRDbGFzc2VzLCBcIlwiKTtcbiAgbGV0IGRpcmVjdGl2ZVN0b3JhZ2VNYXAgPSB7XG4gICAgZW50ZXI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLmR1cmluZyA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBcImVudGVyLXN0YXJ0XCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLnN0YXJ0ID0gY2xhc3NlcztcbiAgICB9LFxuICAgIFwiZW50ZXItZW5kXCI6IChjbGFzc2VzKSA9PiB7XG4gICAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLmVuZCA9IGNsYXNzZXM7XG4gICAgfSxcbiAgICBsZWF2ZTogKGNsYXNzZXMpID0+IHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24ubGVhdmUuZHVyaW5nID0gY2xhc3NlcztcbiAgICB9LFxuICAgIFwibGVhdmUtc3RhcnRcIjogKGNsYXNzZXMpID0+IHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24ubGVhdmUuc3RhcnQgPSBjbGFzc2VzO1xuICAgIH0sXG4gICAgXCJsZWF2ZS1lbmRcIjogKGNsYXNzZXMpID0+IHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24ubGVhdmUuZW5kID0gY2xhc3NlcztcbiAgICB9XG4gIH07XG4gIGRpcmVjdGl2ZVN0b3JhZ2VNYXBbc3RhZ2VdKGNsYXNzU3RyaW5nKTtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyVHJhbnNpdGlvbnNGcm9tSGVscGVyKGVsLCBtb2RpZmllcnMsIHN0YWdlKSB7XG4gIHJlZ2lzdGVyVHJhbnNpdGlvbk9iamVjdChlbCwgc2V0U3R5bGVzKTtcbiAgbGV0IGRvZXNudFNwZWNpZnkgPSAhbW9kaWZpZXJzLmluY2x1ZGVzKFwiaW5cIikgJiYgIW1vZGlmaWVycy5pbmNsdWRlcyhcIm91dFwiKSAmJiAhc3RhZ2U7XG4gIGxldCB0cmFuc2l0aW9uaW5nSW4gPSBkb2VzbnRTcGVjaWZ5IHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcImluXCIpIHx8IFtcImVudGVyXCJdLmluY2x1ZGVzKHN0YWdlKTtcbiAgbGV0IHRyYW5zaXRpb25pbmdPdXQgPSBkb2VzbnRTcGVjaWZ5IHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcIm91dFwiKSB8fCBbXCJsZWF2ZVwiXS5pbmNsdWRlcyhzdGFnZSk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJpblwiKSAmJiAhZG9lc250U3BlY2lmeSkge1xuICAgIG1vZGlmaWVycyA9IG1vZGlmaWVycy5maWx0ZXIoKGksIGluZGV4KSA9PiBpbmRleCA8IG1vZGlmaWVycy5pbmRleE9mKFwib3V0XCIpKTtcbiAgfVxuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwib3V0XCIpICYmICFkb2VzbnRTcGVjaWZ5KSB7XG4gICAgbW9kaWZpZXJzID0gbW9kaWZpZXJzLmZpbHRlcigoaSwgaW5kZXgpID0+IGluZGV4ID4gbW9kaWZpZXJzLmluZGV4T2YoXCJvdXRcIikpO1xuICB9XG4gIGxldCB3YW50c0FsbCA9ICFtb2RpZmllcnMuaW5jbHVkZXMoXCJvcGFjaXR5XCIpICYmICFtb2RpZmllcnMuaW5jbHVkZXMoXCJzY2FsZVwiKTtcbiAgbGV0IHdhbnRzT3BhY2l0eSA9IHdhbnRzQWxsIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcIm9wYWNpdHlcIik7XG4gIGxldCB3YW50c1NjYWxlID0gd2FudHNBbGwgfHwgbW9kaWZpZXJzLmluY2x1ZGVzKFwic2NhbGVcIik7XG4gIGxldCBvcGFjaXR5VmFsdWUgPSB3YW50c09wYWNpdHkgPyAwIDogMTtcbiAgbGV0IHNjYWxlVmFsdWUgPSB3YW50c1NjYWxlID8gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsIFwic2NhbGVcIiwgOTUpIC8gMTAwIDogMTtcbiAgbGV0IGRlbGF5ID0gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsIFwiZGVsYXlcIiwgMCk7XG4gIGxldCBvcmlnaW4gPSBtb2RpZmllclZhbHVlKG1vZGlmaWVycywgXCJvcmlnaW5cIiwgXCJjZW50ZXJcIik7XG4gIGxldCBwcm9wZXJ0eSA9IFwib3BhY2l0eSwgdHJhbnNmb3JtXCI7XG4gIGxldCBkdXJhdGlvbkluID0gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsIFwiZHVyYXRpb25cIiwgMTUwKSAvIDFlMztcbiAgbGV0IGR1cmF0aW9uT3V0ID0gbW9kaWZpZXJWYWx1ZShtb2RpZmllcnMsIFwiZHVyYXRpb25cIiwgNzUpIC8gMWUzO1xuICBsZXQgZWFzaW5nID0gYGN1YmljLWJlemllcigwLjQsIDAuMCwgMC4yLCAxKWA7XG4gIGlmICh0cmFuc2l0aW9uaW5nSW4pIHtcbiAgICBlbC5feF90cmFuc2l0aW9uLmVudGVyLmR1cmluZyA9IHtcbiAgICAgIHRyYW5zZm9ybU9yaWdpbjogb3JpZ2luLFxuICAgICAgdHJhbnNpdGlvbkRlbGF5OiBkZWxheSxcbiAgICAgIHRyYW5zaXRpb25Qcm9wZXJ0eTogcHJvcGVydHksXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IGAke2R1cmF0aW9uSW59c2AsXG4gICAgICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246IGVhc2luZ1xuICAgIH07XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5zdGFydCA9IHtcbiAgICAgIG9wYWNpdHk6IG9wYWNpdHlWYWx1ZSxcbiAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7c2NhbGVWYWx1ZX0pYFxuICAgIH07XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5lbmQgPSB7XG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoMSlgXG4gICAgfTtcbiAgfVxuICBpZiAodHJhbnNpdGlvbmluZ091dCkge1xuICAgIGVsLl94X3RyYW5zaXRpb24ubGVhdmUuZHVyaW5nID0ge1xuICAgICAgdHJhbnNmb3JtT3JpZ2luOiBvcmlnaW4sXG4gICAgICB0cmFuc2l0aW9uRGVsYXk6IGRlbGF5LFxuICAgICAgdHJhbnNpdGlvblByb3BlcnR5OiBwcm9wZXJ0eSxcbiAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogYCR7ZHVyYXRpb25PdXR9c2AsXG4gICAgICB0cmFuc2l0aW9uVGltaW5nRnVuY3Rpb246IGVhc2luZ1xuICAgIH07XG4gICAgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZS5zdGFydCA9IHtcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICB0cmFuc2Zvcm06IGBzY2FsZSgxKWBcbiAgICB9O1xuICAgIGVsLl94X3RyYW5zaXRpb24ubGVhdmUuZW5kID0ge1xuICAgICAgb3BhY2l0eTogb3BhY2l0eVZhbHVlLFxuICAgICAgdHJhbnNmb3JtOiBgc2NhbGUoJHtzY2FsZVZhbHVlfSlgXG4gICAgfTtcbiAgfVxufVxuZnVuY3Rpb24gcmVnaXN0ZXJUcmFuc2l0aW9uT2JqZWN0KGVsLCBzZXRGdW5jdGlvbiwgZGVmYXVsdFZhbHVlID0ge30pIHtcbiAgaWYgKCFlbC5feF90cmFuc2l0aW9uKVxuICAgIGVsLl94X3RyYW5zaXRpb24gPSB7XG4gICAgICBlbnRlcjoge2R1cmluZzogZGVmYXVsdFZhbHVlLCBzdGFydDogZGVmYXVsdFZhbHVlLCBlbmQ6IGRlZmF1bHRWYWx1ZX0sXG4gICAgICBsZWF2ZToge2R1cmluZzogZGVmYXVsdFZhbHVlLCBzdGFydDogZGVmYXVsdFZhbHVlLCBlbmQ6IGRlZmF1bHRWYWx1ZX0sXG4gICAgICBpbihiZWZvcmUgPSAoKSA9PiB7XG4gICAgICB9LCBhZnRlciA9ICgpID0+IHtcbiAgICAgIH0pIHtcbiAgICAgICAgdHJhbnNpdGlvbihlbCwgc2V0RnVuY3Rpb24sIHtcbiAgICAgICAgICBkdXJpbmc6IHRoaXMuZW50ZXIuZHVyaW5nLFxuICAgICAgICAgIHN0YXJ0OiB0aGlzLmVudGVyLnN0YXJ0LFxuICAgICAgICAgIGVuZDogdGhpcy5lbnRlci5lbmRcbiAgICAgICAgfSwgYmVmb3JlLCBhZnRlcik7XG4gICAgICB9LFxuICAgICAgb3V0KGJlZm9yZSA9ICgpID0+IHtcbiAgICAgIH0sIGFmdGVyID0gKCkgPT4ge1xuICAgICAgfSkge1xuICAgICAgICB0cmFuc2l0aW9uKGVsLCBzZXRGdW5jdGlvbiwge1xuICAgICAgICAgIGR1cmluZzogdGhpcy5sZWF2ZS5kdXJpbmcsXG4gICAgICAgICAgc3RhcnQ6IHRoaXMubGVhdmUuc3RhcnQsXG4gICAgICAgICAgZW5kOiB0aGlzLmxlYXZlLmVuZFxuICAgICAgICB9LCBiZWZvcmUsIGFmdGVyKTtcbiAgICAgIH1cbiAgICB9O1xufVxud2luZG93LkVsZW1lbnQucHJvdG90eXBlLl94X3RvZ2dsZUFuZENhc2NhZGVXaXRoVHJhbnNpdGlvbnMgPSBmdW5jdGlvbihlbCwgdmFsdWUsIHNob3csIGhpZGUpIHtcbiAgY29uc3QgbmV4dFRpY2syID0gZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSBcInZpc2libGVcIiA/IHJlcXVlc3RBbmltYXRpb25GcmFtZSA6IHNldFRpbWVvdXQ7XG4gIGxldCBjbGlja0F3YXlDb21wYXRpYmxlU2hvdyA9ICgpID0+IG5leHRUaWNrMihzaG93KTtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKGVsLl94X3RyYW5zaXRpb24gJiYgKGVsLl94X3RyYW5zaXRpb24uZW50ZXIgfHwgZWwuX3hfdHJhbnNpdGlvbi5sZWF2ZSkpIHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24uZW50ZXIgJiYgKE9iamVjdC5lbnRyaWVzKGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZHVyaW5nKS5sZW5ndGggfHwgT2JqZWN0LmVudHJpZXMoZWwuX3hfdHJhbnNpdGlvbi5lbnRlci5zdGFydCkubGVuZ3RoIHx8IE9iamVjdC5lbnRyaWVzKGVsLl94X3RyYW5zaXRpb24uZW50ZXIuZW5kKS5sZW5ndGgpID8gZWwuX3hfdHJhbnNpdGlvbi5pbihzaG93KSA6IGNsaWNrQXdheUNvbXBhdGlibGVTaG93KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLl94X3RyYW5zaXRpb24gPyBlbC5feF90cmFuc2l0aW9uLmluKHNob3cpIDogY2xpY2tBd2F5Q29tcGF0aWJsZVNob3coKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsLl94X2hpZGVQcm9taXNlID0gZWwuX3hfdHJhbnNpdGlvbiA/IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBlbC5feF90cmFuc2l0aW9uLm91dCgoKSA9PiB7XG4gICAgfSwgKCkgPT4gcmVzb2x2ZShoaWRlKSk7XG4gICAgZWwuX3hfdHJhbnNpdGlvbmluZy5iZWZvcmVDYW5jZWwoKCkgPT4gcmVqZWN0KHtpc0Zyb21DYW5jZWxsZWRUcmFuc2l0aW9uOiB0cnVlfSkpO1xuICB9KSA6IFByb21pc2UucmVzb2x2ZShoaWRlKTtcbiAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgIGxldCBjbG9zZXN0ID0gY2xvc2VzdEhpZGUoZWwpO1xuICAgIGlmIChjbG9zZXN0KSB7XG4gICAgICBpZiAoIWNsb3Nlc3QuX3hfaGlkZUNoaWxkcmVuKVxuICAgICAgICBjbG9zZXN0Ll94X2hpZGVDaGlsZHJlbiA9IFtdO1xuICAgICAgY2xvc2VzdC5feF9oaWRlQ2hpbGRyZW4ucHVzaChlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRUaWNrMigoKSA9PiB7XG4gICAgICAgIGxldCBoaWRlQWZ0ZXJDaGlsZHJlbiA9IChlbDIpID0+IHtcbiAgICAgICAgICBsZXQgY2FycnkgPSBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBlbDIuX3hfaGlkZVByb21pc2UsXG4gICAgICAgICAgICAuLi4oZWwyLl94X2hpZGVDaGlsZHJlbiB8fCBbXSkubWFwKGhpZGVBZnRlckNoaWxkcmVuKVxuICAgICAgICAgIF0pLnRoZW4oKFtpXSkgPT4gaSgpKTtcbiAgICAgICAgICBkZWxldGUgZWwyLl94X2hpZGVQcm9taXNlO1xuICAgICAgICAgIGRlbGV0ZSBlbDIuX3hfaGlkZUNoaWxkcmVuO1xuICAgICAgICAgIHJldHVybiBjYXJyeTtcbiAgICAgICAgfTtcbiAgICAgICAgaGlkZUFmdGVyQ2hpbGRyZW4oZWwpLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgaWYgKCFlLmlzRnJvbUNhbmNlbGxlZFRyYW5zaXRpb24pXG4gICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59O1xuZnVuY3Rpb24gY2xvc2VzdEhpZGUoZWwpIHtcbiAgbGV0IHBhcmVudCA9IGVsLnBhcmVudE5vZGU7XG4gIGlmICghcGFyZW50KVxuICAgIHJldHVybjtcbiAgcmV0dXJuIHBhcmVudC5feF9oaWRlUHJvbWlzZSA/IHBhcmVudCA6IGNsb3Nlc3RIaWRlKHBhcmVudCk7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uKGVsLCBzZXRGdW5jdGlvbiwge2R1cmluZywgc3RhcnQ6IHN0YXJ0MiwgZW5kfSA9IHt9LCBiZWZvcmUgPSAoKSA9PiB7XG59LCBhZnRlciA9ICgpID0+IHtcbn0pIHtcbiAgaWYgKGVsLl94X3RyYW5zaXRpb25pbmcpXG4gICAgZWwuX3hfdHJhbnNpdGlvbmluZy5jYW5jZWwoKTtcbiAgaWYgKE9iamVjdC5rZXlzKGR1cmluZykubGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKHN0YXJ0MikubGVuZ3RoID09PSAwICYmIE9iamVjdC5rZXlzKGVuZCkubGVuZ3RoID09PSAwKSB7XG4gICAgYmVmb3JlKCk7XG4gICAgYWZ0ZXIoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IHVuZG9TdGFydCwgdW5kb0R1cmluZywgdW5kb0VuZDtcbiAgcGVyZm9ybVRyYW5zaXRpb24oZWwsIHtcbiAgICBzdGFydCgpIHtcbiAgICAgIHVuZG9TdGFydCA9IHNldEZ1bmN0aW9uKGVsLCBzdGFydDIpO1xuICAgIH0sXG4gICAgZHVyaW5nKCkge1xuICAgICAgdW5kb0R1cmluZyA9IHNldEZ1bmN0aW9uKGVsLCBkdXJpbmcpO1xuICAgIH0sXG4gICAgYmVmb3JlLFxuICAgIGVuZCgpIHtcbiAgICAgIHVuZG9TdGFydCgpO1xuICAgICAgdW5kb0VuZCA9IHNldEZ1bmN0aW9uKGVsLCBlbmQpO1xuICAgIH0sXG4gICAgYWZ0ZXIsXG4gICAgY2xlYW51cCgpIHtcbiAgICAgIHVuZG9EdXJpbmcoKTtcbiAgICAgIHVuZG9FbmQoKTtcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gcGVyZm9ybVRyYW5zaXRpb24oZWwsIHN0YWdlcykge1xuICBsZXQgaW50ZXJydXB0ZWQsIHJlYWNoZWRCZWZvcmUsIHJlYWNoZWRFbmQ7XG4gIGxldCBmaW5pc2ggPSBvbmNlKCgpID0+IHtcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgaW50ZXJydXB0ZWQgPSB0cnVlO1xuICAgICAgaWYgKCFyZWFjaGVkQmVmb3JlKVxuICAgICAgICBzdGFnZXMuYmVmb3JlKCk7XG4gICAgICBpZiAoIXJlYWNoZWRFbmQpIHtcbiAgICAgICAgc3RhZ2VzLmVuZCgpO1xuICAgICAgICByZWxlYXNlTmV4dFRpY2tzKCk7XG4gICAgICB9XG4gICAgICBzdGFnZXMuYWZ0ZXIoKTtcbiAgICAgIGlmIChlbC5pc0Nvbm5lY3RlZClcbiAgICAgICAgc3RhZ2VzLmNsZWFudXAoKTtcbiAgICAgIGRlbGV0ZSBlbC5feF90cmFuc2l0aW9uaW5nO1xuICAgIH0pO1xuICB9KTtcbiAgZWwuX3hfdHJhbnNpdGlvbmluZyA9IHtcbiAgICBiZWZvcmVDYW5jZWxzOiBbXSxcbiAgICBiZWZvcmVDYW5jZWwoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuYmVmb3JlQ2FuY2Vscy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9LFxuICAgIGNhbmNlbDogb25jZShmdW5jdGlvbigpIHtcbiAgICAgIHdoaWxlICh0aGlzLmJlZm9yZUNhbmNlbHMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuYmVmb3JlQ2FuY2Vscy5zaGlmdCgpKCk7XG4gICAgICB9XG4gICAgICA7XG4gICAgICBmaW5pc2goKTtcbiAgICB9KSxcbiAgICBmaW5pc2hcbiAgfTtcbiAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICBzdGFnZXMuc3RhcnQoKTtcbiAgICBzdGFnZXMuZHVyaW5nKCk7XG4gIH0pO1xuICBob2xkTmV4dFRpY2tzKCk7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgaWYgKGludGVycnVwdGVkKVxuICAgICAgcmV0dXJuO1xuICAgIGxldCBkdXJhdGlvbiA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRHVyYXRpb24ucmVwbGFjZSgvLC4qLywgXCJcIikucmVwbGFjZShcInNcIiwgXCJcIikpICogMWUzO1xuICAgIGxldCBkZWxheSA9IE51bWJlcihnZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRGVsYXkucmVwbGFjZSgvLC4qLywgXCJcIikucmVwbGFjZShcInNcIiwgXCJcIikpICogMWUzO1xuICAgIGlmIChkdXJhdGlvbiA9PT0gMClcbiAgICAgIGR1cmF0aW9uID0gTnVtYmVyKGdldENvbXB1dGVkU3R5bGUoZWwpLmFuaW1hdGlvbkR1cmF0aW9uLnJlcGxhY2UoXCJzXCIsIFwiXCIpKSAqIDFlMztcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgc3RhZ2VzLmJlZm9yZSgpO1xuICAgIH0pO1xuICAgIHJlYWNoZWRCZWZvcmUgPSB0cnVlO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAoaW50ZXJydXB0ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICAgIHN0YWdlcy5lbmQoKTtcbiAgICAgIH0pO1xuICAgICAgcmVsZWFzZU5leHRUaWNrcygpO1xuICAgICAgc2V0VGltZW91dChlbC5feF90cmFuc2l0aW9uaW5nLmZpbmlzaCwgZHVyYXRpb24gKyBkZWxheSk7XG4gICAgICByZWFjaGVkRW5kID0gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG59XG5mdW5jdGlvbiBtb2RpZmllclZhbHVlKG1vZGlmaWVycywga2V5LCBmYWxsYmFjaykge1xuICBpZiAobW9kaWZpZXJzLmluZGV4T2Yoa2V5KSA9PT0gLTEpXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICBjb25zdCByYXdWYWx1ZSA9IG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMV07XG4gIGlmICghcmF3VmFsdWUpXG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICBpZiAoa2V5ID09PSBcInNjYWxlXCIpIHtcbiAgICBpZiAoaXNOYU4ocmF3VmFsdWUpKVxuICAgICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG4gIGlmIChrZXkgPT09IFwiZHVyYXRpb25cIikge1xuICAgIGxldCBtYXRjaCA9IHJhd1ZhbHVlLm1hdGNoKC8oWzAtOV0rKW1zLyk7XG4gICAgaWYgKG1hdGNoKVxuICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICB9XG4gIGlmIChrZXkgPT09IFwib3JpZ2luXCIpIHtcbiAgICBpZiAoW1widG9wXCIsIFwicmlnaHRcIiwgXCJsZWZ0XCIsIFwiY2VudGVyXCIsIFwiYm90dG9tXCJdLmluY2x1ZGVzKG1vZGlmaWVyc1ttb2RpZmllcnMuaW5kZXhPZihrZXkpICsgMl0pKSB7XG4gICAgICByZXR1cm4gW3Jhd1ZhbHVlLCBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2Yoa2V5KSArIDJdXS5qb2luKFwiIFwiKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJhd1ZhbHVlO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvY2xvbmUuanNcbnZhciBpc0Nsb25pbmcgPSBmYWxzZTtcbmZ1bmN0aW9uIHNraXBEdXJpbmdDbG9uZShjYWxsYmFjaywgZmFsbGJhY2sgPSAoKSA9PiB7XG59KSB7XG4gIHJldHVybiAoLi4uYXJncykgPT4gaXNDbG9uaW5nID8gZmFsbGJhY2soLi4uYXJncykgOiBjYWxsYmFjayguLi5hcmdzKTtcbn1cbmZ1bmN0aW9uIGNsb25lKG9sZEVsLCBuZXdFbCkge1xuICBpZiAoIW5ld0VsLl94X2RhdGFTdGFjaylcbiAgICBuZXdFbC5feF9kYXRhU3RhY2sgPSBvbGRFbC5feF9kYXRhU3RhY2s7XG4gIGlzQ2xvbmluZyA9IHRydWU7XG4gIGRvbnRSZWdpc3RlclJlYWN0aXZlU2lkZUVmZmVjdHMoKCkgPT4ge1xuICAgIGNsb25lVHJlZShuZXdFbCk7XG4gIH0pO1xuICBpc0Nsb25pbmcgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNsb25lVHJlZShlbCkge1xuICBsZXQgaGFzUnVuVGhyb3VnaEZpcnN0RWwgPSBmYWxzZTtcbiAgbGV0IHNoYWxsb3dXYWxrZXIgPSAoZWwyLCBjYWxsYmFjaykgPT4ge1xuICAgIHdhbGsoZWwyLCAoZWwzLCBza2lwKSA9PiB7XG4gICAgICBpZiAoaGFzUnVuVGhyb3VnaEZpcnN0RWwgJiYgaXNSb290KGVsMykpXG4gICAgICAgIHJldHVybiBza2lwKCk7XG4gICAgICBoYXNSdW5UaHJvdWdoRmlyc3RFbCA9IHRydWU7XG4gICAgICBjYWxsYmFjayhlbDMsIHNraXApO1xuICAgIH0pO1xuICB9O1xuICBpbml0VHJlZShlbCwgc2hhbGxvd1dhbGtlcik7XG59XG5mdW5jdGlvbiBkb250UmVnaXN0ZXJSZWFjdGl2ZVNpZGVFZmZlY3RzKGNhbGxiYWNrKSB7XG4gIGxldCBjYWNoZSA9IGVmZmVjdDtcbiAgb3ZlcnJpZGVFZmZlY3QoKGNhbGxiYWNrMiwgZWwpID0+IHtcbiAgICBsZXQgc3RvcmVkRWZmZWN0ID0gY2FjaGUoY2FsbGJhY2syKTtcbiAgICByZWxlYXNlKHN0b3JlZEVmZmVjdCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICB9O1xuICB9KTtcbiAgY2FsbGJhY2soKTtcbiAgb3ZlcnJpZGVFZmZlY3QoY2FjaGUpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvYmluZC5qc1xuZnVuY3Rpb24gYmluZChlbCwgbmFtZSwgdmFsdWUsIG1vZGlmaWVycyA9IFtdKSB7XG4gIGlmICghZWwuX3hfYmluZGluZ3MpXG4gICAgZWwuX3hfYmluZGluZ3MgPSByZWFjdGl2ZSh7fSk7XG4gIGVsLl94X2JpbmRpbmdzW25hbWVdID0gdmFsdWU7XG4gIG5hbWUgPSBtb2RpZmllcnMuaW5jbHVkZXMoXCJjYW1lbFwiKSA/IGNhbWVsQ2FzZShuYW1lKSA6IG5hbWU7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgXCJ2YWx1ZVwiOlxuICAgICAgYmluZElucHV0VmFsdWUoZWwsIHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzdHlsZVwiOlxuICAgICAgYmluZFN0eWxlcyhlbCwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImNsYXNzXCI6XG4gICAgICBiaW5kQ2xhc3NlcyhlbCwgdmFsdWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGJpbmRBdHRyaWJ1dGUoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5mdW5jdGlvbiBiaW5kSW5wdXRWYWx1ZShlbCwgdmFsdWUpIHtcbiAgaWYgKGVsLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgIGlmIChlbC5hdHRyaWJ1dGVzLnZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgIGVsLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGlmICh3aW5kb3cuZnJvbU1vZGVsKSB7XG4gICAgICBlbC5jaGVja2VkID0gY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUoZWwudmFsdWUsIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgaWYgKE51bWJlci5pc0ludGVnZXIodmFsdWUpKSB7XG4gICAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICAgIH0gZWxzZSBpZiAoIU51bWJlci5pc0ludGVnZXIodmFsdWUpICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgIT09IFwiYm9vbGVhblwiICYmICFbbnVsbCwgdm9pZCAwXS5pbmNsdWRlcyh2YWx1ZSkpIHtcbiAgICAgIGVsLnZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSB2YWx1ZS5zb21lKCh2YWwpID0+IGNoZWNrZWRBdHRyTG9vc2VDb21wYXJlKHZhbCwgZWwudmFsdWUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNoZWNrZWQgPSAhIXZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChlbC50YWdOYW1lID09PSBcIlNFTEVDVFwiKSB7XG4gICAgdXBkYXRlU2VsZWN0KGVsLCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGVsLnZhbHVlID09PSB2YWx1ZSlcbiAgICAgIHJldHVybjtcbiAgICBlbC52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5mdW5jdGlvbiBiaW5kQ2xhc3NlcyhlbCwgdmFsdWUpIHtcbiAgaWYgKGVsLl94X3VuZG9BZGRlZENsYXNzZXMpXG4gICAgZWwuX3hfdW5kb0FkZGVkQ2xhc3NlcygpO1xuICBlbC5feF91bmRvQWRkZWRDbGFzc2VzID0gc2V0Q2xhc3NlcyhlbCwgdmFsdWUpO1xufVxuZnVuY3Rpb24gYmluZFN0eWxlcyhlbCwgdmFsdWUpIHtcbiAgaWYgKGVsLl94X3VuZG9BZGRlZFN0eWxlcylcbiAgICBlbC5feF91bmRvQWRkZWRTdHlsZXMoKTtcbiAgZWwuX3hfdW5kb0FkZGVkU3R5bGVzID0gc2V0U3R5bGVzKGVsLCB2YWx1ZSk7XG59XG5mdW5jdGlvbiBiaW5kQXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSkge1xuICBpZiAoW251bGwsIHZvaWQgMCwgZmFsc2VdLmluY2x1ZGVzKHZhbHVlKSAmJiBhdHRyaWJ1dGVTaG91bGRudEJlUHJlc2VydmVkSWZGYWxzeShuYW1lKSkge1xuICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNCb29sZWFuQXR0cihuYW1lKSlcbiAgICAgIHZhbHVlID0gbmFtZTtcbiAgICBzZXRJZkNoYW5nZWQoZWwsIG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuZnVuY3Rpb24gc2V0SWZDaGFuZ2VkKGVsLCBhdHRyTmFtZSwgdmFsdWUpIHtcbiAgaWYgKGVsLmdldEF0dHJpYnV0ZShhdHRyTmFtZSkgIT0gdmFsdWUpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIHZhbHVlKTtcbiAgfVxufVxuZnVuY3Rpb24gdXBkYXRlU2VsZWN0KGVsLCB2YWx1ZSkge1xuICBjb25zdCBhcnJheVdyYXBwZWRWYWx1ZSA9IFtdLmNvbmNhdCh2YWx1ZSkubWFwKCh2YWx1ZTIpID0+IHtcbiAgICByZXR1cm4gdmFsdWUyICsgXCJcIjtcbiAgfSk7XG4gIEFycmF5LmZyb20oZWwub3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgb3B0aW9uLnNlbGVjdGVkID0gYXJyYXlXcmFwcGVkVmFsdWUuaW5jbHVkZXMob3B0aW9uLnZhbHVlKTtcbiAgfSk7XG59XG5mdW5jdGlvbiBjYW1lbENhc2Uoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLy0oXFx3KS9nLCAobWF0Y2gsIGNoYXIpID0+IGNoYXIudG9VcHBlckNhc2UoKSk7XG59XG5mdW5jdGlvbiBjaGVja2VkQXR0ckxvb3NlQ29tcGFyZSh2YWx1ZUEsIHZhbHVlQikge1xuICByZXR1cm4gdmFsdWVBID09IHZhbHVlQjtcbn1cbmZ1bmN0aW9uIGlzQm9vbGVhbkF0dHIoYXR0ck5hbWUpIHtcbiAgY29uc3QgYm9vbGVhbkF0dHJpYnV0ZXMgPSBbXG4gICAgXCJkaXNhYmxlZFwiLFxuICAgIFwiY2hlY2tlZFwiLFxuICAgIFwicmVxdWlyZWRcIixcbiAgICBcInJlYWRvbmx5XCIsXG4gICAgXCJoaWRkZW5cIixcbiAgICBcIm9wZW5cIixcbiAgICBcInNlbGVjdGVkXCIsXG4gICAgXCJhdXRvZm9jdXNcIixcbiAgICBcIml0ZW1zY29wZVwiLFxuICAgIFwibXVsdGlwbGVcIixcbiAgICBcIm5vdmFsaWRhdGVcIixcbiAgICBcImFsbG93ZnVsbHNjcmVlblwiLFxuICAgIFwiYWxsb3dwYXltZW50cmVxdWVzdFwiLFxuICAgIFwiZm9ybW5vdmFsaWRhdGVcIixcbiAgICBcImF1dG9wbGF5XCIsXG4gICAgXCJjb250cm9sc1wiLFxuICAgIFwibG9vcFwiLFxuICAgIFwibXV0ZWRcIixcbiAgICBcInBsYXlzaW5saW5lXCIsXG4gICAgXCJkZWZhdWx0XCIsXG4gICAgXCJpc21hcFwiLFxuICAgIFwicmV2ZXJzZWRcIixcbiAgICBcImFzeW5jXCIsXG4gICAgXCJkZWZlclwiLFxuICAgIFwibm9tb2R1bGVcIlxuICBdO1xuICByZXR1cm4gYm9vbGVhbkF0dHJpYnV0ZXMuaW5jbHVkZXMoYXR0ck5hbWUpO1xufVxuZnVuY3Rpb24gYXR0cmlidXRlU2hvdWxkbnRCZVByZXNlcnZlZElmRmFsc3kobmFtZSkge1xuICByZXR1cm4gIVtcImFyaWEtcHJlc3NlZFwiLCBcImFyaWEtY2hlY2tlZFwiLCBcImFyaWEtZXhwYW5kZWRcIiwgXCJhcmlhLXNlbGVjdGVkXCJdLmluY2x1ZGVzKG5hbWUpO1xufVxuZnVuY3Rpb24gZ2V0QmluZGluZyhlbCwgbmFtZSwgZmFsbGJhY2spIHtcbiAgaWYgKGVsLl94X2JpbmRpbmdzICYmIGVsLl94X2JpbmRpbmdzW25hbWVdICE9PSB2b2lkIDApXG4gICAgcmV0dXJuIGVsLl94X2JpbmRpbmdzW25hbWVdO1xuICBsZXQgYXR0ciA9IGVsLmdldEF0dHJpYnV0ZShuYW1lKTtcbiAgaWYgKGF0dHIgPT09IG51bGwpXG4gICAgcmV0dXJuIHR5cGVvZiBmYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiID8gZmFsbGJhY2soKSA6IGZhbGxiYWNrO1xuICBpZiAoaXNCb29sZWFuQXR0cihuYW1lKSkge1xuICAgIHJldHVybiAhIVtuYW1lLCBcInRydWVcIl0uaW5jbHVkZXMoYXR0cik7XG4gIH1cbiAgaWYgKGF0dHIgPT09IFwiXCIpXG4gICAgcmV0dXJuIHRydWU7XG4gIHJldHVybiBhdHRyO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvZGVib3VuY2UuanNcbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcbiAgdmFyIHRpbWVvdXQ7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICB9O1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvdGhyb3R0bGUuanNcbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIGxpbWl0KSB7XG4gIGxldCBpblRocm90dGxlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgIGlmICghaW5UaHJvdHRsZSkge1xuICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGluVGhyb3R0bGUgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBpblRocm90dGxlID0gZmFsc2UsIGxpbWl0KTtcbiAgICB9XG4gIH07XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9wbHVnaW4uanNcbmZ1bmN0aW9uIHBsdWdpbihjYWxsYmFjaykge1xuICBjYWxsYmFjayhhbHBpbmVfZGVmYXVsdCk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9zdG9yZS5qc1xudmFyIHN0b3JlcyA9IHt9O1xudmFyIGlzUmVhY3RpdmUgPSBmYWxzZTtcbmZ1bmN0aW9uIHN0b3JlKG5hbWUsIHZhbHVlKSB7XG4gIGlmICghaXNSZWFjdGl2ZSkge1xuICAgIHN0b3JlcyA9IHJlYWN0aXZlKHN0b3Jlcyk7XG4gICAgaXNSZWFjdGl2ZSA9IHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09PSB2b2lkIDApIHtcbiAgICByZXR1cm4gc3RvcmVzW25hbWVdO1xuICB9XG4gIHN0b3Jlc1tuYW1lXSA9IHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlLmhhc093blByb3BlcnR5KFwiaW5pdFwiKSAmJiB0eXBlb2YgdmFsdWUuaW5pdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgc3RvcmVzW25hbWVdLmluaXQoKTtcbiAgfVxuICBpbml0SW50ZXJjZXB0b3JzKHN0b3Jlc1tuYW1lXSk7XG59XG5mdW5jdGlvbiBnZXRTdG9yZXMoKSB7XG4gIHJldHVybiBzdG9yZXM7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9iaW5kcy5qc1xudmFyIGJpbmRzID0ge307XG5mdW5jdGlvbiBiaW5kMihuYW1lLCBiaW5kaW5ncykge1xuICBsZXQgZ2V0QmluZGluZ3MgPSB0eXBlb2YgYmluZGluZ3MgIT09IFwiZnVuY3Rpb25cIiA/ICgpID0+IGJpbmRpbmdzIDogYmluZGluZ3M7XG4gIGlmIChuYW1lIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgIGFwcGx5QmluZGluZ3NPYmplY3QobmFtZSwgZ2V0QmluZGluZ3MoKSk7XG4gIH0gZWxzZSB7XG4gICAgYmluZHNbbmFtZV0gPSBnZXRCaW5kaW5ncztcbiAgfVxufVxuZnVuY3Rpb24gaW5qZWN0QmluZGluZ1Byb3ZpZGVycyhvYmopIHtcbiAgT2JqZWN0LmVudHJpZXMoYmluZHMpLmZvckVhY2goKFtuYW1lLCBjYWxsYmFja10pID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvYmo7XG59XG5mdW5jdGlvbiBhcHBseUJpbmRpbmdzT2JqZWN0KGVsLCBvYmosIG9yaWdpbmFsKSB7XG4gIGxldCBjbGVhbnVwUnVubmVycyA9IFtdO1xuICB3aGlsZSAoY2xlYW51cFJ1bm5lcnMubGVuZ3RoKVxuICAgIGNsZWFudXBSdW5uZXJzLnBvcCgpKCk7XG4gIGxldCBhdHRyaWJ1dGVzID0gT2JqZWN0LmVudHJpZXMob2JqKS5tYXAoKFtuYW1lLCB2YWx1ZV0pID0+ICh7bmFtZSwgdmFsdWV9KSk7XG4gIGxldCBzdGF0aWNBdHRyaWJ1dGVzID0gYXR0cmlidXRlc09ubHkoYXR0cmlidXRlcyk7XG4gIGF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzLm1hcCgoYXR0cmlidXRlKSA9PiB7XG4gICAgaWYgKHN0YXRpY0F0dHJpYnV0ZXMuZmluZCgoYXR0cikgPT4gYXR0ci5uYW1lID09PSBhdHRyaWJ1dGUubmFtZSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6IGB4LWJpbmQ6JHthdHRyaWJ1dGUubmFtZX1gLFxuICAgICAgICB2YWx1ZTogYFwiJHthdHRyaWJ1dGUudmFsdWV9XCJgXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gYXR0cmlidXRlO1xuICB9KTtcbiAgZGlyZWN0aXZlcyhlbCwgYXR0cmlidXRlcywgb3JpZ2luYWwpLm1hcCgoaGFuZGxlKSA9PiB7XG4gICAgY2xlYW51cFJ1bm5lcnMucHVzaChoYW5kbGUucnVuQ2xlYW51cHMpO1xuICAgIGhhbmRsZSgpO1xuICB9KTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RhdGFzLmpzXG52YXIgZGF0YXMgPSB7fTtcbmZ1bmN0aW9uIGRhdGEobmFtZSwgY2FsbGJhY2spIHtcbiAgZGF0YXNbbmFtZV0gPSBjYWxsYmFjaztcbn1cbmZ1bmN0aW9uIGluamVjdERhdGFQcm92aWRlcnMob2JqLCBjb250ZXh0KSB7XG4gIE9iamVjdC5lbnRyaWVzKGRhdGFzKS5mb3JFYWNoKChbbmFtZSwgY2FsbGJhY2tdKSA9PiB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2suYmluZChjb250ZXh0KSguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9iajtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2FscGluZS5qc1xudmFyIEFscGluZSA9IHtcbiAgZ2V0IHJlYWN0aXZlKCkge1xuICAgIHJldHVybiByZWFjdGl2ZTtcbiAgfSxcbiAgZ2V0IHJlbGVhc2UoKSB7XG4gICAgcmV0dXJuIHJlbGVhc2U7XG4gIH0sXG4gIGdldCBlZmZlY3QoKSB7XG4gICAgcmV0dXJuIGVmZmVjdDtcbiAgfSxcbiAgZ2V0IHJhdygpIHtcbiAgICByZXR1cm4gcmF3O1xuICB9LFxuICB2ZXJzaW9uOiBcIjMuMTAuM1wiLFxuICBmbHVzaEFuZFN0b3BEZWZlcnJpbmdNdXRhdGlvbnMsXG4gIGRvbnRBdXRvRXZhbHVhdGVGdW5jdGlvbnMsXG4gIGRpc2FibGVFZmZlY3RTY2hlZHVsaW5nLFxuICBzdG9wT2JzZXJ2aW5nTXV0YXRpb25zLFxuICBkZXN0cm95VHJlZSxcbiAgc2V0UmVhY3Rpdml0eUVuZ2luZSxcbiAgY2xvc2VzdERhdGFTdGFjayxcbiAgc2tpcER1cmluZ0Nsb25lLFxuICBhZGRSb290U2VsZWN0b3IsXG4gIGFkZEluaXRTZWxlY3RvcixcbiAgYWRkU2NvcGVUb05vZGUsXG4gIGRlZmVyTXV0YXRpb25zLFxuICBtYXBBdHRyaWJ1dGVzLFxuICBldmFsdWF0ZUxhdGVyLFxuICBzZXRFdmFsdWF0b3IsXG4gIG1lcmdlUHJveGllcyxcbiAgZmluZENsb3Nlc3QsXG4gIGNsb3Nlc3RSb290LFxuICBpbnRlcmNlcHRvcixcbiAgdHJhbnNpdGlvbixcbiAgc2V0U3R5bGVzLFxuICBtdXRhdGVEb20sXG4gIGRpcmVjdGl2ZSxcbiAgdGhyb3R0bGUsXG4gIGRlYm91bmNlLFxuICBldmFsdWF0ZSxcbiAgaW5pdFRyZWUsXG4gIG5leHRUaWNrLFxuICBwcmVmaXhlZDogcHJlZml4LFxuICBwcmVmaXg6IHNldFByZWZpeCxcbiAgcGx1Z2luLFxuICBtYWdpYyxcbiAgc3RvcmUsXG4gIHN0YXJ0LFxuICBjbG9uZSxcbiAgYm91bmQ6IGdldEJpbmRpbmcsXG4gICRkYXRhOiBzY29wZSxcbiAgZGF0YSxcbiAgYmluZDogYmluZDJcbn07XG52YXIgYWxwaW5lX2RlZmF1bHQgPSBBbHBpbmU7XG5cbi8vIG5vZGVfbW9kdWxlcy9AdnVlL3NoYXJlZC9kaXN0L3NoYXJlZC5lc20tYnVuZGxlci5qc1xuZnVuY3Rpb24gbWFrZU1hcChzdHIsIGV4cGVjdHNMb3dlckNhc2UpIHtcbiAgY29uc3QgbWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgY29uc3QgbGlzdCA9IHN0ci5zcGxpdChcIixcIik7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG1hcFtsaXN0W2ldXSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGV4cGVjdHNMb3dlckNhc2UgPyAodmFsKSA9PiAhIW1hcFt2YWwudG9Mb3dlckNhc2UoKV0gOiAodmFsKSA9PiAhIW1hcFt2YWxdO1xufVxudmFyIFBhdGNoRmxhZ05hbWVzID0ge1xuICBbMV06IGBURVhUYCxcbiAgWzJdOiBgQ0xBU1NgLFxuICBbNF06IGBTVFlMRWAsXG4gIFs4XTogYFBST1BTYCxcbiAgWzE2XTogYEZVTExfUFJPUFNgLFxuICBbMzJdOiBgSFlEUkFURV9FVkVOVFNgLFxuICBbNjRdOiBgU1RBQkxFX0ZSQUdNRU5UYCxcbiAgWzEyOF06IGBLRVlFRF9GUkFHTUVOVGAsXG4gIFsyNTZdOiBgVU5LRVlFRF9GUkFHTUVOVGAsXG4gIFs1MTJdOiBgTkVFRF9QQVRDSGAsXG4gIFsxMDI0XTogYERZTkFNSUNfU0xPVFNgLFxuICBbMjA0OF06IGBERVZfUk9PVF9GUkFHTUVOVGAsXG4gIFstMV06IGBIT0lTVEVEYCxcbiAgWy0yXTogYEJBSUxgXG59O1xudmFyIHNsb3RGbGFnc1RleHQgPSB7XG4gIFsxXTogXCJTVEFCTEVcIixcbiAgWzJdOiBcIkRZTkFNSUNcIixcbiAgWzNdOiBcIkZPUldBUkRFRFwiXG59O1xudmFyIHNwZWNpYWxCb29sZWFuQXR0cnMgPSBgaXRlbXNjb3BlLGFsbG93ZnVsbHNjcmVlbixmb3Jtbm92YWxpZGF0ZSxpc21hcCxub21vZHVsZSxub3ZhbGlkYXRlLHJlYWRvbmx5YDtcbnZhciBpc0Jvb2xlYW5BdHRyMiA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKHNwZWNpYWxCb29sZWFuQXR0cnMgKyBgLGFzeW5jLGF1dG9mb2N1cyxhdXRvcGxheSxjb250cm9scyxkZWZhdWx0LGRlZmVyLGRpc2FibGVkLGhpZGRlbixsb29wLG9wZW4scmVxdWlyZWQscmV2ZXJzZWQsc2NvcGVkLHNlYW1sZXNzLGNoZWNrZWQsbXV0ZWQsbXVsdGlwbGUsc2VsZWN0ZWRgKTtcbnZhciBFTVBUWV9PQkogPSB0cnVlID8gT2JqZWN0LmZyZWV6ZSh7fSkgOiB7fTtcbnZhciBFTVBUWV9BUlIgPSB0cnVlID8gT2JqZWN0LmZyZWV6ZShbXSkgOiBbXTtcbnZhciBleHRlbmQgPSBPYmplY3QuYXNzaWduO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBoYXNPd24gPSAodmFsLCBrZXkpID0+IGhhc093blByb3BlcnR5LmNhbGwodmFsLCBrZXkpO1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIGlzTWFwID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09IFwiW29iamVjdCBNYXBdXCI7XG52YXIgaXNTdHJpbmcgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiO1xudmFyIGlzU3ltYm9sID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJzeW1ib2xcIjtcbnZhciBpc09iamVjdCA9ICh2YWwpID0+IHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiO1xudmFyIG9iamVjdFRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB0b1R5cGVTdHJpbmcgPSAodmFsdWUpID0+IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xudmFyIHRvUmF3VHlwZSA9ICh2YWx1ZSkgPT4ge1xuICByZXR1cm4gdG9UeXBlU3RyaW5nKHZhbHVlKS5zbGljZSg4LCAtMSk7XG59O1xudmFyIGlzSW50ZWdlcktleSA9IChrZXkpID0+IGlzU3RyaW5nKGtleSkgJiYga2V5ICE9PSBcIk5hTlwiICYmIGtleVswXSAhPT0gXCItXCIgJiYgXCJcIiArIHBhcnNlSW50KGtleSwgMTApID09PSBrZXk7XG52YXIgY2FjaGVTdHJpbmdGdW5jdGlvbiA9IChmbikgPT4ge1xuICBjb25zdCBjYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHJldHVybiAoc3RyKSA9PiB7XG4gICAgY29uc3QgaGl0ID0gY2FjaGVbc3RyXTtcbiAgICByZXR1cm4gaGl0IHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSk7XG4gIH07XG59O1xudmFyIGNhbWVsaXplUkUgPSAvLShcXHcpL2c7XG52YXIgY2FtZWxpemUgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKGNhbWVsaXplUkUsIChfLCBjKSA9PiBjID8gYy50b1VwcGVyQ2FzZSgpIDogXCJcIik7XG59KTtcbnZhciBoeXBoZW5hdGVSRSA9IC9cXEIoW0EtWl0pL2c7XG52YXIgaHlwaGVuYXRlID0gY2FjaGVTdHJpbmdGdW5jdGlvbigoc3RyKSA9PiBzdHIucmVwbGFjZShoeXBoZW5hdGVSRSwgXCItJDFcIikudG9Mb3dlckNhc2UoKSk7XG52YXIgY2FwaXRhbGl6ZSA9IGNhY2hlU3RyaW5nRnVuY3Rpb24oKHN0cikgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpKTtcbnZhciB0b0hhbmRsZXJLZXkgPSBjYWNoZVN0cmluZ0Z1bmN0aW9uKChzdHIpID0+IHN0ciA/IGBvbiR7Y2FwaXRhbGl6ZShzdHIpfWAgOiBgYCk7XG52YXIgaGFzQ2hhbmdlZCA9ICh2YWx1ZSwgb2xkVmFsdWUpID0+IHZhbHVlICE9PSBvbGRWYWx1ZSAmJiAodmFsdWUgPT09IHZhbHVlIHx8IG9sZFZhbHVlID09PSBvbGRWYWx1ZSk7XG5cbi8vIG5vZGVfbW9kdWxlcy9AdnVlL3JlYWN0aXZpdHkvZGlzdC9yZWFjdGl2aXR5LmVzbS1idW5kbGVyLmpzXG52YXIgdGFyZ2V0TWFwID0gbmV3IFdlYWtNYXAoKTtcbnZhciBlZmZlY3RTdGFjayA9IFtdO1xudmFyIGFjdGl2ZUVmZmVjdDtcbnZhciBJVEVSQVRFX0tFWSA9IFN5bWJvbCh0cnVlID8gXCJpdGVyYXRlXCIgOiBcIlwiKTtcbnZhciBNQVBfS0VZX0lURVJBVEVfS0VZID0gU3ltYm9sKHRydWUgPyBcIk1hcCBrZXkgaXRlcmF0ZVwiIDogXCJcIik7XG5mdW5jdGlvbiBpc0VmZmVjdChmbikge1xuICByZXR1cm4gZm4gJiYgZm4uX2lzRWZmZWN0ID09PSB0cnVlO1xufVxuZnVuY3Rpb24gZWZmZWN0Mihmbiwgb3B0aW9ucyA9IEVNUFRZX09CSikge1xuICBpZiAoaXNFZmZlY3QoZm4pKSB7XG4gICAgZm4gPSBmbi5yYXc7XG4gIH1cbiAgY29uc3QgZWZmZWN0MyA9IGNyZWF0ZVJlYWN0aXZlRWZmZWN0KGZuLCBvcHRpb25zKTtcbiAgaWYgKCFvcHRpb25zLmxhenkpIHtcbiAgICBlZmZlY3QzKCk7XG4gIH1cbiAgcmV0dXJuIGVmZmVjdDM7XG59XG5mdW5jdGlvbiBzdG9wKGVmZmVjdDMpIHtcbiAgaWYgKGVmZmVjdDMuYWN0aXZlKSB7XG4gICAgY2xlYW51cChlZmZlY3QzKTtcbiAgICBpZiAoZWZmZWN0My5vcHRpb25zLm9uU3RvcCkge1xuICAgICAgZWZmZWN0My5vcHRpb25zLm9uU3RvcCgpO1xuICAgIH1cbiAgICBlZmZlY3QzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG52YXIgdWlkID0gMDtcbmZ1bmN0aW9uIGNyZWF0ZVJlYWN0aXZlRWZmZWN0KGZuLCBvcHRpb25zKSB7XG4gIGNvbnN0IGVmZmVjdDMgPSBmdW5jdGlvbiByZWFjdGl2ZUVmZmVjdCgpIHtcbiAgICBpZiAoIWVmZmVjdDMuYWN0aXZlKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgaWYgKCFlZmZlY3RTdGFjay5pbmNsdWRlcyhlZmZlY3QzKSkge1xuICAgICAgY2xlYW51cChlZmZlY3QzKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVuYWJsZVRyYWNraW5nKCk7XG4gICAgICAgIGVmZmVjdFN0YWNrLnB1c2goZWZmZWN0Myk7XG4gICAgICAgIGFjdGl2ZUVmZmVjdCA9IGVmZmVjdDM7XG4gICAgICAgIHJldHVybiBmbigpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgZWZmZWN0U3RhY2sucG9wKCk7XG4gICAgICAgIHJlc2V0VHJhY2tpbmcoKTtcbiAgICAgICAgYWN0aXZlRWZmZWN0ID0gZWZmZWN0U3RhY2tbZWZmZWN0U3RhY2subGVuZ3RoIC0gMV07XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBlZmZlY3QzLmlkID0gdWlkKys7XG4gIGVmZmVjdDMuYWxsb3dSZWN1cnNlID0gISFvcHRpb25zLmFsbG93UmVjdXJzZTtcbiAgZWZmZWN0My5faXNFZmZlY3QgPSB0cnVlO1xuICBlZmZlY3QzLmFjdGl2ZSA9IHRydWU7XG4gIGVmZmVjdDMucmF3ID0gZm47XG4gIGVmZmVjdDMuZGVwcyA9IFtdO1xuICBlZmZlY3QzLm9wdGlvbnMgPSBvcHRpb25zO1xuICByZXR1cm4gZWZmZWN0Mztcbn1cbmZ1bmN0aW9uIGNsZWFudXAoZWZmZWN0Mykge1xuICBjb25zdCB7ZGVwc30gPSBlZmZlY3QzO1xuICBpZiAoZGVwcy5sZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlcHNbaV0uZGVsZXRlKGVmZmVjdDMpO1xuICAgIH1cbiAgICBkZXBzLmxlbmd0aCA9IDA7XG4gIH1cbn1cbnZhciBzaG91bGRUcmFjayA9IHRydWU7XG52YXIgdHJhY2tTdGFjayA9IFtdO1xuZnVuY3Rpb24gcGF1c2VUcmFja2luZygpIHtcbiAgdHJhY2tTdGFjay5wdXNoKHNob3VsZFRyYWNrKTtcbiAgc2hvdWxkVHJhY2sgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIGVuYWJsZVRyYWNraW5nKCkge1xuICB0cmFja1N0YWNrLnB1c2goc2hvdWxkVHJhY2spO1xuICBzaG91bGRUcmFjayA9IHRydWU7XG59XG5mdW5jdGlvbiByZXNldFRyYWNraW5nKCkge1xuICBjb25zdCBsYXN0ID0gdHJhY2tTdGFjay5wb3AoKTtcbiAgc2hvdWxkVHJhY2sgPSBsYXN0ID09PSB2b2lkIDAgPyB0cnVlIDogbGFzdDtcbn1cbmZ1bmN0aW9uIHRyYWNrKHRhcmdldCwgdHlwZSwga2V5KSB7XG4gIGlmICghc2hvdWxkVHJhY2sgfHwgYWN0aXZlRWZmZWN0ID09PSB2b2lkIDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IGRlcHNNYXAgPSB0YXJnZXRNYXAuZ2V0KHRhcmdldCk7XG4gIGlmICghZGVwc01hcCkge1xuICAgIHRhcmdldE1hcC5zZXQodGFyZ2V0LCBkZXBzTWFwID0gbmV3IE1hcCgpKTtcbiAgfVxuICBsZXQgZGVwID0gZGVwc01hcC5nZXQoa2V5KTtcbiAgaWYgKCFkZXApIHtcbiAgICBkZXBzTWFwLnNldChrZXksIGRlcCA9IG5ldyBTZXQoKSk7XG4gIH1cbiAgaWYgKCFkZXAuaGFzKGFjdGl2ZUVmZmVjdCkpIHtcbiAgICBkZXAuYWRkKGFjdGl2ZUVmZmVjdCk7XG4gICAgYWN0aXZlRWZmZWN0LmRlcHMucHVzaChkZXApO1xuICAgIGlmIChhY3RpdmVFZmZlY3Qub3B0aW9ucy5vblRyYWNrKSB7XG4gICAgICBhY3RpdmVFZmZlY3Qub3B0aW9ucy5vblRyYWNrKHtcbiAgICAgICAgZWZmZWN0OiBhY3RpdmVFZmZlY3QsXG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgdHlwZSxcbiAgICAgICAga2V5XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uIHRyaWdnZXIodGFyZ2V0LCB0eXBlLCBrZXksIG5ld1ZhbHVlLCBvbGRWYWx1ZSwgb2xkVGFyZ2V0KSB7XG4gIGNvbnN0IGRlcHNNYXAgPSB0YXJnZXRNYXAuZ2V0KHRhcmdldCk7XG4gIGlmICghZGVwc01hcCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBlZmZlY3RzID0gbmV3IFNldCgpO1xuICBjb25zdCBhZGQyID0gKGVmZmVjdHNUb0FkZCkgPT4ge1xuICAgIGlmIChlZmZlY3RzVG9BZGQpIHtcbiAgICAgIGVmZmVjdHNUb0FkZC5mb3JFYWNoKChlZmZlY3QzKSA9PiB7XG4gICAgICAgIGlmIChlZmZlY3QzICE9PSBhY3RpdmVFZmZlY3QgfHwgZWZmZWN0My5hbGxvd1JlY3Vyc2UpIHtcbiAgICAgICAgICBlZmZlY3RzLmFkZChlZmZlY3QzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBpZiAodHlwZSA9PT0gXCJjbGVhclwiKSB7XG4gICAgZGVwc01hcC5mb3JFYWNoKGFkZDIpO1xuICB9IGVsc2UgaWYgKGtleSA9PT0gXCJsZW5ndGhcIiAmJiBpc0FycmF5KHRhcmdldCkpIHtcbiAgICBkZXBzTWFwLmZvckVhY2goKGRlcCwga2V5MikgPT4ge1xuICAgICAgaWYgKGtleTIgPT09IFwibGVuZ3RoXCIgfHwga2V5MiA+PSBuZXdWYWx1ZSkge1xuICAgICAgICBhZGQyKGRlcCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleSAhPT0gdm9pZCAwKSB7XG4gICAgICBhZGQyKGRlcHNNYXAuZ2V0KGtleSkpO1xuICAgIH1cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJhZGRcIjpcbiAgICAgICAgaWYgKCFpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICBhZGQyKGRlcHNNYXAuZ2V0KElURVJBVEVfS0VZKSk7XG4gICAgICAgICAgaWYgKGlzTWFwKHRhcmdldCkpIHtcbiAgICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoTUFQX0tFWV9JVEVSQVRFX0tFWSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc0ludGVnZXJLZXkoa2V5KSkge1xuICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoXCJsZW5ndGhcIikpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRlbGV0ZVwiOlxuICAgICAgICBpZiAoIWlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoSVRFUkFURV9LRVkpKTtcbiAgICAgICAgICBpZiAoaXNNYXAodGFyZ2V0KSkge1xuICAgICAgICAgICAgYWRkMihkZXBzTWFwLmdldChNQVBfS0VZX0lURVJBVEVfS0VZKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInNldFwiOlxuICAgICAgICBpZiAoaXNNYXAodGFyZ2V0KSkge1xuICAgICAgICAgIGFkZDIoZGVwc01hcC5nZXQoSVRFUkFURV9LRVkpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgY29uc3QgcnVuID0gKGVmZmVjdDMpID0+IHtcbiAgICBpZiAoZWZmZWN0My5vcHRpb25zLm9uVHJpZ2dlcikge1xuICAgICAgZWZmZWN0My5vcHRpb25zLm9uVHJpZ2dlcih7XG4gICAgICAgIGVmZmVjdDogZWZmZWN0MyxcbiAgICAgICAgdGFyZ2V0LFxuICAgICAgICBrZXksXG4gICAgICAgIHR5cGUsXG4gICAgICAgIG5ld1ZhbHVlLFxuICAgICAgICBvbGRWYWx1ZSxcbiAgICAgICAgb2xkVGFyZ2V0XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGVmZmVjdDMub3B0aW9ucy5zY2hlZHVsZXIpIHtcbiAgICAgIGVmZmVjdDMub3B0aW9ucy5zY2hlZHVsZXIoZWZmZWN0Myk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVmZmVjdDMoKTtcbiAgICB9XG4gIH07XG4gIGVmZmVjdHMuZm9yRWFjaChydW4pO1xufVxudmFyIGlzTm9uVHJhY2thYmxlS2V5cyA9IC8qIEBfX1BVUkVfXyAqLyBtYWtlTWFwKGBfX3Byb3RvX18sX192X2lzUmVmLF9faXNWdWVgKTtcbnZhciBidWlsdEluU3ltYm9scyA9IG5ldyBTZXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoU3ltYm9sKS5tYXAoKGtleSkgPT4gU3ltYm9sW2tleV0pLmZpbHRlcihpc1N5bWJvbCkpO1xudmFyIGdldDIgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlR2V0dGVyKCk7XG52YXIgc2hhbGxvd0dldCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVHZXR0ZXIoZmFsc2UsIHRydWUpO1xudmFyIHJlYWRvbmx5R2V0ID0gLyogQF9fUFVSRV9fICovIGNyZWF0ZUdldHRlcih0cnVlKTtcbnZhciBzaGFsbG93UmVhZG9ubHlHZXQgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlR2V0dGVyKHRydWUsIHRydWUpO1xudmFyIGFycmF5SW5zdHJ1bWVudGF0aW9ucyA9IHt9O1xuW1wiaW5jbHVkZXNcIiwgXCJpbmRleE9mXCIsIFwibGFzdEluZGV4T2ZcIl0uZm9yRWFjaCgoa2V5KSA9PiB7XG4gIGNvbnN0IG1ldGhvZCA9IEFycmF5LnByb3RvdHlwZVtrZXldO1xuICBhcnJheUluc3RydW1lbnRhdGlvbnNba2V5XSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICBjb25zdCBhcnIgPSB0b1Jhdyh0aGlzKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0cmFjayhhcnIsIFwiZ2V0XCIsIGkgKyBcIlwiKTtcbiAgICB9XG4gICAgY29uc3QgcmVzID0gbWV0aG9kLmFwcGx5KGFyciwgYXJncyk7XG4gICAgaWYgKHJlcyA9PT0gLTEgfHwgcmVzID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIG1ldGhvZC5hcHBseShhcnIsIGFyZ3MubWFwKHRvUmF3KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICB9O1xufSk7XG5bXCJwdXNoXCIsIFwicG9wXCIsIFwic2hpZnRcIiwgXCJ1bnNoaWZ0XCIsIFwic3BsaWNlXCJdLmZvckVhY2goKGtleSkgPT4ge1xuICBjb25zdCBtZXRob2QgPSBBcnJheS5wcm90b3R5cGVba2V5XTtcbiAgYXJyYXlJbnN0cnVtZW50YXRpb25zW2tleV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgcGF1c2VUcmFja2luZygpO1xuICAgIGNvbnN0IHJlcyA9IG1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICByZXNldFRyYWNraW5nKCk7XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlR2V0dGVyKGlzUmVhZG9ubHkgPSBmYWxzZSwgc2hhbGxvdyA9IGZhbHNlKSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXQzKHRhcmdldCwga2V5LCByZWNlaXZlcikge1xuICAgIGlmIChrZXkgPT09IFwiX192X2lzUmVhY3RpdmVcIikge1xuICAgICAgcmV0dXJuICFpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9yYXdcIiAmJiByZWNlaXZlciA9PT0gKGlzUmVhZG9ubHkgPyBzaGFsbG93ID8gc2hhbGxvd1JlYWRvbmx5TWFwIDogcmVhZG9ubHlNYXAgOiBzaGFsbG93ID8gc2hhbGxvd1JlYWN0aXZlTWFwIDogcmVhY3RpdmVNYXApLmdldCh0YXJnZXQpKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXRJc0FycmF5ID0gaXNBcnJheSh0YXJnZXQpO1xuICAgIGlmICghaXNSZWFkb25seSAmJiB0YXJnZXRJc0FycmF5ICYmIGhhc093bihhcnJheUluc3RydW1lbnRhdGlvbnMsIGtleSkpIHtcbiAgICAgIHJldHVybiBSZWZsZWN0LmdldChhcnJheUluc3RydW1lbnRhdGlvbnMsIGtleSwgcmVjZWl2ZXIpO1xuICAgIH1cbiAgICBjb25zdCByZXMgPSBSZWZsZWN0LmdldCh0YXJnZXQsIGtleSwgcmVjZWl2ZXIpO1xuICAgIGlmIChpc1N5bWJvbChrZXkpID8gYnVpbHRJblN5bWJvbHMuaGFzKGtleSkgOiBpc05vblRyYWNrYWJsZUtleXMoa2V5KSkge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKCFpc1JlYWRvbmx5KSB7XG4gICAgICB0cmFjayh0YXJnZXQsIFwiZ2V0XCIsIGtleSk7XG4gICAgfVxuICAgIGlmIChzaGFsbG93KSB7XG4gICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoaXNSZWYocmVzKSkge1xuICAgICAgY29uc3Qgc2hvdWxkVW53cmFwID0gIXRhcmdldElzQXJyYXkgfHwgIWlzSW50ZWdlcktleShrZXkpO1xuICAgICAgcmV0dXJuIHNob3VsZFVud3JhcCA/IHJlcy52YWx1ZSA6IHJlcztcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHJlcykpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5ID8gcmVhZG9ubHkocmVzKSA6IHJlYWN0aXZlMihyZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xufVxudmFyIHNldDIgPSAvKiBAX19QVVJFX18gKi8gY3JlYXRlU2V0dGVyKCk7XG52YXIgc2hhbGxvd1NldCA9IC8qIEBfX1BVUkVfXyAqLyBjcmVhdGVTZXR0ZXIodHJ1ZSk7XG5mdW5jdGlvbiBjcmVhdGVTZXR0ZXIoc2hhbGxvdyA9IGZhbHNlKSB7XG4gIHJldHVybiBmdW5jdGlvbiBzZXQzKHRhcmdldCwga2V5LCB2YWx1ZSwgcmVjZWl2ZXIpIHtcbiAgICBsZXQgb2xkVmFsdWUgPSB0YXJnZXRba2V5XTtcbiAgICBpZiAoIXNoYWxsb3cpIHtcbiAgICAgIHZhbHVlID0gdG9SYXcodmFsdWUpO1xuICAgICAgb2xkVmFsdWUgPSB0b1JhdyhvbGRWYWx1ZSk7XG4gICAgICBpZiAoIWlzQXJyYXkodGFyZ2V0KSAmJiBpc1JlZihvbGRWYWx1ZSkgJiYgIWlzUmVmKHZhbHVlKSkge1xuICAgICAgICBvbGRWYWx1ZS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgaGFkS2V5ID0gaXNBcnJheSh0YXJnZXQpICYmIGlzSW50ZWdlcktleShrZXkpID8gTnVtYmVyKGtleSkgPCB0YXJnZXQubGVuZ3RoIDogaGFzT3duKHRhcmdldCwga2V5KTtcbiAgICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LnNldCh0YXJnZXQsIGtleSwgdmFsdWUsIHJlY2VpdmVyKTtcbiAgICBpZiAodGFyZ2V0ID09PSB0b1JhdyhyZWNlaXZlcikpIHtcbiAgICAgIGlmICghaGFkS2V5KSB7XG4gICAgICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCBrZXksIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaGFzQ2hhbmdlZCh2YWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgIHRyaWdnZXIodGFyZ2V0LCBcInNldFwiLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5mdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuICBjb25zdCBoYWRLZXkgPSBoYXNPd24odGFyZ2V0LCBrZXkpO1xuICBjb25zdCBvbGRWYWx1ZSA9IHRhcmdldFtrZXldO1xuICBjb25zdCByZXN1bHQgPSBSZWZsZWN0LmRlbGV0ZVByb3BlcnR5KHRhcmdldCwga2V5KTtcbiAgaWYgKHJlc3VsdCAmJiBoYWRLZXkpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIG9sZFZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gaGFzKHRhcmdldCwga2V5KSB7XG4gIGNvbnN0IHJlc3VsdCA9IFJlZmxlY3QuaGFzKHRhcmdldCwga2V5KTtcbiAgaWYgKCFpc1N5bWJvbChrZXkpIHx8ICFidWlsdEluU3ltYm9scy5oYXMoa2V5KSkge1xuICAgIHRyYWNrKHRhcmdldCwgXCJoYXNcIiwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gb3duS2V5cyh0YXJnZXQpIHtcbiAgdHJhY2sodGFyZ2V0LCBcIml0ZXJhdGVcIiwgaXNBcnJheSh0YXJnZXQpID8gXCJsZW5ndGhcIiA6IElURVJBVEVfS0VZKTtcbiAgcmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpO1xufVxudmFyIG11dGFibGVIYW5kbGVycyA9IHtcbiAgZ2V0OiBnZXQyLFxuICBzZXQ6IHNldDIsXG4gIGRlbGV0ZVByb3BlcnR5LFxuICBoYXMsXG4gIG93bktleXNcbn07XG52YXIgcmVhZG9ubHlIYW5kbGVycyA9IHtcbiAgZ2V0OiByZWFkb25seUdldCxcbiAgc2V0KHRhcmdldCwga2V5KSB7XG4gICAgaWYgKHRydWUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgU2V0IG9wZXJhdGlvbiBvbiBrZXkgXCIke1N0cmluZyhrZXkpfVwiIGZhaWxlZDogdGFyZ2V0IGlzIHJlYWRvbmx5LmAsIHRhcmdldCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICBkZWxldGVQcm9wZXJ0eSh0YXJnZXQsIGtleSkge1xuICAgIGlmICh0cnVlKSB7XG4gICAgICBjb25zb2xlLndhcm4oYERlbGV0ZSBvcGVyYXRpb24gb24ga2V5IFwiJHtTdHJpbmcoa2V5KX1cIiBmYWlsZWQ6IHRhcmdldCBpcyByZWFkb25seS5gLCB0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbnZhciBzaGFsbG93UmVhY3RpdmVIYW5kbGVycyA9IGV4dGVuZCh7fSwgbXV0YWJsZUhhbmRsZXJzLCB7XG4gIGdldDogc2hhbGxvd0dldCxcbiAgc2V0OiBzaGFsbG93U2V0XG59KTtcbnZhciBzaGFsbG93UmVhZG9ubHlIYW5kbGVycyA9IGV4dGVuZCh7fSwgcmVhZG9ubHlIYW5kbGVycywge1xuICBnZXQ6IHNoYWxsb3dSZWFkb25seUdldFxufSk7XG52YXIgdG9SZWFjdGl2ZSA9ICh2YWx1ZSkgPT4gaXNPYmplY3QodmFsdWUpID8gcmVhY3RpdmUyKHZhbHVlKSA6IHZhbHVlO1xudmFyIHRvUmVhZG9ubHkgPSAodmFsdWUpID0+IGlzT2JqZWN0KHZhbHVlKSA/IHJlYWRvbmx5KHZhbHVlKSA6IHZhbHVlO1xudmFyIHRvU2hhbGxvdyA9ICh2YWx1ZSkgPT4gdmFsdWU7XG52YXIgZ2V0UHJvdG8gPSAodikgPT4gUmVmbGVjdC5nZXRQcm90b3R5cGVPZih2KTtcbmZ1bmN0aW9uIGdldCQxKHRhcmdldCwga2V5LCBpc1JlYWRvbmx5ID0gZmFsc2UsIGlzU2hhbGxvdyA9IGZhbHNlKSB7XG4gIHRhcmdldCA9IHRhcmdldFtcIl9fdl9yYXdcIl07XG4gIGNvbnN0IHJhd1RhcmdldCA9IHRvUmF3KHRhcmdldCk7XG4gIGNvbnN0IHJhd0tleSA9IHRvUmF3KGtleSk7XG4gIGlmIChrZXkgIT09IHJhd0tleSkge1xuICAgICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJnZXRcIiwga2V5KTtcbiAgfVxuICAhaXNSZWFkb25seSAmJiB0cmFjayhyYXdUYXJnZXQsIFwiZ2V0XCIsIHJhd0tleSk7XG4gIGNvbnN0IHtoYXM6IGhhczJ9ID0gZ2V0UHJvdG8ocmF3VGFyZ2V0KTtcbiAgY29uc3Qgd3JhcCA9IGlzU2hhbGxvdyA/IHRvU2hhbGxvdyA6IGlzUmVhZG9ubHkgPyB0b1JlYWRvbmx5IDogdG9SZWFjdGl2ZTtcbiAgaWYgKGhhczIuY2FsbChyYXdUYXJnZXQsIGtleSkpIHtcbiAgICByZXR1cm4gd3JhcCh0YXJnZXQuZ2V0KGtleSkpO1xuICB9IGVsc2UgaWYgKGhhczIuY2FsbChyYXdUYXJnZXQsIHJhd0tleSkpIHtcbiAgICByZXR1cm4gd3JhcCh0YXJnZXQuZ2V0KHJhd0tleSkpO1xuICB9IGVsc2UgaWYgKHRhcmdldCAhPT0gcmF3VGFyZ2V0KSB7XG4gICAgdGFyZ2V0LmdldChrZXkpO1xuICB9XG59XG5mdW5jdGlvbiBoYXMkMShrZXksIGlzUmVhZG9ubHkgPSBmYWxzZSkge1xuICBjb25zdCB0YXJnZXQgPSB0aGlzW1wiX192X3Jhd1wiXTtcbiAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgY29uc3QgcmF3S2V5ID0gdG9SYXcoa2V5KTtcbiAgaWYgKGtleSAhPT0gcmF3S2V5KSB7XG4gICAgIWlzUmVhZG9ubHkgJiYgdHJhY2socmF3VGFyZ2V0LCBcImhhc1wiLCBrZXkpO1xuICB9XG4gICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJoYXNcIiwgcmF3S2V5KTtcbiAgcmV0dXJuIGtleSA9PT0gcmF3S2V5ID8gdGFyZ2V0LmhhcyhrZXkpIDogdGFyZ2V0LmhhcyhrZXkpIHx8IHRhcmdldC5oYXMocmF3S2V5KTtcbn1cbmZ1bmN0aW9uIHNpemUodGFyZ2V0LCBpc1JlYWRvbmx5ID0gZmFsc2UpIHtcbiAgdGFyZ2V0ID0gdGFyZ2V0W1wiX192X3Jhd1wiXTtcbiAgIWlzUmVhZG9ubHkgJiYgdHJhY2sodG9SYXcodGFyZ2V0KSwgXCJpdGVyYXRlXCIsIElURVJBVEVfS0VZKTtcbiAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgXCJzaXplXCIsIHRhcmdldCk7XG59XG5mdW5jdGlvbiBhZGQodmFsdWUpIHtcbiAgdmFsdWUgPSB0b1Jhdyh2YWx1ZSk7XG4gIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICBjb25zdCBwcm90byA9IGdldFByb3RvKHRhcmdldCk7XG4gIGNvbnN0IGhhZEtleSA9IHByb3RvLmhhcy5jYWxsKHRhcmdldCwgdmFsdWUpO1xuICBpZiAoIWhhZEtleSkge1xuICAgIHRhcmdldC5hZGQodmFsdWUpO1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImFkZFwiLCB2YWx1ZSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuZnVuY3Rpb24gc2V0JDEoa2V5LCB2YWx1ZSkge1xuICB2YWx1ZSA9IHRvUmF3KHZhbHVlKTtcbiAgY29uc3QgdGFyZ2V0ID0gdG9SYXcodGhpcyk7XG4gIGNvbnN0IHtoYXM6IGhhczIsIGdldDogZ2V0M30gPSBnZXRQcm90byh0YXJnZXQpO1xuICBsZXQgaGFkS2V5ID0gaGFzMi5jYWxsKHRhcmdldCwga2V5KTtcbiAgaWYgKCFoYWRLZXkpIHtcbiAgICBrZXkgPSB0b1JhdyhrZXkpO1xuICAgIGhhZEtleSA9IGhhczIuY2FsbCh0YXJnZXQsIGtleSk7XG4gIH0gZWxzZSBpZiAodHJ1ZSkge1xuICAgIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzMiwga2V5KTtcbiAgfVxuICBjb25zdCBvbGRWYWx1ZSA9IGdldDMuY2FsbCh0YXJnZXQsIGtleSk7XG4gIHRhcmdldC5zZXQoa2V5LCB2YWx1ZSk7XG4gIGlmICghaGFkS2V5KSB7XG4gICAgdHJpZ2dlcih0YXJnZXQsIFwiYWRkXCIsIGtleSwgdmFsdWUpO1xuICB9IGVsc2UgaWYgKGhhc0NoYW5nZWQodmFsdWUsIG9sZFZhbHVlKSkge1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcInNldFwiLCBrZXksIHZhbHVlLCBvbGRWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5mdW5jdGlvbiBkZWxldGVFbnRyeShrZXkpIHtcbiAgY29uc3QgdGFyZ2V0ID0gdG9SYXcodGhpcyk7XG4gIGNvbnN0IHtoYXM6IGhhczIsIGdldDogZ2V0M30gPSBnZXRQcm90byh0YXJnZXQpO1xuICBsZXQgaGFkS2V5ID0gaGFzMi5jYWxsKHRhcmdldCwga2V5KTtcbiAgaWYgKCFoYWRLZXkpIHtcbiAgICBrZXkgPSB0b1JhdyhrZXkpO1xuICAgIGhhZEtleSA9IGhhczIuY2FsbCh0YXJnZXQsIGtleSk7XG4gIH0gZWxzZSBpZiAodHJ1ZSkge1xuICAgIGNoZWNrSWRlbnRpdHlLZXlzKHRhcmdldCwgaGFzMiwga2V5KTtcbiAgfVxuICBjb25zdCBvbGRWYWx1ZSA9IGdldDMgPyBnZXQzLmNhbGwodGFyZ2V0LCBrZXkpIDogdm9pZCAwO1xuICBjb25zdCByZXN1bHQgPSB0YXJnZXQuZGVsZXRlKGtleSk7XG4gIGlmIChoYWRLZXkpIHtcbiAgICB0cmlnZ2VyKHRhcmdldCwgXCJkZWxldGVcIiwga2V5LCB2b2lkIDAsIG9sZFZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gY2xlYXIoKSB7XG4gIGNvbnN0IHRhcmdldCA9IHRvUmF3KHRoaXMpO1xuICBjb25zdCBoYWRJdGVtcyA9IHRhcmdldC5zaXplICE9PSAwO1xuICBjb25zdCBvbGRUYXJnZXQgPSB0cnVlID8gaXNNYXAodGFyZ2V0KSA/IG5ldyBNYXAodGFyZ2V0KSA6IG5ldyBTZXQodGFyZ2V0KSA6IHZvaWQgMDtcbiAgY29uc3QgcmVzdWx0ID0gdGFyZ2V0LmNsZWFyKCk7XG4gIGlmIChoYWRJdGVtcykge1xuICAgIHRyaWdnZXIodGFyZ2V0LCBcImNsZWFyXCIsIHZvaWQgMCwgdm9pZCAwLCBvbGRUYXJnZXQpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjcmVhdGVGb3JFYWNoKGlzUmVhZG9ubHksIGlzU2hhbGxvdykge1xuICByZXR1cm4gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGNvbnN0IG9ic2VydmVkID0gdGhpcztcbiAgICBjb25zdCB0YXJnZXQgPSBvYnNlcnZlZFtcIl9fdl9yYXdcIl07XG4gICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgICBjb25zdCB3cmFwID0gaXNTaGFsbG93ID8gdG9TaGFsbG93IDogaXNSZWFkb25seSA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICAgICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJpdGVyYXRlXCIsIElURVJBVEVfS0VZKTtcbiAgICByZXR1cm4gdGFyZ2V0LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHdyYXAodmFsdWUpLCB3cmFwKGtleSksIG9ic2VydmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUl0ZXJhYmxlTWV0aG9kKG1ldGhvZCwgaXNSZWFkb25seSwgaXNTaGFsbG93KSB7XG4gIHJldHVybiBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpc1tcIl9fdl9yYXdcIl07XG4gICAgY29uc3QgcmF3VGFyZ2V0ID0gdG9SYXcodGFyZ2V0KTtcbiAgICBjb25zdCB0YXJnZXRJc01hcCA9IGlzTWFwKHJhd1RhcmdldCk7XG4gICAgY29uc3QgaXNQYWlyID0gbWV0aG9kID09PSBcImVudHJpZXNcIiB8fCBtZXRob2QgPT09IFN5bWJvbC5pdGVyYXRvciAmJiB0YXJnZXRJc01hcDtcbiAgICBjb25zdCBpc0tleU9ubHkgPSBtZXRob2QgPT09IFwia2V5c1wiICYmIHRhcmdldElzTWFwO1xuICAgIGNvbnN0IGlubmVySXRlcmF0b3IgPSB0YXJnZXRbbWV0aG9kXSguLi5hcmdzKTtcbiAgICBjb25zdCB3cmFwID0gaXNTaGFsbG93ID8gdG9TaGFsbG93IDogaXNSZWFkb25seSA/IHRvUmVhZG9ubHkgOiB0b1JlYWN0aXZlO1xuICAgICFpc1JlYWRvbmx5ICYmIHRyYWNrKHJhd1RhcmdldCwgXCJpdGVyYXRlXCIsIGlzS2V5T25seSA/IE1BUF9LRVlfSVRFUkFURV9LRVkgOiBJVEVSQVRFX0tFWSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5leHQoKSB7XG4gICAgICAgIGNvbnN0IHt2YWx1ZSwgZG9uZX0gPSBpbm5lckl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgcmV0dXJuIGRvbmUgPyB7dmFsdWUsIGRvbmV9IDoge1xuICAgICAgICAgIHZhbHVlOiBpc1BhaXIgPyBbd3JhcCh2YWx1ZVswXSksIHdyYXAodmFsdWVbMV0pXSA6IHdyYXAodmFsdWUpLFxuICAgICAgICAgIGRvbmVcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbU3ltYm9sLml0ZXJhdG9yXSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJlYWRvbmx5TWV0aG9kKHR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICBpZiAodHJ1ZSkge1xuICAgICAgY29uc3Qga2V5ID0gYXJnc1swXSA/IGBvbiBrZXkgXCIke2FyZ3NbMF19XCIgYCA6IGBgO1xuICAgICAgY29uc29sZS53YXJuKGAke2NhcGl0YWxpemUodHlwZSl9IG9wZXJhdGlvbiAke2tleX1mYWlsZWQ6IHRhcmdldCBpcyByZWFkb25seS5gLCB0b1Jhdyh0aGlzKSk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlID09PSBcImRlbGV0ZVwiID8gZmFsc2UgOiB0aGlzO1xuICB9O1xufVxudmFyIG11dGFibGVJbnN0cnVtZW50YXRpb25zID0ge1xuICBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIGdldCQxKHRoaXMsIGtleSk7XG4gIH0sXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiBzaXplKHRoaXMpO1xuICB9LFxuICBoYXM6IGhhcyQxLFxuICBhZGQsXG4gIHNldDogc2V0JDEsXG4gIGRlbGV0ZTogZGVsZXRlRW50cnksXG4gIGNsZWFyLFxuICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKGZhbHNlLCBmYWxzZSlcbn07XG52YXIgc2hhbGxvd0luc3RydW1lbnRhdGlvbnMgPSB7XG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gZ2V0JDEodGhpcywga2V5LCBmYWxzZSwgdHJ1ZSk7XG4gIH0sXG4gIGdldCBzaXplKCkge1xuICAgIHJldHVybiBzaXplKHRoaXMpO1xuICB9LFxuICBoYXM6IGhhcyQxLFxuICBhZGQsXG4gIHNldDogc2V0JDEsXG4gIGRlbGV0ZTogZGVsZXRlRW50cnksXG4gIGNsZWFyLFxuICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKGZhbHNlLCB0cnVlKVxufTtcbnZhciByZWFkb25seUluc3RydW1lbnRhdGlvbnMgPSB7XG4gIGdldChrZXkpIHtcbiAgICByZXR1cm4gZ2V0JDEodGhpcywga2V5LCB0cnVlKTtcbiAgfSxcbiAgZ2V0IHNpemUoKSB7XG4gICAgcmV0dXJuIHNpemUodGhpcywgdHJ1ZSk7XG4gIH0sXG4gIGhhcyhrZXkpIHtcbiAgICByZXR1cm4gaGFzJDEuY2FsbCh0aGlzLCBrZXksIHRydWUpO1xuICB9LFxuICBhZGQ6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwiYWRkXCIpLFxuICBzZXQ6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwic2V0XCIpLFxuICBkZWxldGU6IGNyZWF0ZVJlYWRvbmx5TWV0aG9kKFwiZGVsZXRlXCIpLFxuICBjbGVhcjogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJjbGVhclwiKSxcbiAgZm9yRWFjaDogY3JlYXRlRm9yRWFjaCh0cnVlLCBmYWxzZSlcbn07XG52YXIgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA9IHtcbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiBnZXQkMSh0aGlzLCBrZXksIHRydWUsIHRydWUpO1xuICB9LFxuICBnZXQgc2l6ZSgpIHtcbiAgICByZXR1cm4gc2l6ZSh0aGlzLCB0cnVlKTtcbiAgfSxcbiAgaGFzKGtleSkge1xuICAgIHJldHVybiBoYXMkMS5jYWxsKHRoaXMsIGtleSwgdHJ1ZSk7XG4gIH0sXG4gIGFkZDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJhZGRcIiksXG4gIHNldDogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJzZXRcIiksXG4gIGRlbGV0ZTogY3JlYXRlUmVhZG9ubHlNZXRob2QoXCJkZWxldGVcIiksXG4gIGNsZWFyOiBjcmVhdGVSZWFkb25seU1ldGhvZChcImNsZWFyXCIpLFxuICBmb3JFYWNoOiBjcmVhdGVGb3JFYWNoKHRydWUsIHRydWUpXG59O1xudmFyIGl0ZXJhdG9yTWV0aG9kcyA9IFtcImtleXNcIiwgXCJ2YWx1ZXNcIiwgXCJlbnRyaWVzXCIsIFN5bWJvbC5pdGVyYXRvcl07XG5pdGVyYXRvck1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gIG11dGFibGVJbnN0cnVtZW50YXRpb25zW21ldGhvZF0gPSBjcmVhdGVJdGVyYWJsZU1ldGhvZChtZXRob2QsIGZhbHNlLCBmYWxzZSk7XG4gIHJlYWRvbmx5SW5zdHJ1bWVudGF0aW9uc1ttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCB0cnVlLCBmYWxzZSk7XG4gIHNoYWxsb3dJbnN0cnVtZW50YXRpb25zW21ldGhvZF0gPSBjcmVhdGVJdGVyYWJsZU1ldGhvZChtZXRob2QsIGZhbHNlLCB0cnVlKTtcbiAgc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9uc1ttZXRob2RdID0gY3JlYXRlSXRlcmFibGVNZXRob2QobWV0aG9kLCB0cnVlLCB0cnVlKTtcbn0pO1xuZnVuY3Rpb24gY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKGlzUmVhZG9ubHksIHNoYWxsb3cpIHtcbiAgY29uc3QgaW5zdHJ1bWVudGF0aW9ucyA9IHNoYWxsb3cgPyBpc1JlYWRvbmx5ID8gc2hhbGxvd1JlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA6IHNoYWxsb3dJbnN0cnVtZW50YXRpb25zIDogaXNSZWFkb25seSA/IHJlYWRvbmx5SW5zdHJ1bWVudGF0aW9ucyA6IG11dGFibGVJbnN0cnVtZW50YXRpb25zO1xuICByZXR1cm4gKHRhcmdldCwga2V5LCByZWNlaXZlcikgPT4ge1xuICAgIGlmIChrZXkgPT09IFwiX192X2lzUmVhY3RpdmVcIikge1xuICAgICAgcmV0dXJuICFpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9pc1JlYWRvbmx5XCIpIHtcbiAgICAgIHJldHVybiBpc1JlYWRvbmx5O1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIl9fdl9yYXdcIikge1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG4gICAgcmV0dXJuIFJlZmxlY3QuZ2V0KGhhc093bihpbnN0cnVtZW50YXRpb25zLCBrZXkpICYmIGtleSBpbiB0YXJnZXQgPyBpbnN0cnVtZW50YXRpb25zIDogdGFyZ2V0LCBrZXksIHJlY2VpdmVyKTtcbiAgfTtcbn1cbnZhciBtdXRhYmxlQ29sbGVjdGlvbkhhbmRsZXJzID0ge1xuICBnZXQ6IGNyZWF0ZUluc3RydW1lbnRhdGlvbkdldHRlcihmYWxzZSwgZmFsc2UpXG59O1xudmFyIHNoYWxsb3dDb2xsZWN0aW9uSGFuZGxlcnMgPSB7XG4gIGdldDogY3JlYXRlSW5zdHJ1bWVudGF0aW9uR2V0dGVyKGZhbHNlLCB0cnVlKVxufTtcbnZhciByZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgZ2V0OiBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIodHJ1ZSwgZmFsc2UpXG59O1xudmFyIHNoYWxsb3dSZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycyA9IHtcbiAgZ2V0OiBjcmVhdGVJbnN0cnVtZW50YXRpb25HZXR0ZXIodHJ1ZSwgdHJ1ZSlcbn07XG5mdW5jdGlvbiBjaGVja0lkZW50aXR5S2V5cyh0YXJnZXQsIGhhczIsIGtleSkge1xuICBjb25zdCByYXdLZXkgPSB0b1JhdyhrZXkpO1xuICBpZiAocmF3S2V5ICE9PSBrZXkgJiYgaGFzMi5jYWxsKHRhcmdldCwgcmF3S2V5KSkge1xuICAgIGNvbnN0IHR5cGUgPSB0b1Jhd1R5cGUodGFyZ2V0KTtcbiAgICBjb25zb2xlLndhcm4oYFJlYWN0aXZlICR7dHlwZX0gY29udGFpbnMgYm90aCB0aGUgcmF3IGFuZCByZWFjdGl2ZSB2ZXJzaW9ucyBvZiB0aGUgc2FtZSBvYmplY3Qke3R5cGUgPT09IGBNYXBgID8gYCBhcyBrZXlzYCA6IGBgfSwgd2hpY2ggY2FuIGxlYWQgdG8gaW5jb25zaXN0ZW5jaWVzLiBBdm9pZCBkaWZmZXJlbnRpYXRpbmcgYmV0d2VlbiB0aGUgcmF3IGFuZCByZWFjdGl2ZSB2ZXJzaW9ucyBvZiBhbiBvYmplY3QgYW5kIG9ubHkgdXNlIHRoZSByZWFjdGl2ZSB2ZXJzaW9uIGlmIHBvc3NpYmxlLmApO1xuICB9XG59XG52YXIgcmVhY3RpdmVNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHNoYWxsb3dSZWFjdGl2ZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG52YXIgcmVhZG9ubHlNYXAgPSBuZXcgV2Vha01hcCgpO1xudmFyIHNoYWxsb3dSZWFkb25seU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5mdW5jdGlvbiB0YXJnZXRUeXBlTWFwKHJhd1R5cGUpIHtcbiAgc3dpdGNoIChyYXdUeXBlKSB7XG4gICAgY2FzZSBcIk9iamVjdFwiOlxuICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgcmV0dXJuIDE7XG4gICAgY2FzZSBcIk1hcFwiOlxuICAgIGNhc2UgXCJTZXRcIjpcbiAgICBjYXNlIFwiV2Vha01hcFwiOlxuICAgIGNhc2UgXCJXZWFrU2V0XCI6XG4gICAgICByZXR1cm4gMjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDA7XG4gIH1cbn1cbmZ1bmN0aW9uIGdldFRhcmdldFR5cGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlW1wiX192X3NraXBcIl0gfHwgIU9iamVjdC5pc0V4dGVuc2libGUodmFsdWUpID8gMCA6IHRhcmdldFR5cGVNYXAodG9SYXdUeXBlKHZhbHVlKSk7XG59XG5mdW5jdGlvbiByZWFjdGl2ZTIodGFyZ2V0KSB7XG4gIGlmICh0YXJnZXQgJiYgdGFyZ2V0W1wiX192X2lzUmVhZG9ubHlcIl0pIHtcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG4gIHJldHVybiBjcmVhdGVSZWFjdGl2ZU9iamVjdCh0YXJnZXQsIGZhbHNlLCBtdXRhYmxlSGFuZGxlcnMsIG11dGFibGVDb2xsZWN0aW9uSGFuZGxlcnMsIHJlYWN0aXZlTWFwKTtcbn1cbmZ1bmN0aW9uIHJlYWRvbmx5KHRhcmdldCkge1xuICByZXR1cm4gY3JlYXRlUmVhY3RpdmVPYmplY3QodGFyZ2V0LCB0cnVlLCByZWFkb25seUhhbmRsZXJzLCByZWFkb25seUNvbGxlY3Rpb25IYW5kbGVycywgcmVhZG9ubHlNYXApO1xufVxuZnVuY3Rpb24gY3JlYXRlUmVhY3RpdmVPYmplY3QodGFyZ2V0LCBpc1JlYWRvbmx5LCBiYXNlSGFuZGxlcnMsIGNvbGxlY3Rpb25IYW5kbGVycywgcHJveHlNYXApIHtcbiAgaWYgKCFpc09iamVjdCh0YXJnZXQpKSB7XG4gICAgaWYgKHRydWUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgdmFsdWUgY2Fubm90IGJlIG1hZGUgcmVhY3RpdmU6ICR7U3RyaW5nKHRhcmdldCl9YCk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgaWYgKHRhcmdldFtcIl9fdl9yYXdcIl0gJiYgIShpc1JlYWRvbmx5ICYmIHRhcmdldFtcIl9fdl9pc1JlYWN0aXZlXCJdKSkge1xuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cbiAgY29uc3QgZXhpc3RpbmdQcm94eSA9IHByb3h5TWFwLmdldCh0YXJnZXQpO1xuICBpZiAoZXhpc3RpbmdQcm94eSkge1xuICAgIHJldHVybiBleGlzdGluZ1Byb3h5O1xuICB9XG4gIGNvbnN0IHRhcmdldFR5cGUgPSBnZXRUYXJnZXRUeXBlKHRhcmdldCk7XG4gIGlmICh0YXJnZXRUeXBlID09PSAwKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuICBjb25zdCBwcm94eSA9IG5ldyBQcm94eSh0YXJnZXQsIHRhcmdldFR5cGUgPT09IDIgPyBjb2xsZWN0aW9uSGFuZGxlcnMgOiBiYXNlSGFuZGxlcnMpO1xuICBwcm94eU1hcC5zZXQodGFyZ2V0LCBwcm94eSk7XG4gIHJldHVybiBwcm94eTtcbn1cbmZ1bmN0aW9uIHRvUmF3KG9ic2VydmVkKSB7XG4gIHJldHVybiBvYnNlcnZlZCAmJiB0b1JhdyhvYnNlcnZlZFtcIl9fdl9yYXdcIl0pIHx8IG9ic2VydmVkO1xufVxuZnVuY3Rpb24gaXNSZWYocikge1xuICByZXR1cm4gQm9vbGVhbihyICYmIHIuX192X2lzUmVmID09PSB0cnVlKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kbmV4dFRpY2suanNcbm1hZ2ljKFwibmV4dFRpY2tcIiwgKCkgPT4gbmV4dFRpY2spO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRkaXNwYXRjaC5qc1xubWFnaWMoXCJkaXNwYXRjaFwiLCAoZWwpID0+IGRpc3BhdGNoLmJpbmQoZGlzcGF0Y2gsIGVsKSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MvJHdhdGNoLmpzXG5tYWdpYyhcIndhdGNoXCIsIChlbCwge2V2YWx1YXRlTGF0ZXI6IGV2YWx1YXRlTGF0ZXIyLCBlZmZlY3Q6IGVmZmVjdDN9KSA9PiAoa2V5LCBjYWxsYmFjaykgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcjIoa2V5KTtcbiAgbGV0IGZpcnN0VGltZSA9IHRydWU7XG4gIGxldCBvbGRWYWx1ZTtcbiAgbGV0IGVmZmVjdFJlZmVyZW5jZSA9IGVmZmVjdDMoKCkgPT4gZXZhbHVhdGUyKCh2YWx1ZSkgPT4ge1xuICAgIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICBpZiAoIWZpcnN0VGltZSkge1xuICAgICAgcXVldWVNaWNyb3Rhc2soKCkgPT4ge1xuICAgICAgICBjYWxsYmFjayh2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICBvbGRWYWx1ZSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICB9KSk7XG4gIGVsLl94X2VmZmVjdHMuZGVsZXRlKGVmZmVjdFJlZmVyZW5jZSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kc3RvcmUuanNcbm1hZ2ljKFwic3RvcmVcIiwgZ2V0U3RvcmVzKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kZGF0YS5qc1xubWFnaWMoXCJkYXRhXCIsIChlbCkgPT4gc2NvcGUoZWwpKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kcm9vdC5qc1xubWFnaWMoXCJyb290XCIsIChlbCkgPT4gY2xvc2VzdFJvb3QoZWwpKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kcmVmcy5qc1xubWFnaWMoXCJyZWZzXCIsIChlbCkgPT4ge1xuICBpZiAoZWwuX3hfcmVmc19wcm94eSlcbiAgICByZXR1cm4gZWwuX3hfcmVmc19wcm94eTtcbiAgZWwuX3hfcmVmc19wcm94eSA9IG1lcmdlUHJveGllcyhnZXRBcnJheU9mUmVmT2JqZWN0KGVsKSk7XG4gIHJldHVybiBlbC5feF9yZWZzX3Byb3h5O1xufSk7XG5mdW5jdGlvbiBnZXRBcnJheU9mUmVmT2JqZWN0KGVsKSB7XG4gIGxldCByZWZPYmplY3RzID0gW107XG4gIGxldCBjdXJyZW50RWwgPSBlbDtcbiAgd2hpbGUgKGN1cnJlbnRFbCkge1xuICAgIGlmIChjdXJyZW50RWwuX3hfcmVmcylcbiAgICAgIHJlZk9iamVjdHMucHVzaChjdXJyZW50RWwuX3hfcmVmcyk7XG4gICAgY3VycmVudEVsID0gY3VycmVudEVsLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIHJlZk9iamVjdHM7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9pZHMuanNcbnZhciBnbG9iYWxJZE1lbW8gPSB7fTtcbmZ1bmN0aW9uIGZpbmRBbmRJbmNyZW1lbnRJZChuYW1lKSB7XG4gIGlmICghZ2xvYmFsSWRNZW1vW25hbWVdKVxuICAgIGdsb2JhbElkTWVtb1tuYW1lXSA9IDA7XG4gIHJldHVybiArK2dsb2JhbElkTWVtb1tuYW1lXTtcbn1cbmZ1bmN0aW9uIGNsb3Nlc3RJZFJvb3QoZWwsIG5hbWUpIHtcbiAgcmV0dXJuIGZpbmRDbG9zZXN0KGVsLCAoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50Ll94X2lkcyAmJiBlbGVtZW50Ll94X2lkc1tuYW1lXSlcbiAgICAgIHJldHVybiB0cnVlO1xuICB9KTtcbn1cbmZ1bmN0aW9uIHNldElkUm9vdChlbCwgbmFtZSkge1xuICBpZiAoIWVsLl94X2lkcylcbiAgICBlbC5feF9pZHMgPSB7fTtcbiAgaWYgKCFlbC5feF9pZHNbbmFtZV0pXG4gICAgZWwuX3hfaWRzW25hbWVdID0gZmluZEFuZEluY3JlbWVudElkKG5hbWUpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvbWFnaWNzLyRpZC5qc1xubWFnaWMoXCJpZFwiLCAoZWwpID0+IChuYW1lLCBrZXkgPSBudWxsKSA9PiB7XG4gIGxldCByb290ID0gY2xvc2VzdElkUm9vdChlbCwgbmFtZSk7XG4gIGxldCBpZCA9IHJvb3QgPyByb290Ll94X2lkc1tuYW1lXSA6IGZpbmRBbmRJbmNyZW1lbnRJZChuYW1lKTtcbiAgcmV0dXJuIGtleSA/IGAke25hbWV9LSR7aWR9LSR7a2V5fWAgOiBgJHtuYW1lfS0ke2lkfWA7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL21hZ2ljcy8kZWwuanNcbm1hZ2ljKFwiZWxcIiwgKGVsKSA9PiBlbCk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9tYWdpY3MvaW5kZXguanNcbndhcm5NaXNzaW5nUGx1Z2luTWFnaWMoXCJGb2N1c1wiLCBcImZvY3VzXCIsIFwiZm9jdXNcIik7XG53YXJuTWlzc2luZ1BsdWdpbk1hZ2ljKFwiUGVyc2lzdFwiLCBcInBlcnNpc3RcIiwgXCJwZXJzaXN0XCIpO1xuZnVuY3Rpb24gd2Fybk1pc3NpbmdQbHVnaW5NYWdpYyhuYW1lLCBtYWdpY05hbWUsIHNsdWcpIHtcbiAgbWFnaWMobWFnaWNOYW1lLCAoZWwpID0+IHdhcm4oYFlvdSBjYW4ndCB1c2UgWyQke2RpcmVjdGl2ZU5hbWV9XSB3aXRob3V0IGZpcnN0IGluc3RhbGxpbmcgdGhlIFwiJHtuYW1lfVwiIHBsdWdpbiBoZXJlOiBodHRwczovL2FscGluZWpzLmRldi9wbHVnaW5zLyR7c2x1Z31gLCBlbCkpO1xufVxuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LW1vZGVsYWJsZS5qc1xuZGlyZWN0aXZlKFwibW9kZWxhYmxlXCIsIChlbCwge2V4cHJlc3Npb259LCB7ZWZmZWN0OiBlZmZlY3QzLCBldmFsdWF0ZUxhdGVyOiBldmFsdWF0ZUxhdGVyMn0pID0+IHtcbiAgbGV0IGZ1bmMgPSBldmFsdWF0ZUxhdGVyMihleHByZXNzaW9uKTtcbiAgbGV0IGlubmVyR2V0ID0gKCkgPT4ge1xuICAgIGxldCByZXN1bHQ7XG4gICAgZnVuYygoaSkgPT4gcmVzdWx0ID0gaSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgbGV0IGV2YWx1YXRlSW5uZXJTZXQgPSBldmFsdWF0ZUxhdGVyMihgJHtleHByZXNzaW9ufSA9IF9fcGxhY2Vob2xkZXJgKTtcbiAgbGV0IGlubmVyU2V0ID0gKHZhbCkgPT4gZXZhbHVhdGVJbm5lclNldCgoKSA9PiB7XG4gIH0sIHtzY29wZToge19fcGxhY2Vob2xkZXI6IHZhbH19KTtcbiAgbGV0IGluaXRpYWxWYWx1ZSA9IGlubmVyR2V0KCk7XG4gIGlubmVyU2V0KGluaXRpYWxWYWx1ZSk7XG4gIHF1ZXVlTWljcm90YXNrKCgpID0+IHtcbiAgICBpZiAoIWVsLl94X21vZGVsKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzW1wiZGVmYXVsdFwiXSgpO1xuICAgIGxldCBvdXRlckdldCA9IGVsLl94X21vZGVsLmdldDtcbiAgICBsZXQgb3V0ZXJTZXQgPSBlbC5feF9tb2RlbC5zZXQ7XG4gICAgZWZmZWN0MygoKSA9PiBpbm5lclNldChvdXRlckdldCgpKSk7XG4gICAgZWZmZWN0MygoKSA9PiBvdXRlclNldChpbm5lckdldCgpKSk7XG4gIH0pO1xufSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtdGVsZXBvcnQuanNcbmRpcmVjdGl2ZShcInRlbGVwb3J0XCIsIChlbCwge2V4cHJlc3Npb259LCB7Y2xlYW51cDogY2xlYW51cDJ9KSA9PiB7XG4gIGlmIChlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgIT09IFwidGVtcGxhdGVcIilcbiAgICB3YXJuKFwieC10ZWxlcG9ydCBjYW4gb25seSBiZSB1c2VkIG9uIGEgPHRlbXBsYXRlPiB0YWdcIiwgZWwpO1xuICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihleHByZXNzaW9uKTtcbiAgaWYgKCF0YXJnZXQpXG4gICAgd2FybihgQ2Fubm90IGZpbmQgeC10ZWxlcG9ydCBlbGVtZW50IGZvciBzZWxlY3RvcjogXCIke2V4cHJlc3Npb259XCJgKTtcbiAgbGV0IGNsb25lMiA9IGVsLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpLmZpcnN0RWxlbWVudENoaWxkO1xuICBlbC5feF90ZWxlcG9ydCA9IGNsb25lMjtcbiAgY2xvbmUyLl94X3RlbGVwb3J0QmFjayA9IGVsO1xuICBpZiAoZWwuX3hfZm9yd2FyZEV2ZW50cykge1xuICAgIGVsLl94X2ZvcndhcmRFdmVudHMuZm9yRWFjaCgoZXZlbnROYW1lKSA9PiB7XG4gICAgICBjbG9uZTIuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IGUuY29uc3RydWN0b3IoZS50eXBlLCBlKSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBhZGRTY29wZVRvTm9kZShjbG9uZTIsIHt9LCBlbCk7XG4gIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKGNsb25lMik7XG4gICAgaW5pdFRyZWUoY2xvbmUyKTtcbiAgICBjbG9uZTIuX3hfaWdub3JlID0gdHJ1ZTtcbiAgfSk7XG4gIGNsZWFudXAyKCgpID0+IGNsb25lMi5yZW1vdmUoKSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pZ25vcmUuanNcbnZhciBoYW5kbGVyID0gKCkgPT4ge1xufTtcbmhhbmRsZXIuaW5saW5lID0gKGVsLCB7bW9kaWZpZXJzfSwge2NsZWFudXA6IGNsZWFudXAyfSkgPT4ge1xuICBtb2RpZmllcnMuaW5jbHVkZXMoXCJzZWxmXCIpID8gZWwuX3hfaWdub3JlU2VsZiA9IHRydWUgOiBlbC5feF9pZ25vcmUgPSB0cnVlO1xuICBjbGVhbnVwMigoKSA9PiB7XG4gICAgbW9kaWZpZXJzLmluY2x1ZGVzKFwic2VsZlwiKSA/IGRlbGV0ZSBlbC5feF9pZ25vcmVTZWxmIDogZGVsZXRlIGVsLl94X2lnbm9yZTtcbiAgfSk7XG59O1xuZGlyZWN0aXZlKFwiaWdub3JlXCIsIGhhbmRsZXIpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWVmZmVjdC5qc1xuZGlyZWN0aXZlKFwiZWZmZWN0XCIsIChlbCwge2V4cHJlc3Npb259LCB7ZWZmZWN0OiBlZmZlY3QzfSkgPT4gZWZmZWN0MyhldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKSkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvdXRpbHMvb24uanNcbmZ1bmN0aW9uIG9uKGVsLCBldmVudCwgbW9kaWZpZXJzLCBjYWxsYmFjaykge1xuICBsZXQgbGlzdGVuZXJUYXJnZXQgPSBlbDtcbiAgbGV0IGhhbmRsZXIzID0gKGUpID0+IGNhbGxiYWNrKGUpO1xuICBsZXQgb3B0aW9ucyA9IHt9O1xuICBsZXQgd3JhcEhhbmRsZXIgPSAoY2FsbGJhY2syLCB3cmFwcGVyKSA9PiAoZSkgPT4gd3JhcHBlcihjYWxsYmFjazIsIGUpO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiZG90XCIpKVxuICAgIGV2ZW50ID0gZG90U3ludGF4KGV2ZW50KTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcImNhbWVsXCIpKVxuICAgIGV2ZW50ID0gY2FtZWxDYXNlMihldmVudCk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJwYXNzaXZlXCIpKVxuICAgIG9wdGlvbnMucGFzc2l2ZSA9IHRydWU7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJjYXB0dXJlXCIpKVxuICAgIG9wdGlvbnMuY2FwdHVyZSA9IHRydWU7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJ3aW5kb3dcIikpXG4gICAgbGlzdGVuZXJUYXJnZXQgPSB3aW5kb3c7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJkb2N1bWVudFwiKSlcbiAgICBsaXN0ZW5lclRhcmdldCA9IGRvY3VtZW50O1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwicHJldmVudFwiKSlcbiAgICBoYW5kbGVyMyA9IHdyYXBIYW5kbGVyKGhhbmRsZXIzLCAobmV4dCwgZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgaWYgKG1vZGlmaWVycy5pbmNsdWRlcyhcInN0b3BcIikpXG4gICAgaGFuZGxlcjMgPSB3cmFwSGFuZGxlcihoYW5kbGVyMywgKG5leHQsIGUpID0+IHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBuZXh0KGUpO1xuICAgIH0pO1xuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwic2VsZlwiKSlcbiAgICBoYW5kbGVyMyA9IHdyYXBIYW5kbGVyKGhhbmRsZXIzLCAobmV4dCwgZSkgPT4ge1xuICAgICAgZS50YXJnZXQgPT09IGVsICYmIG5leHQoZSk7XG4gICAgfSk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJhd2F5XCIpIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcIm91dHNpZGVcIikpIHtcbiAgICBsaXN0ZW5lclRhcmdldCA9IGRvY3VtZW50O1xuICAgIGhhbmRsZXIzID0gd3JhcEhhbmRsZXIoaGFuZGxlcjMsIChuZXh0LCBlKSA9PiB7XG4gICAgICBpZiAoZWwuY29udGFpbnMoZS50YXJnZXQpKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAoZS50YXJnZXQuaXNDb25uZWN0ZWQgPT09IGZhbHNlKVxuICAgICAgICByZXR1cm47XG4gICAgICBpZiAoZWwub2Zmc2V0V2lkdGggPCAxICYmIGVsLm9mZnNldEhlaWdodCA8IDEpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGlmIChlbC5feF9pc1Nob3duID09PSBmYWxzZSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgbmV4dChlKTtcbiAgICB9KTtcbiAgfVxuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwib25jZVwiKSkge1xuICAgIGhhbmRsZXIzID0gd3JhcEhhbmRsZXIoaGFuZGxlcjMsIChuZXh0LCBlKSA9PiB7XG4gICAgICBuZXh0KGUpO1xuICAgICAgbGlzdGVuZXJUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcjMsIG9wdGlvbnMpO1xuICAgIH0pO1xuICB9XG4gIGhhbmRsZXIzID0gd3JhcEhhbmRsZXIoaGFuZGxlcjMsIChuZXh0LCBlKSA9PiB7XG4gICAgaWYgKGlzS2V5RXZlbnQoZXZlbnQpKSB7XG4gICAgICBpZiAoaXNMaXN0ZW5pbmdGb3JBU3BlY2lmaWNLZXlUaGF0SGFzbnRCZWVuUHJlc3NlZChlLCBtb2RpZmllcnMpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgbmV4dChlKTtcbiAgfSk7XG4gIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJkZWJvdW5jZVwiKSkge1xuICAgIGxldCBuZXh0TW9kaWZpZXIgPSBtb2RpZmllcnNbbW9kaWZpZXJzLmluZGV4T2YoXCJkZWJvdW5jZVwiKSArIDFdIHx8IFwiaW52YWxpZC13YWl0XCI7XG4gICAgbGV0IHdhaXQgPSBpc051bWVyaWMobmV4dE1vZGlmaWVyLnNwbGl0KFwibXNcIilbMF0pID8gTnVtYmVyKG5leHRNb2RpZmllci5zcGxpdChcIm1zXCIpWzBdKSA6IDI1MDtcbiAgICBoYW5kbGVyMyA9IGRlYm91bmNlKGhhbmRsZXIzLCB3YWl0KTtcbiAgfVxuICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwidGhyb3R0bGVcIikpIHtcbiAgICBsZXQgbmV4dE1vZGlmaWVyID0gbW9kaWZpZXJzW21vZGlmaWVycy5pbmRleE9mKFwidGhyb3R0bGVcIikgKyAxXSB8fCBcImludmFsaWQtd2FpdFwiO1xuICAgIGxldCB3YWl0ID0gaXNOdW1lcmljKG5leHRNb2RpZmllci5zcGxpdChcIm1zXCIpWzBdKSA/IE51bWJlcihuZXh0TW9kaWZpZXIuc3BsaXQoXCJtc1wiKVswXSkgOiAyNTA7XG4gICAgaGFuZGxlcjMgPSB0aHJvdHRsZShoYW5kbGVyMywgd2FpdCk7XG4gIH1cbiAgbGlzdGVuZXJUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlcjMsIG9wdGlvbnMpO1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGxpc3RlbmVyVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIzLCBvcHRpb25zKTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGRvdFN5bnRheChzdWJqZWN0KSB7XG4gIHJldHVybiBzdWJqZWN0LnJlcGxhY2UoLy0vZywgXCIuXCIpO1xufVxuZnVuY3Rpb24gY2FtZWxDYXNlMihzdWJqZWN0KSB7XG4gIHJldHVybiBzdWJqZWN0LnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvLShcXHcpL2csIChtYXRjaCwgY2hhcikgPT4gY2hhci50b1VwcGVyQ2FzZSgpKTtcbn1cbmZ1bmN0aW9uIGlzTnVtZXJpYyhzdWJqZWN0KSB7XG4gIHJldHVybiAhQXJyYXkuaXNBcnJheShzdWJqZWN0KSAmJiAhaXNOYU4oc3ViamVjdCk7XG59XG5mdW5jdGlvbiBrZWJhYkNhc2UyKHN1YmplY3QpIHtcbiAgcmV0dXJuIHN1YmplY3QucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgXCIkMS0kMlwiKS5yZXBsYWNlKC9bX1xcc10vLCBcIi1cIikudG9Mb3dlckNhc2UoKTtcbn1cbmZ1bmN0aW9uIGlzS2V5RXZlbnQoZXZlbnQpIHtcbiAgcmV0dXJuIFtcImtleWRvd25cIiwgXCJrZXl1cFwiXS5pbmNsdWRlcyhldmVudCk7XG59XG5mdW5jdGlvbiBpc0xpc3RlbmluZ0ZvckFTcGVjaWZpY0tleVRoYXRIYXNudEJlZW5QcmVzc2VkKGUsIG1vZGlmaWVycykge1xuICBsZXQga2V5TW9kaWZpZXJzID0gbW9kaWZpZXJzLmZpbHRlcigoaSkgPT4ge1xuICAgIHJldHVybiAhW1wid2luZG93XCIsIFwiZG9jdW1lbnRcIiwgXCJwcmV2ZW50XCIsIFwic3RvcFwiLCBcIm9uY2VcIl0uaW5jbHVkZXMoaSk7XG4gIH0pO1xuICBpZiAoa2V5TW9kaWZpZXJzLmluY2x1ZGVzKFwiZGVib3VuY2VcIikpIHtcbiAgICBsZXQgZGVib3VuY2VJbmRleCA9IGtleU1vZGlmaWVycy5pbmRleE9mKFwiZGVib3VuY2VcIik7XG4gICAga2V5TW9kaWZpZXJzLnNwbGljZShkZWJvdW5jZUluZGV4LCBpc051bWVyaWMoKGtleU1vZGlmaWVyc1tkZWJvdW5jZUluZGV4ICsgMV0gfHwgXCJpbnZhbGlkLXdhaXRcIikuc3BsaXQoXCJtc1wiKVswXSkgPyAyIDogMSk7XG4gIH1cbiAgaWYgKGtleU1vZGlmaWVycy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIGZhbHNlO1xuICBpZiAoa2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gMSAmJiBrZXlUb01vZGlmaWVycyhlLmtleSkuaW5jbHVkZXMoa2V5TW9kaWZpZXJzWzBdKSlcbiAgICByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHN5c3RlbUtleU1vZGlmaWVycyA9IFtcImN0cmxcIiwgXCJzaGlmdFwiLCBcImFsdFwiLCBcIm1ldGFcIiwgXCJjbWRcIiwgXCJzdXBlclwiXTtcbiAgY29uc3Qgc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMgPSBzeXN0ZW1LZXlNb2RpZmllcnMuZmlsdGVyKChtb2RpZmllcikgPT4ga2V5TW9kaWZpZXJzLmluY2x1ZGVzKG1vZGlmaWVyKSk7XG4gIGtleU1vZGlmaWVycyA9IGtleU1vZGlmaWVycy5maWx0ZXIoKGkpID0+ICFzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5pbmNsdWRlcyhpKSk7XG4gIGlmIChzZWxlY3RlZFN5c3RlbUtleU1vZGlmaWVycy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgYWN0aXZlbHlQcmVzc2VkS2V5TW9kaWZpZXJzID0gc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMuZmlsdGVyKChtb2RpZmllcikgPT4ge1xuICAgICAgaWYgKG1vZGlmaWVyID09PSBcImNtZFwiIHx8IG1vZGlmaWVyID09PSBcInN1cGVyXCIpXG4gICAgICAgIG1vZGlmaWVyID0gXCJtZXRhXCI7XG4gICAgICByZXR1cm4gZVtgJHttb2RpZmllcn1LZXlgXTtcbiAgICB9KTtcbiAgICBpZiAoYWN0aXZlbHlQcmVzc2VkS2V5TW9kaWZpZXJzLmxlbmd0aCA9PT0gc2VsZWN0ZWRTeXN0ZW1LZXlNb2RpZmllcnMubGVuZ3RoKSB7XG4gICAgICBpZiAoa2V5VG9Nb2RpZmllcnMoZS5rZXkpLmluY2x1ZGVzKGtleU1vZGlmaWVyc1swXSkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBrZXlUb01vZGlmaWVycyhrZXkpIHtcbiAgaWYgKCFrZXkpXG4gICAgcmV0dXJuIFtdO1xuICBrZXkgPSBrZWJhYkNhc2UyKGtleSk7XG4gIGxldCBtb2RpZmllclRvS2V5TWFwID0ge1xuICAgIGN0cmw6IFwiY29udHJvbFwiLFxuICAgIHNsYXNoOiBcIi9cIixcbiAgICBzcGFjZTogXCItXCIsXG4gICAgc3BhY2ViYXI6IFwiLVwiLFxuICAgIGNtZDogXCJtZXRhXCIsXG4gICAgZXNjOiBcImVzY2FwZVwiLFxuICAgIHVwOiBcImFycm93LXVwXCIsXG4gICAgZG93bjogXCJhcnJvdy1kb3duXCIsXG4gICAgbGVmdDogXCJhcnJvdy1sZWZ0XCIsXG4gICAgcmlnaHQ6IFwiYXJyb3ctcmlnaHRcIixcbiAgICBwZXJpb2Q6IFwiLlwiLFxuICAgIGVxdWFsOiBcIj1cIlxuICB9O1xuICBtb2RpZmllclRvS2V5TWFwW2tleV0gPSBrZXk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhtb2RpZmllclRvS2V5TWFwKS5tYXAoKG1vZGlmaWVyKSA9PiB7XG4gICAgaWYgKG1vZGlmaWVyVG9LZXlNYXBbbW9kaWZpZXJdID09PSBrZXkpXG4gICAgICByZXR1cm4gbW9kaWZpZXI7XG4gIH0pLmZpbHRlcigobW9kaWZpZXIpID0+IG1vZGlmaWVyKTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1tb2RlbC5qc1xuZGlyZWN0aXZlKFwibW9kZWxcIiwgKGVsLCB7bW9kaWZpZXJzLCBleHByZXNzaW9ufSwge2VmZmVjdDogZWZmZWN0MywgY2xlYW51cDogY2xlYW51cDJ9KSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgbGV0IGFzc2lnbm1lbnRFeHByZXNzaW9uID0gYCR7ZXhwcmVzc2lvbn0gPSByaWdodFNpZGVPZkV4cHJlc3Npb24oJGV2ZW50LCAke2V4cHJlc3Npb259KWA7XG4gIGxldCBldmFsdWF0ZUFzc2lnbm1lbnQgPSBldmFsdWF0ZUxhdGVyKGVsLCBhc3NpZ25tZW50RXhwcmVzc2lvbik7XG4gIHZhciBldmVudCA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJzZWxlY3RcIiB8fCBbXCJjaGVja2JveFwiLCBcInJhZGlvXCJdLmluY2x1ZGVzKGVsLnR5cGUpIHx8IG1vZGlmaWVycy5pbmNsdWRlcyhcImxhenlcIikgPyBcImNoYW5nZVwiIDogXCJpbnB1dFwiO1xuICBsZXQgYXNzaWdtZW50RnVuY3Rpb24gPSBnZW5lcmF0ZUFzc2lnbm1lbnRGdW5jdGlvbihlbCwgbW9kaWZpZXJzLCBleHByZXNzaW9uKTtcbiAgbGV0IHJlbW92ZUxpc3RlbmVyID0gb24oZWwsIGV2ZW50LCBtb2RpZmllcnMsIChlKSA9PiB7XG4gICAgZXZhbHVhdGVBc3NpZ25tZW50KCgpID0+IHtcbiAgICB9LCB7c2NvcGU6IHtcbiAgICAgICRldmVudDogZSxcbiAgICAgIHJpZ2h0U2lkZU9mRXhwcmVzc2lvbjogYXNzaWdtZW50RnVuY3Rpb25cbiAgICB9fSk7XG4gIH0pO1xuICBpZiAoIWVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzKVxuICAgIGVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzID0ge307XG4gIGVsLl94X3JlbW92ZU1vZGVsTGlzdGVuZXJzW1wiZGVmYXVsdFwiXSA9IHJlbW92ZUxpc3RlbmVyO1xuICBjbGVhbnVwMigoKSA9PiBlbC5feF9yZW1vdmVNb2RlbExpc3RlbmVyc1tcImRlZmF1bHRcIl0oKSk7XG4gIGxldCBldmFsdWF0ZVNldE1vZGVsID0gZXZhbHVhdGVMYXRlcihlbCwgYCR7ZXhwcmVzc2lvbn0gPSBfX3BsYWNlaG9sZGVyYCk7XG4gIGVsLl94X21vZGVsID0ge1xuICAgIGdldCgpIHtcbiAgICAgIGxldCByZXN1bHQ7XG4gICAgICBldmFsdWF0ZTIoKHZhbHVlKSA9PiByZXN1bHQgPSB2YWx1ZSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgc2V0KHZhbHVlKSB7XG4gICAgICBldmFsdWF0ZVNldE1vZGVsKCgpID0+IHtcbiAgICAgIH0sIHtzY29wZToge19fcGxhY2Vob2xkZXI6IHZhbHVlfX0pO1xuICAgIH1cbiAgfTtcbiAgZWwuX3hfZm9yY2VNb2RlbFVwZGF0ZSA9ICgpID0+IHtcbiAgICBldmFsdWF0ZTIoKHZhbHVlKSA9PiB7XG4gICAgICBpZiAodmFsdWUgPT09IHZvaWQgMCAmJiBleHByZXNzaW9uLm1hdGNoKC9cXC4vKSlcbiAgICAgICAgdmFsdWUgPSBcIlwiO1xuICAgICAgd2luZG93LmZyb21Nb2RlbCA9IHRydWU7XG4gICAgICBtdXRhdGVEb20oKCkgPT4gYmluZChlbCwgXCJ2YWx1ZVwiLCB2YWx1ZSkpO1xuICAgICAgZGVsZXRlIHdpbmRvdy5mcm9tTW9kZWw7XG4gICAgfSk7XG4gIH07XG4gIGVmZmVjdDMoKCkgPT4ge1xuICAgIGlmIChtb2RpZmllcnMuaW5jbHVkZXMoXCJ1bmludHJ1c2l2ZVwiKSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmlzU2FtZU5vZGUoZWwpKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLl94X2ZvcmNlTW9kZWxVcGRhdGUoKTtcbiAgfSk7XG59KTtcbmZ1bmN0aW9uIGdlbmVyYXRlQXNzaWdubWVudEZ1bmN0aW9uKGVsLCBtb2RpZmllcnMsIGV4cHJlc3Npb24pIHtcbiAgaWYgKGVsLnR5cGUgPT09IFwicmFkaW9cIikge1xuICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICBpZiAoIWVsLmhhc0F0dHJpYnV0ZShcIm5hbWVcIikpXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgZXhwcmVzc2lvbik7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIChldmVudCwgY3VycmVudFZhbHVlKSA9PiB7XG4gICAgcmV0dXJuIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBDdXN0b21FdmVudCAmJiBldmVudC5kZXRhaWwgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gZXZlbnQuZGV0YWlsIHx8IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoZWwudHlwZSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkpIHtcbiAgICAgICAgICBsZXQgbmV3VmFsdWUgPSBtb2RpZmllcnMuaW5jbHVkZXMoXCJudW1iZXJcIikgPyBzYWZlUGFyc2VOdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlKSA6IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyBjdXJyZW50VmFsdWUuY29uY2F0KFtuZXdWYWx1ZV0pIDogY3VycmVudFZhbHVlLmZpbHRlcigoZWwyKSA9PiAhY2hlY2tlZEF0dHJMb29zZUNvbXBhcmUyKGVsMiwgbmV3VmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInNlbGVjdFwiICYmIGVsLm11bHRpcGxlKSB7XG4gICAgICAgIHJldHVybiBtb2RpZmllcnMuaW5jbHVkZXMoXCJudW1iZXJcIikgPyBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5zZWxlY3RlZE9wdGlvbnMpLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgbGV0IHJhd1ZhbHVlID0gb3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0O1xuICAgICAgICAgIHJldHVybiBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpO1xuICAgICAgICB9KSA6IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LnNlbGVjdGVkT3B0aW9ucykubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uLnZhbHVlIHx8IG9wdGlvbi50ZXh0O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCByYXdWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgcmV0dXJuIG1vZGlmaWVycy5pbmNsdWRlcyhcIm51bWJlclwiKSA/IHNhZmVQYXJzZU51bWJlcihyYXdWYWx1ZSkgOiBtb2RpZmllcnMuaW5jbHVkZXMoXCJ0cmltXCIpID8gcmF3VmFsdWUudHJpbSgpIDogcmF3VmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59XG5mdW5jdGlvbiBzYWZlUGFyc2VOdW1iZXIocmF3VmFsdWUpIHtcbiAgbGV0IG51bWJlciA9IHJhd1ZhbHVlID8gcGFyc2VGbG9hdChyYXdWYWx1ZSkgOiBudWxsO1xuICByZXR1cm4gaXNOdW1lcmljMihudW1iZXIpID8gbnVtYmVyIDogcmF3VmFsdWU7XG59XG5mdW5jdGlvbiBjaGVja2VkQXR0ckxvb3NlQ29tcGFyZTIodmFsdWVBLCB2YWx1ZUIpIHtcbiAgcmV0dXJuIHZhbHVlQSA9PSB2YWx1ZUI7XG59XG5mdW5jdGlvbiBpc051bWVyaWMyKHN1YmplY3QpIHtcbiAgcmV0dXJuICFBcnJheS5pc0FycmF5KHN1YmplY3QpICYmICFpc05hTihzdWJqZWN0KTtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1jbG9hay5qc1xuZGlyZWN0aXZlKFwiY2xvYWtcIiwgKGVsKSA9PiBxdWV1ZU1pY3JvdGFzaygoKSA9PiBtdXRhdGVEb20oKCkgPT4gZWwucmVtb3ZlQXR0cmlidXRlKHByZWZpeChcImNsb2FrXCIpKSkpKTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pbml0LmpzXG5hZGRJbml0U2VsZWN0b3IoKCkgPT4gYFske3ByZWZpeChcImluaXRcIil9XWApO1xuZGlyZWN0aXZlKFwiaW5pdFwiLCBza2lwRHVyaW5nQ2xvbmUoKGVsLCB7ZXhwcmVzc2lvbn0sIHtldmFsdWF0ZTogZXZhbHVhdGUyfSkgPT4ge1xuICBpZiAodHlwZW9mIGV4cHJlc3Npb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gISFleHByZXNzaW9uLnRyaW0oKSAmJiBldmFsdWF0ZTIoZXhwcmVzc2lvbiwge30sIGZhbHNlKTtcbiAgfVxuICByZXR1cm4gZXZhbHVhdGUyKGV4cHJlc3Npb24sIHt9LCBmYWxzZSk7XG59KSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtdGV4dC5qc1xuZGlyZWN0aXZlKFwidGV4dFwiLCAoZWwsIHtleHByZXNzaW9ufSwge2VmZmVjdDogZWZmZWN0MywgZXZhbHVhdGVMYXRlcjogZXZhbHVhdGVMYXRlcjJ9KSA9PiB7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyMihleHByZXNzaW9uKTtcbiAgZWZmZWN0MygoKSA9PiB7XG4gICAgZXZhbHVhdGUyKCh2YWx1ZSkgPT4ge1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWh0bWwuanNcbmRpcmVjdGl2ZShcImh0bWxcIiwgKGVsLCB7ZXhwcmVzc2lvbn0sIHtlZmZlY3Q6IGVmZmVjdDMsIGV2YWx1YXRlTGF0ZXI6IGV2YWx1YXRlTGF0ZXIyfSkgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXZhbHVhdGVMYXRlcjIoZXhwcmVzc2lvbik7XG4gIGVmZmVjdDMoKCkgPT4ge1xuICAgIGV2YWx1YXRlMigodmFsdWUpID0+IHtcbiAgICAgIG11dGF0ZURvbSgoKSA9PiB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IHZhbHVlO1xuICAgICAgICBlbC5feF9pZ25vcmVTZWxmID0gdHJ1ZTtcbiAgICAgICAgaW5pdFRyZWUoZWwpO1xuICAgICAgICBkZWxldGUgZWwuX3hfaWdub3JlU2VsZjtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LWJpbmQuanNcbm1hcEF0dHJpYnV0ZXMoc3RhcnRpbmdXaXRoKFwiOlwiLCBpbnRvKHByZWZpeChcImJpbmQ6XCIpKSkpO1xuZGlyZWN0aXZlKFwiYmluZFwiLCAoZWwsIHt2YWx1ZSwgbW9kaWZpZXJzLCBleHByZXNzaW9uLCBvcmlnaW5hbH0sIHtlZmZlY3Q6IGVmZmVjdDN9KSA9PiB7XG4gIGlmICghdmFsdWUpIHtcbiAgICBsZXQgYmluZGluZ1Byb3ZpZGVycyA9IHt9O1xuICAgIGluamVjdEJpbmRpbmdQcm92aWRlcnMoYmluZGluZ1Byb3ZpZGVycyk7XG4gICAgbGV0IGdldEJpbmRpbmdzID0gZXZhbHVhdGVMYXRlcihlbCwgZXhwcmVzc2lvbik7XG4gICAgZ2V0QmluZGluZ3MoKGJpbmRpbmdzKSA9PiB7XG4gICAgICBhcHBseUJpbmRpbmdzT2JqZWN0KGVsLCBiaW5kaW5ncywgb3JpZ2luYWwpO1xuICAgIH0sIHtzY29wZTogYmluZGluZ1Byb3ZpZGVyc30pO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodmFsdWUgPT09IFwia2V5XCIpXG4gICAgcmV0dXJuIHN0b3JlS2V5Rm9yWEZvcihlbCwgZXhwcmVzc2lvbik7XG4gIGxldCBldmFsdWF0ZTIgPSBldmFsdWF0ZUxhdGVyKGVsLCBleHByZXNzaW9uKTtcbiAgZWZmZWN0MygoKSA9PiBldmFsdWF0ZTIoKHJlc3VsdCkgPT4ge1xuICAgIGlmIChyZXN1bHQgPT09IHZvaWQgMCAmJiBleHByZXNzaW9uLm1hdGNoKC9cXC4vKSlcbiAgICAgIHJlc3VsdCA9IFwiXCI7XG4gICAgbXV0YXRlRG9tKCgpID0+IGJpbmQoZWwsIHZhbHVlLCByZXN1bHQsIG1vZGlmaWVycykpO1xuICB9KSk7XG59KTtcbmZ1bmN0aW9uIHN0b3JlS2V5Rm9yWEZvcihlbCwgZXhwcmVzc2lvbikge1xuICBlbC5feF9rZXlFeHByZXNzaW9uID0gZXhwcmVzc2lvbjtcbn1cblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1kYXRhLmpzXG5hZGRSb290U2VsZWN0b3IoKCkgPT4gYFske3ByZWZpeChcImRhdGFcIil9XWApO1xuZGlyZWN0aXZlKFwiZGF0YVwiLCBza2lwRHVyaW5nQ2xvbmUoKGVsLCB7ZXhwcmVzc2lvbn0sIHtjbGVhbnVwOiBjbGVhbnVwMn0pID0+IHtcbiAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24gPT09IFwiXCIgPyBcInt9XCIgOiBleHByZXNzaW9uO1xuICBsZXQgbWFnaWNDb250ZXh0ID0ge307XG4gIGxldCBjbGVhbnVwMSA9IGluamVjdE1hZ2ljcyhtYWdpY0NvbnRleHQsIGVsKS5jbGVhbnVwO1xuICBsZXQgZGF0YVByb3ZpZGVyQ29udGV4dCA9IHt9O1xuICBpbmplY3REYXRhUHJvdmlkZXJzKGRhdGFQcm92aWRlckNvbnRleHQsIG1hZ2ljQ29udGV4dCk7XG4gIGxldCBkYXRhMiA9IGV2YWx1YXRlKGVsLCBleHByZXNzaW9uLCB7c2NvcGU6IGRhdGFQcm92aWRlckNvbnRleHR9KTtcbiAgaWYgKGRhdGEyID09PSB2b2lkIDApXG4gICAgZGF0YTIgPSB7fTtcbiAgbGV0IGNsZWFudXAyMiA9IGluamVjdE1hZ2ljcyhkYXRhMiwgZWwpLmNsZWFudXA7XG4gIGxldCByZWFjdGl2ZURhdGEgPSByZWFjdGl2ZShkYXRhMik7XG4gIGluaXRJbnRlcmNlcHRvcnMocmVhY3RpdmVEYXRhKTtcbiAgbGV0IHVuZG8gPSBhZGRTY29wZVRvTm9kZShlbCwgcmVhY3RpdmVEYXRhKTtcbiAgcmVhY3RpdmVEYXRhW1wiaW5pdFwiXSAmJiBldmFsdWF0ZShlbCwgcmVhY3RpdmVEYXRhW1wiaW5pdFwiXSk7XG4gIGNsZWFudXAyKCgpID0+IHtcbiAgICB1bmRvKCk7XG4gICAgY2xlYW51cDEoKTtcbiAgICBjbGVhbnVwMjIoKTtcbiAgICByZWFjdGl2ZURhdGFbXCJkZXN0cm95XCJdICYmIGV2YWx1YXRlKGVsLCByZWFjdGl2ZURhdGFbXCJkZXN0cm95XCJdKTtcbiAgICB1bmRvKCk7XG4gIH0pO1xufSkpO1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9zcmMvZGlyZWN0aXZlcy94LXNob3cuanNcbmRpcmVjdGl2ZShcInNob3dcIiwgKGVsLCB7bW9kaWZpZXJzLCBleHByZXNzaW9ufSwge2VmZmVjdDogZWZmZWN0M30pID0+IHtcbiAgbGV0IGV2YWx1YXRlMiA9IGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pO1xuICBpZiAoIWVsLl94X2RvSGlkZSlcbiAgICBlbC5feF9kb0hpZGUgPSAoKSA9PiB7XG4gICAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5zZXRQcm9wZXJ0eShcImRpc3BsYXlcIiwgXCJub25lXCIsIG1vZGlmaWVycy5pbmNsdWRlcyhcImltcG9ydGFudFwiKSA/IFwiaW1wb3J0YW50XCIgOiB2b2lkIDApO1xuICAgICAgfSk7XG4gICAgfTtcbiAgaWYgKCFlbC5feF9kb1Nob3cpXG4gICAgZWwuX3hfZG9TaG93ID0gKCkgPT4ge1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgaWYgKGVsLnN0eWxlLmxlbmd0aCA9PT0gMSAmJiBlbC5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiZGlzcGxheVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgbGV0IGhpZGUgPSAoKSA9PiB7XG4gICAgZWwuX3hfZG9IaWRlKCk7XG4gICAgZWwuX3hfaXNTaG93biA9IGZhbHNlO1xuICB9O1xuICBsZXQgc2hvdyA9ICgpID0+IHtcbiAgICBlbC5feF9kb1Nob3coKTtcbiAgICBlbC5feF9pc1Nob3duID0gdHJ1ZTtcbiAgfTtcbiAgbGV0IGNsaWNrQXdheUNvbXBhdGlibGVTaG93ID0gKCkgPT4gc2V0VGltZW91dChzaG93KTtcbiAgbGV0IHRvZ2dsZSA9IG9uY2UoKHZhbHVlKSA9PiB2YWx1ZSA/IHNob3coKSA6IGhpZGUoKSwgKHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbC5feF90b2dnbGVBbmRDYXNjYWRlV2l0aFRyYW5zaXRpb25zID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGVsLl94X3RvZ2dsZUFuZENhc2NhZGVXaXRoVHJhbnNpdGlvbnMoZWwsIHZhbHVlLCBzaG93LCBoaWRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgPyBjbGlja0F3YXlDb21wYXRpYmxlU2hvdygpIDogaGlkZSgpO1xuICAgIH1cbiAgfSk7XG4gIGxldCBvbGRWYWx1ZTtcbiAgbGV0IGZpcnN0VGltZSA9IHRydWU7XG4gIGVmZmVjdDMoKCkgPT4gZXZhbHVhdGUyKCh2YWx1ZSkgPT4ge1xuICAgIGlmICghZmlyc3RUaW1lICYmIHZhbHVlID09PSBvbGRWYWx1ZSlcbiAgICAgIHJldHVybjtcbiAgICBpZiAobW9kaWZpZXJzLmluY2x1ZGVzKFwiaW1tZWRpYXRlXCIpKVxuICAgICAgdmFsdWUgPyBjbGlja0F3YXlDb21wYXRpYmxlU2hvdygpIDogaGlkZSgpO1xuICAgIHRvZ2dsZSh2YWx1ZSk7XG4gICAgb2xkVmFsdWUgPSB2YWx1ZTtcbiAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgfSkpO1xufSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtZm9yLmpzXG5kaXJlY3RpdmUoXCJmb3JcIiwgKGVsLCB7ZXhwcmVzc2lvbn0sIHtlZmZlY3Q6IGVmZmVjdDMsIGNsZWFudXA6IGNsZWFudXAyfSkgPT4ge1xuICBsZXQgaXRlcmF0b3JOYW1lcyA9IHBhcnNlRm9yRXhwcmVzc2lvbihleHByZXNzaW9uKTtcbiAgbGV0IGV2YWx1YXRlSXRlbXMgPSBldmFsdWF0ZUxhdGVyKGVsLCBpdGVyYXRvck5hbWVzLml0ZW1zKTtcbiAgbGV0IGV2YWx1YXRlS2V5ID0gZXZhbHVhdGVMYXRlcihlbCwgZWwuX3hfa2V5RXhwcmVzc2lvbiB8fCBcImluZGV4XCIpO1xuICBlbC5feF9wcmV2S2V5cyA9IFtdO1xuICBlbC5feF9sb29rdXAgPSB7fTtcbiAgZWZmZWN0MygoKSA9PiBsb29wKGVsLCBpdGVyYXRvck5hbWVzLCBldmFsdWF0ZUl0ZW1zLCBldmFsdWF0ZUtleSkpO1xuICBjbGVhbnVwMigoKSA9PiB7XG4gICAgT2JqZWN0LnZhbHVlcyhlbC5feF9sb29rdXApLmZvckVhY2goKGVsMikgPT4gZWwyLnJlbW92ZSgpKTtcbiAgICBkZWxldGUgZWwuX3hfcHJldktleXM7XG4gICAgZGVsZXRlIGVsLl94X2xvb2t1cDtcbiAgfSk7XG59KTtcbmZ1bmN0aW9uIGxvb3AoZWwsIGl0ZXJhdG9yTmFtZXMsIGV2YWx1YXRlSXRlbXMsIGV2YWx1YXRlS2V5KSB7XG4gIGxldCBpc09iamVjdDIgPSAoaSkgPT4gdHlwZW9mIGkgPT09IFwib2JqZWN0XCIgJiYgIUFycmF5LmlzQXJyYXkoaSk7XG4gIGxldCB0ZW1wbGF0ZUVsID0gZWw7XG4gIGV2YWx1YXRlSXRlbXMoKGl0ZW1zKSA9PiB7XG4gICAgaWYgKGlzTnVtZXJpYzMoaXRlbXMpICYmIGl0ZW1zID49IDApIHtcbiAgICAgIGl0ZW1zID0gQXJyYXkuZnJvbShBcnJheShpdGVtcykua2V5cygpLCAoaSkgPT4gaSArIDEpO1xuICAgIH1cbiAgICBpZiAoaXRlbXMgPT09IHZvaWQgMClcbiAgICAgIGl0ZW1zID0gW107XG4gICAgbGV0IGxvb2t1cCA9IGVsLl94X2xvb2t1cDtcbiAgICBsZXQgcHJldktleXMgPSBlbC5feF9wcmV2S2V5cztcbiAgICBsZXQgc2NvcGVzID0gW107XG4gICAgbGV0IGtleXMgPSBbXTtcbiAgICBpZiAoaXNPYmplY3QyKGl0ZW1zKSkge1xuICAgICAgaXRlbXMgPSBPYmplY3QuZW50cmllcyhpdGVtcykubWFwKChba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgICAgbGV0IHNjb3BlMiA9IGdldEl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKGl0ZXJhdG9yTmFtZXMsIHZhbHVlLCBrZXksIGl0ZW1zKTtcbiAgICAgICAgZXZhbHVhdGVLZXkoKHZhbHVlMikgPT4ga2V5cy5wdXNoKHZhbHVlMiksIHtzY29wZToge2luZGV4OiBrZXksIC4uLnNjb3BlMn19KTtcbiAgICAgICAgc2NvcGVzLnB1c2goc2NvcGUyKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGxldCBzY29wZTIgPSBnZXRJdGVyYXRpb25TY29wZVZhcmlhYmxlcyhpdGVyYXRvck5hbWVzLCBpdGVtc1tpXSwgaSwgaXRlbXMpO1xuICAgICAgICBldmFsdWF0ZUtleSgodmFsdWUpID0+IGtleXMucHVzaCh2YWx1ZSksIHtzY29wZToge2luZGV4OiBpLCAuLi5zY29wZTJ9fSk7XG4gICAgICAgIHNjb3Blcy5wdXNoKHNjb3BlMik7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBhZGRzID0gW107XG4gICAgbGV0IG1vdmVzID0gW107XG4gICAgbGV0IHJlbW92ZXMgPSBbXTtcbiAgICBsZXQgc2FtZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQga2V5ID0gcHJldktleXNbaV07XG4gICAgICBpZiAoa2V5cy5pbmRleE9mKGtleSkgPT09IC0xKVxuICAgICAgICByZW1vdmVzLnB1c2goa2V5KTtcbiAgICB9XG4gICAgcHJldktleXMgPSBwcmV2S2V5cy5maWx0ZXIoKGtleSkgPT4gIXJlbW92ZXMuaW5jbHVkZXMoa2V5KSk7XG4gICAgbGV0IGxhc3RLZXkgPSBcInRlbXBsYXRlXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQga2V5ID0ga2V5c1tpXTtcbiAgICAgIGxldCBwcmV2SW5kZXggPSBwcmV2S2V5cy5pbmRleE9mKGtleSk7XG4gICAgICBpZiAocHJldkluZGV4ID09PSAtMSkge1xuICAgICAgICBwcmV2S2V5cy5zcGxpY2UoaSwgMCwga2V5KTtcbiAgICAgICAgYWRkcy5wdXNoKFtsYXN0S2V5LCBpXSk7XG4gICAgICB9IGVsc2UgaWYgKHByZXZJbmRleCAhPT0gaSkge1xuICAgICAgICBsZXQga2V5SW5TcG90ID0gcHJldktleXMuc3BsaWNlKGksIDEpWzBdO1xuICAgICAgICBsZXQga2V5Rm9yU3BvdCA9IHByZXZLZXlzLnNwbGljZShwcmV2SW5kZXggLSAxLCAxKVswXTtcbiAgICAgICAgcHJldktleXMuc3BsaWNlKGksIDAsIGtleUZvclNwb3QpO1xuICAgICAgICBwcmV2S2V5cy5zcGxpY2UocHJldkluZGV4LCAwLCBrZXlJblNwb3QpO1xuICAgICAgICBtb3Zlcy5wdXNoKFtrZXlJblNwb3QsIGtleUZvclNwb3RdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNhbWVzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICAgIGxhc3RLZXkgPSBrZXk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGtleSA9IHJlbW92ZXNbaV07XG4gICAgICBpZiAoISFsb29rdXBba2V5XS5feF9lZmZlY3RzKSB7XG4gICAgICAgIGxvb2t1cFtrZXldLl94X2VmZmVjdHMuZm9yRWFjaChkZXF1ZXVlSm9iKTtcbiAgICAgIH1cbiAgICAgIGxvb2t1cFtrZXldLnJlbW92ZSgpO1xuICAgICAgbG9va3VwW2tleV0gPSBudWxsO1xuICAgICAgZGVsZXRlIGxvb2t1cFtrZXldO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vdmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgW2tleUluU3BvdCwga2V5Rm9yU3BvdF0gPSBtb3Zlc1tpXTtcbiAgICAgIGxldCBlbEluU3BvdCA9IGxvb2t1cFtrZXlJblNwb3RdO1xuICAgICAgbGV0IGVsRm9yU3BvdCA9IGxvb2t1cFtrZXlGb3JTcG90XTtcbiAgICAgIGxldCBtYXJrZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgZWxGb3JTcG90LmFmdGVyKG1hcmtlcik7XG4gICAgICAgIGVsSW5TcG90LmFmdGVyKGVsRm9yU3BvdCk7XG4gICAgICAgIGVsRm9yU3BvdC5feF9jdXJyZW50SWZFbCAmJiBlbEZvclNwb3QuYWZ0ZXIoZWxGb3JTcG90Ll94X2N1cnJlbnRJZkVsKTtcbiAgICAgICAgbWFya2VyLmJlZm9yZShlbEluU3BvdCk7XG4gICAgICAgIGVsSW5TcG90Ll94X2N1cnJlbnRJZkVsICYmIGVsSW5TcG90LmFmdGVyKGVsSW5TcG90Ll94X2N1cnJlbnRJZkVsKTtcbiAgICAgICAgbWFya2VyLnJlbW92ZSgpO1xuICAgICAgfSk7XG4gICAgICByZWZyZXNoU2NvcGUoZWxGb3JTcG90LCBzY29wZXNba2V5cy5pbmRleE9mKGtleUZvclNwb3QpXSk7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWRkcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IFtsYXN0S2V5MiwgaW5kZXhdID0gYWRkc1tpXTtcbiAgICAgIGxldCBsYXN0RWwgPSBsYXN0S2V5MiA9PT0gXCJ0ZW1wbGF0ZVwiID8gdGVtcGxhdGVFbCA6IGxvb2t1cFtsYXN0S2V5Ml07XG4gICAgICBpZiAobGFzdEVsLl94X2N1cnJlbnRJZkVsKVxuICAgICAgICBsYXN0RWwgPSBsYXN0RWwuX3hfY3VycmVudElmRWw7XG4gICAgICBsZXQgc2NvcGUyID0gc2NvcGVzW2luZGV4XTtcbiAgICAgIGxldCBrZXkgPSBrZXlzW2luZGV4XTtcbiAgICAgIGxldCBjbG9uZTIgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRlbXBsYXRlRWwuY29udGVudCwgdHJ1ZSkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBhZGRTY29wZVRvTm9kZShjbG9uZTIsIHJlYWN0aXZlKHNjb3BlMiksIHRlbXBsYXRlRWwpO1xuICAgICAgbXV0YXRlRG9tKCgpID0+IHtcbiAgICAgICAgbGFzdEVsLmFmdGVyKGNsb25lMik7XG4gICAgICAgIGluaXRUcmVlKGNsb25lMik7XG4gICAgICB9KTtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHdhcm4oXCJ4LWZvciBrZXkgY2Fubm90IGJlIGFuIG9iamVjdCwgaXQgbXVzdCBiZSBhIHN0cmluZyBvciBhbiBpbnRlZ2VyXCIsIHRlbXBsYXRlRWwpO1xuICAgICAgfVxuICAgICAgbG9va3VwW2tleV0gPSBjbG9uZTI7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlZnJlc2hTY29wZShsb29rdXBbc2FtZXNbaV1dLCBzY29wZXNba2V5cy5pbmRleE9mKHNhbWVzW2ldKV0pO1xuICAgIH1cbiAgICB0ZW1wbGF0ZUVsLl94X3ByZXZLZXlzID0ga2V5cztcbiAgfSk7XG59XG5mdW5jdGlvbiBwYXJzZUZvckV4cHJlc3Npb24oZXhwcmVzc2lvbikge1xuICBsZXQgZm9ySXRlcmF0b3JSRSA9IC8sKFteLFxcfVxcXV0qKSg/OiwoW14sXFx9XFxdXSopKT8kLztcbiAgbGV0IHN0cmlwUGFyZW5zUkUgPSAvXlxccypcXCh8XFwpXFxzKiQvZztcbiAgbGV0IGZvckFsaWFzUkUgPSAvKFtcXHNcXFNdKj8pXFxzKyg/OmlufG9mKVxccysoW1xcc1xcU10qKS87XG4gIGxldCBpbk1hdGNoID0gZXhwcmVzc2lvbi5tYXRjaChmb3JBbGlhc1JFKTtcbiAgaWYgKCFpbk1hdGNoKVxuICAgIHJldHVybjtcbiAgbGV0IHJlcyA9IHt9O1xuICByZXMuaXRlbXMgPSBpbk1hdGNoWzJdLnRyaW0oKTtcbiAgbGV0IGl0ZW0gPSBpbk1hdGNoWzFdLnJlcGxhY2Uoc3RyaXBQYXJlbnNSRSwgXCJcIikudHJpbSgpO1xuICBsZXQgaXRlcmF0b3JNYXRjaCA9IGl0ZW0ubWF0Y2goZm9ySXRlcmF0b3JSRSk7XG4gIGlmIChpdGVyYXRvck1hdGNoKSB7XG4gICAgcmVzLml0ZW0gPSBpdGVtLnJlcGxhY2UoZm9ySXRlcmF0b3JSRSwgXCJcIikudHJpbSgpO1xuICAgIHJlcy5pbmRleCA9IGl0ZXJhdG9yTWF0Y2hbMV0udHJpbSgpO1xuICAgIGlmIChpdGVyYXRvck1hdGNoWzJdKSB7XG4gICAgICByZXMuY29sbGVjdGlvbiA9IGl0ZXJhdG9yTWF0Y2hbMl0udHJpbSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXMuaXRlbSA9IGl0ZW07XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGdldEl0ZXJhdGlvblNjb3BlVmFyaWFibGVzKGl0ZXJhdG9yTmFtZXMsIGl0ZW0sIGluZGV4LCBpdGVtcykge1xuICBsZXQgc2NvcGVWYXJpYWJsZXMgPSB7fTtcbiAgaWYgKC9eXFxbLipcXF0kLy50ZXN0KGl0ZXJhdG9yTmFtZXMuaXRlbSkgJiYgQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgIGxldCBuYW1lcyA9IGl0ZXJhdG9yTmFtZXMuaXRlbS5yZXBsYWNlKFwiW1wiLCBcIlwiKS5yZXBsYWNlKFwiXVwiLCBcIlwiKS5zcGxpdChcIixcIikubWFwKChpKSA9PiBpLnRyaW0oKSk7XG4gICAgbmFtZXMuZm9yRWFjaCgobmFtZSwgaSkgPT4ge1xuICAgICAgc2NvcGVWYXJpYWJsZXNbbmFtZV0gPSBpdGVtW2ldO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKC9eXFx7LipcXH0kLy50ZXN0KGl0ZXJhdG9yTmFtZXMuaXRlbSkgJiYgIUFycmF5LmlzQXJyYXkoaXRlbSkgJiYgdHlwZW9mIGl0ZW0gPT09IFwib2JqZWN0XCIpIHtcbiAgICBsZXQgbmFtZXMgPSBpdGVyYXRvck5hbWVzLml0ZW0ucmVwbGFjZShcIntcIiwgXCJcIikucmVwbGFjZShcIn1cIiwgXCJcIikuc3BsaXQoXCIsXCIpLm1hcCgoaSkgPT4gaS50cmltKCkpO1xuICAgIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICAgIHNjb3BlVmFyaWFibGVzW25hbWVdID0gaXRlbVtuYW1lXTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLml0ZW1dID0gaXRlbTtcbiAgfVxuICBpZiAoaXRlcmF0b3JOYW1lcy5pbmRleClcbiAgICBzY29wZVZhcmlhYmxlc1tpdGVyYXRvck5hbWVzLmluZGV4XSA9IGluZGV4O1xuICBpZiAoaXRlcmF0b3JOYW1lcy5jb2xsZWN0aW9uKVxuICAgIHNjb3BlVmFyaWFibGVzW2l0ZXJhdG9yTmFtZXMuY29sbGVjdGlvbl0gPSBpdGVtcztcbiAgcmV0dXJuIHNjb3BlVmFyaWFibGVzO1xufVxuZnVuY3Rpb24gaXNOdW1lcmljMyhzdWJqZWN0KSB7XG4gIHJldHVybiAhQXJyYXkuaXNBcnJheShzdWJqZWN0KSAmJiAhaXNOYU4oc3ViamVjdCk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtcmVmLmpzXG5mdW5jdGlvbiBoYW5kbGVyMigpIHtcbn1cbmhhbmRsZXIyLmlubGluZSA9IChlbCwge2V4cHJlc3Npb259LCB7Y2xlYW51cDogY2xlYW51cDJ9KSA9PiB7XG4gIGxldCByb290ID0gY2xvc2VzdFJvb3QoZWwpO1xuICBpZiAoIXJvb3QuX3hfcmVmcylcbiAgICByb290Ll94X3JlZnMgPSB7fTtcbiAgcm9vdC5feF9yZWZzW2V4cHJlc3Npb25dID0gZWw7XG4gIGNsZWFudXAyKCgpID0+IGRlbGV0ZSByb290Ll94X3JlZnNbZXhwcmVzc2lvbl0pO1xufTtcbmRpcmVjdGl2ZShcInJlZlwiLCBoYW5kbGVyMik7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtaWYuanNcbmRpcmVjdGl2ZShcImlmXCIsIChlbCwge2V4cHJlc3Npb259LCB7ZWZmZWN0OiBlZmZlY3QzLCBjbGVhbnVwOiBjbGVhbnVwMn0pID0+IHtcbiAgbGV0IGV2YWx1YXRlMiA9IGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pO1xuICBsZXQgc2hvdyA9ICgpID0+IHtcbiAgICBpZiAoZWwuX3hfY3VycmVudElmRWwpXG4gICAgICByZXR1cm4gZWwuX3hfY3VycmVudElmRWw7XG4gICAgbGV0IGNsb25lMiA9IGVsLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGFkZFNjb3BlVG9Ob2RlKGNsb25lMiwge30sIGVsKTtcbiAgICBtdXRhdGVEb20oKCkgPT4ge1xuICAgICAgZWwuYWZ0ZXIoY2xvbmUyKTtcbiAgICAgIGluaXRUcmVlKGNsb25lMik7XG4gICAgfSk7XG4gICAgZWwuX3hfY3VycmVudElmRWwgPSBjbG9uZTI7XG4gICAgZWwuX3hfdW5kb0lmID0gKCkgPT4ge1xuICAgICAgd2FsayhjbG9uZTIsIChub2RlKSA9PiB7XG4gICAgICAgIGlmICghIW5vZGUuX3hfZWZmZWN0cykge1xuICAgICAgICAgIG5vZGUuX3hfZWZmZWN0cy5mb3JFYWNoKGRlcXVldWVKb2IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNsb25lMi5yZW1vdmUoKTtcbiAgICAgIGRlbGV0ZSBlbC5feF9jdXJyZW50SWZFbDtcbiAgICB9O1xuICAgIHJldHVybiBjbG9uZTI7XG4gIH07XG4gIGxldCBoaWRlID0gKCkgPT4ge1xuICAgIGlmICghZWwuX3hfdW5kb0lmKVxuICAgICAgcmV0dXJuO1xuICAgIGVsLl94X3VuZG9JZigpO1xuICAgIGRlbGV0ZSBlbC5feF91bmRvSWY7XG4gIH07XG4gIGVmZmVjdDMoKCkgPT4gZXZhbHVhdGUyKCh2YWx1ZSkgPT4ge1xuICAgIHZhbHVlID8gc2hvdygpIDogaGlkZSgpO1xuICB9KSk7XG4gIGNsZWFudXAyKCgpID0+IGVsLl94X3VuZG9JZiAmJiBlbC5feF91bmRvSWYoKSk7XG59KTtcblxuLy8gcGFja2FnZXMvYWxwaW5lanMvc3JjL2RpcmVjdGl2ZXMveC1pZC5qc1xuZGlyZWN0aXZlKFwiaWRcIiwgKGVsLCB7ZXhwcmVzc2lvbn0sIHtldmFsdWF0ZTogZXZhbHVhdGUyfSkgPT4ge1xuICBsZXQgbmFtZXMgPSBldmFsdWF0ZTIoZXhwcmVzc2lvbik7XG4gIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHNldElkUm9vdChlbCwgbmFtZSkpO1xufSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL3gtb24uanNcbm1hcEF0dHJpYnV0ZXMoc3RhcnRpbmdXaXRoKFwiQFwiLCBpbnRvKHByZWZpeChcIm9uOlwiKSkpKTtcbmRpcmVjdGl2ZShcIm9uXCIsIHNraXBEdXJpbmdDbG9uZSgoZWwsIHt2YWx1ZSwgbW9kaWZpZXJzLCBleHByZXNzaW9ufSwge2NsZWFudXA6IGNsZWFudXAyfSkgPT4ge1xuICBsZXQgZXZhbHVhdGUyID0gZXhwcmVzc2lvbiA/IGV2YWx1YXRlTGF0ZXIoZWwsIGV4cHJlc3Npb24pIDogKCkgPT4ge1xuICB9O1xuICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInRlbXBsYXRlXCIpIHtcbiAgICBpZiAoIWVsLl94X2ZvcndhcmRFdmVudHMpXG4gICAgICBlbC5feF9mb3J3YXJkRXZlbnRzID0gW107XG4gICAgaWYgKCFlbC5feF9mb3J3YXJkRXZlbnRzLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgIGVsLl94X2ZvcndhcmRFdmVudHMucHVzaCh2YWx1ZSk7XG4gIH1cbiAgbGV0IHJlbW92ZUxpc3RlbmVyID0gb24oZWwsIHZhbHVlLCBtb2RpZmllcnMsIChlKSA9PiB7XG4gICAgZXZhbHVhdGUyKCgpID0+IHtcbiAgICB9LCB7c2NvcGU6IHskZXZlbnQ6IGV9LCBwYXJhbXM6IFtlXX0pO1xuICB9KTtcbiAgY2xlYW51cDIoKCkgPT4gcmVtb3ZlTGlzdGVuZXIoKSk7XG59KSk7XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9kaXJlY3RpdmVzL2luZGV4LmpzXG53YXJuTWlzc2luZ1BsdWdpbkRpcmVjdGl2ZShcIkNvbGxhcHNlXCIsIFwiY29sbGFwc2VcIiwgXCJjb2xsYXBzZVwiKTtcbndhcm5NaXNzaW5nUGx1Z2luRGlyZWN0aXZlKFwiSW50ZXJzZWN0XCIsIFwiaW50ZXJzZWN0XCIsIFwiaW50ZXJzZWN0XCIpO1xud2Fybk1pc3NpbmdQbHVnaW5EaXJlY3RpdmUoXCJGb2N1c1wiLCBcInRyYXBcIiwgXCJmb2N1c1wiKTtcbndhcm5NaXNzaW5nUGx1Z2luRGlyZWN0aXZlKFwiTWFza1wiLCBcIm1hc2tcIiwgXCJtYXNrXCIpO1xuZnVuY3Rpb24gd2Fybk1pc3NpbmdQbHVnaW5EaXJlY3RpdmUobmFtZSwgZGlyZWN0aXZlTmFtZTIsIHNsdWcpIHtcbiAgZGlyZWN0aXZlKGRpcmVjdGl2ZU5hbWUyLCAoZWwpID0+IHdhcm4oYFlvdSBjYW4ndCB1c2UgW3gtJHtkaXJlY3RpdmVOYW1lMn1dIHdpdGhvdXQgZmlyc3QgaW5zdGFsbGluZyB0aGUgXCIke25hbWV9XCIgcGx1Z2luIGhlcmU6IGh0dHBzOi8vYWxwaW5lanMuZGV2L3BsdWdpbnMvJHtzbHVnfWAsIGVsKSk7XG59XG5cbi8vIHBhY2thZ2VzL2FscGluZWpzL3NyYy9pbmRleC5qc1xuYWxwaW5lX2RlZmF1bHQuc2V0RXZhbHVhdG9yKG5vcm1hbEV2YWx1YXRvcik7XG5hbHBpbmVfZGVmYXVsdC5zZXRSZWFjdGl2aXR5RW5naW5lKHtyZWFjdGl2ZTogcmVhY3RpdmUyLCBlZmZlY3Q6IGVmZmVjdDIsIHJlbGVhc2U6IHN0b3AsIHJhdzogdG9SYXd9KTtcbnZhciBzcmNfZGVmYXVsdCA9IGFscGluZV9kZWZhdWx0O1xuXG4vLyBwYWNrYWdlcy9hbHBpbmVqcy9idWlsZHMvbW9kdWxlLmpzXG52YXIgbW9kdWxlX2RlZmF1bHQgPSBzcmNfZGVmYXVsdDtcbmV4cG9ydCB7XG4gIG1vZHVsZV9kZWZhdWx0IGFzIGRlZmF1bHRcbn07XG4iLCAiaW1wb3J0IHsgbmV3TGFuZ0NvbnRyb2xsZXIsIG5ld1NlYXJjaENvbnRyb2xsZXIsIG5ld1RvQ0NvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXJzJztcbmltcG9ydCBBbHBpbmUgZnJvbSAnanNsaWJzL2FscGluZWpzL3YzL2FscGluZWpzL2Rpc3QvbW9kdWxlLmVzbS5qcyc7XG5cbi8vIFJlZ2lzdGVyIEFscGluZUpTIGRhdGEgY29udHJvbGxlcnMuXG5BbHBpbmUuZGF0YSgnc2VhcmNoQ29udHJvbGxlcicsIG5ld1NlYXJjaENvbnRyb2xsZXIpO1xuQWxwaW5lLmRhdGEoJ3RvY0NvbnRyb2xsZXInLCBuZXdUb0NDb250cm9sbGVyKTtcbkFscGluZS5kYXRhKCdsYW5nQ29udHJvbGxlcicsIG5ld0xhbmdDb250cm9sbGVyKTtcblxuLy8gU3RhcnQgQWxwaW5lSlMuXG5BbHBpbmUuc3RhcnQoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBTUMsT0FBQyxXQUFVO0FBaUNaLFlBQUlBLFFBQU8sU0FBVSxRQUFRO0FBQzNCLGNBQUksVUFBVSxJQUFJQSxNQUFLO0FBRXZCLGtCQUFRLFNBQVM7QUFBQSxZQUNmQSxNQUFLO0FBQUEsWUFDTEEsTUFBSztBQUFBLFlBQ0xBLE1BQUs7QUFBQSxVQUNQO0FBRUEsa0JBQVEsZUFBZTtBQUFBLFlBQ3JCQSxNQUFLO0FBQUEsVUFDUDtBQUVBLGlCQUFPLEtBQUssU0FBUyxPQUFPO0FBQzVCLGlCQUFPLFFBQVEsTUFBTTtBQUFBLFFBQ3ZCO0FBRUEsUUFBQUEsTUFBSyxVQUFVO0FBVWYsUUFBQUEsTUFBSyxRQUFRLENBQUM7QUFTZCxRQUFBQSxNQUFLLE1BQU0sT0FBUSwwQkFBVSxRQUFRO0FBRW5DLGlCQUFPLFNBQVUsU0FBUztBQUN4QixnQkFBSSxPQUFPLFdBQVcsUUFBUSxNQUFNO0FBQ2xDLHNCQUFRLEtBQUssT0FBTztBQUFBLFlBQ3RCO0FBQUEsVUFDRjtBQUFBLFFBRUYsR0FBRyxJQUFJO0FBYVAsUUFBQUEsTUFBSyxNQUFNLFdBQVcsU0FBVSxLQUFLO0FBQ25DLGNBQUksUUFBUSxVQUFVLFFBQVEsTUFBTTtBQUNsQyxtQkFBTztBQUFBLFVBQ1QsT0FBTztBQUNMLG1CQUFPLElBQUksU0FBUztBQUFBLFVBQ3RCO0FBQUEsUUFDRjtBQWtCQSxRQUFBQSxNQUFLLE1BQU0sUUFBUSxTQUFVLEtBQUs7QUFDaEMsY0FBSSxRQUFRLFFBQVEs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QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUVELFFBQUFBLE1BQUssU0FBUyxpQkFBaUJBLE1BQUssZ0JBQWdCLGdCQUFnQjtBQXFCcEUsUUFBQUEsTUFBSyxVQUFVLFNBQVUsT0FBTztBQUM5QixpQkFBTyxNQUFNLE9BQU8sU0FBVSxHQUFHO0FBQy9CLG1CQUFPLEVBQUUsUUFBUSxRQUFRLEVBQUUsRUFBRSxRQUFRLFFBQVEsRUFBRTtBQUFBLFVBQ2pELENBQUM7QUFBQSxRQUNIO0FBRUEsUUFBQUEsTUFBSyxTQUFTLGlCQUFpQkEsTUFBSyxTQUFTLFNBQVM7QUEyQnRELFFBQUFBLE1BQUssV0FBVyxXQUFZO0FBQzFCLGVBQUssUUFBUTtBQUNiLGVBQUssUUFBUSxDQUFDO0FBQ2QsZUFBSyxLQUFLQSxNQUFLLFNBQVM7QUFDeEIsVUFBQUEsTUFBSyxTQUFTLFdBQVc7QUFBQSxRQUMzQjtBQVVBLFFBQUFBLE1BQUssU0FBUyxVQUFVO0FBU3hCLFFBQUFBLE1BQUssU0FBUyxZQUFZLFNBQVUsS0FBSztBQUN2QyxjQUFJLFVBQVUsSUFBSUEsTUFBSyxTQUFTO0FBRWhDLG1CQUFTLElBQUksR0FBRyxNQUFNLElBQUksUUFBUSxJQUFJLEtBQUssS0FBSztBQUM5QyxvQkFBUSxPQUFPLElBQUksQ0FBQyxDQUFDO0FBQUEsVUFDdkI7QUFFQSxrQkFBUSxPQUFPO0FBQ2YsaUJBQU8sUUFBUTtBQUFBLFFBQ2pCO0FBV0EsUUFBQUEsTUFBSyxTQUFTLGFBQWEsU0FBVSxRQUFRO0FBQzNDLGNBQUksa0JBQWtCLFFBQVE7QUFDNUIsbUJBQU9BLE1BQUssU0FBUyxnQkFBZ0IsT0FBTyxNQUFNLE9BQU8sWUFBWTtBQUFBLFVBQ3ZFLE9BQU87QUFDTCxtQkFBT0EsTUFBSyxTQUFTLFdBQVcsT0FBTyxJQUFJO0FBQUEsVUFDN0M7QUFBQSxRQUNGO0FBaUJBLFFBQUFBLE1BQUssU0FBUyxrQkFBa0IsU0FBVSxLQUFLLGNBQWM7QUFDM0QsY0FBSSxPQUFPLElBQUlBLE1BQUs7QUFFcEIsY0FBSSxRQUFRLENBQUM7QUFBQSxZQUNYLE1BQU07QUFBQSxZQUNOLGdCQUFnQjtBQUFBLFlBQ2hCO0FBQUEsVUFDRixDQUFDO0FBRUQsaUJBQU8sTUFBTSxRQUFRO0FBQ25CLGdCQUFJLFFBQVEsTUFBTSxJQUFJO0FBR3RCLGdCQUFJLE1BQU0sSUFBSSxTQUFTLEdBQUc7QUFDeEIsa0JBQUksT0FBTyxNQUFNLElBQUksT0FBTyxDQUFDLEdBQ3pCO0FBRUosa0JBQUksUUFBUSxNQUFNLEtBQUssT0FBTztBQUM1Qiw2QkFBYSxNQUFNLEtBQUssTUFBTSxJQUFJO0FBQUEsY0FDcEMsT0FBTztBQUNMLDZCQUFhLElBQUlBLE1BQUs7QUFDdEIsc0JBQU0sS0FBSyxNQUFNLElBQUksSUFBSTtBQUFBLGNBQzNCO0FBRUEsa0JBQUksTUFBTSxJQUFJLFVBQVUsR0FBRztBQUN6QiwyQkFBVyxRQUFRO0FBQUEsY0FDckI7QUFFQSxvQkFBTSxLQUFLO0FBQUEsZ0JBQ1QsTUFBTTtBQUFBLGdCQUNOLGdCQUFnQixNQUFNO0FBQUEsZ0JBQ3RCLEtBQUssTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUFBLGNBQ3hCLENBQUM7QUFBQSxZQUNIO0FBRUEsZ0JBQUksTUFBTSxrQkFBa0IsR0FBRztBQUM3QjtBQUFBLFlBQ0Y7QUFHQSxnQkFBSSxPQUFPLE1BQU0sS0FBSyxPQUFPO0FBQzNCLGtCQUFJLGdCQUFnQixNQUFNLEtBQUssTUFBTSxHQUFHO0FBQUEsWUFDMUMsT0FBTztBQUNMLGtCQUFJLGdCQUFnQixJQUFJQSxNQUFLO0FBQzdCLG9CQUFNLEtBQUssTUFBTSxHQUFHLElBQUk7QUFBQSxZQUMxQjtBQUVBLGdCQUFJLE1BQU0sSUFBSSxVQUFVLEdBQUc7QUFDekIsNEJBQWMsUUFBUTtBQUFBLFlBQ3hCO0FBRUEsa0JBQU0sS0FBSztBQUFBLGNBQ1QsTUFBTTtBQUFBLGNBQ04sZ0JBQWdCLE1BQU0saUJBQWlCO0FBQUEsY0FDdkMsS0FBSyxNQUFNO0FBQUEsWUFDYixDQUFDO0FBS0QsZ0JBQUksTUFBTSxJQUFJLFNBQVMsR0FBRztBQUN4QixvQkFBTSxLQUFLO0FBQUEsZ0JBQ1QsTUFBTSxNQUFNO0FBQUEsZ0JBQ1osZ0JBQWdCLE1BQU0saUJBQWlCO0FBQUEsZ0JBQ3ZDLEtBQUssTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUFBLGNBQ3hCLENBQUM7QUFBQSxZQUNIO0FBSUEsZ0JBQUksTUFBTSxJQUFJLFVBQVUsR0FBRztBQUN6QixvQkFBTSxLQUFLLFFBQVE7QUFBQSxZQUNyQjtBQUtBLGdCQUFJLE1BQU0sSUFBSSxVQUFVLEdBQUc7QUFDekIsa0JBQUksT0FBTyxNQUFNLEtBQUssT0FBTztBQUMzQixvQkFBSSxtQkFBbUIsTUFBTSxLQUFLLE1BQU0sR0FBRztBQUFBLGNBQzdDLE9BQU87QUFDTCxvQkFBSSxtQkFBbUIsSUFBSUEsTUFBSztBQUNoQyxzQkFBTSxLQUFLLE1BQU0sR0FBRyxJQUFJO0FBQUEsY0FDMUI7QUFFQSxrQkFBSSxNQUFNLElBQUksVUFBVSxHQUFHO0FBQ3pCLGlDQUFpQixRQUFRO0FBQUEsY0FDM0I7QUFFQSxvQkFBTSxLQUFLO0FBQUEsZ0JBQ1QsTUFBTTtBQUFBLGdCQUNOLGdCQUFnQixNQUFNLGlCQUFpQjtBQUFBLGdCQUN2QyxLQUFLLE1BQU0sSUFBSSxNQUFNLENBQUM7QUFBQSxjQUN4QixDQUFDO0FBQUEsWUFDSDtBQUtBLGdCQUFJLE1BQU0sSUFBSSxTQUFTLEdBQUc7QUFDeEIsa0JBQUksUUFBUSxNQUFNLElBQUksT0FBTyxDQUFDLEdBQzFCLFFBQVEsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUMxQjtBQUVKLGtCQUFJLFNBQVMsTUFBTSxLQUFLLE9BQU87QUFDN0IsZ0NBQWdCLE1BQU0sS0FBSyxNQUFNLEtBQUs7QUFBQSxjQUN4QyxPQUFPO0FBQ0wsZ0NBQWdCLElBQUlBLE1BQUs7QUFDekIsc0JBQU0sS0FBSyxNQUFNLEtBQUssSUFBSTtBQUFBLGNBQzVCO0FBRUEsa0JBQUksTUFBTSxJQUFJLFVBQVUsR0FBRztBQUN6Qiw4QkFBYyxRQUFRO0FBQUEsY0FDeEI7QUFFQSxvQkFBTSxLQUFLO0FBQUEsZ0JBQ1QsTUFBTTtBQUFBLGdCQUNOLGdCQUFnQixNQUFNLGlCQUFpQjtBQUFBLGdCQUN2QyxLQUFLLFFBQVEsTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUFBLGNBQ2hDLENBQUM7QUFBQSxZQUNIO0FBQUEsVUFDRjtBQUVBLGlCQUFPO0FBQUEsUUFDVDtBQVlBLFFBQUFBLE1BQUssU0FBUyxhQUFhLFNBQVUsS0FBSztBQUN4QyxjQUFJLE9BQU8sSUFBSUEsTUFBSyxZQUNoQixPQUFPO0FBVVgsbUJBQVMsSUFBSSxHQUFHLE1BQU0sSUFBSSxRQUFRLElBQUksS0FBSyxLQUFLO0FBQzlDLGdCQUFJLE9BQU8sSUFBSSxDQUFDLEdBQ1osUUFBUyxLQUFLLE1BQU07QUFFeEIsZ0JBQUksUUFBUSxLQUFLO0FBQ2YsbUJBQUssTUFBTSxJQUFJLElBQUk7QUFDbkIsbUJBQUssUUFBUTtBQUFBLFlBRWYsT0FBTztBQUNMLGtCQUFJLE9BQU8sSUFBSUEsTUFBSztBQUNwQixtQkFBSyxRQUFRO0FBRWIsbUJBQUssTUFBTSxJQUFJLElBQUk7QUFDbkIscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUVBLGlCQUFPO0FBQUEsUUFDVDtBQVlBLFFBQUFBLE1BQUssU0FBUyxVQUFVLFVBQVUsV0FBWTtBQUM1QyxjQUFJLFFBQVEsQ0FBQztBQUViLGNBQUksUUFBUSxDQUFDO0FBQUEsWUFDWCxRQUFRO0FBQUEsWUFDUixNQUFNO0FBQUEsVUFDUixDQUFDO0FBRUQsaUJBQU8sTUFBTSxRQUFRO0FBQ25CLGdCQUFJLFFBQVEsTUFBTSxJQUFJLEdBQ2xCLFFBQVEsT0FBTyxLQUFLLE1BQU0sS0FBSyxLQUFLLEdBQ3BDLE1BQU0sTUFBTTtBQUVoQixnQkFBSSxNQUFNLEtBQUssT0FBTztBQUtwQixvQkFBTSxPQUFPLE9BQU8sQ0FBQztBQUNyQixvQkFBTSxLQUFLLE1BQU0sTUFBTTtBQUFBLFlBQ3pCO0FBRUEscUJBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLGtCQUFJLE9BQU8sTUFBTSxDQUFDO0FBRWxCLG9CQUFNLEtBQUs7QUFBQSxnQkFDVCxRQUFRLE1BQU0sT0FBTyxPQUFPLElBQUk7QUFBQSxnQkFDaEMsTUFBTSxNQUFNLEtBQUssTUFBTSxJQUFJO0FBQUEsY0FDN0IsQ0FBQztBQUFBLFlBQ0g7QUFBQSxVQUNGO0FBRUEsaUJBQU87QUFBQSxRQUNUO0FBWUEsUUFBQUEsTUFBSyxTQUFTLFVBQVUsV0FBVyxXQUFZO0FBUzdDLGNBQUksS0FBSyxNQUFNO0FBQ2IsbUJBQU8sS0FBSztBQUFBLFVBQ2Q7QUFFQSxjQUFJLE1BQU0sS0FBSyxRQUFRLE1BQU0sS0FDekIsU0FBUyxPQUFPLEtBQUssS0FBSyxLQUFLLEVBQUUsS0FBSyxHQUN0QyxNQUFNLE9BQU87QUFFakIsbUJBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLO0FBQzVCLGdCQUFJLFFBQVEsT0FBTyxDQUFDLEdBQ2hCLE9BQU8sS0FBSyxNQUFNLEtBQUs7QUFFM0Isa0JBQU0sTUFBTSxRQUFRLEtBQUs7QUFBQSxVQUMzQjtBQUVBLGlCQUFPO0FBQUEsUUFDVDtBQVlBLFFBQUFBLE1BQUssU0FBUyxVQUFVLFlBQVksU0FBVSxHQUFHO0FBQy9DLGNBQUksU0FBUyxJQUFJQSxNQUFLLFlBQ2xCLFFBQVE7QUFFWixjQUFJLFFBQVEsQ0FBQztBQUFBLFlBQ1gsT0FBTztBQUFBLFlBQ1A7QUFBQSxZQUNBLE1BQU07QUFBQSxVQUNSLENBQUM7QUFFRCxpQkFBTyxNQUFNLFFBQVE7QUFDbkIsb0JBQVEsTUFBTSxJQUFJO0FBTWxCLGdCQUFJLFNBQVMsT0FBTyxLQUFLLE1BQU0sTUFBTSxLQUFLLEdBQ3RDLE9BQU8sT0FBTyxRQUNkLFNBQVMsT0FBTyxLQUFLLE1BQU0sS0FBSyxLQUFLLEdBQ3JDLE9BQU8sT0FBTztBQUVsQixxQkFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLEtBQUs7QUFDN0Isa0JBQUksUUFBUSxPQUFPLENBQUM7QUFFcEIsdUJBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLO0FBQzdCLG9CQUFJLFFBQVEsT0FBTyxDQUFDO0FBRXBCLG9CQUFJLFNBQVMsU0FBUyxTQUFTLEtBQUs7QUFDbEMsc0JBQUksT0FBTyxNQUFNLEtBQUssTUFBTSxLQUFLLEdBQzdCLFFBQVEsTUFBTSxNQUFNLE1BQU0sS0FBSyxHQUMvQixRQUFRLEtBQUssU0FBUyxNQUFNLE9BQzVCLE9BQU87QUFFWCxzQkFBSSxTQUFTLE1BQU0sT0FBTyxPQUFPO0FBSS9CLDJCQUFPLE1BQU0sT0FBTyxNQUFNLEtBQUs7QUFDL0IseUJBQUssUUFBUSxLQUFLLFNBQVM7QUFBQSxrQkFFN0IsT0FBTztBQUlMLDJCQUFPLElBQUlBLE1BQUs7QUFDaEIseUJBQUssUUFBUTtBQUNiLDBCQUFNLE9BQU8sTUFBTSxLQUFLLElBQUk7QUFBQSxrQkFDOUI7QUFFQSx3QkFBTSxLQUFLO0FBQUEsb0JBQ1Q7QUFBQSxvQkFDQSxRQUFRO0FBQUEsb0JBQ1I7QUFBQSxrQkFDRixDQUFDO0FBQUEsZ0JBQ0g7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUFDQSxRQUFBQSxNQUFLLFNBQVMsVUFBVSxXQUFZO0FBQ2xDLGVBQUssZUFBZTtBQUNwQixlQUFLLE9BQU8sSUFBSUEsTUFBSztBQUNyQixlQUFLLGlCQUFpQixDQUFDO0FBQ3ZCLGVBQUssaUJBQWlCLENBQUM7QUFBQSxRQUN6QjtBQUVBLFFBQUFBLE1BQUssU0FBUyxRQUFRLFVBQVUsU0FBUyxTQUFVLE1BQU07QUFDdkQsY0FBSSxNQUNBLGVBQWU7QUFFbkIsY0FBSSxPQUFPLEtBQUssY0FBYztBQUM1QixrQkFBTSxJQUFJLE1BQU8sNkJBQTZCO0FBQUEsVUFDaEQ7QUFFQSxtQkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFVBQVUsSUFBSSxLQUFLLGFBQWEsUUFBUSxLQUFLO0FBQ3BFLGdCQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssYUFBYSxDQUFDLEVBQUc7QUFDckM7QUFBQSxVQUNGO0FBRUEsZUFBSyxTQUFTLFlBQVk7QUFFMUIsY0FBSSxLQUFLLGVBQWUsVUFBVSxHQUFHO0FBQ25DLG1CQUFPLEtBQUs7QUFBQSxVQUNkLE9BQU87QUFDTCxtQkFBTyxLQUFLLGVBQWUsS0FBSyxlQUFlLFNBQVMsQ0FBQyxFQUFFO0FBQUEsVUFDN0Q7QUFFQSxtQkFBUyxJQUFJLGNBQWMsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUMvQyxnQkFBSSxXQUFXLElBQUlBLE1BQUssWUFDcEIsT0FBTyxLQUFLLENBQUM7QUFFakIsaUJBQUssTUFBTSxJQUFJLElBQUk7QUFFbkIsaUJBQUssZUFBZSxLQUFLO0FBQUEsY0FDdkIsUUFBUTtBQUFBLGNBQ1I7QUFBQSxjQUNBLE9BQU87QUFBQSxZQUNULENBQUM7QUFFRCxtQkFBTztBQUFBLFVBQ1Q7QUFFQSxlQUFLLFFBQVE7QUFDYixlQUFLLGVBQWU7QUFBQSxRQUN0QjtBQUVBLFFBQUFBLE1BQUssU0FBUyxRQUFRLFVBQVUsU0FBUyxXQUFZO0FBQ25ELGVBQUssU0FBUyxDQUFDO0FBQUEsUUFDakI7QUFFQSxRQUFBQSxNQUFLLFNBQVMsUUFBUSxVQUFVLFdBQVcsU0FBVSxRQUFRO0FBQzNELG1CQUFTLElBQUksS0FBSyxlQUFlLFNBQVMsR0FBRyxLQUFLLFFBQVEsS0FBSztBQUM3RCxnQkFBSSxPQUFPLEtBQUssZUFBZSxDQUFDLEdBQzVCLFdBQVcsS0FBSyxNQUFNLFNBQVM7QUFFbkMsZ0JBQUksWUFBWSxLQUFLLGdCQUFnQjtBQUNuQyxtQkFBSyxPQUFPLE1BQU0sS0FBSyxJQUFJLElBQUksS0FBSyxlQUFlLFFBQVE7QUFBQSxZQUM3RCxPQUFPO0FBR0wsbUJBQUssTUFBTSxPQUFPO0FBRWxCLG1CQUFLLGVBQWUsUUFBUSxJQUFJLEtBQUs7QUFBQSxZQUN2QztBQUVBLGlCQUFLLGVBQWUsSUFBSTtBQUFBLFVBQzFCO0FBQUEsUUFDRjtBQXNCQSxRQUFBQSxNQUFLLFFBQVEsU0FBVSxPQUFPO0FBQzVCLGVBQUssZ0JBQWdCLE1BQU07QUFDM0IsZUFBSyxlQUFlLE1BQU07QUFDMUIsZUFBSyxXQUFXLE1BQU07QUFDdEIsZUFBSyxTQUFTLE1BQU07QUFDcEIsZUFBSyxXQUFXLE1BQU07QUFBQSxRQUN4QjtBQXlFQSxRQUFBQSxNQUFLLE1BQU0sVUFBVSxTQUFTLFNBQVUsYUFBYTtBQUNuRCxpQkFBTyxLQUFLLE1BQU0sU0FBVSxPQUFPO0FBQ2pDLGdCQUFJLFNBQVMsSUFBSUEsTUFBSyxZQUFZLGFBQWEsS0FBSztBQUNwRCxtQkFBTyxNQUFNO0FBQUEsVUFDZixDQUFDO0FBQUEsUUFDSDtBQTJCQSxRQUFBQSxNQUFLLE1BQU0sVUFBVSxRQUFRLFNBQVUsSUFBSTtBQVF6QyxjQUFJLFFBQVEsSUFBSUEsTUFBSyxNQUFNLEtBQUssTUFBTSxHQUNsQyxpQkFBaUIsdUJBQU8sT0FBTyxJQUFJLEdBQ25DLGVBQWUsdUJBQU8sT0FBTyxJQUFJLEdBQ2pDLGlCQUFpQix1QkFBTyxPQUFPLElBQUksR0FDbkMsa0JBQWtCLHVCQUFPLE9BQU8sSUFBSSxHQUNwQyxvQkFBb0IsdUJBQU8sT0FBTyxJQUFJO0FBTzFDLG1CQUFTLElBQUksR0FBRyxJQUFJLEtBQUssT0FBTyxRQUFRLEtBQUs7QUFDM0MseUJBQWEsS0FBSyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUlBLE1BQUs7QUFBQSxVQUMxQztBQUVBLGFBQUcsS0FBSyxPQUFPLEtBQUs7QUFFcEIsbUJBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLFFBQVEsS0FBSztBQVM3QyxnQkFBSSxTQUFTLE1BQU0sUUFBUSxDQUFDLEdBQ3hCLFFBQVEsTUFDUixnQkFBZ0JBLE1BQUssSUFBSTtBQUU3QixnQkFBSSxPQUFPLGFBQWE7QUFDdEIsc0JBQVEsS0FBSyxTQUFTLFVBQVUsT0FBTyxNQUFNO0FBQUEsZ0JBQzNDLFFBQVEsT0FBTztBQUFBLGNBQ2pCLENBQUM7QUFBQSxZQUNILE9BQU87QUFDTCxzQkFBUSxDQUFDLE9BQU8sSUFBSTtBQUFBLFlBQ3RCO0FBRUEscUJBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsa0JBQUksT0FBTyxNQUFNLENBQUM7QUFRbEIscUJBQU8sT0FBTztBQU9kLGtCQUFJLGVBQWVBLE1BQUssU0FBUyxXQUFXLE1BQU0sR0FDOUMsZ0JBQWdCLEtBQUssU0FBUyxVQUFVLFlBQVksRUFBRSxRQUFRO0FBUWxFLGtCQUFJLGNBQWMsV0FBVyxLQUFLLE9BQU8sYUFBYUEsTUFBSyxNQUFNLFNBQVMsVUFBVTtBQUNsRix5QkFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLE9BQU8sUUFBUSxLQUFLO0FBQzdDLHNCQUFJLFFBQVEsT0FBTyxPQUFPLENBQUM7QUFDM0Isa0NBQWdCLEtBQUssSUFBSUEsTUFBSyxJQUFJO0FBQUEsZ0JBQ3BDO0FBRUE7QUFBQSxjQUNGO0FBRUEsdUJBQVMsSUFBSSxHQUFHLElBQUksY0FBYyxRQUFRLEtBQUs7QUFLN0Msb0JBQUksZUFBZSxjQUFjLENBQUMsR0FDOUIsVUFBVSxLQUFLLGNBQWMsWUFBWSxHQUN6QyxZQUFZLFFBQVE7QUFFeEIseUJBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxPQUFPLFFBQVEsS0FBSztBQVM3QyxzQkFBSSxRQUFRLE9BQU8sT0FBTyxDQUFDLEdBQ3ZCLGVBQWUsUUFBUSxLQUFLLEdBQzVCLHVCQUF1QixPQUFPLEtBQUssWUFBWSxHQUMvQyxZQUFZLGVBQWUsTUFBTSxPQUNqQyx1QkFBdUIsSUFBSUEsTUFBSyxJQUFJLG9CQUFvQjtBQU81RCxzQkFBSSxPQUFPLFlBQVlBLE1BQUssTUFBTSxTQUFTLFVBQVU7QUFDbkQsb0NBQWdCLGNBQWMsTUFBTSxvQkFBb0I7QUFFeEQsd0JBQUksZ0JBQWdCLEtBQUssTUFBTSxRQUFXO0FBQ3hDLHNDQUFnQixLQUFLLElBQUlBLE1BQUssSUFBSTtBQUFBLG9CQUNwQztBQUFBLGtCQUNGO0FBT0Esc0JBQUksT0FBTyxZQUFZQSxNQUFLLE1BQU0sU0FBUyxZQUFZO0FBQ3JELHdCQUFJLGtCQUFrQixLQUFLLE1BQU0sUUFBVztBQUMxQyx3Q0FBa0IsS0FBSyxJQUFJQSxNQUFLLElBQUk7QUFBQSxvQkFDdEM7QUFFQSxzQ0FBa0IsS0FBSyxJQUFJLGtCQUFrQixLQUFLLEVBQUUsTUFBTSxvQkFBb0I7QUFPOUU7QUFBQSxrQkFDRjtBQVNBLCtCQUFhLEtBQUssRUFBRSxPQUFPLFdBQVcsT0FBTyxPQUFPLFNBQVUsR0FBRyxHQUFHO0FBQUUsMkJBQU8sSUFBSTtBQUFBLGtCQUFFLENBQUM7QUFNcEYsc0JBQUksZUFBZSxTQUFTLEdBQUc7QUFDN0I7QUFBQSxrQkFDRjtBQUVBLDJCQUFTLElBQUksR0FBRyxJQUFJLHFCQUFxQixRQUFRLEtBQUs7QUFPcEQsd0JBQUksc0JBQXNCLHFCQUFxQixDQUFDLEdBQzVDLG1CQUFtQixJQUFJQSxNQUFLLFNBQVUscUJBQXFCLEtBQUssR0FDaEUsV0FBVyxhQUFhLG1CQUFtQixHQUMzQztBQUVKLHlCQUFLLGFBQWEsZUFBZSxnQkFBZ0IsT0FBTyxRQUFXO0FBQ2pFLHFDQUFlLGdCQUFnQixJQUFJLElBQUlBLE1BQUssVUFBVyxjQUFjLE9BQU8sUUFBUTtBQUFBLG9CQUN0RixPQUFPO0FBQ0wsaUNBQVcsSUFBSSxjQUFjLE9BQU8sUUFBUTtBQUFBLG9CQUM5QztBQUFBLGtCQUVGO0FBRUEsaUNBQWUsU0FBUyxJQUFJO0FBQUEsZ0JBQzlCO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFRQSxnQkFBSSxPQUFPLGFBQWFBLE1BQUssTUFBTSxTQUFTLFVBQVU7QUFDcEQsdUJBQVMsSUFBSSxHQUFHLElBQUksT0FBTyxPQUFPLFFBQVEsS0FBSztBQUM3QyxvQkFBSSxRQUFRLE9BQU8sT0FBTyxDQUFDO0FBQzNCLGdDQUFnQixLQUFLLElBQUksZ0JBQWdCLEtBQUssRUFBRSxVQUFVLGFBQWE7QUFBQSxjQUN6RTtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBT0EsY0FBSSxxQkFBcUJBLE1BQUssSUFBSSxVQUM5Qix1QkFBdUJBLE1BQUssSUFBSTtBQUVwQyxtQkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLE9BQU8sUUFBUSxLQUFLO0FBQzNDLGdCQUFJLFFBQVEsS0FBSyxPQUFPLENBQUM7QUFFekIsZ0JBQUksZ0JBQWdCLEtBQUssR0FBRztBQUMxQixtQ0FBcUIsbUJBQW1CLFVBQVUsZ0JBQWdCLEtBQUssQ0FBQztBQUFBLFlBQzFFO0FBRUEsZ0JBQUksa0JBQWtCLEtBQUssR0FBRztBQUM1QixxQ0FBdUIscUJBQXFCLE1BQU0sa0JBQWtCLEtBQUssQ0FBQztBQUFBLFlBQzVFO0FBQUEsVUFDRjtBQUVBLGNBQUksb0JBQW9CLE9BQU8sS0FBSyxjQUFjLEdBQzlDLFVBQVUsQ0FBQyxHQUNYLFVBQVUsdUJBQU8sT0FBTyxJQUFJO0FBWWhDLGNBQUksTUFBTSxVQUFVLEdBQUc7QUFDckIsZ0NBQW9CLE9BQU8sS0FBSyxLQUFLLFlBQVk7QUFFakQscUJBQVMsSUFBSSxHQUFHLElBQUksa0JBQWtCLFFBQVEsS0FBSztBQUNqRCxrQkFBSSxtQkFBbUIsa0JBQWtCLENBQUM7QUFDMUMsa0JBQUksV0FBV0EsTUFBSyxTQUFTLFdBQVcsZ0JBQWdCO0FBQ3hELDZCQUFlLGdCQUFnQixJQUFJLElBQUlBLE1BQUs7QUFBQSxZQUM5QztBQUFBLFVBQ0Y7QUFFQSxtQkFBUyxJQUFJLEdBQUcsSUFBSSxrQkFBa0IsUUFBUSxLQUFLO0FBU2pELGdCQUFJLFdBQVdBLE1BQUssU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUMsR0FDeEQsU0FBUyxTQUFTO0FBRXRCLGdCQUFJLENBQUMsbUJBQW1CLFNBQVMsTUFBTSxHQUFHO0FBQ3hDO0FBQUEsWUFDRjtBQUVBLGdCQUFJLHFCQUFxQixTQUFTLE1BQU0sR0FBRztBQUN6QztBQUFBLFlBQ0Y7QUFFQSxnQkFBSSxjQUFjLEtBQUssYUFBYSxRQUFRLEdBQ3hDLFFBQVEsYUFBYSxTQUFTLFNBQVMsRUFBRSxXQUFXLFdBQVcsR0FDL0Q7QUFFSixpQkFBSyxXQUFXLFFBQVEsTUFBTSxPQUFPLFFBQVc7QUFDOUMsdUJBQVMsU0FBUztBQUNsQix1QkFBUyxVQUFVLFFBQVEsZUFBZSxRQUFRLENBQUM7QUFBQSxZQUNyRCxPQUFPO0FBQ0wsa0JBQUksUUFBUTtBQUFBLGdCQUNWLEtBQUs7QUFBQSxnQkFDTDtBQUFBLGdCQUNBLFdBQVcsZUFBZSxRQUFRO0FBQUEsY0FDcEM7QUFDQSxzQkFBUSxNQUFNLElBQUk7QUFDbEIsc0JBQVEsS0FBSyxLQUFLO0FBQUEsWUFDcEI7QUFBQSxVQUNGO0FBS0EsaUJBQU8sUUFBUSxLQUFLLFNBQVUsR0FBRyxHQUFHO0FBQ2xDLG1CQUFPLEVBQUUsUUFBUSxFQUFFO0FBQUEsVUFDckIsQ0FBQztBQUFBLFFBQ0g7QUFVQSxRQUFBQSxNQUFLLE1BQU0sVUFBVSxTQUFTLFdBQVk7QUFDeEMsY0FBSSxnQkFBZ0IsT0FBTyxLQUFLLEtBQUssYUFBYSxFQUMvQyxLQUFLLEVBQ0wsSUFBSSxTQUFVLE1BQU07QUFDbkIsbUJBQU8sQ0FBQyxNQUFNLEtBQUssY0FBYyxJQUFJLENBQUM7QUFBQSxVQUN4QyxHQUFHLElBQUk7QUFFVCxjQUFJLGVBQWUsT0FBTyxLQUFLLEtBQUssWUFBWSxFQUM3QyxJQUFJLFNBQVUsS0FBSztBQUNsQixtQkFBTyxDQUFDLEtBQUssS0FBSyxhQUFhLEdBQUcsRUFBRSxPQUFPLENBQUM7QUFBQSxVQUM5QyxHQUFHLElBQUk7QUFFVCxpQkFBTztBQUFBLFlBQ0wsU0FBU0EsTUFBSztBQUFBLFlBQ2QsUUFBUSxLQUFLO0FBQUEsWUFDYjtBQUFBLFlBQ0E7QUFBQSxZQUNBLFVBQVUsS0FBSyxTQUFTLE9BQU87QUFBQSxVQUNqQztBQUFBLFFBQ0Y7QUFRQSxRQUFBQSxNQUFLLE1BQU0sT0FBTyxTQUFVLGlCQUFpQjtBQUMzQyxjQUFJLFFBQVEsQ0FBQyxHQUNULGVBQWUsQ0FBQyxHQUNoQixvQkFBb0IsZ0JBQWdCLGNBQ3BDLGdCQUFnQix1QkFBTyxPQUFPLElBQUksR0FDbEMsMEJBQTBCLGdCQUFnQixlQUMxQyxrQkFBa0IsSUFBSUEsTUFBSyxTQUFTLFdBQ3BDLFdBQVdBLE1BQUssU0FBUyxLQUFLLGdCQUFnQixRQUFRO0FBRTFELGNBQUksZ0JBQWdCLFdBQVdBLE1BQUssU0FBUztBQUMzQyxZQUFBQSxNQUFLLE1BQU0sS0FBSyw4RUFBOEVBLE1BQUssVUFBVSx3Q0FBd0MsZ0JBQWdCLFVBQVUsR0FBRztBQUFBLFVBQ3BMO0FBRUEsbUJBQVMsSUFBSSxHQUFHLElBQUksa0JBQWtCLFFBQVEsS0FBSztBQUNqRCxnQkFBSSxRQUFRLGtCQUFrQixDQUFDLEdBQzNCLE1BQU0sTUFBTSxDQUFDLEdBQ2IsV0FBVyxNQUFNLENBQUM7QUFFdEIseUJBQWEsR0FBRyxJQUFJLElBQUlBLE1BQUssT0FBTyxRQUFRO0FBQUEsVUFDOUM7QUFFQSxtQkFBUyxJQUFJLEdBQUcsSUFBSSx3QkFBd0IsUUFBUSxLQUFLO0FBQ3ZELGdCQUFJLFFBQVEsd0JBQXdCLENBQUMsR0FDakMsT0FBTyxNQUFNLENBQUMsR0FDZCxVQUFVLE1BQU0sQ0FBQztBQUVyQiw0QkFBZ0IsT0FBTyxJQUFJO0FBQzNCLDBCQUFjLElBQUksSUFBSTtBQUFBLFVBQ3hCO0FBRUEsMEJBQWdCLE9BQU87QUFFdkIsZ0JBQU0sU0FBUyxnQkFBZ0I7QUFFL0IsZ0JBQU0sZUFBZTtBQUNyQixnQkFBTSxnQkFBZ0I7QUFDdEIsZ0JBQU0sV0FBVyxnQkFBZ0I7QUFDakMsZ0JBQU0sV0FBVztBQUVqQixpQkFBTyxJQUFJQSxNQUFLLE1BQU0sS0FBSztBQUFBLFFBQzdCO0FBOEJBLFFBQUFBLE1BQUssVUFBVSxXQUFZO0FBQ3pCLGVBQUssT0FBTztBQUNaLGVBQUssVUFBVSx1QkFBTyxPQUFPLElBQUk7QUFDakMsZUFBSyxhQUFhLHVCQUFPLE9BQU8sSUFBSTtBQUNwQyxlQUFLLGdCQUFnQix1QkFBTyxPQUFPLElBQUk7QUFDdkMsZUFBSyx1QkFBdUIsQ0FBQztBQUM3QixlQUFLLGVBQWUsQ0FBQztBQUNyQixlQUFLLFlBQVlBLE1BQUs7QUFDdEIsZUFBSyxXQUFXLElBQUlBLE1BQUs7QUFDekIsZUFBSyxpQkFBaUIsSUFBSUEsTUFBSztBQUMvQixlQUFLLGdCQUFnQjtBQUNyQixlQUFLLEtBQUs7QUFDVixlQUFLLE1BQU07QUFDWCxlQUFLLFlBQVk7QUFDakIsZUFBSyxvQkFBb0IsQ0FBQztBQUFBLFFBQzVCO0FBY0EsUUFBQUEsTUFBSyxRQUFRLFVBQVUsTUFBTSxTQUFVLEtBQUs7QUFDMUMsZUFBSyxPQUFPO0FBQUEsUUFDZDtBQWtDQSxRQUFBQSxNQUFLLFFBQVEsVUFBVSxRQUFRLFNBQVUsV0FBVyxZQUFZO0FBQzlELGNBQUksS0FBSyxLQUFLLFNBQVMsR0FBRztBQUN4QixrQkFBTSxJQUFJLFdBQVksWUFBWSxZQUFZLGtDQUFrQztBQUFBLFVBQ2xGO0FBRUEsZUFBSyxRQUFRLFNBQVMsSUFBSSxjQUFjLENBQUM7QUFBQSxRQUMzQztBQVVBLFFBQUFBLE1BQUssUUFBUSxVQUFVLElBQUksU0FBVSxRQUFRO0FBQzNDLGNBQUksU0FBUyxHQUFHO0FBQ2QsaUJBQUssS0FBSztBQUFBLFVBQ1osV0FBVyxTQUFTLEdBQUc7QUFDckIsaUJBQUssS0FBSztBQUFBLFVBQ1osT0FBTztBQUNMLGlCQUFLLEtBQUs7QUFBQSxVQUNaO0FBQUEsUUFDRjtBQVNBLFFBQUFBLE1BQUssUUFBUSxVQUFVLEtBQUssU0FBVSxRQUFRO0FBQzVDLGVBQUssTUFBTTtBQUFBLFFBQ2I7QUFtQkEsUUFBQUEsTUFBSyxRQUFRLFVBQVUsTUFBTSxTQUFVLEtBQUssWUFBWTtBQUN0RCxjQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksR0FDdEIsU0FBUyxPQUFPLEtBQUssS0FBSyxPQUFPO0FBRXJDLGVBQUssV0FBVyxNQUFNLElBQUksY0FBYyxDQUFDO0FBQ3pDLGVBQUssaUJBQWlCO0FBRXRCLG1CQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3RDLGdCQUFJLFlBQVksT0FBTyxDQUFDLEdBQ3BCLFlBQVksS0FBSyxRQUFRLFNBQVMsRUFBRSxXQUNwQyxRQUFRLFlBQVksVUFBVSxHQUFHLElBQUksSUFBSSxTQUFTLEdBQ2xELFNBQVMsS0FBSyxVQUFVLE9BQU87QUFBQSxjQUM3QixRQUFRLENBQUMsU0FBUztBQUFBLFlBQ3BCLENBQUMsR0FDRCxRQUFRLEtBQUssU0FBUyxJQUFJLE1BQU0sR0FDaEMsV0FBVyxJQUFJQSxNQUFLLFNBQVUsUUFBUSxTQUFTLEdBQy9DLGFBQWEsdUJBQU8sT0FBTyxJQUFJO0FBRW5DLGlCQUFLLHFCQUFxQixRQUFRLElBQUk7QUFDdEMsaUJBQUssYUFBYSxRQUFRLElBQUk7QUFHOUIsaUJBQUssYUFBYSxRQUFRLEtBQUssTUFBTTtBQUdyQyxxQkFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVEsS0FBSztBQUNyQyxrQkFBSSxPQUFPLE1BQU0sQ0FBQztBQUVsQixrQkFBSSxXQUFXLElBQUksS0FBSyxRQUFXO0FBQ2pDLDJCQUFXLElBQUksSUFBSTtBQUFBLGNBQ3JCO0FBRUEseUJBQVcsSUFBSSxLQUFLO0FBSXBCLGtCQUFJLEtBQUssY0FBYyxJQUFJLEtBQUssUUFBVztBQUN6QyxvQkFBSSxVQUFVLHVCQUFPLE9BQU8sSUFBSTtBQUNoQyx3QkFBUSxRQUFRLElBQUksS0FBSztBQUN6QixxQkFBSyxhQUFhO0FBRWxCLHlCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3RDLDBCQUFRLE9BQU8sQ0FBQyxDQUFDLElBQUksdUJBQU8sT0FBTyxJQUFJO0FBQUEsZ0JBQ3pDO0FBRUEscUJBQUssY0FBYyxJQUFJLElBQUk7QUFBQSxjQUM3QjtBQUdBLGtCQUFJLEtBQUssY0FBYyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSyxRQUFXO0FBQzVELHFCQUFLLGNBQWMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLElBQUksdUJBQU8sT0FBTyxJQUFJO0FBQUEsY0FDbEU7QUFJQSx1QkFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLGtCQUFrQixRQUFRLEtBQUs7QUFDdEQsb0JBQUksY0FBYyxLQUFLLGtCQUFrQixDQUFDLEdBQ3RDLFdBQVcsS0FBSyxTQUFTLFdBQVc7QUFFeEMsb0JBQUksS0FBSyxjQUFjLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsS0FBSyxRQUFXO0FBQ3pFLHVCQUFLLGNBQWMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsV0FBVyxJQUFJLENBQUM7QUFBQSxnQkFDOUQ7QUFFQSxxQkFBSyxjQUFjLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxLQUFLLFFBQVE7QUFBQSxjQUN4RTtBQUFBLFlBQ0Y7QUFBQSxVQUVGO0FBQUEsUUFDRjtBQU9BLFFBQUFBLE1BQUssUUFBUSxVQUFVLCtCQUErQixXQUFZO0FBRWhFLGNBQUksWUFBWSxPQUFPLEtBQUssS0FBSyxZQUFZLEdBQ3pDLGlCQUFpQixVQUFVLFFBQzNCLGNBQWMsQ0FBQyxHQUNmLHFCQUFxQixDQUFDO0FBRTFCLG1CQUFTLElBQUksR0FBRyxJQUFJLGdCQUFnQixLQUFLO0FBQ3ZDLGdCQUFJLFdBQVdBLE1BQUssU0FBUyxXQUFXLFVBQVUsQ0FBQyxDQUFDLEdBQ2hELFFBQVEsU0FBUztBQUVyQiwrQkFBbUIsS0FBSyxNQUFNLG1CQUFtQixLQUFLLElBQUk7QUFDMUQsK0JBQW1CLEtBQUssS0FBSztBQUU3Qix3QkFBWSxLQUFLLE1BQU0sWUFBWSxLQUFLLElBQUk7QUFDNUMsd0JBQVksS0FBSyxLQUFLLEtBQUssYUFBYSxRQUFRO0FBQUEsVUFDbEQ7QUFFQSxjQUFJLFNBQVMsT0FBTyxLQUFLLEtBQUssT0FBTztBQUVyQyxtQkFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLFFBQVEsS0FBSztBQUN0QyxnQkFBSSxZQUFZLE9BQU8sQ0FBQztBQUN4Qix3QkFBWSxTQUFTLElBQUksWUFBWSxTQUFTLElBQUksbUJBQW1CLFNBQVM7QUFBQSxVQUNoRjtBQUVBLGVBQUsscUJBQXFCO0FBQUEsUUFDNUI7QUFPQSxRQUFBQSxNQUFLLFFBQVEsVUFBVSxxQkFBcUIsV0FBWTtBQUN0RCxjQUFJLGVBQWUsQ0FBQyxHQUNoQixZQUFZLE9BQU8sS0FBSyxLQUFLLG9CQUFvQixHQUNqRCxrQkFBa0IsVUFBVSxRQUM1QixlQUFlLHVCQUFPLE9BQU8sSUFBSTtBQUVyQyxtQkFBUyxJQUFJLEdBQUcsSUFBSSxpQkFBaUIsS0FBSztBQUN4QyxnQkFBSSxXQUFXQSxNQUFLLFNBQVMsV0FBVyxVQUFVLENBQUMsQ0FBQyxHQUNoRCxZQUFZLFNBQVMsV0FDckIsY0FBYyxLQUFLLGFBQWEsUUFBUSxHQUN4QyxjQUFjLElBQUlBLE1BQUssVUFDdkIsa0JBQWtCLEtBQUsscUJBQXFCLFFBQVEsR0FDcEQsUUFBUSxPQUFPLEtBQUssZUFBZSxHQUNuQyxjQUFjLE1BQU07QUFHeEIsZ0JBQUksYUFBYSxLQUFLLFFBQVEsU0FBUyxFQUFFLFNBQVMsR0FDOUMsV0FBVyxLQUFLLFdBQVcsU0FBUyxNQUFNLEVBQUUsU0FBUztBQUV6RCxxQkFBUyxJQUFJLEdBQUcsSUFBSSxhQUFhLEtBQUs7QUFDcEMsa0JBQUksT0FBTyxNQUFNLENBQUMsR0FDZCxLQUFLLGdCQUFnQixJQUFJLEdBQ3pCLFlBQVksS0FBSyxjQUFjLElBQUksRUFBRSxRQUNyQyxLQUFLLE9BQU87QUFFaEIsa0JBQUksYUFBYSxJQUFJLE1BQU0sUUFBVztBQUNwQyxzQkFBTUEsTUFBSyxJQUFJLEtBQUssY0FBYyxJQUFJLEdBQUcsS0FBSyxhQUFhO0FBQzNELDZCQUFhLElBQUksSUFBSTtBQUFBLGNBQ3ZCLE9BQU87QUFDTCxzQkFBTSxhQUFhLElBQUk7QUFBQSxjQUN6QjtBQUVBLHNCQUFRLFFBQVEsS0FBSyxNQUFNLEtBQUssT0FBTyxLQUFLLE9BQU8sSUFBSSxLQUFLLEtBQUssS0FBSyxNQUFNLGNBQWMsS0FBSyxtQkFBbUIsU0FBUyxNQUFNO0FBQ2pJLHVCQUFTO0FBQ1QsdUJBQVM7QUFDVCxtQ0FBcUIsS0FBSyxNQUFNLFFBQVEsR0FBSSxJQUFJO0FBUWhELDBCQUFZLE9BQU8sV0FBVyxrQkFBa0I7QUFBQSxZQUNsRDtBQUVBLHlCQUFhLFFBQVEsSUFBSTtBQUFBLFVBQzNCO0FBRUEsZUFBSyxlQUFlO0FBQUEsUUFDdEI7QUFPQSxRQUFBQSxNQUFLLFFBQVEsVUFBVSxpQkFBaUIsV0FBWTtBQUNsRCxlQUFLLFdBQVdBLE1BQUssU0FBUztBQUFBLFlBQzVCLE9BQU8sS0FBSyxLQUFLLGFBQWEsRUFBRSxLQUFLO0FBQUEsVUFDdkM7QUFBQSxRQUNGO0FBVUEsUUFBQUEsTUFBSyxRQUFRLFVBQVUsUUFBUSxXQUFZO0FBQ3pDLGVBQUssNkJBQTZCO0FBQ2xDLGVBQUssbUJBQW1CO0FBQ3hCLGVBQUssZUFBZTtBQUVwQixpQkFBTyxJQUFJQSxNQUFLLE1BQU07QUFBQSxZQUNwQixlQUFlLEtBQUs7QUFBQSxZQUNwQixjQUFjLEtBQUs7QUFBQSxZQUNuQixVQUFVLEtBQUs7QUFBQSxZQUNmLFFBQVEsT0FBTyxLQUFLLEtBQUssT0FBTztBQUFBLFlBQ2hDLFVBQVUsS0FBSztBQUFBLFVBQ2pCLENBQUM7QUFBQSxRQUNIO0FBZ0JBLFFBQUFBLE1BQUssUUFBUSxVQUFVLE1BQU0sU0FBVSxJQUFJO0FBQ3pDLGNBQUksT0FBTyxNQUFNLFVBQVUsTUFBTSxLQUFLLFdBQVcsQ0FBQztBQUNsRCxlQUFLLFFBQVEsSUFBSTtBQUNqQixhQUFHLE1BQU0sTUFBTSxJQUFJO0FBQUEsUUFDckI7QUFhQSxRQUFBQSxNQUFLLFlBQVksU0FBVSxNQUFNLE9BQU8sVUFBVTtBQUNoRCxjQUFJLGlCQUFpQix1QkFBTyxPQUFPLElBQUksR0FDbkMsZUFBZSxPQUFPLEtBQUssWUFBWSxDQUFDLENBQUM7QUFPN0MsbUJBQVMsSUFBSSxHQUFHLElBQUksYUFBYSxRQUFRLEtBQUs7QUFDNUMsZ0JBQUksTUFBTSxhQUFhLENBQUM7QUFDeEIsMkJBQWUsR0FBRyxJQUFJLFNBQVMsR0FBRyxFQUFFLE1BQU07QUFBQSxVQUM1QztBQUVBLGVBQUssV0FBVyx1QkFBTyxPQUFPLElBQUk7QUFFbEMsY0FBSSxTQUFTLFFBQVc7QUFDdEIsaUJBQUssU0FBUyxJQUFJLElBQUksdUJBQU8sT0FBTyxJQUFJO0FBQ3hDLGlCQUFLLFNBQVMsSUFBSSxFQUFFLEtBQUssSUFBSTtBQUFBLFVBQy9CO0FBQUEsUUFDRjtBQVdBLFFBQUFBLE1BQUssVUFBVSxVQUFVLFVBQVUsU0FBVSxnQkFBZ0I7QUFDM0QsY0FBSSxRQUFRLE9BQU8sS0FBSyxlQUFlLFFBQVE7QUFFL0MsbUJBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsZ0JBQUksT0FBTyxNQUFNLENBQUMsR0FDZCxTQUFTLE9BQU8sS0FBSyxlQUFlLFNBQVMsSUFBSSxDQUFDO0FBRXRELGdCQUFJLEtBQUssU0FBUyxJQUFJLEtBQUssUUFBVztBQUNwQyxtQkFBSyxTQUFTLElBQUksSUFBSSx1QkFBTyxPQUFPLElBQUk7QUFBQSxZQUMxQztBQUVBLHFCQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sUUFBUSxLQUFLO0FBQ3RDLGtCQUFJLFFBQVEsT0FBTyxDQUFDLEdBQ2hCLE9BQU8sT0FBTyxLQUFLLGVBQWUsU0FBUyxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBRTNELGtCQUFJLEtBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxLQUFLLFFBQVc7QUFDM0MscUJBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxJQUFJLHVCQUFPLE9BQU8sSUFBSTtBQUFBLGNBQ2pEO0FBRUEsdUJBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUs7QUFDcEMsb0JBQUksTUFBTSxLQUFLLENBQUM7QUFFaEIsb0JBQUksS0FBSyxTQUFTLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxLQUFLLFFBQVc7QUFDaEQsdUJBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxlQUFlLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHO0FBQUEsZ0JBQzVFLE9BQU87QUFDTCx1QkFBSyxTQUFTLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLEtBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxPQUFPLGVBQWUsU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQztBQUFBLGdCQUNwSDtBQUFBLGNBRUY7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFTQSxRQUFBQSxNQUFLLFVBQVUsVUFBVSxNQUFNLFNBQVUsTUFBTSxPQUFPLFVBQVU7QUFDOUQsY0FBSSxFQUFFLFFBQVEsS0FBSyxXQUFXO0FBQzVCLGlCQUFLLFNBQVMsSUFBSSxJQUFJLHVCQUFPLE9BQU8sSUFBSTtBQUN4QyxpQkFBSyxTQUFTLElBQUksRUFBRSxLQUFLLElBQUk7QUFDN0I7QUFBQSxVQUNGO0FBRUEsY0FBSSxFQUFFLFNBQVMsS0FBSyxTQUFTLElBQUksSUFBSTtBQUNuQyxpQkFBSyxTQUFTLElBQUksRUFBRSxLQUFLLElBQUk7QUFDN0I7QUFBQSxVQUNGO0FBRUEsY0FBSSxlQUFlLE9BQU8sS0FBSyxRQUFRO0FBRXZDLG1CQUFTLElBQUksR0FBRyxJQUFJLGFBQWEsUUFBUSxLQUFLO0FBQzVDLGdCQUFJLE1BQU0sYUFBYSxDQUFDO0FBRXhCLGdCQUFJLE9BQU8sS0FBSyxTQUFTLElBQUksRUFBRSxLQUFLLEdBQUc7QUFDckMsbUJBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxLQUFLLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsT0FBTyxTQUFTLEdBQUcsQ0FBQztBQUFBLFlBQ3hGLE9BQU87QUFDTCxtQkFBSyxTQUFTLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLFNBQVMsR0FBRztBQUFBLFlBQ2hEO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFZQSxRQUFBQSxNQUFLLFFBQVEsU0FBVSxXQUFXO0FBQ2hDLGVBQUssVUFBVSxDQUFDO0FBQ2hCLGVBQUssWUFBWTtBQUFBLFFBQ25CO0FBMEJBLFFBQUFBLE1BQUssTUFBTSxXQUFXLElBQUksT0FBUSxHQUFHO0FBQ3JDLFFBQUFBLE1BQUssTUFBTSxTQUFTLE9BQU87QUFDM0IsUUFBQUEsTUFBSyxNQUFNLFNBQVMsVUFBVTtBQUM5QixRQUFBQSxNQUFLLE1BQU0sU0FBUyxXQUFXO0FBYS9CLFFBQUFBLE1BQUssTUFBTSxXQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFJcEIsVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNVixVQUFVO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1WLFlBQVk7QUFBQSxRQUNkO0FBeUJBLFFBQUFBLE1BQUssTUFBTSxVQUFVLFNBQVMsU0FBVSxRQUFRO0FBQzlDLGNBQUksRUFBRSxZQUFZLFNBQVM7QUFDekIsbUJBQU8sU0FBUyxLQUFLO0FBQUEsVUFDdkI7QUFFQSxjQUFJLEVBQUUsV0FBVyxTQUFTO0FBQ3hCLG1CQUFPLFFBQVE7QUFBQSxVQUNqQjtBQUVBLGNBQUksRUFBRSxpQkFBaUIsU0FBUztBQUM5QixtQkFBTyxjQUFjO0FBQUEsVUFDdkI7QUFFQSxjQUFJLEVBQUUsY0FBYyxTQUFTO0FBQzNCLG1CQUFPLFdBQVdBLE1BQUssTUFBTSxTQUFTO0FBQUEsVUFDeEM7QUFFQSxjQUFLLE9BQU8sV0FBV0EsTUFBSyxNQUFNLFNBQVMsV0FBYSxPQUFPLEtBQUssT0FBTyxDQUFDLEtBQUtBLE1BQUssTUFBTSxVQUFXO0FBQ3JHLG1CQUFPLE9BQU8sTUFBTSxPQUFPO0FBQUEsVUFDN0I7QUFFQSxjQUFLLE9BQU8sV0FBV0EsTUFBSyxNQUFNLFNBQVMsWUFBYyxPQUFPLEtBQUssTUFBTSxFQUFFLEtBQUtBLE1BQUssTUFBTSxVQUFXO0FBQ3RHLG1CQUFPLE9BQU8sS0FBSyxPQUFPLE9BQU87QUFBQSxVQUNuQztBQUVBLGNBQUksRUFBRSxjQUFjLFNBQVM7QUFDM0IsbUJBQU8sV0FBV0EsTUFBSyxNQUFNLFNBQVM7QUFBQSxVQUN4QztBQUVBLGVBQUssUUFBUSxLQUFLLE1BQU07QUFFeEIsaUJBQU87QUFBQSxRQUNUO0FBU0EsUUFBQUEsTUFBSyxNQUFNLFVBQVUsWUFBWSxXQUFZO0FBQzNDLG1CQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxRQUFRLEtBQUs7QUFDNUMsZ0JBQUksS0FBSyxRQUFRLENBQUMsRUFBRSxZQUFZQSxNQUFLLE1BQU0sU0FBUyxZQUFZO0FBQzlELHFCQUFPO0FBQUEsWUFDVDtBQUFBLFVBQ0Y7QUFFQSxpQkFBTztBQUFBLFFBQ1Q7QUE0QkEsUUFBQUEsTUFBSyxNQUFNLFVBQVUsT0FBTyxTQUFVLE1BQU0sU0FBUztBQUNuRCxjQUFJLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDdkIsaUJBQUssUUFBUSxTQUFVLEdBQUc7QUFBRSxtQkFBSyxLQUFLLEdBQUdBLE1BQUssTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLFlBQUUsR0FBRyxJQUFJO0FBQzNFLG1CQUFPO0FBQUEsVUFDVDtBQUVBLGNBQUksU0FBUyxXQUFXLENBQUM7QUFDekIsaUJBQU8sT0FBTyxLQUFLLFNBQVM7QUFFNUIsZUFBSyxPQUFPLE1BQU07QUFFbEIsaUJBQU87QUFBQSxRQUNUO0FBQ0EsUUFBQUEsTUFBSyxrQkFBa0IsU0FBVSxTQUFTRSxRQUFPLEtBQUs7QUFDcEQsZUFBSyxPQUFPO0FBQ1osZUFBSyxVQUFVO0FBQ2YsZUFBSyxRQUFRQTtBQUNiLGVBQUssTUFBTTtBQUFBLFFBQ2I7QUFFQSxRQUFBRixNQUFLLGdCQUFnQixZQUFZLElBQUk7QUFDckMsUUFBQUEsTUFBSyxhQUFhLFNBQVUsS0FBSztBQUMvQixlQUFLLFVBQVUsQ0FBQztBQUNoQixlQUFLLE1BQU07QUFDWCxlQUFLLFNBQVMsSUFBSTtBQUNsQixlQUFLLE1BQU07QUFDWCxlQUFLLFFBQVE7QUFDYixlQUFLLHNCQUFzQixDQUFDO0FBQUEsUUFDOUI7QUFFQSxRQUFBQSxNQUFLLFdBQVcsVUFBVSxNQUFNLFdBQVk7QUFDMUMsY0FBSSxRQUFRQSxNQUFLLFdBQVc7QUFFNUIsaUJBQU8sT0FBTztBQUNaLG9CQUFRLE1BQU0sSUFBSTtBQUFBLFVBQ3BCO0FBQUEsUUFDRjtBQUVBLFFBQUFBLE1BQUssV0FBVyxVQUFVLGNBQWMsV0FBWTtBQUNsRCxjQUFJLFlBQVksQ0FBQyxHQUNiLGFBQWEsS0FBSyxPQUNsQixXQUFXLEtBQUs7QUFFcEIsbUJBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxvQkFBb0IsUUFBUSxLQUFLO0FBQ3hELHVCQUFXLEtBQUssb0JBQW9CLENBQUM7QUFDckMsc0JBQVUsS0FBSyxLQUFLLElBQUksTUFBTSxZQUFZLFFBQVEsQ0FBQztBQUNuRCx5QkFBYSxXQUFXO0FBQUEsVUFDMUI7QUFFQSxvQkFBVSxLQUFLLEtBQUssSUFBSSxNQUFNLFlBQVksS0FBSyxHQUFHLENBQUM7QUFDbkQsZUFBSyxvQkFBb0IsU0FBUztBQUVsQyxpQkFBTyxVQUFVLEtBQUssRUFBRTtBQUFBLFFBQzFCO0FBRUEsUUFBQUEsTUFBSyxXQUFXLFVBQVUsT0FBTyxTQUFVLE1BQU07QUFDL0MsZUFBSyxRQUFRLEtBQUs7QUFBQSxZQUNoQjtBQUFBLFlBQ0EsS0FBSyxLQUFLLFlBQVk7QUFBQSxZQUN0QixPQUFPLEtBQUs7QUFBQSxZQUNaLEtBQUssS0FBSztBQUFBLFVBQ1osQ0FBQztBQUVELGVBQUssUUFBUSxLQUFLO0FBQUEsUUFDcEI7QUFFQSxRQUFBQSxNQUFLLFdBQVcsVUFBVSxrQkFBa0IsV0FBWTtBQUN0RCxlQUFLLG9CQUFvQixLQUFLLEtBQUssTUFBTSxDQUFDO0FBQzFDLGVBQUssT0FBTztBQUFBLFFBQ2Q7QUFFQSxRQUFBQSxNQUFLLFdBQVcsVUFBVSxPQUFPLFdBQVk7QUFDM0MsY0FBSSxLQUFLLE9BQU8sS0FBSyxRQUFRO0FBQzNCLG1CQUFPQSxNQUFLLFdBQVc7QUFBQSxVQUN6QjtBQUVBLGNBQUksT0FBTyxLQUFLLElBQUksT0FBTyxLQUFLLEdBQUc7QUFDbkMsZUFBSyxPQUFPO0FBQ1osaUJBQU87QUFBQSxRQUNUO0FBRUEsUUFBQUEsTUFBSyxXQUFXLFVBQVUsUUFBUSxXQUFZO0FBQzVDLGlCQUFPLEtBQUssTUFBTSxLQUFLO0FBQUEsUUFDekI7QUFFQSxRQUFBQSxNQUFLLFdBQVcsVUFBVSxTQUFTLFdBQVk7QUFDN0MsY0FBSSxLQUFLLFNBQVMsS0FBSyxLQUFLO0FBQzFCLGlCQUFLLE9BQU87QUFBQSxVQUNkO0FBRUEsZUFBSyxRQUFRLEtBQUs7QUFBQSxRQUNwQjtBQUVBLFFBQUFBLE1BQUssV0FBVyxVQUFVLFNBQVMsV0FBWTtBQUM3QyxlQUFLLE9BQU87QUFBQSxRQUNkO0FBRUEsUUFBQUEsTUFBSyxXQUFXLFVBQVUsaUJBQWlCLFdBQVk7QUFDckQsY0FBSSxNQUFNO0FBRVYsYUFBRztBQUNELG1CQUFPLEtBQUssS0FBSztBQUNqQix1QkFBVyxLQUFLLFdBQVcsQ0FBQztBQUFBLFVBQzlCLFNBQVMsV0FBVyxNQUFNLFdBQVc7QUFFckMsY0FBSSxRQUFRQSxNQUFLLFdBQVcsS0FBSztBQUMvQixpQkFBSyxPQUFPO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFFQSxRQUFBQSxNQUFLLFdBQVcsVUFBVSxPQUFPLFdBQVk7QUFDM0MsaUJBQU8sS0FBSyxNQUFNLEtBQUs7QUFBQSxRQUN6QjtBQUVBLFFBQUFBLE1BQUssV0FBVyxNQUFNO0FBQ3RCLFFBQUFBLE1BQUssV0FBVyxRQUFRO0FBQ3hCLFFBQUFBLE1BQUssV0FBVyxPQUFPO0FBQ3ZCLFFBQUFBLE1BQUssV0FBVyxnQkFBZ0I7QUFDaEMsUUFBQUEsTUFBSyxXQUFXLFFBQVE7QUFDeEIsUUFBQUEsTUFBSyxXQUFXLFdBQVc7QUFFM0IsUUFBQUEsTUFBSyxXQUFXLFdBQVcsU0FBVSxPQUFPO0FBQzFDLGdCQUFNLE9BQU87QUFDYixnQkFBTSxLQUFLQSxNQUFLLFdBQVcsS0FBSztBQUNoQyxnQkFBTSxPQUFPO0FBQ2IsaUJBQU9BLE1BQUssV0FBVztBQUFBLFFBQ3pCO0FBRUEsUUFBQUEsTUFBSyxXQUFXLFVBQVUsU0FBVSxPQUFPO0FBQ3pDLGNBQUksTUFBTSxNQUFNLElBQUksR0FBRztBQUNyQixrQkFBTSxPQUFPO0FBQ2Isa0JBQU0sS0FBS0EsTUFBSyxXQUFXLElBQUk7QUFBQSxVQUNqQztBQUVBLGdCQUFNLE9BQU87QUFFYixjQUFJLE1BQU0sS0FBSyxHQUFHO0FBQ2hCLG1CQUFPQSxNQUFLLFdBQVc7QUFBQSxVQUN6QjtBQUFBLFFBQ0Y7QUFFQSxRQUFBQSxNQUFLLFdBQVcsa0JBQWtCLFNBQVUsT0FBTztBQUNqRCxnQkFBTSxPQUFPO0FBQ2IsZ0JBQU0sZUFBZTtBQUNyQixnQkFBTSxLQUFLQSxNQUFLLFdBQVcsYUFBYTtBQUN4QyxpQkFBT0EsTUFBSyxXQUFXO0FBQUEsUUFDekI7QUFFQSxRQUFBQSxNQUFLLFdBQVcsV0FBVyxTQUFVLE9BQU87QUFDMUMsZ0JBQU0sT0FBTztBQUNiLGdCQUFNLGVBQWU7QUFDckIsZ0JBQU0sS0FBS0EsTUFBSyxXQUFXLEtBQUs7QUFDaEMsaUJBQU9BLE1BQUssV0FBVztBQUFBLFFBQ3pCO0FBRUEsUUFBQUEsTUFBSyxXQUFXLFNBQVMsU0FBVSxPQUFPO0FBQ3hDLGNBQUksTUFBTSxNQUFNLElBQUksR0FBRztBQUNyQixrQkFBTSxLQUFLQSxNQUFLLFdBQVcsSUFBSTtBQUFBLFVBQ2pDO0FBQUEsUUFDRjtBQWFBLFFBQUFBLE1BQUssV0FBVyxnQkFBZ0JBLE1BQUssVUFBVTtBQUUvQyxRQUFBQSxNQUFLLFdBQVcsVUFBVSxTQUFVLE9BQU87QUFDekMsaUJBQU8sTUFBTTtBQUNYLGdCQUFJLE9BQU8sTUFBTSxLQUFLO0FBRXRCLGdCQUFJLFFBQVFBLE1BQUssV0FBVyxLQUFLO0FBQy9CLHFCQUFPQSxNQUFLLFdBQVc7QUFBQSxZQUN6QjtBQUdBLGdCQUFJLEtBQUssV0FBVyxDQUFDLEtBQUssSUFBSTtBQUM1QixvQkFBTSxnQkFBZ0I7QUFDdEI7QUFBQSxZQUNGO0FBRUEsZ0JBQUksUUFBUSxLQUFLO0FBQ2YscUJBQU9BLE1BQUssV0FBVztBQUFBLFlBQ3pCO0FBRUEsZ0JBQUksUUFBUSxLQUFLO0FBQ2Ysb0JBQU0sT0FBTztBQUNiLGtCQUFJLE1BQU0sTUFBTSxJQUFJLEdBQUc7QUFDckIsc0JBQU0sS0FBS0EsTUFBSyxXQUFXLElBQUk7QUFBQSxjQUNqQztBQUNBLHFCQUFPQSxNQUFLLFdBQVc7QUFBQSxZQUN6QjtBQUVBLGdCQUFJLFFBQVEsS0FBSztBQUNmLG9CQUFNLE9BQU87QUFDYixrQkFBSSxNQUFNLE1BQU0sSUFBSSxHQUFHO0FBQ3JCLHNCQUFNLEtBQUtBLE1BQUssV0FBVyxJQUFJO0FBQUEsY0FDakM7QUFDQSxxQkFBT0EsTUFBSyxXQUFXO0FBQUEsWUFDekI7QUFLQSxnQkFBSSxRQUFRLE9BQU8sTUFBTSxNQUFNLE1BQU0sR0FBRztBQUN0QyxvQkFBTSxLQUFLQSxNQUFLLFdBQVcsUUFBUTtBQUNuQyxxQkFBT0EsTUFBSyxXQUFXO0FBQUEsWUFDekI7QUFLQSxnQkFBSSxRQUFRLE9BQU8sTUFBTSxNQUFNLE1BQU0sR0FBRztBQUN0QyxvQkFBTSxLQUFLQSxNQUFLLFdBQVcsUUFBUTtBQUNuQyxxQkFBT0EsTUFBSyxXQUFXO0FBQUEsWUFDekI7QUFFQSxnQkFBSSxLQUFLLE1BQU1BLE1BQUssV0FBVyxhQUFhLEdBQUc7QUFDN0MscUJBQU9BLE1BQUssV0FBVztBQUFBLFlBQ3pCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxRQUFBQSxNQUFLLGNBQWMsU0FBVSxLQUFLLE9BQU87QUFDdkMsZUFBSyxRQUFRLElBQUlBLE1BQUssV0FBWSxHQUFHO0FBQ3JDLGVBQUssUUFBUTtBQUNiLGVBQUssZ0JBQWdCLENBQUM7QUFDdEIsZUFBSyxZQUFZO0FBQUEsUUFDbkI7QUFFQSxRQUFBQSxNQUFLLFlBQVksVUFBVSxRQUFRLFdBQVk7QUFDN0MsZUFBSyxNQUFNLElBQUk7QUFDZixlQUFLLFVBQVUsS0FBSyxNQUFNO0FBRTFCLGNBQUksUUFBUUEsTUFBSyxZQUFZO0FBRTdCLGlCQUFPLE9BQU87QUFDWixvQkFBUSxNQUFNLElBQUk7QUFBQSxVQUNwQjtBQUVBLGlCQUFPLEtBQUs7QUFBQSxRQUNkO0FBRUEsUUFBQUEsTUFBSyxZQUFZLFVBQVUsYUFBYSxXQUFZO0FBQ2xELGlCQUFPLEtBQUssUUFBUSxLQUFLLFNBQVM7QUFBQSxRQUNwQztBQUVBLFFBQUFBLE1BQUssWUFBWSxVQUFVLGdCQUFnQixXQUFZO0FBQ3JELGNBQUksU0FBUyxLQUFLLFdBQVc7QUFDN0IsZUFBSyxhQUFhO0FBQ2xCLGlCQUFPO0FBQUEsUUFDVDtBQUVBLFFBQUFBLE1BQUssWUFBWSxVQUFVLGFBQWEsV0FBWTtBQUNsRCxjQUFJLGtCQUFrQixLQUFLO0FBQzNCLGVBQUssTUFBTSxPQUFPLGVBQWU7QUFDakMsZUFBSyxnQkFBZ0IsQ0FBQztBQUFBLFFBQ3hCO0FBRUEsUUFBQUEsTUFBSyxZQUFZLGNBQWMsU0FBVSxRQUFRO0FBQy9DLGNBQUksU0FBUyxPQUFPLFdBQVc7QUFFL0IsY0FBSSxVQUFVLFFBQVc7QUFDdkI7QUFBQSxVQUNGO0FBRUEsa0JBQVEsT0FBTyxNQUFNO0FBQUEsWUFDbkIsS0FBS0EsTUFBSyxXQUFXO0FBQ25CLHFCQUFPQSxNQUFLLFlBQVk7QUFBQSxZQUMxQixLQUFLQSxNQUFLLFdBQVc7QUFDbkIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBT0EsTUFBSyxZQUFZO0FBQUEsWUFDMUI7QUFDRSxrQkFBSSxlQUFlLDhDQUE4QyxPQUFPO0FBRXhFLGtCQUFJLE9BQU8sSUFBSSxVQUFVLEdBQUc7QUFDMUIsZ0NBQWdCLGtCQUFrQixPQUFPLE1BQU07QUFBQSxjQUNqRDtBQUVBLG9CQUFNLElBQUlBLE1BQUssZ0JBQWlCLGNBQWMsT0FBTyxPQUFPLE9BQU8sR0FBRztBQUFBLFVBQzFFO0FBQUEsUUFDRjtBQUVBLFFBQUFBLE1BQUssWUFBWSxnQkFBZ0IsU0FBVSxRQUFRO0FBQ2pELGNBQUksU0FBUyxPQUFPLGNBQWM7QUFFbEMsY0FBSSxVQUFVLFFBQVc7QUFDdkI7QUFBQSxVQUNGO0FBRUEsa0JBQVEsT0FBTyxLQUFLO0FBQUEsWUFDbEIsS0FBSztBQUNILHFCQUFPLGNBQWMsV0FBV0EsTUFBSyxNQUFNLFNBQVM7QUFDcEQ7QUFBQSxZQUNGLEtBQUs7QUFDSCxxQkFBTyxjQUFjLFdBQVdBLE1BQUssTUFBTSxTQUFTO0FBQ3BEO0FBQUEsWUFDRjtBQUNFLGtCQUFJLGVBQWUsb0NBQW9DLE9BQU8sTUFBTTtBQUNwRSxvQkFBTSxJQUFJQSxNQUFLLGdCQUFpQixjQUFjLE9BQU8sT0FBTyxPQUFPLEdBQUc7QUFBQSxVQUMxRTtBQUVBLGNBQUksYUFBYSxPQUFPLFdBQVc7QUFFbkMsY0FBSSxjQUFjLFFBQVc7QUFDM0IsZ0JBQUksZUFBZTtBQUNuQixrQkFBTSxJQUFJQSxNQUFLLGdCQUFpQixjQUFjLE9BQU8sT0FBTyxPQUFPLEdBQUc7QUFBQSxVQUN4RTtBQUVBLGtCQUFRLFdBQVcsTUFBTTtBQUFBLFlBQ3ZCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBT0EsTUFBSyxZQUFZO0FBQUEsWUFDMUIsS0FBS0EsTUFBSyxXQUFXO0FBQ25CLHFCQUFPQSxNQUFLLFlBQVk7QUFBQSxZQUMxQjtBQUNFLGtCQUFJLGVBQWUscUNBQXFDLFdBQVcsT0FBTztBQUMxRSxvQkFBTSxJQUFJQSxNQUFLLGdCQUFpQixjQUFjLFdBQVcsT0FBTyxXQUFXLEdBQUc7QUFBQSxVQUNsRjtBQUFBLFFBQ0Y7QUFFQSxRQUFBQSxNQUFLLFlBQVksYUFBYSxTQUFVLFFBQVE7QUFDOUMsY0FBSSxTQUFTLE9BQU8sY0FBYztBQUVsQyxjQUFJLFVBQVUsUUFBVztBQUN2QjtBQUFBLFVBQ0Y7QUFFQSxjQUFJLE9BQU8sTUFBTSxVQUFVLFFBQVEsT0FBTyxHQUFHLEtBQUssSUFBSTtBQUNwRCxnQkFBSSxpQkFBaUIsT0FBTyxNQUFNLFVBQVUsSUFBSSxTQUFVLEdBQUc7QUFBRSxxQkFBTyxNQUFNLElBQUk7QUFBQSxZQUFJLENBQUMsRUFBRSxLQUFLLElBQUksR0FDNUYsZUFBZSx5QkFBeUIsT0FBTyxNQUFNLHlCQUF5QjtBQUVsRixrQkFBTSxJQUFJQSxNQUFLLGdCQUFpQixjQUFjLE9BQU8sT0FBTyxPQUFPLEdBQUc7QUFBQSxVQUN4RTtBQUVBLGlCQUFPLGNBQWMsU0FBUyxDQUFDLE9BQU8sR0FBRztBQUV6QyxjQUFJLGFBQWEsT0FBTyxXQUFXO0FBRW5DLGNBQUksY0FBYyxRQUFXO0FBQzNCLGdCQUFJLGVBQWU7QUFDbkIsa0JBQU0sSUFBSUEsTUFBSyxnQkFBaUIsY0FBYyxPQUFPLE9BQU8sT0FBTyxHQUFHO0FBQUEsVUFDeEU7QUFFQSxrQkFBUSxXQUFXLE1BQU07QUFBQSxZQUN2QixLQUFLQSxNQUFLLFdBQVc7QUFDbkIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCO0FBQ0Usa0JBQUksZUFBZSw0QkFBNEIsV0FBVyxPQUFPO0FBQ2pFLG9CQUFNLElBQUlBLE1BQUssZ0JBQWlCLGNBQWMsV0FBVyxPQUFPLFdBQVcsR0FBRztBQUFBLFVBQ2xGO0FBQUEsUUFDRjtBQUVBLFFBQUFBLE1BQUssWUFBWSxZQUFZLFNBQVUsUUFBUTtBQUM3QyxjQUFJLFNBQVMsT0FBTyxjQUFjO0FBRWxDLGNBQUksVUFBVSxRQUFXO0FBQ3ZCO0FBQUEsVUFDRjtBQUVBLGlCQUFPLGNBQWMsT0FBTyxPQUFPLElBQUksWUFBWTtBQUVuRCxjQUFJLE9BQU8sSUFBSSxRQUFRLEdBQUcsS0FBSyxJQUFJO0FBQ2pDLG1CQUFPLGNBQWMsY0FBYztBQUFBLFVBQ3JDO0FBRUEsY0FBSSxhQUFhLE9BQU8sV0FBVztBQUVuQyxjQUFJLGNBQWMsUUFBVztBQUMzQixtQkFBTyxXQUFXO0FBQ2xCO0FBQUEsVUFDRjtBQUVBLGtCQUFRLFdBQVcsTUFBTTtBQUFBLFlBQ3ZCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBTyxXQUFXO0FBQ2xCLHFCQUFPQSxNQUFLLFlBQVk7QUFBQSxZQUMxQixLQUFLQSxNQUFLLFdBQVc7QUFDbkIscUJBQU8sV0FBVztBQUNsQixxQkFBT0EsTUFBSyxZQUFZO0FBQUEsWUFDMUIsS0FBS0EsTUFBSyxXQUFXO0FBQ25CLHFCQUFPQSxNQUFLLFlBQVk7QUFBQSxZQUMxQixLQUFLQSxNQUFLLFdBQVc7QUFDbkIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBTyxXQUFXO0FBQ2xCLHFCQUFPQSxNQUFLLFlBQVk7QUFBQSxZQUMxQjtBQUNFLGtCQUFJLGVBQWUsNkJBQTZCLFdBQVcsT0FBTztBQUNsRSxvQkFBTSxJQUFJQSxNQUFLLGdCQUFpQixjQUFjLFdBQVcsT0FBTyxXQUFXLEdBQUc7QUFBQSxVQUNsRjtBQUFBLFFBQ0Y7QUFFQSxRQUFBQSxNQUFLLFlBQVksb0JBQW9CLFNBQVUsUUFBUTtBQUNyRCxjQUFJLFNBQVMsT0FBTyxjQUFjO0FBRWxDLGNBQUksVUFBVSxRQUFXO0FBQ3ZCO0FBQUEsVUFDRjtBQUVBLGNBQUksZUFBZSxTQUFTLE9BQU8sS0FBSyxFQUFFO0FBRTFDLGNBQUksTUFBTSxZQUFZLEdBQUc7QUFDdkIsZ0JBQUksZUFBZTtBQUNuQixrQkFBTSxJQUFJQSxNQUFLLGdCQUFpQixjQUFjLE9BQU8sT0FBTyxPQUFPLEdBQUc7QUFBQSxVQUN4RTtBQUVBLGlCQUFPLGNBQWMsZUFBZTtBQUVwQyxjQUFJLGFBQWEsT0FBTyxXQUFXO0FBRW5DLGNBQUksY0FBYyxRQUFXO0FBQzNCLG1CQUFPLFdBQVc7QUFDbEI7QUFBQSxVQUNGO0FBRUEsa0JBQVEsV0FBVyxNQUFNO0FBQUEsWUFDdkIsS0FBS0EsTUFBSyxXQUFXO0FBQ25CLHFCQUFPLFdBQVc7QUFDbEIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBTyxXQUFXO0FBQ2xCLHFCQUFPQSxNQUFLLFlBQVk7QUFBQSxZQUMxQixLQUFLQSxNQUFLLFdBQVc7QUFDbkIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBT0EsTUFBSyxZQUFZO0FBQUEsWUFDMUIsS0FBS0EsTUFBSyxXQUFXO0FBQ25CLHFCQUFPLFdBQVc7QUFDbEIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCO0FBQ0Usa0JBQUksZUFBZSw2QkFBNkIsV0FBVyxPQUFPO0FBQ2xFLG9CQUFNLElBQUlBLE1BQUssZ0JBQWlCLGNBQWMsV0FBVyxPQUFPLFdBQVcsR0FBRztBQUFBLFVBQ2xGO0FBQUEsUUFDRjtBQUVBLFFBQUFBLE1BQUssWUFBWSxhQUFhLFNBQVUsUUFBUTtBQUM5QyxjQUFJLFNBQVMsT0FBTyxjQUFjO0FBRWxDLGNBQUksVUFBVSxRQUFXO0FBQ3ZCO0FBQUEsVUFDRjtBQUVBLGNBQUksUUFBUSxTQUFTLE9BQU8sS0FBSyxFQUFFO0FBRW5DLGNBQUksTUFBTSxLQUFLLEdBQUc7QUFDaEIsZ0JBQUksZUFBZTtBQUNuQixrQkFBTSxJQUFJQSxNQUFLLGdCQUFpQixjQUFjLE9BQU8sT0FBTyxPQUFPLEdBQUc7QUFBQSxVQUN4RTtBQUVBLGlCQUFPLGNBQWMsUUFBUTtBQUU3QixjQUFJLGFBQWEsT0FBTyxXQUFXO0FBRW5DLGNBQUksY0FBYyxRQUFXO0FBQzNCLG1CQUFPLFdBQVc7QUFDbEI7QUFBQSxVQUNGO0FBRUEsa0JBQVEsV0FBVyxNQUFNO0FBQUEsWUFDdkIsS0FBS0EsTUFBSyxXQUFXO0FBQ25CLHFCQUFPLFdBQVc7QUFDbEIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBTyxXQUFXO0FBQ2xCLHFCQUFPQSxNQUFLLFlBQVk7QUFBQSxZQUMxQixLQUFLQSxNQUFLLFdBQVc7QUFDbkIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCLEtBQUtBLE1BQUssV0FBVztBQUNuQixxQkFBT0EsTUFBSyxZQUFZO0FBQUEsWUFDMUIsS0FBS0EsTUFBSyxXQUFXO0FBQ25CLHFCQUFPLFdBQVc7QUFDbEIscUJBQU9BLE1BQUssWUFBWTtBQUFBLFlBQzFCO0FBQ0Usa0JBQUksZUFBZSw2QkFBNkIsV0FBVyxPQUFPO0FBQ2xFLG9CQUFNLElBQUlBLE1BQUssZ0JBQWlCLGNBQWMsV0FBVyxPQUFPLFdBQVcsR0FBRztBQUFBLFVBQ2xGO0FBQUEsUUFDRjtBQU1HLFNBQUMsU0FBVSxNQUFNLFNBQVM7QUFDekIsY0FBSSxPQUFPLFdBQVcsY0FBYyxPQUFPLEtBQUs7QUFFOUMsbUJBQU8sT0FBTztBQUFBLFVBQ2hCLFdBQVcsT0FBTyxZQUFZLFVBQVU7QUFNdEMsbUJBQU8sVUFBVSxRQUFRO0FBQUEsVUFDM0IsT0FBTztBQUVMLGlCQUFLLE9BQU8sUUFBUTtBQUFBLFVBQ3RCO0FBQUEsUUFDRixHQUFFLE1BQU0sV0FBWTtBQU1sQixpQkFBT0E7QUFBQSxRQUNULENBQUM7QUFBQSxNQUNILEdBQUc7QUFBQTtBQUFBOzs7QUNsNUdILE1BQU0sUUFBUSxJQUFJLFFBQVEsSUFBSSxLQUFLLFNBQVMsUUFBUSxJQUFJLFdBQVk7QUFBQSxFQUFDO0FBRXJFLE1BQU0sNEJBQTRCLFNBQVUsTUFBTSxTQUFTO0FBQzFELFVBQU0sNkJBQTZCLE1BQU0sT0FBTztBQUNoRCxhQUFTLGlCQUFpQiw0QkFBNEIsSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLE9BQU87QUFDN0UsVUFBSSxZQUFZLEdBQUcsUUFBUSxZQUFZO0FBQ3ZDLGdCQUFVLE1BQU0sVUFBVSxVQUFVLFVBQVU7QUFBQSxJQUMvQyxDQUFDO0FBQUEsRUFDRjtBQUVPLFdBQVMsb0JBQW9CO0FBQ25DLFdBQU87QUFBQSxNQUNOLE1BQU0sQ0FBQztBQUFBLE1BQ1AsZ0JBQWdCLFNBQVUsT0FBTztBQUNoQyxjQUFNLGtCQUFrQixLQUFLO0FBQzdCLGlCQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxRQUFRLEtBQUs7QUFDMUMsY0FBSSxXQUFXLE1BQU07QUFDckIsZUFBSyxLQUFLLENBQUMsRUFBRSxTQUFTO0FBRXRCLG9DQUEwQixLQUFLLEtBQUssQ0FBQyxFQUFFLEtBQUssUUFBUTtBQUFBLFFBQ3JEO0FBQUEsTUFDRDtBQUFBLE1BQ0EsV0FBVyxTQUFVLE1BQU07QUFDMUIsY0FBTSxhQUFhLElBQUk7QUFDdkIsYUFBSyxDQUFDLEVBQUUsU0FBUztBQUNqQixhQUFLLE9BQU87QUFFWixlQUFPLEtBQUssVUFBVSxNQUFNO0FBQzNCLGVBQUssZUFBZSxDQUFDO0FBQUEsUUFDdEIsQ0FBQztBQUFBLE1BQ0Y7QUFBQSxJQUNEO0FBQUEsRUFDRDs7O0FDaENBLGFBQXNCOzs7QUNBZixNQUFNLFlBQU4sTUFBZ0I7QUFBQSxJQUN0QixZQUNDLE9BQU87QUFBQSxNQUNOLGlCQUFpQjtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxJQUNaLEdBQ0M7QUFDRCxXQUFLLE9BQU87QUFDWixXQUFLLFlBQVksQ0FBQztBQUFBLElBQ25CO0FBQUEsSUFFQSxNQUFNLElBQUk7QUFDVCxZQUFNLGFBQWEsU0FBUztBQUFBLFFBQzNCLEtBQUssUUFBUTtBQUFBLFFBQ2IsV0FBVztBQUFBLFFBQ1g7QUFBQSxVQUNDLFlBQVksQ0FBQyxTQUFTO0FBQ3JCLGdCQUFJLEtBQUssV0FBVyxVQUFVLFNBQVMsS0FBSyxLQUFLLFNBQVMsR0FBRztBQUM1RCxxQkFBTyxXQUFXO0FBQUEsWUFDbkI7QUFDQSxnQkFBSSxLQUFLLEtBQUssS0FBSyxJQUFJLEdBQUc7QUFDekIscUJBQU8sV0FBVztBQUFBLFlBQ25CO0FBQ0EsbUJBQU8sV0FBVztBQUFBLFVBQ25CO0FBQUEsUUFDRDtBQUFBLFFBQ0E7QUFBQSxNQUNEO0FBSUEsVUFBSSxVQUFVLENBQUM7QUFDZixhQUFPLFdBQVcsU0FBUyxHQUFHO0FBQzdCLFlBQUksT0FBTyxXQUFXO0FBQ3RCLFlBQUksS0FBSyxLQUFLLE1BQU0sRUFBRSxHQUFHO0FBQ3hCLGtCQUFRLEtBQUssSUFBSTtBQUFBLFFBQ2xCO0FBQUEsTUFDRDtBQUdBLGNBQVEsUUFBUSxDQUFDLFNBQVM7QUFFekIsWUFBSSxjQUFjLEtBQUssV0FBVyxVQUFVLElBQUk7QUFFaEQsb0JBQVksV0FBVyxRQUFRLENBQUNJLFVBQVM7QUFDeEMsY0FBSUEsTUFBSyxhQUFhLEtBQUssV0FBVztBQUNyQztBQUFBLFVBQ0Q7QUFFQSxjQUFJLFFBQVFBLE1BQUssS0FBSyxNQUFNLEVBQUU7QUFDOUIsY0FBSSxDQUFDLE9BQU87QUFDWDtBQUFBLFVBQ0Q7QUFFQSxjQUFJLE1BQU1BLE1BQUssS0FBSyxRQUFRLE1BQU0sQ0FBQyxHQUFHLE1BQU0sS0FBSztBQUNqRCxjQUFJLFFBQVEsSUFBSTtBQUNmO0FBQUEsVUFDRDtBQUVBLGNBQUksT0FBTyxTQUFTLGNBQWMsTUFBTTtBQUN4QyxlQUFLLFVBQVUsSUFBSSxLQUFLLEtBQUssU0FBUztBQUV0QyxjQUFJLFdBQVdBLE1BQUssVUFBVSxHQUFHO0FBQ2pDLG1CQUFTLFVBQVUsTUFBTSxDQUFDLEVBQUUsTUFBTTtBQUNsQyxjQUFJLFlBQVksU0FBUyxVQUFVLElBQUk7QUFFdkMsZUFBSyxZQUFZLFNBQVM7QUFDMUIsc0JBQVksYUFBYSxNQUFNLFFBQVE7QUFBQSxRQUN4QyxDQUFDO0FBRUQsWUFBSSxLQUFLLGNBQWMsS0FBSyxXQUFXLFlBQVk7QUFDbEQsZUFBSyxVQUFVLEtBQUs7QUFBQSxZQUNuQixLQUFLLEtBQUs7QUFBQSxZQUNWLEtBQUs7QUFBQSxVQUNOLENBQUM7QUFDRCxlQUFLLFdBQVcsV0FBVyxhQUFhLGFBQWEsS0FBSyxVQUFVO0FBQUEsUUFDckU7QUFBQSxNQUNELENBQUM7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQ1IsYUFBTyxLQUFLLFVBQVUsUUFBUTtBQUM3QixZQUFJLE9BQU8sS0FBSyxVQUFVLElBQUk7QUFDOUIsYUFBSyxJQUFJLFdBQVcsYUFBYSxLQUFLLEtBQUssS0FBSyxHQUFHO0FBQUEsTUFDcEQ7QUFBQSxJQUNEO0FBQUEsSUFFQSxVQUFVO0FBQ1QsYUFBTyxTQUFTLGNBQWMsS0FBSyxLQUFLLGVBQWU7QUFBQSxJQUN4RDtBQUFBLEVBQ0Q7OztBRHZGQSxXQUFTLFVBQVUsTUFBTSxVQUFVO0FBQ2xDLFFBQUksV0FBVyxDQUFDO0FBRWhCLFdBQU8sS0FBSztBQUVaLFdBQU8sTUFBTTtBQUNaLFVBQUksS0FBSyxRQUFRLFFBQVEsRUFBRztBQUM1QixlQUFTLEtBQUssSUFBSTtBQUNsQixhQUFPLEtBQUs7QUFBQSxJQUNiO0FBRUEsV0FBTztBQUFBLEVBQ1I7QUFFTyxXQUFTLHNCQUFzQjtBQUNyQyxRQUFJO0FBRUosUUFBSSxhQUFhLFNBQVUsUUFBUTtBQUNsQyxVQUFJLFVBQVUsSUFBUyxhQUFRO0FBRS9CLGNBQVEsU0FBUyxJQUFTLGNBQWMscUJBQXFCLFlBQU87QUFFcEUsY0FBUSxlQUFlLElBQVMsWUFBTztBQUV2QyxhQUFPLEtBQUssU0FBUyxPQUFPO0FBQzVCLGFBQU8sUUFBUSxNQUFNO0FBQUEsSUFDdEI7QUFFQSxhQUFTLGdCQUFnQjtBQUN4QixjQUFRLFdBQVcsV0FBWTtBQUM5QixhQUFLLElBQUksSUFBSTtBQUNiLGFBQUssTUFBTSxTQUFTLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDakMsYUFBSyxNQUFNLE1BQU07QUFDakIsYUFBSyxTQUFTLElBQVMsY0FBYyxtQkFBYztBQUVuRCxpQkFBUyxpQkFBaUIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhO0FBQ3pELGNBQUksT0FBTztBQUNYLG9CQUFVLFVBQVUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxPQUFPO0FBQzdDLG1CQUFPLEtBQUssT0FBTyxLQUFLLEdBQUcsV0FBVztBQUFBLFVBQ3ZDLENBQUM7QUFDRCxlQUFLLElBQUk7QUFBQSxZQUNSLElBQUksU0FBUztBQUFBLFlBQ2IsT0FBTyxTQUFTO0FBQUEsWUFDaEI7QUFBQSxVQUNELENBQUM7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNGO0FBRUEsUUFBSSxZQUFZLElBQUksVUFBVTtBQUU5QixXQUFPO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxTQUFTLENBQUM7QUFBQSxNQUNWLE1BQU0sV0FBWTtBQUNqQixlQUFPLEtBQUssVUFBVSxNQUFNO0FBQzNCLHdCQUFjO0FBQ2QsZUFBSyxPQUFPLFNBQVMsTUFBTTtBQUMxQixpQkFBSyxPQUFPO0FBQUEsVUFDYixDQUFDO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUSxXQUFZO0FBQ25CLGtCQUFVLE9BQU87QUFDakIsWUFBSSxVQUFVLE1BQU0sT0FBTyxLQUFLLEtBQUssRUFBRSxPQUFPLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBTTtBQUUzRSxhQUFLLFVBQVUsUUFBUSxJQUFJLENBQUMsU0FBUztBQUNwQyxjQUFJLE9BQU8sU0FBUyxlQUFlLEtBQUssR0FBRztBQUUzQyxpQkFBTztBQUFBLFlBQ04sT0FBTyxLQUFLO0FBQUEsWUFDWixJQUFJLEtBQUs7QUFBQSxVQUNWO0FBQUEsUUFDRCxDQUFDO0FBRUQsWUFBSSxLQUFLLFFBQVEsU0FBUyxHQUFHO0FBQzVCLG9CQUFVLE1BQU0sSUFBSSxPQUFPLEtBQUssT0FBTyxHQUFHLENBQUM7QUFBQSxRQUM1QztBQUFBLE1BQ0Q7QUFBQSxJQUNEO0FBQUEsRUFDRDs7O0FFakZBLE1BQU1DLFNBQVEsSUFBSSxRQUFRLElBQUksS0FBSyxTQUFTLE9BQU8sSUFBSSxXQUFZO0FBQUEsRUFBQztBQUVwRSxNQUFNLFlBQVksTUFBTSxTQUFTLGlCQUFpQix1Q0FBdUM7QUFFekYsTUFBTSxjQUFjLFNBQVUsTUFBTSxJQUFJO0FBQ3ZDLFFBQUksU0FBUyxTQUFTLGNBQWMsVUFBVTtBQUM5QyxRQUFJLGFBQWEsT0FBTztBQUN4QixRQUFJLFlBQVksT0FBTztBQUN2QixRQUFJLFdBQVcsS0FBSyxPQUFRLEdBQUcsWUFBWSxhQUFhLGFBQWMsR0FBRztBQUN6RSxTQUFLLGNBQWMsUUFBUSxHQUFHO0FBQzlCLFNBQUssY0FBYyxXQUFXO0FBQUEsRUFDL0I7QUFFTyxXQUFTLG1CQUFtQjtBQUNsQyxVQUFNLG1CQUFtQixTQUFVLEtBQUssWUFBWTtBQUNuRCxVQUFJLENBQUMsSUFBSSxLQUFLO0FBQ2IsZUFBTztBQUFBLE1BQ1I7QUFDQSxVQUFJLFNBQVM7QUFFYixVQUFJLElBQUksUUFBUSxDQUFDLFdBQVc7QUFDM0IsZUFBTyxPQUFPLFdBQVcsTUFBTTtBQUMvQixlQUFPLFNBQVMsT0FBTztBQUV2QixlQUFPLE9BQU8sT0FBTyxRQUFRLGlCQUFpQixRQUFRLFVBQVU7QUFFaEUsWUFBSSxPQUFPLE1BQU07QUFDaEIsbUJBQVM7QUFBQSxRQUNWO0FBQUEsTUFDRCxDQUFDO0FBRUQsVUFBSSxnQkFBZ0I7QUFDcEIsZUFBUyxVQUFVLFdBQVcsR0FBRztBQUNqQyxVQUFJLE9BQU87QUFDWCxVQUFJLFNBQVMsV0FBVyxHQUFHO0FBRTNCLGFBQU87QUFBQSxJQUNSO0FBRUEsV0FBTztBQUFBLE1BQ04sZUFBZTtBQUFBLFFBQ2QsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLE1BQ1g7QUFBQSxNQUNBLGFBQWE7QUFBQSxNQUNiLE1BQU0sQ0FBQztBQUFBLE1BQ1AsTUFBTSxTQUFVLE1BQU07QUFDckIsYUFBSyxPQUFPO0FBQUEsTUFDYjtBQUFBLE1BRUEsYUFBYSxXQUFZO0FBQ3hCLGVBQU87QUFBQSxVQUNOLHFDQUFxQztBQUFBLFVBQ3JDLHFDQUFxQztBQUFBLFVBQ3JDLHlDQUF5QztBQUFBLFFBQzFDO0FBQUEsTUFDRDtBQUFBLE1BRUEsVUFBVSxTQUFVLEtBQUs7QUFDeEIsZUFBTztBQUFBLFVBQ04sQ0FBQyxjQUFjLElBQUk7QUFDbEIsbUJBQU8sUUFBUSxJQUFJLEtBQUssR0FBRyxJQUFJLFNBQVMsWUFBWSxFQUFFLEdBQUcsSUFBSSxnQkFBZ0IsbUJBQW1CLEVBQUU7QUFBQSxVQUNuRztBQUFBLFFBQ0Q7QUFBQSxNQUNEO0FBQUEsTUFFQSxPQUFPLFNBQVUsS0FBSztBQUNyQixhQUFLLEtBQUssUUFBUSxDQUFDLFNBQVM7QUFDM0IsMkJBQWlCLE1BQU0sQ0FBQyxTQUFTO0FBQ2hDLG1CQUFPLFFBQVE7QUFBQSxVQUNoQixDQUFDO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDRjtBQUFBLE1BRUEsVUFBVSxXQUFZO0FBQ3JCLFFBQUFBLE9BQU0sVUFBVTtBQUNoQixZQUFJLFlBQVksT0FBTztBQUV2QixrQkFBVSxFQUFFLFFBQVEsQ0FBQyxPQUFPO0FBQzNCLGNBQUksU0FBUyxHQUFHO0FBRWhCLGNBQUksU0FBUyxZQUFZLElBQUk7QUFDNUIsWUFBQUEsT0FBTSxXQUFXLEdBQUcsRUFBRTtBQUV0QixpQkFBSyxLQUFLLFFBQVEsQ0FBQyxRQUFRO0FBQzFCLCtCQUFpQixLQUFLLENBQUNDLFNBQVE7QUFDOUIsdUJBQU9BLEtBQUksT0FBTyxHQUFHO0FBQUEsY0FDdEIsQ0FBQztBQUFBLFlBQ0YsQ0FBQztBQUVELHdCQUFZLE1BQU0sRUFBRTtBQUFBLFVBQ3JCO0FBRUEsY0FBSSxPQUFPLGNBQWMsYUFBYSxTQUFTLEtBQUssY0FBYztBQUNqRSxpQkFBSyxjQUFjLFdBQVc7QUFBQSxVQUMvQjtBQUFBLFFBQ0QsQ0FBQztBQUFBLE1BQ0Y7QUFBQSxJQUNEO0FBQUEsRUFDRDs7O0FDcEdBLE1BQUksZUFBZTtBQUNuQixNQUFJLFdBQVc7QUFDZixNQUFJLFFBQVEsQ0FBQztBQUNiLFdBQVMsVUFBVSxVQUFVO0FBQzNCLGFBQVMsUUFBUTtBQUFBLEVBQ25CO0FBQ0EsV0FBUyxTQUFTLEtBQUs7QUFDckIsUUFBSSxDQUFDLE1BQU0sU0FBUyxHQUFHO0FBQ3JCLFlBQU0sS0FBSyxHQUFHO0FBQ2hCLGVBQVc7QUFBQSxFQUNiO0FBQ0EsV0FBUyxXQUFXLEtBQUs7QUFDdkIsUUFBSSxRQUFRLE1BQU0sUUFBUSxHQUFHO0FBQzdCLFFBQUksVUFBVTtBQUNaLFlBQU0sT0FBTyxPQUFPLENBQUM7QUFBQSxFQUN6QjtBQUNBLFdBQVMsYUFBYTtBQUNwQixRQUFJLENBQUMsWUFBWSxDQUFDLGNBQWM7QUFDOUIscUJBQWU7QUFDZixxQkFBZSxTQUFTO0FBQUEsSUFDMUI7QUFBQSxFQUNGO0FBQ0EsV0FBUyxZQUFZO0FBQ25CLG1CQUFlO0FBQ2YsZUFBVztBQUNYLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsWUFBTSxDQUFDLEVBQUU7QUFBQSxJQUNYO0FBQ0EsVUFBTSxTQUFTO0FBQ2YsZUFBVztBQUFBLEVBQ2I7QUFHQSxNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxpQkFBaUI7QUFDckIsV0FBUyx3QkFBd0IsVUFBVTtBQUN6QyxxQkFBaUI7QUFDakIsYUFBUztBQUNULHFCQUFpQjtBQUFBLEVBQ25CO0FBQ0EsV0FBUyxvQkFBb0IsUUFBUTtBQUNuQyxlQUFXLE9BQU87QUFDbEIsY0FBVSxPQUFPO0FBQ2pCLGFBQVMsQ0FBQyxhQUFhLE9BQU8sT0FBTyxVQUFVLEVBQUMsV0FBVyxDQUFDLFNBQVM7QUFDbkUsVUFBSSxnQkFBZ0I7QUFDbEIsa0JBQVUsSUFBSTtBQUFBLE1BQ2hCLE9BQU87QUFDTCxhQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0YsRUFBQyxDQUFDO0FBQ0YsVUFBTSxPQUFPO0FBQUEsRUFDZjtBQUNBLFdBQVMsZUFBZSxVQUFVO0FBQ2hDLGFBQVM7QUFBQSxFQUNYO0FBQ0EsV0FBUyxtQkFBbUIsSUFBSTtBQUM5QixRQUFJLFdBQVcsTUFBTTtBQUFBLElBQ3JCO0FBQ0EsUUFBSSxnQkFBZ0IsQ0FBQyxhQUFhO0FBQ2hDLFVBQUksa0JBQWtCLE9BQU8sUUFBUTtBQUNyQyxVQUFJLENBQUMsR0FBRyxZQUFZO0FBQ2xCLFdBQUcsYUFBYSxvQkFBSSxJQUFJO0FBQ3hCLFdBQUcsZ0JBQWdCLE1BQU07QUFDdkIsYUFBRyxXQUFXLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUFBLFFBQ2xDO0FBQUEsTUFDRjtBQUNBLFNBQUcsV0FBVyxJQUFJLGVBQWU7QUFDakMsaUJBQVcsTUFBTTtBQUNmLFlBQUksb0JBQW9CO0FBQ3RCO0FBQ0YsV0FBRyxXQUFXLE9BQU8sZUFBZTtBQUNwQyxnQkFBUSxlQUFlO0FBQUEsTUFDekI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU8sQ0FBQyxlQUFlLE1BQU07QUFDM0IsZUFBUztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFHQSxNQUFJLG9CQUFvQixDQUFDO0FBQ3pCLE1BQUksZUFBZSxDQUFDO0FBQ3BCLE1BQUksYUFBYSxDQUFDO0FBQ2xCLFdBQVMsVUFBVSxVQUFVO0FBQzNCLGVBQVcsS0FBSyxRQUFRO0FBQUEsRUFDMUI7QUFDQSxXQUFTLFlBQVksSUFBSSxVQUFVO0FBQ2pDLFFBQUksT0FBTyxhQUFhLFlBQVk7QUFDbEMsVUFBSSxDQUFDLEdBQUc7QUFDTixXQUFHLGNBQWMsQ0FBQztBQUNwQixTQUFHLFlBQVksS0FBSyxRQUFRO0FBQUEsSUFDOUIsT0FBTztBQUNMLGlCQUFXO0FBQ1gsbUJBQWEsS0FBSyxRQUFRO0FBQUEsSUFDNUI7QUFBQSxFQUNGO0FBQ0EsV0FBUyxrQkFBa0IsVUFBVTtBQUNuQyxzQkFBa0IsS0FBSyxRQUFRO0FBQUEsRUFDakM7QUFDQSxXQUFTLG1CQUFtQixJQUFJLE1BQU0sVUFBVTtBQUM5QyxRQUFJLENBQUMsR0FBRztBQUNOLFNBQUcsdUJBQXVCLENBQUM7QUFDN0IsUUFBSSxDQUFDLEdBQUcscUJBQXFCLElBQUk7QUFDL0IsU0FBRyxxQkFBcUIsSUFBSSxJQUFJLENBQUM7QUFDbkMsT0FBRyxxQkFBcUIsSUFBSSxFQUFFLEtBQUssUUFBUTtBQUFBLEVBQzdDO0FBQ0EsV0FBUyxrQkFBa0IsSUFBSSxPQUFPO0FBQ3BDLFFBQUksQ0FBQyxHQUFHO0FBQ047QUFDRixXQUFPLFFBQVEsR0FBRyxvQkFBb0IsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTTtBQUNqRSxVQUFJLFVBQVUsVUFBVSxNQUFNLFNBQVMsSUFBSSxHQUFHO0FBQzVDLGNBQU0sUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3hCLGVBQU8sR0FBRyxxQkFBcUIsSUFBSTtBQUFBLE1BQ3JDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNBLE1BQUksV0FBVyxJQUFJLGlCQUFpQixRQUFRO0FBQzVDLE1BQUkscUJBQXFCO0FBQ3pCLFdBQVMsMEJBQTBCO0FBQ2pDLGFBQVMsUUFBUSxVQUFVLEVBQUMsU0FBUyxNQUFNLFdBQVcsTUFBTSxZQUFZLE1BQU0sbUJBQW1CLEtBQUksQ0FBQztBQUN0Ryx5QkFBcUI7QUFBQSxFQUN2QjtBQUNBLFdBQVMseUJBQXlCO0FBQ2hDLGtCQUFjO0FBQ2QsYUFBUyxXQUFXO0FBQ3BCLHlCQUFxQjtBQUFBLEVBQ3ZCO0FBQ0EsTUFBSSxjQUFjLENBQUM7QUFDbkIsTUFBSSx5QkFBeUI7QUFDN0IsV0FBUyxnQkFBZ0I7QUFDdkIsa0JBQWMsWUFBWSxPQUFPLFNBQVMsWUFBWSxDQUFDO0FBQ3ZELFFBQUksWUFBWSxVQUFVLENBQUMsd0JBQXdCO0FBQ2pELCtCQUF5QjtBQUN6QixxQkFBZSxNQUFNO0FBQ25CLDJCQUFtQjtBQUNuQixpQ0FBeUI7QUFBQSxNQUMzQixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDQSxXQUFTLHFCQUFxQjtBQUM1QixhQUFTLFdBQVc7QUFDcEIsZ0JBQVksU0FBUztBQUFBLEVBQ3ZCO0FBQ0EsV0FBUyxVQUFVLFVBQVU7QUFDM0IsUUFBSSxDQUFDO0FBQ0gsYUFBTyxTQUFTO0FBQ2xCLDJCQUF1QjtBQUN2QixRQUFJLFNBQVMsU0FBUztBQUN0Qiw0QkFBd0I7QUFDeEIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLGVBQWU7QUFDbkIsTUFBSSxvQkFBb0IsQ0FBQztBQUN6QixXQUFTLGlCQUFpQjtBQUN4QixtQkFBZTtBQUFBLEVBQ2pCO0FBQ0EsV0FBUyxpQ0FBaUM7QUFDeEMsbUJBQWU7QUFDZixhQUFTLGlCQUFpQjtBQUMxQix3QkFBb0IsQ0FBQztBQUFBLEVBQ3ZCO0FBQ0EsV0FBUyxTQUFTLFdBQVc7QUFDM0IsUUFBSSxjQUFjO0FBQ2hCLDBCQUFvQixrQkFBa0IsT0FBTyxTQUFTO0FBQ3REO0FBQUEsSUFDRjtBQUNBLFFBQUksYUFBYSxDQUFDO0FBQ2xCLFFBQUksZUFBZSxDQUFDO0FBQ3BCLFFBQUksa0JBQWtCLG9CQUFJLElBQUk7QUFDOUIsUUFBSSxvQkFBb0Isb0JBQUksSUFBSTtBQUNoQyxhQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO0FBQ3pDLFVBQUksVUFBVSxDQUFDLEVBQUUsT0FBTztBQUN0QjtBQUNGLFVBQUksVUFBVSxDQUFDLEVBQUUsU0FBUyxhQUFhO0FBQ3JDLGtCQUFVLENBQUMsRUFBRSxXQUFXLFFBQVEsQ0FBQyxTQUFTLEtBQUssYUFBYSxLQUFLLFdBQVcsS0FBSyxJQUFJLENBQUM7QUFDdEYsa0JBQVUsQ0FBQyxFQUFFLGFBQWEsUUFBUSxDQUFDLFNBQVMsS0FBSyxhQUFhLEtBQUssYUFBYSxLQUFLLElBQUksQ0FBQztBQUFBLE1BQzVGO0FBQ0EsVUFBSSxVQUFVLENBQUMsRUFBRSxTQUFTLGNBQWM7QUFDdEMsWUFBSSxLQUFLLFVBQVUsQ0FBQyxFQUFFO0FBQ3RCLFlBQUksT0FBTyxVQUFVLENBQUMsRUFBRTtBQUN4QixZQUFJLFdBQVcsVUFBVSxDQUFDLEVBQUU7QUFDNUIsWUFBSSxPQUFPLE1BQU07QUFDZixjQUFJLENBQUMsZ0JBQWdCLElBQUksRUFBRTtBQUN6Qiw0QkFBZ0IsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUM1QiwwQkFBZ0IsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFDLE1BQU0sT0FBTyxHQUFHLGFBQWEsSUFBSSxFQUFDLENBQUM7QUFBQSxRQUNuRTtBQUNBLFlBQUksU0FBUyxNQUFNO0FBQ2pCLGNBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFO0FBQzNCLDhCQUFrQixJQUFJLElBQUksQ0FBQyxDQUFDO0FBQzlCLDRCQUFrQixJQUFJLEVBQUUsRUFBRSxLQUFLLElBQUk7QUFBQSxRQUNyQztBQUNBLFlBQUksR0FBRyxhQUFhLElBQUksS0FBSyxhQUFhLE1BQU07QUFDOUMsZUFBSztBQUFBLFFBQ1AsV0FBVyxHQUFHLGFBQWEsSUFBSSxHQUFHO0FBQ2hDLGlCQUFPO0FBQ1AsZUFBSztBQUFBLFFBQ1AsT0FBTztBQUNMLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0Esc0JBQWtCLFFBQVEsQ0FBQyxPQUFPLE9BQU87QUFDdkMsd0JBQWtCLElBQUksS0FBSztBQUFBLElBQzdCLENBQUM7QUFDRCxvQkFBZ0IsUUFBUSxDQUFDLE9BQU8sT0FBTztBQUNyQyx3QkFBa0IsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQztBQUFBLElBQy9DLENBQUM7QUFDRCxhQUFTLFFBQVEsY0FBYztBQUM3QixVQUFJLFdBQVcsU0FBUyxJQUFJO0FBQzFCO0FBQ0YsbUJBQWEsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFDbkMsVUFBSSxLQUFLLGFBQWE7QUFDcEIsZUFBTyxLQUFLLFlBQVk7QUFDdEIsZUFBSyxZQUFZLElBQUksRUFBRTtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUNBLGVBQVcsUUFBUSxDQUFDLFNBQVM7QUFDM0IsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSyxZQUFZO0FBQUEsSUFDbkIsQ0FBQztBQUNELGFBQVMsUUFBUSxZQUFZO0FBQzNCLFVBQUksYUFBYSxTQUFTLElBQUk7QUFDNUI7QUFDRixVQUFJLENBQUMsS0FBSztBQUNSO0FBQ0YsYUFBTyxLQUFLO0FBQ1osYUFBTyxLQUFLO0FBQ1osaUJBQVcsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7QUFDakMsV0FBSyxZQUFZO0FBQ2pCLFdBQUssZ0JBQWdCO0FBQUEsSUFDdkI7QUFDQSxlQUFXLFFBQVEsQ0FBQyxTQUFTO0FBQzNCLGFBQU8sS0FBSztBQUNaLGFBQU8sS0FBSztBQUFBLElBQ2QsQ0FBQztBQUNELGlCQUFhO0FBQ2IsbUJBQWU7QUFDZixzQkFBa0I7QUFDbEIsd0JBQW9CO0FBQUEsRUFDdEI7QUFHQSxXQUFTLE1BQU0sTUFBTTtBQUNuQixXQUFPLGFBQWEsaUJBQWlCLElBQUksQ0FBQztBQUFBLEVBQzVDO0FBQ0EsV0FBUyxlQUFlLE1BQU0sT0FBTyxlQUFlO0FBQ2xELFNBQUssZUFBZSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsaUJBQWlCLElBQUksQ0FBQztBQUN0RSxXQUFPLE1BQU07QUFDWCxXQUFLLGVBQWUsS0FBSyxhQUFhLE9BQU8sQ0FBQyxNQUFNLE1BQU0sS0FBSztBQUFBLElBQ2pFO0FBQUEsRUFDRjtBQUNBLFdBQVMsYUFBYSxTQUFTLFFBQVE7QUFDckMsUUFBSSxnQkFBZ0IsUUFBUSxhQUFhLENBQUM7QUFDMUMsV0FBTyxRQUFRLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTTtBQUMvQyxvQkFBYyxHQUFHLElBQUk7QUFBQSxJQUN2QixDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsaUJBQWlCLE1BQU07QUFDOUIsUUFBSSxLQUFLO0FBQ1AsYUFBTyxLQUFLO0FBQ2QsUUFBSSxPQUFPLGVBQWUsY0FBYyxnQkFBZ0IsWUFBWTtBQUNsRSxhQUFPLGlCQUFpQixLQUFLLElBQUk7QUFBQSxJQUNuQztBQUNBLFFBQUksQ0FBQyxLQUFLLFlBQVk7QUFDcEIsYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUNBLFdBQU8saUJBQWlCLEtBQUssVUFBVTtBQUFBLEVBQ3pDO0FBQ0EsV0FBUyxhQUFhLFNBQVM7QUFDN0IsUUFBSSxZQUFZLElBQUksTUFBTSxDQUFDLEdBQUc7QUFBQSxNQUM1QixTQUFTLE1BQU07QUFDYixlQUFPLE1BQU0sS0FBSyxJQUFJLElBQUksUUFBUSxRQUFRLENBQUMsTUFBTSxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFBLE1BQ25FO0FBQUEsTUFDQSxLQUFLLENBQUMsUUFBUSxTQUFTO0FBQ3JCLGVBQU8sUUFBUSxLQUFLLENBQUMsUUFBUSxJQUFJLGVBQWUsSUFBSSxDQUFDO0FBQUEsTUFDdkQ7QUFBQSxNQUNBLEtBQUssQ0FBQyxRQUFRLFNBQVM7QUFDckIsZ0JBQVEsUUFBUSxLQUFLLENBQUMsUUFBUTtBQUM1QixjQUFJLElBQUksZUFBZSxJQUFJLEdBQUc7QUFDNUIsZ0JBQUksYUFBYSxPQUFPLHlCQUF5QixLQUFLLElBQUk7QUFDMUQsZ0JBQUksV0FBVyxPQUFPLFdBQVcsSUFBSSxtQkFBbUIsV0FBVyxPQUFPLFdBQVcsSUFBSSxpQkFBaUI7QUFDeEcscUJBQU87QUFBQSxZQUNUO0FBQ0EsaUJBQUssV0FBVyxPQUFPLFdBQVcsUUFBUSxXQUFXLFlBQVk7QUFDL0Qsa0JBQUksU0FBUyxXQUFXO0FBQ3hCLGtCQUFJLFNBQVMsV0FBVztBQUN4QixrQkFBSSxXQUFXO0FBQ2YsdUJBQVMsVUFBVSxPQUFPLEtBQUssU0FBUztBQUN4Qyx1QkFBUyxVQUFVLE9BQU8sS0FBSyxTQUFTO0FBQ3hDLGtCQUFJO0FBQ0YsdUJBQU8sa0JBQWtCO0FBQzNCLGtCQUFJO0FBQ0YsdUJBQU8sa0JBQWtCO0FBQzNCLHFCQUFPLGVBQWUsS0FBSyxNQUFNO0FBQUEsZ0JBQy9CLEdBQUc7QUFBQSxnQkFDSCxLQUFLO0FBQUEsZ0JBQ0wsS0FBSztBQUFBLGNBQ1AsQ0FBQztBQUFBLFlBQ0g7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTztBQUFBLFFBQ1QsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJO0FBQUEsTUFDaEI7QUFBQSxNQUNBLEtBQUssQ0FBQyxRQUFRLE1BQU0sVUFBVTtBQUM1QixZQUFJLHVCQUF1QixRQUFRLEtBQUssQ0FBQyxRQUFRLElBQUksZUFBZSxJQUFJLENBQUM7QUFDekUsWUFBSSxzQkFBc0I7QUFDeEIsK0JBQXFCLElBQUksSUFBSTtBQUFBLFFBQy9CLE9BQU87QUFDTCxrQkFBUSxRQUFRLFNBQVMsQ0FBQyxFQUFFLElBQUksSUFBSTtBQUFBLFFBQ3RDO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGLENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVDtBQUdBLFdBQVMsaUJBQWlCLE9BQU87QUFDL0IsUUFBSSxZQUFZLENBQUMsUUFBUSxPQUFPLFFBQVEsWUFBWSxDQUFDLE1BQU0sUUFBUSxHQUFHLEtBQUssUUFBUTtBQUNuRixRQUFJLFVBQVUsQ0FBQyxLQUFLLFdBQVcsT0FBTztBQUNwQyxhQUFPLFFBQVEsT0FBTywwQkFBMEIsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsS0FBSyxFQUFDLE9BQU8sV0FBVSxDQUFDLE1BQU07QUFDNUYsWUFBSSxlQUFlLFNBQVMsVUFBVTtBQUNwQztBQUNGLFlBQUksT0FBTyxhQUFhLEtBQUssTUFBTSxHQUFHLFFBQVEsSUFBSSxHQUFHO0FBQ3JELFlBQUksT0FBTyxVQUFVLFlBQVksVUFBVSxRQUFRLE1BQU0sZ0JBQWdCO0FBQ3ZFLGNBQUksR0FBRyxJQUFJLE1BQU0sV0FBVyxPQUFPLE1BQU0sR0FBRztBQUFBLFFBQzlDLE9BQU87QUFDTCxjQUFJLFVBQVUsS0FBSyxLQUFLLFVBQVUsT0FBTyxFQUFFLGlCQUFpQixVQUFVO0FBQ3BFLG9CQUFRLE9BQU8sSUFBSTtBQUFBLFVBQ3JCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFDQSxXQUFPLFFBQVEsS0FBSztBQUFBLEVBQ3RCO0FBQ0EsV0FBUyxZQUFZLFVBQVUsWUFBWSxNQUFNO0FBQUEsRUFDakQsR0FBRztBQUNELFFBQUksTUFBTTtBQUFBLE1BQ1IsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsV0FBVyxPQUFPLE1BQU0sS0FBSztBQUMzQixlQUFPLFNBQVMsS0FBSyxjQUFjLE1BQU0sSUFBSSxPQUFPLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxPQUFPLE1BQU0sS0FBSyxHQUFHLE1BQU0sR0FBRztBQUFBLE1BQzFHO0FBQUEsSUFDRjtBQUNBLGNBQVUsR0FBRztBQUNiLFdBQU8sQ0FBQyxpQkFBaUI7QUFDdkIsVUFBSSxPQUFPLGlCQUFpQixZQUFZLGlCQUFpQixRQUFRLGFBQWEsZ0JBQWdCO0FBQzVGLFlBQUksYUFBYSxJQUFJLFdBQVcsS0FBSyxHQUFHO0FBQ3hDLFlBQUksYUFBYSxDQUFDLE9BQU8sTUFBTSxRQUFRO0FBQ3JDLGNBQUksYUFBYSxhQUFhLFdBQVcsT0FBTyxNQUFNLEdBQUc7QUFDekQsY0FBSSxlQUFlO0FBQ25CLGlCQUFPLFdBQVcsT0FBTyxNQUFNLEdBQUc7QUFBQSxRQUNwQztBQUFBLE1BQ0YsT0FBTztBQUNMLFlBQUksZUFBZTtBQUFBLE1BQ3JCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0EsV0FBUyxJQUFJLEtBQUssTUFBTTtBQUN0QixXQUFPLEtBQUssTUFBTSxHQUFHLEVBQUUsT0FBTyxDQUFDLE9BQU8sWUFBWSxNQUFNLE9BQU8sR0FBRyxHQUFHO0FBQUEsRUFDdkU7QUFDQSxXQUFTLElBQUksS0FBSyxNQUFNLE9BQU87QUFDN0IsUUFBSSxPQUFPLFNBQVM7QUFDbEIsYUFBTyxLQUFLLE1BQU0sR0FBRztBQUN2QixRQUFJLEtBQUssV0FBVztBQUNsQixVQUFJLEtBQUssQ0FBQyxDQUFDLElBQUk7QUFBQSxhQUNSLEtBQUssV0FBVztBQUN2QixZQUFNO0FBQUEsU0FDSDtBQUNILFVBQUksSUFBSSxLQUFLLENBQUMsQ0FBQztBQUNiLGVBQU8sSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLEdBQUcsS0FBSyxNQUFNLENBQUMsR0FBRyxLQUFLO0FBQUEsV0FDMUM7QUFDSCxZQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztBQUNoQixlQUFPLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLEdBQUcsS0FBSztBQUFBLE1BQy9DO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFHQSxNQUFJLFNBQVMsQ0FBQztBQUNkLFdBQVMsTUFBTSxNQUFNLFVBQVU7QUFDN0IsV0FBTyxJQUFJLElBQUk7QUFBQSxFQUNqQjtBQUNBLFdBQVMsYUFBYSxLQUFLLElBQUk7QUFDN0IsV0FBTyxRQUFRLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLFFBQVEsTUFBTTtBQUNuRCxhQUFPLGVBQWUsS0FBSyxJQUFJLElBQUksSUFBSTtBQUFBLFFBQ3JDLE1BQU07QUFDSixjQUFJLENBQUMsV0FBVyxRQUFRLElBQUkseUJBQXlCLEVBQUU7QUFDdkQsc0JBQVksRUFBQyxhQUFhLEdBQUcsVUFBUztBQUN0QyxzQkFBWSxJQUFJLFFBQVE7QUFDeEIsaUJBQU8sU0FBUyxJQUFJLFNBQVM7QUFBQSxRQUMvQjtBQUFBLFFBQ0EsWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUNELFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQSxTQUFTLE1BQU07QUFDYixhQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBR0EsV0FBUyxTQUFTLElBQUksWUFBWSxhQUFhLE1BQU07QUFDbkQsUUFBSTtBQUNGLGFBQU8sU0FBUyxHQUFHLElBQUk7QUFBQSxJQUN6QixTQUFTLEdBQUc7QUFDVixrQkFBWSxHQUFHLElBQUksVUFBVTtBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUNBLFdBQVMsWUFBWSxRQUFRLElBQUksYUFBYSxRQUFRO0FBQ3BELFdBQU8sT0FBTyxRQUFRLEVBQUMsSUFBSSxXQUFVLENBQUM7QUFDdEMsWUFBUSxLQUFLLDRCQUE0QixPQUFPLE9BQU87QUFBQTtBQUFBLEVBRXZELGFBQWEsa0JBQWtCLGFBQWEsVUFBVSxFQUFFLElBQUksRUFBRTtBQUM5RCxlQUFXLE1BQU07QUFDZixZQUFNO0FBQUEsSUFDUixHQUFHLENBQUM7QUFBQSxFQUNOO0FBR0EsTUFBSSw4QkFBOEI7QUFDbEMsV0FBUywwQkFBMEIsVUFBVTtBQUMzQyxRQUFJLFFBQVE7QUFDWixrQ0FBOEI7QUFDOUIsYUFBUztBQUNULGtDQUE4QjtBQUFBLEVBQ2hDO0FBQ0EsV0FBUyxTQUFTLElBQUksWUFBWSxTQUFTLENBQUMsR0FBRztBQUM3QyxRQUFJO0FBQ0osa0JBQWMsSUFBSSxVQUFVLEVBQUUsQ0FBQyxVQUFVLFNBQVMsT0FBTyxNQUFNO0FBQy9ELFdBQU87QUFBQSxFQUNUO0FBQ0EsV0FBUyxpQkFBaUIsTUFBTTtBQUM5QixXQUFPLHFCQUFxQixHQUFHLElBQUk7QUFBQSxFQUNyQztBQUNBLE1BQUksdUJBQXVCO0FBQzNCLFdBQVMsYUFBYSxjQUFjO0FBQ2xDLDJCQUF1QjtBQUFBLEVBQ3pCO0FBQ0EsV0FBUyxnQkFBZ0IsSUFBSSxZQUFZO0FBQ3ZDLFFBQUksbUJBQW1CLENBQUM7QUFDeEIsUUFBSSxXQUFXLGFBQWEsa0JBQWtCLEVBQUUsRUFBRTtBQUNsRCx1QkFBbUIsSUFBSSxhQUFhLFFBQVE7QUFDNUMsUUFBSSxZQUFZLENBQUMsa0JBQWtCLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztBQUMxRCxRQUFJLE9BQU8sZUFBZSxZQUFZO0FBQ3BDLGFBQU8sOEJBQThCLFdBQVcsVUFBVTtBQUFBLElBQzVEO0FBQ0EsUUFBSSxZQUFZLDRCQUE0QixXQUFXLFlBQVksRUFBRTtBQUNyRSxXQUFPLFNBQVMsS0FBSyxNQUFNLElBQUksWUFBWSxTQUFTO0FBQUEsRUFDdEQ7QUFDQSxXQUFTLDhCQUE4QixXQUFXLE1BQU07QUFDdEQsV0FBTyxDQUFDLFdBQVcsTUFBTTtBQUFBLElBQ3pCLEdBQUcsRUFBQyxPQUFPLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNO0FBQzVDLFVBQUksU0FBUyxLQUFLLE1BQU0sYUFBYSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxNQUFNO0FBQ3BFLDBCQUFvQixVQUFVLE1BQU07QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDQSxNQUFJLGdCQUFnQixDQUFDO0FBQ3JCLFdBQVMsMkJBQTJCLFlBQVksSUFBSTtBQUNsRCxRQUFJLGNBQWMsVUFBVSxHQUFHO0FBQzdCLGFBQU8sY0FBYyxVQUFVO0FBQUEsSUFDakM7QUFDQSxRQUFJLGdCQUFnQixPQUFPLGVBQWUsaUJBQWlCO0FBQUEsSUFDM0QsQ0FBQyxFQUFFO0FBQ0gsUUFBSSwwQkFBMEIscUJBQXFCLEtBQUssVUFBVSxLQUFLLGlCQUFpQixLQUFLLFVBQVUsSUFBSSxZQUFZLFVBQVUsVUFBVTtBQUMzSSxVQUFNLG9CQUFvQixNQUFNO0FBQzlCLFVBQUk7QUFDRixlQUFPLElBQUksY0FBYyxDQUFDLFVBQVUsT0FBTyxHQUFHLGtDQUFrQyx1QkFBdUIsbURBQW1EO0FBQUEsTUFDNUosU0FBUyxRQUFRO0FBQ2Ysb0JBQVksUUFBUSxJQUFJLFVBQVU7QUFDbEMsZUFBTyxRQUFRLFFBQVE7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFDQSxRQUFJLE9BQU8sa0JBQWtCO0FBQzdCLGtCQUFjLFVBQVUsSUFBSTtBQUM1QixXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsNEJBQTRCLFdBQVcsWUFBWSxJQUFJO0FBQzlELFFBQUksT0FBTywyQkFBMkIsWUFBWSxFQUFFO0FBQ3BELFdBQU8sQ0FBQyxXQUFXLE1BQU07QUFBQSxJQUN6QixHQUFHLEVBQUMsT0FBTyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTTtBQUM1QyxXQUFLLFNBQVM7QUFDZCxXQUFLLFdBQVc7QUFDaEIsVUFBSSxnQkFBZ0IsYUFBYSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDdkQsVUFBSSxPQUFPLFNBQVMsWUFBWTtBQUM5QixZQUFJLFVBQVUsS0FBSyxNQUFNLGFBQWEsRUFBRSxNQUFNLENBQUMsV0FBVyxZQUFZLFFBQVEsSUFBSSxVQUFVLENBQUM7QUFDN0YsWUFBSSxLQUFLLFVBQVU7QUFDakIsOEJBQW9CLFVBQVUsS0FBSyxRQUFRLGVBQWUsUUFBUSxFQUFFO0FBQ3BFLGVBQUssU0FBUztBQUFBLFFBQ2hCLE9BQU87QUFDTCxrQkFBUSxLQUFLLENBQUMsV0FBVztBQUN2QixnQ0FBb0IsVUFBVSxRQUFRLGVBQWUsUUFBUSxFQUFFO0FBQUEsVUFDakUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLFlBQVksUUFBUSxJQUFJLFVBQVUsQ0FBQyxFQUFFLFFBQVEsTUFBTSxLQUFLLFNBQVMsTUFBTTtBQUFBLFFBQzlGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsV0FBUyxvQkFBb0IsVUFBVSxPQUFPLFFBQVEsUUFBUSxJQUFJO0FBQ2hFLFFBQUksK0JBQStCLE9BQU8sVUFBVSxZQUFZO0FBQzlELFVBQUksU0FBUyxNQUFNLE1BQU0sUUFBUSxNQUFNO0FBQ3ZDLFVBQUksa0JBQWtCLFNBQVM7QUFDN0IsZUFBTyxLQUFLLENBQUMsTUFBTSxvQkFBb0IsVUFBVSxHQUFHLFFBQVEsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFRLElBQUksS0FBSyxDQUFDO0FBQUEsTUFDdkgsT0FBTztBQUNMLGlCQUFTLE1BQU07QUFBQSxNQUNqQjtBQUFBLElBQ0YsT0FBTztBQUNMLGVBQVMsS0FBSztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUdBLE1BQUksaUJBQWlCO0FBQ3JCLFdBQVMsT0FBTyxVQUFVLElBQUk7QUFDNUIsV0FBTyxpQkFBaUI7QUFBQSxFQUMxQjtBQUNBLFdBQVMsVUFBVSxXQUFXO0FBQzVCLHFCQUFpQjtBQUFBLEVBQ25CO0FBQ0EsTUFBSSxvQkFBb0IsQ0FBQztBQUN6QixXQUFTLFVBQVUsTUFBTSxVQUFVO0FBQ2pDLHNCQUFrQixJQUFJLElBQUk7QUFBQSxFQUM1QjtBQUNBLFdBQVMsV0FBVyxJQUFJLFlBQVksMkJBQTJCO0FBQzdELGlCQUFhLE1BQU0sS0FBSyxVQUFVO0FBQ2xDLFFBQUksR0FBRyxzQkFBc0I7QUFDM0IsVUFBSSxjQUFjLE9BQU8sUUFBUSxHQUFHLG9CQUFvQixFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUMsTUFBTSxNQUFLLEVBQUU7QUFDaEcsVUFBSSxtQkFBbUIsZUFBZSxXQUFXO0FBQ2pELG9CQUFjLFlBQVksSUFBSSxDQUFDLGNBQWM7QUFDM0MsWUFBSSxpQkFBaUIsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLFVBQVUsSUFBSSxHQUFHO0FBQ2pFLGlCQUFPO0FBQUEsWUFDTCxNQUFNLFVBQVUsVUFBVSxJQUFJO0FBQUEsWUFDOUIsT0FBTyxJQUFJLFVBQVUsS0FBSztBQUFBLFVBQzVCO0FBQUEsUUFDRjtBQUNBLGVBQU87QUFBQSxNQUNULENBQUM7QUFDRCxtQkFBYSxXQUFXLE9BQU8sV0FBVztBQUFBLElBQzVDO0FBQ0EsUUFBSSwwQkFBMEIsQ0FBQztBQUMvQixRQUFJLGNBQWMsV0FBVyxJQUFJLHdCQUF3QixDQUFDLFNBQVMsWUFBWSx3QkFBd0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxFQUFFLE9BQU8sc0JBQXNCLEVBQUUsSUFBSSxtQkFBbUIseUJBQXlCLHlCQUF5QixDQUFDLEVBQUUsS0FBSyxVQUFVO0FBQ3RQLFdBQU8sWUFBWSxJQUFJLENBQUMsZUFBZTtBQUNyQyxhQUFPLG9CQUFvQixJQUFJLFVBQVU7QUFBQSxJQUMzQyxDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsZUFBZSxZQUFZO0FBQ2xDLFdBQU8sTUFBTSxLQUFLLFVBQVUsRUFBRSxJQUFJLHdCQUF3QixDQUFDLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyx1QkFBdUIsSUFBSSxDQUFDO0FBQUEsRUFDN0c7QUFDQSxNQUFJLHNCQUFzQjtBQUMxQixNQUFJLHlCQUF5QixvQkFBSSxJQUFJO0FBQ3JDLE1BQUkseUJBQXlCLE9BQU87QUFDcEMsV0FBUyx3QkFBd0IsVUFBVTtBQUN6QywwQkFBc0I7QUFDdEIsUUFBSSxNQUFNLE9BQU87QUFDakIsNkJBQXlCO0FBQ3pCLDJCQUF1QixJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQ2xDLFFBQUksZ0JBQWdCLE1BQU07QUFDeEIsYUFBTyx1QkFBdUIsSUFBSSxHQUFHLEVBQUU7QUFDckMsK0JBQXVCLElBQUksR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUMxQyw2QkFBdUIsT0FBTyxHQUFHO0FBQUEsSUFDbkM7QUFDQSxRQUFJLGdCQUFnQixNQUFNO0FBQ3hCLDRCQUFzQjtBQUN0QixvQkFBYztBQUFBLElBQ2hCO0FBQ0EsYUFBUyxhQUFhO0FBQ3RCLGtCQUFjO0FBQUEsRUFDaEI7QUFDQSxXQUFTLHlCQUF5QixJQUFJO0FBQ3BDLFFBQUksV0FBVyxDQUFDO0FBQ2hCLFFBQUksV0FBVyxDQUFDLGFBQWEsU0FBUyxLQUFLLFFBQVE7QUFDbkQsUUFBSSxDQUFDLFNBQVMsYUFBYSxJQUFJLG1CQUFtQixFQUFFO0FBQ3BELGFBQVMsS0FBSyxhQUFhO0FBQzNCLFFBQUksWUFBWTtBQUFBLE1BQ2QsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsZUFBZSxjQUFjLEtBQUssZUFBZSxFQUFFO0FBQUEsTUFDbkQsVUFBVSxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQUEsSUFDdEM7QUFDQSxRQUFJLFlBQVksTUFBTSxTQUFTLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNqRCxXQUFPLENBQUMsV0FBVyxTQUFTO0FBQUEsRUFDOUI7QUFDQSxXQUFTLG9CQUFvQixJQUFJLFlBQVk7QUFDM0MsUUFBSSxPQUFPLE1BQU07QUFBQSxJQUNqQjtBQUNBLFFBQUksV0FBVyxrQkFBa0IsV0FBVyxJQUFJLEtBQUs7QUFDckQsUUFBSSxDQUFDLFdBQVcsUUFBUSxJQUFJLHlCQUF5QixFQUFFO0FBQ3ZELHVCQUFtQixJQUFJLFdBQVcsVUFBVSxRQUFRO0FBQ3BELFFBQUksY0FBYyxNQUFNO0FBQ3RCLFVBQUksR0FBRyxhQUFhLEdBQUc7QUFDckI7QUFDRixlQUFTLFVBQVUsU0FBUyxPQUFPLElBQUksWUFBWSxTQUFTO0FBQzVELGlCQUFXLFNBQVMsS0FBSyxVQUFVLElBQUksWUFBWSxTQUFTO0FBQzVELDRCQUFzQix1QkFBdUIsSUFBSSxzQkFBc0IsRUFBRSxLQUFLLFFBQVEsSUFBSSxTQUFTO0FBQUEsSUFDckc7QUFDQSxnQkFBWSxjQUFjO0FBQzFCLFdBQU87QUFBQSxFQUNUO0FBQ0EsTUFBSSxlQUFlLENBQUMsU0FBUyxnQkFBZ0IsQ0FBQyxFQUFDLE1BQU0sTUFBSyxNQUFNO0FBQzlELFFBQUksS0FBSyxXQUFXLE9BQU87QUFDekIsYUFBTyxLQUFLLFFBQVEsU0FBUyxXQUFXO0FBQzFDLFdBQU8sRUFBQyxNQUFNLE1BQUs7QUFBQSxFQUNyQjtBQUNBLE1BQUksT0FBTyxDQUFDLE1BQU07QUFDbEIsV0FBUyx3QkFBd0IsV0FBVyxNQUFNO0FBQUEsRUFDbEQsR0FBRztBQUNELFdBQU8sQ0FBQyxFQUFDLE1BQU0sTUFBSyxNQUFNO0FBQ3hCLFVBQUksRUFBQyxNQUFNLFNBQVMsT0FBTyxTQUFRLElBQUksc0JBQXNCLE9BQU8sQ0FBQyxPQUFPLGNBQWM7QUFDeEYsZUFBTyxVQUFVLEtBQUs7QUFBQSxNQUN4QixHQUFHLEVBQUMsTUFBTSxNQUFLLENBQUM7QUFDaEIsVUFBSSxZQUFZO0FBQ2QsaUJBQVMsU0FBUyxJQUFJO0FBQ3hCLGFBQU8sRUFBQyxNQUFNLFNBQVMsT0FBTyxTQUFRO0FBQUEsSUFDeEM7QUFBQSxFQUNGO0FBQ0EsTUFBSSx3QkFBd0IsQ0FBQztBQUM3QixXQUFTLGNBQWMsVUFBVTtBQUMvQiwwQkFBc0IsS0FBSyxRQUFRO0FBQUEsRUFDckM7QUFDQSxXQUFTLHVCQUF1QixFQUFDLEtBQUksR0FBRztBQUN0QyxXQUFPLHFCQUFxQixFQUFFLEtBQUssSUFBSTtBQUFBLEVBQ3pDO0FBQ0EsTUFBSSx1QkFBdUIsTUFBTSxJQUFJLE9BQU8sSUFBSSxjQUFjLGNBQWM7QUFDNUUsV0FBUyxtQkFBbUIseUJBQXlCLDJCQUEyQjtBQUM5RSxXQUFPLENBQUMsRUFBQyxNQUFNLE1BQUssTUFBTTtBQUN4QixVQUFJLFlBQVksS0FBSyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELFVBQUksYUFBYSxLQUFLLE1BQU0sb0JBQW9CO0FBQ2hELFVBQUksWUFBWSxLQUFLLE1BQU0sdUJBQXVCLEtBQUssQ0FBQztBQUN4RCxVQUFJLFdBQVcsNkJBQTZCLHdCQUF3QixJQUFJLEtBQUs7QUFDN0UsYUFBTztBQUFBLFFBQ0wsTUFBTSxZQUFZLFVBQVUsQ0FBQyxJQUFJO0FBQUEsUUFDakMsT0FBTyxhQUFhLFdBQVcsQ0FBQyxJQUFJO0FBQUEsUUFDcEMsV0FBVyxVQUFVLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxLQUFLLEVBQUUsQ0FBQztBQUFBLFFBQ2xELFlBQVk7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsTUFBSSxVQUFVO0FBQ2QsTUFBSSxpQkFBaUI7QUFBQSxJQUNuQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNBLFdBQVMsV0FBVyxHQUFHLEdBQUc7QUFDeEIsUUFBSSxRQUFRLGVBQWUsUUFBUSxFQUFFLElBQUksTUFBTSxLQUFLLFVBQVUsRUFBRTtBQUNoRSxRQUFJLFFBQVEsZUFBZSxRQUFRLEVBQUUsSUFBSSxNQUFNLEtBQUssVUFBVSxFQUFFO0FBQ2hFLFdBQU8sZUFBZSxRQUFRLEtBQUssSUFBSSxlQUFlLFFBQVEsS0FBSztBQUFBLEVBQ3JFO0FBR0EsV0FBUyxTQUFTLElBQUksTUFBTSxTQUFTLENBQUMsR0FBRztBQUN2QyxPQUFHLGNBQWMsSUFBSSxZQUFZLE1BQU07QUFBQSxNQUNyQztBQUFBLE1BQ0EsU0FBUztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsWUFBWTtBQUFBLElBQ2QsQ0FBQyxDQUFDO0FBQUEsRUFDSjtBQUdBLE1BQUksWUFBWSxDQUFDO0FBQ2pCLE1BQUksWUFBWTtBQUNoQixXQUFTLFNBQVMsV0FBVyxNQUFNO0FBQUEsRUFDbkMsR0FBRztBQUNELG1CQUFlLE1BQU07QUFDbkIsbUJBQWEsV0FBVyxNQUFNO0FBQzVCLHlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNILENBQUM7QUFDRCxXQUFPLElBQUksUUFBUSxDQUFDLFFBQVE7QUFDMUIsZ0JBQVUsS0FBSyxNQUFNO0FBQ25CLGlCQUFTO0FBQ1QsWUFBSTtBQUFBLE1BQ04sQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFDQSxXQUFTLG1CQUFtQjtBQUMxQixnQkFBWTtBQUNaLFdBQU8sVUFBVTtBQUNmLGdCQUFVLE1BQU0sRUFBRTtBQUFBLEVBQ3RCO0FBQ0EsV0FBUyxnQkFBZ0I7QUFDdkIsZ0JBQVk7QUFBQSxFQUNkO0FBR0EsV0FBUyxLQUFLLElBQUksVUFBVTtBQUMxQixRQUFJLE9BQU8sZUFBZSxjQUFjLGNBQWMsWUFBWTtBQUNoRSxZQUFNLEtBQUssR0FBRyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsS0FBSyxLQUFLLFFBQVEsQ0FBQztBQUM1RDtBQUFBLElBQ0Y7QUFDQSxRQUFJLE9BQU87QUFDWCxhQUFTLElBQUksTUFBTSxPQUFPLElBQUk7QUFDOUIsUUFBSTtBQUNGO0FBQ0YsUUFBSSxPQUFPLEdBQUc7QUFDZCxXQUFPLE1BQU07QUFDWCxXQUFLLE1BQU0sVUFBVSxLQUFLO0FBQzFCLGFBQU8sS0FBSztBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBR0EsV0FBUyxLQUFLLFlBQVksTUFBTTtBQUM5QixZQUFRLEtBQUssbUJBQW1CLE9BQU8sSUFBSSxHQUFHLElBQUk7QUFBQSxFQUNwRDtBQUdBLFdBQVMsUUFBUTtBQUNmLFFBQUksQ0FBQyxTQUFTO0FBQ1osV0FBSyxxSUFBcUk7QUFDNUksYUFBUyxVQUFVLGFBQWE7QUFDaEMsYUFBUyxVQUFVLHFCQUFxQjtBQUN4Qyw0QkFBd0I7QUFDeEIsY0FBVSxDQUFDLE9BQU8sU0FBUyxJQUFJLElBQUksQ0FBQztBQUNwQyxnQkFBWSxDQUFDLE9BQU8sWUFBWSxFQUFFLENBQUM7QUFDbkMsc0JBQWtCLENBQUMsSUFBSSxVQUFVO0FBQy9CLGlCQUFXLElBQUksS0FBSyxFQUFFLFFBQVEsQ0FBQyxXQUFXLE9BQU8sQ0FBQztBQUFBLElBQ3BELENBQUM7QUFDRCxRQUFJLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsZUFBZSxJQUFJO0FBQ3JFLFVBQU0sS0FBSyxTQUFTLGlCQUFpQixhQUFhLENBQUMsQ0FBQyxFQUFFLE9BQU8sbUJBQW1CLEVBQUUsUUFBUSxDQUFDLE9BQU87QUFDaEcsZUFBUyxFQUFFO0FBQUEsSUFDYixDQUFDO0FBQ0QsYUFBUyxVQUFVLG9CQUFvQjtBQUFBLEVBQ3pDO0FBQ0EsTUFBSSx3QkFBd0IsQ0FBQztBQUM3QixNQUFJLHdCQUF3QixDQUFDO0FBQzdCLFdBQVMsZ0JBQWdCO0FBQ3ZCLFdBQU8sc0JBQXNCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQztBQUFBLEVBQy9DO0FBQ0EsV0FBUyxlQUFlO0FBQ3RCLFdBQU8sc0JBQXNCLE9BQU8scUJBQXFCLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDO0FBQUEsRUFDN0U7QUFDQSxXQUFTLGdCQUFnQixrQkFBa0I7QUFDekMsMEJBQXNCLEtBQUssZ0JBQWdCO0FBQUEsRUFDN0M7QUFDQSxXQUFTLGdCQUFnQixrQkFBa0I7QUFDekMsMEJBQXNCLEtBQUssZ0JBQWdCO0FBQUEsRUFDN0M7QUFDQSxXQUFTLFlBQVksSUFBSSx1QkFBdUIsT0FBTztBQUNyRCxXQUFPLFlBQVksSUFBSSxDQUFDLFlBQVk7QUFDbEMsWUFBTSxZQUFZLHVCQUF1QixhQUFhLElBQUksY0FBYztBQUN4RSxVQUFJLFVBQVUsS0FBSyxDQUFDLGFBQWEsUUFBUSxRQUFRLFFBQVEsQ0FBQztBQUN4RCxlQUFPO0FBQUEsSUFDWCxDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsWUFBWSxJQUFJLFVBQVU7QUFDakMsUUFBSSxDQUFDO0FBQ0g7QUFDRixRQUFJLFNBQVMsRUFBRTtBQUNiLGFBQU87QUFDVCxRQUFJLEdBQUc7QUFDTCxXQUFLLEdBQUc7QUFDVixRQUFJLENBQUMsR0FBRztBQUNOO0FBQ0YsV0FBTyxZQUFZLEdBQUcsZUFBZSxRQUFRO0FBQUEsRUFDL0M7QUFDQSxXQUFTLE9BQU8sSUFBSTtBQUNsQixXQUFPLGNBQWMsRUFBRSxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsUUFBUSxDQUFDO0FBQUEsRUFDaEU7QUFDQSxXQUFTLFNBQVMsSUFBSSxTQUFTLE1BQU07QUFDbkMsNEJBQXdCLE1BQU07QUFDNUIsYUFBTyxJQUFJLENBQUMsS0FBSyxTQUFTO0FBQ3hCLG1CQUFXLEtBQUssSUFBSSxVQUFVLEVBQUUsUUFBUSxDQUFDLFdBQVcsT0FBTyxDQUFDO0FBQzVELFlBQUksYUFBYSxLQUFLO0FBQUEsTUFDeEIsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0g7QUFDQSxXQUFTLFlBQVksTUFBTTtBQUN6QixTQUFLLE1BQU0sQ0FBQyxPQUFPLGtCQUFrQixFQUFFLENBQUM7QUFBQSxFQUMxQztBQUdBLFdBQVMsV0FBVyxJQUFJLE9BQU87QUFDN0IsUUFBSSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3hCLGFBQU8scUJBQXFCLElBQUksTUFBTSxLQUFLLEdBQUcsQ0FBQztBQUFBLElBQ2pELFdBQVcsT0FBTyxVQUFVLFlBQVksVUFBVSxNQUFNO0FBQ3RELGFBQU8scUJBQXFCLElBQUksS0FBSztBQUFBLElBQ3ZDLFdBQVcsT0FBTyxVQUFVLFlBQVk7QUFDdEMsYUFBTyxXQUFXLElBQUksTUFBTSxDQUFDO0FBQUEsSUFDL0I7QUFDQSxXQUFPLHFCQUFxQixJQUFJLEtBQUs7QUFBQSxFQUN2QztBQUNBLFdBQVMscUJBQXFCLElBQUksYUFBYTtBQUM3QyxRQUFJLFFBQVEsQ0FBQyxpQkFBaUIsYUFBYSxNQUFNLEdBQUcsRUFBRSxPQUFPLE9BQU87QUFDcEUsUUFBSSxpQkFBaUIsQ0FBQyxpQkFBaUIsYUFBYSxNQUFNLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsVUFBVSxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sT0FBTztBQUN0SCxRQUFJLDBCQUEwQixDQUFDLFlBQVk7QUFDekMsU0FBRyxVQUFVLElBQUksR0FBRyxPQUFPO0FBQzNCLGFBQU8sTUFBTTtBQUNYLFdBQUcsVUFBVSxPQUFPLEdBQUcsT0FBTztBQUFBLE1BQ2hDO0FBQUEsSUFDRjtBQUNBLGtCQUFjLGdCQUFnQixPQUFPLGNBQWMsS0FBSyxlQUFlO0FBQ3ZFLFdBQU8sd0JBQXdCLGVBQWUsV0FBVyxDQUFDO0FBQUEsRUFDNUQ7QUFDQSxXQUFTLHFCQUFxQixJQUFJLGFBQWE7QUFDN0MsUUFBSSxRQUFRLENBQUMsZ0JBQWdCLFlBQVksTUFBTSxHQUFHLEVBQUUsT0FBTyxPQUFPO0FBQ2xFLFFBQUksU0FBUyxPQUFPLFFBQVEsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLGFBQWEsSUFBSSxNQUFNLE9BQU8sTUFBTSxXQUFXLElBQUksS0FBSyxFQUFFLE9BQU8sT0FBTztBQUMzSCxRQUFJLFlBQVksT0FBTyxRQUFRLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLE9BQU8sTUFBTSxXQUFXLElBQUksS0FBSyxFQUFFLE9BQU8sT0FBTztBQUMvSCxRQUFJLFFBQVEsQ0FBQztBQUNiLFFBQUksVUFBVSxDQUFDO0FBQ2YsY0FBVSxRQUFRLENBQUMsTUFBTTtBQUN2QixVQUFJLEdBQUcsVUFBVSxTQUFTLENBQUMsR0FBRztBQUM1QixXQUFHLFVBQVUsT0FBTyxDQUFDO0FBQ3JCLGdCQUFRLEtBQUssQ0FBQztBQUFBLE1BQ2hCO0FBQUEsSUFDRixDQUFDO0FBQ0QsV0FBTyxRQUFRLENBQUMsTUFBTTtBQUNwQixVQUFJLENBQUMsR0FBRyxVQUFVLFNBQVMsQ0FBQyxHQUFHO0FBQzdCLFdBQUcsVUFBVSxJQUFJLENBQUM7QUFDbEIsY0FBTSxLQUFLLENBQUM7QUFBQSxNQUNkO0FBQUEsSUFDRixDQUFDO0FBQ0QsV0FBTyxNQUFNO0FBQ1gsY0FBUSxRQUFRLENBQUMsTUFBTSxHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUM7QUFDMUMsWUFBTSxRQUFRLENBQUMsTUFBTSxHQUFHLFVBQVUsT0FBTyxDQUFDLENBQUM7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFHQSxXQUFTLFVBQVUsSUFBSSxPQUFPO0FBQzVCLFFBQUksT0FBTyxVQUFVLFlBQVksVUFBVSxNQUFNO0FBQy9DLGFBQU8sb0JBQW9CLElBQUksS0FBSztBQUFBLElBQ3RDO0FBQ0EsV0FBTyxvQkFBb0IsSUFBSSxLQUFLO0FBQUEsRUFDdEM7QUFDQSxXQUFTLG9CQUFvQixJQUFJLE9BQU87QUFDdEMsUUFBSSxpQkFBaUIsQ0FBQztBQUN0QixXQUFPLFFBQVEsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEtBQUssTUFBTSxNQUFNO0FBQy9DLHFCQUFlLEdBQUcsSUFBSSxHQUFHLE1BQU0sR0FBRztBQUNsQyxVQUFJLENBQUMsSUFBSSxXQUFXLElBQUksR0FBRztBQUN6QixjQUFNLFVBQVUsR0FBRztBQUFBLE1BQ3JCO0FBQ0EsU0FBRyxNQUFNLFlBQVksS0FBSyxNQUFNO0FBQUEsSUFDbEMsQ0FBQztBQUNELGVBQVcsTUFBTTtBQUNmLFVBQUksR0FBRyxNQUFNLFdBQVcsR0FBRztBQUN6QixXQUFHLGdCQUFnQixPQUFPO0FBQUEsTUFDNUI7QUFBQSxJQUNGLENBQUM7QUFDRCxXQUFPLE1BQU07QUFDWCxnQkFBVSxJQUFJLGNBQWM7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFDQSxXQUFTLG9CQUFvQixJQUFJLE9BQU87QUFDdEMsUUFBSSxRQUFRLEdBQUcsYUFBYSxTQUFTLEtBQUs7QUFDMUMsT0FBRyxhQUFhLFNBQVMsS0FBSztBQUM5QixXQUFPLE1BQU07QUFDWCxTQUFHLGFBQWEsU0FBUyxTQUFTLEVBQUU7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDQSxXQUFTLFVBQVUsU0FBUztBQUMxQixXQUFPLFFBQVEsUUFBUSxtQkFBbUIsT0FBTyxFQUFFLFlBQVk7QUFBQSxFQUNqRTtBQUdBLFdBQVMsS0FBSyxVQUFVLFdBQVcsTUFBTTtBQUFBLEVBQ3pDLEdBQUc7QUFDRCxRQUFJLFNBQVM7QUFDYixXQUFPLFdBQVc7QUFDaEIsVUFBSSxDQUFDLFFBQVE7QUFDWCxpQkFBUztBQUNULGlCQUFTLE1BQU0sTUFBTSxTQUFTO0FBQUEsTUFDaEMsT0FBTztBQUNMLGlCQUFTLE1BQU0sTUFBTSxTQUFTO0FBQUEsTUFDaEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUdBLFlBQVUsY0FBYyxDQUFDLElBQUksRUFBQyxPQUFPLFdBQVcsV0FBVSxHQUFHLEVBQUMsVUFBVSxVQUFTLE1BQU07QUFDckYsUUFBSSxPQUFPLGVBQWU7QUFDeEIsbUJBQWEsVUFBVSxVQUFVO0FBQ25DLFFBQUksQ0FBQyxZQUFZO0FBQ2Ysb0NBQThCLElBQUksV0FBVyxLQUFLO0FBQUEsSUFDcEQsT0FBTztBQUNMLHlDQUFtQyxJQUFJLFlBQVksS0FBSztBQUFBLElBQzFEO0FBQUEsRUFDRixDQUFDO0FBQ0QsV0FBUyxtQ0FBbUMsSUFBSSxhQUFhLE9BQU87QUFDbEUsNkJBQXlCLElBQUksWUFBWSxFQUFFO0FBQzNDLFFBQUksc0JBQXNCO0FBQUEsTUFDeEIsT0FBTyxDQUFDLFlBQVk7QUFDbEIsV0FBRyxjQUFjLE1BQU0sU0FBUztBQUFBLE1BQ2xDO0FBQUEsTUFDQSxlQUFlLENBQUMsWUFBWTtBQUMxQixXQUFHLGNBQWMsTUFBTSxRQUFRO0FBQUEsTUFDakM7QUFBQSxNQUNBLGFBQWEsQ0FBQyxZQUFZO0FBQ3hCLFdBQUcsY0FBYyxNQUFNLE1BQU07QUFBQSxNQUMvQjtBQUFBLE1BQ0EsT0FBTyxDQUFDLFlBQVk7QUFDbEIsV0FBRyxjQUFjLE1BQU0sU0FBUztBQUFBLE1BQ2xDO0FBQUEsTUFDQSxlQUFlLENBQUMsWUFBWTtBQUMxQixXQUFHLGNBQWMsTUFBTSxRQUFRO0FBQUEsTUFDakM7QUFBQSxNQUNBLGFBQWEsQ0FBQyxZQUFZO0FBQ3hCLFdBQUcsY0FBYyxNQUFNLE1BQU07QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFDQSx3QkFBb0IsS0FBSyxFQUFFLFdBQVc7QUFBQSxFQUN4QztBQUNBLFdBQVMsOEJBQThCLElBQUksV0FBVyxPQUFPO0FBQzNELDZCQUF5QixJQUFJLFNBQVM7QUFDdEMsUUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLFNBQVMsSUFBSSxLQUFLLENBQUMsVUFBVSxTQUFTLEtBQUssS0FBSyxDQUFDO0FBQ2hGLFFBQUksa0JBQWtCLGlCQUFpQixVQUFVLFNBQVMsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsS0FBSztBQUMzRixRQUFJLG1CQUFtQixpQkFBaUIsVUFBVSxTQUFTLEtBQUssS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLEtBQUs7QUFDN0YsUUFBSSxVQUFVLFNBQVMsSUFBSSxLQUFLLENBQUMsZUFBZTtBQUM5QyxrQkFBWSxVQUFVLE9BQU8sQ0FBQyxHQUFHLFVBQVUsUUFBUSxVQUFVLFFBQVEsS0FBSyxDQUFDO0FBQUEsSUFDN0U7QUFDQSxRQUFJLFVBQVUsU0FBUyxLQUFLLEtBQUssQ0FBQyxlQUFlO0FBQy9DLGtCQUFZLFVBQVUsT0FBTyxDQUFDLEdBQUcsVUFBVSxRQUFRLFVBQVUsUUFBUSxLQUFLLENBQUM7QUFBQSxJQUM3RTtBQUNBLFFBQUksV0FBVyxDQUFDLFVBQVUsU0FBUyxTQUFTLEtBQUssQ0FBQyxVQUFVLFNBQVMsT0FBTztBQUM1RSxRQUFJLGVBQWUsWUFBWSxVQUFVLFNBQVMsU0FBUztBQUMzRCxRQUFJLGFBQWEsWUFBWSxVQUFVLFNBQVMsT0FBTztBQUN2RCxRQUFJLGVBQWUsZUFBZSxJQUFJO0FBQ3RDLFFBQUksYUFBYSxhQUFhLGNBQWMsV0FBVyxTQUFTLEVBQUUsSUFBSSxNQUFNO0FBQzVFLFFBQUksUUFBUSxjQUFjLFdBQVcsU0FBUyxDQUFDO0FBQy9DLFFBQUksU0FBUyxjQUFjLFdBQVcsVUFBVSxRQUFRO0FBQ3hELFFBQUksV0FBVztBQUNmLFFBQUksYUFBYSxjQUFjLFdBQVcsWUFBWSxHQUFHLElBQUk7QUFDN0QsUUFBSSxjQUFjLGNBQWMsV0FBVyxZQUFZLEVBQUUsSUFBSTtBQUM3RCxRQUFJLFNBQVM7QUFDYixRQUFJLGlCQUFpQjtBQUNuQixTQUFHLGNBQWMsTUFBTSxTQUFTO0FBQUEsUUFDOUIsaUJBQWlCO0FBQUEsUUFDakIsaUJBQWlCO0FBQUEsUUFDakIsb0JBQW9CO0FBQUEsUUFDcEIsb0JBQW9CLEdBQUcsVUFBVTtBQUFBLFFBQ2pDLDBCQUEwQjtBQUFBLE1BQzVCO0FBQ0EsU0FBRyxjQUFjLE1BQU0sUUFBUTtBQUFBLFFBQzdCLFNBQVM7QUFBQSxRQUNULFdBQVcsU0FBUyxVQUFVO0FBQUEsTUFDaEM7QUFDQSxTQUFHLGNBQWMsTUFBTSxNQUFNO0FBQUEsUUFDM0IsU0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBQ0EsUUFBSSxrQkFBa0I7QUFDcEIsU0FBRyxjQUFjLE1BQU0sU0FBUztBQUFBLFFBQzlCLGlCQUFpQjtBQUFBLFFBQ2pCLGlCQUFpQjtBQUFBLFFBQ2pCLG9CQUFvQjtBQUFBLFFBQ3BCLG9CQUFvQixHQUFHLFdBQVc7QUFBQSxRQUNsQywwQkFBMEI7QUFBQSxNQUM1QjtBQUNBLFNBQUcsY0FBYyxNQUFNLFFBQVE7QUFBQSxRQUM3QixTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsTUFDYjtBQUNBLFNBQUcsY0FBYyxNQUFNLE1BQU07QUFBQSxRQUMzQixTQUFTO0FBQUEsUUFDVCxXQUFXLFNBQVMsVUFBVTtBQUFBLE1BQ2hDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxXQUFTLHlCQUF5QixJQUFJLGFBQWEsZUFBZSxDQUFDLEdBQUc7QUFDcEUsUUFBSSxDQUFDLEdBQUc7QUFDTixTQUFHLGdCQUFnQjtBQUFBLFFBQ2pCLE9BQU8sRUFBQyxRQUFRLGNBQWMsT0FBTyxjQUFjLEtBQUssYUFBWTtBQUFBLFFBQ3BFLE9BQU8sRUFBQyxRQUFRLGNBQWMsT0FBTyxjQUFjLEtBQUssYUFBWTtBQUFBLFFBQ3BFLEdBQUcsU0FBUyxNQUFNO0FBQUEsUUFDbEIsR0FBRyxRQUFRLE1BQU07QUFBQSxRQUNqQixHQUFHO0FBQ0QscUJBQVcsSUFBSSxhQUFhO0FBQUEsWUFDMUIsUUFBUSxLQUFLLE1BQU07QUFBQSxZQUNuQixPQUFPLEtBQUssTUFBTTtBQUFBLFlBQ2xCLEtBQUssS0FBSyxNQUFNO0FBQUEsVUFDbEIsR0FBRyxRQUFRLEtBQUs7QUFBQSxRQUNsQjtBQUFBLFFBQ0EsSUFBSSxTQUFTLE1BQU07QUFBQSxRQUNuQixHQUFHLFFBQVEsTUFBTTtBQUFBLFFBQ2pCLEdBQUc7QUFDRCxxQkFBVyxJQUFJLGFBQWE7QUFBQSxZQUMxQixRQUFRLEtBQUssTUFBTTtBQUFBLFlBQ25CLE9BQU8sS0FBSyxNQUFNO0FBQUEsWUFDbEIsS0FBSyxLQUFLLE1BQU07QUFBQSxVQUNsQixHQUFHLFFBQVEsS0FBSztBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLEVBQ0o7QUFDQSxTQUFPLFFBQVEsVUFBVSxxQ0FBcUMsU0FBUyxJQUFJLE9BQU8sTUFBTSxNQUFNO0FBQzVGLFVBQU0sWUFBWSxTQUFTLG9CQUFvQixZQUFZLHdCQUF3QjtBQUNuRixRQUFJLDBCQUEwQixNQUFNLFVBQVUsSUFBSTtBQUNsRCxRQUFJLE9BQU87QUFDVCxVQUFJLEdBQUcsa0JBQWtCLEdBQUcsY0FBYyxTQUFTLEdBQUcsY0FBYyxRQUFRO0FBQzFFLFdBQUcsY0FBYyxVQUFVLE9BQU8sUUFBUSxHQUFHLGNBQWMsTUFBTSxNQUFNLEVBQUUsVUFBVSxPQUFPLFFBQVEsR0FBRyxjQUFjLE1BQU0sS0FBSyxFQUFFLFVBQVUsT0FBTyxRQUFRLEdBQUcsY0FBYyxNQUFNLEdBQUcsRUFBRSxVQUFVLEdBQUcsY0FBYyxHQUFHLElBQUksSUFBSSx3QkFBd0I7QUFBQSxNQUNyUCxPQUFPO0FBQ0wsV0FBRyxnQkFBZ0IsR0FBRyxjQUFjLEdBQUcsSUFBSSxJQUFJLHdCQUF3QjtBQUFBLE1BQ3pFO0FBQ0E7QUFBQSxJQUNGO0FBQ0EsT0FBRyxpQkFBaUIsR0FBRyxnQkFBZ0IsSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ3RFLFNBQUcsY0FBYyxJQUFJLE1BQU07QUFBQSxNQUMzQixHQUFHLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdEIsU0FBRyxpQkFBaUIsYUFBYSxNQUFNLE9BQU8sRUFBQywyQkFBMkIsS0FBSSxDQUFDLENBQUM7QUFBQSxJQUNsRixDQUFDLElBQUksUUFBUSxRQUFRLElBQUk7QUFDekIsbUJBQWUsTUFBTTtBQUNuQixVQUFJLFVBQVUsWUFBWSxFQUFFO0FBQzVCLFVBQUksU0FBUztBQUNYLFlBQUksQ0FBQyxRQUFRO0FBQ1gsa0JBQVEsa0JBQWtCLENBQUM7QUFDN0IsZ0JBQVEsZ0JBQWdCLEtBQUssRUFBRTtBQUFBLE1BQ2pDLE9BQU87QUFDTCxrQkFBVSxNQUFNO0FBQ2QsY0FBSSxvQkFBb0IsQ0FBQyxRQUFRO0FBQy9CLGdCQUFJLFFBQVEsUUFBUSxJQUFJO0FBQUEsY0FDdEIsSUFBSTtBQUFBLGNBQ0osSUFBSSxJQUFJLG1CQUFtQixDQUFDLEdBQUcsSUFBSSxpQkFBaUI7QUFBQSxZQUN0RCxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNwQixtQkFBTyxJQUFJO0FBQ1gsbUJBQU8sSUFBSTtBQUNYLG1CQUFPO0FBQUEsVUFDVDtBQUNBLDRCQUFrQixFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU07QUFDakMsZ0JBQUksQ0FBQyxFQUFFO0FBQ0wsb0JBQU07QUFBQSxVQUNWLENBQUM7QUFBQSxRQUNILENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsWUFBWSxJQUFJO0FBQ3ZCLFFBQUksU0FBUyxHQUFHO0FBQ2hCLFFBQUksQ0FBQztBQUNIO0FBQ0YsV0FBTyxPQUFPLGlCQUFpQixTQUFTLFlBQVksTUFBTTtBQUFBLEVBQzVEO0FBQ0EsV0FBUyxXQUFXLElBQUksYUFBYSxFQUFDLFFBQVEsT0FBTyxRQUFRLElBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxNQUFNO0FBQUEsRUFDdkYsR0FBRyxRQUFRLE1BQU07QUFBQSxFQUNqQixHQUFHO0FBQ0QsUUFBSSxHQUFHO0FBQ0wsU0FBRyxpQkFBaUIsT0FBTztBQUM3QixRQUFJLE9BQU8sS0FBSyxNQUFNLEVBQUUsV0FBVyxLQUFLLE9BQU8sS0FBSyxNQUFNLEVBQUUsV0FBVyxLQUFLLE9BQU8sS0FBSyxHQUFHLEVBQUUsV0FBVyxHQUFHO0FBQ3pHLGFBQU87QUFDUCxZQUFNO0FBQ047QUFBQSxJQUNGO0FBQ0EsUUFBSSxXQUFXLFlBQVk7QUFDM0Isc0JBQWtCLElBQUk7QUFBQSxNQUNwQixRQUFRO0FBQ04sb0JBQVksWUFBWSxJQUFJLE1BQU07QUFBQSxNQUNwQztBQUFBLE1BQ0EsU0FBUztBQUNQLHFCQUFhLFlBQVksSUFBSSxNQUFNO0FBQUEsTUFDckM7QUFBQSxNQUNBO0FBQUEsTUFDQSxNQUFNO0FBQ0osa0JBQVU7QUFDVixrQkFBVSxZQUFZLElBQUksR0FBRztBQUFBLE1BQy9CO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVTtBQUNSLG1CQUFXO0FBQ1gsZ0JBQVE7QUFBQSxNQUNWO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsa0JBQWtCLElBQUksUUFBUTtBQUNyQyxRQUFJLGFBQWEsZUFBZTtBQUNoQyxRQUFJLFNBQVMsS0FBSyxNQUFNO0FBQ3RCLGdCQUFVLE1BQU07QUFDZCxzQkFBYztBQUNkLFlBQUksQ0FBQztBQUNILGlCQUFPLE9BQU87QUFDaEIsWUFBSSxDQUFDLFlBQVk7QUFDZixpQkFBTyxJQUFJO0FBQ1gsMkJBQWlCO0FBQUEsUUFDbkI7QUFDQSxlQUFPLE1BQU07QUFDYixZQUFJLEdBQUc7QUFDTCxpQkFBTyxRQUFRO0FBQ2pCLGVBQU8sR0FBRztBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUNELE9BQUcsbUJBQW1CO0FBQUEsTUFDcEIsZUFBZSxDQUFDO0FBQUEsTUFDaEIsYUFBYSxVQUFVO0FBQ3JCLGFBQUssY0FBYyxLQUFLLFFBQVE7QUFBQSxNQUNsQztBQUFBLE1BQ0EsUUFBUSxLQUFLLFdBQVc7QUFDdEIsZUFBTyxLQUFLLGNBQWMsUUFBUTtBQUNoQyxlQUFLLGNBQWMsTUFBTSxFQUFFO0FBQUEsUUFDN0I7QUFDQTtBQUNBLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxNQUNEO0FBQUEsSUFDRjtBQUNBLGNBQVUsTUFBTTtBQUNkLGFBQU8sTUFBTTtBQUNiLGFBQU8sT0FBTztBQUFBLElBQ2hCLENBQUM7QUFDRCxrQkFBYztBQUNkLDBCQUFzQixNQUFNO0FBQzFCLFVBQUk7QUFDRjtBQUNGLFVBQUksV0FBVyxPQUFPLGlCQUFpQixFQUFFLEVBQUUsbUJBQW1CLFFBQVEsT0FBTyxFQUFFLEVBQUUsUUFBUSxLQUFLLEVBQUUsQ0FBQyxJQUFJO0FBQ3JHLFVBQUksUUFBUSxPQUFPLGlCQUFpQixFQUFFLEVBQUUsZ0JBQWdCLFFBQVEsT0FBTyxFQUFFLEVBQUUsUUFBUSxLQUFLLEVBQUUsQ0FBQyxJQUFJO0FBQy9GLFVBQUksYUFBYTtBQUNmLG1CQUFXLE9BQU8saUJBQWlCLEVBQUUsRUFBRSxrQkFBa0IsUUFBUSxLQUFLLEVBQUUsQ0FBQyxJQUFJO0FBQy9FLGdCQUFVLE1BQU07QUFDZCxlQUFPLE9BQU87QUFBQSxNQUNoQixDQUFDO0FBQ0Qsc0JBQWdCO0FBQ2hCLDRCQUFzQixNQUFNO0FBQzFCLFlBQUk7QUFDRjtBQUNGLGtCQUFVLE1BQU07QUFDZCxpQkFBTyxJQUFJO0FBQUEsUUFDYixDQUFDO0FBQ0QseUJBQWlCO0FBQ2pCLG1CQUFXLEdBQUcsaUJBQWlCLFFBQVEsV0FBVyxLQUFLO0FBQ3ZELHFCQUFhO0FBQUEsTUFDZixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsY0FBYyxXQUFXLEtBQUssVUFBVTtBQUMvQyxRQUFJLFVBQVUsUUFBUSxHQUFHLE1BQU07QUFDN0IsYUFBTztBQUNULFVBQU0sV0FBVyxVQUFVLFVBQVUsUUFBUSxHQUFHLElBQUksQ0FBQztBQUNyRCxRQUFJLENBQUM7QUFDSCxhQUFPO0FBQ1QsUUFBSSxRQUFRLFNBQVM7QUFDbkIsVUFBSSxNQUFNLFFBQVE7QUFDaEIsZUFBTztBQUFBLElBQ1g7QUFDQSxRQUFJLFFBQVEsWUFBWTtBQUN0QixVQUFJLFFBQVEsU0FBUyxNQUFNLFlBQVk7QUFDdkMsVUFBSTtBQUNGLGVBQU8sTUFBTSxDQUFDO0FBQUEsSUFDbEI7QUFDQSxRQUFJLFFBQVEsVUFBVTtBQUNwQixVQUFJLENBQUMsT0FBTyxTQUFTLFFBQVEsVUFBVSxRQUFRLEVBQUUsU0FBUyxVQUFVLFVBQVUsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUc7QUFDaEcsZUFBTyxDQUFDLFVBQVUsVUFBVSxVQUFVLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRztBQUFBLE1BQ25FO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBR0EsTUFBSSxZQUFZO0FBQ2hCLFdBQVMsZ0JBQWdCLFVBQVUsV0FBVyxNQUFNO0FBQUEsRUFDcEQsR0FBRztBQUNELFdBQU8sSUFBSSxTQUFTLFlBQVksU0FBUyxHQUFHLElBQUksSUFBSSxTQUFTLEdBQUcsSUFBSTtBQUFBLEVBQ3RFO0FBQ0EsV0FBUyxNQUFNLE9BQU8sT0FBTztBQUMzQixRQUFJLENBQUMsTUFBTTtBQUNULFlBQU0sZUFBZSxNQUFNO0FBQzdCLGdCQUFZO0FBQ1osb0NBQWdDLE1BQU07QUFDcEMsZ0JBQVUsS0FBSztBQUFBLElBQ2pCLENBQUM7QUFDRCxnQkFBWTtBQUFBLEVBQ2Q7QUFDQSxXQUFTLFVBQVUsSUFBSTtBQUNyQixRQUFJLHVCQUF1QjtBQUMzQixRQUFJLGdCQUFnQixDQUFDLEtBQUssYUFBYTtBQUNyQyxXQUFLLEtBQUssQ0FBQyxLQUFLLFNBQVM7QUFDdkIsWUFBSSx3QkFBd0IsT0FBTyxHQUFHO0FBQ3BDLGlCQUFPLEtBQUs7QUFDZCwrQkFBdUI7QUFDdkIsaUJBQVMsS0FBSyxJQUFJO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0g7QUFDQSxhQUFTLElBQUksYUFBYTtBQUFBLEVBQzVCO0FBQ0EsV0FBUyxnQ0FBZ0MsVUFBVTtBQUNqRCxRQUFJLFFBQVE7QUFDWixtQkFBZSxDQUFDLFdBQVcsT0FBTztBQUNoQyxVQUFJLGVBQWUsTUFBTSxTQUFTO0FBQ2xDLGNBQVEsWUFBWTtBQUNwQixhQUFPLE1BQU07QUFBQSxNQUNiO0FBQUEsSUFDRixDQUFDO0FBQ0QsYUFBUztBQUNULG1CQUFlLEtBQUs7QUFBQSxFQUN0QjtBQUdBLFdBQVMsS0FBSyxJQUFJLE1BQU0sT0FBTyxZQUFZLENBQUMsR0FBRztBQUM3QyxRQUFJLENBQUMsR0FBRztBQUNOLFNBQUcsY0FBYyxTQUFTLENBQUMsQ0FBQztBQUM5QixPQUFHLFlBQVksSUFBSSxJQUFJO0FBQ3ZCLFdBQU8sVUFBVSxTQUFTLE9BQU8sSUFBSSxVQUFVLElBQUksSUFBSTtBQUN2RCxZQUFRLE1BQU07QUFBQSxNQUNaLEtBQUs7QUFDSCx1QkFBZSxJQUFJLEtBQUs7QUFDeEI7QUFBQSxNQUNGLEtBQUs7QUFDSCxtQkFBVyxJQUFJLEtBQUs7QUFDcEI7QUFBQSxNQUNGLEtBQUs7QUFDSCxvQkFBWSxJQUFJLEtBQUs7QUFDckI7QUFBQSxNQUNGO0FBQ0Usc0JBQWMsSUFBSSxNQUFNLEtBQUs7QUFDN0I7QUFBQSxJQUNKO0FBQUEsRUFDRjtBQUNBLFdBQVMsZUFBZSxJQUFJLE9BQU87QUFDakMsUUFBSSxHQUFHLFNBQVMsU0FBUztBQUN2QixVQUFJLEdBQUcsV0FBVyxVQUFVLFFBQVE7QUFDbEMsV0FBRyxRQUFRO0FBQUEsTUFDYjtBQUNBLFVBQUksT0FBTyxXQUFXO0FBQ3BCLFdBQUcsVUFBVSx3QkFBd0IsR0FBRyxPQUFPLEtBQUs7QUFBQSxNQUN0RDtBQUFBLElBQ0YsV0FBVyxHQUFHLFNBQVMsWUFBWTtBQUNqQyxVQUFJLE9BQU8sVUFBVSxLQUFLLEdBQUc7QUFDM0IsV0FBRyxRQUFRO0FBQUEsTUFDYixXQUFXLENBQUMsT0FBTyxVQUFVLEtBQUssS0FBSyxDQUFDLE1BQU0sUUFBUSxLQUFLLEtBQUssT0FBTyxVQUFVLGFBQWEsQ0FBQyxDQUFDLE1BQU0sTUFBTSxFQUFFLFNBQVMsS0FBSyxHQUFHO0FBQzdILFdBQUcsUUFBUSxPQUFPLEtBQUs7QUFBQSxNQUN6QixPQUFPO0FBQ0wsWUFBSSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3hCLGFBQUcsVUFBVSxNQUFNLEtBQUssQ0FBQyxRQUFRLHdCQUF3QixLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQUEsUUFDekUsT0FBTztBQUNMLGFBQUcsVUFBVSxDQUFDLENBQUM7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLFdBQVcsR0FBRyxZQUFZLFVBQVU7QUFDbEMsbUJBQWEsSUFBSSxLQUFLO0FBQUEsSUFDeEIsT0FBTztBQUNMLFVBQUksR0FBRyxVQUFVO0FBQ2Y7QUFDRixTQUFHLFFBQVE7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUNBLFdBQVMsWUFBWSxJQUFJLE9BQU87QUFDOUIsUUFBSSxHQUFHO0FBQ0wsU0FBRyxvQkFBb0I7QUFDekIsT0FBRyxzQkFBc0IsV0FBVyxJQUFJLEtBQUs7QUFBQSxFQUMvQztBQUNBLFdBQVMsV0FBVyxJQUFJLE9BQU87QUFDN0IsUUFBSSxHQUFHO0FBQ0wsU0FBRyxtQkFBbUI7QUFDeEIsT0FBRyxxQkFBcUIsVUFBVSxJQUFJLEtBQUs7QUFBQSxFQUM3QztBQUNBLFdBQVMsY0FBYyxJQUFJLE1BQU0sT0FBTztBQUN0QyxRQUFJLENBQUMsTUFBTSxRQUFRLEtBQUssRUFBRSxTQUFTLEtBQUssS0FBSyxvQ0FBb0MsSUFBSSxHQUFHO0FBQ3RGLFNBQUcsZ0JBQWdCLElBQUk7QUFBQSxJQUN6QixPQUFPO0FBQ0wsVUFBSSxjQUFjLElBQUk7QUFDcEIsZ0JBQVE7QUFDVixtQkFBYSxJQUFJLE1BQU0sS0FBSztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUNBLFdBQVMsYUFBYSxJQUFJLFVBQVUsT0FBTztBQUN6QyxRQUFJLEdBQUcsYUFBYSxRQUFRLEtBQUssT0FBTztBQUN0QyxTQUFHLGFBQWEsVUFBVSxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQ0EsV0FBUyxhQUFhLElBQUksT0FBTztBQUMvQixVQUFNLG9CQUFvQixDQUFDLEVBQUUsT0FBTyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVc7QUFDekQsYUFBTyxTQUFTO0FBQUEsSUFDbEIsQ0FBQztBQUNELFVBQU0sS0FBSyxHQUFHLE9BQU8sRUFBRSxRQUFRLENBQUMsV0FBVztBQUN6QyxhQUFPLFdBQVcsa0JBQWtCLFNBQVMsT0FBTyxLQUFLO0FBQUEsSUFDM0QsQ0FBQztBQUFBLEVBQ0g7QUFDQSxXQUFTLFVBQVUsU0FBUztBQUMxQixXQUFPLFFBQVEsWUFBWSxFQUFFLFFBQVEsVUFBVSxDQUFDLE9BQU8sU0FBUyxLQUFLLFlBQVksQ0FBQztBQUFBLEVBQ3BGO0FBQ0EsV0FBUyx3QkFBd0IsUUFBUSxRQUFRO0FBQy9DLFdBQU8sVUFBVTtBQUFBLEVBQ25CO0FBQ0EsV0FBUyxjQUFjLFVBQVU7QUFDL0IsVUFBTSxvQkFBb0I7QUFBQSxNQUN4QjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFDQSxXQUFPLGtCQUFrQixTQUFTLFFBQVE7QUFBQSxFQUM1QztBQUNBLFdBQVMsb0NBQW9DLE1BQU07QUFDakQsV0FBTyxDQUFDLENBQUMsZ0JBQWdCLGdCQUFnQixpQkFBaUIsZUFBZSxFQUFFLFNBQVMsSUFBSTtBQUFBLEVBQzFGO0FBQ0EsV0FBUyxXQUFXLElBQUksTUFBTSxVQUFVO0FBQ3RDLFFBQUksR0FBRyxlQUFlLEdBQUcsWUFBWSxJQUFJLE1BQU07QUFDN0MsYUFBTyxHQUFHLFlBQVksSUFBSTtBQUM1QixRQUFJLE9BQU8sR0FBRyxhQUFhLElBQUk7QUFDL0IsUUFBSSxTQUFTO0FBQ1gsYUFBTyxPQUFPLGFBQWEsYUFBYSxTQUFTLElBQUk7QUFDdkQsUUFBSSxjQUFjLElBQUksR0FBRztBQUN2QixhQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sTUFBTSxFQUFFLFNBQVMsSUFBSTtBQUFBLElBQ3ZDO0FBQ0EsUUFBSSxTQUFTO0FBQ1gsYUFBTztBQUNULFdBQU87QUFBQSxFQUNUO0FBR0EsV0FBUyxTQUFTLE1BQU0sTUFBTTtBQUM1QixRQUFJO0FBQ0osV0FBTyxXQUFXO0FBQ2hCLFVBQUksVUFBVSxNQUFNLE9BQU87QUFDM0IsVUFBSSxRQUFRLFdBQVc7QUFDckIsa0JBQVU7QUFDVixhQUFLLE1BQU0sU0FBUyxJQUFJO0FBQUEsTUFDMUI7QUFDQSxtQkFBYSxPQUFPO0FBQ3BCLGdCQUFVLFdBQVcsT0FBTyxJQUFJO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBR0EsV0FBUyxTQUFTLE1BQU0sT0FBTztBQUM3QixRQUFJO0FBQ0osV0FBTyxXQUFXO0FBQ2hCLFVBQUksVUFBVSxNQUFNLE9BQU87QUFDM0IsVUFBSSxDQUFDLFlBQVk7QUFDZixhQUFLLE1BQU0sU0FBUyxJQUFJO0FBQ3hCLHFCQUFhO0FBQ2IsbUJBQVcsTUFBTSxhQUFhLE9BQU8sS0FBSztBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFHQSxXQUFTLE9BQU8sVUFBVTtBQUN4QixhQUFTLGNBQWM7QUFBQSxFQUN6QjtBQUdBLE1BQUksU0FBUyxDQUFDO0FBQ2QsTUFBSSxhQUFhO0FBQ2pCLFdBQVMsTUFBTSxNQUFNLE9BQU87QUFDMUIsUUFBSSxDQUFDLFlBQVk7QUFDZixlQUFTLFNBQVMsTUFBTTtBQUN4QixtQkFBYTtBQUFBLElBQ2Y7QUFDQSxRQUFJLFVBQVUsUUFBUTtBQUNwQixhQUFPLE9BQU8sSUFBSTtBQUFBLElBQ3BCO0FBQ0EsV0FBTyxJQUFJLElBQUk7QUFDZixRQUFJLE9BQU8sVUFBVSxZQUFZLFVBQVUsUUFBUSxNQUFNLGVBQWUsTUFBTSxLQUFLLE9BQU8sTUFBTSxTQUFTLFlBQVk7QUFDbkgsYUFBTyxJQUFJLEVBQUUsS0FBSztBQUFBLElBQ3BCO0FBQ0EscUJBQWlCLE9BQU8sSUFBSSxDQUFDO0FBQUEsRUFDL0I7QUFDQSxXQUFTLFlBQVk7QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFHQSxNQUFJLFFBQVEsQ0FBQztBQUNiLFdBQVMsTUFBTSxNQUFNLFVBQVU7QUFDN0IsUUFBSSxjQUFjLE9BQU8sYUFBYSxhQUFhLE1BQU0sV0FBVztBQUNwRSxRQUFJLGdCQUFnQixTQUFTO0FBQzNCLDBCQUFvQixNQUFNLFlBQVksQ0FBQztBQUFBLElBQ3pDLE9BQU87QUFDTCxZQUFNLElBQUksSUFBSTtBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNBLFdBQVMsdUJBQXVCLEtBQUs7QUFDbkMsV0FBTyxRQUFRLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLFFBQVEsTUFBTTtBQUNsRCxhQUFPLGVBQWUsS0FBSyxNQUFNO0FBQUEsUUFDL0IsTUFBTTtBQUNKLGlCQUFPLElBQUksU0FBUztBQUNsQixtQkFBTyxTQUFTLEdBQUcsSUFBSTtBQUFBLFVBQ3pCO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUNELFdBQU87QUFBQSxFQUNUO0FBQ0EsV0FBUyxvQkFBb0IsSUFBSSxLQUFLLFVBQVU7QUFDOUMsUUFBSSxpQkFBaUIsQ0FBQztBQUN0QixXQUFPLGVBQWU7QUFDcEIscUJBQWUsSUFBSSxFQUFFO0FBQ3ZCLFFBQUksYUFBYSxPQUFPLFFBQVEsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUMsTUFBTSxNQUFLLEVBQUU7QUFDM0UsUUFBSSxtQkFBbUIsZUFBZSxVQUFVO0FBQ2hELGlCQUFhLFdBQVcsSUFBSSxDQUFDLGNBQWM7QUFDekMsVUFBSSxpQkFBaUIsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLFVBQVUsSUFBSSxHQUFHO0FBQ2pFLGVBQU87QUFBQSxVQUNMLE1BQU0sVUFBVSxVQUFVLElBQUk7QUFBQSxVQUM5QixPQUFPLElBQUksVUFBVSxLQUFLO0FBQUEsUUFDNUI7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUNELGVBQVcsSUFBSSxZQUFZLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVztBQUNuRCxxQkFBZSxLQUFLLE9BQU8sV0FBVztBQUN0QyxhQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSDtBQUdBLE1BQUksUUFBUSxDQUFDO0FBQ2IsV0FBUyxLQUFLLE1BQU0sVUFBVTtBQUM1QixVQUFNLElBQUksSUFBSTtBQUFBLEVBQ2hCO0FBQ0EsV0FBUyxvQkFBb0IsS0FBSyxTQUFTO0FBQ3pDLFdBQU8sUUFBUSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxRQUFRLE1BQU07QUFDbEQsYUFBTyxlQUFlLEtBQUssTUFBTTtBQUFBLFFBQy9CLE1BQU07QUFDSixpQkFBTyxJQUFJLFNBQVM7QUFDbEIsbUJBQU8sU0FBUyxLQUFLLE9BQU8sRUFBRSxHQUFHLElBQUk7QUFBQSxVQUN2QztBQUFBLFFBQ0Y7QUFBQSxRQUNBLFlBQVk7QUFBQSxNQUNkLENBQUM7QUFBQSxJQUNILENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVDtBQUdBLE1BQUksU0FBUztBQUFBLElBQ1gsSUFBSSxXQUFXO0FBQ2IsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLElBQUksVUFBVTtBQUNaLGFBQU87QUFBQSxJQUNUO0FBQUEsSUFDQSxJQUFJLFNBQVM7QUFDWCxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsSUFBSSxNQUFNO0FBQ1IsYUFBTztBQUFBLElBQ1Q7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQO0FBQUEsSUFDQSxNQUFNO0FBQUEsRUFDUjtBQUNBLE1BQUksaUJBQWlCO0FBR3JCLFdBQVMsUUFBUSxLQUFLLGtCQUFrQjtBQUN0QyxVQUFNLE1BQU0sdUJBQU8sT0FBTyxJQUFJO0FBQzlCLFVBQU0sT0FBTyxJQUFJLE1BQU0sR0FBRztBQUMxQixhQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ3BDLFVBQUksS0FBSyxDQUFDLENBQUMsSUFBSTtBQUFBLElBQ2pCO0FBQ0EsV0FBTyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUc7QUFBQSxFQUNsRjtBQXNCQSxNQUFJLHNCQUFzQjtBQUMxQixNQUFJLGlCQUFpQyx3QkFBUSxzQkFBc0IsOElBQThJO0FBQ2pOLE1BQUksWUFBWSxPQUFPLE9BQU8sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzVDLE1BQUksWUFBWSxPQUFPLE9BQU8sT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQzVDLE1BQUksU0FBUyxPQUFPO0FBQ3BCLE1BQUksaUJBQWlCLE9BQU8sVUFBVTtBQUN0QyxNQUFJLFNBQVMsQ0FBQyxLQUFLLFFBQVEsZUFBZSxLQUFLLEtBQUssR0FBRztBQUN2RCxNQUFJLFVBQVUsTUFBTTtBQUNwQixNQUFJLFFBQVEsQ0FBQyxRQUFRLGFBQWEsR0FBRyxNQUFNO0FBQzNDLE1BQUksV0FBVyxDQUFDLFFBQVEsT0FBTyxRQUFRO0FBQ3ZDLE1BQUksV0FBVyxDQUFDLFFBQVEsT0FBTyxRQUFRO0FBQ3ZDLE1BQUksV0FBVyxDQUFDLFFBQVEsUUFBUSxRQUFRLE9BQU8sUUFBUTtBQUN2RCxNQUFJLGlCQUFpQixPQUFPLFVBQVU7QUFDdEMsTUFBSSxlQUFlLENBQUMsVUFBVSxlQUFlLEtBQUssS0FBSztBQUN2RCxNQUFJLFlBQVksQ0FBQyxVQUFVO0FBQ3pCLFdBQU8sYUFBYSxLQUFLLEVBQUUsTUFBTSxHQUFHLEVBQUU7QUFBQSxFQUN4QztBQUNBLE1BQUksZUFBZSxDQUFDLFFBQVEsU0FBUyxHQUFHLEtBQUssUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLE9BQU8sS0FBSyxTQUFTLEtBQUssRUFBRSxNQUFNO0FBQzNHLE1BQUksc0JBQXNCLENBQUMsT0FBTztBQUNoQyxVQUFNLFFBQVEsdUJBQU8sT0FBTyxJQUFJO0FBQ2hDLFdBQU8sQ0FBQyxRQUFRO0FBQ2QsWUFBTSxNQUFNLE1BQU0sR0FBRztBQUNyQixhQUFPLFFBQVEsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0EsTUFBSSxhQUFhO0FBQ2pCLE1BQUksV0FBVyxvQkFBb0IsQ0FBQyxRQUFRO0FBQzFDLFdBQU8sSUFBSSxRQUFRLFlBQVksQ0FBQyxHQUFHLE1BQU0sSUFBSSxFQUFFLFlBQVksSUFBSSxFQUFFO0FBQUEsRUFDbkUsQ0FBQztBQUNELE1BQUksY0FBYztBQUNsQixNQUFJLFlBQVksb0JBQW9CLENBQUMsUUFBUSxJQUFJLFFBQVEsYUFBYSxLQUFLLEVBQUUsWUFBWSxDQUFDO0FBQzFGLE1BQUksYUFBYSxvQkFBb0IsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLEVBQUUsWUFBWSxJQUFJLElBQUksTUFBTSxDQUFDLENBQUM7QUFDeEYsTUFBSSxlQUFlLG9CQUFvQixDQUFDLFFBQVEsTUFBTSxLQUFLLFdBQVcsR0FBRyxDQUFDLEtBQUssRUFBRTtBQUNqRixNQUFJLGFBQWEsQ0FBQyxPQUFPLGFBQWEsVUFBVSxhQUFhLFVBQVUsU0FBUyxhQUFhO0FBRzdGLE1BQUksWUFBWSxvQkFBSSxRQUFRO0FBQzVCLE1BQUksY0FBYyxDQUFDO0FBQ25CLE1BQUk7QUFDSixNQUFJLGNBQWMsT0FBTyxPQUFPLFlBQVksRUFBRTtBQUM5QyxNQUFJLHNCQUFzQixPQUFPLE9BQU8sb0JBQW9CLEVBQUU7QUFDOUQsV0FBUyxTQUFTLElBQUk7QUFDcEIsV0FBTyxNQUFNLEdBQUcsY0FBYztBQUFBLEVBQ2hDO0FBQ0EsV0FBUyxRQUFRLElBQUksVUFBVSxXQUFXO0FBQ3hDLFFBQUksU0FBUyxFQUFFLEdBQUc7QUFDaEIsV0FBSyxHQUFHO0FBQUEsSUFDVjtBQUNBLFVBQU0sVUFBVSxxQkFBcUIsSUFBSSxPQUFPO0FBQ2hELFFBQUksQ0FBQyxRQUFRLE1BQU07QUFDakIsY0FBUTtBQUFBLElBQ1Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsS0FBSyxTQUFTO0FBQ3JCLFFBQUksUUFBUSxRQUFRO0FBQ2xCLGNBQVEsT0FBTztBQUNmLFVBQUksUUFBUSxRQUFRLFFBQVE7QUFDMUIsZ0JBQVEsUUFBUSxPQUFPO0FBQUEsTUFDekI7QUFDQSxjQUFRLFNBQVM7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLE1BQU07QUFDVixXQUFTLHFCQUFxQixJQUFJLFNBQVM7QUFDekMsVUFBTSxVQUFVLFNBQVMsaUJBQWlCO0FBQ3hDLFVBQUksQ0FBQyxRQUFRLFFBQVE7QUFDbkIsZUFBTyxHQUFHO0FBQUEsTUFDWjtBQUNBLFVBQUksQ0FBQyxZQUFZLFNBQVMsT0FBTyxHQUFHO0FBQ2xDLGdCQUFRLE9BQU87QUFDZixZQUFJO0FBQ0YseUJBQWU7QUFDZixzQkFBWSxLQUFLLE9BQU87QUFDeEIseUJBQWU7QUFDZixpQkFBTyxHQUFHO0FBQUEsUUFDWixVQUFFO0FBQ0Esc0JBQVksSUFBSTtBQUNoQix3QkFBYztBQUNkLHlCQUFlLFlBQVksWUFBWSxTQUFTLENBQUM7QUFBQSxRQUNuRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsWUFBUSxLQUFLO0FBQ2IsWUFBUSxlQUFlLENBQUMsQ0FBQyxRQUFRO0FBQ2pDLFlBQVEsWUFBWTtBQUNwQixZQUFRLFNBQVM7QUFDakIsWUFBUSxNQUFNO0FBQ2QsWUFBUSxPQUFPLENBQUM7QUFDaEIsWUFBUSxVQUFVO0FBQ2xCLFdBQU87QUFBQSxFQUNUO0FBQ0EsV0FBUyxRQUFRLFNBQVM7QUFDeEIsVUFBTSxFQUFDLEtBQUksSUFBSTtBQUNmLFFBQUksS0FBSyxRQUFRO0FBQ2YsZUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsS0FBSztBQUNwQyxhQUFLLENBQUMsRUFBRSxPQUFPLE9BQU87QUFBQSxNQUN4QjtBQUNBLFdBQUssU0FBUztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNBLE1BQUksY0FBYztBQUNsQixNQUFJLGFBQWEsQ0FBQztBQUNsQixXQUFTLGdCQUFnQjtBQUN2QixlQUFXLEtBQUssV0FBVztBQUMzQixrQkFBYztBQUFBLEVBQ2hCO0FBQ0EsV0FBUyxpQkFBaUI7QUFDeEIsZUFBVyxLQUFLLFdBQVc7QUFDM0Isa0JBQWM7QUFBQSxFQUNoQjtBQUNBLFdBQVMsZ0JBQWdCO0FBQ3ZCLFVBQU0sT0FBTyxXQUFXLElBQUk7QUFDNUIsa0JBQWMsU0FBUyxTQUFTLE9BQU87QUFBQSxFQUN6QztBQUNBLFdBQVMsTUFBTSxRQUFRLE1BQU0sS0FBSztBQUNoQyxRQUFJLENBQUMsZUFBZSxpQkFBaUIsUUFBUTtBQUMzQztBQUFBLElBQ0Y7QUFDQSxRQUFJLFVBQVUsVUFBVSxJQUFJLE1BQU07QUFDbEMsUUFBSSxDQUFDLFNBQVM7QUFDWixnQkFBVSxJQUFJLFFBQVEsVUFBVSxvQkFBSSxJQUFJLENBQUM7QUFBQSxJQUMzQztBQUNBLFFBQUksTUFBTSxRQUFRLElBQUksR0FBRztBQUN6QixRQUFJLENBQUMsS0FBSztBQUNSLGNBQVEsSUFBSSxLQUFLLE1BQU0sb0JBQUksSUFBSSxDQUFDO0FBQUEsSUFDbEM7QUFDQSxRQUFJLENBQUMsSUFBSSxJQUFJLFlBQVksR0FBRztBQUMxQixVQUFJLElBQUksWUFBWTtBQUNwQixtQkFBYSxLQUFLLEtBQUssR0FBRztBQUMxQixVQUFJLGFBQWEsUUFBUSxTQUFTO0FBQ2hDLHFCQUFhLFFBQVEsUUFBUTtBQUFBLFVBQzNCLFFBQVE7QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxXQUFTLFFBQVEsUUFBUSxNQUFNLEtBQUssVUFBVSxVQUFVLFdBQVc7QUFDakUsVUFBTSxVQUFVLFVBQVUsSUFBSSxNQUFNO0FBQ3BDLFFBQUksQ0FBQyxTQUFTO0FBQ1o7QUFBQSxJQUNGO0FBQ0EsVUFBTSxVQUFVLG9CQUFJLElBQUk7QUFDeEIsVUFBTSxPQUFPLENBQUMsaUJBQWlCO0FBQzdCLFVBQUksY0FBYztBQUNoQixxQkFBYSxRQUFRLENBQUMsWUFBWTtBQUNoQyxjQUFJLFlBQVksZ0JBQWdCLFFBQVEsY0FBYztBQUNwRCxvQkFBUSxJQUFJLE9BQU87QUFBQSxVQUNyQjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQ0EsUUFBSSxTQUFTLFNBQVM7QUFDcEIsY0FBUSxRQUFRLElBQUk7QUFBQSxJQUN0QixXQUFXLFFBQVEsWUFBWSxRQUFRLE1BQU0sR0FBRztBQUM5QyxjQUFRLFFBQVEsQ0FBQyxLQUFLLFNBQVM7QUFDN0IsWUFBSSxTQUFTLFlBQVksUUFBUSxVQUFVO0FBQ3pDLGVBQUssR0FBRztBQUFBLFFBQ1Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILE9BQU87QUFDTCxVQUFJLFFBQVEsUUFBUTtBQUNsQixhQUFLLFFBQVEsSUFBSSxHQUFHLENBQUM7QUFBQSxNQUN2QjtBQUNBLGNBQVEsTUFBTTtBQUFBLFFBQ1osS0FBSztBQUNILGNBQUksQ0FBQyxRQUFRLE1BQU0sR0FBRztBQUNwQixpQkFBSyxRQUFRLElBQUksV0FBVyxDQUFDO0FBQzdCLGdCQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2pCLG1CQUFLLFFBQVEsSUFBSSxtQkFBbUIsQ0FBQztBQUFBLFlBQ3ZDO0FBQUEsVUFDRixXQUFXLGFBQWEsR0FBRyxHQUFHO0FBQzVCLGlCQUFLLFFBQVEsSUFBSSxRQUFRLENBQUM7QUFBQSxVQUM1QjtBQUNBO0FBQUEsUUFDRixLQUFLO0FBQ0gsY0FBSSxDQUFDLFFBQVEsTUFBTSxHQUFHO0FBQ3BCLGlCQUFLLFFBQVEsSUFBSSxXQUFXLENBQUM7QUFDN0IsZ0JBQUksTUFBTSxNQUFNLEdBQUc7QUFDakIsbUJBQUssUUFBUSxJQUFJLG1CQUFtQixDQUFDO0FBQUEsWUFDdkM7QUFBQSxVQUNGO0FBQ0E7QUFBQSxRQUNGLEtBQUs7QUFDSCxjQUFJLE1BQU0sTUFBTSxHQUFHO0FBQ2pCLGlCQUFLLFFBQVEsSUFBSSxXQUFXLENBQUM7QUFBQSxVQUMvQjtBQUNBO0FBQUEsTUFDSjtBQUFBLElBQ0Y7QUFDQSxVQUFNLE1BQU0sQ0FBQyxZQUFZO0FBQ3ZCLFVBQUksUUFBUSxRQUFRLFdBQVc7QUFDN0IsZ0JBQVEsUUFBUSxVQUFVO0FBQUEsVUFDeEIsUUFBUTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFDQSxVQUFJLFFBQVEsUUFBUSxXQUFXO0FBQzdCLGdCQUFRLFFBQVEsVUFBVSxPQUFPO0FBQUEsTUFDbkMsT0FBTztBQUNMLGdCQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFDQSxZQUFRLFFBQVEsR0FBRztBQUFBLEVBQ3JCO0FBQ0EsTUFBSSxxQkFBcUMsd0JBQVEsNkJBQTZCO0FBQzlFLE1BQUksaUJBQWlCLElBQUksSUFBSSxPQUFPLG9CQUFvQixNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLFFBQVEsQ0FBQztBQUMxRyxNQUFJLE9BQXVCLDZCQUFhO0FBQ3hDLE1BQUksYUFBNkIsNkJBQWEsT0FBTyxJQUFJO0FBQ3pELE1BQUksY0FBOEIsNkJBQWEsSUFBSTtBQUNuRCxNQUFJLHFCQUFxQyw2QkFBYSxNQUFNLElBQUk7QUFDaEUsTUFBSSx3QkFBd0IsQ0FBQztBQUM3QixHQUFDLFlBQVksV0FBVyxhQUFhLEVBQUUsUUFBUSxDQUFDLFFBQVE7QUFDdEQsVUFBTSxTQUFTLE1BQU0sVUFBVSxHQUFHO0FBQ2xDLDBCQUFzQixHQUFHLElBQUksWUFBWSxNQUFNO0FBQzdDLFlBQU0sTUFBTSxNQUFNLElBQUk7QUFDdEIsZUFBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDM0MsY0FBTSxLQUFLLE9BQU8sSUFBSSxFQUFFO0FBQUEsTUFDMUI7QUFDQSxZQUFNLE1BQU0sT0FBTyxNQUFNLEtBQUssSUFBSTtBQUNsQyxVQUFJLFFBQVEsTUFBTSxRQUFRLE9BQU87QUFDL0IsZUFBTyxPQUFPLE1BQU0sS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQUEsTUFDMUMsT0FBTztBQUNMLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNELEdBQUMsUUFBUSxPQUFPLFNBQVMsV0FBVyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7QUFDN0QsVUFBTSxTQUFTLE1BQU0sVUFBVSxHQUFHO0FBQ2xDLDBCQUFzQixHQUFHLElBQUksWUFBWSxNQUFNO0FBQzdDLG9CQUFjO0FBQ2QsWUFBTSxNQUFNLE9BQU8sTUFBTSxNQUFNLElBQUk7QUFDbkMsb0JBQWM7QUFDZCxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0YsQ0FBQztBQUNELFdBQVMsYUFBYSxhQUFhLE9BQU8sVUFBVSxPQUFPO0FBQ3pELFdBQU8sU0FBUyxLQUFLLFFBQVEsS0FBSyxVQUFVO0FBQzFDLFVBQUksUUFBUSxrQkFBa0I7QUFDNUIsZUFBTyxDQUFDO0FBQUEsTUFDVixXQUFXLFFBQVEsa0JBQWtCO0FBQ25DLGVBQU87QUFBQSxNQUNULFdBQVcsUUFBUSxhQUFhLGNBQWMsYUFBYSxVQUFVLHFCQUFxQixjQUFjLFVBQVUscUJBQXFCLGFBQWEsSUFBSSxNQUFNLEdBQUc7QUFDL0osZUFBTztBQUFBLE1BQ1Q7QUFDQSxZQUFNLGdCQUFnQixRQUFRLE1BQU07QUFDcEMsVUFBSSxDQUFDLGNBQWMsaUJBQWlCLE9BQU8sdUJBQXVCLEdBQUcsR0FBRztBQUN0RSxlQUFPLFFBQVEsSUFBSSx1QkFBdUIsS0FBSyxRQUFRO0FBQUEsTUFDekQ7QUFDQSxZQUFNLE1BQU0sUUFBUSxJQUFJLFFBQVEsS0FBSyxRQUFRO0FBQzdDLFVBQUksU0FBUyxHQUFHLElBQUksZUFBZSxJQUFJLEdBQUcsSUFBSSxtQkFBbUIsR0FBRyxHQUFHO0FBQ3JFLGVBQU87QUFBQSxNQUNUO0FBQ0EsVUFBSSxDQUFDLFlBQVk7QUFDZixjQUFNLFFBQVEsT0FBTyxHQUFHO0FBQUEsTUFDMUI7QUFDQSxVQUFJLFNBQVM7QUFDWCxlQUFPO0FBQUEsTUFDVDtBQUNBLFVBQUksTUFBTSxHQUFHLEdBQUc7QUFDZCxjQUFNLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEdBQUc7QUFDeEQsZUFBTyxlQUFlLElBQUksUUFBUTtBQUFBLE1BQ3BDO0FBQ0EsVUFBSSxTQUFTLEdBQUcsR0FBRztBQUNqQixlQUFPLGFBQWEsU0FBUyxHQUFHLElBQUksVUFBVSxHQUFHO0FBQUEsTUFDbkQ7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDQSxNQUFJLE9BQXVCLDZCQUFhO0FBQ3hDLE1BQUksYUFBNkIsNkJBQWEsSUFBSTtBQUNsRCxXQUFTLGFBQWEsVUFBVSxPQUFPO0FBQ3JDLFdBQU8sU0FBUyxLQUFLLFFBQVEsS0FBSyxPQUFPLFVBQVU7QUFDakQsVUFBSSxXQUFXLE9BQU8sR0FBRztBQUN6QixVQUFJLENBQUMsU0FBUztBQUNaLGdCQUFRLE1BQU0sS0FBSztBQUNuQixtQkFBVyxNQUFNLFFBQVE7QUFDekIsWUFBSSxDQUFDLFFBQVEsTUFBTSxLQUFLLE1BQU0sUUFBUSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUc7QUFDeEQsbUJBQVMsUUFBUTtBQUNqQixpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQ0EsWUFBTSxTQUFTLFFBQVEsTUFBTSxLQUFLLGFBQWEsR0FBRyxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sU0FBUyxPQUFPLFFBQVEsR0FBRztBQUN0RyxZQUFNLFNBQVMsUUFBUSxJQUFJLFFBQVEsS0FBSyxPQUFPLFFBQVE7QUFDdkQsVUFBSSxXQUFXLE1BQU0sUUFBUSxHQUFHO0FBQzlCLFlBQUksQ0FBQyxRQUFRO0FBQ1gsa0JBQVEsUUFBUSxPQUFPLEtBQUssS0FBSztBQUFBLFFBQ25DLFdBQVcsV0FBVyxPQUFPLFFBQVEsR0FBRztBQUN0QyxrQkFBUSxRQUFRLE9BQU8sS0FBSyxPQUFPLFFBQVE7QUFBQSxRQUM3QztBQUFBLE1BQ0Y7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDQSxXQUFTLGVBQWUsUUFBUSxLQUFLO0FBQ25DLFVBQU0sU0FBUyxPQUFPLFFBQVEsR0FBRztBQUNqQyxVQUFNLFdBQVcsT0FBTyxHQUFHO0FBQzNCLFVBQU0sU0FBUyxRQUFRLGVBQWUsUUFBUSxHQUFHO0FBQ2pELFFBQUksVUFBVSxRQUFRO0FBQ3BCLGNBQVEsUUFBUSxVQUFVLEtBQUssUUFBUSxRQUFRO0FBQUEsSUFDakQ7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsSUFBSSxRQUFRLEtBQUs7QUFDeEIsVUFBTSxTQUFTLFFBQVEsSUFBSSxRQUFRLEdBQUc7QUFDdEMsUUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsZUFBZSxJQUFJLEdBQUcsR0FBRztBQUM5QyxZQUFNLFFBQVEsT0FBTyxHQUFHO0FBQUEsSUFDMUI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsUUFBUSxRQUFRO0FBQ3ZCLFVBQU0sUUFBUSxXQUFXLFFBQVEsTUFBTSxJQUFJLFdBQVcsV0FBVztBQUNqRSxXQUFPLFFBQVEsUUFBUSxNQUFNO0FBQUEsRUFDL0I7QUFDQSxNQUFJLGtCQUFrQjtBQUFBLElBQ3BCLEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0EsTUFBSSxtQkFBbUI7QUFBQSxJQUNyQixLQUFLO0FBQUEsSUFDTCxJQUFJLFFBQVEsS0FBSztBQUNmLFVBQUksTUFBTTtBQUNSLGdCQUFRLEtBQUsseUJBQXlCLE9BQU8sR0FBRyxDQUFDLGlDQUFpQyxNQUFNO0FBQUEsTUFDMUY7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsZUFBZSxRQUFRLEtBQUs7QUFDMUIsVUFBSSxNQUFNO0FBQ1IsZ0JBQVEsS0FBSyw0QkFBNEIsT0FBTyxHQUFHLENBQUMsaUNBQWlDLE1BQU07QUFBQSxNQUM3RjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNBLE1BQUksMEJBQTBCLE9BQU8sQ0FBQyxHQUFHLGlCQUFpQjtBQUFBLElBQ3hELEtBQUs7QUFBQSxJQUNMLEtBQUs7QUFBQSxFQUNQLENBQUM7QUFDRCxNQUFJLDBCQUEwQixPQUFPLENBQUMsR0FBRyxrQkFBa0I7QUFBQSxJQUN6RCxLQUFLO0FBQUEsRUFDUCxDQUFDO0FBQ0QsTUFBSSxhQUFhLENBQUMsVUFBVSxTQUFTLEtBQUssSUFBSSxVQUFVLEtBQUssSUFBSTtBQUNqRSxNQUFJLGFBQWEsQ0FBQyxVQUFVLFNBQVMsS0FBSyxJQUFJLFNBQVMsS0FBSyxJQUFJO0FBQ2hFLE1BQUksWUFBWSxDQUFDLFVBQVU7QUFDM0IsTUFBSSxXQUFXLENBQUMsTUFBTSxRQUFRLGVBQWUsQ0FBQztBQUM5QyxXQUFTLE1BQU0sUUFBUSxLQUFLLGFBQWEsT0FBTyxZQUFZLE9BQU87QUFDakUsYUFBUyxPQUFPLFNBQVM7QUFDekIsVUFBTSxZQUFZLE1BQU0sTUFBTTtBQUM5QixVQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3hCLFFBQUksUUFBUSxRQUFRO0FBQ2xCLE9BQUMsY0FBYyxNQUFNLFdBQVcsT0FBTyxHQUFHO0FBQUEsSUFDNUM7QUFDQSxLQUFDLGNBQWMsTUFBTSxXQUFXLE9BQU8sTUFBTTtBQUM3QyxVQUFNLEVBQUMsS0FBSyxLQUFJLElBQUksU0FBUyxTQUFTO0FBQ3RDLFVBQU0sT0FBTyxZQUFZLFlBQVksYUFBYSxhQUFhO0FBQy9ELFFBQUksS0FBSyxLQUFLLFdBQVcsR0FBRyxHQUFHO0FBQzdCLGFBQU8sS0FBSyxPQUFPLElBQUksR0FBRyxDQUFDO0FBQUEsSUFDN0IsV0FBVyxLQUFLLEtBQUssV0FBVyxNQUFNLEdBQUc7QUFDdkMsYUFBTyxLQUFLLE9BQU8sSUFBSSxNQUFNLENBQUM7QUFBQSxJQUNoQyxXQUFXLFdBQVcsV0FBVztBQUMvQixhQUFPLElBQUksR0FBRztBQUFBLElBQ2hCO0FBQUEsRUFDRjtBQUNBLFdBQVMsTUFBTSxLQUFLLGFBQWEsT0FBTztBQUN0QyxVQUFNLFNBQVMsS0FBSyxTQUFTO0FBQzdCLFVBQU0sWUFBWSxNQUFNLE1BQU07QUFDOUIsVUFBTSxTQUFTLE1BQU0sR0FBRztBQUN4QixRQUFJLFFBQVEsUUFBUTtBQUNsQixPQUFDLGNBQWMsTUFBTSxXQUFXLE9BQU8sR0FBRztBQUFBLElBQzVDO0FBQ0EsS0FBQyxjQUFjLE1BQU0sV0FBVyxPQUFPLE1BQU07QUFDN0MsV0FBTyxRQUFRLFNBQVMsT0FBTyxJQUFJLEdBQUcsSUFBSSxPQUFPLElBQUksR0FBRyxLQUFLLE9BQU8sSUFBSSxNQUFNO0FBQUEsRUFDaEY7QUFDQSxXQUFTLEtBQUssUUFBUSxhQUFhLE9BQU87QUFDeEMsYUFBUyxPQUFPLFNBQVM7QUFDekIsS0FBQyxjQUFjLE1BQU0sTUFBTSxNQUFNLEdBQUcsV0FBVyxXQUFXO0FBQzFELFdBQU8sUUFBUSxJQUFJLFFBQVEsUUFBUSxNQUFNO0FBQUEsRUFDM0M7QUFDQSxXQUFTLElBQUksT0FBTztBQUNsQixZQUFRLE1BQU0sS0FBSztBQUNuQixVQUFNLFNBQVMsTUFBTSxJQUFJO0FBQ3pCLFVBQU0sUUFBUSxTQUFTLE1BQU07QUFDN0IsVUFBTSxTQUFTLE1BQU0sSUFBSSxLQUFLLFFBQVEsS0FBSztBQUMzQyxRQUFJLENBQUMsUUFBUTtBQUNYLGFBQU8sSUFBSSxLQUFLO0FBQ2hCLGNBQVEsUUFBUSxPQUFPLE9BQU8sS0FBSztBQUFBLElBQ3JDO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFDQSxXQUFTLE1BQU0sS0FBSyxPQUFPO0FBQ3pCLFlBQVEsTUFBTSxLQUFLO0FBQ25CLFVBQU0sU0FBUyxNQUFNLElBQUk7QUFDekIsVUFBTSxFQUFDLEtBQUssTUFBTSxLQUFLLEtBQUksSUFBSSxTQUFTLE1BQU07QUFDOUMsUUFBSSxTQUFTLEtBQUssS0FBSyxRQUFRLEdBQUc7QUFDbEMsUUFBSSxDQUFDLFFBQVE7QUFDWCxZQUFNLE1BQU0sR0FBRztBQUNmLGVBQVMsS0FBSyxLQUFLLFFBQVEsR0FBRztBQUFBLElBQ2hDLFdBQVcsTUFBTTtBQUNmLHdCQUFrQixRQUFRLE1BQU0sR0FBRztBQUFBLElBQ3JDO0FBQ0EsVUFBTSxXQUFXLEtBQUssS0FBSyxRQUFRLEdBQUc7QUFDdEMsV0FBTyxJQUFJLEtBQUssS0FBSztBQUNyQixRQUFJLENBQUMsUUFBUTtBQUNYLGNBQVEsUUFBUSxPQUFPLEtBQUssS0FBSztBQUFBLElBQ25DLFdBQVcsV0FBVyxPQUFPLFFBQVEsR0FBRztBQUN0QyxjQUFRLFFBQVEsT0FBTyxLQUFLLE9BQU8sUUFBUTtBQUFBLElBQzdDO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFDQSxXQUFTLFlBQVksS0FBSztBQUN4QixVQUFNLFNBQVMsTUFBTSxJQUFJO0FBQ3pCLFVBQU0sRUFBQyxLQUFLLE1BQU0sS0FBSyxLQUFJLElBQUksU0FBUyxNQUFNO0FBQzlDLFFBQUksU0FBUyxLQUFLLEtBQUssUUFBUSxHQUFHO0FBQ2xDLFFBQUksQ0FBQyxRQUFRO0FBQ1gsWUFBTSxNQUFNLEdBQUc7QUFDZixlQUFTLEtBQUssS0FBSyxRQUFRLEdBQUc7QUFBQSxJQUNoQyxXQUFXLE1BQU07QUFDZix3QkFBa0IsUUFBUSxNQUFNLEdBQUc7QUFBQSxJQUNyQztBQUNBLFVBQU0sV0FBVyxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsSUFBSTtBQUNqRCxVQUFNLFNBQVMsT0FBTyxPQUFPLEdBQUc7QUFDaEMsUUFBSSxRQUFRO0FBQ1YsY0FBUSxRQUFRLFVBQVUsS0FBSyxRQUFRLFFBQVE7QUFBQSxJQUNqRDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQ0EsV0FBUyxRQUFRO0FBQ2YsVUFBTSxTQUFTLE1BQU0sSUFBSTtBQUN6QixVQUFNLFdBQVcsT0FBTyxTQUFTO0FBQ2pDLFVBQU0sWUFBWSxPQUFPLE1BQU0sTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sSUFBSTtBQUM3RSxVQUFNLFNBQVMsT0FBTyxNQUFNO0FBQzVCLFFBQUksVUFBVTtBQUNaLGNBQVEsUUFBUSxTQUFTLFFBQVEsUUFBUSxTQUFTO0FBQUEsSUFDcEQ7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsY0FBYyxZQUFZLFdBQVc7QUFDNUMsV0FBTyxTQUFTLFFBQVEsVUFBVSxTQUFTO0FBQ3pDLFlBQU0sV0FBVztBQUNqQixZQUFNLFNBQVMsU0FBUyxTQUFTO0FBQ2pDLFlBQU0sWUFBWSxNQUFNLE1BQU07QUFDOUIsWUFBTSxPQUFPLFlBQVksWUFBWSxhQUFhLGFBQWE7QUFDL0QsT0FBQyxjQUFjLE1BQU0sV0FBVyxXQUFXLFdBQVc7QUFDdEQsYUFBTyxPQUFPLFFBQVEsQ0FBQyxPQUFPLFFBQVE7QUFDcEMsZUFBTyxTQUFTLEtBQUssU0FBUyxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxRQUFRO0FBQUEsTUFDaEUsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0EsV0FBUyxxQkFBcUIsUUFBUSxZQUFZLFdBQVc7QUFDM0QsV0FBTyxZQUFZLE1BQU07QUFDdkIsWUFBTSxTQUFTLEtBQUssU0FBUztBQUM3QixZQUFNLFlBQVksTUFBTSxNQUFNO0FBQzlCLFlBQU0sY0FBYyxNQUFNLFNBQVM7QUFDbkMsWUFBTSxTQUFTLFdBQVcsYUFBYSxXQUFXLE9BQU8sWUFBWTtBQUNyRSxZQUFNLFlBQVksV0FBVyxVQUFVO0FBQ3ZDLFlBQU0sZ0JBQWdCLE9BQU8sTUFBTSxFQUFFLEdBQUcsSUFBSTtBQUM1QyxZQUFNLE9BQU8sWUFBWSxZQUFZLGFBQWEsYUFBYTtBQUMvRCxPQUFDLGNBQWMsTUFBTSxXQUFXLFdBQVcsWUFBWSxzQkFBc0IsV0FBVztBQUN4RixhQUFPO0FBQUEsUUFDTCxPQUFPO0FBQ0wsZ0JBQU0sRUFBQyxPQUFPLEtBQUksSUFBSSxjQUFjLEtBQUs7QUFDekMsaUJBQU8sT0FBTyxFQUFDLE9BQU8sS0FBSSxJQUFJO0FBQUEsWUFDNUIsT0FBTyxTQUFTLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSztBQUFBLFlBQzdEO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLENBQUMsT0FBTyxRQUFRLElBQUk7QUFDbEIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsV0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxXQUFPLFlBQVksTUFBTTtBQUN2QixVQUFJLE1BQU07QUFDUixjQUFNLE1BQU0sS0FBSyxDQUFDLElBQUksV0FBVyxLQUFLLENBQUMsQ0FBQyxPQUFPO0FBQy9DLGdCQUFRLEtBQUssR0FBRyxXQUFXLElBQUksQ0FBQyxjQUFjLEdBQUcsK0JBQStCLE1BQU0sSUFBSSxDQUFDO0FBQUEsTUFDN0Y7QUFDQSxhQUFPLFNBQVMsV0FBVyxRQUFRO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQ0EsTUFBSSwwQkFBMEI7QUFBQSxJQUM1QixJQUFJLEtBQUs7QUFDUCxhQUFPLE1BQU0sTUFBTSxHQUFHO0FBQUEsSUFDeEI7QUFBQSxJQUNBLElBQUksT0FBTztBQUNULGFBQU8sS0FBSyxJQUFJO0FBQUEsSUFDbEI7QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMO0FBQUEsSUFDQSxLQUFLO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0EsU0FBUyxjQUFjLE9BQU8sS0FBSztBQUFBLEVBQ3JDO0FBQ0EsTUFBSSwwQkFBMEI7QUFBQSxJQUM1QixJQUFJLEtBQUs7QUFDUCxhQUFPLE1BQU0sTUFBTSxLQUFLLE9BQU8sSUFBSTtBQUFBLElBQ3JDO0FBQUEsSUFDQSxJQUFJLE9BQU87QUFDVCxhQUFPLEtBQUssSUFBSTtBQUFBLElBQ2xCO0FBQUEsSUFDQSxLQUFLO0FBQUEsSUFDTDtBQUFBLElBQ0EsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1I7QUFBQSxJQUNBLFNBQVMsY0FBYyxPQUFPLElBQUk7QUFBQSxFQUNwQztBQUNBLE1BQUksMkJBQTJCO0FBQUEsSUFDN0IsSUFBSSxLQUFLO0FBQ1AsYUFBTyxNQUFNLE1BQU0sS0FBSyxJQUFJO0FBQUEsSUFDOUI7QUFBQSxJQUNBLElBQUksT0FBTztBQUNULGFBQU8sS0FBSyxNQUFNLElBQUk7QUFBQSxJQUN4QjtBQUFBLElBQ0EsSUFBSSxLQUFLO0FBQ1AsYUFBTyxNQUFNLEtBQUssTUFBTSxLQUFLLElBQUk7QUFBQSxJQUNuQztBQUFBLElBQ0EsS0FBSyxxQkFBcUIsS0FBSztBQUFBLElBQy9CLEtBQUsscUJBQXFCLEtBQUs7QUFBQSxJQUMvQixRQUFRLHFCQUFxQixRQUFRO0FBQUEsSUFDckMsT0FBTyxxQkFBcUIsT0FBTztBQUFBLElBQ25DLFNBQVMsY0FBYyxNQUFNLEtBQUs7QUFBQSxFQUNwQztBQUNBLE1BQUksa0NBQWtDO0FBQUEsSUFDcEMsSUFBSSxLQUFLO0FBQ1AsYUFBTyxNQUFNLE1BQU0sS0FBSyxNQUFNLElBQUk7QUFBQSxJQUNwQztBQUFBLElBQ0EsSUFBSSxPQUFPO0FBQ1QsYUFBTyxLQUFLLE1BQU0sSUFBSTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxJQUFJLEtBQUs7QUFDUCxhQUFPLE1BQU0sS0FBSyxNQUFNLEtBQUssSUFBSTtBQUFBLElBQ25DO0FBQUEsSUFDQSxLQUFLLHFCQUFxQixLQUFLO0FBQUEsSUFDL0IsS0FBSyxxQkFBcUIsS0FBSztBQUFBLElBQy9CLFFBQVEscUJBQXFCLFFBQVE7QUFBQSxJQUNyQyxPQUFPLHFCQUFxQixPQUFPO0FBQUEsSUFDbkMsU0FBUyxjQUFjLE1BQU0sSUFBSTtBQUFBLEVBQ25DO0FBQ0EsTUFBSSxrQkFBa0IsQ0FBQyxRQUFRLFVBQVUsV0FBVyxPQUFPLFFBQVE7QUFDbkUsa0JBQWdCLFFBQVEsQ0FBQyxXQUFXO0FBQ2xDLDRCQUF3QixNQUFNLElBQUkscUJBQXFCLFFBQVEsT0FBTyxLQUFLO0FBQzNFLDZCQUF5QixNQUFNLElBQUkscUJBQXFCLFFBQVEsTUFBTSxLQUFLO0FBQzNFLDRCQUF3QixNQUFNLElBQUkscUJBQXFCLFFBQVEsT0FBTyxJQUFJO0FBQzFFLG9DQUFnQyxNQUFNLElBQUkscUJBQXFCLFFBQVEsTUFBTSxJQUFJO0FBQUEsRUFDbkYsQ0FBQztBQUNELFdBQVMsNEJBQTRCLFlBQVksU0FBUztBQUN4RCxVQUFNLG1CQUFtQixVQUFVLGFBQWEsa0NBQWtDLDBCQUEwQixhQUFhLDJCQUEyQjtBQUNwSixXQUFPLENBQUMsUUFBUSxLQUFLLGFBQWE7QUFDaEMsVUFBSSxRQUFRLGtCQUFrQjtBQUM1QixlQUFPLENBQUM7QUFBQSxNQUNWLFdBQVcsUUFBUSxrQkFBa0I7QUFDbkMsZUFBTztBQUFBLE1BQ1QsV0FBVyxRQUFRLFdBQVc7QUFDNUIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPLFFBQVEsSUFBSSxPQUFPLGtCQUFrQixHQUFHLEtBQUssT0FBTyxTQUFTLG1CQUFtQixRQUFRLEtBQUssUUFBUTtBQUFBLElBQzlHO0FBQUEsRUFDRjtBQUNBLE1BQUksNEJBQTRCO0FBQUEsSUFDOUIsS0FBSyw0QkFBNEIsT0FBTyxLQUFLO0FBQUEsRUFDL0M7QUFDQSxNQUFJLDRCQUE0QjtBQUFBLElBQzlCLEtBQUssNEJBQTRCLE9BQU8sSUFBSTtBQUFBLEVBQzlDO0FBQ0EsTUFBSSw2QkFBNkI7QUFBQSxJQUMvQixLQUFLLDRCQUE0QixNQUFNLEtBQUs7QUFBQSxFQUM5QztBQUNBLE1BQUksb0NBQW9DO0FBQUEsSUFDdEMsS0FBSyw0QkFBNEIsTUFBTSxJQUFJO0FBQUEsRUFDN0M7QUFDQSxXQUFTLGtCQUFrQixRQUFRLE1BQU0sS0FBSztBQUM1QyxVQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3hCLFFBQUksV0FBVyxPQUFPLEtBQUssS0FBSyxRQUFRLE1BQU0sR0FBRztBQUMvQyxZQUFNLE9BQU8sVUFBVSxNQUFNO0FBQzdCLGNBQVEsS0FBSyxZQUFZLElBQUksa0VBQWtFLFNBQVMsUUFBUSxhQUFhLEVBQUUsOEpBQThKO0FBQUEsSUFDL1I7QUFBQSxFQUNGO0FBQ0EsTUFBSSxjQUFjLG9CQUFJLFFBQVE7QUFDOUIsTUFBSSxxQkFBcUIsb0JBQUksUUFBUTtBQUNyQyxNQUFJLGNBQWMsb0JBQUksUUFBUTtBQUM5QixNQUFJLHFCQUFxQixvQkFBSSxRQUFRO0FBQ3JDLFdBQVMsY0FBYyxTQUFTO0FBQzlCLFlBQVEsU0FBUztBQUFBLE1BQ2YsS0FBSztBQUFBLE1BQ0wsS0FBSztBQUNILGVBQU87QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLEtBQUs7QUFDSCxlQUFPO0FBQUEsTUFDVDtBQUNFLGVBQU87QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUNBLFdBQVMsY0FBYyxPQUFPO0FBQzVCLFdBQU8sTUFBTSxVQUFVLEtBQUssQ0FBQyxPQUFPLGFBQWEsS0FBSyxJQUFJLElBQUksY0FBYyxVQUFVLEtBQUssQ0FBQztBQUFBLEVBQzlGO0FBQ0EsV0FBUyxVQUFVLFFBQVE7QUFDekIsUUFBSSxVQUFVLE9BQU8sZ0JBQWdCLEdBQUc7QUFDdEMsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPLHFCQUFxQixRQUFRLE9BQU8saUJBQWlCLDJCQUEyQixXQUFXO0FBQUEsRUFDcEc7QUFDQSxXQUFTLFNBQVMsUUFBUTtBQUN4QixXQUFPLHFCQUFxQixRQUFRLE1BQU0sa0JBQWtCLDRCQUE0QixXQUFXO0FBQUEsRUFDckc7QUFDQSxXQUFTLHFCQUFxQixRQUFRLFlBQVksY0FBYyxvQkFBb0IsVUFBVTtBQUM1RixRQUFJLENBQUMsU0FBUyxNQUFNLEdBQUc7QUFDckIsVUFBSSxNQUFNO0FBQ1IsZ0JBQVEsS0FBSyxrQ0FBa0MsT0FBTyxNQUFNLENBQUMsRUFBRTtBQUFBLE1BQ2pFO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLE9BQU8sU0FBUyxLQUFLLEVBQUUsY0FBYyxPQUFPLGdCQUFnQixJQUFJO0FBQ2xFLGFBQU87QUFBQSxJQUNUO0FBQ0EsVUFBTSxnQkFBZ0IsU0FBUyxJQUFJLE1BQU07QUFDekMsUUFBSSxlQUFlO0FBQ2pCLGFBQU87QUFBQSxJQUNUO0FBQ0EsVUFBTSxhQUFhLGNBQWMsTUFBTTtBQUN2QyxRQUFJLGVBQWUsR0FBRztBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUNBLFVBQU0sUUFBUSxJQUFJLE1BQU0sUUFBUSxlQUFlLElBQUkscUJBQXFCLFlBQVk7QUFDcEYsYUFBUyxJQUFJLFFBQVEsS0FBSztBQUMxQixXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsTUFBTSxVQUFVO0FBQ3ZCLFdBQU8sWUFBWSxNQUFNLFNBQVMsU0FBUyxDQUFDLEtBQUs7QUFBQSxFQUNuRDtBQUNBLFdBQVMsTUFBTSxHQUFHO0FBQ2hCLFdBQU8sUUFBUSxLQUFLLEVBQUUsY0FBYyxJQUFJO0FBQUEsRUFDMUM7QUFHQSxRQUFNLFlBQVksTUFBTSxRQUFRO0FBR2hDLFFBQU0sWUFBWSxDQUFDLE9BQU8sU0FBUyxLQUFLLFVBQVUsRUFBRSxDQUFDO0FBR3JELFFBQU0sU0FBUyxDQUFDLElBQUksRUFBQyxlQUFlLGdCQUFnQixRQUFRLFFBQU8sTUFBTSxDQUFDLEtBQUssYUFBYTtBQUMxRixRQUFJLFlBQVksZUFBZSxHQUFHO0FBQ2xDLFFBQUksWUFBWTtBQUNoQixRQUFJO0FBQ0osUUFBSSxrQkFBa0IsUUFBUSxNQUFNLFVBQVUsQ0FBQyxVQUFVO0FBQ3ZELFdBQUssVUFBVSxLQUFLO0FBQ3BCLFVBQUksQ0FBQyxXQUFXO0FBQ2QsdUJBQWUsTUFBTTtBQUNuQixtQkFBUyxPQUFPLFFBQVE7QUFDeEIscUJBQVc7QUFBQSxRQUNiLENBQUM7QUFBQSxNQUNILE9BQU87QUFDTCxtQkFBVztBQUFBLE1BQ2I7QUFDQSxrQkFBWTtBQUFBLElBQ2QsQ0FBQyxDQUFDO0FBQ0YsT0FBRyxXQUFXLE9BQU8sZUFBZTtBQUFBLEVBQ3RDLENBQUM7QUFHRCxRQUFNLFNBQVMsU0FBUztBQUd4QixRQUFNLFFBQVEsQ0FBQyxPQUFPLE1BQU0sRUFBRSxDQUFDO0FBRy9CLFFBQU0sUUFBUSxDQUFDLE9BQU8sWUFBWSxFQUFFLENBQUM7QUFHckMsUUFBTSxRQUFRLENBQUMsT0FBTztBQUNwQixRQUFJLEdBQUc7QUFDTCxhQUFPLEdBQUc7QUFDWixPQUFHLGdCQUFnQixhQUFhLG9CQUFvQixFQUFFLENBQUM7QUFDdkQsV0FBTyxHQUFHO0FBQUEsRUFDWixDQUFDO0FBQ0QsV0FBUyxvQkFBb0IsSUFBSTtBQUMvQixRQUFJLGFBQWEsQ0FBQztBQUNsQixRQUFJLFlBQVk7QUFDaEIsV0FBTyxXQUFXO0FBQ2hCLFVBQUksVUFBVTtBQUNaLG1CQUFXLEtBQUssVUFBVSxPQUFPO0FBQ25DLGtCQUFZLFVBQVU7QUFBQSxJQUN4QjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBR0EsTUFBSSxlQUFlLENBQUM7QUFDcEIsV0FBUyxtQkFBbUIsTUFBTTtBQUNoQyxRQUFJLENBQUMsYUFBYSxJQUFJO0FBQ3BCLG1CQUFhLElBQUksSUFBSTtBQUN2QixXQUFPLEVBQUUsYUFBYSxJQUFJO0FBQUEsRUFDNUI7QUFDQSxXQUFTLGNBQWMsSUFBSSxNQUFNO0FBQy9CLFdBQU8sWUFBWSxJQUFJLENBQUMsWUFBWTtBQUNsQyxVQUFJLFFBQVEsVUFBVSxRQUFRLE9BQU8sSUFBSTtBQUN2QyxlQUFPO0FBQUEsSUFDWCxDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsVUFBVSxJQUFJLE1BQU07QUFDM0IsUUFBSSxDQUFDLEdBQUc7QUFDTixTQUFHLFNBQVMsQ0FBQztBQUNmLFFBQUksQ0FBQyxHQUFHLE9BQU8sSUFBSTtBQUNqQixTQUFHLE9BQU8sSUFBSSxJQUFJLG1CQUFtQixJQUFJO0FBQUEsRUFDN0M7QUFHQSxRQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxNQUFNLFNBQVM7QUFDeEMsUUFBSSxPQUFPLGNBQWMsSUFBSSxJQUFJO0FBQ2pDLFFBQUksS0FBSyxPQUFPLEtBQUssT0FBTyxJQUFJLElBQUksbUJBQW1CLElBQUk7QUFDM0QsV0FBTyxNQUFNLEdBQUcsSUFBSSxJQUFJLEVBQUUsSUFBSSxHQUFHLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLEVBQ3JELENBQUM7QUFHRCxRQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFHdEIseUJBQXVCLFNBQVMsU0FBUyxPQUFPO0FBQ2hELHlCQUF1QixXQUFXLFdBQVcsU0FBUztBQUN0RCxXQUFTLHVCQUF1QixNQUFNLFdBQVcsTUFBTTtBQUNyRCxVQUFNLFdBQVcsQ0FBQyxPQUFPLEtBQUssbUJBQW1CLGFBQWEsbUNBQW1DLElBQUksK0NBQStDLElBQUksSUFBSSxFQUFFLENBQUM7QUFBQSxFQUNqSztBQUdBLFlBQVUsYUFBYSxDQUFDLElBQUksRUFBQyxXQUFVLEdBQUcsRUFBQyxRQUFRLFNBQVMsZUFBZSxlQUFjLE1BQU07QUFDN0YsUUFBSSxPQUFPLGVBQWUsVUFBVTtBQUNwQyxRQUFJLFdBQVcsTUFBTTtBQUNuQixVQUFJO0FBQ0osV0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3RCLGFBQU87QUFBQSxJQUNUO0FBQ0EsUUFBSSxtQkFBbUIsZUFBZSxHQUFHLFVBQVUsa0JBQWtCO0FBQ3JFLFFBQUksV0FBVyxDQUFDLFFBQVEsaUJBQWlCLE1BQU07QUFBQSxJQUMvQyxHQUFHLEVBQUMsT0FBTyxFQUFDLGVBQWUsSUFBRyxFQUFDLENBQUM7QUFDaEMsUUFBSSxlQUFlLFNBQVM7QUFDNUIsYUFBUyxZQUFZO0FBQ3JCLG1CQUFlLE1BQU07QUFDbkIsVUFBSSxDQUFDLEdBQUc7QUFDTjtBQUNGLFNBQUcsd0JBQXdCLFNBQVMsRUFBRTtBQUN0QyxVQUFJLFdBQVcsR0FBRyxTQUFTO0FBQzNCLFVBQUksV0FBVyxHQUFHLFNBQVM7QUFDM0IsY0FBUSxNQUFNLFNBQVMsU0FBUyxDQUFDLENBQUM7QUFDbEMsY0FBUSxNQUFNLFNBQVMsU0FBUyxDQUFDLENBQUM7QUFBQSxJQUNwQyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBR0QsWUFBVSxZQUFZLENBQUMsSUFBSSxFQUFDLFdBQVUsR0FBRyxFQUFDLFNBQVMsU0FBUSxNQUFNO0FBQy9ELFFBQUksR0FBRyxRQUFRLFlBQVksTUFBTTtBQUMvQixXQUFLLG1EQUFtRCxFQUFFO0FBQzVELFFBQUksU0FBUyxTQUFTLGNBQWMsVUFBVTtBQUM5QyxRQUFJLENBQUM7QUFDSCxXQUFLLGlEQUFpRCxVQUFVLEdBQUc7QUFDckUsUUFBSSxTQUFTLEdBQUcsUUFBUSxVQUFVLElBQUksRUFBRTtBQUN4QyxPQUFHLGNBQWM7QUFDakIsV0FBTyxrQkFBa0I7QUFDekIsUUFBSSxHQUFHLGtCQUFrQjtBQUN2QixTQUFHLGlCQUFpQixRQUFRLENBQUMsY0FBYztBQUN6QyxlQUFPLGlCQUFpQixXQUFXLENBQUMsTUFBTTtBQUN4QyxZQUFFLGdCQUFnQjtBQUNsQixhQUFHLGNBQWMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUFBLFFBQy9DLENBQUM7QUFBQSxNQUNILENBQUM7QUFBQSxJQUNIO0FBQ0EsbUJBQWUsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUM3QixjQUFVLE1BQU07QUFDZCxhQUFPLFlBQVksTUFBTTtBQUN6QixlQUFTLE1BQU07QUFDZixhQUFPLFlBQVk7QUFBQSxJQUNyQixDQUFDO0FBQ0QsYUFBUyxNQUFNLE9BQU8sT0FBTyxDQUFDO0FBQUEsRUFDaEMsQ0FBQztBQUdELE1BQUksVUFBVSxNQUFNO0FBQUEsRUFDcEI7QUFDQSxVQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUMsVUFBUyxHQUFHLEVBQUMsU0FBUyxTQUFRLE1BQU07QUFDekQsY0FBVSxTQUFTLE1BQU0sSUFBSSxHQUFHLGdCQUFnQixPQUFPLEdBQUcsWUFBWTtBQUN0RSxhQUFTLE1BQU07QUFDYixnQkFBVSxTQUFTLE1BQU0sSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLE9BQU8sR0FBRztBQUFBLElBQ25FLENBQUM7QUFBQSxFQUNIO0FBQ0EsWUFBVSxVQUFVLE9BQU87QUFHM0IsWUFBVSxVQUFVLENBQUMsSUFBSSxFQUFDLFdBQVUsR0FBRyxFQUFDLFFBQVEsUUFBTyxNQUFNLFFBQVEsY0FBYyxJQUFJLFVBQVUsQ0FBQyxDQUFDO0FBR25HLFdBQVMsR0FBRyxJQUFJLE9BQU8sV0FBVyxVQUFVO0FBQzFDLFFBQUksaUJBQWlCO0FBQ3JCLFFBQUksV0FBVyxDQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLFFBQUksVUFBVSxDQUFDO0FBQ2YsUUFBSSxjQUFjLENBQUMsV0FBVyxZQUFZLENBQUMsTUFBTSxRQUFRLFdBQVcsQ0FBQztBQUNyRSxRQUFJLFVBQVUsU0FBUyxLQUFLO0FBQzFCLGNBQVEsVUFBVSxLQUFLO0FBQ3pCLFFBQUksVUFBVSxTQUFTLE9BQU87QUFDNUIsY0FBUSxXQUFXLEtBQUs7QUFDMUIsUUFBSSxVQUFVLFNBQVMsU0FBUztBQUM5QixjQUFRLFVBQVU7QUFDcEIsUUFBSSxVQUFVLFNBQVMsU0FBUztBQUM5QixjQUFRLFVBQVU7QUFDcEIsUUFBSSxVQUFVLFNBQVMsUUFBUTtBQUM3Qix1QkFBaUI7QUFDbkIsUUFBSSxVQUFVLFNBQVMsVUFBVTtBQUMvQix1QkFBaUI7QUFDbkIsUUFBSSxVQUFVLFNBQVMsU0FBUztBQUM5QixpQkFBVyxZQUFZLFVBQVUsQ0FBQyxNQUFNLE1BQU07QUFDNUMsVUFBRSxlQUFlO0FBQ2pCLGFBQUssQ0FBQztBQUFBLE1BQ1IsQ0FBQztBQUNILFFBQUksVUFBVSxTQUFTLE1BQU07QUFDM0IsaUJBQVcsWUFBWSxVQUFVLENBQUMsTUFBTSxNQUFNO0FBQzVDLFVBQUUsZ0JBQWdCO0FBQ2xCLGFBQUssQ0FBQztBQUFBLE1BQ1IsQ0FBQztBQUNILFFBQUksVUFBVSxTQUFTLE1BQU07QUFDM0IsaUJBQVcsWUFBWSxVQUFVLENBQUMsTUFBTSxNQUFNO0FBQzVDLFVBQUUsV0FBVyxNQUFNLEtBQUssQ0FBQztBQUFBLE1BQzNCLENBQUM7QUFDSCxRQUFJLFVBQVUsU0FBUyxNQUFNLEtBQUssVUFBVSxTQUFTLFNBQVMsR0FBRztBQUMvRCx1QkFBaUI7QUFDakIsaUJBQVcsWUFBWSxVQUFVLENBQUMsTUFBTSxNQUFNO0FBQzVDLFlBQUksR0FBRyxTQUFTLEVBQUUsTUFBTTtBQUN0QjtBQUNGLFlBQUksRUFBRSxPQUFPLGdCQUFnQjtBQUMzQjtBQUNGLFlBQUksR0FBRyxjQUFjLEtBQUssR0FBRyxlQUFlO0FBQzFDO0FBQ0YsWUFBSSxHQUFHLGVBQWU7QUFDcEI7QUFDRixhQUFLLENBQUM7QUFBQSxNQUNSLENBQUM7QUFBQSxJQUNIO0FBQ0EsUUFBSSxVQUFVLFNBQVMsTUFBTSxHQUFHO0FBQzlCLGlCQUFXLFlBQVksVUFBVSxDQUFDLE1BQU0sTUFBTTtBQUM1QyxhQUFLLENBQUM7QUFDTix1QkFBZSxvQkFBb0IsT0FBTyxVQUFVLE9BQU87QUFBQSxNQUM3RCxDQUFDO0FBQUEsSUFDSDtBQUNBLGVBQVcsWUFBWSxVQUFVLENBQUMsTUFBTSxNQUFNO0FBQzVDLFVBQUksV0FBVyxLQUFLLEdBQUc7QUFDckIsWUFBSSwrQ0FBK0MsR0FBRyxTQUFTLEdBQUc7QUFDaEU7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUNBLFdBQUssQ0FBQztBQUFBLElBQ1IsQ0FBQztBQUNELFFBQUksVUFBVSxTQUFTLFVBQVUsR0FBRztBQUNsQyxVQUFJLGVBQWUsVUFBVSxVQUFVLFFBQVEsVUFBVSxJQUFJLENBQUMsS0FBSztBQUNuRSxVQUFJLE9BQU8sVUFBVSxhQUFhLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLE9BQU8sYUFBYSxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtBQUMxRixpQkFBVyxTQUFTLFVBQVUsSUFBSTtBQUFBLElBQ3BDO0FBQ0EsUUFBSSxVQUFVLFNBQVMsVUFBVSxHQUFHO0FBQ2xDLFVBQUksZUFBZSxVQUFVLFVBQVUsUUFBUSxVQUFVLElBQUksQ0FBQyxLQUFLO0FBQ25FLFVBQUksT0FBTyxVQUFVLGFBQWEsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksT0FBTyxhQUFhLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO0FBQzFGLGlCQUFXLFNBQVMsVUFBVSxJQUFJO0FBQUEsSUFDcEM7QUFDQSxtQkFBZSxpQkFBaUIsT0FBTyxVQUFVLE9BQU87QUFDeEQsV0FBTyxNQUFNO0FBQ1gscUJBQWUsb0JBQW9CLE9BQU8sVUFBVSxPQUFPO0FBQUEsSUFDN0Q7QUFBQSxFQUNGO0FBQ0EsV0FBUyxVQUFVLFNBQVM7QUFDMUIsV0FBTyxRQUFRLFFBQVEsTUFBTSxHQUFHO0FBQUEsRUFDbEM7QUFDQSxXQUFTLFdBQVcsU0FBUztBQUMzQixXQUFPLFFBQVEsWUFBWSxFQUFFLFFBQVEsVUFBVSxDQUFDLE9BQU8sU0FBUyxLQUFLLFlBQVksQ0FBQztBQUFBLEVBQ3BGO0FBQ0EsV0FBUyxVQUFVLFNBQVM7QUFDMUIsV0FBTyxDQUFDLE1BQU0sUUFBUSxPQUFPLEtBQUssQ0FBQyxNQUFNLE9BQU87QUFBQSxFQUNsRDtBQUNBLFdBQVMsV0FBVyxTQUFTO0FBQzNCLFdBQU8sUUFBUSxRQUFRLG1CQUFtQixPQUFPLEVBQUUsUUFBUSxTQUFTLEdBQUcsRUFBRSxZQUFZO0FBQUEsRUFDdkY7QUFDQSxXQUFTLFdBQVcsT0FBTztBQUN6QixXQUFPLENBQUMsV0FBVyxPQUFPLEVBQUUsU0FBUyxLQUFLO0FBQUEsRUFDNUM7QUFDQSxXQUFTLCtDQUErQyxHQUFHLFdBQVc7QUFDcEUsUUFBSSxlQUFlLFVBQVUsT0FBTyxDQUFDLE1BQU07QUFDekMsYUFBTyxDQUFDLENBQUMsVUFBVSxZQUFZLFdBQVcsUUFBUSxNQUFNLEVBQUUsU0FBUyxDQUFDO0FBQUEsSUFDdEUsQ0FBQztBQUNELFFBQUksYUFBYSxTQUFTLFVBQVUsR0FBRztBQUNyQyxVQUFJLGdCQUFnQixhQUFhLFFBQVEsVUFBVTtBQUNuRCxtQkFBYSxPQUFPLGVBQWUsV0FBVyxhQUFhLGdCQUFnQixDQUFDLEtBQUssZ0JBQWdCLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztBQUFBLElBQzFIO0FBQ0EsUUFBSSxhQUFhLFdBQVc7QUFDMUIsYUFBTztBQUNULFFBQUksYUFBYSxXQUFXLEtBQUssZUFBZSxFQUFFLEdBQUcsRUFBRSxTQUFTLGFBQWEsQ0FBQyxDQUFDO0FBQzdFLGFBQU87QUFDVCxVQUFNLHFCQUFxQixDQUFDLFFBQVEsU0FBUyxPQUFPLFFBQVEsT0FBTyxPQUFPO0FBQzFFLFVBQU0sNkJBQTZCLG1CQUFtQixPQUFPLENBQUMsYUFBYSxhQUFhLFNBQVMsUUFBUSxDQUFDO0FBQzFHLG1CQUFlLGFBQWEsT0FBTyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsU0FBUyxDQUFDLENBQUM7QUFDakYsUUFBSSwyQkFBMkIsU0FBUyxHQUFHO0FBQ3pDLFlBQU0sOEJBQThCLDJCQUEyQixPQUFPLENBQUMsYUFBYTtBQUNsRixZQUFJLGFBQWEsU0FBUyxhQUFhO0FBQ3JDLHFCQUFXO0FBQ2IsZUFBTyxFQUFFLEdBQUcsUUFBUSxLQUFLO0FBQUEsTUFDM0IsQ0FBQztBQUNELFVBQUksNEJBQTRCLFdBQVcsMkJBQTJCLFFBQVE7QUFDNUUsWUFBSSxlQUFlLEVBQUUsR0FBRyxFQUFFLFNBQVMsYUFBYSxDQUFDLENBQUM7QUFDaEQsaUJBQU87QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQ0EsV0FBUyxlQUFlLEtBQUs7QUFDM0IsUUFBSSxDQUFDO0FBQ0gsYUFBTyxDQUFDO0FBQ1YsVUFBTSxXQUFXLEdBQUc7QUFDcEIsUUFBSSxtQkFBbUI7QUFBQSxNQUNyQixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxPQUFPO0FBQUEsTUFDUCxVQUFVO0FBQUEsTUFDVixLQUFLO0FBQUEsTUFDTCxLQUFLO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsTUFDUixPQUFPO0FBQUEsSUFDVDtBQUNBLHFCQUFpQixHQUFHLElBQUk7QUFDeEIsV0FBTyxPQUFPLEtBQUssZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGFBQWE7QUFDckQsVUFBSSxpQkFBaUIsUUFBUSxNQUFNO0FBQ2pDLGVBQU87QUFBQSxJQUNYLENBQUMsRUFBRSxPQUFPLENBQUMsYUFBYSxRQUFRO0FBQUEsRUFDbEM7QUFHQSxZQUFVLFNBQVMsQ0FBQyxJQUFJLEVBQUMsV0FBVyxXQUFVLEdBQUcsRUFBQyxRQUFRLFNBQVMsU0FBUyxTQUFRLE1BQU07QUFDeEYsUUFBSSxZQUFZLGNBQWMsSUFBSSxVQUFVO0FBQzVDLFFBQUksdUJBQXVCLEdBQUcsVUFBVSxvQ0FBb0MsVUFBVTtBQUN0RixRQUFJLHFCQUFxQixjQUFjLElBQUksb0JBQW9CO0FBQy9ELFFBQUksUUFBUSxHQUFHLFFBQVEsWUFBWSxNQUFNLFlBQVksQ0FBQyxZQUFZLE9BQU8sRUFBRSxTQUFTLEdBQUcsSUFBSSxLQUFLLFVBQVUsU0FBUyxNQUFNLElBQUksV0FBVztBQUN4SSxRQUFJLG9CQUFvQiwyQkFBMkIsSUFBSSxXQUFXLFVBQVU7QUFDNUUsUUFBSSxpQkFBaUIsR0FBRyxJQUFJLE9BQU8sV0FBVyxDQUFDLE1BQU07QUFDbkQseUJBQW1CLE1BQU07QUFBQSxNQUN6QixHQUFHLEVBQUMsT0FBTztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1IsdUJBQXVCO0FBQUEsTUFDekIsRUFBQyxDQUFDO0FBQUEsSUFDSixDQUFDO0FBQ0QsUUFBSSxDQUFDLEdBQUc7QUFDTixTQUFHLDBCQUEwQixDQUFDO0FBQ2hDLE9BQUcsd0JBQXdCLFNBQVMsSUFBSTtBQUN4QyxhQUFTLE1BQU0sR0FBRyx3QkFBd0IsU0FBUyxFQUFFLENBQUM7QUFDdEQsUUFBSSxtQkFBbUIsY0FBYyxJQUFJLEdBQUcsVUFBVSxrQkFBa0I7QUFDeEUsT0FBRyxXQUFXO0FBQUEsTUFDWixNQUFNO0FBQ0osWUFBSTtBQUNKLGtCQUFVLENBQUMsVUFBVSxTQUFTLEtBQUs7QUFDbkMsZUFBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLElBQUksT0FBTztBQUNULHlCQUFpQixNQUFNO0FBQUEsUUFDdkIsR0FBRyxFQUFDLE9BQU8sRUFBQyxlQUFlLE1BQUssRUFBQyxDQUFDO0FBQUEsTUFDcEM7QUFBQSxJQUNGO0FBQ0EsT0FBRyxzQkFBc0IsTUFBTTtBQUM3QixnQkFBVSxDQUFDLFVBQVU7QUFDbkIsWUFBSSxVQUFVLFVBQVUsV0FBVyxNQUFNLElBQUk7QUFDM0Msa0JBQVE7QUFDVixlQUFPLFlBQVk7QUFDbkIsa0JBQVUsTUFBTSxLQUFLLElBQUksU0FBUyxLQUFLLENBQUM7QUFDeEMsZUFBTyxPQUFPO0FBQUEsTUFDaEIsQ0FBQztBQUFBLElBQ0g7QUFDQSxZQUFRLE1BQU07QUFDWixVQUFJLFVBQVUsU0FBUyxhQUFhLEtBQUssU0FBUyxjQUFjLFdBQVcsRUFBRTtBQUMzRTtBQUNGLFNBQUcsb0JBQW9CO0FBQUEsSUFDekIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNELFdBQVMsMkJBQTJCLElBQUksV0FBVyxZQUFZO0FBQzdELFFBQUksR0FBRyxTQUFTLFNBQVM7QUFDdkIsZ0JBQVUsTUFBTTtBQUNkLFlBQUksQ0FBQyxHQUFHLGFBQWEsTUFBTTtBQUN6QixhQUFHLGFBQWEsUUFBUSxVQUFVO0FBQUEsTUFDdEMsQ0FBQztBQUFBLElBQ0g7QUFDQSxXQUFPLENBQUMsT0FBTyxpQkFBaUI7QUFDOUIsYUFBTyxVQUFVLE1BQU07QUFDckIsWUFBSSxpQkFBaUIsZUFBZSxNQUFNLFdBQVcsUUFBUTtBQUMzRCxpQkFBTyxNQUFNLFVBQVUsTUFBTSxPQUFPO0FBQUEsUUFDdEMsV0FBVyxHQUFHLFNBQVMsWUFBWTtBQUNqQyxjQUFJLE1BQU0sUUFBUSxZQUFZLEdBQUc7QUFDL0IsZ0JBQUksV0FBVyxVQUFVLFNBQVMsUUFBUSxJQUFJLGdCQUFnQixNQUFNLE9BQU8sS0FBSyxJQUFJLE1BQU0sT0FBTztBQUNqRyxtQkFBTyxNQUFNLE9BQU8sVUFBVSxhQUFhLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxhQUFhLE9BQU8sQ0FBQyxRQUFRLENBQUMseUJBQXlCLEtBQUssUUFBUSxDQUFDO0FBQUEsVUFDdkksT0FBTztBQUNMLG1CQUFPLE1BQU0sT0FBTztBQUFBLFVBQ3RCO0FBQUEsUUFDRixXQUFXLEdBQUcsUUFBUSxZQUFZLE1BQU0sWUFBWSxHQUFHLFVBQVU7QUFDL0QsaUJBQU8sVUFBVSxTQUFTLFFBQVEsSUFBSSxNQUFNLEtBQUssTUFBTSxPQUFPLGVBQWUsRUFBRSxJQUFJLENBQUMsV0FBVztBQUM3RixnQkFBSSxXQUFXLE9BQU8sU0FBUyxPQUFPO0FBQ3RDLG1CQUFPLGdCQUFnQixRQUFRO0FBQUEsVUFDakMsQ0FBQyxJQUFJLE1BQU0sS0FBSyxNQUFNLE9BQU8sZUFBZSxFQUFFLElBQUksQ0FBQyxXQUFXO0FBQzVELG1CQUFPLE9BQU8sU0FBUyxPQUFPO0FBQUEsVUFDaEMsQ0FBQztBQUFBLFFBQ0gsT0FBTztBQUNMLGNBQUksV0FBVyxNQUFNLE9BQU87QUFDNUIsaUJBQU8sVUFBVSxTQUFTLFFBQVEsSUFBSSxnQkFBZ0IsUUFBUSxJQUFJLFVBQVUsU0FBUyxNQUFNLElBQUksU0FBUyxLQUFLLElBQUk7QUFBQSxRQUNuSDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0EsV0FBUyxnQkFBZ0IsVUFBVTtBQUNqQyxRQUFJLFNBQVMsV0FBVyxXQUFXLFFBQVEsSUFBSTtBQUMvQyxXQUFPLFdBQVcsTUFBTSxJQUFJLFNBQVM7QUFBQSxFQUN2QztBQUNBLFdBQVMseUJBQXlCLFFBQVEsUUFBUTtBQUNoRCxXQUFPLFVBQVU7QUFBQSxFQUNuQjtBQUNBLFdBQVMsV0FBVyxTQUFTO0FBQzNCLFdBQU8sQ0FBQyxNQUFNLFFBQVEsT0FBTyxLQUFLLENBQUMsTUFBTSxPQUFPO0FBQUEsRUFDbEQ7QUFHQSxZQUFVLFNBQVMsQ0FBQyxPQUFPLGVBQWUsTUFBTSxVQUFVLE1BQU0sR0FBRyxnQkFBZ0IsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFHckcsa0JBQWdCLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHO0FBQzNDLFlBQVUsUUFBUSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUMsV0FBVSxHQUFHLEVBQUMsVUFBVSxVQUFTLE1BQU07QUFDN0UsUUFBSSxPQUFPLGVBQWUsVUFBVTtBQUNsQyxhQUFPLENBQUMsQ0FBQyxXQUFXLEtBQUssS0FBSyxVQUFVLFlBQVksQ0FBQyxHQUFHLEtBQUs7QUFBQSxJQUMvRDtBQUNBLFdBQU8sVUFBVSxZQUFZLENBQUMsR0FBRyxLQUFLO0FBQUEsRUFDeEMsQ0FBQyxDQUFDO0FBR0YsWUFBVSxRQUFRLENBQUMsSUFBSSxFQUFDLFdBQVUsR0FBRyxFQUFDLFFBQVEsU0FBUyxlQUFlLGVBQWMsTUFBTTtBQUN4RixRQUFJLFlBQVksZUFBZSxVQUFVO0FBQ3pDLFlBQVEsTUFBTTtBQUNaLGdCQUFVLENBQUMsVUFBVTtBQUNuQixrQkFBVSxNQUFNO0FBQ2QsYUFBRyxjQUFjO0FBQUEsUUFDbkIsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUdELFlBQVUsUUFBUSxDQUFDLElBQUksRUFBQyxXQUFVLEdBQUcsRUFBQyxRQUFRLFNBQVMsZUFBZSxlQUFjLE1BQU07QUFDeEYsUUFBSSxZQUFZLGVBQWUsVUFBVTtBQUN6QyxZQUFRLE1BQU07QUFDWixnQkFBVSxDQUFDLFVBQVU7QUFDbkIsa0JBQVUsTUFBTTtBQUNkLGFBQUcsWUFBWTtBQUNmLGFBQUcsZ0JBQWdCO0FBQ25CLG1CQUFTLEVBQUU7QUFDWCxpQkFBTyxHQUFHO0FBQUEsUUFDWixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBR0QsZ0JBQWMsYUFBYSxLQUFLLEtBQUssT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFlBQVUsUUFBUSxDQUFDLElBQUksRUFBQyxPQUFPLFdBQVcsWUFBWSxTQUFRLEdBQUcsRUFBQyxRQUFRLFFBQU8sTUFBTTtBQUNyRixRQUFJLENBQUMsT0FBTztBQUNWLFVBQUksbUJBQW1CLENBQUM7QUFDeEIsNkJBQXVCLGdCQUFnQjtBQUN2QyxVQUFJLGNBQWMsY0FBYyxJQUFJLFVBQVU7QUFDOUMsa0JBQVksQ0FBQyxhQUFhO0FBQ3hCLDRCQUFvQixJQUFJLFVBQVUsUUFBUTtBQUFBLE1BQzVDLEdBQUcsRUFBQyxPQUFPLGlCQUFnQixDQUFDO0FBQzVCO0FBQUEsSUFDRjtBQUNBLFFBQUksVUFBVTtBQUNaLGFBQU8sZ0JBQWdCLElBQUksVUFBVTtBQUN2QyxRQUFJLFlBQVksY0FBYyxJQUFJLFVBQVU7QUFDNUMsWUFBUSxNQUFNLFVBQVUsQ0FBQyxXQUFXO0FBQ2xDLFVBQUksV0FBVyxVQUFVLFdBQVcsTUFBTSxJQUFJO0FBQzVDLGlCQUFTO0FBQ1gsZ0JBQVUsTUFBTSxLQUFLLElBQUksT0FBTyxRQUFRLFNBQVMsQ0FBQztBQUFBLElBQ3BELENBQUMsQ0FBQztBQUFBLEVBQ0osQ0FBQztBQUNELFdBQVMsZ0JBQWdCLElBQUksWUFBWTtBQUN2QyxPQUFHLG1CQUFtQjtBQUFBLEVBQ3hCO0FBR0Esa0JBQWdCLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxHQUFHO0FBQzNDLFlBQVUsUUFBUSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUMsV0FBVSxHQUFHLEVBQUMsU0FBUyxTQUFRLE1BQU07QUFDM0UsaUJBQWEsZUFBZSxLQUFLLE9BQU87QUFDeEMsUUFBSSxlQUFlLENBQUM7QUFDcEIsUUFBSSxXQUFXLGFBQWEsY0FBYyxFQUFFLEVBQUU7QUFDOUMsUUFBSSxzQkFBc0IsQ0FBQztBQUMzQix3QkFBb0IscUJBQXFCLFlBQVk7QUFDckQsUUFBSSxRQUFRLFNBQVMsSUFBSSxZQUFZLEVBQUMsT0FBTyxvQkFBbUIsQ0FBQztBQUNqRSxRQUFJLFVBQVU7QUFDWixjQUFRLENBQUM7QUFDWCxRQUFJLFlBQVksYUFBYSxPQUFPLEVBQUUsRUFBRTtBQUN4QyxRQUFJLGVBQWUsU0FBUyxLQUFLO0FBQ2pDLHFCQUFpQixZQUFZO0FBQzdCLFFBQUksT0FBTyxlQUFlLElBQUksWUFBWTtBQUMxQyxpQkFBYSxNQUFNLEtBQUssU0FBUyxJQUFJLGFBQWEsTUFBTSxDQUFDO0FBQ3pELGFBQVMsTUFBTTtBQUNiLFdBQUs7QUFDTCxlQUFTO0FBQ1QsZ0JBQVU7QUFDVixtQkFBYSxTQUFTLEtBQUssU0FBUyxJQUFJLGFBQWEsU0FBUyxDQUFDO0FBQy9ELFdBQUs7QUFBQSxJQUNQLENBQUM7QUFBQSxFQUNILENBQUMsQ0FBQztBQUdGLFlBQVUsUUFBUSxDQUFDLElBQUksRUFBQyxXQUFXLFdBQVUsR0FBRyxFQUFDLFFBQVEsUUFBTyxNQUFNO0FBQ3BFLFFBQUksWUFBWSxjQUFjLElBQUksVUFBVTtBQUM1QyxRQUFJLENBQUMsR0FBRztBQUNOLFNBQUcsWUFBWSxNQUFNO0FBQ25CLGtCQUFVLE1BQU07QUFDZCxhQUFHLE1BQU0sWUFBWSxXQUFXLFFBQVEsVUFBVSxTQUFTLFdBQVcsSUFBSSxjQUFjLE1BQU07QUFBQSxRQUNoRyxDQUFDO0FBQUEsTUFDSDtBQUNGLFFBQUksQ0FBQyxHQUFHO0FBQ04sU0FBRyxZQUFZLE1BQU07QUFDbkIsa0JBQVUsTUFBTTtBQUNkLGNBQUksR0FBRyxNQUFNLFdBQVcsS0FBSyxHQUFHLE1BQU0sWUFBWSxRQUFRO0FBQ3hELGVBQUcsZ0JBQWdCLE9BQU87QUFBQSxVQUM1QixPQUFPO0FBQ0wsZUFBRyxNQUFNLGVBQWUsU0FBUztBQUFBLFVBQ25DO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUNGLFFBQUksT0FBTyxNQUFNO0FBQ2YsU0FBRyxVQUFVO0FBQ2IsU0FBRyxhQUFhO0FBQUEsSUFDbEI7QUFDQSxRQUFJLE9BQU8sTUFBTTtBQUNmLFNBQUcsVUFBVTtBQUNiLFNBQUcsYUFBYTtBQUFBLElBQ2xCO0FBQ0EsUUFBSSwwQkFBMEIsTUFBTSxXQUFXLElBQUk7QUFDbkQsUUFBSSxTQUFTLEtBQUssQ0FBQyxVQUFVLFFBQVEsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLFVBQVU7QUFDL0QsVUFBSSxPQUFPLEdBQUcsdUNBQXVDLFlBQVk7QUFDL0QsV0FBRyxtQ0FBbUMsSUFBSSxPQUFPLE1BQU0sSUFBSTtBQUFBLE1BQzdELE9BQU87QUFDTCxnQkFBUSx3QkFBd0IsSUFBSSxLQUFLO0FBQUEsTUFDM0M7QUFBQSxJQUNGLENBQUM7QUFDRCxRQUFJO0FBQ0osUUFBSSxZQUFZO0FBQ2hCLFlBQVEsTUFBTSxVQUFVLENBQUMsVUFBVTtBQUNqQyxVQUFJLENBQUMsYUFBYSxVQUFVO0FBQzFCO0FBQ0YsVUFBSSxVQUFVLFNBQVMsV0FBVztBQUNoQyxnQkFBUSx3QkFBd0IsSUFBSSxLQUFLO0FBQzNDLGFBQU8sS0FBSztBQUNaLGlCQUFXO0FBQ1gsa0JBQVk7QUFBQSxJQUNkLENBQUMsQ0FBQztBQUFBLEVBQ0osQ0FBQztBQUdELFlBQVUsT0FBTyxDQUFDLElBQUksRUFBQyxXQUFVLEdBQUcsRUFBQyxRQUFRLFNBQVMsU0FBUyxTQUFRLE1BQU07QUFDM0UsUUFBSSxnQkFBZ0IsbUJBQW1CLFVBQVU7QUFDakQsUUFBSSxnQkFBZ0IsY0FBYyxJQUFJLGNBQWMsS0FBSztBQUN6RCxRQUFJLGNBQWMsY0FBYyxJQUFJLEdBQUcsb0JBQW9CLE9BQU87QUFDbEUsT0FBRyxjQUFjLENBQUM7QUFDbEIsT0FBRyxZQUFZLENBQUM7QUFDaEIsWUFBUSxNQUFNLEtBQUssSUFBSSxlQUFlLGVBQWUsV0FBVyxDQUFDO0FBQ2pFLGFBQVMsTUFBTTtBQUNiLGFBQU8sT0FBTyxHQUFHLFNBQVMsRUFBRSxRQUFRLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQztBQUN6RCxhQUFPLEdBQUc7QUFDVixhQUFPLEdBQUc7QUFBQSxJQUNaLENBQUM7QUFBQSxFQUNILENBQUM7QUFDRCxXQUFTLEtBQUssSUFBSSxlQUFlLGVBQWUsYUFBYTtBQUMzRCxRQUFJLFlBQVksQ0FBQyxNQUFNLE9BQU8sTUFBTSxZQUFZLENBQUMsTUFBTSxRQUFRLENBQUM7QUFDaEUsUUFBSSxhQUFhO0FBQ2pCLGtCQUFjLENBQUMsVUFBVTtBQUN2QixVQUFJLFdBQVcsS0FBSyxLQUFLLFNBQVMsR0FBRztBQUNuQyxnQkFBUSxNQUFNLEtBQUssTUFBTSxLQUFLLEVBQUUsS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUM7QUFBQSxNQUN0RDtBQUNBLFVBQUksVUFBVTtBQUNaLGdCQUFRLENBQUM7QUFDWCxVQUFJLFNBQVMsR0FBRztBQUNoQixVQUFJLFdBQVcsR0FBRztBQUNsQixVQUFJLFNBQVMsQ0FBQztBQUNkLFVBQUksT0FBTyxDQUFDO0FBQ1osVUFBSSxVQUFVLEtBQUssR0FBRztBQUNwQixnQkFBUSxPQUFPLFFBQVEsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNO0FBQ2xELGNBQUksU0FBUywyQkFBMkIsZUFBZSxPQUFPLEtBQUssS0FBSztBQUN4RSxzQkFBWSxDQUFDLFdBQVcsS0FBSyxLQUFLLE1BQU0sR0FBRyxFQUFDLE9BQU8sRUFBQyxPQUFPLEtBQUssR0FBRyxPQUFNLEVBQUMsQ0FBQztBQUMzRSxpQkFBTyxLQUFLLE1BQU07QUFBQSxRQUNwQixDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wsaUJBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxRQUFRLEtBQUs7QUFDckMsY0FBSSxTQUFTLDJCQUEyQixlQUFlLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSztBQUN6RSxzQkFBWSxDQUFDLFVBQVUsS0FBSyxLQUFLLEtBQUssR0FBRyxFQUFDLE9BQU8sRUFBQyxPQUFPLEdBQUcsR0FBRyxPQUFNLEVBQUMsQ0FBQztBQUN2RSxpQkFBTyxLQUFLLE1BQU07QUFBQSxRQUNwQjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLE9BQU8sQ0FBQztBQUNaLFVBQUksUUFBUSxDQUFDO0FBQ2IsVUFBSSxVQUFVLENBQUM7QUFDZixVQUFJLFFBQVEsQ0FBQztBQUNiLGVBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxRQUFRLEtBQUs7QUFDeEMsWUFBSSxNQUFNLFNBQVMsQ0FBQztBQUNwQixZQUFJLEtBQUssUUFBUSxHQUFHLE1BQU07QUFDeEIsa0JBQVEsS0FBSyxHQUFHO0FBQUEsTUFDcEI7QUFDQSxpQkFBVyxTQUFTLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxTQUFTLEdBQUcsQ0FBQztBQUMxRCxVQUFJLFVBQVU7QUFDZCxlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ3BDLFlBQUksTUFBTSxLQUFLLENBQUM7QUFDaEIsWUFBSSxZQUFZLFNBQVMsUUFBUSxHQUFHO0FBQ3BDLFlBQUksY0FBYyxJQUFJO0FBQ3BCLG1CQUFTLE9BQU8sR0FBRyxHQUFHLEdBQUc7QUFDekIsZUFBSyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFBQSxRQUN4QixXQUFXLGNBQWMsR0FBRztBQUMxQixjQUFJLFlBQVksU0FBUyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDdkMsY0FBSSxhQUFhLFNBQVMsT0FBTyxZQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDcEQsbUJBQVMsT0FBTyxHQUFHLEdBQUcsVUFBVTtBQUNoQyxtQkFBUyxPQUFPLFdBQVcsR0FBRyxTQUFTO0FBQ3ZDLGdCQUFNLEtBQUssQ0FBQyxXQUFXLFVBQVUsQ0FBQztBQUFBLFFBQ3BDLE9BQU87QUFDTCxnQkFBTSxLQUFLLEdBQUc7QUFBQSxRQUNoQjtBQUNBLGtCQUFVO0FBQUEsTUFDWjtBQUNBLGVBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxRQUFRLEtBQUs7QUFDdkMsWUFBSSxNQUFNLFFBQVEsQ0FBQztBQUNuQixZQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxZQUFZO0FBQzVCLGlCQUFPLEdBQUcsRUFBRSxXQUFXLFFBQVEsVUFBVTtBQUFBLFFBQzNDO0FBQ0EsZUFBTyxHQUFHLEVBQUUsT0FBTztBQUNuQixlQUFPLEdBQUcsSUFBSTtBQUNkLGVBQU8sT0FBTyxHQUFHO0FBQUEsTUFDbkI7QUFDQSxlQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JDLFlBQUksQ0FBQyxXQUFXLFVBQVUsSUFBSSxNQUFNLENBQUM7QUFDckMsWUFBSSxXQUFXLE9BQU8sU0FBUztBQUMvQixZQUFJLFlBQVksT0FBTyxVQUFVO0FBQ2pDLFlBQUksU0FBUyxTQUFTLGNBQWMsS0FBSztBQUN6QyxrQkFBVSxNQUFNO0FBQ2Qsb0JBQVUsTUFBTSxNQUFNO0FBQ3RCLG1CQUFTLE1BQU0sU0FBUztBQUN4QixvQkFBVSxrQkFBa0IsVUFBVSxNQUFNLFVBQVUsY0FBYztBQUNwRSxpQkFBTyxPQUFPLFFBQVE7QUFDdEIsbUJBQVMsa0JBQWtCLFNBQVMsTUFBTSxTQUFTLGNBQWM7QUFDakUsaUJBQU8sT0FBTztBQUFBLFFBQ2hCLENBQUM7QUFDRCxxQkFBYSxXQUFXLE9BQU8sS0FBSyxRQUFRLFVBQVUsQ0FBQyxDQUFDO0FBQUEsTUFDMUQ7QUFDQSxlQUFTLElBQUksR0FBRyxJQUFJLEtBQUssUUFBUSxLQUFLO0FBQ3BDLFlBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxLQUFLLENBQUM7QUFDOUIsWUFBSSxTQUFTLGFBQWEsYUFBYSxhQUFhLE9BQU8sUUFBUTtBQUNuRSxZQUFJLE9BQU87QUFDVCxtQkFBUyxPQUFPO0FBQ2xCLFlBQUksU0FBUyxPQUFPLEtBQUs7QUFDekIsWUFBSSxNQUFNLEtBQUssS0FBSztBQUNwQixZQUFJLFNBQVMsU0FBUyxXQUFXLFdBQVcsU0FBUyxJQUFJLEVBQUU7QUFDM0QsdUJBQWUsUUFBUSxTQUFTLE1BQU0sR0FBRyxVQUFVO0FBQ25ELGtCQUFVLE1BQU07QUFDZCxpQkFBTyxNQUFNLE1BQU07QUFDbkIsbUJBQVMsTUFBTTtBQUFBLFFBQ2pCLENBQUM7QUFDRCxZQUFJLE9BQU8sUUFBUSxVQUFVO0FBQzNCLGVBQUssb0VBQW9FLFVBQVU7QUFBQSxRQUNyRjtBQUNBLGVBQU8sR0FBRyxJQUFJO0FBQUEsTUFDaEI7QUFDQSxlQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0FBQ3JDLHFCQUFhLE9BQU8sTUFBTSxDQUFDLENBQUMsR0FBRyxPQUFPLEtBQUssUUFBUSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFBQSxNQUMvRDtBQUNBLGlCQUFXLGNBQWM7QUFBQSxJQUMzQixDQUFDO0FBQUEsRUFDSDtBQUNBLFdBQVMsbUJBQW1CLFlBQVk7QUFDdEMsUUFBSSxnQkFBZ0I7QUFDcEIsUUFBSSxnQkFBZ0I7QUFDcEIsUUFBSSxhQUFhO0FBQ2pCLFFBQUksVUFBVSxXQUFXLE1BQU0sVUFBVTtBQUN6QyxRQUFJLENBQUM7QUFDSDtBQUNGLFFBQUksTUFBTSxDQUFDO0FBQ1gsUUFBSSxRQUFRLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDNUIsUUFBSSxPQUFPLFFBQVEsQ0FBQyxFQUFFLFFBQVEsZUFBZSxFQUFFLEVBQUUsS0FBSztBQUN0RCxRQUFJLGdCQUFnQixLQUFLLE1BQU0sYUFBYTtBQUM1QyxRQUFJLGVBQWU7QUFDakIsVUFBSSxPQUFPLEtBQUssUUFBUSxlQUFlLEVBQUUsRUFBRSxLQUFLO0FBQ2hELFVBQUksUUFBUSxjQUFjLENBQUMsRUFBRSxLQUFLO0FBQ2xDLFVBQUksY0FBYyxDQUFDLEdBQUc7QUFDcEIsWUFBSSxhQUFhLGNBQWMsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUN6QztBQUFBLElBQ0YsT0FBTztBQUNMLFVBQUksT0FBTztBQUFBLElBQ2I7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsMkJBQTJCLGVBQWUsTUFBTSxPQUFPLE9BQU87QUFDckUsUUFBSSxpQkFBaUIsQ0FBQztBQUN0QixRQUFJLFdBQVcsS0FBSyxjQUFjLElBQUksS0FBSyxNQUFNLFFBQVEsSUFBSSxHQUFHO0FBQzlELFVBQUksUUFBUSxjQUFjLEtBQUssUUFBUSxLQUFLLEVBQUUsRUFBRSxRQUFRLEtBQUssRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0FBQy9GLFlBQU0sUUFBUSxDQUFDLE1BQU0sTUFBTTtBQUN6Qix1QkFBZSxJQUFJLElBQUksS0FBSyxDQUFDO0FBQUEsTUFDL0IsQ0FBQztBQUFBLElBQ0gsV0FBVyxXQUFXLEtBQUssY0FBYyxJQUFJLEtBQUssQ0FBQyxNQUFNLFFBQVEsSUFBSSxLQUFLLE9BQU8sU0FBUyxVQUFVO0FBQ2xHLFVBQUksUUFBUSxjQUFjLEtBQUssUUFBUSxLQUFLLEVBQUUsRUFBRSxRQUFRLEtBQUssRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0FBQy9GLFlBQU0sUUFBUSxDQUFDLFNBQVM7QUFDdEIsdUJBQWUsSUFBSSxJQUFJLEtBQUssSUFBSTtBQUFBLE1BQ2xDLENBQUM7QUFBQSxJQUNILE9BQU87QUFDTCxxQkFBZSxjQUFjLElBQUksSUFBSTtBQUFBLElBQ3ZDO0FBQ0EsUUFBSSxjQUFjO0FBQ2hCLHFCQUFlLGNBQWMsS0FBSyxJQUFJO0FBQ3hDLFFBQUksY0FBYztBQUNoQixxQkFBZSxjQUFjLFVBQVUsSUFBSTtBQUM3QyxXQUFPO0FBQUEsRUFDVDtBQUNBLFdBQVMsV0FBVyxTQUFTO0FBQzNCLFdBQU8sQ0FBQyxNQUFNLFFBQVEsT0FBTyxLQUFLLENBQUMsTUFBTSxPQUFPO0FBQUEsRUFDbEQ7QUFHQSxXQUFTLFdBQVc7QUFBQSxFQUNwQjtBQUNBLFdBQVMsU0FBUyxDQUFDLElBQUksRUFBQyxXQUFVLEdBQUcsRUFBQyxTQUFTLFNBQVEsTUFBTTtBQUMzRCxRQUFJLE9BQU8sWUFBWSxFQUFFO0FBQ3pCLFFBQUksQ0FBQyxLQUFLO0FBQ1IsV0FBSyxVQUFVLENBQUM7QUFDbEIsU0FBSyxRQUFRLFVBQVUsSUFBSTtBQUMzQixhQUFTLE1BQU0sT0FBTyxLQUFLLFFBQVEsVUFBVSxDQUFDO0FBQUEsRUFDaEQ7QUFDQSxZQUFVLE9BQU8sUUFBUTtBQUd6QixZQUFVLE1BQU0sQ0FBQyxJQUFJLEVBQUMsV0FBVSxHQUFHLEVBQUMsUUFBUSxTQUFTLFNBQVMsU0FBUSxNQUFNO0FBQzFFLFFBQUksWUFBWSxjQUFjLElBQUksVUFBVTtBQUM1QyxRQUFJLE9BQU8sTUFBTTtBQUNmLFVBQUksR0FBRztBQUNMLGVBQU8sR0FBRztBQUNaLFVBQUksU0FBUyxHQUFHLFFBQVEsVUFBVSxJQUFJLEVBQUU7QUFDeEMscUJBQWUsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUM3QixnQkFBVSxNQUFNO0FBQ2QsV0FBRyxNQUFNLE1BQU07QUFDZixpQkFBUyxNQUFNO0FBQUEsTUFDakIsQ0FBQztBQUNELFNBQUcsaUJBQWlCO0FBQ3BCLFNBQUcsWUFBWSxNQUFNO0FBQ25CLGFBQUssUUFBUSxDQUFDLFNBQVM7QUFDckIsY0FBSSxDQUFDLENBQUMsS0FBSyxZQUFZO0FBQ3JCLGlCQUFLLFdBQVcsUUFBUSxVQUFVO0FBQUEsVUFDcEM7QUFBQSxRQUNGLENBQUM7QUFDRCxlQUFPLE9BQU87QUFDZCxlQUFPLEdBQUc7QUFBQSxNQUNaO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFDQSxRQUFJLE9BQU8sTUFBTTtBQUNmLFVBQUksQ0FBQyxHQUFHO0FBQ047QUFDRixTQUFHLFVBQVU7QUFDYixhQUFPLEdBQUc7QUFBQSxJQUNaO0FBQ0EsWUFBUSxNQUFNLFVBQVUsQ0FBQyxVQUFVO0FBQ2pDLGNBQVEsS0FBSyxJQUFJLEtBQUs7QUFBQSxJQUN4QixDQUFDLENBQUM7QUFDRixhQUFTLE1BQU0sR0FBRyxhQUFhLEdBQUcsVUFBVSxDQUFDO0FBQUEsRUFDL0MsQ0FBQztBQUdELFlBQVUsTUFBTSxDQUFDLElBQUksRUFBQyxXQUFVLEdBQUcsRUFBQyxVQUFVLFVBQVMsTUFBTTtBQUMzRCxRQUFJLFFBQVEsVUFBVSxVQUFVO0FBQ2hDLFVBQU0sUUFBUSxDQUFDLFNBQVMsVUFBVSxJQUFJLElBQUksQ0FBQztBQUFBLEVBQzdDLENBQUM7QUFHRCxnQkFBYyxhQUFhLEtBQUssS0FBSyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDcEQsWUFBVSxNQUFNLGdCQUFnQixDQUFDLElBQUksRUFBQyxPQUFPLFdBQVcsV0FBVSxHQUFHLEVBQUMsU0FBUyxTQUFRLE1BQU07QUFDM0YsUUFBSSxZQUFZLGFBQWEsY0FBYyxJQUFJLFVBQVUsSUFBSSxNQUFNO0FBQUEsSUFDbkU7QUFDQSxRQUFJLEdBQUcsUUFBUSxZQUFZLE1BQU0sWUFBWTtBQUMzQyxVQUFJLENBQUMsR0FBRztBQUNOLFdBQUcsbUJBQW1CLENBQUM7QUFDekIsVUFBSSxDQUFDLEdBQUcsaUJBQWlCLFNBQVMsS0FBSztBQUNyQyxXQUFHLGlCQUFpQixLQUFLLEtBQUs7QUFBQSxJQUNsQztBQUNBLFFBQUksaUJBQWlCLEdBQUcsSUFBSSxPQUFPLFdBQVcsQ0FBQyxNQUFNO0FBQ25ELGdCQUFVLE1BQU07QUFBQSxNQUNoQixHQUFHLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQztBQUFBLElBQ3RDLENBQUM7QUFDRCxhQUFTLE1BQU0sZUFBZSxDQUFDO0FBQUEsRUFDakMsQ0FBQyxDQUFDO0FBR0YsNkJBQTJCLFlBQVksWUFBWSxVQUFVO0FBQzdELDZCQUEyQixhQUFhLGFBQWEsV0FBVztBQUNoRSw2QkFBMkIsU0FBUyxRQUFRLE9BQU87QUFDbkQsNkJBQTJCLFFBQVEsUUFBUSxNQUFNO0FBQ2pELFdBQVMsMkJBQTJCLE1BQU0sZ0JBQWdCLE1BQU07QUFDOUQsY0FBVSxnQkFBZ0IsQ0FBQyxPQUFPLEtBQUssb0JBQW9CLGNBQWMsbUNBQW1DLElBQUksK0NBQStDLElBQUksSUFBSSxFQUFFLENBQUM7QUFBQSxFQUM1SztBQUdBLGlCQUFlLGFBQWEsZUFBZTtBQUMzQyxpQkFBZSxvQkFBb0IsRUFBQyxVQUFVLFdBQVcsUUFBUSxTQUFTLFNBQVMsTUFBTSxLQUFLLE1BQUssQ0FBQztBQUNwRyxNQUFJLGNBQWM7QUFHbEIsTUFBSSxpQkFBaUI7OztBQy80RnJCLGlCQUFPLEtBQUssb0JBQW9CLG1CQUFtQjtBQUNuRCxpQkFBTyxLQUFLLGlCQUFpQixnQkFBZ0I7QUFDN0MsaUJBQU8sS0FBSyxrQkFBa0IsaUJBQWlCO0FBRy9DLGlCQUFPLE1BQU07IiwKICAibmFtZXMiOiBbImx1bnIiLCAiY2xvbmUiLCAic3RhcnQiLCAicG9ydGVyU3RlbW1lciIsICJub2RlIiwgImRlYnVnIiwgInJvdyJdCn0K
