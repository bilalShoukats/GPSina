import React from 'react';
import Grid from "@material-ui/core/Grid";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "../../../Card";
import './style.scss'

const features = [
  {
    title: 'Welcome to eagle telematics!',
    color: '#FFFFFF'
  },
  {
    title: 'Car acceleration notification',
    color: '#FFFFFF'
  },
  {
    title: 'Car harsh breaking notification',
    color: '#FFFFFF'
  },
  {
    title: 'Car fence out notification',
    color: '#FFFFFF'
  },
  {
    title: 'Car fence in notification',
    color: '#FFFFFF'
  }
];

const DashboardFeature = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card title="Recent Notifications">
          <Slider
            dots={true}
            infinite={true}
            autoplay={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
          >
            {features.map((item, i) => {
              return (

                <Grid key={i} className="cmfSignle" style={{ background: item.color }}>
                  <p key={i}>{item.title}</p>
                </Grid>

              )
            })}
          </Slider>
        </Card>
      </Grid>
    </Grid>
  )
};

export default DashboardFeature;
