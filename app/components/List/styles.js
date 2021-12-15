import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        padding: '0.25em 0em',
        width: '100%',
    },
    btn: {
        color: '#fff',
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
    paper: {
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflow: 'scroll',
        height: '80%',
        backgroundColor: 'black',
    },
    mainDiv: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
    },
    devider: {
        marginTop: 10,
        height: 1,
        backgroundColor: '#28ACEA',
    },
    pushDevider: {
        marginTop: 5,
        height: 1,
        backgroundColor: '#28ACEA',
    },
    pushNotificationText: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'normal',
        marginTop: 20,
        color: 'white',
    },
    div: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    div2: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    div3: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    switch: {
        color: 'white',
    },
    inputField: {
        width: '35%',
        height: 35,
        borderWidth: 1,
        borderColor: '#08c3eb',
    },
    buttonSave: {
        left: '40%',
    },
    rfidInput: {
        width: '40%',
        marginRight: '30%',
        height: 35,
        borderWidth: 1,
        borderColor: '#08c3eb',
    },
    rfidInput2: {
        width: '40%',
        marginLeft: '30%',
        height: 35,
        borderWidth: 1,
        borderColor: '#08c3eb',
    },
    TextColor: {
        color: 'white',
    },
    typography: {
        color: 'white',
        fontSize: 17,
    },
}));

export { useStyles };
