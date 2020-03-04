import React from 'react';
import { Switch, Route } from 'react-router-dom';
import messages from 'components/SidebarNav/messages';
import { injectIntl } from 'react-intl';

// Private components
import PrivateRoute from 'containers/_PrivateRoute';
import PublicRoute from 'containers/_PublicRoute';

// dashboard
import DashboardScreen from "containers/Dashboard/DashboardScreen/Loadable";
import Cryptocurrency from "containers/Dashboard/Cryptocurrency/Loadable";
import BankingSystem from "containers/Dashboard/BankingSystem/Loadable";
import Crm from "containers/Dashboard/Crm/Loadable";
import Ecommerce from "containers/Dashboard/Ecommerce/Loadable";

// ui_elements
import Buttons from 'components/UI_Elements/Buttons/Loadable';
import Alerts from 'components/UI_Elements/Alerts/Loadable';
import Dropdown from 'components/UI_Elements/Dropdown/Loadable';
import GridDemo from 'components/UI_Elements/GridDemo/Loadable';
import ModalComponent from 'components/UI_Elements/ModalComponent/Loadable';
import PopOverTooltip from 'components/UI_Elements/PopOverTooltip/Loadable';
import Preloader from 'components/UI_Elements/Preloader/Loadable';
import SweetAlertComponent from 'components/UI_Elements/SweetAlert/Loadable';
import TabsAcordians from 'components/UI_Elements/TabsAcordians/Loadable';
import TypographyComponent from 'components/UI_Elements/TypographyComponent/Loadable';

// forms
import InputComponent from 'components/Forms/InputComponent/Loadable';
import CheckboxComponent from 'components/Forms/CheckboxComponent/Loadable';
import FormUpload from 'components/Forms/FormUpload/Loadable';
import SelectForm from 'components/Forms/SelectForm/Loadable';
import DiscreteSlider from 'components/Forms/Sliders/Loadable';
import DateTimePicker from 'components/Forms/DateTimePicker/Loadable';
import TransferList from 'components/Forms/TransferList/Loadable';

// icons
import FontawesomeIcon from 'components/Icons/FontawesomeIcon/Loadable';
import ThemifyIcon from 'components/Icons/ThemifyIcon/Loadable';
import PixedenIcon from 'components/Icons/PixedenIcon/Loadable';
import IcoFontIcons from 'components/Icons/IcoFontIcons/Loadable';
// maps
import GoogleMapsComponent from 'components/Maps/GoogleMapsComponent/Loadable';
import VectorMapComponents from 'components/Maps/VectorMapComponents/Loadable';

// special featured
import TodoList from 'containers/SpecialFeatured/TodoApp';
import ChatApp from 'containers/SpecialFeatured/ChatApp/Loadable';
import Inbox from 'containers/SpecialFeatured/Inbox/Loadable';
import ScrumBoard from 'containers/SpecialFeatured/ScrumBoard/Loadable';
import PricingTable from 'containers/SpecialFeatured/PricingTable/Loadable';
import ContactList from 'containers/SpecialFeatured/ContactList/Loadable';
import TextEditorComponent from 'containers/SpecialFeatured/TextEditorComponent/Loadable';
import Invoice from 'containers/SpecialFeatured/Invoice/Loadable';
import InvoiceLists from 'containers/SpecialFeatured/InvoiceLists/Loadable';
import EventCalendarComponent from 'containers/SpecialFeatured/EventCalendarComponent/Loadable';
import ForumsComponent from 'containers/SpecialFeatured/ForumsComponent/Loadable';
import ForumsDetails from 'containers/SpecialFeatured/ForumsDetails/Loadable';

// blogs
import BlogPost from 'containers/Blogs/BlogPost/Loadable';
import BlogDetails from 'containers/Blogs/BlogDetails/Loadable';

// tables
import BasicTablePages from 'components/Tables/BasicTable/Loadable';
import EditableTable from 'components/Tables/EditableTable/Loadable';
import MaterialTable from 'components/Tables/MaterialTable/Loadable';

// charts
import ChartJsComponent from 'components/Chart/ChartJsComponent/Loadable';
import ReactVis from 'components/Chart/ReactVis/Loadable';
import ReChart from 'components/Chart/ReChart/Loadable';
import HeightChartComponent from 'components/Chart/HeightChartComponent/Loadable';
import ApexChart from 'components/Chart/ApexChart/Loadable';

