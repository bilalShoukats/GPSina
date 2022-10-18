import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        padding: '0.25em 0em',
        width: '100%',
    },
    btn: {
        color: '#28ACEA',
        border: '2px solid #28ACEA',
    },
    btnContainer: {
        padding: '0.5em 0.5em',
        margin: '0.5em 0',
    },
    btnOutline: {
        border: '2px solid #28ACEA',
        textAlign: 'center',
        width: '19%',
        height: 'auto',
        padding: '0.4em 0.25em',
        textTransform: 'capitalize',
        cursor: 'pointer',
        minHeight: '70px',
    },
    logoStyle: {
        width: '30px',
        marginBottom: '0.25em',
    },
    mutedText: {
        color: 'grey',
        marginLeft: '0.5em',
    },
    textWhite: {
        color: '#fff',
    },
    textLastEngineOnOff: {
        border: '1px solid #28ACEA',
        textAlign: 'center',
        color: '#fff',
        
        width: "14%",
        right:'20px',
        float:'top',
       position:'absolute',

    },
    deviceAccStyle: {
        paddingVertical: 3,
        // marginHorizontal: 5,
        marginRight:5,
        // borderColor: "#66c6f6",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center"
      },
    accButtonStyle: {
        color: "#5da6d6",
        fontWeight: 'bold',
        fontSize: 12,
        paddingHorizontal: 5
    },
    accViewStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSpeed: {
        color: '#fff',
    },
    textdevice: {
        color: '#4da8ee',
        textAlign:'end',
        float: "right",  
    },
    textaddress: {
        // width: '100%',
        // height: 'auto',
        color: '#fff',
        textAlign:'end',
        float: "right", 

        // border: '1px solid #28ACEA',
    },
    description: {
        margin: '0.25em 0',
      },

    textCurrentState:{
        textAlign:'end',
        color: '#fff',    
    }
}));


export { useStyles };
