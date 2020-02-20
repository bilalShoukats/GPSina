import React, {Fragment, Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import {Grid, Tab, Tabs, InputAdornment, TextField, Button} from '@material-ui/core'
import messages from './messages';
import ScrollArea from 'react-scrollbar'
import './style.scss'

import avatar from 'images/avatar.svg'

// json data 
import contacts from 'utils/json/contacts'

class ContactList extends Component {
  state = {
    value: 0,
    search: "",
    contactsList: []
  }
  handleChange = (event, newValue) => {
    this.setState({
      value: newValue
    })
  }

  componentDidMount() {
    this.setState({
      contactsList: contacts
    });
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {

    let contactsList = this.state.contactsList;
    let search = this.state.search.trim().toLowerCase();

    if (search.length > 0) {
      contactsList = contactsList.filter(function (contact) {
        return contact.name.toLowerCase().match(search);
      });
    }

    return (
      <Fragment>
        <Helmet>
          <title>Contact List</title>
        </Helmet>
        <h2 className="breadcumbTitle">Contact List</h2>
        <Grid className="contactMainWrap">
          <Grid container>
            <Grid item xl={3} lg={4} xs={12}>
              <Grid className="contactSidebar">
                <TextField
                  fullWidth
                  classes={{
                    root: 'searchContact',
                  }}
                  value={this.state.search}
                  name="search"
                  onChange={this.changeHandler}
                  placeholder="Search contact"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        className="searchContactIcon"
                        position="end">
                        <i className="fa fa-search"></i>
                      </InputAdornment>
                    ),
                  }}
                />
                <ScrollArea
                  speed={.5}
                  className="contactScrollBar"
                  contentClassName='contactScrollBarContent'
                  horizontal={false}
                >
                  <Tabs
                    orientation="vertical"
                    value={this.state.value}
                    onChange={this.handleChange}
                    classes={{
                      indicator: 'contactIndicator',
                      root: 'contactTabWrapper',
                      flexContainer: 'contactTabContainer'
                    }}
                  >
                    {contactsList.map((item, i) => (
                      <Tab
                        classes={{
                          root: 'contactTabItem',
                        }}
                        icon={
                          <span className="contactThumbImg">
                                                        <img src={item.image !== null ? item.image : avatar}/>
                                                    </span>
                        }
                        key={i}
                        label={item.name}/>
                    ))}
                  </Tabs>
                </ScrollArea>
              </Grid>
            </Grid>
            <Grid item xl={9} lg={8} xs={12}>
              <Grid className="contactListHeader">
                <h3>Total Contacts : {contacts.length}</h3>
                <Button variant="contained" className="btn bg-default btn-radius">add new contact list</Button>
              </Grid>
              {contacts.map((item, i) => (
                <Fragment key={i}>
                  {this.state.value === i && <Grid className="contactContent">
                    <Grid className="contactImage">
                      <img src={item.image !== null ? item.image : avatar} alt=""/>
                    </Grid>
                    <Grid className="contactInfo">
                      <h3>{item.name}</h3>
                      <ul>
                        <li><strong> Mobile </strong> <span>{item.mobile}</span></li>
                        <li><strong> Email </strong> <span>{item.email}</span></li>
                        <li><strong> address </strong> <span>{item.address}</span></li>
                        <li><strong> Date Of Birth </strong> <span>{item.dateOfBirth}</span></li>
                        <li><strong> country </strong> <span>{item.country}</span></li>
                        <li><strong> company </strong> <span>{item.company}</span></li>
                        <li><strong> blood Group </strong> <span>{item.blood}</span></li>
                      </ul>
                    </Grid>
                  </Grid>}
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    )
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

export default compose(withConnect)(ContactList);
