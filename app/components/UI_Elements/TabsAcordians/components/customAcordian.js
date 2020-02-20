import React, { Fragment } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Grid, ExpansionPanel, ExpansionPanelSummary } from '@material-ui/core';

const CustomizedExpansionPanels = () => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Fragment>
            <ExpansionPanel
                square
                expanded={expanded === 'panel1'}
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
                onChange={handleChange('panel1')}>
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded  bg-default',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Collapsible Group Item #1</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
                square
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}>
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded  bg-default',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Collapsible Group Item #2</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
                square
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}>
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded  bg-default',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Collapsible Group Item #3</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
            <ExpansionPanel
                classes={{
                    root: 'acordianWrapper',
                    expanded: 'acordianWrapperExpanded'
                }}
                square
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}>
                <ExpansionPanelSummary
                    classes={{
                        root: 'acordianHeader',
                        expanded: 'acordianHeaderExpanded  bg-default',
                        expandIcon: 'acordianHeaderIcon',
                        content: 'acordianHeaderContent'
                    }}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <h4>Collapsible Group Item #4</h4>
                </ExpansionPanelSummary>
                <Grid className="acordianBody">
                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</p>
                </Grid>
            </ExpansionPanel>
        </Fragment>
    );
}
export default CustomizedExpansionPanels