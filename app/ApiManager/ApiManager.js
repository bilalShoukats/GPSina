import React from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Manager } from '../StorageManager/Storage';
import ErrMsg from './string-error-code-en';
import APIURLS from './apiUrl';

const TIMEOUT = 10000; // ten seconds

export default class ApiManager {
  token = null;

  parent = null;

  etSessionId = null;

  appVersion = '1.0.0.1';

  constructor(parent) {
    this.parent = parent;
  }

  // this function must call before calling makeCall otherwide its not get token from local if its saved
  async Initialize() {
    await this.assignToken();
    await this.assignEtSessionId();
  }

  postServer = (url, options) =>
    Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(
          () =>
            reject({
              error: -1,
              message: `Timeout with ${TIMEOUT}`,
            }),
          TIMEOUT,
        ),
      ),
    ]);

  translateResponse = response => {
    /**
     * statuses
     *  0 -> success
     *  1 ->
     *  2 -> token need
     */
    const status = 0;
    let res = null;

    console.log('translate response: ', response);

    if (response.code === 1004) {
      this.parent.redirect();
      return res;
    }

    if (response.id) {
      response.decodedMessage = ErrMsg(response.code);
      res = response;
    }
    return res;
  };

  assignToken = async () => {
    const token = await Manager.getItem('token', false);
    // console.log('token from local', token);
    this.token = token;
  };

  assignEtSessionId = async () => {
    const etSessionId = await Manager.getItem('et-session-id', false);
    // console.log('etsessionId', etSessionId);
    if (!etSessionId) {
      this.createSessionID('1233322332');
    }
    this.etSessionId = etSessionId;
  };

  createSessionID = async fcmKey => {
    const body = {
      fcmKey,
    };
    console.log('body', body);
    this.callApi(APIURLS.createSession, 'PUT', body, res => {
      console.log('callApi createSession:', res);
      if (res.code == '1008' && res.response.sessionId) {
        this.saveSessionId(res.response.sessionId);
      }
    });
  };

  saveSessionId = async sessionId => {
    console.log(sessionId);
    this.etSessionId = sessionId;
    Manager.setItem('et-session-id', sessionId, false);
  };

  saveToken = (email, token) => {
    const rawStr = `${email}:${token}`;
    const wordArray = CryptoJS.enc.Utf8.parse(rawStr);
    const base64 = CryptoJS.enc.Base64.stringify(wordArray);
    this.token = base64;
    console.log('Email', email);
    console.log('Token', base64);
    Manager.setItem('token', base64, false);
    this.saveUser();
  };

  saveUser = () => {
    this.callApi(APIURLS.getUser, 'GET', null, res => {
      console.log('getUser API:', res);
      if (res.code === 1012) {
        Manager.setItem('user', res.response);
      }
    });
  };

  header = () => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      mode: 'cors',
      'Access-Control-Allow-Origin': '*',
    };

    if (this.token) {
      headers.Authorization = `Basic ${this.token}`;
    }
    if (this.etSessionId) {
      headers['et-sessionId'] = this.etSessionId;
    }

    return headers;
  };

  callApi = async (endPoint, method, data, callback) => {
    // const URL = 'http://13.228.129.207:8081/'; // dev server url
    // const URL = 'http://13.233.162.122:8080/'; // live server url
    // const URL = 'http://192.168.88.18:8080/'; // local server url
    const apiUrl = 'http://13.229.0.123:8088/api/'; // current live server url
    const url = apiUrl + encodeURI(endPoint);

    const configs = {
      headers: this.header(),
      timeout: 10000,
    };

    console.log('options: ', configs);
    console.log('this.token', this.token);
    console.log('url: ', url);
    console.log('method:', method);
    console.log('body', data);

    let bool = false;
    if (method == 'get') {
      bool = true;
    }

    let response = null;

    switch (method) {
      case 'GET':
        response = axios.get(url, configs);
        break;
      case 'PUT':
        response = axios.put(url, data, configs);
        break;
      case 'POST':
        response = axios.post(url, data, configs);
        break;
    }

    const res = await response;
    // console.log('data', res);

    callback(res.data);
  };
}
