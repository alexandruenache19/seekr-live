(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8702:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ App; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: external "firebase/app"
var app_namespaceObject = require("firebase/app");;
var app_default = /*#__PURE__*/__webpack_require__.n(app_namespaceObject);
;// CONCATENATED MODULE: external "firebase/auth"
var auth_namespaceObject = require("firebase/auth");;
;// CONCATENATED MODULE: external "firebase/firestore"
var firestore_namespaceObject = require("firebase/firestore");;
;// CONCATENATED MODULE: external "firebase/storage"
var storage_namespaceObject = require("firebase/storage");;
;// CONCATENATED MODULE: external "firebase/analytics"
var analytics_namespaceObject = require("firebase/analytics");;
;// CONCATENATED MODULE: external "firebase/performance"
var performance_namespaceObject = require("firebase/performance");;
;// CONCATENATED MODULE: ./firebase/clientApp.js

 // If you need it

 // If you need it

 // If you need it

 // If you need it

 // If you need it

const clientCredentials = {
  apiKey: "AIzaSyAhpfn4y_u8T8MT9sVXfrZ_Hq3gP3s7AOg",
  authDomain: "seekr-live.firebaseapp.com",
  databaseURL: "https://seekr-live-default-rtdb.firebaseio.com",
  projectId: "seekr-live",
  storageBucket: "seekr-live.appspot.com",
  messagingSenderId: "729457766335",
  appId: "1:729457766335:web:06ca5153842eef5357fb0a",
  measurementId: "G-6DPMN8B0MW"
};

if (!(app_default()).apps.length) {
  app_default().initializeApp(clientCredentials); // // Check that `window` is in scope for the analytics module!
  // if (typeof window !== 'undefined') {
  //   // Enable analytics. https://firebase.google.com/docs/analytics/get-started
  //   if ('measurementId' in clientCredentials) {
  //     firebase.analytics()
  //     firebase.performance()
  //   }
  // }
}

/* harmony default export */ var clientApp = ((app_default()));
;// CONCATENATED MODULE: ./context/userContext.js



const UserContext = /*#__PURE__*/(0,external_react_.createContext)();
function UserContextComp({
  children
}) {
  const {
    0: user,
    1: setUser
  } = (0,external_react_.useState)(null);
  const {
    0: loadingUser,
    1: setLoadingUser
  } = (0,external_react_.useState)(true); // Helpful, to update the UI accordingly.

  (0,external_react_.useEffect)(() => {
    // Listen authenticated user
    const unsubscriber = clientApp.auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          // User is signed in.
          const {
            uid,
            displayName,
            email,
            photoURL
          } = user; // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()

          setUser({
            uid,
            displayName,
            email,
            photoURL
          });
        } else setUser(null);
      } catch (error) {// Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false);
      }
    }); // Unsubscribe auth listener on unmount

    return () => unsubscriber();
  }, []);
  return /*#__PURE__*/jsx_runtime_.jsx(UserContext.Provider, {
    value: {
      user,
      setUser,
      loadingUser
    },
    children: children
  });
} // Custom hook that shorthands the context!

const useUser = () => useContext(UserContext);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(3426);
;// CONCATENATED MODULE: external "@chakra-ui/theme-tools"
var theme_tools_namespaceObject = require("@chakra-ui/theme-tools");;
;// CONCATENATED MODULE: ./pages/_app.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const theme = (0,react_.extendTheme)({
  styles: {
    global: props => ({
      body: {
        fontFamily: "Poppins",
        color: "#081c15",
        lineHeight: "base"
      }
    })
  }
}); // Custom App to wrap it with context provider

function App({
  Component,
  pageProps
}) {
  return /*#__PURE__*/jsx_runtime_.jsx(react_.ChakraProvider, {
    theme: theme,
    children: /*#__PURE__*/jsx_runtime_.jsx(UserContextComp, {
      children: /*#__PURE__*/jsx_runtime_.jsx(Component, _objectSpread({}, pageProps))
    })
  });
}

/***/ }),

/***/ 3426:
/***/ (function(module) {

"use strict";
module.exports = require("@chakra-ui/react");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(8702));
module.exports = __webpack_exports__;

})();