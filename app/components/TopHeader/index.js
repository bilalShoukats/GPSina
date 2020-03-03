import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import cookie from 'js-cookie';
import { NavLink, Link } from 'react-router-dom';
import {
  Grid,
  Menu,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import ScrollArea from 'react-scrollbar';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { changeLocale } from 'containers/LanguageProvider/actions';
import messages from 'components/SidebarNav/messages';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHeader from 'components/Header/selectors';
import reducer from 'components/Header/reducer';
import './style.scss';

// images
import mail from 'images/icons/mail.svg';
import notification from 'images/icons/notification.svg';
import fullScreen from 'images/icons/full-screen.svg';
// import logo from 'images/logo2.png';

import ana from 'images/icons/sidebar/dashboard/ana.svg';
import anaH from 'images/icons/sidebar/dashboard/ana-h.svg';
import ui from 'images/icons/sidebar/ui.svg';
import uiH from 'images/icons/sidebar/ui-h.svg';
import form from 'images/icons/sidebar/form.svg';
import formH from 'images/icons/sidebar/form-h.svg';
import pricing from 'images/icons/sidebar/new/pricing.svg';
import pricingH from 'images/icons/sidebar/new/pricing-h.svg';
import fontawesome from 'images/icons/sidebar/new/fontawesome.svg';
import fontawesomeH from 'images/icons/sidebar/new/fontawesome-h.svg';

const notfications = [
  {
    title: 'omnis iste error sit',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'will be distracted',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'established fact that',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'reader will be',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'voluptas sit aspernatur aut',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'will be distracted',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'established fact that',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'reader will be',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'voluptas sit aspernatur aut',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'will be distracted',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'established fact that',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
  {
    title: 'reader will be',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit',
  },
];

const TopHeader = props => {
  const [openMessage, setOpenMessage] = useState(null);
  const [openNotification, setOpenNotification] = useState(null);
  const [responsive, setResponsive] = useState(false);
  const handleClick = event => {
    setOpenMessage(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMessage(null);
  };
  const handleClickNotification = event => {
    setOpenNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const onChangeLocale = locale => {
    cookie.set('ammei_lang', locale);
    props.changeLocale(locale);
  };

  const navigations = [
    {
      name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
      icon: ana,
      iconHover: anaH,
      id: 11031,
      menus: [
        {
          name: `${props.intl.formatMessage({ ...messages.DashboardScreen })}`,
          link: '/dashboard',
          id: 5968568
        },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.Cryptocurrency })}`,
        //   link: '/cryptocurrency',
        //   id: 54684684684
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.BankingSystem })}`,
        //   link: '/banking-system',
        //   id: 546852586
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.Crm })}`,
        //   link: '/crm',
        //   id: 546852588
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.Ecommerce })}`,
        //   link: '/ecommerce',
        //   id: 5468525881
        // },
      ],
    },

    // {
    //   name: 'Apps',
    //   icon: ana,
    //   iconHover: anaH,
    //   id: 88854,
    //   menus: [
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.forums })}`,
    //       link: '/forums',
    //       id: 59681445745,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.contactlist })}`,
    //       link: '/contact-list',
    //       id: 181058459,
    //       color:
    //         'linear-gradient(rgb(209, 122, 255) 0%, rgb(129, 109, 255) 100%)',
    //       value: '65',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.scrumbord })}`,
    //       link: '/scrumbord',
    //       id: 2720484,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.todo })}`,
    //       link: '/todo',
    //       id: 4986596,
    //       color:
    //         'linear-gradient(rgb(151, 149, 231) 0%, rgb(84, 78, 250) 100%)',
    //       value: '65',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.chat })}`,
    //       link: '/chat',
    //       id: 482,
    //       color:
    //         'linear-gradient(rgb(255, 209, 238) -35.41%, rgb(255, 107, 175) 84.45%)',
    //       value: '30',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.invoice })}`,
    //       link: '/invoice',
    //       id: 896542424,
    //       color:
    //         'linear-gradient(173.78deg, rgb(45, 255, 227) -31.46%, rgb(67, 206, 75) 90.39%)',
    //       value: '100',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.inbox })}`,
    //       link: '/inbox',
    //       id: 856324157852014,
    //       color:
    //         'linear-gradient(rgb(0, 238, 255) -36.33%, rgb(104, 41, 231) 142.87%)',
    //       value: '35',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.eventcalendar })}`,
    //       link: '/event-calendar',
    //       id: 58757452873457382,
    //     },
    //   ],
    // },
    // {
    //   name: `${props.intl.formatMessage({ ...messages.UIComponents })}`,
    //   id: 41728,
    //   icon: ui,
    //   iconHover: uiH,
    //   menus: [
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.UI })}`,
    //       id: 24787,
    //       submenus: [
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.Buttons })}`,
    //           link: '/buttons',
    //           id: 7898,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.alerts })}`,
    //           link: '/alerts',
    //           id: 60721,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.dropdowns })}`,
    //           link: '/dropdowns',
    //           id: 55485,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.grids })}`,
    //           link: '/grids',
    //           id: 98061,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.modals })}`,
    //           link: '/modals',
    //           id: 13755,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.tooltios })}`,
    //           link: '/tooltios',
    //           id: 33027,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.preloaders })}`,
    //           link: '/preloaders',
    //           id: 46396,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.sweetalert })}`,
    //           link: '/sweet-alert',
    //           id: 95359,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.tabs })}`,
    //           link: '/tabs',
    //           id: 88531,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.typography })}`,
    //           link: '/typography',
    //           id: 36951,
    //         },
    //         {
    //           name: 'texteditor',
    //           link: '/texteditor',
    //           id: 74096,
    //         },
    //       ],
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.Maps })}`,
    //       id: 40968,
    //       submenus: [
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.googlemap })}`,
    //           link: '/google-map',
    //           id: 14102,
    //         },
    //         {
    //           name: 'vector map',
    //           link: '/vector-map',
    //           id: 14102,
    //         },
    //       ],
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.Charts })}`,
    //       id: 51089,
    //       submenus: [
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.chartjs })}`,
    //           link: '/chart-js',
    //           id: 70862,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.reactvis })}`,
    //           link: '/reactvis-chart',
    //           id: 78948,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.rechart })}`,
    //           link: '/rechart',
    //           id: 14736,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.highcharts })}`,
    //           link: '/highcharts',
    //           id: 11183,
    //         },
    //         {
    //           name: 'Apex Chart',
    //           link: '/apex',
    //           id: 7754568,
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      name: `${props.intl.formatMessage({ ...messages.Company })}`,
      icon: pricing,
      iconHover: pricingH,
      id: 5464145555522,
      menus: [
        {
          name: `${props.intl.formatMessage({ ...messages.AddCompanyScreen })}`,
          link: '/addCompany',
          id: 2586584214528525
        },
        {
          name: `${props.intl.formatMessage({ ...messages.ViewCompaniesScreen })}`,
          link: '/viewCompanies',
          id: 7456832452412,
        },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.lockscreen })}`,
        //   link: '/lock-screen',
        //   id: 411242585693241,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.mediagallary })}`,
        //   link: '/media-gallary',
        //   id: 4144525885,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.logviewer })}`,
        //   link: '/log-viewer',
        //   id: 8558241442,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.profile })}`,
        //   link: '/profile',
        //   id: 5886852541,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.searchresult })}`,
        //   link: '/search-result',
        //   id: 445421353,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.sectiontimeout })}`,
        //   link: '/section-timeout',
        //   id: 986542124,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.timeline })}`,
        //   link: '/timeline',
        //   id: 68532452,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.blogs })}`,
        //   link: '/blogs',
        //   id: 685835624,
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.signup })}`,
        //   link: '/signup',
        //   id: 868352504,
        // },
        // {
        //   name: 'Login',
        //   link: '/',
        //   id: 474525252,
        // },
        // {
        //   name: '404',
        //   link: '/404',
        //   id: 7858225,
        // },
        // {
        //   name: '505',
        //   link: '/505',
        //   id: 458585,
        // },
      ],
    },
    {
      name: `${props.intl.formatMessage({ ...messages.Users })}`,
      icon: pricing,
      iconHover: pricingH,
      id: 12,
      menus: [
        {
          name: `${props.intl.formatMessage({ ...messages.AddUserScreen })}`,
          link: '/addUser',
          id: 121,
        },
        {
          name: `${props.intl.formatMessage({ ...messages.ViewUsersScreen })}`,
          link: '/viewUsers',
          id: 122,
        },
      ],
    },
    {
      name: `${props.intl.formatMessage({ ...messages.Drivers })}`,
      icon: pricing,
      iconHover: pricingH,
      id: 13,
      menus: [
        {
          name: `${props.intl.formatMessage({ ...messages.AddDriverscreen })}`,
          link: '/addDriver',
          id: 131,
        },
        {
          name: `${props.intl.formatMessage({ ...messages.ViewDriversScreen })}`,
          link: '/viewDrivers',
          id: 132,
        },
      ],
    },
    {
      name: `${props.intl.formatMessage({ ...messages.Vehicle })}`,
      icon: pricing,
      iconHover: pricingH,
      id: 22,
      menus: [
        {
          name: `${props.intl.formatMessage({ ...messages.AddVehicleScreen })}`,
          link: '/addVehicle',
          id: 221,
        },
        {
          name: `${props.intl.formatMessage({ ...messages.ViewVehiclesScreen })}`,
          link: '/viewVehicles',
          id: 222,
        },
      ],
    },
    {
      name: `${props.intl.formatMessage({ ...messages.Route })}`,
      icon: pricing,
      iconHover: pricingH,
      id: 32,
      menus: [
        {
          name: `${props.intl.formatMessage({ ...messages.AddRouteScreen })}`,
          link: '/addRoute',
          id: 321,
        },
        {
          name: `${props.intl.formatMessage({ ...messages.ViewRoutesScreen })}`,
          link: '/viewRoutes',
          id: 322,
        },
      ],
    },
    // {
    //   name: 'Forums & Tables',
    //   id: 70153,
    //   icon: form,
    //   iconHover: formH,
    //   menus: [
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.Forms })}`,
    //       id: 52262,
    //       submenus: [
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.inputfild })}`,
    //           link: '/inputfild',
    //           id: 98923,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.checkbox })}`,
    //           link: '/checkbox',
    //           id: 6857,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.fileupload })}`,
    //           link: '/file-upload',
    //           id: 56770,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.selectinput })}`,
    //           link: '/select-input',
    //           id: 16848,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({
    //             ...messages.discreteslider,
    //           })}`,
    //           link: '/discrete-slider',
    //           id: 801,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.datepicker })}`,
    //           link: '/date-picker',
    //           id: 7585,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.transferfile })}`,
    //           link: '/transferfile',
    //           id: 88241,
    //         },
    //       ],
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.Tables })}`,
    //       id: 90074,
    //       submenus: [
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.basictable })}`,
    //           link: '/basic-table',
    //           id: 48107,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({
    //             ...messages.editabletable,
    //           })}`,
    //           link: '/editable-table',
    //           id: 96622,
    //         },
    //         {
    //           name: `${props.intl.formatMessage({
    //             ...messages.materialtable,
    //           })}`,
    //           link: '/material-table',
    //           id: 31083,
    //         },
    //       ],
    //     },
    //   ],
    // },
    // {
    //   name: `${props.intl.formatMessage({ ...messages.Icons })}`,
    //   id: 92394,
    //   icon: fontawesome,
    //   iconHover: fontawesomeH,
    //   menus: [
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.fontawesome })}`,
    //       link: '/fontawesome',
    //       id: 58482586584214528525,
    //     },
    //     {
    //       name: 'Themify',
    //       link: '/themify',
    //       id: 745683244545252412,
    //     },
    //     {
    //       name: 'Pixeden Icons',
    //       link: '/pixeden',
    //       id: 411242548565885693241,
    //     },
    //     {
    //       name: 'Icofont',
    //       link: '/icofont',
    //       id: 41447587586525885,
    //     },
    //   ],
    // },
    // {
    //   name: 'Pages',
    //   icon: pricing,
    //   iconHover: pricingH,
    //   id: 9239448445,
    //   menus: [
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.pricingtable })}`,
    //       link: '/pricing-table',
    //       id: 2586584214528525,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.lockscreen })}`,
    //       link: '/lock-screen',
    //       id: 411242585693241,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.mediagallary })}`,
    //       link: '/media-gallary',
    //       id: 4144525885,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.logviewer })}`,
    //       link: '/log-viewer',
    //       id: 8558241442,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.searchresult })}`,
    //       link: '/search-result',
    //       id: 445421353,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.profile })}`,
    //       link: '/profile',
    //       id: 5886852541,
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.signup })}`,
    //       link: '/signup',
    //       id: 868352504,
    //     },
    //     {
    //       name: 'Login',
    //       link: '/',
    //       id: 474525252,
    //     },
    //     {
    //       name: '404',
    //       link: '/404',
    //       id: 7858225,
    //     },
    //     {
    //       name: '505',
    //       link: '/505',
    //       id: 458585,
    //     },
    //   ],
    // },
  ];

  return (
    <header className="topBaHeaderArea">
      <Grid container alignItems="center">
        <Grid item className="topmenuLogo" xl={2} lg={2} sm={6} xs={12}>
          <NavLink to="/">
            {/* <img className="normal" src={logo} alt=""/> */}
          </NavLink>
        </Grid>
        <Grid
          className={
            responsive ? 'responsiveMenuWrap active' : 'responsiveMenuWrap'
          }
          item
          xl={7}
          lg={7}
        >
          <ul className="topBarMenuWrap">
            {navigations.map((nav, i) => (
              <li className="menuItem" key={i}>
                <span>{nav.name}</span>
                {nav.menus && (
                  <ul className="submenuItems">
                    {nav.menus.map((sub, i) => (
                      <li key={i}>
                        {sub.submenus ? (
                          <span>
                            {sub.name} <i className="fa fa-angle-right" />
                          </span>
                        ) : (
                            <NavLink activeClassName="active" to={sub.link}>
                              {sub.name}
                            </NavLink>
                          )}
                        {sub.submenus && (
                          <ul className="submenuItemsstepThree">
                            {sub.submenus.map((item, i) => (
                              <li key={i}>
                                <NavLink
                                  activeClassName="active"
                                  to={item.link}
                                >
                                  {item.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xl={3} lg={3} md={5} sm={5} xs={10}>
          <ul className="headerRight">
            <li onClick={handleClick} className="messageWrap">
              <span className="wrapper">
                <img src={mail} alt="" />
                <span className="value">{notfications.length}</span>
              </span>
            </li>
            <li onClick={handleClickNotification} className="notificationWrap">
              <span className="wrapper">
                <img src={notification} alt="" />
                <span className="push" />
              </span>
            </li>
            <li onClick={props.fullScreenHandler} className="fullScreenWrap">
              <img src={fullScreen} alt="" />
            </li>
          </ul>
          <Menu
            anchorEl={openMessage}
            keepMounted
            open={Boolean(openMessage)}
            onClose={handleClose}
            elevation={1}
            getContentAnchorEl={null}
            className="notificationWrapper"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            classes={{
              paper: 'notificationPaper',
              list: 'notificationList',
            }}
          >
            <li className="notificationList">
              <h5>
                Messages
                <span>clear all</span>
              </h5>
              <ScrollArea
                speed={1}
                className="scrollbarArea"
                contentClassName="scrollbarContent"
                horizontal={false}
              >
                <ul className="notificationItems">
                  {notfications.map((item, i) => (
                    <li key={i}>
                      <Button component={Link} to="/">
                        <i className="icon">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="envelope"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="svg-inline--fa fa-envelope fa-w-16 fa-fw"
                          >
                            <path
                              fill="currentColor"
                              d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z"
                            />
                          </svg>
                        </i>
                        {item.title}
                        <span>{item.text}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <Button className="seeAll" component={Link} to="/">
                see all
              </Button>
            </li>
          </Menu>

          <Menu
            anchorEl={openNotification}
            keepMounted
            open={Boolean(openNotification)}
            onClose={handleCloseNotification}
            elevation={1}
            getContentAnchorEl={null}
            className="notificationWrapper"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            classes={{
              paper: 'notificationPaper',
              list: 'notificationList',
            }}
          >
            <li className="notificationList">
              <h5>
                Notification
                <span>clear all</span>
              </h5>
              <ScrollArea
                speed={1}
                className="scrollbarArea"
                contentClassName="scrollbarContent"
                horizontal={false}
              >
                <ul className="notificationItems">
                  {notfications.map((item, i) => (
                    <li key={i}>
                      <Button component={Link} to="/">
                        <i className="icon">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fal"
                            data-icon="bell"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="svg-inline--fa fa-bell fa-w-14 fa-fw"
                          >
                            <path
                              fill="currentColor"
                              d="M224 480c-17.66 0-32-14.38-32-32.03h-32c0 35.31 28.72 64.03 64 64.03s64-28.72 64-64.03h-32c0 17.65-14.34 32.03-32 32.03zm209.38-145.19c-27.96-26.62-49.34-54.48-49.34-148.91 0-79.59-63.39-144.5-144.04-152.35V16c0-8.84-7.16-16-16-16s-16 7.16-16 16v17.56C127.35 41.41 63.96 106.31 63.96 185.9c0 94.42-21.39 122.29-49.35 148.91-13.97 13.3-18.38 33.41-11.25 51.23C10.64 404.24 28.16 416 48 416h352c19.84 0 37.36-11.77 44.64-29.97 7.13-17.82 2.71-37.92-11.26-51.22zM400 384H48c-14.23 0-21.34-16.47-11.32-26.01 34.86-33.19 59.28-70.34 59.28-172.08C95.96 118.53 153.23 64 224 64c70.76 0 128.04 54.52 128.04 121.9 0 101.35 24.21 138.7 59.28 172.08C421.38 367.57 414.17 384 400 384z"
                            />
                          </svg>
                        </i>
                        {item.title}
                        <span>{item.text}</span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <Button className="seeAll" component={Link} to="/">
                see all
              </Button>
            </li>
          </Menu>
        </Grid>
        <Grid className="responsivemenuTriggerWrap" item sm={1} xs={2}>
          <ul
            onClick={() => setResponsive(!responsive)}
            className="responsivemenuTrigger"
          >
            <li className="first" />
            <li className="second" />
            <li className="third" />
          </ul>
        </Grid>
      </Grid>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(changeLocale(locale)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(TopHeader));
