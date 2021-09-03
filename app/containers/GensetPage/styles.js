import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    padding: '1.5em 2em'
  },
  container: {
    padding: '0.5em 1em',
    margin: '0.5em 0',
    borderRadius: '10px',
    backgroundColor: 'grey',
    opacity: 0.8,
  },
  content: {
    padding: '0 1.5em',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export { useStyles };