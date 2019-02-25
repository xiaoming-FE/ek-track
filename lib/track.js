/**
 * Main entrance
 */
import Browser from './browser';
import Report from './report';
import Stat from './stat';
var stat = new Stat();

/**
 * track main
 */
class Track {
  /**
   *
   * @param {object} params
   */
  send (params) {
    stat.sendData(params)
    //let data = Object.assign({sendType: 1}, Browser.getBrowser(), params);
   
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
