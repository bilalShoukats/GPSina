import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleModal: {
    backgroundColor: 'grey',
    border: '1px solid #000000',
    borderRadius: '5px',
    width: '250px',
    // boxShadow: theme.shadows[5],
    color: '#FFFFFF',
  },
  textContainer: {
    padding: '1em 1em',
  },
  btnContainer: {
    width: '250px',
    height: '40px',
    borderTop: '1px solid #000000',
    color: '#FFFFFF',
    padding: '1.5em 0',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyles: {
    textTransform: 'capitalize',
  },
  moreModal: {
    color: '#FFFFFF',
    width: '300px',
    backgroundColor: '#000000',
  },
  moreModalTitle: {
    backgroundColor: '#28ACEA',
    width: '300px',
    padding: '0.5em 0.5em',
    borderBottom: '1px solid #FFFFFF',
  },
  moreModalContent: {
    backgroundColor: '#000000',
    padding: '0.5em 0.5em',
  },
  moreModalIndividualContent: {
    padding: '0.25em 1em',
    borderBottom: '1px solid #28ACEA',
  },
  moreModalIndividualContentWithBtn: {
    padding: '0.8em 1em',
    borderBottom: '1px solid #28ACEA',
  },
  moreModalIndividualContentPushNoti: {
    padding: '0.8em 1em',
  },
  switch: {
    color: '#FFF128',
  },
  greenBtn: {
    width: '45px',
    height: '35px',
    padding: '0',
    backgroundColor: 'green',
  },
  textInput: {
    backgroundColor: 'transparent',
    border: '2px solid #28ACEA',
    width: '100px',
    marginLeft: '0.5em',
    borderRadius: '5px',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: '14px',
    padding: '0.25em 0.4em',
  },
}));

export { useStyles };
