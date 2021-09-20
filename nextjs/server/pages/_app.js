/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function() {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/userContext.js":
/*!********************************!*\
  !*** ./context/userContext.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"UserContext\": function() { return /* binding */ UserContext; },\n/* harmony export */   \"default\": function() { return /* binding */ UserContextComp; },\n/* harmony export */   \"useUser\": function() { return /* binding */ useUser; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _firebase_clientApp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firebase/clientApp */ \"./firebase/clientApp.js\");\n\nvar _jsxFileName = \"/Users/alexandruenache/Documents/seekr-web/context/userContext.js\";\n\n\nconst UserContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction UserContextComp({\n  children\n}) {\n  const {\n    0: user,\n    1: setUser\n  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n  const {\n    0: loadingUser,\n    1: setLoadingUser\n  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true); // Helpful, to update the UI accordingly.\n\n  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {\n    // Listen authenticated user\n    const unsubscriber = _firebase_clientApp__WEBPACK_IMPORTED_MODULE_2__.default.auth().onAuthStateChanged(async user => {\n      try {\n        if (user) {\n          // User is signed in.\n          const {\n            uid,\n            displayName,\n            email,\n            photoURL\n          } = user; // You could also look for the user doc in your Firestore (if you have one):\n          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()\n\n          setUser({\n            uid,\n            displayName,\n            email,\n            photoURL\n          });\n        } else setUser(null);\n      } catch (error) {// Most probably a connection error. Handle appropriately.\n      } finally {\n        setLoadingUser(false);\n      }\n    }); // Unsubscribe auth listener on unmount\n\n    return () => unsubscriber();\n  }, []);\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(UserContext.Provider, {\n    value: {\n      user,\n      setUser,\n      loadingUser\n    },\n    children: children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 33,\n    columnNumber: 5\n  }, this);\n} // Custom hook that shorthands the context!\n\nconst useUser = () => (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(UserContext);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0L3VzZXJDb250ZXh0LmpzPzQzNmUiXSwibmFtZXMiOlsiVXNlckNvbnRleHQiLCJjcmVhdGVDb250ZXh0IiwiVXNlckNvbnRleHRDb21wIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsInVzZVN0YXRlIiwibG9hZGluZ1VzZXIiLCJzZXRMb2FkaW5nVXNlciIsInVzZUVmZmVjdCIsInVuc3Vic2NyaWJlciIsImZpcmViYXNlIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwidWlkIiwiZGlzcGxheU5hbWUiLCJlbWFpbCIsInBob3RvVVJMIiwiZXJyb3IiLCJ1c2VVc2VyIiwidXNlQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFTyxNQUFNQSxXQUFXLGdCQUFHQyxvREFBYSxFQUFqQztBQUVRLFNBQVNDLGVBQVQsQ0FBeUI7QUFBRUM7QUFBRixDQUF6QixFQUF1QztBQUNwRCxRQUFNO0FBQUEsT0FBQ0MsSUFBRDtBQUFBLE9BQU9DO0FBQVAsTUFBa0JDLCtDQUFRLENBQUMsSUFBRCxDQUFoQztBQUNBLFFBQU07QUFBQSxPQUFDQyxXQUFEO0FBQUEsT0FBY0M7QUFBZCxNQUFnQ0YsK0NBQVEsQ0FBQyxJQUFELENBQTlDLENBRm9ELENBRUM7O0FBRXJERyxrREFBUyxDQUFDLE1BQU07QUFDZDtBQUNBLFVBQU1DLFlBQVksR0FBR0MsNkRBQUEsR0FBZ0JDLGtCQUFoQixDQUFtQyxNQUFPUixJQUFQLElBQWdCO0FBQ3RFLFVBQUk7QUFDRixZQUFJQSxJQUFKLEVBQVU7QUFDUjtBQUNBLGdCQUFNO0FBQUVTLGVBQUY7QUFBT0MsdUJBQVA7QUFBb0JDLGlCQUFwQjtBQUEyQkM7QUFBM0IsY0FBd0NaLElBQTlDLENBRlEsQ0FHUjtBQUNBOztBQUNBQyxpQkFBTyxDQUFDO0FBQUVRLGVBQUY7QUFBT0MsdUJBQVA7QUFBb0JDLGlCQUFwQjtBQUEyQkM7QUFBM0IsV0FBRCxDQUFQO0FBQ0QsU0FORCxNQU1PWCxPQUFPLENBQUMsSUFBRCxDQUFQO0FBQ1IsT0FSRCxDQVFFLE9BQU9ZLEtBQVAsRUFBYyxDQUNkO0FBQ0QsT0FWRCxTQVVVO0FBQ1JULHNCQUFjLENBQUMsS0FBRCxDQUFkO0FBQ0Q7QUFDRixLQWRvQixDQUFyQixDQUZjLENBa0JkOztBQUNBLFdBQU8sTUFBTUUsWUFBWSxFQUF6QjtBQUNELEdBcEJRLEVBb0JOLEVBcEJNLENBQVQ7QUFzQkEsc0JBQ0UsOERBQUMsV0FBRCxDQUFhLFFBQWI7QUFBc0IsU0FBSyxFQUFFO0FBQUVOLFVBQUY7QUFBUUMsYUFBUjtBQUFpQkU7QUFBakIsS0FBN0I7QUFBQSxjQUNHSjtBQURIO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFERjtBQUtELEMsQ0FFRDs7QUFDTyxNQUFNZSxPQUFPLEdBQUcsTUFBTUMsaURBQVUsQ0FBQ25CLFdBQUQsQ0FBaEMiLCJmaWxlIjoiLi9jb250ZXh0L3VzZXJDb250ZXh0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgY3JlYXRlQ29udGV4dCwgdXNlQ29udGV4dCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJy4uL2ZpcmViYXNlL2NsaWVudEFwcCdcblxuZXhwb3J0IGNvbnN0IFVzZXJDb250ZXh0ID0gY3JlYXRlQ29udGV4dCgpXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFVzZXJDb250ZXh0Q29tcCh7IGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGUobnVsbClcbiAgY29uc3QgW2xvYWRpbmdVc2VyLCBzZXRMb2FkaW5nVXNlcl0gPSB1c2VTdGF0ZSh0cnVlKSAvLyBIZWxwZnVsLCB0byB1cGRhdGUgdGhlIFVJIGFjY29yZGluZ2x5LlxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gTGlzdGVuIGF1dGhlbnRpY2F0ZWQgdXNlclxuICAgIGNvbnN0IHVuc3Vic2NyaWJlciA9IGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoYXN5bmMgKHVzZXIpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgLy8gVXNlciBpcyBzaWduZWQgaW4uXG4gICAgICAgICAgY29uc3QgeyB1aWQsIGRpc3BsYXlOYW1lLCBlbWFpbCwgcGhvdG9VUkwgfSA9IHVzZXJcbiAgICAgICAgICAvLyBZb3UgY291bGQgYWxzbyBsb29rIGZvciB0aGUgdXNlciBkb2MgaW4geW91ciBGaXJlc3RvcmUgKGlmIHlvdSBoYXZlIG9uZSk6XG4gICAgICAgICAgLy8gY29uc3QgdXNlckRvYyA9IGF3YWl0IGZpcmViYXNlLmZpcmVzdG9yZSgpLmRvYyhgdXNlcnMvJHt1aWR9YCkuZ2V0KClcbiAgICAgICAgICBzZXRVc2VyKHsgdWlkLCBkaXNwbGF5TmFtZSwgZW1haWwsIHBob3RvVVJMIH0pXG4gICAgICAgIH0gZWxzZSBzZXRVc2VyKG51bGwpXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBNb3N0IHByb2JhYmx5IGEgY29ubmVjdGlvbiBlcnJvci4gSGFuZGxlIGFwcHJvcHJpYXRlbHkuXG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRMb2FkaW5nVXNlcihmYWxzZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gVW5zdWJzY3JpYmUgYXV0aCBsaXN0ZW5lciBvbiB1bm1vdW50XG4gICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlcigpXG4gIH0sIFtdKVxuXG4gIHJldHVybiAoXG4gICAgPFVzZXJDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHVzZXIsIHNldFVzZXIsIGxvYWRpbmdVc2VyIH19PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvVXNlckNvbnRleHQuUHJvdmlkZXI+XG4gIClcbn1cblxuLy8gQ3VzdG9tIGhvb2sgdGhhdCBzaG9ydGhhbmRzIHRoZSBjb250ZXh0IVxuZXhwb3J0IGNvbnN0IHVzZVVzZXIgPSAoKSA9PiB1c2VDb250ZXh0KFVzZXJDb250ZXh0KVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/userContext.js\n");

