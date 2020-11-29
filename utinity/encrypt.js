export const encrypt = (message, key) => {
  var CryptoJS = require('crypto-js');
  var ciphertext = CryptoJS.AES.encrypt(message, 'secret key 123').toString();
  return ciphertext;
};

export const decrypt = (ciphertext, key) => {
    var CryptoJS = require('crypto-js');
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}
