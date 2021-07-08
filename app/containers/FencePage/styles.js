import { makeStyles } from '@material-ui/core/styles';

const width = window.innerWidth/2 + 'px';
const height = (window.innerHeight - 55)*0.8 + 'px';

const useStyles = theme => ({
  drawer: {
    width: width,
    heigth: '100%',
    padding: '1em 0.25em'
  },
  paper: {
    backgroundColor: "#000000",
    opacity: 0.7
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
  },
  switch: {
    marginLeft: '1em',
  },
  btnMenu: {
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    backgroundColor: 'black',
    padding: '0',
    margin: '0 0.15em',
    border: '1px solid #FFFFFF',
    width: '40px',
    height: '40px',
    opacity: 0.7,
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "grey"
    }
  },
  textStyle: {
    color: '#28ACEA',
    padding: '0 0.25em',
    cursor: 'pointer',
  },
  pencilStyle: {
    cursor: 'pointer',
  },
  drawerItemContainer: {
    padding: '0.1em 1em',
  },
  textTitleStyle: {
    color: '#28ACEA',
    textTransform: 'uppercase'
  },
  divider: {
    backgroundColor: '#FFFFFF',
    margin: '0.5em 0'
  },
  dividerTitle: {
    backgroundColor: '#FFFFFF',
    marginTop: '1em',
    marginBottom: '0.5em'
  },
  searchInput: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'grey',
    right: '90px',
    top: '45px',
    width: '250px',
    padding: '0.15em 0.5em',
  },
  textfield: {
    // display: 'inline',
    backgroundColor: '#FFFFFF',
    margin: '0.25em',
    height: '25px',
    width: '200px',
    borderRadius: '10px',
    padding: '0 0.25em',
    fontSize: '14px'
  }
});

export { useStyles };
