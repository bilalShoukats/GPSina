import React, { Fragment, useState } from 'react';
import { Grid, Tab, Tabs } from '@material-ui/core';

const DisabledTab = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Grid className="tabMainWrapper">
            <Tabs
                value={value}
                onChange={handleChange}
                className="tabStyle bg-primary"
                variant="fullWidth"
                classes={{
                    indicator: 'indicator',
                    flexContainer: 'tabContainer'
                }}
            >
                <Tab label="item One" value={0} />
                <Tab label="Disabled" disabled value={1} />
                <Tab label="Item Three" value={2} />
            </Tabs>

            {value === 0 && <Grid className="tabWrapper">
                Item One
            </Grid>}
            {value === 1 && <Grid className="tabWrapper">
                Item Two
            </Grid>}
            {value === 2 && <Grid className="tabWrapper">
                Item Three
            </Grid>}
        </Grid>
    );
}
export default DisabledTab