import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: '500px',
    marginTop: '1em',
    padding: '0 1em',
  },
  container: {
    marginTop: '1em',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    textTransform: 'capitalize',
  },
  avatar: {
    marginTop: '1em',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    border: '3px solid #28ACEA',
    marginTop: '0.5em',
    marginBottom: '1em',
    borderRadius: '5px',
    padding: '0 0.25em',
  },
  title: {
    fontWeight: '500',
    margin: '0.5em 0',
  },
  bottomContainer: {
    margin: '2em 0',
  },
  btnBlue: {
    margin: '0.8em 0',
    width: '80%',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    border: '2px solid #28ACEA',
    fontWeight: '400',
    padding: '0.5em 0',
  },
  btnYellow: {
    margin: '0.8em 0',
    width: '80%',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    border: '2px solid #FEE128',
    fontWeight: '400',
    padding: '0.5em 0',
  },
  btnRed: {
    margin: '0.8em 0',
    width: '80%',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    border: '2px solid #FF0000',
    fontWeight: '400',
    padding: '0.5em 0',
  },
  versionStyle: {
    marginRight: '1em',
    color: '#28ACEA',
  },
  dispalyNone: {
    dispaly: 'none'
  }
}));

export { useStyles };
