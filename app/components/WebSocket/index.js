var Protocol = require('bin-protocol');
var socket = new WebSocket('ws://192.168.88.18:8091');

export default class SocketComponent {

    constructor(token, deviceIDs, callBackFunc) {
        this.callBack = callBackFunc;
        this.token = "abcd";
        this.deviceIDs = ["1887032832", "1941080183"];
        console.log("Inside Socket Component");

        this.connectSocketServer();
    }

    /**
        * Convert every character of array into their ASCHII code .
        * @param stringArray character.
        */
    convertStringArrayToByteArray(stringArray) {
        var simpleArray = [];
        for (var i = 0; i < stringArray.length; i++) {
            var char = stringArray[i];
            if (this.isLetter(char)) {
                var conversion = char.charCodeAt();
                simpleArray.push(conversion);
            } else {
                simpleArray.push(char);
            }
        }
        return simpleArray;
    }

    connectSocketServer = async () => {
        console.log("trying to conenct to server");
        socket.onopen = () => {
            console.log("socket is open now: ");
            var data = this.encodeData(this.token, this.deviceIDs);
            data = this.convertStringArrayToByteArray(data);
            socket.send(Uint8Array.from(data));
        }
        socket.bufferType = "arraybuffer";

        socket.onmessage = (e) => {
            e.data.arrayBuffer()
                .then(value => {
                    console.log("serverData: ", value);
                    var unpackData = this.UnPackVarUInt32(new Uint8Array(value));
                    console.log("After unpack data: ", unpackData);
                    var deviceUnpackData = this.UnPackInt32(unpackData[1]);
                    console.log("device unpack 64: ", deviceUnpackData);
                    var engineByte = deviceUnpackData[1].slice(0, 1);
                    console.log("device engine status: ", engineByte[0]);
                    var engineStatus = this.Itob(engineByte);
                    console.log("status: ", engineStatus);
                    var Lat = this.UnPackFloat32(deviceUnpackData[1].subarray(1));
                    console.log("lattitude: ", Lat);
                    var Lng = this.UnPackFloat32(Lat[1]);
                    console.log("longtitude: ", Lng);
                })

            // var uint8View = this.UnPackVarUInt32(e.data);
            // console.log('Size', uint8View)
            // console.log("DecodeData: DATA FROM SERVER: ", uint8View);
            // var unpackData = this.UnPackVarInt32(uint8View);
            // console.log("DecodeData:: UNPACK: ", unpackData[1]);
            // var status = this.Itob(unpackData[0]);
            // console.log("DecodeData::status::", status);
            // var Lat = this.UnPackFloat32(unpackData[1]);
            // console.log("Decode Data: Lat:: ", Lat[0]);
            // var Long = this.UnPackFloat32(Lat[1]);
            // console.log("Decode Data: Long:: ", Long[0]);
            // // console.log("data decode is: ", data);
            // callBack(Long);
        }

        socket.onerror = (e) => {
            // an error occurred
            console.log("socket error: ", e.message);
        };

        socket.onclose = (e) => {
            // connection closed
            console.log("socket close: ", e.code, e.reason);
        };
    }

    /**
        * Checks the value is character then return true.
        * @param c character.
        */
    isLetter(c) {
        return c.length === 1 && c.match(/[a-zA-Z]/i);
    }

