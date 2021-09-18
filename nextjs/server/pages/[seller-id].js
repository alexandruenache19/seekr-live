(function() {
var exports = {};
exports.id = 318;
exports.ids = [318];
exports.modules = {

/***/ 6427:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _seller_id_; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
;// CONCATENATED MODULE: external "next/router"
var router_namespaceObject = require("next/router");;
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(3426);
;// CONCATENATED MODULE: external "react-player"
var external_react_player_namespaceObject = require("react-player");;
var external_react_player_default = /*#__PURE__*/__webpack_require__.n(external_react_player_namespaceObject);
;// CONCATENATED MODULE: external "react-lottie"
var external_react_lottie_namespaceObject = require("react-lottie");;
var external_react_lottie_default = /*#__PURE__*/__webpack_require__.n(external_react_lottie_namespaceObject);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.esm.js
var index_esm = __webpack_require__(9583);
// EXTERNAL MODULE: ./node_modules/react-icons/fi/index.esm.js
var fi_index_esm = __webpack_require__(6893);
;// CONCATENATED MODULE: external "react-copy-to-clipboard"
var external_react_copy_to_clipboard_namespaceObject = require("react-copy-to-clipboard");;
;// CONCATENATED MODULE: external "react-share"
var external_react_share_namespaceObject = require("react-share");;
// EXTERNAL MODULE: ./node_modules/react-icons/ai/index.esm.js
var ai_index_esm = __webpack_require__(8193);
;// CONCATENATED MODULE: ./components/ShareModal/index.js



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }









const ShareButton = (_ref) => {
  let {
    child,
    text,
    isOnMobile,
    item
  } = _ref,
      rest = _objectWithoutProperties(_ref, ["child", "text", "isOnMobile", "item"]);

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, _objectSpread(_objectSpread({
    m: 2,
    w: isOnMobile ? "20%" : "6em",
    position: "relative",
    justify: "center",
    align: "center" // onClick={() =>
    //
    // }

  }, rest), {}, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Box, {
      d: "flex",
      w: "100%",
      flexDir: "column",
      h: !isOnMobile && "6em",
      shadow: !isOnMobile && "md",
      borderRadius: "3em",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      bg: "#FFF",
      color: "#000",
      cursor: "pointer",
      children: child
    }), !isOnMobile && /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
      fontSize: "sm",
      children: text
    })]
  }));
};

