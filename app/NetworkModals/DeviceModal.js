import PropTypes, { bool } from "prop-types";
var Protocol = require('bin-protocol');

export const DeviceModal = {
    softwareVer:PropTypes.string,// string
    registrationNo:PropTypes.string,// string
    deviceID:PropTypes.string,// string
    ownerEmail:PropTypes.string,// string
    createdBy:PropTypes.string,//string
    deviceAttachStatus:PropTypes.number,//varint int32
    deviceVersion:PropTypes.string,// string
    activatedTime_:PropTypes.number,// varint64
    expiredTime_:PropTypes.number,// varint64
    lastSeen:PropTypes.number,// varint64
    lastEngineSeen:PropTypes.number,// varint64
    lastGpsSeen:PropTypes.number,//  varint64
    lastEngineOnOff:PropTypes.string, //string
    currentState:PropTypes.number, //int8
    lastLatitude:PropTypes.number, //float64
    lastLongitude:PropTypes.number, //float64
    sharedUsers:Array,//Array of string
    isDeleted:bool, //bool
}

export const decodeAllDevices = (devices) => {
    console.log("what are devices: ", devices);
    return devices;
}

export const decodeData = (dataArray) => {
    var deviceBufferData = Buffer.from(dataArray);
    console.log("What is complete data buffer: ", deviceBufferData);
    var unpackData = UnPackVarUInt32(deviceBufferData);
    console.log("What is unpack data: ", unpackData);
    var returnedArray = UnPackString(unpackData[1]);
    DeviceModal.softwareVer = returnedArray[0];
    console.log("What is unpack software version: ", returnedArray[0]);
    var returnedArray = UnPackString(returnedArray[1]);
    DeviceModal.registrationNo = returnedArray[0];
    console.log("What is unpack registration number: ", returnedArray[0]);
    var returnedArray = UnPackString(returnedArray[1]);
    DeviceModal.deviceID = returnedArray[0];
    console.log("What is unpack device id: ", returnedArray[0]);
    var returnedArray = UnPackString(returnedArray[1]);
    DeviceModal.ownerEmail = returnedArray[0];
    console.log("What is unpack owner email: ", returnedArray[0]);
    var returnedArray = UnPackString(returnedArray[1]);
    DeviceModal.createdBy = returnedArray[0];
    console.log("What is unpack created by: ", returnedArray[0]);

    var returnedArray = UnPackVarInt32(returnedArray[1]);
    DeviceModal.deviceAttachStatus = returnedArray[0];
    console.log("What is unpack device attach status: ", returnedArray[0]);

    var returnedArray = UnPackString(returnedArray[1]);
    DeviceModal.deviceVersion = returnedArray[0];
    console.log("What is unpack device version: ", returnedArray[0]);

    var returnedArray = UnPackInt64(returnedArray[1]);
    DeviceModal.activatedTime_ = returnedArray[0];
    console.log("What is unpack activated time: ", returnedArray[0]);

    var returnedArray = UnPackInt64(returnedArray[1]);
    DeviceModal.expiredTime_ = returnedArray[0];
    console.log("What is unpack expired time: ", returnedArray[0]);
    var returnedArray = UnPackInt64(returnedArray[1]);
    DeviceModal.lastSeen = returnedArray[0];
    console.log("What is unpack last seen: ", returnedArray[0]);
    var returnedArray = UnPackInt64(returnedArray[1]);
    DeviceModal.lastEngineSeen = returnedArray[0];
    console.log("What is unpack last engine seen: ", returnedArray[0]);
    var returnedArray = UnPackInt64(returnedArray[1]);
    DeviceModal.lastGpsSeen = returnedArray[0];
    console.log("What is unpack last gps seen: ", returnedArray[0]);
    var returnedArray = UnPackString(returnedArray[1]);
    DeviceModal.lastEngineOnOff = returnedArray[0];
    console.log("What is unpack last engine on/off: ", returnedArray[0]);

    console.log(DeviceModal);

    // var returnedArray = UnPackInt32(returnedArray[1]);
    // DeviceModal.currentState = returnedArray[0];
    // console.log("What is unpack current state: ", returnedArray[0]);
    // var returnedArray = UnPackString(returnedArray[1]);
    // DeviceModal.lastLatitude = returnedArray[0];
    // console.log("What is unpack last latitude: ", returnedArray[0]);
    // var returnedArray = UnPackString(returnedArray[1]);
    // DeviceModal.lastLongitude = returnedArray[0];
    // console.log("What is unpack last longitude: ", returnedArray[0]);
}

/**
 * check length of the data packet
 * @param dataArray data array.
 */
