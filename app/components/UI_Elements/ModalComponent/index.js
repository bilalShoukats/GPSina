import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from 'components/Card/Loadable'
import { Grid } from '@material-ui/core'
import messages from './messages';
import DefaultModal from './components/default'
import TransitionModal from './components/transition'
import ScrollModal from './components/scrollModal'
import DraggableModal from './components/modalDraggable'
import MultiModal from './components/multiModal'
import 'sass/elements/modal.scss'

const ModalComponent = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Modal</title>
                <meta name="description" content="Description of ModalComponent" />
            </Helmet>
          <h2 className="breadcumbTitle">Modal</h2>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <Card
                        title="Default Modal"
                    >
                        <DefaultModal
                            button="Open Default Modal"
                            buttonClass="bg-default"
                        />
                    </Card>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Card
                        title="Transition Modal"
                    >
                        <TransitionModal />
                    </Card>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Card
                        title="Large Modal"
                    >
                        <DefaultModal
                            maxWidth="lg"
                            button="open Large Modal"
                            buttonClass="bg-warning"
                        />
                    </Card>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Card
                        title="Scroll Modal"
                    >
                        <ScrollModal />
                    </Card>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Card
                        title="Draggable Modal"
                    >
                        <DraggableModal />
                    </Card>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Card
                        title="Multi Modal"
                    >
                        <MultiModal />
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

export default compose(withConnect)(ModalComponent);
