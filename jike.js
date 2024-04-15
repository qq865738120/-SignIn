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
  Host: "api-gw-toc.zeekrlife.com",
  "User-Agent":
    "ZeekrLife/4.0.1 (iPhone; iOS 17.4.1; Scale/3.00)0725347432775059414785460333450504352503170354470887554110883965",
  Cookie:
    "acw_tc=3f833e24-cf82-4e91-aa66-42d2249f094ec5f8a2b863b6ad1723ffbec844cdd2ec; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2218edfe3cf7f221-058bb19ea82365c-1834064a-329160-18edfe3cf801f04%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMThlZGZlM2NmN2YyMjEtMDU4YmIxOWVhODIzNjVjLTE4MzQwNjRhLTMyOTE2MC0xOGVkZmUzY2Y4MDFmMDQifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%7D; sajssdk_2015_cross_new_user=1",
  app_version: "4.0.1",
  device_id: "0725347432775059414785460333450504352503170354470887554110883965",
  phone_version: "17.4.1",
  Version: "2",
  "request-original": "zeekr-app",
  WorkspaceId: "prod",
  Connection: "keep-alive",
  // Authorization:
    // "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhcHAiLCJpc3MiOiJwcm9kIiwianRpIjoiMTc3MTM3Njk5NjA5MjQ2NTE1MiIsImlhdCI6MTcxMTE4ODkzOSwic3ViIjoie1wiYWNjb3VudEluZm9EVE9cIjp7XCJhY2NvdW50SWRcIjoxNzcxMzc2OTk2MDkyNDY1MTUyLFwiYWNjb3VudEluZm9JZFwiOjE3NzEzNzY5OTYxMzAyMTM4ODgsXCJhY2NvdW50VHlwZVwiOjEsXCJhcmVhXCI6XCLlsrPpupPljLpcIixcImFyZWFDb2RlXCI6NDMwMTA0LFwiYXZhdGFyXCI6XCJodHRwczovL3plZWtybGlmZS1vc3Mub3NzLWNuLWhhbmd6aG91LmFsaXl1bmNzLmNvbS9tcC1hY2NvdW50L2F2YXRhci1jb25maWcvMi5wbmdcIixcImJpcnRoZGF5XCI6ODE0OTgyNDAwMDAwLFwiYnVTaXRlXCI6MSxcImNoYW5uZWxcIjoyLFwiY2l0eVwiOlwi6ZW_5rKZ5biCXCIsXCJjaXR5Q29kZVwiOjQzMDEwMCxcImNyZWF0ZWRBdFwiOjE3MTExNjQxNjEwMDAsXCJpZGVudGlmaWVkXCI6XCIwXCIsXCJpbnZpdGVDb2RlXCI6XCJVWE5SMTlcIixcImludml0ZVRpbWVcIjoyNTM0MDIwOTkyMDAwMDAsXCJsYXRpdHVkZVwiOjI4LjI0MjMxMDQsXCJsZXZlbFwiOjAsXCJsb25naXR1ZGVcIjowRS03LFwibW9iaWxlXCI6XCIxNzcwODY1ODcyN1wiLFwibmlja25hbWVcIjpcImFyZGVub19jYXJcIixcInByb3ZpbmNlXCI6XCLmuZbljZfnnIFcIixcInByb3ZpbmNlQ29kZVwiOjQzMDAwMCxcInJlYWxOYW1lXCI6XCJcIixcInJlZ2lvbkNvZGVcIjpcIis4NlwiLFwicm9sZVwiOjAsXCJzZXhcIjowLFwic2lnbmF0dXJlXCI6XCJcIixcInRlbmFudElkXCI6MCxcInVzZXJuYW1lXCI6XCIxNzcwODY1ODcyN1wiLFwid2VpeGluQ29kZVwiOlwiXCJ9LFwiYWNjb3VudExvZ2luSW5mb0RUT1wiOntcImFnb0NoYW5uZWxcIjoyLFwiYWdvTG9naW5BdFwiOjE3MTExODY4NDQwMzgsXCJhZ29Mb2dpbkRldmljZUlkXCI6XCI5NTUxMDE4NjE3NTg4MzMwMTA5NzM4ODMzMDc0MjU2NzkxMDI5MDg0Mjk1NTk4OTUxNjkyNjQ5OTA2ODAyMjU3XCIsXCJhZ29Mb2dpbkRldmljZU5hbWVcIjpcImlQaG9uZSBYUyBNYXhcIixcImFnb0xvZ2luSXBcIjpcIjE3NS4wLjYzLjE3N1wiLFwibGFzdENoYW5uZWxcIjoyLFwibGFzdExvZ2luQXRcIjoxNzExMTg4OTM5NTI2LFwibGFzdExvZ2luRGV2aWNlSWRcIjpcIjA3MjUzNDc0MzI3NzUwNTk0MTQ3ODU0NjAzMzM0NTA1MDQzNTI1MDMxNzAzNTQ0NzA4ODc1NTQxMTA4ODM5NjVcIixcImxhc3RMb2dpbkRldmljZU5hbWVcIjpcImlQaG9uZTEzUHJvXCIsXCJsYXN0TG9naW5JcFwiOlwiMTc1LjAuNjMuMTc3XCIsXCJwbGF0Zm9ybVwiOlwiSU9TXCJ9LFwiZ29CaW5kTW9iaWxlXCI6ZmFsc2UsXCJsb2dvdXRPdGhlckRldmljZXNcIjp0cnVlLFwibmV3UmVnaXN0ZXJcIjpmYWxzZSxcInBsYXRmb3JtQWNjb3VudEluZm9EVE9cIjp7XCJhdXRoUGxhdGZvcm1cIjowfX0iLCJleHAiOjE3NDI3MjQ5Mzl9.GDtMbh-zWhLzm40QPDZaKPG94nEpi8bkS23H6yc4150",
  "Accept-Language": "zh-Hans-CN;q=1",
  app_type: "IOS",
  phone_model: "iPhone13Pro",
  x_ca_secret:
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCz09z6e9WOcNq+nUMX8Vq1Xe2EmJxuR3XbtureDCS90dfkok",
  Accept: "*/*",
  "Accept-Encoding": "gzip, deflate, br",
  ...ca
};

exports.options = {
  url: "https://api-gw-toc.zeekrlife.com/zeekrlife-mp-order/v1/order/detail?bizOrderId=1771377698224877568",
  headers: headers,
  gzip: true,
}
