import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectProfilePage from './selectors';
import reducer from './reducer';
import messages from './messages';
import { SuperHOC } from '../../../HOC';
import { Grid, Button, Tab, Tabs } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import EditProfile from 'containers/Pages/EditProfile/Loadable'
import ResetPassword from 'containers/Pages/ResetPassword/Loadable'
import { Link } from 'react-router-dom'
import './style.scss'
import { ToastContainer, toast } from 'react-toastify';
import SweetAlertSingle from '../../../components/UI_Elements/SweetAlert/alert';
import 'sass/elements/sweet-alerts.scss';
import { renderToStaticMarkup } from 'react-dom/server';

// images
import profile from 'images/team/img1.jpg'

class ProfilePage extends Component {

  state = {
    user: {},
    file: null,
    selectedFile: null,
    hidden: true,
    emailToggle: false,
    chatToggle: false,
    pushToggle: false,
    verificationModal: false,
    oldVerificationCode: '',
    newVerificationCode: '',
    showPositiveAlert: false,
    showNegativeAlert: false,
    value: "my_profile",
    loading: true,
    showAlert: false,
  }

  componentDidMount = () => {
    this.getUserDetail();
  }

  getUserDetail = () => {
    this.props.apiManager.makeCall('getUser', {}, res => {
      if (res.code === 1012) {
        this.setState({ user: res.response, loading: false });
      }
      else {
        this.setState({ loading: false });
        toast.error(res.id);
      }
    }, true)
  }

  render() {
    if (this.state.loading)
      return null;

    const { firstName, lastName, userName, email, phone, role, gender, age, suspended } = this.state.user
    return (
      <Fragment>
        <Helmet>
          <title>My Profile</title>
          <meta name="description" content="Description of ProfilePage" />
        </Helmet>
        <h2 className="breadcumbTitle">My Profile</h2>
        <SweetAlertSingle
          title="Logout"
          show={this.state.showAlert}
          confirmButtonText="Confirm"
          cancelButtonText='Cancel'
          showCancelButton={true}
          onConfirm={() => {
            this.setState({ showAlert: false })
            this.props.logout();
          }}
          onCancel={() => {
            this.setState({ showAlert: false })
          }}
          text={renderToStaticMarkup(<span>Are you sure, you want to logout?</span>)}
          showLoaderOnConfirm={true}
        />
        <Grid container spacing={3}>
          <Grid item xl={3} lg={4} xs={12}>
            <Grid className="profileInfoWrap">
              <Grid className="profileInfoImg">
                <img src={profile} alt="" />
              </Grid>
              <Grid className="profileInfoContent">
                <h4>{firstName + " " + lastName}</h4>
                <p>{email}</p>
              </Grid>
            </Grid>
            <Tabs
              value={this.state.value}
              onChange={(obj, value) => {
                if (value === "logout") {
                  this.setState({ showAlert: true })
                  //this.props.logout();
                }
                else
                  this.setState({ value })
              }}
              orientation="vertical"
              classes={{
                root: 'profileTabMenu',
                indicator: 'noIndicator',
                flexContainer: 'containerClass',
                scroller: 'noScroll',
              }}>
              <Tab
                icon={<i className="fa fa-user" />}
                label="My Profile"
                value="my_profile"
              />
              <Tab
                icon={<i className="fa fa-user" />}
                label="Edit Profile"
                value="edit_rofile" />
              <Tab
                icon={<i className="fa fa-lock" />}
                label="Reset Password"
                value="reset_password" />
              <Tab
                icon={<i className="fa fa-sign-out" />}
                label="Logout"
                value="logout"
              />
            </Tabs>
          </Grid>
          <Grid item xl={9} lg={8} xs={12}>
            {this.state.value === 'my_profile' ? <Card
              title="My Profile"
              className="userProfile"
            >
              <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                  <span>First Name</span>
                  <h4>{firstName}</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <span>Last Name</span>
                  <h4>{lastName}</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <span>User Name</span>
                  <h4>{userName}</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <span>Email</span>
                  <h4>{email}</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <span>Phone</span>
                  <h4>{phone}</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <span>Gender</span>
                  <h4>{gender === 0 ? "Male" : (gender === 1) ? "Female" : "Transgender"}</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <span>Age</span>
                  <h4>{age}</h4>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <span>Active Status</span>
                  <h4>{suspended === false ? "Active" : "Suspended"}</h4>
                </Grid>
              </Grid>
            </Card> : null}
            {this.state.value === 'edit_rofile' ? <EditProfile profile={this.state.user} /> : null}
            {this.state.value === 'reset_password' ? <ResetPassword /> : null}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   profilePage: makeSelectProfilePage(),
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

// export default compose(withConnect)(ProfilePage);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(ProfilePage));
