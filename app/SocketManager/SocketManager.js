import { isNumber } from 'util';
import io from "socket.io-client";
import Config from '../constants/config';
// import { decodeData } from '../Models/DeviceModal';
var Protocol = require('bin-protocol');

export default class SocketManager {
    socket = null;
    static singleton = null;

    constructor() {
    }

    static getInstance() {
        if (SocketManager.singleton == null) {
            SocketManager.singleton = new SocketManager();
        }
        return SocketManager.singleton;
    }

    /**
     * connect
     * @param userEmail user email.
     * @param token user hashed token.
     * Function contains all the socket events
     */
    connect = (userEmail, token, devicesCallBack, gpsCallBack, batteryCallBack, alarmsCallBack, deviceSettingCallBack, deviceStatusCallBack, engineCallBack, deviceSignalCallBack, hideLoader) => {
        this.connectSocket(userEmail, token, devicesCallBack, gpsCallBack, batteryCallBack, alarmsCallBack, deviceSettingCallBack, deviceStatusCallBack, engineCallBack, deviceSignalCallBack, hideLoader).then(object => {
            this.socket = object;

            //on connection
            this.socket.on('connect', () => {
                console.log("SOCKET CONNECT RECEIVED");
                this.sendToSocket('login', userEmail, token, hideLoader);
            })

            this.socket.on('login', () => {
                console.log("SOCKET LOGIN RECEIVED");
            })

            this.socket.on("connect_error", error => {
                console.log("SOCKET CONNECT ERROR RECEIVED: ", error);
            })

            this.socket.on('message', (data) => {
                console.log("SOCKET MESSAGE RECEIVED", data);
                if(data.Code === 3){
                    hideLoader();
                }
            })

            this.socket.on('deviceData', (data) => {
                console.log("SOCKET DEVICE DATA RECEIVED", data);
            })

            this.socket.on('setting-received', (data) => {
                console.log("setting-received", data);
                // engineCallBack(data);
            });
            
            this.socket.on('all-devices', (data) => {
                devicesCallBack(data);
            });

            this.socket.on('gps-data', (data) => {
                gpsCallBack(data);
            });

            this.socket.on('battery-voltage', (data) => {
                batteryCallBack(data);
            });

            this.socket.on('alarm-data', (data) => {
                alarmsCallBack(data);
            });

            this.socket.on('device-setting', (data) => {
                // console.log("device-setting",data);
                deviceSettingCallBack(data);
            });

            this.socket.on('device-status-changed', (data) => {
                deviceStatusCallBack(data);
            });

            this.socket.on('engine-status', (data) => {
                engineCallBack(data);
            });

            this.socket.on('device-signal', (data) => {
                deviceSignalCallBack(data);
            });

        }).catch(err => {
            console.log(err);
        });
    }

    /**
     * disconnect
     * Function disconnect socket events
     */
    disconnect = () => {
        if(this.socket) this.socket.disconnect();
    }
    
    getGPSData = (devices) => {
        var devicesArray = [];
        console.log("gps received >",devices);
        for(var i=0; i < devices.length; i++) {
          console.log("device data>",devices[i]);  
          devicesArray.push(devices[i].deviceID);
        }
        this.socket.emit('updateGPSDevices', devicesArray); //calling UPDATE GPS DEVICES EVENT
    }

    sendSettings = (DeviceID, Command, Data) => {
        let singleString = this.encodeSetting(DeviceID, Command, Data)
        console.log("Strign", singleString);
        console.log("Data", this.convertStringArrayToByteArray(singleString));

        this.socket.emit('sendSettingToDevice', this.convertStringArrayToByteArray(singleString));
    }
    /**
     * Connect Socket
     * Function will send request on webserver for connection
     */
    connectSocket = (userEmail, token, devicesCallBack, gpsCallBack, batteryCallBack, alarmsCallBack, deviceSettingCallBack, deviceStatusCallBack, engineCallBack, lockCallBack, hideLoader) => {
        return new Promise(function (resolve, reject) {
            let connection = io(Config.et_socket_url, { transports: ["websocket"], extraHeaders: {} });
            if (connection) {
                console.log("SOCKET SUCCESS: ", connection);
                resolve(connection);
            } else {
                if(connection.match("error:websocket: bad handshake")){
                    connectSocket(userEmail, token, devicesCallBack, gpsCallBack, batteryCallBack, alarmsCallBack, deviceSettingCallBack, deviceStatusCallBack, engineCallBack, lockCallBack, hideLoader)
                }
                //err bed hand shake
                console.log("SOCKET FAILURE");
                reject('Error: while connecting socket !');
            }
        });
    }

    sendToSocket = (event, userEmail, token, hideLoader) => {
        var encodedToken = this.encodeData(token, userEmail);
        this.socket.emit(event, this.convertStringArrayToByteArray(encodedToken));
        this.socket.emit('getAllDevices'); //calling get all devices event
        console.log("call getAllDevices");
        setTimeout(()=>{
            hideLoader();
        }, 1000)
    }

    /**
     * Convert every character of array into their ASCHII code .
     * @param stringArray character.
     */
     convertStringArrayToByteArray(stringArray) {
        var simpleArray = [];
        for (var i = 0; i < stringArray.length; i++) {
            var char = stringArray[i];
            if (!isNumber(char)) {
                var conversion = char.charCodeAt();
                simpleArray.push(conversion);
            } else {
                simpleArray.push(char);
            }
        }
        return simpleArray;
    }

    /**
     * Encode Token and user email
     * @param token client token.
     * @param email user email.
     */
     encodeData(token, email) {
        var data;
        data = this.PackString(email, data);
        data = this.PackString(token, data);
        return data;
    }

    encodeSetting(id, command, values) {
        var data;
        data = this.PackString(id, data);
        data = this.PackString(command, data);
        data = this.PackString(values, data);
        return data;
    }

    /**
     * Pack string
     * @param stringVal devices list.
     * @param dataArray token array.
     */
    PackString(stringVal, dataArray) {
        var length;
        var data = dataArray;
        length = stringVal.length;
        if (length > 65535 && length < 0) {
            return dataArray;
        }
        var protocol = new Protocol();
        var buffer = protocol.write().UVarint(length).result;
        var combined;
        if (dataArray == null) {
            var combined = buffer;
        } else {
            // var convertedLength = [...dataArray, ...buffer];
            // combined = [...convertedLength, ...data];
            combined = [...dataArray, ...buffer]
        }
        combined = [...combined, ...stringVal.toString(16)];
        return combined;
    }

    /**
     * Disconnect socket server connection on screen change.
     */
     disconnectSocketServer = () => {
        console.log('SOCKET HARD CLOSE', this.socket);
        if (this.socket) {
            console.log('SOCKET CLOSED');
            this.socket.close(1000);
            this.socket = null;
        }
    };
}