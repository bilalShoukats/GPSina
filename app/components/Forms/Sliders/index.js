import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import messages from './messages';
import Card from 'components/Card/Loadable'
import {Grid, Slider} from '@material-ui/core'
import CustomizedSlider from './components/custom'
import './style.scss'


const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}


const Sliders = () => {
  const [rangeValue, setRangeValue] = React.useState([20, 37]);
  const handleChange = (event, newValue) => {
    setRangeValue(newValue);
  };
  return (
    <Fragment>
      <Helmet>
        <title>Slider</title>
      </Helmet>
      <h2 className="breadcumbTitle">Discrete Slider</h2>
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <Card title="Discrete sliders">
            <Grid className="sliderMain">
              <p> Temperature</p>
              <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
                classes={{
                  root: 'sliderWrapper sliderDefault',
                  thumb: 'sliderThumb',
                  rail: 'sliderRail',
                  mark: 'sliderMask',
                  markActive: 'sliderMaskActive',
                  markLabel: 'sliderMaskLabel',
                  markLabelActive: 'sliderMaskLabelActive',
                  marked: 'sliderMasked',
                  track: 'sliderTrack',
                  valueLabel: 'sliderValueLabel'
                }}
              />
            </Grid>
            <Grid className="sliderMain">
              <p>Small steps</p>
              <Slider
                defaultValue={0.00000005}
                getAriaValueText={valuetext}
                step={0.00000001}
                marks
                min={-0.00000005}
                max={0.0000001}
                valueLabelDisplay="auto"
                classes={{
                  root: 'sliderWrapper sliderSuccess',
                  thumb: 'sliderThumb',
                  rail: 'sliderRail',
                  mark: 'sliderMask',
                  markActive: 'sliderMaskActive',
                  markLabel: 'sliderMaskLabel',
                  markLabelActive: 'sliderMaskLabelActive',
                  marked: 'sliderMasked',
                  track: 'sliderTrack',
                  valueLabel: 'sliderValueLabel'
                }}
              />
            </Grid>
            <Grid className="sliderMain">
              <p>Custom marks</p>
              <Slider
                defaultValue={20}
                getAriaValueText={valuetext}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
                classes={{
                  root: 'sliderWrapper sliderPrimary',
                  thumb: 'sliderThumb',
                  rail: 'sliderRail',
                  mark: 'sliderMask',
                  markActive: 'sliderMaskActive',
                  markLabel: 'sliderMaskLabel',
                  markLabelActive: 'sliderMaskLabelActive',
                  marked: 'sliderMasked',
                  track: 'sliderTrack',
                  valueLabel: 'sliderValueLabel'
                }}
              />
            </Grid>
            <Grid className="sliderMain">
              <p> Restricted values </p>
              <Slider
                defaultValue={20}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
                classes={{
                  root: 'sliderWrapper sliderSecondary',
                  thumb: 'sliderThumb',
                  rail: 'sliderRail',
                  mark: 'sliderMask',
                  markActive: 'sliderMaskActive',
                  markLabel: 'sliderMaskLabel',
                  markLabelActive: 'sliderMaskLabelActive',
                  marked: 'sliderMasked',
                  track: 'sliderTrack',
                  valueLabel: 'sliderValueLabel'
                }}
              />
            </Grid>
            <Grid className="sliderMain">
              <p> Always visiblep </p>
              <Slider
                defaultValue={80}
                getAriaValueText={valuetext}
                step={10}
                marks={marks}
                valueLabelDisplay="on"
                classes={{
                  root: 'sliderWrapper sliderInfo',
                  thumb: 'sliderThumb',
                  rail: 'sliderRail',
                  mark: 'sliderMask',
                  markActive: 'sliderMaskActive',
                  markLabel: 'sliderMaskLabel',
                  markLabelActive: 'sliderMaskLabelActive',
                  marked: 'sliderMasked',
                  track: 'sliderTrack',
                  valueLabel: 'sliderValueLabel'
                }}
              />
            </Grid>
            <Grid className="sliderMain">
              <p>Range Slider</p>
              <Slider
                value={rangeValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                classes={{
                  root: 'sliderWrapper sliderDark',
                  thumb: 'sliderThumb',
                  rail: 'sliderRail',
                  mark: 'sliderMask',
                  markActive: 'sliderMaskActive',
                  markLabel: 'sliderMaskLabel',
                  markLabelActive: 'sliderMaskLabelActive',
                  marked: 'sliderMasked',
                  track: 'sliderTrack',
                  valueLabel: 'sliderValueLabel'
                }}
              />
            </Grid>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card title="Customized sliders">
            <CustomizedSlider/>
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

export default compose(withConnect)(Sliders);
