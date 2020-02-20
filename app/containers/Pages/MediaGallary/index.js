import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import messages from './messages';
import Lightbox from 'react-image-lightbox';
import { Grid, Button } from '@material-ui/core'
import 'react-image-lightbox/style.css';
import './style.scss'

import image1 from 'images/media/img1.jpg'
import image2 from 'images/media/img2.jpg'
import image3 from 'images/media/img3.jpg'
import image4 from 'images/media/img4.jpg'
import image5 from 'images/media/img5.jpg'
import image6 from 'images/media/img6.jpg'
import image7 from 'images/media/img7.jpg'
import image8 from 'images/media/img8.jpg'
import image9 from 'images/media/img9.jpg'
import image10 from 'images/media/img10.jpg'
import image11 from 'images/media/img11.jpg'
import image12 from 'images/media/img12.jpg'

const gallarys = [
    { title: 'media Title', value: '1500', image: image1, id: 1 },
    { title: 'media Title', value: '1500', image: image2, id: 2 },
    { title: 'media Title', value: '1500', image: image3, id: 3 },
    { title: 'media Title', value: '1500', image: image4, id: 4 },
    { title: 'media Title', value: '1500', image: image5, id: 5 },
    { title: 'media Title', value: '1500', image: image6, id: 6 },
    { title: 'media Title', value: '1500', image: image7, id: 7 },
    { title: 'media Title', value: '1500', image: image8, id: 8 },
    { title: 'media Title', value: '1500', image: image9, id: 9 },
    { title: 'media Title', value: '1500', image: image10, id: 10 },
    { title: 'media Title', value: '1500', image: image11, id: 11 },
    { title: 'media Title', value: '1500', image: image12, id: 12 },
]

const MediaGallary = () => {
    const [isOpen, setOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    const onOpenHandler = (id) => {
        setOpen(true);
        setPhotoIndex(id - 1);
    }

    return (
        <Fragment>
            <Helmet>
                <title>Media Gallary</title>
                <meta name="description" content="Description of MediaGallary" />
            </Helmet>
            <h2 className="breadcumbTitle">Media Gallary</h2>
            <Grid container spacing={3}>
                {gallarys.map((item, i) => (
                    <Grid key={i} item xl={3} lg={4} sm={6} xs={12}>
                        <Grid className="mediaWrapper">
                            <Grid className="mediaImages">
                                <img src={item.image} alt="" />
                                <Button onClick={() => onOpenHandler(item.id)}><i className="fa fa-link"></i></Button>
                            </Grid>
                            <Grid className="mediaContent">
                                <h4>{item.title}</h4>
                                <span>{item.value}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
                {isOpen && (
                    <Lightbox
                        mainSrc={gallarys[photoIndex].image}
                        nextSrc={gallarys[(photoIndex + 1) % gallarys.length].image}
                        prevSrc={gallarys[(photoIndex + gallarys.length - 1) % gallarys.length].image}
                        onCloseRequest={() => setOpen(false)}
                        onMovePrevRequest={() => setPhotoIndex((photoIndex + gallarys.length - 1) % gallarys.length)}
                        onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % gallarys.length)}
                    />
                )}
            </Grid>
        </Fragment >
    )
}

export default MediaGallary;
