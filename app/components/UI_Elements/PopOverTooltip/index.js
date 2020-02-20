import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Grid, Button } from '@material-ui/core'
import Card from 'components/Card/Loadable'
import messages from './messages';

const PopOverTooltip = () => {
    const [top, setTop] = useState(false)
    const [right, setRight] = useState(false)
    const [bottom, setBottom] = useState(false)
    const [left, setLeft] = useState(false)
    return (
        <Fragment>
            <Helmet>
                <title>PopOverTooltip</title>
                <meta name="description" content="Description of PopOverTooltip" />
            </Helmet>
          <h2 className="breadcumbTitle">Tooltios</h2>
            <Grid container spacing={3}>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Hoverable Tooltip"
                    >
                        <Grid spacing={2} container>
                            <Grid item xl={3}  sm={6} xs={12}>
                                <Button className="btn bg-default tooltipWrap topTooltip">
                                    Top Tooltip
                                    <span className="tooltip">Top Tooltip</span>
                                </Button>
                            </Grid>
                            <Grid item xl={3}  sm={6} xs={12}>
                                <Button className="btn tooltipWrap rightTooltip bg-success">
                                    Right Tooltip
                                    <span className="tooltip">Right Tooltip</span>
                                </Button>
                            </Grid>
                            <Grid item xl={3}  sm={6} xs={12}>
                                <Button className="btn bg-primary tooltipWrap bottomTooltip">
                                    Bottom Tooltip
                                    <span className="tooltip">Bottom Tooltip</span>
                                </Button>
                            </Grid>
                            <Grid item xl={3}  sm={6} xs={12}>
                                <Button className="btn bg-secondary tooltipWrap leftTooltip">
                                    Left Tooltip
                                    <span className="tooltip">Left Tooltip</span>
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="Clickable Popover"
                    >
                        <Grid spacing={2} container>
                            <Grid item xl={3}  sm={6} xs={12}>
                                <Button onClick={() => setTop(!top)} className="btn bg-default popover topPopover">
                                    Top Popover
                                    <Grid className={top ? 'popoverWrap active' : 'popoverWrap'}>
                                        <h4 className="bg-default">Top popover</h4>
                                        <p>Ipsum dolor sit amet laudantium sunt quisquam!</p>
                                    </Grid>
                                </Button>
                            </Grid>
                            <Grid item xl={3}  sm={6} xs={12}>
                                <Button onClick={() => setRight(!right)} className="btn popover rightPopover bg-success">
                                    Right Popover
                                    <Grid className={right ? 'popoverWrap active' : 'popoverWrap'}>
                                        <h4 className="bg-success">Right popover</h4>
                                        <p>Ipsum dolor sit amet laudantium sunt quisquam!</p>
                                    </Grid>
                                </Button>
                            </Grid>
                            <Grid item xl={3}  sm={6} xs={12}>
                                <Button onClick={() => setBottom(!bottom)} className="btn bg-primary popover bottomPopover">
                                    Bottom Popover
                                    <Grid className={bottom ? 'popoverWrap active' : 'popoverWrap'}>
                                        <h4 className="bg-primary">Bottom popover</h4>
                                        <p>Ipsum dolor sit amet laudantium sunt quisquam!</p>
                                    </Grid>
                                </Button>
                            </Grid>
                            <Grid item xl={3} sm={6} xs={12}>
                                <Button onClick={() => setLeft(!left)} className="btn bg-secondary popover leftPopover">
                                    Left Popover
                                    <Grid className={left ? 'popoverWrap active' : 'popoverWrap'}>
                                        <h4 className="bg-secondary">Left popover</h4>
                                        <p>Ipsum dolor sit amet laudantium sunt quisquam!</p>
                                    </Grid>
                                </Button>
                            </Grid>
                        </Grid>
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

export default compose(withConnect)(PopOverTooltip);
