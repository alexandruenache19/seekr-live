import { Dimensions } from 'react-native'

export default {
  DEVICE_WIDTH: Dimensions.get('window').width,
  DEVICE_HEIGHT: Dimensions.get('window').height,
  SIDE_SPACING: 18,
  CONTENT_WIDTH: Dimensions.get('window').width - 2 * 18,
  DEFAULT_SHADOW: '0px 0px 40px 4px rgba(0,0,0,0.05)',
  BASE_BUTTON: {
    width: 'auto',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 7,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 5,
    backgroundColor: '#212531',
    border: '1px solid rgba(255,255,255,0.3)',
    cursor: 'pointer'
  },
  SIGN_UP_FORM_SHOPS: 'https://alexandruenache.typeform.com/to/XHmwEQ8j'
}