function rightPacket(dataArray) {
    console.log("what is data in right  packet: ", dataArray);
    var protocol = new Protocol();
    var buffer = protocol.read(dataArray).UVarint().result;
    console.log("what is buffer in right  packet: ", buffer);
    dataArray = dataArray.subarray(1);
    if (buffer === dataArray.length) {
        return true;
    } else {
        return false;
    }
}

function UnPackString(dataArray) {
    console.log("INITITAL DATA  RRAY:  ",  dataArray);
    var returnArray = UnPackVarUInt32(dataArray)
    var length = returnArray[0]
    dataArray = returnArray[1]
    var stringValue = dataArray.slice(0, length);
    dataArray = dataArray.slice(length)
    var string = new TextDecoder().decode(stringValue);
    console.log("END DATA  RRAY:  ",  dataArray);
    return [string, dataArray];
}

/**
 * Pack var unsigned int 32 bit
 * @param numberValue devices list.
 * @param dataArray token array.
 */
function PackVarUInt32(numberValue, dataArray) {
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
function PackString(stringVal, dataArray) {
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
 * Un Pack var int 32 bit
 * @param dataArray data array.
 */
function UnPackVarInt32(dataArray) {
    console.log("INITITAL DATA  RRAY:  ",  dataArray);
    var protocol = new Protocol();
    var buffer = protocol.read(dataArray).SVarint().result;
    var bytes = protocol.write().SVarint(buffer).result;
    dataArray = dataArray.subarray(1);
    console.log("END DATA  RRAY:  ",  dataArray);
    return [buffer, dataArray];
}

function _UVarint64(dataArray) {
    var x = 0
    var  s = 0
    var  val1
    var val2
    for (var i= 0; i < 10; i++) {
        console.log(dataArray[i])
        if (dataArray[i] < 0x80) {
            if (i == 9 &&  dataArray[i] >  1) {
                return [0, -(i+1)]//overflow
            }
            val1 = x | dataArray[i] << s
            val2 = val1 >> 1
            if (val1&1 !=0 ) {
                val2 = val2^val2
            }
           return [val2, i + 1] 
        }
        x = x | dataArray[i]&0x7f << s
        s += 7
        console.log("value of x:",x)
        console.log("value of s:",  s)
    }
    return [0, 0]
}
/**
 * Un Pack var int 64 bit
 * @param dataArray data array.
 */
function UnPackVarInt64(dataArray){
    console.log("INITITAL DATA  RRAY:  ",  dataArray);
    var returnArray = _UVarint64(dataArray)
    dataArray = dataArray.slice(returnArray[1])
    console.log("Value:  ",  returnArray[0]);
    console.log("Read values:", returnArray[1])
    console.log("END DATA  RRAY:  ",  dataArray);
    return [returnArray[0], dataArray];
}

/**
     * Pack var int 64 bit
     * @param numberValue devices list.
     * @param dataArray token array.
     */
function PackVarInt64(numberValue, dataArray) {
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
 * Pack array var int 64 bit
 * @param deviceIds devices list.
 * @param dataArray token array.
 */
function PackArrayVarInt64(deviceIds, dataArray) {
    length = deviceIds.length;
    if (length > 65535) {
        return dataArray;
    }
    dataArray = PackVarUInt32(length, dataArray);
    for (var i = 0; i < length; i++) {
        dataArray = PackVarInt64(deviceIds[i], dataArray);
    }
    return dataArray;
}

/**
 * Pack array var int 64 bit
 * @param dataArray data array.
 */
function PrependLength(dataArray) {
    var length = dataArray.length;
    var protocol = new Protocol();
    var buffer = protocol.write().UVarint(length).result;
    var combined = [...buffer, ...dataArray];
    return combined;
}

/**
 * Un Pack int 32 bit bytes
 * @param dataArray data bytes array.
 */
function UnPackInt32(dataArray) {
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
function UnPackInt64(dataArray) {
    console.log("Start Array:", dataArray)
    var val
    val = dataArray[0] << 56
    val |= dataArray[1] << 48
    val |= dataArray[2] << 40
    val |= dataArray[3] << 32
    val |= dataArray[4] << 24
    val |= dataArray[5] << 16
    val |= dataArray[6] << 8
    val |= dataArray[7]
    dataArray = dataArray.slice(8)
    console.log("End Array", dataArray)
    return [val, dataArray];
}

/**
     * Un Pack var unsigned int 32 bit
     * @param dataArray data array.
     */
 function UnPackVarUInt32(dataArray) {
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
function UnPackFloat32(dataArray) {
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
 * check engine status
 * @param val integer value of enginer status.
 */
function Itob(val) {
    if (val > 0) {
        return true;
    }
    return false;
}