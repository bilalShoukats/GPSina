import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import { Grid, TextField, Button, Tabs, InputAdornment, CircularProgress } from '@material-ui/core'
import './style.scss'
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import { toast } from 'react-toastify';
import Card from 'components/Card/Loadable';
import ScrollArea from 'react-scrollbar';
import HistoryCard from './HistoryCard'

class VehiclesHistoryScreen extends Component {
  state = {
    loading: true,
    currentPage: 1,
    totalPages: 0,
    search: "",
    value: 0,
    history: [],
  }

  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount = () => {
    this.getAllVehiclesHistory();
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        this.getAllVehiclesHistory();
      })
    }
  }

  getAllVehiclesHistory = () => {
    Manager.getItemCallback('user', true, (user) => {
      let body = {
        companyEmail: user.companyEmail,
        page: this.state.currentPage,
      }
      this.props.apiManager.makeCall('getVehicleAssigndedDriverHistory', body, (res) => {
        this.setState({ loading: false }, () => {
          if (res.code === 1019) {
            this.setState({ history: res.response });
          } else {
            toast.error(res.id);
          }
        });
      });
    });
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

  render() {
    let searchingFor = null;
    if (this.state.history.length > 0) {
      searchingFor = search => history => (history.registrationNo.toLowerCase().includes(search.toLowerCase()) || history.companyEmail.toLowerCase().includes(search.toLowerCase())) || !search;
    }
    return (
      <Fragment>
        <h2 className="breadcumbTitle">All Vehicles History</h2>
        <Grid className="viewVehiclesHistory">
          {(this.state.history[0] !== undefined && this.state.history.length > 0) ? (
            <Grid className="viewVehiclesHistoryLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchHistory',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Vehicle History"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="searchVehicleHistoryIcon"
                      position="end">
                      <i className="fa fa-search"></i>
                    </InputAdornment>
                  ),
                }}
              />
              <ScrollArea
                speed={.5}
                className="historyScrollBar"
                contentClassName='historyScrollBarContent'
                horizontal={false}
              >
                <ul className="forumItems" style={{ margin: 10 }}>
                  <li className="vehiclesHistoryList" >
                    {this.state.history.filter(searchingFor(this.state.search)).map((item, i) => {
                      return (
                        <HistoryCard key={i}
                          item={item}
                        />
                      )
                    }
                    )}
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Vehicle history found!">
                <p className="subText">Don't have any vehicle history</p>
              </Card>
            )}
        </Grid>
        {
          (this.state.history.length > 0) ? (
            <Grid className="buttonGrid">
              {(this.state.currentPage < this.state.totalPages) ? (
                <ul>
                  <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                </ul>
              ) : (
                  <ul>
                  </ul>
                )}
            </Grid>) : null
        }
        {this.renderLoading()}
      </Fragment >
    )
  }
}

VehiclesHistoryScreen.propTypes = {
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

export default SuperHOC((withConnect)(VehiclesHistoryScreen));