    /**
        * Pack var unsigned int 32 bit 
        * @param numberValue devices list.
        * @param dataArray token array.
        */
    PackVarUInt32(numberValue, dataArray) {
        var protocol = new Protocol();
        var buffer = protocol.write().UVarint(numberValue).result;
        var combined
        if (dataArray == null) {
            var combined = buffer;
        } else {
            combined = [...dataArray, ...buffer];
        }
        return combined
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
            var combined = buffer
        } else {
            var convertedLength = [...dataArray, ...buffer];
            combined = [...convertedLength, ...data]
        }
        combined = [...combined, ...stringVal.toString(2)]
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
        var combined
        if (dataArray == null) {
            var combined = buffer;
        } else {
            combined = [...dataArray, ...buffer]
        }
        return combined
    }

    /**
        * Pack array var int 64 bit
        * @param deviceIds devices list.
        * @param dataArray token array.
        */
    PackArrayVarInt64(deviceIds, dataArray) {
        console.log(deviceIds);
        length = deviceIds.length
        console.log(length);
        if (length > 65535) {
            return dataArray
        }
        dataArray = this.PackVarUInt32(length, dataArray)
        for (var i = 0; i < length; i++) {
            dataArray = this.PackVarInt64(deviceIds[i], dataArray)
        }
        return dataArray
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
        * Un Pack int 32 bit device id
        * @param dataArray data array.
        */
    UnPackInt32(dataArray) {
        // var data = dataArray.slice(0, 4);
        // dataArray = dataArray.slice(4);
        // console.log("UnPackInt32: dataArray: ", dataArray);
        var protocol = new Protocol();
        var deviceId = protocol.read(dataArray).SVarint().result;
        console.log("UnPackInt32: deviceId: ", deviceId);
        var bytes = protocol.write().SVarint(deviceId).result;
        console.log("UnPackInt32: bytes: ", bytes);
        dataArray = dataArray.slice(bytes.length);
        console.log("UnPackInt32: remaining bytes: ", dataArray);
        return [deviceId, dataArray];
        // dataArray = dataArray.subarray(1);
        // return [buffer, dataArray];


        // console.log(this.intFromBytes(deviceBufferData));

        //console.log(this.readInt(deviceBufferData.length, deviceBufferData, 0));

        // console.log(this.readInt64FromBytes(deviceBufferData));

        // var value = 0;
        // for (var i = deviceBufferData.length - 3; i >= 0; i--) {
        //     value = (value * 255) + deviceBufferData[i] * 1;
        // }

        // console.log(value);


        // var protocol = new Protocol();
        // var buffer = protocol.read(dataArray).UVarint().result;
        // console.log("UnPackVarInt64:: buffer:: ", buffer);
        // var bytes = protocol.write().UVarint(buffer).result;
        // console.log("UnPackVarInt64:: bytes: ", bytes);
        // console.log("UnPackVarInt64: bytes String conversion: ", bytes.toString(10));

        // bytes.forEach(function (test, ind) {
        //     it('UVarint 64 bit #' + ind, function () {
        //         var encoded = protocol.write().UVarint64(test[2]).result;
        //         encoded.should.be.eql(test[0]);
        //         protocol.read(encoded).UVarint64('v').result.v.should.be.eql(test[2]);
        //     });
        // });

        // console.log("TESTETSE: ", (String) test);

        // var value = new Uint64LE(bytes);
        // console.log("Value: ", value.toString());

        // var value = new Uint64BE(bytes);
        // console.log("Value: ", value.toJSON());

        // var value = new Int64BE(bytes);
        // console.log("Value: ", value.toJSON());

        // var value = new Int64LE(bytes);
        // console.log("Value: ", value.toJSON());


        // var value = 0;
        // for (var i = 0; i < bytes.length; i++) {
        //     console.log(bytes[i]);
        //     value |= ((bytes[i]) | (bytes[i] << 8) | (bytes[i] << 16) | (bytes[i] << 24) | (bytes[i] << 32) | (bytes[i] << 40) | (bytes[i] << 48) | (bytes[i] << 56) | (bytes[i] << 64)) >>> 0;
        //     console.log("sam: ", value);
        // }

        //dataArray = dataArray.subarray(1);

        // console.log(value);

        // console.log(int64Value);
        // console.log("REST8: ", parseInt(Number("dcedbdc08ea797b10e"), 10));

        // dataArray = dataArray.subarray(1);
        //return [buffer, dataArray];
        // var combined
        // if (dataArray == null) {
        //     var combined = buffer;
        // } else {
        //     combined = [...dataArray, ...buffer]
        // }
        // return combined
    }

    /**
        * Un Pack var int 64 bit
        * @param dataArray data array.
        */
    // UnPackVarInt64(dataArray) {
    //     var protocol = new Protocol();
    //     var buffer = protocol.write().SVarint64(numberValue).result;
    //     var combined
    //     if (dataArray == null) {
    //         var combined = buffer;
    //     } else {
    //         combined = [...dataArray, ...buffer]
    //     }
    //     return combined
    //     // console.log("DataArray in varint64: ", dataArray);
    //     // var protocol = new Protocol();
    //     // var buffer = protocol.read(dataArray).SVarint64().result;
    //     // console.log("buffer in varint64: ", buffer);
    //     // var bytes = protocol.write().SVarint64(buffer).result;
    //     // console.log("bytes in varint64: ", bytes);

    //     // console.log("CENSORED: ", (this.readInt(bytes)).toPrecision());



    //     //dataArray = dataArray.subarray(1);
    //     //return [buffer, dataArray];
    // }

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
        var bits = (data[0] << 24) | (data[1] << 16) | (data[2] << 8) | (data[3]);
        var sign = ((bits >>> 31) == 0) ? 1.0 : -1.0;
        var e = ((bits >>> 23) & 0xff);
        var m = (e == 0) ? (bits & 0x7fffff) << 1 : (bits & 0x7fffff) | 0x800000;
        var f = sign * m * Math.pow(2, e - 150);
        return [f, dataArray];//return f.toFixed(3)
    }

    /**
        * Encode Token and device ids data
        * @param clientHash client token.
        * @param deviceIds device ids array.
        */
    encodeData(clientHash, deviceIds) {
        var data
        data = this.PackString(clientHash, data)
        data = this.PackArrayVarInt64(deviceIds, data)
        console.log("Encode data: ", data);
        data = this.PrependLength(data)
        return data
    }

    Itob(val) {
        if (val > 0) {
            return true
        }
        return false
    }
}