const ShareContent = (_ref2) => {
  let {
    auth,
    item,
    openAuthModal,
    isOnMobile
  } = _ref2,
      rest = _objectWithoutProperties(_ref2, ["auth", "item", "openAuthModal", "isOnMobile"]);

  const toast = (0,react_.useToast)();
  const {
    0: loading,
    1: setLoading
  } = (0,external_react_.useState)(false);
  const iconSize = isOnMobile ? "2em" : "3em";
  const url = `https://snippet.club/snippet/${item.id}`;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, _objectSpread(_objectSpread({}, rest), {}, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
      justify: "space-between",
      align: "center",
      children: [/*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        child: /*#__PURE__*/jsx_runtime_.jsx(external_react_share_namespaceObject.TwitterShareButton, {
          title: "A snippet via @snippet_club",
          url: url,
          children: /*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiTwitter */.Ccr, {
            size: iconSize
          })
        }),
        item: item,
        text: "Twitter",
        isOnMobile: isOnMobile
      }), /*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        child: /*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiInstagram */.JID, {
          size: iconSize
        }),
        text: "Instagram",
        isOnMobile: isOnMobile
      }), /*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        child: /*#__PURE__*/jsx_runtime_.jsx(external_react_share_namespaceObject.FacebookShareButton, {
          url: url,
          children: /*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiFacebook */.Bsb, {
            size: iconSize
          })
        }),
        item: item,
        text: "Facebook",
        isOnMobile: isOnMobile
      }), /*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        child: /*#__PURE__*/jsx_runtime_.jsx(external_react_share_namespaceObject.LinkedinShareButton, {
          url: url,
          children: /*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiLinkedin */.qOw, {
            size: iconSize
          })
        }),
        item: item,
        text: "LinkedIn",
        isOnMobile: isOnMobile
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
      justify: "space-between",
      align: "center",
      children: [/*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        isOnMobile: isOnMobile,
        item: item,
        child: /*#__PURE__*/jsx_runtime_.jsx(external_react_share_namespaceObject.RedditShareButton, {
          url: url,
          children: /*#__PURE__*/jsx_runtime_.jsx(ai_index_esm/* AiOutlineReddit */.Shv, {
            size: iconSize
          })
        }),
        text: "Reddit"
      }), /*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        isOnMobile: isOnMobile,
        item: item,
        child: /*#__PURE__*/jsx_runtime_.jsx(external_react_share_namespaceObject.TelegramShareButton, {
          url: url,
          children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaTelegramPlane */.AGi, {
            size: iconSize
          })
        }),
        text: "Telegram"
      }), /*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        isOnMobile: isOnMobile,
        item: item,
        child: /*#__PURE__*/jsx_runtime_.jsx(external_react_copy_to_clipboard_namespaceObject.CopyToClipboard, {
          text: url,
          onCopy: () => toast({
            title: "Copied!",
            status: "success",
            duration: 1000,
            isClosable: false
          }),
          children: /*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiLink */.XKb, {
            size: iconSize
          })
        }),
        text: "Copy Link"
      }), /*#__PURE__*/jsx_runtime_.jsx(ShareButton, {
        isOnMobile: isOnMobile,
        item: item,
        child: /*#__PURE__*/jsx_runtime_.jsx(external_react_share_namespaceObject.FacebookMessengerShareButton, {
          appId: 1190712697719040,
          url: url,
          children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaFacebookMessenger */.sAh, {
            size: iconSize
          })
        }),
        text: "Messenger"
      })]
    })]
  }));
};

const ShareModal = ({
  title,
  item,
  openAuthModal,
  isOnMobile
}, ref) => {
  const {
    onClose,
    onOpen,
    isOpen
  } = (0,react_.useDisclosure)();
  (0,external_react_.useImperativeHandle)(ref, () => ({
    openModal() {
      onOpen();
    }

  }));
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Modal, {
    enableBodyScroll: false,
    disableBodyScroll: false,
    isCentered: true,
    isOpen: isOpen,
    onClose: onClose,
    size: "2xl",
    children: [/*#__PURE__*/jsx_runtime_.jsx(react_.ModalOverlay, {}), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.ModalContent, _objectSpread(_objectSpread({
      p: 8,
      borderRadius: 30,
      justify: "center",
      align: "center"
    }, styles), {}, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(react_.ModalHeader, {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        d: "flex",
        justifyContent: "center",
        mb: "1rem",
        children: title || "Share this snippet"
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.ModalBody, {
        p: isOnMobile && "0px",
        children: /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
          align: "center",
          justify: "center",
          children: /*#__PURE__*/jsx_runtime_.jsx(ShareContent, {
            isOnMobile: isOnMobile,
            w: "100%",
            item: item,
            openAuthModal: openAuthModal
          })
        })
      })]
    }))]
  });
};

