/**
 * Main entrance
 */
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
    // 校验 sign 必须存在
    let keys = Object.keys(params);
    if(!keys.includes('sign')) {
      throw new Error('The parameter must contain the sign attribute');
    };
    // 校验为 string 类型
    if (!(typeof params['sign'] === 'string')) {
      throw new Error('sign value must be string');
    }
    stat.sendData(params);
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
