import React from 'react';
import clsx from 'clsx';

import { Grid, Input, OutlinedInput, FilledInput, InputLabel, MenuItem, FormHelperText, FormControl, Select, makeStyles, useTheme, ListItemText, Checkbox, Chip } from '@material-ui/core';


const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const MultipleSelect = () => {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    function handleChange(event) {
        setPersonName(event.target.value);
    }

    function handleChangeMultiple(event) {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setPersonName(value);
    }

    return (
        <Grid container spacing={3}>
            <Grid item xl={6} xs={12}>
                <FormControl
                    fullWidth
                >
                    <InputLabel htmlFor="select-multiple">Name</InputLabel>
                    <Select
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<Input id="select-multiple" />}
                        MenuProps={MenuProps}
                    >
                        {names.map(name => (
                            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xl={6} xs={12}>

                <FormControl fullWidth>
                    <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
                    <Select
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox
                                    classes={{
                                        root: 'checkboxWrap checkDefault',
                                        checked: 'checked',
                                    }}
                                    checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xl={6} xs={12}>

                <FormControl fullWidth>
                    <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
                    <Select
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div>
                                {selected.map(value => (
                                    <Chip key={value} label={value} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >
                        {names.map(name => (
                            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xl={6} xs={12}>
                <FormControl fullWidth>
                    <Select
                        multiple
                        displayEmpty
                        value={personName}
                        onChange={handleChange}
                        input={<Input id="select-multiple-placeholder" />}
                        renderValue={selected => {
                            if (selected.length === 0) {
                                return <em>Placeholder</em>;
                            }

                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                    >
                        <MenuItem disabled value="">
                            <em>Placeholder</em>
                        </MenuItem>
                        {names.map(name => (
                            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

        </Grid>
    );
}
export default MultipleSelect