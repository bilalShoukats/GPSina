import React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, MenuItem, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    menu: {
        width: 200,
    },
}));

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

const TextFields = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
    });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <form noValidate>
            <Grid container spacing={3}>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Name"
                        className='inputField'
                        value={values.name}
                        onChange={handleChange('name')}
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Uncontrolled"
                        defaultValue="foo"
                        className='inputField'
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        required
                        label="Required"
                        defaultValue="Hello World"
                        className='inputField'
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        error
                        label="Error"
                        defaultValue="Hello World"
                        className='inputField'
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        disabled
                        label="Disabled"
                        defaultValue="Hello World"
                        className='inputField'
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        className='inputField'
                        type="password"
                        autoComplete="current-password"
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Read Only"
                        defaultValue="Hello World"
                        className='inputField'
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Dense"
                        className='inputField'
                    />
                </Grid>

                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Helper text"
                        defaultValue="Default Value"
                        className='inputField'
                        helperText="Some important text"
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="With placeholder"
                        placeholder="Placeholder"
                        className='inputField'
                        margin="normal"
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="With placeholder multiline"
                        placeholder="Placeholder"
                        multiline
                        className='inputField'
                        margin="normal"
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Number"
                        value={values.age}
                        onChange={handleChange('age')}
                        type="number"
                        className='inputField'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Search field"
                        type="search"
                        className='inputField'
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Select"
                        className='inputField'
                        value={values.currency}
                        onChange={handleChange('currency')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Please select your currency"
                    >
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Native select"
                        className='inputField'
                        value={values.currency}
                        onChange={handleChange('currency')}
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Please select your currency"
                    >
                        {currencies.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Label"
                        placeholder="Placeholder"
                        helperText="Full width!"
                        className='inputField'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        className='inputField'
                        defaultValue="Bare"
                        inputProps={{ 'aria-label': 'bare' }}
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Multiline"
                        multiline
                        fullWidth
                        rowsMax="4"
                        value={values.multiline}
                        onChange={handleChange('multiline')}
                        className='inputField'
                    />
                </Grid>
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Multiline"
                        multiline
                        rows="4"
                        defaultValue="Default Value"
                        className='inputField'
                    />
                </Grid>
            </Grid>

        </form>
    );
}
export default TextFields