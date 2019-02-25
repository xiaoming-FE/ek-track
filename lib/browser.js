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
      name: result.browser.name,
      version: result.browser.version,
      osName: result.os.name,
      osVersion: result.os.version,
      osVersionName: result.os.versionName,
      platform: result.platform.type
    }
  },
};

export default browser;
