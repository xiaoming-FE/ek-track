/**
 * Main entrance
 */
import Browser from './browser';
import Report from './report';
import Stat from './stat';
Report.option.url = 'http://localhost:3000/';
new Stat();

/**
 * track main
 */
class Track {
  /**
   *
   * @param {object} params
   */
  send (params = {}) {
    let data = Object.assign({sendType: 1}, Browser.getBrowser(), params);
    Report.postData(data);
  }

  /**
   *
   * @param {object} params  set => {url: example.com}
   */
  init (params = {}) {
    Report.option.url = params.url || '';
  }
}

export default new Track();
