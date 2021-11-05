/**
 *
 * ZoneDetailPage
 *
 */
import * as Yup from 'yup';
import { compose } from 'redux';
import messages from './messages';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useStyles } from './styles.js';
import Header from '../../components/Header';
import APIURLS from '../../ApiManager/apiUrl';
import { Formik, ErrorMessage } from 'formik';
import ApiManager from '../../ApiManager/ApiManager';
import { FormattedMessage, injectIntl } from 'react-intl';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Input, Typography } from '@material-ui/core';
export function ZoneDetailPage(props) {
    const classes = useStyles(props);

    const formikRef = useRef();

    const [zoneId, setZoneId] = useState('');
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

    const updateZone = body => {
        setClickBtn(true);
        const api = ApiManager.getInstance();
        api.send('POST', APIURLS.updateZone, body)
            .then(res => {
                setClickBtn(false);
                console.log('Response for update zone : ', res);
                if (res.data.code === 1014) {
                    props.history.goBack();
                    console.log('Updated Succesfully...');
                } else {
                    console.log('Bad body request for update zone');
                }
            })
            .catch(error => {
                setClickBtn(false);
                console.log('Error for uodate zone:', error);
            });
    };

    useEffect(() => {
        console.log('Detail useEffect Zone : ', props.location.state);
        const { area: zone } = props.location.state;
        if (zone) {
            if (formikRef.current) {
                formikRef.current.setFieldValue('deliveryArea', zone.name);
                setZoneId(zone.zoneId);
            }
        } else {
            props.history.goBack();
        }
    }, []);

    return (
        <Grid>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.zoneDetails })}
                </title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.zoneDetails} />} />
            <Grid item sm={12} md={8} className={classes.root}>
                <Formik
                    innerRef={formikRef}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={values => {
                        let body = {
                            zoneId: zoneId,
                            name: values.deliveryArea,
                        };
                        console.log('Body : ', body);
                        updateZone(body);
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

ZoneDetailPage.propTypes = {};

const withConnect = connect();

export default compose(withConnect)(injectIntl(ZoneDetailPage));
