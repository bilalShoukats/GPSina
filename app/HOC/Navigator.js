import React from 'react';
import { Manager } from '../StorageManager/Storage';

const Navigator = OriginalComponent => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loaded: false,
        user: null
      }
    }
    componentDidMount = () => {
      this.loadUser();
    }

    loadUser = async () => {
      Manager.getItem('user', true)
        .then(result => {
          console.log('result', result);
          this.setState({ user: result, loaded: true });
        })
        .catch(err => this.setState({ user: null, loaded: true }))
    }

    render() {
      if (!this.state.loaded) return null;
      return(
        <div>
          <OriginalComponent
            user={this.state.user}
            {...this.props} />
        </div>
      )
    }
  }
}

export default Navigator;
