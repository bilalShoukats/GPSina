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
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { Styles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GiBattery75 } from 'react-icons/gi';
import { FaSolarPanel, FaTemperatureLow } from 'react-icons/fa';

import { FaOilCan } from 'react-icons/fa';
import Geocode from 'react-geocode';

import {
    faSortUp,
    faCog,
    faPowerOff,
    faBars,
    faHome,
    faFileAlt,
    faSearchLocation,
    faUsers,
    faCarAlt,
    faCogs,
    faChartBar,
    faFilter,
    faSatelliteDish,
    faCar,
    FaAirbnb,
} from '@fortawesome/free-solid-svg-icons';
import {
    Button,
    Grid,
    Typography,
    Avatar,
    Container,
    Link,
    Switch,
} from '@material-ui/core';
import newScreen from '../../containers/HistoryPage/newScreen';
import { Text } from 'recharts';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
};

const scrollTo = ref => {
    if (ref && ref.current /* + other conditions */) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

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

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

export function List(props) {
    const classes = useStyles(props);
    const history = useHistory();
    const { index, isScrolling, style, data } = props;
    // console.log('Vehicle List Props : ', props.data[props.index]);
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [address, setAddress] = React.useState('');
    const [selectedIndexx, setSelectedIndexx] = React.useState('');

    // const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const handleOpen = () => {
        setOpen(true);
        console.log(handleOpen,'handleOpen>>>');
    };
    const handleClose = () => {
        setOpen(false);
    };

    const goToLocateScreen = (lat,lng) => {
        console.log("hello,2,,")
        history.push(SCREENS.LOCATE, {  lat:lat,lng:lng  });
    };

    const goToHistoryScreen = (lat,lng) => {
        history.push(SCREENS.HISTORY, { lat:lat,lng:lng });
    };

    const goToFenceScreen = (lat,lng) => {
        history.push(SCREENS.FENCE,{lat:lat,lng:lng });
    };

    // const goTonewScreen = () => {
    //     history.push(SCREENS.NEW);
    // };
    // const showMoreModal= () => {
    //     props.onOpenModal();
    // };

    const goToAlertScreen = (lat,lng) => {
        history.push(SCREENS.ALERT, {lat:lat,lng:lng });
    };
    const getLocationAddress = (lat, lng, event, index) => {
        setSelectedIndexx(index);
        Geocode.setApiKey('AIzaSyCvlR6R50PN-7o-7UABXDTrdjIAMudbRfM');
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, lng).then(
            response => {
                // let newList = vehicle[0];
                // const prevIndex=vehicleInfo.filter(item=>)
                const address = response.results[0].formatted_address;
                console.log('address:', address);
                setAddress(address);
            },
            error => {
                console.error(error);
            },
        );
    };
    // const enableMoving = () => {
    //     setIsMoving(!isMoving);
    //     setIsIdling(false);
    //     setIsOffline(false);
    //     setIsParked(false);
    //     let index = filters.indexOf('isMoving');
    //     if (isMoving) {
    //         filters.splice(index, 1);
    //         applyFilter(filters);
    //     } else {
    //         applyFilter(previous => [...previous, 'isMoving']);
    //         changeFilter(0, vehicles);
    //     }
    // };
    const changeAccStatus = () => {
        //
    };

    function rand() {
        return Math.round(Math.random() * 20) - 10;
    }
    function getModalStyle() {
        const top = 50;
        const left = 50;
        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div className={classes.mainDiv}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.vibrate} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.devider} />
            <div className={classes.div}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.regNo} />
                </Typography>

                <input placeholder="Reg No" className={classes.inputField} />
                <div>
                    <Button
                        style={{ left: '40%' }}
                        variant="contained"
                        color="secondary"
                    >
                        save
                    </Button>
                </div>
            </div>
            <Divider className={classes.devider} />
            <div className={classes.div}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.speed} />
                </Typography>

                <input placeholder="KM/H" className={classes.inputField} />
                <div>
                    <Button
                        className={classes.buttonSave}
                        variant="contained"
                        color="secondary"
                    >
                        save
                    </Button>
                </div>
            </div>
            <Divider className={classes.devider} />
            <div className={classes.div}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.oilCut} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.devider} />
            <div className={classes.div}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.rfid} />
                </Typography>

                <input className={classes.rfidInput} />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 10,
                }}
            >
                 <TextField
                    style={{ width: '40%', left: '30%' }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                /> 
                <input className={classes.rfidInput2} />

                <div>
                    <Button
                        className={classes.buttonSave}
                        variant="contained"
                        color="secondary"
                    >
                        save
                    </Button>
                </div>
            </div>
            <div style={{ marginTop: 10 }}>
                 <TextField
                    style={{ width: '40%', left: '30%', marginTop: 10 }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                /> 
                <input className={classes.rfidInput2} />
            </div>
            <Divider className={classes.devider} />
            <div className={classes.div}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.sos} />
                </Typography>
                 <TextField
                    style={{ width: '40%', right: '30%' }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                /> 
                <input className={classes.rfidInput} />
            </div>
            <div className={classes.div}>
                <text>Speed</text> 
                 <TextField defaultValue="" /> 
                <TextField
                    style={{ width: '40%', marginLeft: '30%' }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                /> 
                <input className={classes.rfidInput2} />

                <div>
                    <Button
                        className={classes.buttonSave}
                        variant="contained"
                        color="secondary"
                    >
                        save
                    </Button>
                </div>
            </div>
            <div style={{ marginTop: 10 }}>
                 <TextField
                    style={{
                        width: '40%',
                        left: '30%',
                        top: 10,
                    }}
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                /> 
                <input className={classes.rfidInput2} />
            </div>
            <div className={classes.div2}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.sharedDevices} />
                </Typography>
                {/* <TextField defaultValue="" /> */}
                <div>
                    <Button
                        className={classes.buttonSave}
                        variant="contained"
                        color="secondary"
                    >
                        Go
                    </Button>
                </div>
            </div>
            <Divider className={classes.devider} />
            <div className={classes.div}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.notification} />
                </Typography>
            </div>
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.overSpeed} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.vibrate} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.fence} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.wireCut} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.acc} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.sos} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.oil} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.lowBattery} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.rfid} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
            <div className={classes.div3}>
                <Typography className={classes.typography} variant="body2">
                    <FormattedMessage {...messages.carAlarm} />
                </Typography>
                <Switch>
                    checked={props.vibrateChecked}
                    onChange={props.handleVibrate}
                    className={classes.switch}
                </Switch>
            </div>
            <Divider className={classes.pushDevider} />
        </div>
    );
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
                        {data[index].deviceID}
                    </Typography>
                    {/* <Typography variant="body2" className={classes.mutedText}>
                        {moment
                            .unix(data[index].CreatedAt)
                            .add(1, 'y')
                            .format('D MMM YYYY')}
                    </Typography> */}
                    <Grid item>
                        <Typography
                            variant="body1"
                            className={classes.description}
                        >
                            {`(${moment
                                .unix(data[index].activatedTime_)
                                .format('D.MM.YYYY')} - ${moment
                                .unix(data[index].expiredTime_)
                                .add(1, 'y')
                                .format('D.MM.YYYY')})`}

                            <FaTemperatureLow
                                style={{ marginLeft: 10 }}
                                size={20}
                            />
                            <FaOilCan style={{ marginLeft: 10 }} size={20} />
                            <GiBattery75 style={{ marginLeft: 10 }} size={20} />
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    {/*{data[index].lastVehicleInformation.battery < 50 ? (
                        <Img
                            width={'20%'}
                            alt="low battery"
                            style={{
                                transform: 'rotate(180deg)',
                                marginRight: '5px',
                            }}
                            src={require('../../../assets/images/icons/low_battery.png')}
                        />
                        ) : null}*/}
                    <Button
                        color="default"
                        className={classes.btn}
                        variant="outlined"
                        onClick={changeAccStatus}
                    >
                        {/*{data[index].lastVehicleInformation.engineStatus ? (
                            <Typography variant="body2">
                                <FormattedMessage {...messages.accOn} />
                            </Typography>
                        ) : (
                            <Typography variant="body2">
                                <FormattedMessage {...messages.accOff} />
                            </Typography>
                        )}*/}
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
                            onClick={() => goToLocateScreen()}
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
                            onClick={() => goToHistoryScreen(data[index])}
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
                            onClick={handleOpen}
                            className={classes.btnOutline}
                        >
                            {/**{ console.log('handleOpenonClick',handleOpen)} */}
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
                            onClick={() => goToAlertScreen(data[index])}
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
                        <Typography
                            // onClick={(event, index) =>
                            //     getLocationAddress(data[index])
                            // }
                            variant="body2"
                            className={classes.mutedText}
                            display="inline"
                            onClick={() => {
                                getLocationAddress(
                                    data[index].lastVehicleInformation.gpsLat,
                                    data[index].lastVehicleInformation.gpsLng,
                                );
                            }}
                        >
                            {/*{data[index].lastVehicleInformation.gpsLat}
                            {data[index].lastVehicleInformation.gpsLng}*/}
                        </Typography>
                        {/* <span>kiii</span> */}
                        <span
                            style={{
                                fontSize: 12,
                                color: 'white',
                            }}
                        >
                            <span>{address}</span>
                        </span>
                    </Grid>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
             {/** {console.log( "body....",body)} */}
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
