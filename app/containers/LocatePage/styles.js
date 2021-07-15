import { makeStyles } from '@material-ui/core/styles';

const width = window.innerWidth/2 + 'px';
const height = (window.innerHeight - 95) + 'px';

const useStyles = theme => ({
  header: {
    height: '40px',
    backgroundColor: '#000000',
    margin: '0 0.5em'
  },
  btn: {
    display: 'inline-block',
    padding:0,
    minHeight: 0,
    minWidth: 0,
    margin: '0 0.5em'
  },
  icon: {
    width: '25px',
    height: '25px',
  },
  mapContainer: {
    width: '100%',
    height: height,
    backgroundColor: 'white'
  },
  speedIcon: {
    height: '200px',
    height: '200px',
    position: 'absolute',
    bottom: '10px',
    left: '10px'
  },
  speedText: {
    position: 'absolute',
    bottom: '100px',
    left: '80px'
  },
  speedMeterText: {
    position: 'absolute',
    bottom: '80px',
    left: '95px',
    width: 'auto'
  }
});

export { useStyles };
