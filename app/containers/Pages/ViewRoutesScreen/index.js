import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { SuperHOC } from '../../../HOC';
import { Grid, TextField, Button, InputAdornment, CircularProgress } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import './style.scss'
import { toast } from 'react-toastify';
import 'sass/elements/sweet-alerts.scss';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import ConfirmModal from './ConfirmModal';
import Dialog from '@material-ui/core/Dialog';
import RouterCard from './RouteCard'
// images
import profile from 'images/team/img1.jpg';

class ViewRoutesScreen extends Component {

  state = {
    search: "",
    value: 0,
    routes: [],
    loading: true,
    showAlert: false,
    currentPage: 1,
    totalPages: 0,
    itemsInPage: 10,
    showConfirmModal: false,
    loading: true
  }

  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount = () => {
    this.getAllMyRoutes();
  }

  loadMoreHandler = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => {
        console.log(this.state.currentPage);
        this.getAllMyRoutes();
      })
    }
  }

  getAllMyRoutes = () => {
    let body = {
      page: this.state.currentPage,
      companyEmail: this.props.user.companyEmail
    }
    console.log("response view body: ", body);
    this.props.apiManager.makeCall('viewRoute', body, res => {
      console.log("response view routes: ", res);
      if (res.code === 1019) {
        this.setState({ routes: [] }, () => {
          this.setState({ routes: this.state.routes.concat(res.response), currentPage: res.currentPage, totalPages: res.totalPages, loading: false });
        });
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
    this.setState({ deleteRouteID: item.routeID, showConfirmModal: true })
  }

  deleteRoute = () => {
    let body = {
      routeID: this.state.deleteRouteID,
      companyEmail: this.props.user.companyEmail
    }
    this.setState({ loading: true }, () => {
      this.props.apiManager.makeCall('deleteRoute', body, res => {
        console.log("response is: ", res);
        if (res.code === 1016) {
          toast.success('Route deleted successfully!');
          this.setState({ showConfirmModal: false, loading: false }, () => {
            this.getAllMyRoutes();
          })
        }
        else {
          toast.error(res.id)
          loading: false
        }
      })
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

  render() {
    let searchingFor = null;

    if (this.state.routes[0]) {
      searchingFor = search => routes => routes.routeName.toLowerCase().includes(search.toLowerCase()) || !search;
    }

    return (
      <Fragment>
        <h2 className="breadcumbTitle">Your Routes</h2>
        <Grid className="viewRoutesApp">
          {(this.state.routes[0]) ? (
            <Grid className="viewRoutesLeft">
              <TextField
                fullWidth
                classes={{
                  root: 'searchRoutes',
                }}
                value={this.state.search}
                name="search"
                onChange={this.changeHandler}
                placeholder="Search Routes"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      className="searchRoutesIcon"
                      position="end">
                      <i className="fa fa-search"></i>
                    </InputAdornment>
                  ),
                }}
              />
              <ScrollArea
                speed={.5}
                className="routesScrollBar"
                contentClassName='routesScrollBarContent'
                horizontal={false}
              >
                <ul className="forumItems" style={{ margin: 10 }}>
                  <li className="routesList" >
                    {this.state.routes.filter(searchingFor(this.state.search)).map((item, i) => {
                      console.log('route', item)
                      return (
                        <RouterCard
                          key={i}
                          item={item}
                          editRoute={() => this.props.history.push(`/editRoute/${item.routeID}`)}
                          openConfirmModal={() => this.openConfirmModal(item)}
                        />
                      )
                    }
                      // <div className="routesLink" key={i} style={{ padding: 10 }}>
                      //   <Grid className="routesAutorImg">
                      //     {/* <img src={item.companyLogo} alt="" /> */}
                      //     {/* <img src={profile} alt="" /> */}
                      //   </Grid>
                      //   <Grid className="routesAutorContent">
                      //     <h4>{item.routeName}
                      //       <Button onClick={(e) => {
                      //         e.preventDefault();
                      //         e.stopPropagation();
                      //         this.props.history.push(`/editRoute/${item.routeID}`)
                      //       }} xl={6} className='btn bg-dark'>
                      //         <i className="icofont-ui-edit" />
                      //       </Button>
                      //     </h4>
                      //     <h4 style={{ fontSize: 14 }}>Company Email : {this.props.user.companyEmail}
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
              <Card title="No Routes Found!">
                <p className="subText">Don't have any route? <Link to="/addRoute">Create route</Link></p>
              </Card>
            )}
        </Grid>
        {(this.state.routes[0]) ? (
          <Grid className="buttonGrid">
            {(this.state.currentPage < this.state.totalPages) ? (
              <ul>
                <li><Button className="btn bg-default btn-radius" onClick={this.loadMoreHandler}>Load More</Button></li>
              </ul>
            ) : null}
          </Grid>) : null}
        <ConfirmModal
          deleteRoute={this.deleteRoute}
          open={this.state.showConfirmModal}
          close={() => this.setState({ showConfirmModal: false })}
        />
        {this.renderLoading()}
      </Fragment>
    );
  }
}

// const mapStateToProps = createStructuredSelector({
//   viewRoutesScreen: makeSelectViewRoutesScreen(),
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

// export default compose(withConnect)(ViewRoutesScreen);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
export default SuperHOC((withConnect)(ViewRoutesScreen));
