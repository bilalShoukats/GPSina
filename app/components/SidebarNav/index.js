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
import SuperHOC from "../../HOC/SuperHOC";

const SidebarNav = props => {
  // let user = Manager.getItem('user', true);
  // console.log('propsssss', user.email)

  const navigations = [
    {
      // name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
      icon: ana,
      iconHover: anaH,
      id: 11031,
      alwaysexpand: true,
      menus: [
        {
          icon: ana,
          name: `${props.intl.formatMessage({ ...messages.DashboardScreen })}`,
          link: '/dashboard',
          id: 5968568
        },
      ]
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
      icon: ana,
      iconHover: anaH,
      id: 110311,
      alwaysexpand: true,
      menus: [
        {
          icon: ana,
          name: `Fleet Utilization`,
          link: '/fleetUtilization',
          id: 59685682
        },
      ]
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
      icon: ana,
      iconHover: anaH,
      id: 231656533,
      alwaysexpand: true,
      menus: [
        {
          icon: ana,
          name: `Driving Analysis`,
          link: '/driving-analysis',
          id: 123123
        },
      ]
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.dashboard })}`,
      icon: ana,
      iconHover: anaH,
      id: 129,
      alwaysexpand: true,
      menus: [
        {
          icon: ana,
          name: `Route History`,
          link: '/routesHistory',
          id: 1291
        },
      ]
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.Company })}`,
      icon: ui,
      iconHover: uiH,
      id: 5464145555522,
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
      ],
    },
    {
      // name: `${props.intl.formatMessage({ ...messages.Users })}`,
      icon: pricing,
      iconHover: pricingH,
      id: 12,
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
      id: 23,
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
      id: 22,
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

  console.log('hello navbar props', props.user.role)

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
            {navigations.map(nav => {
              console.log('nav', nav)
              if ((props.user.role === 1 || props.user.role === 0 || props.user.role === 3) && nav.id === 5464145555522) return null;
              return (
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
                        <li key={i}>{menu.link ?
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
              )
            })}
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

export default SuperHOC(compose(withConnect)(injectIntl(SidebarNav)));
