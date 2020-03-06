import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SuperHOC } from '../../../HOC';
import 'sass/elements/sweet-alerts.scss';
import Button from '@material-ui/core/Button';
import { Grid, CircularProgress } from '@material-ui/core';
import ScrollArea from 'react-scrollbar'
import './style.scss'
import GMap from './basic'
import SocketComponent from '../../../components/WebSocket';
import Dialog from '@material-ui/core/Dialog';
import { Manager } from '../../../StorageManager/Storage';
import BankingSystemFeature from 'components/Dashboard/BankingSystem/BankingSystemFeature';

class DashboardScreen extends Component {
  state = {
    email: "",
    hash: "",
    companyEmail: "",
    companies: [],
    loading: true,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    mapObject: new Map()
  }

  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }

  componentDidMount = () => {
    // this.socketComponent = new SocketComponent();
    this.getMyEmail();
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllMyVehicles();
      })
    }
  }

  getAllMyVehicles = () => {
    let body = {
      page: this.state.currentPage,
      companyEmail: this.state.companyEmail
    }
    this.props.apiManager.makeCall('viewCars', body, res => {
      console.log('get cars - v', res)
      console.log('get cars - v', body)
      if (res.code === 1019) {
        this.setState({ companies: this.state.companies.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false }, () => {
          let companyIdSet = [];
          this.state.companies.map((item, index) => {
            companyIdSet.push("" + item.deviceID);
          });
          this.setState({ companyIdSet }, () => {
            // this.socketComponent.connectSocketServer(this.state.hash, this.state.companyIdSet, this.recieveData);
          });
        });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    }, false)
  }

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  getMyEmail = async () => {
    let user = await Manager.getItem('user', true);
    this.setState({ email: user.email, companyEmail: user.companyEmail, hash: user.hash }, () => this.getAllMyVehicles());
  }

  renderLoading = () => {
    return (
      <Dialog
        open={this.state.loading}
        // onClose={this.state.loading}
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
    return (
      <Fragment>
        <h2 className="breadcumbTitle">Dashboard</h2>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <GMap
              data={[...this.state.mapObject.values()]}
            />
          </Grid>
          <Grid item xs={12}>
            <BankingSystemFeature />
          </Grid>
        </Grid>
        {this.renderLoading()}
      </Fragment >
    )
  }
}

DashboardScreen.propTypes = {
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

export default SuperHOC((withConnect)(DashboardScreen));