import { makeStyles } from '@material-ui/core/styles';

const mapHeight = (window.innerHeight - 95) * 0.9 + 'px';

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
    width: '100%',
    height: '550px',
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
  }
});

export { useStyles };
