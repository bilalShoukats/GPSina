import React from 'react';
import moment from 'moment';
import {
    SwipeableList,
    SwipeableListItem,
} from '@sandstreamdev/react-swipeable-list';
import { FixedSizeList } from 'react-window';
import { Link, Typography, Container } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import InfiniteLoader from 'react-window-infinite-loader';
import './style.css';

const CListItem = withStyles({
    root: {
        padding: '20px 10px',
        backgroundColor: '#f2f3f4',
        borderRadius: '5px',
        marginBottom: '5px',
        color: 'white',

        '&:hover': {
            backgroundColor: '#dadbdc',
            color: 'white',
            '& .MuiListItemIcon-root': {
                color: 'white',
            },
        },
    },
})(ListItem);

const CListText = withStyles({
    root: {
        color: '#494949',
    },
})(ListItemText);

class Row extends React.PureComponent {
    render() {
        const { index, isScrolling, style, data } = this.props;

        return (
            <CListItem
                key={index}
                style={{ ...style, ...{ backgroundColor: 'yellow' } }}
            >
                <CListText
                    primary={`${isScrolling ? 'Scrolling' : 'List' + index}`}
                />
            </CListItem>
        );
    }
}

class VehicleList extends React.PureComponent {
    render() {
        const { index, isScrolling, style, data } = this.props;

        return !isScrolling ? (
            <CListItem
                key={index}
                divider={true}
                style={{ ...style, ...{ backgroundColor: 'yellow' } }}
            >
                <CListText
                    primary={data[index].deviceID + index}
                    secondary={data[index].registrationNo}
                />

                <CListText
                    primary={moment
                        .unix(data[index].CreatedAt)
                        .add(1, 'y')
                        .format('D MMM YYYY')}
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                            >
                                <Link
                                    href="#"
                                    onClick={e => e.preventDefault()}
                                >
                                    Location
                                </Link>
                                <Link
                                    href="#"
                                    onClick={e => e.preventDefault()}
                                >
                                    Fence
                                </Link>
                                <Link
                                    href="#"
                                    onClick={e => e.preventDefault()}
                                >
                                    History
                                </Link>
                            </Typography>
                        </React.Fragment>
                    }
                />
            </CListItem>
        ) : (
            <CListItem style={{ ...style, ...{ backgroundColor: 'yellow' } }}>
                <CListText primary="Scrolling" />
            </CListItem>
        );
    }
}

const InfiniteList = props => {
    const useStyles = makeStyles({
        container: {
            position: 'relative',
        },
    });

    const itemCount = props.hasNextPage ? props.itemCount + 1 : props.itemCount;

    const loadMoreItems = props.isNextPageLoading
        ? () => {}
        : props.loadNextPage;

    const isItemLoaded = index => {
        return !props.hasNextPage || index < props.itemCount;
    };

    const ListContainer = props => {
        const classes = useStyles();
        return (
            <Container
                id="container"
                maxWidth="sm"
                className={classes.container}
                {...props}
            />
        );
    };

    return (
        <InfiniteLoader
            itemCount={itemCount}
            isItemLoaded={isItemLoaded}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <FixedSizeList
                    {...props}
                    ref={ref}
                    itemSize={50}
                    useIsScrolling
                    layout={'vertical'}
                    width={props.width}
                    height={props.height}
                    itemData={props.itemData}
                    itemCount={props.itemCount}
                    innerElementType={ListContainer}
                    onItemsRendered={onItemsRendered}
                    //style={{ position: 'relative', width: '100%' }}
                >
                    {props.List === 'VehicleList' ? VehicleList : Row}
                </FixedSizeList>
            )}
        </InfiniteLoader>
    );
};

export default InfiniteList;
