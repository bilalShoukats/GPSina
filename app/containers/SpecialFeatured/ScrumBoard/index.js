import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import Card from 'components/Card/Loadable'
import {Grid, Button, TextField} from '@material-ui/core'
import messages from './messages';
import Board from "react-trello";
import './style.scss'
// json data 
import data from 'utils/json/data.json'


const ScrumBoard = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Scrum Board</title>
      </Helmet>
      <h2 className="breadcumbTitle">Scrumboard</h2>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            title="Scrum Board"
            className="scrumBoardArea"
          >
            <Board data={data}/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            title="Scrum Board draggable"
            subtitle="use Board Component boolean type"
            className="scrumBoardArea scrumBoardDragableArea"
          >
            <Board data={data} draggable/>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card
            title="Scrum Board Editable"
            subtitle="use Board Component boolean type"
            className="scrumBoardArea scrumBoardEditableArea"
          >
            <Board data={data} editable editLaneTitle/>
          </Card>
        </Grid>
      </Grid>

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

export default compose(withConnect)(ScrumBoard);
