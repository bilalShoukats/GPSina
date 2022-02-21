import axios from 'axios';
import { encode, decode } from 'js-base64';
import Config from '../constants/config';

export default class ApiManager {
    token = null;
    userName = null;
    sessionId = null;
    axiosInstance = null;
    static singleton = null;

    constructor() {
        axios.defaults.responseType = 'json';
        axios.defaults.baseURL = Config.et_api_url;
        axios.defaults.headers.put['Content-Type'] = 'application/json';
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    static getInstance() {
        if (ApiManager.singleton == null) {
            ApiManager.singleton = new ApiManager();
        }
        return ApiManager.singleton;
    }

    setRequestOptions = (method, url, payload) => {
        let header =
            this.token === null
                ? { headers: { 'et-sessionId': this.sessionId } }
                : {
                      auth: { username: this.userName, password: this.token },
                      headers: {
                          'et-sessionId': this.sessionId,
                          'x-access-token': encode(
                              this.userName + ':' + this.token,
                          ),
                      },
                  };
        header['url'] = url;
        header['method'] = method;
        header['mode'] = 'cors';
        header['Access-Control-Allow-Origin'] = '*';
        if (method !== 'GET') {
            header['data'] = payload;
        } else {
            header['params'] = payload;
        }
        return header;
    };

    setSession = sessionId => {
        this.sessionId = sessionId.toString();
    };

    setToken = (email, token) => {
        this.token = token;
        this.userName = email;
    };

    send = (method, url, payload) => {
        return new Promise((resolve, reject) => {
            axios
                .request(this.setRequestOptions(method, url, payload))
                .then(response => {console.log("response of api: ",response); resolve(response)})
                .catch(error => reject(error));
        });
    };
}
