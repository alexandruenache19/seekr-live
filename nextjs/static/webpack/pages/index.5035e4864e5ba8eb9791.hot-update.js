/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Users_alexandruenache_Documents_seekr_web_node_modules_next_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty */ \"./node_modules/next/node_modules/@babel/runtime/helpers/esm/objectDestructuringEmpty.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/head */ \"./node_modules/next/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/esm/index.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_device_detect__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-device-detect */ \"./node_modules/react-device-detect/main.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\nvar _jsxFileName = \"/Users/alexandruenache/Documents/seekr-web/pages/index.js\",\n    _s = $RefreshSig$();\n\n\n\n\n\n // {\n//   \"hosting\": {\n//     \"public\": \"out\",\n//     \"ignore\": [\n//       \"firebase.json\",\n//       \"**/.*\",\n//       \"**/node_modules/**\"\n//     ]\n//   }\n// }\n\nfunction Home(_ref) {\n  _s();\n\n  (0,_Users_alexandruenache_Documents_seekr_web_node_modules_next_node_modules_babel_runtime_helpers_esm_objectDestructuringEmpty__WEBPACK_IMPORTED_MODULE_1__.default)(_ref);\n\n  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(),\n      isOnMobile = _useState[0],\n      setMobile = _useState[1];\n\n  var _useState2 = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true),\n      loading = _useState2[0],\n      setLoading = _useState2[1];\n\n  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {\n    setMobile(react_device_detect__WEBPACK_IMPORTED_MODULE_5__.isMobile);\n    setLoading(false);\n  }, [setMobile]);\n\n  if (loading) {\n    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Stack, {\n      w: \"100vw\",\n      h: \"100vh\",\n      justifyContent: \"center\",\n      alignItems: \"center\",\n      bg: \"#FFFEF3\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Spinner, {\n        color: \"red.500\",\n        size: \"xl\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 37,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 30,\n      columnNumber: 7\n    }, this);\n  }\n\n  if (isOnMobile) {\n    return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Stack, {\n      w: \"100vw\",\n      h: \"100vh\",\n      p: \"2em\",\n      bg: \"#F0F0F0\",\n      justifyContent: \"space-between\",\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {\n        justifyContent: \"space-between\",\n        alignItems: \"center\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n          style: styles.mobileLogo,\n          children: \"seekr.\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 52,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n          className: \"left\",\n          target: \"_blank\",\n          href: \"https://alexandruenache.typeform.com/to/XHmwEQ8j\",\n          children: \"Join Waitlist\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 53,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 51,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Image, {\n        src: \"./technology.png\",\n        alt: \"logo\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 62,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Stack, {\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n          style: styles.mobileLarge,\n          children: \"Buy & Sell products live\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 64,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n          style: styles.mobileNormal,\n          children: \"Sell products live\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 65,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 63,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {\n        href: \"https://alexandruenache.typeform.com/to/XHmwEQ8j\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Button, {\n          style: styles.button,\n          children: \"Join Waitlist!\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 68,\n          columnNumber: 11\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 67,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 44,\n      columnNumber: 7\n    }, this);\n  }\n\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Stack, {\n    w: \"100vw\",\n    minH: \"100vh\",\n    h: \"100%\",\n    bg: \"#F0F0F0\",\n    pt: \"50px\",\n    pb: \"50px\",\n    pl: \"135px\",\n    pr: \"135px\",\n    justifyContent: \"space-between\",\n    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {\n      justifyContent: \"space-between\",\n      alignItems: \"center\",\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n        style: styles.bold,\n        children: \"seekr.\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 87,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n        className: \"left\",\n        target: \"_blank\",\n        href: \"https://alexandruenache.typeform.com/to/XHmwEQ8j\",\n        children: \"Join Waitlist\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 89,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 86,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {\n      justifyContent: \"space-between\",\n      alignItems: \"center\",\n      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Stack, {\n        width: \"50%\",\n        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n          style: styles.semiBold,\n          children: \"\\u2501\\u2501\\u2501 Cosmetics, clothes and more \"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 100,\n          columnNumber: 11\n        }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Text, {\n            style: styles.largeBold,\n            children: \"Buy & Sell products live\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 102,\n            columnNumber: 13\n          }, this)\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 101,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 99,\n        columnNumber: 9\n      }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Image, {\n        w: \"50%\",\n        h: \"100%\",\n        src: \"/technology.png\",\n        alt: \"logo\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 107,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 98,\n      columnNumber: 7\n    }, this), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Flex, {\n      alignItems: \"center\",\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {\n        href: \"https://alexandruenache.typeform.com/to/XHmwEQ8j\",\n        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_6__.Button, {\n          style: styles.button,\n          children: \"Join Waitlist!\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 112,\n          columnNumber: 11\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 111,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 110,\n      columnNumber: 7\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 75,\n    columnNumber: 5\n  }, this);\n}\n\n_s(Home, \"CT5aR5mfGAmpyTQnVhk2oF3q9HU=\");\n\n_c = Home;\nvar styles = {\n  bold: {\n    fontWeight: 800,\n    fontSize: 24,\n    color: \"#081c15\",\n    lineHeight: \"1.3em\",\n    fontFamily: \"Poppins\"\n  },\n  normal: {\n    fontSize: 16,\n    lineHeight: \"1.5em\",\n    width: \"70%\"\n  },\n  mobileNormal: {\n    fontSize: 16,\n    lineHeight: \"1.5em\",\n    textAlign: \"center\",\n    paddingTop: 10\n  },\n  mobileLarge: {\n    fontWeight: 800,\n    fontSize: 30,\n    lineHeight: \"1.2em\",\n    textAlign: \"center\"\n  },\n  mobileLogo: {\n    fontWeight: 700,\n    fontSize: 18,\n    lineHeight: \"1.3em\"\n  },\n  semiBold: {\n    fontWeight: 600,\n    fontSize: 16,\n    lineHeight: \"1.5em\"\n  },\n  webContainer: {\n    flex: 1,\n    justifyContent: \"space-between\",\n    alignItems: \"center\"\n  },\n  largeNormal: {\n    fontSize: 55,\n    lineHeight: \"1.2em\"\n  },\n  largeBold: {\n    fontWeight: 800,\n    fontSize: 55,\n    lineHeight: \"1.2em\"\n  },\n  button: {\n    backgroundColor: \"#081c15\",\n    color: \"#FFF\"\n  }\n};\n\nvar _c;\n\n$RefreshReg$(_c, \"Home\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanM/NDRkOCJdLCJuYW1lcyI6WyJIb21lIiwidXNlU3RhdGUiLCJpc09uTW9iaWxlIiwic2V0TW9iaWxlIiwibG9hZGluZyIsInNldExvYWRpbmciLCJ1c2VFZmZlY3QiLCJpc01vYmlsZSIsInN0eWxlcyIsIm1vYmlsZUxvZ28iLCJtb2JpbGVMYXJnZSIsIm1vYmlsZU5vcm1hbCIsImJ1dHRvbiIsImJvbGQiLCJzZW1pQm9sZCIsImxhcmdlQm9sZCIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImNvbG9yIiwibGluZUhlaWdodCIsImZvbnRGYW1pbHkiLCJub3JtYWwiLCJ3aWR0aCIsInRleHRBbGlnbiIsInBhZGRpbmdUb3AiLCJ3ZWJDb250YWluZXIiLCJmbGV4IiwianVzdGlmeUNvbnRlbnQiLCJhbGlnbkl0ZW1zIiwibGFyZ2VOb3JtYWwiLCJiYWNrZ3JvdW5kQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtDQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLFNBQVNBLElBQVQsT0FBa0I7QUFBQTs7QUFBQTs7QUFBQSxrQkFDQ0MsK0NBQVEsRUFEVDtBQUFBLE1BQ3hCQyxVQUR3QjtBQUFBLE1BQ1pDLFNBRFk7O0FBQUEsbUJBRURGLCtDQUFRLENBQUMsSUFBRCxDQUZQO0FBQUEsTUFFeEJHLE9BRndCO0FBQUEsTUFFZkMsVUFGZTs7QUFJL0JDLGtEQUFTLENBQUMsWUFBTTtBQUNkSCxhQUFTLENBQUNJLHlEQUFELENBQVQ7QUFDQUYsY0FBVSxDQUFDLEtBQUQsQ0FBVjtBQUNELEdBSFEsRUFHTixDQUFDRixTQUFELENBSE0sQ0FBVDs7QUFLQSxNQUFJQyxPQUFKLEVBQWE7QUFDWCx3QkFDRSw4REFBQyxtREFBRDtBQUNFLE9BQUMsRUFBQyxPQURKO0FBRUUsT0FBQyxFQUFDLE9BRko7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RTtBQUVaRSxjQUFVLEVBQUUsT0FGQTtBQUdaSSxhQUFTLEVBQUUsUUFIQztBQUlaQyxjQUFVLEVBQUU7QUFKQSxHQWJEO0FBbUJiZCxhQUFXLEVBQUU7QUFDWE0sY0FBVSxFQUFFLEdBREQ7QUFFWEMsWUFBUSxFQUFFLEVBRkM7QUFHWEUsY0FBVSxFQUFFLE9BSEQ7QUFJWEksYUFBUyxFQUFFO0FBSkEsR0FuQkE7QUF5QmJkLFlBQVUsRUFBRTtBQUNWTyxjQUFVLEVBQUUsR0FERjtBQUVWQyxZQUFRLEVBQUUsRUFGQTtBQUdWRSxjQUFVLEVBQUU7QUFIRixHQXpCQztBQThCYkwsVUFBUSxFQUFFO0FBQ1JFLGNBQVUsRUFBRSxHQURKO0FBRVJDLFlBQVEsRUFBRSxFQUZGO0FBR1JFLGNBQVUsRUFBRTtBQUhKLEdBOUJHO0FBbUNiTSxjQUFZLEVBQUU7QUFDWkMsUUFBSSxFQUFFLENBRE07QUFFWkMsa0JBQWMsRUFBRSxlQUZKO0FBR1pDLGNBQVUsRUFBRTtBQUhBLEdBbkNEO0FBd0NiQyxhQUFXLEVBQUU7QUFDWFosWUFBUSxFQUFFLEVBREM7QUFFWEUsY0FBVSxFQUFFO0FBRkQsR0F4Q0E7QUE0Q2JKLFdBQVMsRUFBRTtBQUNUQyxjQUFVLEVBQUUsR0FESDtBQUVUQyxZQUFRLEVBQUUsRUFGRDtBQUdURSxjQUFVLEVBQUU7QUFISCxHQTVDRTtBQWlEYlAsUUFBTSxFQUFFO0FBQ05rQixtQkFBZSxFQUFFLFNBRFg7QUFFTlosU0FBSyxFQUFFO0FBRkQ7QUFqREssQ0FBZiIsImZpbGUiOiIuL3BhZ2VzL2luZGV4LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWQgZnJvbSBcIm5leHQvaGVhZFwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgU3RhY2ssIEZsZXgsIFRleHQsIEltYWdlLCBCdXR0b24sIFNwaW5uZXIgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XG5pbXBvcnQgeyBpc01vYmlsZSB9IGZyb20gXCJyZWFjdC1kZXZpY2UtZGV0ZWN0XCI7XG5cbi8vIHtcbi8vICAgXCJob3N0aW5nXCI6IHtcbi8vICAgICBcInB1YmxpY1wiOiBcIm91dFwiLFxuLy8gICAgIFwiaWdub3JlXCI6IFtcbi8vICAgICAgIFwiZmlyZWJhc2UuanNvblwiLFxuLy8gICAgICAgXCIqKi8uKlwiLFxuLy8gICAgICAgXCIqKi9ub2RlX21vZHVsZXMvKipcIlxuLy8gICAgIF1cbi8vICAgfVxuLy8gfVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKHt9KSB7XG4gIGNvbnN0IFtpc09uTW9iaWxlLCBzZXRNb2JpbGVdID0gdXNlU3RhdGUoKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRNb2JpbGUoaXNNb2JpbGUpO1xuICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICB9LCBbc2V0TW9iaWxlXSk7XG5cbiAgaWYgKGxvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFN0YWNrXG4gICAgICAgIHc9XCIxMDB2d1wiXG4gICAgICAgIGg9XCIxMDB2aFwiXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwiY2VudGVyXCJcbiAgICAgICAgYWxpZ25JdGVtcz1cImNlbnRlclwiXG4gICAgICAgIGJnPVwiI0ZGRkVGM1wiXG4gICAgICA+XG4gICAgICAgIDxTcGlubmVyIGNvbG9yPVwicmVkLjUwMFwiIHNpemU9XCJ4bFwiIC8+XG4gICAgICA8L1N0YWNrPlxuICAgICk7XG4gIH1cblxuICBpZiAoaXNPbk1vYmlsZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3RhY2tcbiAgICAgICAgdz1cIjEwMHZ3XCJcbiAgICAgICAgaD1cIjEwMHZoXCJcbiAgICAgICAgcD1cIjJlbVwiXG4gICAgICAgIGJnPVwiI0YwRjBGMFwiXG4gICAgICAgIGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiXG4gICAgICA+XG4gICAgICAgIDxGbGV4IGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17c3R5bGVzLm1vYmlsZUxvZ299PnNlZWtyLjwvVGV4dD5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibGVmdFwiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vYWxleGFuZHJ1ZW5hY2hlLnR5cGVmb3JtLmNvbS90by9YSG13RVE4alwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgSm9pbiBXYWl0bGlzdFxuICAgICAgICAgIDwvYT5cbiAgICAgICAgPC9GbGV4PlxuXG4gICAgICAgIDxJbWFnZSBzcmM9XCIuL3RlY2hub2xvZ3kucG5nXCIgYWx0PVwibG9nb1wiIC8+XG4gICAgICAgIDxTdGFjaz5cbiAgICAgICAgICA8VGV4dCBzdHlsZT17c3R5bGVzLm1vYmlsZUxhcmdlfT5CdXkgJiBTZWxsIHByb2R1Y3RzIGxpdmU8L1RleHQ+XG4gICAgICAgICAgPFRleHQgc3R5bGU9e3N0eWxlcy5tb2JpbGVOb3JtYWx9PlNlbGwgcHJvZHVjdHMgbGl2ZTwvVGV4dD5cbiAgICAgICAgPC9TdGFjaz5cbiAgICAgICAgPExpbmsgaHJlZj1cImh0dHBzOi8vYWxleGFuZHJ1ZW5hY2hlLnR5cGVmb3JtLmNvbS90by9YSG13RVE4alwiPlxuICAgICAgICAgIDxCdXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259PkpvaW4gV2FpdGxpc3QhPC9CdXR0b24+XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvU3RhY2s+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPFN0YWNrXG4gICAgICB3PVwiMTAwdndcIlxuICAgICAgbWluSD1cIjEwMHZoXCJcbiAgICAgIGg9XCIxMDAlXCJcbiAgICAgIGJnPVwiI0YwRjBGMFwiXG4gICAgICBwdD1cIjUwcHhcIlxuICAgICAgcGI9XCI1MHB4XCJcbiAgICAgIHBsPVwiMTM1cHhcIlxuICAgICAgcHI9XCIxMzVweFwiXG4gICAgICBqdXN0aWZ5Q29udGVudD1cInNwYWNlLWJldHdlZW5cIlxuICAgID5cbiAgICAgIDxGbGV4IGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgPFRleHQgc3R5bGU9e3N0eWxlcy5ib2xkfT5zZWVrci48L1RleHQ+XG5cbiAgICAgICAgPGFcbiAgICAgICAgICBjbGFzc05hbWU9XCJsZWZ0XCJcbiAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgIGhyZWY9XCJodHRwczovL2FsZXhhbmRydWVuYWNoZS50eXBlZm9ybS5jb20vdG8vWEhtd0VROGpcIlxuICAgICAgICA+XG4gICAgICAgICAgSm9pbiBXYWl0bGlzdFxuICAgICAgICA8L2E+XG4gICAgICA8L0ZsZXg+XG5cbiAgICAgIDxGbGV4IGp1c3RpZnlDb250ZW50PVwic3BhY2UtYmV0d2VlblwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgPFN0YWNrIHdpZHRoPVwiNTAlXCI+XG4gICAgICAgICAgPFRleHQgc3R5bGU9e3N0eWxlcy5zZW1pQm9sZH0+4pSB4pSB4pSBIENvc21ldGljcywgY2xvdGhlcyBhbmQgbW9yZSA8L1RleHQ+XG4gICAgICAgICAgPFRleHQ+XG4gICAgICAgICAgICA8VGV4dCBzdHlsZT17c3R5bGVzLmxhcmdlQm9sZH0+QnV5ICYgU2VsbCBwcm9kdWN0cyBsaXZlPC9UZXh0PlxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICB7LyogICAgPFRleHQgc3R5bGU9e3N0eWxlcy5ub3JtYWx9PlNlbGwgcHJvZHVjdHMgbGl2ZTwvVGV4dD4qL31cbiAgICAgICAgPC9TdGFjaz5cblxuICAgICAgICA8SW1hZ2Ugdz1cIjUwJVwiIGg9XCIxMDAlXCIgc3JjPVwiL3RlY2hub2xvZ3kucG5nXCIgYWx0PVwibG9nb1wiIC8+XG4gICAgICA8L0ZsZXg+XG5cbiAgICAgIDxGbGV4IGFsaWduSXRlbXM9XCJjZW50ZXJcIj5cbiAgICAgICAgPExpbmsgaHJlZj1cImh0dHBzOi8vYWxleGFuZHJ1ZW5hY2hlLnR5cGVmb3JtLmNvbS90by9YSG13RVE4alwiPlxuICAgICAgICAgIDxCdXR0b24gc3R5bGU9e3N0eWxlcy5idXR0b259PkpvaW4gV2FpdGxpc3QhPC9CdXR0b24+XG4gICAgICAgIDwvTGluaz5cbiAgICAgIDwvRmxleD5cbiAgICA8L1N0YWNrPlxuICApO1xufVxuXG5jb25zdCBzdHlsZXMgPSB7XG4gIGJvbGQ6IHtcbiAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgZm9udFNpemU6IDI0LFxuICAgIGNvbG9yOiBcIiMwODFjMTVcIixcbiAgICBsaW5lSGVpZ2h0OiBcIjEuM2VtXCIsXG4gICAgZm9udEZhbWlseTogXCJQb3BwaW5zXCJcbiAgfSxcbiAgbm9ybWFsOiB7XG4gICAgZm9udFNpemU6IDE2LFxuICAgIGxpbmVIZWlnaHQ6IFwiMS41ZW1cIixcbiAgICB3aWR0aDogXCI3MCVcIlxuICB9LFxuICBtb2JpbGVOb3JtYWw6IHtcbiAgICBmb250U2l6ZTogMTYsXG4gICAgbGluZUhlaWdodDogXCIxLjVlbVwiLFxuICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIixcbiAgICBwYWRkaW5nVG9wOiAxMFxuICB9LFxuICBtb2JpbGVMYXJnZToge1xuICAgIGZvbnRXZWlnaHQ6IDgwMCxcbiAgICBmb250U2l6ZTogMzAsXG4gICAgbGluZUhlaWdodDogXCIxLjJlbVwiLFxuICAgIHRleHRBbGlnbjogXCJjZW50ZXJcIlxuICB9LFxuICBtb2JpbGVMb2dvOiB7XG4gICAgZm9udFdlaWdodDogNzAwLFxuICAgIGZvbnRTaXplOiAxOCxcbiAgICBsaW5lSGVpZ2h0OiBcIjEuM2VtXCJcbiAgfSxcbiAgc2VtaUJvbGQ6IHtcbiAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgZm9udFNpemU6IDE2LFxuICAgIGxpbmVIZWlnaHQ6IFwiMS41ZW1cIlxuICB9LFxuICB3ZWJDb250YWluZXI6IHtcbiAgICBmbGV4OiAxLFxuICAgIGp1c3RpZnlDb250ZW50OiBcInNwYWNlLWJldHdlZW5cIixcbiAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiXG4gIH0sXG4gIGxhcmdlTm9ybWFsOiB7XG4gICAgZm9udFNpemU6IDU1LFxuICAgIGxpbmVIZWlnaHQ6IFwiMS4yZW1cIlxuICB9LFxuICBsYXJnZUJvbGQ6IHtcbiAgICBmb250V2VpZ2h0OiA4MDAsXG4gICAgZm9udFNpemU6IDU1LFxuICAgIGxpbmVIZWlnaHQ6IFwiMS4yZW1cIlxuICB9LFxuICBidXR0b246IHtcbiAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiIzA4MWMxNVwiLFxuICAgIGNvbG9yOiBcIiNGRkZcIlxuICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ })

});