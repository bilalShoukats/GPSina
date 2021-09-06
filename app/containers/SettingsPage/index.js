/**
 *
 * SettingsPage
 *
 */
import { v1 } from 'uuid';
import saga from './saga';
import { compose } from 'redux';
import reducer from './reducer';
import messages from './messages';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { SuperHOC } from '../../HOC';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Dots } from 'react-activity';
import { uploadFile } from 'react-s3';
import { Container } from 'reactstrap';
import { useStyles } from './styles.js';
import 'react-image-lightbox/style.css';
import { CustomInput } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import Header from '../../components/Header';
import SCREENS from '../../constants/screen';
import APIURLS from '../../ApiManager/apiUrl';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import s3Credentials from '../../constants/aws';
import { useInjectSaga } from 'utils/injectSaga';
import makeSelectSettingsPage from './selectors';
import CloseIcon from '@material-ui/icons/Close';
import UserAvatar from '../../components/UserAvatar';
import ApiManager from '../../ApiManager/ApiManager';
import { logoutUser } from '../../redux/auth/actions';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CustomModal from '../../components/CustomModal';
import { useInjectReducer } from 'utils/injectReducer';
import { Manager } from '../../StorageManager/Storage';
import { FormattedMessage, injectIntl } from 'react-intl';
import React, { useEffect, useState, useRef } from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, Input, Typography, Hidden } from '@material-ui/core';
import defaultProfileImage from '../../../assets/images/icons/defaultProfileImage.png';

