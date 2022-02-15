import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        padding: '1.0em 4em',
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: 'rgb(57,57,57)',
        marginBottom: '10px',
        '&:hover': {
            backgroundColor: '#ABABAB',
        },
    },
    content: {
        padding: '0 1.5em',
    },
    avatar: {
        padding: '0.5em 1.5em',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            opacity: 5.0,
        },
    },
    title: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    description: {
        textTransform: 'capitalize',
        display: 'inline',
        padding: '0.5em 1em',
        margin: '0.5em 0',
    },
    assign: {
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'blue',
        padding: '0 1.5em',
    },
    delete: {
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'red',
        padding: '0 1.5em',
    },
    available: {
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'green',
        padding: '0 1.5em',
    },
    notAvailable: {
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: '#404040',
        padding: '0 1.5em',
    },
    activity: {
        position: 'absolute',
        top: '50%',
        left: ' 50%',
        transform: 'translate(-50%, -50%)',
    },
    paginate: {
        marginLeft: 'auto',
        backgroundColor: 'gray',
        color: 'primary',
        textTransform: 'capitalize',
        borderRadius: '10px',
        fontWeight: '400',
        padding: '0.5em 0',
        '&:hover': {
            backgroundColor: '#ABABAB',
        },
    },
    centered: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    icon: {
        fill: 'white',
        width: '32px',
        height: '32px',
        alignSelf: 'center',
    },
    maindiv: {
        // width: '48%',
        backgroundColor: 'rgb(57,57,57)',
        // marginTop: '01%',
        // marginLeft: '27%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainOuterDiv: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(57,57,57)',
        padding: 10,
    },
    infoTitle: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'rgb(68,68,68)',
        // border: '1px solid transparent',
    },
    boxStyle: {
        flexDirection: 'row',
        backgroundColor: 'rgb(57,57,57)',
        margin: '1em 0.5em 0 0.5em',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    boxHeader: {
        left: "0px",
        backgroundColor: "red",
    },
    headerStyle: {
        padding: "0px",
        margin: "0 0 0 1em",
        color: "white"
    },
    headerBarIcon: {
        color: "white",
        margin: "0.3em 0.7em 0 0"
    },
    vehicleDividerStyle: {
        backgroundColor: "rgb(235, 179, 77)",
        border: '1px solid rgb(235, 179, 77)',
    },
    driverDividerStyle: {
        backgroundColor: "rgb(204, 71, 39)",
        border: '1px solid rgb(204, 71, 39)',
    },
    poiDividerStyle: {
        backgroundColor: "rgb(155, 135, 106)",
        border: '1px solid rgb(155, 135, 106)',
    },
    zoneDividerStyle: {
        backgroundColor: "rgb(235, 179, 77)",
        border: '1px solid rgb(235, 179, 77)',
    },
    avatarStyle: {
        backgroundColor: "transparent"
    },
    infoContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "1em 0 1em 0"
    },
    otherInfoContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "1.8em 0 1.9em 0"
    },
    zoneInfoContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        margin: "2.4em 0 2.4em 0"
    },
    infoDetailContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-between',
        width: "40%"
    },
    titleElement: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        fontSize: "large",
        color: "white"
    },
    cardContainer: {
        display: "flex",
        width: "40%",
        justifyContent: "flex-start"
    },
    totalStyle: {
        display: "flex",
        width: "100%",
    },
    countStyle: {
        fontSize: 'larger',
        color: 'rgb(227,159,69)',
        margin: "0 0.2em 0 0"
    }
}));

export { useStyles };
