import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import Card from 'components/Card/Loadable'
import { Grid } from '@material-ui/core';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss'

const Carousel = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Carousel</title>
                <meta name="description" content="Description of Carousel" />
            </Helmet>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card
                        title="Single Items"
                    >
                        <Slider
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={1}
                            slidesToScroll={1}
                        >
                            <div className="slider">
                                <h3>1</h3>
                            </div>
                            <div className="slider">
                                <h3>2</h3>
                            </div>
                        </Slider>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card
                        title="Multiple items"
                    >
                        <Slider
                            dots={true}
                            infinite={true}
                            speed={500}
                            slidesToShow={3}
                            slidesToScroll={1}
                        >
                            <div className="slider">
                                <h3>1</h3>
                            </div>
                            <div className="slider">
                                <h3>2</h3>
                            </div>
                            <div className="slider">
                                <h3>3</h3>
                            </div>
                            <div className="slider">
                                <h3>4</h3>
                            </div>
                        </Slider>
                    </Card>
                </Grid>
            </Grid>

        </Fragment >
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

export default compose(withConnect)(Carousel);
