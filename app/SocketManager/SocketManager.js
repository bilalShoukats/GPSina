var Protocol = require('bin-protocol');
import { isNumber } from 'util';
var io = require("socket.io-client");

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

    connect = (token, user) => {
        console.log("connect with socket");
        this.connectSocket().then(object => {
            this.socket = object;

            //on connection
            this.socket.on('connect', () => {
                console.log("SOCKET CONNECT RECEIVED");
                this.sendToSocket('login', token, user);
            })

            this.socket.on('login', () => {
                console.log("SOCKET CONNECT RECEIVED");
            })

            this.socket.on("connect_error", () => {
                console.log("SOCKET CONNECT ERROR RECEIVED");
            })

            this.socket.on('message', (data) => {
                console.log("SOCKET MESSAGE RECEIVED", data);
            })

            this.socket.on('deviceData', (data) => {
                console.log("SOCKET DEVICE DATA RECEIVED", data);
            })

        }).catch(err => {
            console.log(err);
        });
    }

    connectSocket = () => {
        return new Promise(function (resolve, reject) {
            let connection = io('ws://192.168.0.140:8000', { transports: ["websocket"] })
            if (connection) {
                console.log("SOCKET SUCCESS");
                resolve(connection);
            } else {
                console.log("SOCKET FAILURE");
                reject('Error: while connecting socket !');
            }
        });
    }

    sendToSocket = (event, token, user) => {
        console.log("WHAT IS SOCKET EVENT: ", event);
        console.log("WHAT IS USERR TOKEN: ", token);
        console.log("WHAT IS USER  USER: ", user.email);
        console.log("TOKEN AND EMAIL: ",base64.decode(token));
        // var data = this.encodeData(token, user.email);
        // console.log("WHAT IS ENCODED DATA: ", data);
        // data = this.convertStringArrayToByteArray(data);
        // this.socket.emit(event, data);
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
     * check length of the data packet
     * @param dataArray data array.
     */
     rightPacket(dataArray) {
        var protocol = new Protocol();
        var buffer = protocol.read(dataArray).UVarint().result;
        dataArray = dataArray.subarray(1);
        if (buffer === dataArray.length) {
            return true;
        } else {
            return false;
        }
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
        if (length > 65535 && length < 0) {
            return dataArray;
        }
        var protocol = new Protocol();
        var buffer = protocol.write().UVarint(length).result;
        var combined;
        if (dataArray == null) {
            var combined = buffer;
        } else {
            var convertedLength = [...dataArray, ...buffer];
            combined = [...convertedLength, ...data];
        }
        combined = [...combined, ...stringVal.toString(16)];
        return combined;
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
        if (dataArray == null) {
            var combined = buffer;
        } else {
            combined = [...dataArray, ...buffer];
        }
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
     * Un Pack var int 32 bit
     * @param dataArray data array.
     */
    UnPackVarInt32(dataArray) {
        var protocol = new Protocol();
        var buffer = protocol.read(dataArray).SVarint().result;
        var bytes = protocol.write().SVarint(buffer).result;
        dataArray = dataArray.subarray(1);
        return [buffer, dataArray];
    }

    /**
     * Un Pack int 32 bit bytes
     * @param dataArray data bytes array.
     */
    UnPackInt32(dataArray) {
        var protocol = new Protocol();
        console.log('data array for engine: ', dataArray);
        var engineStatus = protocol.read(dataArray).SVarint().result;
        console.log('engine status is: ', engineStatus);
        var bytes = protocol.write().SVarint(engineStatus).result;
        console.log('engine status bytes are: ', bytes);
        dataArray = dataArray.slice(bytes.length);
        console.log('remaining data array: ', dataArray);
        return [engineStatus, dataArray];
    }

    /**
     * Un Pack int 64 bit bytes
     * @param dataArray data bytes array.
     */
    UnPackInt64(dataArray) {
        var protocol = new Protocol();
        var deviceId = protocol
            .read(dataArray)
            .SVarint64('long')
            .result.long.toString();
        var bytes = protocol.write().SVarint64(deviceId).result;
        dataArray = dataArray.slice(bytes.length);
        return [deviceId, dataArray];
    }

    /**
     * Un Pack var unsigned int 32 bit
     * @param dataArray data array.
     */
    UnPackVarUInt32(dataArray) {
        var protocol = new Protocol();
        var buffer = protocol.read(dataArray).UVarint().result;
        var bytes = protocol.write().UVarint(buffer).result;
        dataArray = dataArray.subarray(1);
        return [buffer, dataArray];
    }

    /**
     * Un Pack float 32 bit
     * @param dataArray data array.
     */
    UnPackFloat32(dataArray) {
        var data = dataArray.slice(0, 4);
        dataArray = dataArray.slice(4);
        var bits = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | data[3];
        var sign = bits >>> 31 == 0 ? 1.0 : -1.0;
        var e = (bits >>> 23) & 0xff;
        var m = e == 0 ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
        var f = sign * m * Math.pow(2, e - 150);
        return [f, dataArray]; //return f.toFixed(3)
    }

    /**
     * Encode Token and device ids data
     * @param clientHash client token.
     * @param deviceIds device ids array.
     */
    encodeData(clientHash, deviceIds) {
        var data;
        data = this.PackString(clientHash, data);
        data = this.PackArrayVarInt64(deviceIds, data);
        data = this.PrependLength(data);
        return data;
    }

    /**
     * check engine status
     * @param val integer value of enginer status.
     */
    Itob(val) {
        if (val > 0) {
            return true;
        }
        return false;
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
