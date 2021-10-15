import React from 'react';
import { FixedSizeList } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InfiniteLoader from 'react-window-infinite-loader';

class Row extends React.PureComponent {
    render() {
        const { index, isScrolling, style, data } = this.props;
        return (
            <ListItem
                button
                key={index}
                style={{
                    ...style,
                }}
            >
                <ListItemText
                    primary={`${isScrolling ? 'Scrolling' : data[index].id}`}
                    style={{
                        color: '#fff',
                    }}
                />
            </ListItem>
        );
    }
}

const List = props => {
    const itemCount = props.hasNextPage ? props.itemCount + 1 : props.itemCount;

    const loadMoreItems = props.isNextPageLoading
        ? () => {}
        : props.loadNextPage;

    const isItemLoaded = index => {
        return !props.hasNextPage || index < props.itemCount;
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
                    useIsScrolling
                    ref={ref}
                    itemSize={50}
                    layout={'vertical'}
                    //width={props.width}
                    height={props.height}
                    itemData={props.itemData}
                    itemCount={props.itemCount}
                    onItemsRendered={onItemsRendered}
                    style={{ position: 'relative', width: '100%' }}
                >
                    {Row}
                </FixedSizeList>
            )}
        </InfiniteLoader>
    );
};

export default List;
