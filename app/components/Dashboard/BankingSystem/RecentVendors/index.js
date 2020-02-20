import React from 'react';
import Card from "../../../Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddNewVendor from "./AddNewVendor";
import SendMoney from "./SendMoney";
import RequestMoney from "./RequestMoney";

import img1 from '../../../../images/vendors/img1.jpg';
import img2 from '../../../../images/vendors/img2.jpg';
import img3 from '../../../../images/vendors/img3.jpg';
import img4 from '../../../../images/vendors/img4.jpg';

import './style.scss';

const vendors = [
  {
    id: 1,
    name: 'Wiliam Davis',
    image: img1,
  },
  {
    id: 2,
    name: 'Cody Thibeault',
    image: img2,
  },
  {
    id: 3,
    name: 'Sue Molloy',
    image: img3,
  },
  {
    id: 4,
    name: 'Eloise Reinke',
    image: img4,
  },
];

const RecentVendors = () => {
  const [open, setOpen] = React.useState(false);
  const [sendMoneyOpen, setSendMoneyOpen] = React.useState(false);
  const [requestMoneyOpen, setRequestMoneyOpen] = React.useState(false);

  const toggleModal = (data) => {
    setOpen(data);
  };

  function submittedData(data) {
    const newvendor = {
      id: vendors.length + 1,
      name: data.name,
      image: img4,
    };
    vendors.unshift(newvendor);
    console.log(vendors);
    setOpen(false)
  }

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Card title="Recent Vendors">
      <Grid className="vendorsLists">
        <Slider {...settings}>
          {vendors.map(item => {
            return (
              <Grid key={item.id} className="singleVendor">
                <Grid className="singleInner">
                  <Grid className="thumb">
                    <img src={item.image} alt="vendor thumb"/>
                  </Grid>
                  <h4>{item.name}</h4>
                </Grid>
              </Grid>
            )
          })}
        </Slider>
      </Grid>
      <Button fullWidth onClick={() => toggleModal(true)} className="cBtn cBtnPrimary">Add New Vendors</Button>
      <Grid container spacing={3} className="mt-20">
        <Grid item sm={6} xs={12}>
          <Button onClick={() => setSendMoneyOpen(true)} fullWidth className="cBtn cBtnTheme">Send Money</Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button onClick={() => setRequestMoneyOpen(true)} fullWidth className="cBtn cBtnDanger">Request Money</Button>
        </Grid>
      </Grid>
      <AddNewVendor open={open} toggleModal={toggleModal} submittedData={submittedData}/>
      <SendMoney open={sendMoneyOpen} toggleModal={setSendMoneyOpen}/>
      <RequestMoney open={requestMoneyOpen} toggleModal={setRequestMoneyOpen}/>
    </Card>
  )
};

export default RecentVendors;
