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
import img3 from 'images/team/img5.jpg';
import Chart from "./Chart";

class DrivingAnalysis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            selectedDriverId: 0,
            companyEmail: "",
            loading: true,
            currentPage: 1,
            totalPages: 0,
            itemsInPage: 10,
            mapObject: new Map(),
            drivers: [],
            selectedIndex: 1,
            breakData: [],
            harshSwerData: [],
            harshAccData: [],
            mapData: [],
        }
    }

    componentDidMount = () => {
        this.getAllDrivers();
    }

    getAllDrivers = () => {
        let body = {
            page: this.state.currentPage,
            companyEmail: this.props.user.companyEmail,
        }
        this.props.apiManager.makeCall('getCarDriverDetails', body, res => {
            console.log('getCarDriverDetails: ', res.response)
            if (res.code === 1019) {
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

    getGraphsData = (id) => {
        this.harshBraking(id)
        this.harshAcceleration(id)
        this.harshSwerving(id);
    }

    harshAcceleration = (id) => {
        let body = {
            deviceid: id.toString(),
        }
        this.props.apiManager.makeCall('harshAccerlationTimeBase', body, res => {
            console.log('harshAccerlationTimeBase: ', res)
            if (res) {
                for (let index = 0; index < 31; index++) {
                    this.state.harshAccData[index] = [];
                    var newArray = this.state.harshAccData[index]
                    newArray[0] = index
                    newArray[1] = 0
                }
                if (res.response === null) {
                    console.log('asdhakjsdhka')
                    this.setState({ harshAccData: this.state.harshAccData })
                }
                else {
                    res.response.map((item, index) => {
                        let date = new Date(item.time).getDate()
                        if (this.state.harshAccData[date][0] === date) {
                            let i = this.state.harshAccData[date][1]
                            this.state.harshAccData[date][1] = i + 1
                        }
                        else {
                        }
                        this.state.mapData.push(item);
                    })
                    this.setState({ harshAccData: this.state.harshAccData, }, () => {
                        // this.state.mapData[1] = (res.response)
                        // console.log("ACC MAP DATA: ", this.state.mapData);
                    })
                }
            }
        })
    }

    harshBraking = (id) => {
        let body = {
            deviceid: id.toString(),
        }
        this.props.apiManager.makeCall('harshBreakingTimeBase', body, res => {
            console.log('harshBreakingTimeBase: ', res)
            if (res) {
                for (let index = 0; index < 31; index++) {
                    this.state.breakData[index] = [];
                    var newArray = this.state.breakData[index]
                    newArray[0] = index
                    newArray[1] = 0
                }
                if (res.response === null) {
                    console.log('asdhakjsdhka')
                    this.setState({ breakData: this.state.breakData })
                }
                else {
                    res.response.map((item, index) => {
                        let date = new Date(item.time).getDate()
                        if (this.state.breakData[date][0] === date) {
                            let i = this.state.breakData[date][1]
                            this.state.breakData[date][1] = i + 1
                        }
                        else {
                        }
                        this.state.mapData.push(item);
                    })
                    this.setState({ breakData: this.state.breakData, }, () => {
                        // this.state.mapData[0] = (res.response)
                        // console.log("BRAKE MAP DATA: ", this.state.mapData);
                    })
                }
            }
        })
    }

    harshSwerving = (id) => {
        let body = {
            deviceid: id.toString(),
        }
        this.props.apiManager.makeCall('harshSwervingTimeBase', body, res => {
            console.log('harshSwervingTimeBase: ', res.response)
            if (res) {
                for (let index = 0; index < 31; index++) {
                    this.state.harshSwerData[index] = [];
                    var newArray = this.state.harshSwerData[index]
                    newArray[0] = index
                    newArray[1] = 0
                }
                if (res.response === null) {
                    console.log('asdhakjsdhka')
                    this.setState({ harshSwerData: this.state.harshSwerData })
                }
                else {
                    res.response.map((item, index) => {
                        let date = new Date(item.startTime).getDate()
                        if (this.state.harshSwerData[date][0] === date) {
                            let i = this.state.harshSwerData[date][1]
                            this.state.harshSwerData[date][1] = i + 1
                        }
                        else {
                        }
                    })
                    this.setState({ harshSwerData: this.state.harshSwerData, }, () => {
                        //this.state.mapData[2] = (res.response)
                        // console.log("SWER MAP DATA: ", this.state.mapData);
                    })
                }
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
            { class: <Chart name='harsh acceleration' yName='acc' data={this.state.harshAccData} />, key: 0 },
            { class: <Chart name='harsh swerving' yName='swer' data={this.state.harshSwerData} />, key: 1 },
            { class: <Chart name='harsh braking' yName='brake' data={this.state.breakData} />, key: 2 },
            { class: <GMap data={[...this.state.mapData.values()]} />, key: 3 }]
        let searchingFor = null;
        if (this.state.drivers.length > 0) {
            searchingFor = search => searchItem => searchItem.driverName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
        return (
            <Fragment>
                <h2 className="breadcumbTitle">Driving Analysis</h2>
                <Grid className="dAnalysisApp">
                    <Grid className="dAnalysisAppLeft">
                        <TextField
                            fullWidth
                            classes={{
                                root: 'searchDAnalysis',

                            }}
                            value={this.state.search}
                            name="search"
                            onChange={this.changeHandler}
                            placeholder="Search Driver"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment
                                        className="searchDAnalysisIcon"
                                        position="end">
                                        <i className="fa fa-search"></i>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <ScrollArea
                            speed={1}
                            className="dAnalysisScrollBar"
                            contentClassName='dAnalysisScrollBarContent'
                            horizontal={false}
                        >
                            <List style={{ width: '100%', maxWidth: '36ch' }}>
                                {this.state.drivers.length > 0 && this.state.drivers.filter(searchingFor(this.state.search)).map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <ListItem selected={item.driverID === this.state.selectedDriverId} button onClick={() => {
                                                if (item.driverID !== this.state.selectedDriverId) {
                                                    this.setState({ selectedDriverId: item.driverID, mapData: [] }, () => {
                                                        this.getGraphsData(item.AttachedCarInformation[0] && item.AttachedCarInformation[0].deviceID ? item.AttachedCarInformation[0].deviceID : '')
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
                    <Grid className="dAnalysisAppRight">
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

DrivingAnalysis.propTypes = {
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

export default SuperHOC((withConnect)(DrivingAnalysis));