let cropper = null;
export function SettingsPage(props) {
    const fileInput = useRef();
    useInjectReducer({ key: 'settingsPage', reducer });
    useInjectSaga({ key: 'settingsPage', saga });
    const api = ApiManager.getInstance();
    const history = useHistory();
    const classes = useStyles(props);
    const [email, setEmail] = useState();
    const [image, setImage] = useState('');
    const [avatar, setAvatar] = useState('');
    const [userName, setUserName] = useState();
    const [mobileNo, setMobileNo] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [modalTitle, setModalTitle] = useState('');
    const [modalRight, setModalRight] = useState(false);
    const [isModalShown, setIsModalShown] = useState(false);
    const [modalDescription, setModalDescription] = useState('');
    const styles = theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        switch (name) {
            case 'username':
                setUserName(value);
                break;

            case 'email':
                setEmail(value);
                break;

            case 'mobileNo':
                setMobileNo(value);
                break;

            case 'oldPassword':
                setOldPassword(value);
                break;

            case 'newPassword':
                setNewPassword(value);
                break;
        }
    };

    const goToContactUsScreen = () => {
        history.push(SCREENS.CONTACTUS);
    };

    const goToRefundDeliveryScreen = () => {
        history.push(SCREENS.REFUNDDELIVERY);
    };

    const goToExpiredDevicesScreen = () => {
        history.push(SCREENS.EXPIREDDEVICES);
    };

    useEffect(() => {
        setEmail(props.auth.user.email);
        setMobileNo(props.auth.user.phone);
        setUserName(props.auth.user.firstName + ' ' + props.auth.user.lastName);
    }, []);

    const openLightBox = () => {
        setIsOpen(true);
    };

    const openFileDialog = () => {
        fileInput.current.click();
    };

    const toggleRight = () => {
        setModalRight(!modalRight);
    };

    const onChange = e => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            setModalRight(!modalRight);
            let files;
            if (e.dataTransfer) {
                files = e.dataTransfer.files;
            } else if (e.target) {
                files = e.target.files;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(files[0]);
            e.target.value = null;
        }
    };

    const getCropData = callBack => {
        if (typeof cropper !== 'undefined') {
            urlToFile(
                cropper.getCroppedCanvas().toDataURL(),
                `${v1()}.png`,
                'image/png',
            ).then(function(file) {
                callBack(file);
            });
        }
    };

    function urlToFile(url, filename, mimeType) {
        return fetch(url)
            .then(function(res) {
                return res.arrayBuffer();
            })
            .then(function(buf) {
                return new File([buf], filename, { type: mimeType });
            });
    }

    const updateProfile = async file => {
        setUpdating(true);
        s3Credentials['dirName'] = 'profile';
        uploadFile(file, s3Credentials)
            .then(data => {
                console.log('s3 response: ', data.location);
                if (data.result.status === 204) {
                    api.send('POST', APIURLS.updateAvatar, {
                        avatar: data.location,
                    })
                        .then(res => {
                            setModalRight(false);
                            setImage('');
                            setUpdating(false);
                            if (res.data.code === 1014) {
                                Manager.getItem('user').then(user => {
                                    user = JSON.parse(user);
                                    user.avatar = data.location;
                                    setAvatar(data.location);
                                    Manager.setItem('user', user);
                                    setModalTitle(
                                        props.intl.formatMessage({
                                            ...messages.updateAvatar,
                                        }),
                                    );
                                    setModalDescription(
                                        props.intl.formatMessage({
                                            ...messages.updateAvatarSuccess,
                                        }),
                                    );
                                    handleOpenModal();
                                });
                            } else {
                                setModalTitle(
                                    props.intl.formatMessage({
                                        ...messages.updateAvatar,
                                    }),
                                );
                                setModalDescription(
                                    props.intl.formatMessage({
                                        id: `app.containers.SettingsPage.${
                                            res.data.code
                                        }`,
                                        defaultMessage: `${res.data.id}`,
                                    }),
                                );
                                handleOpenModal();
                            }
                        })
                        .catch(error => console.log(error));
                }
            })
            .catch(err => {
                setUpdating(false);
                setModalTitle(
                    props.intl.formatMessage({ ...messages.updateAvatar }),
                );
                setModalDescription(
                    props.intl.formatMessage({
                        id: `app.containers.SettingsPage.${err.type}`,
                        defaultMessage: `${err.messages}`,
                    }),
                );
                handleOpenModal();
            });
    };

    const handleOpenModal = () => {
        setIsModalShown(true);
    };

    const handleCloseModal = () => {
        setIsModalShown(false);
        // if(props.intl.formatMessage({ ...messages.registerSuccessful })){
        //   window.location.reload();
        // }
    };

    const DialogTitle = withStyles(styles)(props => {
        const { children, classes, onClose, ...other } = props;
        return (
            <MuiDialogTitle
                disableTypography
                className={classes.root}
                {...other}
            >
                <Typography variant="h6">{children}</Typography>
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    const DialogActions = withStyles(theme => ({
        root: {
            margin: 0,
            padding: theme.spacing(1),
        },
    }))(MuiDialogActions);

    return (
        <Container fluid={true}>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Header title={<FormattedMessage {...messages.settings} />} />
            <div>
                <Grid item sm={8} md={6} className={classes.root}>
                    <Grid
                        container
                        justify="center"
                        alignItems="flex-end"
                        className={classes.avatar}
                    >
                        <UserAvatar
                            alt="Profile Avatar"
                            src={
                                props.auth.user.avatar
                                    ? props.auth.user.avatar
                                    : defaultProfileImage
                            }
                            onClick={openLightBox}
                        />
                        <FontAwesomeIcon
                            icon={faCamera}
                            size="1x"
                            onClick={openFileDialog}
                            style={{ bottom: 1 }}
                            style={{ cursor: 'pointer' }}
                        />
                    </Grid>

                    <div className={classes.container}>
                        {isOpen && (
                            <Lightbox
                                mainSrc={avatar ? avatar : defaultProfileImage}
                                nextSrc={undefined}
                                prevSrc={undefined}
                                onCloseRequest={() => setIsOpen(false)}
                                onMovePrevRequest={() => {}}
                                onMoveNextRequest={() => {}}
                            />
                        )}
                        <Grid item>
                            <Typography
                                variant="body2"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.username} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={userName}
                                name="username"
                                placeholder="Enter User Name"
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body2"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.email} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={email}
                                name="email"
                                placeholder="Enter email"
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>

                        <Grid item>
                            <Typography
                                variant="body2"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.mobile} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                value={mobileNo}
                                name="mobileNo"
                                placeholder="Enter mobile no"
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>
                    </div>

                    <div className={classes.container}>
                        <Typography
                            variant="h6"
                            className={classes.title}
                            align="center"
                        >
                            <FormattedMessage {...messages.changePassword} />
                        </Typography>
                        <Grid item>
                            <Typography
                                variant="body2"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.oldPassword} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                name="oldPassword"
                                value={oldPassword}
                                placeholder="Enter old password"
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body2"
                                className={classes.label}
                            >
                                <FormattedMessage {...messages.newPassword} />
                            </Typography>
                            <Input
                                className={classes.textInput}
                                name="newPassword"
                                value={newPassword}
                                placeholder="Enter new password"
                                onChange={handleChange}
                                disableUnderline
                            />
                        </Grid>
                    </div>

                    <div className={classes.bottomContainer}>
                        <Grid container alignItems="center" justify="center">
                            <Button
                                className={classes.btnBlue}
                                variant="contained"
                            >
                                <Typography variant="body1">
                                    <FormattedMessage {...messages.save} />
                                </Typography>
                            </Button>

                            <Button
                                className={classes.btnBlue}
                                variant="contained"
                                onClick={goToContactUsScreen}
                            >
                                <Typography variant="body1">
                                    <FormattedMessage {...messages.contactUs} />
                                </Typography>
                            </Button>

                            <Button
                                className={classes.btnYellow}
                                variant="contained"
                                onClick={goToRefundDeliveryScreen}
                            >
                                <Typography variant="body1">
                                    <FormattedMessage
                                        {...messages.refundDeliveryMethod}
                                    />
                                </Typography>
                            </Button>

                            <Button
                                className={classes.btnYellow}
                                variant="contained"
                                onClick={goToExpiredDevicesScreen}
                            >
                                <Typography variant="body1">
                                    <FormattedMessage
                                        {...messages.expiredDevices}
                                    />
                                </Typography>
                            </Button>

                            <Button
                                className={classes.btnRed}
                                variant="contained"
                                onClick={() =>
                                    props.dispatch(logoutUser(history))
                                }
                            >
                                <Typography variant="body1">
                                    <FormattedMessage {...messages.logOut} />
                                </Typography>
                            </Button>
                        </Grid>
                    </div>

                    <Typography
                        align="right"
                        variant="body2"
                        className={classes.versionStyle}
                    >
                        v: 0.7.8
                    </Typography>
                </Grid>
                <div style={{ display: 'none' }}>
                    <CustomInput
                        innerRef={fileInput}
                        type="file"
                        id="exampleCustomFileBrowser4"
                        name="customFile"
                        className="d-none"
                        onChange={e => onChange(e)}
                    />
                </div>
                <Dialog
                    open={modalRight}
                    onClose={toggleRight}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <div>
                        <DialogTitle
                            id="customized-dialog-title"
                            onClose={toggleRight}
                        >
                            Crop Image
                        </DialogTitle>
                        {image && (
                            <Cropper
                                style={{ height: 400, width: '100%' }}
                                zoomTo={0.5}
                                initialAspectRatio={4 / 4}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                guides={true}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={async instance => {
                                    cropper = await instance;
                                }}
                            />
                        )}
                    </div>
                    <DialogActions>
                        <Button
                            autoFocus
                            color="primary"
                            onClick={() => getCropData(updateProfile)}
                            color="primary"
                        >
                            {updating ? (
                                <Dots color={'#fff'} />
                            ) : (
                                'Save changes'
                            )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <CustomModal
                open={isModalShown}
                handleClose={handleCloseModal}
                type="simple"
                title={modalTitle}
                description={modalDescription}
            />
        </Container>
    );
}

SettingsPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    const { auth } = state;
    return {
        auth,
        settingsPage: makeSelectSettingsPage(),
    };
};

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SettingsPage));
