import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    textAlign: 'center',
    width: '100%',
    margin: 'auto',
    display: 'block',
    padding: '1em',
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
    flexGrow: 1,
    padding: '0 0.8em',
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
}));

export { useStyles };
