import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tab, CircularProgress, InputAdornment } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import Dialog from '@material-ui/core/Dialog';
import CompanyCard from './CompanyCard'
import ConfirmModal from './ConfirmModal';
import AssignCompany from './AssignCompanyModal'

// images
import profile from 'images/team/img1.jpg'

// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ViewCompaniesScreen extends Component {

  state = {
    search: "",
    value: 0,
    companies: [],
    loading: true,
    showAlert: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    showConfirmModal: false,
    showAssignCompanyModal: false
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount = () => {
    this.getAllMyCompanies();
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
    this.props.apiManager.makeCall(`getAllCompanies?page=${this.state.currentPage}`, {}, res => {
      console.log('lkjkl', res.response)
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
  openConfirmModal = (item) => {
    this.setState({ companyEmail: item.email, showConfirmModal: true })
  }
  openConfirmUnAssignModal = (item) => {
    this.setState({ registrationNo: item.registrationNo, showConfirmUnAssignModal: true })
  }
  close = () => {
    this.setState({ showConfirmModal: false, showAssignCompanyModal: false, companies: [] }, () => this.getAllMyCompanies())
  }
  openAssignCompanyModal = (item) => {
    this.setState({ companyEmail: item.email, showAssignCompanyModal: true })
  }
  render() {
    let searchingFor = null;
    if (this.state.loading)
      return null;

    if (this.state.companies[0]) {
      searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;
    }

    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Companies</h2>
        <Grid className="viewCompaniesApp">
          {(this.state.companies[0]) ? (
            <Grid className="viewCompaniesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchCompanies',

                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Companies"
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
                      console.log('nadeem', item)
                      var enc = window.btoa(item.driverEmail);
                      return (
                        <CompanyCard key={i}
                          item={item}
                          openConfirmModal={() => this.openConfirmModal(item)}
                          editCompany={() => this.props.history.push(`/editCompany/${item.email}`)}
                          openAssignCompanyModal={() => this.openAssignCompanyModal(item)}
                        />
                      )
                    }
                    )}
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
        {this.renderLoading()}
        <ConfirmModal
          open={this.state.showConfirmModal}
          close={this.close}
          companyEmail={this.state.companyEmail}
          {...this.props}
        // history={this.props.history}
        />
        <AssignCompany
          open={this.state.showAssignCompanyModal}
          close={this.close}
          companyEmail={this.state.companyEmail}
          {...this.props}
        />
      </Fragment>
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
export default SuperHOC((withConnect)(ViewCompaniesScreen));
