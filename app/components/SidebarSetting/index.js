import React, { useState } from 'react';
import { Grid, Button, FormControlLabel, Switch } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ScrollArea from 'react-scrollbar';
import './style.scss';

// images
import cryptocurrency from 'images/demo/cryptocurrency.jpg';
import ecommerce from 'images/demo/ecommerce.jpg';
import crm from 'images/demo/crm.jpg';
import bankingsystem from 'images/demo/banking-system.jpg';
import sidenavBg from 'images/sidenav-bg.jpg'

const demos = [
  {
    name: 'Cryptocurrency',
    link: '/cryptocurrency',
    image: cryptocurrency,
    id: 2,
  },
  {
    name: 'Ecommerce',
    link: '/ecommerce',
    image: ecommerce,
    id: 3,
  },
  {
    name: 'CRM',
    link: '/crm',
    image: crm,
    id: 4,
  },
  {
    name: 'Banking System',
    link: '/banking-system',
    image: bankingsystem,
    id: 5,
  },
];

const SidebarSetting = ({
  open,
  setSidebarSetting,
  collapsable_menu,
  top_menu,
  squared_card,
  block_shadow,
  handleChange,
}) => (
    <Grid className={open ? 'sidebarSettingWrap open' : 'sidebarSettingWrap'}
      style={{ background: `url(${sidenavBg}) center/cover repeat` }}>
      <Button
        disableTouchRipple
        onClick={() => setSidebarSetting(false)}
        className="closeBtn">
        <i className="icofont-close-line"></i>
      </Button>
      <h2>Theme Customizer</h2>
      <p>This customizer allows you to see the different variations of the EasyDev. Create your own visual style for every
      project you do!</p>
      <ul className="colupsSidebarMenu">
        <li>
          <FormControlLabel
            className="switchStyle"
            control={<Switch
              className="switch"
              checked={collapsable_menu}
              onChange={handleChange('collapsable_menu')} value='collapsable_menu'
            />}
            label="Collapsed Menu"
          />
        </li>
        <li>
          <FormControlLabel
            className="switchStyle"
            control={<Switch
              className="switch"
              checked={top_menu}
              onChange={handleChange('top_menu')} value='top_menu'
            />}
            label="Top Menu"
          />
        </li>
        <li>
          <FormControlLabel
            className="switchStyle"
            control={<Switch
              className="switch"
              checked={squared_card}
              onChange={handleChange('squared_card')} value='squared_card'
            />}
            label="Squared Card Box"
          />
        </li>
        <li>
          <FormControlLabel
            className="switchStyle"
            control={<Switch
              className="switch"
              checked={block_shadow}
              onChange={handleChange('block_shadow')} value='block_shadow'
            />}
            label="Block's Shadows"
          />
        </li>
      </ul>
      <div className="settingSidebarDemo">
        <h3>Layouts</h3>
        <ScrollArea
          speed={1}
          className="settingScrollbar"
          contentClassName="scrollbarContent"
          horizontal={false}
        >
          <ul className="demoLinks">
            {demos.map((item, i) => (
              <li key={i}>
                <Link to={item.link}>
                  <h4>{item.name}</h4>
                  <img src={item.image} alt="" />
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </Grid>
  )

export default SidebarSetting;
