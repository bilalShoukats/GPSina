import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {useInjectReducer} from 'utils/injectReducer';
import makeSelectForumsComponent from './selectors';
import reducer from './reducer';
import messages from './messages';
import {Grid, Radio, Tab, Tabs, Button, Dialog, TextField, MenuItem} from '@material-ui/core'
import {Link} from 'react-router-dom'
import ScrollArea from 'react-scrollbar'
import cookie from 'js-cookie';
import Card from 'components/Card/Loadable'
import TextEditor from 'components/TextEditor/Loadable'
import './style.scss'
// json data 
import forums from 'utils/json/forums'

const ForumsComponent = () => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [qsValue, setQsValue] = useState({
    title: '',
    cetagory: '',
  });

  const handleQsChange = name => event => {
    setQsValue({...qsValue, [name]: event.target.value});
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    cookie.set('forums_data', 1);
  });

  function handleChange(event, newValue) {
    setValue(newValue);
    cookie.set('forums_data', newValue);
  }


  return (
    < Fragment>
      <Helmet>
        <title>Forums</title>
      </Helmet>
      <h2 className="breadcumbTitle">Forums</h2>
      <Card
        title="Forums"
        className="forumsWrapper">
        <Grid container spacing={3}>
          <Grid item xl={3} lg={4}>
            <Grid className="forumsLeftSidebar">
              <Button onClick={handleClickOpen}
                      className="questionBtn bg-default">Ask a Question</Button>
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                classes={{
                  indicator: 'forumIndicator',
                  root: 'forumTabWrapper',
                  flexContainer: 'forumTabContainer'
                }}
              >
                {forums.map((item, i) => (
                  <Tab
                    classes={{
                      textColorInherit: item.className,
                      root: 'forumTabItem',
                    }}

                    key={i}
                    label={item.name}/>
                ))}
              </Tabs>

            </Grid>
          </Grid>
          <Grid item xl={9} lg={8}>
            <Grid className="forumsMainWrap">
              {forums.map((item, i) => (
                <Fragment key={i}>
                  {value === i && <Grid className="forumListWrapper">
                    <h2
                      className="forumTitle">{item.value === "all_discussions" ? `Viewing ${item.name}` : `Viewing ${item.name} Cetagory`}
                      <span>{item.forumsItems.length + 1}</span></h2>
                    <ScrollArea
                      speed={.5}
                      className="forumScrollBar"
                      contentClassName='forumScrollBarContent'
                      horizontal={false}
                    >
                      {item.forumsItems && <ul className="forumItems">
                        <li className="forumList">
                          {item.forumsItems.map((list, i) => (
                            <Link className="forumLink" key={i} to={`forum-details/${list.id}`}>
                              <Grid className="forumAutorImg">
                                <img src={list.image} alt=""/>
                              </Grid>
                              <Grid className="forumAutorContent">
                                <h4>{list.title} <span className={`forumBadge ${list.label}`}>{list.label}</span></h4>
                                <h5>Posted by : {list.author} <span>{list.time}</span>
                                  <span className="commentsWrap">
                                                                      <i className="fa fa-comments"></i>
                                    {list.comments.length}
                                                                  </span>
                                </h5>
                                <p>{list.details}</p>
                              </Grid>
                            </Link>
                          ))}
                        </li>
                      </ul>}
                    </ScrollArea>
                  </Grid>}
                </Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        className="modalWrapper forumModalWrap"
      >
        <Grid className="modalTitle">
          <h3>New Question/Discussion</h3>
        </Grid>
        <Grid className="modalBody">
          <TextField
            label="Name"
            className='inputField'
            fullWidth
            variant="outlined"
            value={qsValue.title}
            onChange={handleQsChange('title')}
          />
          <TextField
            select
            label="Select"
            className='inputField'
            fullWidth
            variant="outlined"
            value={qsValue.cetagory}
            onChange={handleQsChange('cetagory')}
          >
            {forums.map((item, i) => (
              <MenuItem key={i} value={item.value}>{item.name}</MenuItem>
            ))}
          </TextField>
          <TextEditor/>
        </Grid>
        <Grid className="modalFooter">
          <Button className="btn bg-default" onClick={handleClose}> Cancel </Button>
          <Button className="btn bg-default" onClick={handleClose}> Agree</Button>
        </Grid>
      </Dialog>
    </Fragment>
  );
}


const mapStateToProps = createStructuredSelector({
  forumsComponent: makeSelectForumsComponent(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ForumsComponent);