// pages
// import BlankPage from 'containers/Pages/BlankPage/Loadable';
import AddCompanyScreen from 'containers/Pages/AddCompanyScreen/Loadable';
import ViewCompaniesScreen from 'containers/Pages/ViewCompaniesScreen/Loadable';
import AddRouteScreen from 'containers/Pages/AddRouteScreen/Loadable';
import ViewRoutesScreen from 'containers/Pages/ViewRoutesScreen/Loadable';
import EditRouteScreen from 'containers/Pages/EditRouteScreen/Loadable';
import AddUserScreen from 'containers/Pages/AddUserScreen/Loadable';
import EditUserScreen from 'containers/Pages/EditUserScreen/Loadable';
import ViewUsersScreen from 'containers/Pages/ViewUsersScreen/Loadable';
import AddDriverScreen from 'containers/Pages/AddDriverScreen/Loadable';
import EditDriverScreen from 'containers/Pages/EditDriverScreen/Loadable';
import ViewDriversScreen from 'containers/Pages/ViewDriversScreen/Loadable';
import AddVehicleScreen from 'containers/Pages/AddVehicleScreen/Loadable';
import ViewVehiclesScreen from 'containers/Pages/ViewVehiclesScreen/Loadable';
import VehicleMapScreen from 'containers/Pages/VehicleMapScreen/Loadable';
import LockScreen from 'containers/Pages/LockScreen/Loadable';
import LogViewer from 'containers/Pages/LogViewer/Loadable';
import MediaGallary from 'containers/Pages/MediaGallary/Loadable';
import ProfilePage from 'containers/Pages/ProfilePage/Loadable';
import SearchResult from 'containers/Pages/SearchResult/Loadable';
import SectionTimeOut from 'containers/Pages/SectionTimeOut';
import TimelineComponent from 'containers/Pages/TimelineComponent/Loadable';
import Login from 'containers/Pages/Login/Loadable';
import Signup from 'containers/Pages/Signup/Loadable';
import ForgotPassword from 'containers/Pages/ForgotPassword/Loadable';

// notfound
import NotfoundPage from 'components/NotfoundPage/Loadable';
import NotfoundPage505 from 'components/NotfoundPage505/Loadable';
import dashboardMessages from './messages';