const styles = {
  loadingIcon: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  loadingDiv: {
    zIndex: 1000,
    backdropFilter: "blur(6px)",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    background: "rgba(0,0,0,0.3)",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};
/* harmony default export */ var components_ShareModal = (/*#__PURE__*/(0,external_react_.forwardRef)(ShareModal));
;// CONCATENATED MODULE: ./pages/[seller-id]/live.json
var live_namespaceObject = JSON.parse('{"v":"5.6.4","fr":30,"ip":0,"op":87,"w":24,"h":24,"nm":"Comp 1","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Shape Layer 2","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[12,12,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":1,"k":[{"i":{"x":[0.348,0.348],"y":[1,1]},"o":{"x":[0,0],"y":[0,0]},"t":0,"s":[9,9],"e":[14,14]},{"i":{"x":[1,1],"y":[1,1]},"o":{"x":[0.65,0.65],"y":[0,0]},"t":45,"s":[14,14],"e":[9,9]},{"t":84}],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[1,0,0,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":150,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Shape Layer 1","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[12,12,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[18,18],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"st","c":{"a":0,"k":[1,0,0,1],"ix":3},"o":{"a":0,"k":20,"ix":4},"w":{"a":0,"k":2,"ix":5},"lc":1,"lj":1,"ml":4,"bm":0,"nm":"Stroke 1","mn":"ADBE Vector Graphic - Stroke","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Ellipse 1","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":150,"st":0,"bm":0}],"markers":[]}');
var _seller_id_live_namespaceObject = /*#__PURE__*/__webpack_require__.t(live_namespaceObject, 2);
;// CONCATENATED MODULE: ./pages/[seller-id]/index.js












class SellerProfile extends external_react_.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isOnMobile: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: false,
      isOnMobile: window.innerWidth <= 780
    });
  }

  render() {
    const {
      loading,
      isOnMobile
    } = this.state;

    if (loading) {
      return /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
        bg: "#FFF",
        w: "100vw",
        h: "100vh",
        justify: "center",
        align: "center",
        children: /*#__PURE__*/jsx_runtime_.jsx(react_.Spinner, {
          size: "xl",
          thickness: "3px"
        })
      });
    }

    if (isOnMobile) {
      return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
        h: "100vh",
        w: "100vw",
        p: "10px",
        bg: "#FFF",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
          h: "60vh",
          bg: "#EEF2F8",
          borderRadius: "xl",
          overflow: "hidden",
          children: [/*#__PURE__*/jsx_runtime_.jsx((external_react_player_default()), {
            className: "react-player",
            url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
            width: "100%",
            height: "100%",
            playing: true
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
            position: "absolute",
            left: "30px",
            borderRadius: "xl",
            p: "10px",
            bg: "#FFF",
            styles: {
              justifyContent: "center",
              alignItems: "center"
            },
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Avatar, {
              name: "Alex getInitialProps",
              src: "https://bit.ly/tioluwani-kolawole"
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
              justify: "center",
              pl: "5px",
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                fontWeight: "bold",
                children: "@maria"
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
                style: {
                  marginTop: 0
                },
                justify: "space-between",
                children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
                  children: [/*#__PURE__*/jsx_runtime_.jsx((external_react_lottie_default()), {
                    options: {
                      loop: true,
                      autoplay: true,
                      animationData: _seller_id_live_namespaceObject
                    },
                    height: 20,
                    width: 20
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    pl: "4px",
                    children: "Live"
                  })]
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
                  ml: "10px",
                  textAlign: "center",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiEye */.rDJ, {
                    size: 14
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    textAlign: "center",
                    pl: "4px",
                    children: "22"
                  })]
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
          p: "10px",
          h: "30vh",
          bg: "#EEF2F8",
          borderRadius: "xl",
          style: {
            justifyContent: "space-between"
          },
          children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.List, {
            overflow: "scroll",
            spacing: 3,
            pb: "10px",
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.ListItem, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
                justify: "flex-start",
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Avatar, {
                  name: "Alex getInitialProps",
                  src: "https://bit.ly/tioluwani-kolawole"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
                  p: "10px",
                  justify: "center",
                  ml: "5px",
                  bg: "#FFF",
                  borderRadius: "xl",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    color: "#000",
                    fontWeight: "bold",
                    children: "@remus"
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    margin: "0px",
                    color: "#000",
                    children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
                  })]
                })]
              })
            }), /*#__PURE__*/jsx_runtime_.jsx(react_.ListItem, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
                justify: "flex-start",
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Avatar, {
                  name: "Alex getInitialProps",
                  src: "https://bit.ly/tioluwani-kolawole"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
                  p: "10px",
                  justify: "center",
                  ml: "5px",
                  bg: "#FFF",
                  borderRadius: "xl",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    color: "#000",
                    fontWeight: "bold",
                    children: "@remus"
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    margin: "0px",
                    color: "#000",
                    children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
                  })]
                })]
              })
            })]
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
            borderRadius: "xl",
            p: "10px",
            bg: "#FFF",
            style: {
              justifyContent: "space-between",
              marginTop: 0
            },
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Input, {
              placeholder: "write your message..."
            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
              style: {
                marginLeft: 10
              },
              children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaRegPaperPlane */.P58, {
                size: "22"
              })
            })]
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(react_.Flex, {
          p: "10px",
          h: "10vh",
          w: "100%",
          bg: "#EEF2F8",
          borderRadius: "xl",
          overflow: "hidden",
          style: {
            justifyContent: "space-between"
          },
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
            w: "100%",
            p: "10px",
            bg: "#FFF",
            style: {
              justifyContent: "space-between"
            },
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
              w: "100px",
              justify: "space-between",
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                size: "sm",
                children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaMinus */.iFH, {
                  size: 14
                })
              }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                fontSize: "xl",
                children: "1"
              }), /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                size: "sm",
                children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaPlus */.wEH, {
                  size: 14
                })
              })]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                fontSize: 22,
                children: "50"
              }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                fontWeight: "light",
                fontSize: 8,
                children: "$"
              })]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Button, {
              style: {
                marginLeft: 10,
                justifyContent: "space-between"
              },
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                pr: "10px",
                children: " Buy"
              }), /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaArrowRight */.Z1Y, {
                size: 14
              })]
            })]
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(components_ShareModal, {
          ref: ref => {
            this.shareModal = ref;
          },
          item: {},
          isOnMobile: isOnMobile
        })]
      });
    }

    return /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
      bg: "#FFF",
      h: "100vh",
      w: "100vw",
      justify: "space-between",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
        w: "70vw",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
          justify: "space-between",
          alignItems: "center",
          p: "20px",
          h: "15vh",
          w: "100%",
          children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
            fontWeight: "bold",
            fontSize: "2xl",
            children: "seekr."
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
            h: "100%",
            p: "10px",
            w: "85%",
            bg: "#F2F4F9",
            borderRadius: "xl",
            overflow: "hidden",
            justify: "space-between",
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                fontWeight: "bold",
                fontSize: "lg",
                children: "Summer sale by @maria"
              }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                color: "#718096",
                fontSize: "sm",
                children: "Cosemtics"
              })]
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
              children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Button // w="3em"
              , {
                h: "3em",
                shadow: "md",
                borderRadius: "1.5em",
                bg: "#FFF",
                onClick: () => {
                  this.shareModal.openModal();
                },
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                  pr: "5px",
                  children: "Follow"
                }), /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaPlus */.wEH, {
                  size: 26
                })]
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Button // w="3em"
              , {
                h: "3em",
                shadow: "md",
                ml: "1em",
                borderRadius: "1.5em",
                bg: "#FFF",
                onClick: () => {
                  this.shareModal.openModal();
                },
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                  pr: "5px",
                  children: "Share"
                }), /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaShareSquare */.ZH2, {
                  size: 30
                })]
              })]
            })]
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx(react_.Center, {
          p: "20px",
          pt: "0px",
          pb: "0px",
          h: "70vh",
          w: "100%",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
            h: "100%",
            w: "100%",
            bg: "#F2F4F9",
            borderRadius: "xl",
            overflow: "hidden",
            children: [/*#__PURE__*/jsx_runtime_.jsx((external_react_player_default()), {
              className: "react-player",
              url: "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
              width: "100%",
              height: "100%",
              playing: true
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
              position: "absolute",
              left: "40px",
              top: "130px",
              borderRadius: "xl",
              p: "10px",
              bg: "#FFF",
              styles: {
                justifyContent: "center",
                alignItems: "center"
              },
              children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Avatar, {
                name: "Alex getInitialProps",
                src: "https://bit.ly/tioluwani-kolawole"
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
                justify: "center",
                pl: "5px",
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                  fontWeight: "bold",
                  children: "@maria"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
                  style: {
                    marginTop: 0
                  },
                  justify: "space-between",
                  children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
                    children: [/*#__PURE__*/jsx_runtime_.jsx((external_react_lottie_default()), {
                      options: {
                        loop: true,
                        autoplay: true,
                        animationData: _seller_id_live_namespaceObject
                      },
                      height: 20,
                      width: 20
                    }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                      pl: "4px",
                      children: "Live"
                    })]
                  }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
                    ml: "10px",
                    textAlign: "center",
                    children: [/*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiEye */.rDJ, {
                      size: 14
                    }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                      textAlign: "center",
                      pl: "4px",
                      children: "22"
                    })]
                  })]
                })]
              })]
            })]
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(react_.Center, {
          p: "20px",
          h: "15vh",
          w: "100%",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
            h: "100%",
            w: "100%",
            p: "10px",
            bg: "#F2F4F9",
            borderRadius: "xl",
            overflow: "hidden",
            style: {
              justifyContent: "space-between",
              marginTop: 0
            },
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
              w: "3em",
              h: "3em",
              shadow: "md",
              borderRadius: "1.5em",
              bg: "#FFF",
              onClick: () => {
                this.shareModal.openModal();
              },
              children: /*#__PURE__*/jsx_runtime_.jsx(fi_index_esm/* FiShare */.A8q, {
                size: 30
              })
            }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
              w: "30vw",
              borderRadius: "xl",
              p: "10px",
              bg: "#FFF",
              justifyContent: "space-between",
              children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
                justify: "space-between",
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                  size: "sm",
                  children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaMinus */.iFH, {
                    size: 14
                  })
                }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                  px: "10px",
                  fontSize: "xl",
                  children: "1"
                }), /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                  size: "sm",
                  children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaPlus */.wEH, {
                    size: 14
                  })
                })]
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Center, {
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                  fontSize: 22,
                  children: "50"
                }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                  fontWeight: "light",
                  fontSize: 8,
                  children: "$"
                })]
              }), /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
                children: /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                  pr: "10px",
                  children: "Buy Product"
                })
              })]
            })]
          })
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx(react_.Center, {
        p: "20px",
        pl: "0px",
        h: "100vh",
        w: "30vw",
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
          h: "100%",
          p: "20px",
          w: "100%",
          bg: "#EEF2F8",
          borderRadius: "xl",
          style: {
            justifyContent: "space-between"
          },
          children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
            color: "#000",
            fontWeight: "bold",
            children: "Chat with Maria"
          }), /*#__PURE__*/jsx_runtime_.jsx(react_.List, {
            pb: "10px",
            overflow: "scroll",
            spacing: 3,
            children: /*#__PURE__*/jsx_runtime_.jsx(react_.ListItem, {
              children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
                justify: "flex-start",
                children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Avatar, {
                  name: "Alex getInitialProps",
                  src: "https://bit.ly/tioluwani-kolawole"
                }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Stack, {
                  p: "10px",
                  justify: "center",
                  ml: "5px",
                  bg: "#FFF",
                  borderRadius: "xl",
                  children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    color: "#000",
                    fontWeight: "bold",
                    children: "@remus"
                  }), /*#__PURE__*/jsx_runtime_.jsx(react_.Text, {
                    margin: "0px",
                    color: "#000",
                    children: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"
                  })]
                })]
              })
            })
          }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(react_.Flex, {
            borderRadius: "xl",
            p: "10px",
            bg: "#FFF",
            style: {
              justifyContent: "space-between",
              marginTop: 0
            },
            children: [/*#__PURE__*/jsx_runtime_.jsx(react_.Input, {
              placeholder: "write your message..."
            }), /*#__PURE__*/jsx_runtime_.jsx(react_.Button, {
              style: {
                marginLeft: 10
              },
              children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FaRegPaperPlane */.P58, {
                size: "22"
              })
            })]
          })]
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(components_ShareModal, {
        ref: ref => {
          this.shareModal = ref;
        },
        item: {},
        isOnMobile: isOnMobile
      })]
    });
  }

}

SellerProfile.getInitialProps = async context => {
  try {
    const sellerId = context.query["seller-id"];
    return {};
  } catch (e) {
    return {};
  }
};

const _seller_id_styles = {};
/* harmony default export */ var _seller_id_ = ((0,router_namespaceObject.withRouter)(SellerProfile));

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
var __webpack_exports__ = __webpack_require__.X(0, [875], function() { return __webpack_exec__(6427); });
module.exports = __webpack_exports__;

})();