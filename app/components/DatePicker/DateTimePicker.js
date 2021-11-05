import * as React from 'react';
import DateTimePicker from 'react-datetime-picker';

export default function BasicDateTimePicker(props) {
  const [value, onChange] = React.useState(new Date());

  return (
    <div className="Sample__container">
      <main className="Sample__container__content">
        <DateTimePicker
          dayAriaLabel="Day"
          mode={props.mode}
          type={props.type}
          maxDetail="second"
          value={props.value}
          style={{ width: '20%' }}
          hourAriaLabel="Hour"
          yearAriaLabel="Year"
          monthAriaLabel="Month"
          secondAriaLabel="Second"
          minuteAriaLabel="Minute"
          amPmAriaLabel="Select AM/PM"
          clearAriaLabel="Clear value"
          calendarAriaLabel="Toggle calendar"
          nativeInputAriaLabel="Date and time"
          onChange={props.onChange && props.onChange}
        />
      </main>
    </div>
  );
}
