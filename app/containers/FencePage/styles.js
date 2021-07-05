import { makeStyles } from '@material-ui/core/styles';

const width = window.innerWidth/2 + 'px';
const height = window.innerHeight -55 + 'px';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: width,
    heigth: height,
  },
  topHeaderRight: {
    position: 'absolute',
    top: '70px',
    right: '10px',
    width: 'auto',
    backgroundColor: 'transparent',
    zIndex: 999
  },
  topHeaderLeft: {
    position: 'absolute',
    top: '70px',
    left: '10px',
    width: 'auto',
    backgroundColor: 'transparent',
    zIndex: 999
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
  btnGrey: {
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    backgroundColor: 'grey',
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
  logo: {
    width: '30px'
  }
}));

export { useStyles };
