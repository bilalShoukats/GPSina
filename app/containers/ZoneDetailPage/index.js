/**
 *
 * ZoneDetailPage
 *
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectZoneDetailPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import Header from '../../components/Header';
import { useStyles } from './styles.js';
import { Grid, Input, Typography } from '@material-ui/core';
import ApiManager from '../../ApiManager/ApiManager';
import APIURLS from '../../ApiManager/apiUrl';
export function ZoneDetailPage(props) {
    useInjectReducer({ key: 'zoneDetailPage', reducer });
    useInjectSaga({ key: 'zoneDetailPage', saga });

    const classes = useStyles(props);
    const [isEditMode, setisEditmode] = useState(false);
    const [deliveryArea, setDeliveryArea] = useState('');
    const [errors, setErrors] = useState({
        deliveryArea: '',
    });
    const [zoneId, setZoneId] = useState('');

    const handleEditMode = () => {
        if (isEditMode) {
            handleSubmit();
        }
        setisEditmode(!isEditMode);
    };
    const handleSubmit = () => {
        if (validateForm(errors) && deliveryArea != '') {
            const api = ApiManager.getInstance();
            api.send('POST', APIURLS.updateZone, {
                zoneId: zoneId,
                name: deliveryArea,
            })
                .then(res => {
                    console.log('Response for update zone : ', res);
                    if (res.data.code === 1014) {
                        props.history.goBack();
                        console.log('Updated Succesfully...');
                    } else {
                        console.log('Bad body request for update zone');
                    }
                })
                .catch(error => {
                    console.log('Error for uodate zone:', error);
                });
        }
    };

    const handleChange = e => {
        e.preventDefault();
        let error = errors;
        const { name, value } = e.target;
        switch (name) {
            case 'deliveryArea':
                error.deliveryArea =
                    value.length < 5
                        ? props.intl.formatMessage({
                              ...messages.atLeast5Character,
                          })
                        : '';
                setDeliveryArea(value);
                break;
        }
        setErrors(error);
    };
    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    useEffect(() => {
        console.log(props.location.state);
        if (props.location.state.area) {
            const area = props.location.state.area;
            setDeliveryArea(area.name);
            setZoneId(area.zoneId);
        } else {
            props.history.goBack();
        }
    }, []);

    return (
        <div>
            <Helmet>
                <title>
                    {props.intl.formatMessage({ ...messages.zoneDetails })}
                </title>
            </Helmet>
            <Header
                title={<FormattedMessage {...messages.zoneDetails} />}
                showEditBtn
                onEdit={handleEditMode}
                isEditMode={isEditMode}
            />

            <div>
                <Grid item sm={12} md={8} className={classes.root}>
                    <div className={classes.container}>
                        <Typography variant="h5" className={classes.title}>
                            <FormattedMessage {...messages.zoneInformation} />
                        </Typography>

                        <Grid item>
                            <Typography
                                variant="body1"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.deliveryArea} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={deliveryArea}
                                name="deliveryArea"
                                style={!isEditMode ? { color: '#ABABAB' } : {}}
                                disabled={!isEditMode}
                                placeholder={props.intl.formatMessage({
                                    ...messages.enterDeliveryArea,
                                })}
                                onChange={handleChange}
                                disableUnderline
                            />
                            {errors.deliveryArea.length > 0 && (
                                <span className={classes.error}>
                                    {errors.deliveryArea}
                                </span>
                            )}
                        </Grid>
                    </div>
                </Grid>
            </div>
        </div>
    );
}

ZoneDetailPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    zoneDetailPage: makeSelectZoneDetailPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(ZoneDetailPage));
