/**
 *
 * FencePage
 *
 */

import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { SuperHOC } from '../../HOC';
import Header from '../../components/Header';
import { Button, Drawer, Grid, Switch, Typography } from '@material-ui/core';
import { useStyles } from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faHandPaper, faSearch } from '@fortawesome/free-solid-svg-icons';

import messages from './messages';
import Map from '../../components/Map';

import mapIcon from '../../../assets/images/icons/map.png';
import Img from '../../components/Img';


export function FencePage(props) {
  const classes = useStyles(props);
  const [isMarkerShown, setIsMarkerShown] = useState(true);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [mapType, setMapType] = useState('roadmap');
  const [fenceSwitch, setFenceSwitch] = useState(false);

  const handlefenceSwitch = (event) => {
    // console.log(event.target.checked);
    setFenceSwitch(event.target.checked);
  }

  const handleMapTypeClick = () => {
    if(mapType == 'roadmap'){
      setMapType('hybrid');
    } else {
      setMapType('roadmap');
    }
  }

  const handleMarkerClick = () => {
    setIsMarkerShown(!isMarkerShown);
    // console.log('isMarkerShown', isMarkerShown);
  };

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  }

  const height = window.innerHeight - 55 + 'px';
  const width = window.innerWidth + 'px';

  return (
    <div>
      <Helmet>
        <title>{props.intl.formatMessage({...messages.fence})}</title>
      </Helmet>
      <Header title={<FormattedMessage {...messages.fence} />} />

      <div>
        <Grid
          container
          style={{ width: width, height: height }}
        >
          <Drawer
            open={isOpenDrawer}
            onClose={toggleDrawer}
            variant="temporary"
          >
            <div 
              className={classes.drawer}
              onClick={toggleDrawer}
            >
              <Typography variant="body1" className={classes.title}>
                <FormattedMessage {...messages.fence} />
              </Typography>
            </div>
          </Drawer>
          <Grid item xs>
            <div>
              <Grid
                container
                direction="row"
                className={classes.topHeaderLeft}
              >
                <Switch
                  checked={fenceSwitch}
                  onChange={handlefenceSwitch}
                  name="fenceSwitch"
                  className={classes.switch}
                >
                  <Typography variant="body1" className={classes.title}>
                    <FormattedMessage {...messages.fence} />
                  </Typography>
                </Switch>
              </Grid>
              <Grid
                container
                direction="row"
                className={classes.topHeaderRight}
              >
                <Button className={classes.btnGrey} onClick={handleMapTypeClick}>
                  {/* <Typography variant="body1" className={classes.title}>
                    <FormattedMessage {...messages.fence} />
                  </Typography> */}
                  <Img
                    src={mapIcon}
                    className={classes.logo}
                    alt="Map icon"
                  />
                </Button>
                <Button className={classes.btnGrey}>
                  {/* <Typography variant="body1" className={classes.title}>
                    <FormattedMessage {...messages.fence} />
                  </Typography> */}
                  <FontAwesomeIcon
                    icon={faSearch}
                    color="#FFFFFF"
                    size="lg"
                  />
                </Button>
                <Button className={classes.btn}>
                  {/* <Typography variant="body1" className={classes.title}>
                    <FormattedMessage {...messages.fence} />
                  </Typography> */}
                  <FontAwesomeIcon
                    icon={faHandPaper}
                    color="lightgrey"
                    size="lg"
                  />
                </Button>
                <Button className={classes.btn} size="small">
                  <FontAwesomeIcon
                    icon={faCircle}
                    color="#28ACEA"
                    size="lg"
                  />
                </Button>
              </Grid>
            </div>
            <Map 
              isMarkerShown={isMarkerShown}
              onMarkerClick={handleMarkerClick}
              showMapTypeControl={false}
              showFullScreenControl={false}
              showStreetViewControl={false}
              mapTypeId={mapType}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

FencePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default SuperHOC(compose(withConnect)(injectIntl(FencePage)));
