import { makeStyles } from '@material-ui/core/styles';

const width = window.innerWidth/2 + 'px';
const height = (window.innerHeight - 55)*0.8 + 'px';

const useStyles = theme => ({
  topHeaderRight: {
    position: 'absolute',
    top: '65px',
    right: '60px',
    opacity: 0.8,
    width: 'auto',
    backgroundColor: 'grey',
    padding: '0.25em',
    zIndex: 999,
    borderRadius: '5px'
  },
  topHeaderLeft: {
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: 'auto',
    backgroundColor: 'transparent',
    zIndex: 999
  },
  icon: {
    width: '30px',
    height: '30px',
  },
  btn: {
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    backgroundColor: 'darkgrey',
    padding: '0',
    margin: '0 0.15em',
    border: '1px solid #FFFFFF',
    width: '40px',
    height: '40px',
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "grey"
    }
  },
  textStyle: {
    textTransform: 'capitalize',
    margin: '0 0.25em',
    fontWeight: 'bold'
  },
  rightHeaderBtn: {
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    backgroundColor: '#FFFFFF',
    padding: '0.15em 0.5em',
    margin: '0.25em',
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#FFF"
    }
  }
});

export { useStyles };