const crypto = require('crypto')

// ot = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890"
function pt(e) {
    const ot = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890"
    e = e || 32;
    for (var t = ot.length, r = "", n = 0; n < e; n++)
        r += ot.charAt(Math.floor(Math.random() * t));
    return r
}

function get_x_ca_nonce() {
    return pt(15)
}

function get_x_ca_timestamp() {
   return (new Date).getTime()
}

function get_x_ca_key() {
    return 'H5-SIGN-SECRET-KEY'
}

function get_x_ca_sign(x_ca_nonce, x_ca_timestamp) {
    const REACT_APP_MOLE = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz09z6e9WOcNq+nUMX8Vq1Xe2EmJxuR3XbturefioF)E(Fl';
    const str = [REACT_APP_MOLE, x_ca_nonce, x_ca_timestamp].sort().join('');
    hash = crypto.createHash('sha1') // sha1
    hash.update(str)
    const x_ca_sign = hash.digest('hex')
    return x_ca_sign;
}

function main() {
    const x_ca_nonce = get_x_ca_nonce();
    const x_ca_timestamp = get_x_ca_timestamp();
    const x_ca_key = get_x_ca_key();
    const x_ca_sign = get_x_ca_sign(x_ca_nonce, x_ca_timestamp);
    console.log('x_ca_nonce: ', x_ca_nonce);
    console.log('x_ca_timestamp: ', x_ca_timestamp);
    console.log('x_ca_key: ', x_ca_key);
    console.log('x_ca_sign: ', x_ca_sign);
    return {
      x_ca_nonce,
      x_ca_timestamp,
      x_ca_key,
      x_ca_sign
    }
}

function getOptions(token) {
  const ca = main();
  return {
    url: 'https://api-gw-toc.zeekrlife.com/zeekrlife-mp-sic/v1/signincentre/get?defineCode=SIGN-IN-APP',
    method: 'GET',
    gzip: true,
    headers: {
      'Host': 'api-gw-toc.zeekrlife.com',
      'User-Agent': 'ZeekrLife/4.0.1 (iPhone; iOS 17.4.1; Scale/3.00)0725347432775059414785460333450504352503170354470887554110883965',
      'x_ca_sign': 'f536fefa69b08abc4820a0271389f922432f471b',
      'Cookie': 'sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2218ee588d483ba9-08e1bac0047eb38-1834064a-329160-18ee588d48424a5%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThlZTU4OGQ0ODNiYTktMDhlMWJhYzAwNDdlYjM4LTE4MzQwNjRhLTMyOTE2MC0xOGVlNTg4ZDQ4NDI0YTUifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%7D; acw_tc=a2c16261-869f-4a4c-ad50-c2ac2ef8750b5cbe45db7cd36000a5ce98d23b3a6b68',
      'app_version': '4.0.1',
      'device_id': '0725347432775059414785460333450504352503170354470887554110883965',
      'phone_version': '17.4.1',
      'x_ca_nonce': '09003891',
      'x_ca_key': 'APP-SIGN-SECRET-KEY',
      'Version': '2',
      'x_ca_timestamp': '1713247957465',
      'request-original': 'zeekr-app',
      'WorkspaceId': 'prod',
      'Connection': 'keep-alive',
      'Authorization': 'Bearer ' + token,
      'Accept-Language': 'zh-Hans-CN;q=1',
      'app_type': 'IOS',
      'phone_model': 'iPhone13Pro',
      'x_ca_secret': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz09z6e9WOcNq+nUMX8Vq1Xe2EmJxuR3XbtureDCS90dfkok',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      ...ca
    }
  }
}

exports.getOptions = getOptions

