import { Button, Grid, Typography, Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { useStyles } from './styles.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import { POICOLORS } from '../../constants/poi';
import Delete from '@material-ui/icons/Delete';
import Public from '@material-ui/icons/Public';
import VpnLock from '@material-ui/icons/VpnLock';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import {
    faBuilding,
    faChevronRight,
    faFlag,
    faHome,
    faIndustry,
    faMapMarkerAlt,
    faStreetView,
} from '@fortawesome/free-solid-svg-icons';
import SCREENS from '../../constants/screen';
const PoiList = ({ ...props }) => {
    const classes = useStyles(props);
    const history = useHistory();
    const goToPOIDetailScreen = () => {
        console.log('Poi for details : ', poi);
        history.push(SCREENS.POIDETAIL, { poi: poi });
    };

    const handleIcon = icon => {
        switch (icon) {
            case 1:
                return faBuilding;

            case 2:
                return faHome;

            case 3:
                return faMapMarkerAlt;

            case 4:
                return faIndustry;

            case 5:
                return faFlag;

            case 6:
                return faStreetView;

            default:
                return faBuilding;
        }
    };

    const { poi } = props;
    return (
        <Grid className={classes.main}>
            <SwipeableList threshold={0.25}>
                <SwipeableListItem
                    swipeLeft={{
                        content: (
                            <div className={classes.delete}>
                                {`Delete POI`}
                                <Delete />
                            </div>
                        ),

                        action: () => props.swipeLeftAction(poi),
                    }}
                    swipeRight={{
                        content: (
                            <div className={classes.assign}>
                                {!poi.zoneId && (
                                    <div>
                                        {`Assign Zone`}
                                        <Public />
                                    </div>
                                )}
                                {poi.zoneId && (
                                    <div>
                                        {`Un-assign Zone`}
                                        <VpnLock />
                                    </div>
                                )}
                            </div>
                        ),
                        action: () => props.swipeRightAction(poi),
                    }}
                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.container}
                    >
                        <Grid item xs={2} md={1} className={classes.avatar}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <FontAwesomeIcon
                                    icon={handleIcon(poi.markerShop)}
                                    color={POICOLORS[poi.color]}
                                    size="3x"
                                    onClick={goToPOIDetailScreen}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={10}
                            md={11}
                            alignItems="center"
                            className={classes.content}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography
                                                variant="body1"
                                                className={classes.title}
                                            >
                                                {'Name : '}
                                                <Typography
                                                    variant="body1"
                                                    className={
                                                        classes.description
                                                    }
                                                >
                                                    {poi.name}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="body1"
                                                className={classes.title}
                                            >
                                                {'Type : '}
                                                <Typography
                                                    variant="body1"
                                                    className={
                                                        classes.description
                                                    }
                                                >
                                                    {poi.type}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="body1"
                                                className={classes.title}
                                            >
                                                {'Zone : '}
                                                <Typography
                                                    variant="body1"
                                                    className={
                                                        classes.description
                                                    }
                                                >
                                                    {poi.zoneId}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography
                                                variant="body1"
                                                className={classes.title}
                                            >
                                                {'Address : '}
                                                <Typography
                                                    variant="body1"
                                                    className={
                                                        classes.description
                                                    }
                                                >
                                                    {poi.address}
                                                </Typography>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        size="1x"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </SwipeableListItem>
            </SwipeableList>
        </Grid>
    );
};

//PoiList.propTypes = propTypes;
// PoiList.defaultProps = defaultProps;
export default PoiList;
