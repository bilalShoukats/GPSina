import React, { Fragment, useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from 'components/Card/Loadable'
import { Grid, Button, TextField } from '@material-ui/core'
import messages from './messages';
import './style.scss'
import blogs from 'utils/json/blogs'

import avatar from 'images/avatar.svg'


class BlogDetails extends Component {
    state = {
        blog: {},
        name: '',
        email: '',
        comments: '',
    }
    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        const id = parseInt(this.props.match.params.id);
        let blog = blogs.filter(b => b.id === id);
        if (blog.length >= 0) {
            this.setState({
                blog: blog[0]
            })
        }
    }
    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state.name, this.state.email, this.state.comments, 'Comments Here')
        this.setState({
            name: '',
            email: '',
            comments: ''
        })
    }
    render() {
        const { blog } = this.state
        return (
            <Fragment>
                <Helmet>
                    <title>Blog Details</title>
                </Helmet>
              <h2 className="breadcumbTitle">Blog Details</h2>
                <Card className="blogDetails">
                    <Grid className="blogDetailsImage">
                        <img src={blog.image} alt="" />
                    </Grid>
                    <h2>{blog.title}</h2>
                    <ul className="meta">
                        <li><i className="fa fa-user"></i> {blog.meta !== undefined ? blog.meta.name : ''}</li>
                        <li><i className="fa fa-clock-o"></i> {blog.meta !== undefined ? blog.meta.date : ''}</li>
                    </ul>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente possimus molestias nostrum doloremque ut explicabo id aliquid vel quo harum adipisci ipsam sed repellat atque veniam quae eaque sit officiis, fuga ea hic animi. Culpa dolores eius illo, atque quae cupiditate architecto iste assumenda minima corrupti, dolorem consequatur commodi aliquid amet provident velit necessitatibus possimus similique eos, molestiae quos praesentium? Est adipisci suscipit illo maiores dolore, temporibus, ipsa enim incidunt cumque eveniet modi aliquid eaque cum, ea dolor quidem! Ea excepturi nemo quisquam explicabo, iste illum! Optio provident, dolores hic ab iusto distinctio modi non commodi qui. Quis optio facilis deleniti explicabo, necessitatibus aspernatur doloremque voluptatibus sed veniam unde molestiae ducimus fugiat ex ea reiciendis magni saepe natus tempora a fuga reprehenderit autem quaerat laborum voluptatem. Exercitationem veritatis commodi fuga odio dolorum quas rerum numquam debitis quae. Exercitationem, totam officia aliquid, nostrum beatae repudiandae et mollitia similique sunt culpa cum.</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta molestiae fugiat, ipsa sint officia amet, provident, animi ratione ex beatae alias. Nihil vel voluptatum, incidunt facere odit, corporis atque eum quod eaque labore iste, aspernatur dolorum? Suscipit non saepe, iusto itaque repellat nihil cupiditate necessitatibus voluptas esse impedit, velit est omnis autem vel consequatur quaerat magni libero cumque ipsum explicabo. Nam, nisi nulla. Itaque ex dignissimos sit magni minima perferendis ratione consectetur omnis quos impedit tempora facere asperiores ipsam ducimus cum, vitae voluptate est sed ab vero? Sapiente minima, sit corporis numquam incidunt tenetur obcaecati vel ratione non tempore sunt.</p>
                    <blockquote>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora tenetur eos illum optio impedit libero suscipit, ut, sapiente officia corporis ex beatae? Repellat ducimus ad exercitationem autem at quos, accusamus necessitatibus quisquam aut, suscipit, maiores dignissimos possimus ut ullam quas?</blockquote>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente possimus molestias nostrum doloremque ut explicabo id aliquid vel quo harum adipisci ipsam sed repellat atque veniam quae eaque sit officiis, fuga ea hic animi. Culpa dolores eius illo, atque quae cupiditate architecto iste assumenda minima corrupti, dolorem consequatur commodi aliquid amet provident velit necessitatibus possimus similique eos, molestiae quos praesentium? Est adipisci suscipit illo maiores dolore, temporibus, ipsa enim incidunt cumque eveniet modi aliquid eaque cum, ea dolor quidem! Ea excepturi nemo quisquam explicabo, iste illum! Optio provident, dolores hic ab iusto distinctio modi non commodi qui. Quis optio facilis deleniti explicabo, necessitatibus aspernatur doloremque voluptatibus sed veniam unde molestiae ducimus fugiat ex ea reiciendis magni saepe natus tempora a fuga reprehenderit autem quaerat laborum voluptatem. Exercitationem veritatis commodi fuga odio dolorum quas rerum numquam debitis quae. Exercitationem, totam officia aliquid, nostrum beatae repudiandae et mollitia similique sunt culpa cum.</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta molestiae fugiat, ipsa sint officia amet, provident, animi ratione ex beatae alias. Nihil vel voluptatum, incidunt facere odit, corporis atque eum quod eaque labore iste, aspernatur dolorum? Suscipit non saepe, iusto itaque repellat nihil cupiditate necessitatibus voluptas esse impedit, velit est omnis autem vel consequatur quaerat magni libero cumque ipsum explicabo. Nam, nisi nulla. Itaque ex dignissimos sit magni minima perferendis ratione consectetur omnis quos impedit tempora facere asperiores ipsam ducimus cum, vitae voluptate est sed ab vero? Sapiente minima, sit corporis numquam incidunt tenetur obcaecati vel ratione non tempore sunt.</p>
                    <ul className="socialShare">
                        <li>Share Link</li>
                        <li><a href="#" className="facebook"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#" className="twitter"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a></li>
                        <li><a href="#" className="instagram"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                    <ul className="commentsWrapper">

                        {blog.comments !== undefined ? blog.comments.map((comment, i) => (
                            <li key={i} className="commentItem">
                                <h3><img src={comment.authorImage !== null ? comment.authorImage : avatar} alt="" /> {comment.author}</h3>
                                <p>{comment.message}</p>
                                <span className="date">{comment.date}</span>
                                <Button>Replay</Button>
                            </li>
                        )) : ''}
                    </ul>
                    <h3 className="leaveTitle">Leave a comment</h3>
                    <form onSubmit={this.submitHandler}>
                        <TextField
                            label="Your Name"
                            className='inputField'
                            fullWidth
                            name="name"
                            variant="outlined"
                            value={this.state.name}
                            onChange={this.changeHandler}
                        />
                        <TextField
                            label="Your Email"
                            className='inputField'
                            fullWidth
                            variant="outlined"
                            name="email"
                            value={this.state.email}
                            onChange={this.changeHandler}
                        />
                        <TextField
                            label="Comments"
                            className='inputField'
                            fullWidth
                            variant="outlined"
                            name="comments"
                            multiline
                            rowsMax="4"
                            value={this.state.comments}
                            onChange={this.changeHandler}
                        />
                        <Button type="submit" className="btn bg-default">Comments</Button>
                    </form>
                </Card>
            </Fragment >
        )
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

export default compose(withConnect)(BlogDetails);
