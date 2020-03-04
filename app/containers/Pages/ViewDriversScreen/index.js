import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tabs, InputAdornment, CircularProgress } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';
import AssignDriverModal from './AssignDriverModal'
import ConfirmUnAssignModal from './ConfirmUnAssignModal'
import NotificationsModal from './NotificationsModal'
import Dialog from '@material-ui/core/Dialog';

// images
import profile from 'images/team/img1.jpg'

// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ViewDriversScreen extends Component {

  state = {
    search: "",
    driverId: '',
    value: 0,
    companies: [],
    drivers: [],
    loading: true,
    showAlert: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    showConfirmModal: false,
    showAssignDriverModal: false,
    showConfirmUnAssignModal: false,
    showNotificationsModal: false
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount = () => {
    this.getAllMyCompanies();
    this.getAllDrivers();
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllMyCompanies();
      })
    }
  }
  getAllDrivers = () => {
    let body = {
      page: 1,
      companyEmail: this.props.user.companyEmail
      // companyEmail:this.state.email
    }
    this.props.apiManager.makeCall('viewDrivers', body, res => {
      console.log('View Drivers - ', res)
      if (res) {
        this.setState({ drivers: this.state.drivers.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }

  getAllMyCompanies = () => {
    this.props.apiManager.makeCall(`getAllCompanies?page=${this.state.currentPage}`, {}, res => {
      if (res.code === 1019) {
        this.setState({ companies: this.state.companies.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    }, true)
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  openConfirmModal = (item) => {
    this.setState({ carID: item.carID, showConfirmModal: true })
  }
  openConfirmUnAssignModal = (item) => {
    this.setState({ registrationNo: item.registrationNo, showConfirmUnAssignModal: true })
  }
  openAssignDriverModal = (item) => {
    console.log('assign cars - view', item)
    this.setState({ driverId: item.driverID, registrationNo: item.registrationNo, showAssignDriverModal: true })
  }
  openNotificationsModal = (item) => {
    this.setState({ carID: item.carID, showNotificationsModal: true })
  }
  renderLoading = () => {
    return (
      <Dialog
        open={this.state.loading}
        onClose={() => { this.setState({ loading: false }) }}
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
    if (this.state.companies[0]) {
      searchingFor = search => drivers => drivers.driverName.toLowerCase().includes(search.toLowerCase()) || !search;
    }
    console.log('console bawa company', this.state.companies)
    console.log('console bawa drivers', this.state.drivers)
    return (

      < Fragment >
        <h2 className="breadcumbTitle">Your Drivers</h2>
        <Grid className="viewCompaniesApp">
          {(this.state.drivers[0]) ? (
            <Grid className="viewCompaniesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchUsers',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Drivers"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="searchCompaniesIcon"
                      position="end">
                      <i className="fa fa-search"></i>
                    </InputAdornment>
                  ),
                }}
              />
              <ScrollArea
                speed={.5}
                className="companiesScrollBar"
                contentClassName='companiesScrollBarContent'
                horizontal={false}
              >
                <ul className="forumItems" style={{ margin: 10 }}>
                  <li className="companiesList" >
                    {this.state.drivers.filter(searchingFor(this.state.search)).map((item, i) => (
                      <div className="companiesLink" key={i} style={{ padding: 10, margin: 10 }}>
                        <Grid className="companiesAutorImg">
                          {/* <img src={item.companyLogo} alt="" /> */}
                          <img src={profile} alt="" />
                        </Grid>
                        <Grid className="companiesAutorContent">
                          {item.registrationNo === '' ?
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                              <Button style={{ visibility: 'visible' }} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.openAssignDriverModal(item)
                              }} xl={6} className='btn bg-info' Ï>
                                <i className="icofont-ui-user" />
                              </Button>
                              <Button onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.openNotificationsModal(item)
                              }} xl={6} className='btn bg-primary' >
                                <i className="icofont-notification" />
                              </Button></div>
                            :
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                              <Button style={{ visibility: 'visible' }} onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.openConfirmUnAssignModal(item)
                              }} xl={6} className='btn bg-secondary' Ï>
                                <i class="fa fa-user-times"></i>
                              </Button>
                              <Button onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.openNotificationsModal(item)
                              }} xl={6} className='btn bg-primary' >
                                <i className="icofont-notification" />
                              </Button>
                            </div>
                          }
                          <h4 style={{ marginTop: 15 }}>Assigned Car : {item.registrationNo}
                            <Button onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              this.props.history.push(`/editDriver/${item.driverID}`)
                            }} xl={6} className='btn bg-dark'>
                              <i className="icofont-ui-edit" />
                            </Button>

                          </h4>
                          <h4 style={{ fontSize: 14, marginTop: 15 }}>Director Name : {item.driverName}
                            <Button onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              this.openConfirmModal(item)
                            }} xl={6} className='btn bg-danger'>
                              <i className="icofont-ui-delete" />
                            </Button></h4>
                        </Grid>
                      </div>
                    ))}
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Company Found!">
                <p className="subText">Don't have any company? <Link to="/addCompany">Create company</Link></p>
              </Card>
            )}
        </Grid>
        {
          (this.state.companies[0]) ? (
            <Grid className="buttonGrid">
              {(this.state.currentPage < this.state.totalPages) ? (
                <ul>
                  <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                </ul>
              ) : (
                  <ul>
                    <li><Button className="btn bg-default btn-radius">You have seen it all!</Button></li>
                  </ul>
                )}
            </Grid>) : null
        }
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
        // registrationNo={this.state.registrationNo}
        // history={this.props.history}
        />
        <AssignDriverModal
          open={this.state.showAssignDriverModal}
          close={() => this.setState({ showAssignDriverModal: false })}
          registrationNo={this.state.registrationNo}
          driverID={this.state.driverId}
        />
        <ConfirmUnAssignModal
          open={this.state.showConfirmUnAssignModal}
          close={() => this.setState({ showConfirmUnAssignModal: false })}
          registrationNo={this.state.registrationNo}
        // history={this.props.history}
        />
        <NotificationsModal
          open={this.state.showNotificationsModal}
          close={() => this.setState({ showNotificationsModal: false })}
          driverID={this.state.driverId}
        />
        {this.renderLoading()}
      </Fragment >
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   viewUsersScreen: makeSelectViewUsersScreen(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(ViewUsersScreen);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(ViewDriversScreen));
