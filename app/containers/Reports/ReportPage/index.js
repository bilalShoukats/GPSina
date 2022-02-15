import React, { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AiFillCaretDown } from 'react-icons/ai';
import ApiManager from '../../../ApiManager/ApiManager';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import Header from '../../../components/Header';
import { useStyles } from './styles.js';
import messages from './messages';
import ReportItem from './ReportItem';
import { historyData, idlingData, alarmData, ignitionData, vehiclesList } from '../../../Locals/ReportSample';

export function ReportPage(props) {

    const classes = useStyles(props);
    const api = ApiManager.getInstance();
    const [reportID, setReportID] = useState(props.location.state);
    const [list, setList] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [selectedId, setSelectedId] = React.useState(null);
    const [vehicles, setVehicles] = React.useState(null);
    const [vehicleInfo, setVehicleInfo] = React.useState(null);
    const [historyDetail, setHistoryDetail] = React.useState(null);
    const [regNo, setRegNo] = React.useState('');
    const [date, setDate] = React.useState('');

    let today = new Date();
    let unixTime = (today / 1000) | 0;
    let reminder = unixTime % (60 * 60 * 24);
    let startTime = unixTime - reminder;
    let endTime = startTime + 60 * 60 * 24;

    /* Used for fetching all active vehicles */
    const getAllActiveVehicles = () => {
        // api.send('post', '/viewVehicles', { page: 1 })
        //     .then(res => {
        //         console.log('ALL DEVICES', res);
        //         if (res.data.code === 1019) {
        //             setList(res.data.response);
        //             if (res.data.code === 1019) {
        //                 setData(res.data.response);
        //             }
        //         }
        //     })
        //     .catch(error => {});
        setVehicles(vehiclesList);
    };

    /* Used for fetching report date based on vehicle, date and other filters like alarm type */
    const getReportData = () => {
        // console.log('selectedId', selectedId);
        // api.send('POST', '/vehicleTravelHistoryDetails', {
        //     deviceid: '' + selectedId,
        //     starttime: 1635724800,
        //     enddate: 1635724800,
        // })
        //     .then(res => {
        //         console.log('Travel History Detail', res);
        //         if (res.data.code === 1012) {
        //             setVehicleInfo(res.data.response);
        //             if (res.data.code === 1012) {
        //                 setHistoryDetail(res.data.response);
        //             }
        //             let time = res.data.response.map(item => ({
        //                 time: new Date(item.time),
        //             }));
        //             setDate(time);
        //             console.log('time', time);
        //         }
        //     })
        //     .catch(error => {});
        setVehicleInfo(reportID == 1? historyData:reportID == 2?idlingData:reportID == 3?alarmData:ignitionData);
    };

    useEffect(() => {
        if (regNo !== '') {
            getReportData();
        }
    }, [regNo]);

    useEffect(() => {
        getAllActiveVehicles();
    }, []);

    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
        setRegNo(event.registrationNo);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <Helmet>
                <title>
                    {
                        reportID == 1 ? props.intl.formatMessage({ ...messages.history }):
                        reportID == 2 ? props.intl.formatMessage({ ...messages.idling }):
                        reportID == 3 ? props.intl.formatMessage({ ...messages.alarm }):
                        props.intl.formatMessage({ ...messages.ignition })
                    }
                </title>
            </Helmet>
            <Header title={reportID == 1 ? <FormattedMessage {...messages.history} />:
                reportID == 2 ? <FormattedMessage {...messages.idling} />:
                reportID == 3 ? <FormattedMessage {...messages.alarm} />:
                <FormattedMessage {...messages.ignition} />}
                showPdfButton
            />
            <div className={classes.outerDiv}>
                <div className={classes.title}>
                    <Typography className={classes.text}>
                        {regNo === '' ? 'Select Vehicle' : regNo}
                    </Typography>
                    <AiFillCaretDown
                        onClick={handleClickListItem}
                        style={{ color: 'white' }}
                    />
                </div>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{ horizontal: 'right' }}
                    getContentAnchorEl={null}
                    PaperProps={{
                        style: {
                            maxHeight: 200,
                            width: 300,
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 100,
                        },
                    }}
                >
                    {vehicles &&
                        vehicles.map((event, index) => (
                            <MenuItem
                                key={index}
                                selected={index === selectedIndex}
                                onClick={() =>
                                    handleMenuItemClick(event, index)
                                }
                            >
                                {event.registrationNo}
                            </MenuItem>
                        ))}
                </Menu>
            </div>
            <div className={classes.dateDiv}>
                <Button style={{ backgroundColor: 'grey' }} variant="contained">
                    <TextField
                        id="date"
                        type="date"
                        defaultValue={today}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Button>
            </div>
            {true ? (
                <div className={classes.itemDiv}>
                    {vehicleInfo &&
                        vehicleInfo.map((event, index) => (
                            <ReportItem
                                classes={classes}
                                selected={index === selectedIndex}
                                reportID={reportID}
                                index={index}
                                event={event} 
                            />
                        ))}
                </div>
            ) : null}
        </div>
    );
}

ReportPage.propTypes = {
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

export default compose(withConnect)(injectIntl(ReportPage));