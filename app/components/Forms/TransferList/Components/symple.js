import React from 'react';
import { Grid, ListItem, Checkbox, Button, List } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
}

const SympleTransferList = () => {
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([0, 1, 2, 3]);
    const [right, setRight] = React.useState([4, 5, 6, 7]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = value => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const customList = items => (
        <Grid className="transferListWrap">
            <List className="transferLists">
                {items.map(value => {
                    const labelId = `transfer-list-item-${value}-label`;
                    return (
                        <ListItem className="transferList" key={value} onClick={handleToggle(value)}>
                            <ListItemIcon className="transferListIcon">
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    classes={{
                                        root: 'checkboxWrap checkDefault',
                                        checked: 'checked',
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText className="transferListContent" id={labelId} primary={`List item ${value + 1}`} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Grid>
    );

    return (
        <Grid container spacing={2}>
            <Grid item sm={5} xs={12}>{customList(left)}</Grid>
            <Grid item sm={2} xs={12}>
                <Grid className="middleButton">
                    <Button
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                    >
                        ≫
                    </Button>
                    <Button
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                    >   &gt;
                    </Button>
                    <Button
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}>
                        &lt;
                    </Button>
                    <Button
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item sm={5} xs={12}>{customList(right)}</Grid>
        </Grid>
    );
}
export default SympleTransferList