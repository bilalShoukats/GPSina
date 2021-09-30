import React from 'react';
const Car = props => {
    return (
        <img
            alt="car"
            width={props.width}
            height={props.height}
            lat={props.lat}
            lng={props.lng}
            style={{ position: 'absolute', top: '-9px' }}
            src={require('../../../assets/images/icons/car_green.png')}
        />
    );
};
export default Car;
