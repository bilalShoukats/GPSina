import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid, List, CircularProgress, Avatar, Divider, Typography, ListItem, ListItemAvatar, ListItemText, InputAdornment, TextField, Button } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import ScrollArea from 'react-scrollbar'
import './style.scss'
import GMap from './basic'
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import BarChart from './barchart'
import Bar from './bar'
import DistanceDriven from './distanceDriven'
import WeeklyProfile from './weeklyProfile'
import img3 from 'images/team/img5.jpg';

class FleetUtilization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedDriverId: 0,
            value: 0,
            companyIdsSet: "",
            email: "",
            hash: "",
            companyEmail: "",
            loading: true,
            currentPage: 1,
            totalPages: 0,
            itemsInPage: 10,
            carID: '',
            registrationNo: '',
            mapObject: new Map(),
            drivers: [],
            selectedIndex: 1,
            dailyProfileDat: [],
            weeklyGraphData: [],
            hoursDrivenData: [],
            weeklyDrivenData: [],
            distanceDrivenArr: [],
        }
    }

    componentDidMount = () => {
        Manager.getItemCallback('user', true, (user) => {
            this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash }, () => this.getAllDrivers());
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.timeout !== prevProps.timeout) {
            if (this.props.timeout === true) {
                this.setState({ loading: false })
            }
        }
    }

    loadMoreHandler = () => {
        if (this.state.currentPage < this.state.totalPages) {
            this.setState({ currentPage: this.state.currentPage + 1 }, () => {
                this.getAllDrivers();
            })
        }
    }

    getDailyProfile = (deviceID) => {
        this.barData(deviceID);
        this.graphData(deviceID);
    }

    barData = (deviceID) => {
        // this.setState({ loading: true });
        let body = {
            deviceid: deviceID.toString()
        }

        this.props.apiManager.makeCall('driverTripStats', body, res => {
            console.log("driverTripStats: ", res)
            if (res) {
                for (let index = 0; index < 31; index++) {
                    this.state.dailyProfileDat[index] = [];
                    var newArray = this.state.dailyProfileDat[index]
                    newArray[0] = index
                    newArray[1] = 0
                }
                res.response.map((item, index) => {
                    let date = new Date(item.tripStartTime).getDate()
                    if (this.state.dailyProfileDat[date][0] === date) {
                        let i = this.state.dailyProfileDat[date][1]
                        this.state.dailyProfileDat[date][1] = i + 1
                    }
                    else {
                    }
                    let day = new Date(item.tripStartTime).getDay()
                    if (this.state.weeklyGraphData[day][0] === day) {
                        let i = this.state.weeklyGraphData[day][1]
                        this.state.weeklyGraphData[day][1] = i + 1
                    }

                });
                this.setState({ dailyProfileDat: this.state.dailyProfileDat, weeklyGraphData: this.state.weeklyGraphData })
            }
            else {
                toast.error(res.id);
            }
            this.setState({ loading: false });
        })
    }

    graphData = (deviceID) => {
        // this.setState({ loading: true });
        let body = {
            deviceid: deviceID.toString()
        }
        this.props.apiManager.makeCall('totalTimeTripsDrive', body, res => {
            console.log('totalTimeTripsDrive', res)
            if (res) {
                for (let index = 0; index < 31; index++) {
                    this.state.hoursDrivenData[index] = [];
                    var newArray = this.state.hoursDrivenData[index]
                    newArray[0] = index
                    newArray[1] = 0
                }
                res.response.map((item, index) => {
                    let date = new Date(item.starttime).getDate()
                    if (this.state.hoursDrivenData[date][0] === date) {
                        let i = this.state.hoursDrivenData[date][1]
                        this.state.hoursDrivenData[date][1] = i + item.totalsum
                    }
                    else {
                    }
                });
                this.setState({ hoursDrivenData: this.state.hoursDrivenData, })
            }
            else {
                toast.error(res.id);
            }
            this.setState({ loading: false });
        })
    }

    getAllDrivers = () => {
        let body = {
            page: this.state.currentPage,
            companyEmail: this.state.companyEmail
        }
        this.props.apiManager.makeCall('getCarDriverDetails', body, res => {
            console.log("getCarDriverDetails: ", res);
            if (res) {
                this.setState({ drivers: [] }, () => {
                    this.setState({ drivers: this.state.drivers.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
                })
            }
            else {
                this.setState({ loading: false });
                toast.error(res.id);
            }
        })
    }

    renderLoading = () => {
        return (
            <Dialog
                open={this.state.loading}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        padding: 10
                    },
                }}>
                <CircularProgress className="text-dark" />
            </Dialog>
        )
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        this.barItems = [
            { class: <BarChart data={this.state.dailyProfileDat} />, key: 0 },
            { class: <Bar data={this.state.hoursDrivenData} />, key: 1 },
            { class: <WeeklyProfile data={this.state.weeklyGraphData} />, key: 2 },
            { class: <DistanceDriven data={this.state.distanceDrivenArr} />, key: 3 },
            { class: <GMap data={[...this.state.mapObject.values()]} />, key: 4 }]
        let searchingFor = null;
        if (this.state.drivers.length > 0) {
            searchingFor = search => searchItem => searchItem.driverName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
        return (
            <Fragment>
                <h2 className="breadcumbTitle">Fleet Utilization</h2>
                <Grid className="fleetApp">
                    <Grid className="fleetAppLeft">
                        <TextField
                            fullWidth
                            classes={{
                                root: 'searchFleet',

                            }}
                            value={this.state.search}
                            name="search"
                            onChange={this.changeHandler}
                            placeholder="Search Driver"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        className="searchFleetIcon"
                                        position="end">
                                        <i className="fa fa-search"></i>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <ScrollArea
                            speed={1}
                            className="fleetScrollBar"
                            contentClassName='fleetScrollBarContent'
                            horizontal={false}
                        >
                            <List style={{ width: '100%', maxWidth: '36ch' }}>
                                {this.state.drivers.length > 0 && this.state.drivers.filter(searchingFor(this.state.search)).map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <ListItem selected={item.driverID === this.state.selectedDriverId} button onClick={() => {
                                                if(item.driverID !== this.state.selectedDriverId)
                                                {
                                                    this.setState({ registrationNo: item.registrationNo, selectedDriverId: item.driverID }, () => {
                                                        this.getDailyProfile(item.AttachedCarInformation[0] && item.AttachedCarInformation[0].deviceID ? item.AttachedCarInformation[0].deviceID : '')
                                                    })
                                                }
                                            }} alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar alt={item.driverName} src={img3} />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={item.driverName}
                                                    secondary={
                                                        <Fragment>
                                                            <Typography
                                                                style={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="textPrimary"
                                                            >
                                                                {item.AttachedCarInformation[0].deviceID} {item.AttachedCarInformation[0].registrationNo}
                                                            </Typography>
                                                        </Fragment>
                                                    }
                                                />
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    )
                                })}
                            </List>
                            {
                                (this.state.drivers[0]) ? (
                                    <Grid className="buttonGrid" style={{ marginTop: 20 }}>
                                        {(this.state.currentPage < this.state.totalPages) ? (
                                            <ul style={{ textAlign: "center" }}>
                                                <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                                            </ul>
                                        ) : null}
                                    </Grid>) : null
                            }
                        </ScrollArea>
                    </Grid>
                    <Grid className="fleetAppRight">
                        <Grid style={{ display: 'flex', flex: 1, flexDirection: 'row', marginBottom: '15px', overflowY: 'hidden', overflowX: 'scroll', backgroundColor: 'white' }}>
                            {this.barItems.map((item, index) => {
                                return (
                                    <Grid style={{ display: 'flex', flex: 1, height: '160px', padding: 5, cursor: 'pointer', boxShadow: '2px 3px 2px #d0d0d0', minWidth: '200px', margin: 5 }} key={item.key}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this.setState({ selectedIndex: item.key })
                                        }}
                                    >
                                        {item.class}
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid style={{ height: '430px' }}>
                            {
                                this.barItems.length > 0 && this.barItems[this.state.selectedIndex].class
                            }
                        </Grid>
                    </Grid>
                </Grid>
                {this.renderLoading()}
            </Fragment>
        )
    }
}

FleetUtilization.propTypes = {
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

export default SuperHOC((withConnect)(FleetUtilization));