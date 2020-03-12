import CryptoJS from "crypto-js";

const key = ''//'Haider-Hassan+1994'

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, key).toString();
}

const decrypt = (ciphertext) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

const setItem = (key, value, makeStringifiy = true) => {
  let data = '';
  if (makeStringifiy) {
    data = JSON.stringify(value);
  } else if (typeof value !== 'string') {
    return;
  } else {
    data = value;
  }
  let encrypted = encrypt(data);
  localStorage.setItem(key, encrypted);
}

const getItem = async (key, makeParse) => {
  let data = await localStorage.getItem(key);
  if (data) {
    let plainText = decrypt(data);
    plainText = typeof plainText === 'string' && makeParse ? JSON.parse(plainText) : plainText;
    return plainText;
  } else {
    return '';
  }
}

function getItemCallback (key, makeParse, _callback) {
  let data = localStorage.getItem(key);
  if (data) {
    let plainText = decrypt(data);
    plainText = typeof plainText === 'string' && makeParse ? JSON.parse(plainText) : plainText;
    _callback(plainText);
  } else {
    _callback('')
  }
}

const removeItem = async (key) => {
  localStorage.removeItem(key);
}



const Manager = {
  setItem,
  getItem,
  removeItem,
  getItemCallback
}
export { Manager };