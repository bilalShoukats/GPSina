import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

// import './simpleRange.less';

const now = new Date();
const yesterdayBegin = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 1,
);
const todayNoon = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  12,
);

export default function Sample(props) {
  const [value, onChange] = useState([yesterdayBegin, todayNoon]);

  return (
    <div className="Sample">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <DateTimeRangePicker
            className={props.className}
            onChange={props.onChange}
            value={props.value}
          />
        </main>
      </div>
    </div>
  );
}
