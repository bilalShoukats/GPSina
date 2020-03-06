import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary
} from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import './style.scss';

// images
import ana from 'images/icons/sidebar/dashboard/ana.svg'
import anaH from 'images/icons/sidebar/dashboard/ana-h.svg'
import ui from 'images/icons/sidebar/ui.svg'
import uiH from 'images/icons/sidebar/ui-h.svg'
import form from 'images/icons/sidebar/form.svg'
import formH from 'images/icons/sidebar/form-h.svg'
import table from 'images/icons/sidebar/table.svg'
import tableH from 'images/icons/sidebar/table-h.svg'
import pricing from 'images/icons/sidebar/new/pricing.svg'
import pricingH from 'images/icons/sidebar/new/pricing-h.svg'
import fontawesome from 'images/icons/sidebar/new/fontawesome.svg'
import fontawesomeH from 'images/icons/sidebar/new/fontawesome-h.svg'
import logo from 'images/logo.png'
import smallLogo from 'images/small-logo.png'
import sidenavBg from 'images/sidenav-bg.jpg'
import { Manager } from '../../StorageManager/Storage'
import messages from './messages';

const SidebarNav = props => {
  // let user = Manager.getItem('user', true);
  // console.log('propsssss', user.email)

  const navigations = [
    {
      // name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
      icon: ana,
      iconHover: anaH,
      // id: 11031,
      alwaysexpand: true,
      menus: [
        {
          icon: ana,
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
      ]
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
      icon: ana,
      iconHover: anaH,
      // id: 11031,
      alwaysexpand: true,
      menus: [
        {
          icon: ana,
          name: `Fleet Utilization`,
          link: '/driverDetail',
          id: 59685682
        },
      ]
    },

    // {
    //   name: 'Apps',
    //   icon: ana,
    //   iconHover: anaH,
    //   id: 88854,
    //   alwaysexpand: true,
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
    //       color: 'linear-gradient(rgba(209, 122, 255, 0.5) 0%, rgba(129, 109, 255, 0.5) 100%)',
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
    //       color: 'linear-gradient(rgba(151, 149, 231, 0.5) 0%, rgba(84, 78, 250, 0.5) 100%)',
    //       value: '65',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.chat })}`,
    //       link: '/chat',
    //       id: 482,
    //       color: 'linear-gradient(rgba(255, 209, 238, 0.5) -35.41%, rgba(255, 107, 175, 0.5) 84.45%)',
    //       value: '30',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.invoiceLists })}`,
    //       link: '/invoice-lists',
    //       id: 896542424,
    //       color: 'linear-gradient(173deg, rgba(45, 255, 227, 0.5) -31.46%, rgba(67, 206, 75, 0.5) 90.39%)',
    //       value: '5',
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.inbox })}`,
    //       link: '/inbox',
    //       id: 856324157852014,
    //       color: 'linear-gradient(rgba(0, 238, 255, 0.5) -36.33%, rgba(104, 41, 231, 0.5) 142.87%)',
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
    //           id: 7898
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.alerts })}`,
    //           link: '/alerts',
    //           id: 60721
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.dropdowns })}`,
    //           link: '/dropdowns',
    //           id: 55485
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.grids })}`,
    //           link: '/grids',
    //           id: 98061
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.modals })}`,
    //           link: '/modals',
    //           id: 13755
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.tooltios })}`,
    //           link: '/tooltios',
    //           id: 33027
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.preloaders })}`,
    //           link: '/preloaders',
    //           id: 46396
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.sweetalert })}`,
    //           link: '/sweet-alert',
    //           id: 95359
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.tabs })}`,
    //           link: '/tabs',
    //           id: 88531
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.typography })}`,
    //           link: '/typography',
    //           id: 36951
    //         },
    //         {
    //           name: 'texteditor',
    //           link: '/texteditor',
    //           id: 74096
    //         },
    //       ]
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.Maps })}`,
    //       id: 40968,
    //       submenus: [
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.googlemap })}`,
    //           link: '/google-map',
    //           id: 14102
    //         },
    //         {
    //           name: 'vector map',
    //           link: '/vector-map',
    //           id: 14102
    //         },
    //       ]
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.Charts })}`,
    //       id: 51089,
    //       submenus: [
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.chartjs })}`,
    //           link: '/chart-js',
    //           id: 70862
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.reactvis })}`,
    //           link: '/reactvis-chart',
    //           id: 78948
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.rechart })}`,
    //           link: '/rechart',
    //           id: 14736
    //         },
    //         {
    //           name: `${props.intl.formatMessage({ ...messages.highcharts })}`,
    //           link: '/highcharts',
    //           id: 11183
    //         },
    //         {
    //           name: 'Apex Chart',
    //           link: '/apex',
    //           id: 7754568
    //         },
    //       ]
    //     },
    //   ],
    // },
    {
      // name: `${props.intl.formatMessage({ ...messages.Company })}`,
      icon: ui,
      iconHover: uiH,
      // id: 5464145555522,
      alwaysexpand: true,
      menus: [
        {
          name: `${props.intl.formatMessage({ ...messages.AddCompanyScreen })}`,
          link: '/addCompany',
          id: 2586584214528525
        },
        {
          name: `${props.intl.formatMessage({ ...messages.ViewCompaniesScreen })}`,
          link: '/viewCompanies',
          id: 7456832452412
        },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.lockscreen })}`,
        //   link: '/lock-screen',
        //   id: 411242585693241
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.mediagallary })}`,
        //   link: '/media-gallary',
        //   id: 4144525885
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.logviewer })}`,
        //   link: '/log-viewer',
        //   id: 8558241442
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.profile })}`,
        //   link: '/profile',
        //   id: 5886852541
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.searchresult })}`,
        //   link: '/search-result',
        //   id: 445421353
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.sectiontimeout })}`,
        //   link: '/section-timeout',
        //   id: 986542124
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.timeline })}`,
        //   link: '/timeline',
        //   id: 68532452
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.blogs })}`,
        //   link: '/blogs',
        //   id: 685835624
        // },
        // {
        //   name: `${props.intl.formatMessage({ ...messages.signup })}`,
        //   link: '/signup',
        //   id: 868352504
        // },
        // {
        //   name: 'Login',
        //   link: '/',
        //   id: 474525252
        // },
        // {
        //   name: '404',
        //   link: '/404',
        //   id: 7858225
        // },
        // {
        //   name: '505',
        //   link: '/505',
        //   id: 458585
        // },
      ],
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.Users })}`,
      icon: pricing,
      iconHover: pricingH,
      // id: 12,
      alwaysexpand: true,
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
      // name: `Driver`,
      icon: form,
      iconHover: formH,
      alwaysexpand: true,
      // id: 23,
      menus: [
        {
          name: `Add Driver`,
          link: '/addDriver',
          id: 231,
        },
        {
          name: `View Driver`,
          link: '/viewDrivers',
          id: 232,
        },
      ],
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.Vehicle })}`,
      icon: table,
      iconHover: tableH,
      // id: 22,
      alwaysexpand: true,
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
      // name: `${props.intl.formatMessage({ ...messages.Route })}`,
      icon: fontawesome,
      iconHover: fontawesomeH,
      alwaysexpand: true,
      // id: 32,
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
    //   name: 'Forms',
    //   id: 70153,
    //   icon: form,
    //   iconHover: formH,
    //   menus: [
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.inputfild })}`,
    //       link: '/inputfild',
    //       id: 98923
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.checkbox })}`,
    //       link: '/checkbox',
    //       id: 6857
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.fileupload })}`,
    //       link: '/file-upload',
    //       id: 56770
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.selectinput })}`,
    //       link: '/select-input',
    //       id: 16848
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.discreteslider })}`,
    //       link: '/discrete-slider',
    //       id: 801
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.datepicker })}`,
    //       link: '/date-picker',
    //       id: 7585
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.transferfile })}`,
    //       link: '/transferfile',
    //       id: 88241
    //     },
    //   ],
    // },
    // {
    //   name: 'Tables',
    //   id: 701544,
    //   icon: table,
    //   iconHover: tableH,
    //   menus: [
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.basictable })}`,
    //       link: '/basic-table',
    //       id: 48107
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.editabletable })}`,
    //       link: '/editable-table',
    //       id: 96622
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.materialtable })}`,
    //       link: '/material-table',
    //       id: 31083
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
    //       id: 58482586584214528525
    //     },
    //     {
    //       name: 'Themify',
    //       link: '/themify',
    //       id: 745683244545252412
    //     },
    //     {
    //       name: 'Pixeden Icons',
    //       link: '/pixeden',
    //       id: 411242548565885693241
    //     },
    //     {
    //       name: 'Icofont',
    //       link: '/icofont',
    //       id: 41447587586525885
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
    //       id: 2586584214528525
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.lockscreen })}`,
    //       link: '/lock-screen',
    //       id: 411242585693241
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.mediagallary })}`,
    //       link: '/media-gallary',
    //       id: 4144525885
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.logviewer })}`,
    //       link: '/log-viewer',
    //       id: 8558241442
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.searchresult })}`,
    //       link: '/search-result',
    //       id: 445421353
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.profile })}`,
    //       link: '/profile',
    //       id: 5886852541
    //     },
    //     {
    //       name: `${props.intl.formatMessage({ ...messages.signup })}`,
    //       link: '/signup',
    //       id: 868352504
    //     },
    //     {
    //       name: 'Login',
    //       link: '/',
    //       id: 474525252
    //     },
    //     {
    //       name: '404',
    //       link: '/404',
    //       id: 7858225
    //     },
    //     {
    //       name: '505',
    //       link: '/505',
    //       id: 458585
    //     },
    //   ],
    // },
  ];

  const [parent_expanded, setParentExpanded] = useState('1');
  const parent_handleChange = panel => (event, new_parent_expanded) => {
    setParentExpanded(new_parent_expanded ? panel : false);
    setExpanded(false);
  };

  const [expanded, setExpanded] = useState('1');
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Grid className="sidebarMainWrapper">
      <div onClick={props.colupsMenuHandler} className="colupsMenuSidebar">
        <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="bars" role="img"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-bars fa-w-14 fa-fw">
          <path fill="currentColor"
            d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"></path>
        </svg>
      </div>
      <div className="sidebarWrap">
        <div className="logo">
          <NavLink to="/dashboard">
            <img className="normal" src={logo} alt="" />
            <img className="colupsLogo" src={smallLogo} alt="" />
          </NavLink>
        </div>
        <Grid className="sidebarMenu" style={{ background: `url(${sidenavBg}) center/cover repeat` }}>
          <PerfectScrollbar>
            {navigations.map(nav => (
              <Fragment key={nav.id}>
                <ExpansionPanel
                  classes={{
                    root: 'navItems',
                    expanded: 'navItemsExpanded',
                  }}
                  square
                  expanded={parent_expanded === nav.id || nav.alwaysexpand === true}
                  onChange={parent_handleChange(nav.id)}
                >
                  <ExpansionPanelSummary
                    style={{ minHeight: '5px', height: '5px' }}
                    classes={{
                      root: 'navItemsText',
                      expanded: 'navItemsTextExpanded',
                      expandIcon: 'navItemsTextIcon',
                      content: 'navItemsTextContent',
                    }}
                    expandIcon={nav.alwaysexpand ? '' : <i className="fa fa-angle-down" />}
                  >
                    {/* <span className="icon">
                      <img className="normal" src={nav.icon} alt="" />
                      <img className="hover" src={nav.iconHover} alt="" />
                    </span> */}
                    <span className="name">{nav.name}</span>
                  </ExpansionPanelSummary>
                  <ul className="submenu">
                    {nav.menus.map((menu, i) => (
                      <li key={menu.id}>{menu.link ?
                        <NavLink className="navItem" activeClassName="active" exact onClick={window.scrollTo(0, 0)}
                          to={menu.link}>
                          <span className="name">
                            {menu.name}
                          </span>
                          {menu.value && <span style={{ background: menu.color }} className="value">{menu.value}</span>}
                        </NavLink> :
                        <ExpansionPanel
                          classes={{
                            root: 'navItems',
                            expanded: 'navItemsExpanded',
                          }}
                          square
                          expanded={expanded === menu.id}
                          onChange={handleChange(menu.id)}
                        >
                          <ExpansionPanelSummary
                            classes={{
                              root: 'navItemsText',
                              expanded: 'navItemsTextExpanded',
                              expandIcon: 'navItemsTextIcon',
                              content: 'navItemsTextContent',
                            }}
                            expandIcon={<i className="fa fa-angle-down" />}
                          >
                            <span className="name">{menu.name}</span>
                          </ExpansionPanelSummary>
                          <ul className="thirdmenuItems">
                            {menu.submenus.map((submenu, i) => (
                              <li key={i}>
                                <NavLink onClick={window.scrollTo(0, 0)} activeClassName="active" exact
                                  to={submenu.link}>
                                  {submenu.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </ExpansionPanel>
                      }</li>
                    ))}
                  </ul>
                </ExpansionPanel>
              </Fragment>
            ))}
          </PerfectScrollbar>
        </Grid>
      </div>
    </Grid>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(SidebarNav));
