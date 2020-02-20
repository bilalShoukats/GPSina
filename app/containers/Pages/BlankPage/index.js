import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';

import messages from './messages';

const BlankPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Blank Page</title>
      </Helmet>
      <h2 className="breadcumbTitle">Blank Page</h2>
    </Fragment>
  );
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

export default compose(withConnect)(BlankPage);
