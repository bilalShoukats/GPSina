import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: '1.5em 6em',
  },
  container: {
    margin: '0.5em 0',
  }, 
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: '0.25em',
    marginTop: '0.5em',
  },
  description: {
    margin: '0.25em 0',
  },
  link: {
    color: '#28ACEA'
  }
}));

export { useStyles };
