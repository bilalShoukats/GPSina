/**
 *
 * AddZonePage
 *
 */

import * as Yup from 'yup';
import { compose } from 'redux';
import messages from './messages';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { useStyles } from './styles.js';
import Header from '../../components/Header';
import APIURLS from '../../ApiManager/apiUrl';
import { Formik, ErrorMessage } from 'formik';
import ApiManager from '../../ApiManager/ApiManager';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button, Grid, Input, Typography } from '@material-ui/core';

export function AddZonePage(props) {
    const classes = useStyles(props);
    const [clickBtn, setClickBtn] = useState(false);

    const initialValues = {
        deliveryArea: '',
    };

    const validationSchema = Yup.object({
        deliveryArea: Yup.string()
            .min(3, 'Must be 3 characters or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
    });

    const addZone = body => {
        const api = ApiManager.getInstance();
        setClickBtn(true);
        api.send('POST', APIURLS.addZone, body)
            .then(res => {
                setClickBtn(false);
                console.log('Add Zone Response : ', res);
                if (res.data.code === 1008) {
                    props.history.goBack();
                } else {
                    console.log('Add zone Bad Body');
                }
            })
            .catch(error => {
                setClickBtn(false);
                console.log('Add zone Errors : ', error);
            });
    };

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.addZone })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.addZone} />} />
            <Grid item sm={12} md={8} className={classes.root}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        let body = {
                            name: values.deliveryArea,
                        };
                        console.log('Body : ', body);
                        addZone(body);
                    }}
                >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <Grid item>
                                <Typography
                                    variant="body1"
                                    className={classes.label}
                                >
                                    <FormattedMessage
                                        {...messages.deliveryArea}
                                    />
                                </Typography>
                                <Input
                                    type="text"
                                    id="deliveryArea"
                                    name="deliveryArea"
                                    className={classes.textInput}
                                    placeholder={props.intl.formatMessage({
                                        ...messages.enterDeliveryArea,
                                    })}
                                    {...formik.getFieldProps('deliveryArea')}
                                />
                                <ErrorMessage
                                    name="deliveryArea"
                                    render={msg => (
                                        <Grid className={classes.error}>
                                            {msg}
                                        </Grid>
                                    )}
                                />
                            </Grid>

                            <Grid
                                container
                                justify="center"
                                alignItems="center"
                                className={classes.btnContainer}
                            >
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    size="medium"
                                    disabled={clickBtn}
                                    className={classes.btnBlue}
                                >
                                    <Typography variant="body1">
                                        <FormattedMessage
                                            {...messages.submit}
                                        />
                                    </Typography>
                                </Button>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}

AddZonePage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(AddZonePage));
