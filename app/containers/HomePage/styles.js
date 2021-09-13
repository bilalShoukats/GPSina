import { makeStyles } from '@material-ui/core/styles';

const mapHeight = (window.innerHeight - 95) * 0.9 + 'px';
const width = Math.max(window.innerWidth/4, 350) + 'px';
console.log(width);

const useStyles = theme => ({
    root: {
        // minHeight: '100vh',
        maxHeight: '1000px',
        textAlign: 'center',
        width: '100%',
        margin: 'auto',
        display: 'block',
        // padding: '1em',
    },
    topBar: {
        padding: '1em',
        borderBottom: '1px solid #5f5a5a',
    },
    logo: {
        textAlign: 'center',
        width: '5em',
    },
    container: {
        marginTop: '2em',
        padding: '0 1em',
    },
    textfield: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderRadius: '5px',
        padding: '0.1em 0.5em',
        marginBottom: '0.25em',
    },
    btn: {
        margin: '1em 0',
        textTransform: 'capitalize',
        padding: '0.25em 1.5em',
        backgroundColor: 'grey',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    paginationContainer: {
        marginTop: '1em',
    },
    settingsBtn: {
        cursor: 'pointer',
    },
    mapContainer: {
        height: mapHeight,
        paddingLeft: '0.5em',
    },
    list: {
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '0.25em',
    },
    leftContainer: {
        paddingRight: '0.5em'
    },
    icon: {
        marginLeft: '5px',
        width: '15px',
        height: '15px'
    },
    paginationBtn: {
        textAlign: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
    },
    drawer: {
        width: width,
        heigth: '100%',
        padding: '1em 0.25em'
    },
    drawerItemContainer: {
        padding: '0.1em 1em',
    },
    textTitleStyle: {
        color: '#000000',
        textTransform: 'uppercase'
    },
    divider: {
        backgroundColor: '#000000',
        margin: '0.5em 0'
    },
    dividerTitle: {
        backgroundColor: '#000000',
        marginTop: '1em',
        marginBottom: '0.5em'
    },
    avatar: {
        marginTop: '1em',
        marginBottom: '1em',
    },
    listItemContainer: {
        margin: '0.5em 0',
    },
    black: {
        backgroundColor: '#000',
    },
});

export { useStyles };
