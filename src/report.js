
/**
 * <author>   : xiaomingFE
 * <date>     : 2019-2-16
 * <desc>     : Report buried data
 */

class ParamsHandle {
  /**
   * handle options to string
   * @param {object} options => Single layer data
   * @return {string}
   */
  static setUrlParams(options) {
    let keyArr = Object.keys(options);
    keyArr.forEach((key, index) => {
      keyArr[index] = [key, options[key]].join('=');
    });
    return keyArr.join('&');
  }

  /**
   * @return {string}
   */
  static getPageId() {
    return window.EK_PAGEID;
  }
}

class Report {
  /**
   * method => report data
   * @param {object} params
   * @param {object} customParams
   */
  static postData (params, customParams = {}) {
    let urlParamStr = ParamsHandle.setUrlParams(Object.assign(params, customParams, {
      pageid: ParamsHandle.getPageId() || this.option.pageid
    }));
    if (this.checkUrl(this.option.url)) {
      let img = new Image();
      img.src = encodeURI(`${this.option.url}?${urlParamStr}`);
    }
  }

  /**
   * check url
   * @param {string} url
   * @return {boolean}
   */
  static checkUrl (url = '') {
    if (url.search(/http|https:\//) === -1 || url.search(/http|https:\//) > 0) {
      try {
        throw new Error('You have to set a URL!');
      } catch (e) {
        console.error(e.name + ':' + e.message);
      }
    } else {
      return true;
    }
  }
}

Report.option = {
  /**
   * @param {string} url
   */
  url: '',
  pageid: 'yike-all'
};

export default Report;
