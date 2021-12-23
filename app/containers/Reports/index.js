import './styles.css';
import { compose } from 'redux';
import messages from './messages';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import 'react-activity/dist/Sentry.css';
import { useStyles } from '../Reports/styles';
import SCREENS from '../../constants/screen';
import Header from '../../components/Header';
import APIURLS from '../../ApiManager/apiUrl';
import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ApiManager from '../../ApiManager/ApiManager';
import { Grid, Typography } from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import Paper from '@material-ui/core/Paper';
import { BsFillAlarmFill } from 'react-icons/bs';
import { BsChevronRight } from 'react-icons/bs';
export function Reports(props) {
    const classes = useStyles(props);
    const goToHistoryReportsScreen = () => {
        props.history.push(SCREENS.HistoryReports);
    };
    const goToAlarmReportsScreen = () => {
        props.history.push(SCREENS.AlarmReports);
    };
    const goToIdlingReportsScreen = () => {
        props.history.push(SCREENS.IdlingReports);
    };
    const goToIgnitionReportsScreen = () => {
        props.history.push(SCREENS.IgnitionReports);
    };
    return (
        <Grid>
            <Grid>
                <Helmet>
                    <title>
                        {props.intl.formatMessage({ ...messages.Header })}
                    </title>
                </Helmet>
                <Header title={<FormattedMessage {...messages.Header} />} />
            </Grid>
            <div className={classes.root}>
                <Grid className={classes.root}>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <div className={classes.IconsDiv}>
                                <BsFillAlarmFill
                                    className={classes.historyicons}
                                />
                                {props.intl.formatMessage({
                                    ...messages.HistoryReport,
                                })}
                                <BsChevronRight
                                    className={classes.arrowicons}
                                    onClick={goToHistoryReportsScreen}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid className={classes.root}>
                    {' '}
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <div className={classes.IconsDiv}>
                                <BsFillAlarmFill
                                    className={classes.historyicons}
                                />

                                <span>
                                    {props.intl.formatMessage({
                                        ...messages.IdlingReport,
                                    })}
                                </span>
                                <BsChevronRight
                                    className={classes.arrowicons}
                                    onClick={goToIdlingReportsScreen}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid className={classes.root}>
                    {' '}
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <div className={classes.IconsDiv}>
                                <BsFillAlarmFill
                                    className={classes.historyicons}
                                />
                                <span>
                                    {props.intl.formatMessage({
                                        ...messages.AlarmReport,
                                    })}
                                </span>
                                <BsChevronRight
                                    className={classes.arrowicons}
                                    onClick={goToAlarmReportsScreen}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid className={classes.root}>
                    {' '}
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <div className={classes.IconsDiv}>
                                <BsFillAlarmFill
                                    className={classes.historyicons}
                                />

                                <span>
                                    {props.intl.formatMessage({
                                        ...messages.IgnitionReport,
                                    })}
                                </span>
                                <BsChevronRight
                                    className={classes.arrowicons}
                                    onClick={goToIgnitionReportsScreen}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Grid>
    );
}
Reports.propTypes = {};
const withConnect = connect();

export default compose(withConnect)(injectIntl(Reports));
