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
  rightContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnLang: {
    marginLeft: '1em',
    display: 'inline',
    textTransform: 'capitalize',
    backgroundColor: 'grey',
    color: '#FFFFFF',
  },
  btn: {
    margin: '1em 0',
    textTransform: 'capitalize',
    padding: '0.25em 1.5em',
    backgroundColor: 'grey',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  flagStyles: {
    width: '30px',
    marginLeft: '1em',
  },
  content: {
    display: 'block',
    textAlign: 'left',
    marginTop: '1em',
  },
  textfield: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: '5px',
    padding: '0.25em 0.5em',
    marginBottom: '1em',
  },
  textfieldSignUp: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    borderRadius: '5px',
    padding: '0.25em 0.5em',
    marginBottom: '0.25em',
  },
  link: {
    display: 'inline-flex',
    padding: '0.25em 1em',
    textDecoration: 'none',
    cursor: 'pointer',
    outline: 0,
    color: 'grey',
  },
  error: {
    color: 'red',
  },
  inlineContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orStyles: {
    color: '#41addd',
    fontSize: '20px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  textStyle: {
    textTransform: 'capitalize',
  }
}));

export { useStyles };
