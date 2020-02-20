import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card/Loadable'
import { Grid, List, ListItem, Typography } from '@material-ui/core'
import { compose } from 'redux';
import messages from './messages';
import './style.scss'


import timeLines from 'utils/json/timeline'

const TimelineComponent = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Timeline</title>
                <meta name="description" content="Description of TimelineComponent" />
            </Helmet>
            <h2 className="breadcumbTitle">Timeline</h2>
            <Card
                title="Timeline"
                className="timelineArea"
            >
                <List className="timelineWrapper">
                    {timeLines.map(timeline => (
                        <ListItem key={timeline.id} className="todoListItem">
                            <Grid className="timelineItemTail" style={{ background: `${timeline.background}70` }}></Grid>
                            <Grid className="timeLineIcon">
                                <Typography component="span">
                                    <img style={{ border: `3px solid ${timeline.background}70` }} src={timeline.image} />
                                </Typography>
                            </Grid>
                            <Grid className="timelineContent">
                                <Typography variant="h5">{timeline.title}
                                    <Typography className="time" component="span">
                                        <i className="fa fa-clock-o" />
                                        {timeline.time}
                                    </Typography>
                                </Typography>
                                <Typography component="span">{timeline.text} {timeline.subText}</Typography>
                                <Typography paragraph>{timeline.details}</Typography>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            </Card>
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

export default compose(withConnect)(TimelineComponent);
