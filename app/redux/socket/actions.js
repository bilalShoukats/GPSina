 
import { 
    SET_DEVICES,
    SET_GPS_DATA,
    SET_VOLTAGE_BATTERY,
    SET_ALARMS,
    SET_DEVICE_SETTING,
    SET_DEVICE_STATUS,
    SET_ENGINE_STATUS,
    SET_DEVICE_SIGNAL,
    SET_GOT_SIGNAL,
    SET_GPS_SIGNALS,
   } from "../actions";

//use this action to set devices
export const setDevices = (devices) =>({
  // console.log("devices=#1=>action ????",devices)
  
    type: SET_DEVICES,
      payload: {devices}
      
  
    
  });
  
  //use this action to set gps data
  
  export const setGPSData = (gpsData) =>({
      type: SET_GPS_DATA,
      payload: {gpsData}
 
  });
  //use this action to set voltage battery data
  export const setVoltageBattery = (batteryData) => ({
    // console.log("voltageData==#3=>action ????",batteryData)
    
      type: SET_VOLTAGE_BATTERY,
      payload: {batteryData},
  
  });
  
  //use this action to set alarm data
  export const setAlarms = (alarmData) => ({
    // console.log("alarmData==#4=>action ????",alarmData)
    
      type: SET_ALARMS,
      payload:  {alarmData} ,
  
  });
  
  //use this action to set device setting data
  export const setDeviceSetting = (deviceSettingData) => ({
    // console.log("deviceSettingData==#5=>action ????",deviceSettingData)
 
      type: SET_DEVICE_SETTING,
      payload:  {deviceSettingData} ,

  });
  
  //use this action to set device status data
  export const setDeviceStatus = (deviceStatusData) => ({
// console.log("deviceStatusData==#6=>action ????",deviceStatusData)

      type: SET_DEVICE_STATUS,
      payload:  {deviceStatusData} ,

  });
  
  //use this action to set engine status data
  export const setEngineStatus = (engineData) => ({
    // console.log("engineStatusData==#7=>action ????",engineData)
      type: SET_ENGINE_STATUS,
      payload: {engineData} ,

  });
  
  export const setDeviceSignal = (signalData) => ({
    // console.log("setDeviceSignal==#8=>action ????",signalData)

      type: SET_DEVICE_SIGNAL,
      payload: {signalData},

  });
  export const setGotSignal = (gotSignal) => ({
   

    type: SET_GOT_SIGNAL,
    payload: {gotSignal},

  });
  export const setGPSSignals = (gpsSignals) => ({
   

    type: SET_GPS_SIGNALS,
    payload: {gpsSignals},
  });
 
  