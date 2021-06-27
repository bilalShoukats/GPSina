import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    textAlign: 'center',
    width: '60%',
    margin: 'auto',
    display: 'block',
    padding: '1em',
    '@media (max-width: 780px)': {
      width: '90%',
    },
    '@media (min-width: 1201px)': {
      width: '40%',
    },
  },
  logo: {
    display: 'block',
  },
  container: {
    marginTop: '2em',
  },
  textfield: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: '5px',
    padding: '0.25em 0.5em',
    marginBottom: '1em',
  },
  content: {
    display: 'block',
    textAlign: 'left',
    marginTop: '1em',
  },
  inlineContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: '1em 0.5em',
    textTransform: 'capitalize',
    padding: '0.25em 1.5em',
    backgroundColor: 'grey',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
  },
}));

export { useStyles };
