import React, {Fragment, useState} from 'react';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import {Grid} from '@material-ui/core'
import {Link} from 'react-router-dom'
import Pagination from 'components/Pagination'
import './style.scss'

// json data 
import blogs from 'utils/json/blogs'

const BlogPost = () => {
  const [pageOfItems, setPageOffItem] = useState([])
  return (
    <Fragment>
      <Helmet>
        <title>Blogs</title>
      </Helmet>
      <h2 className="breadcumbTitle">Blogs</h2>
      <Grid container spacing={3}>
        {pageOfItems.map(blog => (
          <Grid key={blog.id} item xl={3} lg={4} sm={6} xs={12}>
            <Grid className="blogWrapper">
              <Grid className="blogImg">
                <img src={blog.image} alt=""/>
              </Grid>
              <Grid className="blogContent">
                <h3><Link to={`/blog-details/${blog.id}`}>{blog.title}</Link></h3>
                <ul className="metaBlog">
                  <li>{blog.meta.name}</li>
                  <li>{blog.meta.date}</li>
                  <li><i className="fa fa-heart"></i> {blog.meta.like}</li>
                </ul>
                <p>{blog.details}</p>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Pagination
            rowShow={8}
            items={blogs}
            onChangePage={(pageOfItems) => setPageOffItem(pageOfItems)}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
}

export default BlogPost;
