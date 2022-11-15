import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    padding: '1.0em 4em',
    backgroundColor: 'transparent',
},
  
container: {

  backgroundColor: 'gray',
  marginBottom: '10px',
  '&:hover': {
      backgroundColor: '#ABABAB',
  },
},
iconTextStyle: {
  position: "absolute",
  fontWeight: "bold",
  color:'white',
  // fontStyle: 'italic',
  fontSize: 33,
  
},
content: {
  padding: '1.0em 0.0em',
},
avatar: {
  padding: '0.5em 1.5em',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
      opacity: 5.0,
  },
},
title: {
  textTransform: 'capitalize',
  fontWeight: 'bold',
},
}));

export { useStyles };
