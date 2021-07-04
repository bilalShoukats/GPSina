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
}));

export { useStyles };
