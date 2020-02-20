import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import messages from './messages';
import Card from 'components/Card/Loadable'
import {withRouter} from 'react-router-dom'
import './style.scss'

const SectionTimeOut = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.history.push('/lock-screen')
    }, 10000);
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>SectionTimeOut</title>
        <meta name="description" content="Description of SectionTimeOut"/>
      </Helmet>
      <h2 className="breadcumbTitle">Section Timeout</h2>
      <Card className="sectionTimeOut">
        <ul>
          <li>If you don't move, after 10 seconds lock screen will be shown.</li>
          <li>If the user doesn't want to, then after 5 more seconds he will be redirected to login page.</li>
          <li>After 15 seconds after document ready, a warning will appear asking if user wants to renew a session.</li>
        </ul>
        <p>
          <strong>Note:</strong>
          The code is for demo purposes, you can configure it like you want to. If you don't want a session timeout you
          can just make a keep alive call from time to time. :) You can find more information looking at source code or
          at our extensive documentation.</p>
      </Card>
    </Fragment>
  )
}
export default withRouter(SectionTimeOut);
