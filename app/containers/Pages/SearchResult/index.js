
import React, { Component, Fragment } from 'react'
import Pagination from 'components/Pagination'
import Card from 'components/Card/Loadable'
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom'
import './style.scss'

const searchresult = [
    {
        title: 'Bebinca',
        details: 'Homemade cheesecake with fresh berries and mint',
        list: 'Products | Desserts'
    },
    {
        title: 'Lorem ipsum',
        details: 'Dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos ',
        list: 'Ipsum | Lorem'
    },
    {
        title: 'Dolor sit amet',
        details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Dolores | Adipisci'
    },
    {
        title: 'Commodi itaque',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Deserunt | Impedit'
    },
    {
        title: 'Suscipit quia',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Corrupti | Adipisci'
    },
    {
        title: 'Bebinca',
        details: 'Homemade cheesecake with fresh berries and mint',
        list: 'Products | Desserts'
    },
    {
        title: 'Lorem ipsum',
        details: 'Dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos ',
        list: 'Ipsum | Lorem'
    },
    {
        title: 'Dolor sit amet',
        details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Dolores | Adipisci'
    },
    {
        title: 'Commodi itaque',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Deserunt | Impedit'
    },
    {
        title: 'Suscipit quia',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Corrupti | Adipisci'
    },
    {
        title: 'Bebinca',
        details: 'Homemade cheesecake with fresh berries and mint',
        list: 'Products | Desserts'
    },
    {
        title: 'Lorem ipsum',
        details: 'Dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos ',
        list: 'Ipsum | Lorem'
    },
    {
        title: 'Dolor sit amet',
        details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Dolores | Adipisci'
    },
    {
        title: 'Commodi itaque',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Deserunt | Impedit'
    },
    {
        title: 'Suscipit quia',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Corrupti | Adipisci'
    },
    {
        title: 'Bebinca',
        details: 'Homemade cheesecake with fresh berries and mint',
        list: 'Products | Desserts'
    },
    {
        title: 'Lorem ipsum',
        details: 'Dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos ',
        list: 'Ipsum | Lorem'
    },
    {
        title: 'Dolor sit amet',
        details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Dolores | Adipisci'
    },
    {
        title: 'Commodi itaque',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Deserunt | Impedit'
    },
    {
        title: 'Suscipit quia',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Corrupti | Adipisci'
    },
    {
        title: 'Bebinca',
        details: 'Homemade cheesecake with fresh berries and mint',
        list: 'Products | Desserts'
    },
    {
        title: 'Lorem ipsum',
        details: 'Dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos ',
        list: 'Ipsum | Lorem'
    },
    {
        title: 'Dolor sit amet',
        details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Dolores | Adipisci'
    },
    {
        title: 'Commodi itaque',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Deserunt | Impedit'
    },
    {
        title: 'Suscipit quia',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Corrupti | Adipisci'
    },
    {
        title: 'Bebinca',
        details: 'Homemade cheesecake with fresh berries and mint',
        list: 'Products | Desserts'
    },
    {
        title: 'Lorem ipsum',
        details: 'Dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos ',
        list: 'Ipsum | Lorem'
    },
    {
        title: 'Dolor sit amet',
        details: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Dolores | Adipisci'
    },
    {
        title: 'Commodi itaque',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Deserunt | Impedit'
    },
    {
        title: 'Suscipit quia',
        details: 'Commodi itaque quisquam perspiciatis! Pariatur amet reiciendis cupiditate eligendi voluptate, error repellat, ipsam soluta, minima repudiandae autem ad eveniet. Eum quos architecto aspernatur? Error necessitatibus eligendi, autem hic, accusamus deserunt quis optio aut, suscipit quia esse impedit corrupti dolores adipisci libero ad?',
        list: 'Corrupti | Adipisci'
    },
]

class SearchResult extends Component {
    state = {
        searchresult: searchresult,
        pageOfItems: []
    }

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Search Result</title>
                    <meta name="description" content="Description of LogViewer" />
                </Helmet>
                <h2 className="breadcumbTitle">Search Result</h2>
                <Card
                    title="Search Result"
                    className="searchResultWrapper"
                >
                    <ul className="searchResult">

                        {this.state.pageOfItems.map((item, i) =>
                            <li key={i}>
                                <NavLink to="/">
                                    <span className="title">{item.title}</span>
                                    <span className="details">{item.details}</span>
                                    <span className="list">{item.list}</span>
                                </NavLink>
                            </li>
                        )}
                    </ul>

                    <Pagination
                        rowShow={8}
                        items={this.state.searchresult}
                        onChangePage={this.onChangePage}
                    />
                </Card>
            </Fragment >
        );
    }
}
export default SearchResult
