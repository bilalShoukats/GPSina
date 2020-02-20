import React from 'react';
import clsx from 'clsx';
import { makeStyles, Grid, MenuItem, TextField } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    menu: {
        width: 200,
    },
}));

const FilledTextFields = () => {
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
                        label="Name"
                        fullWidth
                        className='inputField inputFieldFilled'
                        value={values.name}
                        onChange={handleChange('name')}
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Uncontrolled"
                        fullWidth
                        defaultValue="foo"
                        className='inputField inputFieldFilled'
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Required"
                        defaultValue="Hello World"
                        className='inputField inputFieldFilled'
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        error
                        fullWidth
                        label="Error"
                        defaultValue="Hello World"
                        className='inputField inputFieldFilled'
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        disabled
                        label="Disabled"
                        defaultValue="Hello World"
                        className='inputField inputFieldFilled'
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        className='inputField inputFieldFilled'
                        type="email"
                        name="email"
                        autoComplete="email"
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Password"
                        className='inputField inputFieldFilled'
                        type="password"
                        autoComplete="current-password"
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Read Only"
                        defaultValue="Hello World"
                        className='inputField inputFieldFilled'
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        className='inputField inputFieldFilled'
                        variant="filled"
                        placeholder="Hidden label"
                        inputProps={{ 'aria-label': 'hidden label' }}
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Dense"
                        fullWidth
                        className='inputField inputFieldFilled'
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        className='inputField inputFieldFilled'
                        variant="filled"
                        placeholder="Dense hidden label"
                        inputProps={{ 'aria-label': 'dense hidden label' }}
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Dense multiline"
                        className='inputField inputFieldFilled'
                        variant="filled"
                        multiline
                        rowsMax="4"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Multiline"
                        multiline
                        rowsMax="4"
                        fullWidth
                        value={values.multiline}
                        onChange={handleChange('multiline')}
                        className='inputField inputFieldFilled'
                        helperText="hello"
                        variant="filled"
                    />
                </Grid >

                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Helper text"
                        defaultValue="Default Value"
                        className='inputField inputFieldFilled'
                        helperText="Some important text"
                        variant="filled"
                        fullWidth
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="With placeholder"
                        placeholder="Placeholder"
                        className='inputField inputFieldFilled'
                        variant="filled"
                        fullWidth
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Multiline Placeholder"
                        placeholder="Placeholder"
                        multiline
                        className='inputField inputFieldFilled'
                        variant="filled"
                        fullWidth
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Number"
                        value={values.age}
                        onChange={handleChange('age')}
                        type="number"
                        className='inputField inputFieldFilled'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        variant="filled"
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Search field"
                        type="search"
                        className='inputField inputFieldFilled'
                        variant="filled"
                        fullWidth
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        select
                        label="Select"
                        className='inputField inputFieldFilled'
                        value={values.currency}
                        onChange={handleChange('currency')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        fullWidth
                        helperText="Please select your currency"
                        variant="filled"
                    >
                        {currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        select
                        label="Native select"
                        className='inputField inputFieldFilled'
                        value={values.currency}
                        onChange={handleChange('currency')}
                        fullWidth
                        SelectProps={{
                            native: true,
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        helperText="Please select your currency"
                        variant="filled"
                    >
                        {currencies.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>

                    <TextField
                        label="Label"
                        placeholder="Placeholder"
                        helperText="Full width!"
                        fullWidth
                        className='inputField inputFieldFilled'
                        variant="filled"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        fullWidth
                        className='inputField inputFieldFilled'
                        defaultValue="Bare"
                        variant="filled"
                        inputProps={{ 'aria-label': 'bare' }}
                    />
                </Grid >
                <Grid item xl={4} md={3} sm={6} xs={12}>
                    <TextField
                        label="Multiline"
                        fullWidth
                        multiline
                        rows="4"
                        defaultValue="Default Value"
                        className='inputField inputFieldFilled'
                        variant="filled"
                    />
                </Grid >
            </Grid >
        </form>
    );
}
export default FilledTextFields