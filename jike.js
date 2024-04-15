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

const ca = main();



var headers = {
  'Host': 'api-gw-toc.zeekrlife.com',
  'User-Agent': 'ZeekrLife/4.0.1 (iPhone; iOS 17.4.1; Scale/3.00)0725347432775059414785460333450504352503170354470887554110883965',
  'x_ca_sign': '6407ca0cb44f6c62dd22016ad71637ed6e59ee3f',
  'Cookie': 'sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2218ee1676067651-0174f0329161f9b-635f670d-329160-18ee16760681932%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThlZTE2NzYwNjc2NTEtMDE3NGYwMzI5MTYxZjliLTYzNWY2NzBkLTMyOTE2MC0xOGVlMTY3NjA2ODE5MzIifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%7D; acw_tc=e996f3d5-5a5a-4651-85bd-abed54023bbd3d5d0f51071959039a44b22a11d11d29',
  'app_version': '4.0.1',
  'device_id': '0725347432775059414785460333450504352503170354470887554110883965',
  'phone_version': '17.4.1',
  'x_ca_nonce': '39888077',
  'x_ca_key': 'APP-SIGN-SECRET-KEY',
  'Version': '2',
  'x_ca_timestamp': '1713178634005',
  'request-original': 'zeekr-app',
  'Content-Length': '245',
  'WorkspaceId': 'prod',
  'Connection': 'keep-alive',
  // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcHAiLCJpc3MiOiJwcm9kIiwianRpIjoiMTc3MTM3Njk5NjA5MjQ2NTE1MiIsImlhdCI6MTcxMzE3ODYwOCwic3ViIjoie1wiYWNjb3VudEluZm9EVE9cIjp7XCJhY2NvdW50SWRcIjoxNzcxMzc2OTk2MDkyNDY1MTUyLFwiYWNjb3VudEluZm9JZFwiOjE3NzEzNzY5OTYxMzAyMTM4ODgsXCJhY2NvdW50VHlwZVwiOjEsXCJhcmVhXCI6XCLlsrPpupPljLpcIixcImFyZWFDb2RlXCI6NDMwMTA0LFwiYXZhdGFyXCI6XCJodHRwczovL3plZWtybGlmZS1vc3Mub3NzLWNuLWhhbmd6aG91LmFsaXl1bmNzLmNvbS9tcC1hY2NvdW50L2F2YXRhci1jb25maWcvMi5wbmdcIixcImJpcnRoZGF5XCI6ODE0OTgyNDAwMDAwLFwiYnVTaXRlXCI6MSxcImNoYW5uZWxcIjoyLFwiY2l0eVwiOlwi6ZW_5rKZ5biCXCIsXCJjaXR5Q29kZVwiOjQzMDEwMCxcImNyZWF0ZWRBdFwiOjE3MTExNjQxNjEwMDAsXCJpZGVudGlmaWVkXCI6XCIwXCIsXCJpbnZpdGVDb2RlXCI6XCJVWE5SMTlcIixcImludml0ZVRpbWVcIjoyNTM0MDIwOTkyMDAwMDAsXCJsYXRpdHVkZVwiOjI4LjI0MjMxMDQsXCJsZXZlbFwiOjAsXCJsb25naXR1ZGVcIjowRS03LFwibW9iaWxlXCI6XCIxNzcwODY1ODcyN1wiLFwibmlja25hbWVcIjpcIuWwj-mdkuibmVx1RDgzRFx1REMzOFx1RDgzRFx1REMzOFwiLFwicHJvdmluY2VcIjpcIua5luWNl-ecgVwiLFwicHJvdmluY2VDb2RlXCI6NDMwMDAwLFwicmVhbE5hbWVcIjpcIlwiLFwicmVnaW9uQ29kZVwiOlwiKzg2XCIsXCJyb2xlXCI6MCxcInNleFwiOjAsXCJzaWduYXR1cmVcIjpcIlwiLFwidGVuYW50SWRcIjowLFwidXNlcm5hbWVcIjpcIjE3NzA4NjU4NzI3XCIsXCJ3ZWl4aW5Db2RlXCI6XCJcIn0sXCJhY2NvdW50TG9naW5JbmZvRFRPXCI6e1wibGFzdENoYW5uZWxcIjoyLFwibGFzdExvZ2luQXRcIjoxNzEzMTc4NjA4ODU4LFwibGFzdExvZ2luRGV2aWNlSWRcIjpcIjA3MjUzNDc0MzI3NzUwNTk0MTQ3ODU0NjAzMzM0NTA1MDQzNTI1MDMxNzAzNTQ0NzA4ODc1NTQxMTA4ODM5NjVcIixcImxhc3RMb2dpbkRldmljZU5hbWVcIjpcImlQaG9uZTEzUHJvXCIsXCJsYXN0TG9naW5JcFwiOlwiMjIzLjE1My4xNS42MVwiLFwicGxhdGZvcm1cIjpcIklPU1wifSxcImdvQmluZE1vYmlsZVwiOmZhbHNlLFwibG9nb3V0T3RoZXJEZXZpY2VzXCI6ZmFsc2UsXCJuZXdSZWdpc3RlclwiOmZhbHNlLFwicGxhdGZvcm1BY2NvdW50SW5mb0RUT1wiOntcImF1dGhQbGF0Zm9ybVwiOjB9fSIsImV4cCI6MTc0NDcxNDYwOH0.OhmMxZZAeAt4Q9-J40VO9OXplJPPE0H8QrH10gw0ceM',
  'Accept-Language': 'zh-Hans-CN;q=1',
  'app_type': 'IOS',
  'phone_model': 'iPhone13Pro',
  'x_ca_secret': 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz09z6e9WOcNq+nUMX8Vq1Xe2EmJxuR3XbtureDCS90dfkok',
  'Accept': '*/*',
  'Content-Type': 'application/json',
  'Accept-Encoding': 'gzip, deflate, br',
  ...ca
};

var dataString = '{"mobile":"17708658727","buildVersion":"4.0.1","content":"健康APP授权返回步数4909","buildDate":"2024-04-15 18:57:14","logLevel":0,"bizCode":"100022","buildCode":"2024032702","appType":"2","deviceInfo":"iPhone13Pro","buildType":"release"}';

exports.options = {
  url: 'https://api-gw-toc.zeekrlife.com/zeekrlife-mp-alarm/open/v1/app/bizlog/add',
  method: 'POST',
  headers: headers,
  gzip: true,
  body: dataString
}


