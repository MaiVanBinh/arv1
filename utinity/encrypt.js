export const encrypt = (message, key) => {
  var CryptoJS = require('crypto-js');
  var ciphertext = CryptoJS.AES.encrypt(message, key).toString();
  return ciphertext;
};

export const decrypt = (ciphertext, key) => {
    var CryptoJS = require('crypto-js');
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}
