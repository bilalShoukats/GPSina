import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, CircularProgress, InputAdornment } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';
import NotificationsModal from './NotificationsModal'
import Switch from '@material-ui/core/Switch';
import UserCard from './UserCard'
// images
import profile from 'images/team/img1.jpg'

// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;
class ViewUsersScreen extends Component {

  state = {
    search: "",
    value: 0,
    companies: [],
    cars: [],
    loading: true,
    showAlert: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    carID: '',
    showConfirmModal: false,
    showNotificationsModal: false,
    showCarAssignModal: false,
    registrationNo: '',
    assignCar: false,
    carModel: ''
    // loading: false,
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount = () => {
    this.getAllMyCompanies();
    this.getCars()
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
        console.log(this.state.currentPage);
        this.getAllMyCompanies();
      })
    }
  }


  getAllMyCompanies = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
    }
    this.props.apiManager.makeCall(`viewCompanyUserDetails`, body, res => {
      console.log('all', res)
      if (res.code === 1019) {
        this.setState({ companies: this.state.companies.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }

  getCars = () => {
    let body = {
      companyEmail: this.props.user.companyEmail,
    }
    this.props.apiManager.makeCall('viewCars', body, res => {
      console.log('cars', res)
      if (res.code === 1019) {
        this.setState({ cars: res.response, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    })
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  openConfirmModal = (item) => {
    this.setState({ carID: item.carID, showConfirmModal: true })
  }
  openNotificationsModal = (item) => {
    this.setState({ carID: item.carID, showNotificationsModal: true })
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

  handleSwitchChange = (item) => {
    console.log('event', item)
    this.setState({ carModel: item });
  };

  renderAssignCarModal = () => {
    return (
      <Fragment>
        <Dialog
          open={this.state.showCarAssignModal}
          onClose={() => this.setState({ showCarAssignModal: false })}
          className="modalWrapper"
        >
          <div className="modalHead">
            <DialogContent style={{ padding: 0 }}>
              <div className="notificationList">
                <h5>
                  Assign Car
                </h5>
                <ScrollArea
                  speed={1}
                  className="scrollbarArea"
                  contentClassName="scrollbarContent"
                  horizontal={false}
                >
                  <ul className="notificationItems">
                    {this.state.cars.map((item, i) => (
                      <Card>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                          <h4>
                            Car Model:
                          </h4>
                          <h4>
                            {item.carModel}
                          </h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                          <h4>
                            Car Owner Name:
                          </h4>
                          <h4>
                            {item.carOwnerName}
                          </h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                          <h4>
                            Car Color:
                          </h4>
                          <h4>
                            {item.color}
                          </h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
                          <h4>
                            Car Registration No:
                          </h4>
                          <h4>
                            {item.registrationNo}
                          </h4>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10 }}>
                          <Switch
                            checked={this.state.carModal === item.carModel}
                            onChange={() => this.handleSwitchChange(item.carModel)}
                            value={item.carModel}
                            classes={{
                              root: 'switchDefault',
                              switchBase: 'switchBase',
                              thumb: 'switchThumb',
                              track: 'switchTrack',
                              checked: 'switchChecked'
                            }}
                          />
                        </div>
                      </Card>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </DialogContent>
            <Grid className="modalFooter">
              <Button
                style={{ padding: '5px 20px' }}
                className="bg-warning"
                onClick={() => this.setState({ showCarAssignModal: false })}
              >
                Cancel
              </Button>
              <Button style={{ padding: '5px 20px' }} className="bg-success">
                Assign
              </Button>
            </Grid>
          </div>
        </Dialog>
      </Fragment>
    )
  }

  render() {
    let searchingFor = null;

    if (this.state.companies.length > 0) {
      searchingFor = search => companies => companies.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
    }

    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Users</h2>
        <Grid className="viewCompaniesApp">
          {(this.state.companies[0]) ? (
            <Grid className="viewCompaniesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchUsers',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Users"
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
                    {this.state.companies.filter(searchingFor(this.state.search)).map((item, i) => {
                      console.log('user ', item)
                      return (
                        <UserCard
                          key={i}
                          item={item}
                          openNotificationsModal={() => this.openNotificationsModal(item)}
                          editUser={() => this.props.history.push(`/editUser/${item.carId}`)}
                          openConfirmModal={() => this.openConfirmModal(item)}
                          assignCar={() => this.setState({ showCarAssignModal: true })}
                        />
                      )
                    }
                      // <div className="companiesLink" key={i} style={{ padding: 10 }}>
                      //   <Grid className="companiesAutorImg">
                      //     {/* <img src={item.companyLogo} alt="" /> */}
                      //     <img src={profile} alt="" />
                      //   </Grid>
                      //   <Grid className="companiesAutorContent">
                      //     <h4 style={{ visibility: 'hidden' }}>:
                      //       <Button onClick={(e) => {
                      //         e.preventDefault();
                      //         e.stopPropagation();
                      //         this.openNotificationsModal(item)
                      //       }} style={{ visibility: 'visible' }} xl={6} className='btn bg-primary' >
                      //         <i className="icofont-notification" />
                      //       </Button>
                      //     </h4>
                      //     <h4>{item.companyName}
                      //       <Button onClick={(e) => {
                      //         e.preventDefault();
                      //         e.stopPropagation();
                      //         this.props.history.push(`/editUser/${item.carId}`)
                      //       }} xl={6} className='btn bg-dark'>
                      //         <i className="icofont-ui-edit" />
                      //       </Button>
                      //     </h4>
                      //     <h4 style={{ fontSize: 14 }}>Director Name : {item.director}
                      //       <Button onClick={(e) => {
                      //         e.preventDefault();
                      //         e.stopPropagation();
                      //         this.openConfirmModal(item)
                      //       }} xl={6} className='btn bg-danger'>
                      //         <i className="icofont-ui-delete" />
                      //       </Button></h4>
                      //   </Grid>
                      // </div>
                    )}
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Company Found!">
                <p className="subText">Don't have any Users? <Link to="/addUser">Create User</Link></p>
              </Card>
            )}
        </Grid>
        {(this.state.companies[0]) ? (
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
          </Grid>) : null}
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
        // registrationNo={this.state.registrationNo}
        // history={this.props.history}
        />
        <NotificationsModal
          open={this.state.showNotificationsModal}
          close={() => this.setState({ showNotificationsModal: false })}
          carID={this.state.carID}
        />
        {this.renderLoading()}
        {this.renderAssignCarModal()}
      </Fragment>
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
export default SuperHOC((withConnect)(ViewUsersScreen));
