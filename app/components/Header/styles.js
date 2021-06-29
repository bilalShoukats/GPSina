import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0.5em 1em',
    backgroundColor: '#000000',
  },
  textStyle: {
    color: '#FFFFFF',
    fontWeight: '300',
    marginLeft: '0.25em',
    textTransform: 'capitalize',
  },
  titleStyle: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    // fontWeight: 'bold',
  },
  btnStyle: {
    border: '2px solid #28ACEA',
    color: '#FFFFFF',
  },
  btnTextStyle: {
    textTransform: 'capitalize',
  },
  emptyBtnStyle: {
    width: '5em',
  },
}));

export { useStyles };
