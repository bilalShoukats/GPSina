import { isNumber } from 'util';
import io from "socket.io-client";
import Config from '../constants/config';
import { decodeAllDevices } from '../NetworkModals/DeviceModal';
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
     * @param user user object.
     * @param token user hashed token.
     * Function contains all the socket events
     */
    connect = (user, token, callBack) => {
        console.log("connect with socket: ", token, user);

        this.connectSocket().then(object => {
            console.log("what is socket connect obj: ", object);
            this.socket = object;

            //on connection
            this.socket.on('connect', () => {
                console.log("SOCKET CONNECT RECEIVED");
                this.sendToSocket('login', user, token);
            })

            this.socket.on('login', () => {
                console.log("SOCKET LOGIN RECEIVED");
            })

            this.socket.on("connect_error", error => {
                console.log("SOCKET CONNECT ERROR RECEIVED: ", error);
            })

            this.socket.on('message', (data) => {
                console.log("SOCKET MESSAGE RECEIVED", data);
            })

            this.socket.on('deviceData', (data) => {
                console.log("SOCKET DEVICE DATA RECEIVED", data);
            })

            this.socket.on('all-devices', (data) => {
                callBack(decodeAllDevices(data));
            });

            this.socket.on('gps-data', (data) => {
                console.log("GPS DATA FOR DEVICES ARE: ", data);
            })

        }).catch(err => {
            console.log(err);
        });
    }

    /**
     * Connect Socket
     * Function will send request on webserver for connection
     */
    connectSocket = () => {
        return new Promise(function (resolve, reject) {
            let connection = io(Config.et_socket_url, { transports: ["websocket"], extraHeaders: {} });
            if (connection) {
                console.log("SOCKET SUCCESS: ", connection);
                resolve(connection);
            } else {
                console.log("SOCKET FAILURE");
                reject('Error: while connecting socket !');
            }
        });
    }

    sendToSocket = (event, user, token) => {
        console.log("what  is  token: ", token);
        var encodedToken = this.encodeData(token, user.email);
        this.socket.emit(event, this.convertStringArrayToByteArray(encodedToken));
        this.socket.emit('getAllDevices'); //calling get all devices event
    }

    getLiveGPS = (devices) => {
        console.log("EMITTING LIVE  GPS FOR DEVICES: ", devices);
        // console.log("encoded devices areL ",this.encodeDevices(devices));
        var encodedDevices = this.encodeDevices(devices);
        console.log("ENCODED DEVICES TO SEND: ", encodedDevices);
        this.socket.emit('updateGPSDevices', encodedDevices);
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
        // data = this.PackArrayVarInt64(deviceIds, data);
        // data = this.PrependLength(data);
        return data;
    }

    /**
     * Encode Token and user email
     * @param token client token.
     * @param email user email.
     */
     encodeDevices(deviceIds) {
        var data;
        var data1 = this.PackVarUInt32(deviceIds.length);
        console.log("what is var int32: ", data1);
        data = this.PackArrayStrings(deviceIds);
        console.log("after pack: ", this.PackVarUInt32(data));
        data = [...data1, ...data];
        // this.PrependLength(data);
        // var encoded = [];
        // encoded[0] = deviceIds.length;
        // for(var i=0; i < data.length; i++) {
        //     encoded[i+1] = data[i];
        // }
        return data;
    }

    /**
     * Pack array var int 64 bit
     * @param deviceIds devices list.
     */
     PackArrayStrings(deviceIds) {
        var data = [];
        var test;
        length = deviceIds.length;
        for (var i = 0; i < length; i++) {
           data = this.PackString(deviceIds[i], data);
        }
        
        // data =  this.convertStringArrayToByteArray(data);
        
        return data;
    }

    /**
     * Pack array var int 64 bit
     * @param dataArray data array.
     */
    PrependLength(dataArray) {
        var length = dataArray.length;
        var protocol = new Protocol();
        var buffer = protocol.write().UVarint(length).result;
        var combined = [...buffer, ...dataArray];
        return combined;
    }

    /**
     * Pack array var int 64 bit
     * @param deviceIds devices list.
     * @param dataArray token array.
     */
    PackArrayVarInt64(deviceIds, dataArray) {
        length = deviceIds.length;
        if (length > 65535) {
            return dataArray;
        }
        dataArray = this.PackVarUInt32(length, dataArray);
        for (var i = 0; i < length; i++) {
            dataArray = this.PackVarInt64(deviceIds[i], dataArray);
        }
        return dataArray;
    }

    /**
     * Pack var int 64 bit
     * @param numberValue devices list.
     * @param dataArray token array.
     */
    PackVarInt64(numberValue, dataArray) {
        var protocol = new Protocol();
        var buffer = protocol.write().SVarint64(numberValue).result;
        var combined;
        if (dataArray == null) {faw
            var combined = buffer;
        } else {
            combined = [...dataArray, ...buffer];
        }
        return combined;
    }

    /**
     * Pack var unsigned int 32 bit
     * @param numberValue devices list.
     * @param dataArray token array.
     */
    PackVarUInt32(numberValue, dataArray) {
        var protocol = new Protocol();
        var buffer = protocol.write().UVarint(numberValue).result;
        var combined;
        if (dataArray == null) {
            var combined = buffer;
        } else {
            combined = [...dataArray, ...buffer];
        }
        return combined;
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
        console.log("what is stringval: ", stringVal);
        console.log("what is dataArray: ", dataArray);
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