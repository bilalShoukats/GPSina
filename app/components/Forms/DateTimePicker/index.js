import React, {Fragment, useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider, KeyboardTimePicker} from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import Card from 'components/Card/Loadable'
import {Grid,} from '@material-ui/core'

const DateTimePicker = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <h2 className="breadcumbTitle">Date picker</h2>
      <Grid container spacing={3}>
        <Grid item xl={6} xs={12}>
          <Card
            className="datePickerWrapper"
            title="date picker"
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    fullWidth
                    value={selectedDate}
                    placeholder="10/10/2018"
                    inputVariant="outlined"
                    onChange={date => handleDateChange(date)}
                    minDate={new Date()}
                    format="MM-DD-YYYY"
                    InputAdornmentProps={{position: "end"}}
                    className="datePicker"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    fullWidth
                    value={selectedDate}
                    inputVariant="outlined"
                    placeholder="10/10/2018"
                    onChange={date => handleDateChange(date)}
                    minDate={new Date()}
                    format="MM-DD-YYYY"
                    InputAdornmentProps={{position: "end"}}
                    className="datePicker"
                    autoOk={true}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            className="datePickerWrapper"
            title="Time picker"
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <KeyboardTimePicker
                    label="Masked timepicker"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    fullWidth
                    value={selectedDate}
                    inputVariant="outlined"
                    InputAdornmentProps={{position: "end"}}
                    onChange={date => handleDateChange(date)}
                    className="datePicker"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <KeyboardTimePicker
                    label="Masked timepicker"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    fullWidth
                    value={selectedDate}
                    inputVariant="outlined"
                    InputAdornmentProps={{position: "end"}}
                    onChange={date => handleDateChange(date)}
                    className="datePicker"
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            className="datePickerWrapper"
            title="date picker Static Mode"
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    fullWidth
                    value={selectedDate}
                    placeholder="10/10/2018"
                    variant="inline"
                    inputVariant="outlined"
                    onChange={date => handleDateChange(date)}
                    minDate={new Date()}
                    format="MM-DD-YYYY"
                    InputAdornmentProps={{position: "end"}}
                    className="datePicker"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    fullWidth
                    value={selectedDate}
                    variant="inline"
                    inputVariant="outlined"
                    placeholder="10/10/2018"
                    onChange={date => handleDateChange(date)}
                    minDate={new Date()}
                    format="MM-DD-YYYY"
                    InputAdornmentProps={{position: "end"}}
                    className="datePicker"
                    autoOk={true}
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Card>
        </Grid>
        <Grid item xl={6} xs={12}>
          <Card
            className="datePickerWrapper"
            title="Time picker Static Mode"
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <KeyboardTimePicker
                    label="Masked timepicker"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    fullWidth
                    value={selectedDate}
                    variant="inline"
                    inputVariant="outlined"
                    InputAdornmentProps={{position: "end"}}
                    onChange={date => handleDateChange(date)}
                    className="datePicker"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <KeyboardTimePicker
                    label="Masked timepicker"
                    placeholder="08:00 AM"
                    mask="__:__ _M"
                    fullWidth
                    value={selectedDate}
                    variant="inline"
                    inputVariant="outlined"
                    InputAdornmentProps={{position: "end"}}
                    onChange={date => handleDateChange(date)}
                    className="datePicker"
                  />
                </Grid>
              </Grid>
            </MuiPickersUtilsProvider>
          </Card>
        </Grid>
      </Grid>

    </Fragment>
  );
}

export default DateTimePicker;
