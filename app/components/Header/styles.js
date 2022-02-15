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
    color: '#FFFFFF'
  },
  emptyBtnStyle: {
    width: '5em',
  },
  btnFenceCircleStyle: {
    display: 'inline-block',
    padding: '0.25em 0.5em',
    minHeight: 0,
    minWidth: 0,
    backgroundColor: 'transparent',
    border: '1px solid #FFFFFF',
  },
  btnFenceStyle: {
    display: 'inline-block',
    padding: '0.25em 0.5em',
    minHeight: 0,
    marginLeft: '1em',
    minWidth: 0,
  },
  iconDiv: {
    textAlign: 'end',
  },
  topIcon: {
    height: 40,
    width: '5%',
    marginTop: 20,
  }
}));

export { useStyles };
