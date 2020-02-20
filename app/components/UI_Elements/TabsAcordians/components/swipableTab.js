import React, { Fragment } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme, Tabs, Tab, Grid, Box } from '@material-ui/core';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Grid
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            {...other}
        >
            <Box className="tabWrapper">{children}</Box>
        </Grid>
    );
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
    },
}));

const SwipableTab = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function handleChangeIndex(index) {
        setValue(index);
    }

    return (
        <Fragment>
            <Tabs
                value={value}
                onChange={handleChange}
                className="tabStyle bg-info"
                variant="fullWidth"
                classes={{
                    indicator: 'indicator',
                    flexContainer: 'tabContainer'
                }}
            >
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>
            </SwipeableViews>
        </Fragment>
    );
}
export default SwipableTab