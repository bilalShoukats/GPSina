import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectViewUsersScreen from './selectors';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tabs, InputAdornment } from '@material-ui/core'
import Card from './node_modules/components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import './node_modules/sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';

// images
import profile from './node_modules/images/team/img1.jpg'

// const searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;

class ViewUsersScreen extends Component {

  state = {
    search: "",
    value: 0,
    companies: [],
    loading: true,
    showAlert: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    showConfirmModal: false
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

  render() {
    let searchingFor = null;
    if (this.state.loading)
      return null;

    if (this.state.companies[0]) {
      searchingFor = search => companies => companies.companyName.toLowerCase().includes(search.toLowerCase()) || !search;
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
                    {this.state.companies.filter(searchingFor(this.state.search)).map((item, i) => (
                      <div className="companiesLink" key={i}  style={{ padding: 10 }}>
                        <Grid className="companiesAutorImg">
                          {/* <img src={item.companyLogo} alt="" /> */}
                          <img src={profile} alt="" />
                        </Grid>
                        <Grid className="companiesAutorContent">
                          <h4>{item.companyName}
                            <Button onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              this.props.history.push(`/editUser${item}`)
                            }} xl={6} className='btn bg-dark'>
                              <i className="icofont-ui-settings" />
                            </Button>
                          </h4>
                          <h4 style={{ fontSize: 14 }}>Director Name : {item.director}
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