import React, { Fragment, Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import './style.scss'
import { Link } from 'react-router-dom';
import { Grid, Menu, Hidden } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ScrollArea from 'react-scrollbar';
const notfications = [
  {
    title: 'omnis iste error sit',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'will be distracted',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'established fact that',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'reader will be',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'voluptas sit aspernatur aut',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'will be distracted',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'established fact that',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'reader will be',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'voluptas sit aspernatur aut',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'will be distracted',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'established fact that',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'reader will be',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
];

export default class SettingsModal extends Component {
  state = {
    vibrateNotification: false,
    overSpeed: false,
    acc: false,
    showSettingsModal: false,
    deviceId: ''
  }
  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.checked });
  };
  validationFunction(e) {
    const re = /[0-9]+/g;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  render() {
    console.log('state - tttt', this.state)
    return (
      <Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
          className="modalWrapper"
        >
          <div className="modalHead">
            <DialogContent style={{ padding: 0 }}>
              <div className="notificationList">
                <h5>
                  Notifications
                <span>clear all</span>
                </h5>
                <ScrollArea
                  speed={1}
                  className="scrollbarArea"
                  contentClassName="scrollbarContent"
                  horizontal={false}
                >
                  <ul className="notificationItems">
                    {notfications.map((item, i) => (
                      <li key={i}>
                        <Button component={Link} to="/">
                          <i className="icon">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fal"
                              data-icon="bell"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 448 512"
                              className="svg-inline--fa fa-bell fa-w-14 fa-fw"
                            >
                              <path
                                fill="currentColor"
                                d="M224 480c-17.66 0-32-14.38-32-32.03h-32c0 35.31 28.72 64.03 64 64.03s64-28.72 64-64.03h-32c0 17.65-14.34 32.03-32 32.03zm209.38-145.19c-27.96-26.62-49.34-54.48-49.34-148.91 0-79.59-63.39-144.5-144.04-152.35V16c0-8.84-7.16-16-16-16s-16 7.16-16 16v17.56C127.35 41.41 63.96 106.31 63.96 185.9c0 94.42-21.39 122.29-49.35 148.91-13.97 13.3-18.38 33.41-11.25 51.23C10.64 404.24 28.16 416 48 416h352c19.84 0 37.36-11.77 44.64-29.97 7.13-17.82 2.71-37.92-11.26-51.22zM400 384H48c-14.23 0-21.34-16.47-11.32-26.01 34.86-33.19 59.28-70.34 59.28-172.08C95.96 118.53 153.23 64 224 64c70.76 0 128.04 54.52 128.04 121.9 0 101.35 24.21 138.7 59.28 172.08C421.38 367.57 414.17 384 400 384z"
                              />
                            </svg>
                          </i>
                          {item.title}
                          <span>{item.text}</span>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
                <Button className="seeAll" component={Link} to="/">
                  see all
              </Button>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}