/***/ }),

/***/ "./firebase/clientApp.js":
/*!*******************************!*\
  !*** ./firebase/clientApp.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(firebase_firestore__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/storage */ \"firebase/storage\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(firebase_storage__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/analytics */ \"firebase/analytics\");\n/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(firebase_analytics__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var firebase_performance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/performance */ \"firebase/performance\");\n/* harmony import */ var firebase_performance__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase_performance__WEBPACK_IMPORTED_MODULE_5__);\n\n // If you need it\n\n // If you need it\n\n // If you need it\n\n // If you need it\n\n // If you need it\n\nconst clientCredentials = {\n  apiKey: \"AIzaSyAhpfn4y_u8T8MT9sVXfrZ_Hq3gP3s7AOg\",\n  authDomain: \"seekr-live.firebaseapp.com\",\n  databaseURL: \"https://seekr-live-default-rtdb.firebaseio.com\",\n  projectId: \"seekr-live\",\n  storageBucket: \"seekr-live.appspot.com\",\n  messagingSenderId: \"729457766335\",\n  appId: \"1:729457766335:web:06ca5153842eef5357fb0a\",\n  measurementId: \"G-6DPMN8B0MW\"\n};\n\nif (!(firebase_app__WEBPACK_IMPORTED_MODULE_0___default().apps.length)) {\n  firebase_app__WEBPACK_IMPORTED_MODULE_0___default().initializeApp(clientCredentials); // // Check that `window` is in scope for the analytics module!\n  // if (typeof window !== 'undefined') {\n  //   // Enable analytics. https://firebase.google.com/docs/analytics/get-started\n  //   if ('measurementId' in clientCredentials) {\n  //     firebase.analytics()\n  //     firebase.performance()\n  //   }\n  // }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ((firebase_app__WEBPACK_IMPORTED_MODULE_0___default()));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9maXJlYmFzZS9jbGllbnRBcHAuanM/M2QzMSJdLCJuYW1lcyI6WyJjbGllbnRDcmVkZW50aWFscyIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsImZpcmViYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Q0FDd0I7O0NBQ0s7O0NBQ0Y7O0NBQ0U7O0NBQ0U7O0FBRS9CLE1BQU1BLGlCQUFpQixHQUFHO0FBQ3hCQyxRQUFNLEVBQUUseUNBRGdCO0FBRXhCQyxZQUFVLEVBQUUsNEJBRlk7QUFHeEJDLGFBQVcsRUFBRSxnREFIVztBQUl4QkMsV0FBUyxFQUFFLFlBSmE7QUFLeEJDLGVBQWEsRUFBRSx3QkFMUztBQU14QkMsbUJBQWlCLEVBQUUsY0FOSztBQU94QkMsT0FBSyxFQUFFLDJDQVBpQjtBQVF4QkMsZUFBYSxFQUFFO0FBUlMsQ0FBMUI7O0FBV0EsSUFBSSxDQUFDQyxpRUFBTCxFQUEyQjtBQUN6QkEsbUVBQUEsQ0FBdUJULGlCQUF2QixFQUR5QixDQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7O0FBRUQsK0RBQWVTLHFEQUFmIiwiZmlsZSI6Ii4vZmlyZWJhc2UvY2xpZW50QXBwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpcmViYXNlIGZyb20gXCJmaXJlYmFzZS9hcHBcIjtcbmltcG9ydCBcImZpcmViYXNlL2F1dGhcIjsgLy8gSWYgeW91IG5lZWQgaXRcbmltcG9ydCBcImZpcmViYXNlL2ZpcmVzdG9yZVwiOyAvLyBJZiB5b3UgbmVlZCBpdFxuaW1wb3J0IFwiZmlyZWJhc2Uvc3RvcmFnZVwiOyAvLyBJZiB5b3UgbmVlZCBpdFxuaW1wb3J0IFwiZmlyZWJhc2UvYW5hbHl0aWNzXCI7IC8vIElmIHlvdSBuZWVkIGl0XG5pbXBvcnQgXCJmaXJlYmFzZS9wZXJmb3JtYW5jZVwiOyAvLyBJZiB5b3UgbmVlZCBpdFxuXG5jb25zdCBjbGllbnRDcmVkZW50aWFscyA9IHtcbiAgYXBpS2V5OiBcIkFJemFTeUFocGZuNHlfdThUOE1UOXNWWGZyWl9IcTNnUDNzN0FPZ1wiLFxuICBhdXRoRG9tYWluOiBcInNlZWtyLWxpdmUuZmlyZWJhc2VhcHAuY29tXCIsXG4gIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vc2Vla3ItbGl2ZS1kZWZhdWx0LXJ0ZGIuZmlyZWJhc2Vpby5jb21cIixcbiAgcHJvamVjdElkOiBcInNlZWtyLWxpdmVcIixcbiAgc3RvcmFnZUJ1Y2tldDogXCJzZWVrci1saXZlLmFwcHNwb3QuY29tXCIsXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjcyOTQ1Nzc2NjMzNVwiLFxuICBhcHBJZDogXCIxOjcyOTQ1Nzc2NjMzNTp3ZWI6MDZjYTUxNTM4NDJlZWY1MzU3ZmIwYVwiLFxuICBtZWFzdXJlbWVudElkOiBcIkctNkRQTU44QjBNV1wiXG59O1xuXG5pZiAoIWZpcmViYXNlLmFwcHMubGVuZ3RoKSB7XG4gIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY2xpZW50Q3JlZGVudGlhbHMpO1xuICAvLyAvLyBDaGVjayB0aGF0IGB3aW5kb3dgIGlzIGluIHNjb3BlIGZvciB0aGUgYW5hbHl0aWNzIG1vZHVsZSFcbiAgLy8gaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIC8vICAgLy8gRW5hYmxlIGFuYWx5dGljcy4gaHR0cHM6Ly9maXJlYmFzZS5nb29nbGUuY29tL2RvY3MvYW5hbHl0aWNzL2dldC1zdGFydGVkXG4gIC8vICAgaWYgKCdtZWFzdXJlbWVudElkJyBpbiBjbGllbnRDcmVkZW50aWFscykge1xuICAvLyAgICAgZmlyZWJhc2UuYW5hbHl0aWNzKClcbiAgLy8gICAgIGZpcmViYXNlLnBlcmZvcm1hbmNlKClcbiAgLy8gICB9XG4gIC8vIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZmlyZWJhc2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./firebase/clientApp.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ App; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _context_userContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../context/userContext */ \"./context/userContext.js\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles.css */ \"./pages/styles.css\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @chakra-ui/theme-tools */ \"@chakra-ui/theme-tools\");\n/* harmony import */ var _chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_chakra_ui_theme_tools__WEBPACK_IMPORTED_MODULE_4__);\n\nvar _jsxFileName = \"/Users/alexandruenache/Documents/seekr-web/pages/_app.js\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.extendTheme)({\n  styles: {\n    global: props => ({\n      body: {\n        fontFamily: \"Poppins\",\n        color: \"#081c15\",\n        lineHeight: \"base\"\n      }\n    })\n  }\n}); // Custom App to wrap it with context provider\n\nfunction App({\n  Component,\n  pageProps\n}) {\n  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.ChakraProvider, {\n    theme: theme,\n    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_userContext__WEBPACK_IMPORTED_MODULE_1__.default, {\n      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 23,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 22,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 21,\n    columnNumber: 5\n  }, this);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2Q1MzAiXSwibmFtZXMiOlsidGhlbWUiLCJleHRlbmRUaGVtZSIsInN0eWxlcyIsImdsb2JhbCIsInByb3BzIiwiYm9keSIsImZvbnRGYW1pbHkiLCJjb2xvciIsImxpbmVIZWlnaHQiLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTUEsS0FBSyxHQUFHQyw2REFBVyxDQUFDO0FBQ3hCQyxRQUFNLEVBQUU7QUFDTkMsVUFBTSxFQUFFQyxLQUFLLEtBQUs7QUFDaEJDLFVBQUksRUFBRTtBQUNKQyxrQkFBVSxFQUFFLFNBRFI7QUFFSkMsYUFBSyxFQUFFLFNBRkg7QUFHSkMsa0JBQVUsRUFBRTtBQUhSO0FBRFUsS0FBTDtBQURQO0FBRGdCLENBQUQsQ0FBekIsQyxDQVlBOztBQUNlLFNBQVNDLEdBQVQsQ0FBYTtBQUFFQyxXQUFGO0FBQWFDO0FBQWIsQ0FBYixFQUF1QztBQUNwRCxzQkFDRSw4REFBQyw0REFBRDtBQUFnQixTQUFLLEVBQUVYLEtBQXZCO0FBQUEsMkJBQ0UsOERBQUMseURBQUQ7QUFBQSw2QkFDRSw4REFBQyxTQUFELG9CQUFlVyxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBT0QiLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFVzZXJQcm92aWRlciBmcm9tIFwiLi4vY29udGV4dC91c2VyQ29udGV4dFwiO1xuaW1wb3J0IHsgQ2hha3JhUHJvdmlkZXIgfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IFwiLi9zdHlsZXMuY3NzXCI7XG5pbXBvcnQgeyBleHRlbmRUaGVtZSB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgeyBtb2RlIH0gZnJvbSBcIkBjaGFrcmEtdWkvdGhlbWUtdG9vbHNcIjtcbmNvbnN0IHRoZW1lID0gZXh0ZW5kVGhlbWUoe1xuICBzdHlsZXM6IHtcbiAgICBnbG9iYWw6IHByb3BzID0+ICh7XG4gICAgICBib2R5OiB7XG4gICAgICAgIGZvbnRGYW1pbHk6IFwiUG9wcGluc1wiLFxuICAgICAgICBjb2xvcjogXCIjMDgxYzE1XCIsXG4gICAgICAgIGxpbmVIZWlnaHQ6IFwiYmFzZVwiXG4gICAgICB9XG4gICAgfSlcbiAgfVxufSk7XG5cbi8vIEN1c3RvbSBBcHAgdG8gd3JhcCBpdCB3aXRoIGNvbnRleHQgcHJvdmlkZXJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8Q2hha3JhUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgIDxVc2VyUHJvdmlkZXI+XG4gICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbiAgICAgIDwvVXNlclByb3ZpZGVyPlxuICAgIDwvQ2hha3JhUHJvdmlkZXI+XG4gICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./pages/styles.css":
/*!**************************!*\
  !*** ./pages/styles.css ***!
  \**************************/
/***/ (function() {



/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = require("@chakra-ui/react");;

/***/ }),

/***/ "@chakra-ui/theme-tools":
/*!*****************************************!*\
  !*** external "@chakra-ui/theme-tools" ***!
  \*****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("@chakra-ui/theme-tools");;

/***/ }),

/***/ "firebase/analytics":
/*!*************************************!*\
  !*** external "firebase/analytics" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/analytics");;

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/firestore");;

/***/ }),

/***/ "firebase/performance":
/*!***************************************!*\
  !*** external "firebase/performance" ***!
  \***************************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/performance");;

/***/ }),

/***/ "firebase/storage":
/*!***********************************!*\
  !*** external "firebase/storage" ***!
  \***********************************/
/***/ (function(module) {

"use strict";
module.exports = require("firebase/storage");;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-dev-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();