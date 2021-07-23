import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.25em 0em',
    width: '100%'
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
    minHeight: '70px'
  },
  logoStyle: {
    width: '30px',
    marginBottom: '0.25em',
  },
  mutedText: {
    color: 'grey',
    marginLeft: '0.5em',
  },
}));

export { useStyles };
