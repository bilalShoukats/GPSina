import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectViewUsersScreen from './selectors';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, Tab, Tabs, InputAdornment } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';

// images
import profile from 'images/team/img1.jpg'

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
                <ul className="forumItems">
                  <li className="companiesList">
                    {this.state.companies.filter(searchingFor(this.state.search)).map((item, i) => (
                      <Link className="companiesLink" key={i} to='#'>
                        <Grid className="companiesAutorImg">
                          {/* <img src={item.companyLogo} alt="" /> */}
                          <img src={profile} alt="" />
                        </Grid>
                        <Grid className="companiesAutorContent">
                          <h4>{item.companyName} <span className={`forumBadge ${item.companyName}`}>{item.companyName}</span></h4>
                          <h5>Director Name : {item.director}</h5>
                        </Grid>
                      </Link>
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
