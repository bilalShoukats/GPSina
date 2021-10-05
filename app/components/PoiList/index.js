import { Button, Grid, Typography, Avatar } from '@material-ui/core';
import React, { useState } from 'react';
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
import POICOLORS from '../../containers/PoiDetailPage/poiColors';
import Delete from '@material-ui/icons/Delete';
import Assignment from '@material-ui/icons/Assignment';
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
    const [poId, setPoId] = useState('');

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
    const handlePoId = poi => {
        console.log('poi', poi);
        setPoId(poi.poId);
    };
    const { poi } = props;
    return (
        <Grid className={classes.main}>
            <SwipeableList threshold={0.25}>
                <SwipeableListItem
                    swipeLeft={{
                        content: (
                            <div
                                style={{
                                    // bottom: -15,
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    padding: '0px 18px',
                                    alignItems: 'center',
                                    position: 'relative',
                                    backgroundColor: 'red',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                Delete POI
                                <Delete />
                            </div>
                        ),

                        action: () => props.swipeLeftAction(poi),
                    }}
                    swipeRight={{
                        content: (
                            <div
                                style={{
                                    // bottom: -15,
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    padding: '0px 18px',
                                    alignItems: 'center',
                                    position: 'relative',
                                    backgroundColor: 'blue',
                                    // justifyContent: 'flex-end',
                                }}
                            >
                                Assign Zone
                                <Delete />
                            </div>
                        ),

                        action: () => props.swipeRightAction(poi),
                    }}
                    // onSwipeProgress={progress => {
                    //     if (progress > 30)
                    //         console.info(`Swipe progress: ${progress}%`);
                    // }}
                >
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        className={classes.container}
                        onClick={() => handlePoId(poi)}
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
                                    // style={{ }}
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
                                                    {poi.zone}
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
