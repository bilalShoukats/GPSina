import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import messages from './messages';
import Card from 'components/Card/Loadable'
import {Grid, Checkbox, FormGroup, FormControlLabel, Radio, Switch} from '@material-ui/core'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';


const CheckboxComponent = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
  });
  const [selectedValue, setSelectedValue] = React.useState('a');

  function radioChangeHandler(event) {
    setSelectedValue(event.target.value);
  }

  const handleChange = name => event => {
    setState({...state, [name]: event.target.checked});
  };
  return (
    <Fragment>
      <Helmet>
        <title>Checkbox</title>
      </Helmet>
      <h2 className="breadcumbTitle">Checkbox</h2>
      <Grid container spacing={2}>
        <Grid item lg={6} xs={12}>
          <Card title="basic Checkbox">
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
              classes={{
                root: 'checkboxWrap checkDefault',
                checked: 'checked',
              }}
            />
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              classes={{
                root: 'checkboxWrap checkSuccess',
                checked: 'checked',
              }}
            />
            <Checkbox
              value="checkedC"
              classes={{
                root: 'checkboxWrap checkPrimary',
                checked: 'checked',
              }}
            />
            <Checkbox
              disabled
              value="checkedD"
              classes={{
                root: 'checkboxWrap checkSeconday',
                checked: 'checked',
              }}
            />
            <Checkbox
              disabled
              checked
              value="checkedE"
              classes={{
                root: 'checkboxWrap checkWarning',
                checked: 'checked',
              }}
            />
            <Checkbox
              checked={state.checkedF}
              onChange={handleChange('checkedF')}
              value="checkedF"
              indeterminate
              classes={{
                root: 'checkboxWrap checkDark',
                checked: 'checked',
              }}
            />
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card title="Checkbox With Label">
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    classes={{
                      root: 'checkboxWrap checkSeconday',
                      checked: 'checked',
                    }}
                    checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA"/>
                }
                label="Secondary"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedB}
                    onChange={handleChange('checkedB')}
                    value="checkedB"
                    classes={{
                      root: 'checkboxWrap checkPrimary',
                      checked: 'checked',
                    }}
                  />
                }
                label="Primary"
              />
              <FormControlLabel control={<Checkbox
                classes={{
                  root: 'checkboxWrap checkDefault',
                  checked: 'checked',
                }}
                value="checkedC"/>} label="Uncontrolled"/>
              <FormControlLabel disabled control={<Checkbox value="checkedD"/>} label="Disabled"/>
              <FormControlLabel disabled control={<Checkbox checked value="checkedE"/>} label="Disabled"/>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checkedF}
                    onChange={handleChange('checkedF')}
                    value="checkedF"
                    indeterminate
                  />
                }
                label="Indeterminate"
              />
              <FormControlLabel
                control={<Checkbox
                  classes={{
                    root: 'checkboxWrap checkSuccess',
                    checked: 'checked',
                  }}
                  icon={<FavoriteBorder/>} checkedIcon={<Favorite/>} value="checkedH"/>}
                label="Custom icon"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small"/>}
                    checkedIcon={<CheckBoxIcon fontSize="small"/>}
                    value="checkedI"
                  />
                }
                label="Custom size"
              />
            </FormGroup>
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card title="Radio Button">
            <Radio
              checked={selectedValue === 'a'}
              onChange={radioChangeHandler}
              value="a"
              name="radio-button-demo"
              classes={{
                root: 'radioButton defaultRadioButton',
                checked: 'radioCheckd',
              }}
            />
            <Radio
              checked={selectedValue === 'b'}
              onChange={radioChangeHandler}
              value="b"
              name="radio-button-demo"
              inputProps={{'aria-label': 'B'}}
              classes={{
                root: 'radioButton successRadioButton',
                checked: 'radioCheckd',
              }}
            />
            <Radio
              checked={selectedValue === 'd'}
              onChange={radioChangeHandler}
              value="d"
              color="default"
              name="radio-button-demo"
              inputProps={{'aria-label': 'D'}}
              classes={{
                root: 'radioButton primaryRadioButton',
                checked: 'radioCheckd',
              }}
            />
            <Radio
              checked={selectedValue === 'e'}
              onChange={radioChangeHandler}
              value="e"
              name="radio-button-demo"
              inputProps={{'aria-label': 'E'}}
              classes={{
                root: 'radioButton warningRadioButton',
                checked: 'radioCheckd',
              }}
              icon={<RadioButtonUncheckedIcon fontSize="small"/>}
              checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}
            />
            <Radio
              checked={selectedValue === 'f'}
              onChange={radioChangeHandler}
              value="e"
              name="radio-button-demo"
              inputProps={{'aria-label': 'E'}}
              classes={{
                root: 'radioButton darkRadioButton',
                checked: 'radioCheckd',
              }}
              icon={<RadioButtonUncheckedIcon fontSize="small"/>}
              checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}
            />
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card title="Radio With Label">
            <FormControlLabel
              value="female"
              control={<Radio
                classes={{
                  root: 'radioButton primaryRadioButton',
                  checked: 'radioCheckd',
                }}/>}
              label="Female"
              labelPlacement="start"
            />
            <FormControlLabel
              value="male"
              control={<Radio
                classes={{
                  root: 'radioButton successRadioButton',
                  checked: 'radioCheckd',
                }}/>}
              label="Male"
              labelPlacement="start"
            />
            <FormControlLabel
              value="other"
              control={<Radio
                classes={{
                  root: 'radioButton warningRadioButton',
                  checked: 'radioCheckd',
                }}/>}
              label="Other"
              labelPlacement="start"
            />
            <FormControlLabel
              value="disabled"
              disabled
              control={<Radio
                classes={{
                  root: 'radioButton darkRadioButton',
                  checked: 'radioCheckd',
                }}/>}
              label="(Disabled option)"
              labelPlacement="start"
            />
          </Card>
        </Grid>

        <Grid item lg={6} xs={12}>
          <Card title="Basic Switch">
            <Switch
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
              classes={{
                root: 'switchDefault',
                switchBase: 'switchBase',
                thumb: 'switchThumb',
                track: 'switchTrack',
                checked: 'switchChecked'
              }}
            />
            <Switch
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              classes={{
                root: 'switchSuccess',
                switchBase: 'switchBase',
                thumb: 'switchThumb',
                track: 'switchTrack',
                checked: 'switchChecked'
              }}
            />
            <Switch
              value="checkedC"
              classes={{
                root: 'switchDark',
                switchBase: 'switchBase',
                thumb: 'switchThumb',
                track: 'switchTrack',
                checked: 'switchChecked'
              }}
            />
            <Switch
              disabled
              value="checkedD"
              classes={{
                root: 'switchLight',
                switchBase: 'switchBase',
                thumb: 'switchThumb',
                track: 'switchTrack',
                checked: 'switchChecked'
              }}
            />
            <Switch
              disabled
              checked
              classes={{
                root: 'switchPrimary',
                switchBase: 'switchBase',
                thumb: 'switchThumb',
                track: 'switchTrack',
                checked: 'switchChecked'
              }}
            />
            <Switch
              defaultChecked
              value="checkedF"
              classes={{
                root: 'switchSecondary',
                switchBase: 'switchBase',
                thumb: 'switchThumb',
                track: 'switchTrack',
                checked: 'switchChecked'
              }}
            />
          </Card>
        </Grid>
        <Grid item lg={6} xs={12}>
          <Card title="Switch With Label">
            <FormControlLabel
              control={
                <Switch
                  classes={{
                    root: 'switchDefault',
                    switchBase: 'switchBase',
                    thumb: 'switchThumb',
                    track: 'switchTrack',
                    checked: 'switchChecked'
                  }}
                  checked={state.checkedA}
                  onChange={handleChange('checkedA')}
                  value="checkedA"/>
              }
              label="Default"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  classes={{
                    root: 'switchSuccess',
                    switchBase: 'switchBase',
                    thumb: 'switchThumb',
                    track: 'switchTrack',
                    checked: 'switchChecked'
                  }}
                />
              }
              label="Success"
            />
            <FormControlLabel
              control={<Switch
                value="checkedC"
                classes={{
                  root: 'switchDark',
                  switchBase: 'switchBase',
                  thumb: 'switchThumb',
                  track: 'switchTrack',
                  checked: 'switchChecked'
                }}
              />
              }
              label="Uncontrolled"/>
            <FormControlLabel
              disabled
              control={<Switch
                classes={{
                  root: 'switchLight',
                  switchBase: 'switchBase',
                  thumb: 'switchThumb',
                  track: 'switchTrack',
                  checked: 'switchChecked'
                }}
                value="checkedD"/>
              }
              label="Disabled"/>
            <FormControlLabel
              control={<Switch
                classes={{
                  root: 'switchPrimary',
                  switchBase: 'switchBase',
                  thumb: 'switchThumb',
                  track: 'switchTrack',
                  checked: 'switchChecked'
                }}
                checked
                value="checkedE"/>
              }
              label="Primary"/>
            <FormControlLabel
              control={<Switch
                classes={{
                  root: 'switchSecondary',
                  switchBase: 'switchBase',
                  thumb: 'switchThumb',
                  track: 'switchTrack',
                  checked: 'switchChecked'
                }}
                checked
                value="checkedE"/>
              }
              label="Secondary"/>
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

export default compose(withConnect)(CheckboxComponent);
