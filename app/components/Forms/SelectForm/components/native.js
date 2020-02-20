import React from 'react';

import { Grid, Input, OutlinedInput, FilledInput, InputLabel, NativeSelect, FormHelperText, FormControl, Select } from '@material-ui/core';


const NativeSelects = () => {
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = name => event => {
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth className='selectForm'>
                    <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                    <Select
                        native
                        value={state.age}
                        onChange={handleChange('age')}
                        inputProps={{
                            name: 'age',
                            id: 'age-native-simple',
                        }}
                    >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth className='selectForm'>
                    <InputLabel htmlFor="age-native-helper">Age</InputLabel>
                    <NativeSelect
                        value={state.age}
                        onChange={handleChange('age')}
                        input={<Input name="age" id="age-native-helper" />}
                    >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                    <FormHelperText>Some important helper text</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth className='selectForm'>
                    <NativeSelect
                        value={state.age}
                        onChange={handleChange('age')}
                        name="age"
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="">None</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                    <FormHelperText>With visually hidden label</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth className='selectForm'>
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                        Age
                    </InputLabel>
                    <NativeSelect
                        value={state.age}
                        onChange={handleChange('age')}
                        input={<Input name="age" id="age-native-label-placeholder" />}
                    >
                        <option value="">None</option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                    <FormHelperText>Label + placeholder</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth disabled className='selectForm'>
                    <InputLabel htmlFor="name-native-disabled">Name</InputLabel>
                    <NativeSelect
                        value={state.name}
                        onChange={handleChange('name')}
                        input={<Input name="name" id="name-native-disabled" />}
                    >
                        <option value="" />
                        <optgroup label="Author">
                            <option value="hai">Hai</option>
                        </optgroup>
                        <optgroup label="Contributors">
                            <option value="olivier">Olivier</option>
                            <option value="kevin">Kevin</option>
                        </optgroup>
                    </NativeSelect>
                    <FormHelperText>Disabled</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth error className='selectForm'>
                    <InputLabel htmlFor="name-native-error">Name</InputLabel>
                    <NativeSelect
                        value={state.name}
                        onChange={handleChange('name')}
                        name="name"
                        input={<Input id="name-native-error" />}
                    >
                        <option value="" />
                        <optgroup label="Author">
                            <option value="hai">Hai</option>
                        </optgroup>
                        <optgroup label="Contributors">
                            <option value="olivier">Olivier</option>
                            <option value="kevin">Kevin</option>
                        </optgroup>
                    </NativeSelect>
                    <FormHelperText>Error</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth className='selectForm'>
                    <InputLabel htmlFor="uncontrolled-native">Name</InputLabel>
                    <NativeSelect defaultValue={30} input={<Input name="name" id="uncontrolled-native" />}>
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                    <FormHelperText>Uncontrolled</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth className='selectForm'>
                    <NativeSelect
                        value={state.age}
                        name="age"
                        onChange={handleChange('age')}
                        inputProps={{ 'aria-label': 'age' }}
                    >
                        <option value="" disabled>
                            Placeholder
                    </option>
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                    <FormHelperText>Placeholder</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl required fullWidth className='selectForm'>
                    <InputLabel htmlFor="age-native-required">Age</InputLabel>
                    <Select
                        native
                        value={state.age}
                        onChange={handleChange('age')}
                        name="age"
                        inputProps={{
                            id: 'age-native-required',
                        }}
                    >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl variant="outlined" fullWidth className='selectForm'>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                        Age
                    </InputLabel>
                    <Select
                        native
                        value={state.age}
                        onChange={handleChange('age')}
                        input={
                            <OutlinedInput name="age" labelWidth={labelWidth} id="outlined-age-native-simple" />
                        }
                    >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl variant="filled" fullWidth className='selectForm'>
                    <InputLabel htmlFor="filled-age-native-simple">Age</InputLabel>
                    <Select
                        native
                        value={state.age}
                        onChange={handleChange('age')}
                        className="selectFormFilled"
                        input={<FilledInput name="age" id="filled-age-native-simple" />}
                    >
                        <option value="" />
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}
export default NativeSelects