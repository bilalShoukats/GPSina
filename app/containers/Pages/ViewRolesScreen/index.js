import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, Button, CircularProgress, } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import Dialog from '@material-ui/core/Dialog';
import './style.scss'
import { toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';
import RolesTable from './RolesTable'
// images

class ViewRolesScreen extends Component {

  state = {
    search: "",
    value: 0,
    companies: [],
    roles: [],
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
    carModel: '',
    selectedCompany: ''

  }

  componentDidMount = () => {
    this.getAllRoles();
  }
  componentDidUpdate(prevProps) {
    if (this.props.timeout !== prevProps.timeout) {
      if (this.props.timeout === true) {
        this.setState({ loading: false })
      }
    }
  }
  getAllCompanies = () => {
    let body
    this.props.apiManager.makeCall(`getAllCompanies`, body, res => {
      console.log('get all companies-', res)
      if (res.code === 1019) {
        this.setState({ companies: this.state.companies.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    }, true)
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllRoles();
      })
    }
  }

  getAllRoles = () => {
    let body
    this.props.apiManager.makeCall(`getAllRoles`, body, res => {
      console.log('get all roles-', res.response)
      if (res.code === 1019) {
        this.setState({ roles: res.response, currentPage: res.currentPage, totalPages: res.totalPages, loading: false }, () => this.getAllCompanies());
      }
      else {
        this.setState({ loading: false }, () => this.getAllCompanies());
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

  close = () => {
    this.setState({ showConfirmModal: false })
    this.getAllRoles
  }

  render() {
    let searchingFor = null;

    if (this.state.roles.length > 0) {
      searchingFor = search => users => users.title.toLowerCase().includes(search.toLowerCase()) || !search;
    }

    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Roles</h2>
        <Grid className="viewCompaniesApp">
          {(this.state.roles[0]) ? (
            <Grid className="viewCompaniesLeft">
              <Grid item xl={3} lg={6} md={4} sm={6} xs={12} className='mainDropDown'>
                <h5 style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>Add New Company Role For</h5>
                <Grid className="dropdownWrapper hover">
                  <Button style={{ backgroundColor: "rgba(211, 211, 211, 1)", color: 'black' }}>
                    {this.state.selectedCompany !== '' ? this.state.selectedCompany : 'Select Company'}
                    <i className="fa fa-angle-down" />
                  </Button>
                  <ul className="dropdown bottom">
                    {this.state.companies.map((item, index) => (
                      <li onClick={() => this.setState({ selectedCompany: item.companyName, companyEmail: item.email })} key={index}>{item.companyName}</li>
                    ))}
                  </ul>
                </Grid>
                <Button onClick={() => {
                  this.state.selectedCompany !== '' ?
                    this.props.history.push(`addRoles/${this.state.companyEmail}`)
                    : toast.error('Please select company first')
                }} style={{ backgroundColor: "rgba(211, 211, 211, 1)", color: 'black', height: '35px' }}>
                  Add
                  </Button>
              </Grid>
              <ScrollArea
                speed={.5}
                className="companiesScrollBar"
                contentClassName='companiesScrollBarContent'
                horizontal={false}
              >
                <ul className="forumItems" style={{ margin: 10 }}>
                  <li className="companiesList" >
                    <RolesTable
                      data={this.state.roles}
                      {...this.props}
                      openConfirmModal={(id) => { this.setState({ showConfirmModal: true, roleID: id }) }}
                    />
                  </li>
                </ul>
              </ScrollArea>
            </Grid>
          ) : (
              <Card title="No Roles Found!">
                <p className="subText">Don't have any Roles? <Link to="/addRoles">Add Role</Link></p>
              </Card>
            )}
        </Grid>
        {
          (this.state.roles[0]) ? (
            <Grid className="buttonGrid">
              {(this.state.currentPage < this.state.totalPages) ? (
                <ul>
                  <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
                </ul>
              ) : null}
            </Grid>) : null
        }
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={this.close}
          {...this.props}
          roleID={this.state.roleID}
        />
        {this.renderLoading()}
      </Fragment >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(ViewRolesScreen));
