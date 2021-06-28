import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.5em 1em',
    backgroundColor: '#000000',
  },
  link: {
    textDecoration: 'none',
  },
  textStyle: {
    color: '#FFFFFF',
    fontWeight: '300',
    marginLeft: '0.25em',
  },
  titleStyle: {
    color: '#FFFFFF',
    // fontWeight: 'bold',
  },
  btnStyle: {
    border: '2px solid #28ACEA',
    color: '#FFFFFF',
  },
  btnTextStyle: {
    textTransform: 'capitalize',
  },
}));

export { useStyles };
