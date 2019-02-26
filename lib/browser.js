/**
 * return browser data
 */

import Bowser from './bowser/bowser';
const isBowser = Bowser.getParser(window.navigator.userAgent);
const result = isBowser.getResult();
const browser = {
  /**
   * @return {object}
   */
  getBrowser () {
    return {
      browser: result.browser.name,
      version: result.browser.version,
      os: result.os.name,
      osv: result.os.version,
      osvname: result.os.versionName,
      platform: result.platform.type
    }
  },
};

export default browser;
