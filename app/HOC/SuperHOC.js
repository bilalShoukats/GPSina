import React from 'react';
import { ApiManager, ErrMsg } from '../ApiManager';
import { Manager } from '../StorageManager/Storage';
import SweetAlertSingle from '../components/UI_Elements/SweetAlert/alert';
import { renderToStaticMarkup } from 'react-dom/server';

const WithAuthenticate = OriginalComponent => {
  return class WithAuthenticate extends React.Component {
    constructor(props) {
      super(props);
      this.apiManager = new ApiManager(this);
      this.state = {
        user: null,
        loaded: false,
        retrying: false,
        showModal: false,
        retryApi: '',
        retryBody: '',
        retryBool: '',
        retryCallback: '',
      }
    }
    componentDidMount = () => {
      this.getReady(() => {
        this.reLoadUser();
      });
    }

    redirect = () => {
      console.log("redirect this");
      this.props.history.push('/');
    }

    getReady = async (whenDone) => {
      await this.apiManager.Initialize();
      let user = await Manager.getItem('user', true);
      this.setState({ user }, whenDone());
      // console.log('User in get ready', user.role);
      // console.log(this.token);
    }

    logout = () => {
      Manager.removeItem('token');
      Manager.removeItem('user');
      window.location.reload();
    }

    saveUser = async (user) => {
      console.log('SuperHOC saveUser', user);
      await Manager.setItem('user', user);
      this.setState({ user, loaded: true });
    }

    showTimeoutError = (e, apiName, body, bool, callback) => {
      // console.warn(e);
      let headerTitle = 'Timeout', msg = 'There is problem with internet';
      if (e.message) {
        headerTitle = 'Error';
        msg = e.message;
      }
      if (e.error === -1)  {
        this.setState({ showModal: true, retryApi: apiName, retryBody: body, retryBool: bool, retryCallback: callback });
        //this.props.history.push('/network');
      }
    }

    retrying = () => {
      this.setState({
        retrying: true
      }, () => {
        setTimeout(() => {
          this.setState({ retrying: false })
        }, 100);
      })
    }

    reLoadUser = () => {
      // SecureStore.getItemAsync('user')
      // .then( result => this.setState({ user: JSON.parse(result)}))
      Manager.getItem('user', true).then(
        result => {
          this.setState({ user: result, loaded: true })
        });
    }

    componentWillUnmount = () => {
      // console.warn('HOC UNMOUNT')

    }

    handleAlert = (data) => {
      console.log('Data', data, typeof data);
      if (data !== '1004') {
        console.log(ErrMsg(data));
      }
    }

    render() {
      if (!this.state.loaded) return null;
      // if (this.state.retrying) return null;
      return (
        <div>
          <OriginalComponent
            {...this.props}
            alert={(data) => this.handleAlert(data)}
            apiManager={this.apiManager}
            ifNotLogin={this.ifNotLogin}
            user={this.state.user}
            saveUser={(user) => this.saveUser(user)}
            setOnBack={(obj) => this.setOnBack(obj)}
            setDontShow={(dontShow) => this.setState({ dontShow })}
            reLoadUser={this.reLoadUser}
            customNavigate={(screen, data) => this.navigate(screen, data)}
            logout={this.logout}
            timeout={this.state.showModal}
            bool={true}
          />
          <SweetAlertSingle
            title="Request timed out!"
            show={this.state.showModal}
            type="warning"
            warning
            confirmButtonText="Retry"
            cancelButtonText='Cancel'
            showCancelButton={true}
            onConfirm={() => {
              this.setState({ showModal: false },
                () => {
                  this.apiManager.makeCall(this.state.retryApi, this.state.retryBody, this.state.retryBool, this.state.retryCallback);
                  this.setState({ retryApi: '', retryBody: '', retryBool: '', retryCallback: '' });
                })
            }}
            onCancel={() => {
              this.setState({ showModal: false, retryApi: '', retryBody: '', retryBool: '', retryCallback: '' })
            }}
            text={renderToStaticMarkup(<span>Please check your internet connection.</span>)}
            showLoaderOnConfirm={true}
          />
        </div>
      )
    }
  }
}

export default WithAuthenticate;
