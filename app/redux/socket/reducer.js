import {
    SET_DEVICES,
    SET_GPS_DATA,
    SET_VOLTAGE_BATTERY,
    SET_ALARMS,
    SET_DEVICE_SETTING,
    SET_DEVICE_STATUS,
    SET_ENGINE_STATUS,
    SET_DEVICE_SIGNAL,
    SET_GPS_SIGNALS,
    SET_GOT_SIGNAL,
    } 
    from "../actions";



const INIT_STATES = {

    devices: [],
    gpsData: {},
    batteryData: {},
    gpsSignals: 0,
    alarmData: {},
    deviceSettingData: {},
    deviceStatusData: {},
    engineData: {},
    gotSignal: false,
    gpsSignals: 0


    // setEngineStatus:{},
    // deviceSignal: {},
    // lockData: {},
    // gotSignal: false,
};

export default (state = INIT_STATES, action) => {
    // console.log('state>>>',state,action);
    console.log('action.type socket>',action.type);
    switch (action.type) {

       
       
        case SET_DEVICES:
            console.log('devices>>>>>devices',action.payload.devices);
            return {
                ...state,
                devices: action.payload.devices,
            };

            case SET_GPS_DATA:
                console.log('gpsData>>>>>gpsData',action.payload.gpsData);
    
                return {
                    ...state,
                    gpsData: action.payload.gpsData,
                };


             case SET_VOLTAGE_BATTERY:
                return {
                  ...state,
                  batteryData: action.payload.batteryData ,
                };

                case SET_ALARMS:
                    return {
                        ...state,
                        alarmData: action.payload.alarmData ,
                    };
                    
                            case SET_DEVICE_SETTING:
                                return {
                                    ...state,
                                    deviceSettingData: action.payload.deviceSettingData ,
                                    
                                };

                                case SET_DEVICE_STATUS:
                                    return {
                                        ...state,
                                        deviceStatusData: action.payload.deviceStatusData ,
                                      
                                    };
                                    case SET_ENGINE_STATUS:
                                        console.log('>>>>>engineData',action.payload.engineData);
                                        return {
                                            ...state,
                                            engineData: action.payload.engineData,
                                            
                                        };
                                        
                                        case SET_DEVICE_SIGNAL:
                                            console.log('>>>>>signalData',action.payload.signalData);
                                            return {
                                                ...state,
                                                signalData:  action.payload.signalData,
                                                
                                            };


                                            case SET_GOT_SIGNAL: {
                                                return {
                                                    ...state,
                                                    gotSignal: action.payload
                                                }
                                            }

                                            case SET_GPS_SIGNALS: {
                                                return {
                                                    ...state,
                                                    gpsSignals: action.payload
                                                }
                                            }
                                         
        default:
            return {
                ...state,
            };
    }
};
