import React from 'react';
import { Manager } from "../StorageManager/Storage";
import ErrMsg from "./string-error-code-en";
import CryptoJS from "crypto-js";
// dev server url
// const URL = (apiName) => 'http://13.228.129.207:8081/api/' + apiName;
const URL = (apiName) => 'http://localhost:8080/api/' + apiName;

const TIMEOUT = 10000; // ten seconds

export default class ApiManager {
  token = null;
  parent = null;
  constructor(parent) { this.parent = parent }

  // this function must call before calling makeCall otherwide its not get token from local if its saved
  async Initialize() {
    await this.assignToken();
  }

  postServer = (apiName, options) => {
    return Promise.race([
      fetch(URL(apiName), options),
      new Promise((_, reject) =>
        setTimeout(() => reject({
          error: -1,
          message: 'Timeout with ' + TIMEOUT
        }), TIMEOUT)
      )
    ]);
  }

  translateResponse = (response) => {
    /**
     * statuses
     *  0 -> success
     *  1 -> 
     *  2 -> token need
     */
    let status = 0;
    let res = null;

    console.log("translate response: ", response);

    if (response.code === 1004) {
      this.parent.redirect();
      return res;
    }

    if (response.id) {
      response.decodedMessage = ErrMsg(response.code);
      res = response;
    }
    return res;
  }

  createLoginOptions = (body) => {
    return {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'mode': 'cors',
        'Authorization': 'Basic ' + this.token,
      },
      body: JSON.stringify(body)
    };
  }

  createWithOutLoginOptionsGET = () => {
    return {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'mode': 'cors',
        'Authorization': 'Basic ' + this.token,
      }
    };
  }

  createWithOutLoginOptions = (body) => {
    return {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'mode': 'cors'
      },
      body: JSON.stringify(body)
    };
  }

  assignToken = async () => {

    let token = await Manager.getItem('token', false);
    // console.log('token from local', token);
    this.token = token;
  }

  saveToken = (email, token) => {
    let rawStr = email + ':' + token;
    let wordArray = CryptoJS.enc.Utf8.parse(rawStr);
    let base64 = CryptoJS.enc.Base64.stringify(wordArray);
    this.token = base64;
    console.log('Email', email);
    console.log('Token', base64);
    Manager.setItem('token', base64, false);
    console.log('Token Saved');
    this.saveUser();
  }

  saveUser = () => {
    this.post('getUser', {}, true, (result) => {
      console.log("result of get user: ", result);
      if (result.code) {
        if (result.code === 1012) {
          Manager.setItem('user', result.response);
        }
      }
    })
  }



  post = (apiName, body, bool, callback) => {
    let options = null;

    if (this.token) {
      if (bool)
        options = this.createWithOutLoginOptionsGET();
      else
        options = this.createLoginOptions(body);
    }
    else {
      if (bool)
        options = this.createWithOutLoginOptionsGET();
      else
        options = this.createWithOutLoginOptions(body);
    }

    console.log('Options: ', options);
    console.log('this.token', this.token)
    console.log('Api Name :', apiName);
    this.postServer(apiName, options)
      .then(async (res) => {
        console.log('status code:', res);
        res = await res.json()
        res.apiName = apiName;
        // if (constants.favorite.indexOf(apiName !== -1)) {
        //   if (res.buyer) res.buyer.role = 1
        // }
        let response = this.translateResponse(res);

        if (apiName === 'login' && (res.response.hash)) {
          this.saveToken(body.email, res.response.hash);
        }

        callback(response);
      })
      .catch(e => {
        console.log('Error', e);
        this.parent.showTimeoutError && this.parent.showTimeoutError(e, apiName, body, bool, callback);

        // show timeout modal here
      });


  }

  //bool false means post, true for get request
  makeCall(apiName, body, callback, bool = false) {
    this.post(apiName, body, bool, (res) => callback(res));
  }


}