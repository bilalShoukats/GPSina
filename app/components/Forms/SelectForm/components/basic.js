import React from 'react';
import { Grid, Input, OutlinedInput, FilledInput, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';

const SimpleSelect = () => {
    const [values, setValues] = React.useState({
        age: '',
        name: 'hai',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <form>
            <Grid container spacing={3}>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth className='selectForm'>
                        <InputLabel htmlFor="age-simple">Age</InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            inputProps={{
                                name: 'age',
                                id: 'age-simple',
                            }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth className='selectForm'>
                        <InputLabel htmlFor="age-helper">Age</InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            input={<Input name="age" id="age-helper" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Some important helper text</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth className='selectForm'>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            displayEmpty
                            name="age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Without label</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth className='selectForm'>
                        <InputLabel shrink htmlFor="age-label-placeholder"> Age </InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            input={<Input name="age" id="age-label-placeholder" />}
                            displayEmpty
                            name="age"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Label + placeholder</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth disabled className='selectForm'>
                        <InputLabel htmlFor="name-disabled">Name</InputLabel>
                        <Select
                            value={values.name}
                            onChange={handleChange}
                            input={<Input name="name" id="name-disabled" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="hai">Hai</MenuItem>
                            <MenuItem value="olivier">Olivier</MenuItem>
                            <MenuItem value="kevin">Kevin</MenuItem>
                        </Select>
                        <FormHelperText>Disabled</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth error className='selectForm'>
                        <InputLabel htmlFor="name-error">Name</InputLabel>
                        <Select
                            value={values.name}
                            onChange={handleChange}
                            name="name"
                            renderValue={value => `⚠️  - ${value}`}
                            input={<Input id="name-error" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="hai">Hai</MenuItem>
                            <MenuItem value="olivier">Olivier</MenuItem>
                            <MenuItem value="kevin">Kevin</MenuItem>
                        </Select>
                        <FormHelperText>Error</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth className='selectForm'>
                        <InputLabel htmlFor="name-readonly">Name</InputLabel>
                        <Select
                            value={values.name}
                            onChange={handleChange}
                            input={<Input name="name" id="name-readonly" readOnly />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="hai">Hai</MenuItem>
                            <MenuItem value="olivier">Olivier</MenuItem>
                            <MenuItem value="kevin">Kevin</MenuItem>
                        </Select>
                        <FormHelperText>Read only</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth className='selectForm'>
                        <InputLabel htmlFor="age-auto-width">Age</InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            input={<Input name="age" id="age-auto-width" />}
                            autoWidth
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Auto width</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth className='selectForm' >
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            name="age"
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                Placeholder
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Placeholder</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth required className='selectForm'>
                        <InputLabel htmlFor="age-required">Age</InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            name="age"
                            inputProps={{
                                id: 'age-required',
                            }}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth variant="outlined" className='selectForm'>
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                            Age
                        </InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item sm={6} xs={12}>
                    <FormControl fullWidth variant="filled" className='selectForm'>
                        <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
                        <Select
                            value={values.age}
                            onChange={handleChange}
                            className="selectFormFilled"
                            input={<FilledInput name="age" id="filled-age-simple" />}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
}
export default SimpleSelect