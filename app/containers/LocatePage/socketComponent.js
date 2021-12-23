import React, { Fragment, Component } from 'react';
var Protocol = require('bin-protocol');
import { isNumber } from 'util';
export default class SocketComponent extends Component {
    constructor(props) {
        super(props);
        this.socket = '';
        this.hardClose = false;
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
     * Disconnect socket server connection on screen change.
     */
    disconnectSocketServer = () => {
        console.log('SOCKET HARD CLOSE', this.socket);
        if (this.socket) {
            console.log('SOCKET CLOSED');
            this.socket.close(1000);
            this.socket = '';
            this.hardClose = true;
        }
    };

    /**
     * Create connection with web socket server and send encrypted token and device ids on socker.
     * @param hash hash of the logged in user.
     * @param deviceIds device ids array.
     * @param callBackFunc call back function to return data to.
     */
    connectSocketServer = async (hash, deviceIds, callBackFunc) => {
        this.socket = new WebSocket('ws://13.229.0.123:8082'); //live NEW
        this.token = hash;
        this.deviceIDs = deviceIds;
        this.callBack = callBackFunc;

        this.socket.onopen = () => {
            console.log('socket opened: ', this.deviceIDs);
            var data = this.encodeData(this.token, this.deviceIDs);
            data = this.convertStringArrayToByteArray(data);
            console.log('socket data sent: ', Uint8Array.from(data));
            this.socket.send(Uint8Array.from(data));
        };
        this.socket.binaryType = 'arraybuffer';

        this.socket.onmessage = e => {
            if (e.data instanceof ArrayBuffer) {
                const view = new DataView(e.data);
                let serverData = Buffer.from(view.buffer);
                if (this.hardClose) this.socket.close(1000);
                else {
                    var serverReponse = new Uint8Array(serverData);
                    if (this.rightPacket(serverReponse)) {
                        var unpackData = this.UnPackVarUInt32(serverReponse);
                        var deviceUnpackData = this.UnPackInt64(unpackData[1]);
                        // var engineByte = deviceUnpackData[1].slice(0, 1);
                        console.log(
                            'WHAT IS DEVICE UNPACK: ',
                            deviceUnpackData,
                        );
                        var engineByte = this.UnPackInt32(deviceUnpackData[1]);
                        console.log('WHAT IS ENGINE BYTE: ', engineByte);
                        // var engineStatus = this.Itob(engineByte[0]);
                        var engineStatus = engineByte[0];
                        console.log('WHAT IS ENGINE STATUS: ', engineStatus);
                        var Lat = this.UnPackFloat32(engineByte[1]);
                        console.log('WHAT IS LAT: ', Lat);
                        var Lng = this.UnPackFloat32(Lat[1]);
                        console.log('WHAT IS LNG: ', Lng);
                        var gpsSpeed = this.UnPackFloat32(Lng[1]);
                        console.log('WHAT IS GPS SPEED: ', gpsSpeed);
                        var obdSpeed = this.UnPackFloat32(gpsSpeed[1]);
                        console.log('WHAT IS OBD SPEED: ', obdSpeed);
                        var carTemprature = this.UnPackFloat32(obdSpeed[1]);
                        console.log('WHAT IS CAR TEMPERATURE: ', carTemprature);
                        var fuelReading = this.UnPackFloat32(carTemprature[1]);
                        console.log('WHAT IS FUEL READING: ', fuelReading);
                        var rpm = this.UnPackFloat32(fuelReading[1]);
                        console.log('WHAT IS RPM: ', rpm);
                        // var battery = this.UnPackFloat32(rpm[1]);
                        // console.log("WHAT IS BATTERY: ", battery);
                        this.callBack(
                            deviceUnpackData[0],
                            engineStatus,
                            Lat[0],
                            Lng[0],
                            gpsSpeed[0],
                            obdSpeed[0],
                            carTemprature[0],
                            fuelReading[0],
                            rpm[0],
                        );
                    }
                }
            } else {
                // text frame
                console.log('outside: ', e.data);
            }
        };

        this.socket.onerror = e => {
            // an error occurred
            console.log('socket error: ', e);
            console.log('socket error: ', e.message);
            if (this.hardClose) {
                this.socket.close(1000);
            } else {
                this.socket.close(1000);
                this.connectSocketServer(
                    this.token,
                    this.deviceIDs,
                    this.callBack,
                );
            }
        };

        this.socket.onclose = e => {
            // connection closed
            console.log('socket close: ', e.code, e.reason);
        };
    };

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
}
