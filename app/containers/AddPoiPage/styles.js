import { makeStyles } from '@material-ui/core/styles';
const width = Math.min((((window.innerWidth/12) * 8) * 0.5), 350);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 'auto',
    maxWidth: '1000px',
    marginTop: '4em',
    padding: '0 2em',
    paddingBottom: '2em'
  },
  container: {
    margin: '1em 0',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    textTransform: 'capitalize',
  },
  avatar: {
    marginTop: '2em',
  },
  textInput: {
    width: '100%',
    backgroundColor: 'transparent',
    color: '#ABABAB',
    borderBottom: '3px solid #ABABAB',
    marginTop: '0.5em',
    marginBottom: '1em',
    padding: '0.2em 0.5em',
    fontSize: '14px',
    borderRadius: '0px'
  },
  title: {
    fontWeight: '500',
    margin: '1em 0 0.5em 0',
  },
  btnContainer: {
    marginTop: '1em',
    width: '100%',
  },
  btnBlue: {
    margin: '0.8em auto',
    width: width + 'px',
    backgroundColor: '#ABABAB',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    borderRadius: '20px',
    fontWeight: '400',
    padding: '0.5em 0',
    '&:hover': {
      backgroundColor: "#ABABAB",
    }
  },
  radioContainer: {
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioGroup: {
    margin: '0 2em'
  },
  radioSelection: {
    marginTop: '1em'
  }
}));

export { useStyles };