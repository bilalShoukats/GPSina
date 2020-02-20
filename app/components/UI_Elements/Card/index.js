import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Card from 'components/Card/Loadable'

import { compose } from 'redux';

import messages from './messages';
import { Grid } from '@material-ui/core';
import './style.scss'

// images
import img1 from 'images/media/img1.jpg'
import img2 from 'images/media/img2.jpg'
import img3 from 'images/media/img3.jpg'

const ElementCard = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Card</title>
                <meta name="description" content="Description of Card" />
            </Helmet>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h2 className="cardTitle">Card with image</h2>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Grid className="imageCardWrap">
                        <Grid className="CardImg">
                            <img src={img1} alt="" />
                        </Grid>
                        <Grid className="cardContent">
                            <h4>card Title</h4>
                            <p>Dolor sit amet consectetur elit. molestias necessitatibus quae inventore harum perferendis.</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Grid className="imageCardWrap">
                        <Grid className="CardImg">
                            <img src={img2} alt="" />
                        </Grid>
                        <Grid className="cardContent">
                            <h4>card Title</h4>
                            <p>Dolor sit amet consectetur elit. molestias necessitatibus quae inventore harum perferendis.</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <Grid className="imageCardWrap">
                        <Grid className="CardImg">
                            <img src={img3} alt="" />
                        </Grid>
                        <Grid className="cardContent">
                            <h4>card Title</h4>
                            <p>Dolor sit amet consectetur elit. molestias necessitatibus quae inventore harum perferendis.</p>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="card with Title and subtitle"
                        subtitle="input your subTitle"
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore voluptas ipsum, optio totam deserunt corporis necessitatibus corrupti laboriosam doloribus nesciunt. Totam dolor facere quis magnam tenetur molestiae dolorem veritatis. Doloribus dolores facilis blanditiis repellendus eligendi.
                    </Card>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <Card
                        title="card header background "
                        subtitle="Use Card Component with class"
                        classNameText=".headerBackground"
                        className="headerBackground"
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore voluptas ipsum, optio totam deserunt corporis necessitatibus corrupti laboriosam doloribus nesciunt. Totam dolor facere quis magnam tenetur molestiae dolorem veritatis. Doloribus dolores facilis blanditiis repellendus eligendi.
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

export default compose(withConnect)(ElementCard);
