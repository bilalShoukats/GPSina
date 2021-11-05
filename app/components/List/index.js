import React from 'react';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import messages from './messages';
import { useHistory } from 'react-router-dom';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import { FixedSizeList } from 'react-window';
import Delete from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import InfiniteLoader from 'react-window-infinite-loader';
import './style.css';
import fenceIcon from '../../../assets/images/icons/fence.png';
import alertIcon from '../../../assets/images/icons/alert.png';
import locateIcon from '../../../assets/images/icons/locate.png';
import historyIcon from '../../../assets/images/icons/history.png';
import plusIcon from '../../../assets/images/icons/plus.png';
import SCREENS from '../../constants/screen';
import { useStyles } from './styles.js';
import Img from '../Img';
import {
    Button,
    Grid,
    Typography,
    Avatar,
    Container,
    Link,
} from '@material-ui/core';

const CListItem = withStyles({
    root: {
        padding: '20px 10px',
        backgroundColor: '#0000',
        borderRadius: '5px',
        marginBottom: '5px',
        color: 'white',

        '&:hover': {
            backgroundColor: '#dadbdc',
            color: 'white',
            '& .MuiListItemIcon-root': {
                color: 'white',
            },
        },
    },
})(ListItem);

const CListText = withStyles({
    root: {
        color: '#494949',
    },
})(ListItemText);

class Row extends React.PureComponent {
    render() {
        const { index, isScrolling, style, data } = this.props;

        return (
            <CListItem
                key={index}
                style={{ ...style, ...{ backgroundColor: 'yellow' } }}
            >
                <CListText
                    primary={`${isScrolling ? 'Scrolling' : 'List' + index}`}
                />
            </CListItem>
        );
    }
}