const Routes = props => (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/register" component={Signup} />
    <PrivateRoute exact path="/dashboard" component={DashboardScreen} />
    {/* Company Links */}
    <PrivateRoute exact path="/addCompany" component={AddCompanyScreen} />
    <PrivateRoute exact path="/viewCompanies" component={ViewCompaniesScreen} />
    {/* Employee Links */}
    <PrivateRoute exact path="/addUser" component={AddUserScreen} />
    <PrivateRoute exact path={`/editUser/:item`} component={EditUserScreen} />
    <PrivateRoute exact path="/viewUsers" component={ViewUsersScreen} />
    {/*Driver*/}
    <PrivateRoute exact path="/addDriver" component={AddDriverScreen} />
    <PrivateRoute exact path={`/editDriver/:item`} component={EditDriverScreen} />
    <PrivateRoute exact path="/viewDrivers" component={ViewDriversScreen} />
    {/* Vehicle Links */}
    <PrivateRoute exact path="/addVehicle" component={AddVehicleScreen} />
    <PrivateRoute exact path="/viewVehicles" component={ViewVehiclesScreen} />
    <PrivateRoute exact path={`/vehicleMap/:registrationNo`} component={VehicleMapScreen} />
    {/* Route Links */}
    <PrivateRoute exact path="/addRoute" component={AddRouteScreen} />
    <PrivateRoute exact path="/viewRoutes" component={ViewRoutesScreen} />
    <PrivateRoute exact path={`/editRoute/:item`} component={EditRouteScreen} />
    <Route exact path="/forgotPassword" component={ForgotPassword} />
    <PrivateRoute
      exact
      path="/profile"
      title={props.intl.formatMessage({ ...messages.profile })}
      component={ProfilePage}
    />
    {/* dashboard  start */}
    {/* <PrivateRoute
      exact
      path="/cryptocurrency"
      title="Dashboard > Cryptocurrency"
      component={Cryptocurrency}
    />
    <PrivateRoute
      exact
      path="/banking-system"
      title="Dashboard > Banking System"
      component={BankingSystem}
    />
    <PrivateRoute
      exact
      path="/crm"
      title="Dashboard > CRM"
      component={Crm}
    />
    <PrivateRoute
      exact
      path="/ecommerce"
      title="Dashboard > E-commerce"
      component={Ecommerce}
    /> */}
    {/* dashboard  end */}

    {/* ui elements start */}
    {/* <PrivateRoute
      exact
      path="/buttons"
      title={props.intl.formatMessage({...messages.Buttons})}
      component={Buttons}
    />
    <PrivateRoute
      exact
      path="/alerts"
      title={props.intl.formatMessage({...messages.alerts})}
      component={Alerts}
    />
    <PrivateRoute
      exact
      path="/dropdowns"
      title={props.intl.formatMessage({...messages.dropdowns})}
      component={Dropdown}
    />
    <PrivateRoute
      exact
      path="/grids"
      title={props.intl.formatMessage({...messages.grids})}
      component={GridDemo}
    />
    <PrivateRoute
      exact
      path="/modals"
      title={props.intl.formatMessage({...messages.modals})}
      component={ModalComponent}
    />
    <PrivateRoute
      exact
      path="/tooltios"
      title={props.intl.formatMessage({...messages.tooltios})}
      component={PopOverTooltip}
    />
    <PrivateRoute
      exact
      path="/preloaders"
      title={props.intl.formatMessage({...messages.preloaders})}
      component={Preloader}
    />
    <PrivateRoute
      exact
      path="/sweet-alert"
      title={props.intl.formatMessage({...messages.sweetalert})}
      component={SweetAlertComponent}
    />
    <PrivateRoute
      exact
      path="/tabs"
      title={props.intl.formatMessage({...messages.tabs})}
      component={TabsAcordians}
    />
    <PrivateRoute
      exact
      path="/typography"
      title={props.intl.formatMessage({...messages.typography})}
      component={TypographyComponent}
    />
    <PrivateRoute
      exact
      path="/texteditor"
      title="Texteditor"
      component={TextEditorComponent}
    /> */}
    {/* ui elements end */}

    {/* special featured start */}
    {/* <PrivateRoute
      exact
      path="/forums"
      title={props.intl.formatMessage({...messages.forums})}
      component={ForumsComponent}
    />
    <PrivateRoute
      exact
      path="/forum-details/:id"
      title={props.intl.formatMessage({...messages.forumdetails})}
      component={ForumsDetails}
    />
    <PrivateRoute
      exact
      path="/contact-list"
      title={props.intl.formatMessage({...messages.contactlist})}
      component={ContactList}
    />
    <PrivateRoute
      exact
      path="/scrumbord"
      title={props.intl.formatMessage({...messages.scrumbord})}
      component={ScrumBoard}
    />
    <PrivateRoute
      exact
      path="/todo"
      title={props.intl.formatMessage({...messages.todo})}
      component={TodoList}
    />
    <PrivateRoute
      exact
      path="/chat"
      title={props.intl.formatMessage({...messages.chat})}
      component={ChatApp}
    />
    <PrivateRoute
      exact
      path="/invoice"
      title={props.intl.formatMessage({...messages.invoice})}
      component={Invoice}
    />
    <PrivateRoute
      exact
      path="/invoice-lists"
      title={props.intl.formatMessage({...messages.invoiceLists})}
      component={InvoiceLists}
    />
    <PrivateRoute
      exact
      path="/inbox"
      title={props.intl.formatMessage({...messages.inbox})}
      component={Inbox}
    />
    <PrivateRoute
      exact
      path="/event-calendar"
      title={props.intl.formatMessage({...messages.eventcalendar})}
      component={EventCalendarComponent}
    /> */}
    {/* special featured end */}

    {/* pages start */}
    {/* <PrivateRoute
      exact
      path="/pricing-table"
      title={props.intl.formatMessage({...messages.pricingtable})}
      component={PricingTable}
    />
    <PrivateRoute
      exact
      path="/blank-page"
      title={props.intl.formatMessage({...messages.blankpage})}
      component={BlankPage}
    />
    <PrivateRoute
      exact
      path="/lock-screen"
      title={props.intl.formatMessage({...messages.lockscreen})}
      component={LockScreen}
    />
    <PrivateRoute
      exact
      path="/log-viewer"
      title={props.intl.formatMessage({...messages.logviewer})}
      component={LogViewer}
    />
    <PrivateRoute
      exact
      path="/media-gallary"
      title={props.intl.formatMessage({...messages.mediagallary})}
      component={MediaGallary}
    />
    <PrivateRoute
      exact
      path="/profile"
      title={props.intl.formatMessage({...messages.profile})}
      component={ProfilePage}
    />
    <PrivateRoute
      exact
      path="/search-result"
      title={props.intl.formatMessage({...messages.searchresult})}
      component={SearchResult}
    />
    <PrivateRoute
      exact
      path="/section-timeout"
      title={props.intl.formatMessage({...messages.sectiontimeout})}
      component={SectionTimeOut}
    />
    <PrivateRoute
      exact
      path="/timeline"
      title={props.intl.formatMessage({...messages.timeline})}
      component={TimelineComponent}
    /> */}
    {/* pages end */}

    {/* widget start */}
    {/* <PrivateRoute
      exact
      path="/blogs"
      title={props.intl.formatMessage({...messages.blogs})}
      component={BlogPost}
    />
    <PrivateRoute
      exact
      path="/blog-details/:id"
      title={props.intl.formatMessage({...messages.blogsdetails})}
      component={BlogDetails}
    /> */}
    {/* widget end */}

    {/* forms start */}
    {/* <PrivateRoute
      exact
      path="/inputfild"
      title={props.intl.formatMessage({...messages.inputfild})}
      component={InputComponent}
    />
    <PrivateRoute
      exact
      path="/checkbox"
      title={props.intl.formatMessage({...messages.checkbox})}
      component={CheckboxComponent}
    />
    <PrivateRoute
      exact
      path="/file-upload"
      title={props.intl.formatMessage({...messages.fileupload})}
      component={FormUpload}
    />
    <PrivateRoute
      exact
      path="/select-input"
      title={props.intl.formatMessage({...messages.selectinput})}
      component={SelectForm}
    />
    <PrivateRoute
      exact
      path="/discrete-slider"
      title={props.intl.formatMessage({...messages.discreteslider})}
      component={DiscreteSlider}
    />
    <PrivateRoute
      exact
      path="/date-picker"
      title={props.intl.formatMessage({...messages.datepicker})}
      component={DateTimePicker}
    />
    <PrivateRoute
      exact
      path="/transferfile"
      title={props.intl.formatMessage({...messages.transferfile})}
      component={TransferList}
    /> */}
    {/* forms start */}

    {/* icons start */}
    {/* <PrivateRoute
      exact
      path="/fontawesome"
      title="fontawesome"
      component={FontawesomeIcon}
    />
    <PrivateRoute
      exact
      path="/themify"
      title="themify"
      component={ThemifyIcon}
    />
    <PrivateRoute
      exact
      path="/pixeden"
      title="Pixeden Icons"
      component={PixedenIcon}
    />
    <PrivateRoute
      exact
      path="/icofont"
      title="Icofont"
      component={IcoFontIcons}
    /> */}
    {/* icons end */}

    {/* map start */}
    <PrivateRoute
      exact
      path="/google-map"
      title={props.intl.formatMessage({ ...messages.googlemap })}
      component={GoogleMapsComponent}
    />
    {/* <PrivateRoute
      exact
      path="/google-map"
      title={props.intl.formatMessage({...messages.googlemap})}
      component={GoogleMapsComponent}
    />
    <PrivateRoute
      exact
      path="/vector-map"
      title="vector map"
      component={VectorMapComponents}
    /> */}
    {/* map end */}

    {/* tables start */}
    {/* <PrivateRoute
      exact
      path="/basic-table"
      title={props.intl.formatMessage({...messages.basictable})}
      component={BasicTablePages}
    />
    <PrivateRoute
      exact
      path="/editable-table"
      title={props.intl.formatMessage({...messages.editabletable})}
      component={EditableTable}
    />
    <PrivateRoute
      exact
      path="/material-table"
      title={props.intl.formatMessage({...messages.materialtable})}
      component={MaterialTable}
    /> */}
    {/* tables start */}

    {/* chart start */}
    {/* <PrivateRoute
      exact
      path="/chart-js"
      title={props.intl.formatMessage({...messages.chartjs})}
      component={ChartJsComponent}
    />
    <PrivateRoute
      exact
      path="/reactvis-chart"
      title={props.intl.formatMessage({...messages.reactvis})}
      component={ReactVis}
    />
    <PrivateRoute
      exact
      path="/rechart"
      title={props.intl.formatMessage({...messages.rechart})}
      component={ReChart}
    />
    <PrivateRoute
      exact
      path="/highcharts"
      title="Highcharts"
      component={HeightChartComponent}
    />
    <PrivateRoute
      exact
      path="/apex"
      title="Apex Charts"
      component={ApexChart}
    /> */}
    {/* chart end */}

    {/* public route components  */}
    {/* <PublicRoute exact path="/signup" component={Signup}/>
    <PublicRoute exact path="/recover-password" component={ForgotPassword}/>
    <PublicRoute exact path="/505" component={NotfoundPage505}/>
    <Route component={NotfoundPage}/> */}
  </Switch>
);
export default injectIntl(Routes);
