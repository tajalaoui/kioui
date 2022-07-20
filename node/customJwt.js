const CryptoJS = require("crypto-js")

function base64url(source) {
  // Encode in classical base64
  var encodedSource = CryptoJS.enc.Base64.stringify(source)

  // // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "")

  // // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-")
  encodedSource = encodedSource.replace(/\//g, "_")

  return encodedSource
}

exports.generateToken = (data, secret) => {
  //  encode header
  var header = {
    alg: "HS256",
    typ: "JWT",
  }

  var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header))
  var encodedHeader = base64url(stringifiedHeader)

  // encode data
  var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
  var encodedData = base64url(stringifiedData)

  var token = encodedHeader + "." + encodedData

  // hash signature
  var signature = CryptoJS.HmacSHA256(token, secret)
  signature = base64url(signature)

  var signedToken = token + "." + signature

  return signedToken
}

exports.decodePayload = (string) => {
  const split_str = string.split(".")[1]

  const decode_token = CryptoJS.enc.Base64.parse(split_str).toString(CryptoJS.enc.Utf8)

  return decode_token
}