export function List(props) {
    const classes = useStyles(props);
    const history = useHistory();
    const { index, isScrolling, style, data } = props;
    console.log('Vehicle List Props : ', props.data[props.index]);

    const goToLocateScreen = vehicle => {
        history.push(SCREENS.LOCATE, { vehicle: vehicle });
    };

    const goToHistoryScreen = () => {
        history.push(SCREENS.HISTORY);
    };

    const goToFenceScreen = () => {
        history.push(SCREENS.FENCE);
    };

    const showMoreModal = () => {
        props.onOpenModal();
    };

    const goToAlertScreen = () => {
        history.push(SCREENS.ALERT);
    };

    const changeAccStatus = () => {
        //
    };

    return !isScrolling ? (
        <Grid
            divider={true}
            container
            direction="column"
            style={{
                backgroundColor: '#000',
                borderBottom: '1px solid #5f5a5a',
                padding: 1,
            }}
        >
            <Grid
                container
                spacing={2}
                justify="space-between"
                direction="row"
                alignItems="center"
            >
                <Grid item>
                    <Typography
                        variant="body1"
                        className={classes.textWhite}
                        display="inline"
                    >
                        {data[index].registrationNo}
                    </Typography>
                    <Typography
                        variant="body2"
                        className={classes.mutedText}
                        display="inline"
                    >
                        {data[index].vehicleModel}
                    </Typography>
                    <Typography variant="body2" className={classes.mutedText}>
                        {moment
                            .unix(data[index].CreatedAt)
                            .add(1, 'y')
                            .format('D MMM YYYY')}
                    </Typography>
                </Grid>
                <Grid item>
                    {data[index].lastVehicleInformation.battery < 50 ? (
                        <Img
                            width={'20%'}
                            alt="low battery"
                            style={{
                                transform: 'rotate(180deg)',
                                marginRight: '5px',
                            }}
                            src={require('../../../assets/images/icons/low_battery.png')}
                        />
                    ) : null}
                    <Button
                        color="default"
                        className={classes.btn}
                        variant="outlined"
                        onClick={changeAccStatus}
                    >
                        {data[index].lastVehicleInformation.engineStatus ? (
                            <Typography variant="body2">
                                <FormattedMessage {...messages.accOn} />
                            </Typography>
                        ) : (
                            <Typography variant="body2">
                                <FormattedMessage {...messages.accOff} />
                            </Typography>
                        )}
                    </Button>
                </Grid>
                <div className={classes.btnContainer}>
                    <Grid
                        container
                        spacing={1}
                        justify="space-between"
                        direction="row"
                        alignItems="center"
                    >
                        <Grid
                            onClick={() => goToLocateScreen(data[index])}
                            className={classes.btnOutline}
                        >
                            <Img
                                src={locateIcon}
                                alt="Locate Icon"
                                className={classes.logoStyle}
                            />
                            <Typography
                                variant="body2"
                                className={classes.textWhite}
                            >
                                <FormattedMessage {...messages.locate} />
                            </Typography>
                        </Grid>
                        <Grid
                            onClick={goToFenceScreen}
                            className={classes.btnOutline}
                        >
                            <Img
                                src={fenceIcon}
                                alt="Fence Icon"
                                className={classes.logoStyle}
                            />
                            <Typography
                                variant="body2"
                                className={classes.textWhite}
                            >
                                <FormattedMessage {...messages.fence} />
                            </Typography>
                        </Grid>
                        <Grid
                            onClick={goToHistoryScreen}
                            className={classes.btnOutline}
                        >
                            <Img
                                src={historyIcon}
                                alt="History Icon"
                                className={classes.logoStyle}
                            />
                            <Typography
                                variant="body2"
                                className={classes.textWhite}
                            >
                                <FormattedMessage {...messages.history} />
                            </Typography>
                        </Grid>
                        <Grid
                            onClick={showMoreModal}
                            className={classes.btnOutline}
                        >
                            <Img
                                src={plusIcon}
                                alt="More Icon"
                                className={classes.logoStyle}
                            />
                            <Typography
                                variant="body2"
                                className={classes.textWhite}
                            >
                                <FormattedMessage {...messages.more} />
                            </Typography>
                        </Grid>
                        <Grid
                            onClick={goToAlertScreen}
                            className={classes.btnOutline}
                        >
                            <Img
                                src={alertIcon}
                                alt="Alert Icon"
                                className={classes.logoStyle}
                            />
                            <Typography
                                variant="body2"
                                className={classes.textWhite}
                            >
                                <FormattedMessage {...messages.alert} />
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    ) : (
        <CListItem style={{ ...style, ...{ backgroundColor: '#000' } }}>
            <CListText primary="Scrolling" />
        </CListItem>
    );
}
class VehicleList extends React.PureComponent {
    render() {
        const { index, isScrolling, style, data } = this.props;
        // console.log('Vehicle List Props : ', this.props);

        return !isScrolling ? (
            <CListItem
                key={index}
                divider={true}
                style={{ ...style, ...{ backgroundColor: '#000' } }}
            >
                <CListText
                    primary={data[index].deviceID + index}
                    secondary={data[index].registrationNo}
                />

                <CListText
                    primary={moment
                        .unix(data[index].CreatedAt)
                        .add(1, 'y')
                        .format('D MMM YYYY')}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                <Link
                                    href="#"
                                    onClick={e => e.preventDefault()}
                                >
                                    Location
                                </Link>
                                <Link
                                    href="#"
                                    onClick={e => e.preventDefault()}
                                >
                                    Fence
                                </Link>
                                <Link
                                    href="#"
                                    onClick={e => e.preventDefault()}
                                >
                                    History
                                </Link>
                            </Typography>
                        </React.Fragment>
                    }
                />
            </CListItem>
        ) : (
            <CListItem style={{ ...style, ...{ backgroundColor: '#000' } }}>
                <CListText primary="Scrolling" />
            </CListItem>
        );
    }
}

const InfiniteList = props => {
    // const useStyles = makeStyles({
    //     container: {
    //         position: 'relative',
    //     },
    // });

    const classes = useStyles(props);

    const itemCount = props.hasNextPage ? props.itemCount + 1 : props.itemCount;

    const loadMoreItems = props.isNextPageLoading
        ? () => {}
        : props.loadNextPage;

    const isItemLoaded = index => {
        return !props.hasNextPage || index < props.itemCount;
    };

    const ListContainer = props => {
        // const classes = useStyles();
        return (
            <Container
                id="container"
                maxWidth="sm"
                className={classes.container}
                {...props}
            />
        );
    };

    return (
        <InfiniteLoader
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
            // threshold={10}
        >
            {({ onItemsRendered, ref }) => (
                <FixedSizeList
                    {...props}
                    ref={ref}
                    itemSize={50}
                    useIsScrolling
                    layout={'vertical'}
                    width={props.width}
                    height={props.height}
                    itemData={props.itemData}
                    itemCount={props.itemCount}
                    innerElementType={ListContainer}
                    onItemsRendered={onItemsRendered}
                    classes={classes}
                >
                    {props.List === 'VehicleList' ? List : Row}
                </FixedSizeList>
            )}
        </InfiniteLoader>
    );
};

export default InfiniteList;
