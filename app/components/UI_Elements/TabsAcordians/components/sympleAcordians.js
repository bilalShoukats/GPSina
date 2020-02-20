import React, { Fragment } from 'react';
import { Grid, ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SympleAcordians = () => {
    return (
        <Fragment>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded bg-default',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Expansion Panel Default</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded bg-success',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Expansion Panel Success</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded bg-primary',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Expansion Panel Primary</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded bg-secondary',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Expansion Panel Secondary</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded bg-info',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Expansion Panel Info</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
            >
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded bg-dark',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Expansion Panel Dark</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
        </Fragment>
    );
}
export default SympleAcordians