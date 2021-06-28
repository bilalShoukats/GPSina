import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.25em 0em',
  },
  btn: {
    color: '#28ACEA',
    borderColor: '#28ACEA',
  },
  btnContainer: {
    padding: '0.5em 0.5em',
    margin: '0.5em 0',
  },
  btnOutline: {
    border: '2px solid #28ACEA',
    display: 'flex',
    width: '19%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'capitalize',
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
