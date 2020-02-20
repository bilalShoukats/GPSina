import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {compose} from 'redux';
import messages from './messages';
import Card from 'components/Card/Loadable'
import {Grid} from '@material-ui/core'
import cookie from 'js-cookie';
import TextEditor from 'components/TextEditor/Loadable'
import './style.scss'

// json data 
import forums from 'utils/json/forums'


import avatar from 'images/avatar.svg'

class ForumsDetails extends Component {
  state = {
    forum: {},
  };

  componentDidMount() {
    const f = forums[cookie.get('forums_data')].forumsItems
    const id = parseInt(this.props.match.params.id);
    let forum = f.filter(a => a.id !== id);
    if (forum.length >= 0) {
      this.setState({
        forum: forum[0]
      })
    }
  }

  render() {
    const {forum} = this.state
    return (
      <Fragment>
        <Helmet>
          <title>Forums Details</title>
        </Helmet>
        <h2 className="breadcumbTitle">Forums Details</h2>
        <Card
          className="forumsDetailsWrapper">
          <h2>{forum.title} <span>Posted In : <span className={`forumBadge ${forum.label}`}> {forum.label}</span></span>
          </h2>
          <Grid className="forumDetailsWrapper">
            <Grid className="forumDetailsImg">
              <img src={forum.image} alt=""/>
            </Grid>
            <Grid className="forumDetailsContent">
              <h3>{forum.author} <span>{forum.time}</span></h3>
              <p>{forum.details}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis nam recusandae labore dignissimos
                neque nulla sint natus tenetur accusantium perferendis. Ea maxime a minus reprehenderit voluptate
                recusandae blanditiis aliquam porro quaerat expedita corporis mollitia pariatur eius eum ducimus,
                officiis nulla soluta nostrum sit unde aspernatur magni. Excepturi nisi pariatur dolores quidem non
                corporis facere aliquam adipisci illum veniam natus distinctio officiis aperiam magnam molestiae
                reiciendis amet accusamus placeat eaque tenetur fugit laboriosam, recusandae tempore quibusdam. Quisquam
                saepe nesciunt perspiciatis adipisci veritatis tempora consequuntur laborum corrupti voluptatum iure?
                Autem, quam distinctio! Illo delectus deleniti veniam modi iste aliquid! Sapiente inventore voluptatum,
                molestiae velit voluptas facere a exercitationem tempore nisi aspernatur possimus voluptate ab veritatis
                ipsum quaerat! Quod minima omnis assumenda quis impedit, iste mollitia fugiat aliquam vero temporibus.
                Beatae omnis accusamus nam aut temporibus maxime quod iure corporis possimus at in numquam ea, esse quis
                est soluta nesciunt architecto sunt dolorem?</p>
            </Grid>
          </Grid>
        </Card>
        <ul className="commentsWrapper">
          {forum.comments !== undefined ? forum.comments.map((comment, i) => (
            <li key={i} className="commentsItems">
              <Grid className="commentsImages">
                <img src={comment.authorImage === null ? avatar : comment.authorImage} alt=""/>
              </Grid>
              <Grid className="commentsComments">
                <h3>{comment.author} <span>{comment.time}</span></h3>
                <p>{comment.message}</p>
              </Grid>
            </li>
          )) : ''}
        </ul>
        <TextEditor/>
      </Fragment>
    );
  }

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

export default compose(withConnect)(ForumsDetails);
